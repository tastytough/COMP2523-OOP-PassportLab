import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

declare global {
  namespace Express {
    interface User {
      email: string;
      id: number;
      name: string;
      password: string;
      role: string;
    }
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
  try {
    const user = getUserByEmailIdAndPassword(email, password);
      done(null, user!)
  } catch (error: any) {
      done(null, false, {
          message: error.message,
        });
    }
  }
);

type DoneFnForSerializeUser = (err: any, id: number) => void;
type DoneFnForDeserializeUser = (err: any, user?: Express.User | false | null) => void;

passport.serializeUser(function (user: Express.User, done: DoneFnForSerializeUser)  {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: DoneFnForDeserializeUser) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
