import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavo, removeFavo } from "../redux/features/favSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [country, setCountry] = useState("IN");
  const [recipes, setRecipes] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addItem = () => {
    if (ingredient.trim()) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient("");
      inputRef.current.focus();
    }
  };

  const removeItem = (item) => {
    setIngredients((prev) => prev.filter((items) => items !== item));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) return;

    const cuisineMap = {
      US: "American",
      IN: "Indian",
      IT: "Italian",
      CN: "Chinese",
    };

    const cuisine = cuisineMap[country];

    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&includeIngredients=${ingredients.join(
      ","
    )}&number=10&addRecipeInformation=true`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.results);
      console.log("Fetched recipes:", data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    inputRef.current.focus();
  };

  const pressHandle = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.auth.user);

  const toggleFav = (recipe) => {
    if (!user) {
      alert("Please login to save your favorite recipes.");
      return;
    }

    const isFav = favorites.some((fav) => fav.id === recipe.id);
    if (isFav) {
      dispatch(removeFavo(recipe));
    } else {
      dispatch(addToFavo(recipe));
    }
  };

  const isFav = (recipe) => {
    return favorites.some((fav) => fav.id === recipe.id);
  };

  const openRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-red-500">
      What’s in your kitchen? 👨‍🍳
    </h1>
  
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="e.g. tomato, cheese..."
        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        onKeyDown={pressHandle}
        ref={inputRef}
      />
      <button
        onClick={addItem}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md"
      >
        Add
      </button>
    </div>
  
    <div className="flex flex-wrap gap-2 mb-5">
      {ingredients.map((item, idx) => (
        <span
          key={idx}
          className="bg-[#FFEB99] text-red-500 px-4 py-1 rounded-full flex items-center gap-2 text-sm font-medium transition-transform transform hover:scale-105"
        >
          {item}
          <button
            onClick={() => removeItem(item)}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">
        Choose a cuisine region:
      </label>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
      >
        <option value="US">United States</option>
        <option value="IN">India</option>
        <option value="IT">Italy</option>
        <option value="CN">China</option>
      </select>
    </div>
  
    <div className="text-center mb-10">
      <button
        onClick={handleSearch}
        className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Find Recipes
      </button>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {recipes.length > 0 ? (
        recipes.map((recipe, i) => (
          <div
            key={i}
            onClick={() => openRecipe(recipe)}
            className="border border-gray-200 rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer bg-white"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="font-semibold text-xl text-gray-800 mb-2 flex justify-between items-center">
              {recipe.title}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(recipe);
                }}
                className="text-xl transition-transform transform hover:scale-125"
              >
                {isFav(recipe) ? "❤️" : "🤍"}
              </button>
            </h2>
          </div>
        ))
      ) : (
        <p className="text-gray-400 col-span-2 text-center text-lg">
          No recipes yet! 👀
        </p>
      )}
    </div>
  </div>
  
  );
};

export default Home;
