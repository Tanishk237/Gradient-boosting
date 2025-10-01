import React, { useEffect, useRef } from 'react';

interface GradientBoostingVisualizationProps {
  currentStep: number;
  width?: number;
  height?: number;
}

const GradientBoostingVisualization: React.FC<GradientBoostingVisualizationProps> = ({
  currentStep,
  width = 400,
  height = 300
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up coordinate system
    const padding = 40;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    const toScreenX = (x: number) => padding + ((x + 2 * Math.PI) / (4 * Math.PI)) * plotWidth;
    const toScreenY = (y: number) => padding + plotHeight - ((y + 1.5) / 3) * plotHeight;

    // Generate sample data
    const dataPoints = [];
    for (let i = 0; i < 20; i++) {
      const x = (i / 19) * 4 * Math.PI - 2 * Math.PI;
      const y = Math.sin(x) + (Math.random() - 0.5) * 0.4;
      dataPoints.push({ x, y });
    }

    // Draw axes
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#f97316';
    dataPoints.forEach(point => {
      const x = toScreenX(point.x);
      const y = toScreenY(point.y);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw different visualizations based on current step
    switch (currentStep) {
      case 0: // Baseline
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(padding, toScreenY(0));
        ctx.lineTo(width - padding, toScreenY(0));
        ctx.stroke();
        
        break;

      case 1: // Residuals
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(padding, toScreenY(0));
        ctx.lineTo(width - padding, toScreenY(0));
        ctx.stroke();

        // Draw residuals as arrows
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        dataPoints.forEach(point => {
          const x = toScreenX(point.x);
          const y = toScreenY(point.y);
          const baselineY = toScreenY(0);
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, baselineY);
          ctx.stroke();
          
          // Arrow head
          ctx.beginPath();
          ctx.moveTo(x, baselineY);
          ctx.lineTo(x - 3, baselineY + 5);
          ctx.moveTo(x, baselineY);
          ctx.lineTo(x + 3, baselineY + 5);
          ctx.stroke();
        });

        break;

      case 2: // Weak learner
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(padding, toScreenY(0));
        ctx.lineTo(width - padding, toScreenY(0));
        ctx.stroke();

        // Draw weak learner (simplified step function)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += 0.1) {
          const screenX = toScreenX(x);
          const screenY = toScreenY(Math.sin(x) * 0.3);
          if (x === -2 * Math.PI) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        break;

      case 3: // Updated model
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += 0.1) {
          const screenX = toScreenX(x);
          const screenY = toScreenY(Math.sin(x) * 0.7);
          if (x === -2 * Math.PI) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();

        break;

      case 4: // Converged model
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += 0.1) {
          const screenX = toScreenX(x);
          const screenY = toScreenY(Math.sin(x) + Math.sin(2 * x) * 0.1);
          if (x === -2 * Math.PI) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();

        break;
    }


  }, [currentStep, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-border rounded-lg bg-muted/20"
      style={{ width, height }}
    />
  );
};

export default GradientBoostingVisualization;

