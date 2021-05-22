var datas = "";
var ids = new Array;
var last_Type;
var html_Items = new Array(); //html tag; id
var style_Items = new Array(); //
var element_Items = new Array();
var grid_Divs = new Array();
var last_Id;
var style_Set_Id = "";
var css_String;
var items_Colors = new Array();
var last_List;
var try_Html = new Array();
var to_Save = {};
var backGround_Colors = [];
//Megjeleníti a media divet


function control_Replaced_Ids(try_Id){
  replaced = false;
  for (var i = 0; i < window.html_Items.length; i++){
    if (try_Id == window.html_Items[i][1]){
      replaced = true;
      break;
    }
  }
  if (try_Id == "body"){
    replaced = true;
  }
  return replaced;
}

function add_New_Data(){
if (document.getElementById("media").style.display == "block"){
    document.getElementById("media").style.display = "none";}
else{
  document.getElementById("media").style.display = "block";
  document.getElementById("type").value = "default";
  document.getElementById("id").value = "";
  document.getElementById("error_Message").innerHTML = "";
}
}
//Ellenőrzi, hogy az összes bemenet ki van-e töltve
function generate_Item(){
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  var next_Step = false;
  next_Array = new Array;
  for (var i = 0; i < window.ids.length; i++){
    if (document.getElementById(window.ids[i]).value != "" && document.getElementById(window.ids[i]).value != "-"){
      next_Array.push(true)
    }
    else{
      break;
    }
  }
  if (next_Array.length == window.ids.length){
    next_Step = true;
  }
  if (id == "" || type == "default" || next_Step == false){
    document.getElementById("error_Message").innerHTML = "Kérlek töltsd ki az összes mezőt!";
  }
  else{
    document.getElementById("error_Message").innerHTML = "";
    generate_This_Item();
  }
}

//Legenerálja a tageket és meghívja a segédfüggvényeket

function generate_This_Item(){
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  try {
  document.getElementById(id).style;
  id += Math.floor(Math.random()*100);
  alert("Ez az id már korábban szerepelt, ezért a rendszer megváltoztatta a beírt id-t arendszer megfelelő működéséhez a következődre: "+id);
  }
  catch(err) {
  }
  if (document.getElementById("work_Place").style.display != "block"){
    document.getElementById("work_Place").style.display = "block";
  }
  if (id == "body"){
    id += Math.floor(Math.random()*100);
  alert("Ez az id már korábban szerepelt, ezért a rendszer megváltoztatta a beírt id-t arendszer megfelelő működéséhez a következődre: "+id);
  }
  var this_Item;
  var html = "";
  var style = "";
  var between_Tags = ""
  var ma = new Array();
  var h_Tag_Type = "";
  var this_Items_To_Try;
  var random_Id = Math.floor(Math.random()*100);
  for (var i = 0; window.ids.length > i;i++){
    if (window.ids[i] == "placeholder" || window.ids[i] == "src" || window.ids[i] == "href" || window.ids[i] == "type" ||window.ids[i] == "cols" || window.ids[i] == "rows" || window.ids[i] == "width" || window.ids[i] == "height"){
      html += " "+window.ids[i]+ " = " +"\"" +document.getElementById(window.ids[i]).value+"\"";
    }
    if (window.ids[i] == "value"){
        ma.push([window.ids[i], document.getElementById(window.ids[i]).value]);
    }
    if (window.ids[i] == "text"){
      between_Tags += document.getElementById(window.ids[i]).value;
    }
    if (window.ids[i] == "h_Option"){
      h_Tag_Type = document.getElementById(window.ids[i]).value;
    }
  }
  if (type != "input" && type != "src"){
    this_Item = "<"+type+h_Tag_Type+" "+html+ " id = '"+ id +"'>"+between_Tags+"</"+type+h_Tag_Type+">";
    this_Items_To_Try =  "<"+type+h_Tag_Type+" "+html+ " id = '"+ random_Id +"'>"+between_Tags+"</"+type+h_Tag_Type+">";
  }
  else if(type == "input"){
    this_Item = "<input type = 'text' "+html+" id = '"+id+"'/>";
    this_Items_To_Try = "<input type = 'text' "+html+" id = '"+random_Id+"' />"
  }
  else if(type == "img"){
    this_Item = "<img "+html+" id = '"+id+"'/>"
    this_Items_To_Try = "<img "+html+" id = '"+random_Id+"'/>"
  }
  if (!this_Item == false){
    window.html_Items.push([this_Item, id]);
    window.try_Html.push([this_Items_To_Try, random_Id, id]);
  }
  else{
    document.getElementById("error_Message").innerHTML = "Hiba történt a generálás során, kérem próbálja meg újra!";
  }
  if (style){
    window.style_Items.push(style);
  }
  document.getElementById("work_Place").innerHTML = "";
  for (var i = 0;i < window.html_Items.length;i++){
    if (!window.html_Items[i] == false){
    document.querySelector("#work_Place").innerHTML += (add_Funtion_Div(window.html_Items[i][0], id));
  }
}
try_In();
run_Style();
  for (var i = 0; i < ma.length; i++){
    document.getElementById(id).value = ma[i][1];
  }
generate_String();
  for (i = 0; i < window.ids.length; i++){
    document.getElementById(window.ids[i]).value = "";
    }
    document.getElementById("id").value = "";
}

