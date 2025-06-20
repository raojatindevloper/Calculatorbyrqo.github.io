let currentInput = "";
let history = "";

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

function addToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
    playClickSound();
    animateButton(event.target);
}

function clearDisplay() {
    currentInput = "";
    display.value = "";
    history = "";
    historyDisplay.textContent = "";
    playClickSound();
    animateButton(event.target);
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    playClickSound();
    animateButton(event.target);
}

function calculate() {
    try {
        history = currentInput;
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
        historyDisplay.textContent = history + " =";
        playClickSound();
        animateButton(event.target);
        
        // Add celebration effect for successful calculation
        if (!isNaN(currentInput)) {
            celebrate();
        }
    } catch (error) {
        display.value = "Error";
        currentInput = "";
        playErrorSound();
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.getAttribute("data-theme") === "dark") {
        body.setAttribute("data-theme", "light");
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    } else {
        body.setAttribute("data-theme", "dark");
        document.querySelector('.theme-toggle i').className = 'fas fa-moon';
    }
    playClickSound();
    animateButton(document.querySelector('.theme-toggle'));
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (/[0-9+\-*/.%()]/.test(key)) {
        addToDisplay(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        backspace();
    }
});

// Click Sound Effect
function playClickSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio error:", e));
}

function playErrorSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio error:", e));
}

// Button animation
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// Celebration effect
function celebrate() {
    const calculator = document.querySelector('.calculator');
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    calculator.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}