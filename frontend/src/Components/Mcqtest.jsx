import React, { useState } from "react";
import data from "../Data/Ques";
import "./styles.css";
function Mcqtest() {
  let temp_arr = [];
  for (var i = 0; i < data.length; i++) temp_arr.push("na");
  const [arr, setarr] = useState(temp_arr);
  const [flag, setflag] = useState(false);
  const [scores, setscores] = useState({});
  const [personality, setpersonality] = useState("");
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
      <div id="results" className="text-center hidden">
        <br></br>
        <h2 id="type">{personality}</h2>
        <p id="type-details" className="type-description hidden">
          <strong id="type-title"></strong>
          <br />
          <strong>
            <span id="type-percentage"></span> of population
          </strong>
          <br />
          <span id="type-description"></span>
          <br />
          <a id="type-site" href="#" target="_blank">
            Learn more about your type here
          </a>
        </p>
        <p className="pull-left">
          <span className="badge">E</span> (
          <span id="eScore">{scores["e"]}</span>%)
        </p>
        <p className="pull-right">
          (<span id="iScore">{scores["i"]}</span>%){" "}
          <span className="badge">I</span>
        </p>
        <div className="progress">
          <div
            id="eiChart"
            className="progress-bar progress-bar-warning"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%" }}
          ></div>
          <div className="center-bar"></div>
        </div>
        <br className="clearfix" />

        <p className="pull-left">
          <span className="badge">S</span> (
          <span id="sScore">{scores["s"]}</span>%)
        </p>
        <p className="pull-right">
          (<span id="nScore">{scores["n"]}</span>%)
          <span className="badge">Nhoohgu</span>
        </p>
        <div className="progress">
          <div
            id="snChart"
            className="progress-bar progress-bar-primary"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%" }}
          ></div>
          <div className="center-bar"></div>
        </div>
        <br className="clearfix" />

        <p className="pull-left">
          <span className="badge">T</span> (
          <span id="tScore">{scores["t"]}</span>%)
        </p>
        <p className="pull-right">
          (<span id="fScore">{scores["f"]}</span>%){" "}
          <span className="badge">F</span>
        </p>
        <div className="progress">
          <div
            id="tfChart"
            className="progress-bar progress-bar-success"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%" }}
          ></div>
          <div className="center-bar"></div>
        </div>
        <br className="clearfix" />

        <p className="pull-left">
          <span className="badge">J</span> (
          <span id="jScore">{scores["j"]}</span>%)
        </p>
        <p className="pull-right">
          (<span id="pScore">{scores["p"]}</span>%){" "}
          <span className="badge">P</span>
        </p>
        <div className="progress">
          <div
            id="jpChart"
            className="progress-bar progress-bar-danger"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "50%" }}
          ></div>
          <div className="center-bar"></div>
        </div>
        <br className="clearfix" />
        {console.log("called wow")}
      </div>
    );
  }

  const onclick1 = (e) => {
    setflag(true);
    let mp = new Map();
    mp["e"] = 0;
    mp["i"] = 0;
    mp["s"] = 0;
    mp["n"] = 0;
    mp["t"] = 0;
    mp["f"] = 0;
    mp["j"] = 0;
    mp["p"] = 0;

    arr.map((element) => {
      if (element !== "na") mp[element]++;
    });

    var personalityType = "";
    if (mp["e"] >= mp["i"]) personalityType += "E";
    else personalityType += "I";

    if (mp["s"] >= mp["n"]) personalityType += "S";
    else personalityType += "N";

    if (mp["t"] >= mp["f"]) personalityType += "T";
    else personalityType += "F";

    if (mp["j"] >= mp["p"]) personalityType += "J";
    else personalityType += "P";
    setpersonality(personalityType);

    mp["e"] = (mp["e"] * 100) / 10;
    mp["i"] = (mp["i"] * 100) / 10;
    mp["s"] = (mp["s"] * 100) / 20;
    mp["n"] = (mp["n"] * 100) / 20;
    mp["t"] = (mp["t"] * 100) / 20;
    mp["f"] = (mp["f"] * 100) / 20;
    mp["j"] = (mp["j"] * 100) / 20;
    mp["p"] = (mp["p"] * 100) / 20;

    setscores(mp);
    console.log("clicked");
    console.log(mp);
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
      </p>
      {flag ? printresult() : ""}
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
