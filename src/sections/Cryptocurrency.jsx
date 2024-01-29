import React, { useEffect, useState } from "react";
import ListCoin from "../components/ListCoin";
import Trending from "../components/Trending";

import { supabase } from "../utils/supabase";


export default function Cryptocurrency() {

  const [markets, setMarkets] = useState([]);
  const [recen , setRecen] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      let { data, error } = await supabase
        .from('Markets')
        .select('*')
        .order('count', { ascending: false })
        .limit(4);  // Limits the result to the top 5 items
  
      if (error) console.log('Error fetching markets:', error);
      else setMarkets(data);
    };
  
    fetchMarkets();
  }, []);

  useEffect(() => {
    const fetchRecen = async () => {
      let { data, error } = await supabase
        .from('LoanBid')
        .select('*')
        .limit(4);  // Limits the result to the top 5 items
  
      if (error) console.log('Error fetching markets:', error);
      else setRecen(data);
    };
  
    fetchRecen();
  }
  , []);

 
  useEffect(() => {
    const fetchBids = async () => {
      let { data, error } = await supabase
        .from('LoanBid')
        .select('*')
        .order('CollateralAmount', { ascending: false })
        .limit(4);  // Limits the result to the top 4 items
  
      if (error) console.log('Error fetching markets:', error);
      else setBids(data);
    };
  
    fetchBids();
  }
  , []);


  const recentlyCoins = recen.map((coin, index) => ({
    image: `/cryptocurrencies/${(index % 4) +11}.png`, // Cycles through images 1 to 4
    name: coin.BorrowerAddress.slice(0, 10), // Shows only the first 20 digits of BorrowerAddress
    price: coin.CollateralAmount, // Using CollateralAmount as the price
    uptrend: true, // Setting uptrend as true for all coins; adjust if necessary
  }));
  


  const trendingCoins = markets.map((coin, index) => ({
    image: `/cryptocurrencies/${(index % 4) + 1}.png`, // Cycles through images 1 to 4
    name: coin.name,
    price: coin.count, // Assuming 'count' is the price
    uptrend: true, // Setting uptrend as true for all coins; adjust if necessary
  }));
  
  

  const gainerCoins = bids.map((coin, index) => ({
    image: `/cryptocurrencies/${(index % 4) + 21}.png`, // Cycles through images 1 to 4
    name: coin.BorrowerAddress.slice(0, 10),// Shows only the first 20 digits of BorrowerAddress
    price: coin.CollateralAmount, // Using CollateralAmount as the price
    uptrend: true, // Setting uptrend as true for all coins; adjust if necessary
  }));


  return (
    <section className="relative md:-mt-10">
      <div className="container mx-auto rounded-3xl bg-white py-8 px-4 shadow mb-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          <div className="px-4 mb-6 lg:mb-0">
            <Trending title="🔥 Trending Markets" data={trendingCoins} />
          </div>
          <div className="px-4 mb-6 lg:mb-0">
            <ListCoin title="🚀 Top Bids" data={gainerCoins}  />
          </div>
          <div className="px-4 mb-6 lg:mb-0">
            <ListCoin title="💎 Recently Bid" data={recentlyCoins}  />
          </div>
        </div>
      </div>  
    </section>
  );
}
