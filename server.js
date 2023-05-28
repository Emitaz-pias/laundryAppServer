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

    app.post('/login', (req, res) => {
      const { email, password } = req.body; // Assuming the request body contains username and password fields
    
      // Perform server logic to check credentials
      usersCollection.find({ "email":'emtiazpias22@gmail.com'}, (err, user) => {
        if (err) {
          console.error('Error finding user:', err);
          res.status(500).json({ error: 'An error occurred' });
        } else if (user) {
          // User found, authentication successful
          console.log('User authenticated:', user.username);
          res.status(200).json({ message: 'Authentication successful' });
        } else {
          // User not found, authentication failed
          console.log('Authentication failed');
          res.status(401).json({ error: 'Authentication failed' });
        }
      });
    });
    
    // my apis 
    console.log("db cnnected")
    //all post api 

    // sign up user api
app.post("/signUp", (req, res) => {
const user = req.body;
  usersCollection.insertOne(user).then((result,err) => {
    if (err) {
      console.log(err,"err msg")
    }
    else{
console.log("n err")
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



  } catch {
   console.log(err)
  }
  app.listen(5000, () => {
    console.log("app is alive");})
  
}
run().catch(console.dir);


