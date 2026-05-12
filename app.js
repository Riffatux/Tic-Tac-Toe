let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;
let player1=localStorage.getItem("playerO");
let player2=localStorage.getItem("playerX");
let playerONameTag=document.getElementById("playerOname");
let playerXNameTag=document.getElementById("playerXname");

playerONameTag.innerText=`${player1} (O)`;
playerXNameTag.innerText=`${player2} (X)`;

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    playerXNameTag.classList.remove("active");
    playerONameTag.classList.add("active");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            box.classList.add("O");
            turnO=false;
            playerONameTag.classList.remove("active");
            playerXNameTag.classList.add("active");

        }else{
            box.innerText="X";
            turnO=true;
            playerXNameTag.classList.remove("active");
            playerONameTag.classList.add("active");
        }
        box.disabled=true;
        checkWinner();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("O");
        box.classList.remove("winner");
    }
};
const showWinner=(winner)=>{
    let winnerName=winner==="O"? player1:player2;
    let loserName=winner==="O"? player2:player1;
    msg.innerHTML=`Congratulations, Winner is ${winnerName}<br>Loser is ${loserName}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1value=boxes[pattern[0]].innerText;
        let pos2value=boxes[pattern[1]].innerText;
        let pos3value=boxes[pattern[2]].innerText;

        if(pos1value!=""&& pos2value!=""&& pos3value!=""){
            if(pos1value===pos2value&& pos2value===pos3value){
                showWinner(pos1value);
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");
                return;
            }
        }
    }
    let isDraw=true;
    for(let box of boxes){
        if (box.innerText===""){
            isDraw=false;
            break;
        }
    }
    if(isDraw){
        msg.innerText="It's a Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}

newGameBtn.addEventListener("click",()=>{
    localStorage.removeItem("playerO");
    localStorage.removeItem("playerX");
    window.location.href="players.html"});
resetBtn.addEventListener("click",resetGame);

function goToPlayers(){
    window.location.href="players.html";
}

function StartGame(){
    localStorage.setItem("playerO",document.getElementById("playerO").value);
    localStorage.setItem("playerX",document.getElementById("playerX").value);
    window.location.href="ttt.html";
}

