// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Scoped Review Pulse
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { CheckCircle2, Clock, Gauge, HeartPulse, History, RefreshCw } from "lucide-react";


export type StatusUtilityScopedReviewPulseActionId = "force-refresh-1";

export interface StatusUtilityScopedReviewPulseProps {
  actions?: Partial<Record<StatusUtilityScopedReviewPulseActionId, () => void>>;

}

export function StatusUtilityScopedReviewPulse({ actions }: StatusUtilityScopedReviewPulseProps) {
  return (
    <>
      {/* TopNavBar (Nav Shell Suppressed per brief, but implemented as requested if standalone component structure is needed, though brief says 'No navigation'. I will omit TopNav based on 'No navigation, profiles, or sidebars as per the brief.') */}
      {/* Main Dashboard Container */}
      <main className="w-full max-w-3xl bg-surface-container border border-outline-variant rounded shadow-md overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-stack-default border-b border-outline-variant bg-surface-container-high">
      <div className="flex items-center gap-stack-default">
      <div className="w-2 h-2 rounded-full bg-primary pulse-dot"></div>
      <h1 className="font-headline-md text-headline-md text-primary">Scoped Review Pulse</h1>
      </div>
      {/* Toggle ACT_TOGGLE_STATUS */}
      <label className="flex items-center cursor-pointer gap-stack-compact">
      <div className="relative">
      <input defaultChecked={true} className="sr-only" type="checkbox" />
      <div className="block bg-surface-container-highest w-10 h-6 rounded-DEFAULT border border-outline-variant transition-colors duration-200"></div>
      <div className="dot absolute left-1 top-1 bg-primary w-4 h-4 rounded-DEFAULT transition transform translate-x-4"></div>
      </div>
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider ml-2">Ready</span>
      </label>
      </header>
      {/* Content Area */}
      <div className="p-stack-default flex flex-col gap-stack-default">
      {/* Status Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-stack-default">
      {/* Status Item 1 */}
      <div className="bg-surface border border-outline-variant rounded p-stack-default flex flex-col gap-stack-compact hover:border-primary transition-colors">
      <div className="flex justify-between items-center pb-stack-compact border-b border-outline-variant">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">System Health</span>
      <HeartPulse  style={{fontSize: "16px"}} className="text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-center gap-2 pt-1">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      <span className="font-code-md text-code-md text-on-surface">Operational</span>
      </div>
      </div>
      {/* Status Item 2 */}
      <div className="bg-surface border border-outline-variant rounded p-stack-default flex flex-col gap-stack-compact hover:border-primary transition-colors">
      <div className="flex justify-between items-center pb-stack-compact border-b border-outline-variant">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Last Scan</span>
      <History  style={{fontSize: "16px"}} className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-center gap-2 pt-1">
      <span className="font-code-md text-code-md text-on-surface-variant">14m ago</span>
      </div>
      </div>
      {/* Status Item 3 */}
      <div className="bg-surface border border-outline-variant rounded p-stack-default flex flex-col gap-stack-compact hover:border-primary transition-colors">
      <div className="flex justify-between items-center pb-stack-compact border-b border-outline-variant">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pulse Rate</span>
      <Gauge  style={{fontSize: "16px"}} className="text-green-500" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-center gap-2 pt-1">
      <span className="font-code-md text-code-md text-on-surface text-green-400">98%</span>
      </div>
      </div>
      </section>
      {/* Control Section */}
      <section className="flex flex-col sm:flex-row justify-between items-center bg-surface border border-outline-variant rounded p-stack-default mt-stack-compact">
      <div className="flex items-center gap-stack-compact mb-stack-default sm:mb-0">
      <Clock  style={{fontSize: "18px"}} className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      <span className="font-code-sm text-code-sm text-on-surface-variant" id="current-timestamp">2023-10-27 14:30:05 UTC</span>
      </div>
      <button className="flex items-center gap-2 bg-primary-container hover:bg-inverse-primary text-on-primary-container hover:text-white px-4 py-2 rounded-DEFAULT transition-colors border border-transparent h-[32px]" type="button" data-action-id="force-refresh-1" onClick={actions?.["force-refresh-1"]}>
      <RefreshCw  style={{fontSize: "16px"}} aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm font-semibold">Force Refresh</span>
      </button>
      </section>
      {/* Feedback Layer */}
      <div className="flex items-center justify-center gap-2 pt-stack-compact">
      <CheckCircle2  style={{fontSize: "14px"}} className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      <span className="font-code-sm text-code-sm text-on-surface-variant">Local State: Synchronized</span>
      </div>
      </div>
      </main>
      
    </>
  );
}
