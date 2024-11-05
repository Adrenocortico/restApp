import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PercentageCalculator = () => {
  // Stati per i diversi calcolatori
  const [percentOfTotal, setPercentOfTotal] = useState({ percent: '', total: '', result: null });
  const [whatPercent, setWhatPercent] = useState({ value: '', total: '', result: null });
  const [reversePercent, setReversePercent] = useState({ value: '', percent: '', result: null });
  const [recipe, setRecipe] = useState({
    totalQuantity: '',
    components: [{ name: '', percentage: '' }],
    results: null
  });

  // Calcola X% di Y
  const calculatePercentOfTotal = () => {
    const percent = parseFloat(percentOfTotal.percent);
    const total = parseFloat(percentOfTotal.total);
    if (percent && total) {
      const result = (percent * total) / 100;
      const remaining = total - result;
      const remainingPercent = 100 - percent;
      setPercentOfTotal(prev => ({
        ...prev,
        result: {
          value: result.toFixed(2),
          remaining,
          percent,
          remainingPercent
        }
      }));
    }
  };

  // Calcola che percentuale è X di Y
  const calculateWhatPercent = () => {
    const value = parseFloat(whatPercent.value);
    const total = parseFloat(whatPercent.total);
    if (value && total) {
      const result = (value / total) * 100;
      const remaining = total - value;
      const remainingPercent = 100 - result;
      setWhatPercent(prev => ({
        ...prev,
        result: {
          percent: result.toFixed(2),
          remaining,
          remainingPercent
        }
      }));
    }
  };

  // Calcola il totale sapendo che X è il Y%
  const calculateReversePercent = () => {
    const value = parseFloat(reversePercent.value);
    const percent = parseFloat(reversePercent.percent);
    if (value && percent) {
      const total = (value * 100) / percent;
      const remaining = total - value;
      const remainingPercent = 100 - percent;
      setReversePercent(prev => ({
        ...prev,
        result: {
          total: total.toFixed(2),
          remaining,
          remainingPercent
        }
      }));
    }
  };

  // Gestisce i calcoli per la ricetta
  const calculateRecipe = () => {
    if (!recipe.totalQuantity) return;
    
    const total = parseFloat(recipe.totalQuantity);
    let sumPercentages = 0;
    const results = [];
    
    recipe.components.forEach(comp => {
      if (comp.percentage) {
        sumPercentages += parseFloat(comp.percentage);
      }
    });

    if (sumPercentages > 100) {
      alert('La somma delle percentuali non può superare 100%');
      return;
    }

    recipe.components.forEach(comp => {
      const percent = parseFloat(comp.percentage) || 0;
      const quantity = (percent * total) / 100;
      results.push({
        name: comp.name || 'Componente',
        percentage: percent,
        quantity: quantity.toFixed(2)
      });
    });

    // Aggiunge il solvente/resto automaticamente
    if (sumPercentages < 100) {
      results.push({
        name: 'Solvente/Resto',
        percentage: 100 - sumPercentages,
        quantity: ((100 - sumPercentages) * total / 100).toFixed(2)
      });
    }

    setRecipe(prev => ({ ...prev, results }));
  };

  // Aggiunge un nuovo componente alla ricetta
  const addComponent = () => {
    setRecipe(prev => ({
      ...prev,
      components: [...prev.components, { name: '', percentage: '' }]
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Calcolatore Percentuali e Ricette</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="percent-of-total">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="percent-of-total">X% di Y</TabsTrigger>
            <TabsTrigger value="what-percent">% di X su Y</TabsTrigger>
            <TabsTrigger value="reverse-percent">Totale da %</TabsTrigger>
            <TabsTrigger value="recipe">Ricetta</TabsTrigger>
          </TabsList>

          {/* Calcola X% di Y */}
          <TabsContent value="percent-of-total">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Percentuale"
                    className="w-full p-2 border rounded"
                    value={percentOfTotal.percent}
                    onChange={(e) => setPercentOfTotal(prev => ({ ...prev, percent: e.target.value }))}
                    onBlur={calculatePercentOfTotal}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Totale"
                    className="w-full p-2 border rounded"
                    value={percentOfTotal.total}
                    onChange={(e) => setPercentOfTotal(prev => ({ ...prev, total: e.target.value }))}
                    onBlur={calculatePercentOfTotal}
                  />
                </div>
              </div>
              {percentOfTotal.result && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>{percentOfTotal.result.percent}% = {percentOfTotal.result.value}</p>
                      <p>{percentOfTotal.result.remainingPercent}% = {percentOfTotal.result.remaining.toFixed(2)}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          {/* Calcola che percentuale è X di Y */}
          <TabsContent value="what-percent">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Valore"
                  className="w-full p-2 border rounded"
                  value={whatPercent.value}
                  onChange={(e) => setWhatPercent(prev => ({ ...prev, value: e.target.value }))}
                  onBlur={calculateWhatPercent}
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Totale"
                  className="w-full p-2 border rounded"
                  value={whatPercent.total}
                  onChange={(e) => setWhatPercent(prev => ({ ...prev, total: e.target.value }))}
                  onBlur={calculateWhatPercent}
                />
              </div>
              {whatPercent.result && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>Percentuale: {whatPercent.result.percent}%</p>
                      <p>Rimanente: {whatPercent.result.remaining.toFixed(2)} ({whatPercent.result.remainingPercent.toFixed(2)}%)</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          {/* Calcola il totale sapendo che X è il Y% */}
          <TabsContent value="reverse-percent">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Valore"
                  className="w-full p-2 border rounded"
                  value={reversePercent.value}
                  onChange={(e) => setReversePercent(prev => ({ ...prev, value: e.target.value }))}
                  onBlur={calculateReversePercent}
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Percentuale"
                  className="w-full p-2 border rounded"
                  value={reversePercent.percent}
                  onChange={(e) => setReversePercent(prev => ({ ...prev, percent: e.target.value }))}
                  onBlur={calculateReversePercent}
                />
              </div>
              {reversePercent.result && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>Totale (100%): {reversePercent.result.total}</p>
                      <p>Rimanente: {reversePercent.result.remaining.toFixed(2)} ({reversePercent.result.remainingPercent}%)</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          {/* Creazione Ricetta */}
          <TabsContent value="recipe">
            <div className="space-y-4">
              <input
                type="text"
                inputMode="decimal"
                placeholder="Quantità totale"
                className="w-full p-2 border rounded"
                value={recipe.totalQuantity}
                onChange={(e) => setRecipe(prev => ({ ...prev, totalQuantity: e.target.value }))}
              />
              
              {recipe.components.map((comp, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome componente"
                    className="w-full p-2 border rounded"
                    value={comp.name}
                    onChange={(e) => {
                      const newComponents = [...recipe.components];
                      newComponents[index].name = e.target.value;
                      setRecipe(prev => ({ ...prev, components: newComponents }));
                    }}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Percentuale"
                    className="w-full p-2 border rounded"
                    value={comp.percentage}
                    onChange={(e) => {
                      const newComponents = [...recipe.components];
                      newComponents[index].percentage = e.target.value;
                      setRecipe(prev => ({ ...prev, components: newComponents }));
                    }}
                  />
                </div>
              ))}
              
              <div className="flex gap-4">
                <button
                  onClick={addComponent}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Aggiungi Componente
                </button>
                <button
                  onClick={calculateRecipe}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Calcola Ricetta
                </button>
              </div>

              {recipe.results && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      {recipe.results.map((result, index) => (
                        <p key={index}>
                          {result.name}: {result.percentage}% = {result.quantity}
                        </p>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PercentageCalculator;
