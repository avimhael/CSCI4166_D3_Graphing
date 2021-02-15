// Matt Ward B00671544
// Visualization 4166.03
// Winter 2021
// Modified from source: https://bl.ocks.org/lmatteis/d0f7533895da2e59cd6f62f3589fd8eb
// Tornado chart by Lucas Matteis using version 3 of D3
// This graph updated to version 6

d3.json("./data/linedata2.json").then(function(data) {


function tornadoChart() {

  const margin = {top: 20, right: 30, bottom: 40, left: 100}
  const width = 450 - margin.left - margin.right
  const height = 200 - margin.top - margin.bottom

  const x = d3.scaleLinear().range([0, width]);

  const y = d3.scaleBand().rangeRound([0, height]).padding(0.1);
      
  const xAxis = d3.axisBottom().scale(x)

  const yAxis = d3.axisLeft().scale(y)

  const svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom).append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function chart(selection) {
    selection.each(function(data) {

      x.domain(d3.extent(data, function(d) { return d.value; }))
      y.domain(data.map(function(d) { return d.age; }));

      const minvalue = Math.min.apply(Math, data.map(function(d){return d.value;}))
      yAxis.tickPadding(Math.abs(x(minvalue) - x(0)) + 10);

      const bar = svg.selectAll(".bar")
          .data(data)

      // define that if the value is < 10, it is negative, else positive
      bar.enter().append("rect")
          .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
          .attr("x", function(d) { return x(Math.min(0, d.value)); })
          .attr("y", function(d) { return y(d.age); })
          .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
          .attr("height", y.bandwidth())

      bar.enter().append('text')
          .attr("text-anchor", "middle")
          .attr("x", function(d,i) {
              return x(Math.min(0, d.value)) + (Math.abs(x(d.value) - x(0)) / 2);
          })
          .attr("y", function(d,i) {
              return y(d.age) + (y.bandwidth() / 2);
          })
          .attr("dy", ".35em")
          .text(function (d) { return d.value; })

      svg.append("g")
          .select(".domain")
          .remove()
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + x(0) + ",0)")
          .call(yAxis);
    });
    const deleteline = svg2.selectAll("path,line").remove();
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