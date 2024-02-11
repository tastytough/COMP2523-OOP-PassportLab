import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { isAdmin } from "../middleware/checkAuth";
import session from "express-session";

// const memoryStore = new session.MemoryStore();

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", isAdmin, (req, res, next) => {
    res.render("admin", {
      user: req.user,
      // sessions: sessions
    });
  });


export default router;
