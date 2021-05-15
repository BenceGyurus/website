function query_Datas(file_Name){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200){
    document.getElementById("datas").innerHTML = req.responseText;
    if (file_Name == "info.html"){
      query_number_Of_The_Files();
    }
    }
    else if (req.readyState == 4 && req.status == 404){
      document.getElementById("datas").innerHTML = "404 Error";
    }
  }
  req.open("GET", file_Name);

  req.send();
  list = [["welcome.html", "Kezdőlap"], ["operation.html", "Motor"], ["info.html", "Információ"]]
  title = ""
  for (i = 0; i < list.length; i++){
      if (file_Name == list[i][0]){
        title = list[i][1];
      }
  }
  document.querySelector(".header").innerHTML = "<h1 id = 'title'>"+title+"</h1>"
}

query_Datas("welcome.html");

function query_number_Of_The_Files(file_Name){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200){
    document.getElementById("number").innerHTML = req.responseText;
  }
    else if (req.readyState == 4 && req.status == 404){
      document.getElementById("number").innerHTML = "Error";
    }
  }
  req.open("GET", "number_Of_Files");

  req.send();
  }
