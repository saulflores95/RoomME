import { Suspense } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createAuthClient } from "better-auth/react";

import { B as Button, u as useTRPC } from "./router-DT_aQl4p.mjs";

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
import "better-auth/react-start";
import "better-auth/api";
import "zod";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import "better-auth/plugins/access";
import "better-auth/plugins/admin/access";
import "@t3-oss/env-core";
import "@t3-oss/env-core/presets-zod";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router-devtools";
import "react-dom";
import "@trpc/server/adapters/fetch";

const authClient = createAuthClient();
function AuthShowcase() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  if (!session) {
    return /* @__PURE__ */ jsx("p", {
      className: "text-muted-foreground text-sm",
      children: "Sign in from the Next.js app at /es/sign-in",
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center justify-center gap-4",
    children: [
      /* @__PURE__ */ jsx("p", {
        className: "text-center text-2xl",
        children: /* @__PURE__ */ jsxs("span", {
          children: ["Logged in as ", session.user.name],
        }),
      }),
      /* @__PURE__ */ jsx(Button, {
        size: "lg",
        onClick: async () => {
          await authClient.signOut();
          await navigate({ href: "/", replace: true });
        },
        children: "Sign out",
      }),
    ],
  });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx("main", {
    className: "container py-16",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center justify-center gap-4",
      children: [
        /* @__PURE__ */ jsx("h1", {
          className: "text-5xl font-extrabold tracking-tight",
          children: "RoomMe",
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Use the Next.js app for the full experience.",
        }),
        /* @__PURE__ */ jsx(AuthShowcase, {}),
        /* @__PURE__ */ jsx(Suspense, {
          children: /* @__PURE__ */ jsx(ListingList, {}),
        }),
      ],
    }),
  });
}
function ListingList() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.listing.list.queryOptions({
      limit: 12,
    }),
  );
  return /* @__PURE__ */ jsx("ul", {
    className: "w-full max-w-xl space-y-2",
    children: data.map((listing) =>
      /* @__PURE__ */ jsxs(
        "li",
        {
          className: "rounded-lg border p-4",
          children: [
            /* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: listing.title,
            }),
            /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground text-sm",
              children: listing.complex.neighborhood,
            }),
          ],
        },
        listing.id,
      ),
    ),
  });
}
export { RouteComponent as component };
