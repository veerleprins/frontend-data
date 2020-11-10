import {select} from 'd3'

export const svg = select('svg')
  .attr('width', 960)
  .attr('height', 600);
export const margin = {top: 48, right: 72, bottom: 220, left: 72};
export const height = parseInt(svg.style('height'), 10) - margin.top - margin.bottom;
export const width = parseInt(svg.style('width'), 10) - margin.left - margin.right;

export const group = svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
