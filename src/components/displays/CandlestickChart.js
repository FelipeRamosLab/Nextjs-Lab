'use client';

import { useRef, useEffect, useState } from 'react';
import BinanceSync from 'binance-sync';
import { createChart } from 'lightweight-charts';
import SpeedDial from '@mui/material/SpeedDial';
import ExpandIcon from "@mui/icons-material/Expand";

const binance = new BinanceSync();

export default function CandlestickChart({ symbol, interval, positions, index }) {
    const chartContainer = useRef();
    const chart = useRef();
    const candleSeries = useRef();
    const openPositionSerie = useRef();
    const stopSerie = useRef();
    const takeSerie = useRef();
    const [ isExpanded, setIsExpand ] = useState(false);

    useEffect(() => {
        if (chart.current) {
            return () => {
                chart.current.remove();
                chart.current = undefined;
            }
        }

        chart.current = createChart(chartContainer.current, {
            layout: {
                textColor: '#AAA',
                background: {
                    type: 'solid',
                    color: '#222222'
                }
            },
            grid: {
                horzLines: {
                    color: '#444'
                },
                vertLines: {
                    color: '#666'
                }
            }
        });

        binance.streams.candlestickChart(symbol, interval, {
            limit: 1500,
            callbacks: {
                open: () => {
                    candleSeries.current = chart.current.addCandlestickSeries();
                    stopSerie.current = chart.current.addLineSeries({ color: 'red', lineWidth: 1, lineType: 'dashed' });
                    takeSerie.current = chart.current.addLineSeries({ color: 'green', lineWidth: 1, lineType: 'dashed' });
                    openPositionSerie.current = chart.current.addLineSeries({ color: 'yellow', lineWidth: 1, lineType: 'dashed' });

                    console.log(`A chart stream was started for ${symbol} (${interval}).`)
                },
                close: () => console.log(`A chart stream was closed for ${symbol} (${interval}).`),
                error: (err) => console.error(err),
                data: (chartUpdate) => {
                    const ordered = chartUpdate.candles.sort((a, b) => (a.openTime - b.openTime));
                    const openPosition = positions.find(item => item.status === 'opened');
                    const data = ordered.map(item => {
                        item.time = item.openTime;
        
                        if (openPosition) {
                            item.stopLoss = openPosition.stopPrice;
                            item.takeProfit = openPosition.gainPrice;
                            item.openPrice = openPosition.openPrice;
                        }
        
                        return item;
                    });
        
                    candleSeries.current.setData(data);
                    if (openPosition) {
                        const stop = data.map(item => ({ time: item.time, value: item.stopLoss }));
                        const take = data.map(item => ({ time: item.time, value: item.takeProfit }));
                        const openPosition = data.map(item => ({ time: item.time, value: item.openPrice }));

                        if (stop[0].value) {
                            stopSerie.current.setData(stop);
                        }

                        if (take[0].value) {
                            takeSerie.current.setData(take);
                        }

                        if (openPosition[0].value) {
                            openPositionSerie.current.setData(openPosition);
                        }
                    }
                }
            }
        });
    }, []);

    useEffect(() => {
        if (isExpanded) {
            chart.current.resize(window.innerWidth, window.innerHeight);
            document.body.style.overflow = 'hidden';
        } else {
            chart.current.resize(chartContainer.current.clientWidth, chartContainer.current.clientHeight);
            document.body.style.overflow = null;
        }
    }, [isExpanded, setIsExpand]);

    function handleExpandClick() {
        setIsExpand(prev => !prev);
    }

    return (<div ref={chartContainer} className={`chart-container${isExpanded ? ' expanded' : ''}`} style={{backgroundColor: '#222222'}}>
        <SpeedDial
            className="expand-btn"
            ariaLabel="Expand chart"
            icon={<ExpandIcon />}
            FabProps={{ size: 'small' }}
            onClick={handleExpandClick}
        />
    </div>);
}