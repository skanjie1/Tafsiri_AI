from flask import Blueprint, jsonify, request
import cv2
import numpy as np
from keras.models import load_model
import os
from mediapipe import solutions as mp

main = Blueprint('main', __name__)

models = {}
labels_dict = {}

def get_model(region_name):
    print(f"Loading model for region: {region_name}")
    if region_name not in models:
        if region_name == 'Nairobi':
            model_path = os.path.join('new_Nairobi', 'keras_model.h5')
            labels_path = os.path.join('new_Nairobi', 'labels.txt')
        elif region_name == 'Western':
            model_path = os.path.join('new_Western', 'keras_model.h5')
            labels_path = os.path.join('new_Western', 'labels.txt')
        elif region_name == 'Coastal':
            model_path = os.path.join('new_Coastal', 'keras_model.h5')
            labels_path = os.path.join('new_Coastal', 'labels.txt')
        else:
            raise ValueError(f"Unknown region: {region_name}")
        
        try:
            models[region_name] = load_model(model_path, compile=False)
            with open(labels_path, "r") as file:
                labels_dict[region_name] = [line.strip() for line in file.readlines()]
        except Exception as e:
            print(f"Error loading model or labels for region {region_name}: {str(e)}")
            raise ValueError(f"Could not load model or labels for region {region_name}")

    return models[region_name], labels_dict[region_name]

@main.route('/select_region', methods=['POST'])
def select_region():
    region_name = request.json.get('region')
    print(f"Received region selection request: {region_name}")
    try:
        get_model(region_name)  
        return jsonify({'message': f'Region selected: {region_name}'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 500

# @main.route('/process_image', methods=['POST'])
# def process_image():
#     print(request.form)
#     region_name = request.form.get('region')
#     print(f"Processing image for region: {region_name}")
#     if not region_name:
#         return jsonify({'error': 'Region not specified'}), 400

#     try:
#         file = request.files['image']
#         in_memory_file = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

#         mp_hands = mp.hands.Hands()
#         img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         result = mp_hands.process(img_rgb)

#         if not result.multi_hand_landmarks:
#             return jsonify({'sign': 'translating...', 'confidence': 0})

#         model, labels = get_model(region_name)
#         img_resize = cv2.resize(img, (224, 224))
#         img_array = np.array(img_resize, dtype=np.float32)
#         img_normalized = (img_array / 127.5) - 1
#         img_normalized = img_normalized.reshape((1, 224, 224, 3))

#         predictions = model.predict(img_normalized)
#         predicted_index = np.argmax(predictions[0])
#         predicted_label = labels[predicted_index]
#         confidence = predictions[0][predicted_index]

#         return jsonify({'sign': predicted_label, 'confidence': float(confidence)})
#     except Exception as e:
#         print(f"Error processing image for region {region_name}: {str(e)}")
#         return jsonify({'error': 'Failed to process image'}), 500


@main.route('/process_image', methods=['POST'])
def process_image():
    print(request.form) 
    region_name = request.form.get('region')
    print(f"Processing image for region: {region_name}") 
    if not region_name:
        return jsonify({'error': 'Region not specified'}), 400

    try:
        file = request.files['image']
        in_memory_file = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

        model, labels = get_model(region_name)
        img_resize = cv2.resize(img, (224, 224))
        img_array = np.array(img_resize, dtype=np.float32)
        img_normalized = (img_array / 127.5) - 1
        img_normalized = img_normalized.reshape((1, 224, 224, 3))

        predictions = model.predict(img_normalized)
        predicted_index = np.argmax(predictions[0])
        predicted_label = labels[predicted_index]
        confidence = predictions[0][predicted_index]

        return jsonify({'sign': predicted_label, 'confidence': float(confidence)})
    except Exception as e:
        print(f"Error processing image for region {region_name}: {str(e)}")
        return jsonify({'error': 'Failed to process image'}), 500