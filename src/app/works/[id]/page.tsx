"use client";
import { useEffect, useRef, useState } from "react";
import { DrawAreaChart } from "../../../charts/AreaChart/index.js";
import { drawColumnChart } from "../../../charts/ColumnChart/index.js";
import { useParams } from "next/navigation";
import {
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Modal,
  Paper,
} from "@mui/material";
import { DrawMultiLineChart } from "../../../charts/MultiLineChart/index.js";
import { DrawCalendarChart } from "../../../charts/CalendarChart/index.js";
import{DrawScatterPlot} from "../../../charts/ScatteredPlot";
import { DrawPieChart } from "@/charts/PieChart/index.js";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import ShareButtonImage from "../../../../public/images/ShareButtonImage.png";
import DownloadButtonImage from "../../../../public/images/DownloadButtonImage.png";
// import  from "../../../components/work/EditableTable.js";
import EditableTable from "@/components/work/EditableTable";
// import Navbar from "@/components/Navbar";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
// import EditableTable from "@/components/EditableTable";
import SavedChartsListComponent from "@/components/savedChartsList";
import StickyIconComponent from "@/components/stickyComponent";
import SocialShareComponent from "@/components/socialShare";

const useStyles = makeStyles({
  zoomConatainer: {
    border: "1px solid #D1D1D1",
    width: "70px",
    height: "30px",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#888",
    fontFamily: "Roboto Slab",
    fontSize: "14px",
    cursor: "pointer",
    padding: "5px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    outline: "none", // Remove outline
    padding: "2px",
    height: 140,
    width: 420,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background color
    border: "2px solid #000000", // Black border
  },
});

const ChartBuilder = () => {
  const classes = useStyles();
  const { id } = useParams();
  const url = location?.href ? location?.href : null;
  const chartRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [share, setShare] = useState(false);
  const [view, setView] = useState("table");
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1); // Increase zoom level
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel(zoomLevel - 0.1); // Decrease zoom level
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (id === "area-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
        };
        DrawAreaChart(options);
      } else if (id === "column-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
        };
        drawColumnChart(options);
      }else if (id === "scatter-plot") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
        };
        DrawScatterPlot(options);
      }else if (id === "pie-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
        };
        DrawPieChart(options);
      }
       else if (id === "multi-line-chart") {
        const options = {
          id: id,
          dimensions: [],
          measures: [],
        };
        DrawMultiLineChart(options);
      } else if (id === "calendar-chart") {
        DrawCalendarChart(id);
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [id]);
  const handleDownload = async (type: any) => {
    setAnchorEl(null);

    if (!chartRef.current) {
      console.error("Chart reference not found.");
      return;
    }
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    if (type === "png") {
      // Download as PNG
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "chart_download.png";
      link.click();
    } else if (type === "pdf") {
      // Download as PDF
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height
      );
      pdf.save("chart_download.pdf");
    } else if (type === "excel") {
      // Download as Excel
      const worksheet = XLSX.utils.table_to_sheet(chartRef.current);

      // Create a WorkBook and add the WorkSheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write the WorkBook to array buffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = "chart_download.xlsx";
      link.click();
    }
  };

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBottomView = (view: string) => {
    setView(view);
  };
  const handleClose = (event: any) => {
    setShare(event);
  };

  return (
    <Grid
      sx={{
        flex: "1",
        transition: "margin-left 0.3s",
        maxHeight: "100vh",
        overflowY: "auto",
        overflowX: "auto",
        margin: 0,
        padding: 0,
        scrollbarWidth: "thin",
        // cursor: "pointer",
        scrollbarColor: "#808080",
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
      }}
    >
      {/* <StickyIconComponent onClick={handleBottomView} view={view} /> */}
      <Grid
        item
        container
        xs={12}
        sx={{
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          // padding: "20px",
          border: "20px solid #f1f1f1",
          // overflowX: "auto",
        }}
      >
        
        {/* <Box sx={{ maxHeight: "500px" }}> */}
          {/*@ts-ignore*/}
          <Grid
            item
            xs={10}
            id={id}
            ref={chartRef}
            sx={{
              width: "100%",
              display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.25s ease-in-out",
              overflow: "auto",
            }}
          ></Grid>
          <Grid
          xs={2}
          // container
          // justifyContent="end"
          // alignItems="center"
          sx={{ width: "100%", zIndex: 10 }}
        >
          <Grid
            item
            sx={{
              // marginTop: "10px",
              fontSize: "20px",
              marginLeft: "20px",
            }}
            display="flex"
            flexDirection="row"
            
            // alignItems="center"
            // justifyContent="center"
          >
            {/* <div className={classes.zoomConatainer}>
              <span onClick={handleZoomOut} style={{ marginRight: "5px" }}>
                &nbsp;-
              </span>
              <span
                style={{
                  marginRight: "5px",
                  padding: "0 3px 0 3px",
                  // maxWidth: 40,
                }}
              >
                {Math.round(Number(zoomLevel * 100))}%
              </span>
              <span onClick={handleZoomIn}>+&nbsp;</span>
            </div> */}
            <div
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={ShareButtonImage.src}
                height={230}
                width={50}
                alt="shareIcon"
                onClick={() => {
                  setShare(!share);
                }}
              />
            </div>
            {share && (
              <Modal
                open={share}
                className={classes.modal}
                onClose={() => setShare(false)}
              >
                <Paper className={classes.paper}>
                  <SocialShareComponent
                    shareUrl={url}
                    onClose={handleClose}
                    title="share"
                  />
                </Paper>
              </Modal>
            )}
            <Grid container gap={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  cursor: "pointer",
                  // marginLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={openMenu}>
                  <Image
                    src={DownloadButtonImage.src}
                    height={150}
                    width={30}
                    alt="dowloadIcon"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  // onClose={closeMenu}
                >
                  <MenuItem
                    onClick={() => handleDownload("png")}
                    style={{ fontSize: "12px" }}
                  >
                    <FileDownloadIcon
                      style={{ marginRight: "5px", fontSize: "12px" }}
                    />{" "}
                    Download as &nbsp;<b>PNG</b>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDownload("pdf")}
                    style={{ fontSize: "12px" }}
                  >
                    <FileDownloadIcon
                      style={{ marginRight: "5px", fontSize: "12px" }}
                    />{" "}
                    Download as &nbsp;<b>PDF</b>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Grid>
      {/* <Grid
        item
        xs={12}
        sx={{
          marginTop: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#ffffff",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {view === "table" ? <EditableTable /> : <SavedChartsListComponent />}
      </Grid> */}
    </Grid>
  );
};

export default ChartBuilder;
