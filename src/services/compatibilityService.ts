// src/services/compatibilityService.ts
import { PCBuild, Component, CompatibilityIssue } from '../models/Component';

/**
 * Checks the compatibility of components in a PC build
 * @param build The PC build to check
 * @returns Array of compatibility issues
 */
export function checkCompatibility(build: PCBuild): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  const { components } = build;

  // Check if CPU and motherboard are compatible
  if (components.cpu && components.motherboard) {
    const cpuSocket = getSpecValue(components.cpu, 'socket');
    const motherboardSocket = getSpecValue(components.motherboard, 'socket');

    if (cpuSocket && motherboardSocket && cpuSocket !== motherboardSocket) {
      issues.push({
        severity: 'error',
        message: `CPU socket (${cpuSocket}) is not compatible with motherboard socket (${motherboardSocket})`,
        components: ['cpu', 'motherboard']
      });
    }
  }

  // Check if RAM is compatible with motherboard
  if (components.ram && components.motherboard) {
    const ramType = getSpecValue(components.ram, 'type');
    const motherboardRamType = getSpecValue(components.motherboard, 'memoryType');

    if (ramType && motherboardRamType && ramType !== motherboardRamType) {
      issues.push({
        severity: 'error',
        message: `RAM type (${ramType}) is not compatible with motherboard (${motherboardRamType})`,
        components: ['ram', 'motherboard']
      });
    }
  }

  // Check if power supply is sufficient for the build
  if (components.psu) {
    const psuWattage = Number(getSpecValue(components.psu, 'wattage')) || 0;
    let requiredWattage = 0;

    // CPU power consumption
    if (components.cpu) {
      requiredWattage += Number(getSpecValue(components.cpu, 'tdp')) || 100;
    }

    // GPU power consumption
    if (components.gpu) {
      requiredWattage += Number(getSpecValue(components.gpu, 'tdp')) || 150;
    }

    // Add some overhead for other components
    requiredWattage += 100;

    if (psuWattage < requiredWattage) {
      issues.push({
        severity: 'error',
        message: `Power supply (${psuWattage}W) is insufficient for the estimated power draw (${requiredWattage}W)`,
        components: ['psu']
      });
    } else if (psuWattage < requiredWattage * 1.2) {
      issues.push({
        severity: 'warning',
        message: `Power supply (${psuWattage}W) has limited headroom for the estimated power draw (${requiredWattage}W)`,
        components: ['psu']
      });
    }
  }

  // Check if case can fit the graphics card
  if (components.case && components.gpu) {
    const caseMaxGpuLength = Number(getSpecValue(components.case, 'maxGpuLength')) || 0;
    const gpuLength = Number(getSpecValue(components.gpu, 'length')) || 0;

    if (caseMaxGpuLength > 0 && gpuLength > 0 && gpuLength > caseMaxGpuLength) {
      issues.push({
        severity: 'error',
        message: `Graphics card length (${gpuLength}mm) exceeds case maximum GPU length (${caseMaxGpuLength}mm)`,
        components: ['gpu', 'case']
      });
    }
  }

  return issues;
}

/**
 * Helper function to get a spec value from a component
 */
function getSpecValue(component: Component, specKey: string): string | number | undefined {
  const spec = component.specs.find(s => s.key === specKey);
  return spec?.value;
}