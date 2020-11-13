// Total code from Laurens & Curran:
// Source: https://vizhub.com/Razpudding/781fc8abc97443919613184546720ab0?edit=files&file=index.js
// Source: https://www.youtube.com/watch?v=MjjYLbShFi8&list=RDCMUCSwd_9jyX4YtDYm9p9MxQqw&start_radio=1&t=1076&ab_channel=CurranKelleher

import {
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  select,
  format
} from 'd3';


const svg = select('svg').attr('width', 960).attr('height', 700);
const width = +svg.attr('width');
const height = +svg.attr('height');

let yColumn = "capacity";

let title = (`${fromCamel(yColumn)} per parking area`);
let xValue = d => d.description;
let yValue = d => d[yColumn];
let yAxisLabel = 'Number of charging points';

const margin = { top: 100, right: 100, bottom: 300, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let xScale = scaleBand().padding(0.2);
let yScale = scaleLinear();


// const buttonParking = select('.parkingButton');
// const buttonCharging = select('.chargingButton');
// let pClicked = buttonParking.on("click", clickedButton);
// let cClicked = buttonCharging.on("click", clickedButton);

// function clickedButton(e) {
//   let bValue = e.target.value;
//   console.log(bValue);
// }
let columns;
let vizData;

const group = svg
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

export function startInteractive (data) {
  vizData = data.splice(0, 50);
  columns = Object.keys(vizData[0]);
  columns = [columns[1], columns[3]];

  createTitle(title);
  setupInput(columns);
  createScales();
  createAxis(vizData);
  createLabels(yAxisLabel);
  createBars(vizData);
}

// This function creates the title for the graph:
function createTitle(title) {
  group
    .append('text')
      .attr('class', 'title')
      .attr('y', -30)
      .attr('x', (innerWidth / 2))
      .text(title);
}

// This function sets the scales for the graph:
function createScales() {
  xScale
    .domain(vizData.map(xValue))
    .range([0, innerWidth]);
  yScale
    .domain([0, max(vizData, yValue)])
    .range([innerHeight, 0])
    .nice();
}

// This function creates the axis for the graph:
function createAxis(data) {
  group 
    .append('g')
    .attr("class", "axis-x")
    .call(axisBottom(xScale)).attr('transform', `translate(0, ${innerHeight})`)
    .selectAll('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -15)
      .attr('y', -5)
      .attr('text-anchor', 'end');

  group
    .append('g')
    .attr("class", "axis-y")
    .call(axisLeft(yScale).ticks(10));
}

// This function creates the label for the graph:
function createLabels(text) {
  group.select('.axis-y')
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .attr('x', -innerHeight / 2)
      .attr('transform', 'rotate(-90)')
      .text(text);
}

// This function creates all the bars for the graph:
function createBars(data) {
  const bars = group
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('class', 'bars')
      .attr('x', p => xScale(xValue(p)))
      .attr('y', p => yScale(yValue(p)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(yValue(d)));
}

// This function updates the graph when clicked on a new value:
function selectionChanged() {
	yColumn = this.value;
  createScales();
  yScale.domain([0, max(vizData, yValue)]);
  
  group.selectAll('rect')
    .attr('y', p => yScale(yValue(p)))
    .attr('height', p => innerHeight - yScale(yValue(p)))
  group.select('.axis-y')
      .call(axisLeft(yScale).ticks(10));

  let value = fromCamel(yColumn);
  svg.select('.title')
    .text(`${value} per parking area`);
  group.select('.axis-label')
    .text(`Number of ${value}`);
}

// This function creates all the options in the select box:
function setupInput(fields){
  const form = select('form')
    .append('select')
    .on('change', selectionChanged)
    .selectAll('option')
    .data(fields)
    .enter()
    .append('option')
      .attr('value', d => d)
      .text(d => d);
}

// This function replaces a camelCase string to a normal string:
function fromCamel(str) {
  return str.replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}