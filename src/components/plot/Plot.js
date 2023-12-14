import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetUserSettings from '../../hooks/useGetUserSettings';
import useGetConstants from '../../hooks/useGetConstants.js';
// import useGetNextTissuePressure from '../../hooks/useGetNextTissuePressure';
// import "./styles.css";
import "../../App.css";

const MAX_DATA_POINTS = 15000;

const Plot = () => {
    // hooks
    const [depth, setDepth] = useState(0); // directly linked to depth
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepNumber, setStepNumber] = useState(0);
    const [diveTime, setDiveTime] = useState(0); // simulated dive time
    const { userSettings } = useGetUserSettings();
    const { CONSTANTS, DEFAULT_CHART_DATA } = useGetConstants();
    const [chartData, setChartData] = useState(DEFAULT_CHART_DATA);


    const handleDepthChange = (event) => {
        setDepth(event.target.value);
    };

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    }
    
    const handleResetGraph = () => {
        setChartData(DEFAULT_CHART_DATA);
        setDiveTime(0);
        setDepth(0);
    }

    const getNextMValue = (tissue_pressure, A, B) => {
        const m = (tissue_pressure - A) * B;
        return m > 0 ? m : 0;
    }

    const getNextTissuePressure = (
        current_pressure,
        amb_pressure,
        half_life
    ) => {
        half_life = half_life * 60;
        const nitrogen_frac = userSettings.gasPercentNitrogen / 100;
        const helium_frac = userSettings.gasPercentHelium / 100;
        const simulatedTimeStep = userSettings.simulatedTimeStep;
        const gas_pressure = nitrogen_frac * amb_pressure;
        const p = current_pressure +
            (gas_pressure - current_pressure) *
            (1 - (1/2) ** (simulatedTimeStep/half_life));
        return p;
    }

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
        const newAmbientPressure = depth / 33 + 1;
        const newDiveTime = diveTime + userSettings.simulatedTimeStep;
        const oldDataPoint = chartData.length >=1 && chartData[chartData.length-1]; // get the latest data point
        const newMValue = getNextMValue(oldDataPoint.tissue_pressure, )
        setDiveTime(newDiveTime);
        const newDataPoint = {
            diveTime: newDiveTime,
            depthLine: parseFloat(newDepth),
            ambientPressureLine: newAmbientPressure,
            c1: {
                mValueLine: newMValue,
                nitrogenLine: getNextTissuePressure(
                    oldDataPoint.c1.nitrogenLine,
                    newAmbientPressure,
                    CONSTANTS.nitrogen.half_life.c1 // Nitrogen compartment 1 half life
                )
            }
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
        <div className='game-pane'>
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
                <ResponsiveContainer width="100%" height={600}>
                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="diveTime"
                        tickFormatter={(tick) => Math.floor(tick/60)}
                    />
                    <YAxis reversed='true' yAxisId="feet" orientation="left" />
                    <YAxis type='number' yAxisId="ATM" orientation="right" />
                    {/* <Tooltip /> */}
                    <Legend />
                    {Object.keys(userSettings.linesConfig).map(key => { // loop through all the keys in linesConfig
                        const lineConfig = userSettings.linesConfig[key];
                        if (!key.startsWith('c')) {
                            if (lineConfig.visible) {
                                console.log("working key:", key);
                                return (
                                    <Line
                                        key={key}
                                        type="monotone"
                                        dataKey={key}
                                        stroke={lineConfig.stroke}
                                        yAxisId={lineConfig.yAxisId}
                                        name={key}
                                        dot={false}
                                    />
                                );
                            } else {  
                                return null;
                            }
                        } else {
                            return Object.keys(lineConfig).map(key2 => {
                                const cLineConfig = userSettings.linesConfig[key][key2];
                                if (cLineConfig.visible) {
                                    // console.log(chartData.key[key2]);
                                    console.log("");
                                    console.log(key, key2);
                                    console.log(chartData[chartData.length-1][key][key2]);
                                    console.log("");
                                    return (
                                        <Line
                                            key={`${key}-${key2}`}
                                            type="monotone"
                                            dataKey={(data) => data[key][key2]}
                                            stroke={cLineConfig.stroke}
                                            yAxisId={cLineConfig.yAxisId}
                                            name={`${key}-${key2}`}
                                            dot={false}
                                        />
                                    );
                                } else {  
                                    return null;
                                }

                            })
                        }
                        
                    })}
                </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='control-buttons'>
                <button onClick={handleTogglePlay}>
                    { isPlaying ? "Pause" : "Play" }
                </button>
                <button onClick={handleResetGraph}>
                    RESET
                </button>
            </div>
        </div>
    );
}

export default Plot