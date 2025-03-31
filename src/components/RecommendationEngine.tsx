
import { useMemo } from "react";
import { Recipe, UserProfile, Neighborhood } from "@/types";

interface RecommendationEngineProps {
  recipes: Recipe[];
  userProfile: UserProfile | null;
  neighborhood: Neighborhood | null;
}

// A simple recommendation engine based on user profile and neighborhood context
const useRecommendations = ({ recipes, userProfile, neighborhood }: RecommendationEngineProps) => {
  const recommendedRecipes = useMemo(() => {
    if (!userProfile) return recipes;

    return recipes.map(recipe => {
      let score = 5; // Base score
      
      // Health condition matching
      const healthConditionMatches = userProfile.healthConditions.filter(condition => 
        recipe.suitableFor.healthConditions.includes(condition)
      );
      score += healthConditionMatches.length * 2;
      
      // Dietary preference matching
      const dietaryMatches = userProfile.dietaryPreferences.filter(pref => 
        recipe.suitableFor.dietaryPreferences.includes(pref)
      );
      score += dietaryMatches.length * 1.5;
      
      // Religious restriction matching
      const religiousMatches = userProfile.religiousRestrictions.filter(restriction => 
        recipe.suitableFor.religiousRestrictions.includes(restriction)
      );
      score += religiousMatches.length * 2;
      
      // Neighborhood/cultural context matching
      if (neighborhood) {
        if (neighborhood.predominantCultures.some(culture => 
          recipe.culturalOrigin.toLowerCase().includes(culture.toLowerCase())
        )) {
          score += 1.5;
        }
      }
      
      // If user has health conditions not addressed by recipe, lower score
      const unaddressedConditions = userProfile.healthConditions.filter(condition => 
        !recipe.suitableFor.healthConditions.includes(condition)
      );
      score -= unaddressedConditions.length * 0.5;
      
      return { ...recipe, recommendationScore: score };
    }).sort((a, b) => b.recommendationScore! - a.recommendationScore!);
  }, [recipes, userProfile, neighborhood]);
  
  return recommendedRecipes;
};

export default useRecommendations;
