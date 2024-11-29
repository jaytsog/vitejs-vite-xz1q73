import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import GradingSection from '../components/advanced/GradingSection';
import SimpleGradingSection from '../components/advanced/SimpleGradingSection';
import ScoreDisplay from '../components/shared/ScoreDisplay';

const AdvancedGrading = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Advanced Grading Calculator
        </Typography>

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
          <Typography variant="h5" sx={{ mb: 3 }}>
            Documentation
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
          </Box>
        </Paper>
      </Paper>
      <ScoreDisplay />
    </Container>
  );
};

export default AdvancedGrading;
