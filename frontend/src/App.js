import React, { useEffect, useState } from 'react';
import AlertDismissibleExample from "./component/Page/Alert/topbar";
import Navbar from "./component/Page/Navigation/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Page/Home/Home";
import Social from "./component/Page/SocialMedias/SocialMedias";
import Users from "./component/Page/Users/Users";
import Market from "./component/Page/MarketHistory/marketHistory";
import './css/main.css';
import Footer from "./component/Page/Footer/Footer";
import Gamesaccount from "./component/Page/Games/Games";
import Servicesuser from "./component/Page/Services-user/Services-user";
import Store from "./component/Page/USRGGStore/USRGGStore";
import LoginRegisterForm from "./component/Page/LoginPage/LoginRegistration";
import RegisterForm from "./component/Page/Register/Register";
import User from "./component/UserDashboard/User/User";
import Requests from "./component/UserDashboard/Requests/Requests";
import Sales from "./component/UserDashboard/sales/sales";
import Points from "./component/UserDashboard/Points/Points";
import Userboost from "./component/UserDashboard/Userboost/Userboost";
import Blocks from "./component/UserDashboard/blocks/blocks";
import Verifyaccount from "./component/UserDashboard/verifyAccount/verifyAccount";
import Gameview from "./component/Page/Games/Game-view";
import Wallet from "./component/UserDashboard/wallet/wallet";
import Chat from "./component/UserDashboard/chat/chat";
import Notifications from "./component/UserDashboard/notifications/notifications";
import Challenges from "./component/UserDashboard/challenges/challenges";
import SoiaclAcoountView from "./component/Page/SocialMediaAccounts/SocialMediaAccountsView";
import Userview from "./component/Page/Users/userview";
import LoginOTP from "./component/Page/LoginPage/LoginOTP";
import Error from "./component/UserDashboard/Error";
import Dashboard from "./component/UserDashboard/Test";
import Register from './component/UserDashboard/Register';
import Update from './component/UserDashboard/Update';
import PointTransfer from './component/check';
import Sell from './component/Page/sell/sell';
import SellSocial from './component/Page/sell/sell.social';
import Sellgaming from './component/Page/sell/sell.gaming';
import Sellservice from './component/Page/sell/sell.service';
import GameEdit from './component/Page/Games/GameEdit';
import Editsocial from './component/Page/SocialMediaAccounts/SocialMediaeditAccountsView';
import Serviceview from './component/Page/Services-user/Service-view';
import ServiceEdit from './component/Page/Services-user/ServiceEdit';



function App() {
  const [userdata, setUserdata] = useState({});
  const [isOTPLoggedIn, setIsOTPLoggedIn] = useState(false);
  const [OTPLoggedUserData, setOTPLoggedUserData] = useState([]);
  useEffect(() => {
    
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetails);
    
    if (userDetails) {
      setUserdata(userDetails);
    
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  console.log("::: user data", userdata);
  console.log("response", userdata);

  return (
    <>
      <AlertDismissibleExample />
      <Router>
        <Navbar isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/التواصل الإجتماعي" element={<Social />} />
          <Route path="/الألعاب" element={<Gamesaccount />} />
          <Route path="/الخدمات" element={<Servicesuser />} />
          <Route path="/الأعضاء" element={<Users userdata={userdata} />} />
          <Route path="/طلبات المستخدمين" element={<Market />} />
          <Route path="/متجر المنصة" element={<Store />} />
          <Route path="/تسجيل الدخول" element={<LoginRegisterForm  userdata={userdata}/>} />
          <Route path="/تسجيل حساب جديد" element={<RegisterForm />} />
          <Route path={`/${userdata?.username}`} element={<User userdata={userdata} />} />
          <Route path="/Requests" element={<Requests />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/Points" element={<Points />} />
          <Route path="/boost" element={<Userboost />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/verify-account" element={<Verifyaccount />} />
          <Route path="/game-view/:id" element={<Gameview isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData} />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/social-media-accounts-view/:id" element={<SoiaclAcoountView />} />
          <Route path="/UserView" element={<Userview />} />
          <Route path="/Dashboard" element={<Dashboard  userdata={userdata} />} />
          <Route path="/OTP" element={<LoginOTP setIsOTPLoggedIn={setIsOTPLoggedIn} setOTPLoggedUserData={setOTPLoggedUserData} />} />
          <Route path="*" element={<Error />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/Update" element={<Update/>} />
          <Route path="/check" element={<PointTransfer/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/sell/social" element={<SellSocial userdata={userdata} />} />
          <Route path="/sell/gaming" element={<Sellgaming userdata={userdata} />} />
          <Route path="/sell/service" element={<Sellservice userdata={userdata} />} />
          <Route path="/gameedit/:id" element={<GameEdit isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData}/>}/>
          <Route path="/soicaledit/:id" element={<Editsocial isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData}/>}/>
          <Route path="/Service-view/:id" element={<Serviceview isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData} />} />
          <Route path="/ServiceEdit/:id" element={<ServiceEdit isOTPLoggedIn={isOTPLoggedIn} OTPLoggedUserData={OTPLoggedUserData} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
