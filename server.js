const express = require("express");
const cors = require("cors");
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const url = '<YOUR_MONGODB_URL>';
const dbName = '<YOUR_DATABASE_NAME>';

const app = express();

// Enable CORS
app.use(cors());


//
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  console.log('Connected to MongoDB');

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  
  // Start the server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
});
// Routes
