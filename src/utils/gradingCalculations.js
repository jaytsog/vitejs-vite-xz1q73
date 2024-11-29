export const calculateRubricScore = (scores, maxScore) => {
  const scorePerPoint = maxScore / (scores.length - 1); // Subtract 1 for the '0' column
  let totalScore = 0;
  let highestActive = -1;

  // Find highest active score
  for (let i = 0; i < scores.length - 1; i++) {
    if (scores[i] > 0) {
      highestActive = i;
      break;
    }
  }

  if (highestActive >= 0) {
    // Calculate score based on highest active and its state
    for (let i = scores.length - 2; i >= highestActive; i--) {
      totalScore += scores[i] === 1 ? scorePerPoint : scores[i] === 2 ? scorePerPoint / 2 : 0;
    }
  }

  return totalScore;
};

export const getMaxScoreForSection = (section) => {
  const scoreMappings = {
    patho: 15,
    diagnosis: 15,
    treatment: 10,
    narrative: 10,
    radio: 10
  };
  return scoreMappings[section] || 5; // Default to 5 for simple sections
};