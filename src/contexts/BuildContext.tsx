// src/contexts/BuildContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Component, PCBuild, ComponentType } from '../models/Component';

interface BuildContextType {
  currentBuild: PCBuild | null;
  addComponent: (component: Component) => void;
  removeComponent: (type: ComponentType) => void;
  calculateTotal: () => number;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider = ({ children }: { children: ReactNode }) => {
  const [currentBuild, setCurrentBuild] = useState<PCBuild | null>({
    id: 'build-1',
    name: 'My New Build',
    components: {},
    totalPrice: 0,
  });

  const addComponent = (component: Component) => {
    if (!currentBuild) return;

    setCurrentBuild({
      ...currentBuild,
      components: {
        ...currentBuild.components,
        [component.type]: component,
      },
      totalPrice: calculateTotal(component),
    });
  };

  const removeComponent = (type: ComponentType) => {
    if (!currentBuild) return;
    
    const updatedComponents = { ...currentBuild.components };
    delete updatedComponents[type];

    setCurrentBuild({
      ...currentBuild,
      components: updatedComponents,
      totalPrice: calculateTotalAfterRemoval(type),
    });
  };

  const calculateTotal = (newComponent?: Component) => {
    if (!currentBuild) return 0;
    
    let total = 0;
    
    // Add up existing components
    Object.values(currentBuild.components).forEach(component => {
      if (component) {
        total += component.price;
      }
    });
    
    // Add new component if provided (and not replacing an existing one)
    if (newComponent && !currentBuild.components[newComponent.type]) {
      total += newComponent.price;
    } else if (newComponent) {
      // If replacing, subtract old and add new
      total = total - (currentBuild.components[newComponent.type]?.price || 0) + newComponent.price;
    }
    
    return total;
  };

  const calculateTotalAfterRemoval = (type: ComponentType) => {
    if (!currentBuild) return 0;
    
    let total = currentBuild.totalPrice;
    
    // Subtract the removed component's price
    if (currentBuild.components[type]) {
      total -= currentBuild.components[type]!.price;
    }
    
    return total;
  };

  return (
    <BuildContext.Provider
      value={{ 
        currentBuild, 
        addComponent, 
        removeComponent, 
        calculateTotal 
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuildContext = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuildContext must be used within a BuildProvider');
  }
  return context;
};