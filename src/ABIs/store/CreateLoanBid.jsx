import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lmsbzqlwsedldqxqwzlv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc2J6cWx3c2VkbGRxeHF3emx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODA2MTEsImV4cCI6MjAxMzU1NjYxMX0.-qVOdECSW9hfokq8N99gCH2BZYpWooXy7zOz1e6fBHM"

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function CreateLoanBid(LTA, MID, Principal, Duration, APR, RA, CType, CAmount, CAddress, Status, Borrower) {
    const lendingTokenAddress = LTA.toString();
    const marketID = MID.toString();
    const principal = Principal.toString();
    const duration = Duration.toString();
    const apr = APR.toString();
    const recipientAddress = RA.toString();
    const collateralType = CType.toString();
    const collateralAmount = CAmount.toString();
    const collateralAddress = CAddress.toString();
    const status = Status.toString();
    const borrowerAddress = Borrower.toString();

    const { data, error } = await supabase
        .from('LoanBid')
        .insert([
            {
                LendingTokenAddress: lendingTokenAddress,
                MarketplaceID: marketID,
                Principal: principal,
                Duration: duration,
                APR: apr,
                RecieverAddress: recipientAddress,
                CollateralType: collateralType,
                CollateralAmount: collateralAmount,
                CollateralAddress: collateralAddress,
                Status: status,
                BorrowerAddress: borrowerAddress
            },
        ]);

    console.log("Lending Token Address:", lendingTokenAddress, "|| Market ID:", marketID, "|| Principal:", principal, "|| Duration:", duration, "|| APR:", apr, "|| Recipient Address:", recipientAddress, "|| Collateral Type:", collateralType, "|| Collateral Amount:", collateralAmount, "|| Collateral Address:", collateralAddress, "|| Status:", status, "|| Borrower Address:", borrowerAddress);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Loan Bid Created');
    }
}