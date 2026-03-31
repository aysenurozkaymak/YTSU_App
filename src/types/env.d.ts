/**
 * @env tip tanımları — react-native-dotenv
 * Bu dosya .env değişkenlerinin TypeScript'te tanınmasını sağlar
 */
declare module '@env' {
    export const GEMINI_API_KEY: string;
    export const GROQ_API_KEY: string;
}
