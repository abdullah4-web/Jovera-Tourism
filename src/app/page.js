import Footer from "./components/footer/Footer";
import HomeNavbar from "./components/homeNavbar/HomeNavbar";
import HomePage from "./pages/HomePage";
export default function Home() {
  return (
    <div className='homePageContainer'>
      <HomeNavbar />
      <HomePage />
      <Footer />
    </div>
  );
}
