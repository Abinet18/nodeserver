import { Schema, model, connect, Mongoose } from "mongoose";

export type Blog = {
  _id?: string;
  id: string;
  userId: string;
  blogDate: Date;
  blogTitle: string;
  blogText: string;
};

const BlogSchema = new Schema<Blog>({
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

export const BlogModel = model("Blog", BlogSchema);

export const addBlog = async (d: Blog) => {
  // const blog = new BlogModel(d);
  const blogAdded = await BlogModel.create(d);
  console.log("After adding blog", blogAdded);
  return d;
};

export const updateBlog = async (d: Blog) => {
  const updatedBlog = await BlogModel.updateOne({ id: d.id }, { $set: d });
  return updatedBlog;
};

export const deleteBlog = async (d: Blog) => {
  const deletedBlog = await BlogModel.deleteOne({ id: d.id });
  return d;
};

export const queryBlogs = async (q: string) => {
  const blogs = await BlogModel.find({
    $or: [{ blogTitle: { like: q } }, { blogText: { like: q } }],
  });
};

export const getBlogs = async () => {
  const blogs = await BlogModel.find();
  return blogs;
};

export const getBlog = async (blogId: string) => {
  const blog = await BlogModel.findOne({ id: blogId });
  return blog;
};
