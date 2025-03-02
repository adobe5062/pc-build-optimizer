// src/models/Component.ts

export type ComponentType = 
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cooler';

export interface ComponentSpec {
  key: string;
  value: string | number;
  unit?: string;
}

export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  brand: string;
  model: string;
  price: number;
  specs: ComponentSpec[];
  imageUrl?: string;
}

export interface PCBuild {
  id: string;
  name: string;
  components: {
    cpu?: Component;
    gpu?: Component;
    motherboard?: Component;
    ram?: Component;
    storage?: Component;
    psu?: Component;
    case?: Component;
    cooler?: Component;
  };
  totalPrice: number;
  compatibility?: CompatibilityIssue[];
}

export interface CompatibilityIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  components?: string[];
}