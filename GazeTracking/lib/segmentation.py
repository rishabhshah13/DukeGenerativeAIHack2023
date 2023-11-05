import os
import openai
import pandas as pd
import json
class TranscriptSegmenter:
    def __init__(self, model="gpt-3.5-turbo", temperature=0):
        self.model = model
        self.temperature = temperature

    def segment_transcript(self, text):
        try:
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content":
                    """
                    Please segment the following transcript into distinct sections,
                    each with a clear heading that gives the full content of each section.
                    Don't change any sentence under the sections. Give it as it is.
                    Give each section as separate paragraph, not bullet points.
                    Give number to each section - e.g Section 1: ....
                    """
                    },
                    {"role": "user", "content": text}
                ],
                temperature=self.temperature,
                max_tokens=len(text) + 100,
                n=1,
            )

            if response is not None:
                segments = response.choices[0].message['content']
                sections = segments.split('Section ')[1:]
                section_dict = {}
                for section in sections:
                    title, content = section.split('\n', 1)
                    title = title.strip()
                    content = content.strip()
                    section_dict[title] = content

                return section_dict

            else:
                print("Error: No response from the API.")
                return None

        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        

class ContentAnalyzer:
    def __init__(self, dataframe, sections_dict,openai_api_key):
        print(dataframe)
        print(type(dataframe))
        self.dataframe = pd.DataFrame.from_dict(json.loads(dataframe))
        self.sections_dict = json.loads(sections_dict)
        # self.openai_api_key = os.getenv('OPENAI_API_KEY')
        self.openai_api_key = openai_api_key
        if self.openai_api_key is None:
            raise ValueError("The OPENAI_API_KEY environment variable is not set.")
        openai.api_key = self.openai_api_key
        
    def find_section_by_second(self, second):
        row = self.dataframe[(self.dataframe['start'] <= second) & (self.dataframe['end'] > second)]
        if not row.empty:
            part_string = row.iloc[0]['text']
            for section_title, content in self.sections_dict.items():
                if part_string in content:    
                    return section_title, content 
            return "The part was not found in any section.", ""
        
        
        else:
            return "The second provided does not correspond to any part.", ""
            
    def generate_questions(self, section_content):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": """
                        Based on the text provided,
                        formulate 1 MCQ (each has 4 options) that capture the essence of the material.
                        Write (correct) in front of the correct answer.
                        These questions should reflect the key points
                        and concepts that are crucial for the reader to remember,
                        indicating a deep engagement with the content.
                        """
                    },
                    {"role": "user", "content": section_content}
                ],
                temperature=0,
                max_tokens=200,
                n=1,
            )
            if response is not None and 'choices' in response and len(response['choices']) > 0:
                questions = response.choices[0].message['content']
                questions_list = [questions.strip() for questions in questions.split('\n')]
                return questions_list
            else:
                return "Error: No response from the API."
        except Exception as e:
            return f"An error occurred: {e}"
        
    
    def verify_answer(self, ans):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": """
                        Based on the text provided, 
                        formulate 3 questions that capture the essence of the material. 
                        These questions should reflect the key points 
                        and concepts that are crucial for the reader to remember, 
                        indicating a deep engagement with the content.
                        """
                    },
                    {"role": "user", "content": section_content}
                ],
                temperature=0,
                max_tokens=200,
                n=1,
            )
            if response is not None and 'choices' in response and len(response['choices']) > 0:
                questions = response.choices[0].message['content']
                questions_list = [questions.strip() for questions in questions.split('\n')]
                return questions_list
            else:
                return "Error: No response from the API."
        except Exception as e:
            return f"An error occurred: {e}"