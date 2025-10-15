import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [badges, setBadges] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const value = useMemo(
    () => ({ badges, setBadges, preferences, setPreferences, feedbackHistory, setFeedbackHistory }),
    [badges, preferences, feedbackHistory]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

export default UserContext;

