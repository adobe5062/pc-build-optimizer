// src/components/pages/GamePerformance.tsx
import { Container, Typography, Box, Paper } from '@mui/material';

const GamePerformance = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Game Performance
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          This is where you'll be able to check how well games perform on your PC build.
          We'll implement the performance estimation features in a later phase.
        </Typography>
      </Paper>
    </Container>
  );
};

export default GamePerformance;