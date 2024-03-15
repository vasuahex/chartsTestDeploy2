"use client"
import React from "react";
import { Box, Grid } from "@mui/material";
import DescriptionComponent from "../../components/DiscriptionComponent";
import FooterComponent from "../../components/FooterComponent";
import ThumbnailGallery from "../../components/ThumbnailGallery";
import Navbar from "@/components/Navbar";
import bgImage from "../../../public/bgImage.png"


const ChartPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Grid container sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <Grid item xs={12}>
                        <DescriptionComponent />
                    </Grid>
                    <Grid item xs={12}>
                        <ThumbnailGallery />
                    </Grid>
                </Box>
                <Grid item xs={12} sx={{
                    backgroundColor: "#012039 !important",
                }}>
                    <FooterComponent />
                </Grid>
            </Grid>
        </>
    );
};

export default ChartPage;
