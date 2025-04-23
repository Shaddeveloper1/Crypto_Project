import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWithRetry = async (url, options = {}) => {
    let lastError;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await axios(url, options);
            return response.data;
        } catch (error) {
            lastError = error;
            
            // Don't retry on client errors (4xx)
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                throw error;
            }
            
            // Wait before retrying
            if (i < MAX_RETRIES - 1) {
                await sleep(RETRY_DELAY * (i + 1));
            }
        }
    }
    
    throw lastError;
};