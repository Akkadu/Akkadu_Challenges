import React,{createContext,useReducer} from 'react';
import  {reducer,initialState } from './reducer';


export let GlobalContext = createContext('INITIAL_VALUE')
export default function ContextProvider({children}){
    
    let [state,dispatch] = useReducer(reducer,initialState)
    
    return(
        <GlobalContext.Provider value={{state,dispatch}} >
            {children}
        </GlobalContext.Provider>
    )
}