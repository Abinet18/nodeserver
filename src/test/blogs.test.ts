import request from "supertest";
import app from "../app";
import * as blogModels from "../models/blogs";
import { Document } from "mongoose";
import { Blog } from "../models/blogs";

describe("test create blog", () => {
  const blog = {
    id: "test_id",
    blogTitle: "test title",
    blogText: "test blog text",
    blogDate: new Date().toISOString(),
    userId: "",
  };

  test("Should have blog created", async () => {
    const mockCreateBlog = jest.fn((blog: Blog) => {
      console.log("mock create called", blog);
      return blog;
    });
    jest
      .spyOn(blogModels, "addBlog")
      .mockImplementation(async (blog: Blog) => mockCreateBlog(blog));

    const res = await request(app).post("/blogs/add").send(blog);
    // const res = { body: { ...blog } }
    console.log("res", res.body);
    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("blogTitle");
    expect(res.body).toHaveProperty("blogText");
  });

  test("Should be able to delete blog", async () => {
    const mockDeleteBlog = jest.fn((blog: Blog) => blog);
    jest
      .spyOn(blogModels, "deleteBlog")
      .mockImplementation(async (blog: Blog) => {
        return mockDeleteBlog(blog);
      });

    const res = await request(app).delete("/blogs/delete").send(blog);
    // const res = { body: { ...blog } }
    expect(mockDeleteBlog).toHaveBeenCalledTimes(1);
  });

  test("Should be able to return blogs", async () => {
    const mockGetAllBlogs = jest.fn(() => [
      blog as unknown as Document<any, any, Blog> &
        Blog & {
          _id: string | undefined;
        },
    ]);
    jest
      .spyOn(blogModels, "getBlogs")
      .mockImplementation(async () => mockGetAllBlogs());

    const res = await request(app).get("/blogs/");

    expect(mockGetAllBlogs).toHaveBeenCalledTimes(1);
    expect(res.body).toContainEqual(blog);
  });
});
