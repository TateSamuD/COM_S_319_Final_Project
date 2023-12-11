import os
import time
import json
from mpu6050 import mpu6050
from pymongo import MongoClient, ReplaceOne

# Initialize MPU6050 sensor
sensor = mpu6050(0x68)  # Use the correct I2C address of the sensor

# MongoDB configuration
mongo_client = MongoClient("mongodb://127.7.0.1:27017")  # Replace with your MongoDB URI
database = mongo_client["mpu6050sensor"]  # Replace with your database name
collection = database["sensor_data"]  # Replace with your collection name

DELAY = 1


def read_and_save():
    try:
        while True:
            accel = sensor.get_accel_data()
            gyro = sensor.get_gyro_data()
            temperature = round(sensor.get_temp())  # Round temperature to the nearest whole number

            # Round accelerometer and gyroscope readings to the nearest whole number
            accel_rounded = {axis: round(value) for axis, value in accel.items()}
            gyro_rounded = {axis: round(value) for axis, value in gyro.items()}

            # Create a dictionary to store the rounded data
            sensor_data = {
                "accelerometer": accel_rounded,
                "gyroscope": gyro_rounded,
                "temperature": temperature,
                "timestamp": time.time(),  # Add a timestamp for each reading
            }

            # Print gyroscope reading
            print("Gyroscope Reading:", sensor_data["gyroscope"])

            # Update or insert data into MongoDB collection
            update_filter = {"timestamp": sensor_data["timestamp"]}
            update_statement = {
                "$set": sensor_data
            }

            # Using ReplaceOne with upsert=True to insert if document doesn't exist
            update_operation = ReplaceOne(update_filter, update_statement, upsert=True)
            collection.bulk_write([update_operation])
            print("Updating MongoDB")
            
            # # Insert data into MongoDB collection
            # collection.insert_one(sensor_data)
            # print("Adding to MongoDB")

            time.sleep(DELAY)

    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    print("Reading data from MPU6050 and saving to MongoDB.")
    read_and_save()
