
import { Recipe, Neighborhood, UserProfile } from "../types";

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Dominican Mangu with Sautéed Vegetables",
    description: "A healthier take on the traditional Dominican breakfast dish made with mashed plantains and topped with sautéed vegetables instead of fried cheese.",
    cuisineType: "Caribbean",
    culturalOrigin: "Dominican Republic",
    ingredients: [
      "3 green plantains",
      "1 tablespoon olive oil",
      "1 onion, sliced",
      "1 bell pepper, sliced",
      "2 cloves garlic, minced",
      "1 cup spinach",
      "Salt and pepper to taste",
      "1/4 cup fresh cilantro, chopped"
    ],
    instructions: [
      "Peel and cut plantains into chunks. Boil in salted water until soft, about 15-20 minutes.",
      "While plantains cook, heat olive oil in a pan and sauté onions, peppers, and garlic until soft.",
      "Add spinach and cook until wilted. Season with salt and pepper.",
      "Drain plantains, reserving some of the water. Mash plantains, adding a little of the reserved water to achieve desired consistency.",
      "Serve mashed plantains topped with sautéed vegetables and garnished with cilantro."
    ],
    nutritionalInfo: {
      calories: 285,
      protein: 3,
      carbs: 62,
      fat: 4,
      fiber: 5
    },
    suitableFor: {
      healthConditions: ["diabetes", "heart disease", "obesity"],
      dietaryPreferences: ["vegetarian", "vegan", "low-fat"],
      religiousRestrictions: ["halal", "kosher"]
    },
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.5
  },
  {
    id: "2",
    name: "Jewish Vegetable Cholent",
    description: "A slow-cooked stew adapted for health-conscious eaters, perfect for Sabbath observance.",
    cuisineType: "Jewish",
    culturalOrigin: "Ashkenazi Jewish",
    ingredients: [
      "1 cup pearl barley, rinsed",
      "3 large potatoes, cubed",
      "2 sweet potatoes, cubed",
      "2 carrots, chopped",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "2 tbsp paprika",
      "1 tsp cumin",
      "4 cups low-sodium vegetable broth",
      "1 cup dried beans, soaked overnight",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Layer beans, barley, and vegetables in a slow cooker.",
      "Mix spices with broth and pour over ingredients.",
      "Cook on low for 8-10 hours.",
      "Adjust seasoning before serving."
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 10,
      carbs: 60,
      fat: 5,
      fiber: 12
    },
    suitableFor: {
      healthConditions: ["heart disease", "high cholesterol"],
      dietaryPreferences: ["vegetarian", "high-fiber"],
      religiousRestrictions: ["kosher"]
    },
    prepTimeMinutes: 20,
    cookTimeMinutes: 480, // 8 hours
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7
  },
  {
    id: "3",
    name: "Heart-Healthy Soul Food Collard Greens",
    description: "Traditional collard greens prepared with smoked turkey instead of ham hocks for a healthier alternative that maintains authentic flavor.",
    cuisineType: "Soul Food",
    culturalOrigin: "African American",
    ingredients: [
      "2 bunches collard greens, washed and chopped",
      "1 smoked turkey wing",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tablespoon apple cider vinegar",
      "1/4 teaspoon red pepper flakes",
      "4 cups low-sodium chicken broth",
      "Black pepper to taste"
    ],
    instructions: [
      "In a large pot, sauté onions and garlic until fragrant.",
      "Add smoked turkey wing, broth, and seasonings.",
      "Add washed and chopped collard greens.",
      "Bring to a simmer, cover and cook for 60-90 minutes until tender.",
      "Remove turkey wing, shred meat and return to pot before serving."
    ],
    nutritionalInfo: {
      calories: 150,
      protein: 12,
      carbs: 15,
      fat: 3,
      fiber: 8
    },
    suitableFor: {
      healthConditions: ["high blood pressure", "heart disease", "diabetes"],
      dietaryPreferences: ["low-carb", "high-protein"],
      religiousRestrictions: []
    },
    prepTimeMinutes: 15,
    cookTimeMinutes: 90,
    imageUrl: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8
  },
  {
    id: "4",
    name: "Low-Sodium Chinese Stir-Fry",
    description: "A flavorful stir-fry that uses aromatic spices instead of salt and MSG to deliver authentic Chinese flavors with less sodium.",
    cuisineType: "Chinese",
    culturalOrigin: "Chinese",
    ingredients: [
      "1 lb tofu or chicken breast, cubed",
      "2 cups mixed vegetables (broccoli, bell peppers, carrots, snow peas)",
      "2 tablespoons low-sodium soy sauce",
      "1 tablespoon rice vinegar",
      "1 tablespoon honey",
      "1 tablespoon ginger, minced",
      "3 cloves garlic, minced",
      "1 teaspoon five-spice powder",
      "2 tablespoons sesame oil",
      "2 green onions, sliced",
      "1 tablespoon sesame seeds"
    ],
    instructions: [
      "Press tofu to remove excess water, or slice chicken into thin strips.",
      "Heat sesame oil in a wok over high heat.",
      "Add protein and stir-fry until cooked through.",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "Mix soy sauce, rice vinegar, honey, ginger, garlic, and five-spice powder.",
      "Pour sauce over stir-fry and toss to coat.",
      "Garnish with green onions and sesame seeds before serving."
    ],
    nutritionalInfo: {
      calories: 280,
      protein: 20,
      carbs: 18,
      fat: 14,
      fiber: 4
    },
    suitableFor: {
      healthConditions: ["high blood pressure", "heart disease"],
      dietaryPreferences: ["low-sodium", "gluten-free (with tamari instead of soy sauce)"],
      religiousRestrictions: ["halal"]
    },
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6
  },
  {
    id: "5",
    name: "Mexican Cauliflower Rice Bowl",
    description: "A lower-carb version of a Mexican rice bowl using cauliflower rice, packed with veggies and authentic Mexican flavors.",
    cuisineType: "Mexican",
    culturalOrigin: "Mexican",
    ingredients: [
      "1 head cauliflower, riced",
      "1 tablespoon olive oil",
      "1 onion, diced",
      "1 bell pepper, diced",
      "2 cloves garlic, minced",
      "1 cup black beans, cooked",
      "1 cup corn kernels",
      "1 tablespoon cumin",
      "1 tablespoon chili powder",
      "1/2 teaspoon oregano",
      "Juice of 1 lime",
      "1/4 cup cilantro, chopped",
      "1 avocado, sliced",
      "Salsa and Greek yogurt for serving"
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium heat.",
      "Add onion, bell pepper, and garlic. Sauté until soft.",
      "Add cauliflower rice, cumin, chili powder, and oregano. Cook for 5-7 minutes.",
      "Stir in black beans and corn. Heat through.",
      "Remove from heat and stir in lime juice and cilantro.",
      "Serve topped with avocado slices, salsa, and a dollop of Greek yogurt."
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 35,
      fat: 16,
      fiber: 13
    },
    suitableFor: {
      healthConditions: ["diabetes", "obesity", "digestive issues"],
      dietaryPreferences: ["vegetarian", "gluten-free", "low-carb"],
      religiousRestrictions: ["halal", "kosher"]
    },
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9
  }
];

