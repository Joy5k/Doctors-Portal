import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AvailableAppoinment from "../../Pages/Appointment/AvailableAppoinment/AvailableAppoinment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRout from "../PrivateRoute/PrivateRout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: ([
            {
                path: '/',
                element:<Home></Home>                
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/signup',
                element:<SignUp></SignUp>
            },
            {
                path: '/appointment',
                element:<Appointment></Appointment>
            },

            // {
            //     path: '/appointment',
            //     element:<PrivateRout><AvailableAppoinment></AvailableAppoinment></PrivateRout>
            // }
          
        ])
    },
    {
        path: '/dashboard',
        element: <PrivateRout><DashboardLayout></DashboardLayout></PrivateRout>,
        children: [
            {
                path: '/dashboard',
                element:<MyAppointment></MyAppointment>
            }
        ]
    }
])