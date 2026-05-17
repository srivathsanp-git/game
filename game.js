// Game Constants
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 700;

// Colors
const COLORS = {
    LIGHT_BLUE: '#add8e6',
    DARK_BLUE: '#1e90ff',
    WHITE: '#ffffff',
    BLACK: '#000000',
    RED: '#ff6464',
    GREEN: '#64ff64',
    YELLOW: '#ffff64',
    PURPLE: '#c864ff',
    ORANGE: '#ffa500',
    PINK: '#ffc0cb',
    LIGHT_GREEN: '#90ee90',
    LIGHT_CORAL: '#f08080'
};

// Game Modes
const GameMode = {
    MENU: 'menu',
    ALPHABET: 'alphabet',
    NUMBERS: 'numbers',
    QUIZ: 'quiz'
};

// Button Class
class Button {
    constructor(x, y, width, height, text, color, textColor = COLORS.BLACK, fontSize = 40) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.hovered = false;
    }

    draw(ctx) {
        const color = this.hovered ? this.lightenColor(this.color) : this.color;
        
        // Draw rounded rectangle
        ctx.fillStyle = color;
        this.drawRoundRect(ctx, this.x, this.y, this.width, this.height, 15);
        ctx.fill();
        
        ctx.strokeStyle = COLORS.BLACK;
        ctx.lineWidth = 3;
        this.drawRoundRect(ctx, this.x, this.y, this.width, this.height, 15);
        ctx.stroke();
        
        // Draw text
        ctx.fillStyle = this.textColor;
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    isClicked(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }

    updateHover(x, y) {
        this.hovered = this.isClicked(x, y);
    }

    lightenColor(color) {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + 30);
        const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + 30);
        const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + 30);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}

