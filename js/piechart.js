//Matt Ward B00671544
//CSCI 4166.03 Visualization
//Winter 2021
// This file is for the bottom-right of the image, "most are cautious ..."

const project1 = d3.select(".pie")
const svg1 = project1.append("svg").attr("width",900).attr("height",600)
const width=900
const height=600
const margin1 = {top:20,right:20,bottom:70,left:70}
const graphWidth1 = 600-margin1.left - margin1.right
const radius = Math.min(width, height) / 2 - margin;
const graphHeight1 = 600 - margin1.top - margin.bottom

//arcpaths for individual data values displayed on pie
const arcPath1 = d3.arc().outerRadius(100).innerRadius(0)
const arcPath2 = d3.arc().outerRadius(100).innerRadius(115)
const arcPath3 = d3.arc().outerRadius(100).innerRadius(40)
const arcPath4 = d3.arc().outerRadius(100).innerRadius(5)
const arcPath5 = d3.arc().outerRadius(100).innerRadius(80)
const arcPath6 = d3.arc().outerRadius(100).innerRadius(10)

const legendRectSize1 = 25;                                
const legendSpacing1 = 10;  

// title
svg1.append("text").attr("class","titlepie").attr("dy","15%").attr("dx","20%").text("Most are cautious about")
                  .attr("fill", "#4F5552")
svg1.append("text").attr("class","titlepie1").attr("dy","21%").attr("dx","20%").text("business recovery time")
                  .attr("fill", "#4F5552")

// choose colour scheme
const colourScale = d3.scaleOrdinal(["#212121","#118BF0","#575757","#2BE8D2","#D6D6D6","#B3B3B3"])
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
    
    //add text data to the pie pieces
    paths1.enter().append("text").text((d) => { return d.data.Percent + "%"}).attr("transform", (d) => {
        if (d.data.Percent < 10) {return "translate(" + arcPath2.centroid(d) + ")"}
        if (d.data.Percent < 16) {return "translate(" + arcPath4.centroid(d) + ")"}
        if (d.data.Percent == 16) {return "translate(" + arcPath5.centroid(d) + ")"}
        if (d.data.Percent == 22) {return "translate(" + arcPath6.centroid(d) + ")"}
        return "translate(" + arcPath3.centroid(d) + ")"})
        .attr("fill", (d) => {const {data:{Percent},}=d
            if(Percent == 35 || Percent == 6 || Percent == 16 ) {return "#4d4d4d"} return "white"})
        .style("font-size",24).attr("font-weight",700).attr("font-family","Pluto Sans")

    //add legend
    const legend1 = svg1.selectAll('.legendpie').data(colourScale1.domain()).enter().append('g')                                          
          .attr('class', 'legendpie').attr('transform', function(d, i) {                    
           const height1 = legendRectSize1 + legendSpacing1          
           const offset1 =  height1 * colourScale1.domain().length / 3
           const horz1 = 17 * legendRectSize1                       
           const vert1 = i * height1 - offset1 + 265                     
           return 'translate(' + horz1 + ',' + vert1 + ')'});  

    //append rectangles
    legend1.append('rect').attr('width', legendRectSize1).attr('height', legendRectSize1)                        
          .style('fill', colourScale1).style('stroke', colourScale1).attr("font-family","Pluto Sans")                 
    
    //append text
    legend1.append('text').attr('x', legendRectSize1 + legendSpacing1)           
          .attr('y', legendRectSize1 - legendSpacing1).text(function(d) { return d })
          .style("font-family","Pluto Sans").style("font-size","17").style("fill","#4F5552")                    
      }
