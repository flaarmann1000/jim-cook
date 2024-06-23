import React from 'react';
import { Button } from './ui/Button';
import { Trash2 } from 'lucide-react';
import RotatingEmoji from './RotatingEmoji';
import '../styles/styles.css'; 

const RecipeView = ({ selectedRecipe, setCurrentView, onDeleteRecipe, deleteLoading }) => {
  if (!selectedRecipe) return null;

  const { name, imageUrl, url, ingredients, steps } = selectedRecipe;

  const getDomainName = (url) => {
    const domain = new URL(url).hostname.replace('www.', '');
    return `→ ${domain}`;
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      {imageUrl && (
        <div className="mb-4">
          <img
            src={imageUrl}
            alt={name}
            className="rounded"
            style={{ width: '100%', height: '300px', objectFit: 'cover' }} // Fixed size and cover fit for images
          />
        </div>
      )}    
      <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
      <ul className="font-blue list-disc pl-5 mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-xl font-bold mb-2">Steps:</h3>
      <ol className="list-decimal pl-5">
        {steps.map((step, index) => (
          <li key={index} className="mb-4">
            <div className="text-sm font-blue italic mb-1">
              {step.ingredients.join(', ')}
            </div>
            <div>{step.description}</div>
          </li>
        ))}
      </ol>
      {url && (
        <div className="mb-4">
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-blue">
            {getDomainName(url)}
          </a>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => onDeleteRecipe(selectedRecipe.id)}
          className="flex items-center"
          variant="outline"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : <><Trash2 size={20} className="mr-2" /> Delete</>}
        </Button>
        <Button variant="secondary" onClick={() => setCurrentView('gallery')}>Back to Gallery</Button>
      </div>
      {deleteLoading && <div className="text-center mt-4"><RotatingEmoji emoji="🗑️" /></div>}
    </div>
  );
};

export default RecipeView;
