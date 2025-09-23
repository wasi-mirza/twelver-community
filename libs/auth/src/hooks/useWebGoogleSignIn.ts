import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuthProviderWeb } from '../lib/auth.web';
import { useCreateUserMutation } from '@my-project/gql';
import { splitName } from '@my-project/common-libs';

// This custom React hook provides Google Sign-In and Sign-Out functionality for a web app using Firebase Authentication.
const useWebGoogleSignIn = () => {
  const { logoutUser, setDatabaseUser } = useAuthProviderWeb();
  const [createUserMutation] = useCreateUserMutation();

  const googleSignIn = useCallback(async () => {
    const auth = getAuth(); //Get the current auth instance
    const provider = new GoogleAuthProvider(); //Provider for Google login.
    try {
      const credential = await signInWithPopup(auth, provider); //Trigger Google sign-in via a popup
      console.log('credential', credential);
      
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

  const googleSignOut = useCallback(async () => {
    await logoutUser();
  }, [logoutUser]);

  return { googleSignIn, googleSignOut };
};

export { useWebGoogleSignIn };


