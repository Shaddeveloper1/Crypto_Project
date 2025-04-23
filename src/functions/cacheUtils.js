const CACHE_DURATION = 30000; // 30 seconds cache duration

export const cacheData = (key, data) => {
    const item = {
        data,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getCachedData = (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = new Date().getTime();

    if (now - parsedItem.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
    }

    return parsedItem.data;
};