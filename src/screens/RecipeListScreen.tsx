import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, typography, borderRadius } from '../theme';
import { RootStackParamList, RecipeCategory } from '../types';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { RECIPES, getRecipesByCategory, searchRecipes } from '../data/recipes';
import { getAdminRecipes } from '../services/database';
import { Recipe } from '../types';

type RecipeListScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RecipeList'>;
    route: RouteProp<RootStackParamList, 'RecipeList'>;
};

const RecipeListScreen: React.FC<RecipeListScreenProps> = ({
    navigation,
    route,
}) => {
    const { userId, displayName } = route.params;
    const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('Tümü');
    const [searchQuery, setSearchQuery] = useState('');
    const [adminRecipes, setAdminRecipes] = useState<Recipe[]>([]);

    const loadAdminRecipes = useCallback(async () => {
        try {
            const recipes = await getAdminRecipes();
            setAdminRecipes(recipes);
        } catch {
            // Admin tarifleri yüklenemezse sessizce devam et
        }
    }, []);

    useEffect(() => {
        loadAdminRecipes();
    }, [loadAdminRecipes]);

    // Ekran fokuslandığında admin tariflerini yenile
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadAdminRecipes();
        });
        return unsubscribe;
    }, [navigation, loadAdminRecipes]);

    const filteredRecipes = useMemo(() => {
        let results = getRecipesByCategory(selectedCategory);

        // Admin tariflerini kategoriye göre filtrele ve birleştir
        let filteredAdmin = adminRecipes;
        if (selectedCategory !== 'Tümü') {
            filteredAdmin = adminRecipes.filter(r => r.category === selectedCategory);
        }
        results = [...results, ...filteredAdmin];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const searched = searchRecipes(searchQuery);
            const searchedIds = new Set(searched.map(r => r.id));

            results = results.filter(r => {
                if (searchedIds.has(r.id)) return true;
                // Admin tarifleri için de arama yap
                if (r.isAdminRecipe) {
                    return (
                        r.title.toLowerCase().includes(q) ||
                        r.ingredients.some(ing => ing.name.toLowerCase().includes(q))
                    );
                }
                return false;
            });
        }
        return results;
    }, [selectedCategory, searchQuery, adminRecipes]);

    const totalCount = RECIPES.length + adminRecipes.length;

    const handleLogout = () => {
        navigation.replace('Login');
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Tarif Bulunamadı</Text>
            <Text style={styles.emptySubtitle}>
                Farklı bir kategori veya{'\n'}arama terimi deneyin
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.secondary}
            />
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Merhaba,</Text>
                        <Text style={styles.displayName}>{displayName} 👋</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}>
                        <Text style={styles.logoutText}>Çıkış</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerSubtitle}>
                    {totalCount} lezzetli tarif sizi bekliyor
                </Text>
            </View>

            <View style={styles.filterSection}>
                <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
                <CategoryFilter
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </View>

            <FlatList
                style={styles.list}
                data={filteredRecipes}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <RecipeCard
                        recipe={item}
                        onPress={() =>
                            navigation.navigate('RecipeDetail', {
                                recipeId: item.id,
                                userId,
                                isAdminRecipe: item.isAdminRecipe,
                            })
                        }
                    />
                )}
                contentContainerStyle={[
                    styles.listContent,
                    filteredRecipes.length === 0 && styles.listEmpty,
                ]}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: borderRadius.xl,
        borderBottomRightRadius: borderRadius.xl,
        marginBottom: spacing.md,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    greeting: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.8,
    },
    displayName: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.white,
        marginTop: 2,
    },
    logoutButton: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
    },
    logoutText: {
        ...typography.bodySmall,
        color: colors.white,
        fontWeight: '600',
    },
    headerSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.7,
        marginTop: spacing.sm,
    },
    filterSection: {
        flexShrink: 0,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: spacing.base,
        paddingTop: spacing.sm,
    },
    listEmpty: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: spacing.xxxl,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        ...typography.h3,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        ...typography.bodySmall,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default RecipeListScreen;
