import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiContent } from '../api';

const SiteContext = createContext(null);

// Mode: 'published' (default for everyone) or 'preview' (admin draft)
export const SiteProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [mode, setMode] = useState(
    typeof window !== 'undefined' && localStorage.getItem('site_mode') === 'preview'
      ? 'preview'
      : 'published'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (m) => {
    const useMode = m || mode;
    setLoading(true);
    setError(null);
    try {
      const res =
        useMode === 'preview' && localStorage.getItem('admin_token')
          ? await apiContent.getDraft()
          : await apiContent.getPublished();
      setContent(res.data);
    } catch (e) {
      setError(e.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    load();
  }, [load]);

  const switchMode = (m) => {
    localStorage.setItem('site_mode', m);
    setMode(m);
    load(m);
  };

  return (
    <SiteContext.Provider value={{ content, loading, error, reload: () => load(), mode, switchMode, setContent }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
};
