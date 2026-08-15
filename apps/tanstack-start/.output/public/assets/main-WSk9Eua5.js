function lE(e, t) {
  for (var o = 0; o < t.length; o++) {
    const a = t[o];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const s in a)
        if (s !== "default" && !(s in e)) {
          const u = Object.getOwnPropertyDescriptor(a, s);
          u &&
            Object.defineProperty(
              e,
              s,
              u.get ? u : { enumerable: !0, get: () => a[s] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
function Ab(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ed = { exports: {} },
  is = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gg;
function uE() {
  if (gg) return is;
  gg = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.fragment");
  function o(a, s, u) {
    var c = null;
    if (
      (u !== void 0 && (c = "" + u),
      s.key !== void 0 && (c = "" + s.key),
      "key" in s)
    ) {
      u = {};
      for (var f in s) f !== "key" && (u[f] = s[f]);
    } else u = s;
    return (
      (s = u.ref),
      { $$typeof: e, type: a, key: c, ref: s !== void 0 ? s : null, props: u }
    );
  }
  return ((is.Fragment = t), (is.jsx = o), (is.jsxs = o), is);
}
var bg;
function cE() {
  return (bg || ((bg = 1), (Ed.exports = uE())), Ed.exports);
}
var D = cE(),
  Rd = { exports: {} },
  xe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sg;
function fE() {
  if (Sg) return xe;
  Sg = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    u = Symbol.for("react.consumer"),
    c = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function g(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (y && C[y]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    _ = {};
  function T(C, G, ne) {
    ((this.props = C),
      (this.context = G),
      (this.refs = _),
      (this.updater = ne || S));
  }
  ((T.prototype.isReactComponent = {}),
    (T.prototype.setState = function (C, G) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, C, G, "setState");
    }),
    (T.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    }));
  function A() {}
  A.prototype = T.prototype;
  function N(C, G, ne) {
    ((this.props = C),
      (this.context = G),
      (this.refs = _),
      (this.updater = ne || S));
  }
  var P = (N.prototype = new A());
  ((P.constructor = N), w(P, T.prototype), (P.isPureReactComponent = !0));
  var k = Array.isArray,
    H = { H: null, A: null, T: null, S: null, V: null },
    F = Object.prototype.hasOwnProperty;
  function Z(C, G, ne, $, J, ie) {
    return (
      (ne = ie.ref),
      {
        $$typeof: e,
        type: C,
        key: G,
        ref: ne !== void 0 ? ne : null,
        props: ie,
      }
    );
  }
  function B(C, G) {
    return Z(C.type, G, void 0, void 0, void 0, C.props);
  }
  function re(C) {
    return typeof C == "object" && C !== null && C.$$typeof === e;
  }
  function ae(C) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (ne) {
        return G[ne];
      })
    );
  }
  var he = /\/+/g;
  function se(C, G) {
    return typeof C == "object" && C !== null && C.key != null
      ? ae("" + C.key)
      : G.toString(36);
  }
  function ve() {}
  function me(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (
          (typeof C.status == "string"
            ? C.then(ve, ve)
            : ((C.status = "pending"),
              C.then(
                function (G) {
                  C.status === "pending" &&
                    ((C.status = "fulfilled"), (C.value = G));
                },
                function (G) {
                  C.status === "pending" &&
                    ((C.status = "rejected"), (C.reason = G));
                },
              )),
          C.status)
        ) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function ye(C, G, ne, $, J) {
    var ie = typeof C;
    (ie === "undefined" || ie === "boolean") && (C = null);
    var oe = !1;
    if (C === null) oe = !0;
    else
      switch (ie) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case e:
            case t:
              oe = !0;
              break;
            case v:
              return ((oe = C._init), ye(oe(C._payload), G, ne, $, J));
          }
      }
    if (oe)
      return (
        (J = J(C)),
        (oe = $ === "" ? "." + se(C, 0) : $),
        k(J)
          ? ((ne = ""),
            oe != null && (ne = oe.replace(he, "$&/") + "/"),
            ye(J, G, ne, "", function (ke) {
              return ke;
            }))
          : J != null &&
            (re(J) &&
              (J = B(
                J,
                ne +
                  (J.key == null || (C && C.key === J.key)
                    ? ""
                    : ("" + J.key).replace(he, "$&/") + "/") +
                  oe,
              )),
            G.push(J)),
        1
      );
    oe = 0;
    var le = $ === "" ? "." : $ + ":";
    if (k(C))
      for (var de = 0; de < C.length; de++)
        (($ = C[de]), (ie = le + se($, de)), (oe += ye($, G, ne, ie, J)));
    else if (((de = g(C)), typeof de == "function"))
      for (C = de.call(C), de = 0; !($ = C.next()).done; )
        (($ = $.value), (ie = le + se($, de++)), (oe += ye($, G, ne, ie, J)));
    else if (ie === "object") {
      if (typeof C.then == "function") return ye(me(C), G, ne, $, J);
      throw (
        (G = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return oe;
  }
  function z(C, G, ne) {
    if (C == null) return C;
    var $ = [],
      J = 0;
    return (
      ye(C, $, "", "", function (ie) {
        return G.call(ne, ie, J++);
      }),
      $
    );
  }
  function K(C) {
    if (C._status === -1) {
      var G = C._result;
      ((G = G()),
        G.then(
          function (ne) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = ne));
          },
          function (ne) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = ne));
          },
        ),
        C._status === -1 && ((C._status = 0), (C._result = G)));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var q =
    typeof reportError == "function"
      ? reportError
      : function (C) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var G = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof C == "object" &&
                C !== null &&
                typeof C.message == "string"
                  ? String(C.message)
                  : String(C),
              error: C,
            });
            if (!window.dispatchEvent(G)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", C);
            return;
          }
          console.error(C);
        };
  function W() {}
  return (
    (xe.Children = {
      map: z,
      forEach: function (C, G, ne) {
        z(
          C,
          function () {
            G.apply(this, arguments);
          },
          ne,
        );
      },
      count: function (C) {
        var G = 0;
        return (
          z(C, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (C) {
        return (
          z(C, function (G) {
            return G;
          }) || []
        );
      },
      only: function (C) {
        if (!re(C))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return C;
      },
    }),
    (xe.Component = T),
    (xe.Fragment = o),
    (xe.Profiler = s),
    (xe.PureComponent = N),
    (xe.StrictMode = a),
    (xe.Suspense = h),
    (xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (xe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return H.H.useMemoCache(C);
      },
    }),
    (xe.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (xe.cloneElement = function (C, G, ne) {
      if (C == null)
        throw Error(
          "The argument must be a React element, but you passed " + C + ".",
        );
      var $ = w({}, C.props),
        J = C.key,
        ie = void 0;
      if (G != null)
        for (oe in (G.ref !== void 0 && (ie = void 0),
        G.key !== void 0 && (J = "" + G.key),
        G))
          !F.call(G, oe) ||
            oe === "key" ||
            oe === "__self" ||
            oe === "__source" ||
            (oe === "ref" && G.ref === void 0) ||
            ($[oe] = G[oe]);
      var oe = arguments.length - 2;
      if (oe === 1) $.children = ne;
      else if (1 < oe) {
        for (var le = Array(oe), de = 0; de < oe; de++)
          le[de] = arguments[de + 2];
        $.children = le;
      }
      return Z(C.type, J, void 0, void 0, ie, $);
    }),
    (xe.createContext = function (C) {
      return (
        (C = {
          $$typeof: c,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: u, _context: C }),
        C
      );
    }),
    (xe.createElement = function (C, G, ne) {
      var $,
        J = {},
        ie = null;
      if (G != null)
        for ($ in (G.key !== void 0 && (ie = "" + G.key), G))
          F.call(G, $) &&
            $ !== "key" &&
            $ !== "__self" &&
            $ !== "__source" &&
            (J[$] = G[$]);
      var oe = arguments.length - 2;
      if (oe === 1) J.children = ne;
      else if (1 < oe) {
        for (var le = Array(oe), de = 0; de < oe; de++)
          le[de] = arguments[de + 2];
        J.children = le;
      }
      if (C && C.defaultProps)
        for ($ in ((oe = C.defaultProps), oe))
          J[$] === void 0 && (J[$] = oe[$]);
      return Z(C, ie, void 0, void 0, null, J);
    }),
    (xe.createRef = function () {
      return { current: null };
    }),
    (xe.forwardRef = function (C) {
      return { $$typeof: f, render: C };
    }),
    (xe.isValidElement = re),
    (xe.lazy = function (C) {
      return { $$typeof: v, _payload: { _status: -1, _result: C }, _init: K };
    }),
    (xe.memo = function (C, G) {
      return { $$typeof: p, type: C, compare: G === void 0 ? null : G };
    }),
    (xe.startTransition = function (C) {
      var G = H.T,
        ne = {};
      H.T = ne;
      try {
        var $ = C(),
          J = H.S;
        (J !== null && J(ne, $),
          typeof $ == "object" &&
            $ !== null &&
            typeof $.then == "function" &&
            $.then(W, q));
      } catch (ie) {
        q(ie);
      } finally {
        H.T = G;
      }
    }),
    (xe.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (xe.use = function (C) {
      return H.H.use(C);
    }),
    (xe.useActionState = function (C, G, ne) {
      return H.H.useActionState(C, G, ne);
    }),
    (xe.useCallback = function (C, G) {
      return H.H.useCallback(C, G);
    }),
    (xe.useContext = function (C) {
      return H.H.useContext(C);
    }),
    (xe.useDebugValue = function () {}),
    (xe.useDeferredValue = function (C, G) {
      return H.H.useDeferredValue(C, G);
    }),
    (xe.useEffect = function (C, G, ne) {
      var $ = H.H;
      if (typeof ne == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return $.useEffect(C, G);
    }),
    (xe.useId = function () {
      return H.H.useId();
    }),
    (xe.useImperativeHandle = function (C, G, ne) {
      return H.H.useImperativeHandle(C, G, ne);
    }),
    (xe.useInsertionEffect = function (C, G) {
      return H.H.useInsertionEffect(C, G);
    }),
    (xe.useLayoutEffect = function (C, G) {
      return H.H.useLayoutEffect(C, G);
    }),
    (xe.useMemo = function (C, G) {
      return H.H.useMemo(C, G);
    }),
    (xe.useOptimistic = function (C, G) {
      return H.H.useOptimistic(C, G);
    }),
    (xe.useReducer = function (C, G, ne) {
      return H.H.useReducer(C, G, ne);
    }),
    (xe.useRef = function (C) {
      return H.H.useRef(C);
    }),
    (xe.useState = function (C) {
      return H.H.useState(C);
    }),
    (xe.useSyncExternalStore = function (C, G, ne) {
      return H.H.useSyncExternalStore(C, G, ne);
    }),
    (xe.useTransition = function () {
      return H.H.useTransition();
    }),
    (xe.version = "19.1.4"),
    xe
  );
}
var wg;
function js() {
  return (wg || ((wg = 1), (Rd.exports = fE())), Rd.exports);
}
var E = js();
const te = Ab(E),
  Mb = lE({ __proto__: null, default: te }, [E]);
var Td = { exports: {} },
  ss = {},
  Cd = { exports: {} },
  Od = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _g;
function dE() {
  return (
    _g ||
      ((_g = 1),
      (function (e) {
        function t(z, K) {
          var q = z.length;
          z.push(K);
          e: for (; 0 < q; ) {
            var W = (q - 1) >>> 1,
              C = z[W];
            if (0 < s(C, K)) ((z[W] = K), (z[q] = C), (q = W));
            else break e;
          }
        }
        function o(z) {
          return z.length === 0 ? null : z[0];
        }
        function a(z) {
          if (z.length === 0) return null;
          var K = z[0],
            q = z.pop();
          if (q !== K) {
            z[0] = q;
            e: for (var W = 0, C = z.length, G = C >>> 1; W < G; ) {
              var ne = 2 * (W + 1) - 1,
                $ = z[ne],
                J = ne + 1,
                ie = z[J];
              if (0 > s($, q))
                J < C && 0 > s(ie, $)
                  ? ((z[W] = ie), (z[J] = q), (W = J))
                  : ((z[W] = $), (z[ne] = q), (W = ne));
              else if (J < C && 0 > s(ie, q))
                ((z[W] = ie), (z[J] = q), (W = J));
              else break e;
            }
          }
          return K;
        }
        function s(z, K) {
          var q = z.sortIndex - K.sortIndex;
          return q !== 0 ? q : z.id - K.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var c = Date,
            f = c.now();
          e.unstable_now = function () {
            return c.now() - f;
          };
        }
        var h = [],
          p = [],
          v = 1,
          y = null,
          g = 3,
          S = !1,
          w = !1,
          _ = !1,
          T = !1,
          A = typeof setTimeout == "function" ? setTimeout : null,
          N = typeof clearTimeout == "function" ? clearTimeout : null,
          P = typeof setImmediate < "u" ? setImmediate : null;
        function k(z) {
          for (var K = o(p); K !== null; ) {
            if (K.callback === null) a(p);
            else if (K.startTime <= z)
              (a(p), (K.sortIndex = K.expirationTime), t(h, K));
            else break;
            K = o(p);
          }
        }
        function H(z) {
          if (((_ = !1), k(z), !w))
            if (o(h) !== null) ((w = !0), F || ((F = !0), se()));
            else {
              var K = o(p);
              K !== null && ye(H, K.startTime - z);
            }
        }
        var F = !1,
          Z = -1,
          B = 5,
          re = -1;
        function ae() {
          return T ? !0 : !(e.unstable_now() - re < B);
        }
        function he() {
          if (((T = !1), F)) {
            var z = e.unstable_now();
            re = z;
            var K = !0;
            try {
              e: {
                ((w = !1), _ && ((_ = !1), N(Z), (Z = -1)), (S = !0));
                var q = g;
                try {
                  t: {
                    for (
                      k(z), y = o(h);
                      y !== null && !(y.expirationTime > z && ae());

                    ) {
                      var W = y.callback;
                      if (typeof W == "function") {
                        ((y.callback = null), (g = y.priorityLevel));
                        var C = W(y.expirationTime <= z);
                        if (((z = e.unstable_now()), typeof C == "function")) {
                          ((y.callback = C), k(z), (K = !0));
                          break t;
                        }
                        (y === o(h) && a(h), k(z));
                      } else a(h);
                      y = o(h);
                    }
                    if (y !== null) K = !0;
                    else {
                      var G = o(p);
                      (G !== null && ye(H, G.startTime - z), (K = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (g = q), (S = !1));
                }
                K = void 0;
              }
            } finally {
              K ? se() : (F = !1);
            }
          }
        }
        var se;
        if (typeof P == "function")
          se = function () {
            P(he);
          };
        else if (typeof MessageChannel < "u") {
          var ve = new MessageChannel(),
            me = ve.port2;
          ((ve.port1.onmessage = he),
            (se = function () {
              me.postMessage(null);
            }));
        } else
          se = function () {
            A(he, 0);
          };
        function ye(z, K) {
          Z = A(function () {
            z(e.unstable_now());
          }, K);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (e.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (B = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return g;
          }),
          (e.unstable_next = function (z) {
            switch (g) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = g;
            }
            var q = g;
            g = K;
            try {
              return z();
            } finally {
              g = q;
            }
          }),
          (e.unstable_requestPaint = function () {
            T = !0;
          }),
          (e.unstable_runWithPriority = function (z, K) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var q = g;
            g = z;
            try {
              return K();
            } finally {
              g = q;
            }
          }),
          (e.unstable_scheduleCallback = function (z, K, q) {
            var W = e.unstable_now();
            switch (
              (typeof q == "object" && q !== null
                ? ((q = q.delay),
                  (q = typeof q == "number" && 0 < q ? W + q : W))
                : (q = W),
              z)
            ) {
              case 1:
                var C = -1;
                break;
              case 2:
                C = 250;
                break;
              case 5:
                C = 1073741823;
                break;
              case 4:
                C = 1e4;
                break;
              default:
                C = 5e3;
            }
            return (
              (C = q + C),
              (z = {
                id: v++,
                callback: K,
                priorityLevel: z,
                startTime: q,
                expirationTime: C,
                sortIndex: -1,
              }),
              q > W
                ? ((z.sortIndex = q),
                  t(p, z),
                  o(h) === null &&
                    z === o(p) &&
                    (_ ? (N(Z), (Z = -1)) : (_ = !0), ye(H, q - W)))
                : ((z.sortIndex = C),
                  t(h, z),
                  w || S || ((w = !0), F || ((F = !0), se()))),
              z
            );
          }),
          (e.unstable_shouldYield = ae),
          (e.unstable_wrapCallback = function (z) {
            var K = g;
            return function () {
              var q = g;
              g = K;
              try {
                return z.apply(this, arguments);
              } finally {
                g = q;
              }
            };
          }));
      })(Od)),
    Od
  );
}
var xg;
function hE() {
  return (xg || ((xg = 1), (Cd.exports = dE())), Cd.exports);
}
var Ad = { exports: {} },
  Pt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eg;
function pE() {
  if (Eg) return Pt;
  Eg = 1;
  var e = js();
  function t(h) {
    var p = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        p += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      h +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o() {}
  var a = {
      d: {
        f: o,
        r: function () {
          throw Error(t(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function u(h, p, v) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: h,
      containerInfo: p,
      implementation: v,
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(h, p) {
    if (h === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
    (Pt.createPortal = function (h, p) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(t(299));
      return u(h, p, null, v);
    }),
    (Pt.flushSync = function (h) {
      var p = c.T,
        v = a.p;
      try {
        if (((c.T = null), (a.p = 2), h)) return h();
      } finally {
        ((c.T = p), (a.p = v), a.d.f());
      }
    }),
    (Pt.preconnect = function (h, p) {
      typeof h == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        a.d.C(h, p));
    }),
    (Pt.prefetchDNS = function (h) {
      typeof h == "string" && a.d.D(h);
    }),
    (Pt.preinit = function (h, p) {
      if (typeof h == "string" && p && typeof p.as == "string") {
        var v = p.as,
          y = f(v, p.crossOrigin),
          g = typeof p.integrity == "string" ? p.integrity : void 0,
          S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        v === "style"
          ? a.d.S(h, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: g,
              fetchPriority: S,
            })
          : v === "script" &&
            a.d.X(h, {
              crossOrigin: y,
              integrity: g,
              fetchPriority: S,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (Pt.preinitModule = function (h, p) {
      if (typeof h == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var v = f(p.as, p.crossOrigin);
            a.d.M(h, {
              crossOrigin: v,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && a.d.M(h);
    }),
    (Pt.preload = function (h, p) {
      if (
        typeof h == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var v = p.as,
          y = f(v, p.crossOrigin);
        a.d.L(h, v, {
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (Pt.preloadModule = function (h, p) {
      if (typeof h == "string")
        if (p) {
          var v = f(p.as, p.crossOrigin);
          a.d.m(h, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else a.d.m(h);
    }),
    (Pt.requestFormReset = function (h) {
      a.d.r(h);
    }),
    (Pt.unstable_batchedUpdates = function (h, p) {
      return h(p);
    }),
    (Pt.useFormState = function (h, p, v) {
      return c.H.useFormState(h, p, v);
    }),
    (Pt.useFormStatus = function () {
      return c.H.useHostTransitionStatus();
    }),
    (Pt.version = "19.1.4"),
    Pt
  );
}
var Rg;
function Db() {
  if (Rg) return Ad.exports;
  Rg = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (Ad.exports = pE()), Ad.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tg;
function mE() {
  if (Tg) return ss;
  Tg = 1;
  var e = hE(),
    t = js(),
    o = Db();
  function a(n) {
    var r = "https://react.dev/errors/" + n;
    if (1 < arguments.length) {
      r += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        r += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return (
      "Minified React error #" +
      n +
      "; visit " +
      r +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(n) {
    return !(!n || (n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11));
  }
  function u(n) {
    var r = n,
      i = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do ((r = n), (r.flags & 4098) !== 0 && (i = r.return), (n = r.return));
      while (n);
    }
    return r.tag === 3 ? i : null;
  }
  function c(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (
        (r === null && ((n = n.alternate), n !== null && (r = n.memoizedState)),
        r !== null)
      )
        return r.dehydrated;
    }
    return null;
  }
  function f(n) {
    if (u(n) !== n) throw Error(a(188));
  }
  function h(n) {
    var r = n.alternate;
    if (!r) {
      if (((r = u(n)), r === null)) throw Error(a(188));
      return r !== n ? null : n;
    }
    for (var i = n, l = r; ; ) {
      var d = i.return;
      if (d === null) break;
      var m = d.alternate;
      if (m === null) {
        if (((l = d.return), l !== null)) {
          i = l;
          continue;
        }
        break;
      }
      if (d.child === m.child) {
        for (m = d.child; m; ) {
          if (m === i) return (f(d), n);
          if (m === l) return (f(d), r);
          m = m.sibling;
        }
        throw Error(a(188));
      }
      if (i.return !== l.return) ((i = d), (l = m));
      else {
        for (var b = !1, x = d.child; x; ) {
          if (x === i) {
            ((b = !0), (i = d), (l = m));
            break;
          }
          if (x === l) {
            ((b = !0), (l = d), (i = m));
            break;
          }
          x = x.sibling;
        }
        if (!b) {
          for (x = m.child; x; ) {
            if (x === i) {
              ((b = !0), (i = m), (l = d));
              break;
            }
            if (x === l) {
              ((b = !0), (l = m), (i = d));
              break;
            }
            x = x.sibling;
          }
          if (!b) throw Error(a(189));
        }
      }
      if (i.alternate !== l) throw Error(a(190));
    }
    if (i.tag !== 3) throw Error(a(188));
    return i.stateNode.current === i ? n : r;
  }
  function p(n) {
    var r = n.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return n;
    for (n = n.child; n !== null; ) {
      if (((r = p(n)), r !== null)) return r;
      n = n.sibling;
    }
    return null;
  }
  var v = Object.assign,
    y = Symbol.for("react.element"),
    g = Symbol.for("react.transitional.element"),
    S = Symbol.for("react.portal"),
    w = Symbol.for("react.fragment"),
    _ = Symbol.for("react.strict_mode"),
    T = Symbol.for("react.profiler"),
    A = Symbol.for("react.provider"),
    N = Symbol.for("react.consumer"),
    P = Symbol.for("react.context"),
    k = Symbol.for("react.forward_ref"),
    H = Symbol.for("react.suspense"),
    F = Symbol.for("react.suspense_list"),
    Z = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    re = Symbol.for("react.activity"),
    ae = Symbol.for("react.memo_cache_sentinel"),
    he = Symbol.iterator;
  function se(n) {
    return n === null || typeof n != "object"
      ? null
      : ((n = (he && n[he]) || n["@@iterator"]),
        typeof n == "function" ? n : null);
  }
  var ve = Symbol.for("react.client.reference");
  function me(n) {
    if (n == null) return null;
    if (typeof n == "function")
      return n.$$typeof === ve ? null : n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case w:
        return "Fragment";
      case T:
        return "Profiler";
      case _:
        return "StrictMode";
      case H:
        return "Suspense";
      case F:
        return "SuspenseList";
      case re:
        return "Activity";
    }
    if (typeof n == "object")
      switch (n.$$typeof) {
        case S:
          return "Portal";
        case P:
          return (n.displayName || "Context") + ".Provider";
        case N:
          return (n._context.displayName || "Context") + ".Consumer";
        case k:
          var r = n.render;
          return (
            (n = n.displayName),
            n ||
              ((n = r.displayName || r.name || ""),
              (n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef")),
            n
          );
        case Z:
          return (
            (r = n.displayName || null),
            r !== null ? r : me(n.type) || "Memo"
          );
        case B:
          ((r = n._payload), (n = n._init));
          try {
            return me(n(r));
          } catch {}
      }
    return null;
  }
  var ye = Array.isArray,
    z = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    q = { pending: !1, data: null, method: null, action: null },
    W = [],
    C = -1;
  function G(n) {
    return { current: n };
  }
  function ne(n) {
    0 > C || ((n.current = W[C]), (W[C] = null), C--);
  }
  function $(n, r) {
    (C++, (W[C] = n.current), (n.current = r));
  }
  var J = G(null),
    ie = G(null),
    oe = G(null),
    le = G(null);
  function de(n, r) {
    switch (($(oe, r), $(ie, n), $(J, null), r.nodeType)) {
      case 9:
      case 11:
        n = (n = r.documentElement) && (n = n.namespaceURI) ? Gv(n) : 0;
        break;
      default:
        if (((n = r.tagName), (r = r.namespaceURI)))
          ((r = Gv(r)), (n = Fv(r, n)));
        else
          switch (n) {
            case "svg":
              n = 1;
              break;
            case "math":
              n = 2;
              break;
            default:
              n = 0;
          }
    }
    (ne(J), $(J, n));
  }
  function ke() {
    (ne(J), ne(ie), ne(oe));
  }
  function dt(n) {
    n.memoizedState !== null && $(le, n);
    var r = J.current,
      i = Fv(r, n.type);
    r !== i && ($(ie, n), $(J, i));
  }
  function ht(n) {
    (ie.current === n && (ne(J), ne(ie)),
      le.current === n && (ne(le), (ts._currentValue = q)));
  }
  var Ge = Object.prototype.hasOwnProperty,
    ln = e.unstable_scheduleCallback,
    Xn = e.unstable_cancelCallback,
    Zo = e.unstable_shouldYield,
    $o = e.unstable_requestPaint,
    gt = e.unstable_now,
    Go = e.unstable_getCurrentPriorityLevel,
    Rt = e.unstable_ImmediatePriority,
    Wn = e.unstable_UserBlockingPriority,
    Jn = e.unstable_NormalPriority,
    bt = e.unstable_LowPriority,
    Me = e.unstable_IdlePriority,
    tt = e.log,
    Nt = e.unstable_setDisableYieldValue,
    Qt = null,
    kt = null;
  function xn(n) {
    if (
      (typeof tt == "function" && Nt(n),
      kt && typeof kt.setStrictMode == "function")
    )
      try {
        kt.setStrictMode(Qt, n);
      } catch {}
  }
  var Tt = Math.clz32 ? Math.clz32 : Er,
    xr = Math.log,
    $s = Math.LN2;
  function Er(n) {
    return ((n >>>= 0), n === 0 ? 32 : (31 - ((xr(n) / $s) | 0)) | 0);
  }
  var Fo = 256,
    Yo = 4194304;
  function Pn(n) {
    var r = n & 42;
    if (r !== 0) return r;
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return n & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return n;
    }
  }
  function uo(n, r, i) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var d = 0,
      m = n.suspendedLanes,
      b = n.pingedLanes;
    n = n.warmLanes;
    var x = l & 134217727;
    return (
      x !== 0
        ? ((l = x & ~m),
          l !== 0
            ? (d = Pn(l))
            : ((b &= x),
              b !== 0
                ? (d = Pn(b))
                : i || ((i = x & ~n), i !== 0 && (d = Pn(i)))))
        : ((x = l & ~m),
          x !== 0
            ? (d = Pn(x))
            : b !== 0
              ? (d = Pn(b))
              : i || ((i = l & ~n), i !== 0 && (d = Pn(i)))),
      d === 0
        ? 0
        : r !== 0 &&
            r !== d &&
            (r & m) === 0 &&
            ((m = d & -d),
            (i = r & -r),
            m >= i || (m === 32 && (i & 4194048) !== 0))
          ? r
          : d
    );
  }
  function co(n, r) {
    return (n.pendingLanes & ~(n.suspendedLanes & ~n.pingedLanes) & r) === 0;
  }
  function ci(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return r + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function En() {
    var n = Fo;
    return ((Fo <<= 1), (Fo & 4194048) === 0 && (Fo = 256), n);
  }
  function Gs() {
    var n = Yo;
    return ((Yo <<= 1), (Yo & 62914560) === 0 && (Yo = 4194304), n);
  }
  function fi(n) {
    for (var r = [], i = 0; 31 > i; i++) r.push(n);
    return r;
  }
  function Rr(n, r) {
    ((n.pendingLanes |= r),
      r !== 268435456 &&
        ((n.suspendedLanes = 0), (n.pingedLanes = 0), (n.warmLanes = 0)));
  }
  function Fs(n, r, i, l, d, m) {
    var b = n.pendingLanes;
    ((n.pendingLanes = i),
      (n.suspendedLanes = 0),
      (n.pingedLanes = 0),
      (n.warmLanes = 0),
      (n.expiredLanes &= i),
      (n.entangledLanes &= i),
      (n.errorRecoveryDisabledLanes &= i),
      (n.shellSuspendCounter = 0));
    var x = n.entanglements,
      O = n.expirationTimes,
      U = n.hiddenUpdates;
    for (i = b & ~i; 0 < i; ) {
      var Y = 31 - Tt(i),
        X = 1 << Y;
      ((x[Y] = 0), (O[Y] = -1));
      var I = U[Y];
      if (I !== null)
        for (U[Y] = null, Y = 0; Y < I.length; Y++) {
          var V = I[Y];
          V !== null && (V.lane &= -536870913);
        }
      i &= ~X;
    }
    (l !== 0 && we(n, l, 0),
      m !== 0 && d === 0 && n.tag !== 0 && (n.suspendedLanes |= m & ~(b & ~r)));
  }
  function we(n, r, i) {
    ((n.pendingLanes |= r), (n.suspendedLanes &= ~r));
    var l = 31 - Tt(r);
    ((n.entangledLanes |= r),
      (n.entanglements[l] = n.entanglements[l] | 1073741824 | (i & 4194090)));
  }
  function nt(n, r) {
    var i = (n.entangledLanes |= r);
    for (n = n.entanglements; i; ) {
      var l = 31 - Tt(i),
        d = 1 << l;
      ((d & r) | (n[l] & r) && (n[l] |= r), (i &= ~d));
    }
  }
  function ut(n) {
    switch (n) {
      case 2:
        n = 1;
        break;
      case 8:
        n = 4;
        break;
      case 32:
        n = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        n = 128;
        break;
      case 268435456:
        n = 134217728;
        break;
      default:
        n = 0;
    }
    return n;
  }
  function Ct(n) {
    return (
      (n &= -n),
      2 < n ? (8 < n ? ((n & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function fo() {
    var n = K.p;
    return n !== 0 ? n : ((n = window.event), n === void 0 ? 32 : dg(n.type));
  }
  function pt(n, r) {
    var i = K.p;
    try {
      return ((K.p = n), r());
    } finally {
      K.p = i;
    }
  }
  var rt = Math.random().toString(36).slice(2),
    ot = "__reactFiber$" + rt,
    Ve = "__reactProps$" + rt,
    St = "__reactContainer$" + rt,
    Ko = "__reactEvents$" + rt,
    er = "__reactListeners$" + rt,
    Pp = "__reactHandles$" + rt,
    jp = "__reactResources$" + rt,
    di = "__reactMarker$" + rt;
  function yc(n) {
    (delete n[ot], delete n[Ve], delete n[Ko], delete n[er], delete n[Pp]);
  }
  function Qo(n) {
    var r = n[ot];
    if (r) return r;
    for (var i = n.parentNode; i; ) {
      if ((r = i[St] || i[ot])) {
        if (
          ((i = r.alternate),
          r.child !== null || (i !== null && i.child !== null))
        )
          for (n = Xv(n); n !== null; ) {
            if ((i = n[ot])) return i;
            n = Xv(n);
          }
        return r;
      }
      ((n = i), (i = n.parentNode));
    }
    return null;
  }
  function Xo(n) {
    if ((n = n[ot] || n[St])) {
      var r = n.tag;
      if (r === 5 || r === 6 || r === 13 || r === 26 || r === 27 || r === 3)
        return n;
    }
    return null;
  }
  function hi(n) {
    var r = n.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return n.stateNode;
    throw Error(a(33));
  }
  function Wo(n) {
    var r = n[jp];
    return (
      r ||
        (r = n[jp] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      r
    );
  }
  function wt(n) {
    n[di] = !0;
  }
  var Np = new Set(),
    kp = {};
  function ho(n, r) {
    (Jo(n, r), Jo(n + "Capture", r));
  }
  function Jo(n, r) {
    for (kp[n] = r, n = 0; n < r.length; n++) Np.add(r[n]);
  }
  var e_ = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Lp = {},
    Up = {};
  function t_(n) {
    return Ge.call(Up, n)
      ? !0
      : Ge.call(Lp, n)
        ? !1
        : e_.test(n)
          ? (Up[n] = !0)
          : ((Lp[n] = !0), !1);
  }
  function Ys(n, r, i) {
    if (t_(r))
      if (i === null) n.removeAttribute(r);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            n.removeAttribute(r);
            return;
          case "boolean":
            var l = r.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              n.removeAttribute(r);
              return;
            }
        }
        n.setAttribute(r, "" + i);
      }
  }
  function Ks(n, r, i) {
    if (i === null) n.removeAttribute(r);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          n.removeAttribute(r);
          return;
      }
      n.setAttribute(r, "" + i);
    }
  }
  function tr(n, r, i, l) {
    if (l === null) n.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          n.removeAttribute(i);
          return;
      }
      n.setAttributeNS(r, i, "" + l);
    }
  }
  var vc, Bp;
  function ea(n) {
    if (vc === void 0)
      try {
        throw Error();
      } catch (i) {
        var r = i.stack.trim().match(/\n( *(at )?)/);
        ((vc = (r && r[1]) || ""),
          (Bp =
            -1 <
            i.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < i.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      vc +
      n +
      Bp
    );
  }
  var gc = !1;
  function bc(n, r) {
    if (!n || gc) return "";
    gc = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (r) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (V) {
                  var I = V;
                }
                Reflect.construct(n, [], X);
              } else {
                try {
                  X.call();
                } catch (V) {
                  I = V;
                }
                n.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                I = V;
              }
              (X = n()) &&
                typeof X.catch == "function" &&
                X.catch(function () {});
            }
          } catch (V) {
            if (V && I && typeof V.stack == "string") return [V.stack, I.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      d &&
        d.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var m = l.DetermineComponentFrameRoot(),
        b = m[0],
        x = m[1];
      if (b && x) {
        var O = b.split(`
`),
          U = x.split(`
`);
        for (
          d = l = 0;
          l < O.length && !O[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; d < U.length && !U[d].includes("DetermineComponentFrameRoot"); )
          d++;
        if (l === O.length || d === U.length)
          for (
            l = O.length - 1, d = U.length - 1;
            1 <= l && 0 <= d && O[l] !== U[d];

          )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (O[l] !== U[d]) {
            if (l !== 1 || d !== 1)
              do
                if ((l--, d--, 0 > d || O[l] !== U[d])) {
                  var Y =
                    `
` + O[l].replace(" at new ", " at ");
                  return (
                    n.displayName &&
                      Y.includes("<anonymous>") &&
                      (Y = Y.replace("<anonymous>", n.displayName)),
                    Y
                  );
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      ((gc = !1), (Error.prepareStackTrace = i));
    }
    return (i = n ? n.displayName || n.name : "") ? ea(i) : "";
  }
  function n_(n) {
    switch (n.tag) {
      case 26:
      case 27:
      case 5:
        return ea(n.type);
      case 16:
        return ea("Lazy");
      case 13:
        return ea("Suspense");
      case 19:
        return ea("SuspenseList");
      case 0:
      case 15:
        return bc(n.type, !1);
      case 11:
        return bc(n.type.render, !1);
      case 1:
        return bc(n.type, !0);
      case 31:
        return ea("Activity");
      default:
        return "";
    }
  }
  function Ip(n) {
    try {
      var r = "";
      do ((r += n_(n)), (n = n.return));
      while (n);
      return r;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  function un(n) {
    switch (typeof n) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function Hp(n) {
    var r = n.type;
    return (
      (n = n.nodeName) &&
      n.toLowerCase() === "input" &&
      (r === "checkbox" || r === "radio")
    );
  }
  function r_(n) {
    var r = Hp(n) ? "checked" : "value",
      i = Object.getOwnPropertyDescriptor(n.constructor.prototype, r),
      l = "" + n[r];
    if (
      !n.hasOwnProperty(r) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var d = i.get,
        m = i.set;
      return (
        Object.defineProperty(n, r, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (b) {
            ((l = "" + b), m.call(this, b));
          },
        }),
        Object.defineProperty(n, r, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (b) {
            l = "" + b;
          },
          stopTracking: function () {
            ((n._valueTracker = null), delete n[r]);
          },
        }
      );
    }
  }
  function Qs(n) {
    n._valueTracker || (n._valueTracker = r_(n));
  }
  function qp(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var i = r.getValue(),
      l = "";
    return (
      n && (l = Hp(n) ? (n.checked ? "true" : "false") : n.value),
      (n = l),
      n !== i ? (r.setValue(n), !0) : !1
    );
  }
  function Xs(n) {
    if (
      ((n = n || (typeof document < "u" ? document : void 0)), typeof n > "u")
    )
      return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  var o_ = /[\n"\\]/g;
  function cn(n) {
    return n.replace(o_, function (r) {
      return "\\" + r.charCodeAt(0).toString(16) + " ";
    });
  }
  function Sc(n, r, i, l, d, m, b, x) {
    ((n.name = ""),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (n.type = b)
        : n.removeAttribute("type"),
      r != null
        ? b === "number"
          ? ((r === 0 && n.value === "") || n.value != r) &&
            (n.value = "" + un(r))
          : n.value !== "" + un(r) && (n.value = "" + un(r))
        : (b !== "submit" && b !== "reset") || n.removeAttribute("value"),
      r != null
        ? wc(n, b, un(r))
        : i != null
          ? wc(n, b, un(i))
          : l != null && n.removeAttribute("value"),
      d == null && m != null && (n.defaultChecked = !!m),
      d != null &&
        (n.checked = d && typeof d != "function" && typeof d != "symbol"),
      x != null &&
      typeof x != "function" &&
      typeof x != "symbol" &&
      typeof x != "boolean"
        ? (n.name = "" + un(x))
        : n.removeAttribute("name"));
  }
  function Vp(n, r, i, l, d, m, b, x) {
    if (
      (m != null &&
        typeof m != "function" &&
        typeof m != "symbol" &&
        typeof m != "boolean" &&
        (n.type = m),
      r != null || i != null)
    ) {
      if (!((m !== "submit" && m !== "reset") || r != null)) return;
      ((i = i != null ? "" + un(i) : ""),
        (r = r != null ? "" + un(r) : i),
        x || r === n.value || (n.value = r),
        (n.defaultValue = r));
    }
    ((l = l ?? d),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (n.checked = x ? n.checked : !!l),
      (n.defaultChecked = !!l),
      b != null &&
        typeof b != "function" &&
        typeof b != "symbol" &&
        typeof b != "boolean" &&
        (n.name = b));
  }
  function wc(n, r, i) {
    (r === "number" && Xs(n.ownerDocument) === n) ||
      n.defaultValue === "" + i ||
      (n.defaultValue = "" + i);
  }
  function ta(n, r, i, l) {
    if (((n = n.options), r)) {
      r = {};
      for (var d = 0; d < i.length; d++) r["$" + i[d]] = !0;
      for (i = 0; i < n.length; i++)
        ((d = r.hasOwnProperty("$" + n[i].value)),
          n[i].selected !== d && (n[i].selected = d),
          d && l && (n[i].defaultSelected = !0));
    } else {
      for (i = "" + un(i), r = null, d = 0; d < n.length; d++) {
        if (n[d].value === i) {
          ((n[d].selected = !0), l && (n[d].defaultSelected = !0));
          return;
        }
        r !== null || n[d].disabled || (r = n[d]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Zp(n, r, i) {
    if (
      r != null &&
      ((r = "" + un(r)), r !== n.value && (n.value = r), i == null)
    ) {
      n.defaultValue !== r && (n.defaultValue = r);
      return;
    }
    n.defaultValue = i != null ? "" + un(i) : "";
  }
  function $p(n, r, i, l) {
    if (r == null) {
      if (l != null) {
        if (i != null) throw Error(a(92));
        if (ye(l)) {
          if (1 < l.length) throw Error(a(93));
          l = l[0];
        }
        i = l;
      }
      (i == null && (i = ""), (r = i));
    }
    ((i = un(r)),
      (n.defaultValue = i),
      (l = n.textContent),
      l === i && l !== "" && l !== null && (n.value = l));
  }
  function na(n, r) {
    if (r) {
      var i = n.firstChild;
      if (i && i === n.lastChild && i.nodeType === 3) {
        i.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var a_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Gp(n, r, i) {
    var l = r.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === ""
      ? l
        ? n.setProperty(r, "")
        : r === "float"
          ? (n.cssFloat = "")
          : (n[r] = "")
      : l
        ? n.setProperty(r, i)
        : typeof i != "number" || i === 0 || a_.has(r)
          ? r === "float"
            ? (n.cssFloat = i)
            : (n[r] = ("" + i).trim())
          : (n[r] = i + "px");
  }
  function Fp(n, r, i) {
    if (r != null && typeof r != "object") throw Error(a(62));
    if (((n = n.style), i != null)) {
      for (var l in i)
        !i.hasOwnProperty(l) ||
          (r != null && r.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? n.setProperty(l, "")
            : l === "float"
              ? (n.cssFloat = "")
              : (n[l] = ""));
      for (var d in r)
        ((l = r[d]), r.hasOwnProperty(d) && i[d] !== l && Gp(n, d, l));
    } else for (var m in r) r.hasOwnProperty(m) && Gp(n, m, r[m]);
  }
  function _c(n) {
    if (n.indexOf("-") === -1) return !1;
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var i_ = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    s_ =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ws(n) {
    return s_.test("" + n)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : n;
  }
  var xc = null;
  function Ec(n) {
    return (
      (n = n.target || n.srcElement || window),
      n.correspondingUseElement && (n = n.correspondingUseElement),
      n.nodeType === 3 ? n.parentNode : n
    );
  }
  var ra = null,
    oa = null;
  function Yp(n) {
    var r = Xo(n);
    if (r && (n = r.stateNode)) {
      var i = n[Ve] || null;
      e: switch (((n = r.stateNode), r.type)) {
        case "input":
          if (
            (Sc(
              n,
              i.value,
              i.defaultValue,
              i.defaultValue,
              i.checked,
              i.defaultChecked,
              i.type,
              i.name,
            ),
            (r = i.name),
            i.type === "radio" && r != null)
          ) {
            for (i = n; i.parentNode; ) i = i.parentNode;
            for (
              i = i.querySelectorAll(
                'input[name="' + cn("" + r) + '"][type="radio"]',
              ),
                r = 0;
              r < i.length;
              r++
            ) {
              var l = i[r];
              if (l !== n && l.form === n.form) {
                var d = l[Ve] || null;
                if (!d) throw Error(a(90));
                Sc(
                  l,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name,
                );
              }
            }
            for (r = 0; r < i.length; r++)
              ((l = i[r]), l.form === n.form && qp(l));
          }
          break e;
        case "textarea":
          Zp(n, i.value, i.defaultValue);
          break e;
        case "select":
          ((r = i.value), r != null && ta(n, !!i.multiple, r, !1));
      }
    }
  }
  var Rc = !1;
  function Kp(n, r, i) {
    if (Rc) return n(r, i);
    Rc = !0;
    try {
      var l = n(r);
      return l;
    } finally {
      if (
        ((Rc = !1),
        (ra !== null || oa !== null) &&
          (Ll(), ra && ((r = ra), (n = oa), (oa = ra = null), Yp(r), n)))
      )
        for (r = 0; r < n.length; r++) Yp(n[r]);
    }
  }
  function pi(n, r) {
    var i = n.stateNode;
    if (i === null) return null;
    var l = i[Ve] || null;
    if (l === null) return null;
    i = l[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((l = !l.disabled) ||
          ((n = n.type),
          (l = !(
            n === "button" ||
            n === "input" ||
            n === "select" ||
            n === "textarea"
          ))),
          (n = !l));
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (i && typeof i != "function") throw Error(a(231, r, typeof i));
    return i;
  }
  var nr = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Tc = !1;
  if (nr)
    try {
      var mi = {};
      (Object.defineProperty(mi, "passive", {
        get: function () {
          Tc = !0;
        },
      }),
        window.addEventListener("test", mi, mi),
        window.removeEventListener("test", mi, mi));
    } catch {
      Tc = !1;
    }
  var Tr = null,
    Cc = null,
    Js = null;
  function Qp() {
    if (Js) return Js;
    var n,
      r = Cc,
      i = r.length,
      l,
      d = "value" in Tr ? Tr.value : Tr.textContent,
      m = d.length;
    for (n = 0; n < i && r[n] === d[n]; n++);
    var b = i - n;
    for (l = 1; l <= b && r[i - l] === d[m - l]; l++);
    return (Js = d.slice(n, 1 < l ? 1 - l : void 0));
  }
  function el(n) {
    var r = n.keyCode;
    return (
      "charCode" in n
        ? ((n = n.charCode), n === 0 && r === 13 && (n = 13))
        : (n = r),
      n === 10 && (n = 13),
      32 <= n || n === 13 ? n : 0
    );
  }
  function tl() {
    return !0;
  }
  function Xp() {
    return !1;
  }
  function Vt(n) {
    function r(i, l, d, m, b) {
      ((this._reactName = i),
        (this._targetInst = d),
        (this.type = l),
        (this.nativeEvent = m),
        (this.target = b),
        (this.currentTarget = null));
      for (var x in n)
        n.hasOwnProperty(x) && ((i = n[x]), (this[x] = i ? i(m) : m[x]));
      return (
        (this.isDefaultPrevented = (
          m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1
        )
          ? tl
          : Xp),
        (this.isPropagationStopped = Xp),
        this
      );
    }
    return (
      v(r.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != "unknown" && (i.returnValue = !1),
            (this.isDefaultPrevented = tl));
        },
        stopPropagation: function () {
          var i = this.nativeEvent;
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
            (this.isPropagationStopped = tl));
        },
        persist: function () {},
        isPersistent: tl,
      }),
      r
    );
  }
  var po = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (n) {
        return n.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    nl = Vt(po),
    yi = v({}, po, { view: 0, detail: 0 }),
    l_ = Vt(yi),
    Oc,
    Ac,
    vi,
    rl = v({}, yi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Dc,
      button: 0,
      buttons: 0,
      relatedTarget: function (n) {
        return n.relatedTarget === void 0
          ? n.fromElement === n.srcElement
            ? n.toElement
            : n.fromElement
          : n.relatedTarget;
      },
      movementX: function (n) {
        return "movementX" in n
          ? n.movementX
          : (n !== vi &&
              (vi && n.type === "mousemove"
                ? ((Oc = n.screenX - vi.screenX), (Ac = n.screenY - vi.screenY))
                : (Ac = Oc = 0),
              (vi = n)),
            Oc);
      },
      movementY: function (n) {
        return "movementY" in n ? n.movementY : Ac;
      },
    }),
    Wp = Vt(rl),
    u_ = v({}, rl, { dataTransfer: 0 }),
    c_ = Vt(u_),
    f_ = v({}, yi, { relatedTarget: 0 }),
    Mc = Vt(f_),
    d_ = v({}, po, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    h_ = Vt(d_),
    p_ = v({}, po, {
      clipboardData: function (n) {
        return "clipboardData" in n ? n.clipboardData : window.clipboardData;
      },
    }),
    m_ = Vt(p_),
    y_ = v({}, po, { data: 0 }),
    Jp = Vt(y_),
    v_ = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    g_ = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    b_ = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function S_(n) {
    var r = this.nativeEvent;
    return r.getModifierState
      ? r.getModifierState(n)
      : (n = b_[n])
        ? !!r[n]
        : !1;
  }
  function Dc() {
    return S_;
  }
  var w_ = v({}, yi, {
      key: function (n) {
        if (n.key) {
          var r = v_[n.key] || n.key;
          if (r !== "Unidentified") return r;
        }
        return n.type === "keypress"
          ? ((n = el(n)), n === 13 ? "Enter" : String.fromCharCode(n))
          : n.type === "keydown" || n.type === "keyup"
            ? g_[n.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Dc,
      charCode: function (n) {
        return n.type === "keypress" ? el(n) : 0;
      },
      keyCode: function (n) {
        return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
      },
      which: function (n) {
        return n.type === "keypress"
          ? el(n)
          : n.type === "keydown" || n.type === "keyup"
            ? n.keyCode
            : 0;
      },
    }),
    __ = Vt(w_),
    x_ = v({}, rl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    em = Vt(x_),
    E_ = v({}, yi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Dc,
    }),
    R_ = Vt(E_),
    T_ = v({}, po, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    C_ = Vt(T_),
    O_ = v({}, rl, {
      deltaX: function (n) {
        return "deltaX" in n
          ? n.deltaX
          : "wheelDeltaX" in n
            ? -n.wheelDeltaX
            : 0;
      },
      deltaY: function (n) {
        return "deltaY" in n
          ? n.deltaY
          : "wheelDeltaY" in n
            ? -n.wheelDeltaY
            : "wheelDelta" in n
              ? -n.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    A_ = Vt(O_),
    M_ = v({}, po, { newState: 0, oldState: 0 }),
    D_ = Vt(M_),
    z_ = [9, 13, 27, 32],
    zc = nr && "CompositionEvent" in window,
    gi = null;
  nr && "documentMode" in document && (gi = document.documentMode);
  var P_ = nr && "TextEvent" in window && !gi,
    tm = nr && (!zc || (gi && 8 < gi && 11 >= gi)),
    nm = " ",
    rm = !1;
  function om(n, r) {
    switch (n) {
      case "keyup":
        return z_.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function am(n) {
    return (
      (n = n.detail),
      typeof n == "object" && "data" in n ? n.data : null
    );
  }
  var aa = !1;
  function j_(n, r) {
    switch (n) {
      case "compositionend":
        return am(r);
      case "keypress":
        return r.which !== 32 ? null : ((rm = !0), nm);
      case "textInput":
        return ((n = r.data), n === nm && rm ? null : n);
      default:
        return null;
    }
  }
  function N_(n, r) {
    if (aa)
      return n === "compositionend" || (!zc && om(n, r))
        ? ((n = Qp()), (Js = Cc = Tr = null), (aa = !1), n)
        : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return tm && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var k_ = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function im(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!k_[n.type] : r === "textarea";
  }
  function sm(n, r, i, l) {
    (ra ? (oa ? oa.push(l) : (oa = [l])) : (ra = l),
      (r = Vl(r, "onChange")),
      0 < r.length &&
        ((i = new nl("onChange", "change", null, i, l)),
        n.push({ event: i, listeners: r })));
  }
  var bi = null,
    Si = null;
  function L_(n) {
    Hv(n, 0);
  }
  function ol(n) {
    var r = hi(n);
    if (qp(r)) return n;
  }
  function lm(n, r) {
    if (n === "change") return r;
  }
  var um = !1;
  if (nr) {
    var Pc;
    if (nr) {
      var jc = "oninput" in document;
      if (!jc) {
        var cm = document.createElement("div");
        (cm.setAttribute("oninput", "return;"),
          (jc = typeof cm.oninput == "function"));
      }
      Pc = jc;
    } else Pc = !1;
    um = Pc && (!document.documentMode || 9 < document.documentMode);
  }
  function fm() {
    bi && (bi.detachEvent("onpropertychange", dm), (Si = bi = null));
  }
  function dm(n) {
    if (n.propertyName === "value" && ol(Si)) {
      var r = [];
      (sm(r, Si, n, Ec(n)), Kp(L_, r));
    }
  }
  function U_(n, r, i) {
    n === "focusin"
      ? (fm(), (bi = r), (Si = i), bi.attachEvent("onpropertychange", dm))
      : n === "focusout" && fm();
  }
  function B_(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown")
      return ol(Si);
  }
  function I_(n, r) {
    if (n === "click") return ol(r);
  }
  function H_(n, r) {
    if (n === "input" || n === "change") return ol(r);
  }
  function q_(n, r) {
    return (n === r && (n !== 0 || 1 / n === 1 / r)) || (n !== n && r !== r);
  }
  var Xt = typeof Object.is == "function" ? Object.is : q_;
  function wi(n, r) {
    if (Xt(n, r)) return !0;
    if (
      typeof n != "object" ||
      n === null ||
      typeof r != "object" ||
      r === null
    )
      return !1;
    var i = Object.keys(n),
      l = Object.keys(r);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var d = i[l];
      if (!Ge.call(r, d) || !Xt(n[d], r[d])) return !1;
    }
    return !0;
  }
  function hm(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function pm(n, r) {
    var i = hm(n);
    n = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (((l = n + i.textContent.length), n <= r && l >= r))
          return { node: i, offset: r - n };
        n = l;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = hm(i);
    }
  }
  function mm(n, r) {
    return n && r
      ? n === r
        ? !0
        : n && n.nodeType === 3
          ? !1
          : r && r.nodeType === 3
            ? mm(n, r.parentNode)
            : "contains" in n
              ? n.contains(r)
              : n.compareDocumentPosition
                ? !!(n.compareDocumentPosition(r) & 16)
                : !1
      : !1;
  }
  function ym(n) {
    n =
      n != null &&
      n.ownerDocument != null &&
      n.ownerDocument.defaultView != null
        ? n.ownerDocument.defaultView
        : window;
    for (var r = Xs(n.document); r instanceof n.HTMLIFrameElement; ) {
      try {
        var i = typeof r.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) n = r.contentWindow;
      else break;
      r = Xs(n.document);
    }
    return r;
  }
  function Nc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return (
      r &&
      ((r === "input" &&
        (n.type === "text" ||
          n.type === "search" ||
          n.type === "tel" ||
          n.type === "url" ||
          n.type === "password")) ||
        r === "textarea" ||
        n.contentEditable === "true")
    );
  }
  var V_ = nr && "documentMode" in document && 11 >= document.documentMode,
    ia = null,
    kc = null,
    _i = null,
    Lc = !1;
  function vm(n, r, i) {
    var l =
      i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Lc ||
      ia == null ||
      ia !== Xs(l) ||
      ((l = ia),
      "selectionStart" in l && Nc(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (_i && wi(_i, l)) ||
        ((_i = l),
        (l = Vl(kc, "onSelect")),
        0 < l.length &&
          ((r = new nl("onSelect", "select", null, r, i)),
          n.push({ event: r, listeners: l }),
          (r.target = ia))));
  }
  function mo(n, r) {
    var i = {};
    return (
      (i[n.toLowerCase()] = r.toLowerCase()),
      (i["Webkit" + n] = "webkit" + r),
      (i["Moz" + n] = "moz" + r),
      i
    );
  }
  var sa = {
      animationend: mo("Animation", "AnimationEnd"),
      animationiteration: mo("Animation", "AnimationIteration"),
      animationstart: mo("Animation", "AnimationStart"),
      transitionrun: mo("Transition", "TransitionRun"),
      transitionstart: mo("Transition", "TransitionStart"),
      transitioncancel: mo("Transition", "TransitionCancel"),
      transitionend: mo("Transition", "TransitionEnd"),
    },
    Uc = {},
    gm = {};
  nr &&
    ((gm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete sa.animationend.animation,
      delete sa.animationiteration.animation,
      delete sa.animationstart.animation),
    "TransitionEvent" in window || delete sa.transitionend.transition);
  function yo(n) {
    if (Uc[n]) return Uc[n];
    if (!sa[n]) return n;
    var r = sa[n],
      i;
    for (i in r) if (r.hasOwnProperty(i) && i in gm) return (Uc[n] = r[i]);
    return n;
  }
  var bm = yo("animationend"),
    Sm = yo("animationiteration"),
    wm = yo("animationstart"),
    Z_ = yo("transitionrun"),
    $_ = yo("transitionstart"),
    G_ = yo("transitioncancel"),
    _m = yo("transitionend"),
    xm = new Map(),
    Bc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Bc.push("scrollEnd");
  function Rn(n, r) {
    (xm.set(n, r), ho(r, [n]));
  }
  var Em = new WeakMap();
  function fn(n, r) {
    if (typeof n == "object" && n !== null) {
      var i = Em.get(n);
      return i !== void 0
        ? i
        : ((r = { value: n, source: r, stack: Ip(r) }), Em.set(n, r), r);
    }
    return { value: n, source: r, stack: Ip(r) };
  }
  var dn = [],
    la = 0,
    Ic = 0;
  function al() {
    for (var n = la, r = (Ic = la = 0); r < n; ) {
      var i = dn[r];
      dn[r++] = null;
      var l = dn[r];
      dn[r++] = null;
      var d = dn[r];
      dn[r++] = null;
      var m = dn[r];
      if (((dn[r++] = null), l !== null && d !== null)) {
        var b = l.pending;
        (b === null ? (d.next = d) : ((d.next = b.next), (b.next = d)),
          (l.pending = d));
      }
      m !== 0 && Rm(i, d, m);
    }
  }
  function il(n, r, i, l) {
    ((dn[la++] = n),
      (dn[la++] = r),
      (dn[la++] = i),
      (dn[la++] = l),
      (Ic |= l),
      (n.lanes |= l),
      (n = n.alternate),
      n !== null && (n.lanes |= l));
  }
  function Hc(n, r, i, l) {
    return (il(n, r, i, l), sl(n));
  }
  function ua(n, r) {
    return (il(n, null, null, r), sl(n));
  }
  function Rm(n, r, i) {
    n.lanes |= i;
    var l = n.alternate;
    l !== null && (l.lanes |= i);
    for (var d = !1, m = n.return; m !== null; )
      ((m.childLanes |= i),
        (l = m.alternate),
        l !== null && (l.childLanes |= i),
        m.tag === 22 &&
          ((n = m.stateNode), n === null || n._visibility & 1 || (d = !0)),
        (n = m),
        (m = m.return));
    return n.tag === 3
      ? ((m = n.stateNode),
        d &&
          r !== null &&
          ((d = 31 - Tt(i)),
          (n = m.hiddenUpdates),
          (l = n[d]),
          l === null ? (n[d] = [r]) : l.push(r),
          (r.lane = i | 536870912)),
        m)
      : null;
  }
  function sl(n) {
    if (50 < Fi) throw ((Fi = 0), (Yf = null), Error(a(185)));
    for (var r = n.return; r !== null; ) ((n = r), (r = n.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var ca = {};
  function F_(n, r, i, l) {
    ((this.tag = n),
      (this.key = i),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = r),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Wt(n, r, i, l) {
    return new F_(n, r, i, l);
  }
  function qc(n) {
    return ((n = n.prototype), !(!n || !n.isReactComponent));
  }
  function rr(n, r) {
    var i = n.alternate;
    return (
      i === null
        ? ((i = Wt(n.tag, r, n.key, n.mode)),
          (i.elementType = n.elementType),
          (i.type = n.type),
          (i.stateNode = n.stateNode),
          (i.alternate = n),
          (n.alternate = i))
        : ((i.pendingProps = r),
          (i.type = n.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = n.flags & 65011712),
      (i.childLanes = n.childLanes),
      (i.lanes = n.lanes),
      (i.child = n.child),
      (i.memoizedProps = n.memoizedProps),
      (i.memoizedState = n.memoizedState),
      (i.updateQueue = n.updateQueue),
      (r = n.dependencies),
      (i.dependencies =
        r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
      (i.sibling = n.sibling),
      (i.index = n.index),
      (i.ref = n.ref),
      (i.refCleanup = n.refCleanup),
      i
    );
  }
  function Tm(n, r) {
    n.flags &= 65011714;
    var i = n.alternate;
    return (
      i === null
        ? ((n.childLanes = 0),
          (n.lanes = r),
          (n.child = null),
          (n.subtreeFlags = 0),
          (n.memoizedProps = null),
          (n.memoizedState = null),
          (n.updateQueue = null),
          (n.dependencies = null),
          (n.stateNode = null))
        : ((n.childLanes = i.childLanes),
          (n.lanes = i.lanes),
          (n.child = i.child),
          (n.subtreeFlags = 0),
          (n.deletions = null),
          (n.memoizedProps = i.memoizedProps),
          (n.memoizedState = i.memoizedState),
          (n.updateQueue = i.updateQueue),
          (n.type = i.type),
          (r = i.dependencies),
          (n.dependencies =
            r === null
              ? null
              : { lanes: r.lanes, firstContext: r.firstContext })),
      n
    );
  }
  function ll(n, r, i, l, d, m) {
    var b = 0;
    if (((l = n), typeof n == "function")) qc(n) && (b = 1);
    else if (typeof n == "string")
      b = Kx(n, i, J.current)
        ? 26
        : n === "html" || n === "head" || n === "body"
          ? 27
          : 5;
    else
      e: switch (n) {
        case re:
          return (
            (n = Wt(31, i, r, d)),
            (n.elementType = re),
            (n.lanes = m),
            n
          );
        case w:
          return vo(i.children, d, m, r);
        case _:
          ((b = 8), (d |= 24));
          break;
        case T:
          return (
            (n = Wt(12, i, r, d | 2)),
            (n.elementType = T),
            (n.lanes = m),
            n
          );
        case H:
          return ((n = Wt(13, i, r, d)), (n.elementType = H), (n.lanes = m), n);
        case F:
          return ((n = Wt(19, i, r, d)), (n.elementType = F), (n.lanes = m), n);
        default:
          if (typeof n == "object" && n !== null)
            switch (n.$$typeof) {
              case A:
              case P:
                b = 10;
                break e;
              case N:
                b = 9;
                break e;
              case k:
                b = 11;
                break e;
              case Z:
                b = 14;
                break e;
              case B:
                ((b = 16), (l = null));
                break e;
            }
          ((b = 29),
            (i = Error(a(130, n === null ? "null" : typeof n, ""))),
            (l = null));
      }
    return (
      (r = Wt(b, i, r, d)),
      (r.elementType = n),
      (r.type = l),
      (r.lanes = m),
      r
    );
  }
  function vo(n, r, i, l) {
    return ((n = Wt(7, n, l, r)), (n.lanes = i), n);
  }
  function Vc(n, r, i) {
    return ((n = Wt(6, n, null, r)), (n.lanes = i), n);
  }
  function Zc(n, r, i) {
    return (
      (r = Wt(4, n.children !== null ? n.children : [], n.key, r)),
      (r.lanes = i),
      (r.stateNode = {
        containerInfo: n.containerInfo,
        pendingChildren: null,
        implementation: n.implementation,
      }),
      r
    );
  }
  var fa = [],
    da = 0,
    ul = null,
    cl = 0,
    hn = [],
    pn = 0,
    go = null,
    or = 1,
    ar = "";
  function bo(n, r) {
    ((fa[da++] = cl), (fa[da++] = ul), (ul = n), (cl = r));
  }
  function Cm(n, r, i) {
    ((hn[pn++] = or), (hn[pn++] = ar), (hn[pn++] = go), (go = n));
    var l = or;
    n = ar;
    var d = 32 - Tt(l) - 1;
    ((l &= ~(1 << d)), (i += 1));
    var m = 32 - Tt(r) + d;
    if (30 < m) {
      var b = d - (d % 5);
      ((m = (l & ((1 << b) - 1)).toString(32)),
        (l >>= b),
        (d -= b),
        (or = (1 << (32 - Tt(r) + d)) | (i << d) | l),
        (ar = m + n));
    } else ((or = (1 << m) | (i << d) | l), (ar = n));
  }
  function $c(n) {
    n.return !== null && (bo(n, 1), Cm(n, 1, 0));
  }
  function Gc(n) {
    for (; n === ul; )
      ((ul = fa[--da]), (fa[da] = null), (cl = fa[--da]), (fa[da] = null));
    for (; n === go; )
      ((go = hn[--pn]),
        (hn[pn] = null),
        (ar = hn[--pn]),
        (hn[pn] = null),
        (or = hn[--pn]),
        (hn[pn] = null));
  }
  var Lt = null,
    Je = null,
    Ne = !1,
    So = null,
    jn = !1,
    Fc = Error(a(519));
  function wo(n) {
    var r = Error(a(418, ""));
    throw (Ri(fn(r, n)), Fc);
  }
  function Om(n) {
    var r = n.stateNode,
      i = n.type,
      l = n.memoizedProps;
    switch (((r[ot] = n), (r[Ve] = l), i)) {
      case "dialog":
        (Oe("cancel", r), Oe("close", r));
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", r);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ki.length; i++) Oe(Ki[i], r);
        break;
      case "source":
        Oe("error", r);
        break;
      case "img":
      case "image":
      case "link":
        (Oe("error", r), Oe("load", r));
        break;
      case "details":
        Oe("toggle", r);
        break;
      case "input":
        (Oe("invalid", r),
          Vp(
            r,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ),
          Qs(r));
        break;
      case "select":
        Oe("invalid", r);
        break;
      case "textarea":
        (Oe("invalid", r), $p(r, l.value, l.defaultValue, l.children), Qs(r));
    }
    ((i = l.children),
      (typeof i != "string" && typeof i != "number" && typeof i != "bigint") ||
      r.textContent === "" + i ||
      l.suppressHydrationWarning === !0 ||
      $v(r.textContent, i)
        ? (l.popover != null && (Oe("beforetoggle", r), Oe("toggle", r)),
          l.onScroll != null && Oe("scroll", r),
          l.onScrollEnd != null && Oe("scrollend", r),
          l.onClick != null && (r.onclick = Zl),
          (r = !0))
        : (r = !1),
      r || wo(n));
  }
  function Am(n) {
    for (Lt = n.return; Lt; )
      switch (Lt.tag) {
        case 5:
        case 13:
          jn = !1;
          return;
        case 27:
        case 3:
          jn = !0;
          return;
        default:
          Lt = Lt.return;
      }
  }
  function xi(n) {
    if (n !== Lt) return !1;
    if (!Ne) return (Am(n), (Ne = !0), !1);
    var r = n.tag,
      i;
    if (
      ((i = r !== 3 && r !== 27) &&
        ((i = r === 5) &&
          ((i = n.type),
          (i =
            !(i !== "form" && i !== "button") || cd(n.type, n.memoizedProps))),
        (i = !i)),
      i && Je && wo(n),
      Am(n),
      r === 13)
    ) {
      if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
        throw Error(a(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8)
            if (((i = n.data), i === "/$")) {
              if (r === 0) {
                Je = Cn(n.nextSibling);
                break e;
              }
              r--;
            } else (i !== "$" && i !== "$!" && i !== "$?") || r++;
          n = n.nextSibling;
        }
        Je = null;
      }
    } else
      r === 27
        ? ((r = Je), qr(n.type) ? ((n = pd), (pd = null), (Je = n)) : (Je = r))
        : (Je = Lt ? Cn(n.stateNode.nextSibling) : null);
    return !0;
  }
  function Ei() {
    ((Je = Lt = null), (Ne = !1));
  }
  function Mm() {
    var n = So;
    return (
      n !== null &&
        (Gt === null ? (Gt = n) : Gt.push.apply(Gt, n), (So = null)),
      n
    );
  }
  function Ri(n) {
    So === null ? (So = [n]) : So.push(n);
  }
  var Yc = G(null),
    _o = null,
    ir = null;
  function Cr(n, r, i) {
    ($(Yc, r._currentValue), (r._currentValue = i));
  }
  function sr(n) {
    ((n._currentValue = Yc.current), ne(Yc));
  }
  function Kc(n, r, i) {
    for (; n !== null; ) {
      var l = n.alternate;
      if (
        ((n.childLanes & r) !== r
          ? ((n.childLanes |= r), l !== null && (l.childLanes |= r))
          : l !== null && (l.childLanes & r) !== r && (l.childLanes |= r),
        n === i)
      )
        break;
      n = n.return;
    }
  }
  function Qc(n, r, i, l) {
    var d = n.child;
    for (d !== null && (d.return = n); d !== null; ) {
      var m = d.dependencies;
      if (m !== null) {
        var b = d.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var x = m;
          m = d;
          for (var O = 0; O < r.length; O++)
            if (x.context === r[O]) {
              ((m.lanes |= i),
                (x = m.alternate),
                x !== null && (x.lanes |= i),
                Kc(m.return, i, n),
                l || (b = null));
              break e;
            }
          m = x.next;
        }
      } else if (d.tag === 18) {
        if (((b = d.return), b === null)) throw Error(a(341));
        ((b.lanes |= i),
          (m = b.alternate),
          m !== null && (m.lanes |= i),
          Kc(b, i, n),
          (b = null));
      } else b = d.child;
      if (b !== null) b.return = d;
      else
        for (b = d; b !== null; ) {
          if (b === n) {
            b = null;
            break;
          }
          if (((d = b.sibling), d !== null)) {
            ((d.return = b.return), (b = d));
            break;
          }
          b = b.return;
        }
      d = b;
    }
  }
  function Ti(n, r, i, l) {
    n = null;
    for (var d = r, m = !1; d !== null; ) {
      if (!m) {
        if ((d.flags & 524288) !== 0) m = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var b = d.alternate;
        if (b === null) throw Error(a(387));
        if (((b = b.memoizedProps), b !== null)) {
          var x = d.type;
          Xt(d.pendingProps.value, b.value) ||
            (n !== null ? n.push(x) : (n = [x]));
        }
      } else if (d === le.current) {
        if (((b = d.alternate), b === null)) throw Error(a(387));
        b.memoizedState.memoizedState !== d.memoizedState.memoizedState &&
          (n !== null ? n.push(ts) : (n = [ts]));
      }
      d = d.return;
    }
    (n !== null && Qc(r, n, i, l), (r.flags |= 262144));
  }
  function fl(n) {
    for (n = n.firstContext; n !== null; ) {
      if (!Xt(n.context._currentValue, n.memoizedValue)) return !0;
      n = n.next;
    }
    return !1;
  }
  function xo(n) {
    ((_o = n),
      (ir = null),
      (n = n.dependencies),
      n !== null && (n.firstContext = null));
  }
  function zt(n) {
    return Dm(_o, n);
  }
  function dl(n, r) {
    return (_o === null && xo(n), Dm(n, r));
  }
  function Dm(n, r) {
    var i = r._currentValue;
    if (((r = { context: r, memoizedValue: i, next: null }), ir === null)) {
      if (n === null) throw Error(a(308));
      ((ir = r),
        (n.dependencies = { lanes: 0, firstContext: r }),
        (n.flags |= 524288));
    } else ir = ir.next = r;
    return i;
  }
  var Y_ =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var n = [],
              r = (this.signal = {
                aborted: !1,
                addEventListener: function (i, l) {
                  n.push(l);
                },
              });
            this.abort = function () {
              ((r.aborted = !0),
                n.forEach(function (i) {
                  return i();
                }));
            };
          },
    K_ = e.unstable_scheduleCallback,
    Q_ = e.unstable_NormalPriority,
    mt = {
      $$typeof: P,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Xc() {
    return { controller: new Y_(), data: new Map(), refCount: 0 };
  }
  function Ci(n) {
    (n.refCount--,
      n.refCount === 0 &&
        K_(Q_, function () {
          n.controller.abort();
        }));
  }
  var Oi = null,
    Wc = 0,
    ha = 0,
    pa = null;
  function X_(n, r) {
    if (Oi === null) {
      var i = (Oi = []);
      ((Wc = 0),
        (ha = td()),
        (pa = {
          status: "pending",
          value: void 0,
          then: function (l) {
            i.push(l);
          },
        }));
    }
    return (Wc++, r.then(zm, zm), r);
  }
  function zm() {
    if (--Wc === 0 && Oi !== null) {
      pa !== null && (pa.status = "fulfilled");
      var n = Oi;
      ((Oi = null), (ha = 0), (pa = null));
      for (var r = 0; r < n.length; r++) (0, n[r])();
    }
  }
  function W_(n, r) {
    var i = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (d) {
          i.push(d);
        },
      };
    return (
      n.then(
        function () {
          ((l.status = "fulfilled"), (l.value = r));
          for (var d = 0; d < i.length; d++) (0, i[d])(r);
        },
        function (d) {
          for (l.status = "rejected", l.reason = d, d = 0; d < i.length; d++)
            (0, i[d])(void 0);
        },
      ),
      l
    );
  }
  var Pm = z.S;
  z.S = function (n, r) {
    (typeof r == "object" &&
      r !== null &&
      typeof r.then == "function" &&
      X_(n, r),
      Pm !== null && Pm(n, r));
  };
  var Eo = G(null);
  function Jc() {
    var n = Eo.current;
    return n !== null ? n : Ze.pooledCache;
  }
  function hl(n, r) {
    r === null ? $(Eo, Eo.current) : $(Eo, r.pool);
  }
  function jm() {
    var n = Jc();
    return n === null ? null : { parent: mt._currentValue, pool: n };
  }
  var Ai = Error(a(460)),
    Nm = Error(a(474)),
    pl = Error(a(542)),
    ef = { then: function () {} };
  function km(n) {
    return ((n = n.status), n === "fulfilled" || n === "rejected");
  }
  function ml() {}
  function Lm(n, r, i) {
    switch (
      ((i = n[i]),
      i === void 0 ? n.push(r) : i !== r && (r.then(ml, ml), (r = i)),
      r.status)
    ) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw ((n = r.reason), Bm(n), n);
      default:
        if (typeof r.status == "string") r.then(ml, ml);
        else {
          if (((n = Ze), n !== null && 100 < n.shellSuspendCounter))
            throw Error(a(482));
          ((n = r),
            (n.status = "pending"),
            n.then(
              function (l) {
                if (r.status === "pending") {
                  var d = r;
                  ((d.status = "fulfilled"), (d.value = l));
                }
              },
              function (l) {
                if (r.status === "pending") {
                  var d = r;
                  ((d.status = "rejected"), (d.reason = l));
                }
              },
            ));
        }
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw ((n = r.reason), Bm(n), n);
        }
        throw ((Mi = r), Ai);
    }
  }
  var Mi = null;
  function Um() {
    if (Mi === null) throw Error(a(459));
    var n = Mi;
    return ((Mi = null), n);
  }
  function Bm(n) {
    if (n === Ai || n === pl) throw Error(a(483));
  }
  var Or = !1;
  function tf(n) {
    n.updateQueue = {
      baseState: n.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function nf(n, r) {
    ((n = n.updateQueue),
      r.updateQueue === n &&
        (r.updateQueue = {
          baseState: n.baseState,
          firstBaseUpdate: n.firstBaseUpdate,
          lastBaseUpdate: n.lastBaseUpdate,
          shared: n.shared,
          callbacks: null,
        }));
  }
  function Ar(n) {
    return { lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function Mr(n, r, i) {
    var l = n.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Le & 2) !== 0)) {
      var d = l.pending;
      return (
        d === null ? (r.next = r) : ((r.next = d.next), (d.next = r)),
        (l.pending = r),
        (r = sl(n)),
        Rm(n, null, i),
        r
      );
    }
    return (il(n, l, r, i), sl(n));
  }
  function Di(n, r, i) {
    if (
      ((r = r.updateQueue), r !== null && ((r = r.shared), (i & 4194048) !== 0))
    ) {
      var l = r.lanes;
      ((l &= n.pendingLanes), (i |= l), (r.lanes = i), nt(n, i));
    }
  }
  function rf(n, r) {
    var i = n.updateQueue,
      l = n.alternate;
    if (l !== null && ((l = l.updateQueue), i === l)) {
      var d = null,
        m = null;
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var b = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null,
          };
          (m === null ? (d = m = b) : (m = m.next = b), (i = i.next));
        } while (i !== null);
        m === null ? (d = m = r) : (m = m.next = r);
      } else d = m = r;
      ((i = {
        baseState: l.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: m,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (n.updateQueue = i));
      return;
    }
    ((n = i.lastBaseUpdate),
      n === null ? (i.firstBaseUpdate = r) : (n.next = r),
      (i.lastBaseUpdate = r));
  }
  var of = !1;
  function zi() {
    if (of) {
      var n = pa;
      if (n !== null) throw n;
    }
  }
  function Pi(n, r, i, l) {
    of = !1;
    var d = n.updateQueue;
    Or = !1;
    var m = d.firstBaseUpdate,
      b = d.lastBaseUpdate,
      x = d.shared.pending;
    if (x !== null) {
      d.shared.pending = null;
      var O = x,
        U = O.next;
      ((O.next = null), b === null ? (m = U) : (b.next = U), (b = O));
      var Y = n.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (x = Y.lastBaseUpdate),
        x !== b &&
          (x === null ? (Y.firstBaseUpdate = U) : (x.next = U),
          (Y.lastBaseUpdate = O)));
    }
    if (m !== null) {
      var X = d.baseState;
      ((b = 0), (Y = U = O = null), (x = m));
      do {
        var I = x.lane & -536870913,
          V = I !== x.lane;
        if (V ? (De & I) === I : (l & I) === I) {
          (I !== 0 && I === ha && (of = !0),
            Y !== null &&
              (Y = Y.next =
                {
                  lane: 0,
                  tag: x.tag,
                  payload: x.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var Se = n,
              ge = x;
            I = r;
            var He = i;
            switch (ge.tag) {
              case 1:
                if (((Se = ge.payload), typeof Se == "function")) {
                  X = Se.call(He, X, I);
                  break e;
                }
                X = Se;
                break e;
              case 3:
                Se.flags = (Se.flags & -65537) | 128;
              case 0:
                if (
                  ((Se = ge.payload),
                  (I = typeof Se == "function" ? Se.call(He, X, I) : Se),
                  I == null)
                )
                  break e;
                X = v({}, X, I);
                break e;
              case 2:
                Or = !0;
            }
          }
          ((I = x.callback),
            I !== null &&
              ((n.flags |= 64),
              V && (n.flags |= 8192),
              (V = d.callbacks),
              V === null ? (d.callbacks = [I]) : V.push(I)));
        } else
          ((V = {
            lane: I,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null,
          }),
            Y === null ? ((U = Y = V), (O = X)) : (Y = Y.next = V),
            (b |= I));
        if (((x = x.next), x === null)) {
          if (((x = d.shared.pending), x === null)) break;
          ((V = x),
            (x = V.next),
            (V.next = null),
            (d.lastBaseUpdate = V),
            (d.shared.pending = null));
        }
      } while (!0);
      (Y === null && (O = X),
        (d.baseState = O),
        (d.firstBaseUpdate = U),
        (d.lastBaseUpdate = Y),
        m === null && (d.shared.lanes = 0),
        (Ur |= b),
        (n.lanes = b),
        (n.memoizedState = X));
    }
  }
  function Im(n, r) {
    if (typeof n != "function") throw Error(a(191, n));
    n.call(r);
  }
  function Hm(n, r) {
    var i = n.callbacks;
    if (i !== null)
      for (n.callbacks = null, n = 0; n < i.length; n++) Im(i[n], r);
  }
  var ma = G(null),
    yl = G(0);
  function qm(n, r) {
    ((n = pr), $(yl, n), $(ma, r), (pr = n | r.baseLanes));
  }
  function af() {
    ($(yl, pr), $(ma, ma.current));
  }
  function sf() {
    ((pr = yl.current), ne(ma), ne(yl));
  }
  var Dr = 0,
    Ee = null,
    Be = null,
    ct = null,
    vl = !1,
    ya = !1,
    Ro = !1,
    gl = 0,
    ji = 0,
    va = null,
    J_ = 0;
  function at() {
    throw Error(a(321));
  }
  function lf(n, r) {
    if (r === null) return !1;
    for (var i = 0; i < r.length && i < n.length; i++)
      if (!Xt(n[i], r[i])) return !1;
    return !0;
  }
  function uf(n, r, i, l, d, m) {
    return (
      (Dr = m),
      (Ee = r),
      (r.memoizedState = null),
      (r.updateQueue = null),
      (r.lanes = 0),
      (z.H = n === null || n.memoizedState === null ? Ry : Ty),
      (Ro = !1),
      (m = i(l, d)),
      (Ro = !1),
      ya && (m = Zm(r, i, l, d)),
      Vm(n),
      m
    );
  }
  function Vm(n) {
    z.H = El;
    var r = Be !== null && Be.next !== null;
    if (((Dr = 0), (ct = Be = Ee = null), (vl = !1), (ji = 0), (va = null), r))
      throw Error(a(300));
    n === null ||
      _t ||
      ((n = n.dependencies), n !== null && fl(n) && (_t = !0));
  }
  function Zm(n, r, i, l) {
    Ee = n;
    var d = 0;
    do {
      if ((ya && (va = null), (ji = 0), (ya = !1), 25 <= d))
        throw Error(a(301));
      if (((d += 1), (ct = Be = null), n.updateQueue != null)) {
        var m = n.updateQueue;
        ((m.lastEffect = null),
          (m.events = null),
          (m.stores = null),
          m.memoCache != null && (m.memoCache.index = 0));
      }
      ((z.H = ix), (m = r(i, l)));
    } while (ya);
    return m;
  }
  function ex() {
    var n = z.H,
      r = n.useState()[0];
    return (
      (r = typeof r.then == "function" ? Ni(r) : r),
      (n = n.useState()[0]),
      (Be !== null ? Be.memoizedState : null) !== n && (Ee.flags |= 1024),
      r
    );
  }
  function cf() {
    var n = gl !== 0;
    return ((gl = 0), n);
  }
  function ff(n, r, i) {
    ((r.updateQueue = n.updateQueue), (r.flags &= -2053), (n.lanes &= ~i));
  }
  function df(n) {
    if (vl) {
      for (n = n.memoizedState; n !== null; ) {
        var r = n.queue;
        (r !== null && (r.pending = null), (n = n.next));
      }
      vl = !1;
    }
    ((Dr = 0), (ct = Be = Ee = null), (ya = !1), (ji = gl = 0), (va = null));
  }
  function Zt() {
    var n = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ct === null ? (Ee.memoizedState = ct = n) : (ct = ct.next = n), ct);
  }
  function ft() {
    if (Be === null) {
      var n = Ee.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Be.next;
    var r = ct === null ? Ee.memoizedState : ct.next;
    if (r !== null) ((ct = r), (Be = n));
    else {
      if (n === null)
        throw Ee.alternate === null ? Error(a(467)) : Error(a(310));
      ((Be = n),
        (n = {
          memoizedState: Be.memoizedState,
          baseState: Be.baseState,
          baseQueue: Be.baseQueue,
          queue: Be.queue,
          next: null,
        }),
        ct === null ? (Ee.memoizedState = ct = n) : (ct = ct.next = n));
    }
    return ct;
  }
  function hf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ni(n) {
    var r = ji;
    return (
      (ji += 1),
      va === null && (va = []),
      (n = Lm(va, n, r)),
      (r = Ee),
      (ct === null ? r.memoizedState : ct.next) === null &&
        ((r = r.alternate),
        (z.H = r === null || r.memoizedState === null ? Ry : Ty)),
      n
    );
  }
  function bl(n) {
    if (n !== null && typeof n == "object") {
      if (typeof n.then == "function") return Ni(n);
      if (n.$$typeof === P) return zt(n);
    }
    throw Error(a(438, String(n)));
  }
  function pf(n) {
    var r = null,
      i = Ee.updateQueue;
    if ((i !== null && (r = i.memoCache), r == null)) {
      var l = Ee.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (r = {
              data: l.data.map(function (d) {
                return d.slice();
              }),
              index: 0,
            })));
    }
    if (
      (r == null && (r = { data: [], index: 0 }),
      i === null && ((i = hf()), (Ee.updateQueue = i)),
      (i.memoCache = r),
      (i = r.data[r.index]),
      i === void 0)
    )
      for (i = r.data[r.index] = Array(n), l = 0; l < n; l++) i[l] = ae;
    return (r.index++, i);
  }
  function lr(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Sl(n) {
    var r = ft();
    return mf(r, Be, n);
  }
  function mf(n, r, i) {
    var l = n.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = i;
    var d = n.baseQueue,
      m = l.pending;
    if (m !== null) {
      if (d !== null) {
        var b = d.next;
        ((d.next = m.next), (m.next = b));
      }
      ((r.baseQueue = d = m), (l.pending = null));
    }
    if (((m = n.baseState), d === null)) n.memoizedState = m;
    else {
      r = d.next;
      var x = (b = null),
        O = null,
        U = r,
        Y = !1;
      do {
        var X = U.lane & -536870913;
        if (X !== U.lane ? (De & X) === X : (Dr & X) === X) {
          var I = U.revertLane;
          if (I === 0)
            (O !== null &&
              (O = O.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: U.action,
                  hasEagerState: U.hasEagerState,
                  eagerState: U.eagerState,
                  next: null,
                }),
              X === ha && (Y = !0));
          else if ((Dr & I) === I) {
            ((U = U.next), I === ha && (Y = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: U.revertLane,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null,
            }),
              O === null ? ((x = O = X), (b = m)) : (O = O.next = X),
              (Ee.lanes |= I),
              (Ur |= I));
          ((X = U.action),
            Ro && i(m, X),
            (m = U.hasEagerState ? U.eagerState : i(m, X)));
        } else
          ((I = {
            lane: X,
            revertLane: U.revertLane,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null,
          }),
            O === null ? ((x = O = I), (b = m)) : (O = O.next = I),
            (Ee.lanes |= X),
            (Ur |= X));
        U = U.next;
      } while (U !== null && U !== r);
      if (
        (O === null ? (b = m) : (O.next = x),
        !Xt(m, n.memoizedState) && ((_t = !0), Y && ((i = pa), i !== null)))
      )
        throw i;
      ((n.memoizedState = m),
        (n.baseState = b),
        (n.baseQueue = O),
        (l.lastRenderedState = m));
    }
    return (d === null && (l.lanes = 0), [n.memoizedState, l.dispatch]);
  }
  function yf(n) {
    var r = ft(),
      i = r.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = n;
    var l = i.dispatch,
      d = i.pending,
      m = r.memoizedState;
    if (d !== null) {
      i.pending = null;
      var b = (d = d.next);
      do ((m = n(m, b.action)), (b = b.next));
      while (b !== d);
      (Xt(m, r.memoizedState) || (_t = !0),
        (r.memoizedState = m),
        r.baseQueue === null && (r.baseState = m),
        (i.lastRenderedState = m));
    }
    return [m, l];
  }
  function $m(n, r, i) {
    var l = Ee,
      d = ft(),
      m = Ne;
    if (m) {
      if (i === void 0) throw Error(a(407));
      i = i();
    } else i = r();
    var b = !Xt((Be || d).memoizedState, i);
    (b && ((d.memoizedState = i), (_t = !0)), (d = d.queue));
    var x = Ym.bind(null, l, d, n);
    if (
      (ki(2048, 8, x, [n]),
      d.getSnapshot !== r || b || (ct !== null && ct.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        ga(9, wl(), Fm.bind(null, l, d, i, r), null),
        Ze === null)
      )
        throw Error(a(349));
      m || (Dr & 124) !== 0 || Gm(l, r, i);
    }
    return i;
  }
  function Gm(n, r, i) {
    ((n.flags |= 16384),
      (n = { getSnapshot: r, value: i }),
      (r = Ee.updateQueue),
      r === null
        ? ((r = hf()), (Ee.updateQueue = r), (r.stores = [n]))
        : ((i = r.stores), i === null ? (r.stores = [n]) : i.push(n)));
  }
  function Fm(n, r, i, l) {
    ((r.value = i), (r.getSnapshot = l), Km(r) && Qm(n));
  }
  function Ym(n, r, i) {
    return i(function () {
      Km(r) && Qm(n);
    });
  }
  function Km(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var i = r();
      return !Xt(n, i);
    } catch {
      return !0;
    }
  }
  function Qm(n) {
    var r = ua(n, 2);
    r !== null && rn(r, n, 2);
  }
  function vf(n) {
    var r = Zt();
    if (typeof n == "function") {
      var i = n;
      if (((n = i()), Ro)) {
        xn(!0);
        try {
          i();
        } finally {
          xn(!1);
        }
      }
    }
    return (
      (r.memoizedState = r.baseState = n),
      (r.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: lr,
        lastRenderedState: n,
      }),
      r
    );
  }
  function Xm(n, r, i, l) {
    return ((n.baseState = i), mf(n, Be, typeof l == "function" ? l : lr));
  }
  function tx(n, r, i, l, d) {
    if (xl(n)) throw Error(a(485));
    if (((n = r.action), n !== null)) {
      var m = {
        payload: d,
        action: n,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (b) {
          m.listeners.push(b);
        },
      };
      (z.T !== null ? i(!0) : (m.isTransition = !1),
        l(m),
        (i = r.pending),
        i === null
          ? ((m.next = r.pending = m), Wm(r, m))
          : ((m.next = i.next), (r.pending = i.next = m)));
    }
  }
  function Wm(n, r) {
    var i = r.action,
      l = r.payload,
      d = n.state;
    if (r.isTransition) {
      var m = z.T,
        b = {};
      z.T = b;
      try {
        var x = i(d, l),
          O = z.S;
        (O !== null && O(b, x), Jm(n, r, x));
      } catch (U) {
        gf(n, r, U);
      } finally {
        z.T = m;
      }
    } else
      try {
        ((m = i(d, l)), Jm(n, r, m));
      } catch (U) {
        gf(n, r, U);
      }
  }
  function Jm(n, r, i) {
    i !== null && typeof i == "object" && typeof i.then == "function"
      ? i.then(
          function (l) {
            ey(n, r, l);
          },
          function (l) {
            return gf(n, r, l);
          },
        )
      : ey(n, r, i);
  }
  function ey(n, r, i) {
    ((r.status = "fulfilled"),
      (r.value = i),
      ty(r),
      (n.state = i),
      (r = n.pending),
      r !== null &&
        ((i = r.next),
        i === r ? (n.pending = null) : ((i = i.next), (r.next = i), Wm(n, i))));
  }
  function gf(n, r, i) {
    var l = n.pending;
    if (((n.pending = null), l !== null)) {
      l = l.next;
      do ((r.status = "rejected"), (r.reason = i), ty(r), (r = r.next));
      while (r !== l);
    }
    n.action = null;
  }
  function ty(n) {
    n = n.listeners;
    for (var r = 0; r < n.length; r++) (0, n[r])();
  }
  function ny(n, r) {
    return r;
  }
  function ry(n, r) {
    if (Ne) {
      var i = Ze.formState;
      if (i !== null) {
        e: {
          var l = Ee;
          if (Ne) {
            if (Je) {
              t: {
                for (var d = Je, m = jn; d.nodeType !== 8; ) {
                  if (!m) {
                    d = null;
                    break t;
                  }
                  if (((d = Cn(d.nextSibling)), d === null)) {
                    d = null;
                    break t;
                  }
                }
                ((m = d.data), (d = m === "F!" || m === "F" ? d : null));
              }
              if (d) {
                ((Je = Cn(d.nextSibling)), (l = d.data === "F!"));
                break e;
              }
            }
            wo(l);
          }
          l = !1;
        }
        l && (r = i[0]);
      }
    }
    return (
      (i = Zt()),
      (i.memoizedState = i.baseState = r),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ny,
        lastRenderedState: r,
      }),
      (i.queue = l),
      (i = _y.bind(null, Ee, l)),
      (l.dispatch = i),
      (l = vf(!1)),
      (m = xf.bind(null, Ee, !1, l.queue)),
      (l = Zt()),
      (d = { state: r, dispatch: null, action: n, pending: null }),
      (l.queue = d),
      (i = tx.bind(null, Ee, d, m, i)),
      (d.dispatch = i),
      (l.memoizedState = n),
      [r, i, !1]
    );
  }
  function oy(n) {
    var r = ft();
    return ay(r, Be, n);
  }
  function ay(n, r, i) {
    if (
      ((r = mf(n, r, ny)[0]),
      (n = Sl(lr)[0]),
      typeof r == "object" && r !== null && typeof r.then == "function")
    )
      try {
        var l = Ni(r);
      } catch (b) {
        throw b === Ai ? pl : b;
      }
    else l = r;
    r = ft();
    var d = r.queue,
      m = d.dispatch;
    return (
      i !== r.memoizedState &&
        ((Ee.flags |= 2048), ga(9, wl(), nx.bind(null, d, i), null)),
      [l, m, n]
    );
  }
  function nx(n, r) {
    n.action = r;
  }
  function iy(n) {
    var r = ft(),
      i = Be;
    if (i !== null) return ay(r, i, n);
    (ft(), (r = r.memoizedState), (i = ft()));
    var l = i.queue.dispatch;
    return ((i.memoizedState = n), [r, l, !1]);
  }
  function ga(n, r, i, l) {
    return (
      (n = { tag: n, create: i, deps: l, inst: r, next: null }),
      (r = Ee.updateQueue),
      r === null && ((r = hf()), (Ee.updateQueue = r)),
      (i = r.lastEffect),
      i === null
        ? (r.lastEffect = n.next = n)
        : ((l = i.next), (i.next = n), (n.next = l), (r.lastEffect = n)),
      n
    );
  }
  function wl() {
    return { destroy: void 0, resource: void 0 };
  }
  function sy() {
    return ft().memoizedState;
  }
  function _l(n, r, i, l) {
    var d = Zt();
    ((l = l === void 0 ? null : l),
      (Ee.flags |= n),
      (d.memoizedState = ga(1 | r, wl(), i, l)));
  }
  function ki(n, r, i, l) {
    var d = ft();
    l = l === void 0 ? null : l;
    var m = d.memoizedState.inst;
    Be !== null && l !== null && lf(l, Be.memoizedState.deps)
      ? (d.memoizedState = ga(r, m, i, l))
      : ((Ee.flags |= n), (d.memoizedState = ga(1 | r, m, i, l)));
  }
  function ly(n, r) {
    _l(8390656, 8, n, r);
  }
  function uy(n, r) {
    ki(2048, 8, n, r);
  }
  function cy(n, r) {
    return ki(4, 2, n, r);
  }
  function fy(n, r) {
    return ki(4, 4, n, r);
  }
  function dy(n, r) {
    if (typeof r == "function") {
      n = n();
      var i = r(n);
      return function () {
        typeof i == "function" ? i() : r(null);
      };
    }
    if (r != null)
      return (
        (n = n()),
        (r.current = n),
        function () {
          r.current = null;
        }
      );
  }
  function hy(n, r, i) {
    ((i = i != null ? i.concat([n]) : null), ki(4, 4, dy.bind(null, r, n), i));
  }
  function bf() {}
  function py(n, r) {
    var i = ft();
    r = r === void 0 ? null : r;
    var l = i.memoizedState;
    return r !== null && lf(r, l[1]) ? l[0] : ((i.memoizedState = [n, r]), n);
  }
  function my(n, r) {
    var i = ft();
    r = r === void 0 ? null : r;
    var l = i.memoizedState;
    if (r !== null && lf(r, l[1])) return l[0];
    if (((l = n()), Ro)) {
      xn(!0);
      try {
        n();
      } finally {
        xn(!1);
      }
    }
    return ((i.memoizedState = [l, r]), l);
  }
  function Sf(n, r, i) {
    return i === void 0 || (Dr & 1073741824) !== 0
      ? (n.memoizedState = r)
      : ((n.memoizedState = i), (n = gv()), (Ee.lanes |= n), (Ur |= n), i);
  }
  function yy(n, r, i, l) {
    return Xt(i, r)
      ? i
      : ma.current !== null
        ? ((n = Sf(n, i, l)), Xt(n, r) || (_t = !0), n)
        : (Dr & 42) === 0
          ? ((_t = !0), (n.memoizedState = i))
          : ((n = gv()), (Ee.lanes |= n), (Ur |= n), r);
  }
  function vy(n, r, i, l, d) {
    var m = K.p;
    K.p = m !== 0 && 8 > m ? m : 8;
    var b = z.T,
      x = {};
    ((z.T = x), xf(n, !1, r, i));
    try {
      var O = d(),
        U = z.S;
      if (
        (U !== null && U(x, O),
        O !== null && typeof O == "object" && typeof O.then == "function")
      ) {
        var Y = W_(O, l);
        Li(n, r, Y, nn(n));
      } else Li(n, r, l, nn(n));
    } catch (X) {
      Li(n, r, { then: function () {}, status: "rejected", reason: X }, nn());
    } finally {
      ((K.p = m), (z.T = b));
    }
  }
  function rx() {}
  function wf(n, r, i, l) {
    if (n.tag !== 5) throw Error(a(476));
    var d = gy(n).queue;
    vy(
      n,
      d,
      r,
      q,
      i === null
        ? rx
        : function () {
            return (by(n), i(l));
          },
    );
  }
  function gy(n) {
    var r = n.memoizedState;
    if (r !== null) return r;
    r = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: lr,
        lastRenderedState: q,
      },
      next: null,
    };
    var i = {};
    return (
      (r.next = {
        memoizedState: i,
        baseState: i,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: lr,
          lastRenderedState: i,
        },
        next: null,
      }),
      (n.memoizedState = r),
      (n = n.alternate),
      n !== null && (n.memoizedState = r),
      r
    );
  }
  function by(n) {
    var r = gy(n).next.queue;
    Li(n, r, {}, nn());
  }
  function _f() {
    return zt(ts);
  }
  function Sy() {
    return ft().memoizedState;
  }
  function wy() {
    return ft().memoizedState;
  }
  function ox(n) {
    for (var r = n.return; r !== null; ) {
      switch (r.tag) {
        case 24:
        case 3:
          var i = nn();
          n = Ar(i);
          var l = Mr(r, n, i);
          (l !== null && (rn(l, r, i), Di(l, r, i)),
            (r = { cache: Xc() }),
            (n.payload = r));
          return;
      }
      r = r.return;
    }
  }
  function ax(n, r, i) {
    var l = nn();
    ((i = {
      lane: l,
      revertLane: 0,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      xl(n)
        ? xy(r, i)
        : ((i = Hc(n, r, i, l)), i !== null && (rn(i, n, l), Ey(i, r, l))));
  }
  function _y(n, r, i) {
    var l = nn();
    Li(n, r, i, l);
  }
  function Li(n, r, i, l) {
    var d = {
      lane: l,
      revertLane: 0,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (xl(n)) xy(r, d);
    else {
      var m = n.alternate;
      if (
        n.lanes === 0 &&
        (m === null || m.lanes === 0) &&
        ((m = r.lastRenderedReducer), m !== null)
      )
        try {
          var b = r.lastRenderedState,
            x = m(b, i);
          if (((d.hasEagerState = !0), (d.eagerState = x), Xt(x, b)))
            return (il(n, r, d, 0), Ze === null && al(), !1);
        } catch {
        } finally {
        }
      if (((i = Hc(n, r, d, l)), i !== null))
        return (rn(i, n, l), Ey(i, r, l), !0);
    }
    return !1;
  }
  function xf(n, r, i, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: td(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      xl(n))
    ) {
      if (r) throw Error(a(479));
    } else ((r = Hc(n, i, l, 2)), r !== null && rn(r, n, 2));
  }
  function xl(n) {
    var r = n.alternate;
    return n === Ee || (r !== null && r === Ee);
  }
  function xy(n, r) {
    ya = vl = !0;
    var i = n.pending;
    (i === null ? (r.next = r) : ((r.next = i.next), (i.next = r)),
      (n.pending = r));
  }
  function Ey(n, r, i) {
    if ((i & 4194048) !== 0) {
      var l = r.lanes;
      ((l &= n.pendingLanes), (i |= l), (r.lanes = i), nt(n, i));
    }
  }
  var El = {
      readContext: zt,
      use: bl,
      useCallback: at,
      useContext: at,
      useEffect: at,
      useImperativeHandle: at,
      useLayoutEffect: at,
      useInsertionEffect: at,
      useMemo: at,
      useReducer: at,
      useRef: at,
      useState: at,
      useDebugValue: at,
      useDeferredValue: at,
      useTransition: at,
      useSyncExternalStore: at,
      useId: at,
      useHostTransitionStatus: at,
      useFormState: at,
      useActionState: at,
      useOptimistic: at,
      useMemoCache: at,
      useCacheRefresh: at,
    },
    Ry = {
      readContext: zt,
      use: bl,
      useCallback: function (n, r) {
        return ((Zt().memoizedState = [n, r === void 0 ? null : r]), n);
      },
      useContext: zt,
      useEffect: ly,
      useImperativeHandle: function (n, r, i) {
        ((i = i != null ? i.concat([n]) : null),
          _l(4194308, 4, dy.bind(null, r, n), i));
      },
      useLayoutEffect: function (n, r) {
        return _l(4194308, 4, n, r);
      },
      useInsertionEffect: function (n, r) {
        _l(4, 2, n, r);
      },
      useMemo: function (n, r) {
        var i = Zt();
        r = r === void 0 ? null : r;
        var l = n();
        if (Ro) {
          xn(!0);
          try {
            n();
          } finally {
            xn(!1);
          }
        }
        return ((i.memoizedState = [l, r]), l);
      },
      useReducer: function (n, r, i) {
        var l = Zt();
        if (i !== void 0) {
          var d = i(r);
          if (Ro) {
            xn(!0);
            try {
              i(r);
            } finally {
              xn(!1);
            }
          }
        } else d = r;
        return (
          (l.memoizedState = l.baseState = d),
          (n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: n,
            lastRenderedState: d,
          }),
          (l.queue = n),
          (n = n.dispatch = ax.bind(null, Ee, n)),
          [l.memoizedState, n]
        );
      },
      useRef: function (n) {
        var r = Zt();
        return ((n = { current: n }), (r.memoizedState = n));
      },
      useState: function (n) {
        n = vf(n);
        var r = n.queue,
          i = _y.bind(null, Ee, r);
        return ((r.dispatch = i), [n.memoizedState, i]);
      },
      useDebugValue: bf,
      useDeferredValue: function (n, r) {
        var i = Zt();
        return Sf(i, n, r);
      },
      useTransition: function () {
        var n = vf(!1);
        return (
          (n = vy.bind(null, Ee, n.queue, !0, !1)),
          (Zt().memoizedState = n),
          [!1, n]
        );
      },
      useSyncExternalStore: function (n, r, i) {
        var l = Ee,
          d = Zt();
        if (Ne) {
          if (i === void 0) throw Error(a(407));
          i = i();
        } else {
          if (((i = r()), Ze === null)) throw Error(a(349));
          (De & 124) !== 0 || Gm(l, r, i);
        }
        d.memoizedState = i;
        var m = { value: i, getSnapshot: r };
        return (
          (d.queue = m),
          ly(Ym.bind(null, l, m, n), [n]),
          (l.flags |= 2048),
          ga(9, wl(), Fm.bind(null, l, m, i, r), null),
          i
        );
      },
      useId: function () {
        var n = Zt(),
          r = Ze.identifierPrefix;
        if (Ne) {
          var i = ar,
            l = or;
          ((i = (l & ~(1 << (32 - Tt(l) - 1))).toString(32) + i),
            (r = "«" + r + "R" + i),
            (i = gl++),
            0 < i && (r += "H" + i.toString(32)),
            (r += "»"));
        } else ((i = J_++), (r = "«" + r + "r" + i.toString(32) + "»"));
        return (n.memoizedState = r);
      },
      useHostTransitionStatus: _f,
      useFormState: ry,
      useActionState: ry,
      useOptimistic: function (n) {
        var r = Zt();
        r.memoizedState = r.baseState = n;
        var i = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (r.queue = i),
          (r = xf.bind(null, Ee, !0, i)),
          (i.dispatch = r),
          [n, r]
        );
      },
      useMemoCache: pf,
      useCacheRefresh: function () {
        return (Zt().memoizedState = ox.bind(null, Ee));
      },
    },
    Ty = {
      readContext: zt,
      use: bl,
      useCallback: py,
      useContext: zt,
      useEffect: uy,
      useImperativeHandle: hy,
      useInsertionEffect: cy,
      useLayoutEffect: fy,
      useMemo: my,
      useReducer: Sl,
      useRef: sy,
      useState: function () {
        return Sl(lr);
      },
      useDebugValue: bf,
      useDeferredValue: function (n, r) {
        var i = ft();
        return yy(i, Be.memoizedState, n, r);
      },
      useTransition: function () {
        var n = Sl(lr)[0],
          r = ft().memoizedState;
        return [typeof n == "boolean" ? n : Ni(n), r];
      },
      useSyncExternalStore: $m,
      useId: Sy,
      useHostTransitionStatus: _f,
      useFormState: oy,
      useActionState: oy,
      useOptimistic: function (n, r) {
        var i = ft();
        return Xm(i, Be, n, r);
      },
      useMemoCache: pf,
      useCacheRefresh: wy,
    },
    ix = {
      readContext: zt,
      use: bl,
      useCallback: py,
      useContext: zt,
      useEffect: uy,
      useImperativeHandle: hy,
      useInsertionEffect: cy,
      useLayoutEffect: fy,
      useMemo: my,
      useReducer: yf,
      useRef: sy,
      useState: function () {
        return yf(lr);
      },
      useDebugValue: bf,
      useDeferredValue: function (n, r) {
        var i = ft();
        return Be === null ? Sf(i, n, r) : yy(i, Be.memoizedState, n, r);
      },
      useTransition: function () {
        var n = yf(lr)[0],
          r = ft().memoizedState;
        return [typeof n == "boolean" ? n : Ni(n), r];
      },
      useSyncExternalStore: $m,
      useId: Sy,
      useHostTransitionStatus: _f,
      useFormState: iy,
      useActionState: iy,
      useOptimistic: function (n, r) {
        var i = ft();
        return Be !== null
          ? Xm(i, Be, n, r)
          : ((i.baseState = n), [n, i.queue.dispatch]);
      },
      useMemoCache: pf,
      useCacheRefresh: wy,
    },
    ba = null,
    Ui = 0;
  function Rl(n) {
    var r = Ui;
    return ((Ui += 1), ba === null && (ba = []), Lm(ba, n, r));
  }
  function Bi(n, r) {
    ((r = r.props.ref), (n.ref = r !== void 0 ? r : null));
  }
  function Tl(n, r) {
    throw r.$$typeof === y
      ? Error(a(525))
      : ((n = Object.prototype.toString.call(r)),
        Error(
          a(
            31,
            n === "[object Object]"
              ? "object with keys {" + Object.keys(r).join(", ") + "}"
              : n,
          ),
        ));
  }
  function Cy(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Oy(n) {
    function r(j, M) {
      if (n) {
        var L = j.deletions;
        L === null ? ((j.deletions = [M]), (j.flags |= 16)) : L.push(M);
      }
    }
    function i(j, M) {
      if (!n) return null;
      for (; M !== null; ) (r(j, M), (M = M.sibling));
      return null;
    }
    function l(j) {
      for (var M = new Map(); j !== null; )
        (j.key !== null ? M.set(j.key, j) : M.set(j.index, j), (j = j.sibling));
      return M;
    }
    function d(j, M) {
      return ((j = rr(j, M)), (j.index = 0), (j.sibling = null), j);
    }
    function m(j, M, L) {
      return (
        (j.index = L),
        n
          ? ((L = j.alternate),
            L !== null
              ? ((L = L.index), L < M ? ((j.flags |= 67108866), M) : L)
              : ((j.flags |= 67108866), M))
          : ((j.flags |= 1048576), M)
      );
    }
    function b(j) {
      return (n && j.alternate === null && (j.flags |= 67108866), j);
    }
    function x(j, M, L, Q) {
      return M === null || M.tag !== 6
        ? ((M = Vc(L, j.mode, Q)), (M.return = j), M)
        : ((M = d(M, L)), (M.return = j), M);
    }
    function O(j, M, L, Q) {
      var ue = L.type;
      return ue === w
        ? Y(j, M, L.props.children, Q, L.key)
        : M !== null &&
            (M.elementType === ue ||
              (typeof ue == "object" &&
                ue !== null &&
                ue.$$typeof === B &&
                Cy(ue) === M.type))
          ? ((M = d(M, L.props)), Bi(M, L), (M.return = j), M)
          : ((M = ll(L.type, L.key, L.props, null, j.mode, Q)),
            Bi(M, L),
            (M.return = j),
            M);
    }
    function U(j, M, L, Q) {
      return M === null ||
        M.tag !== 4 ||
        M.stateNode.containerInfo !== L.containerInfo ||
        M.stateNode.implementation !== L.implementation
        ? ((M = Zc(L, j.mode, Q)), (M.return = j), M)
        : ((M = d(M, L.children || [])), (M.return = j), M);
    }
    function Y(j, M, L, Q, ue) {
      return M === null || M.tag !== 7
        ? ((M = vo(L, j.mode, Q, ue)), (M.return = j), M)
        : ((M = d(M, L)), (M.return = j), M);
    }
    function X(j, M, L) {
      if (
        (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
      )
        return ((M = Vc("" + M, j.mode, L)), (M.return = j), M);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case g:
            return (
              (L = ll(M.type, M.key, M.props, null, j.mode, L)),
              Bi(L, M),
              (L.return = j),
              L
            );
          case S:
            return ((M = Zc(M, j.mode, L)), (M.return = j), M);
          case B:
            var Q = M._init;
            return ((M = Q(M._payload)), X(j, M, L));
        }
        if (ye(M) || se(M))
          return ((M = vo(M, j.mode, L, null)), (M.return = j), M);
        if (typeof M.then == "function") return X(j, Rl(M), L);
        if (M.$$typeof === P) return X(j, dl(j, M), L);
        Tl(j, M);
      }
      return null;
    }
    function I(j, M, L, Q) {
      var ue = M !== null ? M.key : null;
      if (
        (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
      )
        return ue !== null ? null : x(j, M, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case g:
            return L.key === ue ? O(j, M, L, Q) : null;
          case S:
            return L.key === ue ? U(j, M, L, Q) : null;
          case B:
            return ((ue = L._init), (L = ue(L._payload)), I(j, M, L, Q));
        }
        if (ye(L) || se(L)) return ue !== null ? null : Y(j, M, L, Q, null);
        if (typeof L.then == "function") return I(j, M, Rl(L), Q);
        if (L.$$typeof === P) return I(j, M, dl(j, L), Q);
        Tl(j, L);
      }
      return null;
    }
    function V(j, M, L, Q, ue) {
      if (
        (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
      )
        return ((j = j.get(L) || null), x(M, j, "" + Q, ue));
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case g:
            return (
              (j = j.get(Q.key === null ? L : Q.key) || null),
              O(M, j, Q, ue)
            );
          case S:
            return (
              (j = j.get(Q.key === null ? L : Q.key) || null),
              U(M, j, Q, ue)
            );
          case B:
            var Te = Q._init;
            return ((Q = Te(Q._payload)), V(j, M, L, Q, ue));
        }
        if (ye(Q) || se(Q))
          return ((j = j.get(L) || null), Y(M, j, Q, ue, null));
        if (typeof Q.then == "function") return V(j, M, L, Rl(Q), ue);
        if (Q.$$typeof === P) return V(j, M, L, dl(M, Q), ue);
        Tl(M, Q);
      }
      return null;
    }
    function Se(j, M, L, Q) {
      for (
        var ue = null, Te = null, pe = M, be = (M = 0), Et = null;
        pe !== null && be < L.length;
        be++
      ) {
        pe.index > be ? ((Et = pe), (pe = null)) : (Et = pe.sibling);
        var Pe = I(j, pe, L[be], Q);
        if (Pe === null) {
          pe === null && (pe = Et);
          break;
        }
        (n && pe && Pe.alternate === null && r(j, pe),
          (M = m(Pe, M, be)),
          Te === null ? (ue = Pe) : (Te.sibling = Pe),
          (Te = Pe),
          (pe = Et));
      }
      if (be === L.length) return (i(j, pe), Ne && bo(j, be), ue);
      if (pe === null) {
        for (; be < L.length; be++)
          ((pe = X(j, L[be], Q)),
            pe !== null &&
              ((M = m(pe, M, be)),
              Te === null ? (ue = pe) : (Te.sibling = pe),
              (Te = pe)));
        return (Ne && bo(j, be), ue);
      }
      for (pe = l(pe); be < L.length; be++)
        ((Et = V(pe, j, be, L[be], Q)),
          Et !== null &&
            (n &&
              Et.alternate !== null &&
              pe.delete(Et.key === null ? be : Et.key),
            (M = m(Et, M, be)),
            Te === null ? (ue = Et) : (Te.sibling = Et),
            (Te = Et)));
      return (
        n &&
          pe.forEach(function (Fr) {
            return r(j, Fr);
          }),
        Ne && bo(j, be),
        ue
      );
    }
    function ge(j, M, L, Q) {
      if (L == null) throw Error(a(151));
      for (
        var ue = null,
          Te = null,
          pe = M,
          be = (M = 0),
          Et = null,
          Pe = L.next();
        pe !== null && !Pe.done;
        be++, Pe = L.next()
      ) {
        pe.index > be ? ((Et = pe), (pe = null)) : (Et = pe.sibling);
        var Fr = I(j, pe, Pe.value, Q);
        if (Fr === null) {
          pe === null && (pe = Et);
          break;
        }
        (n && pe && Fr.alternate === null && r(j, pe),
          (M = m(Fr, M, be)),
          Te === null ? (ue = Fr) : (Te.sibling = Fr),
          (Te = Fr),
          (pe = Et));
      }
      if (Pe.done) return (i(j, pe), Ne && bo(j, be), ue);
      if (pe === null) {
        for (; !Pe.done; be++, Pe = L.next())
          ((Pe = X(j, Pe.value, Q)),
            Pe !== null &&
              ((M = m(Pe, M, be)),
              Te === null ? (ue = Pe) : (Te.sibling = Pe),
              (Te = Pe)));
        return (Ne && bo(j, be), ue);
      }
      for (pe = l(pe); !Pe.done; be++, Pe = L.next())
        ((Pe = V(pe, j, be, Pe.value, Q)),
          Pe !== null &&
            (n &&
              Pe.alternate !== null &&
              pe.delete(Pe.key === null ? be : Pe.key),
            (M = m(Pe, M, be)),
            Te === null ? (ue = Pe) : (Te.sibling = Pe),
            (Te = Pe)));
      return (
        n &&
          pe.forEach(function (sE) {
            return r(j, sE);
          }),
        Ne && bo(j, be),
        ue
      );
    }
    function He(j, M, L, Q) {
      if (
        (typeof L == "object" &&
          L !== null &&
          L.type === w &&
          L.key === null &&
          (L = L.props.children),
        typeof L == "object" && L !== null)
      ) {
        switch (L.$$typeof) {
          case g:
            e: {
              for (var ue = L.key; M !== null; ) {
                if (M.key === ue) {
                  if (((ue = L.type), ue === w)) {
                    if (M.tag === 7) {
                      (i(j, M.sibling),
                        (Q = d(M, L.props.children)),
                        (Q.return = j),
                        (j = Q));
                      break e;
                    }
                  } else if (
                    M.elementType === ue ||
                    (typeof ue == "object" &&
                      ue !== null &&
                      ue.$$typeof === B &&
                      Cy(ue) === M.type)
                  ) {
                    (i(j, M.sibling),
                      (Q = d(M, L.props)),
                      Bi(Q, L),
                      (Q.return = j),
                      (j = Q));
                    break e;
                  }
                  i(j, M);
                  break;
                } else r(j, M);
                M = M.sibling;
              }
              L.type === w
                ? ((Q = vo(L.props.children, j.mode, Q, L.key)),
                  (Q.return = j),
                  (j = Q))
                : ((Q = ll(L.type, L.key, L.props, null, j.mode, Q)),
                  Bi(Q, L),
                  (Q.return = j),
                  (j = Q));
            }
            return b(j);
          case S:
            e: {
              for (ue = L.key; M !== null; ) {
                if (M.key === ue)
                  if (
                    M.tag === 4 &&
                    M.stateNode.containerInfo === L.containerInfo &&
                    M.stateNode.implementation === L.implementation
                  ) {
                    (i(j, M.sibling),
                      (Q = d(M, L.children || [])),
                      (Q.return = j),
                      (j = Q));
                    break e;
                  } else {
                    i(j, M);
                    break;
                  }
                else r(j, M);
                M = M.sibling;
              }
              ((Q = Zc(L, j.mode, Q)), (Q.return = j), (j = Q));
            }
            return b(j);
          case B:
            return ((ue = L._init), (L = ue(L._payload)), He(j, M, L, Q));
        }
        if (ye(L)) return Se(j, M, L, Q);
        if (se(L)) {
          if (((ue = se(L)), typeof ue != "function")) throw Error(a(150));
          return ((L = ue.call(L)), ge(j, M, L, Q));
        }
        if (typeof L.then == "function") return He(j, M, Rl(L), Q);
        if (L.$$typeof === P) return He(j, M, dl(j, L), Q);
        Tl(j, L);
      }
      return (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
        ? ((L = "" + L),
          M !== null && M.tag === 6
            ? (i(j, M.sibling), (Q = d(M, L)), (Q.return = j), (j = Q))
            : (i(j, M), (Q = Vc(L, j.mode, Q)), (Q.return = j), (j = Q)),
          b(j))
        : i(j, M);
    }
    return function (j, M, L, Q) {
      try {
        Ui = 0;
        var ue = He(j, M, L, Q);
        return ((ba = null), ue);
      } catch (pe) {
        if (pe === Ai || pe === pl) throw pe;
        var Te = Wt(29, pe, null, j.mode);
        return ((Te.lanes = Q), (Te.return = j), Te);
      } finally {
      }
    };
  }
  var Sa = Oy(!0),
    Ay = Oy(!1),
    mn = G(null),
    Nn = null;
  function zr(n) {
    var r = n.alternate;
    ($(yt, yt.current & 1),
      $(mn, n),
      Nn === null &&
        (r === null || ma.current !== null || r.memoizedState !== null) &&
        (Nn = n));
  }
  function My(n) {
    if (n.tag === 22) {
      if (($(yt, yt.current), $(mn, n), Nn === null)) {
        var r = n.alternate;
        r !== null && r.memoizedState !== null && (Nn = n);
      }
    } else Pr();
  }
  function Pr() {
    ($(yt, yt.current), $(mn, mn.current));
  }
  function ur(n) {
    (ne(mn), Nn === n && (Nn = null), ne(yt));
  }
  var yt = G(0);
  function Cl(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var i = r.memoizedState;
        if (
          i !== null &&
          ((i = i.dehydrated), i === null || i.data === "$?" || hd(i))
        )
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        ((r.child.return = r), (r = r.child));
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      ((r.sibling.return = r.return), (r = r.sibling));
    }
    return null;
  }
  function Ef(n, r, i, l) {
    ((r = n.memoizedState),
      (i = i(l, r)),
      (i = i == null ? r : v({}, r, i)),
      (n.memoizedState = i),
      n.lanes === 0 && (n.updateQueue.baseState = i));
  }
  var Rf = {
    enqueueSetState: function (n, r, i) {
      n = n._reactInternals;
      var l = nn(),
        d = Ar(l);
      ((d.payload = r),
        i != null && (d.callback = i),
        (r = Mr(n, d, l)),
        r !== null && (rn(r, n, l), Di(r, n, l)));
    },
    enqueueReplaceState: function (n, r, i) {
      n = n._reactInternals;
      var l = nn(),
        d = Ar(l);
      ((d.tag = 1),
        (d.payload = r),
        i != null && (d.callback = i),
        (r = Mr(n, d, l)),
        r !== null && (rn(r, n, l), Di(r, n, l)));
    },
    enqueueForceUpdate: function (n, r) {
      n = n._reactInternals;
      var i = nn(),
        l = Ar(i);
      ((l.tag = 2),
        r != null && (l.callback = r),
        (r = Mr(n, l, i)),
        r !== null && (rn(r, n, i), Di(r, n, i)));
    },
  };
  function Dy(n, r, i, l, d, m, b) {
    return (
      (n = n.stateNode),
      typeof n.shouldComponentUpdate == "function"
        ? n.shouldComponentUpdate(l, m, b)
        : r.prototype && r.prototype.isPureReactComponent
          ? !wi(i, l) || !wi(d, m)
          : !0
    );
  }
  function zy(n, r, i, l) {
    ((n = r.state),
      typeof r.componentWillReceiveProps == "function" &&
        r.componentWillReceiveProps(i, l),
      typeof r.UNSAFE_componentWillReceiveProps == "function" &&
        r.UNSAFE_componentWillReceiveProps(i, l),
      r.state !== n && Rf.enqueueReplaceState(r, r.state, null));
  }
  function To(n, r) {
    var i = r;
    if ("ref" in r) {
      i = {};
      for (var l in r) l !== "ref" && (i[l] = r[l]);
    }
    if ((n = n.defaultProps)) {
      i === r && (i = v({}, i));
      for (var d in n) i[d] === void 0 && (i[d] = n[d]);
    }
    return i;
  }
  var Ol =
    typeof reportError == "function"
      ? reportError
      : function (n) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var r = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof n == "object" &&
                n !== null &&
                typeof n.message == "string"
                  ? String(n.message)
                  : String(n),
              error: n,
            });
            if (!window.dispatchEvent(r)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", n);
            return;
          }
          console.error(n);
        };
  function Py(n) {
    Ol(n);
  }
  function jy(n) {
    console.error(n);
  }
  function Ny(n) {
    Ol(n);
  }
  function Al(n, r) {
    try {
      var i = n.onUncaughtError;
      i(r.value, { componentStack: r.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function ky(n, r, i) {
    try {
      var l = n.onCaughtError;
      l(i.value, {
        componentStack: i.stack,
        errorBoundary: r.tag === 1 ? r.stateNode : null,
      });
    } catch (d) {
      setTimeout(function () {
        throw d;
      });
    }
  }
  function Tf(n, r, i) {
    return (
      (i = Ar(i)),
      (i.tag = 3),
      (i.payload = { element: null }),
      (i.callback = function () {
        Al(n, r);
      }),
      i
    );
  }
  function Ly(n) {
    return ((n = Ar(n)), (n.tag = 3), n);
  }
  function Uy(n, r, i, l) {
    var d = i.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var m = l.value;
      ((n.payload = function () {
        return d(m);
      }),
        (n.callback = function () {
          ky(r, i, l);
        }));
    }
    var b = i.stateNode;
    b !== null &&
      typeof b.componentDidCatch == "function" &&
      (n.callback = function () {
        (ky(r, i, l),
          typeof d != "function" &&
            (Br === null ? (Br = new Set([this])) : Br.add(this)));
        var x = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: x !== null ? x : "",
        });
      });
  }
  function sx(n, r, i, l, d) {
    if (
      ((i.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((r = i.alternate),
        r !== null && Ti(r, i, d, !0),
        (i = mn.current),
        i !== null)
      ) {
        switch (i.tag) {
          case 13:
            return (
              Nn === null ? Qf() : i.alternate === null && et === 0 && (et = 3),
              (i.flags &= -257),
              (i.flags |= 65536),
              (i.lanes = d),
              l === ef
                ? (i.flags |= 16384)
                : ((r = i.updateQueue),
                  r === null ? (i.updateQueue = new Set([l])) : r.add(l),
                  Wf(n, l, d)),
              !1
            );
          case 22:
            return (
              (i.flags |= 65536),
              l === ef
                ? (i.flags |= 16384)
                : ((r = i.updateQueue),
                  r === null
                    ? ((r = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (i.updateQueue = r))
                    : ((i = r.retryQueue),
                      i === null ? (r.retryQueue = new Set([l])) : i.add(l)),
                  Wf(n, l, d)),
              !1
            );
        }
        throw Error(a(435, i.tag));
      }
      return (Wf(n, l, d), Qf(), !1);
    }
    if (Ne)
      return (
        (r = mn.current),
        r !== null
          ? ((r.flags & 65536) === 0 && (r.flags |= 256),
            (r.flags |= 65536),
            (r.lanes = d),
            l !== Fc && ((n = Error(a(422), { cause: l })), Ri(fn(n, i))))
          : (l !== Fc && ((r = Error(a(423), { cause: l })), Ri(fn(r, i))),
            (n = n.current.alternate),
            (n.flags |= 65536),
            (d &= -d),
            (n.lanes |= d),
            (l = fn(l, i)),
            (d = Tf(n.stateNode, l, d)),
            rf(n, d),
            et !== 4 && (et = 2)),
        !1
      );
    var m = Error(a(520), { cause: l });
    if (
      ((m = fn(m, i)),
      Gi === null ? (Gi = [m]) : Gi.push(m),
      et !== 4 && (et = 2),
      r === null)
    )
      return !0;
    ((l = fn(l, i)), (i = r));
    do {
      switch (i.tag) {
        case 3:
          return (
            (i.flags |= 65536),
            (n = d & -d),
            (i.lanes |= n),
            (n = Tf(i.stateNode, l, n)),
            rf(i, n),
            !1
          );
        case 1:
          if (
            ((r = i.type),
            (m = i.stateNode),
            (i.flags & 128) === 0 &&
              (typeof r.getDerivedStateFromError == "function" ||
                (m !== null &&
                  typeof m.componentDidCatch == "function" &&
                  (Br === null || !Br.has(m)))))
          )
            return (
              (i.flags |= 65536),
              (d &= -d),
              (i.lanes |= d),
              (d = Ly(d)),
              Uy(d, n, i, l),
              rf(i, d),
              !1
            );
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var By = Error(a(461)),
    _t = !1;
  function Ot(n, r, i, l) {
    r.child = n === null ? Ay(r, null, i, l) : Sa(r, n.child, i, l);
  }
  function Iy(n, r, i, l, d) {
    i = i.render;
    var m = r.ref;
    if ("ref" in l) {
      var b = {};
      for (var x in l) x !== "ref" && (b[x] = l[x]);
    } else b = l;
    return (
      xo(r),
      (l = uf(n, r, i, b, m, d)),
      (x = cf()),
      n !== null && !_t
        ? (ff(n, r, d), cr(n, r, d))
        : (Ne && x && $c(r), (r.flags |= 1), Ot(n, r, l, d), r.child)
    );
  }
  function Hy(n, r, i, l, d) {
    if (n === null) {
      var m = i.type;
      return typeof m == "function" &&
        !qc(m) &&
        m.defaultProps === void 0 &&
        i.compare === null
        ? ((r.tag = 15), (r.type = m), qy(n, r, m, l, d))
        : ((n = ll(i.type, null, l, r, r.mode, d)),
          (n.ref = r.ref),
          (n.return = r),
          (r.child = n));
    }
    if (((m = n.child), !jf(n, d))) {
      var b = m.memoizedProps;
      if (
        ((i = i.compare), (i = i !== null ? i : wi), i(b, l) && n.ref === r.ref)
      )
        return cr(n, r, d);
    }
    return (
      (r.flags |= 1),
      (n = rr(m, l)),
      (n.ref = r.ref),
      (n.return = r),
      (r.child = n)
    );
  }
  function qy(n, r, i, l, d) {
    if (n !== null) {
      var m = n.memoizedProps;
      if (wi(m, l) && n.ref === r.ref)
        if (((_t = !1), (r.pendingProps = l = m), jf(n, d)))
          (n.flags & 131072) !== 0 && (_t = !0);
        else return ((r.lanes = n.lanes), cr(n, r, d));
    }
    return Cf(n, r, i, l, d);
  }
  function Vy(n, r, i) {
    var l = r.pendingProps,
      d = l.children,
      m = n !== null ? n.memoizedState : null;
    if (l.mode === "hidden") {
      if ((r.flags & 128) !== 0) {
        if (((l = m !== null ? m.baseLanes | i : i), n !== null)) {
          for (d = r.child = n.child, m = 0; d !== null; )
            ((m = m | d.lanes | d.childLanes), (d = d.sibling));
          r.childLanes = m & ~l;
        } else ((r.childLanes = 0), (r.child = null));
        return Zy(n, r, l, i);
      }
      if ((i & 536870912) !== 0)
        ((r.memoizedState = { baseLanes: 0, cachePool: null }),
          n !== null && hl(r, m !== null ? m.cachePool : null),
          m !== null ? qm(r, m) : af(),
          My(r));
      else
        return (
          (r.lanes = r.childLanes = 536870912),
          Zy(n, r, m !== null ? m.baseLanes | i : i, i)
        );
    } else
      m !== null
        ? (hl(r, m.cachePool), qm(r, m), Pr(), (r.memoizedState = null))
        : (n !== null && hl(r, null), af(), Pr());
    return (Ot(n, r, d, i), r.child);
  }
  function Zy(n, r, i, l) {
    var d = Jc();
    return (
      (d = d === null ? null : { parent: mt._currentValue, pool: d }),
      (r.memoizedState = { baseLanes: i, cachePool: d }),
      n !== null && hl(r, null),
      af(),
      My(r),
      n !== null && Ti(n, r, l, !0),
      null
    );
  }
  function Ml(n, r) {
    var i = r.ref;
    if (i === null) n !== null && n.ref !== null && (r.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object") throw Error(a(284));
      (n === null || n.ref !== i) && (r.flags |= 4194816);
    }
  }
  function Cf(n, r, i, l, d) {
    return (
      xo(r),
      (i = uf(n, r, i, l, void 0, d)),
      (l = cf()),
      n !== null && !_t
        ? (ff(n, r, d), cr(n, r, d))
        : (Ne && l && $c(r), (r.flags |= 1), Ot(n, r, i, d), r.child)
    );
  }
  function $y(n, r, i, l, d, m) {
    return (
      xo(r),
      (r.updateQueue = null),
      (i = Zm(r, l, i, d)),
      Vm(n),
      (l = cf()),
      n !== null && !_t
        ? (ff(n, r, m), cr(n, r, m))
        : (Ne && l && $c(r), (r.flags |= 1), Ot(n, r, i, m), r.child)
    );
  }
  function Gy(n, r, i, l, d) {
    if ((xo(r), r.stateNode === null)) {
      var m = ca,
        b = i.contextType;
      (typeof b == "object" && b !== null && (m = zt(b)),
        (m = new i(l, m)),
        (r.memoizedState =
          m.state !== null && m.state !== void 0 ? m.state : null),
        (m.updater = Rf),
        (r.stateNode = m),
        (m._reactInternals = r),
        (m = r.stateNode),
        (m.props = l),
        (m.state = r.memoizedState),
        (m.refs = {}),
        tf(r),
        (b = i.contextType),
        (m.context = typeof b == "object" && b !== null ? zt(b) : ca),
        (m.state = r.memoizedState),
        (b = i.getDerivedStateFromProps),
        typeof b == "function" && (Ef(r, i, b, l), (m.state = r.memoizedState)),
        typeof i.getDerivedStateFromProps == "function" ||
          typeof m.getSnapshotBeforeUpdate == "function" ||
          (typeof m.UNSAFE_componentWillMount != "function" &&
            typeof m.componentWillMount != "function") ||
          ((b = m.state),
          typeof m.componentWillMount == "function" && m.componentWillMount(),
          typeof m.UNSAFE_componentWillMount == "function" &&
            m.UNSAFE_componentWillMount(),
          b !== m.state && Rf.enqueueReplaceState(m, m.state, null),
          Pi(r, l, m, d),
          zi(),
          (m.state = r.memoizedState)),
        typeof m.componentDidMount == "function" && (r.flags |= 4194308),
        (l = !0));
    } else if (n === null) {
      m = r.stateNode;
      var x = r.memoizedProps,
        O = To(i, x);
      m.props = O;
      var U = m.context,
        Y = i.contextType;
      ((b = ca), typeof Y == "object" && Y !== null && (b = zt(Y)));
      var X = i.getDerivedStateFromProps;
      ((Y =
        typeof X == "function" ||
        typeof m.getSnapshotBeforeUpdate == "function"),
        (x = r.pendingProps !== x),
        Y ||
          (typeof m.UNSAFE_componentWillReceiveProps != "function" &&
            typeof m.componentWillReceiveProps != "function") ||
          ((x || U !== b) && zy(r, m, l, b)),
        (Or = !1));
      var I = r.memoizedState;
      ((m.state = I),
        Pi(r, l, m, d),
        zi(),
        (U = r.memoizedState),
        x || I !== U || Or
          ? (typeof X == "function" && (Ef(r, i, X, l), (U = r.memoizedState)),
            (O = Or || Dy(r, i, O, l, I, U, b))
              ? (Y ||
                  (typeof m.UNSAFE_componentWillMount != "function" &&
                    typeof m.componentWillMount != "function") ||
                  (typeof m.componentWillMount == "function" &&
                    m.componentWillMount(),
                  typeof m.UNSAFE_componentWillMount == "function" &&
                    m.UNSAFE_componentWillMount()),
                typeof m.componentDidMount == "function" &&
                  (r.flags |= 4194308))
              : (typeof m.componentDidMount == "function" &&
                  (r.flags |= 4194308),
                (r.memoizedProps = l),
                (r.memoizedState = U)),
            (m.props = l),
            (m.state = U),
            (m.context = b),
            (l = O))
          : (typeof m.componentDidMount == "function" && (r.flags |= 4194308),
            (l = !1)));
    } else {
      ((m = r.stateNode),
        nf(n, r),
        (b = r.memoizedProps),
        (Y = To(i, b)),
        (m.props = Y),
        (X = r.pendingProps),
        (I = m.context),
        (U = i.contextType),
        (O = ca),
        typeof U == "object" && U !== null && (O = zt(U)),
        (x = i.getDerivedStateFromProps),
        (U =
          typeof x == "function" ||
          typeof m.getSnapshotBeforeUpdate == "function") ||
          (typeof m.UNSAFE_componentWillReceiveProps != "function" &&
            typeof m.componentWillReceiveProps != "function") ||
          ((b !== X || I !== O) && zy(r, m, l, O)),
        (Or = !1),
        (I = r.memoizedState),
        (m.state = I),
        Pi(r, l, m, d),
        zi());
      var V = r.memoizedState;
      b !== X ||
      I !== V ||
      Or ||
      (n !== null && n.dependencies !== null && fl(n.dependencies))
        ? (typeof x == "function" && (Ef(r, i, x, l), (V = r.memoizedState)),
          (Y =
            Or ||
            Dy(r, i, Y, l, I, V, O) ||
            (n !== null && n.dependencies !== null && fl(n.dependencies)))
            ? (U ||
                (typeof m.UNSAFE_componentWillUpdate != "function" &&
                  typeof m.componentWillUpdate != "function") ||
                (typeof m.componentWillUpdate == "function" &&
                  m.componentWillUpdate(l, V, O),
                typeof m.UNSAFE_componentWillUpdate == "function" &&
                  m.UNSAFE_componentWillUpdate(l, V, O)),
              typeof m.componentDidUpdate == "function" && (r.flags |= 4),
              typeof m.getSnapshotBeforeUpdate == "function" &&
                (r.flags |= 1024))
            : (typeof m.componentDidUpdate != "function" ||
                (b === n.memoizedProps && I === n.memoizedState) ||
                (r.flags |= 4),
              typeof m.getSnapshotBeforeUpdate != "function" ||
                (b === n.memoizedProps && I === n.memoizedState) ||
                (r.flags |= 1024),
              (r.memoizedProps = l),
              (r.memoizedState = V)),
          (m.props = l),
          (m.state = V),
          (m.context = O),
          (l = Y))
        : (typeof m.componentDidUpdate != "function" ||
            (b === n.memoizedProps && I === n.memoizedState) ||
            (r.flags |= 4),
          typeof m.getSnapshotBeforeUpdate != "function" ||
            (b === n.memoizedProps && I === n.memoizedState) ||
            (r.flags |= 1024),
          (l = !1));
    }
    return (
      (m = l),
      Ml(n, r),
      (l = (r.flags & 128) !== 0),
      m || l
        ? ((m = r.stateNode),
          (i =
            l && typeof i.getDerivedStateFromError != "function"
              ? null
              : m.render()),
          (r.flags |= 1),
          n !== null && l
            ? ((r.child = Sa(r, n.child, null, d)),
              (r.child = Sa(r, null, i, d)))
            : Ot(n, r, i, d),
          (r.memoizedState = m.state),
          (n = r.child))
        : (n = cr(n, r, d)),
      n
    );
  }
  function Fy(n, r, i, l) {
    return (Ei(), (r.flags |= 256), Ot(n, r, i, l), r.child);
  }
  var Of = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Af(n) {
    return { baseLanes: n, cachePool: jm() };
  }
  function Mf(n, r, i) {
    return ((n = n !== null ? n.childLanes & ~i : 0), r && (n |= yn), n);
  }
  function Yy(n, r, i) {
    var l = r.pendingProps,
      d = !1,
      m = (r.flags & 128) !== 0,
      b;
    if (
      ((b = m) ||
        (b =
          n !== null && n.memoizedState === null ? !1 : (yt.current & 2) !== 0),
      b && ((d = !0), (r.flags &= -129)),
      (b = (r.flags & 32) !== 0),
      (r.flags &= -33),
      n === null)
    ) {
      if (Ne) {
        if ((d ? zr(r) : Pr(), Ne)) {
          var x = Je,
            O;
          if ((O = x)) {
            e: {
              for (O = x, x = jn; O.nodeType !== 8; ) {
                if (!x) {
                  x = null;
                  break e;
                }
                if (((O = Cn(O.nextSibling)), O === null)) {
                  x = null;
                  break e;
                }
              }
              x = O;
            }
            x !== null
              ? ((r.memoizedState = {
                  dehydrated: x,
                  treeContext: go !== null ? { id: or, overflow: ar } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (O = Wt(18, null, null, 0)),
                (O.stateNode = x),
                (O.return = r),
                (r.child = O),
                (Lt = r),
                (Je = null),
                (O = !0))
              : (O = !1);
          }
          O || wo(r);
        }
        if (
          ((x = r.memoizedState),
          x !== null && ((x = x.dehydrated), x !== null))
        )
          return (hd(x) ? (r.lanes = 32) : (r.lanes = 536870912), null);
        ur(r);
      }
      return (
        (x = l.children),
        (l = l.fallback),
        d
          ? (Pr(),
            (d = r.mode),
            (x = Dl({ mode: "hidden", children: x }, d)),
            (l = vo(l, d, i, null)),
            (x.return = r),
            (l.return = r),
            (x.sibling = l),
            (r.child = x),
            (d = r.child),
            (d.memoizedState = Af(i)),
            (d.childLanes = Mf(n, b, i)),
            (r.memoizedState = Of),
            l)
          : (zr(r), Df(r, x))
      );
    }
    if (
      ((O = n.memoizedState), O !== null && ((x = O.dehydrated), x !== null))
    ) {
      if (m)
        r.flags & 256
          ? (zr(r), (r.flags &= -257), (r = zf(n, r, i)))
          : r.memoizedState !== null
            ? (Pr(), (r.child = n.child), (r.flags |= 128), (r = null))
            : (Pr(),
              (d = l.fallback),
              (x = r.mode),
              (l = Dl({ mode: "visible", children: l.children }, x)),
              (d = vo(d, x, i, null)),
              (d.flags |= 2),
              (l.return = r),
              (d.return = r),
              (l.sibling = d),
              (r.child = l),
              Sa(r, n.child, null, i),
              (l = r.child),
              (l.memoizedState = Af(i)),
              (l.childLanes = Mf(n, b, i)),
              (r.memoizedState = Of),
              (r = d));
      else if ((zr(r), hd(x))) {
        if (((b = x.nextSibling && x.nextSibling.dataset), b)) var U = b.dgst;
        ((b = U),
          (l = Error(a(419))),
          (l.stack = ""),
          (l.digest = b),
          Ri({ value: l, source: null, stack: null }),
          (r = zf(n, r, i)));
      } else if (
        (_t || Ti(n, r, i, !1), (b = (i & n.childLanes) !== 0), _t || b)
      ) {
        if (
          ((b = Ze),
          b !== null &&
            ((l = i & -i),
            (l = (l & 42) !== 0 ? 1 : ut(l)),
            (l = (l & (b.suspendedLanes | i)) !== 0 ? 0 : l),
            l !== 0 && l !== O.retryLane))
        )
          throw ((O.retryLane = l), ua(n, l), rn(b, n, l), By);
        (x.data === "$?" || Qf(), (r = zf(n, r, i)));
      } else
        x.data === "$?"
          ? ((r.flags |= 192), (r.child = n.child), (r = null))
          : ((n = O.treeContext),
            (Je = Cn(x.nextSibling)),
            (Lt = r),
            (Ne = !0),
            (So = null),
            (jn = !1),
            n !== null &&
              ((hn[pn++] = or),
              (hn[pn++] = ar),
              (hn[pn++] = go),
              (or = n.id),
              (ar = n.overflow),
              (go = r)),
            (r = Df(r, l.children)),
            (r.flags |= 4096));
      return r;
    }
    return d
      ? (Pr(),
        (d = l.fallback),
        (x = r.mode),
        (O = n.child),
        (U = O.sibling),
        (l = rr(O, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = O.subtreeFlags & 65011712),
        U !== null ? (d = rr(U, d)) : ((d = vo(d, x, i, null)), (d.flags |= 2)),
        (d.return = r),
        (l.return = r),
        (l.sibling = d),
        (r.child = l),
        (l = d),
        (d = r.child),
        (x = n.child.memoizedState),
        x === null
          ? (x = Af(i))
          : ((O = x.cachePool),
            O !== null
              ? ((U = mt._currentValue),
                (O = O.parent !== U ? { parent: U, pool: U } : O))
              : (O = jm()),
            (x = { baseLanes: x.baseLanes | i, cachePool: O })),
        (d.memoizedState = x),
        (d.childLanes = Mf(n, b, i)),
        (r.memoizedState = Of),
        l)
      : (zr(r),
        (i = n.child),
        (n = i.sibling),
        (i = rr(i, { mode: "visible", children: l.children })),
        (i.return = r),
        (i.sibling = null),
        n !== null &&
          ((b = r.deletions),
          b === null ? ((r.deletions = [n]), (r.flags |= 16)) : b.push(n)),
        (r.child = i),
        (r.memoizedState = null),
        i);
  }
  function Df(n, r) {
    return (
      (r = Dl({ mode: "visible", children: r }, n.mode)),
      (r.return = n),
      (n.child = r)
    );
  }
  function Dl(n, r) {
    return (
      (n = Wt(22, n, null, r)),
      (n.lanes = 0),
      (n.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      n
    );
  }
  function zf(n, r, i) {
    return (
      Sa(r, n.child, null, i),
      (n = Df(r, r.pendingProps.children)),
      (n.flags |= 2),
      (r.memoizedState = null),
      n
    );
  }
  function Ky(n, r, i) {
    n.lanes |= r;
    var l = n.alternate;
    (l !== null && (l.lanes |= r), Kc(n.return, r, i));
  }
  function Pf(n, r, i, l, d) {
    var m = n.memoizedState;
    m === null
      ? (n.memoizedState = {
          isBackwards: r,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: i,
          tailMode: d,
        })
      : ((m.isBackwards = r),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = l),
        (m.tail = i),
        (m.tailMode = d));
  }
  function Qy(n, r, i) {
    var l = r.pendingProps,
      d = l.revealOrder,
      m = l.tail;
    if ((Ot(n, r, l.children, i), (l = yt.current), (l & 2) !== 0))
      ((l = (l & 1) | 2), (r.flags |= 128));
    else {
      if (n !== null && (n.flags & 128) !== 0)
        e: for (n = r.child; n !== null; ) {
          if (n.tag === 13) n.memoizedState !== null && Ky(n, i, r);
          else if (n.tag === 19) Ky(n, i, r);
          else if (n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
          }
          if (n === r) break e;
          for (; n.sibling === null; ) {
            if (n.return === null || n.return === r) break e;
            n = n.return;
          }
          ((n.sibling.return = n.return), (n = n.sibling));
        }
      l &= 1;
    }
    switch (($(yt, l), d)) {
      case "forwards":
        for (i = r.child, d = null; i !== null; )
          ((n = i.alternate),
            n !== null && Cl(n) === null && (d = i),
            (i = i.sibling));
        ((i = d),
          i === null
            ? ((d = r.child), (r.child = null))
            : ((d = i.sibling), (i.sibling = null)),
          Pf(r, !1, d, i, m));
        break;
      case "backwards":
        for (i = null, d = r.child, r.child = null; d !== null; ) {
          if (((n = d.alternate), n !== null && Cl(n) === null)) {
            r.child = d;
            break;
          }
          ((n = d.sibling), (d.sibling = i), (i = d), (d = n));
        }
        Pf(r, !0, i, null, m);
        break;
      case "together":
        Pf(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function cr(n, r, i) {
    if (
      (n !== null && (r.dependencies = n.dependencies),
      (Ur |= r.lanes),
      (i & r.childLanes) === 0)
    )
      if (n !== null) {
        if ((Ti(n, r, i, !1), (i & r.childLanes) === 0)) return null;
      } else return null;
    if (n !== null && r.child !== n.child) throw Error(a(153));
    if (r.child !== null) {
      for (
        n = r.child, i = rr(n, n.pendingProps), r.child = i, i.return = r;
        n.sibling !== null;

      )
        ((n = n.sibling),
          (i = i.sibling = rr(n, n.pendingProps)),
          (i.return = r));
      i.sibling = null;
    }
    return r.child;
  }
  function jf(n, r) {
    return (n.lanes & r) !== 0
      ? !0
      : ((n = n.dependencies), !!(n !== null && fl(n)));
  }
  function lx(n, r, i) {
    switch (r.tag) {
      case 3:
        (de(r, r.stateNode.containerInfo),
          Cr(r, mt, n.memoizedState.cache),
          Ei());
        break;
      case 27:
      case 5:
        dt(r);
        break;
      case 4:
        de(r, r.stateNode.containerInfo);
        break;
      case 10:
        Cr(r, r.type, r.memoizedProps.value);
        break;
      case 13:
        var l = r.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (zr(r), (r.flags |= 128), null)
            : (i & r.child.childLanes) !== 0
              ? Yy(n, r, i)
              : (zr(r), (n = cr(n, r, i)), n !== null ? n.sibling : null);
        zr(r);
        break;
      case 19:
        var d = (n.flags & 128) !== 0;
        if (
          ((l = (i & r.childLanes) !== 0),
          l || (Ti(n, r, i, !1), (l = (i & r.childLanes) !== 0)),
          d)
        ) {
          if (l) return Qy(n, r, i);
          r.flags |= 128;
        }
        if (
          ((d = r.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          $(yt, yt.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((r.lanes = 0), Vy(n, r, i));
      case 24:
        Cr(r, mt, n.memoizedState.cache);
    }
    return cr(n, r, i);
  }
  function Xy(n, r, i) {
    if (n !== null)
      if (n.memoizedProps !== r.pendingProps) _t = !0;
      else {
        if (!jf(n, i) && (r.flags & 128) === 0) return ((_t = !1), lx(n, r, i));
        _t = (n.flags & 131072) !== 0;
      }
    else ((_t = !1), Ne && (r.flags & 1048576) !== 0 && Cm(r, cl, r.index));
    switch (((r.lanes = 0), r.tag)) {
      case 16:
        e: {
          n = r.pendingProps;
          var l = r.elementType,
            d = l._init;
          if (((l = d(l._payload)), (r.type = l), typeof l == "function"))
            qc(l)
              ? ((n = To(l, n)), (r.tag = 1), (r = Gy(null, r, l, n, i)))
              : ((r.tag = 0), (r = Cf(null, r, l, n, i)));
          else {
            if (l != null) {
              if (((d = l.$$typeof), d === k)) {
                ((r.tag = 11), (r = Iy(null, r, l, n, i)));
                break e;
              } else if (d === Z) {
                ((r.tag = 14), (r = Hy(null, r, l, n, i)));
                break e;
              }
            }
            throw ((r = me(l) || l), Error(a(306, r, "")));
          }
        }
        return r;
      case 0:
        return Cf(n, r, r.type, r.pendingProps, i);
      case 1:
        return ((l = r.type), (d = To(l, r.pendingProps)), Gy(n, r, l, d, i));
      case 3:
        e: {
          if ((de(r, r.stateNode.containerInfo), n === null))
            throw Error(a(387));
          l = r.pendingProps;
          var m = r.memoizedState;
          ((d = m.element), nf(n, r), Pi(r, l, null, i));
          var b = r.memoizedState;
          if (
            ((l = b.cache),
            Cr(r, mt, l),
            l !== m.cache && Qc(r, [mt], i, !0),
            zi(),
            (l = b.element),
            m.isDehydrated)
          )
            if (
              ((m = { element: l, isDehydrated: !1, cache: b.cache }),
              (r.updateQueue.baseState = m),
              (r.memoizedState = m),
              r.flags & 256)
            ) {
              r = Fy(n, r, l, i);
              break e;
            } else if (l !== d) {
              ((d = fn(Error(a(424)), r)), Ri(d), (r = Fy(n, r, l, i)));
              break e;
            } else {
              switch (((n = r.stateNode.containerInfo), n.nodeType)) {
                case 9:
                  n = n.body;
                  break;
                default:
                  n = n.nodeName === "HTML" ? n.ownerDocument.body : n;
              }
              for (
                Je = Cn(n.firstChild),
                  Lt = r,
                  Ne = !0,
                  So = null,
                  jn = !0,
                  i = Ay(r, null, l, i),
                  r.child = i;
                i;

              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
            }
          else {
            if ((Ei(), l === d)) {
              r = cr(n, r, i);
              break e;
            }
            Ot(n, r, l, i);
          }
          r = r.child;
        }
        return r;
      case 26:
        return (
          Ml(n, r),
          n === null
            ? (i = tg(r.type, null, r.pendingProps, null))
              ? (r.memoizedState = i)
              : Ne ||
                ((i = r.type),
                (n = r.pendingProps),
                (l = $l(oe.current).createElement(i)),
                (l[ot] = r),
                (l[Ve] = n),
                Mt(l, i, n),
                wt(l),
                (r.stateNode = l))
            : (r.memoizedState = tg(
                r.type,
                n.memoizedProps,
                r.pendingProps,
                n.memoizedState,
              )),
          null
        );
      case 27:
        return (
          dt(r),
          n === null &&
            Ne &&
            ((l = r.stateNode = Wv(r.type, r.pendingProps, oe.current)),
            (Lt = r),
            (jn = !0),
            (d = Je),
            qr(r.type) ? ((pd = d), (Je = Cn(l.firstChild))) : (Je = d)),
          Ot(n, r, r.pendingProps.children, i),
          Ml(n, r),
          n === null && (r.flags |= 4194304),
          r.child
        );
      case 5:
        return (
          n === null &&
            Ne &&
            ((d = l = Je) &&
              ((l = kx(l, r.type, r.pendingProps, jn)),
              l !== null
                ? ((r.stateNode = l),
                  (Lt = r),
                  (Je = Cn(l.firstChild)),
                  (jn = !1),
                  (d = !0))
                : (d = !1)),
            d || wo(r)),
          dt(r),
          (d = r.type),
          (m = r.pendingProps),
          (b = n !== null ? n.memoizedProps : null),
          (l = m.children),
          cd(d, m) ? (l = null) : b !== null && cd(d, b) && (r.flags |= 32),
          r.memoizedState !== null &&
            ((d = uf(n, r, ex, null, null, i)), (ts._currentValue = d)),
          Ml(n, r),
          Ot(n, r, l, i),
          r.child
        );
      case 6:
        return (
          n === null &&
            Ne &&
            ((n = i = Je) &&
              ((i = Lx(i, r.pendingProps, jn)),
              i !== null
                ? ((r.stateNode = i), (Lt = r), (Je = null), (n = !0))
                : (n = !1)),
            n || wo(r)),
          null
        );
      case 13:
        return Yy(n, r, i);
      case 4:
        return (
          de(r, r.stateNode.containerInfo),
          (l = r.pendingProps),
          n === null ? (r.child = Sa(r, null, l, i)) : Ot(n, r, l, i),
          r.child
        );
      case 11:
        return Iy(n, r, r.type, r.pendingProps, i);
      case 7:
        return (Ot(n, r, r.pendingProps, i), r.child);
      case 8:
        return (Ot(n, r, r.pendingProps.children, i), r.child);
      case 12:
        return (Ot(n, r, r.pendingProps.children, i), r.child);
      case 10:
        return (
          (l = r.pendingProps),
          Cr(r, r.type, l.value),
          Ot(n, r, l.children, i),
          r.child
        );
      case 9:
        return (
          (d = r.type._context),
          (l = r.pendingProps.children),
          xo(r),
          (d = zt(d)),
          (l = l(d)),
          (r.flags |= 1),
          Ot(n, r, l, i),
          r.child
        );
      case 14:
        return Hy(n, r, r.type, r.pendingProps, i);
      case 15:
        return qy(n, r, r.type, r.pendingProps, i);
      case 19:
        return Qy(n, r, i);
      case 31:
        return (
          (l = r.pendingProps),
          (i = r.mode),
          (l = { mode: l.mode, children: l.children }),
          n === null
            ? ((i = Dl(l, i)),
              (i.ref = r.ref),
              (r.child = i),
              (i.return = r),
              (r = i))
            : ((i = rr(n.child, l)),
              (i.ref = r.ref),
              (r.child = i),
              (i.return = r),
              (r = i)),
          r
        );
      case 22:
        return Vy(n, r, i);
      case 24:
        return (
          xo(r),
          (l = zt(mt)),
          n === null
            ? ((d = Jc()),
              d === null &&
                ((d = Ze),
                (m = Xc()),
                (d.pooledCache = m),
                m.refCount++,
                m !== null && (d.pooledCacheLanes |= i),
                (d = m)),
              (r.memoizedState = { parent: l, cache: d }),
              tf(r),
              Cr(r, mt, d))
            : ((n.lanes & i) !== 0 && (nf(n, r), Pi(r, null, null, i), zi()),
              (d = n.memoizedState),
              (m = r.memoizedState),
              d.parent !== l
                ? ((d = { parent: l, cache: l }),
                  (r.memoizedState = d),
                  r.lanes === 0 &&
                    (r.memoizedState = r.updateQueue.baseState = d),
                  Cr(r, mt, l))
                : ((l = m.cache),
                  Cr(r, mt, l),
                  l !== d.cache && Qc(r, [mt], i, !0))),
          Ot(n, r, r.pendingProps.children, i),
          r.child
        );
      case 29:
        throw r.pendingProps;
    }
    throw Error(a(156, r.tag));
  }
  function fr(n) {
    n.flags |= 4;
  }
  function Wy(n, r) {
    if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0)
      n.flags &= -16777217;
    else if (((n.flags |= 16777216), !ig(r))) {
      if (
        ((r = mn.current),
        r !== null &&
          ((De & 4194048) === De
            ? Nn !== null
            : ((De & 62914560) !== De && (De & 536870912) === 0) || r !== Nn))
      )
        throw ((Mi = ef), Nm);
      n.flags |= 8192;
    }
  }
  function zl(n, r) {
    (r !== null && (n.flags |= 4),
      n.flags & 16384 &&
        ((r = n.tag !== 22 ? Gs() : 536870912), (n.lanes |= r), (Ea |= r)));
  }
  function Ii(n, r) {
    if (!Ne)
      switch (n.tailMode) {
        case "hidden":
          r = n.tail;
          for (var i = null; r !== null; )
            (r.alternate !== null && (i = r), (r = r.sibling));
          i === null ? (n.tail = null) : (i.sibling = null);
          break;
        case "collapsed":
          i = n.tail;
          for (var l = null; i !== null; )
            (i.alternate !== null && (l = i), (i = i.sibling));
          l === null
            ? r || n.tail === null
              ? (n.tail = null)
              : (n.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Qe(n) {
    var r = n.alternate !== null && n.alternate.child === n.child,
      i = 0,
      l = 0;
    if (r)
      for (var d = n.child; d !== null; )
        ((i |= d.lanes | d.childLanes),
          (l |= d.subtreeFlags & 65011712),
          (l |= d.flags & 65011712),
          (d.return = n),
          (d = d.sibling));
    else
      for (d = n.child; d !== null; )
        ((i |= d.lanes | d.childLanes),
          (l |= d.subtreeFlags),
          (l |= d.flags),
          (d.return = n),
          (d = d.sibling));
    return ((n.subtreeFlags |= l), (n.childLanes = i), r);
  }
  function ux(n, r, i) {
    var l = r.pendingProps;
    switch ((Gc(r), r.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Qe(r), null);
      case 1:
        return (Qe(r), null);
      case 3:
        return (
          (i = r.stateNode),
          (l = null),
          n !== null && (l = n.memoizedState.cache),
          r.memoizedState.cache !== l && (r.flags |= 2048),
          sr(mt),
          ke(),
          i.pendingContext &&
            ((i.context = i.pendingContext), (i.pendingContext = null)),
          (n === null || n.child === null) &&
            (xi(r)
              ? fr(r)
              : n === null ||
                (n.memoizedState.isDehydrated && (r.flags & 256) === 0) ||
                ((r.flags |= 1024), Mm())),
          Qe(r),
          null
        );
      case 26:
        return (
          (i = r.memoizedState),
          n === null
            ? (fr(r),
              i !== null ? (Qe(r), Wy(r, i)) : (Qe(r), (r.flags &= -16777217)))
            : i
              ? i !== n.memoizedState
                ? (fr(r), Qe(r), Wy(r, i))
                : (Qe(r), (r.flags &= -16777217))
              : (n.memoizedProps !== l && fr(r), Qe(r), (r.flags &= -16777217)),
          null
        );
      case 27:
        (ht(r), (i = oe.current));
        var d = r.type;
        if (n !== null && r.stateNode != null) n.memoizedProps !== l && fr(r);
        else {
          if (!l) {
            if (r.stateNode === null) throw Error(a(166));
            return (Qe(r), null);
          }
          ((n = J.current),
            xi(r) ? Om(r) : ((n = Wv(d, l, i)), (r.stateNode = n), fr(r)));
        }
        return (Qe(r), null);
      case 5:
        if ((ht(r), (i = r.type), n !== null && r.stateNode != null))
          n.memoizedProps !== l && fr(r);
        else {
          if (!l) {
            if (r.stateNode === null) throw Error(a(166));
            return (Qe(r), null);
          }
          if (((n = J.current), xi(r))) Om(r);
          else {
            switch (((d = $l(oe.current)), n)) {
              case 1:
                n = d.createElementNS("http://www.w3.org/2000/svg", i);
                break;
              case 2:
                n = d.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                break;
              default:
                switch (i) {
                  case "svg":
                    n = d.createElementNS("http://www.w3.org/2000/svg", i);
                    break;
                  case "math":
                    n = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i,
                    );
                    break;
                  case "script":
                    ((n = d.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof l.is == "string"
                        ? d.createElement("select", { is: l.is })
                        : d.createElement("select")),
                      l.multiple
                        ? (n.multiple = !0)
                        : l.size && (n.size = l.size));
                    break;
                  default:
                    n =
                      typeof l.is == "string"
                        ? d.createElement(i, { is: l.is })
                        : d.createElement(i);
                }
            }
            ((n[ot] = r), (n[Ve] = l));
            e: for (d = r.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6) n.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ((d.child.return = d), (d = d.child));
                continue;
              }
              if (d === r) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === r) break e;
                d = d.return;
              }
              ((d.sibling.return = d.return), (d = d.sibling));
            }
            r.stateNode = n;
            e: switch ((Mt(n, i, l), i)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!l.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
            n && fr(r);
          }
        }
        return (Qe(r), (r.flags &= -16777217), null);
      case 6:
        if (n && r.stateNode != null) n.memoizedProps !== l && fr(r);
        else {
          if (typeof l != "string" && r.stateNode === null) throw Error(a(166));
          if (((n = oe.current), xi(r))) {
            if (
              ((n = r.stateNode),
              (i = r.memoizedProps),
              (l = null),
              (d = Lt),
              d !== null)
            )
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            ((n[ot] = r),
              (n = !!(
                n.nodeValue === i ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                $v(n.nodeValue, i)
              )),
              n || wo(r));
          } else
            ((n = $l(n).createTextNode(l)), (n[ot] = r), (r.stateNode = n));
        }
        return (Qe(r), null);
      case 13:
        if (
          ((l = r.memoizedState),
          n === null ||
            (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
        ) {
          if (((d = xi(r)), l !== null && l.dehydrated !== null)) {
            if (n === null) {
              if (!d) throw Error(a(318));
              if (
                ((d = r.memoizedState),
                (d = d !== null ? d.dehydrated : null),
                !d)
              )
                throw Error(a(317));
              d[ot] = r;
            } else
              (Ei(),
                (r.flags & 128) === 0 && (r.memoizedState = null),
                (r.flags |= 4));
            (Qe(r), (d = !1));
          } else
            ((d = Mm()),
              n !== null &&
                n.memoizedState !== null &&
                (n.memoizedState.hydrationErrors = d),
              (d = !0));
          if (!d) return r.flags & 256 ? (ur(r), r) : (ur(r), null);
        }
        if ((ur(r), (r.flags & 128) !== 0)) return ((r.lanes = i), r);
        if (
          ((i = l !== null), (n = n !== null && n.memoizedState !== null), i)
        ) {
          ((l = r.child),
            (d = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (d = l.alternate.memoizedState.cachePool.pool));
          var m = null;
          (l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (m = l.memoizedState.cachePool.pool),
            m !== d && (l.flags |= 2048));
        }
        return (
          i !== n && i && (r.child.flags |= 8192),
          zl(r, r.updateQueue),
          Qe(r),
          null
        );
      case 4:
        return (ke(), n === null && ad(r.stateNode.containerInfo), Qe(r), null);
      case 10:
        return (sr(r.type), Qe(r), null);
      case 19:
        if ((ne(yt), (d = r.memoizedState), d === null)) return (Qe(r), null);
        if (((l = (r.flags & 128) !== 0), (m = d.rendering), m === null))
          if (l) Ii(d, !1);
          else {
            if (et !== 0 || (n !== null && (n.flags & 128) !== 0))
              for (n = r.child; n !== null; ) {
                if (((m = Cl(n)), m !== null)) {
                  for (
                    r.flags |= 128,
                      Ii(d, !1),
                      n = m.updateQueue,
                      r.updateQueue = n,
                      zl(r, n),
                      r.subtreeFlags = 0,
                      n = i,
                      i = r.child;
                    i !== null;

                  )
                    (Tm(i, n), (i = i.sibling));
                  return ($(yt, (yt.current & 1) | 2), r.child);
                }
                n = n.sibling;
              }
            d.tail !== null &&
              gt() > Nl &&
              ((r.flags |= 128), (l = !0), Ii(d, !1), (r.lanes = 4194304));
          }
        else {
          if (!l)
            if (((n = Cl(m)), n !== null)) {
              if (
                ((r.flags |= 128),
                (l = !0),
                (n = n.updateQueue),
                (r.updateQueue = n),
                zl(r, n),
                Ii(d, !0),
                d.tail === null &&
                  d.tailMode === "hidden" &&
                  !m.alternate &&
                  !Ne)
              )
                return (Qe(r), null);
            } else
              2 * gt() - d.renderingStartTime > Nl &&
                i !== 536870912 &&
                ((r.flags |= 128), (l = !0), Ii(d, !1), (r.lanes = 4194304));
          d.isBackwards
            ? ((m.sibling = r.child), (r.child = m))
            : ((n = d.last),
              n !== null ? (n.sibling = m) : (r.child = m),
              (d.last = m));
        }
        return d.tail !== null
          ? ((r = d.tail),
            (d.rendering = r),
            (d.tail = r.sibling),
            (d.renderingStartTime = gt()),
            (r.sibling = null),
            (n = yt.current),
            $(yt, l ? (n & 1) | 2 : n & 1),
            r)
          : (Qe(r), null);
      case 22:
      case 23:
        return (
          ur(r),
          sf(),
          (l = r.memoizedState !== null),
          n !== null
            ? (n.memoizedState !== null) !== l && (r.flags |= 8192)
            : l && (r.flags |= 8192),
          l
            ? (i & 536870912) !== 0 &&
              (r.flags & 128) === 0 &&
              (Qe(r), r.subtreeFlags & 6 && (r.flags |= 8192))
            : Qe(r),
          (i = r.updateQueue),
          i !== null && zl(r, i.retryQueue),
          (i = null),
          n !== null &&
            n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (i = n.memoizedState.cachePool.pool),
          (l = null),
          r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (l = r.memoizedState.cachePool.pool),
          l !== i && (r.flags |= 2048),
          n !== null && ne(Eo),
          null
        );
      case 24:
        return (
          (i = null),
          n !== null && (i = n.memoizedState.cache),
          r.memoizedState.cache !== i && (r.flags |= 2048),
          sr(mt),
          Qe(r),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, r.tag));
  }
  function cx(n, r) {
    switch ((Gc(r), r.tag)) {
      case 1:
        return (
          (n = r.flags),
          n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
        );
      case 3:
        return (
          sr(mt),
          ke(),
          (n = r.flags),
          (n & 65536) !== 0 && (n & 128) === 0
            ? ((r.flags = (n & -65537) | 128), r)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (ht(r), null);
      case 13:
        if (
          (ur(r), (n = r.memoizedState), n !== null && n.dehydrated !== null)
        ) {
          if (r.alternate === null) throw Error(a(340));
          Ei();
        }
        return (
          (n = r.flags),
          n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
        );
      case 19:
        return (ne(yt), null);
      case 4:
        return (ke(), null);
      case 10:
        return (sr(r.type), null);
      case 22:
      case 23:
        return (
          ur(r),
          sf(),
          n !== null && ne(Eo),
          (n = r.flags),
          n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
        );
      case 24:
        return (sr(mt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jy(n, r) {
    switch ((Gc(r), r.tag)) {
      case 3:
        (sr(mt), ke());
        break;
      case 26:
      case 27:
      case 5:
        ht(r);
        break;
      case 4:
        ke();
        break;
      case 13:
        ur(r);
        break;
      case 19:
        ne(yt);
        break;
      case 10:
        sr(r.type);
        break;
      case 22:
      case 23:
        (ur(r), sf(), n !== null && ne(Eo));
        break;
      case 24:
        sr(mt);
    }
  }
  function Hi(n, r) {
    try {
      var i = r.updateQueue,
        l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var d = l.next;
        i = d;
        do {
          if ((i.tag & n) === n) {
            l = void 0;
            var m = i.create,
              b = i.inst;
            ((l = m()), (b.destroy = l));
          }
          i = i.next;
        } while (i !== d);
      }
    } catch (x) {
      qe(r, r.return, x);
    }
  }
  function jr(n, r, i) {
    try {
      var l = r.updateQueue,
        d = l !== null ? l.lastEffect : null;
      if (d !== null) {
        var m = d.next;
        l = m;
        do {
          if ((l.tag & n) === n) {
            var b = l.inst,
              x = b.destroy;
            if (x !== void 0) {
              ((b.destroy = void 0), (d = r));
              var O = i,
                U = x;
              try {
                U();
              } catch (Y) {
                qe(d, O, Y);
              }
            }
          }
          l = l.next;
        } while (l !== m);
      }
    } catch (Y) {
      qe(r, r.return, Y);
    }
  }
  function ev(n) {
    var r = n.updateQueue;
    if (r !== null) {
      var i = n.stateNode;
      try {
        Hm(r, i);
      } catch (l) {
        qe(n, n.return, l);
      }
    }
  }
  function tv(n, r, i) {
    ((i.props = To(n.type, n.memoizedProps)), (i.state = n.memoizedState));
    try {
      i.componentWillUnmount();
    } catch (l) {
      qe(n, r, l);
    }
  }
  function qi(n, r) {
    try {
      var i = n.ref;
      if (i !== null) {
        switch (n.tag) {
          case 26:
          case 27:
          case 5:
            var l = n.stateNode;
            break;
          case 30:
            l = n.stateNode;
            break;
          default:
            l = n.stateNode;
        }
        typeof i == "function" ? (n.refCleanup = i(l)) : (i.current = l);
      }
    } catch (d) {
      qe(n, r, d);
    }
  }
  function kn(n, r) {
    var i = n.ref,
      l = n.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          qe(n, r, d);
        } finally {
          ((n.refCleanup = null),
            (n = n.alternate),
            n != null && (n.refCleanup = null));
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (d) {
          qe(n, r, d);
        }
      else i.current = null;
  }
  function nv(n) {
    var r = n.type,
      i = n.memoizedProps,
      l = n.stateNode;
    try {
      e: switch (r) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? (l.src = i.src) : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (d) {
      qe(n, n.return, d);
    }
  }
  function Nf(n, r, i) {
    try {
      var l = n.stateNode;
      (Dx(l, n.type, i, r), (l[Ve] = r));
    } catch (d) {
      qe(n, n.return, d);
    }
  }
  function rv(n) {
    return (
      n.tag === 5 ||
      n.tag === 3 ||
      n.tag === 26 ||
      (n.tag === 27 && qr(n.type)) ||
      n.tag === 4
    );
  }
  function kf(n) {
    e: for (;;) {
      for (; n.sibling === null; ) {
        if (n.return === null || rv(n.return)) return null;
        n = n.return;
      }
      for (
        n.sibling.return = n.return, n = n.sibling;
        n.tag !== 5 && n.tag !== 6 && n.tag !== 18;

      ) {
        if (
          (n.tag === 27 && qr(n.type)) ||
          n.flags & 2 ||
          n.child === null ||
          n.tag === 4
        )
          continue e;
        ((n.child.return = n), (n = n.child));
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Lf(n, r, i) {
    var l = n.tag;
    if (l === 5 || l === 6)
      ((n = n.stateNode),
        r
          ? (i.nodeType === 9
              ? i.body
              : i.nodeName === "HTML"
                ? i.ownerDocument.body
                : i
            ).insertBefore(n, r)
          : ((r =
              i.nodeType === 9
                ? i.body
                : i.nodeName === "HTML"
                  ? i.ownerDocument.body
                  : i),
            r.appendChild(n),
            (i = i._reactRootContainer),
            i != null || r.onclick !== null || (r.onclick = Zl)));
    else if (
      l !== 4 &&
      (l === 27 && qr(n.type) && ((i = n.stateNode), (r = null)),
      (n = n.child),
      n !== null)
    )
      for (Lf(n, r, i), n = n.sibling; n !== null; )
        (Lf(n, r, i), (n = n.sibling));
  }
  function Pl(n, r, i) {
    var l = n.tag;
    if (l === 5 || l === 6)
      ((n = n.stateNode), r ? i.insertBefore(n, r) : i.appendChild(n));
    else if (
      l !== 4 &&
      (l === 27 && qr(n.type) && (i = n.stateNode), (n = n.child), n !== null)
    )
      for (Pl(n, r, i), n = n.sibling; n !== null; )
        (Pl(n, r, i), (n = n.sibling));
  }
  function ov(n) {
    var r = n.stateNode,
      i = n.memoizedProps;
    try {
      for (var l = n.type, d = r.attributes; d.length; )
        r.removeAttributeNode(d[0]);
      (Mt(r, l, i), (r[ot] = n), (r[Ve] = i));
    } catch (m) {
      qe(n, n.return, m);
    }
  }
  var dr = !1,
    it = !1,
    Uf = !1,
    av = typeof WeakSet == "function" ? WeakSet : Set,
    xt = null;
  function fx(n, r) {
    if (((n = n.containerInfo), (ld = Xl), (n = ym(n)), Nc(n))) {
      if ("selectionStart" in n)
        var i = { start: n.selectionStart, end: n.selectionEnd };
      else
        e: {
          i = ((i = n.ownerDocument) && i.defaultView) || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var d = l.anchorOffset,
              m = l.focusNode;
            l = l.focusOffset;
            try {
              (i.nodeType, m.nodeType);
            } catch {
              i = null;
              break e;
            }
            var b = 0,
              x = -1,
              O = -1,
              U = 0,
              Y = 0,
              X = n,
              I = null;
            t: for (;;) {
              for (
                var V;
                X !== i || (d !== 0 && X.nodeType !== 3) || (x = b + d),
                  X !== m || (l !== 0 && X.nodeType !== 3) || (O = b + l),
                  X.nodeType === 3 && (b += X.nodeValue.length),
                  (V = X.firstChild) !== null;

              )
                ((I = X), (X = V));
              for (;;) {
                if (X === n) break t;
                if (
                  (I === i && ++U === d && (x = b),
                  I === m && ++Y === l && (O = b),
                  (V = X.nextSibling) !== null)
                )
                  break;
                ((X = I), (I = X.parentNode));
              }
              X = V;
            }
            i = x === -1 || O === -1 ? null : { start: x, end: O };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (
      ud = { focusedElem: n, selectionRange: i }, Xl = !1, xt = r;
      xt !== null;

    )
      if (
        ((r = xt), (n = r.child), (r.subtreeFlags & 1024) !== 0 && n !== null)
      )
        ((n.return = r), (xt = n));
      else
        for (; xt !== null; ) {
          switch (((r = xt), (m = r.alternate), (n = r.flags), r.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((n & 1024) !== 0 && m !== null) {
                ((n = void 0),
                  (i = r),
                  (d = m.memoizedProps),
                  (m = m.memoizedState),
                  (l = i.stateNode));
                try {
                  var Se = To(i.type, d, i.elementType === i.type);
                  ((n = l.getSnapshotBeforeUpdate(Se, m)),
                    (l.__reactInternalSnapshotBeforeUpdate = n));
                } catch (ge) {
                  qe(i, i.return, ge);
                }
              }
              break;
            case 3:
              if ((n & 1024) !== 0) {
                if (
                  ((n = r.stateNode.containerInfo), (i = n.nodeType), i === 9)
                )
                  dd(n);
                else if (i === 1)
                  switch (n.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      dd(n);
                      break;
                    default:
                      n.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((n & 1024) !== 0) throw Error(a(163));
          }
          if (((n = r.sibling), n !== null)) {
            ((n.return = r.return), (xt = n));
            break;
          }
          xt = r.return;
        }
  }
  function iv(n, r, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Nr(n, i), l & 4 && Hi(5, i));
        break;
      case 1:
        if ((Nr(n, i), l & 4))
          if (((n = i.stateNode), r === null))
            try {
              n.componentDidMount();
            } catch (b) {
              qe(i, i.return, b);
            }
          else {
            var d = To(i.type, r.memoizedProps);
            r = r.memoizedState;
            try {
              n.componentDidUpdate(d, r, n.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              qe(i, i.return, b);
            }
          }
        (l & 64 && ev(i), l & 512 && qi(i, i.return));
        break;
      case 3:
        if ((Nr(n, i), l & 64 && ((n = i.updateQueue), n !== null))) {
          if (((r = null), i.child !== null))
            switch (i.child.tag) {
              case 27:
              case 5:
                r = i.child.stateNode;
                break;
              case 1:
                r = i.child.stateNode;
            }
          try {
            Hm(n, r);
          } catch (b) {
            qe(i, i.return, b);
          }
        }
        break;
      case 27:
        r === null && l & 4 && ov(i);
      case 26:
      case 5:
        (Nr(n, i), r === null && l & 4 && nv(i), l & 512 && qi(i, i.return));
        break;
      case 12:
        Nr(n, i);
        break;
      case 13:
        (Nr(n, i),
          l & 4 && uv(n, i),
          l & 64 &&
            ((n = i.memoizedState),
            n !== null &&
              ((n = n.dehydrated),
              n !== null && ((i = Sx.bind(null, i)), Ux(n, i)))));
        break;
      case 22:
        if (((l = i.memoizedState !== null || dr), !l)) {
          ((r = (r !== null && r.memoizedState !== null) || it), (d = dr));
          var m = it;
          ((dr = l),
            (it = r) && !m ? kr(n, i, (i.subtreeFlags & 8772) !== 0) : Nr(n, i),
            (dr = d),
            (it = m));
        }
        break;
      case 30:
        break;
      default:
        Nr(n, i);
    }
  }
  function sv(n) {
    var r = n.alternate;
    (r !== null && ((n.alternate = null), sv(r)),
      (n.child = null),
      (n.deletions = null),
      (n.sibling = null),
      n.tag === 5 && ((r = n.stateNode), r !== null && yc(r)),
      (n.stateNode = null),
      (n.return = null),
      (n.dependencies = null),
      (n.memoizedProps = null),
      (n.memoizedState = null),
      (n.pendingProps = null),
      (n.stateNode = null),
      (n.updateQueue = null));
  }
  var Fe = null,
    $t = !1;
  function hr(n, r, i) {
    for (i = i.child; i !== null; ) (lv(n, r, i), (i = i.sibling));
  }
  function lv(n, r, i) {
    if (kt && typeof kt.onCommitFiberUnmount == "function")
      try {
        kt.onCommitFiberUnmount(Qt, i);
      } catch {}
    switch (i.tag) {
      case 26:
        (it || kn(i, r),
          hr(n, r, i),
          i.memoizedState
            ? i.memoizedState.count--
            : i.stateNode && ((i = i.stateNode), i.parentNode.removeChild(i)));
        break;
      case 27:
        it || kn(i, r);
        var l = Fe,
          d = $t;
        (qr(i.type) && ((Fe = i.stateNode), ($t = !1)),
          hr(n, r, i),
          Xi(i.stateNode),
          (Fe = l),
          ($t = d));
        break;
      case 5:
        it || kn(i, r);
      case 6:
        if (
          ((l = Fe),
          (d = $t),
          (Fe = null),
          hr(n, r, i),
          (Fe = l),
          ($t = d),
          Fe !== null)
        )
          if ($t)
            try {
              (Fe.nodeType === 9
                ? Fe.body
                : Fe.nodeName === "HTML"
                  ? Fe.ownerDocument.body
                  : Fe
              ).removeChild(i.stateNode);
            } catch (m) {
              qe(i, r, m);
            }
          else
            try {
              Fe.removeChild(i.stateNode);
            } catch (m) {
              qe(i, r, m);
            }
        break;
      case 18:
        Fe !== null &&
          ($t
            ? ((n = Fe),
              Qv(
                n.nodeType === 9
                  ? n.body
                  : n.nodeName === "HTML"
                    ? n.ownerDocument.body
                    : n,
                i.stateNode,
              ),
              as(n))
            : Qv(Fe, i.stateNode));
        break;
      case 4:
        ((l = Fe),
          (d = $t),
          (Fe = i.stateNode.containerInfo),
          ($t = !0),
          hr(n, r, i),
          (Fe = l),
          ($t = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (it || jr(2, i, r), it || jr(4, i, r), hr(n, r, i));
        break;
      case 1:
        (it ||
          (kn(i, r),
          (l = i.stateNode),
          typeof l.componentWillUnmount == "function" && tv(i, r, l)),
          hr(n, r, i));
        break;
      case 21:
        hr(n, r, i);
        break;
      case 22:
        ((it = (l = it) || i.memoizedState !== null), hr(n, r, i), (it = l));
        break;
      default:
        hr(n, r, i);
    }
  }
  function uv(n, r) {
    if (
      r.memoizedState === null &&
      ((n = r.alternate),
      n !== null &&
        ((n = n.memoizedState), n !== null && ((n = n.dehydrated), n !== null)))
    )
      try {
        as(n);
      } catch (i) {
        qe(r, r.return, i);
      }
  }
  function dx(n) {
    switch (n.tag) {
      case 13:
      case 19:
        var r = n.stateNode;
        return (r === null && (r = n.stateNode = new av()), r);
      case 22:
        return (
          (n = n.stateNode),
          (r = n._retryCache),
          r === null && (r = n._retryCache = new av()),
          r
        );
      default:
        throw Error(a(435, n.tag));
    }
  }
  function Bf(n, r) {
    var i = dx(n);
    r.forEach(function (l) {
      var d = wx.bind(null, n, l);
      i.has(l) || (i.add(l), l.then(d, d));
    });
  }
  function Jt(n, r) {
    var i = r.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var d = i[l],
          m = n,
          b = r,
          x = b;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (qr(x.type)) {
                ((Fe = x.stateNode), ($t = !1));
                break e;
              }
              break;
            case 5:
              ((Fe = x.stateNode), ($t = !1));
              break e;
            case 3:
            case 4:
              ((Fe = x.stateNode.containerInfo), ($t = !0));
              break e;
          }
          x = x.return;
        }
        if (Fe === null) throw Error(a(160));
        (lv(m, b, d),
          (Fe = null),
          ($t = !1),
          (m = d.alternate),
          m !== null && (m.return = null),
          (d.return = null));
      }
    if (r.subtreeFlags & 13878)
      for (r = r.child; r !== null; ) (cv(r, n), (r = r.sibling));
  }
  var Tn = null;
  function cv(n, r) {
    var i = n.alternate,
      l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Jt(r, n),
          en(n),
          l & 4 && (jr(3, n, n.return), Hi(3, n), jr(5, n, n.return)));
        break;
      case 1:
        (Jt(r, n),
          en(n),
          l & 512 && (it || i === null || kn(i, i.return)),
          l & 64 &&
            dr &&
            ((n = n.updateQueue),
            n !== null &&
              ((l = n.callbacks),
              l !== null &&
                ((i = n.shared.hiddenCallbacks),
                (n.shared.hiddenCallbacks = i === null ? l : i.concat(l))))));
        break;
      case 26:
        var d = Tn;
        if (
          (Jt(r, n),
          en(n),
          l & 512 && (it || i === null || kn(i, i.return)),
          l & 4)
        ) {
          var m = i !== null ? i.memoizedState : null;
          if (((l = n.memoizedState), i === null))
            if (l === null)
              if (n.stateNode === null) {
                e: {
                  ((l = n.type),
                    (i = n.memoizedProps),
                    (d = d.ownerDocument || d));
                  t: switch (l) {
                    case "title":
                      ((m = d.getElementsByTagName("title")[0]),
                        (!m ||
                          m[di] ||
                          m[ot] ||
                          m.namespaceURI === "http://www.w3.org/2000/svg" ||
                          m.hasAttribute("itemprop")) &&
                          ((m = d.createElement(l)),
                          d.head.insertBefore(
                            m,
                            d.querySelector("head > title"),
                          )),
                        Mt(m, l, i),
                        (m[ot] = n),
                        wt(m),
                        (l = m));
                      break e;
                    case "link":
                      var b = og("link", "href", d).get(l + (i.href || ""));
                      if (b) {
                        for (var x = 0; x < b.length; x++)
                          if (
                            ((m = b[x]),
                            m.getAttribute("href") ===
                              (i.href == null || i.href === ""
                                ? null
                                : i.href) &&
                              m.getAttribute("rel") ===
                                (i.rel == null ? null : i.rel) &&
                              m.getAttribute("title") ===
                                (i.title == null ? null : i.title) &&
                              m.getAttribute("crossorigin") ===
                                (i.crossOrigin == null ? null : i.crossOrigin))
                          ) {
                            b.splice(x, 1);
                            break t;
                          }
                      }
                      ((m = d.createElement(l)),
                        Mt(m, l, i),
                        d.head.appendChild(m));
                      break;
                    case "meta":
                      if (
                        (b = og("meta", "content", d).get(
                          l + (i.content || ""),
                        ))
                      ) {
                        for (x = 0; x < b.length; x++)
                          if (
                            ((m = b[x]),
                            m.getAttribute("content") ===
                              (i.content == null ? null : "" + i.content) &&
                              m.getAttribute("name") ===
                                (i.name == null ? null : i.name) &&
                              m.getAttribute("property") ===
                                (i.property == null ? null : i.property) &&
                              m.getAttribute("http-equiv") ===
                                (i.httpEquiv == null ? null : i.httpEquiv) &&
                              m.getAttribute("charset") ===
                                (i.charSet == null ? null : i.charSet))
                          ) {
                            b.splice(x, 1);
                            break t;
                          }
                      }
                      ((m = d.createElement(l)),
                        Mt(m, l, i),
                        d.head.appendChild(m));
                      break;
                    default:
                      throw Error(a(468, l));
                  }
                  ((m[ot] = n), wt(m), (l = m));
                }
                n.stateNode = l;
              } else ag(d, n.type, n.stateNode);
            else n.stateNode = rg(d, l, n.memoizedProps);
          else
            m !== l
              ? (m === null
                  ? i.stateNode !== null &&
                    ((i = i.stateNode), i.parentNode.removeChild(i))
                  : m.count--,
                l === null
                  ? ag(d, n.type, n.stateNode)
                  : rg(d, l, n.memoizedProps))
              : l === null &&
                n.stateNode !== null &&
                Nf(n, n.memoizedProps, i.memoizedProps);
        }
        break;
      case 27:
        (Jt(r, n),
          en(n),
          l & 512 && (it || i === null || kn(i, i.return)),
          i !== null && l & 4 && Nf(n, n.memoizedProps, i.memoizedProps));
        break;
      case 5:
        if (
          (Jt(r, n),
          en(n),
          l & 512 && (it || i === null || kn(i, i.return)),
          n.flags & 32)
        ) {
          d = n.stateNode;
          try {
            na(d, "");
          } catch (V) {
            qe(n, n.return, V);
          }
        }
        (l & 4 &&
          n.stateNode != null &&
          ((d = n.memoizedProps), Nf(n, d, i !== null ? i.memoizedProps : d)),
          l & 1024 && (Uf = !0));
        break;
      case 6:
        if ((Jt(r, n), en(n), l & 4)) {
          if (n.stateNode === null) throw Error(a(162));
          ((l = n.memoizedProps), (i = n.stateNode));
          try {
            i.nodeValue = l;
          } catch (V) {
            qe(n, n.return, V);
          }
        }
        break;
      case 3:
        if (
          ((Yl = null),
          (d = Tn),
          (Tn = Gl(r.containerInfo)),
          Jt(r, n),
          (Tn = d),
          en(n),
          l & 4 && i !== null && i.memoizedState.isDehydrated)
        )
          try {
            as(r.containerInfo);
          } catch (V) {
            qe(n, n.return, V);
          }
        Uf && ((Uf = !1), fv(n));
        break;
      case 4:
        ((l = Tn),
          (Tn = Gl(n.stateNode.containerInfo)),
          Jt(r, n),
          en(n),
          (Tn = l));
        break;
      case 12:
        (Jt(r, n), en(n));
        break;
      case 13:
        (Jt(r, n),
          en(n),
          n.child.flags & 8192 &&
            (n.memoizedState !== null) !=
              (i !== null && i.memoizedState !== null) &&
            ($f = gt()),
          l & 4 &&
            ((l = n.updateQueue),
            l !== null && ((n.updateQueue = null), Bf(n, l))));
        break;
      case 22:
        d = n.memoizedState !== null;
        var O = i !== null && i.memoizedState !== null,
          U = dr,
          Y = it;
        if (
          ((dr = U || d),
          (it = Y || O),
          Jt(r, n),
          (it = Y),
          (dr = U),
          en(n),
          l & 8192)
        )
          e: for (
            r = n.stateNode,
              r._visibility = d ? r._visibility & -2 : r._visibility | 1,
              d && (i === null || O || dr || it || Co(n)),
              i = null,
              r = n;
            ;

          ) {
            if (r.tag === 5 || r.tag === 26) {
              if (i === null) {
                O = i = r;
                try {
                  if (((m = O.stateNode), d))
                    ((b = m.style),
                      typeof b.setProperty == "function"
                        ? b.setProperty("display", "none", "important")
                        : (b.display = "none"));
                  else {
                    x = O.stateNode;
                    var X = O.memoizedProps.style,
                      I =
                        X != null && X.hasOwnProperty("display")
                          ? X.display
                          : null;
                    x.style.display =
                      I == null || typeof I == "boolean" ? "" : ("" + I).trim();
                  }
                } catch (V) {
                  qe(O, O.return, V);
                }
              }
            } else if (r.tag === 6) {
              if (i === null) {
                O = r;
                try {
                  O.stateNode.nodeValue = d ? "" : O.memoizedProps;
                } catch (V) {
                  qe(O, O.return, V);
                }
              }
            } else if (
              ((r.tag !== 22 && r.tag !== 23) ||
                r.memoizedState === null ||
                r === n) &&
              r.child !== null
            ) {
              ((r.child.return = r), (r = r.child));
              continue;
            }
            if (r === n) break e;
            for (; r.sibling === null; ) {
              if (r.return === null || r.return === n) break e;
              (i === r && (i = null), (r = r.return));
            }
            (i === r && (i = null),
              (r.sibling.return = r.return),
              (r = r.sibling));
          }
        l & 4 &&
          ((l = n.updateQueue),
          l !== null &&
            ((i = l.retryQueue),
            i !== null && ((l.retryQueue = null), Bf(n, i))));
        break;
      case 19:
        (Jt(r, n),
          en(n),
          l & 4 &&
            ((l = n.updateQueue),
            l !== null && ((n.updateQueue = null), Bf(n, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Jt(r, n), en(n));
    }
  }
  function en(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        for (var i, l = n.return; l !== null; ) {
          if (rv(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(a(160));
        switch (i.tag) {
          case 27:
            var d = i.stateNode,
              m = kf(n);
            Pl(n, m, d);
            break;
          case 5:
            var b = i.stateNode;
            i.flags & 32 && (na(b, ""), (i.flags &= -33));
            var x = kf(n);
            Pl(n, x, b);
            break;
          case 3:
          case 4:
            var O = i.stateNode.containerInfo,
              U = kf(n);
            Lf(n, U, O);
            break;
          default:
            throw Error(a(161));
        }
      } catch (Y) {
        qe(n, n.return, Y);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function fv(n) {
    if (n.subtreeFlags & 1024)
      for (n = n.child; n !== null; ) {
        var r = n;
        (fv(r),
          r.tag === 5 && r.flags & 1024 && r.stateNode.reset(),
          (n = n.sibling));
      }
  }
  function Nr(n, r) {
    if (r.subtreeFlags & 8772)
      for (r = r.child; r !== null; ) (iv(n, r.alternate, r), (r = r.sibling));
  }
  function Co(n) {
    for (n = n.child; n !== null; ) {
      var r = n;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (jr(4, r, r.return), Co(r));
          break;
        case 1:
          kn(r, r.return);
          var i = r.stateNode;
          (typeof i.componentWillUnmount == "function" && tv(r, r.return, i),
            Co(r));
          break;
        case 27:
          Xi(r.stateNode);
        case 26:
        case 5:
          (kn(r, r.return), Co(r));
          break;
        case 22:
          r.memoizedState === null && Co(r);
          break;
        case 30:
          Co(r);
          break;
        default:
          Co(r);
      }
      n = n.sibling;
    }
  }
  function kr(n, r, i) {
    for (i = i && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
      var l = r.alternate,
        d = n,
        m = r,
        b = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (kr(d, m, i), Hi(4, m));
          break;
        case 1:
          if (
            (kr(d, m, i),
            (l = m),
            (d = l.stateNode),
            typeof d.componentDidMount == "function")
          )
            try {
              d.componentDidMount();
            } catch (U) {
              qe(l, l.return, U);
            }
          if (((l = m), (d = l.updateQueue), d !== null)) {
            var x = l.stateNode;
            try {
              var O = d.shared.hiddenCallbacks;
              if (O !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < O.length; d++)
                  Im(O[d], x);
            } catch (U) {
              qe(l, l.return, U);
            }
          }
          (i && b & 64 && ev(m), qi(m, m.return));
          break;
        case 27:
          ov(m);
        case 26:
        case 5:
          (kr(d, m, i), i && l === null && b & 4 && nv(m), qi(m, m.return));
          break;
        case 12:
          kr(d, m, i);
          break;
        case 13:
          (kr(d, m, i), i && b & 4 && uv(d, m));
          break;
        case 22:
          (m.memoizedState === null && kr(d, m, i), qi(m, m.return));
          break;
        case 30:
          break;
        default:
          kr(d, m, i);
      }
      r = r.sibling;
    }
  }
  function If(n, r) {
    var i = null;
    (n !== null &&
      n.memoizedState !== null &&
      n.memoizedState.cachePool !== null &&
      (i = n.memoizedState.cachePool.pool),
      (n = null),
      r.memoizedState !== null &&
        r.memoizedState.cachePool !== null &&
        (n = r.memoizedState.cachePool.pool),
      n !== i && (n != null && n.refCount++, i != null && Ci(i)));
  }
  function Hf(n, r) {
    ((n = null),
      r.alternate !== null && (n = r.alternate.memoizedState.cache),
      (r = r.memoizedState.cache),
      r !== n && (r.refCount++, n != null && Ci(n)));
  }
  function Ln(n, r, i, l) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) (dv(n, r, i, l), (r = r.sibling));
  }
  function dv(n, r, i, l) {
    var d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (Ln(n, r, i, l), d & 2048 && Hi(9, r));
        break;
      case 1:
        Ln(n, r, i, l);
        break;
      case 3:
        (Ln(n, r, i, l),
          d & 2048 &&
            ((n = null),
            r.alternate !== null && (n = r.alternate.memoizedState.cache),
            (r = r.memoizedState.cache),
            r !== n && (r.refCount++, n != null && Ci(n))));
        break;
      case 12:
        if (d & 2048) {
          (Ln(n, r, i, l), (n = r.stateNode));
          try {
            var m = r.memoizedProps,
              b = m.id,
              x = m.onPostCommit;
            typeof x == "function" &&
              x(
                b,
                r.alternate === null ? "mount" : "update",
                n.passiveEffectDuration,
                -0,
              );
          } catch (O) {
            qe(r, r.return, O);
          }
        } else Ln(n, r, i, l);
        break;
      case 13:
        Ln(n, r, i, l);
        break;
      case 23:
        break;
      case 22:
        ((m = r.stateNode),
          (b = r.alternate),
          r.memoizedState !== null
            ? m._visibility & 2
              ? Ln(n, r, i, l)
              : Vi(n, r)
            : m._visibility & 2
              ? Ln(n, r, i, l)
              : ((m._visibility |= 2),
                wa(n, r, i, l, (r.subtreeFlags & 10256) !== 0)),
          d & 2048 && If(b, r));
        break;
      case 24:
        (Ln(n, r, i, l), d & 2048 && Hf(r.alternate, r));
        break;
      default:
        Ln(n, r, i, l);
    }
  }
  function wa(n, r, i, l, d) {
    for (d = d && (r.subtreeFlags & 10256) !== 0, r = r.child; r !== null; ) {
      var m = n,
        b = r,
        x = i,
        O = l,
        U = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          (wa(m, b, x, O, d), Hi(8, b));
          break;
        case 23:
          break;
        case 22:
          var Y = b.stateNode;
          (b.memoizedState !== null
            ? Y._visibility & 2
              ? wa(m, b, x, O, d)
              : Vi(m, b)
            : ((Y._visibility |= 2), wa(m, b, x, O, d)),
            d && U & 2048 && If(b.alternate, b));
          break;
        case 24:
          (wa(m, b, x, O, d), d && U & 2048 && Hf(b.alternate, b));
          break;
        default:
          wa(m, b, x, O, d);
      }
      r = r.sibling;
    }
  }
  function Vi(n, r) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) {
        var i = n,
          l = r,
          d = l.flags;
        switch (l.tag) {
          case 22:
            (Vi(i, l), d & 2048 && If(l.alternate, l));
            break;
          case 24:
            (Vi(i, l), d & 2048 && Hf(l.alternate, l));
            break;
          default:
            Vi(i, l);
        }
        r = r.sibling;
      }
  }
  var Zi = 8192;
  function _a(n) {
    if (n.subtreeFlags & Zi)
      for (n = n.child; n !== null; ) (hv(n), (n = n.sibling));
  }
  function hv(n) {
    switch (n.tag) {
      case 26:
        (_a(n),
          n.flags & Zi &&
            n.memoizedState !== null &&
            Xx(Tn, n.memoizedState, n.memoizedProps));
        break;
      case 5:
        _a(n);
        break;
      case 3:
      case 4:
        var r = Tn;
        ((Tn = Gl(n.stateNode.containerInfo)), _a(n), (Tn = r));
        break;
      case 22:
        n.memoizedState === null &&
          ((r = n.alternate),
          r !== null && r.memoizedState !== null
            ? ((r = Zi), (Zi = 16777216), _a(n), (Zi = r))
            : _a(n));
        break;
      default:
        _a(n);
    }
  }
  function pv(n) {
    var r = n.alternate;
    if (r !== null && ((n = r.child), n !== null)) {
      r.child = null;
      do ((r = n.sibling), (n.sibling = null), (n = r));
      while (n !== null);
    }
  }
  function $i(n) {
    var r = n.deletions;
    if ((n.flags & 16) !== 0) {
      if (r !== null)
        for (var i = 0; i < r.length; i++) {
          var l = r[i];
          ((xt = l), yv(l, n));
        }
      pv(n);
    }
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) (mv(n), (n = n.sibling));
  }
  function mv(n) {
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ($i(n), n.flags & 2048 && jr(9, n, n.return));
        break;
      case 3:
        $i(n);
        break;
      case 12:
        $i(n);
        break;
      case 22:
        var r = n.stateNode;
        n.memoizedState !== null &&
        r._visibility & 2 &&
        (n.return === null || n.return.tag !== 13)
          ? ((r._visibility &= -3), jl(n))
          : $i(n);
        break;
      default:
        $i(n);
    }
  }
  function jl(n) {
    var r = n.deletions;
    if ((n.flags & 16) !== 0) {
      if (r !== null)
        for (var i = 0; i < r.length; i++) {
          var l = r[i];
          ((xt = l), yv(l, n));
        }
      pv(n);
    }
    for (n = n.child; n !== null; ) {
      switch (((r = n), r.tag)) {
        case 0:
        case 11:
        case 15:
          (jr(8, r, r.return), jl(r));
          break;
        case 22:
          ((i = r.stateNode),
            i._visibility & 2 && ((i._visibility &= -3), jl(r)));
          break;
        default:
          jl(r);
      }
      n = n.sibling;
    }
  }
  function yv(n, r) {
    for (; xt !== null; ) {
      var i = xt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          jr(8, i, r);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ci(i.memoizedState.cache);
      }
      if (((l = i.child), l !== null)) ((l.return = i), (xt = l));
      else
        e: for (i = n; xt !== null; ) {
          l = xt;
          var d = l.sibling,
            m = l.return;
          if ((sv(l), l === i)) {
            xt = null;
            break e;
          }
          if (d !== null) {
            ((d.return = m), (xt = d));
            break e;
          }
          xt = m;
        }
    }
  }
  var hx = {
      getCacheForType: function (n) {
        var r = zt(mt),
          i = r.data.get(n);
        return (i === void 0 && ((i = n()), r.data.set(n, i)), i);
      },
    },
    px = typeof WeakMap == "function" ? WeakMap : Map,
    Le = 0,
    Ze = null,
    Ce = null,
    De = 0,
    Ue = 0,
    tn = null,
    Lr = !1,
    xa = !1,
    qf = !1,
    pr = 0,
    et = 0,
    Ur = 0,
    Oo = 0,
    Vf = 0,
    yn = 0,
    Ea = 0,
    Gi = null,
    Gt = null,
    Zf = !1,
    $f = 0,
    Nl = 1 / 0,
    kl = null,
    Br = null,
    At = 0,
    Ir = null,
    Ra = null,
    Ta = 0,
    Gf = 0,
    Ff = null,
    vv = null,
    Fi = 0,
    Yf = null;
  function nn() {
    if ((Le & 2) !== 0 && De !== 0) return De & -De;
    if (z.T !== null) {
      var n = ha;
      return n !== 0 ? n : td();
    }
    return fo();
  }
  function gv() {
    yn === 0 && (yn = (De & 536870912) === 0 || Ne ? En() : 536870912);
    var n = mn.current;
    return (n !== null && (n.flags |= 32), yn);
  }
  function rn(n, r, i) {
    (((n === Ze && (Ue === 2 || Ue === 9)) || n.cancelPendingCommit !== null) &&
      (Ca(n, 0), Hr(n, De, yn, !1)),
      Rr(n, i),
      ((Le & 2) === 0 || n !== Ze) &&
        (n === Ze &&
          ((Le & 2) === 0 && (Oo |= i), et === 4 && Hr(n, De, yn, !1)),
        Un(n)));
  }
  function bv(n, r, i) {
    if ((Le & 6) !== 0) throw Error(a(327));
    var l = (!i && (r & 124) === 0 && (r & n.expiredLanes) === 0) || co(n, r),
      d = l ? vx(n, r) : Xf(n, r, !0),
      m = l;
    do {
      if (d === 0) {
        xa && !l && Hr(n, r, 0, !1);
        break;
      } else {
        if (((i = n.current.alternate), m && !mx(i))) {
          ((d = Xf(n, r, !1)), (m = !1));
          continue;
        }
        if (d === 2) {
          if (((m = r), n.errorRecoveryDisabledLanes & m)) var b = 0;
          else
            ((b = n.pendingLanes & -536870913),
              (b = b !== 0 ? b : b & 536870912 ? 536870912 : 0));
          if (b !== 0) {
            r = b;
            e: {
              var x = n;
              d = Gi;
              var O = x.current.memoizedState.isDehydrated;
              if ((O && (Ca(x, b).flags |= 256), (b = Xf(x, b, !1)), b !== 2)) {
                if (qf && !O) {
                  ((x.errorRecoveryDisabledLanes |= m), (Oo |= m), (d = 4));
                  break e;
                }
                ((m = Gt),
                  (Gt = d),
                  m !== null &&
                    (Gt === null ? (Gt = m) : Gt.push.apply(Gt, m)));
              }
              d = b;
            }
            if (((m = !1), d !== 2)) continue;
          }
        }
        if (d === 1) {
          (Ca(n, 0), Hr(n, r, 0, !0));
          break;
        }
        e: {
          switch (((l = n), (m = d), m)) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((r & 4194048) !== r) break;
            case 6:
              Hr(l, r, yn, !Lr);
              break e;
            case 2:
              Gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((r & 62914560) === r && ((d = $f + 300 - gt()), 10 < d)) {
            if ((Hr(l, r, yn, !Lr), uo(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = Yv(
              Sv.bind(null, l, i, Gt, kl, Zf, r, yn, Oo, Ea, Lr, m, 2, -0, 0),
              d,
            );
            break e;
          }
          Sv(l, i, Gt, kl, Zf, r, yn, Oo, Ea, Lr, m, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Un(n);
  }
  function Sv(n, r, i, l, d, m, b, x, O, U, Y, X, I, V) {
    if (
      ((n.timeoutHandle = -1),
      (X = r.subtreeFlags),
      (X & 8192 || (X & 16785408) === 16785408) &&
        ((es = { stylesheets: null, count: 0, unsuspend: Qx }),
        hv(r),
        (X = Wx()),
        X !== null))
    ) {
      ((n.cancelPendingCommit = X(
        Cv.bind(null, n, r, m, i, l, d, b, x, O, Y, 1, I, V),
      )),
        Hr(n, m, b, !U));
      return;
    }
    Cv(n, r, m, i, l, d, b, x, O);
  }
  function mx(n) {
    for (var r = n; ; ) {
      var i = r.tag;
      if (
        (i === 0 || i === 11 || i === 15) &&
        r.flags & 16384 &&
        ((i = r.updateQueue), i !== null && ((i = i.stores), i !== null))
      )
        for (var l = 0; l < i.length; l++) {
          var d = i[l],
            m = d.getSnapshot;
          d = d.value;
          try {
            if (!Xt(m(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (((i = r.child), r.subtreeFlags & 16384 && i !== null))
        ((i.return = r), (r = i));
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        ((r.sibling.return = r.return), (r = r.sibling));
      }
    }
    return !0;
  }
  function Hr(n, r, i, l) {
    ((r &= ~Vf),
      (r &= ~Oo),
      (n.suspendedLanes |= r),
      (n.pingedLanes &= ~r),
      l && (n.warmLanes |= r),
      (l = n.expirationTimes));
    for (var d = r; 0 < d; ) {
      var m = 31 - Tt(d),
        b = 1 << m;
      ((l[m] = -1), (d &= ~b));
    }
    i !== 0 && we(n, i, r);
  }
  function Ll() {
    return (Le & 6) === 0 ? (Yi(0), !1) : !0;
  }
  function Kf() {
    if (Ce !== null) {
      if (Ue === 0) var n = Ce.return;
      else ((n = Ce), (ir = _o = null), df(n), (ba = null), (Ui = 0), (n = Ce));
      for (; n !== null; ) (Jy(n.alternate, n), (n = n.return));
      Ce = null;
    }
  }
  function Ca(n, r) {
    var i = n.timeoutHandle;
    (i !== -1 && ((n.timeoutHandle = -1), Px(i)),
      (i = n.cancelPendingCommit),
      i !== null && ((n.cancelPendingCommit = null), i()),
      Kf(),
      (Ze = n),
      (Ce = i = rr(n.current, null)),
      (De = r),
      (Ue = 0),
      (tn = null),
      (Lr = !1),
      (xa = co(n, r)),
      (qf = !1),
      (Ea = yn = Vf = Oo = Ur = et = 0),
      (Gt = Gi = null),
      (Zf = !1),
      (r & 8) !== 0 && (r |= r & 32));
    var l = n.entangledLanes;
    if (l !== 0)
      for (n = n.entanglements, l &= r; 0 < l; ) {
        var d = 31 - Tt(l),
          m = 1 << d;
        ((r |= n[d]), (l &= ~m));
      }
    return ((pr = r), al(), i);
  }
  function wv(n, r) {
    ((Ee = null),
      (z.H = El),
      r === Ai || r === pl
        ? ((r = Um()), (Ue = 3))
        : r === Nm
          ? ((r = Um()), (Ue = 4))
          : (Ue =
              r === By
                ? 8
                : r !== null &&
                    typeof r == "object" &&
                    typeof r.then == "function"
                  ? 6
                  : 1),
      (tn = r),
      Ce === null && ((et = 1), Al(n, fn(r, n.current))));
  }
  function _v() {
    var n = z.H;
    return ((z.H = El), n === null ? El : n);
  }
  function xv() {
    var n = z.A;
    return ((z.A = hx), n);
  }
  function Qf() {
    ((et = 4),
      Lr || ((De & 4194048) !== De && mn.current !== null) || (xa = !0),
      ((Ur & 134217727) === 0 && (Oo & 134217727) === 0) ||
        Ze === null ||
        Hr(Ze, De, yn, !1));
  }
  function Xf(n, r, i) {
    var l = Le;
    Le |= 2;
    var d = _v(),
      m = xv();
    ((Ze !== n || De !== r) && ((kl = null), Ca(n, r)), (r = !1));
    var b = et;
    e: do
      try {
        if (Ue !== 0 && Ce !== null) {
          var x = Ce,
            O = tn;
          switch (Ue) {
            case 8:
              (Kf(), (b = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              mn.current === null && (r = !0);
              var U = Ue;
              if (((Ue = 0), (tn = null), Oa(n, x, O, U), i && xa)) {
                b = 0;
                break e;
              }
              break;
            default:
              ((U = Ue), (Ue = 0), (tn = null), Oa(n, x, O, U));
          }
        }
        (yx(), (b = et));
        break;
      } catch (Y) {
        wv(n, Y);
      }
    while (!0);
    return (
      r && n.shellSuspendCounter++,
      (ir = _o = null),
      (Le = l),
      (z.H = d),
      (z.A = m),
      Ce === null && ((Ze = null), (De = 0), al()),
      b
    );
  }
  function yx() {
    for (; Ce !== null; ) Ev(Ce);
  }
  function vx(n, r) {
    var i = Le;
    Le |= 2;
    var l = _v(),
      d = xv();
    Ze !== n || De !== r
      ? ((kl = null), (Nl = gt() + 500), Ca(n, r))
      : (xa = co(n, r));
    e: do
      try {
        if (Ue !== 0 && Ce !== null) {
          r = Ce;
          var m = tn;
          t: switch (Ue) {
            case 1:
              ((Ue = 0), (tn = null), Oa(n, r, m, 1));
              break;
            case 2:
            case 9:
              if (km(m)) {
                ((Ue = 0), (tn = null), Rv(r));
                break;
              }
              ((r = function () {
                ((Ue !== 2 && Ue !== 9) || Ze !== n || (Ue = 7), Un(n));
              }),
                m.then(r, r));
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              km(m)
                ? ((Ue = 0), (tn = null), Rv(r))
                : ((Ue = 0), (tn = null), Oa(n, r, m, 7));
              break;
            case 5:
              var b = null;
              switch (Ce.tag) {
                case 26:
                  b = Ce.memoizedState;
                case 5:
                case 27:
                  var x = Ce;
                  if (!b || ig(b)) {
                    ((Ue = 0), (tn = null));
                    var O = x.sibling;
                    if (O !== null) Ce = O;
                    else {
                      var U = x.return;
                      U !== null ? ((Ce = U), Ul(U)) : (Ce = null);
                    }
                    break t;
                  }
              }
              ((Ue = 0), (tn = null), Oa(n, r, m, 5));
              break;
            case 6:
              ((Ue = 0), (tn = null), Oa(n, r, m, 6));
              break;
            case 8:
              (Kf(), (et = 6));
              break e;
            default:
              throw Error(a(462));
          }
        }
        gx();
        break;
      } catch (Y) {
        wv(n, Y);
      }
    while (!0);
    return (
      (ir = _o = null),
      (z.H = l),
      (z.A = d),
      (Le = i),
      Ce !== null ? 0 : ((Ze = null), (De = 0), al(), et)
    );
  }
  function gx() {
    for (; Ce !== null && !Zo(); ) Ev(Ce);
  }
  function Ev(n) {
    var r = Xy(n.alternate, n, pr);
    ((n.memoizedProps = n.pendingProps), r === null ? Ul(n) : (Ce = r));
  }
  function Rv(n) {
    var r = n,
      i = r.alternate;
    switch (r.tag) {
      case 15:
      case 0:
        r = $y(i, r, r.pendingProps, r.type, void 0, De);
        break;
      case 11:
        r = $y(i, r, r.pendingProps, r.type.render, r.ref, De);
        break;
      case 5:
        df(r);
      default:
        (Jy(i, r), (r = Ce = Tm(r, pr)), (r = Xy(i, r, pr)));
    }
    ((n.memoizedProps = n.pendingProps), r === null ? Ul(n) : (Ce = r));
  }
  function Oa(n, r, i, l) {
    ((ir = _o = null), df(r), (ba = null), (Ui = 0));
    var d = r.return;
    try {
      if (sx(n, d, r, i, De)) {
        ((et = 1), Al(n, fn(i, n.current)), (Ce = null));
        return;
      }
    } catch (m) {
      if (d !== null) throw ((Ce = d), m);
      ((et = 1), Al(n, fn(i, n.current)), (Ce = null));
      return;
    }
    r.flags & 32768
      ? (Ne || l === 1
          ? (n = !0)
          : xa || (De & 536870912) !== 0
            ? (n = !1)
            : ((Lr = n = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = mn.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        Tv(r, n))
      : Ul(r);
  }
  function Ul(n) {
    var r = n;
    do {
      if ((r.flags & 32768) !== 0) {
        Tv(r, Lr);
        return;
      }
      n = r.return;
      var i = ux(r.alternate, r, pr);
      if (i !== null) {
        Ce = i;
        return;
      }
      if (((r = r.sibling), r !== null)) {
        Ce = r;
        return;
      }
      Ce = r = n;
    } while (r !== null);
    et === 0 && (et = 5);
  }
  function Tv(n, r) {
    do {
      var i = cx(n.alternate, n);
      if (i !== null) {
        ((i.flags &= 32767), (Ce = i));
        return;
      }
      if (
        ((i = n.return),
        i !== null &&
          ((i.flags |= 32768), (i.subtreeFlags = 0), (i.deletions = null)),
        !r && ((n = n.sibling), n !== null))
      ) {
        Ce = n;
        return;
      }
      Ce = n = i;
    } while (n !== null);
    ((et = 6), (Ce = null));
  }
  function Cv(n, r, i, l, d, m, b, x, O) {
    n.cancelPendingCommit = null;
    do Bl();
    while (At !== 0);
    if ((Le & 6) !== 0) throw Error(a(327));
    if (r !== null) {
      if (r === n.current) throw Error(a(177));
      if (
        ((m = r.lanes | r.childLanes),
        (m |= Ic),
        Fs(n, i, m, b, x, O),
        n === Ze && ((Ce = Ze = null), (De = 0)),
        (Ra = r),
        (Ir = n),
        (Ta = i),
        (Gf = m),
        (Ff = d),
        (vv = l),
        (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
          ? ((n.callbackNode = null),
            (n.callbackPriority = 0),
            _x(Jn, function () {
              return (zv(), null);
            }))
          : ((n.callbackNode = null), (n.callbackPriority = 0)),
        (l = (r.flags & 13878) !== 0),
        (r.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = z.T), (z.T = null), (d = K.p), (K.p = 2), (b = Le), (Le |= 4));
        try {
          fx(n, r, i);
        } finally {
          ((Le = b), (K.p = d), (z.T = l));
        }
      }
      ((At = 1), Ov(), Av(), Mv());
    }
  }
  function Ov() {
    if (At === 1) {
      At = 0;
      var n = Ir,
        r = Ra,
        i = (r.flags & 13878) !== 0;
      if ((r.subtreeFlags & 13878) !== 0 || i) {
        ((i = z.T), (z.T = null));
        var l = K.p;
        K.p = 2;
        var d = Le;
        Le |= 4;
        try {
          cv(r, n);
          var m = ud,
            b = ym(n.containerInfo),
            x = m.focusedElem,
            O = m.selectionRange;
          if (
            b !== x &&
            x &&
            x.ownerDocument &&
            mm(x.ownerDocument.documentElement, x)
          ) {
            if (O !== null && Nc(x)) {
              var U = O.start,
                Y = O.end;
              if ((Y === void 0 && (Y = U), "selectionStart" in x))
                ((x.selectionStart = U),
                  (x.selectionEnd = Math.min(Y, x.value.length)));
              else {
                var X = x.ownerDocument || document,
                  I = (X && X.defaultView) || window;
                if (I.getSelection) {
                  var V = I.getSelection(),
                    Se = x.textContent.length,
                    ge = Math.min(O.start, Se),
                    He = O.end === void 0 ? ge : Math.min(O.end, Se);
                  !V.extend && ge > He && ((b = He), (He = ge), (ge = b));
                  var j = pm(x, ge),
                    M = pm(x, He);
                  if (
                    j &&
                    M &&
                    (V.rangeCount !== 1 ||
                      V.anchorNode !== j.node ||
                      V.anchorOffset !== j.offset ||
                      V.focusNode !== M.node ||
                      V.focusOffset !== M.offset)
                  ) {
                    var L = X.createRange();
                    (L.setStart(j.node, j.offset),
                      V.removeAllRanges(),
                      ge > He
                        ? (V.addRange(L), V.extend(M.node, M.offset))
                        : (L.setEnd(M.node, M.offset), V.addRange(L)));
                  }
                }
              }
            }
            for (X = [], V = x; (V = V.parentNode); )
              V.nodeType === 1 &&
                X.push({ element: V, left: V.scrollLeft, top: V.scrollTop });
            for (
              typeof x.focus == "function" && x.focus(), x = 0;
              x < X.length;
              x++
            ) {
              var Q = X[x];
              ((Q.element.scrollLeft = Q.left), (Q.element.scrollTop = Q.top));
            }
          }
          ((Xl = !!ld), (ud = ld = null));
        } finally {
          ((Le = d), (K.p = l), (z.T = i));
        }
      }
      ((n.current = r), (At = 2));
    }
  }
  function Av() {
    if (At === 2) {
      At = 0;
      var n = Ir,
        r = Ra,
        i = (r.flags & 8772) !== 0;
      if ((r.subtreeFlags & 8772) !== 0 || i) {
        ((i = z.T), (z.T = null));
        var l = K.p;
        K.p = 2;
        var d = Le;
        Le |= 4;
        try {
          iv(n, r.alternate, r);
        } finally {
          ((Le = d), (K.p = l), (z.T = i));
        }
      }
      At = 3;
    }
  }
  function Mv() {
    if (At === 4 || At === 3) {
      ((At = 0), $o());
      var n = Ir,
        r = Ra,
        i = Ta,
        l = vv;
      (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
        ? (At = 5)
        : ((At = 0), (Ra = Ir = null), Dv(n, n.pendingLanes));
      var d = n.pendingLanes;
      if (
        (d === 0 && (Br = null),
        Ct(i),
        (r = r.stateNode),
        kt && typeof kt.onCommitFiberRoot == "function")
      )
        try {
          kt.onCommitFiberRoot(Qt, r, void 0, (r.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((r = z.T), (d = K.p), (K.p = 2), (z.T = null));
        try {
          for (var m = n.onRecoverableError, b = 0; b < l.length; b++) {
            var x = l[b];
            m(x.value, { componentStack: x.stack });
          }
        } finally {
          ((z.T = r), (K.p = d));
        }
      }
      ((Ta & 3) !== 0 && Bl(),
        Un(n),
        (d = n.pendingLanes),
        (i & 4194090) !== 0 && (d & 42) !== 0
          ? n === Yf
            ? Fi++
            : ((Fi = 0), (Yf = n))
          : (Fi = 0),
        Yi(0));
    }
  }
  function Dv(n, r) {
    (n.pooledCacheLanes &= r) === 0 &&
      ((r = n.pooledCache), r != null && ((n.pooledCache = null), Ci(r)));
  }
  function Bl(n) {
    return (Ov(), Av(), Mv(), zv());
  }
  function zv() {
    if (At !== 5) return !1;
    var n = Ir,
      r = Gf;
    Gf = 0;
    var i = Ct(Ta),
      l = z.T,
      d = K.p;
    try {
      ((K.p = 32 > i ? 32 : i), (z.T = null), (i = Ff), (Ff = null));
      var m = Ir,
        b = Ta;
      if (((At = 0), (Ra = Ir = null), (Ta = 0), (Le & 6) !== 0))
        throw Error(a(331));
      var x = Le;
      if (
        ((Le |= 4),
        mv(m.current),
        dv(m, m.current, b, i),
        (Le = x),
        Yi(0, !1),
        kt && typeof kt.onPostCommitFiberRoot == "function")
      )
        try {
          kt.onPostCommitFiberRoot(Qt, m);
        } catch {}
      return !0;
    } finally {
      ((K.p = d), (z.T = l), Dv(n, r));
    }
  }
  function Pv(n, r, i) {
    ((r = fn(i, r)),
      (r = Tf(n.stateNode, r, 2)),
      (n = Mr(n, r, 2)),
      n !== null && (Rr(n, 2), Un(n)));
  }
  function qe(n, r, i) {
    if (n.tag === 3) Pv(n, n, i);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          Pv(r, n, i);
          break;
        } else if (r.tag === 1) {
          var l = r.stateNode;
          if (
            typeof r.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Br === null || !Br.has(l)))
          ) {
            ((n = fn(i, n)),
              (i = Ly(2)),
              (l = Mr(r, i, 2)),
              l !== null && (Uy(i, l, r, n), Rr(l, 2), Un(l)));
            break;
          }
        }
        r = r.return;
      }
  }
  function Wf(n, r, i) {
    var l = n.pingCache;
    if (l === null) {
      l = n.pingCache = new px();
      var d = new Set();
      l.set(r, d);
    } else ((d = l.get(r)), d === void 0 && ((d = new Set()), l.set(r, d)));
    d.has(i) ||
      ((qf = !0), d.add(i), (n = bx.bind(null, n, r, i)), r.then(n, n));
  }
  function bx(n, r, i) {
    var l = n.pingCache;
    (l !== null && l.delete(r),
      (n.pingedLanes |= n.suspendedLanes & i),
      (n.warmLanes &= ~i),
      Ze === n &&
        (De & i) === i &&
        (et === 4 || (et === 3 && (De & 62914560) === De && 300 > gt() - $f)
          ? (Le & 2) === 0 && Ca(n, 0)
          : (Vf |= i),
        Ea === De && (Ea = 0)),
      Un(n));
  }
  function jv(n, r) {
    (r === 0 && (r = Gs()), (n = ua(n, r)), n !== null && (Rr(n, r), Un(n)));
  }
  function Sx(n) {
    var r = n.memoizedState,
      i = 0;
    (r !== null && (i = r.retryLane), jv(n, i));
  }
  function wx(n, r) {
    var i = 0;
    switch (n.tag) {
      case 13:
        var l = n.stateNode,
          d = n.memoizedState;
        d !== null && (i = d.retryLane);
        break;
      case 19:
        l = n.stateNode;
        break;
      case 22:
        l = n.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    (l !== null && l.delete(r), jv(n, i));
  }
  function _x(n, r) {
    return ln(n, r);
  }
  var Il = null,
    Aa = null,
    Jf = !1,
    Hl = !1,
    ed = !1,
    Ao = 0;
  function Un(n) {
    (n !== Aa &&
      n.next === null &&
      (Aa === null ? (Il = Aa = n) : (Aa = Aa.next = n)),
      (Hl = !0),
      Jf || ((Jf = !0), Ex()));
  }
  function Yi(n, r) {
    if (!ed && Hl) {
      ed = !0;
      do
        for (var i = !1, l = Il; l !== null; ) {
          if (n !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var m = 0;
            else {
              var b = l.suspendedLanes,
                x = l.pingedLanes;
              ((m = (1 << (31 - Tt(42 | n) + 1)) - 1),
                (m &= d & ~(b & ~x)),
                (m = m & 201326741 ? (m & 201326741) | 1 : m ? m | 2 : 0));
            }
            m !== 0 && ((i = !0), Uv(l, m));
          } else
            ((m = De),
              (m = uo(
                l,
                l === Ze ? m : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (m & 3) === 0 || co(l, m) || ((i = !0), Uv(l, m)));
          l = l.next;
        }
      while (i);
      ed = !1;
    }
  }
  function xx() {
    Nv();
  }
  function Nv() {
    Hl = Jf = !1;
    var n = 0;
    Ao !== 0 && (zx() && (n = Ao), (Ao = 0));
    for (var r = gt(), i = null, l = Il; l !== null; ) {
      var d = l.next,
        m = kv(l, r);
      (m === 0
        ? ((l.next = null),
          i === null ? (Il = d) : (i.next = d),
          d === null && (Aa = i))
        : ((i = l), (n !== 0 || (m & 3) !== 0) && (Hl = !0)),
        (l = d));
    }
    Yi(n);
  }
  function kv(n, r) {
    for (
      var i = n.suspendedLanes,
        l = n.pingedLanes,
        d = n.expirationTimes,
        m = n.pendingLanes & -62914561;
      0 < m;

    ) {
      var b = 31 - Tt(m),
        x = 1 << b,
        O = d[b];
      (O === -1
        ? ((x & i) === 0 || (x & l) !== 0) && (d[b] = ci(x, r))
        : O <= r && (n.expiredLanes |= x),
        (m &= ~x));
    }
    if (
      ((r = Ze),
      (i = De),
      (i = uo(
        n,
        n === r ? i : 0,
        n.cancelPendingCommit !== null || n.timeoutHandle !== -1,
      )),
      (l = n.callbackNode),
      i === 0 ||
        (n === r && (Ue === 2 || Ue === 9)) ||
        n.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && Xn(l),
        (n.callbackNode = null),
        (n.callbackPriority = 0)
      );
    if ((i & 3) === 0 || co(n, i)) {
      if (((r = i & -i), r === n.callbackPriority)) return r;
      switch ((l !== null && Xn(l), Ct(i))) {
        case 2:
        case 8:
          i = Wn;
          break;
        case 32:
          i = Jn;
          break;
        case 268435456:
          i = Me;
          break;
        default:
          i = Jn;
      }
      return (
        (l = Lv.bind(null, n)),
        (i = ln(i, l)),
        (n.callbackPriority = r),
        (n.callbackNode = i),
        r
      );
    }
    return (
      l !== null && l !== null && Xn(l),
      (n.callbackPriority = 2),
      (n.callbackNode = null),
      2
    );
  }
  function Lv(n, r) {
    if (At !== 0 && At !== 5)
      return ((n.callbackNode = null), (n.callbackPriority = 0), null);
    var i = n.callbackNode;
    if (Bl() && n.callbackNode !== i) return null;
    var l = De;
    return (
      (l = uo(
        n,
        n === Ze ? l : 0,
        n.cancelPendingCommit !== null || n.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (bv(n, l, r),
          kv(n, gt()),
          n.callbackNode != null && n.callbackNode === i
            ? Lv.bind(null, n)
            : null)
    );
  }
  function Uv(n, r) {
    if (Bl()) return null;
    bv(n, r, !0);
  }
  function Ex() {
    jx(function () {
      (Le & 6) !== 0 ? ln(Rt, xx) : Nv();
    });
  }
  function td() {
    return (Ao === 0 && (Ao = En()), Ao);
  }
  function Bv(n) {
    return n == null || typeof n == "symbol" || typeof n == "boolean"
      ? null
      : typeof n == "function"
        ? n
        : Ws("" + n);
  }
  function Iv(n, r) {
    var i = r.ownerDocument.createElement("input");
    return (
      (i.name = r.name),
      (i.value = r.value),
      n.id && i.setAttribute("form", n.id),
      r.parentNode.insertBefore(i, r),
      (n = new FormData(n)),
      i.parentNode.removeChild(i),
      n
    );
  }
  function Rx(n, r, i, l, d) {
    if (r === "submit" && i && i.stateNode === d) {
      var m = Bv((d[Ve] || null).action),
        b = l.submitter;
      b &&
        ((r = (r = b[Ve] || null)
          ? Bv(r.formAction)
          : b.getAttribute("formAction")),
        r !== null && ((m = r), (b = null)));
      var x = new nl("action", "action", null, l, d);
      n.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Ao !== 0) {
                  var O = b ? Iv(d, b) : new FormData(d);
                  wf(
                    i,
                    { pending: !0, data: O, method: d.method, action: m },
                    null,
                    O,
                  );
                }
              } else
                typeof m == "function" &&
                  (x.preventDefault(),
                  (O = b ? Iv(d, b) : new FormData(d)),
                  wf(
                    i,
                    { pending: !0, data: O, method: d.method, action: m },
                    m,
                    O,
                  ));
            },
            currentTarget: d,
          },
        ],
      });
    }
  }
  for (var nd = 0; nd < Bc.length; nd++) {
    var rd = Bc[nd],
      Tx = rd.toLowerCase(),
      Cx = rd[0].toUpperCase() + rd.slice(1);
    Rn(Tx, "on" + Cx);
  }
  (Rn(bm, "onAnimationEnd"),
    Rn(Sm, "onAnimationIteration"),
    Rn(wm, "onAnimationStart"),
    Rn("dblclick", "onDoubleClick"),
    Rn("focusin", "onFocus"),
    Rn("focusout", "onBlur"),
    Rn(Z_, "onTransitionRun"),
    Rn($_, "onTransitionStart"),
    Rn(G_, "onTransitionCancel"),
    Rn(_m, "onTransitionEnd"),
    Jo("onMouseEnter", ["mouseout", "mouseover"]),
    Jo("onMouseLeave", ["mouseout", "mouseover"]),
    Jo("onPointerEnter", ["pointerout", "pointerover"]),
    Jo("onPointerLeave", ["pointerout", "pointerover"]),
    ho(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    ho(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    ho("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    ho(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    ho(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    ho(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Ki =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Ox = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ki),
    );
  function Hv(n, r) {
    r = (r & 4) !== 0;
    for (var i = 0; i < n.length; i++) {
      var l = n[i],
        d = l.event;
      l = l.listeners;
      e: {
        var m = void 0;
        if (r)
          for (var b = l.length - 1; 0 <= b; b--) {
            var x = l[b],
              O = x.instance,
              U = x.currentTarget;
            if (((x = x.listener), O !== m && d.isPropagationStopped()))
              break e;
            ((m = x), (d.currentTarget = U));
            try {
              m(d);
            } catch (Y) {
              Ol(Y);
            }
            ((d.currentTarget = null), (m = O));
          }
        else
          for (b = 0; b < l.length; b++) {
            if (
              ((x = l[b]),
              (O = x.instance),
              (U = x.currentTarget),
              (x = x.listener),
              O !== m && d.isPropagationStopped())
            )
              break e;
            ((m = x), (d.currentTarget = U));
            try {
              m(d);
            } catch (Y) {
              Ol(Y);
            }
            ((d.currentTarget = null), (m = O));
          }
      }
    }
  }
  function Oe(n, r) {
    var i = r[Ko];
    i === void 0 && (i = r[Ko] = new Set());
    var l = n + "__bubble";
    i.has(l) || (qv(r, n, 2, !1), i.add(l));
  }
  function od(n, r, i) {
    var l = 0;
    (r && (l |= 4), qv(i, n, l, r));
  }
  var ql = "_reactListening" + Math.random().toString(36).slice(2);
  function ad(n) {
    if (!n[ql]) {
      ((n[ql] = !0),
        Np.forEach(function (i) {
          i !== "selectionchange" && (Ox.has(i) || od(i, !1, n), od(i, !0, n));
        }));
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[ql] || ((r[ql] = !0), od("selectionchange", !1, r));
    }
  }
  function qv(n, r, i, l) {
    switch (dg(r)) {
      case 2:
        var d = tE;
        break;
      case 8:
        d = nE;
        break;
      default:
        d = bd;
    }
    ((i = d.bind(null, r, i, n)),
      (d = void 0),
      !Tc ||
        (r !== "touchstart" && r !== "touchmove" && r !== "wheel") ||
        (d = !0),
      l
        ? d !== void 0
          ? n.addEventListener(r, i, { capture: !0, passive: d })
          : n.addEventListener(r, i, !0)
        : d !== void 0
          ? n.addEventListener(r, i, { passive: d })
          : n.addEventListener(r, i, !1));
  }
  function id(n, r, i, l, d) {
    var m = l;
    if ((r & 1) === 0 && (r & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var x = l.stateNode.containerInfo;
          if (x === d) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var O = b.tag;
              if ((O === 3 || O === 4) && b.stateNode.containerInfo === d)
                return;
              b = b.return;
            }
          for (; x !== null; ) {
            if (((b = Qo(x)), b === null)) return;
            if (((O = b.tag), O === 5 || O === 6 || O === 26 || O === 27)) {
              l = m = b;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    Kp(function () {
      var U = m,
        Y = Ec(i),
        X = [];
      e: {
        var I = xm.get(n);
        if (I !== void 0) {
          var V = nl,
            Se = n;
          switch (n) {
            case "keypress":
              if (el(i) === 0) break e;
            case "keydown":
            case "keyup":
              V = __;
              break;
            case "focusin":
              ((Se = "focus"), (V = Mc));
              break;
            case "focusout":
              ((Se = "blur"), (V = Mc));
              break;
            case "beforeblur":
            case "afterblur":
              V = Mc;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              V = Wp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = c_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = R_;
              break;
            case bm:
            case Sm:
            case wm:
              V = h_;
              break;
            case _m:
              V = C_;
              break;
            case "scroll":
            case "scrollend":
              V = l_;
              break;
            case "wheel":
              V = A_;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = m_;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = em;
              break;
            case "toggle":
            case "beforetoggle":
              V = D_;
          }
          var ge = (r & 4) !== 0,
            He = !ge && (n === "scroll" || n === "scrollend"),
            j = ge ? (I !== null ? I + "Capture" : null) : I;
          ge = [];
          for (var M = U, L; M !== null; ) {
            var Q = M;
            if (
              ((L = Q.stateNode),
              (Q = Q.tag),
              (Q !== 5 && Q !== 26 && Q !== 27) ||
                L === null ||
                j === null ||
                ((Q = pi(M, j)), Q != null && ge.push(Qi(M, Q, L))),
              He)
            )
              break;
            M = M.return;
          }
          0 < ge.length &&
            ((I = new V(I, Se, null, i, Y)),
            X.push({ event: I, listeners: ge }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (
            ((I = n === "mouseover" || n === "pointerover"),
            (V = n === "mouseout" || n === "pointerout"),
            I &&
              i !== xc &&
              (Se = i.relatedTarget || i.fromElement) &&
              (Qo(Se) || Se[St]))
          )
            break e;
          if (
            (V || I) &&
            ((I =
              Y.window === Y
                ? Y
                : (I = Y.ownerDocument)
                  ? I.defaultView || I.parentWindow
                  : window),
            V
              ? ((Se = i.relatedTarget || i.toElement),
                (V = U),
                (Se = Se ? Qo(Se) : null),
                Se !== null &&
                  ((He = u(Se)),
                  (ge = Se.tag),
                  Se !== He || (ge !== 5 && ge !== 27 && ge !== 6)) &&
                  (Se = null))
              : ((V = null), (Se = U)),
            V !== Se)
          ) {
            if (
              ((ge = Wp),
              (Q = "onMouseLeave"),
              (j = "onMouseEnter"),
              (M = "mouse"),
              (n === "pointerout" || n === "pointerover") &&
                ((ge = em),
                (Q = "onPointerLeave"),
                (j = "onPointerEnter"),
                (M = "pointer")),
              (He = V == null ? I : hi(V)),
              (L = Se == null ? I : hi(Se)),
              (I = new ge(Q, M + "leave", V, i, Y)),
              (I.target = He),
              (I.relatedTarget = L),
              (Q = null),
              Qo(Y) === U &&
                ((ge = new ge(j, M + "enter", Se, i, Y)),
                (ge.target = L),
                (ge.relatedTarget = He),
                (Q = ge)),
              (He = Q),
              V && Se)
            )
              t: {
                for (ge = V, j = Se, M = 0, L = ge; L; L = Ma(L)) M++;
                for (L = 0, Q = j; Q; Q = Ma(Q)) L++;
                for (; 0 < M - L; ) ((ge = Ma(ge)), M--);
                for (; 0 < L - M; ) ((j = Ma(j)), L--);
                for (; M--; ) {
                  if (ge === j || (j !== null && ge === j.alternate)) break t;
                  ((ge = Ma(ge)), (j = Ma(j)));
                }
                ge = null;
              }
            else ge = null;
            (V !== null && Vv(X, I, V, ge, !1),
              Se !== null && He !== null && Vv(X, He, Se, ge, !0));
          }
        }
        e: {
          if (
            ((I = U ? hi(U) : window),
            (V = I.nodeName && I.nodeName.toLowerCase()),
            V === "select" || (V === "input" && I.type === "file"))
          )
            var ue = lm;
          else if (im(I))
            if (um) ue = H_;
            else {
              ue = B_;
              var Te = U_;
            }
          else
            ((V = I.nodeName),
              !V ||
              V.toLowerCase() !== "input" ||
              (I.type !== "checkbox" && I.type !== "radio")
                ? U && _c(U.elementType) && (ue = lm)
                : (ue = I_));
          if (ue && (ue = ue(n, U))) {
            sm(X, ue, i, Y);
            break e;
          }
          (Te && Te(n, I, U),
            n === "focusout" &&
              U &&
              I.type === "number" &&
              U.memoizedProps.value != null &&
              wc(I, "number", I.value));
        }
        switch (((Te = U ? hi(U) : window), n)) {
          case "focusin":
            (im(Te) || Te.contentEditable === "true") &&
              ((ia = Te), (kc = U), (_i = null));
            break;
          case "focusout":
            _i = kc = ia = null;
            break;
          case "mousedown":
            Lc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Lc = !1), vm(X, i, Y));
            break;
          case "selectionchange":
            if (V_) break;
          case "keydown":
          case "keyup":
            vm(X, i, Y);
        }
        var pe;
        if (zc)
          e: {
            switch (n) {
              case "compositionstart":
                var be = "onCompositionStart";
                break e;
              case "compositionend":
                be = "onCompositionEnd";
                break e;
              case "compositionupdate":
                be = "onCompositionUpdate";
                break e;
            }
            be = void 0;
          }
        else
          aa
            ? om(n, i) && (be = "onCompositionEnd")
            : n === "keydown" &&
              i.keyCode === 229 &&
              (be = "onCompositionStart");
        (be &&
          (tm &&
            i.locale !== "ko" &&
            (aa || be !== "onCompositionStart"
              ? be === "onCompositionEnd" && aa && (pe = Qp())
              : ((Tr = Y),
                (Cc = "value" in Tr ? Tr.value : Tr.textContent),
                (aa = !0))),
          (Te = Vl(U, be)),
          0 < Te.length &&
            ((be = new Jp(be, n, null, i, Y)),
            X.push({ event: be, listeners: Te }),
            pe
              ? (be.data = pe)
              : ((pe = am(i)), pe !== null && (be.data = pe)))),
          (pe = P_ ? j_(n, i) : N_(n, i)) &&
            ((be = Vl(U, "onBeforeInput")),
            0 < be.length &&
              ((Te = new Jp("onBeforeInput", "beforeinput", null, i, Y)),
              X.push({ event: Te, listeners: be }),
              (Te.data = pe))),
          Rx(X, n, U, i, Y));
      }
      Hv(X, r);
    });
  }
  function Qi(n, r, i) {
    return { instance: n, listener: r, currentTarget: i };
  }
  function Vl(n, r) {
    for (var i = r + "Capture", l = []; n !== null; ) {
      var d = n,
        m = d.stateNode;
      if (
        ((d = d.tag),
        (d !== 5 && d !== 26 && d !== 27) ||
          m === null ||
          ((d = pi(n, i)),
          d != null && l.unshift(Qi(n, d, m)),
          (d = pi(n, r)),
          d != null && l.push(Qi(n, d, m))),
        n.tag === 3)
      )
        return l;
      n = n.return;
    }
    return [];
  }
  function Ma(n) {
    if (n === null) return null;
    do n = n.return;
    while (n && n.tag !== 5 && n.tag !== 27);
    return n || null;
  }
  function Vv(n, r, i, l, d) {
    for (var m = r._reactName, b = []; i !== null && i !== l; ) {
      var x = i,
        O = x.alternate,
        U = x.stateNode;
      if (((x = x.tag), O !== null && O === l)) break;
      ((x !== 5 && x !== 26 && x !== 27) ||
        U === null ||
        ((O = U),
        d
          ? ((U = pi(i, m)), U != null && b.unshift(Qi(i, U, O)))
          : d || ((U = pi(i, m)), U != null && b.push(Qi(i, U, O)))),
        (i = i.return));
    }
    b.length !== 0 && n.push({ event: r, listeners: b });
  }
  var Ax = /\r\n?/g,
    Mx = /\u0000|\uFFFD/g;
  function Zv(n) {
    return (typeof n == "string" ? n : "" + n)
      .replace(
        Ax,
        `
`,
      )
      .replace(Mx, "");
  }
  function $v(n, r) {
    return ((r = Zv(r)), Zv(n) === r);
  }
  function Zl() {}
  function Ie(n, r, i, l, d, m) {
    switch (i) {
      case "children":
        typeof l == "string"
          ? r === "body" || (r === "textarea" && l === "") || na(n, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            r !== "body" &&
            na(n, "" + l);
        break;
      case "className":
        Ks(n, "class", l);
        break;
      case "tabIndex":
        Ks(n, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ks(n, i, l);
        break;
      case "style":
        Fp(n, l, m);
        break;
      case "data":
        if (r !== "object") {
          Ks(n, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (r !== "a" || i !== "href")) {
          n.removeAttribute(i);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          n.removeAttribute(i);
          break;
        }
        ((l = Ws("" + l)), n.setAttribute(i, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          n.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof m == "function" &&
            (i === "formAction"
              ? (r !== "input" && Ie(n, r, "name", d.name, d, null),
                Ie(n, r, "formEncType", d.formEncType, d, null),
                Ie(n, r, "formMethod", d.formMethod, d, null),
                Ie(n, r, "formTarget", d.formTarget, d, null))
              : (Ie(n, r, "encType", d.encType, d, null),
                Ie(n, r, "method", d.method, d, null),
                Ie(n, r, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          n.removeAttribute(i);
          break;
        }
        ((l = Ws("" + l)), n.setAttribute(i, l));
        break;
      case "onClick":
        l != null && (n.onclick = Zl);
        break;
      case "onScroll":
        l != null && Oe("scroll", n);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", n);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(a(61));
          if (((i = l.__html), i != null)) {
            if (d.children != null) throw Error(a(60));
            n.innerHTML = i;
          }
        }
        break;
      case "multiple":
        n.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        n.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          n.removeAttribute("xlink:href");
          break;
        }
        ((i = Ws("" + l)),
          n.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", i));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? n.setAttribute(i, "" + l)
          : n.removeAttribute(i);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? n.setAttribute(i, "")
          : n.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0
          ? n.setAttribute(i, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? n.setAttribute(i, l)
            : n.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? n.setAttribute(i, l)
          : n.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? n.removeAttribute(i)
          : n.setAttribute(i, l);
        break;
      case "popover":
        (Oe("beforetoggle", n), Oe("toggle", n), Ys(n, "popover", l));
        break;
      case "xlinkActuate":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        tr(n, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        tr(n, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        tr(n, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        tr(n, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Ys(n, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) ||
          (i[0] !== "o" && i[0] !== "O") ||
          (i[1] !== "n" && i[1] !== "N")) &&
          ((i = i_.get(i) || i), Ys(n, i, l));
    }
  }
  function sd(n, r, i, l, d, m) {
    switch (i) {
      case "style":
        Fp(n, l, m);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(a(61));
          if (((i = l.__html), i != null)) {
            if (d.children != null) throw Error(a(60));
            n.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? na(n, l)
          : (typeof l == "number" || typeof l == "bigint") && na(n, "" + l);
        break;
      case "onScroll":
        l != null && Oe("scroll", n);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", n);
        break;
      case "onClick":
        l != null && (n.onclick = Zl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!kp.hasOwnProperty(i))
          e: {
            if (
              i[0] === "o" &&
              i[1] === "n" &&
              ((d = i.endsWith("Capture")),
              (r = i.slice(2, d ? i.length - 7 : void 0)),
              (m = n[Ve] || null),
              (m = m != null ? m[i] : null),
              typeof m == "function" && n.removeEventListener(r, m, d),
              typeof l == "function")
            ) {
              (typeof m != "function" &&
                m !== null &&
                (i in n
                  ? (n[i] = null)
                  : n.hasAttribute(i) && n.removeAttribute(i)),
                n.addEventListener(r, l, d));
              break e;
            }
            i in n
              ? (n[i] = l)
              : l === !0
                ? n.setAttribute(i, "")
                : Ys(n, i, l);
          }
    }
  }
  function Mt(n, r, i) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Oe("error", n), Oe("load", n));
        var l = !1,
          d = !1,
          m;
        for (m in i)
          if (i.hasOwnProperty(m)) {
            var b = i[m];
            if (b != null)
              switch (m) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, r));
                default:
                  Ie(n, r, m, b, i, null);
              }
          }
        (d && Ie(n, r, "srcSet", i.srcSet, i, null),
          l && Ie(n, r, "src", i.src, i, null));
        return;
      case "input":
        Oe("invalid", n);
        var x = (m = b = d = null),
          O = null,
          U = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var Y = i[l];
            if (Y != null)
              switch (l) {
                case "name":
                  d = Y;
                  break;
                case "type":
                  b = Y;
                  break;
                case "checked":
                  O = Y;
                  break;
                case "defaultChecked":
                  U = Y;
                  break;
                case "value":
                  m = Y;
                  break;
                case "defaultValue":
                  x = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null) throw Error(a(137, r));
                  break;
                default:
                  Ie(n, r, l, Y, i, null);
              }
          }
        (Vp(n, m, x, O, U, b, d, !1), Qs(n));
        return;
      case "select":
        (Oe("invalid", n), (l = b = m = null));
        for (d in i)
          if (i.hasOwnProperty(d) && ((x = i[d]), x != null))
            switch (d) {
              case "value":
                m = x;
                break;
              case "defaultValue":
                b = x;
                break;
              case "multiple":
                l = x;
              default:
                Ie(n, r, d, x, i, null);
            }
        ((r = m),
          (i = b),
          (n.multiple = !!l),
          r != null ? ta(n, !!l, r, !1) : i != null && ta(n, !!l, i, !0));
        return;
      case "textarea":
        (Oe("invalid", n), (m = d = l = null));
        for (b in i)
          if (i.hasOwnProperty(b) && ((x = i[b]), x != null))
            switch (b) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                d = x;
                break;
              case "children":
                m = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(a(91));
                break;
              default:
                Ie(n, r, b, x, i, null);
            }
        ($p(n, l, d, m), Qs(n));
        return;
      case "option":
        for (O in i)
          if (i.hasOwnProperty(O) && ((l = i[O]), l != null))
            switch (O) {
              case "selected":
                n.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ie(n, r, O, l, i, null);
            }
        return;
      case "dialog":
        (Oe("beforetoggle", n),
          Oe("toggle", n),
          Oe("cancel", n),
          Oe("close", n));
        break;
      case "iframe":
      case "object":
        Oe("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ki.length; l++) Oe(Ki[l], n);
        break;
      case "image":
        (Oe("error", n), Oe("load", n));
        break;
      case "details":
        Oe("toggle", n);
        break;
      case "embed":
      case "source":
      case "link":
        (Oe("error", n), Oe("load", n));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (U in i)
          if (i.hasOwnProperty(U) && ((l = i[U]), l != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, r));
              default:
                Ie(n, r, U, l, i, null);
            }
        return;
      default:
        if (_c(r)) {
          for (Y in i)
            i.hasOwnProperty(Y) &&
              ((l = i[Y]), l !== void 0 && sd(n, r, Y, l, i, void 0));
          return;
        }
    }
    for (x in i)
      i.hasOwnProperty(x) && ((l = i[x]), l != null && Ie(n, r, x, l, i, null));
  }
  function Dx(n, r, i, l) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var d = null,
          m = null,
          b = null,
          x = null,
          O = null,
          U = null,
          Y = null;
        for (V in i) {
          var X = i[V];
          if (i.hasOwnProperty(V) && X != null)
            switch (V) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                O = X;
              default:
                l.hasOwnProperty(V) || Ie(n, r, V, null, l, X);
            }
        }
        for (var I in l) {
          var V = l[I];
          if (((X = i[I]), l.hasOwnProperty(I) && (V != null || X != null)))
            switch (I) {
              case "type":
                m = V;
                break;
              case "name":
                d = V;
                break;
              case "checked":
                U = V;
                break;
              case "defaultChecked":
                Y = V;
                break;
              case "value":
                b = V;
                break;
              case "defaultValue":
                x = V;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null) throw Error(a(137, r));
                break;
              default:
                V !== X && Ie(n, r, I, V, l, X);
            }
        }
        Sc(n, b, x, O, U, Y, m, d);
        return;
      case "select":
        V = b = x = I = null;
        for (m in i)
          if (((O = i[m]), i.hasOwnProperty(m) && O != null))
            switch (m) {
              case "value":
                break;
              case "multiple":
                V = O;
              default:
                l.hasOwnProperty(m) || Ie(n, r, m, null, l, O);
            }
        for (d in l)
          if (
            ((m = l[d]),
            (O = i[d]),
            l.hasOwnProperty(d) && (m != null || O != null))
          )
            switch (d) {
              case "value":
                I = m;
                break;
              case "defaultValue":
                x = m;
                break;
              case "multiple":
                b = m;
              default:
                m !== O && Ie(n, r, d, m, l, O);
            }
        ((r = x),
          (i = b),
          (l = V),
          I != null
            ? ta(n, !!i, I, !1)
            : !!l != !!i &&
              (r != null ? ta(n, !!i, r, !0) : ta(n, !!i, i ? [] : "", !1)));
        return;
      case "textarea":
        V = I = null;
        for (x in i)
          if (
            ((d = i[x]),
            i.hasOwnProperty(x) && d != null && !l.hasOwnProperty(x))
          )
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ie(n, r, x, null, l, d);
            }
        for (b in l)
          if (
            ((d = l[b]),
            (m = i[b]),
            l.hasOwnProperty(b) && (d != null || m != null))
          )
            switch (b) {
              case "value":
                I = d;
                break;
              case "defaultValue":
                V = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(a(91));
                break;
              default:
                d !== m && Ie(n, r, b, d, l, m);
            }
        Zp(n, I, V);
        return;
      case "option":
        for (var Se in i)
          if (
            ((I = i[Se]),
            i.hasOwnProperty(Se) && I != null && !l.hasOwnProperty(Se))
          )
            switch (Se) {
              case "selected":
                n.selected = !1;
                break;
              default:
                Ie(n, r, Se, null, l, I);
            }
        for (O in l)
          if (
            ((I = l[O]),
            (V = i[O]),
            l.hasOwnProperty(O) && I !== V && (I != null || V != null))
          )
            switch (O) {
              case "selected":
                n.selected =
                  I && typeof I != "function" && typeof I != "symbol";
                break;
              default:
                Ie(n, r, O, I, l, V);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ge in i)
          ((I = i[ge]),
            i.hasOwnProperty(ge) &&
              I != null &&
              !l.hasOwnProperty(ge) &&
              Ie(n, r, ge, null, l, I));
        for (U in l)
          if (
            ((I = l[U]),
            (V = i[U]),
            l.hasOwnProperty(U) && I !== V && (I != null || V != null))
          )
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (I != null) throw Error(a(137, r));
                break;
              default:
                Ie(n, r, U, I, l, V);
            }
        return;
      default:
        if (_c(r)) {
          for (var He in i)
            ((I = i[He]),
              i.hasOwnProperty(He) &&
                I !== void 0 &&
                !l.hasOwnProperty(He) &&
                sd(n, r, He, void 0, l, I));
          for (Y in l)
            ((I = l[Y]),
              (V = i[Y]),
              !l.hasOwnProperty(Y) ||
                I === V ||
                (I === void 0 && V === void 0) ||
                sd(n, r, Y, I, l, V));
          return;
        }
    }
    for (var j in i)
      ((I = i[j]),
        i.hasOwnProperty(j) &&
          I != null &&
          !l.hasOwnProperty(j) &&
          Ie(n, r, j, null, l, I));
    for (X in l)
      ((I = l[X]),
        (V = i[X]),
        !l.hasOwnProperty(X) ||
          I === V ||
          (I == null && V == null) ||
          Ie(n, r, X, I, l, V));
  }
  var ld = null,
    ud = null;
  function $l(n) {
    return n.nodeType === 9 ? n : n.ownerDocument;
  }
  function Gv(n) {
    switch (n) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Fv(n, r) {
    if (n === 0)
      switch (r) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return n === 1 && r === "foreignObject" ? 0 : n;
  }
  function cd(n, r) {
    return (
      n === "textarea" ||
      n === "noscript" ||
      typeof r.children == "string" ||
      typeof r.children == "number" ||
      typeof r.children == "bigint" ||
      (typeof r.dangerouslySetInnerHTML == "object" &&
        r.dangerouslySetInnerHTML !== null &&
        r.dangerouslySetInnerHTML.__html != null)
    );
  }
  var fd = null;
  function zx() {
    var n = window.event;
    return n && n.type === "popstate"
      ? n === fd
        ? !1
        : ((fd = n), !0)
      : ((fd = null), !1);
  }
  var Yv = typeof setTimeout == "function" ? setTimeout : void 0,
    Px = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Kv = typeof Promise == "function" ? Promise : void 0,
    jx =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Kv < "u"
          ? function (n) {
              return Kv.resolve(null).then(n).catch(Nx);
            }
          : Yv;
  function Nx(n) {
    setTimeout(function () {
      throw n;
    });
  }
  function qr(n) {
    return n === "head";
  }
  function Qv(n, r) {
    var i = r,
      l = 0,
      d = 0;
    do {
      var m = i.nextSibling;
      if ((n.removeChild(i), m && m.nodeType === 8))
        if (((i = m.data), i === "/$")) {
          if (0 < l && 8 > l) {
            i = l;
            var b = n.ownerDocument;
            if ((i & 1 && Xi(b.documentElement), i & 2 && Xi(b.body), i & 4))
              for (i = b.head, Xi(i), b = i.firstChild; b; ) {
                var x = b.nextSibling,
                  O = b.nodeName;
                (b[di] ||
                  O === "SCRIPT" ||
                  O === "STYLE" ||
                  (O === "LINK" && b.rel.toLowerCase() === "stylesheet") ||
                  i.removeChild(b),
                  (b = x));
              }
          }
          if (d === 0) {
            (n.removeChild(m), as(r));
            return;
          }
          d--;
        } else
          i === "$" || i === "$?" || i === "$!"
            ? d++
            : (l = i.charCodeAt(0) - 48);
      else l = 0;
      i = m;
    } while (i);
    as(r);
  }
  function dd(n) {
    var r = n.firstChild;
    for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
      var i = r;
      switch (((r = r.nextSibling), i.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (dd(i), yc(i));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      n.removeChild(i);
    }
  }
  function kx(n, r, i, l) {
    for (; n.nodeType === 1; ) {
      var d = i;
      if (n.nodeName.toLowerCase() !== r.toLowerCase()) {
        if (!l && (n.nodeName !== "INPUT" || n.type !== "hidden")) break;
      } else if (l) {
        if (!n[di])
          switch (r) {
            case "meta":
              if (!n.hasAttribute("itemprop")) break;
              return n;
            case "link":
              if (
                ((m = n.getAttribute("rel")),
                m === "stylesheet" && n.hasAttribute("data-precedence"))
              )
                break;
              if (
                m !== d.rel ||
                n.getAttribute("href") !==
                  (d.href == null || d.href === "" ? null : d.href) ||
                n.getAttribute("crossorigin") !==
                  (d.crossOrigin == null ? null : d.crossOrigin) ||
                n.getAttribute("title") !== (d.title == null ? null : d.title)
              )
                break;
              return n;
            case "style":
              if (n.hasAttribute("data-precedence")) break;
              return n;
            case "script":
              if (
                ((m = n.getAttribute("src")),
                (m !== (d.src == null ? null : d.src) ||
                  n.getAttribute("type") !== (d.type == null ? null : d.type) ||
                  n.getAttribute("crossorigin") !==
                    (d.crossOrigin == null ? null : d.crossOrigin)) &&
                  m &&
                  n.hasAttribute("async") &&
                  !n.hasAttribute("itemprop"))
              )
                break;
              return n;
            default:
              return n;
          }
      } else if (r === "input" && n.type === "hidden") {
        var m = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && n.getAttribute("name") === m) return n;
      } else return n;
      if (((n = Cn(n.nextSibling)), n === null)) break;
    }
    return null;
  }
  function Lx(n, r, i) {
    if (r === "") return null;
    for (; n.nodeType !== 3; )
      if (
        ((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") &&
          !i) ||
        ((n = Cn(n.nextSibling)), n === null)
      )
        return null;
    return n;
  }
  function hd(n) {
    return (
      n.data === "$!" ||
      (n.data === "$?" && n.ownerDocument.readyState === "complete")
    );
  }
  function Ux(n, r) {
    var i = n.ownerDocument;
    if (n.data !== "$?" || i.readyState === "complete") r();
    else {
      var l = function () {
        (r(), i.removeEventListener("DOMContentLoaded", l));
      };
      (i.addEventListener("DOMContentLoaded", l), (n._reactRetry = l));
    }
  }
  function Cn(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (
          ((r = n.data),
          r === "$" || r === "$!" || r === "$?" || r === "F!" || r === "F")
        )
          break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  var pd = null;
  function Xv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var i = n.data;
        if (i === "$" || i === "$!" || i === "$?") {
          if (r === 0) return n;
          r--;
        } else i === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  function Wv(n, r, i) {
    switch (((r = $l(i)), n)) {
      case "html":
        if (((n = r.documentElement), !n)) throw Error(a(452));
        return n;
      case "head":
        if (((n = r.head), !n)) throw Error(a(453));
        return n;
      case "body":
        if (((n = r.body), !n)) throw Error(a(454));
        return n;
      default:
        throw Error(a(451));
    }
  }
  function Xi(n) {
    for (var r = n.attributes; r.length; ) n.removeAttributeNode(r[0]);
    yc(n);
  }
  var vn = new Map(),
    Jv = new Set();
  function Gl(n) {
    return typeof n.getRootNode == "function"
      ? n.getRootNode()
      : n.nodeType === 9
        ? n
        : n.ownerDocument;
  }
  var mr = K.d;
  K.d = { f: Bx, r: Ix, D: Hx, C: qx, L: Vx, m: Zx, X: Gx, S: $x, M: Fx };
  function Bx() {
    var n = mr.f(),
      r = Ll();
    return n || r;
  }
  function Ix(n) {
    var r = Xo(n);
    r !== null && r.tag === 5 && r.type === "form" ? by(r) : mr.r(n);
  }
  var Da = typeof document > "u" ? null : document;
  function eg(n, r, i) {
    var l = Da;
    if (l && typeof r == "string" && r) {
      var d = cn(r);
      ((d = 'link[rel="' + n + '"][href="' + d + '"]'),
        typeof i == "string" && (d += '[crossorigin="' + i + '"]'),
        Jv.has(d) ||
          (Jv.add(d),
          (n = { rel: n, crossOrigin: i, href: r }),
          l.querySelector(d) === null &&
            ((r = l.createElement("link")),
            Mt(r, "link", n),
            wt(r),
            l.head.appendChild(r))));
    }
  }
  function Hx(n) {
    (mr.D(n), eg("dns-prefetch", n, null));
  }
  function qx(n, r) {
    (mr.C(n, r), eg("preconnect", n, r));
  }
  function Vx(n, r, i) {
    mr.L(n, r, i);
    var l = Da;
    if (l && n && r) {
      var d = 'link[rel="preload"][as="' + cn(r) + '"]';
      r === "image" && i && i.imageSrcSet
        ? ((d += '[imagesrcset="' + cn(i.imageSrcSet) + '"]'),
          typeof i.imageSizes == "string" &&
            (d += '[imagesizes="' + cn(i.imageSizes) + '"]'))
        : (d += '[href="' + cn(n) + '"]');
      var m = d;
      switch (r) {
        case "style":
          m = za(n);
          break;
        case "script":
          m = Pa(n);
      }
      vn.has(m) ||
        ((n = v(
          {
            rel: "preload",
            href: r === "image" && i && i.imageSrcSet ? void 0 : n,
            as: r,
          },
          i,
        )),
        vn.set(m, n),
        l.querySelector(d) !== null ||
          (r === "style" && l.querySelector(Wi(m))) ||
          (r === "script" && l.querySelector(Ji(m))) ||
          ((r = l.createElement("link")),
          Mt(r, "link", n),
          wt(r),
          l.head.appendChild(r)));
    }
  }
  function Zx(n, r) {
    mr.m(n, r);
    var i = Da;
    if (i && n) {
      var l = r && typeof r.as == "string" ? r.as : "script",
        d =
          'link[rel="modulepreload"][as="' + cn(l) + '"][href="' + cn(n) + '"]',
        m = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = Pa(n);
      }
      if (
        !vn.has(m) &&
        ((n = v({ rel: "modulepreload", href: n }, r)),
        vn.set(m, n),
        i.querySelector(d) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Ji(m))) return;
        }
        ((l = i.createElement("link")),
          Mt(l, "link", n),
          wt(l),
          i.head.appendChild(l));
      }
    }
  }
  function $x(n, r, i) {
    mr.S(n, r, i);
    var l = Da;
    if (l && n) {
      var d = Wo(l).hoistableStyles,
        m = za(n);
      r = r || "default";
      var b = d.get(m);
      if (!b) {
        var x = { loading: 0, preload: null };
        if ((b = l.querySelector(Wi(m)))) x.loading = 5;
        else {
          ((n = v({ rel: "stylesheet", href: n, "data-precedence": r }, i)),
            (i = vn.get(m)) && md(n, i));
          var O = (b = l.createElement("link"));
          (wt(O),
            Mt(O, "link", n),
            (O._p = new Promise(function (U, Y) {
              ((O.onload = U), (O.onerror = Y));
            })),
            O.addEventListener("load", function () {
              x.loading |= 1;
            }),
            O.addEventListener("error", function () {
              x.loading |= 2;
            }),
            (x.loading |= 4),
            Fl(b, r, l));
        }
        ((b = { type: "stylesheet", instance: b, count: 1, state: x }),
          d.set(m, b));
      }
    }
  }
  function Gx(n, r) {
    mr.X(n, r);
    var i = Da;
    if (i && n) {
      var l = Wo(i).hoistableScripts,
        d = Pa(n),
        m = l.get(d);
      m ||
        ((m = i.querySelector(Ji(d))),
        m ||
          ((n = v({ src: n, async: !0 }, r)),
          (r = vn.get(d)) && yd(n, r),
          (m = i.createElement("script")),
          wt(m),
          Mt(m, "link", n),
          i.head.appendChild(m)),
        (m = { type: "script", instance: m, count: 1, state: null }),
        l.set(d, m));
    }
  }
  function Fx(n, r) {
    mr.M(n, r);
    var i = Da;
    if (i && n) {
      var l = Wo(i).hoistableScripts,
        d = Pa(n),
        m = l.get(d);
      m ||
        ((m = i.querySelector(Ji(d))),
        m ||
          ((n = v({ src: n, async: !0, type: "module" }, r)),
          (r = vn.get(d)) && yd(n, r),
          (m = i.createElement("script")),
          wt(m),
          Mt(m, "link", n),
          i.head.appendChild(m)),
        (m = { type: "script", instance: m, count: 1, state: null }),
        l.set(d, m));
    }
  }
  function tg(n, r, i, l) {
    var d = (d = oe.current) ? Gl(d) : null;
    if (!d) throw Error(a(446));
    switch (n) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string"
          ? ((r = za(i.href)),
            (i = Wo(d).hoistableStyles),
            (l = i.get(r)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              i.set(r, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          i.rel === "stylesheet" &&
          typeof i.href == "string" &&
          typeof i.precedence == "string"
        ) {
          n = za(i.href);
          var m = Wo(d).hoistableStyles,
            b = m.get(n);
          if (
            (b ||
              ((d = d.ownerDocument || d),
              (b = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              m.set(n, b),
              (m = d.querySelector(Wi(n))) &&
                !m._p &&
                ((b.instance = m), (b.state.loading = 5)),
              vn.has(n) ||
                ((i = {
                  rel: "preload",
                  as: "style",
                  href: i.href,
                  crossOrigin: i.crossOrigin,
                  integrity: i.integrity,
                  media: i.media,
                  hrefLang: i.hrefLang,
                  referrerPolicy: i.referrerPolicy,
                }),
                vn.set(n, i),
                m || Yx(d, n, i, b.state))),
            r && l === null)
          )
            throw Error(a(528, ""));
          return b;
        }
        if (r && l !== null) throw Error(a(529, ""));
        return null;
      case "script":
        return (
          (r = i.async),
          (i = i.src),
          typeof i == "string" &&
          r &&
          typeof r != "function" &&
          typeof r != "symbol"
            ? ((r = Pa(i)),
              (i = Wo(d).hoistableScripts),
              (l = i.get(r)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                i.set(r, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(a(444, n));
    }
  }
  function za(n) {
    return 'href="' + cn(n) + '"';
  }
  function Wi(n) {
    return 'link[rel="stylesheet"][' + n + "]";
  }
  function ng(n) {
    return v({}, n, { "data-precedence": n.precedence, precedence: null });
  }
  function Yx(n, r, i, l) {
    n.querySelector('link[rel="preload"][as="style"][' + r + "]")
      ? (l.loading = 1)
      : ((r = n.createElement("link")),
        (l.preload = r),
        r.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        r.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Mt(r, "link", i),
        wt(r),
        n.head.appendChild(r));
  }
  function Pa(n) {
    return '[src="' + cn(n) + '"]';
  }
  function Ji(n) {
    return "script[async]" + n;
  }
  function rg(n, r, i) {
    if ((r.count++, r.instance === null))
      switch (r.type) {
        case "style":
          var l = n.querySelector('style[data-href~="' + cn(i.href) + '"]');
          if (l) return ((r.instance = l), wt(l), l);
          var d = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (n.ownerDocument || n).createElement("style")),
            wt(l),
            Mt(l, "style", d),
            Fl(l, i.precedence, n),
            (r.instance = l)
          );
        case "stylesheet":
          d = za(i.href);
          var m = n.querySelector(Wi(d));
          if (m) return ((r.state.loading |= 4), (r.instance = m), wt(m), m);
          ((l = ng(i)),
            (d = vn.get(d)) && md(l, d),
            (m = (n.ownerDocument || n).createElement("link")),
            wt(m));
          var b = m;
          return (
            (b._p = new Promise(function (x, O) {
              ((b.onload = x), (b.onerror = O));
            })),
            Mt(m, "link", l),
            (r.state.loading |= 4),
            Fl(m, i.precedence, n),
            (r.instance = m)
          );
        case "script":
          return (
            (m = Pa(i.src)),
            (d = n.querySelector(Ji(m)))
              ? ((r.instance = d), wt(d), d)
              : ((l = i),
                (d = vn.get(m)) && ((l = v({}, i)), yd(l, d)),
                (n = n.ownerDocument || n),
                (d = n.createElement("script")),
                wt(d),
                Mt(d, "link", l),
                n.head.appendChild(d),
                (r.instance = d))
          );
        case "void":
          return null;
        default:
          throw Error(a(443, r.type));
      }
    else
      r.type === "stylesheet" &&
        (r.state.loading & 4) === 0 &&
        ((l = r.instance), (r.state.loading |= 4), Fl(l, i.precedence, n));
    return r.instance;
  }
  function Fl(n, r, i) {
    for (
      var l = i.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        d = l.length ? l[l.length - 1] : null,
        m = d,
        b = 0;
      b < l.length;
      b++
    ) {
      var x = l[b];
      if (x.dataset.precedence === r) m = x;
      else if (m !== d) break;
    }
    m
      ? m.parentNode.insertBefore(n, m.nextSibling)
      : ((r = i.nodeType === 9 ? i.head : i), r.insertBefore(n, r.firstChild));
  }
  function md(n, r) {
    (n.crossOrigin == null && (n.crossOrigin = r.crossOrigin),
      n.referrerPolicy == null && (n.referrerPolicy = r.referrerPolicy),
      n.title == null && (n.title = r.title));
  }
  function yd(n, r) {
    (n.crossOrigin == null && (n.crossOrigin = r.crossOrigin),
      n.referrerPolicy == null && (n.referrerPolicy = r.referrerPolicy),
      n.integrity == null && (n.integrity = r.integrity));
  }
  var Yl = null;
  function og(n, r, i) {
    if (Yl === null) {
      var l = new Map(),
        d = (Yl = new Map());
      d.set(i, l);
    } else ((d = Yl), (l = d.get(i)), l || ((l = new Map()), d.set(i, l)));
    if (l.has(n)) return l;
    for (
      l.set(n, null), i = i.getElementsByTagName(n), d = 0;
      d < i.length;
      d++
    ) {
      var m = i[d];
      if (
        !(
          m[di] ||
          m[ot] ||
          (n === "link" && m.getAttribute("rel") === "stylesheet")
        ) &&
        m.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var b = m.getAttribute(r) || "";
        b = n + b;
        var x = l.get(b);
        x ? x.push(m) : l.set(b, [m]);
      }
    }
    return l;
  }
  function ag(n, r, i) {
    ((n = n.ownerDocument || n),
      n.head.insertBefore(
        i,
        r === "title" ? n.querySelector("head > title") : null,
      ));
  }
  function Kx(n, r, i) {
    if (i === 1 || r.itemProp != null) return !1;
    switch (n) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof r.precedence != "string" ||
          typeof r.href != "string" ||
          r.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof r.rel != "string" ||
          typeof r.href != "string" ||
          r.href === "" ||
          r.onLoad ||
          r.onError
        )
          break;
        switch (r.rel) {
          case "stylesheet":
            return (
              (n = r.disabled),
              typeof r.precedence == "string" && n == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          r.async &&
          typeof r.async != "function" &&
          typeof r.async != "symbol" &&
          !r.onLoad &&
          !r.onError &&
          r.src &&
          typeof r.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ig(n) {
    return !(n.type === "stylesheet" && (n.state.loading & 3) === 0);
  }
  var es = null;
  function Qx() {}
  function Xx(n, r, i) {
    if (es === null) throw Error(a(475));
    var l = es;
    if (
      r.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (r.state.loading & 4) === 0
    ) {
      if (r.instance === null) {
        var d = za(i.href),
          m = n.querySelector(Wi(d));
        if (m) {
          ((n = m._p),
            n !== null &&
              typeof n == "object" &&
              typeof n.then == "function" &&
              (l.count++, (l = Kl.bind(l)), n.then(l, l)),
            (r.state.loading |= 4),
            (r.instance = m),
            wt(m));
          return;
        }
        ((m = n.ownerDocument || n),
          (i = ng(i)),
          (d = vn.get(d)) && md(i, d),
          (m = m.createElement("link")),
          wt(m));
        var b = m;
        ((b._p = new Promise(function (x, O) {
          ((b.onload = x), (b.onerror = O));
        })),
          Mt(m, "link", i),
          (r.instance = m));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(r, n),
        (n = r.state.preload) &&
          (r.state.loading & 3) === 0 &&
          (l.count++,
          (r = Kl.bind(l)),
          n.addEventListener("load", r),
          n.addEventListener("error", r)));
    }
  }
  function Wx() {
    if (es === null) throw Error(a(475));
    var n = es;
    return (
      n.stylesheets && n.count === 0 && vd(n, n.stylesheets),
      0 < n.count
        ? function (r) {
            var i = setTimeout(function () {
              if ((n.stylesheets && vd(n, n.stylesheets), n.unsuspend)) {
                var l = n.unsuspend;
                ((n.unsuspend = null), l());
              }
            }, 6e4);
            return (
              (n.unsuspend = r),
              function () {
                ((n.unsuspend = null), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function Kl() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) vd(this, this.stylesheets);
      else if (this.unsuspend) {
        var n = this.unsuspend;
        ((this.unsuspend = null), n());
      }
    }
  }
  var Ql = null;
  function vd(n, r) {
    ((n.stylesheets = null),
      n.unsuspend !== null &&
        (n.count++,
        (Ql = new Map()),
        r.forEach(Jx, n),
        (Ql = null),
        Kl.call(n)));
  }
  function Jx(n, r) {
    if (!(r.state.loading & 4)) {
      var i = Ql.get(n);
      if (i) var l = i.get(null);
      else {
        ((i = new Map()), Ql.set(n, i));
        for (
          var d = n.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            m = 0;
          m < d.length;
          m++
        ) {
          var b = d[m];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") &&
            (i.set(b.dataset.precedence, b), (l = b));
        }
        l && i.set(null, l);
      }
      ((d = r.instance),
        (b = d.getAttribute("data-precedence")),
        (m = i.get(b) || l),
        m === l && i.set(null, d),
        i.set(b, d),
        this.count++,
        (l = Kl.bind(this)),
        d.addEventListener("load", l),
        d.addEventListener("error", l),
        m
          ? m.parentNode.insertBefore(d, m.nextSibling)
          : ((n = n.nodeType === 9 ? n.head : n),
            n.insertBefore(d, n.firstChild)),
        (r.state.loading |= 4));
    }
  }
  var ts = {
    $$typeof: P,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0,
  };
  function eE(n, r, i, l, d, m, b, x) {
    ((this.tag = 1),
      (this.containerInfo = n),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = fi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = fi(0)),
      (this.hiddenUpdates = fi(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = d),
      (this.onCaughtError = m),
      (this.onRecoverableError = b),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function sg(n, r, i, l, d, m, b, x, O, U, Y, X) {
    return (
      (n = new eE(n, r, i, b, x, O, U, X)),
      (r = 1),
      m === !0 && (r |= 24),
      (m = Wt(3, null, null, r)),
      (n.current = m),
      (m.stateNode = n),
      (r = Xc()),
      r.refCount++,
      (n.pooledCache = r),
      r.refCount++,
      (m.memoizedState = { element: l, isDehydrated: i, cache: r }),
      tf(m),
      n
    );
  }
  function lg(n) {
    return n ? ((n = ca), n) : ca;
  }
  function ug(n, r, i, l, d, m) {
    ((d = lg(d)),
      l.context === null ? (l.context = d) : (l.pendingContext = d),
      (l = Ar(r)),
      (l.payload = { element: i }),
      (m = m === void 0 ? null : m),
      m !== null && (l.callback = m),
      (i = Mr(n, l, r)),
      i !== null && (rn(i, n, r), Di(i, n, r)));
  }
  function cg(n, r) {
    if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
      var i = n.retryLane;
      n.retryLane = i !== 0 && i < r ? i : r;
    }
  }
  function gd(n, r) {
    (cg(n, r), (n = n.alternate) && cg(n, r));
  }
  function fg(n) {
    if (n.tag === 13) {
      var r = ua(n, 67108864);
      (r !== null && rn(r, n, 67108864), gd(n, 67108864));
    }
  }
  var Xl = !0;
  function tE(n, r, i, l) {
    var d = z.T;
    z.T = null;
    var m = K.p;
    try {
      ((K.p = 2), bd(n, r, i, l));
    } finally {
      ((K.p = m), (z.T = d));
    }
  }
  function nE(n, r, i, l) {
    var d = z.T;
    z.T = null;
    var m = K.p;
    try {
      ((K.p = 8), bd(n, r, i, l));
    } finally {
      ((K.p = m), (z.T = d));
    }
  }
  function bd(n, r, i, l) {
    if (Xl) {
      var d = Sd(l);
      if (d === null) (id(n, r, l, Wl, i), hg(n, l));
      else if (oE(d, n, r, i, l)) l.stopPropagation();
      else if ((hg(n, l), r & 4 && -1 < rE.indexOf(n))) {
        for (; d !== null; ) {
          var m = Xo(d);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (((m = m.stateNode), m.current.memoizedState.isDehydrated)) {
                  var b = Pn(m.pendingLanes);
                  if (b !== 0) {
                    var x = m;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; b; ) {
                      var O = 1 << (31 - Tt(b));
                      ((x.entanglements[1] |= O), (b &= ~O));
                    }
                    (Un(m), (Le & 6) === 0 && ((Nl = gt() + 500), Yi(0)));
                  }
                }
                break;
              case 13:
                ((x = ua(m, 2)), x !== null && rn(x, m, 2), Ll(), gd(m, 2));
            }
          if (((m = Sd(l)), m === null && id(n, r, l, Wl, i), m === d)) break;
          d = m;
        }
        d !== null && l.stopPropagation();
      } else id(n, r, l, null, i);
    }
  }
  function Sd(n) {
    return ((n = Ec(n)), wd(n));
  }
  var Wl = null;
  function wd(n) {
    if (((Wl = null), (n = Qo(n)), n !== null)) {
      var r = u(n);
      if (r === null) n = null;
      else {
        var i = r.tag;
        if (i === 13) {
          if (((n = c(r)), n !== null)) return n;
          n = null;
        } else if (i === 3) {
          if (r.stateNode.current.memoizedState.isDehydrated)
            return r.tag === 3 ? r.stateNode.containerInfo : null;
          n = null;
        } else r !== n && (n = null);
      }
    }
    return ((Wl = n), null);
  }
  function dg(n) {
    switch (n) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Go()) {
          case Rt:
            return 2;
          case Wn:
            return 8;
          case Jn:
          case bt:
            return 32;
          case Me:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var _d = !1,
    Vr = null,
    Zr = null,
    $r = null,
    ns = new Map(),
    rs = new Map(),
    Gr = [],
    rE =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function hg(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Vr = null;
        break;
      case "dragenter":
      case "dragleave":
        Zr = null;
        break;
      case "mouseover":
      case "mouseout":
        $r = null;
        break;
      case "pointerover":
      case "pointerout":
        ns.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        rs.delete(r.pointerId);
    }
  }
  function os(n, r, i, l, d, m) {
    return n === null || n.nativeEvent !== m
      ? ((n = {
          blockedOn: r,
          domEventName: i,
          eventSystemFlags: l,
          nativeEvent: m,
          targetContainers: [d],
        }),
        r !== null && ((r = Xo(r)), r !== null && fg(r)),
        n)
      : ((n.eventSystemFlags |= l),
        (r = n.targetContainers),
        d !== null && r.indexOf(d) === -1 && r.push(d),
        n);
  }
  function oE(n, r, i, l, d) {
    switch (r) {
      case "focusin":
        return ((Vr = os(Vr, n, r, i, l, d)), !0);
      case "dragenter":
        return ((Zr = os(Zr, n, r, i, l, d)), !0);
      case "mouseover":
        return (($r = os($r, n, r, i, l, d)), !0);
      case "pointerover":
        var m = d.pointerId;
        return (ns.set(m, os(ns.get(m) || null, n, r, i, l, d)), !0);
      case "gotpointercapture":
        return (
          (m = d.pointerId),
          rs.set(m, os(rs.get(m) || null, n, r, i, l, d)),
          !0
        );
    }
    return !1;
  }
  function pg(n) {
    var r = Qo(n.target);
    if (r !== null) {
      var i = u(r);
      if (i !== null) {
        if (((r = i.tag), r === 13)) {
          if (((r = c(i)), r !== null)) {
            ((n.blockedOn = r),
              pt(n.priority, function () {
                if (i.tag === 13) {
                  var l = nn();
                  l = ut(l);
                  var d = ua(i, l);
                  (d !== null && rn(d, i, l), gd(i, l));
                }
              }));
            return;
          }
        } else if (r === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Jl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var i = Sd(n.nativeEvent);
      if (i === null) {
        i = n.nativeEvent;
        var l = new i.constructor(i.type, i);
        ((xc = l), i.target.dispatchEvent(l), (xc = null));
      } else return ((r = Xo(i)), r !== null && fg(r), (n.blockedOn = i), !1);
      r.shift();
    }
    return !0;
  }
  function mg(n, r, i) {
    Jl(n) && i.delete(r);
  }
  function aE() {
    ((_d = !1),
      Vr !== null && Jl(Vr) && (Vr = null),
      Zr !== null && Jl(Zr) && (Zr = null),
      $r !== null && Jl($r) && ($r = null),
      ns.forEach(mg),
      rs.forEach(mg));
  }
  function eu(n, r) {
    n.blockedOn === r &&
      ((n.blockedOn = null),
      _d ||
        ((_d = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, aE)));
  }
  var tu = null;
  function yg(n) {
    tu !== n &&
      ((tu = n),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        tu === n && (tu = null);
        for (var r = 0; r < n.length; r += 3) {
          var i = n[r],
            l = n[r + 1],
            d = n[r + 2];
          if (typeof l != "function") {
            if (wd(l || i) === null) continue;
            break;
          }
          var m = Xo(i);
          m !== null &&
            (n.splice(r, 3),
            (r -= 3),
            wf(m, { pending: !0, data: d, method: i.method, action: l }, l, d));
        }
      }));
  }
  function as(n) {
    function r(O) {
      return eu(O, n);
    }
    (Vr !== null && eu(Vr, n),
      Zr !== null && eu(Zr, n),
      $r !== null && eu($r, n),
      ns.forEach(r),
      rs.forEach(r));
    for (var i = 0; i < Gr.length; i++) {
      var l = Gr[i];
      l.blockedOn === n && (l.blockedOn = null);
    }
    for (; 0 < Gr.length && ((i = Gr[0]), i.blockedOn === null); )
      (pg(i), i.blockedOn === null && Gr.shift());
    if (((i = (n.ownerDocument || n).$$reactFormReplay), i != null))
      for (l = 0; l < i.length; l += 3) {
        var d = i[l],
          m = i[l + 1],
          b = d[Ve] || null;
        if (typeof m == "function") b || yg(i);
        else if (b) {
          var x = null;
          if (m && m.hasAttribute("formAction")) {
            if (((d = m), (b = m[Ve] || null))) x = b.formAction;
            else if (wd(d) !== null) continue;
          } else x = b.action;
          (typeof x == "function" ? (i[l + 1] = x) : (i.splice(l, 3), (l -= 3)),
            yg(i));
        }
      }
  }
  function xd(n) {
    this._internalRoot = n;
  }
  ((nu.prototype.render = xd.prototype.render =
    function (n) {
      var r = this._internalRoot;
      if (r === null) throw Error(a(409));
      var i = r.current,
        l = nn();
      ug(i, l, n, r, null, null);
    }),
    (nu.prototype.unmount = xd.prototype.unmount =
      function () {
        var n = this._internalRoot;
        if (n !== null) {
          this._internalRoot = null;
          var r = n.containerInfo;
          (ug(n.current, 2, null, n, null, null), Ll(), (r[St] = null));
        }
      }));
  function nu(n) {
    this._internalRoot = n;
  }
  nu.prototype.unstable_scheduleHydration = function (n) {
    if (n) {
      var r = fo();
      n = { blockedOn: null, target: n, priority: r };
      for (var i = 0; i < Gr.length && r !== 0 && r < Gr[i].priority; i++);
      (Gr.splice(i, 0, n), i === 0 && pg(n));
    }
  };
  var vg = t.version;
  if (vg !== "19.1.4") throw Error(a(527, vg, "19.1.4"));
  K.findDOMNode = function (n) {
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function"
        ? Error(a(188))
        : ((n = Object.keys(n).join(",")), Error(a(268, n)));
    return (
      (n = h(r)),
      (n = n !== null ? p(n) : null),
      (n = n === null ? null : n.stateNode),
      n
    );
  };
  var iE = {
    bundleType: 0,
    version: "19.1.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.1.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ru = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ru.isDisabled && ru.supportsFiber)
      try {
        ((Qt = ru.inject(iE)), (kt = ru));
      } catch {}
  }
  return (
    (ss.createRoot = function (n, r) {
      if (!s(n)) throw Error(a(299));
      var i = !1,
        l = "",
        d = Py,
        m = jy,
        b = Ny,
        x = null;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (i = !0),
          r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
          r.onUncaughtError !== void 0 && (d = r.onUncaughtError),
          r.onCaughtError !== void 0 && (m = r.onCaughtError),
          r.onRecoverableError !== void 0 && (b = r.onRecoverableError),
          r.unstable_transitionCallbacks !== void 0 &&
            (x = r.unstable_transitionCallbacks)),
        (r = sg(n, 1, !1, null, null, i, l, d, m, b, x, null)),
        (n[St] = r.current),
        ad(n),
        new xd(r)
      );
    }),
    (ss.hydrateRoot = function (n, r, i) {
      if (!s(n)) throw Error(a(299));
      var l = !1,
        d = "",
        m = Py,
        b = jy,
        x = Ny,
        O = null,
        U = null;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (l = !0),
          i.identifierPrefix !== void 0 && (d = i.identifierPrefix),
          i.onUncaughtError !== void 0 && (m = i.onUncaughtError),
          i.onCaughtError !== void 0 && (b = i.onCaughtError),
          i.onRecoverableError !== void 0 && (x = i.onRecoverableError),
          i.unstable_transitionCallbacks !== void 0 &&
            (O = i.unstable_transitionCallbacks),
          i.formState !== void 0 && (U = i.formState)),
        (r = sg(n, 1, !0, r, i ?? null, l, d, m, b, x, O, U)),
        (r.context = lg(null)),
        (i = r.current),
        (l = nn()),
        (l = ut(l)),
        (d = Ar(l)),
        (d.callback = null),
        Mr(i, d, l),
        (i = l),
        (r.current.lanes = i),
        Rr(r, i),
        Un(r),
        (n[St] = r.current),
        ad(n),
        new nu(r)
      );
    }),
    (ss.version = "19.1.4"),
    ss
  );
}
var Cg;
function yE() {
  if (Cg) return Td.exports;
  Cg = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (Td.exports = mE()), Td.exports);
}
var vE = yE();
const sh = new WeakMap(),
  gE = new WeakMap(),
  Pu = { current: [] };
let Md = !1,
  ys = 0;
const hs = new Set(),
  ou = new Map();
function zb(e) {
  for (const t of e) {
    if (Pu.current.includes(t)) continue;
    (Pu.current.push(t), t.recompute());
    const o = gE.get(t);
    if (o)
      for (const a of o) {
        const s = sh.get(a);
        s?.length && zb(s);
      }
  }
}
function bE(e) {
  const t = { prevVal: e.prevState, currentVal: e.state };
  for (const o of e.listeners) o(t);
}
function SE(e) {
  const t = { prevVal: e.prevState, currentVal: e.state };
  for (const o of e.listeners) o(t);
}
function Pb(e) {
  if (
    (ys > 0 && !ou.has(e) && ou.set(e, e.prevState),
    hs.add(e),
    !(ys > 0) && !Md)
  )
    try {
      for (Md = !0; hs.size > 0; ) {
        const t = Array.from(hs);
        hs.clear();
        for (const o of t) {
          const a = ou.get(o) ?? o.prevState;
          ((o.prevState = a), bE(o));
        }
        for (const o of t) {
          const a = sh.get(o);
          a && (Pu.current.push(o), zb(a));
        }
        for (const o of t) {
          const a = sh.get(o);
          if (a) for (const s of a) SE(s);
        }
      }
    } finally {
      ((Md = !1), (Pu.current = []), ou.clear());
    }
}
function Ga(e) {
  ys++;
  try {
    e();
  } finally {
    if ((ys--, ys === 0)) {
      const t = hs.values().next().value;
      t && Pb(t);
    }
  }
}
function wE(e) {
  return typeof e == "function";
}
class _E {
  constructor(t, o) {
    ((this.listeners = new Set()),
      (this.subscribe = (a) => {
        var s, u;
        this.listeners.add(a);
        const c =
          (u = (s = this.options) == null ? void 0 : s.onSubscribe) == null
            ? void 0
            : u.call(s, a, this);
        return () => {
          (this.listeners.delete(a), c?.());
        };
      }),
      (this.prevState = t),
      (this.state = t),
      (this.options = o));
  }
  setState(t) {
    var o, a, s;
    ((this.prevState = this.state),
      (o = this.options) != null && o.updateFn
        ? (this.state = this.options.updateFn(this.prevState)(t))
        : wE(t)
          ? (this.state = t(this.prevState))
          : (this.state = t),
      (s = (a = this.options) == null ? void 0 : a.onUpdate) == null ||
        s.call(a),
      Pb(this));
  }
}
const Wr = "__TSR_index",
  Og = "popstate",
  Ag = "beforeunload";
function xE(e) {
  let t = e.getLocation();
  const o = new Set(),
    a = (c) => {
      ((t = e.getLocation()), o.forEach((f) => f({ location: t, action: c })));
    },
    s = (c) => {
      (e.notifyOnIndexChange ?? !0) ? a(c) : (t = e.getLocation());
    },
    u = async ({ task: c, navigateOpts: f, ...h }) => {
      if (f?.ignoreBlocker ?? !1) {
        c();
        return;
      }
      const v = e.getBlockers?.() ?? [],
        y = h.type === "PUSH" || h.type === "REPLACE";
      if (typeof document < "u" && v.length && y)
        for (const g of v) {
          const S = ju(h.path, h.state);
          if (
            await g.blockerFn({
              currentLocation: t,
              nextLocation: S,
              action: h.type,
            })
          ) {
            e.onBlocked?.();
            return;
          }
        }
      c();
    };
  return {
    get location() {
      return t;
    },
    get length() {
      return e.getLength();
    },
    subscribers: o,
    subscribe: (c) => (
      o.add(c),
      () => {
        o.delete(c);
      }
    ),
    push: (c, f, h) => {
      const p = t.state[Wr];
      ((f = Mg(p + 1, f)),
        u({
          task: () => {
            (e.pushState(c, f), a({ type: "PUSH" }));
          },
          navigateOpts: h,
          type: "PUSH",
          path: c,
          state: f,
        }));
    },
    replace: (c, f, h) => {
      const p = t.state[Wr];
      ((f = Mg(p, f)),
        u({
          task: () => {
            (e.replaceState(c, f), a({ type: "REPLACE" }));
          },
          navigateOpts: h,
          type: "REPLACE",
          path: c,
          state: f,
        }));
    },
    go: (c, f) => {
      u({
        task: () => {
          (e.go(c), s({ type: "GO", index: c }));
        },
        navigateOpts: f,
        type: "GO",
      });
    },
    back: (c) => {
      u({
        task: () => {
          (e.back(c?.ignoreBlocker ?? !1), s({ type: "BACK" }));
        },
        navigateOpts: c,
        type: "BACK",
      });
    },
    forward: (c) => {
      u({
        task: () => {
          (e.forward(c?.ignoreBlocker ?? !1), s({ type: "FORWARD" }));
        },
        navigateOpts: c,
        type: "FORWARD",
      });
    },
    canGoBack: () => t.state[Wr] !== 0,
    createHref: (c) => e.createHref(c),
    block: (c) => {
      if (!e.setBlockers) return () => {};
      const f = e.getBlockers?.() ?? [];
      return (
        e.setBlockers([...f, c]),
        () => {
          const h = e.getBlockers?.() ?? [];
          e.setBlockers?.(h.filter((p) => p !== c));
        }
      );
    },
    flush: () => e.flush?.(),
    destroy: () => e.destroy?.(),
    notify: a,
  };
}
function Mg(e, t) {
  t || (t = {});
  const o = $h();
  return { ...t, key: o, __TSR_key: o, [Wr]: e };
}
function EE(e) {
  const t = typeof document < "u" ? window : void 0,
    o = t.history.pushState,
    a = t.history.replaceState;
  let s = [];
  const u = () => s,
    c = (B) => (s = B),
    f = (B) => B,
    h = () =>
      ju(
        `${t.location.pathname}${t.location.search}${t.location.hash}`,
        t.history.state,
      );
  if (!t.history.state?.__TSR_key && !t.history.state?.key) {
    const B = $h();
    t.history.replaceState({ [Wr]: 0, key: B, __TSR_key: B }, "");
  }
  let p = h(),
    v,
    y = !1,
    g = !1,
    S = !1,
    w = !1;
  const _ = () => p;
  let T, A;
  const N = () => {
      T &&
        ((Z._ignoreSubscribers = !0),
        (T.isPush ? t.history.pushState : t.history.replaceState)(
          T.state,
          "",
          T.href,
        ),
        (Z._ignoreSubscribers = !1),
        (T = void 0),
        (A = void 0),
        (v = void 0));
    },
    P = (B, re, ae) => {
      const he = f(re);
      (A || (v = p),
        (p = ju(re, ae)),
        (T = { href: he, state: ae, isPush: T?.isPush || B === "push" }),
        A || (A = Promise.resolve().then(() => N())));
    },
    k = (B) => {
      ((p = h()), Z.notify({ type: B }));
    },
    H = async () => {
      if (g) {
        g = !1;
        return;
      }
      const B = h(),
        re = B.state[Wr] - p.state[Wr],
        ae = re === 1,
        he = re === -1,
        se = (!ae && !he) || y;
      y = !1;
      const ve = se ? "GO" : he ? "BACK" : "FORWARD",
        me = se ? { type: "GO", index: re } : { type: he ? "BACK" : "FORWARD" };
      if (S) S = !1;
      else {
        const ye = u();
        if (typeof document < "u" && ye.length) {
          for (const z of ye)
            if (
              await z.blockerFn({
                currentLocation: p,
                nextLocation: B,
                action: ve,
              })
            ) {
              ((g = !0), t.history.go(1), Z.notify(me));
              return;
            }
        }
      }
      ((p = h()), Z.notify(me));
    },
    F = (B) => {
      if (w) {
        w = !1;
        return;
      }
      let re = !1;
      const ae = u();
      if (typeof document < "u" && ae.length)
        for (const he of ae) {
          const se = he.enableBeforeUnload ?? !0;
          if (se === !0) {
            re = !0;
            break;
          }
          if (typeof se == "function" && se() === !0) {
            re = !0;
            break;
          }
        }
      if (re) return (B.preventDefault(), (B.returnValue = ""));
    },
    Z = xE({
      getLocation: _,
      getLength: () => t.history.length,
      pushState: (B, re) => P("push", B, re),
      replaceState: (B, re) => P("replace", B, re),
      back: (B) => (B && (S = !0), (w = !0), t.history.back()),
      forward: (B) => {
        (B && (S = !0), (w = !0), t.history.forward());
      },
      go: (B) => {
        ((y = !0), t.history.go(B));
      },
      createHref: (B) => f(B),
      flush: N,
      destroy: () => {
        ((t.history.pushState = o),
          (t.history.replaceState = a),
          t.removeEventListener(Ag, F, { capture: !0 }),
          t.removeEventListener(Og, H));
      },
      onBlocked: () => {
        v && p !== v && (p = v);
      },
      getBlockers: u,
      setBlockers: c,
      notifyOnIndexChange: !1,
    });
  return (
    t.addEventListener(Ag, F, { capture: !0 }),
    t.addEventListener(Og, H),
    (t.history.pushState = function (...B) {
      const re = o.apply(t.history, B);
      return (Z._ignoreSubscribers || k("PUSH"), re);
    }),
    (t.history.replaceState = function (...B) {
      const re = a.apply(t.history, B);
      return (Z._ignoreSubscribers || k("REPLACE"), re);
    }),
    Z
  );
}
function ju(e, t) {
  const o = e.indexOf("#"),
    a = e.indexOf("?"),
    s = $h();
  return {
    href: e,
    pathname: e.substring(
      0,
      o > 0 ? (a > 0 ? Math.min(o, a) : o) : a > 0 ? a : e.length,
    ),
    hash: o > -1 ? e.substring(o) : "",
    search: a > -1 ? e.slice(a, o === -1 ? void 0 : o) : "",
    state: t || { [Wr]: 0, key: s, __TSR_key: s },
  };
}
function $h() {
  return (Math.random() + 1).toString(36).substring(7);
}
function lh(e) {
  return e[e.length - 1];
}
function RE(e) {
  return typeof e == "function";
}
function Po(e, t) {
  return RE(e) ? e(t) : e;
}
const TE = Object.prototype.hasOwnProperty;
function gn(e, t) {
  if (e === t) return e;
  const o = t,
    a = Pg(e) && Pg(o);
  if (!a && !(_s(e) && _s(o))) return o;
  const s = a ? e : Dg(e);
  if (!s) return o;
  const u = a ? o : Dg(o);
  if (!u) return o;
  const c = s.length,
    f = u.length,
    h = a ? new Array(f) : {};
  let p = 0;
  for (let v = 0; v < f; v++) {
    const y = a ? v : u[v],
      g = e[y],
      S = o[y];
    if (g === S) {
      ((h[y] = g), (a ? v < c : TE.call(e, y)) && p++);
      continue;
    }
    if (
      g === null ||
      S === null ||
      typeof g != "object" ||
      typeof S != "object"
    ) {
      h[y] = S;
      continue;
    }
    const w = gn(g, S);
    ((h[y] = w), w === g && p++);
  }
  return c === f && p === c ? e : h;
}
function Dg(e) {
  const t = [],
    o = Object.getOwnPropertyNames(e);
  for (const s of o) {
    if (!Object.prototype.propertyIsEnumerable.call(e, s)) return !1;
    t.push(s);
  }
  const a = Object.getOwnPropertySymbols(e);
  for (const s of a) {
    if (!Object.prototype.propertyIsEnumerable.call(e, s)) return !1;
    t.push(s);
  }
  return t;
}
function _s(e) {
  if (!zg(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const o = t.prototype;
  return !(!zg(o) || !o.hasOwnProperty("isPrototypeOf"));
}
function zg(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Pg(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function jo(e, t, o) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    for (let a = 0, s = e.length; a < s; a++) if (!jo(e[a], t[a], o)) return !1;
    return !0;
  }
  if (_s(e) && _s(t)) {
    const a = o?.ignoreUndefined ?? !0;
    if (o?.partial) {
      for (const c in t)
        if ((!a || t[c] !== void 0) && !jo(e[c], t[c], o)) return !1;
      return !0;
    }
    let s = 0;
    if (!a) s = Object.keys(e).length;
    else for (const c in e) e[c] !== void 0 && s++;
    let u = 0;
    for (const c in t)
      if ((!a || t[c] !== void 0) && (u++, u > s || !jo(e[c], t[c], o)))
        return !1;
    return s === u;
  }
  return !1;
}
function ko(e) {
  let t, o;
  const a = new Promise((s, u) => {
    ((t = s), (o = u));
  });
  return (
    (a.status = "pending"),
    (a.resolve = (s) => {
      ((a.status = "resolved"), (a.value = s), t(s), e?.(s));
    }),
    (a.reject = (s) => {
      ((a.status = "rejected"), o(s));
    }),
    a
  );
}
function CE(e) {
  return typeof e?.message != "string"
    ? !1
    : e.message.startsWith("Failed to fetch dynamically imported module") ||
        e.message.startsWith("error loading dynamically imported module") ||
        e.message.startsWith("Importing a module script failed");
}
function Jr(e) {
  return !!(e && typeof e == "object" && typeof e.then == "function");
}
const OE = Array.from(
  new Map([
    ["%", "%25"],
    ["\\", "%5C"],
  ]).values(),
);
function jg(e, t = OE) {
  function o(s, u, c = 0) {
    for (let f = c; f < u.length; f++) {
      const h = u[f].toUpperCase();
      if (s.includes(h)) {
        const p = s.split(h),
          v = [];
        for (const y of p) v.push(o(y, u, f + 1));
        return v.join(h);
      }
    }
    try {
      return decodeURI(s);
    } catch {
      return s.replaceAll(/%[0-9A-F]{2}/g, (f) => {
        try {
          return decodeURI(f);
        } catch {
          return f;
        }
      });
    }
  }
  if (e === "" || !/%[0-9A-Fa-f]{2}/g.test(e)) return e;
  const a = e.replaceAll(/%[0-9a-f]{2}/g, (s) => s.toUpperCase());
  return o(a, t);
}
var AE = "Invariant failed";
function Yt(e, t) {
  if (!e) throw new Error(AE);
}
const Zn = 0,
  Lo = 1,
  Xa = 2,
  Wa = 3;
function gr(e) {
  return Gh(e.filter((t) => t !== void 0).join("/"));
}
function Gh(e) {
  return e.replace(/\/{2,}/g, "/");
}
function Fh(e) {
  return e === "/" ? e : e.replace(/^\/{1,}/, "");
}
function eo(e) {
  return e === "/" ? e : e.replace(/\/{1,}$/, "");
}
function Ru(e) {
  return eo(Fh(e));
}
function Nu(e, t) {
  return e?.endsWith("/") && e !== "/" && e !== `${t}/` ? e.slice(0, -1) : e;
}
function ME(e, t, o) {
  return Nu(e, o) === Nu(t, o);
}
function DE(e) {
  const { type: t, value: o } = e;
  if (t === Zn) return o;
  const { prefixSegment: a, suffixSegment: s } = e;
  if (t === Lo) {
    const u = o.substring(1);
    if (a && s) return `${a}{$${u}}${s}`;
    if (a) return `${a}{$${u}}`;
    if (s) return `{$${u}}${s}`;
  }
  if (t === Wa) {
    const u = o.substring(1);
    return a && s
      ? `${a}{-$${u}}${s}`
      : a
        ? `${a}{-$${u}}`
        : s
          ? `{-$${u}}${s}`
          : `{-$${u}}`;
  }
  if (t === Xa) {
    if (a && s) return `${a}{$}${s}`;
    if (a) return `${a}{$}`;
    if (s) return `{$}${s}`;
  }
  return o;
}
function zE({ base: e, to: t, trailingSlash: o = "never", parseCache: a }) {
  let s = Ja(e, a).slice();
  const u = Ja(t, a);
  s.length > 1 && lh(s)?.value === "/" && s.pop();
  for (let h = 0, p = u.length; h < p; h++) {
    const v = u[h],
      y = v.value;
    y === "/"
      ? h
        ? h === p - 1 && s.push(v)
        : (s = [v])
      : y === ".."
        ? s.pop()
        : y === "." || s.push(v);
  }
  s.length > 1 &&
    (lh(s).value === "/"
      ? o === "never" && s.pop()
      : o === "always" && s.push({ type: Zn, value: "/" }));
  const c = s.map(DE);
  return gr(c);
}
const Ja = (e, t) => {
    if (!e) return [];
    const o = t?.get(e);
    if (o) return o;
    const a = UE(e);
    return (t?.set(e, a), a);
  },
  PE = /^\$.{1,}$/,
  jE = /^(.*?)\{(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/,
  NE = /^(.*?)\{-(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/,
  kE = /^\$$/,
  LE = /^(.*?)\{\$\}(.*)$/;
function UE(e) {
  e = Gh(e);
  const t = [];
  if (
    (e.slice(0, 1) === "/" &&
      ((e = e.substring(1)), t.push({ type: Zn, value: "/" })),
    !e)
  )
    return t;
  const o = e.split("/").filter(Boolean);
  return (
    t.push(
      ...o.map((a) => {
        const s = a.match(LE);
        if (s) {
          const f = s[1],
            h = s[2];
          return {
            type: Xa,
            value: "$",
            prefixSegment: f || void 0,
            suffixSegment: h || void 0,
          };
        }
        const u = a.match(NE);
        if (u) {
          const f = u[1],
            h = u[2],
            p = u[3];
          return {
            type: Wa,
            value: h,
            prefixSegment: f || void 0,
            suffixSegment: p || void 0,
          };
        }
        const c = a.match(jE);
        if (c) {
          const f = c[1],
            h = c[2],
            p = c[3];
          return {
            type: Lo,
            value: "" + h,
            prefixSegment: f || void 0,
            suffixSegment: p || void 0,
          };
        }
        if (PE.test(a)) {
          const f = a.substring(1);
          return {
            type: Lo,
            value: "$" + f,
            prefixSegment: void 0,
            suffixSegment: void 0,
          };
        }
        return kE.test(a)
          ? {
              type: Xa,
              value: "$",
              prefixSegment: void 0,
              suffixSegment: void 0,
            }
          : { type: Zn, value: a };
      }),
    ),
    e.slice(-1) === "/" &&
      ((e = e.substring(1)), t.push({ type: Zn, value: "/" })),
    t
  );
}
function Dd({
  path: e,
  params: t,
  leaveParams: o,
  decodeCharMap: a,
  parseCache: s,
}) {
  const u = Ja(e, s);
  function c(v) {
    const y = t[v],
      g = typeof y == "string";
    return v === "*" || v === "_splat"
      ? g
        ? encodeURI(y)
        : y
      : g
        ? BE(y, a)
        : y;
  }
  let f = !1;
  const h = {},
    p = gr(
      u.map((v) => {
        if (v.type === Zn) return v.value;
        if (v.type === Xa) {
          ((h._splat = t._splat), (h["*"] = t._splat));
          const y = v.prefixSegment || "",
            g = v.suffixSegment || "";
          if (!t._splat) return ((f = !0), y || g ? `${y}${g}` : void 0);
          const S = c("_splat");
          return `${y}${S}${g}`;
        }
        if (v.type === Lo) {
          const y = v.value.substring(1);
          (!f && !(y in t) && (f = !0), (h[y] = t[y]));
          const g = v.prefixSegment || "",
            S = v.suffixSegment || "";
          if (o) {
            const w = c(v.value);
            return `${g}${v.value}${w ?? ""}${S}`;
          }
          return `${g}${c(y) ?? "undefined"}${S}`;
        }
        if (v.type === Wa) {
          const y = v.value.substring(1),
            g = v.prefixSegment || "",
            S = v.suffixSegment || "";
          if (!(y in t) || t[y] == null) return g || S ? `${g}${S}` : void 0;
          if (((h[y] = t[y]), o)) {
            const w = c(v.value);
            return `${g}${v.value}${w ?? ""}${S}`;
          }
          return `${g}${c(y) ?? ""}${S}`;
        }
        return v.value;
      }),
    );
  return { usedParams: h, interpolatedPath: p, isMissingParams: f };
}
function BE(e, t) {
  let o = encodeURIComponent(e);
  if (t) for (const [a, s] of t) o = o.replaceAll(a, s);
  return o;
}
function uh(e, t, o) {
  const a = IE(e, t, o);
  if (!(t.to && !a)) return a ?? {};
}
function IE(e, { to: t, fuzzy: o, caseSensitive: a }, s) {
  const u = t,
    c = Ja(e.startsWith("/") ? e : `/${e}`, s),
    f = Ja(u.startsWith("/") ? u : `/${u}`, s),
    h = {};
  return HE(c, f, h, o, a) ? h : void 0;
}
function HE(e, t, o, a, s) {
  let u = 0,
    c = 0;
  for (; u < e.length || c < t.length; ) {
    const f = e[u],
      h = t[c];
    if (h) {
      if (h.type === Xa) {
        const p = e.slice(u);
        let v;
        if (h.prefixSegment || h.suffixSegment) {
          if (!f) return !1;
          const y = h.prefixSegment || "",
            g = h.suffixSegment || "",
            S = f.value;
          if (
            ("prefixSegment" in h && !S.startsWith(y)) ||
            ("suffixSegment" in h && !e[e.length - 1]?.value.endsWith(g))
          )
            return !1;
          let w = decodeURI(gr(p.map((_) => _.value)));
          (y && w.startsWith(y) && (w = w.slice(y.length)),
            g && w.endsWith(g) && (w = w.slice(0, w.length - g.length)),
            (v = w));
        } else v = decodeURI(gr(p.map((y) => y.value)));
        return ((o["*"] = v), (o._splat = v), !0);
      }
      if (h.type === Zn) {
        if (h.value === "/" && !f?.value) {
          c++;
          continue;
        }
        if (f) {
          if (s) {
            if (h.value !== f.value) return !1;
          } else if (h.value.toLowerCase() !== f.value.toLowerCase()) return !1;
          (u++, c++);
          continue;
        } else return !1;
      }
      if (h.type === Lo) {
        if (!f || f.value === "/") return !1;
        let p = "",
          v = !1;
        if (h.prefixSegment || h.suffixSegment) {
          const y = h.prefixSegment || "",
            g = h.suffixSegment || "",
            S = f.value;
          if ((y && !S.startsWith(y)) || (g && !S.endsWith(g))) return !1;
          let w = S;
          (y && w.startsWith(y) && (w = w.slice(y.length)),
            g && w.endsWith(g) && (w = w.slice(0, w.length - g.length)),
            (p = decodeURIComponent(w)),
            (v = !0));
        } else ((p = decodeURIComponent(f.value)), (v = !0));
        (v && ((o[h.value.substring(1)] = p), u++), c++);
        continue;
      }
      if (h.type === Wa) {
        if (!f) {
          c++;
          continue;
        }
        if (f.value === "/") {
          c++;
          continue;
        }
        let p = "",
          v = !1;
        if (h.prefixSegment || h.suffixSegment) {
          const y = h.prefixSegment || "",
            g = h.suffixSegment || "",
            S = f.value;
          if ((!y || S.startsWith(y)) && (!g || S.endsWith(g))) {
            let w = S;
            (y && w.startsWith(y) && (w = w.slice(y.length)),
              g && w.endsWith(g) && (w = w.slice(0, w.length - g.length)),
              (p = decodeURIComponent(w)),
              (v = !0));
          }
        } else {
          let y = !0;
          for (let g = c + 1; g < t.length; g++) {
            const S = t[g];
            if (S?.type === Zn && S.value === f.value) {
              y = !1;
              break;
            }
            if (S?.type === Lo || S?.type === Xa) {
              e.length < t.length && (y = !1);
              break;
            }
          }
          y && ((p = decodeURIComponent(f.value)), (v = !0));
        }
        (v && ((o[h.value.substring(1)] = p), u++), c++);
        continue;
      }
    }
    if (u < e.length && c >= t.length)
      return (
        (o["**"] = gr(e.slice(u).map((p) => p.value))),
        !!a && t[t.length - 1]?.value !== "/"
      );
    if (c < t.length && u >= e.length) {
      for (let p = c; p < t.length; p++) if (t[p]?.type !== Wa) return !1;
      break;
    }
    break;
  }
  return !0;
}
const qE = 0.75,
  VE = 1,
  ZE = 0.5,
  $E = 0.4,
  GE = 0.25,
  FE = 0.2,
  YE = 0.05,
  KE = 0.02,
  QE = 0.01,
  Ng = 2e-4,
  kg = 1e-4;
function Lg(e, t) {
  return e.prefixSegment && e.suffixSegment
    ? t + YE + Ng * e.prefixSegment.length + kg * e.suffixSegment.length
    : e.prefixSegment
      ? t + KE + Ng * e.prefixSegment.length
      : e.suffixSegment
        ? t + QE + kg * e.suffixSegment.length
        : t;
}
function XE(e) {
  const t = [];
  return (
    e.forEach((a, s) => {
      if (a.isRoot || !a.path) return;
      const u = Fh(a.fullPath);
      let c = Ja(u),
        f = 0;
      for (; c.length > f + 1 && c[f]?.value === "/"; ) f++;
      f > 0 && (c = c.slice(f));
      let h = 0,
        p = !1;
      const v = c.map((y, g) => {
        if (y.value === "/") return qE;
        if (y.type === Zn) return VE;
        let S;
        y.type === Lo ? (S = ZE) : y.type === Wa ? ((S = $E), h++) : (S = GE);
        for (let w = g + 1; w < c.length; w++) {
          const _ = c[w];
          if (_.type === Zn && _.value !== "/")
            return ((p = !0), Lg(y, S + FE));
        }
        return Lg(y, S);
      });
      t.push({
        child: a,
        trimmed: u,
        parsed: c,
        index: s,
        scores: v,
        optionalParamCount: h,
        hasStaticAfter: p,
      });
    }),
    t
      .sort((a, s) => {
        const u = Math.min(a.scores.length, s.scores.length);
        for (let c = 0; c < u; c++)
          if (a.scores[c] !== s.scores[c]) return s.scores[c] - a.scores[c];
        if (a.scores.length !== s.scores.length) {
          if (a.optionalParamCount !== s.optionalParamCount) {
            if (a.hasStaticAfter === s.hasStaticAfter)
              return a.optionalParamCount - s.optionalParamCount;
            if (a.hasStaticAfter && !s.hasStaticAfter) return -1;
            if (!a.hasStaticAfter && s.hasStaticAfter) return 1;
          }
          return s.scores.length - a.scores.length;
        }
        for (let c = 0; c < u; c++)
          if (a.parsed[c].value !== s.parsed[c].value)
            return a.parsed[c].value > s.parsed[c].value ? 1 : -1;
        return a.index - s.index;
      })
      .map((a, s) => ((a.child.rank = s), a.child))
  );
}
function WE({ routeTree: e, initRoute: t }) {
  const o = {},
    a = {},
    s = (c) => {
      c.forEach((f, h) => {
        t?.(f, h);
        const p = o[f.id];
        if (
          (Yt(!p, `Duplicate routes found with id: ${String(f.id)}`),
          (o[f.id] = f),
          !f.isRoot && f.path)
        ) {
          const y = eo(f.fullPath);
          (!a[y] || f.fullPath.endsWith("/")) && (a[y] = f);
        }
        const v = f.children;
        v?.length && s(v);
      });
    };
  s([e]);
  const u = XE(Object.values(o));
  return { routesById: o, routesByPath: a, flatRoutes: u };
}
function wn(e) {
  return !!e?.isNotFound;
}
function JE() {
  try {
    if (typeof window < "u" && typeof window.sessionStorage == "object")
      return window.sessionStorage;
  } catch {}
}
const ku = "tsr-scroll-restoration-v1_3",
  eR = (e, t) => {
    let o;
    return (...a) => {
      o ||
        (o = setTimeout(() => {
          (e(...a), (o = null));
        }, t));
    };
  };
function tR() {
  const e = JE();
  if (!e) return null;
  const t = e.getItem(ku);
  let o = t ? JSON.parse(t) : {};
  return {
    state: o,
    set: (a) => ((o = Po(a, o) || o), e.setItem(ku, JSON.stringify(o))),
  };
}
const au = tR(),
  ch = (e) => e.state.__TSR_key || e.href;
function nR(e) {
  const t = [];
  let o;
  for (; (o = e.parentNode); )
    (t.push(
      `${e.tagName}:nth-child(${Array.prototype.indexOf.call(o.children, e) + 1})`,
    ),
      (e = o));
  return `${t.reverse().join(" > ")}`.toLowerCase();
}
let Lu = !1;
function jb({
  storageKey: e,
  key: t,
  behavior: o,
  shouldScrollRestoration: a,
  scrollToTopSelectors: s,
  location: u,
}) {
  let c;
  try {
    c = JSON.parse(sessionStorage.getItem(e) || "{}");
  } catch (p) {
    console.error(p);
    return;
  }
  const f = t || window.history.state?.__TSR_key,
    h = c[f];
  Lu = !0;
  e: {
    if (a && h && Object.keys(h).length > 0) {
      for (const y in h) {
        const g = h[y];
        if (y === "window")
          window.scrollTo({ top: g.scrollY, left: g.scrollX, behavior: o });
        else if (y) {
          const S = document.querySelector(y);
          S && ((S.scrollLeft = g.scrollX), (S.scrollTop = g.scrollY));
        }
      }
      break e;
    }
    const p = (u ?? window.location).hash.split("#", 2)[1];
    if (p) {
      const y = window.history.state?.__hashScrollIntoViewOptions ?? !0;
      if (y) {
        const g = document.getElementById(p);
        g && g.scrollIntoView(y);
      }
      break e;
    }
    const v = { top: 0, left: 0, behavior: o };
    if ((window.scrollTo(v), s))
      for (const y of s) {
        if (y === "window") continue;
        const g = typeof y == "function" ? y() : document.querySelector(y);
        g && g.scrollTo(v);
      }
  }
  Lu = !1;
}
function rR(e, t) {
  if (
    (!au && !e.isServer) ||
    ((e.options.scrollRestoration ?? !1) && (e.isScrollRestoring = !0),
    e.isServer || e.isScrollRestorationSetup || !au)
  )
    return;
  ((e.isScrollRestorationSetup = !0), (Lu = !1));
  const a = e.options.getScrollRestorationKey || ch;
  window.history.scrollRestoration = "manual";
  const s = (u) => {
    if (Lu || !e.isScrollRestoring) return;
    let c = "";
    if (u.target === document || u.target === window) c = "window";
    else {
      const h = u.target.getAttribute("data-scroll-restoration-id");
      h ? (c = `[data-scroll-restoration-id="${h}"]`) : (c = nR(u.target));
    }
    const f = a(e.state.location);
    au.set((h) => {
      const p = (h[f] ||= {}),
        v = (p[c] ||= {});
      if (c === "window")
        ((v.scrollX = window.scrollX || 0), (v.scrollY = window.scrollY || 0));
      else if (c) {
        const y = document.querySelector(c);
        y && ((v.scrollX = y.scrollLeft || 0), (v.scrollY = y.scrollTop || 0));
      }
      return h;
    });
  };
  (typeof document < "u" && document.addEventListener("scroll", eR(s, 100), !0),
    e.subscribe("onRendered", (u) => {
      const c = a(u.toLocation);
      if (!e.resetNextScroll) {
        e.resetNextScroll = !0;
        return;
      }
      (typeof e.options.scrollRestoration == "function" &&
        !e.options.scrollRestoration({ location: e.latestLocation })) ||
        (jb({
          storageKey: ku,
          key: c,
          behavior: e.options.scrollRestorationBehavior,
          shouldScrollRestoration: e.isScrollRestoring,
          scrollToTopSelectors: e.options.scrollToTopSelectors,
          location: e.history.location,
        }),
        e.isScrollRestoring && au.set((f) => ((f[c] ||= {}), f)));
    }));
}
function oR(e) {
  if (typeof document < "u" && document.querySelector) {
    const t = e.state.location.state.__hashScrollIntoViewOptions ?? !0;
    if (t && e.state.location.hash !== "") {
      const o = document.getElementById(e.state.location.hash);
      o && o.scrollIntoView(t);
    }
  }
}
function Nb(e, t = String) {
  const o = new URLSearchParams();
  for (const a in e) {
    const s = e[a];
    s !== void 0 && o.set(a, t(s));
  }
  return o.toString();
}
function zd(e) {
  return e
    ? e === "false"
      ? !1
      : e === "true"
        ? !0
        : +e * 0 === 0 && +e + "" === e
          ? +e
          : e
    : "";
}
function aR(e) {
  const t = new URLSearchParams(e),
    o = {};
  for (const [a, s] of t.entries()) {
    const u = o[a];
    u == null
      ? (o[a] = zd(s))
      : Array.isArray(u)
        ? u.push(zd(s))
        : (o[a] = [u, zd(s)]);
  }
  return o;
}
const iR = lR(JSON.parse),
  sR = uR(JSON.stringify, JSON.parse);
function lR(e) {
  return (t) => {
    t[0] === "?" && (t = t.substring(1));
    const o = aR(t);
    for (const a in o) {
      const s = o[a];
      if (typeof s == "string")
        try {
          o[a] = e(s);
        } catch {}
    }
    return o;
  };
}
function uR(e, t) {
  const o = typeof t == "function";
  function a(s) {
    if (typeof s == "object" && s !== null)
      try {
        return e(s);
      } catch {}
    else if (o && typeof s == "string")
      try {
        return (t(s), e(s));
      } catch {}
    return s;
  }
  return (s) => {
    const u = Nb(s, a);
    return u ? `?${u}` : "";
  };
}
const on = "__root__";
function kb(e) {
  if (
    ((e.statusCode = e.statusCode || e.code || 307),
    !e.reloadDocument && typeof e.href == "string")
  )
    try {
      (new URL(e.href), (e.reloadDocument = !0));
    } catch {}
  const t = new Headers(e.headers);
  e.href && t.get("Location") === null && t.set("Location", e.href);
  const o = new Response(null, { status: e.statusCode, headers: t });
  if (((o.options = e), e.throw)) throw o;
  return o;
}
function bn(e) {
  return e instanceof Response && !!e.options;
}
function cR(e) {
  if (e !== null && typeof e == "object" && e.isSerializedRedirect)
    return kb(e);
}
function fR(e) {
  const t = new Map();
  let o, a;
  const s = (u) => {
    u.next &&
      (u.prev
        ? ((u.prev.next = u.next),
          (u.next.prev = u.prev),
          (u.next = void 0),
          a && ((a.next = u), (u.prev = a)))
        : ((u.next.prev = void 0),
          (o = u.next),
          (u.next = void 0),
          a && ((u.prev = a), (a.next = u))),
      (a = u));
  };
  return {
    get(u) {
      const c = t.get(u);
      if (c) return (s(c), c.value);
    },
    set(u, c) {
      if (t.size >= e && o) {
        const h = o;
        (t.delete(h.key),
          h.next && ((o = h.next), (h.next.prev = void 0)),
          h === a && (a = void 0));
      }
      const f = t.get(u);
      if (f) ((f.value = c), s(f));
      else {
        const h = { key: u, value: c, prev: a };
        (a && (a.next = h), (a = h), o || (o = h), t.set(u, h));
      }
    },
  };
}
const Tu = (e) => {
    if (!e.rendered) return ((e.rendered = !0), e.onReady?.());
  },
  Fu = (e, t) =>
    !!(e.preload && !e.router.state.matches.some((o) => o.id === t)),
  Lb = (e, t) => {
    const o = e.router.routesById[t.routeId ?? ""] ?? e.router.routeTree;
    (!o.options.notFoundComponent &&
      e.router.options?.defaultNotFoundComponent &&
      (o.options.notFoundComponent = e.router.options.defaultNotFoundComponent),
      Yt(o.options.notFoundComponent));
    const a = e.matches.find((s) => s.routeId === o.id);
    (Yt(a, "Could not find match for route: " + o.id),
      e.updateMatch(a.id, (s) => ({
        ...s,
        status: "notFound",
        error: t,
        isFetching: !1,
      })),
      t.routerCode === "BEFORE_LOAD" &&
        o.parentRoute &&
        ((t.routeId = o.parentRoute.id), Lb(e, t)));
  },
  Xr = (e, t, o) => {
    if (!(!bn(o) && !wn(o))) {
      if (bn(o) && o.redirectHandled && !o.options.reloadDocument) throw o;
      if (t) {
        (t._nonReactive.beforeLoadPromise?.resolve(),
          t._nonReactive.loaderPromise?.resolve(),
          (t._nonReactive.beforeLoadPromise = void 0),
          (t._nonReactive.loaderPromise = void 0));
        const a = bn(o) ? "redirected" : "notFound";
        ((t._nonReactive.error = o),
          e.updateMatch(t.id, (s) => ({
            ...s,
            status: a,
            isFetching: !1,
            error: o,
          })),
          wn(o) && !o.routeId && (o.routeId = t.routeId),
          t._nonReactive.loadPromise?.resolve());
      }
      throw bn(o)
        ? ((e.rendered = !0),
          (o.options._fromLocation = e.location),
          (o.redirectHandled = !0),
          (o = e.router.resolveRedirect(o)),
          o)
        : (Lb(e, o), o);
    }
  },
  Ub = (e, t) => {
    const o = e.router.getMatch(t);
    return !!(
      (!e.router.isServer && o._nonReactive.dehydrated) ||
      (e.router.isServer && o.ssr === !1)
    );
  },
  ls = (e, t, o, a) => {
    const { id: s, routeId: u } = e.matches[t],
      c = e.router.looseRoutesById[u];
    if (o instanceof Promise) throw o;
    ((o.routerCode = a),
      (e.firstBadMatchIndex ??= t),
      Xr(e, e.router.getMatch(s), o));
    try {
      c.options.onError?.(o);
    } catch (f) {
      ((o = f), Xr(e, e.router.getMatch(s), o));
    }
    e.updateMatch(
      s,
      (f) => (
        f._nonReactive.beforeLoadPromise?.resolve(),
        (f._nonReactive.beforeLoadPromise = void 0),
        f._nonReactive.loadPromise?.resolve(),
        {
          ...f,
          error: o,
          status: "error",
          isFetching: !1,
          updatedAt: Date.now(),
          abortController: new AbortController(),
        }
      ),
    );
  },
  dR = (e, t, o, a) => {
    const s = e.router.getMatch(t),
      u = e.matches[o - 1]?.id,
      c = u ? e.router.getMatch(u) : void 0;
    if (e.router.isShell()) {
      s.ssr = a.id === on;
      return;
    }
    if (c?.ssr === !1) {
      s.ssr = !1;
      return;
    }
    const f = (S) => (S === !0 && c?.ssr === "data-only" ? "data-only" : S),
      h = e.router.options.defaultSsr ?? !0;
    if (a.options.ssr === void 0) {
      s.ssr = f(h);
      return;
    }
    if (typeof a.options.ssr != "function") {
      s.ssr = f(a.options.ssr);
      return;
    }
    const { search: p, params: v } = s,
      y = {
        search: iu(p, s.searchError),
        params: iu(v, s.paramsError),
        location: e.location,
        matches: e.matches.map((S) => ({
          index: S.index,
          pathname: S.pathname,
          fullPath: S.fullPath,
          staticData: S.staticData,
          id: S.id,
          routeId: S.routeId,
          search: iu(S.search, S.searchError),
          params: iu(S.params, S.paramsError),
          ssr: S.ssr,
        })),
      },
      g = a.options.ssr(y);
    if (Jr(g))
      return g.then((S) => {
        s.ssr = f(S ?? h);
      });
    s.ssr = f(g ?? h);
  },
  Bb = (e, t, o, a) => {
    if (a._nonReactive.pendingTimeout !== void 0) return;
    const s = o.options.pendingMs ?? e.router.options.defaultPendingMs;
    if (
      !!(
        e.onReady &&
        !e.router.isServer &&
        !Fu(e, t) &&
        (o.options.loader || o.options.beforeLoad || qb(o)) &&
        typeof s == "number" &&
        s !== 1 / 0 &&
        (o.options.pendingComponent ??
          e.router.options?.defaultPendingComponent)
      )
    ) {
      const c = setTimeout(() => {
        Tu(e);
      }, s);
      a._nonReactive.pendingTimeout = c;
    }
  },
  hR = (e, t, o) => {
    const a = e.router.getMatch(t);
    if (!a._nonReactive.beforeLoadPromise && !a._nonReactive.loaderPromise)
      return;
    Bb(e, t, o, a);
    const s = () => {
      const u = e.router.getMatch(t);
      u.preload &&
        (u.status === "redirected" || u.status === "notFound") &&
        Xr(e, u, u.error);
    };
    return a._nonReactive.beforeLoadPromise
      ? a._nonReactive.beforeLoadPromise.then(s)
      : s();
  },
  pR = (e, t, o, a) => {
    const s = e.router.getMatch(t),
      u = s._nonReactive.loadPromise;
    s._nonReactive.loadPromise = ko(() => {
      u?.resolve();
    });
    const { paramsError: c, searchError: f } = s;
    (c && ls(e, o, c, "PARSE_PARAMS"),
      f && ls(e, o, f, "VALIDATE_SEARCH"),
      Bb(e, t, a, s));
    const h = new AbortController(),
      p = e.matches[o - 1]?.id,
      g = {
        ...((p ? e.router.getMatch(p) : void 0)?.context ??
          e.router.options.context ??
          void 0),
        ...s.__routeContext,
      };
    let S = !1;
    const w = () => {
        S ||
          ((S = !0),
          e.updateMatch(t, (Z) => ({
            ...Z,
            isFetching: "beforeLoad",
            fetchCount: Z.fetchCount + 1,
            abortController: h,
            context: g,
          })));
      },
      _ = () => {
        (s._nonReactive.beforeLoadPromise?.resolve(),
          (s._nonReactive.beforeLoadPromise = void 0),
          e.updateMatch(t, (Z) => ({ ...Z, isFetching: !1 })));
      };
    if (!a.options.beforeLoad) {
      Ga(() => {
        (w(), _());
      });
      return;
    }
    s._nonReactive.beforeLoadPromise = ko();
    const { search: T, params: A, cause: N } = s,
      P = Fu(e, t),
      k = {
        search: T,
        abortController: h,
        params: A,
        preload: P,
        context: g,
        location: e.location,
        navigate: (Z) => e.router.navigate({ ...Z, _fromLocation: e.location }),
        buildLocation: e.router.buildLocation,
        cause: P ? "preload" : N,
        matches: e.matches,
        ...e.router.options.additionalContext,
      },
      H = (Z) => {
        if (Z === void 0) {
          Ga(() => {
            (w(), _());
          });
          return;
        }
        ((bn(Z) || wn(Z)) && (w(), ls(e, o, Z, "BEFORE_LOAD")),
          Ga(() => {
            (w(),
              e.updateMatch(t, (B) => ({
                ...B,
                __beforeLoadContext: Z,
                context: { ...B.context, ...Z },
              })),
              _());
          }));
      };
    let F;
    try {
      if (((F = a.options.beforeLoad(k)), Jr(F)))
        return (
          w(),
          F.catch((Z) => {
            ls(e, o, Z, "BEFORE_LOAD");
          }).then(H)
        );
    } catch (Z) {
      (w(), ls(e, o, Z, "BEFORE_LOAD"));
    }
    H(F);
  },
  mR = (e, t) => {
    const { id: o, routeId: a } = e.matches[t],
      s = e.router.looseRoutesById[a],
      u = () => {
        if (e.router.isServer) {
          const h = dR(e, o, t, s);
          if (Jr(h)) return h.then(f);
        }
        return f();
      },
      c = () => pR(e, o, t, s),
      f = () => {
        if (Ub(e, o)) return;
        const h = hR(e, o, s);
        return Jr(h) ? h.then(c) : c();
      };
    return u();
  },
  vs = (e, t, o) => {
    const a = e.router.getMatch(t);
    if (!a || (!o.options.head && !o.options.scripts && !o.options.headers))
      return;
    const s = {
      matches: e.matches,
      match: a,
      params: a.params,
      loaderData: a.loaderData,
    };
    return Promise.all([
      o.options.head?.(s),
      o.options.scripts?.(s),
      o.options.headers?.(s),
    ]).then(([u, c, f]) => {
      const h = u?.meta,
        p = u?.links,
        v = u?.scripts,
        y = u?.styles;
      return {
        meta: h,
        links: p,
        headScripts: v,
        headers: f,
        scripts: c,
        styles: y,
      };
    });
  },
  Ib = (e, t, o, a) => {
    const s = e.matchPromises[o - 1],
      {
        params: u,
        loaderDeps: c,
        abortController: f,
        cause: h,
      } = e.router.getMatch(t);
    let p = e.router.options.context ?? {};
    for (let y = 0; y <= o; y++) {
      const g = e.matches[y];
      if (!g) continue;
      const S = e.router.getMatch(g.id);
      S &&
        (p = {
          ...p,
          ...(S.__routeContext ?? {}),
          ...(S.__beforeLoadContext ?? {}),
        });
    }
    const v = Fu(e, t);
    return {
      params: u,
      deps: c,
      preload: !!v,
      parentMatchPromise: s,
      abortController: f,
      context: p,
      location: e.location,
      navigate: (y) => e.router.navigate({ ...y, _fromLocation: e.location }),
      cause: v ? "preload" : h,
      route: a,
      ...e.router.options.additionalContext,
    };
  },
  Ug = async (e, t, o, a) => {
    try {
      const s = e.router.getMatch(t);
      try {
        (!e.router.isServer || s.ssr === !0) && Hb(a);
        const u = a.options.loader?.(Ib(e, t, o, a)),
          c = a.options.loader && Jr(u);
        if (
          (!!(
            c ||
            a._lazyPromise ||
            a._componentsPromise ||
            a.options.head ||
            a.options.scripts ||
            a.options.headers ||
            s._nonReactive.minPendingPromise
          ) && e.updateMatch(t, (y) => ({ ...y, isFetching: "loader" })),
          a.options.loader)
        ) {
          const y = c ? await u : u;
          (Xr(e, e.router.getMatch(t), y),
            y !== void 0 && e.updateMatch(t, (g) => ({ ...g, loaderData: y })));
        }
        a._lazyPromise && (await a._lazyPromise);
        const h = vs(e, t, a),
          p = h ? await h : void 0,
          v = s._nonReactive.minPendingPromise;
        (v && (await v),
          a._componentsPromise && (await a._componentsPromise),
          e.updateMatch(t, (y) => ({
            ...y,
            error: void 0,
            status: "success",
            isFetching: !1,
            updatedAt: Date.now(),
            ...p,
          })));
      } catch (u) {
        let c = u;
        const f = s._nonReactive.minPendingPromise;
        (f && (await f),
          wn(u) && (await a.options.notFoundComponent?.preload?.()),
          Xr(e, e.router.getMatch(t), u));
        try {
          a.options.onError?.(u);
        } catch (v) {
          ((c = v), Xr(e, e.router.getMatch(t), v));
        }
        const h = vs(e, t, a),
          p = h ? await h : void 0;
        e.updateMatch(t, (v) => ({
          ...v,
          error: c,
          status: "error",
          isFetching: !1,
          ...p,
        }));
      }
    } catch (s) {
      const u = e.router.getMatch(t);
      if (u) {
        const c = vs(e, t, a);
        if (c) {
          const f = await c;
          e.updateMatch(t, (h) => ({ ...h, ...f }));
        }
        u._nonReactive.loaderPromise = void 0;
      }
      Xr(e, u, s);
    }
  },
  yR = async (e, t) => {
    const { id: o, routeId: a } = e.matches[t];
    let s = !1,
      u = !1;
    const c = e.router.looseRoutesById[a];
    if (Ub(e, o)) {
      if (e.router.isServer) {
        const p = vs(e, o, c);
        if (p) {
          const v = await p;
          e.updateMatch(o, (y) => ({ ...y, ...v }));
        }
        return e.router.getMatch(o);
      }
    } else {
      const p = e.router.getMatch(o);
      if (p._nonReactive.loaderPromise) {
        if (p.status === "success" && !e.sync && !p.preload) return p;
        await p._nonReactive.loaderPromise;
        const v = e.router.getMatch(o),
          y = v._nonReactive.error || v.error;
        y && Xr(e, v, y);
      } else {
        const v = Date.now() - p.updatedAt,
          y = Fu(e, o),
          g = y
            ? (c.options.preloadStaleTime ??
              e.router.options.defaultPreloadStaleTime ??
              3e4)
            : (c.options.staleTime ?? e.router.options.defaultStaleTime ?? 0),
          S = c.options.shouldReload,
          w = typeof S == "function" ? S(Ib(e, o, t, c)) : S,
          _ = !!y && !e.router.state.matches.some((P) => P.id === o),
          T = e.router.getMatch(o);
        ((T._nonReactive.loaderPromise = ko()),
          _ !== T.preload && e.updateMatch(o, (P) => ({ ...P, preload: _ })));
        const { status: A, invalid: N } = T;
        if (
          ((s = A === "success" && (N || (w ?? v > g))),
          !(y && c.options.preload === !1))
        )
          if (s && !e.sync)
            ((u = !0),
              (async () => {
                try {
                  await Ug(e, o, t, c);
                  const P = e.router.getMatch(o);
                  (P._nonReactive.loaderPromise?.resolve(),
                    P._nonReactive.loadPromise?.resolve(),
                    (P._nonReactive.loaderPromise = void 0));
                } catch (P) {
                  bn(P) && (await e.router.navigate(P.options));
                }
              })());
          else if (A !== "success" || (s && e.sync)) await Ug(e, o, t, c);
          else {
            const P = vs(e, o, c);
            if (P) {
              const k = await P;
              e.updateMatch(o, (H) => ({ ...H, ...k }));
            }
          }
      }
    }
    const f = e.router.getMatch(o);
    (u ||
      (f._nonReactive.loaderPromise?.resolve(),
      f._nonReactive.loadPromise?.resolve()),
      clearTimeout(f._nonReactive.pendingTimeout),
      (f._nonReactive.pendingTimeout = void 0),
      u || (f._nonReactive.loaderPromise = void 0),
      (f._nonReactive.dehydrated = void 0));
    const h = u ? f.isFetching : !1;
    return h !== f.isFetching || f.invalid !== !1
      ? (e.updateMatch(o, (p) => ({ ...p, isFetching: h, invalid: !1 })),
        e.router.getMatch(o))
      : f;
  };
async function Bg(e) {
  const t = Object.assign(e, { matchPromises: [] });
  !t.router.isServer &&
    t.router.state.matches.some((o) => o._forcePending) &&
    Tu(t);
  try {
    for (let s = 0; s < t.matches.length; s++) {
      const u = mR(t, s);
      Jr(u) && (await u);
    }
    const o = t.firstBadMatchIndex ?? t.matches.length;
    for (let s = 0; s < o; s++) t.matchPromises.push(yR(t, s));
    await Promise.all(t.matchPromises);
    const a = Tu(t);
    Jr(a) && (await a);
  } catch (o) {
    if (wn(o) && !t.preload) {
      const a = Tu(t);
      throw (Jr(a) && (await a), o);
    }
    if (bn(o)) throw o;
  }
  return t.matches;
}
async function Hb(e) {
  if (
    (!e._lazyLoaded &&
      e._lazyPromise === void 0 &&
      (e.lazyFn
        ? (e._lazyPromise = e.lazyFn().then((t) => {
            const { id: o, ...a } = t.options;
            (Object.assign(e.options, a),
              (e._lazyLoaded = !0),
              (e._lazyPromise = void 0));
          }))
        : (e._lazyLoaded = !0)),
    !e._componentsLoaded && e._componentsPromise === void 0)
  ) {
    const t = () => {
      const o = [];
      for (const a of Vb) {
        const s = e.options[a]?.preload;
        s && o.push(s());
      }
      if (o.length)
        return Promise.all(o).then(() => {
          ((e._componentsLoaded = !0), (e._componentsPromise = void 0));
        });
      ((e._componentsLoaded = !0), (e._componentsPromise = void 0));
    };
    e._componentsPromise = e._lazyPromise ? e._lazyPromise.then(t) : t();
  }
  return e._componentsPromise;
}
function iu(e, t) {
  return t ? { status: "error", error: t } : { status: "success", value: e };
}
function qb(e) {
  for (const t of Vb) if (e.options[t]?.preload) return !0;
  return !1;
}
const Vb = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent",
];
function vR(e) {
  return {
    input: ({ url: t }) => {
      for (const o of e) t = Zb(o, t);
      return t;
    },
    output: ({ url: t }) => {
      for (let o = e.length - 1; o >= 0; o--) t = $b(e[o], t);
      return t;
    },
  };
}
function gR(e) {
  const t = Ru(e.basepath),
    o = `/${t}`,
    a = `${o}/`,
    s = e.caseSensitive ? o : o.toLowerCase(),
    u = e.caseSensitive ? a : a.toLowerCase();
  return {
    input: ({ url: c }) => {
      const f = e.caseSensitive ? c.pathname : c.pathname.toLowerCase();
      return (
        f === s
          ? (c.pathname = "/")
          : f.startsWith(u) && (c.pathname = c.pathname.slice(o.length)),
        c
      );
    },
    output: ({ url: c }) => ((c.pathname = gr(["/", t, c.pathname])), c),
  };
}
function Zb(e, t) {
  const o = e?.input?.({ url: t });
  if (o) {
    if (typeof o == "string") return new URL(o);
    if (o instanceof URL) return o;
  }
  return t;
}
function $b(e, t) {
  const o = e?.output?.({ url: t });
  if (o) {
    if (typeof o == "string") return new URL(o);
    if (o instanceof URL) return o;
  }
  return t;
}
function bR(e) {
  return e instanceof Error
    ? { name: e.name, message: e.message }
    : { data: e };
}
function No(e) {
  const t = e.resolvedLocation,
    o = e.location,
    a = t?.pathname !== o.pathname,
    s = t?.href !== o.href,
    u = t?.hash !== o.hash;
  return {
    fromLocation: t,
    toLocation: o,
    pathChanged: a,
    hrefChanged: s,
    hashChanged: u,
  };
}
class SR {
  constructor(t) {
    ((this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
      (this.resetNextScroll = !0),
      (this.shouldViewTransition = void 0),
      (this.isViewTransitionTypesSupported = void 0),
      (this.subscribers = new Set()),
      (this.isScrollRestoring = !1),
      (this.isScrollRestorationSetup = !1),
      (this.startTransition = (o) => o()),
      (this.update = (o) => {
        o.notFoundRoute &&
          console.warn(
            "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.",
          );
        const a = this.options,
          s = this.basepath ?? a?.basepath ?? "/",
          u = this.basepath === void 0,
          c = a?.rewrite;
        ((this.options = { ...a, ...o }),
          (this.isServer = this.options.isServer ?? typeof document > "u"),
          (this.pathParamsDecodeCharMap = this.options
            .pathParamsAllowedCharacters
            ? new Map(
                this.options.pathParamsAllowedCharacters.map((g) => [
                  encodeURIComponent(g),
                  g,
                ]),
              )
            : void 0),
          (!this.history ||
            (this.options.history && this.options.history !== this.history)) &&
            (this.options.history
              ? (this.history = this.options.history)
              : this.isServer || (this.history = EE())),
          (this.origin = this.options.origin),
          this.origin ||
            (!this.isServer && window?.origin && window.origin !== "null"
              ? (this.origin = window.origin)
              : (this.origin = "http://localhost")),
          this.history && this.updateLatestLocation(),
          this.options.routeTree !== this.routeTree &&
            ((this.routeTree = this.options.routeTree), this.buildRouteTree()),
          !this.__store &&
            this.latestLocation &&
            ((this.__store = new _E(_R(this.latestLocation), {
              onUpdate: () => {
                this.__store.state = {
                  ...this.state,
                  cachedMatches: this.state.cachedMatches.filter(
                    (g) => !["redirected"].includes(g.status),
                  ),
                };
              },
            })),
            rR(this)));
        let f = !1;
        const h = this.options.basepath ?? "/",
          p = this.options.rewrite;
        if (u || s !== h || c !== p) {
          this.basepath = h;
          const g = [];
          (Ru(h) !== "" && g.push(gR({ basepath: h })),
            p && g.push(p),
            (this.rewrite =
              g.length === 0 ? void 0 : g.length === 1 ? g[0] : vR(g)),
            this.history && this.updateLatestLocation(),
            (f = !0));
        }
        (f &&
          this.__store &&
          (this.__store.state = {
            ...this.state,
            location: this.latestLocation,
          }),
          typeof window < "u" &&
            "CSS" in window &&
            typeof window.CSS?.supports == "function" &&
            (this.isViewTransitionTypesSupported = window.CSS.supports(
              "selector(:active-view-transition-type(a)",
            )));
      }),
      (this.updateLatestLocation = () => {
        this.latestLocation = this.parseLocation(
          this.history.location,
          this.latestLocation,
        );
      }),
      (this.buildRouteTree = () => {
        const {
          routesById: o,
          routesByPath: a,
          flatRoutes: s,
        } = WE({
          routeTree: this.routeTree,
          initRoute: (c, f) => {
            c.init({ originalIndex: f });
          },
        });
        ((this.routesById = o), (this.routesByPath = a), (this.flatRoutes = s));
        const u = this.options.notFoundRoute;
        u &&
          (u.init({ originalIndex: 99999999999 }), (this.routesById[u.id] = u));
      }),
      (this.subscribe = (o, a) => {
        const s = { eventType: o, fn: a };
        return (
          this.subscribers.add(s),
          () => {
            this.subscribers.delete(s);
          }
        );
      }),
      (this.emit = (o) => {
        this.subscribers.forEach((a) => {
          a.eventType === o.type && a.fn(o);
        });
      }),
      (this.parseLocation = (o, a) => {
        const s = ({ href: h, state: p }) => {
            const v = new URL(h, this.origin),
              y = Zb(this.rewrite, v),
              g = this.options.parseSearch(y.search),
              S = this.options.stringifySearch(g);
            y.search = S;
            const w = y.href.replace(y.origin, ""),
              { pathname: _, hash: T } = y;
            return {
              href: w,
              publicHref: h,
              url: y.href,
              pathname: jg(_),
              searchStr: S,
              search: gn(a?.search, g),
              hash: T.split("#").reverse()[0] ?? "",
              state: gn(a?.state, p),
            };
          },
          u = s(o),
          { __tempLocation: c, __tempKey: f } = u.state;
        if (c && (!f || f === this.tempLocationKey)) {
          const h = s(c);
          return (
            (h.state.key = u.state.key),
            (h.state.__TSR_key = u.state.__TSR_key),
            delete h.state.__tempLocation,
            { ...h, maskedLocation: u }
          );
        }
        return u;
      }),
      (this.resolvePathWithBase = (o, a) =>
        zE({
          base: o,
          to: Gh(a),
          trailingSlash: this.options.trailingSlash,
          parseCache: this.parsePathnameCache,
        })),
      (this.matchRoutes = (o, a, s) =>
        typeof o == "string"
          ? this.matchRoutesInternal({ pathname: o, search: a }, s)
          : this.matchRoutesInternal(o, a)),
      (this.parsePathnameCache = fR(1e3)),
      (this.getMatchedRoutes = (o, a) =>
        xR({
          pathname: o,
          routePathname: a,
          caseSensitive: this.options.caseSensitive,
          routesByPath: this.routesByPath,
          routesById: this.routesById,
          flatRoutes: this.flatRoutes,
          parseCache: this.parsePathnameCache,
        })),
      (this.cancelMatch = (o) => {
        const a = this.getMatch(o);
        a &&
          (a.abortController.abort(),
          clearTimeout(a._nonReactive.pendingTimeout),
          (a._nonReactive.pendingTimeout = void 0));
      }),
      (this.cancelMatches = () => {
        const o = this.state.matches.filter((u) => u.status === "pending"),
          a = this.state.matches.filter((u) => u.isFetching === "loader");
        new Set([...(this.state.pendingMatches ?? []), ...o, ...a]).forEach(
          (u) => {
            this.cancelMatch(u.id);
          },
        );
      }),
      (this.buildLocation = (o) => {
        const a = (u = {}) => {
            const c =
                u._fromLocation ||
                this.pendingBuiltLocation ||
                this.latestLocation,
              f = this.matchRoutes(c, { _buildLocation: !0 }),
              h = lh(f);
            u.from;
            const p =
                u.unsafeRelative === "path"
                  ? c.pathname
                  : (u.from ?? h.fullPath),
              v = this.resolvePathWithBase(p, "."),
              y = h.search,
              g = { ...h.params },
              S = u.to
                ? this.resolvePathWithBase(v, `${u.to}`)
                : this.resolvePathWithBase(v, "."),
              w =
                u.params === !1 || u.params === null
                  ? {}
                  : (u.params ?? !0) === !0
                    ? g
                    : Object.assign(g, Po(u.params, g)),
              _ = Dd({
                path: S,
                params: w,
                parseCache: this.parsePathnameCache,
              }).interpolatedPath,
              T = this.matchRoutes(_, void 0, { _buildLocation: !0 }).map(
                (ae) => this.looseRoutesById[ae.routeId],
              );
            if (Object.keys(w).length > 0)
              for (const ae of T) {
                const he =
                  ae.options.params?.stringify ?? ae.options.stringifyParams;
                he && Object.assign(w, he(w));
              }
            const A = jg(
              Dd({
                path: S,
                params: w,
                leaveParams: o.leaveParams,
                decodeCharMap: this.pathParamsDecodeCharMap,
                parseCache: this.parsePathnameCache,
              }).interpolatedPath,
            );
            let N = y;
            if (o._includeValidateSearch && this.options.search?.strict) {
              const ae = {};
              (T.forEach((he) => {
                if (he.options.validateSearch)
                  try {
                    Object.assign(
                      ae,
                      fh(he.options.validateSearch, { ...ae, ...N }),
                    );
                  } catch {}
              }),
                (N = ae));
            }
            ((N = ER({
              search: N,
              dest: u,
              destRoutes: T,
              _includeValidateSearch: o._includeValidateSearch,
            })),
              (N = gn(y, N)));
            const P = this.options.stringifySearch(N),
              k = u.hash === !0 ? c.hash : u.hash ? Po(u.hash, c.hash) : void 0,
              H = k ? `#${k}` : "";
            let F =
              u.state === !0 ? c.state : u.state ? Po(u.state, c.state) : {};
            F = gn(c.state, F);
            const Z = `${A}${P}${H}`,
              B = new URL(Z, this.origin),
              re = $b(this.rewrite, B);
            return {
              publicHref: re.pathname + re.search + re.hash,
              href: Z,
              url: re.href,
              pathname: A,
              search: N,
              searchStr: P,
              state: F,
              hash: k ?? "",
              unmaskOnReload: u.unmaskOnReload,
            };
          },
          s = (u = {}, c) => {
            const f = a(u);
            let h = c ? a(c) : void 0;
            if (!h) {
              let p = {};
              const v = this.options.routeMasks?.find((y) => {
                const g = uh(
                  f.pathname,
                  { to: y.from, caseSensitive: !1, fuzzy: !1 },
                  this.parsePathnameCache,
                );
                return g ? ((p = g), !0) : !1;
              });
              if (v) {
                const { from: y, ...g } = v;
                ((c = { from: o.from, ...g, params: p }), (h = a(c)));
              }
            }
            return (h && (f.maskedLocation = h), f);
          };
        return o.mask ? s(o, { from: o.from, ...o.mask }) : s(o);
      }),
      (this.commitLocation = ({
        viewTransition: o,
        ignoreBlocker: a,
        ...s
      }) => {
        const u = () => {
            const h = [
              "key",
              "__TSR_key",
              "__TSR_index",
              "__hashScrollIntoViewOptions",
            ];
            h.forEach((v) => {
              s.state[v] = this.latestLocation.state[v];
            });
            const p = jo(s.state, this.latestLocation.state);
            return (
              h.forEach((v) => {
                delete s.state[v];
              }),
              p
            );
          },
          c = eo(this.latestLocation.href) === eo(s.href),
          f = this.commitLocationPromise;
        if (
          ((this.commitLocationPromise = ko(() => {
            f?.resolve();
          })),
          c && u())
        )
          this.load();
        else {
          let { maskedLocation: h, hashScrollIntoView: p, ...v } = s;
          (h &&
            ((v = {
              ...h,
              state: {
                ...h.state,
                __tempKey: void 0,
                __tempLocation: {
                  ...v,
                  search: v.searchStr,
                  state: {
                    ...v.state,
                    __tempKey: void 0,
                    __tempLocation: void 0,
                    __TSR_key: void 0,
                    key: void 0,
                  },
                },
              },
            }),
            (v.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
              (v.state.__tempKey = this.tempLocationKey)),
            (v.state.__hashScrollIntoViewOptions =
              p ?? this.options.defaultHashScrollIntoView ?? !0),
            (this.shouldViewTransition = o),
            this.history[s.replace ? "replace" : "push"](
              v.publicHref,
              v.state,
              { ignoreBlocker: a },
            ));
        }
        return (
          (this.resetNextScroll = s.resetScroll ?? !0),
          this.history.subscribers.size || this.load(),
          this.commitLocationPromise
        );
      }),
      (this.buildAndCommitLocation = ({
        replace: o,
        resetScroll: a,
        hashScrollIntoView: s,
        viewTransition: u,
        ignoreBlocker: c,
        href: f,
        ...h
      } = {}) => {
        if (f) {
          const y = this.history.location.state.__TSR_index,
            g = ju(f, { __TSR_index: o ? y : y + 1 });
          ((h.to = g.pathname),
            (h.search = this.options.parseSearch(g.search)),
            (h.hash = g.hash.slice(1)));
        }
        const p = this.buildLocation({ ...h, _includeValidateSearch: !0 });
        this.pendingBuiltLocation = p;
        const v = this.commitLocation({
          ...p,
          viewTransition: u,
          replace: o,
          resetScroll: a,
          hashScrollIntoView: s,
          ignoreBlocker: c,
        });
        return (
          Promise.resolve().then(() => {
            this.pendingBuiltLocation === p &&
              (this.pendingBuiltLocation = void 0);
          }),
          v
        );
      }),
      (this.navigate = ({ to: o, reloadDocument: a, href: s, ...u }) => {
        if (!a && s)
          try {
            (new URL(`${s}`), (a = !0));
          } catch {}
        return a
          ? (s || (s = this.buildLocation({ to: o, ...u }).url),
            u.replace ? window.location.replace(s) : (window.location.href = s),
            Promise.resolve())
          : this.buildAndCommitLocation({
              ...u,
              href: s,
              to: o,
              _isNavigate: !0,
            });
      }),
      (this.beforeLoad = () => {
        if (
          (this.cancelMatches(), this.updateLatestLocation(), this.isServer)
        ) {
          const a = this.buildLocation({
              to: this.latestLocation.pathname,
              search: !0,
              params: !0,
              hash: !0,
              state: !0,
              _includeValidateSearch: !0,
            }),
            s = (u) => {
              try {
                return encodeURI(decodeURI(u));
              } catch {
                return u;
              }
            };
          if (Ru(s(this.latestLocation.href)) !== Ru(s(a.href))) {
            let u = a.url;
            throw (
              this.origin &&
                u.startsWith(this.origin) &&
                (u = u.replace(this.origin, "") || "/"),
              kb({ href: u })
            );
          }
        }
        const o = this.matchRoutes(this.latestLocation);
        this.__store.setState((a) => ({
          ...a,
          status: "pending",
          statusCode: 200,
          isLoading: !0,
          location: this.latestLocation,
          pendingMatches: o,
          cachedMatches: a.cachedMatches.filter(
            (s) => !o.some((u) => u.id === s.id),
          ),
        }));
      }),
      (this.load = async (o) => {
        let a, s, u;
        for (
          u = new Promise((f) => {
            this.startTransition(async () => {
              try {
                this.beforeLoad();
                const h = this.latestLocation,
                  p = this.state.resolvedLocation;
                (this.state.redirect ||
                  this.emit({
                    type: "onBeforeNavigate",
                    ...No({ resolvedLocation: p, location: h }),
                  }),
                  this.emit({
                    type: "onBeforeLoad",
                    ...No({ resolvedLocation: p, location: h }),
                  }),
                  await Bg({
                    router: this,
                    sync: o?.sync,
                    matches: this.state.pendingMatches,
                    location: h,
                    updateMatch: this.updateMatch,
                    onReady: async () => {
                      this.startTransition(() => {
                        this.startViewTransition(async () => {
                          let v = [],
                            y = [],
                            g = [];
                          (Ga(() => {
                            (this.__store.setState((S) => {
                              const w = S.matches,
                                _ = S.pendingMatches || S.matches;
                              return (
                                (v = w.filter(
                                  (T) => !_.some((A) => A.id === T.id),
                                )),
                                (y = _.filter(
                                  (T) => !w.some((A) => A.id === T.id),
                                )),
                                (g = _.filter((T) =>
                                  w.some((A) => A.id === T.id),
                                )),
                                {
                                  ...S,
                                  isLoading: !1,
                                  loadedAt: Date.now(),
                                  matches: _,
                                  pendingMatches: void 0,
                                  cachedMatches: [
                                    ...S.cachedMatches,
                                    ...v.filter((T) => T.status !== "error"),
                                  ],
                                }
                              );
                            }),
                              this.clearExpiredCache());
                          }),
                            [
                              [v, "onLeave"],
                              [y, "onEnter"],
                              [g, "onStay"],
                            ].forEach(([S, w]) => {
                              S.forEach((_) => {
                                this.looseRoutesById[_.routeId].options[w]?.(_);
                              });
                            }));
                        });
                      });
                    },
                  }));
              } catch (h) {
                (bn(h)
                  ? ((a = h),
                    this.isServer ||
                      this.navigate({
                        ...a.options,
                        replace: !0,
                        ignoreBlocker: !0,
                      }))
                  : wn(h) && (s = h),
                  this.__store.setState((p) => ({
                    ...p,
                    statusCode: a
                      ? a.status
                      : s
                        ? 404
                        : p.matches.some((v) => v.status === "error")
                          ? 500
                          : 200,
                    redirect: a,
                  })));
              }
              (this.latestLoadPromise === u &&
                (this.commitLocationPromise?.resolve(),
                (this.latestLoadPromise = void 0),
                (this.commitLocationPromise = void 0)),
                f());
            });
          }),
            this.latestLoadPromise = u,
            await u;
          this.latestLoadPromise && u !== this.latestLoadPromise;

        )
          await this.latestLoadPromise;
        let c;
        (this.hasNotFoundMatch()
          ? (c = 404)
          : this.__store.state.matches.some((f) => f.status === "error") &&
            (c = 500),
          c !== void 0 &&
            this.__store.setState((f) => ({ ...f, statusCode: c })));
      }),
      (this.startViewTransition = (o) => {
        const a =
          this.shouldViewTransition ?? this.options.defaultViewTransition;
        if (
          (delete this.shouldViewTransition,
          a &&
            typeof document < "u" &&
            "startViewTransition" in document &&
            typeof document.startViewTransition == "function")
        ) {
          let s;
          if (typeof a == "object" && this.isViewTransitionTypesSupported) {
            const u = this.latestLocation,
              c = this.state.resolvedLocation,
              f =
                typeof a.types == "function"
                  ? a.types(No({ resolvedLocation: c, location: u }))
                  : a.types;
            if (f === !1) {
              o();
              return;
            }
            s = { update: o, types: f };
          } else s = o;
          document.startViewTransition(s);
        } else o();
      }),
      (this.updateMatch = (o, a) => {
        this.startTransition(() => {
          const s = this.state.pendingMatches?.some((u) => u.id === o)
            ? "pendingMatches"
            : this.state.matches.some((u) => u.id === o)
              ? "matches"
              : this.state.cachedMatches.some((u) => u.id === o)
                ? "cachedMatches"
                : "";
          s &&
            this.__store.setState((u) => ({
              ...u,
              [s]: u[s]?.map((c) => (c.id === o ? a(c) : c)),
            }));
        });
      }),
      (this.getMatch = (o) => {
        const a = (s) => s.id === o;
        return (
          this.state.cachedMatches.find(a) ??
          this.state.pendingMatches?.find(a) ??
          this.state.matches.find(a)
        );
      }),
      (this.invalidate = (o) => {
        const a = (s) =>
          (o?.filter?.(s) ?? !0)
            ? {
                ...s,
                invalid: !0,
                ...(o?.forcePending || s.status === "error"
                  ? { status: "pending", error: void 0 }
                  : void 0),
              }
            : s;
        return (
          this.__store.setState((s) => ({
            ...s,
            matches: s.matches.map(a),
            cachedMatches: s.cachedMatches.map(a),
            pendingMatches: s.pendingMatches?.map(a),
          })),
          (this.shouldViewTransition = !1),
          this.load({ sync: o?.sync })
        );
      }),
      (this.resolveRedirect = (o) => {
        if (!o.options.href) {
          const a = this.buildLocation(o.options);
          let s = a.url;
          (this.origin &&
            s.startsWith(this.origin) &&
            (s = s.replace(this.origin, "") || "/"),
            (o.options.href = a.href),
            o.headers.set("Location", s));
        }
        return (
          o.headers.get("Location") ||
            o.headers.set("Location", o.options.href),
          o
        );
      }),
      (this.clearCache = (o) => {
        const a = o?.filter;
        a !== void 0
          ? this.__store.setState((s) => ({
              ...s,
              cachedMatches: s.cachedMatches.filter((u) => !a(u)),
            }))
          : this.__store.setState((s) => ({ ...s, cachedMatches: [] }));
      }),
      (this.clearExpiredCache = () => {
        const o = (a) => {
          const s = this.looseRoutesById[a.routeId];
          if (!s.options.loader) return !0;
          const u =
            (a.preload
              ? (s.options.preloadGcTime ?? this.options.defaultPreloadGcTime)
              : (s.options.gcTime ?? this.options.defaultGcTime)) ?? 300 * 1e3;
          return a.status === "error" ? !0 : Date.now() - a.updatedAt >= u;
        };
        this.clearCache({ filter: o });
      }),
      (this.loadRouteChunk = Hb),
      (this.preloadRoute = async (o) => {
        const a = this.buildLocation(o);
        let s = this.matchRoutes(a, { throwOnError: !0, preload: !0, dest: o });
        const u = new Set(
            [...this.state.matches, ...(this.state.pendingMatches ?? [])].map(
              (f) => f.id,
            ),
          ),
          c = new Set([...u, ...this.state.cachedMatches.map((f) => f.id)]);
        Ga(() => {
          s.forEach((f) => {
            c.has(f.id) ||
              this.__store.setState((h) => ({
                ...h,
                cachedMatches: [...h.cachedMatches, f],
              }));
          });
        });
        try {
          return (
            (s = await Bg({
              router: this,
              matches: s,
              location: a,
              preload: !0,
              updateMatch: (f, h) => {
                u.has(f)
                  ? (s = s.map((p) => (p.id === f ? h(p) : p)))
                  : this.updateMatch(f, h);
              },
            })),
            s
          );
        } catch (f) {
          if (bn(f))
            return f.options.reloadDocument
              ? void 0
              : await this.preloadRoute({ ...f.options, _fromLocation: a });
          wn(f) || console.error(f);
          return;
        }
      }),
      (this.matchRoute = (o, a) => {
        const s = {
            ...o,
            to: o.to ? this.resolvePathWithBase(o.from || "", o.to) : void 0,
            params: o.params || {},
            leaveParams: !0,
          },
          u = this.buildLocation(s);
        if (a?.pending && this.state.status !== "pending") return !1;
        const f = (a?.pending === void 0 ? !this.state.isLoading : a.pending)
            ? this.latestLocation
            : this.state.resolvedLocation || this.state.location,
          h = uh(f.pathname, { ...a, to: u.pathname }, this.parsePathnameCache);
        return !h || (o.params && !jo(h, o.params, { partial: !0 }))
          ? !1
          : h && (a?.includeSearch ?? !0)
            ? jo(f.search, u.search, { partial: !0 })
              ? h
              : !1
            : h;
      }),
      (this.hasNotFoundMatch = () =>
        this.__store.state.matches.some(
          (o) => o.status === "notFound" || o.globalNotFound,
        )),
      this.update({
        defaultPreloadDelay: 50,
        defaultPendingMs: 1e3,
        defaultPendingMinMs: 500,
        context: void 0,
        ...t,
        caseSensitive: t.caseSensitive ?? !1,
        notFoundMode: t.notFoundMode ?? "fuzzy",
        stringifySearch: t.stringifySearch ?? sR,
        parseSearch: t.parseSearch ?? iR,
      }),
      typeof document < "u" && (self.__TSR_ROUTER__ = this));
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutesInternal(t, o) {
    const {
      foundRoute: a,
      matchedRoutes: s,
      routeParams: u,
    } = this.getMatchedRoutes(t.pathname, o?.dest?.to);
    let c = !1;
    (a ? a.path !== "/" && u["**"] : eo(t.pathname)) &&
      (this.options.notFoundRoute
        ? s.push(this.options.notFoundRoute)
        : (c = !0));
    const f = (() => {
        if (c) {
          if (this.options.notFoundMode !== "root")
            for (let v = s.length - 1; v >= 0; v--) {
              const y = s[v];
              if (y.children) return y.id;
            }
          return on;
        }
      })(),
      h = [],
      p = (v) =>
        v?.id
          ? (v.context ?? this.options.context ?? void 0)
          : (this.options.context ?? void 0);
    return (
      s.forEach((v, y) => {
        const g = h[y - 1],
          [S, w, _] = (() => {
            const se = g?.search ?? t.search,
              ve = g?._strictSearch ?? void 0;
            try {
              const me = fh(v.options.validateSearch, { ...se }) ?? void 0;
              return [{ ...se, ...me }, { ...ve, ...me }, void 0];
            } catch (me) {
              let ye = me;
              if (
                (me instanceof Uu || (ye = new Uu(me.message, { cause: me })),
                o?.throwOnError)
              )
                throw ye;
              return [se, {}, ye];
            }
          })(),
          T = v.options.loaderDeps?.({ search: S }) ?? "",
          A = T ? JSON.stringify(T) : "",
          { interpolatedPath: N, usedParams: P } = Dd({
            path: v.fullPath,
            params: u,
            decodeCharMap: this.pathParamsDecodeCharMap,
          }),
          k = v.id + N + A,
          H = this.getMatch(k),
          F = this.state.matches.find((se) => se.routeId === v.id),
          Z = H?._strictParams ?? P;
        let B;
        if (!H) {
          const se = v.options.params?.parse ?? v.options.parseParams;
          if (se)
            try {
              Object.assign(Z, se(Z));
            } catch (ve) {
              if (((B = new wR(ve.message, { cause: ve })), o?.throwOnError))
                throw B;
            }
        }
        Object.assign(u, Z);
        const re = F ? "stay" : "enter";
        let ae;
        if (H)
          ae = {
            ...H,
            cause: re,
            params: F ? gn(F.params, u) : u,
            _strictParams: Z,
            search: gn(F ? F.search : H.search, S),
            _strictSearch: w,
          };
        else {
          const se =
            v.options.loader || v.options.beforeLoad || v.lazyFn || qb(v)
              ? "pending"
              : "success";
          ae = {
            id: k,
            index: y,
            routeId: v.id,
            params: F ? gn(F.params, u) : u,
            _strictParams: Z,
            pathname: N,
            updatedAt: Date.now(),
            search: F ? gn(F.search, S) : S,
            _strictSearch: w,
            searchError: void 0,
            status: se,
            isFetching: !1,
            error: void 0,
            paramsError: B,
            __routeContext: void 0,
            _nonReactive: { loadPromise: ko() },
            __beforeLoadContext: void 0,
            context: {},
            abortController: new AbortController(),
            fetchCount: 0,
            cause: re,
            loaderDeps: F ? gn(F.loaderDeps, T) : T,
            invalid: !1,
            preload: !1,
            links: void 0,
            scripts: void 0,
            headScripts: void 0,
            meta: void 0,
            staticData: v.options.staticData || {},
            fullPath: v.fullPath,
          };
        }
        (o?.preload || (ae.globalNotFound = f === v.id), (ae.searchError = _));
        const he = p(g);
        ((ae.context = {
          ...he,
          ...ae.__routeContext,
          ...ae.__beforeLoadContext,
        }),
          h.push(ae));
      }),
      h.forEach((v, y) => {
        const g = this.looseRoutesById[v.routeId];
        if (!this.getMatch(v.id) && o?._buildLocation !== !0) {
          const w = h[y - 1],
            _ = p(w);
          if (g.options.context) {
            const T = {
              deps: v.loaderDeps,
              params: v.params,
              context: _ ?? {},
              location: t,
              navigate: (A) => this.navigate({ ...A, _fromLocation: t }),
              buildLocation: this.buildLocation,
              cause: v.cause,
              abortController: v.abortController,
              preload: !!v.preload,
              matches: h,
            };
            v.__routeContext = g.options.context(T) ?? void 0;
          }
          v.context = { ..._, ...v.__routeContext, ...v.__beforeLoadContext };
        }
      }),
      h
    );
  }
}
class Uu extends Error {}
class wR extends Error {}
function _R(e) {
  return {
    loadedAt: 0,
    isLoading: !1,
    isTransitioning: !1,
    status: "idle",
    resolvedLocation: void 0,
    location: e,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200,
  };
}
function fh(e, t) {
  if (e == null) return {};
  if ("~standard" in e) {
    const o = e["~standard"].validate(t);
    if (o instanceof Promise) throw new Uu("Async validation not supported");
    if (o.issues)
      throw new Uu(JSON.stringify(o.issues, void 0, 2), { cause: o });
    return o.value;
  }
  return "parse" in e ? e.parse(t) : typeof e == "function" ? e(t) : {};
}
function xR({
  pathname: e,
  routePathname: t,
  caseSensitive: o,
  routesByPath: a,
  routesById: s,
  flatRoutes: u,
  parseCache: c,
}) {
  let f = {};
  const h = eo(e),
    p = (S) =>
      uh(
        h,
        {
          to: S.fullPath,
          caseSensitive: S.options?.caseSensitive ?? o,
          fuzzy: !0,
        },
        c,
      );
  let v = t !== void 0 ? a[t] : void 0;
  if (v) f = p(v);
  else {
    let S;
    for (const w of u) {
      const _ = p(w);
      if (_)
        if (w.path !== "/" && _["**"])
          S || (S = { foundRoute: w, routeParams: _ });
        else {
          ((v = w), (f = _));
          break;
        }
    }
    !v && S && ((v = S.foundRoute), (f = S.routeParams));
  }
  let y = v || s[on];
  const g = [y];
  for (; y.parentRoute; ) ((y = y.parentRoute), g.push(y));
  return (g.reverse(), { matchedRoutes: g, routeParams: f, foundRoute: v });
}
function ER({ search: e, dest: t, destRoutes: o, _includeValidateSearch: a }) {
  const s =
      o.reduce((f, h) => {
        const p = [];
        if ("search" in h.options)
          h.options.search?.middlewares &&
            p.push(...h.options.search.middlewares);
        else if (h.options.preSearchFilters || h.options.postSearchFilters) {
          const v = ({ search: y, next: g }) => {
            let S = y;
            "preSearchFilters" in h.options &&
              h.options.preSearchFilters &&
              (S = h.options.preSearchFilters.reduce((_, T) => T(_), y));
            const w = g(S);
            return "postSearchFilters" in h.options &&
              h.options.postSearchFilters
              ? h.options.postSearchFilters.reduce((_, T) => T(_), w)
              : w;
          };
          p.push(v);
        }
        if (a && h.options.validateSearch) {
          const v = ({ search: y, next: g }) => {
            const S = g(y);
            try {
              return { ...S, ...(fh(h.options.validateSearch, S) ?? void 0) };
            } catch {
              return S;
            }
          };
          p.push(v);
        }
        return f.concat(p);
      }, []) ?? [],
    u = ({ search: f }) =>
      t.search ? (t.search === !0 ? f : Po(t.search, f)) : {};
  s.push(u);
  const c = (f, h) => {
    if (f >= s.length) return h;
    const p = s[f];
    return p({ search: h, next: (y) => c(f + 1, y) });
  };
  return c(0, e);
}
const Hn = Symbol.for("TSR_DEFERRED_PROMISE");
function RR(e, t) {
  const o = e;
  return (
    o[Hn] ||
      ((o[Hn] = { status: "pending" }),
      o
        .then((a) => {
          ((o[Hn].status = "success"), (o[Hn].data = a));
        })
        .catch((a) => {
          ((o[Hn].status = "error"),
            (o[Hn].error = { data: bR(a), __isServerError: !0 }));
        })),
    o
  );
}
const TR = "Error preloading route! ☝️";
class Gb {
  constructor(t) {
    if (
      ((this.init = (o) => {
        this.originalIndex = o.originalIndex;
        const a = this.options,
          s = !a?.path && !a?.id;
        ((this.parentRoute = this.options.getParentRoute?.()),
          s ? (this._path = on) : this.parentRoute || Yt(!1));
        let u = s ? on : a?.path;
        u && u !== "/" && (u = Fh(u));
        const c = a?.id || u;
        let f = s
          ? on
          : gr([this.parentRoute.id === on ? "" : this.parentRoute.id, c]);
        (u === on && (u = "/"), f !== on && (f = gr(["/", f])));
        const h = f === on ? "/" : gr([this.parentRoute.fullPath, u]);
        ((this._path = u),
          (this._id = f),
          (this._fullPath = h),
          (this._to = h));
      }),
      (this.addChildren = (o) => this._addFileChildren(o)),
      (this._addFileChildren = (o) => (
        Array.isArray(o) && (this.children = o),
        typeof o == "object" &&
          o !== null &&
          (this.children = Object.values(o)),
        this
      )),
      (this._addFileTypes = () => this),
      (this.updateLoader = (o) => (Object.assign(this.options, o), this)),
      (this.update = (o) => (Object.assign(this.options, o), this)),
      (this.lazy = (o) => ((this.lazyFn = o), this)),
      (this.options = t || {}),
      (this.isRoot = !t?.getParentRoute),
      t?.id && t?.path)
    )
      throw new Error("Route cannot have both an 'id' and a 'path' option.");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class CR extends Gb {
  constructor(t) {
    super(t);
  }
}
var OR = ((e) => (
  (e[(e.AggregateError = 1)] = "AggregateError"),
  (e[(e.ArrowFunction = 2)] = "ArrowFunction"),
  (e[(e.ErrorPrototypeStack = 4)] = "ErrorPrototypeStack"),
  (e[(e.ObjectAssign = 8)] = "ObjectAssign"),
  (e[(e.BigIntTypedArray = 16)] = "BigIntTypedArray"),
  e
))(OR || {});
function AR(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return;
  }
}
function ao(e) {
  let t = "",
    o = 0,
    a;
  for (let s = 0, u = e.length; s < u; s++)
    ((a = AR(e[s])), a && ((t += e.slice(o, s) + a), (o = s + 1)));
  return (o === 0 ? (t = e) : (t += e.slice(o)), t);
}
function MR(e) {
  switch (e) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return e;
  }
}
function Mo(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, MR);
}
var su = "__SEROVAL_REFS__";
function Qr(e, t) {
  if (!e) throw t;
}
var Fb = new Map(),
  Va = new Map();
function Yb(e) {
  return Fb.has(e);
}
function DR(e) {
  return Va.has(e);
}
function zR(e) {
  return (Qr(Yb(e), new g2(e)), Fb.get(e));
}
function PR(e) {
  return (Qr(DR(e), new b2(e)), Va.get(e));
}
typeof globalThis < "u"
  ? Object.defineProperty(globalThis, su, {
      value: Va,
      configurable: !0,
      writable: !1,
      enumerable: !1,
    })
  : typeof window < "u"
    ? Object.defineProperty(window, su, {
        value: Va,
        configurable: !0,
        writable: !1,
        enumerable: !1,
      })
    : typeof self < "u"
      ? Object.defineProperty(self, su, {
          value: Va,
          configurable: !0,
          writable: !1,
          enumerable: !1,
        })
      : typeof global < "u" &&
        Object.defineProperty(global, su, {
          value: Va,
          configurable: !0,
          writable: !1,
          enumerable: !1,
        });
function Kb(e, t) {
  for (let o = 0, a = t.length; o < a; o++) {
    let s = t[o];
    e.has(s) || (e.add(s), s.extends && Kb(e, s.extends));
  }
}
function Qb(e) {
  if (e) {
    let t = new Set();
    return (Kb(t, e), [...t]);
  }
}
var Xb = {
    [Symbol.asyncIterator]: 0,
    [Symbol.hasInstance]: 1,
    [Symbol.isConcatSpreadable]: 2,
    [Symbol.iterator]: 3,
    [Symbol.match]: 4,
    [Symbol.matchAll]: 5,
    [Symbol.replace]: 6,
    [Symbol.search]: 7,
    [Symbol.species]: 8,
    [Symbol.split]: 9,
    [Symbol.toPrimitive]: 10,
    [Symbol.toStringTag]: 11,
    [Symbol.unscopables]: 12,
  },
  jR = {
    0: Symbol.asyncIterator,
    1: Symbol.hasInstance,
    2: Symbol.isConcatSpreadable,
    3: Symbol.iterator,
    4: Symbol.match,
    5: Symbol.matchAll,
    6: Symbol.replace,
    7: Symbol.search,
    8: Symbol.species,
    9: Symbol.split,
    10: Symbol.toPrimitive,
    11: Symbol.toStringTag,
    12: Symbol.unscopables,
  },
  NR = {
    2: !0,
    3: !1,
    1: void 0,
    0: null,
    4: -0,
    5: Number.POSITIVE_INFINITY,
    6: Number.NEGATIVE_INFINITY,
    7: Number.NaN,
  },
  kR = {
    0: "Error",
    1: "EvalError",
    2: "RangeError",
    3: "ReferenceError",
    4: "SyntaxError",
    5: "TypeError",
    6: "URIError",
  },
  LR = {
    0: Error,
    1: EvalError,
    2: RangeError,
    3: ReferenceError,
    4: SyntaxError,
    5: TypeError,
    6: URIError,
  },
  R = void 0;
function je(e, t, o, a, s, u, c, f, h, p, v, y) {
  return {
    t: e,
    i: t,
    s: o,
    l: a,
    c: s,
    m: u,
    p: c,
    e: f,
    a: h,
    f: p,
    b: v,
    o: y,
  };
}
function io(e) {
  return je(2, R, e, R, R, R, R, R, R, R, R, R);
}
var Ig = io(2),
  Hg = io(3),
  UR = io(1),
  BR = io(0),
  IR = io(4),
  HR = io(5),
  qR = io(6),
  VR = io(7);
function Yh(e) {
  return e instanceof EvalError
    ? 1
    : e instanceof RangeError
      ? 2
      : e instanceof ReferenceError
        ? 3
        : e instanceof SyntaxError
          ? 4
          : e instanceof TypeError
            ? 5
            : e instanceof URIError
              ? 6
              : 0;
}
function ZR(e) {
  let t = kR[Yh(e)];
  return e.name !== t
    ? { name: e.name }
    : e.constructor.name !== t
      ? { name: e.constructor.name }
      : {};
}
function qg(e, t) {
  let o = ZR(e),
    a = Object.getOwnPropertyNames(e);
  for (let s = 0, u = a.length, c; s < u; s++)
    ((c = a[s]),
      c !== "name" &&
        c !== "message" &&
        (c === "stack"
          ? t & 4 && ((o = o || {}), (o[c] = e[c]))
          : ((o = o || {}), (o[c] = e[c]))));
  return o;
}
function Wb(e) {
  return Object.isFrozen(e)
    ? 3
    : Object.isSealed(e)
      ? 2
      : Object.isExtensible(e)
        ? 0
        : 1;
}
function $R(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return HR;
    case Number.NEGATIVE_INFINITY:
      return qR;
  }
  return e !== e
    ? VR
    : Object.is(e, -0)
      ? IR
      : je(0, R, e, R, R, R, R, R, R, R, R, R);
}
function Vg(e) {
  return je(1, R, ao(e), R, R, R, R, R, R, R, R, R);
}
function GR(e) {
  return je(3, R, "" + e, R, R, R, R, R, R, R, R, R);
}
function FR(e) {
  return je(4, e, R, R, R, R, R, R, R, R, R, R);
}
function YR(e, t) {
  let o = t.valueOf();
  return je(5, e, o !== o ? "" : t.toISOString(), R, R, R, R, R, R, R, R, R);
}
function KR(e, t) {
  return je(6, e, R, R, ao(t.source), t.flags, R, R, R, R, R, R);
}
function QR(e, t) {
  let o = new Uint8Array(t),
    a = o.length,
    s = new Array(a);
  for (let u = 0; u < a; u++) s[u] = o[u];
  return je(19, e, s, R, R, R, R, R, R, R, R, R);
}
function XR(e, t) {
  return je(17, e, Xb[t], R, R, R, R, R, R, R, R, R);
}
function WR(e, t) {
  return je(18, e, ao(zR(t)), R, R, R, R, R, R, R, R, R);
}
function JR(e, t, o) {
  return je(25, e, o, R, ao(t), R, R, R, R, R, R, R);
}
function e2(e, t, o) {
  return je(9, e, R, t.length, R, R, R, R, o, R, R, Wb(t));
}
function t2(e, t) {
  return je(21, e, R, R, R, R, R, R, R, t, R, R);
}
function n2(e, t, o) {
  return je(
    15,
    e,
    R,
    t.length,
    t.constructor.name,
    R,
    R,
    R,
    R,
    o,
    t.byteOffset,
    R,
  );
}
function r2(e, t, o) {
  return je(
    16,
    e,
    R,
    t.length,
    t.constructor.name,
    R,
    R,
    R,
    R,
    o,
    t.byteOffset,
    R,
  );
}
function o2(e, t, o) {
  return je(20, e, R, t.byteLength, R, R, R, R, R, o, t.byteOffset, R);
}
function a2(e, t, o) {
  return je(13, e, Yh(t), R, R, ao(t.message), o, R, R, R, R, R);
}
function i2(e, t, o) {
  return je(14, e, Yh(t), R, R, ao(t.message), o, R, R, R, R, R);
}
function s2(e, t, o) {
  return je(7, e, R, t, R, R, R, R, o, R, R, R);
}
function l2(e, t) {
  return je(28, R, R, R, R, R, R, R, [e, t], R, R, R);
}
function u2(e, t) {
  return je(30, R, R, R, R, R, R, R, [e, t], R, R, R);
}
function c2(e, t, o) {
  return je(31, e, R, R, R, R, R, R, o, t, R, R);
}
function f2(e, t) {
  return je(32, e, R, R, R, R, R, R, R, t, R, R);
}
function d2(e, t) {
  return je(33, e, R, R, R, R, R, R, R, t, R, R);
}
function h2(e, t) {
  return je(34, e, R, R, R, R, R, R, R, t, R, R);
}
var { toString: Kh } = Object.prototype;
function p2(e, t) {
  return t instanceof Error
    ? `Seroval caught an error during the ${e} process.
  
${t.name}
${t.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new`
    : `Seroval caught an error during the ${e} process.

"${Kh.call(t)}"

For more information, please check the "cause" property of this error.`;
}
var Jb = class extends Error {
    constructor(t, o) {
      (super(p2(t, o)), (this.cause = o));
    }
  },
  Zg = class extends Jb {
    constructor(e) {
      super("parsing", e);
    }
  },
  m2 = class extends Jb {
    constructor(e) {
      super("deserialization", e);
    }
  },
  Cu = class extends Error {
    constructor(e) {
      (super(`The value ${Kh.call(e)} of type "${typeof e}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`),
        (this.value = e));
    }
  },
  y2 = class extends Error {
    constructor(e) {
      super('Unsupported node type "' + e.t + '".');
    }
  },
  v2 = class extends Error {
    constructor(e) {
      super('Missing plugin for tag "' + e + '".');
    }
  },
  us = class extends Error {
    constructor(e) {
      super('Missing "' + e + '" instance.');
    }
  },
  g2 = class extends Error {
    constructor(e) {
      (super(
        'Missing reference for the value "' +
          Kh.call(e) +
          '" of type "' +
          typeof e +
          '"',
      ),
        (this.value = e));
    }
  },
  b2 = class extends Error {
    constructor(e) {
      super('Missing reference for id "' + ao(e) + '"');
    }
  },
  S2 = class extends Error {
    constructor(e) {
      super('Unknown TypedArray "' + e + '"');
    }
  },
  w2 = class {
    constructor(e, t) {
      ((this.value = e), (this.replacement = t));
    }
  },
  _2 = {},
  x2 = {},
  E2 = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} };
function dh() {
  let e, t;
  return {
    promise: new Promise((o, a) => {
      ((e = o), (t = a));
    }),
    resolve(o) {
      e(o);
    },
    reject(o) {
      t(o);
    },
  };
}
function R2(e) {
  return "__SEROVAL_STREAM__" in e;
}
function Yu() {
  let e = new Set(),
    t = [],
    o = !0,
    a = !0;
  function s(f) {
    for (let h of e.keys()) h.next(f);
  }
  function u(f) {
    for (let h of e.keys()) h.throw(f);
  }
  function c(f) {
    for (let h of e.keys()) h.return(f);
  }
  return {
    __SEROVAL_STREAM__: !0,
    on(f) {
      o && e.add(f);
      for (let h = 0, p = t.length; h < p; h++) {
        let v = t[h];
        h === p - 1 && !o ? (a ? f.return(v) : f.throw(v)) : f.next(v);
      }
      return () => {
        o && e.delete(f);
      };
    },
    next(f) {
      o && (t.push(f), s(f));
    },
    throw(f) {
      o && (t.push(f), u(f), (o = !1), (a = !1), e.clear());
    },
    return(f) {
      o && (t.push(f), c(f), (o = !1), (a = !0), e.clear());
    },
  };
}
function T2(e) {
  let t = Yu(),
    o = e[Symbol.asyncIterator]();
  async function a() {
    try {
      let s = await o.next();
      s.done ? t.return(s.value) : (t.next(s.value), await a());
    } catch (s) {
      t.throw(s);
    }
  }
  return (a().catch(() => {}), t);
}
function C2(e) {
  return () => {
    let t = [],
      o = [],
      a = 0,
      s = -1,
      u = !1;
    function c() {
      for (let h = 0, p = o.length; h < p; h++)
        o[h].resolve({ done: !0, value: void 0 });
    }
    e.on({
      next(h) {
        let p = o.shift();
        (p && p.resolve({ done: !1, value: h }), t.push(h));
      },
      throw(h) {
        let p = o.shift();
        (p && p.reject(h), c(), (s = t.length), t.push(h), (u = !0));
      },
      return(h) {
        let p = o.shift();
        (p && p.resolve({ done: !0, value: h }),
          c(),
          (s = t.length),
          t.push(h));
      },
    });
    function f() {
      let h = a++,
        p = t[h];
      if (h !== s) return { done: !1, value: p };
      if (u) throw p;
      return { done: !0, value: p };
    }
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        if (s === -1) {
          let h = a++;
          if (h >= t.length) {
            let p = dh();
            return (o.push(p), await p.promise);
          }
          return { done: !1, value: t[h] };
        }
        return a > s ? { done: !0, value: void 0 } : f();
      },
    };
  };
}
function O2(e) {
  let t = [],
    o = -1,
    a = -1,
    s = e[Symbol.iterator]();
  for (;;)
    try {
      let u = s.next();
      if ((t.push(u.value), u.done)) {
        a = t.length - 1;
        break;
      }
    } catch (u) {
      ((o = t.length), t.push(u));
    }
  return { v: t, t: o, d: a };
}
function A2(e) {
  return () => {
    let t = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (t > e.d) return { done: !0, value: R };
        let o = t++,
          a = e.v[o];
        if (o === e.t) throw a;
        return { done: o === e.d, value: a };
      },
    };
  };
}
async function M2(e) {
  try {
    return [1, await e];
  } catch (t) {
    return [0, t];
  }
}
var D2 = class {
    constructor(e) {
      ((this.marked = new Set()),
        (this.plugins = e.plugins),
        (this.features = 31 ^ (e.disabledFeatures || 0)),
        (this.refs = e.refs || new Map()));
    }
    markRef(e) {
      this.marked.add(e);
    }
    isMarked(e) {
      return this.marked.has(e);
    }
    createIndex(e) {
      let t = this.refs.size;
      return (this.refs.set(e, t), t);
    }
    getIndexedValue(e) {
      let t = this.refs.get(e);
      return t != null
        ? (this.markRef(t), { type: 1, value: FR(t) })
        : { type: 0, value: this.createIndex(e) };
    }
    getReference(e) {
      let t = this.getIndexedValue(e);
      return t.type === 1 ? t : Yb(e) ? { type: 2, value: WR(t.value, e) } : t;
    }
    parseWellKnownSymbol(e) {
      let t = this.getReference(e);
      return t.type !== 0 ? t.value : (Qr(e in Xb, new Cu(e)), XR(t.value, e));
    }
    parseSpecialReference(e) {
      let t = this.getIndexedValue(E2[e]);
      return t.type === 1
        ? t.value
        : je(26, t.value, e, R, R, R, R, R, R, R, R, R);
    }
    parseIteratorFactory() {
      let e = this.getIndexedValue(_2);
      return e.type === 1
        ? e.value
        : je(
            27,
            e.value,
            R,
            R,
            R,
            R,
            R,
            R,
            R,
            this.parseWellKnownSymbol(Symbol.iterator),
            R,
            R,
          );
    }
    parseAsyncIteratorFactory() {
      let e = this.getIndexedValue(x2);
      return e.type === 1
        ? e.value
        : je(
            29,
            e.value,
            R,
            R,
            R,
            R,
            R,
            R,
            [
              this.parseSpecialReference(1),
              this.parseWellKnownSymbol(Symbol.asyncIterator),
            ],
            R,
            R,
            R,
          );
    }
    createObjectNode(e, t, o, a) {
      return je(o ? 11 : 10, e, R, R, R, R, a, R, R, R, R, Wb(t));
    }
    createMapNode(e, t, o, a) {
      return je(
        8,
        e,
        R,
        R,
        R,
        R,
        R,
        { k: t, v: o, s: a },
        R,
        this.parseSpecialReference(0),
        R,
        R,
      );
    }
    createPromiseConstructorNode(e, t) {
      return je(
        22,
        e,
        t,
        R,
        R,
        R,
        R,
        R,
        R,
        this.parseSpecialReference(1),
        R,
        R,
      );
    }
  },
  z2 = class extends D2 {
    async parseItems(e) {
      let t = [];
      for (let o = 0, a = e.length; o < a; o++)
        o in e && (t[o] = await this.parse(e[o]));
      return t;
    }
    async parseArray(e, t) {
      return e2(e, t, await this.parseItems(t));
    }
    async parseProperties(e) {
      let t = Object.entries(e),
        o = [],
        a = [];
      for (let u = 0, c = t.length; u < c; u++)
        (o.push(ao(t[u][0])), a.push(await this.parse(t[u][1])));
      let s = Symbol.iterator;
      return (
        s in e &&
          (o.push(this.parseWellKnownSymbol(s)),
          a.push(l2(this.parseIteratorFactory(), await this.parse(O2(e))))),
        (s = Symbol.asyncIterator),
        s in e &&
          (o.push(this.parseWellKnownSymbol(s)),
          a.push(
            u2(this.parseAsyncIteratorFactory(), await this.parse(T2(e))),
          )),
        (s = Symbol.toStringTag),
        s in e && (o.push(this.parseWellKnownSymbol(s)), a.push(Vg(e[s]))),
        (s = Symbol.isConcatSpreadable),
        s in e &&
          (o.push(this.parseWellKnownSymbol(s)), a.push(e[s] ? Ig : Hg)),
        { k: o, v: a, s: o.length }
      );
    }
    async parsePlainObject(e, t, o) {
      return this.createObjectNode(e, t, o, await this.parseProperties(t));
    }
    async parseBoxed(e, t) {
      return t2(e, await this.parse(t.valueOf()));
    }
    async parseTypedArray(e, t) {
      return n2(e, t, await this.parse(t.buffer));
    }
    async parseBigIntTypedArray(e, t) {
      return r2(e, t, await this.parse(t.buffer));
    }
    async parseDataView(e, t) {
      return o2(e, t, await this.parse(t.buffer));
    }
    async parseError(e, t) {
      let o = qg(t, this.features);
      return a2(e, t, o ? await this.parseProperties(o) : R);
    }
    async parseAggregateError(e, t) {
      let o = qg(t, this.features);
      return i2(e, t, o ? await this.parseProperties(o) : R);
    }
    async parseMap(e, t) {
      let o = [],
        a = [];
      for (let [s, u] of t.entries())
        (o.push(await this.parse(s)), a.push(await this.parse(u)));
      return this.createMapNode(e, o, a, t.size);
    }
    async parseSet(e, t) {
      let o = [];
      for (let a of t.keys()) o.push(await this.parse(a));
      return s2(e, t.size, o);
    }
    async parsePromise(e, t) {
      let [o, a] = await M2(t);
      return je(12, e, o, R, R, R, R, R, R, await this.parse(a), R, R);
    }
    async parsePlugin(e, t) {
      let o = this.plugins;
      if (o)
        for (let a = 0, s = o.length; a < s; a++) {
          let u = o[a];
          if (u.parse.async && u.test(t))
            return JR(e, u.tag, await u.parse.async(t, this, { id: e }));
        }
      return R;
    }
    async parseStream(e, t) {
      return c2(
        e,
        this.parseSpecialReference(4),
        await new Promise((o, a) => {
          let s = [],
            u = t.on({
              next: (c) => {
                (this.markRef(e),
                  this.parse(c).then(
                    (f) => {
                      s.push(f2(e, f));
                    },
                    (f) => {
                      (a(f), u());
                    },
                  ));
              },
              throw: (c) => {
                (this.markRef(e),
                  this.parse(c).then(
                    (f) => {
                      (s.push(d2(e, f)), o(s), u());
                    },
                    (f) => {
                      (a(f), u());
                    },
                  ));
              },
              return: (c) => {
                (this.markRef(e),
                  this.parse(c).then(
                    (f) => {
                      (s.push(h2(e, f)), o(s), u());
                    },
                    (f) => {
                      (a(f), u());
                    },
                  ));
              },
            });
        }),
      );
    }
    async parseObject(e, t) {
      if (Array.isArray(t)) return this.parseArray(e, t);
      if (R2(t)) return this.parseStream(e, t);
      let o = t.constructor;
      if (o === w2) return this.parse(t.replacement);
      let a = await this.parsePlugin(e, t);
      if (a) return a;
      switch (o) {
        case Object:
          return this.parsePlainObject(e, t, !1);
        case R:
          return this.parsePlainObject(e, t, !0);
        case Date:
          return YR(e, t);
        case RegExp:
          return KR(e, t);
        case Error:
        case EvalError:
        case RangeError:
        case ReferenceError:
        case SyntaxError:
        case TypeError:
        case URIError:
          return this.parseError(e, t);
        case Number:
        case Boolean:
        case String:
        case BigInt:
          return this.parseBoxed(e, t);
        case ArrayBuffer:
          return QR(e, t);
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
        case Uint8ClampedArray:
        case Float32Array:
        case Float64Array:
          return this.parseTypedArray(e, t);
        case DataView:
          return this.parseDataView(e, t);
        case Map:
          return this.parseMap(e, t);
        case Set:
          return this.parseSet(e, t);
      }
      if (o === Promise || t instanceof Promise) return this.parsePromise(e, t);
      let s = this.features;
      if (s & 16)
        switch (o) {
          case BigInt64Array:
          case BigUint64Array:
            return this.parseBigIntTypedArray(e, t);
        }
      if (
        s & 1 &&
        typeof AggregateError < "u" &&
        (o === AggregateError || t instanceof AggregateError)
      )
        return this.parseAggregateError(e, t);
      if (t instanceof Error) return this.parseError(e, t);
      if (Symbol.iterator in t || Symbol.asyncIterator in t)
        return this.parsePlainObject(e, t, !!o);
      throw new Cu(t);
    }
    async parseFunction(e) {
      let t = this.getReference(e);
      if (t.type !== 0) return t.value;
      let o = await this.parsePlugin(t.value, e);
      if (o) return o;
      throw new Cu(e);
    }
    async parse(e) {
      switch (typeof e) {
        case "boolean":
          return e ? Ig : Hg;
        case "undefined":
          return UR;
        case "string":
          return Vg(e);
        case "number":
          return $R(e);
        case "bigint":
          return GR(e);
        case "object": {
          if (e) {
            let t = this.getReference(e);
            return t.type === 0 ? await this.parseObject(t.value, e) : t.value;
          }
          return BR;
        }
        case "symbol":
          return this.parseWellKnownSymbol(e);
        case "function":
          return this.parseFunction(e);
        default:
          throw new Cu(e);
      }
    }
    async parseTop(e) {
      try {
        return await this.parse(e);
      } catch (t) {
        throw t instanceof Zg ? t : new Zg(t);
      }
    }
  };
function P2(e) {
  switch (e) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new S2(e);
  }
}
function $g(e, t) {
  switch (t) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
var j2 = class {
    constructor(e) {
      ((this.plugins = e.plugins), (this.refs = e.refs || new Map()));
    }
    deserializeReference(e) {
      return this.assignIndexedValue(e.i, PR(Mo(e.s)));
    }
    deserializeArray(e) {
      let t = e.l,
        o = this.assignIndexedValue(e.i, new Array(t)),
        a;
      for (let s = 0; s < t; s++)
        ((a = e.a[s]), a && (o[s] = this.deserialize(a)));
      return ($g(o, e.o), o);
    }
    deserializeProperties(e, t) {
      let o = e.s;
      if (o) {
        let a = e.k,
          s = e.v;
        for (let u = 0, c; u < o; u++)
          ((c = a[u]),
            typeof c == "string"
              ? (t[Mo(c)] = this.deserialize(s[u]))
              : (t[this.deserialize(c)] = this.deserialize(s[u])));
      }
      return t;
    }
    deserializeObject(e) {
      let t = this.assignIndexedValue(
        e.i,
        e.t === 10 ? {} : Object.create(null),
      );
      return (this.deserializeProperties(e.p, t), $g(t, e.o), t);
    }
    deserializeDate(e) {
      return this.assignIndexedValue(e.i, new Date(e.s));
    }
    deserializeRegExp(e) {
      return this.assignIndexedValue(e.i, new RegExp(Mo(e.c), e.m));
    }
    deserializeSet(e) {
      let t = this.assignIndexedValue(e.i, new Set()),
        o = e.a;
      for (let a = 0, s = e.l; a < s; a++) t.add(this.deserialize(o[a]));
      return t;
    }
    deserializeMap(e) {
      let t = this.assignIndexedValue(e.i, new Map()),
        o = e.e.k,
        a = e.e.v;
      for (let s = 0, u = e.e.s; s < u; s++)
        t.set(this.deserialize(o[s]), this.deserialize(a[s]));
      return t;
    }
    deserializeArrayBuffer(e) {
      let t = new Uint8Array(e.s);
      return this.assignIndexedValue(e.i, t.buffer);
    }
    deserializeTypedArray(e) {
      let t = P2(e.c),
        o = this.deserialize(e.f);
      return this.assignIndexedValue(e.i, new t(o, e.b, e.l));
    }
    deserializeDataView(e) {
      let t = this.deserialize(e.f);
      return this.assignIndexedValue(e.i, new DataView(t, e.b, e.l));
    }
    deserializeDictionary(e, t) {
      if (e.p) {
        let o = this.deserializeProperties(e.p, {});
        Object.assign(t, o);
      }
      return t;
    }
    deserializeAggregateError(e) {
      let t = this.assignIndexedValue(e.i, new AggregateError([], Mo(e.m)));
      return this.deserializeDictionary(e, t);
    }
    deserializeError(e) {
      let t = LR[e.s],
        o = this.assignIndexedValue(e.i, new t(Mo(e.m)));
      return this.deserializeDictionary(e, o);
    }
    deserializePromise(e) {
      let t = dh(),
        o = this.assignIndexedValue(e.i, t),
        a = this.deserialize(e.f);
      return (e.s ? t.resolve(a) : t.reject(a), o.promise);
    }
    deserializeBoxed(e) {
      return this.assignIndexedValue(e.i, Object(this.deserialize(e.f)));
    }
    deserializePlugin(e) {
      let t = this.plugins;
      if (t) {
        let o = Mo(e.c);
        for (let a = 0, s = t.length; a < s; a++) {
          let u = t[a];
          if (u.tag === o)
            return this.assignIndexedValue(
              e.i,
              u.deserialize(e.s, this, { id: e.i }),
            );
        }
      }
      throw new v2(e.c);
    }
    deserializePromiseConstructor(e) {
      return this.assignIndexedValue(
        e.i,
        this.assignIndexedValue(e.s, dh()).promise,
      );
    }
    deserializePromiseResolve(e) {
      let t = this.refs.get(e.i);
      (Qr(t, new us("Promise")), t.resolve(this.deserialize(e.a[1])));
    }
    deserializePromiseReject(e) {
      let t = this.refs.get(e.i);
      (Qr(t, new us("Promise")), t.reject(this.deserialize(e.a[1])));
    }
    deserializeIteratorFactoryInstance(e) {
      this.deserialize(e.a[0]);
      let t = this.deserialize(e.a[1]);
      return A2(t);
    }
    deserializeAsyncIteratorFactoryInstance(e) {
      this.deserialize(e.a[0]);
      let t = this.deserialize(e.a[1]);
      return C2(t);
    }
    deserializeStreamConstructor(e) {
      let t = this.assignIndexedValue(e.i, Yu()),
        o = e.a.length;
      if (o) for (let a = 0; a < o; a++) this.deserialize(e.a[a]);
      return t;
    }
    deserializeStreamNext(e) {
      let t = this.refs.get(e.i);
      (Qr(t, new us("Stream")), t.next(this.deserialize(e.f)));
    }
    deserializeStreamThrow(e) {
      let t = this.refs.get(e.i);
      (Qr(t, new us("Stream")), t.throw(this.deserialize(e.f)));
    }
    deserializeStreamReturn(e) {
      let t = this.refs.get(e.i);
      (Qr(t, new us("Stream")), t.return(this.deserialize(e.f)));
    }
    deserializeIteratorFactory(e) {
      this.deserialize(e.f);
    }
    deserializeAsyncIteratorFactory(e) {
      this.deserialize(e.a[1]);
    }
    deserializeTop(e) {
      try {
        return this.deserialize(e);
      } catch (t) {
        throw new m2(t);
      }
    }
    deserialize(e) {
      switch (e.t) {
        case 2:
          return NR[e.s];
        case 0:
          return e.s;
        case 1:
          return Mo(e.s);
        case 3:
          return BigInt(e.s);
        case 4:
          return this.refs.get(e.i);
        case 18:
          return this.deserializeReference(e);
        case 9:
          return this.deserializeArray(e);
        case 10:
        case 11:
          return this.deserializeObject(e);
        case 5:
          return this.deserializeDate(e);
        case 6:
          return this.deserializeRegExp(e);
        case 7:
          return this.deserializeSet(e);
        case 8:
          return this.deserializeMap(e);
        case 19:
          return this.deserializeArrayBuffer(e);
        case 16:
        case 15:
          return this.deserializeTypedArray(e);
        case 20:
          return this.deserializeDataView(e);
        case 14:
          return this.deserializeAggregateError(e);
        case 13:
          return this.deserializeError(e);
        case 12:
          return this.deserializePromise(e);
        case 17:
          return jR[e.s];
        case 21:
          return this.deserializeBoxed(e);
        case 25:
          return this.deserializePlugin(e);
        case 22:
          return this.deserializePromiseConstructor(e);
        case 23:
          return this.deserializePromiseResolve(e);
        case 24:
          return this.deserializePromiseReject(e);
        case 28:
          return this.deserializeIteratorFactoryInstance(e);
        case 30:
          return this.deserializeAsyncIteratorFactoryInstance(e);
        case 31:
          return this.deserializeStreamConstructor(e);
        case 32:
          return this.deserializeStreamNext(e);
        case 33:
          return this.deserializeStreamThrow(e);
        case 34:
          return this.deserializeStreamReturn(e);
        case 27:
          return this.deserializeIteratorFactory(e);
        case 29:
          return this.deserializeAsyncIteratorFactory(e);
        default:
          throw new y2(e);
      }
    }
  },
  N2 = class extends j2 {
    constructor() {
      (super(...arguments), (this.mode = "cross"));
    }
    assignIndexedValue(e, t) {
      return (this.refs.has(e) || this.refs.set(e, t), t);
    }
  };
function Pd(e, t) {
  let o = Qb(t.plugins);
  return new N2({ plugins: o, refs: t.refs }).deserializeTop(e);
}
var k2 = class extends z2 {
  constructor() {
    (super(...arguments), (this.mode = "vanilla"));
  }
};
async function L2(e, t = {}) {
  let o = Qb(t.plugins),
    a = new k2({ plugins: o, disabledFeatures: t.disabledFeatures });
  return { t: await a.parseTop(e), f: a.features, m: Array.from(a.marked) };
}
function U2(e) {
  return {
    tag: "$TSR/t/" + e.key,
    test: e.test,
    parse: {
      sync(t, o) {
        return o.parse(e.toSerializable(t));
      },
      async async(t, o) {
        return await o.parse(e.toSerializable(t));
      },
      stream(t, o) {
        return o.parse(e.toSerializable(t));
      },
    },
    serialize: void 0,
    deserialize(t, o) {
      return e.fromSerializable(o.deserialize(t));
    },
  };
}
var gs = {},
  B2 = {
    tag: "seroval-plugins/web/ReadableStreamFactory",
    test(e) {
      return e === gs;
    },
    parse: {
      sync() {},
      async async() {
        return await Promise.resolve(void 0);
      },
      stream() {},
    },
    serialize(e, t) {
      return t.createFunction(
        ["d"],
        "new ReadableStream({start:" +
          t.createEffectfulFunction(
            ["c"],
            "d.on({next:" +
              t.createEffectfulFunction(["v"], "try{c.enqueue(v)}catch{}") +
              ",throw:" +
              t.createEffectfulFunction(["v"], "c.error(v)") +
              ",return:" +
              t.createEffectfulFunction([], "try{c.close()}catch{}") +
              "})",
          ) +
          "})",
      );
    },
    deserialize() {
      return gs;
    },
  };
function Gg(e) {
  let t = Yu(),
    o = e.getReader();
  async function a() {
    try {
      let s = await o.read();
      s.done ? t.return(s.value) : (t.next(s.value), await a());
    } catch (s) {
      t.throw(s);
    }
  }
  return (a().catch(() => {}), t);
}
var I2 = {
    tag: "seroval/plugins/web/ReadableStream",
    extends: [B2],
    test(e) {
      return typeof ReadableStream > "u" ? !1 : e instanceof ReadableStream;
    },
    parse: {
      sync(e, t) {
        return { factory: t.parse(gs), stream: t.parse(Yu()) };
      },
      async async(e, t) {
        return { factory: await t.parse(gs), stream: await t.parse(Gg(e)) };
      },
      stream(e, t) {
        return { factory: t.parse(gs), stream: t.parse(Gg(e)) };
      },
    },
    serialize(e, t) {
      return "(" + t.serialize(e.factory) + ")(" + t.serialize(e.stream) + ")";
    },
    deserialize(e, t) {
      let o = t.deserialize(e.stream);
      return new ReadableStream({
        start(a) {
          o.on({
            next(s) {
              try {
                a.enqueue(s);
              } catch {}
            },
            throw(s) {
              a.error(s);
            },
            return() {
              try {
                a.close();
              } catch {}
            },
          });
        },
      });
    },
  },
  H2 = I2;
const q2 = {
    tag: "$TSR/Error",
    test(e) {
      return e instanceof Error;
    },
    parse: {
      sync(e, t) {
        return { message: t.parse(e.message) };
      },
      async async(e, t) {
        return { message: await t.parse(e.message) };
      },
      stream(e, t) {
        return { message: t.parse(e.message) };
      },
    },
    serialize(e, t) {
      return "new Error(" + t.serialize(e.message) + ")";
    },
    deserialize(e, t) {
      return new Error(t.deserialize(e.message));
    },
  },
  V2 = [q2, H2];
function Z2({ promise: e }) {
  const t = RR(e);
  if (t[Hn].status === "pending") throw t;
  if (t[Hn].status === "error") throw t[Hn].error;
  return [t[Hn].data, t];
}
function $2(e) {
  const t = D.jsx(G2, { ...e });
  return e.fallback
    ? D.jsx(E.Suspense, { fallback: e.fallback, children: t })
    : t;
}
function G2(e) {
  const [t] = Z2(e);
  return e.children(t);
}
function Qh(e) {
  const t = e.errorComponent ?? Ku;
  return D.jsx(F2, {
    getResetKey: e.getResetKey,
    onCatch: e.onCatch,
    children: ({ error: o, reset: a }) =>
      o ? E.createElement(t, { error: o, reset: a }) : e.children,
  });
}
class F2 extends E.Component {
  constructor() {
    (super(...arguments), (this.state = { error: null }));
  }
  static getDerivedStateFromProps(t) {
    return { resetKey: t.getResetKey() };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(t, o) {
    o.error && o.resetKey !== this.state.resetKey && this.reset();
  }
  componentDidCatch(t, o) {
    this.props.onCatch && this.props.onCatch(t, o);
  }
  render() {
    return this.props.children({
      error:
        this.state.resetKey !== this.props.getResetKey()
          ? null
          : this.state.error,
      reset: () => {
        this.reset();
      },
    });
  }
}
function Ku({ error: e }) {
  const [t, o] = E.useState(!1);
  return D.jsxs("div", {
    style: { padding: ".5rem", maxWidth: "100%" },
    children: [
      D.jsxs("div", {
        style: { display: "flex", alignItems: "center", gap: ".5rem" },
        children: [
          D.jsx("strong", {
            style: { fontSize: "1rem" },
            children: "Something went wrong!",
          }),
          D.jsx("button", {
            style: {
              appearance: "none",
              fontSize: ".6em",
              border: "1px solid currentColor",
              padding: ".1rem .2rem",
              fontWeight: "bold",
              borderRadius: ".25rem",
            },
            onClick: () => o((a) => !a),
            children: t ? "Hide Error" : "Show Error",
          }),
        ],
      }),
      D.jsx("div", { style: { height: ".25rem" } }),
      t
        ? D.jsx("div", {
            children: D.jsx("pre", {
              style: {
                fontSize: ".7em",
                border: "1px solid red",
                borderRadius: ".25rem",
                padding: ".3rem",
                color: "red",
                overflow: "auto",
              },
              children: e.message
                ? D.jsx("code", { children: e.message })
                : null,
            }),
          })
        : null,
    ],
  });
}
function Y2({ children: e, fallback: t = null }) {
  return K2()
    ? D.jsx(te.Fragment, { children: e })
    : D.jsx(te.Fragment, { children: t });
}
function K2() {
  return te.useSyncExternalStore(
    Q2,
    () => !0,
    () => !1,
  );
}
function Q2() {
  return () => {};
}
var jd = { exports: {} },
  Nd = {},
  kd = { exports: {} },
  Ld = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fg;
function X2() {
  if (Fg) return Ld;
  Fg = 1;
  var e = js();
  function t(y, g) {
    return (y === g && (y !== 0 || 1 / y === 1 / g)) || (y !== y && g !== g);
  }
  var o = typeof Object.is == "function" ? Object.is : t,
    a = e.useState,
    s = e.useEffect,
    u = e.useLayoutEffect,
    c = e.useDebugValue;
  function f(y, g) {
    var S = g(),
      w = a({ inst: { value: S, getSnapshot: g } }),
      _ = w[0].inst,
      T = w[1];
    return (
      u(
        function () {
          ((_.value = S), (_.getSnapshot = g), h(_) && T({ inst: _ }));
        },
        [y, S, g],
      ),
      s(
        function () {
          return (
            h(_) && T({ inst: _ }),
            y(function () {
              h(_) && T({ inst: _ });
            })
          );
        },
        [y],
      ),
      c(S),
      S
    );
  }
  function h(y) {
    var g = y.getSnapshot;
    y = y.value;
    try {
      var S = g();
      return !o(y, S);
    } catch {
      return !0;
    }
  }
  function p(y, g) {
    return g();
  }
  var v =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? p
      : f;
  return (
    (Ld.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : v),
    Ld
  );
}
var Yg;
function W2() {
  return (Yg || ((Yg = 1), (kd.exports = X2())), kd.exports);
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kg;
function J2() {
  if (Kg) return Nd;
  Kg = 1;
  var e = js(),
    t = W2();
  function o(p, v) {
    return (p === v && (p !== 0 || 1 / p === 1 / v)) || (p !== p && v !== v);
  }
  var a = typeof Object.is == "function" ? Object.is : o,
    s = t.useSyncExternalStore,
    u = e.useRef,
    c = e.useEffect,
    f = e.useMemo,
    h = e.useDebugValue;
  return (
    (Nd.useSyncExternalStoreWithSelector = function (p, v, y, g, S) {
      var w = u(null);
      if (w.current === null) {
        var _ = { hasValue: !1, value: null };
        w.current = _;
      } else _ = w.current;
      w = f(
        function () {
          function A(F) {
            if (!N) {
              if (((N = !0), (P = F), (F = g(F)), S !== void 0 && _.hasValue)) {
                var Z = _.value;
                if (S(Z, F)) return (k = Z);
              }
              return (k = F);
            }
            if (((Z = k), a(P, F))) return Z;
            var B = g(F);
            return S !== void 0 && S(Z, B) ? ((P = F), Z) : ((P = F), (k = B));
          }
          var N = !1,
            P,
            k,
            H = y === void 0 ? null : y;
          return [
            function () {
              return A(v());
            },
            H === null
              ? void 0
              : function () {
                  return A(H());
                },
          ];
        },
        [v, y, g, S],
      );
      var T = s(p, w[0], w[1]);
      return (
        c(
          function () {
            ((_.hasValue = !0), (_.value = T));
          },
          [T],
        ),
        h(T),
        T
      );
    }),
    Nd
  );
}
var Qg;
function eT() {
  return (Qg || ((Qg = 1), (jd.exports = J2())), jd.exports);
}
var tT = eT();
function nT(e, t = (a) => a, o = {}) {
  const a = o.equal ?? rT;
  return tT.useSyncExternalStoreWithSelector(
    e.subscribe,
    () => e.state,
    () => e.state,
    t,
    a,
  );
}
function rT(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [a, s] of e) if (!t.has(a) || !Object.is(s, t.get(a))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const a of e) if (!t.has(a)) return !1;
    return !0;
  }
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  const o = Xg(e);
  if (o.length !== Xg(t).length) return !1;
  for (let a = 0; a < o.length; a++)
    if (
      !Object.prototype.hasOwnProperty.call(t, o[a]) ||
      !Object.is(e[o[a]], t[o[a]])
    )
      return !1;
  return !0;
}
function Xg(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
const Ud = E.createContext(null);
function eS() {
  return typeof document > "u"
    ? Ud
    : window.__TSR_ROUTER_CONTEXT__
      ? window.__TSR_ROUTER_CONTEXT__
      : ((window.__TSR_ROUTER_CONTEXT__ = Ud), Ud);
}
function Dt(e) {
  const t = E.useContext(eS());
  return (e?.warn, t);
}
function st(e) {
  const t = Dt({ warn: e?.router === void 0 }),
    o = e?.router || t,
    a = E.useRef(void 0);
  return nT(o.__store, (s) => {
    if (e?.select) {
      if (e.structuralSharing ?? o.options.defaultStructuralSharing) {
        const u = gn(a.current, e.select(s));
        return ((a.current = u), u);
      }
      return e.select(s);
    }
    return s;
  });
}
const Qu = E.createContext(void 0),
  oT = E.createContext(void 0);
function Gn(e) {
  const t = E.useContext(e.from ? oT : Qu);
  return st({
    select: (a) => {
      const s = a.matches.find((u) =>
        e.from ? e.from === u.routeId : u.id === t,
      );
      if (
        (Yt(
          !((e.shouldThrow ?? !0) && !s),
          `Could not find ${e.from ? `an active match from "${e.from}"` : "a nearest match!"}`,
        ),
        s !== void 0)
      )
        return e.select ? e.select(s) : s;
    },
    structuralSharing: e.structuralSharing,
  });
}
function Xh(e) {
  return Gn({
    from: e.from,
    strict: e.strict,
    structuralSharing: e.structuralSharing,
    select: (t) => (e.select ? e.select(t.loaderData) : t.loaderData),
  });
}
function Wh(e) {
  const { select: t, ...o } = e;
  return Gn({ ...o, select: (a) => (t ? t(a.loaderDeps) : a.loaderDeps) });
}
function Jh(e) {
  return Gn({
    from: e.from,
    shouldThrow: e.shouldThrow,
    structuralSharing: e.structuralSharing,
    strict: e.strict,
    select: (t) => {
      const o = e.strict === !1 ? t.params : t._strictParams;
      return e.select ? e.select(o) : o;
    },
  });
}
function ep(e) {
  return Gn({
    from: e.from,
    strict: e.strict,
    shouldThrow: e.shouldThrow,
    structuralSharing: e.structuralSharing,
    select: (t) => (e.select ? e.select(t.search) : t.search),
  });
}
function tp(e) {
  const t = Dt();
  return E.useCallback(
    (o) => t.navigate({ ...o, from: o.from ?? e?.from }),
    [e?.from, t],
  );
}
var Xu = Db();
const tS = Ab(Xu),
  lu = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function Bd(e) {
  const t = E.useRef({ value: e, prev: null }),
    o = t.current.value;
  return (e !== o && (t.current = { value: e, prev: o }), t.current.prev);
}
function aT(e, t, o = {}, a = {}) {
  E.useEffect(() => {
    if (!e.current || a.disabled || typeof IntersectionObserver != "function")
      return;
    const s = new IntersectionObserver(([u]) => {
      t(u);
    }, o);
    return (
      s.observe(e.current),
      () => {
        s.disconnect();
      }
    );
  }, [t, o, a.disabled, e]);
}
function iT(e) {
  const t = E.useRef(null);
  return (E.useImperativeHandle(e, () => t.current, []), t);
}
function sT(e, t) {
  const o = Dt(),
    [a, s] = E.useState(!1),
    u = E.useRef(!1),
    c = iT(t),
    {
      activeProps: f,
      inactiveProps: h,
      activeOptions: p,
      to: v,
      preload: y,
      preloadDelay: g,
      hashScrollIntoView: S,
      replace: w,
      startTransition: _,
      resetScroll: T,
      viewTransition: A,
      children: N,
      target: P,
      disabled: k,
      style: H,
      className: F,
      onClick: Z,
      onFocus: B,
      onMouseEnter: re,
      onMouseLeave: ae,
      onTouchStart: he,
      ignoreBlocker: se,
      params: ve,
      search: me,
      hash: ye,
      state: z,
      mask: K,
      reloadDocument: q,
      unsafeRelative: W,
      from: C,
      _fromLocation: G,
      ...ne
    } = e,
    $ = st({ select: (Me) => Me.location.search, structuralSharing: !0 }),
    J = e.from,
    ie = E.useMemo(
      () => ({ ...e, from: J }),
      [
        o,
        $,
        J,
        e._fromLocation,
        e.hash,
        e.to,
        e.search,
        e.params,
        e.state,
        e.mask,
        e.unsafeRelative,
      ],
    ),
    oe = E.useMemo(() => o.buildLocation({ ...ie }), [o, ie]),
    le = E.useMemo(() => {
      if (k) return;
      let Me = oe.maskedLocation ? oe.maskedLocation.url : oe.url,
        tt = !1;
      return (
        o.origin &&
          (Me.startsWith(o.origin)
            ? (Me = o.history.createHref(Me.replace(o.origin, "")) || "/")
            : (tt = !0)),
        { href: Me, external: tt }
      );
    }, [k, oe.maskedLocation, oe.url, o.origin, o.history]),
    de = E.useMemo(() => {
      if (le?.external) return le.href;
      try {
        return (new URL(v), v);
      } catch {}
    }, [v, le]),
    ke = e.reloadDocument || de ? !1 : (y ?? o.options.defaultPreload),
    dt = g ?? o.options.defaultPreloadDelay ?? 0,
    ht = st({
      select: (Me) => {
        if (de) return !1;
        if (p?.exact) {
          if (!ME(Me.location.pathname, oe.pathname, o.basepath)) return !1;
        } else {
          const tt = Nu(Me.location.pathname, o.basepath),
            Nt = Nu(oe.pathname, o.basepath);
          if (
            !(
              tt.startsWith(Nt) &&
              (tt.length === Nt.length || tt[Nt.length] === "/")
            )
          )
            return !1;
        }
        return (p?.includeSearch ?? !0) &&
          !jo(Me.location.search, oe.search, {
            partial: !p?.exact,
            ignoreUndefined: !p?.explicitUndefined,
          })
          ? !1
          : p?.includeHash
            ? Me.location.hash === oe.hash
            : !0;
      },
    }),
    Ge = E.useCallback(() => {
      o.preloadRoute({ ...ie }).catch((Me) => {
        (console.warn(Me), console.warn(TR));
      });
    }, [o, ie]),
    ln = E.useCallback(
      (Me) => {
        Me?.isIntersecting && Ge();
      },
      [Ge],
    );
  (aT(c, ln, dT, { disabled: !!k || ke !== "viewport" }),
    E.useEffect(() => {
      u.current || (!k && ke === "render" && (Ge(), (u.current = !0)));
    }, [k, Ge, ke]));
  const Xn = (Me) => {
    const tt = Me.currentTarget.getAttribute("target"),
      Nt = P !== void 0 ? P : tt;
    if (
      !k &&
      !hT(Me) &&
      !Me.defaultPrevented &&
      (!Nt || Nt === "_self") &&
      Me.button === 0
    ) {
      (Me.preventDefault(),
        Xu.flushSync(() => {
          s(!0);
        }));
      const Qt = o.subscribe("onResolved", () => {
        (Qt(), s(!1));
      });
      o.navigate({
        ...ie,
        replace: w,
        resetScroll: T,
        hashScrollIntoView: S,
        startTransition: _,
        viewTransition: A,
        ignoreBlocker: se,
      });
    }
  };
  if (de)
    return {
      ...ne,
      ref: c,
      href: de,
      ...(N && { children: N }),
      ...(P && { target: P }),
      ...(k && { disabled: k }),
      ...(H && { style: H }),
      ...(F && { className: F }),
      ...(Z && { onClick: Z }),
      ...(B && { onFocus: B }),
      ...(re && { onMouseEnter: re }),
      ...(ae && { onMouseLeave: ae }),
      ...(he && { onTouchStart: he }),
    };
  const Zo = (Me) => {
      k || (ke && Ge());
    },
    $o = Zo,
    gt = (Me) => {
      if (!(k || !ke))
        if (!dt) Ge();
        else {
          const tt = Me.target;
          if (cs.has(tt)) return;
          const Nt = setTimeout(() => {
            (cs.delete(tt), Ge());
          }, dt);
          cs.set(tt, Nt);
        }
    },
    Go = (Me) => {
      if (k || !ke || !dt) return;
      const tt = Me.target,
        Nt = cs.get(tt);
      Nt && (clearTimeout(Nt), cs.delete(tt));
    },
    Rt = ht ? (Po(f, {}) ?? lT) : Id,
    Wn = ht ? Id : (Po(h, {}) ?? Id),
    Jn = [F, Rt.className, Wn.className].filter(Boolean).join(" "),
    bt = (H || Rt.style || Wn.style) && { ...H, ...Rt.style, ...Wn.style };
  return {
    ...ne,
    ...Rt,
    ...Wn,
    href: le?.href,
    ref: c,
    onClick: fs([Z, Xn]),
    onFocus: fs([B, Zo]),
    onMouseEnter: fs([re, gt]),
    onMouseLeave: fs([ae, Go]),
    onTouchStart: fs([he, $o]),
    disabled: !!k,
    target: P,
    ...(bt && { style: bt }),
    ...(Jn && { className: Jn }),
    ...(k && uT),
    ...(ht && cT),
    ...(a && fT),
  };
}
const Id = {},
  lT = { className: "active" },
  uT = { role: "link", "aria-disabled": !0 },
  cT = { "data-status": "active", "aria-current": "page" },
  fT = { "data-transitioning": "transitioning" },
  cs = new WeakMap(),
  dT = { rootMargin: "100px" },
  fs = (e) => (t) => {
    for (const o of e)
      if (o) {
        if (t.defaultPrevented) return;
        o(t);
      }
  },
  nS = E.forwardRef((e, t) => {
    const { _asChild: o, ...a } = e,
      { type: s, ref: u, ...c } = sT(a, t),
      f =
        typeof a.children == "function"
          ? a.children({ isActive: c["data-status"] === "active" })
          : a.children;
    return (
      o === void 0 && delete c.disabled,
      E.createElement(o || "a", { ...c, ref: u }, f)
    );
  });
function hT(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
let pT = class extends Gb {
  constructor(t) {
    (super(t),
      (this.useMatch = (o) =>
        Gn({
          select: o?.select,
          from: this.id,
          structuralSharing: o?.structuralSharing,
        })),
      (this.useRouteContext = (o) =>
        Gn({
          ...o,
          from: this.id,
          select: (a) => (o?.select ? o.select(a.context) : a.context),
        })),
      (this.useSearch = (o) =>
        ep({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (o) =>
        Jh({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (o) => Wh({ ...o, from: this.id })),
      (this.useLoaderData = (o) => Xh({ ...o, from: this.id })),
      (this.useNavigate = () => tp({ from: this.fullPath })),
      (this.Link = te.forwardRef((o, a) =>
        D.jsx(nS, { ref: a, from: this.fullPath, ...o }),
      )),
      (this.$$typeof = Symbol.for("react.memo")));
  }
};
function mT(e) {
  return new pT(e);
}
function yT() {
  return (e) => gT(e);
}
class vT extends CR {
  constructor(t) {
    (super(t),
      (this.useMatch = (o) =>
        Gn({
          select: o?.select,
          from: this.id,
          structuralSharing: o?.structuralSharing,
        })),
      (this.useRouteContext = (o) =>
        Gn({
          ...o,
          from: this.id,
          select: (a) => (o?.select ? o.select(a.context) : a.context),
        })),
      (this.useSearch = (o) =>
        ep({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (o) =>
        Jh({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (o) => Wh({ ...o, from: this.id })),
      (this.useLoaderData = (o) => Xh({ ...o, from: this.id })),
      (this.useNavigate = () => tp({ from: this.fullPath })),
      (this.Link = te.forwardRef((o, a) =>
        D.jsx(nS, { ref: a, from: this.fullPath, ...o }),
      )),
      (this.$$typeof = Symbol.for("react.memo")));
  }
}
function gT(e) {
  return new vT(e);
}
function hh(e) {
  return typeof e == "object"
    ? new Wg(e, { silent: !0 }).createRoute(e)
    : new Wg(e, { silent: !0 }).createRoute;
}
class Wg {
  constructor(t, o) {
    ((this.path = t),
      (this.createRoute = (a) => {
        this.silent;
        const s = mT(a);
        return ((s.isRoot = !1), s);
      }),
      (this.silent = o?.silent));
  }
}
class Jg {
  constructor(t) {
    ((this.useMatch = (o) =>
      Gn({
        select: o?.select,
        from: this.options.id,
        structuralSharing: o?.structuralSharing,
      })),
      (this.useRouteContext = (o) =>
        Gn({
          from: this.options.id,
          select: (a) => (o?.select ? o.select(a.context) : a.context),
        })),
      (this.useSearch = (o) =>
        ep({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.options.id,
        })),
      (this.useParams = (o) =>
        Jh({
          select: o?.select,
          structuralSharing: o?.structuralSharing,
          from: this.options.id,
        })),
      (this.useLoaderDeps = (o) => Wh({ ...o, from: this.options.id })),
      (this.useLoaderData = (o) => Xh({ ...o, from: this.options.id })),
      (this.useNavigate = () => {
        const o = Dt();
        return tp({ from: o.routesById[this.options.id].fullPath });
      }),
      (this.options = t),
      (this.$$typeof = Symbol.for("react.memo")));
  }
}
function e0(e) {
  return typeof e == "object" ? new Jg(e) : (t) => new Jg({ id: e, ...t });
}
function bT(e, t) {
  let o, a, s, u;
  const c = () => (
      o ||
        (o = e()
          .then((h) => {
            ((o = void 0), (a = h[t]));
          })
          .catch((h) => {
            if (
              ((s = h),
              CE(s) &&
                s instanceof Error &&
                typeof window < "u" &&
                typeof sessionStorage < "u")
            ) {
              const p = `tanstack_router_reload:${s.message}`;
              sessionStorage.getItem(p) ||
                (sessionStorage.setItem(p, "1"), (u = !0));
            }
          })),
      o
    ),
    f = function (p) {
      if (u) throw (window.location.reload(), new Promise(() => {}));
      if (s) throw s;
      if (!a) throw c();
      return E.createElement(a, p);
    };
  return ((f.preload = c), f);
}
function ST() {
  const e = Dt(),
    t = E.useRef({ router: e, mounted: !1 }),
    [o, a] = E.useState(!1),
    { hasPendingMatches: s, isLoading: u } = st({
      select: (y) => ({
        isLoading: y.isLoading,
        hasPendingMatches: y.matches.some((g) => g.status === "pending"),
      }),
      structuralSharing: !0,
    }),
    c = Bd(u),
    f = u || o || s,
    h = Bd(f),
    p = u || s,
    v = Bd(p);
  return (
    (e.startTransition = (y) => {
      (a(!0),
        E.startTransition(() => {
          (y(), a(!1));
        }));
    }),
    E.useEffect(() => {
      const y = e.history.subscribe(e.load),
        g = e.buildLocation({
          to: e.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
          _includeValidateSearch: !0,
        });
      return (
        eo(e.latestLocation.href) !== eo(g.href) &&
          e.commitLocation({ ...g, replace: !0 }),
        () => {
          y();
        }
      );
    }, [e, e.history]),
    lu(() => {
      if (
        (typeof window < "u" && e.ssr) ||
        (t.current.router === e && t.current.mounted)
      )
        return;
      ((t.current = { router: e, mounted: !0 }),
        (async () => {
          try {
            await e.load();
          } catch (g) {
            console.error(g);
          }
        })());
    }, [e]),
    lu(() => {
      c && !u && e.emit({ type: "onLoad", ...No(e.state) });
    }, [c, e, u]),
    lu(() => {
      v && !p && e.emit({ type: "onBeforeRouteMount", ...No(e.state) });
    }, [p, v, e]),
    lu(() => {
      h &&
        !f &&
        (e.emit({ type: "onResolved", ...No(e.state) }),
        e.__store.setState((y) => ({
          ...y,
          status: "idle",
          resolvedLocation: y.location,
        })),
        oR(e));
    }, [f, h, e]),
    null
  );
}
function wT(e) {
  const t = st({
    select: (o) => `not-found-${o.location.pathname}-${o.status}`,
  });
  return D.jsx(Qh, {
    getResetKey: () => t,
    onCatch: (o, a) => {
      if (wn(o)) e.onCatch?.(o, a);
      else throw o;
    },
    errorComponent: ({ error: o }) => {
      if (wn(o)) return e.fallback?.(o);
      throw o;
    },
    children: e.children,
  });
}
function _T() {
  return D.jsx("p", { children: "Not Found" });
}
function qa(e) {
  return D.jsx(D.Fragment, { children: e.children });
}
function rS(e, t, o) {
  return t.options.notFoundComponent
    ? D.jsx(t.options.notFoundComponent, { data: o })
    : e.options.defaultNotFoundComponent
      ? D.jsx(e.options.defaultNotFoundComponent, { data: o })
      : D.jsx(_T, {});
}
function xT({ children: e }) {
  const t = Dt();
  return t.isServer
    ? D.jsx("script", {
        nonce: t.options.ssr?.nonce,
        className: "$tsr",
        dangerouslySetInnerHTML: {
          __html:
            [e].filter(Boolean).join(`
`) + ";$_TSR.c()",
        },
      })
    : null;
}
function ET() {
  const e = Dt();
  if (
    !e.isScrollRestoring ||
    !e.isServer ||
    (typeof e.options.scrollRestoration == "function" &&
      !e.options.scrollRestoration({ location: e.latestLocation }))
  )
    return null;
  const o = (e.options.getScrollRestorationKey || ch)(e.latestLocation),
    a = o !== ch(e.latestLocation) ? o : void 0,
    s = { storageKey: ku, shouldScrollRestoration: !0 };
  return (
    a && (s.key = a),
    D.jsx(xT, { children: `(${jb.toString()})(${JSON.stringify(s)})` })
  );
}
const oS = E.memo(function ({ matchId: t }) {
  const o = Dt(),
    a = st({
      select: (A) => {
        const N = A.matches.find((P) => P.id === t);
        return (
          Yt(N),
          { routeId: N.routeId, ssr: N.ssr, _displayPending: N._displayPending }
        );
      },
      structuralSharing: !0,
    }),
    s = o.routesById[a.routeId],
    u = s.options.pendingComponent ?? o.options.defaultPendingComponent,
    c = u ? D.jsx(u, {}) : null,
    f = s.options.errorComponent ?? o.options.defaultErrorComponent,
    h = s.options.onCatch ?? o.options.defaultOnCatch,
    p = s.isRoot
      ? (s.options.notFoundComponent ??
        o.options.notFoundRoute?.options.component)
      : s.options.notFoundComponent,
    v = a.ssr === !1 || a.ssr === "data-only",
    y =
      (!s.isRoot || s.options.wrapInSuspense || v) &&
      (s.options.wrapInSuspense ??
        u ??
        (s.options.errorComponent?.preload || v))
        ? E.Suspense
        : qa,
    g = f ? Qh : qa,
    S = p ? wT : qa,
    w = st({ select: (A) => A.loadedAt }),
    _ = st({
      select: (A) => {
        const N = A.matches.findIndex((P) => P.id === t);
        return A.matches[N - 1]?.routeId;
      },
    }),
    T = s.isRoot ? (s.options.shellComponent ?? qa) : qa;
  return D.jsxs(T, {
    children: [
      D.jsx(Qu.Provider, {
        value: t,
        children: D.jsx(y, {
          fallback: c,
          children: D.jsx(g, {
            getResetKey: () => w,
            errorComponent: f || Ku,
            onCatch: (A, N) => {
              if (wn(A)) throw A;
              h?.(A, N);
            },
            children: D.jsx(S, {
              fallback: (A) => {
                if (
                  !p ||
                  (A.routeId && A.routeId !== a.routeId) ||
                  (!A.routeId && !s.isRoot)
                )
                  throw A;
                return E.createElement(p, A);
              },
              children:
                v || a._displayPending
                  ? D.jsx(Y2, {
                      fallback: c,
                      children: D.jsx(t0, { matchId: t }),
                    })
                  : D.jsx(t0, { matchId: t }),
            }),
          }),
        }),
      }),
      _ === on && o.options.scrollRestoration
        ? D.jsxs(D.Fragment, { children: [D.jsx(RT, {}), D.jsx(ET, {})] })
        : null,
    ],
  });
});
function RT() {
  const e = Dt(),
    t = E.useRef(void 0);
  return D.jsx(
    "script",
    {
      suppressHydrationWarning: !0,
      ref: (o) => {
        o &&
          (t.current === void 0 || t.current.href !== e.latestLocation.href) &&
          (e.emit({ type: "onRendered", ...No(e.state) }),
          (t.current = e.latestLocation));
      },
    },
    e.latestLocation.state.__TSR_key,
  );
}
const t0 = E.memo(function ({ matchId: t }) {
    const o = Dt(),
      {
        match: a,
        key: s,
        routeId: u,
      } = st({
        select: (h) => {
          const p = h.matches.find((w) => w.id === t),
            v = p.routeId,
            g = (
              o.routesById[v].options.remountDeps ??
              o.options.defaultRemountDeps
            )?.({
              routeId: v,
              loaderDeps: p.loaderDeps,
              params: p._strictParams,
              search: p._strictSearch,
            });
          return {
            key: g ? JSON.stringify(g) : void 0,
            routeId: v,
            match: {
              id: p.id,
              status: p.status,
              error: p.error,
              _forcePending: p._forcePending,
              _displayPending: p._displayPending,
            },
          };
        },
        structuralSharing: !0,
      }),
      c = o.routesById[u],
      f = E.useMemo(() => {
        const h = c.options.component ?? o.options.defaultComponent;
        return h ? D.jsx(h, {}, s) : D.jsx(aS, {});
      }, [s, c.options.component, o.options.defaultComponent]);
    if (a._displayPending)
      throw o.getMatch(a.id)?._nonReactive.displayPendingPromise;
    if (a._forcePending) throw o.getMatch(a.id)?._nonReactive.minPendingPromise;
    if (a.status === "pending") {
      const h = c.options.pendingMinMs ?? o.options.defaultPendingMinMs;
      if (h) {
        const p = o.getMatch(a.id);
        if (p && !p._nonReactive.minPendingPromise && !o.isServer) {
          const v = ko();
          ((p._nonReactive.minPendingPromise = v),
            setTimeout(() => {
              (v.resolve(), (p._nonReactive.minPendingPromise = void 0));
            }, h));
        }
      }
      throw o.getMatch(a.id)?._nonReactive.loadPromise;
    }
    if (a.status === "notFound") return (Yt(wn(a.error)), rS(o, c, a.error));
    if (a.status === "redirected")
      throw (Yt(bn(a.error)), o.getMatch(a.id)?._nonReactive.loadPromise);
    if (a.status === "error") {
      if (o.isServer) {
        const h =
          (c.options.errorComponent ?? o.options.defaultErrorComponent) || Ku;
        return D.jsx(h, {
          error: a.error,
          reset: void 0,
          info: { componentStack: "" },
        });
      }
      throw a.error;
    }
    return f;
  }),
  aS = E.memo(function () {
    const t = Dt(),
      o = E.useContext(Qu),
      a = st({ select: (p) => p.matches.find((v) => v.id === o)?.routeId }),
      s = t.routesById[a],
      u = st({
        select: (p) => {
          const y = p.matches.find((g) => g.id === o);
          return (Yt(y), y.globalNotFound);
        },
      }),
      c = st({
        select: (p) => {
          const v = p.matches,
            y = v.findIndex((g) => g.id === o);
          return v[y + 1]?.id;
        },
      }),
      f = t.options.defaultPendingComponent
        ? D.jsx(t.options.defaultPendingComponent, {})
        : null;
    if (u) return rS(t, s, void 0);
    if (!c) return null;
    const h = D.jsx(oS, { matchId: c });
    return a === on ? D.jsx(E.Suspense, { fallback: f, children: h }) : h;
  });
function TT() {
  const e = Dt(),
    o =
      e.routesById[on].options.pendingComponent ??
      e.options.defaultPendingComponent,
    a = o ? D.jsx(o, {}) : null,
    s = e.isServer || (typeof document < "u" && e.ssr) ? qa : E.Suspense,
    u = D.jsxs(s, {
      fallback: a,
      children: [!e.isServer && D.jsx(ST, {}), D.jsx(CT, {})],
    });
  return e.options.InnerWrap ? D.jsx(e.options.InnerWrap, { children: u }) : u;
}
function CT() {
  const e = Dt(),
    t = st({ select: (s) => s.matches[0]?.id }),
    o = st({ select: (s) => s.loadedAt }),
    a = t ? D.jsx(oS, { matchId: t }) : null;
  return D.jsx(Qu.Provider, {
    value: t,
    children: e.options.disableGlobalCatchBoundary
      ? a
      : D.jsx(Qh, {
          getResetKey: () => o,
          errorComponent: Ku,
          onCatch: (s) => {
            s.message || s.toString();
          },
          children: a,
        }),
  });
}
const OT = (e) => new AT(e);
class AT extends SR {
  constructor(t) {
    super(t);
  }
}
typeof globalThis < "u"
  ? ((globalThis.createFileRoute = hh), (globalThis.createLazyFileRoute = e0))
  : typeof window < "u" &&
    ((window.createFileRoute = hh), (window.createLazyFileRoute = e0));
function MT({ router: e, children: t, ...o }) {
  Object.keys(o).length > 0 &&
    e.update({
      ...e.options,
      ...o,
      context: { ...e.options.context, ...o.context },
    });
  const a = eS(),
    s = D.jsx(a.Provider, { value: e, children: t });
  return e.options.Wrap ? D.jsx(e.options.Wrap, { children: s }) : s;
}
function DT({ router: e, ...t }) {
  return D.jsx(MT, { router: e, ...t, children: D.jsx(TT, {}) });
}
function iS({ tag: e, attrs: t, children: o, nonce: a }) {
  switch (e) {
    case "title":
      return D.jsx("title", {
        ...t,
        suppressHydrationWarning: !0,
        children: o,
      });
    case "meta":
      return D.jsx("meta", { ...t, suppressHydrationWarning: !0 });
    case "link":
      return D.jsx("link", { ...t, nonce: a, suppressHydrationWarning: !0 });
    case "style":
      return D.jsx("style", {
        ...t,
        dangerouslySetInnerHTML: { __html: o },
        nonce: a,
      });
    case "script":
      return D.jsx(zT, { attrs: t, children: o });
    default:
      return null;
  }
}
function zT({ attrs: e, children: t }) {
  const o = Dt();
  return (
    E.useEffect(() => {
      if (e?.src) {
        const a = (() => {
          try {
            const c = document.baseURI || window.location.href;
            return new URL(e.src, c).href;
          } catch {
            return e.src;
          }
        })();
        if (
          Array.from(document.querySelectorAll("script[src]")).find(
            (c) => c.src === a,
          )
        )
          return;
        const u = document.createElement("script");
        for (const [c, f] of Object.entries(e))
          c !== "suppressHydrationWarning" &&
            f !== void 0 &&
            f !== !1 &&
            u.setAttribute(c, typeof f == "boolean" ? "" : String(f));
        return (
          document.head.appendChild(u),
          () => {
            u.parentNode && u.parentNode.removeChild(u);
          }
        );
      }
      if (typeof t == "string") {
        const a = typeof e?.type == "string" ? e.type : "text/javascript",
          s = typeof e?.nonce == "string" ? e.nonce : void 0;
        if (
          Array.from(document.querySelectorAll("script:not([src])")).find(
            (f) => {
              if (!(f instanceof HTMLScriptElement)) return !1;
              const h = f.getAttribute("type") ?? "text/javascript",
                p = f.getAttribute("nonce") ?? void 0;
              return f.textContent === t && h === a && p === s;
            },
          )
        )
          return;
        const c = document.createElement("script");
        if (((c.textContent = t), e))
          for (const [f, h] of Object.entries(e))
            f !== "suppressHydrationWarning" &&
              h !== void 0 &&
              h !== !1 &&
              c.setAttribute(f, typeof h == "boolean" ? "" : String(h));
        return (
          document.head.appendChild(c),
          () => {
            c.parentNode && c.parentNode.removeChild(c);
          }
        );
      }
    }, [e, t]),
    o.isServer
      ? e?.src && typeof e.src == "string"
        ? D.jsx("script", { ...e, suppressHydrationWarning: !0 })
        : typeof t == "string"
          ? D.jsx("script", {
              ...e,
              dangerouslySetInnerHTML: { __html: t },
              suppressHydrationWarning: !0,
            })
          : null
      : null
  );
}
const PT = () => {
  const e = Dt(),
    t = e.options.ssr?.nonce,
    o = st({ select: (h) => h.matches.map((p) => p.meta).filter(Boolean) }),
    a = E.useMemo(() => {
      const h = [],
        p = {};
      let v;
      for (let y = o.length - 1; y >= 0; y--) {
        const g = o[y];
        for (let S = g.length - 1; S >= 0; S--) {
          const w = g[S];
          if (w)
            if (w.title) v || (v = { tag: "title", children: w.title });
            else {
              const _ = w.name ?? w.property;
              if (_) {
                if (p[_]) continue;
                p[_] = !0;
              }
              h.push({ tag: "meta", attrs: { ...w, nonce: t } });
            }
        }
      }
      return (
        v && h.push(v),
        t &&
          h.push({ tag: "meta", attrs: { property: "csp-nonce", content: t } }),
        h.reverse(),
        h
      );
    }, [o, t]),
    s = st({
      select: (h) => {
        const p = h.matches
            .map((g) => g.links)
            .filter(Boolean)
            .flat(1)
            .map((g) => ({ tag: "link", attrs: { ...g, nonce: t } })),
          v = e.ssr?.manifest,
          y = h.matches
            .map((g) => v?.routes[g.routeId]?.assets ?? [])
            .filter(Boolean)
            .flat(1)
            .filter((g) => g.tag === "link")
            .map((g) => ({
              tag: "link",
              attrs: { ...g.attrs, suppressHydrationWarning: !0, nonce: t },
            }));
        return [...p, ...y];
      },
      structuralSharing: !0,
    }),
    u = st({
      select: (h) => {
        const p = [];
        return (
          h.matches
            .map((v) => e.looseRoutesById[v.routeId])
            .forEach((v) =>
              e.ssr?.manifest?.routes[v.id]?.preloads
                ?.filter(Boolean)
                .forEach((y) => {
                  p.push({
                    tag: "link",
                    attrs: { rel: "modulepreload", href: y, nonce: t },
                  });
                }),
            ),
          p
        );
      },
      structuralSharing: !0,
    }),
    c = st({
      select: (h) =>
        h.matches
          .map((p) => p.styles)
          .flat(1)
          .filter(Boolean)
          .map(({ children: p, ...v }) => ({
            tag: "style",
            attrs: v,
            children: p,
            nonce: t,
          })),
      structuralSharing: !0,
    }),
    f = st({
      select: (h) =>
        h.matches
          .map((p) => p.headScripts)
          .flat(1)
          .filter(Boolean)
          .map(({ children: p, ...v }) => ({
            tag: "script",
            attrs: { ...v, nonce: t },
            children: p,
          })),
      structuralSharing: !0,
    });
  return NT([...a, ...u, ...s, ...c, ...f], (h) => JSON.stringify(h));
};
function jT() {
  const e = PT(),
    o = Dt().options.ssr?.nonce;
  return e.map((a) =>
    E.createElement(iS, {
      ...a,
      key: `tsr-meta-${JSON.stringify(a)}`,
      nonce: o,
    }),
  );
}
function NT(e, t) {
  const o = new Set();
  return e.filter((a) => {
    const s = t(a);
    return o.has(s) ? !1 : (o.add(s), !0);
  });
}
const kT = () => {
  const e = Dt(),
    t = e.options.ssr?.nonce,
    o = st({
      select: (u) => {
        const c = [],
          f = e.ssr?.manifest;
        return f
          ? (u.matches
              .map((h) => e.looseRoutesById[h.routeId])
              .forEach((h) =>
                f.routes[h.id]?.assets
                  ?.filter((p) => p.tag === "script")
                  .forEach((p) => {
                    c.push({
                      tag: "script",
                      attrs: { ...p.attrs, nonce: t },
                      children: p.children,
                    });
                  }),
              ),
            c)
          : [];
      },
      structuralSharing: !0,
    }),
    { scripts: a } = st({
      select: (u) => ({
        scripts: u.matches
          .map((c) => c.scripts)
          .flat(1)
          .filter(Boolean)
          .map(({ children: c, ...f }) => ({
            tag: "script",
            attrs: { ...f, suppressHydrationWarning: !0, nonce: t },
            children: c,
          })),
      }),
      structuralSharing: !0,
    }),
    s = [...a, ...o];
  return D.jsx(D.Fragment, {
    children: s.map((u, c) =>
      E.createElement(iS, { ...u, key: `tsr-scripts-${u.tag}-${c}` }),
    ),
  });
};
function LT(e, t) {
  ((e.id = t.i),
    (e.__beforeLoadContext = t.b),
    (e.loaderData = t.l),
    (e.status = t.s),
    (e.ssr = t.ssr),
    (e.updatedAt = t.u),
    (e.error = t.e));
}
async function UT(e) {
  Yt(window.$_TSR);
  const t = e.options.serializationAdapters;
  if (t?.length) {
    const w = new Map();
    (t.forEach((_) => {
      w.set(_.key, _.fromSerializable);
    }),
      (window.$_TSR.t = w),
      window.$_TSR.buffer.forEach((_) => _()));
  }
  ((window.$_TSR.initialized = !0), Yt(window.$_TSR.router));
  const {
    manifest: o,
    dehydratedData: a,
    lastMatchId: s,
  } = window.$_TSR.router;
  e.ssr = { manifest: o };
  const c = document.querySelector('meta[property="csp-nonce"]')?.content;
  e.options.ssr = { nonce: c };
  const f = e.matchRoutes(e.state.location),
    h = Promise.all(
      f.map((w) => {
        const _ = e.looseRoutesById[w.routeId];
        return e.loadRouteChunk(_);
      }),
    );
  function p(w) {
    const T =
      e.looseRoutesById[w.routeId].options.pendingMinMs ??
      e.options.defaultPendingMinMs;
    if (T) {
      const A = ko();
      ((w._nonReactive.minPendingPromise = A),
        (w._forcePending = !0),
        setTimeout(() => {
          (A.resolve(),
            e.updateMatch(
              w.id,
              (N) => (
                (N._nonReactive.minPendingPromise = void 0),
                { ...N, _forcePending: void 0 }
              ),
            ));
        }, T));
    }
  }
  let v;
  (f.forEach((w) => {
    const _ = window.$_TSR.router.matches.find((T) => T.i === w.id);
    if (!_) {
      ((w._nonReactive.dehydrated = !1), (w.ssr = !1));
      return;
    }
    (LT(w, _),
      (w._nonReactive.dehydrated = w.ssr !== !1),
      (w.ssr === "data-only" || w.ssr === !1) &&
        v === void 0 &&
        ((v = w.index), p(w)));
  }),
    e.__store.setState((w) => ({ ...w, matches: f })),
    await e.options.hydrate?.(a),
    await Promise.all(
      e.state.matches.map(async (w) => {
        const _ = e.looseRoutesById[w.routeId],
          A = e.state.matches[w.index - 1]?.context ?? e.options.context;
        if (_.options.context) {
          const H = {
            deps: w.loaderDeps,
            params: w.params,
            context: A ?? {},
            location: e.state.location,
            navigate: (F) =>
              e.navigate({ ...F, _fromLocation: e.state.location }),
            buildLocation: e.buildLocation,
            cause: w.cause,
            abortController: w.abortController,
            preload: !1,
            matches: f,
          };
          w.__routeContext = _.options.context(H) ?? void 0;
        }
        w.context = { ...A, ...w.__routeContext, ...w.__beforeLoadContext };
        const N = {
            matches: e.state.matches,
            match: w,
            params: w.params,
            loaderData: w.loaderData,
          },
          P = await _.options.head?.(N),
          k = await _.options.scripts?.(N);
        ((w.meta = P?.meta),
          (w.links = P?.links),
          (w.headScripts = P?.scripts),
          (w.styles = P?.styles),
          (w.scripts = k));
      }),
    ));
  const y = f[f.length - 1].id !== s;
  if (!f.some((w) => w.ssr === !1) && !y)
    return (
      f.forEach((w) => {
        w._nonReactive.dehydrated = void 0;
      }),
      h
    );
  const S = Promise.resolve()
    .then(() => e.load())
    .catch((w) => {
      console.error("Error during router hydration:", w);
    });
  if (y) {
    const w = f[1];
    (Yt(w),
      p(w),
      (w._displayPending = !0),
      (w._nonReactive.displayPendingPromise = S),
      S.then(() => {
        Ga(() => {
          (e.__store.state.status === "pending" &&
            e.__store.setState((_) => ({
              ..._,
              status: "idle",
              resolvedLocation: _.location,
            })),
            e.updateMatch(w.id, (_) => ({
              ..._,
              _displayPending: void 0,
              displayPendingPromise: void 0,
            })));
        });
      }));
  }
  return h;
}
const BT = "__TSS_CONTEXT",
  ph = Symbol.for("TSS_SERVER_FUNCTION"),
  IT = "x-tss-serialized",
  HT = "x-tss-raw",
  qT = () => window.__TSS_START_OPTIONS__;
function VT() {
  return [...(qT()?.serializationAdapters?.map(U2) ?? []), ...V2];
}
let Fa = null;
async function ZT(e, t, o) {
  Fa || (Fa = VT());
  const a = t[0];
  if (_s(a) && a.method) {
    const s = a,
      u = s.data instanceof FormData ? "formData" : "payload",
      c = new Headers({
        "x-tsr-redirect": "manual",
        ...(s.headers instanceof Headers
          ? Object.fromEntries(s.headers.entries())
          : s.headers),
      });
    if (
      (u === "payload" &&
        c.set("accept", "application/x-ndjson, application/json"),
      s.method === "GET")
    ) {
      if (u === "formData")
        throw new Error("FormData is not supported with GET requests");
      if ((await mh(s)) !== void 0) {
        const p = Nb({ payload: await mh(s) });
        e.includes("?") ? (e += `&${p}`) : (e += `?${p}`);
      }
    }
    e.includes("?") ? (e += "&createServerFn") : (e += "?createServerFn");
    let f;
    if (s.method === "POST") {
      const h = await $T(s);
      (h?.contentType && c.set("content-type", h.contentType), (f = h?.body));
    }
    return await n0(async () =>
      o(e, { method: s.method, headers: c, signal: s.signal, body: f }),
    );
  }
  return await n0(() =>
    o(e, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    }),
  );
}
async function mh(e) {
  let t = !1;
  const o = {};
  if (
    (e.data !== void 0 && ((t = !0), (o.data = e.data)),
    e.context &&
      Object.keys(e.context).length > 0 &&
      ((t = !0), (o.context = e.context)),
    t)
  )
    return sS(o);
}
async function sS(e) {
  return JSON.stringify(await Promise.resolve(L2(e, { plugins: Fa })));
}
async function $T(e) {
  if (e.data instanceof FormData) {
    let o;
    return (
      e.context &&
        Object.keys(e.context).length > 0 &&
        (o = await sS(e.context)),
      o !== void 0 && e.data.set(BT, o),
      { body: e.data }
    );
  }
  const t = await mh(e);
  if (t) return { body: t, contentType: "application/json" };
}
async function n0(e) {
  const t = await (async () => {
    try {
      return await e();
    } catch (s) {
      if (s instanceof Response) return s;
      throw (console.log(s), s);
    }
  })();
  if (t.headers.get(HT) === "true") return t;
  const o = t.headers.get("content-type");
  Yt(o);
  const a = !!t.headers.get(IT);
  if (!t.ok) {
    if (a && o.includes("application/json")) {
      const s = await t.json();
      throw Pd(s, { plugins: Fa });
    }
    throw new Error(await t.text());
  }
  if (a) {
    let s;
    if (o.includes("application/x-ndjson")) {
      const u = new Map();
      s = await GT({
        response: t,
        onMessage: (c) => Pd(c, { refs: u, plugins: Fa }),
        onError(c, f) {
          console.error(c, f);
        },
      });
    }
    if (o.includes("application/json")) {
      const u = await t.json();
      s = Pd(u, { plugins: Fa });
    }
    if ((Yt(s), s instanceof Error)) throw s;
    return s;
  }
  if (o.includes("application/json")) {
    const s = await t.json(),
      u = cR(s);
    if (u) throw u;
    if (wn(s)) throw s;
    return s;
  }
  return t;
}
async function GT({ response: e, onMessage: t, onError: o }) {
  if (!e.body) throw new Error("No response body");
  const a = e.body.pipeThrough(new TextDecoderStream()).getReader();
  let s = "",
    u = !1,
    c;
  for (; !u; ) {
    const { value: f, done: h } = await a.read();
    if ((f && (s += f), s.length === 0 && h))
      throw new Error("Stream ended before first object");
    if (
      s.endsWith(`
`)
    ) {
      const p = s
          .split(
            `
`,
          )
          .filter(Boolean),
        v = p[0];
      if (!v) throw new Error("No JSON line in the first chunk");
      ((c = JSON.parse(v)),
        (u = !0),
        (s = p.slice(1).join(`
`)));
    } else {
      const p = s.indexOf(`
`);
      if (p >= 0) {
        const v = s.slice(0, p).trim();
        ((s = s.slice(p + 1)), v.length > 0 && ((c = JSON.parse(v)), (u = !0)));
      }
    }
  }
  return (
    (async () => {
      try {
        for (;;) {
          const { value: f, done: h } = await a.read();
          f && (s += f);
          const p = s.lastIndexOf(`
`);
          if (p >= 0) {
            const v = s.slice(0, p);
            s = s.slice(p + 1);
            const y = v
              .split(
                `
`,
              )
              .filter(Boolean);
            for (const g of y)
              try {
                t(JSON.parse(g));
              } catch (S) {
                o?.(`Invalid JSON line: ${g}`, S);
              }
          }
          if (h) break;
        }
      } catch (f) {
        o?.("Stream processing error:", f);
      }
    })(),
    t(c)
  );
}
function FT(e) {
  const t = "/_serverFn/" + e;
  return Object.assign((...a) => ZT(t, a, fetch), {
    url: t,
    functionId: e,
    [ph]: !0,
  });
}
const YT = {
  key: "$TSS/serverfn",
  test: (e) => (typeof e != "function" || !(ph in e) ? !1 : !!e[ph]),
  toSerializable: ({ functionId: e }) => ({ functionId: e }),
  fromSerializable: ({ functionId: e }) => FT(e),
};
var Wu = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  KT = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  QT = class {
    #e = KT;
    #t = !1;
    setTimeoutProvider(e) {
      this.#e = e;
    }
    setTimeout(e, t) {
      return this.#e.setTimeout(e, t);
    }
    clearTimeout(e) {
      this.#e.clearTimeout(e);
    }
    setInterval(e, t) {
      return this.#e.setInterval(e, t);
    }
    clearInterval(e) {
      this.#e.clearInterval(e);
    }
  },
  yh = new QT();
function XT(e) {
  setTimeout(e, 0);
}
var Ju = typeof window > "u" || "Deno" in globalThis;
function Ut() {}
function WT(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function JT(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function eC(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function vh(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tC(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function r0(e, t) {
  const {
    type: o = "all",
    exact: a,
    fetchStatus: s,
    predicate: u,
    queryKey: c,
    stale: f,
  } = e;
  if (c) {
    if (a) {
      if (t.queryHash !== np(c, t.options)) return !1;
    } else if (!Es(t.queryKey, c)) return !1;
  }
  if (o !== "all") {
    const h = t.isActive();
    if ((o === "active" && !h) || (o === "inactive" && h)) return !1;
  }
  return !(
    (typeof f == "boolean" && t.isStale() !== f) ||
    (s && s !== t.state.fetchStatus) ||
    (u && !u(t))
  );
}
function o0(e, t) {
  const { exact: o, status: a, predicate: s, mutationKey: u } = e;
  if (u) {
    if (!t.options.mutationKey) return !1;
    if (o) {
      if (xs(t.options.mutationKey) !== xs(u)) return !1;
    } else if (!Es(t.options.mutationKey, u)) return !1;
  }
  return !((a && t.state.status !== a) || (s && !s(t)));
}
function np(e, t) {
  return (t?.queryKeyHashFn || xs)(e);
}
function xs(e) {
  return JSON.stringify(e, (t, o) =>
    gh(o)
      ? Object.keys(o)
          .sort()
          .reduce((a, s) => ((a[s] = o[s]), a), {})
      : o,
  );
}
function Es(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? Object.keys(t).every((o) => Es(e[o], t[o]))
        : !1;
}
var nC = Object.prototype.hasOwnProperty;
function lS(e, t) {
  if (e === t) return e;
  const o = a0(e) && a0(t);
  if (!o && !(gh(e) && gh(t))) return t;
  const s = (o ? e : Object.keys(e)).length,
    u = o ? t : Object.keys(t),
    c = u.length,
    f = o ? new Array(c) : {};
  let h = 0;
  for (let p = 0; p < c; p++) {
    const v = o ? p : u[p],
      y = e[v],
      g = t[v];
    if (y === g) {
      ((f[v] = y), (o ? p < s : nC.call(e, v)) && h++);
      continue;
    }
    if (
      y === null ||
      g === null ||
      typeof y != "object" ||
      typeof g != "object"
    ) {
      f[v] = g;
      continue;
    }
    const S = lS(y, g);
    ((f[v] = S), S === y && h++);
  }
  return s === c && h === s ? e : f;
}
function X5(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const o in e) if (e[o] !== t[o]) return !1;
  return !0;
}
function a0(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function gh(e) {
  if (!i0(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const o = t.prototype;
  return !(
    !i0(o) ||
    !o.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function i0(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function rC(e) {
  return new Promise((t) => {
    yh.setTimeout(t, e);
  });
}
function oC(e, t, o) {
  return typeof o.structuralSharing == "function"
    ? o.structuralSharing(e, t)
    : o.structuralSharing !== !1
      ? lS(e, t)
      : t;
}
function aC(e, t, o = 0) {
  const a = [...e, t];
  return o && a.length > o ? a.slice(1) : a;
}
function iC(e, t, o = 0) {
  const a = [t, ...e];
  return o && a.length > o ? a.slice(0, -1) : a;
}
var br = Symbol();
function uS(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === br
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function W5(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var sC = class extends Wu {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!Ju && window.addEventListener) {
            const t = () => e();
            return (
              window.addEventListener("visibilitychange", t, !1),
              () => {
                window.removeEventListener("visibilitychange", t);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e),
        this.#t?.(),
        (this.#t = e((t) => {
          typeof t == "boolean" ? this.setFocused(t) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach((t) => {
        t(e);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  cS = new sC();
function lC() {
  let e, t;
  const o = new Promise((s, u) => {
    ((e = s), (t = u));
  });
  ((o.status = "pending"), o.catch(() => {}));
  function a(s) {
    (Object.assign(o, s), delete o.resolve, delete o.reject);
  }
  return (
    (o.resolve = (s) => {
      (a({ status: "fulfilled", value: s }), e(s));
    }),
    (o.reject = (s) => {
      (a({ status: "rejected", reason: s }), t(s));
    }),
    o
  );
}
function uC(e) {
  let t;
  if ((e.then((o) => ((t = o), o), Ut)?.catch(Ut), t !== void 0))
    return { data: t };
}
function fS(e) {
  return e;
}
function cC(e) {
  return {
    mutationKey: e.options.mutationKey,
    state: e.state,
    ...(e.options.scope && { scope: e.options.scope }),
    ...(e.meta && { meta: e.meta }),
  };
}
function fC(e, t, o) {
  const a = () => {
    const s = e.promise
      ?.then(t)
      .catch((u) =>
        o(u) ? Promise.reject(new Error("redacted")) : Promise.reject(u),
      );
    return (s?.catch(Ut), s);
  };
  return {
    dehydratedAt: Date.now(),
    state: {
      ...e.state,
      ...(e.state.data !== void 0 && { data: t(e.state.data) }),
    },
    queryKey: e.queryKey,
    queryHash: e.queryHash,
    ...(e.state.status === "pending" && { promise: a() }),
    ...(e.meta && { meta: e.meta }),
  };
}
function dC(e) {
  return e.state.isPaused;
}
function hC(e) {
  return e.state.status === "success";
}
function pC(e) {
  return !0;
}
function s0(e, t = {}) {
  const o =
      t.shouldDehydrateMutation ??
      e.getDefaultOptions().dehydrate?.shouldDehydrateMutation ??
      dC,
    a = e
      .getMutationCache()
      .getAll()
      .flatMap((h) => (o(h) ? [cC(h)] : [])),
    s =
      t.shouldDehydrateQuery ??
      e.getDefaultOptions().dehydrate?.shouldDehydrateQuery ??
      hC,
    u =
      t.shouldRedactErrors ??
      e.getDefaultOptions().dehydrate?.shouldRedactErrors ??
      pC,
    c = t.serializeData ?? e.getDefaultOptions().dehydrate?.serializeData ?? fS,
    f = e
      .getQueryCache()
      .getAll()
      .flatMap((h) => (s(h) ? [fC(h, c, u)] : []));
  return { mutations: a, queries: f };
}
function l0(e, t, o) {
  if (typeof t != "object" || t === null) return;
  const a = e.getMutationCache(),
    s = e.getQueryCache(),
    u = e.getDefaultOptions().hydrate?.deserializeData ?? fS,
    c = t.mutations || [],
    f = t.queries || [];
  (c.forEach(({ state: h, ...p }) => {
    a.build(
      e,
      {
        ...e.getDefaultOptions().hydrate?.mutations,
        ...o?.defaultOptions?.mutations,
        ...p,
      },
      h,
    );
  }),
    f.forEach(
      ({
        queryKey: h,
        state: p,
        queryHash: v,
        meta: y,
        promise: g,
        dehydratedAt: S,
      }) => {
        const w = g ? uC(g) : void 0,
          _ = p.data === void 0 ? w?.data : p.data,
          T = _ === void 0 ? _ : u(_);
        let A = s.get(v);
        const N = A?.state.status === "pending",
          P = A?.state.fetchStatus === "fetching";
        if (A) {
          const k = w && S !== void 0 && S > A.state.dataUpdatedAt;
          if (p.dataUpdatedAt > A.state.dataUpdatedAt || k) {
            const { fetchStatus: H, ...F } = p;
            A.setState({ ...F, data: T });
          }
        } else
          A = s.build(
            e,
            {
              ...e.getDefaultOptions().hydrate?.queries,
              ...o?.defaultOptions?.queries,
              queryKey: h,
              queryHash: v,
              meta: y,
            },
            {
              ...p,
              data: T,
              fetchStatus: "idle",
              status: T !== void 0 ? "success" : p.status,
            },
          );
        g &&
          !N &&
          !P &&
          (S === void 0 || S > A.state.dataUpdatedAt) &&
          A.fetch(void 0, { initialPromise: Promise.resolve(g).then(u) }).catch(
            Ut,
          );
      },
    ));
}
var mC = XT;
function yC() {
  let e = [],
    t = 0,
    o = (f) => {
      f();
    },
    a = (f) => {
      f();
    },
    s = mC;
  const u = (f) => {
      t
        ? e.push(f)
        : s(() => {
            o(f);
          });
    },
    c = () => {
      const f = e;
      ((e = []),
        f.length &&
          s(() => {
            a(() => {
              f.forEach((h) => {
                o(h);
              });
            });
          }));
    };
  return {
    batch: (f) => {
      let h;
      t++;
      try {
        h = f();
      } finally {
        (t--, t || c());
      }
      return h;
    },
    batchCalls:
      (f) =>
      (...h) => {
        u(() => {
          f(...h);
        });
      },
    schedule: u,
    setNotifyFunction: (f) => {
      o = f;
    },
    setBatchNotifyFunction: (f) => {
      a = f;
    },
    setScheduler: (f) => {
      s = f;
    },
  };
}
var Bt = yC(),
  vC = class extends Wu {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!Ju && window.addEventListener) {
            const t = () => e(!0),
              o = () => e(!1);
            return (
              window.addEventListener("online", t, !1),
              window.addEventListener("offline", o, !1),
              () => {
                (window.removeEventListener("online", t),
                  window.removeEventListener("offline", o));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((o) => {
          o(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  Bu = new vC();
function gC(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function dS(e) {
  return (e ?? "online") === "online" ? Bu.isOnline() : !0;
}
var bh = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent));
  }
};
function hS(e) {
  let t = !1,
    o = 0,
    a;
  const s = lC(),
    u = () => s.status !== "pending",
    c = (_) => {
      if (!u()) {
        const T = new bh(_);
        (g(T), e.onCancel?.(T));
      }
    },
    f = () => {
      t = !0;
    },
    h = () => {
      t = !1;
    },
    p = () =>
      cS.isFocused() &&
      (e.networkMode === "always" || Bu.isOnline()) &&
      e.canRun(),
    v = () => dS(e.networkMode) && e.canRun(),
    y = (_) => {
      u() || (a?.(), s.resolve(_));
    },
    g = (_) => {
      u() || (a?.(), s.reject(_));
    },
    S = () =>
      new Promise((_) => {
        ((a = (T) => {
          (u() || p()) && _(T);
        }),
          e.onPause?.());
      }).then(() => {
        ((a = void 0), u() || e.onContinue?.());
      }),
    w = () => {
      if (u()) return;
      let _;
      const T = o === 0 ? e.initialPromise : void 0;
      try {
        _ = T ?? e.fn();
      } catch (A) {
        _ = Promise.reject(A);
      }
      Promise.resolve(_)
        .then(y)
        .catch((A) => {
          if (u()) return;
          const N = e.retry ?? (Ju ? 0 : 3),
            P = e.retryDelay ?? gC,
            k = typeof P == "function" ? P(o, A) : P,
            H =
              N === !0 ||
              (typeof N == "number" && o < N) ||
              (typeof N == "function" && N(o, A));
          if (t || !H) {
            g(A);
            return;
          }
          (o++,
            e.onFail?.(o, A),
            rC(k)
              .then(() => (p() ? void 0 : S()))
              .then(() => {
                t ? g(A) : w();
              }));
        });
    };
  return {
    promise: s,
    status: () => s.status,
    cancel: c,
    continue: () => (a?.(), s),
    cancelRetry: f,
    continueRetry: h,
    canStart: v,
    start: () => (v() ? w() : S().then(w), s),
  };
}
var pS = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        JT(this.gcTime) &&
          (this.#e = yh.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(e) {
      this.gcTime = Math.max(this.gcTime || 0, e ?? (Ju ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#e && (yh.clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  bC = class extends pS {
    #e;
    #t;
    #n;
    #o;
    #r;
    #i;
    #s;
    constructor(e) {
      (super(),
        (this.#s = !1),
        (this.#i = e.defaultOptions),
        this.setOptions(e.options),
        (this.observers = []),
        (this.#o = e.client),
        (this.#n = this.#o.getQueryCache()),
        (this.queryKey = e.queryKey),
        (this.queryHash = e.queryHash),
        (this.#e = c0(this.options)),
        (this.state = e.state ?? this.#e),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#r?.promise;
    }
    setOptions(e) {
      if (
        ((this.options = { ...this.#i, ...e }),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0)
      ) {
        const t = c0(this.options);
        t.data !== void 0 &&
          (this.setState(u0(t.data, t.dataUpdatedAt)), (this.#e = t));
      }
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(e, t) {
      const o = oC(this.state.data, e, this.options);
      return (
        this.#a({
          data: o,
          type: "success",
          dataUpdatedAt: t?.updatedAt,
          manual: t?.manual,
        }),
        o
      );
    }
    setState(e, t) {
      this.#a({ type: "setState", state: e, setStateOptions: t });
    }
    cancel(e) {
      const t = this.#r?.promise;
      return (this.#r?.cancel(e), t ? t.then(Ut).catch(Ut) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    reset() {
      (this.destroy(), this.setState(this.#e));
    }
    isActive() {
      return this.observers.some((e) => tC(e.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === br ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => vh(e.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => e.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(e = 0) {
      return this.state.data === void 0
        ? !0
        : e === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !eC(this.state.dataUpdatedAt, e);
    }
    onFocus() {
      (this.observers
        .find((t) => t.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#r?.continue());
    }
    onOnline() {
      (this.observers
        .find((t) => t.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#r?.continue());
    }
    addObserver(e) {
      this.observers.includes(e) ||
        (this.observers.push(e),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: e }));
    }
    removeObserver(e) {
      this.observers.includes(e) &&
        ((this.observers = this.observers.filter((t) => t !== e)),
        this.observers.length ||
          (this.#r &&
            (this.#s ? this.#r.cancel({ revert: !0 }) : this.#r.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: e }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#a({ type: "invalidate" });
    }
    async fetch(e, t) {
      if (
        this.state.fetchStatus !== "idle" &&
        this.#r?.status() !== "rejected"
      ) {
        if (this.state.data !== void 0 && t?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#r) return (this.#r.continueRetry(), this.#r.promise);
      }
      if ((e && this.setOptions(e), !this.options.queryFn)) {
        const f = this.observers.find((h) => h.options.queryFn);
        f && this.setOptions(f.options);
      }
      const o = new AbortController(),
        a = (f) => {
          Object.defineProperty(f, "signal", {
            enumerable: !0,
            get: () => ((this.#s = !0), o.signal),
          });
        },
        s = () => {
          const f = uS(this.options, t),
            p = (() => {
              const v = {
                client: this.#o,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return (a(v), v);
            })();
          return (
            (this.#s = !1),
            this.options.persister ? this.options.persister(f, p, this) : f(p)
          );
        },
        c = (() => {
          const f = {
            fetchOptions: t,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#o,
            state: this.state,
            fetchFn: s,
          };
          return (a(f), f);
        })();
      (this.options.behavior?.onFetch(c, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== c.fetchOptions?.meta) &&
          this.#a({ type: "fetch", meta: c.fetchOptions?.meta }),
        (this.#r = hS({
          initialPromise: t?.initialPromise,
          fn: c.fetchFn,
          onCancel: (f) => {
            (f instanceof bh &&
              f.revert &&
              this.setState({ ...this.#t, fetchStatus: "idle" }),
              o.abort());
          },
          onFail: (f, h) => {
            this.#a({ type: "failed", failureCount: f, error: h });
          },
          onPause: () => {
            this.#a({ type: "pause" });
          },
          onContinue: () => {
            this.#a({ type: "continue" });
          },
          retry: c.options.retry,
          retryDelay: c.options.retryDelay,
          networkMode: c.options.networkMode,
          canRun: () => !0,
        })));
      try {
        const f = await this.#r.start();
        if (f === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(f),
          this.#n.config.onSuccess?.(f, this),
          this.#n.config.onSettled?.(f, this.state.error, this),
          f
        );
      } catch (f) {
        if (f instanceof bh) {
          if (f.silent) return this.#r.promise;
          if (f.revert) {
            if (this.state.data === void 0) throw f;
            return this.state.data;
          }
        }
        throw (
          this.#a({ type: "error", error: f }),
          this.#n.config.onError?.(f, this),
          this.#n.config.onSettled?.(this.state.data, f, this),
          f
        );
      } finally {
        this.scheduleGc();
      }
    }
    #a(e) {
      const t = (o) => {
        switch (e.type) {
          case "failed":
            return {
              ...o,
              fetchFailureCount: e.failureCount,
              fetchFailureReason: e.error,
            };
          case "pause":
            return { ...o, fetchStatus: "paused" };
          case "continue":
            return { ...o, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...o,
              ...SC(o.data, this.options),
              fetchMeta: e.meta ?? null,
            };
          case "success":
            const a = {
              ...o,
              ...u0(e.data, e.dataUpdatedAt),
              dataUpdateCount: o.dataUpdateCount + 1,
              ...(!e.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return ((this.#t = e.manual ? a : void 0), a);
          case "error":
            const s = e.error;
            return {
              ...o,
              error: s,
              errorUpdateCount: o.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: o.fetchFailureCount + 1,
              fetchFailureReason: s,
              fetchStatus: "idle",
              status: "error",
            };
          case "invalidate":
            return { ...o, isInvalidated: !0 };
          case "setState":
            return { ...o, ...e.state };
        }
      };
      ((this.state = t(this.state)),
        Bt.batch(() => {
          (this.observers.forEach((o) => {
            o.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: e }));
        }));
    }
  };
function SC(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: dS(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function u0(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function c0(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    o = t !== void 0,
    a = o
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? (a ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: o ? "success" : "pending",
    fetchStatus: "idle",
  };
}
function f0(e) {
  return {
    onFetch: (t, o) => {
      const a = t.options,
        s = t.fetchOptions?.meta?.fetchMore?.direction,
        u = t.state.data?.pages || [],
        c = t.state.data?.pageParams || [];
      let f = { pages: [], pageParams: [] },
        h = 0;
      const p = async () => {
        let v = !1;
        const y = (w) => {
            Object.defineProperty(w, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (v = !0)
                  : t.signal.addEventListener("abort", () => {
                      v = !0;
                    }),
                t.signal
              ),
            });
          },
          g = uS(t.options, t.fetchOptions),
          S = async (w, _, T) => {
            if (v) return Promise.reject();
            if (_ == null && w.pages.length) return Promise.resolve(w);
            const N = (() => {
                const F = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: _,
                  direction: T ? "backward" : "forward",
                  meta: t.options.meta,
                };
                return (y(F), F);
              })(),
              P = await g(N),
              { maxPages: k } = t.options,
              H = T ? iC : aC;
            return {
              pages: H(w.pages, P, k),
              pageParams: H(w.pageParams, _, k),
            };
          };
        if (s && u.length) {
          const w = s === "backward",
            _ = w ? wC : d0,
            T = { pages: u, pageParams: c },
            A = _(a, T);
          f = await S(T, A, w);
        } else {
          const w = e ?? u.length;
          do {
            const _ = h === 0 ? (c[0] ?? a.initialPageParam) : d0(a, f);
            if (h > 0 && _ == null) break;
            ((f = await S(f, _)), h++);
          } while (h < w);
        }
        return f;
      };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              p,
              {
                client: t.client,
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal,
              },
              o,
            ))
        : (t.fetchFn = p);
    },
  };
}
function d0(e, { pages: t, pageParams: o }) {
  const a = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[a], t, o[a], o) : void 0;
}
function wC(e, { pages: t, pageParams: o }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, o[0], o) : void 0;
}
var _C = class extends pS {
  #e;
  #t;
  #n;
  #o;
  constructor(e) {
    (super(),
      (this.#e = e.client),
      (this.mutationId = e.mutationId),
      (this.#n = e.mutationCache),
      (this.#t = []),
      (this.state = e.state || xC()),
      this.setOptions(e.options),
      this.scheduleGc());
  }
  setOptions(e) {
    ((this.options = e), this.updateGcTime(this.options.gcTime));
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    this.#t.includes(e) ||
      (this.#t.push(e),
      this.clearGcTimeout(),
      this.#n.notify({ type: "observerAdded", mutation: this, observer: e }));
  }
  removeObserver(e) {
    ((this.#t = this.#t.filter((t) => t !== e)),
      this.scheduleGc(),
      this.#n.notify({ type: "observerRemoved", mutation: this, observer: e }));
  }
  optionalRemove() {
    this.#t.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#n.remove(this));
  }
  continue() {
    return this.#o?.continue() ?? this.execute(this.state.variables);
  }
  async execute(e) {
    const t = () => {
        this.#r({ type: "continue" });
      },
      o = {
        client: this.#e,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#o = hS({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(e, o)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (u, c) => {
        this.#r({ type: "failed", failureCount: u, error: c });
      },
      onPause: () => {
        this.#r({ type: "pause" });
      },
      onContinue: t,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this),
    });
    const a = this.state.status === "pending",
      s = !this.#o.canStart();
    try {
      if (a) t();
      else {
        (this.#r({ type: "pending", variables: e, isPaused: s }),
          await this.#n.config.onMutate?.(e, this, o));
        const c = await this.options.onMutate?.(e, o);
        c !== this.state.context &&
          this.#r({ type: "pending", context: c, variables: e, isPaused: s });
      }
      const u = await this.#o.start();
      return (
        await this.#n.config.onSuccess?.(u, e, this.state.context, this, o),
        await this.options.onSuccess?.(u, e, this.state.context, o),
        await this.#n.config.onSettled?.(
          u,
          null,
          this.state.variables,
          this.state.context,
          this,
          o,
        ),
        await this.options.onSettled?.(u, null, e, this.state.context, o),
        this.#r({ type: "success", data: u }),
        u
      );
    } catch (u) {
      try {
        throw (
          await this.#n.config.onError?.(u, e, this.state.context, this, o),
          await this.options.onError?.(u, e, this.state.context, o),
          await this.#n.config.onSettled?.(
            void 0,
            u,
            this.state.variables,
            this.state.context,
            this,
            o,
          ),
          await this.options.onSettled?.(void 0, u, e, this.state.context, o),
          u
        );
      } finally {
        this.#r({ type: "error", error: u });
      }
    } finally {
      this.#n.runNext(this);
    }
  }
  #r(e) {
    const t = (o) => {
      switch (e.type) {
        case "failed":
          return { ...o, failureCount: e.failureCount, failureReason: e.error };
        case "pause":
          return { ...o, isPaused: !0 };
        case "continue":
          return { ...o, isPaused: !1 };
        case "pending":
          return {
            ...o,
            context: e.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: e.isPaused,
            status: "pending",
            variables: e.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...o,
            data: e.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...o,
            data: void 0,
            error: e.error,
            failureCount: o.failureCount + 1,
            failureReason: e.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    ((this.state = t(this.state)),
      Bt.batch(() => {
        (this.#t.forEach((o) => {
          o.onMutationUpdate(e);
        }),
          this.#n.notify({ mutation: this, type: "updated", action: e }));
      }));
  }
};
function xC() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var EC = class extends Wu {
  constructor(e = {}) {
    (super(),
      (this.config = e),
      (this.#e = new Set()),
      (this.#t = new Map()),
      (this.#n = 0));
  }
  #e;
  #t;
  #n;
  build(e, t, o) {
    const a = new _C({
      client: e,
      mutationCache: this,
      mutationId: ++this.#n,
      options: e.defaultMutationOptions(t),
      state: o,
    });
    return (this.add(a), a);
  }
  add(e) {
    this.#e.add(e);
    const t = uu(e);
    if (typeof t == "string") {
      const o = this.#t.get(t);
      o ? o.push(e) : this.#t.set(t, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#e.delete(e)) {
      const t = uu(e);
      if (typeof t == "string") {
        const o = this.#t.get(t);
        if (o)
          if (o.length > 1) {
            const a = o.indexOf(e);
            a !== -1 && o.splice(a, 1);
          } else o[0] === e && this.#t.delete(t);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const t = uu(e);
    if (typeof t == "string") {
      const a = this.#t.get(t)?.find((s) => s.state.status === "pending");
      return !a || a === e;
    } else return !0;
  }
  runNext(e) {
    const t = uu(e);
    return typeof t == "string"
      ? (this.#t
          .get(t)
          ?.find((a) => a !== e && a.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    Bt.batch(() => {
      (this.#e.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }),
        this.#e.clear(),
        this.#t.clear());
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(e) {
    const t = { exact: !0, ...e };
    return this.getAll().find((o) => o0(t, o));
  }
  findAll(e = {}) {
    return this.getAll().filter((t) => o0(e, t));
  }
  notify(e) {
    Bt.batch(() => {
      this.listeners.forEach((t) => {
        t(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((t) => t.state.isPaused);
    return Bt.batch(() => Promise.all(e.map((t) => t.continue().catch(Ut))));
  }
};
function uu(e) {
  return e.options.scope?.id;
}
var RC = class extends Wu {
    constructor(e = {}) {
      (super(), (this.config = e), (this.#e = new Map()));
    }
    #e;
    build(e, t, o) {
      const a = t.queryKey,
        s = t.queryHash ?? np(a, t);
      let u = this.get(s);
      return (
        u ||
          ((u = new bC({
            client: e,
            queryKey: a,
            queryHash: s,
            options: e.defaultQueryOptions(t),
            state: o,
            defaultOptions: e.getQueryDefaults(a),
          })),
          this.add(u)),
        u
      );
    }
    add(e) {
      this.#e.has(e.queryHash) ||
        (this.#e.set(e.queryHash, e), this.notify({ type: "added", query: e }));
    }
    remove(e) {
      const t = this.#e.get(e.queryHash);
      t &&
        (e.destroy(),
        t === e && this.#e.delete(e.queryHash),
        this.notify({ type: "removed", query: e }));
    }
    clear() {
      Bt.batch(() => {
        this.getAll().forEach((e) => {
          this.remove(e);
        });
      });
    }
    get(e) {
      return this.#e.get(e);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(e) {
      const t = { exact: !0, ...e };
      return this.getAll().find((o) => r0(t, o));
    }
    findAll(e = {}) {
      const t = this.getAll();
      return Object.keys(e).length > 0 ? t.filter((o) => r0(e, o)) : t;
    }
    notify(e) {
      Bt.batch(() => {
        this.listeners.forEach((t) => {
          t(e);
        });
      });
    }
    onFocus() {
      Bt.batch(() => {
        this.getAll().forEach((e) => {
          e.onFocus();
        });
      });
    }
    onOnline() {
      Bt.batch(() => {
        this.getAll().forEach((e) => {
          e.onOnline();
        });
      });
    }
  },
  TC = class {
    #e;
    #t;
    #n;
    #o;
    #r;
    #i;
    #s;
    #a;
    constructor(e = {}) {
      ((this.#e = e.queryCache || new RC()),
        (this.#t = e.mutationCache || new EC()),
        (this.#n = e.defaultOptions || {}),
        (this.#o = new Map()),
        (this.#r = new Map()),
        (this.#i = 0));
    }
    mount() {
      (this.#i++,
        this.#i === 1 &&
          ((this.#s = cS.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#a = Bu.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onOnline());
          }))));
    }
    unmount() {
      (this.#i--,
        this.#i === 0 &&
          (this.#s?.(), (this.#s = void 0), this.#a?.(), (this.#a = void 0)));
    }
    isFetching(e) {
      return this.#e.findAll({ ...e, fetchStatus: "fetching" }).length;
    }
    isMutating(e) {
      return this.#t.findAll({ ...e, status: "pending" }).length;
    }
    getQueryData(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(t.queryHash)?.state.data;
    }
    ensureQueryData(e) {
      const t = this.defaultQueryOptions(e),
        o = this.#e.build(this, t),
        a = o.state.data;
      return a === void 0
        ? this.fetchQuery(e)
        : (e.revalidateIfStale &&
            o.isStaleByTime(vh(t.staleTime, o)) &&
            this.prefetchQuery(t),
          Promise.resolve(a));
    }
    getQueriesData(e) {
      return this.#e.findAll(e).map(({ queryKey: t, state: o }) => {
        const a = o.data;
        return [t, a];
      });
    }
    setQueryData(e, t, o) {
      const a = this.defaultQueryOptions({ queryKey: e }),
        u = this.#e.get(a.queryHash)?.state.data,
        c = WT(t, u);
      if (c !== void 0)
        return this.#e.build(this, a).setData(c, { ...o, manual: !0 });
    }
    setQueriesData(e, t, o) {
      return Bt.batch(() =>
        this.#e
          .findAll(e)
          .map(({ queryKey: a }) => [a, this.setQueryData(a, t, o)]),
      );
    }
    getQueryState(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(t.queryHash)?.state;
    }
    removeQueries(e) {
      const t = this.#e;
      Bt.batch(() => {
        t.findAll(e).forEach((o) => {
          t.remove(o);
        });
      });
    }
    resetQueries(e, t) {
      const o = this.#e;
      return Bt.batch(
        () => (
          o.findAll(e).forEach((a) => {
            a.reset();
          }),
          this.refetchQueries({ type: "active", ...e }, t)
        ),
      );
    }
    cancelQueries(e, t = {}) {
      const o = { revert: !0, ...t },
        a = Bt.batch(() => this.#e.findAll(e).map((s) => s.cancel(o)));
      return Promise.all(a).then(Ut).catch(Ut);
    }
    invalidateQueries(e, t = {}) {
      return Bt.batch(
        () => (
          this.#e.findAll(e).forEach((o) => {
            o.invalidate();
          }),
          e?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                t,
              )
        ),
      );
    }
    refetchQueries(e, t = {}) {
      const o = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
        a = Bt.batch(() =>
          this.#e
            .findAll(e)
            .filter((s) => !s.isDisabled() && !s.isStatic())
            .map((s) => {
              let u = s.fetch(void 0, o);
              return (
                o.throwOnError || (u = u.catch(Ut)),
                s.state.fetchStatus === "paused" ? Promise.resolve() : u
              );
            }),
        );
      return Promise.all(a).then(Ut);
    }
    fetchQuery(e) {
      const t = this.defaultQueryOptions(e);
      t.retry === void 0 && (t.retry = !1);
      const o = this.#e.build(this, t);
      return o.isStaleByTime(vh(t.staleTime, o))
        ? o.fetch(t)
        : Promise.resolve(o.state.data);
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(Ut).catch(Ut);
    }
    fetchInfiniteQuery(e) {
      return ((e.behavior = f0(e.pages)), this.fetchQuery(e));
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(Ut).catch(Ut);
    }
    ensureInfiniteQueryData(e) {
      return ((e.behavior = f0(e.pages)), this.ensureQueryData(e));
    }
    resumePausedMutations() {
      return Bu.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(e) {
      this.#n = e;
    }
    setQueryDefaults(e, t) {
      this.#o.set(xs(e), { queryKey: e, defaultOptions: t });
    }
    getQueryDefaults(e) {
      const t = [...this.#o.values()],
        o = {};
      return (
        t.forEach((a) => {
          Es(e, a.queryKey) && Object.assign(o, a.defaultOptions);
        }),
        o
      );
    }
    setMutationDefaults(e, t) {
      this.#r.set(xs(e), { mutationKey: e, defaultOptions: t });
    }
    getMutationDefaults(e) {
      const t = [...this.#r.values()],
        o = {};
      return (
        t.forEach((a) => {
          Es(e, a.mutationKey) && Object.assign(o, a.defaultOptions);
        }),
        o
      );
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const t = {
        ...this.#n.queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0,
      };
      return (
        t.queryHash || (t.queryHash = np(t.queryKey, t)),
        t.refetchOnReconnect === void 0 &&
          (t.refetchOnReconnect = t.networkMode !== "always"),
        t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
        !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
        t.queryFn === br && (t.enabled = !1),
        t
      );
    }
    defaultMutationOptions(e) {
      return e?._defaulted
        ? e
        : {
            ...this.#n.mutations,
            ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
            ...e,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#e.clear(), this.#t.clear());
    }
  },
  mS = E.createContext(void 0),
  J5 = (e) => {
    const t = E.useContext(mS);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  CC = ({ client: e, children: t }) => (
    E.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    D.jsx(mS.Provider, { value: e, children: t })
  );
function OC({ router: e, queryClient: t, handleRedirects: o = !0 }) {
  const a = e.options.hydrate,
    s = e.options.dehydrate;
  if (e.isServer) {
    const u = new Set(),
      c = AC();
    e.options.dehydrate = async () => {
      e.serverSsr.onRenderFinished(() => c.close());
      const p = { ...(await s?.()), queryStream: c.stream },
        v = s0(t);
      return (
        v.queries.length > 0 &&
          (v.queries.forEach((y) => {
            u.add(y.queryHash);
          }),
          (p.dehydratedQueryClient = v)),
        p
      );
    };
    const f = t.getDefaultOptions();
    (t.setDefaultOptions({
      ...f,
      dehydrate: { shouldDehydrateQuery: () => !0, ...f.dehydrate },
    }),
      t.getQueryCache().subscribe((h) => {
        if (
          e.serverSsr?.isDehydrated() &&
          !u.has(h.query.queryHash) &&
          h.query.promise
        ) {
          if (c.isClosed()) {
            console.warn(
              `tried to stream query ${h.query.queryHash} after stream was already closed`,
            );
            return;
          }
          (u.add(h.query.queryHash),
            c.enqueue(
              s0(t, {
                shouldDehydrateQuery: (p) =>
                  p.queryHash === h.query.queryHash
                    ? (f.dehydrate?.shouldDehydrateQuery?.(p) ?? !0)
                    : !1,
              }),
            ));
        }
      }));
  } else if (
    ((e.options.hydrate = async (u) => {
      (await a?.(u), u.dehydratedQueryClient && l0(t, u.dehydratedQueryClient));
      const c = u.queryStream.getReader();
      c.read()
        .then(async function f({ done: h, value: p }) {
          if ((l0(t, p), h)) return;
          const v = await c.read();
          return f(v);
        })
        .catch((f) => {
          console.error("Error reading query stream:", f);
        });
    }),
    o)
  ) {
    const u = t.getMutationCache().config;
    t.getMutationCache().config = {
      ...u,
      onError: (f, ...h) =>
        bn(f)
          ? ((f.options._fromLocation = e.state.location),
            e.navigate(e.resolveRedirect(f).options))
          : u.onError?.(f, ...h),
    };
    const c = t.getQueryCache().config;
    t.getQueryCache().config = {
      ...c,
      onError: (f, ...h) =>
        bn(f)
          ? ((f.options._fromLocation = e.state.location),
            e.navigate(e.resolveRedirect(f).options))
          : c.onError?.(f, ...h),
    };
  }
}
function AC() {
  let e;
  const t = new ReadableStream({
    start(a) {
      e = a;
    },
  });
  let o = !1;
  return {
    stream: t,
    enqueue: (a) => e.enqueue(a),
    close: () => {
      (e.close(), (o = !0));
    },
    isClosed: () => o,
    error: (a) => e.error(a),
  };
}
function MC(e) {
  if ((OC(e), e.wrapQueryClient === !1)) return;
  const t = e.router.options.Wrap || E.Fragment;
  e.router.options.Wrap = ({ children: o }) =>
    D.jsx(CC, { client: e.queryClient, children: D.jsx(t, { children: o }) });
}
var DC = Object.create,
  yS = Object.defineProperty,
  zC = Object.getOwnPropertyDescriptor,
  vS = Object.getOwnPropertyNames,
  PC = Object.getPrototypeOf,
  jC = Object.prototype.hasOwnProperty,
  Yn = (e, t) =>
    function () {
      return (
        t || (0, e[vS(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  NC = (e, t, o, a) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var s = vS(t), u = 0, c = s.length, f; u < c; u++)
        ((f = s[u]),
          !jC.call(e, f) &&
            f !== o &&
            yS(e, f, {
              get: ((h) => t[h]).bind(null, f),
              enumerable: !(a = zC(t, f)) || a.enumerable,
            }));
    return e;
  },
  lt = (e, t, o) => (
    (o = e != null ? DC(PC(e)) : {}),
    NC(yS(o, "default", { value: e, enumerable: !0 }), e)
  ),
  gS = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function o(a) {
        "@babel/helpers - typeof";
        return (
          (t.exports = o =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (s) {
                  return typeof s;
                }
              : function (s) {
                  return s &&
                    typeof Symbol == "function" &&
                    s.constructor === Symbol &&
                    s !== Symbol.prototype
                    ? "symbol"
                    : typeof s;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          o(a)
        );
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  kC = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var o = gS().default;
      function a(s, u) {
        if (o(s) != "object" || !s) return s;
        var c = s[Symbol.toPrimitive];
        if (c !== void 0) {
          var f = c.call(s, u || "default");
          if (o(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (u === "string" ? String : Number)(s);
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  LC = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var o = gS().default,
        a = kC();
      function s(u) {
        var c = a(u, "string");
        return o(c) == "symbol" ? c : c + "";
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Ho = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var o = LC();
      function a(s, u, c) {
        return (
          (u = o(u)) in s
            ? Object.defineProperty(s, u, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (s[u] = c),
          s
        );
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Dn = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var o = Ho();
      function a(u, c) {
        var f = Object.keys(u);
        if (Object.getOwnPropertySymbols) {
          var h = Object.getOwnPropertySymbols(u);
          (c &&
            (h = h.filter(function (p) {
              return Object.getOwnPropertyDescriptor(u, p).enumerable;
            })),
            f.push.apply(f, h));
        }
        return f;
      }
      function s(u) {
        for (var c = 1; c < arguments.length; c++) {
          var f = arguments[c] != null ? arguments[c] : {};
          c % 2
            ? a(Object(f), !0).forEach(function (h) {
                o(u, h, f[h]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(f))
              : a(Object(f)).forEach(function (h) {
                  Object.defineProperty(
                    u,
                    h,
                    Object.getOwnPropertyDescriptor(f, h),
                  );
                });
        }
        return u;
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
function ri(e) {
  const t = {
    subscribe(o) {
      let a = null,
        s = !1,
        u = !1,
        c = !1;
      function f() {
        if (a === null) {
          c = !0;
          return;
        }
        u || ((u = !0), typeof a == "function" ? a() : a && a.unsubscribe());
      }
      return (
        (a = e({
          next(h) {
            var p;
            s || (p = o.next) === null || p === void 0 || p.call(o, h);
          },
          error(h) {
            var p;
            s ||
              ((s = !0),
              (p = o.error) === null || p === void 0 || p.call(o, h),
              f());
          },
          complete() {
            var h;
            s ||
              ((s = !0),
              (h = o.complete) === null || h === void 0 || h.call(o),
              f());
          },
        })),
        c && f(),
        { unsubscribe: f }
      );
    },
    pipe(...o) {
      return o.reduce(UC, t);
    },
  };
  return t;
}
function UC(e, t) {
  return t(e);
}
function BC(e) {
  const t = new AbortController();
  return new Promise((a, s) => {
    let u = !1;
    function c() {
      u || ((u = !0), f.unsubscribe());
    }
    t.signal.addEventListener("abort", () => {
      s(t.signal.reason);
    });
    const f = e.subscribe({
      next(h) {
        ((u = !0), a(h), c());
      },
      error(h) {
        s(h);
      },
      complete() {
        (t.abort(), c());
      },
    });
  });
}
function IC(e) {
  return (t) => {
    let o = 0,
      a = null;
    const s = [];
    function u() {
      a ||
        (a = t.subscribe({
          next(f) {
            for (const p of s) {
              var h;
              (h = p.next) === null || h === void 0 || h.call(p, f);
            }
          },
          error(f) {
            for (const p of s) {
              var h;
              (h = p.error) === null || h === void 0 || h.call(p, f);
            }
          },
          complete() {
            for (const h of s) {
              var f;
              (f = h.complete) === null || f === void 0 || f.call(h);
            }
          },
        }));
    }
    function c() {
      if (o === 0 && a) {
        const f = a;
        ((a = null), f.unsubscribe());
      }
    }
    return ri(
      (f) => (
        o++,
        s.push(f),
        u(),
        {
          unsubscribe() {
            (o--, c());
            const h = s.findIndex((p) => p === f);
            h > -1 && s.splice(h, 1);
          },
        }
      ),
    );
  };
}
function HC(e) {
  return (t) =>
    ri((o) =>
      t.subscribe({
        next(a) {
          var s;
          ((s = e.next) === null || s === void 0 || s.call(e, a), o.next(a));
        },
        error(a) {
          var s;
          ((s = e.error) === null || s === void 0 || s.call(e, a), o.error(a));
        },
        complete() {
          var a;
          ((a = e.complete) === null || a === void 0 || a.call(e),
            o.complete());
        },
      }),
    );
}
function qC(e) {
  let t = e;
  const o = [],
    a = (c) => {
      (t !== void 0 && c.next(t), o.push(c));
    },
    s = (c) => {
      o.splice(o.indexOf(c), 1);
    },
    u = ri(
      (c) => (
        a(c),
        () => {
          s(c);
        }
      ),
    );
  return (
    (u.next = (c) => {
      if (t !== c) {
        t = c;
        for (const f of o) f.next(c);
      }
    }),
    (u.get = () => t),
    u
  );
}
function VC(e) {
  return ri((t) => {
    function o(s = 0, u = e.op) {
      const c = e.links[s];
      if (!c)
        throw new Error(
          "No more links to execute - did you forget to add an ending link?",
        );
      return c({
        op: u,
        next(h) {
          return o(s + 1, h);
        },
      });
    }
    return o().subscribe(t);
  });
}
function ei(e) {
  return !!e && !Array.isArray(e) && typeof e == "object";
}
function ZC(e) {
  return typeof e == "function";
}
const $C = typeof Symbol == "function" && !!Symbol.asyncIterator;
function GC(e) {
  return $C && ei(e) && Symbol.asyncIterator in e;
}
const Sh = (e) => e();
var FC = Object.create,
  bS = Object.defineProperty,
  YC = Object.getOwnPropertyDescriptor,
  SS = Object.getOwnPropertyNames,
  KC = Object.getPrototypeOf,
  QC = Object.prototype.hasOwnProperty,
  zn = (e, t) =>
    function () {
      return (
        t || (0, e[SS(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  XC = (e, t, o, a) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var s = SS(t), u = 0, c = s.length, f; u < c; u++)
        ((f = s[u]),
          !QC.call(e, f) &&
            f !== o &&
            bS(e, f, {
              get: ((h) => t[h]).bind(null, f),
              enumerable: !(a = YC(t, f)) || a.enumerable,
            }));
    return e;
  },
  $e = (e, t, o) => (
    (o = e != null ? FC(KC(e)) : {}),
    XC(bS(o, "default", { value: e, enumerable: !0 }), e)
  );
const wS = () => {},
  h0 = (e) => {
    Object.freeze && Object.freeze(e);
  };
function _S(e, t, o) {
  var a;
  const s = t.join(".");
  return (
    ((a = o[s]) !== null && a !== void 0) ||
      (o[s] = new Proxy(wS, {
        get(u, c) {
          if (!(typeof c != "string" || c === "then"))
            return _S(e, [...t, c], o);
        },
        apply(u, c, f) {
          const h = t[t.length - 1];
          let p = { args: f, path: t };
          return (
            h === "call"
              ? (p = {
                  args: f.length >= 2 ? [f[1]] : [],
                  path: t.slice(0, -1),
                })
              : h === "apply" &&
                (p = { args: f.length >= 2 ? f[1] : [], path: t.slice(0, -1) }),
            h0(p.args),
            h0(p.path),
            e(p)
          );
        },
      })),
    o[s]
  );
}
const xS = (e) => _S(e, [], Object.create(null)),
  WC = (e) =>
    new Proxy(wS, {
      get(t, o) {
        if (o !== "then") return e(o);
      },
    });
var ES = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function o(a) {
        "@babel/helpers - typeof";
        return (
          (t.exports = o =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (s) {
                  return typeof s;
                }
              : function (s) {
                  return s &&
                    typeof Symbol == "function" &&
                    s.constructor === Symbol &&
                    s !== Symbol.prototype
                    ? "symbol"
                    : typeof s;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          o(a)
        );
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  JC = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var o = ES().default;
      function a(s, u) {
        if (o(s) != "object" || !s) return s;
        var c = s[Symbol.toPrimitive];
        if (c !== void 0) {
          var f = c.call(s, u || "default");
          if (o(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (u === "string" ? String : Number)(s);
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  eO = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var o = ES().default,
        a = JC();
      function s(u) {
        var c = a(u, "string");
        return o(c) == "symbol" ? c : c + "";
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  rp = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var o = eO();
      function a(s, u, c) {
        return (
          (u = o(u)) in s
            ? Object.defineProperty(s, u, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (s[u] = c),
          s
        );
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Ns = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var o = rp();
      function a(u, c) {
        var f = Object.keys(u);
        if (Object.getOwnPropertySymbols) {
          var h = Object.getOwnPropertySymbols(u);
          (c &&
            (h = h.filter(function (p) {
              return Object.getOwnPropertyDescriptor(u, p).enumerable;
            })),
            f.push.apply(f, h));
        }
        return f;
      }
      function s(u) {
        for (var c = 1; c < arguments.length; c++) {
          var f = arguments[c] != null ? arguments[c] : {};
          c % 2
            ? a(Object(f), !0).forEach(function (h) {
                o(u, h, f[h]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(f))
              : a(Object(f)).forEach(function (h) {
                  Object.defineProperty(
                    u,
                    h,
                    Object.getOwnPropertyDescriptor(f, h),
                  );
                });
        }
        return u;
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
$e(Ns());
var p0 = $e(rp()),
  tO = class extends Error {};
function nO(e) {
  if (e instanceof Error) return e;
  const t = typeof e;
  if (!(t === "undefined" || t === "function" || e === null)) {
    if (t !== "object") return new Error(String(e));
    if (ei(e)) return Object.assign(new tO(), e);
  }
}
var m0 = class extends Error {
  constructor(e) {
    var t, o, a;
    const s = nO(e.cause),
      u =
        (t = (o = e.message) !== null && o !== void 0 ? o : s?.message) !==
          null && t !== void 0
          ? t
          : e.code;
    (super(u, { cause: s }),
      (0, p0.default)(this, "cause", void 0),
      (0, p0.default)(this, "code", void 0),
      (this.code = e.code),
      (this.name = "TRPCError"),
      ((a = this.cause) !== null && a !== void 0) || (this.cause = s));
  }
};
$e(Ns());
$e(Ns());
function rO(e) {
  return typeof e == "function";
}
async function oO(e, t) {
  const { _def: o } = e;
  let a = o.procedures[t];
  for (; !a; ) {
    const s = Object.keys(o.lazy).find((c) => t.startsWith(c));
    if (!s) return null;
    (await o.lazy[s].load(), (a = o.procedures[t]));
  }
  return a;
}
async function aO(e) {
  const { type: t, path: o } = e,
    a = await oO(e.router, o);
  if (!a || !rO(a) || (a._def.type !== t && !e.allowMethodOverride))
    throw new m0({
      code: "NOT_FOUND",
      message: `No "${t}"-procedure on path "${o}"`,
    });
  /* istanbul ignore if -- @preserve */ if (
    a._def.type !== t &&
    e.allowMethodOverride &&
    a._def.type === "subscription"
  )
    throw new m0({
      code: "METHOD_NOT_SUPPORTED",
      message: "Method override is not supported for subscriptions",
    });
  return a(e);
}
$e(Ns());
$e(rp());
var y0, v0, g0, b0;
((v0 = (y0 = Symbol).dispose) !== null && v0 !== void 0) ||
  (y0.dispose = Symbol());
((b0 = (g0 = Symbol).asyncDispose) !== null && b0 !== void 0) ||
  (g0.asyncDispose = Symbol());
function iO(e, t) {
  const o = e,
    a = o[Symbol.dispose];
  return (
    (o[Symbol.dispose] = () => {
      (t(), a?.());
    }),
    o
  );
}
var ks = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(
      e,
      t,
    ) {
      function o() {
        var a =
            typeof SuppressedError == "function"
              ? SuppressedError
              : function (f, h) {
                  var p = Error();
                  return (
                    (p.name = "SuppressedError"),
                    (p.error = f),
                    (p.suppressed = h),
                    p
                  );
                },
          s = {},
          u = [];
        function c(f, h) {
          if (h != null) {
            if (Object(h) !== h)
              throw new TypeError(
                "using declarations can only be used with objects, functions, null, or undefined.",
              );
            if (f)
              var p =
                h[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
            if (
              p === void 0 &&
              ((p = h[Symbol.dispose || Symbol.for("Symbol.dispose")]), f)
            )
              var v = p;
            if (typeof p != "function")
              throw new TypeError("Object is not disposable.");
            (v &&
              (p = function () {
                try {
                  v.call(h);
                } catch (g) {
                  return Promise.reject(g);
                }
              }),
              u.push({ v: h, d: p, a: f }));
          } else f && u.push({ d: h, a: f });
          return h;
        }
        return {
          e: s,
          u: c.bind(null, !1),
          a: c.bind(null, !0),
          d: function () {
            var h,
              p = this.e,
              v = 0;
            function y() {
              for (; (h = u.pop()); )
                try {
                  if (!h.a && v === 1)
                    return ((v = 0), u.push(h), Promise.resolve().then(y));
                  if (h.d) {
                    var S = h.d.call(h.v);
                    if (h.a) return ((v |= 2), Promise.resolve(S).then(y, g));
                  } else v |= 1;
                } catch (w) {
                  return g(w);
                }
              if (v === 1)
                return p !== s ? Promise.reject(p) : Promise.resolve();
              if (p !== s) throw p;
            }
            function g(S) {
              return ((p = p !== s ? new a(S, p) : S), y());
            }
            return y();
          },
        };
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  op = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(
      e,
      t,
    ) {
      function o(a, s) {
        ((this.v = a), (this.k = s));
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Ls = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(
      e,
      t,
    ) {
      var o = op();
      function a(s) {
        return new o(s, 0);
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  oi = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(
      e,
      t,
    ) {
      var o = op();
      function a(u) {
        return function () {
          return new s(u.apply(this, arguments));
        };
      }
      function s(u) {
        var c, f;
        function h(v, y) {
          try {
            var g = u[v](y),
              S = g.value,
              w = S instanceof o;
            Promise.resolve(w ? S.v : S).then(
              function (_) {
                if (w) {
                  var T = v === "return" ? "return" : "next";
                  if (!S.k || _.done) return h(T, _);
                  _ = u[T](_).value;
                }
                p(g.done ? "return" : "normal", _);
              },
              function (_) {
                h("throw", _);
              },
            );
          } catch (_) {
            p("throw", _);
          }
        }
        function p(v, y) {
          switch (v) {
            case "return":
              c.resolve({ value: y, done: !0 });
              break;
            case "throw":
              c.reject(y);
              break;
            default:
              c.resolve({ value: y, done: !1 });
          }
          (c = c.next) ? h(c.key, c.arg) : (f = null);
        }
        ((this._invoke = function (v, y) {
          return new Promise(function (g, S) {
            var w = { key: v, arg: y, resolve: g, reject: S, next: null };
            f ? (f = f.next = w) : ((c = f = w), h(v, y));
          });
        }),
          typeof u.return != "function" && (this.return = void 0));
      }
      ((s.prototype[
        (typeof Symbol == "function" && Symbol.asyncIterator) ||
          "@@asyncIterator"
      ] = function () {
        return this;
      }),
        (s.prototype.next = function (u) {
          return this._invoke("next", u);
        }),
        (s.prototype.throw = function (u) {
          return this._invoke("throw", u);
        }),
        (s.prototype.return = function (u) {
          return this._invoke("return", u);
        }),
        (t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
$e(ks());
$e(Ls());
$e(oi());
function sO() {
  let e, t;
  return {
    promise: new Promise((a, s) => {
      ((e = a), (t = s));
    }),
    resolve: e,
    reject: t,
  };
}
$e(ks());
$e(Ls());
$e(oi());
$e(ks());
$e(Ls());
$e(oi());
var RS = zn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
      e,
      t,
    ) {
      function o(s) {
        var u,
          c,
          f,
          h = 2;
        for (
          typeof Symbol < "u" &&
          ((c = Symbol.asyncIterator), (f = Symbol.iterator));
          h--;

        ) {
          if (c && (u = s[c]) != null) return u.call(s);
          if (f && (u = s[f]) != null) return new a(u.call(s));
          ((c = "@@asyncIterator"), (f = "@@iterator"));
        }
        throw new TypeError("Object is not async iterable");
      }
      function a(s) {
        function u(c) {
          if (Object(c) !== c)
            return Promise.reject(new TypeError(c + " is not an object."));
          var f = c.done;
          return Promise.resolve(c.value).then(function (h) {
            return { value: h, done: f };
          });
        }
        return (
          (a = function (f) {
            ((this.s = f), (this.n = f.next));
          }),
          (a.prototype = {
            s: null,
            n: null,
            next: function () {
              return u(this.n.apply(this.s, arguments));
            },
            return: function (f) {
              var h = this.s.return;
              return h === void 0
                ? Promise.resolve({ value: f, done: !0 })
                : u(h.apply(this.s, arguments));
            },
            throw: function (f) {
              var h = this.s.return;
              return h === void 0
                ? Promise.reject(f)
                : u(h.apply(this.s, arguments));
            },
          }),
          new a(s)
        );
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  lO = $e(Ls()),
  uO = $e(oi()),
  S0 = $e(ks());
$e(RS());
const cO = 0,
  fO = 1,
  dO = 0,
  hO = 1,
  pO = 0,
  mO = 1,
  yO = 2;
var w0 = class extends Error {
  constructor(e) {
    (super("Received error from server"), (this.data = e));
  }
};
const vO = (e) => ({
  getReader() {
    return new ReadableStream({
      start(o) {
        (e.on("data", (a) => {
          o.enqueue(a);
        }),
          e.on("end", () => {
            o.close();
          }),
          e.on("error", (a) => {
            o.error(a);
          }));
      },
    }).getReader();
  },
});
function gO(e) {
  const t = "getReader" in e ? e.getReader() : vO(e).getReader();
  let o = "";
  return new ReadableStream({
    async pull(a) {
      const { done: s, value: u } = await t.read();
      s ? a.close() : a.enqueue(u);
    },
    cancel() {
      return t.cancel();
    },
  })
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(
      new TransformStream({
        transform(a, s) {
          var u;
          o += a;
          const c = o.split(`
`);
          o = (u = c.pop()) !== null && u !== void 0 ? u : "";
          for (const f of c) s.enqueue(f);
        },
      }),
    );
}
function bO(e) {
  const t = gO(e);
  let o = !1;
  return t.pipeThrough(
    new TransformStream({
      transform(a, s) {
        if (o) {
          const u = JSON.parse(a);
          s.enqueue(u);
        } else {
          const u = JSON.parse(a);
          (s.enqueue(u), (o = !0));
        }
      },
    }),
  );
}
function SO(e) {
  const t = new Map();
  function o() {
    return Array.from(t.values()).every((c) => c.closed);
  }
  function a() {
    let c;
    const f = new ReadableStream({
        start(v) {
          c = v;
        },
      }),
      h = {
        enqueue: (v) => c.enqueue(v),
        close: () => {
          (c.close(), p(), o() && e.abort());
        },
        closed: !1,
        getReaderResource: () => {
          const v = f.getReader();
          return iO(v, () => {
            (h.close(), v.releaseLock());
          });
        },
        error: (v) => {
          (c.error(v), p());
        },
      };
    function p() {
      Object.assign(h, {
        closed: !0,
        close: () => {},
        enqueue: () => {},
        getReaderResource: null,
        error: () => {},
      });
    }
    return h;
  }
  function s(c) {
    let f = t.get(c);
    return (f || ((f = a()), t.set(c, f)), f);
  }
  function u(c) {
    for (const f of t.values()) f.error(c);
  }
  return { getOrCreate: s, cancelAll: u };
}
async function wO(e) {
  const { deserialize: t = (h) => h } = e;
  let o = bO(e.from);
  t &&
    (o = o.pipeThrough(
      new TransformStream({
        transform(h, p) {
          p.enqueue(t(h));
        },
      }),
    ));
  let a = sO();
  const s = SO(e.abortController);
  function u(h) {
    const [p, v, y] = h,
      g = s.getOrCreate(y);
    switch (v) {
      case cO:
        return Sh(async () => {
          try {
            var S = (0, S0.default)();
            const T = S.u(g.getReaderResource()),
              { value: A } = await T.read(),
              [N, P, k] = A;
            switch (P) {
              case dO:
                return c(k);
              case hO:
                var w, _;
                throw (w =
                  (_ = e.formatError) === null || _ === void 0
                    ? void 0
                    : _.call(e, { error: k })) !== null && w !== void 0
                  ? w
                  : new w0(k);
            }
          } catch (T) {
            S.e = T;
          } finally {
            S.d();
          }
        });
      case fO:
        return Sh(
          (0, uO.default)(function* () {
            try {
              var S = (0, S0.default)();
              const T = S.u(g.getReaderResource());
              for (;;) {
                const { value: A } = yield (0, lO.default)(T.read()),
                  [N, P, k] = A;
                switch (P) {
                  case mO:
                    yield c(k);
                    break;
                  case pO:
                    return c(k);
                  case yO:
                    var w, _;
                    throw (w =
                      (_ = e.formatError) === null || _ === void 0
                        ? void 0
                        : _.call(e, { error: k })) !== null && w !== void 0
                      ? w
                      : new w0(k);
                }
              }
            } catch (T) {
              S.e = T;
            } finally {
              S.d();
            }
          }),
        );
    }
  }
  function c(h) {
    const [[p], ...v] = h;
    for (const y of v) {
      const [g] = y,
        S = u(y);
      if (g === null) return S;
      p[g] = S;
    }
    return p;
  }
  const f = (h) => {
    (a?.reject(h), s.cancelAll(h));
  };
  return (
    o
      .pipeTo(
        new WritableStream({
          write(h) {
            if (a) {
              const g = h;
              for (const [S, w] of Object.entries(h)) {
                const _ = c(w);
                g[S] = _;
              }
              (a.resolve(g), (a = null));
              return;
            }
            const p = h,
              [v] = p;
            s.getOrCreate(v).enqueue(p);
          },
          close: f,
          abort: f,
        }),
      )
      .catch((h) => {
        var p;
        ((p = e.onError) === null || p === void 0 || p.call(e, { error: h }),
          f(h));
      }),
    [await a.promise]
  );
}
var _O = zn({
  "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncGeneratorDelegate.js"(
    e,
    t,
  ) {
    var o = op();
    function a(s) {
      var u = {},
        c = !1;
      function f(h, p) {
        return (
          (c = !0),
          (p = new Promise(function (v) {
            v(s[h](p));
          })),
          { done: !1, value: new o(p, 1) }
        );
      }
      return (
        (u[(typeof Symbol < "u" && Symbol.iterator) || "@@iterator"] =
          function () {
            return this;
          }),
        (u.next = function (h) {
          return c ? ((c = !1), h) : f("next", h);
        }),
        typeof s.throw == "function" &&
          (u.throw = function (h) {
            if (c) throw ((c = !1), h);
            return f("throw", h);
          }),
        typeof s.return == "function" &&
          (u.return = function (h) {
            return c ? ((c = !1), h) : f("return", h);
          }),
        u
      );
    }
    ((t.exports = a),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports));
  },
});
$e(RS());
$e(Ls());
$e(oi());
$e(_O());
$e(ks());
$e(oi());
$e(Ns());
var cu = lt(Ho()),
  ja = lt(Dn());
function xO(e) {
  return e instanceof bs;
}
function EO(e) {
  return (
    ei(e) &&
    ei(e.error) &&
    typeof e.error.code == "number" &&
    typeof e.error.message == "string"
  );
}
function RO(e, t) {
  return typeof e == "string"
    ? e
    : ei(e) && typeof e.message == "string"
      ? e.message
      : t;
}
var bs = class Ou extends Error {
  constructor(t, o) {
    var a, s;
    const u = o?.cause;
    (super(t, { cause: u }),
      (0, cu.default)(this, "cause", void 0),
      (0, cu.default)(this, "shape", void 0),
      (0, cu.default)(this, "data", void 0),
      (0, cu.default)(this, "meta", void 0),
      (this.meta = o?.meta),
      (this.cause = u),
      (this.shape =
        o == null || (a = o.result) === null || a === void 0
          ? void 0
          : a.error),
      (this.data =
        o == null || (s = o.result) === null || s === void 0
          ? void 0
          : s.error.data),
      (this.name = "TRPCClientError"),
      Object.setPrototypeOf(this, Ou.prototype));
  }
  static from(t, o = {}) {
    const a = t;
    return xO(a)
      ? (o.meta &&
          (a.meta = (0, ja.default)((0, ja.default)({}, a.meta), o.meta)),
        a)
      : EO(a)
        ? new Ou(
            a.error.message,
            (0, ja.default)((0, ja.default)({}, o), {}, { result: a }),
          )
        : new Ou(
            RO(a, "Unknown error"),
            (0, ja.default)((0, ja.default)({}, o), {}, { cause: a }),
          );
  }
};
function TO(e) {
  const t = e;
  return t
    ? "input" in t
      ? t
      : { input: t, output: t }
    : {
        input: { serialize: (o) => o, deserialize: (o) => o },
        output: { serialize: (o) => o, deserialize: (o) => o },
      };
}
const _0 = (e) => typeof e == "function";
function CO(e) {
  if (e) return e;
  if (typeof window < "u" && _0(window.fetch)) return window.fetch;
  if (typeof globalThis < "u" && _0(globalThis.fetch)) return globalThis.fetch;
  throw new Error("No fetch implementation found");
}
var Hd = lt(Dn());
function OO(e) {
  return {
    url: e.url.toString(),
    fetch: e.fetch,
    transformer: TO(e.transformer),
    methodOverride: e.methodOverride,
  };
}
function AO(e) {
  const t = {};
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    t[o] = a;
  }
  return t;
}
const MO = { query: "GET", mutation: "POST", subscription: "PATCH" };
function TS(e) {
  return "input" in e
    ? e.transformer.input.serialize(e.input)
    : AO(e.inputs.map((t) => e.transformer.input.serialize(t)));
}
const x0 = (e) => {
    const t = e.url.split("?");
    let a = t[0].replace(/\/$/, "") + "/" + e.path;
    const s = [];
    if (
      (t[1] && s.push(t[1]),
      "inputs" in e && s.push("batch=1"),
      e.type === "query" || e.type === "subscription")
    ) {
      const u = TS(e);
      u !== void 0 &&
        e.methodOverride !== "POST" &&
        s.push(`input=${encodeURIComponent(JSON.stringify(u))}`);
    }
    return (s.length && (a += "?" + s.join("&")), a);
  },
  DO = (e) => {
    if (e.type === "query" && e.methodOverride !== "POST") return;
    const t = TS(e);
    return t !== void 0 ? JSON.stringify(t) : void 0;
  };
var zO = class extends Error {
  constructor() {
    const e = "AbortError";
    (super(e), (this.name = e), (this.message = e));
  }
};
const PO = (e) => {
  var t;
  if (e?.aborted)
    throw (
      (t = e.throwIfAborted) === null || t === void 0 || t.call(e),
      typeof DOMException < "u"
        ? new DOMException("AbortError", "AbortError")
        : new zO()
    );
};
async function jO(e) {
  var t;
  PO(e.signal);
  const o = e.getUrl(e),
    a = e.getBody(e),
    s = (t = e.methodOverride) !== null && t !== void 0 ? t : MO[e.type],
    u = await (async () => {
      const f = await e.headers();
      return Symbol.iterator in f ? Object.fromEntries(f) : f;
    })(),
    c = (0, Hd.default)(
      (0, Hd.default)(
        (0, Hd.default)(
          {},
          e.contentTypeHeader && s !== "GET"
            ? { "content-type": e.contentTypeHeader }
            : {},
        ),
        e.trpcAcceptHeader ? { "trpc-accept": e.trpcAcceptHeader } : void 0,
      ),
      u,
    );
  return CO(e.fetch)(o, { method: s, signal: e.signal, body: a, headers: c });
}
lt(Dn());
const E0 = () => {
  throw new Error(
    "Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new",
  );
};
function R0(e) {
  let t = null,
    o = null;
  const a = () => {
    (clearTimeout(o), (o = null), (t = null));
  };
  function s(f) {
    const h = [[]];
    let p = 0;
    for (;;) {
      const g = f[p];
      if (!g) break;
      const S = h[h.length - 1];
      if (g.aborted) {
        var v;
        ((v = g.reject) === null ||
          v === void 0 ||
          v.call(g, new Error("Aborted")),
          p++);
        continue;
      }
      if (e.validate(S.concat(g).map((_) => _.key))) {
        (S.push(g), p++);
        continue;
      }
      if (S.length === 0) {
        var y;
        ((y = g.reject) === null ||
          y === void 0 ||
          y.call(g, new Error("Input is too big for a single dispatch")),
          p++);
        continue;
      }
      h.push([]);
    }
    return h;
  }
  function u() {
    const f = s(t);
    a();
    for (const h of f) {
      if (!h.length) continue;
      const p = { items: h };
      for (const y of h) y.batch = p;
      e.fetch(p.items.map((y) => y.key))
        .then(async (y) => {
          await Promise.all(
            y.map(async (S, w) => {
              const _ = p.items[w];
              try {
                var T;
                const N = await Promise.resolve(S);
                (T = _.resolve) === null || T === void 0 || T.call(_, N);
              } catch (N) {
                var A;
                (A = _.reject) === null || A === void 0 || A.call(_, N);
              }
              ((_.batch = null), (_.reject = null), (_.resolve = null));
            }),
          );
          for (const S of p.items) {
            var g;
            ((g = S.reject) === null ||
              g === void 0 ||
              g.call(S, new Error("Missing result")),
              (S.batch = null));
          }
        })
        .catch((y) => {
          for (const S of p.items) {
            var g;
            ((g = S.reject) === null || g === void 0 || g.call(S, y),
              (S.batch = null));
          }
        });
    }
  }
  function c(f) {
    var h;
    const p = { aborted: !1, key: f, batch: null, resolve: E0, reject: E0 },
      v = new Promise((y, g) => {
        var S;
        ((p.reject = g),
          (p.resolve = y),
          ((S = t) !== null && S !== void 0) || (t = []),
          t.push(p));
      });
    return (((h = o) !== null && h !== void 0) || (o = setTimeout(u)), v);
  }
  return { load: c };
}
function NO(...e) {
  const t = new AbortController(),
    o = e.length;
  let a = 0;
  const s = () => {
    ++a === o && t.abort();
  };
  for (const u of e)
    u?.aborted ? s() : u?.addEventListener("abort", s, { once: !0 });
  return t.signal;
}
function kO(...e) {
  const t = new AbortController();
  for (const o of e)
    o?.aborted
      ? t.abort()
      : o?.addEventListener("abort", () => t.abort(), { once: !0 });
  return t.signal;
}
lt(Dn());
var On = lt(Dn());
function LO(e) {
  return typeof FormData > "u" ? !1 : e instanceof FormData;
}
const qd = {
  css: {
    query: ["72e3ff", "3fb0d8"],
    mutation: ["c5a3fc", "904dfc"],
    subscription: ["ff49e1", "d83fbe"],
  },
  ansi: {
    regular: {
      query: ["\x1B[30;46m", "\x1B[97;46m"],
      mutation: ["\x1B[30;45m", "\x1B[97;45m"],
      subscription: ["\x1B[30;42m", "\x1B[97;42m"],
    },
    bold: {
      query: ["\x1B[1;30;46m", "\x1B[1;97;46m"],
      mutation: ["\x1B[1;30;45m", "\x1B[1;97;45m"],
      subscription: ["\x1B[1;30;42m", "\x1B[1;97;42m"],
    },
  },
};
function UO(e) {
  const { direction: t, type: o, withContext: a, path: s, id: u, input: c } = e,
    f = [],
    h = [];
  if (e.colorMode === "none") f.push(t === "up" ? ">>" : "<<", o, `#${u}`, s);
  else if (e.colorMode === "ansi") {
    const [p, v] = qd.ansi.regular[o],
      [y, g] = qd.ansi.bold[o];
    f.push(
      t === "up" ? p : v,
      t === "up" ? ">>" : "<<",
      o,
      t === "up" ? y : g,
      `#${u}`,
      s,
      "\x1B[0m",
    );
  } else {
    const [p, v] = qd.css[o],
      y = `
    background-color: #${t === "up" ? p : v};
    color: ${t === "up" ? "black" : "white"};
    padding: 2px;
  `;
    (f.push("%c", t === "up" ? ">>" : "<<", o, `#${u}`, `%c${s}%c`, "%O"),
      h.push(y, `${y}; font-weight: bold;`, `${y}; font-weight: normal;`));
  }
  return (
    t === "up"
      ? h.push(a ? { input: c, context: e.context } : { input: c })
      : h.push(
          (0, On.default)(
            { input: c, result: e.result, elapsedMs: e.elapsedMs },
            a && { context: e.context },
          ),
        ),
    { parts: f, args: h }
  );
}
const BO =
  ({ c: e = console, colorMode: t = "css", withContext: o }) =>
  (a) => {
    const s = a.input,
      u = LO(s) ? Object.fromEntries(s) : s,
      { parts: c, args: f } = UO(
        (0, On.default)(
          (0, On.default)({}, a),
          {},
          { colorMode: t, input: u, withContext: o },
        ),
      ),
      h =
        a.direction === "down" &&
        a.result &&
        (a.result instanceof Error ||
          ("error" in a.result.result && a.result.result.error))
          ? "error"
          : "log";
    e[h].apply(null, [c.join(" ")].concat(f));
  };
function IO(e = {}) {
  var t, o;
  const { enabled: a = () => !0 } = e,
    s =
      (t = e.colorMode) !== null && t !== void 0
        ? t
        : typeof window > "u"
          ? "ansi"
          : "css",
    u = (o = e.withContext) !== null && o !== void 0 ? o : s === "css",
    { logger: c = BO({ c: e.console, colorMode: s, withContext: u }) } = e;
  return () =>
    ({ op: f, next: h }) =>
      ri((p) => {
        a((0, On.default)((0, On.default)({}, f), {}, { direction: "up" })) &&
          c((0, On.default)((0, On.default)({}, f), {}, { direction: "up" }));
        const v = Date.now();
        function y(g) {
          const S = Date.now() - v;
          a(
            (0, On.default)(
              (0, On.default)({}, f),
              {},
              { direction: "down", result: g },
            ),
          ) &&
            c(
              (0, On.default)(
                (0, On.default)({}, f),
                {},
                { direction: "down", elapsedMs: S, result: g },
              ),
            );
        }
        return h(f)
          .pipe(
            HC({
              next(g) {
                y(g);
              },
              error(g) {
                y(g);
              },
            }),
          )
          .subscribe(p);
      });
}
const CS = (e, ...t) => (typeof e == "function" ? e(...t) : e);
lt(Ho());
function HO() {
  let e, t;
  return {
    promise: new Promise((a, s) => {
      ((e = a), (t = s));
    }),
    resolve: e,
    reject: t,
  };
}
async function qO(e) {
  const t = await CS(e.url);
  if (!e.connectionParams) return t;
  const a = `${t.includes("?") ? "&" : "?"}connectionParams=1`;
  return t + a;
}
async function VO(e) {
  const t = { method: "connectionParams", data: await CS(e) };
  return JSON.stringify(t);
}
lt(Ho());
var zo = lt(Ho());
function ZO(e) {
  const { promise: t, resolve: o, reject: a } = HO();
  return (
    e.addEventListener("open", () => {
      (e.removeEventListener("error", a), o());
    }),
    e.addEventListener("error", a),
    t
  );
}
function $O(e, { intervalMs: t, pongTimeoutMs: o }) {
  let a, s;
  function u() {
    a = setTimeout(() => {
      (e.send("PING"),
        (s = setTimeout(() => {
          e.close();
        }, o)));
    }, t);
  }
  function c() {
    (clearTimeout(a), u());
  }
  function f() {
    (clearTimeout(s), c());
  }
  (e.addEventListener("open", u),
    e.addEventListener("message", ({ data: h }) => {
      (clearTimeout(a), u(), h === "PONG" && f());
    }),
    e.addEventListener("close", () => {
      (clearTimeout(a), clearTimeout(s));
    }));
}
var GO = class wh {
  constructor(t) {
    var o;
    if (
      ((0, zo.default)(this, "id", ++wh.connectCount),
      (0, zo.default)(this, "WebSocketPonyfill", void 0),
      (0, zo.default)(this, "urlOptions", void 0),
      (0, zo.default)(this, "keepAliveOpts", void 0),
      (0, zo.default)(this, "wsObservable", qC(null)),
      (0, zo.default)(this, "openPromise", null),
      (this.WebSocketPonyfill =
        (o = t.WebSocketPonyfill) !== null && o !== void 0 ? o : WebSocket),
      !this.WebSocketPonyfill)
    )
      throw new Error(
        "No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill",
      );
    ((this.urlOptions = t.urlOptions), (this.keepAliveOpts = t.keepAlive));
  }
  get ws() {
    return this.wsObservable.get();
  }
  set ws(t) {
    this.wsObservable.next(t);
  }
  isOpen() {
    return (
      !!this.ws &&
      this.ws.readyState === this.WebSocketPonyfill.OPEN &&
      !this.openPromise
    );
  }
  isClosed() {
    return (
      !!this.ws &&
      (this.ws.readyState === this.WebSocketPonyfill.CLOSING ||
        this.ws.readyState === this.WebSocketPonyfill.CLOSED)
    );
  }
  async open() {
    var t = this;
    if (t.openPromise) return t.openPromise;
    t.id = ++wh.connectCount;
    const o = qO(t.urlOptions).then((a) => new t.WebSocketPonyfill(a));
    t.openPromise = o.then(async (a) => {
      ((t.ws = a),
        a.addEventListener("message", function ({ data: s }) {
          s === "PING" && this.send("PONG");
        }),
        t.keepAliveOpts.enabled && $O(a, t.keepAliveOpts),
        a.addEventListener("close", () => {
          t.ws === a && (t.ws = null);
        }),
        await ZO(a),
        t.urlOptions.connectionParams &&
          a.send(await VO(t.urlOptions.connectionParams)));
    });
    try {
      await t.openPromise;
    } finally {
      t.openPromise = null;
    }
  }
  async close() {
    var t = this;
    try {
      await t.openPromise;
    } finally {
      var o;
      (o = t.ws) === null || o === void 0 || o.close();
    }
  }
};
(0, zo.default)(GO, "connectCount", 0);
lt(Ho());
lt(Dn());
var Vd = lt(Ho()),
  T0 = lt(Dn()),
  OS = class {
    constructor(e) {
      ((0, Vd.default)(this, "links", void 0),
        (0, Vd.default)(this, "runtime", void 0),
        (0, Vd.default)(this, "requestId", void 0),
        (this.requestId = 0),
        (this.runtime = {}),
        (this.links = e.links.map((t) => t(this.runtime))));
    }
    $request(e) {
      var t;
      return VC({
        links: this.links,
        op: (0, T0.default)(
          (0, T0.default)({}, e),
          {},
          {
            context: (t = e.context) !== null && t !== void 0 ? t : {},
            id: ++this.requestId,
          },
        ),
      }).pipe(IC());
    }
    async requestAsPromise(e) {
      var t = this;
      try {
        const o = t.$request(e);
        return (await BC(o)).result.data;
      } catch (o) {
        throw bs.from(o);
      }
    }
    query(e, t, o) {
      return this.requestAsPromise({
        type: "query",
        path: e,
        input: t,
        context: o?.context,
        signal: o?.signal,
      });
    }
    mutation(e, t, o) {
      return this.requestAsPromise({
        type: "mutation",
        path: e,
        input: t,
        context: o?.context,
        signal: o?.signal,
      });
    }
    subscription(e, t, o) {
      return this.$request({
        type: "subscription",
        path: e,
        input: t,
        context: o.context,
        signal: o.signal,
      }).subscribe({
        next(s) {
          switch (s.result.type) {
            case "state": {
              var u;
              (u = o.onConnectionStateChange) === null ||
                u === void 0 ||
                u.call(o, s.result);
              break;
            }
            case "started": {
              var c;
              (c = o.onStarted) === null ||
                c === void 0 ||
                c.call(o, { context: s.context });
              break;
            }
            case "stopped": {
              var f;
              (f = o.onStopped) === null || f === void 0 || f.call(o);
              break;
            }
            case "data":
            case void 0: {
              var h;
              (h = o.onData) === null ||
                h === void 0 ||
                h.call(o, s.result.data);
              break;
            }
          }
        },
        error(s) {
          var u;
          (u = o.onError) === null || u === void 0 || u.call(o, s);
        },
        complete() {
          var s;
          (s = o.onComplete) === null || s === void 0 || s.call(o);
        },
      });
    }
  };
const AS = Symbol.for("trpc_untypedClient"),
  FO = { query: "query", mutate: "mutation", subscribe: "subscription" },
  YO = (e) => FO[e];
function KO(e) {
  const t = xS(({ path: o, args: a }) => {
    const s = [...o],
      u = YO(s.pop()),
      c = s.join(".");
    return e[u](c, ...a);
  });
  return WC((o) => (o === AS ? e : t[o]));
}
function QO(e) {
  const t = new OS(e);
  return KO(t);
}
function XO(e) {
  return e[AS];
}
var fu = lt(Dn());
function WO(e) {
  var t, o;
  const a = OO(e),
    s = (t = e.maxURLLength) !== null && t !== void 0 ? t : 1 / 0,
    u = (o = e.maxItems) !== null && o !== void 0 ? o : 1 / 0;
  return () => {
    const c = (v) => ({
        validate(y) {
          if (s === 1 / 0 && u === 1 / 0) return !0;
          if (y.length > u) return !1;
          const g = y.map((_) => _.path).join(","),
            S = y.map((_) => _.input);
          return (
            x0(
              (0, fu.default)(
                (0, fu.default)({}, a),
                {},
                { type: v, path: g, inputs: S, signal: null },
              ),
            ).length <= s
          );
        },
        async fetch(y) {
          const g = y.map((k) => k.path).join(","),
            S = y.map((k) => k.input),
            w = NO(...y.map((k) => k.signal)),
            _ = new AbortController(),
            A = await jO(
              (0, fu.default)(
                (0, fu.default)({}, a),
                {},
                {
                  signal: kO(w, _.signal),
                  type: v,
                  contentTypeHeader: "application/json",
                  trpcAcceptHeader: "application/jsonl",
                  getUrl: x0,
                  getBody: DO,
                  inputs: S,
                  path: g,
                  headers() {
                    return e.headers
                      ? typeof e.headers == "function"
                        ? e.headers({ opList: y })
                        : e.headers
                      : {};
                  },
                },
              ),
            ),
            [N] = await wO({
              from: A.body,
              deserialize: (k) => a.transformer.output.deserialize(k),
              formatError(k) {
                const H = k.error;
                return bs.from({ error: H });
              },
              abortController: _,
            });
          return Object.keys(y).map(async (k) => {
            let H = await Promise.resolve(N[k]);
            if ("result" in H) {
              const F = await Promise.resolve(H.result);
              H = { result: { data: await Promise.resolve(F.data) } };
            }
            return { json: H, meta: { response: A } };
          });
        },
      }),
      f = R0(c("query")),
      h = R0(c("mutation")),
      p = { query: f, mutation: h };
    return ({ op: v }) =>
      ri((y) => {
        /* istanbul ignore if -- @preserve */ if (v.type === "subscription")
          throw new Error(
            "Subscriptions are unsupported by `httpBatchStreamLink` - use `httpSubscriptionLink` or `wsLink`",
          );
        const S = p[v.type].load(v);
        let w;
        return (
          S.then((_) => {
            if (((w = _), "error" in _.json)) {
              y.error(bs.from(_.json, { meta: _.meta }));
              return;
            } else if ("result" in _.json) {
              (y.next({ context: _.meta, result: _.json.result }),
                y.complete());
              return;
            }
            y.complete();
          }).catch((_) => {
            y.error(bs.from(_, { meta: w?.meta }));
          }),
          () => {}
        );
      });
  };
}
lt(Dn());
var JO = Yn({
  "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
    e,
    t,
  ) {
    function o(s) {
      var u,
        c,
        f,
        h = 2;
      for (
        typeof Symbol < "u" &&
        ((c = Symbol.asyncIterator), (f = Symbol.iterator));
        h--;

      ) {
        if (c && (u = s[c]) != null) return u.call(s);
        if (f && (u = s[f]) != null) return new a(u.call(s));
        ((c = "@@asyncIterator"), (f = "@@iterator"));
      }
      throw new TypeError("Object is not async iterable");
    }
    function a(s) {
      function u(c) {
        if (Object(c) !== c)
          return Promise.reject(new TypeError(c + " is not an object."));
        var f = c.done;
        return Promise.resolve(c.value).then(function (h) {
          return { value: h, done: f };
        });
      }
      return (
        (a = function (f) {
          ((this.s = f), (this.n = f.next));
        }),
        (a.prototype = {
          s: null,
          n: null,
          next: function () {
            return u(this.n.apply(this.s, arguments));
          },
          return: function (f) {
            var h = this.s.return;
            return h === void 0
              ? Promise.resolve({ value: f, done: !0 })
              : u(h.apply(this.s, arguments));
          },
          throw: function (f) {
            var h = this.s.return;
            return h === void 0
              ? Promise.reject(f)
              : u(h.apply(this.s, arguments));
          },
        }),
        new a(s)
      );
    }
    ((t.exports = o),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports));
  },
});
lt(JO());
lt(Dn());
var eA = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(
      e,
      t,
    ) {
      function o() {
        var a =
            typeof SuppressedError == "function"
              ? SuppressedError
              : function (f, h) {
                  var p = Error();
                  return (
                    (p.name = "SuppressedError"),
                    (p.error = f),
                    (p.suppressed = h),
                    p
                  );
                },
          s = {},
          u = [];
        function c(f, h) {
          if (h != null) {
            if (Object(h) !== h)
              throw new TypeError(
                "using declarations can only be used with objects, functions, null, or undefined.",
              );
            if (f)
              var p =
                h[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
            if (
              p === void 0 &&
              ((p = h[Symbol.dispose || Symbol.for("Symbol.dispose")]), f)
            )
              var v = p;
            if (typeof p != "function")
              throw new TypeError("Object is not disposable.");
            (v &&
              (p = function () {
                try {
                  v.call(h);
                } catch (g) {
                  return Promise.reject(g);
                }
              }),
              u.push({ v: h, d: p, a: f }));
          } else f && u.push({ d: h, a: f });
          return h;
        }
        return {
          e: s,
          u: c.bind(null, !1),
          a: c.bind(null, !0),
          d: function () {
            var h,
              p = this.e,
              v = 0;
            function y() {
              for (; (h = u.pop()); )
                try {
                  if (!h.a && v === 1)
                    return ((v = 0), u.push(h), Promise.resolve().then(y));
                  if (h.d) {
                    var S = h.d.call(h.v);
                    if (h.a) return ((v |= 2), Promise.resolve(S).then(y, g));
                  } else v |= 1;
                } catch (w) {
                  return g(w);
                }
              if (v === 1)
                return p !== s ? Promise.reject(p) : Promise.resolve();
              if (p !== s) throw p;
            }
            function g(S) {
              return ((p = p !== s ? new a(S, p) : S), y());
            }
            return y();
          },
        };
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  MS = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(
      e,
      t,
    ) {
      function o(a, s) {
        ((this.v = a), (this.k = s));
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  tA = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(
      e,
      t,
    ) {
      var o = MS();
      function a(s) {
        return new o(s, 0);
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  nA = Yn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(
      e,
      t,
    ) {
      var o = MS();
      function a(u) {
        return function () {
          return new s(u.apply(this, arguments));
        };
      }
      function s(u) {
        var c, f;
        function h(v, y) {
          try {
            var g = u[v](y),
              S = g.value,
              w = S instanceof o;
            Promise.resolve(w ? S.v : S).then(
              function (_) {
                if (w) {
                  var T = v === "return" ? "return" : "next";
                  if (!S.k || _.done) return h(T, _);
                  _ = u[T](_).value;
                }
                p(g.done ? "return" : "normal", _);
              },
              function (_) {
                h("throw", _);
              },
            );
          } catch (_) {
            p("throw", _);
          }
        }
        function p(v, y) {
          switch (v) {
            case "return":
              c.resolve({ value: y, done: !0 });
              break;
            case "throw":
              c.reject(y);
              break;
            default:
              c.resolve({ value: y, done: !1 });
          }
          (c = c.next) ? h(c.key, c.arg) : (f = null);
        }
        ((this._invoke = function (v, y) {
          return new Promise(function (g, S) {
            var w = { key: v, arg: y, resolve: g, reject: S, next: null };
            f ? (f = f.next = w) : ((c = f = w), h(v, y));
          });
        }),
          typeof u.return != "function" && (this.return = void 0));
      }
      ((s.prototype[
        (typeof Symbol == "function" && Symbol.asyncIterator) ||
          "@@asyncIterator"
      ] = function () {
        return this;
      }),
        (s.prototype.next = function (u) {
          return this._invoke("next", u);
        }),
        (s.prototype.throw = function (u) {
          return this._invoke("throw", u);
        }),
        (s.prototype.return = function (u) {
          return this._invoke("return", u);
        }),
        (t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
lt(eA());
lt(tA());
lt(nA());
lt(Dn());
var rA = Object.create,
  DS = Object.defineProperty,
  oA = Object.getOwnPropertyDescriptor,
  zS = Object.getOwnPropertyNames,
  aA = Object.getPrototypeOf,
  iA = Object.prototype.hasOwnProperty,
  so = (e, t) =>
    function () {
      return (
        t || (0, e[zS(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  sA = (e, t, o, a) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var s = zS(t), u = 0, c = s.length, f; u < c; u++)
        ((f = s[u]),
          !iA.call(e, f) &&
            f !== o &&
            DS(e, f, {
              get: ((h) => t[h]).bind(null, f),
              enumerable: !(a = oA(t, f)) || a.enumerable,
            }));
    return e;
  },
  lo = (e, t, o) => (
    (o = e != null ? rA(aA(e)) : {}),
    sA(
      t || !e || !e.__esModule
        ? DS(o, "default", { value: e, enumerable: !0 })
        : o,
      e,
    )
  ),
  PS = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function o(a) {
        "@babel/helpers - typeof";
        return (
          (t.exports = o =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (s) {
                  return typeof s;
                }
              : function (s) {
                  return s &&
                    typeof Symbol == "function" &&
                    s.constructor === Symbol &&
                    s !== Symbol.prototype
                    ? "symbol"
                    : typeof s;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          o(a)
        );
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  lA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var o = PS().default;
      function a(s, u) {
        if (o(s) != "object" || !s) return s;
        var c = s[Symbol.toPrimitive];
        if (c !== void 0) {
          var f = c.call(s, u || "default");
          if (o(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (u === "string" ? String : Number)(s);
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  uA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var o = PS().default,
        a = lA();
      function s(u) {
        var c = a(u, "string");
        return o(c) == "symbol" ? c : c + "";
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  cA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var o = uA();
      function a(s, u, c) {
        return (
          (u = o(u)) in s
            ? Object.defineProperty(s, u, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (s[u] = c),
          s
        );
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ai = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var o = cA();
      function a(u, c) {
        var f = Object.keys(u);
        if (Object.getOwnPropertySymbols) {
          var h = Object.getOwnPropertySymbols(u);
          (c &&
            (h = h.filter(function (p) {
              return Object.getOwnPropertyDescriptor(u, p).enumerable;
            })),
            f.push.apply(f, h));
        }
        return f;
      }
      function s(u) {
        for (var c = 1; c < arguments.length; c++) {
          var f = arguments[c] != null ? arguments[c] : {};
          c % 2
            ? a(Object(f), !0).forEach(function (h) {
                o(u, h, f[h]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(f))
              : a(Object(f)).forEach(function (h) {
                  Object.defineProperty(
                    u,
                    h,
                    Object.getOwnPropertyDescriptor(f, h),
                  );
                });
        }
        return u;
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  fA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
      e,
      t,
    ) {
      function o(s) {
        var u,
          c,
          f,
          h = 2;
        for (
          typeof Symbol < "u" &&
          ((c = Symbol.asyncIterator), (f = Symbol.iterator));
          h--;

        ) {
          if (c && (u = s[c]) != null) return u.call(s);
          if (f && (u = s[f]) != null) return new a(u.call(s));
          ((c = "@@asyncIterator"), (f = "@@iterator"));
        }
        throw new TypeError("Object is not async iterable");
      }
      function a(s) {
        function u(c) {
          if (Object(c) !== c)
            return Promise.reject(new TypeError(c + " is not an object."));
          var f = c.done;
          return Promise.resolve(c.value).then(function (h) {
            return { value: h, done: f };
          });
        }
        return (
          (a = function (f) {
            ((this.s = f), (this.n = f.next));
          }),
          (a.prototype = {
            s: null,
            n: null,
            next: function () {
              return u(this.n.apply(this.s, arguments));
            },
            return: function (f) {
              var h = this.s.return;
              return h === void 0
                ? Promise.resolve({ value: f, done: !0 })
                : u(h.apply(this.s, arguments));
            },
            throw: function (f) {
              var h = this.s.return;
              return h === void 0
                ? Promise.reject(f)
                : u(h.apply(this.s, arguments));
            },
          }),
          new a(s)
        );
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  dA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(
      e,
      t,
    ) {
      function o(a, s) {
        if (a == null) return {};
        var u = {};
        for (var c in a)
          if ({}.hasOwnProperty.call(a, c)) {
            if (s.includes(c)) continue;
            u[c] = a[c];
          }
        return u;
      }
      ((t.exports = o),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  hA = so({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(
      e,
      t,
    ) {
      var o = dA();
      function a(s, u) {
        if (s == null) return {};
        var c,
          f,
          h = o(s, u);
        if (Object.getOwnPropertySymbols) {
          var p = Object.getOwnPropertySymbols(s);
          for (f = 0; f < p.length; f++)
            ((c = p[f]),
              u.includes(c) ||
                ({}.propertyIsEnumerable.call(s, c) && (h[c] = s[c])));
        }
        return h;
      }
      ((t.exports = a),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Ss = lo(ai(), 1),
  pA = lo(fA(), 1),
  mA = lo(hA(), 1);
const yA = ["cursor", "direction"];
function ec(e) {
  return { path: e.path.join(".") };
}
function vA(e) {
  return e.length >= 3;
}
function jS(e) {
  return vA(e)
    ? { type: "prefixed", prefix: e[0], path: e[1], args: e[2] }
    : { type: "unprefixed", prefix: void 0, path: e[0], args: e[1] };
}
function ap(e, t, o) {
  var a;
  const s = jS(e);
  let u = (a = s.args) === null || a === void 0 ? void 0 : a.input;
  if (o) {
    var c, f;
    u = (0, Ss.default)(
      (0, Ss.default)(
        (0, Ss.default)(
          {},
          (c = (f = s.args) === null || f === void 0 ? void 0 : f.input) !==
            null && c !== void 0
            ? c
            : {},
        ),
        o.pageParam !== void 0 ? { cursor: o.pageParam } : {},
      ),
      {},
      { direction: o.direction },
    );
  }
  return [s.path.join("."), u, t?.trpc];
}
async function gA(e, t, o) {
  const s = t.getQueryCache().build(t, { queryKey: o });
  s.setState({ data: [], status: "success" });
  const u = [];
  var c = !1,
    f = !1,
    h;
  try {
    for (
      var p = (0, pA.default)(e), v;
      (c = !(v = await p.next()).done);
      c = !1
    ) {
      const y = v.value;
      (u.push(y), s.setState({ data: [...u] }));
    }
  } catch (y) {
    ((f = !0), (h = y));
  } finally {
    try {
      c && p.return != null && (await p.return());
    } finally {
      if (f) throw h;
    }
  }
  return u;
}
function yr(e) {
  const t = Sh(() => {
    const { input: o, type: a } = e,
      s = e.path.flatMap((u) => u.split("."));
    if (!o && a === "any") return s.length ? [s] : [];
    if (a === "infinite" && ei(o) && ("direction" in o || "cursor" in o)) {
      const { cursor: u, direction: c } = o,
        f = (0, mA.default)(o, yA);
      return [s, { input: f, type: "infinite" }];
    }
    return [
      s,
      (0, Ss.default)(
        (0, Ss.default)({}, typeof o < "u" && o !== br && { input: o }),
        a && a !== "any" && { type: a },
      ),
    ];
  });
  return (e.prefix && t.unshift([e.prefix]), t);
}
function NS(e) {
  const t = [e.path.flatMap((o) => o.split("."))];
  return (e.prefix && t.unshift([e.prefix]), t);
}
function ip(e) {
  return ZC(e) ? e() : e;
}
var Na = lo(ai());
function bA(e) {
  var t;
  const { input: o, query: a, path: s, queryKey: u, opts: c } = e,
    f = o === br,
    h = async (p) => {
      var v;
      const y = (0, Na.default)(
        (0, Na.default)({}, c),
        {},
        {
          trpc: (0, Na.default)(
            (0, Na.default)({}, c?.trpc),
            !(c == null || (v = c.trpc) === null || v === void 0) &&
              v.abortOnUnmount
              ? { signal: p.signal }
              : { signal: null },
          ),
        },
      );
      return await a(
        ...ap(u, y, { direction: p.direction, pageParam: p.pageParam }),
      );
    };
  return Object.assign(
    (0, Na.default)(
      (0, Na.default)({}, c ?? {}),
      {},
      {
        queryKey: u,
        queryFn: f ? br : h,
        initialPageParam:
          (t = c?.initialCursor) !== null && t !== void 0 ? t : o?.cursor,
      },
    ),
    { trpc: ec({ path: s }) },
  );
}
var C0 = lo(ai());
function SA(e) {
  var t;
  const { mutate: o, path: a, opts: s, overrides: u } = e,
    c = ip(e.queryClient),
    f = NS({ path: a, prefix: s?.keyPrefix }),
    h = c.defaultMutationOptions(c.getMutationDefaults(f)),
    p = (t = u?.onSuccess) !== null && t !== void 0 ? t : (y) => y.originalFn(),
    v = async (y) => await o(...ap([...f, { input: y }], s));
  return (0, C0.default)(
    (0, C0.default)({}, s),
    {},
    {
      mutationKey: f,
      mutationFn: v,
      onSuccess(...y) {
        var g, S;
        return p({
          originalFn: () => {
            var _, T, A;
            return (_ =
              s == null || (T = s.onSuccess) === null || T === void 0
                ? void 0
                : T.call(s, ...y)) !== null && _ !== void 0
              ? _
              : h == null || (A = h.onSuccess) === null || A === void 0
                ? void 0
                : A.call(h, ...y);
          },
          queryClient: c,
          meta:
            (g = (S = s?.meta) !== null && S !== void 0 ? S : h?.meta) !==
              null && g !== void 0
              ? g
              : {},
        });
      },
      trpc: ec({ path: a }),
    },
  );
}
var ka = lo(ai());
function wA(e) {
  const { input: t, query: o, path: a, queryKey: s, opts: u } = e,
    c = ip(e.queryClient),
    f = t === br,
    h = async (p) => {
      var v;
      const y = (0, ka.default)(
          (0, ka.default)({}, u),
          {},
          {
            trpc: (0, ka.default)(
              (0, ka.default)({}, u?.trpc),
              !(u == null || (v = u.trpc) === null || v === void 0) &&
                v.abortOnUnmount
                ? { signal: p.signal }
                : { signal: null },
            ),
          },
        ),
        g = p.queryKey,
        S = await o(...ap(g, y));
      return GC(S) ? gA(S, c, g) : S;
    };
  return Object.assign(
    (0, ka.default)(
      (0, ka.default)({}, u),
      {},
      { queryKey: s, queryFn: f ? br : h },
    ),
    { trpc: ec({ path: a }) },
  );
}
var O0 = lo(ai(), 1);
const _A = (e) => {
  var t;
  const { subscribe: o, path: a, queryKey: s, opts: u = {} } = e,
    c =
      (t = jS(s)) === null ||
      t === void 0 ||
      (t = t.args) === null ||
      t === void 0
        ? void 0
        : t.input,
    f = "enabled" in u ? !!u.enabled : c !== br,
    h = (p) => o(a.join("."), c ?? void 0, p);
  return (0, O0.default)(
    (0, O0.default)({}, u),
    {},
    { enabled: f, subscribe: h, queryKey: s, trpc: ec({ path: a }) },
  );
};
var La = lo(ai(), 1);
function kS(e) {
  const t = e.keyPrefix,
    o = (a) => (s, u, c) =>
      "router" in e
        ? Promise.resolve(ip(e.ctx)).then((h) =>
            aO({
              router: e.router,
              path: s,
              getRawInput: async () => u,
              ctx: h,
              type: a,
              signal: void 0,
            }),
          )
        : (e.client instanceof OS ? e.client : XO(e.client))[a](s, u, c);
  return xS(({ args: a, path: s }) => {
    const u = [...s],
      c = u.pop(),
      [f, h] = a;
    return {
      "~types": void 0,
      pathKey: () => yr({ path: u, type: "any", prefix: t }),
      pathFilter: () =>
        (0, La.default)(
          (0, La.default)({}, f),
          {},
          { queryKey: yr({ path: u, type: "any", prefix: t }) },
        ),
      queryOptions: () =>
        wA({
          input: f,
          opts: h,
          path: u,
          queryClient: e.queryClient,
          queryKey: yr({ path: u, input: f, type: "query", prefix: t }),
          query: o("query"),
        }),
      queryKey: () => yr({ path: u, input: f, type: "query", prefix: t }),
      queryFilter: () =>
        (0, La.default)(
          (0, La.default)({}, h),
          {},
          { queryKey: yr({ path: u, input: f, type: "query", prefix: t }) },
        ),
      infiniteQueryOptions: () =>
        bA({
          input: f,
          opts: h,
          path: u,
          queryClient: e.queryClient,
          queryKey: yr({ path: u, input: f, type: "infinite", prefix: t }),
          query: o("query"),
        }),
      infiniteQueryKey: () =>
        yr({ path: u, input: f, type: "infinite", prefix: t }),
      infiniteQueryFilter: () =>
        (0, La.default)(
          (0, La.default)({}, h),
          {},
          { queryKey: yr({ path: u, input: f, type: "infinite", prefix: t }) },
        ),
      mutationOptions: () => {
        var v;
        return SA({
          opts: f,
          path: u,
          queryClient: e.queryClient,
          mutate: o("mutation"),
          overrides:
            (v = e.overrides) === null || v === void 0 ? void 0 : v.mutations,
        });
      },
      mutationKey: () => NS({ path: u, prefix: t }),
      subscriptionOptions: () =>
        _A({
          opts: h,
          path: u,
          queryKey: yr({ path: u, input: f, type: "any", prefix: t }),
          subscribe: o("subscription"),
        }),
    }[c]();
  });
}
function xA() {
  const e = E.createContext(null),
    t = E.createContext(null),
    o = (u) => {
      const c = E.useMemo(
        () =>
          kS({
            client: u.trpcClient,
            queryClient: u.queryClient,
            keyPrefix: u.keyPrefix,
          }),
        [u.trpcClient, u.queryClient, u.keyPrefix],
      );
      return D.jsx(e.Provider, {
        value: u.trpcClient,
        children: D.jsx(t.Provider, { value: c, children: u.children }),
      });
    };
  o.displayName = "TRPCProvider";
  function a() {
    const u = E.useContext(t);
    if (!u)
      throw new Error("useTRPC() can only be used inside of a <TRPCProvider>");
    return u;
  }
  function s() {
    const u = E.useContext(e);
    if (!u)
      throw new Error(
        "useTRPCClient() can only be used inside of a <TRPCProvider>",
      );
    return u;
  }
  return { TRPCProvider: o, useTRPC: a, useTRPCClient: s };
}
class EA {
  constructor() {
    ((this.keyToValue = new Map()), (this.valueToKey = new Map()));
  }
  set(t, o) {
    (this.keyToValue.set(t, o), this.valueToKey.set(o, t));
  }
  getByKey(t) {
    return this.keyToValue.get(t);
  }
  getByValue(t) {
    return this.valueToKey.get(t);
  }
  clear() {
    (this.keyToValue.clear(), this.valueToKey.clear());
  }
}
class LS {
  constructor(t) {
    ((this.generateIdentifier = t), (this.kv = new EA()));
  }
  register(t, o) {
    this.kv.getByValue(t) ||
      (o || (o = this.generateIdentifier(t)), this.kv.set(o, t));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(t) {
    return this.kv.getByValue(t);
  }
  getValue(t) {
    return this.kv.getByKey(t);
  }
}
class RA extends LS {
  constructor() {
    (super((t) => t.name), (this.classToAllowedProps = new Map()));
  }
  register(t, o) {
    typeof o == "object"
      ? (o.allowProps && this.classToAllowedProps.set(t, o.allowProps),
        super.register(t, o.identifier))
      : super.register(t, o);
  }
  getAllowedProps(t) {
    return this.classToAllowedProps.get(t);
  }
}
function TA(e) {
  if ("values" in Object) return Object.values(e);
  const t = [];
  for (const o in e) e.hasOwnProperty(o) && t.push(e[o]);
  return t;
}
function CA(e, t) {
  const o = TA(e);
  if ("find" in o) return o.find(t);
  const a = o;
  for (let s = 0; s < a.length; s++) {
    const u = a[s];
    if (t(u)) return u;
  }
}
function ti(e, t) {
  Object.entries(e).forEach(([o, a]) => t(a, o));
}
function Au(e, t) {
  return e.indexOf(t) !== -1;
}
function A0(e, t) {
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    if (t(a)) return a;
  }
}
class OA {
  constructor() {
    this.transfomers = {};
  }
  register(t) {
    this.transfomers[t.name] = t;
  }
  findApplicable(t) {
    return CA(this.transfomers, (o) => o.isApplicable(t));
  }
  findByName(t) {
    return this.transfomers[t];
  }
}
const AA = (e) => Object.prototype.toString.call(e).slice(8, -1),
  US = (e) => typeof e > "u",
  MA = (e) => e === null,
  Rs = (e) =>
    typeof e != "object" || e === null || e === Object.prototype
      ? !1
      : Object.getPrototypeOf(e) === null
        ? !0
        : Object.getPrototypeOf(e) === Object.prototype,
  _h = (e) => Rs(e) && Object.keys(e).length === 0,
  to = (e) => Array.isArray(e),
  DA = (e) => typeof e == "string",
  zA = (e) => typeof e == "number" && !isNaN(e),
  PA = (e) => typeof e == "boolean",
  jA = (e) => e instanceof RegExp,
  Ts = (e) => e instanceof Map,
  Cs = (e) => e instanceof Set,
  BS = (e) => AA(e) === "Symbol",
  NA = (e) => e instanceof Date && !isNaN(e.valueOf()),
  IS = (e) => e instanceof Error,
  M0 = (e) => typeof e == "number" && isNaN(e),
  kA = (e) => PA(e) || MA(e) || US(e) || zA(e) || DA(e) || BS(e),
  LA = (e) => typeof e == "bigint",
  UA = (e) => e === 1 / 0 || e === -1 / 0,
  BA = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView),
  IA = (e) => e instanceof URL,
  xh = (e) => e.replace(/\\/g, "\\\\").replace(/\./g, "\\."),
  Zd = (e) => e.map(String).map(xh).join("."),
  ws = (e, t) => {
    const o = [];
    let a = "";
    for (let u = 0; u < e.length; u++) {
      let c = e.charAt(u);
      if (!t && c === "\\") {
        const p = e.charAt(u + 1);
        if (p === "\\") {
          ((a += "\\"), u++);
          continue;
        } else if (p !== ".") throw Error("invalid path");
      }
      if (c === "\\" && e.charAt(u + 1) === ".") {
        ((a += "."), u++);
        continue;
      }
      if (c === ".") {
        (o.push(a), (a = ""));
        continue;
      }
      a += c;
    }
    const s = a;
    return (o.push(s), o);
  };
function Bn(e, t, o, a) {
  return { isApplicable: e, annotation: t, transform: o, untransform: a };
}
const HS = [
  Bn(
    US,
    "undefined",
    () => null,
    () => {},
  ),
  Bn(
    LA,
    "bigint",
    (e) => e.toString(),
    (e) =>
      typeof BigInt < "u"
        ? BigInt(e)
        : (console.error("Please add a BigInt polyfill."), e),
  ),
  Bn(
    NA,
    "Date",
    (e) => e.toISOString(),
    (e) => new Date(e),
  ),
  Bn(
    IS,
    "Error",
    (e, t) => {
      const o = { name: e.name, message: e.message };
      return (
        "cause" in e && (o.cause = e.cause),
        t.allowedErrorProps.forEach((a) => {
          o[a] = e[a];
        }),
        o
      );
    },
    (e, t) => {
      const o = new Error(e.message, { cause: e.cause });
      return (
        (o.name = e.name),
        (o.stack = e.stack),
        t.allowedErrorProps.forEach((a) => {
          o[a] = e[a];
        }),
        o
      );
    },
  ),
  Bn(
    jA,
    "regexp",
    (e) => "" + e,
    (e) => {
      const t = e.slice(1, e.lastIndexOf("/")),
        o = e.slice(e.lastIndexOf("/") + 1);
      return new RegExp(t, o);
    },
  ),
  Bn(
    Cs,
    "set",
    (e) => [...e.values()],
    (e) => new Set(e),
  ),
  Bn(
    Ts,
    "map",
    (e) => [...e.entries()],
    (e) => new Map(e),
  ),
  Bn(
    (e) => M0(e) || UA(e),
    "number",
    (e) => (M0(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity"),
    Number,
  ),
  Bn(
    (e) => e === 0 && 1 / e === -1 / 0,
    "number",
    () => "-0",
    Number,
  ),
  Bn(
    IA,
    "URL",
    (e) => e.toString(),
    (e) => new URL(e),
  ),
];
function tc(e, t, o, a) {
  return { isApplicable: e, annotation: t, transform: o, untransform: a };
}
const qS = tc(
    (e, t) => (BS(e) ? !!t.symbolRegistry.getIdentifier(e) : !1),
    (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)],
    (e) => e.description,
    (e, t, o) => {
      const a = o.symbolRegistry.getValue(t[1]);
      if (!a) throw new Error("Trying to deserialize unknown symbol");
      return a;
    },
  ),
  HA = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray,
  ].reduce((e, t) => ((e[t.name] = t), e), {}),
  VS = tc(
    BA,
    (e) => ["typed-array", e.constructor.name],
    (e) => [...e],
    (e, t) => {
      const o = HA[t[1]];
      if (!o) throw new Error("Trying to deserialize unknown typed array");
      return new o(e);
    },
  );
function ZS(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
const $S = tc(
    ZS,
    (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)],
    (e, t) => {
      const o = t.classRegistry.getAllowedProps(e.constructor);
      if (!o) return { ...e };
      const a = {};
      return (
        o.forEach((s) => {
          a[s] = e[s];
        }),
        a
      );
    },
    (e, t, o) => {
      const a = o.classRegistry.getValue(t[1]);
      if (!a)
        throw new Error(
          `Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`,
        );
      return Object.assign(Object.create(a.prototype), e);
    },
  ),
  GS = tc(
    (e, t) => !!t.customTransformerRegistry.findApplicable(e),
    (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name],
    (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e),
    (e, t, o) => {
      const a = o.customTransformerRegistry.findByName(t[1]);
      if (!a) throw new Error("Trying to deserialize unknown custom value");
      return a.deserialize(e);
    },
  ),
  qA = [$S, qS, GS, VS],
  D0 = (e, t) => {
    const o = A0(qA, (s) => s.isApplicable(e, t));
    if (o) return { value: o.transform(e, t), type: o.annotation(e, t) };
    const a = A0(HS, (s) => s.isApplicable(e, t));
    if (a) return { value: a.transform(e, t), type: a.annotation };
  },
  FS = {};
HS.forEach((e) => {
  FS[e.annotation] = e;
});
const VA = (e, t, o) => {
    if (to(t))
      switch (t[0]) {
        case "symbol":
          return qS.untransform(e, t, o);
        case "class":
          return $S.untransform(e, t, o);
        case "custom":
          return GS.untransform(e, t, o);
        case "typed-array":
          return VS.untransform(e, t, o);
        default:
          throw new Error("Unknown transformation: " + t);
      }
    else {
      const a = FS[t];
      if (!a) throw new Error("Unknown transformation: " + t);
      return a.untransform(e, o);
    }
  },
  Za = (e, t) => {
    if (t > e.size) throw new Error("index out of bounds");
    const o = e.keys();
    for (; t > 0; ) (o.next(), t--);
    return o.next().value;
  };
function YS(e) {
  if (Au(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (Au(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (Au(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
const ZA = (e, t) => {
    YS(t);
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      if (Cs(e)) e = Za(e, +a);
      else if (Ts(e)) {
        const s = +a,
          u = +t[++o] == 0 ? "key" : "value",
          c = Za(e, s);
        switch (u) {
          case "key":
            e = c;
            break;
          case "value":
            e = e.get(c);
            break;
        }
      } else e = e[a];
    }
    return e;
  },
  Eh = (e, t, o) => {
    if ((YS(t), t.length === 0)) return o(e);
    let a = e;
    for (let u = 0; u < t.length - 1; u++) {
      const c = t[u];
      if (to(a)) {
        const f = +c;
        a = a[f];
      } else if (Rs(a)) a = a[c];
      else if (Cs(a)) {
        const f = +c;
        a = Za(a, f);
      } else if (Ts(a)) {
        if (u === t.length - 2) break;
        const h = +c,
          p = +t[++u] == 0 ? "key" : "value",
          v = Za(a, h);
        switch (p) {
          case "key":
            a = v;
            break;
          case "value":
            a = a.get(v);
            break;
        }
      }
    }
    const s = t[t.length - 1];
    if ((to(a) ? (a[+s] = o(a[+s])) : Rs(a) && (a[s] = o(a[s])), Cs(a))) {
      const u = Za(a, +s),
        c = o(u);
      u !== c && (a.delete(u), a.add(c));
    }
    if (Ts(a)) {
      const u = +t[t.length - 2],
        c = Za(a, u);
      switch (+s == 0 ? "key" : "value") {
        case "key": {
          const h = o(c);
          (a.set(h, a.get(c)), h !== c && a.delete(c));
          break;
        }
        case "value": {
          a.set(c, o(a.get(c)));
          break;
        }
      }
    }
    return e;
  },
  KS = (e) => e < 1;
function Rh(e, t, o, a = []) {
  if (!e) return;
  const s = KS(o);
  if (!to(e)) {
    ti(e, (f, h) => Rh(f, t, o, [...a, ...ws(h, s)]));
    return;
  }
  const [u, c] = e;
  (c &&
    ti(c, (f, h) => {
      Rh(f, t, o, [...a, ...ws(h, s)]);
    }),
    t(u, a));
}
function $A(e, t, o, a) {
  return (
    Rh(
      t,
      (s, u) => {
        e = Eh(e, u, (c) => VA(c, s, a));
      },
      o,
    ),
    e
  );
}
function GA(e, t, o) {
  const a = KS(o);
  function s(u, c) {
    const f = ZA(e, ws(c, a));
    u.map((h) => ws(h, a)).forEach((h) => {
      e = Eh(e, h, () => f);
    });
  }
  if (to(t)) {
    const [u, c] = t;
    (u.forEach((f) => {
      e = Eh(e, ws(f, a), () => e);
    }),
      c && ti(c, s));
  } else ti(t, s);
  return e;
}
const FA = (e, t) => Rs(e) || to(e) || Ts(e) || Cs(e) || IS(e) || ZS(e, t);
function YA(e, t, o) {
  const a = o.get(e);
  a ? a.push(t) : o.set(e, [t]);
}
function KA(e, t) {
  const o = {};
  let a;
  return (
    e.forEach((s) => {
      if (s.length <= 1) return;
      t ||
        (s = s.map((f) => f.map(String)).sort((f, h) => f.length - h.length));
      const [u, ...c] = s;
      u.length === 0 ? (a = c.map(Zd)) : (o[Zd(u)] = c.map(Zd));
    }),
    a ? (_h(o) ? [a] : [a, o]) : _h(o) ? void 0 : o
  );
}
const QS = (e, t, o, a, s = [], u = [], c = new Map()) => {
  const f = kA(e);
  if (!f) {
    YA(e, s, t);
    const S = c.get(e);
    if (S) return a ? { transformedValue: null } : S;
  }
  if (!FA(e, o)) {
    const S = D0(e, o),
      w = S
        ? { transformedValue: S.value, annotations: [S.type] }
        : { transformedValue: e };
    return (f || c.set(e, w), w);
  }
  if (Au(u, e)) return { transformedValue: null };
  const h = D0(e, o),
    p = h?.value ?? e,
    v = to(p) ? [] : {},
    y = {};
  ti(p, (S, w) => {
    if (w === "__proto__" || w === "constructor" || w === "prototype")
      throw new Error(
        `Detected property ${w}. This is a prototype pollution risk, please remove it from your object.`,
      );
    const _ = QS(S, t, o, a, [...s, w], [...u, e], c);
    ((v[w] = _.transformedValue),
      to(_.annotations)
        ? (y[xh(w)] = _.annotations)
        : Rs(_.annotations) &&
          ti(_.annotations, (T, A) => {
            y[xh(w) + "." + A] = T;
          }));
  });
  const g = _h(y)
    ? { transformedValue: v, annotations: h ? [h.type] : void 0 }
    : { transformedValue: v, annotations: h ? [h.type, y] : y };
  return (f || c.set(e, g), g);
};
function XS(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function z0(e) {
  return XS(e) === "Array";
}
function QA(e) {
  if (XS(e) !== "Object") return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function XA(e, t, o, a, s) {
  const u = {}.propertyIsEnumerable.call(a, t) ? "enumerable" : "nonenumerable";
  (u === "enumerable" && (e[t] = o),
    s &&
      u === "nonenumerable" &&
      Object.defineProperty(e, t, {
        value: o,
        enumerable: !1,
        writable: !0,
        configurable: !0,
      }));
}
function Th(e, t = {}) {
  if (z0(e)) return e.map((s) => Th(s, t));
  if (!QA(e)) return e;
  const o = Object.getOwnPropertyNames(e),
    a = Object.getOwnPropertySymbols(e);
  return [...o, ...a].reduce((s, u) => {
    if (u === "__proto__" || (z0(t.props) && !t.props.includes(u))) return s;
    const c = e[u],
      f = Th(c, t);
    return (XA(s, u, f, e, t.nonenumerable), s);
  }, {});
}
class Ae {
  constructor({ dedupe: t = !1 } = {}) {
    ((this.classRegistry = new RA()),
      (this.symbolRegistry = new LS((o) => o.description ?? "")),
      (this.customTransformerRegistry = new OA()),
      (this.allowedErrorProps = []),
      (this.dedupe = t));
  }
  serialize(t) {
    const o = new Map(),
      a = QS(t, o, this, this.dedupe),
      s = { json: a.transformedValue };
    a.annotations && (s.meta = { ...s.meta, values: a.annotations });
    const u = KA(o, this.dedupe);
    return (
      u && (s.meta = { ...s.meta, referentialEqualities: u }),
      s.meta && (s.meta.v = 1),
      s
    );
  }
  deserialize(t, o) {
    const { json: a, meta: s } = t;
    let u = o?.inPlace ? a : Th(a);
    return (
      s?.values && (u = $A(u, s.values, s.v ?? 0, this)),
      s?.referentialEqualities &&
        (u = GA(u, s.referentialEqualities, s.v ?? 0)),
      u
    );
  }
  stringify(t) {
    return JSON.stringify(this.serialize(t));
  }
  parse(t) {
    return this.deserialize(JSON.parse(t), { inPlace: !0 });
  }
  registerClass(t, o) {
    this.classRegistry.register(t, o);
  }
  registerSymbol(t, o) {
    this.symbolRegistry.register(t, o);
  }
  registerCustom(t, o) {
    this.customTransformerRegistry.register({ name: o, ...t });
  }
  allowErrorProps(...t) {
    this.allowedErrorProps.push(...t);
  }
}
Ae.defaultInstance = new Ae();
Ae.serialize = Ae.defaultInstance.serialize.bind(Ae.defaultInstance);
Ae.deserialize = Ae.defaultInstance.deserialize.bind(Ae.defaultInstance);
Ae.stringify = Ae.defaultInstance.stringify.bind(Ae.defaultInstance);
Ae.parse = Ae.defaultInstance.parse.bind(Ae.defaultInstance);
Ae.registerClass = Ae.defaultInstance.registerClass.bind(Ae.defaultInstance);
Ae.registerSymbol = Ae.defaultInstance.registerSymbol.bind(Ae.defaultInstance);
Ae.registerCustom = Ae.defaultInstance.registerCustom.bind(Ae.defaultInstance);
Ae.allowErrorProps = Ae.defaultInstance.allowErrorProps.bind(
  Ae.defaultInstance,
);
Ae.serialize;
Ae.deserialize;
Ae.stringify;
Ae.parse;
Ae.registerClass;
Ae.registerCustom;
Ae.registerSymbol;
Ae.allowErrorProps;
var WA = {};
function WS(e, t) {
  if (e instanceof Promise) throw new Error(t);
}
function JA(e, t) {
  const o = {},
    a = [];
  for (const s in e) {
    const u = e[s]["~standard"].validate(t[s]);
    if (
      (WS(u, `Validation must be synchronous, but ${s} returned a Promise.`),
      u.issues)
    ) {
      a.push(
        ...u.issues.map((c) => ({
          ...c,
          message: c.message,
          path: [s, ...(c.path ?? [])],
        })),
      );
      continue;
    }
    o[s] = u.value;
  }
  return a.length ? { issues: a } : { value: o };
}
function sp(e) {
  const t = e.runtimeEnvStrict ?? e.runtimeEnv ?? WA;
  if (e.emptyStringAsUndefined ?? !1)
    for (const [N, P] of Object.entries(t)) P === "" && delete t[N];
  if (!!e.skipValidation) return t;
  const s = typeof e.client == "object" ? e.client : {},
    u = typeof e.server == "object" ? e.server : {},
    c = typeof e.shared == "object" ? e.shared : {},
    f = e.isServer ?? (typeof window > "u" || "Deno" in window),
    h = f ? { ...u, ...c, ...s } : { ...s, ...c },
    p = e.createFinalSchema?.(h, f)["~standard"].validate(t) ?? JA(h, t);
  WS(p, "Validation must be synchronous");
  const v =
      e.onValidationError ??
      ((N) => {
        throw (
          console.error("❌ Invalid environment variables:", N),
          new Error("Invalid environment variables")
        );
      }),
    y =
      e.onInvalidAccess ??
      (() => {
        throw new Error(
          "❌ Attempted to access a server-side environment variable on the client",
        );
      });
  if (p.issues) return v(p.issues);
  const g = (N) =>
      e.clientPrefix ? !N.startsWith(e.clientPrefix) && !(N in c) : !0,
    S = (N) => f || !g(N),
    w = (N) => N === "__esModule" || N === "$$typeof",
    _ = (e.extends ?? []).reduce((N, P) => Object.assign(N, P), {}),
    T = Object.assign(_, p.value);
  return new Proxy(T, {
    get(N, P) {
      if (typeof P == "string" && !w(P)) return S(P) ? Reflect.get(N, P) : y(P);
    },
  });
}
function ee(e, t, o) {
  function a(f, h) {
    var p;
    (Object.defineProperty(f, "_zod", { value: f._zod ?? {}, enumerable: !1 }),
      (p = f._zod).traits ?? (p.traits = new Set()),
      f._zod.traits.add(e),
      t(f, h));
    for (const v in c.prototype)
      v in f || Object.defineProperty(f, v, { value: c.prototype[v].bind(f) });
    ((f._zod.constr = c), (f._zod.def = h));
  }
  const s = o?.Parent ?? Object;
  class u extends s {}
  Object.defineProperty(u, "name", { value: e });
  function c(f) {
    var h;
    const p = o?.Parent ? new u() : this;
    (a(p, f), (h = p._zod).deferred ?? (h.deferred = []));
    for (const v of p._zod.deferred) v();
    return p;
  }
  return (
    Object.defineProperty(c, "init", { value: a }),
    Object.defineProperty(c, Symbol.hasInstance, {
      value: (f) =>
        o?.Parent && f instanceof o.Parent ? !0 : f?._zod?.traits?.has(e),
    }),
    Object.defineProperty(c, "name", { value: e }),
    c
  );
}
class Ya extends Error {
  constructor() {
    super(
      "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
    );
  }
}
class JS extends Error {
  constructor(t) {
    (super(`Encountered unidirectional transform during encode: ${t}`),
      (this.name = "ZodEncodeError"));
  }
}
const eM = {};
function Uo(e) {
  return eM;
}
function tM(e) {
  const t = Object.values(e).filter((a) => typeof a == "number");
  return Object.entries(e)
    .filter(([a, s]) => t.indexOf(+a) === -1)
    .map(([a, s]) => s);
}
function Ch(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function lp(e) {
  return e == null;
}
function up(e) {
  const t = e.startsWith("^") ? 1 : 0,
    o = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, o);
}
const P0 = Symbol("evaluating");
function Ye(e, t, o) {
  let a;
  Object.defineProperty(e, t, {
    get() {
      if (a !== P0) return (a === void 0 && ((a = P0), (a = o())), a);
    },
    set(s) {
      Object.defineProperty(e, t, { value: s });
    },
    configurable: !0,
  });
}
function nM(...e) {
  const t = {};
  for (const o of e) {
    const a = Object.getOwnPropertyDescriptors(o);
    Object.assign(t, a);
  }
  return Object.defineProperties({}, t);
}
const e1 =
  "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function j0(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Oh(e) {
  if (j0(e) === !1) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const o = t.prototype;
  return !(
    j0(o) === !1 ||
    Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1
  );
}
function t1(e) {
  return Oh(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const rM = new Set(["string", "number", "symbol"]);
function nc(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function oM(e, t, o) {
  const a = new e._zod.constr(t ?? e._zod.def);
  return ((!t || o?.parent) && (a._zod.parent = e), a);
}
function _e(e) {
  const t = e;
  if (!t) return {};
  if (typeof t == "string") return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return (
    delete t.message,
    typeof t.error == "string" ? { ...t, error: () => t.error } : t
  );
}
function $a(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let o = t; o < e.issues.length; o++)
    if (e.issues[o]?.continue !== !0) return !0;
  return !1;
}
function aM(e, t) {
  return t.map((o) => {
    var a;
    return ((a = o).path ?? (a.path = []), o.path.unshift(e), o);
  });
}
function du(e) {
  return typeof e == "string" ? e : e?.message;
}
function Bo(e, t, o) {
  const a = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const s =
      du(e.inst?._zod.def?.error?.(e)) ??
      du(t?.error?.(e)) ??
      du(o.customError?.(e)) ??
      du(o.localeError?.(e)) ??
      "Invalid input";
    a.message = s;
  }
  return (
    delete a.inst,
    delete a.continue,
    t?.reportInput || delete a.input,
    a
  );
}
function cp(e) {
  return Array.isArray(e)
    ? "array"
    : typeof e == "string"
      ? "string"
      : "unknown";
}
function Os(...e) {
  const [t, o, a] = e;
  return typeof t == "string"
    ? { message: t, code: "custom", input: o, inst: a }
    : { ...t };
}
const n1 = (e, t) => {
    ((e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, Ch, 2)),
      Object.defineProperty(e, "toString", {
        value: () => e.message,
        enumerable: !1,
      }));
  },
  r1 = ee("$ZodError", n1),
  o1 = ee("$ZodError", n1, { Parent: Error });
function iM(e, t = (o) => o.message) {
  const o = {},
    a = [];
  for (const s of e.issues)
    s.path.length > 0
      ? ((o[s.path[0]] = o[s.path[0]] || []), o[s.path[0]].push(t(s)))
      : a.push(t(s));
  return { formErrors: a, fieldErrors: o };
}
function sM(e, t = (o) => o.message) {
  const o = { _errors: [] },
    a = (s) => {
      for (const u of s.issues)
        if (u.code === "invalid_union" && u.errors.length)
          u.errors.map((c) => a({ issues: c }));
        else if (u.code === "invalid_key") a({ issues: u.issues });
        else if (u.code === "invalid_element") a({ issues: u.issues });
        else if (u.path.length === 0) o._errors.push(t(u));
        else {
          let c = o,
            f = 0;
          for (; f < u.path.length; ) {
            const h = u.path[f];
            (f === u.path.length - 1
              ? ((c[h] = c[h] || { _errors: [] }), c[h]._errors.push(t(u)))
              : (c[h] = c[h] || { _errors: [] }),
              (c = c[h]),
              f++);
          }
        }
    };
  return (a(e), o);
}
const fp = (e) => (t, o, a, s) => {
    const u = a ? Object.assign(a, { async: !1 }) : { async: !1 },
      c = t._zod.run({ value: o, issues: [] }, u);
    if (c instanceof Promise) throw new Ya();
    if (c.issues.length) {
      const f = new (s?.Err ?? e)(c.issues.map((h) => Bo(h, u, Uo())));
      throw (e1(f, s?.callee), f);
    }
    return c.value;
  },
  dp = (e) => async (t, o, a, s) => {
    const u = a ? Object.assign(a, { async: !0 }) : { async: !0 };
    let c = t._zod.run({ value: o, issues: [] }, u);
    if ((c instanceof Promise && (c = await c), c.issues.length)) {
      const f = new (s?.Err ?? e)(c.issues.map((h) => Bo(h, u, Uo())));
      throw (e1(f, s?.callee), f);
    }
    return c.value;
  },
  rc = (e) => (t, o, a) => {
    const s = a ? { ...a, async: !1 } : { async: !1 },
      u = t._zod.run({ value: o, issues: [] }, s);
    if (u instanceof Promise) throw new Ya();
    return u.issues.length
      ? {
          success: !1,
          error: new (e ?? r1)(u.issues.map((c) => Bo(c, s, Uo()))),
        }
      : { success: !0, data: u.value };
  },
  lM = rc(o1),
  oc = (e) => async (t, o, a) => {
    const s = a ? Object.assign(a, { async: !0 }) : { async: !0 };
    let u = t._zod.run({ value: o, issues: [] }, s);
    return (
      u instanceof Promise && (u = await u),
      u.issues.length
        ? { success: !1, error: new e(u.issues.map((c) => Bo(c, s, Uo()))) }
        : { success: !0, data: u.value }
    );
  },
  uM = oc(o1),
  cM = (e) => (t, o, a) => {
    const s = a
      ? Object.assign(a, { direction: "backward" })
      : { direction: "backward" };
    return fp(e)(t, o, s);
  },
  fM = (e) => (t, o, a) => fp(e)(t, o, a),
  dM = (e) => async (t, o, a) => {
    const s = a
      ? Object.assign(a, { direction: "backward" })
      : { direction: "backward" };
    return dp(e)(t, o, s);
  },
  hM = (e) => async (t, o, a) => dp(e)(t, o, a),
  pM = (e) => (t, o, a) => {
    const s = a
      ? Object.assign(a, { direction: "backward" })
      : { direction: "backward" };
    return rc(e)(t, o, s);
  },
  mM = (e) => (t, o, a) => rc(e)(t, o, a),
  yM = (e) => async (t, o, a) => {
    const s = a
      ? Object.assign(a, { direction: "backward" })
      : { direction: "backward" };
    return oc(e)(t, o, s);
  },
  vM = (e) => async (t, o, a) => oc(e)(t, o, a),
  gM = /^[cC][^\s-]{8,}$/,
  bM = /^[0-9a-z]+$/,
  SM = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  wM = /^[0-9a-vA-V]{20}$/,
  _M = /^[A-Za-z0-9]{27}$/,
  xM = /^[a-zA-Z0-9_-]{21}$/,
  EM =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  RM =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  N0 = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  TM =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  CM = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function OM() {
  return new RegExp(CM, "u");
}
const AM =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  MM =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  DM =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  zM =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  PM =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  a1 = /^[A-Za-z0-9_-]*$/,
  jM =
    /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
  NM = /^\+(?:[0-9]){6,14}[0-9]$/,
  i1 =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  kM = new RegExp(`^${i1}$`);
function s1(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number"
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function LM(e) {
  return new RegExp(`^${s1(e)}$`);
}
function UM(e) {
  const t = s1({ precision: e.precision }),
    o = ["Z"];
  (e.local && o.push(""),
    e.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
  const a = `${t}(?:${o.join("|")})`;
  return new RegExp(`^${i1}T(?:${a})$`);
}
const BM = (e) => {
    const t = e
      ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}`
      : "[\\s\\S]*";
    return new RegExp(`^${t}$`);
  },
  IM = /^[^A-Z]*$/,
  HM = /^[^a-z]*$/,
  Kn = ee("$ZodCheck", (e, t) => {
    var o;
    (e._zod ?? (e._zod = {}),
      (e._zod.def = t),
      (o = e._zod).onattach ?? (o.onattach = []));
  }),
  qM = ee("$ZodCheckMaxLength", (e, t) => {
    var o;
    (Kn.init(e, t),
      (o = e._zod.def).when ??
        (o.when = (a) => {
          const s = a.value;
          return !lp(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((a) => {
        const s = a._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        t.maximum < s && (a._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (a) => {
        const s = a.value;
        if (s.length <= t.maximum) return;
        const c = cp(s);
        a.issues.push({
          origin: c,
          code: "too_big",
          maximum: t.maximum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  VM = ee("$ZodCheckMinLength", (e, t) => {
    var o;
    (Kn.init(e, t),
      (o = e._zod.def).when ??
        (o.when = (a) => {
          const s = a.value;
          return !lp(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((a) => {
        const s = a._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        t.minimum > s && (a._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (a) => {
        const s = a.value;
        if (s.length >= t.minimum) return;
        const c = cp(s);
        a.issues.push({
          origin: c,
          code: "too_small",
          minimum: t.minimum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  ZM = ee("$ZodCheckLengthEquals", (e, t) => {
    var o;
    (Kn.init(e, t),
      (o = e._zod.def).when ??
        (o.when = (a) => {
          const s = a.value;
          return !lp(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((a) => {
        const s = a._zod.bag;
        ((s.minimum = t.length), (s.maximum = t.length), (s.length = t.length));
      }),
      (e._zod.check = (a) => {
        const s = a.value,
          u = s.length;
        if (u === t.length) return;
        const c = cp(s),
          f = u > t.length;
        a.issues.push({
          origin: c,
          ...(f
            ? { code: "too_big", maximum: t.length }
            : { code: "too_small", minimum: t.length }),
          inclusive: !0,
          exact: !0,
          input: a.value,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  ac = ee("$ZodCheckStringFormat", (e, t) => {
    var o, a;
    (Kn.init(e, t),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        ((u.format = t.format),
          t.pattern &&
            (u.patterns ?? (u.patterns = new Set()),
            u.patterns.add(t.pattern)));
      }),
      t.pattern
        ? ((o = e._zod).check ??
          (o.check = (s) => {
            ((t.pattern.lastIndex = 0),
              !t.pattern.test(s.value) &&
                s.issues.push({
                  origin: "string",
                  code: "invalid_format",
                  format: t.format,
                  input: s.value,
                  ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                  inst: e,
                  continue: !t.abort,
                }));
          }))
        : ((a = e._zod).check ?? (a.check = () => {})));
  }),
  $M = ee("$ZodCheckRegex", (e, t) => {
    (ac.init(e, t),
      (e._zod.check = (o) => {
        ((t.pattern.lastIndex = 0),
          !t.pattern.test(o.value) &&
            o.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "regex",
              input: o.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  GM = ee("$ZodCheckLowerCase", (e, t) => {
    (t.pattern ?? (t.pattern = IM), ac.init(e, t));
  }),
  FM = ee("$ZodCheckUpperCase", (e, t) => {
    (t.pattern ?? (t.pattern = HM), ac.init(e, t));
  }),
  YM = ee("$ZodCheckIncludes", (e, t) => {
    Kn.init(e, t);
    const o = nc(t.includes),
      a = new RegExp(
        typeof t.position == "number" ? `^.{${t.position}}${o}` : o,
      );
    ((t.pattern = a),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        (u.patterns ?? (u.patterns = new Set()), u.patterns.add(a));
      }),
      (e._zod.check = (s) => {
        s.value.includes(t.includes, t.position) ||
          s.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: t.includes,
            input: s.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  KM = ee("$ZodCheckStartsWith", (e, t) => {
    Kn.init(e, t);
    const o = new RegExp(`^${nc(t.prefix)}.*`);
    (t.pattern ?? (t.pattern = o),
      e._zod.onattach.push((a) => {
        const s = a._zod.bag;
        (s.patterns ?? (s.patterns = new Set()), s.patterns.add(o));
      }),
      (e._zod.check = (a) => {
        a.value.startsWith(t.prefix) ||
          a.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: t.prefix,
            input: a.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  QM = ee("$ZodCheckEndsWith", (e, t) => {
    Kn.init(e, t);
    const o = new RegExp(`.*${nc(t.suffix)}$`);
    (t.pattern ?? (t.pattern = o),
      e._zod.onattach.push((a) => {
        const s = a._zod.bag;
        (s.patterns ?? (s.patterns = new Set()), s.patterns.add(o));
      }),
      (e._zod.check = (a) => {
        a.value.endsWith(t.suffix) ||
          a.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: t.suffix,
            input: a.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  XM = ee("$ZodCheckOverwrite", (e, t) => {
    (Kn.init(e, t),
      (e._zod.check = (o) => {
        o.value = t.tx(o.value);
      }));
  }),
  WM = { major: 4, minor: 1, patch: 12 },
  jt = ee("$ZodType", (e, t) => {
    var o;
    (e ?? (e = {}),
      (e._zod.def = t),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = WM));
    const a = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has("$ZodCheck") && a.unshift(e);
    for (const s of a) for (const u of s._zod.onattach) u(e);
    if (a.length === 0)
      ((o = e._zod).deferred ?? (o.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        }));
    else {
      const s = (c, f, h) => {
          let p = $a(c),
            v;
          for (const y of f) {
            if (y._zod.def.when) {
              if (!y._zod.def.when(c)) continue;
            } else if (p) continue;
            const g = c.issues.length,
              S = y._zod.check(c);
            if (S instanceof Promise && h?.async === !1) throw new Ya();
            if (v || S instanceof Promise)
              v = (v ?? Promise.resolve()).then(async () => {
                (await S, c.issues.length !== g && (p || (p = $a(c, g))));
              });
            else {
              if (c.issues.length === g) continue;
              p || (p = $a(c, g));
            }
          }
          return v ? v.then(() => c) : c;
        },
        u = (c, f, h) => {
          if ($a(c)) return ((c.aborted = !0), c);
          const p = s(f, a, h);
          if (p instanceof Promise) {
            if (h.async === !1) throw new Ya();
            return p.then((v) => e._zod.parse(v, h));
          }
          return e._zod.parse(p, h);
        };
      e._zod.run = (c, f) => {
        if (f.skipChecks) return e._zod.parse(c, f);
        if (f.direction === "backward") {
          const p = e._zod.parse(
            { value: c.value, issues: [] },
            { ...f, skipChecks: !0 },
          );
          return p instanceof Promise ? p.then((v) => u(v, c, f)) : u(p, c, f);
        }
        const h = e._zod.parse(c, f);
        if (h instanceof Promise) {
          if (f.async === !1) throw new Ya();
          return h.then((p) => s(p, a, f));
        }
        return s(h, a, f);
      };
    }
    e["~standard"] = {
      validate: (s) => {
        try {
          const u = lM(e, s);
          return u.success ? { value: u.data } : { issues: u.error?.issues };
        } catch {
          return uM(e, s).then((c) =>
            c.success ? { value: c.data } : { issues: c.error?.issues },
          );
        }
      },
      vendor: "zod",
      version: 1,
    };
  }),
  hp = ee("$ZodString", (e, t) => {
    (jt.init(e, t),
      (e._zod.pattern =
        [...(e?._zod.bag?.patterns ?? [])].pop() ?? BM(e._zod.bag)),
      (e._zod.parse = (o, a) => {
        if (t.coerce)
          try {
            o.value = String(o.value);
          } catch {}
        return (
          typeof o.value == "string" ||
            o.issues.push({
              expected: "string",
              code: "invalid_type",
              input: o.value,
              inst: e,
            }),
          o
        );
      }));
  }),
  Ke = ee("$ZodStringFormat", (e, t) => {
    (ac.init(e, t), hp.init(e, t));
  }),
  JM = ee("$ZodGUID", (e, t) => {
    (t.pattern ?? (t.pattern = RM), Ke.init(e, t));
  }),
  e9 = ee("$ZodUUID", (e, t) => {
    if (t.version) {
      const a = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        t.version
      ];
      if (a === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ?? (t.pattern = N0(a));
    } else t.pattern ?? (t.pattern = N0());
    Ke.init(e, t);
  }),
  t9 = ee("$ZodEmail", (e, t) => {
    (t.pattern ?? (t.pattern = TM), Ke.init(e, t));
  }),
  n9 = ee("$ZodURL", (e, t) => {
    (Ke.init(e, t),
      (e._zod.check = (o) => {
        try {
          const a = o.value.trim(),
            s = new URL(a);
          (t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(s.hostname) ||
              o.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: jM.source,
                input: o.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(
                s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol,
              ) ||
                o.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: t.protocol.source,
                  input: o.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (o.value = s.href) : (o.value = a));
          return;
        } catch {
          o.issues.push({
            code: "invalid_format",
            format: "url",
            input: o.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  r9 = ee("$ZodEmoji", (e, t) => {
    (t.pattern ?? (t.pattern = OM()), Ke.init(e, t));
  }),
  o9 = ee("$ZodNanoID", (e, t) => {
    (t.pattern ?? (t.pattern = xM), Ke.init(e, t));
  }),
  a9 = ee("$ZodCUID", (e, t) => {
    (t.pattern ?? (t.pattern = gM), Ke.init(e, t));
  }),
  i9 = ee("$ZodCUID2", (e, t) => {
    (t.pattern ?? (t.pattern = bM), Ke.init(e, t));
  }),
  s9 = ee("$ZodULID", (e, t) => {
    (t.pattern ?? (t.pattern = SM), Ke.init(e, t));
  }),
  l9 = ee("$ZodXID", (e, t) => {
    (t.pattern ?? (t.pattern = wM), Ke.init(e, t));
  }),
  u9 = ee("$ZodKSUID", (e, t) => {
    (t.pattern ?? (t.pattern = _M), Ke.init(e, t));
  }),
  c9 = ee("$ZodISODateTime", (e, t) => {
    (t.pattern ?? (t.pattern = UM(t)), Ke.init(e, t));
  }),
  f9 = ee("$ZodISODate", (e, t) => {
    (t.pattern ?? (t.pattern = kM), Ke.init(e, t));
  }),
  d9 = ee("$ZodISOTime", (e, t) => {
    (t.pattern ?? (t.pattern = LM(t)), Ke.init(e, t));
  }),
  h9 = ee("$ZodISODuration", (e, t) => {
    (t.pattern ?? (t.pattern = EM), Ke.init(e, t));
  }),
  p9 = ee("$ZodIPv4", (e, t) => {
    (t.pattern ?? (t.pattern = AM),
      Ke.init(e, t),
      e._zod.onattach.push((o) => {
        const a = o._zod.bag;
        a.format = "ipv4";
      }));
  }),
  m9 = ee("$ZodIPv6", (e, t) => {
    (t.pattern ?? (t.pattern = MM),
      Ke.init(e, t),
      e._zod.onattach.push((o) => {
        const a = o._zod.bag;
        a.format = "ipv6";
      }),
      (e._zod.check = (o) => {
        try {
          new URL(`http://[${o.value}]`);
        } catch {
          o.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: o.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  y9 = ee("$ZodCIDRv4", (e, t) => {
    (t.pattern ?? (t.pattern = DM), Ke.init(e, t));
  }),
  v9 = ee("$ZodCIDRv6", (e, t) => {
    (t.pattern ?? (t.pattern = zM),
      Ke.init(e, t),
      (e._zod.check = (o) => {
        const a = o.value.split("/");
        try {
          if (a.length !== 2) throw new Error();
          const [s, u] = a;
          if (!u) throw new Error();
          const c = Number(u);
          if (`${c}` !== u) throw new Error();
          if (c < 0 || c > 128) throw new Error();
          new URL(`http://[${s}]`);
        } catch {
          o.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: o.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  });
function l1(e) {
  if (e === "") return !0;
  if (e.length % 4 !== 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
const g9 = ee("$ZodBase64", (e, t) => {
  (t.pattern ?? (t.pattern = PM),
    Ke.init(e, t),
    e._zod.onattach.push((o) => {
      o._zod.bag.contentEncoding = "base64";
    }),
    (e._zod.check = (o) => {
      l1(o.value) ||
        o.issues.push({
          code: "invalid_format",
          format: "base64",
          input: o.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function b9(e) {
  if (!a1.test(e)) return !1;
  const t = e.replace(/[-_]/g, (a) => (a === "-" ? "+" : "/")),
    o = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return l1(o);
}
const S9 = ee("$ZodBase64URL", (e, t) => {
    (t.pattern ?? (t.pattern = a1),
      Ke.init(e, t),
      e._zod.onattach.push((o) => {
        o._zod.bag.contentEncoding = "base64url";
      }),
      (e._zod.check = (o) => {
        b9(o.value) ||
          o.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: o.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  w9 = ee("$ZodE164", (e, t) => {
    (t.pattern ?? (t.pattern = NM), Ke.init(e, t));
  });
function _9(e, t = null) {
  try {
    const o = e.split(".");
    if (o.length !== 3) return !1;
    const [a] = o;
    if (!a) return !1;
    const s = JSON.parse(atob(a));
    return !(
      ("typ" in s && s?.typ !== "JWT") ||
      !s.alg ||
      (t && (!("alg" in s) || s.alg !== t))
    );
  } catch {
    return !1;
  }
}
const x9 = ee("$ZodJWT", (e, t) => {
  (Ke.init(e, t),
    (e._zod.check = (o) => {
      _9(o.value, t.alg) ||
        o.issues.push({
          code: "invalid_format",
          format: "jwt",
          input: o.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function k0(e, t, o) {
  (e.issues.length && t.issues.push(...aM(o, e.issues)),
    (t.value[o] = e.value));
}
const E9 = ee("$ZodArray", (e, t) => {
  (jt.init(e, t),
    (e._zod.parse = (o, a) => {
      const s = o.value;
      if (!Array.isArray(s))
        return (
          o.issues.push({
            expected: "array",
            code: "invalid_type",
            input: s,
            inst: e,
          }),
          o
        );
      o.value = Array(s.length);
      const u = [];
      for (let c = 0; c < s.length; c++) {
        const f = s[c],
          h = t.element._zod.run({ value: f, issues: [] }, a);
        h instanceof Promise ? u.push(h.then((p) => k0(p, o, c))) : k0(h, o, c);
      }
      return u.length ? Promise.all(u).then(() => o) : o;
    }));
});
function L0(e, t, o, a) {
  for (const u of e) if (u.issues.length === 0) return ((t.value = u.value), t);
  const s = e.filter((u) => !$a(u));
  return s.length === 1
    ? ((t.value = s[0].value), s[0])
    : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: o,
        errors: e.map((u) => u.issues.map((c) => Bo(c, a, Uo()))),
      }),
      t);
}
const R9 = ee("$ZodUnion", (e, t) => {
    (jt.init(e, t),
      Ye(e._zod, "optin", () =>
        t.options.some((s) => s._zod.optin === "optional")
          ? "optional"
          : void 0,
      ),
      Ye(e._zod, "optout", () =>
        t.options.some((s) => s._zod.optout === "optional")
          ? "optional"
          : void 0,
      ),
      Ye(e._zod, "values", () => {
        if (t.options.every((s) => s._zod.values))
          return new Set(t.options.flatMap((s) => Array.from(s._zod.values)));
      }),
      Ye(e._zod, "pattern", () => {
        if (t.options.every((s) => s._zod.pattern)) {
          const s = t.options.map((u) => u._zod.pattern);
          return new RegExp(`^(${s.map((u) => up(u.source)).join("|")})$`);
        }
      }));
    const o = t.options.length === 1,
      a = t.options[0]._zod.run;
    e._zod.parse = (s, u) => {
      if (o) return a(s, u);
      let c = !1;
      const f = [];
      for (const h of t.options) {
        const p = h._zod.run({ value: s.value, issues: [] }, u);
        if (p instanceof Promise) (f.push(p), (c = !0));
        else {
          if (p.issues.length === 0) return p;
          f.push(p);
        }
      }
      return c ? Promise.all(f).then((h) => L0(h, s, e, u)) : L0(f, s, e, u);
    };
  }),
  T9 = ee("$ZodIntersection", (e, t) => {
    (jt.init(e, t),
      (e._zod.parse = (o, a) => {
        const s = o.value,
          u = t.left._zod.run({ value: s, issues: [] }, a),
          c = t.right._zod.run({ value: s, issues: [] }, a);
        return u instanceof Promise || c instanceof Promise
          ? Promise.all([u, c]).then(([h, p]) => U0(o, h, p))
          : U0(o, u, c);
      }));
  });
function Ah(e, t) {
  if (e === t) return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Oh(e) && Oh(t)) {
    const o = Object.keys(t),
      a = Object.keys(e).filter((u) => o.indexOf(u) !== -1),
      s = { ...e, ...t };
    for (const u of a) {
      const c = Ah(e[u], t[u]);
      if (!c.valid)
        return { valid: !1, mergeErrorPath: [u, ...c.mergeErrorPath] };
      s[u] = c.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let a = 0; a < e.length; a++) {
      const s = e[a],
        u = t[a],
        c = Ah(s, u);
      if (!c.valid)
        return { valid: !1, mergeErrorPath: [a, ...c.mergeErrorPath] };
      o.push(c.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function U0(e, t, o) {
  if (
    (t.issues.length && e.issues.push(...t.issues),
    o.issues.length && e.issues.push(...o.issues),
    $a(e))
  )
    return e;
  const a = Ah(t.value, o.value);
  if (!a.valid)
    throw new Error(
      `Unmergable intersection. Error path: ${JSON.stringify(a.mergeErrorPath)}`,
    );
  return ((e.value = a.data), e);
}
const C9 = ee("$ZodEnum", (e, t) => {
    jt.init(e, t);
    const o = tM(t.entries),
      a = new Set(o);
    ((e._zod.values = a),
      (e._zod.pattern = new RegExp(
        `^(${o
          .filter((s) => rM.has(typeof s))
          .map((s) => (typeof s == "string" ? nc(s) : s.toString()))
          .join("|")})$`,
      )),
      (e._zod.parse = (s, u) => {
        const c = s.value;
        return (
          a.has(c) ||
            s.issues.push({
              code: "invalid_value",
              values: o,
              input: c,
              inst: e,
            }),
          s
        );
      }));
  }),
  O9 = ee("$ZodTransform", (e, t) => {
    (jt.init(e, t),
      (e._zod.parse = (o, a) => {
        if (a.direction === "backward") throw new JS(e.constructor.name);
        const s = t.transform(o.value, o);
        if (a.async)
          return (s instanceof Promise ? s : Promise.resolve(s)).then(
            (c) => ((o.value = c), o),
          );
        if (s instanceof Promise) throw new Ya();
        return ((o.value = s), o);
      }));
  });
function B0(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const A9 = ee("$ZodOptional", (e, t) => {
    (jt.init(e, t),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      Ye(e._zod, "values", () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, void 0])
          : void 0,
      ),
      Ye(e._zod, "pattern", () => {
        const o = t.innerType._zod.pattern;
        return o ? new RegExp(`^(${up(o.source)})?$`) : void 0;
      }),
      (e._zod.parse = (o, a) => {
        if (t.innerType._zod.optin === "optional") {
          const s = t.innerType._zod.run(o, a);
          return s instanceof Promise
            ? s.then((u) => B0(u, o.value))
            : B0(s, o.value);
        }
        return o.value === void 0 ? o : t.innerType._zod.run(o, a);
      }));
  }),
  M9 = ee("$ZodNullable", (e, t) => {
    (jt.init(e, t),
      Ye(e._zod, "optin", () => t.innerType._zod.optin),
      Ye(e._zod, "optout", () => t.innerType._zod.optout),
      Ye(e._zod, "pattern", () => {
        const o = t.innerType._zod.pattern;
        return o ? new RegExp(`^(${up(o.source)}|null)$`) : void 0;
      }),
      Ye(e._zod, "values", () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, null])
          : void 0,
      ),
      (e._zod.parse = (o, a) =>
        o.value === null ? o : t.innerType._zod.run(o, a)));
  }),
  D9 = ee("$ZodDefault", (e, t) => {
    (jt.init(e, t),
      (e._zod.optin = "optional"),
      Ye(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (o, a) => {
        if (a.direction === "backward") return t.innerType._zod.run(o, a);
        if (o.value === void 0) return ((o.value = t.defaultValue), o);
        const s = t.innerType._zod.run(o, a);
        return s instanceof Promise ? s.then((u) => I0(u, t)) : I0(s, t);
      }));
  });
function I0(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e);
}
const z9 = ee("$ZodPrefault", (e, t) => {
    (jt.init(e, t),
      (e._zod.optin = "optional"),
      Ye(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (o, a) => (
        a.direction === "backward" ||
          (o.value === void 0 && (o.value = t.defaultValue)),
        t.innerType._zod.run(o, a)
      )));
  }),
  P9 = ee("$ZodNonOptional", (e, t) => {
    (jt.init(e, t),
      Ye(e._zod, "values", () => {
        const o = t.innerType._zod.values;
        return o ? new Set([...o].filter((a) => a !== void 0)) : void 0;
      }),
      (e._zod.parse = (o, a) => {
        const s = t.innerType._zod.run(o, a);
        return s instanceof Promise ? s.then((u) => H0(u, e)) : H0(s, e);
      }));
  });
function H0(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: e.value,
        inst: t,
      }),
    e
  );
}
const j9 = ee("$ZodCatch", (e, t) => {
    (jt.init(e, t),
      Ye(e._zod, "optin", () => t.innerType._zod.optin),
      Ye(e._zod, "optout", () => t.innerType._zod.optout),
      Ye(e._zod, "values", () => t.innerType._zod.values),
      (e._zod.parse = (o, a) => {
        if (a.direction === "backward") return t.innerType._zod.run(o, a);
        const s = t.innerType._zod.run(o, a);
        return s instanceof Promise
          ? s.then(
              (u) => (
                (o.value = u.value),
                u.issues.length &&
                  ((o.value = t.catchValue({
                    ...o,
                    error: { issues: u.issues.map((c) => Bo(c, a, Uo())) },
                    input: o.value,
                  })),
                  (o.issues = [])),
                o
              ),
            )
          : ((o.value = s.value),
            s.issues.length &&
              ((o.value = t.catchValue({
                ...o,
                error: { issues: s.issues.map((u) => Bo(u, a, Uo())) },
                input: o.value,
              })),
              (o.issues = [])),
            o);
      }));
  }),
  N9 = ee("$ZodPipe", (e, t) => {
    (jt.init(e, t),
      Ye(e._zod, "values", () => t.in._zod.values),
      Ye(e._zod, "optin", () => t.in._zod.optin),
      Ye(e._zod, "optout", () => t.out._zod.optout),
      Ye(e._zod, "propValues", () => t.in._zod.propValues),
      (e._zod.parse = (o, a) => {
        if (a.direction === "backward") {
          const u = t.out._zod.run(o, a);
          return u instanceof Promise
            ? u.then((c) => hu(c, t.in, a))
            : hu(u, t.in, a);
        }
        const s = t.in._zod.run(o, a);
        return s instanceof Promise
          ? s.then((u) => hu(u, t.out, a))
          : hu(s, t.out, a);
      }));
  });
function hu(e, t, o) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({ value: e.value, issues: e.issues }, o);
}
const k9 = ee("$ZodReadonly", (e, t) => {
  (jt.init(e, t),
    Ye(e._zod, "propValues", () => t.innerType._zod.propValues),
    Ye(e._zod, "values", () => t.innerType._zod.values),
    Ye(e._zod, "optin", () => t.innerType._zod.optin),
    Ye(e._zod, "optout", () => t.innerType._zod.optout),
    (e._zod.parse = (o, a) => {
      if (a.direction === "backward") return t.innerType._zod.run(o, a);
      const s = t.innerType._zod.run(o, a);
      return s instanceof Promise ? s.then(q0) : q0(s);
    }));
});
function q0(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
const L9 = ee("$ZodCustom", (e, t) => {
  (Kn.init(e, t),
    jt.init(e, t),
    (e._zod.parse = (o, a) => o),
    (e._zod.check = (o) => {
      const a = o.value,
        s = t.fn(a);
      if (s instanceof Promise) return s.then((u) => V0(u, o, a, e));
      V0(s, o, a, e);
    }));
});
function V0(e, t, o, a) {
  if (!e) {
    const s = {
      code: "custom",
      input: o,
      inst: a,
      path: [...(a._zod.def.path ?? [])],
      continue: !a._zod.def.abort,
    };
    (a._zod.def.params && (s.params = a._zod.def.params), t.issues.push(Os(s)));
  }
}
class U9 {
  constructor() {
    ((this._map = new WeakMap()), (this._idmap = new Map()));
  }
  add(t, ...o) {
    const a = o[0];
    if ((this._map.set(t, a), a && typeof a == "object" && "id" in a)) {
      if (this._idmap.has(a.id))
        throw new Error(`ID ${a.id} already exists in the registry`);
      this._idmap.set(a.id, t);
    }
    return this;
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
  }
  remove(t) {
    const o = this._map.get(t);
    return (
      o && typeof o == "object" && "id" in o && this._idmap.delete(o.id),
      this._map.delete(t),
      this
    );
  }
  get(t) {
    const o = t._zod.parent;
    if (o) {
      const a = { ...(this.get(o) ?? {}) };
      delete a.id;
      const s = { ...a, ...this._map.get(t) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function B9() {
  return new U9();
}
const pu = B9();
function I9(e, t) {
  return new e({ type: "string", ..._e(t) });
}
function H9(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function Z0(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function q9(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function V9(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ..._e(t),
  });
}
function Z9(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ..._e(t),
  });
}
function $9(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ..._e(t),
  });
}
function u1(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function G9(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function F9(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function Y9(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function K9(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function Q9(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function X9(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function W9(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function J9(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function e4(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function t4(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function n4(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function r4(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function o4(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function a4(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function i4(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ..._e(t),
  });
}
function s4(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ..._e(t),
  });
}
function l4(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ..._e(t),
  });
}
function u4(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ..._e(t),
  });
}
function c4(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ..._e(t),
  });
}
function c1(e, t) {
  return new qM({ check: "max_length", ..._e(t), maximum: e });
}
function Iu(e, t) {
  return new VM({ check: "min_length", ..._e(t), minimum: e });
}
function f1(e, t) {
  return new ZM({ check: "length_equals", ..._e(t), length: e });
}
function f4(e, t) {
  return new $M({
    check: "string_format",
    format: "regex",
    ..._e(t),
    pattern: e,
  });
}
function d4(e) {
  return new GM({ check: "string_format", format: "lowercase", ..._e(e) });
}
function h4(e) {
  return new FM({ check: "string_format", format: "uppercase", ..._e(e) });
}
function p4(e, t) {
  return new YM({
    check: "string_format",
    format: "includes",
    ..._e(t),
    includes: e,
  });
}
function m4(e, t) {
  return new KM({
    check: "string_format",
    format: "starts_with",
    ..._e(t),
    prefix: e,
  });
}
function y4(e, t) {
  return new QM({
    check: "string_format",
    format: "ends_with",
    ..._e(t),
    suffix: e,
  });
}
function Us(e) {
  return new XM({ check: "overwrite", tx: e });
}
function v4(e) {
  return Us((t) => t.normalize(e));
}
function g4() {
  return Us((e) => e.trim());
}
function b4() {
  return Us((e) => e.toLowerCase());
}
function S4() {
  return Us((e) => e.toUpperCase());
}
function w4(e, t, o) {
  return new e({ type: "array", element: t, ..._e(o) });
}
function _4(e, t, o) {
  return new e({ type: "custom", check: "custom", fn: t, ..._e(o) });
}
function x4(e) {
  const t = E4(
    (o) => (
      (o.addIssue = (a) => {
        if (typeof a == "string") o.issues.push(Os(a, o.value, t._zod.def));
        else {
          const s = a;
          (s.fatal && (s.continue = !1),
            s.code ?? (s.code = "custom"),
            s.input ?? (s.input = o.value),
            s.inst ?? (s.inst = t),
            s.continue ?? (s.continue = !t._zod.def.abort),
            o.issues.push(Os(s)));
        }
      }),
      e(o.value, o)
    ),
  );
  return t;
}
function E4(e, t) {
  const o = new Kn({ check: "custom", ..._e(t) });
  return ((o._zod.check = e), o);
}
const R4 = ee("ZodISODateTime", (e, t) => {
  (c9.init(e, t), We.init(e, t));
});
function T4(e) {
  return s4(R4, e);
}
const C4 = ee("ZodISODate", (e, t) => {
  (f9.init(e, t), We.init(e, t));
});
function O4(e) {
  return l4(C4, e);
}
const A4 = ee("ZodISOTime", (e, t) => {
  (d9.init(e, t), We.init(e, t));
});
function M4(e) {
  return u4(A4, e);
}
const D4 = ee("ZodISODuration", (e, t) => {
  (h9.init(e, t), We.init(e, t));
});
function z4(e) {
  return c4(D4, e);
}
const P4 = (e, t) => {
    (r1.init(e, t),
      (e.name = "ZodError"),
      Object.defineProperties(e, {
        format: { value: (o) => sM(e, o) },
        flatten: { value: (o) => iM(e, o) },
        addIssue: {
          value: (o) => {
            (e.issues.push(o), (e.message = JSON.stringify(e.issues, Ch, 2)));
          },
        },
        addIssues: {
          value: (o) => {
            (e.issues.push(...o),
              (e.message = JSON.stringify(e.issues, Ch, 2)));
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      }));
  },
  _n = ee("ZodError", P4, { Parent: Error }),
  j4 = fp(_n),
  N4 = dp(_n),
  k4 = rc(_n),
  L4 = oc(_n),
  U4 = cM(_n),
  B4 = fM(_n),
  I4 = dM(_n),
  H4 = hM(_n),
  q4 = pM(_n),
  V4 = mM(_n),
  Z4 = yM(_n),
  $4 = vM(_n),
  It = ee(
    "ZodType",
    (e, t) => (
      jt.init(e, t),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, "_def", { value: t }),
      (e.check = (...o) =>
        e.clone(
          nM(t, {
            checks: [
              ...(t.checks ?? []),
              ...o.map((a) =>
                typeof a == "function"
                  ? {
                      _zod: {
                        check: a,
                        def: { check: "custom" },
                        onattach: [],
                      },
                    }
                  : a,
              ),
            ],
          }),
        )),
      (e.clone = (o, a) => oM(e, o, a)),
      (e.brand = () => e),
      (e.register = (o, a) => (o.add(e, a), e)),
      (e.parse = (o, a) => j4(e, o, a, { callee: e.parse })),
      (e.safeParse = (o, a) => k4(e, o, a)),
      (e.parseAsync = async (o, a) => N4(e, o, a, { callee: e.parseAsync })),
      (e.safeParseAsync = async (o, a) => L4(e, o, a)),
      (e.spa = e.safeParseAsync),
      (e.encode = (o, a) => U4(e, o, a)),
      (e.decode = (o, a) => B4(e, o, a)),
      (e.encodeAsync = async (o, a) => I4(e, o, a)),
      (e.decodeAsync = async (o, a) => H4(e, o, a)),
      (e.safeEncode = (o, a) => q4(e, o, a)),
      (e.safeDecode = (o, a) => V4(e, o, a)),
      (e.safeEncodeAsync = async (o, a) => Z4(e, o, a)),
      (e.safeDecodeAsync = async (o, a) => $4(e, o, a)),
      (e.refine = (o, a) => e.check(z3(o, a))),
      (e.superRefine = (o) => e.check(P3(o))),
      (e.overwrite = (o) => e.check(Us(o))),
      (e.optional = () => G0(e)),
      (e.nullable = () => F0(e)),
      (e.nullish = () => G0(F0(e))),
      (e.nonoptional = (o) => R3(e, o)),
      (e.array = () => f3(e)),
      (e.or = (o) => h3([e, o])),
      (e.and = (o) => m3(e, o)),
      (e.transform = (o) => Y0(e, v3(o))),
      (e.default = (o) => w3(e, o)),
      (e.prefault = (o) => x3(e, o)),
      (e.catch = (o) => C3(e, o)),
      (e.pipe = (o) => Y0(e, o)),
      (e.readonly = () => M3(e)),
      (e.describe = (o) => {
        const a = e.clone();
        return (pu.add(a, { description: o }), a);
      }),
      Object.defineProperty(e, "description", {
        get() {
          return pu.get(e)?.description;
        },
        configurable: !0,
      }),
      (e.meta = (...o) => {
        if (o.length === 0) return pu.get(e);
        const a = e.clone();
        return (pu.add(a, o[0]), a);
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      e
    ),
  ),
  d1 = ee("_ZodString", (e, t) => {
    (hp.init(e, t), It.init(e, t));
    const o = e._zod.bag;
    ((e.format = o.format ?? null),
      (e.minLength = o.minimum ?? null),
      (e.maxLength = o.maximum ?? null),
      (e.regex = (...a) => e.check(f4(...a))),
      (e.includes = (...a) => e.check(p4(...a))),
      (e.startsWith = (...a) => e.check(m4(...a))),
      (e.endsWith = (...a) => e.check(y4(...a))),
      (e.min = (...a) => e.check(Iu(...a))),
      (e.max = (...a) => e.check(c1(...a))),
      (e.length = (...a) => e.check(f1(...a))),
      (e.nonempty = (...a) => e.check(Iu(1, ...a))),
      (e.lowercase = (a) => e.check(d4(a))),
      (e.uppercase = (a) => e.check(h4(a))),
      (e.trim = () => e.check(g4())),
      (e.normalize = (...a) => e.check(v4(...a))),
      (e.toLowerCase = () => e.check(b4())),
      (e.toUpperCase = () => e.check(S4())));
  }),
  G4 = ee("ZodString", (e, t) => {
    (hp.init(e, t),
      d1.init(e, t),
      (e.email = (o) => e.check(H9(F4, o))),
      (e.url = (o) => e.check(u1(h1, o))),
      (e.jwt = (o) => e.check(i4(u3, o))),
      (e.emoji = (o) => e.check(G9(K4, o))),
      (e.guid = (o) => e.check(Z0($0, o))),
      (e.uuid = (o) => e.check(q9(mu, o))),
      (e.uuidv4 = (o) => e.check(V9(mu, o))),
      (e.uuidv6 = (o) => e.check(Z9(mu, o))),
      (e.uuidv7 = (o) => e.check($9(mu, o))),
      (e.nanoid = (o) => e.check(F9(Q4, o))),
      (e.guid = (o) => e.check(Z0($0, o))),
      (e.cuid = (o) => e.check(Y9(X4, o))),
      (e.cuid2 = (o) => e.check(K9(W4, o))),
      (e.ulid = (o) => e.check(Q9(J4, o))),
      (e.base64 = (o) => e.check(r4(i3, o))),
      (e.base64url = (o) => e.check(o4(s3, o))),
      (e.xid = (o) => e.check(X9(e3, o))),
      (e.ksuid = (o) => e.check(W9(t3, o))),
      (e.ipv4 = (o) => e.check(J9(n3, o))),
      (e.ipv6 = (o) => e.check(e4(r3, o))),
      (e.cidrv4 = (o) => e.check(t4(o3, o))),
      (e.cidrv6 = (o) => e.check(n4(a3, o))),
      (e.e164 = (o) => e.check(a4(l3, o))),
      (e.datetime = (o) => e.check(T4(o))),
      (e.date = (o) => e.check(O4(o))),
      (e.time = (o) => e.check(M4(o))),
      (e.duration = (o) => e.check(z4(o))));
  });
function Xe(e) {
  return I9(G4, e);
}
const We = ee("ZodStringFormat", (e, t) => {
    (Ke.init(e, t), d1.init(e, t));
  }),
  F4 = ee("ZodEmail", (e, t) => {
    (t9.init(e, t), We.init(e, t));
  }),
  $0 = ee("ZodGUID", (e, t) => {
    (JM.init(e, t), We.init(e, t));
  }),
  mu = ee("ZodUUID", (e, t) => {
    (e9.init(e, t), We.init(e, t));
  }),
  h1 = ee("ZodURL", (e, t) => {
    (n9.init(e, t), We.init(e, t));
  });
function Y4(e) {
  return u1(h1, e);
}
const K4 = ee("ZodEmoji", (e, t) => {
    (r9.init(e, t), We.init(e, t));
  }),
  Q4 = ee("ZodNanoID", (e, t) => {
    (o9.init(e, t), We.init(e, t));
  }),
  X4 = ee("ZodCUID", (e, t) => {
    (a9.init(e, t), We.init(e, t));
  }),
  W4 = ee("ZodCUID2", (e, t) => {
    (i9.init(e, t), We.init(e, t));
  }),
  J4 = ee("ZodULID", (e, t) => {
    (s9.init(e, t), We.init(e, t));
  }),
  e3 = ee("ZodXID", (e, t) => {
    (l9.init(e, t), We.init(e, t));
  }),
  t3 = ee("ZodKSUID", (e, t) => {
    (u9.init(e, t), We.init(e, t));
  }),
  n3 = ee("ZodIPv4", (e, t) => {
    (p9.init(e, t), We.init(e, t));
  }),
  r3 = ee("ZodIPv6", (e, t) => {
    (m9.init(e, t), We.init(e, t));
  }),
  o3 = ee("ZodCIDRv4", (e, t) => {
    (y9.init(e, t), We.init(e, t));
  }),
  a3 = ee("ZodCIDRv6", (e, t) => {
    (v9.init(e, t), We.init(e, t));
  }),
  i3 = ee("ZodBase64", (e, t) => {
    (g9.init(e, t), We.init(e, t));
  }),
  s3 = ee("ZodBase64URL", (e, t) => {
    (S9.init(e, t), We.init(e, t));
  }),
  l3 = ee("ZodE164", (e, t) => {
    (w9.init(e, t), We.init(e, t));
  }),
  u3 = ee("ZodJWT", (e, t) => {
    (x9.init(e, t), We.init(e, t));
  }),
  c3 = ee("ZodArray", (e, t) => {
    (E9.init(e, t),
      It.init(e, t),
      (e.element = t.element),
      (e.min = (o, a) => e.check(Iu(o, a))),
      (e.nonempty = (o) => e.check(Iu(1, o))),
      (e.max = (o, a) => e.check(c1(o, a))),
      (e.length = (o, a) => e.check(f1(o, a))),
      (e.unwrap = () => e.element));
  });
function f3(e, t) {
  return w4(c3, e, t);
}
const d3 = ee("ZodUnion", (e, t) => {
  (R9.init(e, t), It.init(e, t), (e.options = t.options));
});
function h3(e, t) {
  return new d3({ type: "union", options: e, ..._e(t) });
}
const p3 = ee("ZodIntersection", (e, t) => {
  (T9.init(e, t), It.init(e, t));
});
function m3(e, t) {
  return new p3({ type: "intersection", left: e, right: t });
}
const Mh = ee("ZodEnum", (e, t) => {
  (C9.init(e, t),
    It.init(e, t),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries)));
  const o = new Set(Object.keys(t.entries));
  ((e.extract = (a, s) => {
    const u = {};
    for (const c of a)
      if (o.has(c)) u[c] = t.entries[c];
      else throw new Error(`Key ${c} not found in enum`);
    return new Mh({ ...t, checks: [], ..._e(s), entries: u });
  }),
    (e.exclude = (a, s) => {
      const u = { ...t.entries };
      for (const c of a)
        if (o.has(c)) delete u[c];
        else throw new Error(`Key ${c} not found in enum`);
      return new Mh({ ...t, checks: [], ..._e(s), entries: u });
    }));
});
function ic(e, t) {
  const o = Array.isArray(e) ? Object.fromEntries(e.map((a) => [a, a])) : e;
  return new Mh({ type: "enum", entries: o, ..._e(t) });
}
const y3 = ee("ZodTransform", (e, t) => {
  (O9.init(e, t),
    It.init(e, t),
    (e._zod.parse = (o, a) => {
      if (a.direction === "backward") throw new JS(e.constructor.name);
      o.addIssue = (u) => {
        if (typeof u == "string") o.issues.push(Os(u, o.value, t));
        else {
          const c = u;
          (c.fatal && (c.continue = !1),
            c.code ?? (c.code = "custom"),
            c.input ?? (c.input = o.value),
            c.inst ?? (c.inst = e),
            o.issues.push(Os(c)));
        }
      };
      const s = t.transform(o.value, o);
      return s instanceof Promise
        ? s.then((u) => ((o.value = u), o))
        : ((o.value = s), o);
    }));
});
function v3(e) {
  return new y3({ type: "transform", transform: e });
}
const g3 = ee("ZodOptional", (e, t) => {
  (A9.init(e, t), It.init(e, t), (e.unwrap = () => e._zod.def.innerType));
});
function G0(e) {
  return new g3({ type: "optional", innerType: e });
}
const b3 = ee("ZodNullable", (e, t) => {
  (M9.init(e, t), It.init(e, t), (e.unwrap = () => e._zod.def.innerType));
});
function F0(e) {
  return new b3({ type: "nullable", innerType: e });
}
const S3 = ee("ZodDefault", (e, t) => {
  (D9.init(e, t),
    It.init(e, t),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function w3(e, t) {
  return new S3({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : t1(t);
    },
  });
}
const _3 = ee("ZodPrefault", (e, t) => {
  (z9.init(e, t), It.init(e, t), (e.unwrap = () => e._zod.def.innerType));
});
function x3(e, t) {
  return new _3({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : t1(t);
    },
  });
}
const E3 = ee("ZodNonOptional", (e, t) => {
  (P9.init(e, t), It.init(e, t), (e.unwrap = () => e._zod.def.innerType));
});
function R3(e, t) {
  return new E3({ type: "nonoptional", innerType: e, ..._e(t) });
}
const T3 = ee("ZodCatch", (e, t) => {
  (j9.init(e, t),
    It.init(e, t),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function C3(e, t) {
  return new T3({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t,
  });
}
const O3 = ee("ZodPipe", (e, t) => {
  (N9.init(e, t), It.init(e, t), (e.in = t.in), (e.out = t.out));
});
function Y0(e, t) {
  return new O3({ type: "pipe", in: e, out: t });
}
const A3 = ee("ZodReadonly", (e, t) => {
  (k9.init(e, t), It.init(e, t), (e.unwrap = () => e._zod.def.innerType));
});
function M3(e) {
  return new A3({ type: "readonly", innerType: e });
}
const D3 = ee("ZodCustom", (e, t) => {
  (L9.init(e, t), It.init(e, t));
});
function z3(e, t = {}) {
  return _4(D3, e, t);
}
function P3(e) {
  return x4(e);
}
var j3 = {};
const N3 = () =>
  sp({
    server: {
      VERCEL: Xe().optional(),
      CI: Xe().optional(),
      VERCEL_ENV: ic(["development", "preview", "production"]).optional(),
      VERCEL_URL: Xe().optional(),
      VERCEL_PROJECT_PRODUCTION_URL: Xe().optional(),
      VERCEL_BRANCH_URL: Xe().optional(),
      VERCEL_REGION: Xe().optional(),
      VERCEL_DEPLOYMENT_ID: Xe().optional(),
      VERCEL_SKEW_PROTECTION_ENABLED: Xe().optional(),
      VERCEL_AUTOMATION_BYPASS_SECRET: Xe().optional(),
      VERCEL_GIT_PROVIDER: Xe().optional(),
      VERCEL_GIT_REPO_SLUG: Xe().optional(),
      VERCEL_GIT_REPO_OWNER: Xe().optional(),
      VERCEL_GIT_REPO_ID: Xe().optional(),
      VERCEL_GIT_COMMIT_REF: Xe().optional(),
      VERCEL_GIT_COMMIT_SHA: Xe().optional(),
      VERCEL_GIT_COMMIT_MESSAGE: Xe().optional(),
      VERCEL_GIT_COMMIT_AUTHOR_LOGIN: Xe().optional(),
      VERCEL_GIT_COMMIT_AUTHOR_NAME: Xe().optional(),
      VERCEL_GIT_PREVIOUS_SHA: Xe().optional(),
      VERCEL_GIT_PULL_REQUEST_ID: Xe().optional(),
    },
    runtimeEnv: j3,
  });
var $d = {};
function k3() {
  return sp({
    server: {
      AUTH_SECRET: Xe().min(1),
      NODE_ENV: ic(["development", "production"]).optional(),
      RESEND_API_KEY: Xe().optional(),
      EMAIL_FROM: Xe().optional(),
    },
    runtimeEnv: $d,
    skipValidation: !!$d.CI || $d.npm_lifecycle_event === "lint",
  });
}
var Gd = {};
const ps = sp({
  clientPrefix: "VITE_",
  extends: [k3(), N3()],
  shared: {
    NODE_ENV: ic(["development", "production", "test"]).default("development"),
  },
  server: { POSTGRES_URL: Y4() },
  client: {},
  runtimeEnv: Gd,
  skipValidation: !!Gd.CI || Gd.npm_lifecycle_event === "lint",
});
var L3 = {};
function U3() {
  return typeof window < "u"
    ? window.location.origin
    : ps.VERCEL_ENV === "production"
      ? `https://${ps.VERCEL_PROJECT_PRODUCTION_URL}`
      : ps.VERCEL_ENV === "preview"
        ? `https://${ps.VERCEL_URL}`
        : `http://localhost:${L3.PORT ?? 3001}`;
}
const B3 = () =>
    QO({
      links: [
        IO({
          enabled: (e) =>
            ps.NODE_ENV === "development" ||
            (e.direction === "down" && e.result instanceof Error),
        }),
        WO({
          transformer: Ae,
          url: U3() + "/api/trpc",
          headers() {
            const e = new Headers();
            return (e.set("x-trpc-source", "tanstack-start-client"), e);
          },
        }),
      ],
    }),
  { useTRPC: ej, TRPCProvider: I3 } = xA(),
  H3 = "modulepreload",
  q3 = function (e) {
    return "/" + e;
  },
  K0 = {},
  V3 = function (t, o, a) {
    let s = Promise.resolve();
    if (o && o.length > 0) {
      let h = function (p) {
        return Promise.all(
          p.map((v) =>
            Promise.resolve(v).then(
              (y) => ({ status: "fulfilled", value: y }),
              (y) => ({ status: "rejected", reason: y }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"),
        f = c?.nonce || c?.getAttribute("nonce");
      s = h(
        o.map((p) => {
          if (((p = q3(p)), p in K0)) return;
          K0[p] = !0;
          const v = p.endsWith(".css"),
            y = v ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${p}"]${y}`)) return;
          const g = document.createElement("link");
          if (
            ((g.rel = v ? "stylesheet" : H3),
            v || (g.as = "script"),
            (g.crossOrigin = ""),
            (g.href = p),
            f && g.setAttribute("nonce", f),
            document.head.appendChild(g),
            v)
          )
            return new Promise((S, w) => {
              (g.addEventListener("load", S),
                g.addEventListener("error", () =>
                  w(new Error(`Unable to preload CSS for ${p}`)),
                ));
            });
        }),
      );
    }
    function u(c) {
      const f = new Event("vite:preloadError", { cancelable: !0 });
      if (((f.payload = c), window.dispatchEvent(f), !f.defaultPrevented))
        throw c;
    }
    return s.then((c) => {
      for (const f of c || []) f.status === "rejected" && u(f.reason);
      return t().catch(u);
    });
  },
  Z3 = function () {
    return null;
  };
function pp(e, t) {
  if (e == null) return {};
  var o = {},
    a = Object.keys(e),
    s,
    u;
  for (u = 0; u < a.length; u++)
    ((s = a[u]), !(t.indexOf(s) >= 0) && (o[s] = e[s]));
  return o;
}
var $3 = ["color"],
  G3 = E.forwardRef(function (e, t) {
    var o = e.color,
      a = o === void 0 ? "currentColor" : o,
      s = pp(e, $3);
    return E.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        s,
        { ref: t },
      ),
      E.createElement("path", {
        d: "M1 3.25C1 3.11193 1.11193 3 1.25 3H13.75C13.8881 3 14 3.11193 14 3.25V10.75C14 10.8881 13.8881 11 13.75 11H1.25C1.11193 11 1 10.8881 1 10.75V3.25ZM1.25 2C0.559643 2 0 2.55964 0 3.25V10.75C0 11.4404 0.559644 12 1.25 12H5.07341L4.82991 13.2986C4.76645 13.6371 5.02612 13.95 5.37049 13.95H9.62951C9.97389 13.95 10.2336 13.6371 10.1701 13.2986L9.92659 12H13.75C14.4404 12 15 11.4404 15 10.75V3.25C15 2.55964 14.4404 2 13.75 2H1.25ZM9.01091 12H5.98909L5.79222 13.05H9.20778L9.01091 12Z",
        fill: a,
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    );
  }),
  F3 = ["color"],
  Y3 = E.forwardRef(function (e, t) {
    var o = e.color,
      a = o === void 0 ? "currentColor" : o,
      s = pp(e, F3);
    return E.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        s,
        { ref: t },
      ),
      E.createElement("path", {
        d: "M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z",
        fill: a,
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    );
  }),
  K3 = ["color"],
  Q3 = E.forwardRef(function (e, t) {
    var o = e.color,
      a = o === void 0 ? "currentColor" : o,
      s = pp(e, K3);
    return E.createElement(
      "svg",
      Object.assign(
        {
          width: "15",
          height: "15",
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        s,
        { ref: t },
      ),
      E.createElement("path", {
        d: "M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z",
        fill: a,
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    );
  });
function p1(e) {
  var t,
    o,
    a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++)
        e[t] && (o = p1(e[t])) && (a && (a += " "), (a += o));
    } else for (o in e) e[o] && (a && (a += " "), (a += o));
  return a;
}
function X3() {
  for (var e, t, o = 0, a = "", s = arguments.length; o < s; o++)
    (e = arguments[o]) && (t = p1(e)) && (a && (a += " "), (a += t));
  return a;
}
const Q0 = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  Dh = X3,
  W3 = (e, t) => (o) => {
    var a;
    if (t?.variants == null) return Dh(e, o?.class, o?.className);
    const { variants: s, defaultVariants: u } = t,
      c = Object.keys(s).map((p) => {
        const v = o?.[p],
          y = u?.[p];
        if (v === null) return null;
        const g = Q0(v) || Q0(y);
        return s[p][g];
      }),
      f =
        o &&
        Object.entries(o).reduce((p, v) => {
          let [y, g] = v;
          return (g === void 0 || (p[y] = g), p);
        }, {}),
      h =
        t == null || (a = t.compoundVariants) === null || a === void 0
          ? void 0
          : a.reduce((p, v) => {
              let { class: y, className: g, ...S } = v;
              return Object.entries(S).every((w) => {
                let [_, T] = w;
                return Array.isArray(T)
                  ? T.includes({ ...u, ...f }[_])
                  : { ...u, ...f }[_] === T;
              })
                ? [...p, y, g]
                : p;
            }, []);
    return Dh(e, c, h, o?.class, o?.className);
  };
function X0(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function sc(...e) {
  return (t) => {
    let o = !1;
    const a = e.map((s) => {
      const u = X0(s, t);
      return (!o && typeof u == "function" && (o = !0), u);
    });
    if (o)
      return () => {
        for (let s = 0; s < a.length; s++) {
          const u = a[s];
          typeof u == "function" ? u() : X0(e[s], null);
        }
      };
  };
}
function Kt(...e) {
  return E.useCallback(sc(...e), e);
}
function As(e) {
  const t = eD(e),
    o = E.forwardRef((a, s) => {
      const { children: u, ...c } = a,
        f = E.Children.toArray(u),
        h = f.find(nD);
      if (h) {
        const p = h.props.children,
          v = f.map((y) =>
            y === h
              ? E.Children.count(p) > 1
                ? E.Children.only(null)
                : E.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return D.jsx(t, {
          ...c,
          ref: s,
          children: E.isValidElement(p) ? E.cloneElement(p, void 0, v) : null,
        });
      }
      return D.jsx(t, { ...c, ref: s, children: u });
    });
  return ((o.displayName = `${e}.Slot`), o);
}
var J3 = As("Slot");
function eD(e) {
  const t = E.forwardRef((o, a) => {
    const { children: s, ...u } = o;
    if (E.isValidElement(s)) {
      const c = oD(s),
        f = rD(u, s.props);
      return (
        s.type !== E.Fragment && (f.ref = a ? sc(a, c) : c),
        E.cloneElement(s, f)
      );
    }
    return E.Children.count(s) > 1 ? E.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var tD = Symbol("radix.slottable");
function nD(e) {
  return (
    E.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === tD
  );
}
function rD(e, t) {
  const o = { ...t };
  for (const a in t) {
    const s = e[a],
      u = t[a];
    /^on[A-Z]/.test(a)
      ? s && u
        ? (o[a] = (...f) => {
            const h = u(...f);
            return (s(...f), h);
          })
        : s && (o[a] = s)
      : a === "style"
        ? (o[a] = { ...s, ...u })
        : a === "className" && (o[a] = [s, u].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function oD(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    o = t && "isReactWarning" in t && t.isReactWarning;
  return o
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (o = t && "isReactWarning" in t && t.isReactWarning),
      o ? e.props.ref : e.props.ref || e.ref);
}
var aD = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ht = aD.reduce((e, t) => {
    const o = As(`Primitive.${t}`),
      a = E.forwardRef((s, u) => {
        const { asChild: c, ...f } = s,
          h = c ? o : t;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          D.jsx(h, { ...f, ref: u })
        );
      });
    return ((a.displayName = `Primitive.${t}`), { ...e, [t]: a });
  }, {});
function m1(e, t) {
  e && Xu.flushSync(() => e.dispatchEvent(t));
}
function Bs(e, t = []) {
  let o = [];
  function a(u, c) {
    const f = E.createContext(c),
      h = o.length;
    o = [...o, c];
    const p = (y) => {
      const { scope: g, children: S, ...w } = y,
        _ = g?.[e]?.[h] || f,
        T = E.useMemo(() => w, Object.values(w));
      return D.jsx(_.Provider, { value: T, children: S });
    };
    p.displayName = u + "Provider";
    function v(y, g) {
      const S = g?.[e]?.[h] || f,
        w = E.useContext(S);
      if (w) return w;
      if (c !== void 0) return c;
      throw new Error(`\`${y}\` must be used within \`${u}\``);
    }
    return [p, v];
  }
  const s = () => {
    const u = o.map((c) => E.createContext(c));
    return function (f) {
      const h = f?.[e] || u;
      return E.useMemo(() => ({ [`__scope${e}`]: { ...f, [e]: h } }), [f, h]);
    };
  };
  return ((s.scopeName = e), [a, iD(s, ...t)]);
}
function iD(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const o = () => {
    const a = e.map((s) => ({ useScope: s(), scopeName: s.scopeName }));
    return function (u) {
      const c = a.reduce((f, { useScope: h, scopeName: p }) => {
        const y = h(u)[`__scope${p}`];
        return { ...f, ...y };
      }, {});
      return E.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    };
  };
  return ((o.scopeName = t.scopeName), o);
}
function y1(e) {
  const t = e + "CollectionProvider",
    [o, a] = Bs(t),
    [s, u] = o(t, { collectionRef: { current: null }, itemMap: new Map() }),
    c = (_) => {
      const { scope: T, children: A } = _,
        N = te.useRef(null),
        P = te.useRef(new Map()).current;
      return D.jsx(s, { scope: T, itemMap: P, collectionRef: N, children: A });
    };
  c.displayName = t;
  const f = e + "CollectionSlot",
    h = As(f),
    p = te.forwardRef((_, T) => {
      const { scope: A, children: N } = _,
        P = u(f, A),
        k = Kt(T, P.collectionRef);
      return D.jsx(h, { ref: k, children: N });
    });
  p.displayName = f;
  const v = e + "CollectionItemSlot",
    y = "data-radix-collection-item",
    g = As(v),
    S = te.forwardRef((_, T) => {
      const { scope: A, children: N, ...P } = _,
        k = te.useRef(null),
        H = Kt(T, k),
        F = u(v, A);
      return (
        te.useEffect(
          () => (
            F.itemMap.set(k, { ref: k, ...P }),
            () => void F.itemMap.delete(k)
          ),
        ),
        D.jsx(g, { [y]: "", ref: H, children: N })
      );
    });
  S.displayName = v;
  function w(_) {
    const T = u(e + "CollectionConsumer", _);
    return te.useCallback(() => {
      const N = T.collectionRef.current;
      if (!N) return [];
      const P = Array.from(N.querySelectorAll(`[${y}]`));
      return Array.from(T.itemMap.values()).sort(
        (F, Z) => P.indexOf(F.ref.current) - P.indexOf(Z.ref.current),
      );
    }, [T.collectionRef, T.itemMap]);
  }
  return [{ Provider: c, Slot: p, ItemSlot: S }, w, a];
}
function ze(e, t, { checkForDefaultPrevented: o = !0 } = {}) {
  return function (s) {
    if ((e?.(s), o === !1 || !s.defaultPrevented)) return t?.(s);
  };
}
var no = globalThis?.document ? E.useLayoutEffect : () => {},
  sD = Mb[" useInsertionEffect ".trim().toString()] || no;
function v1({ prop: e, defaultProp: t, onChange: o = () => {}, caller: a }) {
  const [s, u, c] = lD({ defaultProp: t, onChange: o }),
    f = e !== void 0,
    h = f ? e : s;
  {
    const v = E.useRef(e !== void 0);
    E.useEffect(() => {
      const y = v.current;
      (y !== f &&
        console.warn(
          `${a} is changing from ${y ? "controlled" : "uncontrolled"} to ${f ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (v.current = f));
    }, [f, a]);
  }
  const p = E.useCallback(
    (v) => {
      if (f) {
        const y = uD(v) ? v(e) : v;
        y !== e && c.current?.(y);
      } else u(v);
    },
    [f, e, u, c],
  );
  return [h, p];
}
function lD({ defaultProp: e, onChange: t }) {
  const [o, a] = E.useState(e),
    s = E.useRef(o),
    u = E.useRef(t);
  return (
    sD(() => {
      u.current = t;
    }, [t]),
    E.useEffect(() => {
      s.current !== o && (u.current?.(o), (s.current = o));
    }, [o, s]),
    [o, a, u]
  );
}
function uD(e) {
  return typeof e == "function";
}
function cD(e, t) {
  return E.useReducer((o, a) => t[o][a] ?? o, e);
}
var Is = (e) => {
  const { present: t, children: o } = e,
    a = fD(t),
    s =
      typeof o == "function" ? o({ present: a.isPresent }) : E.Children.only(o),
    u = Kt(a.ref, dD(s));
  return typeof o == "function" || a.isPresent
    ? E.cloneElement(s, { ref: u })
    : null;
};
Is.displayName = "Presence";
function fD(e) {
  const [t, o] = E.useState(),
    a = E.useRef(null),
    s = E.useRef(e),
    u = E.useRef("none"),
    c = e ? "mounted" : "unmounted",
    [f, h] = cD(c, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    E.useEffect(() => {
      const p = yu(a.current);
      u.current = f === "mounted" ? p : "none";
    }, [f]),
    no(() => {
      const p = a.current,
        v = s.current;
      if (v !== e) {
        const g = u.current,
          S = yu(p);
        (e
          ? h("MOUNT")
          : S === "none" || p?.display === "none"
            ? h("UNMOUNT")
            : h(v && g !== S ? "ANIMATION_OUT" : "UNMOUNT"),
          (s.current = e));
      }
    }, [e, h]),
    no(() => {
      if (t) {
        let p;
        const v = t.ownerDocument.defaultView ?? window,
          y = (S) => {
            const _ = yu(a.current).includes(CSS.escape(S.animationName));
            if (S.target === t && _ && (h("ANIMATION_END"), !s.current)) {
              const T = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (p = v.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = T);
                })));
            }
          },
          g = (S) => {
            S.target === t && (u.current = yu(a.current));
          };
        return (
          t.addEventListener("animationstart", g),
          t.addEventListener("animationcancel", y),
          t.addEventListener("animationend", y),
          () => {
            (v.clearTimeout(p),
              t.removeEventListener("animationstart", g),
              t.removeEventListener("animationcancel", y),
              t.removeEventListener("animationend", y));
          }
        );
      } else h("ANIMATION_END");
    }, [t, h]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(f),
      ref: E.useCallback((p) => {
        ((a.current = p ? getComputedStyle(p) : null), o(p));
      }, []),
    }
  );
}
function yu(e) {
  return e?.animationName || "none";
}
function dD(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    o = t && "isReactWarning" in t && t.isReactWarning;
  return o
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (o = t && "isReactWarning" in t && t.isReactWarning),
      o ? e.props.ref : e.props.ref || e.ref);
}
var hD = Mb[" useId ".trim().toString()] || (() => {}),
  pD = 0;
function zh(e) {
  const [t, o] = E.useState(hD());
  return (
    no(() => {
      o((a) => a ?? String(pD++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
var mD = E.createContext(void 0);
function g1(e) {
  const t = E.useContext(mD);
  return e || t || "ltr";
}
function Sr(e) {
  const t = E.useRef(e);
  return (
    E.useEffect(() => {
      t.current = e;
    }),
    E.useMemo(
      () =>
        (...o) =>
          t.current?.(...o),
      [],
    )
  );
}
function yD(e, t = globalThis?.document) {
  const o = Sr(e);
  E.useEffect(() => {
    const a = (s) => {
      s.key === "Escape" && o(s);
    };
    return (
      t.addEventListener("keydown", a, { capture: !0 }),
      () => t.removeEventListener("keydown", a, { capture: !0 })
    );
  }, [o, t]);
}
var vD = "DismissableLayer",
  Ph = "dismissableLayer.update",
  gD = "dismissableLayer.pointerDownOutside",
  bD = "dismissableLayer.focusOutside",
  W0,
  b1 = E.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  S1 = E.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: o = !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: u,
        onInteractOutside: c,
        onDismiss: f,
        ...h
      } = e,
      p = E.useContext(b1),
      [v, y] = E.useState(null),
      g = v?.ownerDocument ?? globalThis?.document,
      [, S] = E.useState({}),
      w = Kt(t, (Z) => y(Z)),
      _ = Array.from(p.layers),
      [T] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1),
      A = _.indexOf(T),
      N = v ? _.indexOf(v) : -1,
      P = p.layersWithOutsidePointerEventsDisabled.size > 0,
      k = N >= A,
      H = _D((Z) => {
        const B = Z.target,
          re = [...p.branches].some((ae) => ae.contains(B));
        !k || re || (s?.(Z), c?.(Z), Z.defaultPrevented || f?.());
      }, g),
      F = xD((Z) => {
        const B = Z.target;
        [...p.branches].some((ae) => ae.contains(B)) ||
          (u?.(Z), c?.(Z), Z.defaultPrevented || f?.());
      }, g);
    return (
      yD((Z) => {
        N === p.layers.size - 1 &&
          (a?.(Z), !Z.defaultPrevented && f && (Z.preventDefault(), f()));
      }, g),
      E.useEffect(() => {
        if (v)
          return (
            o &&
              (p.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((W0 = g.body.style.pointerEvents),
                (g.body.style.pointerEvents = "none")),
              p.layersWithOutsidePointerEventsDisabled.add(v)),
            p.layers.add(v),
            J0(),
            () => {
              o &&
                p.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (g.body.style.pointerEvents = W0);
            }
          );
      }, [v, g, o, p]),
      E.useEffect(
        () => () => {
          v &&
            (p.layers.delete(v),
            p.layersWithOutsidePointerEventsDisabled.delete(v),
            J0());
        },
        [v, p],
      ),
      E.useEffect(() => {
        const Z = () => S({});
        return (
          document.addEventListener(Ph, Z),
          () => document.removeEventListener(Ph, Z)
        );
      }, []),
      D.jsx(Ht.div, {
        ...h,
        ref: w,
        style: {
          pointerEvents: P ? (k ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: ze(e.onFocusCapture, F.onFocusCapture),
        onBlurCapture: ze(e.onBlurCapture, F.onBlurCapture),
        onPointerDownCapture: ze(
          e.onPointerDownCapture,
          H.onPointerDownCapture,
        ),
      })
    );
  });
S1.displayName = vD;
var SD = "DismissableLayerBranch",
  wD = E.forwardRef((e, t) => {
    const o = E.useContext(b1),
      a = E.useRef(null),
      s = Kt(t, a);
    return (
      E.useEffect(() => {
        const u = a.current;
        if (u)
          return (
            o.branches.add(u),
            () => {
              o.branches.delete(u);
            }
          );
      }, [o.branches]),
      D.jsx(Ht.div, { ...e, ref: s })
    );
  });
wD.displayName = SD;
function _D(e, t = globalThis?.document) {
  const o = Sr(e),
    a = E.useRef(!1),
    s = E.useRef(() => {});
  return (
    E.useEffect(() => {
      const u = (f) => {
          if (f.target && !a.current) {
            let h = function () {
              w1(gD, o, p, { discrete: !0 });
            };
            const p = { originalEvent: f };
            f.pointerType === "touch"
              ? (t.removeEventListener("click", s.current),
                (s.current = h),
                t.addEventListener("click", s.current, { once: !0 }))
              : h();
          } else t.removeEventListener("click", s.current);
          a.current = !1;
        },
        c = window.setTimeout(() => {
          t.addEventListener("pointerdown", u);
        }, 0);
      return () => {
        (window.clearTimeout(c),
          t.removeEventListener("pointerdown", u),
          t.removeEventListener("click", s.current));
      };
    }, [t, o]),
    { onPointerDownCapture: () => (a.current = !0) }
  );
}
function xD(e, t = globalThis?.document) {
  const o = Sr(e),
    a = E.useRef(!1);
  return (
    E.useEffect(() => {
      const s = (u) => {
        u.target &&
          !a.current &&
          w1(bD, o, { originalEvent: u }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", s),
        () => t.removeEventListener("focusin", s)
      );
    }, [t, o]),
    {
      onFocusCapture: () => (a.current = !0),
      onBlurCapture: () => (a.current = !1),
    }
  );
}
function J0() {
  const e = new CustomEvent(Ph);
  document.dispatchEvent(e);
}
function w1(e, t, o, { discrete: a }) {
  const s = o.originalEvent.target,
    u = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: o });
  (t && s.addEventListener(e, t, { once: !0 }),
    a ? m1(s, u) : s.dispatchEvent(u));
}
var Fd = "focusScope.autoFocusOnMount",
  Yd = "focusScope.autoFocusOnUnmount",
  eb = { bubbles: !1, cancelable: !0 },
  ED = "FocusScope",
  _1 = E.forwardRef((e, t) => {
    const {
        loop: o = !1,
        trapped: a = !1,
        onMountAutoFocus: s,
        onUnmountAutoFocus: u,
        ...c
      } = e,
      [f, h] = E.useState(null),
      p = Sr(s),
      v = Sr(u),
      y = E.useRef(null),
      g = Kt(t, (_) => h(_)),
      S = E.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (E.useEffect(() => {
      if (a) {
        let _ = function (P) {
            if (S.paused || !f) return;
            const k = P.target;
            f.contains(k) ? (y.current = k) : Kr(y.current, { select: !0 });
          },
          T = function (P) {
            if (S.paused || !f) return;
            const k = P.relatedTarget;
            k !== null && (f.contains(k) || Kr(y.current, { select: !0 }));
          },
          A = function (P) {
            if (document.activeElement === document.body)
              for (const H of P) H.removedNodes.length > 0 && Kr(f);
          };
        (document.addEventListener("focusin", _),
          document.addEventListener("focusout", T));
        const N = new MutationObserver(A);
        return (
          f && N.observe(f, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", _),
              document.removeEventListener("focusout", T),
              N.disconnect());
          }
        );
      }
    }, [a, f, S.paused]),
      E.useEffect(() => {
        if (f) {
          nb.add(S);
          const _ = document.activeElement;
          if (!f.contains(_)) {
            const A = new CustomEvent(Fd, eb);
            (f.addEventListener(Fd, p),
              f.dispatchEvent(A),
              A.defaultPrevented ||
                (RD(MD(x1(f)), { select: !0 }),
                document.activeElement === _ && Kr(f)));
          }
          return () => {
            (f.removeEventListener(Fd, p),
              setTimeout(() => {
                const A = new CustomEvent(Yd, eb);
                (f.addEventListener(Yd, v),
                  f.dispatchEvent(A),
                  A.defaultPrevented || Kr(_ ?? document.body, { select: !0 }),
                  f.removeEventListener(Yd, v),
                  nb.remove(S));
              }, 0));
          };
        }
      }, [f, p, v, S]));
    const w = E.useCallback(
      (_) => {
        if ((!o && !a) || S.paused) return;
        const T = _.key === "Tab" && !_.altKey && !_.ctrlKey && !_.metaKey,
          A = document.activeElement;
        if (T && A) {
          const N = _.currentTarget,
            [P, k] = TD(N);
          P && k
            ? !_.shiftKey && A === k
              ? (_.preventDefault(), o && Kr(P, { select: !0 }))
              : _.shiftKey &&
                A === P &&
                (_.preventDefault(), o && Kr(k, { select: !0 }))
            : A === N && _.preventDefault();
        }
      },
      [o, a, S.paused],
    );
    return D.jsx(Ht.div, { tabIndex: -1, ...c, ref: g, onKeyDown: w });
  });
_1.displayName = ED;
function RD(e, { select: t = !1 } = {}) {
  const o = document.activeElement;
  for (const a of e)
    if ((Kr(a, { select: t }), document.activeElement !== o)) return;
}
function TD(e) {
  const t = x1(e),
    o = tb(t, e),
    a = tb(t.reverse(), e);
  return [o, a];
}
function x1(e) {
  const t = [],
    o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (a) => {
        const s = a.tagName === "INPUT" && a.type === "hidden";
        return a.disabled || a.hidden || s
          ? NodeFilter.FILTER_SKIP
          : a.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; o.nextNode(); ) t.push(o.currentNode);
  return t;
}
function tb(e, t) {
  for (const o of e) if (!CD(o, { upTo: t })) return o;
}
function CD(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function OD(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Kr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const o = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== o && OD(e) && t && e.select());
  }
}
var nb = AD();
function AD() {
  let e = [];
  return {
    add(t) {
      const o = e[0];
      (t !== o && o?.pause(), (e = rb(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = rb(e, t)), e[0]?.resume());
    },
  };
}
function rb(e, t) {
  const o = [...e],
    a = o.indexOf(t);
  return (a !== -1 && o.splice(a, 1), o);
}
function MD(e) {
  return e.filter((t) => t.tagName !== "A");
}
var DD = "Portal",
  E1 = E.forwardRef((e, t) => {
    const { container: o, ...a } = e,
      [s, u] = E.useState(!1);
    no(() => u(!0), []);
    const c = o || (s && globalThis?.document?.body);
    return c ? tS.createPortal(D.jsx(Ht.div, { ...a, ref: t }), c) : null;
  });
E1.displayName = DD;
var Kd = 0;
function zD() {
  E.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? ob()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? ob()),
      Kd++,
      () => {
        (Kd === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          Kd--);
      }
    );
  }, []);
}
function ob() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var qn = function () {
  return (
    (qn =
      Object.assign ||
      function (t) {
        for (var o, a = 1, s = arguments.length; a < s; a++) {
          o = arguments[a];
          for (var u in o)
            Object.prototype.hasOwnProperty.call(o, u) && (t[u] = o[u]);
        }
        return t;
      }),
    qn.apply(this, arguments)
  );
};
function R1(e, t) {
  var o = {};
  for (var a in e)
    Object.prototype.hasOwnProperty.call(e, a) &&
      t.indexOf(a) < 0 &&
      (o[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, a = Object.getOwnPropertySymbols(e); s < a.length; s++)
      t.indexOf(a[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, a[s]) &&
        (o[a[s]] = e[a[s]]);
  return o;
}
function PD(e, t, o) {
  if (o || arguments.length === 2)
    for (var a = 0, s = t.length, u; a < s; a++)
      (u || !(a in t)) &&
        (u || (u = Array.prototype.slice.call(t, 0, a)), (u[a] = t[a]));
  return e.concat(u || Array.prototype.slice.call(t));
}
var Mu = "right-scroll-bar-position",
  Du = "width-before-scroll-bar",
  jD = "with-scroll-bars-hidden",
  ND = "--removed-body-scroll-bar-size";
function Qd(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function kD(e, t) {
  var o = E.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return o.value;
        },
        set current(a) {
          var s = o.value;
          s !== a && ((o.value = a), o.callback(a, s));
        },
      },
    };
  })[0];
  return ((o.callback = t), o.facade);
}
var LD = typeof window < "u" ? E.useLayoutEffect : E.useEffect,
  ab = new WeakMap();
function UD(e, t) {
  var o = kD(null, function (a) {
    return e.forEach(function (s) {
      return Qd(s, a);
    });
  });
  return (
    LD(
      function () {
        var a = ab.get(o);
        if (a) {
          var s = new Set(a),
            u = new Set(e),
            c = o.current;
          (s.forEach(function (f) {
            u.has(f) || Qd(f, null);
          }),
            u.forEach(function (f) {
              s.has(f) || Qd(f, c);
            }));
        }
        ab.set(o, e);
      },
      [e],
    ),
    o
  );
}
function BD(e) {
  return e;
}
function ID(e, t) {
  t === void 0 && (t = BD);
  var o = [],
    a = !1,
    s = {
      read: function () {
        if (a)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return o.length ? o[o.length - 1] : e;
      },
      useMedium: function (u) {
        var c = t(u, a);
        return (
          o.push(c),
          function () {
            o = o.filter(function (f) {
              return f !== c;
            });
          }
        );
      },
      assignSyncMedium: function (u) {
        for (a = !0; o.length; ) {
          var c = o;
          ((o = []), c.forEach(u));
        }
        o = {
          push: function (f) {
            return u(f);
          },
          filter: function () {
            return o;
          },
        };
      },
      assignMedium: function (u) {
        a = !0;
        var c = [];
        if (o.length) {
          var f = o;
          ((o = []), f.forEach(u), (c = o));
        }
        var h = function () {
            var v = c;
            ((c = []), v.forEach(u));
          },
          p = function () {
            return Promise.resolve().then(h);
          };
        (p(),
          (o = {
            push: function (v) {
              (c.push(v), p());
            },
            filter: function (v) {
              return ((c = c.filter(v)), o);
            },
          }));
      },
    };
  return s;
}
function HD(e) {
  e === void 0 && (e = {});
  var t = ID(null);
  return ((t.options = qn({ async: !0, ssr: !1 }, e)), t);
}
var T1 = function (e) {
  var t = e.sideCar,
    o = R1(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var a = t.read();
  if (!a) throw new Error("Sidecar medium not found");
  return E.createElement(a, qn({}, o));
};
T1.isSideCarExport = !0;
function qD(e, t) {
  return (e.useMedium(t), T1);
}
var C1 = HD(),
  Xd = function () {},
  lc = E.forwardRef(function (e, t) {
    var o = E.useRef(null),
      a = E.useState({
        onScrollCapture: Xd,
        onWheelCapture: Xd,
        onTouchMoveCapture: Xd,
      }),
      s = a[0],
      u = a[1],
      c = e.forwardProps,
      f = e.children,
      h = e.className,
      p = e.removeScrollBar,
      v = e.enabled,
      y = e.shards,
      g = e.sideCar,
      S = e.noRelative,
      w = e.noIsolation,
      _ = e.inert,
      T = e.allowPinchZoom,
      A = e.as,
      N = A === void 0 ? "div" : A,
      P = e.gapMode,
      k = R1(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      H = g,
      F = UD([o, t]),
      Z = qn(qn({}, k), s);
    return E.createElement(
      E.Fragment,
      null,
      v &&
        E.createElement(H, {
          sideCar: C1,
          removeScrollBar: p,
          shards: y,
          noRelative: S,
          noIsolation: w,
          inert: _,
          setCallbacks: u,
          allowPinchZoom: !!T,
          lockRef: o,
          gapMode: P,
        }),
      c
        ? E.cloneElement(E.Children.only(f), qn(qn({}, Z), { ref: F }))
        : E.createElement(N, qn({}, Z, { className: h, ref: F }), f),
    );
  });
lc.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
lc.classNames = { fullWidth: Du, zeroRight: Mu };
var VD = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function ZD() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = VD();
  return (t && e.setAttribute("nonce", t), e);
}
function $D(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function GD(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var FD = function () {
    var e = 0,
      t = null;
    return {
      add: function (o) {
        (e == 0 && (t = ZD()) && ($D(t, o), GD(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  YD = function () {
    var e = FD();
    return function (t, o) {
      E.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && o],
      );
    };
  },
  O1 = function () {
    var e = YD(),
      t = function (o) {
        var a = o.styles,
          s = o.dynamic;
        return (e(a, s), null);
      };
    return t;
  },
  KD = { left: 0, top: 0, right: 0, gap: 0 },
  Wd = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  QD = function (e) {
    var t = window.getComputedStyle(document.body),
      o = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      a = t[e === "padding" ? "paddingTop" : "marginTop"],
      s = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [Wd(o), Wd(a), Wd(s)];
  },
  XD = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return KD;
    var t = QD(e),
      o = document.documentElement.clientWidth,
      a = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, a - o + t[2] - t[0]),
    };
  },
  WD = O1(),
  Ka = "data-scroll-locked",
  JD = function (e, t, o, a) {
    var s = e.left,
      u = e.top,
      c = e.right,
      f = e.gap;
    return (
      o === void 0 && (o = "margin"),
      `
  .`
        .concat(
          jD,
          ` {
   overflow: hidden `,
        )
        .concat(
          a,
          `;
   padding-right: `,
        )
        .concat(f, "px ")
        .concat(
          a,
          `;
  }
  body[`,
        )
        .concat(
          Ka,
          `] {
    overflow: hidden `,
        )
        .concat(
          a,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(a, ";"),
            o === "margin" &&
              `
    padding-left: `
                .concat(
                  s,
                  `px;
    padding-top: `,
                )
                .concat(
                  u,
                  `px;
    padding-right: `,
                )
                .concat(
                  c,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(f, "px ")
                .concat(
                  a,
                  `;
    `,
                ),
            o === "padding" &&
              "padding-right: ".concat(f, "px ").concat(a, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          Mu,
          ` {
    right: `,
        )
        .concat(f, "px ")
        .concat(
          a,
          `;
  }
  
  .`,
        )
        .concat(
          Du,
          ` {
    margin-right: `,
        )
        .concat(f, "px ")
        .concat(
          a,
          `;
  }
  
  .`,
        )
        .concat(Mu, " .")
        .concat(
          Mu,
          ` {
    right: 0 `,
        )
        .concat(
          a,
          `;
  }
  
  .`,
        )
        .concat(Du, " .")
        .concat(
          Du,
          ` {
    margin-right: 0 `,
        )
        .concat(
          a,
          `;
  }
  
  body[`,
        )
        .concat(
          Ka,
          `] {
    `,
        )
        .concat(ND, ": ")
        .concat(
          f,
          `px;
  }
`,
        )
    );
  },
  ib = function () {
    var e = parseInt(document.body.getAttribute(Ka) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  ez = function () {
    E.useEffect(function () {
      return (
        document.body.setAttribute(Ka, (ib() + 1).toString()),
        function () {
          var e = ib() - 1;
          e <= 0
            ? document.body.removeAttribute(Ka)
            : document.body.setAttribute(Ka, e.toString());
        }
      );
    }, []);
  },
  tz = function (e) {
    var t = e.noRelative,
      o = e.noImportant,
      a = e.gapMode,
      s = a === void 0 ? "margin" : a;
    ez();
    var u = E.useMemo(
      function () {
        return XD(s);
      },
      [s],
    );
    return E.createElement(WD, { styles: JD(u, !t, s, o ? "" : "!important") });
  },
  jh = !1;
if (typeof window < "u")
  try {
    var vu = Object.defineProperty({}, "passive", {
      get: function () {
        return ((jh = !0), !0);
      },
    });
    (window.addEventListener("test", vu, vu),
      window.removeEventListener("test", vu, vu));
  } catch {
    jh = !1;
  }
var Ua = jh ? { passive: !1 } : !1,
  nz = function (e) {
    return e.tagName === "TEXTAREA";
  },
  A1 = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var o = window.getComputedStyle(e);
    return (
      o[t] !== "hidden" &&
      !(o.overflowY === o.overflowX && !nz(e) && o[t] === "visible")
    );
  },
  rz = function (e) {
    return A1(e, "overflowY");
  },
  oz = function (e) {
    return A1(e, "overflowX");
  },
  sb = function (e, t) {
    var o = t.ownerDocument,
      a = t;
    do {
      typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host);
      var s = M1(e, a);
      if (s) {
        var u = D1(e, a),
          c = u[1],
          f = u[2];
        if (c > f) return !0;
      }
      a = a.parentNode;
    } while (a && a !== o.body);
    return !1;
  },
  az = function (e) {
    var t = e.scrollTop,
      o = e.scrollHeight,
      a = e.clientHeight;
    return [t, o, a];
  },
  iz = function (e) {
    var t = e.scrollLeft,
      o = e.scrollWidth,
      a = e.clientWidth;
    return [t, o, a];
  },
  M1 = function (e, t) {
    return e === "v" ? rz(t) : oz(t);
  },
  D1 = function (e, t) {
    return e === "v" ? az(t) : iz(t);
  },
  sz = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  lz = function (e, t, o, a, s) {
    var u = sz(e, window.getComputedStyle(t).direction),
      c = u * a,
      f = o.target,
      h = t.contains(f),
      p = !1,
      v = c > 0,
      y = 0,
      g = 0;
    do {
      if (!f) break;
      var S = D1(e, f),
        w = S[0],
        _ = S[1],
        T = S[2],
        A = _ - T - u * w;
      (w || A) && M1(e, f) && ((y += A), (g += w));
      var N = f.parentNode;
      f = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
    } while ((!h && f !== document.body) || (h && (t.contains(f) || t === f)));
    return (((v && Math.abs(y) < 1) || (!v && Math.abs(g) < 1)) && (p = !0), p);
  },
  gu = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  lb = function (e) {
    return [e.deltaX, e.deltaY];
  },
  ub = function (e) {
    return e && "current" in e ? e.current : e;
  },
  uz = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  cz = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  fz = 0,
  Ba = [];
function dz(e) {
  var t = E.useRef([]),
    o = E.useRef([0, 0]),
    a = E.useRef(),
    s = E.useState(fz++)[0],
    u = E.useState(O1)[0],
    c = E.useRef(e);
  (E.useEffect(
    function () {
      c.current = e;
    },
    [e],
  ),
    E.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(s));
          var _ = PD([e.lockRef.current], (e.shards || []).map(ub), !0).filter(
            Boolean,
          );
          return (
            _.forEach(function (T) {
              return T.classList.add("allow-interactivity-".concat(s));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(s)),
                _.forEach(function (T) {
                  return T.classList.remove("allow-interactivity-".concat(s));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var f = E.useCallback(function (_, T) {
      if (
        ("touches" in _ && _.touches.length === 2) ||
        (_.type === "wheel" && _.ctrlKey)
      )
        return !c.current.allowPinchZoom;
      var A = gu(_),
        N = o.current,
        P = "deltaX" in _ ? _.deltaX : N[0] - A[0],
        k = "deltaY" in _ ? _.deltaY : N[1] - A[1],
        H,
        F = _.target,
        Z = Math.abs(P) > Math.abs(k) ? "h" : "v";
      if ("touches" in _ && Z === "h" && F.type === "range") return !1;
      var B = sb(Z, F);
      if (!B) return !0;
      if ((B ? (H = Z) : ((H = Z === "v" ? "h" : "v"), (B = sb(Z, F))), !B))
        return !1;
      if (
        (!a.current && "changedTouches" in _ && (P || k) && (a.current = H), !H)
      )
        return !0;
      var re = a.current || H;
      return lz(re, T, _, re === "h" ? P : k);
    }, []),
    h = E.useCallback(function (_) {
      var T = _;
      if (!(!Ba.length || Ba[Ba.length - 1] !== u)) {
        var A = "deltaY" in T ? lb(T) : gu(T),
          N = t.current.filter(function (H) {
            return (
              H.name === T.type &&
              (H.target === T.target || T.target === H.shadowParent) &&
              uz(H.delta, A)
            );
          })[0];
        if (N && N.should) {
          T.cancelable && T.preventDefault();
          return;
        }
        if (!N) {
          var P = (c.current.shards || [])
              .map(ub)
              .filter(Boolean)
              .filter(function (H) {
                return H.contains(T.target);
              }),
            k = P.length > 0 ? f(T, P[0]) : !c.current.noIsolation;
          k && T.cancelable && T.preventDefault();
        }
      }
    }, []),
    p = E.useCallback(function (_, T, A, N) {
      var P = { name: _, delta: T, target: A, should: N, shadowParent: hz(A) };
      (t.current.push(P),
        setTimeout(function () {
          t.current = t.current.filter(function (k) {
            return k !== P;
          });
        }, 1));
    }, []),
    v = E.useCallback(function (_) {
      ((o.current = gu(_)), (a.current = void 0));
    }, []),
    y = E.useCallback(function (_) {
      p(_.type, lb(_), _.target, f(_, e.lockRef.current));
    }, []),
    g = E.useCallback(function (_) {
      p(_.type, gu(_), _.target, f(_, e.lockRef.current));
    }, []);
  E.useEffect(function () {
    return (
      Ba.push(u),
      e.setCallbacks({
        onScrollCapture: y,
        onWheelCapture: y,
        onTouchMoveCapture: g,
      }),
      document.addEventListener("wheel", h, Ua),
      document.addEventListener("touchmove", h, Ua),
      document.addEventListener("touchstart", v, Ua),
      function () {
        ((Ba = Ba.filter(function (_) {
          return _ !== u;
        })),
          document.removeEventListener("wheel", h, Ua),
          document.removeEventListener("touchmove", h, Ua),
          document.removeEventListener("touchstart", v, Ua));
      }
    );
  }, []);
  var S = e.removeScrollBar,
    w = e.inert;
  return E.createElement(
    E.Fragment,
    null,
    w ? E.createElement(u, { styles: cz(s) }) : null,
    S
      ? E.createElement(tz, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function hz(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const pz = qD(C1, dz);
var z1 = E.forwardRef(function (e, t) {
  return E.createElement(lc, qn({}, e, { ref: t, sideCar: pz }));
});
z1.classNames = lc.classNames;
var mz = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  Ia = new WeakMap(),
  bu = new WeakMap(),
  Su = {},
  Jd = 0,
  P1 = function (e) {
    return e && (e.host || P1(e.parentNode));
  },
  yz = function (e, t) {
    return t
      .map(function (o) {
        if (e.contains(o)) return o;
        var a = P1(o);
        return a && e.contains(a)
          ? a
          : (console.error(
              "aria-hidden",
              o,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (o) {
        return !!o;
      });
  },
  vz = function (e, t, o, a) {
    var s = yz(t, Array.isArray(e) ? e : [e]);
    Su[o] || (Su[o] = new WeakMap());
    var u = Su[o],
      c = [],
      f = new Set(),
      h = new Set(s),
      p = function (y) {
        !y || f.has(y) || (f.add(y), p(y.parentNode));
      };
    s.forEach(p);
    var v = function (y) {
      !y ||
        h.has(y) ||
        Array.prototype.forEach.call(y.children, function (g) {
          if (f.has(g)) v(g);
          else
            try {
              var S = g.getAttribute(a),
                w = S !== null && S !== "false",
                _ = (Ia.get(g) || 0) + 1,
                T = (u.get(g) || 0) + 1;
              (Ia.set(g, _),
                u.set(g, T),
                c.push(g),
                _ === 1 && w && bu.set(g, !0),
                T === 1 && g.setAttribute(o, "true"),
                w || g.setAttribute(a, "true"));
            } catch (A) {
              console.error("aria-hidden: cannot operate on ", g, A);
            }
        });
    };
    return (
      v(t),
      f.clear(),
      Jd++,
      function () {
        (c.forEach(function (y) {
          var g = Ia.get(y) - 1,
            S = u.get(y) - 1;
          (Ia.set(y, g),
            u.set(y, S),
            g || (bu.has(y) || y.removeAttribute(a), bu.delete(y)),
            S || y.removeAttribute(o));
        }),
          Jd--,
          Jd ||
            ((Ia = new WeakMap()),
            (Ia = new WeakMap()),
            (bu = new WeakMap()),
            (Su = {})));
      }
    );
  },
  gz = function (e, t, o) {
    o === void 0 && (o = "data-aria-hidden");
    var a = Array.from(Array.isArray(e) ? e : [e]),
      s = mz(e);
    return s
      ? (a.push.apply(a, Array.from(s.querySelectorAll("[aria-live], script"))),
        vz(a, s, o, "aria-hidden"))
      : function () {
          return null;
        };
  };
function bz(e) {
  const [t, o] = E.useState(void 0);
  return (
    no(() => {
      if (e) {
        o({ width: e.offsetWidth, height: e.offsetHeight });
        const a = new ResizeObserver((s) => {
          if (!Array.isArray(s) || !s.length) return;
          const u = s[0];
          let c, f;
          if ("borderBoxSize" in u) {
            const h = u.borderBoxSize,
              p = Array.isArray(h) ? h[0] : h;
            ((c = p.inlineSize), (f = p.blockSize));
          } else ((c = e.offsetWidth), (f = e.offsetHeight));
          o({ width: c, height: f });
        });
        return (a.observe(e, { box: "border-box" }), () => a.unobserve(e));
      } else o(void 0);
    }, [e]),
    t
  );
}
const Sz = ["top", "right", "bottom", "left"],
  ro = Math.min,
  an = Math.max,
  Hu = Math.round,
  wu = Math.floor,
  $n = (e) => ({ x: e, y: e }),
  wz = { left: "right", right: "left", bottom: "top", top: "bottom" },
  _z = { start: "end", end: "start" };
function Nh(e, t, o) {
  return an(e, ro(t, o));
}
function wr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function _r(e) {
  return e.split("-")[0];
}
function ii(e) {
  return e.split("-")[1];
}
function mp(e) {
  return e === "x" ? "y" : "x";
}
function yp(e) {
  return e === "y" ? "height" : "width";
}
const xz = new Set(["top", "bottom"]);
function Vn(e) {
  return xz.has(_r(e)) ? "y" : "x";
}
function vp(e) {
  return mp(Vn(e));
}
function Ez(e, t, o) {
  o === void 0 && (o = !1);
  const a = ii(e),
    s = vp(e),
    u = yp(s);
  let c =
    s === "x"
      ? a === (o ? "end" : "start")
        ? "right"
        : "left"
      : a === "start"
        ? "bottom"
        : "top";
  return (t.reference[u] > t.floating[u] && (c = qu(c)), [c, qu(c)]);
}
function Rz(e) {
  const t = qu(e);
  return [kh(e), t, kh(t)];
}
function kh(e) {
  return e.replace(/start|end/g, (t) => _z[t]);
}
const cb = ["left", "right"],
  fb = ["right", "left"],
  Tz = ["top", "bottom"],
  Cz = ["bottom", "top"];
function Oz(e, t, o) {
  switch (e) {
    case "top":
    case "bottom":
      return o ? (t ? fb : cb) : t ? cb : fb;
    case "left":
    case "right":
      return t ? Tz : Cz;
    default:
      return [];
  }
}
function Az(e, t, o, a) {
  const s = ii(e);
  let u = Oz(_r(e), o === "start", a);
  return (
    s && ((u = u.map((c) => c + "-" + s)), t && (u = u.concat(u.map(kh)))),
    u
  );
}
function qu(e) {
  return e.replace(/left|right|bottom|top/g, (t) => wz[t]);
}
function Mz(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function j1(e) {
  return typeof e != "number"
    ? Mz(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Vu(e) {
  const { x: t, y: o, width: a, height: s } = e;
  return {
    width: a,
    height: s,
    top: o,
    left: t,
    right: t + a,
    bottom: o + s,
    x: t,
    y: o,
  };
}
function db(e, t, o) {
  let { reference: a, floating: s } = e;
  const u = Vn(t),
    c = vp(t),
    f = yp(c),
    h = _r(t),
    p = u === "y",
    v = a.x + a.width / 2 - s.width / 2,
    y = a.y + a.height / 2 - s.height / 2,
    g = a[f] / 2 - s[f] / 2;
  let S;
  switch (h) {
    case "top":
      S = { x: v, y: a.y - s.height };
      break;
    case "bottom":
      S = { x: v, y: a.y + a.height };
      break;
    case "right":
      S = { x: a.x + a.width, y };
      break;
    case "left":
      S = { x: a.x - s.width, y };
      break;
    default:
      S = { x: a.x, y: a.y };
  }
  switch (ii(t)) {
    case "start":
      S[c] -= g * (o && p ? -1 : 1);
      break;
    case "end":
      S[c] += g * (o && p ? -1 : 1);
      break;
  }
  return S;
}
const Dz = async (e, t, o) => {
  const {
      placement: a = "bottom",
      strategy: s = "absolute",
      middleware: u = [],
      platform: c,
    } = o,
    f = u.filter(Boolean),
    h = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let p = await c.getElementRects({ reference: e, floating: t, strategy: s }),
    { x: v, y } = db(p, a, h),
    g = a,
    S = {},
    w = 0;
  for (let _ = 0; _ < f.length; _++) {
    const { name: T, fn: A } = f[_],
      {
        x: N,
        y: P,
        data: k,
        reset: H,
      } = await A({
        x: v,
        y,
        initialPlacement: a,
        placement: g,
        strategy: s,
        middlewareData: S,
        rects: p,
        platform: c,
        elements: { reference: e, floating: t },
      });
    ((v = N ?? v),
      (y = P ?? y),
      (S = { ...S, [T]: { ...S[T], ...k } }),
      H &&
        w <= 50 &&
        (w++,
        typeof H == "object" &&
          (H.placement && (g = H.placement),
          H.rects &&
            (p =
              H.rects === !0
                ? await c.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: s,
                  })
                : H.rects),
          ({ x: v, y } = db(p, g, h))),
        (_ = -1)));
  }
  return { x: v, y, placement: g, strategy: s, middlewareData: S };
};
async function Ms(e, t) {
  var o;
  t === void 0 && (t = {});
  const { x: a, y: s, platform: u, rects: c, elements: f, strategy: h } = e,
    {
      boundary: p = "clippingAncestors",
      rootBoundary: v = "viewport",
      elementContext: y = "floating",
      altBoundary: g = !1,
      padding: S = 0,
    } = wr(t, e),
    w = j1(S),
    T = f[g ? (y === "floating" ? "reference" : "floating") : y],
    A = Vu(
      await u.getClippingRect({
        element:
          (o = await (u.isElement == null ? void 0 : u.isElement(T))) == null ||
          o
            ? T
            : T.contextElement ||
              (await (u.getDocumentElement == null
                ? void 0
                : u.getDocumentElement(f.floating))),
        boundary: p,
        rootBoundary: v,
        strategy: h,
      }),
    ),
    N =
      y === "floating"
        ? { x: a, y: s, width: c.floating.width, height: c.floating.height }
        : c.reference,
    P = await (u.getOffsetParent == null
      ? void 0
      : u.getOffsetParent(f.floating)),
    k = (await (u.isElement == null ? void 0 : u.isElement(P)))
      ? (await (u.getScale == null ? void 0 : u.getScale(P))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    H = Vu(
      u.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: f,
            rect: N,
            offsetParent: P,
            strategy: h,
          })
        : N,
    );
  return {
    top: (A.top - H.top + w.top) / k.y,
    bottom: (H.bottom - A.bottom + w.bottom) / k.y,
    left: (A.left - H.left + w.left) / k.x,
    right: (H.right - A.right + w.right) / k.x,
  };
}
const zz = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: o,
          y: a,
          placement: s,
          rects: u,
          platform: c,
          elements: f,
          middlewareData: h,
        } = t,
        { element: p, padding: v = 0 } = wr(e, t) || {};
      if (p == null) return {};
      const y = j1(v),
        g = { x: o, y: a },
        S = vp(s),
        w = yp(S),
        _ = await c.getDimensions(p),
        T = S === "y",
        A = T ? "top" : "left",
        N = T ? "bottom" : "right",
        P = T ? "clientHeight" : "clientWidth",
        k = u.reference[w] + u.reference[S] - g[S] - u.floating[w],
        H = g[S] - u.reference[S],
        F = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(p));
      let Z = F ? F[P] : 0;
      (!Z || !(await (c.isElement == null ? void 0 : c.isElement(F)))) &&
        (Z = f.floating[P] || u.floating[w]);
      const B = k / 2 - H / 2,
        re = Z / 2 - _[w] / 2 - 1,
        ae = ro(y[A], re),
        he = ro(y[N], re),
        se = ae,
        ve = Z - _[w] - he,
        me = Z / 2 - _[w] / 2 + B,
        ye = Nh(se, me, ve),
        z =
          !h.arrow &&
          ii(s) != null &&
          me !== ye &&
          u.reference[w] / 2 - (me < se ? ae : he) - _[w] / 2 < 0,
        K = z ? (me < se ? me - se : me - ve) : 0;
      return {
        [S]: g[S] + K,
        data: {
          [S]: ye,
          centerOffset: me - ye - K,
          ...(z && { alignmentOffset: K }),
        },
        reset: z,
      };
    },
  }),
  Pz = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var o, a;
          const {
              placement: s,
              middlewareData: u,
              rects: c,
              initialPlacement: f,
              platform: h,
              elements: p,
            } = t,
            {
              mainAxis: v = !0,
              crossAxis: y = !0,
              fallbackPlacements: g,
              fallbackStrategy: S = "bestFit",
              fallbackAxisSideDirection: w = "none",
              flipAlignment: _ = !0,
              ...T
            } = wr(e, t);
          if ((o = u.arrow) != null && o.alignmentOffset) return {};
          const A = _r(s),
            N = Vn(f),
            P = _r(f) === f,
            k = await (h.isRTL == null ? void 0 : h.isRTL(p.floating)),
            H = g || (P || !_ ? [qu(f)] : Rz(f)),
            F = w !== "none";
          !g && F && H.push(...Az(f, _, w, k));
          const Z = [f, ...H],
            B = await Ms(t, T),
            re = [];
          let ae = ((a = u.flip) == null ? void 0 : a.overflows) || [];
          if ((v && re.push(B[A]), y)) {
            const me = Ez(s, c, k);
            re.push(B[me[0]], B[me[1]]);
          }
          if (
            ((ae = [...ae, { placement: s, overflows: re }]),
            !re.every((me) => me <= 0))
          ) {
            var he, se;
            const me = (((he = u.flip) == null ? void 0 : he.index) || 0) + 1,
              ye = Z[me];
            if (
              ye &&
              (!(y === "alignment" ? N !== Vn(ye) : !1) ||
                ae.every((q) =>
                  Vn(q.placement) === N ? q.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: me, overflows: ae },
                reset: { placement: ye },
              };
            let z =
              (se = ae
                .filter((K) => K.overflows[0] <= 0)
                .sort((K, q) => K.overflows[1] - q.overflows[1])[0]) == null
                ? void 0
                : se.placement;
            if (!z)
              switch (S) {
                case "bestFit": {
                  var ve;
                  const K =
                    (ve = ae
                      .filter((q) => {
                        if (F) {
                          const W = Vn(q.placement);
                          return W === N || W === "y";
                        }
                        return !0;
                      })
                      .map((q) => [
                        q.placement,
                        q.overflows
                          .filter((W) => W > 0)
                          .reduce((W, C) => W + C, 0),
                      ])
                      .sort((q, W) => q[1] - W[1])[0]) == null
                      ? void 0
                      : ve[0];
                  K && (z = K);
                  break;
                }
                case "initialPlacement":
                  z = f;
                  break;
              }
            if (s !== z) return { reset: { placement: z } };
          }
          return {};
        },
      }
    );
  };
function hb(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function pb(e) {
  return Sz.some((t) => e[t] >= 0);
}
const jz = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: o } = t,
            { strategy: a = "referenceHidden", ...s } = wr(e, t);
          switch (a) {
            case "referenceHidden": {
              const u = await Ms(t, { ...s, elementContext: "reference" }),
                c = hb(u, o.reference);
              return {
                data: { referenceHiddenOffsets: c, referenceHidden: pb(c) },
              };
            }
            case "escaped": {
              const u = await Ms(t, { ...s, altBoundary: !0 }),
                c = hb(u, o.floating);
              return { data: { escapedOffsets: c, escaped: pb(c) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  N1 = new Set(["left", "top"]);
async function Nz(e, t) {
  const { placement: o, platform: a, elements: s } = e,
    u = await (a.isRTL == null ? void 0 : a.isRTL(s.floating)),
    c = _r(o),
    f = ii(o),
    h = Vn(o) === "y",
    p = N1.has(c) ? -1 : 1,
    v = u && h ? -1 : 1,
    y = wr(t, e);
  let {
    mainAxis: g,
    crossAxis: S,
    alignmentAxis: w,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    f && typeof w == "number" && (S = f === "end" ? w * -1 : w),
    h ? { x: S * v, y: g * p } : { x: g * p, y: S * v }
  );
}
const kz = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var o, a;
          const { x: s, y: u, placement: c, middlewareData: f } = t,
            h = await Nz(t, e);
          return c === ((o = f.offset) == null ? void 0 : o.placement) &&
            (a = f.arrow) != null &&
            a.alignmentOffset
            ? {}
            : { x: s + h.x, y: u + h.y, data: { ...h, placement: c } };
        },
      }
    );
  },
  Lz = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: o, y: a, placement: s } = t,
            {
              mainAxis: u = !0,
              crossAxis: c = !1,
              limiter: f = {
                fn: (T) => {
                  let { x: A, y: N } = T;
                  return { x: A, y: N };
                },
              },
              ...h
            } = wr(e, t),
            p = { x: o, y: a },
            v = await Ms(t, h),
            y = Vn(_r(s)),
            g = mp(y);
          let S = p[g],
            w = p[y];
          if (u) {
            const T = g === "y" ? "top" : "left",
              A = g === "y" ? "bottom" : "right",
              N = S + v[T],
              P = S - v[A];
            S = Nh(N, S, P);
          }
          if (c) {
            const T = y === "y" ? "top" : "left",
              A = y === "y" ? "bottom" : "right",
              N = w + v[T],
              P = w - v[A];
            w = Nh(N, w, P);
          }
          const _ = f.fn({ ...t, [g]: S, [y]: w });
          return {
            ..._,
            data: { x: _.x - o, y: _.y - a, enabled: { [g]: u, [y]: c } },
          };
        },
      }
    );
  },
  Uz = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: o, y: a, placement: s, rects: u, middlewareData: c } = t,
            { offset: f = 0, mainAxis: h = !0, crossAxis: p = !0 } = wr(e, t),
            v = { x: o, y: a },
            y = Vn(s),
            g = mp(y);
          let S = v[g],
            w = v[y];
          const _ = wr(f, t),
            T =
              typeof _ == "number"
                ? { mainAxis: _, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ..._ };
          if (h) {
            const P = g === "y" ? "height" : "width",
              k = u.reference[g] - u.floating[P] + T.mainAxis,
              H = u.reference[g] + u.reference[P] - T.mainAxis;
            S < k ? (S = k) : S > H && (S = H);
          }
          if (p) {
            var A, N;
            const P = g === "y" ? "width" : "height",
              k = N1.has(_r(s)),
              H =
                u.reference[y] -
                u.floating[P] +
                ((k && ((A = c.offset) == null ? void 0 : A[y])) || 0) +
                (k ? 0 : T.crossAxis),
              F =
                u.reference[y] +
                u.reference[P] +
                (k ? 0 : ((N = c.offset) == null ? void 0 : N[y]) || 0) -
                (k ? T.crossAxis : 0);
            w < H ? (w = H) : w > F && (w = F);
          }
          return { [g]: S, [y]: w };
        },
      }
    );
  },
  Bz = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var o, a;
          const { placement: s, rects: u, platform: c, elements: f } = t,
            { apply: h = () => {}, ...p } = wr(e, t),
            v = await Ms(t, p),
            y = _r(s),
            g = ii(s),
            S = Vn(s) === "y",
            { width: w, height: _ } = u.floating;
          let T, A;
          y === "top" || y === "bottom"
            ? ((T = y),
              (A =
                g ===
                ((await (c.isRTL == null ? void 0 : c.isRTL(f.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((A = y), (T = g === "end" ? "top" : "bottom"));
          const N = _ - v.top - v.bottom,
            P = w - v.left - v.right,
            k = ro(_ - v[T], N),
            H = ro(w - v[A], P),
            F = !t.middlewareData.shift;
          let Z = k,
            B = H;
          if (
            ((o = t.middlewareData.shift) != null && o.enabled.x && (B = P),
            (a = t.middlewareData.shift) != null && a.enabled.y && (Z = N),
            F && !g)
          ) {
            const ae = an(v.left, 0),
              he = an(v.right, 0),
              se = an(v.top, 0),
              ve = an(v.bottom, 0);
            S
              ? (B =
                  w -
                  2 * (ae !== 0 || he !== 0 ? ae + he : an(v.left, v.right)))
              : (Z =
                  _ -
                  2 * (se !== 0 || ve !== 0 ? se + ve : an(v.top, v.bottom)));
          }
          await h({ ...t, availableWidth: B, availableHeight: Z });
          const re = await c.getDimensions(f.floating);
          return w !== re.width || _ !== re.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function uc() {
  return typeof window < "u";
}
function si(e) {
  return k1(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function sn(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function Qn(e) {
  var t;
  return (t = (k1(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function k1(e) {
  return uc() ? e instanceof Node || e instanceof sn(e).Node : !1;
}
function An(e) {
  return uc() ? e instanceof Element || e instanceof sn(e).Element : !1;
}
function Fn(e) {
  return uc() ? e instanceof HTMLElement || e instanceof sn(e).HTMLElement : !1;
}
function mb(e) {
  return !uc() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof sn(e).ShadowRoot;
}
const Iz = new Set(["inline", "contents"]);
function Hs(e) {
  const { overflow: t, overflowX: o, overflowY: a, display: s } = Mn(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + a + o) && !Iz.has(s);
}
const Hz = new Set(["table", "td", "th"]);
function qz(e) {
  return Hz.has(si(e));
}
const Vz = [":popover-open", ":modal"];
function cc(e) {
  return Vz.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Zz = ["transform", "translate", "scale", "rotate", "perspective"],
  $z = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  Gz = ["paint", "layout", "strict", "content"];
function gp(e) {
  const t = bp(),
    o = An(e) ? Mn(e) : e;
  return (
    Zz.some((a) => (o[a] ? o[a] !== "none" : !1)) ||
    (o.containerType ? o.containerType !== "normal" : !1) ||
    (!t && (o.backdropFilter ? o.backdropFilter !== "none" : !1)) ||
    (!t && (o.filter ? o.filter !== "none" : !1)) ||
    $z.some((a) => (o.willChange || "").includes(a)) ||
    Gz.some((a) => (o.contain || "").includes(a))
  );
}
function Fz(e) {
  let t = oo(e);
  for (; Fn(t) && !ni(t); ) {
    if (gp(t)) return t;
    if (cc(t)) return null;
    t = oo(t);
  }
  return null;
}
function bp() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const Yz = new Set(["html", "body", "#document"]);
function ni(e) {
  return Yz.has(si(e));
}
function Mn(e) {
  return sn(e).getComputedStyle(e);
}
function fc(e) {
  return An(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function oo(e) {
  if (si(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (mb(e) && e.host) || Qn(e);
  return mb(t) ? t.host : t;
}
function L1(e) {
  const t = oo(e);
  return ni(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Fn(t) && Hs(t)
      ? t
      : L1(t);
}
function Ds(e, t, o) {
  var a;
  (t === void 0 && (t = []), o === void 0 && (o = !0));
  const s = L1(e),
    u = s === ((a = e.ownerDocument) == null ? void 0 : a.body),
    c = sn(s);
  if (u) {
    const f = Lh(c);
    return t.concat(
      c,
      c.visualViewport || [],
      Hs(s) ? s : [],
      f && o ? Ds(f) : [],
    );
  }
  return t.concat(s, Ds(s, [], o));
}
function Lh(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function U1(e) {
  const t = Mn(e);
  let o = parseFloat(t.width) || 0,
    a = parseFloat(t.height) || 0;
  const s = Fn(e),
    u = s ? e.offsetWidth : o,
    c = s ? e.offsetHeight : a,
    f = Hu(o) !== u || Hu(a) !== c;
  return (f && ((o = u), (a = c)), { width: o, height: a, $: f });
}
function Sp(e) {
  return An(e) ? e : e.contextElement;
}
function Qa(e) {
  const t = Sp(e);
  if (!Fn(t)) return $n(1);
  const o = t.getBoundingClientRect(),
    { width: a, height: s, $: u } = U1(t);
  let c = (u ? Hu(o.width) : o.width) / a,
    f = (u ? Hu(o.height) : o.height) / s;
  return (
    (!c || !Number.isFinite(c)) && (c = 1),
    (!f || !Number.isFinite(f)) && (f = 1),
    { x: c, y: f }
  );
}
const Kz = $n(0);
function B1(e) {
  const t = sn(e);
  return !bp() || !t.visualViewport
    ? Kz
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function Qz(e, t, o) {
  return (t === void 0 && (t = !1), !o || (t && o !== sn(e)) ? !1 : t);
}
function Io(e, t, o, a) {
  (t === void 0 && (t = !1), o === void 0 && (o = !1));
  const s = e.getBoundingClientRect(),
    u = Sp(e);
  let c = $n(1);
  t && (a ? An(a) && (c = Qa(a)) : (c = Qa(e)));
  const f = Qz(u, o, a) ? B1(u) : $n(0);
  let h = (s.left + f.x) / c.x,
    p = (s.top + f.y) / c.y,
    v = s.width / c.x,
    y = s.height / c.y;
  if (u) {
    const g = sn(u),
      S = a && An(a) ? sn(a) : a;
    let w = g,
      _ = Lh(w);
    for (; _ && a && S !== w; ) {
      const T = Qa(_),
        A = _.getBoundingClientRect(),
        N = Mn(_),
        P = A.left + (_.clientLeft + parseFloat(N.paddingLeft)) * T.x,
        k = A.top + (_.clientTop + parseFloat(N.paddingTop)) * T.y;
      ((h *= T.x),
        (p *= T.y),
        (v *= T.x),
        (y *= T.y),
        (h += P),
        (p += k),
        (w = sn(_)),
        (_ = Lh(w)));
    }
  }
  return Vu({ width: v, height: y, x: h, y: p });
}
function dc(e, t) {
  const o = fc(e).scrollLeft;
  return t ? t.left + o : Io(Qn(e)).left + o;
}
function I1(e, t) {
  const o = e.getBoundingClientRect(),
    a = o.left + t.scrollLeft - dc(e, o),
    s = o.top + t.scrollTop;
  return { x: a, y: s };
}
function Xz(e) {
  let { elements: t, rect: o, offsetParent: a, strategy: s } = e;
  const u = s === "fixed",
    c = Qn(a),
    f = t ? cc(t.floating) : !1;
  if (a === c || (f && u)) return o;
  let h = { scrollLeft: 0, scrollTop: 0 },
    p = $n(1);
  const v = $n(0),
    y = Fn(a);
  if (
    (y || (!y && !u)) &&
    ((si(a) !== "body" || Hs(c)) && (h = fc(a)), Fn(a))
  ) {
    const S = Io(a);
    ((p = Qa(a)), (v.x = S.x + a.clientLeft), (v.y = S.y + a.clientTop));
  }
  const g = c && !y && !u ? I1(c, h) : $n(0);
  return {
    width: o.width * p.x,
    height: o.height * p.y,
    x: o.x * p.x - h.scrollLeft * p.x + v.x + g.x,
    y: o.y * p.y - h.scrollTop * p.y + v.y + g.y,
  };
}
function Wz(e) {
  return Array.from(e.getClientRects());
}
function Jz(e) {
  const t = Qn(e),
    o = fc(e),
    a = e.ownerDocument.body,
    s = an(t.scrollWidth, t.clientWidth, a.scrollWidth, a.clientWidth),
    u = an(t.scrollHeight, t.clientHeight, a.scrollHeight, a.clientHeight);
  let c = -o.scrollLeft + dc(e);
  const f = -o.scrollTop;
  return (
    Mn(a).direction === "rtl" && (c += an(t.clientWidth, a.clientWidth) - s),
    { width: s, height: u, x: c, y: f }
  );
}
const yb = 25;
function e8(e, t) {
  const o = sn(e),
    a = Qn(e),
    s = o.visualViewport;
  let u = a.clientWidth,
    c = a.clientHeight,
    f = 0,
    h = 0;
  if (s) {
    ((u = s.width), (c = s.height));
    const v = bp();
    (!v || (v && t === "fixed")) && ((f = s.offsetLeft), (h = s.offsetTop));
  }
  const p = dc(a);
  if (p <= 0) {
    const v = a.ownerDocument,
      y = v.body,
      g = getComputedStyle(y),
      S =
        (v.compatMode === "CSS1Compat" &&
          parseFloat(g.marginLeft) + parseFloat(g.marginRight)) ||
        0,
      w = Math.abs(a.clientWidth - y.clientWidth - S);
    w <= yb && (u -= w);
  } else p <= yb && (u += p);
  return { width: u, height: c, x: f, y: h };
}
const t8 = new Set(["absolute", "fixed"]);
function n8(e, t) {
  const o = Io(e, !0, t === "fixed"),
    a = o.top + e.clientTop,
    s = o.left + e.clientLeft,
    u = Fn(e) ? Qa(e) : $n(1),
    c = e.clientWidth * u.x,
    f = e.clientHeight * u.y,
    h = s * u.x,
    p = a * u.y;
  return { width: c, height: f, x: h, y: p };
}
function vb(e, t, o) {
  let a;
  if (t === "viewport") a = e8(e, o);
  else if (t === "document") a = Jz(Qn(e));
  else if (An(t)) a = n8(t, o);
  else {
    const s = B1(e);
    a = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
  }
  return Vu(a);
}
function H1(e, t) {
  const o = oo(e);
  return o === t || !An(o) || ni(o)
    ? !1
    : Mn(o).position === "fixed" || H1(o, t);
}
function r8(e, t) {
  const o = t.get(e);
  if (o) return o;
  let a = Ds(e, [], !1).filter((f) => An(f) && si(f) !== "body"),
    s = null;
  const u = Mn(e).position === "fixed";
  let c = u ? oo(e) : e;
  for (; An(c) && !ni(c); ) {
    const f = Mn(c),
      h = gp(c);
    (!h && f.position === "fixed" && (s = null),
      (
        u
          ? !h && !s
          : (!h && f.position === "static" && !!s && t8.has(s.position)) ||
            (Hs(c) && !h && H1(e, c))
      )
        ? (a = a.filter((v) => v !== c))
        : (s = f),
      (c = oo(c)));
  }
  return (t.set(e, a), a);
}
function o8(e) {
  let { element: t, boundary: o, rootBoundary: a, strategy: s } = e;
  const c = [
      ...(o === "clippingAncestors"
        ? cc(t)
          ? []
          : r8(t, this._c)
        : [].concat(o)),
      a,
    ],
    f = c[0],
    h = c.reduce(
      (p, v) => {
        const y = vb(t, v, s);
        return (
          (p.top = an(y.top, p.top)),
          (p.right = ro(y.right, p.right)),
          (p.bottom = ro(y.bottom, p.bottom)),
          (p.left = an(y.left, p.left)),
          p
        );
      },
      vb(t, f, s),
    );
  return {
    width: h.right - h.left,
    height: h.bottom - h.top,
    x: h.left,
    y: h.top,
  };
}
function a8(e) {
  const { width: t, height: o } = U1(e);
  return { width: t, height: o };
}
function i8(e, t, o) {
  const a = Fn(t),
    s = Qn(t),
    u = o === "fixed",
    c = Io(e, !0, u, t);
  let f = { scrollLeft: 0, scrollTop: 0 };
  const h = $n(0);
  function p() {
    h.x = dc(s);
  }
  if (a || (!a && !u))
    if (((si(t) !== "body" || Hs(s)) && (f = fc(t)), a)) {
      const S = Io(t, !0, u, t);
      ((h.x = S.x + t.clientLeft), (h.y = S.y + t.clientTop));
    } else s && p();
  u && !a && s && p();
  const v = s && !a && !u ? I1(s, f) : $n(0),
    y = c.left + f.scrollLeft - h.x - v.x,
    g = c.top + f.scrollTop - h.y - v.y;
  return { x: y, y: g, width: c.width, height: c.height };
}
function eh(e) {
  return Mn(e).position === "static";
}
function gb(e, t) {
  if (!Fn(e) || Mn(e).position === "fixed") return null;
  if (t) return t(e);
  let o = e.offsetParent;
  return (Qn(e) === o && (o = o.ownerDocument.body), o);
}
function q1(e, t) {
  const o = sn(e);
  if (cc(e)) return o;
  if (!Fn(e)) {
    let s = oo(e);
    for (; s && !ni(s); ) {
      if (An(s) && !eh(s)) return s;
      s = oo(s);
    }
    return o;
  }
  let a = gb(e, t);
  for (; a && qz(a) && eh(a); ) a = gb(a, t);
  return a && ni(a) && eh(a) && !gp(a) ? o : a || Fz(e) || o;
}
const s8 = async function (e) {
  const t = this.getOffsetParent || q1,
    o = this.getDimensions,
    a = await o(e.floating);
  return {
    reference: i8(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: a.width, height: a.height },
  };
};
function l8(e) {
  return Mn(e).direction === "rtl";
}
const u8 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Xz,
  getDocumentElement: Qn,
  getClippingRect: o8,
  getOffsetParent: q1,
  getElementRects: s8,
  getClientRects: Wz,
  getDimensions: a8,
  getScale: Qa,
  isElement: An,
  isRTL: l8,
};
function V1(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function c8(e, t) {
  let o = null,
    a;
  const s = Qn(e);
  function u() {
    var f;
    (clearTimeout(a), (f = o) == null || f.disconnect(), (o = null));
  }
  function c(f, h) {
    (f === void 0 && (f = !1), h === void 0 && (h = 1), u());
    const p = e.getBoundingClientRect(),
      { left: v, top: y, width: g, height: S } = p;
    if ((f || t(), !g || !S)) return;
    const w = wu(y),
      _ = wu(s.clientWidth - (v + g)),
      T = wu(s.clientHeight - (y + S)),
      A = wu(v),
      P = {
        rootMargin: -w + "px " + -_ + "px " + -T + "px " + -A + "px",
        threshold: an(0, ro(1, h)) || 1,
      };
    let k = !0;
    function H(F) {
      const Z = F[0].intersectionRatio;
      if (Z !== h) {
        if (!k) return c();
        Z
          ? c(!1, Z)
          : (a = setTimeout(() => {
              c(!1, 1e-7);
            }, 1e3));
      }
      (Z === 1 && !V1(p, e.getBoundingClientRect()) && c(), (k = !1));
    }
    try {
      o = new IntersectionObserver(H, { ...P, root: s.ownerDocument });
    } catch {
      o = new IntersectionObserver(H, P);
    }
    o.observe(e);
  }
  return (c(!0), u);
}
function f8(e, t, o, a) {
  a === void 0 && (a = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: u = !0,
      elementResize: c = typeof ResizeObserver == "function",
      layoutShift: f = typeof IntersectionObserver == "function",
      animationFrame: h = !1,
    } = a,
    p = Sp(e),
    v = s || u ? [...(p ? Ds(p) : []), ...Ds(t)] : [];
  v.forEach((A) => {
    (s && A.addEventListener("scroll", o, { passive: !0 }),
      u && A.addEventListener("resize", o));
  });
  const y = p && f ? c8(p, o) : null;
  let g = -1,
    S = null;
  c &&
    ((S = new ResizeObserver((A) => {
      let [N] = A;
      (N &&
        N.target === p &&
        S &&
        (S.unobserve(t),
        cancelAnimationFrame(g),
        (g = requestAnimationFrame(() => {
          var P;
          (P = S) == null || P.observe(t);
        }))),
        o());
    })),
    p && !h && S.observe(p),
    S.observe(t));
  let w,
    _ = h ? Io(e) : null;
  h && T();
  function T() {
    const A = Io(e);
    (_ && !V1(_, A) && o(), (_ = A), (w = requestAnimationFrame(T)));
  }
  return (
    o(),
    () => {
      var A;
      (v.forEach((N) => {
        (s && N.removeEventListener("scroll", o),
          u && N.removeEventListener("resize", o));
      }),
        y?.(),
        (A = S) == null || A.disconnect(),
        (S = null),
        h && cancelAnimationFrame(w));
    }
  );
}
const d8 = kz,
  h8 = Lz,
  p8 = Pz,
  m8 = Bz,
  y8 = jz,
  bb = zz,
  v8 = Uz,
  g8 = (e, t, o) => {
    const a = new Map(),
      s = { platform: u8, ...o },
      u = { ...s.platform, _c: a };
    return Dz(e, t, { ...s, platform: u });
  };
var b8 = typeof document < "u",
  S8 = function () {},
  zu = b8 ? E.useLayoutEffect : S8;
function Zu(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let o, a, s;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((o = e.length), o !== t.length)) return !1;
      for (a = o; a-- !== 0; ) if (!Zu(e[a], t[a])) return !1;
      return !0;
    }
    if (((s = Object.keys(e)), (o = s.length), o !== Object.keys(t).length))
      return !1;
    for (a = o; a-- !== 0; ) if (!{}.hasOwnProperty.call(t, s[a])) return !1;
    for (a = o; a-- !== 0; ) {
      const u = s[a];
      if (!(u === "_owner" && e.$$typeof) && !Zu(e[u], t[u])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Z1(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Sb(e, t) {
  const o = Z1(e);
  return Math.round(t * o) / o;
}
function th(e) {
  const t = E.useRef(e);
  return (
    zu(() => {
      t.current = e;
    }),
    t
  );
}
function w8(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: o = "absolute",
      middleware: a = [],
      platform: s,
      elements: { reference: u, floating: c } = {},
      transform: f = !0,
      whileElementsMounted: h,
      open: p,
    } = e,
    [v, y] = E.useState({
      x: 0,
      y: 0,
      strategy: o,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [g, S] = E.useState(a);
  Zu(g, a) || S(a);
  const [w, _] = E.useState(null),
    [T, A] = E.useState(null),
    N = E.useCallback((q) => {
      q !== F.current && ((F.current = q), _(q));
    }, []),
    P = E.useCallback((q) => {
      q !== Z.current && ((Z.current = q), A(q));
    }, []),
    k = u || w,
    H = c || T,
    F = E.useRef(null),
    Z = E.useRef(null),
    B = E.useRef(v),
    re = h != null,
    ae = th(h),
    he = th(s),
    se = th(p),
    ve = E.useCallback(() => {
      if (!F.current || !Z.current) return;
      const q = { placement: t, strategy: o, middleware: g };
      (he.current && (q.platform = he.current),
        g8(F.current, Z.current, q).then((W) => {
          const C = { ...W, isPositioned: se.current !== !1 };
          me.current &&
            !Zu(B.current, C) &&
            ((B.current = C),
            Xu.flushSync(() => {
              y(C);
            }));
        }));
    }, [g, t, o, he, se]);
  zu(() => {
    p === !1 &&
      B.current.isPositioned &&
      ((B.current.isPositioned = !1), y((q) => ({ ...q, isPositioned: !1 })));
  }, [p]);
  const me = E.useRef(!1);
  (zu(
    () => (
      (me.current = !0),
      () => {
        me.current = !1;
      }
    ),
    [],
  ),
    zu(() => {
      if ((k && (F.current = k), H && (Z.current = H), k && H)) {
        if (ae.current) return ae.current(k, H, ve);
        ve();
      }
    }, [k, H, ve, ae, re]));
  const ye = E.useMemo(
      () => ({ reference: F, floating: Z, setReference: N, setFloating: P }),
      [N, P],
    ),
    z = E.useMemo(() => ({ reference: k, floating: H }), [k, H]),
    K = E.useMemo(() => {
      const q = { position: o, left: 0, top: 0 };
      if (!z.floating) return q;
      const W = Sb(z.floating, v.x),
        C = Sb(z.floating, v.y);
      return f
        ? {
            ...q,
            transform: "translate(" + W + "px, " + C + "px)",
            ...(Z1(z.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: o, left: W, top: C };
    }, [o, f, z.floating, v.x, v.y]);
  return E.useMemo(
    () => ({ ...v, update: ve, refs: ye, elements: z, floatingStyles: K }),
    [v, ve, ye, z, K],
  );
}
const _8 = (e) => {
    function t(o) {
      return {}.hasOwnProperty.call(o, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(o) {
        const { element: a, padding: s } = typeof e == "function" ? e(o) : e;
        return a && t(a)
          ? a.current != null
            ? bb({ element: a.current, padding: s }).fn(o)
            : {}
          : a
            ? bb({ element: a, padding: s }).fn(o)
            : {};
      },
    };
  },
  x8 = (e, t) => ({ ...d8(e), options: [e, t] }),
  E8 = (e, t) => ({ ...h8(e), options: [e, t] }),
  R8 = (e, t) => ({ ...v8(e), options: [e, t] }),
  T8 = (e, t) => ({ ...p8(e), options: [e, t] }),
  C8 = (e, t) => ({ ...m8(e), options: [e, t] }),
  O8 = (e, t) => ({ ...y8(e), options: [e, t] }),
  A8 = (e, t) => ({ ..._8(e), options: [e, t] });
var M8 = "Arrow",
  $1 = E.forwardRef((e, t) => {
    const { children: o, width: a = 10, height: s = 5, ...u } = e;
    return D.jsx(Ht.svg, {
      ...u,
      ref: t,
      width: a,
      height: s,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? o : D.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
$1.displayName = M8;
var D8 = $1,
  wp = "Popper",
  [G1, F1] = Bs(wp),
  [z8, Y1] = G1(wp),
  K1 = (e) => {
    const { __scopePopper: t, children: o } = e,
      [a, s] = E.useState(null);
    return D.jsx(z8, { scope: t, anchor: a, onAnchorChange: s, children: o });
  };
K1.displayName = wp;
var Q1 = "PopperAnchor",
  X1 = E.forwardRef((e, t) => {
    const { __scopePopper: o, virtualRef: a, ...s } = e,
      u = Y1(Q1, o),
      c = E.useRef(null),
      f = Kt(t, c),
      h = E.useRef(null);
    return (
      E.useEffect(() => {
        const p = h.current;
        ((h.current = a?.current || c.current),
          p !== h.current && u.onAnchorChange(h.current));
      }),
      a ? null : D.jsx(Ht.div, { ...s, ref: f })
    );
  });
X1.displayName = Q1;
var _p = "PopperContent",
  [P8, j8] = G1(_p),
  W1 = E.forwardRef((e, t) => {
    const {
        __scopePopper: o,
        side: a = "bottom",
        sideOffset: s = 0,
        align: u = "center",
        alignOffset: c = 0,
        arrowPadding: f = 0,
        avoidCollisions: h = !0,
        collisionBoundary: p = [],
        collisionPadding: v = 0,
        sticky: y = "partial",
        hideWhenDetached: g = !1,
        updatePositionStrategy: S = "optimized",
        onPlaced: w,
        ..._
      } = e,
      T = Y1(_p, o),
      [A, N] = E.useState(null),
      P = Kt(t, (le) => N(le)),
      [k, H] = E.useState(null),
      F = bz(k),
      Z = F?.width ?? 0,
      B = F?.height ?? 0,
      re = a + (u !== "center" ? "-" + u : ""),
      ae =
        typeof v == "number"
          ? v
          : { top: 0, right: 0, bottom: 0, left: 0, ...v },
      he = Array.isArray(p) ? p : [p],
      se = he.length > 0,
      ve = { padding: ae, boundary: he.filter(k8), altBoundary: se },
      {
        refs: me,
        floatingStyles: ye,
        placement: z,
        isPositioned: K,
        middlewareData: q,
      } = w8({
        strategy: "fixed",
        placement: re,
        whileElementsMounted: (...le) =>
          f8(...le, { animationFrame: S === "always" }),
        elements: { reference: T.anchor },
        middleware: [
          x8({ mainAxis: s + B, alignmentAxis: c }),
          h &&
            E8({
              mainAxis: !0,
              crossAxis: !1,
              limiter: y === "partial" ? R8() : void 0,
              ...ve,
            }),
          h && T8({ ...ve }),
          C8({
            ...ve,
            apply: ({
              elements: le,
              rects: de,
              availableWidth: ke,
              availableHeight: dt,
            }) => {
              const { width: ht, height: Ge } = de.reference,
                ln = le.floating.style;
              (ln.setProperty("--radix-popper-available-width", `${ke}px`),
                ln.setProperty("--radix-popper-available-height", `${dt}px`),
                ln.setProperty("--radix-popper-anchor-width", `${ht}px`),
                ln.setProperty("--radix-popper-anchor-height", `${Ge}px`));
            },
          }),
          k && A8({ element: k, padding: f }),
          L8({ arrowWidth: Z, arrowHeight: B }),
          g && O8({ strategy: "referenceHidden", ...ve }),
        ],
      }),
      [W, C] = tw(z),
      G = Sr(w);
    no(() => {
      K && G?.();
    }, [K, G]);
    const ne = q.arrow?.x,
      $ = q.arrow?.y,
      J = q.arrow?.centerOffset !== 0,
      [ie, oe] = E.useState();
    return (
      no(() => {
        A && oe(window.getComputedStyle(A).zIndex);
      }, [A]),
      D.jsx("div", {
        ref: me.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ye,
          transform: K ? ye.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: ie,
          "--radix-popper-transform-origin": [
            q.transformOrigin?.x,
            q.transformOrigin?.y,
          ].join(" "),
          ...(q.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: D.jsx(P8, {
          scope: o,
          placedSide: W,
          onArrowChange: H,
          arrowX: ne,
          arrowY: $,
          shouldHideArrow: J,
          children: D.jsx(Ht.div, {
            "data-side": W,
            "data-align": C,
            ..._,
            ref: P,
            style: { ..._.style, animation: K ? void 0 : "none" },
          }),
        }),
      })
    );
  });
W1.displayName = _p;
var J1 = "PopperArrow",
  N8 = { top: "bottom", right: "left", bottom: "top", left: "right" },
  ew = E.forwardRef(function (t, o) {
    const { __scopePopper: a, ...s } = t,
      u = j8(J1, a),
      c = N8[u.placedSide];
    return D.jsx("span", {
      ref: u.onArrowChange,
      style: {
        position: "absolute",
        left: u.arrowX,
        top: u.arrowY,
        [c]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[u.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[u.placedSide],
        visibility: u.shouldHideArrow ? "hidden" : void 0,
      },
      children: D.jsx(D8, {
        ...s,
        ref: o,
        style: { ...s.style, display: "block" },
      }),
    });
  });
ew.displayName = J1;
function k8(e) {
  return e !== null;
}
var L8 = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: o, rects: a, middlewareData: s } = t,
      c = s.arrow?.centerOffset !== 0,
      f = c ? 0 : e.arrowWidth,
      h = c ? 0 : e.arrowHeight,
      [p, v] = tw(o),
      y = { start: "0%", center: "50%", end: "100%" }[v],
      g = (s.arrow?.x ?? 0) + f / 2,
      S = (s.arrow?.y ?? 0) + h / 2;
    let w = "",
      _ = "";
    return (
      p === "bottom"
        ? ((w = c ? y : `${g}px`), (_ = `${-h}px`))
        : p === "top"
          ? ((w = c ? y : `${g}px`), (_ = `${a.floating.height + h}px`))
          : p === "right"
            ? ((w = `${-h}px`), (_ = c ? y : `${S}px`))
            : p === "left" &&
              ((w = `${a.floating.width + h}px`), (_ = c ? y : `${S}px`)),
      { data: { x: w, y: _ } }
    );
  },
});
function tw(e) {
  const [t, o = "center"] = e.split("-");
  return [t, o];
}
var U8 = K1,
  B8 = X1,
  I8 = W1,
  H8 = ew,
  nh = "rovingFocusGroup.onEntryFocus",
  q8 = { bubbles: !1, cancelable: !0 },
  qs = "RovingFocusGroup",
  [Uh, nw, V8] = y1(qs),
  [Z8, rw] = Bs(qs, [V8]),
  [$8, G8] = Z8(qs),
  ow = E.forwardRef((e, t) =>
    D.jsx(Uh.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: D.jsx(Uh.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: D.jsx(F8, { ...e, ref: t }),
      }),
    }),
  );
ow.displayName = qs;
var F8 = E.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: o,
        orientation: a,
        loop: s = !1,
        dir: u,
        currentTabStopId: c,
        defaultCurrentTabStopId: f,
        onCurrentTabStopIdChange: h,
        onEntryFocus: p,
        preventScrollOnEntryFocus: v = !1,
        ...y
      } = e,
      g = E.useRef(null),
      S = Kt(t, g),
      w = g1(u),
      [_, T] = v1({ prop: c, defaultProp: f ?? null, onChange: h, caller: qs }),
      [A, N] = E.useState(!1),
      P = Sr(p),
      k = nw(o),
      H = E.useRef(!1),
      [F, Z] = E.useState(0);
    return (
      E.useEffect(() => {
        const B = g.current;
        if (B)
          return (
            B.addEventListener(nh, P),
            () => B.removeEventListener(nh, P)
          );
      }, [P]),
      D.jsx($8, {
        scope: o,
        orientation: a,
        dir: w,
        loop: s,
        currentTabStopId: _,
        onItemFocus: E.useCallback((B) => T(B), [T]),
        onItemShiftTab: E.useCallback(() => N(!0), []),
        onFocusableItemAdd: E.useCallback(() => Z((B) => B + 1), []),
        onFocusableItemRemove: E.useCallback(() => Z((B) => B - 1), []),
        children: D.jsx(Ht.div, {
          tabIndex: A || F === 0 ? -1 : 0,
          "data-orientation": a,
          ...y,
          ref: S,
          style: { outline: "none", ...e.style },
          onMouseDown: ze(e.onMouseDown, () => {
            H.current = !0;
          }),
          onFocus: ze(e.onFocus, (B) => {
            const re = !H.current;
            if (B.target === B.currentTarget && re && !A) {
              const ae = new CustomEvent(nh, q8);
              if ((B.currentTarget.dispatchEvent(ae), !ae.defaultPrevented)) {
                const he = k().filter((z) => z.focusable),
                  se = he.find((z) => z.active),
                  ve = he.find((z) => z.id === _),
                  ye = [se, ve, ...he]
                    .filter(Boolean)
                    .map((z) => z.ref.current);
                sw(ye, v);
              }
            }
            H.current = !1;
          }),
          onBlur: ze(e.onBlur, () => N(!1)),
        }),
      })
    );
  }),
  aw = "RovingFocusGroupItem",
  iw = E.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: o,
        focusable: a = !0,
        active: s = !1,
        tabStopId: u,
        children: c,
        ...f
      } = e,
      h = zh(),
      p = u || h,
      v = G8(aw, o),
      y = v.currentTabStopId === p,
      g = nw(o),
      {
        onFocusableItemAdd: S,
        onFocusableItemRemove: w,
        currentTabStopId: _,
      } = v;
    return (
      E.useEffect(() => {
        if (a) return (S(), () => w());
      }, [a, S, w]),
      D.jsx(Uh.ItemSlot, {
        scope: o,
        id: p,
        focusable: a,
        active: s,
        children: D.jsx(Ht.span, {
          tabIndex: y ? 0 : -1,
          "data-orientation": v.orientation,
          ...f,
          ref: t,
          onMouseDown: ze(e.onMouseDown, (T) => {
            a ? v.onItemFocus(p) : T.preventDefault();
          }),
          onFocus: ze(e.onFocus, () => v.onItemFocus(p)),
          onKeyDown: ze(e.onKeyDown, (T) => {
            if (T.key === "Tab" && T.shiftKey) {
              v.onItemShiftTab();
              return;
            }
            if (T.target !== T.currentTarget) return;
            const A = Q8(T, v.orientation, v.dir);
            if (A !== void 0) {
              if (T.metaKey || T.ctrlKey || T.altKey || T.shiftKey) return;
              T.preventDefault();
              let P = g()
                .filter((k) => k.focusable)
                .map((k) => k.ref.current);
              if (A === "last") P.reverse();
              else if (A === "prev" || A === "next") {
                A === "prev" && P.reverse();
                const k = P.indexOf(T.currentTarget);
                P = v.loop ? X8(P, k + 1) : P.slice(k + 1);
              }
              setTimeout(() => sw(P));
            }
          }),
          children:
            typeof c == "function"
              ? c({ isCurrentTabStop: y, hasTabStop: _ != null })
              : c,
        }),
      })
    );
  });
iw.displayName = aw;
var Y8 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function K8(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function Q8(e, t, o) {
  const a = K8(e.key, o);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a))
  )
    return Y8[a];
}
function sw(e, t = !1) {
  const o = document.activeElement;
  for (const a of e)
    if (
      a === o ||
      (a.focus({ preventScroll: t }), document.activeElement !== o)
    )
      return;
}
function X8(e, t) {
  return e.map((o, a) => e[(t + a) % e.length]);
}
var W8 = ow,
  J8 = iw,
  Bh = ["Enter", " "],
  eP = ["ArrowDown", "PageUp", "Home"],
  lw = ["ArrowUp", "PageDown", "End"],
  tP = [...eP, ...lw],
  nP = { ltr: [...Bh, "ArrowRight"], rtl: [...Bh, "ArrowLeft"] },
  rP = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  Vs = "Menu",
  [zs, oP, aP] = y1(Vs),
  [qo, uw] = Bs(Vs, [aP, F1, rw]),
  hc = F1(),
  cw = rw(),
  [iP, Vo] = qo(Vs),
  [sP, Zs] = qo(Vs),
  fw = (e) => {
    const {
        __scopeMenu: t,
        open: o = !1,
        children: a,
        dir: s,
        onOpenChange: u,
        modal: c = !0,
      } = e,
      f = hc(t),
      [h, p] = E.useState(null),
      v = E.useRef(!1),
      y = Sr(u),
      g = g1(s);
    return (
      E.useEffect(() => {
        const S = () => {
            ((v.current = !0),
              document.addEventListener("pointerdown", w, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", w, {
                capture: !0,
                once: !0,
              }));
          },
          w = () => (v.current = !1);
        return (
          document.addEventListener("keydown", S, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", S, { capture: !0 }),
              document.removeEventListener("pointerdown", w, { capture: !0 }),
              document.removeEventListener("pointermove", w, { capture: !0 }));
          }
        );
      }, []),
      D.jsx(U8, {
        ...f,
        children: D.jsx(iP, {
          scope: t,
          open: o,
          onOpenChange: y,
          content: h,
          onContentChange: p,
          children: D.jsx(sP, {
            scope: t,
            onClose: E.useCallback(() => y(!1), [y]),
            isUsingKeyboardRef: v,
            dir: g,
            modal: c,
            children: a,
          }),
        }),
      })
    );
  };
fw.displayName = Vs;
var lP = "MenuAnchor",
  xp = E.forwardRef((e, t) => {
    const { __scopeMenu: o, ...a } = e,
      s = hc(o);
    return D.jsx(B8, { ...s, ...a, ref: t });
  });
xp.displayName = lP;
var Ep = "MenuPortal",
  [uP, dw] = qo(Ep, { forceMount: void 0 }),
  hw = (e) => {
    const { __scopeMenu: t, forceMount: o, children: a, container: s } = e,
      u = Vo(Ep, t);
    return D.jsx(uP, {
      scope: t,
      forceMount: o,
      children: D.jsx(Is, {
        present: o || u.open,
        children: D.jsx(E1, { asChild: !0, container: s, children: a }),
      }),
    });
  };
hw.displayName = Ep;
var Sn = "MenuContent",
  [cP, Rp] = qo(Sn),
  pw = E.forwardRef((e, t) => {
    const o = dw(Sn, e.__scopeMenu),
      { forceMount: a = o.forceMount, ...s } = e,
      u = Vo(Sn, e.__scopeMenu),
      c = Zs(Sn, e.__scopeMenu);
    return D.jsx(zs.Provider, {
      scope: e.__scopeMenu,
      children: D.jsx(Is, {
        present: a || u.open,
        children: D.jsx(zs.Slot, {
          scope: e.__scopeMenu,
          children: c.modal
            ? D.jsx(fP, { ...s, ref: t })
            : D.jsx(dP, { ...s, ref: t }),
        }),
      }),
    });
  }),
  fP = E.forwardRef((e, t) => {
    const o = Vo(Sn, e.__scopeMenu),
      a = E.useRef(null),
      s = Kt(t, a);
    return (
      E.useEffect(() => {
        const u = a.current;
        if (u) return gz(u);
      }, []),
      D.jsx(Tp, {
        ...e,
        ref: s,
        trapFocus: o.open,
        disableOutsidePointerEvents: o.open,
        disableOutsideScroll: !0,
        onFocusOutside: ze(e.onFocusOutside, (u) => u.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => o.onOpenChange(!1),
      })
    );
  }),
  dP = E.forwardRef((e, t) => {
    const o = Vo(Sn, e.__scopeMenu);
    return D.jsx(Tp, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => o.onOpenChange(!1),
    });
  }),
  hP = As("MenuContent.ScrollLock"),
  Tp = E.forwardRef((e, t) => {
    const {
        __scopeMenu: o,
        loop: a = !1,
        trapFocus: s,
        onOpenAutoFocus: u,
        onCloseAutoFocus: c,
        disableOutsidePointerEvents: f,
        onEntryFocus: h,
        onEscapeKeyDown: p,
        onPointerDownOutside: v,
        onFocusOutside: y,
        onInteractOutside: g,
        onDismiss: S,
        disableOutsideScroll: w,
        ..._
      } = e,
      T = Vo(Sn, o),
      A = Zs(Sn, o),
      N = hc(o),
      P = cw(o),
      k = oP(o),
      [H, F] = E.useState(null),
      Z = E.useRef(null),
      B = Kt(t, Z, T.onContentChange),
      re = E.useRef(0),
      ae = E.useRef(""),
      he = E.useRef(0),
      se = E.useRef(null),
      ve = E.useRef("right"),
      me = E.useRef(0),
      ye = w ? z1 : E.Fragment,
      z = w ? { as: hP, allowPinchZoom: !0 } : void 0,
      K = (W) => {
        const C = ae.current + W,
          G = k().filter((le) => !le.disabled),
          ne = document.activeElement,
          $ = G.find((le) => le.ref.current === ne)?.textValue,
          J = G.map((le) => le.textValue),
          ie = RP(J, C, $),
          oe = G.find((le) => le.textValue === ie)?.ref.current;
        ((function le(de) {
          ((ae.current = de),
            window.clearTimeout(re.current),
            de !== "" && (re.current = window.setTimeout(() => le(""), 1e3)));
        })(C),
          oe && setTimeout(() => oe.focus()));
      };
    (E.useEffect(() => () => window.clearTimeout(re.current), []), zD());
    const q = E.useCallback(
      (W) => ve.current === se.current?.side && CP(W, se.current?.area),
      [],
    );
    return D.jsx(cP, {
      scope: o,
      searchRef: ae,
      onItemEnter: E.useCallback(
        (W) => {
          q(W) && W.preventDefault();
        },
        [q],
      ),
      onItemLeave: E.useCallback(
        (W) => {
          q(W) || (Z.current?.focus(), F(null));
        },
        [q],
      ),
      onTriggerLeave: E.useCallback(
        (W) => {
          q(W) && W.preventDefault();
        },
        [q],
      ),
      pointerGraceTimerRef: he,
      onPointerGraceIntentChange: E.useCallback((W) => {
        se.current = W;
      }, []),
      children: D.jsx(ye, {
        ...z,
        children: D.jsx(_1, {
          asChild: !0,
          trapped: s,
          onMountAutoFocus: ze(u, (W) => {
            (W.preventDefault(), Z.current?.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: c,
          children: D.jsx(S1, {
            asChild: !0,
            disableOutsidePointerEvents: f,
            onEscapeKeyDown: p,
            onPointerDownOutside: v,
            onFocusOutside: y,
            onInteractOutside: g,
            onDismiss: S,
            children: D.jsx(W8, {
              asChild: !0,
              ...P,
              dir: A.dir,
              orientation: "vertical",
              loop: a,
              currentTabStopId: H,
              onCurrentTabStopIdChange: F,
              onEntryFocus: ze(h, (W) => {
                A.isUsingKeyboardRef.current || W.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: D.jsx(I8, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": Mw(T.open),
                "data-radix-menu-content": "",
                dir: A.dir,
                ...N,
                ..._,
                ref: B,
                style: { outline: "none", ..._.style },
                onKeyDown: ze(_.onKeyDown, (W) => {
                  const G =
                      W.target.closest("[data-radix-menu-content]") ===
                      W.currentTarget,
                    ne = W.ctrlKey || W.altKey || W.metaKey,
                    $ = W.key.length === 1;
                  G &&
                    (W.key === "Tab" && W.preventDefault(),
                    !ne && $ && K(W.key));
                  const J = Z.current;
                  if (W.target !== J || !tP.includes(W.key)) return;
                  W.preventDefault();
                  const oe = k()
                    .filter((le) => !le.disabled)
                    .map((le) => le.ref.current);
                  (lw.includes(W.key) && oe.reverse(), xP(oe));
                }),
                onBlur: ze(e.onBlur, (W) => {
                  W.currentTarget.contains(W.target) ||
                    (window.clearTimeout(re.current), (ae.current = ""));
                }),
                onPointerMove: ze(
                  e.onPointerMove,
                  Ps((W) => {
                    const C = W.target,
                      G = me.current !== W.clientX;
                    if (W.currentTarget.contains(C) && G) {
                      const ne = W.clientX > me.current ? "right" : "left";
                      ((ve.current = ne), (me.current = W.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
pw.displayName = Sn;
var pP = "MenuGroup",
  Cp = E.forwardRef((e, t) => {
    const { __scopeMenu: o, ...a } = e;
    return D.jsx(Ht.div, { role: "group", ...a, ref: t });
  });
Cp.displayName = pP;
var mP = "MenuLabel",
  mw = E.forwardRef((e, t) => {
    const { __scopeMenu: o, ...a } = e;
    return D.jsx(Ht.div, { ...a, ref: t });
  });
mw.displayName = mP;
var $u = "MenuItem",
  wb = "menu.itemSelect",
  pc = E.forwardRef((e, t) => {
    const { disabled: o = !1, onSelect: a, ...s } = e,
      u = E.useRef(null),
      c = Zs($u, e.__scopeMenu),
      f = Rp($u, e.__scopeMenu),
      h = Kt(t, u),
      p = E.useRef(!1),
      v = () => {
        const y = u.current;
        if (!o && y) {
          const g = new CustomEvent(wb, { bubbles: !0, cancelable: !0 });
          (y.addEventListener(wb, (S) => a?.(S), { once: !0 }),
            m1(y, g),
            g.defaultPrevented ? (p.current = !1) : c.onClose());
        }
      };
    return D.jsx(yw, {
      ...s,
      ref: h,
      disabled: o,
      onClick: ze(e.onClick, v),
      onPointerDown: (y) => {
        (e.onPointerDown?.(y), (p.current = !0));
      },
      onPointerUp: ze(e.onPointerUp, (y) => {
        p.current || y.currentTarget?.click();
      }),
      onKeyDown: ze(e.onKeyDown, (y) => {
        const g = f.searchRef.current !== "";
        o ||
          (g && y.key === " ") ||
          (Bh.includes(y.key) && (y.currentTarget.click(), y.preventDefault()));
      }),
    });
  });
pc.displayName = $u;
var yw = E.forwardRef((e, t) => {
    const { __scopeMenu: o, disabled: a = !1, textValue: s, ...u } = e,
      c = Rp($u, o),
      f = cw(o),
      h = E.useRef(null),
      p = Kt(t, h),
      [v, y] = E.useState(!1),
      [g, S] = E.useState("");
    return (
      E.useEffect(() => {
        const w = h.current;
        w && S((w.textContent ?? "").trim());
      }, [u.children]),
      D.jsx(zs.ItemSlot, {
        scope: o,
        disabled: a,
        textValue: s ?? g,
        children: D.jsx(J8, {
          asChild: !0,
          ...f,
          focusable: !a,
          children: D.jsx(Ht.div, {
            role: "menuitem",
            "data-highlighted": v ? "" : void 0,
            "aria-disabled": a || void 0,
            "data-disabled": a ? "" : void 0,
            ...u,
            ref: p,
            onPointerMove: ze(
              e.onPointerMove,
              Ps((w) => {
                a
                  ? c.onItemLeave(w)
                  : (c.onItemEnter(w),
                    w.defaultPrevented ||
                      w.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: ze(
              e.onPointerLeave,
              Ps((w) => c.onItemLeave(w)),
            ),
            onFocus: ze(e.onFocus, () => y(!0)),
            onBlur: ze(e.onBlur, () => y(!1)),
          }),
        }),
      })
    );
  }),
  yP = "MenuCheckboxItem",
  vw = E.forwardRef((e, t) => {
    const { checked: o = !1, onCheckedChange: a, ...s } = e;
    return D.jsx(_w, {
      scope: e.__scopeMenu,
      checked: o,
      children: D.jsx(pc, {
        role: "menuitemcheckbox",
        "aria-checked": Gu(o) ? "mixed" : o,
        ...s,
        ref: t,
        "data-state": Ap(o),
        onSelect: ze(s.onSelect, () => a?.(Gu(o) ? !0 : !o), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
vw.displayName = yP;
var gw = "MenuRadioGroup",
  [vP, gP] = qo(gw, { value: void 0, onValueChange: () => {} }),
  bw = E.forwardRef((e, t) => {
    const { value: o, onValueChange: a, ...s } = e,
      u = Sr(a);
    return D.jsx(vP, {
      scope: e.__scopeMenu,
      value: o,
      onValueChange: u,
      children: D.jsx(Cp, { ...s, ref: t }),
    });
  });
bw.displayName = gw;
var Sw = "MenuRadioItem",
  ww = E.forwardRef((e, t) => {
    const { value: o, ...a } = e,
      s = gP(Sw, e.__scopeMenu),
      u = o === s.value;
    return D.jsx(_w, {
      scope: e.__scopeMenu,
      checked: u,
      children: D.jsx(pc, {
        role: "menuitemradio",
        "aria-checked": u,
        ...a,
        ref: t,
        "data-state": Ap(u),
        onSelect: ze(a.onSelect, () => s.onValueChange?.(o), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
ww.displayName = Sw;
var Op = "MenuItemIndicator",
  [_w, bP] = qo(Op, { checked: !1 }),
  xw = E.forwardRef((e, t) => {
    const { __scopeMenu: o, forceMount: a, ...s } = e,
      u = bP(Op, o);
    return D.jsx(Is, {
      present: a || Gu(u.checked) || u.checked === !0,
      children: D.jsx(Ht.span, { ...s, ref: t, "data-state": Ap(u.checked) }),
    });
  });
xw.displayName = Op;
var SP = "MenuSeparator",
  Ew = E.forwardRef((e, t) => {
    const { __scopeMenu: o, ...a } = e;
    return D.jsx(Ht.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...a,
      ref: t,
    });
  });
Ew.displayName = SP;
var wP = "MenuArrow",
  Rw = E.forwardRef((e, t) => {
    const { __scopeMenu: o, ...a } = e,
      s = hc(o);
    return D.jsx(H8, { ...s, ...a, ref: t });
  });
Rw.displayName = wP;
var _P = "MenuSub",
  [tj, Tw] = qo(_P),
  ms = "MenuSubTrigger",
  Cw = E.forwardRef((e, t) => {
    const o = Vo(ms, e.__scopeMenu),
      a = Zs(ms, e.__scopeMenu),
      s = Tw(ms, e.__scopeMenu),
      u = Rp(ms, e.__scopeMenu),
      c = E.useRef(null),
      { pointerGraceTimerRef: f, onPointerGraceIntentChange: h } = u,
      p = { __scopeMenu: e.__scopeMenu },
      v = E.useCallback(() => {
        (c.current && window.clearTimeout(c.current), (c.current = null));
      }, []);
    return (
      E.useEffect(() => v, [v]),
      E.useEffect(() => {
        const y = f.current;
        return () => {
          (window.clearTimeout(y), h(null));
        };
      }, [f, h]),
      D.jsx(xp, {
        asChild: !0,
        ...p,
        children: D.jsx(yw, {
          id: s.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": o.open,
          "aria-controls": s.contentId,
          "data-state": Mw(o.open),
          ...e,
          ref: sc(t, s.onTriggerChange),
          onClick: (y) => {
            (e.onClick?.(y),
              !(e.disabled || y.defaultPrevented) &&
                (y.currentTarget.focus(), o.open || o.onOpenChange(!0)));
          },
          onPointerMove: ze(
            e.onPointerMove,
            Ps((y) => {
              (u.onItemEnter(y),
                !y.defaultPrevented &&
                  !e.disabled &&
                  !o.open &&
                  !c.current &&
                  (u.onPointerGraceIntentChange(null),
                  (c.current = window.setTimeout(() => {
                    (o.onOpenChange(!0), v());
                  }, 100))));
            }),
          ),
          onPointerLeave: ze(
            e.onPointerLeave,
            Ps((y) => {
              v();
              const g = o.content?.getBoundingClientRect();
              if (g) {
                const S = o.content?.dataset.side,
                  w = S === "right",
                  _ = w ? -5 : 5,
                  T = g[w ? "left" : "right"],
                  A = g[w ? "right" : "left"];
                (u.onPointerGraceIntentChange({
                  area: [
                    { x: y.clientX + _, y: y.clientY },
                    { x: T, y: g.top },
                    { x: A, y: g.top },
                    { x: A, y: g.bottom },
                    { x: T, y: g.bottom },
                  ],
                  side: S,
                }),
                  window.clearTimeout(f.current),
                  (f.current = window.setTimeout(
                    () => u.onPointerGraceIntentChange(null),
                    300,
                  )));
              } else {
                if ((u.onTriggerLeave(y), y.defaultPrevented)) return;
                u.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: ze(e.onKeyDown, (y) => {
            const g = u.searchRef.current !== "";
            e.disabled ||
              (g && y.key === " ") ||
              (nP[a.dir].includes(y.key) &&
                (o.onOpenChange(!0), o.content?.focus(), y.preventDefault()));
          }),
        }),
      })
    );
  });
Cw.displayName = ms;
var Ow = "MenuSubContent",
  Aw = E.forwardRef((e, t) => {
    const o = dw(Sn, e.__scopeMenu),
      { forceMount: a = o.forceMount, ...s } = e,
      u = Vo(Sn, e.__scopeMenu),
      c = Zs(Sn, e.__scopeMenu),
      f = Tw(Ow, e.__scopeMenu),
      h = E.useRef(null),
      p = Kt(t, h);
    return D.jsx(zs.Provider, {
      scope: e.__scopeMenu,
      children: D.jsx(Is, {
        present: a || u.open,
        children: D.jsx(zs.Slot, {
          scope: e.__scopeMenu,
          children: D.jsx(Tp, {
            id: f.contentId,
            "aria-labelledby": f.triggerId,
            ...s,
            ref: p,
            align: "start",
            side: c.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (v) => {
              (c.isUsingKeyboardRef.current && h.current?.focus(),
                v.preventDefault());
            },
            onCloseAutoFocus: (v) => v.preventDefault(),
            onFocusOutside: ze(e.onFocusOutside, (v) => {
              v.target !== f.trigger && u.onOpenChange(!1);
            }),
            onEscapeKeyDown: ze(e.onEscapeKeyDown, (v) => {
              (c.onClose(), v.preventDefault());
            }),
            onKeyDown: ze(e.onKeyDown, (v) => {
              const y = v.currentTarget.contains(v.target),
                g = rP[c.dir].includes(v.key);
              y &&
                g &&
                (u.onOpenChange(!1), f.trigger?.focus(), v.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
Aw.displayName = Ow;
function Mw(e) {
  return e ? "open" : "closed";
}
function Gu(e) {
  return e === "indeterminate";
}
function Ap(e) {
  return Gu(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function xP(e) {
  const t = document.activeElement;
  for (const o of e)
    if (o === t || (o.focus(), document.activeElement !== t)) return;
}
function EP(e, t) {
  return e.map((o, a) => e[(t + a) % e.length]);
}
function RP(e, t, o) {
  const s = t.length > 1 && Array.from(t).every((p) => p === t[0]) ? t[0] : t,
    u = o ? e.indexOf(o) : -1;
  let c = EP(e, Math.max(u, 0));
  s.length === 1 && (c = c.filter((p) => p !== o));
  const h = c.find((p) => p.toLowerCase().startsWith(s.toLowerCase()));
  return h !== o ? h : void 0;
}
function TP(e, t) {
  const { x: o, y: a } = e;
  let s = !1;
  for (let u = 0, c = t.length - 1; u < t.length; c = u++) {
    const f = t[u],
      h = t[c],
      p = f.x,
      v = f.y,
      y = h.x,
      g = h.y;
    v > a != g > a && o < ((y - p) * (a - v)) / (g - v) + p && (s = !s);
  }
  return s;
}
function CP(e, t) {
  if (!t) return !1;
  const o = { x: e.clientX, y: e.clientY };
  return TP(o, t);
}
function Ps(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var OP = fw,
  AP = xp,
  MP = hw,
  DP = pw,
  zP = Cp,
  PP = mw,
  jP = pc,
  NP = vw,
  kP = bw,
  LP = ww,
  UP = xw,
  BP = Ew,
  IP = Rw,
  HP = Cw,
  qP = Aw,
  mc = "DropdownMenu",
  [VP] = Bs(mc, [uw]),
  qt = uw(),
  [ZP, Dw] = VP(mc),
  zw = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: o,
        dir: a,
        open: s,
        defaultOpen: u,
        onOpenChange: c,
        modal: f = !0,
      } = e,
      h = qt(t),
      p = E.useRef(null),
      [v, y] = v1({ prop: s, defaultProp: u ?? !1, onChange: c, caller: mc });
    return D.jsx(ZP, {
      scope: t,
      triggerId: zh(),
      triggerRef: p,
      contentId: zh(),
      open: v,
      onOpenChange: y,
      onOpenToggle: E.useCallback(() => y((g) => !g), [y]),
      modal: f,
      children: D.jsx(OP, {
        ...h,
        open: v,
        onOpenChange: y,
        dir: a,
        modal: f,
        children: o,
      }),
    });
  };
zw.displayName = mc;
var Pw = "DropdownMenuTrigger",
  jw = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, disabled: a = !1, ...s } = e,
      u = Dw(Pw, o),
      c = qt(o);
    return D.jsx(AP, {
      asChild: !0,
      ...c,
      children: D.jsx(Ht.button, {
        type: "button",
        id: u.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": u.open,
        "aria-controls": u.open ? u.contentId : void 0,
        "data-state": u.open ? "open" : "closed",
        "data-disabled": a ? "" : void 0,
        disabled: a,
        ...s,
        ref: sc(t, u.triggerRef),
        onPointerDown: ze(e.onPointerDown, (f) => {
          !a &&
            f.button === 0 &&
            f.ctrlKey === !1 &&
            (u.onOpenToggle(), u.open || f.preventDefault());
        }),
        onKeyDown: ze(e.onKeyDown, (f) => {
          a ||
            (["Enter", " "].includes(f.key) && u.onOpenToggle(),
            f.key === "ArrowDown" && u.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(f.key) && f.preventDefault());
        }),
      }),
    });
  });
jw.displayName = Pw;
var $P = "DropdownMenuPortal",
  Nw = (e) => {
    const { __scopeDropdownMenu: t, ...o } = e,
      a = qt(t);
    return D.jsx(MP, { ...a, ...o });
  };
Nw.displayName = $P;
var kw = "DropdownMenuContent",
  Lw = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = Dw(kw, o),
      u = qt(o),
      c = E.useRef(!1);
    return D.jsx(DP, {
      id: s.contentId,
      "aria-labelledby": s.triggerId,
      ...u,
      ...a,
      ref: t,
      onCloseAutoFocus: ze(e.onCloseAutoFocus, (f) => {
        (c.current || s.triggerRef.current?.focus(),
          (c.current = !1),
          f.preventDefault());
      }),
      onInteractOutside: ze(e.onInteractOutside, (f) => {
        const h = f.detail.originalEvent,
          p = h.button === 0 && h.ctrlKey === !0,
          v = h.button === 2 || p;
        (!s.modal || v) && (c.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Lw.displayName = kw;
var GP = "DropdownMenuGroup",
  FP = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(zP, { ...s, ...a, ref: t });
  });
FP.displayName = GP;
var YP = "DropdownMenuLabel",
  KP = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(PP, { ...s, ...a, ref: t });
  });
KP.displayName = YP;
var QP = "DropdownMenuItem",
  Uw = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(jP, { ...s, ...a, ref: t });
  });
Uw.displayName = QP;
var XP = "DropdownMenuCheckboxItem",
  WP = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(NP, { ...s, ...a, ref: t });
  });
WP.displayName = XP;
var JP = "DropdownMenuRadioGroup",
  e6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(kP, { ...s, ...a, ref: t });
  });
e6.displayName = JP;
var t6 = "DropdownMenuRadioItem",
  n6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(LP, { ...s, ...a, ref: t });
  });
n6.displayName = t6;
var r6 = "DropdownMenuItemIndicator",
  o6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(UP, { ...s, ...a, ref: t });
  });
o6.displayName = r6;
var a6 = "DropdownMenuSeparator",
  i6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(BP, { ...s, ...a, ref: t });
  });
i6.displayName = a6;
var s6 = "DropdownMenuArrow",
  l6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(IP, { ...s, ...a, ref: t });
  });
l6.displayName = s6;
var u6 = "DropdownMenuSubTrigger",
  c6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(HP, { ...s, ...a, ref: t });
  });
c6.displayName = u6;
var f6 = "DropdownMenuSubContent",
  d6 = E.forwardRef((e, t) => {
    const { __scopeDropdownMenu: o, ...a } = e,
      s = qt(o);
    return D.jsx(qP, {
      ...s,
      ...a,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
d6.displayName = f6;
var h6 = zw,
  p6 = jw,
  m6 = Nw,
  y6 = Lw,
  v6 = Uw;
const Mp = "-",
  g6 = (e) => {
    const t = S6(e),
      { conflictingClassGroups: o, conflictingClassGroupModifiers: a } = e;
    return {
      getClassGroupId: (c) => {
        const f = c.split(Mp);
        return (f[0] === "" && f.length !== 1 && f.shift(), Bw(f, t) || b6(c));
      },
      getConflictingClassGroupIds: (c, f) => {
        const h = o[c] || [];
        return f && a[c] ? [...h, ...a[c]] : h;
      },
    };
  },
  Bw = (e, t) => {
    if (e.length === 0) return t.classGroupId;
    const o = e[0],
      a = t.nextPart.get(o),
      s = a ? Bw(e.slice(1), a) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const u = e.join(Mp);
    return t.validators.find(({ validator: c }) => c(u))?.classGroupId;
  },
  _b = /^\[(.+)\]$/,
  b6 = (e) => {
    if (_b.test(e)) {
      const t = _b.exec(e)[1],
        o = t?.substring(0, t.indexOf(":"));
      if (o) return "arbitrary.." + o;
    }
  },
  S6 = (e) => {
    const { theme: t, classGroups: o } = e,
      a = { nextPart: new Map(), validators: [] };
    for (const s in o) Ih(o[s], a, s, t);
    return a;
  },
  Ih = (e, t, o, a) => {
    e.forEach((s) => {
      if (typeof s == "string") {
        const u = s === "" ? t : xb(t, s);
        u.classGroupId = o;
        return;
      }
      if (typeof s == "function") {
        if (w6(s)) {
          Ih(s(a), t, o, a);
          return;
        }
        t.validators.push({ validator: s, classGroupId: o });
        return;
      }
      Object.entries(s).forEach(([u, c]) => {
        Ih(c, xb(t, u), o, a);
      });
    });
  },
  xb = (e, t) => {
    let o = e;
    return (
      t.split(Mp).forEach((a) => {
        (o.nextPart.has(a) ||
          o.nextPart.set(a, { nextPart: new Map(), validators: [] }),
          (o = o.nextPart.get(a)));
      }),
      o
    );
  },
  w6 = (e) => e.isThemeGetter,
  _6 = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      o = new Map(),
      a = new Map();
    const s = (u, c) => {
      (o.set(u, c), t++, t > e && ((t = 0), (a = o), (o = new Map())));
    };
    return {
      get(u) {
        let c = o.get(u);
        if (c !== void 0) return c;
        if ((c = a.get(u)) !== void 0) return (s(u, c), c);
      },
      set(u, c) {
        o.has(u) ? o.set(u, c) : s(u, c);
      },
    };
  },
  Hh = "!",
  qh = ":",
  x6 = qh.length,
  E6 = (e) => {
    const { prefix: t, experimentalParseClassName: o } = e;
    let a = (s) => {
      const u = [];
      let c = 0,
        f = 0,
        h = 0,
        p;
      for (let w = 0; w < s.length; w++) {
        let _ = s[w];
        if (c === 0 && f === 0) {
          if (_ === qh) {
            (u.push(s.slice(h, w)), (h = w + x6));
            continue;
          }
          if (_ === "/") {
            p = w;
            continue;
          }
        }
        _ === "[" ? c++ : _ === "]" ? c-- : _ === "(" ? f++ : _ === ")" && f--;
      }
      const v = u.length === 0 ? s : s.substring(h),
        y = R6(v),
        g = y !== v,
        S = p && p > h ? p - h : void 0;
      return {
        modifiers: u,
        hasImportantModifier: g,
        baseClassName: y,
        maybePostfixModifierPosition: S,
      };
    };
    if (t) {
      const s = t + qh,
        u = a;
      a = (c) =>
        c.startsWith(s)
          ? u(c.substring(s.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: c,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (o) {
      const s = a;
      a = (u) => o({ className: u, parseClassName: s });
    }
    return a;
  },
  R6 = (e) =>
    e.endsWith(Hh)
      ? e.substring(0, e.length - 1)
      : e.startsWith(Hh)
        ? e.substring(1)
        : e,
  T6 = (e) => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map((a) => [a, !0]));
    return (a) => {
      if (a.length <= 1) return a;
      const s = [];
      let u = [];
      return (
        a.forEach((c) => {
          c[0] === "[" || t[c] ? (s.push(...u.sort(), c), (u = [])) : u.push(c);
        }),
        s.push(...u.sort()),
        s
      );
    };
  },
  C6 = (e) => ({
    cache: _6(e.cacheSize),
    parseClassName: E6(e),
    sortModifiers: T6(e),
    ...g6(e),
  }),
  O6 = /\s+/,
  A6 = (e, t) => {
    const {
        parseClassName: o,
        getClassGroupId: a,
        getConflictingClassGroupIds: s,
        sortModifiers: u,
      } = t,
      c = [],
      f = e.trim().split(O6);
    let h = "";
    for (let p = f.length - 1; p >= 0; p -= 1) {
      const v = f[p],
        {
          isExternal: y,
          modifiers: g,
          hasImportantModifier: S,
          baseClassName: w,
          maybePostfixModifierPosition: _,
        } = o(v);
      if (y) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      let T = !!_,
        A = a(T ? w.substring(0, _) : w);
      if (!A) {
        if (!T) {
          h = v + (h.length > 0 ? " " + h : h);
          continue;
        }
        if (((A = a(w)), !A)) {
          h = v + (h.length > 0 ? " " + h : h);
          continue;
        }
        T = !1;
      }
      const N = u(g).join(":"),
        P = S ? N + Hh : N,
        k = P + A;
      if (c.includes(k)) continue;
      c.push(k);
      const H = s(A, T);
      for (let F = 0; F < H.length; ++F) {
        const Z = H[F];
        c.push(P + Z);
      }
      h = v + (h.length > 0 ? " " + h : h);
    }
    return h;
  };
function M6() {
  let e = 0,
    t,
    o,
    a = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = Iw(t)) && (a && (a += " "), (a += o));
  return a;
}
const Iw = (e) => {
  if (typeof e == "string") return e;
  let t,
    o = "";
  for (let a = 0; a < e.length; a++)
    e[a] && (t = Iw(e[a])) && (o && (o += " "), (o += t));
  return o;
};
function D6(e, ...t) {
  let o,
    a,
    s,
    u = c;
  function c(h) {
    const p = t.reduce((v, y) => y(v), e());
    return ((o = C6(p)), (a = o.cache.get), (s = o.cache.set), (u = f), f(h));
  }
  function f(h) {
    const p = a(h);
    if (p) return p;
    const v = A6(h, o);
    return (s(h, v), v);
  }
  return function () {
    return u(M6.apply(null, arguments));
  };
}
const vt = (e) => {
    const t = (o) => o[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  Hw = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  qw = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  z6 = /^\d+\/\d+$/,
  P6 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  j6 =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  N6 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  k6 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  L6 =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ha = (e) => z6.test(e),
  Re = (e) => !!e && !Number.isNaN(Number(e)),
  Yr = (e) => !!e && Number.isInteger(Number(e)),
  rh = (e) => e.endsWith("%") && Re(e.slice(0, -1)),
  vr = (e) => P6.test(e),
  U6 = () => !0,
  B6 = (e) => j6.test(e) && !N6.test(e),
  Vw = () => !1,
  I6 = (e) => k6.test(e),
  H6 = (e) => L6.test(e),
  q6 = (e) => !ce(e) && !fe(e),
  V6 = (e) => li(e, Gw, Vw),
  ce = (e) => Hw.test(e),
  Do = (e) => li(e, Fw, B6),
  oh = (e) => li(e, Y6, Re),
  Eb = (e) => li(e, Zw, Vw),
  Z6 = (e) => li(e, $w, H6),
  _u = (e) => li(e, Yw, I6),
  fe = (e) => qw.test(e),
  ds = (e) => ui(e, Fw),
  $6 = (e) => ui(e, K6),
  Rb = (e) => ui(e, Zw),
  G6 = (e) => ui(e, Gw),
  F6 = (e) => ui(e, $w),
  xu = (e) => ui(e, Yw, !0),
  li = (e, t, o) => {
    const a = Hw.exec(e);
    return a ? (a[1] ? t(a[1]) : o(a[2])) : !1;
  },
  ui = (e, t, o = !1) => {
    const a = qw.exec(e);
    return a ? (a[1] ? t(a[1]) : o) : !1;
  },
  Zw = (e) => e === "position" || e === "percentage",
  $w = (e) => e === "image" || e === "url",
  Gw = (e) => e === "length" || e === "size" || e === "bg-size",
  Fw = (e) => e === "length",
  Y6 = (e) => e === "number",
  K6 = (e) => e === "family-name",
  Yw = (e) => e === "shadow",
  Q6 = () => {
    const e = vt("color"),
      t = vt("font"),
      o = vt("text"),
      a = vt("font-weight"),
      s = vt("tracking"),
      u = vt("leading"),
      c = vt("breakpoint"),
      f = vt("container"),
      h = vt("spacing"),
      p = vt("radius"),
      v = vt("shadow"),
      y = vt("inset-shadow"),
      g = vt("text-shadow"),
      S = vt("drop-shadow"),
      w = vt("blur"),
      _ = vt("perspective"),
      T = vt("aspect"),
      A = vt("ease"),
      N = vt("animate"),
      P = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      k = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      H = () => [...k(), fe, ce],
      F = () => ["auto", "hidden", "clip", "visible", "scroll"],
      Z = () => ["auto", "contain", "none"],
      B = () => [fe, ce, h],
      re = () => [Ha, "full", "auto", ...B()],
      ae = () => [Yr, "none", "subgrid", fe, ce],
      he = () => ["auto", { span: ["full", Yr, fe, ce] }, Yr, fe, ce],
      se = () => [Yr, "auto", fe, ce],
      ve = () => ["auto", "min", "max", "fr", fe, ce],
      me = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      ye = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      z = () => ["auto", ...B()],
      K = () => [
        Ha,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...B(),
      ],
      q = () => [e, fe, ce],
      W = () => [...k(), Rb, Eb, { position: [fe, ce] }],
      C = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      G = () => ["auto", "cover", "contain", G6, V6, { size: [fe, ce] }],
      ne = () => [rh, ds, Do],
      $ = () => ["", "none", "full", p, fe, ce],
      J = () => ["", Re, ds, Do],
      ie = () => ["solid", "dashed", "dotted", "double"],
      oe = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      le = () => [Re, rh, Rb, Eb],
      de = () => ["", "none", w, fe, ce],
      ke = () => ["none", Re, fe, ce],
      dt = () => ["none", Re, fe, ce],
      ht = () => [Re, fe, ce],
      Ge = () => [Ha, "full", ...B()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [vr],
        breakpoint: [vr],
        color: [U6],
        container: [vr],
        "drop-shadow": [vr],
        ease: ["in", "out", "in-out"],
        font: [q6],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [vr],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [vr],
        shadow: [vr],
        spacing: ["px", Re],
        text: [vr],
        "text-shadow": [vr],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Ha, ce, fe, T] }],
        container: ["container"],
        columns: [{ columns: [Re, ce, fe, f] }],
        "break-after": [{ "break-after": P() }],
        "break-before": [{ "break-before": P() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: H() }],
        overflow: [{ overflow: F() }],
        "overflow-x": [{ "overflow-x": F() }],
        "overflow-y": [{ "overflow-y": F() }],
        overscroll: [{ overscroll: Z() }],
        "overscroll-x": [{ "overscroll-x": Z() }],
        "overscroll-y": [{ "overscroll-y": Z() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: re() }],
        "inset-x": [{ "inset-x": re() }],
        "inset-y": [{ "inset-y": re() }],
        start: [{ start: re() }],
        end: [{ end: re() }],
        top: [{ top: re() }],
        right: [{ right: re() }],
        bottom: [{ bottom: re() }],
        left: [{ left: re() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Yr, "auto", fe, ce] }],
        basis: [{ basis: [Ha, "full", "auto", f, ...B()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Re, Ha, "auto", "initial", "none", ce] }],
        grow: [{ grow: ["", Re, fe, ce] }],
        shrink: [{ shrink: ["", Re, fe, ce] }],
        order: [{ order: [Yr, "first", "last", "none", fe, ce] }],
        "grid-cols": [{ "grid-cols": ae() }],
        "col-start-end": [{ col: he() }],
        "col-start": [{ "col-start": se() }],
        "col-end": [{ "col-end": se() }],
        "grid-rows": [{ "grid-rows": ae() }],
        "row-start-end": [{ row: he() }],
        "row-start": [{ "row-start": se() }],
        "row-end": [{ "row-end": se() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ve() }],
        "auto-rows": [{ "auto-rows": ve() }],
        gap: [{ gap: B() }],
        "gap-x": [{ "gap-x": B() }],
        "gap-y": [{ "gap-y": B() }],
        "justify-content": [{ justify: [...me(), "normal"] }],
        "justify-items": [{ "justify-items": [...ye(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...ye()] }],
        "align-content": [{ content: ["normal", ...me()] }],
        "align-items": [{ items: [...ye(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...ye(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": me() }],
        "place-items": [{ "place-items": [...ye(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...ye()] }],
        p: [{ p: B() }],
        px: [{ px: B() }],
        py: [{ py: B() }],
        ps: [{ ps: B() }],
        pe: [{ pe: B() }],
        pt: [{ pt: B() }],
        pr: [{ pr: B() }],
        pb: [{ pb: B() }],
        pl: [{ pl: B() }],
        m: [{ m: z() }],
        mx: [{ mx: z() }],
        my: [{ my: z() }],
        ms: [{ ms: z() }],
        me: [{ me: z() }],
        mt: [{ mt: z() }],
        mr: [{ mr: z() }],
        mb: [{ mb: z() }],
        ml: [{ ml: z() }],
        "space-x": [{ "space-x": B() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": B() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: K() }],
        w: [{ w: [f, "screen", ...K()] }],
        "min-w": [{ "min-w": [f, "screen", "none", ...K()] }],
        "max-w": [
          { "max-w": [f, "screen", "none", "prose", { screen: [c] }, ...K()] },
        ],
        h: [{ h: ["screen", "lh", ...K()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...K()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...K()] }],
        "font-size": [{ text: ["base", o, ds, Do] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [a, fe, oh] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              rh,
              ce,
            ],
          },
        ],
        "font-family": [{ font: [$6, ce, t] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [s, fe, ce] }],
        "line-clamp": [{ "line-clamp": [Re, "none", fe, oh] }],
        leading: [{ leading: [u, ...B()] }],
        "list-image": [{ "list-image": ["none", fe, ce] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", fe, ce] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: q() }],
        "text-color": [{ text: q() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ie(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Re, "from-font", "auto", fe, Do] },
        ],
        "text-decoration-color": [{ decoration: q() }],
        "underline-offset": [{ "underline-offset": [Re, "auto", fe, ce] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: B() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              fe,
              ce,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", fe, ce] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: W() }],
        "bg-repeat": [{ bg: C() }],
        "bg-size": [{ bg: G() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Yr,
                  fe,
                  ce,
                ],
                radial: ["", fe, ce],
                conic: [Yr, fe, ce],
              },
              F6,
              Z6,
            ],
          },
        ],
        "bg-color": [{ bg: q() }],
        "gradient-from-pos": [{ from: ne() }],
        "gradient-via-pos": [{ via: ne() }],
        "gradient-to-pos": [{ to: ne() }],
        "gradient-from": [{ from: q() }],
        "gradient-via": [{ via: q() }],
        "gradient-to": [{ to: q() }],
        rounded: [{ rounded: $() }],
        "rounded-s": [{ "rounded-s": $() }],
        "rounded-e": [{ "rounded-e": $() }],
        "rounded-t": [{ "rounded-t": $() }],
        "rounded-r": [{ "rounded-r": $() }],
        "rounded-b": [{ "rounded-b": $() }],
        "rounded-l": [{ "rounded-l": $() }],
        "rounded-ss": [{ "rounded-ss": $() }],
        "rounded-se": [{ "rounded-se": $() }],
        "rounded-ee": [{ "rounded-ee": $() }],
        "rounded-es": [{ "rounded-es": $() }],
        "rounded-tl": [{ "rounded-tl": $() }],
        "rounded-tr": [{ "rounded-tr": $() }],
        "rounded-br": [{ "rounded-br": $() }],
        "rounded-bl": [{ "rounded-bl": $() }],
        "border-w": [{ border: J() }],
        "border-w-x": [{ "border-x": J() }],
        "border-w-y": [{ "border-y": J() }],
        "border-w-s": [{ "border-s": J() }],
        "border-w-e": [{ "border-e": J() }],
        "border-w-t": [{ "border-t": J() }],
        "border-w-r": [{ "border-r": J() }],
        "border-w-b": [{ "border-b": J() }],
        "border-w-l": [{ "border-l": J() }],
        "divide-x": [{ "divide-x": J() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": J() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ie(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ie(), "hidden", "none"] }],
        "border-color": [{ border: q() }],
        "border-color-x": [{ "border-x": q() }],
        "border-color-y": [{ "border-y": q() }],
        "border-color-s": [{ "border-s": q() }],
        "border-color-e": [{ "border-e": q() }],
        "border-color-t": [{ "border-t": q() }],
        "border-color-r": [{ "border-r": q() }],
        "border-color-b": [{ "border-b": q() }],
        "border-color-l": [{ "border-l": q() }],
        "divide-color": [{ divide: q() }],
        "outline-style": [{ outline: [...ie(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Re, fe, ce] }],
        "outline-w": [{ outline: ["", Re, ds, Do] }],
        "outline-color": [{ outline: q() }],
        shadow: [{ shadow: ["", "none", v, xu, _u] }],
        "shadow-color": [{ shadow: q() }],
        "inset-shadow": [{ "inset-shadow": ["none", y, xu, _u] }],
        "inset-shadow-color": [{ "inset-shadow": q() }],
        "ring-w": [{ ring: J() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: q() }],
        "ring-offset-w": [{ "ring-offset": [Re, Do] }],
        "ring-offset-color": [{ "ring-offset": q() }],
        "inset-ring-w": [{ "inset-ring": J() }],
        "inset-ring-color": [{ "inset-ring": q() }],
        "text-shadow": [{ "text-shadow": ["none", g, xu, _u] }],
        "text-shadow-color": [{ "text-shadow": q() }],
        opacity: [{ opacity: [Re, fe, ce] }],
        "mix-blend": [
          { "mix-blend": [...oe(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": oe() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [Re] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": le() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": le() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": q() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": q() }],
        "mask-image-t-from-pos": [{ "mask-t-from": le() }],
        "mask-image-t-to-pos": [{ "mask-t-to": le() }],
        "mask-image-t-from-color": [{ "mask-t-from": q() }],
        "mask-image-t-to-color": [{ "mask-t-to": q() }],
        "mask-image-r-from-pos": [{ "mask-r-from": le() }],
        "mask-image-r-to-pos": [{ "mask-r-to": le() }],
        "mask-image-r-from-color": [{ "mask-r-from": q() }],
        "mask-image-r-to-color": [{ "mask-r-to": q() }],
        "mask-image-b-from-pos": [{ "mask-b-from": le() }],
        "mask-image-b-to-pos": [{ "mask-b-to": le() }],
        "mask-image-b-from-color": [{ "mask-b-from": q() }],
        "mask-image-b-to-color": [{ "mask-b-to": q() }],
        "mask-image-l-from-pos": [{ "mask-l-from": le() }],
        "mask-image-l-to-pos": [{ "mask-l-to": le() }],
        "mask-image-l-from-color": [{ "mask-l-from": q() }],
        "mask-image-l-to-color": [{ "mask-l-to": q() }],
        "mask-image-x-from-pos": [{ "mask-x-from": le() }],
        "mask-image-x-to-pos": [{ "mask-x-to": le() }],
        "mask-image-x-from-color": [{ "mask-x-from": q() }],
        "mask-image-x-to-color": [{ "mask-x-to": q() }],
        "mask-image-y-from-pos": [{ "mask-y-from": le() }],
        "mask-image-y-to-pos": [{ "mask-y-to": le() }],
        "mask-image-y-from-color": [{ "mask-y-from": q() }],
        "mask-image-y-to-color": [{ "mask-y-to": q() }],
        "mask-image-radial": [{ "mask-radial": [fe, ce] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": le() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": le() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": q() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": q() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": k() }],
        "mask-image-conic-pos": [{ "mask-conic": [Re] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": le() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": le() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": q() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": q() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: W() }],
        "mask-repeat": [{ mask: C() }],
        "mask-size": [{ mask: G() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", fe, ce] }],
        filter: [{ filter: ["", "none", fe, ce] }],
        blur: [{ blur: de() }],
        brightness: [{ brightness: [Re, fe, ce] }],
        contrast: [{ contrast: [Re, fe, ce] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", S, xu, _u] }],
        "drop-shadow-color": [{ "drop-shadow": q() }],
        grayscale: [{ grayscale: ["", Re, fe, ce] }],
        "hue-rotate": [{ "hue-rotate": [Re, fe, ce] }],
        invert: [{ invert: ["", Re, fe, ce] }],
        saturate: [{ saturate: [Re, fe, ce] }],
        sepia: [{ sepia: ["", Re, fe, ce] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", fe, ce] }],
        "backdrop-blur": [{ "backdrop-blur": de() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Re, fe, ce] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Re, fe, ce] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Re, fe, ce] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Re, fe, ce] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Re, fe, ce] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Re, fe, ce] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Re, fe, ce] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Re, fe, ce] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": B() }],
        "border-spacing-x": [{ "border-spacing-x": B() }],
        "border-spacing-y": [{ "border-spacing-y": B() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              fe,
              ce,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Re, "initial", fe, ce] }],
        ease: [{ ease: ["linear", "initial", A, fe, ce] }],
        delay: [{ delay: [Re, fe, ce] }],
        animate: [{ animate: ["none", N, fe, ce] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [_, fe, ce] }],
        "perspective-origin": [{ "perspective-origin": H() }],
        rotate: [{ rotate: ke() }],
        "rotate-x": [{ "rotate-x": ke() }],
        "rotate-y": [{ "rotate-y": ke() }],
        "rotate-z": [{ "rotate-z": ke() }],
        scale: [{ scale: dt() }],
        "scale-x": [{ "scale-x": dt() }],
        "scale-y": [{ "scale-y": dt() }],
        "scale-z": [{ "scale-z": dt() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: ht() }],
        "skew-x": [{ "skew-x": ht() }],
        "skew-y": [{ "skew-y": ht() }],
        transform: [{ transform: [fe, ce, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: H() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Ge() }],
        "translate-x": [{ "translate-x": Ge() }],
        "translate-y": [{ "translate-y": Ge() }],
        "translate-z": [{ "translate-z": Ge() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: q() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: q() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              fe,
              ce,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": B() }],
        "scroll-mx": [{ "scroll-mx": B() }],
        "scroll-my": [{ "scroll-my": B() }],
        "scroll-ms": [{ "scroll-ms": B() }],
        "scroll-me": [{ "scroll-me": B() }],
        "scroll-mt": [{ "scroll-mt": B() }],
        "scroll-mr": [{ "scroll-mr": B() }],
        "scroll-mb": [{ "scroll-mb": B() }],
        "scroll-ml": [{ "scroll-ml": B() }],
        "scroll-p": [{ "scroll-p": B() }],
        "scroll-px": [{ "scroll-px": B() }],
        "scroll-py": [{ "scroll-py": B() }],
        "scroll-ps": [{ "scroll-ps": B() }],
        "scroll-pe": [{ "scroll-pe": B() }],
        "scroll-pt": [{ "scroll-pt": B() }],
        "scroll-pr": [{ "scroll-pr": B() }],
        "scroll-pb": [{ "scroll-pb": B() }],
        "scroll-pl": [{ "scroll-pl": B() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", fe, ce],
          },
        ],
        fill: [{ fill: ["none", ...q()] }],
        "stroke-w": [{ stroke: [Re, ds, Do, oh] }],
        stroke: [{ stroke: ["none", ...q()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  X6 = D6(Q6),
  Dp = (...e) => X6(Dh(e)),
  W6 = W3(
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
          destructive:
            "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
          outline:
            "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
          ghost:
            "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2 has-[>svg]:px-3",
          sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
          lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
          icon: "size-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  );
function J6({ className: e, variant: t, size: o, asChild: a = !1, ...s }) {
  const u = a ? J3 : "button";
  return D.jsx(u, {
    "data-slot": "button",
    className: Dp(W6({ variant: t, size: o, className: e })),
    ...s,
  });
}
function e5({ ...e }) {
  return D.jsx(h6, { "data-slot": "dropdown-menu", ...e });
}
function t5({ ...e }) {
  return D.jsx(p6, { "data-slot": "dropdown-menu-trigger", ...e });
}
function n5({ className: e, sideOffset: t = 4, ...o }) {
  return D.jsx(m6, {
    children: D.jsx(y6, {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: Dp(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e,
      ),
      ...o,
    }),
  });
}
function ah({ className: e, inset: t, variant: o = "default", ...a }) {
  return D.jsx(v6, {
    "data-slot": "dropdown-menu-item",
    "data-inset": t,
    "data-variant": o,
    className: Dp(
      "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      e,
    ),
    ...a,
  });
}
const Kw = ic(["light", "dark", "auto"]),
  Qw = "theme-mode",
  Tb = "light",
  r5 = () => {
    if (typeof window > "u") return Tb;
    try {
      const e = localStorage.getItem(Qw);
      return Kw.parse(e);
    } catch {
      return Tb;
    }
  },
  o5 = (e) => {
    try {
      const t = Kw.parse(e);
      localStorage.setItem(Qw, t);
    } catch {}
  },
  zp = () =>
    typeof window > "u"
      ? "light"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
  Vh = (e) => {
    const t = document.documentElement;
    t.classList.remove("light", "dark", "auto");
    const o = e === "auto" ? zp() : e;
    (t.classList.add(o), e === "auto" && t.classList.add("auto"));
  },
  a5 = () => {
    const e = window.matchMedia("(prefers-color-scheme: dark)"),
      t = () => Vh("auto");
    return (
      e.addEventListener("change", t),
      () => e.removeEventListener("change", t)
    );
  },
  i5 = (e) => {
    const t =
      zp() === "dark" ? ["auto", "light", "dark"] : ["auto", "dark", "light"];
    return t[(t.indexOf(e) + 1) % t.length];
  },
  s5 = (function () {
    function e() {
      const t = (s) => ["light", "dark", "auto"].includes(s),
        o = localStorage.getItem("theme-mode") ?? "light",
        a = t(o) ? o : "light";
      if (a === "auto") {
        const s = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        document.documentElement.classList.add(s, "auto");
      } else document.documentElement.classList.add(a);
    }
    return `(${e.toString()})();`;
  })(),
  Xw = E.createContext(void 0);
function l5({ children: e }) {
  const [t, o] = E.useState(r5);
  E.useEffect(() => {
    if ((Vh(t), t === "auto")) return a5();
  }, [t]);
  const a = t === "auto" ? zp() : t,
    s = (c) => {
      (o(c), o5(c), Vh(c));
    },
    u = () => {
      s(i5(t));
    };
  return D.jsx(Xw, {
    value: { themeMode: t, resolvedTheme: a, setTheme: s, toggleMode: u },
    children: e,
  });
}
function Ww() {
  const e = E.use(Xw);
  if (!e) throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
function u5() {
  const { setTheme: e } = Ww();
  return D.jsxs(e5, {
    children: [
      D.jsx(t5, {
        asChild: !0,
        children: D.jsxs(J6, {
          variant: "outline",
          size: "icon",
          className: "[&>svg]:absolute [&>svg]:size-5 [&>svg]:scale-0",
          children: [
            D.jsx(Q3, { className: "light:scale-100! auto:scale-0!" }),
            D.jsx(Y3, { className: "auto:scale-0! dark:scale-100!" }),
            D.jsx(G3, { className: "auto:scale-100!" }),
            D.jsx("span", { className: "sr-only", children: "Toggle theme" }),
          ],
        }),
      }),
      D.jsxs(n5, {
        align: "end",
        children: [
          D.jsx(ah, { onClick: () => e("light"), children: "Light" }),
          D.jsx(ah, { onClick: () => e("dark"), children: "Dark" }),
          D.jsx(ah, { onClick: () => e("auto"), children: "System" }),
        ],
      }),
    ],
  });
}
function c5(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0],
    o = document.createElement("style");
  ((o.type = "text/css"),
    t.appendChild(o),
    o.styleSheet
      ? (o.styleSheet.cssText = e)
      : o.appendChild(document.createTextNode(e)));
}
const f5 = (e) => {
    switch (e) {
      case "success":
        return p5;
      case "info":
        return y5;
      case "warning":
        return m5;
      case "error":
        return v5;
      default:
        return null;
    }
  },
  d5 = Array(12).fill(0),
  h5 = ({ visible: e, className: t }) =>
    te.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e,
      },
      te.createElement(
        "div",
        { className: "sonner-spinner" },
        d5.map((o, a) =>
          te.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${a}`,
          }),
        ),
      ),
    ),
  p5 = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  m5 = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  y5 = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  v5 = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  g5 = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    te.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    te.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  b5 = () => {
    const [e, t] = te.useState(document.hidden);
    return (
      te.useEffect(() => {
        const o = () => {
          t(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", o),
          () => window.removeEventListener("visibilitychange", o)
        );
      }, []),
      e
    );
  };
let Zh = 1;
class S5 {
  constructor() {
    ((this.subscribe = (t) => (
      this.subscribers.push(t),
      () => {
        const o = this.subscribers.indexOf(t);
        this.subscribers.splice(o, 1);
      }
    )),
      (this.publish = (t) => {
        this.subscribers.forEach((o) => o(t));
      }),
      (this.addToast = (t) => {
        (this.publish(t), (this.toasts = [...this.toasts, t]));
      }),
      (this.create = (t) => {
        var o;
        const { message: a, ...s } = t,
          u =
            typeof t?.id == "number" ||
            ((o = t.id) == null ? void 0 : o.length) > 0
              ? t.id
              : Zh++,
          c = this.toasts.find((h) => h.id === u),
          f = t.dismissible === void 0 ? !0 : t.dismissible;
        return (
          this.dismissedToasts.has(u) && this.dismissedToasts.delete(u),
          c
            ? (this.toasts = this.toasts.map((h) =>
                h.id === u
                  ? (this.publish({ ...h, ...t, id: u, title: a }),
                    { ...h, ...t, id: u, dismissible: f, title: a })
                  : h,
              ))
            : this.addToast({ title: a, ...s, dismissible: f, id: u }),
          u
        );
      }),
      (this.dismiss = (t) => (
        t
          ? (this.dismissedToasts.add(t),
            requestAnimationFrame(() =>
              this.subscribers.forEach((o) => o({ id: t, dismiss: !0 })),
            ))
          : this.toasts.forEach((o) => {
              this.subscribers.forEach((a) => a({ id: o.id, dismiss: !0 }));
            }),
        t
      )),
      (this.message = (t, o) => this.create({ ...o, message: t })),
      (this.error = (t, o) => this.create({ ...o, message: t, type: "error" })),
      (this.success = (t, o) =>
        this.create({ ...o, type: "success", message: t })),
      (this.info = (t, o) => this.create({ ...o, type: "info", message: t })),
      (this.warning = (t, o) =>
        this.create({ ...o, type: "warning", message: t })),
      (this.loading = (t, o) =>
        this.create({ ...o, type: "loading", message: t })),
      (this.promise = (t, o) => {
        if (!o) return;
        let a;
        o.loading !== void 0 &&
          (a = this.create({
            ...o,
            promise: t,
            type: "loading",
            message: o.loading,
            description:
              typeof o.description != "function" ? o.description : void 0,
          }));
        const s = Promise.resolve(t instanceof Function ? t() : t);
        let u = a !== void 0,
          c;
        const f = s
            .then(async (p) => {
              if (((c = ["resolve", p]), te.isValidElement(p)))
                ((u = !1), this.create({ id: a, type: "default", message: p }));
              else if (_5(p) && !p.ok) {
                u = !1;
                const y =
                    typeof o.error == "function"
                      ? await o.error(`HTTP error! status: ${p.status}`)
                      : o.error,
                  g =
                    typeof o.description == "function"
                      ? await o.description(`HTTP error! status: ${p.status}`)
                      : o.description,
                  w =
                    typeof y == "object" && !te.isValidElement(y)
                      ? y
                      : { message: y };
                this.create({ id: a, type: "error", description: g, ...w });
              } else if (p instanceof Error) {
                u = !1;
                const y =
                    typeof o.error == "function" ? await o.error(p) : o.error,
                  g =
                    typeof o.description == "function"
                      ? await o.description(p)
                      : o.description,
                  w =
                    typeof y == "object" && !te.isValidElement(y)
                      ? y
                      : { message: y };
                this.create({ id: a, type: "error", description: g, ...w });
              } else if (o.success !== void 0) {
                u = !1;
                const y =
                    typeof o.success == "function"
                      ? await o.success(p)
                      : o.success,
                  g =
                    typeof o.description == "function"
                      ? await o.description(p)
                      : o.description,
                  w =
                    typeof y == "object" && !te.isValidElement(y)
                      ? y
                      : { message: y };
                this.create({ id: a, type: "success", description: g, ...w });
              }
            })
            .catch(async (p) => {
              if (((c = ["reject", p]), o.error !== void 0)) {
                u = !1;
                const v =
                    typeof o.error == "function" ? await o.error(p) : o.error,
                  y =
                    typeof o.description == "function"
                      ? await o.description(p)
                      : o.description,
                  S =
                    typeof v == "object" && !te.isValidElement(v)
                      ? v
                      : { message: v };
                this.create({ id: a, type: "error", description: y, ...S });
              }
            })
            .finally(() => {
              (u && (this.dismiss(a), (a = void 0)),
                o.finally == null || o.finally.call(o));
            }),
          h = () =>
            new Promise((p, v) =>
              f.then(() => (c[0] === "reject" ? v(c[1]) : p(c[1]))).catch(v),
            );
        return typeof a != "string" && typeof a != "number"
          ? { unwrap: h }
          : Object.assign(a, { unwrap: h });
      }),
      (this.custom = (t, o) => {
        const a = o?.id || Zh++;
        return (this.create({ jsx: t(a), id: a, ...o }), a);
      }),
      (this.getActiveToasts = () =>
        this.toasts.filter((t) => !this.dismissedToasts.has(t.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()));
  }
}
const Ft = new S5(),
  w5 = (e, t) => {
    const o = t?.id || Zh++;
    return (Ft.addToast({ title: e, ...t, id: o }), o);
  },
  _5 = (e) =>
    e &&
    typeof e == "object" &&
    "ok" in e &&
    typeof e.ok == "boolean" &&
    "status" in e &&
    typeof e.status == "number",
  x5 = w5,
  E5 = () => Ft.toasts,
  R5 = () => Ft.getActiveToasts();
Object.assign(
  x5,
  {
    success: Ft.success,
    info: Ft.info,
    warning: Ft.warning,
    error: Ft.error,
    custom: Ft.custom,
    message: Ft.message,
    promise: Ft.promise,
    dismiss: Ft.dismiss,
    loading: Ft.loading,
  },
  { getHistory: E5, getToasts: R5 },
);
c5(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}",
);
function Eu(e) {
  return e.label !== void 0;
}
const T5 = 3,
  C5 = "24px",
  O5 = "16px",
  Cb = 4e3,
  A5 = 356,
  M5 = 14,
  D5 = 45,
  z5 = 200;
function In(...e) {
  return e.filter(Boolean).join(" ");
}
function P5(e) {
  const [t, o] = e.split("-"),
    a = [];
  return (t && a.push(t), o && a.push(o), a);
}
const j5 = (e) => {
  var t, o, a, s, u, c, f, h, p;
  const {
      invert: v,
      toast: y,
      unstyled: g,
      interacting: S,
      setHeights: w,
      visibleToasts: _,
      heights: T,
      index: A,
      toasts: N,
      expanded: P,
      removeToast: k,
      defaultRichColors: H,
      closeButton: F,
      style: Z,
      cancelButtonStyle: B,
      actionButtonStyle: re,
      className: ae = "",
      descriptionClassName: he = "",
      duration: se,
      position: ve,
      gap: me,
      expandByDefault: ye,
      classNames: z,
      icons: K,
      closeButtonAriaLabel: q = "Close toast",
    } = e,
    [W, C] = te.useState(null),
    [G, ne] = te.useState(null),
    [$, J] = te.useState(!1),
    [ie, oe] = te.useState(!1),
    [le, de] = te.useState(!1),
    [ke, dt] = te.useState(!1),
    [ht, Ge] = te.useState(!1),
    [ln, Xn] = te.useState(0),
    [Zo, $o] = te.useState(0),
    gt = te.useRef(y.duration || se || Cb),
    Go = te.useRef(null),
    Rt = te.useRef(null),
    Wn = A === 0,
    Jn = A + 1 <= _,
    bt = y.type,
    Me = y.dismissible !== !1,
    tt = y.className || "",
    Nt = y.descriptionClassName || "",
    Qt = te.useMemo(
      () => T.findIndex((we) => we.toastId === y.id) || 0,
      [T, y.id],
    ),
    kt = te.useMemo(() => {
      var we;
      return (we = y.closeButton) != null ? we : F;
    }, [y.closeButton, F]),
    xn = te.useMemo(() => y.duration || se || Cb, [y.duration, se]),
    Tt = te.useRef(0),
    xr = te.useRef(0),
    $s = te.useRef(0),
    Er = te.useRef(null),
    [Fo, Yo] = ve.split("-"),
    Pn = te.useMemo(
      () => T.reduce((we, nt, ut) => (ut >= Qt ? we : we + nt.height), 0),
      [T, Qt],
    ),
    uo = b5(),
    co = y.invert || v,
    ci = bt === "loading";
  ((xr.current = te.useMemo(() => Qt * me + Pn, [Qt, Pn])),
    te.useEffect(() => {
      gt.current = xn;
    }, [xn]),
    te.useEffect(() => {
      J(!0);
    }, []),
    te.useEffect(() => {
      const we = Rt.current;
      if (we) {
        const nt = we.getBoundingClientRect().height;
        return (
          $o(nt),
          w((ut) => [
            { toastId: y.id, height: nt, position: y.position },
            ...ut,
          ]),
          () => w((ut) => ut.filter((Ct) => Ct.toastId !== y.id))
        );
      }
    }, [w, y.id]),
    te.useLayoutEffect(() => {
      if (!$) return;
      const we = Rt.current,
        nt = we.style.height;
      we.style.height = "auto";
      const ut = we.getBoundingClientRect().height;
      ((we.style.height = nt),
        $o(ut),
        w((Ct) =>
          Ct.find((pt) => pt.toastId === y.id)
            ? Ct.map((pt) => (pt.toastId === y.id ? { ...pt, height: ut } : pt))
            : [{ toastId: y.id, height: ut, position: y.position }, ...Ct],
        ));
    }, [$, y.title, y.description, w, y.id, y.jsx, y.action, y.cancel]));
  const En = te.useCallback(() => {
    (oe(!0),
      Xn(xr.current),
      w((we) => we.filter((nt) => nt.toastId !== y.id)),
      setTimeout(() => {
        k(y);
      }, z5));
  }, [y, k, w, xr]);
  (te.useEffect(() => {
    if (
      (y.promise && bt === "loading") ||
      y.duration === 1 / 0 ||
      y.type === "loading"
    )
      return;
    let we;
    return (
      P || S || uo
        ? (() => {
            if ($s.current < Tt.current) {
              const Ct = new Date().getTime() - Tt.current;
              gt.current = gt.current - Ct;
            }
            $s.current = new Date().getTime();
          })()
        : (() => {
            gt.current !== 1 / 0 &&
              ((Tt.current = new Date().getTime()),
              (we = setTimeout(() => {
                (y.onAutoClose == null || y.onAutoClose.call(y, y), En());
              }, gt.current)));
          })(),
      () => clearTimeout(we)
    );
  }, [P, S, y, bt, uo, En]),
    te.useEffect(() => {
      y.delete && (En(), y.onDismiss == null || y.onDismiss.call(y, y));
    }, [En, y.delete]));
  function Gs() {
    var we;
    if (K?.loading) {
      var nt;
      return te.createElement(
        "div",
        {
          className: In(
            z?.loader,
            y == null || (nt = y.classNames) == null ? void 0 : nt.loader,
            "sonner-loader",
          ),
          "data-visible": bt === "loading",
        },
        K.loading,
      );
    }
    return te.createElement(h5, {
      className: In(
        z?.loader,
        y == null || (we = y.classNames) == null ? void 0 : we.loader,
      ),
      visible: bt === "loading",
    });
  }
  const fi = y.icon || K?.[bt] || f5(bt);
  var Rr, Fs;
  return te.createElement(
    "li",
    {
      tabIndex: 0,
      ref: Rt,
      className: In(
        ae,
        tt,
        z?.toast,
        y == null || (t = y.classNames) == null ? void 0 : t.toast,
        z?.default,
        z?.[bt],
        y == null || (o = y.classNames) == null ? void 0 : o[bt],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (Rr = y.richColors) != null ? Rr : H,
      "data-styled": !(y.jsx || y.unstyled || g),
      "data-mounted": $,
      "data-promise": !!y.promise,
      "data-swiped": ht,
      "data-removed": ie,
      "data-visible": Jn,
      "data-y-position": Fo,
      "data-x-position": Yo,
      "data-index": A,
      "data-front": Wn,
      "data-swiping": le,
      "data-dismissible": Me,
      "data-type": bt,
      "data-invert": co,
      "data-swipe-out": ke,
      "data-swipe-direction": G,
      "data-expanded": !!(P || (ye && $)),
      "data-testid": y.testId,
      style: {
        "--index": A,
        "--toasts-before": A,
        "--z-index": N.length - A,
        "--offset": `${ie ? ln : xr.current}px`,
        "--initial-height": ye ? "auto" : `${Zo}px`,
        ...Z,
        ...y.style,
      },
      onDragEnd: () => {
        (de(!1), C(null), (Er.current = null));
      },
      onPointerDown: (we) => {
        we.button !== 2 &&
          (ci ||
            !Me ||
            ((Go.current = new Date()),
            Xn(xr.current),
            we.target.setPointerCapture(we.pointerId),
            we.target.tagName !== "BUTTON" &&
              (de(!0), (Er.current = { x: we.clientX, y: we.clientY }))));
      },
      onPointerUp: () => {
        var we, nt, ut;
        if (ke || !Me) return;
        Er.current = null;
        const Ct = Number(
            ((we = Rt.current) == null
              ? void 0
              : we.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0,
          ),
          fo = Number(
            ((nt = Rt.current) == null
              ? void 0
              : nt.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0,
          ),
          pt =
            new Date().getTime() -
            ((ut = Go.current) == null ? void 0 : ut.getTime()),
          rt = W === "x" ? Ct : fo,
          ot = Math.abs(rt) / pt;
        if (Math.abs(rt) >= D5 || ot > 0.11) {
          (Xn(xr.current),
            y.onDismiss == null || y.onDismiss.call(y, y),
            ne(
              W === "x" ? (Ct > 0 ? "right" : "left") : fo > 0 ? "down" : "up",
            ),
            En(),
            dt(!0));
          return;
        } else {
          var Ve, St;
          ((Ve = Rt.current) == null ||
            Ve.style.setProperty("--swipe-amount-x", "0px"),
            (St = Rt.current) == null ||
              St.style.setProperty("--swipe-amount-y", "0px"));
        }
        (Ge(!1), de(!1), C(null));
      },
      onPointerMove: (we) => {
        var nt, ut, Ct;
        if (
          !Er.current ||
          !Me ||
          ((nt = window.getSelection()) == null
            ? void 0
            : nt.toString().length) > 0
        )
          return;
        const pt = we.clientY - Er.current.y,
          rt = we.clientX - Er.current.x;
        var ot;
        const Ve = (ot = e.swipeDirections) != null ? ot : P5(ve);
        !W &&
          (Math.abs(rt) > 1 || Math.abs(pt) > 1) &&
          C(Math.abs(rt) > Math.abs(pt) ? "x" : "y");
        let St = { x: 0, y: 0 };
        const Ko = (er) => 1 / (1.5 + Math.abs(er) / 20);
        if (W === "y") {
          if (Ve.includes("top") || Ve.includes("bottom"))
            if (
              (Ve.includes("top") && pt < 0) ||
              (Ve.includes("bottom") && pt > 0)
            )
              St.y = pt;
            else {
              const er = pt * Ko(pt);
              St.y = Math.abs(er) < Math.abs(pt) ? er : pt;
            }
        } else if (W === "x" && (Ve.includes("left") || Ve.includes("right")))
          if (
            (Ve.includes("left") && rt < 0) ||
            (Ve.includes("right") && rt > 0)
          )
            St.x = rt;
          else {
            const er = rt * Ko(rt);
            St.x = Math.abs(er) < Math.abs(rt) ? er : rt;
          }
        ((Math.abs(St.x) > 0 || Math.abs(St.y) > 0) && Ge(!0),
          (ut = Rt.current) == null ||
            ut.style.setProperty("--swipe-amount-x", `${St.x}px`),
          (Ct = Rt.current) == null ||
            Ct.style.setProperty("--swipe-amount-y", `${St.y}px`));
      },
    },
    kt && !y.jsx && bt !== "loading"
      ? te.createElement(
          "button",
          {
            "aria-label": q,
            "data-disabled": ci,
            "data-close-button": !0,
            onClick:
              ci || !Me
                ? () => {}
                : () => {
                    (En(), y.onDismiss == null || y.onDismiss.call(y, y));
                  },
            className: In(
              z?.closeButton,
              y == null || (a = y.classNames) == null ? void 0 : a.closeButton,
            ),
          },
          (Fs = K?.close) != null ? Fs : g5,
        )
      : null,
    (bt || y.icon || y.promise) &&
      y.icon !== null &&
      (K?.[bt] !== null || y.icon)
      ? te.createElement(
          "div",
          {
            "data-icon": "",
            className: In(
              z?.icon,
              y == null || (s = y.classNames) == null ? void 0 : s.icon,
            ),
          },
          y.promise || (y.type === "loading" && !y.icon)
            ? y.icon || Gs()
            : null,
          y.type !== "loading" ? fi : null,
        )
      : null,
    te.createElement(
      "div",
      {
        "data-content": "",
        className: In(
          z?.content,
          y == null || (u = y.classNames) == null ? void 0 : u.content,
        ),
      },
      te.createElement(
        "div",
        {
          "data-title": "",
          className: In(
            z?.title,
            y == null || (c = y.classNames) == null ? void 0 : c.title,
          ),
        },
        y.jsx ? y.jsx : typeof y.title == "function" ? y.title() : y.title,
      ),
      y.description
        ? te.createElement(
            "div",
            {
              "data-description": "",
              className: In(
                he,
                Nt,
                z?.description,
                y == null || (f = y.classNames) == null
                  ? void 0
                  : f.description,
              ),
            },
            typeof y.description == "function"
              ? y.description()
              : y.description,
          )
        : null,
    ),
    te.isValidElement(y.cancel)
      ? y.cancel
      : y.cancel && Eu(y.cancel)
        ? te.createElement(
            "button",
            {
              "data-button": !0,
              "data-cancel": !0,
              style: y.cancelButtonStyle || B,
              onClick: (we) => {
                Eu(y.cancel) &&
                  Me &&
                  (y.cancel.onClick == null ||
                    y.cancel.onClick.call(y.cancel, we),
                  En());
              },
              className: In(
                z?.cancelButton,
                y == null || (h = y.classNames) == null
                  ? void 0
                  : h.cancelButton,
              ),
            },
            y.cancel.label,
          )
        : null,
    te.isValidElement(y.action)
      ? y.action
      : y.action && Eu(y.action)
        ? te.createElement(
            "button",
            {
              "data-button": !0,
              "data-action": !0,
              style: y.actionButtonStyle || re,
              onClick: (we) => {
                Eu(y.action) &&
                  (y.action.onClick == null ||
                    y.action.onClick.call(y.action, we),
                  !we.defaultPrevented && En());
              },
              className: In(
                z?.actionButton,
                y == null || (p = y.classNames) == null
                  ? void 0
                  : p.actionButton,
              ),
            },
            y.action.label,
          )
        : null,
  );
};
function Ob() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
function N5(e, t) {
  const o = {};
  return (
    [e, t].forEach((a, s) => {
      const u = s === 1,
        c = u ? "--mobile-offset" : "--offset",
        f = u ? O5 : C5;
      function h(p) {
        ["top", "right", "bottom", "left"].forEach((v) => {
          o[`${c}-${v}`] = typeof p == "number" ? `${p}px` : p;
        });
      }
      typeof a == "number" || typeof a == "string"
        ? h(a)
        : typeof a == "object"
          ? ["top", "right", "bottom", "left"].forEach((p) => {
              a[p] === void 0
                ? (o[`${c}-${p}`] = f)
                : (o[`${c}-${p}`] =
                    typeof a[p] == "number" ? `${a[p]}px` : a[p]);
            })
          : h(f);
    }),
    o
  );
}
const k5 = te.forwardRef(function (t, o) {
    const {
        id: a,
        invert: s,
        position: u = "bottom-right",
        hotkey: c = ["altKey", "KeyT"],
        expand: f,
        closeButton: h,
        className: p,
        offset: v,
        mobileOffset: y,
        theme: g = "light",
        richColors: S,
        duration: w,
        style: _,
        visibleToasts: T = T5,
        toastOptions: A,
        dir: N = Ob(),
        gap: P = M5,
        icons: k,
        containerAriaLabel: H = "Notifications",
      } = t,
      [F, Z] = te.useState([]),
      B = te.useMemo(
        () =>
          a
            ? F.filter(($) => $.toasterId === a)
            : F.filter(($) => !$.toasterId),
        [F, a],
      ),
      re = te.useMemo(
        () =>
          Array.from(
            new Set(
              [u].concat(B.filter(($) => $.position).map(($) => $.position)),
            ),
          ),
        [B, u],
      ),
      [ae, he] = te.useState([]),
      [se, ve] = te.useState(!1),
      [me, ye] = te.useState(!1),
      [z, K] = te.useState(
        g !== "system"
          ? g
          : typeof window < "u" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
      ),
      q = te.useRef(null),
      W = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      C = te.useRef(null),
      G = te.useRef(!1),
      ne = te.useCallback(($) => {
        Z((J) => {
          var ie;
          return (
            ((ie = J.find((oe) => oe.id === $.id)) != null && ie.delete) ||
              Ft.dismiss($.id),
            J.filter(({ id: oe }) => oe !== $.id)
          );
        });
      }, []);
    return (
      te.useEffect(
        () =>
          Ft.subscribe(($) => {
            if ($.dismiss) {
              requestAnimationFrame(() => {
                Z((J) =>
                  J.map((ie) => (ie.id === $.id ? { ...ie, delete: !0 } : ie)),
                );
              });
              return;
            }
            setTimeout(() => {
              tS.flushSync(() => {
                Z((J) => {
                  const ie = J.findIndex((oe) => oe.id === $.id);
                  return ie !== -1
                    ? [
                        ...J.slice(0, ie),
                        { ...J[ie], ...$ },
                        ...J.slice(ie + 1),
                      ]
                    : [$, ...J];
                });
              });
            });
          }),
        [F],
      ),
      te.useEffect(() => {
        if (g !== "system") {
          K(g);
          return;
        }
        if (
          (g === "system" &&
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? K("dark")
              : K("light")),
          typeof window > "u")
        )
          return;
        const $ = window.matchMedia("(prefers-color-scheme: dark)");
        try {
          $.addEventListener("change", ({ matches: J }) => {
            K(J ? "dark" : "light");
          });
        } catch {
          $.addListener(({ matches: ie }) => {
            try {
              K(ie ? "dark" : "light");
            } catch (oe) {
              console.error(oe);
            }
          });
        }
      }, [g]),
      te.useEffect(() => {
        F.length <= 1 && ve(!1);
      }, [F]),
      te.useEffect(() => {
        const $ = (J) => {
          var ie;
          if (c.every((de) => J[de] || J.code === de)) {
            var le;
            (ve(!0), (le = q.current) == null || le.focus());
          }
          J.code === "Escape" &&
            (document.activeElement === q.current ||
              ((ie = q.current) != null &&
                ie.contains(document.activeElement))) &&
            ve(!1);
        };
        return (
          document.addEventListener("keydown", $),
          () => document.removeEventListener("keydown", $)
        );
      }, [c]),
      te.useEffect(() => {
        if (q.current)
          return () => {
            C.current &&
              (C.current.focus({ preventScroll: !0 }),
              (C.current = null),
              (G.current = !1));
          };
      }, [q.current]),
      te.createElement(
        "section",
        {
          ref: o,
          "aria-label": `${H} ${W}`,
          tabIndex: -1,
          "aria-live": "polite",
          "aria-relevant": "additions text",
          "aria-atomic": "false",
          suppressHydrationWarning: !0,
        },
        re.map(($, J) => {
          var ie;
          const [oe, le] = $.split("-");
          return B.length
            ? te.createElement(
                "ol",
                {
                  key: $,
                  dir: N === "auto" ? Ob() : N,
                  tabIndex: -1,
                  ref: q,
                  className: p,
                  "data-sonner-toaster": !0,
                  "data-sonner-theme": z,
                  "data-y-position": oe,
                  "data-x-position": le,
                  style: {
                    "--front-toast-height": `${((ie = ae[0]) == null ? void 0 : ie.height) || 0}px`,
                    "--width": `${A5}px`,
                    "--gap": `${P}px`,
                    ..._,
                    ...N5(v, y),
                  },
                  onBlur: (de) => {
                    G.current &&
                      !de.currentTarget.contains(de.relatedTarget) &&
                      ((G.current = !1),
                      C.current &&
                        (C.current.focus({ preventScroll: !0 }),
                        (C.current = null)));
                  },
                  onFocus: (de) => {
                    (de.target instanceof HTMLElement &&
                      de.target.dataset.dismissible === "false") ||
                      G.current ||
                      ((G.current = !0), (C.current = de.relatedTarget));
                  },
                  onMouseEnter: () => ve(!0),
                  onMouseMove: () => ve(!0),
                  onMouseLeave: () => {
                    me || ve(!1);
                  },
                  onDragEnd: () => ve(!1),
                  onPointerDown: (de) => {
                    (de.target instanceof HTMLElement &&
                      de.target.dataset.dismissible === "false") ||
                      ye(!0);
                  },
                  onPointerUp: () => ye(!1),
                },
                B.filter(
                  (de) => (!de.position && J === 0) || de.position === $,
                ).map((de, ke) => {
                  var dt, ht;
                  return te.createElement(j5, {
                    key: de.id,
                    icons: k,
                    index: ke,
                    toast: de,
                    defaultRichColors: S,
                    duration: (dt = A?.duration) != null ? dt : w,
                    className: A?.className,
                    descriptionClassName: A?.descriptionClassName,
                    invert: s,
                    visibleToasts: T,
                    closeButton: (ht = A?.closeButton) != null ? ht : h,
                    interacting: me,
                    position: $,
                    style: A?.style,
                    unstyled: A?.unstyled,
                    classNames: A?.classNames,
                    cancelButtonStyle: A?.cancelButtonStyle,
                    actionButtonStyle: A?.actionButtonStyle,
                    closeButtonAriaLabel: A?.closeButtonAriaLabel,
                    removeToast: ne,
                    toasts: B.filter((Ge) => Ge.position == de.position),
                    heights: ae.filter((Ge) => Ge.position == de.position),
                    setHeights: he,
                    expandByDefault: f,
                    gap: P,
                    expanded: se,
                    swipeDirections: t.swipeDirections,
                  });
                }),
              )
            : null;
        }),
      )
    );
  }),
  L5 = ({ ...e }) => {
    const { themeMode: t } = Ww();
    return D.jsx(k5, {
      theme: t === "auto" ? "system" : t,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      },
      ...e,
    });
  },
  U5 = "/assets/styles-lIpQMYnc.css",
  Jw = yT()({
    head: () => ({
      links: [{ rel: "stylesheet", href: U5 }],
      scripts: [{ children: s5 }],
    }),
    component: B5,
  });
function B5() {
  return D.jsx(I5, { children: D.jsx(aS, {}) });
}
function I5({ children: e }) {
  return D.jsx(l5, {
    children: D.jsxs("html", {
      lang: "en",
      className: "light",
      suppressHydrationWarning: !0,
      children: [
        D.jsx("head", { children: D.jsx(jT, {}) }),
        D.jsxs("body", {
          className:
            "bg-background text-foreground min-h-screen font-sans antialiased",
          children: [
            e,
            D.jsx("div", {
              className: "absolute right-4 bottom-12",
              children: D.jsx(u5, {}),
            }),
            D.jsx(L5, {}),
            D.jsx(Z3, { position: "bottom-right" }),
            D.jsx(kT, {}),
          ],
        }),
      ],
    }),
  });
}
const H5 = () => V3(() => import("./index-czoQ8HiM.js"), []),
  q5 = hh("/")({
    loader: ({ context: e }) => {
      const { trpc: t, queryClient: o } = e;
      o.prefetchQuery(t.listing.list.queryOptions({ limit: 12 }));
    },
    component: bT(H5, "component"),
  }),
  V5 = q5.update({ id: "/", path: "/", getParentRoute: () => Jw }),
  Z5 = { IndexRoute: V5 },
  $5 = Jw._addFileChildren(Z5);
function G5() {
  const e = new TC({
      defaultOptions: {
        dehydrate: { serializeData: Ae.serialize },
        hydrate: { deserializeData: Ae.deserialize },
      },
    }),
    t = B3(),
    o = kS({ client: t, queryClient: e }),
    a = OT({
      routeTree: $5,
      context: { queryClient: e, trpc: o },
      defaultPreload: "intent",
      Wrap: (s) => D.jsx(I3, { trpcClient: t, queryClient: e, ...s }),
    });
  return (MC({ router: a, queryClient: e }), a);
}
async function F5() {
  const e = await G5();
  let t;
  return (
    (t = []),
    (window.__TSS_START_OPTIONS__ = { serializationAdapters: t }),
    t.push(YT),
    e.options.serializationAdapters &&
      t.push(...e.options.serializationAdapters),
    e.update({ basepath: "", serializationAdapters: t }),
    e.state.matches.length || (await UT(e)),
    e
  );
}
let ih;
function Y5() {
  return (
    ih || (ih = F5()),
    D.jsx($2, { promise: ih, children: (e) => D.jsx(DT, { router: e }) })
  );
}
E.startTransition(() => {
  vE.hydrateRoot(document, D.jsx(E.StrictMode, { children: D.jsx(Y5, {}) }));
});
export {
  J6 as B,
  Wu as S,
  vh as a,
  JT as b,
  yh as c,
  SC as d,
  oC as e,
  cS as f,
  Bt as g,
  E as h,
  Ju as i,
  W5 as j,
  tp as k,
  D as l,
  ej as m,
  Ut as n,
  lC as p,
  tC as r,
  X5 as s,
  eC as t,
  J5 as u,
};
