import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { useFirebase } from '../../contexts/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { currentInstructor, setCurrentInstructor } = useFirebase();

  const instructors = [
    'Jeremiah Hatcher',
    'Ray Cheang',
    'TBD',
    'Norah Powers',
    'Josh Daisy',
  ];

  const handleInstructorChange = (event) => {
    setCurrentInstructor(event.target.value);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Grading Calculator
        </Typography>
        <Box sx={{ minWidth: 200 }}>
          <Select
            value={currentInstructor || ''}
            onChange={handleInstructorChange}
            sx={{
              color: 'white',
              '& .MuiSelect-icon': { color: 'white' },
              '& .MuiSelect-select': { py: 1 },
            }}
            variant="standard"
            displayEmpty
          >
            <MenuItem value="">Select Instructor</MenuItem>
            {instructors.map((instructor) => (
              <MenuItem key={instructor} value={instructor}>
                {instructor}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
