import pygame
from colors import *

class Button:
    def __init__(self, x, y, width, height, text, color, text_color=BLACK, font=None):
        self.rect = pygame.Rect(x, y, width, height)
        self.text = text
        self.color = color
        self.text_color = text_color
        self.font = font or pygame.font.Font(None, 40)
        self.hovered = False
        
    def draw(self, screen):
        color = tuple(min(c + 30, 255) for c in self.color) if self.hovered else self.color
        pygame.draw.rect(screen, color, self.rect, border_radius=15)
        pygame.draw.rect(screen, BLACK, self.rect, 3, border_radius=15)
        
        text_surface = self.font.render(self.text, True, self.text_color)
        text_rect = text_surface.get_rect(center=self.rect.center)
        screen.blit(text_surface, text_rect)
        
    def is_clicked(self, pos):
        return self.rect.collidepoint(pos)
    
    def update_hover(self, pos):
        self.hovered = self.rect.collidepoint(pos)

def display_text(screen, text, font, color, x, y, center=False):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    if center:
        text_rect.center = (x, y)
    else:
        text_rect.topleft = (x, y)
    screen.blit(text_surface, text_rect)
