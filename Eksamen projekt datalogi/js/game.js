let words = ["determinisme", "hverdagskultur", "gaps", "aura", "emergens", "boolean", "array", "class", "loop", "javascript", "parasocial"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 12;
let attemptsLeft = maxAttempts;
let isMultiplayer = true;
let currentPlayer = 0;
let guessedLetters = [];
let timeTrial = false;
let timer;
let timePassed = 0;
let timerStarted = false;

function startGame() {
  // Hvis spillet bliver startet for første gang så tjekkes der om det er multiplayer.
  // Hvis det er multiplayer OG længden af array'et players er tomt ELLER "currentPlayer" er sidst i array'et. 
  // Så kalder vi funktionen getPlayerNames så brugeren kan indtaste navene til sit multiplayer spil.
  if (isMultiplayer && (!players.length || currentPlayer === players.length - 1)) {
    getPlayerNames();
  }

  // Programmet vælger et random ord fra vores "words" array 
  targetWord = words[Math.floor(Math.random() * words.length)];

  // Vi sætter guessedWord som er et tomt array til at være "_" og det gør vi for hvert bogstav i det ord Math.random har valgt ved hjælp af repeat.
  guessedWord = "_".repeat(targetWord.length);

  // Hvis det ikke er multiplayer så skal vi nulstille gættede bogstaver og attempts da singleplayer ikke gør brug af vores switchPlayers() funktion
  if (!isMultiplayer) {
    guessedLetters = [];
    attemptsLeft = maxAttempts;
  }

  // Udaterer UI så det er klar igen
  updateDisplay();

  // Hvis det er time-trial så skal der startes en nedtælling 
  if (timeTrial) {
    timePassed = 30;
    // Hvis tiden ikke er startet bruger funktionen setInterval til at kalde updateTimer funktionen hvert sekund og sætter timeStarted til true.
    // Det er med til at sikre at vi ikke starter flere timere på samme tid.
    if (!timerStarted) {
      timer = setInterval(updateTimer, 1000);
      timerStarted = true;
    }

    // Her sætter vi en timeout så vi efter 30 sek stopper spillet da tiden er gået.
    setTimeout(function () {
      clearInterval(timer); // Stopper vores timer.
      endGame(); // Kører funktionen endGame da tiden er gået.
    }, 30000); // 30 sek.
  }
}

function endGame() {
  clearInterval(timer); // Stopper vores timer
  let gameMessage = document.getElementById("game-message"); // Henter html elementet "game-message"

  // Viser denne tekst inde på vores side
  gameMessage.textContent = "Time's up! Game Over!";

  if (isMultiplayer) {
    switchPlayer(); // Hvis det er multiplayer så skifter vi spiller
  } else {
    // Ellers hvis det er singleplayer:
    setTimeout(function () {
      gameMessage.textContent = ""; // Fjerner vores besked inde på siden efter 2 sek.
      startGame();
    }, 2000); // Starter et nyt spil efter de 2 sek.
  }
}

function updateDisplay() {
  // Funktionen her står for meget at det vi kan se på skærmen når vi spiller spillet. 
  // Derfor benytter vi meget document.getElementById så det kan vises gennem html.

  // Viser det ord man skal gætte
  let wordDisplay = document.getElementById("word-display");
  wordDisplay.textContent = guessedWord;

  // Viser gæt man har tilbage og beskeden der bliver vist hvis man ikke gætter ordet. 
  let feedback = document.getElementById("feedback");
  feedback.textContent = "Attempts Left: " + attemptsLeft;

  if (attemptsLeft === 0) {
    feedback.textContent = "Game Over! The word was: " + targetWord;
    switchPlayer();
  }
  // Viser hvis tur det er i multiplayer
  if (isMultiplayer) {
    let turnIndicator = document.getElementById("turn-indicator");
    turnIndicator.textContent = "Turn: " + players[currentPlayer];
  }

  // Viser de gættede ord der er i guessedLetters array'et.
  let guessedLettersDisplay = document.getElementById("guessed-letters");
  guessedLettersDisplay.textContent = "Guessed Letters: " + guessedLetters.join(", ");
  // Bruger .join til at sammensætte det gættede bogstaver. Der sætted et efter bogstavet ","
  // Viser tiden der er tilbage. 
  let timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = "Time: " + timePassed + "s";
}

function updateTimer() {
  // Funktionene her bruges til at update timeren så den tæller nedad.
  timePassed--;
  if (timePassed < 0) {
    clearInterval(timer); // Stopper timeren når den rammer 0
    endGame();
  } else {
    document.getElementById("timer").textContent = "Time: " + timePassed + "s";
  }
}
