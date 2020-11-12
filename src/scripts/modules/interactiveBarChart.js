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
import { dropdownMenu } from './dropdownMenu';


const svg = select('svg')
  .attr('width', 960)
  .attr('height', 700);

// const buttonParking = select('.parkingButton');
// const buttonCharging = select('.chargingButton');
// let pClicked = buttonParking.on("click", clickedButton);
// let cClicked = buttonCharging.on("click", clickedButton);

const margin = {
  top: 70,
  right: 100,
  bottom: 300,
  left: 100
};
const width = +svg.attr('width');
const height = +svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let xScale = scaleBand().padding(0.2);
let yScale = scaleLinear();

// const xValue = p => p.description;
// const yValue = d => d.chargingPoints;
let xValue;
let yValue;
let yColumn;

const fGroup = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// function clickedButton(e) {
//   let bValue = e.target.value;
//   console.log(bValue);
// }
let vizData;

export function getDataObject(data) {
  vizData = data.splice(10, 30);
  startInteractive();
}

const onXColumnClicked = c => {
  console.log(c);
  yColumn = c;
  startInteractive();
}

export function startInteractive () {
  let columns = Object.keys(vizData[0]);
  columns = [columns[1], columns[3]];

  select('#menus')
  .call(dropdownMenu, {
    options: columns,
    onOptionClicked: onXColumnClicked
  })

  xValue =  p => p.description;
  // yValue = p => p.capacity;
  yValue = p => p[yColumn];

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
    .domain(data.map(xValue))
    .range([0, width]);
  yScale
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();
}

function createAxis(data) {
  const maxLength = max(data, yValue);
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
      .attr('x', p => xScale(xValue(p)))
      .attr('y', p => yScale(yValue(p)))
      .attr('width', xScale.bandwidth())
      // .attr('height', d => innerHeight - yScale(d.chargingCapacity));
      .attr('height', 0);

      fGroup
        .selectAll('rect')
        .attr('height',  d => innerHeight - yScale(yValue(d)));
}