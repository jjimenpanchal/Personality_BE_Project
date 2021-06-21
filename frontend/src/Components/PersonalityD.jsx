import React from "react";

function PersonalityD(props) {
  //   console.log(props);
  //   console.log(
  //     "want to concole characteristic ",
  //     props.location.state.props.characteristics
  //   );
  //   console.log("rela ", props.location.state.props.relationships.As_a_lover);
  const char = props.location.state.props.characteristics.map((element) => {
    return <li>{element}</li>;
  });

  const strengths = props.location.state.props.strengths.map((element) => {
    return <li>{element}</li>;
  });
  const weaknesses = props.location.state.props.weaknesses.map((element) => {
    return <li>{element}</li>;
  });
  const well_known_examples =
    props.location.state.props.well_known_examples.map((element) => {
      return <li>{element}</li>;
    });

  const Career_Opportunities =
    props.location.state.props.Career_Opportunities.map((element) => {
      return <li>{element}</li>;
    });
  //   const relationships = props.location.state.props.relationships.map(
  //     (element) => {
  //       return <li>{element}</li>;
  //     }
  //   );
  return (
    <>
      <br></br>
      <h1 className="text-center">
        {props.location.state.props.title}: {props.location.state.props.summary}
      </h1>
      <br></br>

      <div className="container">
        <div>
          <p>{props.location.state.props.para}</p>
          <br></br>
          <h5>Key Characteristics of {props.location.state.props.title}s:</h5>
          <ol className="PerssonalityD_ol">{char}</ol>
          <h5>Strengths:</h5>
          <ul>{strengths}</ul>
          <h5>Weaknesses:</h5>
          <ul>{weaknesses}</ul>
          <h5>Well Known Examples:</h5>
          <ol>{well_known_examples}</ol>
          <h5>{props.location.state.props.title} Relationships:</h5>
          <ol>
            <li>
              <h6>As a Lover :</h6>
              <p>{props.location.state.props.relationships.As_a_lover}</p>
            </li>
            <li>
              <h6>As a Parent :</h6>
              <p>{props.location.state.props.relationships.As_a_parent}</p>
            </li>
            <li>
              <h6>As a Friend :</h6>
              <p>{props.location.state.props.relationships.As_a_friend}</p>
            </li>
          </ol>
          <h5>Career Opportunities</h5>
          <ol>{Career_Opportunities}</ol>
        </div>
      </div>
    </>
  );
}

export default PersonalityD;
