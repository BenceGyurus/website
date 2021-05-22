var last_Width = 0;

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

setInterval(function(){
if (window.innerWidth < 600 && window.last_Width != window.innerWidth){
    nav_Bar();
    document.querySelector(".nav_Bar").style.width = "50%";
}
if (window.innerWidth > 600 && window.last_Width != window.innerWidth){
  nav_Bar();
    window.click = false;
    document.querySelector(".nav_Bar").style.width = "400px";

}
window.last_Width = window.innerWidth},10);

nav_Bar();
