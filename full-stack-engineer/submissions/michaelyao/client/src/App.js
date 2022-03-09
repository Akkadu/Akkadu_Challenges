import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/header/Header';
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
    const fetchData = async () => {
      try {
        const { data } = await currentUser();
        setUser(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <CssBaseline />
      <Header />
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
