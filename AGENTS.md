# Twyr Agent Guide

This file defines the working rules for AI coding agents and human contributors operating in this repository.

## Mission

Build and evolve the Twyr cross-platform frontend platform with strong bounded-context separation, minimal duplication, and strict adherence to the repository architecture.

## Non-Negotiables

1. Do not collapse bounded contexts into a frontend monolith.
2. Do not add DOM-only UI dependencies to shared cross-platform packages.
3. Do not access databases from BFF packages.
4. Do not add business logic that duplicates the existing system-of-record backend.
5. Do not allow one bounded context frontend to import another bounded context frontend.
6. Do not bypass shared contracts between frontend and BFF.

## Repository Roles

### 1. architecture-agent
Use for:

- structure proposals
- dependency rules
- package boundaries
- shell composition
- cross-cutting design decisions

Must:

- preserve bounded-context isolation
- prefer small, reversible changes
- update architecture docs when structure changes

### 2. design-system-agent
Use for:

- Tamagui configuration
- token derivation
- theme work
- shared primitive styling

Must:

- derive colors from the Twyr Tailwind palette
- keep tokens centralized
- avoid introducing app-specific business semantics into `ui-kit`

### 3. ui-agent
Use for:

- screens
- shared components
- composed widgets
- form assembly

Must:

- prefer `@twyr/ui-kit` and `@twyr/ui-composed`
- keep platform-specific branching at leaf nodes
- avoid direct knowledge of backend wire formats when DTOs already exist

### 4. bff-agent
Use for:

- BFF routes
- request validation
- response shaping
- proxy and aggregation logic

Must:

- talk only to the existing REST backend
- validate inputs and outputs
- never contain domain persistence code
- never become a second backend

### 5. contract-agent
Use for:

- DTOs
- zod schemas
- API contract consistency
- request/response typing

Must:

- keep frontend and BFF in sync
- place contracts in `shared/`
- avoid leaking internal backend payload shapes unless intentional

### 6. review-agent
Use for:

- pull request review
- boundary enforcement
- code quality review
- architecture compliance checks

Must:

- reject boundary violations
- reject duplicated logic across contexts
- reject hidden coupling between domains

## Boundaries

### Allowed imports

- bounded context frontend -> its own shared package
- bounded context frontend -> `@twyr/design-system`
- bounded context frontend -> `@twyr/ui-kit`
- bounded context frontend -> `@twyr/ui-composed`
- bounded context frontend -> `@twyr/core`
- bounded context BFF -> its own shared package
- bounded context BFF -> `@twyr/core`

### Forbidden imports

- bounded context frontend -> another context frontend
- shared package -> frontend package
- shared package -> BFF package
- `ui-kit` -> domain package
- `ui-composed` -> domain package

## Decision Rules

When adding new code:

1. Put it in the narrowest possible scope.
2. Prefer shared packages only when reuse is real and immediate.
3. Keep shell apps thin.
4. Keep DTOs explicit.
5. Use environment variables for backend locations and secrets.
6. Prefer composition over inheritance.
7. Prefer repository-owned wrappers around third-party libraries for reused patterns.

## Documentation Rules

When changing architecture or boundaries, update:

- `ARCHITECTURE.md`
- this file, if agent responsibilities change
- `AI_WORKFLOW.md` if the delivery workflow changes

## Coding Style Rules

- Use TypeScript
- Prefer named exports
- Keep files small and focused
- Validate network boundaries with zod
- Keep comments meaningful and sparse
- Use package-local `src/` folders
- Keep example code runnable where possible

## Pull Request Checklist

Before merging, verify:

- Does the change stay inside the intended bounded context?
- Does the change preserve frontend/BFF/shared separation?
- Does the change avoid duplicating backend business logic?
- Does the change respect token and design-system usage?
- Are package names and folder names compliant with Twyr conventions?
- Are docs updated if boundaries or workflows changed?
