import SQLite, {
    type WebsqlDatabase,
    type SQLTransaction,
    type SQLResultSet,
    type SQLError,
} from 'react-native-sqlite-2';
import { User, Feedback, Recipe, Ingredient, UserRole } from '../types';

let db: WebsqlDatabase | null = null;

/**
 * Veritabanını başlat — kullanıcı ve geri bildirim tabloları
 */
export async function initDatabase(): Promise<void> {
    if (db) {
        return;
    }

    db = SQLite.openDatabase('YTSU.db', '1.0', '', 1);

    await executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await executeSql(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      recipe_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await executeSql(`
    CREATE TABLE IF NOT EXISTS admin_recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      original_servings INTEGER DEFAULT 4,
      instructions TEXT,
      category TEXT DEFAULT 'Ana Yemek',
      icon TEXT DEFAULT '🍽️',
      image_uri TEXT,
      ingredients TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    // Mevcut users tablosuna role kolonu ekle (eğer yoksa)
    try {
        await executeSql(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
    } catch {
        // Kolon zaten varsa hata yok say
    }
}

/**
 * SQL çalıştırma yardımcı fonksiyonu — promise tabanlı
 */
function executeSql(
    sql: string,
    params: any[] = [],
): Promise<SQLResultSet> {
    return new Promise((resolve, reject) => {
        const database = getDb();
        database.transaction((tx: SQLTransaction) => {
            tx.executeSql(
                sql,
                params,
                (_tx: SQLTransaction, result: SQLResultSet) => resolve(result),
                (_tx: SQLTransaction, error: SQLError) => {
                    reject(error);
                    return false;
                },
            );
        });
    });
}

function getDb(): WebsqlDatabase {
    if (!db) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return db;
}

// ─── USER OPERATIONS ──────────────────────────────────────────

function simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return `$tarif$${Math.abs(hash).toString(36)}$${password.length}`;
}

export async function createUser(
    username: string,
    password: string,
    displayName: string,
    role: UserRole = 'user',
): Promise<User> {
    const passwordHash = simpleHash(password);

    const result = await executeSql(
        'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)',
        [username, passwordHash, displayName, role],
    );

    return {
        id: result.insertId ?? 0,
        username,
        displayName,
        role,
        createdAt: new Date().toISOString(),
    };
}

export async function loginUser(
    username: string,
    password: string,
): Promise<User | null> {
    const passwordHash = simpleHash(password);

    const result = await executeSql(
        'SELECT id, username, display_name, role, created_at FROM users WHERE username = ? AND password_hash = ?',
        [username, passwordHash],
    );

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows.item(0);
    return {
        id: row.id,
        username: row.username,
        displayName: row.display_name,
        role: row.role || 'user',
        createdAt: row.created_at,
    };
}

export async function checkUsernameExists(
    username: string,
): Promise<boolean> {
    const result = await executeSql(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        [username],
    );
    return result.rows.item(0).count > 0;
}

// ─── FEEDBACK OPERATIONS ──────────────────────────────────────

export async function submitFeedback(
    userId: number | null,
    recipeId: number,
    rating: number,
    comment: string,
): Promise<void> {
    await executeSql(
        'INSERT INTO feedback (user_id, recipe_id, rating, comment) VALUES (?, ?, ?, ?)',
        [userId, recipeId, rating, comment],
    );
}

export async function getFeedbackByRecipe(
    recipeId: number,
): Promise<Feedback[]> {
    const result = await executeSql(
        'SELECT id, user_id, recipe_id, rating, comment, created_at FROM feedback WHERE recipe_id = ? ORDER BY created_at DESC',
        [recipeId],
    );

    const feedbacks: Feedback[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        feedbacks.push({
            id: row.id,
            userId: row.user_id,
            recipeId: row.recipe_id,
            rating: row.rating,
            comment: row.comment || '',
            createdAt: row.created_at,
        });
    }
    return feedbacks;
}

export async function getAverageRating(
    recipeId: number,
): Promise<{ average: number; count: number }> {
    const result = await executeSql(
        'SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM feedback WHERE recipe_id = ?',
        [recipeId],
    );
    const row = result.rows.item(0);
    return {
        average: row.avg_rating ? Math.round(row.avg_rating * 10) / 10 : 0,
        count: row.count || 0,
    };
}

// ─── ADMIN RECIPE OPERATIONS ──────────────────────────────────

export async function addAdminRecipe(
    title: string,
    originalServings: number,
    instructionsByLevel: import('../types').InstructionsByLevel,
    category: string,
    icon: string,
    imageUri: string | null,
    ingredients: Ingredient[],
    createdBy: number | null,
): Promise<number> {
    const ingredientsJson = JSON.stringify(ingredients);
    const instructionsJson = JSON.stringify(instructionsByLevel);

    const result = await executeSql(
        'INSERT INTO admin_recipes (title, original_servings, instructions, category, icon, image_uri, ingredients, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, originalServings, instructionsJson, category, icon, imageUri, ingredientsJson, createdBy],
    );

    return result.insertId ?? 0;
}

export async function getAdminRecipes(): Promise<Recipe[]> {
    const result = await executeSql(
        'SELECT * FROM admin_recipes ORDER BY created_at DESC',
    );

    const recipes: Recipe[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        let ingredients: Ingredient[] = [];
        try {
            ingredients = JSON.parse(row.ingredients || '[]');
        } catch {
            ingredients = [];
        }

        let instructionsByLevel = {
            'Başlangıç': row.instructions || '',
            'Orta': row.instructions || '',
            'Profesyonel': row.instructions || '',
        };

        try {
            const parsed = JSON.parse(row.instructions);
            if (parsed && typeof parsed === 'object' && parsed['Başlangıç']) {
                instructionsByLevel = parsed;
            }
        } catch {
            // Fallback string instructions to all levels if not JSON
        }

        recipes.push({
            id: 1000 + row.id,
            title: row.title,
            originalServings: row.original_servings,
            instructions: row.instructions || '',
            instructionsByLevel,
            category: row.category || 'Ana Yemek',
            icon: row.icon || '🍽️',
            imageUri: row.image_uri || undefined,
            ingredients,
            isAdminRecipe: true,
        });
    }
    return recipes;
}

export async function getAdminRecipeById(adminRecipeDbId: number): Promise<Recipe | null> {
    const result = await executeSql(
        'SELECT * FROM admin_recipes WHERE id = ?',
        [adminRecipeDbId],
    );

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows.item(0);
    let ingredients: Ingredient[] = [];
    try {
        ingredients = JSON.parse(row.ingredients || '[]');
    } catch {
        ingredients = [];
    }

    let instructionsByLevel = {
        'Başlangıç': row.instructions || '',
        'Orta': row.instructions || '',
        'Profesyonel': row.instructions || '',
    };

    try {
        const parsed = JSON.parse(row.instructions);
        if (parsed && typeof parsed === 'object' && parsed['Başlangıç']) {
            instructionsByLevel = parsed;
        }
    } catch {
        // Fallback string instructions to all levels if not JSON
    }

    return {
        id: 1000 + row.id,
        title: row.title,
        originalServings: row.original_servings,
        instructions: row.instructions || '',
        instructionsByLevel,
        category: row.category || 'Ana Yemek',
        icon: row.icon || '🍽️',
        imageUri: row.image_uri || undefined,
        ingredients,
        isAdminRecipe: true,
    };
}
