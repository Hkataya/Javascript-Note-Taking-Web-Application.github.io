
window.onload = function(){

  console.log(localStorage.length);
    
if(localStorage.length == 0)
        document.getElementsByClassName("inst")[0].style.display = "block";
    else
        document.getElementsByClassName("inst")[0].style.display = "none";
    
    var el = document.getElementById('main');

var sortable = new Sortable(el, {
    
    animation: 150, 
	easing: "cubic-bezier(1, 0, 0, 1)"

});

    
uiCntrl.loadNote();  

}


//Handlers

$(".action-btn").on("click", function(){
    
 document.getElementsByClassName("inst")[0].style.display = "none";

    events.generate();  
    
    });





//Utility Functions


function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
    }
        return randomstring;
	}


var events = {
    
    
generate: function(){
   
uiCntrl.createNote(randomString());
    
    
},
    
    
addNote: function(id, title, desc){


Note.create({"id":id, "title":title, "desc":desc});  
uiCntrl.appendNote(id, $('#'+id + ' .title').val(), desc);
localStorage.setItem(id,JSON.stringify({"title":title, "desc":desc, "color": "white"}));
    
    }, 
    

deleteNote: function(self){
        
        
        Note.delete($(self).parent().attr("id"));
        uiCntrl.deleteNote($(self).parent());
         localStorage.removeItem($(self).parent().attr("id"));
        
    },
    

update: function(id, title, desc){
    
    Note.update({"id":id, "title":title, "desc":desc });
    uiCntrl.appendNote(id, title, desc, 0, document.getElementById(id).style.backgroundColor);
    localStorage.removeItem(id);
    localStorage.setItem(id,JSON.stringify({"title":title, "desc":desc, "color":document.getElementById(id).style.backgroundColor}));
    
},

colorUpdate : function(id, title, desc, color){

     localStorage.setItem(id,JSON.stringify({"title":title, "desc":desc, "color":color}));
    
}
    ,

retrieve: function(id){
        
       return JSON.parse(Note.retrieve(id)); 
        
    }
    
    
    
}        
       


