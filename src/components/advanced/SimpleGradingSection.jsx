import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useScoring } from '../../contexts/ScoringContext';
import CommentButton from '../comments/CommentButton';

const SimpleGradingSection = ({ title, label, stateKey }) => {
  const { advancedGradingStates, updateAdvancedGradingState } = useScoring();
  const state = advancedGradingStates[stateKey];

  const handleClick = () => {
    const newState = (state + 1) % 3;
    updateAdvancedGradingState(stateKey, 0, 0, newState);
  };

  const getBoxClass = () => {
    if (state === 1) return 'grade-box full';
    if (state === 2) return 'grade-box half';
    return 'grade-box';
  };

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
        {title} <CommentButton sectionId={`simple-${stateKey}`} label={title} />
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ minWidth: '120px' }}>{label}</Typography>
        <div
          className={getBoxClass()}
          onClick={handleClick}
          role="button"
          tabIndex="0"
        />
      </Box>
    </Paper>
  );
};

export default SimpleGradingSection;