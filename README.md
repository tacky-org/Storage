# Tacky Storage

Browser storage management for React apps — a reactive `read / write / validate` pipeline that plugs directly into **TanStack Query**.

## Config vs Storage — which package do I need?

| | `@tacky-org/storage` | `@tacky-org/config` |
|---|---|---|
| **Source** | `localStorage`, `sessionStorage` | Server, environment, window globals |
| **Direction** | Read and write | Read-only |
| **Scope** | Always device-local — one value per key | Can vary per user, locale, or tenant via context |
| **Lifetime** | Changes whenever the user (or your code) writes | Loaded once per session, never changes unless invalidated |
| **Use for** | User preferences, UI state, last-visited, cached form data | API URLs, feature flags, remote config, environment settings |

**Use `@tacky-org/storage` when** your app both reads and writes the data and it belongs to the device, not the server.

**Use `@tacky-org/config` when** the data lives on a server or in the environment and your app only reads it.

---

## Why

User preferences and local state have the same problems as config: you need to validate what comes out of storage, you often need to map between the raw stored format and the shape your components use, and you want reactive updates when the value changes (including cross-tab). This package provides that pipeline. Reactivity, caching, and Suspense are delegated to TanStack Query.

---

## Installation

```bash
pnpm add @tacky-org/storage @tanstack/react-query
```
