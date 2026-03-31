import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { RootStackParamList, ChatMessage } from '../types';
import { getChatbotResponse } from '../services/chatbot';

type ChatbotScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Chatbot'>;
    route: RouteProp<RootStackParamList, 'Chatbot'>;
};

const GREETING: ChatMessage = {
    id: 'welcome',
    text: 'Merhaba! 🍳 Ben YTSU mutfak asistanınızım.\n\nBana şunları sorabilirsiniz:\n• Pişirme teknikleri\n• Malzeme alternatifleri\n• Kompost rehberliği\n• Mutfak ipuçları\n\nAşağıdaki önerilerden birine tıklayın veya kendi sorunuzu yazın!',
    isUser: false,
    timestamp: new Date(),
};

const SAMPLE_QUERIES = [
    { icon: '🍳', text: 'Sote nasıl yapılır?' },
    { icon: '🥚', text: 'Yumurta yerine ne kullanılır?' },
    { icon: '♻️', text: 'Kompost nasıl yapılır?' },
    { icon: '📏', text: 'Mutfak ölçüleri neler?' },
    { icon: '🥘', text: 'Et nasıl yumuşak pişirilir?' },
    { icon: '🌿', text: 'Hangi baharat nerede kullanılır?' },
];

const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ navigation }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessageText = async (text: string) => {
        if (!text.trim() || isLoading) { return; }

        const userMsg: ChatMessage = {
            id: `user_${Date.now()}`,
            text: text.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await getChatbotResponse(text.trim());
            const botMsg: ChatMessage = {
                id: `bot_${Date.now()}`,
                text: response,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
        } catch {
            const errorMsg: ChatMessage = {
                id: `err_${Date.now()}`,
                text: 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin. 🔄',
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = () => {
        sendMessageText(inputText);
    };

    const handleSuggestionTap = (query: string) => {
        sendMessageText(query);
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => (
        <View
            style={[
                styles.messageBubble,
                item.isUser ? styles.userBubble : styles.botBubble,
            ]}>
            {!item.isUser && <Text style={styles.botAvatar}>🤖</Text>}
            <View
                style={[
                    styles.bubbleContent,
                    item.isUser ? styles.userContent : styles.botContent,
                ]}>
                <Text
                    style={[
                        styles.messageText,
                        item.isUser && styles.userText,
                    ]}>
                    {item.text}
                </Text>
            </View>
        </View>
    );

    const renderTypingIndicator = () => {
        if (!isLoading) { return null; }
        return (
            <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={styles.botAvatar}>🤖</Text>
                <View style={[styles.bubbleContent, styles.botContent, styles.typingBubble]}>
                    <ActivityIndicator
                        size="small"
                        color={colors.primary}
                        style={styles.typingSpinner}
                    />
                    <Text style={styles.typingText}>Yanıt hazırlanıyor...</Text>
                </View>
            </View>
        );
    };

    const renderSuggestions = () => {
        return (
            <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>💡 Örnek Sorular</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionsScroll}>
                    {SAMPLE_QUERIES.map((query, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionChip}
                            onPress={() => handleSuggestionTap(query.text)}
                            activeOpacity={0.7}
                            disabled={isLoading}>
                            <Text style={styles.suggestionIcon}>{query.icon}</Text>
                            <Text style={styles.suggestionText}>{query.text}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>🤖 Mutfak Asistanı</Text>
                <View style={styles.headerBadge}>
                    <View style={styles.aiDot} />
                    <Text style={styles.headerSubtitle}>
                        Groq AI destekli
                    </Text>
                </View>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messageList}
                onContentSizeChange={() =>
                    flatListRef.current?.scrollToEnd({ animated: true })
                }
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <>
                        {renderTypingIndicator()}
                        {renderSuggestions()}
                    </>
                }
            />

            <View style={styles.inputBar}>
                <TextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Bir soru yazın..."
                    placeholderTextColor={colors.textLight}
                    returnKeyType="send"
                    onSubmitEditing={sendMessage}
                    multiline={false}
                    editable={!isLoading}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
                    ]}
                    onPress={sendMessage}
                    disabled={!inputText.trim() || isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                        <Text style={styles.sendIcon}>➤</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.secondary,
        paddingTop: spacing.xxxl + spacing.base,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    aiDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#4ade80',
        marginRight: 6,
    },
    headerSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.85,
    },
    messageList: {
        padding: spacing.base,
        paddingBottom: spacing.sm,
    },
    messageBubble: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        alignItems: 'flex-end',
    },
    userBubble: {
        justifyContent: 'flex-end',
    },
    botBubble: {
        justifyContent: 'flex-start',
    },
    botAvatar: {
        fontSize: 24,
        marginRight: spacing.sm,
        marginBottom: spacing.xs,
    },
    bubbleContent: {
        maxWidth: '78%',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadows.card,
    },
    userContent: {
        backgroundColor: colors.primary,
        borderBottomRightRadius: spacing.xs,
        marginLeft: 'auto',
    },
    botContent: {
        backgroundColor: colors.surface,
        borderBottomLeftRadius: spacing.xs,
    },
    messageText: {
        ...typography.body,
        color: colors.text,
        lineHeight: 22,
    },
    userText: {
        color: colors.white,
    },
    // Typing indicator
    typingBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
    },
    typingSpinner: {
        marginRight: spacing.sm,
    },
    typingText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        fontStyle: 'italic',
    },
    // Suggestion chips
    suggestionsContainer: {
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    },
    suggestionsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    suggestionsScroll: {
        paddingRight: spacing.base,
        gap: spacing.sm,
    },
    suggestionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.primaryLight,
        borderRadius: borderRadius.round,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        marginRight: spacing.sm,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    suggestionIcon: {
        fontSize: 16,
        marginRight: spacing.xs + 2,
    },
    suggestionText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.primary,
    },
    // Input bar
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        paddingBottom: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    textInput: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: borderRadius.round,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm + 2,
        ...typography.body,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    sendButtonDisabled: {
        opacity: 0.4,
    },
    sendIcon: {
        fontSize: 20,
        color: colors.white,
    },
});

export default ChatbotScreen;
