import React from 'react';
import { useAuth } from '@my-project/auth';
import {
  Container,
  Card,
  Typography,
  Button,
} from '@mui/material';

const PendingApprovalPage: React.FC = () => {
  const { logoutUser } = useAuth();
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ padding: 4, textAlign: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Pending Approval
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Thank you for submitting your enterprise registration. Your
          application is currently under review by our administrators.
        </Typography>
        <Typography variant="body2" sx={{ mb: 4 }}>
          You will be notified once your application has been approved.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Card>
    </Container>
  );
};

export default PendingApprovalPage;
