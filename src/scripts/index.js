import './../scss/main.scss';
// import { sayHello } from './modules/test';
// import {scatterPlot } from './modules/scatterplot'

// sayHello();
// scatterPlot();
import { select } from 'd3'
// import { render } from 'sass';

// Specificaties parkeergebied API:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

const svg = select('svg');
const height = parseFloat(svg.attr('height'));
const width = parseFloat(svg.attr('width'));

fetchData(API_1, API_2)
  .then((data) => {
    console.log(data);
    data.forEach((column) => {
      column.chargingpointCapacity = parseInt(column.chargingpointCapacity);
      column.parkingCapacity = parseInt(column.parkingCapacity);
    });
    createViz(data);
  })


function createViz(data) {
  console.log(data);
  // const xValue = (column) => column.
  // const yValue = (column) => column.descr
}

async function fetchData(url, url2) {
  const response1 = await fetch(url)
  const dataset1 = await response1.json()

  const response2 = await fetch(url2)
  const dataset2 = await response2.json()

  const newDataArray = dataset2.map((item) => {
    const specs = dataset1.find((obj) => item.areaid === obj.areaid);
    //console.log(specs);
    if (specs !== undefined) {
      // console.log(specs.chargingpointcapacity);
      item.chargingpointCapacity = specs.chargingpointcapacity;
      item.parkingCapacity = specs.capacity;
    }
    // item.specs = specs;
    return item;
  })
  return newDataArray;
}