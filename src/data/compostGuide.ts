import { CompostStep } from '../types';

/**
 * 9 adımlık kompost rehberliği — rapordan alınan süreç
 * Kapsamlı bilgi ile adım adım mutfak atıklarının kompost yapımı
 */
export const COMPOST_STEPS: CompostStep[] = [
    {
        id: 1,
        title: 'Başlangıç',
        icon: '🚀',
        description:
            'Kompost yapmaya karar verdiyseniz ilk adım bir kap seçmektir. Bahçeniz varsa ahşap veya plastik bir kompost kutusu kullanabilirsiniz. Balkonda ise kapaklı bir kova veya solucan kompost sistemi tercih edebilirsiniz. Kabın altında hava delikleri olmalıdır.',
        tip: 'Mutfağınıza küçük bir "bekleme kabı" koyun. Gün içinde biriken atıkları bu kapta toplayıp, akşam ana kompost kabına aktarın.',
    },
    {
        id: 2,
        title: 'Malzemelerin Sınıflandırılması',
        icon: '🗂️',
        description:
            'Atıkları iki gruba ayırın:\n\n🟢 YEŞİL ATIKLAR (Azot zengini): Sebze-meyve kabukları, kahve telvesi, çay posası, taze çim, yumurta kabuğu.\n\n🟤 KAHVERENGİ ATIKLAR (Karbon zengini): Kuru yapraklar, talaş, karton, gazete, kuru dal parçaları, yumurta kartonu.',
        tip: 'ET, SÜT ÜRÜNLERİ, YAĞLI YİYECEKLER ve HASTA BİTKİLER asla kompost kutusuna konulmamalıdır — kötü koku ve zararlı bakteri üretirler.',
    },
    {
        id: 3,
        title: 'Oran Kontrolü',
        icon: '⚖️',
        description:
            'Dengeli bir kompost için yeşil ve kahverengi atıkların oranını 1:3 (yeşil:kahverengi) olarak ayarlayın. Bu oran, mikroorganizmaların verimli çalışması için idealdir. Çok fazla yeşil atık kötü kokuya, çok fazla kahverengi atık ise yavaş ayrışmaya neden olur.',
        tip: 'Her mutfak atığı eklediğinizde üzerine bir avuç kuru yaprak veya uffalanmış karton ekleyin — oranı dengede tutar.',
    },
    {
        id: 4,
        title: 'Nem Kontrolü',
        icon: '💧',
        description:
            'Kompostun nem seviyesini düzenli kontrol edin. İdeal nem: sıkılmış sünger gibi — nemli ama su damlamamalı. Çok kuruyu su püskürterek, çok ıslağını ise kuru malzeme ekleyerek düzeltin. Yağmurlu dönemlerde kapağı kapatmayı unutmayın.',
        tip: 'Kompostu elinizle sıkın — birkaç damla su çıkıyorsa idealdir. Hiç çıkmıyorsa kuru, akıyorsa çok ıslaktır.',
    },
    {
        id: 5,
        title: 'Karıştırma ve Hava Akışı',
        icon: '🔄',
        description:
            'Kompost yığınını haftada bir kez karıştırın. Bu, oksijen sağlayarak aerobik ayrışmayı teşvik eder. Karıştırma işlemi mikroorganizmaların atıkları daha hızlı parçalamasını sağlar. Bir bahçe çatalı veya özel kompost karıştırıcı kullanabilirsiniz.',
        tip: 'Karıştırmazsanız anaerobik (oksijensiz) çürüme başlar — bu kötü koku ve metan gazı üretir.',
    },
    {
        id: 6,
        title: 'Sıcaklık Takibi',
        icon: '🌡️',
        description:
            'Aktif kompostun merkez sıcaklığı 55-65°C arasında olmalıdır. Bu sıcaklık zararlı bakterileri ve yabancı ot tohumlarını öldürür. Sıcaklık düşükse daha fazla yeşil atık eklemeli veya karıştırmalısınız. Kompost termometresi kullanılabilir.',
        tip: 'Elinizi kompostun ortasına batırmanız yeterli — belirgin bir sıcaklık hissediyorsanız süreç doğru ilerliyor demektir.',
    },
    {
        id: 7,
        title: 'Olgunlaşma Süresi',
        icon: '⏳',
        description:
            'Kompostun olgunlaşması yaklaşık 2-3 ay sürer. Bu süre boyunca düzenli karıştırma ve nem kontrolü yapılmalıdır. Süreci hızlandırmak için atıkları küçük parçalara ayırın, sıcak bir yerde tutun ve düzenli karıştırın.',
        tip: 'Atıkları ne kadar küçük parçalarsanız o kadar hızlı ayrışır. Blender ile sebze atıklarını parçalayabilirsiniz.',
    },
    {
        id: 8,
        title: 'Sonuç — Hazır Kompost',
        icon: '✅',
        description:
            'Kompost hazır olduğunda koyu kahverengi-siyah renkte, toprak kokulu ve ufalanabilir olmalıdır. İçindeki malzemeler artık tanınmaz hale gelmiş, sıcaklık düşmüş olmalıdır. Hazır kompost bahçe toprağı, saksı bitkisi veya çim alanları için mükemmel bir besindir.',
        tip: 'Hazır kompostu ince bir elekten geçirin. Kalan büyük parçaları yeni kompost yığınına geri atabilirsiniz.',
    },
    {
        id: 9,
        title: 'Geri Bildirim',
        icon: '🔁',
        description:
            'Kompost yapım sürecinde karşılaştığınız sorunları ve önerilerinizi değerlendirin. Her seferinde sürecinizi iyileştirin: Hangi atıklar daha iyi sonuç verdi? Hangi oran en iyi çalıştı? Not alın ve bir sonraki turda bu bilgileri uygulayın. Sürdürülebilir bir yaşam tarzı zamanla gelişir.',
        tip: 'Yılda 3-4 tur kompost yapabilirsiniz. Her tur öncekinden daha iyi olacaktır!',
    },
];
