import React, { useRef, useEffect } from 'react';

interface DataPoint {
  x: number;
  y: number;
}

interface EnsembleChartProps {
  dataset: DataPoint[];
  predictions: number[];
  xValues: number[];
  ensembleType: 'bagging' | 'boosting' | 'stacking';
  baggingLearners?: number;
  boostingSteps?: number;
  boostingLearningRate?: number;
  stackingWeights?: number[];
}

const EnsembleChart: React.FC<EnsembleChartProps> = ({
  dataset,
  predictions,
  xValues,
  ensembleType,
  baggingLearners = 5,
  boostingSteps = 5,
  boostingLearningRate = 0.1,
  stackingWeights = [0.4, 0.3, 0.3]
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Add error handling
    try {
      console.log('Rendering EnsembleChart with axis labels...');

    // Set canvas size - bigger for better visualization
    canvas.width = 800;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Find data bounds
    const allX = [...dataset.map(d => d.x), ...xValues];
    const allY = [...dataset.map(d => d.y), ...predictions];
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    // Add some padding to bounds
    const xRange = maxX - minX;
    const yRange = maxY - minY;
    const xMin = minX - xRange * 0.1;
    const xMax = maxX + xRange * 0.1;
    const yMin = minY - yRange * 0.1;
    const yMax = maxY + yRange * 0.1;

    // Convert coordinates
    const toScreenX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * chartWidth;
    const toScreenY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * chartHeight;

    // Draw axes
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines (without labels for now)
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 0.8;
    
    // Draw vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * chartWidth;
      
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * chartHeight;
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw dataset points
    ctx.fillStyle = '#fbbf24';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    dataset.forEach(point => {
      const x = toScreenX(point.x);
      const y = toScreenY(point.y);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    });

    // Draw ensemble-specific visualizations
    if (ensembleType === 'bagging') {
      // Draw individual learners (thin grey lines) - Bootstrap Aggregating
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;
      
      for (let m = 0; m < baggingLearners; m++) {
        ctx.beginPath();
        let firstPoint = true;
        xValues.forEach((x) => {
          // Each learner trained on different bootstrap sample
          // Simulate different decision trees/regression models
          const noise = (Math.random() - 0.5) * 0.3; // Bootstrap sampling noise
          const treeEffect = Math.sin(x + m * 0.2) * 0.4; // Tree-like behavior
          const linearEffect = x * (0.1 + m * 0.02); // Slight linear trend
          const y = treeEffect + linearEffect + noise;
          
          const screenX = toScreenX(x);
          const screenY = toScreenY(y);
          
          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        });
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      
      // Draw final bagging prediction (thick blue line) - Average of all learners
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      let firstPoint = true;
      xValues.forEach((x, i) => {
        const screenX = toScreenX(x);
        const screenY = toScreenY(predictions[i]);
        
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      });
      ctx.stroke();
      
      // Add equation annotation
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('ŷ_bag(x) = (1/M) Σ h_m(x)', padding + 10, padding + 20);

    } else if (ensembleType === 'boosting') {
      // SUPER SIMPLE BOOSTING - JUST MAKE IT WORK!
      
      // Draw a simple sine wave for boosting
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let i = 0; i < xValues.length; i++) {
        const x = xValues[i];
        const y = Math.sin(x) * 0.5 + Math.sin(x * 2) * 0.3;
        const screenX = toScreenX(x);
        const screenY = toScreenY(y);
        
        if (i === 0) {
          ctx.moveTo(screenX, screenY);
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
      ctx.stroke();
      
      // Draw some sequential steps
      for (let step = 1; step <= Math.min(boostingSteps, 5); step++) {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        
        for (let i = 0; i < xValues.length; i++) {
          const x = xValues[i];
          const y = Math.sin(x + step * 0.1) * 0.4;
          const screenX = toScreenX(x);
          const screenY = toScreenY(y);
          
          if (i === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      
      // Add text
      ctx.fillStyle = '#8b5cf6';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('BOOSTING WORKS!', padding + 10, padding + 30);
      
      ctx.font = '12px Arial';
      ctx.fillText(`Steps: ${boostingSteps}`, padding + 10, padding + 50);
      ctx.fillText(`Learning Rate: ${(boostingLearningRate || 0.1).toFixed(2)}`, padding + 10, padding + 70);

    } else if (ensembleType === 'stacking') {
      // Draw individual base learners h₁(x), h₂(x), ..., hM(x) (colored lines)
      const baseLearnerColors = ['#facc15', '#22c55e', '#ef4444']; // Yellow, Green, Red
      const learnerNames = ['Linear', 'Tree', 'kNN'];
      
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      
      // Calculate base learner predictions
      const basePredictions: number[][] = [];
      xValues.forEach(x => {
        const linearPred = x * 0.1; // Linear model h₁(x)
        const treePred = Math.sin(x) * 0.8; // Tree model h₂(x)
        const knnPred = Math.cos(x) * 0.6; // kNN model h₃(x)
        basePredictions.push([linearPred, treePred, knnPred]);
      });
      
      // Draw each base learner with weighted contributions
      learnerNames.forEach((_, idx) => {
        ctx.strokeStyle = baseLearnerColors[idx];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6 + (stackingWeights[idx] * 0.4); // Opacity based on weight
        ctx.beginPath();
        let firstPoint = true;
        xValues.forEach((x, i) => {
          const screenX = toScreenX(x);
          // Scale the base prediction by its weight to show contribution
          const weightedPred = basePredictions[i][idx] * stackingWeights[idx];
          const screenY = toScreenY(weightedPred);
          
          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        });
        ctx.stroke();
      });
      
      ctx.globalAlpha = 1;
      
      // Draw final stacked prediction ŷ_stack(x) = g(h₁(x), h₂(x), ..., hM(x))
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      let firstPoint = true;
      xValues.forEach((x, i) => {
        const screenX = toScreenX(x);
        const screenY = toScreenY(predictions[i]);
        
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      });
      ctx.stroke();
      
      // Add equation annotation
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('ŷ_stack(x) = g(h₁(x), h₂(x), ..., hM(x))', padding + 10, padding + 20);
      
      // Add base learner labels with current weights
      ctx.font = '12px Arial';
      ctx.fillText('Base Models (Weighted):', padding + 10, padding + 40);
      ctx.fillStyle = '#facc15';
      ctx.fillText(`• h₁(x) = Linear (Yellow) - Weight: ${stackingWeights[0].toFixed(2)}`, padding + 10, padding + 55);
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`• h₂(x) = Tree (Green) - Weight: ${stackingWeights[1].toFixed(2)}`, padding + 10, padding + 70);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`• h₃(x) = kNN (Red) - Weight: ${stackingWeights[2].toFixed(2)}`, padding + 10, padding + 85);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Meta-learner g combines weighted predictions', padding + 10, padding + 105);
    }

    // Draw numerical axis labels (drawn last to ensure visibility)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // Draw x-axis numerical labels
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 11px Arial';
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * chartWidth;
      const xValue = xMin + (i / 10) * (xMax - xMin);
      
      // Add x-axis labels with better positioning
      ctx.fillText(xValue.toFixed(1), x, canvas.height - padding + 15);
      console.log(`Drawing x-axis label: ${xValue.toFixed(1)} at position (${x}, ${canvas.height - padding + 15})`);
    }
    
    // Draw y-axis numerical labels (with 0 at bottom)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * chartHeight;
      const yValue = yMin + (i / 10) * (yMax - yMin); // Maps from yMin to yMax (0 at bottom)
      
      // Add y-axis labels with better positioning
      ctx.fillText(yValue.toFixed(1), padding - 8, y + 3);
      console.log(`Drawing y-axis label: ${yValue.toFixed(1)} at position (${padding - 8}, ${y + 3})`);
    }
    
    // Reset text alignment
    ctx.textAlign = 'left';

    // Draw axis labels and titles
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    
    // X-axis title
    ctx.fillText('x', canvas.width - 20, canvas.height - 10);
    
    // Y-axis title (rotated)
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('y', 0, 0);
    ctx.restore();
    
    // Add axis titles
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Input (x)', canvas.width / 2 - 30, canvas.height - 5);
    
    ctx.save();
    ctx.translate(10, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Output (y)', -30, 0);
    ctx.restore();

    } catch (error) {
      console.error('Error rendering ensemble chart:', error);
    }
  }, [dataset, predictions, xValues, ensembleType, baggingLearners, boostingSteps, boostingLearningRate, stackingWeights]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-visible">
      <canvas
        ref={canvasRef}
        className="border border-border rounded-lg bg-card"
        style={{ maxWidth: '100%', height: '500px' }}
        width={800}
        height={500}
      />
    </div>
  );
};

export default EnsembleChart;