//Hozzáad egy random generált id-val rendelkező keret divet, amiben elhelyezkedik a a keretet eltütető gomb, a stílus gomb és a törlés gomb

function add_Funtion_Div(item, item_Id){
  var id = Math.random().toString(36).substring(7);
  var index;
  for (var i = 0; i < window.html_Items.length; i++){
    if (window.html_Items[i]){
    if(item == window.html_Items[i][0]){
      index = i;
      break;
    }
  }
  }
  var item = "<div id = '"+id+"' style = 'border: 3px solid black; margin-bottom: 2px;'>"+item+"<input type = 'button' onclick = 'delete_Item(\""+id+"\", "+index+")' value = 'Törlés' id = 'delete_Btn'><input type = 'button' onclick = 'display_Grid(\""+id+"\")' value = 'Keret'><input type = 'button' value = 'stílus beállítások' onclick = 'display_Css_Panel(\""+window.html_Items[i][1]+"\")'></div>"
  return item;
}

//Kitörli a bemenetként érkező id-val rendelkező divet.

function delete_Item(id, index){
  document.getElementById(id).remove();
  items_Id = window.html_Items[index][1];
  delete window.html_Items[index];
  delete window.try_Html[index];
  try_In();
  for (i = 0; i < window.style_Items.length;i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][2] == items_Id){
      delete window.style_Items[i];
      }
    }
  }
}

//Legenerálja a HTML kódot a (html_Code)-ba

function generate_String(){
  char_Code = document.getElementById("char_Code").value;
  title = "My Web Page";
  before = ["<!DOCTYPE html>", "<head>", "<meta charset = "+char_Code+">", "<title>"+title+"</title>", "</head>", "<body>"];
  after = ["</body>", "</html>"];
    document.getElementById("html_Code").innerHTML = "";
    for (var k = 0; k < before.length; k++){
      for (var i = 0; i < before[k].length; i++){
    document.getElementById("html_Code").innerHTML += before[k][i];
  }
  document.getElementById("html_Code").innerHTML += "<br />";
    }
    for (var i = 0; i < window.html_Items.length;i++){
    if (window.html_Items[i]){
      document.getElementById("html_Code").append(window.html_Items[i][0]);
      document.getElementById("html_Code").innerHTML += "<br />";
    }
  }
  for (var k = 0; k < after.length; k++){
    for (var i = 0; i <after[k].length;i++){
  document.getElementById("html_Code").innerHTML += after[k][i];
}
document.getElementById("html_Code").innerHTML += "<br />";
  }
}

