import { Route, Routes } from 'react-router-dom'
import { ListProduct, SingleProduct } from './components'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ListProduct />} />


      <Route path='/:id' element={<SingleProduct />} />
    </Routes>
  );
}

export default App;
