import React from 'react';
import { useWebGoogleSignIn } from '@my-project/auth';
import {
  Container,
  Card,
  Typography,
  Button,
  Box,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC = () => {
  const { googleSignIn } = useWebGoogleSignIn();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error('Failed to sign in:', error);
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
          Welcome
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Please sign in to continue.
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleSignIn}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage;
