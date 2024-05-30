import AddBeanForm from '../../components/AddBeanForm/AddBeanForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AddBeanPage.scss';

export default function AddBeanPage() {
  return (
    <div className="add-bean-page">
      <Header />
      <div className="add-bean-page__main">
        <AddBeanForm />
        <Footer />
      </div>
    </div>
  )
}