import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Axis = ({ scale, orient, width, height }) => {
  const axisRef = useRef();

  useEffect(() => {
    const axis = orient === "left" ? d3.axisLeft(scale) : d3.axisBottom(scale);
    d3.select(axisRef.current).call(axis);
  }, [scale, orient]);

  const transform = orient === "left" ? `translate(${width / 10}, 0)` : `translate(0, ${height})`;

  return <g ref={axisRef} transform={transform}></g>;
};

export default Axis;
