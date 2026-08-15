import {
  g as getDefaultExportFromCjs,
  a as requireDist$2,
  b as requireTokenError,
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
var token$2;
var hasRequiredToken;
function requireToken() {
  if (hasRequiredToken) return token$2;
  hasRequiredToken = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toCommonJS = (mod) =>
    __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var token_exports = {};
  __export(token_exports, {
    refreshToken: () => refreshToken,
  });
  token$2 = __toCommonJS(token_exports);
  var import_cli_config = requireDist$2();
  var import_token_error = requireTokenError();
  var import_token_util = requireTokenUtil();
  async function refreshToken(options) {
    let projectId = options?.project;
    let teamId = options?.team;
    if (!projectId && !teamId) {
      const projectInfo = (0, import_token_util.findProjectInfo)();
      projectId = projectInfo.projectId;
      teamId = projectInfo.teamId;
    } else if (!projectId || !teamId) {
      const projectInfo = (0, import_token_util.findProjectInfo)();
      projectId = projectId ?? projectInfo.projectId;
      teamId = teamId ?? projectInfo.teamId;
    }
    if (!projectId) {
      throw new import_token_error.VercelOidcTokenError(
        "Failed to refresh OIDC token: No project specified. Try re-linking your project with `vc link`",
      );
    }
    let maybeToken = (0, import_token_util.loadToken)(projectId);
    if (
      !maybeToken ||
      (0, import_token_util.isExpired)(
        (0, import_token_util.getTokenPayload)(maybeToken.token),
        options?.expirationBufferMs,
      )
    ) {
      const configDir = (0, import_cli_config.getGlobalPathConfig)();
      if (
        (0, import_cli_config.getLikelyEffectiveCredStorage)(configDir) ===
        "keyring"
      ) {
        maybeToken = await (0, import_token_util.getVercelOidcTokenFromCli)(
          projectId,
          teamId,
        );
      } else {
        const authToken = await (0, import_token_util.getVercelToken)({
          expirationBufferMs: options?.expirationBufferMs,
        });
        maybeToken = await (0, import_token_util.getVercelOidcToken)(
          authToken,
          projectId,
          teamId,
        );
      }
      if (!maybeToken) {
        throw new import_token_error.VercelOidcTokenError(
          "Failed to refresh OIDC token",
        );
      }
      (0, import_token_util.saveToken)(maybeToken, projectId);
    }
    process.env.VERCEL_OIDC_TOKEN = maybeToken.token;
    return;
  }
  return token$2;
}
var tokenExports = requireToken();
const token = /* @__PURE__ */ getDefaultExportFromCjs(tokenExports);
const token$1 = /* @__PURE__ */ _mergeNamespaces(
  {
    __proto__: null,
    default: token,
  },
  [tokenExports],
);
export { token$1 as t };
