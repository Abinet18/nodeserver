"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_1 = require("../models/blogs");
const routes = (0, express_1.Router)();
routes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("You are in blogs route");
    const blogs = yield (0, blogs_1.getBlogs)();
    // console.log('blogs found', blogs);
    res.json(blogs);
}));
routes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("You are in blogs route");
    const blog = yield (0, blogs_1.getBlog)(req.params.id);
    res.json(blog);
}));
routes.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Adding", req.body);
    const blog = req.body;
    const blogAdded = yield (0, blogs_1.addBlog)(blog);
    res.json(blogAdded);
}));
routes.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating", req.body);
    let blog = req.body;
    const blogUpdated = yield (0, blogs_1.updateBlog)(blog);
    res.json(blogUpdated);
}));
routes.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting", req.body);
    const blog = req.body;
    const deletedBlog = yield (0, blogs_1.deleteBlog)(blog);
    res.json(blog);
}));
routes.get("/query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Querying", req.body);
    const blogs = yield (0, blogs_1.queryBlogs)(req.body.query);
    res.json(blogs);
}));
exports.default = routes;
