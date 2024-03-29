import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { customColors } from "../../data/colors";

const LineChart = ({ data, width, height, category }) => {
  const svgRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const margin = { top: 50, right: 150, bottom: 50, left: 100 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    const xScale = d3.scaleLinear().domain([-0.5, data[0].experience.allYears.length]).range([0, chartWidth]);

    const yScale = d3.scaleLinear().domain([0, 80]).range([chartHeight, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.percentage));

    svg.selectAll("*").remove();

    const chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    data.forEach((dataLine, index) => {
      const color = customColors[index];
      const isActive = activeIndex === index;

      chartGroup
        .append("path")
        .datum(dataLine.experience.allYears.map((year) => year.buckets.find((bucket) => bucket.id === category)))
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("opacity", isActive ? 1 : 0.2)
        .attr("d", line)
        .on("mouseover", (event, d) => {
          setActiveIndex(index);
          svg.select(`#legend-${index}`).style("font-weight", "bold");
        })
        .on("mouseout", () => {
          svg.select(`#legend-${index}`).style("font-weight", "normal");
          setActiveIndex(null);
        })
        .style("cursor", "pointer");

      chartGroup
        .append("text")
        .attr("x", chartWidth + 10)
        .attr("y", (index + 1) * 17)
        .text(`${dataLine.id}`)
        .style("fill", color)
        .attr("opacity", isActive ? 1 : 0.2)
        .style("font-size", !isActive ? "17px" : "21px")
        .on("mouseover", () => {
          setActiveIndex(index);
        })
        .on("mouseout", () => {
          setActiveIndex(null);
        })
        .style("cursor", "pointer")
        .attr("id", `legend-${index}`);
    });

    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([0, 1, 2, 3, 4])
          .tickFormat((d) => 2016 + d)
      );

    chartGroup.append("g").call(d3.axisLeft(yScale).ticks(4));

    chartGroup
      .append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Years (2016 - 2019)");

    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left / 2)
      .attr("x", -chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Percentage of interest %");
  }, [data, width, height, activeIndex, category]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
