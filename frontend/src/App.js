import AlertDismissibleExample from "./component/Page/Alert/topbar";
import Navbar from "./component/Page/Navigation/Navigation";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
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
import Test from "./component/UserDashboard/Test";
import Chat from "./component/UserDashboard/chat/chat";
import Notifications from "./component/UserDashboard/notifications/notifications";
import Challenges from "./component/UserDashboard/challenges/challenges";
import SoiaclAcoountView from "./component/Page/SocialMediaAccounts/SocialMediaAccountsView";
import Userview from "./component/Page/Users/userview";
import LoginOTP from "./component/Page/LoginPage/LoginOTP";
import Error from "./component/UserDashboard/Error";


function App() {
  return (
    <>
    <AlertDismissibleExample/>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/التواصل الإجتماعي" element={<Social/>}/>
      <Route path="/الألعاب" element={<Gamesaccount/>}/>
      <Route path="/الخدمات" element={<Servicesuser/>}/>
      <Route path="/الأعضاء" element={<Users/>}/>
      <Route path="/طلبات المستخدمين" element={<Market/>}/>
      <Route path="/متجر المنصة" element={<Store/>}/>
      <Route path="/تسجيل الدخول" element={<LoginRegisterForm/>}/>
      <Route path="/تسجيل حساب جديد" element={<RegisterForm/>}/>
      <Route path="/User" element={<User/>}/>
      <Route path="/Requests" element={<Requests/>}/>
      <Route path="/sales" element={<Sales/>}/>
      <Route path="/Points" element={<Points/>}/>
      <Route path="/boost" element={<Userboost/>}/>
      <Route path="/blocks" element={<Blocks/>}/>
      <Route path="/verify-account" element={<Verifyaccount/>}/>
      <Route path="/game-view" element={<Gameview/>}/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/Chat" element={<Chat/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/challenges" element={<Challenges/>}/>
      <Route path="/social-media-accounts-view" element={<SoiaclAcoountView/>}/>
      <Route path="/UserView" element={<Userview/>}/>
      <Route path="/Test" element={<Test/>}/>
      <Route path="/OTP" element={<LoginOTP/>}/>
      <Route path="*" element={<Error/>} />
    </Routes>
    </Router>
    <Footer/>


    </>
  );
}

export default App;