import { Container, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import "./App.css";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import { Box } from "@mui/material";

function App() {
  const webCamRef = useRef(null);
  const videoRef = useRef(null);
  const [openMCQ, setOpenMCQ] = useState(false); // state to control the MCQ popup
  const [selectedOption, setSelectedOption] = useState(''); // state to track the selected MCQ option
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // const handleButtonClick = () => {
  //   alert("Heyyyy!");
  // };

  // Function to handle opening the MCQ popup
  const handleOpenMCQPopup = () => {
    setOpenMCQ(true);
  };  

  // Function to handle closing the MCQ popup
  const handleCloseMCQPopup = () => {
    setOpenMCQ(false);
  };

  // Function to handle MCQ option change
  const handleMCQChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle MCQ submission
  const handleSubmitMCQ = () => {
    // Check if the selected answer is correct
    if (selectedOption === "Paris") {
      setIsAnswerCorrect(true); // Correct answer
    } else {
      setIsAnswerCorrect(false); // Incorrect answer
    }
    setOpenMCQ(false); // Close the MCQ popup
  };

  // Define the MCQ question and options
  const mcqQuestion = "What is the capital of France?";
  const mcqOptions = ["Berlin", "Madrid", "Paris", "Rome"];


  const sendTimestampToBackend = async (timestamp) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update_timestamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Failed to send timestamp to the backend');
      }
    } catch (error) {
      console.error('Error sending timestamp:', error);
    }
  };

  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <Grid container spacing={5} style={{ marginTop: 32 }}>
        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          style={{ marginRight: window.innerWidth / 10 }}
        >
          <video
            ref={videoRef} // Add a ref to the video element
            controls
            autoPlay
            loop
            muted
            src={require("./2-Minute Neuroscience_ Autism.mp4")} // You need to use require to specify the video source correctly
            style={{
              width: window.innerWidth / 2.5,
              height: window.innerHeight / 2.5,
            }}
          />
        </Grid>

        <Grid item xs={5} md={5} lg={5}>
          <Webcam
            ref={webCamRef}
            imageSmoothing={true}
            audio={false}
            height={window.innerHeight / 2.5}
            width={window.innerWidth / 2.5}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" mb={2}>
      <Button variant="contained" color="primary" onClick={handleOpenMCQPopup}>
        Take MCQ
      </Button>
    </Box>


    {/* MCQ Popup Dialog */}
    <Dialog open={openMCQ} onClose={handleCloseMCQPopup}>
      <DialogTitle>MCQ Question</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{mcqQuestion}</Typography>
        <RadioGroup name="mcq-options" value={selectedOption} onChange={handleMCQChange}>
          {mcqOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              // Apply conditional styling if the answer is correct and selected
              style={isAnswerCorrect && selectedOption === "Paris" && option === "Paris" ? { color: 'green' } : {}}
            />
          ))}
        </RadioGroup>
        {/* Optionally display feedback */}
        {isAnswerCorrect === false && (
          <Typography color="error">Incorrect answer. Try again!</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseMCQPopup} color="primary">
          Cancel
        </Button>
        {/* Update the onClick event for the Submit button */}
        <Button onClick={handleSubmitMCQ} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
          
      {/* <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Click Me
      </Button> */}
    </Container>
  );
}


export default App;
