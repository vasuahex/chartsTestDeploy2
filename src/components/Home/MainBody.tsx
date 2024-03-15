"use client"

import { Box, Grid } from "@mui/material"
import Link from 'next/link'
import { createStyles, makeStyles } from "@mui/styles";
import bgImage from "../../../public/bgImage.png"

// const useStyles = makeStyles(() =>
//   createStyles({
//     heading: {
//       color: "#464646",
//       display: "inline-block",
//       margin: "0px",
//       fontSize: "40px",
//       fontFamily: "Roboto slab",
//       fontWeight: "700",
//       "@media (max-width:600px)": {
//         fontSize: "20px", // Font size for extra-small to small screens
//       },
//       "@media (min-width:601px) and (max-width:960px)": {
//         fontSize: "40px", // Font size for medium screens
//       }
//     },
//     headingSecond: {
//       color: "#464646",
//       display: "inline-block",
//       margin: "0px",
//       fontSize: "40px",
//       fontFamily: "Roboto slab",
//       fontWeight: "700",
//       "@media (max-width:600px)": {
//         fontSize: "20px", // Font size for extra-small to small screens
//       },
//       "@media (min-width:601px) and (max-width:960px)": {
//         fontSize: "40px", // Font size for medium screens
//       }
//     },
//     firstPara: {
//       marginBlock: "3vh",
//       color: "#464646",
//       fontFamily: "Roboto slab",
//       fontSize: "13px",
//       fontWeight: "500",
//         "@media (max-width:600px)": {
//           fontSize: "12px", // Font size for extra-small to small screens
//         },
//         "@media (min-width:601px) and (max-width:960px)": {
//           fontSize: "13px", // Font size for medium screens
//         }
//       },
//       button: {
//         color: "#FFFFFF",
//         background: 'linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)',
//         border: "0",
//         // paddingInline: "35px",
//         // paddingBlock: "10px",
//         paddingInline: "3vw", // Responsive padding using viewport units
//         paddingBlock: "2vh",
//         borderRadius: "5px",
//         paddingTop: "10px",
//         cursor: "pointer",
//         // fontSize: "15px",
//         fontSize: "16px",
//         fontFamily: "Roboto slab",
//         fontWeight: "550",
//         "@media (max-width:600px)": {
//           fontSize: "12px", // Font size for extra-small to small screens
//         },
//         "@media (min-width:601px) and (max-width:960px)": {
//           fontSize: "16px", // Font size for medium screens
//         }
//       }
//   })
// );

const MainBodyPage = () => {
  // const classes = useStyles();
  return (
    <Box sx={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* <Grid item xs={12} sx={{
          display: "grid",
          flexDirection: "row",
          overflow: "auto",
          margin: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scrollbarWidth: "thin",
          scrollbarColorY: "#808080 transparent",
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
        }}> */}
      <Grid item xs={12} sx={{
        height: "calc(50vh)",
        textAlign: "center",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }} textAlign="center">
        <Grid item sx={{ py: { xs: 1 } }}>
          <Box style={{
            background:
              "linear-gradient(0deg, #464646, #464646), linear-gradient(99.16deg, #52C7FF 35.49%, #0D8DCB 83.89%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
            <h1 style={{
              color: "#464646",
              display: "inline-block",
              margin: "0px",
              fontSize: "40px",
              fontFamily: "Roboto slab",
              fontWeight: "700",
              "@media (max-width:600px)": {
                fontSize: "20px", // Font size for extra-small to small screens
              },
              "@media (min-width:601px) and (max-width:960px)": {
                fontSize: "40px", 
              }
            } as React.CSSProperties}>
              Transform{" "}
              <span style={{
                fontFamily: "serif",
                textDecoration: "underline",
                color: '#52C7FF',
              }}>data into</span>
            </h1>
          </Box>
          <h1 style={{
            color: "#464646",
            display: "inline-block",
            margin: "0px",
            fontSize: "40px",
            fontFamily: "Roboto slab",
            fontWeight: "700",
            "@media (max-width:600px)": {
              fontSize: "20px", // Font size for extra-small to small screens
            },
            "@media (min-width:601px) and (max-width:960px)": {
              fontSize: "40px", // Font size for medium screens
            }
          } as React.CSSProperties}>Meaningful presentation</h1>
          <p style={{
            marginBlock: "3vh",
            color: "#464646",
            fontFamily: "Roboto slab",
            fontSize: "13px",
            fontWeight: "500",
            "@media (max-width:600px)": {
              fontSize: "12px", // Font size for extra-small to small screens
            },
            "@media (min-width:601px) and (max-width:960px)": {
              fontSize: "13px", // Font size for medium screens
            }
          } as React.CSSProperties}>
            Got a CSV file? Simply chat with our tool and create a range of
            charts
          </p>
          <Grid item textAlign="center">
            <Link href="/personalassistant"
              style={{
                color: "#FFFFFF",
                background: 'linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)',
                border: "0",
                // paddingInline: "35px",
                // paddingBlock: "10px",
                paddingInline: "3vw", // Responsive padding using viewport units
                paddingBlock: "2vh",
                borderRadius: "5px",
                paddingTop: "10px",
                cursor: "pointer",
                // fontSize: "15px",
                fontSize: "16px",
                fontFamily: "Roboto slab",
                fontWeight: "550",
                "@media (max-width:600px)": {
                  fontSize: "12px", // Font size for extra-small to small screens
                },
                "@media (min-width:601px) and (max-width:960px)": {
                  fontSize: "16px", // Font size for medium screens
                }
              } as React.CSSProperties}
            // onClick={handleTryClick}
            >
              Try now for free
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Box >
  )
}

export default MainBodyPage;