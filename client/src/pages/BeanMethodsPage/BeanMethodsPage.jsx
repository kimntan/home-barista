import CoffeeDetails from '../../components/CoffeeDetails/CoffeeDetails';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './BeanMethodsPage.scss';

export default function BeanMethodsPage() {
  return (
    <div className="bean-methods-page">
      <Header />
      <div className="bean-methods-page__main">
        <CoffeeDetails />
        <Footer />
      </div>
    </div>
  );
}