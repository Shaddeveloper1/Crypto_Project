import React, { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import SelectDays from "../components/Coin/SelectDays";
import TogglePriceType from "../components/Coin/PriceType";
import { useCoinData } from "../hooks/useCoinData";
import { useChartData } from "../hooks/useChartData";
import { GridSkeleton } from "../components/Common/SkeletonLoader";

function CoinPage() {
    const { id } = useParams();
    const [days, setDays] = useState(30);
    const [priceType, setPriceType] = useState('prices');
    
    const { 
        data: coinData, 
        prices, 
        isLoading, 
        error,
        refetch 
    } = useCoinData(id, days, priceType);

    const { chartData, refreshChartData } = useChartData(prices, null, coinData?.name);

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    };

    const handlePriceTypeChange = (event, newType) => {
        if (newType !== null) {
            setPriceType(newType);
            refreshChartData();
        }
    };

    if (error) {
        return (
            <div className="error-container" role="alert">
                <h2>Error loading coin data</h2>
                <p>{error.message}</p>
                <button onClick={refetch}>Try Again</button>
            </div>
        );
    }

    return (
        <div>
            {isLoading ? (
                <GridSkeleton count={1} />
            ) : (
                <>
                    <div className="grey-wrapper">
                        <List coin={coinData} />
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays 
                            days={days} 
                            handleDaysChange={handleDaysChange}
                            noPadding={true}
                        />
                        <TogglePriceType 
                            priceType={priceType} 
                            handlePriceTypeChange={handlePriceTypeChange}
                        />
                        <LineChart 
                            chartData={chartData} 
                            priceType={priceType}
                            multiAxis={false} 
                        />
                    </div>
                    <CoinInfo heading={coinData?.name} desc={coinData?.desc} />
                </>
            )}
        </div>
    );
}

export default CoinPage;