import smbus
import time
import websocket
import json

# Define MPU6050 register addresses
MPU6050_ADDRESS = 0x68  # Replace with 0x69 if the AD0 pin is HIGH

# MPU6050 registers
MPU6050_REG_PWR_MGMT_1 = 0x6B
MPU6050_REG_SMPLRT_DIV = 0x19
MPU6050_REG_CONFIG = 0x1A
MPU6050_REG_GYRO_CONFIG = 0x1B
MPU6050_REG_ACCEL_CONFIG = 0x1C

# Initialize the I2C bus (on Raspberry Pi, bus 1 is usually used)
bus = smbus.SMBus(1)


# Function to write a value to a register
def write_i2c_register(reg, value):
    bus.write_byte_data(MPU6050_ADDRESS, reg, value)


# Function to read a signed 16-bit value from a register
def read_i2c_word(reg):
    high_byte = bus.read_byte_data(MPU6050_ADDRESS, reg)
    low_byte = bus.read_byte_data(MPU6050_ADDRESS, reg + 1)
    value = (high_byte << 8) + low_byte

    # Convert to signed value (two's complement)
    if value > 32767:
        value -= 65536

    return value


# MPU6050 initialization sequence
def initialize_mpu6050():
    # Wake up MPU6050
    write_i2c_register(MPU6050_REG_PWR_MGMT_1, 0)

    # Configure sample rate
    write_i2c_register(MPU6050_REG_SMPLRT_DIV, 0)  # Set sample rate to 1kHz

    # Configure gyro and accelerometer range
    write_i2c_register(MPU6050_REG_GYRO_CONFIG, 0x18)  # +/- 2000 degrees/second
    write_i2c_register(MPU6050_REG_ACCEL_CONFIG, 0x18)  # +/- 16g

    # Disable FSYNC and set accelerometer and gyro bandwidth to 44.8 and 42 Hz, respectively
    write_i2c_register(MPU6050_REG_CONFIG, 0x03)


# Call the MPU6050 initialization function
initialize_mpu6050()


# Initialize WebSocket connection
ws = websocket.WebSocket()
ws.connect("ws://your-raspberry-pi-ip:your-port")

try:
    while True:
        # Read MPU6050 data

        acceleration_x = read_i2c_word(0x3B)
        acceleration_y = read_i2c_word(0x3D)
        acceleration_z = read_i2c_word(0x3F)

        gyroscope_x = read_i2c_word(0x43)
        gyroscope_y = read_i2c_word(0x45)
        gyroscope_z = read_i2c_word(0x47)

        # Send data over WebSocket
        data = {
            "acceleration": {
                "x": acceleration_x,
                "y": acceleration_y,
                "z": acceleration_z,
            },
            "gyroscope": {"x": gyroscope_x, "y": gyroscope_y, "z": gyroscope_z},
        }
        print(data)
        ws.send(json.dumps(data))

        # Add a delay to control the update rate
        time.sleep(0.1)

except KeyboardInterrupt:
    ws.close()
