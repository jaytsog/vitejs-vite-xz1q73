import { createContext, useContext, useState, useEffect } from 'react';
import { getStudentData, updateStudentGrading } from '../utils/firebaseUtils';
import { getAllRows } from '../data/GradingData';
import {
  calculateRubricScore,
  getMaxScoreForSection,
} from '../utils/gradingCalculations';

const ScoringContext = createContext();

export const ScoringProvider = ({ children, studentName }) => {
  const [basicGradingStates, setBasicGradingStates] = useState(Array(100).fill(0));
  const [advancedGradingStates, setAdvancedGradingStates] = useState({
    patho: Array(3).fill({ scores: Array(4).fill(0) }),
    diagnosis: Array(3).fill({ scores: Array(4).fill(0) }),
    treatment: Array(1).fill({ scores: Array(4).fill(0) }),
    narrative: Array(1).fill({ scores: Array(4).fill(0) }),
    radio: Array(1).fill({ scores: Array(4).fill(0) }),
    drugCards: 0,
    format: 0,
  });

  // Load initial data from Firebase
  useEffect(() => {
    if (studentName) {
      const loadStudentData = async () => {
        console.log('Loading data for student:', studentName); // Debug log
        const data = await getStudentData(studentName);
        console.log('Loaded data:', data); // Debug log
        if (data) {
          if (data.basicGrading?.states) {
            setBasicGradingStates(data.basicGrading.states);
          }
          if (data.advancedGrading) {
            setAdvancedGradingStates(data.advancedGrading);
          }
        }
      };
      loadStudentData();
    }
  }, [studentName]);

  // Update Firebase whenever states change
  useEffect(() => {
    if (studentName) {
      const updateFirebase = async () => {
        console.log('Saving data for student:', studentName); // Debug log
        console.log('Data to save:', { // Debug log
          basicGrading: { states: basicGradingStates },
          advancedGrading: advancedGradingStates
        });
        try {
          await updateStudentGrading(studentName, {
            basicGrading: { states: basicGradingStates },
            advancedGrading: advancedGradingStates
          });
          console.log('Save successful'); // Debug log
        } catch (error) {
          console.error('Save failed:', error); // Debug log
        }
      };
      updateFirebase();
    }
  }, [basicGradingStates, advancedGradingStates, studentName]);

  const updateBasicGradingState = (index, newState) => {
    const updatedStates = [...basicGradingStates];
    updatedStates[index] = newState;
    setBasicGradingStates(updatedStates);
  };

  const updateAdvancedGradingState = (
    section,
    rowIndex,
    scoreIndex,
    newState
  ) => {
    setAdvancedGradingStates((prev) => {
      const updated = { ...prev };
      if (Array.isArray(updated[section])) {
        const newScores = [...updated[section][rowIndex].scores];

        if (scoreIndex < newScores.length - 1) {
          if (newState === 1) {
            // When clicking 3, fill 3,2,1
            // When clicking 2, fill 2,1
            // When clicking 1, fill only 1
            for (let i = scoreIndex; i < newScores.length - 1; i++) {
              newScores[i] = 1;
            }
            // Clear any numbers above clicked number
            for (let i = 0; i < scoreIndex; i++) {
              newScores[i] = 0;
            }
          } else if (newState === 2) {
            // Half points: make current cell half, keep lower numbers full
            newScores[scoreIndex] = 2;
            // Fill all numbers below clicked number
            for (let i = scoreIndex + 1; i < newScores.length - 1; i++) {
              newScores[i] = 1;
            }
            // Clear higher numbers
            for (let i = 0; i < scoreIndex; i++) {
              newScores[i] = 0;
            }
          } else {
            // Reset: clear all numbers in the row
            for (let i = 0; i < newScores.length; i++) {
              newScores[i] = 0;
            }
          }
        }

        updated[section][rowIndex] = { scores: newScores };
      } else {
        updated[section] = newState;
      }
      return updated;
    });
  };

  const calculateTotalScore = () => {
    // Calculate basic grading score
    const basicScore = basicGradingStates.reduce((sum, state, index) => {
      const points =
        getAllRows().find((row) => row.index === index)?.points || 0;
      return sum + (state === 1 ? points : state === 2 ? points / 2 : 0);
    }, 0);

    // Calculate advanced grading score
    const advancedScore = Object.entries(advancedGradingStates).reduce(
      (sum, [key, value]) => {
        if (Array.isArray(value)) {
          // Handle rubric-style sections
          return (
            sum +
            value.reduce((rowSum, row) => {
              const maxScore = getMaxScoreForSection(key);
              const rowScore = calculateRubricScore(row.scores, maxScore);
              return rowSum + rowScore;
            }, 0)
          );
        } else {
          // Handle simple sections (drugCards, format)
          return sum + (value === 1 ? 5 : value === 2 ? 2.5 : 0);
        }
      },
      0
    );

    return basicScore + advancedScore;
  };

  return (
    <ScoringContext.Provider
      value={{
        basicGradingStates,
        advancedGradingStates,
        updateBasicGradingState,
        updateAdvancedGradingState,
        calculateTotalScore,
      }}
    >
      {children}
    </ScoringContext.Provider>
  );
};

export const useScoring = () => useContext(ScoringContext);

export default ScoringContext;
