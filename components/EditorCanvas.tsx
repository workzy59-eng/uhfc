
import React, { useState, useRef, useCallback, MouseEvent } from 'react';
import type { Component, Wire, Position } from '../types';
import { ComponentType } from '../types';
import { GRID_SIZE } from '../constants';
import { ResistorIcon, LedIcon, ArduinoIcon, BreadboardIcon, PowerSupplyIcon, SwitchIcon } from './icons/Icons';


interface EditorCanvasProps {
  components: Component[];
  wires: Wire[];
  onAddComponent: (type: ComponentType, position: Position) => void;
  onUpdateComponentPosition: (id: string, position: Position) => void;
  onAddWire: (wire: Omit<Wire, 'id'>) => void;
  isSimulating: boolean;
}

const componentDimensions: Record<ComponentType, { width: number; height: number }> = {
    [ComponentType.RESISTOR]: { width: 60, height: 20 },
    [ComponentType.LED]: { width: 20, height: 40 },
    [ComponentType.ARDUINO_UNO]: { width: 140, height: 120 },
    [ComponentType.BREADBOARD]: { width: 340, height: 120 },
    [ComponentType.SWITCH]: { width: 20, height: 40 },
    [ComponentType.POWER_SUPPLY]: { width: 40, height: 40 },
};

const DraggableComponent: React.FC<{
    component: Component;
    onMove: (id: string, pos: Position) => void;
    onPinClick: (componentId: string, pinId: string) => void;
    isSimulating: boolean;
}> = ({ component, onMove, onPinClick, isSimulating }) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return; // Ignore clicks on pins
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - component.position.x * GRID_SIZE,
            y: e.clientY - component.position.y * GRID_SIZE,
        };
        e.stopPropagation();
    };

    const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
        if (!isDragging) return;
        const newX = Math.round((e.clientX - dragStartPos.current.x) / GRID_SIZE);
        const newY = Math.round((e.clientY - dragStartPos.current.y) / GRID_SIZE);
        onMove(component.id, { x: newX, y: newY });
    }, [isDragging, onMove, component.id]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const dimensions = componentDimensions[component.type] || { width: 100, height: 100 };
    const getComponentVisual = () => {
        const props = { className: `w-full h-full ${isSimulating && component.type === ComponentType.LED ? 'text-red-500 animate-pulse' : 'text-base-content/80'}`};
        switch (component.type) {
            case ComponentType.RESISTOR: return <ResistorIcon {...props} />;
            case ComponentType.LED: return <LedIcon {...props} />;
            case ComponentType.ARDUINO_UNO: return <ArduinoIcon {...props} />;
            case ComponentType.BREADBOARD: return <BreadboardIcon {...props} />;
            case ComponentType.SWITCH: return <SwitchIcon {...props} />;
            case ComponentType.POWER_SUPPLY: return <PowerSupplyIcon {...props} />;
            default: return <div className="w-full h-full bg-base-300" />;
        }
    };

    return (
        <div
            style={{
                left: `${component.position.x * GRID_SIZE}px`,
                top: `${component.position.y * GRID_SIZE}px`,
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
            className="absolute p-1 bg-base-100/50 rounded border border-base-300 shadow-lg"
            onMouseDown={handleMouseDown}
        >
            <div className="relative w-full h-full">{getComponentVisual()}</div>
             <div className="absolute top-0 -mt-5 text-xs font-mono">{component.label}</div>
            {Object.entries(component.pins).map(([pinId, pinPos]) => (
                 <div
                    key={pinId}
                    title={`${component.label} - ${pinId}`}
                    style={{ left: pinPos.x, top: pinPos.y, transform: 'translate(-50%, -50%)' }}
                    className="absolute w-3 h-3 bg-gray-500 rounded-full cursor-crosshair hover:bg-brand-secondary"
                    onClick={() => onPinClick(component.id, pinId)}
                />
            ))}
        </div>
    );
};


const EditorCanvas: React.FC<EditorCanvasProps> = ({ components, wires, onAddComponent, onUpdateComponentPosition, onAddWire, isSimulating }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [wireStart, setWireStart] = useState<{ componentId: string; pinId: string } | null>(null);
    const [mousePos, setMousePos] = useState<Position | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType') as ComponentType;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (type && rect) {
            const x = Math.round((e.clientX - rect.left) / GRID_SIZE);
            const y = Math.round((e.clientY - rect.top) / GRID_SIZE);
            onAddComponent(type, { x, y });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handlePinClick = (componentId: string, pinId: string) => {
        if (!wireStart) {
            setWireStart({ componentId, pinId });
        } else {
            if (wireStart.componentId !== componentId) {
                onAddWire({ from: wireStart, to: { componentId, pinId }, color: 'green' });
            }
            setWireStart(null);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!wireStart || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    
    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === canvasRef.current) {
            setWireStart(null); // Cancel wire drawing
        }
    };
    
    const getPinPosition = (componentId: string, pinId: string): Position | null => {
        const component = components.find(c => c.id === componentId);
        if (!component) return null;
        const pin = component.pins[pinId];
        if (!pin) return null;
        return {
            x: component.position.x * GRID_SIZE + pin.x,
            y: component.position.y * GRID_SIZE + pin.y
        };
    };
    
    const startPinPos = wireStart ? getPinPosition(wireStart.componentId, wireStart.pinId) : null;


    return (
        <div
            ref={canvasRef}
            className="flex-1 relative overflow-auto bg-base-300"
            style={{
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                backgroundImage: 'linear-gradient(to right, #4b5563 1px, transparent 1px), linear-gradient(to bottom, #4b5563 1px, transparent 1px)',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
        >
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: '2000px', minHeight: '2000px'}}>
                {wires.map(wire => {
                    const fromPos = getPinPosition(wire.from.componentId, wire.from.pinId);
                    const toPos = getPinPosition(wire.to.componentId, wire.to.pinId);
                    if (!fromPos || !toPos) return null;
                    return <line key={wire.id} x1={fromPos.x} y1={fromPos.y} x2={toPos.x} y2={toPos.y} stroke={wire.color} strokeWidth="2" />;
                })}
                {wireStart && startPinPos && mousePos && (
                    <line x1={startPinPos.x} y1={startPinPos.y} x2={mousePos.x} y2={mousePos.y} stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                )}
            </svg>
            
            {components.map(comp => (
                <DraggableComponent
                    key={comp.id}
                    component={comp}
                    onMove={onUpdateComponentPosition}
                    onPinClick={handlePinClick}
                    isSimulating={isSimulating}
                />
            ))}
        </div>
    );
};

export default EditorCanvas;
   