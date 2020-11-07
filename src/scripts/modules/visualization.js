// import { select } from 'd3'

// Specificaties parkeergebied API:
const API_1 = 'https://opendata.rdw.nl/resource/b3us-f26s.json';

// GEO Parkeer Garages API:
const API_2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';

// const proxyURL = 'https://cors-anywhere.herokuapp.com/';

// async function fetchData(url) {
//   const data = await fetch(url);
//   return await Response.json();
// }


fetchData(API_1, API_2);

async function fetchData (url, url2) {
  const response1 = await fetch(url);
  const dataset1 = await response1.json();

  console.log(dataset1)
  const response2 = await fetch(url2);
  const dataset2 = await response2.json();

  console.log(dataset2)
  // const newData = dataset2.map(obj => {
  //   const data = dataset1.find((specs) => obj.areaid === specs.areaid);
  //   dataset2.parkingSpecifications = data
  //   return data;
  // });
  // // const newData = "";
  // console.log(newData);
  // console.log(dataset2);
}
