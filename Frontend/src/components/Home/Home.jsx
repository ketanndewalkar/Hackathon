import React from "react";
import Navbar from "../Website/Navbar";
import HeroSection from "../Website/HeroSection";
import ImpactBar from "../Website/ImpactBar";

const Home = () => {
  return (
    <>
      <div className="w-full h-fit overflow-x-hidden">
        <Navbar/>
        <HeroSection/>
        <ImpactBar/>
      </div>
    </>
  );
};

export default Home;
