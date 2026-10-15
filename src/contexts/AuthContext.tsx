import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import axiosClient from '../api/axiosClient';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  // Verify token & fetch real user profile on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('auth_user');

      if (!token) {
        setAuthState({ isAuthenticated: false, user: null, token: null, isLoading: false });
        return;
      }

      // Check with /users/me endpoint
      try {
        const res: any = await axiosClient.get('/users/me');
        const userData = res?.data || res;
        const realUser: User = {
          id: userData.id || 'usr_uat',
          username: userData.email || userData.phone || 'User',
          name: userData.fullName || userData.email?.split('@')[0] || 'Người dùng',
          role: userData.role || 'USER',
          avatar: userData.fileInfo?.fullLink || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        };

        localStorage.setItem('auth_user', JSON.stringify(realUser));
        setAuthState({
          isAuthenticated: true,
          user: realUser,
          token,
          isLoading: false,
        });
      } catch (err) {
        // If stored user exists, use it temporarily, else let interceptor handle refresh
        if (storedUser) {
          try {
            setAuthState({
              isAuthenticated: true,
              user: JSON.parse(storedUser),
              token,
              isLoading: false,
            });
            return;
          } catch {
            // parse error
          }
        }
        setAuthState({ isAuthenticated: false, user: null, token: null, isLoading: false });
      }
    };

    initAuth();

    // Listen to unauthorized event dispatched from axiosClient
    const handleUnauthorized = () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
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
        const refreshToken = tokenData.refreshToken;

        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        // Fetch real profile from /users/me
        let userObj: User;
        try {
          const meRes: any = await axiosClient.get('/users/me');
          const meData = meRes?.data || meRes;
          userObj = {
            id: meData.id || tokenData.userId || 'usr_uat',
            username: meData.email || username,
            name: meData.fullName || username.split('@')[0] || username,
            role: meData.role || 'USER',
            avatar: meData.fileInfo?.fullLink || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          };
        } catch {
          userObj = {
            id: tokenData.userId || 'usr_uat',
            username,
            name: username.split('@')[0] || username,
            role: 'USER',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          };
        }

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

  const refreshProfile = async () => {
    try {
      const meRes: any = await axiosClient.get('/users/me');
      const meData = meRes?.data || meRes;
      const userObj: User = {
        id: meData.id,
        username: meData.email,
        name: meData.fullName,
        role: meData.role,
        avatar: meData.fileInfo?.fullLink,
      };
      localStorage.setItem('auth_user', JSON.stringify(userObj));
      setAuthState((prev) => ({ ...prev, user: userObj }));
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const rfToken = localStorage.getItem('refresh_token');
    if (!rfToken) return false;

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/hovixi/api/v1';
      const refreshRes = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        { refreshToken: rfToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'vi',
            'X-Request-Id': 'rf-proactive-' + Date.now(),
          },
        }
      );

      const tokenData = refreshRes.data?.data || refreshRes.data;
      if (tokenData?.accessToken) {
        localStorage.setItem('access_token', tokenData.accessToken);
        if (tokenData.refreshToken) {
          localStorage.setItem('refresh_token', tokenData.refreshToken);
        }
        setAuthState((prev) => ({ ...prev, token: tokenData.accessToken }));
        return true;
      }
    } catch (err) {
      console.warn('[AuthContext] Proactive refresh token failed:', err);
    }
    return false;
  }, []);

  // Proactive token auto-refresh every 10 minutes (token access expires after 15 minutes)
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    // Refresh every 10 minutes (600,000 ms)
    const interval = setInterval(() => {
      refreshToken();
    }, 10 * 60 * 1000);

    // Also refresh on window focus if tab was idle
    const handleFocus = () => {
      const lastToken = localStorage.getItem('access_token');
      if (lastToken) {
        refreshToken();
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [authState.isAuthenticated, refreshToken]);

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
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
    <AuthContext.Provider value={{ ...authState, login, logout, refreshProfile, refreshToken }}>
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
