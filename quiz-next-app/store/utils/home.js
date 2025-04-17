// utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_URLS = {
  apiSetting: `${API_URL}/api/v1/api-settings`,
  apiCategories: `${API_URL}/api/v1/api-categories`,
  apiCourses: `${API_URL}/api/v1/api-courses`,
  apiFaqs: `${API_URL}/api/v1/api-faqs`,
  apiBlogs: `${API_URL}/api/v1/api-blogs`,
  apiTestimonials: `${API_URL}/api/v1/api-testimonials`,
  apiFeatures: `${API_URL}/api/v1/api-features`,
  apiBlocks: `${API_URL}/api/v1/api-blocks`,
  apiContact: `${API_URL}/api/v1/contact`,
  // Add more API URLs as needed
};

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    return null; // Return null or handle the error as needed
  }
};
