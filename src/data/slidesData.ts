export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  visuals?: string[];
  keyPoints?: string[];
  code?: string;
  examples?: string[];
}

export const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Gradient Boosting: Concepts and Applications",
    subtitle: "Sequentially correcting errors to build strong models",
    content: [
      "Welcome to our comprehensive presentation on Gradient Boosting",
      "We'll explore the fundamental concepts, mathematical foundations, and real-world applications",
      "This technique has revolutionized machine learning and is widely used in industry"
    ],
    visuals: ["Multiple small arrows combining into a large arrow", "Subtle gradient background"]
  },
  {
    id: 2,
    title: "Recap – Ensemble Learning",
    subtitle: "Why Ensembles? Combining multiple models for stable & accurate results",
    content: [
      "A single weak model often overfits or underfits",
      "Ensembles combine multiple models to get stable & accurate results",
      "Three main types: Bagging, Boosting, and Stacking"
    ],
    keyPoints: [
      "Bagging → Train models independently in parallel, then average or vote",
      "Boosting → Train models sequentially, each fixing previous mistakes", 
      "Stacking → Train a meta-learner on outputs of base models"
    ],
    examples: [
      "Bagging Analogy: Ask multiple friends separately, take majority opinion",
      "Boosting Analogy: A tutoring chain, where each teacher fixes what the last missed",
      "Stacking Analogy: A head teacher combining students' answers into the best one"
    ],
    visuals: [
      "Interactive simulation showing Bagging, Boosting, and Stacking side-by-side",
      "Toy dataset visualization with live parameter adjustments",
      "Real-time prediction curves updating with slider controls"
    ]
  },
  {
    id: 3,
    title: "Boosting Overview",
    subtitle: "Sequential learning from mistakes to build strong models",
    content: [
      "Boosting is an ensemble technique where multiple weak learners are trained sequentially",
      "Each new learner focuses on the mistakes (residuals or errors) of the previous ones",
      "Final model is a weighted combination of all learners"
    ],
    keyPoints: [
      "Sequential Training: Models learn one after another",
      "Error Focus: Each learner targets previous mistakes",
      "Weighted Combination: Final prediction uses importance weights",
      "Bias Reduction: Works by 'zooming in' on hard-to-fit parts"
    ],
    examples: [
      "Student & Exams Analogy: Student takes practice tests → tutor reviews mistakes → focused training → improvement over time",
      "Weak learners alone have high error, but combining them adaptively reduces bias and variance"
    ],
    visuals: [
      "Cartoon: student with stack of exams → tutor points out wrong answers → corrections → marks improve over time",
      "Formula visualization: F_M(x) = Σ α_m h_m(x)",
      "Sequential learning diagram showing error correction process"
    ]
  },
  {
    id: 4,
    title: "Boosting vs Bagging",
    content: [
      "Both are ensemble methods but work differently",
      "Bagging: Parallel training of independent models",
      "Boosting: Sequential training where each model learns from previous errors"
    ],
    keyPoints: [
      "Bagging: Reduces variance, parallel training",
      "Boosting: Reduces bias, sequential training",
      "Examples: Random Forest (Bagging) vs Gradient Boosting (Boosting)"
    ]
  },
  {
    id: 5,
    title: "Gradient Boosting Algorithm",
    content: [
      "The algorithm works by iteratively adding weak learners",
      "Each new model focuses on the errors made by previous models",
      "The final prediction is the sum of all individual predictions"
    ],
    keyPoints: [
      "Initialize with a simple model",
      "Calculate residuals (errors)",
      "Train new model on residuals",
      "Combine predictions"
    ]
  },
  {
    id: 6,
    title: "Mathematical Foundation",
    content: [
      "Gradient Boosting uses gradient descent to minimize the loss function",
      "The algorithm finds the direction of steepest descent",
      "Each iteration moves closer to the optimal solution"
    ],
    keyPoints: [
      "Loss Function: Measures prediction error",
      "Gradient: Direction of steepest increase",
      "Learning Rate: Controls step size"
    ]
  },
  {
    id: 7,
    title: "XGBoost Implementation",
    content: [
      "XGBoost (Extreme Gradient Boosting) is an optimized implementation",
      "It includes several improvements over standard gradient boosting",
      "Widely used in competitions and production systems"
    ],
    keyPoints: [
      "Regularization: Prevents overfitting",
      "Parallel Processing: Faster training",
      "Handles Missing Values: Built-in support"
    ]
  },
  {
    id: 8,
    title: "LightGBM vs XGBoost",
    content: [
      "Both are advanced implementations of gradient boosting",
      "LightGBM focuses on speed and memory efficiency",
      "XGBoost provides more tuning options and stability"
    ],
    keyPoints: [
      "LightGBM: Faster training, less memory",
      "XGBoost: More stable, better for small datasets",
      "Choose based on your specific requirements"
    ]
  },
  {
    id: 9,
    title: "Real-world Applications",
    content: [
      "Gradient Boosting is used in many industries",
      "From finance to healthcare, it solves complex problems",
      "Its ability to handle mixed data types makes it versatile"
    ],
    keyPoints: [
      "Finance: Credit scoring, fraud detection",
      "Healthcare: Disease prediction, drug discovery",
      "Technology: Recommendation systems, search ranking"
    ]
  },
  {
    id: 10,
    title: "Conclusion & Q&A",
    content: [
      "Gradient Boosting is a powerful ensemble method",
      "It combines the strengths of multiple weak learners",
      "Understanding its principles helps in choosing the right implementation"
    ],
    keyPoints: [
      "Key Takeaways: Sequential learning, error correction",
      "Best Practices: Tuning parameters, avoiding overfitting",
      "Future Directions: Continued optimization and new applications"
    ]
  }
];
