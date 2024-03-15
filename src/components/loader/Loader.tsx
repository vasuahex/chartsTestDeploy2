import { Box } from "@mui/material";

const Loader = () => {
    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box style={{ animation: 'spin 1s linear infinite', borderTop: '4px solid #00f', borderRadius: '50%', height: '48px', width: '48px' }}></Box>
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
}

export default Loader;
