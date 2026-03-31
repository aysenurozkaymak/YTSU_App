import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { RootStackParamList } from '../types';
import { COMPOST_STEPS } from '../data/compostGuide';

type CompostScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Compost'>;
};

const CompostScreen: React.FC<CompostScreenProps> = ({ navigation }) => {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2d6a4f" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>♻️ Kompost Rehberi</Text>
                <Text style={styles.headerSubtitle}>
                    Mutfak atıklarınızı doğaya kazandırın
                </Text>
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>9</Text>
                        <Text style={styles.statLabel}>Adım</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>2-3</Text>
                        <Text style={styles.statLabel}>Ay</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>%30</Text>
                        <Text style={styles.statLabel}>Atık Azalma</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {COMPOST_STEPS.map((step, index) => {
                    const isExpanded = expandedId === step.id;
                    return (
                        <TouchableOpacity
                            key={step.id}
                            style={[styles.card, isExpanded && styles.cardExpanded]}
                            onPress={() => toggleExpand(step.id)}
                            activeOpacity={0.9}>
                            <View style={styles.cardHeader}>
                                <View style={styles.stepBadge}>
                                    <Text style={styles.stepNumber}>{step.id}</Text>
                                </View>
                                <View style={styles.cardHeaderText}>
                                    <Text style={styles.cardIcon}>{step.icon}</Text>
                                    <Text style={styles.cardTitle}>{step.title}</Text>
                                </View>
                                <Text style={styles.expandIcon}>
                                    {isExpanded ? '▲' : '▼'}
                                </Text>
                            </View>

                            {isExpanded && (
                                <View style={styles.cardBody}>
                                    <Text style={styles.description}>{step.description}</Text>
                                    <View style={styles.tipBox}>
                                        <Text style={styles.tipLabel}>💡 İpucu</Text>
                                        <Text style={styles.tipText}>{step.tip}</Text>
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.footerCard}>
                    <Text style={styles.footerIcon}>🌍</Text>
                    <Text style={styles.footerTitle}>
                        Sürdürülebilir Kalkınma Hedefi 12
                    </Text>
                    <Text style={styles.footerText}>
                        Sorumlu üretim ve tüketim: Kompost yaparak gıda israfını azaltır,
                        doğal döngüye katkıda bulunursunuz.
                    </Text>
                </View>

                <View style={{ height: spacing.xxl }} />
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
        backgroundColor: '#2d6a4f',
        paddingTop: spacing.xxxl + spacing.base,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
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
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.lg,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: borderRadius.md,
        padding: spacing.md,
    },
    stat: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.white,
    },
    statLabel: {
        ...typography.caption,
        color: colors.white,
        opacity: 0.8,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    content: {
        padding: spacing.base,
        paddingTop: spacing.lg,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        ...shadows.card,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    cardExpanded: {
        borderColor: '#2d6a4f',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.base,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2d6a4f',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    stepNumber: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 14,
    },
    cardHeaderText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    cardTitle: {
        ...typography.h3,
        fontSize: 16,
    },
    expandIcon: {
        fontSize: 12,
        color: colors.textLight,
    },
    cardBody: {
        paddingHorizontal: spacing.base,
        paddingBottom: spacing.base,
    },
    description: {
        ...typography.body,
        lineHeight: 24,
        color: colors.text,
        marginBottom: spacing.md,
    },
    tipBox: {
        backgroundColor: '#f0fdf4',
        borderRadius: borderRadius.md,
        padding: spacing.md,
        borderLeftWidth: 3,
        borderLeftColor: '#2d6a4f',
    },
    tipLabel: {
        ...typography.bodySmall,
        fontWeight: '700',
        color: '#2d6a4f',
        marginBottom: spacing.xs,
    },
    tipText: {
        ...typography.bodySmall,
        color: '#1b4332',
        lineHeight: 20,
    },
    footerCard: {
        backgroundColor: '#d8f3dc',
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        marginTop: spacing.md,
    },
    footerIcon: {
        fontSize: 40,
        marginBottom: spacing.md,
    },
    footerTitle: {
        ...typography.h3,
        color: '#1b4332',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    footerText: {
        ...typography.bodySmall,
        color: '#2d6a4f',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default CompostScreen;
