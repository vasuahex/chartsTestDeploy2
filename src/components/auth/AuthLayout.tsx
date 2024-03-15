"use client"
import React from 'react';
import Image from 'next/image';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

const AuthLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            width: "100%",
            maxWidth: "100%",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            fontSize: "38px",
            fontFamily: "Roboto Slab",
            marginTop: "auto",
            "@media (max-width:600px)": {
                marginTop: "80px",
            },
        }}>
            <Box sx={{ position: "relative" }}>
                <Image src="/ahexcompanylogo.png" alt="aheximage" width={120} height={40} style={{
                    position: "fixed",
                    top: "7px",
                    left: "10px",
                    marginLeft: "30px"
                }} />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    position: "relative",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        "@media (max-width:600px)": {
                            alignItems: "center",
                            justifyContent: "center"
                        },
                    }}
                    >
                        <Typography sx={{
                            width: "100%",
                            maxWidth: "80%",
                            fontWeight: 700,
                            color: "#464646",
                            fontSize: "40px",
                            fontFamily: "Roboto Slab",
                            "@media (max-width:600px)": {
                                fontSize: "20px",
                            },
                            "@media (min-width:601px) and (max-width:960px)": {
                                fontSize: "40px",
                            }
                        }}>
                            Transform
                            <span style={{
                                color: "#0D8DCB",
                                textDecoration: "underline",
                                fontWeight: 700
                            }}> data into</span> Meaningful presentation
                        </Typography>
                        <p style={{
                            color: "#464646",
                            width: "100%",
                            maxWidth: "60%",
                            fontSize: "20px",
                            fontFamily: "Roboto Slab",
                            fontWeight: 500,
                            lineHeight: "24px"
                        }}>
                            Got a CSV file? Simply chat with our tool and create a range of charts
                        </p>
                    </Box>
                    <Box display={isMobile ? "none" : "block"} marginTop="-12%">
                        {/* Hidden on mobile devices */}
                        <Image src="/ahexbotimage1.png" alt="image" width={400} height={400} />
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default AuthLayout;
