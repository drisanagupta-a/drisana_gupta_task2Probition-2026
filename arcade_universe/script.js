const characters = {
    benny: {
        name: "BENNY",
        description: "Strong and powerful. Built for players who prefer strength.",
        strength: 90,
        speed: 55,
        defense: 80,
        ability: "POWER BREAK",
        abilityDescription: "Break through obstacles with powerful attacks."
    },
    vinnie: {
        name: "VINNIE",
        description: "Fast and agile. Built for players who prefer speed.",
        strength: 45,
        speed: 90,
        defense: 55,
        ability: "DASH",
        abilityDescription: "Move quickly through dangerous areas."
    }
};
const characterCards = document.querySelectorAll(".characterCard:not(.locked)");
const characterName = document.getElementById("characterName");
const characterDescription = document.getElementById("characterDescription");
const characterAbility = document.getElementById("characterAbility");
const abilityDescription = document.getElementById("abilityDescription");
const strengthFill = document.querySelector(".strengthFill");
const speedFill = document.querySelector(".speedFill");
const defenseFill = document.querySelector(".defenseFill");
const characterInfo = document.querySelector(".characterInfo");
const selectCharacter = document.getElementById("selectCharacter");
let selectedCharacter = localStorage.getItem("selectedCharacter") || "vinnie";
function showCharacter(character) {
    const data = characters[character];
    if (!data) return;
    characterName.textContent = data.name;
    characterDescription.textContent = data.description;
    characterAbility.textContent = data.ability;
    abilityDescription.textContent = data.abilityDescription;
    strengthFill.style.width = data.strength + "%";
    speedFill.style.width = data.speed + "%";
    defenseFill.style.width = data.defense + "%";
    characterCards.forEach(card => {
        card.classList.remove("selected");
    });
    characterCards.forEach(card => {
    const name = card.querySelector("h3").textContent;
    if (name === data.name) {
            card.classList.add("selected");
        }
    });
    if (character === "benny") {
        document.body.classList.add("benny-theme");
    } else {
        document.body.classList.remove("benny-theme");
    }
    characterInfo.classList.remove("profileChange");
    void characterInfo.offsetWidth;
    characterInfo.classList.add("profileChange");
    selectedCharacter = character;
    localStorage.setItem("selectedCharacter", character);
}
    characterCards.forEach(card => {
    card.addEventListener("click", () => {
    const name = card.querySelector("h3").textContent;
    if (name === "BENNY") {
            showCharacter("benny");
        }
    if (name === "VINNIE") {
            showCharacter("vinnie");
        }});

    });
    selectCharacter.addEventListener("click", () => {
    localStorage.setItem("selectedCharacter", selectedCharacter);
    selectCharacter.textContent = "CHARACTER SELECTED ✓";
    setTimeout(() => {
        selectCharacter.textContent = "SELECT CHARACTER";
    }, 1500);

});
showCharacter(selectedCharacter);
const howToPlay = document.getElementById("howToPlay");
const howToPlayModal = document.getElementById("howToPlayModal");
const closeHowToPlay = document.getElementById("closeHowToPlay");
howToPlay.addEventListener("click", () => {
    howToPlayModal.classList.add("show");
});
closeHowToPlay.addEventListener("click", () => {
    howToPlayModal.classList.remove("show");
});
const credits = document.getElementById("credits");
const creditsModal = document.getElementById("creditsModal");
const closeCredits = document.getElementById("closeCredits");
credits.addEventListener("click", () => {
creditsModal.classList.add("show");
});
closeCredits.addEventListener("click", () => {
creditsModal.classList.remove("show");
});
window.addEventListener("click", event => {
    if (event.target === howToPlayModal) {
        howToPlayModal.classList.remove("show");
    }
    if (event.target === creditsModal) {
        creditsModal.classList.remove("show");
    }

});
const backgroundMusic = document.getElementById("backgroundMusic");
document.addEventListener("click", () => {
    backgroundMusic.play();
}, { once: true });

const startGame=document.getElementById("startGame");
startGame.addEventListener("click",()=>{
    window.location.href="game.html";
});