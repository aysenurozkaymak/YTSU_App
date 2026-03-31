import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, borderRadius, spacing, typography, shadows } from '../theme';
import { Recipe } from '../types';

interface RecipeCardProps {
    recipe: Recipe;
    onPress: () => void;
    imageUri?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress, imageUri }) => {
    const ingredientCount = recipe.ingredients?.length || 0;
    const displayImageUri = imageUri || recipe.imageUri;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9}>
            <View style={styles.header}>
                {displayImageUri ? (
                    <Image
                        source={{ uri: displayImageUri }}
                        style={styles.recipeImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{recipe.icon}</Text>
                    </View>
                )}
                <View style={styles.headerText}>
                    <Text style={styles.title} numberOfLines={1}>
                        {recipe.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {recipe.originalServings} kişilik · {ingredientCount} malzeme
                    </Text>
                </View>
            </View>
            {recipe.instructions ? (
                <Text style={styles.instructions} numberOfLines={2}>
                    {recipe.instructions}
                </Text>
            ) : null}
            <View style={styles.footer}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{recipe.category}</Text>
                </View>
                <View style={styles.servingsBadge}>
                    <Text style={styles.servingsBadgeText}>
                        👤 {recipe.originalServings}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing.md,
        ...shadows.card,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        backgroundColor: '#FFF0E6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    recipeImage: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        marginRight: spacing.md,
    },
    icon: {
        fontSize: 24,
    },
    headerText: {
        flex: 1,
    },
    title: {
        ...typography.h3,
        marginBottom: 2,
    },
    subtitle: {
        ...typography.bodySmall,
    },
    instructions: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
    },
    badge: {
        backgroundColor: colors.secondary + '15',
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    badgeText: {
        ...typography.caption,
        color: colors.secondary,
        fontWeight: '600',
    },
    servingsBadge: {
        backgroundColor: '#FFF0E6',
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    servingsBadgeText: {
        ...typography.caption,
        color: colors.primary,
        fontWeight: '600',
    },
});

export default RecipeCard;
