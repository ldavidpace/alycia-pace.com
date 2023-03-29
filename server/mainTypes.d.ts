declare namespace Express {
    export interface Request {
       session?: {
         user: {
            userId: number,
            authority: 'user' | 'admin',
         },
         session: {
            expiresAt: number,
            sessionId: string,

         }
       }
    }
 }