//A bordert vagyis a keretet teszi láthatóvá

function display_Grid(id){
  if (document.getElementById(id).style.border != "hidden"){
  document.getElementById(id).style.border = "hidden";
  }
  else{
    document.getElementById(id).style.border = "3px solid black";
  }
}

//A css_Panel-t láthatóvá és láthatlanná teszi

function display_Css_Panel(id){
  if (document.getElementById("css_Panel").style.display === "block" && id == window.last_Id){
    document.getElementById("css_Panel").style.display = "none";
    window.style_Set_Id  = "";
  }
  else{
    document.getElementById("css_Panel").style.display ="block";
    document.getElementById("css_Panel").style.position = "absolute";
    pos = window.event;
    posX = pos.clientX;
    posY = pos.clientY;
    document.getElementById("css_Panel").style.top = posY+"px";
    document.getElementById("css_Panel").style.left  = posX+"px";
   }
  window.last_Id = id;
}

//Frissíti a stílust, minden új eleme hozzáadásakor

function run_Style(){
  if (window.style_Items){
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
      if (window.style_Items[i][0] == "color"){
      document.getElementById(window.style_Items[i][2]).style.color = window.style_Items[i][1];
    }
    else if(window.style_Items[i][0] == "background"){
      document.getElementById(window.style_Items[i][2]).style.background = window.style_Items[i][1];
    }
    else if(window.style_Items[i][0] == "border-radius"){
        document.getElementById(window.style_Items[i][2]).style.borderRadius =  window.style_Items[i][1];
      }
    else if(window.style_Items[i][0] == "border"){
      document.getElementById(window.style_Items[i][2]).style.border = window.style_Items[i][1];
    }
    else if (window.style_Items[i][0] == "margin"){
      document.getElementById(window.style_Items[i][2]).style.margin = window.style_Items[i][1];
    }
    else if (window.style_Items[i][0] == "padding"){
      document.getElementById(window.style_Items[i][2]).style.padding = window.style_Items[i][1];
    }
    else if(window.style_Items[i][0] == "font-size"){
      document.getElementById(window.style_Items[i][2]).style.fontSize = window.style_Items[i][1];
    }
  }
  }
}
}

//Beállítja a bemenetként érkező színt betűszínnek, a globális (window.last_Id) alapján

function set_Color(color){
  var change = false;
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][0] == "color" && window.style_Items[i][2] == window.last_Id){
      window.style_Items[i][1] = color;
      change = true;
      break;
    }
  }
    }
  if (change == false){
  window.style_Items.push(["color",color, window.last_Id]);
}
  document.getElementById(window.last_Id).style.color = color;
  set_Css();
}

//Beállítja a háttérszínt a bemenetként érkező színt

function set_Background_Color(color){
  var change = false;
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][0] == "background" && window.style_Items[i][2] == window.last_Id){
      window.style_Items[i][1] = color;
      change = true;
    }
    }
  }
  if (change == false){
  window.style_Items.push(["background",color, window.last_Id]);
}
  set_Css();
  document.getElementById(window.last_Id).style.background = color;
}

//Legenerálja a CSS kódot (#css_Code)

function set_Css(){
  document.getElementById("css_Code").innerHTML = "";
  for (i = 0; i < window.style_Items.length;i++){
    if (window.style_Items[i]){
      if (window.style_Items[i][2] != "body"){
    document.getElementById("css_Code").innerHTML += "#"+window.style_Items[i][2]+"{ "+window.style_Items[i][0]+":"+window.style_Items[i][1]+"; }"+"<br />";
      }
      else{
        document.getElementById("css_Code").innerHTML +=window.style_Items[i][2]+"{ "+window.style_Items[i][0]+":"+window.style_Items[i][1]+"; }"+"<br />";
      }
    }
  }
  try_In();
}

//Eltávolítja a bementként érkező id-val rendelkező html itemet

  function close_Item(item){
    document.getElementById(item).style.display = "none";
  }

