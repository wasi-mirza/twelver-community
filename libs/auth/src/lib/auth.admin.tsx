import React, { createContext, useContext } from 'react';
import { AuthProviderWeb, useAuthProviderWeb } from './auth.web';

type AdminAuthContextType = {
  isAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
});

export const AdminAuthProvider = (props: React.PropsWithChildren<object>) => {
  return (
    <AuthProviderWeb forAdmin>
      <AdminAuth {...props} />
    </AuthProviderWeb>
  );
};

const AdminAuth = (props: React.PropsWithChildren<object>) => {
  const { databaseUser, loading } = useAuthProviderWeb();
  const isAdmin = databaseUser?.role === 'ADMIN';

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAdmin) {
    // Redirect to login or an unauthorized page
    return <div>Unauthorized</div>;
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin }} {...props} />
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
