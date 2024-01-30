import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import marketCreation from "../images/illustrations/banks.png"; // Replace with an appropriate image depicting market creation
import { Fade } from "react-awesome-reveal";

export default function PlatformFeatures() {
  return (
    <section className="container mx-auto py-32">
      <div className="grid md:grid-cols-2">
        <div>
          <Fade up>
            <img src={marketCreation} alt="Market Creation" />
          </Fade>
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-md">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">
                Empower Your Finance with Decentralized Market Creation
              </h1>
              <div className="space-y-1">
                <h3 className="font-bold">
                  <BsCheckCircleFill className="inline text-primary mr-2" />
                  Create Your Own Lending and Borrowing Market
                </h3>
                <p className="text-gray">
                  Take control of your financial destiny by setting up personalized lending and borrowing markets. Our platform offers unprecedented flexibility, allowing you to tailor conditions such as APR, liquidation time, and coin types.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">
                  <BsCheckCircleFill className="inline text-primary mr-2" />
                  Secure and Trustworthy Transactions
                </h3>
                <p className="text-gray">
                  Your financial security is our top priority. Transactions on our platform are secured with state-of-the-art blockchain technology, ensuring safety, transparency, and compliance with the highest standards.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">
                  <BsCheckCircleFill className="inline text-primary mr-2" />
                  Flexible and User-Centric Design
                </h3>
                <p className="text-gray">
                  Whether you're a market creator or a borrower, our platform is designed with your needs in mind. Enjoy the freedom to close or modify your market at any time, ensuring that you're always in control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
