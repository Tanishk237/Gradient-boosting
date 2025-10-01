import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GradientBoostingVisualization from '@/components/GradientBoostingVisualization';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  RefreshCw, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const HowGradientBoostingWorksSlide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationInterval, setAnimationInterval] = useState<number | null>(null);

  const steps = [
    {
      id: 0,
      title: "Start with a Baseline",
      description: "For regression, the model starts with a simple guess: the mean of all targets.",
      formula: "F₀(x) = ȳ",
      explanation: "where ȳ represents the mean of target values",
      analogy: "Before writing an essay, you first jot down a rough outline.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      id: 1,
      title: "Compute Residuals (Errors)",
      description: "Residual = 'what's left to fix.'",
      formula: "rᵢm = yᵢ - F_{m-1}(xᵢ)",
      explanation: "where rᵢm is the residual for data point i at step m",
      analogy: "Teacher returns test paper → red marks show exactly what mistakes were made.",
      icon: <AlertCircle className="h-6 w-6" />,
      color: "bg-red-500"
    },
    {
      id: 2,
      title: "Fit a Weak Learner on Residuals",
      description: "Train a small decision tree on residuals. The tree's job = predict what the current model got wrong.",
      formula: "h_m(x) = Tree fitted to residuals",
      explanation: "The weak learner learns patterns in the errors",
      analogy: "A tutor focuses only on the topics the student got wrong.",
      icon: <Target className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Update the Model",
      description: "New model = Old model + scaled correction.",
      formula: "F_m(x) = F_{m-1}(x) + η ⋅ h_m(x)",
      explanation: "Here, h_m(x) = correction, η = learning rate (step size)",
      analogy: "Instead of fixing the entire essay in one go, you make small edits each draft, gradually improving.",
      icon: <RefreshCw className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Repeat Until Converged",
      description: "Each new learner reduces the remaining errors. Like gradient descent in function space → step-by-step downhill toward lower loss.",
      formula: "Repeat for m = 1, 2, ..., M",
      explanation: "Continue until convergence or maximum iterations",
      analogy: "Climbing down a mountain one step at a time — each step takes you closer to the valley (minimum error).",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-orange-500"
    }
  ];

  // (Removed unused sampleData)

  const currentStepData = steps[currentStep];

  // Cleanup animation interval on unmount
  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [animationInterval]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">How Gradient Boosting Works</h1>
        <p className="text-xl text-muted-foreground">Step-by-Step Process with Visual Examples</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Panel: Step Navigation */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Step-by-Step Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step Navigation */}
            <div className="space-y-2">
              {steps.map((step, index) => (
                <Button
                  key={step.id}
                  variant={currentStep === index ? "default" : "outline"}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full justify-start ${currentStep === index ? step.color : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {step.icon}
                    <div className="text-left">
                      <div className="font-semibold">Step {index + 1}</div>
                      <div className="text-sm opacity-80">{step.title}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Animation Controls */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  if (showAnimation) {
                    // Stop animation
                    if (animationInterval) {
                      clearInterval(animationInterval);
                      setAnimationInterval(null);
                    }
                    setShowAnimation(false);
                  } else {
                    // Start animation
                    setShowAnimation(true);
                    const interval = setInterval(() => {
                      setCurrentStep(prev => (prev + 1) % steps.length);
                    }, 3000); // Change step every 3 seconds
                    setAnimationInterval(interval);
                  }
                }}
                className="w-full"
              >
                {showAnimation ? "Stop Animation" : "Start Animation"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {showAnimation ? "Automatically cycling through steps" : "Click to auto-cycle through all steps"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Current Step Details */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStepData.icon}
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>

            {/* Formula */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Mathematical Formula</h3>
              <div className="text-2xl font-mono text-center py-2">
                {currentStepData.formula}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {currentStepData.explanation}
              </p>
            </div>

            {/* Analogy */}
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Real-World Analogy
              </h3>
              <p className="text-muted-foreground italic">"{currentStepData.analogy}"</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Section */}
      <Card className="bg-card border-border shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Visual Demonstration: Step {currentStep + 1}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph Visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Model State</h3>
              <div className="flex justify-center">
                <GradientBoostingVisualization 
                  currentStep={currentStep} 
                  width={400} 
                  height={300} 
                />
              </div>
              <div className="space-y-3">
                {/* Step Description */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {currentStep === 0 && "Baseline prediction (horizontal line)"}
                    {currentStep === 1 && "Residuals shown as red arrows"}
                    {currentStep === 2 && "Weak learner fitting residuals"}
                    {currentStep === 3 && "Updated model prediction"}
                    {currentStep === 4 && "Converged final model"}
                  </div>
                </div>
                
                {/* Mathematical Labels */}
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <div className="text-center">
                    {currentStep === 0 && (
                      <div className="text-sm font-mono text-primary font-semibold">
                        F₀(x) = ȳ (Baseline)
                      </div>
                    )}
                    {currentStep === 1 && (
                      <div className="text-sm font-mono text-red-500 font-semibold">
                        Residuals rᵢm = yᵢ - F₀(xᵢ)
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="text-sm font-mono text-green-500 font-semibold">
                        Weak Learner h₁(x)
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="text-sm font-mono text-blue-500 font-semibold">
                        F₁(x) = F₀(x) + η·h₁(x)
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div className="text-sm font-mono text-purple-500 font-semibold">
                        F_M(x) - Final Converged Model
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Orange dots: Noisy data (y = sin(x) + noise)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-0.5 bg-blue-500"></div>
                      <span>Blue line: Current model prediction</span>
                    </div>
                    {currentStep === 1 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-0.5 bg-red-500"></div>
                        <span>Red lines: Residuals (errors)</span>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-0.5 bg-green-500 border-dashed border-2"></div>
                        <span>Green dashed: Weak learner h₁(x)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's Happening</h3>
              <div className="space-y-3">
                {currentStep === 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Initialize with mean value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Simple baseline prediction</span>
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Calculate prediction errors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Identify what needs fixing</span>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Train decision tree on errors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Learn correction patterns</span>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Add scaled correction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Update model prediction</span>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Repeat process</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Continue until convergence</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaway */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Key Takeaway</h2>
            <p className="text-lg text-muted-foreground">
              <strong>Gradient Boosting = Start simple → find mistakes → correct them gradually → end up with a strong model.</strong>
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <ArrowRight className="h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                Each step builds upon the previous one, creating an increasingly accurate model
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HowGradientBoostingWorksSlide;
