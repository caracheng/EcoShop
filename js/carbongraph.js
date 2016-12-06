window.onload = function () {
/*	var chart = new CanvasJS.Chart("chartContainer", {
				data: [{
					type: "bar",
					dataPoints: [
					{y: 0}
					]
				}]
			});
			chart.render();*/

//http://canvasjs.com/docs/charts/chart-types/html5-bar-chart/
	var data = [
      {
        type: "bar",
        dataPoints: [
        ]
      }
      ];
	
	var options = { 
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		};
	
	var chart = new CanvasJS.Chart("chartContainer", {
		type: 'stackedBar', //horizontalBar
		data: data,
		options: options,
		axisY:{
			title : "Carbon Footprint (CO2 released in lbs)",
		},
		axisX:{
			title : "Store",
		}
	});
	chart.render();
	
	$("#calculate").click(function () {
		console.log("updating graph");
		var points = document.getElementById("cfp").innerHTML;
		var cfp_number = parseInt(document.getElementById("cfp").innerHTML);
		//chart.data[datasets][data].push(cfp);
		var store_name = document.getElementById("store_name").innerText;
		var datapoint = {y: cfp_number, label: store_name}
		console.log(chart.data["0"].dataPoints.push(datapoint));
		//console.log(JSON.stringify(chart));
		chart.render();
	});
}
			



//var miles = document.getElementById("miles").value;
//var prices = document.getElementById("prices").value;

//calculating carbon footprint based on spending behavior
//we look at the energy required to produce the products you are buying
//then we look at the energy required to ship the products you are buying
//then we look at the energy expended via travel to get to your shopping location

//http://shrinkthatfootprint.com/calculate-your-carbon-footprint

function calculate(){
//calculate distance cfootprint
	//var distance = document.getElementById("distance").valueAsNumber;
	var travel = calculateTravel();
	var materials = calculateMaterials();
	var cfp = travel + materials;
	
	document.getElementById("cfp").innerHTML = cfp;

}

function calculateTravel(){
	var distance = document.getElementById("distance").valueAsNumber;
	var carbonFootprint = 0;
	if (document.getElementById("travel").selectedIndex == 0){ //car
		//travel_cfp = 
		//https://carbonfund.org/how-we-calculate/
		//Unleaded gasoline emits 8.91 kg or 20 lbs of CO2 per gallon
		//
		console.log("car");
		carbonFootprint = 8.91*distance;
	}
	if (document.getElementById("travel").selectedIndex == 1){ //bus
	//0.055 kgs per passenger mile or 0.12 lbs
		console.log("bus");
		carbonFootprint = 0.055*distance;
	}
	if (document.getElementById("travel").selectedIndex == 2){ //rail
	//0.17 kgs per passenger mile or 0.37 lbs
			console.log("rail");
		carbonFootprint = 0.17*distance;

	}
	if (document.getElementById("travel").selectedIndex == 3){ //walking biking

	}
	return carbonFootprint;
}

function calculateMaterials(){
var carbonFootprint = 0;
var numberOfChBox = $('.materials').length;
var checkArray = new Array(); 

for(i = 1; i <= numberOfChBox; i++) {

    if($('#chkBox' + i).is(':checked')) {
		var material = console.log($('#chkBox'+i)[0].value);
        //checkArray[i] = 1; 
		checkArray[i] = material;
    } 
}

for (i= 1; i <= checkArray.length; i++){
	if (checkArray[i] == "cotton"){
		carbonFootprint += 5.9;
	}
	if (checkArray[i] == "spandex"){
		carbonFootprint += 2.35;
	}
	if (checkArray[i] == "polyester"){
		carbonFootprint += 9.52;
	}
}


return carbonFootprint; 
}
