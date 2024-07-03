const container = document.querySelector('.container');
const gameTime = document.querySelector('.gameTime')
const icons = ['😀', '😀', '😂', '😂', '😍', '😍', '😎', '😎', '😴', '😴', '😋', '😋', '🍔', '🍔', '🍦', '🍦', '🍕', '🍕', '🍟', '🍟'];
let twoFlipped = [];
let gameOver = false;
createCards();
console.log(gameOver)

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));


//FLIP CARD
function flipCard(e) {
    if (twoFlipped.length === 2 || this.classList.contains('active') || gameOver) {
        return;
    }
    twoFlipped.push(this);
    this.classList.add('active');

    if (twoFlipped.length === 2) {
        checkCards();
        removeAllClicks();
    }
}

function removeAllClicks() {
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

function returnClicks() {
    let cardsNotActive = document.querySelectorAll('.card:not(.active)');
    cardsNotActive.forEach(card => card.addEventListener('click', flipCard));
}



//CHECK CARDS
function checkCards() {
    let front1 = twoFlipped[0].querySelector('.front').innerHTML;
    let front2 = twoFlipped[1].querySelector('.front').innerHTML;

    if (front1 === front2) {
        // win
        setTimeout(() => {
            twoFlipped = [];
            returnClicks();
        }, 1000);
    } else {
        // lose
        setTimeout(() => {
            twoFlipped.forEach(card => card.classList.remove('active'));
            twoFlipped = [];
            returnClicks();
        }, 1000);


    }

}
//CREATE CARDS
function createCards() {
    let text = '';
    let creationIcons = [...icons];
    for (let i = 0; i < 20; i++) {
        let rand = Math.floor(Math.random() * creationIcons.length);
        text += `
        <div class="card">
            <div class="front">${creationIcons[rand]}</div>
            <div class="back"></div>
        </div>
        `.trim();
        creationIcons.splice(rand, 1);
    }
    container.innerHTML = text;
    returnClicks();
}


//Function pulseeffect 
const addPulseEffect = (elements) => {
    elements.forEach(element => {
        element.classList.add('pulse');
    });
}

//TIMER
function countdown() {
    let seconds = 2 * 60;

    const timer = setInterval(() => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const time = document.querySelector('.timer');

        seconds--;
        if (seconds == 0) {
            clearInterval(timer);
            time.innerHTML = "GAME OVER!";
            removeAllClicks();
            const btn = document.createElement('button');
            gameTime.appendChild(btn);
            btn.textContent = "REPEAT THE GAME";
            btn.classList.add("repeat");
            btn.addEventListener('click', () => {
                createCards();
                countdown();
                resetGame();
                btn.remove();

            })
            gameOver = true;

        }


        if (seconds > 0) {
            time.innerHTML = `TIME: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        if (seconds < 60) {
            let backCards = document.querySelectorAll(".back");
            addPulseEffect(backCards);
            time.style.color = "red";
            time.classList.add('time-up');

        }
    }, 1000);
}

//reset
function resetGame() {
    cards.forEach(card => {
        card.classList.remove('active');
        card.addEventListener('click', flipCard);
    });
    twoFlipped = [];
    gameOver = false;
}


countdown();
