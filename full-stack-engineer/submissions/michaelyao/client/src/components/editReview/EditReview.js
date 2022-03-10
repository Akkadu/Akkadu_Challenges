import React, { useState } from 'react';
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Grid,
  Rating,
  TextField,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateReview } from '../../Api';

const UpdateReview = ({ productId, review, onHideEditReview }) => {
  const [ratingValue, setRatingValue] = useState(review.rating);
  const [content, setContent] = useState(review.text);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [reviewUpdated, setReviewUpdated] = useState(false);

  const handleClose = () => {
    onHideEditReview(reviewUpdated);
  };

  const handleClickUpdateReviewButton = async () => {
    try {
      await updateReview(productId, review.id, ratingValue, content);
      setDisplaySuccessAlert(true);
      setReviewUpdated(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Dialog open onClose={handleClose} fullWidth>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          item
          xs={12}
        >
          <Typography variant="h6" component="span">
            Edit Review
          </Typography>

          <IconButton onClick={handleClose} color="error">
            <CancelIcon />
          </IconButton>
        </Grid>
        <Box mt={4}>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            margin="normal"
            required
            fullWidth
          />
        </Box>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <DialogActions>
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleClickUpdateReviewButton}
            >
              Update Review
            </Button>
          </Box>
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={displaySuccessAlert}
          autoHideDuration={6000}
          onClose={() => {
            setDisplaySuccessAlert(false);
            handleClose();
          }}
        >
          <Alert severity="success">Review updated successfully!</Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
};

export default UpdateReview;
