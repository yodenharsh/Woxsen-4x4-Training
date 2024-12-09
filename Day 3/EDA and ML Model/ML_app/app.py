import streamlit as st
import pandas as pd
from src.models.classifier import BinaryClassifier
from src.utils.preprocessing import preprocess_input, validate_input
from sklearn.datasets import load_breast_cancer

def main():
    st.title("Binary Classification Predictor")
    st.write("Enter feature values for prediction")
    
    # Load feature names
    feature_names = load_breast_cancer().feature_names
    
    # Create input fields
    input_dict = {}
    for feature in feature_names:
        input_dict[feature] = st.number_input(
            f"Enter {feature}",
            value=0.0,
            format="%.6f"
        )
    
    if st.button("Predict"):
        try:
            # Validate input
            validate_input(input_dict, feature_names)
            
            # Preprocess input
            input_df = preprocess_input(input_dict, feature_names)
            
            # Load model and make prediction
            model = BinaryClassifier.load_model()
            prediction = model.predict(input_df)[0]
            
            # Display result
            result = "Malignant" if prediction == 0 else "Benign"
            st.success(f"Prediction: {result}")
            
        except Exception as e:
            st.error(f"Error: {str(e)}")

if __name__ == "__main__":
    main()