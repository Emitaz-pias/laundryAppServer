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
const uri = "mongodb+srv://pias:aT0Bs1OmHxPFPgpc@cluster0.7yyq5li.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
});

async function run() {
  try {
    await client.connect();
    const usersCollectin= client.db("laundryApp").collection("users")
    

  } catch {
   console.log(err)
  }
  app.listen(3000, () => {
    console.log("app is alive");})
  
}
run().catch(console.dir);


