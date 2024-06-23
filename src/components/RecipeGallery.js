import React from 'react';
import { Plus } from 'lucide-react';
import '../styles/styles.css'; 

const RecipeGallery = ({ recipes, setSelectedRecipe, setCurrentView }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {(Array.isArray(recipes) ? recipes : []).map((recipe) => (
        <div
          key={recipe.id}
          className="cursor-pointer hover:shadow-lg transition-shadow card"
          onClick={() => {
            setSelectedRecipe(recipe);
            setCurrentView('recipe');
          }}
        >
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
            />
          )}
          <div className="card-content">
            <h2 className="font-bold text-xl mb-2">{recipe.name}</h2>
          </div>
        </div>
      ))}
      <div
        className="cursor-pointer hover:shadow-lg transition-shadow add-new card"
        onClick={() => setCurrentView('extract')}
      >
        <Plus size={24} className="mr-2" />
        <span className="font-bold text-xl mb-2">Add New Recipe</span>
      </div>
    </div>
  );
};

export default RecipeGallery;
