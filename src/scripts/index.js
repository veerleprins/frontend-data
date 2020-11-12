import 'regenerator-runtime/runtime'
import './../scss/main.scss';
import { fetchData } from './modules/collectData';
import { mergeData, toIntegersInObj, toNumbers, createArr, createNaN } from './modules/prepareData';
import { createViz } from './modules/BarChart.js';
import { getDataObject, startInteractive } from './modules/interactiveBarChart.js';

// The two API's needed for the visualization:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

const list1 = ['chargingpointcapacity', 'capacity', 'disabledaccess', 'maximumvehicleheight'];
const list2 = ['latitude', 'longitude'];

start();

async function start() {
  // Fetching the Data:
  const facilitiesData = await fetchData(API_1);
  const locationData = await fetchData(API_2);

  // Cleaning the Data:
  toNumbers(facilitiesData, list1);
  toIntegersInObj(locationData, 'location', list2);

  //Transforming the Data:
  const mergedData = mergeData(facilitiesData, locationData, ['areaid', 'specifications']);
  createNaN(mergedData);
  const preparedData = createArr(mergedData);

  //Visualize the Data:
  // createViz(preparedData);
  // startInteractive(preparedData);
  getDataObject(preparedData);

  // const mergedData = mergeData(facilitiesData, locationData);
  // const preparedData = cleanData(mergedData);
  // getCity(preparedData);
  // createViz(preparedData);
}