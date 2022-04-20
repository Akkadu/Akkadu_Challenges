import express from "express";
import mongoose from "mongoose";
import orderReviewRouter from "./Routers/orderReviewRoute.js";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from "cors"
const app = express();
const port = 5000;

dotenv.config();

mongoose.connect(
  "mongodb+srv://zeeshan:daraz@cluster0.5rnew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
);
mongoose.connection.on('connected',()=>{
  console.log(
    `================ Mongo DB Cloud Connected ================`
  );
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user/review", orderReviewRouter);

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.listen(process.env.PORT || port, () => {
  console.log(
    `================ Sever Started at http://localhost:${port} ================`
  );
});
