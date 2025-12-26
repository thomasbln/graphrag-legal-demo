---
name: UI/UX Implementation & Import Continuation
overview: Implementiere die komplette UI/UX mit Dark/Light Mode, Query Selector, Split-Screen Vergleich und verbessere den Import Script um bereits importierte Contracts zu überspringen.
todos:
  - id: import-improve
    content: Improve import script to skip already imported contracts
    status: pending
  - id: import-resume
    content: "Import fortsetzen: Script erneut starten (überspringt bereits importierte)"
    status: pending
    dependencies:
      - import-improve
  - id: killer-queries
    content: Create killer-queries.ts with 5 query definitions
    status: pending
  - id: theme-system
    content: Implement theme system with dark/light mode support
    status: pending
  - id: base-ui
    content: Create base UI components (button, badge, card, query-selector)
    status: pending
    dependencies:
      - theme-system
  - id: comparison-components
    content: Create comparison components (split-screen, columns)
    status: pending
    dependencies:
      - base-ui
  - id: results-components
    content: Create results components (stats, cards, empty-state)
    status: pending
    dependencies:
      - base-ui
  - id: main-page
    content: Integrate all components in main page
    status: pending
    dependencies:
      - comparison-components
      - results-components
      - killer-queries
  - id: api-updates
    content: Update API routes to accept queryId
    status: pending
    dependencies:
      - killer-queries
  - id: styling
    content: Add custom colors and dark mode styles
    status: pending
    dependencies:
      - theme-system
---

# UI/UX Implementat

ion & Import Continuation Plan

## Overview

Implementiere die komplette Frontend-UI für den GraphRAG vs RAG Vergleich mit:

- Query Selector (Select Box mit 5 Killer Queries)

- Split-Screen Layout (GraphRAG links, RAG rechts)
- Dark/Light Mode Support

- Import Script Verbesserung (Skip bereits importierte Contracts)

## Current Status

- Backend: GraphRAG API (`/api/query`) und RAG API (`/api/rag`) funktionieren
- Supabase: 28/415 Contracts importiert (6.7%)

- Components: Verzeichnisse erstellt, aber noch leer

- Main Page: Standard Next.js Template

## Implementation Steps

### Phase 1: Import Script Verbesserung

**File:** `scripts/import-neo4j-to-supabase.ts`

- Add check for already imported contracts before processing
- Query Supabase for existing contract IDs

- Skip contracts that are already imported

- Add resume capability (can be stopped and restarted)

- Add better progress reporting
```typescript
// Before processing each contract:
const { data: existing } = await supabase
  .from('contracts')
  .select('id')
  .eq('id', contract.id)
  .single()

if (existing) {
  console.log(`⏭️  Skipping ${contract.id} (already imported)`)
  continue
}
```


**After improving the script:**

- Run import script again: `npm run import:supabase`
- Script will automatically skip the 28 already imported contracts
- Continue importing remaining 387 contracts
- Monitor progress (shows every 10 contracts)
- Estimated time: ~15-20 minutes for full import

### Phase 2: Killer Queries Definition

**File:** `lib/queries/killer-queries.ts` (new)

Define the 5 killer queries with metadata:

```typescript
export const KILLER_QUERIES = [
  {
    id: 'negative-search',
    query: 'Contracts WITHOUT audit rights',
    description: 'Find contracts missing audit rights clauses',
    ragLimitation: 'Cannot search for absence',
    graphragSolution: 'WHERE NOT EXISTS pattern',
  },
  // ... 4 more queries
] as const
```

### Phase 3: Theme System

**File:** `lib/theme.ts` (new)

- Create theme context provider

- Support system preference detection
- Manual toggle functionality

- Persist in localStorage

**File:** `app/layout.tsx`

- Wrap app with ThemeProvider

- Add theme toggle button in header

### Phase 4: Base UI Components

**File:** `components/ui/query-selector.tsx` (new)

- Select dropdown with 5 killer queries

- Shows query text in options

- Triggers query on selection

- Loading state during query

**File:** `components/ui/button.tsx` (new)

- Reusable button component

- Variants: primary, secondary, outline

- Dark/Light mode support

**File:** `components/ui/badge.tsx` (new)

- Badge component for status indicators

- Colors: success (green), error (red), info (blue)

