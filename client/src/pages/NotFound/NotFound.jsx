import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <Header />
      <div className="not-found__main">
        <h2 className='not-found__heading'>404 - Page Not Found</h2>
        <p className='not-found__message'>Sorry, the page you are looking for could not be found.</p>
      </div>
      <Footer />
    </div>
  )
}