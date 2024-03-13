import { useState } from "react";
import * as d3 from "d3";
import "./App.css";
import LinePlot from "./components/LinePlot";
import FirstSvg from "./components/FirstSvg";
import Circle from "./components/Circle";
import ManyCircles from "./components/ManyCircles";
import ManyCirclesRandomColors from "./components/ManyCirclesRandomColors";

function App() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <div /* onMouseMove={onMouseMove} */>
      {/* <LinePlot data={data} /> */}
      {/* <FirstSvg /> */}
      {/* <Circle/> */}
      {/* <ManyCircles/> */}
      <ManyCirclesRandomColors />
    </div>
  );
}

export default App;
