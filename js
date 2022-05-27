$('document').ready(function() {

  var jsonData;
  var url = 'https://www.quandl.com/api/v1/datasets/FRED/GDP.json?sort_order=asc';

  $.get(url).success(function(jsonData) {
	var data = jsonData.data;    
  console.log(data);
    
  d3.select(".title")
    .append("text")
    .text(jsonData.description);
  
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;  
       
var barWidth = width / data.length;
    
    minDate = new Date(data[0][0]);
    maxDate = new Date(data[272][0]);
    
    
		var x = d3.time.scale()
			.domain([minDate, maxDate])
	 		.range([0, width]);
    
    console.log(x.domain);
    
		var y = d3.scale.linear()
  	  .range([height, 0])   
    	.domain([0, d3.max(data, function(d) { return d[1]; })]);
    
   	var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom")
    	.ticks(d3.time.years, 5); 
    
    var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left")
    	.ticks(10, "");
    
var infobox = d3.select(".infobox"); 

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom )
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);   
    
 chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Gross Domestic Product, USA");
    
    
    chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x( new Date(d[0])); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); })
      .attr("width", barWidth)
	  	.on("mouseover", function(d) {
         var rect = d3.select(this);
         rect.attr("class", "mouseover");
     		 infobox.style("display", "block")
         				.html("Gross Domestic Product for <br/>" + new Date(d[0]) + "<br/>"  + d[1] + " Billion")	 					
            })
 		 	.on("mouseout", function(){
     			 var rect = d3.select(this);
        	 rect.attr("class", "mouseoff");
      		infobox.style("display", "none");	
    }); 
    
    function type(d) {
  		d[1] = +d[1]; // coerce to number
  		return d;
		}

  });

});
