"use client"
import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs, Typography, Grid } from "@mui/material";
import ChartList from "./ChartListComponent";
import DataComponent from "./DataComponent";
import CustomStyles from "./CustomStylesComponent";
import { makeStyles } from "@mui/styles";
import AreaChartData from "../../charts/AreaChart/data.json";
import ColumnChartData from "../../charts/ColumnChart/data.json";
import AreaChartStyles from "../../charts/AreaChart/styles.json";
import ColumnChartStyles from "../../charts/ColumnChart/styles.json";
import ScatterPlotData from "../../charts/ScatteredPlot/data.json";
import ScatterPlotStyles from "../../charts/ScatteredPlot/styles.json";
import PieChartData from "../../charts/PieChart/data.json";
import PieChartStyles from "../../charts/PieChart/styles.json";
import MultiLineChartData from "../../charts/MultiLineChart/data.json";
import MultiLineChartStyles from "../../charts/MultiLineChart/styles.json";
import CalendarChartData from "../../charts/CalendarChart/data.json";
import CalendarChartStyles from "../../charts/CalendarChart/styles.json";
import GraphPlotChartData from "../../charts/GraphPlotChart/data.json";
import GraphPlotChartStyles from "../../charts/GraphPlotChart/styles.json";
import { useParams } from "next/navigation";
import headersChartsImg from "../../../public/images/headers-chart-icon.png";
import headersDataImg from "../../../public/images/headers-data-icon.png";
import headersStylesImg from "../../../public/images/headers-styles-icon.png";
import Image from "next/image";
import toast from "react-hot-toast";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    ZIndex: `${10} !important`,
  },
  appBar: {
    height: "46px",
    marginBottom: "0 !important",
    fontFamily: "Helvetica",
    justifyContent: "space-evenly",
  },
  tabIcon: {
    marginRight: "5px",
  },
  tabLabel: {
    fontFamily: "'Crimson Text', serif",
    fontSize: "12px !important",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      transition: "border 0.3s",
    },
  },
  selectedTab: {
    color: "#1795D2 !important",
    fontWeight: "bold",
  },
});

const HeaderTabs: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Check if there is a stored tab index
    const storedTabIndex = localStorage.getItem("selectedTabIndex");

    if (storedTabIndex !== null) {
      setSelectedTab(parseInt(storedTabIndex, 10));
    }
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTabIndex", newValue.toString());
  };

  const sendDataToDataComponent = () => {
    if (id === "area-chart") {
      return AreaChartData;
    } else if (id === "column-chart") {
      return ColumnChartData;
    } else if (id === "scatter-plot") {
      return ScatterPlotData;
    } else if (id === "pie-chart") {
      return PieChartData;
    } else if (id === "multi-line-chart") {
      return MultiLineChartData;
    } else if (id === "calendar-chart") {
      return CalendarChartData;
    } else if (id  === "graph-plot-chart") {
      return GraphPlotChartData;
    }
  };

  const sendStylesToCustomStylesComponent = () => {
    if (id === "area-chart") {
      return AreaChartStyles;
    } else if (id === "column-chart") {
      return ColumnChartStyles;
    } else if (id === "scatter-plot") {
      return ScatterPlotStyles;
    } else if (id === "pie-chart") {
      return PieChartStyles;
    } else if (id === "multi-line-chart") {
      return MultiLineChartStyles;
    } else if (id === "calendar-chart") {
      return CalendarChartStyles;
    } else if (id === "graph-plot-chart") {
      return GraphPlotChartStyles;
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <ChartList />;
      case 1:
        if (id !== "no-chart") {
          return <DataComponent data={sendDataToDataComponent()} />;
        } else {
          return <h1 style={{ textAlign: "center", fontSize: "20px", margin: "20px auto", color: "red" }}>Please select a chart</h1>;
        }
      case 2:
        if (id !== "no-chart") {
          return (
            <CustomStyles
              data={sendDataToDataComponent()}
              styles={sendStylesToCustomStylesComponent()}
            />
          );
        } else {
          return <h1 style={{ textAlign: "center", fontSize: "20px", margin: "20px auto", color: "red" }}>Please select a chart</h1>;
        }
      default:
        return null;
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sx={{ width: "100%" }}>
        <AppBar
          position="sticky"
          className={classes.appBar}
          sx={{
            bgcolor: "#ffffff",
            zIndex: 1,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1795D2",
              },
            }}
          >
            <Tab
              sx={{ width: "33%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${selectedTab === 0 ? classes.selectedTab : ""
                    }`}
                  style={{ textTransform: "none" }}
                >
                  <Image
                    src={headersChartsImg.src}
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "5px",
                    }}
                    height={15}
                    width={15}
                    alt="headers"
                  />
                  Charts
                </Typography>
              }
            />
            <Tab
              sx={{ width: "34%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${selectedTab === 1 ? classes.selectedTab : ""
                    }`}
                  style={{ textTransform: "none" }}

                >
                  <Image
                    src={headersDataImg.src}
                    style={{
                      width: "15px",
                      height: "13px",
                      marginRight: "5px",
                    }}
                    width={15}
                    height={13}
                    alt="headers"
                  />
                  Data
                </Typography>
              }
            // disabled={id === "no-chart"}

            />
            <Tab
              sx={{ width: "33%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${selectedTab === 2 ? classes.selectedTab : ""
                    }`}
                  style={{ textTransform: "none" }}

                >
                  {/* <FaChartLine className={classes.tabIcon} />  */}
                  <Image
                    src={headersStylesImg.src}
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "5px",
                    }}
                    width={15}
                    height={15}
                    alt="headers"
                  />
                  Customize
                </Typography>
              }
            // disabled={id === "no-chart"}
            // onClick={()=>toast.error("please select a chart")}
            />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default HeaderTabs;
