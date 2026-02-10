import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadCategory from './UploadCategory'; // We'll create this component
import './CategoryManagement.css';

function CategoryManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from URL path
  const activeTab = location.pathname.includes('/list') ? 'list' : 'upload';

  const handleTabChange = (tab) => {
    if (tab === 'upload') {
      navigate('/categories/upload');
    } else {
      navigate('/categories/list');
    }
  };

  // Sample data for categories
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://via.placeholder.com/100x100',
      color: '#3498db',
      productsCount: 24
    },
    {
      id: 2,
      name: 'Clothing',
      image: 'https://via.placeholder.com/100x100',
      color: '#e74c3c',
      productsCount: 18
    },
    {
      id: 3,
      name: 'Home & Garden',
      image: 'https://via.placeholder.com/100x100',
      color: '#2ecc71',
      productsCount: 12
    },
    {
      id: 4,
      name: 'Beauty',
      image: 'https://via.placeholder.com/100x100',
      color: '#f39c12',
      productsCount: 8
    }
  ];

  return (
    <div className="banners-page">
      <div className="page-header">
        <h2>Category Management</h2>
        <div className="tabs">
          <button 
            className={activeTab === 'upload' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('upload')}
          >
            Upload Category
          </button>
          <button 
            className={activeTab === 'list' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('list')}
          >
            Category List
          </button>
        </div>
      </div>

      <div className="page-content">
        {activeTab === 'upload' && <UploadCategory />}
        {activeTab === 'list' && (
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Category List</div>
                <div className="card-subtitle">View and manage your product categories.</div>
              </div>
            </div>
            
            <div className="banners-list">
              {categories.map(category => (
                <div key={category.id} className="banner-item-row">
                  <div className="banner-row-image">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <div className="banner-row-content">
                    <div className="banner-row-info">
                      <span className="label">Name:</span>
                      <span className="value">{category.name}</span>
                    </div>
                    <div className="banner-row-info">
                      <span className="label">Products:</span>
                      <span className="value">{category.productsCount}</span>
                    </div>
                    <div className="banner-row-info">
                      <span className="label">Color:</span>
                      <span className="value" style={{color: category.color}}>{category.color}</span>
                    </div>
                  </div>
                  <div className="banner-row-actions">
                    <Button variant="text" color="primary" size="small" startIcon={<EditOutlinedIcon />} className="edit-btn">
                      Edit
                    </Button>
                    <Button variant="text" color="error" size="small" startIcon={<DeleteOutlineIcon />} className="delete-btn">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryManagement;