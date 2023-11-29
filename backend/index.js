// Author: Tatenda Samudzi
// ISU Netid : tdsamu@iastate.edu
// Date :  November 28, 2023

var express = require("express");
var cors = require("cors");
var app = express();
var bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.json());

const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "mpu6050Sensor";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/showData", async (req, res) => {
    try{
  await client.connect();
  console.log("Node connected to GET");
  const query = {};
  const results = await db
    .collection("gyroReadings")
    .find(query)
    .limit(100)
    .toArray();
  console.log("items pulled");

  const formattedResults = results.map(item => ({
    accelerometer: {
        x: item.accelerometerX,
        y: item.accelerometerY,
        z: item.accelerometerZ,
    },
    gyroscope: {
        x: item.gyroscopeX,
        y: item.gyroscopeY,
        z: item.gyroscopeZ,
    },
  }))

  res.status(200).json({sensor_data: formattedResults});
} catch (error){
    console.error('Error fetching and formatting sensor data:', error);
    res.status(500).send('Internal Server Error');
} finally{
    // Close MongoDB connection
    await client.close();
}
});
