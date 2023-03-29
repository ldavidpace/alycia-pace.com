import * as React from 'react';
import { User } from './userTypes';


const context = React.createContext<{
    user?: User
}>({});



export default context;