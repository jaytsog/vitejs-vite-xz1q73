import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { useFirebase } from '../contexts/FirebaseContext';

const StudentSelect = () => {
  const navigate = useNavigate();
  const { currentInstructor, setCurrentInstructor, instructorStudents } = useFirebase();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const instructors = [
    "Jeremiah Hatcher",
    "Ray Cheang",
    "TBD",
    "Norah Powers",
    "Josh Daisy"
  ];

  const handleStudentSelect = (student) => {
    setSelectedStudent(student.id);
    navigate(`/student/${encodeURIComponent(student.name)}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Select Instructor</InputLabel>
          <Select
            value={currentInstructor || ''}
            onChange={(e) => setCurrentInstructor(e.target.value)}
            label="Select Instructor"
          >
            <MenuItem value="">Select Instructor</MenuItem>
            {instructors.map((instructor) => (
              <MenuItem key={instructor} value={instructor}>
                {instructor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {currentInstructor && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Students for {currentInstructor}
          </Typography>
          <Grid container spacing={2}>
            {instructorStudents && instructorStudents.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    bgcolor: selectedStudent === student.id ? 'action.selected' : 'background.paper'
                  }}
                  onClick={() => handleStudentSelect(student)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {student.name}
                    </Typography>
                    {student.documentUrl && (
                      <Button 
                        size="small" 
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(student.documentUrl, '_blank');
                        }}
                      >
                        View Document
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default StudentSelect;