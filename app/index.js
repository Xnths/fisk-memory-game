const board = document.querySelector('.board');

let card = [];

function checkcards() {
    const firstCardPickedId = card[0].dataset.id;
    const secondCardPickedId = card[1].dataset.id;
    console.log(firstCardPickedId == secondCardPickedId);
    card = [];
}

board.addEventListener('click', event => {
    if (!card.includes(event.target) && event.target.dataset.id) card.push(event.target);
    if (card.length > 1) checkcards();
})