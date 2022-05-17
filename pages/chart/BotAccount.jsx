import { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

export default function BotAccountChart({ acc }) {
    const [chartID, setChartID] = useState(genCode(15));
    const [chartState, setChartState] = useState(false);

    return (<div>
        {chartState ? (<>
            <div chart-id={chartID}></div>
            <button type="button" onClick={()=>setChartState(false)}>Close chart</button>
        </>) : (<>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '5m');
                setChartState(true);
            }}>5MIN</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '15m');
                setChartState(true);
            }}>15MIN</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '30m');
                setChartState(true);
            }}>30MIN</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '1h');
                setChartState(true);
            }}>1H</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '4h');
                setChartState(true);
            }}>4H</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '1d');
                setChartState(true);
            }}>1D</button>
            <button type="submit" onClick={(ev) => {
                openChart(ev, chartID, acc, '1w');
                setChartState(true);
            }}>1W</button>
        </>)}
    </div>)
}

export function openChart(ev, chartID, acc, interval) {
    import('apexcharts').then(async res => {
        const wrapper = document.querySelector(`[chart-id="${chartID}"]`);
        const ApexChart = res.default;
        const recs = await getRecords({botAccountID: acc.id});
        const data = buildCandleChart(recs, interval);
        const chart = new ApexChart(wrapper, {
            series: [{ data }],
            chart: {
                type: 'candlestick',
                height: window.innerHeight * 0.8
            },
            title: {
                text: acc.name,
                align: 'center'
            },
            xaxis: {
                type: 'datetime'
            },
        }).render();
    });

}

export async function getRecords({ masterID, botAccountID }) {
    try {
        const res = await axios.post(config[config.root] + '/result-records/get/', { masterID, botAccountID });
        return res.data;
    } catch (err) {
        console.error(err)
        return err;
    }
}

export function buildCandleChart(raw, interval){
    const result = [];
    const oneMin = 1000 * 60;
    const oneHour = oneMin * 60;
    const oneDay = oneHour * 24;
    const oneWeek = oneDay * 7;
    let currentTime = new Date(raw[0].timestamp).getTime();
    let millisInterval;
    
    switch(interval){
        case '5m': {
            millisInterval = oneMin * 5;
            break;
        }
        case '15m': {
            millisInterval = oneMin * 15;
            break;
        }
        case '30m': {
            millisInterval = oneMin * 30;
            break;
        }
        case '1h': {
            millisInterval = oneHour;
            break;
        }
        case '4h': {
            millisInterval = oneHour * 4;
            break;
        }
        case '1d': {
            millisInterval = oneDay;
            break;
        }
        case '1w':
        default: {
            millisInterval = oneWeek;
        }
    }

    while(currentTime <= Date.now()){
        let endTime = currentTime + millisInterval;
        const filter = raw.filter(item=>{
            let itemTime = new Date(item.timestamp).getTime();
            if(itemTime >= currentTime && itemTime <= endTime) return item;
        });

        if(filter.length){
            const lastCandle = filter[filter.length-1];
            const open = filter[0].pnl;
            const close = lastCandle.pnl;
            let low = open;
            let high = open;
            
            filter.map(item=>{
                if(item.pnl > high) high = item.pnl;
                if(item.pnl < low) low = item.pnl;
            });
    
            result.push({
                y: [Number(open.toFixed(2)), Number(high.toFixed(2)), Number(low.toFixed(2)), Number(close.toFixed(2))],
                x: new Date(endTime)
            });
        }
        currentTime = endTime;
    }

    return result;
}

function genCode(size) {
    var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'k', 'r', 's', 't', 'u', 'v', 'x', 'y', 'w', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var charSize = chars.length - 1;
    var result = '';

    for (let i = 0; i < size; i++) {
        let char = (Math.random() * charSize);
        result += chars[Number(char.toFixed(0))];
    }

    return result;
}
