import React from 'react';
import { Button } from './ui/Button';
import RotatingEmoji from './RotatingEmoji';

import '../styles/styles.css'; 

const ExtractView = ({ newRecipeUrl, setNewRecipeUrl, extractRecipe, setCurrentView, extractLoading }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-xl mb-4">Add New Recipe</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block font-medium mb-2">Recipe URL</label>
          <input
            id="url"
            value={newRecipeUrl}
            onChange={(e) => setNewRecipeUrl(e.target.value)}
            placeholder="https://my-recipes.com/new-recipe"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={() => setCurrentView('gallery')}>Back to Gallery</Button>
          <Button
            onClick={extractRecipe}
            className="flex items-center"
            variant="secondary"
            disabled={extractLoading}
          >
            {extractLoading ? 'Extracting...' : 'Extract Recipe'}
          </Button>
        </div>
        {extractLoading && <div className="text-center mt-4"><RotatingEmoji emoji="🌶️" /></div>}
      </div>
    </div>
  );
};

export default ExtractView;
