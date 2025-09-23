import { User } from '@my-project/gql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  user: User | null;
  setNewUser: (newUser: User | null) => void;
  me?: User | undefined | null;
  clearData: VoidFunction;
  setMeData: (person: User) => void;
  loading: boolean;
};

const AuthContext = createContext<ContextType>({} as ContextType);

const AuthProvider = (props: React.PropsWithChildren<object>) => {
  const [user, setNewUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [me, setMe] = useState<User | null>(null);

  async function setMeData(person: User) {
    setMe(person);
    await AsyncStorage.setItem('me', JSON.stringify(person));
  }

  async function getUserFromLocalStorage() {
    try {
      setLoading(true);
      const localMe = await AsyncStorage.getItem('me');
      setMe(localMe ? JSON.parse(localMe) : null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(
    //   getAuth(),
    //   async (firebaseUser: User | null | undefined) => {
    //     if (!firebaseUser) {
    //       clearData();
    //       return;
    //     }
    //     setNewUser(firebaseUser as User);
    //   }
    // );

    // return () => unsubscribe();
  }, []);

  async function clearData() {
    await AsyncStorage.removeItem('me');
    setMe(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setNewUser,
        me: me as User,
        setMeData,
        clearData,
        loading,
      }}
      {...props}
    />
  );
};

const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthProvider must be used within an AuthProvider');
  }

  const { user, me, clearData, setMeData, loading } = context;


  const logoutUser = async () => {
    clearData();
    if (getAuth().currentUser) {
      await signOut(getAuth());
    }
  };

  return {
    user,
    logoutUser,
    me,
    setMeData,
    clearData,
    loading,
  };
};

export { AuthProvider, useAuthProvider };
