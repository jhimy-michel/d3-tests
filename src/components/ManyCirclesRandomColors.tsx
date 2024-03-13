import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "./utils/useInterval";
import { generateCirclesDataset, generateDataset, generateDatasetForCirclesExample } from "./utils/generateDataSet";
import { animated, useSpring } from "react-spring";

const ManyCirclesRandomColors = () => {
  const [visibleCircles, setVisibleCircles] = useState(generateDatasetForCirclesExample());

  useInterval(() => {
    setVisibleCircles(generateDatasetForCirclesExample());
  }, 2000);

  // console.log(visibleCircles)

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100vh" }}>
      {visibleCircles.map((d) => (
        <AnimatedCircle key={d} index={d} isShowing={visibleCircles.includes(d)} />
      ))}
    </svg>
  );
};

const AnimatedCircle = ({ index, isShowing }) => {
  const wasShowing = useRef(false);

  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);

  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  });

  return (
    <>
      {isShowing && (
        <animated.circle
          key={index}
          {...style}
          cx={index}
          cy="10"
          fill={!isShowing ? "tomato" : !wasShowing.current ? "cornflowerblue" : "lightgrey"}
        />
      )}
    </>
  );
};

export default ManyCirclesRandomColors;
