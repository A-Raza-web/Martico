import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './CategoryManagement.css';

function UploadCategory() {
  const [formData, setFormData] = useState({
    name: '',
    color: '#000000',
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

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Category form submitted:', formData);
  };

  return (
    <div className="card upload-banner-card">
      <div className="card-header">
        <div>
          <div className="card-title">Upload Category</div>
          <div className="card-subtitle">Add a new product category to your store.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-vertical">
        <div className="form-row">
          <div className="form-field">
            <TextField
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              className="form-select-mui"
              required
            />
          </div>

          <div className="form-field">
            <TextField
              label="Category Color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              className="form-select-mui"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="category-image">
            Category Image
          </label>
          <div className="file-upload-area">
            <input
              type="file"
              id="category-image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {formData.image && (
              <div className="image-preview-box">
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="Preview" 
                  className="image-preview"
                />
              </div>
            )}
            <label htmlFor="category-image" className="file-upload-label">
              {formData.imageName ? formData.imageName : 'Choose a category image...'}
            </label>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" className="btn ghost">
            Cancel
          </Button>
          <Button type="submit" className="btn primary">
            Upload Category
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadCategory;