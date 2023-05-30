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
    const ordersCollection= client.db("laundryApp").collection("orders");

    
   
    
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
  ordersCollection.insertOne(req.body).then( (response, err) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ error: 'Please try again' });
    } else {
      console.log('Document inserted:', response.insertedId);
      res.status(201).json({ message: 'Congratulation your has placed successfully' });
    }
})})


//// get/find apis ////
 // get all orders
 app.get("/getAllOrders", async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await ordersCollection.find({}).toArray();
    
    // Send the orders as a response
    res.json(orders);
  } catch (error) {
    // Error occurred
    console.log(error);
    res.status(500).json({ error: 'An error occurred, please try again later' });
  }
});


// user login
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
      res.send('user not found');
    }
  } catch (error) {
    // Error occurred
    res.status(500).json({ error: 'An error occurred please try again later' });
  }
  })
  /// update api's

  /// handle shipped orders
  app.put("/orders/:orderId/shipped", (req, res) => {
    const orderId = req.params.orderId;
    // const objectId = new ObjectId(orderId);
    console.log(orderId,'isorder id')
    
    // Update the order status in the database to pending
    ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Shipped" } },
      (err, result) => {
        if (err) {
          console.error("Error updating order status:", err);
          res.status(500).json({ error: "An error occurred while updating order status" });
        } else {
          console.log(result,'inserted')
          res.json({ message: "Order status updated to pending" ,result});
        }
      }
    );
  });
  app.put("/orders/:orderId/delivered", (req, res) => {
    const orderId = req.params.orderId;
  /// handle deliverd orders 
    // Update the order status in the database to delivered
    ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Delivered" } },
      (err, result) => {
        if (err) {
          console.error("Error updating order status:", err);
          res.status(500).json({ error: "An error occurred while updating order status" });
        } else {
          res.json({ message: "Order status updated to delivered" });
        }
      }
    );
  });
    
  // 

} catch {
   console.log(err)
  }
  app.listen(5000, () => {
    console.log("app is alive");})
  
}
run().catch(console.dir);


