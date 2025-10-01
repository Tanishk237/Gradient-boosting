import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap,
  Clock,
  DollarSign,
  BarChart3,
  Calculator
} from 'lucide-react';

const LossFunctionsSlide: React.FC = () => {
  const [selectedLoss, setSelectedLoss] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lossFunctions = [
    {
      id: 0,
      name: "Squared Error",
      type: "Regression",
      formula: "Square Error = (y - ŷ)²",
      formulaDetail: "y = actual value, ŷ = predicted value",
      description: "Penalizes large errors heavily (quadratic growth). Works well when data has Gaussian noise.",
      analogy: {
        scenario: "The penalty fee is squared minutes late.",
        meaning: "If you arrive 1 minute late, pay $1. If 3 minutes late, pay $9 (3²).",
        effect: "Big delays get punished much more severely.",
        behavior: "Encourages you to avoid big late arrivals harshly."
      },
      icon: <BarChart3 className="h-6 w-6" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      borderColor: "border-blue-400",
      penalty: "Quadratic punishment for big delays"
    },
    {
      id: 1,
      name: "Absolute Error",
      type: "Regression",
      formula: "Absolute Error = |y - ŷ|",
      formulaDetail: "y = actual value, ŷ = predicted value",
      description: "Treats all errors equally (linear growth). More robust to outliers than squared error.",
      analogy: {
        scenario: "The penalty is the absolute minutes late (flat rate per minute).",
        meaning: "If 1 minute late, pay $1; if 3 minutes late, pay $3.",
        effect: "Penalizes time late proportionally, no special harsh penalty for big delays.",
        behavior: "More forgiving for occasional long delays."
      },
      icon: <Target className="h-6 w-6" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-green-100",
      borderColor: "border-green-400",
      penalty: "Linear punishment - treats all delays equally"
    },
    {
      id: 2,
      name: "Logistic Loss",
      type: "Classification",
      formula: "Logistic Loss = -[y log(ŷ) + (1-y) log(1-ŷ)]",
      formulaDetail: "y ∈ {0,1} = true label, ŷ = predicted probability of class 1",
      description: "Used for binary classification. Penalizes confident wrong predictions strongly.",
      analogy: {
        scenario: "You guess whether you will be on time or late (binary decision).",
        meaning: "Logistic loss penalizes wrong confident guesses severely.",
        effect: "If you confidently say 'on time' but you are late, you pay a very high fine.",
        behavior: "Encourages honest probability estimates and cautious predictions."
      },
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      borderColor: "border-purple-400",
      penalty: "Severe punishment for confident wrong guesses"
    },
    {
      id: 3,
      name: "Huber Loss",
      type: "Robust Regression",
      formula: "Lδ(y,ŷ) = {½(y-ŷ)² if |y-ŷ| ≤ δ, δ(|y-ŷ| - ½δ) otherwise}",
      formulaDetail: "δ (delta) = threshold parameter controlling switch between quadratic and linear behavior",
      description: "Combines squared (for small errors) + absolute (for large errors). More robust to outliers.",
      analogy: {
        scenario: "For small delays (within 5 minutes), penalty squares minutes (like squared loss).",
        meaning: "For big delays (over 5 minutes), penalty switches to flat per minute (like absolute loss).",
        effect: "Minor lateness is punished harshly, but extreme lateness is only penalized linearly.",
        behavior: "Balances sensitivity to small errors and tolerance to outliers (very late arrivals)."
      },
      icon: <Zap className="h-6 w-6" />,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      textColor: "text-orange-100",
      borderColor: "border-orange-400",
      penalty: "Smart punishment - harsh for small errors, forgiving for big ones"
    }
  ];

  // Draw loss function visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, 400, 300);

    // Set up coordinate system
    const padding = 40;
    const width = 400 - 2 * padding;
    const height = 300 - 2 * padding;

    const toScreenX = (x: number) => padding + ((x + 3) / 6) * width;
    const toScreenY = (y: number) => padding + height - ((y + 1) / 8) * height;

    // Draw axes
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, 300 - padding);
    ctx.lineTo(400 - padding, 300 - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 0.8;
    
    // Draw vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * width;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, 300 - padding);
      ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(400 - padding, y);
      ctx.stroke();
    }

    // Draw axes labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Error (y - F(x))', 200, 290);
    ctx.textAlign = 'right';
    ctx.fillText('Loss', 35, 50);

    // Draw loss function based on selection
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316'];
    ctx.strokeStyle = colors[selectedLoss];
    ctx.lineWidth = 4;

    ctx.beginPath();
    for (let x = -3; x <= 3; x += 0.1) {
      const screenX = toScreenX(x);
      let y = 0;

      switch (selectedLoss) {
        case 0: // Squared Error
          y = x * x;
          break;
        case 1: // Absolute Error
          y = Math.abs(x);
          break;
        case 2: // Logistic Loss
          y = Math.log(1 + Math.exp(-x));
          break;
        case 3: // Huber Loss
          const delta = 1;
          if (Math.abs(x) < delta) {
            y = 0.5 * x * x;
          } else {
            y = delta * Math.abs(x) - 0.5 * delta * delta;
          }
          break;
      }

      const screenY = toScreenY(y);
      if (x === -3) {
        ctx.moveTo(screenX, screenY);
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    ctx.stroke();

    // Add function label
    ctx.fillStyle = colors[selectedLoss];
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(lossFunctions[selectedLoss].name, 200, 30);

    // Draw numerical axis labels (drawn last to ensure visibility)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    
    // Draw x-axis numerical labels (Error values from -3 to 3)
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 11px Arial';
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * width;
      const xValue = -3 + (i / 10) * 6; // Maps to -3 to 3
      
      // Add x-axis labels
      ctx.fillText(xValue.toFixed(1), x, 300 - padding + 15);
    }
    
    // Draw y-axis numerical labels (Loss values from 0 to 7, with 0 at bottom)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * height;
      const yValue = (i / 10) * 7; // Maps to 0 to 7 (0 at bottom)
      
      // Add y-axis labels
      ctx.fillText(yValue.toFixed(1), padding - 8, y + 3);
    }
    
    // Reset text alignment
    ctx.textAlign = 'left';

  }, [selectedLoss]);

  const currentLoss = lossFunctions[selectedLoss];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Loss Functions in Gradient Boosting</h1>
        <p className="text-xl text-muted-foreground">Understanding How Different Loss Functions Penalize Errors</p>
        <div className="mt-4 text-sm text-muted-foreground max-w-4xl mx-auto">
          <p><strong>Core Analogy:</strong> Penalty for Being Late - Different loss functions are like different penalty systems for being late to a meeting</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Panel: Loss Function Selection */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Loss Function Types
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Loss Function Buttons */}
            <div className="space-y-3">
              {lossFunctions.map((loss, index) => (
                <Button
                  key={loss.id}
                  variant={selectedLoss === index ? "default" : "outline"}
                  onClick={() => setSelectedLoss(index)}
                  className={`w-full justify-start transition-all duration-300 ${
                    selectedLoss === index 
                      ? `${loss.color} ${loss.textColor} border-2 ${loss.borderColor} shadow-lg` 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedLoss === index ? 'bg-white/20' : 'bg-muted'}`}>
                      {loss.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{loss.name}</div>
                      <div className="text-sm opacity-80">{loss.type}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Current Loss Details */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Selected: {currentLoss.name}</h3>
              <div className="bg-gradient-to-r from-muted/30 to-muted/60 p-4 rounded-lg border border-border">
                <div className="text-lg font-mono mb-2 text-center bg-background/50 p-3 rounded border">
                  {currentLoss.formula}
                </div>
                <div className="text-sm text-muted-foreground mb-2 text-center">
                  {currentLoss.formulaDetail}
                </div>
                <div className="text-xs text-muted-foreground">{currentLoss.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Visualization */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Loss Function Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-border rounded-lg bg-muted/20"
                  style={{ width: 400, height: 300 }}
                />
              </div>
              
              {/* Function Description */}
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  {selectedLoss === 0 && "Convex parabola - steepens as error grows"}
                  {selectedLoss === 1 && "V-shaped curve - treats all errors equally"}
                  {selectedLoss === 2 && "S-shaped curve - penalizes confident wrong predictions"}
                  {selectedLoss === 3 && "Parabola near center, V-shape for large errors"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analogy Section */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Meeting Late Penalty Analogy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analogy Explanation */}
            <div className="space-y-4">
              <div className="bg-card/50 p-5 rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {currentLoss.name} Penalty System
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-background/30 p-3 rounded border-l-4 border-l-blue-500">
                    <h4 className="font-medium text-sm mb-1">Scenario:</h4>
                    <p className="text-sm text-muted-foreground">{currentLoss.analogy.scenario}</p>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded border-l-4 border-l-green-500">
                    <h4 className="font-medium text-sm mb-1">Meaning:</h4>
                    <p className="text-sm text-muted-foreground">{currentLoss.analogy.meaning}</p>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded border-l-4 border-l-purple-500">
                    <h4 className="font-medium text-sm mb-1">Effect:</h4>
                    <p className="text-sm text-muted-foreground">{currentLoss.analogy.effect}</p>
                  </div>
                  
                  <div className="bg-background/30 p-3 rounded border-l-4 border-l-orange-500">
                    <h4 className="font-medium text-sm mb-1">Behavior:</h4>
                    <p className="text-sm text-muted-foreground">{currentLoss.analogy.behavior}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Behavior Explanation */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-3">Mathematical Behavior</h3>
              <div className="space-y-3">
                {selectedLoss === 0 && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Quadratic growth - steepens as error increases</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Works well with Gaussian noise distribution</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Highly sensitive to outliers</span>
                    </div>
                  </>
                )}
                {selectedLoss === 1 && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Linear growth - treats all errors equally</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Robust to outliers and extreme values</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">More forgiving for large errors</span>
                    </div>
                  </>
                )}
                {selectedLoss === 2 && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">S-shaped curve penalizing overconfidence</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Encourages honest probability estimates</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Used for binary classification tasks</span>
                    </div>
                  </>
                )}
                {selectedLoss === 3 && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Hybrid behavior - quadratic then linear</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Robust to outliers while smooth near zero</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Best of both squared and absolute error</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Key Takeaways</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold">Choose Based on Your Data:</h3>
                <p className="text-muted-foreground">• Squared Error: Gaussian noise, sensitive to outliers</p>
                <p className="text-muted-foreground">• Absolute Error: Robust to outliers, linear growth</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Choose Based on Task:</h3>
                <p className="text-muted-foreground">• Logistic Loss: Binary classification</p>
                <p className="text-muted-foreground">• Huber Loss: Robust regression with outliers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LossFunctionsSlide;
