const board = document.querySelector('.board');

let isSelectOn = true;

const words = [
    'pudding',
    'spaghetti',
    'beans',
    'jello',
    'ice cream',
    'rice',
    'chocolate bar',
    'muffin',
    'cereal bar'
]

let shuffledHTML = []

function init() {
    words.forEach(word => {
        const wordId = words.indexOf(word);

        const cardHTMLImage = `
            <img class="board__card board__card--image" data-id="${wordId}"></img>
        `
        const cardHTMLWord = `
            <div class="board__card board__card--word" data-id="${wordId}"></div>
        `

        shuffledHTML.push(cardHTMLImage);
        shuffledHTML.push(cardHTMLWord);
    })

    for (let i = shuffledHTML.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = shuffledHTML[i];
        shuffledHTML[i] = shuffledHTML[j];
        shuffledHTML[j] = temp;
    }

    board.innerHTML = shuffledHTML.join(" ");
}

let card = [];

function turnCard(element) {
    card.push(element);
    element.classList.add('turn-card');
    element.classList.add('active');
    setTimeout(() => {
        if (element.className == "board__card board__card--image turn-card active") {
            const fileName = words[element.dataset.id].replace(' ', '-') + ".jpg";

            element.src = `./assets/img/te1/lesson8/${fileName}`
        }
        if (element.className == "board__card board__card--word turn-card active") {
            element.innerHTML = words[element.dataset.id]
        }
    }, 300)
}

function checkCards() {
    const firstCardPickedId = card[0].dataset.id;
    const secondCardPickedId = card[1].dataset.id;
    console.log(firstCardPickedId == secondCardPickedId);

    if (firstCardPickedId != secondCardPickedId) {
        setTimeout(() => {
            card.forEach(element => {
                element.classList.remove('turn-card');
                element.classList.remove('active');
                element.classList.add('turn-card--reverse')
                console.log(element.className)

                if (element.className == "board__card board__card--image turn-card--reverse") {
                    element.src = "";
                }

                if (element.className == "board__card board__card--word turn-card--reverse" || element.className == "board__card board__card--image turn-card--reverse") {
                    element.innerHTML = "";
                }

                setTimeout(() => {
                    element.classList.remove('turn-card--reverse')

                    card = [];

                    isSelectOn = true;
                }, 1000)
            })
        }, 2000)
    } else {
        setTimeout(() => {
            card.forEach(element => {
                element.classList.remove('turn-card');
                element.classList.remove('active');
                element.classList.add('correct');
            })
            card = [];

            isSelectOn = true;
        }, 2000);
    }
}

board.addEventListener('click', event => {
    if (isSelectOn && !card.includes(event.target) && event.target.dataset.id && event.target.className != "board__card board__card--image correct" && event.target.className != "board__card board__card--word correct") {
        turnCard(event.target);
    }
    if (card.length >= 2) {
        checkCards();
        isSelectOn = false;
    }

})

init();