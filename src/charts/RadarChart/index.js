// import defaultData from './data.json';
// import * as echarts from 'echarts';

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
//       text: "x Axis Label",
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
//       text: "Y Axis Label",
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
//     text: "Radar Chart ",
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
//     line: { fill: "#fa5102" },
//     backgroundColor: "#ffffff",
//     line: { fill: "#ffc926", strokeColor: "#fa5102", strokeWidth: "2px" },
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
// };

// const colors = [
//   '#fa5102',
//   '#4300FF',
//   '#C745FF',
//   '#01C5FF',
//   '#00FFBD',
//   '#E5F306',
//   '#FED700',
//   '#FF082B',
//   '#00FF28',
// ];

// let chart;

// export function DrawRadarChart(options, propsData, styles) {
//   console.log("propsData" ,propsData)
//   const xKey = (Array.isArray(propsData) &&
//     propsData?.length > 0 &&
//     Object.keys(propsData[0])[0]) || "genre";
//   const yKeys = (Array.isArray(propsData) &&
//     propsData?.length > 0 &&
//     Object.keys(propsData[0]).slice(1)) || ["na_sales"];

//   const labels = (Array.isArray(propsData) &&
//     propsData?.length > 0 &&
//     propsData.some((item) => item[xKey] !== undefined) &&
//     propsData.map((item) => item[xKey])) ||
//     defaultData?.data?.map((e) => e?.genre);

//   const datasets = (yKeys && yKeys.length > 0 && propsData && propsData.length > 0)
//     ? yKeys.map((yKey, index) => ({
//       name: yKey,
//       value: propsData.map(item => item[yKey]),
//       symbol: 'circle',
//       symbolSize: 8,
//       areaStyle: {
//         color: colors[index % colors.length] + 80,
//       },
//       lineStyle: {
//         color: colors[index % colors.length] + 80,
//         width: 2,
//       },
//     }))
//     : [];

//   // Adding default datasets for "na_sales" and "eu_sales" if no propsData is provided
//   if (!propsData || propsData.length === 0) {
//     datasets.push({
//       name: "na_sales",
//       value: defaultData.data.map(item => item.na_sales),
//       symbol: 'circle',
//       symbolSize: 8,
//       areaStyle: {
//         color: colors[0] + 80,
//       },
//       lineStyle: {
//         color: colors[0] + 80,
//         width: 2,
//       }
//     });
//     datasets.push({
//       name: 'eu_sales',
//       data: defaultData.data.map((item) => item.eu_sales),
//       type: 'line',
//       symbol: 'circle',
//       symbolSize: 8,
//       lineStyle: {
//         color: colors[1],
//         width: 2,
//       },
//       itemStyle: {
//         color: colors[1],
//       },
//     });
//   }

//   const option = {
//     legend: {
//       data: datasets.map(dataset => dataset.name),
//       left: styles?.legend?.placement?.value || 'right',
//       orient: 'vertical',
//       textStyle: {
//         color: styles?.legend?.textColor?.value || defaultStyle.legend.color,
//         fontFamily: styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily,
//       },
//     },
//     radar: {
//       indicator: labels.map(label => ({ name: label })),
//     },
//     series: datasets.map(dataset => ({
//       type: 'radar',
//       name: dataset.name,
//       data: [dataset],
//     })),
//   };

//   if (chart && chartDom && chartDom.parentNode) {
//     chart.dispose();
//     chartDom.parentNode.removeChild(chartDom); // Remove the chart DOM element from its parent
//   }

//   const chartDom = document.getElementById(options.id);

//   chartDom.style.width = `${styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width}px`;
//   chartDom.style.height = `${styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height}px`;
//   chartDom.style.backgroundSize = "cover";

//   chart = echarts.init(chartDom);
//   chart.setOption(option);


//   window.addEventListener('resize', function () {
//     chart.resize();
//   });
//   return chart;
// }
