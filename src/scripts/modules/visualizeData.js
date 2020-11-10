import {
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
} from 'd3';

import { svg, margin, height, width, group} from './helper/config'

const xScale = scaleBand().padding(0.2);
const yScale = scaleLinear();
const xValue = p => p.areadesc;
const yValue = p => p.parkingCapacity;

// Total code from Laurens
// Source: https://vizhub.com/Razpudding/781fc8abc97443919613184546720ab0?edit=files&file=index.js
export function createViz (data) {
  const vizData = data.splice(0, 40);

  createScales(vizData);
  createXAxes(group);
  createYAxes(group);
	drawBars(group, vizData);
}

function createScales(data) {
  xScale
    .domain(data.map(xValue))
    .rangeRound([0, width]);
  yScale
    .domain([0, max(data.map(yValue))])
    .rangeRound([height, 0]);
}

function createXAxes (target) {
  target
    .append('g')
    .attr('class', 'axis axis-x')
    .call(axisBottom(xScale))
      .attr('transform', 'translate(0,' + height + ')')
      .selectAll("text")
        .attr("transform", "rotate(-90)")
        .attr("dx", -135)
        .attr("dy", "-0.8em");
}

function createYAxes (target) {
  target
    .append('g')
    .attr('class', 'axis axis-y')
    .call(axisLeft(yScale));
}

function drawBars(target, data) {
  target
    .append('g')
      .attr('class', 'bars')
   .selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
     .attr('class', 'rect')
     .attr('x', p => xScale(p.areadesc))
     .attr('y', p => yScale(p.parkingCapacity))
     .attr('width', xScale.bandwidth())
     .attr('height', p => height - yScale(p.parkingCapacity));
}