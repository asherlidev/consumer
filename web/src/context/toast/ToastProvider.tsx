import { capitalize, isEmpty } from 'lodash';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Toast } from 'react-bootstrap';
import * as S from './styles';

interface ToastConfig {
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ProviderProps {
  delay: number; // Delay hiding the toast (ms)
}

interface ContextValue {
  addToast: (message: React.ReactNode, config?: ToastConfig) => void;
}

const ToastContext = React.createContext<ContextValue | undefined>(undefined);

const ToastProvider = ({ children, delay }: PropsWithChildren<ProviderProps>) => {
  const [toasts, setToasts] = useState<
    {
      id: string;
      title: string;
      message: React.ReactNode;
      config: ToastConfig;
    }[]
  >([]);

  useEffect(() => {
    let timer: number;

    if (!isEmpty(toasts)) {
      timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), delay);
    }

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [toasts, delay]);

  const addToast = useCallback(
    (message: React.ReactNode, config: ToastConfig = { type: 'info' }) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: generateToastId(),
          title: config.type,
          message,
          config,
        },
      ]);
    },
    []
  );

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      <S.ToastsContainer>
        {toasts.map(({ id, title, message }) => (
          <Toast
            key={id}
            onClose={() => setToasts(toasts.filter((toast) => toast.id !== id))}
            className="animated fadeInUp"
          >
            <Toast.Header>
              <S.ToastHeaderContent>{capitalize(title)}</S.ToastHeaderContent>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        ))}
      </S.ToastsContainer>

      {children}
    </ToastContext.Provider>
  );
};

const useToast = (): ContextValue => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
};

export { useToast, ToastProvider };

//
// Utils
//

const generateToastId = () => (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
