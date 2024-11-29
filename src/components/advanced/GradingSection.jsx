import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PathwayRow from './PathwayRow';

const GradingSection = ({ title, labels, stateKey, maxScore }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          pb: 1,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {(title === 'Pathophysiology' || title === 'Field Diagnosis') ? (
          // Custom rendering for specific sections
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            {/* Render labels in a vertical column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {labels.map((label, index) => (
                <Typography key={index}>{label}</Typography>
              ))}
            </Box>
            {/* Render a single grading row */}
            <Box>
              <PathwayRow
                section={stateKey}
                rowIndex={0} // Single grading box for these sections
                label="" // No label for the grading box
                maxScore={maxScore}
              />
            </Box>
          </Box>
        ) : (
          // Default rendering for other sections
          labels.map((label, index) => (
            <PathwayRow
              key={index}
              section={stateKey}
              rowIndex={index}
              label={label}
              maxScore={maxScore}
            />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default GradingSection;
