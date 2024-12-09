from data.dataset import load_data
from models.classifier import BinaryClassifier
import os

def train_and_save_model():
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Load and split the data
    X_train, X_test, y_train, y_test = load_data()
    
    # Initialize and train the classifier
    classifier = BinaryClassifier()
    classifier.train(X_train, y_train)
    
    # Save the trained model
    classifier.save_model()
    
    # Calculate and print accuracy
    accuracy = classifier.model.score(X_test, y_test)
    print(f"Model accuracy on test set: {accuracy:.2f}")

if __name__ == "__main__":
    train_and_save_model()