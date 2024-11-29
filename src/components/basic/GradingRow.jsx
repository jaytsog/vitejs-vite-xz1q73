import React from 'react';
import { Box, Typography } from '@mui/material';
import GradeBox from './GradeBox';
import CommentButton from '../comments/CommentButton';

const GradingRow = ({ label, points, index, disabled }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 1,
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.04)',
      },
    }}
  >
    <Typography variant="body1" sx={{ flex: 1 }}>
        {label}
        <CommentButton sectionId={`basic-${index}`} label={label} />
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <GradeBox
        points={points}
        index={index}
        disabled={disabled}
      />
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
        ({disabled ? 'N/A' : `${points} pts`})
      </Typography>
    </Box>
  </Box>
);

export default GradingRow;