"use client"
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Grid } from "@mui/material";

interface DataPoint {
    value: number;
    label: string;
  }

const ChartComponent: React.FC = () => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<DataPoint[]>([
      { value: 30, label: "A" },
      { value: 13, label: "B" },
      { value: 40, label: "C" },
      { value: 6, label: "D" },
      { value: 25, label: "E" },
      { value: 30, label: "F" },
      { value: 20, label: "G" },
      { value: 5, label: "H" },
      { value: 15, label: "I" },
      { value: 25, label: "J" },
      { value: 11, label: "K" },
      { value: 20, label: "L" },
      { value: 33, label: "M" },
      { value: 15, label: "N" },
      { value: 25, label: "O" },
      { value: 14, label: "P" },
      { value: 20, label: "Q" },
      { value: 4, label: "R" },
      { value: 15, label: "S" },
      { value: 22, label: "T" },
      { value: 20, label: "U" },
      { value: 23, label: "V" },
      { value: 15, label: "W" },
      { value: 2, label: "X" },
      { value: 30, label: "Y" },
      { value: 20, label: "Z" },
    ]);
  
    const colors = ["orange", "red", "white", "green"];
    const [colorIndex, setColorIndex] = useState<number>(0);
  
  
    useEffect(() => {
      const width = chartContainerRef.current?.clientWidth || 250;
      const height = chartContainerRef.current?.clientHeight || 150;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
    
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, innerWidth])
        .padding(0.1);
    
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .range([innerHeight, 0]);
    
      const svg = d3
        .select(chartContainerRef.current)
        .selectAll("svg")
        .data([null])
        .enter()
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.label)!)
        .attr("y", (d) => yScale(Math.max(0, d.value)))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => Math.max(0, innerHeight - yScale(Math.max(0, d.value))))
        .attr("fill", () => colors[colorIndex]);
    
      svg
        .append("g")
        .attr("transform", `translate(0,${innerHeight + 6})`)
        .call(d3.axisBottom(xScale));
    
      const updateChart = () => {
        const newData = data.map((d) => ({
          ...d,
          value: Math.floor(Math.random() * 40) + 1,
        }));
    
        // Transition for color change
        const svg = d3.select(chartContainerRef.current).select("svg");
        svg
          .selectAll("rect")
          .data(newData)
          .transition()
          .duration(500)
          .delay((_, i) => i * 100)
          .attr("fill", () => colors[(colorIndex + 1) % colors.length])
          .attr("height", (d) => Math.max(0, innerHeight - yScale(Math.max(0, d.value))))
          .attr("y", (d) => yScale(Math.max(0, d.value))); 
        setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    
        setData(newData);
      };
    
      const intervalId = setInterval(updateChart, 3000);
    
      return () => clearInterval(intervalId);
    }, [data, colorIndex]);

  return <Grid item xs={12} sm={12} md={12} ref={chartContainerRef} style={{width:"100%"}} >

  </Grid>
};

export default ChartComponent;
