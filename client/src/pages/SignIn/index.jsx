import { useState, useCallback } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import './SignIn.css';

const SignIn = () => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  
  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For signup only
  const [remember, setRemember] = useState(false);
  
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => setShowPassword(p => !p);

  const switchMode = useCallback((newMode) => {
    // Prevent switching to same mode
    if (mode === newMode) return;
    
    // Clear any existing errors
    setError(null);
    
    // Reset all form fields
    setEmail('');
    setPassword('');
    setName('');
    setRemember(false);
    setShowPassword(false);
    
    // Switch mode after a brief delay for smooth transition
    setTimeout(() => {
      setMode(newMode);
    }, 150);
  }, [mode]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (mode === 'signin') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      setError(null);
      console.log('SignIn:', { email, password, remember });
    } else {
      if (!name || !email || !password) {
        setError('Please fill all required fields.');
        return;
      }
      setError(null);
      console.log('SignUp:', { name, email, password });
    }
  }, [mode, email, password, name, remember]);

  return (
    <section className="section signInPage">
      <div className="signin-wrapper container">
        <div className="signin-form">
          <form onSubmit={handleSubmit} className="form-card" noValidate>
            {/* Logo */}
            <div className="auth-logo">
              <Link to="/">
                <img src={logo} alt="Martico Logo" />
              </Link>
            </div>

            {/* Toggle Buttons */}
            <div className="auth-toggle">
              <button
                type="button"
                className={`toggle-btn ${mode === 'signin' ? 'active' : ''}`}
                onClick={() => switchMode('signin')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`toggle-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <div className="card-top">
              <h3>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h3>
            </div>
            
            {error && <div className="form-error">{error}</div>}

            {/* First Field - Changes based on mode */}
            <label className="input-label">
              <span className="field-label">
                {mode === 'signin' ? 'Email address' : 'Full name'}
              </span>
              <input 
                key={mode} // Force re-render when mode changes
                type={mode === 'signin' ? 'email' : 'text'}
                value={mode === 'signin' ? email : name} 
                onChange={e => mode === 'signin' ? setEmail(e.target.value) : setName(e.target.value)} 
                placeholder={mode === 'signin' ? 'you@example.com' : 'Your full name'}
                className="transition-input"
              />
            </label>

            {/* Second Field - Email (only for signup) */}
            {mode === 'signup' && (
              <label className="input-label">
                Email address
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="you@example.com" 
                />
              </label>
            )}

            {/* Third Field - Password (always shown) */}
            <label className="input-label">
              Password
              <div className="password-row">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Password" 
                />
                <button 
                  type="button" 
                  className="eye" 
                  aria-label={showPassword ? 'Hide password' : 'Show password'} 
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </label>

            {/* Remember Me - Only for Sign In */}
            {mode === 'signin' && (
              <div className="form-row">
                <label className="remember">
                  <input 
                    type="checkbox" 
                    checked={remember} 
                    onChange={e => setRemember(e.target.checked)} 
                  /> 
                  Remember me
                </label>
                <Link to="/forgot" className="forgot-link">Forgot password?</Link>
              </div>
            )}

            <button className="btn btn-primary" type="submit">
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="socials">
              <button type="button" className="social google">G</button>
              <button type="button" className="social facebook">f</button>
            </div>
          </form>
        </div>

        <div className="signin-hero">
          <div className="hero-shapes">
            <div className="shape blur" aria-hidden></div>
            <div className="shape glow" aria-hidden></div>
          </div>

          <div className="cart-wrap" aria-hidden>
            <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="cart-svg">
              <path d="M28 56H86L154 246H338" stroke="#000" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M154 246L136 288" stroke="#000" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338 246L358 288" stroke="#000" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="166" y="96" width="150" height="90" stroke="#000" strokeWidth="16" rx="6"/>
              <path d="M200 116H320" stroke="#000" strokeWidth="10" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;