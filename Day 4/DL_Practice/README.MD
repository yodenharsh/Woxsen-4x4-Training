# DL Practice

## Dataset source

- The pre-available dataset (CIFAR 10) was made available from Caltech Data. [Link](https://data.caltech.edu/records/mzrjq-6wc02)
- Other dataset is a (mostly) augmented collection of photos from personal devices or images available in public domain

## Things Tried

### Initial Attempt

- Started with 2 sets of Conv2D followed by Maxpooling2D, flatten and a dense layer
- Used Adam Optimizer
- Added CSVLogger
- 0.001 learning rate and a batch size of 64
- 100 epochs

Results:

- 82.3% training acc and 32.3% test acc
- validation loss curve starts to diverge away from train loss curve at epoch 15
- Clear case of overfitting

### 2nd attempt

- Added Batch normalization
- Switched to 50 epochs
- Added third set of conv2d and maxpooling2d
- Each such set now has BatchNormalization

Results:

- Barely any difference
- Overfitting

### 3rd attempt

- Added Dropout layer to sets of conv2d and maxpooling2d
- Changed shuffle seed in splitting
- Switched to 45 epochs

Results:

- Divergence between loss curve and train curve reduced
- Overfitting

### 4th attempt

- Added ReduceLROnPlateau to control learning rate mid-training
- Changed optimizer to RMSProp with min learning rate of .00001

Results:

- Significant improvements to plots
- Model learns a lot slower
- For 10-15 epochs, high variation in val loss
- When the ReduceLROnPlateau callback triggers, the val loss scales starts scaling with train loss
- Sudden drop in loss at epoch 20
- 63.68% test accuracy. However, the plots are significantly better

### 5th attempt

- Epochs set to 120
- Added EarlyStopping (monitors val_loss) with a high patience of 10

Results:

- Early Stopping never triggered
- Model stagnates at epoch 60
- 63.99% test accuracy

### 6th attempt (FINAL)

- Changed back to Adam optimizer
- Made adjustments to data split
- Number of epochs set to 60

Results:

- 67.91% test accuracy
- Some drops in loss plot when ReduceLROnPlateu is triggered
- However, overall plot is smooth
- On plotting the **confusion matrix**, we observe that a lot of the false positives are classified as airplane
