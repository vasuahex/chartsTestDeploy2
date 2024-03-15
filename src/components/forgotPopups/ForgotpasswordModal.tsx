import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RxCrossCircled } from "react-icons/rx";
import toast from 'react-hot-toast';
import { Box } from '@mui/material';

const ForgetPasswordModal = ({
    show,
    onClose,
    onOpen
}: any) => {
    if (!show) return null;

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
                    {/* Modal content */}
                    <Box sx={{ position: 'relative', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '32px' }}>
                        {/* Modal header */}
                        <Box sx={{ position: 'relative', paddingBottom: '16px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Forgot password</h3>
                            <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>Enter your email address to receive a verification code</p>
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
                                    marginTop:"-30px",
                                    marginRight:"-30px",
                                }}
                            >
                                <RxCrossCircled style={{ width: '20px', height: '20px' }} />
                            </button>
                        </Box>
                        {/* Modal body */}
                        <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Formik form */}
                            <Formik
                                initialValues={{ email: '' }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('Invalid email').required('Email is required'),
                                })}
                                onSubmit={async (values, actions) => {
                                    console.log('reset values', values);
                                    try {
                                        const resUserExists = await fetch("api/userExists", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ email: values.email }),
                                        });

                                        const { user } = await resUserExists.json();

                                        if (!user) {
                                            toast.error("User does not exist.");
                                            return;
                                        }

                                        const res = await fetch("api/forgotPassword", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                email: values.email,
                                            }),
                                        });
                                        console.log('res', res);

                                        if (res.ok) {
                                            toast.success("Reset mail sent successfully.");
                                        } else {
                                            toast.error("User registration failed.");
                                        }
                                    } catch (error) {
                                        console.log("Error during registration: ", error);
                                    }
                                    onClose();
                                    onOpen(values.email);

                                    actions.setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        {/* Email field */}
                                        <Box sx={{ marginBottom: '16px' }}>
                                            <label htmlFor="email" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}   >Email</label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none' }}
                                            />
                                            <ErrorMessage name="email"
                                                component="Box"
                                                className="text-red-500 text-xs italic" />
                                        </Box>
                                        {/* Submit button */}
                                        <Box sx={{ padding: '16px' }}>
                                            <button
                                                type="submit"
                                                style={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', width: '100%', outline: 'none', cursor: 'pointer' }}
                                                disabled={isSubmitting}
                                            >
                                                Send verification code
                                            </button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </Box>
            </Box>}
        </>
    );
};

export default ForgetPasswordModal;
