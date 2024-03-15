import React from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';

const UpdatePasswordModal = ({
    email,
    code,
    show,
    onClose,
    onOpen
}: any) => {
    if (!show) return null;
    console.log('email, code from update', email, code);
    return (
        <>
            {show && <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            >
                <Box sx={{ position: 'relative', width: 'fit-content', maxWidth: 'md' }}>
                    {/* Formik form */}
                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        validationSchema={Yup.object({
                            newPassword: Yup.string()
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
                                .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match the password')
                                .required('Confirm Password is required'),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {

                            try {
                                const response = await fetch('/api/updatePassword', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        email: email, // Assuming you have the user's email available here
                                        code: code, // The code that was previously verified
                                        newPassword: values.newPassword,
                                    }),
                                });

                                const data = await response.json();
                                if (response.ok) {
                                    // Password update successful
                                    toast.success("Password updated successfully.");
                                    onClose();
                                    onOpen();
                                    // Further actions here, like redirecting to the login page
                                } else {
                                    // Password update failed
                                    toast.error(data.message || "Password update failed.");
                                    // Handle the error, possibly resetting form state
                                }
                                setSubmitting(false);
                            }
                            catch (err) {
                                console.log(err)
                            }
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            {/* Modal content */}
                            <Box sx={{ position: 'relative', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '32px' }}>
                                {/* Modal header */}
                                <Box sx={{ position: 'relative', paddingBottom: '16px' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Forgot password</h3>
                                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px', textAlign: 'center' }}>
                                        Set a new password for your account to access all features.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        type="button"
                                        style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '4px',
                                            backgroundColor: 'transparent',
                                            color: '#888',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: "-30px",
                                            marginRight: "-30px",
                                        }}
                                    >
                                        <RxCrossCircled style={{ width: '20px', height: '20px' }} />
                                    </button>
                                </Box>
                                {/* Modal body */}
                                <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {/* Input for New Password */}
                                    <Box sx={{ marginBottom: '16px' }}>
                                        <label htmlFor="newPassword" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                            New Password
                                        </label>
                                        <Field
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            placeholder="Enter your new password"
                                            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none' }}
                                        />
                                        <ErrorMessage name="newPassword" component="Box" className="text-red-500 text-xs italic" />
                                    </Box>
                                    {/* Input for Confirm Password */}
                                    <Box sx={{ marginBottom: '16px' }}>
                                        <label htmlFor="confirmPassword" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                            Confirm Password
                                        </label>
                                        <Field
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm your new password"
                                            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none' }}
                                        />
                                        <ErrorMessage name="confirmPassword" component="Box" className="text-red-500 text-xs italic" />
                                    </Box>
                                </Box>
                                {/* Modal footer */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', width: '100%', outline: 'none' }}
                                    >
                                        Update Password
                                    </button>
                                </Box>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </Box>}
        </>
    );
};

export default UpdatePasswordModal;
