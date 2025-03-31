import apiService from './api';
import { Recipe } from '../types';
import cache from './cache';

const THEMEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

interface MealDbResponse {
  meals: Meal[];
}

// Helper function to extract ingredients and measures
const extractIngredientsAndMeasures = (meal: Meal): { ingredient: string; measure: string }[] => {
  const ingredients: { ingredient: string; measure: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }
  
  return ingredients;
};

// Helper function to determine dietary preferences based on ingredients
const determineDietaryPreferences = (ingredients: string[]): string[] => {
  const preferences: string[] = [];
  
  // Common ingredients for different dietary preferences
  const vegetarianIngredients = ['beef', 'chicken', 'pork', 'fish', 'lamb'];
  const veganIngredients = ['egg', 'milk', 'cheese', 'butter', 'cream'];
  const glutenFreeIngredients = ['flour', 'bread', 'pasta', 'wheat'];
  
  const hasMeat = ingredients.some(ing => 
    vegetarianIngredients.some(meat => ing.toLowerCase().includes(meat))
  );
  const hasDairy = ingredients.some(ing => 
    veganIngredients.some(dairy => ing.toLowerCase().includes(dairy))
  );
  const hasGluten = ingredients.some(ing => 
    glutenFreeIngredients.some(gluten => ing.toLowerCase().includes(gluten))
  );
  
  if (!hasMeat) preferences.push('vegetarian');
  if (!hasMeat && !hasDairy) preferences.push('vegan');
  if (!hasGluten) preferences.push('gluten-free');
  
  return preferences;
};

// Helper function to determine health conditions based on ingredients
const determineHealthConditions = (ingredients: string[]): string[] => {
  const conditions: string[] = [];
  
  // Common ingredients for different health conditions
  const lowSodiumIngredients = ['salt', 'soy sauce', 'bouillon'];
  const lowSugarIngredients = ['sugar', 'honey', 'syrup'];
  const lowFatIngredients = ['oil', 'butter', 'cream'];
  
  const hasHighSodium = ingredients.some(ing => 
    lowSodiumIngredients.some(sodium => ing.toLowerCase().includes(sodium))
  );
  const hasHighSugar = ingredients.some(ing => 
    lowSugarIngredients.some(sugar => ing.toLowerCase().includes(sugar))
  );
  const hasHighFat = ingredients.some(ing => 
    lowFatIngredients.some(fat => ing.toLowerCase().includes(fat))
  );
  
  if (!hasHighSodium) conditions.push('low-sodium');
  if (!hasHighSugar) conditions.push('low-sugar');
  if (!hasHighFat) conditions.push('low-fat');
  
  return conditions;
};

export const mealDbService = {
  // Fetch recipes by category
  fetchRecipesByCategory: async (category: string): Promise<Meal[]> => {
    const cacheKey = `category_${category}`;
    const cachedData = cache.get<Meal[]>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/filter.php`, {
        c: category
      });
      cache.set(cacheKey, response.meals, CACHE_TTL);
      return response.meals;
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw error;
    }
  },

  // Fetch recipes by area
  fetchRecipesByArea: async (area: string): Promise<Meal[]> => {
    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/filter.php`, {
        a: area
      });
      return response.meals;
    } catch (error) {
      console.error('Error fetching recipes by area:', error);
      throw error;
    }
  },

  // Fetch recipes by ingredient
  fetchRecipesByIngredient: async (ingredient: string): Promise<Meal[]> => {
    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/filter.php`, {
        i: ingredient
      });
      return response.meals;
    } catch (error) {
      console.error('Error fetching recipes by ingredient:', error);
      throw error;
    }
  },

  // Fetch recipes by first letter
  fetchRecipesByFirstLetter: async (letter: string): Promise<Meal[]> => {
    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/search.php`, {
        f: letter
      });
      return response.meals;
    } catch (error) {
      console.error('Error fetching recipes by first letter:', error);
      throw error;
    }
  },

  // Search recipes by name
  searchRecipes: async (query: string): Promise<Meal[]> => {
    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/search.php`, {
        s: query
      });
      return response.meals;
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  },

  // Fetch recipe details by ID
  fetchRecipeById: async (id: string): Promise<Meal> => {
    try {
      const response = await apiService.get<MealDbResponse>(`${THEMEALDB_API_URL}/lookup.php`, {
        i: id
      });
      return response.meals[0];
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      throw error;
    }
  },

  // Get all categories
  fetchCategories: async (): Promise<{ strCategory: string }[]> => {
    try {
      const response = await apiService.get<{ categories: { strCategory: string }[] }>(
        `${THEMEALDB_API_URL}/categories.php`
      );
      return response.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get all areas
  fetchAreas: async (): Promise<{ strArea: string }[]> => {
    try {
      const response = await apiService.get<{ meals: { strArea: string }[] }>(
        `${THEMEALDB_API_URL}/list.php?a=list`
      );
      return response.meals;
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  },

  // Get all ingredients
  fetchIngredients: async (): Promise<{ strIngredient: string }[]> => {
    try {
      const response = await apiService.get<{ meals: { strIngredient: string }[] }>(
        `${THEMEALDB_API_URL}/list.php?i=list`
      );
      return response.meals;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },

  // Enhanced mapping function with dietary and health information
  mapToRecipe: (meal: Meal): Recipe => {
    const ingredientsAndMeasures = extractIngredientsAndMeasures(meal);
    const ingredients = ingredientsAndMeasures.map(item => `${item.measure} ${item.ingredient}`);
    
    const dietaryPreferences = determineDietaryPreferences(ingredients);
    const healthConditions = determineHealthConditions(ingredients);
    
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      description: meal.strInstructions?.substring(0, 100) || "No description available",
      cuisineType: meal.strCategory || "Unknown",
      culturalOrigin: meal.strArea || "Unknown",
      ingredients,
      instructions: meal.strInstructions?.split('\n').filter(Boolean) || [],
      nutritionalInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
      },
      suitableFor: {
        healthConditions,
        dietaryPreferences: [...dietaryPreferences, meal.strCategory || ""],
        religiousRestrictions: [],
      },
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      imageUrl: meal.strMealThumb,
      rating: 0,
    };
  },

  // New method for advanced recipe filtering
  filterRecipes: (recipes: Recipe[], filters: {
    dietaryPreferences?: string[];
    healthConditions?: string[];
    religiousRestrictions?: string[];
    cuisineTypes?: string[];
    culturalOrigins?: string[];
  }): Recipe[] => {
    return recipes.filter(recipe => {
      // Dietary preferences
      if (filters.dietaryPreferences?.length) {
        const matchesDietary = filters.dietaryPreferences.some(pref =>
          recipe.suitableFor.dietaryPreferences.includes(pref)
        );
        if (!matchesDietary) return false;
      }

      // Health conditions
      if (filters.healthConditions?.length) {
        const matchesHealth = filters.healthConditions.every(condition =>
          recipe.suitableFor.healthConditions.includes(condition)
        );
        if (!matchesHealth) return false;
      }

      // Religious restrictions
      if (filters.religiousRestrictions?.length) {
        const matchesReligious = filters.religiousRestrictions.every(restriction =>
          recipe.suitableFor.religiousRestrictions.includes(restriction)
        );
        if (!matchesReligious) return false;
      }

      // Cuisine types
      if (filters.cuisineTypes?.length) {
        if (!filters.cuisineTypes.includes(recipe.cuisineType)) return false;
      }

      // Cultural origins
      if (filters.culturalOrigins?.length) {
        if (!filters.culturalOrigins.includes(recipe.culturalOrigin)) return false;
      }

      return true;
    });
  }
};

export default mealDbService; 