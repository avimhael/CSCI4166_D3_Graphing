// Matt Ward B00671544
// Visualization 4166.03
// Winter 2021
// Modified from source: https://bl.ocks.org/lmatteis/d0f7533895da2e59cd6f62f3589fd8eb
// Tornado chart by Lucas Matteis using version 3 of D3
// This graph updated to version 6
// This file is for the middle tornado graph, "vertical demand varies"

d3.json("./data/linedata2.json").then(function(data) {

function tornadoChart() {

  const margin = {top: 60, right: 30, bottom: 10, left: 400}
  const width = 1050 - margin.left - margin.right
  const height = 355 - margin.top - margin.bottom
  const legendRectSize7 = 25;                                 
  const legendSpacing7 = 25; 
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().rangeRound([0, height]).padding(0.3); 
  const xAxis = d3.axisBottom().scale(x)
  const yAxis = d3.axisLeft().scale(y)
  const colourScale7 = d3.scaleOrdinal(["#2AE7D1","#1A92E9"])

  const svg7 = d3.select(".line2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom).append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function chart(selection) {
    selection.each(function(data) {

      x.domain(d3.extent(data, function(d) { return d.value; }))
      y.domain(data.map(function(d) { return d.desc; }));

      const minvalue = Math.min.apply(Math, data.map(function(d){return d.value;}))
      yAxis.tickPadding(Math.abs(x(minvalue) - x(20)) + 10);

      const bar = svg7.selectAll(".bar")
          .data(data)

      // define that if the value is < 10, it is negative, else positive
      bar.enter().append("rect")
          .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
          .attr("x", function(d) { return x(Math.min(0, d.value)); })
          .attr("y", function(d) { return y(d.desc); })
          .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
          .attr("height", y.bandwidth())

      bar.enter().append('text')
          .attr("text-anchor", "middle")
          .attr("x", function(d,i) {
              return x(Math.min(0, d.value)) + (Math.abs(x(d.value) - x(0)) / 2);
          })
          .attr("y", function(d,i) {
              return y(d.desc) + (y.bandwidth() / 2);
          })
          .attr("dy", ".35em")
          .text(function (d) { return d.value; })

      svg7.append("g")
          .select(".domain")
          .remove()
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg7.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + x(0) + ",0)")
          .call(yAxis);
    });
    const deleteline = svg7.selectAll("path,line").remove();


    // //set legend
    // const legend7 = svg7.selectAll('.legend7').data(colourScale7.domain()).enter().append('g')                                          
    // .attr('class', 'legend7').attr('transform', function(d, i) {                    
    //  const height = legendRectSize + legendSpacing5         
    //  const offset =  height * colourScale7.domain().length / 2   
    //  const horz = 15 * legendRectSize7                       
    //  const vert = i * height - offset + 370                    
    //  return 'translate(' + horz + ',' + vert + ')'});  

    //  //append rectangles
    // legend7.append('rect').attr('width', legendRectSize7).attr('height', legendRectSize7)                        
    // .style('fill', colourScale7).style('stroke', colourScale7)                      

    // //append text
    // legend7.append('text').attr('x', legendRectSize7 + legendSpacing7)           
    // .attr('y', legendRectSize7 - legendSpacing7).text(function(d) { return d })
    // .style("font-weight","bold").style("font-size","20").style("fill","#4F5552").attr("font-family","Pluto Sans")              

  }

  return chart;
}

for (const i in data) {
  const chart = tornadoChart()
  d3.select(".line2")
      .datum(data[i])
      .call(chart);
}

})