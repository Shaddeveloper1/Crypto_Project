import axios from "axios";
import { toast } from "react-toastify";
import { cacheData, getCachedData } from "./cacheUtils";
import { fetchWithRetry } from "./apiUtils";

const throttleDataPoints = (data, maxPoints = 50) => {
    if (data.length <= maxPoints) return data;
    const interval = Math.floor(data.length / maxPoints);
    return data.filter((_, index) => index % interval === 0);
};

export const getCoinPrices = async (id, days, priceType) => {
    try {
        const cacheKey = `prices_${id}_${days}_${priceType}`;
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const data = await fetchWithRetry(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        
        const throttledData = throttleDataPoints(data[priceType]);
        cacheData(cacheKey, throttledData);
        return throttledData;
    } catch (error) {
        console.error("Error fetching price data:", error);
        toast.error("Failed to fetch price data");
        return [];
    }
}