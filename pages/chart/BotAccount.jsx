import { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

export default function BotAccountChart({ acc }) {
    const [chartID, setChartID] = useState(genCode(15));
    const [chartState, setChartState] = useState(false);

    return (<form onSubmit={(ev) => {
        openChart(ev, chartID, acc);
        setChartState(true);
    }}>
        {chartState ? (<>
            <div chart-id={chartID}></div>
        </>) : (<>
            <button type="submit">See chart</button>
        </>)}
    </form>)
}

export function openChart(ev, chartID, acc) {
    ev.preventDefault();

    import('apexcharts').then(async res => {
        const ApexChart = res.default;
        const recs = await getRecords({botAccountID: acc.id});
        const data = buildCandleChart(recs, '5m');

        const chart = new ApexChart(document.querySelector(`[chart-id="${chartID}"]`), {
            series: [{ data }],
            chart: {
                type: 'candlestick',
                height: 500
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
        case '1d':
        default: {
            millisInterval = oneDay;
            break;
        }
    }

    while(currentTime <= Date.now()){
        let endTime = currentTime + millisInterval;

        const filter = raw.filter(item=>{
            let itemTime = new Date(item.timestamp).getTime();
            if(itemTime >= currentTime && itemTime <= endTime) return item;
        });

        const lastCandle = filter[filter.length-1];
        const open = filter[0].pnl.money;
        const close = lastCandle.pnl.money;
        let low = open;
        let high = open;
        
        filter.map(item=>{
            if(item.pnl.money > high) high = item.pnl.money;
            if(item.pnl.money < low) low = item.pnl.money;
        });

        result.push({
            y: [open, high, low, close],
            x: new Date(endTime)
        });
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
