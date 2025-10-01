import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Target, TrendingUp, Users, Brain, Zap, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const BoostingOverviewSlide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Boosting Overview</h1>
        <p className="text-xl text-muted-foreground">Sequential learning from mistakes to build strong models</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Panel - Core Concepts */}
        <div className="space-y-6">
          {/* Definition Card */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Brain className="h-6 w-6" />
                <span>What is Boosting?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    Boosting is an ensemble technique where multiple weak learners are trained sequentially
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    Each new learner focuses on the mistakes (residuals or errors) of the previous ones
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    Final model is a weighted combination of all learners
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Target className="h-6 w-6" />
                <span>Key Characteristics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sequential Training</h4>
                    <p className="text-sm text-muted-foreground">Models learn one after another</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Error Focus</h4>
                    <p className="text-sm text-muted-foreground">Each learner targets previous mistakes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Weighted Combination</h4>
                    <p className="text-sm text-muted-foreground">Final prediction uses importance weights</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Bias Reduction</h4>
                    <p className="text-sm text-muted-foreground">Works by 'zooming in' on hard-to-fit parts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Visual Elements */}
        <div className="space-y-6">
          {/* Student Analogy Visual */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <BookOpen className="h-6 w-6" />
                <span>Student & Exams Analogy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Visual Flow */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Student</p>
                    <p className="text-xs text-muted-foreground">Takes tests</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                      <AlertCircle className="h-8 w-8 text-orange-500" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Tutor</p>
                    <p className="text-xs text-muted-foreground">Reviews mistakes</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Improvement</p>
                    <p className="text-xs text-muted-foreground">Better scores</p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="bg-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Student takes practice tests → tutor reviews mistakes → focused training → improvement over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formula Visualization */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Brain className="h-6 w-6" />
                <span>Mathematical Foundation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Formula Display */}
                <div className="bg-primary/10 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    F<sub>M</sub>(x) = Σ α<sub>m</sub> h<sub>m</sub>(x)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Where: h<sub>m</sub>(x) = weak learner at step m, α<sub>m</sub> = weight (importance)
                  </div>
                </div>
                
                {/* Sequential Learning Diagram */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Sequential Learning Process:</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{step}</span>
                        </div>
                        <div className="flex-1 h-2 bg-primary/20 rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(step / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Step {step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Why Boosting Works */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Why Boosting Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Weak Learners</h4>
                <p className="text-sm text-muted-foreground">Alone have high error</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-8 w-8 text-yellow-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Adaptive Combination</h4>
                <p className="text-sm text-muted-foreground">Reduces bias and variance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Strong Model</h4>
                <p className="text-sm text-muted-foreground">Works like 'zooming in' on hard parts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoostingOverviewSlide;
