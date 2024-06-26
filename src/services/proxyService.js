import axios from 'axios';
import cheerio from 'cheerio';

// const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';
const CORS_ANYWHERE_URL = '';

export const fetchRecipeFromUrl = async (url) => {
  const response = await axios.get(`${CORS_ANYWHERE_URL}${url}`);
  const htmlContent = response.data;

  // Use cheerio to load HTML content
  const $ = cheerio.load(htmlContent);

  // Remove script, style, and other irrelevant tags
  $('script, style, link, [style], [onclick], [onmouseover], [onmouseout]').remove();

  // Extract text content
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();

  // Extract meta tags
  const metaTags = [];
  $('meta').each((index, element) => {
    const property = $(element).attr('property') || $(element).attr('name');
    const content = $(element).attr('content');
    if (property && content) {
      metaTags.push({ property, content });
    }
  });

  return { textContent, metaTags };
};
