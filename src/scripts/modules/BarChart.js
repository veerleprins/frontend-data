// Total code from Laurens
// Source: https://vizhub.com/Razpudding/781fc8abc97443919613184546720ab0?edit=files&file=index.js

import {
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  select, 
  format
} from 'd3';



const svg = select('svg')
  .attr('width', 960)
  .attr('height', 600);

const margin = {
  top: 70,
  right: 100,
  bottom: 200,
  left: 100
};
const width = +svg.attr('width');
const height = +svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let xScale = scaleBand().padding(0.2);
let yScale = scaleLinear();

const fGroup = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


export function createViz (data) {
  // const vizData = data;
  const vizData = data.splice(10, 30);
  console.log(vizData);
  createTitle('Charging points per parking area');
  createScales(vizData);
  createAxis(vizData);
  createLabels('Number of charging points');
  createChart(vizData);
}

function createTitle(title) {
  fGroup
    .append('text')
      .attr('class', 'title')
      .attr('y', -20)
      .attr('x', (innerWidth / 2))
      .text(title);
}

function createScales(data) {
  xScale
    .domain(data.map(p => p.areadesc))
    .range([0, width]);
  yScale
    .domain([0, max(data, d => d.chargingCapacity)])
    .range([innerHeight, 0])
    .nice();
}

function createAxis(data) {
  const maxLength = max(data, d => d.chargingCapacity);
  fGroup
    .append('g')
      .attr('class', 'axis axis-y')
    .call(axisLeft(yScale).ticks(maxLength));

  fGroup
    .append('g')
      .attr('class', 'axis axis-x')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`)
    .selectAll('text')
      .attr('transform', 'rotate(-90)')
      .attr("x", -15)
      .attr("y", -5)
      .attr('text-anchor', 'end');
}

function createLabels(text) {
  fGroup
    .append('g')
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -50)
      .attr('x', -250)
      .attr('transform', 'rotate(-90)')
      .text(text);
}

function createChart(data) {
  fGroup
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('class', 'bars')
      .attr('x', p => xScale(p.areadesc))
      .attr('y', p => yScale(p.chargingCapacity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.chargingCapacity));
}