**File:** `components/ui/card.tsx` (new)

- Card container component
- Shadow and border styling

- Dark/Light mode support

### Phase 5: Comparison Components

**File:** `components/comparison/split-screen.tsx` (new)

- Grid layout: 2 columns on desktop, 1 column on mobile
- Contains RAG and GraphRAG columns
- Responsive breakpoints

**File:** `components/comparison/graphrag-column.tsx` (new)

- Left column (GraphRAG results)

- Blue/green theme

- Shows: QueryStats, ContractList, AnalysisCard, CypherDisplay

- Success indicators (checkmarks)

**File:** `components/comparison/rag-column.tsx` (new)

- Right column (RAG results)

- Red/orange theme

- Shows: EmptyState or LimitationCard

- Error indicators (X marks)

### Phase 6: Results Components

**File:** `components/results/query-stats.tsx` (new)

- Execution time
- Result count

- Query type badge

**File:** `components/results/contract-card.tsx` (new)

- Contract title
- Clause type badges
- Expandable full text

- Hover effects

**File:** `components/results/analysis-card.tsx` (new)

- AI analysis summary

- Insights list
- Risk flags (if any)

- Recommendations (if any)

- Collapsible sections

**File:** `components/results/empty-state.tsx` (new)

- Empty state for RAG column
- Limitation message
- Icon/illustration

**File:** `components/results/cypher-display.tsx` (new)

- Code block for Cypher query
- Syntax highlighting

- Copy button

- Collapsible

### Phase 7: Main Page Integration

**File:** `app/page.tsx`

Replace default template with:

- Header with title and theme toggle
- QuerySelector component

- SplitScreen component (shown after query selection)
- Loading states

- Error handling

- Fetch both RAG and GraphRAG results in parallel

### Phase 8: API Route Updates

**File:** `app/api/query/route.ts`

- Accept `queryId` instead of `query` string
- Lookup query from KILLER_QUERIES
- Return query metadata along with results

**File:** `app/api/rag/route.ts`

- Accept `queryId` instead of `query` string

- Lookup query from KILLER_QUERIES

- Return limitation info based on query type

### Phase 9: Styling & Polish

**File:** `app/globals.css`

- Add custom color variables for GraphRAG (blue) and RAG (red)
- Dark mode color definitions
- Smooth transitions (200-300ms)
- Animation keyframes for microinteractions
- Reduced motion support (`@media (prefers-reduced-motion)`)

**File:** `tailwind.config.ts` (if exists, or create)

- Configure dark mode: 'class'
- Add custom colors for themes
- Custom spacing and shadows
- Animation utilities for microinteractions
- Transition timing functions

**Microinteractions Implementation:**

- Button press animations (scale on active)
- Card hover effects (lift + shadow)
- Loading skeletons (pulse animation)
- Result reveal animations (fade-in + stagger)
- Focus ring styles (high contrast)

**Accessibility Enhancements:**

- Focus visible styles for all interactive elements
- Skip links for keyboard navigation
- ARIA labels for screen readers
- Reduced motion media queries
- High contrast mode support

## File Structure

```javascript
app/
  page.tsx                    # Main page with query selector
  layout.tsx                   # Theme provider wrapper
  globals.css                  # Theme colors and styles
  api/
    query/route.ts             # GraphRAG API (update)
    rag/route.ts               # RAG API (update)

components/
  ui/
    query-selector.tsx          # Select dropdown
    button.tsx                 # Reusable button
    badge.tsx                  # Status badges
    card.tsx                   # Card container
  comparison/
    split-screen.tsx           # Main layout
    graphrag-column.tsx         # Left column
    rag-column.tsx              # Right column
  results/
    query-stats.tsx            # Execution stats
    contract-card.tsx          # Contract display
    analysis-card.tsx          # AI analysis
    empty-state.tsx            # RAG empty state
    cypher-display.tsx         # Cypher code block

lib/
  queries/
    killer-queries.ts           # 5 killer queries definition
  theme.ts                     # Theme context & hooks

scripts/
  import-neo4j-to-supabase.ts  # Improved import (skip existing)
```

## Design Specifications

### Design Philosophy: "Clean & Purposeful"

