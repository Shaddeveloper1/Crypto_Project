import React from 'react';
import './styles.css';

export const CoinCardSkeleton = () => (
    <div className="skeleton-card" role="presentation" aria-hidden="true">
        <div className="skeleton-header">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
            </div>
        </div>
        <div className="skeleton-price"></div>
        <div className="skeleton-stats">
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
        </div>
    </div>
);

export const GridSkeleton = ({ count = 8 }) => (
    <div className="grid-flex">
        {[...Array(count)].map((_, index) => (
            <CoinCardSkeleton key={index} />
        ))}
    </div>
);

export const ListRowSkeleton = () => (
    <div className="skeleton-row" role="presentation" aria-hidden="true">
        <div className="skeleton-cell-image"></div>
        <div className="skeleton-cell-text">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
        </div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
    </div>
);

export const ListSkeleton = ({ count = 10 }) => (
    <div className="list-container">
        {[...Array(count)].map((_, index) => (
            <ListRowSkeleton key={index} />
        ))}
    </div>
);