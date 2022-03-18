import {useState} from 'react';
import axios from 'axios';

export default function MasterAccount({acc}){
    const [chartID, setChartID] = useState(genCode(15))
    const [chartState, setChartState] = useState(false);
    const [records, setRecords] = useState([]);
    const [candles, setCandles] = useState([]);

    async function getRecords({masterID, botAccountID}) {
        try{
            const res = await axios.post('http://192.168.15.54/result-records/get/', {masterID, botAccountID});

            setRecords(res.data);
            return res.data;
        } catch(err){
            console.error(err)
            return err;
        }
    }
    
    function openChart(ev){
        ev.preventDefault();
        setChartState(true);

        import('apexcharts').then(async (res)=>{
            const recs = await getRecords({masterID: acc.id});
            const ApexCharts = res.default;
            console.log(recs)
            const chart = new ApexCharts(document.querySelector(`[chart-id="${chartID}"]`), {
                chart: {
                    type: 'line'
                },
                series: [{
                    name: 'PNL',
                    data: recs.map(rec=>rec.pnl.money)
                }],
                xaxis: {
                    categories: recs.map(rec=>rec.pnl.money)
                }
            });
            chart.render();
        });
    }

    return (<form onSubmit={(ev)=>openChart(ev)}>
        <h3>{acc.name} ({Number(acc.pnl.money).toLocaleString('en-US', {currency: 'USD', style: 'currency'})})</h3>

        {chartState ? (<>
            <div chart-id={chartID}></div>
        </>) : (<>
            <button type="submit">See chart</button>
        </>)}
    </form>)
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
