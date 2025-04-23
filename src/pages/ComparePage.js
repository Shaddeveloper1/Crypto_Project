import React, { useState } from "react";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/PriceType";
import { useCoinData } from "../hooks/useCoinData";
import { useChartData } from "../hooks/useChartData";
import { GridSkeleton } from "../components/Common/SkeletonLoader";
import { toast } from "react-toastify";

function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [days, setDays] = useState(30);
    const [priceType, setPriceType] = useState("prices");

    const { 
        data: crypto1Data, 
        prices: prices1, 
        isLoading: isLoading1, 
        error: error1 
    } = useCoinData(crypto1, days, priceType);

    const { 
        data: crypto2Data, 
        prices: prices2, 
        isLoading: isLoading2, 
        error: error2 
    } = useCoinData(crypto2, days, priceType);

    const { chartData, refreshChartData } = useChartData(
        prices1,
        prices2,
        crypto1Data?.name,
        crypto2Data?.name
    );

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    };

    const handlePriceTypeChange = (event, newType) => {
        if (newType !== null) {
            setPriceType(newType);
            refreshChartData();
        }
    };

    const handleCoinChange = (event, isCoin2) => {
        try {
            const newValue = event.target.value;
            if (isCoin2) {
                if (newValue === crypto1) {
                    toast.error("Please select a different coin");
                    return;
                }
                setCrypto2(newValue);
            } else {
                if (newValue === crypto2) {
                    toast.error("Please select a different coin");
                    return;
                }
                setCrypto1(newValue);
            }
            refreshChartData();
        } catch (error) {
            console.error("Error changing coin:", error);
            toast.error("Failed to update coin selection");
        }
    };

    const isLoading = isLoading1 || isLoading2;
    const hasError = error1 || error2;

    if (hasError) {
        return (
            <div className="error-container" role="alert">
                <h2>Error loading comparison data</h2>
                <p>{error1?.message || error2?.message}</p>
                <button onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="coins-days-flex">
                <SelectCoins
                    crypto1={crypto1}
                    crypto2={crypto2}
                    handleCoinChange={handleCoinChange}
                />
                <SelectDays
                    days={days}
                    handleDaysChange={handleDaysChange}
                    noPadding={true}
                />
            </div>

            {isLoading ? (
                <div className="grey-wrapper">
                    <GridSkeleton count={2} />
                </div>
            ) : (
                <>
                    <div className="grey-wrapper" role="region" aria-label="Crypto 1 Information">
                        <List coin={crypto1Data} />
                    </div>
                    <div className="grey-wrapper" role="region" aria-label="Crypto 2 Information">
                        <List coin={crypto2Data} />
                    </div>

                    <div className="grey-wrapper">
                        <div className="toggle-flex">
                            <TogglePriceType 
                                priceType={priceType} 
                                handlePriceTypeChange={handlePriceTypeChange}
                            />
                        </div>
                        <LineChart 
                            chartData={chartData} 
                            priceType={priceType} 
                            multiAxis={true}
                        />
                    </div>

                    <div className="grey-wrapper">
                        <CoinInfo heading={crypto1Data?.name} desc={crypto1Data?.desc} />
                    </div>
                    <div className="grey-wrapper">
                        <CoinInfo heading={crypto2Data?.name} desc={crypto2Data?.desc} />
                    </div>
                </>
            )}
        </div>
    );
}

export default ComparePage;