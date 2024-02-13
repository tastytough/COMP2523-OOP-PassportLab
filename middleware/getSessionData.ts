import { Request, Response, NextFunction } from 'express';

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.sessionStore.all === undefined) {
        console.log("It can't be undefined")
    } else {
        req.sessionStore.all((err: any, sessions: any) => {
            if (err) {
                return next(err);
            }
             const sessionIds = Object.keys(sessions);
            const sessionData = sessionIds.map(sessionId => {
                const sid = sessionId;
                const userID = sessions[sessionId].passport.user;
                return { sessionID: sid, userID: userID } 
            })
            res.locals.sessionData = sessionData;
            next();
        });
    }
};

export default sessionMiddleware;


