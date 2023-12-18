//funktion til at starte singleplayet spil
function startSinglePlayerGame() {
  isMultiplayer = false;
  startGame();
}
// Funktion til at starte et multiplayer spil
function startMultiPlayerGame() {
  isMultiplayer = true;
  startGame();
}
// Sætter time trial konceptet igang med logikken inde fra game.js
function enableTimeTrial() {
  timeTrial = true;
  startGame();
}

function checkGuess() {
  let guessInput = document.getElementById("guess-input");
  let guess = guessInput.value.toLowerCase();
  //Det input brugeren skriver bliver sikret at det er i lowercase så JS koden er lavet til bedst at kunne håndtere dette.
  // fjerner inputtet brugeren skrev i feltet
  guessInput.value = "";

  //Tjekker om input er 1 bogstav - Hvis ikke kommer der frem at man skal taste 1 bogstav.
  if (guess.length !== 1) {
    let message = document.getElementById("game-message");
    message.textContent = "Please enter a single letter.";

    //Efter 2 sekunder nulstilles tekstfeltet så det er en tom string igen.
    setTimeout(function () {
      message.textContent = "";
    }, 2000);

    return;
  }

  //Tjekker om bogstavet er blevet gættet før - Hvis ja så skriver den en besked.
  if (guessedLetters.includes(guess)) {
    let message = document.getElementById("game-message");
    message.textContent =
      "You've already guessed that letter. Try a different one.";

    setTimeout(function () {
      message.textContent = "";
    }, 2000);
    // Efter 2 sekunder bliver message sat til at være en tom streng igen så beskeden forsvinder
    return;
  }

  guessedLetters.push(guess);
  attemptsLeft--;

  let correctGuess = false;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === guess) {
      //hvis target ord ved index "i" er lig med brugerens gæt
      //gussedWord represæntere det nuværende stadie af ordet der skal gættes så hvis et bogstav bliver gættet rigtigt så skal det opdateres fra "_" til bogstavet
      guessedWord =
        guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
      // guessedWord.substring(0, i) - tager en substring der starter ved begyndelsen af guessedWord op til det bogstav index "i" er ved.
      // + guess - det bogstav brugeren gætter på altså 'i' position erstatter "_" med bogstavet som er et korrekt gæt.
      // guessedWord.substring(i + 1); - Tager resten af ordet efter index 'i'. Nu er det rigtige gæt blevet sat ind så der ikke længere er "_" men det rigtige bogstav.
      correctGuess = true; //Der er mindst et rigtigt gæt i iterationen.
    }
  }

  if (guessedWord === targetWord) {
    //Tjekker om det gættede ord er lig med targetWord
    if (isMultiplayer) {
      //Hvis det er multiplayer så bliver der vist en besked så man ved det er en ny spillers tur.
      let message = document.getElementById("game-message");
      message.textContent =
        "Congratulations, " +
        players[currentPlayer] +
        "! You guessed the word: " +
        targetWord;
      //2 sekunders timeout inden der skiftes spiller.
      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      //Ellers hvos det er singleplayer - Bliver der ønsket tillykke og det kommer så en 2 sekunderpause inden den starter et nyt spil.
      let message = document.getElementById("game-message");
      message.textContent =
        "Congratulations! You guessed the word: " + targetWord;

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      startGame();
    }
    return;
  }

  //Hvis man rammer 0 gæt tilbage så får man en game over besked hvor den siger hvad det rigtige ord var.
  if (attemptsLeft === 0) {
    if (isMultiplayer) {
      //Hvis det er multiplayer så viser den også hvilken spiller det ikke gættede ordet.
      let message = document.getElementById("game-message");
      message.textContent =
        "Game Over! The word was: " +
        targetWord +
        ". Better luck next time, " +
        players[currentPlayer] +
        "!";

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      switchPlayer(); //skifter til den anden spiller
    } else {
      //Hvis det er singleplayer så skriver den bare targetWord og skifter spiller.
      let message = document.getElementById("game-message");
      message.textContent =
        "Game Over! The word was: " + targetWord + ". Better luck next time!";

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      startGame();
    }
    return;
  }
  if (correctGuess) {
    //Hvis der bliver gættet korrekt så bliver der vist en besked i 2 sekunder
    let correctGuessMessage = document.getElementById("correct-guess-message");
    correctGuessMessage.textContent = "Correct guess!";

    setTimeout(function () {
      correctGuessMessage.textContent = "";
    }, 2000);
 
    updateDisplay(); //Opdaterer vores display efter hvert gæt

  }
}

function guessEntireWord() {
  //Henter det input brugeren gætter på hele ordet.
  let wordGuessInput = document.getElementById("word-guess-input");
  let wordGuess = wordGuessInput.value.toLowerCase();

  wordGuessInput.value = ""; //Nulstiller det input brugeren skriver
  //Tjekker om det gættede ord er korrekt.
  if (wordGuess === targetWord) {
    if (isMultiplayer) {
      //Hvis det er multiplayer så vises beskeden og spilleren skifter.
      let message = document.getElementById("game-message");
      message.textContent =
        "Congratulations, " +
        players[currentPlayer] +
        "! You guessed the word: " +
        targetWord;

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      //Ellers hvis det er singleplayer så vises beskeden og der startes et nyt spil.
      let message = document.getElementById("game-message");
      message.textContent =
        "Congratulations! You guessed the word: " + targetWord;

      setTimeout(function () {
        message.textContent = "";
      }, 2000);
      startGame();
    }

    return;
  } else {
    //Hvis der gættes forkert
    let message = document.getElementById("game-message");
    message.textContent = "Oops! That's not the correct word.";
    attemptsLeft--; //minus på forsøg

    //Hvis det er ingen forsøg tilbage så vises beskeden og spilleren skiftes.
    if (attemptsLeft === 0) {
      message.textContent =
        "Game Over! The word was: " +
        targetWord +
        ". Better luck next time, " +
        players[currentPlayer] +
        "!";

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      //Ellers opdateres displayet med nye oplysninger.
      updateDisplay();
    }
  }
}
