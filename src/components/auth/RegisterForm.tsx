"use client"
import { Form, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { FaApple } from "react-icons/fa";
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ForgetPasswordModal from '../forgotPopups/ForgotpasswordModal';
import { signIn } from 'next-auth/react';
import VerificationEmailModal from '../forgotPopups/VerificationEmailModal';
import UpdatePasswordModal from '../forgotPopups/UpdatePasswordModal';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChangePasswordModal from '../forgotPopups/ChangePasswordModal';
import { Divider, Box, } from '@mui/material';

// import { SendEmail } from './Sendmailer';


const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Password must be at least 8 characters long, contain at least one capital letter, and one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Confirm Password must be at least 8 characters long, contain at least one capital letter, and one special character'
        )
        .oneOf([Yup.ref('password'), ''], 'Passwords must match the password')
        .required('Confirm Password is required'),
});


const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showVerificationEmailModal, setShowVerificationEmailModal] = useState(false);
    const [showUpdatePasswordModal, setUpdatePasswordModal] = useState(false);
    const [showChangePasswordModal, setChangePasswordModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const closeForgetPasswordModal = () => {
        setShowForgetPasswordModal(false);
    };
    // Function to toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleForgetPasswordClick = () => {
        setShowForgetPasswordModal(true);
    };
    const handleVerificationCodeClick = (email: string) => {
        console.log('email', email)
        setUserEmail(email);
        setShowVerificationEmailModal(true);
    };
    const closeVerificationModal = () => {
        setShowVerificationEmailModal(false);
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


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, actions) => {
            // Handle form submission
            try {
                const resUserExists = await fetch("api/userExists", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email }),
                });

                const { user } = await resUserExists.json();

                if (user) {
                    toast.error("User already exists.");
                    return;
                }

                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    }),
                });

                if (res.ok) {
                    toast.success("Verification mail sent successfully.");

                    formik.resetForm();
                    router.push("/login");
                } else {
                    toast.error("User registration failed.");
                }
            } catch (error) {
                console.log("Error during registration: ", error);
            }
        },
    });
    return (
        <Box style={{ fontFamily: "Roboto slab", }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url('/images/Color BG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} flexDirection={isMobile ? "column" : "row"}>
                <AuthLayout />
                <Box sx={{ padding: "40px", marginRight: "16px" }} width={isMobile ? "100%" : "35%"}>
                    <form onSubmit={formik.handleSubmit} style={{
                        borderRadius: "8px",
                        marginBottom: "20px",
                        marginRight: isMobile ? "" : "90px",
                    }} autoComplete='off'>
                        {/* Your name field */}
                        <Box style={{ marginBottom: "20px" }}>
                            <label htmlFor="name" style={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px"
                            }}>
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                style={{
                                    boxShadow: "none",
                                    borderRadius: "4px",
                                    background: "#E5E7EB",
                                    width: "100%",
                                    padding: "10px",
                                    color: "#1F2937"
                                }}
                                autoComplete='off'
                            />
                            {formik.touched.name && formik.errors.name && (
                                <Box sx={{
                                    color: "#EF4444",
                                    fontSize: "12px",
                                    marginTop: "5px"
                                }}>{formik.errors.email}</Box>
                            )}
                        </Box>
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
                                style={{
                                    boxShadow: "none",
                                    borderRadius: "4px",
                                    background: "#E5E7EB",
                                    width: "100%",
                                    padding: "10px",
                                    color: "#1F2937"
                                }}
                                autoComplete='off'
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
                        {/* Confirm password field */}
                        <Box style={{ marginBottom: "20px" }}>
                            <label htmlFor="confirmPassword" style={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px"
                            }}>
                                Confirm Password
                            </label>
                            <Box style={{ position: "relative" }}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
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
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <IoEyeOutline style={{ color: "#9CA3AF", fontWeight: "600" }} />
                                    ) : (
                                        <IoEyeOffOutline style={{ color: "#9CA3AF", fontWeight: "600" }} />
                                    )}
                                </Box>
                            </Box>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <Box sx={{
                                    color: "#EF4444",
                                    fontSize: "12px",
                                    marginTop: "5px"
                                }}>{formik.errors.confirmPassword}</Box>
                            )}
                            {/* Forget Password link */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
                                <p style={{ color: "#3B82F6", fontSize: "12px", cursor: "pointer" }} onClick={handleForgetPasswordClick}>Forget Password?</p>
                            </Box>
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
                                {formik.isSubmitting ? "Signing up..." : "Sign up"}
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
                            <Box style={{ display: "flex", gap: "18px" }}>
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
                            <p style={{ color: "#9CA3AF", fontSize: "14px" }}>Already have an account?
                                <Link href="/login">
                                    <span style={{ color: "#3B82F6", cursor: "pointer", marginLeft: "5px" }}> Sign in</span>
                                </Link>
                            </p>
                        </Box>
                    </form>
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
            </Box>
        </Box >
    );
};

export default RegisterForm;
