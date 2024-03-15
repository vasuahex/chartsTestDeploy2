"use client"
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import NoChartsImage from "../../../public/images/nochartimg.png"

export const NoChartsComponent = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Image src={NoChartsImage} alt="no charts" width={300} height={280} />
      <Button variant="outlined"
        sx={{
          borderColor: "#1795D2",
          border: "2px solid",
          // padding: "16px, 22px, 16px, 22px",
          // gap: "10px",
          fontWeight: "500",
          fontFamily: "Roboto slab",
          textTransform: "capitalize"
        }}
      >No chart added</Button>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          color: "#000000",
          fontFamily: "Roboto slab",
          mt: 2
        }}
      >Please select a chart to add</Typography>
    </Grid>
  )
}
