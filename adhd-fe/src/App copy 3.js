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
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // State to track if answer is submitted


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
  const handleButtonClick = async () => {
    try {
      // const videoPath = './2-Minute Neuroscience_ Autism.mp4';
      const videoPath = '/Users/rishabhshah/Desktop/GenAIGit/DukeGenAI2023/adhd-fe/src/2-Minute Neuroscience_ Autism.mp4';
  
      // Send a GET request with video_path as a parameter
      // const transcribed_video_text = await fetch(`http://127.0.0.1:8000/transcribe?video_path=${encodeURIComponent(videoPath)}`);

      const transcribed_video_text = {
          "text": "Autism, also known as autism spectrum disorder, is characterized by symptoms that include impairments in social communication and interaction, and restricted in repetitive behaviors. Although the neuroscience of autism is still poorly understood, autism is considered to be a complex developmental disorder that involves atypical brain organization starting early in development. Examples with autism often experience a period of unusually rapid brain growth in infancy and early childhood. This accelerated brain growth is linked to an atypical pattern of connectivity between brain regions. A number of studies report that alterations in brain circuitry involve with social interaction and attention can be detected well before the symptoms of autism begin to appear. At this point, however, it's unclear how brain overgrowth and atypical connectivity might be linked to the occurrence of autism symptoms. Research suggests that the risk of autism is strongly influenced by genetics, yet studies consistently report that environmental factors also play a large role. Although a number of potential environmental factors have been identified, the risk factors for autism are far from definitive, and it remains unclear which factors are responsible for causing an increase in autism risk, and which are associated in a non-causal way. The risk factors that are most strongly linked to autism are associated with the prenatal or perinatal period. Thus, it's possible they might be responsible for disruption to typical neural development, leading to symptoms of autism months or years later. How these risk factors might interfere with neural development is still uncertain, but hypotheses have suggested potential mechanisms such as epigenetic effects, inflammation, oxidative stress, or damaged cause by oxygen deficiency. More work needs to be done, however, to fully elucidate the genetic and environmental risk factors for autism, as well as the mechanisms for the development of autism symptoms.",
          "data": {
              "start": {
                  "0": 0,
                  "1": 9.82,
                  "2": 15.26,
                  "3": 19.22,
                  "4": 24.14,
                  "5": 26.78,
                  "6": 31.14,
                  "7": 33.1,
                  "8": 37.06,
                  "9": 38.78,
                  "10": 42.900000000000006,
                  "11": 47.78,
                  "12": 52.2,
                  "13": 56.22,
                  "14": 60.3,
                  "15": 64.5,
                  "16": 68.14,
                  "17": 72.34,
                  "18": 77.66,
                  "19": 81.25999999999999,
                  "20": 83.34,
                  "21": 87.62,
                  "22": 90.82,
                  "23": 94.22,
                  "24": 100.02,
                  "25": 103.82,
                  "26": 107.34
              },
              "end": {
                  "0": 9.82,
                  "1": 15.26,
                  "2": 19.22,
                  "3": 24.14,
                  "4": 26.78,
                  "5": 31.14,
                  "6": 33.1,
                  "7": 37.06,
                  "8": 38.78,
                  "9": 42.900000000000006,
                  "10": 47.78,
                  "11": 52.2,
                  "12": 56.22,
                  "13": 60.3,
                  "14": 64.5,
                  "15": 68.14,
                  "16": 72.34,
                  "17": 77.66,
                  "18": 81.25999999999999,
                  "19": 82.86,
                  "20": 87.62,
                  "21": 90.82,
                  "22": 94.22,
                  "23": 100.02,
                  "24": 103.82,
                  "25": 107.34,
                  "26": 111.66
              },
              "text": {
                  "0": "Autism, also known as autism spectrum disorder, is characterized by symptoms that include impairments",
                  "1": "in social communication and interaction, and restricted in repetitive behaviors.",
                  "2": "Although the neuroscience of autism is still poorly understood, autism is considered to",
                  "3": "be a complex developmental disorder that involves atypical brain organization starting early",
                  "4": "in development.",
                  "5": "Examples with autism often experience a period of unusually rapid brain growth in infancy",
                  "6": "and early childhood.",
                  "7": "This accelerated brain growth is linked to an atypical pattern of connectivity between",
                  "8": "brain regions.",
                  "9": "A number of studies report that alterations in brain circuitry involve with social interaction",
                  "10": "and attention can be detected well before the symptoms of autism begin to appear.",
                  "11": "At this point, however, it's unclear how brain overgrowth and atypical connectivity",
                  "12": "might be linked to the occurrence of autism symptoms.",
                  "13": "Research suggests that the risk of autism is strongly influenced by genetics, yet studies",
                  "14": "consistently report that environmental factors also play a large role.",
                  "15": "Although a number of potential environmental factors have been identified, the risk factors",
                  "16": "for autism are far from definitive, and it remains unclear which factors are responsible",
                  "17": "for causing an increase in autism risk, and which are associated in a non-causal way.",
                  "18": "The risk factors that are most strongly linked to autism are associated with the prenatal",
                  "19": "or perinatal period.",
                  "20": "Thus, it's possible they might be responsible for disruption to typical neural development,",
                  "21": "leading to symptoms of autism months or years later.",
                  "22": "How these risk factors might interfere with neural development is still uncertain, but",
                  "23": "hypotheses have suggested potential mechanisms such as epigenetic effects, inflammation, oxidative",
                  "24": "stress, or damaged cause by oxygen deficiency.",
                  "25": "More work needs to be done, however, to fully elucidate the genetic and environmental",
                  "26": "risk factors for autism, as well as the mechanisms for the development of autism symptoms."
              }
          }
      }
      // Convert the object to a JSON string
      const transcribedVideoTextJSON = JSON.stringify(transcribed_video_text.text);

      const transcribeddataframe= JSON.stringify(transcribed_video_text.data);


      // Encode the JSON string for URL usage
      const encodedTranscribedVideoText = encodeURIComponent(transcribedVideoTextJSON);
      
      const encodedtranscribeddataframe = encodeURIComponent(transcribeddataframe);


      // const videosegments = await fetch(`http://127.0.0.1:8000/segment_transcript?text=${encodedTranscribedVideoText}`);

      const videosegments = {
        "1: Introduction to Autism": "Autism, also known as autism spectrum disorder, is characterized by symptoms that include impairments in social communication and interaction, and restricted in repetitive behaviors. Although the neuroscience of autism is still poorly understood, autism is considered to be a complex developmental disorder that involves atypical brain organization starting early in development.",
        "2: Brain Growth and Connectivity in Autism": "Examples with autism often experience a period of unusually rapid brain growth in infancy and early childhood. This accelerated brain growth is linked to an atypical pattern of connectivity between brain regions. A number of studies report that alterations in brain circuitry involved with social interaction and attention can be detected well before the symptoms of autism begin to appear. However, it remains unclear how brain overgrowth and atypical connectivity might be linked to the occurrence of autism symptoms.",
        "3: Genetic and Environmental Factors": "Research suggests that the risk of autism is strongly influenced by genetics, yet studies consistently report that environmental factors also play a large role. Although a number of potential environmental factors have been identified, the risk factors for autism are far from definitive, and it remains unclear which factors are responsible for causing an increase in autism risk, and which are associated in a non-causal way. The risk factors that are most strongly linked to autism are associated with the prenatal or perinatal period. Thus, it's possible they might be responsible for disruption to typical neural development, leading to symptoms of autism months or years later.",
        "4: Potential Mechanisms": "How these risk factors might interfere with neural development is still uncertain, but hypotheses have suggested potential mechanisms such as epigenetic effects, inflammation, oxidative stress, or damage caused by oxygen deficiency.",
        "5: Future Research": "More work needs to be done to fully elucidate the genetic and environmental risk factors for autism, as well as the mechanisms for the development of autism symptoms."
      }
      const videosegmentsdict = encodeURIComponent(JSON.stringify(videosegments));

      const contentanalyeriniturlvar = `http://127.0.0.1:8000/contentanalyerinit?dataframe=${encodedtranscribeddataframe}&sections_dict=${videosegmentsdict}`;
      const noresponse = await fetch(contentanalyeriniturlvar);
      
      

      const second = 69;
      
      var sectionbysecond = await fetch(`http://127.0.0.1:8000/find_section_by_second?second=${second}`);
      sectionbysecond = encodeURIComponent(JSON.stringify(sectionbysecond));


      // const generate_questions_responce = await fetch(`http://127.0.0.1:8000/generate_questions?second=${second}`);
      const response = await fetch(`http://127.0.0.1:8000/generate_questions?section_content=${sectionbysecond}`);

      
      

      






      

      // const response = await fetch(`http://127.0.0.1:8000/create_summary?text=${secctionbysecond}`);




      // const response = ''
      // const response = await fetch(`http://127.0.0.1:8000/get_timestamp`);
      



      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to initiate transcription:', response.statusText);
      }
    } catch (error) {
      console.error('Error initiating transcription:', error);
    }
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webCamRef.current && videoRef.current) {
        const video = videoRef.current;
        const currentTime = video.currentTime;
        console.log(currentTime);
        
        // Send the currentTime to the Python backend
        sendTimestampToBackend(currentTime);
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
    
          
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Click Me
      </Button>
    </Container>
  );
}


export default App;
