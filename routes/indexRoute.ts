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

router.get("/destroy/:sid", (req, res) => {
  const sid = req.params.sid;
  req.sessionStore.destroy(sid, (error: any) => {
    if(error) {
      console.log(error)
    } else {
      res.redirect("/admin")
    }
  })
})

export default router;
