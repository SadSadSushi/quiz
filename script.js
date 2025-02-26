const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
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
let selectedAnswers = 0;
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
            answerDiv.addEventListener("click", () => selectAnswer(answerDiv, index));
            questionDiv.appendChild(answerDiv);
        });
        quizContainer.appendChild(questionDiv);
    });
}
function selectAnswer(answerDiv, questionIndex) {
    const previousSelected = document.querySelector(`.answer.selected[data-question-index="${questionIndex}"]`);
    if (previousSelected) previousSelected.classList.remove("selected");
    answerDiv.classList.add("selected");
    userAnswers[answerDiv.dataset.genre]++;
    updateProgressBar();
}
function updateProgressBar() {
    selectedAnswers = document.querySelectorAll(".answer.selected").length;
    const progress = (selectedAnswers / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}
submitButton.addEventListener("click", () => {
    if (selectedAnswers < questions.length) {
        alert("Please answer all the questions before seeing your result!");
        return;
    }
    const result = Object.keys(userAnswers).reduce((a, b) => userAnswers[a] > userAnswers[b] ? a : b);
    const genreDescriptions = {
        pop: "You're fun, social, and love a good hit song. Pop music is all about catchy tunes and good vibes!",
        hiphop: "You're confident, bold, and love strong beats. Hip-hop is all about rhythm, poetry, and energy!",
        jazz: "You're deep, artistic, and appreciate complexity. Jazz is all about improvisation and feeling the music.",
        rock: "You're rebellious, passionate, and love raw emotion. Rock music is all about powerful chords and intense performances!"
    };
    const spotifyEmbeds = {
        pop: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" width="100%" height="380" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        hiphop: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd" width="100%" height="380" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        jazz: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt" width="100%" height="380" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        rock: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U" width="100%" height="380" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
    };
    resultContainer.innerHTML = `
        <h2>Your Music Genre: ${result.toUpperCase()}</h2>
        <p>${genreDescriptions[result]}</p>
        ${spotifyEmbeds[result]}
    `;
});
displayQuiz();