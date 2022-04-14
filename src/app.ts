import Express from "express";
import express, { Router } from "express";
import path from "path";

import BodyParser from "body-parser";
import beaconRoutes from "./routes/beaconRoutes";
import cors from "cors";
import { products } from "./models/products";

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.text());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// let db;
app.use("/beacon", beaconRoutes);
app.use(express.static(path.resolve(__dirname, "../public")));
app.get("/home", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get("/ot", (req, res) => {
    res.sendFile(__dirname + '/ot.html');
});
app.get("/products", (req, res) => {
    res.json(products);
});

export default app;
