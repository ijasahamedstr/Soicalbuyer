
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
import Service from "views/examples/Service";
import ServiceView from "views/examples/ServiceView";
import ServiceRequest from "views/examples/Service Request";
import ServiceRequestview from "views/examples/Service Request view";
import AccountBoost from "views/examples/Account Boost";



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
    path: "/Game-Account",
    name: "Games Accounts",
    icon: "ni ni-single-02 text-yellow",
    component: < GameAccounts/>,
    layout: "/admin",
  },
  {
    path: "/service",
    name: "service",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Service />,
    layout: "/admin",
  },
  {
    path: "/Service-Request",
    name: "Service Request",
    icon: "ni ni-bullet-list-67 text-red",
    component: <ServiceRequest />,
    layout: "/admin",
  },
  {
    path: "/Account-Boost",
    name: "Account Boost",
    icon: "ni ni-money-coins text-orange",
    component: <AccountBoost />,
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
  {
    path: "/serviceView/:id",
    component: <ServiceView/>,
    layout: "/admin",
  },
  {
    path: "/servicerequestView/:id",
    component: <ServiceRequestview/>,
    layout: "/admin",
  },
  
];
export default routes;
