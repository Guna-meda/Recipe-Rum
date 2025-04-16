import React, { useState, useRef, useEffect } from 'react';
import sampleRecipes from './sampleRecipes';

const Home = () => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [country, setCountry] = useState('IN');
  const [recipes, setRecipes] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addItem = () => {
    if (ingredient.trim()) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient('');
      inputRef.current.focus();
    }
  };

  const removeItem = (item) => {
    setIngredients((prev) => prev.filter((items) => items !== item));
  };

  const handleSearch = () => {
    if (ingredients.length === 0) return;
    setRecipes(sampleRecipes);
    console.log('ingredients:', ingredients, 'from:', country);
    inputRef.current.focus();
  };

  const pressHandle = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">What’s in your kitchen? 👨‍🍳</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="e.g. tomato, cheese..."
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={pressHandle}
          ref={inputRef}
        />
        <button
          onClick={addItem}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map((item, idx) => (
          <span
            key={idx}
            className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {item}
            <button onClick={() => removeItem(item)} className="text-green-500 hover:text-red-500">
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Choose a cuisine region:</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none"
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="IT">Italy</option>
          <option value="CN">China</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-black text-white px-6 py-3 rounded mb-8 hover:bg-gray-800 transition duration-200"
      >
        Find Recipes
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe, i) => (
            <div key={i} className="border rounded-lg shadow hover:shadow-md transition p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-bold text-xl mb-2">{recipe.title}</h2>

              {recipe.usedIngredients.length > 0 && (
                <p className="text-sm text-green-700 mb-1">
                  ✅ Used: {recipe.usedIngredients.map((i) => i.name).join(', ')}
                </p>
              )}

              {recipe.missedIngredients.length > 0 && (
                <p className="text-sm text-red-600">
                  ❌ Missing: {recipe.missedIngredients.map((i) => i.name).join(', ')}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2 text-center">No recipes yet! 👀</p>
        )}
      </div>
    </div>
  );
};

export default Home;
