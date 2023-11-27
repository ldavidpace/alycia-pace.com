
export type SessionInfo = {
    user: User,
    session: Session
}

export type Session = {
    userId: number,
    sessionId: string,
    expiresAt: string
}

export type User = {
    userId: string,
    userName: string,
    email: string,
    authority: 'user' | 'admin',
}