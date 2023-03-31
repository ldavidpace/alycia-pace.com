import React from "react"
import AppContext from ".";


export const useAppContext = () => {
    return React.useContext(AppContext);
}