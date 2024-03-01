import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dbConnect from "./db/connectivity.js";
import { VehicleRouters } from "./Router/Vehicles.js";
import { UserRouters } from "./Router/User.js";
import { DashboardRouter } from "./Router/Dashboard.js";
const apiPrefix = process.env.API_PRIFEX;
const port = process.env.PORT || 3080;

const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*', credentials: true }));
app.use(express.static("public"));

app.use(bodyParser.json());
// Configure bodyParser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiPrefix, VehicleRouters);
app.use(apiPrefix, UserRouters);
app.use(apiPrefix, DashboardRouter);






dbConnect();

app.get("/", (req, res) => {
  res.send("Swish server is up");
});
app.get("/checkserver", (req, res) => {
  res.send("welcome to application server is up and working on ec2...");
});

app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});


