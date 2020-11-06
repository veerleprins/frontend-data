// This whole code is from the Curran Tutorial. 
// Source: https://github.com/curran/dataviz-course-2018
// Source: https://www.youtube.com/watch?v=M2s2jowLkUo&index=10&list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi

import { 
  select, 
  csv, 
  scaleLinear, 
  extent,
  axisBottom,
  axisLeft,
  format
} from 'd3';

export function scatterPlot() {
  
  const svg = select('svg');
  
  // Width & Height from svg tag in .html file:
  const height = parseFloat(svg.attr('height'));
  const width = parseFloat(svg.attr('width'));
  
  // Loading the csv file and replaces strings from the
  // file to integers:
  csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
    .then((data) => {
    data.forEach((column) => {
      column.mpg = parseFloat(column.mpg);
      column.cylinders = parseFloat(column.cylinders);
      column.displacement = parseFloat(column.displacement);
      column.horsepower = parseFloat(column.horsepower);
      column.weight = parseFloat(column.weight);
      column.acceleration = parseFloat(column.acceleration)
      column.year = parseFloat(column.year);
    });
    render(data);
  });
  
  function render(data) {
    const circleRadius = 10;
    const title = 'Cars: Horsepower vs. Weight'
    const xValue = (d) => d.horsepower;
    const xAxisLabel = 'Horsepower';
    const yValue = (d) => d.weight;
    const yAxisLabel = 'Weight';
    const margin = { top: 80, right: 35, bottom: 80, left: 130 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([0, innerHeight])
      .nice();
  
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15);
  
    const yAxisG = g.append('g').call(yAxis);
    
    yAxisG.select('.domain').remove();
    
    yAxisG.append('text')
      .attr('transform', `rotate(-90)`)
      .attr('y', -65)
      .attr('x', - innerHeight / 2)
      .attr('class', 'axis-label')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
      .attr('y', 55)
      .attr('x', innerWidth / 2)
      .attr('class', 'axis-label')
      .attr('fill', 'black')
      .text(xAxisLabel);
  
    // Creates all the circles for the Scatter Plot:
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('r', circleRadius);
    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -20)
      .text(title);
  }  
}