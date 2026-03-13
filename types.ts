
export enum ComponentType {
  RESISTOR = 'resistor',
  LED = 'led',
  ARDUINO_UNO = 'arduino_uno',
  BREADBOARD = 'breadboard',
  POWER_SUPPLY = 'power_supply',
  SWITCH = 'switch'
}

export interface Position {
  x: number;
  y: number;
}

export interface Component {
  id: string;
  type: ComponentType;
  label: string;
  properties: Record<string, string | number>;
  position: Position;
  pins: Record<string, Position>;
}

export interface Wire {
  id: string;
  from: { componentId: string; pinId: string };
  to: { componentId:string; pinId: string };
  color: string;
}

export interface Circuit {
  components: Component[];
  wires: Wire[];
  explanation: string;
}
   