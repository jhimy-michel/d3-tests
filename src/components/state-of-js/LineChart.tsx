import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { customColors } from "../../data/colors";

const LineChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, data[0].experience.allYears.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.percentage));

    svg.selectAll("*").remove();

    data.forEach((d, index) => {
      console.log(d);
      const color = customColors[index];

      svg
        .append("path")
        .datum(d.experience.allYears.map((year) => year.buckets.find((bucket) => bucket.id === "interested")))
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", line);
      // Add legend
      svg
        .append("text")
        .attr("x", width - 100)
        .attr("y", 20 * (index + 1))
        .text(`${d.id}`)
        .style("fill", color);
    });

    // Add x-axis with label
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .text("X Axis Label");

    // Add y-axis with label
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .text("Y Axis Label");
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LineChart;
