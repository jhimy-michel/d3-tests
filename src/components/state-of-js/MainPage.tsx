import React from "react";
import LineChart from "./LineChart";
import data from "../../data/stateOfJs.json";

/**
 * We will use a line chart to plot the percentage of respondents
 * @returns
 */

const categories = ["would_use", "never_heard", "interested", "would_not_use", "not_interested"];

// x axis represent time in years
// y axis represents the percentage of respondents
// assign a color

const MainPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginLeft: "100px" }}>
      <LineChart data={data} width={1200} height={800} />
    </div>
  );
};

export default MainPage;
