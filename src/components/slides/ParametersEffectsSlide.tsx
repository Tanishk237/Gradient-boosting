import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TreePine, 
  Layers,
  Shuffle,
  AlertTriangle,
  Zap
} from 'lucide-react';

const ParametersEffectsSlide: React.FC = () => {

  const parameters = [
    {
      id: 0,
      name: "Learning Rate (η)",
      icon: <Zap className="h-6 w-6" />,
      color: "from-blue-500/70 to-blue-600/70",
      analogy: {
        small: "Like taking tiny steps on a winding road—safe but slow progress",
        large: "Like running fast downhill—can be quick but may overshoot the target"
      }
    },
    {
      id: 1,
      name: "Tree Depth",
      icon: <TreePine className="h-6 w-6" />,
      color: "from-green-500/70 to-green-600/70",
      analogy: {
        small: "Like making decisions by flipping a coin—too simple, might miss details",
        large: "Like going deep into multiple layers of reasoning—capturing more details but risks memorizing noise"
      }
    },
    {
      id: 2,
      name: "Number of Trees",
      icon: <Layers className="h-6 w-6" />,
      color: "from-purple-500/70 to-purple-600/70",
      analogy: {
        small: "Like asking only a couple of experts for advice—may miss the full picture and perform poorly",
        large: "Like asking too many experts and over-listening to every single opinion, including noise—may perform well on known data but poorly on new data"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Parameters & Their Effects</h1>
        <p className="text-xl text-muted-foreground">Understanding How Parameters Control Model Behavior</p>
        <div className="mt-4 text-sm text-muted-foreground max-w-4xl mx-auto">
          <p><strong>Key Insight:</strong> Each parameter affects the balance between underfitting and overfitting</p>
        </div>
      </div>

      {/* Main Content - Simplified Layout */}
      <div className="space-y-8 mb-8">
        {/* Key Parameters Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {parameters.map((param) => (
            <Card key={param.id} className={`bg-gradient-to-br ${param.color} border-0 shadow-xl`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {param.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{param.name}</h3>
                    <p className="text-white/80 text-sm">Key Parameter</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Small Value:</h4>
                    <p className="text-white/80 text-sm">{param.analogy.small}</p>
                  </div>
                  
                  <div className="bg-white/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Large Value:</h4>
                    <p className="text-white/80 text-sm">{param.analogy.large}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Definitions Section */}
      <Card className="bg-card border-border shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Key Definitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-2">Underfitting</h3>
              <p className="text-sm text-muted-foreground">
                When a model is too simple and cannot capture the underlying pattern in data. 
                It performs poorly even on training data.
              </p>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h3 className="font-semibold text-orange-400 mb-2">Overfitting</h3>
              <p className="text-sm text-muted-foreground">
                When a model is too complex and starts capturing noise as if it were a pattern, 
                performing very well on training data but poorly on new/unseen data.
              </p>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Shuffle className="h-4 w-4" />
                Subsampling
              </h3>
              <p className="text-sm text-muted-foreground">
                Randomly choosing data for each tree. Adds randomness that helps the model 
                generalize well, like learning from varied experiences rather than repeating the same one.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Key Takeaways */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Key Takeaways</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-4">
                <strong>Parameter Tuning is Critical:</strong> Each parameter affects the balance between underfitting and overfitting. 
                The key is finding the sweet spot that maximizes performance on unseen data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-2">Learning Rate</h3>
                  <p className="text-muted-foreground">Controls how fast the model learns. Too high = unstable, too low = slow.</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">Tree Depth</h3>
                  <p className="text-muted-foreground">Controls model complexity. Shallow = simple, deep = complex.</p>
                </div>
                <div className="bg-background/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-2">Number of Trees</h3>
                  <p className="text-muted-foreground">Controls ensemble size. Few = underfitting, many = overfitting risk.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParametersEffectsSlide;
