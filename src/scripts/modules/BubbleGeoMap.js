// Source from Curran: 
// https://www.youtube.com/watch?v=9ZB1EgaJnBU&list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi&index=16&ab_channel=CurranKelleher

import { 
  select, 
  json, 
  geoPath, 
  geoMercator, 
  zoom,  
} from 'd3';

import { feature } from 'topojson';

//Global vars:
const svg = select('svg').attr('width', "960").attr('height', "700");
const group = svg.append('g');
const width = +svg.attr('width');

// Endpoint from Merlijn: https://github.com/mbergevoet/frontend-data/blob/master/frontend-data/index.js
const endpoint = 'https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson';

// .scale(5100).center([]) from Merlijn: https://github.com/mbergevoet/frontend-data/blob/master/frontend-data/index.js
const projection = geoMercator().scale(4000).center([5.116667, 52.17]);
const pathGenerator = geoPath().projection(projection);
let towns;

export async function startMap(data) {
  const GEOdata = await getGeo(endpoint);
  towns = feature(GEOdata, GEOdata.objects.gemeente_2020);
  createMap();
  // createTitle("Chargingpoints in the Netherlands");
  setTitle();

  const z = svg
    .call(zoom().scaleExtent([1, 5]).on('zoom', event => {
      group.attr('transform', event.transform).attr('cursor', 'zoom-in');
    }));

  // g.selectAll('path').on('mouseover', changeColor) 
}

// This function creates the title for the graph:
function createTitle(title) {
  group
    .append('text')
      .attr('class', 'title')
      .attr('y', -30)
      .attr('x', (width / 2))
      .text(title);
}

// This function creates the paths per town and adds a tooltip:
function createMap() {
  group
  .selectAll('path').data(towns.features)
  .enter()
  .append('path')
    .attr('class', 'NL-map')
    .attr('d', pathGenerator)
    .attr('cursor', 'pointer')
  .append('title')
    .text("Gemeente: ")
  .append('text')
    .text(d => d.properties.statnaam);

}

// This function creates all the options in the select box:
function setTitle(){
  const h1 = select('body')
    .append('h1')
      .text("this is a title");
}

async function getGeo(url) {
  return await json(url);
}


// const projection = geoMercator().scale(5100).center([5.116667, 52.17])
// const pathGenerator = geoPath().projection(projection)

// //Gets topojson from url and draws the paths of the townships with it
// json('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson').then(
//   (data) => {
//     const townships = feature(data, data.objects.gemeente_2020)
    
//     g
//       .selectAll('path')
//       .data(townships.features)
//       .enter().append('path')
//         .attr('d', pathGenerator)
//       .append('title')
//       .text((d) => `${d.properties.statnaam}`)