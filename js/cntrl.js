
window.onload = function(){

var el = document.getElementById('main');
var sortable = new Sortable(el, {
    
    animation: 150, 
	easing: "cubic-bezier(1, 0, 0, 1)"

});

}


//Handlers

$(".action-btn").on("click", function(){
 

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
        
        
    }, 
    

deleteNote: function(self){
        
        
        Note.delete($(self).parent().attr("id"));
        uiCntrl.deleteNote($(self).parent());
        
    },
    

update: function(id, title, desc){
    
    Note.update({"id":id, "title":title, "desc":desc });
    uiCntrl.appendNote(id, title, desc);
    
    
},
    

retrieve: function(id){
        
       return Note.retrieve(id); 
        
    }
    
    
}        
       


