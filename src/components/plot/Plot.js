import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useGetUserSettings from '../../hooks/useGetUserSettings';
import useGetNextTissuePressure from '../../hooks/useGetNextTissuePressure';
// import "./styles.css";

const MAX_DATA_POINTS = 15000;

const Plot = () => {
    // hooks
    const [depth, setDepth] = useState(0); // directly linked to depth
    const [chartData, setChartData] = useState([]); // List of LINES drawn on the feet scale
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepNumber, setStepNumber] = useState(0);
    const [diveTime, setDiveTime] = useState(0); // simulated dive time
    const { userSettings } = useGetUserSettings();
    const { getNextTissuePressure } = useGetNextTissuePressure(); // function to get next pressure


    const handleDepthChange = (event) => {
        setDepth(event.target.value);
    };

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    }
  
    // initial setup
    // useEffect(() => {
    //     setChartData([{
    //         diveTime: 0,
    //         depthLine: 0,
    //         ambientPressureLine: 1,
    //         nitrogenCpt1Line: 1,
    //         nitrogenCpt2Line: 1,
    //         nitrogenCpt3Line: 1,
    //         nitrogenCpt4Line: 1,
    //         nitrogenCpt5Line: 1,
    //         nitrogenCpt6Line: 1,
    //         nitrogenCpt7Line: 1,
    //         nitrogenCpt8Line: 1,
    //         nitrogenCpt9Line: 1,
    //         nitrogenCpt10Line: 1,
    //         nitrogenCpt11Line: 1,
    //         nitrogenCpt12Line: 1,
    //         nitrogenCpt13Line: 1,
    //         nitrogenCpt14Line: 1,
    //         nitrogenCpt15Line: 1,
    //         nitrogenCpt16Line: 1,
    //         mValueLine: 1
    //     }]);
    // }, []);


    // effect to ONLY increment the step number
    useEffect(() => {
        if (isPlaying){
            const interval = setInterval(() => {
                isPlaying && setStepNumber(stepNumber => stepNumber + 1);
            }, userSettings.chartUpdateIntervalMS);
            return () => clearInterval(interval);
        }

    }, [isPlaying]);

    // effect to update the plot with each new step
    useEffect(() => {
        const newDepth = depth;
        const newDiveTime = diveTime + userSettings.simulatedTimeStep;
        setDiveTime(newDiveTime);
        const newDataPoint = {
            diveTime: newDiveTime,
            depthLine: parseFloat(newDepth),
            ambientPressureLine: newDepth/33 + 1,
        }
        setChartData(currentData => {
            let newData = [...currentData, newDataPoint];

            if (newData.length > MAX_DATA_POINTS) {
                newData = newData.slice(newData.length - MAX_DATA_POINTS);
            }
            return [...newData, newDataPoint];
        });
    }, [stepNumber]);

    return (
        <div>
            <div className='slider-input'>
                <input
                    type="range"
                    min="0"
                    max={userSettings.maxDepth} // add maxDepth to user settings
                    value={depth}
                    onChange={handleDepthChange}
                />
                {depth}
            </div>
            <div className='live-plot'>
                <LineChart width={500} height={300} data={chartData}>

                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
                    <XAxis dataKey="diveTime" />
                    <YAxis reversed='true' yAxisId="feet" orientation="left" />
                    <YAxis type='number' yAxisId="ATM" orientation="right" />
                    <Tooltip />
                    <Legend />
                    {/* <Line 
                        key='depthLine'
                        type="monotone"
                        dataKey='depthLine'
                        stroke='#8884d8'
                        yAxisId='feet'
                        name='depthLine'
                        
                    /> */}
                    {Object.keys(userSettings.linesConfig).map(key => { // loop through all the keys in linesConfig
                        const lineConfig = userSettings.linesConfig[key];
                        // console.log(lineConfig);
                        if (lineConfig.visible) {
                            console.log("rendering line:", key);
                            console.log("lineconfig: ", lineConfig);
                            return (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={lineConfig.stroke}
                                    yAxisId={lineConfig.yAxisId}
                                    name={key}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </LineChart>
            </div>
            <div className='control-buttons'>
                <button onClick={handleTogglePlay}>
                    { isPlaying ? "Pause" : "Play" }
                </button>
            </div>
        </div>
    );
}

export default Plot