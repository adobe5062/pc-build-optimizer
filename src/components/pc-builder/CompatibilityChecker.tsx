// src/components/pc-builder/CompatibilityChecker.tsx
import { 
    Box, 
    Typography, 
    Paper, 
    List, 
    ListItem, 
    ListItemIcon,
    ListItemText,
    Chip,
    Divider
  } from '@mui/material';
  import ErrorIcon from '@mui/icons-material/Error';
  import WarningIcon from '@mui/icons-material/Warning';
  import InfoIcon from '@mui/icons-material/Info';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  
  import { CompatibilityIssue } from '../../models/Component';
  import { useBuildContext } from '../../contexts/BuildContext';
  
  const CompatibilityChecker = () => {
    const { getCompatibilityIssues, currentBuild } = useBuildContext();
    const issues = getCompatibilityIssues();
  
    // If there are no components, show a message
    if (!currentBuild || Object.keys(currentBuild.components).length === 0) {
      return (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Add components to your build to check compatibility.
          </Typography>
        </Paper>
      );
    }
  
    // If there are no issues, show a success message
    if (issues.length === 0) {
      return (
        <Paper 
          sx={{ 
            p: 2, 
            mt: 2, 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: 'success.dark',
            color: 'white'
          }}
        >
          <CheckCircleIcon sx={{ mr: 1 }} />
          <Typography variant="body1">
            All components are compatible!
          </Typography>
        </Paper>
      );
    }
  
    return (
      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Compatibility Check
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip 
              icon={<ErrorIcon />} 
              label={`${issues.filter(i => i.severity === 'error').length} Errors`} 
              color="error" 
              variant={issues.some(i => i.severity === 'error') ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              icon={<WarningIcon />} 
              label={`${issues.filter(i => i.severity === 'warning').length} Warnings`} 
              color="warning" 
              variant={issues.some(i => i.severity === 'warning') ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              icon={<InfoIcon />} 
              label={`${issues.filter(i => i.severity === 'info').length} Info`} 
              color="info" 
              variant={issues.some(i => i.severity === 'info') ? 'filled' : 'outlined'}
              size="small"
            />
          </Box>
        </Box>
        
        <List>
          {issues.map((issue, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  {issue.severity === 'error' && <ErrorIcon color="error" />}
                  {issue.severity === 'warning' && <WarningIcon color="warning" />}
                  {issue.severity === 'info' && <InfoIcon color="info" />}
                </ListItemIcon>
                <ListItemText
                  primary={issue.message}
                  secondary={
                    issue.components && (
                      <Box sx={{ mt: 1 }}>
                        {issue.components.map(comp => (
                          <Chip
                            key={comp}
                            label={comp.toUpperCase()}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 0.5 }}
                          />
                        ))}
                      </Box>
                    )
                  }
                />
              </ListItem>
              {index < issues.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </Paper>
    );
  };
  
  export default CompatibilityChecker;