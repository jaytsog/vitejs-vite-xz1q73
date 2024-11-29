import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import Section from '../components/basic/Section';
import { gradingData } from '../data/GradingData';
import ScoreDisplay from '../components/shared/ScoreDisplay';

const GradingContainer = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Basic Grading Calculator
        </Typography>
        {gradingData.sections.map((section, idx) => (
          <Section
            key={idx}
            title={section.title}
            rows={section.rows}
            subsections={section.subsections}
          />
        ))}
      </Paper>
      <ScoreDisplay />
    </Container>
  );
};

export default GradingContainer;