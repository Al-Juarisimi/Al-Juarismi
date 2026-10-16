// src/Chart.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { name: 'A', value: 45 },
  { name: 'B', value: 80 },
  { name: 'C', value: 30 },
  { name: 'D', value: 95 },
  { name: 'E', value: 60 },
];

export default function Chart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Limpiar renderizados previos

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Eje X
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Eje Y
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Barras animadas
    svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.name))
      .attr('y', height - margin.bottom)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', '#4f46e5')
      .attr('rx', 4)
      .transition()
      .duration(750)
      .attr('y', d => y(d.value))
      .attr('height', d => height - margin.bottom - y(d.value));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
      <svg ref={svgRef} viewBox="0 0 500 300" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}