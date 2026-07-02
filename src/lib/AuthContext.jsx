const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { createContext, useState, useContext, useEffect } from 'react';

import { appParams } from '@/lib/app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  useEffect(() => {
    // Cloudflare Pages deployment: render the app without any Base44 auth checks.
    // This avoids hard runtime failures when Base44 env vars / proxy routes are missing.
    setIsLoadingPublicSettings(false);
    setIsLoadingAuth(false);
    setIsAuthenticated(false);
    setAuthChecked(true);
    setAuthError(null);

    // Keep a minimal public settings shape for the rest of the app.
    setAppPublicSettings({ id: appParams?.appId, public_settings: null });
  }, []);

  // Removed Base44-dependent auth checks for Pages compatibility.
  const checkAppState = async () => {};
  const checkUserAuth = async () => {
    setIsLoadingAuth(false);
    setIsAuthenticated(false);
    setAuthChecked(true);
  };


  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
  };

  const navigateToLogin = () => {
    // Auth is disabled on Pages-only build.
    // Keep function to avoid crashes.
  };


  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
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
