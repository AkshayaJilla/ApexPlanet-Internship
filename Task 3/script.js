const quiz = [
    {
        question: "Which language is used for styling webpages?",
        answers: ["HTML", "CSS", "Java", "Python"],
        correct: 1
    },
    {
        question: "Which language makes webpages interactive?",
        answers: ["HTML", "CSS", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "Which tag is used to link a JavaScript file?",
        answers: ["<css>", "<script>", "<style>", "<js>"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Stores selected answers (-1 = not answered)
let selectedAnswers = new Array(quiz.length).fill(-1);

function loadQuestion() {

    const q = quiz[currentQuestion];

    document.getElementById("question").innerText = q.question;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const btn = document.createElement("button");
        btn.innerText = answer;
        btn.classList.add("answer-btn");

        // If question was already answered
        if (selectedAnswers[currentQuestion] !== -1) {

            btn.disabled = true;

            if (index === q.correct) {
                btn.style.backgroundColor = "green";
            }

            if (
                index === selectedAnswers[currentQuestion] &&
                index !== q.correct
            ) {
                btn.style.backgroundColor = "red";
            }

        } else {

            btn.onclick = function () {

                selectedAnswers[currentQuestion] = index;

                if (index === q.correct) {
                    score++;
                }

                loadQuestion();
            };

        }

        answers.appendChild(btn);
    });

    // Disable Previous button on first question
    document.getElementById("prevBtn").disabled = currentQuestion === 0;

    // Change Next button text on last question
    if (currentQuestion === quiz.length - 1) {
        document.getElementById("nextBtn").innerText = "Finish";
    } else {
        document.getElementById("nextBtn").innerText = "Next";
    }
}

function nextQuestion() {

    if (currentQuestion < quiz.length - 1) {

        currentQuestion++;
        loadQuestion();

    } else {

        document.getElementById("quiz").innerHTML = `
            <h2>Quiz Completed!</h2>
            <h3>Your Score: ${score}/${quiz.length}</h3>
            <button onclick="restartQuiz()">Restart Quiz</button>
        `;
    }
}

function previousQuestion() {

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    selectedAnswers.fill(-1);

    document.getElementById("quiz").innerHTML = `
        <h3 id="question"></h3>

        <div id="answers"></div>

        <button id="prevBtn" onclick="previousQuestion()">Previous</button>
        <button id="nextBtn" onclick="nextQuestion()">Next</button>

        <p id="score"></p>
    `;

    loadQuestion();
}

// Load first question
loadQuestion();


// ---------------- JOKE API ----------------

async function getJoke() {

    const joke = document.getElementById("joke");
    const btn = document.getElementById("jokeBtn");

    joke.innerHTML = "⏳ Loading joke... Please wait.";
    btn.disabled = true;
    btn.innerText = "Loading...";

    try {

        const response = await fetch("https://official-joke-api.appspot.com/random_joke");

        if (!response.ok) {
            throw new Error("Failed to fetch joke.");
        }

        const data = await response.json();

        joke.innerHTML = `
            <strong>${data.setup}</strong><br><br>
            ${data.punchline}
        `;

    } catch (error) {

        joke.innerHTML = "❌ Unable to load a joke. Please try again.";

    } finally {

        btn.disabled = false;
        btn.innerText = "Get Joke";
    }
}