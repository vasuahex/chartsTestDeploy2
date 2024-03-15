"use client";
import React, { useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter, useParams } from "next/navigation";
import { chartsData } from "../../charts/charts";
import SearchIcon from "@/assets/svgs/SearchIcon";

const useStyles = makeStyles({
  container: {
    flex: "1",
    transition: "margin-left 0.3s",
    maxHeight: "auto",
    overflowY: "auto",
    overscrollBehavior: "contain",
    margin: 0,
    scrollbarWidth: "thin",
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
    backgroundColor: "#fff",
  },
  listItem: {
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 14,
    color: "#000",
    fontSize: "12px",
    fontFamily: "Arial",
    border: "1px solid #cdcdcd",
    "&:hover": {
      boxShadow: "2px 4px 0px 0px #4682B4",
      border: "1px solid #1795D2",
    },
  },
  listItemSelected: {
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    flexDirection: "column",
    fontSize: "12px",
    alignItems: "center",
    fontFamily: "Arial",
    width: "100%",
    padding: 14,
    color: "#000",
    boxShadow: "2px 4px 0px 0px #4682B4",
    border: "2px solid #1795D2",
  },
  listItemImage: {
    height: "40px",
    marginBottom: "4px",
  },
  searchField: {
    width: "100%",
    border: "1px solid ##D1D1D1",
    backgroundColor: "#F8F8F8",
    "& input::placeholder": {
      textAlign: "left",
      fontSize: "16px",
      fontFamily: "Roboto Slab",
      color: "#000000 !important",
    },
  },
  imageCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noChartsContainer: {
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 14,
    color: "#000",
    fontSize: "12px",
    fontFamily: "Arial",
    border: "1px solid #cdcdcd",
    "&:hover": {
      boxShadow: "2px 4px 0px 0px #4682B4",
      border: "1px solid #1795D2",
    },
  },
});

const ChartList: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredChartArray = chartsData.filter((chart) =>
    chart.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChartView = (chartId: string) => {
    console.log(chartId);
    router.push(`/chartbuilder/${chartId}`);
  };

  return (
    <Grid
      //  sx={{
      //   flex: "1",
      //   transition: "margin-left 0.3s",
      //   maxHeight: "auto",
      //   overflowY: "auto",
      //   overscrollBehavior: "contain",
      //   margin: 0,
      //   scrollbarWidth: "thin",
      //   scrollbarColor: "#808080 transparent",
      //   "&::-webkit-scrollbar": {
      //     width: "5px",
      //   },
      //   "&::-webkit-scrollbar-thumb": {
      //     backgroundColor: "#808080",
      //     borderRadius: "5px",
      //   },
      //   "&::-webkit-scrollbar-track": {
      //     backgroundColor: "transparent",
      //   },
      //   backgroundColor: "#fff",
      // }}
      className={classes.container}
    >
      <Grid item>
        <TextField
          // sx={{
          //   width: "100%",
          //   border:"1px solid ##D1D1D1",
          //   backgroundColor: "#F8F8F8",
          //   "& input::placeholder": {
          //     textAlign: "left",
          //     fontSize:"16px",
          //     fontFamily:"Roboto Slab",
          //     color:"#000000 !important",
          //   },
          // }}
          className={classes.searchField}
          variant="standard"
          size="small"
          id="password"
          onChange={handleSearchChange}
          InputProps={{
            disableUnderline: true,
            style: { padding: "7px 7px 7px 20px" },
            startAdornment: (
              <IconButton sx={{ p: 1, color: "inherit" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
          placeholder="Search..."
        />
      </Grid>

      <Grid
        container
        gap={1}
        sx={{ justifyContent: "center", margin: "10px 0 0 0" }}
      >
        {filteredChartArray?.length > 0 ? (
          filteredChartArray.map((chart, index) => (
            <Grid
              xs={3.5}
              item
              key={index}
              className={
                id === chart.id ? classes.listItemSelected : classes.listItem
              }
              onClick={() => handleChartView(chart.id)}
            >
              <div className={classes.imageCenter}>
                <img
                  src={chart.imagePath.src}
                  alt={chart.heading}
                  className={classes.listItemImage}
                />
              </div>
              {chart.heading}
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
            // sx={{
            //   cursor: "pointer",
            //   display: "block",
            //   textAlign: "center",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   width: "100%",
            //   padding: 14,
            //   color: "#000",
            //   fontSize: "12px",
            //   fontFamily: "Arial",
            //   border: "1px solid #cdcdcd",
            //   "&:hover": {
            //     boxShadow: "2px 4px 0px 0px #4682B4",
            //     border: "1px solid #1795D2",
            //   },
            // }}
            className={classes.noChartsContainer}
          >
            No charts found.
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ChartList;
