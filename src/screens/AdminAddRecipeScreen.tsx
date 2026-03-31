import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { RecipeCategory, Ingredient } from '../types';
import PrimaryButton from '../components/PrimaryButton';
import InputField from '../components/InputField';
import SkillLevelSelector from '../components/SkillLevelSelector';
import { addAdminRecipe } from '../services/database';

const CATEGORIES: RecipeCategory[] = [
    'Ana Yemek',
    'Çorba',
    'Tatlı',
    'Salata',
    'Aperatif',
];

const ICONS = ['🍽️', '🍲', '🥩', '🍗', '🥗', '🍰', '🧀', '🌯', '🍆', '🔥', '🥜', '🍮', '🍯', '🥣', '🍅', '🥟'];

interface AdminAddRecipeScreenProps {
    route: any;
}

const AdminAddRecipeScreen: React.FC<AdminAddRecipeScreenProps> = ({ route }) => {
    const { userId } = route.params || {};

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<RecipeCategory>('Ana Yemek');
    const [servings, setServings] = useState('4');
    const [selectedSkillLevel, setSelectedSkillLevel] = useState<import('../types').SkillLevel>('Başlangıç');
    const [instructionsByLevel, setInstructionsByLevel] = useState<import('../types').InstructionsByLevel>({
        'Başlangıç': '',
        'Orta': '',
        'Profesyonel': '',
    });
    const [selectedIcon, setSelectedIcon] = useState('🍽️');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Malzemeler
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { name: '', quantity: 0, unit: '' },
    ]);

    const handlePickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
                maxWidth: 800,
                maxHeight: 800,
            });

            if (result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri || null);
            }
        } catch (error) {
            Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
        }
    };

    const addIngredientRow = () => {
        setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
    };

    const removeIngredientRow = (index: number) => {
        if (ingredients.length <= 1) return;
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
        const updated = [...ingredients];
        if (field === 'quantity') {
            updated[index] = { ...updated[index], [field]: Number(value) || 0 };
        } else {
            updated[index] = { ...updated[index], [field]: value };
        }
        setIngredients(updated);
    };

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Hata', 'Tarif başlığı gereklidir.');
            return;
        }
        if (!instructionsByLevel['Başlangıç'].trim()) {
            Alert.alert('Hata', 'En az Başlangıç seviyesi için hazırlanış talimatları gereklidir.');
            return;
        }

        const validIngredients = ingredients.filter(
            ing => ing.name.trim() !== '',
        );

        if (validIngredients.length === 0) {
            Alert.alert('Hata', 'En az bir malzeme ekleyin.');
            return;
        }

        setLoading(true);
        try {
            await addAdminRecipe(
                title.trim(),
                parseInt(servings, 10) || 4,
                {
                    'Başlangıç': instructionsByLevel['Başlangıç'].trim(),
                    'Orta': instructionsByLevel['Orta'].trim() || instructionsByLevel['Başlangıç'].trim(),
                    'Profesyonel': instructionsByLevel['Profesyonel'].trim() || instructionsByLevel['Başlangıç'].trim(),
                },
                category,
                selectedIcon,
                imageUri,
                validIngredients,
                userId,
            );

            Alert.alert('Başarılı', 'Tarif başarıyla eklendi!', [
                {
                    text: 'Tamam',
                    onPress: () => {
                        // Formu temizle
                        setTitle('');
                        setInstructionsByLevel({
                            'Başlangıç': '',
                            'Orta': '',
                            'Profesyonel': '',
                        });
                        setServings('4');
                        setCategory('Ana Yemek');
                        setSelectedIcon('🍽️');
                        setImageUri(null);
                        setIngredients([{ name: '', quantity: 0, unit: '' }]);
                    },
                },
            ]);
        } catch (error) {
            Alert.alert('Hata', 'Tarif kaydedilirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.secondary}
            />
            <View style={styles.header}>
                <Text style={styles.headerIcon}>📝</Text>
                <Text style={styles.headerTitle}>Yeni Tarif Ekle</Text>
                <Text style={styles.headerSubtitle}>
                    Yönetici paneli — yeni tarif oluşturun
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Resim Seçimi */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📷 Tarif Resmi</Text>
                    <TouchableOpacity
                        style={styles.imagePickerButton}
                        onPress={handlePickImage}
                        activeOpacity={0.8}>
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.imagePlaceholderIcon}>📷</Text>
                                <Text style={styles.imagePlaceholderText}>
                                    Galeriden resim seçin
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    {imageUri && (
                        <TouchableOpacity
                            style={styles.removeImageBtn}
                            onPress={() => setImageUri(null)}>
                            <Text style={styles.removeImageText}>Resmi Kaldır</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Başlık */}
                <InputField
                    label="Tarif Başlığı"
                    placeholder="Örn: Tavuk Sote"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Kategori */}
                <View style={styles.section}>
                    <Text style={styles.label}>Kategori</Text>
                    <View style={styles.categoryRow}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryChip,
                                    category === cat && styles.categoryChipActive,
                                ]}
                                onPress={() => setCategory(cat)}>
                                <Text
                                    style={[
                                        styles.categoryChipText,
                                        category === cat && styles.categoryChipTextActive,
                                    ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* İkon Seçimi */}
                <View style={styles.section}>
                    <Text style={styles.label}>İkon</Text>
                    <View style={styles.iconRow}>
                        {ICONS.map(icon => (
                            <TouchableOpacity
                                key={icon}
                                style={[
                                    styles.iconChip,
                                    selectedIcon === icon && styles.iconChipActive,
                                ]}
                                onPress={() => setSelectedIcon(icon)}>
                                <Text style={styles.iconChipText}>{icon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Kişi Sayısı */}
                <InputField
                    label="Kişi Sayısı"
                    placeholder="4"
                    value={servings}
                    onChangeText={setServings}
                    keyboardType="numeric"
                />

                {/* Malzemeler */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🥘 Malzemeler</Text>
                    {ingredients.map((ing, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <TextInput
                                style={[styles.ingredientInput, styles.ingredientName]}
                                placeholder="Malzeme adı"
                                value={ing.name}
                                onChangeText={val => updateIngredient(index, 'name', val)}
                                placeholderTextColor={colors.textLight}
                            />
                            <TextInput
                                style={[styles.ingredientInput, styles.ingredientQty]}
                                placeholder="Miktar"
                                value={ing.quantity ? String(ing.quantity) : ''}
                                onChangeText={val => updateIngredient(index, 'quantity', val)}
                                keyboardType="numeric"
                                placeholderTextColor={colors.textLight}
                            />
                            <TextInput
                                style={[styles.ingredientInput, styles.ingredientUnit]}
                                placeholder="Birim"
                                value={ing.unit}
                                onChangeText={val => updateIngredient(index, 'unit', val)}
                                placeholderTextColor={colors.textLight}
                            />
                            {ingredients.length > 1 && (
                                <TouchableOpacity
                                    style={styles.removeIngBtn}
                                    onPress={() => removeIngredientRow(index)}>
                                    <Text style={styles.removeIngText}>✕</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.addIngBtn}
                        onPress={addIngredientRow}>
                        <Text style={styles.addIngText}>+ Malzeme Ekle</Text>
                    </TouchableOpacity>
                </View>

                {/* Hazırlanış */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📝 Hazırlanış</Text>

                    <SkillLevelSelector
                        selected={selectedSkillLevel}
                        onSelect={setSelectedSkillLevel}
                    />

                    <TextInput
                        style={[styles.instructionsInput, { marginTop: spacing.md }]}
                        placeholder={`${selectedSkillLevel} seviyesi için tarif talimatlarını yazın...`}
                        value={instructionsByLevel[selectedSkillLevel]}
                        onChangeText={(text) => setInstructionsByLevel({
                            ...instructionsByLevel,
                            [selectedSkillLevel]: text
                        })}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        placeholderTextColor={colors.textLight}
                    />
                </View>

                {/* Kaydet */}
                <PrimaryButton
                    title="Tarifi Kaydet"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveButton}
                />

                <View style={styles.bottomSpacer} />
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
        backgroundColor: colors.secondary,
        paddingTop: spacing.xxxl + spacing.base,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 48,
        marginBottom: spacing.sm,
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
        flex: 1,
    },
    contentContainer: {
        padding: spacing.xl,
        paddingTop: spacing.lg,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    label: {
        ...typography.body,
        fontWeight: '600',
        marginBottom: spacing.sm,
        color: colors.text,
    },

    // Resim
    imagePickerButton: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: borderRadius.lg - 2,
    },
    imagePlaceholder: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface,
    },
    imagePlaceholderIcon: {
        fontSize: 48,
        marginBottom: spacing.sm,
    },
    imagePlaceholderText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    removeImageBtn: {
        marginTop: spacing.sm,
        alignSelf: 'center',
    },
    removeImageText: {
        ...typography.bodySmall,
        color: colors.error,
        fontWeight: '600',
    },

    // Kategori
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    categoryChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categoryChipText: {
        ...typography.bodySmall,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    categoryChipTextActive: {
        color: colors.white,
    },

    // İkon
    iconRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    iconChip: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.border,
    },
    iconChipActive: {
        borderColor: colors.primary,
        backgroundColor: '#FFF0E6',
    },
    iconChipText: {
        fontSize: 22,
    },

    // Malzemeler
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.xs,
    },
    ingredientInput: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        borderWidth: 1,
        borderColor: colors.border,
        ...typography.bodySmall,
        color: colors.text,
    },
    ingredientName: {
        flex: 3,
    },
    ingredientQty: {
        flex: 1.5,
        textAlign: 'center',
    },
    ingredientUnit: {
        flex: 1.5,
    },
    removeIngBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.error + '15',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeIngText: {
        color: colors.error,
        fontSize: 14,
        fontWeight: '700',
    },
    addIngBtn: {
        paddingVertical: spacing.sm,
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    addIngText: {
        ...typography.body,
        color: colors.primary,
        fontWeight: '600',
    },

    // Hazırlanış
    instructionsInput: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        minHeight: 140,
        borderWidth: 1,
        borderColor: colors.border,
        ...typography.body,
        color: colors.text,
        lineHeight: 24,
    },

    // Kaydet
    saveButton: {
        marginTop: spacing.md,
    },
    bottomSpacer: {
        height: spacing.xxxl,
    },
});

export default AdminAddRecipeScreen;
