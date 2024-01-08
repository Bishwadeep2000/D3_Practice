import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/adamjanes/udemy-d3/master/03/3.13.1/data/revenues.csv";

const StarBreakCoffee = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { left: 100, right: 10, top: 20, bottom: 130 };

    const innerWidth = 600;
    const innerHeight = 400;

    const width = innerWidth - margin.left - margin.right;
    const height = innerHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X label
    g.append("text")
      .attr("class", "x axis-label")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month");

    // Y label
    g.append("text")
      .attr("class", "y axis-label")
      .attr("x", -(height / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Revenue ($)");

    // Get the Data
    d3.csv(csvUrl).then((data) => {
      // clean data
      data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
      });
      // console.log(data);

      // X-Scale
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.month))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.2);

      // Y-Scale
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.revenue)])
        .range([height, 0]);

      // X Axis
      const xAxisCall = d3.axisBottom(x);
      g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px");

      // Y Axis
      const yAxisCall = d3
        .axisLeft(y)
        .ticks()
        .tickFormat((d) => {
          return "$" + d;
        });
      g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)
        .attr("font-size", "12px");

      // JOIN new data with old elements
      const rects = g.selectAll("rect").data(data);

      // EXIT old elements not present in new data.
      // rects.exit().remove();

      // ENTER new elements present in new data.
      rects
        .enter()
        .append("rect")
        .attr("y", (d) => y(d.revenue))
        .attr("x", (d) => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", (d) => height - y(d.revenue))
        .attr("fill", "grey")
        .append("title")
        .text((d) => {
          return "Revenue: $" + d.revenue + "\nProfit: $" + d.profit;
        });
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div id="chart-area">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default StarBreakCoffee;
