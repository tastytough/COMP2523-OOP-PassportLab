import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
import passportGitHubStrategy from "../middleware/passportStrategies/githubStrategy";

declare module "express-session" {
  interface SessionData {
    messages: string[]
  }
}
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const messages = req.session.messages;
  if(messages) {
    res.render("login", { message: messages })
  } else {
  res.render("login", {message: ""});
  }
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);
router.get("/github", 
passport.authenticate("github", { scope: [ "profile" ] })
);

router.get("/github/callback",
  passport.authenticate("github", { 
    successRedirect: '/auth/login',
    failureRedirect: '/auth/login' }),
  )


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
