import openai
import os

class Summarizer:
    def __init__(self,openai_api_key):
        self.openai_api_key = openai_api_key
        # openai.api_key = openai_api_key

    def create_summary(self, text):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": 
                     """
                    After reviewing the educational material provided, 
                    create a concise and engaging summary. 
                    The summary should be easy to understand for individuals with ADHD or focusing issues. 
                    It should highlight the most critical concepts in a clear and structured manner, 
                    using bullet points for better readability. 
                    Each point should capture an essential concept without omitting any significant details. 
                    The language should be straightforward, avoiding complex sentences 
                    or technical jargon that might distract or overwhelm the reader.
                    """},
                    {"role": "user", "content": text}
                ],
                temperature=0,
                max_tokens=200,
                n=1,
            )

            if response is not None and 'choices' in response and len(response['choices']) > 0:
                summary = response.choices[0].message['content']
                return summary
            else:
                return "Error: No response from the API."

        except Exception as e:
            return f"An error occurred: {e}"