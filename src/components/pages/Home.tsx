// src/components/pages/Home.tsx
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to PC Build Optimizer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Build, optimize, and compare PC configurations for gaming
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" component={Link} to="/builder" size="large" sx={{ mx: 1 }}>
            Start Building
          </Button>
          <Button variant="outlined" component={Link} to="/performance" size="large" sx={{ mx: 1 }}>
            Check Game Performance
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;