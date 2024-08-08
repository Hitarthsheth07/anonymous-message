import mongoose from "mongoose";

type ConnectionObject = {   
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbconnect (): Promise<void> {
  if(connection.isConnected){
    console.log('connected to database');
    return
  }

  try {
    const db = await mongoose.connect('mongodb://localhost:27017/AnonomousMessage')

    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1)
  }
}

export default dbconnect