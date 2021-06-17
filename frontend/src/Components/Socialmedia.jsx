import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Socialmedia() {
  const [value, setvalue] = useState("");
  const onchange = (e) => {
    setvalue(e.target.value);
  };

  const [ans, setans] = useState({});
  const onclick = () => {
    console.log("calling");
    setans({});
    axios.post("/api/twitter/", value).then((response) => {
      // console.log(response.data);
      setans(response.data);
    });
  };

  return (
    <Container className="justify-content-center text-center my-10">
      {/* {console.log(ans)} */}
      <h1>Enter Username Here</h1>
      <br />
      <input
        type="url"
        name="ProfileLink"
        value={value}
        placeholder="Enter Profile Link Here"
        required
        style={{
          border: "None",
          outline: "none",
          borderBottom: "1px solid #CCC",
        }}
        onChange={onchange}
      />

      <button className="button" onClick={onclick}>
        Submit
      </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {ans.ans ? (
        <div>
          <br></br>
          <br></br>
          <h4> {ans.ans}</h4>
        </div>
      ) : (
        ""
      )}
      {ans.idx ? (
        <div>
          <br></br>
          <h3>Personality Type Is: {ans.title}</h3>
          <br></br>
          <NavLink
            className="button"
            to={{
              pathname: "/knowmore",
              state: {
                props: ans,
                // topic:
              },
            }}
          >
            Know More
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Socialmedia;
