import pygame
import sys
import random
from enum import Enum
from colors import *
from ui_components import Button, display_text
from screens import *

class GameMode(Enum):
    MENU = 1
    ALPHABET = 2
    NUMBERS = 3
    QUIZ = 4
    GAME_OVER = 5

class AlphabetLearningGame:
    def __init__(self):
        pygame.init()
        self.WIDTH = 1000
        self.HEIGHT = 700
        self.screen = pygame.display.set_mode((self.WIDTH, self.HEIGHT))
        pygame.display.set_caption("ABC & 123 - Learn & Play!")
        self.clock = pygame.time.Clock()
        self.running = True
        self.current_mode = GameMode.MENU
        self.font_large = pygame.font.Font(None, 80)
        self.font_medium = pygame.font.Font(None, 50)
        self.font_small = pygame.font.Font(None, 30)
        
        # Initialize screens
        self.menu_screen = MenuScreen(self)
        self.alphabet_screen = AlphabetScreen(self)
        self.numbers_screen = NumbersScreen(self)
        self.quiz_screen = QuizScreen(self)
        
    def change_mode(self, new_mode):
        self.current_mode = new_mode
        
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_pos = pygame.mouse.get_pos()
                if self.current_mode == GameMode.MENU:
                    self.menu_screen.handle_click(mouse_pos)
                elif self.current_mode == GameMode.ALPHABET:
                    self.alphabet_screen.handle_click(mouse_pos)
                elif self.current_mode == GameMode.NUMBERS:
                    self.numbers_screen.handle_click(mouse_pos)
                elif self.current_mode == GameMode.QUIZ:
                    self.quiz_screen.handle_click(mouse_pos)
            elif event.type == pygame.KEYDOWN:
                if self.current_mode == GameMode.QUIZ:
                    self.quiz_screen.handle_key(event.key)
                    
    def update(self):
        pass
        
    def render(self):
        self.screen.fill(LIGHT_BLUE)
        
        if self.current_mode == GameMode.MENU:
            self.menu_screen.draw()
        elif self.current_mode == GameMode.ALPHABET:
            self.alphabet_screen.draw()
        elif self.current_mode == GameMode.NUMBERS:
            self.numbers_screen.draw()
        elif self.current_mode == GameMode.QUIZ:
            self.quiz_screen.draw()
            
        pygame.display.flip()
        
    def run(self):
        while self.running:
            self.handle_events()
            self.update()
            self.render()
            self.clock.tick(60)
            
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    game = AlphabetLearningGame()
    game.run()
