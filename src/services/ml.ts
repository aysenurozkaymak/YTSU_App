/**
 * Makine Öğrenimi Algoritmaları (JavaScript tabanlı basitleştirilmiş versiyon)
 *
 * Rapordaki 3 ML yaklaşımını uygular:
 * 1. Doğrusal Regresyon — Geri bildirimlere göre porsiyon optimizasyonu
 * 2. Karar Ağacı — Kullanıcı tercihine göre tarif önerisi
 * 3. Kümeleme — Tarifler arası benzerlik analizi
 */
import { Recipe, Feedback, SkillLevel } from '../types';
import { RECIPES } from '../data/recipes';

// ─── 1. DOĞRUSAL REGRESYON ────────────────────────────────────

/**
 * Basit doğrusal regresyon ile en uygun porsiyon miktarını tahmin eder.
 * En çok tercih edilen porsiyon sayısını geri dönüş verilerine göre hesaplar.
 *
 * y = mx + b formülü
 * x: orijinal porsiyon sayısı
 * y: kullanıcının tercih ettiği porsiyon
 */
export interface RegressionResult {
    slope: number;       // m (eğim)
    intercept: number;   // b (kesişim)
    predictedServings: number;
    confidence: number;  // R² değeri (0-1)
}

export function linearRegression(
    feedbacks: { originalServings: number; preferredServings: number }[],
): RegressionResult {
    if (feedbacks.length < 2) {
        return { slope: 1, intercept: 0, predictedServings: 4, confidence: 0 };
    }

    const n = feedbacks.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (const f of feedbacks) {
        sumX += f.originalServings;
        sumY += f.preferredServings;
        sumXY += f.originalServings * f.preferredServings;
        sumX2 += f.originalServings * f.originalServings;
        sumY2 += f.preferredServings * f.preferredServings;
    }

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) {
        return { slope: 1, intercept: 0, predictedServings: sumY / n, confidence: 0 };
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    // R² hesaplama
    const meanY = sumY / n;
    let ssRes = 0, ssTot = 0;
    for (const f of feedbacks) {
        const predicted = slope * f.originalServings + intercept;
        ssRes += (f.preferredServings - predicted) ** 2;
        ssTot += (f.preferredServings - meanY) ** 2;
    }
    const rSquared = ssTot !== 0 ? 1 - ssRes / ssTot : 0;

    // Ortalama porsiyon için tahmin
    const avgServings = sumX / n;
    const predictedServings = Math.max(1, Math.round(slope * avgServings + intercept));

    return {
        slope: Math.round(slope * 100) / 100,
        intercept: Math.round(intercept * 100) / 100,
        predictedServings,
        confidence: Math.max(0, Math.round(rSquared * 100) / 100),
    };
}

// ─── 2. KARAR AĞACI ──────────────────────────────────────────

/**
 * Basit karar ağacı ile kullanıcı profiline göre tarif önerisi
 * Karar düğümleri: Seviye → Kategori tercihi → Karmaşıklık
 */
export interface RecommendationResult {
    recipe: Recipe;
    score: number;
    reason: string;
}

interface UserProfile {
    skillLevel: SkillLevel;
    preferredCategories: string[];
    feedbackHistory: Feedback[];
}

/**
 * Tarif karmaşıklık skoru (malzeme sayısı + talimat uzunluğu bazlı)
 */
function getComplexityScore(recipe: Recipe): number {
    const ingredientScore = recipe.ingredients.length;
    const instructionLength = recipe.instructions.length;

    // 0-10 arası normalize (basit formül)
    const raw = ingredientScore * 0.5 + instructionLength * 0.01;
    return Math.min(10, Math.max(1, raw));
}

/**
 * Karar ağacı ile tarif önerisi
 */
