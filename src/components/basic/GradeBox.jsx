import React from 'react';
import { useScoring } from '../../contexts/ScoringContext';

const GradeBox = ({ points, index, disabled }) => {
  const { basicGradingStates, updateBasicGradingState } = useScoring();
  const state = basicGradingStates[index] || 0;

  const handleClick = () => {
    if (disabled) return;
    const newState = (state + 1) % 3;
    updateBasicGradingState(index, newState);
  };

  const getClass = () => {
    if (disabled) return 'grade-box na';
    if (state === 1) return 'grade-box full';
    if (state === 2) return 'grade-box half';
    return 'grade-box';
  };

  return (
    <div
      className={getClass()}
      data-points={points}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      {disabled ? 'N/A' : ''}
    </div>
  );
};

export default GradeBox;