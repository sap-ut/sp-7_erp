import { ModuleId } from '@/types';

// ============================================
// MODULE FACTORY PATTERN
// ============================================

export interface ModuleConfig {
  id: ModuleId;
  name: string;
  icon: string;
  description: string;
  shortcut?: string;
  color: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

// Module Registry
class ModuleRegistry {
  private modules: Map<ModuleId, ModuleConfig> = new Map();
  
  register(config: ModuleConfig): void {
    this.modules.set(config.id, config);
  }
  
  get(id: ModuleId): ModuleConfig | undefined {
    return this.modules.get(id);
  }
  
  getAll(): ModuleConfig[] {
    return Array.from(this.modules.values());
  }
  
  has(id: ModuleId): boolean {
    return this.modules.has(id);
  }
}

export const moduleRegistry = new ModuleRegistry();

// Module Factory
export class ModuleFactory {
  static createModule(id: ModuleId): ModuleConfig | null {
    return moduleRegistry.get(id) || null;
  }
  
  static getAllModules(): ModuleConfig[] {
    return moduleRegistry.getAll();
  }
  
  static isValidModule(id: string): id is ModuleId {
    return moduleRegistry.has(id as ModuleId);
  }
}

// Module Creator Function
export function createModule(config: ModuleConfig): ModuleConfig {
  moduleRegistry.register(config);
  return config;
}
