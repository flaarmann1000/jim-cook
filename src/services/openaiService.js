import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export const extractRecipeDetails = async ({ textContent, metaTags }) => {
  const metaTagsText = metaTags.map(tag => `${tag.property}: ${tag.content}`).join('\n');
  const prompt = `I provide you with a website that contains a recipe. 
  
  I you first to look in the meta data if there's an image url that seems to show the dish.
  Meta tags:
  ${metaTagsText}
  
  Then extract the recipe details from the following HTML content.

  Content:
  ${textContent}

  As answer provide only a valid JSON.
  The format should be:
  {
    "name": "Recipe Name",
    "ingredients": ["xy g ingredient 1", "xy ml ingredient 2", ...],
    "steps": [
      {
        "description": "step description",
        "ingredients": ["xy g ingredient 1", "xy ml ingredient 2"]
      },
      ...
    ],
    "imageUrl": "URL of the best image if available"
  }`;

  const completion = await openai.chat.completions.create({
    messages: [{ "role": "user", "content": prompt }],
    model: "gpt-3.5-turbo",
  });

  const extractedRecipe = JSON.parse(completion.choices[0].message.content);
  return extractedRecipe;
};
