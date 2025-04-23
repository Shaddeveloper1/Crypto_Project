import { useState, useEffect, useCallback } from 'react';
import { settingChartData } from '../functions/settingChartData';
import { cacheData, getCachedData } from '../functions/cacheUtils';

export const useChartData = (prices1, prices2, crypto1Name, crypto2Name) => {
    const [chartData, setChartData] = useState({});

    const generateChartData = useCallback(() => {
        if (!prices1?.length) return;

        const cacheKey = `chart_${crypto1Name}_${crypto2Name}`;
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
            setChartData(cachedData);
            return;
        }

        if (prices2?.length) {
            settingChartData(setChartData, prices1, prices2, crypto1Name, crypto2Name);
            cacheData(cacheKey, chartData);
        } else {
            settingChartData(setChartData, prices1);
            cacheData(cacheKey, chartData);
        }
    }, [prices1, prices2, crypto1Name, crypto2Name]);

    useEffect(() => {
        generateChartData();
    }, [generateChartData]);

    const refreshChartData = useCallback(() => {
        generateChartData();
    }, [generateChartData]);

    return {
        chartData,
        refreshChartData
    };
};