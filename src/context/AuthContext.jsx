import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('Citizen');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('uc_token');
    const storedUser = window.localStorage.getItem('uc_user');
    const storedRole = window.localStorage.getItem('uc_role');
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);
  }, []);

  const login = async ({ email, password, selectedRole = 'Citizen' }) => {
    setIsLoading(true);
    try {
      // Placeholder: integrate real API call via services/api
      const fakeToken = 'demo-token';
      const fakeUser = { id: 'u1', name: 'Urban User', email };
      setToken(fakeToken);
      setUser(fakeUser);
      setRole(selectedRole);
      window.localStorage.setItem('uc_token', fakeToken);
      window.localStorage.setItem('uc_user', JSON.stringify(fakeUser));
      window.localStorage.setItem('uc_role', selectedRole);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole('Citizen');
    window.localStorage.removeItem('uc_token');
    window.localStorage.removeItem('uc_user');
    window.localStorage.removeItem('uc_role');
  };

  const value = useMemo(
    () => ({ user, token, role, isLoading, login, logout, setUser, setRole }),
    [user, token, role, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

export default AuthContext;

