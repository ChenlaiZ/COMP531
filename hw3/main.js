window.onload = function() {
//get the button items
	var loginBtn = document.getElementById("login");
  var logoutBtn = document.getElementById("logout");
  var post = document.getElementById("post");
  var postBtn = document.getElementById("postbtn");
  var headline = document.getElementById("headline");
  var updateBtn = document.getElementById("update");
  var hdlupdate = document.getElementById("hdlupdate");
    postBtn.onclick = function() {
      post.value = "";
    }
    updateBtn.onclick = function() {
      headline.innerText = hdlupdate.value;
    }
  	loginBtn.onclick = function() {
  		location.href = "profile.html";
  	}
    logoutBtn.onclick = function() {
      location.href = "index.html";
    }
}