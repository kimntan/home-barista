import './AddBeanForm.scss';

export default function AddBeanForm() {
  return (
    <form className="new-bean">
      <h2 className="new-bean__heading">NEW BEAN</h2>
      <label className="new-bean__label">
        <h3>BEAN<span className="new-bean__asterisk"> *</span></h3>
        <input type="text" name="name" className="new-bean__input"/>
      </label>
      <label className="new-bean__label">
        <h3>BRAND<span className="new-bean__asterisk"> *</span></h3>
        <input type="text" name="brand" className="new-bean__input"/>
      </label>
      <label className="new-bean__label">
        <h3>PRODUCT URL</h3>
        <input type="text" name="product_url" className="new-bean__input"/>
      </label>
      <label className="new-bean__label">
        <h3>ROAST</h3>
        <select name="roast" className="new-bean__input new-bean__input--select">
          <option value="">Select roast level</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="new-bean__label">
        <h3>NOTES</h3>
        <input type="text" name="notes" placeholder="i.e. caramel, cherry..." className="new-bean__input"/>
      </label>
      <label className="new-bean__lable">
        <h3>IMAGE UPLOAD</h3>
        <div className="new-bean__placeholder-image">
          <button className="new-bean__image-upload">+</button>
          <span className="new-bean__image-name">BEAN</span>
          <span className="new-bean__image-brand">By Brand</span>
        </div>
      </label>
      <div className="new-bean__buttons">
        <button className="new-bean__cancel">Cancel</button>
        <button type="submit" className="new-bean__add">Add</button>
      </div>
    </form>
  )
}