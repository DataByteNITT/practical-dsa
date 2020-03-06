var nextButton = document.getElementById("nextButton");
var prevButton = document.getElementById("prevButton");
var container  = document.getElementById("container");
var history    = document.getElementById("history");
// var onLoad = function(iframe){
    // alert("Loading : "+iframe.contentWindow.location.href);
    // alert("Loading : "+iframe.src);
// }
window.onload = function(){
    // alert(window.location.href);
}

nextButton.onclick = function(){
    // alert("Next");
    ll.goToNext();
};

prevButton.onclick = function(){
    // alert("Back");
    ll.goToPrev();
};

var elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function () {
        switch(this.id){
            case "twitter"  : container.style.backgroundImage = "url('img/twitter.png')";  ll.insertNode(this.text);break;
            case "google"   : container.style.backgroundImage = "url('img/google.png')";   ll.insertNode(this.text);break;
            case "youtube"  : container.style.backgroundImage = "url('img/youtube.png')";  ll.insertNode(this.text);break;
            case "linkedin" : container.style.backgroundImage = "url('img/linkedin.png')"; ll.insertNode(this.text);break;
            case "facebook" : container.style.backgroundImage = "url('img/facebook.png')"; ll.insertNode(this.text);break;
            default : break;
        }
    }
}

var urls = [
    // "https://www.google.com/webhp?igu=1",
    // "https://www.youtube.com/embed/tgbNymZ7vqY",
    // "https://en.wikipedia.org/wiki/Main_Page",
    "pages/first.html",
    "pages/second.html",
    "pages/third.html",
    "pages/fourth.html",
    "pages/fifth.html",
];

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
    }

    insertNode(value){
        //By default, we will insert at the end of the list
        var newNode = new Node();
        newNode.data = value;
        if(this.head.data == null){
            //Empty list condition
            this.head = newNode;
            this.last = newNode;
        }else{
            this.last.next = newNode;
            this.last = newNode;
        }
        this.current = newNode;
    }

    deleteNode(){
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
            nextButton.disabled = true;
            return;
        }else{
            nextButton.disabled = false;
        }
    }

    goToPrev(){
        if(this.current.prev == null){
            prevButton.disabled = true;
            return;
        }else{
            prevButton.disabled = false;
        }
    }
}
LinkedList.MAX_NODES = 10; //max no. of pages to track

var ll = new LinkedList();
ll.insertNode(1);
// ll.insertNode(2);
// ll.insertNode(3);
// ll.insertNode(4);
// ll.insertNode(5);

ll.printList();