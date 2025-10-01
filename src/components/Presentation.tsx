import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface PresentationProps {
  slides: Slide[];
}

const Presentation: React.FC<PresentationProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides.length]);

  return (
    <div className="presentation-container relative">
      {/* Header Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-foreground">
              Gradient Boosting Presentation
            </div>
            <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="h-8 w-8 p-0 hover:bg-muted-foreground/20"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="h-8 w-8 p-0 hover:bg-muted-foreground/20"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToSlide(0)}
              className="h-8 w-8 p-0 hover:bg-muted-foreground/20"
            >
              <Home className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''} ${
            index < currentSlide ? 'prev' : ''
          }`}
        >
          <div className="w-full h-full pt-20 pb-24 px-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {slide.content}
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-1 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border shadow-lg">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-0.5 rounded-full hover:bg-muted-foreground/20 transition-all"
            disabled={currentSlide === 0}
          >
            <svg className="w-2.5 h-2.5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Number Display */}
          <span className="text-xs font-medium text-foreground px-1">
            {currentSlide + 1}/{slides.length}
          </span>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-0.5 rounded-full hover:bg-muted-foreground/20 transition-all"
            disabled={currentSlide === slides.length - 1}
          >
            <svg className="w-2.5 h-2.5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
