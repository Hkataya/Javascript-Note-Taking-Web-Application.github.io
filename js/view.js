
var arr= [];


$(".action-btn").on("click", function(){
 
    events.generate(); 
    });




var uiCntrl = {

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
add.innerHTML = "+";
    
    
//Appending ui elements
$(div).append(title);
$(div).append(desc);
$(div).append(add);
$("#main").append(div);
    
    
    
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
  
    
appendNote : function(id,  title, desc){
var elem = $("#" + id);
$(elem).empty();     

    $(elem).html("<h3>"+ title +"</h3> <p>"+desc+"</p>");


    
var updateBtn = document.createElement("button");
$(updateBtn).addClass('update-btn');
updateBtn.innerHTML = "<i class='fas fa-edit'></i>";
  
var deleteBtn  = document.createElement("button");
$(deleteBtn).addClass('delete-btn');
deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

    

$(elem).append(updateBtn); 
$(elem).append(deleteBtn);
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

    
}
    

      
}







        





