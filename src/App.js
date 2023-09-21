import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import covidSheet from './covid-19 states current.xlsx';
import { read, utils, writeFile } from 'xlsx';
import pattern from 'patternomaly'
import './index.css';

function createDiagonalPattern(color = 'black') {
        let shape = document.createElement('canvas')
        shape.width = 10
        shape.height = 10
        let c = shape.getContext('2d')
        c.strokeStyle = color
        c.beginPath()
        c.moveTo(2, 0)
        c.lineTo(10, 8)
        c.stroke()
        c.beginPath()
        c.moveTo(0, 8)
        c.lineTo(2, 10)
        c.stroke()
        return c.createPattern(shape, 'repeat')
      }

function App() {
        const [pres, setPres] = useState([]);
        
        const danger = createDiagonalPattern('red');
        const safe = createDiagonalPattern('green');
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
        // new array
        const bgArray=pres.map((v)=>{
                if(v.positive > 8000 && v.positive <= 10000 ){
                        return danger
                }else if(v.positive > 10000 ){
                        return 'white'
                } else{
                        return safe
                }
        })
        
        console.log(bgArray);
        const state = {
                // x axis
                labels: pres.map((val)=> val.state ),

                datasets: [
                        {
                                label: 'Rainfall',
                                backgroundColor: bgArray ,
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
