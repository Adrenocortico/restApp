import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card"

const ProportionCalculator = () => {
  const [values, setValues] = useState({
    a: '',
    b: '',
    c: '',
    d: ''
  });
  
  const [steps, setSteps] = useState('');
  
  useEffect(() => {
    if (values.a && values.b && values.c) {
      calculateProportion();
    }
  }, [values.a, values.b, values.c]);
  
  const calculateProportion = () => {
    const a = parseFloat(values.a);
    const b = parseFloat(values.b);
    const c = parseFloat(values.c);
    
    if (a && b && c) {
      const d = (b * c) / a;
      setValues(prev => ({ ...prev, d: d.toFixed(2) }));
      
      setSteps(`
1. Formula: ${a}:${b} = ${c}:x
2. Moltiplicazione incrociata: ${a}x = ${b} × ${c}
3. Risoluzione: x = (${b} × ${c}) ÷ ${a}
4. Risultato: x = ${d.toFixed(2)}
      `);
    }
  };
  
  const handleInputChange = (field, value) => {
    // Accetta solo numeri e punto decimale
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Calcolatore di Proporzioni</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-5 gap-2 items-center">
            <input
              type="text"
              inputMode="decimal"
              value={values.a}
              onChange={(e) => handleInputChange('a', e.target.value)}
              className="p-2 border rounded text-center"
              placeholder="A"
            />
            <span className="text-center">:</span>
            <input
              type="text"
              inputMode="decimal"
              value={values.b}
              onChange={(e) => handleInputChange('b', e.target.value)}
              className="p-2 border rounded text-center"
              placeholder="B"
            />
            <span className="text-center">=</span>
            <input
              type="text"
              inputMode="decimal"
              value={values.c}
              onChange={(e) => handleInputChange('c', e.target.value)}
              className="p-2 border rounded text-center"
              placeholder="C"
            />
          </div>
          
          <div className="text-center text-2xl font-bold">
            {values.d && `Risultato: ${values.d}`}
          </div>
          
          {steps && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Passaggi:</h3>
              <pre className="whitespace-pre-wrap">{steps}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProportionCalculator;
