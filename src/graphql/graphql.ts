import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { getBlogs } from "../models/blogs";
import { addBlog, deleteBlog } from "../models/blogs";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
export const BLOG_ADDED = 'BLOG_ADDED';
export const BLOG_DELETED = 'BLOG_DELETED';
const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: { type: GraphQLString },
        blogTitle: { type: GraphQLString },
        blogText: { type: GraphQLString },
        blogDate: { type: GraphQLString },
        userId: { type: GraphQLString }
    })
})

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllBlogs: {
            type: new GraphQLList(BlogType),
            args: {},
            resolve: (parent, args) => {
                return getBlogs();
            }
        }
    }
})
const mutation = new GraphQLObjectType({
    name: 'BlogsMutation',
    fields: {
        addBlog: {
            type: BlogType,
            args: {
                id: { type: GraphQLString },
                blogTitle: { type: GraphQLString },
                blogText: { type: GraphQLString },
                blogDate: { type: GraphQLString },
                userId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let blogAdded = await addBlog(args);
                pubsub.publish(BLOG_ADDED, { blogAdded })
            }
        },
        deleteBlog: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let blogDeleted = await deleteBlog(args);
                pubsub.publish(BLOG_DELETED, { blogDeleted: args.id })
                return args.id;
            }
        }
    }
});

const subscription = new GraphQLObjectType({
    name: "Subscriptions",
    fields: {
        blogAdded: {
            type: BlogType,
            subscribe: () => {
                return pubsub.asyncIterator(BLOG_ADDED);
            }
        },
        blogDeleted: {
            type: GraphQLString,
            subscribe: () => {
                return pubsub.asyncIterator(BLOG_DELETED)
            }
        }
    }
})


export const schema = new GraphQLSchema({ query, mutation, subscription });