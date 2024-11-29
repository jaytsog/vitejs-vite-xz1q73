import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useScoring } from '../../contexts/ScoringContext';

const ScoreDisplay = () => {
  const { calculateTotalScore } = useScoring();
  const totalScore = calculateTotalScore();

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        p: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        zIndex: 1000,
        borderRadius: 2,
        minWidth: 120,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">Score: {totalScore.toFixed(2)}</Typography>
    </Paper>
  );
};

export default ScoreDisplay;