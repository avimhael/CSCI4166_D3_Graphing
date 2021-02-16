//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021
// This file is for the top-left of the image, "Impact of COVID-19 .....""

const project = d3.select(".donut")
const svg = project.append("svg").attr("width",900).attr("height",600)
const margin = {top:20,right:20,bottom:70,left:70}
const graphWidth = 500-margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom
const legendRectSize = 25;                                 
const legendSpacing = 25;  

//arcpaths for individual data values displayed on pie
const arcPath7 = d3.arc().outerRadius(100).innerRadius(30)
const arcPath8 = d3.arc().outerRadius(100).innerRadius(130)
const arcPath9 = d3.arc().outerRadius(100).innerRadius(75)
const arcPath10 = d3.arc().outerRadius(100).innerRadius(10)
const arcPath11 = d3.arc().outerRadius(100).innerRadius(150)
const arcPath12 = d3.arc().outerRadius(100).innerRadius(110)

// title
svg.append("text").attr("class","title").attr("dy","20%").attr("dx","19%").text("Impact of COVID-19 on Business")
                  .attr("fill", "#4F5552")

// choose colour scheme
const colourScale1 = d3.scaleOrdinal(["#253534","#2AE7D1","#B3AEB2","#595758","#1A92E9"])
// set up a canvas and the pie chart
const pieCanvas = svg.append("g").attr("width",graphWidth/2).attr("height",graphWidth/2)
                                 .attr("transform", `translate(${margin.left + 190},${margin.top + 330})`)
const pie = d3.pie().sort(null).value(data=>data.total)

// get data from JSON
function getData() {
    d3.json("./data/donutdata.json", function(d) {return d}).then(drawDonut)
}
getData()

//draw the pie chart
function drawDonut(data) {
    colourScale1.domain(data.map(d=>d.name))
    const angles = pie(data)
    const paths = pieCanvas.selectAll("path").data(angles)


    paths.enter().append("path").attr("d", arcPath7).attr("class","arc")
                 .attr("stroke","white").attr("fill", d=>colourScale1(d.data.name))

    //add text data to the pie pieces
    paths.enter().append("text").text((d) => { return d.data.total + "%"}).attr("transform", (d) => {
        if (d.data.total == 15) {return "translate(" + arcPath8.centroid(d) + ")"}
        if (d.data.total == 13) {return "translate(" + arcPath9.centroid(d) + ")"}
        if (d.data.total == 66) {return "translate(" + arcPath10.centroid(d) + ")"}
        if (d.data.total == 2) {return "translate(" + arcPath11.centroid(d) + ")"}
        return "translate(" + arcPath12.centroid(d) + ")"})
        .attr("fill", (d) => {const {data:{total},}=d
            if(total == 66 || total == 4 || total == 2 || total == 15) {return "#4d4d4d"} return "white"})
        .style("font-size",24).attr("font-weight",100).attr("font-family","Pluto Sans")


    //add legend
    const legend = svg.selectAll('.legend').data(colourScale1.domain()).enter().append('g')                                          
          .attr('class', 'legend').attr('transform', function(d, i) {                    
           const height = legendRectSize + legendSpacing          
           const offset =  height * colourScale1.domain().length / 2   
           const horz = 15 * legendRectSize                       
           const vert = i * height - offset + 370                    
           return 'translate(' + horz + ',' + vert + ')'});  

    //append rectangles
    legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize)                        
          .style('fill', colourScale1).style('stroke', colourScale1)                      
    
    //append text
    legend.append('text').attr('x', legendRectSize + legendSpacing)           
          .attr('y', legendRectSize - legendSpacing).text(function(d) { return d }).style("font-weight","bold").style("font-size","20").style("fill","#4F5552").attr("font-family","Pluto Sans")              
      }
