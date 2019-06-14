
var arr= [];





var uiCntrl = {

    
loadNote: function(){
    
    const data = {...localStorage}; 
    for(var prop in data)
        {
        var obj = JSON.parse(data[prop]);
        console.log(obj);
        uiCntrl.appendNote(prop, obj.title, obj.desc, 1, obj.color);
        }
    
} ,
    
createNote : function(id){
    
//Drawing ui elements
var div  = document.createElement("div");
$(div).addClass("note");
$(div).attr('id', id);
    

var title = document.createElement("input");
$(title).addClass("title");
var desc = document.createElement("textarea");
$(desc).addClass("desc");
var add = document.createElement('button');
$(add).addClass("add-btn");  
$(add).html("<ion-icon class='add-btn-icon' name='add'></ion-icon>");   
  
//Appending ui elements
$(div).append(title);
$(div).append(desc);
$(div).append(add);
$("#main").append(div);
    
 //dragElement(div);
    
    
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
    

     events.addNote($(this).parent().attr("id"), $('#'+$(this).parent().attr("id")+ ' .title').val(),[$('#'+$(this).parent().attr("id")+ ' .desc').val()] );
     
     });

    
},
  
    
appendNote : function(id,  title, desc, option, bgColor){
   
    var c;
    
    if(bgColor === undefined){
        console.log("s");
        c = "#ffffff";
    }
    else
        c= bgColor;

console.log(id);
    var elem;
    
if(option){
    
    elem = document.createElement("div"); 
    $(elem).attr("id", id);
    $(elem).addClass("note");
    elem.style.backgroundColor = c;

}
    
else
    
    elem = $("#" + id);
    
    
$(elem).empty(); 
var draggable = document.createElement("div");
draggable.innerHTML= title;
$(draggable).addClass("divhead");
$(draggable).attr('id', id + 'header');
    

var elemDesc = document.createElement("p");
elemDesc.innerHTML = desc;
var updateBtn = document.createElement("button");
$(updateBtn).addClass('btn');
updateBtn.innerHTML = "<ion-icon name='create'></ion-icon>";
var deleteBtn  = document.createElement("button");
$(deleteBtn).addClass('btn');
deleteBtn.innerHTML = "<ion-icon name='trash'></ion-icon>";
var colorBtn = document.createElement("button");
$(colorBtn).addClass('btn');
colorBtn.innerHTML = "<ion-icon name='color-palette'></ion-icon>";

    
$(elem).append(draggable);
$(elem).append(elemDesc);
$(elem).append(updateBtn); 
$(elem).append(deleteBtn);
$(elem).append(colorBtn);
    
$(updateBtn).on('click', function(){uiCntrl.update($(this).parent().attr("id"))});    
$(deleteBtn).on("click", function(){events.deleteNote(this)});

 var setColor = function(code){
       events.colorUpdate(id, title, desc, code);
    }
 
    
$(colorBtn).on("click", function(){


color(this, document.getElementById(id), undefined , setColor);   

});
    
    
if(option)
$("#main").append(elem); 
  
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
    
   

    $("#" + id).html("<input class=title  value = '"+events.retrieve(id).title+"'  /> <textarea class=desc> "+events.retrieve(id).desc[0]+"  </textarea>"); 
        
   $("#" + id).append(save);

        
$("#"+id+" .desc").keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){  events.update(id, $("#" + id + " .title").val(), [$("#" + id + " .desc").val()] )    }});
$(save).on("click", function(){events.update(id, $("#" + id + " .title").val(), [$("#" + id + " .desc").val()] )});


    
}
    
    
}




