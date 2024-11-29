import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useComments } from '../../hooks/useComments';
import { useApp } from '../../contexts/AppContext';
import { formatDate } from '../../utils/dateUtils';

const CommentDialog = ({ open, onClose, sectionId, label, studentId }) => {
  const [comment, setComment] = useState('');
  const { currentInstructor } = useApp();
  const { comments, isLoading, addComment } = useComments(studentId, sectionId);

  const handleSave = async () => {
    if (comment.trim()) {
      const success = await addComment(comment.trim(), currentInstructor);
      if (success) {
        setComment('');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Comments for {label}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Add your comment"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {comments?.map((comment) => (
              <ListItem key={comment.id} divider>
                <ListItemText
                  primary={comment.text}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        By {comment.instructor} on {formatDate(comment.created_at)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={!comment.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;