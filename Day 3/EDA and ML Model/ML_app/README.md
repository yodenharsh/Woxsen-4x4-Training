# Binary Classification Project

This project implements a binary classifier using the breast cancer dataset from scikit-learn. It includes a Streamlit web interface for making predictions.

## Project Structure

```
├── src/
│   ├── data/
│   │   └── dataset.py
│   ├── models/
│   │   └── classifier.py
│   ├── utils/
│   │   └── preprocessing.py
│   └── train.py
├── app.py
├── requirements.txt
└── README.md
```

## Setup and Running

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Train the model:
```bash
python src/train.py
```

3. Run the Streamlit app:
```bash
streamlit run app.py
```

## Features

- Random Forest Classifier for binary classification
- Streamlit web interface for easy prediction
- Input validation and preprocessing
- Model persistence using joblib
- Clean code organization with separate modules for different responsibilities

## Usage

1. First run the training script to train and save the model
2. Launch the Streamlit app
3. Enter feature values in the web interface
4. Click "Predict" to get the classification result