const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
//body parse middlewire
app.use(express.json())
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogcfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('users');
        app.post('/user',async(req,res)=>{
            const newUser = req.body;
           const result = await userCollection.insertOne(newUser);
            res.send(result)
        })
    }finally{

    }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log('listening to port=>',port);
})
//scyJADhzw5Lkw2Db
//express
app.get('/',(req,res)=>{
    res.send('server');
})

app.get('/user',(req,res)=>{
    res.send('user')
})




