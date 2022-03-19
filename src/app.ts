import Express from "express";
import express, { Router } from "express";
import path from "path";

import BodyParser from "body-parser";
import beaconRoutes from "./routes/beaconRoutes";
import cors from "cors";

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// let db;
app.use("/beacon", beaconRoutes);
app.use(express.static(path.resolve(__dirname, "../public")));
export default app;
