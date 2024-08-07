/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import SocialMediaAccounts from "views/examples/SocialMediaAccounts";
import ViewProfile from "views/examples/ViewProfile";
import UserList from "views/examples/UserList";
// import Icons from "views/examples/Icons.js";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/UserList",
    name: " User Accounts",
    icon: "ni ni-circle-08 text-red",
    component: <UserList/>,
    layout: "/admin",
  },
  {
    path: "/Social-Media-Accounts",
    name: "Social Media Accounts",
    icon: "ni ni-atom text-orange",
    component: <SocialMediaAccounts/>,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Accounts Active",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Leaderboard",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/View-Profile",
    component: <ViewProfile/>,
    layout: "/admin",
  },
  
];
export default routes;
