'use client';

import { useRef, useEffect, useState } from 'react';
import BinanceSync from 'binance-sync';
import { createChart } from 'lightweight-charts';
import SpeedDial from '@mui/material/SpeedDial';
import ExpandIcon from "@mui/icons-material/Expand";

export default function CandlestickChart({ symbol, interval, limit, position }) {
    const chartContainer = useRef();
    const chart = useRef();
    const candleSeries = useRef();
    const stoplossLine = useRef();
    const takeprofitLine = useRef();
    const [ isExpanded, setIsExpand ] = useState(false);
    let parsedLimit = !isNaN(limit) ? Number(limit) : 500;

    if (parsedLimit > 1000) {
        parsedLimit = 1000;
    }

    useEffect(() => {
        const binance = new BinanceSync();

        if (chart.current) {
            return () => {
                chart.current.remove();
                chart.current = undefined;
            }
        }

        chart.current = createChart(chartContainer.current, {
            autoSize: true,
            timeScale: {
                fixLeftEdge: true,
                tickMarkFormatter: (time) => {
                    switch (interval) {
                        case '1m':
                        case '3m':
                        case '5m':
                        case '15m':
                        case '30m':
                        case '1h':
                        case '2h':
                        case '4h':
                        case '6h':
                        case '8h':
                        case '12h': {
                            const timeString = new Date(time).toLocaleTimeString();
                            const [hour, minute] = timeString.split(':');
                            return `${hour}:${minute}`;
                        }
                        case '1d':
                        case '1w':
                        default: {
                            const timeString = new Date(time).toDateString();
                            const [week, month, day] = timeString.split(' ');
                            return `${day} ${month}`;
                        }
                    }
                }
            },
            localization: {
                timeFormatter: (time) => {
                    return new Date(time).toLocaleString()
                }
            },
            layout: {
                textColor: '#AAA',
                background: { type: 'solid', color: '#222222' }
            },
            grid: {
                horzLines: { color: '#444' },
                vertLines: { color: '#666' }
            }
        });
        
        if (position) {
            stoplossLine.current = chart.current.addLineSeries({
                color: '#ee4a4a'
            });
        }

        if (position && position.gainPrice) {
            takeprofitLine.current = chart.current.addLineSeries({
                color: '#0ecb81'
            });
        }

        binance.streams.candlestickChart(symbol, interval, {
            limit: parsedLimit,
            accumulateCandles: true,
            callbacks: {
                open: () => {
                    candleSeries.current = chart.current.addCandlestickSeries();

                    console.log(`A chart stream was started for ${symbol} (${interval}).`)
                },
                close: () => console.log(`A chart stream was closed for ${symbol} (${interval}).`),
                error: (err) => console.error(err),
                data: (chartUpdate) => {
                    const ordered = chartUpdate.candles?.sort((a, b) => (a.openTime - b.openTime));

                    if (position) {
                        const stoplossLineData = [];
                        ordered.map(candle => stoplossLineData.push({ value: position.stopPrice, time: candle.openTime}));
                        stoplossLine.current.setData(stoplossLineData);
                        
                        if (position.gainPrice) {
                            const takeprofitLineData = [];

                            ordered.map(candle => takeprofitLineData.push({ value: position.gainPrice, time: candle.openTime}));
                            takeprofitLine.current.setData(takeprofitLineData);
                        }
                    }

                    candleSeries.current.setData(ordered);
                }
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            debugger
        });
    }, [interval, symbol]);

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
