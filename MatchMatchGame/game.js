const cardArray=[    //an array of 3*4=12 cards == 6 pairs of cards ,containing objects with the attributes:name,img
    {
        name:"eye",
        img:"Images/Eye.png"
    },
    {
        name:"pumpkin",
        img:"Images/Pumpkin.png"
    },
    {
        name:"cauldron",
        img:"Images/Cauldron.png",
    },
    {
        name:"ghost",
        img:"Images/Ghost.png"
    },
    {
        name:"dracula",
        img:"Images/Dracula.png"
    },
    {
        name:"bones",
        img:"Images/Bones.png"
    },
    {
        name:"eye",
        img:"Images/Eye.png",
    },
    {
        name:"pumpkin",
        img:"Images/Pumpkin.png"
    },
    {
        name:"cauldron",
        img:"Images/Cauldron.png"
    },
    {
        name:"ghost",
        img:"Images/Ghost.png"
    },
    {
        name:"dracula",
        img:"Images/Dracula.png"
    },
    {
        name:"bones",
        img:"Images/Bones.png"
    },
    
]


const startButton=document.querySelector("#start");
const gameGrid=document.querySelector('.game-grid');
let cardsFlipped=[]; //array that has the cards that you flip
let cardsFlippedId=[]; //array that has all the id data atttributes of the cards you flip
let cardsWon=[]; //array that has the found matching pairs
const result=document.querySelector("#result");
let startNewGame=false;  


startGame();
createGameGrid();


//all functions are HERE:


//NOTE:sort() with 0.5-Math.random() is usually used for sorting an array in random order.
//Math.random() returns random values that belong to [0,1). So 0.5 acts as the mid point.
// If we use a value greater than 1 or less 0 than it will always be either true or false..
// Therefore,0.5 is used. Remember that sort(compare-function) sorts two numeric values by checking
// if the compare function's result is NEGATIVE,POSITIVE OR ZERO !!!!!
function startGame(){
    startButton.addEventListener("click",(event)=>{
        cardArray.sort(()=>{return 0.5-Math.random();}); 
        startNewGame=true;
        let cards=document.querySelectorAll("img"); //an array containing all the img elements of the document (the created grid)
        for(let i=0;i<12;i++){
        
        cards[i].setAttribute("src","Images/CardBack.png");
        }
        result.textContent="";
        cardsFlipped=[];
        cardsFlippedId=[];
        cardsWon=[];

        });
 }     




function createGameGrid(){  //create the game's grid
 for(let i=0;i<cardArray.length;i++){
     let card=document.createElement("img"); //create the card img element for the grid
     card.setAttribute("src","Images/CardBack.png");  // set the src attribute of this img element
     card.setAttribute("data-id",i); //the data-* attributes give us the ability to embed CUSTOM DATA ATTRIBUTES on all HTML elements
     card.addEventListener("click",flipCard);
     gameGrid.appendChild(card);
 }


}


function flipCard(){
   if (startNewGame==true){
    let cardId=this.getAttribute("data-id"); //get the id attribute of the card flipped
    console.log(cardId);
    cardsFlipped.push(cardArray[cardId].name); //get the object's name in place==cardId of the cardArray 
    cardsFlippedId.push(cardId); 
    this.setAttribute("src",cardArray[cardId].img); //once you flip, you set the correct card img
    if(cardsFlipped.length==2){ //2 cards flipped to compare if they are a matching pair
         setTimeout(checkForMatch,300); //checkForMatch after 300ms
    }
    //console.log(cardsFlipped);
   }


}




function checkForMatch(){
    let firstCardId=cardsFlippedId[0];
    let secondCardId=cardsFlippedId[1];
    let cards=document.querySelectorAll("img"); //an array containing all the img elements of the document (the created grid)
    if (cardsFlipped[0]===cardsFlipped[1] && cardsFlippedId[0]!==cardsFlippedId[1]){ //same names
        alert("This is a match!!");
        cards[firstCardId].setAttribute("src","Images/white.png");
        cards[secondCardId].setAttribute("src","Images/white.png");
        cardsWon.push(cardsFlipped[0]);
        

   
    }else{
        cards[firstCardId].setAttribute("src","Images/CardBack.png"); 
        cards[secondCardId].setAttribute("src","Images/CardBack.png"); 
        
    }
    //after checking two cards , we empty these arrays:
    cardsFlipped.pop();
    cardsFlipped.pop();
    cardsFlippedId.pop();
    cardsFlippedId.pop();

    result.innerHTML = cardsWon;
    
    //win:
    if (cardsWon.length==6){
        result.textContent=" You WON !!!";
        setTimeout( ()=>{
            gameGrid.innerHTML="";
            startNewGame=false;
            cardsWon=[];
            createGameGrid();
        },500); //create new GRID after 500ms
    }

}




