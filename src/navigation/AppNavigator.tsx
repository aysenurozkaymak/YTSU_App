import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types';
import { colors } from '../theme';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import CompostScreen from '../screens/CompostScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import AdminAddRecipeScreen from '../screens/AdminAddRecipeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Alt tab navigasyonu — ana sekmeler
const MainTabs = ({ route }: any) => {
    const { userId, displayName, isAdmin } = route.params || {};

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight,
                tabBarLabelStyle: styles.tabLabel,
            }}>
            <Tab.Screen
                name="RecipeList"
                options={{
                    tabBarLabel: 'Tarifler',
                    tabBarIcon: () => <Text style={styles.tabIcon}>🍽️</Text>,
                }}>
                {(props: any) => (
                    <RecipeListScreen
                        {...props}
                        route={{ ...props.route, params: { userId, displayName, isAdmin } }}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="ChatbotTab"
                options={{
                    tabBarLabel: 'Asistan',
                    tabBarIcon: () => <Text style={styles.tabIcon}>🤖</Text>,
                }}>
                {(props: any) => (
                    <ChatbotScreen
                        {...props}
                        route={{ ...props.route, params: { userId } }}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="CompostTab"
                component={CompostScreen as any}
                options={{
                    tabBarLabel: 'Kompost',
                    tabBarIcon: () => <Text style={styles.tabIcon}>♻️</Text>,
                }}
            />
            <Tab.Screen
                name="RecommendationsTab"
                options={{
                    tabBarLabel: 'Öneriler',
                    tabBarIcon: () => <Text style={styles.tabIcon}>🧠</Text>,
                }}>
                {(props: any) => (
                    <RecommendationsScreen
                        {...props}
                        route={{ ...props.route, params: { userId } }}
                    />
                )}
            </Tab.Screen>
            {isAdmin && (
                <Tab.Screen
                    name="AdminAddRecipe"
                    options={{
                        tabBarLabel: 'Tarif Ekle',
                        tabBarIcon: () => <Text style={styles.tabIcon}>📝</Text>,
                    }}>
                    {(props: any) => (
                        <AdminAddRecipeScreen
                            {...props}
                            route={{ ...props.route, params: { userId } }}
                        />
                    )}
                </Tab.Screen>
            )}
        </Tab.Navigator>
    );
};

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 6,
        paddingBottom: 8,
        height: 64,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    tabIcon: {
        fontSize: 22,
    },
});

export default AppNavigator;
