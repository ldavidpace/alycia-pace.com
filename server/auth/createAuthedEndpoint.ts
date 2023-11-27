import type { request, response } from "express";


const sendUnauthed = (res: typeof response) => {
    res.statusCode = 403;
    res.send("Unable to authenticate");
}


export const requireAuth = (authRequirements: (string | ((req, res, next) => boolean)), callback: (req, res, next) => void) => {
    return (req: typeof request, res: typeof response, next) => {
        console.log('Require Auth');
        if (!req.session) {
            sendUnauthed(res);
            return 
        }

        if (typeof authRequirements === 'string') {
            if (authRequirements === 'admin' && req.session.user.authority !== 'admin') {
                sendUnauthed(res);
                return;
            }
        } else if (!authRequirements(req, res, next)) {
            sendUnauthed(res);
            return;
        }
        return callback(req,res,next);
    }
}