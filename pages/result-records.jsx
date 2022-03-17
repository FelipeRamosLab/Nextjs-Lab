import axios from 'axios';
import { useEffect } from 'react';

export default function ResultRecord() {
    useEffect(()=>{
        import('apexcharts').then(res=>{
            const ApexCharts = res.default;
            const options = {
                chart: {
                  type: 'candlestick'
                },
                series: [{
                  name: 'sales',
                  data: []
                }],
                xaxis: {
                  categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
                }
            }
              
            var chart = new ApexCharts(document.querySelector("#my-chart"), options);
              
            chart.render();
        })
    }, []);

    return (<>
        <h1>Result Records</h1>

        <div id="my-chart"></div>
    </>);
}

async function getRecords() {
    try {
        console.log('Download started!')
        const records = await axios.post('http://35.193.248.29/database/get-collection/ResultRecord', {});
        console.log('Download concluded!')
        return records;
    } catch (err) {
        return err
    }
}
