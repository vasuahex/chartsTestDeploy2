import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RxCrossCircled } from "react-icons/rx";
import toast from 'react-hot-toast';
import { Box } from '@mui/material';

const VerificationEmailModal = ({
    email,
    show,
    onClose,
    onOpen
}: any) => {
    return (
        <>
            {show && <Box
                style={{
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
                <Box style={{ position: 'relative', width: 'fit-content', maxWidth: 'md' }}>
                    {/* Formik form */}
                    <Formik
                        initialValues={{ verificationCode: '' }}
                        validationSchema={Yup.object({
                            verificationCode: Yup.string()
                                .required('Verification code is required'),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(values);

                            const response = await fetch('/api/verifyCode', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: email,
                                    code: values.verificationCode,
                                }),
                            });

                            const data = await response.json();
                            if (response.ok) {
                                console.log(data.message);
                                toast.success("Verification Successfull");
                                onClose();
                                onOpen(email, values.verificationCode);
                                setSubmitting(false);
                            } else {
                                toast.error("Please enter the correct verification code");
                                setSubmitting(true);

                                console.error(data.message);
                            }

                        }}
                    >
                        <Form>
                            {show && <Box sx={{ position: 'relative', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '32px' }}>
                                {/* Modal header */}
                                <Box sx={{ position: 'relative', paddingBottom: '16px' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Verification</h3>
                                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px', textAlign: 'center' }}>
                                        Enter verification code that received on your email address
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
                                    {/* Input */}
                                    <Box sx={{ marginBottom: '16px' }}>
                                        <label htmlFor="verificationCode" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                            Verification code
                                        </label>
                                        <Field
                                            type="text"
                                            id="verificationCode"
                                            name="verificationCode"
                                            placeholder="Enter your verification code"
                                            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none' }}
                                        />
                                        <ErrorMessage name="verificationCode" component="Box" className="text-red-500 text-xs italic" />
                                    </Box>
                                </Box>
                                {/* Modal footer */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', width: '100%', outline: 'none' }}
                                    >
                                        Verify
                                    </button>
                                </Box>
                            </Box>}
                        </Form>
                    </Formik>
                </Box>
            </Box>}
        </>
    );
};

export default VerificationEmailModal;
