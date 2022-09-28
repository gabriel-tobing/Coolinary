const heroImage = document.getElementById("hero-image");
const cardsEl = document.querySelectorAll("#card");
const cardImages = document.querySelectorAll("#card-image");

for(let i = 0; i < cardsEl.length; i++) {
    cardsEl[i].addEventListener("click", () => {
        heroImage.src = cardImages[i].src;
    });
}