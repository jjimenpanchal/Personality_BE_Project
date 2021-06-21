import React from "react";
// import web from "../../src/images/about.jpg";
// import { NavLink } from "react-router-dom";
// import Commom from "./Commom";
import jimen from "../../src/images/jimen.jpg";
import nikhil from "../../src/images/nikhil.jpeg";
import rishikesh from "../../src/images/rishikesh.jpeg";
import manav from "../../src/images/about.jpg";
import About_card from "./About_card";
const About = () => {
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="align-content-center">
        <div>
          <About_card
            img={nikhil}
            name="Nikhil Patil"
            pos="Founder"
            about="Software Engineer At Persistant Systems"
            link="https://www.linkedin.com/in/nikhilpatil16"
            // hight=""
          />
          <About_card
            img={jimen}
            name="Jimen Luhar"
            pos="Co-Founder"
            about="System Engineer Specialist At Infosys"
            link="https://www.linkedin.com/in/jimen-luhar-724ab8174/"
          />
          <About_card
            img={manav}
            name="Manav Parekh"
            pos="Co-Founder"
            about="Software Engineer At Cognizant"
            link="https://www.linkedin.com/in/manav-parikh-a048861a6/"
          />
          <About_card
            img={rishikesh}
            name="Rishikesh Sahane"
            pos="Co-Founder"
            about="System Engineer At Infosys"
            link="https://www.linkedin.com/in/rishikesh-sahane-2476a91b3"
          />
        </div>
      </div>
      {/* <Commom
				name="Welcome to About page"
				// imgsrc={web}
				visit="/contact"
				btname="Contact Now"
			/> */}
    </>
  );
};

export default About;
