// Sample data for the bar chart
const data = [30, 70, 110, 150, 190];

// Create SVG container
const svg = d3.select("#chartContainer")
  .append("svg")
  .attr("width", 400)
  .attr("height", 200);

// Create bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 80)
  .attr("y", d => 200 - d)
  .attr("width", 75)
  .attr("height", d => d)
  .attr("fill", "steelblue")
  .on("mouseover", function() {
    d3.select(this).attr("fill", "orange");
  })
  .on("mouseout", function() {
    d3.select(this).attr("fill", "steelblue");
  });

// Add labels
svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(d => d)
  .attr("x", (d, i) => i * 80 + 35)
  .attr("y", d => 200 - d - 5)
  .attr("text-anchor", "middle")
  .attr("fill", "white");
