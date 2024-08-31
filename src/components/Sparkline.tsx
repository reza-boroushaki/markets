import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Sparkline = ({ priceData }: { priceData: number[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 200;
    const height = 100;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };

    const xScale = d3
      .scaleLinear()
      .domain([0, priceData.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(priceData) || 0, d3.max(priceData) || 0])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d));

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .append("path")
      .datum(priceData)
      .attr("class", "sparkline")
      .attr("fill", "none")
      .attr(
        "stroke",
        priceData[priceData.length - 1] < priceData[0]
          ? "var(--primary-red)"
          : "var(--primary-green)"
      )
      .attr("stroke-width", 1)
      .attr("d", line);
  }, [priceData]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 100"
      style={{
        overflow: "visible",
      }}
    />
  );
};

export default Sparkline;
