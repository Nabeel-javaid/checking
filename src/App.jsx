import React from "react";
import Home from "./pages/landingPage";
import CreateMarket from "./pages/createMarket"
import Profile from "./pages/Profile";
import ViewMarket from "./pages/viewMarket";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// import { ThirdwebProvider } from "@thirdweb-dev/react";


function App() {
  // <ThirdwebProvider activeChain="ethereum" clientId="a3aade80daf0ec081979b0bb1ddf3f1cnpm run ">
    return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-market" element={<CreateMarket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-market" element={<ViewMarket />} />
          
        </Routes>
      </BrowserRouter>
      </div>
    )
  {/* </ThirdwebProvider> */}

}

export default App;
