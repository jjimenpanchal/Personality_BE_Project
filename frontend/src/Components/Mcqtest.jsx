import React, { useState } from "react";
import data from "../Data/Ques";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import "./styles.css";
function Mcqtest() {
  let temp_arr = [];
  for (var i = 0; i < data.length; i++) temp_arr.push("na");
  const [arr, setarr] = useState(temp_arr);
  const [flag, setflag] = useState(false);
  const [msg, setmsg] = useState("");
  const [ans, setans] = useState({});
  // const [personality, setpersonality] = useState("");
  const onchange = (e) => {
    // console.log(e);
    const temp_arr = arr.map((element, idx) => {
      if (idx === parseInt(e.target.id)) {
        return e.target.value;
      }
      return element;
    });

    setarr(temp_arr);
  };

  function printresult() {
    return (
      <div>
        <br></br>
        <h2 className="text-center">Personality Type Is: {ans.title}</h2>
        <br></br>
        {ans.title ? (
          <div className="text-center">
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
            <br></br>
            <br></br>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  function calculate() {
    let mp = new Map();
    mp["e"] = 0;
    mp["i"] = 0;
    mp["s"] = 0;
    mp["n"] = 0;
    mp["t"] = 0;
    mp["f"] = 0;
    mp["j"] = 0;
    mp["p"] = 0;
    var flag2 = true;
    arr.map((element) => {
      if (element === "na") flag2 = false;
      else mp[element]++;
    });
    if (!flag2) return "na";

    var personalityType = "";
    if (mp["e"] >= mp["i"]) personalityType += "E";
    else personalityType += "I";

    if (mp["s"] >= mp["n"]) personalityType += "S";
    else personalityType += "N";

    if (mp["t"] >= mp["f"]) personalityType += "T";
    else personalityType += "F";

    if (mp["j"] >= mp["p"]) personalityType += "J";
    else personalityType += "P";
    return personalityType;
  }

  const onclick1 = (e) => {
    var p = calculate();
    console.log(p);
    if (p === "na") {
      setmsg("Please Answer All The Questions First");
    }
    if (p !== "na") {
      setans({});
      axios.post("/api/getType/", p).then((response) => {
        console.log(response.data);
        setans(response.data);
        setflag(true);
        setmsg("");
      });
    }
  };

  let temp = data.map((element) => {
    return (
      <li>
        <strong>{element.question}</strong>
        <br />
        <div className="radio">
          <label>
            <input
              type="radio"
              value={element.value1}
              id={element.idx}
              onChange={onchange}
              checked={element.value1 === arr[element.idx]}
            />
            {element.option1}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={element.value2}
              id={element.idx}
              onChange={onchange}
              checked={element.value2 === arr[element.idx]}
            />
            {element.option2}
          </label>
        </div>
        <br></br>
      </li>
    );
  });

  return (
    <div className="mcqtest">
      <div className="container">
        <div className="page-header">
          <br></br>
          <h1>MBTI Test</h1>
          <br></br>
        </div>

        <ol className="qsliist">{temp}</ol>
        {flag ? (
          <p className="hidden text-center">
            (<i>scroll down</i>)
          </p>
        ) : (
          <br />
        )}
        <p className="text-center">
          <button className="button" onClick={onclick1}>
            Calculate Results
          </button>
          {msg ? (
            <>
              <br></br>
              <span className="required">{msg}</span>
            </>
          ) : (
            ""
          )}
        </p>
        {ans.title ? printresult() : ""}
      </div>
    </div>
  );
}

export default Mcqtest;

// import React, { Component } from "react";
// import data from "../Data/Ques";
// import "./styles.css";
// class Mcqtest extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: "x",
//       list: [1, 2, 3],
//     };
//     // this.onAddItem = this.onAddItem.bind(this);
//     // this.onUpdateItem = this.onUpdateItem.bind(this);
//     // console.log(this.state);
//   }
//   shouldComponentUpdate(newprop) {
//     if (newprop.list === this.state.list) return false;
//     return true;
//   }
//   onAddItem = () => {
//     this.setState((state) => {
//       const list = state.list.concat(state.value);

//       return {
//         list,
//         value: "",
//       };
//     });
//     console.log(this.state);
//   };

//   onUpdateItem = (i) => {
//     console.log(this.state);
//     this.setState((state) => {
//       const list = state.list.map((item, j) => {
//         if (j === i) {
//           return item + 1;
//         } else {
//           return item;
//         }
//       });

//       return {
//         value: "",
//         list,
//       };
//     });
//   };

//   temp = data.map((element) => {
//     // this.setState({ value: "jim" });
//     // this.onAddItem();
//     // this.onUpdateItem(0);
//     // console.log(this.state.list);
//     return (
//       <li>
//         <strong>At a party do you:</strong>
//         <br />
//         <div className="radio">
//           <label>
//             <input type="radio" name="q1" value="e" />
//             Interact with many, including strangers
//           </label>
//         </div>
//         <div className="radio">
//           <label>
//             <input type="radio" name="q1" value="i" />
//             Interact with a few, known to you
//           </label>
//         </div>
//       </li>
//     );
//   });

//   render() {
//     console.log("jiiii ", this.state);
//     data.map((element) => {
//       this.onAddItem();
//     });
//     console.log("jiiiimen ", this.state);
//     return (
//       <div className="container">
//         <div className="page-header">
//           <h1>MBTI Test</h1>
//         </div>
//         <ol>{this.temp}</ol>
//       </div>
//     );
//   }
// }

// export default Mcqtest;

// import React from "react";
// import data from "../Data/Ques";
// import "./styles.css";
// function Mcqtest() {
//   let temp = data.map((element) => {
//     return (
//       <li>
//         <strong>At a party do you:</strong>
//         <br />
//         <div class="radio">
//           <label>
//             <input type="radio" name="q1" value="e" />
//             Interact with many, including strangers
//           </label>
//         </div>
//         <div class="radio">
//           <label>
//             <input type="radio" name="q1" value="i" />
//             Interact with a few, known to you
//           </label>
//         </div>
//       </li>
//     );
//   });

//   return (
//     <div className="container">
//       <div className="page-header">
//         <h1>MBTI Test</h1>
//       </div>
//       <ol>{temp}</ol>
//     </div>
//   );
// }

// export default Mcqtest;
