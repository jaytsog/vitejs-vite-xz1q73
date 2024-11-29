// src/components/StudentGrading.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box } from '@mui/material';
import { ScoringProvider } from '../contexts/ScoringContext';
import GradingContainer from './GradingContainer';
import AdvancedGrading from './AdvancedGrading';
import { useFirebase } from '../contexts/FirebaseContext';

const StudentGrading = () => {
  const { studentName } = useParams();
  const { studentData } = useFirebase();

  if (!studentData) return <Typography>Loading...</Typography>;

  return (
    <ScoringProvider studentName={studentName}>
      <Container>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {studentName}
        </Typography>

        {studentData.documentUrl && (
          <Paper sx={{ mb: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Student Document
            </Typography>
            <iframe
              src={studentData.documentUrl}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="Student Document"
            />
          </Paper>
        )}

        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <GradingContainer />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AdvancedGrading />
          </Box>
        </Box>
      </Container>
    </ScoringProvider>
  );
};

export default StudentGrading;
