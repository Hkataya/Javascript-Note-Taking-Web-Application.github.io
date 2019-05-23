
   
var API_KEY = '7873892-36c57956e22b44e97867783f8';


 var grid;
  function init() {
    grid = new Minigrid({
      container: '.cards',
      item: '.card',
      gutter: 12
    });
    grid.mount();
  }
  
  // mount
  function update() {
    grid.mount();
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('resize', update);



//Handlers

$(".action-btn").on("click", function(){
 
    events.generate();  
    
    });


$(window).on("load", function(){
    
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('landscape');
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    {
    
        var index = Math.floor(Math.random() * parseInt(data.hits.length));
        console.log(index);
        uiCntrl.backgroundImage(data.hits[index].largeImageURL);
    
    }
        else
    console.log('No hits');
});

    
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
       


