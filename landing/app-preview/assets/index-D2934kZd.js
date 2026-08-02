var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(async () => {
  var _a;
  (function() {
    const c = document.createElement("link").relList;
    if (c && c.supports && c.supports("modulepreload")) return;
    for (const m of document.querySelectorAll('link[rel="modulepreload"]')) u(m);
    new MutationObserver((m) => {
      for (const h of m) if (h.type === "childList") for (const S of h.addedNodes) S.tagName === "LINK" && S.rel === "modulepreload" && u(S);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function f(m) {
      const h = {};
      return m.integrity && (h.integrity = m.integrity), m.referrerPolicy && (h.referrerPolicy = m.referrerPolicy), m.crossOrigin === "use-credentials" ? h.credentials = "include" : m.crossOrigin === "anonymous" ? h.credentials = "omit" : h.credentials = "same-origin", h;
    }
    function u(m) {
      if (m.ep) return;
      m.ep = true;
      const h = f(m);
      fetch(m.href, h);
    }
  })();
  var Po = {
    exports: {}
  }, di = {};
  var M1;
  function Kh() {
    if (M1) return di;
    M1 = 1;
    var r = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
    function f(u, m, h) {
      var S = null;
      if (h !== void 0 && (S = "" + h), m.key !== void 0 && (S = "" + m.key), "key" in m) {
        h = {};
        for (var M in m) M !== "key" && (h[M] = m[M]);
      } else h = m;
      return m = h.ref, {
        $$typeof: r,
        type: u,
        key: S,
        ref: m !== void 0 ? m : null,
        props: h
      };
    }
    return di.Fragment = c, di.jsx = f, di.jsxs = f, di;
  }
  var A1;
  function Jh() {
    return A1 || (A1 = 1, Po.exports = Kh()), Po.exports;
  }
  var i = Jh(), ec = {
    exports: {}
  }, we = {};
  var j1;
  function Fh() {
    if (j1) return we;
    j1 = 1;
    var r = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), S = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), Y = Symbol.iterator;
    function q(v) {
      return v === null || typeof v != "object" ? null : (v = Y && v[Y] || v["@@iterator"], typeof v == "function" ? v : null);
    }
    var p = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, $ = Object.assign, V = {};
    function ae(v, H, W) {
      this.props = v, this.context = H, this.refs = V, this.updater = W || p;
    }
    ae.prototype.isReactComponent = {}, ae.prototype.setState = function(v, H) {
      if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, v, H, "setState");
    }, ae.prototype.forceUpdate = function(v) {
      this.updater.enqueueForceUpdate(this, v, "forceUpdate");
    };
    function ce() {
    }
    ce.prototype = ae.prototype;
    function le(v, H, W) {
      this.props = v, this.context = H, this.refs = V, this.updater = W || p;
    }
    var he = le.prototype = new ce();
    he.constructor = le, $(he, ae.prototype), he.isPureReactComponent = true;
    var J = Array.isArray;
    function ne() {
    }
    var T = {
      H: null,
      A: null,
      T: null,
      S: null
    }, L = Object.prototype.hasOwnProperty;
    function D(v, H, W) {
      var te = W.ref;
      return {
        $$typeof: r,
        type: v,
        key: H,
        ref: te !== void 0 ? te : null,
        props: W
      };
    }
    function se(v, H) {
      return D(v.type, H, v.props);
    }
    function X(v) {
      return typeof v == "object" && v !== null && v.$$typeof === r;
    }
    function ke(v) {
      var H = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + v.replace(/[=:]/g, function(W) {
        return H[W];
      });
    }
    var ze = /\/+/g;
    function Te(v, H) {
      return typeof v == "object" && v !== null && v.key != null ? ke("" + v.key) : H.toString(36);
    }
    function tt(v) {
      switch (v.status) {
        case "fulfilled":
          return v.value;
        case "rejected":
          throw v.reason;
        default:
          switch (typeof v.status == "string" ? v.then(ne, ne) : (v.status = "pending", v.then(function(H) {
            v.status === "pending" && (v.status = "fulfilled", v.value = H);
          }, function(H) {
            v.status === "pending" && (v.status = "rejected", v.reason = H);
          })), v.status) {
            case "fulfilled":
              return v.value;
            case "rejected":
              throw v.reason;
          }
      }
      throw v;
    }
    function U(v, H, W, te, fe) {
      var be = typeof v;
      (be === "undefined" || be === "boolean") && (v = null);
      var Ne = false;
      if (v === null) Ne = true;
      else switch (be) {
        case "bigint":
        case "string":
        case "number":
          Ne = true;
          break;
        case "object":
          switch (v.$$typeof) {
            case r:
            case c:
              Ne = true;
              break;
            case x:
              return Ne = v._init, U(Ne(v._payload), H, W, te, fe);
          }
      }
      if (Ne) return fe = fe(v), Ne = te === "" ? "." + Te(v, 0) : te, J(fe) ? (W = "", Ne != null && (W = Ne.replace(ze, "$&/") + "/"), U(fe, H, W, "", function(bt) {
        return bt;
      })) : fe != null && (X(fe) && (fe = se(fe, W + (fe.key == null || v && v.key === fe.key ? "" : ("" + fe.key).replace(ze, "$&/") + "/") + Ne)), H.push(fe)), 1;
      Ne = 0;
      var ot = te === "" ? "." : te + ":";
      if (J(v)) for (var Ze = 0; Ze < v.length; Ze++) te = v[Ze], be = ot + Te(te, Ze), Ne += U(te, H, W, be, fe);
      else if (Ze = q(v), typeof Ze == "function") for (v = Ze.call(v), Ze = 0; !(te = v.next()).done; ) te = te.value, be = ot + Te(te, Ze++), Ne += U(te, H, W, be, fe);
      else if (be === "object") {
        if (typeof v.then == "function") return U(tt(v), H, W, te, fe);
        throw H = String(v), Error("Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead.");
      }
      return Ne;
    }
    function w(v, H, W) {
      if (v == null) return v;
      var te = [], fe = 0;
      return U(v, te, "", "", function(be) {
        return H.call(W, be, fe++);
      }), te;
    }
    function Z(v) {
      if (v._status === -1) {
        var H = v._result;
        H = H(), H.then(function(W) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = W);
        }, function(W) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = W);
        }), v._status === -1 && (v._status = 0, v._result = H);
      }
      if (v._status === 1) return v._result.default;
      throw v._result;
    }
    var pe = typeof reportError == "function" ? reportError : function(v) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var H = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
          error: v
        });
        if (!window.dispatchEvent(H)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", v);
        return;
      }
      console.error(v);
    }, ye = {
      map: w,
      forEach: function(v, H, W) {
        w(v, function() {
          H.apply(this, arguments);
        }, W);
      },
      count: function(v) {
        var H = 0;
        return w(v, function() {
          H++;
        }), H;
      },
      toArray: function(v) {
        return w(v, function(H) {
          return H;
        }) || [];
      },
      only: function(v) {
        if (!X(v)) throw Error("React.Children.only expected to receive a single React element child.");
        return v;
      }
    };
    return we.Activity = z, we.Children = ye, we.Component = ae, we.Fragment = f, we.Profiler = m, we.PureComponent = le, we.StrictMode = u, we.Suspense = k, we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, we.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(v) {
        return T.H.useMemoCache(v);
      }
    }, we.cache = function(v) {
      return function() {
        return v.apply(null, arguments);
      };
    }, we.cacheSignal = function() {
      return null;
    }, we.cloneElement = function(v, H, W) {
      if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
      var te = $({}, v.props), fe = v.key;
      if (H != null) for (be in H.key !== void 0 && (fe = "" + H.key), H) !L.call(H, be) || be === "key" || be === "__self" || be === "__source" || be === "ref" && H.ref === void 0 || (te[be] = H[be]);
      var be = arguments.length - 2;
      if (be === 1) te.children = W;
      else if (1 < be) {
        for (var Ne = Array(be), ot = 0; ot < be; ot++) Ne[ot] = arguments[ot + 2];
        te.children = Ne;
      }
      return D(v.type, fe, te);
    }, we.createContext = function(v) {
      return v = {
        $$typeof: S,
        _currentValue: v,
        _currentValue2: v,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, v.Provider = v, v.Consumer = {
        $$typeof: h,
        _context: v
      }, v;
    }, we.createElement = function(v, H, W) {
      var te, fe = {}, be = null;
      if (H != null) for (te in H.key !== void 0 && (be = "" + H.key), H) L.call(H, te) && te !== "key" && te !== "__self" && te !== "__source" && (fe[te] = H[te]);
      var Ne = arguments.length - 2;
      if (Ne === 1) fe.children = W;
      else if (1 < Ne) {
        for (var ot = Array(Ne), Ze = 0; Ze < Ne; Ze++) ot[Ze] = arguments[Ze + 2];
        fe.children = ot;
      }
      if (v && v.defaultProps) for (te in Ne = v.defaultProps, Ne) fe[te] === void 0 && (fe[te] = Ne[te]);
      return D(v, be, fe);
    }, we.createRef = function() {
      return {
        current: null
      };
    }, we.forwardRef = function(v) {
      return {
        $$typeof: M,
        render: v
      };
    }, we.isValidElement = X, we.lazy = function(v) {
      return {
        $$typeof: x,
        _payload: {
          _status: -1,
          _result: v
        },
        _init: Z
      };
    }, we.memo = function(v, H) {
      return {
        $$typeof: g,
        type: v,
        compare: H === void 0 ? null : H
      };
    }, we.startTransition = function(v) {
      var H = T.T, W = {};
      T.T = W;
      try {
        var te = v(), fe = T.S;
        fe !== null && fe(W, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(ne, pe);
      } catch (be) {
        pe(be);
      } finally {
        H !== null && W.types !== null && (H.types = W.types), T.T = H;
      }
    }, we.unstable_useCacheRefresh = function() {
      return T.H.useCacheRefresh();
    }, we.use = function(v) {
      return T.H.use(v);
    }, we.useActionState = function(v, H, W) {
      return T.H.useActionState(v, H, W);
    }, we.useCallback = function(v, H) {
      return T.H.useCallback(v, H);
    }, we.useContext = function(v) {
      return T.H.useContext(v);
    }, we.useDebugValue = function() {
    }, we.useDeferredValue = function(v, H) {
      return T.H.useDeferredValue(v, H);
    }, we.useEffect = function(v, H) {
      return T.H.useEffect(v, H);
    }, we.useEffectEvent = function(v) {
      return T.H.useEffectEvent(v);
    }, we.useId = function() {
      return T.H.useId();
    }, we.useImperativeHandle = function(v, H, W) {
      return T.H.useImperativeHandle(v, H, W);
    }, we.useInsertionEffect = function(v, H) {
      return T.H.useInsertionEffect(v, H);
    }, we.useLayoutEffect = function(v, H) {
      return T.H.useLayoutEffect(v, H);
    }, we.useMemo = function(v, H) {
      return T.H.useMemo(v, H);
    }, we.useOptimistic = function(v, H) {
      return T.H.useOptimistic(v, H);
    }, we.useReducer = function(v, H, W) {
      return T.H.useReducer(v, H, W);
    }, we.useRef = function(v) {
      return T.H.useRef(v);
    }, we.useState = function(v) {
      return T.H.useState(v);
    }, we.useSyncExternalStore = function(v, H, W) {
      return T.H.useSyncExternalStore(v, H, W);
    }, we.useTransition = function() {
      return T.H.useTransition();
    }, we.version = "19.2.7", we;
  }
  var I1;
  function kc() {
    return I1 || (I1 = 1, ec.exports = Fh()), ec.exports;
  }
  var E = kc(), tc = {
    exports: {}
  }, fi = {}, ac = {
    exports: {}
  }, nc = {};
  var E1;
  function $h() {
    return E1 || (E1 = 1, (function(r) {
      function c(U, w) {
        var Z = U.length;
        U.push(w);
        e: for (; 0 < Z; ) {
          var pe = Z - 1 >>> 1, ye = U[pe];
          if (0 < m(ye, w)) U[pe] = w, U[Z] = ye, Z = pe;
          else break e;
        }
      }
      function f(U) {
        return U.length === 0 ? null : U[0];
      }
      function u(U) {
        if (U.length === 0) return null;
        var w = U[0], Z = U.pop();
        if (Z !== w) {
          U[0] = Z;
          e: for (var pe = 0, ye = U.length, v = ye >>> 1; pe < v; ) {
            var H = 2 * (pe + 1) - 1, W = U[H], te = H + 1, fe = U[te];
            if (0 > m(W, Z)) te < ye && 0 > m(fe, W) ? (U[pe] = fe, U[te] = Z, pe = te) : (U[pe] = W, U[H] = Z, pe = H);
            else if (te < ye && 0 > m(fe, Z)) U[pe] = fe, U[te] = Z, pe = te;
            else break e;
          }
        }
        return w;
      }
      function m(U, w) {
        var Z = U.sortIndex - w.sortIndex;
        return Z !== 0 ? Z : U.id - w.id;
      }
      if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var h = performance;
        r.unstable_now = function() {
          return h.now();
        };
      } else {
        var S = Date, M = S.now();
        r.unstable_now = function() {
          return S.now() - M;
        };
      }
      var k = [], g = [], x = 1, z = null, Y = 3, q = false, p = false, $ = false, V = false, ae = typeof setTimeout == "function" ? setTimeout : null, ce = typeof clearTimeout == "function" ? clearTimeout : null, le = typeof setImmediate < "u" ? setImmediate : null;
      function he(U) {
        for (var w = f(g); w !== null; ) {
          if (w.callback === null) u(g);
          else if (w.startTime <= U) u(g), w.sortIndex = w.expirationTime, c(k, w);
          else break;
          w = f(g);
        }
      }
      function J(U) {
        if ($ = false, he(U), !p) if (f(k) !== null) p = true, ne || (ne = true, ke());
        else {
          var w = f(g);
          w !== null && tt(J, w.startTime - U);
        }
      }
      var ne = false, T = -1, L = 5, D = -1;
      function se() {
        return V ? true : !(r.unstable_now() - D < L);
      }
      function X() {
        if (V = false, ne) {
          var U = r.unstable_now();
          D = U;
          var w = true;
          try {
            e: {
              p = false, $ && ($ = false, ce(T), T = -1), q = true;
              var Z = Y;
              try {
                t: {
                  for (he(U), z = f(k); z !== null && !(z.expirationTime > U && se()); ) {
                    var pe = z.callback;
                    if (typeof pe == "function") {
                      z.callback = null, Y = z.priorityLevel;
                      var ye = pe(z.expirationTime <= U);
                      if (U = r.unstable_now(), typeof ye == "function") {
                        z.callback = ye, he(U), w = true;
                        break t;
                      }
                      z === f(k) && u(k), he(U);
                    } else u(k);
                    z = f(k);
                  }
                  if (z !== null) w = true;
                  else {
                    var v = f(g);
                    v !== null && tt(J, v.startTime - U), w = false;
                  }
                }
                break e;
              } finally {
                z = null, Y = Z, q = false;
              }
              w = void 0;
            }
          } finally {
            w ? ke() : ne = false;
          }
        }
      }
      var ke;
      if (typeof le == "function") ke = function() {
        le(X);
      };
      else if (typeof MessageChannel < "u") {
        var ze = new MessageChannel(), Te = ze.port2;
        ze.port1.onmessage = X, ke = function() {
          Te.postMessage(null);
        };
      } else ke = function() {
        ae(X, 0);
      };
      function tt(U, w) {
        T = ae(function() {
          U(r.unstable_now());
        }, w);
      }
      r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(U) {
        U.callback = null;
      }, r.unstable_forceFrameRate = function(U) {
        0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < U ? Math.floor(1e3 / U) : 5;
      }, r.unstable_getCurrentPriorityLevel = function() {
        return Y;
      }, r.unstable_next = function(U) {
        switch (Y) {
          case 1:
          case 2:
          case 3:
            var w = 3;
            break;
          default:
            w = Y;
        }
        var Z = Y;
        Y = w;
        try {
          return U();
        } finally {
          Y = Z;
        }
      }, r.unstable_requestPaint = function() {
        V = true;
      }, r.unstable_runWithPriority = function(U, w) {
        switch (U) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            U = 3;
        }
        var Z = Y;
        Y = U;
        try {
          return w();
        } finally {
          Y = Z;
        }
      }, r.unstable_scheduleCallback = function(U, w, Z) {
        var pe = r.unstable_now();
        switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? pe + Z : pe) : Z = pe, U) {
          case 1:
            var ye = -1;
            break;
          case 2:
            ye = 250;
            break;
          case 5:
            ye = 1073741823;
            break;
          case 4:
            ye = 1e4;
            break;
          default:
            ye = 5e3;
        }
        return ye = Z + ye, U = {
          id: x++,
          callback: w,
          priorityLevel: U,
          startTime: Z,
          expirationTime: ye,
          sortIndex: -1
        }, Z > pe ? (U.sortIndex = Z, c(g, U), f(k) === null && U === f(g) && ($ ? (ce(T), T = -1) : $ = true, tt(J, Z - pe))) : (U.sortIndex = ye, c(k, U), p || q || (p = true, ne || (ne = true, ke()))), U;
      }, r.unstable_shouldYield = se, r.unstable_wrapCallback = function(U) {
        var w = Y;
        return function() {
          var Z = Y;
          Y = w;
          try {
            return U.apply(this, arguments);
          } finally {
            Y = Z;
          }
        };
      };
    })(nc)), nc;
  }
  var N1;
  function Wh() {
    return N1 || (N1 = 1, ac.exports = $h()), ac.exports;
  }
  var sc = {
    exports: {}
  }, vt = {};
  var R1;
  function Ph() {
    if (R1) return vt;
    R1 = 1;
    var r = kc();
    function c(k) {
      var g = "https://react.dev/errors/" + k;
      if (1 < arguments.length) {
        g += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var x = 2; x < arguments.length; x++) g += "&args[]=" + encodeURIComponent(arguments[x]);
      }
      return "Minified React error #" + k + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function f() {
    }
    var u = {
      d: {
        f,
        r: function() {
          throw Error(c(522));
        },
        D: f,
        C: f,
        L: f,
        m: f,
        X: f,
        S: f,
        M: f
      },
      p: 0,
      findDOMNode: null
    }, m = Symbol.for("react.portal");
    function h(k, g, x) {
      var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: m,
        key: z == null ? null : "" + z,
        children: k,
        containerInfo: g,
        implementation: x
      };
    }
    var S = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function M(k, g) {
      if (k === "font") return "";
      if (typeof g == "string") return g === "use-credentials" ? g : "";
    }
    return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, vt.createPortal = function(k, g) {
      var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11) throw Error(c(299));
      return h(k, g, null, x);
    }, vt.flushSync = function(k) {
      var g = S.T, x = u.p;
      try {
        if (S.T = null, u.p = 2, k) return k();
      } finally {
        S.T = g, u.p = x, u.d.f();
      }
    }, vt.preconnect = function(k, g) {
      typeof k == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, u.d.C(k, g));
    }, vt.prefetchDNS = function(k) {
      typeof k == "string" && u.d.D(k);
    }, vt.preinit = function(k, g) {
      if (typeof k == "string" && g && typeof g.as == "string") {
        var x = g.as, z = M(x, g.crossOrigin), Y = typeof g.integrity == "string" ? g.integrity : void 0, q = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        x === "style" ? u.d.S(k, typeof g.precedence == "string" ? g.precedence : void 0, {
          crossOrigin: z,
          integrity: Y,
          fetchPriority: q
        }) : x === "script" && u.d.X(k, {
          crossOrigin: z,
          integrity: Y,
          fetchPriority: q,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0
        });
      }
    }, vt.preinitModule = function(k, g) {
      if (typeof k == "string") if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var x = M(g.as, g.crossOrigin);
          u.d.M(k, {
            crossOrigin: x,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && u.d.M(k);
    }, vt.preload = function(k, g) {
      if (typeof k == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
        var x = g.as, z = M(x, g.crossOrigin);
        u.d.L(k, x, {
          crossOrigin: z,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0
        });
      }
    }, vt.preloadModule = function(k, g) {
      if (typeof k == "string") if (g) {
        var x = M(g.as, g.crossOrigin);
        u.d.m(k, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: x,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else u.d.m(k);
    }, vt.requestFormReset = function(k) {
      u.d.r(k);
    }, vt.unstable_batchedUpdates = function(k, g) {
      return k(g);
    }, vt.useFormState = function(k, g, x) {
      return S.H.useFormState(k, g, x);
    }, vt.useFormStatus = function() {
      return S.H.useHostTransitionStatus();
    }, vt.version = "19.2.7", vt;
  }
  var T1;
  function ep() {
    if (T1) return sc.exports;
    T1 = 1;
    function r() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (c) {
        console.error(c);
      }
    }
    return r(), sc.exports = Ph(), sc.exports;
  }
  var z1;
  function tp() {
    if (z1) return fi;
    z1 = 1;
    var r = Wh(), c = kc(), f = ep();
    function u(e) {
      var t = "https://react.dev/errors/" + e;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(arguments[a]);
      }
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function m(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function h(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function S(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function M(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function k(e) {
      if (h(e) !== e) throw Error(u(188));
    }
    function g(e) {
      var t = e.alternate;
      if (!t) {
        if (t = h(e), t === null) throw Error(u(188));
        return t !== e ? null : e;
      }
      for (var a = e, n = t; ; ) {
        var s = a.return;
        if (s === null) break;
        var l = s.alternate;
        if (l === null) {
          if (n = s.return, n !== null) {
            a = n;
            continue;
          }
          break;
        }
        if (s.child === l.child) {
          for (l = s.child; l; ) {
            if (l === a) return k(s), e;
            if (l === n) return k(s), t;
            l = l.sibling;
          }
          throw Error(u(188));
        }
        if (a.return !== n.return) a = s, n = l;
        else {
          for (var o = false, d = s.child; d; ) {
            if (d === a) {
              o = true, a = s, n = l;
              break;
            }
            if (d === n) {
              o = true, n = s, a = l;
              break;
            }
            d = d.sibling;
          }
          if (!o) {
            for (d = l.child; d; ) {
              if (d === a) {
                o = true, a = l, n = s;
                break;
              }
              if (d === n) {
                o = true, n = l, a = s;
                break;
              }
              d = d.sibling;
            }
            if (!o) throw Error(u(189));
          }
        }
        if (a.alternate !== n) throw Error(u(190));
      }
      if (a.tag !== 3) throw Error(u(188));
      return a.stateNode.current === a ? e : t;
    }
    function x(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = x(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var z = Object.assign, Y = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), p = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), ae = Symbol.for("react.profiler"), ce = Symbol.for("react.consumer"), le = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), se = Symbol.for("react.memo_cache_sentinel"), X = Symbol.iterator;
    function ke(e) {
      return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var ze = Symbol.for("react.client.reference");
    function Te(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === ze ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case $:
          return "Fragment";
        case ae:
          return "Profiler";
        case V:
          return "StrictMode";
        case J:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case D:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case p:
          return "Portal";
        case le:
          return e.displayName || "Context";
        case ce:
          return (e._context.displayName || "Context") + ".Consumer";
        case he:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case T:
          return t = e.displayName || null, t !== null ? t : Te(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return Te(e(t));
          } catch {
          }
      }
      return null;
    }
    var tt = Array.isArray, U = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, pe = [], ye = -1;
    function v(e) {
      return {
        current: e
      };
    }
    function H(e) {
      0 > ye || (e.current = pe[ye], pe[ye] = null, ye--);
    }
    function W(e, t) {
      ye++, pe[ye] = e.current, e.current = t;
    }
    var te = v(null), fe = v(null), be = v(null), Ne = v(null);
    function ot(e, t) {
      switch (W(be, t), W(fe, e), W(te, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Kf(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = Kf(t), e = Jf(t, e);
          else switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
      }
      H(te), W(te, e);
    }
    function Ze() {
      H(te), H(fe), H(be);
    }
    function bt(e) {
      e.memoizedState !== null && W(Ne, e);
      var t = te.current, a = Jf(t, e.type);
      t !== a && (W(fe, e), W(te, a));
    }
    function Na(e) {
      fe.current === e && (H(te), H(fe)), Ne.current === e && (H(Ne), ri._currentValue = Z);
    }
    var aa, Ra;
    function $t(e) {
      if (aa === void 0) try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        aa = t && t[1] || "", Ra = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + aa + e + Ra;
    }
    var Ta = false;
    function za(e, t) {
      if (!e || Ta) return "";
      Ta = true;
      var a = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var n = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var Q = function() {
                  throw Error();
                };
                if (Object.defineProperty(Q.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Q, []);
                  } catch (_) {
                    var N = _;
                  }
                  Reflect.construct(e, [], Q);
                } else {
                  try {
                    Q.call();
                  } catch (_) {
                    N = _;
                  }
                  e.call(Q.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (_) {
                  N = _;
                }
                (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
                });
              }
            } catch (_) {
              if (_ && N && typeof _.stack == "string") return [
                _.stack,
                N.stack
              ];
            }
            return [
              null,
              null
            ];
          }
        };
        n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var s = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
        s && s.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
        var l = n.DetermineComponentFrameRoot(), o = l[0], d = l[1];
        if (o && d) {
          var y = o.split(`
`), I = d.split(`
`);
          for (s = n = 0; n < y.length && !y[n].includes("DetermineComponentFrameRoot"); ) n++;
          for (; s < I.length && !I[s].includes("DetermineComponentFrameRoot"); ) s++;
          if (n === y.length || s === I.length) for (n = y.length - 1, s = I.length - 1; 1 <= n && 0 <= s && y[n] !== I[s]; ) s--;
          for (; 1 <= n && 0 <= s; n--, s--) if (y[n] !== I[s]) {
            if (n !== 1 || s !== 1) do
              if (n--, s--, 0 > s || y[n] !== I[s]) {
                var O = `
` + y[n].replace(" at new ", " at ");
                return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), O;
              }
            while (1 <= n && 0 <= s);
            break;
          }
        }
      } finally {
        Ta = false, Error.prepareStackTrace = a;
      }
      return (a = e ? e.displayName || e.name : "") ? $t(a) : "";
    }
    function B(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return $t(e.type);
        case 16:
          return $t("Lazy");
        case 13:
          return e.child !== t && t !== null ? $t("Suspense Fallback") : $t("Suspense");
        case 19:
          return $t("SuspenseList");
        case 0:
        case 15:
          return za(e.type, false);
        case 11:
          return za(e.type.render, false);
        case 1:
          return za(e.type, true);
        case 31:
          return $t("Activity");
        default:
          return "";
      }
    }
    function ue(e) {
      try {
        var t = "", a = null;
        do
          t += B(e, a), a = e, e = e.return;
        while (e);
        return t;
      } catch (n) {
        return `
Error generating stack: ` + n.message + `
` + n.stack;
      }
    }
    var ve = Object.prototype.hasOwnProperty, Le = r.unstable_scheduleCallback, A = r.unstable_cancelCallback, R = r.unstable_shouldYield, K = r.unstable_requestPaint, P = r.unstable_now, F = r.unstable_getCurrentPriorityLevel, ee = r.unstable_ImmediatePriority, oe = r.unstable_UserBlockingPriority, Ue = r.unstable_NormalPriority, ft = r.unstable_LowPriority, Fe = r.unstable_IdlePriority, Wt = r.log, cn = r.unstable_setDisableYieldValue, bs = null, Nt = null;
    function _a2(e) {
      if (typeof Wt == "function" && cn(e), Nt && typeof Nt.setStrictMode == "function") try {
        Nt.setStrictMode(bs, e);
      } catch {
      }
    }
    var Rt = Math.clz32 ? Math.clz32 : _m, Tm = Math.log, zm = Math.LN2;
    function _m(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Tm(e) / zm | 0) | 0;
    }
    var bi = 256, wi = 262144, ki = 4194304;
    function un(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
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
          return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
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
          return e;
      }
    }
    function Si(e, t, a) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var s = 0, l = e.suspendedLanes, o = e.pingedLanes;
      e = e.warmLanes;
      var d = n & 134217727;
      return d !== 0 ? (n = d & ~l, n !== 0 ? s = un(n) : (o &= d, o !== 0 ? s = un(o) : a || (a = d & ~e, a !== 0 && (s = un(a))))) : (d = n & ~l, d !== 0 ? s = un(d) : o !== 0 ? s = un(o) : a || (a = n & ~e, a !== 0 && (s = un(a)))), s === 0 ? 0 : t !== 0 && t !== s && (t & l) === 0 && (l = s & -s, a = t & -t, l >= a || l === 32 && (a & 4194048) !== 0) ? t : s;
    }
    function ws(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Dm(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
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
          return t + 5e3;
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
    function Ic() {
      var e = ki;
      return ki <<= 1, (ki & 62914560) === 0 && (ki = 4194304), e;
    }
    function ql(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function ks(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Lm(e, t, a, n, s, l) {
      var o = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var d = e.entanglements, y = e.expirationTimes, I = e.hiddenUpdates;
      for (a = o & ~a; 0 < a; ) {
        var O = 31 - Rt(a), Q = 1 << O;
        d[O] = 0, y[O] = -1;
        var N = I[O];
        if (N !== null) for (I[O] = null, O = 0; O < N.length; O++) {
          var _ = N[O];
          _ !== null && (_.lane &= -536870913);
        }
        a &= ~Q;
      }
      n !== 0 && Ec(e, n, 0), l !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= l & ~(o & ~t));
    }
    function Ec(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var n = 31 - Rt(t);
      e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930;
    }
    function Nc(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var n = 31 - Rt(a), s = 1 << n;
        s & t | e[n] & t && (e[n] |= t), a &= ~s;
      }
    }
    function Rc(e, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : Hl(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
    }
    function Hl(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
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
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Gl(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Tc() {
      var e = w.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : v1(e.type));
    }
    function zc(e, t) {
      var a = w.p;
      try {
        return w.p = e, t();
      } finally {
        w.p = a;
      }
    }
    var Da = Math.random().toString(36).slice(2), mt = "__reactFiber$" + Da, St = "__reactProps$" + Da, Rn = "__reactContainer$" + Da, Yl = "__reactEvents$" + Da, Um = "__reactListeners$" + Da, Om = "__reactHandles$" + Da, _c = "__reactResources$" + Da, Ss = "__reactMarker$" + Da;
    function Ql(e) {
      delete e[mt], delete e[St], delete e[Yl], delete e[Um], delete e[Om];
    }
    function Tn(e) {
      var t = e[mt];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Rn] || a[mt]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (e = a1(e); e !== null; ) {
            if (a = e[mt]) return a;
            e = a1(e);
          }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function zn(e) {
      if (e = e[mt] || e[Rn]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function Cs(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(u(33));
    }
    function _n(e) {
      var t = e[_c];
      return t || (t = e[_c] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function ut(e) {
      e[Ss] = true;
    }
    var Dc = /* @__PURE__ */ new Set(), Lc = {};
    function dn(e, t) {
      Dn(e, t), Dn(e + "Capture", t);
    }
    function Dn(e, t) {
      for (Lc[e] = t, e = 0; e < t.length; e++) Dc.add(t[e]);
    }
    var Bm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Uc = {}, Oc = {};
    function qm(e) {
      return ve.call(Oc, e) ? true : ve.call(Uc, e) ? false : Bm.test(e) ? Oc[e] = true : (Uc[e] = true, false);
    }
    function Ci(e, t, a) {
      if (qm(t)) if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var n = t.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
    }
    function xi(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, "" + a);
      }
    }
    function ca(e, t, a, n) {
      if (n === null) e.removeAttribute(a);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        e.setAttributeNS(t, a, "" + n);
      }
    }
    function qt(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function Bc(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Hm(e, t, a) {
      var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var s = n.get, l = n.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return s.call(this);
          },
          set: function(o) {
            a = "" + o, l.call(this, o);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function() {
            return a;
          },
          setValue: function(o) {
            a = "" + o;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Xl(e) {
      if (!e._valueTracker) {
        var t = Bc(e) ? "checked" : "value";
        e._valueTracker = Hm(e, t, "" + e[t]);
      }
    }
    function qc(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var a = t.getValue(), n = "";
      return e && (n = Bc(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), true) : false;
    }
    function Mi(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Gm = /[\n"\\]/g;
    function Ht(e) {
      return e.replace(Gm, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Vl(e, t, a, n, s, l, o, d) {
      e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t != null ? o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + qt(t)) : e.value !== "" + qt(t) && (e.value = "" + qt(t)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), t != null ? Zl(e, o, qt(t)) : a != null ? Zl(e, o, qt(a)) : n != null && e.removeAttribute("value"), s == null && l != null && (e.defaultChecked = !!l), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + qt(d) : e.removeAttribute("name");
    }
    function Hc(e, t, a, n, s, l, o, d) {
      if (l != null && typeof l != "function" && typeof l != "symbol" && typeof l != "boolean" && (e.type = l), t != null || a != null) {
        if (!(l !== "submit" && l !== "reset" || t != null)) {
          Xl(e);
          return;
        }
        a = a != null ? "" + qt(a) : "", t = t != null ? "" + qt(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = n ?? s, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = d ? e.checked : !!n, e.defaultChecked = !!n, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Xl(e);
    }
    function Zl(e, t, a) {
      t === "number" && Mi(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function Ln(e, t, a, n) {
      if (e = e.options, t) {
        t = {};
        for (var s = 0; s < a.length; s++) t["$" + a[s]] = true;
        for (a = 0; a < e.length; a++) s = t.hasOwnProperty("$" + e[a].value), e[a].selected !== s && (e[a].selected = s), s && n && (e[a].defaultSelected = true);
      } else {
        for (a = "" + qt(a), t = null, s = 0; s < e.length; s++) {
          if (e[s].value === a) {
            e[s].selected = true, n && (e[s].defaultSelected = true);
            return;
          }
          t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = true);
      }
    }
    function Gc(e, t, a) {
      if (t != null && (t = "" + qt(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + qt(a) : "";
    }
    function Yc(e, t, a, n) {
      if (t == null) {
        if (n != null) {
          if (a != null) throw Error(u(92));
          if (tt(n)) {
            if (1 < n.length) throw Error(u(93));
            n = n[0];
          }
          a = n;
        }
        a == null && (a = ""), t = a;
      }
      a = qt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Xl(e);
    }
    function Un(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Ym = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Qc(e, t, a) {
      var n = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ym.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
    }
    function Xc(e, t, a) {
      if (t != null && typeof t != "object") throw Error(u(62));
      if (e = e.style, a != null) {
        for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
        for (var s in t) n = t[s], t.hasOwnProperty(s) && a[s] !== n && Qc(e, s, n);
      } else for (var l in t) t.hasOwnProperty(l) && Qc(e, l, t[l]);
    }
    function Kl(e) {
      if (e.indexOf("-") === -1) return false;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var Qm = /* @__PURE__ */ new Map([
      [
        "acceptCharset",
        "accept-charset"
      ],
      [
        "htmlFor",
        "for"
      ],
      [
        "httpEquiv",
        "http-equiv"
      ],
      [
        "crossOrigin",
        "crossorigin"
      ],
      [
        "accentHeight",
        "accent-height"
      ],
      [
        "alignmentBaseline",
        "alignment-baseline"
      ],
      [
        "arabicForm",
        "arabic-form"
      ],
      [
        "baselineShift",
        "baseline-shift"
      ],
      [
        "capHeight",
        "cap-height"
      ],
      [
        "clipPath",
        "clip-path"
      ],
      [
        "clipRule",
        "clip-rule"
      ],
      [
        "colorInterpolation",
        "color-interpolation"
      ],
      [
        "colorInterpolationFilters",
        "color-interpolation-filters"
      ],
      [
        "colorProfile",
        "color-profile"
      ],
      [
        "colorRendering",
        "color-rendering"
      ],
      [
        "dominantBaseline",
        "dominant-baseline"
      ],
      [
        "enableBackground",
        "enable-background"
      ],
      [
        "fillOpacity",
        "fill-opacity"
      ],
      [
        "fillRule",
        "fill-rule"
      ],
      [
        "floodColor",
        "flood-color"
      ],
      [
        "floodOpacity",
        "flood-opacity"
      ],
      [
        "fontFamily",
        "font-family"
      ],
      [
        "fontSize",
        "font-size"
      ],
      [
        "fontSizeAdjust",
        "font-size-adjust"
      ],
      [
        "fontStretch",
        "font-stretch"
      ],
      [
        "fontStyle",
        "font-style"
      ],
      [
        "fontVariant",
        "font-variant"
      ],
      [
        "fontWeight",
        "font-weight"
      ],
      [
        "glyphName",
        "glyph-name"
      ],
      [
        "glyphOrientationHorizontal",
        "glyph-orientation-horizontal"
      ],
      [
        "glyphOrientationVertical",
        "glyph-orientation-vertical"
      ],
      [
        "horizAdvX",
        "horiz-adv-x"
      ],
      [
        "horizOriginX",
        "horiz-origin-x"
      ],
      [
        "imageRendering",
        "image-rendering"
      ],
      [
        "letterSpacing",
        "letter-spacing"
      ],
      [
        "lightingColor",
        "lighting-color"
      ],
      [
        "markerEnd",
        "marker-end"
      ],
      [
        "markerMid",
        "marker-mid"
      ],
      [
        "markerStart",
        "marker-start"
      ],
      [
        "overlinePosition",
        "overline-position"
      ],
      [
        "overlineThickness",
        "overline-thickness"
      ],
      [
        "paintOrder",
        "paint-order"
      ],
      [
        "panose-1",
        "panose-1"
      ],
      [
        "pointerEvents",
        "pointer-events"
      ],
      [
        "renderingIntent",
        "rendering-intent"
      ],
      [
        "shapeRendering",
        "shape-rendering"
      ],
      [
        "stopColor",
        "stop-color"
      ],
      [
        "stopOpacity",
        "stop-opacity"
      ],
      [
        "strikethroughPosition",
        "strikethrough-position"
      ],
      [
        "strikethroughThickness",
        "strikethrough-thickness"
      ],
      [
        "strokeDasharray",
        "stroke-dasharray"
      ],
      [
        "strokeDashoffset",
        "stroke-dashoffset"
      ],
      [
        "strokeLinecap",
        "stroke-linecap"
      ],
      [
        "strokeLinejoin",
        "stroke-linejoin"
      ],
      [
        "strokeMiterlimit",
        "stroke-miterlimit"
      ],
      [
        "strokeOpacity",
        "stroke-opacity"
      ],
      [
        "strokeWidth",
        "stroke-width"
      ],
      [
        "textAnchor",
        "text-anchor"
      ],
      [
        "textDecoration",
        "text-decoration"
      ],
      [
        "textRendering",
        "text-rendering"
      ],
      [
        "transformOrigin",
        "transform-origin"
      ],
      [
        "underlinePosition",
        "underline-position"
      ],
      [
        "underlineThickness",
        "underline-thickness"
      ],
      [
        "unicodeBidi",
        "unicode-bidi"
      ],
      [
        "unicodeRange",
        "unicode-range"
      ],
      [
        "unitsPerEm",
        "units-per-em"
      ],
      [
        "vAlphabetic",
        "v-alphabetic"
      ],
      [
        "vHanging",
        "v-hanging"
      ],
      [
        "vIdeographic",
        "v-ideographic"
      ],
      [
        "vMathematical",
        "v-mathematical"
      ],
      [
        "vectorEffect",
        "vector-effect"
      ],
      [
        "vertAdvY",
        "vert-adv-y"
      ],
      [
        "vertOriginX",
        "vert-origin-x"
      ],
      [
        "vertOriginY",
        "vert-origin-y"
      ],
      [
        "wordSpacing",
        "word-spacing"
      ],
      [
        "writingMode",
        "writing-mode"
      ],
      [
        "xmlnsXlink",
        "xmlns:xlink"
      ],
      [
        "xHeight",
        "x-height"
      ]
    ]), Xm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Ai(e) {
      return Xm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function ua() {
    }
    var Jl = null;
    function Fl(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var On = null, Bn = null;
    function Vc(e) {
      var t = zn(e);
      if (t && (e = t.stateNode)) {
        var a = e[St] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Vl(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Ht("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                var n = a[t];
                if (n !== e && n.form === e.form) {
                  var s = n[St] || null;
                  if (!s) throw Error(u(90));
                  Vl(n, s.value, s.defaultValue, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name);
                }
              }
              for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && qc(n);
            }
            break e;
          case "textarea":
            Gc(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Ln(e, !!a.multiple, t, false);
        }
      }
    }
    var $l = false;
    function Zc(e, t, a) {
      if ($l) return e(t, a);
      $l = true;
      try {
        var n = e(t);
        return n;
      } finally {
        if ($l = false, (On !== null || Bn !== null) && (ml(), On && (t = On, e = Bn, Bn = On = null, Vc(t), e))) for (t = 0; t < e.length; t++) Vc(e[t]);
      }
    }
    function xs(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var n = a[St] || null;
      if (n === null) return null;
      a = n[t];
      e: switch (t) {
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
          (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
          break e;
        default:
          e = false;
      }
      if (e) return null;
      if (a && typeof a != "function") throw Error(u(231, t, typeof a));
      return a;
    }
    var da = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Wl = false;
    if (da) try {
      var Ms = {};
      Object.defineProperty(Ms, "passive", {
        get: function() {
          Wl = true;
        }
      }), window.addEventListener("test", Ms, Ms), window.removeEventListener("test", Ms, Ms);
    } catch {
      Wl = false;
    }
    var La = null, Pl = null, ji = null;
    function Kc() {
      if (ji) return ji;
      var e, t = Pl, a = t.length, n, s = "value" in La ? La.value : La.textContent, l = s.length;
      for (e = 0; e < a && t[e] === s[e]; e++) ;
      var o = a - e;
      for (n = 1; n <= o && t[a - n] === s[l - n]; n++) ;
      return ji = s.slice(e, 1 < n ? 1 - n : void 0);
    }
    function Ii(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Ei() {
      return true;
    }
    function Jc() {
      return false;
    }
    function Ct(e) {
      function t(a, n, s, l, o) {
        this._reactName = a, this._targetInst = s, this.type = n, this.nativeEvent = l, this.target = o, this.currentTarget = null;
        for (var d in e) e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(l) : l[d]);
        return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === false) ? Ei : Jc, this.isPropagationStopped = Jc, this;
      }
      return z(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = false), this.isDefaultPrevented = Ei);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = true), this.isPropagationStopped = Ei);
        },
        persist: function() {
        },
        isPersistent: Ei
      }), t;
    }
    var fn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ni = Ct(fn), As = z({}, fn, {
      view: 0,
      detail: 0
    }), Vm = Ct(As), er, tr, js, Ri = z({}, As, {
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
      getModifierState: nr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== js && (js && e.type === "mousemove" ? (er = e.screenX - js.screenX, tr = e.screenY - js.screenY) : tr = er = 0, js = e), er);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : tr;
      }
    }), Fc = Ct(Ri), Zm = z({}, Ri, {
      dataTransfer: 0
    }), Km = Ct(Zm), Jm = z({}, As, {
      relatedTarget: 0
    }), ar = Ct(Jm), Fm = z({}, fn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $m = Ct(Fm), Wm = z({}, fn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Pm = Ct(Wm), e2 = z({}, fn, {
      data: 0
    }), $c = Ct(e2), t2 = {
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
      MozPrintableKey: "Unidentified"
    }, a2 = {
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
      224: "Meta"
    }, n2 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function s2(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = n2[e]) ? !!t[e] : false;
    }
    function nr() {
      return s2;
    }
    var i2 = z({}, As, {
      key: function(e) {
        if (e.key) {
          var t = t2[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Ii(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? a2[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: nr,
      charCode: function(e) {
        return e.type === "keypress" ? Ii(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Ii(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), l2 = Ct(i2), r2 = z({}, Ri, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Wc = Ct(r2), o2 = z({}, As, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: nr
    }), c2 = Ct(o2), u2 = z({}, fn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), d2 = Ct(u2), f2 = z({}, Ri, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), m2 = Ct(f2), h2 = z({}, fn, {
      newState: 0,
      oldState: 0
    }), p2 = Ct(h2), g2 = [
      9,
      13,
      27,
      32
    ], sr = da && "CompositionEvent" in window, Is = null;
    da && "documentMode" in document && (Is = document.documentMode);
    var y2 = da && "TextEvent" in window && !Is, Pc = da && (!sr || Is && 8 < Is && 11 >= Is), eu = " ", tu = false;
    function au(e, t) {
      switch (e) {
        case "keyup":
          return g2.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function nu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var qn = false;
    function v2(e, t) {
      switch (e) {
        case "compositionend":
          return nu(t);
        case "keypress":
          return t.which !== 32 ? null : (tu = true, eu);
        case "textInput":
          return e = t.data, e === eu && tu ? null : e;
        default:
          return null;
      }
    }
    function b2(e, t) {
      if (qn) return e === "compositionend" || !sr && au(e, t) ? (e = Kc(), ji = Pl = La = null, qn = false, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Pc && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var w2 = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function su(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!w2[e.type] : t === "textarea";
    }
    function iu(e, t, a, n) {
      On ? Bn ? Bn.push(n) : Bn = [
        n
      ] : On = n, t = wl(t, "onChange"), 0 < t.length && (a = new Ni("onChange", "change", null, a, n), e.push({
        event: a,
        listeners: t
      }));
    }
    var Es = null, Ns = null;
    function k2(e) {
      Gf(e, 0);
    }
    function Ti(e) {
      var t = Cs(e);
      if (qc(t)) return e;
    }
    function lu(e, t) {
      if (e === "change") return t;
    }
    var ru = false;
    if (da) {
      var ir;
      if (da) {
        var lr = "oninput" in document;
        if (!lr) {
          var ou = document.createElement("div");
          ou.setAttribute("oninput", "return;"), lr = typeof ou.oninput == "function";
        }
        ir = lr;
      } else ir = false;
      ru = ir && (!document.documentMode || 9 < document.documentMode);
    }
    function cu() {
      Es && (Es.detachEvent("onpropertychange", uu), Ns = Es = null);
    }
    function uu(e) {
      if (e.propertyName === "value" && Ti(Ns)) {
        var t = [];
        iu(t, Ns, e, Fl(e)), Zc(k2, t);
      }
    }
    function S2(e, t, a) {
      e === "focusin" ? (cu(), Es = t, Ns = a, Es.attachEvent("onpropertychange", uu)) : e === "focusout" && cu();
    }
    function C2(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ti(Ns);
    }
    function x2(e, t) {
      if (e === "click") return Ti(t);
    }
    function M2(e, t) {
      if (e === "input" || e === "change") return Ti(t);
    }
    function A2(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Tt = typeof Object.is == "function" ? Object.is : A2;
    function Rs(e, t) {
      if (Tt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var a = Object.keys(e), n = Object.keys(t);
      if (a.length !== n.length) return false;
      for (n = 0; n < a.length; n++) {
        var s = a[n];
        if (!ve.call(t, s) || !Tt(e[s], t[s])) return false;
      }
      return true;
    }
    function du(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function fu(e, t) {
      var a = du(e);
      e = 0;
      for (var n; a; ) {
        if (a.nodeType === 3) {
          if (n = e + a.textContent.length, e <= t && n >= t) return {
            node: a,
            offset: t - e
          };
          e = n;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = du(a);
      }
    }
    function mu(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? mu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function hu(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = Mi(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = false;
        }
        if (a) e = t.contentWindow;
        else break;
        t = Mi(e.document);
      }
      return t;
    }
    function rr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var j2 = da && "documentMode" in document && 11 >= document.documentMode, Hn = null, or = null, Ts = null, cr = false;
    function pu(e, t, a) {
      var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      cr || Hn == null || Hn !== Mi(n) || (n = Hn, "selectionStart" in n && rr(n) ? n = {
        start: n.selectionStart,
        end: n.selectionEnd
      } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), Ts && Rs(Ts, n) || (Ts = n, n = wl(or, "onSelect"), 0 < n.length && (t = new Ni("onSelect", "select", null, t, a), e.push({
        event: t,
        listeners: n
      }), t.target = Hn)));
    }
    function mn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Gn = {
      animationend: mn("Animation", "AnimationEnd"),
      animationiteration: mn("Animation", "AnimationIteration"),
      animationstart: mn("Animation", "AnimationStart"),
      transitionrun: mn("Transition", "TransitionRun"),
      transitionstart: mn("Transition", "TransitionStart"),
      transitioncancel: mn("Transition", "TransitionCancel"),
      transitionend: mn("Transition", "TransitionEnd")
    }, ur = {}, gu = {};
    da && (gu = document.createElement("div").style, "AnimationEvent" in window || (delete Gn.animationend.animation, delete Gn.animationiteration.animation, delete Gn.animationstart.animation), "TransitionEvent" in window || delete Gn.transitionend.transition);
    function hn(e) {
      if (ur[e]) return ur[e];
      if (!Gn[e]) return e;
      var t = Gn[e], a;
      for (a in t) if (t.hasOwnProperty(a) && a in gu) return ur[e] = t[a];
      return e;
    }
    var yu = hn("animationend"), vu = hn("animationiteration"), bu = hn("animationstart"), I2 = hn("transitionrun"), E2 = hn("transitionstart"), N2 = hn("transitioncancel"), wu = hn("transitionend"), ku = /* @__PURE__ */ new Map(), dr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    dr.push("scrollEnd");
    function Pt(e, t) {
      ku.set(e, t), dn(t, [
        e
      ]);
    }
    var zi = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Gt = [], Yn = 0, fr = 0;
    function _i() {
      for (var e = Yn, t = fr = Yn = 0; t < e; ) {
        var a = Gt[t];
        Gt[t++] = null;
        var n = Gt[t];
        Gt[t++] = null;
        var s = Gt[t];
        Gt[t++] = null;
        var l = Gt[t];
        if (Gt[t++] = null, n !== null && s !== null) {
          var o = n.pending;
          o === null ? s.next = s : (s.next = o.next, o.next = s), n.pending = s;
        }
        l !== 0 && Su(a, s, l);
      }
    }
    function Di(e, t, a, n) {
      Gt[Yn++] = e, Gt[Yn++] = t, Gt[Yn++] = a, Gt[Yn++] = n, fr |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
    }
    function mr(e, t, a, n) {
      return Di(e, t, a, n), Li(e);
    }
    function pn(e, t) {
      return Di(e, null, null, t), Li(e);
    }
    function Su(e, t, a) {
      e.lanes |= a;
      var n = e.alternate;
      n !== null && (n.lanes |= a);
      for (var s = false, l = e.return; l !== null; ) l.childLanes |= a, n = l.alternate, n !== null && (n.childLanes |= a), l.tag === 22 && (e = l.stateNode, e === null || e._visibility & 1 || (s = true)), e = l, l = l.return;
      return e.tag === 3 ? (l = e.stateNode, s && t !== null && (s = 31 - Rt(a), e = l.hiddenUpdates, n = e[s], n === null ? e[s] = [
        t
      ] : n.push(t), t.lane = a | 536870912), l) : null;
    }
    function Li(e) {
      if (50 < ei) throw ei = 0, Co = null, Error(u(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var Qn = {};
    function R2(e, t, a, n) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function zt(e, t, a, n) {
      return new R2(e, t, a, n);
    }
    function hr(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function fa(e, t) {
      var a = e.alternate;
      return a === null ? (a = zt(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
    }
    function Cu(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function Ui(e, t, a, n, s, l) {
      var o = 0;
      if (n = e, typeof e == "function") hr(e) && (o = 1);
      else if (typeof e == "string") o = Lh(e, a, te.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case D:
          return e = zt(31, a, t, s), e.elementType = D, e.lanes = l, e;
        case $:
          return gn(a.children, s, l, t);
        case V:
          o = 8, s |= 24;
          break;
        case ae:
          return e = zt(12, a, t, s | 2), e.elementType = ae, e.lanes = l, e;
        case J:
          return e = zt(13, a, t, s), e.elementType = J, e.lanes = l, e;
        case ne:
          return e = zt(19, a, t, s), e.elementType = ne, e.lanes = l, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case le:
              o = 10;
              break e;
            case ce:
              o = 9;
              break e;
            case he:
              o = 11;
              break e;
            case T:
              o = 14;
              break e;
            case L:
              o = 16, n = null;
              break e;
          }
          o = 29, a = Error(u(130, e === null ? "null" : typeof e, "")), n = null;
      }
      return t = zt(o, a, t, s), t.elementType = e, t.type = n, t.lanes = l, t;
    }
    function gn(e, t, a, n) {
      return e = zt(7, e, n, t), e.lanes = a, e;
    }
    function pr(e, t, a) {
      return e = zt(6, e, null, t), e.lanes = a, e;
    }
    function xu(e) {
      var t = zt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function gr(e, t, a) {
      return t = zt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var Mu = /* @__PURE__ */ new WeakMap();
    function Yt(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = Mu.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: ue(t)
        }, Mu.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: ue(t)
      };
    }
    var Xn = [], Vn = 0, Oi = null, zs = 0, Qt = [], Xt = 0, Ua = null, na = 1, sa = "";
    function ma(e, t) {
      Xn[Vn++] = zs, Xn[Vn++] = Oi, Oi = e, zs = t;
    }
    function Au(e, t, a) {
      Qt[Xt++] = na, Qt[Xt++] = sa, Qt[Xt++] = Ua, Ua = e;
      var n = na;
      e = sa;
      var s = 32 - Rt(n) - 1;
      n &= ~(1 << s), a += 1;
      var l = 32 - Rt(t) + s;
      if (30 < l) {
        var o = s - s % 5;
        l = (n & (1 << o) - 1).toString(32), n >>= o, s -= o, na = 1 << 32 - Rt(t) + s | a << s | n, sa = l + e;
      } else na = 1 << l | a << s | n, sa = e;
    }
    function yr(e) {
      e.return !== null && (ma(e, 1), Au(e, 1, 0));
    }
    function vr(e) {
      for (; e === Oi; ) Oi = Xn[--Vn], Xn[Vn] = null, zs = Xn[--Vn], Xn[Vn] = null;
      for (; e === Ua; ) Ua = Qt[--Xt], Qt[Xt] = null, sa = Qt[--Xt], Qt[Xt] = null, na = Qt[--Xt], Qt[Xt] = null;
    }
    function ju(e, t) {
      Qt[Xt++] = na, Qt[Xt++] = sa, Qt[Xt++] = Ua, na = t.id, sa = t.overflow, Ua = e;
    }
    var ht = null, Ke = null, Re = false, Oa = null, Vt = false, br = Error(u(519));
    function Ba(e) {
      var t = Error(u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw _s(Yt(t, e)), br;
    }
    function Iu(e) {
      var t = e.stateNode, a = e.type, n = e.memoizedProps;
      switch (t[mt] = e, t[St] = n, a) {
        case "dialog":
          je("cancel", t), je("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          je("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ai.length; a++) je(ai[a], t);
          break;
        case "source":
          je("error", t);
          break;
        case "img":
        case "image":
        case "link":
          je("error", t), je("load", t);
          break;
        case "details":
          je("toggle", t);
          break;
        case "input":
          je("invalid", t), Hc(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
          break;
        case "select":
          je("invalid", t);
          break;
        case "textarea":
          je("invalid", t), Yc(t, n.value, n.defaultValue, n.children);
      }
      a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === true || Vf(t.textContent, a) ? (n.popover != null && (je("beforetoggle", t), je("toggle", t)), n.onScroll != null && je("scroll", t), n.onScrollEnd != null && je("scrollend", t), n.onClick != null && (t.onclick = ua), t = true) : t = false, t || Ba(e, true);
    }
    function Eu(e) {
      for (ht = e.return; ht; ) switch (ht.tag) {
        case 5:
        case 31:
        case 13:
          Vt = false;
          return;
        case 27:
        case 3:
          Vt = true;
          return;
        default:
          ht = ht.return;
      }
    }
    function Zn(e) {
      if (e !== ht) return false;
      if (!Re) return Eu(e), Re = true, false;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Oo(e.type, e.memoizedProps)), a = !a), a && Ke && Ba(e), Eu(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
        Ke = t1(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
        Ke = t1(e);
      } else t === 27 ? (t = Ke, Pa(e.type) ? (e = Yo, Yo = null, Ke = e) : Ke = t) : Ke = ht ? Kt(e.stateNode.nextSibling) : null;
      return true;
    }
    function yn() {
      Ke = ht = null, Re = false;
    }
    function wr() {
      var e = Oa;
      return e !== null && (jt === null ? jt = e : jt.push.apply(jt, e), Oa = null), e;
    }
    function _s(e) {
      Oa === null ? Oa = [
        e
      ] : Oa.push(e);
    }
    var kr = v(null), vn = null, ha = null;
    function qa(e, t, a) {
      W(kr, t._currentValue), t._currentValue = a;
    }
    function pa(e) {
      e._currentValue = kr.current, H(kr);
    }
    function Sr(e, t, a) {
      for (; e !== null; ) {
        var n = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a) break;
        e = e.return;
      }
    }
    function Cr(e, t, a, n) {
      var s = e.child;
      for (s !== null && (s.return = e); s !== null; ) {
        var l = s.dependencies;
        if (l !== null) {
          var o = s.child;
          l = l.firstContext;
          e: for (; l !== null; ) {
            var d = l;
            l = s;
            for (var y = 0; y < t.length; y++) if (d.context === t[y]) {
              l.lanes |= a, d = l.alternate, d !== null && (d.lanes |= a), Sr(l.return, a, e), n || (o = null);
              break e;
            }
            l = d.next;
          }
        } else if (s.tag === 18) {
          if (o = s.return, o === null) throw Error(u(341));
          o.lanes |= a, l = o.alternate, l !== null && (l.lanes |= a), Sr(o, a, e), o = null;
        } else o = s.child;
        if (o !== null) o.return = s;
        else for (o = s; o !== null; ) {
          if (o === e) {
            o = null;
            break;
          }
          if (s = o.sibling, s !== null) {
            s.return = o.return, o = s;
            break;
          }
          o = o.return;
        }
        s = o;
      }
    }
    function Kn(e, t, a, n) {
      e = null;
      for (var s = t, l = false; s !== null; ) {
        if (!l) {
          if ((s.flags & 524288) !== 0) l = true;
          else if ((s.flags & 262144) !== 0) break;
        }
        if (s.tag === 10) {
          var o = s.alternate;
          if (o === null) throw Error(u(387));
          if (o = o.memoizedProps, o !== null) {
            var d = s.type;
            Tt(s.pendingProps.value, o.value) || (e !== null ? e.push(d) : e = [
              d
            ]);
          }
        } else if (s === Ne.current) {
          if (o = s.alternate, o === null) throw Error(u(387));
          o.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(ri) : e = [
            ri
          ]);
        }
        s = s.return;
      }
      e !== null && Cr(t, e, a, n), t.flags |= 262144;
    }
    function Bi(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Tt(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function bn(e) {
      vn = e, ha = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function pt(e) {
      return Nu(vn, e);
    }
    function qi(e, t) {
      return vn === null && bn(e), Nu(e, t);
    }
    function Nu(e, t) {
      var a = t._currentValue;
      if (t = {
        context: t,
        memoizedValue: a,
        next: null
      }, ha === null) {
        if (e === null) throw Error(u(308));
        ha = t, e.dependencies = {
          lanes: 0,
          firstContext: t
        }, e.flags |= 524288;
      } else ha = ha.next = t;
      return a;
    }
    var T2 = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: false,
        addEventListener: function(a, n) {
          e.push(n);
        }
      };
      this.abort = function() {
        t.aborted = true, e.forEach(function(a) {
          return a();
        });
      };
    }, z2 = r.unstable_scheduleCallback, _2 = r.unstable_NormalPriority, st = {
      $$typeof: le,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function xr() {
      return {
        controller: new T2(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Ds(e) {
      e.refCount--, e.refCount === 0 && z2(_2, function() {
        e.controller.abort();
      });
    }
    var Ls = null, Mr = 0, Jn = 0, Fn = null;
    function D2(e, t) {
      if (Ls === null) {
        var a = Ls = [];
        Mr = 0, Jn = Eo(), Fn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            a.push(n);
          }
        };
      }
      return Mr++, t.then(Ru, Ru), t;
    }
    function Ru() {
      if (--Mr === 0 && Ls !== null) {
        Fn !== null && (Fn.status = "fulfilled");
        var e = Ls;
        Ls = null, Jn = 0, Fn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function L2(e, t) {
      var a = [], n = {
        status: "pending",
        value: null,
        reason: null,
        then: function(s) {
          a.push(s);
        }
      };
      return e.then(function() {
        n.status = "fulfilled", n.value = t;
        for (var s = 0; s < a.length; s++) (0, a[s])(t);
      }, function(s) {
        for (n.status = "rejected", n.reason = s, s = 0; s < a.length; s++) (0, a[s])(void 0);
      }), n;
    }
    var Tu = U.S;
    U.S = function(e, t) {
      gf = P(), typeof t == "object" && t !== null && typeof t.then == "function" && D2(e, t), Tu !== null && Tu(e, t);
    };
    var wn = v(null);
    function Ar() {
      var e = wn.current;
      return e !== null ? e : Xe.pooledCache;
    }
    function Hi(e, t) {
      t === null ? W(wn, wn.current) : W(wn, t.pool);
    }
    function zu() {
      var e = Ar();
      return e === null ? null : {
        parent: st._currentValue,
        pool: e
      };
    }
    var $n = Error(u(460)), jr = Error(u(474)), Gi = Error(u(542)), Yi = {
      then: function() {
      }
    };
    function _u(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Du(e, t, a) {
      switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ua, ua), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Uu(e), e;
        default:
          if (typeof t.status == "string") t.then(ua, ua);
          else {
            if (e = Xe, e !== null && 100 < e.shellSuspendCounter) throw Error(u(482));
            e = t, e.status = "pending", e.then(function(n) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = n;
              }
            }, function(n) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = n;
              }
            });
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, Uu(e), e;
          }
          throw Sn = t, $n;
      }
    }
    function kn(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Sn = a, $n) : a;
      }
    }
    var Sn = null;
    function Lu() {
      if (Sn === null) throw Error(u(459));
      var e = Sn;
      return Sn = null, e;
    }
    function Uu(e) {
      if (e === $n || e === Gi) throw Error(u(483));
    }
    var Wn = null, Us = 0;
    function Qi(e) {
      var t = Us;
      return Us += 1, Wn === null && (Wn = []), Du(Wn, e, t);
    }
    function Os(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Xi(e, t) {
      throw t.$$typeof === Y ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function Ou(e) {
      function t(C, b) {
        if (e) {
          var j = C.deletions;
          j === null ? (C.deletions = [
            b
          ], C.flags |= 16) : j.push(b);
        }
      }
      function a(C, b) {
        if (!e) return null;
        for (; b !== null; ) t(C, b), b = b.sibling;
        return null;
      }
      function n(C) {
        for (var b = /* @__PURE__ */ new Map(); C !== null; ) C.key !== null ? b.set(C.key, C) : b.set(C.index, C), C = C.sibling;
        return b;
      }
      function s(C, b) {
        return C = fa(C, b), C.index = 0, C.sibling = null, C;
      }
      function l(C, b, j) {
        return C.index = j, e ? (j = C.alternate, j !== null ? (j = j.index, j < b ? (C.flags |= 67108866, b) : j) : (C.flags |= 67108866, b)) : (C.flags |= 1048576, b);
      }
      function o(C) {
        return e && C.alternate === null && (C.flags |= 67108866), C;
      }
      function d(C, b, j, G) {
        return b === null || b.tag !== 6 ? (b = pr(j, C.mode, G), b.return = C, b) : (b = s(b, j), b.return = C, b);
      }
      function y(C, b, j, G) {
        var de = j.type;
        return de === $ ? O(C, b, j.props.children, G, j.key) : b !== null && (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && kn(de) === b.type) ? (b = s(b, j.props), Os(b, j), b.return = C, b) : (b = Ui(j.type, j.key, j.props, null, C.mode, G), Os(b, j), b.return = C, b);
      }
      function I(C, b, j, G) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== j.containerInfo || b.stateNode.implementation !== j.implementation ? (b = gr(j, C.mode, G), b.return = C, b) : (b = s(b, j.children || []), b.return = C, b);
      }
      function O(C, b, j, G, de) {
        return b === null || b.tag !== 7 ? (b = gn(j, C.mode, G, de), b.return = C, b) : (b = s(b, j), b.return = C, b);
      }
      function Q(C, b, j) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return b = pr("" + b, C.mode, j), b.return = C, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case q:
              return j = Ui(b.type, b.key, b.props, null, C.mode, j), Os(j, b), j.return = C, j;
            case p:
              return b = gr(b, C.mode, j), b.return = C, b;
            case L:
              return b = kn(b), Q(C, b, j);
          }
          if (tt(b) || ke(b)) return b = gn(b, C.mode, j, null), b.return = C, b;
          if (typeof b.then == "function") return Q(C, Qi(b), j);
          if (b.$$typeof === le) return Q(C, qi(C, b), j);
          Xi(C, b);
        }
        return null;
      }
      function N(C, b, j, G) {
        var de = b !== null ? b.key : null;
        if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint") return de !== null ? null : d(C, b, "" + j, G);
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case q:
              return j.key === de ? y(C, b, j, G) : null;
            case p:
              return j.key === de ? I(C, b, j, G) : null;
            case L:
              return j = kn(j), N(C, b, j, G);
          }
          if (tt(j) || ke(j)) return de !== null ? null : O(C, b, j, G, null);
          if (typeof j.then == "function") return N(C, b, Qi(j), G);
          if (j.$$typeof === le) return N(C, b, qi(C, j), G);
          Xi(C, j);
        }
        return null;
      }
      function _(C, b, j, G, de) {
        if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint") return C = C.get(j) || null, d(b, C, "" + G, de);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case q:
              return C = C.get(G.key === null ? j : G.key) || null, y(b, C, G, de);
            case p:
              return C = C.get(G.key === null ? j : G.key) || null, I(b, C, G, de);
            case L:
              return G = kn(G), _(C, b, j, G, de);
          }
          if (tt(G) || ke(G)) return C = C.get(j) || null, O(b, C, G, de, null);
          if (typeof G.then == "function") return _(C, b, j, Qi(G), de);
          if (G.$$typeof === le) return _(C, b, j, qi(b, G), de);
          Xi(b, G);
        }
        return null;
      }
      function ie(C, b, j, G) {
        for (var de = null, _e = null, re = b, Ce = b = 0, Ee = null; re !== null && Ce < j.length; Ce++) {
          re.index > Ce ? (Ee = re, re = null) : Ee = re.sibling;
          var De = N(C, re, j[Ce], G);
          if (De === null) {
            re === null && (re = Ee);
            break;
          }
          e && re && De.alternate === null && t(C, re), b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De, re = Ee;
        }
        if (Ce === j.length) return a(C, re), Re && ma(C, Ce), de;
        if (re === null) {
          for (; Ce < j.length; Ce++) re = Q(C, j[Ce], G), re !== null && (b = l(re, b, Ce), _e === null ? de = re : _e.sibling = re, _e = re);
          return Re && ma(C, Ce), de;
        }
        for (re = n(re); Ce < j.length; Ce++) Ee = _(re, C, Ce, j[Ce], G), Ee !== null && (e && Ee.alternate !== null && re.delete(Ee.key === null ? Ce : Ee.key), b = l(Ee, b, Ce), _e === null ? de = Ee : _e.sibling = Ee, _e = Ee);
        return e && re.forEach(function(sn) {
          return t(C, sn);
        }), Re && ma(C, Ce), de;
      }
      function me(C, b, j, G) {
        if (j == null) throw Error(u(151));
        for (var de = null, _e = null, re = b, Ce = b = 0, Ee = null, De = j.next(); re !== null && !De.done; Ce++, De = j.next()) {
          re.index > Ce ? (Ee = re, re = null) : Ee = re.sibling;
          var sn = N(C, re, De.value, G);
          if (sn === null) {
            re === null && (re = Ee);
            break;
          }
          e && re && sn.alternate === null && t(C, re), b = l(sn, b, Ce), _e === null ? de = sn : _e.sibling = sn, _e = sn, re = Ee;
        }
        if (De.done) return a(C, re), Re && ma(C, Ce), de;
        if (re === null) {
          for (; !De.done; Ce++, De = j.next()) De = Q(C, De.value, G), De !== null && (b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De);
          return Re && ma(C, Ce), de;
        }
        for (re = n(re); !De.done; Ce++, De = j.next()) De = _(re, C, Ce, De.value, G), De !== null && (e && De.alternate !== null && re.delete(De.key === null ? Ce : De.key), b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De);
        return e && re.forEach(function(Zh) {
          return t(C, Zh);
        }), Re && ma(C, Ce), de;
      }
      function Ye(C, b, j, G) {
        if (typeof j == "object" && j !== null && j.type === $ && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case q:
              e: {
                for (var de = j.key; b !== null; ) {
                  if (b.key === de) {
                    if (de = j.type, de === $) {
                      if (b.tag === 7) {
                        a(C, b.sibling), G = s(b, j.props.children), G.return = C, C = G;
                        break e;
                      }
                    } else if (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && kn(de) === b.type) {
                      a(C, b.sibling), G = s(b, j.props), Os(G, j), G.return = C, C = G;
                      break e;
                    }
                    a(C, b);
                    break;
                  } else t(C, b);
                  b = b.sibling;
                }
                j.type === $ ? (G = gn(j.props.children, C.mode, G, j.key), G.return = C, C = G) : (G = Ui(j.type, j.key, j.props, null, C.mode, G), Os(G, j), G.return = C, C = G);
              }
              return o(C);
            case p:
              e: {
                for (de = j.key; b !== null; ) {
                  if (b.key === de) if (b.tag === 4 && b.stateNode.containerInfo === j.containerInfo && b.stateNode.implementation === j.implementation) {
                    a(C, b.sibling), G = s(b, j.children || []), G.return = C, C = G;
                    break e;
                  } else {
                    a(C, b);
                    break;
                  }
                  else t(C, b);
                  b = b.sibling;
                }
                G = gr(j, C.mode, G), G.return = C, C = G;
              }
              return o(C);
            case L:
              return j = kn(j), Ye(C, b, j, G);
          }
          if (tt(j)) return ie(C, b, j, G);
          if (ke(j)) {
            if (de = ke(j), typeof de != "function") throw Error(u(150));
            return j = de.call(j), me(C, b, j, G);
          }
          if (typeof j.then == "function") return Ye(C, b, Qi(j), G);
          if (j.$$typeof === le) return Ye(C, b, qi(C, j), G);
          Xi(C, j);
        }
        return typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint" ? (j = "" + j, b !== null && b.tag === 6 ? (a(C, b.sibling), G = s(b, j), G.return = C, C = G) : (a(C, b), G = pr(j, C.mode, G), G.return = C, C = G), o(C)) : a(C, b);
      }
      return function(C, b, j, G) {
        try {
          Us = 0;
          var de = Ye(C, b, j, G);
          return Wn = null, de;
        } catch (re) {
          if (re === $n || re === Gi) throw re;
          var _e = zt(29, re, null, C.mode);
          return _e.lanes = G, _e.return = C, _e;
        } finally {
        }
      };
    }
    var Cn = Ou(true), Bu = Ou(false), Ha = false;
    function Ir(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          lanes: 0,
          hiddenCallbacks: null
        },
        callbacks: null
      };
    }
    function Er(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function Ga(e) {
      return {
        lane: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Ya(e, t, a) {
      var n = e.updateQueue;
      if (n === null) return null;
      if (n = n.shared, (Oe & 2) !== 0) {
        var s = n.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), n.pending = t, t = Li(e), Su(e, null, a), t;
      }
      return Di(e, n, t, a), Li(e);
    }
    function Bs(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Nc(e, a);
      }
    }
    function Nr(e, t) {
      var a = e.updateQueue, n = e.alternate;
      if (n !== null && (n = n.updateQueue, a === n)) {
        var s = null, l = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var o = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            l === null ? s = l = o : l = l.next = o, a = a.next;
          } while (a !== null);
          l === null ? s = l = t : l = l.next = t;
        } else s = l = t;
        a = {
          baseState: n.baseState,
          firstBaseUpdate: s,
          lastBaseUpdate: l,
          shared: n.shared,
          callbacks: n.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    var Rr = false;
    function qs() {
      if (Rr) {
        var e = Fn;
        if (e !== null) throw e;
      }
    }
    function Hs(e, t, a, n) {
      Rr = false;
      var s = e.updateQueue;
      Ha = false;
      var l = s.firstBaseUpdate, o = s.lastBaseUpdate, d = s.shared.pending;
      if (d !== null) {
        s.shared.pending = null;
        var y = d, I = y.next;
        y.next = null, o === null ? l = I : o.next = I, o = y;
        var O = e.alternate;
        O !== null && (O = O.updateQueue, d = O.lastBaseUpdate, d !== o && (d === null ? O.firstBaseUpdate = I : d.next = I, O.lastBaseUpdate = y));
      }
      if (l !== null) {
        var Q = s.baseState;
        o = 0, O = I = y = null, d = l;
        do {
          var N = d.lane & -536870913, _ = N !== d.lane;
          if (_ ? (Ie & N) === N : (n & N) === N) {
            N !== 0 && N === Jn && (Rr = true), O !== null && (O = O.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            e: {
              var ie = e, me = d;
              N = t;
              var Ye = a;
              switch (me.tag) {
                case 1:
                  if (ie = me.payload, typeof ie == "function") {
                    Q = ie.call(Ye, Q, N);
                    break e;
                  }
                  Q = ie;
                  break e;
                case 3:
                  ie.flags = ie.flags & -65537 | 128;
                case 0:
                  if (ie = me.payload, N = typeof ie == "function" ? ie.call(Ye, Q, N) : ie, N == null) break e;
                  Q = z({}, Q, N);
                  break e;
                case 2:
                  Ha = true;
              }
            }
            N = d.callback, N !== null && (e.flags |= 64, _ && (e.flags |= 8192), _ = s.callbacks, _ === null ? s.callbacks = [
              N
            ] : _.push(N));
          } else _ = {
            lane: N,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, O === null ? (I = O = _, y = Q) : O = O.next = _, o |= N;
          if (d = d.next, d === null) {
            if (d = s.shared.pending, d === null) break;
            _ = d, d = _.next, _.next = null, s.lastBaseUpdate = _, s.shared.pending = null;
          }
        } while (true);
        O === null && (y = Q), s.baseState = y, s.firstBaseUpdate = I, s.lastBaseUpdate = O, l === null && (s.shared.lanes = 0), Ka |= o, e.lanes = o, e.memoizedState = Q;
      }
    }
    function qu(e, t) {
      if (typeof e != "function") throw Error(u(191, e));
      e.call(t);
    }
    function Hu(e, t) {
      var a = e.callbacks;
      if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) qu(a[e], t);
    }
    var Pn = v(null), Vi = v(0);
    function Gu(e, t) {
      e = xa, W(Vi, e), W(Pn, t), xa = e | t.baseLanes;
    }
    function Tr() {
      W(Vi, xa), W(Pn, Pn.current);
    }
    function zr() {
      xa = Vi.current, H(Pn), H(Vi);
    }
    var _t = v(null), Zt = null;
    function Qa(e) {
      var t = e.alternate;
      W(at, at.current & 1), W(_t, e), Zt === null && (t === null || Pn.current !== null || t.memoizedState !== null) && (Zt = e);
    }
    function _r(e) {
      W(at, at.current), W(_t, e), Zt === null && (Zt = e);
    }
    function Yu(e) {
      e.tag === 22 ? (W(at, at.current), W(_t, e), Zt === null && (Zt = e)) : Xa();
    }
    function Xa() {
      W(at, at.current), W(_t, _t.current);
    }
    function Dt(e) {
      H(_t), Zt === e && (Zt = null), H(at);
    }
    var at = v(0);
    function Zi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || Ho(a) || Go(a))) return t;
        } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ga = 0, Se = null, He = null, it = null, Ki = false, es = false, xn = false, Ji = 0, Gs = 0, ts = null, U2 = 0;
    function We() {
      throw Error(u(321));
    }
    function Dr(e, t) {
      if (t === null) return false;
      for (var a = 0; a < t.length && a < e.length; a++) if (!Tt(e[a], t[a])) return false;
      return true;
    }
    function Lr(e, t, a, n, s, l) {
      return ga = l, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? Ad : $r, xn = false, l = a(n, s), xn = false, es && (l = Xu(t, a, n, s)), Qu(e), l;
    }
    function Qu(e) {
      U.H = Xs;
      var t = He !== null && He.next !== null;
      if (ga = 0, it = He = Se = null, Ki = false, Gs = 0, ts = null, t) throw Error(u(300));
      e === null || lt || (e = e.dependencies, e !== null && Bi(e) && (lt = true));
    }
    function Xu(e, t, a, n) {
      Se = e;
      var s = 0;
      do {
        if (es && (ts = null), Gs = 0, es = false, 25 <= s) throw Error(u(301));
        if (s += 1, it = He = null, e.updateQueue != null) {
          var l = e.updateQueue;
          l.lastEffect = null, l.events = null, l.stores = null, l.memoCache != null && (l.memoCache.index = 0);
        }
        U.H = jd, l = t(a, n);
      } while (es);
      return l;
    }
    function O2() {
      var e = U.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Ys(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (Se.flags |= 1024), t;
    }
    function Ur() {
      var e = Ji !== 0;
      return Ji = 0, e;
    }
    function Or(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
    }
    function Br(e) {
      if (Ki) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Ki = false;
      }
      ga = 0, it = He = Se = null, es = false, Gs = Ji = 0, ts = null;
    }
    function wt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return it === null ? Se.memoizedState = it = e : it = it.next = e, it;
    }
    function nt() {
      if (He === null) {
        var e = Se.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = He.next;
      var t = it === null ? Se.memoizedState : it.next;
      if (t !== null) it = t, He = e;
      else {
        if (e === null) throw Se.alternate === null ? Error(u(467)) : Error(u(310));
        He = e, e = {
          memoizedState: He.memoizedState,
          baseState: He.baseState,
          baseQueue: He.baseQueue,
          queue: He.queue,
          next: null
        }, it === null ? Se.memoizedState = it = e : it = it.next = e;
      }
      return it;
    }
    function Fi() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function Ys(e) {
      var t = Gs;
      return Gs += 1, ts === null && (ts = []), e = Du(ts, e, t), t = Se, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Ad : $r), e;
    }
    function $i(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Ys(e);
        if (e.$$typeof === le) return pt(e);
      }
      throw Error(u(438, String(e)));
    }
    function qr(e) {
      var t = null, a = Se.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var n = Se.alternate;
        n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
          data: n.data.map(function(s) {
            return s.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = {
        data: [],
        index: 0
      }), a === null && (a = Fi(), Se.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = se;
      return t.index++, a;
    }
    function ya(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Wi(e) {
      var t = nt();
      return Hr(t, He, e);
    }
    function Hr(e, t, a) {
      var n = e.queue;
      if (n === null) throw Error(u(311));
      n.lastRenderedReducer = a;
      var s = e.baseQueue, l = n.pending;
      if (l !== null) {
        if (s !== null) {
          var o = s.next;
          s.next = l.next, l.next = o;
        }
        t.baseQueue = s = l, n.pending = null;
      }
      if (l = e.baseState, s === null) e.memoizedState = l;
      else {
        t = s.next;
        var d = o = null, y = null, I = t, O = false;
        do {
          var Q = I.lane & -536870913;
          if (Q !== I.lane ? (Ie & Q) === Q : (ga & Q) === Q) {
            var N = I.revertLane;
            if (N === 0) y !== null && (y = y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }), Q === Jn && (O = true);
            else if ((ga & N) === N) {
              I = I.next, N === Jn && (O = true);
              continue;
            } else Q = {
              lane: 0,
              revertLane: I.revertLane,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }, y === null ? (d = y = Q, o = l) : y = y.next = Q, Se.lanes |= N, Ka |= N;
            Q = I.action, xn && a(l, Q), l = I.hasEagerState ? I.eagerState : a(l, Q);
          } else N = {
            lane: Q,
            revertLane: I.revertLane,
            gesture: I.gesture,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          }, y === null ? (d = y = N, o = l) : y = y.next = N, Se.lanes |= Q, Ka |= Q;
          I = I.next;
        } while (I !== null && I !== t);
        if (y === null ? o = l : y.next = d, !Tt(l, e.memoizedState) && (lt = true, O && (a = Fn, a !== null))) throw a;
        e.memoizedState = l, e.baseState = o, e.baseQueue = y, n.lastRenderedState = l;
      }
      return s === null && (n.lanes = 0), [
        e.memoizedState,
        n.dispatch
      ];
    }
    function Gr(e) {
      var t = nt(), a = t.queue;
      if (a === null) throw Error(u(311));
      a.lastRenderedReducer = e;
      var n = a.dispatch, s = a.pending, l = t.memoizedState;
      if (s !== null) {
        a.pending = null;
        var o = s = s.next;
        do
          l = e(l, o.action), o = o.next;
        while (o !== s);
        Tt(l, t.memoizedState) || (lt = true), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), a.lastRenderedState = l;
      }
      return [
        l,
        n
      ];
    }
    function Vu(e, t, a) {
      var n = Se, s = nt(), l = Re;
      if (l) {
        if (a === void 0) throw Error(u(407));
        a = a();
      } else a = t();
      var o = !Tt((He || s).memoizedState, a);
      if (o && (s.memoizedState = a, lt = true), s = s.queue, Xr(Ju.bind(null, n, s, e), [
        e
      ]), s.getSnapshot !== t || o || it !== null && it.memoizedState.tag & 1) {
        if (n.flags |= 2048, as(9, {
          destroy: void 0
        }, Ku.bind(null, n, s, a, t), null), Xe === null) throw Error(u(349));
        l || (ga & 127) !== 0 || Zu(n, t, a);
      }
      return a;
    }
    function Zu(e, t, a) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: a
      }, t = Se.updateQueue, t === null ? (t = Fi(), Se.updateQueue = t, t.stores = [
        e
      ]) : (a = t.stores, a === null ? t.stores = [
        e
      ] : a.push(e));
    }
    function Ku(e, t, a, n) {
      t.value = a, t.getSnapshot = n, Fu(t) && $u(e);
    }
    function Ju(e, t, a) {
      return a(function() {
        Fu(t) && $u(e);
      });
    }
    function Fu(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !Tt(e, a);
      } catch {
        return true;
      }
    }
    function $u(e) {
      var t = pn(e, 2);
      t !== null && It(t, e, 2);
    }
    function Yr(e) {
      var t = wt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), xn) {
          _a2(true);
          try {
            a();
          } finally {
            _a2(false);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ya,
        lastRenderedState: e
      }, t;
    }
    function Wu(e, t, a, n) {
      return e.baseState = a, Hr(e, He, typeof n == "function" ? n : ya);
    }
    function B2(e, t, a, n, s) {
      if (tl(e)) throw Error(u(485));
      if (e = t.action, e !== null) {
        var l = {
          payload: s,
          action: e,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(o) {
            l.listeners.push(o);
          }
        };
        U.T !== null ? a(true) : l.isTransition = false, n(l), a = t.pending, a === null ? (l.next = t.pending = l, Pu(t, l)) : (l.next = a.next, t.pending = a.next = l);
      }
    }
    function Pu(e, t) {
      var a = t.action, n = t.payload, s = e.state;
      if (t.isTransition) {
        var l = U.T, o = {};
        U.T = o;
        try {
          var d = a(s, n), y = U.S;
          y !== null && y(o, d), ed(e, t, d);
        } catch (I) {
          Qr(e, t, I);
        } finally {
          l !== null && o.types !== null && (l.types = o.types), U.T = l;
        }
      } else try {
        l = a(s, n), ed(e, t, l);
      } catch (I) {
        Qr(e, t, I);
      }
    }
    function ed(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
        td(e, t, n);
      }, function(n) {
        return Qr(e, t, n);
      }) : td(e, t, a);
    }
    function td(e, t, a) {
      t.status = "fulfilled", t.value = a, ad(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Pu(e, a)));
    }
    function Qr(e, t, a) {
      var n = e.pending;
      if (e.pending = null, n !== null) {
        n = n.next;
        do
          t.status = "rejected", t.reason = a, ad(t), t = t.next;
        while (t !== n);
      }
      e.action = null;
    }
    function ad(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function nd(e, t) {
      return t;
    }
    function sd(e, t) {
      if (Re) {
        var a = Xe.formState;
        if (a !== null) {
          e: {
            var n = Se;
            if (Re) {
              if (Ke) {
                t: {
                  for (var s = Ke, l = Vt; s.nodeType !== 8; ) {
                    if (!l) {
                      s = null;
                      break t;
                    }
                    if (s = Kt(s.nextSibling), s === null) {
                      s = null;
                      break t;
                    }
                  }
                  l = s.data, s = l === "F!" || l === "F" ? s : null;
                }
                if (s) {
                  Ke = Kt(s.nextSibling), n = s.data === "F!";
                  break e;
                }
              }
              Ba(n);
            }
            n = false;
          }
          n && (t = a[0]);
        }
      }
      return a = wt(), a.memoizedState = a.baseState = t, n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nd,
        lastRenderedState: t
      }, a.queue = n, a = Cd.bind(null, Se, n), n.dispatch = a, n = Yr(false), l = Fr.bind(null, Se, false, n.queue), n = wt(), s = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, n.queue = s, a = B2.bind(null, Se, s, l, a), s.dispatch = a, n.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function id(e) {
      var t = nt();
      return ld(t, He, e);
    }
    function ld(e, t, a) {
      if (t = Hr(e, t, nd)[0], e = Wi(ya)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var n = Ys(t);
      } catch (o) {
        throw o === $n ? Gi : o;
      }
      else n = t;
      t = nt();
      var s = t.queue, l = s.dispatch;
      return a !== t.memoizedState && (Se.flags |= 2048, as(9, {
        destroy: void 0
      }, q2.bind(null, s, a), null)), [
        n,
        l,
        e
      ];
    }
    function q2(e, t) {
      e.action = t;
    }
    function rd(e) {
      var t = nt(), a = He;
      if (a !== null) return ld(t, a, e);
      nt(), t = t.memoizedState, a = nt();
      var n = a.queue.dispatch;
      return a.memoizedState = e, [
        t,
        n,
        false
      ];
    }
    function as(e, t, a, n) {
      return e = {
        tag: e,
        create: a,
        deps: n,
        inst: t,
        next: null
      }, t = Se.updateQueue, t === null && (t = Fi(), Se.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e;
    }
    function od() {
      return nt().memoizedState;
    }
    function Pi(e, t, a, n) {
      var s = wt();
      Se.flags |= e, s.memoizedState = as(1 | t, {
        destroy: void 0
      }, a, n === void 0 ? null : n);
    }
    function el(e, t, a, n) {
      var s = nt();
      n = n === void 0 ? null : n;
      var l = s.memoizedState.inst;
      He !== null && n !== null && Dr(n, He.memoizedState.deps) ? s.memoizedState = as(t, l, a, n) : (Se.flags |= e, s.memoizedState = as(1 | t, l, a, n));
    }
    function cd(e, t) {
      Pi(8390656, 8, e, t);
    }
    function Xr(e, t) {
      el(2048, 8, e, t);
    }
    function H2(e) {
      Se.flags |= 4;
      var t = Se.updateQueue;
      if (t === null) t = Fi(), Se.updateQueue = t, t.events = [
        e
      ];
      else {
        var a = t.events;
        a === null ? t.events = [
          e
        ] : a.push(e);
      }
    }
    function ud(e) {
      var t = nt().memoizedState;
      return H2({
        ref: t,
        nextImpl: e
      }), function() {
        if ((Oe & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function dd(e, t) {
      return el(4, 2, e, t);
    }
    function fd(e, t) {
      return el(4, 4, e, t);
    }
    function md(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function hd(e, t, a) {
      a = a != null ? a.concat([
        e
      ]) : null, el(4, 4, md.bind(null, t, e), a);
    }
    function Vr() {
    }
    function pd(e, t) {
      var a = nt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      return t !== null && Dr(t, n[1]) ? n[0] : (a.memoizedState = [
        e,
        t
      ], e);
    }
    function gd(e, t) {
      var a = nt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      if (t !== null && Dr(t, n[1])) return n[0];
      if (n = e(), xn) {
        _a2(true);
        try {
          e();
        } finally {
          _a2(false);
        }
      }
      return a.memoizedState = [
        n,
        t
      ], n;
    }
    function Zr(e, t, a) {
      return a === void 0 || (ga & 1073741824) !== 0 && (Ie & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = vf(), Se.lanes |= e, Ka |= e, a);
    }
    function yd(e, t, a, n) {
      return Tt(a, t) ? a : Pn.current !== null ? (e = Zr(e, a, n), Tt(e, t) || (lt = true), e) : (ga & 42) === 0 || (ga & 1073741824) !== 0 && (Ie & 261930) === 0 ? (lt = true, e.memoizedState = a) : (e = vf(), Se.lanes |= e, Ka |= e, t);
    }
    function vd(e, t, a, n, s) {
      var l = w.p;
      w.p = l !== 0 && 8 > l ? l : 8;
      var o = U.T, d = {};
      U.T = d, Fr(e, false, t, a);
      try {
        var y = s(), I = U.S;
        if (I !== null && I(d, y), y !== null && typeof y == "object" && typeof y.then == "function") {
          var O = L2(y, n);
          Qs(e, t, O, Ot(e));
        } else Qs(e, t, n, Ot(e));
      } catch (Q) {
        Qs(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Q
        }, Ot());
      } finally {
        w.p = l, o !== null && d.types !== null && (o.types = d.types), U.T = o;
      }
    }
    function G2() {
    }
    function Kr(e, t, a, n) {
      if (e.tag !== 5) throw Error(u(476));
      var s = bd(e).queue;
      vd(e, s, t, Z, a === null ? G2 : function() {
        return wd(e), a(n);
      });
    }
    function bd(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: Z,
        baseState: Z,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ya,
          lastRenderedState: Z
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ya,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function wd(e) {
      var t = bd(e);
      t.next === null && (t = e.alternate.memoizedState), Qs(e, t.next.queue, {}, Ot());
    }
    function Jr() {
      return pt(ri);
    }
    function kd() {
      return nt().memoizedState;
    }
    function Sd() {
      return nt().memoizedState;
    }
    function Y2(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = Ot();
            e = Ga(a);
            var n = Ya(t, e, a);
            n !== null && (It(n, t, a), Bs(n, t, a)), t = {
              cache: xr()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function Q2(e, t, a) {
      var n = Ot();
      a = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, tl(e) ? xd(t, a) : (a = mr(e, t, a, n), a !== null && (It(a, e, n), Md(a, t, n)));
    }
    function Cd(e, t, a) {
      var n = Ot();
      Qs(e, t, a, n);
    }
    function Qs(e, t, a, n) {
      var s = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (tl(e)) xd(t, s);
      else {
        var l = e.alternate;
        if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
          var o = t.lastRenderedState, d = l(o, a);
          if (s.hasEagerState = true, s.eagerState = d, Tt(d, o)) return Di(e, t, s, 0), Xe === null && _i(), false;
        } catch {
        } finally {
        }
        if (a = mr(e, t, s, n), a !== null) return It(a, e, n), Md(a, t, n), true;
      }
      return false;
    }
    function Fr(e, t, a, n) {
      if (n = {
        lane: 2,
        revertLane: Eo(),
        gesture: null,
        action: n,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, tl(e)) {
        if (t) throw Error(u(479));
      } else t = mr(e, a, n, 2), t !== null && It(t, e, 2);
    }
    function tl(e) {
      var t = e.alternate;
      return e === Se || t !== null && t === Se;
    }
    function xd(e, t) {
      es = Ki = true;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Md(e, t, a) {
      if ((a & 4194048) !== 0) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Nc(e, a);
      }
    }
    var Xs = {
      readContext: pt,
      use: $i,
      useCallback: We,
      useContext: We,
      useEffect: We,
      useImperativeHandle: We,
      useLayoutEffect: We,
      useInsertionEffect: We,
      useMemo: We,
      useReducer: We,
      useRef: We,
      useState: We,
      useDebugValue: We,
      useDeferredValue: We,
      useTransition: We,
      useSyncExternalStore: We,
      useId: We,
      useHostTransitionStatus: We,
      useFormState: We,
      useActionState: We,
      useOptimistic: We,
      useMemoCache: We,
      useCacheRefresh: We
    };
    Xs.useEffectEvent = We;
    var Ad = {
      readContext: pt,
      use: $i,
      useCallback: function(e, t) {
        return wt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: pt,
      useEffect: cd,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([
          e
        ]) : null, Pi(4194308, 4, md.bind(null, t, e), a);
      },
      useLayoutEffect: function(e, t) {
        return Pi(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        Pi(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var a = wt();
        t = t === void 0 ? null : t;
        var n = e();
        if (xn) {
          _a2(true);
          try {
            e();
          } finally {
            _a2(false);
          }
        }
        return a.memoizedState = [
          n,
          t
        ], n;
      },
      useReducer: function(e, t, a) {
        var n = wt();
        if (a !== void 0) {
          var s = a(t);
          if (xn) {
            _a2(true);
            try {
              a(t);
            } finally {
              _a2(false);
            }
          }
        } else s = t;
        return n.memoizedState = n.baseState = s, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: s
        }, n.queue = e, e = e.dispatch = Q2.bind(null, Se, e), [
          n.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = wt();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: function(e) {
        e = Yr(e);
        var t = e.queue, a = Cd.bind(null, Se, t);
        return t.dispatch = a, [
          e.memoizedState,
          a
        ];
      },
      useDebugValue: Vr,
      useDeferredValue: function(e, t) {
        var a = wt();
        return Zr(a, e, t);
      },
      useTransition: function() {
        var e = Yr(false);
        return e = vd.bind(null, Se, e.queue, true, false), wt().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, a) {
        var n = Se, s = wt();
        if (Re) {
          if (a === void 0) throw Error(u(407));
          a = a();
        } else {
          if (a = t(), Xe === null) throw Error(u(349));
          (Ie & 127) !== 0 || Zu(n, t, a);
        }
        s.memoizedState = a;
        var l = {
          value: a,
          getSnapshot: t
        };
        return s.queue = l, cd(Ju.bind(null, n, l, e), [
          e
        ]), n.flags |= 2048, as(9, {
          destroy: void 0
        }, Ku.bind(null, n, l, a, t), null), a;
      },
      useId: function() {
        var e = wt(), t = Xe.identifierPrefix;
        if (Re) {
          var a = sa, n = na;
          a = (n & ~(1 << 32 - Rt(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ji++, 0 < a && (t += "H" + a.toString(32)), t += "_";
        } else a = U2++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Jr,
      useFormState: sd,
      useActionState: sd,
      useOptimistic: function(e) {
        var t = wt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = a, t = Fr.bind(null, Se, true, a), a.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: qr,
      useCacheRefresh: function() {
        return wt().memoizedState = Y2.bind(null, Se);
      },
      useEffectEvent: function(e) {
        var t = wt(), a = {
          impl: e
        };
        return t.memoizedState = a, function() {
          if ((Oe & 2) !== 0) throw Error(u(440));
          return a.impl.apply(void 0, arguments);
        };
      }
    }, $r = {
      readContext: pt,
      use: $i,
      useCallback: pd,
      useContext: pt,
      useEffect: Xr,
      useImperativeHandle: hd,
      useInsertionEffect: dd,
      useLayoutEffect: fd,
      useMemo: gd,
      useReducer: Wi,
      useRef: od,
      useState: function() {
        return Wi(ya);
      },
      useDebugValue: Vr,
      useDeferredValue: function(e, t) {
        var a = nt();
        return yd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Wi(ya)[0], t = nt().memoizedState;
        return [
          typeof e == "boolean" ? e : Ys(e),
          t
        ];
      },
      useSyncExternalStore: Vu,
      useId: kd,
      useHostTransitionStatus: Jr,
      useFormState: id,
      useActionState: id,
      useOptimistic: function(e, t) {
        var a = nt();
        return Wu(a, He, e, t);
      },
      useMemoCache: qr,
      useCacheRefresh: Sd
    };
    $r.useEffectEvent = ud;
    var jd = {
      readContext: pt,
      use: $i,
      useCallback: pd,
      useContext: pt,
      useEffect: Xr,
      useImperativeHandle: hd,
      useInsertionEffect: dd,
      useLayoutEffect: fd,
      useMemo: gd,
      useReducer: Gr,
      useRef: od,
      useState: function() {
        return Gr(ya);
      },
      useDebugValue: Vr,
      useDeferredValue: function(e, t) {
        var a = nt();
        return He === null ? Zr(a, e, t) : yd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Gr(ya)[0], t = nt().memoizedState;
        return [
          typeof e == "boolean" ? e : Ys(e),
          t
        ];
      },
      useSyncExternalStore: Vu,
      useId: kd,
      useHostTransitionStatus: Jr,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function(e, t) {
        var a = nt();
        return He !== null ? Wu(a, He, e, t) : (a.baseState = e, [
          e,
          a.queue.dispatch
        ]);
      },
      useMemoCache: qr,
      useCacheRefresh: Sd
    };
    jd.useEffectEvent = ud;
    function Wr(e, t, a, n) {
      t = e.memoizedState, a = a(n, t), a = a == null ? t : z({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
    }
    var Pr = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var n = Ot(), s = Ga(n);
        s.payload = t, a != null && (s.callback = a), t = Ya(e, s, n), t !== null && (It(t, e, n), Bs(t, e, n));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var n = Ot(), s = Ga(n);
        s.tag = 1, s.payload = t, a != null && (s.callback = a), t = Ya(e, s, n), t !== null && (It(t, e, n), Bs(t, e, n));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Ot(), n = Ga(a);
        n.tag = 2, t != null && (n.callback = t), t = Ya(e, n, a), t !== null && (It(t, e, a), Bs(t, e, a));
      }
    };
    function Id(e, t, a, n, s, l, o) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, l, o) : t.prototype && t.prototype.isPureReactComponent ? !Rs(a, n) || !Rs(s, l) : true;
    }
    function Ed(e, t, a, n) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && Pr.enqueueReplaceState(t, t.state, null);
    }
    function Mn(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var n in t) n !== "ref" && (a[n] = t[n]);
      }
      if (e = e.defaultProps) {
        a === t && (a = z({}, a));
        for (var s in e) a[s] === void 0 && (a[s] = e[s]);
      }
      return a;
    }
    function Nd(e) {
      zi(e);
    }
    function Rd(e) {
      console.error(e);
    }
    function Td(e) {
      zi(e);
    }
    function al(e, t) {
      try {
        var a = e.onUncaughtError;
        a(t.value, {
          componentStack: t.stack
        });
      } catch (n) {
        setTimeout(function() {
          throw n;
        });
      }
    }
    function zd(e, t, a) {
      try {
        var n = e.onCaughtError;
        n(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (s) {
        setTimeout(function() {
          throw s;
        });
      }
    }
    function eo(e, t, a) {
      return a = Ga(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        al(e, t);
      }, a;
    }
    function _d(e) {
      return e = Ga(e), e.tag = 3, e;
    }
    function Dd(e, t, a, n) {
      var s = a.type.getDerivedStateFromError;
      if (typeof s == "function") {
        var l = n.value;
        e.payload = function() {
          return s(l);
        }, e.callback = function() {
          zd(t, a, n);
        };
      }
      var o = a.stateNode;
      o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
        zd(t, a, n), typeof s != "function" && (Ja === null ? Ja = /* @__PURE__ */ new Set([
          this
        ]) : Ja.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function X2(e, t, a, n, s) {
      if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (t = a.alternate, t !== null && Kn(t, a, s, true), a = _t.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return Zt === null ? hl() : a.alternate === null && Pe === 0 && (Pe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = s, n === Yi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([
                n
              ]) : t.add(n), Ao(e, n, s)), false;
            case 22:
              return a.flags |= 65536, n === Yi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  n
                ])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([
                n
              ]) : a.add(n)), Ao(e, n, s)), false;
          }
          throw Error(u(435, a.tag));
        }
        return Ao(e, n, s), hl(), false;
      }
      if (Re) return t = _t.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, n !== br && (e = Error(u(422), {
        cause: n
      }), _s(Yt(e, a)))) : (n !== br && (t = Error(u(423), {
        cause: n
      }), _s(Yt(t, a))), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, n = Yt(n, a), s = eo(e.stateNode, n, s), Nr(e, s), Pe !== 4 && (Pe = 2)), false;
      var l = Error(u(520), {
        cause: n
      });
      if (l = Yt(l, a), Ps === null ? Ps = [
        l
      ] : Ps.push(l), Pe !== 4 && (Pe = 2), t === null) return true;
      n = Yt(n, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = s & -s, a.lanes |= e, e = eo(a.stateNode, n, e), Nr(a, e), false;
          case 1:
            if (t = a.type, l = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || l !== null && typeof l.componentDidCatch == "function" && (Ja === null || !Ja.has(l)))) return a.flags |= 65536, s &= -s, a.lanes |= s, s = _d(s), Dd(s, e, a, n), Nr(a, s), false;
        }
        a = a.return;
      } while (a !== null);
      return false;
    }
    var to = Error(u(461)), lt = false;
    function gt(e, t, a, n) {
      t.child = e === null ? Bu(t, null, a, n) : Cn(t, e.child, a, n);
    }
    function Ld(e, t, a, n, s) {
      a = a.render;
      var l = t.ref;
      if ("ref" in n) {
        var o = {};
        for (var d in n) d !== "ref" && (o[d] = n[d]);
      } else o = n;
      return bn(t), n = Lr(e, t, a, o, l, s), d = Ur(), e !== null && !lt ? (Or(e, t, s), va(e, t, s)) : (Re && d && yr(t), t.flags |= 1, gt(e, t, n, s), t.child);
    }
    function Ud(e, t, a, n, s) {
      if (e === null) {
        var l = a.type;
        return typeof l == "function" && !hr(l) && l.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = l, Od(e, t, l, n, s)) : (e = Ui(a.type, null, n, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (l = e.child, !co(e, s)) {
        var o = l.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Rs, a(o, n) && e.ref === t.ref) return va(e, t, s);
      }
      return t.flags |= 1, e = fa(l, n), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Od(e, t, a, n, s) {
      if (e !== null) {
        var l = e.memoizedProps;
        if (Rs(l, n) && e.ref === t.ref) if (lt = false, t.pendingProps = n = l, co(e, s)) (e.flags & 131072) !== 0 && (lt = true);
        else return t.lanes = e.lanes, va(e, t, s);
      }
      return ao(e, t, a, n, s);
    }
    function Bd(e, t, a, n) {
      var s = n.children, l = e !== null ? e.memoizedState : null;
      if (e === null && t.stateNode === null && (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), n.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (l = l !== null ? l.baseLanes | a : a, e !== null) {
            for (n = t.child = e.child, s = 0; n !== null; ) s = s | n.lanes | n.childLanes, n = n.sibling;
            n = s & ~l;
          } else n = 0, t.child = null;
          return qd(e, t, l, a, n);
        }
        if ((a & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && Hi(t, l !== null ? l.cachePool : null), l !== null ? Gu(t, l) : Tr(), Yu(t);
        else return n = t.lanes = 536870912, qd(e, t, l !== null ? l.baseLanes | a : a, a, n);
      } else l !== null ? (Hi(t, l.cachePool), Gu(t, l), Xa(), t.memoizedState = null) : (e !== null && Hi(t, null), Tr(), Xa());
      return gt(e, t, s, a), t.child;
    }
    function Vs(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function qd(e, t, a, n, s) {
      var l = Ar();
      return l = l === null ? null : {
        parent: st._currentValue,
        pool: l
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: l
      }, e !== null && Hi(t, null), Tr(), Yu(t), e !== null && Kn(e, t, n, true), t.childLanes = s, null;
    }
    function nl(e, t) {
      return t = il({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Hd(e, t, a) {
      return Cn(t, e.child, null, a), e = nl(t, t.pendingProps), e.flags |= 2, Dt(t), t.memoizedState = null, e;
    }
    function V2(e, t, a) {
      var n = t.pendingProps, s = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (Re) {
          if (n.mode === "hidden") return e = nl(t, n), t.lanes = 536870912, Vs(null, e);
          if (_r(t), (e = Ke) ? (e = e1(e, Vt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Ua !== null ? {
              id: na,
              overflow: sa
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = xu(e), a.return = t, t.child = a, ht = t, Ke = null)) : e = null, e === null) throw Ba(t);
          return t.lanes = 536870912, null;
        }
        return nl(t, n);
      }
      var l = e.memoizedState;
      if (l !== null) {
        var o = l.dehydrated;
        if (_r(t), s) if (t.flags & 256) t.flags &= -257, t = Hd(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
        else if (lt || Kn(e, t, a, false), s = (a & e.childLanes) !== 0, lt || s) {
          if (n = Xe, n !== null && (o = Rc(n, a), o !== 0 && o !== l.retryLane)) throw l.retryLane = o, pn(e, o), It(n, e, o), to;
          hl(), t = Hd(e, t, a);
        } else e = l.treeContext, Ke = Kt(o.nextSibling), ht = t, Re = true, Oa = null, Vt = false, e !== null && ju(t, e), t = nl(t, n), t.flags |= 4096;
        return t;
      }
      return e = fa(e.child, {
        mode: n.mode,
        children: n.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function sl(e, t) {
      var a = t.ref;
      if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object") throw Error(u(284));
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function ao(e, t, a, n, s) {
      return bn(t), a = Lr(e, t, a, n, void 0, s), n = Ur(), e !== null && !lt ? (Or(e, t, s), va(e, t, s)) : (Re && n && yr(t), t.flags |= 1, gt(e, t, a, s), t.child);
    }
    function Gd(e, t, a, n, s, l) {
      return bn(t), t.updateQueue = null, a = Xu(t, n, a, s), Qu(e), n = Ur(), e !== null && !lt ? (Or(e, t, l), va(e, t, l)) : (Re && n && yr(t), t.flags |= 1, gt(e, t, a, l), t.child);
    }
    function Yd(e, t, a, n, s) {
      if (bn(t), t.stateNode === null) {
        var l = Qn, o = a.contextType;
        typeof o == "object" && o !== null && (l = pt(o)), l = new a(n, l), t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, l.updater = Pr, t.stateNode = l, l._reactInternals = t, l = t.stateNode, l.props = n, l.state = t.memoizedState, l.refs = {}, Ir(t), o = a.contextType, l.context = typeof o == "object" && o !== null ? pt(o) : Qn, l.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o == "function" && (Wr(t, a, o, n), l.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (o = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), o !== l.state && Pr.enqueueReplaceState(l, l.state, null), Hs(t, n, l, s), qs(), l.state = t.memoizedState), typeof l.componentDidMount == "function" && (t.flags |= 4194308), n = true;
      } else if (e === null) {
        l = t.stateNode;
        var d = t.memoizedProps, y = Mn(a, d);
        l.props = y;
        var I = l.context, O = a.contextType;
        o = Qn, typeof O == "object" && O !== null && (o = pt(O));
        var Q = a.getDerivedStateFromProps;
        O = typeof Q == "function" || typeof l.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, O || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (d || I !== o) && Ed(t, l, n, o), Ha = false;
        var N = t.memoizedState;
        l.state = N, Hs(t, n, l, s), qs(), I = t.memoizedState, d || N !== I || Ha ? (typeof Q == "function" && (Wr(t, a, Q, n), I = t.memoizedState), (y = Ha || Id(t, a, y, n, N, I, o)) ? (O || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = I), l.props = n, l.state = I, l.context = o, n = y) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), n = false);
      } else {
        l = t.stateNode, Er(e, t), o = t.memoizedProps, O = Mn(a, o), l.props = O, Q = t.pendingProps, N = l.context, I = a.contextType, y = Qn, typeof I == "object" && I !== null && (y = pt(I)), d = a.getDerivedStateFromProps, (I = typeof d == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (o !== Q || N !== y) && Ed(t, l, n, y), Ha = false, N = t.memoizedState, l.state = N, Hs(t, n, l, s), qs();
        var _ = t.memoizedState;
        o !== Q || N !== _ || Ha || e !== null && e.dependencies !== null && Bi(e.dependencies) ? (typeof d == "function" && (Wr(t, a, d, n), _ = t.memoizedState), (O = Ha || Id(t, a, O, n, N, _, y) || e !== null && e.dependencies !== null && Bi(e.dependencies)) ? (I || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(n, _, y), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(n, _, y)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || o === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = _), l.props = n, l.state = _, l.context = y, n = O) : (typeof l.componentDidUpdate != "function" || o === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), n = false);
      }
      return l = n, sl(e, t), n = (t.flags & 128) !== 0, l || n ? (l = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : l.render(), t.flags |= 1, e !== null && n ? (t.child = Cn(t, e.child, null, s), t.child = Cn(t, null, a, s)) : gt(e, t, a, s), t.memoizedState = l.state, e = t.child) : e = va(e, t, s), e;
    }
    function Qd(e, t, a, n) {
      return yn(), t.flags |= 256, gt(e, t, a, n), t.child;
    }
    var no = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function so(e) {
      return {
        baseLanes: e,
        cachePool: zu()
      };
    }
    function io(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ut), e;
    }
    function Xd(e, t, a) {
      var n = t.pendingProps, s = false, l = (t.flags & 128) !== 0, o;
      if ((o = l) || (o = e !== null && e.memoizedState === null ? false : (at.current & 2) !== 0), o && (s = true, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Re) {
          if (s ? Qa(t) : Xa(), (e = Ke) ? (e = e1(e, Vt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Ua !== null ? {
              id: na,
              overflow: sa
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = xu(e), a.return = t, t.child = a, ht = t, Ke = null)) : e = null, e === null) throw Ba(t);
          return Go(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var d = n.children;
        return n = n.fallback, s ? (Xa(), s = t.mode, d = il({
          mode: "hidden",
          children: d
        }, s), n = gn(n, s, a, null), d.return = t, n.return = t, d.sibling = n, t.child = d, n = t.child, n.memoizedState = so(a), n.childLanes = io(e, o, a), t.memoizedState = no, Vs(null, n)) : (Qa(t), lo(t, d));
      }
      var y = e.memoizedState;
      if (y !== null && (d = y.dehydrated, d !== null)) {
        if (l) t.flags & 256 ? (Qa(t), t.flags &= -257, t = ro(e, t, a)) : t.memoizedState !== null ? (Xa(), t.child = e.child, t.flags |= 128, t = null) : (Xa(), d = n.fallback, s = t.mode, n = il({
          mode: "visible",
          children: n.children
        }, s), d = gn(d, s, a, null), d.flags |= 2, n.return = t, d.return = t, n.sibling = d, t.child = n, Cn(t, e.child, null, a), n = t.child, n.memoizedState = so(a), n.childLanes = io(e, o, a), t.memoizedState = no, t = Vs(null, n));
        else if (Qa(t), Go(d)) {
          if (o = d.nextSibling && d.nextSibling.dataset, o) var I = o.dgst;
          o = I, n = Error(u(419)), n.stack = "", n.digest = o, _s({
            value: n,
            source: null,
            stack: null
          }), t = ro(e, t, a);
        } else if (lt || Kn(e, t, a, false), o = (a & e.childLanes) !== 0, lt || o) {
          if (o = Xe, o !== null && (n = Rc(o, a), n !== 0 && n !== y.retryLane)) throw y.retryLane = n, pn(e, n), It(o, e, n), to;
          Ho(d) || hl(), t = ro(e, t, a);
        } else Ho(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = y.treeContext, Ke = Kt(d.nextSibling), ht = t, Re = true, Oa = null, Vt = false, e !== null && ju(t, e), t = lo(t, n.children), t.flags |= 4096);
        return t;
      }
      return s ? (Xa(), d = n.fallback, s = t.mode, y = e.child, I = y.sibling, n = fa(y, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = y.subtreeFlags & 65011712, I !== null ? d = fa(I, d) : (d = gn(d, s, a, null), d.flags |= 2), d.return = t, n.return = t, n.sibling = d, t.child = n, Vs(null, n), n = t.child, d = e.child.memoizedState, d === null ? d = so(a) : (s = d.cachePool, s !== null ? (y = st._currentValue, s = s.parent !== y ? {
        parent: y,
        pool: y
      } : s) : s = zu(), d = {
        baseLanes: d.baseLanes | a,
        cachePool: s
      }), n.memoizedState = d, n.childLanes = io(e, o, a), t.memoizedState = no, Vs(e.child, n)) : (Qa(t), a = e.child, e = a.sibling, a = fa(a, {
        mode: "visible",
        children: n.children
      }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [
        e
      ], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function lo(e, t) {
      return t = il({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function il(e, t) {
      return e = zt(22, e, null, t), e.lanes = 0, e;
    }
    function ro(e, t, a) {
      return Cn(t, e.child, null, a), e = lo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Vd(e, t, a) {
      e.lanes |= t;
      var n = e.alternate;
      n !== null && (n.lanes |= t), Sr(e.return, t, a);
    }
    function oo(e, t, a, n, s, l) {
      var o = e.memoizedState;
      o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: a,
        tailMode: s,
        treeForkCount: l
      } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = a, o.tailMode = s, o.treeForkCount = l);
    }
    function Zd(e, t, a) {
      var n = t.pendingProps, s = n.revealOrder, l = n.tail;
      n = n.children;
      var o = at.current, d = (o & 2) !== 0;
      if (d ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, W(at, o), gt(e, t, n, a), n = Re ? zs : 0, !d && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Vd(e, a, t);
        else if (e.tag === 19) Vd(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      switch (s) {
        case "forwards":
          for (a = t.child, s = null; a !== null; ) e = a.alternate, e !== null && Zi(e) === null && (s = a), a = a.sibling;
          a = s, a === null ? (s = t.child, t.child = null) : (s = a.sibling, a.sibling = null), oo(t, false, s, a, l, n);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, s = t.child, t.child = null; s !== null; ) {
            if (e = s.alternate, e !== null && Zi(e) === null) {
              t.child = s;
              break;
            }
            e = s.sibling, s.sibling = a, a = s, s = e;
          }
          oo(t, true, a, null, l, n);
          break;
        case "together":
          oo(t, false, null, null, void 0, n);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function va(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ka |= t.lanes, (a & t.childLanes) === 0) if (e !== null) {
        if (Kn(e, t, a, false), (a & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(u(153));
      if (t.child !== null) {
        for (e = t.child, a = fa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; ) e = e.sibling, a = a.sibling = fa(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function co(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Bi(e)));
    }
    function Z2(e, t, a) {
      switch (t.tag) {
        case 3:
          ot(t, t.stateNode.containerInfo), qa(t, st, e.memoizedState.cache), yn();
          break;
        case 27:
        case 5:
          bt(t);
          break;
        case 4:
          ot(t, t.stateNode.containerInfo);
          break;
        case 10:
          qa(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, _r(t), null;
          break;
        case 13:
          var n = t.memoizedState;
          if (n !== null) return n.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Xd(e, t, a) : (Qa(t), e = va(e, t, a), e !== null ? e.sibling : null);
          Qa(t);
          break;
        case 19:
          var s = (e.flags & 128) !== 0;
          if (n = (a & t.childLanes) !== 0, n || (Kn(e, t, a, false), n = (a & t.childLanes) !== 0), s) {
            if (n) return Zd(e, t, a);
            t.flags |= 128;
          }
          if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), W(at, at.current), n) break;
          return null;
        case 22:
          return t.lanes = 0, Bd(e, t, a, t.pendingProps);
        case 24:
          qa(t, st, e.memoizedState.cache);
      }
      return va(e, t, a);
    }
    function Kd(e, t, a) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) lt = true;
      else {
        if (!co(e, a) && (t.flags & 128) === 0) return lt = false, Z2(e, t, a);
        lt = (e.flags & 131072) !== 0;
      }
      else lt = false, Re && (t.flags & 1048576) !== 0 && Au(t, zs, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var n = t.pendingProps;
            if (e = kn(t.elementType), t.type = e, typeof e == "function") hr(e) ? (n = Mn(e, n), t.tag = 1, t = Yd(null, t, e, n, a)) : (t.tag = 0, t = ao(null, t, e, n, a));
            else {
              if (e != null) {
                var s = e.$$typeof;
                if (s === he) {
                  t.tag = 11, t = Ld(null, t, e, n, a);
                  break e;
                } else if (s === T) {
                  t.tag = 14, t = Ud(null, t, e, n, a);
                  break e;
                }
              }
              throw t = Te(e) || e, Error(u(306, t, ""));
            }
          }
          return t;
        case 0:
          return ao(e, t, t.type, t.pendingProps, a);
        case 1:
          return n = t.type, s = Mn(n, t.pendingProps), Yd(e, t, n, s, a);
        case 3:
          e: {
            if (ot(t, t.stateNode.containerInfo), e === null) throw Error(u(387));
            n = t.pendingProps;
            var l = t.memoizedState;
            s = l.element, Er(e, t), Hs(t, n, null, a);
            var o = t.memoizedState;
            if (n = o.cache, qa(t, st, n), n !== l.cache && Cr(t, [
              st
            ], a, true), qs(), n = o.element, l.isDehydrated) if (l = {
              element: n,
              isDehydrated: false,
              cache: o.cache
            }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
              t = Qd(e, t, n, a);
              break e;
            } else if (n !== s) {
              s = Yt(Error(u(424)), t), _s(s), t = Qd(e, t, n, a);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ke = Kt(e.firstChild), ht = t, Re = true, Oa = null, Vt = true, a = Bu(t, null, n, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
            else {
              if (yn(), n === s) {
                t = va(e, t, a);
                break e;
              }
              gt(e, t, n, a);
            }
            t = t.child;
          }
          return t;
        case 26:
          return sl(e, t), e === null ? (a = l1(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : Re || (a = t.type, e = t.pendingProps, n = kl(be.current).createElement(a), n[mt] = t, n[St] = e, yt(n, a, e), ut(n), t.stateNode = n) : t.memoizedState = l1(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return bt(t), e === null && Re && (n = t.stateNode = n1(t.type, t.pendingProps, be.current), ht = t, Vt = true, s = Ke, Pa(t.type) ? (Yo = s, Ke = Kt(n.firstChild)) : Ke = s), gt(e, t, t.pendingProps.children, a), sl(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && Re && ((s = n = Ke) && (n = Ch(n, t.type, t.pendingProps, Vt), n !== null ? (t.stateNode = n, ht = t, Ke = Kt(n.firstChild), Vt = false, s = true) : s = false), s || Ba(t)), bt(t), s = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, n = l.children, Oo(s, l) ? n = null : o !== null && Oo(s, o) && (t.flags |= 32), t.memoizedState !== null && (s = Lr(e, t, O2, null, null, a), ri._currentValue = s), sl(e, t), gt(e, t, n, a), t.child;
        case 6:
          return e === null && Re && ((e = a = Ke) && (a = xh(a, t.pendingProps, Vt), a !== null ? (t.stateNode = a, ht = t, Ke = null, e = true) : e = false), e || Ba(t)), null;
        case 13:
          return Xd(e, t, a);
        case 4:
          return ot(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Cn(t, null, n, a) : gt(e, t, n, a), t.child;
        case 11:
          return Ld(e, t, t.type, t.pendingProps, a);
        case 7:
          return gt(e, t, t.pendingProps, a), t.child;
        case 8:
          return gt(e, t, t.pendingProps.children, a), t.child;
        case 12:
          return gt(e, t, t.pendingProps.children, a), t.child;
        case 10:
          return n = t.pendingProps, qa(t, t.type, n.value), gt(e, t, n.children, a), t.child;
        case 9:
          return s = t.type._context, n = t.pendingProps.children, bn(t), s = pt(s), n = n(s), t.flags |= 1, gt(e, t, n, a), t.child;
        case 14:
          return Ud(e, t, t.type, t.pendingProps, a);
        case 15:
          return Od(e, t, t.type, t.pendingProps, a);
        case 19:
          return Zd(e, t, a);
        case 31:
          return V2(e, t, a);
        case 22:
          return Bd(e, t, a, t.pendingProps);
        case 24:
          return bn(t), n = pt(st), e === null ? (s = Ar(), s === null && (s = Xe, l = xr(), s.pooledCache = l, l.refCount++, l !== null && (s.pooledCacheLanes |= a), s = l), t.memoizedState = {
            parent: n,
            cache: s
          }, Ir(t), qa(t, st, s)) : ((e.lanes & a) !== 0 && (Er(e, t), Hs(t, null, null, a), qs()), s = e.memoizedState, l = t.memoizedState, s.parent !== n ? (s = {
            parent: n,
            cache: n
          }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), qa(t, st, n)) : (n = l.cache, qa(t, st, n), n !== s.cache && Cr(t, [
            st
          ], a, true))), gt(e, t, t.pendingProps.children, a), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(u(156, t.tag));
    }
    function ba(e) {
      e.flags |= 4;
    }
    function uo(e, t, a, n, s) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (s & 335544128) === s) if (e.stateNode.complete) e.flags |= 8192;
        else if (Sf()) e.flags |= 8192;
        else throw Sn = Yi, jr;
      } else e.flags &= -16777217;
    }
    function Jd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !d1(t)) if (Sf()) e.flags |= 8192;
      else throw Sn = Yi, jr;
    }
    function ll(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ic() : 536870912, e.lanes |= t, ls |= t);
    }
    function Zs(e, t) {
      if (!Re) switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; ) t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var n = null; a !== null; ) a.alternate !== null && (n = a), a = a.sibling;
          n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
      }
    }
    function Je(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, n = 0;
      if (t) for (var s = e.child; s !== null; ) a |= s.lanes | s.childLanes, n |= s.subtreeFlags & 65011712, n |= s.flags & 65011712, s.return = e, s = s.sibling;
      else for (s = e.child; s !== null; ) a |= s.lanes | s.childLanes, n |= s.subtreeFlags, n |= s.flags, s.return = e, s = s.sibling;
      return e.subtreeFlags |= n, e.childLanes = a, t;
    }
    function K2(e, t, a) {
      var n = t.pendingProps;
      switch (vr(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Je(t), null;
        case 1:
          return Je(t), null;
        case 3:
          return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), pa(st), Ze(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Zn(t) ? ba(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, wr())), Je(t), null;
        case 26:
          var s = t.type, l = t.memoizedState;
          return e === null ? (ba(t), l !== null ? (Je(t), Jd(t, l)) : (Je(t), uo(t, s, null, n, a))) : l ? l !== e.memoizedState ? (ba(t), Je(t), Jd(t, l)) : (Je(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && ba(t), Je(t), uo(t, s, e, n, a)), null;
        case 27:
          if (Na(t), a = be.current, s = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(u(166));
              return Je(t), null;
            }
            e = te.current, Zn(t) ? Iu(t) : (e = n1(s, n, a), t.stateNode = e, ba(t));
          }
          return Je(t), null;
        case 5:
          if (Na(t), s = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(u(166));
              return Je(t), null;
            }
            if (l = te.current, Zn(t)) Iu(t);
            else {
              var o = kl(be.current);
              switch (l) {
                case 1:
                  l = o.createElementNS("http://www.w3.org/2000/svg", s);
                  break;
                case 2:
                  l = o.createElementNS("http://www.w3.org/1998/Math/MathML", s);
                  break;
                default:
                  switch (s) {
                    case "svg":
                      l = o.createElementNS("http://www.w3.org/2000/svg", s);
                      break;
                    case "math":
                      l = o.createElementNS("http://www.w3.org/1998/Math/MathML", s);
                      break;
                    case "script":
                      l = o.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                      break;
                    case "select":
                      l = typeof n.is == "string" ? o.createElement("select", {
                        is: n.is
                      }) : o.createElement("select"), n.multiple ? l.multiple = true : n.size && (l.size = n.size);
                      break;
                    default:
                      l = typeof n.is == "string" ? o.createElement(s, {
                        is: n.is
                      }) : o.createElement(s);
                  }
              }
              l[mt] = t, l[St] = n;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6) l.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  o.child.return = o, o = o.child;
                  continue;
                }
                if (o === t) break e;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t) break e;
                  o = o.return;
                }
                o.sibling.return = o.return, o = o.sibling;
              }
              t.stateNode = l;
              e: switch (yt(l, s, n), s) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  n = !!n.autoFocus;
                  break e;
                case "img":
                  n = true;
                  break e;
                default:
                  n = false;
              }
              n && ba(t);
            }
          }
          return Je(t), uo(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (typeof n != "string" && t.stateNode === null) throw Error(u(166));
            if (e = be.current, Zn(t)) {
              if (e = t.stateNode, a = t.memoizedProps, n = null, s = ht, s !== null) switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
              e[mt] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === true || Vf(e.nodeValue, a)), e || Ba(t, true);
            } else e = kl(e).createTextNode(n), e[mt] = t, t.stateNode = e;
          }
          return Je(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = Zn(t), a !== null) {
              if (e === null) {
                if (!n) throw Error(u(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
                e[mt] = t;
              } else yn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Je(t), e = false;
            } else a = wr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = true;
            if (!e) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
            if ((t.flags & 128) !== 0) throw Error(u(558));
          }
          return Je(t), null;
        case 13:
          if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (s = Zn(t), n !== null && n.dehydrated !== null) {
              if (e === null) {
                if (!s) throw Error(u(318));
                if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(u(317));
                s[mt] = t;
              } else yn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Je(t), s = false;
            } else s = wr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = true;
            if (!s) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
          }
          return Dt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, s = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (s = n.alternate.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== s && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), ll(t, t.updateQueue), Je(t), null);
        case 4:
          return Ze(), e === null && zo(t.stateNode.containerInfo), Je(t), null;
        case 10:
          return pa(t.type), Je(t), null;
        case 19:
          if (H(at), n = t.memoizedState, n === null) return Je(t), null;
          if (s = (t.flags & 128) !== 0, l = n.rendering, l === null) if (s) Zs(n, false);
          else {
            if (Pe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (l = Zi(e), l !== null) {
                for (t.flags |= 128, Zs(n, false), e = l.updateQueue, t.updateQueue = e, ll(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; ) Cu(a, e), a = a.sibling;
                return W(at, at.current & 1 | 2), Re && ma(t, n.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            n.tail !== null && P() > dl && (t.flags |= 128, s = true, Zs(n, false), t.lanes = 4194304);
          }
          else {
            if (!s) if (e = Zi(l), e !== null) {
              if (t.flags |= 128, s = true, e = e.updateQueue, t.updateQueue = e, ll(t, e), Zs(n, true), n.tail === null && n.tailMode === "hidden" && !l.alternate && !Re) return Je(t), null;
            } else 2 * P() - n.renderingStartTime > dl && a !== 536870912 && (t.flags |= 128, s = true, Zs(n, false), t.lanes = 4194304);
            n.isBackwards ? (l.sibling = t.child, t.child = l) : (e = n.last, e !== null ? e.sibling = l : t.child = l, n.last = l);
          }
          return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = P(), e.sibling = null, a = at.current, W(at, s ? a & 1 | 2 : a & 1), Re && ma(t, n.treeForkCount), e) : (Je(t), null);
        case 22:
        case 23:
          return Dt(t), zr(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Je(t), a = t.updateQueue, a !== null && ll(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && H(wn), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), pa(st), Je(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(u(156, t.tag));
    }
    function J2(e, t) {
      switch (vr(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return pa(st), Ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Na(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (Dt(t), t.alternate === null) throw Error(u(340));
            yn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (Dt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(u(340));
            yn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return H(at), null;
        case 4:
          return Ze(), null;
        case 10:
          return pa(t.type), null;
        case 22:
        case 23:
          return Dt(t), zr(), e !== null && H(wn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return pa(st), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Fd(e, t) {
      switch (vr(t), t.tag) {
        case 3:
          pa(st), Ze();
          break;
        case 26:
        case 27:
        case 5:
          Na(t);
          break;
        case 4:
          Ze();
          break;
        case 31:
          t.memoizedState !== null && Dt(t);
          break;
        case 13:
          Dt(t);
          break;
        case 19:
          H(at);
          break;
        case 10:
          pa(t.type);
          break;
        case 22:
        case 23:
          Dt(t), zr(), e !== null && H(wn);
          break;
        case 24:
          pa(st);
      }
    }
    function Ks(e, t) {
      try {
        var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var s = n.next;
          a = s;
          do {
            if ((a.tag & e) === e) {
              n = void 0;
              var l = a.create, o = a.inst;
              n = l(), o.destroy = n;
            }
            a = a.next;
          } while (a !== s);
        }
      } catch (d) {
        qe(t, t.return, d);
      }
    }
    function Va(e, t, a) {
      try {
        var n = t.updateQueue, s = n !== null ? n.lastEffect : null;
        if (s !== null) {
          var l = s.next;
          n = l;
          do {
            if ((n.tag & e) === e) {
              var o = n.inst, d = o.destroy;
              if (d !== void 0) {
                o.destroy = void 0, s = t;
                var y = a, I = d;
                try {
                  I();
                } catch (O) {
                  qe(s, y, O);
                }
              }
            }
            n = n.next;
          } while (n !== l);
        }
      } catch (O) {
        qe(t, t.return, O);
      }
    }
    function $d(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        try {
          Hu(t, a);
        } catch (n) {
          qe(e, e.return, n);
        }
      }
    }
    function Wd(e, t, a) {
      a.props = Mn(e.type, e.memoizedProps), a.state = e.memoizedState;
      try {
        a.componentWillUnmount();
      } catch (n) {
        qe(e, t, n);
      }
    }
    function Js(e, t) {
      try {
        var a = e.ref;
        if (a !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var n = e.stateNode;
              break;
            case 30:
              n = e.stateNode;
              break;
            default:
              n = e.stateNode;
          }
          typeof a == "function" ? e.refCleanup = a(n) : a.current = n;
        }
      } catch (s) {
        qe(e, t, s);
      }
    }
    function ia(e, t) {
      var a = e.ref, n = e.refCleanup;
      if (a !== null) if (typeof n == "function") try {
        n();
      } catch (s) {
        qe(e, t, s);
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
      }
      else if (typeof a == "function") try {
        a(null);
      } catch (s) {
        qe(e, t, s);
      }
      else a.current = null;
    }
    function Pd(e) {
      var t = e.type, a = e.memoizedProps, n = e.stateNode;
      try {
        e: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            a.autoFocus && n.focus();
            break e;
          case "img":
            a.src ? n.src = a.src : a.srcSet && (n.srcset = a.srcSet);
        }
      } catch (s) {
        qe(e, e.return, s);
      }
    }
    function fo(e, t, a) {
      try {
        var n = e.stateNode;
        yh(n, e.type, a, t), n[St] = t;
      } catch (s) {
        qe(e, e.return, s);
      }
    }
    function ef(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Pa(e.type) || e.tag === 4;
    }
    function mo(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || ef(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Pa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function ho(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ua));
      else if (n !== 4 && (n === 27 && Pa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null)) for (ho(e, t, a), e = e.sibling; e !== null; ) ho(e, t, a), e = e.sibling;
    }
    function rl(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (n !== 4 && (n === 27 && Pa(e.type) && (a = e.stateNode), e = e.child, e !== null)) for (rl(e, t, a), e = e.sibling; e !== null; ) rl(e, t, a), e = e.sibling;
    }
    function tf(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
        yt(t, n, a), t[mt] = e, t[St] = a;
      } catch (l) {
        qe(e, e.return, l);
      }
    }
    var wa = false, rt = false, po = false, af = typeof WeakSet == "function" ? WeakSet : Set, dt = null;
    function F2(e, t) {
      if (e = e.containerInfo, Lo = Il, e = hu(e), rr(e)) {
        if ("selectionStart" in e) var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var s = n.anchorOffset, l = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, l.nodeType;
            } catch {
              a = null;
              break e;
            }
            var o = 0, d = -1, y = -1, I = 0, O = 0, Q = e, N = null;
            t: for (; ; ) {
              for (var _; Q !== a || s !== 0 && Q.nodeType !== 3 || (d = o + s), Q !== l || n !== 0 && Q.nodeType !== 3 || (y = o + n), Q.nodeType === 3 && (o += Q.nodeValue.length), (_ = Q.firstChild) !== null; ) N = Q, Q = _;
              for (; ; ) {
                if (Q === e) break t;
                if (N === a && ++I === s && (d = o), N === l && ++O === n && (y = o), (_ = Q.nextSibling) !== null) break;
                Q = N, N = Q.parentNode;
              }
              Q = _;
            }
            a = d === -1 || y === -1 ? null : {
              start: d,
              end: y
            };
          } else a = null;
        }
        a = a || {
          start: 0,
          end: 0
        };
      } else a = null;
      for (Uo = {
        focusedElem: e,
        selectionRange: a
      }, Il = false, dt = t; dt !== null; ) if (t = dt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, dt = e;
      else for (; dt !== null; ) {
        switch (t = dt, l = t.alternate, e = t.flags, t.tag) {
          case 0:
            if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (a = 0; a < e.length; a++) s = e[a], s.ref.impl = s.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((e & 1024) !== 0 && l !== null) {
              e = void 0, a = t, s = l.memoizedProps, l = l.memoizedState, n = a.stateNode;
              try {
                var ie = Mn(a.type, s);
                e = n.getSnapshotBeforeUpdate(ie, l), n.__reactInternalSnapshotBeforeUpdate = e;
              } catch (me) {
                qe(a, a.return, me);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) qo(e);
              else if (a === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  qo(e);
                  break;
                default:
                  e.textContent = "";
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
            if ((e & 1024) !== 0) throw Error(u(163));
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, dt = e;
          break;
        }
        dt = t.return;
      }
    }
    function nf(e, t, a) {
      var n = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Sa(e, a), n & 4 && Ks(5, a);
          break;
        case 1:
          if (Sa(e, a), n & 4) if (e = a.stateNode, t === null) try {
            e.componentDidMount();
          } catch (o) {
            qe(a, a.return, o);
          }
          else {
            var s = Mn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              qe(a, a.return, o);
            }
          }
          n & 64 && $d(a), n & 512 && Js(a, a.return);
          break;
        case 3:
          if (Sa(e, a), n & 64 && (e = a.updateQueue, e !== null)) {
            if (t = null, a.child !== null) switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
            try {
              Hu(e, t);
            } catch (o) {
              qe(a, a.return, o);
            }
          }
          break;
        case 27:
          t === null && n & 4 && tf(a);
        case 26:
        case 5:
          Sa(e, a), t === null && n & 4 && Pd(a), n & 512 && Js(a, a.return);
          break;
        case 12:
          Sa(e, a);
          break;
        case 31:
          Sa(e, a), n & 4 && rf(e, a);
          break;
        case 13:
          Sa(e, a), n & 4 && of(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = ih.bind(null, a), Mh(e, a))));
          break;
        case 22:
          if (n = a.memoizedState !== null || wa, !n) {
            t = t !== null && t.memoizedState !== null || rt, s = wa;
            var l = rt;
            wa = n, (rt = t) && !l ? Ca(e, a, (a.subtreeFlags & 8772) !== 0) : Sa(e, a), wa = s, rt = l;
          }
          break;
        case 30:
          break;
        default:
          Sa(e, a);
      }
    }
    function sf(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, sf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ql(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var $e = null, xt = false;
    function ka(e, t, a) {
      for (a = a.child; a !== null; ) lf(e, t, a), a = a.sibling;
    }
    function lf(e, t, a) {
      if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
        Nt.onCommitFiberUnmount(bs, a);
      } catch {
      }
      switch (a.tag) {
        case 26:
          rt || ia(a, t), ka(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          rt || ia(a, t);
          var n = $e, s = xt;
          Pa(a.type) && ($e = a.stateNode, xt = false), ka(e, t, a), si(a.stateNode), $e = n, xt = s;
          break;
        case 5:
          rt || ia(a, t);
        case 6:
          if (n = $e, s = xt, $e = null, ka(e, t, a), $e = n, xt = s, $e !== null) if (xt) try {
            ($e.nodeType === 9 ? $e.body : $e.nodeName === "HTML" ? $e.ownerDocument.body : $e).removeChild(a.stateNode);
          } catch (l) {
            qe(a, t, l);
          }
          else try {
            $e.removeChild(a.stateNode);
          } catch (l) {
            qe(a, t, l);
          }
          break;
        case 18:
          $e !== null && (xt ? (e = $e, Wf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), hs(e)) : Wf($e, a.stateNode));
          break;
        case 4:
          n = $e, s = xt, $e = a.stateNode.containerInfo, xt = true, ka(e, t, a), $e = n, xt = s;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Va(2, a, t), rt || Va(4, a, t), ka(e, t, a);
          break;
        case 1:
          rt || (ia(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && Wd(a, t, n)), ka(e, t, a);
          break;
        case 21:
          ka(e, t, a);
          break;
        case 22:
          rt = (n = rt) || a.memoizedState !== null, ka(e, t, a), rt = n;
          break;
        default:
          ka(e, t, a);
      }
    }
    function rf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          hs(e);
        } catch (a) {
          qe(t, t.return, a);
        }
      }
    }
    function of(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        hs(e);
      } catch (a) {
        qe(t, t.return, a);
      }
    }
    function $2(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new af()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new af()), t;
        default:
          throw Error(u(435, e.tag));
      }
    }
    function ol(e, t) {
      var a = $2(e);
      t.forEach(function(n) {
        if (!a.has(n)) {
          a.add(n);
          var s = lh.bind(null, e, n);
          n.then(s, s);
        }
      });
    }
    function Mt(e, t) {
      var a = t.deletions;
      if (a !== null) for (var n = 0; n < a.length; n++) {
        var s = a[n], l = e, o = t, d = o;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Pa(d.type)) {
                $e = d.stateNode, xt = false;
                break e;
              }
              break;
            case 5:
              $e = d.stateNode, xt = false;
              break e;
            case 3:
            case 4:
              $e = d.stateNode.containerInfo, xt = true;
              break e;
          }
          d = d.return;
        }
        if ($e === null) throw Error(u(160));
        lf(l, o, s), $e = null, xt = false, l = s.alternate, l !== null && (l.return = null), s.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) cf(t, e), t = t.sibling;
    }
    var ea = null;
    function cf(e, t) {
      var a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Mt(t, e), At(e), n & 4 && (Va(3, e, e.return), Ks(3, e), Va(5, e, e.return));
          break;
        case 1:
          Mt(t, e), At(e), n & 512 && (rt || a === null || ia(a, a.return)), n & 64 && wa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
          break;
        case 26:
          var s = ea;
          if (Mt(t, e), At(e), n & 512 && (rt || a === null || ia(a, a.return)), n & 4) {
            var l = a !== null ? a.memoizedState : null;
            if (n = e.memoizedState, a === null) if (n === null) if (e.stateNode === null) {
              e: {
                n = e.type, a = e.memoizedProps, s = s.ownerDocument || s;
                t: switch (n) {
                  case "title":
                    l = s.getElementsByTagName("title")[0], (!l || l[Ss] || l[mt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = s.createElement(n), s.head.insertBefore(l, s.querySelector("head > title"))), yt(l, n, a), l[mt] = e, ut(l), n = l;
                    break e;
                  case "link":
                    var o = c1("link", "href", s).get(n + (a.href || ""));
                    if (o) {
                      for (var d = 0; d < o.length; d++) if (l = o[d], l.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && l.getAttribute("rel") === (a.rel == null ? null : a.rel) && l.getAttribute("title") === (a.title == null ? null : a.title) && l.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    l = s.createElement(n), yt(l, n, a), s.head.appendChild(l);
                    break;
                  case "meta":
                    if (o = c1("meta", "content", s).get(n + (a.content || ""))) {
                      for (d = 0; d < o.length; d++) if (l = o[d], l.getAttribute("content") === (a.content == null ? null : "" + a.content) && l.getAttribute("name") === (a.name == null ? null : a.name) && l.getAttribute("property") === (a.property == null ? null : a.property) && l.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && l.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    l = s.createElement(n), yt(l, n, a), s.head.appendChild(l);
                    break;
                  default:
                    throw Error(u(468, n));
                }
                l[mt] = e, ut(l), n = l;
              }
              e.stateNode = n;
            } else u1(s, e.type, e.stateNode);
            else e.stateNode = o1(s, n, e.memoizedProps);
            else l !== n ? (l === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : l.count--, n === null ? u1(s, e.type, e.stateNode) : o1(s, n, e.memoizedProps)) : n === null && e.stateNode !== null && fo(e, e.memoizedProps, a.memoizedProps);
          }
          break;
        case 27:
          Mt(t, e), At(e), n & 512 && (rt || a === null || ia(a, a.return)), a !== null && n & 4 && fo(e, e.memoizedProps, a.memoizedProps);
          break;
        case 5:
          if (Mt(t, e), At(e), n & 512 && (rt || a === null || ia(a, a.return)), e.flags & 32) {
            s = e.stateNode;
            try {
              Un(s, "");
            } catch (ie) {
              qe(e, e.return, ie);
            }
          }
          n & 4 && e.stateNode != null && (s = e.memoizedProps, fo(e, s, a !== null ? a.memoizedProps : s)), n & 1024 && (po = true);
          break;
        case 6:
          if (Mt(t, e), At(e), n & 4) {
            if (e.stateNode === null) throw Error(u(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
              a.nodeValue = n;
            } catch (ie) {
              qe(e, e.return, ie);
            }
          }
          break;
        case 3:
          if (xl = null, s = ea, ea = Sl(t.containerInfo), Mt(t, e), ea = s, At(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
            hs(t.containerInfo);
          } catch (ie) {
            qe(e, e.return, ie);
          }
          po && (po = false, uf(e));
          break;
        case 4:
          n = ea, ea = Sl(e.stateNode.containerInfo), Mt(t, e), At(e), ea = n;
          break;
        case 12:
          Mt(t, e), At(e);
          break;
        case 31:
          Mt(t, e), At(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ol(e, n)));
          break;
        case 13:
          Mt(t, e), At(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ul = P()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ol(e, n)));
          break;
        case 22:
          s = e.memoizedState !== null;
          var y = a !== null && a.memoizedState !== null, I = wa, O = rt;
          if (wa = I || s, rt = O || y, Mt(t, e), rt = O, wa = I, At(e), n & 8192) e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (a === null || y || wa || rt || An(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                y = a = t;
                try {
                  if (l = y.stateNode, s) o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    d = y.stateNode;
                    var Q = y.memoizedProps.style, N = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    d.style.display = N == null || typeof N == "boolean" ? "" : ("" + N).trim();
                  }
                } catch (ie) {
                  qe(y, y.return, ie);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = s ? "" : y.memoizedProps;
                } catch (ie) {
                  qe(y, y.return, ie);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                y = t;
                try {
                  var _ = y.stateNode;
                  s ? Pf(_, true) : Pf(y.stateNode, false);
                } catch (ie) {
                  qe(y, y.return, ie);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
          n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, ol(e, a))));
          break;
        case 19:
          Mt(t, e), At(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ol(e, n)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Mt(t, e), At(e);
      }
    }
    function At(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var a, n = e.return; n !== null; ) {
            if (ef(n)) {
              a = n;
              break;
            }
            n = n.return;
          }
          if (a == null) throw Error(u(160));
          switch (a.tag) {
            case 27:
              var s = a.stateNode, l = mo(e);
              rl(e, l, s);
              break;
            case 5:
              var o = a.stateNode;
              a.flags & 32 && (Un(o, ""), a.flags &= -33);
              var d = mo(e);
              rl(e, d, o);
              break;
            case 3:
            case 4:
              var y = a.stateNode.containerInfo, I = mo(e);
              ho(e, I, y);
              break;
            default:
              throw Error(u(161));
          }
        } catch (O) {
          qe(e, e.return, O);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function uf(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        uf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Sa(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) nf(e, t.alternate, t), t = t.sibling;
    }
    function An(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Va(4, t, t.return), An(t);
            break;
          case 1:
            ia(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount == "function" && Wd(t, t.return, a), An(t);
            break;
          case 27:
            si(t.stateNode);
          case 26:
          case 5:
            ia(t, t.return), An(t);
            break;
          case 22:
            t.memoizedState === null && An(t);
            break;
          case 30:
            An(t);
            break;
          default:
            An(t);
        }
        e = e.sibling;
      }
    }
    function Ca(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var n = t.alternate, s = e, l = t, o = l.flags;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            Ca(s, l, a), Ks(4, l);
            break;
          case 1:
            if (Ca(s, l, a), n = l, s = n.stateNode, typeof s.componentDidMount == "function") try {
              s.componentDidMount();
            } catch (I) {
              qe(n, n.return, I);
            }
            if (n = l, s = n.updateQueue, s !== null) {
              var d = n.stateNode;
              try {
                var y = s.shared.hiddenCallbacks;
                if (y !== null) for (s.shared.hiddenCallbacks = null, s = 0; s < y.length; s++) qu(y[s], d);
              } catch (I) {
                qe(n, n.return, I);
              }
            }
            a && o & 64 && $d(l), Js(l, l.return);
            break;
          case 27:
            tf(l);
          case 26:
          case 5:
            Ca(s, l, a), a && n === null && o & 4 && Pd(l), Js(l, l.return);
            break;
          case 12:
            Ca(s, l, a);
            break;
          case 31:
            Ca(s, l, a), a && o & 4 && rf(s, l);
            break;
          case 13:
            Ca(s, l, a), a && o & 4 && of(s, l);
            break;
          case 22:
            l.memoizedState === null && Ca(s, l, a), Js(l, l.return);
            break;
          case 30:
            break;
          default:
            Ca(s, l, a);
        }
        t = t.sibling;
      }
    }
    function go(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Ds(a));
    }
    function yo(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ds(e));
    }
    function ta(e, t, a, n) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) df(e, t, a, n), t = t.sibling;
    }
    function df(e, t, a, n) {
      var s = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ta(e, t, a, n), s & 2048 && Ks(9, t);
          break;
        case 1:
          ta(e, t, a, n);
          break;
        case 3:
          ta(e, t, a, n), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ds(e)));
          break;
        case 12:
          if (s & 2048) {
            ta(e, t, a, n), e = t.stateNode;
            try {
              var l = t.memoizedProps, o = l.id, d = l.onPostCommit;
              typeof d == "function" && d(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            } catch (y) {
              qe(t, t.return, y);
            }
          } else ta(e, t, a, n);
          break;
        case 31:
          ta(e, t, a, n);
          break;
        case 13:
          ta(e, t, a, n);
          break;
        case 23:
          break;
        case 22:
          l = t.stateNode, o = t.alternate, t.memoizedState !== null ? l._visibility & 2 ? ta(e, t, a, n) : Fs(e, t) : l._visibility & 2 ? ta(e, t, a, n) : (l._visibility |= 2, ns(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || false)), s & 2048 && go(o, t);
          break;
        case 24:
          ta(e, t, a, n), s & 2048 && yo(t.alternate, t);
          break;
        default:
          ta(e, t, a, n);
      }
    }
    function ns(e, t, a, n, s) {
      for (s = s && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var l = e, o = t, d = a, y = n, I = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            ns(l, o, d, y, s), Ks(8, o);
            break;
          case 23:
            break;
          case 22:
            var O = o.stateNode;
            o.memoizedState !== null ? O._visibility & 2 ? ns(l, o, d, y, s) : Fs(l, o) : (O._visibility |= 2, ns(l, o, d, y, s)), s && I & 2048 && go(o.alternate, o);
            break;
          case 24:
            ns(l, o, d, y, s), s && I & 2048 && yo(o.alternate, o);
            break;
          default:
            ns(l, o, d, y, s);
        }
        t = t.sibling;
      }
    }
    function Fs(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var a = e, n = t, s = n.flags;
        switch (n.tag) {
          case 22:
            Fs(a, n), s & 2048 && go(n.alternate, n);
            break;
          case 24:
            Fs(a, n), s & 2048 && yo(n.alternate, n);
            break;
          default:
            Fs(a, n);
        }
        t = t.sibling;
      }
    }
    var $s = 8192;
    function ss(e, t, a) {
      if (e.subtreeFlags & $s) for (e = e.child; e !== null; ) ff(e, t, a), e = e.sibling;
    }
    function ff(e, t, a) {
      switch (e.tag) {
        case 26:
          ss(e, t, a), e.flags & $s && e.memoizedState !== null && Uh(a, ea, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          ss(e, t, a);
          break;
        case 3:
        case 4:
          var n = ea;
          ea = Sl(e.stateNode.containerInfo), ss(e, t, a), ea = n;
          break;
        case 22:
          e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = $s, $s = 16777216, ss(e, t, a), $s = n) : ss(e, t, a));
          break;
        default:
          ss(e, t, a);
      }
    }
    function mf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function Ws(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, pf(n, e);
        }
        mf(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) hf(e), e = e.sibling;
    }
    function hf(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ws(e), e.flags & 2048 && Va(9, e, e.return);
          break;
        case 3:
          Ws(e);
          break;
        case 12:
          Ws(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, cl(e)) : Ws(e);
          break;
        default:
          Ws(e);
      }
    }
    function cl(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, pf(n, e);
        }
        mf(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            Va(8, t, t.return), cl(t);
            break;
          case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, cl(t));
            break;
          default:
            cl(t);
        }
        e = e.sibling;
      }
    }
    function pf(e, t) {
      for (; dt !== null; ) {
        var a = dt;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            Va(8, a, t);
            break;
          case 23:
          case 22:
            if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
              var n = a.memoizedState.cachePool.pool;
              n != null && n.refCount++;
            }
            break;
          case 24:
            Ds(a.memoizedState.cache);
        }
        if (n = a.child, n !== null) n.return = a, dt = n;
        else e: for (a = e; dt !== null; ) {
          n = dt;
          var s = n.sibling, l = n.return;
          if (sf(n), n === a) {
            dt = null;
            break e;
          }
          if (s !== null) {
            s.return = l, dt = s;
            break e;
          }
          dt = l;
        }
      }
    }
    var W2 = {
      getCacheForType: function(e) {
        var t = pt(st), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return pt(st).controller.signal;
      }
    }, P2 = typeof WeakMap == "function" ? WeakMap : Map, Oe = 0, Xe = null, Ae = null, Ie = 0, Be = 0, Lt = null, Za = false, is = false, vo = false, xa = 0, Pe = 0, Ka = 0, jn = 0, bo = 0, Ut = 0, ls = 0, Ps = null, jt = null, wo = false, ul = 0, gf = 0, dl = 1 / 0, fl = null, Ja = null, ct = 0, Fa = null, rs = null, Ma = 0, ko = 0, So = null, yf = null, ei = 0, Co = null;
    function Ot() {
      return (Oe & 2) !== 0 && Ie !== 0 ? Ie & -Ie : U.T !== null ? Eo() : Tc();
    }
    function vf() {
      if (Ut === 0) if ((Ie & 536870912) === 0 || Re) {
        var e = wi;
        wi <<= 1, (wi & 3932160) === 0 && (wi = 262144), Ut = e;
      } else Ut = 536870912;
      return e = _t.current, e !== null && (e.flags |= 32), Ut;
    }
    function It(e, t, a) {
      (e === Xe && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) && (os(e, 0), $a(e, Ie, Ut, false)), ks(e, a), ((Oe & 2) === 0 || e !== Xe) && (e === Xe && ((Oe & 2) === 0 && (jn |= a), Pe === 4 && $a(e, Ie, Ut, false)), la(e));
    }
    function bf(e, t, a) {
      if ((Oe & 6) !== 0) throw Error(u(327));
      var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ws(e, t), s = n ? ah(e, t) : Mo(e, t, true), l = n;
      do {
        if (s === 0) {
          is && !n && $a(e, t, 0, false);
          break;
        } else {
          if (a = e.current.alternate, l && !eh(a)) {
            s = Mo(e, t, false), l = false;
            continue;
          }
          if (s === 2) {
            if (l = t, e.errorRecoveryDisabledLanes & l) var o = 0;
            else o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
            if (o !== 0) {
              t = o;
              e: {
                var d = e;
                s = Ps;
                var y = d.current.memoizedState.isDehydrated;
                if (y && (os(d, o).flags |= 256), o = Mo(d, o, false), o !== 2) {
                  if (vo && !y) {
                    d.errorRecoveryDisabledLanes |= l, jn |= l, s = 4;
                    break e;
                  }
                  l = jt, jt = s, l !== null && (jt === null ? jt = l : jt.push.apply(jt, l));
                }
                s = o;
              }
              if (l = false, s !== 2) continue;
            }
          }
          if (s === 1) {
            os(e, 0), $a(e, t, 0, true);
            break;
          }
          e: {
            switch (n = e, l = s, l) {
              case 0:
              case 1:
                throw Error(u(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                $a(n, t, Ut, !Za);
                break e;
              case 2:
                jt = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(u(329));
            }
            if ((t & 62914560) === t && (s = ul + 300 - P(), 10 < s)) {
              if ($a(n, t, Ut, !Za), Si(n, 0, true) !== 0) break e;
              Ma = t, n.timeoutHandle = Ff(wf.bind(null, n, a, jt, fl, wo, t, Ut, jn, ls, Za, l, "Throttled", -0, 0), s);
              break e;
            }
            wf(n, a, jt, fl, wo, t, Ut, jn, ls, Za, l, null, -0, 0);
          }
        }
        break;
      } while (true);
      la(e);
    }
    function wf(e, t, a, n, s, l, o, d, y, I, O, Q, N, _) {
      if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
        Q = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: ua
        }, ff(t, l, Q);
        var ie = (l & 62914560) === l ? ul - P() : (l & 4194048) === l ? gf - P() : 0;
        if (ie = Oh(Q, ie), ie !== null) {
          Ma = l, e.cancelPendingCommit = ie(If.bind(null, e, t, l, a, n, s, o, d, y, O, Q, null, N, _)), $a(e, l, o, !I);
          return;
        }
      }
      If(e, t, l, a, n, s, o, d, y);
    }
    function eh(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) for (var n = 0; n < a.length; n++) {
          var s = a[n], l = s.getSnapshot;
          s = s.value;
          try {
            if (!Tt(l(), s)) return false;
          } catch {
            return false;
          }
        }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return true;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return true;
    }
    function $a(e, t, a, n) {
      t &= ~bo, t &= ~jn, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
      for (var s = t; 0 < s; ) {
        var l = 31 - Rt(s), o = 1 << l;
        n[l] = -1, s &= ~o;
      }
      a !== 0 && Ec(e, a, t);
    }
    function ml() {
      return (Oe & 6) === 0 ? (ti(0), false) : true;
    }
    function xo() {
      if (Ae !== null) {
        if (Be === 0) var e = Ae.return;
        else e = Ae, ha = vn = null, Br(e), Wn = null, Us = 0, e = Ae;
        for (; e !== null; ) Fd(e.alternate, e), e = e.return;
        Ae = null;
      }
    }
    function os(e, t) {
      var a = e.timeoutHandle;
      a !== -1 && (e.timeoutHandle = -1, wh(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ma = 0, xo(), Xe = e, Ae = a = fa(e.current, null), Ie = t, Be = 0, Lt = null, Za = false, is = ws(e, t), vo = false, ls = Ut = bo = jn = Ka = Pe = 0, jt = Ps = null, wo = false, (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Rt(n), l = 1 << s;
        t |= e[s], n &= ~l;
      }
      return xa = t, _i(), a;
    }
    function kf(e, t) {
      Se = null, U.H = Xs, t === $n || t === Gi ? (t = Lu(), Be = 3) : t === jr ? (t = Lu(), Be = 4) : Be = t === to ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Lt = t, Ae === null && (Pe = 1, al(e, Yt(t, e.current)));
    }
    function Sf() {
      var e = _t.current;
      return e === null ? true : (Ie & 4194048) === Ie ? Zt === null : (Ie & 62914560) === Ie || (Ie & 536870912) !== 0 ? e === Zt : false;
    }
    function Cf() {
      var e = U.H;
      return U.H = Xs, e === null ? Xs : e;
    }
    function xf() {
      var e = U.A;
      return U.A = W2, e;
    }
    function hl() {
      Pe = 4, Za || (Ie & 4194048) !== Ie && _t.current !== null || (is = true), (Ka & 134217727) === 0 && (jn & 134217727) === 0 || Xe === null || $a(Xe, Ie, Ut, false);
    }
    function Mo(e, t, a) {
      var n = Oe;
      Oe |= 2;
      var s = Cf(), l = xf();
      (Xe !== e || Ie !== t) && (fl = null, os(e, t)), t = false;
      var o = Pe;
      e: do
        try {
          if (Be !== 0 && Ae !== null) {
            var d = Ae, y = Lt;
            switch (Be) {
              case 8:
                xo(), o = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                _t.current === null && (t = true);
                var I = Be;
                if (Be = 0, Lt = null, cs(e, d, y, I), a && is) {
                  o = 0;
                  break e;
                }
                break;
              default:
                I = Be, Be = 0, Lt = null, cs(e, d, y, I);
            }
          }
          th(), o = Pe;
          break;
        } catch (O) {
          kf(e, O);
        }
      while (true);
      return t && e.shellSuspendCounter++, ha = vn = null, Oe = n, U.H = s, U.A = l, Ae === null && (Xe = null, Ie = 0, _i()), o;
    }
    function th() {
      for (; Ae !== null; ) Mf(Ae);
    }
    function ah(e, t) {
      var a = Oe;
      Oe |= 2;
      var n = Cf(), s = xf();
      Xe !== e || Ie !== t ? (fl = null, dl = P() + 500, os(e, t)) : is = ws(e, t);
      e: do
        try {
          if (Be !== 0 && Ae !== null) {
            t = Ae;
            var l = Lt;
            t: switch (Be) {
              case 1:
                Be = 0, Lt = null, cs(e, t, l, 1);
                break;
              case 2:
              case 9:
                if (_u(l)) {
                  Be = 0, Lt = null, Af(t);
                  break;
                }
                t = function() {
                  Be !== 2 && Be !== 9 || Xe !== e || (Be = 7), la(e);
                }, l.then(t, t);
                break e;
              case 3:
                Be = 7;
                break e;
              case 4:
                Be = 5;
                break e;
              case 7:
                _u(l) ? (Be = 0, Lt = null, Af(t)) : (Be = 0, Lt = null, cs(e, t, l, 7));
                break;
              case 5:
                var o = null;
                switch (Ae.tag) {
                  case 26:
                    o = Ae.memoizedState;
                  case 5:
                  case 27:
                    var d = Ae;
                    if (o ? d1(o) : d.stateNode.complete) {
                      Be = 0, Lt = null;
                      var y = d.sibling;
                      if (y !== null) Ae = y;
                      else {
                        var I = d.return;
                        I !== null ? (Ae = I, pl(I)) : Ae = null;
                      }
                      break t;
                    }
                }
                Be = 0, Lt = null, cs(e, t, l, 5);
                break;
              case 6:
                Be = 0, Lt = null, cs(e, t, l, 6);
                break;
              case 8:
                xo(), Pe = 6;
                break e;
              default:
                throw Error(u(462));
            }
          }
          nh();
          break;
        } catch (O) {
          kf(e, O);
        }
      while (true);
      return ha = vn = null, U.H = n, U.A = s, Oe = a, Ae !== null ? 0 : (Xe = null, Ie = 0, _i(), Pe);
    }
    function nh() {
      for (; Ae !== null && !R(); ) Mf(Ae);
    }
    function Mf(e) {
      var t = Kd(e.alternate, e, xa);
      e.memoizedProps = e.pendingProps, t === null ? pl(e) : Ae = t;
    }
    function Af(e) {
      var t = e, a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Gd(a, t, t.pendingProps, t.type, void 0, Ie);
          break;
        case 11:
          t = Gd(a, t, t.pendingProps, t.type.render, t.ref, Ie);
          break;
        case 5:
          Br(t);
        default:
          Fd(a, t), t = Ae = Cu(t, xa), t = Kd(a, t, xa);
      }
      e.memoizedProps = e.pendingProps, t === null ? pl(e) : Ae = t;
    }
    function cs(e, t, a, n) {
      ha = vn = null, Br(t), Wn = null, Us = 0;
      var s = t.return;
      try {
        if (X2(e, s, t, a, Ie)) {
          Pe = 1, al(e, Yt(a, e.current)), Ae = null;
          return;
        }
      } catch (l) {
        if (s !== null) throw Ae = s, l;
        Pe = 1, al(e, Yt(a, e.current)), Ae = null;
        return;
      }
      t.flags & 32768 ? (Re || n === 1 ? e = true : is || (Ie & 536870912) !== 0 ? e = false : (Za = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = _t.current, n !== null && n.tag === 13 && (n.flags |= 16384))), jf(t, e)) : pl(t);
    }
    function pl(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          jf(t, Za);
          return;
        }
        e = t.return;
        var a = K2(t.alternate, t, xa);
        if (a !== null) {
          Ae = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ae = t;
          return;
        }
        Ae = t = e;
      } while (t !== null);
      Pe === 0 && (Pe = 5);
    }
    function jf(e, t) {
      do {
        var a = J2(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Ae = a;
          return;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ae = e;
          return;
        }
        Ae = e = a;
      } while (e !== null);
      Pe = 6, Ae = null;
    }
    function If(e, t, a, n, s, l, o, d, y) {
      e.cancelPendingCommit = null;
      do
        gl();
      while (ct !== 0);
      if ((Oe & 6) !== 0) throw Error(u(327));
      if (t !== null) {
        if (t === e.current) throw Error(u(177));
        if (l = t.lanes | t.childLanes, l |= fr, Lm(e, a, l, o, d, y), e === Xe && (Ae = Xe = null, Ie = 0), rs = t, Fa = e, Ma = a, ko = l, So = s, yf = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, rh(Ue, function() {
          return zf(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
          n = U.T, U.T = null, s = w.p, w.p = 2, o = Oe, Oe |= 4;
          try {
            F2(e, t, a);
          } finally {
            Oe = o, w.p = s, U.T = n;
          }
        }
        ct = 1, Ef(), Nf(), Rf();
      }
    }
    function Ef() {
      if (ct === 1) {
        ct = 0;
        var e = Fa, t = rs, a = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || a) {
          a = U.T, U.T = null;
          var n = w.p;
          w.p = 2;
          var s = Oe;
          Oe |= 4;
          try {
            cf(t, e);
            var l = Uo, o = hu(e.containerInfo), d = l.focusedElem, y = l.selectionRange;
            if (o !== d && d && d.ownerDocument && mu(d.ownerDocument.documentElement, d)) {
              if (y !== null && rr(d)) {
                var I = y.start, O = y.end;
                if (O === void 0 && (O = I), "selectionStart" in d) d.selectionStart = I, d.selectionEnd = Math.min(O, d.value.length);
                else {
                  var Q = d.ownerDocument || document, N = Q && Q.defaultView || window;
                  if (N.getSelection) {
                    var _ = N.getSelection(), ie = d.textContent.length, me = Math.min(y.start, ie), Ye = y.end === void 0 ? me : Math.min(y.end, ie);
                    !_.extend && me > Ye && (o = Ye, Ye = me, me = o);
                    var C = fu(d, me), b = fu(d, Ye);
                    if (C && b && (_.rangeCount !== 1 || _.anchorNode !== C.node || _.anchorOffset !== C.offset || _.focusNode !== b.node || _.focusOffset !== b.offset)) {
                      var j = Q.createRange();
                      j.setStart(C.node, C.offset), _.removeAllRanges(), me > Ye ? (_.addRange(j), _.extend(b.node, b.offset)) : (j.setEnd(b.node, b.offset), _.addRange(j));
                    }
                  }
                }
              }
              for (Q = [], _ = d; _ = _.parentNode; ) _.nodeType === 1 && Q.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
              for (typeof d.focus == "function" && d.focus(), d = 0; d < Q.length; d++) {
                var G = Q[d];
                G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
              }
            }
            Il = !!Lo, Uo = Lo = null;
          } finally {
            Oe = s, w.p = n, U.T = a;
          }
        }
        e.current = t, ct = 2;
      }
    }
    function Nf() {
      if (ct === 2) {
        ct = 0;
        var e = Fa, t = rs, a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = U.T, U.T = null;
          var n = w.p;
          w.p = 2;
          var s = Oe;
          Oe |= 4;
          try {
            nf(e, t.alternate, t);
          } finally {
            Oe = s, w.p = n, U.T = a;
          }
        }
        ct = 3;
      }
    }
    function Rf() {
      if (ct === 4 || ct === 3) {
        ct = 0, K();
        var e = Fa, t = rs, a = Ma, n = yf;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ct = 5 : (ct = 0, rs = Fa = null, Tf(e, e.pendingLanes));
        var s = e.pendingLanes;
        if (s === 0 && (Ja = null), Gl(a), t = t.stateNode, Nt && typeof Nt.onCommitFiberRoot == "function") try {
          Nt.onCommitFiberRoot(bs, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (n !== null) {
          t = U.T, s = w.p, w.p = 2, U.T = null;
          try {
            for (var l = e.onRecoverableError, o = 0; o < n.length; o++) {
              var d = n[o];
              l(d.value, {
                componentStack: d.stack
              });
            }
          } finally {
            U.T = t, w.p = s;
          }
        }
        (Ma & 3) !== 0 && gl(), la(e), s = e.pendingLanes, (a & 261930) !== 0 && (s & 42) !== 0 ? e === Co ? ei++ : (ei = 0, Co = e) : ei = 0, ti(0);
      }
    }
    function Tf(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ds(t)));
    }
    function gl() {
      return Ef(), Nf(), Rf(), zf();
    }
    function zf() {
      if (ct !== 5) return false;
      var e = Fa, t = ko;
      ko = 0;
      var a = Gl(Ma), n = U.T, s = w.p;
      try {
        w.p = 32 > a ? 32 : a, U.T = null, a = So, So = null;
        var l = Fa, o = Ma;
        if (ct = 0, rs = Fa = null, Ma = 0, (Oe & 6) !== 0) throw Error(u(331));
        var d = Oe;
        if (Oe |= 4, hf(l.current), df(l, l.current, o, a), Oe = d, ti(0, false), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
          Nt.onPostCommitFiberRoot(bs, l);
        } catch {
        }
        return true;
      } finally {
        w.p = s, U.T = n, Tf(e, t);
      }
    }
    function _f(e, t, a) {
      t = Yt(a, t), t = eo(e.stateNode, t, 2), e = Ya(e, t, 2), e !== null && (ks(e, 2), la(e));
    }
    function qe(e, t, a) {
      if (e.tag === 3) _f(e, e, a);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          _f(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Ja === null || !Ja.has(n))) {
            e = Yt(a, e), a = _d(2), n = Ya(t, a, 2), n !== null && (Dd(a, n, t, e), ks(n, 2), la(n));
            break;
          }
        }
        t = t.return;
      }
    }
    function Ao(e, t, a) {
      var n = e.pingCache;
      if (n === null) {
        n = e.pingCache = new P2();
        var s = /* @__PURE__ */ new Set();
        n.set(t, s);
      } else s = n.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), n.set(t, s));
      s.has(a) || (vo = true, s.add(a), e = sh.bind(null, e, t, a), t.then(e, e));
    }
    function sh(e, t, a) {
      var n = e.pingCache;
      n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Xe === e && (Ie & a) === a && (Pe === 4 || Pe === 3 && (Ie & 62914560) === Ie && 300 > P() - ul ? (Oe & 2) === 0 && os(e, 0) : bo |= a, ls === Ie && (ls = 0)), la(e);
    }
    function Df(e, t) {
      t === 0 && (t = Ic()), e = pn(e, t), e !== null && (ks(e, t), la(e));
    }
    function ih(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Df(e, a);
    }
    function lh(e, t) {
      var a = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var n = e.stateNode, s = e.memoizedState;
          s !== null && (a = s.retryLane);
          break;
        case 19:
          n = e.stateNode;
          break;
        case 22:
          n = e.stateNode._retryCache;
          break;
        default:
          throw Error(u(314));
      }
      n !== null && n.delete(t), Df(e, a);
    }
    function rh(e, t) {
      return Le(e, t);
    }
    var yl = null, us = null, jo = false, vl = false, Io = false, Wa = 0;
    function la(e) {
      e !== us && e.next === null && (us === null ? yl = us = e : us = us.next = e), vl = true, jo || (jo = true, ch());
    }
    function ti(e, t) {
      if (!Io && vl) {
        Io = true;
        do
          for (var a = false, n = yl; n !== null; ) {
            if (e !== 0) {
              var s = n.pendingLanes;
              if (s === 0) var l = 0;
              else {
                var o = n.suspendedLanes, d = n.pingedLanes;
                l = (1 << 31 - Rt(42 | e) + 1) - 1, l &= s & ~(o & ~d), l = l & 201326741 ? l & 201326741 | 1 : l ? l | 2 : 0;
              }
              l !== 0 && (a = true, Bf(n, l));
            } else l = Ie, l = Si(n, n === Xe ? l : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (l & 3) === 0 || ws(n, l) || (a = true, Bf(n, l));
            n = n.next;
          }
        while (a);
        Io = false;
      }
    }
    function oh() {
      Lf();
    }
    function Lf() {
      vl = jo = false;
      var e = 0;
      Wa !== 0 && bh() && (e = Wa);
      for (var t = P(), a = null, n = yl; n !== null; ) {
        var s = n.next, l = Uf(n, t);
        l === 0 ? (n.next = null, a === null ? yl = s : a.next = s, s === null && (us = a)) : (a = n, (e !== 0 || (l & 3) !== 0) && (vl = true)), n = s;
      }
      ct !== 0 && ct !== 5 || ti(e), Wa !== 0 && (Wa = 0);
    }
    function Uf(e, t) {
      for (var a = e.suspendedLanes, n = e.pingedLanes, s = e.expirationTimes, l = e.pendingLanes & -62914561; 0 < l; ) {
        var o = 31 - Rt(l), d = 1 << o, y = s[o];
        y === -1 ? ((d & a) === 0 || (d & n) !== 0) && (s[o] = Dm(d, t)) : y <= t && (e.expiredLanes |= d), l &= ~d;
      }
      if (t = Xe, a = Ie, a = Si(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && A(n), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || ws(e, a)) {
        if (t = a & -a, t === e.callbackPriority) return t;
        switch (n !== null && A(n), Gl(a)) {
          case 2:
          case 8:
            a = oe;
            break;
          case 32:
            a = Ue;
            break;
          case 268435456:
            a = Fe;
            break;
          default:
            a = Ue;
        }
        return n = Of.bind(null, e), a = Le(a, n), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return n !== null && n !== null && A(n), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Of(e, t) {
      if (ct !== 0 && ct !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (gl() && e.callbackNode !== a) return null;
      var n = Ie;
      return n = Si(e, e === Xe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (bf(e, n, t), Uf(e, P()), e.callbackNode != null && e.callbackNode === a ? Of.bind(null, e) : null);
    }
    function Bf(e, t) {
      if (gl()) return null;
      bf(e, t, true);
    }
    function ch() {
      kh(function() {
        (Oe & 6) !== 0 ? Le(ee, oh) : Lf();
      });
    }
    function Eo() {
      if (Wa === 0) {
        var e = Jn;
        e === 0 && (e = bi, bi <<= 1, (bi & 261888) === 0 && (bi = 256)), Wa = e;
      }
      return Wa;
    }
    function qf(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ai("" + e);
    }
    function Hf(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function uh(e, t, a, n, s) {
      if (t === "submit" && a && a.stateNode === s) {
        var l = qf((s[St] || null).action), o = n.submitter;
        o && (t = (t = o[St] || null) ? qf(t.formAction) : o.getAttribute("formAction"), t !== null && (l = t, o = null));
        var d = new Ni("action", "action", null, n, s);
        e.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if (Wa !== 0) {
                    var y = o ? Hf(s, o) : new FormData(s);
                    Kr(a, {
                      pending: true,
                      data: y,
                      method: s.method,
                      action: l
                    }, null, y);
                  }
                } else typeof l == "function" && (d.preventDefault(), y = o ? Hf(s, o) : new FormData(s), Kr(a, {
                  pending: true,
                  data: y,
                  method: s.method,
                  action: l
                }, l, y));
              },
              currentTarget: s
            }
          ]
        });
      }
    }
    for (var No = 0; No < dr.length; No++) {
      var Ro = dr[No], dh = Ro.toLowerCase(), fh = Ro[0].toUpperCase() + Ro.slice(1);
      Pt(dh, "on" + fh);
    }
    Pt(yu, "onAnimationEnd"), Pt(vu, "onAnimationIteration"), Pt(bu, "onAnimationStart"), Pt("dblclick", "onDoubleClick"), Pt("focusin", "onFocus"), Pt("focusout", "onBlur"), Pt(I2, "onTransitionRun"), Pt(E2, "onTransitionStart"), Pt(N2, "onTransitionCancel"), Pt(wu, "onTransitionEnd"), Dn("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), Dn("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), Dn("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), Dn("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), dn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), dn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), dn("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), dn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), dn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), dn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var ai = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mh = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ai));
    function Gf(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var n = e[a], s = n.event;
        n = n.listeners;
        e: {
          var l = void 0;
          if (t) for (var o = n.length - 1; 0 <= o; o--) {
            var d = n[o], y = d.instance, I = d.currentTarget;
            if (d = d.listener, y !== l && s.isPropagationStopped()) break e;
            l = d, s.currentTarget = I;
            try {
              l(s);
            } catch (O) {
              zi(O);
            }
            s.currentTarget = null, l = y;
          }
          else for (o = 0; o < n.length; o++) {
            if (d = n[o], y = d.instance, I = d.currentTarget, d = d.listener, y !== l && s.isPropagationStopped()) break e;
            l = d, s.currentTarget = I;
            try {
              l(s);
            } catch (O) {
              zi(O);
            }
            s.currentTarget = null, l = y;
          }
        }
      }
    }
    function je(e, t) {
      var a = t[Yl];
      a === void 0 && (a = t[Yl] = /* @__PURE__ */ new Set());
      var n = e + "__bubble";
      a.has(n) || (Yf(t, e, 2, false), a.add(n));
    }
    function To(e, t, a) {
      var n = 0;
      t && (n |= 4), Yf(a, e, n, t);
    }
    var bl = "_reactListening" + Math.random().toString(36).slice(2);
    function zo(e) {
      if (!e[bl]) {
        e[bl] = true, Dc.forEach(function(a) {
          a !== "selectionchange" && (mh.has(a) || To(a, false, e), To(a, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[bl] || (t[bl] = true, To("selectionchange", false, t));
      }
    }
    function Yf(e, t, a, n) {
      switch (v1(t)) {
        case 2:
          var s = Hh;
          break;
        case 8:
          s = Gh;
          break;
        default:
          s = Ko;
      }
      a = s.bind(null, t, a, e), s = void 0, !Wl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = true), n ? s !== void 0 ? e.addEventListener(t, a, {
        capture: true,
        passive: s
      }) : e.addEventListener(t, a, true) : s !== void 0 ? e.addEventListener(t, a, {
        passive: s
      }) : e.addEventListener(t, a, false);
    }
    function _o(e, t, a, n, s) {
      var l = n;
      if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (; ; ) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var d = n.stateNode.containerInfo;
          if (d === s) break;
          if (o === 4) for (o = n.return; o !== null; ) {
            var y = o.tag;
            if ((y === 3 || y === 4) && o.stateNode.containerInfo === s) return;
            o = o.return;
          }
          for (; d !== null; ) {
            if (o = Tn(d), o === null) return;
            if (y = o.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              n = l = o;
              continue e;
            }
            d = d.parentNode;
          }
        }
        n = n.return;
      }
      Zc(function() {
        var I = l, O = Fl(a), Q = [];
        e: {
          var N = ku.get(e);
          if (N !== void 0) {
            var _ = Ni, ie = e;
            switch (e) {
              case "keypress":
                if (Ii(a) === 0) break e;
              case "keydown":
              case "keyup":
                _ = l2;
                break;
              case "focusin":
                ie = "focus", _ = ar;
                break;
              case "focusout":
                ie = "blur", _ = ar;
                break;
              case "beforeblur":
              case "afterblur":
                _ = ar;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                _ = Fc;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                _ = Km;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                _ = c2;
                break;
              case yu:
              case vu:
              case bu:
                _ = $m;
                break;
              case wu:
                _ = d2;
                break;
              case "scroll":
              case "scrollend":
                _ = Vm;
                break;
              case "wheel":
                _ = m2;
                break;
              case "copy":
              case "cut":
              case "paste":
                _ = Pm;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                _ = Wc;
                break;
              case "toggle":
              case "beforetoggle":
                _ = p2;
            }
            var me = (t & 4) !== 0, Ye = !me && (e === "scroll" || e === "scrollend"), C = me ? N !== null ? N + "Capture" : null : N;
            me = [];
            for (var b = I, j; b !== null; ) {
              var G = b;
              if (j = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || j === null || C === null || (G = xs(b, C), G != null && me.push(ni(b, G, j))), Ye) break;
              b = b.return;
            }
            0 < me.length && (N = new _(N, ie, null, a, O), Q.push({
              event: N,
              listeners: me
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (N = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", N && a !== Jl && (ie = a.relatedTarget || a.fromElement) && (Tn(ie) || ie[Rn])) break e;
            if ((_ || N) && (N = O.window === O ? O : (N = O.ownerDocument) ? N.defaultView || N.parentWindow : window, _ ? (ie = a.relatedTarget || a.toElement, _ = I, ie = ie ? Tn(ie) : null, ie !== null && (Ye = h(ie), me = ie.tag, ie !== Ye || me !== 5 && me !== 27 && me !== 6) && (ie = null)) : (_ = null, ie = I), _ !== ie)) {
              if (me = Fc, G = "onMouseLeave", C = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (me = Wc, G = "onPointerLeave", C = "onPointerEnter", b = "pointer"), Ye = _ == null ? N : Cs(_), j = ie == null ? N : Cs(ie), N = new me(G, b + "leave", _, a, O), N.target = Ye, N.relatedTarget = j, G = null, Tn(O) === I && (me = new me(C, b + "enter", ie, a, O), me.target = j, me.relatedTarget = Ye, G = me), Ye = G, _ && ie) t: {
                for (me = hh, C = _, b = ie, j = 0, G = C; G; G = me(G)) j++;
                G = 0;
                for (var de = b; de; de = me(de)) G++;
                for (; 0 < j - G; ) C = me(C), j--;
                for (; 0 < G - j; ) b = me(b), G--;
                for (; j--; ) {
                  if (C === b || b !== null && C === b.alternate) {
                    me = C;
                    break t;
                  }
                  C = me(C), b = me(b);
                }
                me = null;
              }
              else me = null;
              _ !== null && Qf(Q, N, _, me, false), ie !== null && Ye !== null && Qf(Q, Ye, ie, me, true);
            }
          }
          e: {
            if (N = I ? Cs(I) : window, _ = N.nodeName && N.nodeName.toLowerCase(), _ === "select" || _ === "input" && N.type === "file") var _e = lu;
            else if (su(N)) if (ru) _e = M2;
            else {
              _e = C2;
              var re = S2;
            }
            else _ = N.nodeName, !_ || _.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? I && Kl(I.elementType) && (_e = lu) : _e = x2;
            if (_e && (_e = _e(e, I))) {
              iu(Q, _e, a, O);
              break e;
            }
            re && re(e, N, I), e === "focusout" && I && N.type === "number" && I.memoizedProps.value != null && Zl(N, "number", N.value);
          }
          switch (re = I ? Cs(I) : window, e) {
            case "focusin":
              (su(re) || re.contentEditable === "true") && (Hn = re, or = I, Ts = null);
              break;
            case "focusout":
              Ts = or = Hn = null;
              break;
            case "mousedown":
              cr = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              cr = false, pu(Q, a, O);
              break;
            case "selectionchange":
              if (j2) break;
            case "keydown":
            case "keyup":
              pu(Q, a, O);
          }
          var Ce;
          if (sr) e: {
            switch (e) {
              case "compositionstart":
                var Ee = "onCompositionStart";
                break e;
              case "compositionend":
                Ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ee = "onCompositionUpdate";
                break e;
            }
            Ee = void 0;
          }
          else qn ? au(e, a) && (Ee = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Ee = "onCompositionStart");
          Ee && (Pc && a.locale !== "ko" && (qn || Ee !== "onCompositionStart" ? Ee === "onCompositionEnd" && qn && (Ce = Kc()) : (La = O, Pl = "value" in La ? La.value : La.textContent, qn = true)), re = wl(I, Ee), 0 < re.length && (Ee = new $c(Ee, e, null, a, O), Q.push({
            event: Ee,
            listeners: re
          }), Ce ? Ee.data = Ce : (Ce = nu(a), Ce !== null && (Ee.data = Ce)))), (Ce = y2 ? v2(e, a) : b2(e, a)) && (Ee = wl(I, "onBeforeInput"), 0 < Ee.length && (re = new $c("onBeforeInput", "beforeinput", null, a, O), Q.push({
            event: re,
            listeners: Ee
          }), re.data = Ce)), uh(Q, e, I, a, O);
        }
        Gf(Q, t);
      });
    }
    function ni(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function wl(e, t) {
      for (var a = t + "Capture", n = []; e !== null; ) {
        var s = e, l = s.stateNode;
        if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || l === null || (s = xs(e, a), s != null && n.unshift(ni(e, s, l)), s = xs(e, t), s != null && n.push(ni(e, s, l))), e.tag === 3) return n;
        e = e.return;
      }
      return [];
    }
    function hh(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Qf(e, t, a, n, s) {
      for (var l = t._reactName, o = []; a !== null && a !== n; ) {
        var d = a, y = d.alternate, I = d.stateNode;
        if (d = d.tag, y !== null && y === n) break;
        d !== 5 && d !== 26 && d !== 27 || I === null || (y = I, s ? (I = xs(a, l), I != null && o.unshift(ni(a, I, y))) : s || (I = xs(a, l), I != null && o.push(ni(a, I, y)))), a = a.return;
      }
      o.length !== 0 && e.push({
        event: t,
        listeners: o
      });
    }
    var ph = /\r\n?/g, gh = /\u0000|\uFFFD/g;
    function Xf(e) {
      return (typeof e == "string" ? e : "" + e).replace(ph, `
`).replace(gh, "");
    }
    function Vf(e, t) {
      return t = Xf(t), Xf(e) === t;
    }
    function Ge(e, t, a, n, s, l) {
      switch (a) {
        case "children":
          typeof n == "string" ? t === "body" || t === "textarea" && n === "" || Un(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && Un(e, "" + n);
          break;
        case "className":
          xi(e, "class", n);
          break;
        case "tabIndex":
          xi(e, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          xi(e, a, n);
          break;
        case "style":
          Xc(e, n, l);
          break;
        case "data":
          if (t !== "object") {
            xi(e, "data", n);
            break;
          }
        case "src":
        case "href":
          if (n === "" && (t !== "a" || a !== "href")) {
            e.removeAttribute(a);
            break;
          }
          if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
            e.removeAttribute(a);
            break;
          }
          n = Ai("" + n), e.setAttribute(a, n);
          break;
        case "action":
        case "formAction":
          if (typeof n == "function") {
            e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof l == "function" && (a === "formAction" ? (t !== "input" && Ge(e, t, "name", s.name, s, null), Ge(e, t, "formEncType", s.formEncType, s, null), Ge(e, t, "formMethod", s.formMethod, s, null), Ge(e, t, "formTarget", s.formTarget, s, null)) : (Ge(e, t, "encType", s.encType, s, null), Ge(e, t, "method", s.method, s, null), Ge(e, t, "target", s.target, s, null)));
          if (n == null || typeof n == "symbol" || typeof n == "boolean") {
            e.removeAttribute(a);
            break;
          }
          n = Ai("" + n), e.setAttribute(a, n);
          break;
        case "onClick":
          n != null && (e.onclick = ua);
          break;
        case "onScroll":
          n != null && je("scroll", e);
          break;
        case "onScrollEnd":
          n != null && je("scrollend", e);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
            if (a = n.__html, a != null) {
              if (s.children != null) throw Error(u(60));
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = n && typeof n != "function" && typeof n != "symbol";
          break;
        case "muted":
          e.muted = n && typeof n != "function" && typeof n != "symbol";
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
          if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          a = Ai("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, "" + n) : e.removeAttribute(a);
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
          n && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          n === true ? e.setAttribute(a, "") : n !== false && n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(a, n) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(a, n) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? e.removeAttribute(a) : e.setAttribute(a, n);
          break;
        case "popover":
          je("beforetoggle", e), je("toggle", e), Ci(e, "popover", n);
          break;
        case "xlinkActuate":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
          break;
        case "xlinkArcrole":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
          break;
        case "xlinkRole":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
          break;
        case "xlinkShow":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
          break;
        case "xlinkTitle":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
          break;
        case "xlinkType":
          ca(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
          break;
        case "xmlBase":
          ca(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
          break;
        case "xmlLang":
          ca(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
          break;
        case "xmlSpace":
          ca(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
          break;
        case "is":
          Ci(e, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Qm.get(a) || a, Ci(e, a, n));
      }
    }
    function Do(e, t, a, n, s, l) {
      switch (a) {
        case "style":
          Xc(e, n, l);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
            if (a = n.__html, a != null) {
              if (s.children != null) throw Error(u(60));
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof n == "string" ? Un(e, n) : (typeof n == "number" || typeof n == "bigint") && Un(e, "" + n);
          break;
        case "onScroll":
          n != null && je("scroll", e);
          break;
        case "onScrollEnd":
          n != null && je("scrollend", e);
          break;
        case "onClick":
          n != null && (e.onclick = ua);
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
          if (!Lc.hasOwnProperty(a)) e: {
            if (a[0] === "o" && a[1] === "n" && (s = a.endsWith("Capture"), t = a.slice(2, s ? a.length - 7 : void 0), l = e[St] || null, l = l != null ? l[a] : null, typeof l == "function" && e.removeEventListener(t, l, s), typeof n == "function")) {
              typeof l != "function" && l !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, s);
              break e;
            }
            a in e ? e[a] = n : n === true ? e.setAttribute(a, "") : Ci(e, a, n);
          }
      }
    }
    function yt(e, t, a) {
      switch (t) {
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
          je("error", e), je("load", e);
          var n = false, s = false, l;
          for (l in a) if (a.hasOwnProperty(l)) {
            var o = a[l];
            if (o != null) switch (l) {
              case "src":
                n = true;
                break;
              case "srcSet":
                s = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Ge(e, t, l, o, a, null);
            }
          }
          s && Ge(e, t, "srcSet", a.srcSet, a, null), n && Ge(e, t, "src", a.src, a, null);
          return;
        case "input":
          je("invalid", e);
          var d = l = o = s = null, y = null, I = null;
          for (n in a) if (a.hasOwnProperty(n)) {
            var O = a[n];
            if (O != null) switch (n) {
              case "name":
                s = O;
                break;
              case "type":
                o = O;
                break;
              case "checked":
                y = O;
                break;
              case "defaultChecked":
                I = O;
                break;
              case "value":
                l = O;
                break;
              case "defaultValue":
                d = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(u(137, t));
                break;
              default:
                Ge(e, t, n, O, a, null);
            }
          }
          Hc(e, l, d, y, I, o, s, false);
          return;
        case "select":
          je("invalid", e), n = o = l = null;
          for (s in a) if (a.hasOwnProperty(s) && (d = a[s], d != null)) switch (s) {
            case "value":
              l = d;
              break;
            case "defaultValue":
              o = d;
              break;
            case "multiple":
              n = d;
            default:
              Ge(e, t, s, d, a, null);
          }
          t = l, a = o, e.multiple = !!n, t != null ? Ln(e, !!n, t, false) : a != null && Ln(e, !!n, a, true);
          return;
        case "textarea":
          je("invalid", e), l = s = n = null;
          for (o in a) if (a.hasOwnProperty(o) && (d = a[o], d != null)) switch (o) {
            case "value":
              n = d;
              break;
            case "defaultValue":
              s = d;
              break;
            case "children":
              l = d;
              break;
            case "dangerouslySetInnerHTML":
              if (d != null) throw Error(u(91));
              break;
            default:
              Ge(e, t, o, d, a, null);
          }
          Yc(e, n, s, l);
          return;
        case "option":
          for (y in a) if (a.hasOwnProperty(y) && (n = a[y], n != null)) switch (y) {
            case "selected":
              e.selected = n && typeof n != "function" && typeof n != "symbol";
              break;
            default:
              Ge(e, t, y, n, a, null);
          }
          return;
        case "dialog":
          je("beforetoggle", e), je("toggle", e), je("cancel", e), je("close", e);
          break;
        case "iframe":
        case "object":
          je("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < ai.length; n++) je(ai[n], e);
          break;
        case "image":
          je("error", e), je("load", e);
          break;
        case "details":
          je("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          je("error", e), je("load", e);
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
          for (I in a) if (a.hasOwnProperty(I) && (n = a[I], n != null)) switch (I) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(u(137, t));
            default:
              Ge(e, t, I, n, a, null);
          }
          return;
        default:
          if (Kl(t)) {
            for (O in a) a.hasOwnProperty(O) && (n = a[O], n !== void 0 && Do(e, t, O, n, a, void 0));
            return;
          }
      }
      for (d in a) a.hasOwnProperty(d) && (n = a[d], n != null && Ge(e, t, d, n, a, null));
    }
    function yh(e, t, a, n) {
      switch (t) {
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
          var s = null, l = null, o = null, d = null, y = null, I = null, O = null;
          for (_ in a) {
            var Q = a[_];
            if (a.hasOwnProperty(_) && Q != null) switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = Q;
              default:
                n.hasOwnProperty(_) || Ge(e, t, _, null, n, Q);
            }
          }
          for (var N in n) {
            var _ = n[N];
            if (Q = a[N], n.hasOwnProperty(N) && (_ != null || Q != null)) switch (N) {
              case "type":
                l = _;
                break;
              case "name":
                s = _;
                break;
              case "checked":
                I = _;
                break;
              case "defaultChecked":
                O = _;
                break;
              case "value":
                o = _;
                break;
              case "defaultValue":
                d = _;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(u(137, t));
                break;
              default:
                _ !== Q && Ge(e, t, N, _, n, Q);
            }
          }
          Vl(e, o, d, y, I, O, l, s);
          return;
        case "select":
          _ = o = d = N = null;
          for (l in a) if (y = a[l], a.hasOwnProperty(l) && y != null) switch (l) {
            case "value":
              break;
            case "multiple":
              _ = y;
            default:
              n.hasOwnProperty(l) || Ge(e, t, l, null, n, y);
          }
          for (s in n) if (l = n[s], y = a[s], n.hasOwnProperty(s) && (l != null || y != null)) switch (s) {
            case "value":
              N = l;
              break;
            case "defaultValue":
              d = l;
              break;
            case "multiple":
              o = l;
            default:
              l !== y && Ge(e, t, s, l, n, y);
          }
          t = d, a = o, n = _, N != null ? Ln(e, !!a, N, false) : !!n != !!a && (t != null ? Ln(e, !!a, t, true) : Ln(e, !!a, a ? [] : "", false));
          return;
        case "textarea":
          _ = N = null;
          for (d in a) if (s = a[d], a.hasOwnProperty(d) && s != null && !n.hasOwnProperty(d)) switch (d) {
            case "value":
              break;
            case "children":
              break;
            default:
              Ge(e, t, d, null, n, s);
          }
          for (o in n) if (s = n[o], l = a[o], n.hasOwnProperty(o) && (s != null || l != null)) switch (o) {
            case "value":
              N = s;
              break;
            case "defaultValue":
              _ = s;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (s != null) throw Error(u(91));
              break;
            default:
              s !== l && Ge(e, t, o, s, n, l);
          }
          Gc(e, N, _);
          return;
        case "option":
          for (var ie in a) if (N = a[ie], a.hasOwnProperty(ie) && N != null && !n.hasOwnProperty(ie)) switch (ie) {
            case "selected":
              e.selected = false;
              break;
            default:
              Ge(e, t, ie, null, n, N);
          }
          for (y in n) if (N = n[y], _ = a[y], n.hasOwnProperty(y) && N !== _ && (N != null || _ != null)) switch (y) {
            case "selected":
              e.selected = N && typeof N != "function" && typeof N != "symbol";
              break;
            default:
              Ge(e, t, y, N, n, _);
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
          for (var me in a) N = a[me], a.hasOwnProperty(me) && N != null && !n.hasOwnProperty(me) && Ge(e, t, me, null, n, N);
          for (I in n) if (N = n[I], _ = a[I], n.hasOwnProperty(I) && N !== _ && (N != null || _ != null)) switch (I) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (N != null) throw Error(u(137, t));
              break;
            default:
              Ge(e, t, I, N, n, _);
          }
          return;
        default:
          if (Kl(t)) {
            for (var Ye in a) N = a[Ye], a.hasOwnProperty(Ye) && N !== void 0 && !n.hasOwnProperty(Ye) && Do(e, t, Ye, void 0, n, N);
            for (O in n) N = n[O], _ = a[O], !n.hasOwnProperty(O) || N === _ || N === void 0 && _ === void 0 || Do(e, t, O, N, n, _);
            return;
          }
      }
      for (var C in a) N = a[C], a.hasOwnProperty(C) && N != null && !n.hasOwnProperty(C) && Ge(e, t, C, null, n, N);
      for (Q in n) N = n[Q], _ = a[Q], !n.hasOwnProperty(Q) || N === _ || N == null && _ == null || Ge(e, t, Q, N, n, _);
    }
    function Zf(e) {
      switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return true;
        default:
          return false;
      }
    }
    function vh() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), n = 0; n < a.length; n++) {
          var s = a[n], l = s.transferSize, o = s.initiatorType, d = s.duration;
          if (l && d && Zf(o)) {
            for (o = 0, d = s.responseEnd, n += 1; n < a.length; n++) {
              var y = a[n], I = y.startTime;
              if (I > d) break;
              var O = y.transferSize, Q = y.initiatorType;
              O && Zf(Q) && (y = y.responseEnd, o += O * (y < d ? 1 : (d - I) / (y - I)));
            }
            if (--n, t += 8 * (l + o) / (s.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var Lo = null, Uo = null;
    function kl(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Kf(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Jf(e, t) {
      if (e === 0) switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
      return e === 1 && t === "foreignObject" ? 0 : e;
    }
    function Oo(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Bo = null;
    function bh() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Bo ? false : (Bo = e, true) : (Bo = null, false);
    }
    var Ff = typeof setTimeout == "function" ? setTimeout : void 0, wh = typeof clearTimeout == "function" ? clearTimeout : void 0, $f = typeof Promise == "function" ? Promise : void 0, kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof $f < "u" ? function(e) {
      return $f.resolve(null).then(e).catch(Sh);
    } : Ff;
    function Sh(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Pa(e) {
      return e === "head";
    }
    function Wf(e, t) {
      var a = t, n = 0;
      do {
        var s = a.nextSibling;
        if (e.removeChild(a), s && s.nodeType === 8) if (a = s.data, a === "/$" || a === "/&") {
          if (n === 0) {
            e.removeChild(s), hs(t);
            return;
          }
          n--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") n++;
        else if (a === "html") si(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, si(a);
          for (var l = a.firstChild; l; ) {
            var o = l.nextSibling, d = l.nodeName;
            l[Ss] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && l.rel.toLowerCase() === "stylesheet" || a.removeChild(l), l = o;
          }
        } else a === "body" && si(e.ownerDocument.body);
        a = s;
      } while (a);
      hs(t);
    }
    function Pf(e, t) {
      var a = e;
      e = 0;
      do {
        var n = a.nextSibling;
        if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), n && n.nodeType === 8) if (a = n.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
        a = n;
      } while (a);
    }
    function qo(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            qo(a), Ql(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function Ch(e, t, a, n) {
      for (; e.nodeType === 1; ) {
        var s = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (n) {
          if (!e[Ss]) switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (l = e.getAttribute("rel"), l === "stylesheet" && e.hasAttribute("data-precedence")) break;
              if (l !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title)) break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (l = e.getAttribute("src"), (l !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && l && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
              return e;
            default:
              return e;
          }
        } else if (t === "input" && e.type === "hidden") {
          var l = s.name == null ? null : "" + s.name;
          if (s.type === "hidden" && e.getAttribute("name") === l) return e;
        } else return e;
        if (e = Kt(e.nextSibling), e === null) break;
      }
      return null;
    }
    function xh(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function e1(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Ho(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function Go(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function Mh(e, t) {
      var a = e.ownerDocument;
      if (e.data === "$~") e._reactRetry = t;
      else if (e.data !== "$?" || a.readyState !== "loading") t();
      else {
        var n = function() {
          t(), a.removeEventListener("DOMContentLoaded", n);
        };
        a.addEventListener("DOMContentLoaded", n), e._reactRetry = n;
      }
    }
    function Kt(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
          if (t === "/$" || t === "/&") return null;
        }
      }
      return e;
    }
    var Yo = null;
    function t1(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === "/$" || a === "/&") {
            if (t === 0) return Kt(e.nextSibling);
            t--;
          } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function a1(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
            if (t === 0) return e;
            t--;
          } else a !== "/$" && a !== "/&" || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function n1(e, t, a) {
      switch (t = kl(a), e) {
        case "html":
          if (e = t.documentElement, !e) throw Error(u(452));
          return e;
        case "head":
          if (e = t.head, !e) throw Error(u(453));
          return e;
        case "body":
          if (e = t.body, !e) throw Error(u(454));
          return e;
        default:
          throw Error(u(451));
      }
    }
    function si(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Ql(e);
    }
    var Jt = /* @__PURE__ */ new Map(), s1 = /* @__PURE__ */ new Set();
    function Sl(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Aa = w.d;
    w.d = {
      f: Ah,
      r: jh,
      D: Ih,
      C: Eh,
      L: Nh,
      m: Rh,
      X: zh,
      S: Th,
      M: _h
    };
    function Ah() {
      var e = Aa.f(), t = ml();
      return e || t;
    }
    function jh(e) {
      var t = zn(e);
      t !== null && t.tag === 5 && t.type === "form" ? wd(t) : Aa.r(e);
    }
    var ds = typeof document > "u" ? null : document;
    function i1(e, t, a) {
      var n = ds;
      if (n && typeof t == "string" && t) {
        var s = Ht(t);
        s = 'link[rel="' + e + '"][href="' + s + '"]', typeof a == "string" && (s += '[crossorigin="' + a + '"]'), s1.has(s) || (s1.add(s), e = {
          rel: e,
          crossOrigin: a,
          href: t
        }, n.querySelector(s) === null && (t = n.createElement("link"), yt(t, "link", e), ut(t), n.head.appendChild(t)));
      }
    }
    function Ih(e) {
      Aa.D(e), i1("dns-prefetch", e, null);
    }
    function Eh(e, t) {
      Aa.C(e, t), i1("preconnect", e, t);
    }
    function Nh(e, t, a) {
      Aa.L(e, t, a);
      var n = ds;
      if (n && e && t) {
        var s = 'link[rel="preload"][as="' + Ht(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (s += '[imagesrcset="' + Ht(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (s += '[imagesizes="' + Ht(a.imageSizes) + '"]')) : s += '[href="' + Ht(e) + '"]';
        var l = s;
        switch (t) {
          case "style":
            l = fs(e);
            break;
          case "script":
            l = ms(e);
        }
        Jt.has(l) || (e = z({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        }, a), Jt.set(l, e), n.querySelector(s) !== null || t === "style" && n.querySelector(ii(l)) || t === "script" && n.querySelector(li(l)) || (t = n.createElement("link"), yt(t, "link", e), ut(t), n.head.appendChild(t)));
      }
    }
    function Rh(e, t) {
      Aa.m(e, t);
      var a = ds;
      if (a && e) {
        var n = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Ht(n) + '"][href="' + Ht(e) + '"]', l = s;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            l = ms(e);
        }
        if (!Jt.has(l) && (e = z({
          rel: "modulepreload",
          href: e
        }, t), Jt.set(l, e), a.querySelector(s) === null)) {
          switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (a.querySelector(li(l))) return;
          }
          n = a.createElement("link"), yt(n, "link", e), ut(n), a.head.appendChild(n);
        }
      }
    }
    function Th(e, t, a) {
      Aa.S(e, t, a);
      var n = ds;
      if (n && e) {
        var s = _n(n).hoistableStyles, l = fs(e);
        t = t || "default";
        var o = s.get(l);
        if (!o) {
          var d = {
            loading: 0,
            preload: null
          };
          if (o = n.querySelector(ii(l))) d.loading = 5;
          else {
            e = z({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, a), (a = Jt.get(l)) && Qo(e, a);
            var y = o = n.createElement("link");
            ut(y), yt(y, "link", e), y._p = new Promise(function(I, O) {
              y.onload = I, y.onerror = O;
            }), y.addEventListener("load", function() {
              d.loading |= 1;
            }), y.addEventListener("error", function() {
              d.loading |= 2;
            }), d.loading |= 4, Cl(o, t, n);
          }
          o = {
            type: "stylesheet",
            instance: o,
            count: 1,
            state: d
          }, s.set(l, o);
        }
      }
    }
    function zh(e, t) {
      Aa.X(e, t);
      var a = ds;
      if (a && e) {
        var n = _n(a).hoistableScripts, s = ms(e), l = n.get(s);
        l || (l = a.querySelector(li(s)), l || (e = z({
          src: e,
          async: true
        }, t), (t = Jt.get(s)) && Xo(e, t), l = a.createElement("script"), ut(l), yt(l, "link", e), a.head.appendChild(l)), l = {
          type: "script",
          instance: l,
          count: 1,
          state: null
        }, n.set(s, l));
      }
    }
    function _h(e, t) {
      Aa.M(e, t);
      var a = ds;
      if (a && e) {
        var n = _n(a).hoistableScripts, s = ms(e), l = n.get(s);
        l || (l = a.querySelector(li(s)), l || (e = z({
          src: e,
          async: true,
          type: "module"
        }, t), (t = Jt.get(s)) && Xo(e, t), l = a.createElement("script"), ut(l), yt(l, "link", e), a.head.appendChild(l)), l = {
          type: "script",
          instance: l,
          count: 1,
          state: null
        }, n.set(s, l));
      }
    }
    function l1(e, t, a, n) {
      var s = (s = be.current) ? Sl(s) : null;
      if (!s) throw Error(u(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (t = fs(a.href), a = _n(s).hoistableStyles, n = a.get(t), n || (n = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, a.set(t, n)), n) : {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = fs(a.href);
            var l = _n(s).hoistableStyles, o = l.get(e);
            if (o || (s = s.ownerDocument || s, o = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            }, l.set(e, o), (l = s.querySelector(ii(e))) && !l._p && (o.instance = l, o.state.loading = 5), Jt.has(e) || (a = {
              rel: "preload",
              as: "style",
              href: a.href,
              crossOrigin: a.crossOrigin,
              integrity: a.integrity,
              media: a.media,
              hrefLang: a.hrefLang,
              referrerPolicy: a.referrerPolicy
            }, Jt.set(e, a), l || Dh(s, e, a, o.state))), t && n === null) throw Error(u(528, ""));
            return o;
          }
          if (t && n !== null) throw Error(u(529, ""));
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ms(a), a = _n(s).hoistableScripts, n = a.get(t), n || (n = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, a.set(t, n)), n) : {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        default:
          throw Error(u(444, e));
      }
    }
    function fs(e) {
      return 'href="' + Ht(e) + '"';
    }
    function ii(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function r1(e) {
      return z({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Dh(e, t, a, n) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
        return n.loading |= 1;
      }), t.addEventListener("error", function() {
        return n.loading |= 2;
      }), yt(t, "link", a), ut(t), e.head.appendChild(t));
    }
    function ms(e) {
      return '[src="' + Ht(e) + '"]';
    }
    function li(e) {
      return "script[async]" + e;
    }
    function o1(e, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var n = e.querySelector('style[data-href~="' + Ht(a.href) + '"]');
          if (n) return t.instance = n, ut(n), n;
          var s = z({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement("style"), ut(n), yt(n, "style", s), Cl(n, a.precedence, e), t.instance = n;
        case "stylesheet":
          s = fs(a.href);
          var l = e.querySelector(ii(s));
          if (l) return t.state.loading |= 4, t.instance = l, ut(l), l;
          n = r1(a), (s = Jt.get(s)) && Qo(n, s), l = (e.ownerDocument || e).createElement("link"), ut(l);
          var o = l;
          return o._p = new Promise(function(d, y) {
            o.onload = d, o.onerror = y;
          }), yt(l, "link", n), t.state.loading |= 4, Cl(l, a.precedence, e), t.instance = l;
        case "script":
          return l = ms(a.src), (s = e.querySelector(li(l))) ? (t.instance = s, ut(s), s) : (n = a, (s = Jt.get(l)) && (n = z({}, a), Xo(n, s)), e = e.ownerDocument || e, s = e.createElement("script"), ut(s), yt(s, "link", n), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Cl(n, a.precedence, e));
      return t.instance;
    }
    function Cl(e, t, a) {
      for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), s = n.length ? n[n.length - 1] : null, l = s, o = 0; o < n.length; o++) {
        var d = n[o];
        if (d.dataset.precedence === t) l = d;
        else if (l !== s) break;
      }
      l ? l.parentNode.insertBefore(e, l.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Qo(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Xo(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var xl = null;
    function c1(e, t, a) {
      if (xl === null) {
        var n = /* @__PURE__ */ new Map(), s = xl = /* @__PURE__ */ new Map();
        s.set(a, n);
      } else s = xl, n = s.get(a), n || (n = /* @__PURE__ */ new Map(), s.set(a, n));
      if (n.has(e)) return n;
      for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
        var l = a[s];
        if (!(l[Ss] || l[mt] || e === "link" && l.getAttribute("rel") === "stylesheet") && l.namespaceURI !== "http://www.w3.org/2000/svg") {
          var o = l.getAttribute(t) || "";
          o = e + o;
          var d = n.get(o);
          d ? d.push(l) : n.set(o, [
            l
          ]);
        }
      }
      return n;
    }
    function u1(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null);
    }
    function Lh(e, t, a) {
      if (a === 1 || t.itemProp != null) return false;
      switch (e) {
        case "meta":
        case "title":
          return true;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
          return true;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
          switch (t.rel) {
            case "stylesheet":
              return e = t.disabled, typeof t.precedence == "string" && e == null;
            default:
              return true;
          }
        case "script":
          if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
      }
      return false;
    }
    function d1(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function Uh(e, t, a, n) {
      if (a.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var s = fs(n.href), l = t.querySelector(ii(s));
          if (l) {
            t = l._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ml.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = l, ut(l);
            return;
          }
          l = t.ownerDocument || t, n = r1(n), (s = Jt.get(s)) && Qo(n, s), l = l.createElement("link"), ut(l);
          var o = l;
          o._p = new Promise(function(d, y) {
            o.onload = d, o.onerror = y;
          }), yt(l, "link", n), a.instance = l;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ml.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    var Vo = 0;
    function Oh(e, t) {
      return e.stylesheets && e.count === 0 && jl(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var n = setTimeout(function() {
          if (e.stylesheets && jl(e, e.stylesheets), e.unsuspend) {
            var l = e.unsuspend;
            e.unsuspend = null, l();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Vo === 0 && (Vo = 62500 * vh());
        var s = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && jl(e, e.stylesheets), e.unsuspend)) {
            var l = e.unsuspend;
            e.unsuspend = null, l();
          }
        }, (e.imgBytes > Vo ? 50 : 800) + t);
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(n), clearTimeout(s);
        };
      } : null;
    }
    function Ml() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) jl(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var Al = null;
    function jl(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, Al = /* @__PURE__ */ new Map(), t.forEach(Bh, e), Al = null, Ml.call(e));
    }
    function Bh(e, t) {
      if (!(t.state.loading & 4)) {
        var a = Al.get(e);
        if (a) var n = a.get(null);
        else {
          a = /* @__PURE__ */ new Map(), Al.set(e, a);
          for (var s = e.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0; l < s.length; l++) {
            var o = s[l];
            (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (a.set(o.dataset.precedence, o), n = o);
          }
          n && a.set(null, n);
        }
        s = t.instance, o = s.getAttribute("data-precedence"), l = a.get(o) || n, l === n && a.set(null, s), a.set(o, s), this.count++, n = Ml.bind(this), s.addEventListener("load", n), s.addEventListener("error", n), l ? l.parentNode.insertBefore(s, l.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
      }
    }
    var ri = {
      $$typeof: le,
      Provider: null,
      Consumer: null,
      _currentValue: Z,
      _currentValue2: Z,
      _threadCount: 0
    };
    function qh(e, t, a, n, s, l, o, d, y) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ql(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ql(0), this.hiddenUpdates = ql(null), this.identifierPrefix = n, this.onUncaughtError = s, this.onCaughtError = l, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function f1(e, t, a, n, s, l, o, d, y, I, O, Q) {
      return e = new qh(e, t, a, o, y, I, O, Q, d), t = 1, l === true && (t |= 24), l = zt(3, null, null, t), e.current = l, l.stateNode = e, t = xr(), t.refCount++, e.pooledCache = t, t.refCount++, l.memoizedState = {
        element: n,
        isDehydrated: a,
        cache: t
      }, Ir(l), e;
    }
    function m1(e) {
      return e ? (e = Qn, e) : Qn;
    }
    function h1(e, t, a, n, s, l) {
      s = m1(s), n.context === null ? n.context = s : n.pendingContext = s, n = Ga(t), n.payload = {
        element: a
      }, l = l === void 0 ? null : l, l !== null && (n.callback = l), a = Ya(e, n, t), a !== null && (It(a, e, t), Bs(a, e, t));
    }
    function p1(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Zo(e, t) {
      p1(e, t), (e = e.alternate) && p1(e, t);
    }
    function g1(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = pn(e, 67108864);
        t !== null && It(t, e, 67108864), Zo(e, 67108864);
      }
    }
    function y1(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Ot();
        t = Hl(t);
        var a = pn(e, t);
        a !== null && It(a, e, t), Zo(e, t);
      }
    }
    var Il = true;
    function Hh(e, t, a, n) {
      var s = U.T;
      U.T = null;
      var l = w.p;
      try {
        w.p = 2, Ko(e, t, a, n);
      } finally {
        w.p = l, U.T = s;
      }
    }
    function Gh(e, t, a, n) {
      var s = U.T;
      U.T = null;
      var l = w.p;
      try {
        w.p = 8, Ko(e, t, a, n);
      } finally {
        w.p = l, U.T = s;
      }
    }
    function Ko(e, t, a, n) {
      if (Il) {
        var s = Jo(n);
        if (s === null) _o(e, t, n, El, a), b1(e, n);
        else if (Qh(s, e, t, a, n)) n.stopPropagation();
        else if (b1(e, n), t & 4 && -1 < Yh.indexOf(e)) {
          for (; s !== null; ) {
            var l = zn(s);
            if (l !== null) switch (l.tag) {
              case 3:
                if (l = l.stateNode, l.current.memoizedState.isDehydrated) {
                  var o = un(l.pendingLanes);
                  if (o !== 0) {
                    var d = l;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var y = 1 << 31 - Rt(o);
                      d.entanglements[1] |= y, o &= ~y;
                    }
                    la(l), (Oe & 6) === 0 && (dl = P() + 500, ti(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = pn(l, 2), d !== null && It(d, l, 2), ml(), Zo(l, 2);
            }
            if (l = Jo(n), l === null && _o(e, t, n, El, a), l === s) break;
            s = l;
          }
          s !== null && n.stopPropagation();
        } else _o(e, t, n, null, a);
      }
    }
    function Jo(e) {
      return e = Fl(e), Fo(e);
    }
    var El = null;
    function Fo(e) {
      if (El = null, e = Tn(e), e !== null) {
        var t = h(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = S(t), e !== null) return e;
            e = null;
          } else if (a === 31) {
            if (e = M(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return El = e, null;
    }
    function v1(e) {
      switch (e) {
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
          switch (F()) {
            case ee:
              return 2;
            case oe:
              return 8;
            case Ue:
            case ft:
              return 32;
            case Fe:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var $o = false, en = null, tn = null, an = null, oi = /* @__PURE__ */ new Map(), ci = /* @__PURE__ */ new Map(), nn = [], Yh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function b1(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          en = null;
          break;
        case "dragenter":
        case "dragleave":
          tn = null;
          break;
        case "mouseover":
        case "mouseout":
          an = null;
          break;
        case "pointerover":
        case "pointerout":
          oi.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ci.delete(t.pointerId);
      }
    }
    function ui(e, t, a, n, s, l) {
      return e === null || e.nativeEvent !== l ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: n,
        nativeEvent: l,
        targetContainers: [
          s
        ]
      }, t !== null && (t = zn(t), t !== null && g1(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
    }
    function Qh(e, t, a, n, s) {
      switch (t) {
        case "focusin":
          return en = ui(en, e, t, a, n, s), true;
        case "dragenter":
          return tn = ui(tn, e, t, a, n, s), true;
        case "mouseover":
          return an = ui(an, e, t, a, n, s), true;
        case "pointerover":
          var l = s.pointerId;
          return oi.set(l, ui(oi.get(l) || null, e, t, a, n, s)), true;
        case "gotpointercapture":
          return l = s.pointerId, ci.set(l, ui(ci.get(l) || null, e, t, a, n, s)), true;
      }
      return false;
    }
    function w1(e) {
      var t = Tn(e.target);
      if (t !== null) {
        var a = h(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = S(a), t !== null) {
              e.blockedOn = t, zc(e.priority, function() {
                y1(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = M(a), t !== null) {
              e.blockedOn = t, zc(e.priority, function() {
                y1(a);
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Nl(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Jo(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var n = new a.constructor(a.type, a);
          Jl = n, a.target.dispatchEvent(n), Jl = null;
        } else return t = zn(a), t !== null && g1(t), e.blockedOn = a, false;
        t.shift();
      }
      return true;
    }
    function k1(e, t, a) {
      Nl(e) && a.delete(t);
    }
    function Xh() {
      $o = false, en !== null && Nl(en) && (en = null), tn !== null && Nl(tn) && (tn = null), an !== null && Nl(an) && (an = null), oi.forEach(k1), ci.forEach(k1);
    }
    function Rl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, $o || ($o = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Xh)));
    }
    var Tl = null;
    function S1(e) {
      Tl !== e && (Tl = e, r.unstable_scheduleCallback(r.unstable_NormalPriority, function() {
        Tl === e && (Tl = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], n = e[t + 1], s = e[t + 2];
          if (typeof n != "function") {
            if (Fo(n || a) === null) continue;
            break;
          }
          var l = zn(a);
          l !== null && (e.splice(t, 3), t -= 3, Kr(l, {
            pending: true,
            data: s,
            method: a.method,
            action: n
          }, n, s));
        }
      }));
    }
    function hs(e) {
      function t(y) {
        return Rl(y, e);
      }
      en !== null && Rl(en, e), tn !== null && Rl(tn, e), an !== null && Rl(an, e), oi.forEach(t), ci.forEach(t);
      for (var a = 0; a < nn.length; a++) {
        var n = nn[a];
        n.blockedOn === e && (n.blockedOn = null);
      }
      for (; 0 < nn.length && (a = nn[0], a.blockedOn === null); ) w1(a), a.blockedOn === null && nn.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
        var s = a[n], l = a[n + 1], o = s[St] || null;
        if (typeof l == "function") o || S1(a);
        else if (o) {
          var d = null;
          if (l && l.hasAttribute("formAction")) {
            if (s = l, o = l[St] || null) d = o.formAction;
            else if (Fo(s) !== null) continue;
          } else d = o.action;
          typeof d == "function" ? a[n + 1] = d : (a.splice(n, 3), n -= 3), S1(a);
        }
      }
    }
    function C1() {
      function e(l) {
        l.canIntercept && l.info === "react-transition" && l.intercept({
          handler: function() {
            return new Promise(function(o) {
              return s = o;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function t() {
        s !== null && (s(), s = null), n || setTimeout(a, 20);
      }
      function a() {
        if (!n && !navigation.transition) {
          var l = navigation.currentEntry;
          l && l.url != null && navigation.navigate(l.url, {
            state: l.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var n = false, s = null;
        return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
          n = true, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
        };
      }
    }
    function Wo(e) {
      this._internalRoot = e;
    }
    zl.prototype.render = Wo.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var a = t.current, n = Ot();
      h1(a, n, e, t, null, null);
    }, zl.prototype.unmount = Wo.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        h1(e.current, 2, null, e, null, null), ml(), t[Rn] = null;
      }
    };
    function zl(e) {
      this._internalRoot = e;
    }
    zl.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Tc();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var a = 0; a < nn.length && t !== 0 && t < nn[a].priority; a++) ;
        nn.splice(a, 0, e), a === 0 && w1(e);
      }
    };
    var x1 = c.version;
    if (x1 !== "19.2.7") throw Error(u(527, x1, "19.2.7"));
    w.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
      return e = g(t), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var Vh = {
      bundleType: 0,
      version: "19.2.7",
      rendererPackageName: "react-dom",
      currentDispatcherRef: U,
      reconcilerVersion: "19.2.7"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var _l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!_l.isDisabled && _l.supportsFiber) try {
        bs = _l.inject(Vh), Nt = _l;
      } catch {
      }
    }
    return fi.createRoot = function(e, t) {
      if (!m(e)) throw Error(u(299));
      var a = false, n = "", s = Nd, l = Rd, o = Td;
      return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (l = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = f1(e, 1, false, null, null, a, n, null, s, l, o, C1), e[Rn] = t.current, zo(e), new Wo(t);
    }, fi.hydrateRoot = function(e, t, a) {
      if (!m(e)) throw Error(u(299));
      var n = false, s = "", l = Nd, o = Rd, d = Td, y = null;
      return a != null && (a.unstable_strictMode === true && (n = true), a.identifierPrefix !== void 0 && (s = a.identifierPrefix), a.onUncaughtError !== void 0 && (l = a.onUncaughtError), a.onCaughtError !== void 0 && (o = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (y = a.formState)), t = f1(e, 1, true, t, a ?? null, n, s, y, l, o, d, C1), t.context = m1(null), a = t.current, n = Ot(), n = Hl(n), s = Ga(n), s.callback = null, Ya(a, s, n), a = n, t.current.lanes = a, ks(t, a), la(t), e[Rn] = t.current, zo(e), new zl(t);
    }, fi.version = "19.2.7", fi;
  }
  var _1;
  function ap() {
    if (_1) return tc.exports;
    _1 = 1;
    function r() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (c) {
        console.error(c);
      }
    }
    return r(), tc.exports = tp(), tc.exports;
  }
  var np = ap();
  const sp = {
    Copper: [
      0,
      500
    ],
    Bronze: [
      501,
      799
    ],
    Silver: [
      800,
      999
    ],
    Gold: [
      1e3,
      1199
    ],
    Platinum: [
      1200,
      1399
    ],
    Diamond: [
      1400,
      1799
    ],
    Master: [
      1800,
      2199
    ],
    Grandmaster: [
      2200,
      null
    ]
  };
  function ip(r) {
    const [c, f] = sp[r];
    return f === null ? `${c}+ Elo` : `${c}\u2013${f} Elo`;
  }
  function En(r) {
    return r >= 2200 ? "Grandmaster" : r >= 1800 ? "Master" : r >= 1400 ? "Diamond" : r >= 1200 ? "Platinum" : r >= 1e3 ? "Gold" : r >= 800 ? "Silver" : r >= 501 ? "Bronze" : "Copper";
  }
  function fc(r) {
    const c = En(r), f = {
      Copper: [
        167,
        334
      ],
      Bronze: [
        601,
        701
      ],
      Silver: [
        867,
        934
      ],
      Gold: [
        1067,
        1134
      ],
      Platinum: [
        1267,
        1334
      ],
      Diamond: [
        1533,
        1666
      ],
      Master: [
        1933,
        2066
      ],
      Grandmaster: [
        2300,
        2400
      ]
    }, [u, m] = f[c];
    return r >= m ? 1 : r >= u ? 2 : 3;
  }
  function gi(r) {
    const c = En(r), f = fc(r);
    return `${c} ${f === 1 ? "I" : f === 2 ? "II" : "III"}`;
  }
  function lp(r, c) {
    return c > r && (En(r) !== En(c) || fc(r) !== fc(c));
  }
  function ra({ label: r, value: c, detail: f }) {
    return i.jsxs("div", {
      className: "metric",
      children: [
        i.jsx("span", {
          children: r
        }),
        i.jsx("strong", {
          children: c
        }),
        f && i.jsx("small", {
          children: f
        })
      ]
    });
  }
  function nm({ form: r }) {
    return i.jsx("span", {
      className: "form-pips",
      "aria-label": `Recent form ${r.join(", ")}`,
      children: r.map((c, f) => i.jsx("i", {
        className: `pip ${c}`,
        title: c.toUpperCase()
      }, `${c}-${f}`))
    });
  }
  const rp = (r) => r.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), sm = (...r) => r.filter((c, f, u) => !!c && c.trim() !== "" && u.indexOf(c) === f).join(" ").trim();
  var op = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const cp = E.forwardRef(({ color: r = "currentColor", size: c = 24, strokeWidth: f = 2, absoluteStrokeWidth: u, className: m = "", children: h, iconNode: S, ...M }, k) => E.createElement("svg", {
    ref: k,
    ...op,
    width: c,
    height: c,
    stroke: r,
    strokeWidth: u ? Number(f) * 24 / Number(c) : f,
    className: sm("lucide", m),
    ...M
  }, [
    ...S.map(([g, x]) => E.createElement(g, x)),
    ...Array.isArray(h) ? h : [
      h
    ]
  ]));
  const Me = (r, c) => {
    const f = E.forwardRef(({ className: u, ...m }, h) => E.createElement(cp, {
      ref: h,
      iconNode: c,
      className: sm(`lucide-${rp(r)}`, u),
      ...m
    }));
    return f.displayName = `${r}`, f;
  };
  const up = Me("ArrowLeft", [
    [
      "path",
      {
        d: "m12 19-7-7 7-7",
        key: "1l729n"
      }
    ],
    [
      "path",
      {
        d: "M19 12H5",
        key: "x3x0zl"
      }
    ]
  ]);
  const dp = Me("ArrowRight", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ],
    [
      "path",
      {
        d: "m12 5 7 7-7 7",
        key: "xquz4c"
      }
    ]
  ]);
  const im = Me("CalendarDays", [
    [
      "path",
      {
        d: "M8 2v4",
        key: "1cmpym"
      }
    ],
    [
      "path",
      {
        d: "M16 2v4",
        key: "4m81vk"
      }
    ],
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2",
        key: "1hopcy"
      }
    ],
    [
      "path",
      {
        d: "M3 10h18",
        key: "8toen8"
      }
    ],
    [
      "path",
      {
        d: "M8 14h.01",
        key: "6423bh"
      }
    ],
    [
      "path",
      {
        d: "M12 14h.01",
        key: "1etili"
      }
    ],
    [
      "path",
      {
        d: "M16 14h.01",
        key: "1gbofw"
      }
    ],
    [
      "path",
      {
        d: "M8 18h.01",
        key: "lrp35t"
      }
    ],
    [
      "path",
      {
        d: "M12 18h.01",
        key: "mhygvu"
      }
    ],
    [
      "path",
      {
        d: "M16 18h.01",
        key: "kzsmim"
      }
    ]
  ]);
  const fp = Me("ChartColumn", [
    [
      "path",
      {
        d: "M3 3v16a2 2 0 0 0 2 2h16",
        key: "c24i48"
      }
    ],
    [
      "path",
      {
        d: "M18 17V9",
        key: "2bz60n"
      }
    ],
    [
      "path",
      {
        d: "M13 17V5",
        key: "1frdt8"
      }
    ],
    [
      "path",
      {
        d: "M8 17v-3",
        key: "17ska0"
      }
    ]
  ]);
  const yi = Me("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const mp = Me("CircleCheck", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "m9 12 2 2 4-4",
        key: "dzmm74"
      }
    ]
  ]);
  const hp = Me("CircleHelp", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
        key: "1u773s"
      }
    ],
    [
      "path",
      {
        d: "M12 17h.01",
        key: "p32p05"
      }
    ]
  ]);
  const lm = Me("CircleX", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "m15 9-6 6",
        key: "1uzhvr"
      }
    ],
    [
      "path",
      {
        d: "m9 9 6 6",
        key: "z0biqf"
      }
    ]
  ]);
  const rm = Me("Clock3", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "polyline",
      {
        points: "12 6 12 12 16.5 12",
        key: "1aq6pp"
      }
    ]
  ]);
  const pp = Me("Clock", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "polyline",
      {
        points: "12 6 12 12 16 14",
        key: "68esgv"
      }
    ]
  ]);
  const gp = Me("Copy", [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea"
      }
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf"
      }
    ]
  ]);
  const yp = Me("Crown", [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
        key: "1vdc57"
      }
    ],
    [
      "path",
      {
        d: "M5 21h14",
        key: "11awu3"
      }
    ]
  ]);
  const mc = Me("Gamepad2", [
    [
      "line",
      {
        x1: "6",
        x2: "10",
        y1: "11",
        y2: "11",
        key: "1gktln"
      }
    ],
    [
      "line",
      {
        x1: "8",
        x2: "8",
        y1: "9",
        y2: "13",
        key: "qnk9ow"
      }
    ],
    [
      "line",
      {
        x1: "15",
        x2: "15.01",
        y1: "12",
        y2: "12",
        key: "krot7o"
      }
    ],
    [
      "line",
      {
        x1: "18",
        x2: "18.01",
        y1: "10",
        y2: "10",
        key: "1lcuu1"
      }
    ],
    [
      "path",
      {
        d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
        key: "mfqc10"
      }
    ]
  ]);
  const vp = Me("History", [
    [
      "path",
      {
        d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
        key: "1357e3"
      }
    ],
    [
      "path",
      {
        d: "M3 3v5h5",
        key: "1xhq8a"
      }
    ],
    [
      "path",
      {
        d: "M12 7v5l4 2",
        key: "1fdv2h"
      }
    ]
  ]);
  const bp = Me("House", [
    [
      "path",
      {
        d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
        key: "5wwlr5"
      }
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt"
      }
    ]
  ]);
  const wp = Me("Info", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "M12 16v-4",
        key: "1dtifu"
      }
    ],
    [
      "path",
      {
        d: "M12 8h.01",
        key: "e9boi3"
      }
    ]
  ]);
  const om = Me("LoaderCircle", [
    [
      "path",
      {
        d: "M21 12a9 9 0 1 1-6.219-8.56",
        key: "13zald"
      }
    ]
  ]);
  const cm = Me("LogIn", [
    [
      "path",
      {
        d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
        key: "u53s6r"
      }
    ],
    [
      "polyline",
      {
        points: "10 17 15 12 10 7",
        key: "1ail0h"
      }
    ],
    [
      "line",
      {
        x1: "15",
        x2: "3",
        y1: "12",
        y2: "12",
        key: "v6grx8"
      }
    ]
  ]);
  const kp = Me("LogOut", [
    [
      "path",
      {
        d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
        key: "1uf3rs"
      }
    ],
    [
      "polyline",
      {
        points: "16 17 21 12 16 7",
        key: "1gabdz"
      }
    ],
    [
      "line",
      {
        x1: "21",
        x2: "9",
        y1: "12",
        y2: "12",
        key: "1uyos4"
      }
    ]
  ]);
  const um = Me("MessageCircle", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ]
  ]);
  const Sp = Me("MessageSquare", [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz"
      }
    ]
  ]);
  const dm = Me("Minus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ]
  ]);
  const Cp = Me("Plus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ],
    [
      "path",
      {
        d: "M12 5v14",
        key: "s699le"
      }
    ]
  ]);
  const D1 = Me("RefreshCw", [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc"
      }
    ],
    [
      "path",
      {
        d: "M21 3v5h-5",
        key: "1q7to0"
      }
    ],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3"
      }
    ],
    [
      "path",
      {
        d: "M8 16H3v5",
        key: "1cv678"
      }
    ]
  ]);
  const Ul = Me("Search", [
    [
      "circle",
      {
        cx: "11",
        cy: "11",
        r: "8",
        key: "4ej97u"
      }
    ],
    [
      "path",
      {
        d: "m21 21-4.3-4.3",
        key: "1qie3q"
      }
    ]
  ]);
  const Sc = Me("Send", [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    [
      "path",
      {
        d: "m21.854 2.147-10.94 10.939",
        key: "12cjpa"
      }
    ]
  ]);
  const hc = Me("Settings", [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "3",
        key: "1v7zrd"
      }
    ]
  ]);
  const fm = Me("Shield", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ]);
  const xp = Me("Shuffle", [
    [
      "path",
      {
        d: "m18 14 4 4-4 4",
        key: "10pe0f"
      }
    ],
    [
      "path",
      {
        d: "m18 2 4 4-4 4",
        key: "pucp1d"
      }
    ],
    [
      "path",
      {
        d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",
        key: "1ailkh"
      }
    ],
    [
      "path",
      {
        d: "M2 6h1.972a4 4 0 0 1 3.6 2.2",
        key: "km57vx"
      }
    ],
    [
      "path",
      {
        d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
        key: "os18l9"
      }
    ]
  ]);
  const Mp = Me("Sparkles", [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx"
      }
    ],
    [
      "path",
      {
        d: "M20 3v4",
        key: "1olli1"
      }
    ],
    [
      "path",
      {
        d: "M22 5h-4",
        key: "1gvqau"
      }
    ],
    [
      "path",
      {
        d: "M4 17v2",
        key: "vumght"
      }
    ],
    [
      "path",
      {
        d: "M5 18H3",
        key: "zchphs"
      }
    ]
  ]);
  const mm = Me("Star", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ]);
  const vi = Me("Swords", [
    [
      "polyline",
      {
        points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5",
        key: "1hfsw2"
      }
    ],
    [
      "line",
      {
        x1: "13",
        x2: "19",
        y1: "19",
        y2: "13",
        key: "1vrmhu"
      }
    ],
    [
      "line",
      {
        x1: "16",
        x2: "20",
        y1: "16",
        y2: "20",
        key: "1bron3"
      }
    ],
    [
      "line",
      {
        x1: "19",
        x2: "21",
        y1: "21",
        y2: "19",
        key: "13pww6"
      }
    ],
    [
      "polyline",
      {
        points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5",
        key: "hbey2j"
      }
    ],
    [
      "line",
      {
        x1: "5",
        x2: "9",
        y1: "14",
        y2: "18",
        key: "1hf58s"
      }
    ],
    [
      "line",
      {
        x1: "7",
        x2: "4",
        y1: "17",
        y2: "20",
        key: "pidxm4"
      }
    ],
    [
      "line",
      {
        x1: "3",
        x2: "5",
        y1: "19",
        y2: "21",
        key: "1pehsh"
      }
    ]
  ]);
  const Ap = Me("TriangleAlert", [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    [
      "path",
      {
        d: "M12 9v4",
        key: "juzpu7"
      }
    ],
    [
      "path",
      {
        d: "M12 17h.01",
        key: "p32p05"
      }
    ]
  ]);
  const jp = Me("Trophy", [
    [
      "path",
      {
        d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
        key: "17hqa7"
      }
    ],
    [
      "path",
      {
        d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
        key: "lmptdp"
      }
    ],
    [
      "path",
      {
        d: "M4 22h16",
        key: "57wxv0"
      }
    ],
    [
      "path",
      {
        d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
        key: "1nw9bq"
      }
    ],
    [
      "path",
      {
        d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
        key: "1np0yb"
      }
    ],
    [
      "path",
      {
        d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
        key: "u46fv3"
      }
    ]
  ]);
  const ic = Me("UserMinus", [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "16",
        y1: "11",
        y2: "11",
        key: "1shjgl"
      }
    ]
  ]);
  const Ip = Me("UserPlus", [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
      }
    ],
    [
      "line",
      {
        x1: "19",
        x2: "19",
        y1: "8",
        y2: "14",
        key: "1bvyxn"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "16",
        y1: "11",
        y2: "11",
        key: "1shjgl"
      }
    ]
  ]);
  const Ep = Me("User", [
    [
      "path",
      {
        d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
        key: "975kel"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "7",
        r: "4",
        key: "17ys0d"
      }
    ]
  ]);
  const vs = Me("Users", [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
      }
    ],
    [
      "path",
      {
        d: "M22 21v-2a4 4 0 0 0-3-3.87",
        key: "kshegd"
      }
    ],
    [
      "path",
      {
        d: "M16 3.13a4 4 0 0 1 0 7.75",
        key: "1da9ce"
      }
    ]
  ]);
  const Nn = Me("X", [
    [
      "path",
      {
        d: "M18 6 6 18",
        key: "1bl5f8"
      }
    ],
    [
      "path",
      {
        d: "m6 6 12 12",
        key: "d8bk6v"
      }
    ]
  ]);
  function Np({ maps: r, limit: c, selectedMapIds: f, onToggle: u, favoriteMapId: m, onFavorite: h, disabled: S = false }) {
    const M = c === void 0 ? r : r.slice(0, c), k = f !== void 0 && u !== void 0;
    return i.jsx("div", {
      className: "map-pool",
      children: M.map((g) => {
        const x = !k || f.includes(g.id), z = i.jsxs(i.Fragment, {
          children: [
            i.jsx("img", {
              src: g.thumbnailUrl,
              alt: ""
            }),
            i.jsx("span", {
              className: "map-name",
              children: g.name
            })
          ]
        });
        return k ? i.jsxs("div", {
          className: "map-thumbnail-wrap",
          children: [
            i.jsx("button", {
              className: x ? "map-thumbnail selected" : "map-thumbnail",
              type: "button",
              "aria-pressed": x,
              "aria-label": `${x ? "Exclude" : "Include"} ${g.name}`,
              disabled: S,
              onClick: () => u(g.id),
              children: z
            }),
            h && i.jsx("button", {
              className: m === g.id ? "map-favorite active" : "map-favorite",
              type: "button",
              disabled: S,
              "aria-pressed": m === g.id,
              "aria-label": `${m === g.id ? "Remove" : "Favorite"} ${g.name}`,
              title: m === g.id ? "Remove favorite" : "Set as favorite",
              onClick: () => h(g.id),
              children: i.jsx(mm, {
                size: 16,
                fill: m === g.id ? "currentColor" : "none"
              })
            })
          ]
        }, g.id) : i.jsx("figure", {
          className: "map-thumbnail selected",
          children: z
        }, g.id);
      })
    });
  }
  const Rp = 5, Tp = [
    {
      id: "land-open",
      name: "Land Open",
      description: "Fast starts, exposed resources, and room to raid.",
      primaryMapId: "arabia"
    },
    {
      id: "land-closed",
      name: "Land Closed",
      description: "Defensible starts with time to build and boom.",
      primaryMapId: "arena"
    },
    {
      id: "water",
      name: "Water",
      description: "Dock play, contested shorelines, and mixed armies.",
      primaryMapId: "four-lakes"
    }
  ], zp = [
    {
      id: "arabia",
      name: "KotD6 Arabia EL",
      description: "A competitive Arabia variant with strategic elevations, sparse vegetation, and carefully controlled starting woodlines.",
      gameMapName: "KotD6 Arabia EL",
      lobbyPickerResultIndex: 0,
      isCustomMap: true,
      style: "open",
      groupId: "land-open",
      imageAsset: "arabia.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Arabia"
    },
    {
      id: "land-madness",
      name: "Land Madness",
      description: "With resources scattered across the map and forests surrounded by unbuildable rugged terrain, walling is nearly impossible and military presence will be crucial.",
      gameMapName: "Land Madness",
      lobbyPickerResultIndex: 0,
      style: "open",
      groupId: "land-open",
      imageAsset: "land-madness.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Land_Madness"
    },
    {
      id: "acropolis",
      name: "Acropolis",
      description: "Battle on the barren slopes of your base as you defend your hill and conquer the enemy's.",
      gameMapName: "Acropolis",
      lobbyPickerResultIndex: 0,
      enabled: false,
      style: "open",
      groupId: "land-open",
      imageAsset: "acropolis.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Acropolis"
    },
    {
      id: "african-clearing",
      name: "African Clearing",
      description: "Lone villagers have wandered into a forest clearing and must now battle for control of its sparse resources.",
      gameMapName: "African Clearing",
      lobbyPickerResultIndex: 0,
      style: "nomad",
      groupId: "land-open",
      imageAsset: "african-clearing.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/African_Clearing"
    },
    {
      id: "atacama",
      name: "Atacama",
      description: "This barren desert is unlikely to quench anyone's thirst, but its aridity gives way to lush trees the deeper one goes.",
      gameMapName: "Atacama",
      lobbyPickerResultIndex: 0,
      style: "open",
      groupId: "land-open",
      imageAsset: "atacama.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Atacama"
    },
    {
      id: "gold-rush",
      name: "Gold Rush",
      description: "A whole heap of gold and a few wolves lie in the middle of a desert.",
      gameMapName: "Gold Rush",
      lobbyPickerResultIndex: 0,
      enabled: false,
      style: "open",
      groupId: "land-open",
      imageAsset: "gold-rush.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Gold_Rush"
    },
    {
      id: "land-nomad",
      name: "Land Nomad EL",
      description: "Lone villagers settle across open land with no water in sight. Smaller, more numerous woodlines leave additional room to expand and fight.",
      gameMapName: "Land Nomad EL",
      lobbyPickerResultIndex: 0,
      isCustomMap: true,
      style: "nomad",
      groupId: "land-open",
      imageAsset: "land-nomad.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Land_Nomad"
    },
    {
      id: "arena",
      name: "Arena",
      description: "The walls around your forest clearing are your only protection from the carnage in the middle.",
      gameMapName: "Arena",
      lobbyPickerResultIndex: 1,
      style: "closed",
      groupId: "land-closed",
      imageAsset: "arena.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Arena_(map)"
    },
    {
      id: "fortified-clearing",
      name: "Fortified Clearing",
      description: "Your forward defenses are strong, but your rear is vulnerable to raids. Secure the center for a quick counterattack or outmaneuver enemies with a flank.",
      gameMapName: "Fortified Clearing",
      lobbyPickerResultIndex: 0,
      style: "closed",
      groupId: "land-closed",
      imageAsset: "fortified-clearing.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Fortified_Clearing"
    },
    {
      id: "hideout",
      name: "Hideout",
      description: "A palisade wall provides only false comfort over the palpable feeling of an enemy lurking just around the corner.",
      gameMapName: "Hideout",
      lobbyPickerResultIndex: 0,
      style: "closed",
      groupId: "land-closed",
      imageAsset: "hideout.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Hideout"
    },
    {
      id: "black-forest",
      name: "Black Forest",
      description: "Islands of grass in a sea of trees. Follow the paths through the forest to find your allies and enemies.",
      gameMapName: "Black Forest",
      lobbyPickerResultIndex: 0,
      style: "closed",
      groupId: "land-closed",
      imageAsset: "black-forest.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Black_Forest"
    },
    {
      id: "michi",
      name: "Michi",
      description: "An impenetrable forest separates the teams until one breaks through and draws first blood on this infamous battlefield.",
      gameMapName: "Michi",
      lobbyPickerResultIndex: 0,
      style: "closed",
      groupId: "land-closed",
      imageAsset: "michi.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Michi"
    },
    {
      id: "four-lakes",
      name: "Four Lakes",
      description: "Four serene corner lakes create a race for control of the much-coveted waters and their abundant fish.",
      gameMapName: "Four Lakes",
      lobbyPickerResultIndex: 0,
      style: "hybrid",
      groupId: "water",
      imageAsset: "four-lakes.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Four_Lakes"
    },
    {
      id: "baltic",
      name: "Baltic",
      description: "An ocean with peninsulas and sheltered bays.",
      gameMapName: "Baltic",
      lobbyPickerResultIndex: 0,
      style: "water",
      groupId: "water",
      imageAsset: "baltic.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Baltic"
    },
    {
      id: "islands",
      name: "Islands",
      description: "Each player starts alone on an island. Uninhabited islands may be rich with resources, so be prepared to rule the sea.",
      gameMapName: "Islands",
      lobbyPickerResultIndex: 0,
      style: "water",
      groupId: "water",
      imageAsset: "islands.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Islands"
    },
    {
      id: "mediterranean",
      name: "Mediterranean",
      description: "An inland sea surrounded by land; it sounds deceptively peaceful.",
      gameMapName: "Mediterranean",
      lobbyPickerResultIndex: 0,
      style: "water",
      groupId: "water",
      imageAsset: "mediterranean.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Mediterranean"
    },
    {
      id: "golden-swamp",
      name: "Golden Swamp",
      description: "A tropical central marsh surrounds a small island brimming with gold, making the contested swampland too enticing to pass up.",
      gameMapName: "Golden Swamp",
      lobbyPickerResultIndex: 0,
      style: "hybrid",
      groupId: "water",
      imageAsset: "golden-swamp.png",
      wikiUrl: "https://ageofempires.fandom.com/wiki/Golden_Swamp"
    }
  ], _p = {
    version: Rp,
    groups: Tp,
    maps: zp
  }, Et = _p, Dp = new Map(Et.maps.map((r) => [
    r.id,
    r
  ])), Cc = Et.maps.filter((r) => r.enabled !== false);
  function hm(r) {
    return Dp.get(r);
  }
  function Lp(r, c, f = Math.random) {
    var _a2, _b;
    const u = new Set(c.mapPool.map((g) => g.id)), m = r.mapPool.filter((g) => u.has(g.id));
    if (m.length === 0) return;
    const h = new Set(Object.values(((_a2 = r.mapPreferences) == null ? void 0 : _a2.favoriteMapIds) ?? {})), S = new Set(Object.values(((_b = c.mapPreferences) == null ? void 0 : _b.favoriteMapIds) ?? {})), M = m.filter((g) => h.has(g.id) && S.has(g.id));
    if (M.length > 0) return M[Math.floor(f() * M.length)];
    const k = m.flatMap((g) => Array.from({
      length: 1 + Number(h.has(g.id)) + Number(S.has(g.id))
    }, () => g));
    return k[Math.floor(f() * k.length)];
  }
  const Up = "" + new URL("acropolis-wApZU8dN.png", import.meta.url).href, Op = "" + new URL("african-clearing--8pL0rBU.png", import.meta.url).href, Bp = "" + new URL("arabia-DEdeLqx5.png", import.meta.url).href, qp = "" + new URL("arena-CISRjdFq.png", import.meta.url).href, Hp = "" + new URL("atacama-CxHEccMV.png", import.meta.url).href, Gp = "" + new URL("baltic-DlU6ncMk.png", import.meta.url).href, Yp = "" + new URL("black-forest-CTgJoH8n.png", import.meta.url).href, Qp = "" + new URL("fortified-clearing-DSf9SH4j.png", import.meta.url).href, Xp = "" + new URL("four-lakes-DxiZ0myb.png", import.meta.url).href, Vp = "" + new URL("golden-swamp-DXKIJwHr.png", import.meta.url).href, Zp = "" + new URL("gold-rush-BqrgFIGq.png", import.meta.url).href, Kp = "" + new URL("hideout-hd8sM5kE.png", import.meta.url).href, Jp = "" + new URL("islands-DmKyUyda.png", import.meta.url).href, Fp = "" + new URL("land-madness-3-nLWb05.png", import.meta.url).href, $p = "" + new URL("land-nomad-DxHp81Hp.png", import.meta.url).href, Wp = "" + new URL("mediterranean-CKpZDwRi.png", import.meta.url).href, Pp = "" + new URL("michi-Cry_Jx1o.png", import.meta.url).href, eg = JSON.parse(`[{"profileId":197964,"steamId":"76561198179087382","name":"_LY_Yo","rating":2903,"rank":1,"wins":2972,"losses":1666,"streak":3,"countryCode":"CN"},{"profileId":9423131,"steamId":"76561198259300707","name":"wR.Lucho","rating":2893,"rank":2,"wins":4312,"losses":3062,"streak":2,"countryCode":"AR"},{"profileId":271202,"steamId":"76561198000635167","name":"Oni.Vinchester","rating":2881,"rank":3,"wins":1823,"losses":721,"streak":5,"countryCode":"RU"},{"profileId":199325,"steamId":"76561198449406083","name":"VIT | Hera","rating":2868,"rank":4,"wins":5148,"losses":1725,"streak":7,"countryCode":"CA"},{"profileId":212721,"steamId":"76561198116921964","name":"TAG_Sitaux","rating":2849,"rank":5,"wins":2038,"losses":735,"streak":12,"countryCode":"FR"},{"profileId":251265,"steamId":"76561197996386232","name":"TAG_MbL_","rating":2836,"rank":6,"wins":7016,"losses":3189,"streak":4,"countryCode":"NO"},{"profileId":506898,"steamId":"76561198362219694","name":"VIT Liereyy","rating":2834,"rank":7,"wins":1188,"losses":561,"streak":-2,"countryCode":"AT"},{"profileId":1136191,"steamId":"76561198070829134","name":"DS_Ciskhan","rating":2825,"rank":8,"wins":2589,"losses":1874,"streak":4,"countryCode":"FR"},{"profileId":2783660,"steamId":"76561199062883266","name":"wR.Sebastian","rating":2806,"rank":9,"wins":2444,"losses":1591,"streak":1,"countryCode":"UY"},{"profileId":208393,"steamId":"76561198027378107","name":"wR.Nicov","rating":2801,"rank":10,"wins":2305,"losses":998,"streak":5,"countryCode":"IT"},{"profileId":256338,"steamId":"76561198007187809","name":"NOC | Running","rating":2800,"rank":11,"wins":2472,"losses":1735,"streak":5,"countryCode":"DE"},{"profileId":209118,"steamId":"76561198379366846","name":"TAG_Sora Kuma","rating":2775,"rank":12,"wins":1392,"losses":1323,"streak":3,"countryCode":"TW"},{"profileId":217905,"steamId":"76561198116269715","name":"OS+ | chart","rating":2773,"rank":13,"wins":1747,"losses":1411,"streak":3,"countryCode":"JP"},{"profileId":666976,"steamId":"76561198275359848","name":"_Barles_","rating":2766,"rank":14,"wins":2771,"losses":1554,"streak":1,"countryCode":"PL"},{"profileId":2858362,"steamId":"76561198400058723","name":"Oni.JorDan_AoE","rating":2761,"rank":15,"wins":1618,"losses":1032,"streak":7,"countryCode":"DE"},{"profileId":196240,"steamId":"76561197984749679","name":"Oni.TheViper","rating":2761,"rank":16,"wins":1751,"losses":959,"streak":7,"countryCode":"DE"},{"profileId":182749,"steamId":"76561198131139989","name":"DS_Dragonstar","rating":2753,"rank":17,"wins":2227,"losses":1403,"streak":11,"countryCode":"IN"},{"profileId":10710012,"steamId":"76561199369341460","name":"_LY_\u6296\u97F3\u80A5\u9F99","rating":2746,"rank":18,"wins":1021,"losses":565,"streak":7,"countryCode":"HK"},{"profileId":4632681,"steamId":"76561198439558568","name":"DS_Overtaken","rating":2746,"rank":19,"wins":3524,"losses":2825,"streak":1,"countryCode":"EE"},{"profileId":197388,"steamId":"76561198088251629","name":"Oni.TaToH","rating":2746,"rank":20,"wins":954,"losses":343,"streak":26,"countryCode":"ES"},{"profileId":8793414,"steamId":"76561198136932885","name":"Oni.Lewis","rating":2734,"rank":21,"wins":4801,"losses":3627,"streak":-2,"countryCode":"GB"},{"profileId":582058,"steamId":"76561198032611326","name":"VIT | Hearttt","rating":2706,"rank":22,"wins":3517,"losses":1776,"streak":6,"countryCode":"PE"},{"profileId":459658,"steamId":"76561199003184910","name":"HOANG","rating":2705,"rank":23,"wins":7909,"losses":5550,"streak":1,"countryCode":"VN"},{"profileId":339835,"steamId":"76561198088783612","name":"DS_StonePleaseAoE","rating":2702,"rank":24,"wins":4416,"losses":3603,"streak":1,"countryCode":"DE"},{"profileId":208611,"steamId":"76561198325239137","name":"Villese","rating":2696,"rank":25,"wins":2493,"losses":1299,"streak":1,"countryCode":"FI"},{"profileId":2463959,"steamId":"76561199009965243","name":"RoR | Benanji","rating":2675,"rank":26,"wins":1368,"losses":984,"streak":3,"countryCode":"DE"},{"profileId":279036,"steamId":"76561198314917416","name":"m0re","rating":2670,"rank":27,"wins":2786,"losses":2436,"streak":3,"countryCode":"ES"},{"profileId":2660491,"steamId":"76561199054206296","name":"Th\xE0nh C\u1ED5 Qu\u1EA3ng Tr\u1ECB","rating":2666,"rank":28,"wins":2999,"losses":2918,"streak":-1,"countryCode":"VN"},{"profileId":1224481,"steamId":"76561198368620113","name":"KASVA","rating":2660,"rank":29,"wins":5320,"losses":4328,"streak":2,"countryCode":"TR"},{"profileId":2589331,"steamId":"76561199042505350","name":"SalzZ_AntagonisT","rating":2659,"rank":30,"wins":1445,"losses":924,"streak":4,"countryCode":"RU"},{"profileId":6097615,"steamId":"76561199188199256","name":"Oni.doguinho","rating":2656,"rank":31,"wins":357,"losses":144,"streak":3,"countryCode":"BR"},{"profileId":3176045,"steamId":"76561199054087176","name":"wR.Prisma","rating":2647,"rank":32,"wins":3702,"losses":3119,"streak":-2,"countryCode":"AR"},{"profileId":628503,"steamId":"76561198036586732","name":"Valas","rating":2642,"rank":33,"wins":1715,"losses":1193,"streak":4,"countryCode":"FI"},{"profileId":2972505,"steamId":"76561199003998451","name":"CNZS_\u65CB\u5F8B","rating":2639,"rank":34,"wins":1881,"losses":1605,"streak":6,"countryCode":"CN"},{"profileId":5984120,"steamId":"76561199184757878","name":"Ux\xB4Combito","rating":2637,"rank":35,"wins":2064,"losses":1670,"streak":10,"countryCode":"MX"},{"profileId":1531083,"steamId":"76561198056609593","name":"Oni.FreakinAndy","rating":2631,"rank":36,"wins":2864,"losses":1749,"streak":1,"countryCode":"AT"},{"profileId":226575,"steamId":"76561198313422112","name":"_LY_lyx","rating":2630,"rank":37,"wins":1775,"losses":1462,"streak":2,"countryCode":"CN"},{"profileId":198035,"steamId":"76561198044559189","name":"Oni.DauT","rating":2627,"rank":38,"wins":2093,"losses":1428,"streak":3,"countryCode":"GB"},{"profileId":2776293,"steamId":"76561199063069362","name":"Oni.Kingstone","rating":2622,"rank":39,"wins":2452,"losses":1922,"streak":1,"countryCode":"MX"},{"profileId":2920057,"steamId":"76561199069760887","name":"Ux'LobodeLaNieve","rating":2620,"rank":40,"wins":1030,"losses":714,"streak":5,"countryCode":"MX"},{"profileId":1754629,"steamId":"76561198807828662","name":"SalzZ_classicpro","rating":2618,"rank":41,"wins":1966,"losses":1128,"streak":3,"countryCode":"UA"},{"profileId":16847348,"steamId":"76561199176825525","name":"ANKR.Blve","rating":2615,"rank":42,"wins":873,"losses":786,"streak":1,"countryCode":"TW"},{"profileId":3317764,"steamId":"76561199084646199","name":"Ux'LobodeLaNieve","rating":2610,"rank":43,"wins":1020,"losses":744,"streak":3,"countryCode":"MX"},{"profileId":290617,"steamId":"76561198273707230","name":"HR Sobek","rating":2610,"rank":44,"wins":1563,"losses":1091,"streak":1,"countryCode":"CL"},{"profileId":14152531,"steamId":"76561199482561812","name":"CNZS_\u6076\u9B54\u55A7\u54D7","rating":2601,"rank":45,"wins":258,"losses":100,"streak":26,"countryCode":"CN"},{"profileId":10748832,"steamId":"76561199375097640","name":"CNZS_CC","rating":2593,"rank":46,"wins":198,"losses":67,"streak":3,"countryCode":"CN"},{"profileId":5632575,"steamId":"76561199164683206","name":"RoR | Vodka_L_2","rating":2593,"rank":47,"wins":341,"losses":171,"streak":-2,"countryCode":"IT"},{"profileId":446371,"steamId":"76561198394482759","name":"CNZS_CC","rating":2579,"rank":48,"wins":449,"losses":259,"streak":-3,"countryCode":"CN"},{"profileId":573282,"steamId":"76561198411901312","name":"NOC | Terz","rating":2578,"rank":49,"wins":1654,"losses":1429,"streak":1,"countryCode":"DE"},{"profileId":265517,"steamId":"76561198198305605","name":"CNZS_Daniel","rating":2572,"rank":50,"wins":2201,"losses":2118,"streak":2,"countryCode":"US"},{"profileId":19124429,"steamId":"76561199652718380","name":"FC enjoyer","rating":2569,"rank":51,"wins":848,"losses":710,"streak":2,"countryCode":"TW"},{"profileId":599689,"steamId":"76561198186899749","name":"RoR | Vodka_L_","rating":2565,"rank":52,"wins":1319,"losses":988,"streak":7,"countryCode":"IT"},{"profileId":576919,"steamId":"76561198082024695","name":"Babaorum","rating":2564,"rank":53,"wins":3576,"losses":2484,"streak":-2,"countryCode":"FR"},{"profileId":3144451,"steamId":"76561199076741301","name":"MING","rating":2564,"rank":54,"wins":974,"losses":732,"streak":-5,"countryCode":"CN"},{"profileId":245811,"steamId":"76561198027802048","name":"NOC | Target331","rating":2561,"rank":55,"wins":1163,"losses":772,"streak":4,"countryCode":"DE"},{"profileId":862991,"steamId":"76561197982917945","name":"OS+ | Emil :D","rating":2559,"rank":56,"wins":5041,"losses":4426,"streak":2,"countryCode":"DK"},{"profileId":19867271,"steamId":"76561199258371252","name":"OS+ | NeoZz","rating":2554,"rank":57,"wins":470,"losses":314,"streak":5,"countryCode":"FR"},{"profileId":21914183,"steamId":"76561199819400366","name":"\u6B7B\u4EA1","rating":2547,"rank":58,"wins":879,"losses":524,"streak":-2,"countryCode":"JP"},{"profileId":635884,"steamId":"76561198975568246","name":"Andre_2i","rating":2537,"rank":59,"wins":8764,"losses":7533,"streak":1,"countryCode":"RO"},{"profileId":2912198,"steamId":"76561198010312765","name":"Dennis\u54E5","rating":2536,"rank":60,"wins":3793,"losses":3421,"streak":1,"countryCode":"HK"},{"profileId":14725904,"steamId":"76561199495184931","name":"OS+ | Sziky","rating":2534,"rank":61,"wins":4706,"losses":4579,"streak":1,"countryCode":"HU"},{"profileId":2135484,"steamId":"76561199035860327","name":"bruh","rating":2526,"rank":62,"wins":2638,"losses":2181,"streak":-2,"countryCode":"BR"},{"profileId":572017,"steamId":"76561198426853065","name":"TheMax","rating":2525,"rank":63,"wins":773,"losses":382,"streak":-2,"countryCode":"FI"},{"profileId":25365699,"steamId":"76561198708662834","name":"CNZS_98T","rating":2525,"rank":64,"wins":616,"losses":269,"streak":-2,"countryCode":"NL"},{"profileId":9449579,"steamId":"76561199239517074","name":"VEN\xD3N | Miauricio","rating":2522,"rank":65,"wins":973,"losses":782,"streak":1,"countryCode":"MX"},{"profileId":11440407,"steamId":"76561199412696051","name":"\u03DF OLI \u03DF Rodrixs","rating":2521,"rank":66,"wins":1550,"losses":1461,"streak":8,"countryCode":"AR"},{"profileId":1893397,"steamId":"76561198263360370","name":"Oni.GoKu","rating":2515,"rank":67,"wins":772,"losses":685,"streak":3,"countryCode":"BR"},{"profileId":2859256,"steamId":"76561198964341449","name":"RoR | Thofou05","rating":2514,"rank":68,"wins":848,"losses":629,"streak":-5,"countryCode":"BE"},{"profileId":3884287,"steamId":"76561199101842491","name":"DaddySt4rk","rating":2508,"rank":69,"wins":1971,"losses":1392,"streak":2,"countryCode":"BR"},{"profileId":197930,"steamId":"76561198088178833","name":"T90Official","rating":2508,"rank":70,"wins":2899,"losses":2320,"streak":7,"countryCode":"US"},{"profileId":20557174,"steamId":"76561199757960970","name":"KSV","rating":2505,"rank":71,"wins":129,"losses":38,"streak":-1,"countryCode":"TR"},{"profileId":10266593,"steamId":"76561198025515869","name":"RedPhosphoru","rating":2502,"rank":72,"wins":3855,"losses":3310,"streak":3,"countryCode":"US"},{"profileId":409748,"steamId":"76561198099659716","name":"wR.Capoch","rating":2501,"rank":73,"wins":1738,"losses":1194,"streak":1,"countryCode":"AR"},{"profileId":5188554,"steamId":"76561198244808072","name":"Lamo","rating":2497,"rank":74,"wins":1878,"losses":1613,"streak":8,"countryCode":"LV"},{"profileId":1966276,"steamId":"76561198376755697","name":"CNZS_MING","rating":2497,"rank":75,"wins":1629,"losses":1295,"streak":-2,"countryCode":"CN"},{"profileId":21627109,"steamId":"76561199812084808","name":"Ux'Uzzi","rating":2495,"rank":76,"wins":719,"losses":663,"streak":1,"countryCode":"MX"},{"profileId":726223,"steamId":"76561198258097856","name":"TAG_Z40","rating":2494,"rank":77,"wins":3428,"losses":2740,"streak":-2,"countryCode":"TW"},{"profileId":2444511,"steamId":"76561199050196526","name":"Gabi","rating":2491,"rank":78,"wins":3484,"losses":2813,"streak":-2,"countryCode":"BR"},{"profileId":2309468,"steamId":"76561198873127128","name":"AiM | Whocl","rating":2490,"rank":79,"wins":2636,"losses":2263,"streak":3,"countryCode":"CL"},{"profileId":211351,"steamId":"76561198262978341","name":"CNZS_Bad Koala","rating":2487,"rank":80,"wins":1755,"losses":1462,"streak":-2,"countryCode":"CN"},{"profileId":11364437,"steamId":"76561199403774380","name":"ANKR.Youpudding","rating":2481,"rank":81,"wins":1205,"losses":819,"streak":6,"countryCode":"TW"},{"profileId":614315,"steamId":"76561198135964589","name":"OS+ | slam","rating":2478,"rank":82,"wins":2587,"losses":1719,"streak":4,"countryCode":"CA"},{"profileId":3216208,"steamId":"76561199080676922","name":"LE | Dimo","rating":2475,"rank":83,"wins":1734,"losses":1507,"streak":2,"countryCode":"PE"},{"profileId":25183359,"steamId":"76561198718915900","name":"ThunderboltX","rating":2472,"rank":84,"wins":495,"losses":417,"streak":-2,"countryCode":"BG"},{"profileId":6779041,"steamId":"76561199211210970","name":"wR.Monoz","rating":2471,"rank":85,"wins":2480,"losses":2059,"streak":3,"countryCode":"AR"},{"profileId":1945281,"steamId":"76561198279338473","name":"Smokey","rating":2470,"rank":86,"wins":616,"losses":410,"streak":1,"countryCode":"US"},{"profileId":10309103,"steamId":"76561198334062971","name":"\u03DF OLI \u03DF STAND-BY","rating":2469,"rank":87,"wins":2299,"losses":2134,"streak":3,"countryCode":"AR"},{"profileId":15345163,"steamId":"76561199514067065","name":"OS+ | TeMo","rating":2467,"rank":88,"wins":445,"losses":311,"streak":-1,"countryCode":"MA"},{"profileId":401359,"steamId":"76561198434294840","name":"VEN\xD3N | EnvyZ","rating":2466,"rank":89,"wins":1228,"losses":1003,"streak":9,"countryCode":"MX"},{"profileId":15097184,"steamId":"76561199478419618","name":"CNZS_Donghaidi","rating":2466,"rank":90,"wins":647,"losses":493,"streak":-2,"countryCode":"CN"},{"profileId":247224,"steamId":"76561198171294807","name":"Survivalist","rating":2465,"rank":91,"wins":8304,"losses":7295,"streak":2,"countryCode":"CA"},{"profileId":3747802,"steamId":"76561198364623849","name":"SalzZ_wide","rating":2465,"rank":92,"wins":3581,"losses":3183,"streak":6,"countryCode":"RU"},{"profileId":3970269,"steamId":"76561199104652007","name":"Emu Warrior","rating":2463,"rank":93,"wins":1062,"losses":973,"streak":1,"countryCode":"US"},{"profileId":3022245,"steamId":"76561198026485316","name":"Courtesy","rating":2463,"rank":94,"wins":4898,"losses":3443,"streak":4,"countryCode":"AR"},{"profileId":2621722,"steamId":"76561198046946243","name":"DS_Twigg","rating":2462,"rank":95,"wins":1620,"losses":1343,"streak":-1,"countryCode":"AR"},{"profileId":196310,"steamId":"76561198275970890","name":"F1Re","rating":2462,"rank":96,"wins":6059,"losses":3372,"streak":3,"countryCode":"BR"},{"profileId":23053479,"steamId":"76561199865687166","name":"Biry","rating":2460,"rank":97,"wins":353,"losses":239,"streak":1,"countryCode":"AR"},{"profileId":22249146,"steamId":"76561199830839139","name":"[\u8D85\u96F7\u5927\u9ED1\u5E97]Jian Hei","rating":2460,"rank":98,"wins":321,"losses":233,"streak":-1,"countryCode":"TW"},{"profileId":2090225,"steamId":"76561198242526658","name":"Oni.miguel","rating":2453,"rank":99,"wins":1705,"losses":1283,"streak":2,"countryCode":"BR"},{"profileId":15214143,"steamId":"76561199509475227","name":"Rayz","rating":2452,"rank":100,"wins":913,"losses":726,"streak":4,"countryCode":"TW"},{"profileId":12952693,"steamId":"76561199475006461","name":"DS_Biry","rating":2449,"rank":101,"wins":504,"losses":368,"streak":1,"countryCode":"AR"},{"profileId":2161095,"steamId":"76561198348821738","name":"develement","rating":2449,"rank":102,"wins":343,"losses":184,"streak":2,"countryCode":"US"},{"profileId":16815454,"steamId":"76561199546948938","name":"\u554A\u8FD9\u4E2A\u52C7\u8005\u4E09\u53F6\u5C31\u662F\u7231\u505A\u5E7B\u60F3\u7684\u68A6","rating":2449,"rank":103,"wins":1292,"losses":1135,"streak":5,"countryCode":"CN"},{"profileId":2594552,"steamId":"76561199055602916","name":"Dooidy","rating":2448,"rank":104,"wins":1645,"losses":1450,"streak":7,"countryCode":"CN"},{"profileId":2844691,"steamId":"76561199066277433","name":"wR.Mochi","rating":2447,"rank":105,"wins":3195,"losses":2866,"streak":-1,"countryCode":"AR"},{"profileId":243287,"steamId":"76561198297171662","name":"\u52C7\u6562\u718A\u718A","rating":2446,"rank":106,"wins":3630,"losses":3179,"streak":3,"countryCode":"CN"},{"profileId":3230529,"steamId":"76561198098401046","name":"IamChristopher","rating":2446,"rank":107,"wins":1141,"losses":790,"streak":1,"countryCode":"CA"},{"profileId":18917671,"steamId":"76561199642772373","name":"Tacac\xE1","rating":2443,"rank":108,"wins":418,"losses":249,"streak":1,"countryCode":"BR"},{"profileId":322534,"steamId":"76561198054607979","name":"STORM | Noszombie","rating":2440,"rank":109,"wins":3169,"losses":2708,"streak":-3,"countryCode":"AU"},{"profileId":1200049,"steamId":"76561199013132475","name":"Mr.Bean","rating":2440,"rank":110,"wins":1904,"losses":1620,"streak":-4,"countryCode":"VN"},{"profileId":3101322,"steamId":"76561198151895411","name":"HR Whitecourt","rating":2439,"rank":111,"wins":1052,"losses":791,"streak":2,"countryCode":"CL"},{"profileId":1407942,"steamId":"76561198121306763","name":"Dark_aoe","rating":2439,"rank":112,"wins":1974,"losses":1836,"streak":1,"countryCode":"RU"},{"profileId":9579739,"steamId":"76561199243543910","name":"mentalist_","rating":2437,"rank":113,"wins":985,"losses":846,"streak":2,"countryCode":"CA"},{"profileId":5232543,"steamId":"76561199149402832","name":"DS_Ilag","rating":2434,"rank":114,"wins":2538,"losses":2445,"streak":1,"countryCode":"VE"},{"profileId":3241077,"steamId":"76561199082554539","name":"Hoanginator","rating":2432,"rank":115,"wins":3013,"losses":1827,"streak":1,"countryCode":"VN"},{"profileId":23221600,"steamId":"76561199476300615","name":"CNZS_Donghaidi","rating":2427,"rank":116,"wins":171,"losses":99,"streak":1,"countryCode":"CN"},{"profileId":312774,"steamId":"76561198452342146","name":"hK | Keno_","rating":2426,"rank":117,"wins":987,"losses":801,"streak":-1,"countryCode":"MX"},{"profileId":4625368,"steamId":"76561198317870609","name":"zankoku sekai no akuma","rating":2425,"rank":118,"wins":2118,"losses":1939,"streak":2,"countryCode":"TR"},{"profileId":6155519,"steamId":"76561199191554240","name":"Starsky","rating":2421,"rank":119,"wins":710,"losses":563,"streak":19,"countryCode":"CN"},{"profileId":15174925,"steamId":"76561198148006901","name":"hK | Siesta","rating":2419,"rank":120,"wins":877,"losses":714,"streak":8,"countryCode":"MX"},{"profileId":250103,"steamId":"76561198061054857","name":"_Hallis","rating":2417,"rank":121,"wins":2025,"losses":1721,"streak":2,"countryCode":"GB"},{"profileId":4129359,"steamId":"76561199107946475","name":"DS_VarVa","rating":2417,"rank":122,"wins":2494,"losses":1999,"streak":-1,"countryCode":"AR"},{"profileId":2821779,"steamId":"76561199065337729","name":"DS_Levi","rating":2417,"rank":123,"wins":2329,"losses":2245,"streak":-2,"countryCode":"AR"},{"profileId":24488707,"steamId":"76561198777182344","name":"\u57FA\u79D1\xB7\u88E1\u7DAD\u62C9","rating":2415,"rank":124,"wins":277,"losses":129,"streak":-1,"countryCode":"ES"},{"profileId":11209546,"steamId":"76561199083880488","name":"Rodrixs","rating":2413,"rank":125,"wins":1123,"losses":975,"streak":3,"countryCode":"AR"},{"profileId":292318,"steamId":"76561198086560184","name":"Rayzor","rating":2408,"rank":126,"wins":1289,"losses":987,"streak":-1,"countryCode":"AU"},{"profileId":618731,"steamId":"76561198435384120","name":"DS_Carbo__","rating":2406,"rank":127,"wins":3913,"losses":3594,"streak":1,"countryCode":"AR"},{"profileId":24335740,"steamId":"76561199885045463","name":"Itz_Zenta","rating":2403,"rank":128,"wins":1025,"losses":813,"streak":1,"countryCode":"LY"},{"profileId":24064501,"steamId":"76561198775172659","name":"Only Vills","rating":2401,"rank":129,"wins":300,"losses":229,"streak":-6,"countryCode":"DE"},{"profileId":907793,"steamId":"76561198823680410","name":"NOC | Acro17","rating":2400,"rank":130,"wins":773,"losses":628,"streak":10,"countryCode":"DE"},{"profileId":199419,"steamId":"76561198397993999","name":"GKT_Cloud","rating":2399,"rank":131,"wins":2497,"losses":2036,"streak":3,"countryCode":"TW"},{"profileId":22210642,"steamId":"76561199825502412","name":"if i lose it all","rating":2395,"rank":132,"wins":594,"losses":463,"streak":5,"countryCode":"TR"},{"profileId":20655768,"steamId":"76561199729634460","name":"\u667A\u529B\u8001\u732A","rating":2395,"rank":133,"wins":336,"losses":246,"streak":1,"countryCode":"CN"},{"profileId":2532568,"steamId":"76561198282213398","name":"mordicchiotto","rating":2389,"rank":134,"wins":3093,"losses":2736,"streak":1,"countryCode":"IT"},{"profileId":1038375,"steamId":"76561198251249078","name":"OS+ | TheKroks","rating":2387,"rank":135,"wins":1698,"losses":1456,"streak":3,"countryCode":"PL"},{"profileId":689666,"steamId":"76561198055330361","name":"DK | Good_luck","rating":2386,"rank":136,"wins":2040,"losses":1754,"streak":2,"countryCode":"DK"},{"profileId":239238,"steamId":"76561198113285862","name":"wR.Fedex","rating":2382,"rank":137,"wins":828,"losses":598,"streak":7,"countryCode":"AR"},{"profileId":3108145,"steamId":"76561199075213973","name":"Dark","rating":2379,"rank":138,"wins":235,"losses":98,"streak":2,"countryCode":"RU"},{"profileId":884134,"steamId":"76561198843637471","name":"mouri","rating":2377,"rank":139,"wins":2560,"losses":2385,"streak":2,"countryCode":"JO"},{"profileId":7684383,"steamId":"76561198417115236","name":"OS+ | R4v3N_","rating":2375,"rank":140,"wins":603,"losses":456,"streak":-1,"countryCode":"RO"},{"profileId":4221810,"steamId":"76561199111177779","name":"Imfury_","rating":2375,"rank":141,"wins":1538,"losses":1222,"streak":12,"countryCode":"MX"},{"profileId":453821,"steamId":"76561198976031906","name":"Macluffy","rating":2373,"rank":142,"wins":5583,"losses":5439,"streak":-2,"countryCode":"BE"},{"profileId":6850569,"steamId":"76561198263372309","name":"Oni.GoKu","rating":2371,"rank":143,"wins":160,"losses":73,"streak":1,"countryCode":"BR"},{"profileId":6440047,"steamId":"76561198067238361","name":"Blackheart","rating":2364,"rank":144,"wins":2211,"losses":1947,"streak":2,"countryCode":"DE"},{"profileId":2274841,"steamId":"76561198229276604","name":"Nezzar","rating":2364,"rank":145,"wins":1582,"losses":1315,"streak":1,"countryCode":"HK"},{"profileId":622641,"steamId":"76561198118522396","name":"Draconian","rating":2363,"rank":146,"wins":1500,"losses":1374,"streak":1,"countryCode":"GB"},{"profileId":246423,"steamId":"76561198009952670","name":"Dobbs351","rating":2356,"rank":147,"wins":3489,"losses":3181,"streak":-1,"countryCode":"PL"},{"profileId":2593750,"steamId":"76561199028912870","name":"_TieuQuy","rating":2356,"rank":148,"wins":3625,"losses":3127,"streak":-1,"countryCode":"AR"},{"profileId":5112522,"steamId":"76561199026714384","name":"JOHA","rating":2355,"rank":149,"wins":1205,"losses":1029,"streak":3,"countryCode":"DE"},{"profileId":20313953,"steamId":"76561199742544812","name":"Ashubelt","rating":2355,"rank":150,"wins":99,"losses":28,"streak":1,"countryCode":"TR"},{"profileId":664715,"steamId":"76561198446948941","name":"SuperMAARusher","rating":2354,"rank":151,"wins":718,"losses":503,"streak":1,"countryCode":"IN"},{"profileId":2826785,"steamId":"76561198364224429","name":"wR.Nahue05","rating":2349,"rank":152,"wins":2419,"losses":2248,"streak":-2,"countryCode":"AR"},{"profileId":25434928,"steamId":"76561198705620358","name":"rono","rating":2349,"rank":153,"wins":169,"losses":72,"streak":6,"countryCode":"TR"},{"profileId":2899104,"steamId":"76561199069178242","name":"Nacho_C","rating":2347,"rank":154,"wins":919,"losses":810,"streak":2,"countryCode":"AR"},{"profileId":5854345,"steamId":"76561199176944754","name":"BSL | adduOP","rating":2346,"rank":155,"wins":1875,"losses":1622,"streak":1,"countryCode":"IN"},{"profileId":6251969,"steamId":"76561199197224738","name":"CNZS_DuDuZhu","rating":2344,"rank":156,"wins":3535,"losses":3244,"streak":3,"countryCode":"CN"},{"profileId":25218568,"steamId":"76561198713978143","name":"\u6D77\u738B\u661F","rating":2344,"rank":157,"wins":215,"losses":85,"streak":3,"countryCode":"ES"},{"profileId":7240746,"steamId":"76561199077157233","name":"Clearlove","rating":2341,"rank":158,"wins":2017,"losses":1755,"streak":-1,"countryCode":"CN"},{"profileId":11924411,"steamId":"76561199412599747","name":"DaddyWonder","rating":2340,"rank":159,"wins":180,"losses":70,"streak":1,"countryCode":"TR"},{"profileId":19831974,"steamId":"76561198852059383","name":"VEN\xD3N | Mauricio","rating":2338,"rank":160,"wins":1013,"losses":837,"streak":1,"countryCode":"MX"},{"profileId":11717976,"steamId":"76561198348854625","name":"Biel","rating":2337,"rank":161,"wins":207,"losses":131,"streak":4,"countryCode":"BR"},{"profileId":4502670,"steamId":"76561198079066975","name":"Mariann","rating":2335,"rank":162,"wins":2397,"losses":2252,"streak":1,"countryCode":"AR"},{"profileId":1350868,"steamId":"76561198967301821","name":"Hannibal","rating":2334,"rank":163,"wins":3052,"losses":2927,"streak":4,"countryCode":"EG"},{"profileId":452924,"steamId":"76561198033713695","name":"JackK","rating":2330,"rank":164,"wins":1964,"losses":1617,"streak":2,"countryCode":"PL"},{"profileId":211777,"steamId":"76561198074729763","name":"Mettiu","rating":2329,"rank":165,"wins":871,"losses":691,"streak":-1,"countryCode":"IT"},{"profileId":952733,"steamId":"76561198181602645","name":"Tulendeena","rating":2327,"rank":166,"wins":578,"losses":425,"streak":5,"countryCode":"AU"},{"profileId":2482098,"steamId":"76561198118701261","name":"[LW] Faneth","rating":2325,"rank":167,"wins":1107,"losses":975,"streak":1,"countryCode":"NL"},{"profileId":19543526,"steamId":"76561199676905936","name":"Aldeana Hot","rating":2323,"rank":168,"wins":385,"losses":293,"streak":-2,"countryCode":"CR"},{"profileId":545342,"steamId":"76561198437726495","name":"jcdanzig","rating":2318,"rank":169,"wins":1097,"losses":892,"streak":4,"countryCode":"CL"},{"profileId":23150792,"steamId":"76561199868403612","name":"\u8FF7\u4F60\u8F66\u4EC1","rating":2318,"rank":170,"wins":272,"losses":164,"streak":2,"countryCode":"CN"},{"profileId":458029,"steamId":"76561197981262667","name":"Darknoob","rating":2317,"rank":171,"wins":4827,"losses":4107,"streak":1,"countryCode":"NL"},{"profileId":11090889,"steamId":"76561198798438814","name":"\u6296\u97F3ique","rating":2316,"rank":172,"wins":64,"losses":0,"streak":64,"countryCode":"CN"},{"profileId":221997,"steamId":"76561197961767770","name":"FYI Inc","rating":2313,"rank":173,"wins":2305,"losses":1980,"streak":11,"countryCode":"US"},{"profileId":1076546,"steamId":"76561198313174795","name":"\u5982\u82B1\u7F8E\u7737","rating":2312,"rank":174,"wins":655,"losses":515,"streak":1,"countryCode":"CN"},{"profileId":268051,"steamId":"76561198053312969","name":"Eli","rating":2310,"rank":175,"wins":1508,"losses":1298,"streak":-2,"countryCode":"US"},{"profileId":8448734,"steamId":"76561197991643557","name":"Hunab Ku","rating":2310,"rank":176,"wins":1266,"losses":1017,"streak":-1,"countryCode":"MX"},{"profileId":5902182,"steamId":"76561198814638354","name":"\u4E91\u95F2","rating":2310,"rank":177,"wins":1092,"losses":974,"streak":7,"countryCode":"CN"},{"profileId":738035,"steamId":"76561198035758453","name":"Lighty","rating":2307,"rank":178,"wins":3902,"losses":3635,"streak":2,"countryCode":"FR"},{"profileId":1762409,"steamId":"76561199028366768","name":"RoR | kei","rating":2307,"rank":179,"wins":2964,"losses":2784,"streak":4,"countryCode":"JP"},{"profileId":23353296,"steamId":"","name":"Keane9115","rating":2306,"rank":180,"wins":257,"losses":159,"streak":4,"countryCode":"AR"},{"profileId":21227185,"steamId":"76561199639553093","name":"\u6211\u672C\u5584\u826F","rating":2306,"rank":181,"wins":206,"losses":107,"streak":4,"countryCode":"CN"},{"profileId":20471312,"steamId":"76561199754086125","name":"yoki sekai no tenshi","rating":2306,"rank":182,"wins":148,"losses":66,"streak":8,"countryCode":"TR"},{"profileId":8993542,"steamId":"76561198803303038","name":"\u6850\u6708","rating":2305,"rank":183,"wins":79,"losses":7,"streak":1,"countryCode":"CN"},{"profileId":460064,"steamId":"76561198185474877","name":"GAX | The Dodge","rating":2304,"rank":184,"wins":1132,"losses":999,"streak":7,"countryCode":"BR"},{"profileId":17731854,"steamId":"76561199572621327","name":"Speed","rating":2302,"rank":185,"wins":1081,"losses":999,"streak":-1,"countryCode":"MT"},{"profileId":1554380,"steamId":"76561198180402989","name":"[R1] Pume","rating":2300,"rank":186,"wins":437,"losses":329,"streak":2,"countryCode":"ES"},{"profileId":208314,"steamId":"","name":"Whoosher9355","rating":2298,"rank":187,"wins":197,"losses":78,"streak":8,"countryCode":"TR"},{"profileId":219739,"steamId":"76561198940417418","name":"Pela","rating":2297,"rank":188,"wins":846,"losses":720,"streak":6,"countryCode":"AR"},{"profileId":605947,"steamId":"76561198253876282","name":"RoR | Hellequinn","rating":2296,"rank":189,"wins":2050,"losses":1931,"streak":3,"countryCode":"DE"},{"profileId":2800609,"steamId":"76561198272515069","name":"Valle","rating":2296,"rank":190,"wins":756,"losses":551,"streak":3,"countryCode":"DE"},{"profileId":211321,"steamId":"76561198012010543","name":"robo_boro","rating":2294,"rank":191,"wins":213,"losses":106,"streak":-1,"countryCode":"GB"},{"profileId":4859950,"steamId":"76561198444763912","name":"HR AboKeiTo","rating":2293,"rank":192,"wins":1155,"losses":1018,"streak":1,"countryCode":"CL"},{"profileId":4012008,"steamId":"76561198294644972","name":"chaos_2_win","rating":2293,"rank":193,"wins":1694,"losses":1559,"streak":-2,"countryCode":"DE"},{"profileId":20566459,"steamId":"76561199071858073","name":"CNZS_Still in Love","rating":2293,"rank":194,"wins":1078,"losses":935,"streak":2,"countryCode":"CN"},{"profileId":1749894,"steamId":"76561198054734113","name":"DS_Nacho_10","rating":2285,"rank":195,"wins":1121,"losses":936,"streak":1,"countryCode":"AR"},{"profileId":10960083,"steamId":"76561199385029768","name":"Mettiu","rating":2284,"rank":196,"wins":735,"losses":606,"streak":-1,"countryCode":"IT"},{"profileId":1629889,"steamId":"76561198354278976","name":"Fs.Alive","rating":2284,"rank":197,"wins":2853,"losses":2610,"streak":1,"countryCode":"BR"},{"profileId":14669191,"steamId":"76561199492268970","name":"Chavah","rating":2283,"rank":198,"wins":851,"losses":743,"streak":1,"countryCode":"DO"},{"profileId":2295504,"steamId":"76561198874693374","name":"hK | Volg","rating":2283,"rank":199,"wins":1339,"losses":1231,"streak":2,"countryCode":"MX"},{"profileId":301822,"steamId":"76561198370356865","name":"[GT]YellowJacket","rating":2283,"rank":200,"wins":5498,"losses":5108,"streak":2,"countryCode":"US"},{"profileId":1206581,"steamId":"76561198105889094","name":"DS_John III","rating":2282,"rank":201,"wins":1267,"losses":1071,"streak":1,"countryCode":"CR"},{"profileId":9031952,"steamId":"76561199230919064","name":"hK | ChossMx","rating":2281,"rank":202,"wins":1184,"losses":1041,"streak":-1,"countryCode":"MX"},{"profileId":516841,"steamId":"76561198084463845","name":"emalius2","rating":2279,"rank":203,"wins":1362,"losses":1216,"streak":-1,"countryCode":"FI"},{"profileId":15507280,"steamId":"76561199522053072","name":"YT Jian Hei\u83DC\u96DE\u865F","rating":2278,"rank":204,"wins":564,"losses":499,"streak":-2,"countryCode":"TW"},{"profileId":9558892,"steamId":"76561199066453611","name":"LE | WilliamS","rating":2277,"rank":205,"wins":3572,"losses":3316,"streak":2,"countryCode":"PE"},{"profileId":658565,"steamId":"76561198797909571","name":"PNLN | PG9","rating":2277,"rank":206,"wins":1892,"losses":1772,"streak":2,"countryCode":"BR"},{"profileId":3055068,"steamId":"76561198850477336","name":"Gengar","rating":2276,"rank":207,"wins":1835,"losses":1769,"streak":-1,"countryCode":"AR"},{"profileId":12452310,"steamId":"76561199076453355","name":"Emperor_Napoleon","rating":2275,"rank":208,"wins":1289,"losses":1136,"streak":-1,"countryCode":"CN"},{"profileId":5400817,"steamId":"76561199158515725","name":"Eren","rating":2275,"rank":209,"wins":597,"losses":476,"streak":1,"countryCode":"MX"},{"profileId":4240317,"steamId":"76561198154992750","name":"BoyWonder_","rating":2274,"rank":210,"wins":2175,"losses":1940,"streak":-3,"countryCode":"TR"},{"profileId":228725,"steamId":"76561198361295496","name":"Feroker","rating":2273,"rank":211,"wins":1285,"losses":1117,"streak":9,"countryCode":"CZ"},{"profileId":1449222,"steamId":"76561198983187966","name":"Togawa Sakikoi","rating":2272,"rank":212,"wins":390,"losses":252,"streak":-4,"countryCode":"CN"},{"profileId":1210686,"steamId":"76561198095459580","name":"Leonidas","rating":2271,"rank":213,"wins":4629,"losses":4283,"streak":2,"countryCode":"FR"},{"profileId":8335776,"steamId":"76561198438864329","name":"buddybadi","rating":2269,"rank":214,"wins":803,"losses":655,"streak":1,"countryCode":"AT"},{"profileId":301918,"steamId":"76561198352045396","name":"OS+ | Scotty","rating":2269,"rank":215,"wins":2038,"losses":1783,"streak":-3,"countryCode":"US"},{"profileId":18871570,"steamId":"76561199260768231","name":"spiid","rating":2269,"rank":216,"wins":140,"losses":58,"streak":-3,"countryCode":"FI"},{"profileId":289473,"steamId":"76561198154910988","name":"Shulk","rating":2269,"rank":217,"wins":1988,"losses":1885,"streak":4,"countryCode":"FR"},{"profileId":19535910,"steamId":"76561199676637909","name":"Bro Creation","rating":2268,"rank":218,"wins":771,"losses":700,"streak":1,"countryCode":"PK"},{"profileId":223206,"steamId":"76561198085739429","name":"NOC | komtan","rating":2267,"rank":219,"wins":2341,"losses":1974,"streak":-5,"countryCode":"JP"},{"profileId":23770308,"steamId":"76561198786565083","name":"ArabiaHaterNr.1","rating":2266,"rank":220,"wins":97,"losses":20,"streak":1,"countryCode":"DE"},{"profileId":15506619,"steamId":"76561199521972648","name":"Zni.Locuss","rating":2265,"rank":221,"wins":905,"losses":759,"streak":3,"countryCode":"BG"},{"profileId":17331610,"steamId":"76561199562155750","name":"Baby Alf","rating":2264,"rank":222,"wins":791,"losses":546,"streak":-3,"countryCode":"AR"},{"profileId":9750845,"steamId":"76561198800311094","name":"DAI","rating":2263,"rank":223,"wins":1135,"losses":952,"streak":4,"countryCode":"TW"},{"profileId":8864570,"steamId":"76561199227830199","name":"\u611B\u60C5\u7684\u5927\u58DE\u86CB","rating":2263,"rank":224,"wins":565,"losses":458,"streak":2,"countryCode":"TW"},{"profileId":580573,"steamId":"76561198360396636","name":"Don Blukaku","rating":2262,"rank":225,"wins":3644,"losses":3505,"streak":2,"countryCode":"MX"},{"profileId":1550842,"steamId":"76561197990967255","name":"saps_","rating":2261,"rank":226,"wins":3316,"losses":3056,"streak":2,"countryCode":"RO"},{"profileId":2888687,"steamId":"76561198405456050","name":"Pan","rating":2259,"rank":227,"wins":400,"losses":279,"streak":2,"countryCode":"MX"},{"profileId":60328,"steamId":"76561198102723093","name":"DS_VortiX","rating":2257,"rank":228,"wins":404,"losses":309,"streak":-3,"countryCode":"ES"},{"profileId":2653793,"steamId":"76561198876888773","name":"Frost_9","rating":2254,"rank":229,"wins":1218,"losses":1124,"streak":1,"countryCode":"SE"},{"profileId":19657014,"steamId":"76561199680710552","name":"\u6D1B\u5B50\u5546","rating":2254,"rank":230,"wins":827,"losses":719,"streak":4,"countryCode":"TW"},{"profileId":1292487,"steamId":"76561198175593485","name":"ilovebaskets","rating":2254,"rank":231,"wins":2365,"losses":2239,"streak":3,"countryCode":"US"},{"profileId":10489189,"steamId":"76561199355311669","name":"Fs.TARTARUGA VELOZ","rating":2253,"rank":232,"wins":140,"losses":49,"streak":1,"countryCode":"BR"},{"profileId":21516070,"steamId":"76561199727476410","name":"ldx","rating":2252,"rank":233,"wins":908,"losses":720,"streak":2,"countryCode":"CN"},{"profileId":1215099,"steamId":"76561198864595273","name":"alphaa","rating":2252,"rank":234,"wins":1457,"losses":1221,"streak":5,"countryCode":"US"},{"profileId":2598146,"steamId":"76561199055906163","name":"VEN\xD3N | SiNisTeR","rating":2251,"rank":235,"wins":483,"losses":363,"streak":-2,"countryCode":"MX"},{"profileId":579679,"steamId":"76561198425688505","name":"Margougou","rating":2249,"rank":236,"wins":1318,"losses":1035,"streak":1,"countryCode":"FR"},{"profileId":230432,"steamId":"76561198040347770","name":"PUB | Steak","rating":2249,"rank":237,"wins":1365,"losses":1227,"streak":2,"countryCode":"GB"},{"profileId":1776432,"steamId":"76561198064834451","name":"Toan Perfect","rating":2249,"rank":238,"wins":381,"losses":239,"streak":7,"countryCode":"VN"},{"profileId":20927991,"steamId":"76561199787504967","name":"ReydeCopas","rating":2249,"rank":239,"wins":476,"losses":378,"streak":-1,"countryCode":"MX"},{"profileId":1175237,"steamId":"76561198434173438","name":"Fs.Jubileu","rating":2247,"rank":240,"wins":603,"losses":473,"streak":3,"countryCode":"BR"},{"profileId":738249,"steamId":"76561198074231669","name":"Mr Greed","rating":2246,"rank":241,"wins":2423,"losses":2076,"streak":1,"countryCode":"PT"},{"profileId":262959,"steamId":"76561198230903988","name":"Fukoti","rating":2245,"rank":242,"wins":1755,"losses":1673,"streak":8,"countryCode":"TR"},{"profileId":23293463,"steamId":"76561199877077123","name":"_LY_\u6597\u9C7C\u65B0\u79C0\u62FF\u7834\u4F26","rating":2245,"rank":243,"wins":305,"losses":222,"streak":5,"countryCode":"CN"},{"profileId":18857401,"steamId":"76561199639361267","name":"\u8001\u5929\u9D5D","rating":2243,"rank":244,"wins":715,"losses":617,"streak":3,"countryCode":"TW"},{"profileId":412636,"steamId":"76561198965911867","name":"Bubbagump","rating":2242,"rank":245,"wins":760,"losses":599,"streak":6,"countryCode":"US"},{"profileId":1485562,"steamId":"76561198304166141","name":"VEN\xD3N | MrOsoVC8","rating":2242,"rank":246,"wins":1553,"losses":1418,"streak":1,"countryCode":"MX"},{"profileId":2009315,"steamId":"76561198087580643","name":"OS+ | RaiD_","rating":2241,"rank":247,"wins":814,"losses":720,"streak":-1,"countryCode":"IT"},{"profileId":25249906,"steamId":"76561198713471634","name":"\u660E\u660E\u662F\u91D1\u53F6\u9A97\u6211\u662F\u7CA5","rating":2241,"rank":248,"wins":113,"losses":47,"streak":3,"countryCode":"CN"},{"profileId":216183,"steamId":"76561198030544947","name":"Delta65","rating":2241,"rank":249,"wins":2081,"losses":2002,"streak":2,"countryCode":"DE"},{"profileId":15293475,"steamId":"76561199511113994","name":"NuMa | AngelR2","rating":2240,"rank":250,"wins":693,"losses":559,"streak":-3,"countryCode":"CO"},{"profileId":12361437,"steamId":"76561199473024749","name":"\u540A\u5927\u5E08","rating":2240,"rank":251,"wins":462,"losses":364,"streak":-1,"countryCode":"JP"},{"profileId":331084,"steamId":"76561198873978587","name":"\u9A0E\u8C6C\u6253\u4ED7","rating":2240,"rank":252,"wins":3773,"losses":3664,"streak":2,"countryCode":"TW"},{"profileId":5205268,"steamId":"76561198085661381","name":"John II","rating":2239,"rank":253,"wins":689,"losses":558,"streak":1,"countryCode":"CR"},{"profileId":277618,"steamId":"76561198942369032","name":"Mastyjames","rating":2238,"rank":254,"wins":491,"losses":335,"streak":1,"countryCode":"US"},{"profileId":290430,"steamId":"76561198840722317","name":"\u661F\u7A7A\u8461\u8404\u5927\u676F\u52A0\u6930\u679C\u51B0\u6C99\u4E03\u5206\u7CD6","rating":2238,"rank":255,"wins":191,"losses":95,"streak":1,"countryCode":"CN"},{"profileId":11122904,"steamId":"76561199387612234","name":"\xD0\xE0Lat\xABG\xF4\xB0K\xB5\xBB","rating":2237,"rank":256,"wins":372,"losses":254,"streak":2,"countryCode":"VN"},{"profileId":475826,"steamId":"76561198126387713","name":"Timbrhoggvandi","rating":2237,"rank":257,"wins":2552,"losses":2368,"streak":-2,"countryCode":"AU"},{"profileId":2631795,"steamId":"76561199043744719","name":"Osama","rating":2236,"rank":258,"wins":2811,"losses":2691,"streak":3,"countryCode":"EG"},{"profileId":4298438,"steamId":"76561198987071435","name":"Prometheus","rating":2235,"rank":259,"wins":972,"losses":821,"streak":2,"countryCode":"TR"},{"profileId":300565,"steamId":"76561198002393371","name":"NOC | Wean Dinchester","rating":2235,"rank":260,"wins":687,"losses":586,"streak":6,"countryCode":"DE"},{"profileId":19701219,"steamId":"76561199570355208","name":"\u8001\u7231\u56FD\u70B8\u9C7C\u53F7","rating":2234,"rank":261,"wins":521,"losses":390,"streak":3,"countryCode":"CN"},{"profileId":811511,"steamId":"76561198296750721","name":"Kanon","rating":2232,"rank":262,"wins":618,"losses":479,"streak":4,"countryCode":"CN"},{"profileId":10912750,"steamId":"76561199383051463","name":"ANKR.ice cream","rating":2232,"rank":263,"wins":2017,"losses":1917,"streak":2,"countryCode":"TW"},{"profileId":949573,"steamId":"76561198138884370","name":"[bS']Socksyy","rating":2231,"rank":264,"wins":1306,"losses":1129,"streak":1,"countryCode":"AU"},{"profileId":4795863,"steamId":"76561199129077917","name":"RAGNAR","rating":2231,"rank":265,"wins":139,"losses":45,"streak":-3,"countryCode":"TR"},{"profileId":2347189,"steamId":"76561199046361051","name":"Resilience","rating":2231,"rank":266,"wins":692,"losses":583,"streak":5,"countryCode":"IT"},{"profileId":221879,"steamId":"76561198415635055","name":"Old Time","rating":2231,"rank":267,"wins":1387,"losses":1282,"streak":1,"countryCode":"BR"},{"profileId":1253397,"steamId":"76561198233288584","name":"OS+ | aKaTepBackWards","rating":2231,"rank":268,"wins":563,"losses":436,"streak":1,"countryCode":"BG"},{"profileId":178430,"steamId":"76561198120632563","name":"Light Cav OP","rating":2231,"rank":269,"wins":3950,"losses":3557,"streak":1,"countryCode":"US"},{"profileId":284552,"steamId":"76561198102894110","name":"Fs.Jubileu","rating":2230,"rank":270,"wins":1312,"losses":1116,"streak":4,"countryCode":"BR"},{"profileId":989253,"steamId":"76561198023491587","name":"NOC | Madtomski","rating":2230,"rank":271,"wins":844,"losses":639,"streak":2,"countryCode":"DE"},{"profileId":5860039,"steamId":"76561199111768488","name":"TRMA | The_Beatleman","rating":2230,"rank":272,"wins":1087,"losses":946,"streak":3,"countryCode":"RU"},{"profileId":725502,"steamId":"76561198099976904","name":"DK | Kongen_42","rating":2228,"rank":273,"wins":3822,"losses":3676,"streak":-1,"countryCode":"DK"},{"profileId":4943664,"steamId":"76561199135494052","name":"Neo_Z4ID","rating":2228,"rank":274,"wins":387,"losses":341,"streak":2,"countryCode":"PK"},{"profileId":754845,"steamId":"76561198143899469","name":"AceRx","rating":2227,"rank":275,"wins":1570,"losses":1403,"streak":3,"countryCode":"AR"},{"profileId":2014691,"steamId":"76561198194338405","name":"pren","rating":2227,"rank":276,"wins":531,"losses":419,"streak":-4,"countryCode":"CZ"},{"profileId":396886,"steamId":"76561198203178318","name":"nono12","rating":2226,"rank":277,"wins":1368,"losses":1211,"streak":2,"countryCode":"FR"},{"profileId":1650931,"steamId":"76561198188939721","name":"HaraKiri","rating":2223,"rank":278,"wins":1846,"losses":1735,"streak":8,"countryCode":"MA"},{"profileId":5772003,"steamId":"76561199172255382","name":"xana","rating":2222,"rank":279,"wins":1082,"losses":919,"streak":-1,"countryCode":"BR"},{"profileId":1389164,"steamId":"76561198240662592","name":"The Illusionist","rating":2222,"rank":280,"wins":2182,"losses":2043,"streak":-1,"countryCode":"SK"},{"profileId":267857,"steamId":"76561198076329437","name":"DanMT","rating":2221,"rank":281,"wins":3138,"losses":3021,"streak":-2,"countryCode":"GB"},{"profileId":22889810,"steamId":"76561199858806820","name":"nW | Manuel","rating":2221,"rank":282,"wins":690,"losses":614,"streak":1,"countryCode":"CO"},{"profileId":2420511,"steamId":"76561198287592351","name":"[ASYNC]GodsPrisoner","rating":2220,"rank":283,"wins":2968,"losses":2682,"streak":1,"countryCode":"US"},{"profileId":300649,"steamId":"76561197982879082","name":"Fs.FeAge","rating":2220,"rank":284,"wins":868,"losses":728,"streak":4,"countryCode":"CA"},{"profileId":16016019,"steamId":"76561199534584758","name":"Shark drown on water","rating":2219,"rank":285,"wins":256,"losses":160,"streak":-1,"countryCode":"FR"},{"profileId":677003,"steamId":"76561198119101707","name":"[TMG] Lucipher","rating":2218,"rank":286,"wins":2900,"losses":2794,"streak":5,"countryCode":"GE"},{"profileId":10172828,"steamId":"76561199279551544","name":"Maximilian von Habsburg","rating":2217,"rank":287,"wins":228,"losses":126,"streak":-1,"countryCode":"DE"},{"profileId":2709266,"steamId":"76561199060523210","name":"OS+ | NecksZy","rating":2217,"rank":288,"wins":1787,"losses":1645,"streak":3,"countryCode":"CL"},{"profileId":1878835,"steamId":"76561199020665663","name":"Tomppa","rating":2217,"rank":289,"wins":656,"losses":535,"streak":-1,"countryCode":"FI"},{"profileId":3444509,"steamId":"76561198271940855","name":"Mununez","rating":2216,"rank":290,"wins":1013,"losses":919,"streak":1,"countryCode":"US"},{"profileId":8447899,"steamId":"76561199223093017","name":"OJP","rating":2215,"rank":291,"wins":1098,"losses":944,"streak":3,"countryCode":"DE"},{"profileId":4971,"steamId":"76561198067207629","name":"Oni.Nacho","rating":2213,"rank":292,"wins":1382,"losses":1197,"streak":-2,"countryCode":"BR"},{"profileId":5941695,"steamId":"76561198139890270","name":"Bel","rating":2213,"rank":293,"wins":448,"losses":327,"streak":6,"countryCode":"US"},{"profileId":1693166,"steamId":"76561198090399922","name":"VN_KoNFeR","rating":2213,"rank":294,"wins":686,"losses":602,"streak":9,"countryCode":"ES"},{"profileId":937162,"steamId":"76561198448253544","name":"Shahar18","rating":2210,"rank":295,"wins":1828,"losses":1717,"streak":-2,"countryCode":"IL"},{"profileId":1137086,"steamId":"76561197967418429","name":"shiXo.#","rating":2209,"rank":296,"wins":6247,"losses":6111,"streak":-1,"countryCode":"DE"},{"profileId":757886,"steamId":"76561198112235172","name":"VN_DarK_KnighT_","rating":2209,"rank":297,"wins":911,"losses":779,"streak":2,"countryCode":"MX"},{"profileId":4375138,"steamId":"76561199115787134","name":"_RaiD__","rating":2209,"rank":298,"wins":437,"losses":348,"streak":4,"countryCode":"IT"},{"profileId":11493710,"steamId":"76561199419340366","name":"Rose Pric3","rating":2208,"rank":299,"wins":334,"losses":259,"streak":3,"countryCode":"CN"},{"profileId":2599393,"steamId":"76561198340568413","name":"Worst_AoE_Player","rating":2208,"rank":300,"wins":935,"losses":845,"streak":2,"countryCode":"ES"},{"profileId":1920807,"steamId":"76561199035096097","name":"c.salette","rating":2208,"rank":301,"wins":3893,"losses":3542,"streak":2,"countryCode":"FR"},{"profileId":208269,"steamId":"76561198013793264","name":"JonSlow","rating":2207,"rank":302,"wins":5199,"losses":4802,"streak":2,"countryCode":"IL"},{"profileId":6030158,"steamId":"76561199173852153","name":"\u8DEF\u908A\u7684\u91CE\u82B1","rating":2207,"rank":303,"wins":409,"losses":303,"streak":-2,"countryCode":"TW"},{"profileId":5464646,"steamId":"76561199160705059","name":"[VL] Xite","rating":2207,"rank":304,"wins":467,"losses":403,"streak":2,"countryCode":"PE"},{"profileId":2944434,"steamId":"76561198350272978","name":"Yax","rating":2207,"rank":305,"wins":1103,"losses":939,"streak":1,"countryCode":"TR"},{"profileId":212316,"steamId":"76561198205154296","name":"KronosJr","rating":2206,"rank":306,"wins":667,"losses":563,"streak":5,"countryCode":"GR"},{"profileId":616906,"steamId":"76561198328426104","name":"wisenatic","rating":2206,"rank":307,"wins":6730,"losses":6479,"streak":1,"countryCode":"DE"},{"profileId":5839022,"steamId":"76561198184971415","name":"[GLD] Abu abdullah","rating":2206,"rank":308,"wins":891,"losses":737,"streak":-2,"countryCode":"SA"},{"profileId":5257573,"steamId":"76561199150904980","name":"No_soy_yo","rating":2206,"rank":309,"wins":1344,"losses":1299,"streak":3,"countryCode":"CL"},{"profileId":180520,"steamId":"76561198245164292","name":"PUB | [\u{1F955}]King_Boo","rating":2205,"rank":310,"wins":917,"losses":764,"streak":6,"countryCode":"GB"},{"profileId":10044347,"steamId":"76561199270029216","name":"CNZS_\u83DC\u83DC\u864E","rating":2204,"rank":311,"wins":485,"losses":392,"streak":4,"countryCode":"CN"},{"profileId":711407,"steamId":"76561198142583880","name":"\u732A\u54AA","rating":2203,"rank":312,"wins":1621,"losses":1492,"streak":7,"countryCode":"CN"},{"profileId":249653,"steamId":"76561198058957875","name":"Moneimon","rating":2202,"rank":313,"wins":1923,"losses":1750,"streak":1,"countryCode":"ES"},{"profileId":2366434,"steamId":"76561199035854784","name":"CTM | Escarapela Peruana","rating":2202,"rank":314,"wins":1017,"losses":922,"streak":4,"countryCode":"PE"},{"profileId":340055,"steamId":"76561198052963033","name":"[R1] PoXoLo","rating":2202,"rank":315,"wins":394,"losses":282,"streak":3,"countryCode":"ES"},{"profileId":3942539,"steamId":"76561198215643820","name":"OS+ | VoNDutcH","rating":2201,"rank":316,"wins":506,"losses":385,"streak":1,"countryCode":"IT"},{"profileId":431744,"steamId":"76561198077768177","name":"Rubenstock","rating":2201,"rank":317,"wins":622,"losses":487,"streak":-3,"countryCode":"FI"},{"profileId":1995414,"steamId":"76561198073404583","name":"OS+ | Tiggerr","rating":2199,"rank":318,"wins":4926,"losses":4765,"streak":-3,"countryCode":"CA"},{"profileId":4706179,"steamId":"76561198327909205","name":"[CL] Rey Enigmaaa","rating":2196,"rank":319,"wins":330,"losses":237,"streak":1,"countryCode":"PE"},{"profileId":3035292,"steamId":"76561198823651807","name":"XEVER | Rivux","rating":2196,"rank":320,"wins":5268,"losses":5174,"streak":1,"countryCode":"AR"},{"profileId":2266228,"steamId":"76561198065831788","name":"Edgar Davids","rating":2196,"rank":321,"wins":1915,"losses":1799,"streak":1,"countryCode":"DE"},{"profileId":17432728,"steamId":"76561199565205196","name":"MLT | Anna Flank","rating":2193,"rank":322,"wins":560,"losses":473,"streak":-1,"countryCode":"IT"},{"profileId":10283755,"steamId":"76561199309041765","name":"Valgur","rating":2191,"rank":323,"wins":635,"losses":538,"streak":2,"countryCode":"MX"},{"profileId":2301379,"steamId":"76561198122142342","name":"Molle","rating":2191,"rank":324,"wins":2419,"losses":2319,"streak":1,"countryCode":"DE"},{"profileId":21503260,"steamId":"76561199807552998","name":"CNZS_Dadaya","rating":2191,"rank":325,"wins":443,"losses":309,"streak":1,"countryCode":"CN"},{"profileId":3173869,"steamId":"76561199078107705","name":"twitch.tv/RaiDAoE","rating":2187,"rank":326,"wins":1187,"losses":1104,"streak":1,"countryCode":"IT"},{"profileId":20533687,"steamId":"76561199681332546","name":"\u541B\u82B1\u5BA2","rating":2186,"rank":327,"wins":638,"losses":545,"streak":1,"countryCode":"TW"},{"profileId":5109315,"steamId":"76561199142551555","name":"Plebadin","rating":2185,"rank":328,"wins":131,"losses":89,"streak":1,"countryCode":"GR"},{"profileId":2614814,"steamId":"76561199002853976","name":"TaoPaiPai","rating":2185,"rank":329,"wins":1259,"losses":1201,"streak":8,"countryCode":"GT"},{"profileId":1691357,"steamId":"76561199025695126","name":"Taeyoon","rating":2185,"rank":330,"wins":488,"losses":341,"streak":2,"countryCode":"TW"},{"profileId":21733994,"steamId":"76561199814007304","name":"Dr. Wiley!!!","rating":2185,"rank":331,"wins":1188,"losses":783,"streak":2,"countryCode":"US"},{"profileId":10908042,"steamId":"76561199081484535","name":"Orca17","rating":2184,"rank":332,"wins":301,"losses":207,"streak":1,"countryCode":"DE"},{"profileId":8684491,"steamId":"76561198014767773","name":"Pauli","rating":2184,"rank":333,"wins":2508,"losses":2384,"streak":-2,"countryCode":"BR"},{"profileId":2845695,"steamId":"76561199066483541","name":"paris hilton","rating":2183,"rank":334,"wins":391,"losses":326,"streak":-2,"countryCode":"FR"},{"profileId":2624148,"steamId":"76561198965753249","name":"PatrickJane","rating":2183,"rank":335,"wins":1938,"losses":1715,"streak":-1,"countryCode":"AR"},{"profileId":20821163,"steamId":"76561199779944173","name":"Bumbam","rating":2182,"rank":336,"wins":118,"losses":39,"streak":3,"countryCode":"TR"},{"profileId":6387067,"steamId":"76561199203856457","name":"CTM | L","rating":2181,"rank":337,"wins":861,"losses":771,"streak":2,"countryCode":"PE"},{"profileId":5367941,"steamId":"76561199157065312","name":"HaraKiri_aoe","rating":2180,"rank":338,"wins":515,"losses":383,"streak":1,"countryCode":"MA"},{"profileId":9992305,"steamId":"76561199265633489","name":"thunder bun","rating":2179,"rank":339,"wins":634,"losses":591,"streak":-1,"countryCode":"TW"},{"profileId":3816609,"steamId":"76561199038644017","name":"iamkaito","rating":2179,"rank":340,"wins":2356,"losses":2218,"streak":-3,"countryCode":"MX"},{"profileId":2388792,"steamId":"76561198364922218","name":"jsemosoom","rating":2179,"rank":341,"wins":3322,"losses":3220,"streak":1,"countryCode":"CZ"},{"profileId":2048591,"steamId":"76561198120291665","name":"QuEnDi.kelar","rating":2178,"rank":342,"wins":781,"losses":675,"streak":1,"countryCode":"DE"},{"profileId":25545754,"steamId":"76561198696707730","name":"Solomon","rating":2177,"rank":343,"wins":62,"losses":8,"streak":2,"countryCode":"CN"},{"profileId":12273554,"steamId":"76561199471014685","name":"damien","rating":2175,"rank":344,"wins":131,"losses":59,"streak":1,"countryCode":"DK"},{"profileId":8815470,"steamId":"76561198263066173","name":"Deaf Vader","rating":2175,"rank":345,"wins":498,"losses":439,"streak":1,"countryCode":"US"},{"profileId":974876,"steamId":"76561198371606075","name":"wanna lose 21 grams","rating":2174,"rank":346,"wins":2964,"losses":2847,"streak":1,"countryCode":"IN"},{"profileId":17266239,"steamId":"76561199549371670","name":"Mymy","rating":2174,"rank":347,"wins":1714,"losses":1546,"streak":-12,"countryCode":"CN"},{"profileId":5091998,"steamId":"76561198239271992","name":"Kaeften","rating":2173,"rank":348,"wins":629,"losses":549,"streak":1,"countryCode":"SE"},{"profileId":2622255,"steamId":"76561199054950036","name":"\xD0Lucky","rating":2172,"rank":349,"wins":340,"losses":250,"streak":1,"countryCode":"VN"},{"profileId":14191480,"steamId":"76561199484417763","name":"MegarandomShan","rating":2171,"rank":350,"wins":312,"losses":195,"streak":2,"countryCode":"GB"},{"profileId":14119237,"steamId":"76561199013522365","name":"[CL] Yomi","rating":2171,"rank":351,"wins":942,"losses":838,"streak":2,"countryCode":"JP"},{"profileId":10037844,"steamId":"76561199269632256","name":"CTM | Ligth","rating":2171,"rank":352,"wins":277,"losses":206,"streak":-1,"countryCode":"PE"},{"profileId":1821855,"steamId":"76561199030862219","name":"_DY_\u5B5F\u5DDD","rating":2171,"rank":353,"wins":4665,"losses":4549,"streak":2,"countryCode":"CN"},{"profileId":14666598,"steamId":"76561199492500102","name":"nW | iamkaito","rating":2170,"rank":354,"wins":2499,"losses":2362,"streak":1,"countryCode":"MX"},{"profileId":914665,"steamId":"76561199006788221","name":"Caguamas","rating":2170,"rank":355,"wins":1022,"losses":890,"streak":1,"countryCode":"MX"},{"profileId":4388684,"steamId":"76561199116977315","name":"Bebesona","rating":2170,"rank":356,"wins":407,"losses":337,"streak":1,"countryCode":"BR"},{"profileId":880057,"steamId":"76561198274144074","name":"PNAL | Eskabe","rating":2167,"rank":357,"wins":1410,"losses":1221,"streak":1,"countryCode":"AR"},{"profileId":21547256,"steamId":"76561199703008320","name":"YMH","rating":2167,"rank":358,"wins":448,"losses":368,"streak":-5,"countryCode":"CN"},{"profileId":2934597,"steamId":"76561198316701086","name":"nW | Sgt.Pepper","rating":2166,"rank":359,"wins":2776,"losses":2672,"streak":1,"countryCode":"MX"},{"profileId":383378,"steamId":"76561198225051492","name":"Guiik","rating":2164,"rank":360,"wins":430,"losses":344,"streak":5,"countryCode":"FR"},{"profileId":285508,"steamId":"76561198055096506","name":"flightlessbird","rating":2161,"rank":361,"wins":555,"losses":383,"streak":3,"countryCode":"NZ"},{"profileId":3072788,"steamId":"76561198347493304","name":"Z4ID","rating":2161,"rank":362,"wins":1089,"losses":957,"streak":2,"countryCode":"PK"},{"profileId":2227707,"steamId":"76561198042671589","name":"Goatmaster","rating":2161,"rank":363,"wins":1705,"losses":1598,"streak":1,"countryCode":"SE"},{"profileId":24537812,"steamId":"76561198755028904","name":"ToBe","rating":2159,"rank":364,"wins":84,"losses":20,"streak":-2,"countryCode":"VN"},{"profileId":10336951,"steamId":"76561199022211535","name":"Edelreiss","rating":2156,"rank":365,"wins":2053,"losses":1933,"streak":1,"countryCode":"TR"},{"profileId":232376,"steamId":"76561198178507655","name":"dog9you","rating":2155,"rank":366,"wins":4385,"losses":4468,"streak":3,"countryCode":"HK"},{"profileId":15178088,"steamId":"76561199508138181","name":"ITA | Killer","rating":2154,"rank":367,"wins":328,"losses":241,"streak":-1,"countryCode":"IT"},{"profileId":9702563,"steamId":"76561199172849864","name":"Sharky aoe","rating":2154,"rank":368,"wins":631,"losses":545,"streak":-1,"countryCode":"FR"},{"profileId":20830378,"steamId":"76561199780222711","name":"laptopGuru","rating":2153,"rank":369,"wins":121,"losses":62,"streak":3,"countryCode":"SK"},{"profileId":11635889,"steamId":"76561199435207833","name":"PSG EUROPEAN CHAMPIONS","rating":2152,"rank":370,"wins":762,"losses":673,"streak":-1,"countryCode":"FR"},{"profileId":4930851,"steamId":"76561199135063433","name":"umugwanyi","rating":2152,"rank":371,"wins":828,"losses":740,"streak":4,"countryCode":"TR"},{"profileId":770700,"steamId":"76561198857001307","name":"ceepki","rating":2151,"rank":372,"wins":2744,"losses":2645,"streak":3,"countryCode":"HR"},{"profileId":2274072,"steamId":"76561198077675700","name":"Argh","rating":2151,"rank":373,"wins":2143,"losses":2095,"streak":-1,"countryCode":"PL"},{"profileId":875303,"steamId":"76561198044690951","name":"danger_noodle42","rating":2150,"rank":374,"wins":2634,"losses":2493,"streak":1,"countryCode":"BE"},{"profileId":5279457,"steamId":"76561199152101267","name":"kable.xpress","rating":2150,"rank":375,"wins":2118,"losses":1963,"streak":2,"countryCode":"AR"},{"profileId":2171446,"steamId":"76561199041924108","name":"DolunaK","rating":2150,"rank":376,"wins":2600,"losses":2543,"streak":2,"countryCode":"AR"},{"profileId":879956,"steamId":"76561198009215213","name":"Dziamdziak","rating":2149,"rank":377,"wins":1398,"losses":1317,"streak":1,"countryCode":"PL"},{"profileId":15442657,"steamId":"76561199520012237","name":"Nacional","rating":2147,"rank":378,"wins":2310,"losses":2224,"streak":3,"countryCode":"UY"},{"profileId":611972,"steamId":"76561198029304374","name":"Adam","rating":2147,"rank":379,"wins":1133,"losses":1010,"streak":6,"countryCode":"MX"},{"profileId":775196,"steamId":"76561198260708227","name":"_[eC]_Gurke_","rating":2145,"rank":380,"wins":3228,"losses":3143,"streak":-1,"countryCode":"DE"},{"profileId":11618587,"steamId":"76561199433491153","name":"CTM | Felices Fiestas Patrias PE","rating":2142,"rank":381,"wins":729,"losses":622,"streak":5,"countryCode":"PE"},{"profileId":11541957,"steamId":"76561199424324080","name":"plumeria","rating":2142,"rank":382,"wins":510,"losses":461,"streak":-3,"countryCode":"TW"},{"profileId":1886161,"steamId":"76561198040674687","name":"woaF","rating":2142,"rank":383,"wins":517,"losses":440,"streak":4,"countryCode":"SK"},{"profileId":1782455,"steamId":"76561198417440357","name":"CN_Dauh","rating":2142,"rank":384,"wins":4439,"losses":4244,"streak":-1,"countryCode":"CN"},{"profileId":6316201,"steamId":"76561199200365187","name":"\uC6B0\uB9AC\uAC00 \uAC00\uC7A5 \uBE44\uD1B5\uD55C \uACF3","rating":2139,"rank":385,"wins":565,"losses":441,"streak":3,"countryCode":"TR"},{"profileId":4933344,"steamId":"76561199135004025","name":"[LW] Faneth","rating":2139,"rank":386,"wins":322,"losses":240,"streak":1,"countryCode":"NL"},{"profileId":2473598,"steamId":"76561199047248243","name":"Old Boris","rating":2139,"rank":387,"wins":1028,"losses":976,"streak":4,"countryCode":"IT"},{"profileId":4985646,"steamId":"76561199137821329","name":"Pue","rating":2138,"rank":388,"wins":457,"losses":371,"streak":3,"countryCode":"DE"},{"profileId":891821,"steamId":"76561198119324752","name":"Artur","rating":2136,"rank":389,"wins":941,"losses":805,"streak":3,"countryCode":"BR"},{"profileId":20383862,"steamId":"76561199747672724","name":"twitch.tv/s0laf1d3","rating":2136,"rank":390,"wins":2416,"losses":2356,"streak":1,"countryCode":"US"},{"profileId":673427,"steamId":"76561198984773156","name":"AOKI_Thanouille","rating":2135,"rank":391,"wins":1889,"losses":1832,"streak":2,"countryCode":"FR"},{"profileId":234400,"steamId":"76561198041217626","name":"FelixAldi","rating":2135,"rank":392,"wins":3957,"losses":3868,"streak":1,"countryCode":"DE"},{"profileId":1280400,"steamId":"76561199004534372","name":"Love_Cheng_","rating":2135,"rank":393,"wins":1957,"losses":1849,"streak":-1,"countryCode":"VN"},{"profileId":20040729,"steamId":"76561199706217164","name":"ElPepe","rating":2134,"rank":394,"wins":369,"losses":296,"streak":5,"countryCode":"UY"},{"profileId":375935,"steamId":"76561198097669299","name":"[JA]Xerxes","rating":2132,"rank":395,"wins":5824,"losses":5696,"streak":1,"countryCode":"HU"},{"profileId":7082269,"steamId":"76561198139177321","name":"LM | kingofthrowing123","rating":2132,"rank":396,"wins":1351,"losses":1297,"streak":-1,"countryCode":"DE"},{"profileId":16145701,"steamId":"76561199536337431","name":"comrade in arms","rating":2130,"rank":397,"wins":438,"losses":338,"streak":3,"countryCode":"SG"},{"profileId":3265324,"steamId":"76561199083829139","name":"CTM | Lelo \u2729\xB0\uFF61 \u22C6\u2E1C \u272E","rating":2130,"rank":398,"wins":281,"losses":225,"streak":3,"countryCode":"PE"},{"profileId":21918692,"steamId":"76561199819794669","name":"MatzeAoE","rating":2130,"rank":399,"wins":1197,"losses":1153,"streak":-1,"countryCode":"DE"},{"profileId":21528706,"steamId":"76561199807794879","name":"\u534A\u6708\u56DE\u6DD1","rating":2129,"rank":400,"wins":585,"losses":494,"streak":5,"countryCode":"CN"},{"profileId":13144794,"steamId":"","name":"Roxola1285","rating":2128,"rank":401,"wins":416,"losses":383,"streak":3,"countryCode":"AR"},{"profileId":3295803,"steamId":"76561198967905993","name":"Tumber","rating":2127,"rank":402,"wins":1486,"losses":1398,"streak":2,"countryCode":"AR"},{"profileId":10275400,"steamId":"76561199305735423","name":"CNZS_Xzzz","rating":2126,"rank":403,"wins":133,"losses":65,"streak":-2,"countryCode":"CN"},{"profileId":2272449,"steamId":"76561198253261765","name":"\u6C5F\u4E1C\u5C0F\u9738\u738B","rating":2126,"rank":404,"wins":1631,"losses":1454,"streak":1,"countryCode":"CN"},{"profileId":12191318,"steamId":"76561199467806279","name":"Player_3","rating":2125,"rank":405,"wins":257,"losses":194,"streak":-1,"countryCode":"DE"},{"profileId":3025516,"steamId":"76561199033655407","name":"Zionic","rating":2125,"rank":406,"wins":2318,"losses":2191,"streak":4,"countryCode":"CN"},{"profileId":2194634,"steamId":"76561198992862323","name":"squashy5000","rating":2125,"rank":407,"wins":1693,"losses":1636,"streak":-1,"countryCode":"NL"},{"profileId":209917,"steamId":"76561198262851995","name":"Envetel","rating":2124,"rank":408,"wins":832,"losses":759,"streak":1,"countryCode":"CN"},{"profileId":6758959,"steamId":"76561199210119322","name":"sansarr_","rating":2123,"rank":409,"wins":480,"losses":366,"streak":-1,"countryCode":"TR"},{"profileId":559085,"steamId":"76561198342056971","name":"NuclearPasta","rating":2123,"rank":410,"wins":703,"losses":623,"streak":3,"countryCode":"CA"},{"profileId":555887,"steamId":"76561198107192611","name":"Honeybadger","rating":2123,"rank":411,"wins":182,"losses":130,"streak":2,"countryCode":"US"},{"profileId":11441215,"steamId":"76561199412958998","name":"squashy_aoe","rating":2122,"rank":412,"wins":408,"losses":330,"streak":1,"countryCode":"IN"},{"profileId":20663822,"steamId":"76561199764884290","name":"Iris","rating":2122,"rank":413,"wins":683,"losses":647,"streak":-1,"countryCode":"TW"},{"profileId":212135,"steamId":"76561198073316715","name":"Poxo","rating":2121,"rank":414,"wins":1167,"losses":1104,"streak":1,"countryCode":"ES"},{"profileId":1326441,"steamId":"76561198890660343","name":"Bass Is Heavy","rating":2121,"rank":415,"wins":3854,"losses":3721,"streak":8,"countryCode":"AR"},{"profileId":16072266,"steamId":"76561199535326839","name":"Jan Itor","rating":2120,"rank":416,"wins":129,"losses":61,"streak":10,"countryCode":"DE"},{"profileId":260921,"steamId":"76561198008604682","name":"nC_Future","rating":2120,"rank":417,"wins":4554,"losses":4482,"streak":1,"countryCode":"DE"},{"profileId":12249685,"steamId":"76561198099474226","name":"JOJO ROAD ROLLER","rating":2120,"rank":418,"wins":1903,"losses":1750,"streak":1,"countryCode":"US"},{"profileId":4576272,"steamId":"76561198846550648","name":"[CL] el castigador","rating":2120,"rank":419,"wins":2087,"losses":1945,"streak":2,"countryCode":"CL"},{"profileId":2897756,"steamId":"76561198088613720","name":"GGOut","rating":2120,"rank":420,"wins":1350,"losses":1286,"streak":-1,"countryCode":"SE"},{"profileId":5636956,"steamId":"76561199063154130","name":"YouAreNotAlone_","rating":2119,"rank":421,"wins":394,"losses":331,"streak":2,"countryCode":"AR"},{"profileId":2573480,"steamId":"76561199005265134","name":"Arsenic","rating":2119,"rank":422,"wins":757,"losses":645,"streak":1,"countryCode":"TW"},{"profileId":20719128,"steamId":"76561199769267931","name":"2459458787","rating":2119,"rank":423,"wins":228,"losses":160,"streak":4,"countryCode":"CN"},{"profileId":3313294,"steamId":"76561198257929749","name":"Lea","rating":2117,"rank":424,"wins":1234,"losses":1111,"streak":1,"countryCode":"AR"},{"profileId":733435,"steamId":"76561198818450120","name":"Legion64","rating":2116,"rank":425,"wins":2317,"losses":2197,"streak":-1,"countryCode":"IN"},{"profileId":1476288,"steamId":"76561199020734869","name":"MelkorAJ","rating":2116,"rank":426,"wins":2843,"losses":2804,"streak":-3,"countryCode":"SI"},{"profileId":23000509,"steamId":"76561198139641649","name":"boanaan","rating":2116,"rank":427,"wins":1122,"losses":1027,"streak":4,"countryCode":"NL"},{"profileId":508080,"steamId":"76561198327604853","name":"RoR | AngelinaJolie","rating":2114,"rank":428,"wins":1173,"losses":908,"streak":1,"countryCode":"NL"},{"profileId":14614937,"steamId":"76561199314786165","name":"\u6CE8\u6C34\u732A\u8089","rating":2113,"rank":429,"wins":231,"losses":164,"streak":2,"countryCode":"CN"},{"profileId":209204,"steamId":"76561198136062883","name":"ITA | Killer_Storm_","rating":2113,"rank":430,"wins":579,"losses":464,"streak":3,"countryCode":"IT"},{"profileId":1655684,"steamId":"76561199024989255","name":"z\u9752\u9E1F127","rating":2113,"rank":431,"wins":761,"losses":674,"streak":2,"countryCode":"CN"},{"profileId":790834,"steamId":"76561198366760901","name":"ANKR.Rory","rating":2112,"rank":432,"wins":237,"losses":117,"streak":1,"countryCode":"TW"},{"profileId":652173,"steamId":"76561198094665376","name":"Riveryyy","rating":2112,"rank":433,"wins":1044,"losses":946,"streak":1,"countryCode":"RU"},{"profileId":2016787,"steamId":"76561198387914287","name":"Pato Lucas","rating":2112,"rank":434,"wins":2555,"losses":2441,"streak":-1,"countryCode":"AR"},{"profileId":25273866,"steamId":"76561198712056324","name":"gupo57","rating":2110,"rank":435,"wins":429,"losses":370,"streak":2,"countryCode":"JP"},{"profileId":727835,"steamId":"76561198276454483","name":"Kalpit00","rating":2109,"rank":436,"wins":2494,"losses":2446,"streak":2,"countryCode":"US"},{"profileId":20844103,"steamId":"76561199781333353","name":"[CL] castiii","rating":2109,"rank":437,"wins":326,"losses":247,"streak":3,"countryCode":"CL"},{"profileId":11774083,"steamId":"76561199439208050","name":"ButterNToastThe3rd","rating":2108,"rank":438,"wins":388,"losses":299,"streak":2,"countryCode":"BD"},{"profileId":19844462,"steamId":"76561199691299143","name":"FMG | Esteban","rating":2108,"rank":439,"wins":650,"losses":594,"streak":-3,"countryCode":"UY"},{"profileId":23217628,"steamId":"76561199872960782","name":"Tio GG  El imperio contraataca","rating":2107,"rank":440,"wins":188,"losses":128,"streak":1,"countryCode":"PE"},{"profileId":4797984,"steamId":"76561198822411126","name":"\u82E6\u4FEE","rating":2106,"rank":441,"wins":106,"losses":49,"streak":2,"countryCode":"CN"},{"profileId":917863,"steamId":"76561198798740253","name":"hK | Romell13","rating":2105,"rank":442,"wins":1670,"losses":1535,"streak":2,"countryCode":"MX"},{"profileId":2577008,"steamId":"76561198125573029","name":"ShaDoWn","rating":2105,"rank":443,"wins":695,"losses":619,"streak":5,"countryCode":"FR"},{"profileId":22099280,"steamId":"76561199692084234","name":"\u9999\u591A\u6770","rating":2105,"rank":444,"wins":529,"losses":470,"streak":-1,"countryCode":"CN"},{"profileId":4599026,"steamId":"76561198201800170","name":"\u0160teuko","rating":2104,"rank":445,"wins":1662,"losses":1577,"streak":-1,"countryCode":"SK"},{"profileId":959109,"steamId":"76561198826803794","name":"PlaYBoY","rating":2104,"rank":446,"wins":1209,"losses":1103,"streak":-1,"countryCode":"BR"},{"profileId":3387238,"steamId":"76561198940691854","name":"WackieChan_","rating":2104,"rank":447,"wins":427,"losses":330,"streak":9,"countryCode":"BD"},{"profileId":2524306,"steamId":"76561198005822338","name":"Retember","rating":2104,"rank":448,"wins":895,"losses":857,"streak":3,"countryCode":"CO"},{"profileId":581759,"steamId":"76561198041760221","name":"DasLetzte","rating":2103,"rank":449,"wins":1908,"losses":1806,"streak":2,"countryCode":"DE"},{"profileId":4422117,"steamId":"76561198066947162","name":"Monkey Boy","rating":2103,"rank":450,"wins":654,"losses":559,"streak":-1,"countryCode":"DE"},{"profileId":3180554,"steamId":"76561198995230048","name":"H\u841D\u535C","rating":2102,"rank":451,"wins":682,"losses":587,"streak":-1,"countryCode":"CN"},{"profileId":23681799,"steamId":"76561198790639941","name":"Ugnis","rating":2102,"rank":452,"wins":125,"losses":62,"streak":5,"countryCode":"GT"},{"profileId":1743420,"steamId":"76561198833808414","name":"NuMa | OliverAtom","rating":2101,"rank":453,"wins":3908,"losses":3868,"streak":-1,"countryCode":"CO"},{"profileId":6410880,"steamId":"76561199205153778","name":"Man_at_Laptop","rating":2100,"rank":454,"wins":1146,"losses":1071,"streak":2,"countryCode":"CO"},{"profileId":5424138,"steamId":"76561198114210091","name":"Speed","rating":2100,"rank":455,"wins":1448,"losses":1363,"streak":-2,"countryCode":"MT"},{"profileId":3141220,"steamId":"76561198898474173","name":"Muzio","rating":2100,"rank":456,"wins":778,"losses":710,"streak":4,"countryCode":"US"},{"profileId":2925148,"steamId":"76561199067292136","name":"be water my friend","rating":2100,"rank":457,"wins":1761,"losses":1649,"streak":3,"countryCode":"CN"},{"profileId":2825261,"steamId":"76561199065576320","name":"VL Tou","rating":2100,"rank":458,"wins":1749,"losses":1656,"streak":2,"countryCode":"CO"},{"profileId":9865998,"steamId":"76561199260907502","name":"wappla","rating":2099,"rank":459,"wins":1061,"losses":997,"streak":1,"countryCode":"US"},{"profileId":222102,"steamId":"76561198107361309","name":"NOC | Annotoph","rating":2099,"rank":460,"wins":266,"losses":164,"streak":4,"countryCode":"DE"},{"profileId":281038,"steamId":"76561198042200507","name":"Ezio","rating":2098,"rank":461,"wins":2751,"losses":2602,"streak":-5,"countryCode":"DE"},{"profileId":20556036,"steamId":"76561199757254736","name":"Luo_CiHun","rating":2098,"rank":462,"wins":252,"losses":189,"streak":1,"countryCode":"US"},{"profileId":5936228,"steamId":"76561198088305382","name":"NicoDA","rating":2096,"rank":463,"wins":2479,"losses":2353,"streak":-3,"countryCode":"AR"},{"profileId":18598248,"steamId":"76561199618806121","name":"DS_ViejoChoto","rating":2096,"rank":464,"wins":600,"losses":499,"streak":1,"countryCode":"UY"},{"profileId":15629212,"steamId":"76561199524791413","name":"3046964519","rating":2095,"rank":465,"wins":935,"losses":826,"streak":6,"countryCode":"CN"},{"profileId":2294850,"steamId":"76561198157231086","name":"Chelo","rating":2095,"rank":466,"wins":2546,"losses":2391,"streak":1,"countryCode":"AR"},{"profileId":1117520,"steamId":"76561198840710960","name":"SSNoyer","rating":2094,"rank":467,"wins":763,"losses":661,"streak":4,"countryCode":"CA"},{"profileId":209753,"steamId":"76561198880475732","name":"UX","rating":2094,"rank":468,"wins":1053,"losses":936,"streak":-1,"countryCode":"CN"},{"profileId":2810993,"steamId":"76561198057560347","name":"Grabwespe","rating":2094,"rank":469,"wins":1368,"losses":1281,"streak":1,"countryCode":"DE"},{"profileId":2411454,"steamId":"76561199047900165","name":"\u795E\u660E\u4E0E\u5979","rating":2094,"rank":470,"wins":560,"losses":442,"streak":-1,"countryCode":"AR"},{"profileId":1947348,"steamId":"76561198857332668","name":"VEN\xD3N | Uxiono","rating":2094,"rank":471,"wins":442,"losses":347,"streak":-3,"countryCode":"MX"},{"profileId":1021651,"steamId":"76561198396796451","name":"[bK] Faraday__","rating":2093,"rank":472,"wins":848,"losses":733,"streak":-1,"countryCode":"BR"},{"profileId":10840748,"steamId":"76561198034475441","name":"DK | Mauseren","rating":2092,"rank":473,"wins":1549,"losses":1462,"streak":1,"countryCode":"DK"},{"profileId":3193084,"steamId":"76561198849608197","name":"\u53EF\u611B\u6D17\u9762\u5976","rating":2092,"rank":474,"wins":1755,"losses":1640,"streak":-4,"countryCode":"CN"},{"profileId":2422210,"steamId":"76561198046579350","name":"Quix","rating":2091,"rank":475,"wins":578,"losses":482,"streak":1,"countryCode":"US"},{"profileId":3683520,"steamId":"76561198070094544","name":"Elacrai","rating":2090,"rank":476,"wins":502,"losses":430,"streak":1,"countryCode":"CH"},{"profileId":2814500,"steamId":"76561199064941239","name":"DGHIR | ZARC","rating":2090,"rank":477,"wins":2332,"losses":2216,"streak":2,"countryCode":"CL"},{"profileId":1273839,"steamId":"76561198856814499","name":"185 godfish","rating":2090,"rank":478,"wins":851,"losses":774,"streak":-2,"countryCode":"CN"},{"profileId":20627516,"steamId":"76561199681990379","name":"last\u8F9B\u795E\u4E36","rating":2089,"rank":479,"wins":180,"losses":122,"streak":2,"countryCode":"CN"},{"profileId":254645,"steamId":"76561197989252667","name":"avlid","rating":2088,"rank":480,"wins":1387,"losses":1311,"streak":-1,"countryCode":"SE"},{"profileId":23368203,"steamId":"76561199881391383","name":"SharkLab","rating":2088,"rank":481,"wins":175,"losses":115,"streak":2,"countryCode":"FR"},{"profileId":226697,"steamId":"76561198102088260","name":"DemonSheep","rating":2085,"rank":482,"wins":1384,"losses":1186,"streak":1,"countryCode":"TW"},{"profileId":24453600,"steamId":"76561198759769167","name":"< blank >","rating":2085,"rank":483,"wins":255,"losses":190,"streak":-1,"countryCode":"TR"},{"profileId":18148390,"steamId":"76561198086626993","name":"DS_Alec","rating":2085,"rank":484,"wins":1002,"losses":919,"streak":1,"countryCode":"UY"},{"profileId":22743349,"steamId":"76561199853690850","name":"Ciro Marchesi","rating":2083,"rank":485,"wins":163,"losses":100,"streak":1,"countryCode":"IT"},{"profileId":10833211,"steamId":"76561199379709325","name":"mongo","rating":2081,"rank":486,"wins":1595,"losses":1500,"streak":-1,"countryCode":"CN"},{"profileId":24486592,"steamId":"76561198758281343","name":"tigerdownhill_","rating":2081,"rank":487,"wins":171,"losses":124,"streak":9,"countryCode":"VN"},{"profileId":1016523,"steamId":"76561198091040819","name":"Y","rating":2080,"rank":488,"wins":777,"losses":744,"streak":-2,"countryCode":"AR"},{"profileId":2105052,"steamId":"76561199040566014","name":"Kerchak","rating":2080,"rank":489,"wins":420,"losses":359,"streak":3,"countryCode":"CA"},{"profileId":22003517,"steamId":"76561198399576689","name":"hK | FraKTal","rating":2080,"rank":490,"wins":397,"losses":326,"streak":-2,"countryCode":"MX"},{"profileId":3302487,"steamId":"76561199085643802","name":"AceRx","rating":2079,"rank":491,"wins":707,"losses":593,"streak":15,"countryCode":"AR"},{"profileId":369122,"steamId":"76561198103474760","name":"Juyhou","rating":2079,"rank":492,"wins":304,"losses":220,"streak":-1,"countryCode":"FI"},{"profileId":25040970,"steamId":"76561198824853654","name":"Lakhdher","rating":2079,"rank":493,"wins":152,"losses":100,"streak":2,"countryCode":"DE"},{"profileId":23417084,"steamId":"76561199883607514","name":"\u5C55\u6BC5^-^","rating":2079,"rank":494,"wins":143,"losses":96,"streak":3,"countryCode":"FR"},{"profileId":280742,"steamId":"76561198358412384","name":"Ovenka","rating":2078,"rank":495,"wins":569,"losses":465,"streak":-1,"countryCode":"CZ"},{"profileId":23032522,"steamId":"76561199865619087","name":"La Ultima Gonorrea del Desierto","rating":2078,"rank":496,"wins":180,"losses":122,"streak":1,"countryCode":"PE"},{"profileId":9766616,"steamId":"76561199252532294","name":"TheZero","rating":2076,"rank":497,"wins":209,"losses":116,"streak":1,"countryCode":"CN"},{"profileId":5832372,"steamId":"76561198201294534","name":"Patoshiq","rating":2076,"rank":498,"wins":1389,"losses":1298,"streak":-1,"countryCode":"TR"},{"profileId":210372,"steamId":"76561198036054306","name":"Hiko_Seijuro","rating":2076,"rank":499,"wins":2005,"losses":1833,"streak":4,"countryCode":"BE"},{"profileId":1334898,"steamId":"76561198387843915","name":"[LuB]myqbox","rating":2076,"rank":500,"wins":1702,"losses":1635,"streak":1,"countryCode":"TW"}]`), tg = {
    players: eg
  }, ag = {
    "arabia.png": Bp,
    "land-madness.png": Fp,
    "acropolis.png": Up,
    "african-clearing.png": Op,
    "atacama.png": Hp,
    "gold-rush.png": Zp,
    "land-nomad.png": $p,
    "arena.png": qp,
    "fortified-clearing.png": Qp,
    "hideout.png": Kp,
    "black-forest.png": Yp,
    "michi.png": Pp,
    "four-lakes.png": Xp,
    "baltic.png": Gp,
    "islands.png": Jp,
    "mediterranean.png": Wp,
    "golden-swamp.png": Vp
  }, rn = Cc.map((r) => ({
    id: r.id,
    name: r.name,
    style: r.style,
    thumbnailUrl: ag[r.imageAsset]
  })), on = Et.groups.map((r) => ({
    ...r,
    maps: rn.filter((c) => {
      var _a2;
      return ((_a2 = Et.maps.find((f) => f.id === c.id)) == null ? void 0 : _a2.groupId) === r.id;
    })
  })), Ia = {
    id: "user-1",
    aoeProfileId: 12345678,
    displayName: "EmpireSum",
    countryCode: "US",
    rating: 1426,
    peakRating: 1511,
    teamRating: 1378,
    teamPeakRating: 1442,
    legacy1v1Wins: 284,
    legacy1v1Losses: 241,
    legacyTeamWins: 149,
    legacyTeamLosses: 130,
    rank: 8421,
    division: "Diamond",
    wins: 284,
    losses: 241,
    winRate: 54.1,
    streak: 3,
    preferredMaps: [
      "Arabia",
      "Runestones",
      "Gold Rush"
    ],
    favoriteCivilizations: [
      "Mayans",
      "Lithuanians",
      "Britons"
    ],
    recentForm: [
      "win",
      "win",
      "loss",
      "win",
      "win"
    ]
  }, xc = tg.players.map((r) => {
    const c = r.wins, f = r.losses;
    return {
      id: `aoe-${r.profileId}`,
      aoeProfileId: r.profileId,
      steamId: r.steamId || void 0,
      displayName: r.name || `Player ${r.profileId}`,
      countryCode: r.countryCode || void 0,
      rating: r.rating,
      peakRating: r.rating,
      teamRating: 0,
      teamPeakRating: 0,
      legacy1v1Wins: c,
      legacy1v1Losses: f,
      legacyTeamWins: 0,
      legacyTeamLosses: 0,
      rank: r.rank,
      division: En(r.rating),
      wins: c,
      losses: f,
      winRate: Number((c / (c + f) * 100).toFixed(1)),
      streak: r.streak,
      preferredMaps: [],
      favoriteCivilizations: [],
      recentForm: []
    };
  }), L1 = xc.filter((r) => r.id !== Ia.id).slice(10, 18);
  Object.fromEntries(Cc.map((r) => [
    r.gameMapName,
    r.lobbyPickerResultIndex
  ]));
  const ng = Cc.filter((r) => r.isCustomMap).map((r) => r.gameMapName), oa = {
    actions: {
      multiplayer: {
        settleMs: 2e3
      },
      hostGame: {
        settleMs: 2e3
      },
      createLobby: {
        settleMs: 8e3
      },
      copyLobbyUri: {
        settleMs: 1e3
      },
      guestReady: {
        settleMs: 1e3,
        hoverMs: 250,
        holdMs: 250
      },
      hostReady: {
        settleMs: 1e3,
        hoverMs: 250,
        holdMs: 250
      },
      startGame: {
        settleMs: 2e3,
        hoverMs: 250,
        holdMs: 250
      },
      confirmCivilization: {
        settleMs: 1e3
      },
      confirmGuestContent: {
        settleMs: 750
      }
    },
    civilizationSlotButtons: {
      settleMs: 1500
    },
    civilizationPicker: {
      searchSettleMs: 1e3,
      selectionSettleMs: 750
    },
    mapPicker: {
      customMapNames: ng,
      openSettleMs: 1e3,
      styleMenuSettleMs: 500,
      styleSelectionSettleMs: 1e3,
      searchSettleMs: 750,
      selectionSettleMs: 1e3
    },
    civilizationGrid: {
      hoverMs: 250,
      holdMs: 250
    }
  }, sg = 150, U1 = 4e3, Qe = {
    hostLobbyAutomationSettleMs: 2e3,
    multiplayerMenuMs: 1e3,
    hostGameMenuMs: 2e3,
    lobbyCreationMs: 8e3,
    resetFocusMs: 250,
    resetConfirmationMs: 1e3,
    clipboardReadMs: 800,
    lobbyMetadataMs: 700,
    guestJoinMs: 1e4,
    guestReadySettleMs: 2e3,
    customMapTransferPollMs: 1500,
    customMapTransferTimeoutMs: 6e4,
    hostReadySettleMs: 2e3,
    hostReadyToStartMs: 1e3,
    startGameSettleMs: 2e3,
    revealAfterStartMs: 8e3
  }, ig = {
    queueWaitMs: 6e3,
    opponentAcceptDelayMs: 2500,
    lobbyCreationDelayMs: 1100,
    opponentJoinDelayMs: 1200,
    lobbyVerificationDelayMs: 1e3,
    matchDurationMs: 12e3,
    resultVerificationDelayMs: 1300,
    forceQueueFailure: false,
    forceOpponentDecline: false,
    forceGameNotInstalled: false,
    forceGameLaunchFailure: false,
    forceLobbyCreationFailure: false,
    forceLobbyVerificationFailure: false,
    forceOpponentJoinTimeout: false,
    forceResultVerificationFailure: false,
    forcedResult: void 0
  };
  function Ve(r) {
    return new Promise((c) => {
      window.setTimeout(c, r);
    });
  }
  function lg(r) {
    return `[${(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour12: false
    })}] ${r}`;
  }
  class rg {
    constructor(c) {
      this.getConfig = c;
    }
    async detectInstallation() {
      return await Ve(650), this.getConfig().forceGameNotInstalled ? {
        installed: false
      } : {
        installed: true,
        path: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\AoE2DE"
      };
    }
    async detectRunningGame() {
      return await Ve(500), {
        running: true,
        pid: 4242,
        owned: true
      };
    }
    async launchGame() {
      if (await Ve(700), this.getConfig().forceGameLaunchFailure) throw new Error("Game failed to launch.");
      return {
        launched: true,
        status: "running"
      };
    }
    async focusGame() {
      return await Ve(250), {
        focused: true
      };
    }
    async createLobby(c) {
      if (await Ve(this.getConfig().lobbyCreationDelayMs), this.getConfig().forceLobbyCreationFailure) throw new Error("Lobby creation timed out.");
      return {
        lobby: {
          platformLobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`,
          lobbyName: `Empire League ${c.matchId.slice(-4).toUpperCase()}`,
          password: "empire",
          hostProfileId: c.hostProfileId,
          guestProfileId: c.guestProfileId,
          map: c.map,
          settings: {
            playerCount: c.playerCount,
            gameMode: "Random Map",
            speed: "Normal",
            startingAge: "Dark Age",
            startingResources: "Standard",
            populationLimit: 200,
            victoryCondition: "Conquest",
            cheatsEnabled: false,
            recordGame: true,
            spectatorsAllowed: true,
            hiddenCivilizations: false
          },
          verification: {
            correctPlayers: true,
            correctMap: true,
            correctSettings: !this.getConfig().forceLobbyVerificationFailure,
            cheatsDisabled: true,
            recordingEnabled: true,
            noUnexpectedPlayers: true
          }
        }
      };
    }
    async discoverLobby(c) {
      return await Ve(500), {
        lobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`
      };
    }
    async openLobby(c) {
      return await Ve(250), {
        opened: true
      };
    }
    async verifyLobby(c) {
      if (await Ve(this.getConfig().lobbyVerificationDelayMs), this.getConfig().forceLobbyVerificationFailure) throw new Error("Lobby settings do not match the ranked ruleset.");
      return {
        verification: {
          correctPlayers: true,
          correctMap: true,
          correctSettings: true,
          cheatsDisabled: true,
          recordingEnabled: true,
          noUnexpectedPlayers: true
        }
      };
    }
    async waitForGameStart(c) {
      if (await Ve(this.getConfig().forceOpponentJoinTimeout ? 5e3 : this.getConfig().opponentJoinDelayMs), this.getConfig().forceOpponentJoinTimeout) throw new Error("Opponent failed to join the lobby.");
      return {
        started: true,
        startedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async detectGameEnd(c) {
      return await Ve(this.getConfig().matchDurationMs), {
        ended: true,
        endedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  const Ol = [
    "Armenians",
    "Aztecs",
    "Bengalis",
    "Berbers",
    "Bohemians",
    "Britons",
    "Bulgarians",
    "Burgundians",
    "Burmese",
    "Byzantines",
    "Celts",
    "Chinese",
    "Cumans",
    "Dravidians",
    "Ethiopians",
    "Franks",
    "Georgians",
    "Goths",
    "Gurjaras",
    "Hindustanis",
    "Huns",
    "Incas",
    "Italians",
    "Japanese",
    "Jurchens",
    "Khitans",
    "Khmer",
    "Koreans",
    "Lithuanians",
    "Magyars",
    "Malay",
    "Malians",
    "Mayans",
    "Mongols",
    "Persians",
    "Poles",
    "Portuguese",
    "Romans",
    "Saracens",
    "Sicilians",
    "Slavs",
    "Spanish",
    "Tatars",
    "Teutons",
    "Turks",
    "Vietnamese",
    "Vikings"
  ];
  function og(r, c, f = [], u = Math.random) {
    if ((r == null ? void 0 : r.mode) !== "random") return r;
    const m = c === "land-open" ? r.openLandBans : c === "land-closed" ? r.closedLandBans : [], h = /* @__PURE__ */ new Set([
      ...m ?? [],
      ...f
    ]), S = Ol.filter((M) => !h.has(M));
    return {
      mode: "pick",
      civilization: S[Math.floor(u() * S.length)]
    };
  }
  const cg = "http://192.168.4.99:4317".replace(/\/$/, "");
  class ug {
    constructor() {
      __publicField(this, "token", null);
      __publicField(this, "socket", null);
      __publicField(this, "connectPromise", null);
      __publicField(this, "connectResolve", null);
      __publicField(this, "connectReject", null);
      __publicField(this, "pending", /* @__PURE__ */ new Map());
      __publicField(this, "subscription", null);
      __publicField(this, "reconnectTimer", null);
      __publicField(this, "reconnectAttempts", 0);
      __publicField(this, "deliberatelyClosed", false);
      __publicField(this, "socialListeners", /* @__PURE__ */ new Set());
      __publicField(this, "customLobbyListeners", /* @__PURE__ */ new Set());
    }
    setToken(c) {
      this.token !== c && (this.token = c, this.disconnect("Authentication changed."));
    }
    async request(c, f = {}) {
      await this.connect();
      const u = this.socket;
      if (!u || u.readyState !== WebSocket.OPEN) throw new Error("Matchmaker connection is unavailable.");
      const m = crypto.randomUUID(), h = new Promise((S, M) => {
        this.pending.set(m, {
          resolve: (k) => S(k),
          reject: M
        });
      });
      return u.send(JSON.stringify({
        type: "request",
        id: m,
        method: f.method ?? "GET",
        path: c,
        body: f.body
      })), h;
    }
    subscribe(c, f) {
      return this.subscription = {
        ticketId: c,
        after: 0,
        listener: f
      }, this.connect().then(() => this.sendSubscription()).catch((u) => {
        this.failSubscription(u instanceof Error ? u.message : "Matchmaker connection failed.");
      }), () => {
        var _a2;
        ((_a2 = this.subscription) == null ? void 0 : _a2.ticketId) === c && (this.subscription = null), this.reconnectTimer !== null && window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
      };
    }
    onSocialEvent(c) {
      return this.socialListeners.add(c), () => this.socialListeners.delete(c);
    }
    onCustomLobbyEvent(c) {
      return this.customLobbyListeners.add(c), () => this.customLobbyListeners.delete(c);
    }
    connect() {
      var _a2;
      if (((_a2 = this.socket) == null ? void 0 : _a2.readyState) === WebSocket.OPEN && !this.connectPromise) return Promise.resolve();
      if (this.connectPromise) return this.connectPromise;
      this.deliberatelyClosed = false, this.connectPromise = new Promise((u, m) => {
        this.connectResolve = u, this.connectReject = m;
      });
      const c = new URL("/events", cg);
      c.protocol = c.protocol === "https:" ? "wss:" : "ws:";
      const f = new WebSocket(c);
      return this.socket = f, f.addEventListener("open", () => {
        this.token ? f.send(JSON.stringify({
          type: "authenticate",
          token: this.token
        })) : this.finishConnecting();
      }), f.addEventListener("message", (u) => this.onMessage(f, u)), f.addEventListener("error", () => f.close()), f.addEventListener("close", () => this.onClose(f)), this.connectPromise;
    }
    onMessage(c, f) {
      if (c !== this.socket) return;
      let u;
      try {
        u = JSON.parse(String(f.data));
      } catch {
        this.disconnect("The matchmaker sent invalid data.");
        return;
      }
      if (u.type === "authenticated") {
        this.finishConnecting();
        return;
      }
      if (u.type === "social_event" && u.event) {
        for (const m of this.socialListeners) m(u.event);
        return;
      }
      if (u.type === "custom_lobby_event" && u.event) {
        for (const m of this.customLobbyListeners) m(u.event);
        return;
      }
      if (u.type === "response" && u.id) {
        const m = this.pending.get(u.id);
        if (!m) return;
        if (this.pending.delete(u.id), (u.status ?? 500) >= 400) {
          const h = u.body;
          m.reject(new Error((h == null ? void 0 : h.error) ?? `Matchmaker request failed (${u.status}).`));
        } else m.resolve(u.body);
        return;
      }
      if (u.type === "subscribed") {
        this.reconnectAttempts = 0;
        return;
      }
      if (u.type === "event" && this.subscription && u.ticketId === this.subscription.ticketId && u.event && Number.isSafeInteger(u.sequence)) {
        this.subscription.after = Math.max(this.subscription.after, u.sequence ?? 0), this.subscription.listener(u.event);
        return;
      }
      if (u.type === "error") {
        const m = u.message ?? u.code ?? "Matchmaker WebSocket error.";
        this.connectReject ? this.rejectConnecting(new Error(m)) : this.failSubscription(m, u.code);
      }
    }
    finishConnecting() {
      const c = this.connectResolve;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, this.reconnectAttempts = 0, c == null ? void 0 : c(), this.sendSubscription();
    }
    rejectConnecting(c) {
      const f = this.connectReject;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, f == null ? void 0 : f(c);
    }
    sendSubscription() {
      var _a2;
      !this.subscription || ((_a2 = this.socket) == null ? void 0 : _a2.readyState) !== WebSocket.OPEN || this.socket.send(JSON.stringify({
        type: "subscribe",
        ticketId: this.subscription.ticketId,
        after: this.subscription.after
      }));
    }
    onClose(c) {
      if (c !== this.socket) return;
      this.socket = null, this.rejectConnecting(new Error("Matchmaker connection closed."));
      for (const u of this.pending.values()) u.reject(new Error("Matchmaker connection closed."));
      if (this.pending.clear(), this.deliberatelyClosed || !this.subscription) return;
      if (this.reconnectAttempts += 1, this.reconnectAttempts > 5) {
        this.failSubscription("The connection to the matchmaker was lost.");
        return;
      }
      const f = Math.min(500 * 2 ** (this.reconnectAttempts - 1), 8e3) + Math.floor(Math.random() * 250);
      this.reconnectTimer = window.setTimeout(() => void this.connect().catch(() => {
      }), f);
    }
    disconnect(c) {
      var _a2;
      this.deliberatelyClosed = true, (_a2 = this.socket) == null ? void 0 : _a2.close(1e3, c), this.socket = null, this.rejectConnecting(new Error(c));
      for (const f of this.pending.values()) f.reject(new Error(c));
      this.pending.clear();
    }
    failSubscription(c, f = "MATCHMAKER_UNAVAILABLE") {
      const u = this.subscription;
      this.subscription = null, u == null ? void 0 : u.listener({
        type: "error",
        code: f,
        message: c
      });
    }
  }
  const xe = new ug();
  class dg {
    constructor(c) {
      __publicField(this, "listeners", /* @__PURE__ */ new Map());
      __publicField(this, "timers", /* @__PURE__ */ new Map());
      __publicField(this, "queuedDefinitions", /* @__PURE__ */ new Map());
      __publicField(this, "queueRatings", /* @__PURE__ */ new Map());
      __publicField(this, "lowerRatingLimits", /* @__PURE__ */ new Map());
      this.getConfig = c;
    }
    async joinQueue(c) {
      var _a2;
      if (await Ve(350), this.getConfig().forceQueueFailure) throw new Error("Matchmaking service is unavailable.");
      if (!((_a2 = c.queue) == null ? void 0 : _a2.mapPool.length)) throw new Error("At least one selected map is required.");
      const f = {
        id: `ticket-${crypto.randomUUID()}`,
        queueId: c.queueId,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return this.queuedDefinitions.set(f.id, c.queue), this.queueRatings.set(f.id, c.queue.format === "team" ? c.player.teamRating : c.player.rating), this.lowerRatingLimits.set(f.id, c.maximumLowerOpponentRatingGap ?? 0), f;
    }
    async updateQueue(c, f) {
      if (await Ve(75), !this.queuedDefinitions.has(c)) throw new Error("Queue ticket is no longer active.");
      if (!f.mapPool.length) throw new Error("At least one selected map is required.");
      this.queuedDefinitions.set(c, f);
    }
    async leaveQueue(c) {
      await Ve(150), this.clearTimers(c), this.listeners.delete(c), this.queuedDefinitions.delete(c), this.queueRatings.delete(c), this.lowerRatingLimits.delete(c);
    }
    subscribeToQueue(c, f) {
      this.listeners.set(c, f);
      const u = this.queuedDefinitions.get(c), m = this.getConfig(), h = [];
      return [
        0,
        2e4,
        4e4,
        6e4,
        9e4
      ].forEach((S, M) => {
        h.push(window.setTimeout(() => {
          const k = [
            50,
            75,
            100,
            150,
            250
          ][M], g = this.queueRatings.get(c) ?? Ia.rating;
          f({
            type: "range",
            minRating: g - k,
            maxRating: g + k
          });
        }, S));
      }), h.push(window.setTimeout(() => {
        var _a2;
        const S = this.queuedDefinitions.get(c) ?? u, M = (S == null ? void 0 : S.mapPool) ?? rn, k = {
          mapPool: rn,
          mapPreferences: {
            favoriteMapIds: {}
          }
        }, g = this.lowerRatingLimits.get(c) ?? 0, x = g > 0 ? L1.filter((V) => V.rating >= Ia.rating - g) : L1, z = x[Math.floor(Math.random() * x.length)];
        if (!z) return;
        const Y = Lp(S ?? {
          mapPool: M
        }, k), q = (_a2 = Et.maps.find((V) => V.id === (Y == null ? void 0 : Y.id))) == null ? void 0 : _a2.groupId, p = S ? {
          ...S,
          civilizationPreference: og(S.civilizationPreference, q)
        } : void 0, $ = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: p ?? {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: rn,
            mapPreferences: {
              enabledGroupIds: Et.groups.map((V) => V.id),
              favoriteMapIds: {}
            },
            mapCatalogVersion: Et.version,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          opponentCivilizationPreference: {
            mode: "pick",
            civilization: "Franks"
          },
          player: Ia,
          opponent: z,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 3e4).toISOString(),
          selectedMap: Y,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        f({
          type: "match_found",
          match: $
        });
      }, m.queueWaitMs)), this.timers.set(c, h), () => {
        this.clearTimers(c), this.listeners.delete(c), this.queuedDefinitions.delete(c), this.lowerRatingLimits.delete(c);
      };
    }
    async acceptMatch(c) {
      await Ve(250);
      const f = this.getConfig();
      if (f.forceOpponentDecline) throw new Error("Opponent declined the match.");
      window.setTimeout(() => {
        this.listeners.forEach((u) => u({
          type: "opponent_accepted",
          matchId: c
        }));
      }, f.opponentAcceptDelayMs);
    }
    async declineMatch(c) {
      await Ve(200);
    }
    async publishLobby(c, f) {
      await Ve(100);
    }
    async reportGuestLobbyJoined(c) {
      await Ve(100);
    }
    async reportHostLobbyReady(c) {
      await Ve(100);
    }
    async reportGuestContentAccepted(c) {
      await Ve(100);
    }
    async reportGuestLobbyReady(c) {
      await Ve(100);
    }
    async reportGameStarted(c) {
      await Ve(100);
    }
    async reportMatchResult(c) {
      await Ve(100);
    }
    clearTimers(c) {
      var _a2;
      (_a2 = this.timers.get(c)) == null ? void 0 : _a2.forEach((f) => window.clearTimeout(f)), this.timers.delete(c);
    }
  }
  class fg {
    constructor(c) {
      __publicField(this, "status", /* @__PURE__ */ new Map());
      this.getConfig = c;
    }
    async beginTracking(c) {
      await Ve(200), this.status.set(c.id, {
        matchId: c.id,
        stage: "in_game",
        message: "Match in progress"
      });
    }
    async getMatchStatus(c) {
      return await Ve(100), this.status.get(c) ?? {
        matchId: c,
        stage: "in_game",
        message: "Match in progress"
      };
    }
    async waitForVerifiedResult(c) {
      const f = [
        {
          matchId: c,
          stage: "game_finished",
          message: "Game finished"
        },
        {
          matchId: c,
          stage: "waiting_for_data",
          message: "Waiting for official match data"
        },
        {
          matchId: c,
          stage: "result_located",
          message: "Result located"
        },
        {
          matchId: c,
          stage: "players_verified",
          message: "Players verified"
        },
        {
          matchId: c,
          stage: "winner_verified",
          message: "Winner verified"
        },
        {
          matchId: c,
          stage: "rating_updated",
          message: "Rating updated"
        }
      ];
      for (const h of f) await Ve(this.getConfig().resultVerificationDelayMs), this.status.set(c, h);
      if (this.getConfig().forceResultVerificationFailure) throw this.status.set(c, {
        matchId: c,
        stage: "failed",
        message: "Result verification failed"
      }), new Error("Result service could not verify the winner.");
      const u = this.getConfig().forcedResult ?? (Math.random() > 0.38 ? "win" : "loss"), m = u === "win" ? 16 : u === "loss" ? -14 : 0;
      return {
        ratingPool: "solo",
        winnerProfileId: u === "loss" ? 990011 : 12345678,
        loserProfileId: u === "loss" ? 12345678 : 990011,
        outcome: u,
        reason: u === "no_contest" ? "unknown" : u === "loss" ? "defeat" : "resignation",
        oldRating: 1426,
        newRating: 1426 + m,
        ratingChange: m,
        verified: u !== "no_contest",
        verificationSource: "mock"
      };
    }
    async submitReplay(c) {
      return await Ve(500), {
        uploaded: true,
        replayId: `replay-${crypto.randomUUID().slice(0, 8)}`
      };
    }
  }
  let ps = null;
  const Dl = {
    async restore() {
      var _a2;
      if (ps = await ((_a2 = window.electronApi) == null ? void 0 : _a2.loadAuthToken()) ?? null, !ps) return null;
      xe.setToken(ps);
      try {
        const r = (await xe.request("/auth/me")).player;
        return await this.reportSteamLicense(r);
      } catch {
        return await this.logout(false), null;
      }
    },
    async signIn() {
      const r = await xe.request("/auth/steam/start", {
        method: "POST"
      });
      if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
      await window.electronApi.openSteamLogin(r.loginUrl);
      const c = Date.now() + 300 * 1e3;
      for (; Date.now() < c; ) {
        await new Promise((m) => window.setTimeout(m, 1e3));
        const f = await xe.request(`/auth/steam/status?attempt=${encodeURIComponent(r.attemptId)}&token=${encodeURIComponent(r.pollToken)}`);
        if (f.status === "pending") continue;
        if (f.status !== "authenticated" || !f.token) throw new Error(`Steam sign-in ${f.status}.`);
        ps = f.token, await window.electronApi.storeAuthToken(f.token), xe.setToken(f.token);
        const u = await xe.request("/auth/me");
        return await this.reportSteamLicense(u.player);
      }
      throw new Error("Steam sign-in timed out.");
    },
    async reportSteamLicense(r) {
      var _a2;
      if (!window.electronApi || !r.steamId) return r;
      const c = await window.electronApi.runSteamFamilyProbe(r.steamId).catch(() => null);
      return !c || c.status === "unknown" || !c.currentSteamId || !c.ownerSteamId ? r : ((_a2 = await xe.request("/auth/steam-license", {
        method: "POST",
        body: {
          status: c.status,
          currentSteamId: c.currentSteamId,
          ownerSteamId: c.ownerSteamId
        }
      }).catch(() => null)) == null ? void 0 : _a2.player) ?? r;
    },
    async logout(r = true) {
      var _a2;
      r && ps && await xe.request("/auth/logout", {
        method: "POST"
      }).catch(() => {
      }), ps = null, xe.setToken(null), await ((_a2 = window.electronApi) == null ? void 0 : _a2.clearAuthToken());
    }
  }, Bl = new URLSearchParams(window.location.search), ge = Bl.get("preview") === "1", mg = ge && Bl.get("capture") === "1", O1 = ge ? Bl.get("page") : null, hg = ge ? Bl.get("section") : null, pm = {
    lockTeams: true,
    teamTogether: true,
    teamPositions: false,
    sharedExploration: false,
    lockSpeed: true,
    allowHandicap: false,
    allowCheats: false,
    turboMode: false,
    fullTechTree: false,
    empireWarsMode: false,
    suddenDeathMode: false,
    regicideMode: false,
    antiquityMode: false,
    recordGame: true
  }, Mc = [
    [
      "match-1",
      "StoneGate21",
      1452,
      "win",
      "Arabia",
      "Byzantines",
      "Franks",
      16,
      31
    ],
    [
      "match-2",
      "RelicRunner18",
      1438,
      "loss",
      "Arena",
      "Britons",
      "Bohemians",
      -15,
      42
    ],
    [
      "match-3",
      "ScoutRush34",
      1409,
      "win",
      "Land Nomad",
      "Mongols",
      "Mayans",
      14,
      36
    ],
    [
      "match-4",
      "WallBuilder27",
      1471,
      "win",
      "Acropolis",
      "Lithuanians",
      "Japanese",
      17,
      28
    ],
    [
      "match-5",
      "FastImp19",
      1418,
      "loss",
      "Four Lakes",
      "Mayans",
      "Hindustanis",
      -14,
      39
    ],
    [
      "match-6",
      "MonkMicro42",
      1397,
      "win",
      "Hideout",
      "Poles",
      "Aztecs",
      13,
      34
    ],
    [
      "match-7",
      "BoarPuller16",
      1444,
      "win",
      "Golden Swamp",
      "Japanese",
      "Byzantines",
      16,
      29
    ]
  ].map(([r, c, f, u, m, h, S, M, k], g) => ({
    id: String(r),
    opponentId: `preview-player-${g + 1}`,
    opponent: String(c),
    opponentRating: Number(f),
    outcome: u,
    map: String(m),
    civilization: String(h),
    opponentCivilization: String(S),
    ratingChange: Number(M),
    durationMinutes: Number(k),
    timestamp: new Date(Date.now() - g * 864e5).toISOString(),
    verified: true,
    queueType: "Ranked 1v1 Random Map"
  })), lc = [
    mi("custom-1", "Friday Nomad FFA", "Land Nomad", 8, [
      "RelicRunner",
      "BoarPuller",
      "TownBell",
      "FastImp"
    ]),
    mi("custom-2", "CBA Practice", "CBA", 8, [
      "CastleClick",
      "FarmReset",
      "GoldMiner",
      "BerryGuard",
      "LoomFirst"
    ]),
    mi("custom-3", "Arena 2v2", "Arena", 4, [
      "MonkMicro",
      "WallBuilder",
      "StableSwitch"
    ]),
    mi("custom-4", "Michi No Rush", "Michi", 6, [
      "DarkAgeDan",
      "MarketAbuse"
    ]),
    mi("custom-5", "Community Megarandom", "Megarandom", 8, [
      "HillFort"
    ])
  ], gm = [
    {
      id: "friend-1",
      name: "StoneGate21",
      initials: "ST",
      rating: 1518,
      presence: "in_game",
      activity: "In game \xB7 Arabia",
      mapName: "Arabia",
      unread: 2,
      mutualFriends: 4
    },
    {
      id: "friend-2",
      name: "RelicRunner18",
      initials: "RR",
      rating: 1438,
      presence: "online",
      activity: "Looking for a match",
      unread: 0,
      mutualFriends: 7
    },
    {
      id: "friend-3",
      name: "ScoutRush34",
      initials: "SR",
      rating: 1409,
      presence: "idle",
      activity: "Idle",
      unread: 0,
      mutualFriends: 2
    },
    {
      id: "friend-4",
      name: "WallBuilder27",
      initials: "WB",
      rating: 1471,
      presence: "online",
      activity: "Online",
      unread: 0,
      mutualFriends: 5
    },
    {
      id: "friend-5",
      name: "MonkMicro42",
      initials: "MM",
      rating: 1397,
      presence: "offline",
      activity: "Offline",
      lastSeen: "2 hours ago",
      unread: 0,
      mutualFriends: 3
    }
  ], ym = [
    {
      id: "request-1",
      connectionId: "connection-1",
      name: "CastleClick",
      initials: "CC",
      rating: 1464,
      mutualFriends: 3
    }
  ];
  function mi(r, c, f, u, m) {
    return {
      id: r,
      name: c,
      hostId: `${r}-player-1`,
      map: {
        id: f.toLowerCase().replaceAll(" ", "-"),
        name: f,
        gameName: f,
        kind: "map"
      },
      players: m.map((h, S) => ({
        id: `${r}-player-${S + 1}`,
        displayName: h,
        slot: S + 1,
        team: 0,
        civilization: "Random",
        ready: S < 2,
        host: S === 0
      })),
      messages: [],
      gameSettings: {
        ...pm
      },
      maxPlayers: u,
      status: "open",
      createdAt: new Date(Date.now() - m.length * 12e4).toISOString(),
      demo: true
    };
  }
  const rc = {
    async getMine() {
      return ge ? Mc : (await xe.request("/matches/history")).matches;
    }
  }, pg = "modulepreload", gg = function(r, c) {
    return new URL(r, c).href;
  }, B1 = {}, vm = function(c, f, u) {
    let m = Promise.resolve();
    if (f && f.length > 0) {
      let S = function(x) {
        return Promise.all(x.map((z) => Promise.resolve(z).then((Y) => ({
          status: "fulfilled",
          value: Y
        }), (Y) => ({
          status: "rejected",
          reason: Y
        }))));
      };
      const M = document.getElementsByTagName("link"), k = document.querySelector("meta[property=csp-nonce]"), g = (k == null ? void 0 : k.nonce) || (k == null ? void 0 : k.getAttribute("nonce"));
      m = S(f.map((x) => {
        if (x = gg(x, u), x in B1) return;
        B1[x] = true;
        const z = x.endsWith(".css"), Y = z ? '[rel="stylesheet"]' : "";
        if (!!u) for (let $ = M.length - 1; $ >= 0; $--) {
          const V = M[$];
          if (V.href === x && (!z || V.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${x}"]${Y}`)) return;
        const p = document.createElement("link");
        if (p.rel = z ? "stylesheet" : pg, z || (p.as = "script"), p.crossOrigin = "", p.href = x, g && p.setAttribute("nonce", g), document.head.appendChild(p), z) return new Promise(($, V) => {
          p.addEventListener("load", $), p.addEventListener("error", () => V(new Error(`Unable to preload CSS for ${x}`)));
        });
      }));
    }
    function h(S) {
      const M = new Event("vite:preloadError", {
        cancelable: true
      });
      if (M.payload = S, window.dispatchEvent(M), !M.defaultPrevented) throw S;
    }
    return m.then((S) => {
      for (const M of S || []) M.status === "rejected" && h(M.reason);
      return c().catch(h);
    });
  };
  class hi extends Error {
    constructor(c = false, f) {
      super(f ?? (c ? "The team replay does not contain final PostGame results yet." : "The replay does not contain a PostGame or Resign operation yet.")), this.name = "ReplayNotFinishedError";
    }
  }
  async function yg(r) {
    var _a2;
    if (!window.electronApi) return false;
    const { parse_rec: c } = await vm(async () => {
      const { parse_rec: h } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: h
      };
    }, [], import.meta.url), f = await window.electronApi.readReplayFile(r), u = f.buffer.slice(f.byteOffset, f.byteOffset + f.byteLength);
    let m;
    try {
      m = c(u);
    } catch {
      return false;
    }
    return ((_a2 = m.operations) == null ? void 0 : _a2.some((h) => {
      if ("PostGame" in h) return true;
      const S = h.Action;
      if (typeof S != "object" || S === null) return false;
      const M = S.action_data;
      return typeof M == "object" && M !== null && "Resign" in M;
    })) ?? false;
  }
  async function vg(r, c = false) {
    var _a2, _b;
    if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
    const { parse_rec: f, parse_rec_summary: u } = await vm(async () => {
      const { parse_rec: J, parse_rec_summary: ne } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: J,
        parse_rec_summary: ne
      };
    }, [], import.meta.url), m = await window.electronApi.readReplayFile(r), h = m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength);
    let S;
    try {
      S = f(h);
    } catch {
      throw new hi();
    }
    const M = ((_a2 = S.operations) == null ? void 0 : _a2.some((J) => "PostGame" in J)) ?? false, k = (_b = S.operations) == null ? void 0 : _b.map((J) => J.Action).filter((J) => typeof J == "object" && J !== null).map((J) => J.action_data).filter((J) => typeof J == "object" && J !== null).map((J) => J.Resign).filter((J) => typeof J == "object" && J !== null).map((J) => J.player_id).find((J) => typeof J == "number");
    if (!c && !M && k === void 0) throw new hi();
    const g = u(h), x = g.header.game_settings, z = g.header.replay, Y = g.teams.flatMap((J) => J.players.filter((ne) => ne.profile_id > 0).map((ne) => ({
      profileId: ne.profile_id,
      playerNumber: ne.player_number,
      civilizationId: ne.civ_id,
      resigned: ne.resigned
    }))), q = c || Y.length > 2;
    if (q && !M) throw new hi(true);
    const p = g.teams.filter((J) => J.winner).flatMap((J) => J.players), $ = g.teams.filter((J) => !J.winner).flatMap((J) => J.players), V = g.teams.flatMap((J) => J.players).filter((J) => J.profile_id > 0), ae = k === void 0 ? void 0 : V.find((J) => J.player_number === k), ce = !q && ae ? V.find((J) => J.player_number !== k) : p.find((J) => J.profile_id > 0), le = !q && ae || $.find((J) => J.profile_id > 0), he = Y.find((J) => J.playerNumber === g.header.replay.rec_player);
    if (![
      2,
      4,
      8
    ].includes(Y.length) || !ce || !le || !he) throw new hi(q, "The replay summary does not contain complete player and team results yet.");
    return {
      fileSizeBytes: m.byteLength,
      build: g.header.build,
      recordedAt: g.header.timestamp,
      durationMs: g.duration,
      players: Y.sort((J, ne) => J.profileId - ne.profileId),
      settings: {
        cheats: x.cheats,
        replayCheatsEnabled: z.cheats_enabled,
        instantBuild: z.instant_build,
        playerCount: x.n_players,
        populationLimit: x.population_limit,
        recordGame: x.record_game,
        gameType: x.game_type,
        replayGameMode: z.game_mode,
        gameSpeedId: z.game_speed_id,
        gameSpeed: z.game_speed,
        startingAgeId: x.starting_age_id,
        startingResourcesId: x.starting_resources_id,
        endingAgeId: x.ending_age_id,
        victoryTypeId: x.victory_type_id,
        victoryAmount: x.victory_amount,
        revealMap: x.reveal_map,
        lockTeams: x.lock_teams,
        allTechs: x.all_techs,
        handicap: x.handicap,
        sharedExploration: x.shared_exploration,
        teamBonusDisabled: x.team_bonus_disabled,
        treatyLength: x.treaty_length,
        selectedMapId: x.selected_map_id,
        resolvedMapId: x.resolved_map_id,
        rmsStrings: [
          ...x.rms_strings
        ]
      },
      reporterProfileId: he.profileId,
      winnerProfileId: ce.profile_id,
      loserProfileId: le.profile_id,
      winningProfileIds: p.map((J) => J.profile_id).filter((J) => J > 0).sort(),
      losingProfileIds: $.map((J) => J.profile_id).filter((J) => J > 0).sort(),
      reason: q ? $.filter((J) => J.profile_id > 0).every((J) => J.resigned) ? "resignation" : "defeat" : k !== void 0 || le.resigned ? "resignation" : "defeat"
    };
  }
  const bm = "empire-league:lobby-setup-timing:v1", wm = 100, km = 120, bg = 500, wg = 6, kg = 100;
  function Sg(r) {
    const c = Sm(r), f = Cm()[Ac(r)];
    return f.length ? Math.max(1e4, c + xg(f)) : c;
  }
  function Cg(r, c) {
    if (!Number.isFinite(c) || c < 1e4 || c > 18e4) return;
    const f = Ac(r), u = Cm(), m = Math.round(c - Sm(r));
    u[f] = [
      ...u[f],
      m
    ].slice(-9);
    try {
      window.localStorage.setItem(bm, JSON.stringify(u));
    } catch {
    }
  }
  function Sm(r) {
    const c = Ac(r) === "custom", f = oa.mapPicker, u = oa.actions;
    let m = Qe.hostLobbyAutomationSettleMs;
    return m += wg * kg + u.multiplayer.settleMs, m += In(u.hostGame) + bg, m += In(u.createLobby), m += ln() + Qe.resetFocusMs + Qe.resetConfirmationMs, m += ln() + f.openSettleMs, m += ln() + f.styleMenuSettleMs, m += ln() + f.styleSelectionSettleMs, m += ln() + f.searchSettleMs, m += ln() + f.selectionSettleMs, m += In(u.copyLobbyUri) + Qe.clipboardReadMs, m += q1(r.queue.civilizationPreference), m += Qe.lobbyMetadataMs, m += Qe.guestJoinMs + Qe.guestReadySettleMs, m += q1(r.opponentCivilizationPreference), m += Qe.hostReadySettleMs + In(u.hostReady), c && (m += Qe.customMapTransferPollMs + u.guestReady.settleMs, m += sg + u.confirmGuestContent.settleMs, m += Qe.hostReadySettleMs + In(u.hostReady)), m += Qe.customMapTransferPollMs, m += In(u.guestReady), m += Qe.hostReadyToStartMs + Qe.startGameSettleMs, m += In(u.startGame) + Qe.revealAfterStartMs, m;
  }
  function q1(r) {
    if (!r) return 0;
    let c = ln() + oa.civilizationSlotButtons.settleMs;
    return r.mode === "pick" && (c += ln() + oa.civilizationPicker.searchSettleMs), c += oa.civilizationGrid.hoverMs + oa.civilizationGrid.holdMs + oa.civilizationPicker.selectionSettleMs, c += oa.actions.confirmCivilization.settleMs, c;
  }
  function In(r) {
    return (r.hoverMs ?? wm) + (r.holdMs ?? km) + r.settleMs;
  }
  function ln() {
    return wm + km;
  }
  function Ac(r) {
    var _a2;
    return oa.mapPicker.customMapNames.includes(((_a2 = r.selectedMap) == null ? void 0 : _a2.name) ?? "") ? "custom" : "standard";
  }
  function Cm() {
    try {
      const r = JSON.parse(window.localStorage.getItem(bm) ?? "{}");
      return {
        standard: H1(r.standard),
        custom: H1(r.custom)
      };
    } catch {
      return {
        standard: [],
        custom: []
      };
    }
  }
  function H1(r) {
    return Array.isArray(r) ? r.filter((c) => Number.isFinite(c) && Math.abs(c) <= 12e4).slice(-9) : [];
  }
  function xg(r) {
    const c = [
      ...r
    ].sort((u, m) => u - m), f = Math.floor(c.length / 2);
    return c.length % 2 === 0 ? Math.round((c[f - 1] + c[f]) / 2) : c[f];
  }
  const Mg = "empire-league:stop-youtube-shorts";
  async function pc() {
    window.dispatchEvent(new Event(Mg)), document.fullscreenElement && await document.exitFullscreen().catch(() => {
    });
  }
  function Ag(r) {
    return r === "home" || r === "ranked" || r === "weekly" || r === "custom" || r === "match-history" || r === "leaderboard" || r === "profile" || r === "social" || r === "settings";
  }
  const xm = "empire-league-settings", oc = 7e3, G1 = 3e4, jg = 65e3, gs = {
    launchAoe2OnStartup: false,
    matchNotifications: true,
    autoRejectFamilySharing: false,
    maximumLowerOpponentRatingGap: 0
  }, Ig = [
    {
      id: "ranked-rm-1v1",
      name: "Ranked 1v1 Random Map",
      description: "Ranked 1v1 Random Map.",
      format: "1v1",
      ruleset: "Random Map",
      mapPool: rn,
      mapPreferences: {
        enabledGroupIds: Et.groups.map((r) => r.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Et.version,
      ranked: true,
      estimatedWaitSeconds: 65,
      playersSearching: 128
    },
    {
      id: "team-games",
      name: "Team Games",
      description: "Find a match for solo, two-player, or three-player teams.",
      format: "team",
      teamSizes: [
        2,
        4
      ],
      ruleset: "Random Map",
      mapPool: rn,
      mapPreferences: {
        enabledGroupIds: Et.groups.map((r) => r.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Et.version,
      ranked: false,
      estimatedWaitSeconds: 90,
      playersSearching: 42
    }
  ], Mm = E.createContext(null);
  function Eg({ children: r }) {
    const [c, f] = E.useState(() => Ag(O1) ? O1 : "home"), [u, m] = E.useState(null), [h, S] = E.useState("leaderboard"), M = E.useRef(0), k = E.useRef(null), [g, x] = E.useState(ge ? "authenticated" : "loading"), [z, Y] = E.useState(null), [q, p] = E.useState(() => ({
      currentUser: Ia,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null,
      transitionInputLocked: false,
      activeMatch: null,
      recentMatches: ge ? Mc : [],
      connectionStatus: "online",
      gameStatus: "installed",
      searchRange: {
        min: Ia.rating - 50,
        max: Ia.rating + 50
      },
      error: null,
      notifications: ge && !mg ? [
        {
          id: "preview-data-notice",
          tone: "info",
          message: "Preview mode",
          detail: "All accounts, ratings, matches, messages, and lobbies use dummy data.",
          durationMs: null,
          dismissible: true
        }
      ] : [],
      eventLog: [],
      mockConfig: ig,
      settings: Ng()
    })), $ = E.useRef(q.mockConfig);
    $.current = q.mockConfig;
    const V = E.useRef(q);
    V.current = q;
    const ae = E.useRef(null), ce = E.useRef(false), le = E.useRef(null), he = E.useRef(null), J = E.useRef(false), ne = E.useRef(null), T = E.useRef(null), L = E.useRef(false), D = E.useRef(false), se = E.useRef(null);
    E.useEffect(() => {
      const A = k.current;
      if (!A || A.page !== c) return;
      k.current = null;
      const R = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          var _a2;
          (_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTo({
            top: A.top
          });
        });
      });
      return () => window.cancelAnimationFrame(R);
    }, [
      c
    ]), E.useEffect(() => {
      if (ge || c !== "match-history" || g !== "authenticated") return;
      let A = false;
      return rc.getMine().then((R) => {
        A || p((K) => ({
          ...K,
          recentMatches: R
        }));
      }).catch((R) => {
        A || w(`Match history refresh failed: ${R instanceof Error ? R.message : "Unknown error"}`);
      }), () => {
        A = true;
      };
    }, [
      g,
      c
    ]);
    const X = E.useMemo(() => ({
      matchmaking: new dg(() => $.current),
      game: new rg(() => $.current),
      results: new fg(() => $.current)
    }), []);
    E.useEffect(() => {
      if (ge) return;
      let A = false;
      return Dl.restore().then((R) => {
        A || (R ? (H(R), rc.getMine().then((K) => {
          A || p((P) => ({
            ...P,
            currentUser: R,
            recentMatches: K
          }));
        }).catch(() => {
          A || p((K) => ({
            ...K,
            currentUser: R,
            recentMatches: []
          }));
        }), x("authenticated")) : x("unauthenticated"));
      }).catch((R) => {
        A || (Y(Y1(R, "Could not restore the Steam session.")), x("unauthenticated"));
      }), () => {
        A = true;
      };
    }, []), E.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayEnded((A) => {
        const R = V.current.activeMatch;
        !R || V.current.queueStatus !== "in_game" || L.current || (L.current = true, (async () => {
          var _a2, _b;
          let K;
          try {
            K = await vg(A, R.queue.format === "team");
          } catch (P) {
            if (P instanceof hi) {
              L.current = false;
              return;
            }
            const F = P instanceof Error ? P.message : "Replay parsing failed.";
            p((ee) => ({
              ...ee,
              queueStatus: "verifying_result"
            }));
            try {
              await ((_a2 = window.electronApi) == null ? void 0 : _a2.confirmReplayEnded()), await X.matchmaking.reportMatchResult({
                matchId: R.id,
                error: F
              }), w("Replay could not be parsed; result reported as contested");
              return;
            } catch (ee) {
              L.current = false, fe({
                code: "RESULT_VERIFICATION_FAILED",
                message: "The replay parsing failure could not be reported.",
                technicalDetails: ee instanceof Error ? ee.message : F,
                retryable: true
              });
              return;
            }
          }
          await ((_b = window.electronApi) == null ? void 0 : _b.confirmReplayEnded()), p((P) => ({
            ...P,
            queueStatus: "verifying_result"
          })), w(`Replay ended with terminal operation (${K.reason}): ${A}`);
          try {
            await X.matchmaking.reportMatchResult({
              matchId: R.id,
              replay: K
            }), w("Replay result reported; waiting for opponent report");
          } catch (P) {
            L.current = false, fe({
              code: "RESULT_VERIFICATION_FAILED",
              message: "The replay result could not be reported.",
              technicalDetails: P instanceof Error ? P.message : "Matchmaker reporting failed.",
              retryable: true
            });
          }
        })());
      });
    }, [
      X
    ]), E.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayDetectionFailed((A) => {
        const R = V.current.activeMatch;
        !R || V.current.queueStatus !== "in_game" || L.current || (L.current = true, p((K) => ({
          ...K,
          queueStatus: "verifying_result"
        })), w("Replay recording did not start; reporting the result as contested"), X.matchmaking.reportMatchResult({
          matchId: R.id,
          error: A
        }).then(() => {
          w("Missing replay reported; waiting for contested result");
        }).catch((K) => {
          L.current = false, fe({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: K instanceof Error ? K.message : A,
            retryable: true
          });
        }));
      });
    }, [
      X
    ]), E.useEffect(() => {
      if (window.electronApi) return window.electronApi.onAoe2ProcessExited(() => {
        V.current.queueStatus !== "in_game" || !V.current.activeMatch || (w("AoE2 exited before local result verification completed"), za().then(() => {
          Z("AoE2 was closed. The match result is still pending.", "warning", {
            detail: "The result may still be resolved from your opponent's replay.",
            durationMs: 8e3
          });
        }));
      });
    }, [
      X
    ]);
    async function ke() {
      x("authenticating"), Y(null);
      try {
        const A = await Dl.signIn();
        H(A);
        const R = await rc.getMine();
        p((K) => ({
          ...K,
          currentUser: A,
          recentMatches: R
        })), x("authenticated");
      } catch (A) {
        Y(Y1(A, "Steam sign-in failed.")), x("unauthenticated");
      }
    }
    async function ze() {
      var _a2;
      ge || (v(), ae.current && await X.matchmaking.leaveQueue(ae.current).catch(() => {
      }), (_a2 = le.current) == null ? void 0 : _a2.call(le), ae.current = null, ce.current = false, await Dl.logout(), p((A) => ({
        ...A,
        currentUser: Ia,
        queueStatus: "idle",
        selectedQueue: null,
        activeMatch: null
      })), x("unauthenticated"), f("home"));
    }
    E.useEffect(() => {
      if (ge) return;
      let A = false;
      async function R() {
        let P = null;
        try {
          if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
          const F = await window.electronApi.detectAoe2Installation();
          if (!F.installed || !F.path) {
            A || Z(F.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
            return;
          }
          if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
            const ft = await window.electronApi.closeAoe2(true);
            if (!ft.closed) throw new Error(ft.message ?? "AoE2 could not be closed.");
          }
          if (!q.settings.launchAoe2OnStartup) return;
          if (p((Ue) => ({
            ...Ue,
            gameStatus: "loading"
          })), P = Z("Loading AoE2 DE\u2026", "loading", {
            detail: "Waiting for the game window to become ready.",
            durationMs: null
          }), !await Q1((Ue) => {
            P && te(P, {
              detail: Ue
            });
          })) throw new Error("AoE2 started, but its game window did not become ready in time.");
          P && te(P, {
            detail: "Finishing game startup."
          }), await cc(oc), A || (p((Ue) => ({
            ...Ue,
            gameStatus: "running"
          })), P && te(P, {
            message: "AoE2 DE is ready",
            tone: "success",
            detail: void 0,
            durationMs: 5e3
          }));
        } catch (F) {
          A || (P && W(P), p((ee) => ({
            ...ee,
            gameStatus: "installed"
          })), Z(F instanceof Error ? F.message : "AoE2 DE could not be launched.", "danger"));
        }
      }
      const K = window.setTimeout(() => void R(), 0);
      return () => {
        A = true, window.clearTimeout(K);
      };
    }, []);
    async function Te(A) {
      let R = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        const K = await window.electronApi.detectAoe2Installation();
        if (!K.installed || !K.path) throw new Error(K.message ?? "AoE2 DE was not detected.");
        const P = await window.electronApi.detectAoe2Process();
        if (P.running && !P.owned && !(await window.electronApi.closeAoe2(false)).closed) {
          const oe = await window.electronApi.closeAoe2(true);
          if (!oe.closed) throw new Error(oe.message ?? "The existing AoE2 process could not be closed.");
        }
        if (p((ee) => ({
          ...ee,
          gameStatus: "loading"
        })), R = Z("Launching AoE2 DE\u2026", "loading", {
          detail: A === "custom" ? "Your custom game action will continue automatically when the game is ready." : "Matchmaking will begin automatically when the game is ready.",
          durationMs: null
        }), !await Q1((ee) => {
          R && te(R, {
            detail: ee
          });
        })) throw new Error("AoE2 started, but its game window did not become ready in time.");
        return te(R, {
          detail: "Finishing game startup."
        }), await cc(oc), p((ee) => ({
          ...ee,
          gameStatus: "running"
        })), te(R, {
          message: "AoE2 DE is ready",
          tone: "success",
          detail: A === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
          durationMs: 3e3
        }), true;
      } catch (K) {
        return R && W(R), p((P) => ({
          ...P,
          gameStatus: "installed"
        })), Z(K instanceof Error ? K.message : "AoE2 DE could not be launched.", "danger"), false;
      }
    }
    async function tt(A = "matchmaking") {
      if (ge || !window.electronApi) return true;
      const { mods: R } = await window.electronApi.detectEnabledUiMods();
      if (R.length) return se.current && W(se.current), se.current = Z("Disable UI mods to continue", "warning", {
        detail: `Disable: ${R.join(", ")}. AoE2 will close if it is currently running; retry your action afterward.`,
        durationMs: null,
        dismissible: true,
        action: {
          label: "Disable UI mods",
          run: async () => {
            try {
              if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
                const oe = await window.electronApi.closeAoe2(true);
                if (!oe.closed) throw new Error(oe.message ?? "AoE2 could not be closed.");
              }
              const F = await window.electronApi.disableEnabledUiMods();
              if (!F.disabled.length) throw new Error("The enabled UI mods could not be updated.");
              se.current && W(se.current), se.current = null, Z("UI mods disabled", "success", {
                detail: `${F.disabled.join(", ")} disabled. You can try again now.`
              });
            } catch (P) {
              Z("UI mods could not be disabled", "danger", {
                detail: P instanceof Error ? P.message : "Update the mods manually in AoE2.",
                durationMs: null
              });
            }
          }
        }
      }), false;
      const K = await window.electronApi.detectAoe2Process();
      return K.running && K.windowReady && K.owned ? true : Te(A);
    }
    async function U() {
      let A = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        if (he.current = null, await window.electronApi.setLobbyInputLock(false).catch(() => ({
          locked: false
        })), p((ee) => ({
          ...ee,
          gameStatus: "loading",
          transitionInputLocked: false,
          roomSetupStartedAt: null,
          roomSetupEstimateMs: null,
          roomSetupMilestone: "Resetting AoE2 after disconnect"
        })), A = Z("Resetting AoE2 after the disconnect\u2026", "loading", {
          detail: "Closing the abandoned lobby before returning to matchmaking.",
          durationMs: null,
          dismissible: false
        }), (await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
          te(A, {
            detail: "AoE2 did not close normally; forcing it to exit."
          });
          const oe = await window.electronApi.closeAoe2(true);
          if (!oe.closed) throw new Error(oe.message ?? "The abandoned AoE2 process could not be closed.");
        }
        if ((await window.electronApi.detectAoe2Process()).running) throw new Error("AoE2 was still running after the close operation.");
        te(A, {
          detail: "Launching a clean AoE2 session."
        });
        const P = await window.electronApi.launchAoe2();
        if (!P.launched) throw new Error(P.message ?? "Steam did not accept the AoE2 DE launch request.");
        if (!await gc(12e4)) throw new Error("AoE2 restarted, but its game window did not become ready in time.");
        return te(A, {
          detail: "Finishing game startup."
        }), await cc(oc), p((ee) => ({
          ...ee,
          gameStatus: "running",
          roomSetupMilestone: null
        })), te(A, {
          message: "AoE2 is ready",
          tone: "success",
          detail: "Returning to matchmaking.",
          durationMs: 3e3,
          dismissible: true
        }), true;
      } catch (R) {
        return A && W(A), p((K) => ({
          ...K,
          gameStatus: "installed",
          transitionInputLocked: false,
          roomSetupMilestone: null
        })), Z(R instanceof Error ? R.message : "AoE2 could not be reset after the disconnect.", "danger"), false;
      }
    }
    function w(A) {
      p((R) => ({
        ...R,
        eventLog: [
          lg(A),
          ...R.eventLog
        ].slice(0, 80)
      }));
    }
    function Z(A, R = "info", K = {}) {
      const P = crypto.randomUUID();
      return p((F) => ({
        ...F,
        notifications: [
          {
            id: P,
            message: A,
            tone: R,
            detail: K.detail,
            durationMs: K.durationMs === void 0 ? R === "danger" ? 8e3 : 5e3 : K.durationMs,
            dismissible: K.dismissible,
            action: K.action
          },
          ...F.notifications
        ].slice(0, 4)
      })), P;
    }
    function pe() {
      v(), T.current = window.setTimeout(() => {
        T.current = null;
        const A = V.current.selectedQueue;
        A && ye(A, "Lobby setup stopped making progress for 65 seconds.");
      }, jg);
    }
    async function ye(A, R) {
      var _a2, _b;
      if (J.current) return;
      J.current = true, (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), v(), ce.current = false, ne.current = null, he.current = null, (_b = le.current) == null ? void 0 : _b.call(le), le.current = null;
      const K = ae.current;
      ae.current = null, p((F) => ({
        ...F,
        queueStatus: "cancelled",
        activeMatch: null,
        error: null,
        transitionInputLocked: false,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), Z(R, "warning", {
        durationMs: 5e3,
        dismissible: false
      }), K && await X.matchmaking.leaveQueue(K).catch(() => {
      }), w("Lobby setup failed; resetting AoE2 before returning to queue");
      const P = await U();
      J.current = false, P && await be(A);
    }
    function v() {
      T.current !== null && (window.clearTimeout(T.current), T.current = null);
    }
    function H(A) {
      A.steamLicenseStatus !== "family_shared" || D.current || (D.current = true, Z("Opponents may reject matches with you because you are using family share.", "warning", {
        durationMs: null,
        dismissible: true
      }));
    }
    function W(A) {
      p((R) => {
        var _a2, _b;
        return {
          ...R,
          notifications: R.notifications.filter((K) => K.id !== A),
          error: ((_a2 = R.error) == null ? void 0 : _a2.notificationId) === A ? null : R.error,
          queueStatus: ((_b = R.error) == null ? void 0 : _b.notificationId) === A && R.queueStatus === "error" ? "idle" : R.queueStatus
        };
      });
    }
    function te(A, R) {
      p((K) => ({
        ...K,
        notifications: K.notifications.map((P) => P.id === A ? {
          ...P,
          ...R
        } : P)
      }));
    }
    function fe(A) {
      const R = Z(A.message, "danger", {
        detail: A.technicalDetails,
        durationMs: null
      });
      p((K) => ({
        ...K,
        error: {
          ...A,
          notificationId: R
        },
        queueStatus: "error"
      }));
    }
    async function be(A) {
      var _a2, _b;
      const R = [
        "idle",
        "cancelled",
        "completed"
      ].includes(q.queueStatus) && (!q.activeMatch || q.queueStatus === "completed");
      if (!(q.gameStatus === "loading" || !R || ce.current)) {
        ce.current = true;
        try {
          if (!await tt()) {
            ce.current = false;
            return;
          }
          if (ae.current) {
            const F = ae.current;
            (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null, ae.current = null, await X.matchmaking.leaveQueue(F).catch(() => {
            });
          }
          const K = await Dl.reportSteamLicense(q.currentUser);
          H(K), K !== q.currentUser && p((F) => ({
            ...F,
            currentUser: K
          }));
          const P = await X.matchmaking.joinQueue({
            queueId: A.id,
            queue: A,
            player: K,
            canHost: true,
            maximumLowerOpponentRatingGap: q.settings.maximumLowerOpponentRatingGap
          });
          ae.current = P.id, ((_b = P.ignoredMapIds) == null ? void 0 : _b.length) && Z("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
            detail: `Ignored maps: ${P.ignoredMapIds.join(", ")}`,
            durationMs: 1e4
          }), p((F) => ({
            ...F,
            selectedQueue: A,
            searchRange: {
              min: (A.format === "team" ? K.teamRating : K.rating) - 50,
              max: (A.format === "team" ? K.teamRating : K.rating) + 50
            },
            queueStartedAt: P.joinedAt,
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            queueStatus: "searching",
            activeMatch: null,
            error: null
          })), f("ranked"), w(`Joined queue ${A.id}`), le.current = X.matchmaking.subscribeToQueue(P.id, (F) => {
            var _a3, _b2, _c, _d, _e, _f, _g2, _h, _i, _j, _k;
            if (F.type === "range" && p((ee) => ({
              ...ee,
              searchRange: {
                min: F.minRating,
                max: F.maxRating
              }
            })), F.type === "match_found") {
              if (q.settings.autoRejectFamilySharing && F.match.queue.id === "ranked-rm-1v1" && F.match.opponent.steamLicenseStatus === "family_shared") {
                w(`Automatically declining family-shared opponent: ${F.match.id}`), Z("Automatically declined a Family Share opponent.", "warning"), bt(F.match.id);
                return;
              }
              const oe = {
                ...F.match,
                player: q.currentUser,
                status: "match_found"
              };
              ne.current = oe, f("ranked"), p((Ue) => ({
                ...Ue,
                queueStatus: "match_found",
                roomSetupStartedAt: null,
                roomSetupEstimateMs: null,
                roomSetupMilestone: null,
                activeMatch: oe
              })), w(`Match found: ${F.match.id}`), q.settings.matchNotifications && ((_a3 = window.electronApi) == null ? void 0 : _a3.alertMatchFound());
            }
            if (F.type === "opponent_accepted") {
              const ee = ne.current;
              if (!ee) return;
              (_b2 = window.electronApi) == null ? void 0 : _b2.stopMatchFoundAlert(), pe();
              const oe = {
                ...ee,
                acceptedByPlayer: true,
                acceptedByOpponent: true,
                status: F.role === "host" ? "creating_lobby" : "waiting_for_opponent"
              };
              ne.current = oe, p((Ue) => ({
                ...Ue,
                queueStatus: F.role === "host" ? "creating_lobby" : "waiting_for_opponent",
                roomSetupStartedAt: (/* @__PURE__ */ new Date()).toISOString(),
                roomSetupEstimateMs: Sg(oe),
                roomSetupMilestone: F.role === "host" ? "Setting up lobby room" : "Waiting for the host to set up the lobby room",
                activeMatch: oe
              })), w("Both players accepted"), F.role === "host" && window.electronApi && (w("Assigned as host; waiting for AoE2 lobby automation to settle"), he.current = ja(Qe.hostLobbyAutomationSettleMs).then(() => {
                var _a4;
                return pe(), w("Starting AoE2 lobby automation"), window.electronApi.runAoe2CreateLobbySequence(yc(oe.selectedMap), oe.queue.format === "team" ? (((_a4 = oe.queue.teamSizes) == null ? void 0 : _a4[0]) ?? 2) * 2 : 2);
              }), aa(oe));
            }
            if (F.type === "lobby_ready" && (pe(), p((ee) => ({
              ...ee,
              queueStatus: "ready",
              gameStatus: "in_lobby",
              roomSetupMilestone: "Joining lobby room",
              activeMatch: ee.activeMatch ? {
                ...ee.activeMatch,
                lobby: F.lobby,
                status: "ready"
              } : null
            })), w(`Host published lobby: ${F.lobby.platformLobbyId ?? "pending"}`), ((_c = F.lobby.platformLobbyId) == null ? void 0 : _c.startsWith("aoe2de://0/")) && window.electronApi && window.electronApi.openAoe2Lobby(F.lobby.platformLobbyId).then(async (ee) => {
              var _a4, _b3;
              if (w(ee.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected"), ee.opened) {
                w("Guest lobby opened; waiting for the Ready button state to settle"), await ja(Qe.guestReadySettleMs);
                const oe = (_a4 = ne.current) == null ? void 0 : _a4.queue.civilizationPreference, Ue = V1(oe);
                if (Ue) {
                  const Fe = ((_b3 = ne.current) == null ? void 0 : _b3.lobbySlot) ?? 2;
                  w(`Selecting ${Ue} for guest lobby slot ${Fe}`);
                  const Wt = await window.electronApi.selectAoe2Civilization(Ue, Fe);
                  if (!Wt.sent) throw new Error(Wt.message);
                  Wt.usedRandomCivilizationFallback ? (Z("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), w(`${Ue} unavailable; Random selected in AoE2`)) : w(`${Ue} selected in AoE2`);
                }
                const ft = ne.current;
                if ((ft == null ? void 0 : ft.queue.format) === "team") {
                  const Fe = ft.lobbySlot ?? 2, Wt = ft.team ?? 2;
                  w(`Selecting Team ${Wt} for guest lobby slot ${Fe}`);
                  const cn = await window.electronApi.selectAoe2Team(Wt, Fe);
                  if (!cn.sent) throw new Error(cn.message);
                }
                w("Guest lobby opened; reporting join to the host"), await X.matchmaking.reportGuestLobbyJoined(F.matchId), w("Guest joined; waiting for the host to finalize custom map transfer"), p((Fe) => ({
                  ...Fe,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((ee) => {
              const oe = ee instanceof Error ? ee.message : "The host lobby could not be opened.";
              w(`Opening the host lobby failed: ${oe}`), ye(A, oe);
            })), F.type === "guest_lobby_joined" && window.electronApi && (p((ee) => ({
              ...ee,
              roomSetupMilestone: "Opponent joined. Finalizing lobby files..."
            })), (async () => {
              try {
                w("Guest joined; waiting for the host lobby state to settle"), await ja(Qe.hostReadySettleMs), w("Guest joined; clicking Ready for the host");
                const ee = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!ee.sent) throw new Error(ee.message);
                await X.matchmaking.reportHostLobbyReady(F.matchId), w("Host readied; guest notified to wait for custom map transfer"), p((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (ee) {
                const oe = ee instanceof Error ? ee.message : "The host could not finalize the lobby.";
                w(`Automated host Ready failed: ${oe}`), ye(A, oe);
              }
            })()), F.type === "host_lobby_ready" && window.electronApi) {
              const ee = X1((_d = ne.current) == null ? void 0 : _d.selectedMap);
              p((oe) => ({
                ...oe,
                roomSetupMilestone: ee ? "Receiving lobby files" : "Waiting for Ready"
              })), (async () => {
                try {
                  const oe = Date.now() + Qe.customMapTransferTimeoutMs;
                  let Ue = false, ft;
                  do
                    await ja(Qe.customMapTransferPollMs), ft = await window.electronApi.runAoe2LobbyCursorAction("guest-ready"), !ft.sent && ee && !Ue && (w("Guest Ready remains unavailable; checking for the unverified-content confirmation"), (await window.electronApi.runAoe2LobbyCursorAction("content-confirm")).sent ? (await X.matchmaking.reportGuestContentAccepted(F.matchId), Ue = true, w(`Content accepted; allowing ${U1} ms for the host to restore Ready`), await ja(U1)) : w("Unverified-content confirmation keys could not be sent"));
                  while (!ft.sent && Date.now() < oe);
                  if (!ft.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
                  w("Guest Ready verified; reporting readiness to the host"), await X.matchmaking.reportGuestLobbyReady(F.matchId), v(), p((Fe) => ({
                    ...Fe,
                    roomSetupMilestone: "Ready. Waiting for the host to start..."
                  }));
                } catch (oe) {
                  const Ue = oe instanceof Error ? oe.message : "Lobby file transfer did not complete.";
                  w(`Guest file transfer or Ready failed: ${Ue}`), ye(A, Ue);
                }
              })();
            }
            if (F.type === "guest_content_accepted" && window.electronApi && X1((_e = ne.current) == null ? void 0 : _e.selectedMap) && (p((ee) => ({
              ...ee,
              roomSetupMilestone: "Opponent accepted lobby files. Confirming host readiness..."
            })), (async () => {
              try {
                w("Guest accepted custom content; waiting for the lobby state to settle"), await ja(Qe.hostReadySettleMs);
                const ee = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!ee.sent) throw new Error(ee.message);
                w("Host Ready verified again after guest content acceptance"), p((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (ee) {
                const oe = ee instanceof Error ? ee.message : "The host could not resume the lobby file transfer.";
                w(`Second host Ready failed: ${oe}`), ye(A, oe);
              }
            })()), F.type === "guest_lobby_ready" && window.electronApi && (p((ee) => ({
              ...ee,
              roomSetupMilestone: "Opponent ready. Starting game..."
            })), (async () => {
              try {
                w("Guest reported ready; waiting for the Start button state to settle"), await ja(Qe.hostReadyToStartMs), await ja(Qe.startGameSettleMs), w("Host readied; clicking Start Game");
                const ee = await window.electronApi.runAoe2LobbyCursorAction("start");
                if (!ee.sent) throw new Error(ee.message);
                v(), p((oe) => ({
                  ...oe,
                  queueStatus: "ready",
                  gameStatus: "in_match",
                  roomSetupMilestone: "Starting game",
                  transitionInputLocked: true,
                  activeMatch: oe.activeMatch ? {
                    ...oe.activeMatch,
                    status: "ready"
                  } : null
                })), await X.matchmaking.reportGameStarted(F.matchId), ue();
              } catch (ee) {
                const oe = ee instanceof Error ? ee.message : "The automated game start failed.";
                w(`Automated host start failed: ${oe}`), ye(A, oe);
              }
            })()), F.type === "game_started" && (v(), p((ee) => ({
              ...ee,
              queueStatus: "ready",
              gameStatus: "in_match",
              roomSetupMilestone: "Starting game",
              transitionInputLocked: true,
              activeMatch: ee.activeMatch ? {
                ...ee.activeMatch,
                status: "ready"
              } : null
            })), w("Host started the game"), ue()), F.type === "result_verified" || F.type === "result_contested") {
              if (F.matchId !== ((_f = V.current.activeMatch) == null ? void 0 : _f.id)) return;
              Ta(F.result);
            }
            if (F.type === "error") {
              if (F.code === "TICKET_NOT_FOUND") {
                ce.current = false, ne.current = null, ae.current = null, (_g2 = le.current) == null ? void 0 : _g2.call(le), le.current = null, p((ee) => ({
                  ...ee,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), Z("The matchmaking server restarted. Rejoining the queue\u2026", "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), w("Queue ticket expired after a server restart; rejoining"), window.setTimeout(() => void be(A), 0);
                return;
              }
              if (F.code === "MATCH_DISCONNECTED" || F.code === "MATCH_SETUP_FAILED") {
                ye(A, F.message);
                return;
              }
              if (F.code === "MATCH_DECLINED") {
                (_h = window.electronApi) == null ? void 0 : _h.stopMatchFoundAlert(), v(), ce.current = false, ne.current = null, ae.current && (X.matchmaking.leaveQueue(ae.current).catch(() => {
                }), ae.current = null), (_i = le.current) == null ? void 0 : _i.call(le), le.current = null, p((ee) => ({
                  ...ee,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), Z(F.message, "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), w("Opponent declined; returning to queue"), window.setTimeout(() => void be(A), 0);
                return;
              }
              F.code === "MATCH_EXPIRED" && ((_j = window.electronApi) == null ? void 0 : _j.stopMatchFoundAlert(), v(), ce.current = false, ne.current = null, ae.current && (X.matchmaking.leaveQueue(ae.current).catch(() => {
              }), ae.current = null), (_k = le.current) == null ? void 0 : _k.call(le), le.current = null, p((ee) => ({
                ...ee,
                queueStatus: "cancelled",
                activeMatch: null
              }))), fe({
                code: F.code,
                message: F.message,
                retryable: true
              });
            }
          });
        } catch (K) {
          ce.current = false, fe({
            code: "QUEUE_JOIN_FAILED",
            message: "Matchmaking is currently unavailable.",
            technicalDetails: K instanceof Error ? K.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function Ne() {
      var _a2;
      v(), (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null;
      const A = ae.current;
      ae.current = null, ce.current = false, A && await X.matchmaking.leaveQueue(A).catch((R) => {
        const K = R instanceof Error ? R.message : "";
        K.toLowerCase().includes("ticket not found") || (w(`Queue cancellation could not be confirmed: ${K || "Unknown error"}`), Z("The matchmaking server could not confirm cancellation", "danger", {
          detail: K || void 0,
          durationMs: null
        }));
      }), p((R) => ({
        ...R,
        queueStatus: "cancelled",
        selectedQueue: null,
        queueStartedAt: null,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), w("Queue cancelled");
    }
    async function ot(A) {
      var _a2;
      const R = ae.current;
      if (!(!R || V.current.queueStatus !== "searching")) try {
        if (await X.matchmaking.updateQueue(R, A), V.current.queueStatus !== "searching") return;
        p((K) => ({
          ...K,
          selectedQueue: A
        })), w(`Updated active queue preferences: ${((_a2 = A.civilizationPreference) == null ? void 0 : _a2.mode) ?? "pick"}, ${A.mapPool.length} maps`);
      } catch (K) {
        if (V.current.queueStatus !== "searching") return;
        w(`Active queue preference update failed: ${K instanceof Error ? K.message : "Unknown error"}`), Z("Your queue preferences could not be updated", "danger");
      }
    }
    async function Ze() {
      var _a2;
      if (q.activeMatch) {
        (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert();
        try {
          p((A) => ({
            ...A,
            queueStatus: "accepting",
            activeMatch: A.activeMatch ? {
              ...A.activeMatch,
              acceptedByPlayer: true,
              status: "accepting"
            } : null
          })), w("Local player accepted"), await X.matchmaking.acceptMatch(q.activeMatch.id);
        } catch (A) {
          fe({
            code: "MATCH_ACCEPT_FAILED",
            message: "The match could not be accepted.",
            technicalDetails: A instanceof Error ? A.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function bt(A) {
      var _a2, _b;
      (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), v(), (_b = le.current) == null ? void 0 : _b.call(le), le.current = null;
      try {
        A && await X.matchmaking.declineMatch(A);
      } finally {
        ae.current && await X.matchmaking.leaveQueue(ae.current).catch(() => {
        }), ae.current = null, ce.current = false, ne.current = null, p((R) => ({
          ...R,
          queueStatus: "cancelled",
          activeMatch: null
        }));
      }
      w("Match declined");
    }
    async function Na() {
      var _a2;
      await bt((_a2 = q.activeMatch) == null ? void 0 : _a2.id);
    }
    async function aa(A) {
      var _a2, _b, _c;
      const R = A ?? q.activeMatch;
      if (R == null ? void 0 : R.selectedMap) try {
        if (f("ranked"), p((F) => ({
          ...F,
          queueStatus: "creating_lobby"
        })), w("Detecting AoE2 installation"), !(await X.game.detectInstallation()).installed) throw new Error("AoE2 installation not detected.");
        if (w("Installation detected"), await X.game.detectRunningGame(), w("AoE2 process found"), await X.game.launchGame(), w("Opening multiplayer menu"), window.electronApi) {
          const F = await (he.current ?? window.electronApi.runAoe2CreateLobbySequence(yc(R.selectedMap), R.queue.format === "team" ? (((_a2 = R.queue.teamSizes) == null ? void 0 : _a2[0]) ?? 2) * 2 : 2));
          if (he.current = null, !F.sent) throw new Error(F.message);
          if (!F.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
          w("AoE2 host-lobby sequence completed"), pe();
          const ee = R.queue.civilizationPreference, oe = V1(ee);
          if (oe) {
            w(`Selecting ${oe} for host lobby slot 1`);
            const Fe = await window.electronApi.selectAoe2Civilization(oe, 1);
            if (!Fe.sent) throw new Error(Fe.message);
            Fe.usedRandomCivilizationFallback ? (Z("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), w(`${oe} unavailable; Random selected in AoE2`)) : w(`${oe} selected in AoE2`);
          }
          if (R.queue.format === "team") {
            const Fe = R.lobbySlot ?? 1, Wt = R.team ?? 1;
            w(`Selecting Team ${Wt} for host lobby slot ${Fe}`);
            const cn = await window.electronApi.selectAoe2Team(Wt, Fe);
            if (!cn.sent) throw new Error(cn.message);
          }
          w(`Lobby URI discovered: ${F.lobbyUri}`);
          const ft = {
            ...(await X.game.createLobby({
              matchId: R.id,
              hostProfileId: R.player.aoeProfileId,
              guestProfileId: R.opponent.aoeProfileId,
              map: R.selectedMap,
              playerCount: R.queue.format === "team" ? (((_b = R.queue.teamSizes) == null ? void 0 : _b[0]) ?? 2) * 2 : 2
            })).lobby,
            platformLobbyId: F.lobbyUri
          };
          w(`Lobby created: ${ft.platformLobbyId}`), await X.matchmaking.publishLobby(R.id, ft), w("Lobby details published to opponent"), v(), p((Fe) => ({
            ...Fe,
            activeMatch: Fe.activeMatch ? {
              ...Fe.activeMatch,
              lobby: ft
            } : null,
            queueStatus: "waiting_for_opponent",
            roomSetupMilestone: "Waiting for opponent to join"
          }));
          return;
        }
        const P = await X.game.createLobby({
          matchId: R.id,
          hostProfileId: R.player.aoeProfileId,
          guestProfileId: R.opponent.aoeProfileId,
          map: R.selectedMap,
          playerCount: R.queue.format === "team" ? (((_c = R.queue.teamSizes) == null ? void 0 : _c[0]) ?? 2) * 2 : 2
        });
        w(`Lobby created: ${P.lobby.platformLobbyId ?? "pending"}`), await X.matchmaking.publishLobby(R.id, P.lobby), w("Lobby details published to opponent"), p((F) => ({
          ...F,
          activeMatch: F.activeMatch ? {
            ...F.activeMatch,
            lobby: P.lobby
          } : null,
          queueStatus: "waiting_for_opponent"
        })), w("Opponent invited"), await X.game.waitForGameStart(P.lobby.platformLobbyId ?? R.id), w("Opponent joined"), p((F) => ({
          ...F,
          queueStatus: "verifying_lobby"
        })), await X.game.verifyLobby(P.lobby.platformLobbyId ?? R.id), w("Lobby verified"), p((F) => ({
          ...F,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: F.activeMatch ? {
            ...F.activeMatch,
            lobby: Rg(P.lobby),
            status: "ready"
          } : null
        }));
      } catch (K) {
        const P = K instanceof Error ? K.message : "We could not create the AoE2 lobby.";
        w(`Lobby preparation failed: ${P}`);
        const F = R.queue;
        ye(F, P);
      }
    }
    async function Ra() {
      if (window.electronApi) {
        const A = await window.electronApi.startReplayEndDetection();
        A.started || w(`Replay detection unavailable: ${A.message ?? "unknown error"}`);
      }
      await pc(), await X.game.focusGame(), p((A) => ({
        ...A,
        queueStatus: "in_game",
        gameStatus: "in_match"
      })), w("Focused AoE2"), q.activeMatch && await X.results.beginTracking(q.activeMatch);
    }
    async function $t() {
      const A = q.activeMatch;
      if (A) try {
        p((K) => ({
          ...K,
          queueStatus: "verifying_result"
        })), w("Game finished");
        const R = await X.results.waitForVerifiedResult(A.id);
        Ta(R);
      } catch (R) {
        fe({
          code: "RESULT_VERIFICATION_FAILED",
          message: "The result service could not verify this match.",
          technicalDetails: R instanceof Error ? R.message : void 0,
          retryable: true
        });
      }
    }
    function Ta(A) {
      var _a2;
      ce.current = false, L.current = false, (_a2 = window.electronApi) == null ? void 0 : _a2.stopReplayEndDetection(), p((R) => {
        var _a3, _b, _c;
        const K = R.activeMatch ? {
          ...R.activeMatch,
          result: A,
          status: "completed"
        } : null, P = A.ratingPool === "team", F = !P && A.outcome === "win" ? R.currentUser.wins + 1 : R.currentUser.wins, ee = !P && A.outcome === "loss" ? R.currentUser.losses + 1 : R.currentUser.losses, oe = {
          ...R.currentUser,
          rating: A.verified && !P ? A.newRating : R.currentUser.rating,
          peakRating: A.verified && !P ? Math.max(R.currentUser.peakRating, A.newRating) : R.currentUser.peakRating,
          teamRating: A.verified && P ? A.newRating : R.currentUser.teamRating,
          teamPeakRating: A.verified && P ? Math.max(R.currentUser.teamPeakRating, A.newRating) : R.currentUser.teamPeakRating,
          division: A.verified && !P ? En(A.newRating) : R.currentUser.division,
          wins: F,
          losses: ee,
          winRate: F + ee > 0 ? Number((F / (F + ee) * 100).toFixed(1)) : 0,
          streak: P ? R.currentUser.streak : A.outcome === "win" ? Math.max(1, R.currentUser.streak + 1) : A.outcome === "loss" ? Math.min(-1, R.currentUser.streak - 1) : R.currentUser.streak
        }, Ue = K && A.verified ? {
          id: K.id,
          opponent: K.opponent.displayName,
          opponentId: K.opponent.id,
          opponentRating: P ? K.opponent.teamRating : K.opponent.rating,
          outcome: A.outcome,
          map: ((_a3 = K.selectedMap) == null ? void 0 : _a3.name) ?? "Arabia",
          civilization: ((_b = K.queue.civilizationPreference) == null ? void 0 : _b.civilization) ?? "",
          opponentCivilization: ((_c = K.opponentCivilizationPreference) == null ? void 0 : _c.civilization) ?? "",
          ratingChange: A.ratingChange,
          durationMinutes: 24,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          verified: A.verified,
          queueType: K.queue.name
        } : null;
        return {
          ...R,
          currentUser: oe,
          activeMatch: K,
          queueStatus: "completed",
          gameStatus: "installed",
          recentMatches: Ue ? [
            Ue,
            ...R.recentMatches
          ] : R.recentMatches
        };
      }), A.verificationStatus === "contested" ? (w("Replay reports conflicted; result discarded"), Z("Result contested. No rating change.", "warning")) : w("Match result verified");
    }
    async function za() {
      var _a2;
      (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null, ae.current && (await X.matchmaking.leaveQueue(ae.current).catch(() => {
      }), ae.current = null), ce.current = false, L.current = false, ne.current = null, p((A) => ({
        ...A,
        queueStatus: "idle",
        selectedQueue: null,
        queueStartedAt: null,
        activeMatch: null,
        error: null
      })), f("ranked");
    }
    function B(A) {
      p((R) => ({
        ...R,
        mockConfig: {
          ...R.mockConfig,
          ...A
        }
      }));
    }
    async function ue() {
      if (!window.electronApi) return;
      await ja(Qe.revealAfterStartMs);
      const A = await window.electronApi.startReplayEndDetection();
      A.started || w(`Replay detection unavailable: ${A.message ?? "unknown error"}`), await pc(), await window.electronApi.focusAoe2();
      const R = V.current;
      R.activeMatch && R.roomSetupStartedAt && Cg(R.activeMatch, Date.now() - new Date(R.roomSetupStartedAt).getTime()), p((K) => ({
        ...K,
        queueStatus: "in_game",
        roomSetupMilestone: null,
        transitionInputLocked: false,
        activeMatch: K.activeMatch ? {
          ...K.activeMatch,
          status: "in_game"
        } : null
      })), w("Showing AoE2 after game start");
    }
    function ve(A) {
      p((R) => {
        const K = {
          ...R.settings,
          ...A
        };
        return window.localStorage.setItem(xm, JSON.stringify(K)), {
          ...R,
          settings: K
        };
      });
    }
    const Le = {
      state: q,
      page: c,
      setPage: f,
      selectedProfileId: u,
      openPlayerProfile: (A) => {
        var _a2;
        c !== "profile" && (S(c), M.current = ((_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTop) ?? 0), m(A), f("profile");
      },
      returnFromPlayerProfile: () => {
        k.current = {
          page: h,
          top: M.current
        }, m(null), f(h);
      },
      queues: Ig,
      ensureAoe2Ready: tt,
      startQueue: be,
      updateActiveQueue: ot,
      cancelQueue: Ne,
      acceptMatch: Ze,
      declineMatch: Na,
      prepareLobby: aa,
      openAoe2: Ra,
      simulateMatchEnd: $t,
      returnToMatchmaking: za,
      updateMockConfig: B,
      updateSettings: ve,
      notify: Z,
      dismissNotification: W,
      clearError: () => p((A) => {
        var _a2;
        return {
          ...A,
          error: null,
          queueStatus: "idle",
          notifications: ((_a2 = A.error) == null ? void 0 : _a2.notificationId) ? A.notifications.filter((R) => {
            var _a3;
            return R.id !== ((_a3 = A.error) == null ? void 0 : _a3.notificationId);
          }) : A.notifications
        };
      }),
      authStatus: g,
      authError: z,
      signInWithSteam: ke,
      signOut: ze
    };
    return i.jsx(Mm.Provider, {
      value: Le,
      children: r
    });
  }
  function Y1(r, c) {
    return r instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(r.message) ? "Error: Matchmaking server is down." : r instanceof Error ? r.message : c;
  }
  async function gc(r) {
    if (!window.electronApi) return false;
    const c = Date.now() + r;
    for (; Date.now() < c; ) {
      const f = await window.electronApi.detectAoe2Process();
      if (f.running && f.windowReady) return true;
      await new Promise((u) => window.setTimeout(u, 500));
    }
    return false;
  }
  async function Q1(r) {
    if (!window.electronApi) return false;
    const c = await window.electronApi.launchAoe2();
    if (!c.launched) throw new Error(c.message ?? "Steam did not accept the AoE2 DE launch request.");
    if (await gc(G1)) return true;
    if ((await window.electronApi.detectAoe2Process()).running) r("AoE2 is still starting. Waiting another 30 seconds.");
    else {
      r("AoE2 did not start. Retrying the Steam launch once.");
      const u = await window.electronApi.launchAoe2();
      if (!u.launched) throw new Error(u.message ?? "Steam did not accept the AoE2 DE retry request.");
    }
    return gc(G1);
  }
  function cc(r) {
    return new Promise((c) => window.setTimeout(c, r));
  }
  function ja(r) {
    return new Promise((c) => window.setTimeout(c, r));
  }
  function yc(r) {
    var _a2;
    return (r && ((_a2 = hm(r.id)) == null ? void 0 : _a2.gameMapName)) ?? Et.maps[0].gameMapName;
  }
  function X1(r) {
    return r !== void 0 && oa.mapPicker.customMapNames.includes(yc(r));
  }
  function V1(r) {
    return r ? r.mode === "pick" ? r.civilization ?? null : r.mode === "random" ? null : r.mode === "mirror" ? "Mirror" : null : null;
  }
  function kt() {
    const r = E.useContext(Mm);
    if (!r) throw new Error("useAppStore must be used inside AppProvider");
    return r;
  }
  function Ng() {
    try {
      const r = window.localStorage.getItem(xm);
      if (!r) return gs;
      const c = JSON.parse(r);
      return {
        launchAoe2OnStartup: typeof c.launchAoe2OnStartup == "boolean" ? c.launchAoe2OnStartup : gs.launchAoe2OnStartup,
        matchNotifications: typeof c.matchNotifications == "boolean" ? c.matchNotifications : gs.matchNotifications,
        autoRejectFamilySharing: typeof c.autoRejectFamilySharing == "boolean" ? c.autoRejectFamilySharing : gs.autoRejectFamilySharing,
        maximumLowerOpponentRatingGap: [
          0,
          200,
          300,
          400,
          500
        ].includes(Number(c.maximumLowerOpponentRatingGap)) ? Number(c.maximumLowerOpponentRatingGap) : gs.maximumLowerOpponentRatingGap
      };
    } catch {
      return gs;
    }
  }
  function Rg(r) {
    return {
      ...r,
      verification: {
        correctPlayers: true,
        correctMap: true,
        correctSettings: true,
        cheatsDisabled: true,
        recordingEnabled: true,
        noUnexpectedPlayers: true
      }
    };
  }
  const Tg = ((_a = on.find((r) => r.id === "land-open")) == null ? void 0 : _a.maps) ?? [];
  function zg() {
    const { state: r } = kt(), c = r.currentUser, f = r.recentMatches.slice(0, 5).map((u) => u.outcome);
    return i.jsxs("section", {
      className: "page-grid",
      children: [
        i.jsx("div", {
          className: "hero-panel",
          children: i.jsxs("div", {
            children: [
              i.jsx("span", {
                className: "eyebrow",
                children: "Current Rating"
              }),
              i.jsx("div", {
                className: "rating-display",
                children: c.rating
              }),
              i.jsxs("p", {
                children: [
                  gi(c.rating),
                  " \xB7 Global Rank #",
                  c.rank.toLocaleString()
                ]
              })
            ]
          })
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(ra, {
              label: "Division",
              value: gi(c.rating),
              detail: `${c.wins + c.losses} ranked matches`
            }),
            i.jsx(ra, {
              label: "Season Record",
              value: `${c.wins}-${c.losses}`,
              detail: `${c.winRate}% win rate`
            }),
            i.jsx(ra, {
              label: "Current Streak",
              value: c.streak > 0 ? `W${c.streak}` : `L${Math.abs(c.streak)}`
            }),
            i.jsx(ra, {
              label: "Peak Rating",
              value: c.peakRating
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel span-2",
          children: [
            i.jsxs("div", {
              className: "panel-title",
              children: [
                i.jsx("h2", {
                  children: "Recent Matches"
                }),
                f.length > 0 && i.jsx(nm, {
                  form: f
                })
              ]
            }),
            i.jsxs("div", {
              className: "table recent-matches-table",
              children: [
                i.jsxs("div", {
                  className: "table-row table-header",
                  children: [
                    i.jsx("strong", {
                      children: "Result"
                    }),
                    i.jsx("span", {
                      children: "Opponent"
                    }),
                    i.jsx("span", {
                      children: "Map"
                    }),
                    i.jsx("span", {
                      children: "Civilization"
                    }),
                    i.jsx("span", {
                      children: "Rating"
                    }),
                    i.jsx("span", {
                      children: "Duration"
                    })
                  ]
                }),
                r.recentMatches.slice(0, 7).map((u) => i.jsxs("div", {
                  className: "table-row",
                  children: [
                    i.jsx("strong", {
                      className: u.outcome,
                      children: u.outcome === "win" ? "Victory" : u.outcome === "loss" ? "Defeat" : "No Contest"
                    }),
                    i.jsx("span", {
                      children: u.opponent
                    }),
                    i.jsx("span", {
                      children: u.map
                    }),
                    i.jsx("span", {
                      children: u.civilization && u.opponentCivilization ? `${u.civilization} vs. ${u.opponentCivilization}` : "Unknown civilizations"
                    }),
                    i.jsxs("span", {
                      className: u.ratingChange >= 0 ? "win" : "loss",
                      children: [
                        u.ratingChange > 0 ? "+" : "",
                        u.ratingChange
                      ]
                    }),
                    i.jsxs("span", {
                      children: [
                        u.durationMinutes,
                        "m"
                      ]
                    })
                  ]
                }, u.id)),
                r.recentMatches.length === 0 && i.jsx("div", {
                  className: "empty-state",
                  children: "You haven't played any matches yet."
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("h2", {
              children: "Current Open Land Map Pool"
            }),
            i.jsx(Np, {
              maps: Tg
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("h2", {
              children: "Platform Status"
            }),
            i.jsxs("div", {
              className: "status-list",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Matchmaking"
                    }),
                    i.jsx("strong", {
                      children: "Operational"
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Result service"
                    }),
                    i.jsx("strong", {
                      children: "Connected"
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Match history"
                    }),
                    i.jsxs("strong", {
                      children: [
                        r.recentMatches.length,
                        " recorded"
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function Ea({ label: r, options: c, value: f, onChange: u, className: m, disabled: h = false, searchable: S = false, displayValue: M }) {
    var _a2, _b;
    const k = E.useRef(null), [g, x] = E.useState(""), z = M ?? ((_a2 = c.find((q) => q.value === f)) == null ? void 0 : _a2.label) ?? ((_b = c[0]) == null ? void 0 : _b.label) ?? "", Y = S ? c.filter((q) => q.label.toLowerCase().includes(g.trim().toLowerCase())) : c;
    return E.useEffect(() => {
      const q = (p) => {
        const $ = k.current;
        ($ == null ? void 0 : $.open) && p.target instanceof Node && !$.contains(p.target) && $.removeAttribute("open");
      };
      return document.addEventListener("pointerdown", q), () => document.removeEventListener("pointerdown", q);
    }, []), i.jsxs("div", {
      className: m ? `themed-select-field ${m}` : "themed-select-field",
      children: [
        r && i.jsx("span", {
          children: r
        }),
        i.jsxs("details", {
          className: "themed-select",
          ref: k,
          onToggle: (q) => {
            q.currentTarget.open || x("");
          },
          children: [
            i.jsx("summary", {
              "aria-disabled": h,
              onClick: (q) => {
                h && q.preventDefault();
              },
              children: z
            }),
            i.jsxs("div", {
              className: "themed-select-options",
              children: [
                S && i.jsx("input", {
                  "aria-label": `Search ${r}`,
                  autoFocus: true,
                  className: "themed-select-search",
                  placeholder: "Search civilizations...",
                  type: "search",
                  value: g,
                  onChange: (q) => x(q.target.value)
                }),
                i.jsxs("div", {
                  className: "themed-select-option-list",
                  role: "listbox",
                  "aria-label": r || "Select option",
                  children: [
                    Y.map((q) => i.jsx("button", {
                      "aria-selected": q.value === f,
                      className: q.value === f ? "selected" : void 0,
                      disabled: h || q.disabled,
                      onClick: () => {
                        var _a3;
                        q.disabled || (u(q.value), (_a3 = k.current) == null ? void 0 : _a3.removeAttribute("open"));
                      },
                      role: "option",
                      type: "button",
                      children: q.label
                    }, q.value)),
                    Y.length === 0 && i.jsx("span", {
                      className: "themed-select-empty",
                      children: "No options found"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }
  const _g = {
    bonuses: [
      "Town Centers spawn 2 Villagers when the next Age is reached",
      "Cavalry +2 attack vs. Skirmishers",
      "Elephant Units receive -25% bonus damage and are more resistant to conversion",
      "Monks +3 melee/+3 pierce armor",
      "Ships regenerate 15 HP per minute"
    ],
    teamBonus: "Trade Units generate +10% food in addition to gold"
  }, Dg = {
    bonuses: [
      "Mining Camp technologies free",
      "Blacksmiths and Universities cost -100 wood",
      "Spearman-line deals +25% bonus damage",
      "Fervor and Sanctity affect Villagers",
      "Chemistry and Hand Cannoneer available in Castle Age"
    ],
    teamBonus: "Markets work +80% faster"
  }, Lg = {
    bonuses: [
      "Loom is researched instantly",
      "Hunters carry +15; hunted animals last +20% longer",
      "Infantry costs -15/20/25/30% in Dark/Feudal/Castle/ Imperial Age",
      "Infantry +1/+2/+3 attack vs. buildings in Feudal/ Castle/Imperial Age",
      "+10 population space in Imperial Age"
    ],
    teamBonus: "Barracks work +20% faster"
  }, Ug = {
    bonuses: [
      "Start with 2 Forage Bushes",
      "Can garrison livestock in Mills to passively produce food",
      "Mounted Units deal +20/30/40% bonus damage in Feudal/Castle/Imperial Age",
      "Docks +5 garrison capacity"
    ],
    teamBonus: "Camel and Elephant Units train +25% faster"
  }, Og = {
    bonuses: [
      "Advancing to the next Age costs -15%",
      "Foot Archers and Condottieri +1 melee/+1 pierce armor",
      "Dock and University technologies cost -25%",
      "Gunpowder Units cost -20%",
      "Fishing Ships cost -15%"
    ],
    teamBonus: "Condottiero available at the Barracks in Imperial Age"
  }, Bg = {
    bonuses: [
      "Villagers defeat wolves with one strike",
      "Scout Cavalry-line costs -15%",
      "Melee attack upgrades free"
    ],
    teamBonus: "Mounted Archers train +25% faster"
  }, qg = {
    bonuses: [
      "Advancing to the next Age is +66% faster",
      "Infantry armor upgrades free",
      "Battle Elephants cost -25/35% in Castle/Imperial Age",
      "Fish Traps cost -33% and provide +200% food"
    ],
    teamBonus: "Docks +6 line of sight"
  }, Hg = {
    bonuses: [
      "Wheelbarrow, Hand Cart free",
      "Infantry +20% HP starting in Feudal Age",
      "Warships cost -10/15/20% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Docks cost -15%"
  }, Gg = {
    bonuses: [
      "Mule Carts cost -25%",
      "Mule Cart technology effects +40%",
      "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier",
      "First Fortified Church receives a free Relic",
      "Galley-line and Dromons fire an additional projectile"
    ],
    teamBonus: "Infantry +2 line of sight"
  }, Yg = {
    bonuses: [
      "Start with +50 gold",
      "Villagers carry +3",
      "Military Units train +15% faster",
      "Monks gain +5 HP for each researched Monastery technology"
    ],
    teamBonus: "Relics generate +33% gold"
  }, Qg = {
    bonuses: [
      "Villagers move +5% faster in Dark Age, +10% faster starting in Feudal Age",
      "Stable Units cost -15/20% in Castle/Imperial Age",
      "Ships move +10% faster"
    ],
    teamBonus: "Genitour available at the Archery Range starting in Castle Age"
  }, Xg = {
    bonuses: [
      "Shepherds work +25% faster",
      "Town Centers cost -50% wood starting in Castle Age",
      "Foot Archers +1/+2 range in Castle/Imperial Age"
    ],
    teamBonus: "Archery Ranges work +10% faster"
  }, Vg = {
    bonuses: [
      "Militia-line upgrades free",
      "Blacksmith and Siege Workshop technologies cost -50% food",
      "Town Centers cost -50% stone",
      "Can build Krepost in Castle Age"
    ],
    teamBonus: "Blacksmiths work +80% faster"
  }, Zg = {
    bonuses: [
      "Economic upgrades available one age earlier and cost -40% food",
      "Stable technologies cost -50%",
      "Cavalier upgrade available in Castle Age",
      "Gunpowder Units +25% attack"
    ],
    teamBonus: "Relics generate food in addition to gold"
  }, Kg = {
    bonuses: [
      "Lumber Camp technologies free",
      "Infantry +1/+2/+3 attack in Feudal/Castle/Imperial Age",
      "Battle Elephants +1 melee/+1 pierce armor",
      "Monastery technologies cost -50%"
    ],
    teamBonus: "Relics visible on the map at the start of the game"
  }, Jg = {
    bonuses: [
      "Buildings +10/20/30/40% HP in Dark/Feudal/Castle/Imperial Age",
      "Camel Riders, Skirmishers and Spearman-line cost -25%",
      "Town Watch, Town Patrol free",
      "Advancing to Imperial Age costs -33%",
      "Fire Ships and Dromons attack +25% faster"
    ],
    teamBonus: "Monks heal +100% faster"
  }, Fg = {
    bonuses: [
      "Lumberjacks work +15% faster",
      "Livestock animals within Celt unit line of sight cannot be stolen",
      "Infantry moves +5/10/15/20% faster in Dark/Feudal/ Castle/Imperial Age",
      "Siege Weapons attack +25% faster"
    ],
    teamBonus: "Siege Workshops work +20% faster"
  }, $g = {
    bonuses: [
      "Start with +3 Villagers, but -50 wood and -200 food",
      "Technologies cost -5/10/15% in Feudal/Castle/Imperial Age",
      "Town Centers +7 line of sight and provide +15 population space",
      "Fire Lancers and Fire Ships move +5/10% faster in Castle/Imperial Age"
    ],
    teamBonus: "Farms +10% food"
  }, Wg = {
    bonuses: [
      "One additional Town Center can be built in Feudal Age",
      "Mounted Units move +5/10/15% faster in Feudal/ Castle/Imperial Age",
      "Archery Ranges and Stables cost -75 wood",
      "Siege Workshop and Battering Ram available in Feudal Age; Capped Ram available in Castle Age"
    ],
    teamBonus: "Palisade Walls +33% HP"
  }, Pg = {
    bonuses: [
      "Fishermen and Fishing Ships carry +15",
      "Receive +200 wood when advancing to the next Age",
      "Skirmishers and Elephant Archers attack +25% faster",
      "Barracks technologies cost -50%",
      "Siege Weapons cost -33% wood"
    ],
    teamBonus: "Docks provide +5 population space"
  }, e0 = {
    bonuses: [
      "Receive +100 gold and +100 food when advancing to the next Age",
      "Foot Archers attack +18% faster",
      "Pikeman upgrade free"
    ],
    teamBonus: "Outposts +3 line of sight and cost no stone"
  }, t0 = {
    bonuses: [
      "Foragers work +15% faster",
      "Mill technologies free",
      "Mounted Units +20% HP starting in Feudal Age",
      "Castles cost -15/25% in Castle/Imperial Age"
    ],
    teamBonus: "Knight-line +2 line of sight"
  }, a0 = {
    bonuses: [
      "Start with a Mule Cart",
      "Units and buildings receive -15% damage when located on higher elevation",
      "Mounted Units regenerate 2/8/14 HP per minute in Feudal/Castle/Imperial Age",
      "Fortified Churches provide Villagers in a 9 tiles radius with +10% work rate"
    ],
    teamBonus: "Building repairs cost -25%"
  }, n0 = {
    bonuses: [
      "Villagers cost -8/13/18/23% in Dark/Feudal/Castle/ Imperial Age",
      "Camel Riders attack +20% faster",
      "Gunpowder Units +1 melee/+1 pierce armor",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line and Camel Units +2 attack vs. buildings"
  }, s0 = {
    bonuses: [
      "Do not need houses, but start with -100 wood",
      "Cavalry Archers cost -10/20% in Castle/Imperial Age",
      "Trebuchets fire more accurately at units and small targets",
      "On Nomadic maps, the first Town Center spawns a scouting Horse"
    ],
    teamBonus: "Stables work +20% faster"
  }, i0 = {
    bonuses: [
      "Houses and Settlements provide +5 population space",
      "Buildings cost -15% stone",
      "Military Units cost -15/20/25/30% food in Dark/Feudal/Castle/Imperial Age",
      "Villagers affected by Infantry Blacksmith upgrades starting in Castle Age"
    ],
    teamBonus: "Start with a free Llama"
  }, l0 = {
    bonuses: [
      "Mills, Lumber- and Mining Camps cost -50%",
      "Infantry attacks +33% faster starting in Feudal Age",
      "Cavalry Archers +2 attack vs. Ranged Soldiers (except Skirmishers)",
      "Fishing Ships work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age; +100% HP"
    ],
    teamBonus: "Galley-line +4 line of sight"
  }, r0 = {
    bonuses: [
      "Meat of hunted and livestock animals doesn't decay",
      "Mounted Units and Fire Lancers attack +25% faster starting in Feudal Age",
      "Siege Engineers available in Castle Age",
      "Siege and Fortification upgrades cost -75% wood and research +100% faster",
      "Units receive -50% friendly fire damage"
    ],
    teamBonus: "Gunpowder Units +2 line of sight"
  }, o0 = {
    bonuses: [
      "Pastures replace Farms",
      "Melee attack upgrade effects are doubled",
      "Skirmishers, Spearman-, and Scout Cavalry-line train and upgrade +15% faster",
      "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"
    ],
    teamBonus: "Infantry +2 attack vs. Ranged Soldiers"
  }, c0 = {
    bonuses: [
      "No buildings required to advance to the next Age or to unlock other buildings",
      "Farmers don't require Mills or Town Centers to drop off food",
      "Villagers can garrison in Houses",
      "Battle Elephants move +10% faster"
    ],
    teamBonus: "Scorpions +1 range"
  }, u0 = {
    bonuses: [
      "Stone miners work +20% faster",
      "Ranged Soldiers and Infantry cost -50% wood",
      "Archer armor and tower upgrades free (Bombard Tower requires Chemistry)",
      "Warships cost -20% wood"
    ],
    teamBonus: "Villagers +3 line of sight"
  }, d0 = {
    bonuses: [
      "Each Town Center provides +100 food",
      "Spearman-line and Skirmisher-line move +10% faster",
      "Each garrisoned Relic provides +1 attack to Knight-line and Leitis (maximum +4)"
    ],
    teamBonus: "Monasteries work +20% faster"
  }, f0 = {
    bonuses: [
      "Buildings cost -15% wood",
      "Villagers drop off +10% more gold",
      "Barracks Units +1/+2/+3 pierce armor in Feudal/ Castle/Imperial Age"
    ],
    teamBonus: "Universities work +80% faster"
  }, m0 = {
    bonuses: [
      "Start with +1 Villager, but -50 food",
      "Resources last +15% longer",
      "Foot Archers cost -10/20/30% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Walls cost -50%"
  }, h0 = {
    bonuses: [
      "Hunters work +40% faster",
      "Cavalry Archers attack +25% faster",
      "Scout Cavalry-line and Steppe Lancers +20/30% HP in Castle/Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line +2 line of sight"
  }, p0 = {
    bonuses: [
      "Start with +50 wood and +50 food",
      "Town Centers and Docks +100% HP and work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age",
      "Parthian Tactics available in Castle Age",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Knight-line +2 attack vs. Ranged Soldiers"
  }, g0 = {
    bonuses: [
      "Folwark replaces Mill",
      "Villagers regenerate 10/15/20 HP in Feudal/Castle/Imperial Age",
      "Stone Miners generate gold in addition to stone",
      "Bloodlines and Scout Cavalry-line upgrades cost -50% food"
    ],
    teamBonus: "Scout Cavalry-line +1 attack vs. Ranged Soldiers"
  }, y0 = {
    bonuses: [
      "Foragers generate wood in addition to food",
      "All units cost -20% gold",
      "Can build Feitoria in Imperial Age",
      "Ships +10/15/20% HP in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Technologies research +25% faster"
  }, v0 = {
    bonuses: [
      "Villagers gather, build, and repair +5% faster",
      "Infantry armor upgrade effects are doubled",
      "Scorpions cost -50% gold",
      "Galley-line and Dromons +1 melee/+1 pierce armor"
    ],
    teamBonus: "Scorpions minimum range reduced"
  }, b0 = {
    bonuses: [
      "Market trading fee only 5%; Markets cost -100 wood",
      "Camel Units +25% HP",
      "Galley-line attacks +25% faster",
      "Transport Ships +100% HP, +20 carry capacity"
    ],
    teamBonus: "Foot Archers and Skirmishers +2 attack vs. buildings"
  }, w0 = {
    bonuses: [
      "Lumberjacks generate food in addition to wood",
      "Archery Unit technologies at the Archery Range and Blacksmith cost -25%",
      "Siege Weapons and Siege Warships move +10/15% faster in Castle/Imperial Age"
    ],
    teamBonus: "Foot Archers +2 line of sight"
  }, k0 = {
    bonuses: [
      "Start with +100 stone",
      "Farm upgrades provide +125% additional food",
      "Soldiers receive -40% bonus damage",
      "Can build Donjon in Dark Age, replaces Watch Tower-line",
      "Fortifications built +50% faster; Town Centers built +100% faster"
    ],
    teamBonus: "Transport Ships +5 line of sight and cost -50%"
  }, S0 = {
    bonuses: [
      "Farmers work +15% faster",
      "Arson, Gambesons free",
      "Siege Workshop Units cost -15%",
      "Monks move +20% faster"
    ],
    teamBonus: "Military buildings (except Castles) provide +5 population space"
  }, C0 = {
    bonuses: [
      "Builders work +30% faster",
      "Receive +20 gold for each technology researched",
      "Blacksmith upgrades cost no gold",
      "Gunpowder Units attack +18% faster",
      "Cannon Galleons fire more accurately at moving targets"
    ],
    teamBonus: "Trade Units generate +25% gold"
  }, x0 = {
    bonuses: [
      "Livestock animals last +50% longer",
      "Units deal +25% damage when fighting from higher elevation",
      "New Town Centers spawn 2 Sheep starting in Castle Age",
      "Thumb Ring, Parthian Tactics free"
    ],
    teamBonus: "Mounted Archers +2 line of sight"
  }, M0 = {
    bonuses: [
      "Farms cost -40%",
      "Town Centers +10 garrison capacity; Towers +5 garrison capacity",
      "Barracks and Stable Units +1/+2 melee armor in Castle/Imperial Age",
      "Monks +100% healing range",
      "Murder Holes, Herbal Medicine free"
    ],
    teamBonus: "Units more resistant to conversion"
  }, A0 = {
    bonuses: [
      "Gold miners work +25% faster",
      "Scout Cavalry-line +1 pierce armor and upgrades free",
      "Chemistry free; Gunpowder technologies costs -50%",
      "Gunpowder Units +25% HP"
    ],
    teamBonus: "Gunpowder Units train +25% faster"
  }, j0 = {
    bonuses: [
      "Enemy Town Centers are revealed at the start of the game",
      "Economic upgrades cost no wood and research +100% faster",
      "Archery Range units and Fire Lancers +20% HP",
      "Conscription free"
    ],
    teamBonus: "Imperial Skirmisher upgrade available in Imperial Age"
  }, I0 = {
    bonuses: [
      "Receive one free Villager for each economic upgrade researched",
      "Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age",
      "Traction Trebuchets and Lou Chuans cost -25%"
    ],
    teamBonus: "Cavalry +2 attack vs. Siege Weapons"
  }, E0 = {
    bonuses: [
      "Military production buildings and Docks provide +55 food",
      "Infantry regenerates 10/15/30 HP per minute in Feudal/Castle/Imperial Age",
      "Jian Swordsmen and Hei Guang Cavalry +2 attack in Imperial Age",
      "Careening, Dry Dock free"
    ],
    teamBonus: "Houses built +100% faster"
  }, Am = {
    Bengalis: _g,
    Bohemians: Dg,
    Goths: Lg,
    Gurjaras: Ug,
    Italians: Og,
    Magyars: Bg,
    Malay: qg,
    Vikings: Hg,
    Armenians: Gg,
    Aztecs: Yg,
    Berbers: Qg,
    Britons: Xg,
    Bulgarians: Vg,
    Burgundians: Zg,
    Burmese: Kg,
    Byzantines: Jg,
    Celts: Fg,
    Chinese: $g,
    Cumans: Wg,
    Dravidians: Pg,
    Ethiopians: e0,
    Franks: t0,
    Georgians: a0,
    Hindustanis: n0,
    Huns: s0,
    Incas: i0,
    Japanese: l0,
    Jurchens: r0,
    Khitans: o0,
    Khmer: c0,
    Koreans: u0,
    Lithuanians: d0,
    Malians: f0,
    Mayans: m0,
    Mongols: h0,
    Persians: p0,
    Poles: g0,
    Portuguese: y0,
    Romans: v0,
    Saracens: b0,
    Shu: w0,
    Sicilians: k0,
    Slavs: S0,
    Spanish: C0,
    Tatars: x0,
    Teutons: M0,
    Turks: A0,
    Vietnamese: j0,
    Wei: I0,
    Wu: E0
  }, N0 = "" + new URL("el4-ranked-D5FXYSG-.png", import.meta.url).href;
  function jm() {
    return i.jsx("aside", {
      className: "matchmaking-brand",
      "aria-label": "Empire League",
      children: i.jsx("img", {
        src: N0,
        alt: "Empire League"
      })
    });
  }
  function R0() {
    var _a2;
    const { state: r, prepareLobby: c } = kt(), f = !r.error, u = r.activeMatch, m = r.roomSetupEstimateMs ?? 6e4, [h, S] = E.useState(() => J1(r.roomSetupStartedAt, m)), M = rn.find((z) => {
      var _a3;
      return z.id === ((_a3 = u == null ? void 0 : u.selectedMap) == null ? void 0 : _a3.id);
    }) ?? (u == null ? void 0 : u.selectedMap), k = M ? (_a2 = hm(M.id)) == null ? void 0 : _a2.description : void 0, g = Z1(u == null ? void 0 : u.queue.civilizationPreference, u == null ? void 0 : u.opponentCivilizationPreference), x = Z1(u == null ? void 0 : u.opponentCivilizationPreference, u == null ? void 0 : u.queue.civilizationPreference);
    return E.useEffect(() => {
      const z = () => S(J1(r.roomSetupStartedAt, m));
      z();
      const Y = window.setInterval(z, 250);
      return () => window.clearInterval(Y);
    }, [
      m,
      r.roomSetupStartedAt
    ]), i.jsxs("section", {
      className: "search-waiting-layout",
      "aria-busy": f,
      children: [
        i.jsxs("div", {
          className: "search-state",
          children: [
            i.jsx("span", {
              className: "eyebrow",
              children: "Preparing game"
            }),
            i.jsx("h2", {
              children: h > 0 ? "Game starts in" : "Starting game\u2026"
            }),
            h > 0 && i.jsx("div", {
              className: "lobby-countdown",
              "aria-live": "polite",
              children: h
            }),
            i.jsxs("div", {
              className: "lobby-milestone",
              "aria-live": "polite",
              children: [
                i.jsx(om, {
                  size: 18,
                  className: "spin",
                  "aria-hidden": "true"
                }),
                i.jsx("span", {
                  children: r.roomSetupMilestone ?? "Preparing game"
                })
              ]
            }),
            r.error && i.jsxs("div", {
              className: "error-panel",
              children: [
                i.jsx("strong", {
                  children: r.error.message
                }),
                i.jsx("span", {
                  children: r.error.technicalDetails
                }),
                i.jsx("button", {
                  type: "button",
                  onClick: () => void c(),
                  children: "Try Again"
                })
              ]
            })
          ]
        }),
        i.jsx(jm, {}),
        i.jsxs("div", {
          className: "civilization-matchup",
          children: [
            i.jsxs("article", {
              className: "upcoming-map-card",
              children: [
                i.jsx("span", {
                  className: "eyebrow",
                  children: "Map"
                }),
                i.jsx("h3", {
                  children: (M == null ? void 0 : M.name) ?? "Map pending"
                }),
                (M == null ? void 0 : M.thumbnailUrl) ? i.jsx("img", {
                  src: M.thumbnailUrl,
                  alt: `Preview of ${M.name}`
                }) : i.jsx("div", {
                  className: "upcoming-map-placeholder",
                  children: "Map preview unavailable"
                }),
                k && i.jsx("p", {
                  className: "upcoming-map-description",
                  children: k
                })
              ]
            }),
            i.jsx(K1, {
              civilization: g,
              side: "player"
            }),
            i.jsx(K1, {
              civilization: x,
              side: "opponent"
            })
          ]
        })
      ]
    });
  }
  function Z1(r, c) {
    const f = (r == null ? void 0 : r.mode) === "mirror" ? c == null ? void 0 : c.civilization : r == null ? void 0 : r.civilization;
    return f && f in Am ? f : null;
  }
  function K1({ civilization: r, side: c }) {
    const f = r ? Am[r] : null;
    return i.jsxs("article", {
      className: `civ-bonus-card ${c}`,
      children: [
        i.jsx("span", {
          className: "eyebrow",
          children: c === "player" ? "Your civilization" : "Opponent civilization"
        }),
        i.jsx("h3", {
          children: r ?? "Random civilization"
        }),
        f ? i.jsxs(i.Fragment, {
          children: [
            i.jsx("ul", {
              children: f.bonuses.map((u) => i.jsx("li", {
                children: u
              }, u))
            }),
            i.jsxs("div", {
              className: "team-bonus",
              children: [
                i.jsx("span", {
                  children: "Team bonus"
                }),
                i.jsx("p", {
                  children: f.teamBonus
                })
              ]
            })
          ]
        }) : i.jsx("p", {
          className: "civ-bonus-unavailable",
          children: "Bonuses will be revealed when the civilization is known."
        })
      ]
    });
  }
  function J1(r, c) {
    const f = Math.ceil(c / 1e3);
    if (!r) return f;
    const u = Math.floor((Date.now() - new Date(r).getTime()) / 1e3);
    return Math.max(0, f - u);
  }
  function T0() {
    var _a2, _b;
    const { state: r, returnToMatchmaking: c } = kt(), f = r.activeMatch;
    return f ? i.jsxs("section", {
      className: "match-focus",
      children: [
        i.jsx("span", {
          className: "eyebrow",
          children: r.queueStatus === "verifying_result" ? "Result verification" : "Match in progress"
        }),
        i.jsxs("h2", {
          children: [
            f.player.displayName,
            " vs ",
            f.opponent.displayName
          ]
        }),
        r.queueStatus === "verifying_result" && i.jsx("p", {
          children: "Replay metadata submitted. The result will resolve when the opponent reports or the verification window ends."
        }),
        i.jsxs("div", {
          className: "metrics-grid compact",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  children: "Map"
                }),
                i.jsx("strong", {
                  children: (_a2 = f.selectedMap) == null ? void 0 : _a2.name
                })
              ]
            }),
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  children: "Lobby"
                }),
                i.jsx("strong", {
                  children: (_b = f.lobby) == null ? void 0 : _b.platformLobbyId
                })
              ]
            }),
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  children: "Status"
                }),
                i.jsx("strong", {
                  children: r.queueStatus.replaceAll("_", " ")
                })
              ]
            })
          ]
        }),
        r.queueStatus === "verifying_result" && i.jsx("div", {
          className: "button-row",
          children: i.jsx("button", {
            className: "primary",
            type: "button",
            onClick: () => void c(),
            children: "Return to matchmaking"
          })
        })
      ]
    }) : null;
  }
  function z0({ oldRating: r, newRating: c, onClose: f }) {
    E.useEffect(() => {
      const h = (S) => {
        S.key === "Escape" && f();
      };
      return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
    }, [
      f
    ]);
    const u = gi(r), m = gi(c);
    return i.jsx("div", {
      className: "modal-backdrop promotion-backdrop",
      role: "presentation",
      children: i.jsxs("section", {
        className: "match-modal promotion-modal",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "promotion-title",
        children: [
          i.jsx(jp, {
            className: "promotion-trophy",
            size: 54,
            "aria-hidden": "true"
          }),
          i.jsx("span", {
            className: "eyebrow",
            children: "Rank promotion"
          }),
          i.jsx("h2", {
            id: "promotion-title",
            children: "Congratulations!"
          }),
          i.jsx("p", {
            children: "Your victory earned you a new rank."
          }),
          i.jsxs("div", {
            className: "promotion-ranks",
            "aria-label": `Promoted from ${u} to ${m}`,
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("span", {
                    children: "Previous"
                  }),
                  i.jsx("strong", {
                    children: u
                  }),
                  i.jsxs("small", {
                    children: [
                      r,
                      " Elo"
                    ]
                  })
                ]
              }),
              i.jsx(dp, {
                size: 28,
                "aria-hidden": "true"
              }),
              i.jsxs("div", {
                className: "promotion-rank-new",
                children: [
                  i.jsx("span", {
                    children: "New rank"
                  }),
                  i.jsx("strong", {
                    children: m
                  }),
                  i.jsxs("small", {
                    children: [
                      c,
                      " Elo"
                    ]
                  })
                ]
              })
            ]
          }),
          i.jsx("button", {
            className: "primary",
            type: "button",
            onClick: f,
            autoFocus: true,
            children: "Continue"
          })
        ]
      })
    });
  }
  function _0() {
    const { state: r, setPage: c, returnToMatchmaking: f } = kt(), [u, m] = E.useState(true), h = r.activeMatch, S = h == null ? void 0 : h.result;
    if (!h || !S) return null;
    const M = S.outcome === "win", k = S.verificationStatus === "contested", g = S.verified && M && lp(S.oldRating, S.newRating);
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("section", {
          className: "result-screen",
          children: [
            i.jsx("span", {
              className: "eyebrow",
              children: k ? "Contested result" : "Verified result"
            }),
            i.jsx("h2", {
              className: M ? "win" : "loss",
              children: k ? "Result Contested" : M ? "Victory" : S.outcome === "loss" ? "Defeat" : "No Contest"
            }),
            k && i.jsx("p", {
              children: "The replay result could not be verified. The result was discarded and ratings were not changed."
            }),
            i.jsxs("div", {
              className: "rating-swing",
              children: [
                i.jsxs("strong", {
                  children: [
                    S.ratingChange > 0 ? "+" : "",
                    S.ratingChange,
                    " Rating"
                  ]
                }),
                i.jsx("span", {
                  children: k ? "No rating change" : `${S.oldRating} \u2192 ${S.newRating}`
                })
              ]
            }),
            i.jsxs("div", {
              className: "button-row",
              children: [
                i.jsx("button", {
                  className: "primary",
                  type: "button",
                  onClick: () => void f(),
                  children: "Return to Matchmaking"
                }),
                i.jsx("button", {
                  className: "secondary",
                  type: "button",
                  onClick: () => c("home"),
                  children: "Return Home"
                })
              ]
            })
          ]
        }),
        g && u && i.jsx(z0, {
          oldRating: S.oldRating,
          newRating: S.newRating,
          onClose: () => m(false)
        })
      ]
    });
  }
  const F1 = "arena", Im = "empire-league-map-guidance-seen";
  function D0() {
    if (ge) return true;
    try {
      return window.localStorage.getItem(Im) !== "1";
    } catch {
      return true;
    }
  }
  function L0({ groups: r, enabledGroupIds: c, selectedMapIds: f, favoriteMapIds: u, onToggleGroup: m, onToggleMap: h, onFavorite: S, disabled: M = false }) {
    const [k, g] = E.useState(D0);
    function x() {
      if (g(false), !ge) try {
        window.localStorage.setItem(Im, "1");
      } catch {
      }
    }
    return i.jsx("div", {
      className: "grouped-map-pool",
      children: r.map((z) => {
        const Y = c.includes(z.id), q = z.maps.some((p) => p.id === F1);
        return i.jsxs("section", {
          className: `${Y ? "map-group enabled" : "map-group"}${k && q ? " map-guidance-active" : ""}`,
          children: [
            i.jsxs("header", {
              className: "map-group-header",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: z.name
                    }),
                    i.jsx("span", {
                      children: z.description
                    })
                  ]
                }),
                i.jsxs("label", {
                  className: "group-switch",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: Y,
                      disabled: M,
                      onChange: () => m(z.id)
                    }),
                    i.jsx("span", {
                      "aria-hidden": "true"
                    }),
                    i.jsx("small", {
                      children: Y ? "Enabled" : "Disabled"
                    })
                  ]
                })
              ]
            }),
            i.jsx("div", {
              className: "map-group-grid",
              children: z.maps.map((p, $) => {
                const V = p.id === z.primaryMapId, ae = Y && f.includes(p.id), ce = u[z.id] === p.id;
                return i.jsxs("article", {
                  className: `group-map ${V ? "primary" : ""} ${ae ? "selected" : ""}${k && p.id === F1 ? " map-guidance-target" : ""}`,
                  children: [
                    i.jsxs("button", {
                      className: "group-map-select",
                      type: "button",
                      "aria-pressed": ae,
                      "aria-label": `${ae ? "Exclude" : "Include"} ${p.name}`,
                      disabled: M || !Y,
                      onClick: () => {
                        x(), h(z.id, p.id);
                      },
                      children: [
                        i.jsx("img", {
                          src: p.thumbnailUrl,
                          alt: ""
                        }),
                        i.jsx("span", {
                          className: "group-map-shade"
                        }),
                        i.jsxs("span", {
                          className: "group-map-name",
                          children: [
                            i.jsx("strong", {
                              children: p.name
                            }),
                            V && i.jsx("small", {
                              children: "Primary map"
                            })
                          ]
                        }),
                        !ae && i.jsx("span", {
                          className: "map-off-label",
                          children: Y ? "Off" : "Group off"
                        })
                      ]
                    }),
                    i.jsx("button", {
                      className: ce ? "map-favorite active" : "map-favorite",
                      type: "button",
                      disabled: M || !Y,
                      "aria-pressed": ce,
                      "aria-label": `${ce ? "Remove" : "Favorite"} ${p.name}`,
                      title: ce ? "Remove favorite" : `Favorite ${p.name}`,
                      onClick: () => S(z.id, p.id),
                      children: i.jsx(mm, {
                        size: $ === 0 ? 18 : 15,
                        fill: ce ? "currentColor" : "none"
                      })
                    })
                  ]
                }, p.id);
              })
            }),
            k && q && i.jsx("span", {
              className: "map-guidance-cue",
              "aria-hidden": "true",
              children: "Click a map to enable or disable it"
            })
          ]
        }, z.id);
      })
    });
  }
  const $1 = "empire-league-favorite-maps", ys = "empire-league-civilization-preference", Em = "empire-league-map-preferences", W1 = [
    {
      id: "pick",
      label: "Choose Civ",
      detail: "Play your selected civilization",
      icon: vi
    },
    {
      id: "random",
      label: "Random",
      detail: "Roll a civilization after the map is chosen",
      icon: xp
    },
    {
      id: "mirror",
      label: "Mirror",
      detail: "Match your opponent's civilization",
      icon: gp
    }
  ];
  function U0() {
    var _a2, _b, _c;
    const { state: r, queues: c, startQueue: f, updateActiveQueue: u, cancelQueue: m } = kt(), [h, S] = E.useState(0);
    E.useEffect(() => {
      if (hg !== "map-pool") return;
      const B = window.requestAnimationFrame(() => {
        var _a3;
        (_a3 = document.getElementById("map-pool")) == null ? void 0 : _a3.scrollIntoView({
          block: "start"
        });
      });
      return () => window.cancelAnimationFrame(B);
    }, []);
    const [M] = E.useState(() => q0(c)), [k, g] = E.useState(() => {
      var _a3;
      const B = jc().selectedQueueId;
      return c.some((ue) => ue.id === B) ? B : ((_a3 = c[0]) == null ? void 0 : _a3.id) ?? "";
    }), x = c.find((B) => B.id === k) ?? c[0], z = [
      "idle",
      "cancelled",
      "completed"
    ].includes(r.queueStatus) && (!r.activeMatch || r.queueStatus === "completed") && r.gameStatus !== "loading", Y = r.queueStatus === "searching", q = ![
      "idle",
      "cancelled",
      "completed",
      "searching"
    ].includes(r.queueStatus), [p, $] = E.useState(M.selectedMaps), [V, ae] = E.useState(M.enabledGroups), [ce, le] = E.useState(() => {
      try {
        const B = JSON.parse(window.localStorage.getItem($1) ?? "{}");
        return Object.fromEntries(Object.entries(B).map(([ue, ve]) => [
          ue,
          ve && typeof ve == "object" ? ve : {}
        ]));
      } catch {
        return {};
      }
    }), [he, J] = E.useState([
      2,
      4
    ]), [ne, T] = E.useState(true), [L, D] = E.useState(() => {
      try {
        const B = JSON.parse(window.localStorage.getItem(ys) ?? "{}");
        if (B.preferRandom === true) return "pick";
        const ue = B.mode;
        return ue === "prefer-random" || ue === "full-random" ? "random" : ue ?? "pick";
      } catch {
        return "pick";
      }
    }), [se, X] = E.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(ys) ?? "{}").civilization ?? "Byzantines";
      } catch {
        return "Byzantines";
      }
    }), [ke, ze] = E.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(ys) ?? "{}").preferRandom === true;
      } catch {
        return false;
      }
    }), [Te, tt] = E.useState(() => {
      try {
        const B = JSON.parse(window.localStorage.getItem(ys) ?? "{}");
        return {
          open: Array.isArray(B.openLandBans) ? B.openLandBans.slice(0, 5) : [],
          closed: Array.isArray(B.closedLandBans) ? B.closedLandBans.slice(0, 5) : []
        };
      } catch {
        return {
          open: [],
          closed: []
        };
      }
    }), [U, w] = E.useState(false), [Z, pe] = E.useState(false), [ye, v] = E.useState("open"), H = (B = L, ue = se, ve = Te) => {
      window.localStorage.setItem(ys, JSON.stringify({
        mode: B,
        civilization: ue,
        preferRandom: ke,
        openLandBans: ve.open,
        closedLandBans: ve.closed
      }));
    }, W = (B) => {
      ke && L === "pick" && (B === "pick" || B === "random") || (D(B), H(B));
    }, te = (B) => {
      X(B), H(L, B);
    }, fe = (B, ue) => {
      tt((ve) => {
        const Le = ve[B], A = Le.includes(ue) ? Le.filter((K) => K !== ue) : Le.length < 5 ? [
          ...Le,
          ue
        ] : Le, R = {
          ...ve,
          [B]: A
        };
        return H(L, se, R), R;
      });
    }, be = {
      preferRandom: ke,
      openLandBans: Te.open,
      closedLandBans: Te.closed
    }, Ne = (B, ue, ve) => {
      le((Le) => {
        const A = {
          ...Le[B] ?? {}
        };
        A[ue] === ve ? delete A[ue] : A[ue] = ve;
        const R = {
          ...Le,
          [B]: A
        };
        return window.localStorage.setItem($1, JSON.stringify(R)), R;
      }), $((Le) => {
        var _a3;
        return {
          ...Le,
          [B]: ((_a3 = Le[B]) == null ? void 0 : _a3.includes(ve)) ? Le[B] : [
            ...Le[B] ?? [],
            ve
          ]
        };
      });
    }, ot = (B, ue, ve) => {
      var _a3, _b2;
      ((_a3 = p[B]) == null ? void 0 : _a3.includes(ve)) && ((_b2 = ce[B]) == null ? void 0 : _b2[ue]) === ve && Ne(B, ue, ve), $((Le) => {
        const A = Le[B] ?? [], R = A.includes(ve), K = R ? A.filter((P) => P !== ve) : [
          ...A,
          ve
        ];
        return R && !vc(B, K, V[B] ?? [], c) ? Le : {
          ...Le,
          [B]: K
        };
      });
    }, Ze = (B, ue) => {
      ae((ve) => {
        const Le = ve[B] ?? [], A = Le.includes(ue) ? Le.filter((R) => R !== ue) : [
          ...Le,
          ue
        ];
        return vc(B, p[B] ?? [], A, c) ? {
          ...ve,
          [B]: A
        } : ve;
      });
    }, bt = x ? x.mapPool.filter((B) => {
      var _a3, _b2;
      const ue = on.find((ve) => ve.maps.some((Le) => Le.id === B.id));
      return ue && ((_a3 = V[x.id]) == null ? void 0 : _a3.includes(ue.id)) && ((_b2 = p[x.id]) == null ? void 0 : _b2.includes(B.id));
    }).map((B) => B.id) : [], Na = x ? Object.entries(ce[x.id] ?? {}).filter(([B, ue]) => {
      var _a3;
      return ((_a3 = V[x.id]) == null ? void 0 : _a3.includes(B)) && bt.includes(ue);
    }) : [], aa = Object.fromEntries(Na), Ra = Object.values(aa), $t = x ? Ra.map((B) => {
      var _a3;
      return (_a3 = x.mapPool.find((ue) => ue.id === B)) == null ? void 0 : _a3.name;
    }).filter(Boolean).join(", ") : "", Ta = L === "pick" ? se : (_a2 = W1.find((B) => B.id === L)) == null ? void 0 : _a2.label, za = (x == null ? void 0 : x.format) === "team" ? `${x.name} - ${he.map((B) => `${B}v${B}`).join(" or ")}` : x == null ? void 0 : x.name;
    return E.useEffect(() => {
      if (!r.queueStartedAt || r.queueStatus !== "searching") return;
      const B = window.setInterval(() => {
        S(Math.floor((Date.now() - new Date(r.queueStartedAt ?? Date.now()).getTime()) / 1e3));
      }, 1e3);
      return () => window.clearInterval(B);
    }, [
      r.queueStartedAt,
      r.queueStatus
    ]), E.useEffect(() => {
      H0(c, k, p, V);
    }, [
      V,
      c,
      p,
      k
    ]), E.useEffect(() => {
      if (!Y || !x) return;
      const B = window.setTimeout(() => {
        u({
          ...x,
          findAnyone: ne,
          teamSizes: x.format === "team" ? he : void 0,
          mapPool: x.mapPool.filter((ue) => bt.includes(ue.id)),
          mapPreferences: {
            enabledGroupIds: V[x.id] ?? [],
            favoriteMapIds: aa
          },
          mapCatalogVersion: Et.version,
          favoriteMapId: Ra[0],
          civilizationPreference: {
            mode: L,
            civilization: L === "pick" ? se : void 0,
            ...be
          }
        });
      }, 250);
      return () => window.clearTimeout(B);
    }, [
      se,
      Te,
      L,
      V,
      ce,
      ne,
      Y,
      ke,
      p,
      x,
      he
    ]), [
      "creating_lobby",
      "waiting_for_opponent",
      "verifying_lobby",
      "ready"
    ].includes(r.queueStatus) ? i.jsx(R0, {}) : r.queueStatus === "in_game" || r.queueStatus === "verifying_result" ? i.jsx(T0, {}) : r.queueStatus === "completed" ? i.jsx(_0, {}) : i.jsxs("section", {
      className: "stack queue-page",
      children: [
        x && i.jsxs("div", {
          className: "search-waiting-layout matchmaking-overview",
          children: [
            i.jsx("div", {
              className: "search-state",
              children: Y ? i.jsxs(i.Fragment, {
                children: [
                  i.jsx("div", {
                    className: "search-orbit",
                    children: i.jsx(Ul, {
                      size: 34
                    })
                  }),
                  i.jsx("h2", {
                    children: "Searching for an opponent"
                  }),
                  i.jsxs("div", {
                    className: "metrics-grid compact",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsxs("span", {
                            children: [
                              "Your ",
                              x.format === "team" ? "team " : "",
                              "rating"
                            ]
                          }),
                          i.jsx("strong", {
                            children: x.format === "team" ? r.currentUser.teamRating : r.currentUser.rating
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Current search range"
                          }),
                          i.jsx("strong", {
                            children: ne ? "Anyone" : `${r.searchRange.min}-${r.searchRange.max}`
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Time searching"
                          }),
                          i.jsx("strong", {
                            children: B0(h)
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Estimated wait"
                          }),
                          i.jsxs("strong", {
                            children: [
                              (_b = r.selectedQueue) == null ? void 0 : _b.estimatedWaitSeconds,
                              "s"
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  i.jsx("p", {
                    children: "Rating range expands automatically. Civilization and map changes below update your active search."
                  }),
                  i.jsxs("label", {
                    className: "toggle-row compact-toggle",
                    children: [
                      i.jsx("span", {
                        children: "Find anyone"
                      }),
                      i.jsx("input", {
                        type: "checkbox",
                        checked: ne,
                        onChange: (B) => T(B.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => void m(),
                    children: [
                      i.jsx(lm, {
                        size: 18
                      }),
                      " Cancel Search"
                    ]
                  })
                ]
              }) : i.jsxs(i.Fragment, {
                children: [
                  i.jsx("h2", {
                    children: za
                  }),
                  i.jsxs("div", {
                    className: "queue-stats",
                    children: [
                      i.jsxs("span", {
                        children: [
                          i.jsx(Ul, {
                            size: 18
                          }),
                          i.jsx("strong", {
                            children: x.playersSearching
                          }),
                          " searching"
                        ]
                      }),
                      i.jsxs("span", {
                        children: [
                          i.jsx(pp, {
                            size: 18
                          }),
                          i.jsxs("strong", {
                            children: [
                              "~",
                              x.estimatedWaitSeconds,
                              "s"
                            ]
                          }),
                          " wait"
                        ]
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "queue-summary",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Civilization"
                          }),
                          i.jsx("strong", {
                            children: Ta
                          })
                        ]
                      }),
                      L !== "mirror" && i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Prefer Random"
                          }),
                          i.jsx("strong", {
                            children: ke ? "Yes" : "No"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Maps enabled"
                          }),
                          i.jsx("strong", {
                            children: bt.length
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Favorites"
                          }),
                          i.jsx("strong", {
                            children: $t || "None"
                          })
                        ]
                      })
                    ]
                  }),
                  i.jsxs("label", {
                    className: "toggle-row compact-toggle",
                    children: [
                      i.jsx("span", {
                        children: "Find anyone"
                      }),
                      i.jsx("input", {
                        type: "checkbox",
                        checked: ne,
                        onChange: (B) => T(B.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "queue-search-button",
                    type: "button",
                    disabled: !z || bt.length === 0,
                    onClick: () => void f({
                      ...x,
                      findAnyone: ne,
                      teamSizes: x.format === "team" ? he : void 0,
                      mapPool: x.mapPool.filter((B) => bt.includes(B.id)),
                      mapPreferences: {
                        enabledGroupIds: V[x.id] ?? [],
                        favoriteMapIds: aa
                      },
                      mapCatalogVersion: Et.version,
                      favoriteMapId: Ra[0],
                      civilizationPreference: {
                        mode: L,
                        civilization: L === "pick" ? se : void 0,
                        ...be
                      }
                    }),
                    children: [
                      i.jsx(Ul, {
                        size: 22
                      }),
                      " ",
                      r.gameStatus === "loading" ? "Launching AoE2\u2026" : "Find Match"
                    ]
                  })
                ]
              })
            }),
            i.jsx(jm, {})
          ]
        }),
        x ? i.jsx(i.Fragment, {
          children: i.jsxs("div", {
            className: "play-config-layout matchmaking-preferences",
            children: [
              i.jsxs("article", {
                className: "queue-card play-preferences",
                children: [
                  i.jsxs("div", {
                    className: "preference-section match-type-section",
                    children: [
                      i.jsx("span", {
                        className: "eyebrow",
                        children: "Match type"
                      }),
                      i.jsx("div", {
                        className: "match-type-options",
                        children: c.map((B) => {
                          const ue = B.id === "team-games", ve = ue ? vs : vi;
                          return i.jsxs("button", {
                            className: x.id === B.id ? "civilization-mode active" : "civilization-mode",
                            type: "button",
                            "aria-pressed": x.id === B.id,
                            disabled: Y || q,
                            onClick: () => g(B.id),
                            children: [
                              i.jsx(ve, {
                                size: 20
                              }),
                              i.jsxs("span", {
                                children: [
                                  i.jsx("strong", {
                                    children: ue ? "Team vs Team" : "1v1"
                                  }),
                                  i.jsx("small", {
                                    children: B.ruleset
                                  })
                                ]
                              })
                            ]
                          }, B.id);
                        })
                      }),
                      x.format === "team" && i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("span", {
                            className: "eyebrow",
                            children: "Team size"
                          }),
                          i.jsx("div", {
                            className: "match-type-options",
                            "aria-label": "Team game sizes",
                            children: [
                              2,
                              4
                            ].map((B) => {
                              const ue = he.includes(B);
                              return i.jsxs("button", {
                                className: ue ? "civilization-mode active" : "civilization-mode",
                                type: "button",
                                "aria-pressed": ue,
                                disabled: Y || q,
                                onClick: () => J((ve) => ve.includes(B) ? ve.length === 1 ? ve : ve.filter((Le) => Le !== B) : [
                                  ...ve,
                                  B
                                ].sort()),
                                children: [
                                  i.jsx(vs, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsxs("strong", {
                                        children: [
                                          B,
                                          "v",
                                          B
                                        ]
                                      }),
                                      i.jsxs("small", {
                                        children: [
                                          B * 2,
                                          " players"
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              }, B);
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "preference-section",
                    children: [
                      i.jsx("div", {
                        className: "preference-heading civilization-preference-heading",
                        children: i.jsx("div", {
                          children: i.jsx("span", {
                            className: "eyebrow",
                            children: "Civilization"
                          })
                        })
                      }),
                      i.jsx("div", {
                        className: "civilization-modes",
                        children: W1.map((B) => {
                          const ue = B.icon;
                          return i.jsxs("div", {
                            className: L === B.id || ke && L === "pick" && B.id === "random" ? "civilization-option-card active" : "civilization-option-card",
                            children: [
                              i.jsxs("button", {
                                className: "civilization-mode-choice",
                                type: "button",
                                "aria-pressed": L === B.id || ke && L === "pick" && B.id === "random",
                                disabled: q,
                                onClick: () => W(B.id),
                                children: [
                                  i.jsx(ue, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsx("strong", {
                                        children: B.label
                                      }),
                                      B.detail && i.jsx("small", {
                                        children: B.detail
                                      })
                                    ]
                                  })
                                ]
                              }),
                              B.id === "pick" && i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx(Ea, {
                                    className: "civilization-select",
                                    label: "Civilization",
                                    options: Ol.map((ve) => ({
                                      value: ve,
                                      label: ve
                                    })),
                                    value: se,
                                    onChange: te,
                                    disabled: q || L !== "pick",
                                    searchable: true,
                                    displayValue: L === "pick" ? void 0 : "N/A"
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-select-activate",
                                    type: "button",
                                    "aria-label": `Choose ${se}`,
                                    disabled: q,
                                    onClick: () => W("pick")
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-card-settings",
                                    type: "button",
                                    "aria-label": "Configure chosen civilization behavior",
                                    disabled: q,
                                    onClick: () => pe(true),
                                    children: i.jsx(hc, {
                                      size: 17
                                    })
                                  })
                                ]
                              }),
                              B.id === "random" && i.jsx("button", {
                                className: "civilization-card-settings",
                                type: "button",
                                "aria-label": "Configure random civilization bans",
                                disabled: q,
                                onClick: () => w(true),
                                children: i.jsx(hc, {
                                  size: 17
                                })
                              })
                            ]
                          }, B.id);
                        })
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "preference-section map-preference-section",
                    id: "map-pool",
                    children: [
                      i.jsxs("div", {
                        className: "preference-heading",
                        children: [
                          i.jsx("div", {
                            children: i.jsx("span", {
                              className: "eyebrow",
                              children: "Map pool"
                            })
                          }),
                          i.jsxs("span", {
                            className: "selection-count",
                            children: [
                              bt.length,
                              " maps across ",
                              ((_c = V[x.id]) == null ? void 0 : _c.length) ?? 0,
                              " groups"
                            ]
                          })
                        ]
                      }),
                      i.jsx(L0, {
                        groups: on,
                        enabledGroupIds: V[x.id] ?? [],
                        selectedMapIds: p[x.id] ?? [],
                        favoriteMapIds: ce[x.id] ?? {},
                        onToggleGroup: (B) => Ze(x.id, B),
                        onToggleMap: (B, ue) => ot(x.id, B, ue),
                        onFavorite: (B, ue) => Ne(x.id, B, ue),
                        disabled: q
                      })
                    ]
                  })
                ]
              }, x.id),
              false
            ]
          })
        }) : i.jsx("div", {
          className: "empty-state",
          children: "No matchmaking modes are available."
        }),
        U && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "civ-ban-title",
          onMouseDown: () => w(false),
          children: i.jsxs("div", {
            className: "match-modal civilization-ban-modal",
            onMouseDown: (B) => B.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "civilization-ban-header",
                children: i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      className: "eyebrow",
                      children: "Random civilization settings"
                    }),
                    i.jsx("h2", {
                      id: "civ-ban-title",
                      children: "Civilization bans"
                    })
                  ]
                })
              }),
              i.jsx("p", {
                children: "Ban up to 5 civilizations for each map style. Both players' bans are combined, so neither player can roll a banned civilization."
              }),
              i.jsx(Ea, {
                className: "civilization-ban-map-select",
                label: "Map style",
                options: [
                  {
                    value: "open",
                    label: `Open land maps (${Te.open.length}/5 banned)`
                  },
                  {
                    value: "closed",
                    label: `Closed land maps (${Te.closed.length}/5 banned)`
                  }
                ],
                value: ye,
                onChange: (B) => v(B)
              }),
              i.jsx(O0, {
                title: ye === "open" ? "Open land maps" : "Closed land maps",
                selected: Te[ye],
                onToggle: (B) => fe(ye, B)
              }),
              i.jsxs("div", {
                className: "modal-actions",
                children: [
                  i.jsx("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => {
                      const B = {
                        open: [],
                        closed: []
                      };
                      tt(B), H(L, se, B);
                    },
                    children: "Clear bans"
                  }),
                  i.jsx("button", {
                    className: "primary",
                    type: "button",
                    onClick: () => w(false),
                    children: "Done"
                  })
                ]
              })
            ]
          })
        }),
        Z && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "prefer-random-title",
          onMouseDown: () => pe(false),
          children: i.jsxs("div", {
            className: "match-modal prefer-random-modal",
            onMouseDown: (B) => B.stopPropagation(),
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("span", {
                    className: "eyebrow",
                    children: "Choose Civ settings"
                  }),
                  i.jsx("h2", {
                    id: "prefer-random-title",
                    children: "Civilization preference"
                  })
                ]
              }),
              i.jsxs("label", {
                className: "prefer-random-option",
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: ke,
                    onChange: (B) => {
                      const ue = B.target.checked, ve = ue ? "pick" : L;
                      ze(ue), ue && D("pick"), window.localStorage.setItem(ys, JSON.stringify({
                        mode: ve,
                        civilization: se,
                        preferRandom: ue,
                        openLandBans: Te.open,
                        closedLandBans: Te.closed
                      }));
                    }
                  }),
                  i.jsxs("span", {
                    children: [
                      i.jsx("strong", {
                        children: "Prefer random"
                      }),
                      i.jsx("small", {
                        children: "If your opponent selects Random, you\u2019ll also receive a random civilization. Otherwise, you\u2019ll play your selected civilization."
                      })
                    ]
                  })
                ]
              }),
              i.jsx("button", {
                className: "primary",
                type: "button",
                onClick: () => pe(false),
                children: "Done"
              })
            ]
          })
        })
      ]
    });
  }
  function O0({ title: r, selected: c, onToggle: f }) {
    return i.jsxs("section", {
      className: "civilization-ban-group",
      children: [
        i.jsxs("div", {
          className: "civilization-ban-group-heading",
          children: [
            i.jsx("strong", {
              children: r
            }),
            i.jsxs("span", {
              children: [
                c.length,
                "/5 selected"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "civilization-ban-grid",
          children: Ol.map((u) => {
            const m = c.includes(u);
            return i.jsxs("label", {
              className: m ? "selected" : "",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: m,
                  disabled: !m && c.length >= 5,
                  onChange: () => f(u)
                }),
                i.jsx("span", {
                  children: u
                })
              ]
            }, u);
          })
        })
      ]
    });
  }
  function B0(r) {
    return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
  }
  function jc() {
    try {
      const r = JSON.parse(window.localStorage.getItem(Em) ?? "{}");
      return r && typeof r == "object" ? r : {
        version: 1
      };
    } catch {
      return {
        version: 1
      };
    }
  }
  function q0(r) {
    var _a2, _b, _c, _d;
    const c = jc(), f = {}, u = {};
    for (const m of r) {
      const h = new Set(((_b = (_a2 = c.queues) == null ? void 0 : _a2[m.id]) == null ? void 0 : _b.deselectedMapIds) ?? []), S = new Set(((_d = (_c = c.queues) == null ? void 0 : _c[m.id]) == null ? void 0 : _d.disabledGroupIds) ?? []);
      if (f[m.id] = m.mapPool.map((M) => M.id).filter((M) => !h.has(M)), u[m.id] = on.map((M) => M.id).filter((M) => !S.has(M)), !vc(m.id, f[m.id], u[m.id], r)) {
        const M = m.mapPool[0], k = on.find((g) => g.maps.some((x) => x.id === (M == null ? void 0 : M.id)));
        M && k && (f[m.id] = [
          .../* @__PURE__ */ new Set([
            ...f[m.id],
            M.id
          ])
        ], u[m.id] = [
          .../* @__PURE__ */ new Set([
            ...u[m.id],
            k.id
          ])
        ]);
      }
    }
    return {
      selectedMaps: f,
      enabledGroups: u
    };
  }
  function vc(r, c, f, u) {
    var _a2;
    const m = new Set(((_a2 = u.find((S) => S.id === r)) == null ? void 0 : _a2.mapPool.map((S) => S.id)) ?? []), h = new Set(on.filter((S) => f.includes(S.id)).flatMap((S) => S.maps.map((M) => M.id)));
    return c.some((S) => m.has(S) && h.has(S));
  }
  function H0(r, c, f, u) {
    var _a2;
    const m = jc(), h = {
      ...m.queues ?? {}
    };
    for (const S of r) {
      const M = new Set(S.mapPool.map((Y) => Y.id)), k = new Set(on.map((Y) => Y.id)), g = (_a2 = m.queues) == null ? void 0 : _a2[S.id], x = ((g == null ? void 0 : g.deselectedMapIds) ?? []).filter((Y) => !M.has(Y)), z = ((g == null ? void 0 : g.disabledGroupIds) ?? []).filter((Y) => !k.has(Y));
      h[S.id] = {
        deselectedMapIds: [
          .../* @__PURE__ */ new Set([
            ...x,
            ...S.mapPool.map((Y) => Y.id).filter((Y) => !(f[S.id] ?? []).includes(Y))
          ])
        ],
        disabledGroupIds: [
          .../* @__PURE__ */ new Set([
            ...z,
            ...on.map((Y) => Y.id).filter((Y) => !(u[S.id] ?? []).includes(Y))
          ])
        ]
      };
    }
    window.localStorage.setItem(Em, JSON.stringify({
      version: 1,
      selectedQueueId: c,
      queues: h
    }));
  }
  const pi = [
    {
      name: "FFA Nomad",
      shortName: "Nomad",
      description: "No town center. No teammates. Find your footing, claim the wilds, and outlast every rival.",
      details: [
        "8 players",
        "Free for all",
        "Nomad start"
      ]
    },
    {
      name: "CBA",
      shortName: "CBA",
      description: "The classic Castle Blood Automatic scenario. Break enemy gates and earn stronger units with every raze.",
      details: [
        "4v4",
        "Scenario",
        "Fast action"
      ]
    },
    {
      name: "FFA Arena",
      shortName: "Arena",
      description: "Eight kingdoms begin behind stone walls. Boom in peace, then decide exactly when to strike.",
      details: [
        "8 players",
        "Free for all",
        "Arena"
      ]
    }
  ], G0 = /* @__PURE__ */ new Date("2026-07-27T00:00:00"), Y0 = 10080 * 60 * 1e3;
  function Q0(r) {
    return (Math.floor((r.getTime() - G0.getTime()) / Y0) % pi.length + pi.length) % pi.length;
  }
  function X0() {
    const [r, c] = E.useState(false), f = E.useMemo(() => {
      const m = Q0(/* @__PURE__ */ new Date());
      return [
        0,
        1,
        2
      ].map((h) => pi[(m + h) % pi.length]);
    }, []), u = f[0];
    return i.jsxs("section", {
      className: "weekly-page",
      children: [
        i.jsxs("div", {
          className: "weekly-hero",
          children: [
            i.jsxs("div", {
              className: "weekly-hero-copy",
              children: [
                i.jsxs("span", {
                  className: "weekly-kicker",
                  children: [
                    i.jsx(Mp, {
                      size: 14
                    }),
                    " This week\u2019s game"
                  ]
                }),
                i.jsx("h2", {
                  children: u.name
                }),
                i.jsx("p", {
                  children: u.description
                }),
                i.jsx("div", {
                  className: "weekly-mode-details",
                  children: u.details.map((m, h) => i.jsxs("span", {
                    children: [
                      h === 0 ? i.jsx(vs, {
                        size: 15
                      }) : h === 1 ? i.jsx(vi, {
                        size: 15
                      }) : i.jsx(fm, {
                        size: 15
                      }),
                      m
                    ]
                  }, m))
                })
              ]
            }),
            i.jsxs("div", {
              className: "weekly-queue-card",
              children: [
                i.jsx("span", {
                  children: "Just for fun"
                }),
                i.jsx("strong", {
                  children: "Unranked \xB7 Weekly rules"
                }),
                i.jsxs("button", {
                  className: r ? "weekly-join queued" : "weekly-join",
                  type: "button",
                  onClick: () => c((m) => !m),
                  children: [
                    r ? i.jsx(yi, {
                      size: 18
                    }) : i.jsx(vi, {
                      size: 18
                    }),
                    r ? "Leave queue" : "Join weekly queue"
                  ]
                }),
                i.jsx("small", {
                  children: r ? "Searching for fellow challengers\u2026" : "Ratings are not affected"
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "weekly-heading",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  className: "eyebrow",
                  children: "Three-week rotation"
                }),
                i.jsx("h2", {
                  children: "On the horizon"
                })
              ]
            }),
            i.jsxs("span", {
              className: "weekly-reset",
              children: [
                i.jsx(rm, {
                  size: 15
                }),
                " Changes every Monday"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "weekly-rotation",
          "aria-label": "Weekly game rotation",
          children: f.map((m, h) => i.jsxs("article", {
            className: h === 0 ? "weekly-rotation-card current" : "weekly-rotation-card",
            children: [
              i.jsx("div", {
                className: "weekly-week-marker",
                children: i.jsx("span", {
                  children: h === 0 ? "Now" : `0${h + 1}`
                })
              }),
              i.jsxs("div", {
                className: "weekly-card-copy",
                children: [
                  i.jsx("span", {
                    className: "weekly-timing",
                    children: h === 0 ? "Playing this week" : h === 1 ? "Next week" : "In 2 weeks"
                  }),
                  i.jsx("h3", {
                    children: m.name
                  }),
                  i.jsx("p", {
                    children: m.description
                  }),
                  i.jsx("div", {
                    className: "weekly-card-tags",
                    children: m.details.map((S) => i.jsx("span", {
                      children: S
                    }, S))
                  })
                ]
              }),
              h < f.length - 1 && i.jsx("div", {
                className: "weekly-connector",
                "aria-hidden": "true"
              })
            ]
          }, m.name))
        }),
        i.jsxs("div", {
          className: "weekly-note",
          children: [
            i.jsx(im, {
              size: 18
            }),
            i.jsxs("p", {
              children: [
                i.jsx("strong", {
                  children: "Same time, different battlefield."
                }),
                " The weekly queue rotates automatically through Nomad, CBA, and Arena. No Elo, no pressure. Just a change of pace."
              ]
            })
          ]
        })
      ]
    });
  }
  const et = {
    async list() {
      return ge ? lc : (await xe.request("/custom-lobbies")).rooms;
    },
    async create(r) {
      return ge ? {
        ...lc[0],
        id: "preview-created",
        name: r.name,
        maxPlayers: r.maxPlayers
      } : (await xe.request("/custom-lobbies", {
        method: "POST",
        body: {
          name: r.name,
          maxPlayers: r.maxPlayers,
          map: P1(r.map),
          dataMod: P1(r.dataMod)
        }
      })).room;
    },
    async join(r, c) {
      if (ge) {
        const f = lc.find((h) => h.id === r);
        if (!f || !c) throw new Error("The preview lobby is unavailable.");
        if (f.players.some((h) => h.id === c.id)) return f;
        const u = new Set(f.players.map((h) => h.slot)), m = Array.from({
          length: f.maxPlayers
        }, (h, S) => S + 1).find((h) => !u.has(h));
        if (!m) throw new Error("The preview lobby is full.");
        return {
          ...f,
          players: [
            ...f.players,
            {
              ...c,
              slot: m,
              team: 0,
              civilization: "Random",
              ready: false,
              host: false
            }
          ],
          messages: [
            ...f.messages,
            {
              id: `preview-join-${f.id}`,
              author: "Empire League",
              text: `${c.displayName} joined the lobby.`,
              sentAt: (/* @__PURE__ */ new Date()).toISOString(),
              system: true
            }
          ]
        };
      }
      return (await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/join`, {
        method: "POST"
      })).room;
    },
    async leave(r) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/leave`, {
        method: "POST"
      });
    },
    async updatePlayer(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/player`, {
        method: "PATCH",
        body: c
      });
    },
    async updateSettings(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/settings`, {
        method: "PATCH",
        body: c
      });
    },
    async sendMessage(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/messages`, {
        method: "POST",
        body: {
          text: c
        }
      });
    },
    async kick(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/players/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async start(r) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/start`, {
        method: "POST"
      });
    },
    async publish(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/publish`, {
        method: "POST",
        body: {
          platformLobbyId: c
        }
      });
    },
    async reportJoined(r) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/joined`, {
        method: "POST"
      });
    },
    async reportAoeReady(r) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/aoe-ready`, {
        method: "POST"
      });
    },
    async completeStart(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/complete-start`, {
        method: "POST",
        body: {
          gameStartedAt: c
        }
      });
    },
    async finish(r) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/finish`, {
        method: "POST"
      });
    },
    async failStart(r, c) {
      ge || await xe.request(`/custom-lobbies/${encodeURIComponent(r)}/fail-start`, {
        method: "POST",
        body: {
          error: c
        }
      });
    },
    onEvent(r) {
      return ge ? () => {
      } : xe.onCustomLobbyEvent(r);
    }
  };
  function P1(r) {
    return r ? {
      id: r.id,
      name: r.name,
      gameName: r.gameName,
      kind: r.kind
    } : void 0;
  }
  const em = {
    maps: [],
    dataMods: [],
    scannedRoots: [],
    scannedAt: (/* @__PURE__ */ new Date(0)).toISOString()
  };
  function V0() {
    const { state: r, notify: c, ensureAoe2Ready: f } = kt(), [u, m] = E.useState([]), [h, S] = E.useState(em), [M, k] = E.useState(true), [g, x] = E.useState(true), [z, Y] = E.useState(false), [q, p] = E.useState(`${r.currentUser.displayName}'s Lobby`), [$, V] = E.useState("map"), [ae, ce] = E.useState(""), [le, he] = E.useState(""), [J, ne] = E.useState(""), [T, L] = E.useState(8), [D, se] = E.useState(false), X = u.find((w) => w.players.some((Z) => Z.id === r.currentUser.id));
    async function ke() {
      k(true);
      try {
        m(await et.list());
      } catch (w) {
        c("Custom lobbies could not be loaded.", "danger", {
          detail: Bt(w)
        });
      } finally {
        k(false);
      }
    }
    async function ze() {
      var _a2;
      x(true);
      try {
        const w = await (((_a2 = window.electronApi) == null ? void 0 : _a2.scanLocalCustomContent()) ?? Promise.resolve(em));
        S(w), ce((Z) => w.maps.some((pe) => pe.id === Z) ? Z : ""), he((Z) => w.maps.some((pe) => pe.id === Z) ? Z : ""), ne((Z) => w.dataMods.some((pe) => pe.id === Z) ? Z : "");
      } catch (w) {
        c("Local content could not be scanned.", "danger", {
          detail: Bt(w)
        });
      } finally {
        x(false);
      }
    }
    E.useEffect(() => (ke(), ze(), et.onEvent((w) => {
      m((Z) => ((w.closedRoomId ? Z.find((ye) => ye.id === w.closedRoomId && ye.players.some((v) => v.id === r.currentUser.id)) : void 0) && w.closeReason && c("Custom lobby closed.", "warning", {
        detail: w.closeReason
      }), w.rooms));
    })), []);
    async function Te() {
      se(true);
      try {
        const w = $ === "map" ? ae : le;
        await et.create({
          name: q.trim(),
          maxPlayers: T,
          map: h.maps.find((Z) => Z.id === w),
          dataMod: h.dataMods.find((Z) => Z.id === J)
        }), Y(false);
      } catch (w) {
        c("The lobby could not be created.", "danger", {
          detail: Bt(w)
        });
      } finally {
        se(false);
      }
    }
    async function tt() {
      await f("custom") && Y(true);
    }
    async function U(w) {
      if (await f("custom")) {
        se(true);
        try {
          const Z = await et.join(w, {
            id: r.currentUser.id,
            displayName: r.currentUser.displayName
          });
          m((pe) => pe.map((ye) => ye.id === Z.id ? Z : ye));
        } catch (Z) {
          c("Could not join the lobby.", "danger", {
            detail: Bt(Z)
          });
        } finally {
          se(false);
        }
      }
    }
    return X ? i.jsx(Z0, {
      room: X,
      currentPlayerId: r.currentUser.id,
      notify: c
    }) : i.jsxs("section", {
      className: "custom-page",
      children: [
        i.jsxs("div", {
          className: "custom-intro",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  className: "eyebrow",
                  children: "Community games"
                }),
                i.jsx("h2", {
                  children: "Custom lobby browser"
                }),
                i.jsx("p", {
                  children: "Browse live Empire League rooms or create one using content installed on your PC."
                })
              ]
            }),
            i.jsx("div", {
              className: "button-row",
              children: !z && i.jsxs("button", {
                className: "primary",
                type: "button",
                disabled: r.gameStatus === "loading",
                onClick: () => void tt(),
                children: [
                  i.jsx(Cp, {
                    size: 17
                  }),
                  " ",
                  r.gameStatus === "loading" ? "Launching AoE2\u2026" : "Create Lobby"
                ]
              })
            })
          ]
        }),
        z && i.jsxs("article", {
          className: "panel custom-create-card",
          children: [
            i.jsxs("div", {
              className: "custom-create-heading",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      className: "eyebrow",
                      children: "New room"
                    }),
                    i.jsx("h2", {
                      children: "Lobby settings"
                    })
                  ]
                }),
                i.jsxs("button", {
                  className: "secondary",
                  type: "button",
                  onClick: () => void ze(),
                  disabled: g,
                  children: [
                    i.jsx(D1, {
                      size: 16,
                      className: g ? "spin" : ""
                    }),
                    " ",
                    g ? "Scanning\u2026" : "Rescan Content"
                  ]
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Lobby name",
                i.jsx("input", {
                  value: q,
                  maxLength: 64,
                  onChange: (w) => p(w.target.value)
                })
              ]
            }),
            i.jsx(Ea, {
              label: "Maximum players",
              value: String(T),
              onChange: (w) => L(Number(w)),
              options: Array.from({
                length: 7
              }, (w, Z) => {
                const pe = Z + 2;
                return {
                  value: String(pe),
                  label: `${pe} players`
                };
              })
            }),
            i.jsxs("div", {
              className: "custom-content-kind-field",
              children: [
                i.jsx("span", {
                  children: "Content type"
                }),
                i.jsxs("div", {
                  className: "custom-content-kind",
                  role: "group",
                  "aria-label": "Content type",
                  children: [
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": $ === "map",
                      onClick: () => V("map"),
                      children: "Map"
                    }),
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": $ === "scenario",
                      onClick: () => V("scenario"),
                      children: "Scenario"
                    })
                  ]
                })
              ]
            }),
            $ === "map" ? i.jsx(uc, {
              label: "Map",
              items: h.maps.filter((w) => w.kind === "map"),
              value: ae,
              onChange: ce
            }) : i.jsx(uc, {
              label: "Scenario",
              items: h.maps.filter((w) => w.kind === "scenario"),
              value: le,
              onChange: he
            }),
            i.jsx(uc, {
              label: "Data mod (optional)",
              items: h.dataMods,
              value: J,
              onChange: ne
            }),
            [
              ...h.maps,
              ...h.dataMods
            ].some((w) => !w.enabled) && i.jsx("small", {
              className: "custom-disabled-mod-hint",
              children: "Disabled mods must be enabled at the mods interface inside the game."
            }),
            i.jsxs("div", {
              className: "custom-scan-meta",
              children: [
                i.jsxs("span", {
                  children: [
                    h.maps.length,
                    " maps/scenarios"
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    h.dataMods.length,
                    " data mods"
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    h.scannedRoots.length,
                    " folders scanned"
                  ]
                })
              ]
            }),
            i.jsxs("div", {
              className: "custom-create-actions",
              children: [
                i.jsx("button", {
                  className: "primary large",
                  type: "button",
                  disabled: !q.trim() || !($ === "map" ? ae : le) || D,
                  onClick: () => void Te(),
                  children: D ? "Creating\u2026" : "Create Lobby"
                }),
                i.jsx("button", {
                  className: "secondary large",
                  type: "button",
                  disabled: D,
                  onClick: () => Y(false),
                  children: "Cancel"
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "custom-room-section",
          children: [
            i.jsx("div", {
              className: "custom-room-toolbar",
              children: i.jsxs("button", {
                className: "secondary",
                type: "button",
                onClick: () => void ke(),
                disabled: M,
                children: [
                  i.jsx(D1, {
                    size: 16,
                    className: M ? "spin" : ""
                  }),
                  " ",
                  M ? "Refreshing\u2026" : "Refresh Rooms"
                ]
              })
            }),
            i.jsxs("div", {
              className: "custom-room-list",
              children: [
                i.jsxs("div", {
                  className: "custom-room-list-header",
                  children: [
                    i.jsx("span", {
                      children: "Room"
                    }),
                    i.jsx("span", {
                      children: "Content"
                    }),
                    i.jsx("span", {
                      children: "Players"
                    }),
                    i.jsx("span", {
                      children: "Status"
                    }),
                    i.jsx("span", {})
                  ]
                }),
                u.map((w) => {
                  var _a2, _b, _c;
                  return i.jsxs("article", {
                    className: "custom-room-row",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: w.name
                          }),
                          i.jsxs("small", {
                            children: [
                              w.demo ? "Demo room \xB7 " : "",
                              "Hosted by ",
                              ((_a2 = w.players.find((Z) => Z.host)) == null ? void 0 : _a2.displayName) ?? "Unknown"
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: ((_b = w.map) == null ? void 0 : _b.name) ?? "Standard map"
                          }),
                          i.jsx("small", {
                            children: ((_c = w.dataMod) == null ? void 0 : _c.name) ?? "No data mod"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "room-player-count",
                        children: [
                          i.jsx(vs, {
                            size: 16
                          }),
                          " ",
                          w.players.length,
                          "/",
                          w.maxPlayers
                        ]
                      }),
                      i.jsx("span", {
                        className: `custom-room-status ${w.status}`,
                        children: F0(w.status)
                      }),
                      i.jsxs("button", {
                        className: "secondary",
                        type: "button",
                        disabled: w.status !== "open" || w.players.length >= w.maxPlayers || D || r.gameStatus === "loading",
                        onClick: () => void U(w.id),
                        children: [
                          i.jsx(cm, {
                            size: 16
                          }),
                          " ",
                          r.gameStatus === "loading" ? "Launching\u2026" : "Join"
                        ]
                      })
                    ]
                  }, w.id);
                }),
                !M && !u.length && i.jsx("div", {
                  className: "panel empty-state",
                  children: "No custom rooms are open. Create the first one."
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function uc({ label: r, items: c, value: f, onChange: u }) {
    var _a2;
    const m = [
      ...c.filter((h) => h.enabled && !h.builtIn),
      ...c.filter((h) => !h.enabled && !h.builtIn),
      ...c.filter((h) => h.builtIn)
    ];
    return i.jsxs("div", {
      children: [
        i.jsx(Ea, {
          label: r,
          value: f,
          onChange: u,
          options: [
            {
              value: "",
              label: `Choose ${r.toLowerCase()}\u2026`
            },
            ...m.map((h) => ({
              value: h.id,
              label: `${h.name}${h.enabled ? "" : ` (Disabled: ${h.modName ?? "enable in AoE2 Mods"})`}`,
              disabled: !h.enabled
            }))
          ]
        }),
        f && i.jsx("small", {
          children: (_a2 = c.find((h) => h.id === f)) == null ? void 0 : _a2.source
        })
      ]
    });
  }
  function Z0({ room: r, currentPlayerId: c, notify: f }) {
    var _a2, _b, _c;
    const [u, m] = E.useState(""), h = E.useRef(/* @__PURE__ */ new Set()), S = E.useRef(false), M = r.players.find((p) => p.id === c), k = r.hostId === c, g = E.useMemo(() => Array.from({
      length: r.maxPlayers
    }, (p, $) => r.players.find((V) => V.slot === $ + 1)), [
      r
    ]), x = (p) => void p.catch(($) => f("Lobby update failed.", "danger", {
      detail: Bt($)
    }));
    E.useEffect(() => () => {
      var _a3, _b2;
      (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), (_b2 = window.electronApi) == null ? void 0 : _b2.stopReplayEndDetection();
    }, [
      r.id
    ]), E.useEffect(() => {
      if (r.status === "open") {
        h.current.clear();
        return;
      }
      if (r.status !== "launching" || !window.electronApi) return;
      const p = r.map, $ = `${r.id}:host-setup`;
      if (k && !r.platformLobbyId && !h.current.has($)) {
        h.current.add($), (async () => {
          try {
            if (!p) throw new Error("Choose a map or scenario before starting.");
            await z();
            const T = await window.electronApi.runAoe2CreateLobbySequence(p.gameName, r.maxPlayers, p.kind === "scenario" ? "scenario" : "map", {
              context: "custom",
              gameSettings: r.gameSettings
            });
            if (!T.sent || !T.lobbyUri) throw new Error(T.message || "AoE2 lobby creation failed.");
            await et.publish(r.id, T.lobbyUri);
          } catch (T) {
            await et.failStart(r.id, Bt(T)), h.current.delete($);
          }
        })();
        return;
      }
      const V = `${r.id}:guest-join`;
      if (!k && r.platformLobbyId && !M.aoeJoined && !h.current.has(V)) {
        h.current.add(V), (async () => {
          try {
            if (!(await window.electronApi.openAoe2Lobby(r.platformLobbyId)).opened) throw new Error("AoE2 did not open the custom lobby.");
            (p == null ? void 0 : p.kind) !== "scenario" && await Y(M), await et.reportJoined(r.id);
          } catch (T) {
            f("Could not join the AoE2 lobby.", "danger", {
              detail: Bt(T),
              durationMs: null
            }), h.current.delete(V);
          }
        })();
        return;
      }
      const ae = r.players.find((T) => T.host), ce = `${r.id}:guest-ready`;
      if (!k && M.aoeJoined && (ae == null ? void 0 : ae.aoeReady) && !M.aoeReady && !h.current.has(ce)) {
        h.current.add(ce), (async () => {
          try {
            const T = Date.now() + Qe.customMapTransferTimeoutMs;
            let L = false, D;
            do
              await new Promise((se) => window.setTimeout(se, Qe.customMapTransferPollMs)), D = await window.electronApi.runAoe2LobbyCursorAction("guest-ready", "custom"), !D.sent && !L && (L = true, await window.electronApi.runAoe2LobbyCursorAction("content-confirm", "custom"));
            while (!D.sent && Date.now() < T);
            if (!D.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
            await et.reportAoeReady(r.id);
          } catch (T) {
            f("Could not ready in the AoE2 lobby.", "danger", {
              detail: Bt(T),
              durationMs: null
            }), h.current.delete(ce);
          }
        })();
        return;
      }
      const le = r.players.filter((T) => !T.host).every((T) => T.aoeJoined), he = `${r.id}:host-ready`;
      if (k && r.platformLobbyId && le && !M.aoeReady && !h.current.has(he)) {
        h.current.add(he), (async () => {
          try {
            (p == null ? void 0 : p.kind) !== "scenario" && await Y(M);
            const T = await window.electronApi.runAoe2LobbyCursorAction("host-ready", "custom");
            if (!T.sent) throw new Error(T.message || "AoE2 could not ready the host.");
            await et.reportAoeReady(r.id);
          } catch (T) {
            await et.failStart(r.id, Bt(T)), h.current.delete(he);
          }
        })();
        return;
      }
      const J = r.players.every((T) => T.aoeReady), ne = `${r.id}:aoe-start`;
      k && J && !h.current.has(ne) && (h.current.add(ne), (async () => {
        try {
          const T = await window.electronApi.runAoe2LobbyCursorAction("start", "custom");
          if (!T.sent) throw new Error(T.message || "AoE2 could not start the game.");
          await et.completeStart(r.id, new Date(Date.now() - Qe.startGameSettleMs).toISOString());
        } catch (T) {
          await et.failStart(r.id, Bt(T)), h.current.delete(ne);
        }
      })());
    }, [
      r,
      k,
      M,
      f
    ]), E.useEffect(() => {
      if (r.status !== "started" || !window.electronApi) return;
      const p = `${r.id}:reveal-game`;
      if (h.current.has(p)) return;
      h.current.add(p), window.electronApi.startReplayEndDetection().then((V) => {
        V.started || f("Post-game return detection could not be started.", "danger", {
          detail: V.message || "Replay detection could not be started."
        });
      }).catch((V) => {
        f("Post-game return detection could not be started.", "danger", {
          detail: Bt(V)
        });
      });
      const $ = window.setTimeout(() => {
        (async () => {
          try {
            await pc(), await window.electronApi.focusAoe2();
          } catch (V) {
            f("Post-game return detection could not be started.", "danger", {
              detail: Bt(V)
            });
          } finally {
            await window.electronApi.setLobbyInputLock(false);
          }
        })();
      }, Qe.revealAfterStartMs);
      return () => window.clearTimeout($);
    }, [
      r.id,
      r.status
    ]), E.useEffect(() => {
      if (!(r.status !== "started" || !window.electronApi)) return window.electronApi.onReplayEnded((p) => {
        S.current || (S.current = true, yg(p).then(async ($) => {
          if (!$) {
            S.current = false;
            return;
          }
          await window.electronApi.confirmReplayEnded(), await et.finish(r.id);
        }).catch(($) => {
          S.current = false, f("The finished custom game could not be detected.", "danger", {
            detail: Bt($)
          });
        }));
      });
    }, [
      r.id,
      r.status,
      f
    ]);
    async function z() {
      if ((await window.electronApi.detectAoe2Process()).running) return;
      const $ = await window.electronApi.launchAoe2();
      if (!$.launched) throw new Error($.message || "AoE2 could not be launched.");
      const V = Date.now() + 45e3;
      for (; Date.now() < V; ) if (await new Promise((ae) => window.setTimeout(ae, 1e3)), (await window.electronApi.detectAoe2Process()).windowReady) return;
      throw new Error("AoE2 did not become ready in time.");
    }
    async function Y(p) {
      const $ = await window.electronApi.selectAoe2Civilization(p.civilization, p.slot, "custom");
      if (!$.sent) throw new Error($.message);
      if (p.team === 1 || p.team === 2) {
        const V = await window.electronApi.selectAoe2Team(p.team, p.slot, "custom");
        if (!V.sent) throw new Error(V.message);
      }
    }
    function q(p) {
      p.preventDefault(), u.trim() && (x(et.sendMessage(r.id, u.trim())), m(""));
    }
    return i.jsxs("section", {
      className: "custom-lobby",
      children: [
        i.jsxs("div", {
          className: "custom-lobby-heading",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  className: "eyebrow",
                  children: "Live custom lobby"
                }),
                i.jsx("h2", {
                  children: r.name
                }),
                i.jsxs("p", {
                  children: [
                    r.players.length,
                    "/",
                    r.maxPlayers,
                    " players \xB7 ",
                    ((_a2 = r.map) == null ? void 0 : _a2.name) ?? "Standard map",
                    " \xB7 ",
                    ((_b = r.dataMod) == null ? void 0 : _b.name) ?? "No data mod"
                  ]
                })
              ]
            }),
            i.jsxs("button", {
              className: "secondary",
              type: "button",
              onClick: () => x(et.leave(r.id)),
              children: [
                i.jsx(Nn, {
                  size: 16
                }),
                " Leave lobby"
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "custom-lobby-layout",
          children: [
            i.jsxs("article", {
              className: "panel lobby-roster",
              children: [
                ((_c = r.map) == null ? void 0 : _c.kind) === "scenario" && i.jsx("p", {
                  className: "scenario-settings-note",
                  children: "This scenario defines its own player slots, civilizations, teams, and map."
                }),
                i.jsxs("div", {
                  className: "lobby-roster-header",
                  children: [
                    i.jsx("strong", {
                      children: "Players"
                    }),
                    i.jsx("span", {
                      children: "Team"
                    }),
                    i.jsx("span", {
                      children: "Civilization"
                    }),
                    i.jsx("span", {
                      children: "Status"
                    })
                  ]
                }),
                g.map((p, $) => {
                  var _a3;
                  return i.jsxs("div", {
                    className: p ? "lobby-player-row occupied" : "lobby-player-row",
                    children: [
                      i.jsxs("div", {
                        className: "lobby-player-name",
                        children: [
                          i.jsx("span", {
                            className: "lobby-slot-number",
                            children: $ + 1
                          }),
                          p ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsx(fm, {
                                size: 17
                              }),
                              i.jsx("strong", {
                                children: p.displayName
                              }),
                              p.host && i.jsx(yp, {
                                size: 15
                              }),
                              " ",
                              k && !p.host && i.jsx("button", {
                                className: "lobby-kick",
                                "aria-label": `Remove ${p.displayName}`,
                                onClick: () => x(et.kick(r.id, p.id)),
                                children: i.jsx(Nn, {
                                  size: 13
                                })
                              })
                            ]
                          }) : i.jsx("span", {
                            children: "Open slot"
                          })
                        ]
                      }),
                      p && ((_a3 = r.map) == null ? void 0 : _a3.kind) === "scenario" ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("span", {
                            children: "Scenario"
                          }),
                          i.jsx("span", {
                            children: "Scenario-defined"
                          }),
                          p.id === c ? i.jsxs("button", {
                            className: p.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => x(et.updatePlayer(r.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(yi, {
                                size: 16
                              }),
                              p.ready ? "Ready" : "Not ready"
                            ]
                          }) : i.jsx("span", {
                            className: p.ready ? "success" : "",
                            children: p.ready ? "Ready" : "Not ready"
                          })
                        ]
                      }) : p && (p.id === c ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx(Ea, {
                            className: "lobby-inline-select",
                            label: "Team",
                            value: String(p.team),
                            onChange: (V) => x(et.updatePlayer(r.id, {
                              team: Number(V)
                            })),
                            options: [
                              {
                                value: "0",
                                label: "No team"
                              },
                              ...[
                                1,
                                2,
                                3,
                                4
                              ].map((V) => ({
                                value: String(V),
                                label: `Team ${V}`
                              }))
                            ]
                          }),
                          i.jsx(Ea, {
                            className: "lobby-inline-select",
                            label: "Civilization",
                            value: p.civilization,
                            onChange: (V) => x(et.updatePlayer(r.id, {
                              civilization: V
                            })),
                            options: [
                              "Random",
                              ...Ol
                            ].map((V) => ({
                              value: V,
                              label: V
                            }))
                          }),
                          i.jsxs("button", {
                            className: p.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => x(et.updatePlayer(r.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(yi, {
                                size: 16
                              }),
                              p.ready ? "Ready" : "Not ready"
                            ]
                          })
                        ]
                      }) : i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("span", {
                            children: p.team ? `Team ${p.team}` : "No team"
                          }),
                          i.jsx("span", {
                            children: p.civilization
                          }),
                          i.jsx("span", {
                            className: p.ready ? "success" : "",
                            children: p.ready ? "Ready" : "Not ready"
                          })
                        ]
                      }))
                    ]
                  }, $);
                })
              ]
            }),
            i.jsxs("aside", {
              className: "panel lobby-chat",
              children: [
                i.jsxs("div", {
                  className: "lobby-chat-title",
                  children: [
                    i.jsx(Sp, {
                      size: 18
                    }),
                    i.jsx("strong", {
                      children: "Lobby chat"
                    })
                  ]
                }),
                i.jsx("div", {
                  className: "lobby-chat-messages",
                  "aria-live": "polite",
                  children: r.messages.map((p) => i.jsxs("p", {
                    className: p.system ? "system" : "",
                    children: [
                      i.jsx("strong", {
                        children: p.author
                      }),
                      i.jsx("span", {
                        children: p.text
                      })
                    ]
                  }, p.id))
                }),
                i.jsxs("form", {
                  onSubmit: q,
                  children: [
                    i.jsx("input", {
                      placeholder: "Message lobby\u2026",
                      value: u,
                      onChange: (p) => m(p.target.value)
                    }),
                    i.jsx("button", {
                      className: "primary",
                      "aria-label": "Send",
                      children: i.jsx(Sc, {
                        size: 17
                      })
                    })
                  ]
                })
              ]
            })
          ]
        }),
        i.jsx(J0, {
          settings: r.gameSettings ?? pm,
          editable: k && r.status === "open",
          onChange: (p, $) => x(et.updateSettings(r.id, {
            [p]: $
          }))
        }),
        i.jsxs("div", {
          className: `custom-lobby-actions${r.status !== "open" ? " launching" : ""}`,
          children: [
            i.jsx("span", {
              children: r.status === "started" ? i.jsx($0, {
                startedAt: r.gameStartedAt
              }) : r.status === "launching" ? i.jsxs(i.Fragment, {
                children: [
                  "Creating and synchronizing the AoE2 lobby",
                  i.jsx(bc, {})
                ]
              }) : r.automationError ? r.automationError : r.players.every((p) => p.ready) ? "All players are ready." : "Waiting for players to ready up."
            }),
            k && i.jsx("button", {
              className: "primary large",
              disabled: r.status !== "open" || !r.map || !r.players.every((p) => p.ready),
              onClick: () => x(et.start(r.id)),
              children: r.status !== "open" ? i.jsxs(i.Fragment, {
                children: [
                  "Starting",
                  i.jsx(bc, {})
                ]
              }) : "Start Game"
            })
          ]
        })
      ]
    });
  }
  const K0 = [
    [
      "lockTeams",
      "Lock Teams"
    ],
    [
      "teamTogether",
      "Team Together"
    ],
    [
      "teamPositions",
      "Team Positions"
    ],
    [
      "sharedExploration",
      "Shared Exploration"
    ],
    [
      "lockSpeed",
      "Lock Speed"
    ],
    [
      "allowHandicap",
      "Allow Handicap"
    ],
    [
      "allowCheats",
      "Allow Cheats"
    ],
    [
      "turboMode",
      "Turbo Mode"
    ],
    [
      "fullTechTree",
      "Full Tech Tree"
    ],
    [
      "empireWarsMode",
      "Empire Wars Mode"
    ],
    [
      "suddenDeathMode",
      "Sudden Death Mode"
    ],
    [
      "regicideMode",
      "Regicide Mode"
    ],
    [
      "antiquityMode",
      "Antiquity Mode"
    ]
  ];
  function J0({ settings: r, editable: c, onChange: f }) {
    return i.jsxs("article", {
      className: "panel custom-game-settings",
      children: [
        i.jsxs("div", {
          className: "custom-game-settings-heading",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  className: "eyebrow",
                  children: "Team & advanced settings"
                }),
                i.jsx("h3", {
                  children: "Game options"
                })
              ]
            }),
            i.jsx("small", {
              children: c ? "Host controls" : "Set by host"
            })
          ]
        }),
        i.jsxs("div", {
          className: "custom-game-settings-grid",
          children: [
            K0.map(([u, m]) => i.jsxs("label", {
              className: r[u] ? "selected" : "",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: r[u],
                  disabled: !c,
                  onChange: (h) => f(u, h.target.checked)
                }),
                i.jsx("span", {
                  children: m
                })
              ]
            }, u)),
            i.jsxs("label", {
              className: "selected required-setting",
              title: "Empire League requires recorded games to verify results.",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: true,
                  disabled: true
                }),
                i.jsxs("span", {
                  children: [
                    "Record Game ",
                    i.jsx("small", {
                      children: "Required"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function Bt(r) {
    return r instanceof Error ? r.message : "An unexpected error occurred.";
  }
  function F0(r) {
    return r === "open" ? "Open" : r === "launching" ? "Starting" : "In Game";
  }
  function bc() {
    return i.jsxs("span", {
      className: "animated-ellipsis",
      "aria-hidden": "true",
      children: [
        i.jsx("i", {}),
        i.jsx("i", {}),
        i.jsx("i", {})
      ]
    });
  }
  function $0({ startedAt: r }) {
    const [c, f] = E.useState(() => tm(r));
    return E.useEffect(() => {
      const u = () => f(tm(r));
      u();
      const m = window.setInterval(u, 100);
      return () => window.clearInterval(m);
    }, [
      r
    ]), c > 0 ? i.jsxs("span", {
      className: "custom-game-countdown-label",
      "aria-live": "polite",
      children: [
        "Game starts in ",
        i.jsx("strong", {
          className: "custom-game-countdown",
          children: c
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        "Entering game",
        i.jsx(bc, {})
      ]
    });
  }
  function tm(r) {
    if (!r) return 5;
    const c = Math.max(0, Date.now() - new Date(r).getTime());
    return Math.max(0, Math.ceil((5e3 - c) / 1e3));
  }
  function W0() {
    const { state: r, openPlayerProfile: c } = kt(), [f, u] = E.useState(""), [m, h] = E.useState("all"), S = E.useMemo(() => r.recentMatches.filter((M) => {
      const k = `${M.opponent} ${M.map} ${M.civilization} ${M.opponentCivilization}`.toLowerCase().includes(f.toLowerCase()), g = m === "all" || M.outcome === m;
      return k && g;
    }), [
      m,
      f,
      r.recentMatches
    ]);
    return i.jsxs("section", {
      className: "stack",
      children: [
        i.jsxs("div", {
          className: "toolbar",
          children: [
            i.jsxs("label", {
              children: [
                "Search",
                i.jsx("input", {
                  value: f,
                  onChange: (M) => u(M.target.value),
                  placeholder: "Opponent, map, civilization"
                })
              ]
            }),
            i.jsx(Ea, {
              label: "Result",
              options: [
                {
                  value: "all",
                  label: "All"
                },
                {
                  value: "win",
                  label: "Wins"
                },
                {
                  value: "loss",
                  label: "Losses"
                }
              ],
              value: m,
              onChange: h
            })
          ]
        }),
        i.jsx("div", {
          className: "panel",
          children: i.jsxs("div", {
            className: "table history-table",
            children: [
              i.jsxs("div", {
                className: "table-row table-header",
                children: [
                  i.jsx("strong", {
                    children: "Result"
                  }),
                  i.jsx("span", {
                    children: "Opponent"
                  }),
                  i.jsx("span", {
                    children: "Map"
                  }),
                  i.jsx("span", {
                    children: "Civilizations"
                  }),
                  i.jsx("span", {
                    children: "Rating"
                  }),
                  i.jsx("span", {
                    children: "Duration"
                  }),
                  i.jsx("span", {
                    children: "Date"
                  }),
                  i.jsx("span", {
                    children: "Status"
                  })
                ]
              }),
              S.map((M) => i.jsxs("div", {
                className: "table-row clickable",
                children: [
                  i.jsx("strong", {
                    className: M.outcome,
                    children: M.outcome
                  }),
                  i.jsxs("button", {
                    className: "player-link",
                    type: "button",
                    onClick: () => c(M.opponentId),
                    children: [
                      M.opponent,
                      " (",
                      M.opponentRating,
                      ")"
                    ]
                  }),
                  i.jsx("span", {
                    children: M.map
                  }),
                  i.jsx("span", {
                    children: M.civilization && M.opponentCivilization ? `${M.civilization} vs. ${M.opponentCivilization}` : "Unknown civilizations"
                  }),
                  i.jsxs("span", {
                    className: M.ratingChange >= 0 ? "win" : "loss",
                    children: [
                      M.ratingChange > 0 ? "+" : "",
                      M.ratingChange
                    ]
                  }),
                  i.jsxs("span", {
                    children: [
                      M.durationMinutes,
                      "m"
                    ]
                  }),
                  i.jsx("span", {
                    children: new Date(M.timestamp).toLocaleDateString()
                  }),
                  i.jsx("span", {
                    children: P0(M.verificationStatus, M.verified)
                  })
                ]
              }, M.id)),
              S.length === 0 && i.jsx("div", {
                className: "empty-state",
                children: r.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."
              })
            ]
          })
        })
      ]
    });
  }
  function P0(r, c) {
    return c || r === "verified" ? "Verified" : r === "contested" || r === "rejected" ? "Contested" : r === "no_contest" ? "No contest" : "Pending";
  }
  const ey = {
    async list(r = 1, c = "all", f = "solo") {
      if (ge) {
        const m = [
          ...xc
        ].filter((k) => f === "solo" || k.teamRating > 0).sort((k, g) => f === "team" ? g.teamRating - k.teamRating : g.rating - k.rating).map((k, g) => {
          const x = f === "team" ? k.teamRating : k.rating, z = f === "team" ? k.legacyTeamWins : k.wins, Y = f === "team" ? k.legacyTeamLosses : k.losses;
          return {
            ...k,
            rating: x,
            rank: g + 1,
            division: En(x),
            wins: z,
            losses: Y,
            winRate: z + Y ? Number((z / (z + Y) * 100).toFixed(1)) : 0
          };
        }), h = c === "all" ? m : m.filter((k) => k.division === c), S = 100, M = (r - 1) * S;
        return {
          players: h.slice(M, M + S),
          page: r,
          pageSize: S,
          total: h.length,
          division: c,
          mode: f
        };
      }
      const u = new URLSearchParams({
        page: String(r),
        division: c,
        mode: f
      });
      return xe.request(`/leaderboard?${u}`);
    }
  };
  function ty() {
    const { state: r, openPlayerProfile: c } = kt(), [f, u] = E.useState(""), [m, h] = E.useState("all"), [S, M] = E.useState("solo"), [k, g] = E.useState([]), [x, z] = E.useState(1), [Y, q] = E.useState(0), [p, $] = E.useState(true), [V, ae] = E.useState(null);
    E.useEffect(() => {
      let L = false;
      return $(true), ae(null), ey.list(x, m, S).then((D) => {
        L || (g(D.players), q(D.total));
      }).catch((D) => {
        L || ae(D instanceof Error ? D.message : "Leaderboard could not be loaded.");
      }).finally(() => {
        L || $(false);
      }), () => {
        L = true;
      };
    }, [
      m,
      S,
      x
    ]);
    const ce = E.useMemo(() => k.filter((L) => L.displayName.toLowerCase().includes(f.toLowerCase())), [
      k,
      f
    ]), le = [
      {
        value: "all",
        label: "All"
      },
      ...[
        "Copper",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Master",
        "Grandmaster"
      ].map((L) => ({
        value: L,
        label: `${L} (${ip(L)})`
      }))
    ], he = Math.max(1, Math.ceil(Y / 100)), J = Y === 0 ? 0 : (x - 1) * 100 + 1, ne = Math.min(x * 100, Y), T = i.jsx(ay, {
      page: x,
      totalPages: he,
      firstRank: J,
      lastRank: ne,
      total: Y,
      loading: p,
      onPageChange: z
    });
    return i.jsxs("section", {
      className: "stack",
      children: [
        i.jsxs("div", {
          className: "toolbar",
          children: [
            i.jsxs("div", {
              className: "leaderboard-mode",
              role: "group",
              "aria-label": "Leaderboard mode",
              children: [
                i.jsx("button", {
                  type: "button",
                  "aria-pressed": S === "solo",
                  onClick: () => {
                    M("solo"), z(1);
                  },
                  children: "1v1"
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-pressed": S === "team",
                  onClick: () => {
                    M("team"), z(1);
                  },
                  children: "Teams"
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Search",
                i.jsx("input", {
                  value: f,
                  onChange: (L) => u(L.target.value),
                  placeholder: "Player name"
                })
              ]
            }),
            i.jsx(Ea, {
              className: "division-field",
              label: "Division",
              options: le,
              value: m,
              onChange: (L) => {
                z(1), h(L);
              }
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("div", {
              className: "leaderboard-pagination-top",
              children: T
            }),
            i.jsxs("div", {
              className: "leaderboard-table",
              children: [
                i.jsxs("div", {
                  className: "leader-row leader-header",
                  "aria-hidden": "true",
                  children: [
                    i.jsx("strong", {
                      children: "Rank"
                    }),
                    i.jsx("span", {
                      children: "Player"
                    }),
                    i.jsx("span", {
                      children: "Country"
                    }),
                    i.jsx("span", {
                      children: "Rating"
                    }),
                    i.jsx("span", {
                      children: "Division"
                    }),
                    i.jsx("span", {
                      children: "Wins"
                    }),
                    i.jsx("span", {
                      children: "Losses"
                    }),
                    i.jsx("span", {
                      children: "Win rate"
                    }),
                    i.jsx("span", {
                      children: "Streak"
                    })
                  ]
                }),
                ce.map((L) => i.jsxs("div", {
                  className: L.id === r.currentUser.id ? "leader-row current" : "leader-row",
                  children: [
                    i.jsxs("strong", {
                      children: [
                        "#",
                        L.rank
                      ]
                    }),
                    i.jsx("button", {
                      className: "player-link",
                      type: "button",
                      onClick: () => c(L.id),
                      children: L.displayName
                    }),
                    i.jsx("span", {
                      children: ny(L.countryCode)
                    }),
                    i.jsx("span", {
                      children: L.rating
                    }),
                    i.jsx("span", {
                      children: gi(L.rating)
                    }),
                    i.jsx("span", {
                      children: L.wins
                    }),
                    i.jsx("span", {
                      children: L.losses
                    }),
                    i.jsxs("span", {
                      children: [
                        L.winRate,
                        "%"
                      ]
                    }),
                    i.jsx("span", {
                      children: L.streak > 0 ? `W${L.streak}` : L.streak < 0 ? `L${Math.abs(L.streak)}` : "0"
                    })
                  ]
                }, L.id)),
                p && i.jsx("div", {
                  className: "empty-state",
                  children: "Loading leaderboard\u2026"
                }),
                !p && V && i.jsx("div", {
                  className: "empty-state",
                  children: V
                }),
                !p && !V && ce.length === 0 && i.jsx("div", {
                  className: "empty-state",
                  children: "No leaderboard results."
                })
              ]
            }),
            i.jsx("div", {
              className: "leaderboard-pagination-bottom",
              children: T
            })
          ]
        })
      ]
    });
  }
  function ay({ page: r, totalPages: c, firstRank: f, lastRank: u, total: m, loading: h, onPageChange: S }) {
    const M = c <= 7 ? Array.from({
      length: c
    }, (k, g) => g + 1) : r <= 4 ? [
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      c
    ] : r >= c - 3 ? [
      1,
      "ellipsis",
      c - 4,
      c - 3,
      c - 2,
      c - 1,
      c
    ] : [
      1,
      "ellipsis",
      r - 1,
      r,
      r + 1,
      "ellipsis",
      c
    ];
    return i.jsxs("nav", {
      className: "leaderboard-pagination",
      "aria-label": "Leaderboard pages",
      children: [
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: h || r === 1,
          onClick: () => S(r - 1),
          children: "Previous"
        }),
        i.jsx("div", {
          className: "leaderboard-page-numbers",
          children: M.map((k, g) => k === "ellipsis" ? i.jsx("span", {
            className: "leaderboard-page-ellipsis",
            "aria-hidden": "true",
            children: "\u2026"
          }, `ellipsis-${g}`) : i.jsx("button", {
            className: "leaderboard-page-number",
            type: "button",
            "aria-current": k === r ? "page" : void 0,
            disabled: h,
            onClick: () => S(k),
            children: k
          }, k))
        }),
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: h || r >= c,
          onClick: () => S(r + 1),
          children: "Next"
        }),
        i.jsxs("span", {
          className: "leaderboard-page-status",
          children: [
            "Page ",
            r,
            " of ",
            c,
            m > 0 && i.jsxs("small", {
              children: [
                "Players ",
                f,
                "\u2013",
                u,
                " of ",
                m.toLocaleString()
              ]
            })
          ]
        })
      ]
    });
  }
  function ny(r) {
    const c = r == null ? void 0 : r.trim().toUpperCase();
    return c ? /^[A-Z]{2}$/.test(c) ? i.jsx("span", {
      className: `country-flag fi fi-${c.toLowerCase()}`,
      role: "img",
      "aria-label": `${c} flag`,
      title: c
    }) : c : "Unknown";
  }
  const sy = {
    async getProfile(r) {
      return ge ? {
        player: xc.find((c) => c.id === r) ?? Ia,
        matches: Mc
      } : xe.request(`/players/${encodeURIComponent(r)}`);
    }
  };
  function iy(r, c) {
    const f = r.filter((h) => h.queueType !== "team-games").sort((h, S) => new Date(h.timestamp).getTime() - new Date(S.timestamp).getTime());
    if (f.length === 0) return [];
    let u = c - f.reduce((h, S) => h + S.ratingChange, 0);
    const m = [
      {
        id: "starting-rating",
        label: "Initial ELO",
        rating: u
      }
    ];
    for (const h of f) u += h.ratingChange, m.push({
      id: h.id,
      label: new Date(h.timestamp).toLocaleDateString(void 0, {
        month: "short",
        day: "numeric"
      }),
      rating: u
    });
    return m;
  }
  function ly({ matches: r, currentRating: c, possessive: f = "Your" }) {
    var _a2, _b;
    const [u, m] = E.useState(null), h = iy(r, c);
    if (h.length === 0) return i.jsxs("div", {
      className: "empty-state",
      children: [
        f,
        " Elo progress will appear after the first 1v1 match."
      ]
    });
    const S = 800, M = 260, k = {
      top: 22,
      right: 22,
      bottom: 42,
      left: 58
    }, g = h.map((X) => X.rating), x = Math.min(...g), z = Math.max(...g), Y = Math.floor((x - 20) / 25) * 25, q = Math.ceil((z + 20) / 25) * 25, p = Math.max(q - Y, 1), $ = S - k.left - k.right, V = M - k.top - k.bottom, ae = h.map((X, ke) => ({
      ...X,
      x: k.left + ke / Math.max(h.length - 1, 1) * $,
      y: k.top + (q - X.rating) / p * V
    })), ce = ae.map((X) => `${X.x},${X.y}`).join(" "), le = `${k.left},${k.top + V} ${ce} ${k.left + $},${k.top + V}`, he = Array.from({
      length: 5
    }, (X, ke) => {
      const ze = ke / 4;
      return {
        y: k.top + ze * V,
        rating: Math.round(q - ze * p)
      };
    }), J = h.at(-1).rating - h[0].rating, ne = ae.find((X) => X.id === u), T = 126, L = 44, D = ne ? Math.min(Math.max(ne.x - T / 2, k.left), S - k.right - T) : 0, se = ne ? ne.y - L - 12 < 4 ? ne.y + 12 : ne.y - L - 12 : 0;
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("div", {
          className: "rating-chart-summary",
          children: [
            i.jsxs("span", {
              children: [
                h.length - 1,
                " recorded ",
                h.length === 2 ? "match" : "matches"
              ]
            }),
            i.jsxs("strong", {
              className: J >= 0 ? "win" : "loss",
              children: [
                J > 0 ? "+" : "",
                J,
                " Elo"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "rating-chart",
          role: "img",
          "aria-label": `Elo progress over ${h.length - 1} recorded matches, ending at ${c}`,
          children: i.jsxs("svg", {
            viewBox: `0 0 ${S} ${M}`,
            "aria-hidden": "true",
            children: [
              i.jsx("defs", {
                children: i.jsxs("linearGradient", {
                  id: "rating-chart-fill",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    i.jsx("stop", {
                      offset: "0%",
                      stopColor: "var(--accent)",
                      stopOpacity: "0.32"
                    }),
                    i.jsx("stop", {
                      offset: "100%",
                      stopColor: "var(--accent)",
                      stopOpacity: "0"
                    })
                  ]
                })
              }),
              he.map((X) => i.jsxs("g", {
                children: [
                  i.jsx("line", {
                    className: "rating-chart-grid",
                    x1: k.left,
                    x2: S - k.right,
                    y1: X.y,
                    y2: X.y
                  }),
                  i.jsx("text", {
                    className: "rating-chart-axis",
                    x: k.left - 10,
                    y: X.y + 4,
                    textAnchor: "end",
                    children: X.rating
                  })
                ]
              }, X.y)),
              i.jsx("polygon", {
                className: "rating-chart-area",
                points: le
              }),
              i.jsx("polyline", {
                className: "rating-chart-line",
                points: ce
              }),
              ae.map((X) => i.jsxs("g", {
                className: "rating-chart-point-target",
                onPointerEnter: () => m(X.id),
                onPointerLeave: () => m(null),
                children: [
                  i.jsx("circle", {
                    className: "rating-chart-hit-area",
                    cx: X.x,
                    cy: X.y,
                    r: "13"
                  }),
                  i.jsx("circle", {
                    className: "rating-chart-point",
                    cx: X.x,
                    cy: X.y,
                    r: u === X.id ? 6 : 4
                  })
                ]
              }, X.id)),
              ne && i.jsxs("g", {
                className: "rating-chart-tooltip",
                transform: `translate(${D} ${se})`,
                children: [
                  i.jsx("rect", {
                    width: T,
                    height: L
                  }),
                  i.jsx("text", {
                    className: "rating-chart-tooltip-label",
                    x: "10",
                    y: "17",
                    children: ne.label
                  }),
                  i.jsxs("text", {
                    className: "rating-chart-tooltip-value",
                    x: "10",
                    y: "34",
                    children: [
                      ne.rating,
                      " Elo"
                    ]
                  })
                ]
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: k.left,
                y: M - 13,
                children: (_a2 = h[1]) == null ? void 0 : _a2.label
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: S - k.right,
                y: M - 13,
                textAnchor: "end",
                children: (_b = h.at(-1)) == null ? void 0 : _b.label
              })
            ]
          })
        })
      ]
    });
  }
  function ry({ friendIds: r, outgoingRequestIds: c, onAddFriend: f }) {
    const { state: u, selectedProfileId: m } = kt(), h = !m || m === u.currentUser.id, [S, M] = E.useState(null), [k, g] = E.useState(null), [x, z] = E.useState(false), [Y, q] = E.useState(false);
    if (E.useEffect(() => {
      if (q(false), h) {
        M(null), g(null);
        return;
      }
      let he = false;
      return M(null), g(null), sy.getProfile(m).then((J) => {
        he || M(J);
      }).catch((J) => {
        he || g(J instanceof Error ? J.message : "Player profile could not be loaded.");
      }), () => {
        he = true;
      };
    }, [
      m,
      h
    ]), !h && !S) return i.jsx("div", {
      className: "panel empty-state",
      children: k ?? "Loading player profile\u2026"
    });
    const p = h ? u.currentUser : S.player, $ = h ? u.recentMatches : S.matches, V = $.slice(0, 5).map((he) => he.outcome), ae = r.includes(p.id), ce = Y || c.includes(p.id);
    async function le() {
      z(true);
      try {
        await f(p.displayName), q(true);
      } finally {
        z(false);
      }
    }
    return i.jsxs("section", {
      className: "profile-layout",
      children: [
        i.jsxs("div", {
          className: "panel profile-card",
          children: [
            i.jsx("div", {
              className: "avatar huge-avatar",
              children: p.avatarUrl ? i.jsx("img", {
                src: p.avatarUrl,
                alt: ""
              }) : p.displayName.slice(0, 2).toUpperCase()
            }),
            i.jsxs("div", {
              className: "profile-card-identity",
              children: [
                i.jsx("h2", {
                  children: p.displayName
                }),
                i.jsx("span", {
                  children: p.steamId ? `Steam ID ${p.steamId}` : "Steam account"
                })
              ]
            }),
            i.jsxs("div", {
              className: "profile-card-status",
              children: [
                V.length > 0 && i.jsxs("div", {
                  className: "profile-recent-form",
                  children: [
                    i.jsx("span", {
                      children: "Recent W/L"
                    }),
                    i.jsx(nm, {
                      form: V
                    })
                  ]
                }),
                !h && !ae && i.jsx("button", {
                  className: "primary profile-friend-button",
                  type: "button",
                  disabled: x || ce,
                  onClick: () => void le(),
                  children: ce ? "Friend request sent" : x ? "Sending\u2026" : "Add friend"
                }),
                !h && ae && i.jsx("span", {
                  className: "profile-friend-status",
                  children: "Friends"
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(ra, {
              label: "1v1 RM Rating",
              value: p.rating,
              detail: `${p.legacy1v1Wins}-${p.legacy1v1Losses} legacy record`
            }),
            i.jsx(ra, {
              label: "1v1 RM Peak",
              value: p.peakRating
            }),
            i.jsx(ra, {
              label: "Global Rank",
              value: `#${p.rank.toLocaleString()}`
            }),
            i.jsx(ra, {
              label: "Team RM Rating",
              value: p.teamRating,
              detail: `${p.legacyTeamWins}-${p.legacyTeamLosses} legacy record`
            }),
            i.jsx(ra, {
              label: "Team RM Peak",
              value: p.teamPeakRating
            }),
            i.jsx(ra, {
              label: "Season Record",
              value: `${p.wins}-${p.losses}`
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel span-2",
          children: [
            i.jsx("h2", {
              children: "Elo Progress"
            }),
            i.jsx(ly, {
              matches: $,
              currentRating: p.rating,
              possessive: h ? "Your" : `${p.displayName}'s`
            })
          ]
        })
      ]
    });
  }
  function oy() {
    const { state: r, updateSettings: c, signOut: f } = kt(), u = r.settings, [m, h] = E.useState({
      supported: false,
      openAtLogin: false
    }), [S, M] = E.useState(true);
    E.useEffect(() => {
      const g = window.electronApi;
      if (!g) {
        M(false);
        return;
      }
      let x = true;
      return g.getLoginItemSettings().then((z) => {
        x && h(z);
      }).finally(() => {
        x && M(false);
      }), () => {
        x = false;
      };
    }, []);
    async function k(g) {
      if (!(!window.electronApi || S)) {
        M(true);
        try {
          h(await window.electronApi.setLoginItemOpenAtLogin(g));
        } finally {
          M(false);
        }
      }
    }
    return i.jsxs("section", {
      className: "settings-grid",
      children: [
        i.jsxs(dc, {
          title: "Game",
          children: [
            i.jsx(Ll, {
              label: "Launch Empire League when I sign in",
              helpText: m.supported ? "You can also manage this in Windows Startup Apps settings." : "Available in installed Windows builds.",
              checked: m.openAtLogin,
              disabled: S || !m.supported,
              onChange: (g) => void k(g)
            }),
            i.jsx(Ll, {
              label: "Launch AoE2 when Empire League starts",
              checked: u.launchAoe2OnStartup,
              onChange: (g) => c({
                launchAoe2OnStartup: g
              })
            })
          ]
        }),
        i.jsxs(dc, {
          title: "Matchmaking",
          children: [
            i.jsx(Ll, {
              label: "Match-found notifications",
              helpText: "Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way.",
              checked: u.matchNotifications,
              onChange: (g) => c({
                matchNotifications: g
              })
            }),
            i.jsx(Ll, {
              label: "Automatically reject Family Share accounts",
              helpText: "Family Share accounts have a higher likelihood of being smurfs.",
              checked: u.autoRejectFamilySharing,
              onChange: (g) => c({
                autoRejectFamilySharing: g
              })
            }),
            i.jsxs("div", {
              children: [
                i.jsxs("span", {
                  className: "setting-label",
                  children: [
                    "Maximum 1v1 opponent rating below yours",
                    i.jsx(Nm, {
                      text: "This applies only to 1v1. Restricting lower-rated opponents may make matchmaking take longer."
                    })
                  ]
                }),
                i.jsx(Ea, {
                  label: "",
                  value: String(u.maximumLowerOpponentRatingGap),
                  onChange: (g) => c({
                    maximumLowerOpponentRatingGap: Number(g)
                  }),
                  options: [
                    {
                      value: "0",
                      label: "Off"
                    },
                    ...[
                      200,
                      300,
                      400,
                      500
                    ].map((g) => ({
                      value: String(g),
                      label: `${g} Elo`
                    }))
                  ]
                })
              ]
            })
          ]
        }),
        i.jsxs(dc, {
          title: "Account",
          children: [
            i.jsxs("div", {
              className: "account-summary",
              children: [
                i.jsx("div", {
                  className: "avatar large-avatar",
                  children: r.currentUser.avatarUrl ? i.jsx("img", {
                    src: r.currentUser.avatarUrl,
                    alt: ""
                  }) : r.currentUser.displayName.slice(0, 2).toUpperCase()
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: r.currentUser.displayName
                    }),
                    i.jsx("span", {
                      children: "Authenticated through Steam"
                    })
                  ]
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Steam display name",
                i.jsx("input", {
                  value: r.currentUser.displayName,
                  readOnly: true
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Steam ID64",
                i.jsx("input", {
                  value: r.currentUser.steamId ?? "Unavailable",
                  readOnly: true
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Empire League player ID",
                i.jsx("input", {
                  value: r.currentUser.id,
                  readOnly: true
                })
              ]
            }),
            i.jsx("button", {
              type: "button",
              className: "secondary",
              onClick: () => void f(),
              children: "Log Out"
            })
          ]
        })
      ]
    });
  }
  function dc({ title: r, children: c }) {
    return i.jsxs("div", {
      className: "panel settings-group",
      children: [
        i.jsx("h2", {
          children: r
        }),
        c
      ]
    });
  }
  function Ll({ label: r, helpText: c, checked: f, disabled: u = false, onChange: m }) {
    const h = E.useId();
    return i.jsxs("div", {
      className: "toggle-row",
      children: [
        i.jsxs("span", {
          className: "setting-label",
          children: [
            i.jsx("label", {
              htmlFor: h,
              children: r
            }),
            c && i.jsx(Nm, {
              text: c
            })
          ]
        }),
        i.jsx("input", {
          id: h,
          type: "checkbox",
          checked: f,
          disabled: u,
          onChange: (S) => m(S.target.checked)
        })
      ]
    });
  }
  function Nm({ text: r }) {
    const [c, f] = E.useState(false), u = E.useId();
    return i.jsxs("span", {
      className: "help-tooltip",
      "data-open": c || void 0,
      children: [
        i.jsx("button", {
          type: "button",
          className: "help-tooltip-trigger",
          "aria-label": "More information",
          "aria-describedby": u,
          "aria-expanded": c,
          onClick: () => f((m) => !m),
          children: i.jsx(hp, {
            size: 16,
            "aria-hidden": "true"
          })
        }),
        i.jsx("span", {
          id: u,
          className: "help-tooltip-content",
          role: "tooltip",
          children: r
        })
      ]
    });
  }
  function cy({ friends: r, requests: c, onMessage: f, onAccept: u, onDecline: m, onInvite: h, onUnfriend: S }) {
    const [M, k] = E.useState(""), [g, x] = E.useState(""), [z, Y] = E.useState(null), [q, p] = E.useState(null), [$, V] = E.useState(false), [ae, ce] = E.useState(null), [le, he] = E.useState("all"), J = E.useMemo(() => r.filter((D) => {
      const se = D.name.toLowerCase().includes(M.trim().toLowerCase()), X = le === "all" || le === "online" && D.presence !== "offline" || D.presence === "in_game";
      return se && X;
    }), [
      le,
      r,
      M
    ]);
    async function ne(D) {
      D.preventDefault();
      const se = g.trim();
      if (se) {
        V(true), p(null), Y(null);
        try {
          const X = await h(se);
          Y(X), x("");
        } catch (X) {
          p(X instanceof Error ? X.message : "The invite could not be sent.");
        } finally {
          V(false);
        }
      }
    }
    const T = r.filter((D) => D.presence !== "offline").length, L = r.filter((D) => D.presence === "in_game").length;
    return i.jsxs("section", {
      className: "social-layout",
      children: [
        i.jsxs("div", {
          className: "social-main stack",
          children: [
            i.jsxs("div", {
              className: "social-summary",
              children: [
                i.jsxs("button", {
                  className: le === "all" ? "social-stat active" : "social-stat",
                  onClick: () => he("all"),
                  type: "button",
                  children: [
                    i.jsx(vs, {
                      size: 19
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: r.length
                        }),
                        " Friends"
                      ]
                    })
                  ]
                }),
                i.jsxs("button", {
                  className: le === "online" ? "social-stat active" : "social-stat",
                  onClick: () => he("online"),
                  type: "button",
                  children: [
                    i.jsx("span", {
                      className: "presence-dot online"
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: T
                        }),
                        " Online"
                      ]
                    })
                  ]
                }),
                i.jsxs("button", {
                  className: le === "in_game" ? "social-stat active" : "social-stat",
                  onClick: () => he("in_game"),
                  type: "button",
                  children: [
                    i.jsx(mc, {
                      size: 19
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: L
                        }),
                        " In game"
                      ]
                    })
                  ]
                })
              ]
            }),
            i.jsxs("div", {
              className: "panel social-friends-panel",
              children: [
                i.jsxs("div", {
                  className: "social-panel-heading",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("span", {
                          className: "eyebrow",
                          children: "Your network"
                        }),
                        i.jsx("h2", {
                          children: "Friends"
                        })
                      ]
                    }),
                    i.jsxs("label", {
                      className: "social-search",
                      children: [
                        i.jsx(Ul, {
                          size: 17
                        }),
                        i.jsx("input", {
                          "aria-label": "Search friends",
                          value: M,
                          onChange: (D) => k(D.target.value),
                          placeholder: "Search friends"
                        })
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "friend-list",
                  children: [
                    J.map((D) => i.jsxs("article", {
                      className: `friend-row ${D.presence === "offline" ? "offline" : ""}`,
                      children: [
                        i.jsxs("div", {
                          className: "social-avatar",
                          children: [
                            D.avatarUrl ? i.jsx("img", {
                              src: D.avatarUrl,
                              alt: ""
                            }) : D.initials,
                            i.jsx("span", {
                              className: `presence-dot ${D.presence}`,
                              title: Rm(D.presence)
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "friend-identity",
                          children: [
                            i.jsx("strong", {
                              children: D.name
                            }),
                            i.jsxs("span", {
                              children: [
                                D.rating,
                                " Elo",
                                D.mutualFriends ? ` \xB7 ${D.mutualFriends} mutual` : ""
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: `friend-activity ${D.presence}`,
                          children: [
                            D.presence === "in_game" && i.jsx(mc, {
                              size: 15
                            }),
                            D.presence === "idle" && i.jsx(rm, {
                              size: 15
                            }),
                            i.jsxs("span", {
                              children: [
                                D.activity,
                                D.lastSeen ? ` \xB7 ${D.lastSeen}` : ""
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "friend-actions",
                          children: [
                            i.jsxs("button", {
                              className: "secondary friend-message",
                              type: "button",
                              onClick: () => f(D),
                              children: [
                                i.jsx(um, {
                                  size: 16
                                }),
                                " Message",
                                !!D.unread && i.jsx("span", {
                                  className: "unread-badge",
                                  children: D.unread
                                })
                              ]
                            }),
                            i.jsx("button", {
                              className: "secondary unfriend-button",
                              type: "button",
                              "aria-label": `Unfriend ${D.name}`,
                              title: `Unfriend ${D.name}`,
                              onClick: () => ce(D),
                              children: i.jsx(ic, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, D.id)),
                    J.length === 0 && i.jsx("div", {
                      className: "empty-state social-empty",
                      children: "No friends match this view."
                    })
                  ]
                })
              ]
            })
          ]
        }),
        i.jsxs("aside", {
          className: "social-side stack",
          children: [
            i.jsxs("div", {
              className: "panel invite-panel",
              children: [
                i.jsx("div", {
                  className: "invite-icon",
                  children: i.jsx(Ip, {
                    size: 22
                  })
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      className: "eyebrow",
                      children: "Grow your party"
                    }),
                    i.jsx("h2", {
                      children: "Invite a friend"
                    })
                  ]
                }),
                i.jsx("p", {
                  children: "Send an invite using their Empire League player name."
                }),
                i.jsxs("form", {
                  onSubmit: ne,
                  children: [
                    i.jsx("input", {
                      value: g,
                      onChange: (D) => {
                        x(D.target.value), Y(null), p(null);
                      },
                      placeholder: "Player name",
                      "aria-label": "Player name"
                    }),
                    i.jsxs("button", {
                      className: "primary",
                      type: "submit",
                      disabled: !g.trim() || $,
                      children: [
                        i.jsx(Sc, {
                          size: 16
                        }),
                        " ",
                        $ ? "Checking player\u2026" : "Send invite"
                      ]
                    })
                  ]
                }),
                z && i.jsxs("span", {
                  className: "invite-confirmation",
                  children: [
                    i.jsx(yi, {
                      size: 14
                    }),
                    " Invite sent to ",
                    z
                  ]
                }),
                q && i.jsxs("span", {
                  className: "invite-error",
                  role: "alert",
                  children: [
                    i.jsx(Nn, {
                      size: 14
                    }),
                    " ",
                    q
                  ]
                })
              ]
            }),
            i.jsxs("div", {
              className: "panel requests-panel",
              children: [
                i.jsxs("div", {
                  className: "social-panel-heading",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("span", {
                          className: "eyebrow",
                          children: "Pending"
                        }),
                        i.jsx("h2", {
                          children: "Friend requests"
                        })
                      ]
                    }),
                    c.length > 0 && i.jsx("span", {
                      className: "request-count",
                      children: c.length
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "request-list",
                  children: [
                    c.map((D) => i.jsxs("article", {
                      className: "request-row",
                      children: [
                        i.jsx("div", {
                          className: "social-avatar compact",
                          children: D.avatarUrl ? i.jsx("img", {
                            src: D.avatarUrl,
                            alt: ""
                          }) : D.initials
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("strong", {
                              children: D.name
                            }),
                            i.jsxs("span", {
                              children: [
                                D.rating,
                                " Elo \xB7 ",
                                D.mutualFriends,
                                " mutual"
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "request-actions",
                          children: [
                            i.jsx("button", {
                              type: "button",
                              className: "accept-request",
                              "aria-label": `Accept ${D.name}`,
                              title: "Accept",
                              onClick: () => u(D),
                              children: i.jsx(yi, {
                                size: 16
                              })
                            }),
                            i.jsx("button", {
                              type: "button",
                              "aria-label": `Decline ${D.name}`,
                              title: "Decline",
                              onClick: () => m(D.id),
                              children: i.jsx(Nn, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, D.id)),
                    c.length === 0 && i.jsx("p", {
                      className: "social-empty",
                      children: "You\u2019re all caught up."
                    })
                  ]
                })
              ]
            })
          ]
        }),
        ae && i.jsx("div", {
          className: "modal-backdrop social-confirm-backdrop",
          role: "presentation",
          onPointerDown: () => ce(null),
          children: i.jsxs("section", {
            className: "social-confirm-modal",
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "unfriend-title",
            onPointerDown: (D) => D.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "social-confirm-icon",
                children: i.jsx(ic, {
                  size: 24
                })
              }),
              i.jsxs("div", {
                children: [
                  i.jsx("span", {
                    className: "eyebrow",
                    children: "Remove friend"
                  }),
                  i.jsxs("h2", {
                    id: "unfriend-title",
                    children: [
                      "Unfriend ",
                      ae.name,
                      "?"
                    ]
                  })
                ]
              }),
              i.jsx("p", {
                children: "They\u2019ll be removed from your friends list and your current chat history will be cleared."
              }),
              i.jsxs("div", {
                className: "social-confirm-actions",
                children: [
                  i.jsx("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => ce(null),
                    children: "Cancel"
                  }),
                  i.jsxs("button", {
                    className: "social-confirm-remove",
                    type: "button",
                    onClick: () => {
                      S(ae), ce(null);
                    },
                    children: [
                      i.jsx(ic, {
                        size: 16
                      }),
                      " Unfriend"
                    ]
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  }
  function Rm(r) {
    return {
      online: "Online",
      in_game: "In game",
      idle: "Idle",
      offline: "Offline"
    }[r];
  }
  function uy({ chats: r, onToggle: c, onClose: f, onSend: u, onActivate: m }) {
    return i.jsx("div", {
      className: "chat-dock",
      "aria-label": "Open conversations",
      children: r.map((h) => h.minimized ? i.jsxs("button", {
        className: "chat-minimized",
        type: "button",
        onClick: () => {
          c(h.friend.id), m(h.friend.id);
        },
        children: [
          i.jsx(um, {
            size: 17
          }),
          i.jsx("span", {
            children: h.friend.name
          }),
          i.jsx("span", {
            className: `presence-dot ${h.friend.presence}`
          })
        ]
      }, h.friend.id) : i.jsx(dy, {
        chat: h,
        onToggle: c,
        onClose: f,
        onSend: u,
        onActivate: m
      }, h.friend.id))
    });
  }
  function dy({ chat: r, onToggle: c, onClose: f, onSend: u, onActivate: m }) {
    const [h, S] = E.useState(""), M = E.useRef(null);
    E.useEffect(() => {
      var _a2;
      return (_a2 = M.current) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth"
      });
    }, [
      r.messages
    ]);
    function k(g) {
      g.preventDefault(), h.trim() && (u(r.friend.id, h.trim()), S(""));
    }
    return i.jsxs("section", {
      className: "chat-window",
      onPointerDown: () => m(r.friend.id),
      children: [
        i.jsxs("header", {
          className: "chat-header",
          children: [
            i.jsxs("button", {
              className: "chat-person",
              type: "button",
              onClick: () => c(r.friend.id),
              children: [
                i.jsxs("span", {
                  className: "social-avatar compact",
                  children: [
                    r.friend.initials,
                    i.jsx("span", {
                      className: `presence-dot ${r.friend.presence}`
                    })
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    i.jsx("strong", {
                      children: r.friend.name
                    }),
                    i.jsx("small", {
                      children: Rm(r.friend.presence)
                    })
                  ]
                })
              ]
            }),
            i.jsxs("div", {
              children: [
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Minimize chat",
                  onClick: () => c(r.friend.id),
                  children: i.jsx(dm, {
                    size: 16
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Close chat",
                  onClick: () => f(r.friend.id),
                  children: i.jsx(Nn, {
                    size: 16
                  })
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "chat-messages",
          children: [
            i.jsx("div", {
              className: "chat-day",
              children: "Today"
            }),
            r.messages.map((g) => i.jsxs("div", {
              className: `chat-message ${g.from}`,
              children: [
                i.jsx("span", {
                  children: g.text
                }),
                i.jsx("small", {
                  children: g.time
                })
              ]
            }, g.id)),
            i.jsx("div", {
              ref: M
            })
          ]
        }),
        i.jsxs("form", {
          className: "chat-compose",
          onSubmit: k,
          children: [
            i.jsx("input", {
              value: h,
              onChange: (g) => S(g.target.value),
              placeholder: `Message ${r.friend.name}`,
              "aria-label": `Message ${r.friend.name}`
            }),
            i.jsx("button", {
              type: "submit",
              "aria-label": "Send message",
              disabled: !h.trim(),
              children: i.jsx(Sc, {
                size: 17
              })
            })
          ]
        })
      ]
    });
  }
  const fy = "" + new URL("el_icon_no_plume-CLUisAEI.png", import.meta.url).href, my = {
    async getOnlinePlayerCount() {
      if (ge) return 486;
      const r = await xe.request("/online");
      return Number(r.onlinePlayers);
    }
  }, hy = /* @__PURE__ */ new Set([
    "searching",
    "match_found",
    "accepting",
    "creating_lobby",
    "waiting_for_opponent",
    "verifying_lobby",
    "ready",
    "in_game",
    "verifying_result"
  ]);
  function wc() {
    const { state: r, notify: c } = kt();
    async function f() {
      var _a2;
      if (hy.has(r.queueStatus)) {
        c("Empire League cannot be minimized during an active match.", "danger", {
          detail: "Cancel matchmaking or finish the current match before minimizing."
        });
        return;
      }
      await ((_a2 = window.electronApi) == null ? void 0 : _a2.minimizeToTaskbar());
    }
    return i.jsxs("div", {
      className: "window-controls",
      "aria-label": "Window controls",
      children: [
        i.jsx("button", {
          type: "button",
          onClick: () => void f(),
          "aria-label": "Minimize to taskbar",
          title: "Minimize",
          children: i.jsx(dm, {
            size: 17,
            "aria-hidden": "true"
          })
        }),
        i.jsx("button", {
          className: "window-close",
          type: "button",
          onClick: () => {
            var _a2;
            return void ((_a2 = window.electronApi) == null ? void 0 : _a2.quitApp());
          },
          "aria-label": "Close Empire League",
          title: "Close",
          children: i.jsx(Nn, {
            size: 17,
            "aria-hidden": "true"
          })
        })
      ]
    });
  }
  const py = [
    {
      page: "home",
      label: "Home",
      icon: i.jsx(bp, {
        size: 18
      })
    },
    {
      page: "ranked",
      label: "Ranked",
      icon: i.jsx(vi, {
        size: 18
      })
    },
    {
      page: "weekly",
      label: "Weekly",
      icon: i.jsx(im, {
        size: 18
      })
    },
    {
      page: "custom",
      label: "Custom",
      icon: i.jsx(mc, {
        size: 18
      })
    },
    {
      page: "match-history",
      label: "Match History",
      icon: i.jsx(vp, {
        size: 18
      })
    },
    {
      page: "leaderboard",
      label: "Leaderboard",
      icon: i.jsx(fp, {
        size: 18
      })
    },
    {
      page: "profile",
      label: "Profile",
      icon: i.jsx(Ep, {
        size: 18
      })
    },
    {
      page: "social",
      label: "Social",
      icon: i.jsx(vs, {
        size: 18
      })
    },
    {
      page: "settings",
      label: "Settings",
      icon: i.jsx(hc, {
        size: 18
      })
    }
  ];
  function gy({ children: r, socialUnreadCount: c = 0 }) {
    const { page: f, setPage: u, state: m, signOut: h, selectedProfileId: S, openPlayerProfile: M, returnFromPlayerProfile: k } = kt(), g = f === "profile" && S !== null && S !== m.currentUser.id, x = `${m.currentUser.wins}-${m.currentUser.losses}`, [z, Y] = E.useState(null);
    return E.useEffect(() => {
      if (ge) return;
      let q = false;
      const p = () => {
        my.getOnlinePlayerCount().then((V) => {
          q || Y(V);
        }).catch(() => {
          q || Y(null);
        });
      };
      p();
      const $ = window.setInterval(p, 3e4);
      return () => {
        q = true, window.clearInterval($);
      };
    }, []), i.jsxs("div", {
      className: "app-shell",
      children: [
        i.jsxs("div", {
          className: "window-title",
          children: [
            i.jsx("img", {
              src: fy,
              alt: ""
            }),
            i.jsx("span", {
              children: "Empire League - AoE2:DE Community Client & Matchmaker"
            })
          ]
        }),
        i.jsx(wc, {}),
        i.jsxs("aside", {
          className: "sidebar",
          children: [
            i.jsx("nav", {
              className: "nav-list",
              "aria-label": "Primary navigation",
              children: py.map((q) => i.jsxs("button", {
                className: f === q.page ? "nav-item active" : "nav-item",
                type: "button",
                onClick: () => q.page === "profile" ? M(m.currentUser.id) : u(q.page),
                children: [
                  q.icon,
                  i.jsx("span", {
                    children: q.label
                  }),
                  q.page === "social" && c > 0 && i.jsx("span", {
                    className: "nav-notification-badge",
                    "aria-label": `${c} unread ${c === 1 ? "message" : "messages"}`,
                    children: c > 99 ? "99+" : c
                  }),
                  q.page === "ranked" && m.queueStatus === "searching" && i.jsxs("span", {
                    className: "medieval-loader nav-search-loader",
                    role: "status",
                    "aria-label": "Searching for a match",
                    children: [
                      i.jsx("span", {
                        "aria-hidden": "true"
                      }),
                      i.jsx("span", {
                        "aria-hidden": "true"
                      }),
                      i.jsx("span", {
                        "aria-hidden": "true"
                      })
                    ]
                  })
                ]
              }, q.page))
            }),
            i.jsxs("div", {
              className: "sidebar-meta",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Season"
                    }),
                    i.jsx("strong", {
                      children: "1"
                    })
                  ]
                }),
                z !== null && z >= 300 && i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Online"
                    }),
                    i.jsxs("strong", {
                      children: [
                        z.toLocaleString(),
                        " players"
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Connection"
                    }),
                    i.jsx("strong", {
                      className: `status-${m.connectionStatus}`,
                      children: m.connectionStatus
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Version"
                    }),
                    i.jsx("strong", {
                      children: "0.1.0"
                    })
                  ]
                })
              ]
            }),
            i.jsxs("div", {
              className: "user-block",
              children: [
                i.jsx("div", {
                  className: "avatar",
                  children: m.currentUser.avatarUrl ? i.jsx("img", {
                    src: m.currentUser.avatarUrl,
                    alt: ""
                  }) : m.currentUser.displayName.slice(0, 2).toUpperCase()
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: m.currentUser.displayName
                    }),
                    i.jsxs("span", {
                      children: [
                        m.currentUser.rating,
                        " Elo \xB7 ",
                        x
                      ]
                    })
                  ]
                }),
                i.jsx("button", {
                  className: "icon-button",
                  type: "button",
                  "aria-label": "Sign out",
                  title: "Sign out",
                  onClick: () => void h(),
                  children: i.jsx(kp, {
                    size: 16
                  })
                })
              ]
            })
          ]
        }),
        i.jsx("main", {
          className: `main-area page-${f}`,
          children: i.jsxs("div", {
            className: "content-shell",
            children: [
              i.jsxs("header", {
                className: g ? "topbar linked-profile-topbar" : "topbar",
                children: [
                  g && i.jsxs("button", {
                    className: "secondary profile-header-back",
                    type: "button",
                    onClick: k,
                    children: [
                      i.jsx(up, {
                        size: 16
                      }),
                      "Back"
                    ]
                  }),
                  i.jsx("div", {
                    children: i.jsx("h1", {
                      children: yy(f)
                    })
                  })
                ]
              }),
              r,
              i.jsx("footer", {
                className: "legal-footer",
                children: "Age of Empires II \xA9 Microsoft Corporation. Empire League is an independent community project and is not endorsed by or affiliated with Microsoft."
              })
            ]
          })
        })
      ]
    });
  }
  function yy(r) {
    return {
      home: "Home",
      ranked: "Ranked",
      weekly: "Weekly Queue",
      custom: "Custom",
      "match-history": "Match History",
      leaderboard: "Leaderboard",
      profile: "Player Profile",
      social: "Social",
      settings: "Settings"
    }[r];
  }
  function vy() {
    const { state: r, acceptMatch: c, declineMatch: f } = kt(), u = r.activeMatch, m = (u == null ? void 0 : u.queue.id) === "ranked-rm-1v1" && u.opponent.steamLicenseStatus === "family_shared", h = E.useRef(m && (u == null ? void 0 : u.acceptDeadline) ? new Date(u.acceptDeadline).getTime() : Date.now() + 1e4), S = E.useRef(false), M = h.current, [k, g] = E.useState(() => Math.max(0, Math.ceil((M - Date.now()) / 1e3))), x = rn.find((z) => {
      var _a2;
      return z.id === ((_a2 = u == null ? void 0 : u.selectedMap) == null ? void 0 : _a2.id);
    }) ?? (u == null ? void 0 : u.selectedMap);
    return E.useEffect(() => {
      const z = () => g(Math.max(0, Math.ceil((M - Date.now()) / 1e3)));
      z();
      const Y = window.setInterval(z, 250);
      return () => window.clearInterval(Y);
    }, [
      M
    ]), E.useEffect(() => {
      if (m) return;
      const z = Math.max(0, M - Date.now()), Y = window.setTimeout(() => {
        S.current || (S.current = true, c());
      }, z);
      return () => window.clearTimeout(Y);
    }, [
      c,
      M,
      m
    ]), E.useEffect(() => {
      function z(Y) {
        Y.key === "Escape" && f();
      }
      return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
    }, [
      f
    ]), u ? i.jsx("div", {
      className: "modal-backdrop",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "match-found-title",
      children: i.jsxs("div", {
        className: "match-modal",
        children: [
          i.jsx("span", {
            className: "eyebrow",
            children: m ? "Decision required" : "Auto-accepting"
          }),
          i.jsx("h2", {
            id: "match-found-title",
            children: "Match Found"
          }),
          x && i.jsxs("figure", {
            className: "match-map-thumbnail",
            children: [
              i.jsx("img", {
                src: x.thumbnailUrl,
                alt: ""
              }),
              i.jsx("strong", {
                className: "match-game-type",
                children: u.queue.format
              }),
              i.jsx("figcaption", {
                children: x.name
              })
            ]
          }),
          m && i.jsx("p", {
            className: "family-sharing-warning",
            children: "Opponent is using family sharing, which means a higher likelihood of smurfing."
          }),
          i.jsxs("div", {
            className: "countdown",
            children: [
              k,
              "s"
            ]
          }),
          i.jsxs("div", {
            className: "modal-actions",
            children: [
              i.jsx("button", {
                className: "secondary",
                type: "button",
                onClick: () => void f(),
                children: "Decline Match"
              }),
              m && i.jsx("button", {
                className: "primary",
                type: "button",
                onClick: () => void c(),
                children: "Accept Match"
              })
            ]
          })
        ]
      })
    }) : null;
  }
  const by = {
    info: wp,
    success: mp,
    warning: Ap,
    danger: lm,
    loading: om
  };
  function wy() {
    const { state: r, dismissNotification: c } = kt();
    return i.jsx("div", {
      className: "toasts",
      "aria-live": "polite",
      children: r.notifications.map((f) => i.jsx(ky, {
        item: f,
        dismiss: () => c(f.id)
      }, `${f.id}-${f.tone}`))
    });
  }
  function ky({ item: r, dismiss: c }) {
    const [f, u] = E.useState(r.durationMs ?? 0), [m, h] = E.useState(false), [S, M] = E.useState(false), k = E.useRef(Date.now()), g = by[r.tone];
    E.useEffect(() => {
      if (m || r.durationMs === null) return;
      k.current = Date.now();
      const Y = window.setTimeout(c, f);
      return () => window.clearTimeout(Y);
    }, [
      c,
      r.durationMs,
      m,
      f
    ]);
    function x() {
      u((Y) => Math.max(0, Y - (Date.now() - k.current))), h(true);
    }
    const z = {
      "--toast-duration": `${f}ms`,
      "--toast-progress": r.durationMs ? f / r.durationMs : 1
    };
    return i.jsxs("div", {
      className: `toast ${r.tone}${r.action ? " has-action" : ""}`,
      onMouseEnter: x,
      onMouseLeave: () => h(false),
      children: [
        i.jsx(g, {
          className: `toast-icon${r.tone === "loading" ? " spin" : ""}`,
          size: 20,
          "aria-hidden": "true"
        }),
        i.jsxs("div", {
          className: "toast-copy",
          children: [
            i.jsx("strong", {
              children: r.message
            }),
            r.detail && i.jsx("span", {
              children: r.detail
            })
          ]
        }),
        r.action && i.jsx("button", {
          className: "toast-action",
          type: "button",
          disabled: S,
          onClick: () => {
            var _a2;
            M(true), Promise.resolve((_a2 = r.action) == null ? void 0 : _a2.run()).finally(() => M(false));
          },
          children: S ? "Disabling\u2026" : r.action.label
        }),
        r.tone !== "loading" && r.dismissible !== false && i.jsx("button", {
          type: "button",
          onClick: c,
          "aria-label": "Dismiss notification",
          children: i.jsx(Nn, {
            size: 16
          })
        }),
        !m && r.durationMs !== null && i.jsx("i", {
          className: "toast-progress",
          style: z,
          "aria-hidden": "true"
        }, f)
      ]
    });
  }
  const Sy = "" + new URL("el4-loading-C42nA83f.png", import.meta.url).href, Ft = {
    async getSnapshot() {
      return ge ? {
        friends: gm,
        requests: ym,
        outgoing: []
      } : (await xe.request("/social")).snapshot;
    },
    async sendFriendRequest(r) {
      return ge ? {
        id: `preview-${r.toLowerCase().replaceAll(" ", "-")}`,
        displayName: r
      } : (await xe.request("/social/requests", {
        method: "POST",
        body: {
          displayName: r
        }
      })).player;
    },
    async acceptRequest(r) {
      ge || await xe.request(`/social/requests/${encodeURIComponent(r)}/accept`, {
        method: "POST"
      });
    },
    async declineRequest(r) {
      ge || await xe.request(`/social/requests/${encodeURIComponent(r)}`, {
        method: "DELETE"
      });
    },
    async removeFriend(r) {
      ge || await xe.request(`/social/friends/${encodeURIComponent(r)}`, {
        method: "DELETE"
      });
    },
    async updatePresence(r, c, f) {
      ge || await xe.request("/social/presence", {
        method: "POST",
        body: {
          presence: r,
          activity: c,
          mapName: f
        }
      });
    },
    async getMessages(r) {
      return ge ? [
        {
          id: "preview-message-1",
          senderId: r,
          recipientId: "user-1",
          text: "Want to queue for Arabia?",
          sentAt: new Date(Date.now() - 18e4).toISOString()
        },
        {
          id: "preview-message-2",
          senderId: "user-1",
          recipientId: r,
          text: "Sure, give me two minutes.",
          sentAt: new Date(Date.now() - 12e4).toISOString()
        }
      ] : (await xe.request(`/social/messages/${encodeURIComponent(r)}`)).messages;
    },
    async sendMessage(r, c) {
      return ge ? {
        id: `preview-message-${Date.now()}`,
        senderId: "user-1",
        recipientId: r,
        text: c,
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      } : (await xe.request("/social/messages", {
        method: "POST",
        body: {
          recipientId: r,
          text: c
        }
      })).message;
    },
    async markMessagesRead(r) {
      ge || await xe.request(`/social/messages/${encodeURIComponent(r)}/read`, {
        method: "POST"
      });
    },
    onEvent(r) {
      return ge ? () => {
      } : xe.onSocialEvent(r);
    }
  };
  function Cy() {
    var _a2, _b, _c;
    const [r, c] = E.useState(false), [f, u] = E.useState(!ge), [m, h] = E.useState(ge ? gm : []), [S, M] = E.useState(ge ? ym : []), [k, g] = E.useState([]), [x, z] = E.useState([]), Y = E.useRef([]);
    E.useEffect(() => {
      var _a3;
      return (_a3 = window.electronApi) == null ? void 0 : _a3.onMouseTestModeChanged(c);
    }, []), E.useEffect(() => {
      const T = window.setTimeout(() => u(false), 3e3);
      return () => window.clearTimeout(T);
    }, []);
    const { page: q, state: p, authStatus: $, authError: V, signInWithSteam: ae } = kt();
    E.useEffect(() => {
      Y.current = x;
    }, [
      x
    ]), E.useEffect(() => {
      const T = () => {
        var _a3;
        return void ((_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert());
      };
      return window.addEventListener("focus", T), () => window.removeEventListener("focus", T);
    }, []);
    async function ce(T) {
      const L = await Ft.getMessages(T.id).catch(() => []);
      Ft.markMessagesRead(T.id), z((D) => D.find((X) => X.friend.id === T.id) ? D.map((X) => X.friend.id === T.id ? {
        ...X,
        minimized: false
      } : X) : [
        ...D.slice(-2),
        {
          friend: T,
          minimized: false,
          messages: L.map((X) => ({
            id: X.id,
            from: X.senderId === p.currentUser.id ? "me" : "friend",
            text: X.text,
            time: new Date(X.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }))
        }
      ]), h((D) => D.map((se) => se.id === T.id ? {
        ...se,
        unread: 0
      } : se));
    }
    function le(T) {
      var _a3;
      h((L) => L.map((D) => D.id === T ? {
        ...D,
        unread: 0
      } : D)), Ft.markMessagesRead(T), (_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert();
    }
    async function he(T) {
      await Ft.removeFriend(T.id), z((L) => L.filter((D) => D.friend.id !== T.id));
    }
    async function J(T) {
      await Ft.acceptRequest(T.connectionId);
    }
    async function ne(T) {
      const L = T.trim().toLowerCase();
      if (L === p.currentUser.displayName.toLowerCase()) throw new Error("You can\u2019t send a friend invite to yourself.");
      if (m.some((se) => se.name.toLowerCase() === L)) throw new Error(`${T.trim()} is already your friend.`);
      if (S.some((se) => se.name.toLowerCase() === L)) throw new Error(`You already have a pending request from ${T.trim()}.`);
      return (await Ft.sendFriendRequest(T)).displayName;
    }
    return E.useEffect(() => {
      if (ge || $ !== "authenticated") return;
      const T = (L) => {
        h((D) => L.friends.map((se) => {
          var _a3;
          return {
            ...se,
            initials: am(se.name),
            unread: se.unread ?? ((_a3 = D.find((X) => X.id === se.id)) == null ? void 0 : _a3.unread) ?? 0
          };
        })), M(L.requests.map((D) => ({
          ...D,
          initials: am(D.name)
        }))), g(L.outgoing.map((D) => D.id));
      };
      return Ft.getSnapshot().then(T), Ft.onEvent((L) => {
        var _a3;
        if (L.type === "snapshot" && T(L.snapshot), L.type === "presence" && (h((D) => D.map((se) => se.id === L.playerId ? {
          ...se,
          presence: L.presence,
          activity: L.activity,
          mapName: L.mapName
        } : se)), z((D) => D.map((se) => se.friend.id === L.playerId ? {
          ...se,
          friend: {
            ...se.friend,
            presence: L.presence,
            activity: L.activity,
            mapName: L.mapName
          }
        } : se))), L.type === "message") {
          const D = L.message, se = {
            id: D.id,
            from: "friend",
            text: D.text,
            time: new Date(D.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }, X = Y.current.find((ke) => ke.friend.id === D.senderId && !ke.minimized);
          z((ke) => ke.some((Te) => Te.friend.id === D.senderId) ? ke.map((Te) => Te.friend.id === D.senderId ? {
            ...Te,
            messages: [
              ...Te.messages,
              se
            ]
          } : Te) : ke), X ? Ft.markMessagesRead(D.senderId) : (h((ke) => ke.map((ze) => ze.id === D.senderId ? {
            ...ze,
            unread: (ze.unread ?? 0) + 1
          } : ze)), document.hasFocus() || ((_a3 = window.electronApi) == null ? void 0 : _a3.alertUnreadMessage()));
        }
      });
    }, [
      $,
      p.currentUser.id
    ]), E.useEffect(() => {
      if (ge || $ !== "authenticated") return;
      let T = false, L = 0;
      const D = () => {
        var _a3, _b2;
        const ze = p.activeMatch, Te = p.queueStatus === "in_game" || p.gameStatus === "in_match", tt = Te ? "in_game" : T ? "idle" : "online", U = Te ? `In game${((_a3 = ze == null ? void 0 : ze.selectedMap) == null ? void 0 : _a3.name) ? ` \xB7 ${ze.selectedMap.name}` : ""}` : p.queueStatus === "searching" ? "Looking for a match" : T ? "Idle" : "Online";
        Ft.updatePresence(tt, U, Te ? (_b2 = ze == null ? void 0 : ze.selectedMap) == null ? void 0 : _b2.name : void 0);
      }, se = () => {
        const ze = T;
        T = false, window.clearTimeout(L), L = window.setTimeout(() => {
          T = true, D();
        }, 5 * 6e4), ze && D();
      }, X = [
        "pointerdown",
        "keydown",
        "wheel"
      ];
      X.forEach((ze) => window.addEventListener(ze, se, {
        passive: true
      })), se(), D();
      const ke = window.setInterval(D, 3e4);
      return () => {
        X.forEach((ze) => window.removeEventListener(ze, se)), window.clearTimeout(L), window.clearInterval(ke);
      };
    }, [
      $,
      p.queueStatus,
      p.gameStatus,
      (_a2 = p.activeMatch) == null ? void 0 : _a2.id,
      (_c = (_b = p.activeMatch) == null ? void 0 : _b.selectedMap) == null ? void 0 : _c.name
    ]), f || $ === "loading" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(wc, {}),
        i.jsx("main", {
          className: "auth-screen session-loading-screen",
          "aria-label": "Loading Empire League",
          children: i.jsxs("div", {
            className: "session-loading-mark",
            children: [
              i.jsx("img", {
                className: "session-loading-artwork",
                src: Sy,
                alt: "Empire League"
              }),
              i.jsxs("div", {
                className: "medieval-loader",
                role: "status",
                "aria-label": "Loading",
                children: [
                  i.jsx("span", {
                    "aria-hidden": "true"
                  }),
                  i.jsx("span", {
                    "aria-hidden": "true"
                  }),
                  i.jsx("span", {
                    "aria-hidden": "true"
                  })
                ]
              })
            ]
          })
        })
      ]
    }) : $ !== "authenticated" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(wc, {}),
        i.jsx("main", {
          className: "auth-screen",
          children: i.jsxs("div", {
            className: "auth-card",
            children: [
              i.jsx("h1", {
                children: "Empire League"
              }),
              i.jsx("p", {
                children: "Sign in with Steam to use matchmaking and keep your rating tied to your account."
              }),
              V && i.jsx("div", {
                className: "auth-error",
                children: V
              }),
              i.jsxs("button", {
                className: "primary large",
                type: "button",
                disabled: $ === "authenticating",
                onClick: () => void ae(),
                children: [
                  i.jsx(cm, {
                    size: 20
                  }),
                  $ === "authenticating" ? "Waiting for Steam\u2026" : "Sign in through Steam"
                ]
              }),
              $ === "authenticating" && i.jsx("span", {
                children: "Complete sign-in in your browser."
              })
            ]
          })
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        i.jsx(xy, {
          locked: [
            "creating_lobby",
            "waiting_for_opponent",
            "verifying_lobby",
            "ready"
          ].includes(p.queueStatus) && !p.error
        }),
        i.jsxs(gy, {
          socialUnreadCount: m.reduce((T, L) => T + (L.unread ?? 0), 0),
          children: [
            q === "home" && i.jsx(zg, {}),
            q === "ranked" && i.jsx(U0, {}),
            q === "weekly" && i.jsx(X0, {}),
            q === "custom" && i.jsx(V0, {}),
            q === "match-history" && i.jsx(W0, {}),
            q === "leaderboard" && i.jsx(ty, {}),
            q === "profile" && i.jsx(ry, {
              friendIds: m.map((T) => T.id),
              outgoingRequestIds: k,
              onAddFriend: async (T) => {
                await ne(T);
              }
            }),
            q === "social" && i.jsx(cy, {
              friends: m,
              requests: S,
              onMessage: (T) => void ce(T),
              onAccept: (T) => void J(T),
              onDecline: (T) => {
                var _a3;
                return void Ft.declineRequest(((_a3 = S.find((L) => L.id === T)) == null ? void 0 : _a3.connectionId) ?? T);
              },
              onInvite: ne,
              onUnfriend: (T) => void he(T)
            }),
            q === "settings" && i.jsx(oy, {})
          ]
        }),
        p.queueStatus === "match_found" && p.activeMatch && i.jsx(vy, {}),
        i.jsx(wy, {}),
        i.jsx(uy, {
          chats: x,
          onToggle: (T) => z((L) => L.map((D) => D.friend.id === T ? {
            ...D,
            minimized: !D.minimized
          } : D)),
          onClose: (T) => z((L) => L.filter((D) => D.friend.id !== T)),
          onActivate: le,
          onSend: (T, L) => void Ft.sendMessage(T, L).then((D) => z((se) => se.map((X) => X.friend.id === T ? {
            ...X,
            messages: [
              ...X.messages,
              {
                id: D.id,
                from: "me",
                text: D.text,
                time: new Date(D.sentAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })
              }
            ]
          } : X)))
        }),
        r && i.jsx(My, {})
      ]
    });
  }
  function am(r) {
    var _a2;
    const c = r.trim().split(/\s+/);
    return (c.length > 1 ? `${c[0][0]}${(_a2 = c.at(-1)) == null ? void 0 : _a2[0]}` : r.slice(0, 2)).toUpperCase();
  }
  function xy({ locked: r }) {
    const [c, f] = E.useState(null);
    return E.useEffect(() => {
      var _a2, _b, _c, _d;
      if (!r) {
        f(null);
        return;
      }
      (_a2 = window.electronApi) == null ? void 0 : _a2.setLobbyInputLock(true);
      const u = (_b = window.electronApi) == null ? void 0 : _b.onLobbyGuardPointer(f);
      return document.documentElement.classList.add("game-transition-input-forwarded"), (_d = (_c = document.activeElement) == null ? void 0 : _c.blur) == null ? void 0 : _d.call(_c), () => {
        var _a3;
        (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), u == null ? void 0 : u(), document.documentElement.classList.remove("game-transition-input-forwarded");
      };
    }, [
      r
    ]), !r || !c ? null : i.jsx("span", {
      className: "lobby-guard-pointer",
      style: {
        left: c.x,
        top: c.y
      },
      "aria-hidden": "true"
    });
  }
  function My() {
    const [r, c] = E.useState(null), [f, u] = E.useState(null);
    return E.useEffect(() => {
      var _a2, _b;
      document.documentElement.classList.add("mouse-test-hud-active"), document.body.classList.add("mouse-test-hud-active");
      const m = (_a2 = window.electronApi) == null ? void 0 : _a2.onMouseTestPointer(c), h = (_b = window.electronApi) == null ? void 0 : _b.onMouseTestCoordinatesCopied((S) => {
        u(S), window.setTimeout(() => u(null), 1600);
      });
      return () => {
        m == null ? void 0 : m(), h == null ? void 0 : h(), document.documentElement.classList.remove("mouse-test-hud-active"), document.body.classList.remove("mouse-test-hud-active");
      };
    }, []), i.jsxs(i.Fragment, {
      children: [
        i.jsxs("section", {
          className: "mouse-test-hud",
          children: [
            i.jsxs("div", {
              className: "test-overlay__status",
              children: [
                i.jsx("span", {}),
                " AOE2 MOUSE TEST MODE"
              ]
            }),
            i.jsx("strong", {
              children: "Live pointer coordinates"
            }),
            r ? i.jsxs("dl", {
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Screen"
                    }),
                    i.jsxs("dd", {
                      children: [
                        r.screenX,
                        ", ",
                        r.screenY
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Client"
                    }),
                    i.jsxs("dd", {
                      children: [
                        r.clientX,
                        ", ",
                        r.clientY
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Design 3840\xD72160"
                    }),
                    i.jsxs("dd", {
                      children: [
                        r.designX,
                        ", ",
                        r.designY
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Client size"
                    }),
                    i.jsxs("dd", {
                      children: [
                        r.clientWidth,
                        " \xD7 ",
                        r.clientHeight
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Inside AoE2"
                    }),
                    i.jsx("dd", {
                      children: r.inside ? "Yes" : "No"
                    })
                  ]
                })
              ]
            }) : i.jsx("p", {
              children: "Waiting for pointer data\u2026"
            }),
            i.jsxs("div", {
              className: "mouse-test-hotkey",
              children: [
                i.jsx("kbd", {
                  children: "Ctrl"
                }),
                " + ",
                i.jsx("kbd", {
                  children: "Shift"
                }),
                " + ",
                i.jsx("kbd", {
                  children: "C"
                }),
                i.jsx("span", {
                  children: f ? `Copied all data at ${f}` : "Copy all mouse data"
                })
              ]
            }),
            i.jsxs("div", {
              className: "mouse-test-hotkey",
              children: [
                i.jsx("kbd", {
                  children: "Ctrl"
                }),
                " + ",
                i.jsx("kbd", {
                  children: "Shift"
                }),
                " + ",
                i.jsx("kbd", {
                  children: "H"
                }),
                i.jsx("span", {
                  children: "Hide or show Empire League"
                })
              ]
            }),
            i.jsx("small", {
              children: "Overlay is click-through. Alt+Tab to Empire League to stop the mode."
            })
          ]
        }),
        (r == null ? void 0 : r.inside) && i.jsx("div", {
          className: "mouse-test-crosshair",
          style: {
            transform: `translate(${r.clientX}px, ${r.clientY}px)`
          },
          children: i.jsxs("span", {
            children: [
              r.designX,
              ", ",
              r.designY
            ]
          })
        })
      ]
    });
  }
  np.createRoot(document.getElementById("root")).render(i.jsx(E.StrictMode, {
    children: i.jsx(Eg, {
      children: i.jsx(Cy, {})
    })
  }));
})();
