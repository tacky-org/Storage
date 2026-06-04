import { queryOptions, useQueryClient, useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/Types.ts
var STORAGE_KEY_PREFIX = "storage__";

// src/Errors/StoragePipelineError.ts
var _StoragePipelineError = class _StoragePipelineError extends Error {
  constructor(step, cause) {
    super(
      `Storage pipeline failed at step "${step}": ${cause instanceof Error ? cause.message : String(cause)}`,
      { cause }
    );
    this.name = "StoragePipelineError";
    this.step = step;
  }
};
__name(_StoragePipelineError, "StoragePipelineError");
var StoragePipelineError = _StoragePipelineError;

// src/Domain/StorageStore.ts
function isWebStorage(store) {
  return "removeItem" in store;
}
__name(isWebStorage, "isWebStorage");
function toExternalStore(key, store) {
  if (!isWebStorage(store)) return store;
  const prefixedKey = `${STORAGE_KEY_PREFIX}${key}`;
  return {
    getItem() {
      const item = store.getItem(prefixedKey);
      if (item === null) return null;
      try {
        return JSON.parse(item);
      } catch {
        throw new Error(`Storage key "${prefixedKey}" contains invalid JSON`);
      }
    },
    setItem(value) {
      store.setItem(prefixedKey, JSON.stringify(value));
    },
    subscribe(listener) {
      const handler = /* @__PURE__ */ __name((event) => {
        if (event.storageArea === store && event.key === prefixedKey) {
          listener();
        }
      }, "handler");
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  };
}
__name(toExternalStore, "toExternalStore");
var _StorageStore = class _StorageStore {
  constructor(options) {
    this.options = options;
    this.externalStore = toExternalStore(options.key, options.store);
  }
  static create(options) {
    return new _StorageStore(options);
  }
  get() {
    let raw;
    try {
      raw = this.externalStore.getItem();
    } catch (cause) {
      throw new StoragePipelineError("read", cause);
    }
    if (raw === null) {
      return this.options.defaultValue ?? null;
    }
    let data;
    try {
      data = this.options.validate(raw);
    } catch (cause) {
      throw new StoragePipelineError("validate", cause);
    }
    if (this.options.map) {
      try {
        return this.options.map(data);
      } catch (cause) {
        throw new StoragePipelineError("map", cause);
      }
    }
    return data;
  }
  set(value) {
    let data;
    if (this.options.unmap) {
      try {
        data = this.options.unmap(value);
      } catch (cause) {
        throw new StoragePipelineError("unmap", cause);
      }
    } else {
      data = value;
    }
    try {
      this.externalStore.setItem(data);
    } catch (cause) {
      throw new StoragePipelineError("write", cause);
    }
  }
  patch(partial) {
    const current = this.get();
    this.set({ ...current, ...partial });
  }
  subscribe(listener) {
    return this.externalStore.subscribe(listener);
  }
  /**
   * The TanStack Query key for this store.
   * Matches the key written to Web Storage: `storage__<key>`.
   */
  get queryKey() {
    return [`${STORAGE_KEY_PREFIX}${this.options.key}`];
  }
};
__name(_StorageStore, "StorageStore");
var StorageStore = _StorageStore;
function createStorageQuery(store) {
  return queryOptions({
    queryKey: store.queryKey,
    queryFn: /* @__PURE__ */ __name(() => store.get(), "queryFn"),
    staleTime: Infinity
  });
}
__name(createStorageQuery, "createStorageQuery");

// src/Query/createStorageMutation.ts
function createStorageMutation(store) {
  return {
    mutationFn: /* @__PURE__ */ __name(async (value) => {
      store.set(value);
    }, "mutationFn")
  };
}
__name(createStorageMutation, "createStorageMutation");
function useStorageSync(store) {
  const queryClient = useQueryClient();
  useEffect(() => {
    return store.subscribe(() => {
      void queryClient.invalidateQueries({ queryKey: store.queryKey });
    });
  }, [queryClient, store]);
}
__name(useStorageSync, "useStorageSync");

// src/Query/useStorageQuery.ts
function useStorageQuery(store) {
  useStorageSync(store);
  return useQuery({
    queryKey: store.queryKey,
    queryFn: /* @__PURE__ */ __name(() => store.get(), "queryFn"),
    staleTime: Infinity
  });
}
__name(useStorageQuery, "useStorageQuery");
function useStorageSuspenseQuery(store) {
  useStorageSync(store);
  return useSuspenseQuery({
    queryKey: store.queryKey,
    queryFn: /* @__PURE__ */ __name(() => store.get(), "queryFn"),
    staleTime: Infinity
  });
}
__name(useStorageSuspenseQuery, "useStorageSuspenseQuery");
function useStorageMutation(store) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: /* @__PURE__ */ __name(async (action) => {
      if (action.type === "set") {
        store.set(action.value);
      } else {
        store.patch(action.partial);
      }
    }, "mutationFn"),
    onSuccess: /* @__PURE__ */ __name(() => {
      void queryClient.invalidateQueries({ queryKey: store.queryKey });
    }, "onSuccess")
  });
  return {
    set: /* @__PURE__ */ __name((value) => mutate({ type: "set", value }), "set"),
    patch: /* @__PURE__ */ __name((partial) => mutate({ type: "patch", partial }), "patch"),
    isPending,
    isError,
    isSuccess,
    error,
    reset
  };
}
__name(useStorageMutation, "useStorageMutation");

// src/Adapters/stores.ts
function fromMemory(initial = null) {
  let current = initial;
  const listeners = /* @__PURE__ */ new Set();
  return {
    getItem() {
      return current;
    },
    setItem(value) {
      current = value;
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
__name(fromMemory, "fromMemory");

// src/Adapters/validators.ts
function withZod(schema) {
  return (raw) => schema.parse(raw);
}
__name(withZod, "withZod");
function withYup(schema) {
  return (raw) => schema.validateSync(raw);
}
__name(withYup, "withYup");
function withJoi(schema) {
  return (raw) => {
    const { error, value } = schema.validate(raw);
    if (error) throw error;
    return value;
  };
}
__name(withJoi, "withJoi");
function withValibot(parser) {
  return (raw) => parser(raw);
}
__name(withValibot, "withValibot");

export { STORAGE_KEY_PREFIX, StoragePipelineError, StorageStore, createStorageMutation, createStorageQuery, fromMemory, useStorageMutation, useStorageQuery, useStorageSuspenseQuery, useStorageSync, withJoi, withValibot, withYup, withZod };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map