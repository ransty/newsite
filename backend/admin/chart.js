/* Instance variables */
var xInput;
var yInput;
var x = [];
var y = [];
var ny = 0;
var nx = 0;
var count;
var sumX = 0.0;
var sumY = 0.0;
var sumY2;
var sumX2;
var sumXY;
var slope = 0.0;
var intercept;
var xFinal = [];
var yFinal = [];
var lineY1;
var lineY2;
var lineX1;
var lineX;
var dataset = [];
var interval;
var barwidth;
var vo2max;
var workrate;
var oxygenRequired;
var bodyMass;
var maod = 0;


function changeScreens() {
  var screen1 = document.getElementById("screen1");
  var screen2 = document.getElementById("screen2");
  var button = document.getElementById("move");
  if (screen1.style.display == 'inline') {
    screen1.style.display = 'none';
    screen2.style.display = 'inline';
    button.value = "Previous Screen";
  } else {
    screen1.style.display = 'inline';
    screen2.style.display = 'none';
    button.value = "Next Screen"
  }
}

/*
* Takes Workload input from the HTML form
*/
function getList(htmlClass) {
  var check = 0;
  input = document.getElementsByClassName(htmlClass);
  for (var i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      check++;
    }
  }
  if (check == input.length ) {
    throw new Error("No input values for X, nothing to be drawn.");
  } else if ((htmlClass == 'x') || (htmlClass == 'x2')) {
      x = copy(input);
  } else if ((htmlClass == 'y') || (htmlClass == 'y2')) {
      y = copy(input);
  }
}

/*
* Removes invalid input, i.e blank spots
* TODO: More error checking, this isn't sufficient enough for the program
*/
function copy(input) {
  var temp = [];
  for (var index = 0; index < input.length; index++) {
    if (input[index].value == "") {
      continue;
    }
    temp[index] = parseFloat(input[index].value);
  }
  return temp;
}

/*
* Gets the maximum value from an array of floats
*/
function getMaximumValue(list) {
  var maximum = -99999;
  for ( var i = 0; i < list.length; i++ ) {
    if (list[i] >= maximum) {
      maximum = list[i];
    }
  }
  return maximum;
}

/*
* Gets the minimum value from an array of floats
*/
function getMinimumValue(list) {
  var minimum = 99999;
  for ( var i = 0; i < list.length; i++ ) {
    if (list[i] <= minimum) {
      minimum = list[i];
    }
  }
  return minimum
}

/*
* Button call from HTML, starts getting data from form
*/
function s1Input() {
  clearGraph('visualisation');
  getList('x');
  getList('y');
  // get the sum of xgrabInput
  sumX = sum(x);
  // get the sum of y
  sumY = sum(y);
  // get the multiplication sum of x[i] * x[i]
  sumX2 = multiplySum(x, x);
  // get the multiplication sum of x[i] * y[i]
  sumXY = multiplySum(x, y);
  // sum of y * y
  sumY2 = multiplySum(y, y);
  // calculate the slope of the regression line
  slope = (x.length * sumXY - sumX * sumY) / (x.length * sumX2 - sumX * sumX);
  // calculate the x intercept for the regression line
  intercept = (sumY - slope * sumX) / x.length;
  // get the maximum x value
  lineX2 = getMaximumValue(x);
  // get the minimum x value
  lineX1 = getMinimumValue(x);
  // get the maximum value of y
  maxY = getMaximumValue(y);
  // calculate the regression of 0
  lineY1 = regression(0);
  // calculate the regression of the maximum x value
  lineY2 = regression(lineX2);
  // set dataset for the scatter-dots
  for (var i = 0; i <  x.length; i++) {
     dataset.push([x[i], y[i]]);
  }
  count = (x.length == y.length) ? x.length : alert("X and Y list does not match!");
  InitChart();
}


function oxygenDeficit() {
  //console.log("HELLO");
  var overall = parseFloat(180 * (vo2max * workrate / 100));
  console.log("Overall: " +  overall);
  //console.log(overall);
  var oxygenconsumed = 0;
  for (var i = 0; i < y.length; i++) {
    oxygenconsumed += barwidth * y[i];
  }
  console.log("Oxygen Consumed: " + oxygenconsumed);
  //console.log(overall - oxygenconsumed);
  //console.log("Interval " + interval);
  var deficit = (overall - oxygenconsumed) / (60 / barwidth);
  console.log("Deficit " + deficit);
  var rval = deficit * 1000;
  console.log("rval : " + rval);
  // milliters 02 per kg
  maod = rval / bodyMass;
}

