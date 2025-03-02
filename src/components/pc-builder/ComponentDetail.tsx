// src/components/pc-builder/ComponentDetail.tsx
import { 
    Box, 
    Typography, 
    Paper, 
    Chip, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow,
    Divider
  } from '@mui/material';
  import { Component } from '../../models/Component';
  
  interface ComponentDetailProps {
    component: Component;
  }
  
  const ComponentDetail = ({ component }: ComponentDetailProps) => {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {component.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {component.brand} • {component.model}
            </Typography>
          </Box>
          <Chip 
            label={`$${component.price.toFixed(2)}`} 
            color="primary" 
            variant="filled" 
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Specifications
        </Typography>
        
        <TableContainer>
          <Table size="small">
            <TableBody>
              {component.specs.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ 
                      width: '40%', 
                      fontWeight: 'medium',
                      color: 'text.secondary',
                      borderBottom: index === component.specs.length - 1 ? 'none' : undefined
                    }}
                  >
                    {formatSpecKey(spec.key)}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      borderBottom: index === component.specs.length - 1 ? 'none' : undefined
                    }}
                  >
                    {spec.value} {spec.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };
  
  // Helper function to format spec keys for display
  function formatSpecKey(key: string): string {
    // Convert camelCase to Title Case with spaces
    const formatted = key
      .replace(/([A-Z])/g, ' $1') // Insert a space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
    
    // Handle special cases like "tdp" -> "TDP"
    const specialCases: { [key: string]: string } = {
      'Tdp': 'TDP',
      'Cpu': 'CPU',
      'Gpu': 'GPU',
      'Ssd': 'SSD',
      'Hdd': 'HDD',
      'Psu': 'PSU',
      'Atx': 'ATX',
    };
    
    return Object.keys(specialCases).reduce(
      (str, abbr) => str.replace(abbr, specialCases[abbr]),
      formatted
    );
  }
  
  export default ComponentDetail;