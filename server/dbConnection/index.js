import mongoose from "mongoose";

const DB_CONNECTION_URL = "mongodb://nayeemhoque109:4Sv31J5RGxMhp9JO@ac-4h9emvc-shard-00-00.qqgqsce.mongodb.net:27017,ac-4h9emvc-shard-00-01.qqgqsce.mongodb.net:27017,ac-4h9emvc-shard-00-02.qqgqsce.mongodb.net:27017/?ssl=true&replicaSet=atlas-9zznkv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gifchat";

const connectDB = () => {
  console.log("DB trying to connect on " + new Date());

  return mongoose.connect(DB_CONNECTION_URL);
};
export default connectDB;



