// src/components/pages/PcBuilder.tsx
import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Card, 
  CardContent, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { useBuildContext } from '../../contexts/BuildContext';
import { mockComponents } from '../../data/mockComponents';
import { Component, ComponentType } from '../../models/Component';

const PcBuilder = () => {
  const { currentBuild, addComponent, removeComponent } = useBuildContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<ComponentType>('cpu');

  const handleOpenDialog = (type: ComponentType) => {
    setSelectedType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectComponent = (component: Component) => {
    addComponent(component);
    handleCloseDialog();
  };

  // Filter components by the selected type
  const filteredComponents = mockComponents.filter(
    component => component.type === selectedType
  );

  const componentTypes: { type: ComponentType, label: string }[] = [
    { type: 'cpu', label: 'CPU' },
    { type: 'motherboard', label: 'Motherboard' },
    { type: 'gpu', label: 'Graphics Card' },
    { type: 'ram', label: 'Memory (RAM)' },
    { type: 'storage', label: 'Storage' },
    { type: 'psu', label: 'Power Supply' },
    { type: 'case', label: 'Case' },
    { type: 'cooler', label: 'CPU Cooler' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        PC Builder
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Your Build: {currentBuild?.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Select components for your PC build by clicking on each category.
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 2
          }}
        >
          {componentTypes.map(({ type, label }) => (
            <Card 
              key={type}
              variant="outlined" 
              sx={{ 
                height: '100%',
                borderColor: currentBuild?.components[type] ? 'primary.main' : undefined 
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {label}
                </Typography>
                
                {currentBuild?.components[type] ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      {currentBuild.components[type]?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${currentBuild.components[type]?.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        size="small" 
                        onClick={() => handleOpenDialog(type)}
                      >
                        Change
                      </Button>
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={() => removeComponent(type)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      No {label} selected
                    </Typography>
                    <Button 
                      sx={{ mt: 1 }} 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleOpenDialog(type)}
                    >
                      Add {label}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
        
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6">
            Total: ${currentBuild?.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      
      {/* Component Selection Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Select {componentTypes.find(c => c.type === selectedType)?.label}
        </DialogTitle>
        <DialogContent>
          <List>
            {filteredComponents.map((component, index) => (
              <div key={component.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleSelectComponent(component)}>
                    <ListItemText 
                      primary={component.name} 
                      secondary={`${component.brand} • $${component.price.toFixed(2)}`} 
                    />
                  </ListItemButton>
                </ListItem>
                {index < filteredComponents.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PcBuilder;