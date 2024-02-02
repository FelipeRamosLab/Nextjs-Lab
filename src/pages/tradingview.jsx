'use client';

import { createChart } from 'lightweight-charts';
import { useRef, useEffect } from 'react';

export default function TradingView() {
    const firstContainer = useRef();

    useEffect(() => {
        const firstChart = createChart(firstContainer.current, {
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

        const mmaSerie = firstChart.addLineSeries();
        const candlestickSeries = firstChart.addCandlestickSeries();

        mmaSerie.setData([
            { time: '2018-12-24', value: 100 },
            { time: '2018-12-25', value: 101 },
            { time: '2018-12-26', value: 102 },
            { time: '2018-12-27', value: 103 },
            { time: '2018-12-28', value: 104 },
            { time: '2018-12-29', value: 103 },
            { time: '2018-12-31', value: 106 },
        ]);

        candlestickSeries.setData([
            { time: '2018-12-24', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-25', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-26', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-27', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-28', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-29', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
        ]);

        console.log(firstChart)
    }, []);

    return (<>
        <div ref={firstContainer} id="first-container" style={{ width: '100%', height: '100vh', boxSizing: 'border-box'}}></div>
    </>);
}