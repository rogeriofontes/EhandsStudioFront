import Header from "./components/Header";
import MainBanner from "./components/MainBanner";
import NewReleases from "./components/NewReleases";
import Highlights from "./components/Highlights";
import HandmadeBeauty from "./components/HandmadeBeauty";
import SocialSection from "./components/SocialSection";
import SubscribeSection from "./components/SubscribeSection";
import Footer from "./components/Footer";

export const metadata = {
  description: "",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <MainBanner />
      <NewReleases />
      <Highlights />
      <HandmadeBeauty />
      <SocialSection />
      <SubscribeSection />
      <Footer />
    </>
  );
}
