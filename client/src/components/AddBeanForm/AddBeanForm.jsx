import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAddBeanForm } from '../../utils/hooks/form-hooks';
import { usePostBean } from '../../utils/hooks/post-hooks';
import { beanValidator } from '../../utils/validators/add-bean';
import Loader from '../Loader/Loader';
import PopUp from '../PopUp/PopUp';
import './AddBeanForm.scss';

export default function AddBeanForm() {
  const navigate = useNavigate();

  const {
    photoUpload,
    setPhotoUpload,
    values,
    setValues,
    imageFile,
    setImageFile,
    handleInputChange,
    handleImageFileChange,
    uploadedImage,
    setUploadedImage,
    handlePhotoUpload,
    bean,
    brand,
  } = useAddBeanForm();

  const { loading, error, success, setBeanData } = usePostBean();
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddBeanSubmit = (event) => {
    event.preventDefault();
    const beanValidation = beanValidator(values);
    if (!beanValidation.valid) {
      setErrorMessage(beanValidation.message);
    } else {
      setErrorMessage('');
      const formData = new FormData();
      formData.append("bean_name", values.name);
      formData.append("brand", values.brand);
      formData.append("roast_type", values.roast);
      formData.append("tasting_notes", values.notes);
      formData.append("product_url", values.product_url);
      formData.append("image", values.image_url || imageFile)
      setBeanData(formData);
    }
  }

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [success, error, navigate])

  return (
    <form className="new-bean" onSubmit={handleAddBeanSubmit}>
      <h2 className="new-bean__heading">NEW BEAN</h2>

      <label className="new-bean__label">
        <h3>BEAN<span className="new-bean__asterisk"> *</span></h3>
        <input 
          type="text" 
          name="name" 
          className={errorMessage.includes("name") ? "new-bean__input new-bean__input--invalid" : "new-bean__input"} 
          onChange={handleInputChange} 
          value={values.name}
        />
      </label>

      <label className="new-bean__label">
        <h3>BRAND<span className="new-bean__asterisk"> *</span></h3>
        <input 
          type="text"
          name="brand" 
          className={errorMessage.includes("brand") ? "new-bean__input new-bean__input--invalid" : "new-bean__input"} 
          onChange={handleInputChange} 
          value={values.brand}
        />
      </label>

      <label className="new-bean__label">
        <h3>ROAST</h3>
        <select 
          name="roast" 
          className="new-bean__input new-bean__input--select" 
          onChange={handleInputChange} 
          value={values.roast}
        >
          <option value="">Select roast level</option>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Dark">Dark</option>
        </select>
      </label>
      
      <label className="new-bean__label">
        <h3>NOTES</h3>
        <input 
          type="text" 
          name="notes" 
          placeholder="i.e. caramel, cherry..." 
          className="new-bean__input" 
          onChange={handleInputChange} 
          value={values.notes}
        />
      </label>

      <label className="new-bean__label">
        <h3>PRODUCT URL</h3>
        <input 
          type="text"
          name="product_url" 
          className="new-bean__input" 
          onChange={handleInputChange} 
          value={values.product_url}/>
      </label>

      { !photoUpload ? 
      <label className="new-bean__label">
        <h3>IMAGE UPLOAD</h3>
        <div className="new-bean__placeholder-image" style={{backgroundImage: `url(${uploadedImage})`}}>
          <button className="new-bean__image-upload" onClick={() => setPhotoUpload(true)}>+</button>
          <span className="new-bean__image-name">{uploadedImage ? null : bean}</span>
          <span className="new-bean__image-brand">{uploadedImage ? null : brand}</span>
        </div>
      </label> 
      :
      <>
        <h3>IMAGE UPLOAD</h3>
        <div className="photo-upload">
          <label className="photo-upload__url">
            <h3>URL</h3>
            <input 
              type="text" 
              name="image_url" 
              className="new-bean__input" 
              onChange={handleInputChange} 
              value={values.image_url}
            />
          </label>

          <div className="photo-upload__divider">
            <span className="photo-upload__or">or</span>
          </div>

          <input 
            type="file" 
            name="image" 
            className="photo-upload__file-input" 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={handleImageFileChange}
            files={imageFile}
          />
 
          <div className="new-bean__buttons">
            <button 
              className="new-bean__cancel" 
              onClick={() => {
                setPhotoUpload(false);
                setValues({...values, image_url: ''});
                setImageFile('');
                setUploadedImage(null);
              }}>Cancel</button>
            <button type="submit" className="photo-upload__upload" onClick={handlePhotoUpload}>Done</button>
          </div>
        </div>
      </>
      }
      
      <div className="new-bean__buttons">
        <Link to={"/"} className="new-bean__cancel-link">
          <button className="new-bean__cancel">Cancel</button>
        </Link>
        {loading 
          ? <button type="submit" className="new-bean__add" disabled>Add</button> 
          : <button type="submit" className="new-bean__add">Add</button>
        }
      </div>
      <PopUp trigger={success ? success : error ? error : null} />
    </form>
  )
}