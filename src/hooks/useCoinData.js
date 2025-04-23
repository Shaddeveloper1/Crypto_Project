import { useState, useEffect, useCallback } from 'react';
import { get100Coins } from '../functions/get100Coins';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { toast } from 'react-toastify';

export const useCoinData = (coinId = null, days = 30, priceType = 'prices') => {
    const [data, setData] = useState(null);
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (coinId) {
                // Single coin data
                const [coinData, priceData] = await Promise.all([
                    getCoinData(coinId),
                    getCoinPrices(coinId, days, priceType)
                ]);

                if (!coinData) {
                    throw new Error('Failed to fetch coin data');
                }

                setData(coinData);
                setPrices(priceData);
            } else {
                // List of coins
                const coinsData = await get100Coins();
                if (!coinsData) {
                    throw new Error('Failed to fetch coins list');
                }
                setData(coinsData);
            }
        } catch (err) {
            setError(err);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [coinId, days, priceType]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        prices,
        isLoading,
        error,
        refetch
    };
};