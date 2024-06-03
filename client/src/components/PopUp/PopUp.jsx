import Loader from '../Loader/Loader';
import './PopUp.scss';

export default function PopUp({ trigger }) {
  return trigger ? (
    <> 
     <div className="pop-up"></div>
     <div className="pop-up__container">
       <div className="pop-up__window">
         <h3 className="pop-up__header">{trigger}</h3>
         <p className="pop-up__text">Redirecting...</p>
        <Loader />
       </div>
     </div>
   </>
 ) : null
}