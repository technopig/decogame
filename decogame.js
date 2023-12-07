// Set up initial data
let depth_data = [];
let ambient_pressure_data = [];
let sim_t = 0;
let dive_t = 0;
let depth = 0;

let step_num = 0;
let isPaused = true;

let string_dive_time = "";
let string_sim_time = "";




// dive properties
let MAX_DEPTH = 300; // depth in feet
let DIVE_TIME = 10; // dive time in minutes
let DEPTH_ATM = 33.005249; // depth in ft per atmosphere

// chart properties
let BOX_WIDTH = 500;
let BOX_HEIGHT = 300;
let PADDING_PX = 35;


// simulation properties
let SIMULATION_TIME = 1; // time in minutes for the simulation to run
let UPDATE_INTERVAL = 1/30/60; // time in minutes for frame rate

// calculated properties
let NUM_STEPS = SIMULATION_TIME / UPDATE_INTERVAL; // number of steps to make
let TIME_STEP = DIVE_TIME / NUM_STEPS; // amount of dive time simulated per step
let TERM_TIME = SIMULATION_TIME * 1.5; // give up after 150% of desired time
let CHART_WIDTH = BOX_WIDTH - PADDING_PX;
let CHART_HEIGHT = BOX_HEIGHT - PADDING_PX;
let MAX_POINTS = Math.ceil(DIVE_TIME / TIME_STEP);


// Create SVG container for the chart
const svg = d3.select("#chartContainer")
    .append("svg")
    .attr("width", BOX_WIDTH)
    .attr("height", BOX_HEIGHT);


const xScale = d3.scaleLinear()
    .domain([0,DIVE_TIME])
    .range([PADDING_PX, CHART_WIDTH]);


const yScale = d3.scaleLinear()
    .domain([0, MAX_DEPTH])
    .range([PADDING_PX, CHART_HEIGHT]);


const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisLeft(yScale);


// Create line function
const depth_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));


// Add initial line to the chart
svg.append("path")
    .datum(depth_data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", depth_line);

svg.append("g")
    .attr("transform", `translate(0, ${CHART_HEIGHT})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${PADDING_PX}, 0)`)
    .call(yAxis);

// Create vertical slider
const slider = document.getElementById('sliderContainer');
noUiSlider.create(slider, {
    start: [0],  // Initial y-value
    orientation: 'vertical',
    range: {
        min: 0,
        max: MAX_DEPTH
    }
});

const sliderValueElement = document.getElementById('sliderValue');
const timeValueElement = document.getElementById('timeValue');
sliderValueElement.textContent = `DEPTH: ${depth.toFixed(0)} ft`;
timeValueElement.textContent = `DIVE TIME: 0:0\
                                0:0`;

// Function to pause the chart
function pauseChart() {
    isPaused = true;
}

// Function to play the chart
function playChart() {
    isPaused = false;
    // play your chart update logic here
    updateChart();
}

function getStringTime(minutes) {
    const min = Math.floor(minutes);
    const sec = Math.round((minutes - min) * 60);
    // console.log(min, ":", sec);
    return min + ":" + sec;
}

const animationStartTime = performance.now(); // Get the start time
const chartInterval = setInterval(updateChart, UPDATE_INTERVAL * 60 * 1000);
// Function to update the chart
function updateChart() {
    // Calculate the elapsed time
    depth = parseFloat(slider.noUiSlider.get());
    sliderValueElement.textContent = `DEPTH: ${depth.toFixed(0)} ft`;
    timeValueElement.textContent = `DIVE TIME: ${string_dive_time}\
                                    SIM TIME: ${string_sim_time}`;
    // Stop the animation after 10 seconds
    if (sim_t >= TERM_TIME * 60000) { // 60,000 milliseconds = 1 min
        isPaused = true;
        return;
    }

    if (isPaused) {
        return;
    }

    // Update time
    dive_t += TIME_STEP; // simulated time in minutes
    sim_t = performance.now() - animationStartTime;
    string_dive_time = getStringTime(dive_t); // get a string for dive time
    string_sim_time = getStringTime(sim_t/1000/60); // get a string for sim time
    step_num += 1; // increment step number

    // update the depth based on slider position


    // Update data array
    depth_data.push({ x: dive_t, y: depth });

    if (depth_data[depth_data.length - 1].x >= DIVE_TIME) {
        // Stop updating the chart
        isPaused = true;
        return;
    }

    // Update line
    svg.select("path")
        .datum(depth_data)
        .attr("d", depth_line); //old was line.x(d => xScale(d.x)).y(d => yScale(d.y))

    // Display the currently selected slider position



    // Adjust the maximum length of the tail (e.g., 10,000 data points)
    if (depth_data.length > MAX_POINTS) {
        depth_data.shift();
    }

}
