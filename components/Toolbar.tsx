
import React from 'react';
import { FileIcon, SaveIcon, PlayIcon, ShareIcon, BotIcon, ViewIcon, SquareIcon } from './icons/Icons';

interface ToolbarProps {
  onNewProject: () => void;
  onSaveProject: () => void;
  onSimulate: () => void;
  isSimulating: boolean;
  onExport: () => void;
  onAiBuilder: () => void;
  on3DView: () => void;
  is3DView: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onNewProject,
  onSaveProject,
  onSimulate,
  isSimulating,
  onExport,
  onAiBuilder,
  on3DView,
  is3DView
}) => {
  const buttonClass = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out";
  const baseButton = `${buttonClass} bg-base-300 hover:bg-brand-primary hover:text-white`;
  const activeButton = `${buttonClass} bg-brand-secondary text-white`;

  return (
    <header className="flex items-center justify-between p-2 bg-base-200 border-b border-base-300 shadow-md z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">
          <span className="text-brand-primary">AI</span> CircuitLab
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={onNewProject} className={baseButton} title="New Project"><FileIcon /><span className="hidden md:inline">New</span></button>
          <button onClick={onSaveProject} className={baseButton} title="Save Project"><SaveIcon /><span className="hidden md:inline">Save</span></button>
          <button onClick={onExport} className={baseButton} title="Export Project"><ShareIcon /><span className="hidden md:inline">Export</span></button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onAiBuilder} className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity">
          <BotIcon /> AI Builder
        </button>
        <button onClick={onSimulate} className={isSimulating ? activeButton : baseButton} title="Simulate Circuit">
          {isSimulating ? <SquareIcon/> : <PlayIcon />}
          <span className="hidden md:inline">{isSimulating ? 'Stop' : 'Simulate'}</span>
        </button>
        <button onClick={on3DView} className={is3DView ? activeButton : baseButton} title="Toggle 3D View">
          <ViewIcon />
          <span className="hidden md:inline">3D View</span>
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
   