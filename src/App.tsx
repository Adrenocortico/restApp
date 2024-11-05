import React from 'react';
import ProportionCalculator from './ProportionCalculator';
import PercentageCalculator from './PercentageCalculator';
import MaltaCalculator from './MaltaCalculator';

const App = () => {
  return (
    <div className="p-4 space-y-8">
      <ProportionCalculator />
      <PercentageCalculator />
      <MaltaCalculator />
    </div>
  );
};

export default App;
