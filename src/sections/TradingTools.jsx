import React from "react";
import SecondaryButton from "../components/buttons/SecondaryButton";
import tradingTools from "../images/illustrations/tradingtools.png";
import { Fade } from "react-awesome-reveal";

export default function TradingTools() {
  return (
    <section className="px-6">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F4F9FF] py-20">
          <div className="grid md:grid-cols-2">
            <div className="lg:row-start-1 flex items-center justify-center">
              <div className="max-w-md space-y-4">
                <h1 className="text-2xl font-bold leading-normal">
                  Advanced Trading{" "}
                  <span className="text-blue-gradient">Platform</span>
                </h1>
                <div className="space-y-2">
                  <h3 className="font-bold">
                    Professional Access, Non-stop Availability
                  </h3>
                  <p className="text-gray">
                    We provide premium access to crypto lending and Borrowing for both
                    individuals and institutions through reliable Bid execution and constant uptime.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">A Range of Powerful Tools</h3>
                  <p className="text-gray">
                    Set up your own trading condition or deploy your own
                    Market with our high-performing Dapp.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Customer Support</h3>
                  <p className="text-gray">
                    Premium 24/7 support available to all customers worldwide by
                    email. Dedicated account managers for partners.
                  </p>
                </div>
                <div className="flex">
                  <SecondaryButton>Get Started</SecondaryButton>
                  <a href="#">
                    {/* <button className="py-4 px-10 text-primary underline">
                      Learn more
                    </button> */}
                  </a>
                </div>
              </div>
            </div>
            <div className="row-start-1 mb-8">
              <Fade up>
                <img src={tradingTools} alt="tradingTools" />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
