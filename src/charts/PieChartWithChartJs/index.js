// // "use client"
// import defaultData from "./data.json";
// // import * as d3 from "d3";
// import Chart from "chart.js/auto";
// // const defaultData = {
// //   data: [{
// //     "rank": 1,
// //     "name": "Wii Sports",
// //     "platform": "Wii",
// //     "year": 2006,
// //     "genre": "Sports",
// //     "publisher": "Nintendo",
// //     "na_sales": 41.49,
// //     "eu_sales": 29.02,
// //     "jp_sales": 3.77,
// //     "other_sales": 8.46,
// //     "global_sales": 82.74
// //   },
// //   {
// //     "rank": 2,
// //     "name": "Super Mario Bros.",
// //     "platform": "NES",
// //     "year": 1985,
// //     "genre": "Platform",
// //     "publisher": "Nintendo",
// //     "na_sales": 29.08,
// //     "eu_sales": 3.58,
// //     "jp_sales": 6.81,
// //     "other_sales": 0.77,
// //     "global_sales": 40.24
// //   },
// //   {
// //     "rank": 3,
// //     "name": "Mario Kart Wii",
// //     "platform": "Wii",
// //     "year": 2008,
// //     "genre": "Racing",
// //     "publisher": "Nintendo",
// //     "na_sales": 15.85,
// //     "eu_sales": 12.88,
// //     "jp_sales": 3.79,
// //     "other_sales": 3.31,
// //     "global_sales": 35.82
// //   },
// //   {
// //     "rank": 4,
// //     "name": "Wii Sports Resort",
// //     "platform": "Wii",
// //     "year": 2009,
// //     "genre": "Sports",
// //     "publisher": "Nintendo",
// //     "na_sales": 15.75,
// //     "eu_sales": 11.01,
// //     "jp_sales": 3.28,
// //     "other_sales": 2.96,
// //     "global_sales": 33
// //   },
// //   {
// //     "rank": 5,
// //     "name": "Pokemon Red/Pokemon Blue",
// //     "platform": "GB",
// //     "year": 1996,
// //     "genre": "Role-Playing",
// //     "publisher": "Nintendo",
// //     "na_sales": 11.27,
// //     "eu_sales": 8.89,
// //     "jp_sales": 10.22,
// //     "other_sales": 1,
// //     "global_sales": 31.37
// //   },
// //   {
// //     "rank": 6,
// //     "name": "Tetris",
// //     "platform": "GB",
// //     "year": 1989,
// //     "genre": "Puzzle",
// //     "publisher": "Nintendo",
// //     "na_sales": 23.2,
// //     "eu_sales": 2.26,
// //     "jp_sales": 4.22,
// //     "other_sales": 0.58,
// //     "global_sales": 30.26
// //   },
// //   {
// //     "rank": 7,
// //     "name": "New Super Mario Bros.",
// //     "platform": "DS",
// //     "year": 2006,
// //     "genre": "Platform",
// //     "publisher": "Nintendo",
// //     "na_sales": 11.38,
// //     "eu_sales": 9.23,
// //     "jp_sales": 6.5,
// //     "other_sales": 2.9,
// //     "global_sales": 30.01
// //   },
// //   {
// //     "rank": 8,
// //     "name": "Wii Play",
// //     "platform": "Wii",
// //     "year": 2006,
// //     "genre": "Misc",
// //     "publisher": "Nintendo",
// //     "na_sales": 14.03,
// //     "eu_sales": 9.2,
// //     "jp_sales": 2.93,
// //     "other_sales": 2.85,
// //     "global_sales": 29.02
// //   },
// //   {
// //     "rank": 9,
// //     "name": "New Super Mario Bros. Wii",
// //     "platform": "Wii",
// //     "year": 2009,
// //     "genre": "Platform",
// //     "publisher": "Nintendo",
// //     "na_sales": 14.59,
// //     "eu_sales": 7.06,
// //     "jp_sales": 4.7,
// //     "other_sales": 2.26,
// //     "global_sales": 28.62
// //   },
// //   {
// //     "rank": 10,
// //     "name": "Duck Hunt",
// //     "platform": "NES",
// //     "year": 1984,
// //     "genre": "Shooter",
// //     "publisher": "Nintendo",
// //     "na_sales": 26.93,
// //     "eu_sales": 0.63,
// //     "jp_sales": 0.28,
// //     "other_sales": 0.47,
// //     "global_sales": 28.31
// //   },
// //   {
// //     "rank": 11,
// //     "name": "Nintendogs",
// //     "platform": "DS",
// //     "year": 2005,
// //     "genre": "Simulation",
// //     "publisher": "Nintendo",
// //     "na_sales": 9.07,
// //     "eu_sales": 11,
// //     "jp_sales": 1.93,
// //     "other_sales": 2.75,
// //     "global_sales": 24.76
// //   },
// //   {
// //     "rank": 12,
// //     "name": "Mario Kart DS",
// //     "platform": "DS",
// //     "year": 2005,
// //     "genre": "Racing",
// //     "publisher": "Nintendo",
// //     "na_sales": 9.81,
// //     "eu_sales": 7.57,
// //     "jp_sales": 4.13,
// //     "other_sales": 1.92,
// //     "global_sales": 23.42
// //   },
// //   {
// //     "rank": 13,
// //     "name": "Pokemon Gold/Pokemon Silver",
// //     "platform": "GB",
// //     "year": 1999,
// //     "genre": "Role-Playing",
// //     "publisher": "Nintendo",
// //     "na_sales": 9,
// //     "eu_sales": 6.18,
// //     "jp_sales": 7.2,
// //     "other_sales": 0.71,
// //     "global_sales": 23.1
// //   },
// //   {
// //     "rank": 14,
// //     "name": "Wii Fit",
// //     "platform": "Wii",
// //     "year": 2007,
// //     "genre": "Sports",
// //     "publisher": "Nintendo",
// //     "na_sales": 8.94,
// //     "eu_sales": 8.03,
// //     "jp_sales": 3.6,
// //     "other_sales": 2.15,
// //     "global_sales": 22.72
// //   },
// //   {
// //     "rank": 15,
// //     "name": "Wii Fit Plus",
// //     "platform": "Wii",
// //     "year": 2009,
// //     "genre": "Sports",
// //     "publisher": "Nintendo",
// //     "na_sales": 9.09,
// //     "eu_sales": 8.59,
// //     "jp_sales": 2.53,
// //     "other_sales": 1.79,
// //     "global_sales": 22
// //   }]};

