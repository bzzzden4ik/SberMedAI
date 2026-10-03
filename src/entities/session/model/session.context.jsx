import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSession, logoutSession } from '../api/session-api.js';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSession()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = async (navigate) => {
    try {
      await logoutSession(navigate);
    } finally {
      setUser(null);
    }
  };
  const value = {
    user,
    userId: user?.id || user?.userId || user?.user_id || null,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    logout
  }
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession должен использоваться внутри SessionProvider');
  }
  return context;
};