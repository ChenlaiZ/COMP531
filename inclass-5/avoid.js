    var button = document.getElementById("button");
    var mybody = document.getElementById("body_id");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var flag = true;
    
    function move() {
        button.style.left = Math.floor(Math.random()*(width-100)) + "px";
        button.style.top = Math.floor(Math.random()*(height-50)) + "px";
    }
    mybody.onkeydown=function(event){
        if (event.shiftKey) {
            button.removeEventListener("mouseover", move);
        }
    } 

    button.onclick= function(){
        if(flag){
            button.value = "Play Again";
            document.getElementById("post_div").style.visibility="visible"; 
            flag = false;    
        } else{
             button.value = "Click Me";
             document.getElementById("post_div").style.visibility="hidden"; 
             button.addEventListener("mouseover", move); 
             flag = true;  
         }
    }

    button.addEventListener("mouseover", move);