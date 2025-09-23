export * from './lib/constants';
export * from './lib/theme';
export * from './lib/localization/AppString';
export * from './types/navigation.d';

// Export localization components
export { useLocalization } from './lib/localization/useLocalization';
export { default as localizationManager } from './lib/localization/LocalizationManager';
export type { SupportedLanguage } from './lib/localization/LocalizationManager';
