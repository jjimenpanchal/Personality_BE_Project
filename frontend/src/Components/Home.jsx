import React from "react";
import web from "../../src/images/home.jpg";
// import { NavLink } from "react-router-dom";
import Commom from "./Commom";

const Home = () => {
  return (
    <>
      <Commom
        name="Knowing yourself is the beginning of all wisdom"
        imgsrc={web}
        visit="/test"
        btname="Get Started"
        msg="End destination for all about personlaity"
      />
    </>
  );
};

export default Home;
