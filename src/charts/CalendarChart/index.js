// "use client"
// import * as d3 from "d3"


// // const defaultData = Array.from({ length: 31 }, (_, i) => ({
// //   value: i + 1,
// //   day: "Tue",
// //   month: "Jan",
// // }));

// // const userData = [
// //   { value: 820, day: "Mon", month: "Jan", icon: "icon1" },
// //   { value: 932, day: "Tue", month: "Jan", icon: "icon2" },
// //   // ... add more data entries as needed
// // ];

// // // Map of icons based on user data
// // const icons = {
// //   icon1: "M10 10 L50 10 L50 50 L10 50 Z",
// //   icon2: "M5 25 L25 5 L45 25 L25 45 Z",
// //   // ... add more icons as needed
// // };

// // // Combine default data with user data
// // const combinedData = defaultData.map((d) => {
// //   const userDataEntry = userData.find(
// //     (u) => u.day === d.day && u.month === d.month
// //   );
// //   return { ...d, ...userDataEntry };
// // });
// // // Assigning different icons for cells containing multiples of 3
// // defaultData.forEach((data, index) => {
// //   if ((index + 1) % 3 === 0) {
// //     data.icon = index % 2 === 0 ? "icon1" : "icon2";
// //   }
// // });



// // // Static data
// // const layouts = [
// //   [[0, 0]],
// //   [
// //     [-0.25, 0],
// //     [0.25, 0],
// //   ],
// //   [
// //     [0, -0.2],
// //     [-0.2, 0.2],
// //     [0.2, 0.2],
// //   ],
// //   [
// //     [-0.25, -0.25],
// //     [-0.25, 0.25],
// //     [0.25, -0.25],
// //     [0.25, 0.25],
// //   ],
// // ];

// // const pathes = [
// //   "M10 10 L50 10 L50 50 L10 50 Z", // Your path data for icon 1
// //   "M5 25 L25 5 L45 25 L25 45 Z", // Your path data for icon 2
// //   "M0 0 L50 0 L50 50 L0 50 Z", // Your path data for icon 3
// //   "M10 10 L20 10 L20 20 L10 20 Z", // Your path data for icon 4
// // ];

// // // Add a row for day labels
// // const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // const colors = ["#c4332b", "#16B644", "#6862FD", "#FDC763"];

// // export function DrawCalendarChart(calendarChartId, propsData, styles) {
// //   const mergedStyles = styles || defaultStyle;

// //   d3.select(`#${calendarChartId}`).selectAll("svg").remove();
// //   // Set up SVG container
// //   const svg = d3
// //     .select(`#${calendarChartId}`)
// //     .append("svg")
// //     .attr("width", +mergedStyles?.chartContainer?.width)
// //     .attr("height", +mergedStyles?.chartContainer?.height);

// //   // Set up calendar layout
// //   const cellSize = +mergedStyles.cellSize || defaultStyle.cellSize;
// //   const yearLabelHeight =
// //     +mergedStyles.yearLabelHeight || defaultStyle.yearLabelHeight;

// //   // Add day labels on top of each column
// //   const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// //   svg
// //     .selectAll(".dayLabel")
// //     .data(dayLabels)
// //     .enter()
// //     .append("text")
// //     .text((d) => d)
// //     .attr("x", (d, i) => (i + 0.5) * cellSize) // Centering the label
// //     .attr("y", yearLabelHeight - 10)
// //     .attr("text-anchor", "middle")
// //     .style("font-weight", "bold");

// //   // Create calendar cells
// //   const cells = svg
// //     .selectAll(".cell")
// //     .data(combinedData)
// //     .enter()
// //     .append("g")
// //     .attr("class", "cell")
// //     .attr("transform", (d, i) => {
// //       const col = i % 7;
// //       const row = Math.floor(i / 7);
// //       const x = col * cellSize || 0;
// //       const y = yearLabelHeight + row * cellSize || 0;
// //       return `translate(${x},${y})`;
// //     });

// //   // Append custom icons to selected cells
// //   cells
// //     .filter((d) => d.icon)
// //     .append("path")
// //     .attr("d", (d) => icons[d.icon])
// //     .attr("transform", `translate(${cellSize / 2},${cellSize / 2})`)
// //     .attr("fill", "white");

// //   // Add day labels inside each cell
// //   cells
// //     .append("text")
// //     .attr("x", cellSize / 2)
// //     .attr("y", cellSize / 2 + 10) // Adjusted y-coordinate
// //     .attr("dy", ".35em")
// //     .attr("text-anchor", "middle")
// //     .text((d) => d.value);

