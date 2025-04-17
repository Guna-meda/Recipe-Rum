import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

//  useEffect(() => {
//    if (!recipe) {
//      navigate("/");
//    }
//  }, [recipe, navigate]);
//
//  if (!recipe) return null;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 mt-10 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-2xl w-full md:w-1/2 h-auto object-cover shadow-md"
        />

        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{recipe.title}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Cuisine: <span className="font-medium">{recipe.cuisine}</span> | Dish Type:{" "}
            <span className="font-medium">{recipe.dishTypes.join(", ")}</span>
          </p>

          <p className="text-base leading-relaxed mb-6">{recipe.summary}</p>

          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <p><span className="font-semibold">Ready in:</span> {recipe.readyInMinutes} min</p>
            <p><span className="font-semibold">Servings:</span> {recipe.servings}</p>
            <p><span className="font-semibold">Vegetarian:</span> {recipe.vegetarian ? "Yes" : "No"}</p>
            <p><span className="font-semibold">Dairy-Free:</span> {recipe.dairyFree ? "Yes" : "No"}</p>
            <p><span className="font-semibold">Gluten-Free:</span> {recipe.glutenFree ? "Yes" : "No"}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-3">Ingredients</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-3">Instructions</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-3">Nutrition Info</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm">
          <p><span className="font-semibold">Calories:</span> {recipe.nutrients.calories}</p>
          <p><span className="font-semibold">Protein:</span> {recipe.nutrients.protein}</p>
          <p><span className="font-semibold">Fat:</span> {recipe.nutrients.fat}</p>
          <p><span className="font-semibold">Carbs:</span> {recipe.nutrients.carbs}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
