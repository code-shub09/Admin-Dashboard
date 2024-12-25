// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import App from './App.jsx'
// // import {RouterProvider,  createBrowserRouter } from 'react-router-dom'

// // import AppWrapper from './store/Xcontext.jsx'
// // const route=createBrowserRouter([
// //   {
// //     path:'/',element:<App></App>,children:[

// //     ]

// //   }
// // ])

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <AppWrapper>
// //        <RouterProvider  router={route}></RouterProvider>
// //     </AppWrapper>
// //   </StrictMode>,
// // )
// import React, { createContext, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import AppProvider from "./store/Xcontext.jsx";

// // export const Context = createContext({ isAuthenticated: false });

// // const AppWrapper = () => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [admin, setAdmin] = useState({});

// //   return (
// //     <Context.Provider
// //       value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}
// //     >
// //       <App />
// //     </Context.Provider>
// //   );
// // };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppProvider>
//       <App></App>
//     </AppProvider>
//   </React.StrictMode>
// );

import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin,baseUrl}}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);