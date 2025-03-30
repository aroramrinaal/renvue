import axios from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

// Define the structure of the data you want to scrape
interface PostData {
  title: string;
  short_description: string;
  logo: string;
  description: string;
  product_hunt_url: string;
  categories: string;
}

// Default values
const TOTALPOSTSTOGET = 10; // Default: Total posts to scrape

let TRACK404 = 0; // Not to be modified

// Function to parse HTML
const parseHTML = async (url: string): Promise<CheerioAPI | null> => {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error);
    return null;
  }
};

// Clean categories
const listClean = (txt: string): string[] => {
  txt = txt.replace('["', '').replace('"]', '');
  return txt.split('","');
};

// Scrap Post Content
const scrapPostContent = async (postId: string): Promise<PostData | null> => {
  let postData: PostData = {
    title: '',
    short_description: '',
    logo: '',
    description: '',
    product_hunt_url: '',
    categories: '',
  };

  const soup = await parseHTML(`https://www.producthunt.com/posts/${postId}`);
  if (!soup) {
    console.log(`Error scraping post ${postId}`);
    return null;
  }

  // Check for 404 or missing post
  if (soup.text().includes('flagged for removal') || soup.text().includes('Page Not Found')) {
    console.log(`Info: Post ${postId} does not exist`);
    TRACK404++;
    return null;
  }

  // Extract data
  try {
    postData.title = (soup('meta[property="og:title"]').attr('content')?.split(" - ")[0] ?? '') + " (source: Product Hunt)";
    postData.short_description = soup('meta[property="og:title"]').attr('content')?.split(" - ")[1]?.split("| ")[0] ?? '';
    postData.logo = soup('meta[property="og:image"]').attr('content') ?? '';
    postData.description = soup('meta[property="og:description"]').attr('content') ?? '';
    postData.product_hunt_url = soup('meta[property="og:url"]').attr('content') ?? '';

    // Categories
    const categories = soup.html()?.match(/applicationCategory":(.*?),"author/);
    if (categories) {
      const categoriesList = listClean(categories[1]);
      postData.categories = categoriesList.join(',');
    } else {
      postData.categories = '';
    }

    console.log(`${postId} -> Done`);
  } catch (error) {
    console.log(`Error extracting data for post ${postId}`, error);
    return null;
  }

  return postData;
};

// Get the first post link
const getFirstPostLink = async (): Promise<string> => {
  const soup = await parseHTML("https://www.producthunt.com/newest");
  if (!soup) return '';
  const firstLink = soup('a[href^="/posts/"]').eq(0).attr('href');
  return firstLink ?? '';
};

// Get post ID from the link
const getPostID = async (link: string): Promise<string> => {
  const soup = await parseHTML(`https://www.producthunt.com${link}/embed`);
  if (!soup) return '';
  const postIdMatch = soup.html()?.match(/post_id=(.*?)&amp;theme=light/);
  
  if (postIdMatch && postIdMatch[1]) {
    return postIdMatch[1];
  } else {
    console.log(`Invalid postId found for link: ${link}`);
    return '';  // Return an empty string or handle appropriately
  }
};


// Main function to scrape and return data
export const getProductHuntPosts = async (): Promise<PostData[]> => {
  const firstPostLink = await getFirstPostLink();
  let postId = await getPostID(firstPostLink);

  if (!postId) {
    console.log('Error: Invalid postId fetched');
    return []; // If postId is invalid, return an empty array
  }

  let posts: PostData[] = [];

  // Scrape the posts
  for (let i = 0; i < TOTALPOSTSTOGET; i++) {
    // Check if postId is valid before scraping
    if (!postId || isNaN(Number(postId))) {
      console.log(`Skipping invalid postId: ${postId}`);
      break;  // Break or continue, depending on your logic
    }

    const postData = await scrapPostContent(postId);
    if (postData) {
      posts.push(postData);
    }
    postId = (parseInt(postId) - 1).toString();

    // Delay to avoid overloading server
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return posts;
};
