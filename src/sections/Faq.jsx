import classNames from "classnames";
import React, { useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import faqImage from "../images/illustrations/faq.png"; // Ensure this image is relevant to your platform
import { Fade } from "react-awesome-reveal";

const FaqItem = ({ open, title, children }) => {
  const [isOpen, setIsOpen] = useState(open ? true : false);

  const iconClass = classNames({
    "transition-all duration-300": true,
    "rotate-180": isOpen,
  });

  const contentClass = classNames({
    "text-gray transition-all duration-300 overflow-hidden": true,
    "h-full": isOpen,
    "h-0": !isOpen,
  });

  return (
    <div className="mb-3 border-b border-lightgray pb-3">
      <div
        className="flex justify-between py-3 cursor-pointer hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <BsChevronUp className={iconClass} />
      </div>
      <div className={contentClass}>
        <p className="select-none">{children}</p>
      </div>
    </div>
  );
};

export default function Faq() {
  return (
    <section className="container mx-auto py-32">
      <div className="grid md:grid-cols-2">
        <div className="mb-4">
          <Fade up duration={1000}>
            <img src={faqImage} alt="FAQ" />
          </Fade>
        </div>
        <div className="flex justify-center">
          <div className="">
            <span className="text-primary">SUPPORT</span>
            <h2 className="font-bold text-4xl mb-6 leading-normal">
              Frequently Asked Questions
            </h2>
            <div className="my-6">
              <FaqItem open={false} title="How do I create a lending or borrowing market?">
                Setting up your market is straightforward. Simply register, choose your lending or borrowing parameters, like APR and liquidation times, and you're ready to start your own crypto lending market.
              </FaqItem>
              <FaqItem open={false} title="What security measures are in place?">
                Our platform prioritizes security with advanced blockchain technology, ensuring safe, transparent, and compliant operations. Regular audits and security checks are conducted to safeguard your interests.
              </FaqItem>
              <FaqItem open={false} title="Can I set my own terms for loans?">
                Absolutely. You have full control over the terms of your lending or borrowing market, including interest rates, liquidation terms, and the type of cryptocurrencies involved.
              </FaqItem>
              <FaqItem open={false} title="How can I close my market?">
                You can close your market at any time. Our platform offers the flexibility to modify or shut down your market based on your evolving financial strategies.
              </FaqItem>
              <FaqItem open={false} title="Is there a fee for creating a market on the platform??">
                We charge a minimal fee for market creation to maintain platform integrity and security. This fee also contributes to the continuous development and improvement of our services. </FaqItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
