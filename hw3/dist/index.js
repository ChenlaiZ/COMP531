window.onload = function() {
	document.getElementById("timestamp").value = new Date().getTime();
	var btnsmt = document.getElementById("submit");
	var btnsign = document.getElementById("signin");
	btnsmt.onclick = function(){
		var preDate = new Date();
		var birthDate = new Date(document.getElementById("id1").value);
		var preYear = preDate.getFullYear();
		var preMonth = preDate.getMonth();
		var preDay = preDate.getDate();
		var birthYear = birthDate.getFullYear();
		var birthMonth = birthDate.getMonth();
		var birthDay = birthDate.getDate();
		var pass1 = document.getElementById("password1");
		var pass2 = document.getElementById("password2");
		if (pass1.value != pass2.value){
	     	alert("The passwords you enter do not match!");
	    	return false;       		
		}else if((birthYear>preYear-18)||(birthYear==preYear-18&&birthMonth>preMonth)||(birthYear==preYear-18&&birthMonth==preMonth&&birthDay>preDay)){
			alert("Only individuals 18 years of age or older on the day of registration are allowed to register!");
			return false;
		}
	}
	btnsign.onclick = function(){
		var actname = document.getElementById("actname").value;
		var pass = document.getElementById("password").value;
		if(actname == "" || actname == null){
			alert("Please enter your account name!");
			return false;
		}
		if(pass == "" || pass == null){
			alert("Please enter your password");
			return false;
		}
		location.href = "main.html";
		return true;
	}
}