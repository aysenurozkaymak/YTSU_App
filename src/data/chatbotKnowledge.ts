/**
 * Chatbot bilgi veritabanı — anahtar kelime tabanlı soru-cevap çiftleri
 * Kategoriler: Pişirme teknikleri, malzeme alternatifleri, kompost, genel mutfak bilgisi
 */

export interface KnowledgeEntry {
    id: number;
    keywords: string[];
    question: string;
    answer: string;
    category: 'pişirme' | 'malzeme' | 'kompost' | 'genel';
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    // ─── PİŞİRME TEKNİKLERİ ─────────────────────────────
    {
        id: 1,
        keywords: ['sote', 'sotele', 'kavur', 'kavurma'],
        question: 'Sote nasıl yapılır?',
        answer:
            'Sote yapmak için malzemeleri küçük parçalara ayırın. Tavayı iyice kızdırın, az yağ koyun. Malzemeleri yüksek ateşte kısa sürede, sürekli karıştırarak pişirin. Et sotelemeden önce eti oda sıcaklığına getirin.',
        category: 'pişirme',
    },
    {
        id: 2,
        keywords: ['haşla', 'haşlama', 'kaynat', 'kaynama'],
        question: 'Haşlama nasıl yapılır?',
        answer:
            'Haşlamak için bol suyu kaynatın, malzemeyi ekleyin. Sebzeler için tuzlu su kullanın. Et haşlarken soğuk suyla başlayın — böylece et yumuşak kalır. Fazla kaynatmayın, lezzet suya geçer.',
        category: 'pişirme',
    },
    {
        id: 3,
        keywords: ['fırın', 'fırınla', 'fırında', 'ısı', 'derece', 'sıcaklık'],
        question: 'Fırın sıcaklığı nasıl ayarlanır?',
        answer:
            'Genel kurallar: Yavaş pişirme: 140-160°C. Orta pişirme: 170-190°C. Hızlı pişirme: 200-220°C. Fırını her zaman önceden ısıtın (10-15 dk). Yiyeceği orta rafa koyun. Fan (turbo) modda sıcaklığı 20°C düşürün.',
        category: 'pişirme',
    },
    {
        id: 4,
        keywords: ['kızart', 'kızartma', 'derin', 'yağ'],
        question: 'Kızartma nasıl yapılır?',
        answer:
            'Derin kızartma için yağ 170-180°C olmalı. Test: Bir ekmek parçası atın, 30 saniyede kızarıyorsa hazır. Malzemeleri kurulamayı unutmayın — su yağı sıçratır. Az miktarda kızartın, çok doldurmayın.',
        category: 'pişirme',
    },
    {
        id: 5,
        keywords: ['marine', 'marinasyon', 'terbiye', 'beklet'],
        question: 'Marinasyon nasıl yapılır?',
        answer:
            'Temel marine: Asit (limon/sirke) + yağ + baharat. Et için en az 2 saat, tavuk 30dk-2 saat, balık 15-30 dk. Buzdolabında marine edin. Asit et liflerini çözer, yumuşatır. Yoğurt da harika bir marinasyon bazıdır.',
        category: 'pişirme',
    },
    {
        id: 6,
        keywords: ['közle', 'közleme', 'mangal', 'ızgara', 'barbekü'],
        question: 'Közleme nasıl yapılır?',
        answer:
            'Közlemek için malzemeyi doğrudan ateşe veya kızgın ızgaraya koyun. Patlıcan/biber için ocak üzerinde çevirerek közleyin. Közlenen sebzelerin kabuklarını buhar ile soyun: sıcakken poşete koyun, 10 dk bekleyin.',
        category: 'pişirme',
    },
    {
        id: 7,
        keywords: ['buğula', 'buğulama', 'buharda', 'buhar'],
        question: 'Buharda pişirme nasıl yapılır?',
        answer:
            'Su kaynayana kadar ısıtın, malzemeyi süzgece koyup tencerenin üzerine yerleştirin. Kapağı kapatın. Sebzeler 5-10 dk, balık 8-12 dk pişer. En sağlıklı yöntemlerden biridir — vitamin kaybı minimumdur.',
        category: 'pişirme',
    },
    // ─── MALZEME ALTERNATİFLERİ ──────────────────────────
    {
        id: 8,
        keywords: ['tereyağı', 'yerine', 'alternatif', 'yağ'],
        question: 'Tereyağı yerine ne kullanılır?',
        answer:
            'Tereyağı alternatifleri: Zeytinyağı (en sağlıklı), margarin, Hindistan cevizi yağı, avokado. Tatlılarda: elma püresi veya muz (yağı azaltır). Laktozlara duyarlıysanız ghee (saflaştırılmış tereyağı) deneyin.',
        category: 'malzeme',
    },
    {
        id: 9,
        keywords: ['yumurta', 'yerine', 'vegan', 'alternatif'],
        question: 'Yumurta yerine ne kullanılır?',
        answer:
            'Yumurta alternatifleri: Keten tohumu (1 yumurta = 1 yemek kaşığı keten + 3 kaşık su, 5 dk bekletin). Muz (yarım muz = 1 yumurta). Elma püresi. Yoğurt. Nişasta + su. Tofu (omlet için).',
        category: 'malzeme',
    },
    {
        id: 10,
        keywords: ['un', 'yerine', 'gluten', 'çölyak', 'alternatif'],
        question: 'Un yerine ne kullanılır?',
        answer:
            'Glüten-free alternatifler: Pirinç unu, badem unu, Hindistan cevizi unu, nohut unu, mısır unu. Her birinin oranı farklıdır. Badem unu kek için, pirinç unu genel amaçlı, nohut unu börek-pide için idealdir.',
        category: 'malzeme',
    },
    {
        id: 11,
        keywords: ['şeker', 'yerine', 'tatlandırıcı', 'diyabet', 'sağlıklı'],
        question: 'Şeker yerine ne kullanılır?',
        answer:
            'Sağlıklı alternatifler: Bal (şekerin yarısı kadar), hurma şurubu, akçaağaç şurubu, stevia (sıfır kalori), Hindistan cevizi şekeri. Tatlılarda meyve püresi (muz, hurma) doğal tatlılık verir.',
        category: 'malzeme',
    },
    {
        id: 12,
        keywords: ['süt', 'yerine', 'laktoz', 'bitkisel', 'alternatif'],
        question: 'Süt yerine ne kullanılır?',
        answer:
            'Bitkisel süt alternatifleri: Badem sütü, yulaf sütü, soya sütü, Hindistan cevizi sütü, pirinç sütü. Pişirme için en uygun: soya sütü (protein yüksek). Çorba için: Hindistan cevizi sütü (kremalı kıvam).',
        category: 'malzeme',
    },
    {
        id: 13,
        keywords: ['tuz', 'yerine', 'tansiyon', 'sodyum', 'az'],
        question: 'Tuz yerine ne kullanılır?',
        answer:
            'Az tuz alternatifleri: Limon suyu, sirke, baharat karışımları, sarımsak, soğan tozu, biberiye, kekik. Soya sosu (az miktarda). Potasyum tuzu. Yemeklere pişirme sonunda tuz eklemek daha az tuz kullanmanızı sağlar.',
        category: 'malzeme',
    },
    // ─── KOMPOST BİLGİLERİ ──────────────────────────────
    {
        id: 14,
        keywords: ['kompost', 'nedir', 'ne', 'anlat'],
        question: 'Kompost nedir?',
        answer:
            'Kompost, organik atıkların (sebze kabukları, yumurta kabuğu, çay posası gibi) doğal olarak ayrışması sonucu oluşan zengin toprak iyileştirici bir maddedir. Mutfak atıklarınızı çöpe atmak yerine kompost yaparak hem israfı azaltır hem de bahçenize doğal gübre üretirsiniz.',
        category: 'kompost',
    },
    {
        id: 15,
        keywords: ['kompost', 'nasıl', 'yapılır', 'başla', 'adım'],
        question: 'Kompost nasıl yapılır?',
        answer:
            'Kompost yapmak için: 1) Bir kap seçin (bahçe kutusu veya balkon kovası). 2) Alt katmana dal parçaları koyun. 3) Yeşil atıklar (sebze, meyve kabukları) + kahverengi atıklar (kuru yaprak, karton) katmanlar halinde dizin. 4) Oranı 1:3 (yeşil:kahverengi) tutun. 5) Nemli tutun, haftada karıştırın. 2-3 ayda hazır!',
        category: 'kompost',
    },
    {
        id: 16,
        keywords: ['kompost', 'atık', 'ne', 'konur', 'konulur', 'atılır'],
        question: 'Kompost kutusuna ne konulur?',
        answer:
            'KONULABİLİR ✅: Sebze-meyve kabukları, yumurta kabuğu, çay/kahve posası, ekmek kırıntıları, kuru yaprak, dal, karton, gazete. KONULMAZ ❌: Et, süt ürünleri, yağlı yiyecekler, hasta bitki, evcil hayvan atığı, plastik, cam.',
        category: 'kompost',
    },
    {
        id: 17,
        keywords: ['kompost', 'koku', 'kokma', 'kokuyor', 'problem'],
        question: 'Kompostum kötü kokuyor, ne yapmalıyım?',
        answer:
            'Kötü koku genellikle fazla nemden veya yetersiz havalandırmadan kaynaklanır. Çözüm: 1) Daha fazla kahverengi malzeme (kuru yaprak, karton) ekleyin. 2) Karıştırarak havalandırın. 3) Çok ıslaksa kuru malzeme ekleyin. 4) Et veya süt ürünü koymadığınızdan emin olun.',
        category: 'kompost',
    },
    {
        id: 18,
        keywords: ['kompost', 'hazır', 'olgunlaş', 'bitti', 'ne zaman'],
        question: 'Kompost ne zaman hazır olur?',
        answer:
            'Kompost genellikle 2-3 ayda hazır olur. Hazır olduğunu anlama: Koyu kahverengi-siyah renkte olur, toprak gibi kokar, sıcaklık düşer, malzemeler tanınmaz hale gelir. Hazır kompostu eleyip saksı toprağına %30 oranında karıştırın.',
        category: 'kompost',
    },
    {
        id: 19,
        keywords: ['sürdürülebilir', 'gıda', 'israf', 'atık', 'azalt'],
        question: 'Gıda israfını nasıl azaltabilirim?',
        answer:
            'Gıda israfını azaltmak için: 1) Haftalık yemek planı yapın. 2) Alışveriş listesi ile gidin. 3) Porsiyon miktarlarını doğru ayarlayın (bu uygulama tam bunun için!). 4) Artıkları değerlendirin (bayat ekmek → köfte). 5) Doğru saklama yöntemlerini öğrenin. 6) Mutfak atıklarını kompost yapın.',
        category: 'kompost',
    },
    // ─── GENEL MUTFAK BİLGİLERİ ─────────────────────────
    {
        id: 20,
        keywords: ['bıçak', 'keskin', 'bile', 'doğra', 'kesme'],
        question: 'Doğru bıçak kullanımı nasıl olur?',
        answer:
            'Keskin bıçak daha güvenlidir — kör bıçak kayar! Doğrama teknikleri: Julienne (ince şerit), brunoise (küçük küp), chiffonade (ince dilim yaprak). Bıçağı yılda 2 kez biletirin. Tahtanın üzerinde doğrayın, cam veya mermer bıçağı köreltir.',
        category: 'genel',
    },
    {
        id: 21,
        keywords: ['baharat', 'hangi', 'ne zaman', 'kullan', 'çeşit'],
        question: 'Hangi baharat nerede kullanılır?',
        answer:
            'Temel baharat eşleşmeleri: Et → Kimyon, kekik, karabiber, biberiye. Tavuk → Kekik, zerdeçal, defne yaprağı. Balık → Dereotu, limon, beyaz biber. Çorba → Nane, pul biber, sumak. Tatlı → Tarçın, vanilya, zencefil, karanfil.',
        category: 'genel',
    },
    {
        id: 22,
        keywords: ['saklama', 'sakla', 'buz', 'dolap', 'taze', 'ömür'],
        question: 'Yiyecekleri nasıl doğru saklarım?',
        answer:
            'Buzdolabı: Et (alt raf, 2-3 gün), süt ürünleri (orta raf), sebze-meyve (çekmecede). Dondurucu: Et 3-6 ay, sebze 8-12 ay, ekmek 3 ay. Domates, patates, soğan, sarımsak buzdolabına konulmaz — serin ve karanlık yerde saklayın.',
        category: 'genel',
    },
    {
        id: 23,
        keywords: ['ölçü', 'ölçek', 'bardak', 'kaşık', 'gram', 'miktar'],
        question: 'Mutfak ölçüleri nelerdir?',
        answer:
            '1 su bardağı = 200 ml. 1 çay bardağı = 100 ml. 1 çorba kaşığı = 15 ml. 1 tatlı kaşığı = 10 ml. 1 çay kaşığı = 5 ml. 1 bardak un ≈ 120g. 1 bardak şeker ≈ 200g. 1 bardak pirinç ≈ 180g.',
        category: 'genel',
    },
    {
        id: 24,
        keywords: ['hamur', 'yoğur', 'ekmek', 'maya', 'kabartma'],
        question: 'Hamur nasıl yoğrulur?',
        answer:
            'Temel hamur: Un + sıvı + tuz. Mayalı hamur: Ilık süt/suda mayayı eritin, 10 dk bekleyin. Unu ekleyin, 10 dk yoğurun. Ele yapışmayan hamur olmalı. 1 saat sıcak yerde mayalandırın. Hamur 2 kat kabarmalı. Kabartma tozlu hamur bekletilmez.',
        category: 'genel',
    },
    {
        id: 25,
        keywords: ['pilav', 'pirinç', 'tane', 'dağıl', 'pişir'],
        question: 'Tane tane pilav nasıl yapılır?',
        answer:
            'Sırrı: 1) Pirinci 20 dk ılık tuzlu suda bekletin. 2) Suyunu süzüp tereyağında kavurun. 3) Kaynar su ekleyin (1.5 ölçü su : 1 ölçü pirinç). 4) Kaynayınca kısık ateşe alın. 5) 15 dk kapağı açmadan pişirin. 6) Altına havlu koyup 10 dk dinlendirin.',
        category: 'genel',
    },
    {
        id: 26,
        keywords: ['çorba', 'kıvam', 'koyu', 'sulu', 'pürüz'],
        question: 'Çorba kıvamını nasıl ayarlarım?',
        answer:
            'Kıvam artırmak: Un-tereyağı karışımı (roux), nişasta-su karışımı, patates püresi, ekmek içi. Kıvam azaltmak: Su, et suyu veya süt ekleyin. Kremalı çorbalar için blender kullanın. Çorbayı asla yüksek ateşte kaynatmayın.',
        category: 'genel',
    },
    {
        id: 27,
        keywords: ['yoğurt', 'mayala', 'ev', 'yapımı'],
        question: 'Evde yoğurt nasıl yapılır?',
        answer:
            'Sütü 45°C\'ye ısıtın (parmağınız dayanmalı). 1 litre süt için 2 kaşık yoğurt maya olarak ekleyin. Karıştırın, kapağını kapatın. Kalın battaniyeye sarın. 6-8 saat bekletin (kışın 8-10 saat). Buzdolabına koyun. Taş gibi yoğurt hazır!',
        category: 'genel',
    },
    {
        id: 28,
        keywords: ['soğan', 'ağla', 'göz', 'yaş', 'yakma'],
        question: 'Soğan keserken gözler nasıl yaşarmaz?',
        answer:
            'İpuçları: 1) Soğanı 15 dk buzlukta bekletin. 2) Keskin bıçak kullanın. 3) Akan suyun altında doğrayın. 4) Ağzınıza ekmek koyun (gerçekten işe yarar!). 5) Kök kısmını en son kesin — en çok göz yakan kısım orasıdır.',
        category: 'genel',
    },
    {
        id: 29,
        keywords: ['merhaba', 'selam', 'naber', 'hey', 'nasıl', 'günaydın'],
        question: 'Selamlama',
        answer:
            'Merhaba! 🍳 Ben YTSU mutfak asistanınızım. Pişirme teknikleri, malzeme alternatifleri, kompost rehberliği ve daha fazlası hakkında sorularınızı yanıtlayabilirim. Bana bir şey sorun!',
        category: 'genel',
    },
    {
        id: 30,
        keywords: ['teşekkür', 'sağol', 'eyvallah', 'eyv'],
        question: 'Teşekkür',
        answer:
            'Rica ederim! 😊 Başka bir sorunuz olursa her zaman buradayım. Afiyet olsun! 🍽️',
        category: 'genel',
    },
    {
        id: 31,
        keywords: ['et', 'pişir', 'yumuş', 'sert', 'çiğ'],
        question: 'Et nasıl yumuşak pişirilir?',
        answer:
            'Et yumuşatma yöntemleri: 1) Yoğurt veya sütte marine edin (asit lifleri çözer). 2) Kısık ateşte uzun süre pişirin. 3) Düdüklü tencere kullanın. 4) Soğan suyu ile marine edin. 5) Eti dövün (tokmak ile). 6) Kivi veya ananas suyu ile 15 dk bekletin (enzimler yumuşatır).',
        category: 'pişirme',
    },
    {
        id: 32,
        keywords: ['kalori', 'diyet', 'sağlıklı', 'zayıfla', 'kilo'],
        question: 'Sağlıklı yemek nasıl yapılır?',
        answer:
            'Sağlıklı pişirme ipuçları: 1) Kızartma yerine fırın/ızgara tercih edin. 2) Zeytinyağı kullanın. 3) Tuzu azaltıp baharat kullanın. 4) Tam tahıl tercih edin. 5) Sebze miktarını artırın. 6) Porsiyon kontrolü yapın — bu uygulama tam size göre!',
        category: 'genel',
    },
    {
        id: 33,
        keywords: ['patlıcan', 'acı', 'acılık', 'tuz'],
        question: 'Patlıcanın acılığı nasıl giderilir?',
        answer:
            'Patlıcanı doğradıktan sonra tuzlayıp 20-30 dk bekletin. Çıkan suyu sıkın ve durulayın. Bu hem acılığı alır hem de kızartırken daha az yağ çekmesini sağlar. Alternatif: Süte 30 dk batırın.',
        category: 'genel',
    },
    {
        id: 34,
        keywords: ['şerbet', 'tatlı', 'sıcak', 'soğuk', 'kural'],
        question: 'Tatlıda şerbet kuralı nedir?',
        answer:
            'Altın kural: SICAK tatlıya SOĞUK şerbet VEYA SOĞUK tatlıya SICAK şerbet dökülür. İkisi de aynı sıcaklıkta olursa tatlı şerbeti emmez. Şerbet kıvamı: İki parmağınız arasında yapışkan hissedilmeli ama ip çekmemeli.',
        category: 'pişirme',
    },
    {
        id: 35,
        keywords: ['kompost', 'balkon', 'daire', 'apartman', 'ev'],
        question: 'Balkonda kompost yapılır mı?',
        answer:
            'Evet! Balkonda kompost yapmak mümkün: 1) Kapaklı bir kova veya solucan kompost kutusu alın. 2) Küçük delikleri olan bir kap da olur. 3) Sadece sebze-meyve kabukları kullanın. 4) Kuru malzeme eklemeyi unutmayın. 5) Haftada bir karıştırın. Koku sorunu olursa daha fazla kahverengi malzeme ekleyin.',
        category: 'kompost',
    },
    {
        id: 36,
        keywords: ['yeşil', 'kahverengi', 'atık', 'oran', 'denge'],
        question: 'Kompostta yeşil-kahverengi oranı ne olmalı?',
        answer:
            'İdeal oran 1:3 (yeşil:kahverengi). YEŞİL atıklar (azot zengini): Sebze kabukları, meyve artıkları, çim, çay/kahve. KAHVERENGİ atıklar (karbon zengini): Kuru yaprak, dal, karton, gazete, yumurta kartonu. Dengeyi bozarsanız: Çok yeşil = koku, çok kahverengi = yavaş ayrışma.',
        category: 'kompost',
    },
    {
        id: 37,
        keywords: ['nem', 'sulama', 'kuru', 'ıslak', 'kompost'],
        question: 'Kompostun nem oranı ne olmalı?',
        answer:
            'Kompost sıkılmış sünger gibi nemli olmalı — ıslak ama su damlamamalı. Çok kuru ise su püskürtün. Çok ıslak ise kuru malzeme (gazete, karton) ekleyin. Haftada bir kontrol edin. Yüksek nem anaerob çürümeye (kötü koku) neden olur.',
        category: 'kompost',
    },
    {
        id: 38,
        keywords: ['sıcaklık', 'ısı', 'derece', 'kompost'],
        question: 'Kompost sıcaklığı nasıl olmalı?',
        answer:
            'Aktif kompost 55-65°C olmalı — bu zararlı bakterileri ve yabancı ot tohumlarını öldürür. Elinizi batırdığınızda sıcak hissetmelisiniz. Sıcaklık düşerse daha fazla yeşil malzeme ekleyin ve karıştırın. Olgunlaşma döneminde sıcaklık doğal olarak düşer.',
        category: 'kompost',
    },
    {
        id: 39,
        keywords: ['tarif', 'öner', 'ne pişir', 'akşam', 'bugün', 'yemek'],
        question: 'Bugün ne pişirsem?',
        answer:
            'Size birkaç öneri: 🥘 Ana yemek olarak Karnıyarık veya Tavuk Sote, 🥣 Çorba olarak Mercimek Çorbası, 🥗 Yanında Çoban Salatası harika olur! Tarif kataloğumuza göz atıp kişi sayısına göre malzeme ölçeğini ayarlayabilirsiniz.',
        category: 'genel',
    },
    {
        id: 40,
        keywords: ['uygulama', 'nasıl', 'kullan', 'ne yapıyor', 'özellik'],
        question: 'Bu uygulama ne yapar?',
        answer:
            'YTSU ile: 🍽️ 15 Türk tarifine göz atabilir, 📊 Kişi sayısına göre malzemeleri otomatik ayarlayabilir, 🎓 Seviyenize uygun tarif açıklamaları alabilir, ♻️ Kompost rehberliği ile çevre dostu olabilir, 🤖 Benimle soru-cevap yapabilirsiniz!',
        category: 'genel',
    },
];
