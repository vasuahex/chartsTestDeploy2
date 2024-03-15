"use client";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { getCodeFromDB } from "../../libs/db";
import { drawColumnChart } from "../../charts/ColumnChart";
import columnChartStyles from "../../charts/ColumnChart/styles.json";
import areaChartData from "../../charts/AreaChart/data.json";
import areaChartStyles from "../../charts/AreaChart/styles.json";
import pieChartStyles from "../../charts/PieChart/styles.json";
import { DrawAreaChart } from "../../charts/AreaChart";
import { DrawPieChart } from "../../charts/PieChart";
import { DrawScatterPlot } from "../../charts/ScatteredPlot/index";
import { DrawMultiLineChart } from "../../charts/MultiLineChart";
import { DrawCalendarChart } from "../../charts/CalendarChart";
// import { DrawRadarChart } from "../../charts/RadarChart"
import columnChartData from "../../charts/ColumnChart/data.json";
import pieChartData from "../../charts/PieChart/data.json";
import scatterPlotData from "../../charts/ScatteredPlot/data.json";
import multiLineChartData from "../../charts/MultiLineChart/data.json";
// import radarChartData from "../../charts/RadarChart/data.json"
import calenderChartData from "../../charts/CalendarChart/data.json";
import graphPlotChartData from "../../charts/GraphPlotChart/data.json";
import scatterPlotStyles from "../../charts/ScatteredPlot/styles.json";
import multiLineChartStyles from "../../charts/MultiLineChart/styles.json";
import radarChartStyles from "../../charts/RadarChart/styles.json"
import calendarChartStyles from "../../charts/CalendarChart/styles.json";
import graphPlotStyles from "../../charts/GraphPlotChart/styles.json";
import { useAppSelector } from "../../libs/redux/redux-hooks";
import { makeStyles } from "@mui/styles";
import { DrawGraphPlotChart } from "@/charts/GraphPlotChart";

const useStyles = makeStyles({
  tableContainer: {
    margin:"10px",
    borderCollapse: "collapse",
    fontFamily: "Roboto Slab",
    width: "100%",
    overflow: "auto",
  },
  tableHeader: {
    padding: "8px",
    textAlign: "center",
    color: "#000",
    fontFamily: "Roboto Slab",
    fontWeight: "bold",
    border: " 2px solid #D1D1D1",
  },
  tableRow: {
    textAlign: "center",
    color: "#000",
    fontFamily: "Roboto Slab",
    fontWeight: "200",
    border: " 1px solid #D1D1D1",
    position: "relative",
  },
  seeMoreButton: {
    margin: "10px",
    backgroundColor: "#52C7FF",
    color: "#fff",
    border: "0",
    padding: "5px",
  },
});

