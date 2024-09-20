import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import RecipeGallery from "./components/RecipeGallery";
import ExtractView from "./components/ExtractView";
import RecipeView from "./components/RecipeView";
import ApprovalView from "./components/ApprovalView";
import ReviewView from "./components/ReviewView";
import JoeView from "./components/JoeView";
import RotatingEmoji from "./components/RotatingEmoji";
import { fetchRecipeFromUrl } from "./services/proxyService";
import { extractRecipeDetails } from "./services/openaiService";
import { getRecipes, updateRecipes, deleteRecipe } from "./services/jsonbin";
import "./styles/styles.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState("gallery");
  const [newRecipeUrl, setNewRecipeUrl] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [extractedContent, setExtractedContent] = useState(null);
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [error, setError] = useState("");
  const [rawResponse, setRawResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractLoading, setExtractLoading] = useState(false);
  const [convertLoading, setConvertLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const extractRecipe = async () => {
    setError("");
    setRawResponse("");
    setExtractLoading(true);
    try {
      const { textContent, metaTags } = await fetchRecipeFromUrl(newRecipeUrl);
      setExtractedContent({ textContent, metaTags });
      setCurrentView("approval");
    } catch (error) {
      setError(
        "Failed to extract the recipe. Please check the URL and try again."
      );
      console.error("Error extracting recipe:", error);
    } finally {
      setExtractLoading(false);
    }
  };

  const approveAndSendToOpenAI = async () => {
    setError("");
    setRawResponse("");
    setConvertLoading(true);
    try {
      const { textContent, metaTags } = extractedContent;
      const extractedRecipe = await extractRecipeDetails({
        textContent,
        metaTags,
      });
      extractedRecipe.url = newRecipeUrl; // Add the URL to the extracted recipe
      setParsedRecipe(extractedRecipe);
      setCurrentView("review");
    } catch (error) {
      setError("Failed to process the recipe with OpenAI. Please try again.");
      setRawResponse(error.message); // Display the raw response content
      console.error("Error processing recipe with OpenAI:", error);
    } finally {
      setConvertLoading(false);
    }
  };

  const addRecipeToDatabase = async () => {
    setAddLoading(true);
    try {
      const newRecipe = { id: recipes.length + 1, ...parsedRecipe };
      const updatedRecipes = [...recipes, newRecipe];
      await updateRecipes(updatedRecipes);
      setRecipes(updatedRecipes);
      setCurrentView("gallery");
      setNewRecipeUrl("");
    } catch (error) {
      setError("Failed to add the recipe to the database. Please try again.");
      console.error("Error adding recipe:", error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteRecipe = async (id) => {
    setDeleteLoading(true);
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      setCurrentView("gallery"); // Navigate back to the gallery view after deletion
    } catch (error) {
      setError("Failed to delete the recipe. Please try again.");
      console.error("Error deleting recipe:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentView("gallery");
        }}
      >
        <h1 className="text-3xl font-bold mb-6">Jim Cook 🥗</h1>
      </a>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <RotatingEmoji emoji="🥐" />
        </div>
      ) : (
        <>
          {currentView === "gallery" && (
            <RecipeGallery
              recipes={recipes}
              setSelectedRecipe={setSelectedRecipe}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === "extract" && (
            <ExtractView
              newRecipeUrl={newRecipeUrl}
              setNewRecipeUrl={setNewRecipeUrl}
              extractRecipe={extractRecipe}
              setCurrentView={setCurrentView}
              extractLoading={extractLoading}
            />
          )}
          {currentView === "approval" && (
            <ApprovalView
              extractedContent={extractedContent}
              approveAndSendToOpenAI={approveAndSendToOpenAI}
              setCurrentView={setCurrentView}
              convertLoading={convertLoading}
            />
          )}
          {currentView === "review" && parsedRecipe && (
            <ReviewView
              selectedRecipe={parsedRecipe}
              addRecipeToDatabase={addRecipeToDatabase}
              setCurrentView={setCurrentView}
              addLoading={addLoading}
            />
          )}
          {currentView === "joe" && <JoeView setCurrentView={setCurrentView} />}
          {currentView === "recipe" && selectedRecipe && (
            <RecipeView
              selectedRecipe={selectedRecipe}
              setCurrentView={setCurrentView}
              onDeleteRecipe={handleDeleteRecipe}
              deleteLoading={deleteLoading}
            />
          )}
        </>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
          <AlertCircle className="mr-2" size={20} />
          <p>{error}</p>
        </div>
      )}
      {rawResponse && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md">
          <h3 className="font-bold">Raw OpenAI Response:</h3>
          <pre className="whitespace-pre-wrap">{rawResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
