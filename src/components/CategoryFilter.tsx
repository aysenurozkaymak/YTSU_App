import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { RecipeCategory } from '../types';

const CATEGORIES: { key: RecipeCategory; icon: string; bg: string }[] = [
    { key: 'Tümü', icon: '🍽️', bg: '#E8F5E9' },
    { key: 'Ana Yemek', icon: '🥘', bg: '#FFF3E0' },
    { key: 'Çorba', icon: '🥣', bg: '#E3F2FD' },
    { key: 'Tatlı', icon: '🍰', bg: '#FCE4EC' },
    { key: 'Salata', icon: '🥗', bg: '#E8F5E9' },
    { key: 'Aperatif', icon: '🌯', bg: '#FFF8E1' },
];

interface CategoryFilterProps {
    selected: RecipeCategory;
    onSelect: (category: RecipeCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selected,
    onSelect,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            {CATEGORIES.map(cat => {
                const isActive = cat.key === selected;
                return (
                    <TouchableOpacity
                        key={cat.key}
                        style={[
                            styles.card,
                            { backgroundColor: isActive ? colors.primary : cat.bg },
                            isActive && styles.cardActive,
                        ]}
                        onPress={() => onSelect(cat.key)}
                        activeOpacity={0.7}>
                        <Text style={styles.cardIcon}>{cat.icon}</Text>
                        <Text
                            style={[
                                styles.cardLabel,
                                isActive && styles.cardLabelActive,
                            ]}
                            numberOfLines={1}>
                            {cat.key}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.base,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 78,
        height: 72,
        borderRadius: borderRadius.lg,
        marginRight: spacing.sm + 2,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardActive: {
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        borderColor: colors.primaryDark,
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: spacing.xs,
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
    },
    cardLabelActive: {
        color: colors.white,
    },
});

export default CategoryFilter;
