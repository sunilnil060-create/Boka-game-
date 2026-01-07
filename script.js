const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const boardWrapper = document.getElementById("boardWrapper");
const gameInfo = document.getElementById("gameInfo");
const scoreDisplay = document.getElementById("score");
const gameBoard = document.getElementById("gameBoard");

const cardsData = [
    {name: "BOKA1", img: "images/p1.jpeg"},
    {name: "BOKA2", img: "images/p2.jpeg"},
    {name: "BOKA3", img: "images/p3.jpeg"},
    {name: "BOKA4", img: "images/p4.jpeg"},
    {name: "BOKA5", img: "images/p5.jpeg"},
    {name: "BOKA6", img: "images/p6.jpeg"}
  
];

let cardPairs = [];
let flippedCards = [];
let score = 0;

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    boardWrapper.classList.remove("hidden");
    gameInfo.classList.remove("hidden");
    score = 0;
    scoreDisplay.textContent = score;
    createBoard();
});

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function createBoard(){
    gameBoard.innerHTML = "";
    flippedCards = [];
    
    // Duplicate cards for pairs
    cardPairs = [];
    cardsData.forEach(card => {
        cardPairs.push({...card});
        cardPairs.push({...card});
    });

    shuffle(cardPairs).forEach(cardData => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-face front">${cardData.name}</div>
            <div class="card-face back">
                <img src="${cardData.img}">
            </div>
        `;

        card.addEventListener("click", () => flipCard(card, cardData));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, cardData){
    if(card.classList.contains("flip") || flippedCards.length === 2) return;

    card.classList.add("flip");
    flippedCards.push({ card, cardData });

    if(flippedCards.length === 2){
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.cardData.img === second.cardData.img) {
        score += 10;
        scoreDisplay.textContent = score;
        flippedCards = [];

        const matched = document.querySelectorAll(".card.flip").length;

        if (matched === cardPairs.length) {
            // Clear all cards
            gameBoard.innerHTML = "";

            // Make gameBoard a flex container for centering
            gameBoard.style.display = "flex";
            gameBoard.style.flexDirection = "column";
            gameBoard.style.alignItems = "center";
            gameBoard.style.justifyContent = "center";

            // Create congrats message container
            const congratsDiv = document.createElement("div");
            congratsDiv.style.background = "#000";  // black background
            congratsDiv.style.color = "#ffd700";    // gold text
            congratsDiv.style.fontSize = "1.8rem";
            congratsDiv.style.fontWeight = "bold";
            congratsDiv.style.padding = "20px";
            congratsDiv.style.borderRadius = "16px";
            congratsDiv.style.textAlign = "center";
            congratsDiv.style.width = "90%";
            congratsDiv.style.height = "auto"; 
            congratsDiv.style.boxSizing = "border-box";
            congratsDiv.style.display = "flex";
            congratsDiv.style.flexDirection = "column";
            congratsDiv.style.alignItems = "center";
            congratsDiv.style.justifyContent = "center";

            // Add congratulation text
            const text = document.createElement("div");
            text.textContent = "🎉 Congratulations! You have won 40 kg Kalo Khashi 🎉";
            text.style.marginBottom = "15px"; 
            congratsDiv.appendChild(text);

            // Add goat image
            const goatImg = document.createElement("img");
            goatImg.src = "images/goat.jpeg"; // your goat image path
            goatImg.style.width = "250px";    
            goatImg.style.height = "auto";
            goatImg.style.borderRadius = "12px";
            goatImg.style.marginBottom = "20px";
            congratsDiv.appendChild(goatImg);

            // Add exit button
            const exitBtn = document.createElement("button");
            exitBtn.textContent = "Exit";
            exitBtn.style.padding = "10px 25px";
            exitBtn.style.fontSize = "1rem";
            exitBtn.style.cursor = "pointer";
            exitBtn.addEventListener("click", () => {
                // Hide board and show start screen
                gameBoard.innerHTML = "";
                boardWrapper.classList.add("hidden");
                startScreen.classList.remove("hidden");
                gameInfo.classList.add("hidden");
            });
            congratsDiv.appendChild(exitBtn);

            // Append congratsDiv to gameBoard
            gameBoard.appendChild(congratsDiv);
        }

    } else {
        setTimeout(() => {
            first.card.classList.remove("flip");
            second.card.classList.remove("flip");
            flippedCards = [];
        }, 600);
    }
}


