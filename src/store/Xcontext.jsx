import { createContext, useState } from "react";


export const contextX=createContext();

function AppProvider({children}){
    const [IsAuthenticated,SetIsAuthenticated]=useState(false);
    
    return (
        <>

        <contextX.Provider value={{IsAuthenticated,SetIsAuthenticated,baseUrl}}>

            {children};
        </contextX.Provider>
        
        
        </>
    )

}

export default AppProvider;

