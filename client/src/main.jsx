import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './Users.jsx';
import User from './user.jsx';
import Update from './Update.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    children:[
      {
        path: "/users",
        element: <Users />,
        loader: ()=> fetch("http://localhost:5000/users")
      },
      {
        path: "/user/:id",
        element: <User />,
        loader: ({params})=> fetch(`http://localhost:5000/user/${params.id}`)
      },
      {
        path: "/update/:id",
        element: <Update />,
        loader: ({params})=> fetch(`http://localhost:5000/user/${params.id}`)
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
