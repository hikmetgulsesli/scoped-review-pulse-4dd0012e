/**
 * Scoped Review Pulse - Test Fixtures
 * Provides realistic test data for US-001 app shell story
 */

import type {
  AppShellState,
  ActiveSurfaceId,
  ScreenId,
  AppError,
  ItemCounts,
} from '../features/scoped-review-pulse/scoped-review-pulse.types';

// Default item counts
export const defaultItemCounts: ItemCounts = {
  customers: 0,
  reviews: 0,
  pendingActions: 0,
};

// Sample item counts with data
export const populatedItemCounts: ItemCounts = {
  customers: 42,
  reviews: 128,
  pendingActions: 7,
};

// Sample error state
export const sampleRecoverableError: AppError = {
  message: 'Kayitli ayarlar yuklenemedi. Varsayilan degerler kullaniliyor.',
  timestamp: Date.now(),
  recoverable: true,
};

export const sampleNonRecoverableError: AppError = {
  message: 'Geri alinamayan bir hata olustu. Lutfen tekrar deneyin.',
  timestamp: Date.now(),
  recoverable: false,
};

// Screen IDs
export const statusUtilityScreenId: ScreenId = 'bfa766eef8b34378b78263907c83a215';

// Active surface IDs
export const statusUtilitySurface: ActiveSurfaceId = 'SURF_STATUS_UTILITY';
export const customerListSurface: ActiveSurfaceId = 'SURF_CUSTOMER_LIST';
export const customerDetailSurface: ActiveSurfaceId = 'SURF_CUSTOMER_DETAIL';
export const settingsSurface: ActiveSurfaceId = 'SURF_SETTINGS';

// Factory functions for test data
export function createAppShellState(overrides: Partial<AppShellState> = {}): AppShellState {
  const noop = () => {};
  return {
    activeSurface: null,
    activeScreen: null,
    selectedEntity: { type: null, id: null },
    storageStatus: 'idle',
    lastError: null,
    activePanel: 'main',
    counts: defaultItemCounts,
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
    ...overrides,
  };
}

export function createHydratedState(overrides: Partial<AppShellState> = {}): AppShellState {
  return createAppShellState({
    activeSurface: statusUtilitySurface,
    activeScreen: statusUtilityScreenId,
    storageStatus: 'loaded',
    counts: populatedItemCounts,
    activePanel: 'main',
    ...overrides,
  });
}

export function createErrorState(error: AppError): AppShellState {
  return createAppShellState({
    storageStatus: 'error',
    lastError: error,
  });
}

// Mock localStorage for tests
export function createMockLocalStorage() {
  const storage: Record<string, string> = {};
  return {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  };
}

// Mock window.app for test bridge verification
export interface MockWindowApp {
  getActiveScreen: () => ScreenId;
  getActiveSurface: () => ActiveSurfaceId;
  getSelectedRecord: () => { type: string | null; id: string | null };
  getCounts: () => ItemCounts;
  getStorageStatus: () => string;
  getLastError: () => AppError | null;
  getActivePanel: () => string | null;
}

export function createMockWindowApp(state: AppShellState): MockWindowApp {
  return {
    getActiveScreen: () => state.activeScreen,
    getActiveSurface: () => state.activeSurface,
    getSelectedRecord: () => state.selectedEntity,
    getCounts: () => state.counts,
    getStorageStatus: () => state.storageStatus,
    getLastError: () => state.lastError,
    getActivePanel: () => state.activePanel,
  };
}