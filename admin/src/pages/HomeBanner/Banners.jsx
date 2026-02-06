import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadBanner from '../../component/UploadBanner/UploadBanner';
import './Banners.css';

function Banners() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from URL path
  const activeTab = location.pathname.includes('/list') ? 'list' : 'upload';

  const handleTabChange = (tab) => {
    if (tab === 'upload') {
      navigate('/banners/upload');
    } else {
      navigate('/banners/list');
    }
  };

  const banners = [
    {
      id: 1,
      image: 'https://api.spicezgold.com/download/file_1734525239704_foot.png',
      category: 'Shoes',
      subcategory: 'Running'
    }
  ];

  return (
    <div className="banners-page">
      <div className="page-header">
        <h2>Home Banner Management</h2>
        <div className="tabs">
          <button 
            className={activeTab === 'upload' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('upload')}
          >
            Upload Banner
          </button>
          <button 
            className={activeTab === 'list' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('list')}
          >
            Banners List
          </button>
        </div>
      </div>

      <div className="page-content">
        {activeTab === 'upload' && <UploadBanner />}
        {activeTab === 'list' && (
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Banners List</div>
                <div className="card-subtitle">View and manage your uploaded banners.</div>
              </div>
            </div>
            
            <div className="banners-list">
              {banners.map(banner => (
                <div key={banner.id} className="banner-item-row">
                  <div className="banner-row-image">
                    <img src={banner.image} alt="Banner" />
                  </div>
                  <div className="banner-row-content">
                    <div className="banner-row-info">
                      <span className="label">Category:</span>
                      <span className="value">{banner.category}</span>
                    </div>
                    <div className="banner-row-info">
                      <span className="label">Sub Category:</span>
                      <span className="value">{banner.subcategory}</span>
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

export default Banners;