export const sampleNeighborhoods: Neighborhood[] = [
  {
    zipCode: "11216",
    name: "Bedford-Stuyvesant",
    borough: "Brooklyn",
    foodAccess: {
      groceryStores: 4,
      farmersMarkets: true,
      healthFoodStores: 3,
      foodDesert: false
    },
    healthStats: {
      obesityRate: 32,
      diabetesRate: 14
    },
    predominantCultures: ["African American", "Caribbean", "Latinx"]
  },
  {
    zipCode: "10025",
    name: "Upper West Side",
    borough: "Manhattan",
    foodAccess: {
      groceryStores: 12,
      farmersMarkets: true,
      healthFoodStores: 8,
      foodDesert: false
    },
    healthStats: {
      obesityRate: 18,
      diabetesRate: 7
    },
    predominantCultures: ["Jewish", "European", "South American"]
  },
  {
    zipCode: "10029",
    name: "East Harlem",
    borough: "Manhattan",
    foodAccess: {
      groceryStores: 3,
      farmersMarkets: true,
      healthFoodStores: 2,
      foodDesert: true
    },
    healthStats: {
      obesityRate: 33,
      diabetesRate: 16
    },
    predominantCultures: ["Latinx", "African American", "Caribbean"]
  },
  {
    zipCode: "11101",
    name: "Long Island City",
    borough: "Queens",
    foodAccess: {
      groceryStores: 6,
      farmersMarkets: true,
      healthFoodStores: 4,
      foodDesert: false
    },
    healthStats: {
      obesityRate: 24,
      diabetesRate: 10
    },
    predominantCultures: ["Asian", "Middle Eastern", "European"]
  },
  {
    zipCode: "10458",
    name: "Belmont",
    borough: "Bronx",
    foodAccess: {
      groceryStores: 5,
      farmersMarkets: false,
      healthFoodStores: 1,
      foodDesert: true
    },
    healthStats: {
      obesityRate: 35,
      diabetesRate: 18
    },
    predominantCultures: ["Italian", "Albanian", "Mexican", "Puerto Rican"]
  }
];

export const sampleUser: UserProfile = {
  id: "user1",
  name: "Alex Johnson",
  age: 38,
  gender: "non-binary",
  healthConditions: ["diabetes", "high blood pressure"],
  dietaryPreferences: ["low-carb", "low-sodium"],
  religiousRestrictions: [],
  zipCode: "11216",
  favoriteRecipes: []
};
