import Game from "../Featuredgamingaccounts/Featuredgamingaccounts";
import HeroImage from "../HeroSection/Hero";
import Services from "../Services/Services";
import Counting from "../countingCard/countingCard";
import Review from "../review/review";
import Soicalaccount from "../SocialMediaAccounts/SocialMediaAccounts";


function Home() {
    return (
      <>
      <HeroImage/>
      <Services/>
      <Soicalaccount/>
      <Game/>
      <Counting/>
      <Review/>
      </>
    );
  }
  
  export default Home;