// src/pages/CombinedGradingView.jsx
import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Section from '../components/basic/Section';
import GradingSection from '../components/advanced/GradingSection';
import SimpleGradingSection from '../components/advanced/SimpleGradingSection';
import ScoreDisplay from '../components/shared/ScoreDisplay';
import { gradingData } from '../data/GradingData';
import { useFirebase } from '../contexts/FirebaseContext';

const CombinedGradingView = () => {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { studentData, loadStudentData, currentInstructor } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!studentName) {
        navigate('/');
        return;
      }

      try {
        await loadStudentData(decodeURIComponent(studentName));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, [studentName, navigate, loadStudentData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Return to Student Selection
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 8 }}>
      {/* Student Info Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>{studentName}</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Instructor: {currentInstructor}
        </Typography>
        {studentData?.documentUrl && (
          <Button 
            variant="outlined" 
            onClick={() => window.open(studentData.documentUrl, '_blank')}
          >
            Open Student Document
          </Button>
        )}
      </Paper>

      {/* Basic Grading Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Patient Assessment</Typography>
        {gradingData.sections.map((section, idx) => (
          <Section
            key={idx}
            title={section.title}
            rows={section.rows}
            subsections={section.subsections}
          />
        ))}
      </Paper>

      {/* Advanced Grading Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Clinical Application & Documentation</Typography>
        
        <GradingSection
          title="Pathophysiology"
          labels={['Pathway 1', 'Pathway 2', 'Pathway 3']}
          stateKey="patho"
          maxScore={15}
        />

        <GradingSection
          title="Field Diagnosis"
          labels={['Step 1', 'Step 2', 'Step 3']}
          stateKey="diagnosis"
          maxScore={15}
        />

        <GradingSection
          title="Treatment & Interventions"
          labels={['Tx']}
          stateKey="treatment"
          maxScore={10}
        />

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>Documentation</Typography>

          <GradingSection
            title="Narrative"
            labels={['Narrative']}
            stateKey="narrative"
            maxScore={10}
          />

          <GradingSection
            title="Radio Report"
            labels={['Radio Report']}
            stateKey="radio"
            maxScore={10}
          />

          <SimpleGradingSection
            title="Drug Cards"
            label="Drug Cards"
            stateKey="drugCards"
          />

          <SimpleGradingSection
            title="Format & Resources"
            label="Format & Resources"
            stateKey="format"
          />
        </Paper>
      </Paper>

      <ScoreDisplay />
    </Box>
  );
};

export default CombinedGradingView;