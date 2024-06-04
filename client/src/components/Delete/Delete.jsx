import './Delete.scss';

export default function Delete({ trigger, setDeleteTrigger }) {
  const handleCancelDelete = () => {
    setDeleteTrigger(false);
  }
  
  return trigger ? (
    <> 
     <div className="delete"></div>
     <div className="delete__container">
       <div className="delete__window">
         <h3 className="delete__header">Are you sure you want to delete this bean?</h3>
         <div className="delete__buttons">
          <button className="delete__cancel" onClick={handleCancelDelete}>Cancel</button>
          <button className="delete__delete">Delete</button>
         </div>
       </div>
     </div>
   </>
 ) : null
}