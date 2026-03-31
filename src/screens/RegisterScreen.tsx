import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography, borderRadius } from '../theme';
import { RootStackParamList, UserRole } from '../types';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { initDatabase, createUser, checkUsernameExists } from '../services/database';

type RegisterScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('user');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!displayName.trim()) {
            newErrors.displayName = 'Görünen ad gereklidir.';
        }
        if (!username.trim() || username.trim().length < 3) {
            newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır.';
        }
        if (!password || password.length < 4) {
            newErrors.password = 'Şifre en az 4 karakter olmalıdır.';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Şifreler eşleşmiyor.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            await initDatabase();

            const exists = await checkUsernameExists(username.trim());
            if (exists) {
                setErrors({ username: 'Bu kullanıcı adı zaten kullanılıyor.' });
                return;
            }

            const user = await createUser(
                username.trim(),
                password,
                displayName.trim(),
                role,
            );
            Alert.alert('Başarılı', 'Hesabınız oluşturuldu!', [
                {
                    text: 'Tamam',
                    onPress: () =>
                        navigation.replace('MainTabs', {
                            userId: user.id,
                            displayName: user.displayName,
                            isAdmin: user.role === 'admin',
                        }),
                },
            ]);
        } catch (error) {
            Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
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
            <View style={styles.topSection}>
                <Text style={styles.headerIcon}>👤</Text>
                <Text style={styles.headerTitle}>Hesap Oluştur</Text>
                <Text style={styles.headerSubtitle}>
                    Tariflerinizi kaydetmeye başlayın
                </Text>
            </View>
            <KeyboardAvoidingView
                style={styles.bottomSection}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.formContainer}
                    keyboardShouldPersistTaps="handled">
                    <InputField
                        label="Görünen Ad"
                        placeholder="Adınızı girin"
                        value={displayName}
                        onChangeText={setDisplayName}
                        error={errors.displayName}
                    />

                    {/* Hesap Türü Seçimi */}
                    <View style={styles.roleSection}>
                        <Text style={styles.roleLabel}>Hesap Türü</Text>
                        <View style={styles.roleRow}>
                            <TouchableOpacity
                                style={[
                                    styles.roleChip,
                                    role === 'user' && styles.roleChipActive,
                                ]}
                                onPress={() => setRole('user')}>
                                <Text style={[
                                    styles.roleChipText,
                                    role === 'user' && styles.roleChipTextActive,
                                ]}>
                                    👤 Kullanıcı
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.roleChip,
                                    role === 'admin' && styles.roleChipActive,
                                ]}
                                onPress={() => setRole('admin')}>
                                <Text style={[
                                    styles.roleChipText,
                                    role === 'admin' && styles.roleChipTextActive,
                                ]}>
                                    🔑 Yönetici
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <InputField
                        label="Kullanıcı Adı"
                        placeholder="Kullanıcı adı seçin"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                        error={errors.username}
                    />

                    <InputField
                        label="Şifre"
                        placeholder="Şifrenizi girin"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        error={errors.password}
                    />

                    <InputField
                        label="Şifreyi Onayla"
                        placeholder="Şifrenizi tekrar girin"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        error={errors.confirmPassword}
                    />

                    <PrimaryButton
                        title="Kayıt Ol"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.registerButton}
                    />

                    <PrimaryButton
                        title="Zaten hesabım var"
                        onPress={() => navigation.goBack()}
                        variant="ghost"
                        style={styles.backButton}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    topSection: {
        paddingTop: spacing.xxxl + spacing.xl,
        paddingBottom: spacing.xl,
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.white,
    },
    headerSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.8,
        marginTop: spacing.xs,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.xl + 8,
        borderTopRightRadius: borderRadius.xl + 8,
    },
    formContainer: {
        padding: spacing.xl,
        paddingTop: spacing.xxl,
    },
    registerButton: {
        marginTop: spacing.md,
    },
    backButton: {
        marginTop: spacing.md,
    },
    roleSection: {
        marginBottom: spacing.base,
    },
    roleLabel: {
        ...typography.body,
        fontWeight: '600',
        marginBottom: spacing.sm,
        color: colors.text,
    },
    roleRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    roleChip: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
    },
    roleChipActive: {
        borderColor: colors.primary,
        backgroundColor: '#FFF0E6',
    },
    roleChipText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    roleChipTextActive: {
        color: colors.primary,
    },
});

export default RegisterScreen;
