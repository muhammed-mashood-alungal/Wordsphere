import { NextFunction, Request, Response } from "express";

export interface IBlogController {
    getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void>;
    createBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBlogById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    restoreBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
}
