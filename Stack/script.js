//canvas initialization
let canvas= document.getElementById("paint");
let ctx=canvas.getContext("2d");
canvas.setAttribute('width' , "1000px");
canvas.setAttribute('height' , "700px");


//Class  Definition of Stack and Node
class Node{
    constructor(){
        this.data = null;
        this.next = null;
    }
};
class stack{    
    constructor(){
        this.top = new Node();

    }

    gettop(){
        return this.top;
    }

    getData(i){
        k= s1.size();
        i=k-i;
        j=1;
        
        var temp= s1.gettop();
        while(j<=i)
          {  temp = temp.next; j++ } 
    
        return temp.data;


    }

    updatePushDisplay(){
        k = this.size();
        console.log(k);
        let c = document.getElementById(k);
        
        c.style.backgroundColor="red";
        /*
        console.log(c.style);
        c.addEventListener('click' , function hover(e){
            if(e.target.style.backgroundColor === "red"){
                imgData = s1.getData(e.target.id);
                currimgData = ctx.getImageData(0 ,0 , canvas.width , canvas.height);
                console.log(currimgData);
                console.log(imgData);
                ctx.putImageData(imgData , 0 , 0);
                setTimeout(function(){
                    ctx.putImageData(currimgData, 0 ,0);
                }, 400);
            }  
        }, true);
        */
    }



    updatePopDisplay(){
        k = this.size();
        console.log(k);
        let c = document.getElementById(k);
        c.style.backgroundColor="white";
                
    }

    push(imgData , is_undo){
        var newNode = new Node();
        newNode.next = this.top;
        newNode.data = imgData;
        this.top = newNode;

        if(is_undo==1)
            this.updatePushDisplay();        
    }

    pop(is_undo){
        if(this.top == null)
            return null;
        
        if(is_undo)
         this.updatePopDisplay();
        
        this.top = this.top.next;
        
        
       
    }


    Top(){
        if(this.top == null)
            return null;
       
        return this.top.data;
    }

    deleteall(is_undo){
        this.top=null;
        if(is_undo)
         for(i=1;i<=14;i++)
            {
            var cell = document.getElementById(i);
            cell.style.backgroundColor = "white";
            }
    }

    size(){
        let i =0;
        var temp = new Node();
        temp = this.top;
        while(temp!==null)
        {
            temp = temp.next;
            i = i+1;
        }
        return i;
    }

    



};




//variables
var j ,k ,prevX , prevY , currX , currY, flag, url, save_flag, imgData , currimgData;
save_flag=true;
flag = false;
let s1 = new stack();
let s2 = new stack();
var i=0;
var dot_flag=true;


let cell = document.getElementsByTagName("td");
cell[0].setAttribute('id' , '14');
let row = document.getElementById("row");
let table = document.getElementById("stack");


for(i=13;i>=1;i--){

    let tr= document.createElement("tr");
    let new_cell  = cell[0].cloneNode(true);
    new_cell.setAttribute('id' , i);
    tr.appendChild(new_cell);
    table.appendChild(tr);
}








//functions for the 3 buttons
document.getElementById("undo").onclick = function(){
      
    imgData = ctx.getImageData(0 ,0 , canvas.width , canvas.height);
    s2.push(imgData , 0);

    imgData = s1.Top();
    if(imgData!==null){
    s1.pop(1);
    s2.push(imgData , 0);
    ctx.putImageData(imgData, 0, 0);
    }
}
document.getElementById("redo").onclick = function(){
    imgData = s2.Top();
    if(imgData !== null){
    s1.push(imgData , 1);
    s2.pop(0);
    }


  
    imgData = s2.Top();
    if(imgData!==null){
    ctx.putImageData(imgData , 0 , 0);
    s2.pop(0);
    }

}
document.getElementById("clear").addEventListener('click' , Start);



// function to draw on canvas
function draw()
{
    ctx.beginPath();
    ctx.strokeStyle="#FFFFFF";
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineWidth= 6;

    ctx.stroke();
    ctx.closePath();
}

//event listeners for mouse operations
canvas.addEventListener("mousemove", function (e) {
    find('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    find('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    find('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    find('out', e)
}, false);

function find( state ,  e){
    if (state == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag  = true;
        //redo stack is emptied, when mouse is pressed. 
        s2.deleteall(0);
         
        if(save_flag){
            imgData = ctx.getImageData(0, 0 , canvas.width , canvas.height);
       
            s1.push(imgData  , 1);
            save_flag=false;
        }
        if(dot_flag)
        {
            dot_flag=false;
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.fillRect(currX, currY, 7, 7);
            ctx.closePath();
           
        }
       
     
    }

    if(state== 'up' || state == 'out')
    {    flag=false; save_flag=true;  dot_flag=true; }
    
    if(state == 'move' && flag){
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        draw();
    }
}



// Clear function

function Start(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle='#000000';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    //s1 to store the undo states
    s1.deleteall(1);

    //s2 to store the redo states
    s2.deleteall(0);
}











Start();
