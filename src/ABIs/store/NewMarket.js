import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_Supabase_Url;
// const supabaseKey = process.env.REACT_APP_Supabase_Anon_Key;


const supabaseUrl = "https://lmsbzqlwsedldqxqwzlv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc2J6cWx3c2VkbGRxeHF3emx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODA2MTEsImV4cCI6MjAxMzU1NjYxMX0.-qVOdECSW9hfokq8N99gCH2BZYpWooXy7zOz1e6fBHM"

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function NewMarket(marketID, marketName, marketDescription, marketOwner, marketType) {

    const ID = Number(marketID);
    const Name = marketName.toString();
    const Description = marketDescription.toString();
    const Owner = marketOwner.toString();
    const mType = marketType.toString();

    console.log("ID:", ID, "|| Name:", Name, "|| Description:", Description, "|| Owner:", Owner);

    // Insert data into the "markets" table
    const { data, error } = await supabase
        .from('Markets')
        .insert([
            {
                id: ID,
                name: Name,
                description: Description,
                owner: Owner,
                Type: mType,
            },
        ]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Market Created');
    }
}