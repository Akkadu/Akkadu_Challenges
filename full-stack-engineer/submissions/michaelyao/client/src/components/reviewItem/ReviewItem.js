import React, { useContext } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Rating,
  Chip,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { AuthContext } from '../../contexts/authContext';

const ReviewItem = ({ review }) => {
  const { user } = useContext(AuthContext);

  return (
    <Box mb={2}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container direction="row">
            <Chip label={review.user.username} />
            <Box ml={0.5} sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Rating
                    value={review.rating / 2}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </Grid>
                <Grid item>
                  {user && user.id === review.user.id && (
                    <Stack direction="row" spacing={0.5}>
                      <Button variant="contained" size="small">
                        Edit
                      </Button>
                      <Button variant="outlined" size="small">
                        Delete
                      </Button>
                    </Stack>
                  )}
                </Grid>
              </Grid>
              <Typography variant="body" component="div">
                {review.text}
              </Typography>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReviewItem;
