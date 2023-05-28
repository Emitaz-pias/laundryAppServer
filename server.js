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
    const usersCollection= client.db("laundryApp").collection("users");
    
    // get all users
    app.get("/user",(req,res)=>{
      usersCollection.find({}).toArray((err, result) => {
        console.log(result,err)
        res.send(result)
      })
     
    })
    
    // my apis 
    console.log("db cnnected")
    //all post api 

    // sign up user api
app.post("/signUp", (req, res) => {
const user = req.body;
  usersCollection.insertOne(user).then((result,err) => {
    if (err) {
 res.send(err);
    }
    else{
res.send(result.acknowledged);
    }
  
  })

})
//place order api
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

//// find apis ////
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await usersCollection.findOne({ email });
    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Successful login
      res.send(user);
    } else {
      // Invalid credentials
      res.send('Invalid username or password');
    }
  } catch (error) {
    // Error occurred
    res.status(500).json({ error: 'An error occurred' });
  }
  })
} catch {
   console.log(err)
  }
  app.listen(5000, () => {
    console.log("app is alive");})
  
}
run().catch(console.dir);


