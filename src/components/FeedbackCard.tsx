import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface FeedbackCardProps {
    onSubmit: (rating: number, comment: string) => void;
    existingRating?: number;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
    onSubmit,
    existingRating,
}) => {
    const [rating, setRating] = useState(existingRating || 0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(!!existingRating);

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit(rating, comment);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <View style={styles.card}>
                <Text style={styles.thankYou}>✅ Geri bildiriminiz kaydedildi!</Text>
                <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <Text key={i} style={styles.starFilled}>
                            {i <= rating ? '⭐' : '☆'}
                        </Text>
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>⭐ Bu Tarifi Değerlendirin</Text>

            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(i => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => setRating(i)}
                        activeOpacity={0.7}>
                        <Text style={[styles.star, i <= rating && styles.starFilled]}>
                            {i <= rating ? '⭐' : '☆'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.commentInput}
                placeholder="Yorumunuzu yazın (opsiyonel)..."
                placeholderTextColor={colors.textLight}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
            />

            <TouchableOpacity
                style={[styles.submitButton, rating === 0 && styles.submitDisabled]}
                onPress={handleSubmit}
                disabled={rating === 0}
                activeOpacity={0.8}>
                <Text style={styles.submitText}>Gönder</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        ...shadows.card,
    },
    title: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    star: {
        fontSize: 32,
        color: colors.textLight,
    },
    starFilled: {
        fontSize: 32,
    },
    commentInput: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        ...typography.body,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 80,
        marginBottom: spacing.md,
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    submitDisabled: {
        opacity: 0.4,
    },
    submitText: {
        ...typography.body,
        color: colors.white,
        fontWeight: '700',
    },
    thankYou: {
        ...typography.body,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
});

export default FeedbackCard;
