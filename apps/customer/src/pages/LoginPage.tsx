import React, { useState } from 'react';
import { useAuth } from '@my-project/auth';
import { useEnsureUserMutation } from '@my-project/gql';
import {
  Container,
  Card,
  Typography,
  Button,
  Box,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import TextField from '@mui/material/TextField';

const LoginPage: React.FC = () => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ensureUser] = useEnsureUserMutation();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const user = await signUpWithEmail(email, password);
        if (user) {
          await ensureUser();
        }
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <Box component="form" onSubmit={handleEmailAuth} sx={{ mt: 1 }}>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Please {isSignUp ? 'sign up' : 'sign in'} to continue.
          </Typography>
          {isSignUp && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"

            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage;
