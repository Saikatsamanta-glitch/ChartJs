import { useEffect, useState } from 'react';
import { read, utils, writeFile } from 'xlsx';
import chart from './Chart.js.xlsx';
import { createDiagonalPattern } from './util';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import DataGraph from './DataGraph';
export default function App() {
        const [filtered, setFiltered] = useState([]);

        useEffect(() => {
                (async () => {
                        /* Download file */
                        const f = await (await fetch(chart)).arrayBuffer();
                        const wb = read(f); // parse the array buffer
                        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
                        const data = utils.sheet_to_json(ws); // generate objects
                        const filtered_data = data.filter(v => { if (!v.qtr.includes('2021') && !v.qtr.includes('2022') && v.bu === 'ALL') return v })
                        console.log(filtered_data);
                        setFiltered(filtered_data)
                })();


        }, []);
        const bgArray=filtered.map((v)=>{
                if(v['qtr'].includes('BL') ){
                        return 'white'
                }else if(v['qtr'].includes('2023')  ){
                        return 'blue'
                } else if(v['qtr'].includes('TARGET')){
                        return createDiagonalPattern()
                }else{
                        return 'white'
                }
        })
        const state = {
                // x axis
                labels: filtered.map(v  =>  v['qtr'] ),

                datasets: [
                        {
                                label: '2023 ALL',
                                backgroundColor: bgArray ,
                                borderWidth: 2,
                                //     y axis
                                data: filtered.map(val => Number(val.value))
                        }
                ]
        }
        return (
                <div className="App">
                <div className='bar1'>
                        <Bar
                                data={state}
                                options={{
                                        title: {
                                                display: true,
                                                fontSize: 20
                                        },
                                        legend: {
                                                display: true,
                                                position: 'right'
                                        }
                                }}
                        />
                        
                </div>
                <DataGraph/>
                </div>
        )
}
