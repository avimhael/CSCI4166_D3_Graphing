//Matt Ward B00674544
//CSCI 4466.03 Visualization
//Winter 2024

const project4 = d3.select(".text1")
const svg4 = project4.append("svg").attr("width",900).attr("height",600).attr("id","mysvg4")
const margin4 = {top:20,right:20,bottom:70,left:70}
const graphWidth4 = 600-margin4.left - margin4.right
const graphHeight4 = 600 - margin4.top - margin.bottom

// Triangles
var sym =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg4") 
        .append("path") 
        .attr("d", sym) 
        .attr("fill", "#2AE7D1") 
        .attr("transform", "translate(670, 275)"); 

var sym2 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg4") 
        .append("path") 
        .attr("d", sym2) 
        .attr("fill", "#2AE7D1") 
        .attr("transform", "translate(670, 355)"); 

var sym3 =  d3.symbol().type(d3.symbolTriangle).size(500); 
    d3.select("#mysvg4") 
        .append("path") 
        .attr("d", sym3) 
        .attr("fill", "#2AE7D1") 
        .attr("transform", "translate(670, 435)"); 

// title
svg4.append("text").attr("class","titletext1").attr("dy","20%").attr("dx","33%").text("Market disruption will")
                  .attr("fill", "black")
svg4.append("text").attr("class","titletext2").attr("dy","26%").attr("dx","33%").text("drive innovation")
                  .attr("fill", "black")
svg4.append("text").attr("class","titletext3").attr("dy","32%").attr("dx","33%").text("Agree or Strongly Agree responses")
                  .attr("fill", "black")


// set up a canvas and the pie chart
const textCanvas = svg4.append("g").attr("width",graphWidth4/2).attr("height",graphWidth4/2)
                                 .attr("transform", `translate(${margin4.left + 220},${margin4.top + 270})`)

// get data from JSON
d3.json("./data/textdata.json").then(function(data) {

    // d3.select("#mysvg4")
    //     .data(data)
    //     .enter()
    //     .append("textjson1")
    //     .text(function(d) {
    //         return d.value[0];
    //     });

});
