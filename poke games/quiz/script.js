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
        question:"./pics/Electrode1.png",
        options: ["Electrode", "Clefairy", "Jigglypuff", "Venonat"],
        correct: "Electrode",
    },
    {
        id: "1",
        question: "",
        options: ["Wailmer", "Swablu", "Minun", "Altaria"],
        correct: "Altaria",
    },
    {
        id: "2",
        question: "",
        options: ["Kabutops", "Zubat", "Doduo", "Muk"],
        correct: "Kabutops",
    },
    {
        id: "3",
        question: "",
        options: ["Suicune", "Pupitar", "Entei", "Phanpy"],
        correct: "Suicune",
    },
    {
        id: "4",
        question: "",
        options: ["Medicham", "Zangoose", "Corphish", "Armaldo"],
        correct: "Medicham",
    },
    {
        id: "5",
        question: "",
        options: ["Slowbro", "Rapidash", "Bellsprout", "Kakuna"],
        correct: "Kakuna",
    }, {
        id: "6",
        question: "",
        options: ["Shiftry", "Seedot", "Ralts", "Pelipper"],
        correct: "Ralts",
    },
    {
        id: "7",
        question: "",
        options: ["Tangela", "Kadabra", "Tentacruel", "Magneton"],
        correct: "Tangela",
    },
    {
        id: "8",
        question: "",
        options: ["Victreebel", "Tentacool", "Weepinbell", "Machop"],
        correct: "Weepinbell",
    },
    {
        id: "9",
        question: "./pics/Hariyama.png",
        options: ["Kirlia", "Breloom", "Hariyama", "Ninjask"],
        correct: "Hariyama",
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
        question_DIV.innerHTML = `<img src="${i.question}"> </img>`;
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