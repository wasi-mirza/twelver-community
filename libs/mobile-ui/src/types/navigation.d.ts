import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserStory } from '@notessapp/gql';
import { DocumentManagerConfig } from '../hooks/useDocumentManager';
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  CreateProfile: {
    phone?: number;
  };
  OnboardingScreen: undefined;
  OtpInputScreen: {
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };

  // Main

  HomeScreen: {
    initialTab?: string;
  };
  ProfileScreen: undefined;
  MembersScreen: undefined;
  VaultScreen: undefined;
  GenericDocumentScreen: {
    config: DocumentManagerConfig;
    pageTitle: string;
    getFileIcon?: (fileName: string) => string;
  };
  StoriesScreen: undefined;
  BasicTemplateScreen: undefined;
  UserTemplateScreen: undefined;

  IndividualSharedSpaceScreen: {
    communityId: string;
    type: string;
    title: string;
    memberImages: string[];
    createdById?: string;
    image?: string;
    isPublic?: boolean;
  };
  NewSpaceScreen: undefined;
  EditSpaceScreen: {
    communityId: string;
    title: string;
  };

  EditPublicSpacePrefrencesScreen: {
    communityId: string;
    title: string;
  };
  DetailsScreen: undefined;
  CreateStory: {
    communityId?: string;
  };
  StoryLoading: { personIds: string[]; communityId?: string };
  Story: {
    storyResponse: UserStory;
    storyId: string;
    isFromCreationFlow?: boolean;
    showAnimation?: boolean;
    regenerate?: boolean;
    isFromVault?: boolean;
  };
  StoryPreference: {
    storyResponse: UserStory;
    storyId: string;
    isFromVault?: boolean;
  };
  MemoryImageScreen: undefined;
  MemoryFlowScreen: undefined;
  MemoryAnimationScreen: undefined;
  MemoryContextScreen: undefined;
  MemoryPreviewScreen: undefined;
  MemoryConfirmationScreen: undefined;
  MemoryFinalScreen: undefined;

  SettingScreen: undefined;
  ManageDataScreen: {
    postIds?: string[];
    communityId?: string;
    storyResponse?: UserStory;
  };
  ManageSubStoriesScreen: {
    postData: Post;
  };
  SubscriptionScreen: undefined;

  UsageScreen: undefined;
  FacebookIntegration: undefined;
  InstagramIntegration: {
    code?: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
