import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    // Function to repay the full loan amount
    function repayFullAmount(repayLoan) {
        console.log(`Borrower repaid the full amount: ${repayLoan.Principal} ETH`);
        // Additional logic to return collateral to borrower from escrow
        // ...
      }
    
      // Function to repay a custom amount
      function repayCustomAmount(repayLoan) {
        const customRepaymentAmount = prompt('Enter the amount in ETH to repay:');
          
        // Check if the user entered a valid amount
        if (customRepaymentAmount !== null && !isNaN(customRepaymentAmount) && parseFloat(customRepaymentAmount) > 0) {
          console.log(`Borrower repaid a custom amount: ${customRepaymentAmount} ETH`);
          // Additional logic to return collateral to borrower from escrow
          // ...
        }
        else {
          alert('Invalid amount entered. Please enter a valid positive number.');
        }
      }
    
      // Function to repay the minimum amount
      function repayMinimumAmount(repayLoan) {
        const minimumRepaymentAmount = 0.002; // Set your minimum repayment amount
        console.log(`Borrower repaid the minimum amount: ${minimumRepaymentAmount} ETH`);
        // Additional logic to return collateral to borrower from escrow
        // ...
      }

  return (
    <div>
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