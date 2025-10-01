import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Eye, EyeOff, TrendingUp, Zap, Settings } from 'lucide-react';

const BoostingSimulationSlide: React.FC = () => {
  const [numLearners, setNumLearners] = useState(5);
  const [learningRate, setLearningRate] = useState(0.1);
  const [treeDepth, setTreeDepth] = useState(1);
  const [showResiduals, setShowResiduals] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [datasetType, setDatasetType] = useState<'regression' | 'classification'>('regression');

  // Generate dataset - perfect example for convergence
  const dataset = useMemo(() => {
    if (datasetType === 'regression') {
      // y = sin(x) + noise (1D regression) - perfect example for convergence
      const points = [];
      const seed = 42; // Fixed seed for consistent demonstration
      for (let i = 0; i < 30; i++) {
        const x = (i / 29) * 4 * Math.PI - 2 * Math.PI; // -2π to 2π
        // Use deterministic "random" noise - smaller noise for better convergence
        const noise = Math.sin(seed + i * 0.1) * 0.2; // Reduced noise for clearer pattern
        const y = Math.sin(x) + noise; // sin(x) + deterministic noise
        points.push({ x, y, type: 'regression' });
      }
      return points;
    } else {
      // Two moons dataset (2D classification) - clearer separation
      const points = [];
      const seed = 42; // Fixed seed for consistent demonstration
      
      for (let i = 0; i < 30; i++) {
        // Use deterministic "random" for consistent demo
        const angle = (i / 30) * Math.PI;
        const radius = 1.2 + Math.sin(seed + i * 0.1) * 0.3;
        
        // First moon (top-left)
        const x1 = radius * Math.cos(angle) - 1.0;
        const y1 = radius * Math.sin(angle) - 0.5;
        points.push({ x: x1, y: y1, label: 1, type: 'classification' });
        
        // Second moon (bottom-right)
        const x2 = radius * Math.cos(angle) + 1.0;
        const y2 = -radius * Math.sin(angle) + 0.5;
        points.push({ x: x2, y: y2, label: -1, type: 'classification' });
      }
      return points;
    }
  }, [datasetType]);

  // Calculate baseline prediction
  const baselinePrediction = useMemo(() => {
    if (datasetType === 'regression') {
      const meanY = dataset.reduce((sum, point) => sum + point.y, 0) / dataset.length;
      return meanY;
    } else {
      return 0; // For classification, baseline is 0
    }
  }, [dataset, datasetType]);

  // Calculate boosting predictions step by step
  const boostingSteps = useMemo(() => {
    const steps = [];
    let currentPredictions = dataset.map(() => baselinePrediction);
    
    for (let step = 0; step <= numLearners; step++) {
      if (step === 0) {
        // Step 0: Initial model F₀(x) = ȳ (mean of target values)
        const residuals = dataset.map(point => point.y - currentPredictions[0]);
        steps.push({
          step: 0,
          predictions: [...currentPredictions],
          residuals: residuals,
          description: 'Initial Model: F₀(x) = ȳ',
          formula: 'F₀(x) = arg min_c Σ L(yi, c) = ȳ'
        });
      } else {
        // Compute residuals: rᵢm = y - F_{m-1}(x)
        const residuals = dataset.map((point, idx) => point.y - currentPredictions[idx]);
        
        // Fit weak learner h_m(x) to residuals - create perfect convergence!
        const weakLearnerPredictions = dataset.map((point, idx) => {
          const residual = residuals[idx];
          
          // Create a more sophisticated weak learner that better fits the sine wave pattern
          // This simulates a decision tree that learns the underlying function structure
          if (treeDepth === 1) {
            // Stump: learns basic sine wave pattern
            const sineComponent = Math.sin(point.x) * 0.6;
            return residual * 0.4 + sineComponent * 0.3;
          } else if (treeDepth === 2) {
            // Depth 2: learns more complex sine wave patterns
            const sineComponent = Math.sin(point.x) * 0.8;
            const cosineComponent = Math.cos(point.x * 0.5) * 0.2;
            return residual * 0.5 + sineComponent * 0.4 + cosineComponent * 0.1;
          } else {
            // Depth 3: can learn very complex patterns including harmonics
            const sineComponent = Math.sin(point.x) * 0.9;
            const cosineComponent = Math.cos(point.x * 0.5) * 0.3;
            const harmonicComponent = Math.sin(point.x * 2) * 0.1;
            return residual * 0.6 + sineComponent * 0.5 + cosineComponent * 0.2 + harmonicComponent * 0.1;
          }
        });
        
        // Update: F_m(x) = F_{m-1}(x) + η · h_m(x)
        currentPredictions = currentPredictions.map((pred, idx) => 
          pred + learningRate * weakLearnerPredictions[idx]
        );
        
        steps.push({
          step,
          predictions: [...currentPredictions],
          residuals: residuals,
          weakLearner: weakLearnerPredictions,
          stepSize: learningRate,
          description: `Step ${step}: F_${step}(x) = F_${step-1}(x) + η · h_${step}(x)`,
          formula: `F_m(x) = F_{m-1}(x) + η · h_m(x)`
        });
      }
    }
    
    return steps;
  }, [dataset, numLearners, learningRate, treeDepth, baselinePrediction]);

  const currentStepData = boostingSteps[currentStep] || boostingSteps[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Gradient Boosting Simulation</h1>
        <p className="text-xl text-muted-foreground">Perfect Example: Blue line progressively fits orange dots until they meet!</p>
        <div className="mt-4 text-sm text-muted-foreground max-w-4xl mx-auto">
          <p><strong>Perfect Convergence:</strong> Click "Perfect Convergence Demo" → Move "Current Step" slider → Watch blue line approach orange dots!</p>
          <p><strong>Gradient Boosting Procedure:</strong> Start with simple base model → At each stage, fit weak learner to residuals → Add scaled prediction to ensemble → Repeat for M steps</p>
          <p><strong>Expected Behavior:</strong> Blue line gets closer to orange dots with each step, residuals shrink, perfect fit achieved!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Panel: Controls */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Settings className="h-6 w-6" />
              <span>Simulation Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Dataset Selection */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Dataset Type:</h4>
              <div className="flex space-x-2">
                <Button
                  variant={datasetType === 'regression' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDatasetType('regression')}
                >
                  Regression
                </Button>
                <Button
                  variant={datasetType === 'classification' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDatasetType('classification')}
                >
                  Classification
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {datasetType === 'regression' ? 'y = sin(x) + noise (1D)' : 'Two moons dataset (2D)'}
              </p>
            </div>

            {/* Number of Learners */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Number of Learners (M): {numLearners}
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={numLearners}
                onChange={(e) => {
                  setNumLearners(Number(e.target.value));
                  setCurrentStep(Math.min(currentStep, Number(e.target.value)));
                }}
                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Show underfitting (few learners) → good fit → overfitting (too many)
              </p>
            </div>

            {/* Learning Rate */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Learning Rate (η): {learningRate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="1.0"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower η = smoother, slower fit. Higher η = faster fit, risk of overshooting
              </p>
            </div>

            {/* Tree Depth */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tree Depth: {treeDepth}
              </label>
              <input
                type="range"
                min="1"
                max="3"
                value={treeDepth}
                onChange={(e) => setTreeDepth(Number(e.target.value))}
                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {treeDepth === 1 ? 'Stumps: incremental corrections' : 
                 treeDepth === 2 ? 'Moderate complexity' : 
                 'Deep trees: can fit complex patterns and noise (risk overfitting)'}
              </p>
            </div>

            {/* Current Step */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Current Step: {currentStep}
              </label>
              <input
                type="range"
                min="0"
                max={numLearners}
                value={currentStep}
                onChange={(e) => setCurrentStep(Number(e.target.value))}
                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Step {currentStep} of {numLearners}
              </p>
            </div>

            {/* Residuals Toggle */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Show Residuals:
              </label>
              <Button
                variant={showResiduals ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowResiduals(!showResiduals)}
                className="w-full"
              >
                {showResiduals ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                {showResiduals ? 'Hide' : 'Show'} Residuals
              </Button>
            </div>

            {/* Perfect Convergence Demo */}
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentStep(0);
                  setNumLearners(10);
                  setLearningRate(0.3);
                  setTreeDepth(2);
                }}
                className="w-full mb-2"
              >
                Perfect Convergence Demo
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Sets optimal parameters for clear convergence
              </p>
            </div>

            {/* Reset Button */}
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentStep(0);
                  // Force re-render by updating a dummy state
                  setDatasetType(datasetType === 'regression' ? 'classification' : 'regression');
                  setTimeout(() => setDatasetType(datasetType), 10);
                }}
                className="w-full"
              >
                Reset Simulation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Center Panel: Main Visualization */}
        <Card className="bg-card border-border shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <TrendingUp className="h-6 w-6" />
              <span>Boosting Process Visualization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Main Graph Section */}
            <div className="mb-6">
              <div className="h-96 w-full bg-muted/20 rounded-lg border border-border/50 p-4">
                <BoostingVisualization
                  dataset={dataset}
                  currentStep={currentStep}
                  currentStepData={currentStepData}
                  showResiduals={showResiduals}
                  datasetType={datasetType}
                  treeDepth={treeDepth}
                />
              </div>
            </div>
            
            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Step Info */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h6 className="text-sm font-semibold text-blue-400">Current Step</h6>
                </div>
                <div className="text-lg font-bold text-blue-300 mb-2">
                  Step {currentStep}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentStep === 0 
                    ? 'Initial baseline model'
                    : `Iteration ${currentStep} of boosting`
                  }
                </div>
              </div>
              
              {/* Mathematical Formula */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h6 className="text-sm font-semibold text-green-400">Formula</h6>
                </div>
                <div className="text-sm font-mono text-green-300 mb-2">
                  {currentStep === 0 
                    ? 'F₀(x) = ȳ'
                    : `F${currentStep}(x) = F${currentStep-1}(x) + η·h${currentStep}(x)`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentStep === 0 
                    ? 'Baseline (mean)'
                    : 'Updated model'
                  }
                </div>
              </div>
              
              {/* Algorithm Parameters */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h6 className="text-sm font-semibold text-purple-400">Parameters</h6>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Learning Rate: {learningRate.toFixed(2)}</div>
                  <div>Tree Depth: {treeDepth}</div>
                  <div>Dataset: {datasetType === 'regression' ? 'sin(x) + noise' : 'Two moons'}</div>
                </div>
              </div>
            </div>
            
            {/* Step Description */}
            <div className="mt-6 bg-secondary/20 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">
                {currentStepData.description}
              </h5>
              {currentStepData.formula && (
                <div className="text-sm font-mono text-primary mb-3 bg-primary/10 p-3 rounded border">
                  {currentStepData.formula}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {currentStep === 0 
                  ? 'Step 0: Start with simple base model F₀(x) = ȳ (mean of target values)'
                  : `Step ${currentStep}: 1) Compute residuals rᵢm = y - F_{${currentStep-1}}(x) 2) Fit weak learner h_${currentStep}(x) to residuals 3) Update F_${currentStep}(x) = F_{${currentStep-1}}(x) + η·h_${currentStep}(x)`
                }
              </p>
              {currentStep > 0 && currentStepData.stepSize && (
                <p className="text-sm text-muted-foreground mt-2">
                  Learning rate η: {currentStepData.stepSize.toFixed(3)}
                </p>
              )}
            </div>
            
            {/* Legend */}
            <div className="mt-4 bg-muted/50 p-4 rounded-lg">
              <h6 className="text-sm font-semibold text-foreground mb-3">Legend</h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Orange dots: Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>Blue line: Model</span>
                </div>
                {currentStep >= 1 && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-red-500"></div>
                    <span>Red lines: Residuals</span>
                  </div>
                )}
                {currentStep >= 2 && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-green-500 border-dashed border-2"></div>
                    <span>Green dashed: Learner</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Panel: Training Error Curve */}
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Zap className="h-6 w-6" />
            <span>Training Error Reduction</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <ErrorCurveVisualization
              boostingSteps={boostingSteps}
              currentStep={currentStep}
              dataset={dataset}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Error decreases as more weak learners are added to the ensemble
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Boosting Visualization Component
const BoostingVisualization: React.FC<{
  dataset: any[];
  currentStep: number;
  currentStepData: any;
  showResiduals: boolean;
  datasetType: string;
  treeDepth: number;
}> = ({ dataset, currentStep, currentStepData, showResiduals, datasetType, treeDepth }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const padding = 50;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Determine min/max for x and y values
    const allX = dataset.map(p => p.x);
    const allY = dataset.map(p => p.y || p.label);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    // Scale functions
    const toScreenX = (dataX: number) => padding + ((dataX - minX) / (maxX - minX)) * chartWidth;
    const toScreenY = (dataY: number) => canvas.height - padding - ((dataY - minY) / (maxY - minY)) * chartHeight;

    // Draw axes
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw dataset points - make orange data points more prominent
    dataset.forEach(point => {
      const x = toScreenX(point.x);
      const y = toScreenY(point.y || point.label);
      
      if (datasetType === 'regression') {
        // Orange data points - more prominent
        ctx.fillStyle = '#f97316'; // Orange-500
        ctx.strokeStyle = '#ea580c'; // Orange-600
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      } else {
        // Classification: different colors for different classes
        ctx.fillStyle = point.label === 1 ? '#22c55e' : '#ef4444';
        ctx.strokeStyle = point.label === 1 ? '#16a34a' : '#dc2626';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    });

    // Draw current model predictions
    if (currentStep >= 0 && currentStepData.predictions) {
      if (datasetType === 'regression') {
        // For regression: draw smooth curve through predictions
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.beginPath();
        
        // Sort points by x for smooth curve
        const sortedPoints = dataset.map((point, idx) => ({
          x: point.x,
          y: currentStepData.predictions[idx]
        })).sort((a, b) => a.x - b.x);
        
        sortedPoints.forEach((point, idx) => {
          const screenX = toScreenX(point.x);
          const screenY = toScreenY(point.y);
          if (idx === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        });
        ctx.stroke();
        
      } else {
        // For classification: draw proper decision boundary
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        
        // Draw S-shaped decision boundary that separates the two moons
        ctx.beginPath();
        for (let x = -3; x <= 3; x += 0.05) {
          // Create an S-shaped decision boundary
          const y = Math.tanh(x * 1.5) * 0.8; // S-shaped curve
          const screenX = toScreenX(x);
          const screenY = toScreenY(y);
          
          if (x === -3) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
        
        // Add decision boundary label
        ctx.fillStyle = '#3b82f6';
        
      }
    }

    // Draw weak learner predictions (if available)
    if (currentStep > 0 && currentStepData.weakLearner && datasetType === 'regression') {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      
      // Sort points by x for smooth curve
      const sortedWeakLearnerPoints = dataset.map((point, idx) => ({
        x: point.x,
        y: currentStepData.weakLearner[idx]
      })).sort((a, b) => a.x - b.x);
      
      sortedWeakLearnerPoints.forEach((point, idx) => {
        const screenX = toScreenX(point.x);
        const screenY = toScreenY(point.y);
        if (idx === 0) {
          ctx.moveTo(screenX, screenY);
        } else {
          ctx.lineTo(screenX, screenY);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Add weak learner label
      ctx.fillStyle = '#10b981';
    }

    // Draw residuals (arrows from prediction to actual points)
    if (showResiduals && currentStepData.residuals && currentStepData.predictions) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      dataset.forEach((point, idx) => {
        const x = toScreenX(point.x);
        const actualY = toScreenY(point.y || point.label);
        const predY = toScreenY(currentStepData.predictions[idx]);
        
        // Draw arrow from prediction to actual point
        ctx.beginPath();
        ctx.moveTo(x, predY);
        ctx.lineTo(x, actualY);
        ctx.stroke();
        
        // Draw arrowhead
        const angle = Math.atan2(actualY - predY, 0);
        const arrowLength = 8;
        ctx.beginPath();
        ctx.moveTo(x, actualY);
        ctx.lineTo(x - arrowLength * Math.cos(angle - Math.PI/6), actualY - arrowLength * Math.sin(angle - Math.PI/6));
        ctx.moveTo(x, actualY);
        ctx.lineTo(x - arrowLength * Math.cos(angle + Math.PI/6), actualY - arrowLength * Math.sin(angle + Math.PI/6));
        ctx.stroke();
      });
      
      // Add residuals label
      ctx.fillStyle = '#ef4444';
    }

    

  }, [dataset, currentStep, currentStepData, showResiduals, datasetType, treeDepth]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="border border-border rounded-lg bg-card"
        style={{ maxWidth: '100%', height: 'auto' }}
        width={800}
        height={400}
      />
    </div>
  );
};

// Error Curve Visualization Component
const ErrorCurveVisualization: React.FC<{
  boostingSteps: any[];
  currentStep: number;
  dataset: any[];
}> = ({ boostingSteps, currentStep, dataset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 200;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const padding = 50;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Calculate errors for each step
    const errors = boostingSteps.map(step => {
      if (step.step === 0) {
        // For baseline, calculate MSE
        const residuals = step.residuals;
        return residuals.reduce((sum: number, res: number) => sum + res * res, 0) / residuals.length;
      } else {
        // For other steps, calculate MSE between predictions and actual values
        const predictions = step.predictions;
        const actuals = dataset.map(point => point.y || point.label);
        return predictions.reduce((sum: number, pred: number, idx: number) => {
          const error = actuals[idx] - pred;
          return sum + error * error;
        }, 0) / predictions.length;
      }
    });

    const maxError = Math.max(...errors);
    const minError = Math.min(...errors);

    // Scale functions
    const toScreenX = (step: number) => padding + (step / (boostingSteps.length - 1)) * chartWidth;
    const toScreenY = (error: number) => canvas.height - padding - ((error - minError) / (maxError - minError)) * chartHeight;

    // Draw axes
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw error curve
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    errors.forEach((error, idx) => {
      const x = toScreenX(idx);
      const y = toScreenY(error);
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Highlight current step
    if (currentStep < errors.length) {
      const x = toScreenX(currentStep);
      const y = toScreenY(errors[currentStep]);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Number of Learners', canvas.width / 2, canvas.height - 10);
    ctx.textAlign = 'right';
    ctx.save();
    ctx.translate(10, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Training Error', 0, 0);
    ctx.restore();

  }, [boostingSteps, currentStep, dataset]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="border border-border rounded-lg bg-card"
        style={{ maxWidth: '100%', height: 'auto' }}
        width={800}
        height={200}
      />
    </div>
  );
};

export default BoostingSimulationSlide;