import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Users,
  Brain,
  CheckCircle,
  BarChart3,
  Layers,
  TreePine,
  Building2,
  Heart,
  Trophy,
  Calculator,
  Gauge,
  Activity
} from 'lucide-react';

const SummarySlide: React.FC = () => {
  const coreConcepts = [
    {
      title: "Ensemble Learning Recap",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500/70 to-blue-600/70",
      points: [
        "Bagging = parallel voting",
        "Boosting = sequential corrections", 
        "Stacking = meta-learning"
      ]
    },
    {
      title: "Boosting Core Idea",
      icon: <Brain className="h-6 w-6" />,
      color: "from-green-500/70 to-green-600/70",
      points: [
        "Combine many weak learners → one strong learner",
        "Each new learner fixes errors of the previous"
      ]
    },
    {
      title: "Gradient Boosting Specifics",
      icon: <Target className="h-6 w-6" />,
      color: "from-purple-500/70 to-purple-600/70",
      points: [
        "Learners fit residuals = negative gradients of loss",
        "Equivalent to gradient descent in function space"
      ]
    }
  ];

  const keyFormulas = [
    {
      title: "Residuals",
      formula: "rᵢₘ = -∂L(yᵢ, F(xᵢ))/∂F(xᵢ)",
      description: "Negative gradient of loss function"
    },
    {
      title: "Update Rule",
      formula: "Fₘ(x) = Fₘ₋₁(x) + η · hₘ(x)",
      description: "Sequential model updates with learning rate"
    }
  ];

  const whyItWorks = [
    { text: "Reduces bias and variance", icon: <TrendingUp className="h-4 w-4" /> },
    { text: "Zooms in on hard-to-fit data points", icon: <Target className="h-4 w-4" /> },
    { text: "Sequential error correction", icon: <CheckCircle className="h-4 w-4" /> },
    { text: "Adaptive learning", icon: <Brain className="h-4 w-4" /> }
  ];

  const parameters = [
    { name: "Learning Rate (η)", icon: <Gauge className="h-4 w-4" /> },
    { name: "Number of Trees", icon: <TreePine className="h-4 w-4" /> },
    { name: "Tree Depth", icon: <Layers className="h-4 w-4" /> },
    { name: "Subsampling", icon: <Activity className="h-4 w-4" /> }
  ];

  const variants = [
    { name: "XGBoost", color: "text-orange-400" },
    { name: "LightGBM", color: "text-emerald-400" },
    { name: "CatBoost", color: "text-indigo-400" }
  ];

  const applications = [
    { name: "Finance", icon: <Building2 className="h-4 w-4" /> },
    { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { name: "Kaggle", icon: <Trophy className="h-4 w-4" /> },
    { name: "Recommendations", icon: <BarChart3 className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Summary – Gradient Boosting</h1>
        <p className="text-xl text-muted-foreground">Complete Overview of Concepts, Formulas, and Applications</p>
        <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      {/* Main Flow Diagram */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Gradient Boosting Flow</h2>
        <Card className="bg-card border-border shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 flex-wrap gap-4">
              {/* Weak Learners */}
              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-6 rounded-lg border border-blue-500/30 text-center min-w-[150px]">
                <div className="flex justify-center mb-3">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                <h3 className="font-semibold text-blue-400">Weak Learners</h3>
                <p className="text-xs text-muted-foreground mt-1">Simple models</p>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Residual Corrections */}
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-6 rounded-lg border border-green-500/30 text-center min-w-[150px]">
                <div className="flex justify-center mb-3">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-green-400">Residual Corrections</h3>
                <p className="text-xs text-muted-foreground mt-1">Fix errors</p>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Gradient Updates */}
              <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-6 rounded-lg border border-purple-500/30 text-center min-w-[150px]">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-purple-400">Gradient Updates</h3>
                <p className="text-xs text-muted-foreground mt-1">Sequential learning</p>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Strong Model */}
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 p-6 rounded-lg border border-orange-500/30 text-center min-w-[150px]">
                <div className="flex justify-center mb-3">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-orange-400">Strong Model</h3>
                <p className="text-xs text-muted-foreground mt-1">High accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Concepts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreConcepts.map((concept, index) => (
            <Card key={index} className={`bg-gradient-to-br ${concept.color} border-0 shadow-xl`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {concept.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{concept.title}</h3>
                </div>
                <div className="space-y-2">
                  {concept.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-white/90">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Formulas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Key Formulas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFormulas.map((formula, index) => (
            <Card key={index} className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{formula.title}</h3>
                </div>
                
                <div className="bg-background/80 p-6 rounded-lg border border-primary/30 shadow-lg mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-mono mb-2">
                      {formula.formula}
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center italic">
                    {formula.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mind Map Style Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Complete Overview</h2>
        <Card className="bg-card border-border shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Why It Works */}
              <div className="space-y-4">
                <h3 className="font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Why It Works
                </h3>
                <div className="space-y-2">
                  {whyItWorks.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {item.icon}
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tuning Parameters */}
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Tuning Parameters
                </h3>
                <div className="space-y-2">
                  {parameters.map((param, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {param.icon}
                      <span className="text-muted-foreground">{param.name}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  Trade-off: underfitting vs overfitting
                </div>
              </div>

              {/* Modern Variants */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-400 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Modern Variants
                </h3>
                <div className="space-y-2">
                  {variants.map((variant, index) => (
                    <div key={index} className={`text-sm font-medium ${variant.color}`}>
                      {variant.name}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  Faster, regularized, more scalable
                </div>
              </div>

              {/* Applications */}
              <div className="space-y-4">
                <h3 className="font-semibold text-orange-400 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Applications
                </h3>
                <div className="space-y-2">
                  {applications.map((app, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {app.icon}
                      <span className="text-muted-foreground">{app.name}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  Widely used across industries
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Takeaway */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Takeaway</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-6">
                <strong>Gradient Boosting</strong> transforms weak learners into a powerful ensemble through 
                sequential error correction and gradient-based optimization, making it one of the most 
                effective machine learning techniques for structured data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-2">Core Strength</h3>
                  <p className="text-muted-foreground">Sequential learning from mistakes</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">Mathematical Foundation</h3>
                  <p className="text-muted-foreground">Gradient descent in function space</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-2">Practical Impact</h3>
                  <p className="text-muted-foreground">Dominates competitions and production</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarySlide;
