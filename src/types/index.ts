export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  username: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export interface Ingredient {
  id?: number;
  recipeId?: number;
  name: string;
  quantity: number;
  unit: string;
}

export type SkillLevel = 'Başlangıç' | 'Orta' | 'Profesyonel';

export interface InstructionsByLevel {
  'Başlangıç': string;
  'Orta': string;
  'Profesyonel': string;
}

export interface Recipe {
  id: number;
  title: string;
  originalServings: number;
  instructions: string;
  instructionsByLevel: InstructionsByLevel;
  category: RecipeCategory;
  icon: string;
  imageUri?: string;
  ingredients: Ingredient[];
  isAdminRecipe?: boolean;
}

export interface ScaledIngredient extends Ingredient {
  scaledQuantity: number;
}

export type RecipeCategory =
  | 'Tümü'
  | 'Ana Yemek'
  | 'Çorba'
  | 'Tatlı'
  | 'Salata'
  | 'Aperatif';

export interface Feedback {
  id?: number;
  userId: number | null;
  recipeId: number;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface CompostStep {
  id: number;
  title: string;
  icon: string;
  description: string;
  tip: string;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: { userId: number | null; displayName: string; isAdmin: boolean };
  RecipeList: { userId: number | null; displayName: string; isAdmin: boolean };
  RecipeDetail: { recipeId: number; userId: number | null; isAdminRecipe?: boolean };
  Chatbot: { userId: number | null };
  Compost: undefined;
  Recommendations: { userId: number | null };
};
