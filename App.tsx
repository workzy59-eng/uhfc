
import React, { useState, useCallback } from 'react';
import type { Component, Wire, Circuit } from './types';
import { ComponentType } from './types';
import Toolbar from './components/Toolbar';
import ComponentLibrary from './components/ComponentLibrary';
import EditorCanvas from './components/EditorCanvas';
import AiBuilderPanel from './components/AiBuilderPanel';
import { generateCircuitFromPrompt } from './services/geminiService';
import { COMPONENT_LIBRARY, GRID_SIZE } from './constants';

const App: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [is3DView, setIs3DView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string>('');

  const handleNewProject = () => {
    setComponents([]);
    setWires([]);
    setAiExplanation('');
    setIsSimulating(false);
  };

  const handleGenerateCircuit = async (prompt: string) => {
    setIsLoading(true);
    setAiExplanation('');
    try {
      const result: Circuit | null = await generateCircuitFromPrompt(prompt);
      if (result) {
        setComponents(result.components);
        setWires(result.wires);
        setAiExplanation(result.explanation);
      } else {
        alert('Failed to generate circuit. The model returned an invalid structure.');
      }
    } catch (error) {
      console.error("Error generating circuit:", error);
      alert(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setIsAiPanelOpen(false);
    }
  };

  const addComponent = (type: ComponentType, position: { x: number, y: number }) => {
    const componentTemplate = COMPONENT_LIBRARY.find(c => c.type === type);
    if (componentTemplate) {
      const newComponent: Component = {
        id: `${type}-${Date.now()}`,
        label: `${type}-${components.filter(c => c.type === type).length + 1}`,
        type,
        position,
        properties: { ...componentTemplate.properties },
        pins: { ...componentTemplate.pins },
      };
      setComponents(prev => [...prev, newComponent]);
    }
  };

  const updateComponentPosition = (id: string, newPosition: { x: number, y: number }) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, position: newPosition } : c));
  };
  
  const addWire = (wire: Omit<Wire, 'id'>) => {
    const newWire: Wire = {
      ...wire,
      id: `wire-${Date.now()}`
    };
    setWires(prev => [...prev, newWire]);
  };

  return (
    <div className="flex flex-col h-screen bg-base-100 text-base-content font-sans">
      <Toolbar
        onNewProject={handleNewProject}
        onSaveProject={() => alert('Save functionality not implemented.')}
        onSimulate={() => setIsSimulating(!isSimulating)}
        isSimulating={isSimulating}
        onExport={() => alert('Export functionality not implemented.')}
        onAiBuilder={() => setIsAiPanelOpen(true)}
        on3DView={() => setIs3DView(!is3DView)}
        is3DView={is3DView}
      />
      <div className="flex flex-1 overflow-hidden">
        <ComponentLibrary onAddComponent={addComponent} />
        <main className="flex-1 flex flex-col bg-base-200 overflow-hidden relative">
          {is3DView ? (
             <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-3xl font-bold">3D View</h2>
                <p className="text-base-content/70 mt-2">3D visualization is not yet implemented in this prototype.</p>
                <img src="https://picsum.photos/seed/3dview/800/600" alt="3D Placeholder" className="mt-4 rounded-lg shadow-lg" />
              </div>
            </div>
          ) : (
            <EditorCanvas
              components={components}
              wires={wires}
              onAddComponent={addComponent}
              onUpdateComponentPosition={updateComponentPosition}
              onAddWire={addWire}
              isSimulating={isSimulating}
            />
          )}
          {aiExplanation && !is3DView && (
            <div className="absolute bottom-4 left-4 max-w-md bg-base-100/80 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-base-300">
              <h3 className="font-bold text-lg text-brand-secondary mb-2">AI Explanation</h3>
              <p className="text-sm max-h-40 overflow-y-auto">{aiExplanation}</p>
            </div>
          )}
        </main>
      </div>
      {isAiPanelOpen && (
        <AiBuilderPanel
          onClose={() => setIsAiPanelOpen(false)}
          onGenerate={handleGenerateCircuit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;
   