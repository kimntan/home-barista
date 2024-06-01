import BeanBrewMethods from '../BeanBrewMethods/BeanBrewMethods';
import './CoffeeDetails.scss';

export default function CoffeeDetails({ bean }) {
  return (
    <div className="coffee-details">
      <BeanBrewMethods />
      <div className="coffee-details__section">
        <h2 className="coffee-details__subheading">ABOUT</h2>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">NAME</h3>
          <span className="coffee-details__value">{bean.bean_name}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">BRAND</h3>
          <span className="coffee-details__value">{bean.brand}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">ROAST</h3>
          <span className="coffee-details__value">{bean.roast_type}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">NOTES</h3>
          <span className="coffee-details__value">{bean.tasting_notes}</span>
        </div>
      </div>
    </div>
  )

}