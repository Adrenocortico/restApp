import React, { useState } from 'react';
import { Trash2, Plus, Calculator } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MaltaCalculator = () => {
  // ... [stato e funzioni rimangono uguali] ...

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="text-2xl text-center text-gray-800">
          Calcolatore Rapporti Malta
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Intestazioni */}
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 mb-2">
            <div className="col-span-3">Nome Ingrediente</div>
            <div className="col-span-2">Dosi</div>
            <div className="col-span-3">Tipo</div>
            <div className="col-span-3">Categoria</div>
            <div className="col-span-1"></div>
          </div>

          {/* Lista Ingredienti */}
          <div className="space-y-4">
            {ingredients.map((ing, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <Input
                    placeholder="Nome"
                    value={ing.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Dosi"
                    value={ing.doses}
                    onChange={(e) => updateIngredient(index, 'doses', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <Select
                    value={ing.type}
                    onValueChange={(value) => updateIngredient(index, 'type', value)}
                  >
                    <SelectTrigger className="w-full px-3 py-2 border rounded-lg">
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marmo">Marmo</SelectItem>
                      <SelectItem value="calce">Calce</SelectItem>
                      <SelectItem value="sabbia">Sabbia</SelectItem>
                      <SelectItem value="pozzolana">Pozzolana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Select
                    value={ing.category}
                    onValueChange={(value) => updateIngredient(index, 'category', value)}
                  >
                    <SelectTrigger className="w-full px-3 py-2 border rounded-lg">
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legante">Legante</SelectItem>
                      <SelectItem value="inerte">Inerte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pulsante Aggiungi */}
          <Button
            onClick={addIngredient}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Aggiungi Ingrediente
          </Button>

          {/* Controlli Rapporto */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rapporto Desiderato</label>
              <Input
                placeholder="es. 2:1"
                value={targetRatio}
                onChange={(e) => setTargetRatio(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Blocca</label>
              <Select value={lockType} onValueChange={setLockType}>
                <SelectTrigger className="w-full px-3 py-2 border rounded-lg">
                  <SelectValue placeholder="Scegli cosa bloccare" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inerte">Blocca Inerti</SelectItem>
                  <SelectItem value="legante">Blocca Leganti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pulsante Calcola */}
          <Button
            onClick={calculateNewRatios}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            Calcola Nuovo Rapporto
          </Button>

          {/* Risultati */}
          {result && !result.error && (
            <Alert className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <AlertDescription>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Rapporto originale:</span>
                      <span className="ml-2">{result.originalRatio}</span>
                    </div>
                    <div>
                      <span className="font-medium">Nuovo rapporto:</span>
                      <span className="ml-2">{result.newRatio}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Nuove dosi:</h4>
                    <ul className="space-y-2">
                      {result.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between items-center border-b pb-2">
                          <span>{ing.name}</span>
                          <span className="font-medium">{ing.doses} dosi</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {result?.error && (
            <Alert className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertDescription className="text-red-600">
                {result.error}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaltaCalculator;
