from tempfile import TemporaryDirectory
import os
import subprocess

import pandas as pd
import torch

import openai
import whisper_timestamped as whisper

class Whisper:
    def __init__(self, in_video):
        self._test_video_path(in_video)
        self.in_video = in_video
        self.model = whisper.load_model("base")

    def _test_video_path(self, path):
        assert path.endswith('.mp4'), "Only .mp4 formats are supported."
        assert os.path.isfile(path), "File does not exist."
        pass

    def transcribe(self):
        """
        1. .mp4 -> .wav using FFMPEG.
        2. .wav -> String using Whisper.
        """
        print("Extracting audio from video...")

        transcription = dict()
        with TemporaryDirectory() as temp_dir:
            audio_outfile_path = os.path.join(temp_dir, 'temp.wav')

            _ = self.extract_audio(audio_outfile_path)            

            print('Transcribing...')
            result = self.model.transcribe(audio_outfile_path, fp16=False)
            result_df = self._format_transcription_result(result)
            
        transcription['text'] = result['text'].strip()
        transcription['data'] = result_df
        return transcription
        

    def _format_transcription_result(self, whisper_result):
        """
        Return pd.DataFrame with three columns: start, end, text.
        """
        result_dict = {'start': [],
                       'end': [], 
                       'text': []}
        
        for segment in whisper_result['segments']:
            result_dict['start'].append(segment['start'])
            result_dict['end'].append(segment['end'])
            result_dict['text'].append(segment['text'].strip())
            pass
        
        return pd.DataFrame.from_dict(result_dict)
        
            
    def extract_audio(self, outfile=None):
        
        outfile = 'temp.wav' if outfile is None else outfile
        assert outfile.endswith('.wav'), "Only .wav output format is supported."
        
        command = f'ffmpeg -i "{self.in_video}" -ab 160k -ac 2 -ar 44100 -vn {outfile}'
        subprocess.call(command, shell=True, 
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.STDOUT)

        # subprocess.call(command, shell=True)


        return outfile