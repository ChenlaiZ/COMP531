var button=document.getElementById("button");
var re=document.getElementById("return");
var display_holder = "Chenlai Zhang";
var email_holder = "Chenlai.Zhang@rice.edu";
var phone_holder = "713-380-1234";
var zip_holder = "77030";

button.onclick = function(){
    //get the value in the input fields
    var displayname = document.getElementById("DisplayName").value;
    var emailaddress = document.getElementById("Email").value;
    var phonenumber = document.getElementById("Phone").value;
    var zipcode = document.getElementById("Zipcode").value;
    var pass1 = document.getElementById("password1").value;  
    var pass2 = document.getElementById("password2").value; 
    
    //define the desired patterns of each field
    var ptn_name = /^[A-Za-z]+$/;
    var ptn_email = /\S+@\S.\S+/;
    var ptn_phone = /([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$/;
    var ptn_zip = /[0-9]{5}$/;
    var ptn_ps1 = /^[A-Za-z0-9]+$/;
    var ptn_ps2 = /^[A-Za-z0-9]+$/;

    //if any field is not empty, test the pattern, and update it
    if(displayname!=""){
        if(ptn_name.test(displayname)==false){
            alert("Display name must consists of characters!");
            return false;
        }
        display_holder = displayname;
    }

    if(emailaddress!=""){
        if(ptn_email.test(emailaddress)==false){
            alert("Email address must be in pattern of x@x.x");
            return false;
        }
        email_holder = emailaddress;
    }
    if(phonenumber!=""){
        if(ptn_phone.test(phonenumber)==false){
            alert("Phone number must be in pattern of xxx-xxx-xxxx");
            return false;
        }
        phone_holder = phonenumber;
    }
    if(zipcode!=""){
        if(ptn_zip.test(zipcode)==false){
            alert("Zipcode must be in pattern of xxxxx");
            return false;
        }
        zip_holder = zipcode;
    }
    if(pass1!=""){
        if(ptn_ps1.test(pass1)==false){
            alert("Password must consists of only characters and digits");
            return false;
        }
    }  
    if(pass2!=""){
        if(ptn_ps2.test(pass2)==false){
            alert("Password confirmation must consists of only characters and digits");
            return false;
        }
    }          	

    //check whether the two passwords are the same
    if (pass1!="" && pass1 != pass2){
        document.getElementById("password1").value = "";
        document.getElementById("password2").value = "";
        alert("The passwords you enter do not match!");
        return false;       		
    } else {
        //empty all the input fields, alert the changes, and update the information
        document.getElementById("DisplayName").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("Phone").value = "";
        document.getElementById("Zipcode").value = "";
        document.getElementById("password1").value = "";
        document.getElementById("password2").value = "";
        document.getElementById("name_demo").innerText = display_holder;
        document.getElementById("email_demo").innerText = email_holder; 
        document.getElementById("phone_demo").innerText = phone_holder; 
        document.getElementById("zip_demo").innerText = zip_holder;
        return true;
    } 
} 

re.onclick = function(){
    location.href = "main.html";
} 