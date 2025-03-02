// src/contexts/BuildContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Component, PCBuild, ComponentType, CompatibilityIssue } from '../models/Component';
import { checkCompatibility } from '../services/compatibilityService';

interface BuildContextType {
  currentBuild: PCBuild | null;
  addComponent: (component: Component) => void;
  removeComponent: (type: ComponentType) => void;
  calculateTotal: () => number;
  getCompatibilityIssues: () => CompatibilityIssue[];
  checkComponentCompatibility: (component: Component) => CompatibilityIssue[];
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider = ({ children }: { children: ReactNode }) => {
  const [currentBuild, setCurrentBuild] = useState<PCBuild | null>({
    id: 'build-1',
    name: 'My New Build',
    components: {},
    totalPrice: 0,
    compatibility: []
  });

  const addComponent = (component: Component) => {
    if (!currentBuild) return;

    // Update the build with the new component
    const updatedBuild: PCBuild = {
      ...currentBuild,
      components: {
        ...currentBuild.components,
        [component.type]: component,
      },
      totalPrice: calculateTotal(component),
    };

    // Check compatibility after adding the component
    updatedBuild.compatibility = checkCompatibility(updatedBuild);
    
    setCurrentBuild(updatedBuild);
  };

  const removeComponent = (type: ComponentType) => {
    if (!currentBuild) return;
    
    const updatedComponents = { ...currentBuild.components };
    delete updatedComponents[type];

    const updatedBuild: PCBuild = {
      ...currentBuild,
      components: updatedComponents,
      totalPrice: calculateTotalAfterRemoval(type),
    };

    // Check compatibility after removing the component
    updatedBuild.compatibility = checkCompatibility(updatedBuild);
    
    setCurrentBuild(updatedBuild);
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

  const getCompatibilityIssues = (): CompatibilityIssue[] => {
    if (!currentBuild) return [];
    
    return currentBuild.compatibility || [];
  };

  const checkComponentCompatibility = (component: Component): CompatibilityIssue[] => {
    if (!currentBuild) return [];
    
    // Create a temporary build with the component to check compatibility
    const tempBuild: PCBuild = {
      ...currentBuild,
      components: {
        ...currentBuild.components,
        [component.type]: component,
      },
    };
    
    return checkCompatibility(tempBuild);
  };

  return (
    <BuildContext.Provider
      value={{ 
        currentBuild, 
        addComponent, 
        removeComponent, 
        calculateTotal,
        getCompatibilityIssues,
        checkComponentCompatibility
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