// //   // Adding the tooltip
// //   const tooltip = d3
// //     .select(`#${calendarChartId}`)
// //     .append("div")
// //     .attr("class", "tooltip") // Add a class for easy styling
// //     .style("position", defaultStyle?.tooltip?.position)
// //     .style("display", defaultStyle?.tooltip?.display)
// //     .style("border-style", defaultStyle?.tooltip?.borderStyle)
// //     .style("white-space", defaultStyle?.tooltip?.whiteSpace)
// //     .style("z-index", defaultStyle?.tooltip?.zIndex)
// //     .style("box-shadow", defaultStyle?.tooltip?.boxShadow)
// //     .style("transition", defaultStyle?.tooltip?.transition)
// //     .style(
// //       "background-color",
// //       styles?.tooltip?.tooltipContainer?.fill ||
// //         defaultStyle?.tooltip?.tooltipContainer?.fill
// //     )
// //     .style("border-width", defaultStyle?.tooltip?.tooltipContainer?.borderWidth)
// //     .style(
// //       "border-radius",
// //       defaultStyle?.tooltip?.tooltipContainer?.borderRadius
// //     )
// //     .style("padding", defaultStyle?.tooltip?.padding)
// //     .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
// //     .style("visibility", "hidden") // Initially set to hidden
// //     .style("opacity", 0); // Initially set to invisible

// //   // Mousemove for updating tooltip position
// //   svg.on("mousemove", function (event) {
// //     // Update tooltip position based on mousemove
// //     tooltip.style("left", event.pageX + "px").style("top", event.pageY + "px");
// //   });

// //   // Hover effect for cells
// //   cells
// //     .on("mouseover", function (event, d) {
// //       const xPos = parseFloat(
// //         d3.select(this).attr("transform").split("(")[1].split(",")[0]
// //       );
// //       const yPos = parseFloat(
// //         d3.select(this).attr("transform").split(",")[1].split(")")[0]
// //       );

// //       // Calculate the center of the cell
// //       const cellCenterX = xPos + cellSize / 2;
// //       const cellCenterY = yPos + cellSize / 2;

// //       // Show tooltip
// //       tooltip
// //         .style("left", event.pageX + "px")
// //         .style("top", event.pageY + "px")
// //         .style("visibility", defaultStyle?.tooltip?.visibility)
// //         .style("opacity", defaultStyle?.tooltip?.opacity);

// //       // Update tooltip text
// //       tooltip.html(
// //         `<div>
// //        <div  style="font-size: ${
// //          styles?.tooltip?.fontSize ||
// //          defaultStyle?.tooltip?.tooltipContainer?.fontSize
// //        };
// //        color: ${
// //          styles?.tooltip?.fill ||
// //          defaultStyle?.tooltip?.tooltipContainer?.strokeColor
// //        }; ">
// //          ${d.day} : ${d.value}
// //        </div>
// //      </div>`
// //       );
// //     })
// //     .on("mouseout", function () {
// //       // Hide tooltip on mouseout
// //       tooltip.style("opacity", 0);
// //     });

// //   // Chart Title
// //   if (
// //     styles?.chartTitle?.view !== false &&
// //     defaultStyle?.chartTitle?.view !== false
// //   ) {
// //     // Add chart title
// //     if (mergedStyles?.chartTitle?.view) {
// //       svg
// //         .append("text")
// //         .attr("x", mergedStyles.chartContainer.width / 2)
// //         .attr("y", -extraMarginTop / 2)
// //         .attr("text-anchor", "middle")
// //         .style("font-size", mergedStyles.chartTitle.fontSize)
// //         .style("fill", mergedStyles.chartTitle.fill)
// //         .text(mergedStyles.chartTitle.text);
// //     }
// //   }
// // }

