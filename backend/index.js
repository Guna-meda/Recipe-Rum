const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch'); // ✅ Import fetch

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  const { cuisine, ingredients } = req.query;

  if (!cuisine || !ingredients) {
    return res.status(400).json({ message: 'Cuisine and ingredients are required' });
  }

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOON_API_KEY}&cuisine=${cuisine}&includeIngredients=${ingredients}&number=10&addRecipeInformation=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching from Spoonacular' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
