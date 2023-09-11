import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import covidSheet from './covid-19 states current.xlsx';
import { read, utils, writeFile } from 'xlsx';
import pattern from 'patternomaly'
import './index.css'
function App() {
        const [pres, setPres] = useState([]);
        const [x,setX] =useState([]);
        const [y,setY] =useState([])
        /* Fetch and update the state once */
        useEffect(() => {
                (async () => {
                        /* Download file */
                        const f = await (await fetch(covidSheet)).arrayBuffer();
                        const wb = read(f); // parse the array buffer
                        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
                        const data = utils.sheet_to_json(ws); // generate objects
                        setPres(data); // update state
                       
                })();

                
        }, []);
        const state = {
                // x axis
                labels: pres.map((val)=> val.state ),

                datasets: [
                        {
                                label: 'Rainfall',
                                backgroundColor: pattern.draw('diagonal', '#1f77b4'),
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                //     y axis
                                data: pres.map(val=>val.positive)
                        }
                ]
        }

        
        return (
                <div className="App">
                <div className="bar_graph">
                        <Bar
                                data={state}
                                options={{
                                        title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                        },
                                        legend: {
                                                display: true,
                                                position: 'right'
                                        }
                                }}
                        />
                        </div>
                </div>
        );
}

export default App;
