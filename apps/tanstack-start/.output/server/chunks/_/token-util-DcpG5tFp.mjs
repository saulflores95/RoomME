import {
  g as getDefaultExportFromCjs,
  r as requireTokenUtil,
} from "./router-BydVigxg.mjs";

import "react/jsx-runtime";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@tanstack/react-router-ssr-query";
import "@trpc/tanstack-react-query";
import "superjson";
import "@trpc/client";
import "@trpc/server";
import "zod/v4";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
import "node:buffer";
import "node:crypto";
import "node:util";
import "node:http";
import "node:https";
import "node:events";
import "path";
import "node:fs/promises";
import "node:path";
import "child_process";
import "assert";
import "events";
import "buffer";
import "util";
import "zod";
import "node:fs";
import "node:os";
import "node:assert";
import "node:net";
import "node:stream";
import "node:querystring";
import "node:diagnostics_channel";
import "node:tls";
import "node:zlib";
import "node:perf_hooks";
import "node:util/types";
import "node:worker_threads";
import "node:url";
import "node:async_hooks";
import "node:console";
import "node:dns";
import "string_decoder";
import "@t3-oss/env-core";
import "better-auth/react-start";
import "better-auth/api";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import "better-auth/plugins/access";
import "better-auth/plugins/admin/access";
import "@t3-oss/env-core/presets-zod";
import "./server.mjs";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router-devtools";
import "react";
import "react-dom";
import "@trpc/server/adapters/fetch";

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(
              n,
              k,
              d.get
                ? d
                : {
                    enumerable: true,
                    get: () => e[k],
                  },
            );
          }
        }
      }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
  );
}
var tokenUtilExports = requireTokenUtil();
const tokenUtil = /* @__PURE__ */ getDefaultExportFromCjs(tokenUtilExports);
const tokenUtil$1 = /* @__PURE__ */ _mergeNamespaces(
  {
    __proto__: null,
    default: tokenUtil,
  },
  [tokenUtilExports],
);
export { tokenUtil$1 as t };
