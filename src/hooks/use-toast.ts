import React, { useContext } from 'react';
import type { ToastProps, ToastActionElement } from '@/components/ui/toast';

interface Toast extends Omit<ToastProps, 'title' | 'description'> {
  id: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  action?: ToastActionElement;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastContext, type Toast };
