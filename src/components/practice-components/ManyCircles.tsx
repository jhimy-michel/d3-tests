import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { generateDataset } from "./utils/generateDataSet";
import { useInterval } from "./utils/useInterval";

const ManyCircles = () => {
  const [dataset, setDataset] = useState(generateDataset());

  useInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);

  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100vh' }}>
      {dataset.map(([x, y], i) => (
        <circle cx={x} cy={y} r="5" key={i} style={{ fill: "white" }} />
      ))}
    </svg>
  );
};

export default ManyCircles;
