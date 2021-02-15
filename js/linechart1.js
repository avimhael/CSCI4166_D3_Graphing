//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021

const margin2 = {top: 20, right: 30, bottom: 60, left: 250}
const width2 = 1000 - margin2.left - margin2.right
const height2 = 370 - margin2.top - margin2.bottom

//define svg
const svg2 = d3.select(".line").append("svg").attr("width", width2 + margin2.left + margin2.right)
.attr("height", height2 + margin2.top + margin2.bottom)
.append("g").attr("transform", `translate(${margin.left+148},${margin.top})`)

//load data
d3.json("./data/linedata.json").then(function(data) {

    //define x axis
    const x2 = d3.scaleLinear().domain([0, 100]).range([ 0, width2])
    //give x axis some features
    svg2.append("g").attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2)
    .tickFormat(d => d + "%"))
    .selectAll("text")
    .attr('class', 'xaxis')
    .attr("transform", "translate(15,0)")
    .style("text-anchor", "end")

    //define y axis
    const y2 = d3.scaleBand().range([ 0, height2 ])
    .domain(data.map(function(d) { return d.desc; })).padding(.2)
    //give y axis some features
    svg2.append("g").attr('class', 'yaxis')
    .call(d3.axisLeft(y2)).style("font-size", 17)
    .style("fill", "#4d4d4d");
    
    //hide the axis lines
    const deleteline = svg2.selectAll("path,line").remove();

    //append rectangles
    svg2.selectAll(".line").data(data).enter().append("rect")
    .attr("x",x2(0))
    .attr("y", function(d) { return y2(d.desc)})
    .attr("width", function(d) { return x2(d.total)})
    .attr("height", y2.bandwidth())

    //append percentage values to the end of the rectangles. Not working 100% yet.
    // They display above the bars but not on each individual bar
    svg2.selectAll(".line").data(data).enter().append("text")
    .text((d) => { return d.total + "%"})
    .attr("x", (d) => x2(d.total + 10) +9)
    .attr("y", (d) => y2(d.desc + 500))
    .style("font-size",30)

})