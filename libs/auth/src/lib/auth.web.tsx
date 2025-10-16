import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User as FirebaseUserWeb,
} from 'firebase/auth';
import {
  Profile,
  Role,
  User as DatabaseUser,
  useGetUserByFirebaseIdLazyQuery,
} from '@my-project/gql';

type UserWithProfile = DatabaseUser & {
  profile?: Profile | null;
  role: Role;
};

type WebAuthContextType = {
  user: FirebaseUserWeb | null;
  databaseUser: UserWithProfile | null;
  loading: boolean;
  logoutUser: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<FirebaseUserWeb | null>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUserWeb | null>;
  signInWithGoogle: () => Promise<FirebaseUserWeb | null>;
  doNoting: () => Promise<void>;
  setDatabaseUser: (user: UserWithProfile | null) => void;
  refetchDatabaseUser: () => Promise<UserWithProfile | null>;
};

// 1. Context Creation
// Why: To make the user, loading, and logoutUser function accessible throughout the app.
const WebAuthContext = createContext<WebAuthContextType>({} as WebAuthContextType);

// 2. AuthProviderWeb Component
// Role: Provides authentication context to all child components.
const AuthProviderWeb = (props: React.PropsWithChildren<object>) => {
  const [user, setUser] = useState<FirebaseUserWeb | null>(null);
  const [databaseUser, setDatabaseUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [getUserByFirebaseId, { refetch }] = useGetUserByFirebaseIdLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.getUserByFirebaseId) {
        setDatabaseUser(data.getUserByFirebaseId as UserWithProfile);
      }
      setLoading(false);
    },
    onError: () => {
      setDatabaseUser(null);
      setLoading(false);
    },
  });

  // 3. Listen to Firebase Auth State
  useEffect(() => {
    const auth = getAuth();
    // Subscribes to Firebase's auth state changes.
    // When user signs in or out, the user state is updated.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Clear database user when Firebase user logs out
      if (!firebaseUser) {
        setDatabaseUser(null);
        setLoading(false);
      } else {
        getUserByFirebaseId({ variables: { firebaseId: firebaseUser.uid } });
      }
    });
    return () => unsubscribe();
  }, [getUserByFirebaseId]);

  // 4. Logout Function
  // Handles Firebase sign-out.
  const logoutUser = async () => {
    console.log('logoutUser -- function triggered & it will sign out the user');
    const auth = getAuth();
    await signOut(auth);
    // Clear database user on logout
    setDatabaseUser(null);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up with email and password', error);
      return null;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in with email and password', error);
      return null;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google', error);
      return null;
    }
  };

  const refetchDatabaseUser = async () => {
    if (user && refetch) {
      const { data } = await refetch({ firebaseId: user.uid });
      if (data && data.getUserByFirebaseId) {
        setDatabaseUser(data.getUserByFirebaseId as UserWithProfile);
        return data.getUserByFirebaseId as UserWithProfile;
      }
    }
    return null;
  };

  const doNoting = async () => {
    return;
  };
  // 5. Memoize the value for optimization
  // Prevents unnecessary re-renders by memoizing the context value.
  const value = useMemo(
    () => ({
      user,
      databaseUser,
      loading,
      logoutUser,
      signUpWithEmail,
      signInWithEmail,
      signInWithGoogle,
      doNoting,
      setDatabaseUser,
      refetchDatabaseUser,
    }),
    [user, databaseUser, loading]
  );

  // 6. Return the context provider
  // Wraps the application (or part of it) and provides the auth context to all child components.
  return <WebAuthContext.Provider value={value} {...props} />;
};

// Custom hook to access the auth context
const useAuthProviderWeb = () => {
  const ctx = useContext(WebAuthContext);
  if (!ctx) throw new Error('useAuthProviderWeb must be used within AuthProviderWeb');
  return ctx;
};

export { AuthProviderWeb, useAuthProviderWeb };


