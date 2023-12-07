// Set up initial data
let depth_data = [];
let ambient_pressure_data = [];
let tissue_pressure_data = [];
let m_value_data = [];
let gradient_factor_data = [];
let sim_t = 0;
let dive_t = 0;
let depth = 0;
let m_value = 0;
let ambient_pressure = 1; // start at 1 atm
let gradient_factor = 0;


let step_num = 0;
let isPaused = true;

let string_dive_time = "";
let string_sim_time = "";

let gas = "n2";
let compartment = 1;




// dive properties
let MAX_DEPTH = 300; // depth in feet
let DIVE_TIME = 100; // dive time in minutes
let DEPTH_ATM = 33.005249; // depth in ft per atmosphere
let GAS = "N2"; // gasses other than o2
let FRAC_O2 = 0.21 // fraction of o2 in the mix

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
let MAX_PRESSURE = MAX_DEPTH / DEPTH_ATM + 1;
let GAS_FRAC = 1 - FRAC_O2;
let tissue_pressure = GAS_FRAC; // start at saturation


// Create SVG container for the chart
const svg = d3.select("#chartContainer")
    .append("svg")
    .attr("width", BOX_WIDTH)
    .attr("height", BOX_HEIGHT);

const legendContainer = d3.select("#legend-container");

const xScale = d3.scaleLinear()
    .domain([0,DIVE_TIME])
    .range([PADDING_PX, CHART_WIDTH]);


const yScaleFeet = d3.scaleLinear()
    .domain([0, MAX_DEPTH])
    .range([PADDING_PX, CHART_HEIGHT]);

const yScaleATM = d3.scaleLinear()
    .domain([MAX_PRESSURE, 0])
    .range([PADDING_PX, CHART_HEIGHT]);

const yScalePct = d3.scaleLinear()
    .domain([100, 0])
    .range([PADDING_PX, CHART_HEIGHT]);


const xAxis = d3.axisBottom(xScale);

const yAxisFeet = d3.axisLeft(yScaleFeet);

const yAxisATM = d3.axisRight(yScaleATM);

const yAxisPct = d3.axisLeft(yScalePct);


// Create line function
const depth_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleFeet(d.y));

const ambient_pressure_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleATM(d.y));

const tissue_pressure_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleATM(d.y));

const m_value_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleATM(d.y));

const gradient_factor_line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScalePct(d.y));

// const dcs_area = d3.area()
//     .x(d => xScale(d.x))
//     .y0(d => Math.min( yScaleATM(d.y), yScaleATM(getYOnMValue(d.x))))
//     .y1(d => Math.max( yScaleATM(d.y), yScaleATM(getYOnMValue(d.x))));

// Add initial line to the chart
svg.append("path")
    .datum(depth_data)
    .attr("class", "depth_line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", depth_line);

svg.append("path")
    .datum(ambient_pressure_data)
    .attr("class", "ambient_pressure_line")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("d", ambient_pressure_line);

svg.append("path")
    .datum(tissue_pressure_data)
    .attr("class", "tissue_pressure_line")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("d", tissue_pressure_line);

svg.append("path")
    .datum(m_value_data)
    .attr("class", "m_value_line")
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", m_value_line);

svg.append("path")
    .datum(gradient_factor_data)
    .attr("class", "gradient_factor_line")
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("d", gradient_factor_line);

// svg.append("path")
//     .datum(m_value_data)
//     .attr("class", "dcs_area")
//     .attr("fill", "rgba(255, 0, 0, 0.3)")
//     .attr("d", dcs_area);

svg.append("g")
    .attr("transform", `translate(0, ${CHART_HEIGHT})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${PADDING_PX}, 0)`)
    .call(yAxisFeet);

svg.append("g")
    .attr("transform", `translate(${CHART_WIDTH})`)
    .call(yAxisATM);

const legendItem = legendContainer.append("div")
    .attr("class", "legend-item");

legendItem.append("div")
    .attr("class", "legend-color")
    .style("background-color", "purple");

legendItem.append("span")
    .text(`Line`);

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

// Function to convert minutes to a string of min:sec like "15:34"
function getStringTime(minutes) {
    const min = Math.floor(minutes);
    const sec = Math.round((minutes - min) * 60);
    // console.log(min, ":", sec);
    return min + ":" + sec;
}

