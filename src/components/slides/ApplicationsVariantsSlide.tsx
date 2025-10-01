import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Heart, 
  Trophy, 
  Zap, 
  Leaf, 
  Cat,
  TrendingUp,
  Shield,
  Target,
  Users,
  Activity,
  Award
} from 'lucide-react';

const ApplicationsVariantsSlide: React.FC = () => {
  const applications = [
    {
      id: 0,
      name: "Finance",
      icon: <Building2 className="h-8 w-8" />,
      color: "from-blue-500/70 to-blue-600/70",
      examples: [
        {
          title: "Credit Scoring",
          description: "Predicting loan default risk based on customer financial history, income, and behavior patterns",
          impact: "Reduces bad debt by 15-25%"
        },
        {
          title: "Fraud Detection", 
          description: "Identifying suspicious transactions in real-time using transaction patterns and user behavior",
          impact: "Catches 90%+ of fraudulent activities"
        },
        {
          title: "Algorithmic Trading",
          description: "Predicting stock price movements using market data, news sentiment, and technical indicators",
          impact: "Improves trading strategy performance"
        }
      ]
    },
    {
      id: 1,
      name: "Healthcare",
      icon: <Heart className="h-8 w-8" />,
      color: "from-green-500/70 to-green-600/70",
      examples: [
        {
          title: "Disease Diagnosis",
          description: "Analyzing medical images, lab results, and patient history to detect diseases early",
          impact: "Improves diagnostic accuracy by 20-30%"
        },
        {
          title: "Drug Discovery",
          description: "Predicting drug efficacy and side effects using molecular properties and clinical data",
          impact: "Reduces drug development time and costs"
        },
        {
          title: "Patient Risk Stratification",
          description: "Identifying high-risk patients for proactive care management and resource allocation",
          impact: "Reduces hospital readmissions by 25%"
        }
      ]
    },
    {
      id: 2,
      name: "Kaggle Competitions",
      icon: <Trophy className="h-8 w-8" />,
      color: "from-purple-500/70 to-purple-600/70",
      examples: [
        {
          title: "Tabular Data Competitions",
          description: "Dominating structured data competitions with feature engineering and ensemble methods",
          impact: "Wins 80%+ of tabular competitions"
        },
        {
          title: "Time Series Forecasting",
          description: "Predicting future values in sales, demand, and financial markets",
          impact: "Achieves state-of-the-art accuracy"
        },
        {
          title: "Recommendation Systems",
          description: "Building personalized recommendation engines for e-commerce and content platforms",
          impact: "Increases user engagement by 40%"
        }
      ]
    }
  ];

  const variants = [
    {
      id: 0,
      name: "XGBoost",
      icon: <Zap className="h-8 w-8" />,
      color: "from-orange-500/70 to-orange-600/70",
      features: [
        {
          title: "Regularization",
          description: "Built-in L1 and L2 regularization to prevent overfitting",
          benefit: "More robust models with better generalization"
        },
        {
          title: "Parallel Processing",
          description: "Multi-threaded training for faster model building",
          benefit: "3-10x faster than traditional gradient boosting"
        },
        {
          title: "Missing Value Handling",
          description: "Automatic handling of missing data without preprocessing",
          benefit: "Simplifies data preparation pipeline"
        },
        {
          title: "Cross-validation",
          description: "Built-in cross-validation for model evaluation",
          benefit: "More reliable performance estimates"
        }
      ],
      pros: ["Highly optimized", "Excellent performance", "Wide adoption"],
      cons: ["Memory intensive", "Complex hyperparameters", "Slower on small datasets"]
    },
    {
      id: 1,
      name: "LightGBM",
      icon: <Leaf className="h-8 w-8" />,
      color: "from-emerald-500/70 to-emerald-600/70",
      features: [
        {
          title: "Leaf-wise Growth",
          description: "Grows trees leaf-wise instead of level-wise for better efficiency",
          benefit: "Faster training with lower memory usage"
        },
        {
          title: "Gradient-based One-Side Sampling",
          description: "Keeps gradients with large absolute values and randomly samples others",
          benefit: "Maintains accuracy while reducing data size"
        },
        {
          title: "Exclusive Feature Bundling",
          description: "Bundles mutually exclusive features to reduce feature space",
          benefit: "Further reduces memory usage and training time"
        },
        {
          title: "Categorical Feature Support",
          description: "Native support for categorical features without encoding",
          benefit: "Simplifies preprocessing for categorical data"
        }
      ],
      pros: ["Very fast", "Low memory usage", "Good accuracy"],
      cons: ["May overfit on small datasets", "Less stable than XGBoost", "Fewer tuning options"]
    },
    {
      id: 2,
      name: "CatBoost",
      icon: <Cat className="h-8 w-8" />,
      color: "from-indigo-500/70 to-indigo-600/70",
      features: [
        {
          title: "Categorical Handling",
          description: "Advanced categorical feature processing with target encoding",
          benefit: "Superior performance on categorical data"
        },
        {
          title: "Ordered Boosting",
          description: "Prevents overfitting by using a special ordering scheme",
          benefit: "Better generalization without extensive tuning"
        },
        {
          title: "GPU Support",
          description: "Native GPU acceleration for training and prediction",
          benefit: "Significantly faster training on large datasets"
        },
        {
          title: "Built-in Visualization",
          description: "Comprehensive visualization tools for model analysis",
          benefit: "Better model interpretability and debugging"
        }
      ],
      pros: ["Excellent with categorical data", "Minimal tuning required", "GPU acceleration"],
      cons: ["Slower than LightGBM", "Limited documentation", "Newer library"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Applications & Variants</h1>
        <p className="text-xl text-muted-foreground">Real-world Impact and Modern Implementations</p>
        <div className="mt-4 text-sm text-muted-foreground max-w-4xl mx-auto">
          <p><strong>Key Insight:</strong> Gradient Boosting powers critical decisions across industries and continues to evolve with optimized implementations</p>
        </div>
      </div>

      {/* Applications Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Real-World Applications</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Card key={app.id} className={`bg-gradient-to-br ${app.color} border-0 shadow-xl`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                    <p className="text-white/80">Industry Applications</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {app.examples.map((example, index) => (
                    <div key={index} className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{example.title}</h4>
                      <p className="text-white/80 text-sm mb-2">{example.description}</p>
                      <div className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
                        Impact: {example.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Variants Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Modern Variants</h2>
        <div className="space-y-8">
          {variants.map((variant) => (
            <Card key={variant.id} className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${variant.color}`}>
                    {variant.icon}
                  </div>
                  <div>
                    <span className="text-2xl">{variant.name}</span>
                    <p className="text-sm text-muted-foreground font-normal">Advanced Implementation</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {variant.features.map((feature, index) => (
                        <div key={index} className="bg-muted/30 p-3 rounded-lg">
                          <h5 className="font-medium text-foreground mb-1">{feature.title}</h5>
                          <p className="text-sm text-muted-foreground mb-1">{feature.description}</p>
                          <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                            Benefit: {feature.benefit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Trade-offs
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Advantages
                        </h5>
                        <div className="space-y-1">
                          {variant.pros.map((pro, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-muted-foreground">{pro}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-orange-400 mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Considerations
                        </h5>
                        <div className="space-y-1">
                          {variant.cons.map((con, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-muted-foreground">{con}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Choosing the Right Variant</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                <strong>Selection Guide:</strong> Choose XGBoost for stability and performance, LightGBM for speed and memory efficiency, 
                and CatBoost for categorical data and minimal tuning requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-400 mb-2">XGBoost</h3>
                  <p className="text-muted-foreground">Best for: Production systems, competitions, when you need maximum performance</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-400 mb-2">LightGBM</h3>
                  <p className="text-muted-foreground">Best for: Large datasets, memory constraints, when speed is critical</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-400 mb-2">CatBoost</h3>
                  <p className="text-muted-foreground">Best for: Categorical data, quick prototyping, when you want minimal tuning</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsVariantsSlide;

