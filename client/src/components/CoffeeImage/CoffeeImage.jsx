import { useNavigate } from 'react-router-dom';
import './CoffeeImage.scss';

export default function CoffeeImage({bean}) {
  const navigate = useNavigate();

  return (
    <div className="coffee-image">
      <img src={bean ? bean.image : null} alt={bean ? bean.bean_name : null} className="coffee-image__image"></img>
      <button className="coffee-image__back" onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}
