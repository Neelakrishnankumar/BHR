import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import toast from 'react-hot-toast';

const FileUploadIconButton = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.includes('image') || file.type === 'application/pdf')) {
      onFileSelect(file);
    } else {
      toast.error('Only image and PDF files are allowed.');
    }
  };

  return (
    <Tooltip title="Upload File (Image or PDF)">
      <IconButton color="primary" component="label">
        <UploadFileIcon />
        <input
          type="file"
          accept="image/*,application/pdf"
          hidden
          onChange={handleFileChange}
        />
      </IconButton>
    </Tooltip>
  );
};

export default FileUploadIconButton;
