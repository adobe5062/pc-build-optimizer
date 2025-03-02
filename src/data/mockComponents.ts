// src/data/mockComponents.ts
import { Component } from '../models/Component';

export const mockComponents: Component[] = [
  // CPUs
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'Intel Core i9-13900K',
    brand: 'Intel',
    model: 'Core i9-13900K',
    price: 599.99,
    specs: [
      { key: 'cores', value: 24 },
      { key: 'threads', value: 32 },
      { key: 'baseClock', value: 3.0, unit: 'GHz' },
      { key: 'boostClock', value: 5.8, unit: 'GHz' },
      { key: 'socket', value: 'LGA1700' },
      { key: 'tdp', value: 125, unit: 'W' }
    ]
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    model: 'Ryzen 9 7950X',
    price: 699.99,
    specs: [
      { key: 'cores', value: 16 },
      { key: 'threads', value: 32 },
      { key: 'baseClock', value: 4.5, unit: 'GHz' },
      { key: 'boostClock', value: 5.7, unit: 'GHz' },
      { key: 'socket', value: 'AM5' },
      { key: 'tdp', value: 170, unit: 'W' }
    ]
  },
  
  // GPUs
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'NVIDIA GeForce RTX 4090',
    brand: 'NVIDIA',
    model: 'GeForce RTX 4090',
    price: 1599.99,
    specs: [
      { key: 'memory', value: 24, unit: 'GB' },
      { key: 'coreClock', value: 2235, unit: 'MHz' },
      { key: 'boostClock', value: 2520, unit: 'MHz' },
      { key: 'tdp', value: 450, unit: 'W' },
      { key: 'length', value: 336, unit: 'mm' }
    ]
  },
  {
    id: 'gpu-2',
    type: 'gpu',
    name: 'AMD Radeon RX 7900 XTX',
    brand: 'AMD',
    model: 'Radeon RX 7900 XTX',
    price: 999.99,
    specs: [
      { key: 'memory', value: 24, unit: 'GB' },
      { key: 'coreClock', value: 1855, unit: 'MHz' },
      { key: 'boostClock', value: 2500, unit: 'MHz' },
      { key: 'tdp', value: 355, unit: 'W' },
      { key: 'length', value: 287, unit: 'mm' }
    ]
  },
  
  // Motherboards
  {
    id: 'motherboard-1',
    type: 'motherboard',
    name: 'ASUS ROG Maximus Z790 Hero',
    brand: 'ASUS',
    model: 'ROG Maximus Z790 Hero',
    price: 599.99,
    specs: [
      { key: 'socket', value: 'LGA1700' },
      { key: 'chipset', value: 'Z790' },
      { key: 'formFactor', value: 'ATX' },
      { key: 'memoryType', value: 'DDR5' },
      { key: 'memorySlots', value: 4 },
      { key: 'maxMemory', value: 128, unit: 'GB' }
    ]
  },
  {
    id: 'motherboard-2',
    type: 'motherboard',
    name: 'MSI MPG X670E Carbon WiFi',
    brand: 'MSI',
    model: 'MPG X670E Carbon WiFi',
    price: 479.99,
    specs: [
      { key: 'socket', value: 'AM5' },
      { key: 'chipset', value: 'X670E' },
      { key: 'formFactor', value: 'ATX' },
      { key: 'memoryType', value: 'DDR5' },
      { key: 'memorySlots', value: 4 },
      { key: 'maxMemory', value: 128, unit: 'GB' }
    ]
  },
  
  // RAM
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Corsair Vengeance 32GB DDR5-5600',
    brand: 'Corsair',
    model: 'Vengeance 32GB DDR5-5600',
    price: 189.99,
    specs: [
      { key: 'type', value: 'DDR5' },
      { key: 'capacity', value: 32, unit: 'GB' },
      { key: 'speed', value: 5600, unit: 'MHz' },
      { key: 'modules', value: 2 }
    ]
  },
  {
    id: 'ram-2',
    type: 'ram',
    name: 'G.Skill Trident Z5 RGB 32GB DDR5-6000',
    brand: 'G.Skill',
    model: 'Trident Z5 RGB 32GB DDR5-6000',
    price: 219.99,
    specs: [
      { key: 'type', value: 'DDR5' },
      { key: 'capacity', value: 32, unit: 'GB' },
      { key: 'speed', value: 6000, unit: 'MHz' },
      { key: 'modules', value: 2 }
    ]
  },
  
  // Storage
  {
    id: 'storage-1',
    type: 'storage',
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    brand: 'Samsung',
    model: '990 Pro 2TB',
    price: 249.99,
    specs: [
      { key: 'type', value: 'NVMe SSD' },
      { key: 'capacity', value: 2, unit: 'TB' },
      { key: 'readSpeed', value: 7450, unit: 'MB/s' },
      { key: 'writeSpeed', value: 6900, unit: 'MB/s' },
      { key: 'interface', value: 'PCIe 4.0 x4' }
    ]
  },
  
  // Power Supply
  {
    id: 'psu-1',
    type: 'psu',
    name: 'EVGA SuperNOVA 850 G6',
    brand: 'EVGA',
    model: 'SuperNOVA 850 G6',
    price: 149.99,
    specs: [
      { key: 'wattage', value: 850, unit: 'W' },
      { key: 'certification', value: '80+ Gold' },
      { key: 'modular', value: 'Full' }
    ]
  },
  {
    id: 'psu-2',
    type: 'psu',
    name: 'Corsair RM1000x',
    brand: 'Corsair',
    model: 'RM1000x',
    price: 189.99,
    specs: [
      { key: 'wattage', value: 1000, unit: 'W' },
      { key: 'certification', value: '80+ Gold' },
      { key: 'modular', value: 'Full' }
    ]
  },
  
  // Case
  {
    id: 'case-1',
    type: 'case',
    name: 'Lian Li O11 Dynamic EVO',
    brand: 'Lian Li',
    model: 'O11 Dynamic EVO',
    price: 169.99,
    specs: [
      { key: 'formFactor', value: 'Mid Tower' },
      { key: 'maxGpuLength', value: 420, unit: 'mm' },
      { key: 'maxCpuCoolerHeight', value: 167, unit: 'mm' },
      { key: 'motherboardSupport', value: 'E-ATX, ATX, Micro-ATX, Mini-ITX' }
    ]
  },
  
  // CPU Cooler
  {
    id: 'cooler-1',
    type: 'cooler',
    name: 'NZXT Kraken X73 RGB',
    brand: 'NZXT',
    model: 'Kraken X73 RGB',
    price: 199.99,
    specs: [
      { key: 'type', value: 'Liquid Cooling' },
      { key: 'radiatorSize', value: 360, unit: 'mm' },
      { key: 'height', value: 30, unit: 'mm' },
      { key: 'socketSupport', value: 'LGA1700, AM5, AM4' }
    ]
  },
  {
    id: 'cooler-2',
    type: 'cooler',
    name: 'Noctua NH-D15',
    brand: 'Noctua',
    model: 'NH-D15',
    price: 99.99,
    specs: [
      { key: 'type', value: 'Air Cooling' },
      { key: 'height', value: 165, unit: 'mm' },
      { key: 'socketSupport', value: 'LGA1700, AM5, AM4' }
    ]
  },
];