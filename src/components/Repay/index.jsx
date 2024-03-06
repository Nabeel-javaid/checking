import * as React from 'react'; // Corrected import
import { useState } from 'react'; // Corrected import for useState
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ScaleLoader from "react-spinners/ScaleLoader";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ethers } from 'ethers';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Repay({ selectedLoan }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false); // Use useState correctly here
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const repayFullAmount = async (repayLoan) => {
    setLoading(true); // Set loading to true at the beginning of the transaction
    try {
      const ethAmount = ethers.utils.parseEther(repayLoan.Principal);
      const toAddress = repayLoan.RecieverAddress;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('Sending ETH to.....' + toAddress);
      const txEth = await provider.getSigner().sendTransaction({
        to: toAddress,
        value: ethAmount,
      });

      await txEth.wait();
      console.log('ETH sent successfully to the escrow');
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the transaction completes
    }
  };

  // Functions for custom and minimum repay omitted for brevity

  return (
    <div>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ScaleLoader color={"#123abc"} loading={loading} size={150} />
        </div>
      )}
      





      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Repay Loan
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); repayFullAmount(selectedLoan); }} disableRipple>
          Full Repay
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); repayCustomAmount(selectedLoan); }} disableRipple>
          Custom Repay
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); repayMinimumAmount(selectedLoan); }} disableRipple>
          Minimum Repay
        </MenuItem>
      </StyledMenu>
    </div>
  );
}