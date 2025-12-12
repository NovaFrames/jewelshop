import HomePage from "../../components/Home/HomePage";
import LandingPage from "../../components/Home/LandingPage";
import GoldRate from "../../components/GoldRate/GoldRate";
import HomeSlider from "../../components/Home/HomeSlider";

export default function Home() {
  return (
    <>
      <LandingPage />
      <GoldRate />
      <HomeSlider />
      <HomePage />
    </>
  );
}
