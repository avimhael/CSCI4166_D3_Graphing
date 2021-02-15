//Matt Ward B00676666
//CSCI 6666.03 Visualization
//Winter 2026

const project6 = d3.select(".text3")
const svg6 = project6.append("svg").attr("width",900).attr("height",600).attr("id","mysvg6")
const margin6 = {top:20,right:20,bottom:70,left:70}
const graphWidth6 = 600-margin6.left - margin6.right
const graphHeight6 = 600 - margin6.top - margin.bottom

// Triangles
var sym6 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg6") 
        .append("path") 
        .attr("d", sym6) 
        .attr("fill", "#2AE7D1") 
        .attr("transform", "translate(760, 310) rotate(180)"); 



// title
svg6.append("text").attr("class","titletext7").attr("dy","20%").attr("dx","54%").text("Office print volumes")
                  .attr("fill", "#6F6662")
svg6.append("text").attr("class","titletext8").attr("dy","26%").attr("dx","54%").text("are in free fall")
                  .attr("fill", "#6F6662")
svg6.append("text").attr("class","titletext9").attr("dy","32%").attr("dx","54%").text("What impact are you seeing")
                  .attr("fill", "#6F6662")
svg6.append("text").attr("class","titletext10").attr("dy","36%").attr("dx","54%").text("on customer print volumes?")
                  .attr("fill", "#6F6662")


// set up a canvas and the pie chart
const textCanvas6 = svg6.append("g").attr("width",graphWidth6/2).attr("height",graphWidth6/2)
                                 .attr("transform", `translate(${margin6.left + 220},${margin6.top + 270})`)

// get data from JSON
d3.json("./data/textdata3.json").then(function(data) {


    d3.select("#mysvg6") 
    .append("text") 
    .text(data[0].value + "%")
    .attr("fill", "#2AE7D1") 
    .attr("transform", "translate(500, 320)").style("font-size",32).attr("font-weight",100).attr("font-family","Pluto Sans")
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[0].desc)
    .attr("fill", "#2AE7D1") 
    .attr("transform", "translate(600, 320)").attr("font-family","Pluto Sans")
    
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[1].value + "%")
    .attr("fill", "#1A92E9") 
    .attr("transform", "translate(500, 400)").style("font-size",32).attr("font-weight",100).attr("font-family","Pluto Sans")
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[1].desc)
    .attr("fill", "#1A92E9") 
    .attr("transform", "translate(600, 395)").attr("font-family","Pluto Sans")
    
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[2].value + "%")
    .attr("fill", "#253534") 
    .attr("transform", "translate(500, 440)").style("font-size",32).attr("font-weight",100).attr("font-family","Pluto Sans")
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[2].desc)
    .attr("fill", "#253534") 
    .attr("transform", "translate(600, 435)").attr("font-family","Pluto Sans")
    
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[3].value + "%")
    .attr("fill", "#253534") 
    .attr("transform", "translate(500, 480)").style("font-size",32).attr("font-weight",100).attr("font-family","Pluto Sans")
    d3.select("#mysvg6") 
    .append("text") 
    .text(data[3].desc)
    .attr("fill", "#253534") 
    .attr("transform", "translate(600, 475)").attr("font-family","Pluto Sans")
});