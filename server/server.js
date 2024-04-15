import APP from "express";
import connectDB from "./dbConnection";
import configureExpressApp from "./config";
import applyRoutes from "./routes";

const app = new APP();
configureExpressApp(app);
const PORT = 3001;

const startServer = () => {
  Promise.all([connectDB()])
    .then(() => {
      app.listen(PORT);
      console.log(`Server started on Port ${PORT}`);
      applyRoutes(app);
    })
    .catch((error) => console.error(`Unable to start the server`, error));
};

startServer();