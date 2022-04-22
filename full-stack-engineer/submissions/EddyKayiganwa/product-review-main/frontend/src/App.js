import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './components/pages/home';
import Product from './components/pages/product';
import Account from './components/pages/account';
import Page404 from './components/pages/page404';
import Navbar from './components/cards/navbar';
import AuthContextProvider from './components/context/AuthContext';
import ProductContextProvider from './components/context/productContext';

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<Navbar />

				<ProductContextProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/account" element={<Account />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</ProductContextProvider>
			</AuthContextProvider>


            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
				limit={2}
            />

		</Router>


  );
}

export default App;
