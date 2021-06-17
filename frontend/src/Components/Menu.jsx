import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Test from "./Test";
import Youtube from "./Youtube";
import Socialmedia from "./Socialmedia";
import Mcqtest from "./Mcqtest";
import TextToPersonality from "./TextToPersonality";
import AboutPersonalities from "./AboutPersonalities";
import PersonalityD from "./PersonalityD";

const Menu = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/test/mcqtest" component={Mcqtest} />
        {/* <Route
          exact
          path="/test/mcqtest"
          render={() => {
            window.location.href = "public/Mcqtest.html";
          }}
        /> */}

        <Route exact path="/test/youtube" component={Youtube} />
        <Route exact path="/test/socialmedia" component={Socialmedia} />
        <Route
          exact
          path="/test/texttopersonality"
          component={TextToPersonality}
        />
        <Route
          exact
          path="/aboutpersonalities"
          component={AboutPersonalities}
        />
        <Route exact path="/knowmore" component={PersonalityD} />
        <Route component={Home} />
      </Switch>
    </>
  );
};
export default Menu;