// const defaultStyle = {
//   chartContainer: {
//     width: 500,
//     height: 500,
//   },
//   backgroundImage: {
//     url: "",
//   },
//   axisLabels: {
//     x: {
//       view: true,
//       text: "Days",
//       fill: "#333333",
//       fontSize: "14px",
//       tickLabelOrientation: "rotate(0)",
//       textAnchor: "middle",
//       fontFamily: "Arial",
//       tickLabelFontSize: "12px",
//       tickLabelFontFamily: "Arial",
//       tickLabelColor: "#000000",
//       axisLineColor: "#333333",
//       axisTickColor: "#000000",
//     },
//     y: {
//       view: true,
//       text: "Values",
//       fill: "#333333",
//       fontSize: "14px",
//       transform: "rotate(-90)",
//       textAnchor: "middle",
//       fontFamily: "Arial",
//       tickLabelColor: "#000000",
//       tickLabelFontSize: "12px",
//       tickLabelFontFamily: "Arial",
//       axisLineColor: "#333333",
//       axisTickColor: "#000000",
//     },
//   },
//   chartTitle: {
//     view: true,
//     text: "Area Chart title",
//     fill: "#333333",
//     fontSize: "16px",
//     marginTop: -30,
//     fontFamily: "Arial",
//     fontWeight: "bold",
//   },
//   margin: {
//     top: 50,
//     right: 100,
//     bottom: 60,
//     left: 120,
//   },
//   chartColor: {
//     area: { fill: "#fa5102" },
//     backgroundColor: "#ffffff",
//     line: { fill: "#ffc926", strokeColor: "#fa5102", strokeWidth: "2px" },
//   },
//   tooltip: {
//     fontSize: "12px",
//     visibility: "visible",
//     visibilityOnMouseOut: "hidden",
//     pointerEvents: "none",
//     opacity: 0.9,
//     mouseOutDuration: 2000,
//     mouseOutOpacity: 0,
//     zIndex: 100,
//     boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
//     transition:
//       "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
//     padding: "10px",
//     position: "absolute",
//     display: "block",
//     borderStyle: "solid",
//     whiteSpace: "nowrap",
//     tooltipContainer: {
//       borderWidth: "1px",
//       borderColor: "#000000",
//       borderRadius: "4px",
//       fontSize: "14px",
//       fontFamily: "Arial",
//       fill: "#ffffff",
//       strokeColor: "#000000",
//     },
//   },
//   gridLine: {
//     view: true,
//     color: "#c7d2da",
//     opacity: 0.7,
//     strokeWidth: 0,
//   },
//   legend: {
//     position: "right",
//     fontFamily: "Arial",
//     color: "#333",
//     fontWeight: "normal",
//   },
//   brush: {
//     fill: "#666",
//     fillOpacity: 0.8,
//     stroke: "#000",
//     strokeWidth: 1,
//     cursor: "ew-resize",
//   },