Based on UI Trends 2026, we're implementing:
- **Minimalism with Microinteractions**: Clean layouts with subtle, purposeful animations
- **Accessibility First**: WCAG 2.1 compliance, keyboard navigation, high contrast
- **Alive & Responsive**: Smooth transitions and tactile feedback
- **Data-Driven Storytelling**: Animated stats and progressive disclosure

**Not implementing:**
- Liquid Glass (accessibility concerns, text readability)
- Neo-Brutalism (too experimental for tech demo)
- Spatial Design (not relevant for web demo)

### Color Scheme

**Light Mode:**

- GraphRAG: Blue (#2563eb, #3b82f6, #eff6ff)

- RAG: Red (#dc2626, #ef4444, #fef2f2)

- Background: White (#ffffff, #f8f9fa)

**Dark Mode:**

- GraphRAG: Blue (#3b82f6, #60a5fa, #1e3a8a)

- RAG: Red (#f87171, #fb7185, #7f1d1d)

- Background: Slate (#0f172a, #1e293b)

### Layout

- Desktop: 2-column grid (50/50 split)
- Mobile: Single column with tabs or stacked

- Max width: 1400px container

- Padding: 1rem mobile, 2rem desktop

### Microinteractions & Animations

**Button Interactions:**
- Press: `scale(0.98)` on active state
- Hover: `scale(1.02)` + shadow increase
- Transition: `200ms ease-in-out`

**Card Interactions:**
- Hover: `translateY(-2px)` + `shadow-lg`
- Transition: `200ms ease-out`

**Loading States:**
- Skeleton screens instead of spinners
- Progressive disclosure for results
- Fade-in animation: `opacity 0 → 1` over 300ms

**Query Results:**
- Staggered reveal for contract cards (50ms delay each)
- Animated counters for stats
- Smooth scroll to results after query

**Transitions:**
- Default duration: `200-300ms`
- Easing: `ease-in-out` or `ease-out`
- No motion for users with `prefers-reduced-motion`

### Accessibility Requirements

**WCAG 2.1 AA Compliance:**
- Color contrast: Minimum 4.5:1 for text
- Focus indicators: 2px solid outline, high contrast
- Keyboard navigation: All interactive elements accessible
- ARIA labels: Descriptive labels for all UI elements
- Screen reader support: Semantic HTML, proper headings

**Keyboard Navigation:**
- Tab: Navigate through interactive elements
- Enter/Space: Activate buttons, select options
- Escape: Close modals, clear selections
- Arrow keys: Navigate dropdown options

**Focus Management:**
- Visible focus rings on all interactive elements
- Focus trap in modals
- Focus return after modal close
- Skip links for main content

### Visual Storytelling

**Query Stats:**
- Animated counters (0 → final number)
- Progress indicators for loading
- Color-coded badges (success/error/info)

**Analysis Card:**
- Progressive disclosure: Summary → Insights → Details
- Collapsible sections with smooth expand/collapse
- Highlight important insights with subtle background

**Results Comparison:**
- Side-by-side reveal animation
- Highlight differences with subtle color accents
- Clear visual hierarchy (GraphRAG success, RAG limitation)

## Testing Checklist

- [ ] Query selector shows all 5 queries

- [ ] Selecting query triggers both API calls

- [ ] GraphRAG column shows results correctly
- [ ] RAG column shows limitation message
- [ ] Dark/Light mode toggle works

- [ ] Mobile responsive layout

- [ ] Loading states display correctly

- [ ] Error handling works

- [ ] Import script skips existing contracts

- [ ] Import can be resumed after interruption
- [ ] Microinteractions work smoothly (no jank)
- [ ] Keyboard navigation works for all elements
- [ ] Focus indicators visible and clear
- [ ] Screen reader announces all important information
- [ ] Reduced motion preference respected
- [ ] Color contrast meets WCAG AA standards

## Dependencies

Already installed:

- @supabase/supabase-js
- openai
- ai, @ai-sdk/openai
- neo4j-driver

No additional dependencies needed for UI components (using Tailwind CSS v4).

## Estimated Time

- Phase 1 (Import): 30 min

- Phase 2-3 (Queries & Theme): 1 hour

- Phase 4-6 (Components): 3-4 hours

- Phase 7-8 (Integration): 1-2 hours
- Phase 9 (Polish & Microinteractions): 2 hours

**Total: ~7-9 hours**