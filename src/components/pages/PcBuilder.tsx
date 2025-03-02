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
  Divider,
  Chip,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import { useBuildContext } from '../../contexts/BuildContext';
import { mockComponents } from '../../data/mockComponents';
import { Component, ComponentType } from '../../models/Component';
import CompatibilityChecker from '../pc-builder/CompatibilityChecker';
import ComponentDetail from '../pc-builder/ComponentDetail';

const PcBuilder = () => {
  const { currentBuild, addComponent, removeComponent } = useBuildContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<ComponentType>('cpu');
  const [tabValue, setTabValue] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  
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
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
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
                borderColor: currentBuild?.components[type] ? 'primary.main' : undefined,
                cursor: currentBuild?.components[type] ? 'pointer' : 'default'
              }}
              onClick={() => 
                currentBuild?.components[type] && 
                handleComponentClick(currentBuild.components[type] as Component)
              }
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(type);
                        }}
                      >
                        Change
                      </Button>
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeComponent(type);
                          if (selectedComponent?.type === type) {
                            setSelectedComponent(null);
                          }
                        }}
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
        
        {/* Compatibility Issues Section */}
        <CompatibilityChecker />
        
        {/* Selected Component Details */}
        {selectedComponent && (
          <ComponentDetail component={selectedComponent} />
        )}
      </Paper>
      
      {/* Component Selection Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Select {componentTypes.find(c => c.type === selectedType)?.label}
        </DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="All Components" />
            <Tab label="Compatible" />
          </Tabs>
          
          {filteredComponents.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No {componentTypes.find(c => c.type === selectedType)?.label} components found.
            </Alert>
          )}
          
          <List>
            {filteredComponents.map((component, index) => (
              <div key={component.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleSelectComponent(component)}>
                    <ListItemText 
                      primary={
                        <Typography variant="body1">
                          {component.name}
                        </Typography>
                      } 
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {component.brand} • ${component.price.toFixed(2)}
                          </Typography>
                          <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {getDisplaySpecs(component).map((spec, i) => (
                              <Chip 
                                key={i} 
                                label={`${spec.value}${spec.unit ? spec.unit : ''}`} 
                                size="small" 
                                variant="outlined" 
                              />
                            ))}
                          </Box>
                        </Box>
                      }
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

// Helper function to get important specs for display in the component list
function getDisplaySpecs(component: Component) {
  switch (component.type) {
    case 'cpu':
      return component.specs.filter(spec => 
        ['cores', 'threads', 'baseClock', 'boostClock'].includes(spec.key)
      ).slice(0, 3);
    case 'gpu':
      return component.specs.filter(spec => 
        ['memory', 'coreClock', 'boostClock'].includes(spec.key)
      ).slice(0, 3);
    case 'motherboard':
      return component.specs.filter(spec => 
        ['socket', 'formFactor', 'chipset'].includes(spec.key)
      ).slice(0, 3);
    case 'ram':
      return component.specs.filter(spec => 
        ['capacity', 'speed', 'type'].includes(spec.key)
      ).slice(0, 3);
    case 'storage':
      return component.specs.filter(spec => 
        ['capacity', 'type', 'readSpeed'].includes(spec.key)
      ).slice(0, 3);
    case 'psu':
      return component.specs.filter(spec => 
        ['wattage', 'certification', 'modular'].includes(spec.key)
      ).slice(0, 3);
    case 'case':
      return component.specs.filter(spec => 
        ['formFactor', 'maxGpuLength', 'maxCpuCoolerHeight'].includes(spec.key)
      ).slice(0, 3);
    case 'cooler':
      return component.specs.filter(spec => 
        ['type', 'radiatorSize', 'height'].includes(spec.key)
      ).slice(0, 3);
    default:
      return component.specs.slice(0, 3);
  }
}

export default PcBuilder;