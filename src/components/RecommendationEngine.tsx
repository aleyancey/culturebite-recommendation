import { useState, useEffect } from 'react';
import { Recipe, UserProfile, Neighborhood } from "../types";
import mealDbService from "../services/mealDbApi";

interface RecommendationEngineProps {
  recipes: Recipe[];
  userProfile: UserProfile | null;
  neighborhood: Neighborhood | null;
}

const useRecommendations = ({ recipes, userProfile, neighborhood }: RecommendationEngineProps) => {
    const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRecipes = async () => {
            if (userProfile) {
                setIsLoading(true);
                setError(null);
                try {
                    let fetchedRecipes = [];
                    
                    // Fetch recipes based on dietary preferences
                    if (userProfile.dietaryPreferences.length > 0) {
                        for (const preference of userProfile.dietaryPreferences) {
                            const recipes = await mealDbService.fetchRecipesByCategory(preference);
                            if (recipes) {
                                fetchedRecipes.push(...recipes);
                            }
                        }
                    }

                    // Fetch recipes based on neighborhood culture
                    if (neighborhood) {
                        for (const culture of neighborhood.predominantCultures) {
                            const recipes = await mealDbService.fetchRecipesByArea(culture);
                            if (recipes) {
                                fetchedRecipes.push(...recipes);
                            }
                        }
                    }

                    // Remove duplicates
                    const uniqueRecipes = Array.from(new Set(fetchedRecipes.map(a => a.idMeal)))
                        .map(id => fetchedRecipes.find(a => a.idMeal === id))
                        .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== undefined);

                    // Fetch detailed recipe information for each unique recipe
                    const detailedRecipes = await Promise.all(
                        uniqueRecipes.map(async (apiRecipe) => {
                            const detailedRecipe = await mealDbService.fetchRecipeById(apiRecipe.idMeal);
                            return mealDbService.mapToRecipe(detailedRecipe);
                        })
                    );

                    // Filter recipes based on user preferences
                    const filteredRecipes = detailedRecipes.filter(recipe => {
                        // Check dietary preferences
                        const matchesDietaryPreferences = userProfile.dietaryPreferences.some(pref =>
                            recipe.suitableFor.dietaryPreferences.includes(pref)
                        );

                        // Check health conditions
                        const matchesHealthConditions = userProfile.healthConditions.every(condition =>
                            recipe.suitableFor.healthConditions.includes(condition)
                        );

                        // Check religious restrictions
                        const matchesReligiousRestrictions = userProfile.religiousRestrictions.every(restriction =>
                            recipe.suitableFor.religiousRestrictions.includes(restriction)
                        );

                        return matchesDietaryPreferences && matchesHealthConditions && matchesReligiousRestrictions;
                    });

                    setRecommendedRecipes(filteredRecipes);
                } catch (error) {
                    console.error("Error loading recipes:", error);
                    setError("Failed to load recipes. Please try again later.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setRecommendedRecipes(recipes);
            }
        };

        loadRecipes();
    }, [userProfile, recipes, neighborhood]);

    return {
        recommendedRecipes,
        isLoading,
        error
    };
};

export default useRecommendations;
