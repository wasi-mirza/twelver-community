import { MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
import colors from './colors';
import fonts from './fonts';

const theme = {
  ...MD3LightTheme,
  fonts,
  colors,
  animation: {
    scale: 1.0,
  },
  breakpoints: {
    xs: 375,
    sm: 430,
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

interface Props {
  children: React.ReactNode;
}

const ThemeConfig = ({ children }: Props) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export { ThemeConfig };
