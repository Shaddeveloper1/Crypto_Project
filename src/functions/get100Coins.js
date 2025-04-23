import axios from "axios";
import { toast } from "react-toastify";
import { cacheData, getCachedData } from "./cacheUtils";
import { fetchWithRetry } from "./apiUtils";

export const get100Coins = async () => {
    try {
        const cachedData = getCachedData('coins100');
        if (cachedData) {
            return cachedData;
        }

        const data = await fetchWithRetry(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
        );
        cacheData('coins100', data);
        return data;
    } catch (error) {
        console.error("Error fetching coins:", error);
        toast.error(error.response?.data?.error || "Failed to fetch cryptocurrency data");
        return [];
    }
}