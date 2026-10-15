import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';

export const AuthGuardModal: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('tranngochai367@gmail.com');
  const [password, setPassword] = useState('haicon123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }
    setLoading(true);
    setError('');
    const res = await login(username, password);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Tài khoản hoặc mật khẩu không chính xác');
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: '16px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          p: { xs: 3, sm: 4 },
          bgcolor: '#ffffff',
          textAlign: 'center',
          animation: 'fadeInUp 0.3s ease-out',
        }}
      >
        {/* Title & Subtitle exact 1:1 match with Figma */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            color: '#1565c0',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: 0.5,
          }}
        >
          ĐĂNG NHẬP
        </Typography>

        <Typography
          sx={{
            fontSize: '13px',
            color: '#64748b',
            mb: 3,
          }}
        >
          Vui lòng đăng nhập để xem nội dung
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: '13px', textAlign: 'left', borderRadius: '8px' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
          {/* Email / Phone Field */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Email/ Số điện thoại"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                bgcolor: '#ffffff',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#1565c0' },
                },
              }}
            />
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: '#94a3b8' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                bgcolor: '#ffffff',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#1565c0' },
                },
              }}
            />
          </Box>

          {/* Options: Remember Me & Forgot Password */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2.5,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    color: '#94a3b8',
                    p: 0.5,
                    '&.Mui-checked': { color: '#1565c0' },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '12.5px', color: '#475569' }}>
                  Đăng nhập tự động
                </Typography>
              }
              sx={{ m: 0 }}
            />

            <Link
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Vui lòng liên hệ quản trị viên hệ thống để cấp lại mật khẩu.');
              }}
              sx={{
                fontSize: '12.5px',
                color: '#1565c0',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          {/* Login Button with Vibrant Blue-Cyan Gradient */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              background: 'linear-gradient(90deg, #1d4ed8 0%, #0099e5 100%)',
              color: '#ffffff',
              py: 1.1,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(90deg, #1e40af 0%, #0284c7 100%)',
                boxShadow: '0 6px 18px rgba(29, 78, 216, 0.45)',
              },
            }}
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập'}
          </Button>

          {/* Register Footer Link */}
          <Box sx={{ mt: 2.5, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
              Bạn chưa có tài khoản?{' '}
              <Link
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Hệ thống đang mở đăng ký tài khoản tự động.');
                }}
                underline="none"
                sx={{
                  color: '#1565c0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthGuardModal;
