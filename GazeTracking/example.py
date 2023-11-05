"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""

import cv2
from gaze_tracking_old import GazeTracking

gaze = GazeTracking()
webcam = cv2.VideoCapture(0)
attention_score = 0

def estimate_attention_span(gaze, att_score):
    if gaze.is_right() or gaze.is_left():
        att_score -= 1
    #elif gaze.is_center():
        #//att_score += 1
    return att_score

while True:
    # We get a new frame from the webcam
    _, frame = webcam.read()

    # We send this frame to GazeTracking to analyze it
    gaze.refresh(frame)

    frame = gaze.annotated_frame()
    text = ""

    attention_score = estimate_attention_span(gaze, att_score=attention_score)
    if (attention_score<-25):
        print(attention_score)
        attention_score =0
        

    if gaze.is_blinking():
        text = "Blinking"
    elif gaze.is_right():
        text = "Looking right"
    elif gaze.is_left():
        text = "Looking left"
    elif gaze.is_center():
        text = "Looking center"
    
    # print(attention_score)
    cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)
    #cv2.putText(frame, attention_score, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 20)

    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()
    cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

    cv2.imshow("Demo", frame)

    if cv2.waitKey(1) == 27:
        break
   
webcam.release()
cv2.destroyAllWindows()
