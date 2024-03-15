"use client"

import { Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import SearchCharts from "../../../public/images/searchCharts.png"
import Image from 'next/image'
import UploadIcon from '@/assets/svgs/UploadIcon'

const NoChartsData = () => {
  return (
    <Grid 
     sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
     }}
    >
        <Image  src={SearchCharts} alt="search-charts" />
        <Typography variant='h6' color="#000"
        sx={{
            fontSize: 18,
            fontWeight: 400,
            color: "#000"
        }}
        >No data added</Typography>
        <Grid
         sx={{
            display: "flex",
            mt: 2
         }}
        >
            <Button variant="outlined"
            sx={{
                background: "linear-gradient(#52C7FF, #0D8DCB)",
                color: "#fff",
                mr: 2,
                height: "41px"
            }}
            >
                upload
               <IconButton>
               <UploadIcon />
               </IconButton>
            </Button>
            <Button variant='outlined'
             sx={{
                height: "41px",
                borderColor : "#1795D2",
                color: "#1795D2"
             }}
            >
              + Add Data
            </Button>
        </Grid>
    </Grid>
  )
}

export default NoChartsData