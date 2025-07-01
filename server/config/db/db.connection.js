const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://littehope_dbUser:${process.env.MONGO_PASSWORD}@littlehope-ecommerce.j1kapcz.mongodb.net/?retryWrites=true&w=majority&appName=LittleHope-Ecommerce`;

let client;

async function connectDB() {
    if (client) {
        console.log('Already connected to mongoDB')
        return client
    }
    try {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
        await client.connect()
        console.log('connected to mongoDB')
        return client
    } catch (error) {

    }
}

function getDB(){
    if(!client){
        throw new Error('mongoDB client is not connected yet!')
    }
    return client.db('LittleHope-Ecommerce')
}

module.exports={connectDB,getDB}