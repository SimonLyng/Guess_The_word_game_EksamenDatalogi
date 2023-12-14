let players = [];
// her bliver et tomt array Oprettet til at opbevare spillernavne

// Funktion til at skifte den nuværende spiller
function switchPlayer() {
  // Opdaterer den nuværende spiller ved at skifte til den næste i rækken
  currentPlayer = (currentPlayer + 1) % players.length;

  // Vælger et nyt ord tilfældigt fra ordlisten
  targetWord = words[Math.floor(Math.random() * words.length)];
  // Opretter gættede ord med understregninger svarende til ordets længde
  guessedWord = "_".repeat(targetWord.length);
  // Nulstiller antallet af forsøg tilbage til maksimum
  attemptsLeft = maxAttempts;
  // Tømmer listen over allerede gættede bogstaver
  guessedLetters = [];
  // Nulstiller den forløbne tid tilbage 30 sekunder
  timePassed = 30;

  // Opdaterer spillets visning med de nye værdier
  updateDisplay();

  // Viser en advarsel til den nuværende spiller om, at det er deres tur
  alert(" " + players[currentPlayer] + " it's your turn to guess!");

  // Tjekker, om det er den sidste spillers tur og alle forsøg er brugt
  if (currentPlayer === players.length - 1 && attemptsLeft === 0) {
    // Starter spillet forfra
    startGame();
  }
}

// Funktion til at få spillernavne fra brugerne
function getPlayerNames() {
  players = [];
  // køre igennem for at indsamle navne for to spillere
  for (let i = 1; i <= 2; i++) {
    // Beder om en spillers navn
    let playerName = prompt("Enter Player " + i + "'s name:");
    // Tjekker om et navn er indtastet, ellers bruger standardnavnet
    if (playerName) {
      players.push(playerName);
    } else {
      players.push("Player " + i);
    }
  }
}
