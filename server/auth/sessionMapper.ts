import {insert, get, update} from "../database";


export const recordSession =  async (sessionId, userId, expiresAt) => {
    return await insert(
        `
            INSERT into sessions (sessionId, userId, expiresAt)
            values ($sessionId, $userId, $expiresAt)
        `, {
            sessionId, 
            userId, 
            expiresAt
        }
    )
}

export const getSessionInfo = async (sessionToken: string) => {
    return await get(
        `SELECT userId, sessionId, expiresAt FROM sessions where sessionId = $sessionToken`,
        {sessionToken},
    )
}

export const updateSessionTimeout = async (sessionToken: string) => {
    return await update(
        `UPDATE sessions set
            expiresAt=$timestamp
            where sessionId = $sessionToken
        `, {
            timestamp: Date.now(),
            sessionToken
        }
    )
}

