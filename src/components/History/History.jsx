import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useState } from 'react'; 
import axios from 'axios';

const History = () => {

    const [history, setHistory] = useState([
        { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
        { question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code within React components.' },
      ]);
      useEffect(() => {
        let userdata = JSON.parse(localStorage.getItem('Profile'));
        console.log(userdata.user._id)

        const fetchHistory = async () => {
          try {
            if (!userdata || !userdata.user?._id) {
              console.error('Invalid user data');
              return;
            }
    
            const response = await axios.get(`http://localhost:5000/getTasks`, {
              params: { userid: userdata.user._id }
            });
    
            // Pass the data to the parent component or handle it
            //props.onSearch(response.data);
            console.log(response.data)
           let mapped=response.data.tasks.map((d)=>({question:d.question,answer:d.text})) 
            console.log(history)
            setHistory([...history,...mapped]);
    
          } catch (error) {
            console.error('Login failed:', error);
          }
        };
    
        fetchHistory(); // Call the async function
      }, []); // Empty dependency array to run only once
    
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '20px auto',
        padding: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxHeight: 700,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Chat History
      </Typography>

      <List>
        {history.map((entry, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Q: ${entry.question}`}
                secondary={`A: ${entry.answer}`}
              />
            </ListItem>
            {index < history.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default History;
