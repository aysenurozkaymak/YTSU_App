import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../theme';

interface ServingsStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
}

const ServingsStepper: React.FC<ServingsStepperProps> = ({
    value,
    onChange,
    min = 1,
    max = 100,
    label = 'Kişi Sayısı',
}) => {
    const decrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const increase = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.stepper}>
                <TouchableOpacity
                    style={[styles.button, value <= min && styles.buttonDisabled]}
                    onPress={decrease}
                    disabled={value <= min}
                    activeOpacity={0.7}>
                    <Text
                        style={[
                            styles.buttonText,
                            value <= min && styles.buttonTextDisabled,
                        ]}>
                        −
                    </Text>
                </TouchableOpacity>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.valueLabel}>kişi</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, value >= max && styles.buttonDisabled]}
                    onPress={increase}
                    disabled={value >= max}
                    activeOpacity={0.7}>
                    <Text
                        style={[
                            styles.buttonText,
                            value >= max && styles.buttonTextDisabled,
                        ]}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: spacing.md,
    },
    label: {
        ...typography.bodySmall,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.xl,
        borderWidth: 1.5,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    button: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary + '10',
    },
    buttonDisabled: {
        backgroundColor: colors.border + '30',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary,
        lineHeight: 28,
    },
    buttonTextDisabled: {
        color: colors.textLight,
    },
    valueContainer: {
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        minWidth: 80,
    },
    value: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 34,
    },
    valueLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: -2,
    },
});

export default ServingsStepper;
