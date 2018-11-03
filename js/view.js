
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
var listBtn  = document.createElement("button");   
$(listBtn).addClass('list-btn');
listBtn.innerHTML = "<i class='fas fa-list-ul'></i>";

    //Appending ui elements
$(div).append(title);
$(div).append(desc);
    $(div).append(listBtn);
$(div).append(add);
$("#main").append(div);
    
    
    
  //event handlers  
$('#' + id + ' .desc').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
    events.addNote($(this).parent().attr("id"), $('#'+$(this).parent().attr("id")+ ' .title').val(),[$('#'+$(this).parent().attr("id")+ ' .desc').val()]);
}});

    


$(listBtn).on("click", function(){
            uiCntrl.list(id);
  });
    


$(add).on("click", function(){
         
        
     events.addNote($(this).parent().attr("id"), $('#'+$(this).parent().attr("id")+ ' .title').val(),[$('#'+$(this).parent().attr("id")+ ' .desc').val()] );
     
     });

    
},
  
appendNote : function(id,  title, desc){
var elem = $("#" + id);
$(elem).empty();
var head = document.createElement("h2");
$(head).addClass("title");
head.innerHTML= title;
    
    
        
if(desc.length<2){    
var body = document.createElement("p");
body.innerHTML = desc[0];
$(body).addClass("desc2");
}
        
else {
            
var body = document.createElement("ul");
for(var i =0; i<desc.length; i++){
var li = document.createElement('li');
li.innerHTML = desc[i];
$(body).append(li);           
}
    $(body).addClass("desc2");
                    
}
    

var colorBtn = document.createElement("button");
$(colorBtn).addClass('color-btn');

var picker = new Picker(colorBtn);

    
var updateBtn = document.createElement("button");
$(updateBtn).addClass('update-btn');
updateBtn.innerHTML = "<i class='fas fa-edit'></i>";

    
        
var deleteBtn  = document.createElement("button");
$(deleteBtn).addClass('delete-btn');
deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    

    
    
$(elem).append(head);
$(elem).append(body);
$(elem).append(colorBtn); 
$(elem).append(updateBtn); 
$(elem).append(deleteBtn);

    
picker.ondone = function(color){
        
        console.log(color.rgbaString);   
     }

$(updateBtn).on('click', function(){uiCntrl.update($(this).parent().attr("id"))});    
$(deleteBtn).on("click", function(){events.deleteNote(this)});



    
    
}
,
    
deleteNote : function(elem){


       $(elem).remove();
   
   
   } ,
    
    
list: function(id){
    arr = [];
    var div = $('#'+ id);
    console.log(id);
    $(div).empty();
   var title = document.createElement("input");
    $(title).addClass("title");
    var ul = document.createElement('ul');
    $(div).append(title);
    $(div).append(ul);
    $(div).append("<button class=addlist-btn>Add list</button>");
    $(ul).addClass('list');
    func(ul, id);
        

        
$('.addlist-btn').on("click", function(){
    
    events.addNote(id, $("#" + $(div).attr('id') + " .title").val(), arr)});        
    
    
    },

    
    
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







//redraw UI in listing
function func(ul ,id){    
var li = document.createElement('li');
var linput = document.createElement('input');
$(linput).addClass('listInput');
$(ul).append(li);
$(li).append(linput);       
$('#' + id + ' .listInput').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
arr.push($('#' + id + ' .listInput').val());
$('#' + id + ' .listInput').replaceWith("<h4>"+ $('#' + id + ' .listInput').val() +"</h4>");

    func(ul, id);
}});
    }
        





