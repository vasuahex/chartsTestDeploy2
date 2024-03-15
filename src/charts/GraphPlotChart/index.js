import * as echarts from 'echarts';
import defaultData from './data.json'

let chart;

export function DrawGraphPlotChart(options, propsData, styles) {
  console.log('PropsData', propsData)

  const defaultStyle = {
    chartContainer: {
      width: 500,
      height: 500,
    },
    backgroundImage: {
      url: "",
    },
    axisLabels: {
      x: {
        view: true,
        text: "x Axis Label",
        fill: "#333333",
        fontSize: "14px",
        tickLabelOrientation: "rotate(0)",
        textAnchor: "middle",
        fontFamily: "Arial",
        tickLabelFontSize: "12px",
        tickLabelFontFamily: "Arial",
        tickLabelColor: "#000000",
        axisLineColor: "#333333",
        axisTickColor: "#000000",
      },
      y: {
        view: true,
        text: "Y Axis Label",
        fill: "#333333",
        fontSize: "14px",
        transform: "rotate(-90)",
        textAnchor: "middle",
        fontFamily: "Arial",
        tickLabelColor: "#000000",
        tickLabelFontSize: "12px",
        tickLabelFontFamily: "Arial",
        axisLineColor: "#333333",
        axisTickColor: "#000000",
      },
    },
    chartTitle: {
      view: true,
      text: "Multi Line Chart ",
      fill: "#333333",
      fontSize: "16px",
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
      line: { fill: "#fa5102" },
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
    gridLine: {
      view: true,
      color: "#c7d2da",
      opacity: 0.7,
      strokeWidth: 0,
    },
    legend: {
      position: "right",
      fontFamily: "Arial",
      color: "#333",
      fontWeight: "normal",
    },
    brush: {
      fill: "#666",
      fillOpacity: 0.8,
      stroke: "#000",
      strokeWidth: 1,
      cursor: "ew-resize",
    },
  };
  const xKey =
   (Array.isArray(propsData) &&
     propsData?.length > 0 &&
     Object.keys(propsData[0])[0]) ||
   "genre";
 const yKeys = (Array.isArray(propsData) &&
   propsData?.length > 0 &&
   Object.keys(propsData[0]).slice(1)) || ["na_sales"];
    // Applying default data if propsData is empty
    if (!propsData || propsData.length === 0) {
        propsData = defaultData?.data || [];
    }
    // Extracting data
    const { uniqueXAxisData, yAxisData } = getUniqueAndYAxisData(propsData);

    // Constructing option for graph plot chart
    const option = {
        responsive: true,
        maintainAspectRatio: false,
        backgroundImage: `url(${styles?.chartContainer?.backgroundImage?.value || defaultStyle.backgroundImage.url})`,
        tooltip: {},
        title: {
            text: styles?.chartTitle?.value?.value || defaultStyle.chartTitle.text,
            left: 'center',
            textStyle: {
                color: styles?.chartTitle?.color?.value || defaultStyle.chartTitle.fill,
                fontSize: styles?.chartTitle?.fontSize?.value || defaultStyle.chartTitle.fontSize,
                fontFamily: styles?.chartTitle?.fontFamily?.value || defaultStyle.chartTitle.fontFamily,
                fontWeight: styles?.chartTitle?.fontWeight?.value || defaultStyle.chartTitle.fontWeight,
            },
        },
        backgroundColor: styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor,
        xAxis: {
            type: 'category',
            name:"Genre",
            data: uniqueXAxisData,
            nameLocation: 'center',
            axisLabel: {
                rotate: styles?.xAxis?.tickLabel?.rotation?.value || 0,
                color: styles?.xAxis?.tickLabel?.color?.value || defaultStyle.axisLabels.x.tickLabelColor,
                fontFamily: styles?.xAxis?.tickLabel?.fontFamily?.value || defaultStyle.axisLabels.x.tickLabelFontFamily,
                fontSize: styles?.xAxis?.tickLabel?.fontSize?.value || defaultStyle.axisLabels.x.tickLabelFontSize,
            },
        },
        yAxis: {
            type: 'value',
            name: 'NA Sales',
            data: yAxisData,
            nameLocation: 'center',
            nameTextStyle: {
                padding: [0, 0, 15, 0],
                color: styles?.yAxis?.title?.color?.value || defaultStyle.axisLabels.y.fill,
                fontSize: styles?.yAxis?.title?.fontSize?.value || defaultStyle.axisLabels.y.fontSize,
                fontFamily: styles?.yAxis?.title?.fontFamily?.value || defaultStyle.axisLabels.y.fontFamily,
            },
            axisLabel: {
                color: styles?.yAxis?.tickLabel?.color?.value || defaultStyle.axisLabels.y.tickLabelColor,
                fontFamily: styles?.yAxis?.tickLabel?.fontFamily?.value || defaultStyle.axisLabels.y.tickLabelFontFamily,
                fontSize: styles?.yAxis?.tickLabel?.fontSize?.value || defaultStyle.axisLabels.y.tickLabelFontSize,
            },
        },
        series: [
          {
              type: 'graph',
              layout: 'none',
              coordinateSystem: 'cartesian2d',
              symbolSize: 40,
              label: {
                  show: true
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              data: uniqueXAxisData.map((item, i) => ({
                value: [i, yAxisData[i]]
            })),
            links: getLinks(uniqueXAxisData.length),
              lineStyle: {
                  color: '#2f4554'
              }
          }
      ]
      
    };

    if (chart) {
        chart.dispose();
    }

    const chartDom = document.getElementById(options.id);

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

function getUniqueAndYAxisData(propsData) {
  const uniqueDataMap = new Map();

  propsData?.forEach(item => {
      const key = item.genre;
      if (!uniqueDataMap.has(key)) {
          uniqueDataMap.set(key, item.na_sales);
      }
  });

  const uniqueXAxisData = Array.from(uniqueDataMap.keys());
  const yAxisData = Array.from(uniqueDataMap.values());

  return { uniqueXAxisData, yAxisData };
}

// Function to generate links for the graph
function getLinks(dataLength) {
  const links = [];
  for (let i = 0; i < dataLength - 1; i++) {
      links.push({ source: i, target: i + 1 });
  }
  return links;
}