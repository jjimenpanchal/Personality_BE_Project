import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

function TextToPersonality() {
  const [value, setvalue] = useState("");
  const [msg, setmsg] = useState("");
  const onchange = (e) => {
    setvalue(e.target.value);
  };
  function countWord() {
    var str = value;
    str = str.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    return str.split(" ").length >= 300;
  }
  const [ans, setans] = useState({});
  const onclick = () => {
    console.log("calling");
    setans({});
    if (countWord()) {
      setmsg("");
      axios.post("/api/text_to_personality/", value).then((response) => {
        // console.log(response.data);
        setans(response.data);
      });
    } else {
      setmsg("Please Enter Minimum 300 Words");
    }
  };

  return (
    <Container className="justify-content-center text-center my-10">
      {/* {console.log(ans)} */}
      <h1>Enter Text</h1>
      <br />
      <div className="container justify-content-center align-content-center">
        <textarea
          // type="text"
          // name="ProfileLink"
          value={value}
          placeholder="Start Entering Text From Here And Enter Minimum 300 Words"
          rows="15"
          cols="100"
          required
          style={{
            padding: "13px",

            //   border: "None",
            //   outline: "none",
            //   borderBottom: "1px solid #CCC",
          }}
          onChange={onchange}
        />
        <div>{msg ? <label className="required">{msg}</label> : ""}</div>
      </div>
      <br></br>
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

export default TextToPersonality;
