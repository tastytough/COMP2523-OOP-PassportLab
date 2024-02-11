import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { isAdmin } from "../middleware/checkAuth";
import session from "express-session";
import { sessionMiddleware } from "../middleware/getSessionData";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", isAdmin, sessionMiddleware, (req, res) => {
    res.render("admin", {
      user: req.user,
      sessionDatas: res.locals.sessionData,
    });
  });

router.post("/admin", isAdmin, (req, res, next) => {
  if(req.sessionStore.all === undefined) {
    console.log("It can't be undefined")
} else {
    req.sessionStore.all((err: any, sessions: any) => {
        if (err) {
            return next(err);
        }
        const sessionIds = Object.keys(sessions);
            const destroySessionData = sessionIds.map(sessionId => {
                req.sessionStore.destroy(sessionId, (error: any) => {
                  if(error) {
                    console.log(error)
                  }
                })
            })
    })
  }
  res.redirect("/auth/login")
})

export default router;
