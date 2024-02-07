'use client';

import { createChart } from 'lightweight-charts';
import { useRef, useEffect } from 'react';
import BinanceSync from 'binance-sync';

export default function TradingView() {
    const firstContainer = useRef();

    useEffect(() => {
        const chart = createChart(firstContainer.current, {
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
        const binance = new BinanceSync();
        
        binance.futuresChart('BTCUSDT', '15m', { limit: 1500 }).then(res => {
            const candlestickSeries = chart.addCandlestickSeries();
            const stopSerie = chart.addLineSeries({color: 'red'});
            const takeSerie = chart.addLineSeries({color: 'green'});
            const ordered = res.sort((a, b) => (a.openTime.getTime() - b.openTime.getTime()));
            const data = ordered.map(item => {
                item.time = item.openTime.getTime();
                item.stopLoss = 42500;
                item.takeProfit = 43200;
                return item;
            });

            const stop = data.map(item => ({time: item.time, value: item.stopLoss}));
            const take = data.map(item => ({time: item.time, value: item.takeProfit}));

            candlestickSeries.setData(data);
            // stopSerie.setData(stop);
            // takeSerie.setData(take);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (<>
        <div ref={firstContainer} id="first-container"></div>
    </>);
}