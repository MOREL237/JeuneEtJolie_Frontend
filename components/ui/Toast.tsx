// components/ui/Toast.tsx
'use client';

import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <div
      className={`fixed bottom-10 right-10 z-[100] transform transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-surface-container-high text-on-surface px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-4 border border-outline-variant">
        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
        <p className="text-sm font-sans-lato">{message}</p>
      </div>
    </div>
  );
};

export default Toast;