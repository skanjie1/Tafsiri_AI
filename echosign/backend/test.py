from flask import Flask, request, jsonify
import cv2

app = Flask(__name__)

@app.route('/detect_gesture', methods=['POST'])
def detect_gesture():
    # Capture video from the webcam
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        # Your gesture detection logic using OpenCV goes here
        
        # Display the webcam feed
        cv2.imshow('Webcam', frame)
        
        # Break the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Release the capture and close all windows
    cap.release()
    cv2.destroyAllWindows()
    
    return jsonify({'message': 'Gesture detection completed'})

if __name__ == '__main__':
    app.run(debug=True)
