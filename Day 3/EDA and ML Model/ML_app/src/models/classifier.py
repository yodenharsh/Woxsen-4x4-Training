from sklearn.ensemble import RandomForestClassifier
import joblib

class BinaryClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
        
    def train(self, X_train, y_train):
        """Train the classifier"""
        self.model.fit(X_train, y_train)
        
    def predict(self, X):
        """Make predictions"""
        return self.model.predict(X)
    
    def save_model(self, filepath='models/classifier.joblib'):
        """Save the trained model"""
        joblib.dump(self.model, filepath)
    
    @staticmethod
    def load_model(filepath='models/classifier.joblib'):
        """Load a trained model"""
        return joblib.load(filepath)