// Main Game Class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentMode = GameMode.MENU;
        this.mousePos = { x: 0, y: 0 };
        
        // Responsive canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Event listeners
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // Initialize screens
        this.menuScreen = new MenuScreen(this);
        this.alphabetScreen = new AlphabetScreen(this);
        this.numbersScreen = new NumbersScreen(this);
        this.quizScreen = new QuizScreen(this);
        
        // Start game loop
        this.gameLoop();
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const scale = Math.min(window.innerWidth / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT, 1);
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
        this.mousePos.y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
    }

    handleClick(e) {
        switch (this.currentMode) {
            case GameMode.MENU:
                this.menuScreen.handleClick(this.mousePos.x, this.mousePos.y);
                break;
            case GameMode.ALPHABET:
                this.alphabetScreen.handleClick(this.mousePos.x, this.mousePos.y);
                break;
            case GameMode.NUMBERS:
                this.numbersScreen.handleClick(this.mousePos.x, this.mousePos.y);
                break;
            case GameMode.QUIZ:
                this.quizScreen.handleClick(this.mousePos.x, this.mousePos.y);
                break;
        }
    }

    changeMode(mode) {
        this.currentMode = mode;
        if (mode === GameMode.ALPHABET) {
            this.alphabetScreen.reset();
        } else if (mode === GameMode.NUMBERS) {
            this.numbersScreen.reset();
        } else if (mode === GameMode.QUIZ) {
            this.quizScreen.reset();
        }
    }

    gameLoop() {
        this.ctx.fillStyle = COLORS.LIGHT_BLUE;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        switch (this.currentMode) {
            case GameMode.MENU:
                this.menuScreen.draw(this.ctx, this.mousePos);
                break;
            case GameMode.ALPHABET:
                this.alphabetScreen.draw(this.ctx, this.mousePos);
                break;
            case GameMode.NUMBERS:
                this.numbersScreen.draw(this.ctx, this.mousePos);
                break;
            case GameMode.QUIZ:
                this.quizScreen.draw(this.ctx, this.mousePos);
                break;
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

// Menu Screen
class MenuScreen {
    constructor(game) {
        this.game = game;
        this.buttons = [
            new Button(200, 200, 600, 100, '🔤 Learn Alphabets', COLORS.PURPLE, COLORS.WHITE, 50),
            new Button(200, 350, 600, 100, '🔢 Learn Numbers', COLORS.ORANGE, COLORS.WHITE, 50),
            new Button(200, 500, 600, 100, '🎮 Quiz Challenge', COLORS.PINK, COLORS.WHITE, 50)
        ];
    }

    draw(ctx, mousePos) {
        // Title
        ctx.fillStyle = COLORS.DARK_BLUE;
        ctx.font = 'bold 100px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ABC & 123', CANVAS_WIDTH / 2, 50);

        // Subtitle
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = '40px Arial';
        ctx.fillText('Learn Alphabets & Numbers!', CANVAS_WIDTH / 2, 130);

        // Buttons
        this.buttons.forEach(btn => {
            btn.updateHover(mousePos.x, mousePos.y);
            btn.draw(ctx);
        });
    }

    handleClick(x, y) {
        if (this.buttons[0].isClicked(x, y)) {
            this.game.changeMode(GameMode.ALPHABET);
        } else if (this.buttons[1].isClicked(x, y)) {
            this.game.changeMode(GameMode.NUMBERS);
        } else if (this.buttons[2].isClicked(x, y)) {
            this.game.changeMode(GameMode.QUIZ);
        }
    }
}

// Alphabet Screen
class AlphabetScreen {
    constructor(game) {
        this.game = game;
        this.currentIndex = 0;
        this.alphabets = [
            { letter: 'A', word: 'Apple', description: 'A is for Apple', emoji: '🍎' },
            { letter: 'B', word: 'Ball', description: 'B is for Ball', emoji: '🔴' },
            { letter: 'C', word: 'Cat', description: 'C is for Cat', emoji: '🐱' },
            { letter: 'D', word: 'Dog', description: 'D is for Dog', emoji: '🐕' },
            { letter: 'E', word: 'Elephant', description: 'E is for Elephant', emoji: '🐘' },
            { letter: 'F', word: 'Fish', description: 'F is for Fish', emoji: '🐟' },
            { letter: 'G', word: 'Giraffe', description: 'G is for Giraffe', emoji: '🦒' },
            { letter: 'H', word: 'House', description: 'H is for House', emoji: '🏠' },
            { letter: 'I', word: 'Ice Cream', description: 'I is for Ice Cream', emoji: '🍦' },
            { letter: 'J', word: 'Jellyfish', description: 'J is for Jellyfish', emoji: '🪼' },
            { letter: 'K', word: 'Kite', description: 'K is for Kite', emoji: '🪁' },
            { letter: 'L', word: 'Lion', description: 'L is for Lion', emoji: '🦁' },
            { letter: 'M', word: 'Monkey', description: 'M is for Monkey', emoji: '🐵' },
            { letter: 'N', word: 'Nest', description: 'N is for Nest', emoji: '🪺' },
            { letter: 'O', word: 'Orange', description: 'O is for Orange', emoji: '🍊' },
            { letter: 'P', word: 'Penguin', description: 'P is for Penguin', emoji: '🐧' },
            { letter: 'Q', word: 'Queen', description: 'Q is for Queen', emoji: '👑' },
            { letter: 'R', word: 'Rabbit', description: 'R is for Rabbit', emoji: '🐰' },
            { letter: 'S', word: 'Sun', description: 'S is for Sun', emoji: '☀️' },
            { letter: 'T', word: 'Tiger', description: 'T is for Tiger', emoji: '🐯' },
            { letter: 'U', word: 'Umbrella', description: 'U is for Umbrella', emoji: '☂️' },
            { letter: 'V', word: 'Violin', description: 'V is for Violin', emoji: '🎻' },
            { letter: 'W', word: 'Whale', description: 'W is for Whale', emoji: '🐋' },
            { letter: 'X', word: 'Xylophone', description: 'X is for Xylophone', emoji: '🎵' },
            { letter: 'Y', word: 'Yo-yo', description: 'Y is for Yo-yo', emoji: '🎪' },
            { letter: 'Z', word: 'Zebra', description: 'Z is for Zebra', emoji: '🦓' }
        ];

        this.backButton = new Button(20, 20, 120, 50, '← Back', COLORS.LIGHT_CORAL, COLORS.BLACK, 30);
        this.prevButton = new Button(50, 600, 150, 60, '← Previous', COLORS.LIGHT_GREEN, COLORS.BLACK, 30);
        this.nextButton = new Button(800, 600, 150, 60, 'Next →', COLORS.LIGHT_GREEN, COLORS.BLACK, 30);
        this.speakButton = new Button(420, 350, 160, 50, '🔊 Say', COLORS.YELLOW, COLORS.BLACK, 30);
    }

    speak() {
        const current = this.alphabets[this.currentIndex];
        const text = `${current.letter} for ${current.word}`;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        
        // Speak
        window.speechSynthesis.speak(utterance);
    }

    reset() {
        this.currentIndex = 0;
        // Auto-speak the first letter
        setTimeout(() => this.speak(), 500);
    }

    draw(ctx, mousePos) {
        const current = this.alphabets[this.currentIndex];

        // Back button
        this.backButton.updateHover(mousePos.x, mousePos.y);
        this.backButton.draw(ctx);

        // Title
        ctx.fillStyle = COLORS.DARK_BLUE;
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Learn Alphabets', CANVAS_WIDTH / 2, 50);

        // Large letter in circle
        ctx.fillStyle = COLORS.PURPLE;
        ctx.beginPath();
        ctx.arc(CANVAS_WIDTH / 2, 250, 130, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.WHITE;
        ctx.font = 'bold 250px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(current.letter, CANVAS_WIDTH / 2, 250);

        // Emoji image below letter
        ctx.font = '100px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(current.emoji, CANVAS_WIDTH / 2, 380);

        // Description
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = '40px Arial';
        ctx.fillText(current.description, CANVAS_WIDTH / 2, 430);

        // Word box
        ctx.fillStyle = COLORS.ORANGE;
        ctx.fillRect(200, 480, 600, 80);
        ctx.strokeStyle = COLORS.BLACK;
        ctx.lineWidth = 2;
        ctx.strokeRect(200, 480, 600, 80);

        ctx.fillStyle = COLORS.WHITE;
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(current.word, CANVAS_WIDTH / 2, 520);

        // Progress
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = '35px Arial';
        ctx.fillText(`${this.currentIndex + 1} / ${this.alphabets.length}`, CANVAS_WIDTH / 2, 100);

        // Speak button
        this.speakButton.updateHover(mousePos.x, mousePos.y);
        this.speakButton.draw(ctx);

        // Navigation buttons
        this.prevButton.updateHover(mousePos.x, mousePos.y);
        this.nextButton.updateHover(mousePos.x, mousePos.y);
        this.prevButton.draw(ctx);
        this.nextButton.draw(ctx);
    }

    handleClick(x, y) {
        if (this.backButton.isClicked(x, y)) {
            this.game.changeMode(GameMode.MENU);
        } else if (this.speakButton.isClicked(x, y)) {
            this.speak();
        } else if (this.prevButton.isClicked(x, y)) {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            // Auto-speak when changing to next/previous letter
            setTimeout(() => this.speak(), 300);
        } else if (this.nextButton.isClicked(x, y)) {
            this.currentIndex = Math.min(this.alphabets.length - 1, this.currentIndex + 1);
            // Auto-speak when changing to next/previous letter
            setTimeout(() => this.speak(), 300);
        }
    }
}

// Numbers Screen
class NumbersScreen {
    constructor(game) {
        this.game = game;
        this.currentNumber = 1;
        
        this.backButton = new Button(20, 20, 120, 50, '← Back', COLORS.LIGHT_CORAL, COLORS.BLACK, 30);
        this.prevButton = new Button(50, 600, 150, 60, '← Previous', COLORS.LIGHT_GREEN, COLORS.BLACK, 30);
        this.nextButton = new Button(800, 600, 150, 60, 'Next →', COLORS.LIGHT_GREEN, COLORS.BLACK, 30);
    }

    reset() {
        this.currentNumber = 1;
    }

    draw(ctx, mousePos) {
        this.backButton.updateHover(mousePos.x, mousePos.y);
        this.backButton.draw(ctx);

        // Title
        ctx.fillStyle = COLORS.DARK_BLUE;
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Learn Numbers', CANVAS_WIDTH / 2, 50);

        // Number box
        ctx.fillStyle = COLORS.ORANGE;
        ctx.fillRect(250, 150, 500, 250);
        ctx.strokeStyle = COLORS.BLACK;
        ctx.lineWidth = 3;
        ctx.strokeRect(250, 150, 500, 250);

        ctx.fillStyle = COLORS.WHITE;
        ctx.font = 'bold 250px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.currentNumber, CANVAS_WIDTH / 2, 280);

        // Count with circles
        const circleCount = Math.min(this.currentNumber, 20);
        ctx.fillStyle = COLORS.DARK_BLUE;
        for (let i = 0; i < circleCount; i++) {
            const x = 150 + (i % 10) * 70;
            const y = 430 + Math.floor(i / 10) * 70;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        }

        // Word representation
        const wordNumbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
        if (this.currentNumber <= 10) {
            ctx.fillStyle = COLORS.BLACK;
            ctx.font = '50px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(wordNumbers[this.currentNumber - 1], CANVAS_WIDTH / 2, 570);
        }

        // Progress
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = '35px Arial';
        ctx.fillText(`${this.currentNumber} / 20`, CANVAS_WIDTH / 2, 100);

        // Navigation buttons
        this.prevButton.updateHover(mousePos.x, mousePos.y);
        this.nextButton.updateHover(mousePos.x, mousePos.y);
        this.prevButton.draw(ctx);
        this.nextButton.draw(ctx);
    }

    handleClick(x, y) {
        if (this.backButton.isClicked(x, y)) {
            this.game.changeMode(GameMode.MENU);
        } else if (this.prevButton.isClicked(x, y)) {
            this.currentNumber = Math.max(1, this.currentNumber - 1);
        } else if (this.nextButton.isClicked(x, y)) {
            this.currentNumber = Math.min(20, this.currentNumber + 1);
        }
    }
}

// Quiz Screen
class QuizScreen {
    constructor(game) {
        this.game = game;
        this.score = 0;
        this.totalQuestions = 0;
        this.currentQuestion = 0;
        this.quizMode = 'alphabet';
        this.questions = [];
        this.backButton = new Button(20, 20, 120, 50, '← Back', COLORS.LIGHT_CORAL, COLORS.BLACK, 30);
        this.feedbackMessage = '';
        this.feedbackColor = COLORS.GREEN;
        this.feedbackTimer = 0;
        this.waitingForNext = false;
        this.nextDelay = 0;
        this.celebrationStars = [];
    }

    setFeedback(message, color, speechText) {
        this.feedbackMessage = message;
        this.feedbackColor = color;
        this.feedbackTimer = 120;
        if (speechText && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }

    createCelebration() {
        this.celebrationStars = [];
        for (let i = 0; i < 20; i++) {
            this.celebrationStars.push({
                x: 200 + Math.random() * 600,
                y: 250 + Math.random() * 200,
                size: 8 + Math.random() * 10,
                angle: Math.random() * Math.PI * 2,
                speed: 1 + Math.random() * 2,
                color: [COLORS.YELLOW, COLORS.ORANGE, COLORS.PINK, COLORS.GREEN][Math.floor(Math.random() * 4)]
            });
        }
    }

    advanceQuestion() {
        this.currentQuestion += 1;
        this.feedbackMessage = '';
        this.waitingForNext = false;
        this.nextDelay = 0;
        if (this.currentQuestion >= this.totalQuestions) {
            this.currentQuestion = this.totalQuestions;
        }
    }

    reset() {
        this.score = 0;
        this.totalQuestions = 0;
        this.currentQuestion = 0;
        this.quizMode = Math.random() > 0.5 ? 'alphabet' : 'number';
        this.generateQuestions();
    }

    generateQuestions() {
        this.questions = [];
        
        if (this.quizMode === 'alphabet') {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            for (let i = 0; i < 5; i++) {
                const correctLetter = letters[Math.floor(Math.random() * letters.length)];
                const correctIndex = letters.indexOf(correctLetter);
                const prevLetter = correctIndex > 0 ? letters[correctIndex - 1] : letters[0];
                
                const wrongLetters = letters.filter(l => l !== correctLetter).sort(() => Math.random() - 0.5).slice(0, 3);
                const options = [correctLetter, ...wrongLetters].sort(() => Math.random() - 0.5);
                
                this.questions.push({
                    question: `What comes after ${prevLetter}?`,
                    correct: correctLetter,
                    options: options
                });
            }
        } else {
            for (let i = 0; i < 5; i++) {
                const correctNum = Math.floor(Math.random() * 10) + 1;
                const wrongNums = [];
                while (wrongNums.length < 3) {
                    const num = Math.floor(Math.random() * 20) + 1;
                    if (num !== correctNum && !wrongNums.includes(num)) {
                        wrongNums.push(num);
                    }
                }
                const options = [correctNum, ...wrongNums].sort(() => Math.random() - 0.5);
                
                this.questions.push({
                    question: `What is ${correctNum - 1} + 1?`,
                    correct: correctNum,
                    options: options
                });
            }
        }
        
        this.totalQuestions = this.questions.length;
        this.currentQuestion = 0;
    }

    draw(ctx, mousePos) {
        if (this.feedbackTimer > 0) {
            this.feedbackTimer -= 1;
        }

        if (this.waitingForNext) {
            this.nextDelay -= 1;
            if (this.nextDelay <= 0) {
                this.advanceQuestion();
            }
        }

        this.backButton.updateHover(mousePos.x, mousePos.y);
        this.backButton.draw(ctx);

        if (this.currentQuestion >= this.totalQuestions) {
            this.drawResults(ctx, mousePos);
            return;
        }

        const question = this.questions[this.currentQuestion];

        // Title
        const modeText = this.quizMode === 'alphabet' ? 'Alphabet Quiz' : 'Number Quiz';
        ctx.fillStyle = COLORS.DARK_BLUE;
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(modeText, CANVAS_WIDTH / 2, 50);

        // Progress
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = '35px Arial';
        ctx.fillText(`Question ${this.currentQuestion + 1} / ${this.totalQuestions}`, CANVAS_WIDTH / 2, 100);

        // Question
        ctx.fillStyle = COLORS.BLACK;
        ctx.font = 'bold 50px Arial';
        ctx.fillText(question.question, CANVAS_WIDTH / 2, 200);

        // Answer buttons
        const colors = [COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK, COLORS.GREEN];
        question.options.forEach((option, i) => {
            const x = 150 + (i % 2) * 400;
            const y = 350 + Math.floor(i / 2) * 120;
            const btn = new Button(x, y, 300, 100, String(option), colors[i], COLORS.WHITE, 50);
            btn.updateHover(mousePos.x, mousePos.y);
            btn.draw(ctx);
        });

        // Score
        ctx.fillStyle = COLORS.GREEN;
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Score: ${this.score}`, CANVAS_WIDTH - 50, 100);

        if (this.feedbackMessage) {
            ctx.fillStyle = this.feedbackColor;
            ctx.font = 'bold 45px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.feedbackMessage, CANVAS_WIDTH / 2, 300);
        }

        if (this.waitingForNext && this.celebrationStars.length) {
            this.celebrationStars.forEach(star => {
                star.y -= star.speed;
                star.x += Math.cos(star.angle) * star.speed;
                ctx.fillStyle = star.color;
                ctx.font = `${star.size}px Arial`;
                ctx.fillText('★', star.x, star.y);
            });
        }
    }

    drawResults(ctx, mousePos) {
        // Title
        ctx.fillStyle = COLORS.DARK_BLUE;
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Quiz Complete!', CANVAS_WIDTH / 2, 100);

        // Score
        ctx.fillStyle = COLORS.GREEN;
        ctx.font = 'bold 70px Arial';
        ctx.fillText(`${this.score}/${this.totalQuestions}`, CANVAS_WIDTH / 2, 250);

        // Message
        const percentage = (this.score / this.totalQuestions) * 100;
        let message = 'Keep Practicing! 💪';
        if (percentage === 100) message = 'Perfect! 🌟';
        else if (percentage >= 80) message = 'Great Job! ⭐';
        else if (percentage >= 60) message = 'Good Effort! 👍';

        ctx.fillStyle = COLORS.PURPLE;
        ctx.font = 'bold 50px Arial';
        ctx.fillText(message, CANVAS_WIDTH / 2, 380);

        // Restart button
        const restartBtn = new Button(300, 480, 400, 100, 'Return to Menu', COLORS.LIGHT_GREEN, COLORS.BLACK, 40);
        restartBtn.updateHover(mousePos.x, mousePos.y);
        restartBtn.draw(ctx);
    }

    handleClick(x, y) {
        if (this.backButton.isClicked(x, y)) {
            this.game.changeMode(GameMode.MENU);
            return;
        }

        if (this.currentQuestion >= this.totalQuestions) {
            const restartBtn = new Button(300, 480, 400, 100, 'Return to Menu', COLORS.LIGHT_GREEN, COLORS.BLACK, 40);
            if (restartBtn.isClicked(x, y)) {
                this.game.changeMode(GameMode.MENU);
            }
            return;
        }

        const question = this.questions[this.currentQuestion];
        const colors = [COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK, COLORS.GREEN];
        let clickedCorrect = false;

        question.options.forEach((option, i) => {
            const btnX = 150 + (i % 2) * 400;
            const btnY = 350 + Math.floor(i / 2) * 120;
            const btn = new Button(btnX, btnY, 300, 100, String(option), colors[i], COLORS.WHITE, 50);
            
            if (btn.isClicked(x, y)) {
                if (option === question.correct) {
                    clickedCorrect = true;
                    this.score++;
                    this.setFeedback('Great! Correct!', COLORS.GREEN, 'Correct!');
                    this.waitingForNext = true;
                    this.nextDelay = 60;
                    this.createCelebration();
                } else {
                    this.setFeedback('Wrong answer. Try again.', COLORS.RED, 'Wrong answer. Try again.');
                }
            }
        });

        if (clickedCorrect && !this.waitingForNext) {
            this.waitingForNext = true;
            this.nextDelay = 60;
        }
    }
}

// Start the game
window.addEventListener('load', () => {
    new Game();
});
