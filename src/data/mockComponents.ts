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
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    model: 'Ryzen 9 7950X',
    price: 699.99,
  },
  
  // GPUs
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'NVIDIA GeForce RTX 4090',
    brand: 'NVIDIA',
    model: 'GeForce RTX 4090',
    price: 1599.99,
  },
  {
    id: 'gpu-2',
    type: 'gpu',
    name: 'AMD Radeon RX 7900 XTX',
    brand: 'AMD',
    model: 'Radeon RX 7900 XTX',
    price: 999.99,
  },
  
  // Add a few more components for each type...
  {
    id: 'motherboard-1',
    type: 'motherboard',
    name: 'ASUS ROG Maximus Z790 Hero',
    brand: 'ASUS',
    model: 'ROG Maximus Z790 Hero',
    price: 599.99,
  },
  
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Corsair Vengeance 32GB DDR5-5600',
    brand: 'Corsair',
    model: 'Vengeance 32GB DDR5-5600',
    price: 189.99,
  },
  
  {
    id: 'storage-1',
    type: 'storage',
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    brand: 'Samsung',
    model: '990 Pro 2TB',
    price: 249.99,
  },
  
  {
    id: 'psu-1',
    type: 'psu',
    name: 'EVGA SuperNOVA 850 G6',
    brand: 'EVGA',
    model: 'SuperNOVA 850 G6',
    price: 149.99,
  },
  
  {
    id: 'case-1',
    type: 'case',
    name: 'Lian Li O11 Dynamic EVO',
    brand: 'Lian Li',
    model: 'O11 Dynamic EVO',
    price: 169.99,
  },
  
  {
    id: 'cooler-1',
    type: 'cooler',
    name: 'NZXT Kraken X73 RGB',
    brand: 'NZXT',
    model: 'Kraken X73 RGB',
    price: 199.99,
  },
];