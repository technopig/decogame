// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Get input and message elements
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');

// Function to check the user's guess
function checkGuess() {
    // Get the user's guess from the input
    const userGuess = parseInt(guessInput.value);

    // Check if the guess is correct
    if (userGuess === secretNumber) {
        message.textContent = 'Congratulations! You guessed the correct number!';
    } else if (userGuess > secretNumber) {
        message.textContent = 'Too high. Try again!';
    } else {
        message.textContent = 'Too low. Try again!';
    }

    // Clear the input field
    guessInput.value = '';
}
