import React from 'react';
import { useAuth } from '@my-project/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Container,
} from '@mui/material';

const drawerWidth = 240;

export function DashboardPage() {
  const { databaseUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!databaseUser) {
      navigate('/login');
    }
  }, [databaseUser, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'User Management', path: '/users' },
              { text: 'Enterprise Applications', path: '/applications' },
              { text: 'Broadcasts', path: '/broadcasts' },
              { text: 'Bookings', path: '/bookings' },
              { text: 'Reviews', path: '/reviews' },
            ].map((item) => (
              <ListItem key={item.text} component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          {databaseUser && (
            <Box sx={{ p: 2, mt: 'auto' }}>
              <Typography variant="body1">Welcome, {databaseUser.email}</Typography>
              <Button variant="contained" onClick={logoutUser} fullWidth>
                Sign out
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          <Typography paragraph>
            Welcome, admin! Select a category to manage.
          </Typography>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
