const sampleRecipes = [
  {
    id: 1,
    title: "Tomato Pasta",
    image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
    usedIngredients: [{ name: "tomato" }],
    missedIngredients: [{ name: "pasta" }],
    readyInMinutes: 25,
    servings: 2,
    summary: "A delicious and easy tomato pasta recipe perfect for a quick meal.",
    instructions: [
      "Boil water and cook pasta until al dente.",
      "Heat oil in a pan and sauté garlic and chopped tomatoes.",
      "Add cooked pasta to the tomato sauce, season, and mix well.",
      "Serve hot with grated cheese on top."
    ],
    ingredients: [
      { name: "tomato", amount: 2, unit: "medium" },
      { name: "pasta", amount: 200, unit: "g" },
      { name: "garlic", amount: 2, unit: "cloves" },
      { name: "olive oil", amount: 1, unit: "tbsp" },
      { name: "salt", amount: 1, unit: "tsp" }
    ],
    nutrients: {
      calories: 350,
      protein: "9g",
      fat: "10g",
      carbs: "55g"
    },
    cuisine: "Italian",
    dishTypes: ["main course"],
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: true
  },
  {
    id: 2,
    title: "Cheese Omelette",
    image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
    usedIngredients: [{ name: "cheese" }],
    missedIngredients: [{ name: "egg" }],
    readyInMinutes: 10,
    servings: 1,
    summary: "A fluffy and cheesy omelette for a quick breakfast or snack.",
    instructions: [
      "Beat the eggs in a bowl with salt and pepper.",
      "Heat a pan with butter and pour the egg mixture.",
      "Sprinkle grated cheese on top and fold the omelette.",
      "Cook until the cheese is melted and serve warm."
    ],
    ingredients: [
      { name: "cheese", amount: 50, unit: "g" },
      { name: "egg", amount: 2, unit: "large" },
      { name: "salt", amount: 0.5, unit: "tsp" },
      { name: "pepper", amount: 0.25, unit: "tsp" },
      { name: "butter", amount: 1, unit: "tbsp" }
    ],
    nutrients: {
      calories: 270,
      protein: "14g",
      fat: "22g",
      carbs: "2g"
    },
    cuisine: "French",
    dishTypes: ["breakfast"],
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false
  }
];

export default sampleRecipes;
