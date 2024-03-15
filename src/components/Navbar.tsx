"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
    Grid,
    Menu,
    MenuItem,
    Divider,
    Box,
    Typography,
    Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SourceDialog from "./SourceDialog";
import ChartDetailsLogo from "../../public/images/chartDetail-logo.png";
import AvatarImage from "../../public/images/avatarImage.png";
import { makeStyles } from "@mui/styles";
import SavedChartsListComponent from "./savedChartsList";
import { chartConfigSliceActions } from "@/libs/redux/slices/chartConfigSlice";
import { useAppDispatch } from "@/libs/redux/redux-hooks";
import { useAppSelector } from "@/libs/redux/redux-hooks";
const navItems = [
    { label: "Home", route: "/", activeRoute: "/" },
    // { label: "Charts", route: "/charts" },
    { label: "Chart Builder", route: "/chartbuilder/no-chart", activeRoute: "/chartbuilder" },
    { label: "Personal Assistant", route: "/personalassistant", activeRoute: "/personalassistant" },
];

const useStyles = makeStyles({
    navbarConatiner: {
        backgroundColor: "#ffffff",
        color: "#888888",
        position: "sticky",
        top: 0,
        zIndex: 10,
        fontFamily: "Roboto slab",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "97px",
        padding: "0 20px",
    },
    navItemsConatiner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "300px",
    },
    navItems: {
        color: "#000",
        fontSize: "22px",
        fontWeight: 400,
    },
    navItemsActive: {
        color: "#52C7FF",
        fontSize: "22px",
        fontWeight: 400,
        textDecoration: "underline",
        textDecorationColor: "##0D8DCB",
        textUnderlineOffset: "4px",
    },
    loginButton: {
        color: "#0D8DCB",
        border: "2px solid transparent",
        borderImage: "linear-gradient(to right, #52C7FF, #0D8DCB) 1",
        fontFamily: "Roboto Slab",
        fontSize: "20px",
        padding: "6px 16px",
        fontWeight: 700,
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "280px",
        maxWidth: "300px",
    },
    profileNameText: {
        color: "#000",
        fontSize: "20px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    avatarImageBox: {
        cursor: "pointer",

        color: "black",
        border: "1px solid #999999",
        borderRadius: "50%",
        padding: 5,
    },
    menuButton: {
        background: "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
        color: "#ffffff",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14px",
        padding: "8px 16px",
        cursor: "pointer",
        border: "none",
        width: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    menuIcon: {
        marginLeft: "3px",
    },
    divider: {
        borderColor: "#ABABAB",
        borderWidth: "1px",
        marginLeft: "20px",
        marginRight: "20px",
    },
    menuNonColor: {
        color: "#000000",
    },
});

