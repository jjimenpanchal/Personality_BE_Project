// import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FeatureCard from "./FeatureCard";
const Test = () => {
  return (
    <>
      <div className="testcontainer cards justify-content-center align-items-center">
        <div className="container align-items-centers">
          <FeatureCard
            title="Personality Test"
            Goto="test/Mcqtest"
            ButtonName="Go"
            content="Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a 
				galley of type and scrambled it to make a type specimen book"
          />
          <FeatureCard
            title="Youtube Comment Analyser"
            Goto="/test/youtube"
            ButtonName="Go"
            content="Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a 
				galley of type and scrambled it to make a type specimen book"
          />
          <FeatureCard
            title="Social Media Analyser"
            Goto="/test/socialmedia"
            ButtonName="Go"
            content="Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a 
				galley of type and scrambled it to make a type specimen book"
          />
          <FeatureCard
            title="Text To Personality"
            Goto="/test/texttopersonality"
            ButtonName="Go"
            content="Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a 
				galley of type and scrambled it to make a type specimen book"
          />
          {/* <FeatureCard
            title="Dummy"
            Goto="/aboutpersonalities"
            ButtonName="Go"
            content="Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a 
				galley of type and scrambled it to make a type specimen book"
          /> */}
        </div>
      </div>
      <div className="AboutPButton">
        <NavLink className="button" to="/aboutpersonalities">
          Know About Personality Types
        </NavLink>
      </div>
      <br></br>
      <br></br>
    </>
  );
};

export default Test;
