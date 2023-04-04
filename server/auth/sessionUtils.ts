import { v4 as uuid } from 'uuid';

// import Keygrip from 'keygrip';
import { getUserInfo } from './authMapper';
import {
  getSessionInfo, recordSession,
} from './sessionMapper';


export const AUTH_HEADER = 'X_SMMOG_AUTHENTICATION';

// const keys = Keygrip(['497184c0-dbba-4c67-a975-15c8142742c5'], 'sha256');

export const createSession = (userId: number, duration = 24 * 60 * 60 * 1000) => {
    const sessionUuid = uuid();
    
    recordSession(sessionUuid, userId, Date.now() + duration);
    
    return sessionUuid;
}

export const validateSession = async (sessionToken: string) => {
    try {
        const session = await getSessionInfo(sessionToken);
        if (session && session.expiresAt > Date.now()) {
            return {
                session,
                user: await getUserInfo(session.userId)
            };
        }
    } catch(err) {
        console.log(err);
    }
}