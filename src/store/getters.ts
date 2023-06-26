import { defineStore, StoreDefinition, Store } from "pinia";

// Define a type for all the store modules
type StoreModules = Record<string, StoreDefinition>;
type ModuleType = Record<string, any>;
// Import all store files using import.meta.glob
// const modules = import.meta.glob("./modules/*.ts", { eager: true });
const modules = import.meta.glob("./*.ts", { eager: true });

// Export all stores as a single object
export default Object.entries(modules).reduce<StoreModules>((stores, [path, module]) => {
  if (path === "./index.ts" || path === "./getters.ts") return stores;
  const moduleKeys = Object.keys(module as any);
  const store = (module as any)[moduleKeys[0]] as StoreDefinition; // (module as any).default as StoreDefinition;
  const storeName = path.replace(/^.+\/([^/]+)\.ts$/, "$1");

  // Register the store in the global Pinia store
  if (!stores[storeName]) {
    stores[storeName] = store;
  } else {
    console.warn(`Store ${storeName} is already registered.`);
  }
  return stores;
}, {});
