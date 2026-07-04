/**
 * Scoped Review Pulse - Persistence Adapter
 * localStorage persistence with corrupted data recovery
 * US-001: App shell, state and persistence
 */

import type { ActiveSurfaceId, ActivePanel, ItemCounts } from './scoped-review-pulse.types';

const STORAGE_KEY = 'scoped-review-pulse-prefs';

const VALID_SURFACES: ReadonlyArray<NonNullable<ActiveSurfaceId>> = [
  'SURF_STATUS_UTILITY',
  'SURF_CUSTOMER_LIST',
  'SURF_CUSTOMER_DETAIL',
  'SURF_SETTINGS',
];
const VALID_PANELS: ReadonlyArray<NonNullable<ActivePanel>> = [
  'main',
  'sidebar',
  'detail',
];

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
  if (!isStorageAvailable()) {
    throw new Error('Storage is not available');
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      activeSurface: state.activeSurface,
      activePanel: state.activePanel,
      counts: state.counts,
      savedAt: Date.now(),
    }),
  );
}

export async function loadPreferences(): Promise<PersistedState | null> {
  if (!isStorageAvailable()) return null;

  let parsed: Record<string, unknown>;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    parsed = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  const surfaceRaw = parsed.activeSurface;
  const panelRaw = parsed.activePanel;
  const countsRaw = parsed.counts;

  if (
    surfaceRaw !== undefined &&
    surfaceRaw !== null &&
    (typeof surfaceRaw !== 'string' ||
      !(VALID_SURFACES as ReadonlyArray<string>).includes(surfaceRaw))
  ) {
    return null;
  }

  if (
    panelRaw !== undefined &&
    panelRaw !== null &&
    (typeof panelRaw !== 'string' ||
      !(VALID_PANELS as ReadonlyArray<string>).includes(panelRaw))
  ) {
    return null;
  }

  if (
    countsRaw !== undefined &&
    countsRaw !== null &&
    (typeof countsRaw !== 'object' ||
      Array.isArray(countsRaw))
  ) {
    return null;
  }

  const countsObj = (typeof countsRaw === 'object' &&
    countsRaw !== null &&
    !Array.isArray(countsRaw)
      ? (countsRaw as Record<string, unknown>)
      : null);

  const customerCount =
    typeof countsObj?.customers === 'number' && Number.isFinite(countsObj.customers)
      ? countsObj.customers
      : DEFAULT_PERSISTED.counts.customers;
  const reviewCount =
    typeof countsObj?.reviews === 'number' && Number.isFinite(countsObj.reviews)
      ? countsObj.reviews
      : DEFAULT_PERSISTED.counts.reviews;
  const pendingCount =
    typeof countsObj?.pendingActions === 'number' && Number.isFinite(countsObj.pendingActions)
      ? countsObj.pendingActions
      : DEFAULT_PERSISTED.counts.pendingActions;

  return {
    activeSurface: (surfaceRaw ?? DEFAULT_PERSISTED.activeSurface) as ActiveSurfaceId,
    activePanel: (panelRaw ?? DEFAULT_PERSISTED.activePanel) as ActivePanel,
    counts: countsObj
      ? {
          customers: customerCount,
          reviews: reviewCount,
          pendingActions: pendingCount,
        }
      : DEFAULT_PERSISTED.counts,
  };
}

export async function clearPreferences(): Promise<void> {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent
  }
}