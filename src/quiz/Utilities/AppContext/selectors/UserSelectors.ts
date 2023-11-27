import React from 'react';

import { useAppContext } from '../AppContext';
import { User } from '../userTypes';

export const useCurrentUser = (): User | undefined => {
    const context = useAppContext();
    React.useDebugValue(context.user);
    return context.user;
}