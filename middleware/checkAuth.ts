import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    console.log("the role is", req.user);
    if(req.user.role === "admin") {
      return res.redirect("/admin")
    } else {
      return next();
    }
  } else {
    res.redirect("/auth/login");
  }
  
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
    }

  

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
}
