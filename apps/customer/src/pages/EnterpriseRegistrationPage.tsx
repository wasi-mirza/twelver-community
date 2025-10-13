import React, { useState } from 'react';
import { useUpdateProfileMutation } from '@my-project/gql';
import { useAuthProviderWeb } from '@my-project/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
} from '@mui/material';

const EnterpriseRegistrationPage: React.FC = () => {
  const { databaseUser, refetchDatabaseUser } = useAuthProviderWeb();
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    tradeType: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!databaseUser?.profile) return;

    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            id: databaseUser.profile.id!,
            ...formData,
          },
        },
      });
      if (data?.updateProfile) {
        await refetchDatabaseUser();
        navigate('/pending-approval', { replace: true });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Card sx={{ padding: 4 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Enterprise Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="companyName"
                required
                fullWidth
                label="Company Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tradeType"
                required
                fullWidth
                label="Trade Type (e.g., Plumber)"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                required
                fullWidth
                label="Phone"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                required
                fullWidth
                label="Address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="city"
                required
                fullWidth
                label="City"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="state"
                required
                fullWidth
                label="State"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="postalCode"
                required
                fullWidth
                label="Postal Code"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                label="Description of services"
                multiline
                rows={4}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit for Approval
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default EnterpriseRegistrationPage;
