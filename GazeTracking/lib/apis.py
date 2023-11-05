from fastapi import FastAPI
import uvicorn
from lib.segmentation import TranscriptSegmenter, ContentAnalyzer
from lib.summarizer import Summarizer
from lib.transcription import Whisper
import openai
# Create an instance of the FastAPI class
# app = FastAPI()
# transcript_segmenter = TranscriptSegmenter(model="gpt-3.5-turbo", temperature=0)


# Define the environment variable name and value
env_variable_name = "OPENAI_API_KEY"
env_variable_value = "ADD KEY HERE"
import os

# Set the environment variable
os.environ[env_variable_name] = env_variable_value

# Set your API key directly (not recommended for security reasons)
openai.api_key = os.getenv('OPENAI_API_KEY')
summarizer_object = Summarizer(openai.api_key)


# # Define a route
# @app.get("/")
# def read_root():
#     return {"message": "Hello, World"}

# # Define a route
# @app.get("/get_timestamp")
# def read_root():
#     return {"message": "Hello, World"}

# @app.post("/segment_transcript")
# def segment_transcript(text: str):
    
#     try:
#         result = transcript_segmenter.segment_transcript(text)

#         if result:
#             return result
#         else:
#             return {"error": "an error occured while processing the data"}
#     except Exception as e:
#         return {"error":f"An Error occured: {e}"}


# @app.post("/find_section_by_second")
# def find_section_by_second(second: int, dataframe,sections_dict):
    
#     # sections_dict = transcript_segmenter.sections_dict

#     content_analyzer = ContentAnalyzer(dataframe, sections_dict)

#     section_title, content = content_analyzer.find_section_by_second(second) 

#     return section_title, content


# @app.post("/generate_questions/")
# async def generate_questions(section_content, dataframe,sections_dict):
#     try:
#         # sections_dict = transcript_segmenter.sections_dict

#         # if sections_dict is None:
#         #     print("Create segments of the Material First!")

#         content_analyzer = ContentAnalyzer(dataframe, sections_dict)
#         questions = content_analyzer.generate_questions(section_content)

#         return questions
#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

# @app.post("/transcribe")
# async def transcribe_api(video_path):
#     whisper_obj = Whisper(video_path)
#     transcription = whisper_obj.transcribe()
#     return transcription


# @app.post("/create_summary")
# async def create_summary(text):
    
#     try:
#         summarized_text = summarizer_object.create_summary(text)
#         return summarized_text
#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}


# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

