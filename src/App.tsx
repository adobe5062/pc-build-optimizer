// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import PcBuilder from './components/pages/PcBuilder';
import GamePerformance from './components/pages/GamePerformance';
import { BuildProvider } from './contexts/BuildContext';

// Create a dark theme with deep purple accents
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: deepPurple[400],
      light: deepPurple[300],
      dark: deepPurple[600],
    },
    secondary: {
      main: purple[300],
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          // Apply border radius to all Papers except for those used in AppBar
          borderRadius: ownerState.component === 'header' ? 0 : 12,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Ensure AppBar has no border radius
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BuildProvider>
        <Router>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #121212, #1c1c1c)',
          }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/builder" element={<PcBuilder />} />
                <Route path="/performance" element={<GamePerformance />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </BuildProvider>
    </ThemeProvider>
  );
}

export default App;