function s2Input() {
  reqSpeed();
  clearGraph('visualisation2');
    getList('x2');
    getList('y2');

    for (var i = 0; i <  x.length; i++) {
        dataset[i] = {'x': x[i], 'y': y[i]};
   }

  secondGraph();
}

/*
* Calculates the x[i] * y[i] sum
*/
function multiplySum(x, y) {
  var sum = 0;
  for (var index = 0; index < x.length; index++) {
    sum += x[index] * y[index];
  }
  return sum;
}

/*
* Calculates the sum of an array of float values
*/
function sum(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    sum += parseFloat(input[i]);
  }
  return sum;
}

/*
* Calculates the regression of x; where x is an array of float values
*/
function regression(x) {
  return (slope * x) + intercept;
}

function secondGraph() {
  var margin = {top: 20, right: 20, bottom: 20, left: 50}
        , width = 700 - margin.left - margin.right
        , height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
                .domain([0, 180])
                .range([ 0, width ]);

      var y = d3.scale.linear()
      	      .domain([0, 8])
      	      .range([ height, 0 ]);;


      var chart = d3.select('#visualisation2')
  	.append('svg:svg')
  	.attr('width', width + margin.right + margin.left)
  	.attr('height', height + margin.top + margin.bottom)
  	.attr('class', 'chart')

      var main = chart.append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  	.attr('width', width)
  	.attr('height', height)
  	.attr('class', 'main')

      // draw the x axis
      var xAxis = d3.svg.axis()
  	   .scale(x)
  	    .orient('bottom')
        .ticks(5)
        .tickValues(d3.range(0, width, 15));

    main.append('g')
  	.attr('transform', 'translate(0,' + height + ')')
  	.attr('class', 'main axis date')
  	.call(xAxis);

      // draw the y axis
      var yAxis = d3.svg.axis()
  	.scale(y)
  	.orient('left');

      main.append('g')
  	.attr('transform', 'translate(0,0)')
  	.attr('class', 'main axis date')
  	.call(yAxis);

        var g = main.append("svg:g");


    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.x - barwidth); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", width/interval)
      .attr("height", function(d) { return height - y(d.y); });



    var lineData = [{
    'x': 0,
    'y': (vo2max*workrate/100)
  }, {
    'x': 180,
    'y': (vo2max*workrate/100)
  }];


    var lineFunc = d3.svg.line()
           .x(function(d) {
             return x(d.x);
           })
           .y(function(d) {
             return y(d.y);
           })
           .interpolate('linear');
              g.append('svg:path')
           .attr('d', lineFunc(lineData))
           .attr('stroke', 'red')
           .attr('stroke-width', 2)
           .attr('fill', 'none');

           g.append("text")
      .attr("transform", "translate(5,"+y(lineData[1].y + 0.2)+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "red")
      .text("Oxygen Required " + (vo2max*workrate/100) + " (L/min)");

      oxygenDeficit();

           // now lets write all important data to p
           $("#results").text("MOAD: " + maod);
           $("#dataswap2").text("Time Interval (s)");
           $("#datawrap2").text("V02 Max (L/Min)");

           //console.log("Oxygen Deficit is: " + oxygenDeficit());
}

