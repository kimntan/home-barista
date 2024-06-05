import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelete } from '../../utils/hooks/delete-hooks';
import Loader from '../Loader/Loader';
import './Delete.scss';

export default function Delete({ trigger, setDeleteTrigger, item, id, nav }) {
  const navigate = useNavigate();
  const { loading, error, success, setDeleteConfirm } = useDelete(item, id)
  
  const handleCancelDelete = () => {
    setDeleteTrigger(false);
  }

  const handleDeleteConfirm = () => {
    setDeleteConfirm(true);
  }

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        navigate(nav);
      }, 1000);
    }
  }, [success, error, navigate, nav])
  
  return trigger ? (
    <> 
     <div className="delete"></div>
     <div className="delete__container">
       <div className="delete__window">
        {success ? 
          <>
            <h3 className="pop-up__header">{success}</h3>
            <p className="pop-up__text">Redirecting...</p>
            <Loader />
          </>
          : error ? 
            <>
              <h3 className="pop-up__header">{error}</h3>
              <p className="pop-up__text">Redirecting...</p>
              <Loader />
            </>
            : <>
                <h3 className="delete__header">Are you sure you want to delete this {item}?</h3>
                {loading 
                  ? <Loader /> 
                  : <div className="delete__buttons">
                      <button className="delete__cancel" onClick={handleCancelDelete}>Cancel</button>
                      <button className="delete__delete" onClick={handleDeleteConfirm}>Delete</button>
                    </div>
                }
              </>}
       </div>
     </div>
   </>
 ) : null
}