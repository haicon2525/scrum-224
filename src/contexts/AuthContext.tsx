import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('auth_user');

    if (token && storedUser) {
      try {
        setAuthState({
          isAuthenticated: true,
          user: JSON.parse(storedUser),
          token,
          isLoading: false,
        });
        return;
      } catch {
        // invalid stored user
      }
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  // Real login to backend endpoint POST /auth/login
  const login = async (username: string, password: string = ''): Promise<{ success: boolean; message?: string }> => {
    try {
      const res: any = await axiosClient.post('/auth/login', {
        username: username.trim(),
        password,
      });

      if (res && res.code === 'SUCCESS' && res.data?.accessToken) {
        const tokenData = res.data;
        const token = tokenData.accessToken;
        const userObj: User = {
          id: tokenData.userId || 'usr_uat',
          username,
          name: username.split('@')[0] || username,
          role: 'AGENT',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        };

        localStorage.setItem('access_token', token);
        localStorage.setItem('auth_user', JSON.stringify(userObj));

        setAuthState({
          isAuthenticated: true,
          user: userObj,
          token,
          isLoading: false,
        });
        return { success: true };
      }

      return {
        success: false,
        message: res?.message || 'Đăng nhập không thành công',
      };
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.message || 'Lỗi kết nối máy chủ';
      return {
        success: false,
        message: serverMessage,
      };
    }
  };

  // Demo login for offline / quick inspection
  const loginDemo = () => {
    const fakeToken = 'mock_jwt_token_' + Date.now();
    const demoUser: User = {
      id: 'usr_demo',
      username: 'demo.sales@vinhomes.vn',
      name: 'Chuyên viên Tư vấn (Demo)',
      role: 'AGENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };

    localStorage.setItem('access_token', fakeToken);
    localStorage.setItem('auth_user', JSON.stringify(demoUser));

    setAuthState({
      isAuthenticated: true,
      user: demoUser,
      token: fakeToken,
      isLoading: false,
    });
  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
