"use client";
import { savedChartData } from '@/charts/charts'
import { Box, Grid, Menu, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import React, { ReactEventHandler, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

export const SaveChartComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
  
    const handleMenuClick = (event: any, data: any) => {
      setAnchorEl(event.currentTarget);
      setSelectedData(data);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
      };
  
    
    return (
        <Grid container spacing={2} style={{ width: "80%", margin: "auto", padding: "20px",  flexWrap: "wrap", display: "flex", flexDirection: "row", }}>
            {savedChartData.map((data) => (
                <Grid key={data.id} item md={2.4} xs={12} sm={1} >
                    <Box sx={{ border: "2px solid #D1D1D1", display: "flex", padding: "10px", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center",  }}>
                        <Box sx={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-around"}}>
                        <Image src={data.imagePath} alt="chart" height={80} width={80} />
                        <MdMoreHoriz cursor="pointer"  onClick={(e) => handleMenuClick(e, data)} />
                        </Box>
                        <Box sx={{width: "100%"}}>
                        <Typography ml={3.4} sx={{fontWeight: 500, fontFamily: "Roboto slab", textTransform: "capitalize",}}>{data.title}</Typography>
                            </ Box>
                            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem onClick={() => alert('Edit')}>Edit</MenuItem>
              <MenuItem onClick={() => alert('Delete')}>Delete</MenuItem>
            </Menu>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}
