import React from "react";
import { Grid, Typography } from "@mui/material";


const DescriptionComponent: React.FC = () => {
  return (
    <Grid item container xs={12} sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
      fontFamily: "Roboto Slab",
      width: "100%",
    }}>
      <Grid item sx={{
        maxWidth: "80%",
        textOverflow: "ellipsis",
        margin: "0 auto",
        marginTop: "20px",
        padding: "20px",
      }}>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          mb={2}
          color="black"
          fontWeight="bold"
          fontFamily="serif"
          fontSize="30px"
        >
          AHEX Tech. | d3.js
        </Typography>
        <p
          style={{ color: "#888888", }}>
          AHEX Tech leverages the power of D3.js in its projects to create
          dynamic and interactive data visualizations. Through the seamless
          integration of D3.js, AHEX Tech ensures that data comes to life,
          offering a compelling visual narrative to users. This implementation
          enhances the user experience by presenting complex information in an
          intuitive and engaging manner, making AHEX Techs projects both
          informative and visually impactful.
        </p>
      </Grid>
    </Grid>
  );
};

export default DescriptionComponent;
