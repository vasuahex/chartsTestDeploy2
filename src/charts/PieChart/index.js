// import defaultData from "./data.json";
// import Chart from "chart.js/auto";

// const defaultStyle = {
//   chartContainer: {
//     width: 100,
//     height: 100,
//   },
//   backgroundImage: {
//     url: "",
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
//     fontSize: "14px",
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
//   legend: {
//     position: "right",
//     fontFamily: "Arial",
//     color: "#333",
//     fontWeight: "normal",
//   },

// };

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

// export function DrawPieChart(options, propsData, styles) {

//   const xKey = (Array.isArray(propsData) &&
//       propsData?.length > 0 &&
//       Object.keys(propsData[0])[0]) ||
//     "genre";

//   const yKeys = (Array.isArray(propsData) &&
//     propsData?.length > 0 &&
//     Object.keys(propsData[0]).slice(1)) || ["na_sales"];

//   const labels =  (Array.isArray(propsData) &&
//   propsData?.length > 0 &&
//   propsData.some((item) => item[xKey] !== undefined) &&
//   propsData.map((item) => item[xKey])) ||
//   defaultData?.data?.map((e) => e?.genre);

//   const datasets = yKeys?.map((yKey, index) => ({
//     label: yKey,
//     data: (propsData && propsData.length > 0)
//     ? propsData.map((item) => parseFloat(item[yKey]))
//     : defaultData.data.map((item) => {
//       const value = parseFloat(item[yKey]);
//       return value;
//     }),  
//   }));
 
//   const data = {
//     labels: labels,
//     datasets: datasets,
//     backgroundColor: yKeys.map((yKey, index) => colors[index % colors.length]),
//     hoverOffset: 4,
//   };

//   const config = {
//     type: 'pie',
//     data: data,
//     options: {
//       aspectRatio: 2.4,
//       plugins: {
//         title: {
//           text: styles?.chartTitle?.value?.value || defaultStyle.chartTitle.text,
//           display: styles?.chartTitle?.view?.value && defaultStyle.chartTitle.view,
//           color: styles?.chartTitle?.color?.value || defaultStyle.chartTitle.fill,
//           font: {
//             size: styles?.chartTitle?.fontSize?.value || defaultStyle.chartTitle.fontSize,
//             family: styles?.chartTitle?.fontFamily?.value || defaultStyle.chartTitle.fontFamily,
//             weight: styles?.chartTitle?.fontWeight?.value || defaultStyle.chartTitle.fontWeight,
//           },
//         },
//         legend: {
//           display: styles?.legend?.view?.value && defaultStyle.legend.view,
//           position: styles?.legend?.placement?.value || defaultStyle.legend.position,
//           labels: {
//             color: styles?.legend?.textColor?.value || defaultStyle.legend.color,
//             font: {
//               family: styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily,
//             },
//           },
//         },
     
//         tooltip: {
//           enabled: true,  
//           displayColors: true, 
//           backgroundColor: styles?.tooltip?.bgColor?.value || defaultStyle.tooltip.tooltipContainer.fill,
//           titleColor: styles?.tooltip?.textColor?.value || defaultStyle.tooltip.tooltipContainer.strokeColor,
//           titleFont: {
//             size:styles?.tooltip?.fontSize?.value || defaultStyle.tooltip.tooltipContainer.fontSize,
//             family: styles?.tooltip?.fontFamily?.value || defaultStyle.tooltip.tooltipContainer.fontFamily,
//             style: 'bold',
//             lineHeight: 1.2,
//           },
//           bodyColor:styles?.tooltip?.textColor?.value || defaultStyle.tooltip.tooltipContainer.strokeColor,
//           borderRadius: styles?.tooltip?.borderRadius?.value || defaultStyle.tooltip.tooltipContainer.borderRadius,
//         },
//       },
//     },
//   };

//   if (chart) {
//     chart.destroy();
//   }

//   const canvas = document.getElementById(options.id);
//   canvas.style.width = styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width;
//   canvas.style.height = styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height;
//   canvas.style.backgroundImage = `url(${styles?.chartContainer?.backgroundImage?.value?.url ||
//     defaultStyle?.backgroundImage?.url
//     })`;
//     canvas.style.backgroundSize = 'cover';
//     canvas.style.backgroundRepeat = 'no-repeat';
//     canvas.style.backgroundPosition = 'center';
//     canvas.style.backgroundColor = styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor;

//   const ctx = canvas?.getContext('2d');
//   chart = new Chart(ctx, config);
  
//   return chart;
// } 


import * as echarts from 'echarts';
import defaultData from "./data.json";

