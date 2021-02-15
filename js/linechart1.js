const margin2 = {top: 20, right: 30, bottom: 60, left: 250}
const width2 = 1000 - margin2.left - margin2.right
const graphWidth2 = 600-margin2.left - margin2.right
const graphHeight2 = 900 - margin2.top - margin2.bottom
const height2 = 370 - margin2.top - margin2.bottom


const svg2 = d3.select(".line").append("svg").attr("width", width2 + margin2.left + margin2.right)
.attr("height", height2 + margin2.top + margin2.bottom)
.append("g").attr("transform", `translate(${margin.left+148},${margin.top})`)


d3.json("./data/linedata.json").then(function(data) {

    const x2 = d3.scaleLinear().domain([0, 100]).range([ 0, width2])

    svg2.append("g").attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2)
    .tickFormat(d => d + "%"))
    .selectAll("text")
    .attr('class', 'xaxis')
    .attr("transform", "translate(12,0)")
    .style("text-anchor", "end")

    const y2 = d3.scaleBand().range([ 0, height2 ])
    .domain(data.map(function(d) { return d.desc; })).padding(.2)

    svg2.append("g").attr('class', 'xaxis')
    .call(d3.axisLeft(y2)).style("font-family","Pluto Sans").style("font-size","16").style("fill","#4F5552")  
    
    const deleteline = svg2.selectAll("path,line").remove();

    svg2.selectAll("myGraph").data(data).enter().append("rect")
    .attr("x",x2(0))
    .attr("y", function(d) { return y2(d.desc)})
    .attr("width", function(d) { return x2(d.total)})
    .attr("height", y2.bandwidth())


})
