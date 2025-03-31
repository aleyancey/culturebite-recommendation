import { renderHook, waitFor } from '@testing-library/react';
import { Recipe, UserProfile, Neighborhood } from '../../types';
import useRecommendations from '../RecommendationEngine';
import mealDbService from '../../services/mealDbApi';

// Mock the mealDbService
jest.mock('../../services/mealDbApi');

describe('useRecommendations', () => {
    const mockUserProfile: UserProfile = {
        id: '1',
        name: 'Test User',
        age: 30,
        gender: 'male',
        dietaryPreferences: ['Vegetarian'],
        healthConditions: ['Diabetes'],
        religiousRestrictions: ['Halal'],
        zipCode: '10001',
        favoriteRecipes: []
    };

    const mockNeighborhood: Neighborhood = {
        zipCode: '10001',
        name: 'Test Neighborhood',
        borough: 'Manhattan',
        foodAccess: {
            groceryStores: 5,
            farmersMarkets: true,
            healthFoodStores: 2,
            foodDesert: false
        },
        predominantCultures: ['Italian', 'Mexican']
    };

    const mockRecipes: Recipe[] = [
        {
            id: '1',
            name: 'Test Recipe 1',
            category: 'Vegetarian',
            area: 'Italian',
            instructions: 'Test instructions',
            ingredients: ['ingredient1', 'ingredient2'],
            suitableFor: {
                dietaryPreferences: ['Vegetarian'],
                healthConditions: ['Diabetes'],
                religiousRestrictions: ['Halal']
            }
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return default recipes when no user profile is provided', () => {
        const { result } = renderHook(() => useRecommendations({
            recipes: mockRecipes,
            userProfile: null,
            neighborhood: null
        }));

        expect(result.current.recommendedRecipes).toEqual(mockRecipes);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should fetch and filter recipes based on user profile', async () => {
        // Mock the API responses
        (mealDbService.fetchRecipesByCategory as jest.Mock).mockResolvedValue(mockRecipes);
        (mealDbService.fetchRecipesByArea as jest.Mock).mockResolvedValue(mockRecipes);
        (mealDbService.fetchRecipeById as jest.Mock).mockResolvedValue(mockRecipes[0]);
        (mealDbService.mapToRecipe as jest.Mock).mockReturnValue(mockRecipes[0]);

        const { result } = renderHook(() => useRecommendations({
            recipes: mockRecipes,
            userProfile: mockUserProfile,
            neighborhood: mockNeighborhood
        }));

        // Check initial loading state
        expect(result.current.isLoading).toBe(true);

        // Wait for loading to complete and check final state
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
            expect(result.current.recommendedRecipes.length).toBeGreaterThan(0);
        }, { timeout: 5000 });
    });

    it('should handle API errors gracefully', async () => {
        // Mock API error
        (mealDbService.fetchRecipesByCategory as jest.Mock).mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => useRecommendations({
            recipes: mockRecipes,
            userProfile: mockUserProfile,
            neighborhood: null
        }));

        // Check initial loading state
        expect(result.current.isLoading).toBe(true);

        // Wait for loading to complete and check error state
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe('Failed to load recipes. Please try again later.');
            expect(result.current.recommendedRecipes).toEqual([]);
        }, { timeout: 5000 });
    });

    it('should filter out recipes that don\'t match health conditions', async () => {
        const incompatibleRecipe: Recipe = {
            ...mockRecipes[0],
            suitableFor: {
                ...mockRecipes[0].suitableFor,
                healthConditions: ['Gluten-Free'] // Different from user's health conditions
            }
        };

        // Mock the API responses
        (mealDbService.fetchRecipesByCategory as jest.Mock).mockResolvedValue([incompatibleRecipe]);
        (mealDbService.fetchRecipesByArea as jest.Mock).mockResolvedValue([incompatibleRecipe]);
        (mealDbService.fetchRecipeById as jest.Mock).mockResolvedValue(incompatibleRecipe);
        (mealDbService.mapToRecipe as jest.Mock).mockReturnValue(incompatibleRecipe);

        const { result } = renderHook(() => useRecommendations({
            recipes: mockRecipes,
            userProfile: mockUserProfile,
            neighborhood: mockNeighborhood
        }));

        // Check initial loading state
        expect(result.current.isLoading).toBe(true);

        // Wait for loading to complete and check filtered results
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
            expect(result.current.recommendedRecipes.length).toBe(0);
        }, { timeout: 5000 });
    });
}); 