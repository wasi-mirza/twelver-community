import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';
import { STORAGE_KEYS } from '../constants';

export type SupportedLanguage = 'en' | 'hi';

interface LocalizationData {
  [key: string]: string;
}

class LocalizationManager {
  private currentLanguage: SupportedLanguage = 'en';
  private translations: Record<SupportedLanguage, LocalizationData> = {
    en,
    hi,
  };

  constructor() {
    // Try to load saved language preference
    this.loadLanguagePreference().then(() => {
      // console.log('Language preference loaded:', this.currentLanguage);
    });
  }

  private async loadLanguagePreference(): Promise<void> {
    try {
      // You can implement AsyncStorage or other storage mechanism here
      // For now, we'll use the default language
      const savedLanguage = await this.getStoredLanguage();
      if (savedLanguage && this.isValidLanguage(savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
  }

  private async getStoredLanguage(): Promise<string | null> {
    const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return language;
  }

  private async saveLanguagePreference(language: SupportedLanguage): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }

  private isValidLanguage(language: string): language is SupportedLanguage {
    return ['en', 'hi'].includes(language);
  }

  public setLanguage(language: SupportedLanguage): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguage = language;
      this.saveLanguagePreference(language);
    } else {
      console.warn(`Unsupported language: ${language}`);
    }
  }

  public getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public getSupportedLanguages(): SupportedLanguage[] {
    return Object.keys(this.translations) as SupportedLanguage[];
  }

  public getString(key: string): string {
    const translation = this.translations[this.currentLanguage];
    if (translation && translation[key]) {
      return translation[key];
    }
    
    // Fallback to English if translation not found
    const englishTranslation = this.translations['en'];
    if (englishTranslation && englishTranslation[key]) {
      console.warn(`Translation not found for key "${key}" in language "${this.currentLanguage}", falling back to English`);
      return englishTranslation[key];
    }
    
    // Final fallback - return the key itself
    console.warn(`Translation not found for key "${key}" in any language`);
    return key;
  }

  public getAllStrings(): LocalizationData {
    return this.translations[this.currentLanguage];
  }

  // Method to add new translations dynamically
  public addTranslation(language: SupportedLanguage, translations: LocalizationData): void {
    if (this.isValidLanguage(language)) {
      this.translations[language] = {
        ...this.translations[language],
        ...translations,
      };
    }
  }
}

// Create a singleton instance
const localizationManager = new LocalizationManager();

export default localizationManager; 