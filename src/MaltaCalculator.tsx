import React, { useState } from 'react';
import { Trash2, Plus, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Alert, AlertDescription } from "./components/ui/alert";


const MaltaCalculator = () => {
  const [ingredients, setIngredients] = useState([
    { name: '', doses: '', type: '', category: '' }
  ]);
  const [multiplier, setMultiplier] = useState(1);
  const [targetRatio, setTargetRatio] = useState('');
  const [lockType, setLockType] = useState('inerte');
  const [result, setResult] = useState(null);

  const calculateCurrentRatio = () => {
    const legante = ingredients.reduce((acc, curr) => 
      curr.category === 'legante' ? acc + Number(curr.doses) : acc, 0);
    const inerte = ingredients.reduce((acc, curr) => 
      curr.category === 'inerte' ? acc + Number(curr.doses) : acc, 0);
    return `${legante}:${inerte}`;
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', doses: '', type: '', category: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const calculateNewRatios = () => {
    if (!targetRatio || !targetRatio.includes(':')) {
      setResult({ error: 'Inserire un rapporto valido (es. 2:1)' });
      return;
    }

    const [targetLegante, targetInerte] = targetRatio.split(':').map(Number);
    const currentLegante = ingredients.reduce((acc, curr) => 
      curr.category === 'legante' ? acc + Number(curr.doses) : acc, 0);
    const currentInerte = ingredients.reduce((acc, curr) => 
      curr.category === 'inerte' ? acc + Number(curr.doses) : acc, 0);

    let newIngredients = [...ingredients];
    if (lockType === 'inerte') {
      const newLegante = (currentInerte * targetLegante) / targetInerte;
      const factor = newLegante / currentLegante;
      newIngredients = ingredients.map(ing => ({
        ...ing,
        doses: ing.category === 'legante' ? (Number(ing.doses) * factor).toFixed(2) : ing.doses
      }));
    } else {
      const newInerte = (currentLegante * targetInerte) / targetLegante;
      const factor = newInerte / currentInerte;
      newIngredients = ingredients.map(ing => ({
        ...ing,
        doses: ing.category === 'inerte' ? (Number(ing.doses) * factor).toFixed(2) : ing.doses
      }));
    }

    setResult({
      originalRatio: calculateCurrentRatio(),
      newRatio: targetRatio,
      ingredients: newIngredients
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Calcolatore Rapporti Malta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Nome"
                value={ing.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Dosi"
                value={ing.doses}
                onChange={(e) => updateIngredient(index, 'doses', e.target.value)}
                className="w-24"
              />
              <Select
                value={ing.type}
                onValueChange={(value) => updateIngredient(index, 'type', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marmo">Marmo</SelectItem>
                  <SelectItem value="calce">Calce</SelectItem>
                  <SelectItem value="sabbia">Sabbia</SelectItem>
                  <SelectItem value="pozzolana">Pozzolana</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={ing.category}
                onValueChange={(value) => updateIngredient(index, 'category', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legante">Legante</SelectItem>
                  <SelectItem value="inerte">Inerte</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeIngredient(index)}
                disabled={ingredients.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button onClick={addIngredient} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Ingrediente
          </Button>

          <div className="flex gap-4 mt-6">
            <div className="flex-1">
              <Input
                placeholder="Rapporto desiderato (es. 2:1)"
                value={targetRatio}
                onChange={(e) => setTargetRatio(e.target.value)}
              />
            </div>
            <Select value={lockType} onValueChange={setLockType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Blocca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inerte">Blocca Inerti</SelectItem>
                <SelectItem value="legante">Blocca Leganti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateNewRatios} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola Nuovo Rapporto
          </Button>

          {result && !result.error && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p>Rapporto originale: {result.originalRatio}</p>
                  <p>Nuovo rapporto: {result.newRatio}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold">Nuove dosi:</h4>
                    <ul className="list-disc pl-4">
                      {result.ingredients.map((ing, i) => (
                        <li key={i}>
                          {ing.name}: {ing.doses} dosi
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {result?.error && (
            <Alert variant="destructive">
              <AlertDescription>{result.error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaltaCalculator;
