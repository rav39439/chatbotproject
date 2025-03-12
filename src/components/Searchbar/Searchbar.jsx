import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setLoading(true); // Start loader
      setFile(uploadedFile);

      const reader = new FileReader();

      reader.onload = (event) => {
        setFileContent(event.target.result);
        // setSearchTerm(event.target.result);
        setLoading(false); // Stop loader once done
      };

      reader.onerror = () => {
        console.error('Error reading file');
        setLoading(false);
      };

      reader.readAsText(uploadedFile);
    }
  };

  const handleSearchClick = async() => {
    if((fileContent=='') || (searchTerm=='') || (fileContent==null)){
      alert("Please enter a search term or upload document file in txt format")  
      return
    }
  
    let body={
        searchTerm:searchTerm,
        fileContent:fileContent,
        currentUser:props.currentUser.user._id
    }

    try {
        const response = await axios.post('https://samplechatbot.onrender.com/ask', {
          question:body.searchTerm,
          context:body.fileContent,
          userid:body.currentUser
        });
        props.onSearch(response.data);   
  
       
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        // Handle error (e.g., display error message)
      }
    

    // Add your search logic here
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: 800,
        backgroundColor: 'white',
        padding: 1,
        borderRadius: 12,
        boxShadow: '0 -2px 12px rgba(0,0,0,0.1)',
      }}
    >
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
        fullWidth
        margin="none"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                component="label"
                sx={{
                  color: '#1976d2',
                  '&:hover': { color: '#1565c0' },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <UploadFileIcon fontSize="large" />
                )}
                <input type="file" hidden onChange={handleFileUpload} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearchClick}
                sx={{
                  color: '#1976d2',
                  '&:hover': { color: '#1565c0' },
                }}
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '30px',
            height: '60px',
            fontSize: '18px',
          },
        }}
      />

      {/* File Preview */}
      {file && !loading && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {/* Uploaded */}
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;