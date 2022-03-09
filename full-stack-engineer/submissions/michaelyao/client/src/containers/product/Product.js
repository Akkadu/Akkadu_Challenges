import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { listReviews } from '../../Api';
import { useParams, useLocation } from 'react-router-dom';
import ReviewItem from '../../components/reviewItem/ReviewItem';

const Product = () => {
  const [reviews, setReviews] = useState(null);

  let params = useParams();
  const { state } = useLocation();
  const { productName } = state;

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await listReviews(params.productId);
      setReviews(data);
    };
    fetchReviews();
  }, [params.productId]);

  return (
    <Container>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h6">Product:</Typography>
          <Box py={2}>
            <Typography variant="subtitle1">{`Name: ${productName}`}</Typography>
          </Box>
          <Typography variant="subtitle1">Reviews:</Typography>
        </Box>
        {!reviews ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : reviews.length === 0 ? (
          'No review...'
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Product;
