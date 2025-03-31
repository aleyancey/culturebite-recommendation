const mealDbService = {
  fetchRecipesByCategory: jest.fn(),
  fetchRecipesByArea: jest.fn(),
  fetchRecipesByIngredient: jest.fn(),
  fetchRecipesByFirstLetter: jest.fn(),
  searchRecipes: jest.fn(),
  fetchRecipeById: jest.fn(),
  mapToRecipe: jest.fn(),
  filterRecipes: jest.fn()
};

export default mealDbService; 