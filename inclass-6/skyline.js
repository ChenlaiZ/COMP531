'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	var count = 0;
	var sun_move = -4;
	var car_move = -1;
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	//add array to record the building information
	var x0_arr = new Array();
	var width_arr = new Array();
	var height_arr = new Array();
	var t_out = setInterval(func, 500);
	

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	
	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = 5+(windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = 20+Math.random()*canvas.height/2
		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		
		//record the building information
		x0_arr[count] = x0;
		width_arr[count] = blgWidth;
		height_arr[count] = blgHeight;
		count++;
		console.log(""+ x0 + "  " + (x0+blgWidth)+ '\n' + (floor - blgHeight)  + "  " + floor);

		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random()>0.6){
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}
	}

	function fillCircle(x, y, r, color){
		c.fillStyle=color;
		c.beginPath();
		c.arc(x, y, r, 0, 2*Math.PI, false);
		c.closePath();
		c.fill();
	}

	function func(){
		c.fillStyle="white"
		c.fillRect(0, 0, canvas.width, floor)
		var s = 25 + sun_move * 10;
		sun_move++;
		if(s - 25 >= canvas.width){
			sun_move = -4;
		}
		fillCircle(s, 50, 25, "yellow");
		for(var i=0; i<count; i++){
			c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
			c.fillRect(x0_arr[i], floor - height_arr[i], width_arr[i], height_arr[i]);
			for (var y = floor - floorSpacing; y > floor - height_arr[i]; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < width_arr[i] - windowWidth; x += windowSpacing + windowWidth) {
					if (Math.random()>0.6){
						c.fillStyle="yellow"
						c.fillRect(x0_arr[i] + x, y - windowHeight, windowWidth, windowHeight)
					}
				}
			}			
		}
		
		var cc = 30 + car_move * 20;
		car_move++;
		if(cc - 80 >= canvas.width){
			car_move = -1;
		}
		c.fillStyle="blue"
		c.fillRect(cc, floor-30, 80, 30);
	}

//get mouse click position, judge and grow the building
	var mycanvas = document.getElementById('myCanvas');
	mycanvas.addEventListener("mousedown", getPosition, false);
	function getPosition(event){
		var x = event.x;
		var y = event.y;
		x -= mycanvas.offsetLeft;
		y -= mycanvas.offsetTop;
		y = y - 50;
		console.log('Mouse position: ' + x + ',' + y);
		for(var i=0; i<count; i++){
			if(x>x0_arr[i] && x<x0_arr[i]+width_arr[i] && y>floor - height_arr[i] && y<floor){
				height_arr[i] = height_arr[i] + 40;
				//console.log('height_arr: ' + height_arr[i]);
				break;
			}		
		}

	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}

