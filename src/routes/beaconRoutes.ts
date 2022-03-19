import express, { Router } from "express";
import path from "path";
import app from "../app";
import { addBeacon } from "../models/beacons";


const routes = Router();

routes.get("/", async (req, res) => {
  console.log("You are in blogs route");
  res.json({ method: 'GET', api: 'Beacon Api' });
});

routes.post("/", async (req, res) => {
  console.log("Got a beacon", req.body);
  await addBeacon(req.body);
  res.sendStatus(204);
});



export default routes;
