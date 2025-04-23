import React from "react";
import "./styles.css";
import ZoomInTwoToneIcon from '@mui/icons-material/ZoomInTwoTone';

function Search({ search, onSearchChange }) {
    return (
        <div className="search-flex" role="search">
            <ZoomInTwoToneIcon aria-hidden="true" />
            <label htmlFor="crypto-search" className="visually-hidden">
                Search cryptocurrency by name or symbol
            </label>
            <input 
                id="crypto-search"
                placeholder="Search by Name/Symbol" 
                type="text" 
                value={search} 
                onChange={(e) => onSearchChange(e)}
                aria-label="Search cryptocurrency"
                role="searchbox"
            />
        </div>
    );
}

export default Search;