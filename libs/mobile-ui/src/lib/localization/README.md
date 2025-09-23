# Localization System

This localization system provides multi-language support for your React Native app while maintaining backward compatibility with the existing `AppString` object.

## Features

- ✅ **Backward Compatible**: Existing code using `AppString` continues to work without changes
- ✅ **Multi-language Support**: Support for English and Hindi (easily extensible)
- ✅ **Dynamic Language Switching**: Change language at runtime
- ✅ **Fallback Support**: Falls back to English if translation is missing
- ✅ **Type Safety**: Full TypeScript support
- ✅ **React Hooks**: Reactive language switching with `useLocalization` hook

## Quick Start

### 1. Basic Usage (No Changes Required)

Your existing code continues to work exactly as before:

```tsx
import { AppString } from '@notessapp/mobile-ui';

// This will automatically return the localized string
<AppText>{AppString.SIGN_IN}</AppText>
```

### 2. Language Switching

Add the `LanguageSelector` component to your app:

```tsx
import { LanguageSelector } from '@notessapp/mobile-ui';

function SettingsScreen() {
  return (
    <View>
      <Text>Select Language:</Text>
      <LanguageSelector />
    </View>
  );
}
```

### 3. Advanced Usage with Hooks

For more control, use the `useLocalization` hook:

```tsx
import { useLocalization } from '@notessapp/mobile-ui';

function MyComponent() {
  const { currentLanguage, setLanguage, getString } = useLocalization();

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <View>
      <Text>Current Language: {currentLanguage}</Text>
      <Text>Custom String: {getString('CUSTOM_KEY')}</Text>
      <Button onPress={() => handleLanguageChange('hi')} title="Switch to Hindi" />
    </View>
  );
}
```

## Adding New Languages

### 1. Create Language File

Create a new JSON file in `libs/mobile-ui/src/lib/localization/`:

```json
// es.json (Spanish)
{
  "SIGN_IN": "Iniciar sesión",
  "SIGN_UP": "Registrarse",
  "PROFILE": "Perfil"
}
```

### 2. Update LocalizationManager

Add the new language to the `SupportedLanguage` type and import the file:

```typescript
// In LocalizationManager.ts
export type SupportedLanguage = 'en' | 'hi' | 'es';

import en from './en.json';
import hi from './hi.json';
import es from './es.json';

private translations: Record<SupportedLanguage, LocalizationData> = {
  en,
  hi,
  es,
};
```

### 3. Update Language Selector

Add the display name in the `LanguageSelector` component:

```typescript
const getLanguageDisplayName = (language: SupportedLanguage): string => {
  switch (language) {
    case 'en':
      return 'English';
    case 'hi':
      return 'हिंदी';
    case 'es':
      return 'Español';
    default:
      return (language as string).toUpperCase();
  }
};
```

## Adding New Strings

### 1. Add to English JSON

First, add the string to `en.json`:

```json
{
  "NEW_STRING": "This is a new string"
}
```

### 2. Add to Other Languages

Add translations to other language files:

```json
// hi.json
{
  "NEW_STRING": "यह एक नई स्ट्रिंग है"
}

// es.json
{
  "NEW_STRING": "Esta es una nueva cadena"
}
```

### 3. Use in Code

Use the string as before:

```tsx
<AppText>{AppString.NEW_STRING}</AppText>
```

## API Reference

### AppString (Proxy Object)

The main interface for accessing localized strings. Works exactly like the original static object.

```tsx
AppString.SIGN_IN // Returns localized string
```

### useLocalization Hook

```typescript
const {
  currentLanguage,      // Current language code
  strings,             // All strings for current language
  setLanguage,         // Function to change language
  getString,           // Function to get specific string
  getSupportedLanguages // Function to get available languages
} = useLocalization();
```

### localizationManager

Direct access to the localization manager:

```typescript
import { localizationManager } from '@notessapp/mobile-ui';

// Set language
localizationManager.setLanguage('hi');

// Get current language
const currentLang = localizationManager.getCurrentLanguage();

// Get string
const text = localizationManager.getString('SIGN_IN');

// Add translations dynamically
localizationManager.addTranslation('fr', { 'HELLO': 'Bonjour' });
```

### LanguageSelector Component

A pre-built component for language switching:

```tsx
<LanguageSelector style={customStyles} />
```

## Migration Guide

### From Static AppString

**Before:**
```tsx
import { AppString } from '@notessapp/mobile-ui';
<AppText>{AppString.SIGN_IN}</AppText>
```

**After:**
```tsx
// No changes required! It works exactly the same
import { AppString } from '@notessapp/mobile-ui';
<AppText>{AppString.SIGN_IN}</AppText>
```

### Adding Language Switching

**New Feature:**
```tsx
import { LanguageSelector } from '@notessapp/mobile-ui';

function SettingsScreen() {
  return (
    <View>
      <LanguageSelector />
    </View>
  );
}
```

## Best Practices

1. **Always add new strings to all language files** to avoid fallback issues
2. **Use descriptive keys** that clearly indicate the string's purpose
3. **Test with different languages** to ensure proper layout and text fitting
4. **Consider text length** - some languages may have longer text than others
5. **Use the LanguageSelector component** for consistent UI across your app

## Troubleshooting

### Missing Translations

If a translation is missing, the system will:
1. Try to find it in the current language
2. Fall back to English
3. Return the key itself as a last resort

Check the console for warnings about missing translations.

### TypeScript Errors

If you get TypeScript errors about missing keys, make sure:
1. The key exists in the English JSON file
2. You've imported the correct types
3. The key is properly typed in your component

### Performance

The proxy-based approach is optimized for performance. The localization manager caches translations and only updates when the language changes. 