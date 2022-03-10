import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

const ProductItem = ({ product, handleClick }) => {
  return (
    <Box mb={2}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleClick(product)}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductItem;