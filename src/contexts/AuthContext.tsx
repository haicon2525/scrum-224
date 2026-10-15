import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password?: string) => Promise<boolean>;
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
    // Check local storage for initial auth session
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
        // parse error
      }
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (username: string): Promise<boolean> => {
    // Simulating login
    const fakeToken = 'mock_jwt_token_' + Date.now();
    const fakeUser: User = {
      id: 'usr_01',
      username,
      name: username || 'Chuyên viên Tư vấn',
      role: 'AGENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };

    localStorage.setItem('access_token', fakeToken);
    localStorage.setItem('auth_user', JSON.stringify(fakeUser));

    setAuthState({
      isAuthenticated: true,
      user: fakeUser,
      token: fakeToken,
      isLoading: false,
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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
