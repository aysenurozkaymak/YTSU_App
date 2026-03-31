/**
 * Chatbot Servisi — Groq API entegrasyonu (llama-3.3-70b-versatile)
 * Birincil: Groq API (ücretsiz, Türkiye'de çalışır)
 * Yedek: Yerel keyword-matching motoru
 */
import { GROQ_API_KEY } from '@env';
import { KNOWLEDGE_BASE, KnowledgeEntry } from '../data/chatbotKnowledge';

// ─── YEREL FALLBACK MOTORU ─────────────────────────────────────────────────

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[?.!,;:'\"()]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 1);
}

function stemTurkish(word: string): string {
    const suffixes = [
        'ları', 'leri', 'lar', 'ler',
        'ını', 'ini', 'unu', 'ünü',
        'dan', 'den', 'tan', 'ten',
        'nın', 'nin', 'nun', 'nün',
        'dır', 'dir', 'dur', 'dür',
        'mak', 'mek', 'yor', 'miş',
        'muş', 'müş', 'acak', 'ecek',
        'arak', 'erek', 'la', 'le',
        'da', 'de', 'ta', 'te',
        'ım', 'im', 'um', 'üm',
    ];

    let stemmed = word;
    for (const suffix of suffixes) {
        if (stemmed.length > suffix.length + 2 && stemmed.endsWith(suffix)) {
            stemmed = stemmed.slice(0, -suffix.length);
            break;
        }
    }
    return stemmed;
}

function wordSimilarity(word1: string, word2: string): number {
    if (word1 === word2) { return 1.0; }
    const stem1 = stemTurkish(word1);
    const stem2 = stemTurkish(word2);
    if (stem1 === stem2) { return 0.9; }
    const minLen = Math.min(word1.length, word2.length);
    let matchLen = 0;
    for (let i = 0; i < minLen; i++) {
        if (word1[i] === word2[i]) { matchLen++; }
        else { break; }
    }
    if (matchLen >= 4) { return 0.7; }
    if (matchLen >= 3) { return 0.5; }
    return 0;
}

function scoreEntry(tokens: string[], entry: KnowledgeEntry): number {
    let score = 0;
    for (const token of tokens) {
        for (const keyword of entry.keywords) {
            const similarity = wordSimilarity(token, keyword);
            if (similarity > 0) { score += similarity; }
        }
    }
    const matchedKeywords = entry.keywords.filter(kw =>
        tokens.some(t => wordSimilarity(t, kw) > 0.5),
    );
    if (matchedKeywords.length >= 2) { score *= 1.5; }
    return score;
}

function getLocalResponse(userMessage: string): string {
    const tokens = tokenize(userMessage);
    if (tokens.length === 0) {
        return 'Anlayamadım, lütfen sorunuzu daha açık yazın. Pişirme teknikleri, malzeme alternatifleri veya kompost hakkında sorabilirsiniz! 🍳';
    }
    const scored = KNOWLEDGE_BASE.map(entry => ({
        entry,
        score: scoreEntry(tokens, entry),
    }));
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (best.score > 0.8) {
        return best.entry.answer;
    }
    return 'Bu konuda kesin bir bilgim yok, ama mutfakla ilgili sorularınıza yardımcı olmaya çalışırım! 🤔\n\nŞu konularda sorabilirsiniz:\n• 🍳 Pişirme teknikleri\n• 🥕 Malzeme alternatifleri\n• ♻️ Kompost rehberliği\n• 📏 Mutfak ölçüleri';
}

// ─── GROQ API ────────────────────────────────────────────────────────────────

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `Sen YTSU'nun yapay zeka destekli mutfak asistanısın. \
Kullanıcılar sana Türk ve dünya mutfağı hakkında sorular sorar.

KURALLAR:
- YALNIZCA mutfak, yemek, pişirme teknikleri, tarif, malzeme, beslenme ve hasat/kompost konularında yardımcı ol.
- Konu dışı sorularda nazikçe "Bu konuda yardımcı olamam ama mutfak hakkında her şeyi sorabilirsin! 🍳" de.
- Her zaman TÜRKÇE yanıtla.
- Yanıtlarını kısa, pratik ve samimi tut (en fazla 5-6 cümle).
- Uygun emoji kullanabilirsin ama abartma.
- YTSU hakkında sorulursa: "Türk ve dünya mutfağından tarifler sunan, kişi sayısına göre ölçek ayarlayan ve kompost rehberliği içeren bir mobil uygulama" diye tanıt.`;

interface GroqResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
    error?: {
        message: string;
        code: string;
    };
}

async function callGroqAPI(userMessage: string): Promise<string> {
    const apiKey = GROQ_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') {
        throw new Error('Groq API anahtarı tanımlanmamış');
    }

    const response = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage },
            ],
            max_tokens: 400,
            temperature: 0.7,
            top_p: 0.9,
        }),
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errBody}`);
    }

    const data: GroqResponse = await response.json();

    if (data.error) {
        throw new Error(`Groq hatası: ${data.error.message}`);
    }

    const text = data.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error('Groq boş yanıt döndürdü');
    }

    return text.trim();
}

// ─── ANA FONKSİYON (dışa aktarılan) ────────────────────────────────────────

/**
 * Kullanıcı mesajına yanıt döner.
 * Önce Groq API dener, başarısız olursa yerel motoru kullanır.
 */
export async function getChatbotResponse(userMessage: string): Promise<string> {
    try {
        const groqReply = await callGroqAPI(userMessage);
        return groqReply;
    } catch (err) {
        console.warn('[Chatbot] Groq API başarısız, yerel motor kullanılıyor:', err);
        return getLocalResponse(userMessage);
    }
}

/**
 * Kategori tahmini — yerel motor bazlı (API gerektirmez)
 */
export function detectCategory(userMessage: string): string {
    const tokens = tokenize(userMessage);
    const categories: Record<string, number> = {
        'pişirme': 0,
        'malzeme': 0,
        'kompost': 0,
        'genel': 0,
    };

    for (const entry of KNOWLEDGE_BASE) {
        const score = scoreEntry(tokens, entry);
        if (score > 0) {
            categories[entry.category] += score;
        }
    }

    const maxCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    return maxCat[0];
}
