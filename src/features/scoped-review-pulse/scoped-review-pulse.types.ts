/**
 * Scoped Review Pulse - Type Definitions
 * US-001: App shell, state and persistence
 */

// Active surface identifiers
export type ActiveSurfaceId =
  | 'SURF_STATUS_UTILITY'
  | 'SURF_CUSTOMER_LIST'
  | 'SURF_CUSTOMER_DETAIL'
  | 'SURF_SETTINGS'
  | null;

// Screen/route identifiers
export type ScreenId =
  | 'bfa766eef8b34378b78263907c83a215'
  | null;

// Storage status
export type StorageStatus = 'idle' | 'saving' | 'error' | 'loaded';

// Error state
export interface AppError {
  message: string;
  timestamp: number;
  recoverable: boolean;
}

// Item counts
export interface ItemCounts {
  customers: number;
  reviews: number;
  pendingActions: number;
}

// Selected entity
export interface SelectedEntity {
  type: 'customer' | 'review' | null;
  id: string | null;
}

// Active panel
export type ActivePanel = 'main' | 'sidebar' | 'detail' | null;

// Navigation state
export interface NavigationState {
  currentSurface: ActiveSurfaceId;
  currentScreen: ScreenId;
  history: Array<{ surface: ActiveSurfaceId; screen: ScreenId }>;
}

// App shell state with action properties (used by store)
export interface AppShellState {
  // Core state
  activeSurface: ActiveSurfaceId;
  activeScreen: ScreenId;
  selectedEntity: SelectedEntity;
  storageStatus: StorageStatus;
  lastError: AppError | null;
  activePanel: ActivePanel;
  counts: ItemCounts;
  navigation: NavigationState;

  // Action setters
  setActiveSurface: (surface: ActiveSurfaceId) => void;
  setActiveScreen: (screen: ScreenId) => void;
  selectEntity: (entity: SelectedEntity) => void;
  setStorageStatus: (status: StorageStatus) => void;
  setError: (error: AppError | null) => void;
  setActivePanel: (panel: ActivePanel) => void;
  setCounts: (counts: Partial<ItemCounts>) => void;
  navigate: (surface: ActiveSurfaceId, screen: ScreenId) => void;
  reset: () => void;
}

// Action handlers for screen-owner stories
export interface AppActionHandlers {
  forceRefresh: () => void;
  navigateToSurface: (surface: ActiveSurfaceId) => void;
  clearError: () => void;
}

// window.app bridge interface for test contract
export interface AppBridge {
  getActiveScreen: () => ScreenId;
  getActiveSurface: () => ActiveSurfaceId;
  getSelectedRecord: () => SelectedEntity;
  getCounts: () => ItemCounts;
  getStorageStatus: () => StorageStatus;
  getLastError: () => AppError | null;
  getActivePanel: () => ActivePanel;
}

// Legacy types (for compatibility)
export type ActiveSurface = 'scoped-review-pulse' | 'status-utility';

export interface AppState {
  activeSurface: ActiveSurfaceId;
  selectedRecordId: string | null;
  storageAvailable: boolean;
  lastError: string | null;
  activePanel: string | null;
  itemCount: number;
}