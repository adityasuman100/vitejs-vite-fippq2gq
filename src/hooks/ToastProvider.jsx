// file: ToastProvider.js
import React, { createContext, useContext, useState, useCallback } from "react";
import '../components/Toast.css';  // Include basic styling

// Context for managing toast notifications
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-remove toast after the duration
    setTimeout(() => removeToast(id), duration);
  }, []);

  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Toast Component
const Toast = ({ id, message, type, onClose }) => (
  <div className={`toast toast-${type}`} onClick={onClose}>
    <span>{message}</span>
    <button className="close-btn" onClick={onClose}>X</button>
  </div>
);

// Custom Hook to Use Toasts
export const useToast = () => useContext(ToastContext);

export default ToastProvider;
