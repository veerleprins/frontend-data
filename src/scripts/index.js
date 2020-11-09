import './../scss/main.scss';
// import { sayHello } from './modules/test';
// import {scatterPlot } from './modules/scatterplot'

// sayHello();
// scatterPlot();
import { select } from 'd3';
// import { render } from 'sass';

// Specificaties parkeergebied API:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

const svg = select('svg');
const height = parseFloat(svg.attr('height'));
const width = parseFloat(svg.attr('width'));

prepare();

async function prepare() {
  const facilitiesData = await fetchData(API_1);
  const locationData = await fetchData(API_2);
  const mergedData = mergeData(facilitiesData, locationData);
  const preparedData = prepareData(mergedData);
  createViz(preparedData);
}


function createViz(data) {
  const first40 = data.slice(0, 40);
  console.log(first40);
  // const xValue = (column) => column.
  // const yValue = (column) => column.descr
}

// Cleaning the dataset by parsing the strings to integers and floats:
function prepareData(dataset) {
  dataset.forEach(column => {
    column.chargingCapacity = parseInt(column.chargingCapacity);
    column.parkingCapacity = parseInt(column.parkingCapacity);
    column.location.latitude = parseFloat(column.location.latitude);
    column.location.longitude = parseFloat(column.location.longitude);
  })
  return dataset;
}

// Merging the two datasets together:
function mergeData(dataset1, dataset2) {
  return dataset2.map((item) => {
    const specs = dataset1.find((obj) => item.areaid === obj.areaid);
    if (specs !== undefined) {
      item.chargingCapacity = specs.chargingpointcapacity;
      item.parkingCapacity = specs.capacity;
    } else {
      item.chargingpointCapacity = 0;
      item.parkingCapacity = 0;
    }
    return item;
  })
}

//Fetching the response from the url and returned it as a json type:
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}