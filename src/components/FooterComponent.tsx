"use client"

import { Box, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";


// const useStyles = makeStyles(() =>
//   createStyles({
//     heading: {
//       color: "#D1D1D1",
//       margin: "0 auto",
//       fontFamily: "Roboto slab",
//       fontSize: "24px", // Default font size
//       fontWeight: "550",
//     //   textWrap: "wrap",
//       "@media (max-width:600px)": {
//         fontSize: "20px", // Font size for extra-small to small screens
//       },
//       "@media (min-width:601px) and (max-width:960px)": {
//         fontSize: "22px", // Font size for medium screens
//       }
//     }
//   })
// );

const FooterPage = () => {
  // const classes = useStyles();
  return (
    <Grid container sx={{ backgroundColor: "#111827", height: '40vh' }}>
      <Grid item xs={12} mt={{ xs: 4, md: 5 }} ml={8} maxWidth={{ xs: "100%", md: "50%", lg: "30%" }} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box component="div">
          <h1 style={{
            color: "#D1D1D1",
            margin: "0 auto",
            fontFamily: "Roboto slab",
            fontSize: "24px",
            fontWeight: "550",
            '@media (max-width:600px)': {
              fontSize: "20px"
            },
            '@media (min-width:601px) and (max-width:960px)': {
              fontSize: "22px"
            }
          } as React.CSSProperties}>
            All charts and data visualizations made<br /> with d3.js, a JavaScript library for manipulating documents based on data.
          </h1>
        </Box>
      </Grid>
      {/* <hr style={{ width: "90%", margin: "0 auto", borderTopColor: "#4E4D4C" }} /> */}
      <div style={{ width: "90%", margin: "0 auto", borderTop: "1px solid #4E4D4C", lineHeight: 1 }}></div>

      <Grid
        container
        color="#D1D1D1"
        justifyContent="space-between"
        fontFamily="Roboto slab"
        //   fontSize='12px'
        fontSize={{ xs: '10px', md: '12px' }}
      >
        <Grid item ml={{ xs: 5, md: 10 }}>
          <span style={{ marginRight: "25px", color: "#D1D1D1", fontWeight: "500" }}>Portfolio</span>
          <span style={{ marginRight: "25px", color: "#D1D1D1", fontWeight: "500" }}>Works</span>
          <span style={{ marginRight: "25px", color: "#D1D1D1", fontWeight: "500" }}>Demos</span>
        </Grid>
        <Grid item mr={{ xs: 5, md: 10 }}>
          <span style={{
            background:
              "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))",
            WebkitBackgroundClip: "text",
          }}>
            <span style={{ color: "#275078" }}> Created by</span> Ahex
            Technologies
          </span>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FooterPage;