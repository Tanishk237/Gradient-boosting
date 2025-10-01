import React from 'react';
import { ArrowRight, Target, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const TitleSlide: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col h-full p-12 space-y-8 overflow-y-auto">
      {/* Main Title and Description Section */}
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">
          Gradient Boosting: Concepts and Applications
        </h1>
        <p className="text-2xl text-muted-foreground font-light">
          Sequentially correcting errors to build strong models
        </p>
        <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
          Gradient Boosting is a powerful ensemble learning technique that combines multiple weak learners 
          into a strong predictive model. By iteratively correcting errors and focusing on difficult cases, 
          it achieves superior performance across various machine learning tasks.
        </p>
        <div className="text-sm text-muted-foreground pt-4">
          <p>Presented by: [Your Name] | Date: {currentDate}</p>
        </div>
      </div>

      {/* Key Topics and Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Key Topics */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Key Topics</h2>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <p className="text-lg text-foreground">Boosting Fundamentals</p>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <p className="text-lg text-foreground">Sequential Learning</p>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <p className="text-lg text-foreground">Error Correction</p>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <p className="text-lg text-foreground">Real Applications</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Analogy Section */}
        <div className="flex flex-col items-center justify-center bg-secondary/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Visual Analogy: Building a Strong Model</h3>
          <div className="flex items-center space-x-4">
            {/* Small arrows combining into a large arrow */}
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
              <ArrowRight className="h-4 w-4 text-white absolute -top-2 left-1/2 -translate-x-1/2 rotate-45" />
              <ArrowRight className="h-4 w-4 text-white absolute -bottom-2 left-1/2 -translate-x-1/2 -rotate-45" />
              <ArrowRight className="h-4 w-4 text-white absolute left-0 top-1/2 -translate-y-1/2 -rotate-12" />
              <ArrowRight className="h-4 w-4 text-white absolute right-0 top-1/2 -translate-y-1/2 rotate-12" />
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg text-muted-foreground max-w-xs text-center">
              Multiple weak learners (small arrows) combine sequentially to form a powerful model (large arrow).
            </p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Background: Subtle gradient symbolizing "gradient" in Gradient Boosting.</p>
          </div>
        </div>
      </div>

      {/* Bottom Card Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <Card className="bg-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-pink-400 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Forward Pass</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Sequential model training where each new model focuses on previous errors.</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Gradient Descent</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Optimization process that minimizes loss function through iterative updates.</p>
            <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-muted-foreground">
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Ensemble Power</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Combines multiple weak learners to create a strong, accurate predictor.</p>
            <div className="flex justify-end mt-4">
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TitleSlide;