const Navbar = () => {
    const path = usePathname();
    const router = useRouter();
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const { data: session, status } = useSession();
    const [showPopup, setShowPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isSavedChartsDialogOpen, setIsSavedChartsDialogOpen] = useState(false);
    const pathname = usePathname();
    const isDialogOpen = useAppSelector((state) => state.chartConfig.isDialogOpen);

    const handleAvatarClick = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = async () => {
        try{
            const res = await fetch("/api/updateSourceType", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
          });
        
          console.log('res saved',res);
          if (res.ok) {
            const responseBody = await res.json();
            console.log('res updated', responseBody);
              // toast.success("Data saved to DB.");
            //   toast.success(responseBody.message);
        
              // formik.resetForm();
              // router.push("/login");
          } else {
            //   toast.error("Data not saved to DB.");
          }
        } catch (error) {
          console.log("Data not saved to DB: ", error);
        }
        

        await signOut();
    };
    const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

    const handleMobileMenuToggle = (event: any) => {
        setMobileMenuOpen(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenDialog = () => {
        dispatch(chartConfigSliceActions.setDialogOpen(true));

    };
    const handleOpenSavedCharts = () => {
        // setIsSavedChartsDialogOpen(true);
        router.push("/myCharts");
    };

    const handleCloseDialog = () => {
        dispatch(chartConfigSliceActions.setDialogOpen(false));

    };
    const handleCloseSavedCharts = (event: any) => {
        setIsSavedChartsDialogOpen(false);
    };
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const menuItems = [
        { label: "Profile", classes: classes.menuNonColor, isDivider: true },
        {
            label: "My Charts",
            onclick: handleOpenSavedCharts,
            classes: classes.menuNonColor,
            isDivider: true,
        },
        {
            label: "Source",
            onclick: handleOpenDialog,
            isDivider: true,
            classes: classes.menuNonColor,
        },
        // { label: "Export", onclick: handleOpenDialog, isDivider: true, classes: classes.menuNonColor },
        {
            label: "Logout",
            onclick: handleLogout,
            isDivider: false,
            classes: classes.menuButton,
            isButton: true,
            icon: <LogoutIcon />,
        },
    ];

    const mobileDevice = () => {
        return (
            <Grid
                item
                sx={{
                    display: { xs: "flex", md: "none" },
                }}
            >
                {!session ? (
                    <MenuItem
                        component={Link}
                        href="/login"
                        onClick={handleMobileMenuClose}
                        sx={{
                            color: "#0D8DCB",
                            border: "2px solid transparent",
                            borderImage: "linear-gradient(to right, #52C7FF, #0D8DCB) 1",
                            fontFamily: "Roboto Slab",
                            fontSize: "18px",
                            padding: "6px 14px",
                            fontWeight: 700,
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 1,
                            "&:hover": {
                                backgroundColor: "#f0f0f0", // Apply hover background color
                            },
                        }}
                    >
                        Login
                    </MenuItem>
                ) : (
                    <Box
                        // className={classes.profileContainer}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            width: "280px",
                            maxWidth: "300px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            // className={classes.profileNameText}
                            sx={{
                                color: "#000",
                                fontSize: "18px",
                                fontFamily: "Roboto Slab",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                marginRight: "10px",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Welcome {session?.user?.name}
                        </Typography>
                        <Box
                            // className={classes.avatarImageBox}
                            onClick={handleMobileMenuToggle}
                            sx={{
                                cursor: "pointer",

                                color: "black",
                                border: "1px solid #999999",
                                borderRadius: "52%",
                                padding: 1,
                                marginRight: 1,
                            }}
                        >
                            <Image
                                src={AvatarImage.src}
                                alt="avatar"
                                height={20}
                                width={20}
                            />
                        </Box>
                        {/* {dropdown()} */}
                    </Box>
                )}

                {mobileMenuOpen && (
                    <Menu
                        anchorEl={mobileMenuOpen}
                        open={Boolean(mobileMenuOpen)}
                        onClose={handleMobileMenuClose}
                    >
                        {/* Mobile Menu Items */}
                        <MenuItem
                            component={Link}
                            href="/"
                            onClick={handleMobileMenuClose}
                            sx={{
                                color: pathname === "/" ? "#3f51b5" : "inherit",
                                "&:hover": {
                                    color: "#3f51b5",
                                },
                            }}
                        >
                            Home
                        </MenuItem>
                        {/* <MenuItem
                            component={Link}
                            href="/charts"
                            onClick={handleMobileMenuClose}
                            sx={{
                                color: pathname === "/charts" ? "#3f51b5" : "inherit",
                                "&:hover": {
                                    color: "#3f51b5",
                                },
                            }}
                        >
                            Charts
                        </MenuItem> */}
                        <MenuItem
                            component={Link}
                            href="/chartbuilder/no-chart"
                            onClick={handleMobileMenuClose}
                            sx={{
                                color: pathname.includes("chartbuilder") ? "#3f51b5" : "inherit",
                                "&:hover": {
                                    color: "#3f51b5",
                                },
                            }}
                        >
                            Chart Builder
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            href="/personalassistant"
                            onClick={handleMobileMenuClose}
                            sx={{
                                color: pathname === "/personalassistant" ? "#3f51b5" : "inherit",
                                "&:hover": {
                                    color: "#3f51b5",
                                },
                            }}
                        >
                            Personal Assistant
                        </MenuItem>
                        <MenuItem
                            onClick={handleOpenDialog}
                            sx={{
                                color: pathname === "/personalassistant" ? "#3f51b5" : "inherit",
                                "&:hover": {
                                    color: "#3f51b5",
                                },
                            }}
                        >
                            Source
                        </MenuItem>
                        {!session ? (
                            <MenuItem
                                component={Link}
                                href="/login"
                                onClick={handleMobileMenuClose}
                                sx={{
                                    color: "#0D8DCB",
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(to right, #52C7FF, #0D8DCB) 1",
                                    fontFamily: "Roboto Slab",
                                    fontSize: "18px",
                                    padding: "6px 14px",
                                    fontWeight: 700,
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                }}
                            >
                                Login
                            </MenuItem>
                        ) : (
                            <>
                                <Button className={classes.menuButton} onClick={handleLogout}>
                                    {"Logout"}{" "}
                                    <span className={classes.menuIcon}>
                                        <LogoutIcon />
                                    </span>
                                </Button>
                            </>
                        )}
                        {/* Other Mobile Menu Items */}
                    </Menu>
                )}
            </Grid>
        );
    };

    const dropdown = () => {
        return (
            <>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                        position: "absolute",
                        top: 3,
                        right: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    slotProps={{
                        paper: {
                            style: {
                                width: "200px",
                                boxShadow: "0px 4px 34px 0px #00000024",
                                fontFamily: "'Roboto Slab', sans-serif",
                                color: "#000",
                                fontSize: "16px",
                            },
                        },
                    }}
                >
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <MenuItem onClick={item.onclick}>
                                <Button className={item.classes}>
                                    {item.label}{" "}
                                    {item.icon && (
                                        <span className={classes.menuIcon}>{item.icon}</span>
                                    )}
                                </Button>
                            </MenuItem>
                            {item?.isDivider && <Divider className={classes.divider} />}
                        </React.Fragment>
                    ))}
                </Menu>
                <SourceDialog
                    isOpen={isDialogOpen}
                    setAnchorEl={setAnchorEl}
                    onClose={handleCloseDialog}
                />
                {isSavedChartsDialogOpen && (
                    <SavedChartsListComponent
                        open={isSavedChartsDialogOpen}
                        onClose={handleCloseSavedCharts}
                    />
                )}
            </>
        );
    };

    // const handleLoginClick = () => {
    //     router.push("/login");
    // };

    const userProfileName = () => {
        return (
            <Box
                // className={classes.profileContainer}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "280px",
                    maxWidth: "300px",
                }}
            >
                <Typography
                    variant="h6"
                    // className={classes.profileNameText}
                    sx={{
                        color: "#000",
                        fontSize: "18px",
                        fontFamily: "Roboto Slab",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginRight: "10px",
                        textOverflow: "ellipsis",
                    }}
                >
                    Welcome {session?.user?.name}
                </Typography>
                <Box
                    onClick={handleClick}
                    // className={classes.avatarImageBox}
                    sx={{
                        cursor: "pointer",

                        color: "black",
                        border: "1px solid #999999",
                        borderRadius: "52%",
                        padding: 1,
                    }}
                >
                    <Image src={AvatarImage.src} alt="avatar" height={20} width={20} />
                </Box>
                {dropdown()}
            </Box>
        );
    };

    return (
        <Grid
            item
            xs={12}
            // className={classes.navbarConatiner}
            sx={{
                backgroundColor: "#ffffff",
                color: "#888888",
                position: "sticky",
                top: 0,
                zIndex: 10,
                fontFamily: "Roboto slab",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "10vh",
                padding: "0 20px",
                borderBottom: "1px solid #888",
            }}
        >
            <Grid>
                <Link href="/">
                    <Image
                        width={100}
                        height={20}
                        src={ChartDetailsLogo.src}
                        alt="logo"
                    />
                </Link>
            </Grid>
            <Grid
                // className={classes.navItemsConatiner}
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "400px",
                    marginLeft: "20px",
                }}
            >
                {navItems?.map((each, index) => {
                    const isActive = each.route === "/" ? pathname === "/" : pathname.startsWith(each.activeRoute);
                    return (
                        <Link
                            // className={pathname === (index === 0 ? '/' : `/${each.toLowerCase()}`) ? classes.navItemsActive : classes.navItems
                            // }
                            style={
                                isActive ? {
                                    color: "#52C7FF",
                                    fontSize: "18px",
                                    fontWeight: 400,
                                    textDecoration: "underline",
                                    textDecorationColor: "##0D8DCB",
                                    textUnderlineOffset: "4px",
                                }
                                    : {
                                        color: "#000",
                                        fontSize: "18px",
                                        fontWeight: 400,
                                        textDecoration: "none",
                                    }
                            }
                            key={index}
                            href={{ pathname: each?.route }}
                        >
                            {each?.label}
                        </Link>
                    );
                })}
            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
                {!session ? (
                    <Link href="/login"
                        style={{
                            color: "#0D8DCB",
                            border: "2px solid transparent",
                            borderImage: "linear-gradient(to right, #52C7FF, #0D8DCB) 1",
                            fontFamily: "Roboto Slab",
                            fontSize: "18px",
                            padding: "6px 14px",
                            fontWeight: 700,
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    // onClick={handleLoginClick}
                    >
                        Login
                    </Link>
                ) : (
                    <Box>{userProfileName()}</Box>
                )}
            </Grid>
            {mobileDevice()}
        </Grid>
    );
};

export default Navbar;
