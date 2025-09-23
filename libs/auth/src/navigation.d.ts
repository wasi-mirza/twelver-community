import { RootStackParamList } from '@notessapp/mobile-ui';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
