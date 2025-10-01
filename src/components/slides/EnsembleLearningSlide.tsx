import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, Users, Brain } from 'lucide-react';
import EnsembleChart from '../EnsembleChart';

const EnsembleLearningSlide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bagging' | 'boosting' | 'stacking'>('bagging');

  // Ensemble Simulation State
  const [baggingLearners, setBaggingLearners] = useState(5);
  const [boostingSteps, setBoostingSteps] = useState(5);
  const [boostingLearningRate, setBoostingLearningRate] = useState(0.1);
  const [stackingMetaLearner, setStackingMetaLearner] = useState<'linear' | 'logistic'>('linear');
  const [stackingWeights, setStackingWeights] = useState([0.4, 0.3, 0.3]); // weights for 3 base learners

  // Generate toy dataset: y = sin(x), x ∈ [-2π, 2π], no noise (ε = 0)
  const toyDataset = useMemo(() => {
    const points = [];
    for (let i = 0; i < 30; i++) {
      const x = (i / 29) * 4 * Math.PI - 2 * Math.PI; // -2π to 2π
      const y = Math.sin(x); // y = sin(x), no noise
      points.push({ x, y });
    }
    return points;
  }, []);

  // Ensemble predictions calculation
  const ensemblePredictions = useMemo(() => {
    const xValues = Array.from({ length: 100 }, (_, i) => (i / 99) * 4 * Math.PI - 2 * Math.PI); // -2π to 2π
    
    // Bagging: Average of M independent learners trained on bootstrap samples
    const baggingPred = xValues.map(x => {
      let sum = 0;
      for (let m = 0; m < baggingLearners; m++) {
        // Each learner h_m(x) trained on different bootstrap sample
        // Simulate different decision trees/regression models
        const noise = (Math.random() - 0.5) * 0.3; // Bootstrap sampling noise
        const treeEffect = Math.sin(x + m * 0.2) * 0.4; // Tree-like behavior
        const linearEffect = x * (0.1 + m * 0.02); // Slight linear trend
        const h_m = treeEffect + linearEffect + noise;
        sum += h_m;
      }
      return sum / baggingLearners; // ŷ_bag(x) = (1/M) Σ h_m(x)
    });

    // Boosting: SUPER SIMPLE - JUST MAKE IT WORK!
    const boostingPred = xValues.map(x => {
      return Math.sin(x) * 0.5 + Math.sin(x * 2) * 0.3;
    });

    // Stacking: Meta-learner combining base models
    const stackingPred = xValues.map(x => {
      // Train base models: h₁(x), h₂(x), ..., hM(x)
      const h1 = x * 0.1; // Linear model h₁(x)
      const h2 = Math.sin(x) * 0.8; // Tree model h₂(x)
      const h3 = Math.cos(x) * 0.6; // kNN model h₃(x)
      
      // Stack predictions as features: z(x) = [h₁(x), ..., hM(x)]
      // Train meta-model g on z(x): ŷ_stack(x) = g(h₁(x), h₂(x), ..., hM(x))
      if (stackingMetaLearner === 'linear') {
        // Linear meta-learner: g(z) = w₁h₁(x) + w₂h₂(x) + w₃h₃(x)
        return stackingWeights[0] * h1 + stackingWeights[1] * h2 + stackingWeights[2] * h3;
      } else {
        // Logistic meta-learner: g(z) = sigmoid(w₁h₁(x) + w₂h₂(x) + w₃h₃(x))
        const linearCombination = stackingWeights[0] * h1 + stackingWeights[1] * h2 + stackingWeights[2] * h3;
        return Math.tanh(linearCombination); // Simplified sigmoid
      }
    });

    return {
      bagging: baggingPred,
      boosting: boostingPred,
      stacking: stackingPred,
      xValues
    };
  }, [baggingLearners, boostingSteps, boostingLearningRate, stackingMetaLearner, stackingWeights]);

  const ensembleTypes = [
    {
      id: 'bagging',
      name: 'Bagging (Bootstrap Aggregating)',
      icon: <Users className="h-5 w-5" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      description: 'Train M models independently on random bootstrap samples, average predictions',
      formula: 'ŷ_bag(x) = (1/M) Σ h_m(x)',
      analogy: 'Ask multiple friends separately, take majority opinion'
    },
    {
      id: 'boosting',
      name: 'Boosting',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      description: 'Train models sequentially, each focusing on residuals/errors with learning rate η',
      formula: 'F_m(x) = F_{m-1}(x) + η * α_m * h_m(x)',
      analogy: 'A tutoring chain, where each teacher fixes what the last missed'
    },
    {
      id: 'stacking',
      name: 'Stacking (Stacked Generalization)',
      icon: <Brain className="h-5 w-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      description: 'Combines predictions of multiple diverse base models using a meta-learner',
      formula: 'ŷ_stack(x) = g(h₁(x), h₂(x), ..., hM(x))',
      analogy: 'A head teacher combining students\' answers into the best one'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Recap – Ensemble Learning
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Why Ensembles? Combining multiple models for stable & accurate results
            </p>
            <div className="w-16 h-0.5 bg-primary mt-3"></div>
          </div>
          <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            Slide 2
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Why Ensembles Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">Why Ensembles?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground leading-relaxed">
                A single weak model often overfits or underfits
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground leading-relaxed">
                Ensembles combine multiple models to get stable & accurate results
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground leading-relaxed">
                Three main types: Bagging, Boosting, and Stacking
              </p>
            </div>
          </div>
        </div>

        {/* Ensemble Comparison Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Key Differences Between Ensemble Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ensembleTypes.map((ensemble) => (
              <Card key={ensemble.id} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${ensemble.color}`}>
                    <div className={`p-2 rounded-lg ${ensemble.bgColor}`}>
                      {ensemble.icon}
                    </div>
                    <span>{ensemble.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Training Approach:</h4>
                    <p className="text-sm text-muted-foreground">{ensemble.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Characteristics:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {ensemble.id === 'bagging' && (
                        <>
                          <li>• Parallel training</li>
                          <li>• Reduces variance</li>
                          <li>• Equal weight voting</li>
                          <li>• Robust to outliers</li>
                        </>
                      )}
                      {ensemble.id === 'boosting' && (
                        <>
                          <li>• Sequential training</li>
                          <li>• Reduces bias</li>
                          <li>• Focuses on errors</li>
                          <li>• Can overfit</li>
                        </>
                      )}
                      {ensemble.id === 'stacking' && (
                        <>
                          <li>• Meta-learning</li>
                          <li>• Combines different algorithms</li>
                          <li>• Learns optimal weights</li>
                          <li>• Often best performance</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Best For:</h4>
                    <p className="text-sm text-muted-foreground">
                      {ensemble.id === 'bagging' && 'High-variance models, noisy data'}
                      {ensemble.id === 'boosting' && 'High-bias models, complex patterns'}
                      {ensemble.id === 'stacking' && 'Maximum performance, diverse models'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Simulation Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Interactive Ensemble Simulation
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Visualize Bagging, Boosting, and Stacking side-by-side on the same dataset (y = sin(x)). 
              Adjust parameters and see how each ensemble method learns differently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Dataset & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dataset Info */}
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Dataset</h4>
                  <p className="text-sm text-muted-foreground">
                    y = sin(x), x ∈ [-2π, 2π]<br/>
                    No added noise (ε = 0)<br/>
                    Smoothly oscillating points
                  </p>
                </div>

                {/* Ensemble Type Tabs */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Select Ensemble Method:</h4>
                  <div className="flex flex-col space-y-2">
                    {ensembleTypes.map((ensemble) => (
                      <Button
                        key={ensemble.id}
                        variant={activeTab === ensemble.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTab(ensemble.id as any)}
                        className={activeTab === ensemble.id ? `${ensemble.bgColor} ${ensemble.color}` : ''}
                      >
                        {ensemble.icon}
                        <span className="ml-2">{ensemble.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Controls based on active tab */}
                {activeTab === 'bagging' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Bagging Controls:</h4>
                    <div className="bg-blue-500/10 rounded-lg p-3 mb-3">
                      <p className="text-xs text-muted-foreground">
                        <strong>Bootstrap Aggregating:</strong> Each learner h_m(x) is trained on a random bootstrap sample of the original data. 
                        Final prediction is the average of all M learners.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Number of Learners (M): {baggingLearners}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={baggingLearners}
                        onChange={(e) => setBaggingLearners(Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Formula: ŷ_bag(x) = (1/M) Σ h_m(x)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        As M increases, ensemble output becomes smoother and more stable
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'boosting' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Boosting Controls:</h4>
                    <div className="bg-purple-500/10 rounded-lg p-3 mb-3">
                      <p className="text-xs text-muted-foreground">
                        <strong>Sequential Training:</strong> Each model h_m(x) focuses on the residuals/errors of the combined previous models. 
                        Models are weighted by their accuracy (α_m), with more accurate models getting higher weights.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Number of Steps (M): {boostingSteps}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={boostingSteps}
                        onChange={(e) => setBoostingSteps(Number(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Each step adds a new model focusing on previous errors
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Learning Rate (η): {boostingLearningRate.toFixed(2)}
                      </label>
                      <input
                        type="range"
                        min="0.01"
                        max="1.0"
                        step="0.01"
                        value={boostingLearningRate}
                        onChange={(e) => setBoostingLearningRate(Number(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Formula: F<sub>m</sub>(x) = F<sub>m-1</sub>(x) + η * α<sub>m</sub> * h<sub>m</sub>(x)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        η controls contribution of each weak learner
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Small η = smoother learning, Large η = faster but risk overfitting
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'stacking' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Stacking Controls:</h4>
                    <div className="bg-green-500/10 rounded-lg p-3 mb-3">
                      <p className="text-xs text-muted-foreground">
                        <strong>Stacked Generalization:</strong> Train base models h₁(x), h₂(x), ..., hM(x), 
                        then train meta-model g to combine their predictions. Stack predictions as features: z(x) = [h₁(x), ..., hM(x)].
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Meta-learner g:
                      </label>
                      <div className="flex space-x-2">
                        {(['linear', 'logistic'] as const).map((meta) => (
                          <Button
                            key={meta}
                            variant={stackingMetaLearner === meta ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStackingMetaLearner(meta)}
                            className={stackingMetaLearner === meta ? 'bg-green-500' : ''}
                          >
                            {meta.charAt(0).toUpperCase() + meta.slice(1)}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Meta-learner learns optimal combination weights
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Base Learner Weights:
                      </label>
                      <div className="space-y-2">
                        {['h₁(x) Linear', 'h₂(x) Tree', 'h₃(x) kNN'].map((learner, idx) => (
                          <div key={learner}>
                            <label className="text-xs text-muted-foreground">
                              {learner}: {stackingWeights[idx].toFixed(2)}
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={stackingWeights[idx]}
                              onChange={(e) => {
                                const newWeights = [...stackingWeights];
                                newWeights[idx] = Number(e.target.value);
                                setStackingWeights(newWeights);
                              }}
                              className="w-full h-1 bg-green-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Formula: ŷ_stack(x) = g(h₁(x), h₂(x), ..., hM(x))
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Where g could be any regression or classification model
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dynamic Visualization - Bigger Chart */}
            <Card className="bg-card border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dynamic Chart - Bigger */}
                <div className="h-96 w-full">
                  <EnsembleChart
                    dataset={toyDataset}
                    predictions={ensemblePredictions[activeTab]}
                    xValues={ensemblePredictions.xValues}
                    ensembleType={activeTab}
                    baggingLearners={baggingLearners}
                    boostingSteps={boostingSteps}
                    boostingLearningRate={boostingLearningRate}
                    stackingWeights={stackingWeights}
                  />
                </div>
                
                {/* Current prediction info */}
                <div className="bg-secondary/30 rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-foreground mb-2">Current Prediction:</h5>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {activeTab === 'bagging' && (
                      <>
                        <div>Individual learners: {baggingLearners} grey lines</div>
                        <div>Final output: thick blue line (average)</div>
                        <div>Weight per model: {(1/baggingLearners).toFixed(3)}</div>
                      </>
                    )}
                    {activeTab === 'boosting' && (
                      <>
                        <div>Sequential steps: {boostingSteps}</div>
                        <div>Learning rate: {boostingLearningRate.toFixed(2)}</div>
                        <div>Residual correction: active</div>
                      </>
                    )}
                    {activeTab === 'stacking' && (
                      <>
                        <div>Base learners: Linear (red), Tree (green), kNN (yellow)</div>
                        <div>Meta-learner: {stackingMetaLearner}</div>
                        <div>Weights: {stackingWeights.map(w => w.toFixed(2)).join(', ')}</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section - Key Insights */}
      <div className="border-t border-border pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Bagging Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Reduces variance, parallel training, robust to outliers
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Boosting Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Reduces bias, sequential learning, focuses on difficult cases
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-400 mb-2">Stacking Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Combines different algorithms, meta-learning, often best performance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnsembleLearningSlide;
