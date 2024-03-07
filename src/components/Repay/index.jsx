import * as React from 'react'; // Corrected import
import { useState, useEffect } from 'react'; // Corrected import for useState
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ScaleLoader from "react-spinners/ScaleLoader";
import { createClient } from '@supabase/supabase-js';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ethers } from 'ethers';

const supabaseUrl = "https://lmsbzqlwsedldqxqwzlv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc2J6cWx3c2VkbGRxeHF3emx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODA2MTEsImV4cCI6MjAxMzU1NjYxMX0.-qVOdECSW9hfokq8N99gCH2BZYpWooXy7zOz1e6fBHM"

const supabase = createClient(supabaseUrl, supabaseKey);

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
    borderRadius: 20, // Add or modify this line for border radius
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
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
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function Repay({ selectedLoan, marketDetails }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false); // Use useState correctly here

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const repayFullAmount = async () => {
  setLoading(true); // Begin loading state

  try {
    
    // Calculate and log the fee to send to Market Owner
    const feePercent = Number(marketDetails.Fee)/100;
    const feeValue = Number(selectedLoan.Principal) * feePercent;

    const fee = feeValue.toString();
    const feeAmount = ethers.utils.parseEther(fee);
    console.log("Fee to send to Market Owner: ", feeAmount, " ethers.");

    // Repay loan amount to the lender
    const ethAmount = ethers.utils.parseEther(selectedLoan.Principal);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Sending ETH to lender...');
    const txEthLender = await provider.getSigner().sendTransaction({
      to: selectedLoan.RecieverAddress,
      value: ethAmount,
    });
    await txEthLender.wait();
    console.log('ETH sent successfully to the lender.');

    // Update Loan Status and Repaid Value
    const { error: updateLoanError } = await supabase
      .from('LoanBid')
      .update({ Status: 'Paying Market', Repaid: selectedLoan.Principal })
      .eq('LoanID', selectedLoan.LoanID);

    if (updateLoanError) throw new Error('Failed to update loan status in Supabase.');

    // // Send fee to market owner
    console.log('Sending Fee to Market Owner...');
    const txEthFee = await provider.getSigner().sendTransaction({
      to: marketDetails.owner,
      value: feeAmount,
    });
    await txEthFee.wait();
    console.log('Fee sent successfully to market owner.');

    // Update the Tax Collected for the market owner
    const { data: feeUpdateData, error: feeUpdateError } = await supabase
      .from('Markets')
      .update({ TaxCollected: feeAmount }) // This is pseudo-code; actual syntax will depend on your table structure
      .eq('owner', marketDetails.id); // Assuming `ownerId` is how you link to the specific market owner

    // Update Loan Status
    const { error: updateLoanError2 } = await supabase
      .from('LoanBid')
      .update({ Status: 'Repaid' })
      .eq('LoanID', selectedLoan.LoanID);

    if (updateLoanError2) throw new Error('Failed to update market owner fee in Supabase.');

    console.log('Market owner fee updated in database.', feeUpdateData);

    setLoading(false); // End loading state
  } catch (error) {
    console.error('Error during repayment process:', error);
    setLoading(false); // Ensure loading is always reset
  }
};


const repayCustomAmount = async () => {}

const repayMinimumAmount = async () => {}














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
        sx={{ borderRadius: '17px' }}
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
        <MenuItem onClick={() => { handleClose(); repayFullAmount(); }} disableRipple>
          Full Repay
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); repayCustomAmount(); }} disableRipple>
          Custom Repay
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); repayMinimumAmount(); }} disableRipple>
          Minimum Repay
        </MenuItem>
      </StyledMenu>
    </div>
  );
}