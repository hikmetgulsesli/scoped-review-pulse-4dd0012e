/**
 * Scoped Review Pulse - Persistence Adapter
 * localStorage persistence with corrupted data recovery
 * US-001: App shell, state and persistence
 */

import type { ActiveSurfaceId, ActivePanel, ItemCounts } from './scoped-review-pulse.types';

const STORAGE_KEY = 'scoped-review-pulse-prefs';

interface PersistedState {
  activeSurface: ActiveSurfaceId;
  activePanel: ActivePanel;
  counts: ItemCounts;
}

const DEFAULT_PERSISTED: PersistedState = {
  activeSurface: 'SURF_STATUS_UTILITY',
  activePanel: 'main',
  counts: { customers: 0, reviews: 0, pendingActions: 0 },
};

function isStorageAvailable(): boolean {
  try {
    const t = '__storage-test__';
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

export async function savePreferences(state: Partial<PersistedState>): Promise<void> {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeSurface: state.activeSurface,
        activePanel: state.activePanel,
        counts: state.counts,
        savedAt: Date.now(),
      }),
    );
  } catch {
    // Silent persist failure
  }
}

export async function loadPreferences(): Promise<PersistedState | null> {
  if (!isStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed !== 'object' || parsed === null) return null;

    const surfaceRaw = parsed.activeSurface;
    const panelRaw = parsed.activePanel;
    const countsRaw = parsed.counts as Record<string, unknown> | undefined;

    if (
      surfaceRaw !== undefined &&
      surfaceRaw !== null &&
      typeof surfaceRaw !== 'string'
    ) {
      return null;
    }
    if (
      panelRaw !== undefined &&
      panelRaw !== null &&
      typeof panelRaw !== 'string'
    ) {
      return null;
    }
    if (
      countsRaw !== undefined &&
      (typeof countsRaw !== 'object' || countsRaw === null || Array.isArray(countsRaw))
    ) {
      return null;
    }

    return {
      activeSurface: (surfaceRaw ?? DEFAULT_PERSISTED.activeSurface) as ActiveSurfaceId,
      activePanel: (panelRaw ?? DEFAULT_PERSISTED.activePanel) as ActivePanel,
      counts: countsRaw
        ? {
            customers:
              (countsRaw.customers as number) ?? DEFAULT_PERSISTED.counts.customers,
            reviews:
              (countsRaw.reviews as number) ?? DEFAULT_PERSISTED.counts.reviews,
            pendingActions:
              (countsRaw.pendingActions as number) ??
              DEFAULT_PERSISTED.counts.pendingActions,
          }
        : DEFAULT_PERSISTED.counts,
    };
  } catch {
    return null;
  }
}

export async function clearPreferences(): Promise<void> {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent
  }
}