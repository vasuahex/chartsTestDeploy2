import Navbar from '@/components/Navbar'
import ThumbnailGallery from '@/components/ThumbnailGallery'
import { Box, Grid, Typography } from '@mui/material'
import bgImage from "../../../public/bgImage.png"
import React from 'react'
import { SaveChartComponent } from '@/components/saveChartComponent'

function MyCharts() {
  return (
    <>
      <Navbar />
      <Typography variant='h5' sx={{ textAlign: 'center', mt: 2 }}>Saved Charts</Typography>
      <Grid item mt={1}>
        <Box sx={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}>
          <Grid item xs={12}>
            <SaveChartComponent />
          </Grid>
        </Box>
      </Grid>
    </>

  )
}

export default MyCharts