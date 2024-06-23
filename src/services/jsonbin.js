import axios from 'axios';

const BIN_ID = process.env.REACT_APP_JSONBIN_BIN_ID;
const ACCESS_KEY = process.env.REACT_APP_JSONBIN_ACCESS_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const config = {
  headers: {
    'X-Access-Key': ACCESS_KEY,
  },
};

export const getRecipes = async () => {
  const response = await axios.get(BASE_URL, config);
  // Ensure the response contains an array
  return response.data.record.recipes || []; // Adjust based on your actual JSON structure
};

export const updateRecipes = async (recipes) => {
  const response = await axios.put(BASE_URL, { recipes }, config);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const recipes = await getRecipes();
  const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
  const response = await updateRecipes(updatedRecipes);
  return response.data;
};
