window.onload = function() {
	var image_arr = ["Rice-1.jpg", "Rice-2.jpg", "Rice-3.jpg", "Rice-4.jpg", "Rice-5.png", "Rice-6.jpg", "Rice-7.jpg", "Rice-8.jpg", "Rice-9.jpg", "Rice-10.jpg", "Rice-11.jpg", "Rice-12.jpg", "Rice-13.jpg", "Rice-14.jpg"]
//get the button items
	var imgbtn1 = document.getElementById("button1");
	var imgbtn2 = document.getElementById("button2");
	var imgbtn3 = document.getElementById("button3");
	var imgbtn4 = document.getElementById("button4");
	var imgbtn5 = document.getElementById("button5");
	var imgbtn6 = document.getElementById("button6");
	var imgbtn7 = document.getElementById("button7");
	var loginBtn = document.getElementById("login");
//set the time interval for images
	var t_out1 = setInterval(func1, 1000);
	var t_out2 = setInterval(func2, 1000);
	var t_out3 = setInterval(func3, 1000);
	var t_out4 = setInterval(func4, 1000);
	var t_out5 = setInterval(func5, 1000);
	var t_out6 = setInterval(func6, 1000);
	var t_out7 = setInterval(func7, 1000);
	var i1 = 0, i2 = 2, i3 = 4, i4 = 6, i5 = 8, i6 = 10, i7 = 12;
//change the resource of images
  	function func1(){
  		if(i1==0){
  			document.getElementById("img1").src = image_arr[i1++];
  		} else{
  			document.getElementById("img1").src = image_arr[i1--];
		}
    }
  	function func2(){
  		if(i2==2){
  			document.getElementById("img2").src = image_arr[i2++];
  		} else{
  			document.getElementById("img2").src = image_arr[i2--];
		}
    }
  	function func3(){
  		if(i3==4){
  			document.getElementById("img3").src = image_arr[i3++];
  		} else{
  			document.getElementById("img3").src = image_arr[i3--];
		}
    }
  	function func4(){
  		if(i4==6){
  			document.getElementById("img4").src = image_arr[i4++];
  		} else{
  			document.getElementById("img4").src = image_arr[i4--];
		}
    }
  	function func5(){
  		if(i5==8){
  			document.getElementById("img5").src = image_arr[i5++];
  		} else{
  			document.getElementById("img5").src = image_arr[i5--];
		}
    }
  	function func6(){
  		if(i6==10){
  			document.getElementById("img6").src = image_arr[i6++];
  		} else{
  			document.getElementById("img6").src = image_arr[i6--];
		}
    }
  	function func7(){
  		if(i7==12){
  			document.getElementById("img7").src = image_arr[i7++];
  		} else{
  			document.getElementById("img7").src = image_arr[i7--];
		}
    } 
//handle the click action of buttons   	    	    	    	    
    imgbtn1.onclick = function(){
    	if(imgbtn1.value == "Stop"){
    		stop(imgbtn1, t_out1);
    	}else{
    		start(imgbtn1, t_out1, func1);
    	}
    }
    imgbtn2.onclick = function(){
    	if(imgbtn2.value == "Stop"){
    		stop(imgbtn2, t_out2);
    	}else{
    		start(imgbtn2, t_out2, func2);
    	}
    }
    imgbtn3.onclick = function(){
    	if(imgbtn3.value == "Stop"){
    		stop(imgbtn3, t_out3);
    	}else{
    		start(imgbtn3, t_out3, func3);
    	}
    }
    imgbtn4.onclick = function(){
    	if(imgbtn4.value == "Stop"){
    		stop(imgbtn4, t_out4);
    	}else{
    		start(imgbtn4, t_out4, func4);
    	}
    }
    imgbtn5.onclick = function(){
    	if(imgbtn5.value == "Stop"){
    		stop(imgbtn5, t_out5);
    	}else{
    		start(imgbtn5, t_out5, func5);
    	}
    }
    imgbtn6.onclick = function(){
    	if(imgbtn6.value == "Stop"){
    		stop(imgbtn6, t_out6);
    	}else{
    		start(imgbtn6, t_out6, func6);
    	}
    }	
    imgbtn7.onclick = function(){
    	if(imgbtn7.value == "Stop"){
    		stop(imgbtn7, t_out7);
    	}else{
    		start(imgbtn7, t_out7, func7);
    	}
    }		

    function stop(imgbtn, t_out){
    	imgbtn.value = "Start";
    	clearInterval(t_out);
    }

    function start(imgbtn, t_out, func){
    	imgbtn.value = "Stop";
    	t_out = setInterval(func, Math.random()*4000+1000);
    }

	loginBtn.onclick = function() {
		location.href = "profile.html";
	}
}