"use client"
import React, { useState, useEffect } from "react";
import { DrawAreaChart } from "../../charts/AreaChart/index";
import { makeStyles } from "@mui/styles";
import { useParams } from "next/navigation";
import { drawColumnChart } from "../../charts/ColumnChart/index";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DrawScatterPlot } from "../../charts/ScatteredPlot";
import { DrawPieChart } from "../../charts/PieChart/index";
import { DrawMultiLineChart } from "../../charts/MultiLineChart";
import { DrawCalendarChart } from "../../charts/CalendarChart";
import { useAppSelector } from "../../libs/redux/redux-hooks";
import { getCodeFromDB } from "../../libs/db";
import { DrawGraphPlotChart } from "@/charts/GraphPlotChart";
interface CustomStylesProps {
  data: any;
  styles: any;
}

type ChartData = {
  chartContainerwidth: any;
  chartContainerheight: any;
  chartColorfill: any;
  chartColorbackgroundColor: any;
  tooltiptextColor: any;
  tooltipfontSize: number;
  tooltipbgColor: any;
};

const fontFamilies = [
  "Arial",
  "Times New Roman",
  "Verdana",
  "Georgia",
  "Courier New",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
  "Lucida Console",
  "Palatino Linotype",
  "Tahoma",
  "Franklin Gothic Medium",
  "Century Gothic",
  "Garamond",
  "Book Antiqua",
  "Lucida Sans Unicode",
  "Arial Narrow",
  "Calibri",
  "Cambria",
];

