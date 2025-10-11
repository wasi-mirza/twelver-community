import React from 'react';
import { useWebGoogleSignIn } from '@my-project/auth';

const LoginPage: React.FC = () => {
  const { googleSignIn } = useWebGoogleSignIn();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      // On successful sign-in, the user will be redirected
      // by the main App component's logic.
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>Please sign in to continue.</p>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
