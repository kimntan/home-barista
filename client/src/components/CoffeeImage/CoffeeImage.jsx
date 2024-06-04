import { useNavigate } from 'react-router-dom';
import PlainCoffeeBag from '../../assets/images/placeholder-coffee.jpeg';
import './CoffeeImage.scss';

export default function CoffeeImage({bean, back}) {
  const navigate = useNavigate();

  return (
    <div className="coffee-image">
      <img src={bean ? bean.image ? bean.image : PlainCoffeeBag : null} alt={bean ? bean.bean_name : null} className="coffee-image__image"></img>
      <button className="coffee-image__back" onClick={() => navigate(back)}>Back</button>
    </div>
  )
}
