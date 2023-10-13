const express = require('express');
const app = express();
const port = process.env.Port || 5000;
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json())

// userName probeshn
// pass imwljkx8bMdBar0O
//mongodb+srv://probeshnath:<password>@cluster0.xcduqbc.mongodb.net/



const uri = "mongodb+srv://probeshnath:csqJwVQ51ugPhZ3M@cluster0.xcduqbc.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB")
    const userCollection = database.collection("users");

    // fetch all users
    app.get("/users", async( req,res) =>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // find only one user
     app.get("/user/:id", async(req,res)=>{
          const id = req.params.id;
          const query = { _id: new ObjectId(id)}
          const user = await userCollection.findOne(query)
          res.send(user)
          console.log(user)
      })

    //create users
    app.post("/users", async (req,res)=>{
        const user = req.body;

        try {
            // Insert the user data into the collection
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.send(result);
          } catch (err) {
            console.error("Error inserting data into MongoDB:", err);
            res.status(500).send("Internal Server Error");
          }
    })

    // update user
    app.put("/user/:id",async(req,res)=>{
      const id = req.params.id
      const user = req.body;
      // console.log("id",id)
      // console.log("user",user)
      const filter = { _id: new ObjectId(id)}
      const options = { upsert: true}
      const updatedUser = {
        $set:{
          name: user.name,
          email: user.email
        }
      }
      const result = await userCollection.updateOne(filter,updatedUser,options)
      res.send(result)
    })

    // Delete user

    app.delete("/users/:id", async (req,res)=>{
      const id = req.params.id;
      // console.log(id)
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// const users = [
//     {id:1 , name:"probesh", email:"probesh@gmail.com"},
//     {id:2 , name:"joydip", email:"jpy@gmail.com"},
//     {id:3 , name:"pappu", email:"pappu@gmail.com"},
//     {id:4 , name:"dipu", email:"dipu@gmail.com"},
//     {id:5 , name:"Emad", email:"emad@gmail.com"}
// ]


// app.get("/",(req,res)=>{
//     res.send("Hi server")
// })

// app.get("/users",(req,res)=>{
//     res.send(users)
// })

// app.get("/user/:id",(req,res)=>{
//     const id = req.params.id;
//     const userData = users.find((user) => user.id === parseInt(id))
//     res.send(userData)
//     console.log(id)
// })

// app.post("/users", async (req,res)=>{
//     const user = req.body;
//      user.id = users.length + 1;
//       users.push(user)
//     //   const result = await userCollection.insertOne(user)
//      console.log(user)
//     //  res.send(result)
// })



app.listen(port, () =>{
    console.log(`localhost://${port}`)
})