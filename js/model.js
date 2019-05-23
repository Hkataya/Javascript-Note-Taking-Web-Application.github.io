var Note = function(slot){
   this.id = slot.id;
    this.title = slot.title;
    this.desc = slot.desc;
    

}

Note.instances = [];


Note.create = function(slot){

var note  = new Note(slot);
      
    Note.instances.push(note);
    


}


Note.delete = function(id){

for(var i =0; i<Note.instances.length; i++){
if(Note.instances[i].id == id){
    Note.instances.splice(i, 1);
 console.log(id + "in the array");   
}
}
    

}


Note.retrieve = function(id){
    
    
    for(var i =0; i<Note.instances.length; i++){
if(Note.instances[i].id == id){
return Note.instances[i];   
}
        else
            console.log('not found');
}
    
}


Note.update = function(slot){
    
  for(var i =0; i<Note.instances.length; i++){
if(Note.instances[i].id == slot.id)
    {
       Note.instances[i].title = slot.title;
        Note.instances[i].desc = slot.desc;
        
    }
    
    

}

}








