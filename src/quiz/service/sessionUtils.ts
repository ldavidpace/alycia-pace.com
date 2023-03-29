import { SessionInfo } from "../AppContext/userTypes";


export const getSessionInfo = (): Promise<SessionInfo| undefined> => {
    return fetch('/user').then((response) => response.json()).catch(() => {});
}