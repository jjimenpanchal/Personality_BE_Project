import React, { useEffect, useState } from "react";
import AbtprsnltCard from "./AbtPrsnltCard";
// import data from "../Data/data"
import axios from "axios";

function AboutPersonalities() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function fetchaboutp() {
      const temporary = await axios.get("/api/gettypes");
      console.log("data is ", temporary);
      setdata(temporary.data);
    }
    fetchaboutp();
  }, []);
  console.log("data isdata ", data);
  let temp;
  if (data) {
    temp = data.map((d) => {
      return (
        <div>
          <AbtprsnltCard props={d}></AbtprsnltCard>
        </div>
      );
    });
  } else {
    temp = "Loading....";
  }

  return <>{temp}</>;
}

export default AboutPersonalities;
