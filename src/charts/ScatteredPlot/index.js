import * as echarts from 'echarts';
import defaultData from "./data.json";


const defaultStyle = {
  chartContainer: { width: 800, height: 500 },
  chartColor: { backgroundColor: "#fff", fill: "steelblue" },
  backgroundImage: {
    url: "",
  },
  tooltip: {
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
  xAxis: {
    title: {
      view: true,
      value: "X Axis Label",
      fontFamily: "Arial",
      color: "#333",
      fontSize: "16px",
    },
    axisLine: {
      color: "#333",
    },
    axisTick: {
      color: "#000",
    },
    tickLabel: {
      rotation: 0,
      fontSize: "16px",
      fontFamily: "Arial",
      color: "#000",
      view: "auto",
      placement: "middle",
    },
  },
  yAxis: {
    title: {
      view: true,
      value: "Y Axis Label",
      fontFamily: "Arial",
      color: "#333",
      fontSize: "16px",
    },
    axisLine: {
      color: "#333",
    },
    axisTick: {
      color: "#000",
    },
    tickLabel: {
      fontSize: "16px",
      fontFamily: "Arial",
      color: "#333",
      view: "auto",
    },
  },
  chartTitle: {
    view: true,
    text: "scatter Chart Label",
    fontFamily: "Arial",
    color: "#333",
    fontSize: "16",
    fontWeight: "bold",
    marginTop: -9,
  },
  gridLine: {
    view: true,
    color: "#c7d2da",
    opacity: 0.7,
  },
  legend: {
    placement: "right",
    fontFamily: "Arial",
    color: "#333",
  },
};
const colors = [
  "#fa5102",
  "#4300FF",
  "#C745FF",
  "#01C5FF",
  "#00FFBD",
  "#E5F306",
  "#FED700",
  "#FF082B",
  "#00FF28",
];

let chart;

export function DrawScatterPlot(options, propsData, styles) {
  // key for x and y axis
  const xKey =
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      Object.keys(propsData[0])[0]) ||
    "genre";
  const yKeys = (Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0]).slice(1)) || ["na_sales"];
  // labels for x axis
  const labels = (Array.isArray(propsData) &&
    propsData?.length > 0 &&
    propsData.some((item) => item[xKey] !== undefined) &&
    propsData.map((item) => item[xKey])) ||
    defaultData?.data?.map((e) => e?.genre);

  // datasets for y axis
  const datasets = (yKeys && yKeys.length > 0 && propsData && propsData.length > 0)
    ? yKeys.map((yKey, index) => ({
      name: yKey,
      data: propsData.map(item => item[yKey]),
      type: 'scatter',
      // itemStyle: {
      //   color: colors[index % colors.length] ,
      // },
      areaStyle: {},
    }))
    : [{
      name: "na_sales",
      data: defaultData.data.map(item => item.na_sales),
      type: 'scatter',
      // itemStyle: {
      //   color: colors[0],
      // },
      areaStyle: {},
    }];
  // options for chart
  const option = {
    responsive: true,
    maintainAspectRatio: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: styles?.tooltip?.bgColor?.value || defaultStyle.tooltip.tooltipContainer.fill,
      borderColor: styles?.tooltip?.borderColor?.value || defaultStyle.tooltip.tooltipContainer.borderColor,
      borderWidth: styles?.tooltip?.borderWidth?.value.replace('px', '') || defaultStyle.tooltip.tooltipContainer.borderWidth.replace('px', ''),
      borderRadius: styles?.tooltip?.borderRadius?.value.replace('px', '') || defaultStyle.tooltip.tooltipContainer.borderRadius.replace('px', ''),
      textStyle: {
        color: styles?.tooltip?.textColor?.value || defaultStyle.tooltip.tooltipContainer.strokeColor,
        fontSize: styles?.tooltip?.fontSize?.value.replace('px', '') || defaultStyle.tooltip.tooltipContainer.fontSize.replace('px', ''),
        fontFamily: styles?.tooltip?.fontFamily?.value || defaultStyle.tooltip.tooltipContainer.fontFamily,
      },
    },
    grid: {
      top: "15%",
      left: "15%",
      right: "15%",
      bottom: "15%",
    },
    legend: {
      data: yKeys,
      left: styles?.legend?.placement?.value || 'right',
      orient: 'vertical',
      padding: [20, 0, 0, 0],
      textStyle: {
        color: styles?.legend?.textColor?.value || defaultStyle.legend.color,
        fontFamily: styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily,
      },
      formatter: function (name) {
        return name.length > 10 ? name.slice(0, 10) + "..." : name;
      }
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 100,
        bottom: 10,
        height: 15,
      },
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ],
    title: {
      show: styles?.chartTitle?.view?.value !== false && defaultStyle.chartTitle.view !== false ? true : false,
      text: styles?.chartTitle?.value?.value || defaultStyle.chartTitle.text,
      left: 'center',
      textStyle: {
        color: styles?.chartTitle?.color?.value || defaultStyle.chartTitle.color,
        fontSize: styles?.chartTitle?.fontSize?.value || defaultStyle.chartTitle.fontSize,
        fontFamily: styles?.chartTitle?.fontFamily?.value || defaultStyle.chartTitle.fontFamily,
        fontWeight: styles?.chartTitle?.fontWeight?.value || defaultStyle.chartTitle.fontWeight,
      },
    },
    backgroundColor: styles?.chartContainer?.backgroundImage?.value?.url
    ? {
        image: styles.chartContainer.backgroundImage?.value?.url,
        // repeat: 'no-repeat',
      }
    : styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor,
    xAxis: {
      type: 'category',
      data: labels,
      name: styles?.xAxis?.title?.view?.value !== false ? styles?.xAxis?.title?.value?.value || defaultStyle.xAxis.title.value : null,
      nameLocation: 'center',
      nameTextStyle: {
        padding: [15, 0, 0, 0],
        color: styles?.xAxis?.title?.color?.value || defaultStyle.xAxis.title.color,
        fontSize: styles?.xAxis?.title?.fontSize?.value || defaultStyle.xAxis.title.fontSize,
        fontFamily: styles?.xAxis?.title?.fontFamily?.value || defaultStyle.xAxis.title.fontFamily,
      },
      axisLabel: {
        rotate: styles?.xAxis?.tickLabel?.rotation?.value || 0,
        color: styles?.xAxis?.tickLabel?.color?.value || defaultStyle.xAxis.tickLabel.color,
        fontFamily: styles?.xAxis?.tickLabel?.fontFamily?.value || defaultStyle.xAxis.tickLabel.fontFamily,
        fontSize: styles?.xAxis?.tickLabel?.fontSize?.value || defaultStyle.xAxis.tickLabel.fontSize,
      },
      axisLine: {
        lineStyle: {
          color: styles?.xAxis?.axisLine?.color?.value || defaultStyle.xAxis.axisLine.color,
        },
      },
      axisTick: {
        lineStyle: {
          color: styles?.xAxis?.axisTick?.color?.value || defaultStyle.xAxis.axisTick.color,
        },
      },
    },
    yAxis: {
      type: 'value',
      name: styles?.yAxis?.title?.view?.value !== false ? styles?.yAxis?.title?.value?.value || defaultStyle.yAxis.title.value : null,
      nameLocation: 'center',
      nameTextStyle: {
        padding: [0, 0, 15, 0],
        color: styles?.yAxis?.title?.color?.value || defaultStyle.yAxis.title.color,
        fontSize: styles?.yAxis?.title?.fontSize?.value || defaultStyle.yAxis.title.fontSize,
        fontFamily: styles?.yAxis?.title?.fontFamily?.value || defaultStyle.yAxis.title.fontFamily,
      },
      axisLabel: {
        color: styles?.yAxis?.tickLabel?.color?.value || defaultStyle.yAxis.tickLabel.color,
        fontFamily: styles?.yAxis?.tickLabel?.fontFamily?.value || defaultStyle.yAxis.tickLabel.fontFamily,
        fontSize: styles?.yAxis?.tickLabel?.fontSize?.value || defaultStyle.yAxis.tickLabel.fontSize,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: styles?.yAxis?.axisLine?.color?.value || defaultStyle.yAxis.axisLine.color,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: styles?.yAxis?.axisTick?.color?.value || defaultStyle.yAxis.axisTick.color,
        },
      },
      splitLine: {
        show: styles?.gridLine?.view?.value !== false && defaultStyle.gridLine.view !== false ? true : false,
        lineStyle: {
          color: styles?.gridLine?.color?.value || defaultStyle.gridLine.color,
          opacity: styles?.gridLine?.opacity?.value || defaultStyle.gridLine.opacity,
        },
      },
    },

    series: datasets
  };
  // dispose the chart if already exists
  if (chart) {
    chart.dispose();
  }
  // create a new chart
  const chartDom = document.getElementById(options.id);

  chartDom.style.width = `${styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width}px`;
  chartDom.style.height = `${styles?.chartContainer?.height?.value || defaultStyle.chartContainer.height}px`;
  chartDom.style.backgroundSize = "cover";
  // chartDom.style.backgroundImage = `url(${styles?.chartContainer?.backgroundImage?.value?.url || defaultStyle.backgroundImage.url})`;
  // chartDom.style.backgroundRepeat = 'no-repeat';
  // chartDom.style.backgroundSize = 'cover';
  // chartDom.style.backgroundPosition = 'center'; 
  // chartDom.style.backgroundColor = styles?.chartColor?.backgroundColor?.value || defaultStyle.chartColor.backgroundColor;

  chart = echarts.init(chartDom);
  chart.setOption(option);
  if (styles && styles?.chartContainer?.width?.value  !== 0) {
    chart.resize({ width: `${styles?.chartContainer?.width?.value}px` });
  }
  // resize the chart on window resize
  window.addEventListener('resize', function () {
    chart.resize();
  });
  return chart;
}
