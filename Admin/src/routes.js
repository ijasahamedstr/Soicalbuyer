
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import SocialMediaAccounts from "views/examples/SocialMediaAccounts";
import ViewProfile from "views/examples/ViewProfile";
import UserList from "views/examples/UserList";
import ActiveAccountList from "views/examples/ActiveAccountList";
import ActiveAccountListView from "views/examples/ActiveAccountListView";
import UserAccountsView from "views/examples/UserAccountsView";
import SocialMediaAccountsView from "views/examples/SocialMediaAccountsView";
import GameAccounts from "views/examples/GameAccounts";
import GameAccountsView from "views/examples/GameAccountsView";



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
    path: "/ActiveAccountList",
    name: " User Active Accounts",
    icon: "ni ni-circle-08 text-green",
    component: <ActiveAccountList/>,
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
    name: "Games Accounts",
    icon: "ni ni-single-02 text-yellow",
    component: < GameAccounts/>,
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



  {
    path: "/user/:id",
    component: <UserAccountsView/>,
    layout: "/admin",
  },
  {
    path: "/activeAccountList/:id",
    component: <ActiveAccountListView/>,
    layout: "/admin",
  },
  {
    path: "/soicalAccountView/:id",
    component: <SocialMediaAccountsView/>,
    layout: "/admin",
  },
  {
    path: "/GameAccountView/:id",
    component: <GameAccountsView/>,
    layout: "/admin",
  },
  
];
export default routes;