// };

// // Check if data is numeric

// const colors = [
//   "#fa5102",
//   "#4300FF",
//   "#C745FF",
//   "#01C5FF",
//   "#00FFBD",
//   "#E5F306",
//   "#FED700",
//   "#FF082B",
//   "#00FF28",
// ];


// let chart;
// export function DrawPieChart(options,propsData, styles) {
//   const xKey =
//   Array.isArray(propsData) &&
//   propsData?.length > 0 &&
//   Object.keys(propsData[0])[0];
// const yKeys =
//   Array.isArray(propsData) &&
//   propsData?.length > 0 &&
//   Object.keys(propsData[0]).slice(1);
//   const labels =  (Array.isArray(propsData) &&
//   propsData?.length > 0 &&
//   propsData.some((item) => item[xKey] !== undefined) &&
//   propsData.map((item) => item[xKey])) ||
//   defaultData?.data?.map((e) => e?.genre);
//   const datasets = (yKeys && yKeys.length > 0 && propsData && propsData.length > 0)
//   ? yKeys.map((yKey, index) => ({
//       label: yKey,
//       data: propsData.map(item => item[yKey]),
//       fill: true,
//       backgroundColor: colors[index % colors.length] + '80', // add opacity to color
//       borderColor: colors[index % colors.length],
//     }))
//   : [{
//       label: "na_sales",
//       data: defaultData.data.map(item => item.na_sales),
//       fill: true,
//       backgroundColor: colors[0] + '80', // add opacity to color
//       borderColor: colors[0],
//     }];
//   const data = {
//     labels: labels,
//     datasets: datasets,
//   };

//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };
//     if (chart) {
//     chart.destroy();
//   }

//   const canvas = document.getElementById(options.id);
//   const ctx = canvas?.getContext('2d');
//    chart = new Chart(ctx, config);

//   return chart;
// }
// // const opacity={
// //   id: "area-chart",
// //   yAxis: {
// //     title: {
// //       value: 'NA Sales',
// //       value1: 'EU Sales'
// //     }
// //   }
// // }
// // DrawPieChart(opacity)


/* eslint-disable no-undef */
'use client'
import * as d3 from "d3";
import defaultData from "./data.json";

