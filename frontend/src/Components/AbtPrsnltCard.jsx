import React from "react";
import { NavLink } from "react-router-dom";
// import PersonalityD from "./PersonalityD"
// import './index.css'
function AbtPrsnltCard({ props }) {
  return (
    <div className="cards">
      <div className="card">
        <div className="card_info">
          <span>
            <h5 className="card_title">
              <br></br>
              {props.title}
              <br></br>
              <br></br>
            </h5>
          </span>
          <p>{props.summary}</p>
          <br></br>
          <br></br>
          <NavLink
            className="button"
            to={{
              pathname: "/knowmore",
              state: {
                props: props,
                // topic:
              },
            }}
          >
            Know More
          </NavLink>
          {/* <button className="button" onClick={fun}>
                {props.ButtonName}
            </button> */}
        </div>
      </div>
    </div>
  );
}

export default AbtPrsnltCard;
