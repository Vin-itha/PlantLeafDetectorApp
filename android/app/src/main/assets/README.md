# TensorFlow Lite Model

Place your `plant_detection_model.tflite` file in this directory.

The model should be trained to detect:
- Bael leaves
- Betel leaves  
- Crown flower leaves

Expected input: 224x224x3 RGB images
Expected output: 3 classes with confidence scores

## Model Performance
- Bael: ~85% accuracy
- Betel: ~90% accuracy
- Crown Flower: ~90% accuracy