import './../scss/main.scss';
import { mergeData, cleanData } from './modules/prepareData';
import { fetchData } from './modules/collectData';
import {createViz} from './modules/visualizeData.js'
// import { select, json, scaleLinear, max, scaleBand, range, descending } from 'd3';

// The two API's needed for the visualization:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

start();

async function start() {
  const facilitiesData = await fetchData(API_1);
  const locationData = await fetchData(API_2);
  const mergedData = mergeData(facilitiesData, locationData);
  const preparedData = cleanData(mergedData);
  createViz(preparedData);
}