import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWithRetry = async (retries = 3) => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        if (retries > 0) {
          setTimeout(() => checkWithRetry(retries - 1), 3000);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    checkWithRetry();
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      setUser(userData);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (username, password) => {
    try {
      await authService.register(username, password);
      navigate('/login');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {}
  };

  if (loading) return <div>Checking authentication...</div>;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
