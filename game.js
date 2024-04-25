// Iteration 1: Declare variables required for this game

// Iteration 1.2: Add shotgun sound

// Iteration 1.3: Add background sound

// Iteration 1.4: Add lives

// Iteration 2: Write a function to make a zombie

// Iteration 3: Write a function to check if the player missed a zombie

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

// Iteration 5: Creating timer

// Iteration 6: Write a code to start the game by calling the first zombie

// Iteration 7: Write the helper function to get random integer
// Iteration 1: Declare variables required for this game
let timer;
let lives = 3;
let zombiesEscaped = 0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio('./assets/shotgun.mp3');

// Iteration 1.3: Add background sound
const backgroundSound = new Audio('./assets/background.mp3');

// Iteration 1.4: Add lives
const livesContainer = document.getElementById('lives');
for (let i = 0; i < lives; i++) {
    const life = document.createElement('img');
    life.src = './assets/heart.png';
    livesContainer.appendChild(life);
}

// Iteration 2: Write a function to make a zombie
// Iteration 2: Write a function to make a zombie
function makeZombie() {
    const zombieImages = ['./assets/zombie-1.png', './assets/zombie-2.png', './assets/zombie-3.png']; // Add paths to your zombie images
    const randomImage = zombieImages[Math.floor(Math.random() * zombieImages.length)]; // Select a random image
    const zombie = document.createElement('div');
    zombie.classList.add('zombie');
    zombie.style.left = `${Math.random() * 90}%`;
    zombie.style.animationDuration = `${Math.random() * 2 + 1}s`;
    zombie.style.backgroundImage = `url(${randomImage})`; // Set background image
    zombie.addEventListener('animationend', () => {
        if (!zombie.classList.contains('shot')) {
            zombie.remove();
            zombiesEscaped++;
            if (zombiesEscaped >= 4) {
                endGame(false);
            }
            updateLives();
        }
    });
    document.getElementById('game-body').appendChild(zombie);
}


// Iteration 3: Write a function to check if the player missed a zombie
function checkMissed() {
    if (document.querySelectorAll('.zombie').length === 5) {
        endGame(false);
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.classList.add('shot');
    zombie.style.animation = 'none';
    setTimeout(() => {
        zombie.remove();
        makeZombie();
    }, 500);
}

// Iteration 5: Creating timer
function startTimer() {
    let time = 60;
    const timerDisplay = document.getElementById('timer');
    timer = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time <= 0) {
            endGame(true);
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    makeZombie();
    startTimer();
    backgroundSound.loop = true;
    backgroundSound.play();
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update lives display
function updateLives() {
    lives--;
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const life = document.createElement('img');
        life.src = './assets/heart.png';
        livesContainer.appendChild(life);
    }
}

// Function to end the game
function endGame(isWin) {
    clearInterval(timer);
    backgroundSound.pause();
    if (isWin) {
        location.href = "./win.html"; // Redirect to win page
    } else {
        location.href = "./game-over.html"; // Redirect to game over page
    }
}

  

// Event listener for shooting a zombie
document.addEventListener('click', (event) => {
    const zombie = event.target.closest('.zombie');
    if (zombie) {
        destroyZombie(zombie);
        shotgunSound.play();
    }
});

// Start the game when the page is loaded
window.addEventListener('load', startGame);
