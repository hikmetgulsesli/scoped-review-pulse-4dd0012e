/**
 * Scoped Review Pulse - App Shell State Store
 * React Context + useReducer implementation for US-001 foundational story
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import type {
  AppShellState,
  ActiveSurfaceId,
  ScreenId,
  SelectedEntity,
  StorageStatus,
  AppError,
  ActivePanel,
  ItemCounts,
  AppActionHandlers,
} from './scoped-review-pulse.types';
import {
  savePreferences,
  loadPreferences,
  clearPreferences,
} from './scoped-review-pulse.repo';

const noop = () => undefined;

const initialState: AppShellState = {
  activeSurface: null,
  activeScreen: null,
  selectedEntity: { type: null, id: null },
  storageStatus: 'idle',
  lastError: null,
  activePanel: 'main',
  counts: { customers: 0, reviews: 0, pendingActions: 0 },
  navigation: {
    currentSurface: null,
    currentScreen: null,
    history: [],
  },
  setActiveSurface: noop,
  setActiveScreen: noop,
  selectEntity: noop,
  setStorageStatus: noop,
  setError: noop,
  setActivePanel: noop,
  setCounts: noop,
  navigate: noop,
  reset: noop,
};

type AppAction =
  | { type: 'SET_ACTIVE_SURFACE'; payload: ActiveSurfaceId }
  | { type: 'SET_ACTIVE_SCREEN'; payload: ScreenId }
  | { type: 'SELECT_ENTITY'; payload: SelectedEntity }
  | { type: 'SET_STORAGE_STATUS'; payload: StorageStatus }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_ACTIVE_PANEL'; payload: ActivePanel }
  | { type: 'SET_COUNTS'; payload: Partial<ItemCounts> }
  | {
      type: 'NAVIGATE';
      payload: { surface: ActiveSurfaceId; screen: ScreenId };
    }
  | { type: 'RESET' }
  | {
      type: 'HYDRATE';
      payload: {
        activeSurface?: ActiveSurfaceId;
        activePanel?: ActivePanel;
        counts?: ItemCounts;
      };
    };

function appReducer(state: AppShellState, action: AppAction): AppShellState {
  switch (action.type) {
    case 'SET_ACTIVE_SURFACE':
      return { ...state, activeSurface: action.payload };
    case 'SET_ACTIVE_SCREEN':
      return { ...state, activeScreen: action.payload };
    case 'SELECT_ENTITY':
      return { ...state, selectedEntity: action.payload };
    case 'SET_STORAGE_STATUS':
      return { ...state, storageStatus: action.payload };
    case 'SET_ERROR':
      return { ...state, lastError: action.payload };
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.payload };
    case 'SET_COUNTS':
      return { ...state, counts: { ...state.counts, ...action.payload } };
    case 'NAVIGATE':
      return {
        ...state,
        activeSurface: action.payload.surface,
        activeScreen: action.payload.screen,
        navigation: {
          currentSurface: action.payload.surface,
          currentScreen: action.payload.screen,
          history: [
            ...state.navigation.history,
            { surface: state.activeSurface, screen: state.activeScreen },
          ].slice(-10),
        },
      };
    case 'RESET':
      return { ...initialState };
    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
        storageStatus: 'loaded' as StorageStatus,
      };
    default:
      return state;
  }
}

export interface AppContextValue extends AppShellState {
  forceRefresh: () => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function ScopedReviewPulseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const isHydrated = useRef(false);

  useEffect(() => {
    async function bootstrap() {
      dispatch({ type: 'SET_STORAGE_STATUS', payload: 'idle' });

      try {
        const prefs = await loadPreferences();
        if (prefs) {
          dispatch({ type: 'HYDRATE', payload: prefs });
        } else {
          dispatch({ type: 'SET_STORAGE_STATUS', payload: 'loaded' });
        }
      } catch {
        dispatch({
          type: 'SET_ERROR',
          payload: {
            message:
              'Kayitli ayarlar yuklenemedi. Varsayilan degerler kullaniliyor.',
            timestamp: Date.now(),
            recoverable: true,
          },
        });
        dispatch({ type: 'SET_STORAGE_STATUS', payload: 'loaded' });
      }

      isHydrated.current = true;
    }

    void bootstrap();
  }, []);

  useEffect(() => {
    if (!isHydrated.current) return;

    const persist = async () => {
      dispatch({ type: 'SET_STORAGE_STATUS', payload: 'saving' });
      try {
        await savePreferences({
          activeSurface: state.activeSurface,
          activePanel: state.activePanel,
          counts: state.counts,
        });
        dispatch({ type: 'SET_STORAGE_STATUS', payload: 'loaded' });
      } catch {
        dispatch({
          type: 'SET_ERROR',
          payload: {
            message: 'Ayarlar kaydedilemedi.',
            timestamp: Date.now(),
            recoverable: true,
          },
        });
        dispatch({ type: 'SET_STORAGE_STATUS', payload: 'error' });
      }
    };

    const timeoutId = window.setTimeout(() => {
      void persist();
    }, 500);
    return () => window.clearTimeout(timeoutId);
  }, [state.activeSurface, state.activePanel, state.counts]);

  const setActiveSurface = useCallback((surface: ActiveSurfaceId) => {
    dispatch({ type: 'SET_ACTIVE_SURFACE', payload: surface });
  }, []);

  const setActiveScreen = useCallback((screen: ScreenId) => {
    dispatch({ type: 'SET_ACTIVE_SCREEN', payload: screen });
  }, []);

  const selectEntity = useCallback((entity: SelectedEntity) => {
    dispatch({ type: 'SELECT_ENTITY', payload: entity });
  }, []);

  const setStorageStatus = useCallback((status: StorageStatus) => {
    dispatch({ type: 'SET_STORAGE_STATUS', payload: status });
  }, []);

  const setError = useCallback((error: AppError | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setActivePanel = useCallback((panel: ActivePanel) => {
    dispatch({ type: 'SET_ACTIVE_PANEL', payload: panel });
  }, []);

  const setCounts = useCallback((counts: Partial<ItemCounts>) => {
    dispatch({ type: 'SET_COUNTS', payload: counts });
  }, []);

  const navigate = useCallback(
    (surface: ActiveSurfaceId, screen: ScreenId) => {
      dispatch({ type: 'NAVIGATE', payload: { surface, screen } });
    },
    [],
  );

  const reset = useCallback(() => {
    void clearPreferences();
    dispatch({ type: 'RESET' });
  }, []);

  const forceRefresh = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_STORAGE_STATUS', payload: 'idle' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const contextValue: AppContextValue = {
    ...state,
    setActiveSurface,
    setActiveScreen,
    selectEntity,
    setStorageStatus,
    setError,
    setActivePanel,
    setCounts,
    navigate,
    reset,
    forceRefresh,
    clearError,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useScopedReviewPulse(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useScopedReviewPulse must be used within ScopedReviewPulseProvider',
    );
  }
  return context;
}

export function useAppActionHandlers(): AppActionHandlers {
  const { forceRefresh, navigate, clearError } = useScopedReviewPulse();

  return {
    forceRefresh,
    navigateToSurface: (surface: ActiveSurfaceId) => navigate(surface, null),
    clearError,
  };
}