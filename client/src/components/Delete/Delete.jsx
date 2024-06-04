import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBean } from '../../utils/hooks/delete-hooks';
import Loader from '../Loader/Loader';
import './Delete.scss';

export default function Delete({ trigger, setDeleteTrigger, beanId }) {
  const navigate = useNavigate();
  const { loading, error, success, setDeleteConfirm } = useDeleteBean(beanId)
  
  const handleCancelDelete = () => {
    setDeleteTrigger(false);
  }

  const handleDeleteConfirm = () => {
    setDeleteConfirm(true);
  }

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [success, error])
  
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
                <h3 className="delete__header">Are you sure you want to delete this bean?</h3>
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