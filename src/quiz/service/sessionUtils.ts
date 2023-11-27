import type { SessionInfo } from '~Utilities/AppContext/userTypes';

export const getSessionInfo = (): Promise<SessionInfo| undefined> => {
    return fetch('/user').then((response) => response.json()).catch(() => {});
}