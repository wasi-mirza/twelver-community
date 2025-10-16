import { useAuthProviderWeb } from './auth.web';

export const useAuth = () => {
  const {
    user,
    databaseUser,
    loading,
    logoutUser,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    refetchDatabaseUser,
  } = useAuthProviderWeb();

  return {
    user,
    databaseUser,
    loading,
    logoutUser,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    refetchDatabaseUser,
  };
};
