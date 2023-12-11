// const Plot = () => {
//     return (
//         <div>
//             I am a plot!
//         </div>
//     )
// }

// export default Plot;

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DynamicLineChart = () => {
  const [sliderValue, setSliderValue] = useState(0); // Initial slider value
  const [chartData, setChartData] = useState([]);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update chart data with a new point based on the slider position
      setChartData((prevData) => [
        ...prevData,
        { name: new Date().toLocaleTimeString(), value: sliderValue * 2 },
      ]);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount

  }, [sliderValue]);

  return (
    <div className='game-area' style={{ width: '100%', height: '70vh' }}>
      <input
        type="range"
        min="0"
        max="50"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <LineChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default DynamicLineChart;
