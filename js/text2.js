//Matt Ward B00675555
//CSCI 5566.03 Visualization
//Winter 2025

const project5 = d3.select(".text2")
const svg5 = project5.append("svg").attr("width",900).attr("height",600).attr("id","mysvg5")
const margin5 = {top:20,right:20,bottom:70,left:70}
const graphWidth5 = 600-margin5.left - margin5.right
const graphHeight5 = 600 - margin5.top - margin.bottom

// Triangles
var sym3 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg5") 
        .append("path") 
        .attr("d", sym3) 
        .attr("fill", "#32cbcd") 
        .attr("transform", "translate(880, 210)"); 

var sym4 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg5") 
        .append("path") 
        .attr("d", sym4) 
        .attr("fill", "#32cbcd") 
        .attr("transform", "translate(880, 290)"); 

var sym5 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg5") 
        .append("path") 
        .attr("d", sym5) 
        .attr("fill", "#32cbcd") 
        .attr("transform", "translate(880, 390)"); 

// title
svg5.append("text").attr("class","titletext4").attr("dy","10%").attr("dx","55%").text("Collaboration, cloud, and")
                  .attr("fill", "black")
svg5.append("text").attr("class","titletext5").attr("dy","16%").attr("dx","55%").text("digitization opportunities")
                  .attr("fill", "black")
svg5.append("text").attr("class","titletext6").attr("dy","22%").attr("dx","55%").text("Anticipated future interest")
                  .attr("fill", "black")


// set up a canvas and the pie chart
const textCanvas5 = svg5.append("g").attr("width",graphWidth5/2).attr("height",graphWidth5/2)
                                 .attr("transform", `translate(${margin5.left + 220},${margin5.top + 270})`)

// get data from JSON
d3.json("./data/textdata2.json").then(function(data) {

});
