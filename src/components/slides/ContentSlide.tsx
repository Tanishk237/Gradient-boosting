import React from 'react';
import type { SlideData } from '../../data/slidesData';

interface ContentSlideProps {
  slideData: SlideData;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ slideData }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              {slideData.title}
            </h2>
            {slideData.subtitle && (
              <p className="text-lg text-muted-foreground font-light">
                {slideData.subtitle}
              </p>
            )}
            <div className="w-16 h-0.5 bg-primary mt-3"></div>
          </div>
          <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            Slide {slideData.id}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-8">
        {/* Main Content */}
        {slideData.content && slideData.content.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Overview</h3>
            <div className="space-y-3">
              {slideData.content.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Points */}
        {slideData.keyPoints && slideData.keyPoints.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Key Points</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {slideData.keyPoints.map((point, index) => (
                <div key={index} className="bg-secondary/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-foreground leading-relaxed">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visuals */}
        {slideData.visuals && slideData.visuals.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Visual Elements</h3>
            <div className="space-y-2">
              {slideData.visuals.map((visual, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  <span>{visual}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Example */}
        {slideData.code && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Code Example</h3>
            <div className="bg-secondary rounded-lg p-4">
              <pre className="text-sm text-foreground overflow-x-auto">
                <code>{slideData.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Examples */}
        {slideData.examples && slideData.examples.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Examples</h3>
            <div className="space-y-3">
              {slideData.examples.map((example, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground leading-relaxed">{example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Content Sections */}
        <div className="space-y-6">
          {/* You can add more content sections here for large amounts of data */}
          <div className="border-t border-border pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>This slide layout is optimized for large amounts of content.</p>
                  <p>You can add multiple sections, tables, charts, and other elements.</p>
                  <p>The layout automatically adjusts to accommodate more content.</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Content Areas</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Text content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Data tables</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Visualizations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlide;
