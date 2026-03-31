import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
    {
        id: 1,
        title: 'Karnıyarık',
        originalServings: 4,
        category: 'Ana Yemek',
        icon: '🍆',
        ingredients: [
            { name: 'Patlıcan', quantity: 8, unit: 'adet' },
            { name: 'Kıyma', quantity: 300, unit: 'gram' },
            { name: 'Soğan', quantity: 2, unit: 'adet' },
            { name: 'Domates', quantity: 3, unit: 'adet' },
            { name: 'Biber', quantity: 2, unit: 'adet' },
            { name: 'Sarımsak', quantity: 3, unit: 'diş' },
            { name: 'Sıvı Yağ', quantity: 4, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' },
        ],
        instructions:
            'Patlıcanları alacalı soyun ve tuzlu suda 20 dakika bekletin. Kızgın yağda kızartın. Soğanları doğrayıp kavurun, kıymayı ekleyin. Domates ve biberleri ekleyip pişirin. Patlıcanları ortadan yarın, iç harcı doldurun. Fırın tepsisine dizin, domates ve biber ile süsleyin. 180°C fırında 30 dakika pişirin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Patlıcanları yıkayın ve alacalı (çizgili) soyun. 💡İpucu: Soyarken bir şerit soyun, bir şerit bırakın.\n2. Tuzlu suya 20 dakika bırakın — bu acılığı alır.\n3. Kağıt havlu ile kurulayın ve kızgın yağda her tarafını kızartın. 💡İpucu: Yağ sıçramasın diye kapağı hafif aralık tutun.\n4. Ayrı bir tavada soğanları ince doğrayıp yağda kavurun.\n5. Kıymayı ekleyip suyunu çekene kadar pişirin.\n6. Domates ve biberleri küçük küpler halinde doğrayıp ekleyin. Tuz ve karabiber atın.\n7. Her patlıcanı ortadan bıçakla yarın ve harçtan doldurun.\n8. Fırın tepsisine dizip üzerine domates dilimleri koyun.\n9. Önceden ısıtılmış 180°C fırında 30 dakika pişirin. 💡İpucu: Tepsiyle birlikte yarım bardak su koyun, kurumasın.',
            'Orta':
                'Patlıcanları alacalı soyup tuzlu suda bekletin. Kızgın yağda kızartın. Soğanı kavurup kıymayı ekleyin, domates-biber ile pişirin. Patlıcanları yarıp doldurun. 180°C fırında 30 dk pişirin.',
            'Profesyonel':
                'Patlıcanları közleyerek veya airfryer ile yağsız pişirebilirsiniz — daha hafif olur. Kıyma yerine kuzu kol eti kullanmak lezzeti artırır. Harçta biraz biber salçası ve sumak ekleyin. Fırınlamadan önce üzerine kaşar peyniri rendesi deneyin. Servis sıcaklığı: 65-70°C ideal.',
        },
    },
    {
        id: 2,
        title: 'Mercimek Çorbası',
        originalServings: 6,
        category: 'Çorba',
        icon: '🥣',
        ingredients: [
            { name: 'Kırmızı Mercimek', quantity: 2, unit: 'bardak' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Havuç', quantity: 1, unit: 'adet' },
            { name: 'Patates', quantity: 1, unit: 'adet' },
            { name: 'Tereyağı', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Un', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Su', quantity: 8, unit: 'bardak' },
            { name: 'Tuz', quantity: 1.5, unit: 'çay kaşığı' },
            { name: 'Pul Biber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Limon', quantity: 1, unit: 'adet' },
        ],
        instructions:
            'Mercimekleri yıkayın. Soğan, havuç ve patatesi doğrayın. Tencereye su ve tüm malzemeleri koyup 25 dakika haşlayın. Blender ile pürüzsüz hale getirin. Ayrı bir tavada tereyağı eritin, un ve pul biber ekleyip sos yapın. Çorbaya ekleyip karıştırın. Limon sıkarak servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Mercimekleri bol su ile yıkayın — su berraklaşana kadar.\n2. Soğanı, havucu ve patatesi soyun ve küçük küpler halinde doğrayın. 💡İpucu: Küçük doğramak daha çabuk pişmesini sağlar.\n3. Büyük bir tencereye 8 bardak su koyup kaynatın.\n4. Mercimek ve doğranmış sebzeleri ekleyin.\n5. Kapağı kapatıp kısık ateşte 25 dakika pişirin.\n6. El blender ile (veya normal blender) pürüzsüz çekin. 💡İpucu: Sıcak çorbayı blender\'a koyarken kapağı hafif aralık bırakın.\n7. Küçük tavada tereyağını eritin, unu ve pul biberi ekleyip 1 dakika kavurun.\n8. Sosu çorbaya dökün, karıştırın.\n9. Tabağa koyup üzerine limon sıkarak servis edin.',
            'Orta':
                'Mercimek, soğan, havuç, patatesi 8 bardak suda 25 dk haşlayın. Blender ile çekin. Tereyağında un-pul biber sosu yapıp ekleyin. Limonla servis edin.',
            'Profesyonel':
                'Mercimekleri önceden 1 saat ıslatmak pişirme süresini yarıya düşürür. Havuç yerine tatlı patates kullanmak doygunluk katar. Tereyağı yerine zeytinyağı ile hafif versiyon yapılabilir. Çorbaya kimyon ve zerdeçal eklemek antioksidan değerini artırır. Kıvam ayarını süt veya krema ile yapabilirsiniz.',
        },
    },
    {
        id: 3,
        title: 'İskender Kebap',
        originalServings: 4,
        category: 'Ana Yemek',
        icon: '🥩',
        ingredients: [
            { name: 'Dana Eti (döner dilim)', quantity: 500, unit: 'gram' },
            { name: 'Pide', quantity: 2, unit: 'adet' },
            { name: 'Yoğurt', quantity: 300, unit: 'gram' },
            { name: 'Domates', quantity: 4, unit: 'adet' },
            { name: 'Tereyağı', quantity: 100, unit: 'gram' },
            { name: 'Biber Salçası', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Sıvı Yağ', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
        ],
        instructions:
            'Eti ince dilimler halinde kesin ve kızgın tavada pişirin. Domatesleri rendeleyin, salça ile birlikte pişirip sos yapın. Pideleri küçük parçalara ayırın. Tabağa önce pide, üzerine et, yandan yoğurt yerleştirin. Domates sosunu gezdirin. Tereyağını kızdırıp üzerine dökün.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Eti buzdolabından çıkarıp 15 dakika oda sıcaklığında bekletin.\n2. İnce dilimler halinde kesin. 💡İpucu: Yarı donmuş et daha kolay kesilir.\n3. Kızgın tavada az yağ ile her iki tarafını 2-3 dakika pişirin.\n4. Domatesleri rendenin kalın tarafıyla rendeleyin.\n5. Ayrı tencerede rendeli domatesi ve salçayı 10 dakika pişirin.\n6. Pideleri elinizle küçük lokmalar halinde koparın.\n7. Servis: Tabağa önce pide, üzerine et, yanına yoğurt koyun.\n8. Domates sosunu etin üzerine gezdirin.\n9. Küçük tavada tereyağını kızdırıp (köpürene kadar) etin üzerine dökün. 💡İpucu: Tereyağı fındık rengi olmalı, yanmamalı.',
            'Orta':
                'Eti ince dilimleyip kızgın tavada pişirin. Rendelenmiş domates + salça ile sos yapın. Pideyi küçük parçalayın. Tabağa pide-et-yoğurt dizin, sos gezdirin, kızgın tereyağı dökün.',
            'Profesyonel':
                'Et marine için: zeytinyağı, soğan suyu ve kekik ile 2 saat dinlendirin. Domates sosu için San Marzano tipi domates kullanın. Yoğurdu süzme yapın ve sarımsak ile tatlandırın. Tereyağı yerine iç yağ (kuyruk yağı) kullanmak otantik lezzet verir. Servis sıcaklığı kritiktir — tabağı önceden ısıtın.',
        },
    },
    {
        id: 4,
        title: 'Sütlaç',
        originalServings: 6,
        category: 'Tatlı',
        icon: '🍮',
        ingredients: [
            { name: 'Pirinç', quantity: 0.5, unit: 'bardak' },
            { name: 'Su', quantity: 1, unit: 'bardak' },
            { name: 'Süt', quantity: 1, unit: 'litre' },
            { name: 'Şeker', quantity: 1, unit: 'bardak' },
            { name: 'Nişasta', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Vanilya', quantity: 1, unit: 'paket' },
        ],
        instructions:
            'Pirinci yıkayıp 1 bardak su ile haşlayın. Sütü ekleyip kaynatın. Şekeri ekleyin. Nişastayı az sütte eritip tencereye ekleyin. Kıvam alana kadar karıştırarak pişirin. Vanilyayı ekleyin. Kâselere paylaştırın, soğutun. İsteğe bağlı fırında üzerini kızartın.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Pirinci bol su ile 3-4 kez yıkayın.\n2. Tencereye 1 bardak su ve pirinci koyup kaynatın. 💡İpucu: Pirinç yumuşayana kadar kısık ateşte pişirin.\n3. Pirincin suyu çekilince sütü yavaş yavaş ekleyin.\n4. Orta ateşte sürekli karıştırarak kaynatın. 💡İpucu: Dip tutmaması için tahta kaşık kullanın.\n5. Şekeri ekleyip karıştırın.\n6. Küçük bir kasede nişastayı 3-4 kaşık soğuk süt ile eritin.\n7. Tencereye ince ince dökün, hızlıca karıştırın.\n8. Kıvam alınca vanilyayı ekleyin.\n9. Kâselere dökün, soğumaya bırakın, buzdolabında 2 saat bekletin.',
            'Orta':
                'Pirinci haşlayıp süt ekleyin, kaynatın. Şeker ekleyin. Nişastayı sütte eritip tencereye dökün. Kıvam alınca vanilya ekleyin. Kâselere dökün, soğutun.',
            'Profesyonel':
                'Pirinç yerine kırık pirinç kullanmak daha kremamsı kıvam verir. Şeker yerine bal veya Hindistan cevizi şekeri deneyin. Vanilya özütü (çubuk vanilya) kullanmak profesyonel tat verir. Fırın sütlaç için: kâseleri 200°C üst ısıtıcıda 10 dk kızartın. Üzerine tarçın veya Antep fıstığı tozu serpin.',
        },
    },
    {
        id: 5,
        title: 'Çoban Salatası',
        originalServings: 4,
        category: 'Salata',
        icon: '🥗',
        ingredients: [
            { name: 'Domates', quantity: 4, unit: 'adet' },
            { name: 'Salatalık', quantity: 2, unit: 'adet' },
            { name: 'Biber', quantity: 3, unit: 'adet' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Maydanoz', quantity: 1, unit: 'demet' },
            { name: 'Zeytinyağı', quantity: 3, unit: 'çorba kaşığı' },
            { name: 'Limon Suyu', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Sumak', quantity: 1, unit: 'çay kaşığı' },
        ],
        instructions:
            'Domatesleri, salatalıkları, biberleri ve soğanı küçük küpler halinde doğrayın. Maydanozu ince kıyın. Tüm malzemeleri geniş bir kaba alın. Zeytinyağı, limon suyu, tuz ve sumağı ekleyip karıştırın. Soğuk servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Domatesleri yıkayın, saplarını çıkarın, küçük küpler halinde doğrayın.\n2. Salatalıkları soyun (isteğe bağlı) ve küçük küp doğrayın.\n3. Biberlerin sapını ve çekirdeklerini çıkarıp küp doğrayın.\n4. Soğanı ince ince doğrayın. 💡İpucu: Soğan gözlerinizi yakmıyorsa soğuk suda yıkayın.\n5. Maydanozu ince kıyın.\n6. Tüm malzemeleri geniş bir salata kabına alın.\n7. Üzerine zeytinyağı, limon suyu, tuz ve sumak ekleyin.\n8. Alttan üste karıştırın. Soğuk servis edin.',
            'Orta':
                'Tüm sebzeleri küp doğrayın, maydanozu kıyın. Bir kaba alıp zeytinyağı, limon, tuz, sumak ile harmanlayın. Soğuk servis.',
            'Profesyonel':
                'Domateslerin çekirdeklerini çıkarmak salatayı daha az sulu yapar. Soğanı doğradıktan sonra sirke-tuz karışımında 10 dk bekletmek acılığı azaltır. Nar ekşisi ile limon suyunu yarı yarıya karıştırmak derinlik katar. Premium zeytinyağı (soğuk sıkım) ile fark yaratın.',
        },
    },
    {
        id: 6,
        title: 'Mantı',
        originalServings: 6,
        category: 'Ana Yemek',
        icon: '🥟',
        ingredients: [
            { name: 'Un', quantity: 3, unit: 'bardak' },
            { name: 'Yumurta', quantity: 1, unit: 'adet' },
            { name: 'Su', quantity: 0.5, unit: 'bardak' },
            { name: 'Kıyma', quantity: 250, unit: 'gram' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Yoğurt', quantity: 400, unit: 'gram' },
            { name: 'Sarımsak', quantity: 3, unit: 'diş' },
            { name: 'Tereyağı', quantity: 50, unit: 'gram' },
            { name: 'Pul Biber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Nane', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Tuz', quantity: 1.5, unit: 'çay kaşığı' },
        ],
        instructions:
            'Un, yumurta, su ve tuz ile hamur yoğurun. 30 dakika dinlendirin. İnce açın, küçük kareler kesin. Kıyma ve soğanla iç harcı hazırlayın. Karelerin ortasına harç koyup kapatın. Kaynar tuzlu suda 15 dakika haşlayın. Sarımsaklı yoğurt ve tereyağlı pul biber sos ile servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Geniş bir kaba unu koyun, ortasına çukur açın.\n2. Yumurta, su ve tuzu ekleyin. 💡İpucu: Suyu ılık kullanın, hamur daha kolay açılır.\n3. Ele yapışmayan sert bir hamur yoğurun (10 dk).\n4. Streç film ile sarıp 30 dakika dinlendirin.\n5. İç harç: Kıymayı rendelenmiş soğan, tuz ve karabiber ile karıştırın.\n6. Hamuru tezgahta ince açın (2mm kalınlık). 💡İpucu: Yapışmaması için bol un serpin.\n7. 3x3 cm kareler kesin.\n8. Her karenin ortasına fındık büyüklüğünde harç koyup 4 köşeyi birleştirip kapatın.\n9. Kaynar tuzlu suda 15 dakika haşlayın.\n10. Sarımsağı ezin, yoğurda karıştırın. Tereyağında pul biber kavurun.\n11. Tabağa mantı, üzerine yoğurt, sonra sos dökün.',
            'Orta':
                'Un-yumurta-su ile hamur yoğurup dinlendirin. İnce açıp kareler kesin. Kıyma-soğan harcı koyup kapatın. Kaynar suda 15 dk haşlayın. Sarımsaklı yoğurt + tereyağlı pul biber ile servis.',
            'Profesyonel':
                'Hamuru makine ile 1mm kalınlığa açmak mantıyı daha narin yapar. Kıymayı el ile ince kıymak (bıçak arası) makineden daha iyi sonuç verir. Haşlamak yerine fırında pişirmek (180°C, 25dk sonra su ekle) çıtır doku verir. Kayseri mantısı için 1cm kareler kullanın. Sos: sarımsak + sumak yoğurt bir alternatif.',
        },
    },
    {
        id: 7,
        title: 'Ezogelin Çorbası',
        originalServings: 6,
        category: 'Çorba',
        icon: '🍲',
        ingredients: [
            { name: 'Kırmızı Mercimek', quantity: 1, unit: 'bardak' },
            { name: 'Bulgur', quantity: 0.5, unit: 'bardak' },
            { name: 'Pirinç', quantity: 3, unit: 'çorba kaşığı' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Domates Salçası', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Biber Salçası', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Tereyağı', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Nane', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Pul Biber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Su', quantity: 8, unit: 'bardak' },
            { name: 'Tuz', quantity: 1.5, unit: 'çay kaşığı' },
        ],
        instructions:
            'Mercimek, bulgur ve pirinci yıkayın. Tencereye su ile birlikte koyup kaynatın. 25 dakika pişirin. Ayrı tavada tereyağında soğanı kavurun, salçaları ekleyin. Tencereye aktarın. Tuz ve baharatları ekleyin. 5 dakika daha kaynatın.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Mercimek, bulgur ve pirinci ayrı ayrı yıkayın.\n2. Tencereye 8 bardak su koyup kaynatın.\n3. Yıkanan malzemeleri ekleyin, kapağı kapatın.\n4. Kısık ateşte 25 dakika pişirin. 💡İpucu: Ara sıra karıştırın, dip tutmasın.\n5. Ayrı tavada tereyağını eritin.\n6. Soğanı doğrayıp 3-4 dakika kavurun.\n7. Domates ve biber salçasını ekleyip 1 dk kavurun.\n8. Tencereye dökün.\n9. Tuz, nane ve pul biberi ekleyip 5 dk daha pişirin.',
            'Orta':
                'Mercimek-bulgur-pirinci suda 25 dk haşlayın. Tereyağında soğan ve salçaları kavurup çorbaya ekleyin. Baharatları atıp 5 dk kaynatın.',
            'Profesyonel':
                'Bulgur yerine freekeh (kavrulmuş yeşil buğday) kullanmak derinlik katar. Salçaları önce kuru kavurmak karamelizasyon sağlar. Çorbanın kıvamını blender ile ayarlayın — yarı pürüzsüz en iyi doku. Servis sırasında üzerine soğuk sıkım zeytinyağı ve taze nane yaprağı koyun.',
        },
    },
    {
        id: 8,
        title: 'Baklava',
        originalServings: 8,
        category: 'Tatlı',
        icon: '🍯',
        ingredients: [
            { name: 'Yufka', quantity: 20, unit: 'adet' },
            { name: 'Tereyağı (eritilmiş)', quantity: 250, unit: 'gram' },
            { name: 'Ceviz (dövülmüş)', quantity: 300, unit: 'gram' },
            { name: 'Antep Fıstığı', quantity: 50, unit: 'gram' },
            { name: 'Şeker', quantity: 3, unit: 'bardak' },
            { name: 'Su', quantity: 2.5, unit: 'bardak' },
            { name: 'Limon Suyu', quantity: 1, unit: 'çorba kaşığı' },
        ],
        instructions:
            'Şerbeti hazırlayın: Şeker ve suyu kaynatın, limon suyu ekleyin, soğumaya bırakın. Yufkaları tepsiye tek tek tereyağı sürerek serin. Her 3–4 yufkada bir ceviz serpin. Keskin bıçakla dilimleyin. 180°C fırında 40–45 dakika kızarana kadar pişirin. Soğuk şerbeti sıcak baklavanın üzerine dökün. Antep fıstığı ile süsleyin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. ÖNCELİKLE ŞERBETİ HAZIRLAYIN (soğuması gerekir!):\n   - 3 bardak şeker + 2.5 bardak suyu kaynatın\n   - Limon suyu ekleyin, 5 dk kaynatın, soğumaya bırakın\n2. Fırını 180°C\'ye ısıtın.\n3. Tereyağını eritin.\n4. Tepsinin boyutunda yufkaları kesin. 💡İpucu: Yufkalar tepsiden büyükse katlayın.\n5. Her yufkayı tepsiye koyup fırça ile tereyağı sürün.\n6. 3-4 yufkada bir ceviz serpin.\n7. Tüm yufkalar bitince keskin bıçakla baklava dilimleyin. 💡İpucu: Kesmeden pişirmeyin, sonra kesmek yufkaları kırar.\n8. 40-45 dk kızarana kadar pişirin.\n9. SICAK baklavanın üzerine SOĞUK şerbeti dökün.\n10. Antep fıstığı serpin.',
            'Orta':
                'Şerbeti önceden hazırlayıp soğutun. Yufkaları tereyağı sürerek tepsiye serin, aralara ceviz koyun. Dilimleyin. 180°C\'de 40-45 dk pişirin. Soğuk şerbet + sıcak baklava kuralını uygulayın.',
            'Profesyonel':
                'Yufka yerine kendi hamurunuzu açın — 40 kat ince hamur en iyisi. Tereyağını berrak (clarified) hale getirin — süt kalıntıları yanmaz. Cevizi ham bırakın, fırında kavrulacak. Şerbette gül suyu ve mastic sakız (damla sakızı) ekleyin. Baklavayı orta rafta pişirin, alt ısıtıcıyı düşük tutun. En az 4 saat şerbet emsin.',
        },
    },
    {
        id: 9,
        title: 'İmam Bayıldı',
        originalServings: 4,
        category: 'Ana Yemek',
        icon: '🍆',
        ingredients: [
            { name: 'Patlıcan', quantity: 6, unit: 'adet' },
            { name: 'Soğan', quantity: 3, unit: 'adet' },
            { name: 'Domates', quantity: 4, unit: 'adet' },
            { name: 'Sarımsak', quantity: 4, unit: 'diş' },
            { name: 'Zeytinyağı', quantity: 6, unit: 'çorba kaşığı' },
            { name: 'Maydanoz', quantity: 1, unit: 'demet' },
            { name: 'Şeker', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
        ],
        instructions:
            'Patlıcanları alacalı soyun, ortadan boylamasına yarın. Tuzlu suda bekletin. Soğanları ince halka, domatesleri küp doğrayın. Zeytinyağında soğanları kavurun, sarımsak ve domatesleri ekleyin. Maydanozu katın. Patlıcanları tepsiye dizin, iç harcı doldurun. Az su ekleyin. 180°C fırında 40 dakika pişirin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Patlıcanları alacalı soyun ve ortadan boylamasına yarım kesin.\n2. Tuzlu suda 20 dk bekletin, sonra durulayın. 💡İpucu: Bu adım acılığı alır.\n3. Soğanları ince ay şeklinde, domatesleri küçük küp doğrayın.\n4. Sarımsakları ince dilimleyin.\n5. Tavada zeytinyağını ısıtıp soğanları 5 dk kavurun.\n6. Sarımsak ve domatesleri ekleyin, 10 dk pişirin.\n7. Maydanozu ekleyin, karıştırın.\n8. Patlıcanları tepsiye dizin, harçtan doldurun.\n9. Yarım bardak su ekleyin.\n10. 180°C fırında 40 dk pişirin. Ilık servis edin.',
            'Orta':
                'Patlıcanları soyup yarın, tuzlu suda bekletin. Zeytinyağında soğan-sarımsak-domates kavurun. Patlıcanları tepsiye dizip doldurun. 180°C\'de 40 dk fırınlayın.',
            'Profesyonel':
                'Zeytinyağı miktarını artırın — orijinal tarif bol yağlıdır. Domatesleri kabuklarını soyarak kullanmak daha pürüzsüz doku verir. Biraz şeker domateslerin asitliğini dengeler. Pişirdikten sonra buzdolabında 4 saat dinlendirip soğuk servis edin — lezzet oturur.',
        },
    },
    {
        id: 10,
        title: 'Tavuk Sote',
        originalServings: 4,
        category: 'Ana Yemek',
        icon: '🍗',
        ingredients: [
            { name: 'Tavuk Göğsü', quantity: 500, unit: 'gram' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Biber', quantity: 2, unit: 'adet' },
            { name: 'Domates', quantity: 2, unit: 'adet' },
            { name: 'Mantar', quantity: 200, unit: 'gram' },
            { name: 'Sıvı Yağ', quantity: 3, unit: 'çorba kaşığı' },
            { name: 'Domates Salçası', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'Kekik', quantity: 0.5, unit: 'çay kaşığı' },
        ],
        instructions:
            'Tavuğu kuşbaşı doğrayın ve sıcak yağda sote edin. Soğanı kavurun. Biber ve mantarı ekleyin. 5 dakika soteleyin. Domatesleri rendeleyin, salça ile birlikte ekleyin. Baharatları atın. Kısık ateşte 15 dakika pişirin. Pilav ile servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Tavuk göğsünü kuşbaşı (2cm küpler) doğrayın.\n2. Geniş tavaya yağ koyup kızdırın.\n3. Tavukları ekleyin, karıştırmadan 2-3 dk pişirin. 💡İpucu: Her yüzeyi mühürleyin.\n4. Soğanı ekleyip 3 dk kavurun.\n5. Biberleri ve mantarları ekleyin, 5 dk karıştırın.\n6. Domatesleri rendeleyin, salçayla birlikte ekleyin.\n7. Tuz, karabiber ve kekik ekleyin.\n8. Kısık ateşte kapağı kapatıp 15 dk pişirin. 💡İpucu: Suyunu çok çekerse 2-3 kaşık su ekleyin.\n9. Pilav ile servis edin.',
            'Orta':
                'Tavuğu kuşbaşı doğrayıp soteleyin. Soğan, biber, mantarı ekleyin. Rendeli domates ve salça ile 15 dk kısık ateşte pişirin.',
            'Profesyonel':
                'Tavuğu marine edin: yoğurt + sarımsak + kekik ile 1 saat. But eti göğüsten daha sulu olur. Mantarları önceden yüksek ateşte ayrı soteleyin — su salmaz. Domates yerine kuru domates kullanmak yoğun tat verir. Servis sırasında taze kekik yaprakları ekleyin.',
        },
    },
    {
        id: 11,
        title: 'Domates Çorbası',
        originalServings: 4,
        category: 'Çorba',
        icon: '🍅',
        ingredients: [
            { name: 'Domates', quantity: 6, unit: 'adet' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Sarımsak', quantity: 2, unit: 'diş' },
            { name: 'Tereyağı', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Un', quantity: 1, unit: 'çorba kaşığı' },
            { name: 'Su', quantity: 4, unit: 'bardak' },
            { name: 'Krema', quantity: 3, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Fesleğen', quantity: 4, unit: 'yaprak' },
        ],
        instructions:
            'Domatesleri haşlayıp kabuklarını soyun, doğrayın. Soğan ve sarımsağı tereyağında kavurun. Unu ekleyip kavurun. Domatesleri ve suyu ekleyin. 20 dakika pişirin. Blender ile çekin. Kremayı ekleyin. Fesleğen ile süsleyerek servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Domateslerin alt kısmına çapraz çizik atın.\n2. Kaynar suya 1 dk atın, sonra soğuk suya alın. 💡İpucu: Kabuklar kolayca soyulur.\n3. Kabukları soyup küçük doğrayın.\n4. Soğan ve sarımsağı ince doğrayın.\n5. Tencerede tereyağını eritip soğan-sarımsak kavurun.\n6. Unu ekleyip 1 dk karıştırın (topaklanmasın).\n7. Domatesleri ve suyu ekleyin.\n8. 20 dk pişirin, blender ile çekin.\n9. Kremayı ekleyip karıştırın.\n10. Fesleğen yaprakları ile süsleyerek servis edin.',
            'Orta':
                'Domatesleri haşlayıp soyun. Tereyağında soğan-sarımsak-un kavurun. Domates ve suyu ekleyip 20 dk pişirin. Blender, krema, fesleğen.',
            'Profesyonel':
                'Domatesleri yarıyıp fırında 200°C\'de 20 dk közleyin — karamelize lezzet verir. İtalyan San Marzano domates kullanın. Un yerine patates ile kıvam verin (glüten-free). Krema yerine Mascarpone deneyin. Servis: truffle yağı damlatın, grissini ile sunun.',
        },
    },
    {
        id: 12,
        title: 'Künefe',
        originalServings: 4,
        category: 'Tatlı',
        icon: '🧀',
        ingredients: [
            { name: 'Kadayıf', quantity: 250, unit: 'gram' },
            { name: 'Dil Peyniri', quantity: 200, unit: 'gram' },
            { name: 'Tereyağı (eritilmiş)', quantity: 100, unit: 'gram' },
            { name: 'Şeker', quantity: 1.5, unit: 'bardak' },
            { name: 'Su', quantity: 1, unit: 'bardak' },
            { name: 'Limon Suyu', quantity: 1, unit: 'çay kaşığı' },
            { name: 'Antep Fıstığı', quantity: 2, unit: 'çorba kaşığı' },
        ],
        instructions:
            'Şerbeti hazırlayın: Şeker ve suyu kaynatın, limon suyu ekleyin, soğutun. Kadayıfı ince ince açın, tereyağı ile harmanlayın. Yarısını künefe tepsisine basın. Tuzunu alınmış peyniri üzerine dizin. Kalan kadayıfı üzerine basın. Ocakta altını kızartın, çevirip diğer tarafı da kızartın. Soğuk şerbeti dökün. Antep fıstığı serpin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Önce şerbeti yapın: Şeker + su kaynatın, limon ekleyin, soğutun.\n2. Peyniri ince dilimleyin, tuzunu almak için 2 saat suda bekletin. 💡İpucu: Suyu birkaç kez değiştirin.\n3. Kadayıfı elde ince ince ayırın.\n4. Eritilmiş tereyağı ile iyice harmanlayın.\n5. Yarısını künefe tepsisine bastırarak yayın.\n6. Peyniri üzerine düzgünce dizin.\n7. Kalan kadayıfı üstüne basın.\n8. Orta ateşte ocağa koyun, altı kızarınca çevirin. 💡İpucu: Tabak yardımıyla çevirin.\n9. Diğer tarafı da kızartın.\n10. Soğuk şerbeti dökün, fıstık serpin. Sıcak yiyin!',
            'Orta':
                'Şerbeti önceden yapıp soğutun. Kadayıfı tereyağı ile harmanlayın. Tepsiye basın, peynir dizin, üstünü kapatın. Ocakta çift taraflı kızartın. Şerbet dökün.',
            'Profesyonel':
                'Hatay usulü için kadayıfı çok ince ve kısa açın. Peynir olarak mozzarella + dil peyniri karışımı deneyin. Ocak yerine fırında (200°C, 20dk) daha kontrollü pişer. Şerbete gül suyu veya portakal çiçeği suyu ekleyin. Dondurma eşliğinde servis.',
        },
    },
    {
        id: 13,
        title: 'Sigara Böreği',
        originalServings: 6,
        category: 'Aperatif',
        icon: '🌯',
        ingredients: [
            { name: 'Yufka', quantity: 4, unit: 'adet' },
            { name: 'Beyaz Peynir', quantity: 200, unit: 'gram' },
            { name: 'Maydanoz', quantity: 1, unit: 'demet' },
            { name: 'Yumurta', quantity: 1, unit: 'adet' },
            { name: 'Sıvı Yağ (kızartma)', quantity: 500, unit: 'ml' },
        ],
        instructions:
            'Peyniri ufalayın, ince kıyılmış maydanoz ve yumurta ile karıştırın. Yufkaları üçgen olarak kesin. Geniş ucuna harç koyun, rulo şeklinde sarın. Uçlarını yumurta ile yapıştırın. Kızgın yağda altın rengi olana kadar kızartın. Kağıt havlu üzerinde süzün.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Peyniri bir kaba koyup çatalla iyice ezin.\n2. Maydanozu ince kıyıp peynire ekleyin.\n3. 1 yumurtayı ekleyip karıştırın.\n4. Yufkayı 4 üçgene kesin.\n5. Üçgenin geniş ucuna 1 kaşık harç koyun.\n6. Sıkıca rulo şeklinde sarın. 💡İpucu: Hava kalmasın, sıkı sarın.\n7. Uçlarını yumurta ile yapıştırın.\n8. Derin tavaya bolca yağ koyup kızdırın. 💡İpucu: Bir ekmek parçası atın, hemen kızarıyorsa yağ hazır.\n9. Börekleri 2-3\'er koyup altın rengi olana kadar kızartın.\n10. Kağıt havlu üzerinde süzün.',
            'Orta':
                'Peynir + maydanoz + yumurta karıştırın. Yufkayı üçgen kesip harç koyun, rulo sarın. Kızgın yağda altın rengi olana kadar kızartın.',
            'Profesyonel':
                'Peynire kaşar rendesi eklemek eriyen doku katar. İç harça ceviz veya lor peyniri alternatif. Kızartma yerine fırında (200°C, yağ sürülmüş, 20dk) daha sağlıklı. Yufka kurumasın diye nemli bez altında tutun. Airfryer ile de mükemmel sonuç alırsınız (180°C, 12dk).',
        },
    },
    {
        id: 14,
        title: 'Adana Kebap',
        originalServings: 4,
        category: 'Ana Yemek',
        icon: '🔥',
        ingredients: [
            { name: 'Kuzu Kıyma (yağlı)', quantity: 600, unit: 'gram' },
            { name: 'Soğan', quantity: 1, unit: 'adet' },
            { name: 'Sarımsak', quantity: 3, unit: 'diş' },
            { name: 'Pul Biber', quantity: 2, unit: 'çorba kaşığı' },
            { name: 'Tuz', quantity: 1.5, unit: 'çay kaşığı' },
            { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'Kimyon', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'Lavaş', quantity: 4, unit: 'adet' },
            { name: 'Közlenmiş Domates', quantity: 4, unit: 'adet' },
            { name: 'Közlenmiş Biber', quantity: 4, unit: 'adet' },
        ],
        instructions:
            'Kıymayı iki kez çektirin. Rendelenmiş soğan, ezilmiş sarımsak ve baharatları ekleyin. Elinizle iyice yoğurun. Buzdolabında 2 saat dinlendirin. Şişlere sarın. Mangalda veya ızgarada pişirin. Lavaş, közlenmiş domates ve biber ile servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Kasaptan kıymayı 2 kez çektirin (yağlı olması önemli!).\n2. Soğanı rendeleyin, suyunu sıkın.\n3. Sarımsakları ezin.\n4. Kıymaya soğan, sarımsak ve tüm baharatları ekleyin.\n5. Elinizle en az 10 dakika yoğurun. 💡İpucu: Ne kadar çok yoğurursanız o kadar iyi yapışır.\n6. Streç film ile sarıp buzdolabında 2 saat dinlendirin.\n7. Geniş şişlere parmak kalınlığında sarın.\n8. Mangal veya ızgarada her tarafını 3-4 dk pişirin.\n9. Lavaş, közlenmiş domates ve biber ile servis edin. 💡İpucu: Lavaşı kısa süre ızgaraya koyun.',
            'Orta':
                'Çift çekilmiş kıymaya rendelenmiş soğan, sarımsak, baharatlar ekleyip iyice yoğurun. 2 saat dinlendirin. Şişe sarıp mangal/ızgarada pişirin.',
            'Profesyonel':
                'Kıyma oranı: %70 yağsız et + %30 kuyruk yağı ideal. Kıymayı zırhla (zırh kebabı) hazırlamak en otantik yöntem. İsot biber (Urfa biberi) pul bibere alternatif. Et 2 değil 4 saat dinlenmeli — protein bağları güçlenir. Mangal kömürü meşe veya kayın olmalı. Servis: soğan-sumak salatası, nar ekşisi ile.',
        },
    },
    {
        id: 15,
        title: 'Keşkül',
        originalServings: 6,
        category: 'Tatlı',
        icon: '🥜',
        ingredients: [
            { name: 'Süt', quantity: 1, unit: 'litre' },
            { name: 'Şeker', quantity: 0.75, unit: 'bardak' },
            { name: 'Nişasta', quantity: 3, unit: 'çorba kaşığı' },
            { name: 'Hindistan Cevizi', quantity: 50, unit: 'gram' },
            { name: 'Badem (çekilmiş)', quantity: 50, unit: 'gram' },
            { name: 'Vanilya', quantity: 1, unit: 'paket' },
            { name: 'Tarçın', quantity: 1, unit: 'çay kaşığı' },
        ],
        instructions:
            'Nişastayı bir miktar sütte eritin. Kalan sütü tencereye alıp şekeri ekleyin. Kaynayana kadar karıştırın. Nişastalı karışımı ekleyin. Kıvam alana kadar kısık ateşte pişirin. Badem ve Hindistan cevizinin yarısını ekleyin. Vanilyayı katın. Kâselere dökün. Üzerine Hindistan cevizi ve tarçın serpin. Soğutup servis edin.',
        instructionsByLevel: {
            'Başlangıç':
                '1. Küçük kaseye nişastayı koyun, 4-5 kaşık soğuk süt ile eritin.\n2. Kalan sütü tencereye dökün, şekeri ekleyin.\n3. Orta ateşte sürekli karıştırarak kaynatın. 💡İpucu: Tahta kaşık kullanın.\n4. Nişastalı karışımı ince ince dökün, hızla karıştırın.\n5. Kıvam alana kadar (5-7 dk) kısık ateşte pişirin.\n6. Bademin ve Hindistan cevizinin yarısını ekleyin.\n7. Vanilyayı katın, karıştırın.\n8. Kâselere dökün.\n9. Üzerine kalan Hindistan cevizi ve tarçın serpin.\n10. Buzdolabında 2 saat soğutup servis edin.',
            'Orta':
                'Nişastayı sütle eritin. Kalan sütü şekerle kaynatın. Nişasta ekleyin, kıvam verin. Badem, Hindistan cevizi, vanilya ekleyin. Kâselere dökün, soğutun.',
            'Profesyonel':
                'Badem sütü (%30) karıştırmak daha yoğun tat verir. Nişasta yerine pirinç unu kullanmak daha ipeksi kıvam sağlar. Şeker yerine hurma şurubu deneyin. Hindistan cevizi yerine kavurulmuş fındık tozu alternatif. Üzerine yenilebilir altın varak (premium sunum) veya nar taneleri ekleyin.',
        },
    },
];

/**
 * ID'ye göre tarif bul
 */
export function getRecipeById(id: number): Recipe | undefined {
    return RECIPES.find(r => r.id === id);
}

/**
 * Kategoriye göre filtrele
 */
export function getRecipesByCategory(category: string): Recipe[] {
    if (category === 'Tümü') {
        return RECIPES;
    }
    return RECIPES.filter(r => r.category === category);
}

/**
 * Arama (başlık veya malzeme adında)
 */
export function searchRecipes(query: string): Recipe[] {
    const q = query.toLowerCase().trim();
    if (!q) {
        return RECIPES;
    }
    return RECIPES.filter(
        r =>
            r.title.toLowerCase().includes(q) ||
            r.ingredients.some(ing => ing.name.toLowerCase().includes(q)),
    );
}
