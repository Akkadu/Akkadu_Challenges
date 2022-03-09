import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import ProductItem from '../../components/productItem/ProductItem';
import { listProducts } from '../../Api';

const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await listProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Home;
