import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { formatQuantity } from '../utils/scaling';

interface IngredientRowProps {
    name: string;
    quantity: number;
    unit: string;
    isScaled?: boolean;
}

const IngredientRow: React.FC<IngredientRowProps> = ({
    name,
    quantity,
    unit,
    isScaled = false,
}) => {
    return (
        <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.quantityContainer}>
                <Text style={[styles.quantity, isScaled && styles.scaledQuantity]}>
                    {formatQuantity(quantity)}
                </Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm + 2,
        borderBottomWidth: 1,
        borderBottomColor: colors.border + '40',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
        marginRight: spacing.md,
    },
    name: {
        ...typography.body,
        flex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        ...typography.body,
        fontWeight: '600',
        color: colors.text,
        marginRight: spacing.xs,
    },
    scaledQuantity: {
        color: colors.primary,
    },
    unit: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        minWidth: 40,
    },
});

export default IngredientRow;
