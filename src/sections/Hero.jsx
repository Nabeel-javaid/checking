import React from "react";
import globeImage from "../images/illustrations/globe.png";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function Hero() {
  return (
    <section className="relative bg-primary pt-[140px] bg-opacity-5 pb-28 overflow-hidden">
      <span className="absolute bg-purple-400 -left-28 -top-28 rounded-full opacity-[20%] blur-3xl aspect-square h-[350px] -z-10 animate-pulse" />
      <span className="absolute bg-gradient-to-br from-primary to-secondarys -right-28 -bottom-28 rounded-full opacity-[15%] blur-3xl  delay-700 duration-1000 aspect-square h-[550px] -z-10" />
      <div className="container mx-auto grid md:grid-cols-2">
        <div className="flex items-center">
          <div className="space-y-4">
            <p className="text-primary">SIGN UP TODAY</p>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold max-w-xl leading-normal my-4">
              <span className="break-words">Say </span>
              <span className="break-words text-blue-gradient">
                GoodBye{" "}
              </span>
              <span>To Idle Money</span>
            </h1>
            <p className=" text-gray max-w-lg">
              Invest your spare change in CryptoCurrency and save with
              Lend to earn passive income.
            </p>
            <div className="col-span-2 lg:flex gap-4 lg:mb-12">
              <PrimaryButton className="w-full lg:w-auto mb-2 lg:mb-0">
                Get Started
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          {/* <BlueCircleParticle className="absolute top-0 left-11 duration-[5s]" /> */}
          {/* <OrangeCircleParticle className="absolute bottom-1/4 right-0" /> */}
          <img src={globeImage} alt="GlobalLogo" />
        </div>
      </div>
    </section>
  );
}
