import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetUserSettings from '../../hooks/useGetUserSettings';
import useGetConstants from '../../hooks/useGetConstants.js';
// import useGetNextTissuePressure from '../../hooks/useGetNextTissuePressure';
// import "./styles.css";
import "../../App.css";

const MAX_DATA_POINTS = 500;

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

    const getLeadingMValueLine = (dataPoint) => {
        let maxMValue = 0;
        for (const compartment in dataPoint) {
            // Make sure this is one of the compartments and not a different property
            if (compartment.startsWith('c') && dataPoint[compartment].mValueLine !== undefined) {
                // Update maxMValue if the current compartment's mValueLine is greater
                maxMValue = Math.max(maxMValue, dataPoint[compartment]?.mValueLine);
            }
        }
        return maxMValue;
    }

    const getNextMValue = (tissue_pressure, A, B) => {
        const m = (tissue_pressure - A) * B;
        return m > 1 ? m : 1;
    }

    const getNextTissuePressureNitrogen = (
        current_pressure,
        amb_pressure,
        half_life
    ) => {
        half_life = half_life * 60;
        const nitrogen_frac = userSettings.gasPercentNitrogen / 100;
        const simulatedTimeStep = userSettings.simulatedTimeStep;
        const gas_pressure = nitrogen_frac * amb_pressure;
        const p = current_pressure +
            (gas_pressure - current_pressure) *
            (1 - (1/2) ** (simulatedTimeStep/half_life));
        return p;
    }

    const getNextTissuePressureHelium = (
        current_pressure,
        amb_pressure,
        half_life
    ) => {
        half_life = half_life * 60;
        const helium_frac = userSettings.gasPercentHelium / 100;
        const simulatedTimeStep = userSettings.simulatedTimeStep;
        const gas_pressure = helium_frac * amb_pressure;
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
        if (Object.keys(userSettings).length === 0 || Object.keys(CONSTANTS).length === 0) {
            console.log("loading...");
            return;
        }
        const newDepth = depth;
        const newAmbientPressure = depth / 33 + 1;
        const newDiveTime = diveTime + userSettings.simulatedTimeStep;
        const oldDataPoint = chartData.length >=1 && chartData[chartData.length-1]; // get the latest data point
        console.log(" ");
        console.log("old Data Point: ", oldDataPoint);
        console.log(" ");
        // const newMValue = getNextMValue(oldDataPoint.tissue_pressure, )

        setDiveTime(newDiveTime);

        // new data point for the chartData
        const newDataPoint = {
            diveTime: newDiveTime,
            depthLine: parseFloat(newDepth),
            ambientPressureLine: newAmbientPressure,
            leadingMValueLine: getLeadingMValueLine(oldDataPoint)
        };

        // loop over all {16} compartments 
        for (let i=1; i<= 8; i++) {
            const compartment = `c${i}`;
            // console.log(`nitrogen for cpt ${compartment}`, userSettings.linesConfig);
            // userSettings.linesConfig[compartment].nitrogenLine.visible);
            const nitrogenCompartment = CONSTANTS.nitrogen[compartment];
            const heliumCompartment = CONSTANTS.helium[compartment];
            const oldNitrogenLine = oldDataPoint[compartment]?.nitrogenLine;
            const oldHeliumLine = oldDataPoint[compartment]?.heliumLine;
            console.log(compartment, nitrogenCompartment, heliumCompartment, oldNitrogenLine, oldHeliumLine);
            
            // get the new nitrogen pressure
            const nitrogenPoint = getNextTissuePressureNitrogen(
                oldNitrogenLine,
                newAmbientPressure,
                nitrogenCompartment.half_life // Nitrogen compartment 1 half life
            );

            // get the new m value
            const mValuePoint = getNextMValue(
                oldNitrogenLine,
                nitrogenCompartment.a,
                nitrogenCompartment.b
            );

            // get the new helium pressure
            const heliumPoint = getNextTissuePressureHelium(
                oldHeliumLine,
                newAmbientPressure,
                heliumCompartment.half_life
            );

            // add this {compartment} to newDataPoint and continue the loop
            newDataPoint[compartment] = {
                nitrogenLine: nitrogenPoint,
                mValueLine: mValuePoint,
                heliumLine: heliumPoint
            }
        }

        // write the new dat apoint
        setChartData(currentData => {
            let newData = [...currentData, newDataPoint];

            if (newData.length > MAX_DATA_POINTS) {
                newData = newData.slice(newData.length - MAX_DATA_POINTS);
            }
            // return [...newData, newDataPoint];
            return newData;
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
                <ResponsiveContainer width="100%" aspect={1.4}>
                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="diveTime"
                        tickFormatter={(tick) => Math.floor(tick/60)}
                    />
                    <YAxis reversed='true' yAxisId="feet" orientation="left" />
                    <YAxis type='number' yAxisId="ATM" orientation="right" domain={[0,6]}/>
                    {/* <Tooltip /> */}
                    <Legend />
                    {Object.keys(userSettings.linesConfig).map(key => { // loop through all the keys in linesConfig
                        const lineConfig = userSettings.linesConfig[key];
                        if (!key.startsWith('c')) {
                            if (lineConfig.visible) {
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
                                    return (
                                        <Line
                                            key={`${key}-${key2}`}
                                            type="monotone"
                                            dataKey={(data) => data[key]?.[key2]}
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