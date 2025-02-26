const quizData = [
    {
        question: "Pick a color:",
        options: { "Ariel": "Red", "Cinderella": "Blue", "Maleficent": "Green", "Ursula": "Purple" }
    },
    {
        question: "Choose a pet:",
        options: { "Ariel": "Fish", "Cinderella": "Mice", "Maleficent": "Raven", "Ursula": "Eels" }
    },
    {
        question: "What describes you best?",
        options: { "Ariel": "Adventurous", "Cinderella": "Kind", "Maleficent": "Powerful", "Ursula": "Cunning" }
    }
];
const princesses = ["Ariel", "Cinderella"];
const villains = ["Maleficent", "Ursula"];
const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
// Render Quiz Questions
quizData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");
    Object.keys(item.options).forEach((key) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="q${index}" value="${key}"> ${item.options[key]}`;
        optionsDiv.appendChild(label);
    });
    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
});
// Handle Quiz Submission
submitButton.addEventListener("click", () => {
    let scores = { "Ariel": 0, "Cinderella": 0, "Maleficent": 0, "Ursula": 0 };
    let allAnswered = true;
    quizData.forEach((_, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            scores[selected.value]++;
        } else {
            allAnswered = false;
        }
    });
    if (!allAnswered) {
        alert("Please answer all questions!");
        return;
    }
    // Determine result
    const princess = princesses.reduce((a, b) => (scores[a] > scores[b] ? a : b));
    const villain = villains.reduce((a, b) => (scores[a] > scores[b] ? a : b));
    resultContainer.innerHTML = `You are <strong>${princess}</strong> and <strong>${villain}</strong>!`;
    resultContainer.classList.remove("hidden");
});