import { app } from "./app";
import dbConnect from "./config/db";
require("dotenv").config();

// Create server
app.listen(process.env.PORT, () => {
  console.log(`Server is start at port no  ${process.env.PORT}`);
  dbConnect();
});
