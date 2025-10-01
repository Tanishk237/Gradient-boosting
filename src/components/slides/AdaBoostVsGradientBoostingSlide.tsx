import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Scale, 
  Target, 
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';

const AdaBoostVsGradientBoostingSlide: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'adaboost' | 'gradient'>('adaboost');

  const algorithms = {
    adaboost: {
      name: "AdaBoost",
      fullName: "Adaptive Boosting",
      icon: <Scale className="h-6 w-6" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      borderColor: "border-blue-400",
      description: "Focuses on increasing weights on misclassified examples so that subsequent weak learners pay more attention to difficult samples.",
      analogy: "A tutor who pays more attention to students who got questions wrong on the last test, so they don't make the same mistakes again.",
      mechanism: [
        "Assign weights to all training samples initially equally",
        "After each weak learner, increase weights of misclassified samples",
        "Next learner focuses more on these harder samples",
        "Weak learners often decision stumps (depth=1 trees)",
        "No explicit loss function optimized"
      ],
      formula: "w_i ← w_i × exp(α_t · I(y_i ≠ h_t(x_i)))",
      formulaExplanation: "where α_t is the weight of learner t, I is the indicator function, y_i is true label, h_t is learner prediction",
      characteristics: {
        weakLearner: "Decision stumps (simple trees)",
        lossFunction: "Implicit exponential loss",
        sensitivity: "Sensitive to noise/outliers",
        useCases: "Good for clean classification"
      }
    },
    gradient: {
      name: "Gradient Boosting",
      fullName: "Gradient Boosting",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-green-100",
      borderColor: "border-green-400",
      description: "Builds new models by fitting to the residual errors (gradients) of the previous model, minimizing a differentiable loss function.",
      analogy: "An artist sculpting a statue by repeatedly fixing the leftover errors from previous work to get a better shape.",
      mechanism: [
        "Start with an initial prediction model (e.g., mean output)",
        "Compute residuals/errors from the model",
        "Fit the next learner to predict these residuals (negative gradients of loss)",
        "Update the prediction model by adding the new learner scaled by learning rate η",
        "Can optimize any differentiable loss function"
      ],
      formula: "F_m(x) = F_{m-1}(x) + η · h_m(x)",
      formulaExplanation: "where F_m is the boosted model after m learners, h_m is the learner fit to residuals",
      characteristics: {
        weakLearner: "Can be deep trees or other models",
        lossFunction: "Minimizes differentiable loss",
        sensitivity: "More robust, smooth updates",
        useCases: "Good for complex classification/regression"
      }
    }
  };

  const currentAlgorithm = algorithms[selectedAlgorithm];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">AdaBoost vs Gradient Boosting</h1>
        <p className="text-xl text-muted-foreground">Understanding the Key Differences Between Two Popular Boosting Algorithms</p>
        <div className="mt-4 text-sm text-muted-foreground max-w-4xl mx-auto">
          <p><strong>Core Difference:</strong> AdaBoost uses sample re-weighting, while Gradient Boosting uses residual fitting</p>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-muted/50 p-1 rounded-lg">
          <Button
            variant={selectedAlgorithm === 'adaboost' ? 'default' : 'ghost'}
            onClick={() => setSelectedAlgorithm('adaboost')}
            className="mr-2"
          >
            AdaBoost
          </Button>
          <Button
            variant={selectedAlgorithm === 'gradient' ? 'default' : 'ghost'}
            onClick={() => setSelectedAlgorithm('gradient')}
          >
            Gradient Boosting
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Panel: Selected Algorithm Details */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentAlgorithm.icon}
              {currentAlgorithm.fullName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Idea */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Basic Idea</h3>
              <p className="text-muted-foreground">{currentAlgorithm.description}</p>
            </div>

            {/* Analogy */}
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Real-World Analogy
              </h3>
              <p className="text-muted-foreground italic">"{currentAlgorithm.analogy}"</p>
            </div>

            {/* Technical Mechanism */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Technical Mechanism</h3>
              <div className="space-y-2">
                {currentAlgorithm.mechanism.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mathematical Formula */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Mathematical Formula
              </h3>
              
              {/* Formula Display */}
              <div className="bg-background/80 p-8 rounded-lg border border-primary/30 shadow-lg">
                <div className="text-center">
                  {selectedAlgorithm === 'adaboost' ? (
                    <div className="space-y-4">
                      {/* Main AdaBoost Formula */}
                      <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30">
                        <div className="text-3xl font-bold text-blue-400 mb-2 font-mono">
                          w<sub>i</sub><sup>(t+1)</sup> = w<sub>i</sub><sup>(t)</sup> × exp(α<sub>t</sub> × I(y<sub>i</sub> ≠ h<sub>t</sub>(x<sub>i</sub>)))
                        </div>
                        <div className="text-lg text-blue-300 font-mono">
                          where α<sub>t</sub> = <span className="text-xl">½</span> ln<span className="text-lg">(</span><span className="text-xl">1 - ε<sub>t</sub></span><span className="text-lg">/</span><span className="text-xl">ε<sub>t</sub></span><span className="text-lg">)</span>
                        </div>
                      </div>
                      
                      {/* AdaBoost Algorithm Steps */}
                      <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-blue-300 space-y-1">
                          <div><strong>1.</strong> Initialize: w<sub>i</sub><sup>(1)</sup> = 1/N for all i</div>
                          <div><strong>2.</strong> For t = 1 to T:</div>
                          <div className="ml-4">• Train h<sub>t</sub> on weighted data</div>
                          <div className="ml-4">• Compute ε<sub>t</sub> = Σ w<sub>i</sub><sup>(t)</sup> I(y<sub>i</sub> ≠ h<sub>t</sub>(x<sub>i</sub>))</div>
                          <div className="ml-4">• Update weights: w<sub>i</sub><sup>(t+1)</sup> = w<sub>i</sub><sup>(t)</sup> × exp(α<sub>t</sub> × I(y<sub>i</sub> ≠ h<sub>t</sub>(x<sub>i</sub>)))</div>
                          <div><strong>3.</strong> Final prediction: H(x) = sign(Σ α<sub>t</sub> h<sub>t</sub>(x))</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Main Gradient Boosting Formula */}
                      <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30">
                        <div className="text-3xl font-bold text-green-400 mb-2 font-mono">
                          F<sub>m</sub>(x) = F<sub>m-1</sub>(x) + η × h<sub>m</sub>(x)
                        </div>
                        <div className="text-lg text-green-300 font-mono">
                          where h<sub>m</sub>(x) = argmin<sub>h</sub> Σ<sub>i=1</sub><sup>N</sup> L(y<sub>i</sub>, F<sub>m-1</sub>(x<sub>i</sub>) + h(x<sub>i</sub>))
                        </div>
                      </div>
                      
                      {/* Gradient Boosting Algorithm Steps */}
                      <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-green-300 space-y-1">
                          <div><strong>1.</strong> Initialize: F<sub>0</sub>(x) = argmin<sub>γ</sub> Σ<sub>i=1</sub><sup>N</sup> L(y<sub>i</sub>, γ)</div>
                          <div><strong>2.</strong> For m = 1 to M:</div>
                          <div className="ml-4">• Compute residuals: r<sub>im</sub> = -∂L(y<sub>i</sub>, F<sub>m-1</sub>(x<sub>i</sub>))/∂F<sub>m-1</sub>(x<sub>i</sub>)</div>
                          <div className="ml-4">• Fit h<sub>m</sub> to residuals: &#123;(x<sub>i</sub>, r<sub>im</sub>)&#125;<sub>i=1</sub><sup>N</sup></div>
                          <div className="ml-4">• Update: F<sub>m</sub>(x) = F<sub>m-1</sub>(x) + η × h<sub>m</sub>(x)</div>
                          <div><strong>3.</strong> Final prediction: F<sub>M</sub>(x)</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Formula Explanation */}
              <div className="mt-6 space-y-4">
                <div className="bg-background/50 p-5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-base mb-3 text-primary flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Variables & Notation:
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    {selectedAlgorithm === 'adaboost' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>• <span className="text-blue-300 font-mono">w<sub>i</sub><sup>(t)</sup></span> = weight of sample i at iteration t</div>
                          <div>• <span className="text-blue-300 font-mono">α<sub>t</sub></span> = weight/importance of learner t</div>
                          <div>• <span className="text-blue-300 font-mono">I(y<sub>i</sub> ≠ h<sub>t</sub>(x<sub>i</sub>))</span> = indicator function (1 if misclassified)</div>
                          <div>• <span className="text-blue-300 font-mono">ε<sub>t</sub></span> = weighted error rate of learner t</div>
                          <div>• <span className="text-blue-300 font-mono">h<sub>t</sub>(x)</span> = weak learner at iteration t</div>
                          <div>• <span className="text-blue-300 font-mono">H(x)</span> = final ensemble prediction</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>• <span className="text-green-300 font-mono">F<sub>m</sub>(x)</span> = boosted model after m learners</div>
                          <div>• <span className="text-green-300 font-mono">η</span> = learning rate (shrinkage parameter)</div>
                          <div>• <span className="text-green-300 font-mono">h<sub>m</sub>(x)</span> = learner m fitted to residuals</div>
                          <div>• <span className="text-green-300 font-mono">r<sub>im</sub></span> = residual for sample i at iteration m</div>
                          <div>• <span className="text-green-300 font-mono">L(y, F)</span> = differentiable loss function</div>
                          <div>• <span className="text-green-300 font-mono">∂L/∂F</span> = gradient of loss w.r.t. prediction</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-lg border border-primary/30">
                  <h4 className="font-semibold text-base mb-3 text-primary flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Algorithm Intuition:
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    {selectedAlgorithm === 'adaboost' ? (
                      <div className="space-y-2">
                        <p><strong className="text-blue-300">AdaBoost Strategy:</strong> Focus on samples that previous learners got wrong by increasing their weights exponentially.</p>
                        <p><strong className="text-blue-300">Key Insight:</strong> Each learner gets a weight α<sub>t</sub> based on its performance - better learners get higher weights.</p>
                        <p><strong className="text-blue-300">Final Decision:</strong> Weighted majority vote where each learner's vote is scaled by its α<sub>t</sub>.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p><strong className="text-green-300">Gradient Boosting Strategy:</strong> Fit new learners to the residual errors (negative gradients) of the current model.</p>
                        <p><strong className="text-green-300">Key Insight:</strong> Residuals point in the direction of steepest increase in loss - fitting to them reduces loss.</p>
                        <p><strong className="text-green-300">Final Decision:</strong> Additive model where each learner corrects the mistakes of previous learners.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Comparison Table */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Detailed Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-semibold">Aspect</th>
                      <th className="text-left py-2 font-semibold text-blue-400">AdaBoost</th>
                      <th className="text-left py-2 font-semibold text-green-400">Gradient Boosting</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">Approach</td>
                      <td className="py-2 text-muted-foreground">Re-weight misclassified samples</td>
                      <td className="py-2 text-muted-foreground">Fit residual errors (gradients)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">Weak Learner</td>
                      <td className="py-2 text-muted-foreground">Decision stumps (simple trees)</td>
                      <td className="py-2 text-muted-foreground">Can be deep trees or other models</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">Loss Function</td>
                      <td className="py-2 text-muted-foreground">Implicit exponential loss</td>
                      <td className="py-2 text-muted-foreground">Minimizes differentiable loss</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 font-medium">Sensitivity</td>
                      <td className="py-2 text-muted-foreground">Sensitive to noise/outliers</td>
                      <td className="py-2 text-muted-foreground">More robust, smooth updates</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Use Cases</td>
                      <td className="py-2 text-muted-foreground">Good for clean classification</td>
                      <td className="py-2 text-muted-foreground">Good for complex classification/regression</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Characteristics */}
              <div className="space-y-4">
                <h3 className="font-semibold">Key Characteristics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">AdaBoost</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Simple decision stumps</div>
                      <div>• Sample re-weighting</div>
                      <div>• Fast training</div>
                      <div>• Sensitive to noise</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Gradient Boosting</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Flexible weak learners</div>
                      <div>• Residual fitting</div>
                      <div>• Robust to noise</div>
                      <div>• More complex</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Comparison */}
      <Card className="bg-card border-border shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Visual Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AdaBoost Process */}
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                <Scale className="h-5 w-5" />
                AdaBoost Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <span className="text-sm">Equal weights for all samples</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <span className="text-sm">Train weak learner (decision stump)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <span className="text-sm">Increase weights of misclassified samples</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <span className="text-sm">Repeat with focus on hard samples</span>
                </div>
              </div>
            </div>

            {/* Gradient Boosting Process */}
            <div className="space-y-4">
              <h3 className="font-semibold text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Gradient Boosting Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <span className="text-sm">Start with initial prediction (mean)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <span className="text-sm">Compute residuals (errors)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <span className="text-sm">Fit weak learner to residuals</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <span className="text-sm">Update model with scaled learner</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Key Takeaways</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-400">Choose AdaBoost When:</h3>
                <p className="text-muted-foreground">• Clean, noise-free data</p>
                <p className="text-muted-foreground">• Need fast training</p>
                <p className="text-muted-foreground">• Want simple, interpretable models</p>
                <p className="text-muted-foreground">• Binary classification problems</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-400">Choose Gradient Boosting When:</h3>
                <p className="text-muted-foreground">• Complex, noisy data</p>
                <p className="text-muted-foreground">• Need high accuracy</p>
                <p className="text-muted-foreground">• Regression or multi-class problems</p>
                <p className="text-muted-foreground">• Can handle longer training time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaBoostVsGradientBoostingSlide;

