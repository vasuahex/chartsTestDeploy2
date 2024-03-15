"use client"
import * as d3 from "d3"


// Read data from data.js
var data = [2, 1.2, 2.4, 3.6];

// Set up the SVG container
var width = window.innerWidth;
var height = window.innerHeight;
var svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create a radial scale
var radiusScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height / 2]);

// Create bars
var bars = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    var angle = (i / data.length) * 2 * Math.PI;
    return radiusScale(d) * Math.sin(angle);
  })
  .attr("y", function (d, i) {
    var angle = (i / data.length) * 2 * Math.PI;
    return -radiusScale(d) * Math.cos(angle);
  })
  .attr("width", 20) // Adjust the width as needed
  .attr("height", function (d) {
    return radiusScale(d);
  })
  .attr("fill", "steelblue"); // Adjust the color as needed