// Function to return halflife, A, and B for Buhlmann's formula
function getConstants(gas, compartment) {
    half_life = 4;
    const A = 1.2599210498948732;
    const B = 0.5049999999999999;
    return [half_life, A, B]; // for now, 4 is the halflife of n2 in compartment 1
}

// Function that returns the next tissue pressure
function getNextTissuePressure(current_pressure, amb_pressure, half_life) {
    const gas_pressure = GAS_FRAC * amb_pressure;
    const exp = (1 - (1/2)^(TIME_STEP/half_life));
    const p = current_pressure +
                (gas_pressure - current_pressure) *
                (1 - (1/2) ** (TIME_STEP/half_life));
    return p;
}

// Function that returns the M value (minimum tolerated ambient pressure)
function getMValue(tissue_pressure, A, B) {
    const m = (tissue_pressure - A) * B;
    if (m > 0) {return m;} else {return 0;}
}

// Function that returns the gradient factor
function getGradientFactor(tissue_pressure, ambient_pressure, m_value) {
    const gf = (tissue_pressure - ambient_pressure) / (tissue_pressure - m_value) * 100;
    if (gf > 0) {return gf;} else {return 0;}
}

// function getYOnMValue(x) {
//     return m_value_data[x];
// }

const animationStartTime = performance.now(); // Get the start time
const chartInterval = setInterval(updateChart, UPDATE_INTERVAL * 60 * 1000);
// Function to update the chart
function updateChart() {
    // Display the currently selected slider position
    depth = parseFloat(slider.noUiSlider.get());
    sliderValueElement.textContent = `DEPTH: ${depth.toFixed(0)} ft`;
    timeValueElement.textContent = `DIVE TIME: ${string_dive_time}\
                                    SIM TIME: ${string_sim_time}`;

    if (sim_t >= TERM_TIME * 60000) { // 60,000 milliseconds = 1 min
        isPaused = true;
        return;
    }

    if (isPaused) {
        return;
    }

    if (dive_t >= DIVE_TIME) {
        isPaused = true;
        return;
    }

    // Update time
    dive_t += TIME_STEP; // simulated time in minutes
    sim_t = performance.now() - animationStartTime; // Calculate the elapsed time
    string_dive_time = getStringTime(dive_t); // get a string for dive time
    string_sim_time = getStringTime(sim_t/1000/60); // get a string for sim time

    step_num += 1; // increment step number

    // calculate things
    ambient_pressure = depth / DEPTH_ATM + 1; // pressure in atmospheres
    const [half_life, A, B] = getConstants(gas, compartment);
    tissue_pressure = getNextTissuePressure(tissue_pressure,
                                            ambient_pressure,
                                            half_life);
    m_value = getMValue(tissue_pressure, A, B);
    gradient_factor = getGradientFactor(tissue_pressure, ambient_pressure, m_value);

    // console.log(tissue_pressure);
    // Update data arrays
    depth_data.push({ x: dive_t, y: depth });
    ambient_pressure_data.push({ x: dive_t, y: ambient_pressure });
    tissue_pressure_data.push({ x: dive_t, y: tissue_pressure });
    m_value_data.push({ x: dive_t, y: m_value });
    gradient_factor_data.push({ x: dive_t, y: gradient_factor });

    // if (depth_data[depth_data.length - 1].x >= DIVE_TIME) {
    //     // Stop updating the chart
    //     isPaused = true;
    //     return;
    // }

    // Update lines
    svg.select(".depth_line")
        .datum(depth_data)
        .attr("d", depth_line); //old was line.x(d => xScale(d.x)).y(d => yScale(d.y))

    svg.select(".ambient_pressure_line")
        .datum(ambient_pressure_data)
        .attr("d", ambient_pressure_line);

    svg.select(".tissue_pressure_line")
        .datum(tissue_pressure_data)
        .attr("d", tissue_pressure_line);

    svg.select(".m_value_line")
        .datum(m_value_data)
        .attr("d", m_value_line);

    svg.select(".gradient_factor_line")
        .datum(gradient_factor_data)
        .attr("d", gradient_factor_line);

    // svg.select(".dcs_area")
    //     .datum(m_value_data)
    //     .attr("d", dcs_area);

    // Adjust the maximum length of the tail (e.g., 10,000 data points)
    if (depth_data.length > MAX_POINTS) {
        depth_data.shift();
    }

}
