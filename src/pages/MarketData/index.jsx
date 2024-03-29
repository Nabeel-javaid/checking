/* eslint-disable */

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import {styled} from '@mui/system';

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Badge,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,  
  TableRow,

} from '@mui/material';

import Layout from '../../components/Layout';
import Web3 from 'web3';
import { createClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../ABIs/MarketData.css'; // Custom CSS for styling
import abi from "../../ABIs/marketRegistery.json";


// Supabase client initialization

const supabaseUrl = "https://lmsbzqlwsedldqxqwzlv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc2J6cWx3c2VkbGRxeHF3emx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODA2MTEsImV4cCI6MjAxMzU1NjYxMX0.-qVOdECSW9hfokq8N99gCH2BZYpWooXy7zOz1e6fBHM"


const supabase = createClient(supabaseUrl, supabaseKey);

const StyledCard = styled(Card)({
  marginBottom: '20px',
  padding: '20px',
});

const StyledDivider = styled(Divider)({
  marginBottom: '20px',
});

const useStyles = () => ({
  actionButtons: {
    marginBottom: '20px',
    '& > *': {
      marginRight: '10px',
    },
  },
  participantsPaper: {
    padding: '20px',
  },
});

const MarketData = () => {
  const { id } = useParams();
  console.log(id);
  const marketID = Number(id);
  const [marketData, setMarketData] = useState(null);
  const [marketDetails, setMarketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const [marketParticipants, setMarketParticipants] = useState([]);

  useEffect(() => {
    const fetchMarketParticipants = async () => {
      try {
        const { data, error } = await supabase
          .from('LoanBid')
          .select('*')
          .eq('MarketplaceID', marketID)
          .range(0, 1);

        if (error) {
          console.error('Error fetching market participants:', error);
        } else {
          setMarketParticipants(data.slice(0, 5)); // Take the latest 5 rows
        }
      } catch (error) {
        console.error('Error in fetchMarketParticipants:', error);
      }
    };

    fetchMarketParticipants();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {  
      try {
        const web3 = new Web3(window.ethereum);
        const contractAddress = '0xad9ace8a1ea7267dc2ab19bf4b10465d56d5ecf0';
        const marketContract = new web3.eth.Contract(abi, contractAddress);

        // Fetch market data
        const marketInfo = await marketContract.methods.getMarketData(marketID).call();
        setMarketData(marketInfo);

        // Fetch market details from Supabase
        await loadMarketDetails(marketID);
      } catch (error) {
        console.error('Error loading market details:', error);
        // toast.error('Error loading blockchain data. Please try again.'); // Display error toast
      } finally {
        setLoading(false);
      }
    };

    const loadMarketDetails = async (marketID) => {
      try {
        const { data: Market, error } = await supabase
          .from('Markets')
          .select('*')
          .eq('id', marketID);
  
        if (error) {
          console.error('Error loading data from Supabase:', error);
          toast.error('Error loading data. Please try again.'); // Display error toast
        } else if (Market && Market.length > 0) {
          setMarketDetails(Market[0]);
          console.log("market details", Market[0])
        } else {
          console.warn('No market details found for ID:', marketID);
          toast.warn('No market details found.'); // Display warning toast
        }
      } catch (error) {
        console.error('Unexpected error while loading market details:', error);
        toast.error('Unexpected error. Please try again.'); // Display error toast
      }
    };

    loadBlockchainData();
    loadMarketDetails(marketID);
  }, [marketID]);

  if (loading) {
    return (
      <Layout>
        <Container >
          <Grid
            container
            justifyContent="center"
            alignItems="left"
            style={{ paddingTop: '10%' }}
            // style={{ height: '100vh', backgroundColor:"red" }}
          >
            {/* <CircularProgress color="primary" /> */}
            <iframe title='Loading' src="https://lottie.host/?file=474793e3-81ee-474c-bc0b-78562b8fa02e/dwOgWo0OlT.json"></iframe>
          </Grid>
        </Container>
      </Layout>
    );
  }

  if (!marketDetails) {
    return (
      <Layout>
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '80vh' }}
          >
            <Typography variant="h4"></Typography>
          </Grid>
        </Container>
      </Layout>
    );
  }

  return (


  
<Layout>
  {marketDetails && !marketDetails.isClosed ? (
    <Container style={{ marginTop: '120px' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="black"
        sx={{
          marginBottom: '20px',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        Market Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {/* Market Details */}
            <TableRow>
              <TableCell>Market Name</TableCell>
              <TableCell>{marketDetails.name}</TableCell>
            </TableRow>
            {/* Additional Market Details */}
            <TableRow>
              <TableCell>Additional Details</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment Cycle Duration</TableCell>
              <TableCell>{marketDetails.paymentCycle}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Active Loans</TableCell>
              <TableCell>20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Value Locked</TableCell>
              <TableCell>$1,000,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />

      {/* Card for Market Participants */}
      <Card variant="filled">
        <CardContent>
          <Box display="flex" justifyContent="center">
            <div>
              <Typography variant="h5" marginLeft={"20px"} marginTop={"20px"} fontWeight={"bold"}>
                Market Participants
              </Typography>
              <List>
                {marketParticipants.map((participant, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{/* You can customize the avatar based on the participant data */}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={'Borrower'}
                      secondary={participant.BorrowerAddress}
                    />
                    <IconButton>{/* Add an icon or action button */}</IconButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Box>
        </CardContent>
      </Card>

      {/* //box card */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            window.location.href = `/view-loans/${marketID}`;
          }}
          sx={{ marginRight: '16px', marginBottom: '20px', borderRadius: '404px' }}
        >
          View Loans
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = `/create-loan/${marketID}`;
          }}
          sx={{ marginBottom: '20px', borderRadius: '404px' }}
        >
          Create Loan
        </Button>
        {/* Add more buttons for other actions */}
      </Box>
    </Container>
  ) : (
    <iframe
    src="https://lottie.host/embed/7207cecd-7148-4266-ac54-38484060dc56/a9kOWn6XTr.json"
    style={{ width: '100%', height: '30rem', paddingTop: '10%'}}
    ></iframe>
  )}
</Layout>
  );
};

export default MarketData;
