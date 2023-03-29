
export type SessionInfo = {
    user: User,
    session: Session
}

export type Session = {
    sessionId: string,
    expiresAt: string
}

export type User = {
    userName: string,
    email: string,
    authority: 'user' | 'admin',
}