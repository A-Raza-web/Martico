import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from 'react-top-loading-bar';
import { IoMdCloseCircle } from "react-icons/io";
import UploadSubCategory from './UploadSubCategory';
import './CategoryManagement.css';

function SubCategoryManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes('/list') ? 'list' : 'upload';

  const handleTabChange = (tab) => {
    navigate(`/sub-categories/${tab}`);
  };

  const [subCategories, setSubCategories] = useState([
    { _id: '1', category: 'electronics', name: 'Mobile Phones' },
    { _id: '2', category: 'electronics', name: 'Laptops' },
    { _id: '3', category: 'electronics', name: 'Tablets' },
    { _id: '4', category: 'fashion', name: 'Men T-Shirts' },
    { _id: '5', category: 'fashion', name: 'Women Dresses' },
    { _id: '6', category: 'fashion', name: 'Shoes' },
    { _id: '7', category: 'electronics', name: 'Smartwatches' },
    { _id: '8', category: 'fashion', name: 'Caps & Hats' },
    { _id: '9', category: 'home', name: 'Bedsheets & Pillows' },
  ]);
  const [categories, setCategories] = useState([
    { _id: 'electronics', name: 'Electronics', image: ['https://via.placeholder.com/100?text=Electronics'] },
    { _id: 'fashion', name: 'Fashion', image: ['https://via.placeholder.com/100?text=Fashion'] },
    { _id: 'home', name: 'Home & Kitchen', image: ['https://via.placeholder.com/100?text=Home'] },
  ]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Fetch Sub Categories
  const fetchSubCategories = async () => {
    setProgress(30);
    try {
      const res = await axios.get("http://localhost:4000/api/sub-categories");
      if (res.data.success) {
        setSubCategories(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    } finally {
      setProgress(100);
    }
  };

  // Fetch Categories for reference
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/categories");
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  // Trigger loading bar on tab change
  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => {
      setProgress(100);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Clear Sub Category Name
  const handleDeleteClick = (subCategoryId) => {
    setSubCategories(prev => 
      prev.map(item => 
        item._id === subCategoryId ? { ...item, name: '' } : item
      )
    );
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="page">
      <LoadingBar
        color='var(--primary-color)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={4}
      />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="page-header">
        <h2>Sub Category Management</h2>
        <div className="tabs">
          <button
            className={activeTab === 'upload' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('upload')}
          >
            Upload Sub Category
          </button>
          <button
            className={activeTab === 'list' ? 'tab active' : 'tab'}
            onClick={() => handleTabChange('list')}
          >
            Sub Category List
          </button>
        </div>
      </div>

      <div className="page-content">
        {activeTab === 'upload' && (
          <UploadSubCategory
            refreshSubCategories={fetchSubCategories}
            showNotification={showSnackbar}
            setProgress={setProgress}
            setParentLoading={setLoading}
          />
        )}

        {activeTab === 'list' && (
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Sub Category List</div>
                <div className="card-subtitle">
                  View and manage your product sub categories.
                </div>
              </div>
            </div>

            <div className="table-wrapper">
              {subCategories.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon-wrapper">
                    <Inventory2OutlinedIcon className="empty-icon" />
                  </div>
                  <div className="empty-title">No Sub Categories Found</div>
                  <div className="empty-subtitle">
                    Get started by uploading your first sub category.
                  </div>
                </div>
              ) : (
                <table className="sub-category-table">
                  <thead>
                    <tr>
                      <th>Category Image</th>
                      <th>Category</th>
                      <th>Sub Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => {
                      const categorySubCategories = subCategories.filter(sub => sub.category === category._id);
                      return (
                        <React.Fragment key={category._id}>
                          <tr className="category-row">
                            <td className="table-image">
                              {category.image && category.image[0] ? (
                                <img src={category.image[0]} alt={category.name} />
                              ) : (
                                <img src="https://via.placeholder.com/50?text=No+Image" alt="No Image" />
                              )}
                            </td>
                            <td colSpan="2" className="table-category-header">{category.name}</td>
                          </tr>
                          {categorySubCategories.length > 0 ? (
                            categorySubCategories.map((subCategory) => (
                              <tr key={subCategory._id} className="subcategory-item-row">
                                <td></td>
                                <td className="subcategory-indent"></td>
                                <td className="table-subcategory">
                                  <div className="subcategory-cell">
                                    <span>{subCategory.name}</span>
                                    {subCategory.name && (
                                      <button
                                        className="close-icon-btn"
                                        onClick={() => handleDeleteClick(subCategory._id)}
                                        title="Clear sub-category"
                                      >
                                        <IoMdCloseCircle />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="empty-category-row">
                              <td></td>
                              <td colSpan="2" className="empty-subcategories">No sub-categories</td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubCategoryManagement;
