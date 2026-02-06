import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import logo from '../assets/logo.png'
import './Auth.css'

const Signup = () => {
    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <img src={logo} alt="Martico Logo" className="auth-logo" />
                        <h1 className="auth-title">Create an account</h1>
                        <p className="auth-subtitle">Join Martico Admin Panel today</p>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <TextField
                            label="Full Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            size="small"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            type="submit"
                            sx={{ borderRadius: '12px', py: 1.5, mt: 1 }}
                        >
                            Sign up
                        </Button>

                        <div className="auth-divider">or</div>

                        <Button
                            variant="outlined"
                            fullWidth
                            className="google-btn"
                            startIcon={
                                <svg className="google-icon" viewBox="0 0 24 24">
                                    <path
                                        fill="#EA4335"
                                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.273 0 3.191 2.727 1.245 6.709l4.021 3.056z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M1.245 6.709A6.99 6.99 0 0 0 1 12c0 1.927.455 3.736 1.245 5.291l4.021-3.055A7.025 7.025 0 0 1 5.266 9.765L1.245 6.709z"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M12 24c3.155 0 5.8-1.045 7.727-2.836l-3.773-2.927c-1.082.727-2.436 1.155-3.954 1.155-3.045 0-5.627-2.055-6.545-4.818l-4.021 3.055C3.191 21.273 7.273 24 12 24z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 12c0-.864-.064-1.745-.191-2.582H12v4.891h6.755c-.291 1.555-1.136 2.845-2.455 3.727l3.773 2.927C22.318 18.827 24 15.7 24 12z"
                                    />
                                </svg>
                            }
                        >
                            Continue with Google
                        </Button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
