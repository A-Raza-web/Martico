import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BadgeCheck,
  Bell,
  Heart,
  Package,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Profile.css';

const mockOrders = [
  { id: 'ORD-1042', date: 'Mar 03, 2026', status: 'Delivered', total: '$128.00' },
  { id: 'ORD-1039', date: 'Feb 25, 2026', status: 'Shipped', total: '$79.99' },
  { id: 'ORD-1032', date: 'Feb 10, 2026', status: 'Processing', total: '$46.50' }
];

const readUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const Profile = () => {
  const [user, setUser] = useState(readUser);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: user?.phone || '',
    city: user?.city || 'New York',
    country: user?.country || 'United States',
    address: user?.address || ''
  });

  const userName = user?.name || 'Guest User';
  const userEmail = user?.email || 'guest@example.com';
  const userPhone = user?.phone || '+1 (555) 013-8023';
  const userLocation = `${user?.city || 'New York'}, ${user?.country || 'United States'}`;
  const userAvatar = user?.avatar || '';

  const persistUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const openEditDialog = () => {
    setFormValues({
      name: user?.name || 'Guest User',
      email: user?.email || 'guest@example.com',
      phone: user?.phone || '',
      city: user?.city || 'New York',
      country: user?.country || 'United States',
      address: user?.address || ''
    });
    setIsEditOpen(true);
  };

  const closeEditDialog = () => setIsEditOpen(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...(user || {}),
      name: formValues.name.trim() || 'Guest User',
      email: formValues.email.trim() || 'guest@example.com',
      phone: formValues.phone.trim(),
      city: formValues.city.trim() || 'New York',
      country: formValues.country.trim() || 'United States',
      address: formValues.address.trim()
    };

    persistUser(updatedUser);
    setIsEditOpen(false);
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = typeof reader.result === 'string' ? reader.result : '';
      if (!avatar) return;

      const updatedUser = {
        ...(user || {}),
        name: userName,
        email: userEmail,
        avatar
      };
      persistUser(updatedUser);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <section className="profilePage">
      <div className="container profileContainer">
        <div className="profileTopAction">
          <Link to="/" className="backHomeBtn">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        <div className="profileHero">
          <div className="profileTopRow">
            <div className="avatarBlock">
              <div className="profileAvatar">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="profileAvatarImage" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
              <button type="button" className="avatarUploadBtn" onClick={openImagePicker}>
                <Upload size={14} />
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatarInput"
              />
            </div>
            <div>
              <p className="profileTag">Personal Profile</p>
              <h2>{userName}</h2>
              <p className="profileSubText">Manage your account, orders and preferences.</p>
            </div>
          </div>
          <div className="profileQuickStats">
            <div>
              <span>Orders</span>
              <strong>18</strong>
            </div>
            <div>
              <span>Wishlist</span>
              <strong>42</strong>
            </div>
            <div>
              <span>Reward Points</span>
              <strong>5,280</strong>
            </div>
          </div>
        </div>

        <div className="profileGrid">
          <article className="profileCard">
            <div className="cardTitleRow">
              <h4>Contact Details</h4>
              <BadgeCheck size={18} />
            </div>
            <ul className="infoList">
              <li><Mail size={16} /> {userEmail}</li>
              <li><Phone size={16} /> {userPhone}</li>
              <li><MapPin size={16} /> {userLocation}</li>
              <li><CalendarDays size={16} /> Joined Jan 2025</li>
            </ul>
            <button className="primaryAction" onClick={openEditDialog}>Edit Profile</button>
          </article>

          <article className="profileCard">
            <div className="cardTitleRow">
              <h4>Account Settings</h4>
            </div>
            <div className="actionGrid">
              <Link to="/profile" className="actionChip"><Bell size={16} /> Notifications</Link>
              <Link to="/profile" className="actionChip"><ShieldCheck size={16} /> Security</Link>
              <Link to="/profile" className="actionChip"><CreditCard size={16} /> Payment Methods</Link>
              <Link to="/profile" className="actionChip"><Heart size={16} /> Saved Items</Link>
            </div>
          </article>
        </div>

        <article className="profileCard ordersCard">
          <div className="cardTitleRow">
            <h4>Recent Orders</h4>
            <Link to="/orders" className="viewAllLink">View All Orders</Link>
          </div>
          <div className="ordersTable">
            {mockOrders.map((order) => (
              <div className="orderRow" key={order.id}>
                <div className="orderId"><Package size={16} /> {order.id}</div>
                <div>{order.date}</div>
                <div className={`statusBadge ${order.status.toLowerCase()}`}>{order.status}</div>
                <div>{order.total}</div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <Dialog open={isEditOpen} onClose={closeEditDialog} maxWidth="sm" fullWidth className="profileDialog">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className="profileFormGrid">
            <TextField
              label="Full Name"
              name="name"
              value={formValues.name}
              onChange={handleFieldChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleFieldChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formValues.phone}
              onChange={handleFieldChange}
              fullWidth
              size="small"
            />
            <TextField
              label="City"
              name="city"
              value={formValues.city}
              onChange={handleFieldChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Country"
              name="country"
              value={formValues.country}
              onChange={handleFieldChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleFieldChange}
              fullWidth
              size="small"
              multiline
              minRows={3}
            />
          </div>
        </DialogContent>
        <DialogActions className="profileDialogActions">
          <Button onClick={closeEditDialog} variant="outlined" className="dialogBtn dialogBtnCancel">Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained" className="dialogBtn dialogBtnSave">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Profile;
