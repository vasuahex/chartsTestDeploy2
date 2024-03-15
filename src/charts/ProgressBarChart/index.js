"use client"
import * as d3 from "d3"


document.addEventListener('DOMContentLoaded', function () {
    const svg = d3.select('.progress-container')
        .append('svg')
        .attr('height', 100)
        .attr('width', 500);

    const staticData = [
        { label: 'Category 1', value: 20 },
        { label: 'Category 2', value: 40 },
        { label: 'Category 3', value: 60 },
        { label: 'Category 4', value: 80 },
        { label: 'Category 5', value: 100 },
    ];

    const segmentWidth = 100;

    svg.selectAll('rect.bg-rect')
        .data(staticData)
        .enter()
        .append('rect')
        .attr('class', 'bg-rect')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', 'gray')
        .attr('height', 15)
        .attr('width', (d, i) => (i + 1) * segmentWidth)
        .attr('x', 0);

    const progress = svg.append('rect')
        .attr('class', 'progress-rect')
        .attr('fill', 'green')
        .attr('height', 15)
        .attr('width', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('x', 0);

    progress.transition()
        .duration(1000)
        .attr('width', (staticData.length) * segmentWidth);
});
