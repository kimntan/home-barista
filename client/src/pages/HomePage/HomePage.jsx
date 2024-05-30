import Header from '../../components/Header/Header';
import CoffeeBeans from '../../components/CoffeeBeans/CoffeeBeans';
import Hero from '../../assets/images/hero.jpeg';
import './HomePage.scss';

export default function HomePage () {
  return (
    <>
      <Header />
      <div className="home__main">
        <img src={Hero} alt="Person distributing coffee grinds in portafilter" className="home__hero"/>
      </div>
      <CoffeeBeans />
    </>
  )
}