/**
 * Base44 stub.
 *
 * Cloudflare Pages can evaluate modules from different contexts.
 * Keep this stub deterministic and avoid relying on custom global
 * symbols that may not exist in the Pages runtime.
 */

const GLOBAL_KEY = "__BASE44__";

const container = (() => {
  try {
    if (!globalThis[GLOBAL_KEY]) globalThis[GLOBAL_KEY] = {};
    return globalThis[GLOBAL_KEY];
  } catch {
    return {};
  }
})();

const db = container.__B44_DB__ || {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
  },
  entities: new Proxy(
    {},
    {
      get: () => ({
        filter: async () => [],
        get: async () => null,
        create: async () => ({}),
        update: async () => ({}),
        delete: async () => ({}),
      }),
    }
  ),
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: "" }),
    },
  },
};

// Try to persist stub for other modules if allowed.
try {
  globalThis.__B44_DB__ = db;
} catch {
  // ignore
}

export { db };
export const base44 = db;
export default db;


