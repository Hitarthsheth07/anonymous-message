'use server'

import mongoose from "mongoose";

type ConnectionObject = {   
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbconnect (): Promise<void> {
  if(connection.isConnected){
    console.log('Already Connected to database!');
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI as string)

    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1)
  }
}

export default dbconnect