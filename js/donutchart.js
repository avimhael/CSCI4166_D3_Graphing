//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021

const project = d3.select(".donut")
const svg = project.append("svg").attr("width",900).attr("height",600)
const margin = {top:20,right:20,bottom:70,left:70}
const graphWidth = 500-margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom
const arcPath = d3.arc().outerRadius(100).innerRadius(30)
const legendRectSize = 25;                                 
const legendSpacing = 25;  

// title
svg.append("text").attr("class","title").attr("dy","20%").attr("dx","19%").text("Impact of COVID-19 on Business")
                  .attr("fill", "#4F5552")

// choose colour scheme
const colourScale1 = d3.scaleOrdinal(["#253534","#2AE7D1","#B3AEB2","#595758","#1A92E9"])
// set up a canvas and the pie chart
const pieCanvas = svg.append("g").attr("width",graphWidth/2).attr("height",graphWidth/2)
                                 .attr("transform", `translate(${margin.left + 190},${margin.top + 275})`)
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
    paths.enter().append("path").attr("d", arcPath).attr("class","arc")
                 .attr("stroke","white").attr("fill", d=>colourScale1(d.data.name))
    //add legend
    const legend = svg.selectAll('.legend').data(colourScale1.domain()).enter().append('g')                                          
          .attr('class', 'legend').attr('transform', function(d, i) {                    
           const height = legendRectSize + legendSpacing          
           const offset =  height * colourScale1.domain().length / 2   
           const horz = 15 * legendRectSize                       
           const vert = i * height - offset + 310                    
           return 'translate(' + horz + ',' + vert + ')'});  

    legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize)                        
          .style('fill', colourScale1).style('stroke', colourScale1)                      
          
    legend.append('text').attr('x', legendRectSize + legendSpacing)           
          .attr('y', legendRectSize - legendSpacing).text(function(d) { return d }).style("font-weight","bold").style("font-size","20").style("fill","#4F5552")                 
      }
