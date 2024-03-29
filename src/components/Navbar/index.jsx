/* @vite-ignore */ 
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { BsList, BsX } from "react-icons/bs";
import Logo from "../../images/logo2.svg";
import Menus from "./Menus";

// Importing ThirdwebProvider and ConnectWallet
import {
  /* @vite-ignore */ 
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  walletConnect,
  safeWallet,
  trustWallet,
  zerionWallet,
  bloctoWallet,
  frameWallet,
  rainbowWallet,
  phantomWallet,
} from "@thirdweb-dev/react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [backgroundWhite, setBackgroundWhite] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "768px" });

  const handleWindowScroll = () => {
    const height = window.scrollY;
    const thresholdHeight = 50;
    setBackgroundWhite(height > thresholdHeight);
  };

  useEffect(() => {
    setDropdownOpen(isMobile ? false : dropdownOpen);
  }, [isMobile]);

  useEffect(() => {
    setBackgroundWhite(dropdownOpen);
  }, [dropdownOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <ThirdwebProvider
      // activeChain="sepolia"
      clientId="a3aade80daf0ec081979b0bb1ddf3f1c"
      // locale={en()}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet({ recommended: true }),
            walletConnect(),
            trustWallet(),
            zerionWallet(),
            bloctoWallet(),
            frameWallet(),
            rainbowWallet(),
            phantomWallet(),
          ],
        }),
        trustWallet(),
        zerionWallet(),
        bloctoWallet(),
        frameWallet(),
        rainbowWallet(),
        phantomWallet(),
      ]}
    >
      <nav
        className={classNames(
          "fixed w-full transition-all duration-700 z-10 py-8",
          { "bg-white shadow-lg !py-3": backgroundWhite }
        )}
      >
        <div className="container top-0 flex items-center justify-between px-4 mx-auto">
          <div className="flex items-center justify-center">
            <img src={Logo} className="mr-6" alt="Neva" />
          </div>

          <div className="hidden gap-16 lg:flex">
            <Menus />
          </div>


          

          <div className="hidden gap-4 md:flex">
            <ConnectWallet
              theme={"dark"}
              switchToActiveChain={true}
              modalSize={"wide"}
            />
          </div>

          <div className="text-2xl md:hidden">
            <button
              className="z-50 block p-4 transition-all"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen ? <BsX /> : <BsList />}
            </button>

            <div
              className={classNames({
                "text-base left-0 top-full right-0 absolute transition-all duration-400": true,
                "invisible opacity-0": !dropdownOpen,
                "visible opacity-100": dropdownOpen,
              })}
            >
              <div
                className="left-0 h-screen bg-black bg-opacity-30"
                onClick={handleWindowScroll}
              >
                <div className="z-20 p-6 bg-white shadow-xl">
                  <div className="flex gap-4 mb-6">
                    <ConnectWallet
                      theme={"black"}
                      switchToActiveChain={true}
                      modalSize={"wide"}
                    />
                  </div>
                  <div className="mb-4">
                    <Menus /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ThirdwebProvider>
    
  );
}
