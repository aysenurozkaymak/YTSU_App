import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { RootStackParamList, SkillLevel } from '../types';
import IngredientRow from '../components/IngredientRow';
import ServingsStepper from '../components/ServingsStepper';
import SkillLevelSelector from '../components/SkillLevelSelector';
import FeedbackCard from '../components/FeedbackCard';
import PrimaryButton from '../components/PrimaryButton';
import { getRecipeById } from '../data/recipes';
import { scaleIngredients } from '../utils/scaling';
import { submitFeedback, getAdminRecipeById } from '../services/database';

type RecipeDetailScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RecipeDetail'>;
    route: RouteProp<RootStackParamList, 'RecipeDetail'>;
};

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
    navigation,
    route,
}) => {
    const { recipeId, userId, isAdminRecipe } = route.params;
    const [adminRecipe, setAdminRecipe] = React.useState<any>(null);
    const [loadingAdmin, setLoadingAdmin] = React.useState(false);

    React.useEffect(() => {
        if (isAdminRecipe && recipeId >= 1000) {
            setLoadingAdmin(true);
            getAdminRecipeById(recipeId - 1000)
                .then(r => setAdminRecipe(r))
                .catch(() => { })
                .finally(() => setLoadingAdmin(false));
        }
    }, [isAdminRecipe, recipeId]);

    const recipe = isAdminRecipe ? adminRecipe : getRecipeById(recipeId);
    const [targetServings, setTargetServings] = React.useState(
        recipe?.originalServings || 4,
    );
    const [skillLevel, setSkillLevel] = React.useState<SkillLevel>('Başlangıç');

    if (!recipe || loadingAdmin) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    {loadingAdmin ? 'Yükleniyor...' : 'Tarif bulunamadı.'}
                </Text>
                {!loadingAdmin && (
                    <PrimaryButton
                        title="Geri Dön"
                        onPress={() => navigation.goBack()}
                        variant="outline"
                        style={{ marginTop: spacing.base }}
                    />
                )}
            </View>
        );
    }

    const scaledIngredients = scaleIngredients(
        recipe.ingredients,
        recipe.originalServings,
        targetServings,
    );
    const isScaled = targetServings !== recipe.originalServings;

    const currentInstructions = recipe.instructionsByLevel[skillLevel];

    const handleFeedback = async (rating: number, comment: string) => {
        try {
            await submitFeedback(userId, recipeId, rating, comment);
        } catch {
            // Geri bildirim hatasını sessizce yönet
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.secondary}
            />
            <View style={styles.header}>
                <PrimaryButton
                    title="← Geri"
                    onPress={() => navigation.goBack()}
                    variant="ghost"
                    style={styles.backButton}
                />
                <View style={styles.headerContent}>
                    {recipe.imageUri ? (
                        <Image
                            source={{ uri: recipe.imageUri }}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <Text style={styles.headerIcon}>{recipe.icon}</Text>
                    )}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle} numberOfLines={2}>
                            {recipe.title}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {recipe.category} · Orijinal: {recipe.originalServings} kişilik
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}>
                {/* Ölçekleme */}
                <View style={styles.scalingCard}>
                    <Text style={styles.sectionTitle}>🎯 Hedef Kişi Sayısı</Text>
                    <ServingsStepper
                        value={targetServings}
                        onChange={setTargetServings}
                        label=""
                    />
                    {isScaled && (
                        <View style={styles.scalingBadge}>
                            <Text style={styles.scalingBadgeText}>
                                ×{(targetServings / recipe.originalServings).toFixed(2)}{' '}
                                ölçeklendi
                            </Text>
                        </View>
                    )}
                </View>

                {/* Malzemeler */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🥘 Malzemeler</Text>
                    <View style={styles.ingredientsCard}>
                        {scaledIngredients.map((ingredient, index) => (
                            <IngredientRow
                                key={index}
                                name={ingredient.name}
                                quantity={ingredient.scaledQuantity}
                                unit={ingredient.unit}
                                isScaled={isScaled}
                            />
                        ))}
                    </View>
                </View>

                {/* Seviye Seçimi */}
                <View style={styles.section}>
                    <SkillLevelSelector
                        selected={skillLevel}
                        onSelect={setSkillLevel}
                    />
                </View>

                {/* Yapılış */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📝 Yapılış ({skillLevel})</Text>
                    <View style={styles.instructionsCard}>
                        <Text style={styles.instructionsText}>
                            {currentInstructions}
                        </Text>
                    </View>
                </View>

                {/* Geri Bildirim */}
                <View style={styles.section}>
                    <FeedbackCard onSubmit={handleFeedback} />
                </View>

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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.xl,
    },
    loadingText: {
        ...typography.body,
        color: colors.textSecondary,
    },
    header: {
        backgroundColor: colors.secondary,
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: -spacing.sm,
        marginBottom: spacing.sm,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 48,
        marginRight: spacing.base,
    },
    headerImage: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.md,
        marginRight: spacing.base,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.white,
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.8,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.base,
        paddingTop: spacing.lg,
    },
    scalingCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
        alignItems: 'center',
    },
    scalingBadge: {
        backgroundColor: '#FFF0E6',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
        marginTop: spacing.sm,
    },
    scalingBadgeText: {
        ...typography.bodySmall,
        color: colors.primary,
        fontWeight: '600',
    },
    section: {
        marginBottom: spacing.base,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    ingredientsCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        ...shadows.card,
    },
    instructionsCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        ...shadows.card,
    },
    instructionsText: {
        ...typography.body,
        lineHeight: 26,
        color: colors.text,
    },
    bottomSpacer: {
        height: spacing.xxl,
    },
});

export default RecipeDetailScreen;
