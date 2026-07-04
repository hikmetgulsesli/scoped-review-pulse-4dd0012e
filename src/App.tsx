/**
 * Scoped Review Pulse - App Shell
 * US-001 foundational story: app shell, state and persistence
 */

import { useEffect } from 'react';
import {
  ScopedReviewPulseProvider,
  useScopedReviewPulse,
} from './features/scoped-review-pulse/scoped-review-pulse.store';
import { registerAppBridge } from './test/bridge';
import { StatusUtilityScopedReviewPulse } from './screens';

function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useScopedReviewPulse();

  return (
    <div
      data-setfarm-root
      data-testid="setfarm-app-root"
      className="relative min-h-screen w-full overflow-hidden bg-surface text-on-surface"
    >
      {state.lastError && state.lastError.recoverable && (
        <div className="fixed top-4 right-4 bg-primary-container text-on-primary-container p-4 rounded-DEFAULT max-w-sm z-50">
          <p className="font-body-sm">{state.lastError.message}</p>
          <button
            type="button"
            onClick={state.clearError}
            className="mt-2 text-primary hover:bg-inverse-primary rounded-full px-2 py-1 font-label-caps text-sm"
          >
            Kapat
          </button>
        </div>
      )}
      {state.storageStatus === 'saving' && (
        <div className="fixed bottom-4 left-4 bg-surface-container text-on-surface-variant p-2 rounded-full text-xs font-label-caps">
          Kaydediliyor...
          <span className="pulse-dot ml-2 inline-block w-2 h-2 bg-primary rounded-full" />
        </div>
      )}
      {children}
    </div>
  );
}

function AppContent() {
  const state = useScopedReviewPulse();

  useEffect(() => {
    registerAppBridge({
      getActiveScreen: () => state.activeScreen,
      getActiveSurface: () => state.activeSurface,
      getSelectedRecord: () => state.selectedEntity,
      getCounts: () => state.counts,
      getStorageStatus: () => state.storageStatus,
      getLastError: () => state.lastError,
      getActivePanel: () => state.activePanel,
    });
  }, [
    state.activeScreen,
    state.activeSurface,
    state.selectedEntity,
    state.counts,
    state.storageStatus,
    state.lastError,
    state.activePanel,
  ]);

  const activeScreenId = state.activeScreen;

  if (activeScreenId === 'bfa766eef8b34378b78263907c83a215') {
    return (
      <AppShellLayout>
        <StatusUtilityScopedReviewPulse
          actions={{ 'force-refresh-1': state.forceRefresh }}
        />
      </AppShellLayout>
    );
  }

  return (
    <AppShellLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-stack-default">
            Scoped Review Pulse
          </h1>
          <p className="font-body-sm text-on-surface-variant">Uygulama hazir</p>
        </div>
      </div>
    </AppShellLayout>
  );
}

export default function App() {
  return (
    <ScopedReviewPulseProvider>
      <AppContent />
    </ScopedReviewPulseProvider>
  );
}