import { Router } from "express";
import { BlogService } from "../services";
import { BlogController } from "../controllers";

export const blogRouter = Router();

const blogService = new BlogService();
const blogController = new BlogController(blogService);

blogRouter.get("/", blogController.getAllBlogs.bind(blogController));
blogRouter.get("/:id", blogController.getBlogById.bind(blogController));
blogRouter.post("/", blogController.createBlog.bind(blogController));
blogRouter.put("/:id", blogController.updateBlog.bind(blogController));
blogRouter.delete("/:id", blogController.deleteBlog.bind(blogController));
blogRouter.patch("/:id/restore", blogController.restoreBlog.bind(blogController));

