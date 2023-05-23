const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

// app usage
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connections
const uri = "mongodb+srv://pias1:jwu3MQasnPn2NA2P@cluster0.7yyq5li.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
});

async function run() {
  try {
    await client.connect();
    const usersCollection= client.db("laundryApp").collection("users")
    const ordersCollection = client.db("laundryApp").collection("orders")
    
    // my apis 
    console.log("db cnnected")
    //all post api 
app.post("/signUp", (req, res) => {
  usersCollection.insertOne(req.body, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ error: 'Please try again' });
    } else {
      console.log('Document inserted:', result.insertedId);
      res.status(201).json({ message: 'Congratulation signed in successfully' });
    }
})
console.log(req.body);
})
app.post("/order", (req, res) => {
  usersCollection.insertOne(req.body, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ error: 'Please try again' });
    } else {
      console.log('Document inserted:', result.insertedId);
      res.status(201).json({ message: 'Congratulation your has placed successfully' });
    }
})
console.log(req.body);
})
  } catch {
   console.log(err)
  }
  app.listen(5000, () => {
    console.log("app is alive");})
  
}
run().catch(console.dir);


