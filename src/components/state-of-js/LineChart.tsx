import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { customColors } from "../../data/colors";

/**
 *
 * @param param0
 * @returns
 */
const LineChart = ({ data, width, height }) => {
  const svgRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const [intersection, setIntersection] = useState(null);

  useEffect(() => {
    const heightGraph = height - 50;
    const widthGraph = width - 120;

    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleLinear().domain([-0.5, data[0].experience.allYears.length]).range([0, widthGraph]);

    const yScale = d3
      .scaleLinear()
      .domain([-5, 80])
      .range([heightGraph - 10, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.percentage));

    svg.selectAll("*").remove();

    data.forEach((d, index) => {
      // console.log(d);
      const color = customColors[index];
      const isActive = activeIndex === index;

      svg
        .append("path")
        .datum(d.experience.allYears.map((year) => year.buckets.find((bucket) => bucket.id === "interested")))
        .attr("fill", "none")
        .attr("stroke", color) // Brighten the active line
        .attr("stroke-width", 1.5)
        .attr("opacity", isActive ? 1 : 0.2) // Adjust opacity based on activity
        .attr("d", line)
        .on("mouseover", () => {
          setActiveIndex(index);
          svg.select(`#legend-${index}`).style("font-weight", "bold");
        }) // Set active on mouseover
        .on("mouseout", () => {
          svg.select(`#legend-${index}`).style("font-weight", "normal");
          setActiveIndex(null);
        }) // Reset active on mouseout
        .style("cursor", "pointer"); // Change cursor to pointer on hover

      // Add legend
      svg
        .append("text")
        .attr("x", width - 110)
        .attr("y", 19 * (index + 1))
        .text(`${d.id}`)
        .style("fill", color) // Brighten the active legend
        .attr("opacity", isActive ? 1 : 0.2) // Adjust opacity based on activity
        .style("font-size", !isActive ? "16px" : "21px") // Increase font size when active
        .on("mouseover", () => setActiveIndex(index)) // Set active on mouseover
        .on("mouseout", () => setActiveIndex(null)) // Reset active on mouseout
        .style("cursor", "pointer"); // Change cursor to pointer on hover
    });

    // Add intersection lines and values
    /* if (intersection !== null) {
      svg.selectAll(".intersection-line").remove();
      svg
        .append("line")
        .attr("class", "intersection-line")
        .attr("x1", xScale(intersection.x))
        .attr("y1", 0)
        .attr("x2", xScale(intersection.x))
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4");

      svg.selectAll(".intersection-label").remove();
      svg
        .append("text")
        .attr("class", "intersection-label")
        .attr("x", xScale(intersection.x))
        .attr("y", yScale(intersection.y) - 8)
        .text(intersection.y.toFixed(2))
        .attr("text-anchor", "middle")
        .style("font-size", "12px");
    } */

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 60})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([0, 1, 2, 3, 4, 5]) // Custom tick values from 2016 to 2019
          .tickFormat((d) => {
            return 2016 + d;
          }) // Format tick values
      );

    // Add y-axis
    svg.append("g").call(d3.axisLeft(yScale).ticks(5)).attr("transform", `translate(${5},0)`);

    // Add x-axis label
    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height - 10})`)
      .style("text-anchor", "middle")
      .style("fill", "white") // Brighten the active legend
      .text("Years (2016 - 2019)");

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "white") // Brighten the active legend
      .text("Percentage of interest %");
  }, [data, width, height, activeIndex /* intersection */]);

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        /* onMouseMove={(event) => {
          // const svg = d3.select(svgRef.current);
          const mouse = d3.pointer(event);

          if (activeIndex !== null) {
            const xScale = d3
              .scaleLinear()
              .domain([0, data[0].experience.allYears.length - 1])
              .range([0, width]);

            const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

            const xValue = xScale.invert(mouse[0]);
            const yValue = yScale.invert(mouse[1]);

            setIntersection({ x: xValue, y: yValue });
          }
        }}
        onMouseLeave={() => {
          setIntersection(null);
        }} */
      />
    </>
  );
};

export default LineChart;
