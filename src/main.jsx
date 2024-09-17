import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from "../pages/Login.jsx";
import DeleteStudent from "../pages/DeleteStudent.jsx";
import GetStudent from "../pages/GetStudent.jsx";
import UpdateStudent from "../pages/UpdateStudent.jsx";
import Home from "../pages/Home.jsx";
import SubmitStudent from "../pages/SubmitStudent.jsx";
import Exam from "../pages/Exam.jsx";
import ErrorPage from '../pages/ErrorPage.jsx';
import Result from '../pages/Result.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "/delete", element: <DeleteStudent /> },
      { path: "/get", element: <GetStudent /> },
      { path: "/submit", element: <SubmitStudent /> },
      { path: "/update", element: <UpdateStudent /> },
      { path: "/exam", element: <Exam /> },
      {
        path: "/result", element: <Result />
      }
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
