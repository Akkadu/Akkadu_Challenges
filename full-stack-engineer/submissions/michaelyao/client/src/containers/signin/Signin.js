import React, { useState, useContext } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Alert,
  Link,
} from '@mui/material';
import { signin } from '../../Api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '../../Constants';
import { AuthContext } from '../../contexts/authContext';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleClickSigninButton = async () => {
    // TODO: Do client form validation
    setErrorMessage('');
    try {
      const { data } = await signin({ username, password });
      setUser(data);
      navigate(APPLICATION_ROUTES.ROOT);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6">Sign In</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box my={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickSigninButton}
              >
                Sign In
              </Button>
            </Box>
            <Box py={1.5}>
              {"Don't have an account? Go to "}
              <Link component={RouterLink} to={APPLICATION_ROUTES.SIGNUP}>
                Signup
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signin;
