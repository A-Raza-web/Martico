import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

function AddProductCard({ onCancel, onSubmit, initialData }) {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    countInStock: '',
    description: '',
    brand: '',
    rating: 0,
    number: '',
    inFeatured: false
  })

  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        category: initialData.category?._id || initialData.category || '',
        countInStock: initialData.countInStock || '',
        description: initialData.description || '',
        brand: initialData.brand || '',
        rating: initialData.rating || 0,
        number: initialData.number || '',
        inFeatured: initialData.inFeatured || false
      })
      if (initialData.image) {
        const imgs = Array.isArray(initialData.image) ? initialData.image : [initialData.image];
        setImagePreviews(imgs)
      }
    }
  }, [initialData])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/categories")
        if (res.data.success) {
          setCategories(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files])

      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(formData, imageFiles)
    }
  }

  return (
    <div className="card add-product-card" style={{ maxWidth: '800px', width: '100%' }}>
      <div className="card-header">
        <div>
          <div className="card-title">{initialData ? 'Edit Product' : 'Add Product'}</div>
          <div className="card-subtitle">
            {initialData ? 'Update product information and image.' : 'Create a new product with all details.'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mt: 3 }}>
          {/* Row 1: Name and Brand */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
            <TextField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Stack>

          {/* Row 2: Price and Category */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            >
              <MenuItem value=""><em>Select category</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {/* Row 3: Stock and SKU (Number) */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Count In Stock"
              name="countInStock"
              type="number"
              value={formData.countInStock}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              label="SKU / Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Stack>

          {/* Modern Multiple Image Upload Area */}
          <div className="image-upload-wrapper">
            <span className="form-label" style={{ fontWeight: 600 }}>Product Images (Multiple)</span>

            {imagePreviews.length === 0 ? (
              <div
                className="image-upload-area"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="file-input-hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <div className="upload-icon-box">
                  <CloudUploadIcon sx={{ fontSize: 40 }} />
                  <span>Click to upload product images</span>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>(You can select multiple photos)</span>
                </div>
              </div>
            ) : (
              <div className="previews-grid">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={src} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div
                  className="upload-more-card"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="file-input-hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  <CloudUploadIcon sx={{ fontSize: 24 }} />
                  <span>Add More</span>
                </div>
              </div>
            )}
          </div>

          {/* Row 5: Rating and Featured */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="inFeatured"
                  checked={formData.inFeatured}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Featured Product"
              sx={{ width: '100%', ml: 1 }}
            />
          </Stack>

          {/* Row 6: Description */}
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Detailed description of the product..."
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Update Product' : 'Save Product'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  )
}

export default AddProductCard
