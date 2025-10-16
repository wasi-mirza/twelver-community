import React from 'react';
import { useAuth } from '@my-project/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
} from '@mui/material';

const DashboardPage: React.FC = () => {
  const { databaseUser, logoutUser } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Welcome, {databaseUser?.firstName} ({databaseUser?.role})
          </Typography>
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography variant="body1">
            You are logged in as a(n) {databaseUser?.role}.
          </Typography>
          {/* Add dashboard content here */}
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage;
