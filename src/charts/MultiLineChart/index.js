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

const colors = [
  '#fa5102',
  '#4300FF',
  '#C745FF',
  '#01C5FF',
  '#00FFBD',
  '#E5F306',
  '#FED700',
  '#FF082B',
  '#00FF28',
];

let chart;

export function DrawMultiLineChart(options, propsData, styles) {
  const xKey =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0])[0];
  const yKeys =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0]).slice(1);
  const labels =
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      propsData.some((item) => item[xKey] !== undefined) &&
      propsData.map((item) => item[xKey])) ||
    defaultData?.data?.map((e) => e?.genre);

  console.log("ykeys", propsData, yKeys)
  const datasets =
    yKeys && yKeys.length > 0 && propsData && propsData.length > 0
      ? yKeys.map((yKey, index) => ({
        name: yKey,
        data: propsData.map((item) => item[yKey]),
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: colors[index % colors.length],
          width: 2,
        },
        itemStyle: {
          color: colors[index % colors.length],
        },
      }))
      : [
        {
          name: 'na_sales',
          data: defaultData.data.map((item) => item.na_sales),
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: colors[0],
            width: 2,
          },
          itemStyle: {
            color: colors[0],
          },
        },
      ];


  const chartContainer = document.getElementById(options.id);
  chartContainer.style.backgroundImage = `url(${styles?.chartContainer?.backgroundImage?.url ||
    defaultStyle?.backgroundImage?.url})`;
  chartContainer.style.backgroundSize = 'cover';
  chartContainer.style.backgroundRepeat = 'no-repeat';
  chartContainer.style.backgroundPosition = 'center';
  chartContainer.style.backgroundColor =
    styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor;

  if (chart) {
    chart.dispose();
  }

  chart = echarts.init(chartContainer);
  const option = {
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
    backgroundColor: styles?.chartContainer?.backgroundImage?.value?.url
      ? {
        // Set the background image for the chart
        image: styles.chartContainer.backgroundImage?.value?.url,
        repeat: 'no-repeat',
      }
      : styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor,

    legend: {
      data: yKeys,
      left: styles?.legend?.placement?.value || 'right',
      icon: 'rect',
      orient: 'vertical',
      textStyle: {
        color: styles?.legend?.textColor?.value || defaultStyle.legend.color,
        fontFamily: styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily,
      },
    },

    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        height: 10,
        bottom: 10
      },
      {
        start: 0,
        end: 100,
      }
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
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

    xAxis: {
      type: 'category',
      data: labels,
      name: styles?.xAxis?.title?.value?.value || defaultStyle.axisLabels.x.text,
      nameLocation: 'center',
      nameTextStyle: {
        padding: [15, 0, 0, 0],
        color: styles?.xAxis?.title?.color?.value || defaultStyle.axisLabels.x.fill,
        fontSize: styles?.xAxis?.title?.fontSize?.value || defaultStyle.axisLabels.x.fontSize,
        fontFamily: styles?.xAxis?.title?.fontFamily?.value || defaultStyle.axisLabels.x.fontFamily,
      },
      axisLine: {
        lineStyle: {
          color: styles?.xAxis?.axisLine?.color?.value || defaultStyle.axisLabels.x.axisLineColor,
        },
      },
      axisLabel: {
        color: styles?.xAxis?.tickLabel?.color?.value || defaultStyle.axisLabels.x.tickLabelColor,
        fontSize: styles?.xAxis?.tickLabel?.fontSize?.value || defaultStyle.axisLabels.x.tickLabelFontSize,
        fontFamily: styles?.xAxis?.tickLabel?.fontFamily?.value || defaultStyle.axisLabels.x.tickLabelFontFamily,
      },

      axisTick: {
        lineStyle: {
          color: styles?.xAxis?.axisTick?.color?.value || defaultStyle.axisLabels.x.axisTickColor,
        },
      },

    },
    yAxis: {
      type: 'value',
      name: styles?.yAxis?.title?.value?.value || defaultStyle.axisLabels.y.text,
      nameLocation: 'center',
      nameTextStyle: {
        padding: [15, 15, 15, 15],
        color: styles?.yAxis?.title?.color?.value || defaultStyle.axisLabels.y.fill,
        fontSize: styles?.yAxis?.title?.fontSize?.value || defaultStyle.axisLabels.y.fontSize,
        fontFamily: styles?.yAxis?.title?.fontFamily?.value || defaultStyle.axisLabels.y.fontFamily,
      },
      axisLine: {
        lineStyle: {
          color: styles?.yAxis?.axisLine?.color?.value || defaultStyle.axisLabels.y.axisLineColor,
        },
      },
      axisLabel: {
        color: styles?.yAxis?.tickLabel?.color?.value || defaultStyle.axisLabels.y.tickLabelColor,
        fontSize: styles?.yAxis?.tickLabel?.fontSize?.value || defaultStyle.axisLabels.y.tickLabelFontSize,
        fontFamily: styles?.yAxis?.tickLabel?.fontFamily?.value || defaultStyle.axisLabels.y.tickLabelFontFamily,
      },
      axisTick: {
        lineStyle: {
          color: styles?.yAxis?.axisTick?.color?.value || defaultStyle.axisLabels.y.axisTickColor,
        },
      },

    },
    series: datasets,
    type: 'line',

  };

  if (chart) {
    chart.dispose();
  }

  // create a new chart
  const chartDom = document.getElementById(options.id);

  chartDom.style.width = `${styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width}px`;
  chartDom.style.height = `${styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height}px`;
  chartDom.style.backgroundSize = "cover";

  chart = echarts.init(chartDom);
  chart.setOption(option);
  // resize the chart on window resize
  window.addEventListener('resize', function () {
    chart.resize();
  });
  return chart;
}

