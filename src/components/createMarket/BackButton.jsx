import React from 'react';
import { MUIButton } from '@mui/material';
import {ArrowBackIcon} from '@mui/icons-material';

const BackButton = ({ handleBack }) => {
    return (
        <MUIButton
            type="button"
            onClick={handleBack}
            variant="outlined"
            color="primary"
            style={{ borderRadius: "30px", padding: "10px 30px" }}
        >
            <ArrowBackIcon /> Back
        </MUIButton>
    );
};

export default BackButton;