const useStyles = makeStyles({
  container: {
    maxHeight: "86.2vh",
    transition: "margin-left 0.3s",
    overflowY: "auto",
    scrollbarWidth: "thin",
    padding: "0 20px 20px 20px",
    scrollbarColor: "#808080 transparent",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#808080",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
});

const CustomStyles: React.FC<CustomStylesProps> = ({ data, styles }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [dropData, setDropData] = useState<any>()

  const keysXArray: any = useAppSelector(
    (state) => state.chartConfig.keysXArray
  );
  const keysYArray: any = useAppSelector(
    (state) => state.chartConfig.keysYArray
  );
  useEffect(() => {
    getCodeFromDB("SourceData")
      .then((code) => {
        if (code) {
          setDropData(code);
          // setKeysXArray([]);
          // setKeysYArray([]);
        } else {
          console.log("Code not found for the given id:", id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, [id]);
  console.log("dropData", dropData);


  const transformedData =
    dropData ? (keysXArray?.length > 0 && keysYArray?.length > 0
      ? (dropData &&
        dropData?.map((row: any) => {
          const transformedItem: { [key: string]: any } = {
            [keysXArray]: row[keysXArray],
          };
          keysYArray.forEach((key: any) => {
            transformedItem[key] = row[key];
          });
          return transformedItem;
        })) : (dropData &&
          dropData?.map((row: any) => {
            const transformedItem: { [key: string]: any } = {
              genre: row?.genre,
              na_sales: row?.na_sales,
            };
            return transformedItem;
          }))) :
      keysXArray?.length > 0 && keysYArray?.length > 0
        ? (data &&
          data?.data?.map((row: any) => {
            const transformedItem: { [key: string]: any } = {
              [keysXArray]: row[keysXArray],
            };
            keysYArray.forEach((key: any) => {
              transformedItem[key] = row[key];
            });
            return transformedItem;
          }))
        : (data &&
          data?.data?.map((row: any) => {
            const transformedItem: { [key: string]: any } = {
              genre: row?.genre,
              na_sales: row?.na_sales,
            };
            return transformedItem;
          }));

  // console.log("keysXArray", keysXArray, keysYArray, transformedData);

  // Extract the numeric value from a string with 'px'
  const extractNumber = (stringValue: string): number => {
    return parseInt(stringValue, 10) || 0;
  };

  const [codeStyles] = useState(JSON?.stringify(styles, null, 2));
  // console.log("stylesJSON: " + styles);
  const stylesJSON = codeStyles && JSON?.parse(codeStyles);

  // Initialize state with default values or values from stylesJSON
  const [chartData, setChartData] = useState({
    chartContainerwidth:
      styles?.chartContainer?.width?.value ||
      stylesJSON?.chartContainer?.width?.value,
    chartContainerheight:
      styles?.chartContainer?.height?.value ||
      stylesJSON?.chartContainer?.height?.value,
    chartContainerbackgroundImage:
      styles?.chartContainer?.backgroundImage?.value ||
      stylesJSON?.chartContainer?.backgroundImage?.value,
    chartColorfill:
      styles?.chartColor?.fill?.value || stylesJSON?.chartColor?.fill?.value,
    chartColorbackgroundColor:
      styles?.chartColor?.backgroundColor?.value ||
      stylesJSON?.chartColor?.backgroundColor?.value,
    chartColortheme:
      styles?.chartColor?.theme?.value || stylesJSON?.chartColor?.theme?.value,
    tooltiptextColor:
      styles?.tooltip?.textColor?.value ||
      stylesJSON?.tooltip?.textColor?.value,
    tooltipfontSize: extractNumber(
      styles?.tooltip?.fontSize?.value || stylesJSON?.tooltip?.fontSize?.value
    ),
    tooltippadding: extractNumber(
      styles?.tooltip?.padding?.value || stylesJSON?.tooltip?.padding?.value
    ),
    tooltipborderWidth: extractNumber(
      styles?.tooltip?.borderWidth?.value ||
      stylesJSON?.tooltip?.borderWidth?.value
    ),
    tooltipborderRadius: extractNumber(
      styles?.tooltip?.borderRadius?.value ||
      stylesJSON?.tooltip?.borderRadius?.value
    ),
    tooltipborderColor:
      styles?.tooltip?.borderColor?.value ||
      stylesJSON?.tooltip?.borderColor?.value,
    tooltipbgColor:
      styles?.tooltip?.bgColor?.value || stylesJSON?.tooltip?.bgColor?.value,
    tooltipfontFamily:
      styles?.tooltip?.fontFamily?.value ||
      stylesJSON?.tooltip?.fontFamily?.value,
    chartTitleview:
      styles?.chartTitle?.view?.value || stylesJSON?.chartTitle?.view?.value,
    chartTitlecolor:
      styles?.chartTitle?.color?.value || stylesJSON?.chartTitle?.color?.value,
    chartTitlevalue:
      styles?.chartTitle?.value?.value || stylesJSON?.chartTitle?.value?.value,
    chartTitlefontFamily:
      styles?.chartTitle?.fontFamily?.value ||
      stylesJSON?.chartTitle?.fontFamily?.value,
    chartTitlefontSize: extractNumber(
      styles?.chartTitle?.fontSize?.value ||
      stylesJSON?.chartTitle?.fontSize?.value
    ),
    chartTitlefontWeight:
      styles?.chartTitle?.fontWeight?.value ||
      stylesJSON?.chartTitle?.fontWeight?.value,
    legendfontFamily:
      styles?.legend?.fontFamily?.value ||
      stylesJSON?.legend?.fontFamily?.value,
    legendtextColor: styles?.legned?.color?.value ||
      stylesJSON?.legned?.color?.value,
    legendplacement:
      styles?.legend?.placement?.value || stylesJSON?.legend?.placement?.value,
    pieLabelfontFamily:
      styles?.pieLabel?.fontFamily?.value ||
      stylesJSON?.legend?.fontFamily?.value,
    pieLabelfontSize: extractNumber(
      styles?.pieLabel?.fontSize?.value || stylesJSON?.pieLabel?.fontSize?.value
    ),
    pieLabelcolor:
      styles?.pieLabel?.color?.value || stylesJSON?.pieLabel?.color?.value,
    pieLabelrotation:
      styles?.pieLabel?.rotation?.value ||
      stylesJSON?.pieLabel?.rotation?.value,
    charttype: styles?.chart?.type?.value || stylesJSON?.chart?.type?.value,
    gridLineview:
      styles?.gridLine?.view?.value || stylesJSON?.gridLine?.view?.value,
    gridLineopacity:
      styles?.gridLine?.opacity?.value || stylesJSON?.gridLine?.opacity?.value,
    gridLinecolor:
      styles?.gridLine?.color?.value || stylesJSON?.gridLine?.color?.value,
    xAxistitleview:
      styles?.xAxis?.title?.view?.value ||
      stylesJSON?.xAxis?.title?.view?.value,
    xAxistitlevalue:
      styles?.xAxis?.title?.value?.value ||
      stylesJSON?.xAxis?.title?.value?.value,
    xAxistitlefontFamily:
      styles?.xAxis?.title?.fontFamily?.value ||
      stylesJSON?.xAxis?.title?.fontFamily?.value,
    xAxistitlefontSize: extractNumber(
      styles?.xAxis?.title?.fontSize?.value ||
      stylesJSON?.xAxis?.title?.fontSize?.value
    ),
    xAxistitlecolor:
      styles?.xAxis?.title?.color?.value ||
      stylesJSON?.xAxis?.title?.color?.value,
    xAxisaxisLinecolor:
      styles?.xAxis?.axisLine?.color?.value ||
      stylesJSON?.xAxis?.axisLine?.color?.value,
    xAxisaxisTickcolor:
      styles?.xAxis?.axisTick?.color?.value ||
      stylesJSON?.xAxis?.axisTick?.color?.value,
    xAxistickLabeltextAnchor:
      styles?.xAxis?.tickLabel?.textAnchor?.value ||
      stylesJSON?.xAxis?.tickLabel?.textAnchor?.value,
    xAxistickLabelcolor:
      styles?.xAxis?.tickLabel?.color?.value ||
      stylesJSON?.xAxis?.tickLabel?.color?.value,
    xAxistickLabelfontFamily:
      styles?.xAxis?.tickLabel?.fontFamily?.value ||
      stylesJSON?.xAxis?.tickLabel?.fontFamily?.value,
    xAxistickLabelrotation:
      styles?.xAxis?.tickLabel?.rotation?.value ||
      stylesJSON?.xAxis?.tickLabel?.rotation?.value,
    xAxistickLabelfontSize: extractNumber(
      styles?.xAxis?.tickLabel?.fontSize?.value ||
      stylesJSON?.xAxis?.tickLabel?.fontSize?.value
    ),
    yAxistitleview:
      styles?.yAxis?.title?.view?.value ||
      stylesJSON?.yAxis?.title?.view?.value,
    yAxistitlevalue:
      styles?.yAxis?.title?.value?.value ||
      stylesJSON?.yAxis?.title?.value?.value,
    yAxistitlefontFamily:
      styles?.yAxis?.title?.fontFamily?.value ||
      stylesJSON?.yAxis?.title?.fontFamily?.value,
    yAxistitlefontSize: extractNumber(
      styles?.yAxis?.title?.fontSize?.value ||
      stylesJSON?.yAxis?.title?.fontSize?.value
    ),
    yAxistitlecolor:
      styles?.yAxis?.title?.color?.value ||
      stylesJSON?.yAxis?.title?.color?.value,
    yAxisaxisLinecolor:
      styles?.yAxis?.axisLine?.color?.value ||
      stylesJSON?.yAxis?.axisLine?.color?.value,
    yAxisaxisTickcolor:
      styles?.yAxis?.axisTick?.color?.value ||
      stylesJSON?.yAxis?.axisTick?.color?.value,
    yAxistickLabelcolor:
      styles?.yAxis?.tickLabel?.color?.value ||
      stylesJSON?.Axis?.tickLabel?.color?.value,
    yAxistickLabelfontFamily:
      styles?.yAxis?.tickLabel?.fontFamily?.value ||
      stylesJSON?.yAxis?.tickLabel?.fontFamily?.value,
    yAxistickLabelrotation:
      styles?.yAxis?.tickLabel?.rotation?.value ||
      stylesJSON?.yAxis?.tickLabel?.rotation?.value,
    yAxistickLabelfontSize: extractNumber(
      styles?.yAxis?.tickLabel?.fontSize?.value ||
      stylesJSON?.yAxis?.tickLabel?.fontSize?.value
    ),
  });

  const handleInputChange = (
    property: string,
    value: string | File | null | undefined
  ) => {
    if (value instanceof File) {
      // Handle image upload
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = {
          url: reader.result,
          file: value,
        };

        setChartData((prevData) => ({
          ...prevData,
          [property]: imageData,
        }));
      };

      if (value) {
        reader.readAsDataURL(value);
      }
    } else if (value === null) {
      // Handle image cancellation
      setChartData((prevData) => ({
        ...prevData,
        [property]: null,
      }));
    } else {
      // Handle other inputs
      setChartData((prevData) => ({
        ...prevData,
        [property]: value,
      }));
    }
  };

  useEffect(() => {
    const handleRunChart = () => {
      try {
        const chartConfig = {
          "area-chart": {
            drawFunction: DrawAreaChart,
            hasAxes: true,
          },
          "column-chart": {
            drawFunction: drawColumnChart,
            hasAxes: true,
          },
          "scatter-plot": {
            drawFunction: DrawScatterPlot,
            hasAxes: true,
          },
          "pie-chart": {
            drawFunction: DrawPieChart,
            hasAxes: false,
          },
          "multi-line-chart": {
            drawFunction: DrawMultiLineChart,
            hasAxes: true,
          },
          "calendar-chart": {
            drawFunction: DrawCalendarChart,
            hasAxes: false,
          },
          "graph-plot-chart": {
            drawFunction: DrawGraphPlotChart,
            hasAxes: true,
          },
          // Add more chart types as needed
        };

        const chartTypeConfig =
          chartConfig[id as keyof typeof chartConfig];

        if (chartTypeConfig) {
          const { drawFunction, hasAxes } = chartTypeConfig;
          stylesJSON.chartContainer.width.value = Number(
            chartData.chartContainerwidth
          );
          stylesJSON.chartContainer.height.value = Number(
            chartData.chartContainerheight
          );
          stylesJSON.chartContainer.backgroundImage.value =
            chartData.chartContainerbackgroundImage;
          stylesJSON.chartColor.backgroundColor.value =
            chartData.chartColorbackgroundColor;
          stylesJSON.tooltip.fontSize.value = chartData.tooltipfontSize + "px";
          stylesJSON.tooltip.padding.value = chartData.tooltippadding + "px";
          stylesJSON.tooltip.borderWidth.value =
            chartData.tooltipborderWidth + "px";
          stylesJSON.tooltip.borderRadius.value =
            chartData.tooltipborderRadius + "px";
          stylesJSON.tooltip.textColor.value = chartData.tooltiptextColor;
          stylesJSON.tooltip.borderColor.value = chartData.tooltipborderColor;
          stylesJSON.tooltip.bgColor.value = chartData.tooltipbgColor;
          stylesJSON.tooltip.fontFamily.value = chartData.tooltipfontFamily;
          stylesJSON.chartTitle.view.value = chartData.chartTitleview;
          stylesJSON.chartTitle.color.value = chartData.chartTitlecolor;
          stylesJSON.chartTitle.value.value = chartData.chartTitlevalue;
          stylesJSON.chartTitle.fontFamily.value =
            chartData.chartTitlefontFamily;
          stylesJSON.chartTitle.fontSize.value =
            chartData.chartTitlefontSize + "px";
          stylesJSON.chartTitle.fontWeight.value =
            chartData.chartTitlefontWeight;
          stylesJSON.legend.fontFamily.value = chartData.legendfontFamily;
          stylesJSON.legend.textColor.value = chartData.legendtextColor;
          stylesJSON.legend.placement.value = chartData.legendplacement;
          console.log("chartData: ", chartData);

          // stylesJSON.legend.fontSize.value = chartData.legendfontSize + "px";
          if (hasAxes) {
            if (id !== "multi-line-chart") {
              stylesJSON.chartColor.fill.value = chartData.chartColorfill;
            }
            stylesJSON.xAxis.title.view.value = chartData.xAxistitleview;
            stylesJSON.xAxis.title.value.value = chartData.xAxistitlevalue;
            stylesJSON.xAxis.title.fontSize.value =
              chartData.xAxistitlefontSize + "px";
            stylesJSON.xAxis.title.fontFamily.value =
              chartData.xAxistitlefontFamily;
            stylesJSON.xAxis.title.color.value = chartData.xAxistitlecolor;
            stylesJSON.xAxis.axisLine.color.value =
              chartData.xAxisaxisLinecolor;
            stylesJSON.xAxis.axisTick.color.value =
              chartData.xAxisaxisTickcolor;
            stylesJSON.xAxis.tickLabel.textAnchor.value =
              chartData.xAxistickLabeltextAnchor;
            stylesJSON.xAxis.tickLabel.color.value =
              chartData.xAxistickLabelcolor;
            stylesJSON.xAxis.tickLabel.fontFamily.value =
              chartData.xAxistickLabelfontFamily;
            stylesJSON.xAxis.tickLabel.fontSize.value =
              chartData.xAxistickLabelfontSize + "px";
            stylesJSON.xAxis.tickLabel.rotation.value =
              chartData.xAxistickLabelrotation;
            stylesJSON.yAxis.title.view.value = chartData.yAxistitleview;
            stylesJSON.yAxis.title.value.value = chartData.yAxistitlevalue;
            stylesJSON.yAxis.title.fontSize.value =
              chartData.yAxistitlefontSize + "px";
            stylesJSON.yAxis.title.fontFamily.value =
              chartData.yAxistitlefontFamily;
            stylesJSON.yAxis.title.color.value = chartData.yAxistitlecolor;
            stylesJSON.yAxis.axisLine.color.value =
              chartData.yAxisaxisLinecolor;
            stylesJSON.yAxis.axisTick.color.value =
              chartData.yAxisaxisTickcolor;
            stylesJSON.yAxis.tickLabel.color.value =
              chartData.yAxistickLabelcolor;
            stylesJSON.yAxis.tickLabel.fontFamily.value =
              chartData.yAxistickLabelfontFamily;
            stylesJSON.yAxis.tickLabel.fontSize.value =
              chartData.yAxistickLabelfontSize + "px";
            stylesJSON.gridLine.view.value = chartData.gridLineview;
            stylesJSON.gridLine.color.value = chartData.gridLinecolor;
            stylesJSON.gridLine.opacity.value = chartData.gridLineopacity;
          } else if (!hasAxes) {
            stylesJSON.chartColor.theme.value = chartData.chartColortheme;
            stylesJSON.pieLabel.fontFamily.value = chartData.pieLabelfontFamily;
            stylesJSON.pieLabel.fontSize.value =
              chartData.pieLabelfontSize + "px";
            stylesJSON.pieLabel.rotation.value = chartData.pieLabelrotation;
            stylesJSON.pieLabel.color.value = chartData.pieLabelcolor;
            stylesJSON.chart.type.value = chartData.charttype;
          }
          if (id === "pie-chart") {
            const transformedPieData =
              keysXArray?.length > 0 && keysYArray?.length > 0
                ? (dropData ?
                  dropData?.map((row: any) => {
                      const transformedItem: { [key: string]: any } = {
                        [keysXArray]: row[keysXArray],
                        hidden: false,
                      };
                      keysYArray.forEach((key: any) => {
                        transformedItem[key] = row[key];
                      });
                      return transformedItem;
                    }):data && data?.data?.map((row: any) => {
                      const transformedItem: { [key: string]: any } = {
                        [keysXArray]: row[keysXArray],
                        hidden: false,
                      };
                      keysYArray.forEach((key: any) => {
                        transformedItem[key] = row[key];
                      });
                      return transformedItem;
                    })) ||
                  []
                : (data &&
                  data?.data?.map((row: any) => {
                    const transformedItem: { [key: string]: any } = {
                      genre: row?.genre,
                      na_sales: row?.na_sales,
                      hidden: false,
                    };
                    return transformedItem;
                  })) ||
                [];

            const options = {
              id: id,
              dimension: keysXArray,
              measures: keysYArray,
              filters: [],
            };
            drawFunction(options, transformedPieData, stylesJSON);
          } else {
            const options = {
              id: id,
              dimension: keysXArray,
              measures: keysYArray,
              filters: [],
            };
            drawFunction(options, transformedData, stylesJSON);
          }
        } else {
          console.error("Invalid chart type:", id);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    handleRunChart();
  }, [
    codeStyles,
    id,
    data,
    transformedData,
    chartData,
    keysXArray,
    keysYArray,
  ]);

  const renderFormFields = <T extends keyof ChartData>(
    data: any,
    parentKey = ""
  ) => {
    const isImageUpload = parentKey.toLowerCase().includes("backgroundimage");
    const isColorPicker =
      (parentKey.toLowerCase().includes("color") &&
        !parentKey.toLowerCase().includes("theme")) ||
      parentKey.toLowerCase().includes("fill");
    const isSelector =
      parentKey.toLowerCase().includes("fontweight") ||
      parentKey.toLowerCase().includes("rotation") ||
      parentKey.toLowerCase().includes("fontsize") ||
      parentKey.toLowerCase().includes("radius") ||
      parentKey.toLowerCase().includes("padding") ||
      parentKey.toLowerCase().includes("borderwidth") ||
      parentKey.toLowerCase().includes("opacity") ||
      parentKey.toLowerCase().includes("textanchor") ||
      parentKey.toLowerCase().includes("placement") ||
      parentKey.toLowerCase().includes("theme") ||
      parentKey.toLowerCase().includes("charttype") ||
      parentKey.toLowerCase().includes("position") ||
      parentKey.toLowerCase().includes("fontfamily");
    const isBoolean = parentKey.toLowerCase().includes("view");
    return Object.entries(data).map(([key, value]: [string, any]) => {
      // console.log("stylesJSON", stylesJSON);
      // console.log("data: ", data);
      // console.log("propertyPath: " + propertyPath);
      // console.log("parentKey: " + parentKey);
      const propertyPath = (parentKey + key) as T;

      if (typeof value === "object") {
        return (
          <div key={propertyPath}>
            <Typography
              sx={{
                // pl: 1.5,
                fontWeight: "bold",
                fontSize: value?.displayNameHead ? "13px" : "12px",
                mt: value?.displayNameHead
                  ? 3
                  : value?.displayNameSubHead
                    ? 1
                    : 0,
              }}
            >
              {value?.displayNameHead || value?.displayNameSubHead}
            </Typography>
            <Grid container gap={1} sx={{}}>
              {renderFormFields(value, propertyPath)}
            </Grid>
          </div>
        );
      } else if (key.toLowerCase() === "value" && typeof value !== "object") {
        return (
          <Grid key={propertyPath}>
            {isImageUpload ? (
              <FormControl>
                <InputLabel sx={{ fontSize: "10px" }}>
                  {data?.displayName}
                </InputLabel>
                <br />
                <br />
                <TextField
                  type="file"
                  inputProps={{
                    accept: ".png, .jpg, .jpeg"
                  }}
                  onChange={(e) => {
                    const selectedFile = (e.target as HTMLInputElement)
                      .files?.[0];
                    handleInputChange(parentKey, selectedFile);
                  }}
                  size="small"
                  sx={{ width: "160px" }}
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{
                    style: { fontSize: "12px" },
                    endAdornment: (
                      <>
                        {(chartData as any)[parentKey] && (
                          <IconButton
                            aria-label="Cancel"
                            onClick={() => handleInputChange(parentKey, null)}
                            size="small"
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      </>
                    ),
                  }}
                />
              </FormControl>
            ) : isColorPicker ? (
              <FormControl sx={{ minWidth: 160, mt: 2 }}>
                <TextField
                  label={data?.displayName}
                  type="color"
                  value={chartData[parentKey as keyof typeof chartData]}
                  onChange={(e) => handleInputChange(parentKey, e.target.value)}
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{
                    style: { fontSize: "12px" },
                  }}
                />
              </FormControl>
            ) : isSelector ? (
              <FormControl sx={{ minWidth: 160, mt: 2 }}>
                <InputLabel sx={{ fontSize: "12px" }}>
                  {data?.displayName}
                </InputLabel>
                <Select
                  value={chartData[parentKey as keyof typeof chartData]}
                  label={data?.displayName}
                  onChange={(e) => handleInputChange(parentKey, e.target.value)}
                  size="small"
                  sx={{ maxHeight: 35, fontSize: "12px" }}
                >
                  {parentKey.toLowerCase().includes("fontfamily")
                    ? fontFamilies?.map((fontFamily, index) => (
                      <MenuItem
                        key={index}
                        value={fontFamily}
                        sx={{ fontSize: "12px" }}
                      >
                        {fontFamily}
                      </MenuItem>
                    ))
                    : parentKey?.toLowerCase()?.includes("fontweight")
                      ? ["normal", "bold"]?.map((fontWeight) => (
                        <MenuItem key={fontWeight} value={fontWeight}>
                          <Typography sx={{ fontSize: "12px" }}>
                            {fontWeight?.toUpperCase()}
                          </Typography>
                        </MenuItem>
                      ))
                      : parentKey.toLowerCase().includes("opacity")
                        // @ts-ignore
                        ? [...Array(11).keys()]?.map((index) => (
                          <MenuItem key={index} value={index / 10}>
                            <Typography sx={{ fontSize: "12px" }}>
                              {(index / 10).toFixed(1)}
                            </Typography>
                          </MenuItem>
                        ))
                        : parentKey.toLowerCase().includes("textanchor")
                          ? ["start", "middle", "end"]?.map((textanchor) => (
                            <MenuItem key={textanchor} value={textanchor}>
                              <Typography sx={{ fontSize: "12px" }}>
                                {textanchor?.toUpperCase()}
                              </Typography>
                            </MenuItem>
                          ))
                          : parentKey.toLowerCase().includes("placement")
                            ? ["left", "right"]?.map((placement) => (
                              <MenuItem key={placement} value={placement}>
                                <Typography sx={{ fontSize: "12px" }}>
                                  {placement?.toUpperCase()}
                                </Typography>
                              </MenuItem>
                            ))
                            : parentKey.toLowerCase().includes("position")
                              ? ["left", "right"]?.map((position) => (
                                <MenuItem key={position} value={position}>
                                  <Typography sx={{ fontSize: "12px" }}>
                                    {position?.toUpperCase()}
                                  </Typography>
                                </MenuItem>
                              ))
                              : parentKey.toLowerCase().includes("theme")
                                ? ["schema1", "schema2", "schema3"].map((theme) => (
                                  <MenuItem key={theme} value={theme}>
                                    <Typography sx={{ fontSize: "12px" }}>
                                      {theme}
                                    </Typography>
                                  </MenuItem>
                                ))
                                : parentKey.toLowerCase().includes("charttype")
                                  ? ["pie", "donut"].map((type) => (
                                    <MenuItem key={type} value={type}>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        {type}
                                      </Typography>
                                    </MenuItem>
                                  ))
                                  : parentKey.toLowerCase().includes("rotation")
                                    ? [-1, 0, 1].map((index) => (
                                      <MenuItem key={index} value={index * 45}>
                                        <Typography sx={{ fontSize: "12px" }}>
                                          {`${index * 45}°`}
                                        </Typography>
                                      </MenuItem>
                                    ))
                                    // @ts-ignore
                                    : [...Array(96).keys()].map((size) => (
                                      <MenuItem key={size} value={size + 1}>
                                        <Typography sx={{ fontSize: "12px" }}>
                                          {size + 1}px
                                        </Typography>
                                      </MenuItem>
                                    ))}
                </Select>
              </FormControl>
            ) : isBoolean ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chartData[parentKey as keyof typeof chartData]}
                    onChange={(e: any) =>
                      handleInputChange(parentKey, e.target.checked)
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "12px" }}>
                    Show{" "}
                    {parentKey.toLowerCase().includes("charttitle")
                      ? "Chart Title"
                      : parentKey.toLowerCase().includes("axistitle")
                        ? "Axis Title"
                        : parentKey.toLowerCase().includes("tick")
                          ? "Axis Tick Label"
                          : "Grid Lines"}
                  </Typography>
                }
                sx={{
                  fontSize: "12px",
                  minWidth: 160,
                  mt: 1.5,
                  mx: "auto",
                }}
              />
            ) : (
              <FormControl sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                  label={data?.displayName}
                  value={chartData[parentKey as keyof typeof chartData]}
                  onChange={(e) => handleInputChange(parentKey, e.target.value)}
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "12px" },
                  }}
                  InputProps={{
                    style: { fontSize: "12px" },
                  }}
                />
              </FormControl>
            )}
          </Grid>
        );
      }
    });
  };

  // console.log("styles", styles);
  // console.log("stylesJSON", stylesJSON);
  // console.log("chartData", chartData);

  return (
    <Grid className={classes.container}>{renderFormFields(stylesJSON)}</Grid>
  );
};

export default CustomStyles;
