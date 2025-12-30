// Environment Configuration
// Copy this file to .env and update with your actual values

export const ENV = {
  // API Configuration
  API_BASE_URL: 'https://your-api-url.com/api',
  
  // App Configuration
  APP_NAME: 'Property Rental',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_AI_PREDICTION: true,
  ENABLE_OAUTH: false,
  ENABLE_PUSH_NOTIFICATIONS: false,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  
  // Upload Limits
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES_PER_PROPERTY: 5,
  
  // Timeout
  API_TIMEOUT: 15000, // 15 seconds
};

export default ENV;
