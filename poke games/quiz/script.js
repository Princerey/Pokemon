function show_image() {
    var div = $('<div id="a1"></div>');
div.prepend('<img src="./psy.png">');
}


let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


const quizArray = [
    { 
        id: "0",
        question:"pics/Poliwhirl.png",
        options: ["Poliwhirl", "Poliwblu", "Poliwag", "Poliwrath"],
        correct: "Poliwhirl",
    },
    {
        id: "1",
        question:"pics/Nidoking.png",
        options: ["Nidorina", "Nidorino", "Nidoran", "Nidoking"],
        correct: "Nidoking",
    },
    {
        id: "2",
        question:"pics/Growlithe.png",
        options: ["Growlithe", "Articuno", "Jolteon", "Arcanine"],
        correct: "Growlithe",
    },
    {
        id: "3",
        question:"pics/Mewtwo.png",
        options: ["Mewtwo", "Meow", "Mew", "Mewtoo"],
        correct: "Mewtwo",
    },
    {
        id: "4",
        question:"pics/Vulpix.png",
        options: ["Vulpix", "Ponyta", "Ninetails", "Rapidash"],
        correct: "Vulpix",
    },
    {
        id: "5",
        question:"pics/Weezing.png",
        options: ["Gengar", "Koffing", "Ditto", "Weezing"],
        correct: "Weezing",
    }, {
        id: "6",
        question:"pics/Electrode.png",
        options: ["Moltres", "Magnemite", "Electrode", "Magneton"],
        correct: "Electrode",
    },
    {
        id: "7",
        question:"pics/Drowzee.png",
        options: ["Drowzee", "Kadabra", "Hypno", "Abra"],
        correct: "Drowzee",
    },
    {
        id: "8",
        question:"pics/Dragonite.png",
        options: ["Dratini", "Dragonair", "Dragonite", "Dragoknight"],
        correct: "Dragonite",
    },
    {
        id: "9",
        question:"pics/Tangela.png",
        options: ["Electrabuzz", "Mr. Mime", "Tangela", "Jynx"],
        correct: "Tangela",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};


const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("div");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = `<img class="imga" src="${i.question}"> </img>`;
        div.appendChild(question_DIV);
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }


    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}


function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};