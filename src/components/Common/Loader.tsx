import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { BoxProps, CircularProgressProps } from '@mui/material';

interface LoaderProps extends BoxProps {
    size?: number | string;
    color?: CircularProgressProps['color'];
    thickness?: number;
    fullPage?: boolean;
    inline?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    size = 40,
    color = 'secondary',
    thickness,
    fullPage = false,
    inline = false,
    sx,
    ...props
}) => {
    if (inline) {
        return <CircularProgress color={color} size={size} thickness={thickness} />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: fullPage ? '60vh' : 'auto',
                width: '100%',
                py: fullPage ? 0 : 4,
                ...sx
            }}
            {...props}
        >
            <CircularProgress color={color} size={size} thickness={thickness} />
        </Box>
    );
};

export default Loader;
