//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021

const project1 = d3.select(".pie")
const svg1 = project1.append("svg").attr("width",900).attr("height",600)
const margin1 = {top:20,right:20,bottom:70,left:70}
const graphWidth1 = 600-margin1.left - margin1.right
const graphHeight1 = 600 - margin1.top - margin.bottom
const arcPath1 = d3.arc().outerRadius(100).innerRadius(0)
const legendRectSize1 = 25;                                
const legendSpacing1 = 10;  

// title
svg1.append("text").attr("class","titlepie").attr("dy","15%").attr("dx","20%").text("Most are cautious about")
                  .attr("fill", "black")
svg1.append("text").attr("class","titlepie1").attr("dy","21%").attr("dx","20%").text("business recovery time")
                  .attr("fill", "black")

// choose colour scheme
const colourScale1 = d3.scaleOrdinal(d3["schemeDark2"])
// set up a canvas and the pie chart
const pieCanvas1 = svg1.append("g").attr("width",graphWidth1/2).attr("height",graphWidth1/2)
                                 .attr("transform", `translate(${margin1.left + 220},${margin1.top + 270})`)
const pie1 = d3.pie().sort(null).value(data=>data.total)

// get data from JSON
function getData() {
    d3.json("./data/piedata.json", function(d) {return d}).then(drawPie)
}

getData()

//draw the pie chart
function drawPie(data) {
    colourScale1.domain(data.map(d=>d.name))
    const angles1 = pie(data)
    const paths1 = pieCanvas1.selectAll("path").data(angles1)
    paths1.enter().append("path").attr("d", arcPath1).attr("class","arc")
                 .attr("stroke","white").attr("fill", d=>colourScale(d.data.name))
    //add legend
    const legend1 = svg1.selectAll('.legendpie').data(colourScale1.domain()).enter().append('g')                                          
          .attr('class', 'legendpie').attr('transform', function(d, i) {                    
           const height1 = legendRectSize1 + legendSpacing1          
           const offset1 =  height1 * colourScale1.domain().length / 3
           const horz1 = 17 * legendRectSize1                       
           const vert1 = i * height1 - offset1 + 265                     
           return 'translate(' + horz1 + ',' + vert1 + ')'});  

    legend1.append('rect').attr('width', legendRectSize1).attr('height', legendRectSize1)                        
          .style('fill', colourScale1).style('stroke', colourScale1)                      
          
    legend1.append('text').attr('x', legendRectSize1 + legendSpacing1)           
          .attr('y', legendRectSize1 - legendSpacing1).text(function(d) { return d }).style("font-family","Pluto Sans").style("font-size","16")                 
      }
