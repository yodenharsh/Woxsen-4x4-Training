import pandas as pd
import numpy as np

def preprocess_input(input_dict, feature_names):
    """
    Preprocess user input into the format expected by the model
    """
    # Convert input dictionary to DataFrame
    df = pd.DataFrame([input_dict])
    
    # Ensure all features are present and in correct order
    df = df.reindex(columns=feature_names)
    
    return df

def validate_input(input_dict, feature_names):
    """
    Validate that all required features are present and have valid values
    """
    missing_features = set(feature_names) - set(input_dict.keys())
    if missing_features:
        raise ValueError(f"Missing features: {missing_features}")
    
    # Validate numeric values
    for key, value in input_dict.items():
        try:
            float(value)
        except ValueError:
            raise ValueError(f"Invalid numeric value for feature: {key}")