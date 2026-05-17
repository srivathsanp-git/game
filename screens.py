import pygame
import random
from colors import *
from ui_components import Button, display_text

class MenuScreen:
    def __init__(self, game):
        self.game = game
        self.width = game.WIDTH
        self.height = game.HEIGHT
        
        # Create buttons
        self.buttons = [
            Button(200, 200, 600, 100, "🔤 Learn Alphabets", PURPLE, WHITE, pygame.font.Font(None, 50)),
            Button(200, 350, 600, 100, "🔢 Learn Numbers", ORANGE, WHITE, pygame.font.Font(None, 50)),
            Button(200, 500, 600, 100, "🎮 Quiz Challenge", PINK, WHITE, pygame.font.Font(None, 50)),
        ]
        
    def draw(self):
        screen = self.game.screen
        
        # Title
        title_font = pygame.font.Font(None, 100)
        display_text(screen, "ABC & 123", title_font, DARK_BLUE, self.width // 2, 50, center=True)
        
        subtitle_font = pygame.font.Font(None, 40)
        display_text(screen, "Learn Alphabets & Numbers!", subtitle_font, BLACK, self.width // 2, 130, center=True)
        
        # Draw buttons
        mouse_pos = pygame.mouse.get_pos()
        for button in self.buttons:
            button.update_hover(mouse_pos)
            button.draw(screen)
            
    def handle_click(self, pos):
        if self.buttons[0].is_clicked(pos):
            self.game.change_mode(self.game.GameMode.ALPHABET)
            self.game.alphabet_screen.reset()
        elif self.buttons[1].is_clicked(pos):
            self.game.change_mode(self.game.GameMode.NUMBERS)
            self.game.numbers_screen.reset()
        elif self.buttons[2].is_clicked(pos):
            self.game.change_mode(self.game.GameMode.QUIZ)
            self.game.quiz_screen.reset()

class AlphabetScreen:
    def __init__(self, game):
        self.game = game
        self.width = game.WIDTH
        self.height = game.HEIGHT
        self.current_index = 0
        self.alphabets = [
            {'letter': 'A', 'word': 'Apple', 'description': 'A is for Apple'},
            {'letter': 'B', 'word': 'Ball', 'description': 'B is for Ball'},
            {'letter': 'C', 'word': 'Cat', 'description': 'C is for Cat'},
            {'letter': 'D', 'word': 'Dog', 'description': 'D is for Dog'},
            {'letter': 'E', 'word': 'Elephant', 'description': 'E is for Elephant'},
            {'letter': 'F', 'word': 'Fish', 'description': 'F is for Fish'},
            {'letter': 'G', 'word': 'Giraffe', 'description': 'G is for Giraffe'},
            {'letter': 'H', 'word': 'House', 'description': 'H is for House'},
            {'letter': 'I', 'word': 'Ice Cream', 'description': 'I is for Ice Cream'},
            {'letter': 'J', 'word': 'Jellyfish', 'description': 'J is for Jellyfish'},
            {'letter': 'K', 'word': 'Kite', 'description': 'K is for Kite'},
            {'letter': 'L', 'word': 'Lion', 'description': 'L is for Lion'},
            {'letter': 'M', 'word': 'Monkey', 'description': 'M is for Monkey'},
            {'letter': 'N', 'word': 'Nest', 'description': 'N is for Nest'},
            {'letter': 'O', 'word': 'Orange', 'description': 'O is for Orange'},
            {'letter': 'P', 'word': 'Penguin', 'description': 'P is for Penguin'},
            {'letter': 'Q', 'word': 'Queen', 'description': 'Q is for Queen'},
            {'letter': 'R', 'word': 'Rabbit', 'description': 'R is for Rabbit'},
            {'letter': 'S', 'word': 'Sun', 'description': 'S is for Sun'},
            {'letter': 'T', 'word': 'Tiger', 'description': 'T is for Tiger'},
            {'letter': 'U', 'word': 'Umbrella', 'description': 'U is for Umbrella'},
            {'letter': 'V', 'word': 'Violin', 'description': 'V is for Violin'},
            {'letter': 'W', 'word': 'Whale', 'description': 'W is for Whale'},
            {'letter': 'X', 'word': 'Xylophone', 'description': 'X is for Xylophone'},
            {'letter': 'Y', 'word': 'Yo-yo', 'description': 'Y is for Yo-yo'},
            {'letter': 'Z', 'word': 'Zebra', 'description': 'Z is for Zebra'},
        ]
        
        self.back_button = Button(20, 20, 120, 50, "← Back", LIGHT_CORAL, BLACK, pygame.font.Font(None, 30))
        self.prev_button = Button(50, 600, 150, 60, "← Previous", LIGHT_GREEN, BLACK, pygame.font.Font(None, 30))
        self.next_button = Button(800, 600, 150, 60, "Next →", LIGHT_GREEN, BLACK, pygame.font.Font(None, 30))
        
    def reset(self):
        self.current_index = 0
        
    def draw(self):
        screen = self.game.screen
        current = self.alphabets[self.current_index]
        
        # Back button
        mouse_pos = pygame.mouse.get_pos()
        self.back_button.update_hover(mouse_pos)
        self.back_button.draw(screen)
        
        # Title
        title_font = pygame.font.Font(None, 60)
        display_text(screen, "Learn Alphabets", title_font, DARK_BLUE, self.width // 2, 50, center=True)
        
        # Large letter display
        letter_font = pygame.font.Font(None, 250)
        pygame.draw.circle(screen, PURPLE, (self.width // 2, 250), 130)
        display_text(screen, current['letter'], letter_font, WHITE, self.width // 2, 250, center=True)
        
        # Description and word
        desc_font = pygame.font.Font(None, 40)
        word_font = pygame.font.Font(None, 50)
        display_text(screen, current['description'], desc_font, BLACK, self.width // 2, 420, center=True)
        pygame.draw.rect(screen, ORANGE, (200, 480, 600, 80), border_radius=15)
        display_text(screen, current['word'], word_font, WHITE, self.width // 2, 520, center=True)
        
        # Progress indicator
        progress_font = pygame.font.Font(None, 35)
        display_text(screen, f"{self.current_index + 1} / {len(self.alphabets)}", progress_font, BLACK, self.width // 2, 100, center=True)
        
        # Navigation buttons
        self.prev_button.update_hover(mouse_pos)
        self.next_button.update_hover(mouse_pos)
        self.prev_button.draw(screen)
        self.next_button.draw(screen)
        
    def handle_click(self, pos):
        if self.back_button.is_clicked(pos):
            self.game.change_mode(self.game.GameMode.MENU)
        elif self.prev_button.is_clicked(pos):
            self.current_index = max(0, self.current_index - 1)
        elif self.next_button.is_clicked(pos):
            self.current_index = min(len(self.alphabets) - 1, self.current_index + 1)

class NumbersScreen:
    def __init__(self, game):
        self.game = game
        self.width = game.WIDTH
        self.height = game.HEIGHT
        self.current_number = 1
        
        self.back_button = Button(20, 20, 120, 50, "← Back", LIGHT_CORAL, BLACK, pygame.font.Font(None, 30))
        self.prev_button = Button(50, 600, 150, 60, "← Previous", LIGHT_GREEN, BLACK, pygame.font.Font(None, 30))
        self.next_button = Button(800, 600, 150, 60, "Next →", LIGHT_GREEN, BLACK, pygame.font.Font(None, 30))
        
    def reset(self):
        self.current_number = 1
        
    def draw(self):
        screen = self.game.screen
        
        # Back button
        mouse_pos = pygame.mouse.get_pos()
        self.back_button.update_hover(mouse_pos)
        self.back_button.draw(screen)
        
        # Title
        title_font = pygame.font.Font(None, 60)
        display_text(screen, "Learn Numbers", title_font, DARK_BLUE, self.width // 2, 50, center=True)
        
        # Large number display
        number_font = pygame.font.Font(None, 250)
        pygame.draw.rect(screen, ORANGE, (250, 150, 500, 250), border_radius=20)
        display_text(screen, str(self.current_number), number_font, WHITE, self.width // 2, 280, center=True)
        
        # Count with objects
        count_text = "🔵 " * min(self.current_number, 20)
        count_font = pygame.font.Font(None, 40)
        display_text(screen, count_text, count_font, BLACK, self.width // 2, 450, center=True)
        
        # Word representation
        word_numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
        if self.current_number <= 10:
            display_text(screen, word_numbers[self.current_number - 1], pygame.font.Font(None, 50), BLACK, self.width // 2, 520, center=True)
        
        # Progress
        progress_font = pygame.font.Font(None, 35)
        display_text(screen, f"{self.current_number} / 20", progress_font, BLACK, self.width // 2, 100, center=True)
        
        # Navigation buttons
        self.prev_button.update_hover(mouse_pos)
        self.next_button.update_hover(mouse_pos)
        self.prev_button.draw(screen)
        self.next_button.draw(screen)
        
    def handle_click(self, pos):
        if self.back_button.is_clicked(pos):
            self.game.change_mode(self.game.GameMode.MENU)
        elif self.prev_button.is_clicked(pos):
            self.current_number = max(1, self.current_number - 1)
        elif self.next_button.is_clicked(pos):
            self.current_number = min(20, self.current_number + 1)

class QuizScreen:
    def __init__(self, game):
        self.game = game
        self.width = game.WIDTH
        self.height = game.HEIGHT
        self.score = 0
        self.total_questions = 0
        self.current_question = 0
        self.quiz_mode = "alphabet"  # "alphabet" or "number"
        self.questions = []
        self.answer_buttons = []
        
        self.back_button = Button(20, 20, 120, 50, "← Back", LIGHT_CORAL, BLACK, pygame.font.Font(None, 30))
        
    def reset(self):
        self.score = 0
        self.total_questions = 0
        self.current_question = 0
        self.quiz_mode = random.choice(["alphabet", "number"])
        self.generate_questions()
        
    def generate_questions(self):
        self.questions = []
        
        if self.quiz_mode == "alphabet":
            # Generate alphabet questions
            for _ in range(5):
                correct_letter = random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
                wrong_letters = random.sample([c for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" if c != correct_letter], 3)
                options = [correct_letter] + wrong_letters
                random.shuffle(options)
                self.questions.append({
                    'question': f"What comes after {chr(ord(correct_letter) - 1)}?",
                    'correct': chr(ord(correct_letter)),
                    'options': options
                })
        else:
            # Generate number questions
            for _ in range(5):
                correct_num = random.randint(1, 10)
                wrong_nums = random.sample([n for n in range(1, 21) if n != correct_num], 3)
                options = [correct_num] + wrong_nums
                random.shuffle(options)
                self.questions.append({
                    'question': f"What is {correct_num - 1} + 1?",
                    'correct': correct_num,
                    'options': options
                })
        
        self.total_questions = len(self.questions)
        self.current_question = 0
        
    def create_answer_buttons(self):
        if self.current_question >= len(self.questions):
            return
        
        question = self.questions[self.current_question]
        self.answer_buttons = []
        
        colors = [PURPLE, ORANGE, PINK, GREEN]
        for i, option in enumerate(question['options']):
            x = 150 + (i % 2) * 400
            y = 400 + (i // 2) * 120
            btn = Button(x, y, 300, 100, str(option), colors[i], WHITE, pygame.font.Font(None, 50))
            self.answer_buttons.append((btn, option))
            
    def draw(self):
        screen = self.game.screen
        
        if self.current_question >= self.total_questions:
            # Show results
            self.draw_results()
            return
        
        # Back button
        mouse_pos = pygame.mouse.get_pos()
        self.back_button.update_hover(mouse_pos)
        self.back_button.draw(screen)
        
        # Title
        title_font = pygame.font.Font(None, 60)
        mode_text = "Alphabet Quiz" if self.quiz_mode == "alphabet" else "Number Quiz"
        display_text(screen, mode_text, title_font, DARK_BLUE, self.width // 2, 30, center=True)
        
        # Progress
        progress_font = pygame.font.Font(None, 35)
        display_text(screen, f"Question {self.current_question + 1} / {self.total_questions}", progress_font, BLACK, self.width // 2, 100, center=True)
        
        if not self.answer_buttons:
            self.create_answer_buttons()
        
        question = self.questions[self.current_question]
        
        # Question
        question_font = pygame.font.Font(None, 50)
        display_text(screen, question['question'], question_font, BLACK, self.width // 2, 200, center=True)
        
        # Answer buttons
        for btn, _ in self.answer_buttons:
            btn.update_hover(mouse_pos)
            btn.draw(screen)
            
        # Score
        score_font = pygame.font.Font(None, 40)
        display_text(screen, f"Score: {self.score}", score_font, GREEN, self.width - 150, 100, center=True)
        
    def draw_results(self):
        screen = self.game.screen
        
        # Back button
        mouse_pos = pygame.mouse.get_pos()
        self.back_button.update_hover(mouse_pos)
        self.back_button.draw(screen)
        
        # Results
        title_font = pygame.font.Font(None, 80)
        display_text(screen, "Quiz Complete!", title_font, DARK_BLUE, self.width // 2, 100, center=True)
        
        score_font = pygame.font.Font(None, 70)
        percentage = (self.score / self.total_questions) * 100
        display_text(screen, f"Score: {self.score}/{self.total_questions}", score_font, GREEN, self.width // 2, 250, center=True)
        
        message_font = pygame.font.Font(None, 50)
        if percentage == 100:
            message = "Perfect! 🌟"
        elif percentage >= 80:
            message = "Great Job! ⭐"
        elif percentage >= 60:
            message = "Good Effort! 👍"
        else:
            message = "Keep Practicing! 💪"
        display_text(screen, message, message_font, PURPLE, self.width // 2, 380, center=True)
        
        # Restart button
        restart_btn = Button(300, 500, 400, 100, "Return to Menu", LIGHT_GREEN, BLACK, pygame.font.Font(None, 50))
        restart_btn.update_hover(mouse_pos)
        restart_btn.draw(screen)
        
    def handle_click(self, pos):
        if self.back_button.is_clicked(pos):
            self.game.change_mode(self.game.GameMode.MENU)
            return
        
        if self.current_question >= self.total_questions:
            # Results screen
            restart_btn = Button(300, 500, 400, 100, "Return to Menu", LIGHT_GREEN, BLACK, pygame.font.Font(None, 50))
            if restart_btn.is_clicked(pos):
                self.game.change_mode(self.game.GameMode.MENU)
            return
        
        # Check answer
        for btn, option in self.answer_buttons:
            if btn.is_clicked(pos):
                question = self.questions[self.current_question]
                if option == question['correct']:
                    self.score += 1
                self.current_question += 1
                self.answer_buttons = []
                return
                
    def handle_key(self, key):
        pass
