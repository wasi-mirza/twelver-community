import localizationManager from './LocalizationManager';

// Create a proxy object that maintains the same API as the original AppString
// but dynamically returns localized strings
const AppString = new Proxy({} as any, {
  get(target, prop: string) {
    // Return the localized string for the given key
    return localizationManager.getString(prop);
  },
});

export { AppString };

// Export the localization manager and hook for advanced usage
export { default as localizationManager } from './LocalizationManager';
export { useLocalization } from './useLocalization';
export type { SupportedLanguage } from './LocalizationManager';
