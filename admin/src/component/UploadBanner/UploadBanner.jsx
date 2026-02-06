import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './UploadBanner.css';

function UploadBanner() {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    image: null,
    imageName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imageName: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="card upload-banner-card">
      <div className="card-header">
        <div>
          <div className="card-title">Upload Banner</div>
          <div className="card-subtitle">Add a new banner for your homepage.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-vertical">
        <div className="form-row">
          <div className="form-field">
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              className="form-select-mui"
            >
              <MenuItem value=""><em>Select category</em></MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </TextField>
          </div>

          <div className="form-field">
            <TextField
              select
              label="Sub Category"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              className="form-select-mui"
            >
              <MenuItem value=""><em>Select sub category</em></MenuItem>
              <MenuItem value="phones">Phones</MenuItem>
              <MenuItem value="laptops">Laptops</MenuItem>
              <MenuItem value="mens-wear">Men's Wear</MenuItem>
              <MenuItem value="womens-wear">Women's Wear</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="kitchen">Kitchen</MenuItem>
            </TextField>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="banner-image">
            Upload Image
          </label>
          <div className="file-upload-area">
            <input
              type="file"
              id="banner-image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="banner-image" className="file-upload-label">
              {formData.imageName ? formData.imageName : 'Choose a banner image...'}
            </label>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" className="btn ghost">
            Cancel
          </Button>
          <Button type="submit" className="btn primary">
            Upload Banner
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadBanner;