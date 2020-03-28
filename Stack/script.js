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

    push(imgData){
        var newNode = new Node();
        newNode.next = this.top;
        newNode.data = imgData;
        this.top = newNode;
    }

    pop(){
        if(this.top == null)
            return null;
        
        this.top = this.top.next;
    }


    Top(){
        if(this.top == null)
            return null;
        console.log(this.top.data);
        return this.top.data;
    }

    //show(){}

    deleteall(){
        this.top=null;
    }

    size(){
        let i =0;
        var temp = new Node();
        temp = this.top();
        while(temp!==null)
        {
            temp = temp.next;
            i = i+1;
        }
        return i;
    }
};




//variables
var prevX , prevY , currX , currY, flag, url, save_flag, imgData;
save_flag=true;
flag = false;
let s1 = new stack();
let s2 = new stack();


//functions for the 3 buttons
document.getElementById("undo").onclick = function(){
      
    imgData = ctx.getImageData(0 ,0 , canvas.width , canvas.height);
    s2.push(imgData);

    imgData = s1.Top();
    if(imgData!==null){
    s1.pop();
    s2.push(imgData);
    ctx.putImageData(imgData, 0, 0);
    }
}
document.getElementById("redo").onclick = function(){
    imgData = s2.Top();
    if(imgData !== null){
    s1.push(imgData);
    s2.pop();
    }


    console.log(imgData);
    imgData = s2.Top();
    if(imgData!==null){
    ctx.putImageData(imgData , 0 , 0);
    s2.pop();
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
        
        //redo stack is emptied, when mouse is pressed. 
        s2.deleteall();
        if(save_flag){
            imgData = ctx.getImageData(0, 0 , canvas.width , canvas.height);
            console.log(imgData);
            s1.push(imgData);
        }
        flag  = true;
    }

    if(state== 'up' || state == 'out')
    {    flag=false; save_flag=true; }
    
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
    s1.deleteall();

    //s2 to store the redo states
    s2.deleteall();
}

Start();