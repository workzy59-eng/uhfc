
import React, { useState } from 'react';
import { BotIcon, XIcon } from './icons/Icons';

interface AiBuilderPanelProps {
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const AiBuilderPanel: React.FC<AiBuilderPanelProps> = ({ onClose, onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const examplePrompts = [
    "A simple circuit to light an LED using a 5V power supply and a 220 ohm resistor.",
    "Blink an LED connected to pin D13 of an Arduino Uno.",
    "Build a circuit with a switch that controls an LED."
  ];

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-xl shadow-2xl w-full max-w-2xl border border-base-300">
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-3">
            <BotIcon className="w-6 h-6 text-brand-primary" />
            <h2 className="text-xl font-bold">AI Circuit Builder</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-base-300 transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4 text-base-content/80">
            Describe the circuit you want to build. The AI will generate the components, layout, and wiring for you.
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Build me an automatic night light with an Arduino, an LDR, and an LED.'"
            className="w-full h-32 p-3 bg-base-100 rounded-md border border-base-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition resize-none"
            disabled={isLoading}
          />

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-base-content/70 mb-2">Example Prompts:</h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(p)}
                  disabled={isLoading}
                  className="px-3 py-1 bg-base-300 text-sm rounded-full hover:bg-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {p.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-base-200/50 border-t border-base-300 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary/90 transition-colors disabled:bg-base-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : 'Generate Circuit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiBuilderPanel;
   