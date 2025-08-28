import { Router } from "express";
import { BlogService } from "../services";
import { BlogController } from "../controllers";
import { authMiddleware } from "../middlewares";

export const blogRouter = Router();

const blogService = new BlogService();
const blogController = new BlogController(blogService);

blogRouter.get("/", blogController.getAllBlogs.bind(blogController));
blogRouter.get("/:id", blogController.getBlogById.bind(blogController));
blogRouter.post("/", authMiddleware, blogController.createBlog.bind(blogController));
blogRouter.put("/:id", authMiddleware, blogController.updateBlog.bind(blogController));
blogRouter.delete("/:id", authMiddleware, blogController.deleteBlog.bind(blogController));
blogRouter.patch("/:id/restore", authMiddleware, blogController.restoreBlog.bind(blogController));

