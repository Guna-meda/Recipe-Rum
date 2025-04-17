import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavo, removeFavo } from "../redux/features/favSlice";

const Saved = () => {
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

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

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Please log in to view your saved recipes .
        </h2>
        <button
          onClick={() => navigate("/profile")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Saved Recipes </h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No saved recipes yet! </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favorites.map((recipe, i) => (
            <div
              key={i}
              onClick={() => openRecipe(recipe)}
              className="border rounded-lg shadow hover:shadow-md transition p-4 relative"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-bold text-xl mb-2 flex justify-between items-center">
                {recipe.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(recipe);
                  }}
                  className="text-xl hover:scale-110 transition"
                >
                  {isFav(recipe) ? "❤️" : "🤍"}
                </button>
              </h2>

              {recipe.usedIngredients.length > 0 && (
                <p className="text-sm text-green-700 mb-1">
                  ✅ Used:{" "}
                  {recipe.usedIngredients.map((i) => i.name).join(", ")}
                </p>
              )}

              {recipe.missedIngredients.length > 0 && (
                <p className="text-sm text-red-600">
                  ❌ Missing:{" "}
                  {recipe.missedIngredients.map((i) => i.name).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
