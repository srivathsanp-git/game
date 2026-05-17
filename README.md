# ABC & 123 - Learn & Play Game 🎮

A fun, interactive educational game designed for kids to learn alphabets and numbers!

## Features

### 🔤 Learn Alphabets
- Explore all 26 letters of the alphabet
- Each letter has an associated word and description
- Navigate through letters using Previous/Next buttons
- Visual learning with large letter displays and colorful backgrounds

### 🔢 Learn Numbers
- Learn counting from 1 to 20
- Visual representation with counting circles
- Word representation for numbers 1-10
- Progressive learning experience

### 🎮 Quiz Challenge
- Random alphabet quiz questions
- Random number quiz questions
- Multiple choice answers
- Score tracking and results screen
- Motivational messages based on performance
- 5 questions per quiz session

## How to Run

### Requirements
- Python 3.7+
- Pygame 2.5.2

### Installation

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Run the game:**
```bash
python main.py
```

## How to Play

### Main Menu
Click on any of the three options:
- **Learn Alphabets** - Explore the alphabet with words and descriptions
- **Learn Numbers** - Count and learn numbers from 1-20
- **Quiz Challenge** - Test your knowledge with fun questions

### Navigation
- Use **← Previous** and **Next →** buttons to navigate through lessons
- Use **← Back** button to return to the main menu
- Click on buttons to interact with the game

### Quiz Mode
- Click on the correct answer from the multiple choice options
- Your score will be tracked throughout the quiz
- View your final score and performance rating at the end

## Game Components

### Files
- `main.py` - Main game loop and mode management
- `screens.py` - Game screens (Menu, Alphabet, Numbers, Quiz)
- `ui_components.py` - Button and text display components
- `colors.py` - Color definitions for the game
- `requirements.txt` - Python dependencies

### Colors Used
- Purple, Orange, Pink, Green, Yellow for interactive elements
- Light blue background for a friendly, kid-safe environment
- Dark blue for titles and important text

## Tips for Kids

1. **Start with Learn Alphabets** to get familiar with all letters
2. **Practice with Learn Numbers** to improve counting skills
3. **Challenge yourself with Quiz** to test what you've learned
4. Take your time - there's no rush! Learning should be fun
5. Try the quiz multiple times to improve your score

## Customization

You can easily customize:
- Colors by editing `colors.py`
- Alphabet words/descriptions in `screens.py` (AlphabetScreen class)
- Number range in `screens.py` (NumbersScreen class)
- Quiz difficulty by modifying `QuizScreen.generate_questions()`

---

**Enjoy learning! 🌟**
