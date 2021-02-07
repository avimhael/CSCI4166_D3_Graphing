//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021

const project = d3.select(".donut")
const svg = project.append("svg").attr("width",900).attr("height",600)
const margin = {top:20,right:20,bottom:70,left:70}
const graphWidth = 600-margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom
const arcPath = d3.arc().outerRadius(190).innerRadius(70)
const legendRectSize = 30;                                 
const legendSpacing = 25;  

// title
svg.append("text").attr("class","title").attr("dy","10%").attr("dx","5%").text("Impact of COVID-19 on Business")
                  .attr("fill", "black")

// choose colour scheme
const colourScale = d3.scaleOrdinal(d3["schemeDark2"])
// set up a canvas and the pie chart
const pieCanvas = svg.append("g").attr("width",graphWidth/2).attr("height",graphWidth/2)
                                 .attr("transform", `translate(${margin.left + 200},${margin.top + 250})`)
const pie = d3.pie().sort(null).value(data=>data.total)

// get data from CSV
function getData() {
    d3.json("./data/donutdata.json", function(d) {return d}).then(drawPie)
}

getData()

//draw the pie chart
function drawPie(data) {
    colourScale.domain(data.map(d=>d.name))
    const angles = pie(data)
    const paths = pieCanvas.selectAll("path").data(angles)
    paths.enter().append("path").attr("d", arcPath).attr("class","arc")
                 .attr("stroke","white").attr("fill", d=>colourScale(d.data.name))
    //add legend
    const legend = svg.selectAll('.legend').data(colourScale.domain()).enter().append('g')                                          
          .attr('class', 'legend').attr('transform', function(d, i) {                    
           const height = legendRectSize + legendSpacing          
           const offset =  height * colourScale.domain().length / 2   
           const horz = 20 * legendRectSize                       
           const vert = i * height - offset + 260                      
           return 'translate(' + horz + ',' + vert + ')'});  

    legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize)                        
          .style('fill', colourScale).style('stroke', colourScale)                      
          
    legend.append('text').attr('x', legendRectSize + legendSpacing)           
          .attr('y', legendRectSize - legendSpacing).text(function(d) { return d })                      
      }