//Saját háttérszín hozzáadásához hívja meg a függvényt

function set_Custom_Background(){
  set_Background_Color(document.getElementById("background_Color_Code").value);
}

//Saját szín hozzáadásához hívja meg a függvényt

function set_Custom_Color(){
  set_Color(document.getElementById("color_Code").value);
}

function control(id, data){
  var a = true;
  var item_Id = "";
    for (i = 0; i < window.style_Items.length;i++){
      if (window.style_Items[i]){
        if (id == window.style_Items[i][2] && window.style_Items[i][0] == data){
          a = false;
          item_Id = i;
          break;
        }
      }
    }
  return[a, item_Id];
}

//Beállítja a keret színét

function set_Border_Color(color){
  if(color != "none"){
    a = control(window.last_Id, "border");
    if (a[0] == false){
      window.style_Items[a[1]] = ["border","3px solid "+color, window.last_Id];
    }
    else{window.style_Items.push(["border","3px solid "+color, window.last_Id]);}
    document.getElementById(window.last_Id).style.border = "3px solid "+color;
}
  else{
    a = control(window.last_Id, "border");
    if (a[0] == false){
      window.style_Items[a[1]] = ["border","hidden", window.last_Id];
    }
    else{window.style_Items.push(["border","hidden", window.last_Id]);}
    document.getElementById(window.last_Id).style.border = "hidden";
}
set_Css();
}

function set_Custom_Border(){
  set_Border_Color(document.getElementById("border_Code").value);
}

function set_Font_Size(){
  size = document.getElementById("font_Size").value;
  a = control(window.last_Id, "font-size");
  if (a[0] == false){
    window.style_Items[a[1]] = ["font-size", size+"px", window.last_Id];
  }
  else{
    window.style_Items.push(["font-size", size+"px", window.last_Id])
  }
  document.getElementById(window.last_Id).style.fontSize = size+"px";set_Css();
}

//Beállítja a keretet

function set_Border_Radius(){
  radius = document.getElementById("border_Radius").value;
  document.getElementById(window.last_Id).style.borderRadius = radius+"px";
  a = control(window.last_Id, "border-radius");
  if (a[0] == false){
    window.style_Items[a[1]] = ["border-radius",radius+"px", window.last_Id];
}else{
  window.style_Items.push(["border-radius",radius+"px", window.last_Id]);
}
  set_Css();
}

//Beállítja a külső és belső térközt, ha megnyomjuk a gombot

function set_Margin_And_Padding(){
  var margin = document.getElementById("set_margin").value;
  var padding = document.getElementById("set_Padding").value;
  if (!padding){
    padding = 0;
  }
  if (!margin){
    margin = 0;
  }
  document.getElementById(window.last_Id).style.margin = margin+"px";
  document.getElementById(window.last_Id).style.padding = padding+"px";
  a = control(window.last_Id, "padding");
  b = control(window.last_Id, "margin");
  if (a[0] == false){
    window.style_Items[a[1]] = ["padding", padding+"px", window.last_Id];
  }
  else{
  window.style_Items.push(["padding", padding+"px", window.last_Id]);
  }
  if (b[0] == false){
    window.style_Items[b[1]] = ["margin", margin+"px",window.last_Id];
  }
  else{
  window.style_Items.push(["margin", margin+"px",window.last_Id]);
  }
  set_Css();
}

function ell_Work_Place_Div(){
  var a = new Array;
  for (var i = 0; i < window.html_Items.length; i++){
    if (!window.html_Items[i]){
      a.push(false);
    }
  if (a.length == window.html_Items.length || window.html_Items.length == 0){
    document.getElementById("work_Place").style.display = "none";
  }
  }
}

function generate_Random_Id(){
  var id = Math.floor(Math.random()*100);
  return id;
}

