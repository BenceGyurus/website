var click = false

function nav_Bar(){
  if (document.querySelector(".nav_Bar").style.display == "none"){
    if (window.innerWidth > 400){
      document.querySelector(".nav_Bar").style.float = "left";
  }
  document.querySelector(".nav_Bar").style.display = "block";
  }
  else{
    document.querySelector(".nav_Bar").style.display = "none";
    window.click = true;
  }
}
if (window.innerWidth < 400){
  nav_Bar();
}


setInterval(function(){console.log()
if (window.innerWidth < 400 && window.click == false){
  if (document.querySelector(".nav_Bar").style.display != "none"){
    nav_Bar();
    document.querySelector(".nav_Bar li").style.float = "none";
}
if (window.innerWidth > 400){
  window.click = false;
  if (document.querySelector(".nav_Bar").style.display == "none"){
    document.querySelector(".nav_Bar li").style.float = "left";
    nav_Bar();
  }
}
}},10);
