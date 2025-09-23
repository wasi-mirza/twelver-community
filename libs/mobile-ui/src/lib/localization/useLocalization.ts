import { useState, useEffect, useCallback } from 'react';
import localizationManager, { SupportedLanguage } from './LocalizationManager';

export const useLocalization = () => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguage>(
    localizationManager.getCurrentLanguage()
  );

  const [strings, setStrings] = useState(localizationManager.getAllStrings());

  // Update state when language changes
  useEffect(() => {
    const updateLanguage = () => {
      setCurrentLanguageState(localizationManager.getCurrentLanguage());
      setStrings(localizationManager.getAllStrings());
    };

    // Listen for language changes (you can implement a custom event system if needed)
    // For now, we'll rely on the state updates
    updateLanguage();
  }, []);

  const setLanguage = useCallback((language: SupportedLanguage) => {
    localizationManager.setLanguage(language);
    setCurrentLanguageState(language);
    setStrings(localizationManager.getAllStrings());
  }, []);

  const getString = useCallback((key: string): string => {
    return localizationManager.getString(key);
  }, []);

  const getSupportedLanguages = useCallback((): SupportedLanguage[] => {
    return localizationManager.getSupportedLanguages();
  }, []);

  return {
    currentLanguage,
    strings,
    setLanguage,
    getString,
    getSupportedLanguages,
  };
}; 