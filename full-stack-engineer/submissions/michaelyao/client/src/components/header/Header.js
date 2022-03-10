import React, { useContext } from 'react';
import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Popover,
  Grid,
  Link,
} from '@mui/material';
import { AuthContext } from '../../contexts/authContext';
import { signout } from '../../Api';
import { APPLICATION_ROUTES } from '../../Constants';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const id = open ? 'avatar' : undefined;

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSignoutButton = async () => {
    setAnchorEl(null);
    await signout();
    setUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid alignItems="center" container>
            <Link
              component={RouterLink}
              to={APPLICATION_ROUTES.ROOT}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Product review
              </Typography>
            </Link>
          </Grid>
          {!user ? (
            <Link
              component={RouterLink}
              to={APPLICATION_ROUTES.SIGNIN}
              color="inherit"
            >
              Signin
            </Link>
          ) : (
            <Avatar aria-describedby={id} onClick={handleClickAvatar}>
              {user.username[0].toUpperCase()}
            </Avatar>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Button color="inherit" onClick={handleClickSignoutButton}>
              Sign out
            </Button>
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
