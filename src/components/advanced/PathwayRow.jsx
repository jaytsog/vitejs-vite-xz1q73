import React from 'react';
import { Box, Typography } from '@mui/material';
import { useScoring } from '../../contexts/ScoringContext';
import CommentButton from '../comments/CommentButton';

const PathwayRow = ({ section, rowIndex, label, maxScore }) => {
  const { advancedGradingStates, updateAdvancedGradingState } = useScoring();
  const scores = advancedGradingStates[section][rowIndex].scores;

  const handleBoxClick = (scoreIndex) => {
    const currentState = scores[scoreIndex];
    const newState = (currentState + 1) % 3;
    updateAdvancedGradingState(section, rowIndex, scoreIndex, newState);
  };

  const getBoxClass = (score) => {
    if (score === 1) return 'grade-box full';
    if (score === 2) return 'grade-box half';
    return 'grade-box';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Typography sx={{ minWidth: '120px', display: 'flex', alignItems: 'center' }}>
        {label}
        <CommentButton sectionId={`${section}-${rowIndex}`} label={label} />
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {[3, 2, 1, 0].map((value, idx) => (
          <div key={idx} className="score-column">
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block' }}>
              {value}
            </Typography>
            <div
              className={getBoxClass(scores[idx])}
              onClick={() => handleBoxClick(idx)}
              role="button"
              tabIndex="0"
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default PathwayRow;