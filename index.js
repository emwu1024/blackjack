// Declares initial variables
let hasBlackJack = false;
let canKeepPlaying = false;
let msg = "";
let displayMessage = document.getElementById("message");
let cardsTxt = document.getElementById("cards-txt");
let sumTxt = document.querySelector("#sum-txt");
let drawBtn = document.getElementById("draw-btn");
let sum = 0;
let cards = [];
let playerTxt = document.getElementById("player-txt");

// Player Info
let player = {
  name: "",
  points: 0,
};

player.name = prompt("Please enter a username", "Link of Hyrule");

// Function for generating random integer between a min and max
function genRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - 1));
}

// Function for getting a new card
function getNewCard(min, max) {
  let newCard = genRandomInt(min, max);
  if (newCard > 10) {
    newCard = 10;
  } else if (newCard === 1) {
    newCard = 11;
  }
  return newCard;
}

//  Function that starts the new game nad initalises variables
function startGame() {
  playerTxt.textContent =
    "Name: " + player.name + "     Points: " + player.points;
  // initialise / reinitialise variables
  cards = [];
  canKeepPlaying = true;
  hasBlackJack = false;
  let firstCard = getNewCard(2, 11);
  let secondCard = getNewCard(2, 11);
  cards.push(firstCard);
  cards.push(secondCard);
  sum = firstCard + secondCard;

  renderGame();
}

// Function that renders the game
function renderGame() {
  // Draw card button only displays when game has started
  drawBtn.style = "visibility: visible";
  sumTxt.textContent = "Sum: " + sum;
  cardsTxt.textContent = "";
  for (let i = 0; i < cards.length; i++) {
    cardsTxt.textContent += cards[i] + "   ";
  }
  checkBlackjack();
}

// Function for Drawing a new card
function drawCard() {
  if (canKeepPlaying && !hasBlackJack) {
    let newCard = getNewCard(2, 11);
    sum += newCard;
    cards.push(newCard);
    renderGame();
  } else {
    // drawBtn.style = "background-color: rgb(69, 65, 59)";
  }
}

// Function that checks if user has blackjack
function checkBlackjack() {
  if (sum <= 20) {
    msg =
      "The sum of your cards is " + sum + ". Do you want to draw another card?";
  } else if (sum === 21) {
    msg = "You got Blackjack! Congratulations!!";
    player.points += 1;
    hasBlackJack = true;
    drawBtn.style = "visibility: collapse";
  } else {
    msg = "Better luck next time, the sum of your cards was: " + sum;
    canKeepPlaying = false;
    drawBtn.style = "visibility: collapse";
  }
  console.log(msg);
  displayMessage.textContent = msg;
}
