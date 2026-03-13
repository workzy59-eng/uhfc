
import type { Component } from './types';
import { ComponentType } from './types';

export const GRID_SIZE = 20;

export const COMPONENT_LIBRARY: Omit<Component, 'id' | 'position' | 'label' >[] = [
  {
    type: ComponentType.ARDUINO_UNO,
    properties: {},
    pins: { 
      'D13': { x: 120, y: 10 }, 'GND1': { x: 100, y: 10 },
      '5V': { x: 0, y: 90 }, 'GND2': { x: 20, y: 90 }, 'VIN': { x: 40, y: 90 },
      'A0': { x: 0, y: 110 }, 'A1': { x: 20, y: 110 }, 'A2': { x: 40, y: 110 },
    },
  },
  {
    type: ComponentType.BREADBOARD,
    properties: {},
    pins: {},
  },
  {
    type: ComponentType.LED,
    properties: { color: 'red' },
    pins: { 'anode': { x: 10, y: 0 }, 'cathode': { x: 10, y: 40 } },
  },
  {
    type: ComponentType.RESISTOR,
    properties: { resistance: '220Ω' },
    pins: { '1': { x: 0, y: 10 }, '2': { x: 60, y: 10 } },
  },
  {
    type: ComponentType.SWITCH,
    properties: {},
    pins: { '1': { x: 10, y: 0 }, '2': { x: 10, y: 40 } },
  },
  {
    type: ComponentType.POWER_SUPPLY,
    properties: { voltage: '5V' },
    pins: { '+': { x: 10, y: 0 }, '-': { x: 10, y: 40 } },
  },
];
   