/**
 * Scoped Review Pulse - Test Bridge
 * Exposes window.app for test contract verification (US-001)
 */

import type {
  AppBridge,
  ScreenId,
  ActiveSurfaceId,
  SelectedEntity,
  ItemCounts,
  StorageStatus,
  AppError,
  ActivePanel,
} from '../features/scoped-review-pulse/scoped-review-pulse.types';

let appBridge: AppBridge | null = null;

export function registerAppBridge(bridge: AppBridge): void {
  appBridge = bridge;
  if (typeof window !== 'undefined') {
    (window as unknown as { app: AppBridge }).app = bridge;
  }
}

export function getAppBridge(): AppBridge | null {
  return appBridge;
}

export class ScopedReviewPulseTestBridge implements AppBridge {
  private getState: () => {
    activeScreen: ScreenId;
    activeSurface: ActiveSurfaceId;
    selectedEntity: SelectedEntity;
    counts: ItemCounts;
    storageStatus: StorageStatus;
    lastError: AppError | null;
    activePanel: ActivePanel;
  };

  constructor(
    getState: () => {
      activeScreen: ScreenId;
      activeSurface: ActiveSurfaceId;
      selectedEntity: SelectedEntity;
      counts: ItemCounts;
      storageStatus: StorageStatus;
      lastError: AppError | null;
      activePanel: ActivePanel;
    }
  ) {
    this.getState = getState;
  }

  getActiveScreen(): ScreenId {
    return this.getState().activeScreen;
  }
  getActiveSurface(): ActiveSurfaceId {
    return this.getState().activeSurface;
  }
  getSelectedRecord(): SelectedEntity {
    return this.getState().selectedEntity;
  }
  getCounts(): ItemCounts {
    return this.getState().counts;
  }
  getStorageStatus(): StorageStatus {
    return this.getState().storageStatus;
  }
  getLastError(): AppError | null {
    return this.getState().lastError;
  }
  getActivePanel(): ActivePanel {
    return this.getState().activePanel;
  }
}

declare global {
  interface Window {
    app: AppBridge;
  }
}

export function setupTestBridge(): void {
  if (typeof window !== 'undefined' && !window.app) {
    window.app = {
      getActiveScreen: () => null,
      getActiveSurface: () => null,
      getSelectedRecord: () => ({ type: null, id: null }),
      getCounts: () => ({ customers: 0, reviews: 0, pendingActions: 0 }),
      getStorageStatus: () => 'idle',
      getLastError: () => null,
      getActivePanel: () => null,
    };
  }
}

export function cleanupTestBridge(): void {
  if (typeof window !== 'undefined') {
    delete (window as unknown as { app?: AppBridge }).app;
  }
}