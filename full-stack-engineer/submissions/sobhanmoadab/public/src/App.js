import { Route, Routes  } from 'react-router-dom'
import SingleProduct from './components/Product/SingleProduct'
import ListProduct from './components/Product/ListProduct'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { PrivateRoute } from './utils/PrivateRoute';
import { ProtectedRoute } from './utils/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute> <ListProduct /> </PrivateRoute>} />

        <Route path='/:id' element={<PrivateRoute> <SingleProduct /> </PrivateRoute>} />

        <Route path='/login' element={<ProtectedRoute> <Login /> </ProtectedRoute>} />
        
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;