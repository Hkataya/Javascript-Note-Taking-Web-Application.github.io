(function(global){
 
    const defaultArr = ['9984D4', 'C9E3AC', 'E8D6CB', 'BFD7EA', 'D4EAC8', 'D0ADA7'];
   var clrArray;

//Default function that is being called
var color = function(selector, elem,colors, func){
            
 popup(selector,elem,colors, func);

    
}


//creates inner division 
function popup( selector, elem, colors, func){
    

    
if(typeof colors !== "undefined"){
     clrArray = colors;
}
    else{
clrArray = defaultArr;
    }
    
    
var wrapper = document.createElement("div");
var select = selector;
    
select.append(wrapper);
content(wrapper);

//selector settings
select.style.pointerEvents ="none";
select.style.position = "relative";
    
//wrapper styling

wrapper.style.width = "140px";
wrapper.style.position = "absolute";
wrapper.style.bottom = "110%";
wrapper.style.left = "50%";
wrapper.style.marginLeft = "-80px";

var colorStlye = document.querySelectorAll(".color");
    


for(var i=0; i<colorStlye.length; i++)
    
    colorStlye[i].addEventListener("click", function(event){    

    event.stopImmediatePropagation();
    
        if(typeof elem !== "undefined")
    elem.style.backgroundColor = "#" + this.id;
        
        else
    select.style.backgroundColor = "#" + this.id;
        
    wrapper.remove();
    select.style.pointerEvents = "auto";
        func("#" + this.id);
});
    
}
    
    
 //content of the inner Division   
function content(wrapper){
    
for(var i = 0; i<clrArray.length; i++){
        
var dv = document.createElement("div");
wrapper.append(dv);
dv.style.backgroundColor = "#" + clrArray[i];
dv.style.borderRadius = "90px";
wrapper.style.borderRadius = "3px";
wrapper.style.pointerEvents ="none";
dv.style.display = "inline-block";
dv.style.width = "40px";
dv.style.height = "40px";
dv.id = clrArray[i];
dv.setAttribute("class", "color");
dv.style.pointerEvents = "all";
wrapper.style.backgroundColor = '#EEEEEE';
    }
    
}
  
    
global.color = color;
    
}(window));