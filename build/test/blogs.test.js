"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const blogModels = __importStar(require("../models/blogs"));
describe("test create blog", () => {
    const blog = {
        id: "test_id",
        blogTitle: "test title",
        blogText: "test blog text",
        blogDate: new Date().toISOString(),
        userId: "",
    };
    test("Should have blog created", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreateBlog = jest.fn((blog) => {
            console.log("mock create called", blog);
            return blog;
        });
        jest
            .spyOn(blogModels, "addBlog")
            .mockImplementation((blog) => __awaiter(void 0, void 0, void 0, function* () { return mockCreateBlog(blog); }));
        const res = yield (0, supertest_1.default)(app_1.default).post("/blogs/add").send(blog);
        // const res = { body: { ...blog } }
        console.log("res", res.body);
        expect(mockCreateBlog).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("blogTitle");
        expect(res.body).toHaveProperty("blogText");
    }));
    test("Should be able to delete blog", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDeleteBlog = jest.fn((blog) => blog);
        jest
            .spyOn(blogModels, "deleteBlog")
            .mockImplementation((blog) => __awaiter(void 0, void 0, void 0, function* () {
            return mockDeleteBlog(blog);
        }));
        const res = yield (0, supertest_1.default)(app_1.default).delete("/blogs/delete").send(blog);
        // const res = { body: { ...blog } }
        expect(mockDeleteBlog).toHaveBeenCalledTimes(1);
    }));
    test("Should be able to return blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAllBlogs = jest.fn(() => [
            blog,
        ]);
        jest
            .spyOn(blogModels, "getBlogs")
            .mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () { return mockGetAllBlogs(); }));
        const res = yield (0, supertest_1.default)(app_1.default).get("/blogs/");
        expect(mockGetAllBlogs).toHaveBeenCalledTimes(1);
        expect(res.body).toContainEqual(blog);
    }));
});
