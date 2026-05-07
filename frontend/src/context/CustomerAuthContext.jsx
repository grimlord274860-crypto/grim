import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiCustomer } from '../api';

const CustomerAuthContext = createContext(null);

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // 'login' | 'register'
  const [pendingAction, setPendingAction] = useState(null); // function to run after auth

  useEffect(() => {
    const t = localStorage.getItem('customer_token');
    if (!t) {
      setLoading(false);
      return;
    }
    apiCustomer
      .me()
      .then((r) => setCustomer(r.data))
      .catch(() => {
        localStorage.removeItem('customer_token');
        setCustomer(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (name, email, password) => {
    const r = await apiCustomer.register(name, email, password);
    localStorage.setItem('customer_token', r.data.token);
    setCustomer({ email: r.data.email, name: r.data.name, role: 'customer' });
    return r.data;
  };
  const login = async (email, password) => {
    const r = await apiCustomer.login(email, password);
    localStorage.setItem('customer_token', r.data.token);
    setCustomer({ email: r.data.email, name: r.data.name, role: 'customer' });
    return r.data;
  };
  const logout = () => {
    localStorage.removeItem('customer_token');
    setCustomer(null);
  };

  // openAuth(action, mode='login') — if not logged in, open modal & run action after
  const requireAuth = useCallback(
    (action, mode = 'login') => {
      if (customer) {
        if (action) action();
        return;
      }
      setPendingAction(() => action || null);
      setModalMode(mode);
      setModalOpen(true);
    },
    [customer]
  );

  const openAuth = (mode = 'login') => {
    setPendingAction(null);
    setModalMode(mode);
    setModalOpen(true);
  };
  const closeAuth = () => {
    setModalOpen(false);
    setPendingAction(null);
  };
  const completeAuth = () => {
    const a = pendingAction;
    setModalOpen(false);
    setPendingAction(null);
    if (a) setTimeout(a, 50);
  };

  return (
    <CustomerAuthContext.Provider
      value={{ customer, loading, register, login, logout, requireAuth, openAuth, closeAuth, modalOpen, modalMode, setModalMode, completeAuth }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error('useCustomerAuth must be used inside CustomerAuthProvider');
  return ctx;
};