// const defaultStyle = {
//   chartContainer: {
//     width: 500,
//     height: 400,
//   },
//   cellSize: 70,
//   cellPadding: 5,
//   yearLabelHeight: 20,
//   axisLabels: {
//     x: {
//       view: false,
//       text: "X Axis Label",
//       fill: "#333",
//       fontSize: "14px",
//       tickLabelOrientation: "rotate(0)",
//       textAnchor: "middle",
//     },
//     y: {
//       view: false,
//       text: "Y Axis Label",
//       fill: "#333",
//       fontSize: "14px",
//       transform: "rotate(-90)",
//       textAnchor: "middle",
//     },
//   },
//   chartTitle: {
//     view: true,
//     text: "Calendar Chart Title",
//     fill: "#333",
//     fontSize: "18px",
//     marginTop: -30,
//   },
//   margin: {
//     top: 50,
//     right: 50,
//     bottom: 60,
//     left: 70,
//   },
//   chartColor: { fill: "steelblue", radius: 10 },
//   tooltip: {
//     fontSize: "12px",
//     visibility: "visible",
//     visibilityOnMouseOut: "hidden",
//     pointerEvents: "none",
//     opacity: 0.9,
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
//       borderRadius: "4px",
//       fontSize: "14px",
//       fill: "#ffffff",
//       strokeColor: "#000",
//     },
//   },
// };

// // Static data
// const layouts = [
//   [[0, 0]],
//   [
//     [-0.25, 0],
//     [0.25, 0],
//   ],
//   [
//     [0, -0.2],
//     [-0.2, 0.2],
//     [0.2, 0.2],
//   ],
//   [
//     [-0.25, -0.25],
//     [-0.25, 0.25],
//     [0.25, -0.25],
//     [0.25, 0.25],
//   ],
// ];

// const pathes = [
//   "M10 10 L50 10 L50 50 L10 50 Z", // Your path data for icon 1
//   "M5 25 L25 5 L45 25 L25 45 Z", // Your path data for icon 2
//   "M0 0 L50 0 L50 50 L0 50 Z", // Your path data for icon 3
//   "M10 10 L20 10 L20 20 L10 20 Z", // Your path data for icon 4
// ];

// const colors = ["#c4332b", "#16B644", "#6862FD", "#FDC763"];

// const defaultData = Array.from({ length: 31 }, (_, i) => ({
//   value: i + 1,
//   day: "Mon",
//   month: "Jan",
// }));

// // Assigning different icons for cells containing multiples of 3
// defaultData.forEach((data, index) => {
//   if ((index + 1) % 3 === 0) {
//     data.icon = index % 2 === 0 ? "icon1" : "icon2";
//   }
// });

// const icons = {
//   Mon: "M10 10 L50 10 L50 50 L10 50 Z", // Custom path data for Mon
//   Tue: "M5 25 L25 5 L45 25 L25 45 Z", // Custom path data for Tue
//   Wed: "M0 0 L50 0 L50 50 L0 50 Z", // Custom path data for Wed
//   Thu: "M10 10 L20 10 L20 20 L10 20 Z", // Custom path data for Thu
//   Fri: "M20 20 L30 20 L30 30 L20 30 Z", // Custom path data for Fri
//   Sat: "M0 30 L20 0 L40 30 Z", // Custom path data for Sat
//   Sun: "M10 10 L30 10 L30 30 L10 30 Z", // Custom path data for Sun
//   icon1: "M5 0 L10 10 L0 10 Z", // Custom path data for icon1
//   icon2: "M0 5 L10 5 L5 15 Z", // Custom path data for icon2
// };

// export function DrawCalendarChart(calendarChartId, propsData, styles) {
//   const mergedStyles = styles || defaultStyle;

//   // Extract chart dimensions and margins from styles or use default values
//   const { width, height } =
//     styles?.chartContainer || defaultStyle.chartContainer;
//   const { top, right, bottom, left } = defaultStyle.margin;

//   // Calculate font size changes
//   const fontSizeTitleChanged =
//     +mergedStyles?.chartTitle?.fontSize?.replace("px", "") !==
//     +defaultStyle?.chartTitle?.fontSize?.replace("px", "");

//   // Calculate additional margin based on font size changes
//   const extraMarginTop =
//     mergedStyles?.chartTitle?.view !== false && fontSizeTitleChanged
//       ? parseFloat(mergedStyles?.chartTitle?.fontSize) * 1.5
//       : parseFloat(mergedStyles?.chartTitle?.fontSize);
//   const adjustedTop = top + extraMarginTop;
//   const cellSize = 50;

//   d3.select(`#${calendarChartId}`).selectAll("svg").remove();

//   const svg = d3
//     .select(`#${calendarChartId}`)
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height + adjustedTop)
//     .append("g")
//     .attr("transform", `translate(0, ${adjustedTop})`);

