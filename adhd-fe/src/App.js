import { Container, Button, Grid, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import "./App.css";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import { Box } from "@mui/material";

function App() {
  const webCamRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [openMCQ, setOpenMCQ] = useState(false); // state to control the MCQ popup
  const [selectedOption, setSelectedOption] = useState(''); // state to track the selected MCQ option
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // State to track if answer is submitted

  const [displayText, setDisplayText] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  // const handleButtonClick = () => {
  //   alert("Heyyyy!");
  // };
  // Example function to change the text (if needed)
  const updateText = (text) => {
    setDisplayText(text);
  };


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
    // setOpenMCQ(false); // Close the MCQ popup
    setAnswerSubmitted(true); // Set the answer as submitted
  };

  // Define the MCQ question and options
  const mcqQuestion = "What is the capital of France?";
  const mcqOptions = ["Berlin", "Madrid", "Paris", "Rome"];

  const handleClose = () => {
    // Reset the dialog states
    setAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setSelectedOption('');
    setOpenMCQ(false);
  };

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (webCamRef.current && videoRef.current) {
          const video = videoRef.current;
          const currentTime = video.currentTime;
          console.log(currentTime);
          
          // Send the currentTime to the Python backend
          sendTimestampToBackend(currentTime);
          setCurrentTime(currentTime)
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

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

  const handleButtonClick = async () => {
    setLoading(true); // Start loading
    try {
      // Step 1: Get Video Transcriptions ---------------------------------------------------------------------------------------
      
      const videoPath = '/Users/rishabhshah/Desktop/GenAIGit/DukeGenAI2023/adhd-fe/src/2-Minute Neuroscience_ Autism.mp4';
      const transcribed_video_text_response = await fetch(`http://127.0.0.1:8000/transcribe?video_path=${encodeURIComponent(videoPath)}`);
      
      const transcribed_video_text = await transcribed_video_text_response.json()
      console.log(transcribed_video_text)

      // Convert the object to a JSON string
      const transcribedVideoTextJSON = JSON.stringify(transcribed_video_text.text);
      const transcribeddataframe= JSON.stringify(transcribed_video_text.data);
      updateText(transcribedVideoTextJSON)

      // Encode the JSON string for URL usage
      const encodedTranscribedVideoText = encodeURIComponent(transcribedVideoTextJSON);
      const encodedtranscribeddataframe = encodeURIComponent(transcribeddataframe);

      // Step 2: Get Video Segments ---------------------------------------------------------------------------------------------

      const videosegments_response = await fetch(`http://127.0.0.1:8000/segment_transcript?text=${transcribedVideoTextJSON}`);
      const videosegments = await videosegments_response.json();
      const videosegmentsdict = encodeURIComponent(JSON.stringify(videosegments))
      console.log(videosegments)

      // const videosegmentsdict_response = encodeURIComponent(JSON.stringify(videosegments));
      // const videosegmentsdict = await videosegmentsdict_response.json();

      const contentanalyeriniturlvar = `http://127.0.0.1:8000/contentanalyerinit?dataframe=${encodedtranscribeddataframe}&sections_dict=${videosegmentsdict}?seconds=${String(parseInt(23))}`;
      // const noresponse = await fetch(contentanalyeriniturlvar);

      // const noresponse = await fetch(contentanalyeriniturlvar,
      //   { method: 'GET', 
      //   mode: 'no-cors',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   });
      const noresponse = await fetch(contentanalyeriniturlvar, {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
      
      // const sectionbysecond_response = await fetch(`http://127.0.0.1:8000/find_section_by_second?second=${String(parseInt(23))}`,{
      //   method: 'GET', 
      //   mode: 'no-cors',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // setLoading(false);
      
      // Step 2: Look for distraction -------------------------------------------------------------------------------------------
      
      // const user_distracted_response = await fetch(`http://127.0.0.1:8000/track_gaze`)
      // const user_distracted = await user_distracted_response.json()

      // console.log(user_distracted)
      // if (user_distracted.distracted) {
      //   // const second_response = await fetch(`http://127.0.0.1:8000/update_timestamp`);
      //   // const second = await second_response.json()
      //   const detectedTime = videoRef.current.currentTime;
      //   setCurrentTime(detectedTime)
      //   console.log('TIME DETECTED   ' + detectedTime)
      //   // Step 3: Get Section in which user was Distracted ------------------------------------------------------------------------
      //   // const second = 69;
        
      //   const sectionbysecond_response = await fetch(`http://127.0.0.1:8000/find_section_by_second?second=${String(parseInt(detectedTime))}`);
      //   // const sectionbysecond = await sectionbysecond_response.json();
      //   console.log(sectionbysecond_response);
      //   const sectionbysecond = encodeURIComponent(JSON.stringify(sectionbysecond_response));

      //   // Step 4: Generate Questions ----------------------------------------------------------------------------------------------
      //   // const generate_questions_responce = await fetch(`http://127.0.0.1:8000/generate_questions?second=${currentTime}`);
      //   const questions_response = await fetch(`http://127.0.0.1:8000/generate_questions?section_content=${sectionbysecond}`);
      //   const questions = await questions_response.json()
      //   console.log(questions)


      // } 
      
      


      

      // const summary = await fetch(`http://127.0.0.1:8000/create_summary?text=${sectionbysecond}`);


      // const response = ''
      // const response = await fetch(`http://127.0.0.1:8000/get_timestamp`);
      
     } catch (error) {
      console.error("Error sending timestamp:", error);
    }};

  // const sendTimestampToBackend = async (timestamp) => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/update_timestamp', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ timestamp }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.message);
  //     } else {
  //       console.error('Failed to send timestamp to the backend');
  //     }
  //   } catch (error) {
  //     console.error('Error sending timestamp:', error);
  //   }
  // };

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

      {/* <Box display="flex" justifyContent="flex-end" mb={2}>
      <Button variant="contained" color="primary" onClick={handleOpenMCQPopup}>
        Take MCQ
      </Button>
      </Box> */}


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
        {!answerSubmitted ? (
          // Show these buttons only if the answer has not been submitted
          <>
            <Button onClick={handleCloseMCQPopup} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitMCQ} color="primary">
              Submit
            </Button>
          </>
        ) : (
          // Show close button only after the answer is submitted
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
    

      <Button variant="contained" color="primary" >
        Upload Video
      </Button>

      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Process Video
      </Button>

      {/* <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={updateText}>
          Update Text
        </Button>
      </Box> */}

      {/* Display text from variable beneath the button */}
      <Typography variant="h6">
        {displayText}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      

      

    </Container>
  );
}


export default App;
