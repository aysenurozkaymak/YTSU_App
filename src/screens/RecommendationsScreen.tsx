import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { RootStackParamList, SkillLevel } from '../types';
import {
    decisionTreeRecommend,
    getPortionPrediction,
    clusterRecipes,
    findSimilarRecipes,
    RecommendationResult,
} from '../services/ml';

type RecommendationsScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Recommendations'>;
    route: RouteProp<RootStackParamList, 'Recommendations'>;
};

const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({
    navigation,
    route,
}) => {
    const { userId } = route.params;
    const [skillLevel, setSkillLevel] = useState<SkillLevel>('Orta');

    // ML sonuçları
    const recommendations = useMemo(
        () =>
            decisionTreeRecommend({
                skillLevel,
                preferredCategories: [],
                feedbackHistory: [],
            }).slice(0, 5),
        [skillLevel],
    );

    const portionPrediction = useMemo(() => getPortionPrediction(), []);
    const clusters = useMemo(() => clusterRecipes(), []);

    const topRecipe = recommendations[0]?.recipe;
    const similarRecipes = useMemo(
        () => (topRecipe ? findSimilarRecipes(topRecipe, 3) : []),
        [topRecipe],
    );

    const levelButtons: { key: SkillLevel; icon: string }[] = [
        { key: 'Başlangıç', icon: '🌱' },
        { key: 'Orta', icon: '🍳' },
        { key: 'Profesyonel', icon: '👨‍🍳' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#7b2cbf" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>🧠 Akıllı Öneriler</Text>
                <Text style={styles.headerSubtitle}>
                    Makine öğrenimi ile kişiselleştirilmiş tarifler
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Seviye Seçimi */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎓 Seviyeniz</Text>
                    <View style={styles.levelRow}>
                        {levelButtons.map(lb => (
                            <TouchableOpacity
                                key={lb.key}
                                style={[
                                    styles.levelChip,
                                    skillLevel === lb.key && styles.levelChipActive,
                                ]}
                                onPress={() => setSkillLevel(lb.key)}>
                                <Text style={styles.levelIcon}>{lb.icon}</Text>
                                <Text
                                    style={[
                                        styles.levelText,
                                        skillLevel === lb.key && styles.levelTextActive,
                                    ]}>
                                    {lb.key}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Doğrusal Regresyon Sonucu */}
                <View style={styles.mlCard}>
                    <View style={styles.mlCardHeader}>
                        <Text style={styles.mlBadge}>📊 Doğrusal Regresyon</Text>
                    </View>
                    <Text style={styles.mlTitle}>Porsiyon Tahmini</Text>
                    <Text style={styles.mlDescription}>
                        Kullanıcı verilerine göre en uygun porsiyon:
                    </Text>
                    <View style={styles.predictionRow}>
                        <View style={styles.predictionItem}>
                            <Text style={styles.predictionValue}>
                                {portionPrediction.predictedServings}
                            </Text>
                            <Text style={styles.predictionLabel}>Kişi</Text>
                        </View>
                        <View style={styles.predictionItem}>
                            <Text style={styles.predictionValue}>
                                {(portionPrediction.confidence * 100).toFixed(0)}%
                            </Text>
                            <Text style={styles.predictionLabel}>Güven (R²)</Text>
                        </View>
                        <View style={styles.predictionItem}>
                            <Text style={styles.predictionValue}>
                                y={portionPrediction.slope}x+
                                {portionPrediction.intercept}
                            </Text>
                            <Text style={styles.predictionLabel}>Model</Text>
                        </View>
                    </View>
                </View>

                {/* Karar Ağacı Önerileri */}
                <View style={styles.section}>
                    <View style={styles.mlCardHeader}>
                        <Text style={styles.mlBadge}>🌳 Karar Ağacı</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Size Özel Tarifler</Text>

                    {recommendations.map((rec, index) => (
                        <TouchableOpacity
                            key={rec.recipe.id}
                            style={styles.recCard}
                            onPress={() =>
                                navigation.navigate('RecipeDetail', {
                                    recipeId: rec.recipe.id,
                                    userId,
                                })
                            }
                            activeOpacity={0.9}>
                            <View style={styles.recHeader}>
                                <Text style={styles.recRank}>#{index + 1}</Text>
                                <Text style={styles.recIcon}>{rec.recipe.icon}</Text>
                                <View style={styles.recInfo}>
                                    <Text style={styles.recTitle}>{rec.recipe.title}</Text>
                                    <Text style={styles.recReason}>{rec.reason}</Text>
                                </View>
                                <View style={styles.scoreBadge}>
                                    <Text style={styles.scoreText}>{rec.score}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Kümeleme Sonuçları */}
                <View style={styles.section}>
                    <View style={styles.mlCardHeader}>
                        <Text style={styles.mlBadge}>📦 Kümeleme</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Tarif Grupları</Text>

                    {clusters.map(cluster => (
                        <View key={cluster.name} style={styles.clusterCard}>
                            <View style={styles.clusterHeader}>
                                <Text style={styles.clusterName}>{cluster.name}</Text>
                                <Text style={styles.clusterSim}>
                                    Benzerlik: %{(cluster.avgSimilarity * 100).toFixed(0)}
                                </Text>
                            </View>
                            <Text style={styles.clusterRecipes}>
                                {cluster.recipes.map(r => `${r.icon} ${r.title}`).join(' · ')}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Benzer Tarifler */}
                {topRecipe && similarRecipes.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {topRecipe.icon} {topRecipe.title} Benzerleri
                        </Text>
                        {similarRecipes.map(sim => (
                            <View key={sim.recipe2.id} style={styles.simCard}>
                                <Text style={styles.simIcon}>{sim.recipe2.icon}</Text>
                                <View style={styles.simInfo}>
                                    <Text style={styles.simTitle}>{sim.recipe2.title}</Text>
                                    <Text style={styles.simCommon}>
                                        Ortak: {sim.commonIngredients.join(', ')}
                                    </Text>
                                </View>
                                <Text style={styles.simScore}>
                                    %{(sim.similarity * 100).toFixed(0)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: spacing.xxl }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: '#7b2cbf',
        paddingTop: spacing.xxxl + spacing.base,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
    },
    headerSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.8,
        marginTop: spacing.xs,
    },
    content: {
        padding: spacing.base,
        paddingTop: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    levelRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    levelChip: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.sm + 2,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    levelChipActive: {
        backgroundColor: '#7b2cbf',
        borderColor: '#7b2cbf',
    },
    levelIcon: {
        fontSize: 20,
        marginBottom: spacing.xs,
    },
    levelText: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.text,
    },
    levelTextActive: {
        color: colors.white,
    },
    mlCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing.xl,
        ...shadows.card,
    },
    mlCardHeader: {
        marginBottom: spacing.sm,
    },
    mlBadge: {
        ...typography.caption,
        color: '#7b2cbf',
        fontWeight: '700',
        backgroundColor: '#f3e8ff',
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
        overflow: 'hidden',
    },
    mlTitle: {
        ...typography.h3,
        marginBottom: spacing.xs,
    },
    mlDescription: {
        ...typography.bodySmall,
        marginBottom: spacing.md,
    },
    predictionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f8f9fa',
        borderRadius: borderRadius.md,
        padding: spacing.md,
    },
    predictionItem: {
        alignItems: 'center',
    },
    predictionValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7b2cbf',
    },
    predictionLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    recCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        ...shadows.card,
    },
    recHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recRank: {
        ...typography.bodySmall,
        fontWeight: '700',
        color: '#7b2cbf',
        marginRight: spacing.sm,
        width: 24,
    },
    recIcon: {
        fontSize: 28,
        marginRight: spacing.md,
    },
    recInfo: {
        flex: 1,
    },
    recTitle: {
        ...typography.body,
        fontWeight: '600',
    },
    recReason: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    scoreBadge: {
        backgroundColor: '#f3e8ff',
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    scoreText: {
        ...typography.caption,
        fontWeight: '700',
        color: '#7b2cbf',
    },
    clusterCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        ...shadows.card,
    },
    clusterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    clusterName: {
        ...typography.body,
        fontWeight: '600',
    },
    clusterSim: {
        ...typography.caption,
        color: '#7b2cbf',
        fontWeight: '600',
    },
    clusterRecipes: {
        ...typography.caption,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    simCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        ...shadows.card,
    },
    simIcon: {
        fontSize: 28,
        marginRight: spacing.md,
    },
    simInfo: {
        flex: 1,
    },
    simTitle: {
        ...typography.body,
        fontWeight: '600',
    },
    simCommon: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    simScore: {
        ...typography.body,
        fontWeight: '700',
        color: '#7b2cbf',
    },
});

export default RecommendationsScreen;
