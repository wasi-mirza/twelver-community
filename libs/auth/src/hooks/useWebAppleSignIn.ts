import { getAuth, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuthProviderWeb } from '../lib/auth.web';
import { useCreateUserMutation } from '@my-project/gql';
import { splitName } from '@my-project/common-libs';

const useWebAppleSignIn = () => {
  const { logoutUser, setDatabaseUser } = useAuthProviderWeb();
  const [createUserMutation] = useCreateUserMutation();

  const appleSignIn = useCallback(async () => {
    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');
    try {
      const credential = await signInWithPopup(auth, provider);
      
      // Sync user with database after successful authentication
      try {
        const { firstName, lastName } = splitName(credential.user.displayName);
        const userData = {
          firstName,
          lastName,
          email: credential.user.email || '',
          firebaseId: credential.user.uid,
        };
        
        const result = await createUserMutation({
          variables: {
            input: userData
          },
          context: {
            clientName: 'public'
          }
        });
        
        const databaseUser = result.data?.createUser;
        console.log('User synced with database successfully:', databaseUser);
        
        // Store database user in auth context
        if (databaseUser) {
          setDatabaseUser(databaseUser);
        }
      } catch (syncError) {
        console.error('Failed to sync user with database:', syncError);
        // Don't throw here - user is still authenticated with Firebase
      }
      
      return credential.user;
    } catch (error) {
      await signOut(auth).catch(() => {});
      throw error;
    }
  }, [createUserMutation, setDatabaseUser]);

  const appleSignOut = useCallback(async () => {
    await logoutUser();
  }, [logoutUser]);

  return { appleSignIn, appleSignOut };
};

export { useWebAppleSignIn };


