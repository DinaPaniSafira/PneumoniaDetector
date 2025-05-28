from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'supersecretkey'
model = load_model('model.h5')

with open("class_names.json") as f:
    class_names = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join('static', filename)
        file.save(filepath)

        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)[0]
        label_index = int(np.argmax(prediction))
        confidence = float(prediction[label_index])
        label = class_names[label_index]

        class_confidences = {class_names[i]: float(prediction[i]) for i in range(len(class_names))}

        # Simpan hasil ke session sementara
        session['result'] = {
            'label': label,
            'confidence': round(confidence * 100, 2),
            'image_url': '/' + filepath,
            'class_confidences': class_confidences
        }

        return redirect(url_for('result'))

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/result')
def result():
    result_data = session.get('result')
    return render_template('result.html', result=result_data)

if __name__ == '__main__':
    app.run(debug=True)