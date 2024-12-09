import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

def load_data():
    """
    Loads the breast cancer dataset and splits it into training and testing sets
    Returns: X_train, X_test, y_train, y_test
    """
    data = load_breast_cancer()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target
    
    return train_test_split(X, y, test_size=0.2, random_state=42)