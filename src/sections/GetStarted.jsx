import React from "react";
import createMarketImage from "../images/illustrations/signup.png"; // Image showing market creation
import customizeMarketImage from "../images/illustrations/wallet.png"; // Image showing market customization
import participateMarketImage from "../images/illustrations/okay.png"; // Image showing participation in a market
import arrow from "../images/arrow.svg";
import { Fade } from "react-awesome-reveal";

export default function GetStarted() {
  return (
    <section className="px-6">
      <div className="rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F4F9FF] py-20">
        <div className="container mx-auto ">
          <div className="py-6">
            <h1 className="text-center text-2xl font-bold leading-normal">
              Get Started in Just a Few Minutes
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-20">
            <Fade up>
              <div className="text-center relative px-4">
                <div className="relative">
                  <img
                    src={createMarketImage}
                    alt="Create Market"
                    className="mb-4 mx-auto"
                  />
                  <img
                    src={arrow}
                    alt="arrow"
                    className="hidden md:block absolute top-1/2 -right-32"
                  />
                </div>
                <h3 className="text-lg font-bold">Create Your Market</h3>
                <p className="text-gray">
                  Set up your own lending and borrowing market with customized terms like APR, liquidation time, and coin options.
                </p>
              </div>
            </Fade>
            <Fade up delay={200}>
              <div className="text-center relative px-4">
                <div className="relative">
                  <img
                    src={customizeMarketImage}
                    alt="Customize Market"
                    className="mb-4 mx-auto"
                  />
                  <img
                    src={arrow}
                    alt="arrow"
                    className="hidden md:block absolute top-1/2 -right-32"
                  />
                </div>
                <h3 className="text-lg font-bold">Customize Terms</h3>
                <p className="text-gray">
                  Tailor the conditions of your market to suit your financial strategy and risk preferences.
                </p>
              </div>
            </Fade>
            <Fade up delay={400}>
              <div className="text-center relative px-4">
                <div className="relative">
                  <img
                    src={participateMarketImage}
                    alt="Participate in Market"
                    className="mb-4 mx-auto"
                  />
                </div>
                <h3 className="text-lg font-bold">Borrow or Lend</h3>
                <p className="text-gray">
                  Join an existing market as a borrower or lender and engage in transactions under agreed-upon terms.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