const defaultStyle = {
    chartContainer: {
      width: 500,
      height: 500,
    },
    backgroundImage: {
      url: "",
    },
    chartTitle: {
      view: true,
      text: "Pie Chart title",
      fill: "#333333",
      fontSize: "20px",
      marginTop: -30,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    margin: {
      top: 50,
      right: 100,
      bottom: 60,
      left: 120,
    },
    chartColor: {
      area: { fill: "#fa5102" },
      backgroundColor: "#ffffff",
      line: { fill: "#ffc926", strokeColor: "#fa5102", strokeWidth: "2px" },
    },
    tooltip: {
      fontSize: "14px",
      visibility: "visible",
      visibilityOnMouseOut: "hidden",
      pointerEvents: "none",
      opacity: 0.9,
      mouseOutDuration: 2000,
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
        borderColor: "#000000",
        borderRadius: "4px",
        fontSize: "14px",
        fontFamily: "Arial",
        fill: "#ffffff",
        strokeColor: "#000000",
      },
    },
    legend: {
      position: "right",
      fontFamily: "Arial",
      color: "#333",
      fontWeight: "normal",
    },
  };

let chart;

export function DrawPieChart(options, propsData, styles) {
  console.log('DrawPieChart', propsData);
  console.log('DrawPieChart', styles);
  console.log('DrawPieChart', options);

    const xKey = (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      Object.keys(propsData[0])[0]) ||
    "genre";

  const yKeys = (Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0]).slice(1)) || ["na_sales"];

  const labels =  (Array.isArray(propsData) &&
  propsData?.length > 0 &&
  propsData.some((item) => item[xKey] !== undefined) &&
  propsData.map((item) => item[xKey])) ||
  defaultData?.data?.map((e) => e?.genre);


  const uniqueLabels = [...new Set(labels)];

  const dataToUse = Array.isArray(propsData) && propsData.length > 0 ? propsData : defaultData.data;

  const datasets = uniqueLabels.map((label) => {
    const sum = dataToUse?.reduce((total, item) => {
      if (item[xKey] === label) {
        return total + yKeys.reduce((innerTotal, yKey) => innerTotal + parseFloat(item[yKey] || 0), 0);
      }
      return total;
    }, 0);
  
    return {
      name: label,
      value: sum,
    };
  });
  

const option = {
  responsive: true,
  maintainAspectRatio: false,
  backgroundImage: `url(${styles?.chartContainer?.backgroundImage?.value || defaultStyle.backgroundImage.url})`,
  tooltip: {
    show: true,
    backgroundColor: styles?.tooltip?.bgColor?.value || defaultStyle.tooltip.tooltipContainer.fill,
    textStyle: {
      color: styles?.tooltip?.textColor?.value || defaultStyle.tooltip.tooltipContainer.strokeColor,
      fontSize: styles?.tooltip?.fontSize?.value || defaultStyle.tooltip.tooltipContainer.fontSize,
      fontFamily: styles?.tooltip?.fontFamily?.value || defaultStyle.tooltip.tooltipContainer.fontFamily,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    borderColor: styles?.tooltip?.borderColor?.value || defaultStyle.tooltip.tooltipContainer.strokeColor,
    borderRadius: styles?.tooltip?.borderRadius?.value || defaultStyle.tooltip.tooltipContainer.borderRadius,


  },
  legend: {
    data: labels,
    left: styles?.legend?.placement?.value || 'right',
    orient: 'vertical',
    textStyle: {
      color: styles?.legend?.textColor?.value || defaultStyle.legend.color,
      fontFamily: styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily,
    },
  },
  title: {
    show: styles?.chartTitle?.view?.value !== false && defaultStyle.chartTitle.view !== false ? true : false,
    text: styles?.chartTitle?.value?.value || defaultStyle.chartTitle.text,
    left: 'center',
    textStyle: {
      color: styles?.chartTitle?.color?.value || defaultStyle.chartTitle.fill,
      fontSize: styles?.chartTitle?.fontSize?.value || defaultStyle.chartTitle.fontSize,
      fontFamily: styles?.chartTitle?.fontFamily?.value || defaultStyle.chartTitle.fontFamily,
      fontWeight: styles?.chartTitle?.fontWeight?.value || defaultStyle.chartTitle.fontWeight,
    },
  },
  // backgroundColor: styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor,
  backgroundColor: styles?.chartContainer?.backgroundImage?.value?.url
  ? {
      // Set the background image for the chart
      image: styles.chartContainer.backgroundImage?.value?.url,
      repeat: 'no-repeat',
    }
  : styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor,

  series: [{
    name: '',
    type: 'pie',
    radius: '50%',
    data: datasets,
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }],
};


  if (chart) {
    chart.dispose();
  }

  const chartDom = document.getElementById(options.id);
  console.log('chartDom', options.id);

  console.log('chartDom', chartDom.style);
  chartDom.style.width = `${styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width}px`;
  chartDom.style.height = `${styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height}px`;

  chart = echarts.init(chartDom);
  chart.setOption(option);
  window.addEventListener('resize', function () {
    // Resize the chart
    chart.resize();
  });
  return chart;
}
