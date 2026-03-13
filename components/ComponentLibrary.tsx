
import React from 'react';
import { COMPONENT_LIBRARY } from '../constants';
// FIX: Changed type-only import to a regular import because ComponentType is an enum used as a value.
import { ComponentType } from '../types';
import { ResistorIcon, LedIcon, ArduinoIcon, BreadboardIcon, PowerSupplyIcon, SwitchIcon } from './icons/Icons';

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentType, position: { x: number, y: number }) => void;
}

const componentIcons: Record<ComponentType, React.ReactNode> = {
  [ComponentType.RESISTOR]: <ResistorIcon />,
  [ComponentType.LED]: <LedIcon />,
  [ComponentType.ARDUINO_UNO]: <ArduinoIcon />,
  [ComponentType.BREADBOARD]: <BreadboardIcon />,
  [ComponentType.POWER_SUPPLY]: <PowerSupplyIcon />,
  [ComponentType.SWITCH]: <SwitchIcon />,
};

const ComponentLibrary: React.FC<ComponentLibraryProps> = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="w-56 bg-base-200 p-4 border-r border-base-300 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="grid grid-cols-2 gap-4">
        {COMPONENT_LIBRARY.map(({ type }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            className="flex flex-col items-center justify-center p-2 bg-base-300 rounded-lg cursor-grab hover:bg-brand-primary hover:text-white transition-colors duration-200 aspect-square"
            title={`Drag to add ${type}`}
          >
            <div className="w-8 h-8 mb-1">{componentIcons[type]}</div>
            <span className="text-xs text-center capitalize">{type.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ComponentLibrary;