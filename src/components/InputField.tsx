import React from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '../theme';

interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    style,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError, style]}
                placeholderTextColor={colors.textLight}
                {...props}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.base,
    },
    label: {
        ...typography.bodySmall,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        ...typography.body,
        color: colors.text,
    },
    inputError: {
        borderColor: colors.error,
    },
    error: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
});

export default InputField;
