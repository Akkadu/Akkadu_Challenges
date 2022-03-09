import React, { useContext } from 'react';
import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Popover,
  Link,
  Grid,
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { AuthContext } from '../../contexts/authContext';
import { signout } from '../../Api';
import { APPLICATION_ROUTES } from '../../Constants';

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
          <Link
            href={APPLICATION_ROUTES.ROOT}
            underline="none"
            color="inherit"
            sx={{ flexGrow: 1 }}
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <RateReviewIcon />
              <Typography variant="h6" component="span">
                Product review
              </Typography>
            </Grid>
          </Link>
          {!user ? (
            <Link
              href={APPLICATION_ROUTES.SIGNIN}
              underline="none"
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
              Signout
            </Button>
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
