import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import CommentDialog from './CommentDialog';

const CommentButton = ({ sectionId, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add Comment">
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          sx={{ ml: 1 }}
        >
          <CommentIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <CommentDialog
        open={open}
        onClose={() => setOpen(false)}
        sectionId={sectionId}
        label={label}
      />
    </>
  );
};

export default CommentButton;