
import { useState, useEffect } from "react";
import { UserProfile, Recipe, Neighborhood } from "@/types";
import { sampleUser, sampleRecipes, sampleNeighborhoods } from "@/data/sampleData";

import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import NeighborhoodInfo from "@/components/NeighborhoodInfo";
import RecipeFilters, { Filters } from "@/components/RecipeFilters";
import useRecommendations from "@/components/RecommendationEngine";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [filters, setFilters] = useState<Filters>({
    cuisineTypes: [],
    dietaryPreferences: [],
    healthConditions: [],
    maxPrepTime: null
  });

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUserProfile(sampleUser);
    }, 500);
  }, []);

  useEffect(() => {
    if (userProfile?.zipCode) {
      const matchingNeighborhood = sampleNeighborhoods.find(n => 
        n.zipCode === userProfile.zipCode
      );
      setNeighborhood(matchingNeighborhood || null);
    } else {
      setNeighborhood(null);
    }
  }, [userProfile?.zipCode]);

  const allRecipes = sampleRecipes;
  const recommendations = useRecommendations({ recipes: allRecipes, userProfile, neighborhood });

  const filteredRecipes = recommendations.filter(recipe => {
    // Filter by cuisine type
    if (filters.cuisineTypes.length > 0 && !filters.cuisineTypes.includes(recipe.cuisineType)) {
      return false;
    }
    
    // Filter by dietary preferences
    if (filters.dietaryPreferences.length > 0 && 
        !filters.dietaryPreferences.some(pref => recipe.suitableFor.dietaryPreferences.includes(pref))) {
      return false;
    }
    
    // Filter by health conditions
    if (filters.healthConditions.length > 0 && 
        !filters.healthConditions.some(condition => recipe.suitableFor.healthConditions.includes(condition))) {
      return false;
    }
    
    // Filter by prep time
    if (filters.maxPrepTime && recipe.prepTimeMinutes > filters.maxPrepTime) {
      return false;
    }
    
    return true;
  });

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
      
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          {!userProfile ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <h2 className="text-3xl font-bold">Welcome to CultureBite</h2>
              <p className="text-xl max-w-md text-muted-foreground">
                Create your profile to get personalized healthy recipe recommendations based on your health needs and cultural preferences
              </p>
              <Button 
                size="lg" 
                onClick={() => {
                  // This will trigger the profile modal in Header
                  setUserProfile({
                    id: `user-${Date.now()}`,
                    name: "",
                    age: 30,
                    gender: "prefer-not-to-say",
                    healthConditions: [],
                    dietaryPreferences: [],
                    religiousRestrictions: [],
                    zipCode: "",
                    favoriteRecipes: []
                  });
                }}
              >
                Create Your Profile
              </Button>
              <div className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Diverse healthy food"
                  className="rounded-lg shadow-lg max-w-2xl w-full"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-2">
                      {userProfile.name ? `${userProfile.name}'s Recommendations` : 'Recommended Recipes'}
                    </h2>
                    <p className="text-muted-foreground">
                      Personalized healthy recipes based on your profile and local food context
                    </p>
                  </div>
                  
                  <div className="mb-6 flex items-center justify-between">
                    <RecipeFilters onFilterChange={handleFilterChange} />
                    <div className="text-sm text-muted-foreground">
                      {filteredRecipes.length} recipes found
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        onClick={() => handleOpenRecipe(recipe)} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {neighborhood && (
                    <>
                      <h3 className="text-xl font-bold">Your Neighborhood</h3>
                      <NeighborhoodInfo neighborhood={neighborhood} />
                      
                      <div className="mt-4 p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-2">Local Food Resources</h4>
                        <ul className="space-y-2 text-sm">
                          {neighborhood.foodAccess.farmersMarkets && (
                            <li className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Farmers Market available in your area</span>
                            </li>
                          )}
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{neighborhood.foodAccess.groceryStores} grocery stores nearby</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{neighborhood.foodAccess.healthFoodStores} health food stores available</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-2">
                        <h4 className="font-medium mb-2">Our Recommendation</h4>
                        <p className="text-sm">
                          Based on your neighborhood's {
                            neighborhood.foodAccess.foodDesert ? "limited" : "available"
                          } food resources and {neighborhood.predominantCultures.join(", ")} cultural influences, 
                          we've prioritized recipes that work well with locally available ingredients.
                        </p>
                      </div>
                    </>
                  )}
                  
                  {!neighborhood && userProfile && (
                    <div className="p-6 border rounded-md bg-muted text-center">
                      <h3 className="font-bold mb-2">Add your ZIP Code</h3>
                      <p className="text-sm mb-4">
                        To get location-based recommendations and see food resources in your neighborhood
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          // This will trigger the profile modal in Header
                          setUserProfile({...userProfile});
                        }}
                      >
                        Update Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default Index;