const EditableTable = () => {
  const classes = useStyles();
  const { id } = useParams();
  const getDataForChart = () => {
    switch (id) {
      case "area-chart":
        return areaChartData as any;
      case "column-chart":
        return columnChartData as any;
      case "scatter-plot":
        return scatterPlotData as any;
      case "pie-chart":
        return pieChartData as any;
      case "multi-line-chart":
        return multiLineChartData as any;
      case "calendar-chart":
        return calenderChartData as any;
        // case "radar-chart":
        //   return radarChartData as any;
      case "graph-plot-chart":
        return graphPlotChartData as any;
      default:
        return null;
    }
  };

  const [defaultData, setDefaultData] = useState<any>();
  const [editedData, setEditedData] = useState<any>();
  const [rowsToShow, setRowsToShow] = useState<number>(10);
  const [chartData, setChartData] = useState<any>();
  const keysXArray = useAppSelector((state) => state.chartConfig.keysXArray);
  const keysYArray = useAppSelector((state) => state.chartConfig.keysYArray);

  const [activeCell, setActiveCell] = useState<{
    rowIndex: number;
    colIndex: number;
  } | null>(null);
  const [activeSourceCell, setActiveSourceCell] = useState<{
    rowIndex: number;
    colIndex: number;
  } | null>(null);
  const [xValue, setXValue] = useState<any>("genre" || []);
  const [yValue, setYValue] = useState<any>("na_sales" || []);
  useEffect(() => {
    setXValue(keysXArray);
    setYValue(keysYArray);
  }, [keysXArray, keysYArray, editedData]);

  const [selectedXAxis, setSelectedXAxis] = useState<any[]>([]);
  const [selectedYAxis, setSelectedYAxis] = useState<any[]>([]);
  console.log("selectedYAxis", selectedYAxis);

  useEffect(() => {
    const data = getDataForChart();
    setDefaultData(data);

    const chartDataArray: any[] = [];
    data?.data?.forEach((item: any) => {
      const chartData = {
        genre: item.genre,
        na_sales: item.na_sales,
      };
      chartDataArray.push(chartData);
    });
    setChartData(chartDataArray);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (id === "area-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        DrawAreaChart(options, chartData, areaChartStyles);
      } else if (id === "column-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        drawColumnChart(options, chartData, columnChartStyles);
      } else if (id === "scatter-plot") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        DrawScatterPlot(options, chartData, scatterPlotStyles);
      }  else if (id === "pie-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        const pieChartData = chartData?.map((item: any) => ({
          name: item.genre,
          value: item.na_sales,
          hidden: false,
        }))
        console.log("chartData",chartData);
        
        DrawPieChart(options, pieChartData, pieChartStyles);
      } else if (id === "multi-line-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        DrawMultiLineChart(options, chartData, multiLineChartStyles);
      } else if (id === "calendar-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        DrawCalendarChart(options, chartData, calendarChartStyles);
      } else if (id === "graph-plot-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
          filters: [],
        };
        DrawGraphPlotChart(options, chartData,graphPlotStyles );
      }
  //      else if (id === "radar-chart") {
  //       const options = {
  //         id: id,
  //         dimensions: [],
  //         measures: [],
  //         filters: [],
  //       };
  //       DrawRadarChart(options, chartData, radarChartStyles);
     
  // } 
},0)
    return () => clearTimeout(timeoutId);
  }, [id, defaultData]);

  const renderTable = (dataToDisplay: any) => {
    if (
      !dataToDisplay ||
      !dataToDisplay.data ||
      dataToDisplay.data.length === 0
    ) {
      // Display default content or message
      return <div>No data to display.</div>;
    }

    return (
      <Grid item mt={2}>
        <table className={classes.tableContainer}>
          <thead>
            <tr>
              {Object.keys(dataToDisplay.data[0]).map(
                (header: any, index: number) => (
                  <th key={index} className={classes.tableHeader}>
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.data
              .slice(0, rowsToShow)
              .map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell: any, colIndex: number) => (
                    <td key={colIndex} className={classes.tableRow}>
                      {activeCell &&
                      activeCell.rowIndex === rowIndex &&
                      activeCell.colIndex === colIndex ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleCellEdit(rowIndex, colIndex, e.target.value)
                          }
                          onBlur={handleBlur}
                          style={{ width: "100px", textAlign: "center" }}
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {cell}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {dataToDisplay.data.length > rowsToShow && (
          <Grid item xs={12} textAlign="center">
            <button onClick={handleSeeMore} className={classes.seeMoreButton}>
              See More
            </button>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderSourceTable = (editedData: any) => {
    const columns = editedData?.columns;

    return (
      <Grid item mt={2}>
        <table
          className={classes.tableContainer}
        >
          <thead>
            <tr>
              {columns?.map((header: any, index: number) => (
                <th
                  key={index}
                  className={classes.tableHeader}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editedData
              ?.slice(0, rowsToShow)
              ?.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {columns?.map((header: any, colIndex: number) => (
                    <td
                      key={colIndex}
                      className={classes.tableRow}
                    >
                      {activeSourceCell &&
                      activeSourceCell.rowIndex === rowIndex &&
                      activeSourceCell.colIndex === colIndex ? (
                        <input
                          type="text"
                          value={row[header]}
                          onChange={(e) =>
                            handleSourceCellEdit(
                              rowIndex,
                              colIndex,
                              e.target.value
                            )
                          }
                          onBlur={handleBlur}
                        />
                      ) : (
                        <div
                          onClick={() =>
                            handleSourceCellClick(rowIndex, colIndex)
                          }
                        >
                          {row[header]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {editedData?.length > rowsToShow && (
          <Grid item xs={12} textAlign="center">
            <button
              onClick={handleSeeMore}
             className={classes.seeMoreButton}
            >
              See More
            </button>
          </Grid>
        )}
      </Grid>
    );
  };
  useEffect(() => {
    getCodeFromDB("SourceData")
    .then((code) => {
        if (code) {
          setEditedData(code);
        } else {
          console.log("Code not found for the given id:", id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, []);

  const handleSeeMore = () => {
    setRowsToShow((prevRows) => prevRows + 10);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setActiveCell({ rowIndex, colIndex });
  };

  const handleSourceCellClick = (rowIndex: number, colIndex: number) => {
    setActiveSourceCell({ rowIndex, colIndex });
  };

  const handleBlur = () => {
    setActiveCell(null);
  };

  const handleCellEdit = (
    rowIndex: number,
    colIndex: number,
    newValue: any
  ) => {
    if (defaultData) {
      const updatedDefaultData = JSON.parse(JSON.stringify(defaultData?.data));
      updatedDefaultData[rowIndex][
        Object.keys(updatedDefaultData[rowIndex])[colIndex]
      ] = newValue;
      let updatedXAxisDefault;
      let updatedYAxisDefault;
      if (xValue.lenght !== 0 && yValue.length !== 0) {
        updatedXAxisDefault = updatedDefaultData.map(
          (item: any) => item[xValue]
        );
        const chartData = updatedXAxisDefault.map((xVal: any) => {
          const item = updatedDefaultData.find(
            (dataItem: any) => dataItem[xValue] === xVal
          );

          const flatObject: { [key: string]: any } = { xValue: xVal };
          yValue.forEach((key: string) => {
            if (item && item[key] !== undefined) {
              flatObject[key] = item[key];
            }
          });

          return item ? flatObject : null;
        });
        setChartData(chartData);
        setDefaultData({ ...defaultData, data: updatedDefaultData });
      } else {
        updatedXAxisDefault = updatedDefaultData.map(
          (item: any) => item["genre"]
        );
        updatedYAxisDefault = updatedDefaultData.map(
          (item: any) => item["na_sales"]
        );

        setSelectedXAxis(updatedXAxisDefault);
        setSelectedYAxis(updatedYAxisDefault);
        const data = {
          xValue: updatedXAxisDefault,
          yValue: updatedYAxisDefault,
        };
        const transformedData = data.xValue.map(
          (xValue: any, index: number) => ({
            xValue,
            yValue: data.yValue[index],
          })
        );

        setChartData(transformedData);
        setDefaultData({ ...defaultData, data: updatedDefaultData });
      }
    }
  };

  const handleSourceCellEdit = async (
    rowIndex: number,
    colIndex: number,
    newValue: any
  ) => {
    if (editedData && editedData?.length > 0) {
      const newData = JSON.parse(JSON.stringify(editedData));
      newData[rowIndex][Object.keys(newData[rowIndex])[colIndex]] = newValue;
      let updatedYAxis;
      if (Array.isArray(yValue)) {
        updatedYAxis = yValue.map((key) => ({
          [key]: newData.map((item: any) => item[key]),
        }));
      } else {
        updatedYAxis = newData.map((item: any) => item[yValue]);
      }

      const updatedXAxis = newData.map((item: any) => item[xValue]);

      setSelectedXAxis(updatedXAxis);
      setSelectedYAxis(updatedYAxis);

      const columns = Object.keys(newData[0]);
      newData.columns = columns;

      setEditedData(newData);
    }
  };

  useEffect(() => {
    if (editedData && editedData?.length > 0) {
      const transformedData =
        (editedData &&
          editedData?.map((row: any) => {
            const transformedItem: { [key: string]: any } = {
              [xValue]: row[xValue],
            };
            yValue.forEach((key: any) => {
              transformedItem[key] = row[key];
            });
            return transformedItem;
          })) ||
        [];

      if (id === "column-chart") {
        const options = {
          id: id,
          dimension: xValue,
          measures: yValue,
          filtters: [],
        };
        drawColumnChart(options, transformedData, columnChartStyles);
      } else if (id === "area-chart") {
        const options = {
          id: id,
          dimension: xValue,
          measures: yValue,
        };

        DrawAreaChart(options, transformedData, areaChartStyles);
      } else if (id === "scatter-plot") {
        const options = {
          id: id,
          dimension: xValue,
          measures: yValue,
        };
        DrawScatterPlot(options, transformedData, scatterPlotStyles);
      } else if (id === "pie-chart") {
        const options = {
          id: id,
          dimension: xValue,
          measures: yValue,
        };
        DrawPieChart(options, transformedData, pieChartStyles);
      }
    }
  }, [editedData, xValue, yValue, id]);

  useEffect(() => {
    if (!editedData) {
      if (defaultData?.data) {
        const transformedData =
          (defaultData.data &&
            defaultData?.data.map((row: any) => {
              const transformedItem: { [key: string]: any } = {
                [xValue]: row[xValue],
              };

              yValue.forEach((key: any) => {
                transformedItem[key] = row[key];
              });
              return transformedItem;
            })) ||
          [];
        if (id === "column-chart") {
          const options = {
            id: id,
            dimension: xValue,
            measures: yValue,
          };
          drawColumnChart(options, transformedData, columnChartStyles);
        } else if (id === "area-chart") {
          const options = {
            id: id,
            dimension: xValue,
            measures: yValue,
          };
          DrawAreaChart(options, transformedData, areaChartStyles);
        } else if (id === "scatter-plot") {
          const options = {
            id: id,
            dimension: xValue,
            measures: yValue,
          };
          DrawScatterPlot(options, transformedData, scatterPlotStyles);
        } else if (id === "pie-chart") {
          const options = {
            id: id,
            dimension: xValue,
            measures: yValue,
          };
          DrawPieChart(options, transformedData, pieChartStyles);
        }
      }
    }
  }, [defaultData, id, chartData, xValue, yValue]);

  return (
    <Grid item xs={12} mt={2} mb={15}>
      {Array.isArray(editedData) && editedData?.length > 0
        ? renderSourceTable(editedData)
        : renderTable(defaultData)}
    </Grid>
  );
};

export default EditableTable;