//   const cell = svg
//     .selectAll("g")
//     .data(defaultData)
//     .enter()
//     .append("g")
//     .attr(
//       "transform",
//       (d, i) =>
//         `translate(${(i % 7) * cellSize},${Math.floor(i / 7) * cellSize})`
//     );

//   cell
//     .append("rect")
//     .attr("width", cellSize - 1)
//     .attr("height", cellSize - 1)
//     .style("fill", (d) => d3.interpolateViridis(d.value / 31));

//   cell
//     .filter((d) => d.icon)
//     .append("path")
//     .attr("d", (d) => icons[d.icon])
//     .attr("transform", `translate(${cellSize / 2},${cellSize / 2})`)
//     .attr("fill", "white");

//   cell
//     .append("text")
//     .attr("x", cellSize / 2)
//     .attr("y", cellSize / 2)
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle")
//     .text((d) => d.value);

//   // Adding the tooltip
//   const tooltip = d3
//     .select(`#${calendarChartId}`)
//     .append("div")
//     .attr("class", "tooltip") // Add a class for easy styling
//     .style("position", defaultStyle?.tooltip?.position)
//     .style("display", defaultStyle?.tooltip?.display)
//     .style("border-style", defaultStyle?.tooltip?.borderStyle)
//     .style("white-space", defaultStyle?.tooltip?.whiteSpace)
//     .style("z-index", defaultStyle?.tooltip?.zIndex)
//     .style("box-shadow", defaultStyle?.tooltip?.boxShadow)
//     .style("transition", defaultStyle?.tooltip?.transition)
//     .style(
//       "background-color",
//       styles?.tooltip?.tooltipContainer?.fill ||
//         defaultStyle?.tooltip?.tooltipContainer?.fill
//     )
//     .style("border-width", defaultStyle?.tooltip?.tooltipContainer?.borderWidth)
//     .style(
//       "border-radius",
//       defaultStyle?.tooltip?.tooltipContainer?.borderRadius
//     )
//     .style("padding", defaultStyle?.tooltip?.padding)
//     .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
//     .style("visibility", "hidden") // Initially set to hidden
//     .style("opacity", 0); // Initially set to invisible

//   // Mousemove for updating tooltip position
//   svg.on("mousemove", function (event) {
//     // Update tooltip position based on mousemove
//     tooltip.style("left", event.pageX + "px").style("top", event.pageY + "px");
//   });

//   // Hover effect for cells
//   cell
//     .on("mouseover", function (event, d) {
//       const xPos = parseFloat(
//         d3.select(this).attr("transform").split("(")[1].split(",")[0]
//       );
//       const yPos = parseFloat(
//         d3.select(this).attr("transform").split(",")[1].split(")")[0]
//       );

//       // Calculate the center of the cell
//       const cellCenterX = xPos + cellSize / 2;
//       const cellCenterY = yPos + cellSize / 2;

//       // Show tooltip
//       tooltip
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY + "px")
//         .style("visibility", defaultStyle?.tooltip?.visibility)
//         .style("opacity", defaultStyle?.tooltip?.opacity);

//       // Update tooltip text
//       tooltip.html(
//         `<div>
//        <div  style="font-size: ${
//          styles?.tooltip?.fontSize ||
//          defaultStyle?.tooltip?.tooltipContainer?.fontSize
//        };
//        color: ${
//          styles?.tooltip?.fill ||
//          defaultStyle?.tooltip?.tooltipContainer?.strokeColor
//        }; ">
//          ${d.day} : ${d.value}
//        </div>
//      </div>`
//       );
//     })
//     .on("mouseout", function () {
//       // Hide tooltip on mouseout
//       tooltip.style("opacity", 0);
//     });

//   if (mergedStyles?.chartTitle?.view) {
//     svg
//       .append("text")
//       .attr("x", +mergedStyles?.chartContainer?.width / 2)
//       .attr("y", defaultStyle?.chartTitle?.marginTop)
//       .attr("text-anchor", "middle")
//       .style("font-size", mergedStyles.chartTitle.fontSize)
//       .style("fill", mergedStyles.chartTitle.fill)
//       .text(mergedStyles.chartTitle.text);
//   }
// }


// import * as echarts from 'echarts';

// export function DrawCalendarChart(options, propsData, styles) {
//   var chartDom = document.getElementById(options.id);
//   var myChart = echarts.init(chartDom);
//   var option;

