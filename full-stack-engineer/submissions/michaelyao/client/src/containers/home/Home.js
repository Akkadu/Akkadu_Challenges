import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import ProductItem from '../../components/productItem/ProductItem';
import { listProducts } from '../../Api';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '../../Constants';

const Home = () => {
  const [products, setProducts] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await listProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleClickCard = (product) => {
    navigate(`${APPLICATION_ROUTES.PRODUCT}/${product.id}`, {
      state: {
        productName: product.name,
      },
    });
  };

  return (
    <Container>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h6">All Products</Typography>
        </Box>
        {!products ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              handleClick={handleClickCard}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Home;