function try_In(){
    for(var i = 0; i < window.style_Items.length; i++){
      if(window.style_Items[i]){
      if (window.style_Items[i][2] == "body"){
        document.getElementById("try_Your_Self").style.background = window.style_Items[i][1];
      }
    }
    }
  html_In_String = "";
  for (var i = 0; i < window.try_Html.length; i++){
    if (window.try_Html[i]){
        html_In_String += window.try_Html[i][0];
      }
  }
  document.getElementById("try_Your_Self").innerHTML = html_In_String;
  for (var i = 0; i < window.try_Html.length; i++){
    for (var k = 0; k < window.style_Items.length; k++){
      if (window.try_Html[i]){
        if (window.style_Items[k][2] == "body"){
          document.getElementById("try_Your_Self").style.background = window.style_Items[k][1];
        }
      if(window.try_Html[i][2] == window.style_Items[k][2]){
        if (window.style_Items[k]){
        a = window.style_Items[k][0];
        if(a == "color"){
          document.getElementById(window.try_Html[i][1]).style.color = window.style_Items[k][1];
        }
        if (a == "background"){
          document.getElementById(window.try_Html[i][1]).style.background = window.style_Items[k][1];
        }
        if (a == "margin"){
          document.getElementById(window.try_Html[i][1]).style.margin = window.style_Items[k][1];
        }
        if (a == "border"){
          document.getElementById(window.try_Html[i][1]).style.border = window.style_Items[k][1];
        }
        if (a == "border-radius"){
          document.getElementById(window.try_Html[i][1]).style.borderRadius = window.style_Items[k][1];
        }
        if (a == "padding"){
          document.getElementById(window.try_Html[i][1]).style.padding = window.style_Items[k][1];
        }
        if (a == "font-size"){
          document.getElementById(window.try_Html[i][1]).style.fontSize = window.style_Items[k][1];
        }
      }
      }
    }
    }
  }
  }

function show_Try(){
  if (document.getElementById("try_Your_Self").style.opacity == 0 || document.getElementById("try_Your_Self").style.opacity == "0"){
  document.getElementById("try_Your_Self").style.opacity = "1";
}
else {
  document.getElementById("try_Your_Self").style.opacity = "0";
}
  }

//A hozzáadnadó eleme kiválasztásakor frissít

setInterval(function() {
  ell = false;
  if (document.getElementById("media").style.display == "block"){
  data = document.getElementById("type").value;
  if (data != window.last_Type){
  window.ids = [];
  document.getElementById("item_Datas").innerHTML = "";
  ids_ = [["input",[["placeholder:", "placeholder"]]], ["p",[["Szöveg:", "text"]]], ["button", [["Felirat:", "text"]]], ["h",[["Szöveg:", "text"]]], ["textarea",[["Szélesség:", "cols"],["Magasság:", "rows"]]], ["img", [["Elérési útvonal", "src"], ["Szélesség", "width"], ["Magasság", "height"]]]];
  for (var i = 0;i < ids_.length; i++){
    if (data == ids_[i][0]){
      for (var k = 0; k < ids_[i][1].length; k++){
        if (ids_[i][1][k][0] != "" || ids_[i][1] != "-"){
          window.ids.push(ids_[i][1][k][1]);
        document.getElementById("item_Datas").innerHTML += "<br/>"+ids_[i][1][k][0]+" <input type = 'text' id = '"+ids_[i][1][k][1]+"'>";
        if (ids_[i][0] == "h"){
          document.getElementById("item_Datas").innerHTML += "<br /> Nagysága - a betű mérete a fordítottan arányos a nagysággal (Ajánlott csak a főcímet h1-es taggel): <select id = 'h_Option'><option value = '-'>-</option><option value = '1'>1</option><option value = '2'>2</option><option value = '3'>3</option><option value = '4'>4</option><option value = '5'>5</option><option value = '6'>6</option><select>"
          window.ids.push("h_Option");
        }
        ell = true;
      }
      }
    }
  }
if (ell == false){
  window.ids = [];
}
}
window.last_Type = data;
}
ell_Work_Place_Div();
}, 500);

