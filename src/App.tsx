import Presentation from './components/Presentation';
import TitleSlide from './components/slides/TitleSlide';
import EnsembleLearningSlide from './components/slides/EnsembleLearningSlide';
import AdaBoostVsGradientBoostingSlide from './components/slides/AdaBoostVsGradientBoostingSlide';
import BoostingSimulationSlide from './components/slides/BoostingSimulationSlide';
import HowGradientBoostingWorksSlide from './components/slides/HowGradientBoostingWorksSlide';
import LossFunctionsSlide from './components/slides/LossFunctionsSlide';
import ParametersEffectsSlide from './components/slides/ParametersEffectsSlide';
import ApplicationsVariantsSlide from './components/slides/ApplicationsVariantsSlide';
import SummarySlide from './components/slides/SummarySlide';

function App() {
  const slides = [
    {
      id: 1,
      title: "Gradient Boosting: Concepts and Applications",
      content: <TitleSlide />
    },
    {
      id: 2,
      title: "Recap – Ensemble Learning",
      content: <EnsembleLearningSlide />
    },
    {
      id: 3,
      title: "AdaBoost vs Gradient Boosting",
      content: <AdaBoostVsGradientBoostingSlide />
    },
    {
      id: 4,
      title: "Boosting Simulation",
      content: <BoostingSimulationSlide />
    },
    {
      id: 5,
      title: "How Gradient Boosting Works (Step-by-Step)",
      content: <HowGradientBoostingWorksSlide />
    },
    {
      id: 6,
      title: "Loss Functions in Gradient Boosting",
      content: <LossFunctionsSlide />
    },
    {
      id: 7,
      title: "Parameters & Their Effects",
      content: <ParametersEffectsSlide />
    },
    {
      id: 8,
      title: "Applications & Variants",
      content: <ApplicationsVariantsSlide />
    },
    {
      id: 9,
      title: "Summary – Gradient Boosting",
      content: <SummarySlide />
    }
  ];

  return (
    <div className="App">
      <Presentation slides={slides} />
    </div>
  );
}

export default App;
