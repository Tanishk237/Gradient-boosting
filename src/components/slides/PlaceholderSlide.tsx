import React from 'react';

interface PlaceholderSlideProps {
  slideNumber: number;
  title: string;
}

const PlaceholderSlide: React.FC<PlaceholderSlideProps> = ({ slideNumber, title }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-primary"></div>
          </div>
          <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            Slide {slideNumber}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-3xl">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-secondary rounded-lg mx-auto flex items-center justify-center">
              <div className="w-8 h-8 bg-muted-foreground rounded"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Content Placeholder
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              This slide is ready for your content. You can add various elements including:
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Text content</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Interactive simulations</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Charts and visualizations</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Code examples</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Animations</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Interactive elements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSlide;
