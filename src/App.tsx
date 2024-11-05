import React from 'react';
import ProportionCalculator from './ProportionCalculator';
import PercentageCalculator from './PercentageCalculator';
import MaltaCalculator from './MaltaCalculator';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 space-y-8">
        <ProportionCalculator />
        <PercentageCalculator />
        <MaltaCalculator />
      </div>
    </div>
  );
};

export default App;
