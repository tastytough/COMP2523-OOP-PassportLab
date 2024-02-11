import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import dotenv from 'dotenv'; 
import passport from 'passport';
import { createUser, getUserById } from '../../controllers/userController';
dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "d0151ba8394e47efb485",
        clientSecret: "de5aeb15b1e1167c830b82bd7715e96b38ab7ca9",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },

    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        try {
            const user = createUser(profile.id, profile);
            return done(null, user);
        } catch (error: any) {
            return done(error);
        }
    }
);


type DoneFnForSerializeUser = (err: any, id: number) => void;
type DoneFnForDeserializeUser = (err: any, user?: Express.User | false | null) => void;


passport.serializeUser(function(user: Express.User, done: DoneFnForSerializeUser) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id: number, done: DoneFnForDeserializeUser) {
    let user = getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  });

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};


export default passportGitHubStrategy;