function send_Data(data, url){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.readyState == 4 && req.status == 200){
      if (url == "new_Html_File"){
        send_Css();
      }
      if (req.responseText && url == "add_Css_File"){
        element_Link(req.responseText);
        
      }
    }
  }
  req.open("POST", url);
  req.send(data);
}

function element_Link(link){
  document.getElementById("share_Bar").style.display = "block";
  document.getElementById("share_Icon").style.display = "block";
  document.getElementById("link_Pos").value = link;
}

function send_Css(){
  var css = "";
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
      if (window.style_Items[i][2] != "body"){
      css += "\n#"+window.style_Items[i][2]+"{"+window.style_Items[i][0]+":"+window.style_Items[i][1]+";}";
      }
      else if (window.style_Items[i][2] == "body"){
      css += "\n"+window.style_Items[i][2]+"{"+window.style_Items[i][0]+":"+window.style_Items[i][1]+";}";
      }
    }
  }
  if (!css){
    css = "none";
  }
  send_Data(css, "add_Css_File");
}

function save(){
  var html = "<body>";
  for (var i = 0 ; i < window.html_Items.length; i++){
    if (window.html_Items[i]){
    html += window.html_Items[i][0];
    }
  }
  html += "</body>";
  send_Data(html, "new_Html_File");
}

function show_Share_Bar(){
  bar_Status = document.getElementById("share_Bar").style.display;
  if (bar_Status == "none"){
    document.getElementById("share_Bar").style.display = "block";
  }
  else{
    document.getElementById("share_Bar").style.display = "none";
  }
}

function copy(id){
  text = document.getElementById(id);
  text.select();
  text.setSelectionRange(0, 99999)
  document.execCommand("copy");
}

function add_Color(){
  var id = window.backGround_Colors.length;
  window.backGround_Colors.push(window.backGround_Colors.length);
  document.getElementById("colors").innerHTML += '<input type = "color" id = "'+id+'">'
}

function delete_The_Last_Color(){
  if (window.backGround_Colors.length > 1){
  var i = window.backGround_Colors.length+1;
  var id;
  while (id == "undefined" || id == undefined){
    i--;
    id = String(window.backGround_Colors[i]);
  }
  document.getElementById(id).remove();
  delete window.backGround_Colors[i];
  }
}

function set_BackGround(){
  var index = "none";
  if (window.backGround_Colors.length >= 1){
    for (var i = 0; i < window.style_Items.length; i++){
      if (window.style_Items[i][2] == "body"){
        index = i;
      }
    }
    if (window.backGround_Colors.length == 1){
      if (index == "none"){
      window.style_Items.push(["background", document.getElementById(window.backGround_Colors[0]).value,"body"]);
      }
      else{
        window.style_Items[index][1] = document.getElementById(window.backGround_Colors[0]).value;
      }
    }
    else if (window.backGround_Colors.length > 1){
      var str_Color = "";
      var number_Of_Colors = 0;
      for (var i = 0; i < window.backGround_Colors.length; i++){
        if (window.backGround_Colors[i] && str_Color != ""){
          str_Color += ","+document.getElementById(window.backGround_Colors[i]).value;
          number_Of_Colors += 1
        }
        else if (str_Color == "" && window.backGround_Colors[i] || window.backGround_Colors[i] == 0){
          str_Color += document.getElementById(window.backGround_Colors[i]).value;
          number_Of_Colors += 1
        }
      }
      if (index == "none" && number_Of_Colors > 1){
      window.style_Items.push(["background-image", "linear-gradient(to right, "+str_Color+")","body"]);
      }
      else if(number_Of_Colors > 1){
        window.style_Items[index][1] = "linear-gradient(to right, "+str_Color+")";
      }
      else if (index == "none"){
        window.style_Items.push(["background", str_Color,"body"]);
      }
      else if (index != "none"){
        window.style_Items[index][1] = str_Color;
      }
    }
  }
  set_Css();
  try_In();
}