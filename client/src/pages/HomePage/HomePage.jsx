import Header from '../../components/Header/Header';
import CoffeeBeans from '../../components/CoffeeBeans/CoffeeBeans';
import BrewMethods from '../../components/BrewMethods/BrewMethods';
import Footer from '../../components/Footer/Footer';
import Hero from '../../assets/images/hero.jpeg';
import './HomePage.scss';

export default function HomePage () {
  return (
    <div className="home">
      <Header />
      <div className="home__main">
        <img src={Hero} alt="Person distributing coffee grinds in portafilter" className="home__hero"/>
        <div className="home__main-content">
          <CoffeeBeans /> 
          <BrewMethods />
          <Footer />
        </div>
      </div>
    </div>
  )
}