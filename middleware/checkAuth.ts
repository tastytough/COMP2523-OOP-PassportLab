import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      if(req.user.role === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/dashboard");
      }
    } else {
      next();
    }
  }

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
}
