import Express from "express";
import BodyParser from "body-parser";
import blogRoutes from "./routes/blogs";
import cors from "cors";

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// let db;
app.use("/blogs", blogRoutes);
export default app;
