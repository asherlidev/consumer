import { useCallback, useEffect, useMemo, useState } from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

const getStorage = (storageType: StorageType): Storage | undefined => {
  let storage: Storage | undefined;

  if (typeof window !== 'undefined') {
    switch (storageType) {
      case 'localStorage':
        return window.localStorage;
      case 'sessionStorage':
        return window.sessionStorage;
    }
  }

  return storage;
};

const saveInStorage = (
  storageType: StorageType,
  storageKey: string,
  data: unknown | undefined
): void => {
  const storage = getStorage(storageType);

  try {
    if (storage) {
      if (data != null && data !== undefined) {
        storage.setItem(storageKey, JSON.stringify(data));
      } else {
        storage.removeItem(storageKey);
      }
    }
  } catch (e) {
    // TODO: showError toast
    console.log('ERROR', 'Could not access browser local/session storage');
  }
};

const loadFromStorage = <T>(storageType: StorageType, localStorageKey: string): T | undefined => {
  const storage = getStorage(storageType);

  try {
    if (storage) {
      const dataStr = storage.getItem(localStorageKey);
      return dataStr ? JSON.parse(dataStr) : undefined;
    }
  } catch (e) {
    // TODO: showError toast
    console.log('ERROR', 'Could not access browser local/session storage');
  }

  return undefined;
};

export const saveInLocalStorage = (storageKey: string, data: unknown | undefined) =>
  saveInStorage('localStorage', storageKey, data);

export const loadFromLocalStorage = <T>(storageKey: string): T | undefined =>
  loadFromStorage('localStorage', storageKey) || undefined;

export const saveInSessionStorage = (storageKey: string, data: unknown | undefined) =>
  saveInStorage('sessionStorage', storageKey, data);

export const loadFromSessionStorage = <T>(storageKey: string): T | undefined =>
  loadFromStorage('sessionStorage', storageKey) || undefined;

// Hooks

const useStorage = <T>(
  storageType: StorageType,
  storageKey: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return loadFromStorage<T>(storageType, storageKey) || initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        saveInStorage(storageType, storageKey, value);
      } catch (e) {
        console.error(e);
      }
    },
    [storageKey, storageType]
  );

  // Listen to changes in local storage in order to adapt to actions from other browser tabs
  useEffect(() => {
    const handleChange = () => {
      setStoredValue(loadFromStorage<T>(storageType, storageKey) || initialValue);
    };

    window.addEventListener('storage', handleChange, false);
    return () => {
      window.removeEventListener('storage', handleChange);
    };
  }, [initialValue, storageKey, storageType]);

  const value = useMemo(() => [storedValue, setValue], [storedValue, setValue]);

  return value as [T, (value: T) => void];
};

export const useLocalStorage = <T>(storageKey: string, initialValue?: T) =>
  useStorage('localStorage', storageKey, initialValue);

export const useSessionStorage = <T>(storageKey: string, initialValue?: T) =>
  useStorage('sessionStorage', storageKey, initialValue);
