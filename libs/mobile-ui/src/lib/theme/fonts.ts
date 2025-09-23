import { configureFonts } from 'react-native-paper';
import { MD3Type, MD3Typescale } from 'react-native-paper/src/types';

const regularType: MD3Type = {
  fontFamily: 'Poppins-Regular',
  letterSpacing: 0,
  fontWeight: '400',
  lineHeight: 16 * 1.7,
  fontSize: 16,
};

const mediumType: MD3Type = {
  fontFamily: 'Poppins-Medium',
  letterSpacing: 0,
  fontWeight: '500',
  lineHeight: 16 * 1.7,
  fontSize: 16,
};

const semiBoldType: MD3Type = {
  fontFamily: 'Poppins-SemiBold',
  letterSpacing: 0,
  fontWeight: '600',
  lineHeight: 16 * 1.7,
  fontSize: 16,
};

export type AppTypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'pLgBold'
  | 'pLg'
  | 'pMd'
  | 'pSm'
  | 'pSmBold'
  | 'eyeBrowText'
  | 'caption'
  | 'captionBold'
  | 'avatarText'
  | 'avatarTextMedium'
  | 'descriptionText';

const fontConfig: Record<AppTypographyVariants, MD3Type> = {
  h1: {
    ...semiBoldType,
    fontSize: 38,
    lineHeight: 38 * 1.3,
  },
  h2: {
    ...semiBoldType,
    fontSize: 32,
    lineHeight: 32 * 1.3,
  },
  h3: {
    ...semiBoldType,
    fontSize: 26,
    lineHeight: 26 * 1.3,
  },
  h4: {
    ...semiBoldType,
    fontSize: 24,
    lineHeight: 24 * 1.5,
  },
  h5: {
    ...semiBoldType,
    fontSize: 20,
    lineHeight: 20 * 1.5,
  },
  h6: {
    ...semiBoldType,
  },
  pLgBold: {
    ...semiBoldType,
    fontSize: 20,
    lineHeight: 20 * 1.7,
  },
  pLg: {
    ...regularType,
    fontSize: 20,
    lineHeight: 20 * 1.7,
  },
  pMd: {
    ...regularType,
  },
  pSm: {
    ...regularType,
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
  pSmBold: {
    ...semiBoldType,
    fontSize: 14,
    lineHeight: 14 * 1.7,
  },
  eyeBrowText: {
    ...semiBoldType,
    fontSize: 14,
    lineHeight: 14 * 1.7,
  },
  caption: {
    ...regularType,
    fontSize: 12,
    lineHeight: 12 * 1.7,
  },
  captionBold: {
    ...semiBoldType,
    fontSize: 12,
    lineHeight: 12 * 1.7,
  },
  avatarText: {
    ...semiBoldType,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  avatarTextMedium: {
    ...mediumType,
    fontSize: 16,
    lineHeight: 16 * 1.2,
  },
  descriptionText: {
    ...mediumType,
    fontSize: 10,
    lineHeight: 10 * 1.2,
  },
};

export default configureFonts({
  config: fontConfig,
  isV3: true,
}) as unknown as MD3Typescale & Record<AppTypographyVariants, MD3Type>;
