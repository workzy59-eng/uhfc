
import { GoogleGenAI, Type } from "@google/genai";
import type { Circuit, Component, Wire } from '../types';
import { ComponentType } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const circuitSchema = {
  type: Type.OBJECT,
  properties: {
    components: {
      type: Type.ARRAY,
      description: 'List of electronic components in the circuit.',
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: 'Unique identifier for the component (e.g., "resistor1").' },
          type: { 
            type: Type.STRING, 
            description: 'Type of the component.',
            enum: Object.values(ComponentType)
          },
          label: { type: Type.STRING, description: 'User-friendly label (e.g., "R1").' },
          properties: {
            type: Type.OBJECT,
            description: 'Component-specific properties (e.g., {"resistance": "220Ω"}).',
            properties: {
              resistance: { type: Type.STRING, description: 'Resistance value for resistors.' },
              color: { type: Type.STRING, description: 'Color for LEDs.' },
              voltage: { type: Type.STRING, description: 'Voltage for power supplies.' },
            }
          },
          position: {
            type: Type.OBJECT,
            properties: {
              x: { type: Type.NUMBER, description: 'X-coordinate on a 20px grid.' },
              y: { type: Type.NUMBER, description: 'Y-coordinate on a 20px grid.' },
            },
            required: ['x', 'y'],
          },
           pins: {
            type: Type.OBJECT,
            description: 'Defines connection points relative to component origin. Key is pin ID, value is relative x,y.',
             properties: {
                anode: {type: Type.OBJECT, properties: { x: {type: Type.NUMBER}, y: {type: Type.NUMBER}}},
                cathode: {type: Type.OBJECT, properties: { x: {type: Type.NUMBER}, y: {type: Type.NUMBER}}},
             }
          }
        },
        required: ['id', 'type', 'label', 'position', 'properties'],
      },
    },
    wires: {
      type: Type.ARRAY,
      description: 'List of wires connecting the components.',
      items: {
        type: Type.OBJECT,
        properties: {
          from: {
            type: Type.OBJECT,
            properties: {
              componentId: { type: Type.STRING, description: 'ID of the component to connect from.' },
              pinId: { type: Type.STRING, description: 'ID of the pin on the source component (e.g., "D13", "anode", "1").' },
            },
            required: ['componentId', 'pinId'],
          },
          to: {
            type: Type.OBJECT,
            properties: {
              componentId: { type: Type.STRING, description: 'ID of the component to connect to.' },
              pinId: { type: Type.STRING, description: 'ID of the pin on the target component.' },
            },
            required: ['componentId', 'pinId'],
          },
          color: { type: Type.STRING, description: 'Color of the wire (e.g., "red", "black").' },
        },
        required: ['from', 'to', 'color'],
      },
    },
    explanation: {
      type: Type.STRING,
      description: 'A brief, user-friendly explanation of how the generated circuit works.'
    }
  },
  required: ['components', 'wires', 'explanation'],
};

export const generateCircuitFromPrompt = async (prompt: string): Promise<Circuit | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Design an electronic circuit based on the following request: "${prompt}". Provide the output as a JSON object adhering to the specified schema. Ensure all component positions are logical and spaced out on a grid. Define appropriate pins for components like Arduino, LEDs, and resistors.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: circuitSchema,
        systemInstruction: `You are an expert electronics engineer and circuit designer. Your task is to generate a complete circuit layout in a structured JSON format. The layout should be practical for a breadboard or direct wiring. Ensure component placements do not overlap and wiring is clear. Only use component types from this list: ${Object.values(ComponentType).join(', ')}. Provide a helpful explanation of the circuit's function.`
      },
    });

    const jsonText = response.text.trim();
    if (jsonText) {
      const parsedJson = JSON.parse(jsonText);
      // Basic validation
      if (parsedJson.components && parsedJson.wires && parsedJson.explanation) {
        // Add IDs to wires for React keys
        const circuitWithWireIds: Circuit = {
            ...parsedJson,
            wires: parsedJson.wires.map((wire: Omit<Wire, 'id'>, index: number) => ({
                ...wire,
                id: `wire-ai-${index}-${Date.now()}`
            }))
        };
        return circuitWithWireIds;
      }
    }
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
   