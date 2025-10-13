import React from 'react';
import { useCreateProfileMutation } from '@my-project/gql';
import { useAuthProviderWeb } from '@my-project/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Typography,
  Button,
  Box,
  Grid,
} from '@mui/material';

const RoleSelectionPage: React.FC = () => {
  const { databaseUser, refetchDatabaseUser } = useAuthProviderWeb();
  const [createProfile] = useCreateProfileMutation();
  const navigate = useNavigate();

  const handleSelection = async (isEnterprise: boolean) => {
    if (!databaseUser) return;

    try {
      const { data } = await createProfile({
        variables: {
          input: {
            isEnterprise,
          },
        },
      });
      if (data?.createProfile) {
        await refetchDatabaseUser();
        navigate(isEnterprise ? '/register-enterprise' : '/dashboard', {
          replace: true,
        });
      }
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

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
          Choose Your Role
        </Typography>
        <Typography variant="body2" sx={{ mb: 4 }}>
          Are you an individual looking for services, or an enterprise offering
          them?
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSelection(false)}
            >
              I'm an Individual
            </Button>
          </Grid>
          <Grid xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSelection(true)}
            >
              I'm an Enterprise
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default RoleSelectionPage;
