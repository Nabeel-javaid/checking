import * as React from 'react'; // Corrected import
import { useState, useEffect } from 'react'; // Corrected import for useState
import { styled, alpha } from '@mui/material/styles';
// import {Button from '@mui/material/Button';
import { Button } from '@mui/material';

import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
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
    const feeValue = Number(selectedLoan.CollateralAmount) * feePercent;

    const paid = Number(selectedLoan.PartialPayment);
    const remaining = (100 - paid)/100
    // const fee = feeValue * 

    // console.log("fee", fee);
    const feeAmount = ethers.utils.parseEther(feeValue.toString());
    console.log("Fee to send to Market Owner: ", feeAmount, " ethers.");

    // Repay loan amount to the lender

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Sending ETH to lender...');
    const fee = remaining * selectedLoan.CollateralAmount

    const ethAmount = ethers.utils.parseEther(fee.toString());
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



















const repayCustomAmount = async () => {
  setLoading(true); // Begin loading state

  try {
    // Assuming selectedLoan.CollateralAmount contains the total collateral amount
    const collateralAmount = selectedLoan.CollateralAmount;
    const twentyFivePercent = 0.25 * collateralAmount;

    // Prompt user for custom payment amount
    let customAmount = prompt(`Enter the amount of ETH you wish to repay. It should not be less than ${twentyFivePercent} ETH and not more than ${collateralAmount} ETH.`);

    // Convert string input to number and validate
    customAmount = Number(customAmount);
    if (isNaN(customAmount) || customAmount < twentyFivePercent || customAmount > collateralAmount) {
      alert(`Invalid amount. Please enter a value between ${twentyFivePercent} and ${collateralAmount}.`);
      setLoading(false);
      return;
    }

    console.log(`Repaying custom amount to the lender: ${customAmount} ETH`);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Sending ETH to lender...');
    const txEthLender = await provider.getSigner().sendTransaction({
      to: selectedLoan.RecieverAddress,
      value: ethers.utils.parseEther(customAmount.toString()), // Convert ETH to Wei
    });
    await txEthLender.wait();
    console.log('ETH sent successfully to the lender.');

    let payment = Number(selectedLoan.PartialPayment);
    console.log("payment", payment);
    let payPercentage = (payment + customAmount)/collateralAmount *100 // Calculate new payment percentage

    let newPayment = payPercentage.toString();
    console.log("new payment", newPayment)
    let statusUp = newPayment + '% Repaid';

    if (payPercentage < 100) {
      const { error: updateLoanError } = await supabase
        .from('LoanBid')
        .update({ Status: statusUp, PartialPayment: newPayment })
        .eq('LoanID', selectedLoan.LoanID);

      if (updateLoanError) throw new Error('Failed to update loan status in Supabase.');
    } else if (payPercentage >= 100) { // Use >= to catch overpayments as full repayment
      const { error: updateLoanError } = await supabase
        .from('LoanBid')
        .update({ Status: 'Paying Market', PartialPayment: '100', Repaid: customAmount }) // Set to 100% if overpaid
        .eq('LoanID', selectedLoan.LoanID);

      if (updateLoanError) throw new Error('Failed to update loan status in Supabase.');
    }

  
    setLoading(false); // End loading state
  } catch (error) {
    console.error('Error during custom repayment process:', error);
    setLoading(false); // Ensure loading is always reset
  }
}






















const repayMinimumAmount = async () => {

  setLoading(true); // Begin loading state

  try {

    // Assuming selectedLoan.CollateralAmount contains the total collateral amount
    const collateralAmount = selectedLoan.CollateralAmount;
    const twentyFivePercent = 0.25 * collateralAmount;

    console.log('Repaying 25% of the loan amount to the lender...', twentyFivePercent);


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Sending ETH to lender...');
    const txEthLender = await provider.getSigner().sendTransaction({
      to: selectedLoan.RecieverAddress,
      value: ethers.utils.parseEther(twentyFivePercent.toString()), // Convert ETH to Wei
    });
    
    await txEthLender.wait();
    console.log('ETH sent successfully to the lender.');
   console.log(selectedLoan.PartialPayment);
    let payment = Number(selectedLoan.PartialPayment);

    // let paid = 
    let pay = (payment + 25);  //Add custom/minimum amount paid
    // let paying = pay*collateralAmount; // Calculate new payment percentage
    let newPayment = pay.toString();
    let statusUp = newPayment + '% Repaid';

   if (pay < 100) {
    const { error: updateLoanError } = await supabase
      .from('LoanBid')
      .update({ Status: statusUp, PartialPayment: newPayment })
      .eq('LoanID', selectedLoan.LoanID);

    if (updateLoanError) throw new Error('Failed to update loan status in Supabase.');
   }

   else if (pay === 100) {
    const { error: updateLoanError } = await supabase
      .from('LoanBid')
      .update({ Status: 'Paying Market', PartialPayment: newPayment, Repaid: twentyFivePercent})
      .eq('LoanID', selectedLoan.LoanID);

    if (updateLoanError) throw new Error('Failed to update loan status in Supabase.');
   }


    setLoading(false); // End loading state
  } catch (error) {
    console.error('Error during repayment process:', error);
    setLoading(false); // Ensure loading is always reset
  }

}














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