//   const layouts = [
//     [[0, 0]],
//     [
//       [-0.25, 0],
//       [0.25, 0]
//     ],
//     [
//       [0, -0.2],
//       [-0.2, 0.2],
//       [0.2, 0.2]
//     ],
//     [
//       [-0.25, -0.25],
//       [-0.25, 0.25],
//       [0.25, -0.25],
//       [0.25, 0.25]
//     ]
//   ];
//   const pathes = [
//     'M936.857805 523.431322c0 0-42.065715-68.89513-88.786739-68.89513-46.68416 0-95.732122 71.223091-95.732122 71.223091s-44.28544-72.503296-93.440922-71.152538c-35.565466 0.977306-62.89705 30.882406-79.124275 64.06615L579.773747 790.800797c-3.253248 37.391565-5.677568 50.904371-12.002816 69.63497-6.651802 19.698688-19.544883 35.227341-31.650099 45.909606-14.30231 12.621414-29.59831 22.066586-45.854208 27.424563-16.28969 5.362074-30.098739 6.496973-51.536794 6.496973-19.498906 0-36.95104-2.963456-52.395418-8.850534-15.410586-5.887078-28.420403-14.313984-39.034573-25.246003-10.613146-10.930995-18.757939-24.08151-24.435507-39.525171-5.676544-15.443763-8.532685-40.195482-8.532685-59.270963l0-26.232454 74.435273 0c0 24.644301-0.17705 64.452915 8.81408 77.006848 9.02697 12.515021 22.756147 18.092032 41.148826 18.791014 16.728678 0.636518 30.032179-8.061645 30.032179-8.061645s11.922022-10.5472 14.992077-19.756954c2.674995-8.025805 3.565363-22.180147 3.565363-22.180147s2.080461-21.789286 2.080461-34.234675L489.399906 514.299369c-16.678502-18.827776-43.801395-61.938688-82.756096-60.927693-54.699008 1.419366-100.422144 70.059622-100.422144 70.059622s-56.065126-70.059622-93.440922-70.059622c-37.376717 0-91.077939 70.059622-91.077939 70.059622S105.343488 156.737741 476.742042 119.363584l53.70327-74.714624 51.373056 74.714624C964.889395 142.740992 936.857805 523.431322 936.857805 523.431322z',
//     'M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z',
//     'M741.06368 733.310464c8.075264-29.262438 20.615373-40.632422 14.64105-162.810061C966.089728 361.789952 967.93897 72.37847 967.855002 54.693683c0.279347-0.279347 0.418509-0.419533 0.418509-0.419533s-0.17705-0.00512-0.428749-0.00512c0-0.251699 0-0.428749 0-0.428749s-0.139162 0.14633-0.418509 0.425677c-17.695744-0.083866-307.10784 1.760051-515.833958 212.142592-122.181632-5.984256-133.55305 6.563533-162.815693 14.644531C235.35063 295.798886 103.552614 436.975309 90.630758 585.29543c0.014848 16.107887-2.141973 111.456235 97.028403 207.688845-7.702986 30.073856 10.190834 43.760742 10.190834 43.760742s13.679438-4.973911 43.760742 10.193906c96.253106 99.268455 191.608555 97.040123 207.688845 97.028403 148.319143-12.921856 289.495566-144.719872 430.675011-327.285865z'
//   ];
//   const colors = ['#8D1D08', '#008C8C', '#74B910', '#008C8C'];

//   const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//   const generateData = (year, month) => {
//     const days = daysInMonth(year, month);
//     const data = [];
//     for (let i = 1; i <= days; i++) {
//       data.push({
//         value: Math.floor(Math.random() * 4),
//         itemStyle: {
//           color: colors[Math.floor(Math.random() * colors.length)],
//           path: pathes[Math.floor(Math.random() * pathes.length)],
//           layout: layouts[Math.floor(Math.random() * layouts.length)],
//         },
//       });
//     }
//     return data;
//   };

//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth();

//   option = {
//     tooltip: {
//       position: 'top'
//     },
//     visualMap: {
//       min: 0,
//       max: 4,
//       calculable: true,
//       orient: 'horizontal',
//       left: 'center',
//       bottom: '3%',
//       inRange: {
//         color: ['#e0ffff', '#006edd']
//       },
//       formatter: function (value) {
//         return 'Event count: ' + value;
//       }
//     },
//     calendar: [{
//       top: 'middle',
//       left: 'center',
//       range: [`${year}-${month + 1}-01`, `${year}-${month + 1}-${daysInMonth(year, month)}`],
//       cellSize: [20, 20],
//       monthLabel: {
//         nameMap: 'cn'
//       },
//       dayLabel: {
//         firstDay: 1,
//         nameMap: 'cn'
//       },
//       yearLabel: {
//         formatter: '{start}'
//       },
//       itemStyle: {
//         normal: {
//           borderWidth: 0.5
//         }
//       },
//       data: generateData(year, month)
//     }],
//     series: [],
//   };

