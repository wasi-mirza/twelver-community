import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  Role,
  User,
} from '@my-project/gql';

export function UserManagementPage() {
  const { data, loading, error } = useGetUsersQuery();
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<
    User | undefined
  >(undefined);
  const [updateUser] = useUpdateUserMutation();

  const users = data?.getUsers || [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedUser(undefined);
  };

  const handleUpdateUserRole = async () => {
    if (!selectedUser?.id || !selectedUser?.role) return;
    try {
      await updateUser({
        variables: {
          data: {
            id: selectedUser.id,
            role: selectedUser.role,
          },
        },
      });
      // refetch(); // This line is removed as per the new_code, as the data is now paginated.
      handleEditClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Add User
        </Button>
      </Box>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a new role for {selectedUser?.email}.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={selectedUser?.role || ''}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value as Role } as User)
              }
            >
              {Object.values(Role).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdateUserRole}>Save</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditOpen(user as User)}>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