export function DrawPieChart(options, propsData, styles) {
const initialData=defaultData.data.map((item)=>{
  return {
    genre:item.genre,
    na_sales:item.na_sales,
    hidden:false
  }
})

  const defaultStyle = {
    chartContainer: {
      width: 900,
      height: 500,
    },
    backgroundImage: {
      url: "",
    },
    margin: {
      top: 40,
      right: 50,
      bottom: 60,
      left: 70,
    },
    charts: { opacity: 0.9, visibility: "visible" },
    line: { fill: "none" },
    tooltip: {
      zIndex: "999",
      transition:
        "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
      fontFamily: "Arial",
      fontSize: "14px",
      fill: "gray",
      textColor: "#000000",
      bgColor: "#ffffff",
      borderRadius: "5px",
      borderColor: "#000000",
      borderWidth: "1px",
      padding: "10px",
      pointerEvents: "none",
      visibility: "hidden",
      opacity: "0",
      top: "0px",
      left: "0px",
    },
    legend: { fontFamily: "Arial", textColor: "#333", placement: "left" },
    pieLabel: {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#000000",
      rotation: 0,
    },
    container: { opacity: 0.8, visibility: "hidden" },
    rect: {
      fontFamily: "Arial",
      color: "#A9A9A9",
      fontSize: "14px",
      rectSize: 18,
    },
    text: { textAnchor: "middle", color: "#A9A9A9", rectSpace: 6 },
    chartColor: { backgroundColor: "#ffffff" },
    chartTitle: {
      view: true,
      value: "Pie Chart Title",
      color: "#333333",
      fontSize: "20px",
      marginTop: 3,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    color: {
      schemas: {
        schema1: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
        schema2: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        schema3: ["#c6e48b", "#7bc96f", "#249a3c", "#196127", "#003820"],
      },
      theme: "schema3",
    },
    chart: {
      type: "pie",
    },
  };

  const xKey =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0])[0]||'genre';

  const yKeys =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0])
      .slice(1)
      .filter((key) => key !== "hidden")||["na_sales"];

  const arcsData =
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      propsData?.filter((item) => !item.hidden)?.map((item) => item)) ||
    defaultData?.data?.map((e) => e);

  const categories = Array.isArray(propsData) && propsData.length > 0
    ? propsData
      .filter(e => e[xKey] !== undefined)
      .map(e => ({
        [xKey]: e[xKey],
        hidden: e.hidden !== undefined ? e.hidden : false,
      }))
      .map(item => item[xKey])
    : defaultData?.data
      .filter(e => e?.genre !== undefined)
      .map(e => ({
        name: e?.genre,
        hidden: e.hidden !== undefined ? e.hidden : false,
      }))
      .map(item => item.name);
  // console.log("default data", defaultData);
  const uniqueCategories = [...new Set(categories)];
  // console.log("unique categories", uniqueCategories);
  const fontSizeTitle =
    styles?.chartTitle?.fontSize?.value || defaultStyle?.chartTitle?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultStyle?.chartTitle?.fontSize;
  const extraMarginTop =
    styles?.chartTitle?.view?.value !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : 0;

  function dragStarted() {
    d3.select(this).raise().classed("active", true);
  }
  function dragged(event, d) {
    d3.select(this).attr("x", event.x).attr("y", event.y);
  }
  function dragEnded() {
    d3.select(this).classed("active", false);
  }
  //svg container
  const width =
    styles?.chartContainer?.width?.value || defaultStyle?.chartContainer?.width;
  const height =
    styles?.chartContainer?.height?.value ||
    defaultStyle?.chartContainer?.height;
  const { top, right, bottom, left } = defaultStyle.margin;

  // Calculate the effective width and height for the pie chart
  const effectiveWidth = width;
  const effectiveHeight = height - top - bottom;

  const radius = Math.min(effectiveWidth, effectiveHeight) / 2;

  d3.select(`#${options.id}`).selectAll("svg").remove();
  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", effectiveWidth)
    .attr("height", height + 30)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value || defaultStyle?.chartColor
    )
    .style(
      "background-image",
      `url(${styles?.chartContainer?.backgroundImage?.value?.url ||
      defaultStyle?.backgroundImage?.url
      })`
    )
    .style("background-size", "cover")
    .style("background-position", "center")
    .style("background-repeat", "no-repeat")
    .append("g")
    .style("overflow", defaultStyle.charts.visibility)
    .attr(
      "transform",
      "translate(" +
      effectiveWidth / 2 +
      "," +
      (top + effectiveHeight / 2 + 50) +
      ")"
    );

  const color = d3
    .scaleOrdinal()
    .domain(categories)
    .range(d3.schemeCategory10);

  const pie = d3.pie().value(function (d) {
    return d?.value;
  });

  const chartType = styles?.chart?.type?.value || defaultStyle?.chart?.type;
  let innerRadius, outerRadius;
  if (chartType == "donut") {
    innerRadius = 28 * 6;
    outerRadius = radius - 110;
  } else {
    innerRadius = 0;
    outerRadius = radius - 60;
  }

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  let tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("display", "block")
    .style("border-style", "solid")
    .style("white-space", "nowrap")
    .style("z-index", defaultStyle.tooltip.zIndex)
    .style(
      "transition",
      styles?.tooltip?.transition?.value || defaultStyle?.tooltip?.transition
    )
    .style(
      "background-color",
      styles?.tooltip?.bgColor?.value || defaultStyle?.tooltip?.bgColor
    )
    .style(
      "border-width",
      styles?.tooltip?.borderWidth?.value || defaultStyle?.tooltip?.borderWidth
    )
    .style(
      "border-radius",
      styles?.tooltip?.borderRadius?.value ||
      defaultStyle?.tooltip?.borderRadius
    )
    .style(
      "color",
      styles?.tooltip?.textColor?.value || defaultStyle?.tooltip?.textColor
    )
    .style(
      "padding",
      styles?.tooltip?.padding?.value || defaultStyle?.tooltip?.padding
    )
    .style("top", defaultStyle?.tooltip?.top)
    .style("left", defaultStyle?.tooltip?.left)
    .style(
      "border-color",
      styles?.tooltip?.borderColor?.value || defaultStyle?.tooltip?.borderColor
    )
    .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
    .style("visibility", "hidden")
    .style("opacity", defaultStyle?.tooltip?.opacity)
    // .attr("class", "tooltip")
    .style(
      "font-family",
      styles?.tooltip?.fontFamily?.value || defaultStyle?.tooltip?.fontFamily
    )
    .style(
      "font-size",
      styles?.tooltip?.fontSize?.value || defaultStyle?.tooltip?.fontSize
    )
    .style("fill", defaultStyle?.tooltip?.fill);

  //pie arcs data

  const arcs = svg
    .selectAll("arc")
    .data(
      pie(arcsData?.map((arcData) => ({
        name: arcData[xKey],
        value: arcData[yKeys[0]],
      }))
      )
      )
    .enter()
    .append("g")
    .attr("class", "arc")
    .on("mouseover", function (event, d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", defaultStyle?.charts?.opacity)
        .style("visibility", defaultStyle?.charts?.visibility);
      tooltip
        .html(
          `
         <div ><span>
         ${d.data.name}</span> : <strong>${d.data.value}</strong> </div> `
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (event, d) {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", defaultStyle?.container?.opacity)
        .style("visibility", defaultStyle?.container?.visibility);
    });
  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.name);
    })
    .on("mouseover", function (event, d) {
      d3.select(this)
        .style("filter", "drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.3))")
        .style("transform", "translate3d(-2px, -1px, 0px)")
        .transition()
        .duration(200)
        .attr("fill", d3.rgb(color(d.data.name)).brighter(0.5));
    })
    .on("mouseout", function (event, d) {
      d3.select(this)
        .style("filter", "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.3))")
        .style("transform", "translate3d(0px, 0px, 0px)")
        .transition()
        .duration(200)
        .attr("fill", color(d.data.name));
      svg.select(".category-label").remove();
    })
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .attrTween("d", function (d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });
  arcs
    .append("path")
    .attr("stroke", function (d) {
      return color(d.data.name);
    })
    .attr("fill", defaultStyle?.line?.fill)
    .attr("d", function (d) {
      const pos = arc.centroid(d);
      const midangle = Math.atan2(pos[1], pos[0]);
      const startX = Math.cos(midangle) * (radius - 60);
      const startY = Math.sin(midangle) * (radius - 60);
      const turnX = Math.cos(midangle) * (radius - 60);
      const turnY = Math.sin(midangle) * (radius - 40);
      const endX = Math.cos(midangle) * (radius - 40);
      const endY = Math.sin(midangle) * (radius - 40);
      return `M${startX},${startY} L${turnX},${turnY} L${endX},${endY}`;
    });
  arcs
    .append("text")
    .attr("transform", function (d) {
      const pos = arc.centroid(d);
      const midangle = Math.atan2(pos[1], pos[0]);
      const x = Math.cos(midangle) * (radius - 30);
      const y = Math.sin(midangle) * (radius - 30);
      const rotateAngle =
        (midangle * styles?.pieLabel?.rotation?.value ||
          defaultStyle?.pieLabel?.rotation) / Math.PI;
      return "translate(" + x + "," + y + ") rotate(" + rotateAngle + ")";
    })
    .attr("dy", "0.35em")
    .style(
      "font-family",
      styles?.pieLabel?.fontFamily?.value || defaultStyle?.pieLabel?.fontFamily
    )
    .style(
      "font-size",
      styles?.pieLabel?.fontSize?.value || defaultStyle?.pieLabel?.fontSize
    )
    .style(
      "fill",
      styles?.pieLabel?.color?.value || defaultStyle?.pieLabel?.color
    )
    .style("text-anchor", function (d) {
      const pos = arc.centroid(d);
      return Math.abs(Math.atan2(pos[1], pos[0])) > Math.PI / 2
        ? "end"
        : "start";
    })
    .text(function (d) {
      return d.data.name;
    });
  const legendX = 100;
  const legendY = 50;
  const marginLeftTop = -290;
  const legend = svg.append("g").attr("class", "legend");
  function setLegendPosition(position) {
    let translateX = 0;
    let translateY = 0;
    switch (position) {
      case "top":
        translateY = -height / 2 + 20;
        translateX = marginLeftTop;
        break;
      case "right":
        translateX = width / 2 - 310;
        translateY = -230;
        break;
      case "bottom":
        translateY = height / 2 - 10;
        break;
      case "left":
        translateX = -width / 2 + 10;
        translateY = -199;
        break;
      default:
        break;
    }
    // Update legend position
    legend.attr("transform", `translate(${translateX},${translateY})`);
  }
  function renderLegendItems(items) {
    const legendRectSize =
      styles?.legend?.rectSize?.value || defaultStyle?.rect?.rectSize;
    const legendSpacing = defaultStyle?.text?.rectSpace;
    const legendItems = legend
      .selectAll(".legend-item")
      .data(
        pie(
          result.map((result) => ({
            name: result,
            // index: result.index,
          }))
        )
      )
      .enter()
      .append("g")
      .attr("opacity", function (d) {
        const correspondingData =
          categories
            ?.find((item) => item === d.data);
        return correspondingData ? 0.5 : 1;
      })
      .attr("class", "legend-item")
      .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)");

    legendItems
      .append("rect")
      .attr("x", -232)
      .attr("y", -10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function (d, i) {
        return color(d);
      })
      .on("click", function (event, d) {
        toggleLegend(d);
      });
    legendItems
      .append("text")
      .style("margin", "5px")
      .attr("x", -221)
      .attr("y", 1)
      .style(
        "font-family",
        styles?.legend?.fontFamily?.value || defaultStyle?.legend?.fontFamily
      )
      .attr("font-size", "13px")
      .text(function (d) {
        return d.data.name;
      })
      .on("click", function (event, d) {
        toggleLegend(d);
      });
  }
  // Example usage
  setLegendPosition(
    styles?.legend?.placement?.value || defaultStyle?.legend?.placement
  );
  if (styles?.legend?.placement?.value === "top") {
    renderLegendItems(categories.map((item) => item));
  }
  const legendRectSize =
    styles?.legend?.rectSize?.value || defaultStyle?.rect?.rectSize;
  const legendSpacing = defaultStyle?.text?.rectSpace;

  const legendItems = legend
    .selectAll(".legend-item")
    .data(pie(uniqueCategories))
    .enter()
    .append("g")
    .attr("opacity", function (d) {
      // Check if the category is in uniqueCategories
      const isInUniqueCategories = uniqueCategories.includes(d.data);

      // Check if propsData is an array
      if (Array.isArray(propsData)) {
        // Check if the corresponding data is found in arcsData
        const correspondingData = propsData.find(
          (item) => item[xKey] === d?.data
        );

        // Set opacity based on conditions
        return !isInUniqueCategories ||
          (correspondingData && correspondingData.hidden)
          ? 0.5
          : 1;
      } else {

        return 1; // Set a default opacity value
      }
    })

    .attr("class", "legend-item")
    .attr("transform", function (d, i) {
      const totalLegends = uniqueCategories.length;
      const numberOfColumns = calculateNumberOfColumns(totalLegends);

      if (uniqueCategories.length < 35) {
        // If there are less than 35 legends, apply this transform
        const w = 55; // width of each entry (so you can position the next row)
        const h = 20; // height of each entry
        const tx = 10; // tx/ty are essentially margin values
        const ty = 10;
        const marginLeft = 60; // Set your desired left margin value
        const x = (i % numberOfColumns) * w + tx + marginLeft;
        const y = Math.floor(i / numberOfColumns) * h + ty;
        return "translate(" + x + "," + y + ")";
      } else {
        // If there are 35 or more legends, apply the position function
        return position(d, i, numberOfColumns);
      }
    });

  function position(d, i, numberOfColumns) {
    const h = 20; // height of each entry
    const w = 55; // width of each entry (so you can position the next row)
    const tx = 10; // tx/ty are essentially margin values
    const ty = 10;
    const marginLeft = -22; // Set your desired left margin value
    const x = (i % numberOfColumns) * w + tx + marginLeft;
    const y = Math.floor(i / numberOfColumns) * h + ty;
    return "translate(" + x + "," + y + ")";
  }

  function calculateNumberOfColumns(totalLegends) {
    const legendRectSize =
      styles?.legend?.rectSize?.value || defaultStyle?.rect?.rectSize;
    const legendSpacing = defaultStyle?.text?.rectSpace;
    const availableWidth =
      styles?.chartContainer?.width?.value ||
      defaultStyle?.chartContainer?.width; // Use your chart's available width

    // Calculate the number of columns based on the total number of legends
    return Math.max(
      1,
      Math.ceil(
        totalLegends / Math.floor(availableWidth / (55 + legendSpacing))
      )
    );
  }

  legendItems
    .append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .attr("fill", function (d, i) {
      return color(d.data);
    })
    .on("click", function (event, d) {
      toggleLegend(d);
    });
  legendItems
    .append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .style(
      "font-family",
      styles?.legend?.fontFamily?.value || defaultStyle?.legend?.fontFamily
    )
    .style(
      "text-color",
      styles?.legend?.textColor?.value || defaultStyle?.legend?.textColor
    )
    .text(function (d) {
      return d.data;
    })
    .on("click", function (event, d) {
      toggleLegend(d);
    });
  function toggleLegend(d) {
    console.log(d,'d')
    // Get the current visibility state of the selected arc
    const selectedArc = svg.select(`.arc path[fill="${color(d.data)}"]`);
    if (!selectedArc.empty()) {
      const newData = (propsData ||initialData || [])?.map((item) => ({
        ...item,
        hidden: item[xKey]=== d.data ? !item.hidden : item.hidden,
      }));

      // Remove the existing SVG
      d3.select(`#${options.id}`).selectAll("svg").remove();
      // Redraw the chart with the updated data only if propsData is not undefined
      if (categories || newData || []) {
        DrawPieChart(options, newData, styles);
      }
      console.log(newData,categories,'newData')
    } else {
      const newData = (propsData || initialData  || [])?.map((item) => ({
        ...item,
        hidden: item[xKey] === d.data ? !item.hidden : item.hidden,
      }));
      // Remove the existing SVG
      d3.select(`#${options.id}`).selectAll("svg").remove();
      // Redraw the chart with the updated data only if propsData is not undefined
      if (categories || newData || []) {
        DrawPieChart(options, newData, styles);
      }
    }
  }
  if (
    styles?.chartTitle?.view?.value !== false &&
    defaultStyle?.chartTitle?.view
  ) {
    // Create a drag behavior
    svg
      .append("text")
      .attr("x", width / 100)
      // .attr("y", defaultStyle?.chartTitle?.marginTop)
      .attr("dy", -height / 2)
      .attr("text-anchor", "middle")
      .style(
        "view",
        styles?.chartTitle?.view?.value || defaultStyle?.chartTitle?.view
      )
      .style(
        "font-size",
        styles?.chartTitle?.fontSize?.value ||
        defaultStyle?.chartTitle?.fontSize
      )
      .style(
        "font-family",
        styles?.chartTitle?.fontFamily?.value ||
        defaultStyle?.chartTitle?.fontFamily
      )
      .style(
        "fill",
        styles?.chartTitle?.color?.value || defaultStyle?.chartTitle?.color
      )
      .style(
        "font-weight",
        styles?.chartTitle?.fontWeight?.value ||
        defaultStyle?.chartTitle?.fontWeight
      )
      .text(styles?.chartTitle?.value?.value || defaultStyle?.chartTitle?.value)
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );
  }

}

// DrawPieChart("chart-container");