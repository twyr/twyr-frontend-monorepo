# Twyr Platform Architecture

## Purpose

This repository contains the frontend platform scaffold for Twyr. It is designed for a cross-platform product that targets:

- Web through Next.js
- iOS and Android through Expo / React Native
- Shared UI through Tamagui
- Shared contracts and context-specific BFF layers
- Bounded-context-aligned micro-frontends

The current business domains are:

- `users`
- `system_administrators`

Each domain currently contains these bounded contexts:

- `session_management`
- `profile`

## Architectural Principles

1. **Bounded context first**
   - Every bounded context is a first-class unit.
   - A bounded context owns its own frontend micro-frontend, shared contracts, and BFF.

2. **BFF, not business backend**
   - The repository does not implement the system-of-record backend.
   - Each context-specific backend layer is a BFF that:
     - validates requests
     - proxies calls to the existing REST backend
     - aggregates and reshapes responses for the frontend
     - enforces frontend-facing contracts

3. **Cross-platform UI through Tamagui**
   - Shared UI primitives are built with Tamagui.
   - React Native Web is used on web.
   - DOM-only UI libraries are intentionally excluded from the core architecture.

4. **Shared design tokens**
   - The source color palette comes from the Tailwind color configuration already owned by Twyr.
   - Tamagui tokens are derived from that palette.
   - All shared components consume those tokens.

5. **Micro-frontend alignment**
   - On web, bounded contexts are designed to be deployable separately later.
   - On mobile, bounded contexts are composed at build time through workspace packages.
   - The shell apps remain thin and orchestration-focused.

6. **No frontend-to-frontend coupling**
   - One bounded context frontend must never import another bounded context frontend.
   - Shared behavior must go through shared packages or backend APIs.

## Repository Shape

```text
apps/
  web-shell/
  mobile-shell/

domains/
  users/
    session_management/
      bff/
      shared/
      frontend/
    profile/
      bff/
      shared/
      frontend/
  system_administrators/
    session_management/
      bff/
      shared/
      frontend/
    profile/
      bff/
      shared/
      frontend/

packages/
  design-system/
  ui-kit/
  ui-composed/
  core/
  platform/
```

## Layers

### 1. Shell Applications

#### `apps/web-shell`
Responsibilities:

- bootstraps the web app
- owns top-level providers
- owns route mounting
- handles web-only concerns such as SEO and server rendering

#### `apps/mobile-shell`
Responsibilities:

- bootstraps the mobile app
- owns top-level providers
- owns navigator composition
- handles mobile-only shell concerns

Shells must not contain bounded-context business flows.

### 2. Bounded Contexts

Each bounded context has three parts.

#### `bff/`
The BFF is a proxy and aggregator layer. It must:

- call the existing REST backend
- aggregate responses where useful
- normalize data for frontend consumption
- perform request and response validation

The BFF must not:

- access a database directly
- re-implement domain business rules already present in the core backend
- contain shared UI code

#### `shared/`
Shared contains the contract surface between the frontend and BFF:

- DTOs
- schemas
- shared request/response types

#### `frontend/`
Frontend contains:

- screens
- components
- navigation declarations
- context-local feature composition

### 3. Shared Packages

#### `packages/design-system`
Contains:

- imported Tailwind color palette
- token conversion
- Tamagui configuration
- themes

#### `packages/ui-kit`
Contains low-level reusable UI primitives:

- buttons
- inputs
- cards
- text wrappers
- layout wrappers

#### `packages/ui-composed`
Contains higher-order reusable widgets built from Tamagui and companion libraries:

- data tables
- date pickers
- command palette wrappers
- list wrappers

#### `packages/core`
Contains cross-cutting non-UI logic:

- result helpers
- API client helpers
- query client helpers
- shared utility functions

#### `packages/platform`
Contains platform abstractions:

- storage
- camera
- file picking
- secure persistence wrappers

## Dependency Rules

Allowed:

- `frontend -> shared`
- `frontend -> @twyr/ui-kit`
- `frontend -> @twyr/ui-composed`
- `frontend -> @twyr/core`
- `frontend -> @twyr/design-system`
- `bff -> shared`
- `bff -> @twyr/core`

Forbidden:

- `frontend -> another bounded context frontend`
- `shared -> frontend`
- `shared -> bff`
- `bff -> database`
- `ui-kit -> domain code`

## Naming Rules

### Folder names
Use `snake_case` for domain and bounded-context folders.

Examples:

- `system_administrators`
- `session_management`

### Package names
Use the `@twyr/` scope and kebab-case package names.

Examples:

- `@twyr/design-system`
- `@twyr/users-session-management-frontend`
- `@twyr/system-administrators-profile-bff`

## UI Strategy

### Foundation
- Tamagui for shared components and layout
- React Native / React Native Web as the rendering surface
- Tailwind color palette as token source

### Companion libraries
- `@tanstack/react-table`
- `@tanstack/react-query`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `react-native-calendars`
- `@shopify/flash-list`
- `cmdk`
- `lexical`

These are wrapped inside repository-owned abstractions where practical.

## BFF Strategy

Each BFF exposes a small HTTP surface tailored to the bounded context. It should:

- accept frontend-friendly request shapes
- call one or more existing backend REST endpoints
- map the result into stable DTOs
- isolate the frontend from backend churn

Example pattern:

1. frontend calls `/api/users/session-management/login`
2. BFF validates the request
3. BFF forwards to the existing REST endpoint
4. BFF reshapes the response into `SessionDto`

## Incremental Delivery Plan

Recommended implementation order:

1. `packages/design-system`
2. `packages/ui-kit`
3. `packages/core`
4. one bounded context end-to-end, starting with:
   - `users/session_management/shared`
   - `users/session_management/bff`
   - `users/session_management/frontend`
5. shell integration
6. remaining bounded contexts

## Current Assumptions

This scaffold is generated with these assumptions:

- TypeScript is used across the repo
- npm workspaces are used
- Turborepo is used for orchestration
- the existing REST backend base URL is injected by environment variables
- web and mobile shells are intentionally thin
- module federation is not fully wired yet; the structure keeps that path open later

## What To Customize Next

Before production use, Twyr should refine:

- authentication flow details
- exact backend endpoint map
- route naming conventions
- environment and secret handling
- testing strategy
- observability and tracing
- deployment topology for BFF services
