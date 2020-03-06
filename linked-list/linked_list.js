var nextButton  = document.getElementById("nextButton");
var prevButton  = document.getElementById("prevButton");
var container   = document.getElementById("container");
var historyNode = document.getElementById("history");
var clearButton = document.getElementById("clearButton");

const MAX_COLS = 5;

nextButton.onclick = function(){
    ll.goToNext();
    changeBackgroundImage(ll.current.data);
};

prevButton.onclick = function(){
    ll.goToPrev();
    changeBackgroundImage(ll.current.data);
};

clearButton.onclick = function(){
    ll.head = new Node();
    ll.displayHistory();
}
function changeBackgroundImage(text){
    container.style.backgroundImage = "url('img/"+text+".png')";
}

var elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function(){
        var activeElement = document.getElementsByClassName("active")[0];
        activeElement.classList.remove("active");
        this.classList += "active";
        changeBackgroundImage(this.text);
        ll.insertNode(this.text);
        ll.displayHistory();
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


class Node{
    constructor(){
        this.data = null; //current webpage's url
        this.next = null;
        this.prev = null;
    }
};
class LinkedList{
    constructor(){
        this.head = new Node();
        this.current = new Node();
        this.last = new Node(); //maintain a last pointer to easily insert new nodes at the end
        this.count = 0;
        this.currentIndex = 0;
    }

    insertNode(value){
        this.count = this.getSize();
        if(this.current.data == value){
            return; //do not insert duplicate values
        }
        if(this.count >= LinkedList.MAX_NODES && this.currentIndex==this.count){
            return; 
        }
        //insert after the current node
        var newNode = new Node();
        newNode.data = value;
        if(this.head.data == null){ //Empty list condition
            this.head = newNode;
        }else{
            this.current.next = newNode;
            newNode.prev = this.current;
        }
        this.last = newNode;
        this.current = newNode;
        this.currentIndex += 1;
    }

    deleteNode(){
    }

    getSize(){
        var size = 0;
        var currentNode = this.head;
        while(currentNode!=null){
            currentNode = currentNode.next;
            size += 1;
        }
        return size;
    }
    printList(){
        var currentNode = this.head;
        while(currentNode!=null){
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    isEmpty(){
        return (this.head == null);
    }

    goToNext(){
        if(this.current.next == null){
            console.log("Next is null");
            return;
        }
        this.current = this.current.next;
        this.currentIndex += 1;
        ll.getCurrent();
        ll.displayHistory();
    }

    goToPrev(){
        if(this.current.prev == null){
            console.log("Prev is null");
            return;
        }
        this.current = this.current.prev;
        this.currentIndex -= 1;
        ll.getCurrent();
        ll.displayHistory();
    }

    getCurrent(){
        console.log("Current is : "+this.current.data);
    }

    displayHistory(){
        var currentNode = this.head;
        historyNode.innerHTML = "";
        var counter = -1;
        while(currentNode.data!=null){
            var node = document.createElement("span");
            if(currentNode == this.current)
            {node.style.backgroundColor = "green";}
            else
            {node.style.backgroundColor = "red";}
            var textNode = document.createTextNode(currentNode.data);
            node.appendChild(textNode);

            historyNode.appendChild(node);
            
            if(currentNode.next !=null){
                var arrowNode = document.createElement("span");
                arrowNode.className = "arrow";
                var arrowNodeText = document.createTextNode("<=>");
                arrowNode.appendChild(arrowNodeText);
                historyNode.appendChild(arrowNode);
                counter =  (counter+1)%MAX_COLS;
                if(counter == MAX_COLS-1){
                    historyNode.innerHTML += "<br><br>";
                }
            }
            currentNode = currentNode.next;
        }
    }
}
LinkedList.MAX_NODES =  30; //max no. of nodes to track

var ll = new LinkedList();