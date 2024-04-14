import mongoose from "mongoose";

const DB_CONNECTION_URL = "mongodb+srv://nayeemhoque109:4Sv31J5RGxMhp9JO@cluster0.9cqzymw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
  console.log("DB trying to connect on " + new Date());

  const options = {
    keepAlive: 1,
    autoReconnect: true,
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return mongoose.connect(DB_CONNECTION_URL, options);
};
export default connectDB;