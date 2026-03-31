import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';
import { SkillLevel } from '../types';

const LEVELS: { key: SkillLevel; icon: string; label: string }[] = [
    { key: 'Başlangıç', icon: '🌱', label: 'Başlangıç' },
    { key: 'Orta', icon: '🍳', label: 'Orta' },
    { key: 'Profesyonel', icon: '👨‍🍳', label: 'Profesyonel' },
];

interface SkillLevelSelectorProps {
    selected: SkillLevel;
    onSelect: (level: SkillLevel) => void;
}

const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
    selected,
    onSelect,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎓 Yemek Yapma Seviyeniz</Text>
            <View style={styles.row}>
                {LEVELS.map(level => {
                    const isActive = level.key === selected;
                    return (
                        <TouchableOpacity
                            key={level.key}
                            style={[styles.chip, isActive && styles.chipActive]}
                            onPress={() => onSelect(level.key)}
                            activeOpacity={0.8}>
                            <Text style={styles.chipIcon}>{level.icon}</Text>
                            <Text
                                style={[styles.chipText, isActive && styles.chipTextActive]}>
                                {level.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    chip: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipIcon: {
        fontSize: 20,
        marginBottom: spacing.xs,
    },
    chipText: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.text,
    },
    chipTextActive: {
        color: colors.white,
    },
});

export default SkillLevelSelector;
