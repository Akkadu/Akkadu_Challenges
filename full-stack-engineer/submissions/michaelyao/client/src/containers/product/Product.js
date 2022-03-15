import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from '@mui/material';
import { listReviews, deleteReview } from '../../Api';
import { useParams, useLocation } from 'react-router-dom';
import ReviewItem from '../../components/reviewItem/ReviewItem';
import AddReview from '../../components/addReview/AddReview';
import EditReview from '../../components/editReview/EditReview';

const Product = () => {
  const [reviews, setReviews] = useState(null);
  const [displayAddReview, setDisplayAddReview] = useState(false);
  const [displayEditReview, setDisplayEditReview] = useState(false);
  const [reviewBeingEdited, setReviewBeingEdited] = useState(null);

  let params = useParams();
  const { state } = useLocation();
  const { productName } = state;

  const fetchReviews = useCallback(async () => {
    const { data } = await listReviews(params.productId);
    setReviews(data);
  }, [params.productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Add review
  const handleClickWriteAReviewButton = () => {
    setDisplayAddReview(true);
  };

  const handleReviewCreated = () => {
    setDisplayAddReview(false);
    fetchReviews();
  };

  const handleCloseAddReview = () => {
    setDisplayAddReview(false);
  };

  // Update review
  const handleReviewUpdated = () => {
    setDisplayEditReview(false);
    fetchReviews();
  };

  const handleCloseUpdateReview = () => {
    setDisplayEditReview(false);
  };

  const handleClickEditButton = (review) => {
    setDisplayEditReview(true);
    setReviewBeingEdited(review);
  };

  // Delete review
  const handleClickDeleteButton = async (review) => {
    await deleteReview(params.productId, review.id);
    await fetchReviews();
  };

  return (
    <Container>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h6">Product:</Typography>
          <Box py={2}>
            <Typography variant="subtitle1">{`Name: ${productName}`}</Typography>
          </Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" component="span">
              {`Reviews(${reviews && reviews.length}):`}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickWriteAReviewButton}
            >
              Write a review
            </Button>
          </Grid>
        </Box>
        {!reviews ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : reviews.length === 0 ? (
          'No review...'
        ) : (
          reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              handleClickEditButton={handleClickEditButton}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          ))
        )}
      </Box>
      {displayAddReview && (
        <AddReview
          productId={params.productId}
          onReviewCreated={handleReviewCreated}
          onClose={handleCloseAddReview}
        />
      )}
      {displayEditReview && (
        <EditReview
          productId={params.productId}
          review={reviewBeingEdited}
          onReviewUpdated={handleReviewUpdated}
          onClose={handleCloseUpdateReview}
        />
      )}
    </Container>
  );
};

export default Product;
