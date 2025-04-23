import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/watchlist";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const { selectedTheme } = useTheme();

  return (
    <ErrorBoundary>
      <div className="App" data-theme={selectedTheme}>
        <BrowserRouter>
          <Header/>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/dashboard" element={<DashboardPage/>}/>
              <Route path="/coin/:id" element={<CoinPage/>}/>
              <Route path="/compare" element={<ComparePage/>}/>
              <Route path="/watchlist" element={<WatchlistPage/>}/>
            </Routes>
          </main>
          <Footer/>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
