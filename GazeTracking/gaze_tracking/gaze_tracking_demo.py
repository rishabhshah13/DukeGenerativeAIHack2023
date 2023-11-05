import cv2
from gaze_tracking import GazeTracking

gaze = GazeTracking()
cap = cv2.VideoCapture(0)

while True:
    # Read a frame from the video stream
    ret, frame = cap.read()

    if not ret:
        break

    # Refresh the GazeTracking instance with the frame
    gaze.refresh(frame)

    if gaze.is_distracted():
        print("User is distracted!")

    annotated_frame = gaze.annotated_frame()
    cv2.imshow("Gaze Tracking", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()