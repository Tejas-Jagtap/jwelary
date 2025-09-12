'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
// Update the import path if needed, for example:
import { apiClient } from '../lib/apiClient';
// Or provide the correct relative path to apiClient.ts

interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session timeout configurations
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIMEOUT = 25 * 60 * 1000; // 25 minutes (5 min warning)
const CHECK_INTERVAL = 60 * 1000; // Check every minute

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const checkTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await apiClient.getMe();
      setUser(userData);
      // Reset activity timer when user is authenticated
      if (userData) {
        resetActivityTimer();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update last activity timestamp
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (checkTimerRef.current) {
      clearInterval(checkTimerRef.current);
      checkTimerRef.current = null;
    }
  }, []);

  // Show inactivity warning
  const showInactivityWarning = useCallback(() => {
    if (!user) return;
    
    const shouldLogout = window.confirm(
      'You have been inactive for 25 minutes. You will be automatically logged out in 5 minutes for security reasons.\n\nClick OK to stay logged in, or Cancel to logout now.'
    );
    
    if (shouldLogout) {
      // User wants to stay logged in - reset the timer
      resetActivityTimer();
    } else {
      // User chose to logout or clicked outside
      logout();
    }
  }, [user]);

  // Auto logout due to inactivity
  const autoLogout = useCallback(async () => {
    if (!user) return;
    
    alert('You have been automatically logged out due to inactivity for security reasons.');
    await logout();
  }, [user]);

  // Reset activity timer
  const resetActivityTimer = useCallback(() => {
    if (!user) return;

    clearTimers();
    updateActivity();

    // Set warning timer (25 minutes)
    warningTimerRef.current = setTimeout(() => {
      showInactivityWarning();
    }, WARNING_TIMEOUT);

    // Set auto-logout timer (30 minutes)
    inactivityTimerRef.current = setTimeout(() => {
      autoLogout();
    }, INACTIVITY_TIMEOUT);

    // Set periodic check timer
    checkTimerRef.current = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      
      // If user became active, reset timers
      if (timeSinceLastActivity < CHECK_INTERVAL) {
        resetActivityTimer();
      }
    }, CHECK_INTERVAL);
  }, [user, clearTimers, updateActivity, showInactivityWarning, autoLogout]);

  // Setup activity listeners
  useEffect(() => {
    if (!user) {
      clearTimers();
      return;
    }

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      updateActivity();
    };

    // Add event listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Start the inactivity timer
    resetActivityTimer();

    return () => {
      // Cleanup event listeners
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimers();
    };
  }, [user, updateActivity, resetActivityTimer, clearTimers]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiClient.login(email, password);
      setUser(data.user);
      // Activity timer will be set by the useEffect when user state changes
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      clearTimers();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
