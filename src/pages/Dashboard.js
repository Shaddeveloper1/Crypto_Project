import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/PaginationComponent";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import { useDebounce } from "../hooks/useDebounce";
import { GridSkeleton, ListSkeleton } from "../components/Common/SkeletonLoader";

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('grid');

    const debouncedSearch = useDebounce(search, 300);

    const handlePageChange = (event, value) => {
        setPage(value);
        const previousIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const filteredCoins = coins.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        || item.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const myCoins = await get100Coins();
            if (myCoins) {
                setCoins(myCoins);
                setPaginatedCoins(myCoins.slice(0, 10));
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <BackToTop />
            <Search search={search} onSearchChange={onSearchChange} />
            {isLoading ? (
                view === 'grid' ? <GridSkeleton /> : <ListSkeleton />
            ) : (
                <>
                    <TabsComponent 
                        coins={debouncedSearch ? filteredCoins : paginatedCoins} 
                        onViewChange={handleViewChange}
                        currentView={view}
                    />
                    {!debouncedSearch && (
                        <PaginationComponent page={page} handlePageChange={handlePageChange} />
                    )}
                </>
            )}
        </>
    )
};

export default DashboardPage;