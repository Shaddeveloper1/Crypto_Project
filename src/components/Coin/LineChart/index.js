import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertNumbers } from "../../../functions/convertNumbers";

const LineChart = memo(({ chartData, priceType, multiAxis }) => {
    const options = useMemo(() => ({
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                display: multiAxis ? true : false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (priceType === "prices") {
                            label += `$${context.parsed.y.toLocaleString()}`;
                        } else {
                            label += `$${convertNumbers(context.parsed.y)}`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            crypto1: {
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                    callback: function(value) {
                        if (priceType === "prices") {
                            return "$" + value.toLocaleString();
                        }
                        return "$" + convertNumbers(value);
                    }
                }
            },
            crypto2: multiAxis ? {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    callback: function(value) {
                        if (priceType === "prices") {
                            return "$" + value.toLocaleString();
                        }
                        return "$" + convertNumbers(value);
                    }
                },
                grid: {
                    drawOnChartArea: false,
                }
            } : undefined
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 6,
                hitRadius: 30
            },
            line: {
                tension: 0.2
            }
        },
        animation: {
            duration: 750
        }
    }), [priceType, multiAxis]);

    // Don't render if we don't have valid data
    if (!chartData?.datasets?.length) {
        return null;
    }

    return (
        <div className="chart-container" role="img" aria-label="Cryptocurrency price chart">
            <Line data={chartData} options={options} />
        </div>
    );
});

LineChart.displayName = 'LineChart';
export default LineChart;