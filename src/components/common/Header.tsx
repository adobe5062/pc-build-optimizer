// src/components/common/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        borderRadius: 0, // Ensure no border radius for the header
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center', 
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            <BuildIcon sx={{ mr: 1 }} />
            PC Build Optimizer
          </Typography>
          
          <Box>
            <Button component={Link} to="/" sx={{ mx: 1 }}>
              Home
            </Button>
            <Button component={Link} to="/builder" sx={{ mx: 1 }}>
              PC Builder
            </Button>
            <Button component={Link} to="/performance" sx={{ mx: 1 }}>
              Performance
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;