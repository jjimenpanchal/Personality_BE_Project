import React from "react";
import { NavLink } from "react-router-dom";
// import './index.css'
function FeatureCard(props) {
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
          <p>{props.content}</p>
          <br></br>
          <NavLink className="button" to={props.Goto}>
            {props.ButtonName}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
