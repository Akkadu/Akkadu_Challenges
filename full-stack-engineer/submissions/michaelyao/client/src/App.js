import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';
import { AuthContext } from './contexts/authContext';
import { currentUser } from './Api';

function App() {
  const [user, setUser] = useState(null);
  const value = {
    user,
    setUser,
  };

  useEffect(() => {
    // When the app is lauched, let's check the user is signed in or not.
    const fetchData = async () => {
      try {
        const { data } = await currentUser();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <CssBaseline />
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
