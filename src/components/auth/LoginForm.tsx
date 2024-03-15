"use client"
import { Formik, Form, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { FaApple } from "react-icons/fa";
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ForgetPasswordModal from '../forgotPopups/ForgotpasswordModal';
import { useSession } from "next-auth/react";
import VerificationEmailModal from '../forgotPopups/VerificationEmailModal';
import UpdatePasswordModal from '../forgotPopups/UpdatePasswordModal';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import ChangePasswordModal from '../forgotPopups/ChangePasswordModal';
import { Divider, Box, } from '@mui/material';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Password must be at least 8 characters long, contain at least one capital letter, and one special character'
        )
        .required('Password is required'),
});

const LoginForm: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const session = useSession();
    console.log(session)
    const [showPassword, setShowPassword] = useState(false);
    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
    const [showUpdatePasswordModal, setUpdatePasswordModal] = useState(false);
    const [showChangePasswordModal, setChangePasswordModal] = useState(false);
    const [showVerificationEmailModal, setShowVerificationEmailModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(0);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgetPasswordClick = () => {
        setShowForgetPasswordModal(true);
    };

    const closeForgetPasswordModal = () => {
        setShowForgetPasswordModal(false);
    };

    const handleUpdatePasswordClick = (email: any, code: any) => {
        setUserEmail(email);
        setVerificationCode(code);
        setUpdatePasswordModal(true);
    };

    const closeUpdatePasswordModal = () => {
        setUpdatePasswordModal(false);
    };

    const handleChangePasswordClick = () => {
        setChangePasswordModal(true);
    };

    const closeChangePasswordModal = () => {
        setChangePasswordModal(false);
    };

    const handleVerificationCodeClick = (email: any) => {
        setUserEmail(email);
        setShowForgetPasswordModal(false)
        setShowVerificationEmailModal(true);
    };

    const closeVerificationModal = () => {
        setShowVerificationEmailModal(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, actions) => {
            try {
                const resUserExists = await fetch("api/userExists", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email }),
                });

                const { user } = await resUserExists.json();
                console.log(user)
                if (!user) {
                    toast.error("Invalid Credentials");
                }
                if (user.isVerified) {
                    const res = await signIn("credentials", {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    });
                    console.log(res)
                    if (res?.error) {
                        toast.error("Invalid Credentials");
                        return;
                    } else {
                        router.push("/");
                    }
                }
                else {
                    toast.error("Please verify your account first.");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <Box style={{ fontFamily: "Roboto slab" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url('/images/Color BG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
                flexDirection={isMobile ? "column" : "row"}>
                <AuthLayout />
                <Box sx={{ padding: "40px", marginRight: "16px" }} width={isMobile ? "100%" : "35%"} >
                    <form onSubmit={formik.handleSubmit} style={{
                        borderRadius: "8px",
                        marginBottom: "20px",
                        marginRight: isMobile ? "" : "90px",
                    }} autoComplete='off'>
                        {/* Email field */}
                        <Box style={{ marginBottom: "20px" }}>
                            <label htmlFor="email" style={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px"
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                autoComplete='off'
                                style={{
                                    boxShadow: "none",
                                    borderRadius: "4px",
                                    background: "#E5E7EB",
                                    width: "100%",
                                    padding: "10px",
                                    color: "#1F2937"
                                }}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Box sx={{
                                    color: "#EF4444",
                                    fontSize: "12px",
                                    marginTop: "5px"
                                }}>{formik.errors.email}</Box>
                            )}
                        </Box>
                        {/* Password field */}
                        <Box style={{ marginBottom: "20px" }}>
                            <label htmlFor="password" style={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px"
                            }}>
                                Password
                            </label>
                            <Box style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    autoComplete='off'
                                    style={{
                                        boxShadow: "none",
                                        borderRadius: "4px",
                                        background: "#E5E7EB",
                                        width: "100%",
                                        padding: "10px",
                                        color: "#1F2937"
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer"
                                    }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <IoEyeOutline style={{ color: "#9CA3AF", fontWeight: "600" }} />
                                    ) : (
                                        <IoEyeOffOutline style={{ color: "#9CA3AF", fontWeight: "600" }} />
                                    )}
                                </Box>
                            </Box>
                            {formik.touched.password && formik.errors.password && (
                                <Box sx={{
                                    color: "#EF4444",
                                    fontSize: "12px",
                                    marginTop: "5px"
                                }}>{formik.errors.password}</Box>
                            )}
                        </Box>
                        {/* Forget Password link */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }} >
                            <p style={{ color: "#3B82F6", fontSize: "12px", cursor: "pointer" }} onClick={handleForgetPasswordClick}>Forget Password?</p>
                        </Box>
                        {/* Signup button */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
                            <button
                                type="submit"
                                style={{
                                    background: "#000000",
                                    color: "#FFFFFF",
                                    width: "418px",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    fontFamily: "Roboto slab",
                                    padding: "10px 20px",
                                    borderRadius: "16px",
                                    border: "none",
                                    cursor: "pointer",
                                    outline: "none",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    marginTop: "20px"
                                }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Logging in..." : "Log in"}
                            </button>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px"
                        }}>
                            <Divider sx={{ width: "25%", border: "1px solid #9CA3AF", marginLeft: "5px" }} />
                            <span style={{ color: "#9CA3AF", padding: "3px" }}>or continue with</span>
                            <Divider sx={{ width: "25%", border: "1px solid #9CA3AF", marginLeft: "5px" }} />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px"
                        }}>
                            <Box style={{
                                display: "flex", gap: "18px"
                            }}>
                                {/* Google icon */}
                                <Box sx={{
                                    border: "2px solid #BDC4CD",
                                    borderRadius: "9999px",
                                    padding: "7px",
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} onClick={() => signIn("google")}>
                                    <FcGoogle />
                                </Box>
                                {/* Facebook icon */}
                                <Box sx={{
                                    border: "2px solid #BDC4CD",
                                    borderRadius: "9999px",
                                    padding: "7px",
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <ImFacebook />
                                </Box>
                                {/* Apple icon */}
                                <Box sx={{
                                    border: "2px solid #BDC4CD",
                                    borderRadius: "9999px",
                                    padding: "7px",
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <FaApple />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px"
                        }}>
                            <p style={{ color: "#9CA3AF", fontSize: "14px" }}>Dont have an account yet?
                                <Link href="/register">
                                    <span style={{ color: "#3B82F6", cursor: "pointer", marginLeft: "5px" }}> Sign up</span>
                                </Link>
                            </p>
                        </Box>
                    </form>
                    {/* popup code */}
                    {showForgetPasswordModal && <ForgetPasswordModal
                        show={showForgetPasswordModal}
                        onClose={closeForgetPasswordModal}
                        onOpen={handleVerificationCodeClick}
                    />}
                    {showVerificationEmailModal && <VerificationEmailModal
                        email={userEmail}
                        show={showVerificationEmailModal}
                        onClose={closeVerificationModal}
                        onOpen={handleUpdatePasswordClick}
                    />}
                    {showUpdatePasswordModal && <UpdatePasswordModal
                        email={userEmail}
                        code={verificationCode}
                        show={showUpdatePasswordModal}
                        onClose={closeUpdatePasswordModal}
                        onOpen={handleChangePasswordClick}
                    />}
                    {/* {showChangePasswordModal && <ChangePasswordModal
                show={showChangePasswordModal}
                onClose={closeChangePasswordModal}
            />} */}
                </Box>
            </Box >
        </Box >
    );
};

export default LoginForm;
