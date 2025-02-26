const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const questions = [
    {
        question: "What do you value most in music?",
        answers: {
            a: "Catchy melodies and lyrics",
            b: "Hard-hitting beats and deep bass",
            c: "Complex compositions and deep storytelling",
            d: "Raw emotion and powerful guitar riffs"
        },
        genreScores: { a: "pop", b: "hiphop", c: "jazz", d: "rock" }
    },
    {
        question: "Where do you usually listen to music?",
        answers: {
            a: "At parties or social events",
            b: "In my car with the volume up",
            c: "In a cozy cafe or at home",
            d: "At a live concert or festival"
        },
        genreScores: { a: "pop", b: "hiphop", c: "jazz", d: "rock" }
    },
    {
        question: "Pick an instrument:",
        answers: {
            a: "Synthesizer or piano",
            b: "Drum machine or turntable",
            c: "Saxophone or acoustic guitar",
            d: "Electric guitar or bass"
        },
        genreScores: { a: "pop", b: "hiphop", c: "jazz", d: "rock" }
    }
];
let userAnswers = { pop: 0, hiphop: 0, jazz: 0, rock: 0 };
// Render quiz questions with clickable answer boxes
function displayQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        Object.entries(q.answers).forEach(([key, value]) => {
            const answerDiv = document.createElement("div");
            answerDiv.classList.add("answer");
            answerDiv.textContent = value;
            answerDiv.dataset.genre = q.genreScores[key];
            answerDiv.dataset.questionIndex = index;
            // Click event for selecting an answer
            answerDiv.addEventListener("click", function () {
                // Deselect all answers in the same question
                document.querySelectorAll(`.answer[data-question-index="${index}"]`).forEach(el => {
                    el.classList.remove("selected");
                });
                // Select the clicked answer
                this.classList.add("selected");
            });
            questionDiv.appendChild(answerDiv);
        });
        quizContainer.appendChild(questionDiv);
    });
}
displayQuiz();
// Calculate results
submitButton.addEventListener("click", () => {
    userAnswers = { pop: 0, hiphop: 0, jazz: 0, rock: 0 }; // Reset scores
    const selectedAnswers = document.querySelectorAll(".answer.selected");
    selectedAnswers.forEach(answer => {
        userAnswers[answer.dataset.genre]++;
    });
    const result = Object.keys(userAnswers).reduce((a, b) => userAnswers[a] > userAnswers[b] ? a : b);
    const genreDescriptions = {
        pop: "You're fun, social, and love a good hit song. Pop music is all about catchy tunes and good vibes!",
        hiphop: "You're confident, bold, and love strong beats. Hip-hop is all about rhythm, poetry, and energy!",
        jazz: "You're deep, artistic, and appreciate complexity. Jazz is all about improvisation and feeling the music.",
        rock: "You're rebellious, passionate, and love raw emotion. Rock music is all about powerful chords and intense performances!"
    };
    resultContainer.innerHTML = `<h2>Your Music Genre: ${result.toUpperCase()}</h2><p>${genreDescriptions[result]}</p>`;
});