export function decisionTreeRecommend(
    profile: UserProfile,
): RecommendationResult[] {
    const results: RecommendationResult[] = [];

    for (const recipe of RECIPES) {
        let score = 0;
        let reasons: string[] = [];

        // Düğüm 1: Seviye eşleşmesi
        const complexity = getComplexityScore(recipe);
        if (profile.skillLevel === 'Başlangıç' && complexity <= 5) {
            score += 3;
            reasons.push('Seviyenize uygun zorlukta');
        } else if (profile.skillLevel === 'Orta' && complexity > 3 && complexity <= 7) {
            score += 3;
            reasons.push('Orta seviye zorluk');
        } else if (profile.skillLevel === 'Profesyonel' && complexity > 5) {
            score += 3;
            reasons.push('Profesyonel seviye tarif');
        } else {
            score += 1;
        }

        // Düğüm 2: Kategori tercihi
        if (
            profile.preferredCategories.length === 0 ||
            profile.preferredCategories.includes(recipe.category)
        ) {
            score += 2;
            if (profile.preferredCategories.includes(recipe.category)) {
                reasons.push(`${recipe.category} kategorisini seversiniz`);
            }
        }

        // Düğüm 3: Geri bildirim bazlı
        const recipeFeedback = profile.feedbackHistory.find(
            f => f.recipeId === recipe.id,
        );
        if (recipeFeedback) {
            if (recipeFeedback.rating >= 4) {
                score += 2;
                reasons.push('Daha önce beğendiniz');
            } else if (recipeFeedback.rating <= 2) {
                score -= 2;
                reasons.push('Düşük puan verdiniz');
            }
        } else {
            score += 1; // Denemediği tarifler biraz bonus
            reasons.push('Henüz denemediğiniz bir tarif');
        }

        results.push({
            recipe,
            score,
            reason: reasons.join(' • '),
        });
    }

    return results.sort((a, b) => b.score - a.score);
}

// ─── 3. KÜMELEME (Clustering) ────────────────────────────────

/**
 * Tarifler arası benzerlik — ortak malzeme bazlı Jaccard benzerliği
 */
export interface SimilarityResult {
    recipe1: Recipe;
    recipe2: Recipe;
    similarity: number; // 0-1
    commonIngredients: string[];
}

function getIngredientNames(recipe: Recipe): Set<string> {
    return new Set(
        recipe.ingredients.map(ing => ing.name.toLowerCase().split(' ')[0]),
    );
}

/**
 * İki tarif arasında Jaccard benzerlik katsayısı
 */
export function jaccardSimilarity(recipe1: Recipe, recipe2: Recipe): SimilarityResult {
    const set1 = getIngredientNames(recipe1);
    const set2 = getIngredientNames(recipe2);

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    const similarity = union.size > 0 ? intersection.size / union.size : 0;

    return {
        recipe1,
        recipe2,
        similarity: Math.round(similarity * 100) / 100,
        commonIngredients: [...intersection],
    };
}

/**
 * Bir tarife en benzer tarifleri bul
 */
export function findSimilarRecipes(
    targetRecipe: Recipe,
    topN: number = 3,
): SimilarityResult[] {
    const results: SimilarityResult[] = [];

    for (const recipe of RECIPES) {
        if (recipe.id === targetRecipe.id) continue;
        results.push(jaccardSimilarity(targetRecipe, recipe));
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
}

/**
 * Tüm tarifleri gruplara ayır (basit hiyerarşik kümeleme)
 */
export interface RecipeCluster {
    name: string;
    recipes: Recipe[];
    avgSimilarity: number;
}

export function clusterRecipes(): RecipeCluster[] {
    // Kategoriye ve malzeme benzerliğine göre kümele
    const clusters: RecipeCluster[] = [];
    const categories = [...new Set(RECIPES.map(r => r.category))];

    for (const cat of categories) {
        const catRecipes = RECIPES.filter(r => r.category === cat);
        if (catRecipes.length === 0) continue;

        // Küme içi ortalama benzerliği hesapla
        let totalSim = 0;
        let count = 0;
        for (let i = 0; i < catRecipes.length; i++) {
            for (let j = i + 1; j < catRecipes.length; j++) {
                totalSim += jaccardSimilarity(catRecipes[i], catRecipes[j]).similarity;
                count++;
            }
        }

        clusters.push({
            name: cat,
            recipes: catRecipes,
            avgSimilarity: count > 0 ? Math.round((totalSim / count) * 100) / 100 : 0,
        });
    }

    return clusters.sort((a, b) => b.avgSimilarity - a.avgSimilarity);
}

/**
 * Kullanıcıya özel porsiyon tahmini (mock veri ile demo)
 */
export function getPortionPrediction(): RegressionResult {
    // Demo: Tipik bir Türk ailesinin porsiyon verileri
    const mockData = [
        { originalServings: 4, preferredServings: 4 },
        { originalServings: 6, preferredServings: 4 },
        { originalServings: 4, preferredServings: 6 },
        { originalServings: 8, preferredServings: 6 },
        { originalServings: 6, preferredServings: 6 },
        { originalServings: 4, preferredServings: 4 },
        { originalServings: 6, preferredServings: 5 },
    ];
    return linearRegression(mockData);
}
