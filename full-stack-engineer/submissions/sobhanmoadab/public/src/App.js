import { Route, Routes, Navigate } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'
import ListProduct from './components/ListProduct'
import Login from './components/Login';
import Register from './components/Register';
function App() {
  const userInfo = {
    userId: localStorage.getItem('id'),
    token: localStorage.getItem('token')
  }
  return (
    <>
      {/* Same as */}
      <Routes>
        <Route path='/' element={userInfo.token ? <ListProduct /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:id' element={userInfo.token ? <SingleProduct userInfo={userInfo} /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