/*
* Draw a chart (line regression) and display information
* like x-intercept, y-intercept, slope etc
*/
function InitChart() {
  var margin = {top: 20, right: 20, bottom: 20, left: 50}
        , width = 700 - margin.left - margin.right
        , height = 500 - margin.top - margin.bottom;

  var lineData = [{
    'x': 0,
    'y': lineY1
  }, {
    'x': lineX2,
    'y': lineY2
  }];

  var data = dataset;

  var margin = {top: 20, right: 20, bottom: 20, left: 50}
        , width = 700 - margin.left - margin.right
        , height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
                .domain([0, lineX2 + 5])
                .range([ 0, width ]);

      var y = d3.scale.linear()
      	      .domain([0, 5])
      	      .range([ height, 0 ]);;


      var chart = d3.select('#visualisation')
  	.append('svg:svg')
  	.attr('width', width + margin.right + margin.left)
  	.attr('height', height + margin.top + margin.bottom)
  	.attr('class', 'chart')

      var main = chart.append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  	.attr('width', width)
  	.attr('height', height)
  	.attr('class', 'main')

      // draw the x axis
      var xAxis = d3.svg.axis()
  	   .scale(x)
  	    .orient('bottom');

    main.append('g')
  	.attr('transform', 'translate(0,' + height + ')')
  	.attr('class', 'main axis date')
  	.call(xAxis);

      // draw the y axis
      var yAxis = d3.svg.axis()
  	.scale(y)
  	.orient('left');

      main.append('g')
  	.attr('transform', 'translate(0,0)')
  	.attr('class', 'main axis date')
  	.call(yAxis);

      var g = main.append("svg:g");

      g.selectAll("scatter-dots")
        .data(data)
        .enter().append("svg:circle")
            .attr("cx", function (d,i) { return x(d[0]); } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("r", 5,5)
            .append("svg:title") // tooltip with x , y coord
            .text(function(d) {
              return d;
            });

      var lineFunc = d3.svg.line()
           .x(function(d) {
             return x(d.x);
           })
           .y(function(d) {
             return y(d.y);
           })
           .interpolate('linear');
              g.append('svg:path')
           .attr('d', lineFunc(lineData))
           .attr('stroke', 'red')
           .attr('stroke-width', 2)
           .attr('fill', 'none')
           .append("svg:title") // tooltip
           .text(function(d) {
             return "Y-Intercept: " + intercept + ", Slope: " + slope;
           });

           //console.log("Oxygen Required: " + oxygenDeficit());
           //console.log("Body mass oxygen: " + (oxygenRequired() * 1000 / bodyMass));

           // now lets write all important data to p
           $("#results").text("Y-Intercept: " + Math.round(intercept * 10000) / 10000 + ", X-Intercept: " + Math.round(((-intercept)/slope) * 10000) / 10000 + ", Slope: " + Math.round(slope * 10000) / 10000 + ", R^2: " + correlation() + ", Equation: Y = " + Math.round(slope * 10000) / 10000 + "X + " + Math.round(intercept * 10000) / 10000 );
           $("#dataswap").text("Workload");
           $("#datawrap").text("V02 Max (L/Min)");


}

/*
* Calculates the R Squared value of the line
* (Coefficient of Expression)
*/
function correlation() {
  var result = 0;
  var r1 = count * sumXY - (sumX * sumY);
  var r2 = Math.sqrt((count * sumX2 - Math.pow(sumX, 2))*(count * sumY2 - Math.pow(sumY, 2)));
  result = Math.pow((r1 / r2), 2);
  result = Math.round(result * 1000) / 1000;
  if (result < 0.8) {
    alert("Please review the data you entered, it seems a bit off.");
  }
  return result;
}

/*
* Clears the graph (jQuery)
* NOTE: jQuery must be loaded before this script for this to work
*/
function clearGraph(string) {
  console.log("#" + string + "");
  $("#" + string + "").empty();
  // clear all variables
  xInput = 0;
  yInput = 0;
  x = [];
  y = [];
  ny = 0;
  nx = 0;
  count = 0;
  sumX = 0.0;
  sumY = 0.0;
  sumY2 = 0;
  sumX2 = 0;
  sumXY = 0;
  //slope = 0.0;
  //intercept = 0;
  xFinal = [];
  yFinal = [];
  lineY1 = 0;
  lineY2 = 0;
  lineX1 = 0;
  lineX = 0;
  dataset = [];
  $("#dataswap").text("");
  $("#datawrap").text("");
  $("#dataswap2").text("");
  $("#datawrap2").text("");
}


function kk(input) {
  var intervalList = document.getElementsByClassName('x2');
  var yList = document.getElementsByClassName('y2');
  barwidth = parseInt(input);
  interval = 180 / barwidth;
  for (var index = 0; index <= interval; index++) {
    intervalList[index].style.display = 'inline';
    yList[index].style.display = 'inline';
    intervalList[index].value = (index + 1) * input;
  }
  for (var i = interval; i <= intervalList.length; i++) {
    intervalList[i].style.display = 'none';
    yList[i].style.display = 'none';
  }
}

function setName(name) {
  var d = document.getElementById('officialname');
  d.innerHTML = "Patient Name: " + name + "<input name='submitMedical' value='' title='edit client details' class='profile_edit_btn' type='submit' />";
}

function setMass(mass) {
  bodyMass = parseFloat(mass);
}

function reqSpeed(){
    vo2max = parseFloat(document.getElementById('Vmax').value);
    workrate = parseFloat(document.getElementById('supermaximal').value);
    reqwork = ((vo2max*workrate/100 - intercept) / slope);

    var d = document.getElementById('reqworkload');
    d.value = reqwork;

}
