from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# from lib.apis import *

from lib.segmentation import TranscriptSegmenter, ContentAnalyzer
from lib.summarizer import Summarizer
from lib.transcription import Whisper
import openai

# gaze tracking
import cv2
from gaze_tracking.gaze_tracking import GazeTracking

gaze = GazeTracking()
cap = cv2.VideoCapture(0)



app = FastAPI()
# Define CORS policies
transcript_segmenter = TranscriptSegmenter(model="gpt-3.5-turbo", temperature=0)
origins = ["http://localhost:3000"]
 

# Define the environment variable name and value
# env_variable_name = "OPENAI_API_KEY"
# env_variable_value = "ADD KEY HERE"
import os

# Set the environment variable
# os.environ[env_variable_name] = env_variable_value

# Set your API key directly (not recommended for security reasons)
openai.api_key = "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"
summarizer_object = Summarizer(openai.api_key)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/hello/{name}')
def hello_name(name: str):
    return f'Hello {name}!'


# Define a route
@app.get("/")
def read_root():
    return {"message": "Hello, World"}

# Define a route
@app.get("/get_timestamp")
def read_root():
    return {"message": "Hello, World"}

@app.get("/segment_transcript")
def segment_transcript(text: str):
    print("#"*100)
    print(text)
    print("#"*100)
    try:
        result = transcript_segmenter.segment_transcript(text)

        if result:
            return result
        else:
            return {"error": "an error occured while processing the data"}
    except Exception as e:
        return {"error":f"An Error occured: {e}"}


@app.get("/contentanalyerinit")
def contentanalyerinit(dataframe, sections_dict,seconds):
    global content_analyzer
    content_analyzer = ContentAnalyzer(dataframe, sections_dict,str(openai.api_key))
    print("*"*100)
    section_title, content = content_analyzer.find_section_by_second(seconds) 
    return section_title, content


@app.get("/find_section_by_second")
def find_section_by_second(second: int):
    
    # sections_dict = transcript_segmenter.sections_dict

    # content_analyzer = ContentAnalyzer(dataframe, sections_dict)

    section_title, content = content_analyzer.find_section_by_second(second) 

    return section_title, content


@app.get("/generate_questions/")
async def generate_questions(section_content):
    try:
        # sections_dict = transcript_segmenter.sections_dict

        # if sections_dict is None:
        #     print("Create segments of the Material First!")

        questions = content_analyzer.generate_questions(section_content)
        print("?"*100)
        return questions
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@app.get("/transcribe")
async def transcribe_api(video_path):
    # print(video_path)
    # print("*"*1000)
    print(os.path.isfile(video_path))

    whisper_obj = Whisper(video_path)
    transcription = whisper_obj.transcribe()
    return transcription


@app.post("/create_summary")
async def create_summary(text):
    
    try:
        summarized_text = summarizer_object.create_summary(text)
        return summarized_text
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
    

@app.post('/upload/image/')
async def upload_image(image: UploadFile):
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes)).convert('L')
    img.show()
    return {"data": "whatever"}

@app.post('/update_timestamp')
async def update_timestamp(data: dict):
    # Process the data as needed
    # You can save it to a database or perform any other desired actions
    print(data)

    # Create a response with a JSON message
    response = {"message": "Timestamp received and processed"}

    # Return the response with appropriate CORS headers
    return response


@app.get('/track_gaze')
async def track_gaze():
    while True:
        # Read a frame from the video stream
        ret, frame = cap.read()

        if not ret:
            break

        # Refresh the GazeTracking instance with the frame
        gaze.refresh(frame)

        if gaze.is_distracted():
            return {"distracted": True}

        annotated_frame = gaze.annotated_frame()
        cv2.imshow("Gaze Tracking", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break


# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
