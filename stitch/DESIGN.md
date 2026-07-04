---
name: Technical Utility
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin: 16px
  container-max: 1440px
  stack-compact: 4px
  stack-default: 12px
---

## Brand & Style
The design system is engineered for high-density information environments where speed of recognition and technical accuracy are paramount. The aesthetic is "Technical Utility"—a refined blend of Minimalism and high-density functionalism. It avoids decorative flourishes in favor of structural clarity, utilizing subtle borders and systematic spacing to organize complex data.

The emotional response should be one of "Controlled Oversight": professional, calm, and highly reliable. The target audience includes system administrators, DevOps engineers, and product managers who require immediate visual confirmation of system health. 

**Core Principles:**
- **Density over White Space:** Information is packed tightly but logically to minimize scrolling.
- **Semantic Priority:** Color is used sparingly, reserved almost exclusively for status signaling.
- **Structural Integrity:** Layouts rely on a rigid grid and hairline borders rather than shadows or depth.

## Colors
The palette is built on a deep, neutral "Surface" base to reduce eye strain during prolonged monitoring. 

- **Primary:** A precise Blue, used for active states and primary actions.
- **Neutral:** A range of Slate grays used for typography and structural borders.
- **Semantic Palette:** Highly saturated Green (Success), Amber (Warning), and Red (Error) are the primary drivers of the UI, used for status indicators, badges, and critical alerts.
- **Surface Tiers:** 
  - Level 0: `#020617` (Background)
  - Level 1: `#0F172A` (Default Card/Surface)
  - Level 2: `#1E293B` (Hover/Active states)

## Typography
This design system employs a dual-typeface strategy. **Hanken Grotesk** provides a clean, contemporary sans-serif foundation for UI labels and headings, ensuring high legibility at small sizes. **JetBrains Mono** is used for all technical data, including timestamps, IDs, logs, and status counts, providing the "Utility" feel and ensuring characters are distinct.

All technical labels should use `label-caps` or `code-sm` to differentiate metadata from primary content. Headings are kept compact with tight letter spacing to maintain the high-density aesthetic.

## Layout & Spacing
The layout follows a strict 4px grid system. A fluid grid is preferred for the main monitoring dashboard to maximize screen real estate, utilizing a 12-column structure on desktop.

- **Desktop (1024px+):** 12 columns, 12px gutters, 24px side margins.
- **Tablet (768px - 1023px):** 6 columns, 12px gutters, 16px side margins.
- **Mobile (<767px):** 2 columns, 8px gutters, 12px side margins.

Information density is maintained by using "Compact" vertical stacks (4px) between related metadata and "Default" stacks (12px) between distinct content blocks.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than shadows. This maintains the "Utility" aesthetic and keeps the interface feeling flat and fast.

- **Borders:** Surfaces are defined by 1px borders (`#334155`). When an element is focused or active, the border shifts to the Primary color or the relevant Semantic status color.
- **Z-Axis:**
  - Base: Page background.
  - Level 1: Cards and primary UI containers.
  - Level 2: Popovers, tooltips, and dropdown menus (using a subtle background blur of 8px to maintain context).
- **Shadows:** Only used on Level 2 elements (Modals/Popovers). Use a sharp, 4px offset with 0% blur to mimic a "hard shadow" or "brutalist lite" offset for a technical feel.

## Shapes
The design system uses a "Soft" roundedness profile (4px). This small radius provides a professional touch that prevents the UI from feeling overly aggressive (as 0px would) while maintaining the structured, grid-aligned feel of a technical tool.

- **Small elements (Checkboxes, Tags):** 2px radius.
- **Standard elements (Buttons, Inputs, Cards):** 4px radius.
- **Large elements (Modals):** 8px radius.

## Components
- **Status Badges:** Compact, using `code-sm` typography. Solid background with high-contrast text for critical states; outlined for neutral/inactive states.
- **Utility Buttons:** Fixed height (32px for default, 28px for compact). Use subtle borders and no gradients. Icon-only buttons should be used for common actions like "Refresh" or "Settings" to save space.
- **Compact Cards:** No internal padding exceeding 12px. Use a header row with a 1px bottom border to separate the title/status from the body data.
- **High-Contrast Toggles:** Rectangular thumb shape with a 2px radius. High-contrast colors (Success Green for ON, Slate for OFF) to ensure state is visible at a glance.
- **Data Rows:** Use zebra-striping (alternating backgrounds) for long lists. On hover, the entire row should highlight with a 1px Primary border.
- **Health Pulse:** A small 8px animated dot indicator next to system names to show real-time connectivity/activity.