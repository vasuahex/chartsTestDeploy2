import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RxCrossCircled } from "react-icons/rx";
import { Box } from '@mui/material';

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), ""], 'Passwords must match'),
});

const ChangePasswordModal = ({
    show,
    onClose,
}: any) => {
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
        },
    });

    if (!show) return null;

    return (
        <Box
            id="default-modal"
            aria-hidden="true"
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                marginTop: "-30px",
                marginRight: "-30px",
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 'md' }}>
                {/* Modal content */}
                <Box sx={{ position: 'relative', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '32px', textAlign: 'center' }}>
                    {/* Modal header */}
                    <Box sx={{ position: 'relative', paddingBottom: '16px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Forgot password</h3>
                        <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>Set new password for your account so you can login and access all features</p>
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
                            }}
                            data-modal-hide="default-modal"
                        >
                            <RxCrossCircled style={{ width: '20px', height: '20px' }} />
                        </button>
                    </Box>
                    {/* Modal body */}
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ padding: '16px', paddingBottom: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Input */}
                            <Box sx={{ marginBottom: '16px' }}>
                                <label htmlFor="currentPassword" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder="Enter your Current password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.currentPassword}
                                    style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none', transition: 'border-color 0.3s ease' }}
                                />
                                {formik.touched.currentPassword && formik.errors.currentPassword && (
                                    <Box sx={{ color: 'red', fontSize: '12px', fontStyle: 'italic' }}>{formik.errors.currentPassword}</Box>
                                )}
                            </Box>
                            {/* New Password */}
                            <Box sx={{ marginBottom: '16px' }}>
                                <label htmlFor="newPassword" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none', transition: 'border-color 0.3s ease' }}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <Box sx={{ color: 'red', fontSize: '12px', fontStyle: 'italic' }}>{formik.errors.newPassword}</Box>
                                )}
                            </Box>
                            {/* Confirm Password */}
                            <Box sx={{ marginBottom: '16px' }}>
                                <label htmlFor="confirmPassword" style={{ display: 'block', color: '#333', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your new password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white', padding: '8px', color: '#333', width: '100%', outline: 'none', transition: 'border-color 0.3s ease' }}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <Box sx={{ color: 'red', fontSize: '12px', fontStyle: 'italic' }}>{formik.errors.confirmPassword}</Box>
                                )}
                            </Box>
                        </Box>
                        {/* Modal footer */}
                        <Box sx={{ padding: '16px', paddingTop: '0', borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                                type="submit"
                                style={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', width: '100%', outline: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                                disabled={formik.isSubmitting}
                            >
                                Update Password
                            </button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePasswordModal;
