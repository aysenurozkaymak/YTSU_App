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
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography, borderRadius } from '../theme';
import { RootStackParamList } from '../types';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { initDatabase, loginUser } from '../services/database';

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Hata', 'Kullanıcı adı ve şifre gereklidir.');
            return;
        }

        setLoading(true);
        try {
            await initDatabase();
            const user = await loginUser(username.trim(), password);
            if (user) {
                const isAdmin = user.role === 'admin';
                navigation.replace('MainTabs', {
                    userId: user.id,
                    displayName: user.displayName,
                    isAdmin,
                });
            } else {
                Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış.');
            }
        } catch (error) {
            Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = async () => {
        try {
            await initDatabase();
            navigation.replace('MainTabs', {
                userId: null,
                displayName: 'Misafir',
                isAdmin: false,
            });
        } catch (error) {
            Alert.alert('Hata', 'Uygulama başlatılırken bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.secondary}
            />
            <View style={styles.topSection}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoIcon}>🍽️</Text>
                    <Text style={styles.logoText}>YTSU</Text>
                    <Text style={styles.logoSubtext}>Lezzetli tarifler, kolay hesaplar</Text>
                </View>
            </View>
            <KeyboardAvoidingView
                style={styles.bottomSection}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.formContainer}
                    keyboardShouldPersistTaps="handled">
                    <Text style={styles.welcomeText}>Hoş Geldiniz</Text>

                    <InputField
                        label="Kullanıcı Adı"
                        placeholder="Kullanıcı adınızı girin"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <InputField
                        label="Şifre"
                        placeholder="Şifrenizi girin"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <PrimaryButton
                        title="Giriş Yap"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.loginButton}
                    />

                    <PrimaryButton
                        title="Kayıt Ol"
                        onPress={() => navigation.navigate('Register')}
                        variant="outline"
                        style={styles.registerButton}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>veya</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <PrimaryButton
                        title="Misafir Olarak Devam Et"
                        onPress={handleGuest}
                        variant="ghost"
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
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacing.xxxl,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 64,
        marginBottom: spacing.md,
    },
    logoText: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.white,
        letterSpacing: 1,
    },
    logoSubtext: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.8,
        marginTop: spacing.xs,
    },
    bottomSection: {
        flex: 0.65,
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.xl + 8,
        borderTopRightRadius: borderRadius.xl + 8,
    },
    formContainer: {
        padding: spacing.xl,
        paddingTop: spacing.xxl,
    },
    welcomeText: {
        ...typography.h2,
        marginBottom: spacing.xl,
        textAlign: 'center',
    },
    loginButton: {
        marginTop: spacing.sm,
    },
    registerButton: {
        marginTop: spacing.md,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        ...typography.caption,
        color: colors.textSecondary,
        marginHorizontal: spacing.md,
    },
});

export default LoginScreen;
