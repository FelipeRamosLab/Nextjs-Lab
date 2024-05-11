'use client';

import { useRef, useEffect, useState } from 'react';
import BinanceSync from 'binance-sync';
import { createChart } from 'lightweight-charts';
import SpeedDial from '@mui/material/SpeedDial';
import ExpandIcon from "@mui/icons-material/Expand";

export default function CandlestickChart({ symbol, interval, limit }) {
    const chartContainer = useRef();
    const chart = useRef();
    const candleSeries = useRef();
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
                tickMarkFormatter: (time, tickMarkType, locale) => {
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
                        case '1w': {
                            const timeString = new Date(time).toDateString();
                            const [week, month, day] = timeString.split(' ');
                            return `${day} ${month}`;
                        }
                        default: {
                            return new Date(time).toDateString().split(' ')[1]
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

const CATEGORY_PATH = ['indicators'];

function lastTopBottom(last = 0, lastWinner) {
    let { type, actualLength = 7, verifyLength = 7, increase = 0, decrease = 0 } = Object(this.args);

    const current = last + actualLength;
    const lastCandles = this.history.slice(last, current + 1);
    const verifyCandles = this.history.slice(current, current + verifyLength);
    const actual = getHighestLowest(type, lastCandles);
    const verify = getHighestLowest(type, verifyCandles);

    if (!lastCandles.length || !verify || !actual) {
        return lastWinner;
    }

    try {
        switch (type) {
            case 'top': {
                if ((verify.high > actual.high)) {
                    return lastTopBottom.call(this, current, actual.high);
                }

                return actual.high;
            }
            case 'bottom': {
                if ((verify.low < actual.low)) {
                    return lastTopBottom.call(this, current, actual.low);
                }

                return actual.low;
            }
            default: {
                debugger;
            }
        }
    } catch(err) {
        throw new Error.Log(err);
    }
}

lastTopBottom.configs = {
    title: 'Last Top/Bottom',
    categories: CATEGORY_PATH,
    options: {
        type: { type: 'string', required: true },
        actualLength: { type: 'number', default: 7 },
        verifyLength: { type: 'number', default: 7 },
        increase: { type: 'number', default: 0 },
        decrease: { type: 'number', default: 0 }
    },
    returns: ['number']
};

function getHighestLowest(type, candles) {
    let sort;

    if (type === 'top') {
        sort = candles.sort((a, b) => (b.high - a.high));
    }

    if (type === 'bottom') {
        sort = candles.sort((a, b) => (a.low - b.low));
    }

    return sort.length ? sort[0] : null;
}

// function increase(baseValue, value) {
//     return strategyHelper.increaseDecrease({
//         result: baseValue,
//         increase: value
//     });
// }

// function decrease(baseValue, value) {
//     return strategyHelper.increaseDecrease({
//         result: baseValue,
//         decrease: value
//     });
// }
