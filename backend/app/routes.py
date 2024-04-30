from flask import Blueprint, jsonify, request
from .models import db, Region, SignEntry
import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import math

main = Blueprint('main', __name__)

detector = HandDetector(maxHands=1)
classifier = Classifier("Model/keras_model.h5", "Model/labels.txt")

labels = ["Hello", "I love you", "No", "Okay", "Please", "Thank you", "Yes"]

@main.route('/')
def home():
    return "Welcome to the KSL Translator API"

@main.route('/select_region', methods=['POST'])
def select_region():
    region_name = request.json.get('region')
    print(f"Received region: {region_name}")  
    region = Region.query.filter_by(name=region_name).first()
    if region:
        return jsonify({'message': f'Region selected: {region.name}', 'id': region.id}), 200
    else:
        return jsonify({'message': 'Region not found'}), 404

@main.route('/process_image', methods=['POST'])
def process_image():
    file = request.files['image']
    in_memorty_file = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(in_memorty_file, cv2.IMREAD_COLOR)
    
    hands, img  = detector.findHands(img)
    sign = "Translating..."
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        offset = 20
        imgSize = 300
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255

        # Process crop and aspect ratio
        imgCrop = img[y-offset:y + h + offset, x-offset:x + w + offset]
        aspectRatio = h / w

        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            wGap = math.ceil((imgSize - wCal) / 2)
            imgWhite[:, wGap: wCal + wGap] = imgResize
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap: hCal + hGap, :] = imgResize

        # Make prediction
        prediction, index = classifier.getPrediction(imgWhite, draw=False)
        if index >= 0 and index < len(labels):
            sign = labels[index]
    return jsonify({'sign': sign})