import type {Express} from 'express';
import path = require('path');
import { createUserWithPassword, looseGetPassword } from './authMapper';
import { CreateAccountProps } from './authTypes';
import {hash, verify} from 'argon2';
import { AUTH_HEADER, createSession } from './sessionUtils';
import { updateSessionTimeout } from './sessionMapper';


const salt = process.env.SALT || 'mySaltySalt';
const pepper = process.env.PEPPER || 'mySaltyPepper';

const maxAge = 60 * 60 * 1000;

export default (app: Express) => {      

    const addSalt = (password: string) => {
        return `${salt}+${password}+${pepper}`;
    }

    const hashPassword = async (password: string) => {
        return await hash(addSalt(password));
    }

    app.get('/login', (req, res, next) => {
        res.clearCookie('failedAuth');
        return next();
    });

    app.post('/login', async (req, res, next) => {
        const body = req.body;
        try {
            const {userId, password} = await looseGetPassword(body.name);
            if (await verify(password, addSalt(body.password))) {
                const sessionId = createSession(userId);
                res.cookie(AUTH_HEADER, sessionId, {
                    maxAge,
                    domain: req.hostname,
                })
                res.clearCookie('failedAuth'); 
                res.redirect('/');
                return next();
            }
        } catch(err) {}

        res.cookie('failedAuth', true);
        res.status(403);
        console.log('Failed Auth cookie set');
        
        return next();
    });

    app.post('/createAccount', async (req, res, next) => {
        res.clearCookie('failedAuth');
        const body: CreateAccountProps = req.body;
        const hashedPassword = await hashPassword(body.password);
        createUserWithPassword(body.username, body.email, hashedPassword);
        res.redirect('/login');
        next();
    })

    app.get('/user', async (req, res, next) => {
        if (!req.session) {
            return next();
        }
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(req.session));
    });

    app.get('/logout', async (req, res,next) => {
        if (req.session) {
            updateSessionTimeout(req.session.session.sessionId)
            res.clearCookie(AUTH_HEADER)
        }
        res.redirect('/');
    })

}