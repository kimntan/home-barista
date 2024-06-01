import { useState } from 'react';
import './AddBeanForm.scss';

export default function AddBeanForm() {
  const [photoUpload, setPhotoUpload] = useState(false);
  const initialValues = {
    name: '',
    brand: '',
    product_url: '',
    roast: '',
    notes: '',
    image_url: ''
  }
  const [values, setValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState(0);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const handlePhotoUpload = (event) => {
    event.preventDefault();
    setPhotoUpload(false);
    if (values.image_url) {
      setUploadedImage(values.image_url);
    }
    if (!values.image_url) {
      setUploadedImage(null);
    }
  }

  let bean = "BEAN";
  let brand = "By Brand";
  if (values.name) {
    bean = values.name;
  }
  if (values.brand) {
    brand = values.brand;
  }

  return (
    <form className="new-bean">
      <h2 className="new-bean__heading">NEW BEAN</h2>

      <label className="new-bean__label">
        <h3>BEAN<span className="new-bean__asterisk"> *</span></h3>
        <input 
          type="text" 
          name="name" 
          className="new-bean__input" 
          onChange={handleInputChange} 
          value={values.name}
        />
      </label>

      <label className="new-bean__label">
        <h3>BRAND<span className="new-bean__asterisk"> *</span></h3>
        <input 
          type="text"
          name="brand" 
          className="new-bean__input" 
          onChange={handleInputChange} 
          value={values.brand}
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

      <label className="new-bean__label">
        <h3>ROAST</h3>
        <select 
          name="roast" 
          className="new-bean__input new-bean__input--select" 
          onChange={handleInputChange} 
          value={values.roast}
        >
          <option value="">Select roast level</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="dark">Dark</option>
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

          <input 
            type="file" 
            name="image" 
            className="photo-upload__file-input" 
            accept="image/png, image/jpeg" 
            onChange={(event) => {setImageFile(event.target.files[0])}}
          />

          <div className="new-bean__buttons">
            <button className="new-bean__cancel" onClick={() => setPhotoUpload(false)}>Cancel</button>
            <button type="submit" className="photo-upload__upload" onClick={handlePhotoUpload}>Done</button>
          </div>
        </div>
      </>
      }
      
      <div className="new-bean__buttons">
        <button className="new-bean__cancel">Cancel</button>
        <button type="submit" className="new-bean__add">Add</button>
      </div>
    </form>
  )
}