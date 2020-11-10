import {
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
} from 'd3';

import { svg, margin, height, width, group} from './helper/config'

const x = scaleBand().padding(0.2);
const y = scaleLinear();

export function createViz (data) {
  const vizData = data.splice(0, 40)
  console.log(vizData)

  setupScales(vizData)
	setupAxes(group)
	drawBars(group, vizData)

}

function drawBars(target, data) {
  target
   .selectAll('.bar')
   .data(data)
   .enter()
   .append('rect')
     .attr('class', 'bar')
     .attr('x', d => x(d.areadesc))
     .attr('y', d => y(d.parkingCapacity))
     .attr('width', x.bandwidth())
     .attr('height', d => height - y(d.parkingCapacity))
}

function setupScales(data){
 console.log("setting up scales")
 x.domain(data.map(parking => parking.areadesc))
 y.domain([0, max(data.map(parking => parking.parkingCapacity))])
 x.rangeRound([0, width])
 y.rangeRound([height, 0])
}

function setupAxes(target){
 target
   .append('g')
   .attr('class', 'axis axis-x')
   .call(axisBottom(x))
     .attr('transform', 'translate(0,' + height + ')')
     .selectAll("text")
       .attr("transform", "rotate(-90)")
       .attr("dx", -150)
       .attr("dy", "1em")
       
 target
   .append('g')
   .attr('class', 'axis axis-y')
   .call(axisLeft(y))
}
