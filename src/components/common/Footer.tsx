// src/components/common/Footer.tsx
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} PC Build Optimizer
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Created to learn React, TypeScript, and MUI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;