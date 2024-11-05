import React from 'react';
import ProportionCalculator from './ProportionCalculator';
import PercentageCalculator from './PercentageCalculator';

const App = () => {
  return (
    <div className="p-4 space-y-8">
      <ProportionCalculator />
      <PercentageCalculator />
    </div>
  );
};

export default App;
