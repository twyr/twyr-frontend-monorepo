# Twyr AI Workflow

This file describes how to use AI tools effectively in this repository.

## Goals

- preserve architecture integrity
- speed up scaffolding and repetitive coding
- keep AI output aligned with Twyr standards
- reduce rework by grounding tools in repository truth

## Core Rule

Treat repository documents as the source of truth. AI chat context is temporary. Repository files are durable.

The minimum context files for AI tools are:

- `ARCHITECTURE.md`
- `AGENTS.md`
- `AI_WORKFLOW.md`

## Recommended Workflow

### 1. Start with architecture context
Before asking an AI tool to generate code, point it at:

- `ARCHITECTURE.md`
- the relevant bounded context folder
- the relevant package folder
- any existing shared DTOs

### 2. Generate one slice at a time
Prefer this order:

1. shared contracts
2. BFF route and aggregator
3. frontend state and hooks
4. frontend screen
5. shell wiring

Do not ask an AI tool to generate the entire repo in one prompt once the project has real code.

### 3. Keep prompts narrow
Good prompt:

> Generate the users/session_management shared DTOs and zod schemas for login and refresh session.

Bad prompt:

> Build the full authentication platform.

### 4. Review for boundary violations
After AI output, review:

- imports
- package boundaries
- token usage
- platform assumptions
- proxy logic correctness

## Suggested AI Task Types

### Safe to delegate heavily
- scaffolding
- DTO generation
- zod schema generation
- form wiring
- route boilerplate
- index exports
- typed API clients
- query hooks
- simple UI primitives

### Requires close review
- aggregation logic
- auth flows
- route composition
- caching strategy
- environment handling
- command palette integration
- rich text integration

### Do not accept blindly
- architectural rewrites
- cross-context refactors
- dependency additions in shared packages
- shell-level changes
- security-sensitive logic

## Repo Anchors for AI Tools

When using Copilot, Codex, or similar tools, keep these files in the repo root so they are easy to index:

- `ARCHITECTURE.md`
- `AGENTS.md`
- `AI_WORKFLOW.md`

Optionally add future files such as:

- `docs/frontend.md`
- `docs/bff.md`
- `docs/testing.md`

## Prompt Template

Use a structure like this:

1. **Context**
   - Name the bounded context
   - Name the layer: frontend, shared, or BFF

2. **Task**
   - Explain the exact files to create or edit

3. **Constraints**
   - Mention package boundaries
   - Mention Twyr package names
   - Mention that BFF is proxy + aggregator only
   - Mention that colors come from the shared design system

4. **Output shape**
   - Ask for complete files
   - Ask for tests if required
   - Ask for minimal comments

## Review Checklist for AI Output

- Are imports legal?
- Is the generated code in the right package?
- Does it depend on the design system instead of hard-coded colors?
- Does it use DTOs from `shared/`?
- Does the BFF talk to the existing backend instead of inventing storage?
- Does the code keep web and mobile concerns separated?

## Git Workflow

Recommended loop:

1. create a short-lived branch
2. generate a small slice with AI
3. review locally
4. run lint and typecheck
5. commit
6. move to the next slice

## Documentation Maintenance

Whenever an AI-generated change updates structure or conventions:

- update `ARCHITECTURE.md`
- update `AGENTS.md`
- update this file if the workflow changes

## Current AI Priorities

For this scaffold, the next best AI-assisted tasks are:

1. enrich `@twyr/design-system`
2. harden `@twyr/ui-kit`
3. complete `users/session_management`
4. wire shells to the first bounded context
5. add tests and CI checks
