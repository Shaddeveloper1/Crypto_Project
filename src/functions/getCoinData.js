import axios from "axios";
import { toast } from "react-toastify";
import { cacheData, getCachedData } from "./cacheUtils";
import { fetchWithRetry } from "./apiUtils";

export const getCoinData = async (id) => {
    try {
        const cacheKey = `coin_${id}`;
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const data = await fetchWithRetry(`https://api.coingecko.com/api/v3/coins/${id}`);
        cacheData(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Error fetching coin data:", error);
        toast.error(error.response?.data?.error || "Failed to fetch coin data");
        return null;
    }
}