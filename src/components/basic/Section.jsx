import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import GradingRow from './GradingRow';

const Section = ({ title, rows, subsections }) => {
  const specialSubsections = [
    'Signs & Symptoms',
    'Head',
    'Neck',
    'Chest',
    'Abdomen',
    'Pelvis',
    'Right Leg',
    'Left Leg',
    'Right Arm',
    'Left Arm',
    'Posterior',
  ];

  const isSpecialSubsection = specialSubsections.includes(title);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            pb: 1,
            borderBottom: isSpecialSubsection ? '1px solid' : '2px solid',
            borderColor: isSpecialSubsection ? 'grey.400' : 'primary.main',
            backgroundColor: isSpecialSubsection ? 'grey.100' : 'transparent',
            px: isSpecialSubsection ? 2 : 0,
            py: isSpecialSubsection ? 1 : 0,
            borderRadius: isSpecialSubsection ? 1 : 0,
            fontSize: isSpecialSubsection ? '1rem' : '1.25rem',
            textAlign: isSpecialSubsection ? 'left' : 'center',
            fontWeight: '600'
          }}
        >
          {title}
        </Typography>
        {rows?.map((row, idx) => (
          <GradingRow
            key={idx}
            label={row.label}
            points={row.points}
            index={row.index}
            disabled={row.disabled}
          />
        ))}
        {subsections?.map((subsection, idx) => (
          <Box key={idx} sx={{ mt: 2 }}>
            <Section
              title={subsection.title}
              rows={subsection.rows}
              subsections={subsection.subsections}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default Section;