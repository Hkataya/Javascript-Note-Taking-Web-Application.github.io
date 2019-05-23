
var arr= [];





var uiCntrl = {

createNote : function(id){
    
//Drawing ui elements
var div  = document.createElement("div");
$(div).addClass("note");
$(div).attr('id', id);

var draggable = document.createElement("div");
draggable.innerHTML= "Click here to move";
$(draggable).addClass("divhead");
$(draggable).attr('id', id + 'header');

var title = document.createElement("input");
$(title).addClass("title");
var desc = document.createElement("textarea");
$(desc).addClass("desc");
var add = document.createElement('button');
$(add).addClass("add-btn");  
$(add).html("<ion-icon class='add-btn-icon' name='add'></ion-icon>");
    
//Appending ui elements
$(div).append(draggable);
$(div).append(title);
$(div).append(desc);
$(div).append(add);
$("#main").append(div);

 dragElement(div);
    
    
  //event handlers  

$('#' + id + ' .title').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
   
    desc.focus();
    
}});


    
    
$('#' + id + ' .desc').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
    events.addNote($(this).parent().attr("id"), $('#'+$(this).parent().attr("id")+ ' .title').val(),[$('#'+$(this).parent().attr("id")+ ' .desc').val()]);
}});

    
$(add).on("click", function(){
    
    
// height: calc(100% - 50px);
   //$("#" + $(this).parent().attr("id")).css({ 'margin-top': '-20px'});
     events.addNote($(this).parent().attr("id"), $('#'+$(this).parent().attr("id")+ ' .title').val(),[$('#'+$(this).parent().attr("id")+ ' .desc').val()] );
     
     });

    
},
  
    
appendNote : function(id,  title, desc){

var elem = $("#" + id);

$(elem).empty(); 

//here
var draggable = document.createElement("div");
draggable.innerHTML= "Click here to move";
$(draggable).addClass("divhead");
$(draggable).attr('id', id + 'header');

    
var elemTitle = document.createElement("h3");
elemTitle.innerHTML = title;

var elemDesc = document.createElement("p");
elemDesc.innerHTML = desc;
    
var updateBtn = document.createElement("button");
$(updateBtn).addClass('update-btn');
updateBtn.innerHTML = "<ion-icon name='create'></ion-icon>";
  
var deleteBtn  = document.createElement("button");
$(deleteBtn).addClass('delete-btn');
deleteBtn.innerHTML = "<ion-icon name='trash'></ion-icon>";


$(elem).append(draggable);
$(elem).append(elemTitle);
$(elem).append(elemDesc);
$(elem).append(updateBtn); 
$(elem).append(deleteBtn);

dragElement(document.getElementById(id));
    
$(updateBtn).on('click', function(){uiCntrl.update($(this).parent().attr("id"))});    
$(deleteBtn).on("click", function(){events.deleteNote(this)});
}
    
,
    
deleteNote : function(elem){


       $(elem).remove();
   
   
   } ,
     
    
update: function(id){
    
    var innerArr = [];   
    var save = document.createElement("button");
    save.innerHTML = "save";

    $("#" + id).empty();
   
if(events.retrieve(id).desc.length>1){
$("#" + id).append("<input  class=title value = "+events.retrieve(id).title+"  />");
for(var i =0; i<events.retrieve(id).desc.length; i++){

$("#" + id).append("<input class=listItem   value = "+events.retrieve(id).desc[i]+"  />"); 
}
        
        $("#" + id).append(save);
        $(save).on("click", function(){
        $("#" + id + " .listItem").each(function(i, obj){
        innerArr.push($(obj).val());
            
        });  
        events.update(id, $("#" + id + " .title").val(), innerArr)});
    }
    
        
    else{
    $("#" + id).html("<input class=title  value = '"+events.retrieve(id).title+"'  /> <textarea class=desc> "+events.retrieve(id).desc[0]+"  </textarea>"); 
        
   $("#" + id).append(save);

        
$("#"+id+" .desc").keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){  events.update(id, $("#" + id + " .title").val(), [$("#" + id + " .desc").val()] )    }});
$(save).on("click", function(){events.update(id, $("#" + id + " .title").val(), [$("#" + id + " .desc").val()] )});
    }

    
},


backgroundImage: function(url){

$('body').css({'background-image':'url('+url+')', 'background-size':'cover'} );
    
}

      
  
    
    
}


function dragElement(elmnt) {
    
    console.log(elmnt.id);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
                  
console.log("ss");
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } 

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

        





