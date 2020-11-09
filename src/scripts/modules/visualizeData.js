// import { select, json, scaleLinear, max, scaleBand } from 'd3';

// export function createViz (data) {
//   const xScale = scaleLinear()
//     .domain([0, max(data, d => d.parkingCapacity)])
//     .range([0, width]);

//   const yScale = scaleBand()
//     .domain(data.map(d => d.chargingCapacity))
//     .range([0, height]);
  
//   console.log(xScale.domain());
  
//   svg.selectAll('rect').data(data)
//     .enter().append('rect')
//     .attr('y', d => yScale(d.chargingCapacity))
//     .attr('width', d => xScale(d.parkingCapacity))
//     .attr('height', yScale.bandwidth());
// }