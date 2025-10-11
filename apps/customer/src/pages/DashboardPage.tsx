import React from 'react';
import { useAuthProviderWeb } from '@my-project/auth';

const DashboardPage: React.FC = () => {
  const { user, databaseUser, logoutUser } = useAuthProviderWeb();
  console.log('databaseUser', databaseUser);
  
  return (
    <div>
      <h1>Welcome, {databaseUser?.firstName}</h1>
      <p>You are logged in as a(n) {databaseUser?.role}.</p>
      {/* Add dashboard content here */}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default DashboardPage;
