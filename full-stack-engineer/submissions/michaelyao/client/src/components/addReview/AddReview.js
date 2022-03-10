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
import { createReview } from '../../Api';

const AddReview = ({ productId, onHideAddReview }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [reviewCreated, setReviewCreated] = useState(false);

  const handleClose = () => {
    onHideAddReview(reviewCreated);
  };

  const handleClickCreateReviewButton = async () => {
    try {
      await createReview(productId, ratingValue, content);
      setDisplaySuccessAlert(true);
      setReviewCreated(true);
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
            New Review
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
              onClick={handleClickCreateReviewButton}
            >
              Create Review
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
          <Alert severity="success">Review created successfully!</Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
};

export default AddReview;
