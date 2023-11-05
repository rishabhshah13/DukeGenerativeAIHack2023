import openai
import os
import streamlit as st

from lib.transcription import Whisper
from lib.segmentation import ContentAnalyzer, TranscriptSegmenter
from streamlit_javascript import st_javascript

VIDEO_PATH = 'data/2-Minute Neuroscience_ Autism.mp4'

# Set your API key directly (not recommended for security reasons)
openai.api_key = os.getenv('OPENAI_API_KEY')

if openai.api_key is None:
    raise ValueError("The OPENAI_API_KEY is not set.")

# Streamlit page configuration
st.set_page_config(page_title="Attention Assistant")
st.title("Video")

video_timestamp_component = st.components.v1.declare_component("video_timestamp_component", url="http://localhost:8501")


video_file = open(VIDEO_PATH, 'rb')
video_bytes = video_file.read()

st.video(video_bytes)

# Call OpenAI API upon button click
if st.button('Render'):
    try:
        transcriber = Whisper(VIDEO_PATH)
        transcript = transcriber.transcribe()

        segmenter = TranscriptSegmenter()
        transcript_segments = segmenter.segment_transcript(transcript['text'])

        analyzer = ContentAnalyzer(transcript['data'], transcript_segments)

        if transcript_segments is not None:
            # Display each section
            for title in transcript_segments:
                st.subheader(title)
                st.write(transcript_segments[title])

        else:
            st.error("Error: No response from the API.")
        
    except Exception as e:
        st.error(f"An error occurred: {e}")



if st.button("I'm distracted.", key="distraction"):
    try:
        # Use the custom component's return value to receive the timestamp
        js_code = """
        function getCurrentTime() {
            var video = document.getElementsByClassName("stVideo")[0]; // Assuming there is only one element with the class "stVideo"
            console.log(video.currentTime);
            return video.currentTime;
        }
        var timestamp = getCurrentTime();
        """
        js_code_2 = '(document.getElementsByClassName("stVideo")[0]).currentTime'
        currentTimestamp = st_javascript(js_code_2, key="timestamp")

        # timestamp_value = st.components.v1.html(js_code, height=0)
        print(f"Current timestamp: {currentTimestamp}")

        # Display the timestamp in Streamlit
        st.write("Current Timestamp:", currentTimestamp, "seconds")
        # current_section = analyzer.find_section_by_second(timestamp_data['timestamp'])
        # question_list = analyzer.generate_questions(current_section[1])
        # st.write(question_list[0])


    except Exception as e:
        st.error(f"An error occurred: {e}")