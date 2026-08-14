import {
  p as ae,
  d as Ae,
  B as Be,
  e as ce,
  k as De,
  s as ee,
  m as Fe,
  a as G,
  c as J,
  u as je,
  t as Le,
  j as Me,
  r as N,
  f as Ne,
  i as re,
  g as Se,
  h as T,
  n as te,
  S as Ue,
  b as ue,
  l as v,
} from "./main-C8eTrL1h.js";

var ke = class extends Ue {
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#r = e),
      (this.#n = null),
      (this.#s = ae()),
      this.bindMethods(),
      this.setOptions(t));
  }
  #r;
  #e = void 0;
  #p = void 0;
  #t = void 0;
  #o;
  #l;
  #s;
  #n;
  #m;
  #f;
  #h;
  #a;
  #u;
  #i;
  #d = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#e.addObserver(this),
      le(this.#e, this.options) ? this.#c() : this.updateResult(),
      this.#R());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return se(this.#e, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return se(this.#e, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#b(),
      this.#O(),
      this.#e.removeObserver(this));
  }
  setOptions(e) {
    const t = this.options,
      r = this.#e;
    if (
      ((this.options = this.#r.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof N(this.options.enabled, this.#e) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#_(),
      this.#e.setOptions(this.options),
      t._defaulted &&
        !ee(this.options, t) &&
        this.#r
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#e,
            observer: this,
          }));
    const s = this.hasListeners();
    (s && fe(this.#e, r, this.options, t) && this.#c(),
      this.updateResult(),
      s &&
        (this.#e !== r ||
          N(this.options.enabled, this.#e) !== N(t.enabled, this.#e) ||
          G(this.options.staleTime, this.#e) !== G(t.staleTime, this.#e)) &&
        this.#y());
    const n = this.#g();
    s &&
      (this.#e !== r ||
        N(this.options.enabled, this.#e) !== N(t.enabled, this.#e) ||
        n !== this.#i) &&
      this.#v(n);
  }
  getOptimisticResult(e) {
    const t = this.#r.getQueryCache().build(this.#r, e),
      r = this.createResult(t, e);
    return (
      qe(this, r) &&
        ((this.#t = r), (this.#l = this.options), (this.#o = this.#e.state)),
      r
    );
  }
  getCurrentResult() {
    return this.#t;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (r, s) => (
        this.trackProp(s),
        t?.(s),
        s === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#s.status === "pending" &&
            this.#s.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(r, s)
      ),
    });
  }
  trackProp(e) {
    this.#d.add(e);
  }
  getCurrentQuery() {
    return this.#e;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    const t = this.#r.defaultQueryOptions(e),
      r = this.#r.getQueryCache().build(this.#r, t);
    return r.fetch().then(() => this.createResult(r, t));
  }
  fetch(e) {
    return this.#c({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#t),
    );
  }
  #c(e) {
    this.#_();
    let t = this.#e.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(te)), t);
  }
  #y() {
    this.#b();
    const e = G(this.options.staleTime, this.#e);
    if (re || this.#t.isStale || !ue(e)) return;
    const r = Le(this.#t.dataUpdatedAt, e) + 1;
    this.#a = J.setTimeout(() => {
      this.#t.isStale || this.updateResult();
    }, r);
  }
  #g() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#e)
        : this.options.refetchInterval) ?? !1
    );
  }
  #v(e) {
    (this.#O(),
      (this.#i = e),
      !(
        re ||
        N(this.options.enabled, this.#e) === !1 ||
        !ue(this.#i) ||
        this.#i === 0
      ) &&
        (this.#u = J.setInterval(() => {
          (this.options.refetchIntervalInBackground || Ne.isFocused()) &&
            this.#c();
        }, this.#i)));
  }
  #R() {
    (this.#y(), this.#v(this.#g()));
  }
  #b() {
    this.#a && (J.clearTimeout(this.#a), (this.#a = void 0));
  }
  #O() {
    this.#u && (J.clearInterval(this.#u), (this.#u = void 0));
  }
  createResult(e, t) {
    const r = this.#e,
      s = this.options,
      n = this.#t,
      a = this.#o,
      i = this.#l,
      c = e !== r ? e.state : this.#p,
      { state: u } = e;
    let o = { ...u },
      h = !1,
      d;
    if (t._optimisticResults) {
      const O = this.hasListeners(),
        F = !O && le(e, t),
        k = O && fe(e, r, t, s);
      ((F || k) && (o = { ...o, ...Ae(u.data, e.options) }),
        t._optimisticResults === "isRestoring" && (o.fetchStatus = "idle"));
    }
    let { error: w, errorUpdatedAt: x, status: b } = o;
    d = o.data;
    let g = !1;
    if (t.placeholderData !== void 0 && d === void 0 && b === "pending") {
      let O;
      (n?.isPlaceholderData && t.placeholderData === i?.placeholderData
        ? ((O = n.data), (g = !0))
        : (O =
            typeof t.placeholderData == "function"
              ? t.placeholderData(this.#h?.state.data, this.#h)
              : t.placeholderData),
        O !== void 0 && ((b = "success"), (d = ce(n?.data, O, t)), (h = !0)));
    }
    if (t.select && d !== void 0 && !g)
      if (n && d === a?.data && t.select === this.#m) d = this.#f;
      else
        try {
          ((this.#m = t.select),
            (d = t.select(d)),
            (d = ce(n?.data, d, t)),
            (this.#f = d),
            (this.#n = null));
        } catch (O) {
          this.#n = O;
        }
    this.#n && ((w = this.#n), (d = this.#f), (x = Date.now()), (b = "error"));
    const U = o.fetchStatus === "fetching",
      P = b === "pending",
      S = b === "error",
      f = P && U,
      M = d !== void 0,
      E = {
        status: b,
        fetchStatus: o.fetchStatus,
        isPending: P,
        isSuccess: b === "success",
        isError: S,
        isInitialLoading: f,
        isLoading: f,
        data: d,
        dataUpdatedAt: o.dataUpdatedAt,
        error: w,
        errorUpdatedAt: x,
        failureCount: o.fetchFailureCount,
        failureReason: o.fetchFailureReason,
        errorUpdateCount: o.errorUpdateCount,
        isFetched: o.dataUpdateCount > 0 || o.errorUpdateCount > 0,
        isFetchedAfterMount:
          o.dataUpdateCount > c.dataUpdateCount ||
          o.errorUpdateCount > c.errorUpdateCount,
        isFetching: U,
        isRefetching: U && !P,
        isLoadingError: S && !M,
        isPaused: o.fetchStatus === "paused",
        isPlaceholderData: h,
        isRefetchError: S && M,
        isStale: oe(e, t),
        refetch: this.refetch,
        promise: this.#s,
        isEnabled: N(t.enabled, e) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const O = (Q) => {
          E.status === "error"
            ? Q.reject(E.error)
            : E.data !== void 0 && Q.resolve(E.data);
        },
        F = () => {
          const Q = (this.#s = E.promise = ae());
          O(Q);
        },
        k = this.#s;
      switch (k.status) {
        case "pending":
          e.queryHash === r.queryHash && O(k);
          break;
        case "fulfilled":
          (E.status === "error" || E.data !== k.value) && F();
          break;
        case "rejected":
          (E.status !== "error" || E.error !== k.reason) && F();
          break;
      }
    }
    return E;
  }
  updateResult() {
    const e = this.#t,
      t = this.createResult(this.#e, this.options);
    if (
      ((this.#o = this.#e.state),
      (this.#l = this.options),
      this.#o.data !== void 0 && (this.#h = this.#e),
      ee(t, e))
    )
      return;
    this.#t = t;
    const r = () => {
      if (!e) return !0;
      const { notifyOnChangeProps: s } = this.options,
        n = typeof s == "function" ? s() : s;
      if (n === "all" || (!n && !this.#d.size)) return !0;
      const a = new Set(n ?? this.#d);
      return (
        this.options.throwOnError && a.add("error"),
        Object.keys(this.#t).some((i) => {
          const l = i;
          return this.#t[l] !== e[l] && a.has(l);
        })
      );
    };
    this.#S({ listeners: r() });
  }
  #_() {
    const e = this.#r.getQueryCache().build(this.#r, this.options);
    if (e === this.#e) return;
    const t = this.#e;
    ((this.#e = e),
      (this.#p = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#R());
  }
  #S(e) {
    Se.batch(() => {
      (e.listeners &&
        this.listeners.forEach((t) => {
          t(this.#t);
        }),
        this.#r
          .getQueryCache()
          .notify({ query: this.#e, type: "observerResultsUpdated" }));
    });
  }
};
function $e(e, t) {
  return (
    N(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function le(e, t) {
  return $e(e, t) || (e.state.data !== void 0 && se(e, t, t.refetchOnMount));
}
function se(e, t, r) {
  if (N(t.enabled, e) !== !1 && G(t.staleTime, e) !== "static") {
    const s = typeof r == "function" ? r(e) : r;
    return s === "always" || (s !== !1 && oe(e, t));
  }
  return !1;
}
function fe(e, t, r, s) {
  return (
    (e !== t || N(s.enabled, e) === !1) &&
    (!r.suspense || e.state.status !== "error") &&
    oe(e, r)
  );
}
function oe(e, t) {
  return N(t.enabled, e) !== !1 && e.isStaleByTime(G(t.staleTime, e));
}
function qe(e, t) {
  return !ee(e.getCurrentResult(), t);
}
var Ee = T.createContext(!1),
  Qe = () => T.useContext(Ee);
Ee.Provider;
function Ve() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var He = T.createContext(Ve()),
  We = () => T.useContext(He),
  Ge = (e, t) => {
    (e.suspense || e.throwOnError || e.experimental_prefetchInRender) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  Je = (e) => {
    T.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  Ye = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: r,
    query: s,
    suspense: n,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    s &&
    ((n && e.data === void 0) || Me(r, [e.error, s])),
  ze = (e, t) => t.state.data === void 0,
  Xe = (e) => {
    if (e.suspense) {
      const r = (n) => (n === "static" ? n : Math.max(n ?? 1e3, 1e3)),
        s = e.staleTime;
      ((e.staleTime = typeof s == "function" ? (...n) => r(s(...n)) : r(s)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
    }
  },
  Ze = (e, t) => e.isLoading && e.isFetching && !t,
  Ke = (e, t) => e?.suspense && t.isPending,
  he = (e, t, r) =>
    t.fetchOptimistic(e).catch(() => {
      r.clearReset();
    });
function et(e, t, r) {
  const s = Qe(),
    n = We(),
    a = je(),
    i = a.defaultQueryOptions(e);
  (a.getDefaultOptions().queries?._experimental_beforeQuery?.(i),
    (i._optimisticResults = s ? "isRestoring" : "optimistic"),
    Xe(i),
    Ge(i, n),
    Je(n));
  const l = !a.getQueryCache().get(i.queryHash),
    [c] = T.useState(() => new t(a, i)),
    u = c.getOptimisticResult(i),
    o = !s && e.subscribed !== !1;
  if (
    (T.useSyncExternalStore(
      T.useCallback(
        (h) => {
          const d = o ? c.subscribe(Se.batchCalls(h)) : te;
          return (c.updateResult(), d);
        },
        [c, o],
      ),
      () => c.getCurrentResult(),
      () => c.getCurrentResult(),
    ),
    T.useEffect(() => {
      c.setOptions(i);
    }, [i, c]),
    Ke(i, u))
  )
    throw he(i, c, n);
  if (
    Ye({
      result: u,
      errorResetBoundary: n,
      throwOnError: i.throwOnError,
      query: a.getQueryCache().get(i.queryHash),
      suspense: i.suspense,
    })
  )
    throw u.error;
  return (
    a.getDefaultOptions().queries?._experimental_afterQuery?.(i, u),
    i.experimental_prefetchInRender &&
      !re &&
      Ze(u, s) &&
      (l ? he(i, c, n) : a.getQueryCache().get(i.queryHash)?.promise)
        ?.catch(te)
        .finally(() => {
          c.updateResult();
        }),
    i.notifyOnChangeProps ? u : c.trackResult(u)
  );
}
function tt(e, t) {
  return et(
    {
      ...e,
      enabled: !0,
      suspense: !0,
      throwOnError: ze,
      placeholderData: void 0,
    },
    ke,
  );
}
var rt = Object.defineProperty,
  st = Object.defineProperties,
  nt = Object.getOwnPropertyDescriptors,
  de = Object.getOwnPropertySymbols,
  it = Object.prototype.hasOwnProperty,
  ot = Object.prototype.propertyIsEnumerable,
  pe = (e, t, r) =>
    t in e
      ? rt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  A = (e, t) => {
    for (var r in t || (t = {})) it.call(t, r) && pe(e, r, t[r]);
    if (de) for (var r of de(t)) ot.call(t, r) && pe(e, r, t[r]);
    return e;
  },
  j = (e, t) => st(e, nt(t)),
  at = class extends Error {
    constructor(e, t, r) {
      (super(t || e.toString(), { cause: r }),
        (this.status = e),
        (this.statusText = t),
        (this.error = r));
    }
  },
  ut = async (e, t) => {
    var r, s, n, a, i, l;
    let c = t || {};
    const u = {
      onRequest: [t?.onRequest],
      onResponse: [t?.onResponse],
      onSuccess: [t?.onSuccess],
      onError: [t?.onError],
      onRetry: [t?.onRetry],
    };
    if (!t || !t?.plugins) return { url: e, options: c, hooks: u };
    for (const o of t?.plugins || []) {
      if (o.init) {
        const h = await ((r = o.init) == null
          ? void 0
          : r.call(o, e.toString(), t));
        ((c = h.options || c), (e = h.url));
      }
      (u.onRequest.push((s = o.hooks) == null ? void 0 : s.onRequest),
        u.onResponse.push((n = o.hooks) == null ? void 0 : n.onResponse),
        u.onSuccess.push((a = o.hooks) == null ? void 0 : a.onSuccess),
        u.onError.push((i = o.hooks) == null ? void 0 : i.onError),
        u.onRetry.push((l = o.hooks) == null ? void 0 : l.onRetry));
    }
    return { url: e, options: c, hooks: u };
  },
  me = class {
    constructor(e) {
      this.options = e;
    }
    shouldAttemptRetry(e, t) {
      return this.options.shouldRetry
        ? Promise.resolve(
            e < this.options.attempts && this.options.shouldRetry(t),
          )
        : Promise.resolve(e < this.options.attempts);
    }
    getDelay() {
      return this.options.delay;
    }
  },
  ct = class {
    constructor(e) {
      this.options = e;
    }
    shouldAttemptRetry(e, t) {
      return this.options.shouldRetry
        ? Promise.resolve(
            e < this.options.attempts && this.options.shouldRetry(t),
          )
        : Promise.resolve(e < this.options.attempts);
    }
    getDelay(e) {
      return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** e);
    }
  };
function lt(e) {
  if (typeof e == "number")
    return new me({ type: "linear", attempts: e, delay: 1e3 });
  switch (e.type) {
    case "linear":
      return new me(e);
    case "exponential":
      return new ct(e);
    default:
      throw new Error("Invalid retry strategy");
  }
}
var ft = async (e) => {
    const t = {},
      r = async (s) => (typeof s == "function" ? await s() : s);
    if (e?.auth) {
      if (e.auth.type === "Bearer") {
        const s = await r(e.auth.token);
        if (!s) return t;
        t.authorization = `Bearer ${s}`;
      } else if (e.auth.type === "Basic") {
        const s = r(e.auth.username),
          n = r(e.auth.password);
        if (!s || !n) return t;
        t.authorization = `Basic ${btoa(`${s}:${n}`)}`;
      } else if (e.auth.type === "Custom") {
        const s = r(e.auth.value);
        if (!s) return t;
        t.authorization = `${r(e.auth.prefix)} ${s}`;
      }
    }
    return t;
  },
  ht = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function dt(e) {
  const t = e.headers.get("content-type"),
    r = new Set([
      "image/svg",
      "application/xml",
      "application/xhtml",
      "application/html",
    ]);
  if (!t) return "json";
  const s = t.split(";").shift() || "";
  return ht.test(s)
    ? "json"
    : r.has(s) || s.startsWith("text/")
      ? "text"
      : "blob";
}
function pt(e) {
  try {
    return (JSON.parse(e), !0);
  } catch {
    return !1;
  }
}
function Te(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null
    ? !0
    : t !== "object"
      ? !1
      : Array.isArray(e)
        ? !0
        : e.buffer
          ? !1
          : (e.constructor && e.constructor.name === "Object") ||
            typeof e.toJSON == "function";
}
function ye(e) {
  try {
    return JSON.parse(e);
  } catch {
    return e;
  }
}
function ge(e) {
  return typeof e == "function";
}
function mt(e) {
  if (e?.customFetchImpl) return e.customFetchImpl;
  if (typeof globalThis < "u" && ge(globalThis.fetch)) return globalThis.fetch;
  if (typeof window < "u" && ge(window.fetch)) return window.fetch;
  throw new Error("No fetch implementation found");
}
async function yt(e) {
  const t = new Headers(e?.headers),
    r = await ft(e);
  for (const [s, n] of Object.entries(r || {})) t.set(s, n);
  if (!t.has("content-type")) {
    const s = gt(e?.body);
    s && t.set("content-type", s);
  }
  return t;
}
function gt(e) {
  return Te(e) ? "application/json" : null;
}
function vt(e) {
  if (!e?.body) return null;
  const t = new Headers(e?.headers);
  if (Te(e.body) && !t.has("content-type")) {
    for (const [r, s] of Object.entries(e?.body))
      s instanceof Date && (e.body[r] = s.toISOString());
    return JSON.stringify(e.body);
  }
  return e.body;
}
function Rt(e, t) {
  var r;
  if (t?.method) return t.method.toUpperCase();
  if (e.startsWith("@")) {
    const s = (r = e.split("@")[1]) == null ? void 0 : r.split("/")[0];
    return xe.includes(s) ? s.toUpperCase() : t?.body ? "POST" : "GET";
  }
  return t?.body ? "POST" : "GET";
}
function bt(e, t) {
  let r;
  return (
    !e?.signal && e?.timeout && (r = setTimeout(() => t?.abort(), e?.timeout)),
    {
      abortTimeout: r,
      clearTimeout: () => {
        r && clearTimeout(r);
      },
    }
  );
}
var Ot = class we extends Error {
  constructor(t, r) {
    (super(r || JSON.stringify(t, null, 2)),
      (this.issues = t),
      Object.setPrototypeOf(this, we.prototype));
  }
};
async function Z(e, t) {
  let r = await e["~standard"].validate(t);
  if (r.issues) throw new Ot(r.issues);
  return r.value;
}
var xe = ["get", "post", "put", "patch", "delete"],
  _t = (e) => ({
    id: "apply-schema",
    name: "Apply Schema",
    version: "1.0.0",
    async init(t, r) {
      var s, n, a, i;
      const l =
        ((n =
          (s = e.plugins) == null
            ? void 0
            : s.find((c) => {
                var u;
                return (u = c.schema) != null && u.config
                  ? t.startsWith(c.schema.config.baseURL || "") ||
                      t.startsWith(c.schema.config.prefix || "")
                  : !1;
              })) == null
          ? void 0
          : n.schema) || e.schema;
      if (l) {
        let c = t;
        ((a = l.config) != null &&
          a.prefix &&
          c.startsWith(l.config.prefix) &&
          ((c = c.replace(l.config.prefix, "")),
          l.config.baseURL &&
            (t = t.replace(l.config.prefix, l.config.baseURL))),
          (i = l.config) != null &&
            i.baseURL &&
            c.startsWith(l.config.baseURL) &&
            (c = c.replace(l.config.baseURL, "")));
        const u = l.schema[c];
        if (u) {
          let o = j(A({}, r), { method: u.method, output: u.output });
          return (
            r?.disableValidation ||
              (o = j(A({}, o), {
                body: u.input ? await Z(u.input, r?.body) : r?.body,
                params: u.params ? await Z(u.params, r?.params) : r?.params,
                query: u.query ? await Z(u.query, r?.query) : r?.query,
              })),
            { url: t, options: o }
          );
        }
      }
      return { url: t, options: r };
    },
  }),
  St = (e) => {
    async function t(r, s) {
      const n = j(A(A({}, e), s), {
        plugins: [...(e?.plugins || []), _t(e || {})],
      });
      if (e?.catchAllError)
        try {
          return await ne(r, n);
        } catch (a) {
          return {
            data: null,
            error: {
              status: 500,
              statusText: "Fetch Error",
              message:
                "Fetch related error. Captured by catchAllError option. See error property for more details.",
              error: a,
            },
          };
        }
      return await ne(r, n);
    }
    return t;
  };
function Et(e, t) {
  let {
      baseURL: r,
      params: s,
      query: n,
    } = t || { query: {}, params: {}, baseURL: "" },
    a = e.startsWith("http") ? e.split("/").slice(0, 3).join("/") : r || "";
  if (e.startsWith("@")) {
    const h = e.toString().split("@")[1].split("/")[0];
    xe.includes(h) && (e = e.replace(`@${h}/`, "/"));
  }
  a.endsWith("/") || (a += "/");
  let [i, l] = e.replace(a, "").split("?");
  const c = new URLSearchParams(l);
  for (const [h, d] of Object.entries(n || {}))
    d != null && c.set(h, String(d));
  if (s)
    if (Array.isArray(s)) {
      const h = i.split("/").filter((d) => d.startsWith(":"));
      for (const [d, w] of h.entries()) {
        const x = s[d];
        i = i.replace(w, x);
      }
    } else
      for (const [h, d] of Object.entries(s)) i = i.replace(`:${h}`, String(d));
  ((i = i.split("/").map(encodeURIComponent).join("/")),
    i.startsWith("/") && (i = i.slice(1)));
  let u = c.toString();
  return (
    (u = u.length > 0 ? `?${u}`.replace(/\+/g, "%20") : ""),
    a.startsWith("http") ? new URL(`${i}${u}`, a) : `${a}${i}${u}`
  );
}
var ne = async (e, t) => {
    var r, s, n, a, i, l, c, u;
    const { hooks: o, url: h, options: d } = await ut(e, t),
      w = mt(d),
      x = new AbortController(),
      b = (r = d.signal) != null ? r : x.signal,
      g = Et(h, d),
      U = vt(d),
      P = await yt(d),
      S = Rt(h, d);
    let f = j(A({}, d), { url: g, headers: P, body: U, method: S, signal: b });
    for (const C of o.onRequest)
      if (C) {
        const R = await C(f);
        R instanceof Object && (f = R);
      }
    (("pipeTo" in f && typeof f.pipeTo == "function") ||
      typeof ((s = t?.body) == null ? void 0 : s.pipe) == "function") &&
      ("duplex" in f || (f.duplex = "half"));
    const { clearTimeout: M } = bt(d, x);
    let p = await w(f.url, f);
    M();
    const E = { response: p, request: f };
    for (const C of o.onResponse)
      if (C) {
        const R = await C(
          j(A({}, E), {
            response:
              (n = t?.hookOptions) != null && n.cloneResponse ? p.clone() : p,
          }),
        );
        R instanceof Response
          ? (p = R)
          : R instanceof Object && (p = R.response);
      }
    if (p.ok) {
      if (!(f.method !== "HEAD")) return { data: "", error: null };
      const R = dt(p),
        $ = { data: "", response: p, request: f };
      if (R === "json" || R === "text") {
        const q = await p.text(),
          Ie = await ((a = f.jsonParser) != null ? a : ye)(q);
        $.data = Ie;
      } else $.data = await p[R]();
      f?.output &&
        f.output &&
        !f.disableValidation &&
        ($.data = await Z(f.output, $.data));
      for (const q of o.onSuccess)
        q &&
          (await q(
            j(A({}, $), {
              response:
                (i = t?.hookOptions) != null && i.cloneResponse ? p.clone() : p,
            }),
          ));
      return t?.throw ? $.data : { data: $.data, error: null };
    }
    const O = (l = t?.jsonParser) != null ? l : ye,
      F = await p.text(),
      k = pt(F),
      Q = k ? await O(F) : null,
      Ce = {
        response: p,
        responseText: F,
        request: f,
        error: j(A({}, Q), { status: p.status, statusText: p.statusText }),
      };
    for (const C of o.onError)
      C &&
        (await C(
          j(A({}, Ce), {
            response:
              (c = t?.hookOptions) != null && c.cloneResponse ? p.clone() : p,
          }),
        ));
    if (t?.retry) {
      const C = lt(t.retry),
        R = (u = t.retryAttempt) != null ? u : 0;
      if (await C.shouldAttemptRetry(R, p)) {
        for (const q of o.onRetry) q && (await q(E));
        const $ = C.getDelay(R);
        return (
          await new Promise((q) => setTimeout(q, $)),
          await ne(e, j(A({}, t), { retryAttempt: R + 1 }))
        );
      }
    }
    if (t?.throw) throw new at(p.status, p.statusText, k ? Q : F);
    return {
      data: null,
      error: j(A({}, Q), { status: p.status, statusText: p.statusText }),
    };
  },
  Tt = {},
  ve = {};
const K = Object.create(null),
  H = (e) =>
    Tt ||
    globalThis.Deno?.env.toObject() ||
    globalThis.__env__ ||
    (e ? K : globalThis),
  I = new Proxy(K, {
    get(e, t) {
      return H()[t] ?? K[t];
    },
    has(e, t) {
      const r = H();
      return t in r || t in K;
    },
    set(e, t, r) {
      const s = H(!0);
      return ((s[t] = r), !0);
    },
    deleteProperty(e, t) {
      if (!t) return !1;
      const r = H(!0);
      return (delete r[t], !0);
    },
    ownKeys() {
      const e = H(!0);
      return Object.keys(e);
    },
  });
function m(e, t) {
  return typeof process < "u" && ve
    ? (ve[e] ?? t)
    : typeof Deno < "u"
      ? (Deno.env.get(e) ?? t)
      : typeof Bun < "u"
        ? (Bun.env[e] ?? t)
        : t;
}
const W = 1,
  y = 4,
  D = 8,
  _ = 24,
  Re = {
    eterm: y,
    cons25: y,
    console: y,
    cygwin: y,
    dtterm: y,
    gnome: y,
    hurd: y,
    jfbterm: y,
    konsole: y,
    kterm: y,
    mlterm: y,
    mosh: _,
    putty: y,
    st: y,
    "rxvt-unicode-24bit": _,
    terminator: _,
    "xterm-kitty": _,
  },
  wt = new Map(
    Object.entries({
      APPVEYOR: D,
      BUILDKITE: D,
      CIRCLECI: _,
      DRONE: D,
      GITEA_ACTIONS: _,
      GITHUB_ACTIONS: _,
      GITLAB_CI: D,
      TRAVIS: D,
    }),
  ),
  xt = [
    /ansi/,
    /color/,
    /linux/,
    /direct/,
    /^con[0-9]*x[0-9]/,
    /^rxvt/,
    /^screen/,
    /^xterm/,
    /^vt100/,
    /^vt220/,
  ];
function Pt() {
  if (m("FORCE_COLOR") !== void 0)
    switch (m("FORCE_COLOR")) {
      case "":
      case "1":
      case "true":
        return y;
      case "2":
        return D;
      case "3":
        return _;
      default:
        return W;
    }
  if (
    (m("NODE_DISABLE_COLORS") !== void 0 && m("NODE_DISABLE_COLORS") !== "") ||
    (m("NO_COLOR") !== void 0 && m("NO_COLOR") !== "") ||
    m("TERM") === "dumb"
  )
    return W;
  if ((typeof process < "u" && process.platform === "win32") || m("TMUX"))
    return _;
  if ("TF_BUILD" in I && "AGENT_NAME" in I) return y;
  if ("CI" in I) {
    for (const { 0: e, 1: t } of wt) if (e in I) return t;
    return m("CI_NAME") === "codeship" ? D : W;
  }
  if ("TEAMCITY_VERSION" in I)
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec(m("TEAMCITY_VERSION")) !== null
      ? y
      : W;
  switch (m("TERM_PROGRAM")) {
    case "iTerm.app":
      return !m("TERM_PROGRAM_VERSION") ||
        /^[0-2]\./.exec(m("TERM_PROGRAM_VERSION")) !== null
        ? D
        : _;
    case "HyperTerm":
    case "MacTerm":
      return _;
    case "Apple_Terminal":
      return D;
  }
  if (m("COLORTERM") === "truecolor" || m("COLORTERM") === "24bit") return _;
  if (m("TERM")) {
    if (/truecolor/.exec(m("TERM")) !== null) return _;
    if (/^xterm-256/.exec(m("TERM")) !== null) return D;
    const e = m("TERM").toLowerCase();
    if (Re[e]) return Re[e];
    if (xt.some((t) => t.exec(e) !== null)) return y;
  }
  return m("COLORTERM") ? y : W;
}
const B = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    dim: "\x1B[2m",
    fg: {
      red: "\x1B[31m",
      green: "\x1B[32m",
      yellow: "\x1B[33m",
      blue: "\x1B[34m",
      magenta: "\x1B[35m",
    },
  },
  ie = ["info", "success", "warn", "error", "debug"];
function Ct(e, t) {
  return ie.indexOf(t) <= ie.indexOf(e);
}
const It = {
    info: B.fg.blue,
    success: B.fg.green,
    warn: B.fg.yellow,
    error: B.fg.red,
    debug: B.fg.magenta,
  },
  Ut = (e, t, r) => {
    const s = new Date().toISOString();
    return r
      ? `${B.dim}${s}${B.reset} ${It[e]}${e.toUpperCase()}${B.reset} ${B.bright}[Better Auth]:${B.reset} ${t}`
      : `${s} ${e.toUpperCase()} [Better Auth]: ${t}`;
  },
  Lt = (e) => {
    const t = "error",
      r = Pt() !== 1,
      s = (a, i, l = []) => {
        if (!Ct(t, a)) return;
        const c = Ut(a, i, r);
        {
          a === "error"
            ? console.error(c, ...l)
            : a === "warn"
              ? console.warn(c, ...l)
              : console.log(c, ...l);
          return;
        }
      };
    return {
      ...Object.fromEntries(ie.map((a) => [a, (...[i, ...l]) => s(a, i, l)])),
      get level() {
        return t;
      },
    };
  };
Lt();
class Nt extends Error {
  constructor(t, r) {
    (super(t),
      (this.name = "BetterAuthError"),
      (this.message = t),
      (this.cause = r),
      (this.stack = ""));
  }
}
function At(e) {
  try {
    return (new URL(e).pathname.replace(/\/+$/, "") || "/") !== "/";
  } catch {
    throw new Nt(`Invalid base URL: ${e}. Please provide a valid base URL.`);
  }
}
function be(e, t = "/api/auth") {
  if (At(e)) return e;
  const s = e.replace(/\/+$/, "");
  return !t || t === "/"
    ? s
    : ((t = t.startsWith("/") ? t : `/${t}`), `${s}${t}`);
}
function Mt(e, t, r, s) {
  {
    const n =
      I.BETTER_AUTH_URL ||
      I.NEXT_PUBLIC_BETTER_AUTH_URL ||
      I.PUBLIC_BETTER_AUTH_URL ||
      I.NUXT_PUBLIC_BETTER_AUTH_URL ||
      I.NUXT_PUBLIC_AUTH_URL ||
      (I.BASE_URL !== "/" ? I.BASE_URL : void 0);
    if (n) return be(n, t);
  }
  if (typeof window < "u" && window.location)
    return be(window.location.origin, t);
}
let L = [],
  V = 0;
const Y = 4;
let Pe = (e) => {
  let t = [],
    r = {
      get() {
        return (r.lc || r.listen(() => {})(), r.value);
      },
      lc: 0,
      listen(s) {
        return (
          (r.lc = t.push(s)),
          () => {
            for (let a = V + Y; a < L.length; )
              L[a] === s ? L.splice(a, Y) : (a += Y);
            let n = t.indexOf(s);
            ~n && (t.splice(n, 1), --r.lc || r.off());
          }
        );
      },
      notify(s, n) {
        let a = !L.length;
        for (let i of t) L.push(i, r.value, s, n);
        if (a) {
          for (V = 0; V < L.length; V += Y) L[V](L[V + 1], L[V + 2], L[V + 3]);
          L.length = 0;
        }
      },
      off() {},
      set(s) {
        let n = r.value;
        n !== s && ((r.value = s), r.notify(n));
      },
      subscribe(s) {
        let n = r.listen(s);
        return (s(r.value), n);
      },
      value: e,
    };
  return r;
};
const jt = 5,
  z = 6,
  X = 10;
let Dt = (e, t, r, s) => (
    (e.events = e.events || {}),
    e.events[r + X] ||
      (e.events[r + X] = s((n) => {
        e.events[r].reduceRight((a, i) => (i(a), a), { shared: {}, ...n });
      })),
    (e.events[r] = e.events[r] || []),
    e.events[r].push(t),
    () => {
      let n = e.events[r],
        a = n.indexOf(t);
      (n.splice(a, 1),
        n.length ||
          (delete e.events[r], e.events[r + X](), delete e.events[r + X]));
    }
  ),
  Bt = 1e3,
  Ft = (e, t) =>
    Dt(
      e,
      (s) => {
        let n = t(s);
        n && e.events[z].push(n);
      },
      jt,
      (s) => {
        let n = e.listen;
        e.listen = (...i) => (
          !e.lc && !e.active && ((e.active = !0), s()),
          n(...i)
        );
        let a = e.off;
        return (
          (e.events[z] = []),
          (e.off = () => {
            (a(),
              setTimeout(() => {
                if (e.active && !e.lc) {
                  e.active = !1;
                  for (let i of e.events[z]) i();
                  e.events[z] = [];
                }
              }, Bt));
          }),
          () => {
            ((e.listen = n), (e.off = a));
          }
        );
      },
    );
function kt(e, t, r) {
  let s = new Set(t).add(void 0);
  return e.listen((n, a, i) => {
    s.has(i) && r(n, a, i);
  });
}
const $t = typeof window > "u",
  qt = (e, t, r, s) => {
    const n = Pe({
        data: null,
        error: null,
        isPending: !0,
        isRefetching: !1,
        refetch: (l) => a(l),
      }),
      a = (l) => {
        const c =
          typeof s == "function"
            ? s({
                data: n.get().data,
                error: n.get().error,
                isPending: n.get().isPending,
              })
            : s;
        r(t, {
          ...c,
          query: { ...c?.query, ...l?.query },
          async onSuccess(u) {
            (n.set({
              data: u.data,
              error: null,
              isPending: !1,
              isRefetching: !1,
              refetch: n.value.refetch,
            }),
              await c?.onSuccess?.(u));
          },
          async onError(u) {
            const { request: o } = u,
              h = typeof o.retry == "number" ? o.retry : o.retry?.attempts,
              d = o.retryAttempt || 0;
            (h && d < h) ||
              (n.set({
                error: u.error,
                data: null,
                isPending: !1,
                isRefetching: !1,
                refetch: n.value.refetch,
              }),
              await c?.onError?.(u));
          },
          async onRequest(u) {
            const o = n.get();
            (n.set({
              isPending: o.data === null,
              data: o.data,
              error: null,
              isRefetching: !0,
              refetch: n.value.refetch,
            }),
              await c?.onRequest?.(u));
          },
        }).catch((u) => {
          n.set({
            error: u,
            data: null,
            isPending: !1,
            isRefetching: !1,
            refetch: n.value.refetch,
          });
        });
      };
    e = Array.isArray(e) ? e : [e];
    let i = !1;
    for (const l of e)
      l.subscribe(() => {
        $t ||
          (i
            ? a()
            : Ft(n, () => {
                const c = setTimeout(() => {
                  i || (a(), (i = !0));
                }, 0);
                return () => {
                  (n.off(), l.off(), clearTimeout(c));
                };
              }));
      });
    return n;
  },
  Qt = {
    proto:
      /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    constructor:
      /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    protoShort: /"__proto__"\s*:/,
    constructorShort: /"constructor"\s*:/,
  },
  Vt = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/,
  Oe = {
    true: !0,
    false: !1,
    null: null,
    undefined: void 0,
    nan: Number.NaN,
    infinity: Number.POSITIVE_INFINITY,
    "-infinity": Number.NEGATIVE_INFINITY,
  },
  Ht =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function Wt(e) {
  return e instanceof Date && !isNaN(e.getTime());
}
function Gt(e) {
  const t = Ht.exec(e);
  if (!t) return null;
  const [, r, s, n, a, i, l, c, u, o, h] = t;
  let d = new Date(
    Date.UTC(
      parseInt(r, 10),
      parseInt(s, 10) - 1,
      parseInt(n, 10),
      parseInt(a, 10),
      parseInt(i, 10),
      parseInt(l, 10),
      c ? parseInt(c.padEnd(3, "0"), 10) : 0,
    ),
  );
  if (u) {
    const w = (parseInt(o, 10) * 60 + parseInt(h, 10)) * (u === "+" ? -1 : 1);
    d.setUTCMinutes(d.getUTCMinutes() + w);
  }
  return Wt(d) ? d : null;
}
function Jt(e, t = {}) {
  const {
    strict: r = !1,
    warnings: s = !1,
    reviver: n,
    parseDates: a = !0,
  } = t;
  if (typeof e != "string") return e;
  const i = e.trim();
  if (
    i.length > 0 &&
    i[0] === '"' &&
    i.endsWith('"') &&
    !i.slice(1, -1).includes('"')
  )
    return i.slice(1, -1);
  const l = i.toLowerCase();
  if (l.length <= 9 && l in Oe) return Oe[l];
  if (!Vt.test(i)) {
    if (r) throw new SyntaxError("[better-json] Invalid JSON");
    return e;
  }
  if (
    Object.entries(Qt).some(([u, o]) => {
      const h = o.test(i);
      return (
        h &&
          s &&
          console.warn(
            `[better-json] Detected potential prototype pollution attempt using ${u} pattern`,
          ),
        h
      );
    }) &&
    r
  )
    throw new Error(
      "[better-json] Potential prototype pollution attempt detected",
    );
  try {
    return JSON.parse(i, (o, h) => {
      if (
        o === "__proto__" ||
        (o === "constructor" && h && typeof h == "object" && "prototype" in h)
      ) {
        s &&
          console.warn(
            `[better-json] Dropping "${o}" key to prevent prototype pollution`,
          );
        return;
      }
      if (a && typeof h == "string") {
        const d = Gt(h);
        if (d) return d;
      }
      return n ? n(o, h) : h;
    });
  } catch (u) {
    if (r) throw u;
    return e;
  }
}
function Yt(e, t = { strict: !0 }) {
  return Jt(e, t);
}
const zt = {
  id: "redirect",
  name: "Redirect",
  hooks: {
    onSuccess(e) {
      if (
        e.data?.url &&
        e.data?.redirect &&
        typeof window < "u" &&
        window.location &&
        window.location
      )
        try {
          window.location.href = e.data.url;
        } catch {}
    },
  },
};
function Xt(e) {
  const t = Pe(!1);
  return {
    session: qt(t, "/get-session", e, { method: "GET" }),
    $sessionSignal: t,
  };
}
const Zt = (e, t) => {
  const r = "credentials" in Request.prototype,
    s = Mt(e?.baseURL, e?.basePath) ?? "/api/auth",
    n = [],
    a = {
      id: "lifecycle-hooks",
      name: "lifecycle-hooks",
      hooks: {
        onSuccess: e?.fetchOptions?.onSuccess,
        onError: e?.fetchOptions?.onError,
        onRequest: e?.fetchOptions?.onRequest,
        onResponse: e?.fetchOptions?.onResponse,
      },
    },
    { onSuccess: i, onError: l, onRequest: c, onResponse: u, ...o } = {},
    h = St({
      baseURL: s,
      ...(r ? { credentials: "include" } : {}),
      method: "GET",
      jsonParser(f) {
        return f ? Yt(f, { strict: !1 }) : null;
      },
      customFetchImpl: fetch,
      ...o,
      plugins: [a, ...(o.plugins || []), zt, ...n],
    }),
    { $sessionSignal: d, session: w } = Xt(h),
    x = [];
  let b = {},
    g = { $sessionSignal: d, session: w },
    U = {
      "/sign-out": "POST",
      "/revoke-sessions": "POST",
      "/revoke-other-sessions": "POST",
      "/delete-user": "POST",
    };
  const P = [
    {
      signal: "$sessionSignal",
      matcher(f) {
        return (
          f === "/sign-out" ||
          f === "/update-user" ||
          f.startsWith("/sign-in") ||
          f.startsWith("/sign-up") ||
          f === "/delete-user" ||
          f === "/verify-email"
        );
      },
    },
  ];
  for (const f of x)
    (f.getAtoms && Object.assign(g, f.getAtoms?.(h)),
      f.pathMethods && Object.assign(U, f.pathMethods),
      f.atomListeners && P.push(...f.atomListeners));
  const S = {
    notify: (f) => {
      g[f].set(!g[f].get());
    },
    listen: (f, M) => {
      g[f].subscribe(M);
    },
    atoms: g,
  };
  for (const f of x) f.getActions && Object.assign(b, f.getActions?.(h, S, e));
  return {
    get baseURL() {
      return s;
    },
    pluginsActions: b,
    pluginsAtoms: g,
    pluginPathMethods: U,
    atomListeners: P,
    $fetch: h,
    $store: S,
  };
};
function Kt(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "get" in e &&
    typeof e.get == "function" &&
    "lc" in e &&
    typeof e.lc == "number"
  );
}
function er(e, t, r) {
  const s = t[e],
    { fetchOptions: n, query: a, ...i } = r || {};
  return (
    s ||
    (n?.method ? n.method : i && Object.keys(i).length > 0 ? "POST" : "GET")
  );
}
function tr(e, t, r, s, n) {
  function a(i = []) {
    return new Proxy(function () {}, {
      get(l, c) {
        if (
          typeof c != "string" ||
          c === "then" ||
          c === "catch" ||
          c === "finally"
        )
          return;
        const u = [...i, c];
        let o = e;
        for (const h of u)
          if (o && typeof o == "object" && h in o) o = o[h];
          else {
            o = void 0;
            break;
          }
        return typeof o == "function" || Kt(o) ? o : a(u);
      },
      apply: async (l, c, u) => {
        const o =
            "/" +
            i
              .map((P) => P.replace(/[A-Z]/g, (S) => `-${S.toLowerCase()}`))
              .join("/"),
          h = u[0] || {},
          d = u[1] || {},
          { query: w, fetchOptions: x, ...b } = h,
          g = { ...d, ...x },
          U = er(o, r, h);
        return await t(o, {
          ...g,
          body: U === "GET" ? void 0 : { ...b, ...(g?.body || {}) },
          query: w || g?.query,
          method: U,
          async onSuccess(P) {
            if ((await g?.onSuccess?.(P), !n)) return;
            const S = n.filter((f) => f.matcher(o));
            if (S.length)
              for (const f of S) {
                const M = s[f.signal];
                if (!M) return;
                const p = M.get();
                setTimeout(() => {
                  M.set(!p);
                }, 10);
              }
          },
        });
      },
    });
  }
  return a();
}
function rr(e, t = {}) {
  let r = T.useRef(e.get());
  const { keys: s, deps: n = [e, s] } = t;
  let a = T.useCallback((l) => {
      const c = (u) => {
        r.current !== u && ((r.current = u), l());
      };
      return (c(e.value), s?.length ? kt(e, s, c) : e.listen(c));
    }, n),
    i = () => r.current;
  return T.useSyncExternalStore(a, i, i);
}
function sr(e) {
  return `use${nr(e)}`;
}
function nr(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ir(e) {
  const {
    pluginPathMethods: t,
    pluginsActions: r,
    pluginsAtoms: s,
    $fetch: n,
    $store: a,
    atomListeners: i,
  } = Zt(e);
  let l = {};
  for (const [o, h] of Object.entries(s)) l[sr(o)] = () => rr(h);
  const c = { ...r, ...l, $fetch: n, $store: a };
  return tr(c, n, t, s, i);
}
const _e = ir();
function or() {
  const { data: e } = _e.useSession(),
    t = De();
  return e
    ? v.jsxs("div", {
        className: "flex flex-col items-center justify-center gap-4",
        children: [
          v.jsx("p", {
            className: "text-center text-2xl",
            children: v.jsxs("span", {
              children: ["Logged in as ", e.user.name],
            }),
          }),
          v.jsx(Be, {
            size: "lg",
            onClick: async () => {
              (await _e.signOut(), await t({ href: "/", replace: !0 }));
            },
            children: "Sign out",
          }),
        ],
      })
    : v.jsx("p", {
        className: "text-muted-foreground text-sm",
        children: "Sign in from the Next.js app at /es/sign-in",
      });
}
function lr() {
  return v.jsx("main", {
    className: "container py-16",
    children: v.jsxs("div", {
      className: "flex flex-col items-center justify-center gap-4",
      children: [
        v.jsx("h1", {
          className: "text-5xl font-extrabold tracking-tight",
          children: "RoomMe",
        }),
        v.jsx("p", {
          className: "text-muted-foreground",
          children: "Use the Next.js app for the full experience.",
        }),
        v.jsx(or, {}),
        v.jsx(T.Suspense, { children: v.jsx(ar, {}) }),
      ],
    }),
  });
}
function ar() {
  const e = Fe(),
    { data: t } = tt(e.listing.list.queryOptions({ limit: 12 }));
  return v.jsx("ul", {
    className: "w-full max-w-xl space-y-2",
    children: t.map((r) =>
      v.jsxs(
        "li",
        {
          className: "rounded-lg border p-4",
          children: [
            v.jsx("p", { className: "font-semibold", children: r.title }),
            v.jsx("p", {
              className: "text-muted-foreground text-sm",
              children: r.complex.neighborhood,
            }),
          ],
        },
        r.id,
      ),
    ),
  });
}
export { lr as component };
