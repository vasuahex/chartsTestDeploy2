"use client"
import { Grid } from "@mui/material";
import ChartThumbnail from "./ChartThumbnail";
import { chartsData } from "../charts/charts";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ThumbnailGallery = () => {
  const router = useRouter()
  const handleChartView = (Id: string) => {
    router.push(`works/${Id}`);
  };

  return (
    <Grid container sx={{
      display: "flex",
      marginBottom: "16px",
      backgroundColor: "#fff",
      cursor: "pointer",
      boxShadow: "0px 4px 94px 0px #0000001A",
      borderRadius: "5px",
      width: "80% !important",
      marginLeft: "10%",
    }}>
      <Grid item sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin: "0 auto",
      }} container
        spacing={0}>
        {chartsData.map((chart, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              borderRight: "2px solid #ccc",
              borderBottom: "2px solid #ccc",
            }}
          // onClick={() => handleChartView(chart.id)}
          >
            <Link href={`works/${chart.id}`}>
              <ChartThumbnail
                heading={chart.heading}
                imagePath={chart.imagePath.src}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ThumbnailGallery;
