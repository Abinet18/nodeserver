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
exports.getBlog = exports.getBlogs = exports.queryBlogs = exports.deleteBlog = exports.updateBlog = exports.addBlog = exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    blogDate: {
        type: Date,
        required: true,
    },
    blogText: {
        type: String,
        required: true,
    },
    blogTitle: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
});
exports.BlogModel = (0, mongoose_1.model)("Blog", BlogSchema);
const addBlog = (d) => __awaiter(void 0, void 0, void 0, function* () {
    // const blog = new BlogModel(d);
    const blogAdded = yield exports.BlogModel.create(d);
    console.log("After adding blog", blogAdded);
    return d;
});
exports.addBlog = addBlog;
const updateBlog = (d) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield exports.BlogModel.updateOne({ id: d.id }, { $set: d });
    return updatedBlog;
});
exports.updateBlog = updateBlog;
const deleteBlog = (d) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield exports.BlogModel.deleteOne({ id: d.id });
    return d;
});
exports.deleteBlog = deleteBlog;
const queryBlogs = (q) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield exports.BlogModel.find({
        $or: [{ blogTitle: { like: q } }, { blogText: { like: q } }],
    });
});
exports.queryBlogs = queryBlogs;
const getBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield exports.BlogModel.find();
    return blogs;
});
exports.getBlogs = getBlogs;
const getBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield exports.BlogModel.findOne({ id: blogId });
    return blog;
});
exports.getBlog = getBlog;
