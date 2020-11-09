import './../scss/main.scss';
import { mergeData, cleanData } from './modules/prepareData';
import { fetchData } from './modules/collectData';
// import { createViz } from './modules/visualizeData';
import { select, json, scaleLinear, max, scaleBand } from 'd3';

// The two API's needed for the visualization:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

const svg = select('svg');
const height = parseFloat(svg.attr('height'));
const width = parseFloat(svg.attr('width'));

start();

async function start() {
  const facilitiesData = await fetchData(API_1);
  const locationData = await fetchData(API_2);
  const mergedData = mergeData(facilitiesData, locationData);
  const preparedData = cleanData(mergedData);

  createViz(preparedData);

}

function createViz (data) {
  const xValue = d => d.parkingCapacity;
  const yValue = d => d.chargingCapacity;
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, height]);
  
  svg.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth());
}