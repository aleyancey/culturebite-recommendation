
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  healthConditions: string[];
  dietaryPreferences: string[];
  religiousRestrictions: string[];
  zipCode: string;
  favoriteRecipes: string[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisineType: string;
  culturalOrigin: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  suitableFor: {
    healthConditions: string[];
    dietaryPreferences: string[];
    religiousRestrictions: string[];
  };
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  imageUrl: string;
  rating: number;
}

export interface Neighborhood {
  zipCode: string;
  name: string;
  borough: string;
  foodAccess: {
    groceryStores: number;
    farmersMarkets: boolean;
    healthFoodStores: number;
    foodDesert: boolean;
  };
  healthStats: {
    obesityRate: number;
    diabetesRate: number;
  };
  predominantCultures: string[];
}