//   if (option && typeof option === 'object') {
//     myChart.setOption(option, true);
//   }
// }


import * as echarts from 'echarts';

export function DrawCalendarChart(options, propsData, styles) {
  const defaultStyle = {
    chartContainer: {
      width: 500,
      height: 500,
    },
    cellSize: 70,
    cellPadding: 5,
    yearLabelHeight: 20,
    axisLabels: {
      x: {
        view: false,
        text: "X Axis Label",
        fill: "#333",
        fontSize: "14px",
        tickLabelOrientation: "rotate(0)",
        textAnchor: "middle",
      },
      y: {
        view: false,
        text: "Y Axis Label",
        fill: "#333",
        fontSize: "14px",
        transform: "rotate(-90)",
        textAnchor: "middle",
      },
    },
    chartTitle: {
      view: true,
      text: "Calendar Chart Title",
      fill: "#333",
      fontSize: "16px",
      marginTop: -30,
    },
    margin: {
      top: 50,
      right: 50,
      bottom: 60,
      left: 70,
    },
    chartColor: { fill: "steelblue", radius: 10 },
    tooltip: {
      fontSize: "12px",
      visibility: "visible",
      visibilityOnMouseOut: "hidden",
      pointerEvents: "none",
      opacity: 0.9,
      mouseOutOpacity: 0,
      zIndex: 100,
      boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
      transition:
        "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
      padding: "10px",
      position: "absolute",
      display: "block",
      borderStyle: "solid",
      whiteSpace: "nowrap",
      tooltipContainer: {
        borderWidth: "1px",
        borderRadius: "4px",
        fontSize: "14px",
        fill: "#ffffff",
        strokeColor: "#000",
      },
    },
  };
  const chartDom = document.getElementById(options.id);
  const myChart = echarts.init(chartDom);
  chartDom.style.width = `${styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width}px`;
  chartDom.style.height = `${styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height}px`;
  let option;

  const layouts = [
    [[0, 0]],
    [[-0.25, 0], [0.25, 0]],
    [[0, -0.2], [-0.2, 0.2], [0.2, 0.2]],
    [[-0.25, -0.25], [-0.25, 0.25], [0.25, -0.25], [0.25, 0.25]]
  ];

  const pathes = [
    'M936.857805 523.431322c0 0-42.065715-68.89513-88.786739-68.89513-46.68416 0-95.732122 71.223091-95.732122 71.223091s-44.28544-72.503296-93.440922-71.152538c-35.565466 0.977306-62.89705 30.882406-79.124275 64.06615L579.773747 790.800797c-3.253248 37.391565-5.677568 50.904371-12.002816 69.63497-6.651802 19.698688-19.544883 35.227341-31.650099 45.909606-14.30231 12.621414-29.59831 22.066586-45.854208 27.424563-16.28969 5.362074-30.098739 6.496973-51.536794 6.496973-19.498906 0-36.95104-2.963456-52.395418-8.850534-15.410586-5.887078-28.420403-14.313984-39.034573-25.246003-10.613146-10.930995-18.757939-24.08151-24.435507-39.525171-5.676544-15.443763-8.532685-40.195482-8.532685-59.270963l0-26.232454 74.435273 0c0 24.644301-0.17705 64.452915 8.81408 77.006848 9.02697 12.515021 22.756147 18.092032 41.148826 18.791014 16.728678 0.636518 30.032179-8.061645 30.032179-8.061645s11.922022-10.5472 14.992077-19.756954c2.674995-8.025805 3.565363-22.180147 3.565363-22.180147s2.080461-21.789286 2.080461-34.234675L489.399906 514.299369c-16.678502-18.827776-43.801395-61.938688-82.756096-60.927693-54.699008 1.419366-100.422144 70.059622-100.422144 70.059622s-56.065126-70.059622-93.440922-70.059622c-37.376717 0-91.077939 70.059622-91.077939 70.059622S105.343488 156.737741 476.742042 119.363584l53.70327-74.714624 51.373056 74.714624C964.889395 142.740992 936.857805 523.431322 936.857805 523.431322z',
    'M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z',
    'M741.06368 733.310464c8.075264-29.262438 20.615373-40.632422 14.64105-162.810061C966.089728 361.789952 967.93897 72.37847 967.855002 54.693683c0.279347-0.279347 0.418509-0.419533 0.418509-0.419533s-0.17705-0.00512-0.428749-0.00512c0-0.251699 0-0.428749 0-0.428749s-0.139162 0.14633-0.418509 0.425677c-17.695744-0.083866-307.10784 1.760051-515.833958 212.142592-122.181632-5.984256-133.55305 6.563533-162.815693 14.644531C235.35063 295.798886 103.552614 436.975309 90.630758 486.076621c-12.921856 49.105408 39.634227 56.859034 58.579558 58.581197 18.953421 1.724314 121.471386-9.475789 130.09111 4.309094 0 0 16.367411 11.200102 17.226035 41.346662 0.850432 29.796659 15.173222 71.354163 37.123994 97.267302-0.028672 0.027648-0.05632 0.054272-0.083866 0.074752 0.158618 0.13097 0.316211 0.261939 0.474829 0.390861 0.129946 0.149402 0.261939 0.319283 0.393011 0.468685 0.019456-0.019456 0.04608-0.049152 0.075776-0.075674 25.918362 21.961216 67.477504 36.272128 97.269248 37.122458 30.149837 0.859546 41.354547 17.234534 41.354547 17.234534 13.779354 8.608051 2.583962 111.122842 4.302131 130.075546 1.727386 18.95168 9.477222 71.498445 58.579558 58.576077C585.12896 918.526771 726.311117 786.734182 741.06368 733.310464zM595.893555 426.206003c-39.961702-39.965184-39.961702-104.75991 0-144.720077 39.970918-39.96928 104.768307-39.96928 144.730112 0 39.970918 39.960064 39.970918 104.75479 0 144.720077C700.661862 466.171187 635.864474 466.171187 595.893555 426.206003zM358.53312 769.516032c-31.923302-4.573184-54.890394-18.410291-71.41847-35.402342-16.984474-16.526438-30.830387-39.495475-35.405824-71.420621-4.649062-28.082586-20.856832-41.167565-38.76649-38.763827-17.906586 2.40681-77.046886 66.714419-80.857805 89.475891-3.80887 22.752154 29.271859 12.081152 46.424166 27.654861 17.151283 15.590093-2.139853 61.93664-14.733107 86.845952-6.441984 12.735078-10.289766 26.42176-4.22953 33.76087 7.346586 6.070272 21.03593 2.222592 33.769472-4.220109 24.912384-12.585677 71.258829-31.872922 86.842368-14.731469 15.583539 17.160806 4.911002 50.229965 27.674419 46.419251 22.754099-3.807744 87.065395-62.946611 89.466163-80.85248C399.70857 790.374093 386.627072 774.166938 358.53312 769.516032z',
    'M848.794624 939.156685 571.780416 939.156685 571.780416 653.17123l341.897539 0 0 221.100654C913.677926 909.960704 884.482867 939.156685 848.794624 939.156685zM571.780403 318.743552c-11.861606-3.210138-31.443354-8.36864-39.829709-16.176435-0.596582-0.561766-1.016218-1.246413-1.613824-1.841971-0.560845 0.596582-1.016218 1.280205-1.613824 1.841971-8.386355 7.807795-15.96631 12.965274-27.827917 16.176435l0 263.544325L141.030675 582.287877 141.030675 355.202884c0-35.687834 29.195059-64.882688 64.883302-64.882688l150.649125 0c-16.984474-9.525965-32.846438-20.56233-46.111027-32.932045-60.250624-56.144691-71.129907-137.062605-24.283034-180.767027 19.615539-18.264986 46.252237-27.124736 75.026739-27.124736 39.933133 0 83.972915 17.070797 118.995968 49.706086 20.353331 18.983322 37.722624 43.405619 50.145075 69.056819 12.457267-25.6512 29.791744-50.074419 50.180915-69.056819 35.022029-32.63529 79.062835-49.706086 118.994944-49.706086 28.74071 0 55.410176 8.860774 75.025715 27.124736 46.882611 43.704422 35.96759 124.622336-24.283034 180.767027-13.264589 12.368691-29.127578 23.40608-46.111027 32.932045l144.649234 0c35.688243 0 64.882278 29.195981 64.882278 64.882688l0 227.084948L571.780416 582.287833 571.780416 318.743508zM435.064218 147.625267c-21.476966-19.965747-49.094144-31.913882-73.868288-31.913882-7.404954 0-21.125018 1.211597-29.863322 9.386803-2.000691 1.824563-8.070144 7.439462-8.070144 21.369754 0 15.650406 8.492749 40.24873 32.319386 62.477926 29.124506 27.12576 77.202432 47.601152 111.76704 47.601152 12.176794 0 16.492237-2.666701 16.527053-2.702541C489.524736 242.54505 475.664486 185.453773 435.064218 147.625267zM577.78135 254.790963c0 0 0.034816-0.034816 0.069632-0.034816 0.807424 0 5.50871 1.790771 15.509914 1.790771 34.564608 0 82.64151-20.47529 111.76704-47.601152 23.826637-22.229299 32.283546-46.810112 32.283546-62.442189 0-13.930291-6.033613-19.562496-8.035328-21.404467-8.77312-8.17623-22.457344-9.386803-29.864346-9.386803-24.808038 0-52.390298 11.948134-73.867264 31.913882C585.325466 185.208218 571.358822 241.73865 577.78135 254.790963zM500.89513 939.156685 205.914017 939.156685c-35.688243 0-64.883302-29.195981-64.883302-64.883712L141.030714 653.17123l359.864462 0L500.895177 939.15666z'
  ];

  const colors = ['#c4332b', '#16B644', '#6862FD', '#FDC763'];

  function getVirtualData(year) {
    year = year || '2017';
    let date = +echarts.number.parseDate(year + '-01-01');
    let end = +echarts.number.parseDate(+year + 1 + '-01-01');
    let dayTime = 3600 * 24 * 1000;
    let data = [];
    for (let time = date; time < end; time += dayTime) {
      let items = [];
      let eventCount = Math.round(Math.random() * pathes.length);
      for (let i = 0; i < eventCount; i++) {
        items.push(Math.round(Math.random() * (pathes.length - 1)));
      }
      data.push([echarts.format.formatTime('yyyy-MM-dd', time), items.join('|')]);
    }
    return data;
  }

  option = {
    tooltip: {},
    responsive: true,
    calendar: [
      {
        left: 'center',
        top: 'middle',
        cellSize: [70, 70],
        yearLabel: { show: false },
        orient: 'vertical',
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        monthLabel: {
          show: false
        },
        range: '2017-03'
      }
    ],
    series: [
      {
        type: 'custom',
        coordinateSystem: 'calendar',
        renderItem: function (params, api) {
          const cellPoint = api.coord(api.value(0));
          const cellWidth = params.coordSys.cellWidth;
          const cellHeight = params.coordSys.cellHeight;
          const value = api.value(1);
          const events = value && value.split('|');
          if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
            return;
          }
          const group = {
            type: 'group',
            children: (layouts[events.length - 1] || []).map(function (itemLayout, index) {
              return {
                type: 'path',
                shape: {
                  pathData: pathes[+events[index]],
                  x: -8,
                  y: -8,
                  width: 16,
                  height: 16
                },
                position: [
                  cellPoint[0] + echarts.number.linearMap(
                    itemLayout[0],
                    [-0.5, 0.5],
                    [-cellWidth / 2, cellWidth / 2]
                  ),
                  cellPoint[1] + echarts.number.linearMap(
                    itemLayout[1],
                    [-0.5, 0.5],
                    [-cellHeight / 2 + 20, cellHeight / 2]
                  )
                ],
                style: api.style({
                  fill: colors[+events[index]]
                })
              };
            }) || []
          };
          group.children.push({
            type: 'text',
            style: {
              x: cellPoint[0],
              y: cellPoint[1] - cellHeight / 2 + 15,
              text: echarts.format.formatTime('dd', api.value(0)),
              fill: '#777',
              textFont: api.font({ fontSize: 14 })
            }
          });
          return group;
        },
        dimensions: [undefined, { type: 'ordinal' }],
        data: getVirtualData('2017')
      }
    ]
  };

  myChart.setOption(option);
// Delay chart initialization to ensure proper sizing
setTimeout(function() {
  // Initialize chart
  myChart.setOption(option);

  // Trigger resize event to ensure proper rendering
  window.dispatchEvent(new Event('resize'));
}, 100); // Delay in milliseconds

  window.addEventListener('resize', function () {
    // Resize the chart
    myChart.resize();
  });

  return myChart;
}
