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
      for (const h of m) if (h.type === "childList") for (const x of h.addedNodes) x.tagName === "LINK" && x.rel === "modulepreload" && u(x);
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
  var $o = {
    exports: {}
  }, ui = {};
  var C1;
  function Kh() {
    if (C1) return ui;
    C1 = 1;
    var r = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
    function f(u, m, h) {
      var x = null;
      if (h !== void 0 && (x = "" + h), m.key !== void 0 && (x = "" + m.key), "key" in m) {
        h = {};
        for (var j in m) j !== "key" && (h[j] = m[j]);
      } else h = m;
      return m = h.ref, {
        $$typeof: r,
        type: u,
        key: x,
        ref: m !== void 0 ? m : null,
        props: h
      };
    }
    return ui.Fragment = c, ui.jsx = f, ui.jsxs = f, ui;
  }
  var x1;
  function Jh() {
    return x1 || (x1 = 1, $o.exports = Kh()), $o.exports;
  }
  var i = Jh(), Wo = {
    exports: {}
  }, be = {};
  var M1;
  function Fh() {
    if (M1) return be;
    M1 = 1;
    var r = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), x = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), Q = Symbol.iterator;
    function q(v) {
      return v === null || typeof v != "object" ? null : (v = Q && v[Q] || v["@@iterator"], typeof v == "function" ? v : null);
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
    }, F = Object.assign, V = {};
    function ee(v, H, $) {
      this.props = v, this.context = H, this.refs = V, this.updater = $ || p;
    }
    ee.prototype.isReactComponent = {}, ee.prototype.setState = function(v, H) {
      if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, v, H, "setState");
    }, ee.prototype.forceUpdate = function(v) {
      this.updater.enqueueForceUpdate(this, v, "forceUpdate");
    };
    function oe() {
    }
    oe.prototype = ee.prototype;
    function le(v, H, $) {
      this.props = v, this.context = H, this.refs = V, this.updater = $ || p;
    }
    var he = le.prototype = new oe();
    he.constructor = le, F(he, ee.prototype), he.isPureReactComponent = true;
    var K = Array.isArray;
    function ne() {
    }
    var z = {
      H: null,
      A: null,
      T: null,
      S: null
    }, L = Object.prototype.hasOwnProperty;
    function U(v, H, $) {
      var ae = $.ref;
      return {
        $$typeof: r,
        type: v,
        key: H,
        ref: ae !== void 0 ? ae : null,
        props: $
      };
    }
    function J(v, H) {
      return U(v.type, H, v.props);
    }
    function te(v) {
      return typeof v == "object" && v !== null && v.$$typeof === r;
    }
    function we(v) {
      var H = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + v.replace(/[=:]/g, function($) {
        return H[$];
      });
    }
    var ze = /\/+/g;
    function Ee(v, H) {
      return typeof v == "object" && v !== null && v.key != null ? we("" + v.key) : H.toString(36);
    }
    function at(v) {
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
    function w(v, H, $, ae, ge) {
      var ke = typeof v;
      (ke === "undefined" || ke === "boolean") && (v = null);
      var Re = false;
      if (v === null) Re = true;
      else switch (ke) {
        case "bigint":
        case "string":
        case "number":
          Re = true;
          break;
        case "object":
          switch (v.$$typeof) {
            case r:
            case c:
              Re = true;
              break;
            case C:
              return Re = v._init, w(Re(v._payload), H, $, ae, ge);
          }
      }
      if (Re) return ge = ge(v), Re = ae === "" ? "." + Ee(v, 0) : ae, K(ge) ? ($ = "", Re != null && ($ = Re.replace(ze, "$&/") + "/"), w(ge, H, $, "", function(wt) {
        return wt;
      })) : ge != null && (te(ge) && (ge = J(ge, $ + (ge.key == null || v && v.key === ge.key ? "" : ("" + ge.key).replace(ze, "$&/") + "/") + Re)), H.push(ge)), 1;
      Re = 0;
      var ot = ae === "" ? "." : ae + ":";
      if (K(v)) for (var Xe = 0; Xe < v.length; Xe++) ae = v[Xe], ke = ot + Ee(ae, Xe), Re += w(ae, H, $, ke, ge);
      else if (Xe = q(v), typeof Xe == "function") for (v = Xe.call(v), Xe = 0; !(ae = v.next()).done; ) ae = ae.value, ke = ot + Ee(ae, Xe++), Re += w(ae, H, $, ke, ge);
      else if (ke === "object") {
        if (typeof v.then == "function") return w(at(v), H, $, ae, ge);
        throw H = String(v), Error("Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead.");
      }
      return Re;
    }
    function R(v, H, $) {
      if (v == null) return v;
      var ae = [], ge = 0;
      return w(v, ae, "", "", function(ke) {
        return H.call($, ke, ge++);
      }), ae;
    }
    function W(v) {
      if (v._status === -1) {
        var H = v._result;
        H = H(), H.then(function($) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = $);
        }, function($) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = $);
        }), v._status === -1 && (v._status = 0, v._result = H);
      }
      if (v._status === 1) return v._result.default;
      throw v._result;
    }
    var fe = typeof reportError == "function" ? reportError : function(v) {
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
    }, pe = {
      map: R,
      forEach: function(v, H, $) {
        R(v, function() {
          H.apply(this, arguments);
        }, $);
      },
      count: function(v) {
        var H = 0;
        return R(v, function() {
          H++;
        }), H;
      },
      toArray: function(v) {
        return R(v, function(H) {
          return H;
        }) || [];
      },
      only: function(v) {
        if (!te(v)) throw Error("React.Children.only expected to receive a single React element child.");
        return v;
      }
    };
    return be.Activity = D, be.Children = pe, be.Component = ee, be.Fragment = f, be.Profiler = m, be.PureComponent = le, be.StrictMode = u, be.Suspense = k, be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = z, be.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(v) {
        return z.H.useMemoCache(v);
      }
    }, be.cache = function(v) {
      return function() {
        return v.apply(null, arguments);
      };
    }, be.cacheSignal = function() {
      return null;
    }, be.cloneElement = function(v, H, $) {
      if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
      var ae = F({}, v.props), ge = v.key;
      if (H != null) for (ke in H.key !== void 0 && (ge = "" + H.key), H) !L.call(H, ke) || ke === "key" || ke === "__self" || ke === "__source" || ke === "ref" && H.ref === void 0 || (ae[ke] = H[ke]);
      var ke = arguments.length - 2;
      if (ke === 1) ae.children = $;
      else if (1 < ke) {
        for (var Re = Array(ke), ot = 0; ot < ke; ot++) Re[ot] = arguments[ot + 2];
        ae.children = Re;
      }
      return U(v.type, ge, ae);
    }, be.createContext = function(v) {
      return v = {
        $$typeof: x,
        _currentValue: v,
        _currentValue2: v,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, v.Provider = v, v.Consumer = {
        $$typeof: h,
        _context: v
      }, v;
    }, be.createElement = function(v, H, $) {
      var ae, ge = {}, ke = null;
      if (H != null) for (ae in H.key !== void 0 && (ke = "" + H.key), H) L.call(H, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (ge[ae] = H[ae]);
      var Re = arguments.length - 2;
      if (Re === 1) ge.children = $;
      else if (1 < Re) {
        for (var ot = Array(Re), Xe = 0; Xe < Re; Xe++) ot[Xe] = arguments[Xe + 2];
        ge.children = ot;
      }
      if (v && v.defaultProps) for (ae in Re = v.defaultProps, Re) ge[ae] === void 0 && (ge[ae] = Re[ae]);
      return U(v, ke, ge);
    }, be.createRef = function() {
      return {
        current: null
      };
    }, be.forwardRef = function(v) {
      return {
        $$typeof: j,
        render: v
      };
    }, be.isValidElement = te, be.lazy = function(v) {
      return {
        $$typeof: C,
        _payload: {
          _status: -1,
          _result: v
        },
        _init: W
      };
    }, be.memo = function(v, H) {
      return {
        $$typeof: y,
        type: v,
        compare: H === void 0 ? null : H
      };
    }, be.startTransition = function(v) {
      var H = z.T, $ = {};
      z.T = $;
      try {
        var ae = v(), ge = z.S;
        ge !== null && ge($, ae), typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(ne, fe);
      } catch (ke) {
        fe(ke);
      } finally {
        H !== null && $.types !== null && (H.types = $.types), z.T = H;
      }
    }, be.unstable_useCacheRefresh = function() {
      return z.H.useCacheRefresh();
    }, be.use = function(v) {
      return z.H.use(v);
    }, be.useActionState = function(v, H, $) {
      return z.H.useActionState(v, H, $);
    }, be.useCallback = function(v, H) {
      return z.H.useCallback(v, H);
    }, be.useContext = function(v) {
      return z.H.useContext(v);
    }, be.useDebugValue = function() {
    }, be.useDeferredValue = function(v, H) {
      return z.H.useDeferredValue(v, H);
    }, be.useEffect = function(v, H) {
      return z.H.useEffect(v, H);
    }, be.useEffectEvent = function(v) {
      return z.H.useEffectEvent(v);
    }, be.useId = function() {
      return z.H.useId();
    }, be.useImperativeHandle = function(v, H, $) {
      return z.H.useImperativeHandle(v, H, $);
    }, be.useInsertionEffect = function(v, H) {
      return z.H.useInsertionEffect(v, H);
    }, be.useLayoutEffect = function(v, H) {
      return z.H.useLayoutEffect(v, H);
    }, be.useMemo = function(v, H) {
      return z.H.useMemo(v, H);
    }, be.useOptimistic = function(v, H) {
      return z.H.useOptimistic(v, H);
    }, be.useReducer = function(v, H, $) {
      return z.H.useReducer(v, H, $);
    }, be.useRef = function(v) {
      return z.H.useRef(v);
    }, be.useState = function(v) {
      return z.H.useState(v);
    }, be.useSyncExternalStore = function(v, H, $) {
      return z.H.useSyncExternalStore(v, H, $);
    }, be.useTransition = function() {
      return z.H.useTransition();
    }, be.version = "19.2.8", be;
  }
  var j1;
  function bc() {
    return j1 || (j1 = 1, Wo.exports = Fh()), Wo.exports;
  }
  var T = bc(), Po = {
    exports: {}
  }, di = {}, ec = {
    exports: {}
  }, tc = {};
  var A1;
  function $h() {
    return A1 || (A1 = 1, (function(r) {
      function c(w, R) {
        var W = w.length;
        w.push(R);
        e: for (; 0 < W; ) {
          var fe = W - 1 >>> 1, pe = w[fe];
          if (0 < m(pe, R)) w[fe] = R, w[W] = pe, W = fe;
          else break e;
        }
      }
      function f(w) {
        return w.length === 0 ? null : w[0];
      }
      function u(w) {
        if (w.length === 0) return null;
        var R = w[0], W = w.pop();
        if (W !== R) {
          w[0] = W;
          e: for (var fe = 0, pe = w.length, v = pe >>> 1; fe < v; ) {
            var H = 2 * (fe + 1) - 1, $ = w[H], ae = H + 1, ge = w[ae];
            if (0 > m($, W)) ae < pe && 0 > m(ge, $) ? (w[fe] = ge, w[ae] = W, fe = ae) : (w[fe] = $, w[H] = W, fe = H);
            else if (ae < pe && 0 > m(ge, W)) w[fe] = ge, w[ae] = W, fe = ae;
            else break e;
          }
        }
        return R;
      }
      function m(w, R) {
        var W = w.sortIndex - R.sortIndex;
        return W !== 0 ? W : w.id - R.id;
      }
      if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var h = performance;
        r.unstable_now = function() {
          return h.now();
        };
      } else {
        var x = Date, j = x.now();
        r.unstable_now = function() {
          return x.now() - j;
        };
      }
      var k = [], y = [], C = 1, D = null, Q = 3, q = false, p = false, F = false, V = false, ee = typeof setTimeout == "function" ? setTimeout : null, oe = typeof clearTimeout == "function" ? clearTimeout : null, le = typeof setImmediate < "u" ? setImmediate : null;
      function he(w) {
        for (var R = f(y); R !== null; ) {
          if (R.callback === null) u(y);
          else if (R.startTime <= w) u(y), R.sortIndex = R.expirationTime, c(k, R);
          else break;
          R = f(y);
        }
      }
      function K(w) {
        if (F = false, he(w), !p) if (f(k) !== null) p = true, ne || (ne = true, we());
        else {
          var R = f(y);
          R !== null && at(K, R.startTime - w);
        }
      }
      var ne = false, z = -1, L = 5, U = -1;
      function J() {
        return V ? true : !(r.unstable_now() - U < L);
      }
      function te() {
        if (V = false, ne) {
          var w = r.unstable_now();
          U = w;
          var R = true;
          try {
            e: {
              p = false, F && (F = false, oe(z), z = -1), q = true;
              var W = Q;
              try {
                t: {
                  for (he(w), D = f(k); D !== null && !(D.expirationTime > w && J()); ) {
                    var fe = D.callback;
                    if (typeof fe == "function") {
                      D.callback = null, Q = D.priorityLevel;
                      var pe = fe(D.expirationTime <= w);
                      if (w = r.unstable_now(), typeof pe == "function") {
                        D.callback = pe, he(w), R = true;
                        break t;
                      }
                      D === f(k) && u(k), he(w);
                    } else u(k);
                    D = f(k);
                  }
                  if (D !== null) R = true;
                  else {
                    var v = f(y);
                    v !== null && at(K, v.startTime - w), R = false;
                  }
                }
                break e;
              } finally {
                D = null, Q = W, q = false;
              }
              R = void 0;
            }
          } finally {
            R ? we() : ne = false;
          }
        }
      }
      var we;
      if (typeof le == "function") we = function() {
        le(te);
      };
      else if (typeof MessageChannel < "u") {
        var ze = new MessageChannel(), Ee = ze.port2;
        ze.port1.onmessage = te, we = function() {
          Ee.postMessage(null);
        };
      } else we = function() {
        ee(te, 0);
      };
      function at(w, R) {
        z = ee(function() {
          w(r.unstable_now());
        }, R);
      }
      r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(w) {
        w.callback = null;
      }, r.unstable_forceFrameRate = function(w) {
        0 > w || 125 < w ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < w ? Math.floor(1e3 / w) : 5;
      }, r.unstable_getCurrentPriorityLevel = function() {
        return Q;
      }, r.unstable_next = function(w) {
        switch (Q) {
          case 1:
          case 2:
          case 3:
            var R = 3;
            break;
          default:
            R = Q;
        }
        var W = Q;
        Q = R;
        try {
          return w();
        } finally {
          Q = W;
        }
      }, r.unstable_requestPaint = function() {
        V = true;
      }, r.unstable_runWithPriority = function(w, R) {
        switch (w) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            w = 3;
        }
        var W = Q;
        Q = w;
        try {
          return R();
        } finally {
          Q = W;
        }
      }, r.unstable_scheduleCallback = function(w, R, W) {
        var fe = r.unstable_now();
        switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? fe + W : fe) : W = fe, w) {
          case 1:
            var pe = -1;
            break;
          case 2:
            pe = 250;
            break;
          case 5:
            pe = 1073741823;
            break;
          case 4:
            pe = 1e4;
            break;
          default:
            pe = 5e3;
        }
        return pe = W + pe, w = {
          id: C++,
          callback: R,
          priorityLevel: w,
          startTime: W,
          expirationTime: pe,
          sortIndex: -1
        }, W > fe ? (w.sortIndex = W, c(y, w), f(k) === null && w === f(y) && (F ? (oe(z), z = -1) : F = true, at(K, W - fe))) : (w.sortIndex = pe, c(k, w), p || q || (p = true, ne || (ne = true, we()))), w;
      }, r.unstable_shouldYield = J, r.unstable_wrapCallback = function(w) {
        var R = Q;
        return function() {
          var W = Q;
          Q = R;
          try {
            return w.apply(this, arguments);
          } finally {
            Q = W;
          }
        };
      };
    })(tc)), tc;
  }
  var I1;
  function Wh() {
    return I1 || (I1 = 1, ec.exports = $h()), ec.exports;
  }
  var ac = {
    exports: {}
  }, yt = {};
  var N1;
  function Ph() {
    if (N1) return yt;
    N1 = 1;
    var r = bc();
    function c(k) {
      var y = "https://react.dev/errors/" + k;
      if (1 < arguments.length) {
        y += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var C = 2; C < arguments.length; C++) y += "&args[]=" + encodeURIComponent(arguments[C]);
      }
      return "Minified React error #" + k + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
    function h(k, y, C) {
      var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: m,
        key: D == null ? null : "" + D,
        children: k,
        containerInfo: y,
        implementation: C
      };
    }
    var x = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function j(k, y) {
      if (k === "font") return "";
      if (typeof y == "string") return y === "use-credentials" ? y : "";
    }
    return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, yt.createPortal = function(k, y) {
      var C = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(c(299));
      return h(k, y, null, C);
    }, yt.flushSync = function(k) {
      var y = x.T, C = u.p;
      try {
        if (x.T = null, u.p = 2, k) return k();
      } finally {
        x.T = y, u.p = C, u.d.f();
      }
    }, yt.preconnect = function(k, y) {
      typeof k == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, u.d.C(k, y));
    }, yt.prefetchDNS = function(k) {
      typeof k == "string" && u.d.D(k);
    }, yt.preinit = function(k, y) {
      if (typeof k == "string" && y && typeof y.as == "string") {
        var C = y.as, D = j(C, y.crossOrigin), Q = typeof y.integrity == "string" ? y.integrity : void 0, q = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        C === "style" ? u.d.S(k, typeof y.precedence == "string" ? y.precedence : void 0, {
          crossOrigin: D,
          integrity: Q,
          fetchPriority: q
        }) : C === "script" && u.d.X(k, {
          crossOrigin: D,
          integrity: Q,
          fetchPriority: q,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0
        });
      }
    }, yt.preinitModule = function(k, y) {
      if (typeof k == "string") if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var C = j(y.as, y.crossOrigin);
          u.d.M(k, {
            crossOrigin: C,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && u.d.M(k);
    }, yt.preload = function(k, y) {
      if (typeof k == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
        var C = y.as, D = j(C, y.crossOrigin);
        u.d.L(k, C, {
          crossOrigin: D,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0
        });
      }
    }, yt.preloadModule = function(k, y) {
      if (typeof k == "string") if (y) {
        var C = j(y.as, y.crossOrigin);
        u.d.m(k, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: C,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else u.d.m(k);
    }, yt.requestFormReset = function(k) {
      u.d.r(k);
    }, yt.unstable_batchedUpdates = function(k, y) {
      return k(y);
    }, yt.useFormState = function(k, y, C) {
      return x.H.useFormState(k, y, C);
    }, yt.useFormStatus = function() {
      return x.H.useHostTransitionStatus();
    }, yt.version = "19.2.8", yt;
  }
  var E1;
  function ep() {
    if (E1) return ac.exports;
    E1 = 1;
    function r() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (c) {
        console.error(c);
      }
    }
    return r(), ac.exports = Ph(), ac.exports;
  }
  var R1;
  function tp() {
    if (R1) return di;
    R1 = 1;
    var r = Wh(), c = bc(), f = ep();
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
    function x(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function j(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function k(e) {
      if (h(e) !== e) throw Error(u(188));
    }
    function y(e) {
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
    function C(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = C(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var D = Object.assign, Q = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), p = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), oe = Symbol.for("react.consumer"), le = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
    function we(e) {
      return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var ze = Symbol.for("react.client.reference");
    function Ee(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === ze ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case F:
          return "Fragment";
        case ee:
          return "Profiler";
        case V:
          return "StrictMode";
        case K:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case U:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case p:
          return "Portal";
        case le:
          return e.displayName || "Context";
        case oe:
          return (e._context.displayName || "Context") + ".Consumer";
        case he:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case z:
          return t = e.displayName || null, t !== null ? t : Ee(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return Ee(e(t));
          } catch {
          }
      }
      return null;
    }
    var at = Array.isArray, w = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, fe = [], pe = -1;
    function v(e) {
      return {
        current: e
      };
    }
    function H(e) {
      0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
    }
    function $(e, t) {
      pe++, fe[pe] = e.current, e.current = t;
    }
    var ae = v(null), ge = v(null), ke = v(null), Re = v(null);
    function ot(e, t) {
      switch ($(ke, t), $(ge, e), $(ae, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Vf(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = Vf(t), e = Zf(t, e);
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
      H(ae), $(ae, e);
    }
    function Xe() {
      H(ae), H(ge), H(ke);
    }
    function wt(e) {
      e.memoizedState !== null && $(Re, e);
      var t = ae.current, a = Zf(t, e.type);
      t !== a && ($(ge, e), $(ae, a));
    }
    function ra(e) {
      ge.current === e && (H(ae), H(ge)), Re.current === e && (H(Re), li._currentValue = W);
    }
    var oa, Ea;
    function Bt(e) {
      if (oa === void 0) try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        oa = t && t[1] || "", Ea = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + oa + e + Ea;
    }
    var ln = false;
    function rn(e, t) {
      if (!e || ln) return "";
      ln = true;
      var a = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var n = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var Y = function() {
                  throw Error();
                };
                if (Object.defineProperty(Y.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Y, []);
                  } catch (_) {
                    var E = _;
                  }
                  Reflect.construct(e, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch (_) {
                    E = _;
                  }
                  e.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (_) {
                  E = _;
                }
                (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
                });
              }
            } catch (_) {
              if (_ && E && typeof _.stack == "string") return [
                _.stack,
                E.stack
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
          var g = o.split(`
`), I = d.split(`
`);
          for (s = n = 0; n < g.length && !g[n].includes("DetermineComponentFrameRoot"); ) n++;
          for (; s < I.length && !I[s].includes("DetermineComponentFrameRoot"); ) s++;
          if (n === g.length || s === I.length) for (n = g.length - 1, s = I.length - 1; 1 <= n && 0 <= s && g[n] !== I[s]; ) s--;
          for (; 1 <= n && 0 <= s; n--, s--) if (g[n] !== I[s]) {
            if (n !== 1 || s !== 1) do
              if (n--, s--, 0 > s || g[n] !== I[s]) {
                var B = `
` + g[n].replace(" at new ", " at ");
                return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
              }
            while (1 <= n && 0 <= s);
            break;
          }
        }
      } finally {
        ln = false, Error.prepareStackTrace = a;
      }
      return (a = e ? e.displayName || e.name : "") ? Bt(a) : "";
    }
    function O(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Bt(e.type);
        case 16:
          return Bt("Lazy");
        case 13:
          return e.child !== t && t !== null ? Bt("Suspense Fallback") : Bt("Suspense");
        case 19:
          return Bt("SuspenseList");
        case 0:
        case 15:
          return rn(e.type, false);
        case 11:
          return rn(e.type.render, false);
        case 1:
          return rn(e.type, true);
        case 31:
          return Bt("Activity");
        default:
          return "";
      }
    }
    function ue(e) {
      try {
        var t = "", a = null;
        do
          t += O(e, a), a = e, e = e.return;
        while (e);
        return t;
      } catch (n) {
        return `
Error generating stack: ` + n.message + `
` + n.stack;
      }
    }
    var ve = Object.prototype.hasOwnProperty, M = r.unstable_scheduleCallback, N = r.unstable_cancelCallback, Z = r.unstable_shouldYield, se = r.unstable_requestPaint, X = r.unstable_now, P = r.unstable_getCurrentPriorityLevel, ce = r.unstable_ImmediatePriority, Le = r.unstable_UserBlockingPriority, nt = r.unstable_NormalPriority, Fe = r.unstable_LowPriority, qt = r.unstable_IdlePriority, on = r.log, Rm = r.unstable_setDisableYieldValue, vs = null, Nt = null;
    function Ra(e) {
      if (typeof on == "function" && Rm(e), Nt && typeof Nt.setStrictMode == "function") try {
        Nt.setStrictMode(vs, e);
      } catch {
      }
    }
    var Et = Math.clz32 ? Math.clz32 : _m, Tm = Math.log, zm = Math.LN2;
    function _m(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Tm(e) / zm | 0) | 0;
    }
    var yi = 256, vi = 262144, bi = 4194304;
    function cn(e) {
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
    function wi(e, t, a) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var s = 0, l = e.suspendedLanes, o = e.pingedLanes;
      e = e.warmLanes;
      var d = n & 134217727;
      return d !== 0 ? (n = d & ~l, n !== 0 ? s = cn(n) : (o &= d, o !== 0 ? s = cn(o) : a || (a = d & ~e, a !== 0 && (s = cn(a))))) : (d = n & ~l, d !== 0 ? s = cn(d) : o !== 0 ? s = cn(o) : a || (a = n & ~e, a !== 0 && (s = cn(a)))), s === 0 ? 0 : t !== 0 && t !== s && (t & l) === 0 && (l = s & -s, a = t & -t, l >= a || l === 32 && (a & 4194048) !== 0) ? t : s;
    }
    function bs(e, t) {
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
    function jc() {
      var e = bi;
      return bi <<= 1, (bi & 62914560) === 0 && (bi = 4194304), e;
    }
    function Ol(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function ws(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Um(e, t, a, n, s, l) {
      var o = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var d = e.entanglements, g = e.expirationTimes, I = e.hiddenUpdates;
      for (a = o & ~a; 0 < a; ) {
        var B = 31 - Et(a), Y = 1 << B;
        d[B] = 0, g[B] = -1;
        var E = I[B];
        if (E !== null) for (I[B] = null, B = 0; B < E.length; B++) {
          var _ = E[B];
          _ !== null && (_.lane &= -536870913);
        }
        a &= ~Y;
      }
      n !== 0 && Ac(e, n, 0), l !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= l & ~(o & ~t));
    }
    function Ac(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var n = 31 - Et(t);
      e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930;
    }
    function Ic(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var n = 31 - Et(a), s = 1 << n;
        s & t | e[n] & t && (e[n] |= t), a &= ~s;
      }
    }
    function Nc(e, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : Bl(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
    }
    function Bl(e) {
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
    function ql(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Ec() {
      var e = R.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : g1(e.type));
    }
    function Rc(e, t) {
      var a = R.p;
      try {
        return R.p = e, t();
      } finally {
        R.p = a;
      }
    }
    var Ta = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Ta, kt = "__reactProps$" + Ta, Rn = "__reactContainer$" + Ta, Hl = "__reactEvents$" + Ta, Lm = "__reactListeners$" + Ta, Om = "__reactHandles$" + Ta, Tc = "__reactResources$" + Ta, ks = "__reactMarker$" + Ta;
    function Gl(e) {
      delete e[ft], delete e[kt], delete e[Hl], delete e[Lm], delete e[Om];
    }
    function Tn(e) {
      var t = e[ft];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Rn] || a[ft]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (e = e1(e); e !== null; ) {
            if (a = e[ft]) return a;
            e = e1(e);
          }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function zn(e) {
      if (e = e[ft] || e[Rn]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function Ss(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(u(33));
    }
    function _n(e) {
      var t = e[Tc];
      return t || (t = e[Tc] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function ut(e) {
      e[ks] = true;
    }
    var zc = /* @__PURE__ */ new Set(), _c = {};
    function un(e, t) {
      Dn(e, t), Dn(e + "Capture", t);
    }
    function Dn(e, t) {
      for (_c[e] = t, e = 0; e < t.length; e++) zc.add(t[e]);
    }
    var Bm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Dc = {}, Uc = {};
    function qm(e) {
      return ve.call(Uc, e) ? true : ve.call(Dc, e) ? false : Bm.test(e) ? Uc[e] = true : (Dc[e] = true, false);
    }
    function ki(e, t, a) {
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
    function Si(e, t, a) {
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
    function Ht(e) {
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
    function Lc(e) {
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
    function Yl(e) {
      if (!e._valueTracker) {
        var t = Lc(e) ? "checked" : "value";
        e._valueTracker = Hm(e, t, "" + e[t]);
      }
    }
    function Oc(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var a = t.getValue(), n = "";
      return e && (n = Lc(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), true) : false;
    }
    function Ci(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Gm = /[\n"\\]/g;
    function Gt(e) {
      return e.replace(Gm, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Ql(e, t, a, n, s, l, o, d) {
      e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t != null ? o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ht(t)) : e.value !== "" + Ht(t) && (e.value = "" + Ht(t)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), t != null ? Xl(e, o, Ht(t)) : a != null ? Xl(e, o, Ht(a)) : n != null && e.removeAttribute("value"), s == null && l != null && (e.defaultChecked = !!l), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Ht(d) : e.removeAttribute("name");
    }
    function Bc(e, t, a, n, s, l, o, d) {
      if (l != null && typeof l != "function" && typeof l != "symbol" && typeof l != "boolean" && (e.type = l), t != null || a != null) {
        if (!(l !== "submit" && l !== "reset" || t != null)) {
          Yl(e);
          return;
        }
        a = a != null ? "" + Ht(a) : "", t = t != null ? "" + Ht(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = n ?? s, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = d ? e.checked : !!n, e.defaultChecked = !!n, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Yl(e);
    }
    function Xl(e, t, a) {
      t === "number" && Ci(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function Un(e, t, a, n) {
      if (e = e.options, t) {
        t = {};
        for (var s = 0; s < a.length; s++) t["$" + a[s]] = true;
        for (a = 0; a < e.length; a++) s = t.hasOwnProperty("$" + e[a].value), e[a].selected !== s && (e[a].selected = s), s && n && (e[a].defaultSelected = true);
      } else {
        for (a = "" + Ht(a), t = null, s = 0; s < e.length; s++) {
          if (e[s].value === a) {
            e[s].selected = true, n && (e[s].defaultSelected = true);
            return;
          }
          t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = true);
      }
    }
    function qc(e, t, a) {
      if (t != null && (t = "" + Ht(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Ht(a) : "";
    }
    function Hc(e, t, a, n) {
      if (t == null) {
        if (n != null) {
          if (a != null) throw Error(u(92));
          if (at(n)) {
            if (1 < n.length) throw Error(u(93));
            n = n[0];
          }
          a = n;
        }
        a == null && (a = ""), t = a;
      }
      a = Ht(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Yl(e);
    }
    function Ln(e, t) {
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
    function Gc(e, t, a) {
      var n = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ym.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
    }
    function Yc(e, t, a) {
      if (t != null && typeof t != "object") throw Error(u(62));
      if (e = e.style, a != null) {
        for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
        for (var s in t) n = t[s], t.hasOwnProperty(s) && a[s] !== n && Gc(e, s, n);
      } else for (var l in t) t.hasOwnProperty(l) && Gc(e, l, t[l]);
    }
    function Vl(e) {
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
    function xi(e) {
      return Xm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function ua() {
    }
    var Zl = null;
    function Kl(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var On = null, Bn = null;
    function Qc(e) {
      var t = zn(e);
      if (t && (e = t.stateNode)) {
        var a = e[kt] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Ql(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Gt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                var n = a[t];
                if (n !== e && n.form === e.form) {
                  var s = n[kt] || null;
                  if (!s) throw Error(u(90));
                  Ql(n, s.value, s.defaultValue, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name);
                }
              }
              for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && Oc(n);
            }
            break e;
          case "textarea":
            qc(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Un(e, !!a.multiple, t, false);
        }
      }
    }
    var Jl = false;
    function Xc(e, t, a) {
      if (Jl) return e(t, a);
      Jl = true;
      try {
        var n = e(t);
        return n;
      } finally {
        if (Jl = false, (On !== null || Bn !== null) && (dl(), On && (t = On, e = Bn, Bn = On = null, Qc(t), e))) for (t = 0; t < e.length; t++) Qc(e[t]);
      }
    }
    function Cs(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var n = a[kt] || null;
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
    var da = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fl = false;
    if (da) try {
      var xs = {};
      Object.defineProperty(xs, "passive", {
        get: function() {
          Fl = true;
        }
      }), window.addEventListener("test", xs, xs), window.removeEventListener("test", xs, xs);
    } catch {
      Fl = false;
    }
    var za = null, $l = null, Mi = null;
    function Vc() {
      if (Mi) return Mi;
      var e, t = $l, a = t.length, n, s = "value" in za ? za.value : za.textContent, l = s.length;
      for (e = 0; e < a && t[e] === s[e]; e++) ;
      var o = a - e;
      for (n = 1; n <= o && t[a - n] === s[l - n]; n++) ;
      return Mi = s.slice(e, 1 < n ? 1 - n : void 0);
    }
    function ji(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Ai() {
      return true;
    }
    function Zc() {
      return false;
    }
    function St(e) {
      function t(a, n, s, l, o) {
        this._reactName = a, this._targetInst = s, this.type = n, this.nativeEvent = l, this.target = o, this.currentTarget = null;
        for (var d in e) e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(l) : l[d]);
        return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === false) ? Ai : Zc, this.isPropagationStopped = Zc, this;
      }
      return D(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = false), this.isDefaultPrevented = Ai);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = true), this.isPropagationStopped = Ai);
        },
        persist: function() {
        },
        isPersistent: Ai
      }), t;
    }
    var dn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ii = St(dn), Ms = D({}, dn, {
      view: 0,
      detail: 0
    }), Vm = St(Ms), Wl, Pl, js, Ni = D({}, Ms, {
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
      getModifierState: tr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== js && (js && e.type === "mousemove" ? (Wl = e.screenX - js.screenX, Pl = e.screenY - js.screenY) : Pl = Wl = 0, js = e), Wl);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Pl;
      }
    }), Kc = St(Ni), Zm = D({}, Ni, {
      dataTransfer: 0
    }), Km = St(Zm), Jm = D({}, Ms, {
      relatedTarget: 0
    }), er = St(Jm), Fm = D({}, dn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $m = St(Fm), Wm = D({}, dn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Pm = St(Wm), e2 = D({}, dn, {
      data: 0
    }), Jc = St(e2), t2 = {
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
    function tr() {
      return s2;
    }
    var i2 = D({}, Ms, {
      key: function(e) {
        if (e.key) {
          var t = t2[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = ji(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? a2[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: tr,
      charCode: function(e) {
        return e.type === "keypress" ? ji(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? ji(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), l2 = St(i2), r2 = D({}, Ni, {
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
    }), Fc = St(r2), o2 = D({}, Ms, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: tr
    }), c2 = St(o2), u2 = D({}, dn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), d2 = St(u2), f2 = D({}, Ni, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), m2 = St(f2), h2 = D({}, dn, {
      newState: 0,
      oldState: 0
    }), p2 = St(h2), g2 = [
      9,
      13,
      27,
      32
    ], ar = da && "CompositionEvent" in window, As = null;
    da && "documentMode" in document && (As = document.documentMode);
    var y2 = da && "TextEvent" in window && !As, $c = da && (!ar || As && 8 < As && 11 >= As), Wc = " ", Pc = false;
    function eu(e, t) {
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
    function tu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var qn = false;
    function v2(e, t) {
      switch (e) {
        case "compositionend":
          return tu(t);
        case "keypress":
          return t.which !== 32 ? null : (Pc = true, Wc);
        case "textInput":
          return e = t.data, e === Wc && Pc ? null : e;
        default:
          return null;
      }
    }
    function b2(e, t) {
      if (qn) return e === "compositionend" || !ar && eu(e, t) ? (e = Vc(), Mi = $l = za = null, qn = false, e) : null;
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
          return $c && t.locale !== "ko" ? null : t.data;
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
    function au(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!w2[e.type] : t === "textarea";
    }
    function nu(e, t, a, n) {
      On ? Bn ? Bn.push(n) : Bn = [
        n
      ] : On = n, t = vl(t, "onChange"), 0 < t.length && (a = new Ii("onChange", "change", null, a, n), e.push({
        event: a,
        listeners: t
      }));
    }
    var Is = null, Ns = null;
    function k2(e) {
      qf(e, 0);
    }
    function Ei(e) {
      var t = Ss(e);
      if (Oc(t)) return e;
    }
    function su(e, t) {
      if (e === "change") return t;
    }
    var iu = false;
    if (da) {
      var nr;
      if (da) {
        var sr = "oninput" in document;
        if (!sr) {
          var lu = document.createElement("div");
          lu.setAttribute("oninput", "return;"), sr = typeof lu.oninput == "function";
        }
        nr = sr;
      } else nr = false;
      iu = nr && (!document.documentMode || 9 < document.documentMode);
    }
    function ru() {
      Is && (Is.detachEvent("onpropertychange", ou), Ns = Is = null);
    }
    function ou(e) {
      if (e.propertyName === "value" && Ei(Ns)) {
        var t = [];
        nu(t, Ns, e, Kl(e)), Xc(k2, t);
      }
    }
    function S2(e, t, a) {
      e === "focusin" ? (ru(), Is = t, Ns = a, Is.attachEvent("onpropertychange", ou)) : e === "focusout" && ru();
    }
    function C2(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ei(Ns);
    }
    function x2(e, t) {
      if (e === "click") return Ei(t);
    }
    function M2(e, t) {
      if (e === "input" || e === "change") return Ei(t);
    }
    function j2(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Rt = typeof Object.is == "function" ? Object.is : j2;
    function Es(e, t) {
      if (Rt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var a = Object.keys(e), n = Object.keys(t);
      if (a.length !== n.length) return false;
      for (n = 0; n < a.length; n++) {
        var s = a[n];
        if (!ve.call(t, s) || !Rt(e[s], t[s])) return false;
      }
      return true;
    }
    function cu(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function uu(e, t) {
      var a = cu(e);
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
        a = cu(a);
      }
    }
    function du(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? du(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function fu(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = Ci(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = false;
        }
        if (a) e = t.contentWindow;
        else break;
        t = Ci(e.document);
      }
      return t;
    }
    function ir(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var A2 = da && "documentMode" in document && 11 >= document.documentMode, Hn = null, lr = null, Rs = null, rr = false;
    function mu(e, t, a) {
      var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      rr || Hn == null || Hn !== Ci(n) || (n = Hn, "selectionStart" in n && ir(n) ? n = {
        start: n.selectionStart,
        end: n.selectionEnd
      } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), Rs && Es(Rs, n) || (Rs = n, n = vl(lr, "onSelect"), 0 < n.length && (t = new Ii("onSelect", "select", null, t, a), e.push({
        event: t,
        listeners: n
      }), t.target = Hn)));
    }
    function fn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Gn = {
      animationend: fn("Animation", "AnimationEnd"),
      animationiteration: fn("Animation", "AnimationIteration"),
      animationstart: fn("Animation", "AnimationStart"),
      transitionrun: fn("Transition", "TransitionRun"),
      transitionstart: fn("Transition", "TransitionStart"),
      transitioncancel: fn("Transition", "TransitionCancel"),
      transitionend: fn("Transition", "TransitionEnd")
    }, or = {}, hu = {};
    da && (hu = document.createElement("div").style, "AnimationEvent" in window || (delete Gn.animationend.animation, delete Gn.animationiteration.animation, delete Gn.animationstart.animation), "TransitionEvent" in window || delete Gn.transitionend.transition);
    function mn(e) {
      if (or[e]) return or[e];
      if (!Gn[e]) return e;
      var t = Gn[e], a;
      for (a in t) if (t.hasOwnProperty(a) && a in hu) return or[e] = t[a];
      return e;
    }
    var pu = mn("animationend"), gu = mn("animationiteration"), yu = mn("animationstart"), I2 = mn("transitionrun"), N2 = mn("transitionstart"), E2 = mn("transitioncancel"), vu = mn("transitionend"), bu = /* @__PURE__ */ new Map(), cr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    cr.push("scrollEnd");
    function Wt(e, t) {
      bu.set(e, t), un(t, [
        e
      ]);
    }
    var Ri = typeof reportError == "function" ? reportError : function(e) {
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
    }, Yt = [], Yn = 0, ur = 0;
    function Ti() {
      for (var e = Yn, t = ur = Yn = 0; t < e; ) {
        var a = Yt[t];
        Yt[t++] = null;
        var n = Yt[t];
        Yt[t++] = null;
        var s = Yt[t];
        Yt[t++] = null;
        var l = Yt[t];
        if (Yt[t++] = null, n !== null && s !== null) {
          var o = n.pending;
          o === null ? s.next = s : (s.next = o.next, o.next = s), n.pending = s;
        }
        l !== 0 && wu(a, s, l);
      }
    }
    function zi(e, t, a, n) {
      Yt[Yn++] = e, Yt[Yn++] = t, Yt[Yn++] = a, Yt[Yn++] = n, ur |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
    }
    function dr(e, t, a, n) {
      return zi(e, t, a, n), _i(e);
    }
    function hn(e, t) {
      return zi(e, null, null, t), _i(e);
    }
    function wu(e, t, a) {
      e.lanes |= a;
      var n = e.alternate;
      n !== null && (n.lanes |= a);
      for (var s = false, l = e.return; l !== null; ) l.childLanes |= a, n = l.alternate, n !== null && (n.childLanes |= a), l.tag === 22 && (e = l.stateNode, e === null || e._visibility & 1 || (s = true)), e = l, l = l.return;
      return e.tag === 3 ? (l = e.stateNode, s && t !== null && (s = 31 - Et(a), e = l.hiddenUpdates, n = e[s], n === null ? e[s] = [
        t
      ] : n.push(t), t.lane = a | 536870912), l) : null;
    }
    function _i(e) {
      if (50 < Ps) throw Ps = 0, ko = null, Error(u(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var Qn = {};
    function R2(e, t, a, n) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Tt(e, t, a, n) {
      return new R2(e, t, a, n);
    }
    function fr(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function fa(e, t) {
      var a = e.alternate;
      return a === null ? (a = Tt(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
    }
    function ku(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function Di(e, t, a, n, s, l) {
      var o = 0;
      if (n = e, typeof e == "function") fr(e) && (o = 1);
      else if (typeof e == "string") o = Uh(e, a, ae.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case U:
          return e = Tt(31, a, t, s), e.elementType = U, e.lanes = l, e;
        case F:
          return pn(a.children, s, l, t);
        case V:
          o = 8, s |= 24;
          break;
        case ee:
          return e = Tt(12, a, t, s | 2), e.elementType = ee, e.lanes = l, e;
        case K:
          return e = Tt(13, a, t, s), e.elementType = K, e.lanes = l, e;
        case ne:
          return e = Tt(19, a, t, s), e.elementType = ne, e.lanes = l, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case le:
              o = 10;
              break e;
            case oe:
              o = 9;
              break e;
            case he:
              o = 11;
              break e;
            case z:
              o = 14;
              break e;
            case L:
              o = 16, n = null;
              break e;
          }
          o = 29, a = Error(u(130, e === null ? "null" : typeof e, "")), n = null;
      }
      return t = Tt(o, a, t, s), t.elementType = e, t.type = n, t.lanes = l, t;
    }
    function pn(e, t, a, n) {
      return e = Tt(7, e, n, t), e.lanes = a, e;
    }
    function mr(e, t, a) {
      return e = Tt(6, e, null, t), e.lanes = a, e;
    }
    function Su(e) {
      var t = Tt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function hr(e, t, a) {
      return t = Tt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var Cu = /* @__PURE__ */ new WeakMap();
    function Qt(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = Cu.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: ue(t)
        }, Cu.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: ue(t)
      };
    }
    var Xn = [], Vn = 0, Ui = null, Ts = 0, Xt = [], Vt = 0, _a2 = null, ta = 1, aa = "";
    function ma(e, t) {
      Xn[Vn++] = Ts, Xn[Vn++] = Ui, Ui = e, Ts = t;
    }
    function xu(e, t, a) {
      Xt[Vt++] = ta, Xt[Vt++] = aa, Xt[Vt++] = _a2, _a2 = e;
      var n = ta;
      e = aa;
      var s = 32 - Et(n) - 1;
      n &= ~(1 << s), a += 1;
      var l = 32 - Et(t) + s;
      if (30 < l) {
        var o = s - s % 5;
        l = (n & (1 << o) - 1).toString(32), n >>= o, s -= o, ta = 1 << 32 - Et(t) + s | a << s | n, aa = l + e;
      } else ta = 1 << l | a << s | n, aa = e;
    }
    function pr(e) {
      e.return !== null && (ma(e, 1), xu(e, 1, 0));
    }
    function gr(e) {
      for (; e === Ui; ) Ui = Xn[--Vn], Xn[Vn] = null, Ts = Xn[--Vn], Xn[Vn] = null;
      for (; e === _a2; ) _a2 = Xt[--Vt], Xt[Vt] = null, aa = Xt[--Vt], Xt[Vt] = null, ta = Xt[--Vt], Xt[Vt] = null;
    }
    function Mu(e, t) {
      Xt[Vt++] = ta, Xt[Vt++] = aa, Xt[Vt++] = _a2, ta = t.id, aa = t.overflow, _a2 = e;
    }
    var mt = null, Ze = null, Te = false, Da = null, Zt = false, yr = Error(u(519));
    function Ua(e) {
      var t = Error(u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw zs(Qt(t, e)), yr;
    }
    function ju(e) {
      var t = e.stateNode, a = e.type, n = e.memoizedProps;
      switch (t[ft] = e, t[kt] = n, a) {
        case "dialog":
          Ae("cancel", t), Ae("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Ae("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ti.length; a++) Ae(ti[a], t);
          break;
        case "source":
          Ae("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Ae("error", t), Ae("load", t);
          break;
        case "details":
          Ae("toggle", t);
          break;
        case "input":
          Ae("invalid", t), Bc(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
          break;
        case "select":
          Ae("invalid", t);
          break;
        case "textarea":
          Ae("invalid", t), Hc(t, n.value, n.defaultValue, n.children);
      }
      a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === true || Qf(t.textContent, a) ? (n.popover != null && (Ae("beforetoggle", t), Ae("toggle", t)), n.onScroll != null && Ae("scroll", t), n.onScrollEnd != null && Ae("scrollend", t), n.onClick != null && (t.onclick = ua), t = true) : t = false, t || Ua(e, true);
    }
    function Au(e) {
      for (mt = e.return; mt; ) switch (mt.tag) {
        case 5:
        case 31:
        case 13:
          Zt = false;
          return;
        case 27:
        case 3:
          Zt = true;
          return;
        default:
          mt = mt.return;
      }
    }
    function Zn(e) {
      if (e !== mt) return false;
      if (!Te) return Au(e), Te = true, false;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Uo(e.type, e.memoizedProps)), a = !a), a && Ze && Ua(e), Au(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
        Ze = Pf(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
        Ze = Pf(e);
      } else t === 27 ? (t = Ze, Fa(e.type) ? (e = Ho, Ho = null, Ze = e) : Ze = t) : Ze = mt ? Jt(e.stateNode.nextSibling) : null;
      return true;
    }
    function gn() {
      Ze = mt = null, Te = false;
    }
    function vr() {
      var e = Da;
      return e !== null && (jt === null ? jt = e : jt.push.apply(jt, e), Da = null), e;
    }
    function zs(e) {
      Da === null ? Da = [
        e
      ] : Da.push(e);
    }
    var br = v(null), yn = null, ha = null;
    function La(e, t, a) {
      $(br, t._currentValue), t._currentValue = a;
    }
    function pa(e) {
      e._currentValue = br.current, H(br);
    }
    function wr(e, t, a) {
      for (; e !== null; ) {
        var n = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a) break;
        e = e.return;
      }
    }
    function kr(e, t, a, n) {
      var s = e.child;
      for (s !== null && (s.return = e); s !== null; ) {
        var l = s.dependencies;
        if (l !== null) {
          var o = s.child;
          l = l.firstContext;
          e: for (; l !== null; ) {
            var d = l;
            l = s;
            for (var g = 0; g < t.length; g++) if (d.context === t[g]) {
              l.lanes |= a, d = l.alternate, d !== null && (d.lanes |= a), wr(l.return, a, e), n || (o = null);
              break e;
            }
            l = d.next;
          }
        } else if (s.tag === 18) {
          if (o = s.return, o === null) throw Error(u(341));
          o.lanes |= a, l = o.alternate, l !== null && (l.lanes |= a), wr(o, a, e), o = null;
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
            Rt(s.pendingProps.value, o.value) || (e !== null ? e.push(d) : e = [
              d
            ]);
          }
        } else if (s === Re.current) {
          if (o = s.alternate, o === null) throw Error(u(387));
          o.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(li) : e = [
            li
          ]);
        }
        s = s.return;
      }
      e !== null && kr(t, e, a, n), t.flags |= 262144;
    }
    function Li(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Rt(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function vn(e) {
      yn = e, ha = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function ht(e) {
      return Iu(yn, e);
    }
    function Oi(e, t) {
      return yn === null && vn(e), Iu(e, t);
    }
    function Iu(e, t) {
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
    function Sr() {
      return {
        controller: new T2(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function _s(e) {
      e.refCount--, e.refCount === 0 && z2(_2, function() {
        e.controller.abort();
      });
    }
    var Ds = null, Cr = 0, Jn = 0, Fn = null;
    function D2(e, t) {
      if (Ds === null) {
        var a = Ds = [];
        Cr = 0, Jn = Ao(), Fn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            a.push(n);
          }
        };
      }
      return Cr++, t.then(Nu, Nu), t;
    }
    function Nu() {
      if (--Cr === 0 && Ds !== null) {
        Fn !== null && (Fn.status = "fulfilled");
        var e = Ds;
        Ds = null, Jn = 0, Fn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function U2(e, t) {
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
    var Eu = w.S;
    w.S = function(e, t) {
      hf = X(), typeof t == "object" && t !== null && typeof t.then == "function" && D2(e, t), Eu !== null && Eu(e, t);
    };
    var bn = v(null);
    function xr() {
      var e = bn.current;
      return e !== null ? e : Qe.pooledCache;
    }
    function Bi(e, t) {
      t === null ? $(bn, bn.current) : $(bn, t.pool);
    }
    function Ru() {
      var e = xr();
      return e === null ? null : {
        parent: st._currentValue,
        pool: e
      };
    }
    var $n = Error(u(460)), Mr = Error(u(474)), qi = Error(u(542)), Hi = {
      then: function() {
      }
    };
    function Tu(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function zu(e, t, a) {
      switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ua, ua), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Du(e), e;
        default:
          if (typeof t.status == "string") t.then(ua, ua);
          else {
            if (e = Qe, e !== null && 100 < e.shellSuspendCounter) throw Error(u(482));
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
              throw e = t.reason, Du(e), e;
          }
          throw kn = t, $n;
      }
    }
    function wn(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (kn = a, $n) : a;
      }
    }
    var kn = null;
    function _u() {
      if (kn === null) throw Error(u(459));
      var e = kn;
      return kn = null, e;
    }
    function Du(e) {
      if (e === $n || e === qi) throw Error(u(483));
    }
    var Wn = null, Us = 0;
    function Gi(e) {
      var t = Us;
      return Us += 1, Wn === null && (Wn = []), zu(Wn, e, t);
    }
    function Ls(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Yi(e, t) {
      throw t.$$typeof === Q ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function Uu(e) {
      function t(S, b) {
        if (e) {
          var A = S.deletions;
          A === null ? (S.deletions = [
            b
          ], S.flags |= 16) : A.push(b);
        }
      }
      function a(S, b) {
        if (!e) return null;
        for (; b !== null; ) t(S, b), b = b.sibling;
        return null;
      }
      function n(S) {
        for (var b = /* @__PURE__ */ new Map(); S !== null; ) S.key !== null ? b.set(S.key, S) : b.set(S.index, S), S = S.sibling;
        return b;
      }
      function s(S, b) {
        return S = fa(S, b), S.index = 0, S.sibling = null, S;
      }
      function l(S, b, A) {
        return S.index = A, e ? (A = S.alternate, A !== null ? (A = A.index, A < b ? (S.flags |= 67108866, b) : A) : (S.flags |= 67108866, b)) : (S.flags |= 1048576, b);
      }
      function o(S) {
        return e && S.alternate === null && (S.flags |= 67108866), S;
      }
      function d(S, b, A, G) {
        return b === null || b.tag !== 6 ? (b = mr(A, S.mode, G), b.return = S, b) : (b = s(b, A), b.return = S, b);
      }
      function g(S, b, A, G) {
        var de = A.type;
        return de === F ? B(S, b, A.props.children, G, A.key) : b !== null && (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && wn(de) === b.type) ? (b = s(b, A.props), Ls(b, A), b.return = S, b) : (b = Di(A.type, A.key, A.props, null, S.mode, G), Ls(b, A), b.return = S, b);
      }
      function I(S, b, A, G) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== A.containerInfo || b.stateNode.implementation !== A.implementation ? (b = hr(A, S.mode, G), b.return = S, b) : (b = s(b, A.children || []), b.return = S, b);
      }
      function B(S, b, A, G, de) {
        return b === null || b.tag !== 7 ? (b = pn(A, S.mode, G, de), b.return = S, b) : (b = s(b, A), b.return = S, b);
      }
      function Y(S, b, A) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return b = mr("" + b, S.mode, A), b.return = S, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case q:
              return A = Di(b.type, b.key, b.props, null, S.mode, A), Ls(A, b), A.return = S, A;
            case p:
              return b = hr(b, S.mode, A), b.return = S, b;
            case L:
              return b = wn(b), Y(S, b, A);
          }
          if (at(b) || we(b)) return b = pn(b, S.mode, A, null), b.return = S, b;
          if (typeof b.then == "function") return Y(S, Gi(b), A);
          if (b.$$typeof === le) return Y(S, Oi(S, b), A);
          Yi(S, b);
        }
        return null;
      }
      function E(S, b, A, G) {
        var de = b !== null ? b.key : null;
        if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint") return de !== null ? null : d(S, b, "" + A, G);
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case q:
              return A.key === de ? g(S, b, A, G) : null;
            case p:
              return A.key === de ? I(S, b, A, G) : null;
            case L:
              return A = wn(A), E(S, b, A, G);
          }
          if (at(A) || we(A)) return de !== null ? null : B(S, b, A, G, null);
          if (typeof A.then == "function") return E(S, b, Gi(A), G);
          if (A.$$typeof === le) return E(S, b, Oi(S, A), G);
          Yi(S, A);
        }
        return null;
      }
      function _(S, b, A, G, de) {
        if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint") return S = S.get(A) || null, d(b, S, "" + G, de);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case q:
              return S = S.get(G.key === null ? A : G.key) || null, g(b, S, G, de);
            case p:
              return S = S.get(G.key === null ? A : G.key) || null, I(b, S, G, de);
            case L:
              return G = wn(G), _(S, b, A, G, de);
          }
          if (at(G) || we(G)) return S = S.get(A) || null, B(b, S, G, de, null);
          if (typeof G.then == "function") return _(S, b, A, Gi(G), de);
          if (G.$$typeof === le) return _(S, b, A, Oi(b, G), de);
          Yi(b, G);
        }
        return null;
      }
      function ie(S, b, A, G) {
        for (var de = null, _e = null, re = b, Ce = b = 0, Ne = null; re !== null && Ce < A.length; Ce++) {
          re.index > Ce ? (Ne = re, re = null) : Ne = re.sibling;
          var De = E(S, re, A[Ce], G);
          if (De === null) {
            re === null && (re = Ne);
            break;
          }
          e && re && De.alternate === null && t(S, re), b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De, re = Ne;
        }
        if (Ce === A.length) return a(S, re), Te && ma(S, Ce), de;
        if (re === null) {
          for (; Ce < A.length; Ce++) re = Y(S, A[Ce], G), re !== null && (b = l(re, b, Ce), _e === null ? de = re : _e.sibling = re, _e = re);
          return Te && ma(S, Ce), de;
        }
        for (re = n(re); Ce < A.length; Ce++) Ne = _(re, S, Ce, A[Ce], G), Ne !== null && (e && Ne.alternate !== null && re.delete(Ne.key === null ? Ce : Ne.key), b = l(Ne, b, Ce), _e === null ? de = Ne : _e.sibling = Ne, _e = Ne);
        return e && re.forEach(function(tn) {
          return t(S, tn);
        }), Te && ma(S, Ce), de;
      }
      function me(S, b, A, G) {
        if (A == null) throw Error(u(151));
        for (var de = null, _e = null, re = b, Ce = b = 0, Ne = null, De = A.next(); re !== null && !De.done; Ce++, De = A.next()) {
          re.index > Ce ? (Ne = re, re = null) : Ne = re.sibling;
          var tn = E(S, re, De.value, G);
          if (tn === null) {
            re === null && (re = Ne);
            break;
          }
          e && re && tn.alternate === null && t(S, re), b = l(tn, b, Ce), _e === null ? de = tn : _e.sibling = tn, _e = tn, re = Ne;
        }
        if (De.done) return a(S, re), Te && ma(S, Ce), de;
        if (re === null) {
          for (; !De.done; Ce++, De = A.next()) De = Y(S, De.value, G), De !== null && (b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De);
          return Te && ma(S, Ce), de;
        }
        for (re = n(re); !De.done; Ce++, De = A.next()) De = _(re, S, Ce, De.value, G), De !== null && (e && De.alternate !== null && re.delete(De.key === null ? Ce : De.key), b = l(De, b, Ce), _e === null ? de = De : _e.sibling = De, _e = De);
        return e && re.forEach(function(Zh) {
          return t(S, Zh);
        }), Te && ma(S, Ce), de;
      }
      function Ge(S, b, A, G) {
        if (typeof A == "object" && A !== null && A.type === F && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case q:
              e: {
                for (var de = A.key; b !== null; ) {
                  if (b.key === de) {
                    if (de = A.type, de === F) {
                      if (b.tag === 7) {
                        a(S, b.sibling), G = s(b, A.props.children), G.return = S, S = G;
                        break e;
                      }
                    } else if (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && wn(de) === b.type) {
                      a(S, b.sibling), G = s(b, A.props), Ls(G, A), G.return = S, S = G;
                      break e;
                    }
                    a(S, b);
                    break;
                  } else t(S, b);
                  b = b.sibling;
                }
                A.type === F ? (G = pn(A.props.children, S.mode, G, A.key), G.return = S, S = G) : (G = Di(A.type, A.key, A.props, null, S.mode, G), Ls(G, A), G.return = S, S = G);
              }
              return o(S);
            case p:
              e: {
                for (de = A.key; b !== null; ) {
                  if (b.key === de) if (b.tag === 4 && b.stateNode.containerInfo === A.containerInfo && b.stateNode.implementation === A.implementation) {
                    a(S, b.sibling), G = s(b, A.children || []), G.return = S, S = G;
                    break e;
                  } else {
                    a(S, b);
                    break;
                  }
                  else t(S, b);
                  b = b.sibling;
                }
                G = hr(A, S.mode, G), G.return = S, S = G;
              }
              return o(S);
            case L:
              return A = wn(A), Ge(S, b, A, G);
          }
          if (at(A)) return ie(S, b, A, G);
          if (we(A)) {
            if (de = we(A), typeof de != "function") throw Error(u(150));
            return A = de.call(A), me(S, b, A, G);
          }
          if (typeof A.then == "function") return Ge(S, b, Gi(A), G);
          if (A.$$typeof === le) return Ge(S, b, Oi(S, A), G);
          Yi(S, A);
        }
        return typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint" ? (A = "" + A, b !== null && b.tag === 6 ? (a(S, b.sibling), G = s(b, A), G.return = S, S = G) : (a(S, b), G = mr(A, S.mode, G), G.return = S, S = G), o(S)) : a(S, b);
      }
      return function(S, b, A, G) {
        try {
          Us = 0;
          var de = Ge(S, b, A, G);
          return Wn = null, de;
        } catch (re) {
          if (re === $n || re === qi) throw re;
          var _e = Tt(29, re, null, S.mode);
          return _e.lanes = G, _e.return = S, _e;
        } finally {
        }
      };
    }
    var Sn = Uu(true), Lu = Uu(false), Oa = false;
    function jr(e) {
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
    function Ar(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function Ba(e) {
      return {
        lane: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function qa(e, t, a) {
      var n = e.updateQueue;
      if (n === null) return null;
      if (n = n.shared, (Ue & 2) !== 0) {
        var s = n.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), n.pending = t, t = _i(e), wu(e, null, a), t;
      }
      return zi(e, n, t, a), _i(e);
    }
    function Os(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Ic(e, a);
      }
    }
    function Ir(e, t) {
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
    var Nr = false;
    function Bs() {
      if (Nr) {
        var e = Fn;
        if (e !== null) throw e;
      }
    }
    function qs(e, t, a, n) {
      Nr = false;
      var s = e.updateQueue;
      Oa = false;
      var l = s.firstBaseUpdate, o = s.lastBaseUpdate, d = s.shared.pending;
      if (d !== null) {
        s.shared.pending = null;
        var g = d, I = g.next;
        g.next = null, o === null ? l = I : o.next = I, o = g;
        var B = e.alternate;
        B !== null && (B = B.updateQueue, d = B.lastBaseUpdate, d !== o && (d === null ? B.firstBaseUpdate = I : d.next = I, B.lastBaseUpdate = g));
      }
      if (l !== null) {
        var Y = s.baseState;
        o = 0, B = I = g = null, d = l;
        do {
          var E = d.lane & -536870913, _ = E !== d.lane;
          if (_ ? (Ie & E) === E : (n & E) === E) {
            E !== 0 && E === Jn && (Nr = true), B !== null && (B = B.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            e: {
              var ie = e, me = d;
              E = t;
              var Ge = a;
              switch (me.tag) {
                case 1:
                  if (ie = me.payload, typeof ie == "function") {
                    Y = ie.call(Ge, Y, E);
                    break e;
                  }
                  Y = ie;
                  break e;
                case 3:
                  ie.flags = ie.flags & -65537 | 128;
                case 0:
                  if (ie = me.payload, E = typeof ie == "function" ? ie.call(Ge, Y, E) : ie, E == null) break e;
                  Y = D({}, Y, E);
                  break e;
                case 2:
                  Oa = true;
              }
            }
            E = d.callback, E !== null && (e.flags |= 64, _ && (e.flags |= 8192), _ = s.callbacks, _ === null ? s.callbacks = [
              E
            ] : _.push(E));
          } else _ = {
            lane: E,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, B === null ? (I = B = _, g = Y) : B = B.next = _, o |= E;
          if (d = d.next, d === null) {
            if (d = s.shared.pending, d === null) break;
            _ = d, d = _.next, _.next = null, s.lastBaseUpdate = _, s.shared.pending = null;
          }
        } while (true);
        B === null && (g = Y), s.baseState = g, s.firstBaseUpdate = I, s.lastBaseUpdate = B, l === null && (s.shared.lanes = 0), Xa |= o, e.lanes = o, e.memoizedState = Y;
      }
    }
    function Ou(e, t) {
      if (typeof e != "function") throw Error(u(191, e));
      e.call(t);
    }
    function Bu(e, t) {
      var a = e.callbacks;
      if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Ou(a[e], t);
    }
    var Pn = v(null), Qi = v(0);
    function qu(e, t) {
      e = xa, $(Qi, e), $(Pn, t), xa = e | t.baseLanes;
    }
    function Er() {
      $(Qi, xa), $(Pn, Pn.current);
    }
    function Rr() {
      xa = Qi.current, H(Pn), H(Qi);
    }
    var zt = v(null), Kt = null;
    function Ha(e) {
      var t = e.alternate;
      $(et, et.current & 1), $(zt, e), Kt === null && (t === null || Pn.current !== null || t.memoizedState !== null) && (Kt = e);
    }
    function Tr(e) {
      $(et, et.current), $(zt, e), Kt === null && (Kt = e);
    }
    function Hu(e) {
      e.tag === 22 ? ($(et, et.current), $(zt, e), Kt === null && (Kt = e)) : Ga();
    }
    function Ga() {
      $(et, et.current), $(zt, zt.current);
    }
    function _t(e) {
      H(zt), Kt === e && (Kt = null), H(et);
    }
    var et = v(0);
    function Xi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || Bo(a) || qo(a))) return t;
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
    var ga = 0, Se = null, qe = null, it = null, Vi = false, es = false, Cn = false, Zi = 0, Hs = 0, ts = null, L2 = 0;
    function $e() {
      throw Error(u(321));
    }
    function zr(e, t) {
      if (t === null) return false;
      for (var a = 0; a < t.length && a < e.length; a++) if (!Rt(e[a], t[a])) return false;
      return true;
    }
    function _r(e, t, a, n, s, l) {
      return ga = l, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? xd : Jr, Cn = false, l = a(n, s), Cn = false, es && (l = Yu(t, a, n, s)), Gu(e), l;
    }
    function Gu(e) {
      w.H = Qs;
      var t = qe !== null && qe.next !== null;
      if (ga = 0, it = qe = Se = null, Vi = false, Hs = 0, ts = null, t) throw Error(u(300));
      e === null || lt || (e = e.dependencies, e !== null && Li(e) && (lt = true));
    }
    function Yu(e, t, a, n) {
      Se = e;
      var s = 0;
      do {
        if (es && (ts = null), Hs = 0, es = false, 25 <= s) throw Error(u(301));
        if (s += 1, it = qe = null, e.updateQueue != null) {
          var l = e.updateQueue;
          l.lastEffect = null, l.events = null, l.stores = null, l.memoCache != null && (l.memoCache.index = 0);
        }
        w.H = Md, l = t(a, n);
      } while (es);
      return l;
    }
    function O2() {
      var e = w.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Gs(t) : t, e = e.useState()[0], (qe !== null ? qe.memoizedState : null) !== e && (Se.flags |= 1024), t;
    }
    function Dr() {
      var e = Zi !== 0;
      return Zi = 0, e;
    }
    function Ur(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
    }
    function Lr(e) {
      if (Vi) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Vi = false;
      }
      ga = 0, it = qe = Se = null, es = false, Hs = Zi = 0, ts = null;
    }
    function vt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return it === null ? Se.memoizedState = it = e : it = it.next = e, it;
    }
    function tt() {
      if (qe === null) {
        var e = Se.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = qe.next;
      var t = it === null ? Se.memoizedState : it.next;
      if (t !== null) it = t, qe = e;
      else {
        if (e === null) throw Se.alternate === null ? Error(u(467)) : Error(u(310));
        qe = e, e = {
          memoizedState: qe.memoizedState,
          baseState: qe.baseState,
          baseQueue: qe.baseQueue,
          queue: qe.queue,
          next: null
        }, it === null ? Se.memoizedState = it = e : it = it.next = e;
      }
      return it;
    }
    function Ki() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function Gs(e) {
      var t = Hs;
      return Hs += 1, ts === null && (ts = []), e = zu(ts, e, t), t = Se, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? xd : Jr), e;
    }
    function Ji(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Gs(e);
        if (e.$$typeof === le) return ht(e);
      }
      throw Error(u(438, String(e)));
    }
    function Or(e) {
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
      }), a === null && (a = Ki(), Se.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = J;
      return t.index++, a;
    }
    function ya(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Fi(e) {
      var t = tt();
      return Br(t, qe, e);
    }
    function Br(e, t, a) {
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
        var d = o = null, g = null, I = t, B = false;
        do {
          var Y = I.lane & -536870913;
          if (Y !== I.lane ? (Ie & Y) === Y : (ga & Y) === Y) {
            var E = I.revertLane;
            if (E === 0) g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }), Y === Jn && (B = true);
            else if ((ga & E) === E) {
              I = I.next, E === Jn && (B = true);
              continue;
            } else Y = {
              lane: 0,
              revertLane: I.revertLane,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }, g === null ? (d = g = Y, o = l) : g = g.next = Y, Se.lanes |= E, Xa |= E;
            Y = I.action, Cn && a(l, Y), l = I.hasEagerState ? I.eagerState : a(l, Y);
          } else E = {
            lane: Y,
            revertLane: I.revertLane,
            gesture: I.gesture,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          }, g === null ? (d = g = E, o = l) : g = g.next = E, Se.lanes |= Y, Xa |= Y;
          I = I.next;
        } while (I !== null && I !== t);
        if (g === null ? o = l : g.next = d, !Rt(l, e.memoizedState) && (lt = true, B && (a = Fn, a !== null))) throw a;
        e.memoizedState = l, e.baseState = o, e.baseQueue = g, n.lastRenderedState = l;
      }
      return s === null && (n.lanes = 0), [
        e.memoizedState,
        n.dispatch
      ];
    }
    function qr(e) {
      var t = tt(), a = t.queue;
      if (a === null) throw Error(u(311));
      a.lastRenderedReducer = e;
      var n = a.dispatch, s = a.pending, l = t.memoizedState;
      if (s !== null) {
        a.pending = null;
        var o = s = s.next;
        do
          l = e(l, o.action), o = o.next;
        while (o !== s);
        Rt(l, t.memoizedState) || (lt = true), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), a.lastRenderedState = l;
      }
      return [
        l,
        n
      ];
    }
    function Qu(e, t, a) {
      var n = Se, s = tt(), l = Te;
      if (l) {
        if (a === void 0) throw Error(u(407));
        a = a();
      } else a = t();
      var o = !Rt((qe || s).memoizedState, a);
      if (o && (s.memoizedState = a, lt = true), s = s.queue, Yr(Zu.bind(null, n, s, e), [
        e
      ]), s.getSnapshot !== t || o || it !== null && it.memoizedState.tag & 1) {
        if (n.flags |= 2048, as(9, {
          destroy: void 0
        }, Vu.bind(null, n, s, a, t), null), Qe === null) throw Error(u(349));
        l || (ga & 127) !== 0 || Xu(n, t, a);
      }
      return a;
    }
    function Xu(e, t, a) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: a
      }, t = Se.updateQueue, t === null ? (t = Ki(), Se.updateQueue = t, t.stores = [
        e
      ]) : (a = t.stores, a === null ? t.stores = [
        e
      ] : a.push(e));
    }
    function Vu(e, t, a, n) {
      t.value = a, t.getSnapshot = n, Ku(t) && Ju(e);
    }
    function Zu(e, t, a) {
      return a(function() {
        Ku(t) && Ju(e);
      });
    }
    function Ku(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !Rt(e, a);
      } catch {
        return true;
      }
    }
    function Ju(e) {
      var t = hn(e, 2);
      t !== null && At(t, e, 2);
    }
    function Hr(e) {
      var t = vt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Cn) {
          Ra(true);
          try {
            a();
          } finally {
            Ra(false);
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
    function Fu(e, t, a, n) {
      return e.baseState = a, Br(e, qe, typeof n == "function" ? n : ya);
    }
    function B2(e, t, a, n, s) {
      if (Pi(e)) throw Error(u(485));
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
        w.T !== null ? a(true) : l.isTransition = false, n(l), a = t.pending, a === null ? (l.next = t.pending = l, $u(t, l)) : (l.next = a.next, t.pending = a.next = l);
      }
    }
    function $u(e, t) {
      var a = t.action, n = t.payload, s = e.state;
      if (t.isTransition) {
        var l = w.T, o = {};
        w.T = o;
        try {
          var d = a(s, n), g = w.S;
          g !== null && g(o, d), Wu(e, t, d);
        } catch (I) {
          Gr(e, t, I);
        } finally {
          l !== null && o.types !== null && (l.types = o.types), w.T = l;
        }
      } else try {
        l = a(s, n), Wu(e, t, l);
      } catch (I) {
        Gr(e, t, I);
      }
    }
    function Wu(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
        Pu(e, t, n);
      }, function(n) {
        return Gr(e, t, n);
      }) : Pu(e, t, a);
    }
    function Pu(e, t, a) {
      t.status = "fulfilled", t.value = a, ed(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, $u(e, a)));
    }
    function Gr(e, t, a) {
      var n = e.pending;
      if (e.pending = null, n !== null) {
        n = n.next;
        do
          t.status = "rejected", t.reason = a, ed(t), t = t.next;
        while (t !== n);
      }
      e.action = null;
    }
    function ed(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function td(e, t) {
      return t;
    }
    function ad(e, t) {
      if (Te) {
        var a = Qe.formState;
        if (a !== null) {
          e: {
            var n = Se;
            if (Te) {
              if (Ze) {
                t: {
                  for (var s = Ze, l = Zt; s.nodeType !== 8; ) {
                    if (!l) {
                      s = null;
                      break t;
                    }
                    if (s = Jt(s.nextSibling), s === null) {
                      s = null;
                      break t;
                    }
                  }
                  l = s.data, s = l === "F!" || l === "F" ? s : null;
                }
                if (s) {
                  Ze = Jt(s.nextSibling), n = s.data === "F!";
                  break e;
                }
              }
              Ua(n);
            }
            n = false;
          }
          n && (t = a[0]);
        }
      }
      return a = vt(), a.memoizedState = a.baseState = t, n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: td,
        lastRenderedState: t
      }, a.queue = n, a = kd.bind(null, Se, n), n.dispatch = a, n = Hr(false), l = Kr.bind(null, Se, false, n.queue), n = vt(), s = {
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
    function nd(e) {
      var t = tt();
      return sd(t, qe, e);
    }
    function sd(e, t, a) {
      if (t = Br(e, t, td)[0], e = Fi(ya)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var n = Gs(t);
      } catch (o) {
        throw o === $n ? qi : o;
      }
      else n = t;
      t = tt();
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
    function id(e) {
      var t = tt(), a = qe;
      if (a !== null) return sd(t, a, e);
      tt(), t = t.memoizedState, a = tt();
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
      }, t = Se.updateQueue, t === null && (t = Ki(), Se.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e;
    }
    function ld() {
      return tt().memoizedState;
    }
    function $i(e, t, a, n) {
      var s = vt();
      Se.flags |= e, s.memoizedState = as(1 | t, {
        destroy: void 0
      }, a, n === void 0 ? null : n);
    }
    function Wi(e, t, a, n) {
      var s = tt();
      n = n === void 0 ? null : n;
      var l = s.memoizedState.inst;
      qe !== null && n !== null && zr(n, qe.memoizedState.deps) ? s.memoizedState = as(t, l, a, n) : (Se.flags |= e, s.memoizedState = as(1 | t, l, a, n));
    }
    function rd(e, t) {
      $i(8390656, 8, e, t);
    }
    function Yr(e, t) {
      Wi(2048, 8, e, t);
    }
    function H2(e) {
      Se.flags |= 4;
      var t = Se.updateQueue;
      if (t === null) t = Ki(), Se.updateQueue = t, t.events = [
        e
      ];
      else {
        var a = t.events;
        a === null ? t.events = [
          e
        ] : a.push(e);
      }
    }
    function od(e) {
      var t = tt().memoizedState;
      return H2({
        ref: t,
        nextImpl: e
      }), function() {
        if ((Ue & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function cd(e, t) {
      return Wi(4, 2, e, t);
    }
    function ud(e, t) {
      return Wi(4, 4, e, t);
    }
    function dd(e, t) {
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
    function fd(e, t, a) {
      a = a != null ? a.concat([
        e
      ]) : null, Wi(4, 4, dd.bind(null, t, e), a);
    }
    function Qr() {
    }
    function md(e, t) {
      var a = tt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      return t !== null && zr(t, n[1]) ? n[0] : (a.memoizedState = [
        e,
        t
      ], e);
    }
    function hd(e, t) {
      var a = tt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      if (t !== null && zr(t, n[1])) return n[0];
      if (n = e(), Cn) {
        Ra(true);
        try {
          e();
        } finally {
          Ra(false);
        }
      }
      return a.memoizedState = [
        n,
        t
      ], n;
    }
    function Xr(e, t, a) {
      return a === void 0 || (ga & 1073741824) !== 0 && (Ie & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = gf(), Se.lanes |= e, Xa |= e, a);
    }
    function pd(e, t, a, n) {
      return Rt(a, t) ? a : Pn.current !== null ? (e = Xr(e, a, n), Rt(e, t) || (lt = true), e) : (ga & 42) === 0 || (ga & 1073741824) !== 0 && (Ie & 261930) === 0 ? (lt = true, e.memoizedState = a) : (e = gf(), Se.lanes |= e, Xa |= e, t);
    }
    function gd(e, t, a, n, s) {
      var l = R.p;
      R.p = l !== 0 && 8 > l ? l : 8;
      var o = w.T, d = {};
      w.T = d, Kr(e, false, t, a);
      try {
        var g = s(), I = w.S;
        if (I !== null && I(d, g), g !== null && typeof g == "object" && typeof g.then == "function") {
          var B = U2(g, n);
          Ys(e, t, B, Lt(e));
        } else Ys(e, t, n, Lt(e));
      } catch (Y) {
        Ys(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Y
        }, Lt());
      } finally {
        R.p = l, o !== null && d.types !== null && (o.types = d.types), w.T = o;
      }
    }
    function G2() {
    }
    function Vr(e, t, a, n) {
      if (e.tag !== 5) throw Error(u(476));
      var s = yd(e).queue;
      gd(e, s, t, W, a === null ? G2 : function() {
        return vd(e), a(n);
      });
    }
    function yd(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: W,
        baseState: W,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ya,
          lastRenderedState: W
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
    function vd(e) {
      var t = yd(e);
      t.next === null && (t = e.alternate.memoizedState), Ys(e, t.next.queue, {}, Lt());
    }
    function Zr() {
      return ht(li);
    }
    function bd() {
      return tt().memoizedState;
    }
    function wd() {
      return tt().memoizedState;
    }
    function Y2(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = Lt();
            e = Ba(a);
            var n = qa(t, e, a);
            n !== null && (At(n, t, a), Os(n, t, a)), t = {
              cache: Sr()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function Q2(e, t, a) {
      var n = Lt();
      a = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Pi(e) ? Sd(t, a) : (a = dr(e, t, a, n), a !== null && (At(a, e, n), Cd(a, t, n)));
    }
    function kd(e, t, a) {
      var n = Lt();
      Ys(e, t, a, n);
    }
    function Ys(e, t, a, n) {
      var s = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (Pi(e)) Sd(t, s);
      else {
        var l = e.alternate;
        if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
          var o = t.lastRenderedState, d = l(o, a);
          if (s.hasEagerState = true, s.eagerState = d, Rt(d, o)) return zi(e, t, s, 0), Qe === null && Ti(), false;
        } catch {
        } finally {
        }
        if (a = dr(e, t, s, n), a !== null) return At(a, e, n), Cd(a, t, n), true;
      }
      return false;
    }
    function Kr(e, t, a, n) {
      if (n = {
        lane: 2,
        revertLane: Ao(),
        gesture: null,
        action: n,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Pi(e)) {
        if (t) throw Error(u(479));
      } else t = dr(e, a, n, 2), t !== null && At(t, e, 2);
    }
    function Pi(e) {
      var t = e.alternate;
      return e === Se || t !== null && t === Se;
    }
    function Sd(e, t) {
      es = Vi = true;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Cd(e, t, a) {
      if ((a & 4194048) !== 0) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Ic(e, a);
      }
    }
    var Qs = {
      readContext: ht,
      use: Ji,
      useCallback: $e,
      useContext: $e,
      useEffect: $e,
      useImperativeHandle: $e,
      useLayoutEffect: $e,
      useInsertionEffect: $e,
      useMemo: $e,
      useReducer: $e,
      useRef: $e,
      useState: $e,
      useDebugValue: $e,
      useDeferredValue: $e,
      useTransition: $e,
      useSyncExternalStore: $e,
      useId: $e,
      useHostTransitionStatus: $e,
      useFormState: $e,
      useActionState: $e,
      useOptimistic: $e,
      useMemoCache: $e,
      useCacheRefresh: $e
    };
    Qs.useEffectEvent = $e;
    var xd = {
      readContext: ht,
      use: Ji,
      useCallback: function(e, t) {
        return vt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: ht,
      useEffect: rd,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([
          e
        ]) : null, $i(4194308, 4, dd.bind(null, t, e), a);
      },
      useLayoutEffect: function(e, t) {
        return $i(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        $i(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var a = vt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Cn) {
          Ra(true);
          try {
            e();
          } finally {
            Ra(false);
          }
        }
        return a.memoizedState = [
          n,
          t
        ], n;
      },
      useReducer: function(e, t, a) {
        var n = vt();
        if (a !== void 0) {
          var s = a(t);
          if (Cn) {
            Ra(true);
            try {
              a(t);
            } finally {
              Ra(false);
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
        var t = vt();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: function(e) {
        e = Hr(e);
        var t = e.queue, a = kd.bind(null, Se, t);
        return t.dispatch = a, [
          e.memoizedState,
          a
        ];
      },
      useDebugValue: Qr,
      useDeferredValue: function(e, t) {
        var a = vt();
        return Xr(a, e, t);
      },
      useTransition: function() {
        var e = Hr(false);
        return e = gd.bind(null, Se, e.queue, true, false), vt().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, a) {
        var n = Se, s = vt();
        if (Te) {
          if (a === void 0) throw Error(u(407));
          a = a();
        } else {
          if (a = t(), Qe === null) throw Error(u(349));
          (Ie & 127) !== 0 || Xu(n, t, a);
        }
        s.memoizedState = a;
        var l = {
          value: a,
          getSnapshot: t
        };
        return s.queue = l, rd(Zu.bind(null, n, l, e), [
          e
        ]), n.flags |= 2048, as(9, {
          destroy: void 0
        }, Vu.bind(null, n, l, a, t), null), a;
      },
      useId: function() {
        var e = vt(), t = Qe.identifierPrefix;
        if (Te) {
          var a = aa, n = ta;
          a = (n & ~(1 << 32 - Et(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Zi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
        } else a = L2++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Zr,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function(e) {
        var t = vt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = a, t = Kr.bind(null, Se, true, a), a.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: Or,
      useCacheRefresh: function() {
        return vt().memoizedState = Y2.bind(null, Se);
      },
      useEffectEvent: function(e) {
        var t = vt(), a = {
          impl: e
        };
        return t.memoizedState = a, function() {
          if ((Ue & 2) !== 0) throw Error(u(440));
          return a.impl.apply(void 0, arguments);
        };
      }
    }, Jr = {
      readContext: ht,
      use: Ji,
      useCallback: md,
      useContext: ht,
      useEffect: Yr,
      useImperativeHandle: fd,
      useInsertionEffect: cd,
      useLayoutEffect: ud,
      useMemo: hd,
      useReducer: Fi,
      useRef: ld,
      useState: function() {
        return Fi(ya);
      },
      useDebugValue: Qr,
      useDeferredValue: function(e, t) {
        var a = tt();
        return pd(a, qe.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Fi(ya)[0], t = tt().memoizedState;
        return [
          typeof e == "boolean" ? e : Gs(e),
          t
        ];
      },
      useSyncExternalStore: Qu,
      useId: bd,
      useHostTransitionStatus: Zr,
      useFormState: nd,
      useActionState: nd,
      useOptimistic: function(e, t) {
        var a = tt();
        return Fu(a, qe, e, t);
      },
      useMemoCache: Or,
      useCacheRefresh: wd
    };
    Jr.useEffectEvent = od;
    var Md = {
      readContext: ht,
      use: Ji,
      useCallback: md,
      useContext: ht,
      useEffect: Yr,
      useImperativeHandle: fd,
      useInsertionEffect: cd,
      useLayoutEffect: ud,
      useMemo: hd,
      useReducer: qr,
      useRef: ld,
      useState: function() {
        return qr(ya);
      },
      useDebugValue: Qr,
      useDeferredValue: function(e, t) {
        var a = tt();
        return qe === null ? Xr(a, e, t) : pd(a, qe.memoizedState, e, t);
      },
      useTransition: function() {
        var e = qr(ya)[0], t = tt().memoizedState;
        return [
          typeof e == "boolean" ? e : Gs(e),
          t
        ];
      },
      useSyncExternalStore: Qu,
      useId: bd,
      useHostTransitionStatus: Zr,
      useFormState: id,
      useActionState: id,
      useOptimistic: function(e, t) {
        var a = tt();
        return qe !== null ? Fu(a, qe, e, t) : (a.baseState = e, [
          e,
          a.queue.dispatch
        ]);
      },
      useMemoCache: Or,
      useCacheRefresh: wd
    };
    Md.useEffectEvent = od;
    function Fr(e, t, a, n) {
      t = e.memoizedState, a = a(n, t), a = a == null ? t : D({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
    }
    var $r = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var n = Lt(), s = Ba(n);
        s.payload = t, a != null && (s.callback = a), t = qa(e, s, n), t !== null && (At(t, e, n), Os(t, e, n));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var n = Lt(), s = Ba(n);
        s.tag = 1, s.payload = t, a != null && (s.callback = a), t = qa(e, s, n), t !== null && (At(t, e, n), Os(t, e, n));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Lt(), n = Ba(a);
        n.tag = 2, t != null && (n.callback = t), t = qa(e, n, a), t !== null && (At(t, e, a), Os(t, e, a));
      }
    };
    function jd(e, t, a, n, s, l, o) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, l, o) : t.prototype && t.prototype.isPureReactComponent ? !Es(a, n) || !Es(s, l) : true;
    }
    function Ad(e, t, a, n) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && $r.enqueueReplaceState(t, t.state, null);
    }
    function xn(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var n in t) n !== "ref" && (a[n] = t[n]);
      }
      if (e = e.defaultProps) {
        a === t && (a = D({}, a));
        for (var s in e) a[s] === void 0 && (a[s] = e[s]);
      }
      return a;
    }
    function Id(e) {
      Ri(e);
    }
    function Nd(e) {
      console.error(e);
    }
    function Ed(e) {
      Ri(e);
    }
    function el(e, t) {
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
    function Rd(e, t, a) {
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
    function Wr(e, t, a) {
      return a = Ba(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        el(e, t);
      }, a;
    }
    function Td(e) {
      return e = Ba(e), e.tag = 3, e;
    }
    function zd(e, t, a, n) {
      var s = a.type.getDerivedStateFromError;
      if (typeof s == "function") {
        var l = n.value;
        e.payload = function() {
          return s(l);
        }, e.callback = function() {
          Rd(t, a, n);
        };
      }
      var o = a.stateNode;
      o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
        Rd(t, a, n), typeof s != "function" && (Va === null ? Va = /* @__PURE__ */ new Set([
          this
        ]) : Va.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function X2(e, t, a, n, s) {
      if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (t = a.alternate, t !== null && Kn(t, a, s, true), a = zt.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return Kt === null ? fl() : a.alternate === null && We === 0 && (We = 3), a.flags &= -257, a.flags |= 65536, a.lanes = s, n === Hi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([
                n
              ]) : t.add(n), xo(e, n, s)), false;
            case 22:
              return a.flags |= 65536, n === Hi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  n
                ])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([
                n
              ]) : a.add(n)), xo(e, n, s)), false;
          }
          throw Error(u(435, a.tag));
        }
        return xo(e, n, s), fl(), false;
      }
      if (Te) return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, n !== yr && (e = Error(u(422), {
        cause: n
      }), zs(Qt(e, a)))) : (n !== yr && (t = Error(u(423), {
        cause: n
      }), zs(Qt(t, a))), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, n = Qt(n, a), s = Wr(e.stateNode, n, s), Ir(e, s), We !== 4 && (We = 2)), false;
      var l = Error(u(520), {
        cause: n
      });
      if (l = Qt(l, a), Ws === null ? Ws = [
        l
      ] : Ws.push(l), We !== 4 && (We = 2), t === null) return true;
      n = Qt(n, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = s & -s, a.lanes |= e, e = Wr(a.stateNode, n, e), Ir(a, e), false;
          case 1:
            if (t = a.type, l = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || l !== null && typeof l.componentDidCatch == "function" && (Va === null || !Va.has(l)))) return a.flags |= 65536, s &= -s, a.lanes |= s, s = Td(s), zd(s, e, a, n), Ir(a, s), false;
        }
        a = a.return;
      } while (a !== null);
      return false;
    }
    var Pr = Error(u(461)), lt = false;
    function pt(e, t, a, n) {
      t.child = e === null ? Lu(t, null, a, n) : Sn(t, e.child, a, n);
    }
    function _d(e, t, a, n, s) {
      a = a.render;
      var l = t.ref;
      if ("ref" in n) {
        var o = {};
        for (var d in n) d !== "ref" && (o[d] = n[d]);
      } else o = n;
      return vn(t), n = _r(e, t, a, o, l, s), d = Dr(), e !== null && !lt ? (Ur(e, t, s), va(e, t, s)) : (Te && d && pr(t), t.flags |= 1, pt(e, t, n, s), t.child);
    }
    function Dd(e, t, a, n, s) {
      if (e === null) {
        var l = a.type;
        return typeof l == "function" && !fr(l) && l.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = l, Ud(e, t, l, n, s)) : (e = Di(a.type, null, n, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (l = e.child, !ro(e, s)) {
        var o = l.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Es, a(o, n) && e.ref === t.ref) return va(e, t, s);
      }
      return t.flags |= 1, e = fa(l, n), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Ud(e, t, a, n, s) {
      if (e !== null) {
        var l = e.memoizedProps;
        if (Es(l, n) && e.ref === t.ref) if (lt = false, t.pendingProps = n = l, ro(e, s)) (e.flags & 131072) !== 0 && (lt = true);
        else return t.lanes = e.lanes, va(e, t, s);
      }
      return eo(e, t, a, n, s);
    }
    function Ld(e, t, a, n) {
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
          return Od(e, t, l, a, n);
        }
        if ((a & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && Bi(t, l !== null ? l.cachePool : null), l !== null ? qu(t, l) : Er(), Hu(t);
        else return n = t.lanes = 536870912, Od(e, t, l !== null ? l.baseLanes | a : a, a, n);
      } else l !== null ? (Bi(t, l.cachePool), qu(t, l), Ga(), t.memoizedState = null) : (e !== null && Bi(t, null), Er(), Ga());
      return pt(e, t, s, a), t.child;
    }
    function Xs(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function Od(e, t, a, n, s) {
      var l = xr();
      return l = l === null ? null : {
        parent: st._currentValue,
        pool: l
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: l
      }, e !== null && Bi(t, null), Er(), Hu(t), e !== null && Kn(e, t, n, true), t.childLanes = s, null;
    }
    function tl(e, t) {
      return t = nl({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Bd(e, t, a) {
      return Sn(t, e.child, null, a), e = tl(t, t.pendingProps), e.flags |= 2, _t(t), t.memoizedState = null, e;
    }
    function V2(e, t, a) {
      var n = t.pendingProps, s = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (Te) {
          if (n.mode === "hidden") return e = tl(t, n), t.lanes = 536870912, Xs(null, e);
          if (Tr(t), (e = Ze) ? (e = Wf(e, Zt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: _a2 !== null ? {
              id: ta,
              overflow: aa
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = Su(e), a.return = t, t.child = a, mt = t, Ze = null)) : e = null, e === null) throw Ua(t);
          return t.lanes = 536870912, null;
        }
        return tl(t, n);
      }
      var l = e.memoizedState;
      if (l !== null) {
        var o = l.dehydrated;
        if (Tr(t), s) if (t.flags & 256) t.flags &= -257, t = Bd(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
        else if (lt || Kn(e, t, a, false), s = (a & e.childLanes) !== 0, lt || s) {
          if (n = Qe, n !== null && (o = Nc(n, a), o !== 0 && o !== l.retryLane)) throw l.retryLane = o, hn(e, o), At(n, e, o), Pr;
          fl(), t = Bd(e, t, a);
        } else e = l.treeContext, Ze = Jt(o.nextSibling), mt = t, Te = true, Da = null, Zt = false, e !== null && Mu(t, e), t = tl(t, n), t.flags |= 4096;
        return t;
      }
      return e = fa(e.child, {
        mode: n.mode,
        children: n.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function al(e, t) {
      var a = t.ref;
      if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object") throw Error(u(284));
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function eo(e, t, a, n, s) {
      return vn(t), a = _r(e, t, a, n, void 0, s), n = Dr(), e !== null && !lt ? (Ur(e, t, s), va(e, t, s)) : (Te && n && pr(t), t.flags |= 1, pt(e, t, a, s), t.child);
    }
    function qd(e, t, a, n, s, l) {
      return vn(t), t.updateQueue = null, a = Yu(t, n, a, s), Gu(e), n = Dr(), e !== null && !lt ? (Ur(e, t, l), va(e, t, l)) : (Te && n && pr(t), t.flags |= 1, pt(e, t, a, l), t.child);
    }
    function Hd(e, t, a, n, s) {
      if (vn(t), t.stateNode === null) {
        var l = Qn, o = a.contextType;
        typeof o == "object" && o !== null && (l = ht(o)), l = new a(n, l), t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, l.updater = $r, t.stateNode = l, l._reactInternals = t, l = t.stateNode, l.props = n, l.state = t.memoizedState, l.refs = {}, jr(t), o = a.contextType, l.context = typeof o == "object" && o !== null ? ht(o) : Qn, l.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o == "function" && (Fr(t, a, o, n), l.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (o = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), o !== l.state && $r.enqueueReplaceState(l, l.state, null), qs(t, n, l, s), Bs(), l.state = t.memoizedState), typeof l.componentDidMount == "function" && (t.flags |= 4194308), n = true;
      } else if (e === null) {
        l = t.stateNode;
        var d = t.memoizedProps, g = xn(a, d);
        l.props = g;
        var I = l.context, B = a.contextType;
        o = Qn, typeof B == "object" && B !== null && (o = ht(B));
        var Y = a.getDerivedStateFromProps;
        B = typeof Y == "function" || typeof l.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, B || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (d || I !== o) && Ad(t, l, n, o), Oa = false;
        var E = t.memoizedState;
        l.state = E, qs(t, n, l, s), Bs(), I = t.memoizedState, d || E !== I || Oa ? (typeof Y == "function" && (Fr(t, a, Y, n), I = t.memoizedState), (g = Oa || jd(t, a, g, n, E, I, o)) ? (B || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = I), l.props = n, l.state = I, l.context = o, n = g) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), n = false);
      } else {
        l = t.stateNode, Ar(e, t), o = t.memoizedProps, B = xn(a, o), l.props = B, Y = t.pendingProps, E = l.context, I = a.contextType, g = Qn, typeof I == "object" && I !== null && (g = ht(I)), d = a.getDerivedStateFromProps, (I = typeof d == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (o !== Y || E !== g) && Ad(t, l, n, g), Oa = false, E = t.memoizedState, l.state = E, qs(t, n, l, s), Bs();
        var _ = t.memoizedState;
        o !== Y || E !== _ || Oa || e !== null && e.dependencies !== null && Li(e.dependencies) ? (typeof d == "function" && (Fr(t, a, d, n), _ = t.memoizedState), (B = Oa || jd(t, a, B, n, E, _, g) || e !== null && e.dependencies !== null && Li(e.dependencies)) ? (I || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(n, _, g), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(n, _, g)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || o === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = _), l.props = n, l.state = _, l.context = g, n = B) : (typeof l.componentDidUpdate != "function" || o === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), n = false);
      }
      return l = n, al(e, t), n = (t.flags & 128) !== 0, l || n ? (l = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : l.render(), t.flags |= 1, e !== null && n ? (t.child = Sn(t, e.child, null, s), t.child = Sn(t, null, a, s)) : pt(e, t, a, s), t.memoizedState = l.state, e = t.child) : e = va(e, t, s), e;
    }
    function Gd(e, t, a, n) {
      return gn(), t.flags |= 256, pt(e, t, a, n), t.child;
    }
    var to = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function ao(e) {
      return {
        baseLanes: e,
        cachePool: Ru()
      };
    }
    function no(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ut), e;
    }
    function Yd(e, t, a) {
      var n = t.pendingProps, s = false, l = (t.flags & 128) !== 0, o;
      if ((o = l) || (o = e !== null && e.memoizedState === null ? false : (et.current & 2) !== 0), o && (s = true, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Te) {
          if (s ? Ha(t) : Ga(), (e = Ze) ? (e = Wf(e, Zt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: _a2 !== null ? {
              id: ta,
              overflow: aa
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = Su(e), a.return = t, t.child = a, mt = t, Ze = null)) : e = null, e === null) throw Ua(t);
          return qo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var d = n.children;
        return n = n.fallback, s ? (Ga(), s = t.mode, d = nl({
          mode: "hidden",
          children: d
        }, s), n = pn(n, s, a, null), d.return = t, n.return = t, d.sibling = n, t.child = d, n = t.child, n.memoizedState = ao(a), n.childLanes = no(e, o, a), t.memoizedState = to, Xs(null, n)) : (Ha(t), so(t, d));
      }
      var g = e.memoizedState;
      if (g !== null && (d = g.dehydrated, d !== null)) {
        if (l) t.flags & 256 ? (Ha(t), t.flags &= -257, t = io(e, t, a)) : t.memoizedState !== null ? (Ga(), t.child = e.child, t.flags |= 128, t = null) : (Ga(), d = n.fallback, s = t.mode, n = nl({
          mode: "visible",
          children: n.children
        }, s), d = pn(d, s, a, null), d.flags |= 2, n.return = t, d.return = t, n.sibling = d, t.child = n, Sn(t, e.child, null, a), n = t.child, n.memoizedState = ao(a), n.childLanes = no(e, o, a), t.memoizedState = to, t = Xs(null, n));
        else if (Ha(t), qo(d)) {
          if (o = d.nextSibling && d.nextSibling.dataset, o) var I = o.dgst;
          o = I, n = Error(u(419)), n.stack = "", n.digest = o, zs({
            value: n,
            source: null,
            stack: null
          }), t = io(e, t, a);
        } else if (lt || Kn(e, t, a, false), o = (a & e.childLanes) !== 0, lt || o) {
          if (o = Qe, o !== null && (n = Nc(o, a), n !== 0 && n !== g.retryLane)) throw g.retryLane = n, hn(e, n), At(o, e, n), Pr;
          Bo(d) || fl(), t = io(e, t, a);
        } else Bo(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, Ze = Jt(d.nextSibling), mt = t, Te = true, Da = null, Zt = false, e !== null && Mu(t, e), t = so(t, n.children), t.flags |= 4096);
        return t;
      }
      return s ? (Ga(), d = n.fallback, s = t.mode, g = e.child, I = g.sibling, n = fa(g, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = g.subtreeFlags & 65011712, I !== null ? d = fa(I, d) : (d = pn(d, s, a, null), d.flags |= 2), d.return = t, n.return = t, n.sibling = d, t.child = n, Xs(null, n), n = t.child, d = e.child.memoizedState, d === null ? d = ao(a) : (s = d.cachePool, s !== null ? (g = st._currentValue, s = s.parent !== g ? {
        parent: g,
        pool: g
      } : s) : s = Ru(), d = {
        baseLanes: d.baseLanes | a,
        cachePool: s
      }), n.memoizedState = d, n.childLanes = no(e, o, a), t.memoizedState = to, Xs(e.child, n)) : (Ha(t), a = e.child, e = a.sibling, a = fa(a, {
        mode: "visible",
        children: n.children
      }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [
        e
      ], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function so(e, t) {
      return t = nl({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function nl(e, t) {
      return e = Tt(22, e, null, t), e.lanes = 0, e;
    }
    function io(e, t, a) {
      return Sn(t, e.child, null, a), e = so(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Qd(e, t, a) {
      e.lanes |= t;
      var n = e.alternate;
      n !== null && (n.lanes |= t), wr(e.return, t, a);
    }
    function lo(e, t, a, n, s, l) {
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
    function Xd(e, t, a) {
      var n = t.pendingProps, s = n.revealOrder, l = n.tail;
      n = n.children;
      var o = et.current, d = (o & 2) !== 0;
      if (d ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, $(et, o), pt(e, t, n, a), n = Te ? Ts : 0, !d && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Qd(e, a, t);
        else if (e.tag === 19) Qd(e, a, t);
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
          for (a = t.child, s = null; a !== null; ) e = a.alternate, e !== null && Xi(e) === null && (s = a), a = a.sibling;
          a = s, a === null ? (s = t.child, t.child = null) : (s = a.sibling, a.sibling = null), lo(t, false, s, a, l, n);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, s = t.child, t.child = null; s !== null; ) {
            if (e = s.alternate, e !== null && Xi(e) === null) {
              t.child = s;
              break;
            }
            e = s.sibling, s.sibling = a, a = s, s = e;
          }
          lo(t, true, a, null, l, n);
          break;
        case "together":
          lo(t, false, null, null, void 0, n);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function va(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Xa |= t.lanes, (a & t.childLanes) === 0) if (e !== null) {
        if (Kn(e, t, a, false), (a & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(u(153));
      if (t.child !== null) {
        for (e = t.child, a = fa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; ) e = e.sibling, a = a.sibling = fa(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function ro(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Li(e)));
    }
    function Z2(e, t, a) {
      switch (t.tag) {
        case 3:
          ot(t, t.stateNode.containerInfo), La(t, st, e.memoizedState.cache), gn();
          break;
        case 27:
        case 5:
          wt(t);
          break;
        case 4:
          ot(t, t.stateNode.containerInfo);
          break;
        case 10:
          La(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, Tr(t), null;
          break;
        case 13:
          var n = t.memoizedState;
          if (n !== null) return n.dehydrated !== null ? (Ha(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Yd(e, t, a) : (Ha(t), e = va(e, t, a), e !== null ? e.sibling : null);
          Ha(t);
          break;
        case 19:
          var s = (e.flags & 128) !== 0;
          if (n = (a & t.childLanes) !== 0, n || (Kn(e, t, a, false), n = (a & t.childLanes) !== 0), s) {
            if (n) return Xd(e, t, a);
            t.flags |= 128;
          }
          if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), $(et, et.current), n) break;
          return null;
        case 22:
          return t.lanes = 0, Ld(e, t, a, t.pendingProps);
        case 24:
          La(t, st, e.memoizedState.cache);
      }
      return va(e, t, a);
    }
    function Vd(e, t, a) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) lt = true;
      else {
        if (!ro(e, a) && (t.flags & 128) === 0) return lt = false, Z2(e, t, a);
        lt = (e.flags & 131072) !== 0;
      }
      else lt = false, Te && (t.flags & 1048576) !== 0 && xu(t, Ts, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var n = t.pendingProps;
            if (e = wn(t.elementType), t.type = e, typeof e == "function") fr(e) ? (n = xn(e, n), t.tag = 1, t = Hd(null, t, e, n, a)) : (t.tag = 0, t = eo(null, t, e, n, a));
            else {
              if (e != null) {
                var s = e.$$typeof;
                if (s === he) {
                  t.tag = 11, t = _d(null, t, e, n, a);
                  break e;
                } else if (s === z) {
                  t.tag = 14, t = Dd(null, t, e, n, a);
                  break e;
                }
              }
              throw t = Ee(e) || e, Error(u(306, t, ""));
            }
          }
          return t;
        case 0:
          return eo(e, t, t.type, t.pendingProps, a);
        case 1:
          return n = t.type, s = xn(n, t.pendingProps), Hd(e, t, n, s, a);
        case 3:
          e: {
            if (ot(t, t.stateNode.containerInfo), e === null) throw Error(u(387));
            n = t.pendingProps;
            var l = t.memoizedState;
            s = l.element, Ar(e, t), qs(t, n, null, a);
            var o = t.memoizedState;
            if (n = o.cache, La(t, st, n), n !== l.cache && kr(t, [
              st
            ], a, true), Bs(), n = o.element, l.isDehydrated) if (l = {
              element: n,
              isDehydrated: false,
              cache: o.cache
            }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
              t = Gd(e, t, n, a);
              break e;
            } else if (n !== s) {
              s = Qt(Error(u(424)), t), zs(s), t = Gd(e, t, n, a);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ze = Jt(e.firstChild), mt = t, Te = true, Da = null, Zt = true, a = Lu(t, null, n, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
            else {
              if (gn(), n === s) {
                t = va(e, t, a);
                break e;
              }
              pt(e, t, n, a);
            }
            t = t.child;
          }
          return t;
        case 26:
          return al(e, t), e === null ? (a = s1(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : Te || (a = t.type, e = t.pendingProps, n = bl(ke.current).createElement(a), n[ft] = t, n[kt] = e, gt(n, a, e), ut(n), t.stateNode = n) : t.memoizedState = s1(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return wt(t), e === null && Te && (n = t.stateNode = t1(t.type, t.pendingProps, ke.current), mt = t, Zt = true, s = Ze, Fa(t.type) ? (Ho = s, Ze = Jt(n.firstChild)) : Ze = s), pt(e, t, t.pendingProps.children, a), al(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && Te && ((s = n = Ze) && (n = Ch(n, t.type, t.pendingProps, Zt), n !== null ? (t.stateNode = n, mt = t, Ze = Jt(n.firstChild), Zt = false, s = true) : s = false), s || Ua(t)), wt(t), s = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, n = l.children, Uo(s, l) ? n = null : o !== null && Uo(s, o) && (t.flags |= 32), t.memoizedState !== null && (s = _r(e, t, O2, null, null, a), li._currentValue = s), al(e, t), pt(e, t, n, a), t.child;
        case 6:
          return e === null && Te && ((e = a = Ze) && (a = xh(a, t.pendingProps, Zt), a !== null ? (t.stateNode = a, mt = t, Ze = null, e = true) : e = false), e || Ua(t)), null;
        case 13:
          return Yd(e, t, a);
        case 4:
          return ot(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Sn(t, null, n, a) : pt(e, t, n, a), t.child;
        case 11:
          return _d(e, t, t.type, t.pendingProps, a);
        case 7:
          return pt(e, t, t.pendingProps, a), t.child;
        case 8:
          return pt(e, t, t.pendingProps.children, a), t.child;
        case 12:
          return pt(e, t, t.pendingProps.children, a), t.child;
        case 10:
          return n = t.pendingProps, La(t, t.type, n.value), pt(e, t, n.children, a), t.child;
        case 9:
          return s = t.type._context, n = t.pendingProps.children, vn(t), s = ht(s), n = n(s), t.flags |= 1, pt(e, t, n, a), t.child;
        case 14:
          return Dd(e, t, t.type, t.pendingProps, a);
        case 15:
          return Ud(e, t, t.type, t.pendingProps, a);
        case 19:
          return Xd(e, t, a);
        case 31:
          return V2(e, t, a);
        case 22:
          return Ld(e, t, a, t.pendingProps);
        case 24:
          return vn(t), n = ht(st), e === null ? (s = xr(), s === null && (s = Qe, l = Sr(), s.pooledCache = l, l.refCount++, l !== null && (s.pooledCacheLanes |= a), s = l), t.memoizedState = {
            parent: n,
            cache: s
          }, jr(t), La(t, st, s)) : ((e.lanes & a) !== 0 && (Ar(e, t), qs(t, null, null, a), Bs()), s = e.memoizedState, l = t.memoizedState, s.parent !== n ? (s = {
            parent: n,
            cache: n
          }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), La(t, st, n)) : (n = l.cache, La(t, st, n), n !== s.cache && kr(t, [
            st
          ], a, true))), pt(e, t, t.pendingProps.children, a), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(u(156, t.tag));
    }
    function ba(e) {
      e.flags |= 4;
    }
    function oo(e, t, a, n, s) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (s & 335544128) === s) if (e.stateNode.complete) e.flags |= 8192;
        else if (wf()) e.flags |= 8192;
        else throw kn = Hi, Mr;
      } else e.flags &= -16777217;
    }
    function Zd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !c1(t)) if (wf()) e.flags |= 8192;
      else throw kn = Hi, Mr;
    }
    function sl(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? jc() : 536870912, e.lanes |= t, ls |= t);
    }
    function Vs(e, t) {
      if (!Te) switch (e.tailMode) {
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
    function Ke(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, n = 0;
      if (t) for (var s = e.child; s !== null; ) a |= s.lanes | s.childLanes, n |= s.subtreeFlags & 65011712, n |= s.flags & 65011712, s.return = e, s = s.sibling;
      else for (s = e.child; s !== null; ) a |= s.lanes | s.childLanes, n |= s.subtreeFlags, n |= s.flags, s.return = e, s = s.sibling;
      return e.subtreeFlags |= n, e.childLanes = a, t;
    }
    function K2(e, t, a) {
      var n = t.pendingProps;
      switch (gr(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Ke(t), null;
        case 1:
          return Ke(t), null;
        case 3:
          return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), pa(st), Xe(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Zn(t) ? ba(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vr())), Ke(t), null;
        case 26:
          var s = t.type, l = t.memoizedState;
          return e === null ? (ba(t), l !== null ? (Ke(t), Zd(t, l)) : (Ke(t), oo(t, s, null, n, a))) : l ? l !== e.memoizedState ? (ba(t), Ke(t), Zd(t, l)) : (Ke(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && ba(t), Ke(t), oo(t, s, e, n, a)), null;
        case 27:
          if (ra(t), a = ke.current, s = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(u(166));
              return Ke(t), null;
            }
            e = ae.current, Zn(t) ? ju(t) : (e = t1(s, n, a), t.stateNode = e, ba(t));
          }
          return Ke(t), null;
        case 5:
          if (ra(t), s = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(u(166));
              return Ke(t), null;
            }
            if (l = ae.current, Zn(t)) ju(t);
            else {
              var o = bl(ke.current);
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
              l[ft] = t, l[kt] = n;
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
              e: switch (gt(l, s, n), s) {
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
          return Ke(t), oo(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== n && ba(t);
          else {
            if (typeof n != "string" && t.stateNode === null) throw Error(u(166));
            if (e = ke.current, Zn(t)) {
              if (e = t.stateNode, a = t.memoizedProps, n = null, s = mt, s !== null) switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
              e[ft] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === true || Qf(e.nodeValue, a)), e || Ua(t, true);
            } else e = bl(e).createTextNode(n), e[ft] = t, t.stateNode = e;
          }
          return Ke(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = Zn(t), a !== null) {
              if (e === null) {
                if (!n) throw Error(u(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
                e[ft] = t;
              } else gn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Ke(t), e = false;
            } else a = vr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = true;
            if (!e) return t.flags & 256 ? (_t(t), t) : (_t(t), null);
            if ((t.flags & 128) !== 0) throw Error(u(558));
          }
          return Ke(t), null;
        case 13:
          if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (s = Zn(t), n !== null && n.dehydrated !== null) {
              if (e === null) {
                if (!s) throw Error(u(318));
                if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(u(317));
                s[ft] = t;
              } else gn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Ke(t), s = false;
            } else s = vr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = true;
            if (!s) return t.flags & 256 ? (_t(t), t) : (_t(t), null);
          }
          return _t(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, s = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (s = n.alternate.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== s && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), sl(t, t.updateQueue), Ke(t), null);
        case 4:
          return Xe(), e === null && Ro(t.stateNode.containerInfo), Ke(t), null;
        case 10:
          return pa(t.type), Ke(t), null;
        case 19:
          if (H(et), n = t.memoizedState, n === null) return Ke(t), null;
          if (s = (t.flags & 128) !== 0, l = n.rendering, l === null) if (s) Vs(n, false);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (l = Xi(e), l !== null) {
                for (t.flags |= 128, Vs(n, false), e = l.updateQueue, t.updateQueue = e, sl(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; ) ku(a, e), a = a.sibling;
                return $(et, et.current & 1 | 2), Te && ma(t, n.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            n.tail !== null && X() > cl && (t.flags |= 128, s = true, Vs(n, false), t.lanes = 4194304);
          }
          else {
            if (!s) if (e = Xi(l), e !== null) {
              if (t.flags |= 128, s = true, e = e.updateQueue, t.updateQueue = e, sl(t, e), Vs(n, true), n.tail === null && n.tailMode === "hidden" && !l.alternate && !Te) return Ke(t), null;
            } else 2 * X() - n.renderingStartTime > cl && a !== 536870912 && (t.flags |= 128, s = true, Vs(n, false), t.lanes = 4194304);
            n.isBackwards ? (l.sibling = t.child, t.child = l) : (e = n.last, e !== null ? e.sibling = l : t.child = l, n.last = l);
          }
          return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = X(), e.sibling = null, a = et.current, $(et, s ? a & 1 | 2 : a & 1), Te && ma(t, n.treeForkCount), e) : (Ke(t), null);
        case 22:
        case 23:
          return _t(t), Rr(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), a = t.updateQueue, a !== null && sl(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && H(bn), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), pa(st), Ke(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(u(156, t.tag));
    }
    function J2(e, t) {
      switch (gr(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return pa(st), Xe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return ra(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (_t(t), t.alternate === null) throw Error(u(340));
            gn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (_t(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(u(340));
            gn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return H(et), null;
        case 4:
          return Xe(), null;
        case 10:
          return pa(t.type), null;
        case 22:
        case 23:
          return _t(t), Rr(), e !== null && H(bn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return pa(st), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Kd(e, t) {
      switch (gr(t), t.tag) {
        case 3:
          pa(st), Xe();
          break;
        case 26:
        case 27:
        case 5:
          ra(t);
          break;
        case 4:
          Xe();
          break;
        case 31:
          t.memoizedState !== null && _t(t);
          break;
        case 13:
          _t(t);
          break;
        case 19:
          H(et);
          break;
        case 10:
          pa(t.type);
          break;
        case 22:
        case 23:
          _t(t), Rr(), e !== null && H(bn);
          break;
        case 24:
          pa(st);
      }
    }
    function Zs(e, t) {
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
        Be(t, t.return, d);
      }
    }
    function Ya(e, t, a) {
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
                var g = a, I = d;
                try {
                  I();
                } catch (B) {
                  Be(s, g, B);
                }
              }
            }
            n = n.next;
          } while (n !== l);
        }
      } catch (B) {
        Be(t, t.return, B);
      }
    }
    function Jd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        try {
          Bu(t, a);
        } catch (n) {
          Be(e, e.return, n);
        }
      }
    }
    function Fd(e, t, a) {
      a.props = xn(e.type, e.memoizedProps), a.state = e.memoizedState;
      try {
        a.componentWillUnmount();
      } catch (n) {
        Be(e, t, n);
      }
    }
    function Ks(e, t) {
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
        Be(e, t, s);
      }
    }
    function na(e, t) {
      var a = e.ref, n = e.refCleanup;
      if (a !== null) if (typeof n == "function") try {
        n();
      } catch (s) {
        Be(e, t, s);
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
      }
      else if (typeof a == "function") try {
        a(null);
      } catch (s) {
        Be(e, t, s);
      }
      else a.current = null;
    }
    function $d(e) {
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
        Be(e, e.return, s);
      }
    }
    function co(e, t, a) {
      try {
        var n = e.stateNode;
        yh(n, e.type, a, t), n[kt] = t;
      } catch (s) {
        Be(e, e.return, s);
      }
    }
    function Wd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Fa(e.type) || e.tag === 4;
    }
    function uo(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Wd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Fa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function fo(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ua));
      else if (n !== 4 && (n === 27 && Fa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null)) for (fo(e, t, a), e = e.sibling; e !== null; ) fo(e, t, a), e = e.sibling;
    }
    function il(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (n !== 4 && (n === 27 && Fa(e.type) && (a = e.stateNode), e = e.child, e !== null)) for (il(e, t, a), e = e.sibling; e !== null; ) il(e, t, a), e = e.sibling;
    }
    function Pd(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
        gt(t, n, a), t[ft] = e, t[kt] = a;
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    var wa = false, rt = false, mo = false, ef = typeof WeakSet == "function" ? WeakSet : Set, dt = null;
    function F2(e, t) {
      if (e = e.containerInfo, _o = jl, e = fu(e), ir(e)) {
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
            var o = 0, d = -1, g = -1, I = 0, B = 0, Y = e, E = null;
            t: for (; ; ) {
              for (var _; Y !== a || s !== 0 && Y.nodeType !== 3 || (d = o + s), Y !== l || n !== 0 && Y.nodeType !== 3 || (g = o + n), Y.nodeType === 3 && (o += Y.nodeValue.length), (_ = Y.firstChild) !== null; ) E = Y, Y = _;
              for (; ; ) {
                if (Y === e) break t;
                if (E === a && ++I === s && (d = o), E === l && ++B === n && (g = o), (_ = Y.nextSibling) !== null) break;
                Y = E, E = Y.parentNode;
              }
              Y = _;
            }
            a = d === -1 || g === -1 ? null : {
              start: d,
              end: g
            };
          } else a = null;
        }
        a = a || {
          start: 0,
          end: 0
        };
      } else a = null;
      for (Do = {
        focusedElem: e,
        selectionRange: a
      }, jl = false, dt = t; dt !== null; ) if (t = dt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, dt = e;
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
                var ie = xn(a.type, s);
                e = n.getSnapshotBeforeUpdate(ie, l), n.__reactInternalSnapshotBeforeUpdate = e;
              } catch (me) {
                Be(a, a.return, me);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Oo(e);
              else if (a === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Oo(e);
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
    function tf(e, t, a) {
      var n = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Sa(e, a), n & 4 && Zs(5, a);
          break;
        case 1:
          if (Sa(e, a), n & 4) if (e = a.stateNode, t === null) try {
            e.componentDidMount();
          } catch (o) {
            Be(a, a.return, o);
          }
          else {
            var s = xn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              Be(a, a.return, o);
            }
          }
          n & 64 && Jd(a), n & 512 && Ks(a, a.return);
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
              Bu(e, t);
            } catch (o) {
              Be(a, a.return, o);
            }
          }
          break;
        case 27:
          t === null && n & 4 && Pd(a);
        case 26:
        case 5:
          Sa(e, a), t === null && n & 4 && $d(a), n & 512 && Ks(a, a.return);
          break;
        case 12:
          Sa(e, a);
          break;
        case 31:
          Sa(e, a), n & 4 && sf(e, a);
          break;
        case 13:
          Sa(e, a), n & 4 && lf(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = ih.bind(null, a), Mh(e, a))));
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
    function af(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, af(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Gl(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var Je = null, Ct = false;
    function ka(e, t, a) {
      for (a = a.child; a !== null; ) nf(e, t, a), a = a.sibling;
    }
    function nf(e, t, a) {
      if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
        Nt.onCommitFiberUnmount(vs, a);
      } catch {
      }
      switch (a.tag) {
        case 26:
          rt || na(a, t), ka(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          rt || na(a, t);
          var n = Je, s = Ct;
          Fa(a.type) && (Je = a.stateNode, Ct = false), ka(e, t, a), ni(a.stateNode), Je = n, Ct = s;
          break;
        case 5:
          rt || na(a, t);
        case 6:
          if (n = Je, s = Ct, Je = null, ka(e, t, a), Je = n, Ct = s, Je !== null) if (Ct) try {
            (Je.nodeType === 9 ? Je.body : Je.nodeName === "HTML" ? Je.ownerDocument.body : Je).removeChild(a.stateNode);
          } catch (l) {
            Be(a, t, l);
          }
          else try {
            Je.removeChild(a.stateNode);
          } catch (l) {
            Be(a, t, l);
          }
          break;
        case 18:
          Je !== null && (Ct ? (e = Je, Ff(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), hs(e)) : Ff(Je, a.stateNode));
          break;
        case 4:
          n = Je, s = Ct, Je = a.stateNode.containerInfo, Ct = true, ka(e, t, a), Je = n, Ct = s;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Ya(2, a, t), rt || Ya(4, a, t), ka(e, t, a);
          break;
        case 1:
          rt || (na(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && Fd(a, t, n)), ka(e, t, a);
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
    function sf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          hs(e);
        } catch (a) {
          Be(t, t.return, a);
        }
      }
    }
    function lf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        hs(e);
      } catch (a) {
        Be(t, t.return, a);
      }
    }
    function $2(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new ef()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ef()), t;
        default:
          throw Error(u(435, e.tag));
      }
    }
    function ll(e, t) {
      var a = $2(e);
      t.forEach(function(n) {
        if (!a.has(n)) {
          a.add(n);
          var s = lh.bind(null, e, n);
          n.then(s, s);
        }
      });
    }
    function xt(e, t) {
      var a = t.deletions;
      if (a !== null) for (var n = 0; n < a.length; n++) {
        var s = a[n], l = e, o = t, d = o;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Fa(d.type)) {
                Je = d.stateNode, Ct = false;
                break e;
              }
              break;
            case 5:
              Je = d.stateNode, Ct = false;
              break e;
            case 3:
            case 4:
              Je = d.stateNode.containerInfo, Ct = true;
              break e;
          }
          d = d.return;
        }
        if (Je === null) throw Error(u(160));
        nf(l, o, s), Je = null, Ct = false, l = s.alternate, l !== null && (l.return = null), s.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) rf(t, e), t = t.sibling;
    }
    var Pt = null;
    function rf(e, t) {
      var a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xt(t, e), Mt(e), n & 4 && (Ya(3, e, e.return), Zs(3, e), Ya(5, e, e.return));
          break;
        case 1:
          xt(t, e), Mt(e), n & 512 && (rt || a === null || na(a, a.return)), n & 64 && wa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
          break;
        case 26:
          var s = Pt;
          if (xt(t, e), Mt(e), n & 512 && (rt || a === null || na(a, a.return)), n & 4) {
            var l = a !== null ? a.memoizedState : null;
            if (n = e.memoizedState, a === null) if (n === null) if (e.stateNode === null) {
              e: {
                n = e.type, a = e.memoizedProps, s = s.ownerDocument || s;
                t: switch (n) {
                  case "title":
                    l = s.getElementsByTagName("title")[0], (!l || l[ks] || l[ft] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = s.createElement(n), s.head.insertBefore(l, s.querySelector("head > title"))), gt(l, n, a), l[ft] = e, ut(l), n = l;
                    break e;
                  case "link":
                    var o = r1("link", "href", s).get(n + (a.href || ""));
                    if (o) {
                      for (var d = 0; d < o.length; d++) if (l = o[d], l.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && l.getAttribute("rel") === (a.rel == null ? null : a.rel) && l.getAttribute("title") === (a.title == null ? null : a.title) && l.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    l = s.createElement(n), gt(l, n, a), s.head.appendChild(l);
                    break;
                  case "meta":
                    if (o = r1("meta", "content", s).get(n + (a.content || ""))) {
                      for (d = 0; d < o.length; d++) if (l = o[d], l.getAttribute("content") === (a.content == null ? null : "" + a.content) && l.getAttribute("name") === (a.name == null ? null : a.name) && l.getAttribute("property") === (a.property == null ? null : a.property) && l.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && l.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    l = s.createElement(n), gt(l, n, a), s.head.appendChild(l);
                    break;
                  default:
                    throw Error(u(468, n));
                }
                l[ft] = e, ut(l), n = l;
              }
              e.stateNode = n;
            } else o1(s, e.type, e.stateNode);
            else e.stateNode = l1(s, n, e.memoizedProps);
            else l !== n ? (l === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : l.count--, n === null ? o1(s, e.type, e.stateNode) : l1(s, n, e.memoizedProps)) : n === null && e.stateNode !== null && co(e, e.memoizedProps, a.memoizedProps);
          }
          break;
        case 27:
          xt(t, e), Mt(e), n & 512 && (rt || a === null || na(a, a.return)), a !== null && n & 4 && co(e, e.memoizedProps, a.memoizedProps);
          break;
        case 5:
          if (xt(t, e), Mt(e), n & 512 && (rt || a === null || na(a, a.return)), e.flags & 32) {
            s = e.stateNode;
            try {
              Ln(s, "");
            } catch (ie) {
              Be(e, e.return, ie);
            }
          }
          n & 4 && e.stateNode != null && (s = e.memoizedProps, co(e, s, a !== null ? a.memoizedProps : s)), n & 1024 && (mo = true);
          break;
        case 6:
          if (xt(t, e), Mt(e), n & 4) {
            if (e.stateNode === null) throw Error(u(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
              a.nodeValue = n;
            } catch (ie) {
              Be(e, e.return, ie);
            }
          }
          break;
        case 3:
          if (Sl = null, s = Pt, Pt = wl(t.containerInfo), xt(t, e), Pt = s, Mt(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
            hs(t.containerInfo);
          } catch (ie) {
            Be(e, e.return, ie);
          }
          mo && (mo = false, of(e));
          break;
        case 4:
          n = Pt, Pt = wl(e.stateNode.containerInfo), xt(t, e), Mt(e), Pt = n;
          break;
        case 12:
          xt(t, e), Mt(e);
          break;
        case 31:
          xt(t, e), Mt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ll(e, n)));
          break;
        case 13:
          xt(t, e), Mt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ol = X()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ll(e, n)));
          break;
        case 22:
          s = e.memoizedState !== null;
          var g = a !== null && a.memoizedState !== null, I = wa, B = rt;
          if (wa = I || s, rt = B || g, xt(t, e), rt = B, wa = I, Mt(e), n & 8192) e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (a === null || g || wa || rt || Mn(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                g = a = t;
                try {
                  if (l = g.stateNode, s) o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    d = g.stateNode;
                    var Y = g.memoizedProps.style, E = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                    d.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (ie) {
                  Be(g, g.return, ie);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = s ? "" : g.memoizedProps;
                } catch (ie) {
                  Be(g, g.return, ie);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                g = t;
                try {
                  var _ = g.stateNode;
                  s ? $f(_, true) : $f(g.stateNode, false);
                } catch (ie) {
                  Be(g, g.return, ie);
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
          n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, ll(e, a))));
          break;
        case 19:
          xt(t, e), Mt(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ll(e, n)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          xt(t, e), Mt(e);
      }
    }
    function Mt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var a, n = e.return; n !== null; ) {
            if (Wd(n)) {
              a = n;
              break;
            }
            n = n.return;
          }
          if (a == null) throw Error(u(160));
          switch (a.tag) {
            case 27:
              var s = a.stateNode, l = uo(e);
              il(e, l, s);
              break;
            case 5:
              var o = a.stateNode;
              a.flags & 32 && (Ln(o, ""), a.flags &= -33);
              var d = uo(e);
              il(e, d, o);
              break;
            case 3:
            case 4:
              var g = a.stateNode.containerInfo, I = uo(e);
              fo(e, I, g);
              break;
            default:
              throw Error(u(161));
          }
        } catch (B) {
          Be(e, e.return, B);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function of(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        of(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Sa(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) tf(e, t.alternate, t), t = t.sibling;
    }
    function Mn(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Ya(4, t, t.return), Mn(t);
            break;
          case 1:
            na(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount == "function" && Fd(t, t.return, a), Mn(t);
            break;
          case 27:
            ni(t.stateNode);
          case 26:
          case 5:
            na(t, t.return), Mn(t);
            break;
          case 22:
            t.memoizedState === null && Mn(t);
            break;
          case 30:
            Mn(t);
            break;
          default:
            Mn(t);
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
            Ca(s, l, a), Zs(4, l);
            break;
          case 1:
            if (Ca(s, l, a), n = l, s = n.stateNode, typeof s.componentDidMount == "function") try {
              s.componentDidMount();
            } catch (I) {
              Be(n, n.return, I);
            }
            if (n = l, s = n.updateQueue, s !== null) {
              var d = n.stateNode;
              try {
                var g = s.shared.hiddenCallbacks;
                if (g !== null) for (s.shared.hiddenCallbacks = null, s = 0; s < g.length; s++) Ou(g[s], d);
              } catch (I) {
                Be(n, n.return, I);
              }
            }
            a && o & 64 && Jd(l), Ks(l, l.return);
            break;
          case 27:
            Pd(l);
          case 26:
          case 5:
            Ca(s, l, a), a && n === null && o & 4 && $d(l), Ks(l, l.return);
            break;
          case 12:
            Ca(s, l, a);
            break;
          case 31:
            Ca(s, l, a), a && o & 4 && sf(s, l);
            break;
          case 13:
            Ca(s, l, a), a && o & 4 && lf(s, l);
            break;
          case 22:
            l.memoizedState === null && Ca(s, l, a), Ks(l, l.return);
            break;
          case 30:
            break;
          default:
            Ca(s, l, a);
        }
        t = t.sibling;
      }
    }
    function ho(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && _s(a));
    }
    function po(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _s(e));
    }
    function ea(e, t, a, n) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) cf(e, t, a, n), t = t.sibling;
    }
    function cf(e, t, a, n) {
      var s = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ea(e, t, a, n), s & 2048 && Zs(9, t);
          break;
        case 1:
          ea(e, t, a, n);
          break;
        case 3:
          ea(e, t, a, n), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _s(e)));
          break;
        case 12:
          if (s & 2048) {
            ea(e, t, a, n), e = t.stateNode;
            try {
              var l = t.memoizedProps, o = l.id, d = l.onPostCommit;
              typeof d == "function" && d(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            } catch (g) {
              Be(t, t.return, g);
            }
          } else ea(e, t, a, n);
          break;
        case 31:
          ea(e, t, a, n);
          break;
        case 13:
          ea(e, t, a, n);
          break;
        case 23:
          break;
        case 22:
          l = t.stateNode, o = t.alternate, t.memoizedState !== null ? l._visibility & 2 ? ea(e, t, a, n) : Js(e, t) : l._visibility & 2 ? ea(e, t, a, n) : (l._visibility |= 2, ns(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || false)), s & 2048 && ho(o, t);
          break;
        case 24:
          ea(e, t, a, n), s & 2048 && po(t.alternate, t);
          break;
        default:
          ea(e, t, a, n);
      }
    }
    function ns(e, t, a, n, s) {
      for (s = s && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var l = e, o = t, d = a, g = n, I = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            ns(l, o, d, g, s), Zs(8, o);
            break;
          case 23:
            break;
          case 22:
            var B = o.stateNode;
            o.memoizedState !== null ? B._visibility & 2 ? ns(l, o, d, g, s) : Js(l, o) : (B._visibility |= 2, ns(l, o, d, g, s)), s && I & 2048 && ho(o.alternate, o);
            break;
          case 24:
            ns(l, o, d, g, s), s && I & 2048 && po(o.alternate, o);
            break;
          default:
            ns(l, o, d, g, s);
        }
        t = t.sibling;
      }
    }
    function Js(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var a = e, n = t, s = n.flags;
        switch (n.tag) {
          case 22:
            Js(a, n), s & 2048 && ho(n.alternate, n);
            break;
          case 24:
            Js(a, n), s & 2048 && po(n.alternate, n);
            break;
          default:
            Js(a, n);
        }
        t = t.sibling;
      }
    }
    var Fs = 8192;
    function ss(e, t, a) {
      if (e.subtreeFlags & Fs) for (e = e.child; e !== null; ) uf(e, t, a), e = e.sibling;
    }
    function uf(e, t, a) {
      switch (e.tag) {
        case 26:
          ss(e, t, a), e.flags & Fs && e.memoizedState !== null && Lh(a, Pt, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          ss(e, t, a);
          break;
        case 3:
        case 4:
          var n = Pt;
          Pt = wl(e.stateNode.containerInfo), ss(e, t, a), Pt = n;
          break;
        case 22:
          e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Fs, Fs = 16777216, ss(e, t, a), Fs = n) : ss(e, t, a));
          break;
        default:
          ss(e, t, a);
      }
    }
    function df(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function $s(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, mf(n, e);
        }
        df(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) ff(e), e = e.sibling;
    }
    function ff(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          $s(e), e.flags & 2048 && Ya(9, e, e.return);
          break;
        case 3:
          $s(e);
          break;
        case 12:
          $s(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, rl(e)) : $s(e);
          break;
        default:
          $s(e);
      }
    }
    function rl(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, mf(n, e);
        }
        df(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            Ya(8, t, t.return), rl(t);
            break;
          case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, rl(t));
            break;
          default:
            rl(t);
        }
        e = e.sibling;
      }
    }
    function mf(e, t) {
      for (; dt !== null; ) {
        var a = dt;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            Ya(8, a, t);
            break;
          case 23:
          case 22:
            if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
              var n = a.memoizedState.cachePool.pool;
              n != null && n.refCount++;
            }
            break;
          case 24:
            _s(a.memoizedState.cache);
        }
        if (n = a.child, n !== null) n.return = a, dt = n;
        else e: for (a = e; dt !== null; ) {
          n = dt;
          var s = n.sibling, l = n.return;
          if (af(n), n === a) {
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
        var t = ht(st), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return ht(st).controller.signal;
      }
    }, P2 = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, Qe = null, je = null, Ie = 0, Oe = 0, Dt = null, Qa = false, is = false, go = false, xa = 0, We = 0, Xa = 0, jn = 0, yo = 0, Ut = 0, ls = 0, Ws = null, jt = null, vo = false, ol = 0, hf = 0, cl = 1 / 0, ul = null, Va = null, ct = 0, Za = null, rs = null, Ma = 0, bo = 0, wo = null, pf = null, Ps = 0, ko = null;
    function Lt() {
      return (Ue & 2) !== 0 && Ie !== 0 ? Ie & -Ie : w.T !== null ? Ao() : Ec();
    }
    function gf() {
      if (Ut === 0) if ((Ie & 536870912) === 0 || Te) {
        var e = vi;
        vi <<= 1, (vi & 3932160) === 0 && (vi = 262144), Ut = e;
      } else Ut = 536870912;
      return e = zt.current, e !== null && (e.flags |= 32), Ut;
    }
    function At(e, t, a) {
      (e === Qe && (Oe === 2 || Oe === 9) || e.cancelPendingCommit !== null) && (os(e, 0), Ka(e, Ie, Ut, false)), ws(e, a), ((Ue & 2) === 0 || e !== Qe) && (e === Qe && ((Ue & 2) === 0 && (jn |= a), We === 4 && Ka(e, Ie, Ut, false)), sa(e));
    }
    function yf(e, t, a) {
      if ((Ue & 6) !== 0) throw Error(u(327));
      var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || bs(e, t), s = n ? ah(e, t) : Co(e, t, true), l = n;
      do {
        if (s === 0) {
          is && !n && Ka(e, t, 0, false);
          break;
        } else {
          if (a = e.current.alternate, l && !eh(a)) {
            s = Co(e, t, false), l = false;
            continue;
          }
          if (s === 2) {
            if (l = t, e.errorRecoveryDisabledLanes & l) var o = 0;
            else o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
            if (o !== 0) {
              t = o;
              e: {
                var d = e;
                s = Ws;
                var g = d.current.memoizedState.isDehydrated;
                if (g && (os(d, o).flags |= 256), o = Co(d, o, false), o !== 2) {
                  if (go && !g) {
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
            os(e, 0), Ka(e, t, 0, true);
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
                Ka(n, t, Ut, !Qa);
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
            if ((t & 62914560) === t && (s = ol + 300 - X(), 10 < s)) {
              if (Ka(n, t, Ut, !Qa), wi(n, 0, true) !== 0) break e;
              Ma = t, n.timeoutHandle = Kf(vf.bind(null, n, a, jt, ul, vo, t, Ut, jn, ls, Qa, l, "Throttled", -0, 0), s);
              break e;
            }
            vf(n, a, jt, ul, vo, t, Ut, jn, ls, Qa, l, null, -0, 0);
          }
        }
        break;
      } while (true);
      sa(e);
    }
    function vf(e, t, a, n, s, l, o, d, g, I, B, Y, E, _) {
      if (e.timeoutHandle = -1, Y = t.subtreeFlags, Y & 8192 || (Y & 16785408) === 16785408) {
        Y = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: ua
        }, uf(t, l, Y);
        var ie = (l & 62914560) === l ? ol - X() : (l & 4194048) === l ? hf - X() : 0;
        if (ie = Oh(Y, ie), ie !== null) {
          Ma = l, e.cancelPendingCommit = ie(jf.bind(null, e, t, l, a, n, s, o, d, g, B, Y, null, E, _)), Ka(e, l, o, !I);
          return;
        }
      }
      jf(e, t, l, a, n, s, o, d, g);
    }
    function eh(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) for (var n = 0; n < a.length; n++) {
          var s = a[n], l = s.getSnapshot;
          s = s.value;
          try {
            if (!Rt(l(), s)) return false;
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
    function Ka(e, t, a, n) {
      t &= ~yo, t &= ~jn, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
      for (var s = t; 0 < s; ) {
        var l = 31 - Et(s), o = 1 << l;
        n[l] = -1, s &= ~o;
      }
      a !== 0 && Ac(e, a, t);
    }
    function dl() {
      return (Ue & 6) === 0 ? (ei(0), false) : true;
    }
    function So() {
      if (je !== null) {
        if (Oe === 0) var e = je.return;
        else e = je, ha = yn = null, Lr(e), Wn = null, Us = 0, e = je;
        for (; e !== null; ) Kd(e.alternate, e), e = e.return;
        je = null;
      }
    }
    function os(e, t) {
      var a = e.timeoutHandle;
      a !== -1 && (e.timeoutHandle = -1, wh(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ma = 0, So(), Qe = e, je = a = fa(e.current, null), Ie = t, Oe = 0, Dt = null, Qa = false, is = bs(e, t), go = false, ls = Ut = yo = jn = Xa = We = 0, jt = Ws = null, vo = false, (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Et(n), l = 1 << s;
        t |= e[s], n &= ~l;
      }
      return xa = t, Ti(), a;
    }
    function bf(e, t) {
      Se = null, w.H = Qs, t === $n || t === qi ? (t = _u(), Oe = 3) : t === Mr ? (t = _u(), Oe = 4) : Oe = t === Pr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Dt = t, je === null && (We = 1, el(e, Qt(t, e.current)));
    }
    function wf() {
      var e = zt.current;
      return e === null ? true : (Ie & 4194048) === Ie ? Kt === null : (Ie & 62914560) === Ie || (Ie & 536870912) !== 0 ? e === Kt : false;
    }
    function kf() {
      var e = w.H;
      return w.H = Qs, e === null ? Qs : e;
    }
    function Sf() {
      var e = w.A;
      return w.A = W2, e;
    }
    function fl() {
      We = 4, Qa || (Ie & 4194048) !== Ie && zt.current !== null || (is = true), (Xa & 134217727) === 0 && (jn & 134217727) === 0 || Qe === null || Ka(Qe, Ie, Ut, false);
    }
    function Co(e, t, a) {
      var n = Ue;
      Ue |= 2;
      var s = kf(), l = Sf();
      (Qe !== e || Ie !== t) && (ul = null, os(e, t)), t = false;
      var o = We;
      e: do
        try {
          if (Oe !== 0 && je !== null) {
            var d = je, g = Dt;
            switch (Oe) {
              case 8:
                So(), o = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                zt.current === null && (t = true);
                var I = Oe;
                if (Oe = 0, Dt = null, cs(e, d, g, I), a && is) {
                  o = 0;
                  break e;
                }
                break;
              default:
                I = Oe, Oe = 0, Dt = null, cs(e, d, g, I);
            }
          }
          th(), o = We;
          break;
        } catch (B) {
          bf(e, B);
        }
      while (true);
      return t && e.shellSuspendCounter++, ha = yn = null, Ue = n, w.H = s, w.A = l, je === null && (Qe = null, Ie = 0, Ti()), o;
    }
    function th() {
      for (; je !== null; ) Cf(je);
    }
    function ah(e, t) {
      var a = Ue;
      Ue |= 2;
      var n = kf(), s = Sf();
      Qe !== e || Ie !== t ? (ul = null, cl = X() + 500, os(e, t)) : is = bs(e, t);
      e: do
        try {
          if (Oe !== 0 && je !== null) {
            t = je;
            var l = Dt;
            t: switch (Oe) {
              case 1:
                Oe = 0, Dt = null, cs(e, t, l, 1);
                break;
              case 2:
              case 9:
                if (Tu(l)) {
                  Oe = 0, Dt = null, xf(t);
                  break;
                }
                t = function() {
                  Oe !== 2 && Oe !== 9 || Qe !== e || (Oe = 7), sa(e);
                }, l.then(t, t);
                break e;
              case 3:
                Oe = 7;
                break e;
              case 4:
                Oe = 5;
                break e;
              case 7:
                Tu(l) ? (Oe = 0, Dt = null, xf(t)) : (Oe = 0, Dt = null, cs(e, t, l, 7));
                break;
              case 5:
                var o = null;
                switch (je.tag) {
                  case 26:
                    o = je.memoizedState;
                  case 5:
                  case 27:
                    var d = je;
                    if (o ? c1(o) : d.stateNode.complete) {
                      Oe = 0, Dt = null;
                      var g = d.sibling;
                      if (g !== null) je = g;
                      else {
                        var I = d.return;
                        I !== null ? (je = I, ml(I)) : je = null;
                      }
                      break t;
                    }
                }
                Oe = 0, Dt = null, cs(e, t, l, 5);
                break;
              case 6:
                Oe = 0, Dt = null, cs(e, t, l, 6);
                break;
              case 8:
                So(), We = 6;
                break e;
              default:
                throw Error(u(462));
            }
          }
          nh();
          break;
        } catch (B) {
          bf(e, B);
        }
      while (true);
      return ha = yn = null, w.H = n, w.A = s, Ue = a, je !== null ? 0 : (Qe = null, Ie = 0, Ti(), We);
    }
    function nh() {
      for (; je !== null && !Z(); ) Cf(je);
    }
    function Cf(e) {
      var t = Vd(e.alternate, e, xa);
      e.memoizedProps = e.pendingProps, t === null ? ml(e) : je = t;
    }
    function xf(e) {
      var t = e, a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = qd(a, t, t.pendingProps, t.type, void 0, Ie);
          break;
        case 11:
          t = qd(a, t, t.pendingProps, t.type.render, t.ref, Ie);
          break;
        case 5:
          Lr(t);
        default:
          Kd(a, t), t = je = ku(t, xa), t = Vd(a, t, xa);
      }
      e.memoizedProps = e.pendingProps, t === null ? ml(e) : je = t;
    }
    function cs(e, t, a, n) {
      ha = yn = null, Lr(t), Wn = null, Us = 0;
      var s = t.return;
      try {
        if (X2(e, s, t, a, Ie)) {
          We = 1, el(e, Qt(a, e.current)), je = null;
          return;
        }
      } catch (l) {
        if (s !== null) throw je = s, l;
        We = 1, el(e, Qt(a, e.current)), je = null;
        return;
      }
      t.flags & 32768 ? (Te || n === 1 ? e = true : is || (Ie & 536870912) !== 0 ? e = false : (Qa = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = zt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Mf(t, e)) : ml(t);
    }
    function ml(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Mf(t, Qa);
          return;
        }
        e = t.return;
        var a = K2(t.alternate, t, xa);
        if (a !== null) {
          je = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          je = t;
          return;
        }
        je = t = e;
      } while (t !== null);
      We === 0 && (We = 5);
    }
    function Mf(e, t) {
      do {
        var a = J2(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, je = a;
          return;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          je = e;
          return;
        }
        je = e = a;
      } while (e !== null);
      We = 6, je = null;
    }
    function jf(e, t, a, n, s, l, o, d, g) {
      e.cancelPendingCommit = null;
      do
        hl();
      while (ct !== 0);
      if ((Ue & 6) !== 0) throw Error(u(327));
      if (t !== null) {
        if (t === e.current) throw Error(u(177));
        if (l = t.lanes | t.childLanes, l |= ur, Um(e, a, l, o, d, g), e === Qe && (je = Qe = null, Ie = 0), rs = t, Za = e, Ma = a, bo = l, wo = s, pf = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, rh(nt, function() {
          return Rf(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
          n = w.T, w.T = null, s = R.p, R.p = 2, o = Ue, Ue |= 4;
          try {
            F2(e, t, a);
          } finally {
            Ue = o, R.p = s, w.T = n;
          }
        }
        ct = 1, Af(), If(), Nf();
      }
    }
    function Af() {
      if (ct === 1) {
        ct = 0;
        var e = Za, t = rs, a = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || a) {
          a = w.T, w.T = null;
          var n = R.p;
          R.p = 2;
          var s = Ue;
          Ue |= 4;
          try {
            rf(t, e);
            var l = Do, o = fu(e.containerInfo), d = l.focusedElem, g = l.selectionRange;
            if (o !== d && d && d.ownerDocument && du(d.ownerDocument.documentElement, d)) {
              if (g !== null && ir(d)) {
                var I = g.start, B = g.end;
                if (B === void 0 && (B = I), "selectionStart" in d) d.selectionStart = I, d.selectionEnd = Math.min(B, d.value.length);
                else {
                  var Y = d.ownerDocument || document, E = Y && Y.defaultView || window;
                  if (E.getSelection) {
                    var _ = E.getSelection(), ie = d.textContent.length, me = Math.min(g.start, ie), Ge = g.end === void 0 ? me : Math.min(g.end, ie);
                    !_.extend && me > Ge && (o = Ge, Ge = me, me = o);
                    var S = uu(d, me), b = uu(d, Ge);
                    if (S && b && (_.rangeCount !== 1 || _.anchorNode !== S.node || _.anchorOffset !== S.offset || _.focusNode !== b.node || _.focusOffset !== b.offset)) {
                      var A = Y.createRange();
                      A.setStart(S.node, S.offset), _.removeAllRanges(), me > Ge ? (_.addRange(A), _.extend(b.node, b.offset)) : (A.setEnd(b.node, b.offset), _.addRange(A));
                    }
                  }
                }
              }
              for (Y = [], _ = d; _ = _.parentNode; ) _.nodeType === 1 && Y.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
              for (typeof d.focus == "function" && d.focus(), d = 0; d < Y.length; d++) {
                var G = Y[d];
                G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
              }
            }
            jl = !!_o, Do = _o = null;
          } finally {
            Ue = s, R.p = n, w.T = a;
          }
        }
        e.current = t, ct = 2;
      }
    }
    function If() {
      if (ct === 2) {
        ct = 0;
        var e = Za, t = rs, a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = w.T, w.T = null;
          var n = R.p;
          R.p = 2;
          var s = Ue;
          Ue |= 4;
          try {
            tf(e, t.alternate, t);
          } finally {
            Ue = s, R.p = n, w.T = a;
          }
        }
        ct = 3;
      }
    }
    function Nf() {
      if (ct === 4 || ct === 3) {
        ct = 0, se();
        var e = Za, t = rs, a = Ma, n = pf;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ct = 5 : (ct = 0, rs = Za = null, Ef(e, e.pendingLanes));
        var s = e.pendingLanes;
        if (s === 0 && (Va = null), ql(a), t = t.stateNode, Nt && typeof Nt.onCommitFiberRoot == "function") try {
          Nt.onCommitFiberRoot(vs, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (n !== null) {
          t = w.T, s = R.p, R.p = 2, w.T = null;
          try {
            for (var l = e.onRecoverableError, o = 0; o < n.length; o++) {
              var d = n[o];
              l(d.value, {
                componentStack: d.stack
              });
            }
          } finally {
            w.T = t, R.p = s;
          }
        }
        (Ma & 3) !== 0 && hl(), sa(e), s = e.pendingLanes, (a & 261930) !== 0 && (s & 42) !== 0 ? e === ko ? Ps++ : (Ps = 0, ko = e) : Ps = 0, ei(0);
      }
    }
    function Ef(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, _s(t)));
    }
    function hl() {
      return Af(), If(), Nf(), Rf();
    }
    function Rf() {
      if (ct !== 5) return false;
      var e = Za, t = bo;
      bo = 0;
      var a = ql(Ma), n = w.T, s = R.p;
      try {
        R.p = 32 > a ? 32 : a, w.T = null, a = wo, wo = null;
        var l = Za, o = Ma;
        if (ct = 0, rs = Za = null, Ma = 0, (Ue & 6) !== 0) throw Error(u(331));
        var d = Ue;
        if (Ue |= 4, ff(l.current), cf(l, l.current, o, a), Ue = d, ei(0, false), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
          Nt.onPostCommitFiberRoot(vs, l);
        } catch {
        }
        return true;
      } finally {
        R.p = s, w.T = n, Ef(e, t);
      }
    }
    function Tf(e, t, a) {
      t = Qt(a, t), t = Wr(e.stateNode, t, 2), e = qa(e, t, 2), e !== null && (ws(e, 2), sa(e));
    }
    function Be(e, t, a) {
      if (e.tag === 3) Tf(e, e, a);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          Tf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Va === null || !Va.has(n))) {
            e = Qt(a, e), a = Td(2), n = qa(t, a, 2), n !== null && (zd(a, n, t, e), ws(n, 2), sa(n));
            break;
          }
        }
        t = t.return;
      }
    }
    function xo(e, t, a) {
      var n = e.pingCache;
      if (n === null) {
        n = e.pingCache = new P2();
        var s = /* @__PURE__ */ new Set();
        n.set(t, s);
      } else s = n.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), n.set(t, s));
      s.has(a) || (go = true, s.add(a), e = sh.bind(null, e, t, a), t.then(e, e));
    }
    function sh(e, t, a) {
      var n = e.pingCache;
      n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Qe === e && (Ie & a) === a && (We === 4 || We === 3 && (Ie & 62914560) === Ie && 300 > X() - ol ? (Ue & 2) === 0 && os(e, 0) : yo |= a, ls === Ie && (ls = 0)), sa(e);
    }
    function zf(e, t) {
      t === 0 && (t = jc()), e = hn(e, t), e !== null && (ws(e, t), sa(e));
    }
    function ih(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), zf(e, a);
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
      n !== null && n.delete(t), zf(e, a);
    }
    function rh(e, t) {
      return M(e, t);
    }
    var pl = null, us = null, Mo = false, gl = false, jo = false, Ja = 0;
    function sa(e) {
      e !== us && e.next === null && (us === null ? pl = us = e : us = us.next = e), gl = true, Mo || (Mo = true, ch());
    }
    function ei(e, t) {
      if (!jo && gl) {
        jo = true;
        do
          for (var a = false, n = pl; n !== null; ) {
            if (e !== 0) {
              var s = n.pendingLanes;
              if (s === 0) var l = 0;
              else {
                var o = n.suspendedLanes, d = n.pingedLanes;
                l = (1 << 31 - Et(42 | e) + 1) - 1, l &= s & ~(o & ~d), l = l & 201326741 ? l & 201326741 | 1 : l ? l | 2 : 0;
              }
              l !== 0 && (a = true, Lf(n, l));
            } else l = Ie, l = wi(n, n === Qe ? l : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (l & 3) === 0 || bs(n, l) || (a = true, Lf(n, l));
            n = n.next;
          }
        while (a);
        jo = false;
      }
    }
    function oh() {
      _f();
    }
    function _f() {
      gl = Mo = false;
      var e = 0;
      Ja !== 0 && bh() && (e = Ja);
      for (var t = X(), a = null, n = pl; n !== null; ) {
        var s = n.next, l = Df(n, t);
        l === 0 ? (n.next = null, a === null ? pl = s : a.next = s, s === null && (us = a)) : (a = n, (e !== 0 || (l & 3) !== 0) && (gl = true)), n = s;
      }
      ct !== 0 && ct !== 5 || ei(e), Ja !== 0 && (Ja = 0);
    }
    function Df(e, t) {
      for (var a = e.suspendedLanes, n = e.pingedLanes, s = e.expirationTimes, l = e.pendingLanes & -62914561; 0 < l; ) {
        var o = 31 - Et(l), d = 1 << o, g = s[o];
        g === -1 ? ((d & a) === 0 || (d & n) !== 0) && (s[o] = Dm(d, t)) : g <= t && (e.expiredLanes |= d), l &= ~d;
      }
      if (t = Qe, a = Ie, a = wi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (Oe === 2 || Oe === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && N(n), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || bs(e, a)) {
        if (t = a & -a, t === e.callbackPriority) return t;
        switch (n !== null && N(n), ql(a)) {
          case 2:
          case 8:
            a = Le;
            break;
          case 32:
            a = nt;
            break;
          case 268435456:
            a = qt;
            break;
          default:
            a = nt;
        }
        return n = Uf.bind(null, e), a = M(a, n), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return n !== null && n !== null && N(n), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Uf(e, t) {
      if (ct !== 0 && ct !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (hl() && e.callbackNode !== a) return null;
      var n = Ie;
      return n = wi(e, e === Qe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (yf(e, n, t), Df(e, X()), e.callbackNode != null && e.callbackNode === a ? Uf.bind(null, e) : null);
    }
    function Lf(e, t) {
      if (hl()) return null;
      yf(e, t, true);
    }
    function ch() {
      kh(function() {
        (Ue & 6) !== 0 ? M(ce, oh) : _f();
      });
    }
    function Ao() {
      if (Ja === 0) {
        var e = Jn;
        e === 0 && (e = yi, yi <<= 1, (yi & 261888) === 0 && (yi = 256)), Ja = e;
      }
      return Ja;
    }
    function Of(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : xi("" + e);
    }
    function Bf(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function uh(e, t, a, n, s) {
      if (t === "submit" && a && a.stateNode === s) {
        var l = Of((s[kt] || null).action), o = n.submitter;
        o && (t = (t = o[kt] || null) ? Of(t.formAction) : o.getAttribute("formAction"), t !== null && (l = t, o = null));
        var d = new Ii("action", "action", null, n, s);
        e.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if (Ja !== 0) {
                    var g = o ? Bf(s, o) : new FormData(s);
                    Vr(a, {
                      pending: true,
                      data: g,
                      method: s.method,
                      action: l
                    }, null, g);
                  }
                } else typeof l == "function" && (d.preventDefault(), g = o ? Bf(s, o) : new FormData(s), Vr(a, {
                  pending: true,
                  data: g,
                  method: s.method,
                  action: l
                }, l, g));
              },
              currentTarget: s
            }
          ]
        });
      }
    }
    for (var Io = 0; Io < cr.length; Io++) {
      var No = cr[Io], dh = No.toLowerCase(), fh = No[0].toUpperCase() + No.slice(1);
      Wt(dh, "on" + fh);
    }
    Wt(pu, "onAnimationEnd"), Wt(gu, "onAnimationIteration"), Wt(yu, "onAnimationStart"), Wt("dblclick", "onDoubleClick"), Wt("focusin", "onFocus"), Wt("focusout", "onBlur"), Wt(I2, "onTransitionRun"), Wt(N2, "onTransitionStart"), Wt(E2, "onTransitionCancel"), Wt(vu, "onTransitionEnd"), Dn("onMouseEnter", [
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
    ]), un("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), un("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), un("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), un("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), un("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), un("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var ti = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mh = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ti));
    function qf(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var n = e[a], s = n.event;
        n = n.listeners;
        e: {
          var l = void 0;
          if (t) for (var o = n.length - 1; 0 <= o; o--) {
            var d = n[o], g = d.instance, I = d.currentTarget;
            if (d = d.listener, g !== l && s.isPropagationStopped()) break e;
            l = d, s.currentTarget = I;
            try {
              l(s);
            } catch (B) {
              Ri(B);
            }
            s.currentTarget = null, l = g;
          }
          else for (o = 0; o < n.length; o++) {
            if (d = n[o], g = d.instance, I = d.currentTarget, d = d.listener, g !== l && s.isPropagationStopped()) break e;
            l = d, s.currentTarget = I;
            try {
              l(s);
            } catch (B) {
              Ri(B);
            }
            s.currentTarget = null, l = g;
          }
        }
      }
    }
    function Ae(e, t) {
      var a = t[Hl];
      a === void 0 && (a = t[Hl] = /* @__PURE__ */ new Set());
      var n = e + "__bubble";
      a.has(n) || (Hf(t, e, 2, false), a.add(n));
    }
    function Eo(e, t, a) {
      var n = 0;
      t && (n |= 4), Hf(a, e, n, t);
    }
    var yl = "_reactListening" + Math.random().toString(36).slice(2);
    function Ro(e) {
      if (!e[yl]) {
        e[yl] = true, zc.forEach(function(a) {
          a !== "selectionchange" && (mh.has(a) || Eo(a, false, e), Eo(a, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[yl] || (t[yl] = true, Eo("selectionchange", false, t));
      }
    }
    function Hf(e, t, a, n) {
      switch (g1(t)) {
        case 2:
          var s = Hh;
          break;
        case 8:
          s = Gh;
          break;
        default:
          s = Vo;
      }
      a = s.bind(null, t, a, e), s = void 0, !Fl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = true), n ? s !== void 0 ? e.addEventListener(t, a, {
        capture: true,
        passive: s
      }) : e.addEventListener(t, a, true) : s !== void 0 ? e.addEventListener(t, a, {
        passive: s
      }) : e.addEventListener(t, a, false);
    }
    function To(e, t, a, n, s) {
      var l = n;
      if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (; ; ) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var d = n.stateNode.containerInfo;
          if (d === s) break;
          if (o === 4) for (o = n.return; o !== null; ) {
            var g = o.tag;
            if ((g === 3 || g === 4) && o.stateNode.containerInfo === s) return;
            o = o.return;
          }
          for (; d !== null; ) {
            if (o = Tn(d), o === null) return;
            if (g = o.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              n = l = o;
              continue e;
            }
            d = d.parentNode;
          }
        }
        n = n.return;
      }
      Xc(function() {
        var I = l, B = Kl(a), Y = [];
        e: {
          var E = bu.get(e);
          if (E !== void 0) {
            var _ = Ii, ie = e;
            switch (e) {
              case "keypress":
                if (ji(a) === 0) break e;
              case "keydown":
              case "keyup":
                _ = l2;
                break;
              case "focusin":
                ie = "focus", _ = er;
                break;
              case "focusout":
                ie = "blur", _ = er;
                break;
              case "beforeblur":
              case "afterblur":
                _ = er;
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
                _ = Kc;
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
              case pu:
              case gu:
              case yu:
                _ = $m;
                break;
              case vu:
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
                _ = Fc;
                break;
              case "toggle":
              case "beforetoggle":
                _ = p2;
            }
            var me = (t & 4) !== 0, Ge = !me && (e === "scroll" || e === "scrollend"), S = me ? E !== null ? E + "Capture" : null : E;
            me = [];
            for (var b = I, A; b !== null; ) {
              var G = b;
              if (A = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || A === null || S === null || (G = Cs(b, S), G != null && me.push(ai(b, G, A))), Ge) break;
              b = b.return;
            }
            0 < me.length && (E = new _(E, ie, null, a, B), Y.push({
              event: E,
              listeners: me
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (E = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", E && a !== Zl && (ie = a.relatedTarget || a.fromElement) && (Tn(ie) || ie[Rn])) break e;
            if ((_ || E) && (E = B.window === B ? B : (E = B.ownerDocument) ? E.defaultView || E.parentWindow : window, _ ? (ie = a.relatedTarget || a.toElement, _ = I, ie = ie ? Tn(ie) : null, ie !== null && (Ge = h(ie), me = ie.tag, ie !== Ge || me !== 5 && me !== 27 && me !== 6) && (ie = null)) : (_ = null, ie = I), _ !== ie)) {
              if (me = Kc, G = "onMouseLeave", S = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (me = Fc, G = "onPointerLeave", S = "onPointerEnter", b = "pointer"), Ge = _ == null ? E : Ss(_), A = ie == null ? E : Ss(ie), E = new me(G, b + "leave", _, a, B), E.target = Ge, E.relatedTarget = A, G = null, Tn(B) === I && (me = new me(S, b + "enter", ie, a, B), me.target = A, me.relatedTarget = Ge, G = me), Ge = G, _ && ie) t: {
                for (me = hh, S = _, b = ie, A = 0, G = S; G; G = me(G)) A++;
                G = 0;
                for (var de = b; de; de = me(de)) G++;
                for (; 0 < A - G; ) S = me(S), A--;
                for (; 0 < G - A; ) b = me(b), G--;
                for (; A--; ) {
                  if (S === b || b !== null && S === b.alternate) {
                    me = S;
                    break t;
                  }
                  S = me(S), b = me(b);
                }
                me = null;
              }
              else me = null;
              _ !== null && Gf(Y, E, _, me, false), ie !== null && Ge !== null && Gf(Y, Ge, ie, me, true);
            }
          }
          e: {
            if (E = I ? Ss(I) : window, _ = E.nodeName && E.nodeName.toLowerCase(), _ === "select" || _ === "input" && E.type === "file") var _e = su;
            else if (au(E)) if (iu) _e = M2;
            else {
              _e = C2;
              var re = S2;
            }
            else _ = E.nodeName, !_ || _.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? I && Vl(I.elementType) && (_e = su) : _e = x2;
            if (_e && (_e = _e(e, I))) {
              nu(Y, _e, a, B);
              break e;
            }
            re && re(e, E, I), e === "focusout" && I && E.type === "number" && I.memoizedProps.value != null && Xl(E, "number", E.value);
          }
          switch (re = I ? Ss(I) : window, e) {
            case "focusin":
              (au(re) || re.contentEditable === "true") && (Hn = re, lr = I, Rs = null);
              break;
            case "focusout":
              Rs = lr = Hn = null;
              break;
            case "mousedown":
              rr = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              rr = false, mu(Y, a, B);
              break;
            case "selectionchange":
              if (A2) break;
            case "keydown":
            case "keyup":
              mu(Y, a, B);
          }
          var Ce;
          if (ar) e: {
            switch (e) {
              case "compositionstart":
                var Ne = "onCompositionStart";
                break e;
              case "compositionend":
                Ne = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ne = "onCompositionUpdate";
                break e;
            }
            Ne = void 0;
          }
          else qn ? eu(e, a) && (Ne = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Ne = "onCompositionStart");
          Ne && ($c && a.locale !== "ko" && (qn || Ne !== "onCompositionStart" ? Ne === "onCompositionEnd" && qn && (Ce = Vc()) : (za = B, $l = "value" in za ? za.value : za.textContent, qn = true)), re = vl(I, Ne), 0 < re.length && (Ne = new Jc(Ne, e, null, a, B), Y.push({
            event: Ne,
            listeners: re
          }), Ce ? Ne.data = Ce : (Ce = tu(a), Ce !== null && (Ne.data = Ce)))), (Ce = y2 ? v2(e, a) : b2(e, a)) && (Ne = vl(I, "onBeforeInput"), 0 < Ne.length && (re = new Jc("onBeforeInput", "beforeinput", null, a, B), Y.push({
            event: re,
            listeners: Ne
          }), re.data = Ce)), uh(Y, e, I, a, B);
        }
        qf(Y, t);
      });
    }
    function ai(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function vl(e, t) {
      for (var a = t + "Capture", n = []; e !== null; ) {
        var s = e, l = s.stateNode;
        if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || l === null || (s = Cs(e, a), s != null && n.unshift(ai(e, s, l)), s = Cs(e, t), s != null && n.push(ai(e, s, l))), e.tag === 3) return n;
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
    function Gf(e, t, a, n, s) {
      for (var l = t._reactName, o = []; a !== null && a !== n; ) {
        var d = a, g = d.alternate, I = d.stateNode;
        if (d = d.tag, g !== null && g === n) break;
        d !== 5 && d !== 26 && d !== 27 || I === null || (g = I, s ? (I = Cs(a, l), I != null && o.unshift(ai(a, I, g))) : s || (I = Cs(a, l), I != null && o.push(ai(a, I, g)))), a = a.return;
      }
      o.length !== 0 && e.push({
        event: t,
        listeners: o
      });
    }
    var ph = /\r\n?/g, gh = /\u0000|\uFFFD/g;
    function Yf(e) {
      return (typeof e == "string" ? e : "" + e).replace(ph, `
`).replace(gh, "");
    }
    function Qf(e, t) {
      return t = Yf(t), Yf(e) === t;
    }
    function He(e, t, a, n, s, l) {
      switch (a) {
        case "children":
          typeof n == "string" ? t === "body" || t === "textarea" && n === "" || Ln(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && Ln(e, "" + n);
          break;
        case "className":
          Si(e, "class", n);
          break;
        case "tabIndex":
          Si(e, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Si(e, a, n);
          break;
        case "style":
          Yc(e, n, l);
          break;
        case "data":
          if (t !== "object") {
            Si(e, "data", n);
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
          n = xi("" + n), e.setAttribute(a, n);
          break;
        case "action":
        case "formAction":
          if (typeof n == "function") {
            e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof l == "function" && (a === "formAction" ? (t !== "input" && He(e, t, "name", s.name, s, null), He(e, t, "formEncType", s.formEncType, s, null), He(e, t, "formMethod", s.formMethod, s, null), He(e, t, "formTarget", s.formTarget, s, null)) : (He(e, t, "encType", s.encType, s, null), He(e, t, "method", s.method, s, null), He(e, t, "target", s.target, s, null)));
          if (n == null || typeof n == "symbol" || typeof n == "boolean") {
            e.removeAttribute(a);
            break;
          }
          n = xi("" + n), e.setAttribute(a, n);
          break;
        case "onClick":
          n != null && (e.onclick = ua);
          break;
        case "onScroll":
          n != null && Ae("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ae("scrollend", e);
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
          a = xi("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
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
          Ae("beforetoggle", e), Ae("toggle", e), ki(e, "popover", n);
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
          ki(e, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Qm.get(a) || a, ki(e, a, n));
      }
    }
    function zo(e, t, a, n, s, l) {
      switch (a) {
        case "style":
          Yc(e, n, l);
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
          typeof n == "string" ? Ln(e, n) : (typeof n == "number" || typeof n == "bigint") && Ln(e, "" + n);
          break;
        case "onScroll":
          n != null && Ae("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ae("scrollend", e);
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
          if (!_c.hasOwnProperty(a)) e: {
            if (a[0] === "o" && a[1] === "n" && (s = a.endsWith("Capture"), t = a.slice(2, s ? a.length - 7 : void 0), l = e[kt] || null, l = l != null ? l[a] : null, typeof l == "function" && e.removeEventListener(t, l, s), typeof n == "function")) {
              typeof l != "function" && l !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, s);
              break e;
            }
            a in e ? e[a] = n : n === true ? e.setAttribute(a, "") : ki(e, a, n);
          }
      }
    }
    function gt(e, t, a) {
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
          Ae("error", e), Ae("load", e);
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
                He(e, t, l, o, a, null);
            }
          }
          s && He(e, t, "srcSet", a.srcSet, a, null), n && He(e, t, "src", a.src, a, null);
          return;
        case "input":
          Ae("invalid", e);
          var d = l = o = s = null, g = null, I = null;
          for (n in a) if (a.hasOwnProperty(n)) {
            var B = a[n];
            if (B != null) switch (n) {
              case "name":
                s = B;
                break;
              case "type":
                o = B;
                break;
              case "checked":
                g = B;
                break;
              case "defaultChecked":
                I = B;
                break;
              case "value":
                l = B;
                break;
              case "defaultValue":
                d = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(u(137, t));
                break;
              default:
                He(e, t, n, B, a, null);
            }
          }
          Bc(e, l, d, g, I, o, s, false);
          return;
        case "select":
          Ae("invalid", e), n = o = l = null;
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
              He(e, t, s, d, a, null);
          }
          t = l, a = o, e.multiple = !!n, t != null ? Un(e, !!n, t, false) : a != null && Un(e, !!n, a, true);
          return;
        case "textarea":
          Ae("invalid", e), l = s = n = null;
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
              He(e, t, o, d, a, null);
          }
          Hc(e, n, s, l);
          return;
        case "option":
          for (g in a) if (a.hasOwnProperty(g) && (n = a[g], n != null)) switch (g) {
            case "selected":
              e.selected = n && typeof n != "function" && typeof n != "symbol";
              break;
            default:
              He(e, t, g, n, a, null);
          }
          return;
        case "dialog":
          Ae("beforetoggle", e), Ae("toggle", e), Ae("cancel", e), Ae("close", e);
          break;
        case "iframe":
        case "object":
          Ae("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < ti.length; n++) Ae(ti[n], e);
          break;
        case "image":
          Ae("error", e), Ae("load", e);
          break;
        case "details":
          Ae("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Ae("error", e), Ae("load", e);
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
              He(e, t, I, n, a, null);
          }
          return;
        default:
          if (Vl(t)) {
            for (B in a) a.hasOwnProperty(B) && (n = a[B], n !== void 0 && zo(e, t, B, n, a, void 0));
            return;
          }
      }
      for (d in a) a.hasOwnProperty(d) && (n = a[d], n != null && He(e, t, d, n, a, null));
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
          var s = null, l = null, o = null, d = null, g = null, I = null, B = null;
          for (_ in a) {
            var Y = a[_];
            if (a.hasOwnProperty(_) && Y != null) switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = Y;
              default:
                n.hasOwnProperty(_) || He(e, t, _, null, n, Y);
            }
          }
          for (var E in n) {
            var _ = n[E];
            if (Y = a[E], n.hasOwnProperty(E) && (_ != null || Y != null)) switch (E) {
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
                B = _;
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
                _ !== Y && He(e, t, E, _, n, Y);
            }
          }
          Ql(e, o, d, g, I, B, l, s);
          return;
        case "select":
          _ = o = d = E = null;
          for (l in a) if (g = a[l], a.hasOwnProperty(l) && g != null) switch (l) {
            case "value":
              break;
            case "multiple":
              _ = g;
            default:
              n.hasOwnProperty(l) || He(e, t, l, null, n, g);
          }
          for (s in n) if (l = n[s], g = a[s], n.hasOwnProperty(s) && (l != null || g != null)) switch (s) {
            case "value":
              E = l;
              break;
            case "defaultValue":
              d = l;
              break;
            case "multiple":
              o = l;
            default:
              l !== g && He(e, t, s, l, n, g);
          }
          t = d, a = o, n = _, E != null ? Un(e, !!a, E, false) : !!n != !!a && (t != null ? Un(e, !!a, t, true) : Un(e, !!a, a ? [] : "", false));
          return;
        case "textarea":
          _ = E = null;
          for (d in a) if (s = a[d], a.hasOwnProperty(d) && s != null && !n.hasOwnProperty(d)) switch (d) {
            case "value":
              break;
            case "children":
              break;
            default:
              He(e, t, d, null, n, s);
          }
          for (o in n) if (s = n[o], l = a[o], n.hasOwnProperty(o) && (s != null || l != null)) switch (o) {
            case "value":
              E = s;
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
              s !== l && He(e, t, o, s, n, l);
          }
          qc(e, E, _);
          return;
        case "option":
          for (var ie in a) if (E = a[ie], a.hasOwnProperty(ie) && E != null && !n.hasOwnProperty(ie)) switch (ie) {
            case "selected":
              e.selected = false;
              break;
            default:
              He(e, t, ie, null, n, E);
          }
          for (g in n) if (E = n[g], _ = a[g], n.hasOwnProperty(g) && E !== _ && (E != null || _ != null)) switch (g) {
            case "selected":
              e.selected = E && typeof E != "function" && typeof E != "symbol";
              break;
            default:
              He(e, t, g, E, n, _);
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
          for (var me in a) E = a[me], a.hasOwnProperty(me) && E != null && !n.hasOwnProperty(me) && He(e, t, me, null, n, E);
          for (I in n) if (E = n[I], _ = a[I], n.hasOwnProperty(I) && E !== _ && (E != null || _ != null)) switch (I) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (E != null) throw Error(u(137, t));
              break;
            default:
              He(e, t, I, E, n, _);
          }
          return;
        default:
          if (Vl(t)) {
            for (var Ge in a) E = a[Ge], a.hasOwnProperty(Ge) && E !== void 0 && !n.hasOwnProperty(Ge) && zo(e, t, Ge, void 0, n, E);
            for (B in n) E = n[B], _ = a[B], !n.hasOwnProperty(B) || E === _ || E === void 0 && _ === void 0 || zo(e, t, B, E, n, _);
            return;
          }
      }
      for (var S in a) E = a[S], a.hasOwnProperty(S) && E != null && !n.hasOwnProperty(S) && He(e, t, S, null, n, E);
      for (Y in n) E = n[Y], _ = a[Y], !n.hasOwnProperty(Y) || E === _ || E == null && _ == null || He(e, t, Y, E, n, _);
    }
    function Xf(e) {
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
          if (l && d && Xf(o)) {
            for (o = 0, d = s.responseEnd, n += 1; n < a.length; n++) {
              var g = a[n], I = g.startTime;
              if (I > d) break;
              var B = g.transferSize, Y = g.initiatorType;
              B && Xf(Y) && (g = g.responseEnd, o += B * (g < d ? 1 : (d - I) / (g - I)));
            }
            if (--n, t += 8 * (l + o) / (s.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var _o = null, Do = null;
    function bl(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Vf(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Zf(e, t) {
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
    function Uo(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Lo = null;
    function bh() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Lo ? false : (Lo = e, true) : (Lo = null, false);
    }
    var Kf = typeof setTimeout == "function" ? setTimeout : void 0, wh = typeof clearTimeout == "function" ? clearTimeout : void 0, Jf = typeof Promise == "function" ? Promise : void 0, kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jf < "u" ? function(e) {
      return Jf.resolve(null).then(e).catch(Sh);
    } : Kf;
    function Sh(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Fa(e) {
      return e === "head";
    }
    function Ff(e, t) {
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
        else if (a === "html") ni(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, ni(a);
          for (var l = a.firstChild; l; ) {
            var o = l.nextSibling, d = l.nodeName;
            l[ks] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && l.rel.toLowerCase() === "stylesheet" || a.removeChild(l), l = o;
          }
        } else a === "body" && ni(e.ownerDocument.body);
        a = s;
      } while (a);
      hs(t);
    }
    function $f(e, t) {
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
    function Oo(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Oo(a), Gl(a);
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
          if (!e[ks]) switch (t) {
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
        if (e = Jt(e.nextSibling), e === null) break;
      }
      return null;
    }
    function xh(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Jt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Wf(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Jt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Bo(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function qo(e) {
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
    function Jt(e) {
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
    var Ho = null;
    function Pf(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === "/$" || a === "/&") {
            if (t === 0) return Jt(e.nextSibling);
            t--;
          } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function e1(e) {
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
    function t1(e, t, a) {
      switch (t = bl(a), e) {
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
    function ni(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Gl(e);
    }
    var Ft = /* @__PURE__ */ new Map(), a1 = /* @__PURE__ */ new Set();
    function wl(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var ja = R.d;
    R.d = {
      f: jh,
      r: Ah,
      D: Ih,
      C: Nh,
      L: Eh,
      m: Rh,
      X: zh,
      S: Th,
      M: _h
    };
    function jh() {
      var e = ja.f(), t = dl();
      return e || t;
    }
    function Ah(e) {
      var t = zn(e);
      t !== null && t.tag === 5 && t.type === "form" ? vd(t) : ja.r(e);
    }
    var ds = typeof document > "u" ? null : document;
    function n1(e, t, a) {
      var n = ds;
      if (n && typeof t == "string" && t) {
        var s = Gt(t);
        s = 'link[rel="' + e + '"][href="' + s + '"]', typeof a == "string" && (s += '[crossorigin="' + a + '"]'), a1.has(s) || (a1.add(s), e = {
          rel: e,
          crossOrigin: a,
          href: t
        }, n.querySelector(s) === null && (t = n.createElement("link"), gt(t, "link", e), ut(t), n.head.appendChild(t)));
      }
    }
    function Ih(e) {
      ja.D(e), n1("dns-prefetch", e, null);
    }
    function Nh(e, t) {
      ja.C(e, t), n1("preconnect", e, t);
    }
    function Eh(e, t, a) {
      ja.L(e, t, a);
      var n = ds;
      if (n && e && t) {
        var s = 'link[rel="preload"][as="' + Gt(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (s += '[imagesrcset="' + Gt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (s += '[imagesizes="' + Gt(a.imageSizes) + '"]')) : s += '[href="' + Gt(e) + '"]';
        var l = s;
        switch (t) {
          case "style":
            l = fs(e);
            break;
          case "script":
            l = ms(e);
        }
        Ft.has(l) || (e = D({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        }, a), Ft.set(l, e), n.querySelector(s) !== null || t === "style" && n.querySelector(si(l)) || t === "script" && n.querySelector(ii(l)) || (t = n.createElement("link"), gt(t, "link", e), ut(t), n.head.appendChild(t)));
      }
    }
    function Rh(e, t) {
      ja.m(e, t);
      var a = ds;
      if (a && e) {
        var n = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Gt(n) + '"][href="' + Gt(e) + '"]', l = s;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            l = ms(e);
        }
        if (!Ft.has(l) && (e = D({
          rel: "modulepreload",
          href: e
        }, t), Ft.set(l, e), a.querySelector(s) === null)) {
          switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (a.querySelector(ii(l))) return;
          }
          n = a.createElement("link"), gt(n, "link", e), ut(n), a.head.appendChild(n);
        }
      }
    }
    function Th(e, t, a) {
      ja.S(e, t, a);
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
          if (o = n.querySelector(si(l))) d.loading = 5;
          else {
            e = D({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, a), (a = Ft.get(l)) && Go(e, a);
            var g = o = n.createElement("link");
            ut(g), gt(g, "link", e), g._p = new Promise(function(I, B) {
              g.onload = I, g.onerror = B;
            }), g.addEventListener("load", function() {
              d.loading |= 1;
            }), g.addEventListener("error", function() {
              d.loading |= 2;
            }), d.loading |= 4, kl(o, t, n);
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
      ja.X(e, t);
      var a = ds;
      if (a && e) {
        var n = _n(a).hoistableScripts, s = ms(e), l = n.get(s);
        l || (l = a.querySelector(ii(s)), l || (e = D({
          src: e,
          async: true
        }, t), (t = Ft.get(s)) && Yo(e, t), l = a.createElement("script"), ut(l), gt(l, "link", e), a.head.appendChild(l)), l = {
          type: "script",
          instance: l,
          count: 1,
          state: null
        }, n.set(s, l));
      }
    }
    function _h(e, t) {
      ja.M(e, t);
      var a = ds;
      if (a && e) {
        var n = _n(a).hoistableScripts, s = ms(e), l = n.get(s);
        l || (l = a.querySelector(ii(s)), l || (e = D({
          src: e,
          async: true,
          type: "module"
        }, t), (t = Ft.get(s)) && Yo(e, t), l = a.createElement("script"), ut(l), gt(l, "link", e), a.head.appendChild(l)), l = {
          type: "script",
          instance: l,
          count: 1,
          state: null
        }, n.set(s, l));
      }
    }
    function s1(e, t, a, n) {
      var s = (s = ke.current) ? wl(s) : null;
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
            }, l.set(e, o), (l = s.querySelector(si(e))) && !l._p && (o.instance = l, o.state.loading = 5), Ft.has(e) || (a = {
              rel: "preload",
              as: "style",
              href: a.href,
              crossOrigin: a.crossOrigin,
              integrity: a.integrity,
              media: a.media,
              hrefLang: a.hrefLang,
              referrerPolicy: a.referrerPolicy
            }, Ft.set(e, a), l || Dh(s, e, a, o.state))), t && n === null) throw Error(u(528, ""));
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
      return 'href="' + Gt(e) + '"';
    }
    function si(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function i1(e) {
      return D({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Dh(e, t, a, n) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
        return n.loading |= 1;
      }), t.addEventListener("error", function() {
        return n.loading |= 2;
      }), gt(t, "link", a), ut(t), e.head.appendChild(t));
    }
    function ms(e) {
      return '[src="' + Gt(e) + '"]';
    }
    function ii(e) {
      return "script[async]" + e;
    }
    function l1(e, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var n = e.querySelector('style[data-href~="' + Gt(a.href) + '"]');
          if (n) return t.instance = n, ut(n), n;
          var s = D({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement("style"), ut(n), gt(n, "style", s), kl(n, a.precedence, e), t.instance = n;
        case "stylesheet":
          s = fs(a.href);
          var l = e.querySelector(si(s));
          if (l) return t.state.loading |= 4, t.instance = l, ut(l), l;
          n = i1(a), (s = Ft.get(s)) && Go(n, s), l = (e.ownerDocument || e).createElement("link"), ut(l);
          var o = l;
          return o._p = new Promise(function(d, g) {
            o.onload = d, o.onerror = g;
          }), gt(l, "link", n), t.state.loading |= 4, kl(l, a.precedence, e), t.instance = l;
        case "script":
          return l = ms(a.src), (s = e.querySelector(ii(l))) ? (t.instance = s, ut(s), s) : (n = a, (s = Ft.get(l)) && (n = D({}, a), Yo(n, s)), e = e.ownerDocument || e, s = e.createElement("script"), ut(s), gt(s, "link", n), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, kl(n, a.precedence, e));
      return t.instance;
    }
    function kl(e, t, a) {
      for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), s = n.length ? n[n.length - 1] : null, l = s, o = 0; o < n.length; o++) {
        var d = n[o];
        if (d.dataset.precedence === t) l = d;
        else if (l !== s) break;
      }
      l ? l.parentNode.insertBefore(e, l.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Go(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Yo(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var Sl = null;
    function r1(e, t, a) {
      if (Sl === null) {
        var n = /* @__PURE__ */ new Map(), s = Sl = /* @__PURE__ */ new Map();
        s.set(a, n);
      } else s = Sl, n = s.get(a), n || (n = /* @__PURE__ */ new Map(), s.set(a, n));
      if (n.has(e)) return n;
      for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
        var l = a[s];
        if (!(l[ks] || l[ft] || e === "link" && l.getAttribute("rel") === "stylesheet") && l.namespaceURI !== "http://www.w3.org/2000/svg") {
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
    function o1(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null);
    }
    function Uh(e, t, a) {
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
    function c1(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function Lh(e, t, a, n) {
      if (a.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var s = fs(n.href), l = t.querySelector(si(s));
          if (l) {
            t = l._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Cl.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = l, ut(l);
            return;
          }
          l = t.ownerDocument || t, n = i1(n), (s = Ft.get(s)) && Go(n, s), l = l.createElement("link"), ut(l);
          var o = l;
          o._p = new Promise(function(d, g) {
            o.onload = d, o.onerror = g;
          }), gt(l, "link", n), a.instance = l;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Cl.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    var Qo = 0;
    function Oh(e, t) {
      return e.stylesheets && e.count === 0 && Ml(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var n = setTimeout(function() {
          if (e.stylesheets && Ml(e, e.stylesheets), e.unsuspend) {
            var l = e.unsuspend;
            e.unsuspend = null, l();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Qo === 0 && (Qo = 62500 * vh());
        var s = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && Ml(e, e.stylesheets), e.unsuspend)) {
            var l = e.unsuspend;
            e.unsuspend = null, l();
          }
        }, (e.imgBytes > Qo ? 50 : 800) + t);
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(n), clearTimeout(s);
        };
      } : null;
    }
    function Cl() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) Ml(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var xl = null;
    function Ml(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, xl = /* @__PURE__ */ new Map(), t.forEach(Bh, e), xl = null, Cl.call(e));
    }
    function Bh(e, t) {
      if (!(t.state.loading & 4)) {
        var a = xl.get(e);
        if (a) var n = a.get(null);
        else {
          a = /* @__PURE__ */ new Map(), xl.set(e, a);
          for (var s = e.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0; l < s.length; l++) {
            var o = s[l];
            (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (a.set(o.dataset.precedence, o), n = o);
          }
          n && a.set(null, n);
        }
        s = t.instance, o = s.getAttribute("data-precedence"), l = a.get(o) || n, l === n && a.set(null, s), a.set(o, s), this.count++, n = Cl.bind(this), s.addEventListener("load", n), s.addEventListener("error", n), l ? l.parentNode.insertBefore(s, l.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
      }
    }
    var li = {
      $$typeof: le,
      Provider: null,
      Consumer: null,
      _currentValue: W,
      _currentValue2: W,
      _threadCount: 0
    };
    function qh(e, t, a, n, s, l, o, d, g) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ol(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ol(0), this.hiddenUpdates = Ol(null), this.identifierPrefix = n, this.onUncaughtError = s, this.onCaughtError = l, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function u1(e, t, a, n, s, l, o, d, g, I, B, Y) {
      return e = new qh(e, t, a, o, g, I, B, Y, d), t = 1, l === true && (t |= 24), l = Tt(3, null, null, t), e.current = l, l.stateNode = e, t = Sr(), t.refCount++, e.pooledCache = t, t.refCount++, l.memoizedState = {
        element: n,
        isDehydrated: a,
        cache: t
      }, jr(l), e;
    }
    function d1(e) {
      return e ? (e = Qn, e) : Qn;
    }
    function f1(e, t, a, n, s, l) {
      s = d1(s), n.context === null ? n.context = s : n.pendingContext = s, n = Ba(t), n.payload = {
        element: a
      }, l = l === void 0 ? null : l, l !== null && (n.callback = l), a = qa(e, n, t), a !== null && (At(a, e, t), Os(a, e, t));
    }
    function m1(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Xo(e, t) {
      m1(e, t), (e = e.alternate) && m1(e, t);
    }
    function h1(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = hn(e, 67108864);
        t !== null && At(t, e, 67108864), Xo(e, 67108864);
      }
    }
    function p1(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Lt();
        t = Bl(t);
        var a = hn(e, t);
        a !== null && At(a, e, t), Xo(e, t);
      }
    }
    var jl = true;
    function Hh(e, t, a, n) {
      var s = w.T;
      w.T = null;
      var l = R.p;
      try {
        R.p = 2, Vo(e, t, a, n);
      } finally {
        R.p = l, w.T = s;
      }
    }
    function Gh(e, t, a, n) {
      var s = w.T;
      w.T = null;
      var l = R.p;
      try {
        R.p = 8, Vo(e, t, a, n);
      } finally {
        R.p = l, w.T = s;
      }
    }
    function Vo(e, t, a, n) {
      if (jl) {
        var s = Zo(n);
        if (s === null) To(e, t, n, Al, a), y1(e, n);
        else if (Qh(s, e, t, a, n)) n.stopPropagation();
        else if (y1(e, n), t & 4 && -1 < Yh.indexOf(e)) {
          for (; s !== null; ) {
            var l = zn(s);
            if (l !== null) switch (l.tag) {
              case 3:
                if (l = l.stateNode, l.current.memoizedState.isDehydrated) {
                  var o = cn(l.pendingLanes);
                  if (o !== 0) {
                    var d = l;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var g = 1 << 31 - Et(o);
                      d.entanglements[1] |= g, o &= ~g;
                    }
                    sa(l), (Ue & 6) === 0 && (cl = X() + 500, ei(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = hn(l, 2), d !== null && At(d, l, 2), dl(), Xo(l, 2);
            }
            if (l = Zo(n), l === null && To(e, t, n, Al, a), l === s) break;
            s = l;
          }
          s !== null && n.stopPropagation();
        } else To(e, t, n, null, a);
      }
    }
    function Zo(e) {
      return e = Kl(e), Ko(e);
    }
    var Al = null;
    function Ko(e) {
      if (Al = null, e = Tn(e), e !== null) {
        var t = h(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = x(t), e !== null) return e;
            e = null;
          } else if (a === 31) {
            if (e = j(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return Al = e, null;
    }
    function g1(e) {
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
          switch (P()) {
            case ce:
              return 2;
            case Le:
              return 8;
            case nt:
            case Fe:
              return 32;
            case qt:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Jo = false, $a = null, Wa = null, Pa = null, ri = /* @__PURE__ */ new Map(), oi = /* @__PURE__ */ new Map(), en = [], Yh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function y1(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          $a = null;
          break;
        case "dragenter":
        case "dragleave":
          Wa = null;
          break;
        case "mouseover":
        case "mouseout":
          Pa = null;
          break;
        case "pointerover":
        case "pointerout":
          ri.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          oi.delete(t.pointerId);
      }
    }
    function ci(e, t, a, n, s, l) {
      return e === null || e.nativeEvent !== l ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: n,
        nativeEvent: l,
        targetContainers: [
          s
        ]
      }, t !== null && (t = zn(t), t !== null && h1(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
    }
    function Qh(e, t, a, n, s) {
      switch (t) {
        case "focusin":
          return $a = ci($a, e, t, a, n, s), true;
        case "dragenter":
          return Wa = ci(Wa, e, t, a, n, s), true;
        case "mouseover":
          return Pa = ci(Pa, e, t, a, n, s), true;
        case "pointerover":
          var l = s.pointerId;
          return ri.set(l, ci(ri.get(l) || null, e, t, a, n, s)), true;
        case "gotpointercapture":
          return l = s.pointerId, oi.set(l, ci(oi.get(l) || null, e, t, a, n, s)), true;
      }
      return false;
    }
    function v1(e) {
      var t = Tn(e.target);
      if (t !== null) {
        var a = h(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = x(a), t !== null) {
              e.blockedOn = t, Rc(e.priority, function() {
                p1(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = j(a), t !== null) {
              e.blockedOn = t, Rc(e.priority, function() {
                p1(a);
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
    function Il(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Zo(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var n = new a.constructor(a.type, a);
          Zl = n, a.target.dispatchEvent(n), Zl = null;
        } else return t = zn(a), t !== null && h1(t), e.blockedOn = a, false;
        t.shift();
      }
      return true;
    }
    function b1(e, t, a) {
      Il(e) && a.delete(t);
    }
    function Xh() {
      Jo = false, $a !== null && Il($a) && ($a = null), Wa !== null && Il(Wa) && (Wa = null), Pa !== null && Il(Pa) && (Pa = null), ri.forEach(b1), oi.forEach(b1);
    }
    function Nl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Jo || (Jo = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Xh)));
    }
    var El = null;
    function w1(e) {
      El !== e && (El = e, r.unstable_scheduleCallback(r.unstable_NormalPriority, function() {
        El === e && (El = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], n = e[t + 1], s = e[t + 2];
          if (typeof n != "function") {
            if (Ko(n || a) === null) continue;
            break;
          }
          var l = zn(a);
          l !== null && (e.splice(t, 3), t -= 3, Vr(l, {
            pending: true,
            data: s,
            method: a.method,
            action: n
          }, n, s));
        }
      }));
    }
    function hs(e) {
      function t(g) {
        return Nl(g, e);
      }
      $a !== null && Nl($a, e), Wa !== null && Nl(Wa, e), Pa !== null && Nl(Pa, e), ri.forEach(t), oi.forEach(t);
      for (var a = 0; a < en.length; a++) {
        var n = en[a];
        n.blockedOn === e && (n.blockedOn = null);
      }
      for (; 0 < en.length && (a = en[0], a.blockedOn === null); ) v1(a), a.blockedOn === null && en.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
        var s = a[n], l = a[n + 1], o = s[kt] || null;
        if (typeof l == "function") o || w1(a);
        else if (o) {
          var d = null;
          if (l && l.hasAttribute("formAction")) {
            if (s = l, o = l[kt] || null) d = o.formAction;
            else if (Ko(s) !== null) continue;
          } else d = o.action;
          typeof d == "function" ? a[n + 1] = d : (a.splice(n, 3), n -= 3), w1(a);
        }
      }
    }
    function k1() {
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
    function Fo(e) {
      this._internalRoot = e;
    }
    Rl.prototype.render = Fo.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var a = t.current, n = Lt();
      f1(a, n, e, t, null, null);
    }, Rl.prototype.unmount = Fo.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        f1(e.current, 2, null, e, null, null), dl(), t[Rn] = null;
      }
    };
    function Rl(e) {
      this._internalRoot = e;
    }
    Rl.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Ec();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var a = 0; a < en.length && t !== 0 && t < en[a].priority; a++) ;
        en.splice(a, 0, e), a === 0 && v1(e);
      }
    };
    var S1 = c.version;
    if (S1 !== "19.2.8") throw Error(u(527, S1, "19.2.8"));
    R.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
      return e = y(t), e = e !== null ? C(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var Vh = {
      bundleType: 0,
      version: "19.2.8",
      rendererPackageName: "react-dom",
      currentDispatcherRef: w,
      reconcilerVersion: "19.2.8"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Tl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Tl.isDisabled && Tl.supportsFiber) try {
        vs = Tl.inject(Vh), Nt = Tl;
      } catch {
      }
    }
    return di.createRoot = function(e, t) {
      if (!m(e)) throw Error(u(299));
      var a = false, n = "", s = Id, l = Nd, o = Ed;
      return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (l = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = u1(e, 1, false, null, null, a, n, null, s, l, o, k1), e[Rn] = t.current, Ro(e), new Fo(t);
    }, di.hydrateRoot = function(e, t, a) {
      if (!m(e)) throw Error(u(299));
      var n = false, s = "", l = Id, o = Nd, d = Ed, g = null;
      return a != null && (a.unstable_strictMode === true && (n = true), a.identifierPrefix !== void 0 && (s = a.identifierPrefix), a.onUncaughtError !== void 0 && (l = a.onUncaughtError), a.onCaughtError !== void 0 && (o = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (g = a.formState)), t = u1(e, 1, true, t, a ?? null, n, s, g, l, o, d, k1), t.context = d1(null), a = t.current, n = Lt(), n = Bl(n), s = Ba(n), s.callback = null, qa(a, s, n), a = n, t.current.lanes = a, ws(t, a), sa(t), e[Rn] = t.current, Ro(e), new Rl(t);
    }, di.version = "19.2.8", di;
  }
  var T1;
  function ap() {
    if (T1) return Po.exports;
    T1 = 1;
    function r() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (c) {
        console.error(c);
      }
    }
    return r(), Po.exports = tp(), Po.exports;
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
  function Nn(r) {
    return r >= 2200 ? "Grandmaster" : r >= 1800 ? "Master" : r >= 1400 ? "Diamond" : r >= 1200 ? "Platinum" : r >= 1e3 ? "Gold" : r >= 800 ? "Silver" : r >= 501 ? "Bronze" : "Copper";
  }
  function uc(r) {
    const c = Nn(r), f = {
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
  function hi(r) {
    const c = Nn(r), f = uc(r);
    return `${c} ${f === 1 ? "I" : f === 2 ? "II" : "III"}`;
  }
  function lp(r, c) {
    return c > r && (Nn(r) !== Nn(c) || uc(r) !== uc(c));
  }
  function ia({ label: r, value: c, detail: f }) {
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
  function am({ form: r }) {
    return i.jsx("span", {
      className: "form-pips",
      "aria-label": `Recent form ${r.join(", ")}`,
      children: r.map((c, f) => i.jsx("i", {
        className: `pip ${c}`,
        title: c.toUpperCase()
      }, `${c}-${f}`))
    });
  }
  const rp = (r) => r.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), nm = (...r) => r.filter((c, f, u) => !!c && c.trim() !== "" && u.indexOf(c) === f).join(" ").trim();
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
  const cp = T.forwardRef(({ color: r = "currentColor", size: c = 24, strokeWidth: f = 2, absoluteStrokeWidth: u, className: m = "", children: h, iconNode: x, ...j }, k) => T.createElement("svg", {
    ref: k,
    ...op,
    width: c,
    height: c,
    stroke: r,
    strokeWidth: u ? Number(f) * 24 / Number(c) : f,
    className: nm("lucide", m),
    ...j
  }, [
    ...x.map(([y, C]) => T.createElement(y, C)),
    ...Array.isArray(h) ? h : [
      h
    ]
  ]));
  const xe = (r, c) => {
    const f = T.forwardRef(({ className: u, ...m }, h) => T.createElement(cp, {
      ref: h,
      iconNode: c,
      className: nm(`lucide-${rp(r)}`, u),
      ...m
    }));
    return f.displayName = `${r}`, f;
  };
  const up = xe("ArrowLeft", [
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
  const dp = xe("ArrowRight", [
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
  const sm = xe("CalendarDays", [
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
  const fp = xe("ChartColumn", [
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
  const pi = xe("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const mp = xe("CircleCheck", [
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
  const hp = xe("CircleHelp", [
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
  const im = xe("CircleX", [
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
  const lm = xe("Clock3", [
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
  const pp = xe("Clock", [
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
  const gp = xe("Copy", [
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
  const yp = xe("Crown", [
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
  const dc = xe("Gamepad2", [
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
  const vp = xe("History", [
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
  const bp = xe("House", [
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
  const wp = xe("Info", [
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
  const rm = xe("LoaderCircle", [
    [
      "path",
      {
        d: "M21 12a9 9 0 1 1-6.219-8.56",
        key: "13zald"
      }
    ]
  ]);
  const om = xe("LogIn", [
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
  const kp = xe("LogOut", [
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
  const cm = xe("MessageCircle", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ]
  ]);
  const Sp = xe("MessageSquare", [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz"
      }
    ]
  ]);
  const um = xe("Minus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ]
  ]);
  const Cp = xe("Plus", [
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
  const z1 = xe("RefreshCw", [
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
  const _l = xe("Search", [
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
  const wc = xe("Send", [
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
  const fc = xe("Settings", [
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
  const dm = xe("Shield", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ]);
  const xp = xe("Shuffle", [
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
  const Mp = xe("Sparkles", [
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
  const fm = xe("Star", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ]);
  const gi = xe("Swords", [
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
  const jp = xe("TriangleAlert", [
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
  const Ap = xe("Trophy", [
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
  const nc = xe("UserMinus", [
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
  const Ip = xe("UserPlus", [
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
  const Np = xe("User", [
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
  const ys = xe("Users", [
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
  const Ep = xe("Wrench", [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ]);
  const En = xe("X", [
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
  function Rp({ maps: r, limit: c, selectedMapIds: f, onToggle: u, favoriteMapId: m, onFavorite: h, disabled: x = false }) {
    const j = c === void 0 ? r : r.slice(0, c), k = f !== void 0 && u !== void 0;
    return i.jsx("div", {
      className: "map-pool",
      children: j.map((y) => {
        const C = !k || f.includes(y.id), D = i.jsxs(i.Fragment, {
          children: [
            i.jsx("img", {
              src: y.thumbnailUrl,
              alt: ""
            }),
            i.jsx("span", {
              className: "map-name",
              children: y.name
            })
          ]
        });
        return k ? i.jsxs("div", {
          className: "map-thumbnail-wrap",
          children: [
            i.jsx("button", {
              className: C ? "map-thumbnail selected" : "map-thumbnail",
              type: "button",
              "aria-pressed": C,
              "aria-label": `${C ? "Exclude" : "Include"} ${y.name}`,
              disabled: x,
              onClick: () => u(y.id),
              children: D
            }),
            h && i.jsx("button", {
              className: m === y.id ? "map-favorite active" : "map-favorite",
              type: "button",
              disabled: x,
              "aria-pressed": m === y.id,
              "aria-label": `${m === y.id ? "Remove" : "Favorite"} ${y.name}`,
              title: m === y.id ? "Remove favorite" : "Set as favorite",
              onClick: () => h(y.id),
              children: i.jsx(fm, {
                size: 16,
                fill: m === y.id ? "currentColor" : "none"
              })
            })
          ]
        }, y.id) : i.jsx("figure", {
          className: "map-thumbnail selected",
          children: D
        }, y.id);
      })
    });
  }
  const Tp = 5, zp = [
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
  ], _p = [
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
  ], Dp = {
    version: Tp,
    groups: zp,
    maps: _p
  }, It = Dp, Up = new Map(It.maps.map((r) => [
    r.id,
    r
  ])), kc = It.maps.filter((r) => r.enabled !== false);
  function mm(r) {
    return Up.get(r);
  }
  function Lp(r, c, f = Math.random) {
    var _a2, _b;
    const u = new Set(c.mapPool.map((y) => y.id)), m = r.mapPool.filter((y) => u.has(y.id));
    if (m.length === 0) return;
    const h = new Set(Object.values(((_a2 = r.mapPreferences) == null ? void 0 : _a2.favoriteMapIds) ?? {})), x = new Set(Object.values(((_b = c.mapPreferences) == null ? void 0 : _b.favoriteMapIds) ?? {})), j = m.filter((y) => h.has(y.id) && x.has(y.id));
    if (j.length > 0) return j[Math.floor(f() * j.length)];
    const k = m.flatMap((y) => Array.from({
      length: 1 + Number(h.has(y.id)) + Number(x.has(y.id))
    }, () => y));
    return k[Math.floor(f() * k.length)];
  }
  const Op = "" + new URL("acropolis-wApZU8dN.png", import.meta.url).href, Bp = "" + new URL("african-clearing--8pL0rBU.png", import.meta.url).href, qp = "" + new URL("arabia-DEdeLqx5.png", import.meta.url).href, Hp = "" + new URL("arena-CISRjdFq.png", import.meta.url).href, Gp = "" + new URL("atacama-CxHEccMV.png", import.meta.url).href, Yp = "" + new URL("baltic-DlU6ncMk.png", import.meta.url).href, Qp = "" + new URL("black-forest-CTgJoH8n.png", import.meta.url).href, Xp = "" + new URL("fortified-clearing-DSf9SH4j.png", import.meta.url).href, Vp = "" + new URL("four-lakes-DxiZ0myb.png", import.meta.url).href, Zp = "" + new URL("golden-swamp-DXKIJwHr.png", import.meta.url).href, Kp = "" + new URL("gold-rush-BqrgFIGq.png", import.meta.url).href, Jp = "" + new URL("hideout-hd8sM5kE.png", import.meta.url).href, Fp = "" + new URL("islands-DmKyUyda.png", import.meta.url).href, $p = "" + new URL("land-madness-3-nLWb05.png", import.meta.url).href, Wp = "" + new URL("land-nomad-DxHp81Hp.png", import.meta.url).href, Pp = "" + new URL("mediterranean-CKpZDwRi.png", import.meta.url).href, e0 = "" + new URL("michi-Cry_Jx1o.png", import.meta.url).href, t0 = JSON.parse(`[{"profileId":197964,"steamId":"76561198179087382","name":"_LY_Yo","rating":2903,"rank":1,"wins":2972,"losses":1666,"streak":3,"countryCode":"CN"},{"profileId":9423131,"steamId":"76561198259300707","name":"wR.Lucho","rating":2893,"rank":2,"wins":4312,"losses":3062,"streak":2,"countryCode":"AR"},{"profileId":271202,"steamId":"76561198000635167","name":"Oni.Vinchester","rating":2881,"rank":3,"wins":1823,"losses":721,"streak":5,"countryCode":"RU"},{"profileId":199325,"steamId":"76561198449406083","name":"VIT | Hera","rating":2868,"rank":4,"wins":5148,"losses":1725,"streak":7,"countryCode":"CA"},{"profileId":212721,"steamId":"76561198116921964","name":"TAG_Sitaux","rating":2849,"rank":5,"wins":2038,"losses":735,"streak":12,"countryCode":"FR"},{"profileId":251265,"steamId":"76561197996386232","name":"TAG_MbL_","rating":2836,"rank":6,"wins":7016,"losses":3189,"streak":4,"countryCode":"NO"},{"profileId":506898,"steamId":"76561198362219694","name":"VIT Liereyy","rating":2834,"rank":7,"wins":1188,"losses":561,"streak":-2,"countryCode":"AT"},{"profileId":1136191,"steamId":"76561198070829134","name":"DS_Ciskhan","rating":2825,"rank":8,"wins":2589,"losses":1874,"streak":4,"countryCode":"FR"},{"profileId":2783660,"steamId":"76561199062883266","name":"wR.Sebastian","rating":2806,"rank":9,"wins":2444,"losses":1591,"streak":1,"countryCode":"UY"},{"profileId":208393,"steamId":"76561198027378107","name":"wR.Nicov","rating":2801,"rank":10,"wins":2305,"losses":998,"streak":5,"countryCode":"IT"},{"profileId":256338,"steamId":"76561198007187809","name":"NOC | Running","rating":2800,"rank":11,"wins":2472,"losses":1735,"streak":5,"countryCode":"DE"},{"profileId":209118,"steamId":"76561198379366846","name":"TAG_Sora Kuma","rating":2775,"rank":12,"wins":1392,"losses":1323,"streak":3,"countryCode":"TW"},{"profileId":217905,"steamId":"76561198116269715","name":"OS+ | chart","rating":2773,"rank":13,"wins":1747,"losses":1411,"streak":3,"countryCode":"JP"},{"profileId":666976,"steamId":"76561198275359848","name":"_Barles_","rating":2766,"rank":14,"wins":2771,"losses":1554,"streak":1,"countryCode":"PL"},{"profileId":2858362,"steamId":"76561198400058723","name":"Oni.JorDan_AoE","rating":2761,"rank":15,"wins":1618,"losses":1032,"streak":7,"countryCode":"DE"},{"profileId":196240,"steamId":"76561197984749679","name":"Oni.TheViper","rating":2761,"rank":16,"wins":1751,"losses":959,"streak":7,"countryCode":"DE"},{"profileId":182749,"steamId":"76561198131139989","name":"DS_Dragonstar","rating":2753,"rank":17,"wins":2227,"losses":1403,"streak":11,"countryCode":"IN"},{"profileId":10710012,"steamId":"76561199369341460","name":"_LY_\u6296\u97F3\u80A5\u9F99","rating":2746,"rank":18,"wins":1021,"losses":565,"streak":7,"countryCode":"HK"},{"profileId":4632681,"steamId":"76561198439558568","name":"DS_Overtaken","rating":2746,"rank":19,"wins":3524,"losses":2825,"streak":1,"countryCode":"EE"},{"profileId":197388,"steamId":"76561198088251629","name":"Oni.TaToH","rating":2746,"rank":20,"wins":954,"losses":343,"streak":26,"countryCode":"ES"},{"profileId":8793414,"steamId":"76561198136932885","name":"Oni.Lewis","rating":2734,"rank":21,"wins":4801,"losses":3627,"streak":-2,"countryCode":"GB"},{"profileId":582058,"steamId":"76561198032611326","name":"VIT | Hearttt","rating":2706,"rank":22,"wins":3517,"losses":1776,"streak":6,"countryCode":"PE"},{"profileId":459658,"steamId":"76561199003184910","name":"HOANG","rating":2705,"rank":23,"wins":7909,"losses":5550,"streak":1,"countryCode":"VN"},{"profileId":339835,"steamId":"76561198088783612","name":"DS_StonePleaseAoE","rating":2702,"rank":24,"wins":4416,"losses":3603,"streak":1,"countryCode":"DE"},{"profileId":208611,"steamId":"76561198325239137","name":"Villese","rating":2696,"rank":25,"wins":2493,"losses":1299,"streak":1,"countryCode":"FI"},{"profileId":2463959,"steamId":"76561199009965243","name":"RoR | Benanji","rating":2675,"rank":26,"wins":1368,"losses":984,"streak":3,"countryCode":"DE"},{"profileId":279036,"steamId":"76561198314917416","name":"m0re","rating":2670,"rank":27,"wins":2786,"losses":2436,"streak":3,"countryCode":"ES"},{"profileId":2660491,"steamId":"76561199054206296","name":"Th\xE0nh C\u1ED5 Qu\u1EA3ng Tr\u1ECB","rating":2666,"rank":28,"wins":2999,"losses":2918,"streak":-1,"countryCode":"VN"},{"profileId":1224481,"steamId":"76561198368620113","name":"KASVA","rating":2660,"rank":29,"wins":5320,"losses":4328,"streak":2,"countryCode":"TR"},{"profileId":2589331,"steamId":"76561199042505350","name":"SalzZ_AntagonisT","rating":2659,"rank":30,"wins":1445,"losses":924,"streak":4,"countryCode":"RU"},{"profileId":6097615,"steamId":"76561199188199256","name":"Oni.doguinho","rating":2656,"rank":31,"wins":357,"losses":144,"streak":3,"countryCode":"BR"},{"profileId":3176045,"steamId":"76561199054087176","name":"wR.Prisma","rating":2647,"rank":32,"wins":3702,"losses":3119,"streak":-2,"countryCode":"AR"},{"profileId":628503,"steamId":"76561198036586732","name":"Valas","rating":2642,"rank":33,"wins":1715,"losses":1193,"streak":4,"countryCode":"FI"},{"profileId":2972505,"steamId":"76561199003998451","name":"CNZS_\u65CB\u5F8B","rating":2639,"rank":34,"wins":1881,"losses":1605,"streak":6,"countryCode":"CN"},{"profileId":5984120,"steamId":"76561199184757878","name":"Ux\xB4Combito","rating":2637,"rank":35,"wins":2064,"losses":1670,"streak":10,"countryCode":"MX"},{"profileId":1531083,"steamId":"76561198056609593","name":"Oni.FreakinAndy","rating":2631,"rank":36,"wins":2864,"losses":1749,"streak":1,"countryCode":"AT"},{"profileId":226575,"steamId":"76561198313422112","name":"_LY_lyx","rating":2630,"rank":37,"wins":1775,"losses":1462,"streak":2,"countryCode":"CN"},{"profileId":198035,"steamId":"76561198044559189","name":"Oni.DauT","rating":2627,"rank":38,"wins":2093,"losses":1428,"streak":3,"countryCode":"GB"},{"profileId":2776293,"steamId":"76561199063069362","name":"Oni.Kingstone","rating":2622,"rank":39,"wins":2452,"losses":1922,"streak":1,"countryCode":"MX"},{"profileId":2920057,"steamId":"76561199069760887","name":"Ux'LobodeLaNieve","rating":2620,"rank":40,"wins":1030,"losses":714,"streak":5,"countryCode":"MX"},{"profileId":1754629,"steamId":"76561198807828662","name":"SalzZ_classicpro","rating":2618,"rank":41,"wins":1966,"losses":1128,"streak":3,"countryCode":"UA"},{"profileId":16847348,"steamId":"76561199176825525","name":"ANKR.Blve","rating":2615,"rank":42,"wins":873,"losses":786,"streak":1,"countryCode":"TW"},{"profileId":3317764,"steamId":"76561199084646199","name":"Ux'LobodeLaNieve","rating":2610,"rank":43,"wins":1020,"losses":744,"streak":3,"countryCode":"MX"},{"profileId":290617,"steamId":"76561198273707230","name":"HR Sobek","rating":2610,"rank":44,"wins":1563,"losses":1091,"streak":1,"countryCode":"CL"},{"profileId":14152531,"steamId":"76561199482561812","name":"CNZS_\u6076\u9B54\u55A7\u54D7","rating":2601,"rank":45,"wins":258,"losses":100,"streak":26,"countryCode":"CN"},{"profileId":10748832,"steamId":"76561199375097640","name":"CNZS_CC","rating":2593,"rank":46,"wins":198,"losses":67,"streak":3,"countryCode":"CN"},{"profileId":5632575,"steamId":"76561199164683206","name":"RoR | Vodka_L_2","rating":2593,"rank":47,"wins":341,"losses":171,"streak":-2,"countryCode":"IT"},{"profileId":446371,"steamId":"76561198394482759","name":"CNZS_CC","rating":2579,"rank":48,"wins":449,"losses":259,"streak":-3,"countryCode":"CN"},{"profileId":573282,"steamId":"76561198411901312","name":"NOC | Terz","rating":2578,"rank":49,"wins":1654,"losses":1429,"streak":1,"countryCode":"DE"},{"profileId":265517,"steamId":"76561198198305605","name":"CNZS_Daniel","rating":2572,"rank":50,"wins":2201,"losses":2118,"streak":2,"countryCode":"US"},{"profileId":19124429,"steamId":"76561199652718380","name":"FC enjoyer","rating":2569,"rank":51,"wins":848,"losses":710,"streak":2,"countryCode":"TW"},{"profileId":599689,"steamId":"76561198186899749","name":"RoR | Vodka_L_","rating":2565,"rank":52,"wins":1319,"losses":988,"streak":7,"countryCode":"IT"},{"profileId":576919,"steamId":"76561198082024695","name":"Babaorum","rating":2564,"rank":53,"wins":3576,"losses":2484,"streak":-2,"countryCode":"FR"},{"profileId":3144451,"steamId":"76561199076741301","name":"MING","rating":2564,"rank":54,"wins":974,"losses":732,"streak":-5,"countryCode":"CN"},{"profileId":245811,"steamId":"76561198027802048","name":"NOC | Target331","rating":2561,"rank":55,"wins":1163,"losses":772,"streak":4,"countryCode":"DE"},{"profileId":862991,"steamId":"76561197982917945","name":"OS+ | Emil :D","rating":2559,"rank":56,"wins":5041,"losses":4426,"streak":2,"countryCode":"DK"},{"profileId":19867271,"steamId":"76561199258371252","name":"OS+ | NeoZz","rating":2554,"rank":57,"wins":470,"losses":314,"streak":5,"countryCode":"FR"},{"profileId":21914183,"steamId":"76561199819400366","name":"\u6B7B\u4EA1","rating":2547,"rank":58,"wins":879,"losses":524,"streak":-2,"countryCode":"JP"},{"profileId":635884,"steamId":"76561198975568246","name":"Andre_2i","rating":2537,"rank":59,"wins":8764,"losses":7533,"streak":1,"countryCode":"RO"},{"profileId":2912198,"steamId":"76561198010312765","name":"Dennis\u54E5","rating":2536,"rank":60,"wins":3793,"losses":3421,"streak":1,"countryCode":"HK"},{"profileId":14725904,"steamId":"76561199495184931","name":"OS+ | Sziky","rating":2534,"rank":61,"wins":4706,"losses":4579,"streak":1,"countryCode":"HU"},{"profileId":2135484,"steamId":"76561199035860327","name":"bruh","rating":2526,"rank":62,"wins":2638,"losses":2181,"streak":-2,"countryCode":"BR"},{"profileId":572017,"steamId":"76561198426853065","name":"TheMax","rating":2525,"rank":63,"wins":773,"losses":382,"streak":-2,"countryCode":"FI"},{"profileId":25365699,"steamId":"76561198708662834","name":"CNZS_98T","rating":2525,"rank":64,"wins":616,"losses":269,"streak":-2,"countryCode":"NL"},{"profileId":9449579,"steamId":"76561199239517074","name":"VEN\xD3N | Miauricio","rating":2522,"rank":65,"wins":973,"losses":782,"streak":1,"countryCode":"MX"},{"profileId":11440407,"steamId":"76561199412696051","name":"\u03DF OLI \u03DF Rodrixs","rating":2521,"rank":66,"wins":1550,"losses":1461,"streak":8,"countryCode":"AR"},{"profileId":1893397,"steamId":"76561198263360370","name":"Oni.GoKu","rating":2515,"rank":67,"wins":772,"losses":685,"streak":3,"countryCode":"BR"},{"profileId":2859256,"steamId":"76561198964341449","name":"RoR | Thofou05","rating":2514,"rank":68,"wins":848,"losses":629,"streak":-5,"countryCode":"BE"},{"profileId":3884287,"steamId":"76561199101842491","name":"DaddySt4rk","rating":2508,"rank":69,"wins":1971,"losses":1392,"streak":2,"countryCode":"BR"},{"profileId":197930,"steamId":"76561198088178833","name":"T90Official","rating":2508,"rank":70,"wins":2899,"losses":2320,"streak":7,"countryCode":"US"},{"profileId":20557174,"steamId":"76561199757960970","name":"KSV","rating":2505,"rank":71,"wins":129,"losses":38,"streak":-1,"countryCode":"TR"},{"profileId":10266593,"steamId":"76561198025515869","name":"RedPhosphoru","rating":2502,"rank":72,"wins":3855,"losses":3310,"streak":3,"countryCode":"US"},{"profileId":409748,"steamId":"76561198099659716","name":"wR.Capoch","rating":2501,"rank":73,"wins":1738,"losses":1194,"streak":1,"countryCode":"AR"},{"profileId":5188554,"steamId":"76561198244808072","name":"Lamo","rating":2497,"rank":74,"wins":1878,"losses":1613,"streak":8,"countryCode":"LV"},{"profileId":1966276,"steamId":"76561198376755697","name":"CNZS_MING","rating":2497,"rank":75,"wins":1629,"losses":1295,"streak":-2,"countryCode":"CN"},{"profileId":21627109,"steamId":"76561199812084808","name":"Ux'Uzzi","rating":2495,"rank":76,"wins":719,"losses":663,"streak":1,"countryCode":"MX"},{"profileId":726223,"steamId":"76561198258097856","name":"TAG_Z40","rating":2494,"rank":77,"wins":3428,"losses":2740,"streak":-2,"countryCode":"TW"},{"profileId":2444511,"steamId":"76561199050196526","name":"Gabi","rating":2491,"rank":78,"wins":3484,"losses":2813,"streak":-2,"countryCode":"BR"},{"profileId":2309468,"steamId":"76561198873127128","name":"AiM | Whocl","rating":2490,"rank":79,"wins":2636,"losses":2263,"streak":3,"countryCode":"CL"},{"profileId":211351,"steamId":"76561198262978341","name":"CNZS_Bad Koala","rating":2487,"rank":80,"wins":1755,"losses":1462,"streak":-2,"countryCode":"CN"},{"profileId":11364437,"steamId":"76561199403774380","name":"ANKR.Youpudding","rating":2481,"rank":81,"wins":1205,"losses":819,"streak":6,"countryCode":"TW"},{"profileId":614315,"steamId":"76561198135964589","name":"OS+ | slam","rating":2478,"rank":82,"wins":2587,"losses":1719,"streak":4,"countryCode":"CA"},{"profileId":3216208,"steamId":"76561199080676922","name":"LE | Dimo","rating":2475,"rank":83,"wins":1734,"losses":1507,"streak":2,"countryCode":"PE"},{"profileId":25183359,"steamId":"76561198718915900","name":"ThunderboltX","rating":2472,"rank":84,"wins":495,"losses":417,"streak":-2,"countryCode":"BG"},{"profileId":6779041,"steamId":"76561199211210970","name":"wR.Monoz","rating":2471,"rank":85,"wins":2480,"losses":2059,"streak":3,"countryCode":"AR"},{"profileId":1945281,"steamId":"76561198279338473","name":"Smokey","rating":2470,"rank":86,"wins":616,"losses":410,"streak":1,"countryCode":"US"},{"profileId":10309103,"steamId":"76561198334062971","name":"\u03DF OLI \u03DF STAND-BY","rating":2469,"rank":87,"wins":2299,"losses":2134,"streak":3,"countryCode":"AR"},{"profileId":15345163,"steamId":"76561199514067065","name":"OS+ | TeMo","rating":2467,"rank":88,"wins":445,"losses":311,"streak":-1,"countryCode":"MA"},{"profileId":401359,"steamId":"76561198434294840","name":"VEN\xD3N | EnvyZ","rating":2466,"rank":89,"wins":1228,"losses":1003,"streak":9,"countryCode":"MX"},{"profileId":15097184,"steamId":"76561199478419618","name":"CNZS_Donghaidi","rating":2466,"rank":90,"wins":647,"losses":493,"streak":-2,"countryCode":"CN"},{"profileId":247224,"steamId":"76561198171294807","name":"Survivalist","rating":2465,"rank":91,"wins":8304,"losses":7295,"streak":2,"countryCode":"CA"},{"profileId":3747802,"steamId":"76561198364623849","name":"SalzZ_wide","rating":2465,"rank":92,"wins":3581,"losses":3183,"streak":6,"countryCode":"RU"},{"profileId":3970269,"steamId":"76561199104652007","name":"Emu Warrior","rating":2463,"rank":93,"wins":1062,"losses":973,"streak":1,"countryCode":"US"},{"profileId":3022245,"steamId":"76561198026485316","name":"Courtesy","rating":2463,"rank":94,"wins":4898,"losses":3443,"streak":4,"countryCode":"AR"},{"profileId":2621722,"steamId":"76561198046946243","name":"DS_Twigg","rating":2462,"rank":95,"wins":1620,"losses":1343,"streak":-1,"countryCode":"AR"},{"profileId":196310,"steamId":"76561198275970890","name":"F1Re","rating":2462,"rank":96,"wins":6059,"losses":3372,"streak":3,"countryCode":"BR"},{"profileId":23053479,"steamId":"76561199865687166","name":"Biry","rating":2460,"rank":97,"wins":353,"losses":239,"streak":1,"countryCode":"AR"},{"profileId":22249146,"steamId":"76561199830839139","name":"[\u8D85\u96F7\u5927\u9ED1\u5E97]Jian Hei","rating":2460,"rank":98,"wins":321,"losses":233,"streak":-1,"countryCode":"TW"},{"profileId":2090225,"steamId":"76561198242526658","name":"Oni.miguel","rating":2453,"rank":99,"wins":1705,"losses":1283,"streak":2,"countryCode":"BR"},{"profileId":15214143,"steamId":"76561199509475227","name":"Rayz","rating":2452,"rank":100,"wins":913,"losses":726,"streak":4,"countryCode":"TW"},{"profileId":12952693,"steamId":"76561199475006461","name":"DS_Biry","rating":2449,"rank":101,"wins":504,"losses":368,"streak":1,"countryCode":"AR"},{"profileId":2161095,"steamId":"76561198348821738","name":"develement","rating":2449,"rank":102,"wins":343,"losses":184,"streak":2,"countryCode":"US"},{"profileId":16815454,"steamId":"76561199546948938","name":"\u554A\u8FD9\u4E2A\u52C7\u8005\u4E09\u53F6\u5C31\u662F\u7231\u505A\u5E7B\u60F3\u7684\u68A6","rating":2449,"rank":103,"wins":1292,"losses":1135,"streak":5,"countryCode":"CN"},{"profileId":2594552,"steamId":"76561199055602916","name":"Dooidy","rating":2448,"rank":104,"wins":1645,"losses":1450,"streak":7,"countryCode":"CN"},{"profileId":2844691,"steamId":"76561199066277433","name":"wR.Mochi","rating":2447,"rank":105,"wins":3195,"losses":2866,"streak":-1,"countryCode":"AR"},{"profileId":243287,"steamId":"76561198297171662","name":"\u52C7\u6562\u718A\u718A","rating":2446,"rank":106,"wins":3630,"losses":3179,"streak":3,"countryCode":"CN"},{"profileId":3230529,"steamId":"76561198098401046","name":"IamChristopher","rating":2446,"rank":107,"wins":1141,"losses":790,"streak":1,"countryCode":"CA"},{"profileId":18917671,"steamId":"76561199642772373","name":"Tacac\xE1","rating":2443,"rank":108,"wins":418,"losses":249,"streak":1,"countryCode":"BR"},{"profileId":322534,"steamId":"76561198054607979","name":"STORM | Noszombie","rating":2440,"rank":109,"wins":3169,"losses":2708,"streak":-3,"countryCode":"AU"},{"profileId":1200049,"steamId":"76561199013132475","name":"Mr.Bean","rating":2440,"rank":110,"wins":1904,"losses":1620,"streak":-4,"countryCode":"VN"},{"profileId":3101322,"steamId":"76561198151895411","name":"HR Whitecourt","rating":2439,"rank":111,"wins":1052,"losses":791,"streak":2,"countryCode":"CL"},{"profileId":1407942,"steamId":"76561198121306763","name":"Dark_aoe","rating":2439,"rank":112,"wins":1974,"losses":1836,"streak":1,"countryCode":"RU"},{"profileId":9579739,"steamId":"76561199243543910","name":"mentalist_","rating":2437,"rank":113,"wins":985,"losses":846,"streak":2,"countryCode":"CA"},{"profileId":5232543,"steamId":"76561199149402832","name":"DS_Ilag","rating":2434,"rank":114,"wins":2538,"losses":2445,"streak":1,"countryCode":"VE"},{"profileId":3241077,"steamId":"76561199082554539","name":"Hoanginator","rating":2432,"rank":115,"wins":3013,"losses":1827,"streak":1,"countryCode":"VN"},{"profileId":23221600,"steamId":"76561199476300615","name":"CNZS_Donghaidi","rating":2427,"rank":116,"wins":171,"losses":99,"streak":1,"countryCode":"CN"},{"profileId":312774,"steamId":"76561198452342146","name":"hK | Keno_","rating":2426,"rank":117,"wins":987,"losses":801,"streak":-1,"countryCode":"MX"},{"profileId":4625368,"steamId":"76561198317870609","name":"zankoku sekai no akuma","rating":2425,"rank":118,"wins":2118,"losses":1939,"streak":2,"countryCode":"TR"},{"profileId":6155519,"steamId":"76561199191554240","name":"Starsky","rating":2421,"rank":119,"wins":710,"losses":563,"streak":19,"countryCode":"CN"},{"profileId":15174925,"steamId":"76561198148006901","name":"hK | Siesta","rating":2419,"rank":120,"wins":877,"losses":714,"streak":8,"countryCode":"MX"},{"profileId":250103,"steamId":"76561198061054857","name":"_Hallis","rating":2417,"rank":121,"wins":2025,"losses":1721,"streak":2,"countryCode":"GB"},{"profileId":4129359,"steamId":"76561199107946475","name":"DS_VarVa","rating":2417,"rank":122,"wins":2494,"losses":1999,"streak":-1,"countryCode":"AR"},{"profileId":2821779,"steamId":"76561199065337729","name":"DS_Levi","rating":2417,"rank":123,"wins":2329,"losses":2245,"streak":-2,"countryCode":"AR"},{"profileId":24488707,"steamId":"76561198777182344","name":"\u57FA\u79D1\xB7\u88E1\u7DAD\u62C9","rating":2415,"rank":124,"wins":277,"losses":129,"streak":-1,"countryCode":"ES"},{"profileId":11209546,"steamId":"76561199083880488","name":"Rodrixs","rating":2413,"rank":125,"wins":1123,"losses":975,"streak":3,"countryCode":"AR"},{"profileId":292318,"steamId":"76561198086560184","name":"Rayzor","rating":2408,"rank":126,"wins":1289,"losses":987,"streak":-1,"countryCode":"AU"},{"profileId":618731,"steamId":"76561198435384120","name":"DS_Carbo__","rating":2406,"rank":127,"wins":3913,"losses":3594,"streak":1,"countryCode":"AR"},{"profileId":24335740,"steamId":"76561199885045463","name":"Itz_Zenta","rating":2403,"rank":128,"wins":1025,"losses":813,"streak":1,"countryCode":"LY"},{"profileId":24064501,"steamId":"76561198775172659","name":"Only Vills","rating":2401,"rank":129,"wins":300,"losses":229,"streak":-6,"countryCode":"DE"},{"profileId":907793,"steamId":"76561198823680410","name":"NOC | Acro17","rating":2400,"rank":130,"wins":773,"losses":628,"streak":10,"countryCode":"DE"},{"profileId":199419,"steamId":"76561198397993999","name":"GKT_Cloud","rating":2399,"rank":131,"wins":2497,"losses":2036,"streak":3,"countryCode":"TW"},{"profileId":22210642,"steamId":"76561199825502412","name":"if i lose it all","rating":2395,"rank":132,"wins":594,"losses":463,"streak":5,"countryCode":"TR"},{"profileId":20655768,"steamId":"76561199729634460","name":"\u667A\u529B\u8001\u732A","rating":2395,"rank":133,"wins":336,"losses":246,"streak":1,"countryCode":"CN"},{"profileId":2532568,"steamId":"76561198282213398","name":"mordicchiotto","rating":2389,"rank":134,"wins":3093,"losses":2736,"streak":1,"countryCode":"IT"},{"profileId":1038375,"steamId":"76561198251249078","name":"OS+ | TheKroks","rating":2387,"rank":135,"wins":1698,"losses":1456,"streak":3,"countryCode":"PL"},{"profileId":689666,"steamId":"76561198055330361","name":"DK | Good_luck","rating":2386,"rank":136,"wins":2040,"losses":1754,"streak":2,"countryCode":"DK"},{"profileId":239238,"steamId":"76561198113285862","name":"wR.Fedex","rating":2382,"rank":137,"wins":828,"losses":598,"streak":7,"countryCode":"AR"},{"profileId":3108145,"steamId":"76561199075213973","name":"Dark","rating":2379,"rank":138,"wins":235,"losses":98,"streak":2,"countryCode":"RU"},{"profileId":884134,"steamId":"76561198843637471","name":"mouri","rating":2377,"rank":139,"wins":2560,"losses":2385,"streak":2,"countryCode":"JO"},{"profileId":7684383,"steamId":"76561198417115236","name":"OS+ | R4v3N_","rating":2375,"rank":140,"wins":603,"losses":456,"streak":-1,"countryCode":"RO"},{"profileId":4221810,"steamId":"76561199111177779","name":"Imfury_","rating":2375,"rank":141,"wins":1538,"losses":1222,"streak":12,"countryCode":"MX"},{"profileId":453821,"steamId":"76561198976031906","name":"Macluffy","rating":2373,"rank":142,"wins":5583,"losses":5439,"streak":-2,"countryCode":"BE"},{"profileId":6850569,"steamId":"76561198263372309","name":"Oni.GoKu","rating":2371,"rank":143,"wins":160,"losses":73,"streak":1,"countryCode":"BR"},{"profileId":6440047,"steamId":"76561198067238361","name":"Blackheart","rating":2364,"rank":144,"wins":2211,"losses":1947,"streak":2,"countryCode":"DE"},{"profileId":2274841,"steamId":"76561198229276604","name":"Nezzar","rating":2364,"rank":145,"wins":1582,"losses":1315,"streak":1,"countryCode":"HK"},{"profileId":622641,"steamId":"76561198118522396","name":"Draconian","rating":2363,"rank":146,"wins":1500,"losses":1374,"streak":1,"countryCode":"GB"},{"profileId":246423,"steamId":"76561198009952670","name":"Dobbs351","rating":2356,"rank":147,"wins":3489,"losses":3181,"streak":-1,"countryCode":"PL"},{"profileId":2593750,"steamId":"76561199028912870","name":"_TieuQuy","rating":2356,"rank":148,"wins":3625,"losses":3127,"streak":-1,"countryCode":"AR"},{"profileId":5112522,"steamId":"76561199026714384","name":"JOHA","rating":2355,"rank":149,"wins":1205,"losses":1029,"streak":3,"countryCode":"DE"},{"profileId":20313953,"steamId":"76561199742544812","name":"Ashubelt","rating":2355,"rank":150,"wins":99,"losses":28,"streak":1,"countryCode":"TR"},{"profileId":664715,"steamId":"76561198446948941","name":"SuperMAARusher","rating":2354,"rank":151,"wins":718,"losses":503,"streak":1,"countryCode":"IN"},{"profileId":2826785,"steamId":"76561198364224429","name":"wR.Nahue05","rating":2349,"rank":152,"wins":2419,"losses":2248,"streak":-2,"countryCode":"AR"},{"profileId":25434928,"steamId":"76561198705620358","name":"rono","rating":2349,"rank":153,"wins":169,"losses":72,"streak":6,"countryCode":"TR"},{"profileId":2899104,"steamId":"76561199069178242","name":"Nacho_C","rating":2347,"rank":154,"wins":919,"losses":810,"streak":2,"countryCode":"AR"},{"profileId":5854345,"steamId":"76561199176944754","name":"BSL | adduOP","rating":2346,"rank":155,"wins":1875,"losses":1622,"streak":1,"countryCode":"IN"},{"profileId":6251969,"steamId":"76561199197224738","name":"CNZS_DuDuZhu","rating":2344,"rank":156,"wins":3535,"losses":3244,"streak":3,"countryCode":"CN"},{"profileId":25218568,"steamId":"76561198713978143","name":"\u6D77\u738B\u661F","rating":2344,"rank":157,"wins":215,"losses":85,"streak":3,"countryCode":"ES"},{"profileId":7240746,"steamId":"76561199077157233","name":"Clearlove","rating":2341,"rank":158,"wins":2017,"losses":1755,"streak":-1,"countryCode":"CN"},{"profileId":11924411,"steamId":"76561199412599747","name":"DaddyWonder","rating":2340,"rank":159,"wins":180,"losses":70,"streak":1,"countryCode":"TR"},{"profileId":19831974,"steamId":"76561198852059383","name":"VEN\xD3N | Mauricio","rating":2338,"rank":160,"wins":1013,"losses":837,"streak":1,"countryCode":"MX"},{"profileId":11717976,"steamId":"76561198348854625","name":"Biel","rating":2337,"rank":161,"wins":207,"losses":131,"streak":4,"countryCode":"BR"},{"profileId":4502670,"steamId":"76561198079066975","name":"Mariann","rating":2335,"rank":162,"wins":2397,"losses":2252,"streak":1,"countryCode":"AR"},{"profileId":1350868,"steamId":"76561198967301821","name":"Hannibal","rating":2334,"rank":163,"wins":3052,"losses":2927,"streak":4,"countryCode":"EG"},{"profileId":452924,"steamId":"76561198033713695","name":"JackK","rating":2330,"rank":164,"wins":1964,"losses":1617,"streak":2,"countryCode":"PL"},{"profileId":211777,"steamId":"76561198074729763","name":"Mettiu","rating":2329,"rank":165,"wins":871,"losses":691,"streak":-1,"countryCode":"IT"},{"profileId":952733,"steamId":"76561198181602645","name":"Tulendeena","rating":2327,"rank":166,"wins":578,"losses":425,"streak":5,"countryCode":"AU"},{"profileId":2482098,"steamId":"76561198118701261","name":"[LW] Faneth","rating":2325,"rank":167,"wins":1107,"losses":975,"streak":1,"countryCode":"NL"},{"profileId":19543526,"steamId":"76561199676905936","name":"Aldeana Hot","rating":2323,"rank":168,"wins":385,"losses":293,"streak":-2,"countryCode":"CR"},{"profileId":545342,"steamId":"76561198437726495","name":"jcdanzig","rating":2318,"rank":169,"wins":1097,"losses":892,"streak":4,"countryCode":"CL"},{"profileId":23150792,"steamId":"76561199868403612","name":"\u8FF7\u4F60\u8F66\u4EC1","rating":2318,"rank":170,"wins":272,"losses":164,"streak":2,"countryCode":"CN"},{"profileId":458029,"steamId":"76561197981262667","name":"Darknoob","rating":2317,"rank":171,"wins":4827,"losses":4107,"streak":1,"countryCode":"NL"},{"profileId":11090889,"steamId":"76561198798438814","name":"\u6296\u97F3ique","rating":2316,"rank":172,"wins":64,"losses":0,"streak":64,"countryCode":"CN"},{"profileId":221997,"steamId":"76561197961767770","name":"FYI Inc","rating":2313,"rank":173,"wins":2305,"losses":1980,"streak":11,"countryCode":"US"},{"profileId":1076546,"steamId":"76561198313174795","name":"\u5982\u82B1\u7F8E\u7737","rating":2312,"rank":174,"wins":655,"losses":515,"streak":1,"countryCode":"CN"},{"profileId":268051,"steamId":"76561198053312969","name":"Eli","rating":2310,"rank":175,"wins":1508,"losses":1298,"streak":-2,"countryCode":"US"},{"profileId":8448734,"steamId":"76561197991643557","name":"Hunab Ku","rating":2310,"rank":176,"wins":1266,"losses":1017,"streak":-1,"countryCode":"MX"},{"profileId":5902182,"steamId":"76561198814638354","name":"\u4E91\u95F2","rating":2310,"rank":177,"wins":1092,"losses":974,"streak":7,"countryCode":"CN"},{"profileId":738035,"steamId":"76561198035758453","name":"Lighty","rating":2307,"rank":178,"wins":3902,"losses":3635,"streak":2,"countryCode":"FR"},{"profileId":1762409,"steamId":"76561199028366768","name":"RoR | kei","rating":2307,"rank":179,"wins":2964,"losses":2784,"streak":4,"countryCode":"JP"},{"profileId":23353296,"steamId":"","name":"Keane9115","rating":2306,"rank":180,"wins":257,"losses":159,"streak":4,"countryCode":"AR"},{"profileId":21227185,"steamId":"76561199639553093","name":"\u6211\u672C\u5584\u826F","rating":2306,"rank":181,"wins":206,"losses":107,"streak":4,"countryCode":"CN"},{"profileId":20471312,"steamId":"76561199754086125","name":"yoki sekai no tenshi","rating":2306,"rank":182,"wins":148,"losses":66,"streak":8,"countryCode":"TR"},{"profileId":8993542,"steamId":"76561198803303038","name":"\u6850\u6708","rating":2305,"rank":183,"wins":79,"losses":7,"streak":1,"countryCode":"CN"},{"profileId":460064,"steamId":"76561198185474877","name":"GAX | The Dodge","rating":2304,"rank":184,"wins":1132,"losses":999,"streak":7,"countryCode":"BR"},{"profileId":17731854,"steamId":"76561199572621327","name":"Speed","rating":2302,"rank":185,"wins":1081,"losses":999,"streak":-1,"countryCode":"MT"},{"profileId":1554380,"steamId":"76561198180402989","name":"[R1] Pume","rating":2300,"rank":186,"wins":437,"losses":329,"streak":2,"countryCode":"ES"},{"profileId":208314,"steamId":"","name":"Whoosher9355","rating":2298,"rank":187,"wins":197,"losses":78,"streak":8,"countryCode":"TR"},{"profileId":219739,"steamId":"76561198940417418","name":"Pela","rating":2297,"rank":188,"wins":846,"losses":720,"streak":6,"countryCode":"AR"},{"profileId":605947,"steamId":"76561198253876282","name":"RoR | Hellequinn","rating":2296,"rank":189,"wins":2050,"losses":1931,"streak":3,"countryCode":"DE"},{"profileId":2800609,"steamId":"76561198272515069","name":"Valle","rating":2296,"rank":190,"wins":756,"losses":551,"streak":3,"countryCode":"DE"},{"profileId":211321,"steamId":"76561198012010543","name":"robo_boro","rating":2294,"rank":191,"wins":213,"losses":106,"streak":-1,"countryCode":"GB"},{"profileId":4859950,"steamId":"76561198444763912","name":"HR AboKeiTo","rating":2293,"rank":192,"wins":1155,"losses":1018,"streak":1,"countryCode":"CL"},{"profileId":4012008,"steamId":"76561198294644972","name":"chaos_2_win","rating":2293,"rank":193,"wins":1694,"losses":1559,"streak":-2,"countryCode":"DE"},{"profileId":20566459,"steamId":"76561199071858073","name":"CNZS_Still in Love","rating":2293,"rank":194,"wins":1078,"losses":935,"streak":2,"countryCode":"CN"},{"profileId":1749894,"steamId":"76561198054734113","name":"DS_Nacho_10","rating":2285,"rank":195,"wins":1121,"losses":936,"streak":1,"countryCode":"AR"},{"profileId":10960083,"steamId":"76561199385029768","name":"Mettiu","rating":2284,"rank":196,"wins":735,"losses":606,"streak":-1,"countryCode":"IT"},{"profileId":1629889,"steamId":"76561198354278976","name":"Fs.Alive","rating":2284,"rank":197,"wins":2853,"losses":2610,"streak":1,"countryCode":"BR"},{"profileId":14669191,"steamId":"76561199492268970","name":"Chavah","rating":2283,"rank":198,"wins":851,"losses":743,"streak":1,"countryCode":"DO"},{"profileId":2295504,"steamId":"76561198874693374","name":"hK | Volg","rating":2283,"rank":199,"wins":1339,"losses":1231,"streak":2,"countryCode":"MX"},{"profileId":301822,"steamId":"76561198370356865","name":"[GT]YellowJacket","rating":2283,"rank":200,"wins":5498,"losses":5108,"streak":2,"countryCode":"US"},{"profileId":1206581,"steamId":"76561198105889094","name":"DS_John III","rating":2282,"rank":201,"wins":1267,"losses":1071,"streak":1,"countryCode":"CR"},{"profileId":9031952,"steamId":"76561199230919064","name":"hK | ChossMx","rating":2281,"rank":202,"wins":1184,"losses":1041,"streak":-1,"countryCode":"MX"},{"profileId":516841,"steamId":"76561198084463845","name":"emalius2","rating":2279,"rank":203,"wins":1362,"losses":1216,"streak":-1,"countryCode":"FI"},{"profileId":15507280,"steamId":"76561199522053072","name":"YT Jian Hei\u83DC\u96DE\u865F","rating":2278,"rank":204,"wins":564,"losses":499,"streak":-2,"countryCode":"TW"},{"profileId":9558892,"steamId":"76561199066453611","name":"LE | WilliamS","rating":2277,"rank":205,"wins":3572,"losses":3316,"streak":2,"countryCode":"PE"},{"profileId":658565,"steamId":"76561198797909571","name":"PNLN | PG9","rating":2277,"rank":206,"wins":1892,"losses":1772,"streak":2,"countryCode":"BR"},{"profileId":3055068,"steamId":"76561198850477336","name":"Gengar","rating":2276,"rank":207,"wins":1835,"losses":1769,"streak":-1,"countryCode":"AR"},{"profileId":12452310,"steamId":"76561199076453355","name":"Emperor_Napoleon","rating":2275,"rank":208,"wins":1289,"losses":1136,"streak":-1,"countryCode":"CN"},{"profileId":5400817,"steamId":"76561199158515725","name":"Eren","rating":2275,"rank":209,"wins":597,"losses":476,"streak":1,"countryCode":"MX"},{"profileId":4240317,"steamId":"76561198154992750","name":"BoyWonder_","rating":2274,"rank":210,"wins":2175,"losses":1940,"streak":-3,"countryCode":"TR"},{"profileId":228725,"steamId":"76561198361295496","name":"Feroker","rating":2273,"rank":211,"wins":1285,"losses":1117,"streak":9,"countryCode":"CZ"},{"profileId":1449222,"steamId":"76561198983187966","name":"Togawa Sakikoi","rating":2272,"rank":212,"wins":390,"losses":252,"streak":-4,"countryCode":"CN"},{"profileId":1210686,"steamId":"76561198095459580","name":"Leonidas","rating":2271,"rank":213,"wins":4629,"losses":4283,"streak":2,"countryCode":"FR"},{"profileId":8335776,"steamId":"76561198438864329","name":"buddybadi","rating":2269,"rank":214,"wins":803,"losses":655,"streak":1,"countryCode":"AT"},{"profileId":301918,"steamId":"76561198352045396","name":"OS+ | Scotty","rating":2269,"rank":215,"wins":2038,"losses":1783,"streak":-3,"countryCode":"US"},{"profileId":18871570,"steamId":"76561199260768231","name":"spiid","rating":2269,"rank":216,"wins":140,"losses":58,"streak":-3,"countryCode":"FI"},{"profileId":289473,"steamId":"76561198154910988","name":"Shulk","rating":2269,"rank":217,"wins":1988,"losses":1885,"streak":4,"countryCode":"FR"},{"profileId":19535910,"steamId":"76561199676637909","name":"Bro Creation","rating":2268,"rank":218,"wins":771,"losses":700,"streak":1,"countryCode":"PK"},{"profileId":223206,"steamId":"76561198085739429","name":"NOC | komtan","rating":2267,"rank":219,"wins":2341,"losses":1974,"streak":-5,"countryCode":"JP"},{"profileId":23770308,"steamId":"76561198786565083","name":"ArabiaHaterNr.1","rating":2266,"rank":220,"wins":97,"losses":20,"streak":1,"countryCode":"DE"},{"profileId":15506619,"steamId":"76561199521972648","name":"Zni.Locuss","rating":2265,"rank":221,"wins":905,"losses":759,"streak":3,"countryCode":"BG"},{"profileId":17331610,"steamId":"76561199562155750","name":"Baby Alf","rating":2264,"rank":222,"wins":791,"losses":546,"streak":-3,"countryCode":"AR"},{"profileId":9750845,"steamId":"76561198800311094","name":"DAI","rating":2263,"rank":223,"wins":1135,"losses":952,"streak":4,"countryCode":"TW"},{"profileId":8864570,"steamId":"76561199227830199","name":"\u611B\u60C5\u7684\u5927\u58DE\u86CB","rating":2263,"rank":224,"wins":565,"losses":458,"streak":2,"countryCode":"TW"},{"profileId":580573,"steamId":"76561198360396636","name":"Don Blukaku","rating":2262,"rank":225,"wins":3644,"losses":3505,"streak":2,"countryCode":"MX"},{"profileId":1550842,"steamId":"76561197990967255","name":"saps_","rating":2261,"rank":226,"wins":3316,"losses":3056,"streak":2,"countryCode":"RO"},{"profileId":2888687,"steamId":"76561198405456050","name":"Pan","rating":2259,"rank":227,"wins":400,"losses":279,"streak":2,"countryCode":"MX"},{"profileId":60328,"steamId":"76561198102723093","name":"DS_VortiX","rating":2257,"rank":228,"wins":404,"losses":309,"streak":-3,"countryCode":"ES"},{"profileId":2653793,"steamId":"76561198876888773","name":"Frost_9","rating":2254,"rank":229,"wins":1218,"losses":1124,"streak":1,"countryCode":"SE"},{"profileId":19657014,"steamId":"76561199680710552","name":"\u6D1B\u5B50\u5546","rating":2254,"rank":230,"wins":827,"losses":719,"streak":4,"countryCode":"TW"},{"profileId":1292487,"steamId":"76561198175593485","name":"ilovebaskets","rating":2254,"rank":231,"wins":2365,"losses":2239,"streak":3,"countryCode":"US"},{"profileId":10489189,"steamId":"76561199355311669","name":"Fs.TARTARUGA VELOZ","rating":2253,"rank":232,"wins":140,"losses":49,"streak":1,"countryCode":"BR"},{"profileId":21516070,"steamId":"76561199727476410","name":"ldx","rating":2252,"rank":233,"wins":908,"losses":720,"streak":2,"countryCode":"CN"},{"profileId":1215099,"steamId":"76561198864595273","name":"alphaa","rating":2252,"rank":234,"wins":1457,"losses":1221,"streak":5,"countryCode":"US"},{"profileId":2598146,"steamId":"76561199055906163","name":"VEN\xD3N | SiNisTeR","rating":2251,"rank":235,"wins":483,"losses":363,"streak":-2,"countryCode":"MX"},{"profileId":579679,"steamId":"76561198425688505","name":"Margougou","rating":2249,"rank":236,"wins":1318,"losses":1035,"streak":1,"countryCode":"FR"},{"profileId":230432,"steamId":"76561198040347770","name":"PUB | Steak","rating":2249,"rank":237,"wins":1365,"losses":1227,"streak":2,"countryCode":"GB"},{"profileId":1776432,"steamId":"76561198064834451","name":"Toan Perfect","rating":2249,"rank":238,"wins":381,"losses":239,"streak":7,"countryCode":"VN"},{"profileId":20927991,"steamId":"76561199787504967","name":"ReydeCopas","rating":2249,"rank":239,"wins":476,"losses":378,"streak":-1,"countryCode":"MX"},{"profileId":1175237,"steamId":"76561198434173438","name":"Fs.Jubileu","rating":2247,"rank":240,"wins":603,"losses":473,"streak":3,"countryCode":"BR"},{"profileId":738249,"steamId":"76561198074231669","name":"Mr Greed","rating":2246,"rank":241,"wins":2423,"losses":2076,"streak":1,"countryCode":"PT"},{"profileId":262959,"steamId":"76561198230903988","name":"Fukoti","rating":2245,"rank":242,"wins":1755,"losses":1673,"streak":8,"countryCode":"TR"},{"profileId":23293463,"steamId":"76561199877077123","name":"_LY_\u6597\u9C7C\u65B0\u79C0\u62FF\u7834\u4F26","rating":2245,"rank":243,"wins":305,"losses":222,"streak":5,"countryCode":"CN"},{"profileId":18857401,"steamId":"76561199639361267","name":"\u8001\u5929\u9D5D","rating":2243,"rank":244,"wins":715,"losses":617,"streak":3,"countryCode":"TW"},{"profileId":412636,"steamId":"76561198965911867","name":"Bubbagump","rating":2242,"rank":245,"wins":760,"losses":599,"streak":6,"countryCode":"US"},{"profileId":1485562,"steamId":"76561198304166141","name":"VEN\xD3N | MrOsoVC8","rating":2242,"rank":246,"wins":1553,"losses":1418,"streak":1,"countryCode":"MX"},{"profileId":2009315,"steamId":"76561198087580643","name":"OS+ | RaiD_","rating":2241,"rank":247,"wins":814,"losses":720,"streak":-1,"countryCode":"IT"},{"profileId":25249906,"steamId":"76561198713471634","name":"\u660E\u660E\u662F\u91D1\u53F6\u9A97\u6211\u662F\u7CA5","rating":2241,"rank":248,"wins":113,"losses":47,"streak":3,"countryCode":"CN"},{"profileId":216183,"steamId":"76561198030544947","name":"Delta65","rating":2241,"rank":249,"wins":2081,"losses":2002,"streak":2,"countryCode":"DE"},{"profileId":15293475,"steamId":"76561199511113994","name":"NuMa | AngelR2","rating":2240,"rank":250,"wins":693,"losses":559,"streak":-3,"countryCode":"CO"},{"profileId":12361437,"steamId":"76561199473024749","name":"\u540A\u5927\u5E08","rating":2240,"rank":251,"wins":462,"losses":364,"streak":-1,"countryCode":"JP"},{"profileId":331084,"steamId":"76561198873978587","name":"\u9A0E\u8C6C\u6253\u4ED7","rating":2240,"rank":252,"wins":3773,"losses":3664,"streak":2,"countryCode":"TW"},{"profileId":5205268,"steamId":"76561198085661381","name":"John II","rating":2239,"rank":253,"wins":689,"losses":558,"streak":1,"countryCode":"CR"},{"profileId":277618,"steamId":"76561198942369032","name":"Mastyjames","rating":2238,"rank":254,"wins":491,"losses":335,"streak":1,"countryCode":"US"},{"profileId":290430,"steamId":"76561198840722317","name":"\u661F\u7A7A\u8461\u8404\u5927\u676F\u52A0\u6930\u679C\u51B0\u6C99\u4E03\u5206\u7CD6","rating":2238,"rank":255,"wins":191,"losses":95,"streak":1,"countryCode":"CN"},{"profileId":11122904,"steamId":"76561199387612234","name":"\xD0\xE0Lat\xABG\xF4\xB0K\xB5\xBB","rating":2237,"rank":256,"wins":372,"losses":254,"streak":2,"countryCode":"VN"},{"profileId":475826,"steamId":"76561198126387713","name":"Timbrhoggvandi","rating":2237,"rank":257,"wins":2552,"losses":2368,"streak":-2,"countryCode":"AU"},{"profileId":2631795,"steamId":"76561199043744719","name":"Osama","rating":2236,"rank":258,"wins":2811,"losses":2691,"streak":3,"countryCode":"EG"},{"profileId":4298438,"steamId":"76561198987071435","name":"Prometheus","rating":2235,"rank":259,"wins":972,"losses":821,"streak":2,"countryCode":"TR"},{"profileId":300565,"steamId":"76561198002393371","name":"NOC | Wean Dinchester","rating":2235,"rank":260,"wins":687,"losses":586,"streak":6,"countryCode":"DE"},{"profileId":19701219,"steamId":"76561199570355208","name":"\u8001\u7231\u56FD\u70B8\u9C7C\u53F7","rating":2234,"rank":261,"wins":521,"losses":390,"streak":3,"countryCode":"CN"},{"profileId":811511,"steamId":"76561198296750721","name":"Kanon","rating":2232,"rank":262,"wins":618,"losses":479,"streak":4,"countryCode":"CN"},{"profileId":10912750,"steamId":"76561199383051463","name":"ANKR.ice cream","rating":2232,"rank":263,"wins":2017,"losses":1917,"streak":2,"countryCode":"TW"},{"profileId":949573,"steamId":"76561198138884370","name":"[bS']Socksyy","rating":2231,"rank":264,"wins":1306,"losses":1129,"streak":1,"countryCode":"AU"},{"profileId":4795863,"steamId":"76561199129077917","name":"RAGNAR","rating":2231,"rank":265,"wins":139,"losses":45,"streak":-3,"countryCode":"TR"},{"profileId":2347189,"steamId":"76561199046361051","name":"Resilience","rating":2231,"rank":266,"wins":692,"losses":583,"streak":5,"countryCode":"IT"},{"profileId":221879,"steamId":"76561198415635055","name":"Old Time","rating":2231,"rank":267,"wins":1387,"losses":1282,"streak":1,"countryCode":"BR"},{"profileId":1253397,"steamId":"76561198233288584","name":"OS+ | aKaTepBackWards","rating":2231,"rank":268,"wins":563,"losses":436,"streak":1,"countryCode":"BG"},{"profileId":178430,"steamId":"76561198120632563","name":"Light Cav OP","rating":2231,"rank":269,"wins":3950,"losses":3557,"streak":1,"countryCode":"US"},{"profileId":284552,"steamId":"76561198102894110","name":"Fs.Jubileu","rating":2230,"rank":270,"wins":1312,"losses":1116,"streak":4,"countryCode":"BR"},{"profileId":989253,"steamId":"76561198023491587","name":"NOC | Madtomski","rating":2230,"rank":271,"wins":844,"losses":639,"streak":2,"countryCode":"DE"},{"profileId":5860039,"steamId":"76561199111768488","name":"TRMA | The_Beatleman","rating":2230,"rank":272,"wins":1087,"losses":946,"streak":3,"countryCode":"RU"},{"profileId":725502,"steamId":"76561198099976904","name":"DK | Kongen_42","rating":2228,"rank":273,"wins":3822,"losses":3676,"streak":-1,"countryCode":"DK"},{"profileId":4943664,"steamId":"76561199135494052","name":"Neo_Z4ID","rating":2228,"rank":274,"wins":387,"losses":341,"streak":2,"countryCode":"PK"},{"profileId":754845,"steamId":"76561198143899469","name":"AceRx","rating":2227,"rank":275,"wins":1570,"losses":1403,"streak":3,"countryCode":"AR"},{"profileId":2014691,"steamId":"76561198194338405","name":"pren","rating":2227,"rank":276,"wins":531,"losses":419,"streak":-4,"countryCode":"CZ"},{"profileId":396886,"steamId":"76561198203178318","name":"nono12","rating":2226,"rank":277,"wins":1368,"losses":1211,"streak":2,"countryCode":"FR"},{"profileId":1650931,"steamId":"76561198188939721","name":"HaraKiri","rating":2223,"rank":278,"wins":1846,"losses":1735,"streak":8,"countryCode":"MA"},{"profileId":5772003,"steamId":"76561199172255382","name":"xana","rating":2222,"rank":279,"wins":1082,"losses":919,"streak":-1,"countryCode":"BR"},{"profileId":1389164,"steamId":"76561198240662592","name":"The Illusionist","rating":2222,"rank":280,"wins":2182,"losses":2043,"streak":-1,"countryCode":"SK"},{"profileId":267857,"steamId":"76561198076329437","name":"DanMT","rating":2221,"rank":281,"wins":3138,"losses":3021,"streak":-2,"countryCode":"GB"},{"profileId":22889810,"steamId":"76561199858806820","name":"nW | Manuel","rating":2221,"rank":282,"wins":690,"losses":614,"streak":1,"countryCode":"CO"},{"profileId":2420511,"steamId":"76561198287592351","name":"[ASYNC]GodsPrisoner","rating":2220,"rank":283,"wins":2968,"losses":2682,"streak":1,"countryCode":"US"},{"profileId":300649,"steamId":"76561197982879082","name":"Fs.FeAge","rating":2220,"rank":284,"wins":868,"losses":728,"streak":4,"countryCode":"CA"},{"profileId":16016019,"steamId":"76561199534584758","name":"Shark drown on water","rating":2219,"rank":285,"wins":256,"losses":160,"streak":-1,"countryCode":"FR"},{"profileId":677003,"steamId":"76561198119101707","name":"[TMG] Lucipher","rating":2218,"rank":286,"wins":2900,"losses":2794,"streak":5,"countryCode":"GE"},{"profileId":10172828,"steamId":"76561199279551544","name":"Maximilian von Habsburg","rating":2217,"rank":287,"wins":228,"losses":126,"streak":-1,"countryCode":"DE"},{"profileId":2709266,"steamId":"76561199060523210","name":"OS+ | NecksZy","rating":2217,"rank":288,"wins":1787,"losses":1645,"streak":3,"countryCode":"CL"},{"profileId":1878835,"steamId":"76561199020665663","name":"Tomppa","rating":2217,"rank":289,"wins":656,"losses":535,"streak":-1,"countryCode":"FI"},{"profileId":3444509,"steamId":"76561198271940855","name":"Mununez","rating":2216,"rank":290,"wins":1013,"losses":919,"streak":1,"countryCode":"US"},{"profileId":8447899,"steamId":"76561199223093017","name":"OJP","rating":2215,"rank":291,"wins":1098,"losses":944,"streak":3,"countryCode":"DE"},{"profileId":4971,"steamId":"76561198067207629","name":"Oni.Nacho","rating":2213,"rank":292,"wins":1382,"losses":1197,"streak":-2,"countryCode":"BR"},{"profileId":5941695,"steamId":"76561198139890270","name":"Bel","rating":2213,"rank":293,"wins":448,"losses":327,"streak":6,"countryCode":"US"},{"profileId":1693166,"steamId":"76561198090399922","name":"VN_KoNFeR","rating":2213,"rank":294,"wins":686,"losses":602,"streak":9,"countryCode":"ES"},{"profileId":937162,"steamId":"76561198448253544","name":"Shahar18","rating":2210,"rank":295,"wins":1828,"losses":1717,"streak":-2,"countryCode":"IL"},{"profileId":1137086,"steamId":"76561197967418429","name":"shiXo.#","rating":2209,"rank":296,"wins":6247,"losses":6111,"streak":-1,"countryCode":"DE"},{"profileId":757886,"steamId":"76561198112235172","name":"VN_DarK_KnighT_","rating":2209,"rank":297,"wins":911,"losses":779,"streak":2,"countryCode":"MX"},{"profileId":4375138,"steamId":"76561199115787134","name":"_RaiD__","rating":2209,"rank":298,"wins":437,"losses":348,"streak":4,"countryCode":"IT"},{"profileId":11493710,"steamId":"76561199419340366","name":"Rose Pric3","rating":2208,"rank":299,"wins":334,"losses":259,"streak":3,"countryCode":"CN"},{"profileId":2599393,"steamId":"76561198340568413","name":"Worst_AoE_Player","rating":2208,"rank":300,"wins":935,"losses":845,"streak":2,"countryCode":"ES"},{"profileId":1920807,"steamId":"76561199035096097","name":"c.salette","rating":2208,"rank":301,"wins":3893,"losses":3542,"streak":2,"countryCode":"FR"},{"profileId":208269,"steamId":"76561198013793264","name":"JonSlow","rating":2207,"rank":302,"wins":5199,"losses":4802,"streak":2,"countryCode":"IL"},{"profileId":6030158,"steamId":"76561199173852153","name":"\u8DEF\u908A\u7684\u91CE\u82B1","rating":2207,"rank":303,"wins":409,"losses":303,"streak":-2,"countryCode":"TW"},{"profileId":5464646,"steamId":"76561199160705059","name":"[VL] Xite","rating":2207,"rank":304,"wins":467,"losses":403,"streak":2,"countryCode":"PE"},{"profileId":2944434,"steamId":"76561198350272978","name":"Yax","rating":2207,"rank":305,"wins":1103,"losses":939,"streak":1,"countryCode":"TR"},{"profileId":212316,"steamId":"76561198205154296","name":"KronosJr","rating":2206,"rank":306,"wins":667,"losses":563,"streak":5,"countryCode":"GR"},{"profileId":616906,"steamId":"76561198328426104","name":"wisenatic","rating":2206,"rank":307,"wins":6730,"losses":6479,"streak":1,"countryCode":"DE"},{"profileId":5839022,"steamId":"76561198184971415","name":"[GLD] Abu abdullah","rating":2206,"rank":308,"wins":891,"losses":737,"streak":-2,"countryCode":"SA"},{"profileId":5257573,"steamId":"76561199150904980","name":"No_soy_yo","rating":2206,"rank":309,"wins":1344,"losses":1299,"streak":3,"countryCode":"CL"},{"profileId":180520,"steamId":"76561198245164292","name":"PUB | [\u{1F955}]King_Boo","rating":2205,"rank":310,"wins":917,"losses":764,"streak":6,"countryCode":"GB"},{"profileId":10044347,"steamId":"76561199270029216","name":"CNZS_\u83DC\u83DC\u864E","rating":2204,"rank":311,"wins":485,"losses":392,"streak":4,"countryCode":"CN"},{"profileId":711407,"steamId":"76561198142583880","name":"\u732A\u54AA","rating":2203,"rank":312,"wins":1621,"losses":1492,"streak":7,"countryCode":"CN"},{"profileId":249653,"steamId":"76561198058957875","name":"Moneimon","rating":2202,"rank":313,"wins":1923,"losses":1750,"streak":1,"countryCode":"ES"},{"profileId":2366434,"steamId":"76561199035854784","name":"CTM | Escarapela Peruana","rating":2202,"rank":314,"wins":1017,"losses":922,"streak":4,"countryCode":"PE"},{"profileId":340055,"steamId":"76561198052963033","name":"[R1] PoXoLo","rating":2202,"rank":315,"wins":394,"losses":282,"streak":3,"countryCode":"ES"},{"profileId":3942539,"steamId":"76561198215643820","name":"OS+ | VoNDutcH","rating":2201,"rank":316,"wins":506,"losses":385,"streak":1,"countryCode":"IT"},{"profileId":431744,"steamId":"76561198077768177","name":"Rubenstock","rating":2201,"rank":317,"wins":622,"losses":487,"streak":-3,"countryCode":"FI"},{"profileId":1995414,"steamId":"76561198073404583","name":"OS+ | Tiggerr","rating":2199,"rank":318,"wins":4926,"losses":4765,"streak":-3,"countryCode":"CA"},{"profileId":4706179,"steamId":"76561198327909205","name":"[CL] Rey Enigmaaa","rating":2196,"rank":319,"wins":330,"losses":237,"streak":1,"countryCode":"PE"},{"profileId":3035292,"steamId":"76561198823651807","name":"XEVER | Rivux","rating":2196,"rank":320,"wins":5268,"losses":5174,"streak":1,"countryCode":"AR"},{"profileId":2266228,"steamId":"76561198065831788","name":"Edgar Davids","rating":2196,"rank":321,"wins":1915,"losses":1799,"streak":1,"countryCode":"DE"},{"profileId":17432728,"steamId":"76561199565205196","name":"MLT | Anna Flank","rating":2193,"rank":322,"wins":560,"losses":473,"streak":-1,"countryCode":"IT"},{"profileId":10283755,"steamId":"76561199309041765","name":"Valgur","rating":2191,"rank":323,"wins":635,"losses":538,"streak":2,"countryCode":"MX"},{"profileId":2301379,"steamId":"76561198122142342","name":"Molle","rating":2191,"rank":324,"wins":2419,"losses":2319,"streak":1,"countryCode":"DE"},{"profileId":21503260,"steamId":"76561199807552998","name":"CNZS_Dadaya","rating":2191,"rank":325,"wins":443,"losses":309,"streak":1,"countryCode":"CN"},{"profileId":3173869,"steamId":"76561199078107705","name":"twitch.tv/RaiDAoE","rating":2187,"rank":326,"wins":1187,"losses":1104,"streak":1,"countryCode":"IT"},{"profileId":20533687,"steamId":"76561199681332546","name":"\u541B\u82B1\u5BA2","rating":2186,"rank":327,"wins":638,"losses":545,"streak":1,"countryCode":"TW"},{"profileId":5109315,"steamId":"76561199142551555","name":"Plebadin","rating":2185,"rank":328,"wins":131,"losses":89,"streak":1,"countryCode":"GR"},{"profileId":2614814,"steamId":"76561199002853976","name":"TaoPaiPai","rating":2185,"rank":329,"wins":1259,"losses":1201,"streak":8,"countryCode":"GT"},{"profileId":1691357,"steamId":"76561199025695126","name":"Taeyoon","rating":2185,"rank":330,"wins":488,"losses":341,"streak":2,"countryCode":"TW"},{"profileId":21733994,"steamId":"76561199814007304","name":"Dr. Wiley!!!","rating":2185,"rank":331,"wins":1188,"losses":783,"streak":2,"countryCode":"US"},{"profileId":10908042,"steamId":"76561199081484535","name":"Orca17","rating":2184,"rank":332,"wins":301,"losses":207,"streak":1,"countryCode":"DE"},{"profileId":8684491,"steamId":"76561198014767773","name":"Pauli","rating":2184,"rank":333,"wins":2508,"losses":2384,"streak":-2,"countryCode":"BR"},{"profileId":2845695,"steamId":"76561199066483541","name":"paris hilton","rating":2183,"rank":334,"wins":391,"losses":326,"streak":-2,"countryCode":"FR"},{"profileId":2624148,"steamId":"76561198965753249","name":"PatrickJane","rating":2183,"rank":335,"wins":1938,"losses":1715,"streak":-1,"countryCode":"AR"},{"profileId":20821163,"steamId":"76561199779944173","name":"Bumbam","rating":2182,"rank":336,"wins":118,"losses":39,"streak":3,"countryCode":"TR"},{"profileId":6387067,"steamId":"76561199203856457","name":"CTM | L","rating":2181,"rank":337,"wins":861,"losses":771,"streak":2,"countryCode":"PE"},{"profileId":5367941,"steamId":"76561199157065312","name":"HaraKiri_aoe","rating":2180,"rank":338,"wins":515,"losses":383,"streak":1,"countryCode":"MA"},{"profileId":9992305,"steamId":"76561199265633489","name":"thunder bun","rating":2179,"rank":339,"wins":634,"losses":591,"streak":-1,"countryCode":"TW"},{"profileId":3816609,"steamId":"76561199038644017","name":"iamkaito","rating":2179,"rank":340,"wins":2356,"losses":2218,"streak":-3,"countryCode":"MX"},{"profileId":2388792,"steamId":"76561198364922218","name":"jsemosoom","rating":2179,"rank":341,"wins":3322,"losses":3220,"streak":1,"countryCode":"CZ"},{"profileId":2048591,"steamId":"76561198120291665","name":"QuEnDi.kelar","rating":2178,"rank":342,"wins":781,"losses":675,"streak":1,"countryCode":"DE"},{"profileId":25545754,"steamId":"76561198696707730","name":"Solomon","rating":2177,"rank":343,"wins":62,"losses":8,"streak":2,"countryCode":"CN"},{"profileId":12273554,"steamId":"76561199471014685","name":"damien","rating":2175,"rank":344,"wins":131,"losses":59,"streak":1,"countryCode":"DK"},{"profileId":8815470,"steamId":"76561198263066173","name":"Deaf Vader","rating":2175,"rank":345,"wins":498,"losses":439,"streak":1,"countryCode":"US"},{"profileId":974876,"steamId":"76561198371606075","name":"wanna lose 21 grams","rating":2174,"rank":346,"wins":2964,"losses":2847,"streak":1,"countryCode":"IN"},{"profileId":17266239,"steamId":"76561199549371670","name":"Mymy","rating":2174,"rank":347,"wins":1714,"losses":1546,"streak":-12,"countryCode":"CN"},{"profileId":5091998,"steamId":"76561198239271992","name":"Kaeften","rating":2173,"rank":348,"wins":629,"losses":549,"streak":1,"countryCode":"SE"},{"profileId":2622255,"steamId":"76561199054950036","name":"\xD0Lucky","rating":2172,"rank":349,"wins":340,"losses":250,"streak":1,"countryCode":"VN"},{"profileId":14191480,"steamId":"76561199484417763","name":"MegarandomShan","rating":2171,"rank":350,"wins":312,"losses":195,"streak":2,"countryCode":"GB"},{"profileId":14119237,"steamId":"76561199013522365","name":"[CL] Yomi","rating":2171,"rank":351,"wins":942,"losses":838,"streak":2,"countryCode":"JP"},{"profileId":10037844,"steamId":"76561199269632256","name":"CTM | Ligth","rating":2171,"rank":352,"wins":277,"losses":206,"streak":-1,"countryCode":"PE"},{"profileId":1821855,"steamId":"76561199030862219","name":"_DY_\u5B5F\u5DDD","rating":2171,"rank":353,"wins":4665,"losses":4549,"streak":2,"countryCode":"CN"},{"profileId":14666598,"steamId":"76561199492500102","name":"nW | iamkaito","rating":2170,"rank":354,"wins":2499,"losses":2362,"streak":1,"countryCode":"MX"},{"profileId":914665,"steamId":"76561199006788221","name":"Caguamas","rating":2170,"rank":355,"wins":1022,"losses":890,"streak":1,"countryCode":"MX"},{"profileId":4388684,"steamId":"76561199116977315","name":"Bebesona","rating":2170,"rank":356,"wins":407,"losses":337,"streak":1,"countryCode":"BR"},{"profileId":880057,"steamId":"76561198274144074","name":"PNAL | Eskabe","rating":2167,"rank":357,"wins":1410,"losses":1221,"streak":1,"countryCode":"AR"},{"profileId":21547256,"steamId":"76561199703008320","name":"YMH","rating":2167,"rank":358,"wins":448,"losses":368,"streak":-5,"countryCode":"CN"},{"profileId":2934597,"steamId":"76561198316701086","name":"nW | Sgt.Pepper","rating":2166,"rank":359,"wins":2776,"losses":2672,"streak":1,"countryCode":"MX"},{"profileId":383378,"steamId":"76561198225051492","name":"Guiik","rating":2164,"rank":360,"wins":430,"losses":344,"streak":5,"countryCode":"FR"},{"profileId":285508,"steamId":"76561198055096506","name":"flightlessbird","rating":2161,"rank":361,"wins":555,"losses":383,"streak":3,"countryCode":"NZ"},{"profileId":3072788,"steamId":"76561198347493304","name":"Z4ID","rating":2161,"rank":362,"wins":1089,"losses":957,"streak":2,"countryCode":"PK"},{"profileId":2227707,"steamId":"76561198042671589","name":"Goatmaster","rating":2161,"rank":363,"wins":1705,"losses":1598,"streak":1,"countryCode":"SE"},{"profileId":24537812,"steamId":"76561198755028904","name":"ToBe","rating":2159,"rank":364,"wins":84,"losses":20,"streak":-2,"countryCode":"VN"},{"profileId":10336951,"steamId":"76561199022211535","name":"Edelreiss","rating":2156,"rank":365,"wins":2053,"losses":1933,"streak":1,"countryCode":"TR"},{"profileId":232376,"steamId":"76561198178507655","name":"dog9you","rating":2155,"rank":366,"wins":4385,"losses":4468,"streak":3,"countryCode":"HK"},{"profileId":15178088,"steamId":"76561199508138181","name":"ITA | Killer","rating":2154,"rank":367,"wins":328,"losses":241,"streak":-1,"countryCode":"IT"},{"profileId":9702563,"steamId":"76561199172849864","name":"Sharky aoe","rating":2154,"rank":368,"wins":631,"losses":545,"streak":-1,"countryCode":"FR"},{"profileId":20830378,"steamId":"76561199780222711","name":"laptopGuru","rating":2153,"rank":369,"wins":121,"losses":62,"streak":3,"countryCode":"SK"},{"profileId":11635889,"steamId":"76561199435207833","name":"PSG EUROPEAN CHAMPIONS","rating":2152,"rank":370,"wins":762,"losses":673,"streak":-1,"countryCode":"FR"},{"profileId":4930851,"steamId":"76561199135063433","name":"umugwanyi","rating":2152,"rank":371,"wins":828,"losses":740,"streak":4,"countryCode":"TR"},{"profileId":770700,"steamId":"76561198857001307","name":"ceepki","rating":2151,"rank":372,"wins":2744,"losses":2645,"streak":3,"countryCode":"HR"},{"profileId":2274072,"steamId":"76561198077675700","name":"Argh","rating":2151,"rank":373,"wins":2143,"losses":2095,"streak":-1,"countryCode":"PL"},{"profileId":875303,"steamId":"76561198044690951","name":"danger_noodle42","rating":2150,"rank":374,"wins":2634,"losses":2493,"streak":1,"countryCode":"BE"},{"profileId":5279457,"steamId":"76561199152101267","name":"kable.xpress","rating":2150,"rank":375,"wins":2118,"losses":1963,"streak":2,"countryCode":"AR"},{"profileId":2171446,"steamId":"76561199041924108","name":"DolunaK","rating":2150,"rank":376,"wins":2600,"losses":2543,"streak":2,"countryCode":"AR"},{"profileId":879956,"steamId":"76561198009215213","name":"Dziamdziak","rating":2149,"rank":377,"wins":1398,"losses":1317,"streak":1,"countryCode":"PL"},{"profileId":15442657,"steamId":"76561199520012237","name":"Nacional","rating":2147,"rank":378,"wins":2310,"losses":2224,"streak":3,"countryCode":"UY"},{"profileId":611972,"steamId":"76561198029304374","name":"Adam","rating":2147,"rank":379,"wins":1133,"losses":1010,"streak":6,"countryCode":"MX"},{"profileId":775196,"steamId":"76561198260708227","name":"_[eC]_Gurke_","rating":2145,"rank":380,"wins":3228,"losses":3143,"streak":-1,"countryCode":"DE"},{"profileId":11618587,"steamId":"76561199433491153","name":"CTM | Felices Fiestas Patrias PE","rating":2142,"rank":381,"wins":729,"losses":622,"streak":5,"countryCode":"PE"},{"profileId":11541957,"steamId":"76561199424324080","name":"plumeria","rating":2142,"rank":382,"wins":510,"losses":461,"streak":-3,"countryCode":"TW"},{"profileId":1886161,"steamId":"76561198040674687","name":"woaF","rating":2142,"rank":383,"wins":517,"losses":440,"streak":4,"countryCode":"SK"},{"profileId":1782455,"steamId":"76561198417440357","name":"CN_Dauh","rating":2142,"rank":384,"wins":4439,"losses":4244,"streak":-1,"countryCode":"CN"},{"profileId":6316201,"steamId":"76561199200365187","name":"\uC6B0\uB9AC\uAC00 \uAC00\uC7A5 \uBE44\uD1B5\uD55C \uACF3","rating":2139,"rank":385,"wins":565,"losses":441,"streak":3,"countryCode":"TR"},{"profileId":4933344,"steamId":"76561199135004025","name":"[LW] Faneth","rating":2139,"rank":386,"wins":322,"losses":240,"streak":1,"countryCode":"NL"},{"profileId":2473598,"steamId":"76561199047248243","name":"Old Boris","rating":2139,"rank":387,"wins":1028,"losses":976,"streak":4,"countryCode":"IT"},{"profileId":4985646,"steamId":"76561199137821329","name":"Pue","rating":2138,"rank":388,"wins":457,"losses":371,"streak":3,"countryCode":"DE"},{"profileId":891821,"steamId":"76561198119324752","name":"Artur","rating":2136,"rank":389,"wins":941,"losses":805,"streak":3,"countryCode":"BR"},{"profileId":20383862,"steamId":"76561199747672724","name":"twitch.tv/s0laf1d3","rating":2136,"rank":390,"wins":2416,"losses":2356,"streak":1,"countryCode":"US"},{"profileId":673427,"steamId":"76561198984773156","name":"AOKI_Thanouille","rating":2135,"rank":391,"wins":1889,"losses":1832,"streak":2,"countryCode":"FR"},{"profileId":234400,"steamId":"76561198041217626","name":"FelixAldi","rating":2135,"rank":392,"wins":3957,"losses":3868,"streak":1,"countryCode":"DE"},{"profileId":1280400,"steamId":"76561199004534372","name":"Love_Cheng_","rating":2135,"rank":393,"wins":1957,"losses":1849,"streak":-1,"countryCode":"VN"},{"profileId":20040729,"steamId":"76561199706217164","name":"ElPepe","rating":2134,"rank":394,"wins":369,"losses":296,"streak":5,"countryCode":"UY"},{"profileId":375935,"steamId":"76561198097669299","name":"[JA]Xerxes","rating":2132,"rank":395,"wins":5824,"losses":5696,"streak":1,"countryCode":"HU"},{"profileId":7082269,"steamId":"76561198139177321","name":"LM | kingofthrowing123","rating":2132,"rank":396,"wins":1351,"losses":1297,"streak":-1,"countryCode":"DE"},{"profileId":16145701,"steamId":"76561199536337431","name":"comrade in arms","rating":2130,"rank":397,"wins":438,"losses":338,"streak":3,"countryCode":"SG"},{"profileId":3265324,"steamId":"76561199083829139","name":"CTM | Lelo \u2729\xB0\uFF61 \u22C6\u2E1C \u272E","rating":2130,"rank":398,"wins":281,"losses":225,"streak":3,"countryCode":"PE"},{"profileId":21918692,"steamId":"76561199819794669","name":"MatzeAoE","rating":2130,"rank":399,"wins":1197,"losses":1153,"streak":-1,"countryCode":"DE"},{"profileId":21528706,"steamId":"76561199807794879","name":"\u534A\u6708\u56DE\u6DD1","rating":2129,"rank":400,"wins":585,"losses":494,"streak":5,"countryCode":"CN"},{"profileId":13144794,"steamId":"","name":"Roxola1285","rating":2128,"rank":401,"wins":416,"losses":383,"streak":3,"countryCode":"AR"},{"profileId":3295803,"steamId":"76561198967905993","name":"Tumber","rating":2127,"rank":402,"wins":1486,"losses":1398,"streak":2,"countryCode":"AR"},{"profileId":10275400,"steamId":"76561199305735423","name":"CNZS_Xzzz","rating":2126,"rank":403,"wins":133,"losses":65,"streak":-2,"countryCode":"CN"},{"profileId":2272449,"steamId":"76561198253261765","name":"\u6C5F\u4E1C\u5C0F\u9738\u738B","rating":2126,"rank":404,"wins":1631,"losses":1454,"streak":1,"countryCode":"CN"},{"profileId":12191318,"steamId":"76561199467806279","name":"Player_3","rating":2125,"rank":405,"wins":257,"losses":194,"streak":-1,"countryCode":"DE"},{"profileId":3025516,"steamId":"76561199033655407","name":"Zionic","rating":2125,"rank":406,"wins":2318,"losses":2191,"streak":4,"countryCode":"CN"},{"profileId":2194634,"steamId":"76561198992862323","name":"squashy5000","rating":2125,"rank":407,"wins":1693,"losses":1636,"streak":-1,"countryCode":"NL"},{"profileId":209917,"steamId":"76561198262851995","name":"Envetel","rating":2124,"rank":408,"wins":832,"losses":759,"streak":1,"countryCode":"CN"},{"profileId":6758959,"steamId":"76561199210119322","name":"sansarr_","rating":2123,"rank":409,"wins":480,"losses":366,"streak":-1,"countryCode":"TR"},{"profileId":559085,"steamId":"76561198342056971","name":"NuclearPasta","rating":2123,"rank":410,"wins":703,"losses":623,"streak":3,"countryCode":"CA"},{"profileId":555887,"steamId":"76561198107192611","name":"Honeybadger","rating":2123,"rank":411,"wins":182,"losses":130,"streak":2,"countryCode":"US"},{"profileId":11441215,"steamId":"76561199412958998","name":"squashy_aoe","rating":2122,"rank":412,"wins":408,"losses":330,"streak":1,"countryCode":"IN"},{"profileId":20663822,"steamId":"76561199764884290","name":"Iris","rating":2122,"rank":413,"wins":683,"losses":647,"streak":-1,"countryCode":"TW"},{"profileId":212135,"steamId":"76561198073316715","name":"Poxo","rating":2121,"rank":414,"wins":1167,"losses":1104,"streak":1,"countryCode":"ES"},{"profileId":1326441,"steamId":"76561198890660343","name":"Bass Is Heavy","rating":2121,"rank":415,"wins":3854,"losses":3721,"streak":8,"countryCode":"AR"},{"profileId":16072266,"steamId":"76561199535326839","name":"Jan Itor","rating":2120,"rank":416,"wins":129,"losses":61,"streak":10,"countryCode":"DE"},{"profileId":260921,"steamId":"76561198008604682","name":"nC_Future","rating":2120,"rank":417,"wins":4554,"losses":4482,"streak":1,"countryCode":"DE"},{"profileId":12249685,"steamId":"76561198099474226","name":"JOJO ROAD ROLLER","rating":2120,"rank":418,"wins":1903,"losses":1750,"streak":1,"countryCode":"US"},{"profileId":4576272,"steamId":"76561198846550648","name":"[CL] el castigador","rating":2120,"rank":419,"wins":2087,"losses":1945,"streak":2,"countryCode":"CL"},{"profileId":2897756,"steamId":"76561198088613720","name":"GGOut","rating":2120,"rank":420,"wins":1350,"losses":1286,"streak":-1,"countryCode":"SE"},{"profileId":5636956,"steamId":"76561199063154130","name":"YouAreNotAlone_","rating":2119,"rank":421,"wins":394,"losses":331,"streak":2,"countryCode":"AR"},{"profileId":2573480,"steamId":"76561199005265134","name":"Arsenic","rating":2119,"rank":422,"wins":757,"losses":645,"streak":1,"countryCode":"TW"},{"profileId":20719128,"steamId":"76561199769267931","name":"2459458787","rating":2119,"rank":423,"wins":228,"losses":160,"streak":4,"countryCode":"CN"},{"profileId":3313294,"steamId":"76561198257929749","name":"Lea","rating":2117,"rank":424,"wins":1234,"losses":1111,"streak":1,"countryCode":"AR"},{"profileId":733435,"steamId":"76561198818450120","name":"Legion64","rating":2116,"rank":425,"wins":2317,"losses":2197,"streak":-1,"countryCode":"IN"},{"profileId":1476288,"steamId":"76561199020734869","name":"MelkorAJ","rating":2116,"rank":426,"wins":2843,"losses":2804,"streak":-3,"countryCode":"SI"},{"profileId":23000509,"steamId":"76561198139641649","name":"boanaan","rating":2116,"rank":427,"wins":1122,"losses":1027,"streak":4,"countryCode":"NL"},{"profileId":508080,"steamId":"76561198327604853","name":"RoR | AngelinaJolie","rating":2114,"rank":428,"wins":1173,"losses":908,"streak":1,"countryCode":"NL"},{"profileId":14614937,"steamId":"76561199314786165","name":"\u6CE8\u6C34\u732A\u8089","rating":2113,"rank":429,"wins":231,"losses":164,"streak":2,"countryCode":"CN"},{"profileId":209204,"steamId":"76561198136062883","name":"ITA | Killer_Storm_","rating":2113,"rank":430,"wins":579,"losses":464,"streak":3,"countryCode":"IT"},{"profileId":1655684,"steamId":"76561199024989255","name":"z\u9752\u9E1F127","rating":2113,"rank":431,"wins":761,"losses":674,"streak":2,"countryCode":"CN"},{"profileId":790834,"steamId":"76561198366760901","name":"ANKR.Rory","rating":2112,"rank":432,"wins":237,"losses":117,"streak":1,"countryCode":"TW"},{"profileId":652173,"steamId":"76561198094665376","name":"Riveryyy","rating":2112,"rank":433,"wins":1044,"losses":946,"streak":1,"countryCode":"RU"},{"profileId":2016787,"steamId":"76561198387914287","name":"Pato Lucas","rating":2112,"rank":434,"wins":2555,"losses":2441,"streak":-1,"countryCode":"AR"},{"profileId":25273866,"steamId":"76561198712056324","name":"gupo57","rating":2110,"rank":435,"wins":429,"losses":370,"streak":2,"countryCode":"JP"},{"profileId":727835,"steamId":"76561198276454483","name":"Kalpit00","rating":2109,"rank":436,"wins":2494,"losses":2446,"streak":2,"countryCode":"US"},{"profileId":20844103,"steamId":"76561199781333353","name":"[CL] castiii","rating":2109,"rank":437,"wins":326,"losses":247,"streak":3,"countryCode":"CL"},{"profileId":11774083,"steamId":"76561199439208050","name":"ButterNToastThe3rd","rating":2108,"rank":438,"wins":388,"losses":299,"streak":2,"countryCode":"BD"},{"profileId":19844462,"steamId":"76561199691299143","name":"FMG | Esteban","rating":2108,"rank":439,"wins":650,"losses":594,"streak":-3,"countryCode":"UY"},{"profileId":23217628,"steamId":"76561199872960782","name":"Tio GG  El imperio contraataca","rating":2107,"rank":440,"wins":188,"losses":128,"streak":1,"countryCode":"PE"},{"profileId":4797984,"steamId":"76561198822411126","name":"\u82E6\u4FEE","rating":2106,"rank":441,"wins":106,"losses":49,"streak":2,"countryCode":"CN"},{"profileId":917863,"steamId":"76561198798740253","name":"hK | Romell13","rating":2105,"rank":442,"wins":1670,"losses":1535,"streak":2,"countryCode":"MX"},{"profileId":2577008,"steamId":"76561198125573029","name":"ShaDoWn","rating":2105,"rank":443,"wins":695,"losses":619,"streak":5,"countryCode":"FR"},{"profileId":22099280,"steamId":"76561199692084234","name":"\u9999\u591A\u6770","rating":2105,"rank":444,"wins":529,"losses":470,"streak":-1,"countryCode":"CN"},{"profileId":4599026,"steamId":"76561198201800170","name":"\u0160teuko","rating":2104,"rank":445,"wins":1662,"losses":1577,"streak":-1,"countryCode":"SK"},{"profileId":959109,"steamId":"76561198826803794","name":"PlaYBoY","rating":2104,"rank":446,"wins":1209,"losses":1103,"streak":-1,"countryCode":"BR"},{"profileId":3387238,"steamId":"76561198940691854","name":"WackieChan_","rating":2104,"rank":447,"wins":427,"losses":330,"streak":9,"countryCode":"BD"},{"profileId":2524306,"steamId":"76561198005822338","name":"Retember","rating":2104,"rank":448,"wins":895,"losses":857,"streak":3,"countryCode":"CO"},{"profileId":581759,"steamId":"76561198041760221","name":"DasLetzte","rating":2103,"rank":449,"wins":1908,"losses":1806,"streak":2,"countryCode":"DE"},{"profileId":4422117,"steamId":"76561198066947162","name":"Monkey Boy","rating":2103,"rank":450,"wins":654,"losses":559,"streak":-1,"countryCode":"DE"},{"profileId":3180554,"steamId":"76561198995230048","name":"H\u841D\u535C","rating":2102,"rank":451,"wins":682,"losses":587,"streak":-1,"countryCode":"CN"},{"profileId":23681799,"steamId":"76561198790639941","name":"Ugnis","rating":2102,"rank":452,"wins":125,"losses":62,"streak":5,"countryCode":"GT"},{"profileId":1743420,"steamId":"76561198833808414","name":"NuMa | OliverAtom","rating":2101,"rank":453,"wins":3908,"losses":3868,"streak":-1,"countryCode":"CO"},{"profileId":6410880,"steamId":"76561199205153778","name":"Man_at_Laptop","rating":2100,"rank":454,"wins":1146,"losses":1071,"streak":2,"countryCode":"CO"},{"profileId":5424138,"steamId":"76561198114210091","name":"Speed","rating":2100,"rank":455,"wins":1448,"losses":1363,"streak":-2,"countryCode":"MT"},{"profileId":3141220,"steamId":"76561198898474173","name":"Muzio","rating":2100,"rank":456,"wins":778,"losses":710,"streak":4,"countryCode":"US"},{"profileId":2925148,"steamId":"76561199067292136","name":"be water my friend","rating":2100,"rank":457,"wins":1761,"losses":1649,"streak":3,"countryCode":"CN"},{"profileId":2825261,"steamId":"76561199065576320","name":"VL Tou","rating":2100,"rank":458,"wins":1749,"losses":1656,"streak":2,"countryCode":"CO"},{"profileId":9865998,"steamId":"76561199260907502","name":"wappla","rating":2099,"rank":459,"wins":1061,"losses":997,"streak":1,"countryCode":"US"},{"profileId":222102,"steamId":"76561198107361309","name":"NOC | Annotoph","rating":2099,"rank":460,"wins":266,"losses":164,"streak":4,"countryCode":"DE"},{"profileId":281038,"steamId":"76561198042200507","name":"Ezio","rating":2098,"rank":461,"wins":2751,"losses":2602,"streak":-5,"countryCode":"DE"},{"profileId":20556036,"steamId":"76561199757254736","name":"Luo_CiHun","rating":2098,"rank":462,"wins":252,"losses":189,"streak":1,"countryCode":"US"},{"profileId":5936228,"steamId":"76561198088305382","name":"NicoDA","rating":2096,"rank":463,"wins":2479,"losses":2353,"streak":-3,"countryCode":"AR"},{"profileId":18598248,"steamId":"76561199618806121","name":"DS_ViejoChoto","rating":2096,"rank":464,"wins":600,"losses":499,"streak":1,"countryCode":"UY"},{"profileId":15629212,"steamId":"76561199524791413","name":"3046964519","rating":2095,"rank":465,"wins":935,"losses":826,"streak":6,"countryCode":"CN"},{"profileId":2294850,"steamId":"76561198157231086","name":"Chelo","rating":2095,"rank":466,"wins":2546,"losses":2391,"streak":1,"countryCode":"AR"},{"profileId":1117520,"steamId":"76561198840710960","name":"SSNoyer","rating":2094,"rank":467,"wins":763,"losses":661,"streak":4,"countryCode":"CA"},{"profileId":209753,"steamId":"76561198880475732","name":"UX","rating":2094,"rank":468,"wins":1053,"losses":936,"streak":-1,"countryCode":"CN"},{"profileId":2810993,"steamId":"76561198057560347","name":"Grabwespe","rating":2094,"rank":469,"wins":1368,"losses":1281,"streak":1,"countryCode":"DE"},{"profileId":2411454,"steamId":"76561199047900165","name":"\u795E\u660E\u4E0E\u5979","rating":2094,"rank":470,"wins":560,"losses":442,"streak":-1,"countryCode":"AR"},{"profileId":1947348,"steamId":"76561198857332668","name":"VEN\xD3N | Uxiono","rating":2094,"rank":471,"wins":442,"losses":347,"streak":-3,"countryCode":"MX"},{"profileId":1021651,"steamId":"76561198396796451","name":"[bK] Faraday__","rating":2093,"rank":472,"wins":848,"losses":733,"streak":-1,"countryCode":"BR"},{"profileId":10840748,"steamId":"76561198034475441","name":"DK | Mauseren","rating":2092,"rank":473,"wins":1549,"losses":1462,"streak":1,"countryCode":"DK"},{"profileId":3193084,"steamId":"76561198849608197","name":"\u53EF\u611B\u6D17\u9762\u5976","rating":2092,"rank":474,"wins":1755,"losses":1640,"streak":-4,"countryCode":"CN"},{"profileId":2422210,"steamId":"76561198046579350","name":"Quix","rating":2091,"rank":475,"wins":578,"losses":482,"streak":1,"countryCode":"US"},{"profileId":3683520,"steamId":"76561198070094544","name":"Elacrai","rating":2090,"rank":476,"wins":502,"losses":430,"streak":1,"countryCode":"CH"},{"profileId":2814500,"steamId":"76561199064941239","name":"DGHIR | ZARC","rating":2090,"rank":477,"wins":2332,"losses":2216,"streak":2,"countryCode":"CL"},{"profileId":1273839,"steamId":"76561198856814499","name":"185 godfish","rating":2090,"rank":478,"wins":851,"losses":774,"streak":-2,"countryCode":"CN"},{"profileId":20627516,"steamId":"76561199681990379","name":"last\u8F9B\u795E\u4E36","rating":2089,"rank":479,"wins":180,"losses":122,"streak":2,"countryCode":"CN"},{"profileId":254645,"steamId":"76561197989252667","name":"avlid","rating":2088,"rank":480,"wins":1387,"losses":1311,"streak":-1,"countryCode":"SE"},{"profileId":23368203,"steamId":"76561199881391383","name":"SharkLab","rating":2088,"rank":481,"wins":175,"losses":115,"streak":2,"countryCode":"FR"},{"profileId":226697,"steamId":"76561198102088260","name":"DemonSheep","rating":2085,"rank":482,"wins":1384,"losses":1186,"streak":1,"countryCode":"TW"},{"profileId":24453600,"steamId":"76561198759769167","name":"< blank >","rating":2085,"rank":483,"wins":255,"losses":190,"streak":-1,"countryCode":"TR"},{"profileId":18148390,"steamId":"76561198086626993","name":"DS_Alec","rating":2085,"rank":484,"wins":1002,"losses":919,"streak":1,"countryCode":"UY"},{"profileId":22743349,"steamId":"76561199853690850","name":"Ciro Marchesi","rating":2083,"rank":485,"wins":163,"losses":100,"streak":1,"countryCode":"IT"},{"profileId":10833211,"steamId":"76561199379709325","name":"mongo","rating":2081,"rank":486,"wins":1595,"losses":1500,"streak":-1,"countryCode":"CN"},{"profileId":24486592,"steamId":"76561198758281343","name":"tigerdownhill_","rating":2081,"rank":487,"wins":171,"losses":124,"streak":9,"countryCode":"VN"},{"profileId":1016523,"steamId":"76561198091040819","name":"Y","rating":2080,"rank":488,"wins":777,"losses":744,"streak":-2,"countryCode":"AR"},{"profileId":2105052,"steamId":"76561199040566014","name":"Kerchak","rating":2080,"rank":489,"wins":420,"losses":359,"streak":3,"countryCode":"CA"},{"profileId":22003517,"steamId":"76561198399576689","name":"hK | FraKTal","rating":2080,"rank":490,"wins":397,"losses":326,"streak":-2,"countryCode":"MX"},{"profileId":3302487,"steamId":"76561199085643802","name":"AceRx","rating":2079,"rank":491,"wins":707,"losses":593,"streak":15,"countryCode":"AR"},{"profileId":369122,"steamId":"76561198103474760","name":"Juyhou","rating":2079,"rank":492,"wins":304,"losses":220,"streak":-1,"countryCode":"FI"},{"profileId":25040970,"steamId":"76561198824853654","name":"Lakhdher","rating":2079,"rank":493,"wins":152,"losses":100,"streak":2,"countryCode":"DE"},{"profileId":23417084,"steamId":"76561199883607514","name":"\u5C55\u6BC5^-^","rating":2079,"rank":494,"wins":143,"losses":96,"streak":3,"countryCode":"FR"},{"profileId":280742,"steamId":"76561198358412384","name":"Ovenka","rating":2078,"rank":495,"wins":569,"losses":465,"streak":-1,"countryCode":"CZ"},{"profileId":23032522,"steamId":"76561199865619087","name":"La Ultima Gonorrea del Desierto","rating":2078,"rank":496,"wins":180,"losses":122,"streak":1,"countryCode":"PE"},{"profileId":9766616,"steamId":"76561199252532294","name":"TheZero","rating":2076,"rank":497,"wins":209,"losses":116,"streak":1,"countryCode":"CN"},{"profileId":5832372,"steamId":"76561198201294534","name":"Patoshiq","rating":2076,"rank":498,"wins":1389,"losses":1298,"streak":-1,"countryCode":"TR"},{"profileId":210372,"steamId":"76561198036054306","name":"Hiko_Seijuro","rating":2076,"rank":499,"wins":2005,"losses":1833,"streak":4,"countryCode":"BE"},{"profileId":1334898,"steamId":"76561198387843915","name":"[LuB]myqbox","rating":2076,"rank":500,"wins":1702,"losses":1635,"streak":1,"countryCode":"TW"}]`), a0 = {
    players: t0
  }, n0 = {
    "arabia.png": qp,
    "land-madness.png": $p,
    "acropolis.png": Op,
    "african-clearing.png": Bp,
    "atacama.png": Gp,
    "gold-rush.png": Kp,
    "land-nomad.png": Wp,
    "arena.png": Hp,
    "fortified-clearing.png": Xp,
    "hideout.png": Jp,
    "black-forest.png": Qp,
    "michi.png": e0,
    "four-lakes.png": Vp,
    "baltic.png": Yp,
    "islands.png": Fp,
    "mediterranean.png": Pp,
    "golden-swamp.png": Zp
  }, nn = kc.map((r) => ({
    id: r.id,
    name: r.name,
    style: r.style,
    thumbnailUrl: n0[r.imageAsset]
  })), sn = It.groups.map((r) => ({
    ...r,
    maps: nn.filter((c) => {
      var _a2;
      return ((_a2 = It.maps.find((f) => f.id === c.id)) == null ? void 0 : _a2.groupId) === r.id;
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
  }, Sc = a0.players.map((r) => {
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
      division: Nn(r.rating),
      wins: c,
      losses: f,
      winRate: Number((c / (c + f) * 100).toFixed(1)),
      streak: r.streak,
      preferredMaps: [],
      favoriteCivilizations: [],
      recentForm: []
    };
  }), _1 = Sc.filter((r) => r.id !== Ia.id).slice(10, 18);
  Object.fromEntries(kc.map((r) => [
    r.gameMapName,
    r.lobbyPickerResultIndex
  ]));
  const s0 = kc.filter((r) => r.isCustomMap).map((r) => r.gameMapName), la = {
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
      customMapNames: s0,
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
  }, i0 = 150, D1 = 4e3, Ye = {
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
  }, l0 = {
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
  function r0(r) {
    return `[${(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour12: false
    })}] ${r}`;
  }
  class o0 {
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
          serverRegion: c.serverRegion,
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
  const Ul = [
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
  function c0(r, c, f = [], u = Math.random) {
    if ((r == null ? void 0 : r.mode) !== "random") return r;
    const m = c === "land-open" ? r.openLandBans : c === "land-closed" ? r.closedLandBans : [], h = /* @__PURE__ */ new Set([
      ...m ?? [],
      ...f
    ]), x = Ul.filter((j) => !h.has(j));
    return {
      mode: "pick",
      civilization: x[Math.floor(u() * x.length)]
    };
  }
  const u0 = "http://192.168.4.99:4317".replace(/\/$/, "");
  class d0 {
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
      const m = crypto.randomUUID(), h = new Promise((x, j) => {
        this.pending.set(m, {
          resolve: (k) => x(k),
          reject: j
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
      const c = new URL("/events", u0);
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
  const Me = new d0();
  class f0 {
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
      ].forEach((x, j) => {
        h.push(window.setTimeout(() => {
          const k = [
            50,
            75,
            100,
            150,
            250
          ][j], y = this.queueRatings.get(c) ?? Ia.rating;
          f({
            type: "range",
            minRating: y - k,
            maxRating: y + k
          });
        }, x));
      }), h.push(window.setTimeout(() => {
        var _a2;
        const x = this.queuedDefinitions.get(c) ?? u, j = (x == null ? void 0 : x.mapPool) ?? nn, k = {
          mapPool: nn,
          mapPreferences: {
            favoriteMapIds: {}
          }
        }, y = this.lowerRatingLimits.get(c) ?? 0, C = y > 0 ? _1.filter((V) => V.rating >= Ia.rating - y) : _1, D = C[Math.floor(Math.random() * C.length)];
        if (!D) return;
        const Q = Lp(x ?? {
          mapPool: j
        }, k), q = (_a2 = It.maps.find((V) => V.id === (Q == null ? void 0 : Q.id))) == null ? void 0 : _a2.groupId, p = x ? {
          ...x,
          civilizationPreference: c0(x.civilizationPreference, q)
        } : void 0, F = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: p ?? {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: nn,
            mapPreferences: {
              enabledGroupIds: It.groups.map((V) => V.id),
              favoriteMapIds: {}
            },
            mapCatalogVersion: It.version,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          opponentCivilizationPreference: {
            mode: "pick",
            civilization: "Franks"
          },
          player: Ia,
          opponent: D,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 3e4).toISOString(),
          selectedMap: Q,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        f({
          type: "match_found",
          match: F
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
  class m0 {
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
  const zl = {
    async restore() {
      var _a2;
      if (ps = await ((_a2 = window.electronApi) == null ? void 0 : _a2.loadAuthToken()) ?? null, !ps) return null;
      Me.setToken(ps);
      try {
        const r = (await Me.request("/auth/me")).player;
        return await this.reportSteamLicense(r);
      } catch {
        return await this.logout(false), null;
      }
    },
    async signIn() {
      const r = await Me.request("/auth/steam/start", {
        method: "POST"
      });
      if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
      await window.electronApi.openSteamLogin(r.loginUrl);
      const c = Date.now() + 300 * 1e3;
      for (; Date.now() < c; ) {
        await new Promise((m) => window.setTimeout(m, 1e3));
        const f = await Me.request(`/auth/steam/status?attempt=${encodeURIComponent(r.attemptId)}&token=${encodeURIComponent(r.pollToken)}`);
        if (f.status === "pending") continue;
        if (f.status !== "authenticated" || !f.token) throw new Error(`Steam sign-in ${f.status}.`);
        ps = f.token, await window.electronApi.storeAuthToken(f.token), Me.setToken(f.token);
        const u = await Me.request("/auth/me");
        return await this.reportSteamLicense(u.player);
      }
      throw new Error("Steam sign-in timed out.");
    },
    async reportSteamLicense(r) {
      var _a2;
      if (!window.electronApi || !r.steamId) return r;
      const c = await window.electronApi.runSteamFamilyProbe(r.steamId).catch(() => null);
      return !c || c.status === "unknown" || !c.currentSteamId || !c.ownerSteamId ? r : ((_a2 = await Me.request("/auth/steam-license", {
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
      r && ps && await Me.request("/auth/logout", {
        method: "POST"
      }).catch(() => {
      }), ps = null, Me.setToken(null), await ((_a2 = window.electronApi) == null ? void 0 : _a2.clearAuthToken());
    }
  }, Ll = new URLSearchParams(window.location.search), ye = Ll.get("preview") === "1", h0 = ye && Ll.get("capture") === "1", U1 = ye ? Ll.get("page") : null, p0 = ye ? Ll.get("section") : null, hm = {
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
  }, Cc = [
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
  ].map(([r, c, f, u, m, h, x, j, k], y) => ({
    id: String(r),
    opponentId: `preview-player-${y + 1}`,
    opponent: String(c),
    opponentRating: Number(f),
    outcome: u,
    map: String(m),
    civilization: String(h),
    opponentCivilization: String(x),
    ratingChange: Number(j),
    durationMinutes: Number(k),
    timestamp: new Date(Date.now() - y * 864e5).toISOString(),
    verified: true,
    queueType: "Ranked 1v1 Random Map"
  })), sc = [
    fi("custom-1", "Friday Nomad FFA", "Land Nomad", 8, [
      "RelicRunner",
      "BoarPuller",
      "TownBell",
      "FastImp"
    ]),
    fi("custom-2", "CBA Practice", "CBA", 8, [
      "CastleClick",
      "FarmReset",
      "GoldMiner",
      "BerryGuard",
      "LoomFirst"
    ]),
    fi("custom-3", "Arena 2v2", "Arena", 4, [
      "MonkMicro",
      "WallBuilder",
      "StableSwitch"
    ]),
    fi("custom-4", "Michi No Rush", "Michi", 6, [
      "DarkAgeDan",
      "MarketAbuse"
    ]),
    fi("custom-5", "Community Megarandom", "Megarandom", 8, [
      "HillFort"
    ])
  ], pm = [
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
  ], gm = [
    {
      id: "request-1",
      connectionId: "connection-1",
      name: "CastleClick",
      initials: "CC",
      rating: 1464,
      mutualFriends: 3
    }
  ];
  function fi(r, c, f, u, m) {
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
      players: m.map((h, x) => ({
        id: `${r}-player-${x + 1}`,
        displayName: h,
        slot: x + 1,
        team: 0,
        civilization: "Random",
        ready: x < 2,
        host: x === 0
      })),
      messages: [],
      gameSettings: {
        ...hm
      },
      maxPlayers: u,
      status: "open",
      createdAt: new Date(Date.now() - m.length * 12e4).toISOString(),
      demo: true
    };
  }
  const L1 = {
    async getMine() {
      return ye ? Cc : (await Me.request("/matches/history")).matches;
    }
  }, g0 = "modulepreload", y0 = function(r, c) {
    return new URL(r, c).href;
  }, O1 = {}, ym = function(c, f, u) {
    let m = Promise.resolve();
    if (f && f.length > 0) {
      let x = function(C) {
        return Promise.all(C.map((D) => Promise.resolve(D).then((Q) => ({
          status: "fulfilled",
          value: Q
        }), (Q) => ({
          status: "rejected",
          reason: Q
        }))));
      };
      const j = document.getElementsByTagName("link"), k = document.querySelector("meta[property=csp-nonce]"), y = (k == null ? void 0 : k.nonce) || (k == null ? void 0 : k.getAttribute("nonce"));
      m = x(f.map((C) => {
        if (C = y0(C, u), C in O1) return;
        O1[C] = true;
        const D = C.endsWith(".css"), Q = D ? '[rel="stylesheet"]' : "";
        if (!!u) for (let F = j.length - 1; F >= 0; F--) {
          const V = j[F];
          if (V.href === C && (!D || V.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${C}"]${Q}`)) return;
        const p = document.createElement("link");
        if (p.rel = D ? "stylesheet" : g0, D || (p.as = "script"), p.crossOrigin = "", p.href = C, y && p.setAttribute("nonce", y), document.head.appendChild(p), D) return new Promise((F, V) => {
          p.addEventListener("load", F), p.addEventListener("error", () => V(new Error(`Unable to preload CSS for ${C}`)));
        });
      }));
    }
    function h(x) {
      const j = new Event("vite:preloadError", {
        cancelable: true
      });
      if (j.payload = x, window.dispatchEvent(j), !j.defaultPrevented) throw x;
    }
    return m.then((x) => {
      for (const j of x || []) j.status === "rejected" && h(j.reason);
      return c().catch(h);
    });
  };
  class Dl extends Error {
    constructor(c = false) {
      super(c ? "The team replay does not contain final PostGame results yet." : "The replay does not contain a PostGame or Resign operation yet."), this.name = "ReplayNotFinishedError";
    }
  }
  async function v0(r) {
    var _a2;
    if (!window.electronApi) return false;
    const { parse_rec: c } = await ym(async () => {
      const { parse_rec: h } = await import("./aoe2rec_js-u0v_7Je2.js").then(async (m2) => {
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
      const x = h.Action;
      if (typeof x != "object" || x === null) return false;
      const j = x.action_data;
      return typeof j == "object" && j !== null && "Resign" in j;
    })) ?? false;
  }
  async function b0(r, c = false) {
    var _a2, _b;
    if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
    const { parse_rec: f, parse_rec_summary: u } = await ym(async () => {
      const { parse_rec: K, parse_rec_summary: ne } = await import("./aoe2rec_js-u0v_7Je2.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: K,
        parse_rec_summary: ne
      };
    }, [], import.meta.url), m = await window.electronApi.readReplayFile(r), h = m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength);
    let x;
    try {
      x = f(h);
    } catch {
      throw new Dl();
    }
    const j = ((_a2 = x.operations) == null ? void 0 : _a2.some((K) => "PostGame" in K)) ?? false, k = (_b = x.operations) == null ? void 0 : _b.map((K) => K.Action).filter((K) => typeof K == "object" && K !== null).map((K) => K.action_data).filter((K) => typeof K == "object" && K !== null).map((K) => K.Resign).filter((K) => typeof K == "object" && K !== null).map((K) => K.player_id).find((K) => typeof K == "number");
    if (!c && !j && k === void 0) throw new Dl();
    const y = u(h), C = y.header.game_settings, D = y.header.replay, Q = y.teams.flatMap((K) => K.players.filter((ne) => ne.profile_id > 0).map((ne) => ({
      profileId: ne.profile_id,
      playerNumber: ne.player_number,
      civilizationId: ne.civ_id,
      resigned: ne.resigned
    }))), q = c || Q.length > 2;
    if (q && !j) throw new Dl(true);
    const p = y.teams.filter((K) => K.winner).flatMap((K) => K.players), F = y.teams.filter((K) => !K.winner).flatMap((K) => K.players), V = y.teams.flatMap((K) => K.players).filter((K) => K.profile_id > 0), ee = k === void 0 ? void 0 : V.find((K) => K.player_number === k), oe = !q && ee ? V.find((K) => K.player_number !== k) : p.find((K) => K.profile_id > 0), le = !q && ee || F.find((K) => K.profile_id > 0), he = Q.find((K) => K.playerNumber === y.header.replay.rec_player);
    if (![
      2,
      4,
      8
    ].includes(Q.length) || !oe || !le || !he) throw new Error("The replay does not contain identifiable winning and losing teams.");
    return {
      fileSizeBytes: m.byteLength,
      build: y.header.build,
      recordedAt: y.header.timestamp,
      durationMs: y.duration,
      players: Q.sort((K, ne) => K.profileId - ne.profileId),
      settings: {
        cheats: C.cheats,
        replayCheatsEnabled: D.cheats_enabled,
        instantBuild: D.instant_build,
        playerCount: C.n_players,
        populationLimit: C.population_limit,
        recordGame: C.record_game,
        gameType: C.game_type,
        replayGameMode: D.game_mode,
        gameSpeedId: D.game_speed_id,
        gameSpeed: D.game_speed,
        startingAgeId: C.starting_age_id,
        startingResourcesId: C.starting_resources_id,
        endingAgeId: C.ending_age_id,
        victoryTypeId: C.victory_type_id,
        victoryAmount: C.victory_amount,
        revealMap: C.reveal_map,
        lockTeams: C.lock_teams,
        allTechs: C.all_techs,
        handicap: C.handicap,
        sharedExploration: C.shared_exploration,
        teamBonusDisabled: C.team_bonus_disabled,
        treatyLength: C.treaty_length,
        selectedMapId: C.selected_map_id,
        resolvedMapId: C.resolved_map_id,
        rmsStrings: [
          ...C.rms_strings
        ]
      },
      reporterProfileId: he.profileId,
      winnerProfileId: oe.profile_id,
      loserProfileId: le.profile_id,
      winningProfileIds: p.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      losingProfileIds: F.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      reason: q ? F.filter((K) => K.profile_id > 0).every((K) => K.resigned) ? "resignation" : "defeat" : k !== void 0 || le.resigned ? "resignation" : "defeat"
    };
  }
  const vm = "empire-league:lobby-setup-timing:v1", bm = 100, wm = 120, w0 = 500, k0 = 6, S0 = 100;
  function C0(r) {
    const c = km(r), f = Sm()[xc(r)];
    return f.length ? Math.max(1e4, c + M0(f)) : c;
  }
  function x0(r, c) {
    if (!Number.isFinite(c) || c < 1e4 || c > 18e4) return;
    const f = xc(r), u = Sm(), m = Math.round(c - km(r));
    u[f] = [
      ...u[f],
      m
    ].slice(-9);
    try {
      window.localStorage.setItem(vm, JSON.stringify(u));
    } catch {
    }
  }
  function km(r) {
    const c = xc(r) === "custom", f = la.mapPicker, u = la.actions;
    let m = Ye.hostLobbyAutomationSettleMs;
    return m += k0 * S0 + u.multiplayer.settleMs, m += An(u.hostGame) + w0, m += An(u.createLobby), m += an() + Ye.resetFocusMs + Ye.resetConfirmationMs, m += an() + f.openSettleMs, m += an() + f.styleMenuSettleMs, m += an() + f.styleSelectionSettleMs, m += an() + f.searchSettleMs, m += an() + f.selectionSettleMs, m += An(u.copyLobbyUri) + Ye.clipboardReadMs, m += B1(r.queue.civilizationPreference), m += Ye.lobbyMetadataMs, m += Ye.guestJoinMs + Ye.guestReadySettleMs, m += B1(r.opponentCivilizationPreference), m += Ye.hostReadySettleMs + An(u.hostReady), c && (m += Ye.customMapTransferPollMs + u.guestReady.settleMs, m += i0 + u.confirmGuestContent.settleMs, m += Ye.hostReadySettleMs + An(u.hostReady)), m += Ye.customMapTransferPollMs, m += An(u.guestReady), m += Ye.hostReadyToStartMs + Ye.startGameSettleMs, m += An(u.startGame) + Ye.revealAfterStartMs, m;
  }
  function B1(r) {
    if (!r) return 0;
    let c = an() + la.civilizationSlotButtons.settleMs;
    return r.mode === "pick" && (c += an() + la.civilizationPicker.searchSettleMs), c += la.civilizationGrid.hoverMs + la.civilizationGrid.holdMs + la.civilizationPicker.selectionSettleMs, c += la.actions.confirmCivilization.settleMs, c;
  }
  function An(r) {
    return (r.hoverMs ?? bm) + (r.holdMs ?? wm) + r.settleMs;
  }
  function an() {
    return bm + wm;
  }
  function xc(r) {
    var _a2;
    return la.mapPicker.customMapNames.includes(((_a2 = r.selectedMap) == null ? void 0 : _a2.name) ?? "") ? "custom" : "standard";
  }
  function Sm() {
    try {
      const r = JSON.parse(window.localStorage.getItem(vm) ?? "{}");
      return {
        standard: q1(r.standard),
        custom: q1(r.custom)
      };
    } catch {
      return {
        standard: [],
        custom: []
      };
    }
  }
  function q1(r) {
    return Array.isArray(r) ? r.filter((c) => Number.isFinite(c) && Math.abs(c) <= 12e4).slice(-9) : [];
  }
  function M0(r) {
    const c = [
      ...r
    ].sort((u, m) => u - m), f = Math.floor(c.length / 2);
    return c.length % 2 === 0 ? Math.round((c[f - 1] + c[f]) / 2) : c[f];
  }
  const j0 = "empire-league:stop-youtube-shorts";
  async function mc() {
    window.dispatchEvent(new Event(j0)), document.fullscreenElement && await document.exitFullscreen().catch(() => {
    });
  }
  function A0(r) {
    return r === "home" || r === "ranked" || r === "weekly" || r === "custom" || r === "match-history" || r === "leaderboard" || r === "profile" || r === "social" || r === "settings";
  }
  const Cm = "empire-league-settings", ic = 7e3, H1 = 3e4, I0 = 65e3, In = {
    launchAoe2OnStartup: false,
    serverRegion: "US East",
    matchNotifications: true,
    autoRejectFamilySharing: false,
    maximumLowerOpponentRatingGap: 0
  }, N0 = [
    {
      id: "ranked-rm-1v1",
      name: "Ranked 1v1 Random Map",
      description: "Ranked 1v1 Random Map.",
      format: "1v1",
      ruleset: "Random Map",
      mapPool: nn,
      mapPreferences: {
        enabledGroupIds: It.groups.map((r) => r.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: It.version,
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
      mapPool: nn,
      mapPreferences: {
        enabledGroupIds: It.groups.map((r) => r.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: It.version,
      ranked: false,
      estimatedWaitSeconds: 90,
      playersSearching: 42
    }
  ], xm = T.createContext(null);
  function E0({ children: r }) {
    const [c, f] = T.useState(() => A0(U1) ? U1 : "home"), [u, m] = T.useState(null), [h, x] = T.useState("leaderboard"), j = T.useRef(0), k = T.useRef(null), [y, C] = T.useState(ye ? "authenticated" : "loading"), [D, Q] = T.useState(null), [q, p] = T.useState(() => ({
      currentUser: Ia,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null,
      transitionInputLocked: false,
      activeMatch: null,
      recentMatches: ye ? Cc : [],
      connectionStatus: "online",
      gameStatus: "installed",
      searchRange: {
        min: Ia.rating - 50,
        max: Ia.rating + 50
      },
      error: null,
      notifications: ye && !h0 ? [
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
      mockConfig: l0,
      settings: R0()
    })), F = T.useRef(q.mockConfig);
    F.current = q.mockConfig;
    const V = T.useRef(q);
    V.current = q;
    const ee = T.useRef(null), oe = T.useRef(false), le = T.useRef(null), he = T.useRef(null), K = T.useRef(false), ne = T.useRef(null), z = T.useRef(null), L = T.useRef(false), U = T.useRef(false);
    T.useEffect(() => {
      const M = k.current;
      if (!M || M.page !== c) return;
      k.current = null;
      const N = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          var _a2;
          (_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTo({
            top: M.top
          });
        });
      });
      return () => window.cancelAnimationFrame(N);
    }, [
      c
    ]);
    const J = T.useMemo(() => ({
      matchmaking: new f0(() => F.current),
      game: new o0(() => F.current),
      results: new m0(() => F.current)
    }), []);
    T.useEffect(() => {
      if (ye) return;
      let M = false;
      return zl.restore().then((N) => {
        M || (N ? (v(N), L1.getMine().then((Z) => {
          M || p((se) => ({
            ...se,
            currentUser: N,
            recentMatches: Z
          }));
        }).catch(() => {
          M || p((Z) => ({
            ...Z,
            currentUser: N,
            recentMatches: []
          }));
        }), C("authenticated")) : C("unauthenticated"));
      }).catch((N) => {
        M || (Q(G1(N, "Could not restore the Steam session.")), C("unauthenticated"));
      }), () => {
        M = true;
      };
    }, []), T.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayEnded((M) => {
        const N = V.current.activeMatch;
        !N || V.current.queueStatus !== "in_game" || L.current || (L.current = true, (async () => {
          var _a2;
          let Z;
          try {
            Z = await b0(M, N.queue.format === "team");
          } catch (se) {
            if (se instanceof Dl) {
              L.current = false;
              return;
            }
            const X = se instanceof Error ? se.message : "Replay parsing failed.";
            p((P) => ({
              ...P,
              queueStatus: "verifying_result"
            }));
            try {
              await J.matchmaking.reportMatchResult({
                matchId: N.id,
                error: X
              }), w("Replay could not be parsed; result reported as contested");
              return;
            } catch (P) {
              L.current = false, ae({
                code: "RESULT_VERIFICATION_FAILED",
                message: "The replay parsing failure could not be reported.",
                technicalDetails: P instanceof Error ? P.message : X,
                retryable: true
              });
              return;
            }
          }
          await ((_a2 = window.electronApi) == null ? void 0 : _a2.confirmReplayEnded()), p((se) => ({
            ...se,
            queueStatus: "verifying_result"
          })), w(`Replay ended with terminal operation (${Z.reason}): ${M}`);
          try {
            await J.matchmaking.reportMatchResult({
              matchId: N.id,
              replay: Z
            }), w("Replay result reported; waiting for opponent report");
          } catch (se) {
            L.current = false, ae({
              code: "RESULT_VERIFICATION_FAILED",
              message: "The replay result could not be reported.",
              technicalDetails: se instanceof Error ? se.message : "Matchmaker reporting failed.",
              retryable: true
            });
          }
        })());
      });
    }, [
      J
    ]), T.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayDetectionFailed((M) => {
        const N = V.current.activeMatch;
        !N || V.current.queueStatus !== "in_game" || L.current || (L.current = true, p((Z) => ({
          ...Z,
          queueStatus: "verifying_result"
        })), w("Replay recording did not start; reporting the result as contested"), J.matchmaking.reportMatchResult({
          matchId: N.id,
          error: M
        }).then(() => {
          w("Missing replay reported; waiting for contested result");
        }).catch((Z) => {
          L.current = false, ae({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: Z instanceof Error ? Z.message : M,
            retryable: true
          });
        }));
      });
    }, [
      J
    ]);
    async function te() {
      C("authenticating"), Q(null);
      try {
        const M = await zl.signIn();
        v(M);
        const N = await L1.getMine();
        p((Z) => ({
          ...Z,
          currentUser: M,
          recentMatches: N
        })), C("authenticated");
      } catch (M) {
        Q(G1(M, "Steam sign-in failed.")), C("unauthenticated");
      }
    }
    async function we() {
      var _a2;
      ye || (pe(), ee.current && await J.matchmaking.leaveQueue(ee.current).catch(() => {
      }), (_a2 = le.current) == null ? void 0 : _a2.call(le), ee.current = null, oe.current = false, await zl.logout(), p((M) => ({
        ...M,
        currentUser: Ia,
        queueStatus: "idle",
        selectedQueue: null,
        activeMatch: null
      })), C("unauthenticated"), f("home"));
    }
    T.useEffect(() => {
      if (ye) return;
      let M = false;
      async function N() {
        let se = null;
        try {
          if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
          const X = await window.electronApi.detectAoe2Installation();
          if (!X.installed || !X.path) {
            M || R(X.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
            return;
          }
          if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
            const nt = await window.electronApi.closeAoe2(true);
            if (!nt.closed) throw new Error(nt.message ?? "AoE2 could not be closed.");
          }
          if (!q.settings.launchAoe2OnStartup) return;
          if (p((Le) => ({
            ...Le,
            gameStatus: "loading"
          })), se = R("Loading AoE2 DE\u2026", "loading", {
            detail: "Waiting for the game window to become ready.",
            durationMs: null
          }), !await Y1((Le) => {
            se && $(se, {
              detail: Le
            });
          })) throw new Error("AoE2 started, but its game window did not become ready in time.");
          se && $(se, {
            detail: "Finishing game startup."
          }), await lc(ic), M || (p((Le) => ({
            ...Le,
            gameStatus: "running"
          })), se && $(se, {
            message: "AoE2 DE is ready",
            tone: "success",
            detail: void 0,
            durationMs: 5e3
          }));
        } catch (X) {
          M || (se && H(se), p((P) => ({
            ...P,
            gameStatus: "installed"
          })), R(X instanceof Error ? X.message : "AoE2 DE could not be launched.", "danger"));
        }
      }
      const Z = window.setTimeout(() => void N(), 0);
      return () => {
        M = true, window.clearTimeout(Z);
      };
    }, []);
    async function ze(M) {
      let N = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        const Z = await window.electronApi.detectAoe2Installation();
        if (!Z.installed || !Z.path) throw new Error(Z.message ?? "AoE2 DE was not detected.");
        const se = await window.electronApi.detectAoe2Process();
        if (se.running && !se.owned && !(await window.electronApi.closeAoe2(false)).closed) {
          const ce = await window.electronApi.closeAoe2(true);
          if (!ce.closed) throw new Error(ce.message ?? "The existing AoE2 process could not be closed.");
        }
        if (p((P) => ({
          ...P,
          gameStatus: "loading"
        })), N = R("Launching AoE2 DE\u2026", "loading", {
          detail: M === "custom" ? "Your custom game action will continue automatically when the game is ready." : "Matchmaking will begin automatically when the game is ready.",
          durationMs: null
        }), !await Y1((P) => {
          N && $(N, {
            detail: P
          });
        })) throw new Error("AoE2 started, but its game window did not become ready in time.");
        return $(N, {
          detail: "Finishing game startup."
        }), await lc(ic), p((P) => ({
          ...P,
          gameStatus: "running"
        })), $(N, {
          message: "AoE2 DE is ready",
          tone: "success",
          detail: M === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
          durationMs: 3e3
        }), true;
      } catch (Z) {
        return N && H(N), p((se) => ({
          ...se,
          gameStatus: "installed"
        })), R(Z instanceof Error ? Z.message : "AoE2 DE could not be launched.", "danger"), false;
      }
    }
    async function Ee(M = "matchmaking") {
      if (!window.electronApi) return true;
      const N = await window.electronApi.detectAoe2Process();
      return N.running && N.windowReady && N.owned ? true : ze(M);
    }
    async function at() {
      let M = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        if (he.current = null, await window.electronApi.setLobbyInputLock(false).catch(() => ({
          locked: false
        })), p((P) => ({
          ...P,
          gameStatus: "loading",
          transitionInputLocked: false,
          roomSetupStartedAt: null,
          roomSetupEstimateMs: null,
          roomSetupMilestone: "Resetting AoE2 after disconnect"
        })), M = R("Resetting AoE2 after the disconnect\u2026", "loading", {
          detail: "Closing the abandoned lobby before returning to matchmaking.",
          durationMs: null,
          dismissible: false
        }), (await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
          $(M, {
            detail: "AoE2 did not close normally; forcing it to exit."
          });
          const ce = await window.electronApi.closeAoe2(true);
          if (!ce.closed) throw new Error(ce.message ?? "The abandoned AoE2 process could not be closed.");
        }
        if ((await window.electronApi.detectAoe2Process()).running) throw new Error("AoE2 was still running after the close operation.");
        $(M, {
          detail: "Launching a clean AoE2 session."
        });
        const se = await window.electronApi.launchAoe2();
        if (!se.launched) throw new Error(se.message ?? "Steam did not accept the AoE2 DE launch request.");
        if (!await hc(12e4)) throw new Error("AoE2 restarted, but its game window did not become ready in time.");
        return $(M, {
          detail: "Finishing game startup."
        }), await lc(ic), p((P) => ({
          ...P,
          gameStatus: "running",
          roomSetupMilestone: null
        })), $(M, {
          message: "AoE2 is ready",
          tone: "success",
          detail: "Returning to matchmaking.",
          durationMs: 3e3,
          dismissible: true
        }), true;
      } catch (N) {
        return M && H(M), p((Z) => ({
          ...Z,
          gameStatus: "installed",
          transitionInputLocked: false,
          roomSetupMilestone: null
        })), R(N instanceof Error ? N.message : "AoE2 could not be reset after the disconnect.", "danger"), false;
      }
    }
    function w(M) {
      p((N) => ({
        ...N,
        eventLog: [
          r0(M),
          ...N.eventLog
        ].slice(0, 80)
      }));
    }
    function R(M, N = "info", Z = {}) {
      const se = crypto.randomUUID();
      return p((X) => ({
        ...X,
        notifications: [
          {
            id: se,
            message: M,
            tone: N,
            detail: Z.detail,
            durationMs: Z.durationMs === void 0 ? N === "danger" ? 8e3 : 5e3 : Z.durationMs,
            dismissible: Z.dismissible
          },
          ...X.notifications
        ].slice(0, 4)
      })), se;
    }
    function W() {
      pe(), z.current = window.setTimeout(() => {
        z.current = null;
        const M = V.current.selectedQueue;
        M && fe(M, "Lobby setup stopped making progress for 65 seconds.");
      }, I0);
    }
    async function fe(M, N) {
      var _a2, _b;
      if (K.current) return;
      K.current = true, (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), pe(), oe.current = false, ne.current = null, he.current = null, (_b = le.current) == null ? void 0 : _b.call(le), le.current = null;
      const Z = ee.current;
      ee.current = null, p((X) => ({
        ...X,
        queueStatus: "cancelled",
        activeMatch: null,
        error: null,
        transitionInputLocked: false,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), R(N, "warning", {
        durationMs: 5e3,
        dismissible: false
      }), Z && await J.matchmaking.leaveQueue(Z).catch(() => {
      }), w("Lobby setup failed; resetting AoE2 before returning to queue");
      const se = await at();
      K.current = false, se && await ge(M);
    }
    function pe() {
      z.current !== null && (window.clearTimeout(z.current), z.current = null);
    }
    function v(M) {
      M.steamLicenseStatus !== "family_shared" || U.current || (U.current = true, R("Opponents may reject matches with you because you are using family share.", "warning", {
        durationMs: null,
        dismissible: true
      }));
    }
    function H(M) {
      p((N) => {
        var _a2, _b;
        return {
          ...N,
          notifications: N.notifications.filter((Z) => Z.id !== M),
          error: ((_a2 = N.error) == null ? void 0 : _a2.notificationId) === M ? null : N.error,
          queueStatus: ((_b = N.error) == null ? void 0 : _b.notificationId) === M && N.queueStatus === "error" ? "idle" : N.queueStatus
        };
      });
    }
    function $(M, N) {
      p((Z) => ({
        ...Z,
        notifications: Z.notifications.map((se) => se.id === M ? {
          ...se,
          ...N
        } : se)
      }));
    }
    function ae(M) {
      const N = R(M.message, "danger", {
        detail: M.technicalDetails,
        durationMs: null
      });
      p((Z) => ({
        ...Z,
        error: {
          ...M,
          notificationId: N
        },
        queueStatus: "error"
      }));
    }
    async function ge(M) {
      var _a2, _b;
      const N = [
        "idle",
        "cancelled",
        "completed"
      ].includes(q.queueStatus) && (!q.activeMatch || q.queueStatus === "completed");
      if (!(q.gameStatus === "loading" || !N || oe.current)) {
        oe.current = true;
        try {
          if (!await Ee()) {
            oe.current = false;
            return;
          }
          if (ee.current) {
            const X = ee.current;
            (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null, ee.current = null, await J.matchmaking.leaveQueue(X).catch(() => {
            });
          }
          const Z = await zl.reportSteamLicense(q.currentUser);
          v(Z), Z !== q.currentUser && p((X) => ({
            ...X,
            currentUser: Z
          }));
          const se = await J.matchmaking.joinQueue({
            queueId: M.id,
            queue: M,
            player: Z,
            canHost: true,
            maximumLowerOpponentRatingGap: q.settings.maximumLowerOpponentRatingGap
          });
          ee.current = se.id, ((_b = se.ignoredMapIds) == null ? void 0 : _b.length) && R("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
            detail: `Ignored maps: ${se.ignoredMapIds.join(", ")}`,
            durationMs: 1e4
          }), p((X) => ({
            ...X,
            selectedQueue: M,
            searchRange: {
              min: (M.format === "team" ? Z.teamRating : Z.rating) - 50,
              max: (M.format === "team" ? Z.teamRating : Z.rating) + 50
            },
            queueStartedAt: se.joinedAt,
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            queueStatus: "searching",
            activeMatch: null,
            error: null
          })), f("ranked"), w(`Joined queue ${M.id}`), le.current = J.matchmaking.subscribeToQueue(se.id, (X) => {
            var _a3, _b2, _c, _d, _e, _f, _g2, _h, _i, _j, _k;
            if (X.type === "range" && p((P) => ({
              ...P,
              searchRange: {
                min: X.minRating,
                max: X.maxRating
              }
            })), X.type === "match_found") {
              if (q.settings.autoRejectFamilySharing && X.match.queue.id === "ranked-rm-1v1" && X.match.opponent.steamLicenseStatus === "family_shared") {
                w(`Automatically declining family-shared opponent: ${X.match.id}`), R("Automatically declined a Family Share opponent.", "warning"), Xe(X.match.id);
                return;
              }
              const ce = {
                ...X.match,
                player: q.currentUser,
                status: "match_found"
              };
              ne.current = ce, f("ranked"), p((Le) => ({
                ...Le,
                queueStatus: "match_found",
                roomSetupStartedAt: null,
                roomSetupEstimateMs: null,
                roomSetupMilestone: null,
                activeMatch: ce
              })), w(`Match found: ${X.match.id}`), q.settings.matchNotifications && ((_a3 = window.electronApi) == null ? void 0 : _a3.alertMatchFound());
            }
            if (X.type === "opponent_accepted") {
              const P = ne.current;
              if (!P) return;
              (_b2 = window.electronApi) == null ? void 0 : _b2.stopMatchFoundAlert(), W();
              const ce = {
                ...P,
                acceptedByPlayer: true,
                acceptedByOpponent: true,
                status: X.role === "host" ? "creating_lobby" : "waiting_for_opponent"
              };
              ne.current = ce, p((Le) => ({
                ...Le,
                queueStatus: X.role === "host" ? "creating_lobby" : "waiting_for_opponent",
                roomSetupStartedAt: (/* @__PURE__ */ new Date()).toISOString(),
                roomSetupEstimateMs: C0(ce),
                roomSetupMilestone: X.role === "host" ? "Setting up lobby room" : "Waiting for the host to set up the lobby room",
                activeMatch: ce
              })), w("Both players accepted"), X.role === "host" && window.electronApi && (w("Assigned as host; waiting for AoE2 lobby automation to settle"), he.current = Aa(Ye.hostLobbyAutomationSettleMs).then(() => {
                var _a4;
                return W(), w("Starting AoE2 lobby automation"), window.electronApi.runAoe2CreateLobbySequence(pc(ce.selectedMap), ce.queue.format === "team" ? (((_a4 = ce.queue.teamSizes) == null ? void 0 : _a4[0]) ?? 2) * 2 : 2);
              }), ra(ce));
            }
            if (X.type === "lobby_ready" && (W(), p((P) => ({
              ...P,
              queueStatus: "ready",
              gameStatus: "in_lobby",
              roomSetupMilestone: "Joining lobby room",
              activeMatch: P.activeMatch ? {
                ...P.activeMatch,
                lobby: X.lobby,
                status: "ready"
              } : null
            })), w(`Host published lobby: ${X.lobby.platformLobbyId ?? "pending"}`), ((_c = X.lobby.platformLobbyId) == null ? void 0 : _c.startsWith("aoe2de://0/")) && window.electronApi && window.electronApi.openAoe2Lobby(X.lobby.platformLobbyId).then(async (P) => {
              var _a4, _b3;
              if (w(P.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected"), P.opened) {
                w("Guest lobby opened; waiting for the Ready button state to settle"), await Aa(Ye.guestReadySettleMs);
                const ce = (_a4 = ne.current) == null ? void 0 : _a4.queue.civilizationPreference, Le = X1(ce);
                if (Le) {
                  const Fe = ((_b3 = ne.current) == null ? void 0 : _b3.lobbySlot) ?? 2;
                  w(`Selecting ${Le} for guest lobby slot ${Fe}`);
                  const qt = await window.electronApi.selectAoe2Civilization(Le, Fe);
                  if (!qt.sent) throw new Error(qt.message);
                  qt.usedRandomCivilizationFallback ? (R("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), w(`${Le} unavailable; Random selected in AoE2`)) : w(`${Le} selected in AoE2`);
                }
                const nt = ne.current;
                if ((nt == null ? void 0 : nt.queue.format) === "team") {
                  const Fe = nt.lobbySlot ?? 2, qt = nt.team ?? 2;
                  w(`Selecting Team ${qt} for guest lobby slot ${Fe}`);
                  const on = await window.electronApi.selectAoe2Team(qt, Fe);
                  if (!on.sent) throw new Error(on.message);
                }
                w("Guest lobby opened; reporting join to the host"), await J.matchmaking.reportGuestLobbyJoined(X.matchId), w("Guest joined; waiting for the host to finalize custom map transfer"), p((Fe) => ({
                  ...Fe,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((P) => {
              const ce = P instanceof Error ? P.message : "The host lobby could not be opened.";
              w(`Opening the host lobby failed: ${ce}`), fe(M, ce);
            })), X.type === "guest_lobby_joined" && window.electronApi && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent joined. Finalizing lobby files..."
            })), (async () => {
              try {
                w("Guest joined; waiting for the host lobby state to settle"), await Aa(Ye.hostReadySettleMs), w("Guest joined; clicking Ready for the host");
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                await J.matchmaking.reportHostLobbyReady(X.matchId), w("Host readied; guest notified to wait for custom map transfer"), p((ce) => ({
                  ...ce,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const ce = P instanceof Error ? P.message : "The host could not finalize the lobby.";
                w(`Automated host Ready failed: ${ce}`), fe(M, ce);
              }
            })()), X.type === "host_lobby_ready" && window.electronApi) {
              const P = Q1((_d = ne.current) == null ? void 0 : _d.selectedMap);
              p((ce) => ({
                ...ce,
                roomSetupMilestone: P ? "Receiving lobby files" : "Waiting for Ready"
              })), (async () => {
                try {
                  const ce = Date.now() + Ye.customMapTransferTimeoutMs;
                  let Le = false, nt;
                  do
                    await Aa(Ye.customMapTransferPollMs), nt = await window.electronApi.runAoe2LobbyCursorAction("guest-ready"), !nt.sent && P && !Le && (w("Guest Ready remains unavailable; checking for the unverified-content confirmation"), (await window.electronApi.runAoe2LobbyCursorAction("content-confirm")).sent ? (await J.matchmaking.reportGuestContentAccepted(X.matchId), Le = true, w(`Content accepted; allowing ${D1} ms for the host to restore Ready`), await Aa(D1)) : w("Unverified-content confirmation keys could not be sent"));
                  while (!nt.sent && Date.now() < ce);
                  if (!nt.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
                  w("Guest Ready verified; reporting readiness to the host"), await J.matchmaking.reportGuestLobbyReady(X.matchId), pe(), p((Fe) => ({
                    ...Fe,
                    roomSetupMilestone: "Ready. Waiting for the host to start..."
                  }));
                } catch (ce) {
                  const Le = ce instanceof Error ? ce.message : "Lobby file transfer did not complete.";
                  w(`Guest file transfer or Ready failed: ${Le}`), fe(M, Le);
                }
              })();
            }
            if (X.type === "guest_content_accepted" && window.electronApi && Q1((_e = ne.current) == null ? void 0 : _e.selectedMap) && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent accepted lobby files. Confirming host readiness..."
            })), (async () => {
              try {
                w("Guest accepted custom content; waiting for the lobby state to settle"), await Aa(Ye.hostReadySettleMs);
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                w("Host Ready verified again after guest content acceptance"), p((ce) => ({
                  ...ce,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const ce = P instanceof Error ? P.message : "The host could not resume the lobby file transfer.";
                w(`Second host Ready failed: ${ce}`), fe(M, ce);
              }
            })()), X.type === "guest_lobby_ready" && window.electronApi && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent ready. Starting game..."
            })), (async () => {
              try {
                w("Guest reported ready; waiting for the Start button state to settle"), await Aa(Ye.hostReadyToStartMs), await Aa(Ye.startGameSettleMs), w("Host readied; clicking Start Game");
                const P = await window.electronApi.runAoe2LobbyCursorAction("start");
                if (!P.sent) throw new Error(P.message);
                pe(), p((ce) => ({
                  ...ce,
                  queueStatus: "ready",
                  gameStatus: "in_match",
                  roomSetupMilestone: "Starting game",
                  transitionInputLocked: true,
                  activeMatch: ce.activeMatch ? {
                    ...ce.activeMatch,
                    status: "ready"
                  } : null
                })), await J.matchmaking.reportGameStarted(X.matchId), O();
              } catch (P) {
                const ce = P instanceof Error ? P.message : "The automated game start failed.";
                w(`Automated host start failed: ${ce}`), fe(M, ce);
              }
            })()), X.type === "game_started" && (pe(), p((P) => ({
              ...P,
              queueStatus: "ready",
              gameStatus: "in_match",
              roomSetupMilestone: "Starting game",
              transitionInputLocked: true,
              activeMatch: P.activeMatch ? {
                ...P.activeMatch,
                status: "ready"
              } : null
            })), w("Host started the game"), O()), X.type === "result_verified" || X.type === "result_contested") {
              if (X.matchId !== ((_f = V.current.activeMatch) == null ? void 0 : _f.id)) return;
              Bt(X.result);
            }
            if (X.type === "error") {
              if (X.code === "TICKET_NOT_FOUND") {
                oe.current = false, ne.current = null, ee.current = null, (_g2 = le.current) == null ? void 0 : _g2.call(le), le.current = null, p((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), R("The matchmaking server restarted. Rejoining the queue\u2026", "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), w("Queue ticket expired after a server restart; rejoining"), window.setTimeout(() => void ge(M), 0);
                return;
              }
              if (X.code === "MATCH_DISCONNECTED" || X.code === "MATCH_SETUP_FAILED") {
                fe(M, X.message);
                return;
              }
              if (X.code === "MATCH_DECLINED") {
                (_h = window.electronApi) == null ? void 0 : _h.stopMatchFoundAlert(), pe(), oe.current = false, ne.current = null, ee.current && (J.matchmaking.leaveQueue(ee.current).catch(() => {
                }), ee.current = null), (_i = le.current) == null ? void 0 : _i.call(le), le.current = null, p((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), R(X.message, "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), w("Opponent declined; returning to queue"), window.setTimeout(() => void ge(M), 0);
                return;
              }
              X.code === "MATCH_EXPIRED" && ((_j = window.electronApi) == null ? void 0 : _j.stopMatchFoundAlert(), pe(), oe.current = false, ne.current = null, ee.current && (J.matchmaking.leaveQueue(ee.current).catch(() => {
              }), ee.current = null), (_k = le.current) == null ? void 0 : _k.call(le), le.current = null, p((P) => ({
                ...P,
                queueStatus: "cancelled",
                activeMatch: null
              }))), ae({
                code: X.code,
                message: X.message,
                retryable: true
              });
            }
          });
        } catch (Z) {
          oe.current = false, ae({
            code: "QUEUE_JOIN_FAILED",
            message: "Matchmaking is currently unavailable.",
            technicalDetails: Z instanceof Error ? Z.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function ke() {
      var _a2;
      pe(), (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null;
      const M = ee.current;
      ee.current = null, oe.current = false, M && await J.matchmaking.leaveQueue(M).catch((N) => {
        const Z = N instanceof Error ? N.message : "";
        Z.toLowerCase().includes("ticket not found") || (w(`Queue cancellation could not be confirmed: ${Z || "Unknown error"}`), R("The matchmaking server could not confirm cancellation", "danger", {
          detail: Z || void 0,
          durationMs: null
        }));
      }), p((N) => ({
        ...N,
        queueStatus: "cancelled",
        selectedQueue: null,
        queueStartedAt: null,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), w("Queue cancelled");
    }
    async function Re(M) {
      var _a2;
      const N = ee.current;
      if (!(!N || V.current.queueStatus !== "searching")) try {
        if (await J.matchmaking.updateQueue(N, M), V.current.queueStatus !== "searching") return;
        p((Z) => ({
          ...Z,
          selectedQueue: M
        })), w(`Updated active queue preferences: ${((_a2 = M.civilizationPreference) == null ? void 0 : _a2.mode) ?? "pick"}, ${M.mapPool.length} maps`);
      } catch (Z) {
        if (V.current.queueStatus !== "searching") return;
        w(`Active queue preference update failed: ${Z instanceof Error ? Z.message : "Unknown error"}`), R("Your queue preferences could not be updated", "danger");
      }
    }
    async function ot() {
      var _a2;
      if (q.activeMatch) {
        (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert();
        try {
          p((M) => ({
            ...M,
            queueStatus: "accepting",
            activeMatch: M.activeMatch ? {
              ...M.activeMatch,
              acceptedByPlayer: true,
              status: "accepting"
            } : null
          })), w("Local player accepted"), await J.matchmaking.acceptMatch(q.activeMatch.id);
        } catch (M) {
          ae({
            code: "MATCH_ACCEPT_FAILED",
            message: "The match could not be accepted.",
            technicalDetails: M instanceof Error ? M.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function Xe(M) {
      var _a2, _b;
      (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), pe(), (_b = le.current) == null ? void 0 : _b.call(le), le.current = null;
      try {
        M && await J.matchmaking.declineMatch(M);
      } finally {
        ee.current && await J.matchmaking.leaveQueue(ee.current).catch(() => {
        }), ee.current = null, oe.current = false, ne.current = null, p((N) => ({
          ...N,
          queueStatus: "cancelled",
          activeMatch: null
        }));
      }
      w("Match declined");
    }
    async function wt() {
      var _a2;
      await Xe((_a2 = q.activeMatch) == null ? void 0 : _a2.id);
    }
    async function ra(M) {
      var _a2, _b, _c;
      const N = M ?? q.activeMatch;
      if (N == null ? void 0 : N.selectedMap) try {
        if (f("ranked"), p((X) => ({
          ...X,
          queueStatus: "creating_lobby"
        })), w("Detecting AoE2 installation"), !(await J.game.detectInstallation()).installed) throw new Error("AoE2 installation not detected.");
        if (w("Installation detected"), await J.game.detectRunningGame(), w("AoE2 process found"), await J.game.launchGame(), w("Opening multiplayer menu"), window.electronApi) {
          const X = await (he.current ?? window.electronApi.runAoe2CreateLobbySequence(pc(N.selectedMap), N.queue.format === "team" ? (((_a2 = N.queue.teamSizes) == null ? void 0 : _a2[0]) ?? 2) * 2 : 2));
          if (he.current = null, !X.sent) throw new Error(X.message);
          if (!X.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
          w("AoE2 host-lobby sequence completed"), W();
          const P = N.queue.civilizationPreference, ce = X1(P);
          if (ce) {
            w(`Selecting ${ce} for host lobby slot 1`);
            const Fe = await window.electronApi.selectAoe2Civilization(ce, 1);
            if (!Fe.sent) throw new Error(Fe.message);
            Fe.usedRandomCivilizationFallback ? (R("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), w(`${ce} unavailable; Random selected in AoE2`)) : w(`${ce} selected in AoE2`);
          }
          if (N.queue.format === "team") {
            const Fe = N.lobbySlot ?? 1, qt = N.team ?? 1;
            w(`Selecting Team ${qt} for host lobby slot ${Fe}`);
            const on = await window.electronApi.selectAoe2Team(qt, Fe);
            if (!on.sent) throw new Error(on.message);
          }
          w(`Lobby URI discovered: ${X.lobbyUri}`);
          const nt = {
            ...(await J.game.createLobby({
              matchId: N.id,
              hostProfileId: N.player.aoeProfileId,
              guestProfileId: N.opponent.aoeProfileId,
              map: N.selectedMap,
              serverRegion: q.settings.serverRegion,
              playerCount: N.queue.format === "team" ? (((_b = N.queue.teamSizes) == null ? void 0 : _b[0]) ?? 2) * 2 : 2
            })).lobby,
            platformLobbyId: X.lobbyUri
          };
          w(`Lobby created: ${nt.platformLobbyId}`), await J.matchmaking.publishLobby(N.id, nt), w("Lobby details published to opponent"), pe(), p((Fe) => ({
            ...Fe,
            activeMatch: Fe.activeMatch ? {
              ...Fe.activeMatch,
              lobby: nt
            } : null,
            queueStatus: "waiting_for_opponent",
            roomSetupMilestone: "Waiting for opponent to join"
          }));
          return;
        }
        const se = await J.game.createLobby({
          matchId: N.id,
          hostProfileId: N.player.aoeProfileId,
          guestProfileId: N.opponent.aoeProfileId,
          map: N.selectedMap,
          serverRegion: q.settings.serverRegion,
          playerCount: N.queue.format === "team" ? (((_c = N.queue.teamSizes) == null ? void 0 : _c[0]) ?? 2) * 2 : 2
        });
        w(`Lobby created: ${se.lobby.platformLobbyId ?? "pending"}`), await J.matchmaking.publishLobby(N.id, se.lobby), w("Lobby details published to opponent"), p((X) => ({
          ...X,
          activeMatch: X.activeMatch ? {
            ...X.activeMatch,
            lobby: se.lobby
          } : null,
          queueStatus: "waiting_for_opponent"
        })), w("Opponent invited"), await J.game.waitForGameStart(se.lobby.platformLobbyId ?? N.id), w("Opponent joined"), p((X) => ({
          ...X,
          queueStatus: "verifying_lobby"
        })), await J.game.verifyLobby(se.lobby.platformLobbyId ?? N.id), w("Lobby verified"), p((X) => ({
          ...X,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: X.activeMatch ? {
            ...X.activeMatch,
            lobby: T0(se.lobby),
            status: "ready"
          } : null
        }));
      } catch (Z) {
        const se = Z instanceof Error ? Z.message : "We could not create the AoE2 lobby.";
        w(`Lobby preparation failed: ${se}`);
        const X = N.queue;
        fe(X, se);
      }
    }
    async function oa() {
      if (window.electronApi) {
        const M = await window.electronApi.startReplayEndDetection();
        M.started || w(`Replay detection unavailable: ${M.message ?? "unknown error"}`);
      }
      await mc(), await J.game.focusGame(), p((M) => ({
        ...M,
        queueStatus: "in_game",
        gameStatus: "in_match"
      })), w("Focused AoE2"), q.activeMatch && await J.results.beginTracking(q.activeMatch);
    }
    async function Ea() {
      const M = q.activeMatch;
      if (M) try {
        p((Z) => ({
          ...Z,
          queueStatus: "verifying_result"
        })), w("Game finished");
        const N = await J.results.waitForVerifiedResult(M.id);
        Bt(N);
      } catch (N) {
        ae({
          code: "RESULT_VERIFICATION_FAILED",
          message: "The result service could not verify this match.",
          technicalDetails: N instanceof Error ? N.message : void 0,
          retryable: true
        });
      }
    }
    function Bt(M) {
      var _a2;
      oe.current = false, L.current = false, (_a2 = window.electronApi) == null ? void 0 : _a2.stopReplayEndDetection(), p((N) => {
        var _a3, _b, _c;
        const Z = N.activeMatch ? {
          ...N.activeMatch,
          result: M,
          status: "completed"
        } : null, se = M.ratingPool === "team", X = !se && M.outcome === "win" ? N.currentUser.wins + 1 : N.currentUser.wins, P = !se && M.outcome === "loss" ? N.currentUser.losses + 1 : N.currentUser.losses, ce = {
          ...N.currentUser,
          rating: M.verified && !se ? M.newRating : N.currentUser.rating,
          peakRating: M.verified && !se ? Math.max(N.currentUser.peakRating, M.newRating) : N.currentUser.peakRating,
          teamRating: M.verified && se ? M.newRating : N.currentUser.teamRating,
          teamPeakRating: M.verified && se ? Math.max(N.currentUser.teamPeakRating, M.newRating) : N.currentUser.teamPeakRating,
          division: M.verified && !se ? Nn(M.newRating) : N.currentUser.division,
          wins: X,
          losses: P,
          winRate: X + P > 0 ? Number((X / (X + P) * 100).toFixed(1)) : 0,
          streak: se ? N.currentUser.streak : M.outcome === "win" ? Math.max(1, N.currentUser.streak + 1) : M.outcome === "loss" ? Math.min(-1, N.currentUser.streak - 1) : N.currentUser.streak
        }, Le = Z && M.verified ? {
          id: Z.id,
          opponent: Z.opponent.displayName,
          opponentId: Z.opponent.id,
          opponentRating: se ? Z.opponent.teamRating : Z.opponent.rating,
          outcome: M.outcome,
          map: ((_a3 = Z.selectedMap) == null ? void 0 : _a3.name) ?? "Arabia",
          civilization: ((_b = Z.queue.civilizationPreference) == null ? void 0 : _b.civilization) ?? "",
          opponentCivilization: ((_c = Z.opponentCivilizationPreference) == null ? void 0 : _c.civilization) ?? "",
          ratingChange: M.ratingChange,
          durationMinutes: 24,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          verified: M.verified,
          queueType: Z.queue.name
        } : null;
        return {
          ...N,
          currentUser: ce,
          activeMatch: Z,
          queueStatus: "completed",
          gameStatus: "installed",
          recentMatches: Le ? [
            Le,
            ...N.recentMatches
          ] : N.recentMatches
        };
      }), M.verificationStatus === "contested" ? (w("Replay reports conflicted; result discarded"), R("Result contested. No rating change.", "warning")) : w("Match result verified");
    }
    async function ln() {
      var _a2;
      (_a2 = le.current) == null ? void 0 : _a2.call(le), le.current = null, ee.current && (await J.matchmaking.leaveQueue(ee.current).catch(() => {
      }), ee.current = null), ne.current = null, p((M) => ({
        ...M,
        queueStatus: "idle",
        selectedQueue: null,
        queueStartedAt: null,
        activeMatch: null,
        error: null
      })), f("ranked");
    }
    function rn(M) {
      p((N) => ({
        ...N,
        mockConfig: {
          ...N.mockConfig,
          ...M
        }
      }));
    }
    async function O() {
      if (!window.electronApi) return;
      await Aa(Ye.revealAfterStartMs);
      const M = await window.electronApi.startReplayEndDetection();
      M.started || w(`Replay detection unavailable: ${M.message ?? "unknown error"}`), await mc(), await window.electronApi.focusAoe2();
      const N = V.current;
      N.activeMatch && N.roomSetupStartedAt && x0(N.activeMatch, Date.now() - new Date(N.roomSetupStartedAt).getTime()), p((Z) => ({
        ...Z,
        queueStatus: "in_game",
        roomSetupMilestone: null,
        transitionInputLocked: false,
        activeMatch: Z.activeMatch ? {
          ...Z.activeMatch,
          status: "in_game"
        } : null
      })), w("Showing AoE2 after game start");
    }
    function ue(M) {
      p((N) => {
        const Z = {
          ...N.settings,
          ...M
        };
        return window.localStorage.setItem(Cm, JSON.stringify(Z)), {
          ...N,
          settings: Z
        };
      });
    }
    const ve = {
      state: q,
      page: c,
      setPage: f,
      selectedProfileId: u,
      openPlayerProfile: (M) => {
        var _a2;
        c !== "profile" && (x(c), j.current = ((_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTop) ?? 0), m(M), f("profile");
      },
      returnFromPlayerProfile: () => {
        k.current = {
          page: h,
          top: j.current
        }, m(null), f(h);
      },
      queues: N0,
      ensureAoe2Ready: Ee,
      startQueue: ge,
      updateActiveQueue: Re,
      cancelQueue: ke,
      acceptMatch: ot,
      declineMatch: wt,
      prepareLobby: ra,
      openAoe2: oa,
      simulateMatchEnd: Ea,
      returnToMatchmaking: ln,
      updateMockConfig: rn,
      updateSettings: ue,
      notify: R,
      dismissNotification: H,
      clearError: () => p((M) => {
        var _a2;
        return {
          ...M,
          error: null,
          queueStatus: "idle",
          notifications: ((_a2 = M.error) == null ? void 0 : _a2.notificationId) ? M.notifications.filter((N) => {
            var _a3;
            return N.id !== ((_a3 = M.error) == null ? void 0 : _a3.notificationId);
          }) : M.notifications
        };
      }),
      authStatus: y,
      authError: D,
      signInWithSteam: te,
      signOut: we
    };
    return i.jsx(xm.Provider, {
      value: ve,
      children: r
    });
  }
  function G1(r, c) {
    return r instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(r.message) ? "Error: Matchmaking server is down." : r instanceof Error ? r.message : c;
  }
  async function hc(r) {
    if (!window.electronApi) return false;
    const c = Date.now() + r;
    for (; Date.now() < c; ) {
      const f = await window.electronApi.detectAoe2Process();
      if (f.running && f.windowReady) return true;
      await new Promise((u) => window.setTimeout(u, 500));
    }
    return false;
  }
  async function Y1(r) {
    if (!window.electronApi) return false;
    const c = await window.electronApi.launchAoe2();
    if (!c.launched) throw new Error(c.message ?? "Steam did not accept the AoE2 DE launch request.");
    if (await hc(H1)) return true;
    if ((await window.electronApi.detectAoe2Process()).running) r("AoE2 is still starting. Waiting another 30 seconds.");
    else {
      r("AoE2 did not start. Retrying the Steam launch once.");
      const u = await window.electronApi.launchAoe2();
      if (!u.launched) throw new Error(u.message ?? "Steam did not accept the AoE2 DE retry request.");
    }
    return hc(H1);
  }
  function lc(r) {
    return new Promise((c) => window.setTimeout(c, r));
  }
  function Aa(r) {
    return new Promise((c) => window.setTimeout(c, r));
  }
  function pc(r) {
    var _a2;
    return (r && ((_a2 = mm(r.id)) == null ? void 0 : _a2.gameMapName)) ?? It.maps[0].gameMapName;
  }
  function Q1(r) {
    return r !== void 0 && la.mapPicker.customMapNames.includes(pc(r));
  }
  function X1(r) {
    return r ? r.mode === "pick" ? r.civilization ?? null : r.mode === "random" ? null : r.mode === "mirror" ? "Mirror" : null : null;
  }
  function bt() {
    const r = T.useContext(xm);
    if (!r) throw new Error("useAppStore must be used inside AppProvider");
    return r;
  }
  function R0() {
    try {
      const r = window.localStorage.getItem(Cm);
      if (!r) return In;
      const c = JSON.parse(r);
      return {
        launchAoe2OnStartup: typeof c.launchAoe2OnStartup == "boolean" ? c.launchAoe2OnStartup : In.launchAoe2OnStartup,
        serverRegion: typeof c.serverRegion == "string" ? c.serverRegion : In.serverRegion,
        matchNotifications: typeof c.matchNotifications == "boolean" ? c.matchNotifications : In.matchNotifications,
        autoRejectFamilySharing: typeof c.autoRejectFamilySharing == "boolean" ? c.autoRejectFamilySharing : In.autoRejectFamilySharing,
        maximumLowerOpponentRatingGap: [
          0,
          200,
          300,
          400,
          500
        ].includes(Number(c.maximumLowerOpponentRatingGap)) ? Number(c.maximumLowerOpponentRatingGap) : In.maximumLowerOpponentRatingGap
      };
    } catch {
      return In;
    }
  }
  function T0(r) {
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
  const z0 = ((_a = sn.find((r) => r.id === "land-open")) == null ? void 0 : _a.maps) ?? [];
  function _0() {
    const { state: r } = bt(), c = r.currentUser, f = r.recentMatches.slice(0, 5).map((u) => u.outcome);
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
                  hi(c.rating),
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
            i.jsx(ia, {
              label: "Division",
              value: hi(c.rating),
              detail: `${c.wins + c.losses} ranked matches`
            }),
            i.jsx(ia, {
              label: "Season Record",
              value: `${c.wins}-${c.losses}`,
              detail: `${c.winRate}% win rate`
            }),
            i.jsx(ia, {
              label: "Current Streak",
              value: c.streak > 0 ? `W${c.streak}` : `L${Math.abs(c.streak)}`
            }),
            i.jsx(ia, {
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
                f.length > 0 && i.jsx(am, {
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
            i.jsx(Rp, {
              maps: z0
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
  function Na({ label: r, options: c, value: f, onChange: u, className: m, disabled: h = false, searchable: x = false, displayValue: j }) {
    var _a2, _b;
    const k = T.useRef(null), [y, C] = T.useState(""), D = j ?? ((_a2 = c.find((q) => q.value === f)) == null ? void 0 : _a2.label) ?? ((_b = c[0]) == null ? void 0 : _b.label) ?? "", Q = x ? c.filter((q) => q.label.toLowerCase().includes(y.trim().toLowerCase())) : c;
    return T.useEffect(() => {
      const q = (p) => {
        const F = k.current;
        (F == null ? void 0 : F.open) && p.target instanceof Node && !F.contains(p.target) && F.removeAttribute("open");
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
            q.currentTarget.open || C("");
          },
          children: [
            i.jsx("summary", {
              "aria-disabled": h,
              onClick: (q) => {
                h && q.preventDefault();
              },
              children: D
            }),
            i.jsxs("div", {
              className: "themed-select-options",
              children: [
                x && i.jsx("input", {
                  "aria-label": `Search ${r}`,
                  autoFocus: true,
                  className: "themed-select-search",
                  placeholder: "Search civilizations...",
                  type: "search",
                  value: y,
                  onChange: (q) => C(q.target.value)
                }),
                i.jsxs("div", {
                  className: "themed-select-option-list",
                  role: "listbox",
                  "aria-label": r || "Select option",
                  children: [
                    Q.map((q) => i.jsx("button", {
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
                    Q.length === 0 && i.jsx("span", {
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
  const D0 = {
    bonuses: [
      "Town Centers spawn 2 Villagers when the next Age is reached",
      "Cavalry +2 attack vs. Skirmishers",
      "Elephant Units receive -25% bonus damage and are more resistant to conversion",
      "Monks +3 melee/+3 pierce armor",
      "Ships regenerate 15 HP per minute"
    ],
    teamBonus: "Trade Units generate +10% food in addition to gold"
  }, U0 = {
    bonuses: [
      "Mining Camp technologies free",
      "Blacksmiths and Universities cost -100 wood",
      "Spearman-line deals +25% bonus damage",
      "Fervor and Sanctity affect Villagers",
      "Chemistry and Hand Cannoneer available in Castle Age"
    ],
    teamBonus: "Markets work +80% faster"
  }, L0 = {
    bonuses: [
      "Loom is researched instantly",
      "Hunters carry +15; hunted animals last +20% longer",
      "Infantry costs -15/20/25/30% in Dark/Feudal/Castle/ Imperial Age",
      "Infantry +1/+2/+3 attack vs. buildings in Feudal/ Castle/Imperial Age",
      "+10 population space in Imperial Age"
    ],
    teamBonus: "Barracks work +20% faster"
  }, O0 = {
    bonuses: [
      "Start with 2 Forage Bushes",
      "Can garrison livestock in Mills to passively produce food",
      "Mounted Units deal +20/30/40% bonus damage in Feudal/Castle/Imperial Age",
      "Docks +5 garrison capacity"
    ],
    teamBonus: "Camel and Elephant Units train +25% faster"
  }, B0 = {
    bonuses: [
      "Advancing to the next Age costs -15%",
      "Foot Archers and Condottieri +1 melee/+1 pierce armor",
      "Dock and University technologies cost -25%",
      "Gunpowder Units cost -20%",
      "Fishing Ships cost -15%"
    ],
    teamBonus: "Condottiero available at the Barracks in Imperial Age"
  }, q0 = {
    bonuses: [
      "Villagers defeat wolves with one strike",
      "Scout Cavalry-line costs -15%",
      "Melee attack upgrades free"
    ],
    teamBonus: "Mounted Archers train +25% faster"
  }, H0 = {
    bonuses: [
      "Advancing to the next Age is +66% faster",
      "Infantry armor upgrades free",
      "Battle Elephants cost -25/35% in Castle/Imperial Age",
      "Fish Traps cost -33% and provide +200% food"
    ],
    teamBonus: "Docks +6 line of sight"
  }, G0 = {
    bonuses: [
      "Wheelbarrow, Hand Cart free",
      "Infantry +20% HP starting in Feudal Age",
      "Warships cost -10/15/20% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Docks cost -15%"
  }, Y0 = {
    bonuses: [
      "Mule Carts cost -25%",
      "Mule Cart technology effects +40%",
      "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier",
      "First Fortified Church receives a free Relic",
      "Galley-line and Dromons fire an additional projectile"
    ],
    teamBonus: "Infantry +2 line of sight"
  }, Q0 = {
    bonuses: [
      "Start with +50 gold",
      "Villagers carry +3",
      "Military Units train +15% faster",
      "Monks gain +5 HP for each researched Monastery technology"
    ],
    teamBonus: "Relics generate +33% gold"
  }, X0 = {
    bonuses: [
      "Villagers move +5% faster in Dark Age, +10% faster starting in Feudal Age",
      "Stable Units cost -15/20% in Castle/Imperial Age",
      "Ships move +10% faster"
    ],
    teamBonus: "Genitour available at the Archery Range starting in Castle Age"
  }, V0 = {
    bonuses: [
      "Shepherds work +25% faster",
      "Town Centers cost -50% wood starting in Castle Age",
      "Foot Archers +1/+2 range in Castle/Imperial Age"
    ],
    teamBonus: "Archery Ranges work +10% faster"
  }, Z0 = {
    bonuses: [
      "Militia-line upgrades free",
      "Blacksmith and Siege Workshop technologies cost -50% food",
      "Town Centers cost -50% stone",
      "Can build Krepost in Castle Age"
    ],
    teamBonus: "Blacksmiths work +80% faster"
  }, K0 = {
    bonuses: [
      "Economic upgrades available one age earlier and cost -40% food",
      "Stable technologies cost -50%",
      "Cavalier upgrade available in Castle Age",
      "Gunpowder Units +25% attack"
    ],
    teamBonus: "Relics generate food in addition to gold"
  }, J0 = {
    bonuses: [
      "Lumber Camp technologies free",
      "Infantry +1/+2/+3 attack in Feudal/Castle/Imperial Age",
      "Battle Elephants +1 melee/+1 pierce armor",
      "Monastery technologies cost -50%"
    ],
    teamBonus: "Relics visible on the map at the start of the game"
  }, F0 = {
    bonuses: [
      "Buildings +10/20/30/40% HP in Dark/Feudal/Castle/Imperial Age",
      "Camel Riders, Skirmishers and Spearman-line cost -25%",
      "Town Watch, Town Patrol free",
      "Advancing to Imperial Age costs -33%",
      "Fire Ships and Dromons attack +25% faster"
    ],
    teamBonus: "Monks heal +100% faster"
  }, $0 = {
    bonuses: [
      "Lumberjacks work +15% faster",
      "Livestock animals within Celt unit line of sight cannot be stolen",
      "Infantry moves +5/10/15/20% faster in Dark/Feudal/ Castle/Imperial Age",
      "Siege Weapons attack +25% faster"
    ],
    teamBonus: "Siege Workshops work +20% faster"
  }, W0 = {
    bonuses: [
      "Start with +3 Villagers, but -50 wood and -200 food",
      "Technologies cost -5/10/15% in Feudal/Castle/Imperial Age",
      "Town Centers +7 line of sight and provide +15 population space",
      "Fire Lancers and Fire Ships move +5/10% faster in Castle/Imperial Age"
    ],
    teamBonus: "Farms +10% food"
  }, P0 = {
    bonuses: [
      "One additional Town Center can be built in Feudal Age",
      "Mounted Units move +5/10/15% faster in Feudal/ Castle/Imperial Age",
      "Archery Ranges and Stables cost -75 wood",
      "Siege Workshop and Battering Ram available in Feudal Age; Capped Ram available in Castle Age"
    ],
    teamBonus: "Palisade Walls +33% HP"
  }, eg = {
    bonuses: [
      "Fishermen and Fishing Ships carry +15",
      "Receive +200 wood when advancing to the next Age",
      "Skirmishers and Elephant Archers attack +25% faster",
      "Barracks technologies cost -50%",
      "Siege Weapons cost -33% wood"
    ],
    teamBonus: "Docks provide +5 population space"
  }, tg = {
    bonuses: [
      "Receive +100 gold and +100 food when advancing to the next Age",
      "Foot Archers attack +18% faster",
      "Pikeman upgrade free"
    ],
    teamBonus: "Outposts +3 line of sight and cost no stone"
  }, ag = {
    bonuses: [
      "Foragers work +15% faster",
      "Mill technologies free",
      "Mounted Units +20% HP starting in Feudal Age",
      "Castles cost -15/25% in Castle/Imperial Age"
    ],
    teamBonus: "Knight-line +2 line of sight"
  }, ng = {
    bonuses: [
      "Start with a Mule Cart",
      "Units and buildings receive -15% damage when located on higher elevation",
      "Mounted Units regenerate 2/8/14 HP per minute in Feudal/Castle/Imperial Age",
      "Fortified Churches provide Villagers in a 9 tiles radius with +10% work rate"
    ],
    teamBonus: "Building repairs cost -25%"
  }, sg = {
    bonuses: [
      "Villagers cost -8/13/18/23% in Dark/Feudal/Castle/ Imperial Age",
      "Camel Riders attack +20% faster",
      "Gunpowder Units +1 melee/+1 pierce armor",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line and Camel Units +2 attack vs. buildings"
  }, ig = {
    bonuses: [
      "Do not need houses, but start with -100 wood",
      "Cavalry Archers cost -10/20% in Castle/Imperial Age",
      "Trebuchets fire more accurately at units and small targets",
      "On Nomadic maps, the first Town Center spawns a scouting Horse"
    ],
    teamBonus: "Stables work +20% faster"
  }, lg = {
    bonuses: [
      "Houses and Settlements provide +5 population space",
      "Buildings cost -15% stone",
      "Military Units cost -15/20/25/30% food in Dark/Feudal/Castle/Imperial Age",
      "Villagers affected by Infantry Blacksmith upgrades starting in Castle Age"
    ],
    teamBonus: "Start with a free Llama"
  }, rg = {
    bonuses: [
      "Mills, Lumber- and Mining Camps cost -50%",
      "Infantry attacks +33% faster starting in Feudal Age",
      "Cavalry Archers +2 attack vs. Ranged Soldiers (except Skirmishers)",
      "Fishing Ships work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age; +100% HP"
    ],
    teamBonus: "Galley-line +4 line of sight"
  }, og = {
    bonuses: [
      "Meat of hunted and livestock animals doesn't decay",
      "Mounted Units and Fire Lancers attack +25% faster starting in Feudal Age",
      "Siege Engineers available in Castle Age",
      "Siege and Fortification upgrades cost -75% wood and research +100% faster",
      "Units receive -50% friendly fire damage"
    ],
    teamBonus: "Gunpowder Units +2 line of sight"
  }, cg = {
    bonuses: [
      "Pastures replace Farms",
      "Melee attack upgrade effects are doubled",
      "Skirmishers, Spearman-, and Scout Cavalry-line train and upgrade +15% faster",
      "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"
    ],
    teamBonus: "Infantry +2 attack vs. Ranged Soldiers"
  }, ug = {
    bonuses: [
      "No buildings required to advance to the next Age or to unlock other buildings",
      "Farmers don't require Mills or Town Centers to drop off food",
      "Villagers can garrison in Houses",
      "Battle Elephants move +10% faster"
    ],
    teamBonus: "Scorpions +1 range"
  }, dg = {
    bonuses: [
      "Stone miners work +20% faster",
      "Ranged Soldiers and Infantry cost -50% wood",
      "Archer armor and tower upgrades free (Bombard Tower requires Chemistry)",
      "Warships cost -20% wood"
    ],
    teamBonus: "Villagers +3 line of sight"
  }, fg = {
    bonuses: [
      "Each Town Center provides +100 food",
      "Spearman-line and Skirmisher-line move +10% faster",
      "Each garrisoned Relic provides +1 attack to Knight-line and Leitis (maximum +4)"
    ],
    teamBonus: "Monasteries work +20% faster"
  }, mg = {
    bonuses: [
      "Buildings cost -15% wood",
      "Villagers drop off +10% more gold",
      "Barracks Units +1/+2/+3 pierce armor in Feudal/ Castle/Imperial Age"
    ],
    teamBonus: "Universities work +80% faster"
  }, hg = {
    bonuses: [
      "Start with +1 Villager, but -50 food",
      "Resources last +15% longer",
      "Foot Archers cost -10/20/30% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Walls cost -50%"
  }, pg = {
    bonuses: [
      "Hunters work +40% faster",
      "Cavalry Archers attack +25% faster",
      "Scout Cavalry-line and Steppe Lancers +20/30% HP in Castle/Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line +2 line of sight"
  }, gg = {
    bonuses: [
      "Start with +50 wood and +50 food",
      "Town Centers and Docks +100% HP and work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age",
      "Parthian Tactics available in Castle Age",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Knight-line +2 attack vs. Ranged Soldiers"
  }, yg = {
    bonuses: [
      "Folwark replaces Mill",
      "Villagers regenerate 10/15/20 HP in Feudal/Castle/Imperial Age",
      "Stone Miners generate gold in addition to stone",
      "Bloodlines and Scout Cavalry-line upgrades cost -50% food"
    ],
    teamBonus: "Scout Cavalry-line +1 attack vs. Ranged Soldiers"
  }, vg = {
    bonuses: [
      "Foragers generate wood in addition to food",
      "All units cost -20% gold",
      "Can build Feitoria in Imperial Age",
      "Ships +10/15/20% HP in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Technologies research +25% faster"
  }, bg = {
    bonuses: [
      "Villagers gather, build, and repair +5% faster",
      "Infantry armor upgrade effects are doubled",
      "Scorpions cost -50% gold",
      "Galley-line and Dromons +1 melee/+1 pierce armor"
    ],
    teamBonus: "Scorpions minimum range reduced"
  }, wg = {
    bonuses: [
      "Market trading fee only 5%; Markets cost -100 wood",
      "Camel Units +25% HP",
      "Galley-line attacks +25% faster",
      "Transport Ships +100% HP, +20 carry capacity"
    ],
    teamBonus: "Foot Archers and Skirmishers +2 attack vs. buildings"
  }, kg = {
    bonuses: [
      "Lumberjacks generate food in addition to wood",
      "Archery Unit technologies at the Archery Range and Blacksmith cost -25%",
      "Siege Weapons and Siege Warships move +10/15% faster in Castle/Imperial Age"
    ],
    teamBonus: "Foot Archers +2 line of sight"
  }, Sg = {
    bonuses: [
      "Start with +100 stone",
      "Farm upgrades provide +125% additional food",
      "Soldiers receive -40% bonus damage",
      "Can build Donjon in Dark Age, replaces Watch Tower-line",
      "Fortifications built +50% faster; Town Centers built +100% faster"
    ],
    teamBonus: "Transport Ships +5 line of sight and cost -50%"
  }, Cg = {
    bonuses: [
      "Farmers work +15% faster",
      "Arson, Gambesons free",
      "Siege Workshop Units cost -15%",
      "Monks move +20% faster"
    ],
    teamBonus: "Military buildings (except Castles) provide +5 population space"
  }, xg = {
    bonuses: [
      "Builders work +30% faster",
      "Receive +20 gold for each technology researched",
      "Blacksmith upgrades cost no gold",
      "Gunpowder Units attack +18% faster",
      "Cannon Galleons fire more accurately at moving targets"
    ],
    teamBonus: "Trade Units generate +25% gold"
  }, Mg = {
    bonuses: [
      "Livestock animals last +50% longer",
      "Units deal +25% damage when fighting from higher elevation",
      "New Town Centers spawn 2 Sheep starting in Castle Age",
      "Thumb Ring, Parthian Tactics free"
    ],
    teamBonus: "Mounted Archers +2 line of sight"
  }, jg = {
    bonuses: [
      "Farms cost -40%",
      "Town Centers +10 garrison capacity; Towers +5 garrison capacity",
      "Barracks and Stable Units +1/+2 melee armor in Castle/Imperial Age",
      "Monks +100% healing range",
      "Murder Holes, Herbal Medicine free"
    ],
    teamBonus: "Units more resistant to conversion"
  }, Ag = {
    bonuses: [
      "Gold miners work +25% faster",
      "Scout Cavalry-line +1 pierce armor and upgrades free",
      "Chemistry free; Gunpowder technologies costs -50%",
      "Gunpowder Units +25% HP"
    ],
    teamBonus: "Gunpowder Units train +25% faster"
  }, Ig = {
    bonuses: [
      "Enemy Town Centers are revealed at the start of the game",
      "Economic upgrades cost no wood and research +100% faster",
      "Archery Range units and Fire Lancers +20% HP",
      "Conscription free"
    ],
    teamBonus: "Imperial Skirmisher upgrade available in Imperial Age"
  }, Ng = {
    bonuses: [
      "Receive one free Villager for each economic upgrade researched",
      "Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age",
      "Traction Trebuchets and Lou Chuans cost -25%"
    ],
    teamBonus: "Cavalry +2 attack vs. Siege Weapons"
  }, Eg = {
    bonuses: [
      "Military production buildings and Docks provide +55 food",
      "Infantry regenerates 10/15/30 HP per minute in Feudal/Castle/Imperial Age",
      "Jian Swordsmen and Hei Guang Cavalry +2 attack in Imperial Age",
      "Careening, Dry Dock free"
    ],
    teamBonus: "Houses built +100% faster"
  }, Mm = {
    Bengalis: D0,
    Bohemians: U0,
    Goths: L0,
    Gurjaras: O0,
    Italians: B0,
    Magyars: q0,
    Malay: H0,
    Vikings: G0,
    Armenians: Y0,
    Aztecs: Q0,
    Berbers: X0,
    Britons: V0,
    Bulgarians: Z0,
    Burgundians: K0,
    Burmese: J0,
    Byzantines: F0,
    Celts: $0,
    Chinese: W0,
    Cumans: P0,
    Dravidians: eg,
    Ethiopians: tg,
    Franks: ag,
    Georgians: ng,
    Hindustanis: sg,
    Huns: ig,
    Incas: lg,
    Japanese: rg,
    Jurchens: og,
    Khitans: cg,
    Khmer: ug,
    Koreans: dg,
    Lithuanians: fg,
    Malians: mg,
    Mayans: hg,
    Mongols: pg,
    Persians: gg,
    Poles: yg,
    Portuguese: vg,
    Romans: bg,
    Saracens: wg,
    Shu: kg,
    Sicilians: Sg,
    Slavs: Cg,
    Spanish: xg,
    Tatars: Mg,
    Teutons: jg,
    Turks: Ag,
    Vietnamese: Ig,
    Wei: Ng,
    Wu: Eg
  }, Rg = "" + new URL("el4-ranked-BYeJ67OI.png", import.meta.url).href;
  function jm() {
    return i.jsx("aside", {
      className: "matchmaking-brand",
      "aria-label": "Empire League",
      children: i.jsx("img", {
        src: Rg,
        alt: "Empire League"
      })
    });
  }
  function Tg() {
    var _a2;
    const { state: r, prepareLobby: c } = bt(), f = !r.error, u = r.activeMatch, m = r.roomSetupEstimateMs ?? 6e4, [h, x] = T.useState(() => K1(r.roomSetupStartedAt, m)), j = nn.find((D) => {
      var _a3;
      return D.id === ((_a3 = u == null ? void 0 : u.selectedMap) == null ? void 0 : _a3.id);
    }) ?? (u == null ? void 0 : u.selectedMap), k = j ? (_a2 = mm(j.id)) == null ? void 0 : _a2.description : void 0, y = V1(u == null ? void 0 : u.queue.civilizationPreference, u == null ? void 0 : u.opponentCivilizationPreference), C = V1(u == null ? void 0 : u.opponentCivilizationPreference, u == null ? void 0 : u.queue.civilizationPreference);
    return T.useEffect(() => {
      const D = () => x(K1(r.roomSetupStartedAt, m));
      D();
      const Q = window.setInterval(D, 250);
      return () => window.clearInterval(Q);
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
                i.jsx(rm, {
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
                  children: (j == null ? void 0 : j.name) ?? "Map pending"
                }),
                (j == null ? void 0 : j.thumbnailUrl) ? i.jsx("img", {
                  src: j.thumbnailUrl,
                  alt: `Preview of ${j.name}`
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
            i.jsx(Z1, {
              civilization: y,
              side: "player"
            }),
            i.jsx(Z1, {
              civilization: C,
              side: "opponent"
            })
          ]
        })
      ]
    });
  }
  function V1(r, c) {
    const f = (r == null ? void 0 : r.mode) === "mirror" ? c == null ? void 0 : c.civilization : r == null ? void 0 : r.civilization;
    return f && f in Mm ? f : null;
  }
  function Z1({ civilization: r, side: c }) {
    const f = r ? Mm[r] : null;
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
  function K1(r, c) {
    const f = Math.ceil(c / 1e3);
    if (!r) return f;
    const u = Math.floor((Date.now() - new Date(r).getTime()) / 1e3);
    return Math.max(0, f - u);
  }
  function zg() {
    var _a2, _b, _c;
    const { state: r, simulateMatchEnd: c } = bt(), f = r.activeMatch;
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
          children: "Replay metadata submitted. Waiting for one valid report from each team."
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
                  children: "Server"
                }),
                i.jsx("strong", {
                  children: (_b = f.lobby) == null ? void 0 : _b.serverRegion
                })
              ]
            }),
            i.jsxs("div", {
              children: [
                i.jsx("span", {
                  children: "Lobby"
                }),
                i.jsx("strong", {
                  children: (_c = f.lobby) == null ? void 0 : _c.platformLobbyId
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
        i.jsxs("div", {
          className: "button-row",
          children: [
            i.jsxs("button", {
              className: "secondary",
              type: "button",
              children: [
                i.jsx(Ep, {
                  size: 18
                }),
                " Report Technical Issue"
              ]
            }),
            false
          ]
        })
      ]
    }) : null;
  }
  function _g({ oldRating: r, newRating: c, onClose: f }) {
    T.useEffect(() => {
      const h = (x) => {
        x.key === "Escape" && f();
      };
      return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
    }, [
      f
    ]);
    const u = hi(r), m = hi(c);
    return i.jsx("div", {
      className: "modal-backdrop promotion-backdrop",
      role: "presentation",
      children: i.jsxs("section", {
        className: "match-modal promotion-modal",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "promotion-title",
        children: [
          i.jsx(Ap, {
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
  function Dg() {
    const { state: r, setPage: c, returnToMatchmaking: f } = bt(), [u, m] = T.useState(true), h = r.activeMatch, x = h == null ? void 0 : h.result;
    if (!h || !x) return null;
    const j = x.outcome === "win", k = x.verificationStatus === "contested", y = x.verified && j && lp(x.oldRating, x.newRating);
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
              className: j ? "win" : "loss",
              children: k ? "Result Contested" : j ? "Victory" : x.outcome === "loss" ? "Defeat" : "No Contest"
            }),
            k && i.jsx("p", {
              children: "The replay result could not be verified. The result was discarded and ratings were not changed."
            }),
            i.jsxs("div", {
              className: "rating-swing",
              children: [
                i.jsxs("strong", {
                  children: [
                    x.ratingChange > 0 ? "+" : "",
                    x.ratingChange,
                    " Rating"
                  ]
                }),
                i.jsx("span", {
                  children: k ? "No rating change" : `${x.oldRating} \u2192 ${x.newRating}`
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
        y && u && i.jsx(_g, {
          oldRating: x.oldRating,
          newRating: x.newRating,
          onClose: () => m(false)
        })
      ]
    });
  }
  const J1 = "arena", Am = "empire-league-map-guidance-seen";
  function Ug() {
    if (ye) return true;
    try {
      return window.localStorage.getItem(Am) !== "1";
    } catch {
      return true;
    }
  }
  function Lg({ groups: r, enabledGroupIds: c, selectedMapIds: f, favoriteMapIds: u, onToggleGroup: m, onToggleMap: h, onFavorite: x, disabled: j = false }) {
    const [k, y] = T.useState(Ug);
    function C() {
      if (y(false), !ye) try {
        window.localStorage.setItem(Am, "1");
      } catch {
      }
    }
    return i.jsx("div", {
      className: "grouped-map-pool",
      children: r.map((D) => {
        const Q = c.includes(D.id), q = D.maps.some((p) => p.id === J1);
        return i.jsxs("section", {
          className: `${Q ? "map-group enabled" : "map-group"}${k && q ? " map-guidance-active" : ""}`,
          children: [
            i.jsxs("header", {
              className: "map-group-header",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: D.name
                    }),
                    i.jsx("span", {
                      children: D.description
                    })
                  ]
                }),
                i.jsxs("label", {
                  className: "group-switch",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: Q,
                      disabled: j,
                      onChange: () => m(D.id)
                    }),
                    i.jsx("span", {
                      "aria-hidden": "true"
                    }),
                    i.jsx("small", {
                      children: Q ? "Enabled" : "Disabled"
                    })
                  ]
                })
              ]
            }),
            i.jsx("div", {
              className: "map-group-grid",
              children: D.maps.map((p, F) => {
                const V = p.id === D.primaryMapId, ee = Q && f.includes(p.id), oe = u[D.id] === p.id;
                return i.jsxs("article", {
                  className: `group-map ${V ? "primary" : ""} ${ee ? "selected" : ""}${k && p.id === J1 ? " map-guidance-target" : ""}`,
                  children: [
                    i.jsxs("button", {
                      className: "group-map-select",
                      type: "button",
                      "aria-pressed": ee,
                      "aria-label": `${ee ? "Exclude" : "Include"} ${p.name}`,
                      disabled: j || !Q,
                      onClick: () => {
                        C(), h(D.id, p.id);
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
                        !ee && i.jsx("span", {
                          className: "map-off-label",
                          children: Q ? "Off" : "Group off"
                        })
                      ]
                    }),
                    i.jsx("button", {
                      className: oe ? "map-favorite active" : "map-favorite",
                      type: "button",
                      disabled: j || !Q,
                      "aria-pressed": oe,
                      "aria-label": `${oe ? "Remove" : "Favorite"} ${p.name}`,
                      title: oe ? "Remove favorite" : `Favorite ${p.name}`,
                      onClick: () => x(D.id, p.id),
                      children: i.jsx(fm, {
                        size: F === 0 ? 18 : 15,
                        fill: oe ? "currentColor" : "none"
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
        }, D.id);
      })
    });
  }
  const F1 = "empire-league-favorite-maps", gs = "empire-league-civilization-preference", Im = "empire-league-map-preferences", $1 = [
    {
      id: "pick",
      label: "Choose Civ",
      detail: "Play your selected civilization",
      icon: gi
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
  function Og() {
    var _a2, _b, _c;
    const { state: r, queues: c, startQueue: f, updateActiveQueue: u, cancelQueue: m } = bt(), [h, x] = T.useState(0);
    T.useEffect(() => {
      if (p0 !== "map-pool") return;
      const O = window.requestAnimationFrame(() => {
        var _a3;
        (_a3 = document.getElementById("map-pool")) == null ? void 0 : _a3.scrollIntoView({
          block: "start"
        });
      });
      return () => window.cancelAnimationFrame(O);
    }, []);
    const [j] = T.useState(() => Hg(c)), [k, y] = T.useState(() => {
      var _a3;
      const O = Mc().selectedQueueId;
      return c.some((ue) => ue.id === O) ? O : ((_a3 = c[0]) == null ? void 0 : _a3.id) ?? "";
    }), C = c.find((O) => O.id === k) ?? c[0], D = [
      "idle",
      "cancelled",
      "completed"
    ].includes(r.queueStatus) && (!r.activeMatch || r.queueStatus === "completed") && r.gameStatus !== "loading", Q = r.queueStatus === "searching", q = ![
      "idle",
      "cancelled",
      "completed",
      "searching"
    ].includes(r.queueStatus), [p, F] = T.useState(j.selectedMaps), [V, ee] = T.useState(j.enabledGroups), [oe, le] = T.useState(() => {
      try {
        const O = JSON.parse(window.localStorage.getItem(F1) ?? "{}");
        return Object.fromEntries(Object.entries(O).map(([ue, ve]) => [
          ue,
          ve && typeof ve == "object" ? ve : {}
        ]));
      } catch {
        return {};
      }
    }), [he, K] = T.useState([
      2,
      4
    ]), [ne, z] = T.useState(true), [L, U] = T.useState(() => {
      try {
        const O = JSON.parse(window.localStorage.getItem(gs) ?? "{}");
        if (O.preferRandom === true) return "pick";
        const ue = O.mode;
        return ue === "prefer-random" || ue === "full-random" ? "random" : ue ?? "pick";
      } catch {
        return "pick";
      }
    }), [J, te] = T.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(gs) ?? "{}").civilization ?? "Byzantines";
      } catch {
        return "Byzantines";
      }
    }), [we, ze] = T.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(gs) ?? "{}").preferRandom === true;
      } catch {
        return false;
      }
    }), [Ee, at] = T.useState(() => {
      try {
        const O = JSON.parse(window.localStorage.getItem(gs) ?? "{}");
        return {
          open: Array.isArray(O.openLandBans) ? O.openLandBans.slice(0, 5) : [],
          closed: Array.isArray(O.closedLandBans) ? O.closedLandBans.slice(0, 5) : []
        };
      } catch {
        return {
          open: [],
          closed: []
        };
      }
    }), [w, R] = T.useState(false), [W, fe] = T.useState(false), [pe, v] = T.useState("open"), H = (O = L, ue = J, ve = Ee) => {
      window.localStorage.setItem(gs, JSON.stringify({
        mode: O,
        civilization: ue,
        preferRandom: we,
        openLandBans: ve.open,
        closedLandBans: ve.closed
      }));
    }, $ = (O) => {
      we && L === "pick" && (O === "pick" || O === "random") || (U(O), H(O));
    }, ae = (O) => {
      te(O), H(L, O);
    }, ge = (O, ue) => {
      at((ve) => {
        const M = ve[O], N = M.includes(ue) ? M.filter((se) => se !== ue) : M.length < 5 ? [
          ...M,
          ue
        ] : M, Z = {
          ...ve,
          [O]: N
        };
        return H(L, J, Z), Z;
      });
    }, ke = {
      preferRandom: we,
      openLandBans: Ee.open,
      closedLandBans: Ee.closed
    }, Re = (O, ue, ve) => {
      le((M) => {
        const N = {
          ...M[O] ?? {}
        };
        N[ue] === ve ? delete N[ue] : N[ue] = ve;
        const Z = {
          ...M,
          [O]: N
        };
        return window.localStorage.setItem(F1, JSON.stringify(Z)), Z;
      }), F((M) => {
        var _a3;
        return {
          ...M,
          [O]: ((_a3 = M[O]) == null ? void 0 : _a3.includes(ve)) ? M[O] : [
            ...M[O] ?? [],
            ve
          ]
        };
      });
    }, ot = (O, ue, ve) => {
      var _a3, _b2;
      ((_a3 = p[O]) == null ? void 0 : _a3.includes(ve)) && ((_b2 = oe[O]) == null ? void 0 : _b2[ue]) === ve && Re(O, ue, ve), F((M) => {
        const N = M[O] ?? [], Z = N.includes(ve), se = Z ? N.filter((X) => X !== ve) : [
          ...N,
          ve
        ];
        return Z && !gc(O, se, V[O] ?? [], c) ? M : {
          ...M,
          [O]: se
        };
      });
    }, Xe = (O, ue) => {
      ee((ve) => {
        const M = ve[O] ?? [], N = M.includes(ue) ? M.filter((Z) => Z !== ue) : [
          ...M,
          ue
        ];
        return gc(O, p[O] ?? [], N, c) ? {
          ...ve,
          [O]: N
        } : ve;
      });
    }, wt = C ? C.mapPool.filter((O) => {
      var _a3, _b2;
      const ue = sn.find((ve) => ve.maps.some((M) => M.id === O.id));
      return ue && ((_a3 = V[C.id]) == null ? void 0 : _a3.includes(ue.id)) && ((_b2 = p[C.id]) == null ? void 0 : _b2.includes(O.id));
    }).map((O) => O.id) : [], ra = C ? Object.entries(oe[C.id] ?? {}).filter(([O, ue]) => {
      var _a3;
      return ((_a3 = V[C.id]) == null ? void 0 : _a3.includes(O)) && wt.includes(ue);
    }) : [], oa = Object.fromEntries(ra), Ea = Object.values(oa), Bt = C ? Ea.map((O) => {
      var _a3;
      return (_a3 = C.mapPool.find((ue) => ue.id === O)) == null ? void 0 : _a3.name;
    }).filter(Boolean).join(", ") : "", ln = L === "pick" ? J : (_a2 = $1.find((O) => O.id === L)) == null ? void 0 : _a2.label, rn = (C == null ? void 0 : C.format) === "team" ? `${C.name} - ${he.map((O) => `${O}v${O}`).join(" or ")}` : C == null ? void 0 : C.name;
    return T.useEffect(() => {
      if (!r.queueStartedAt || r.queueStatus !== "searching") return;
      const O = window.setInterval(() => {
        x(Math.floor((Date.now() - new Date(r.queueStartedAt ?? Date.now()).getTime()) / 1e3));
      }, 1e3);
      return () => window.clearInterval(O);
    }, [
      r.queueStartedAt,
      r.queueStatus
    ]), T.useEffect(() => {
      Gg(c, k, p, V);
    }, [
      V,
      c,
      p,
      k
    ]), T.useEffect(() => {
      if (!Q || !C) return;
      const O = window.setTimeout(() => {
        u({
          ...C,
          findAnyone: ne,
          teamSizes: C.format === "team" ? he : void 0,
          mapPool: C.mapPool.filter((ue) => wt.includes(ue.id)),
          mapPreferences: {
            enabledGroupIds: V[C.id] ?? [],
            favoriteMapIds: oa
          },
          mapCatalogVersion: It.version,
          favoriteMapId: Ea[0],
          civilizationPreference: {
            mode: L,
            civilization: L === "pick" ? J : void 0,
            ...ke
          }
        });
      }, 250);
      return () => window.clearTimeout(O);
    }, [
      J,
      Ee,
      L,
      V,
      oe,
      ne,
      Q,
      we,
      p,
      C,
      he
    ]), [
      "creating_lobby",
      "waiting_for_opponent",
      "verifying_lobby",
      "ready"
    ].includes(r.queueStatus) ? i.jsx(Tg, {}) : r.queueStatus === "in_game" || r.queueStatus === "verifying_result" ? i.jsx(zg, {}) : r.queueStatus === "completed" ? i.jsx(Dg, {}) : i.jsxs("section", {
      className: "stack queue-page",
      children: [
        C && i.jsxs("div", {
          className: "search-waiting-layout matchmaking-overview",
          children: [
            i.jsx("div", {
              className: "search-state",
              children: Q ? i.jsxs(i.Fragment, {
                children: [
                  i.jsx("div", {
                    className: "search-orbit",
                    children: i.jsx(_l, {
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
                              C.format === "team" ? "team " : "",
                              "rating"
                            ]
                          }),
                          i.jsx("strong", {
                            children: C.format === "team" ? r.currentUser.teamRating : r.currentUser.rating
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
                            children: qg(h)
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
                        onChange: (O) => z(O.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => void m(),
                    children: [
                      i.jsx(im, {
                        size: 18
                      }),
                      " Cancel Search"
                    ]
                  })
                ]
              }) : i.jsxs(i.Fragment, {
                children: [
                  i.jsx("h2", {
                    children: rn
                  }),
                  i.jsxs("div", {
                    className: "queue-stats",
                    children: [
                      i.jsxs("span", {
                        children: [
                          i.jsx(_l, {
                            size: 18
                          }),
                          i.jsx("strong", {
                            children: C.playersSearching
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
                              C.estimatedWaitSeconds,
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
                            children: ln
                          })
                        ]
                      }),
                      L !== "mirror" && i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Prefer Random"
                          }),
                          i.jsx("strong", {
                            children: we ? "Yes" : "No"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Maps enabled"
                          }),
                          i.jsx("strong", {
                            children: wt.length
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Favorites"
                          }),
                          i.jsx("strong", {
                            children: Bt || "None"
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
                        onChange: (O) => z(O.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "queue-search-button",
                    type: "button",
                    disabled: !D || wt.length === 0,
                    onClick: () => void f({
                      ...C,
                      findAnyone: ne,
                      teamSizes: C.format === "team" ? he : void 0,
                      mapPool: C.mapPool.filter((O) => wt.includes(O.id)),
                      mapPreferences: {
                        enabledGroupIds: V[C.id] ?? [],
                        favoriteMapIds: oa
                      },
                      mapCatalogVersion: It.version,
                      favoriteMapId: Ea[0],
                      civilizationPreference: {
                        mode: L,
                        civilization: L === "pick" ? J : void 0,
                        ...ke
                      }
                    }),
                    children: [
                      i.jsx(_l, {
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
        C ? i.jsx(i.Fragment, {
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
                        children: c.map((O) => {
                          const ue = O.id === "team-games", ve = ue ? ys : gi;
                          return i.jsxs("button", {
                            className: C.id === O.id ? "civilization-mode active" : "civilization-mode",
                            type: "button",
                            "aria-pressed": C.id === O.id,
                            disabled: Q || q,
                            onClick: () => y(O.id),
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
                                    children: O.ruleset
                                  })
                                ]
                              })
                            ]
                          }, O.id);
                        })
                      }),
                      C.format === "team" && i.jsxs(i.Fragment, {
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
                            ].map((O) => {
                              const ue = he.includes(O);
                              return i.jsxs("button", {
                                className: ue ? "civilization-mode active" : "civilization-mode",
                                type: "button",
                                "aria-pressed": ue,
                                disabled: Q || q,
                                onClick: () => K((ve) => ve.includes(O) ? ve.length === 1 ? ve : ve.filter((M) => M !== O) : [
                                  ...ve,
                                  O
                                ].sort()),
                                children: [
                                  i.jsx(ys, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsxs("strong", {
                                        children: [
                                          O,
                                          "v",
                                          O
                                        ]
                                      }),
                                      i.jsxs("small", {
                                        children: [
                                          O * 2,
                                          " players"
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              }, O);
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
                        children: $1.map((O) => {
                          const ue = O.icon;
                          return i.jsxs("div", {
                            className: L === O.id || we && L === "pick" && O.id === "random" ? "civilization-option-card active" : "civilization-option-card",
                            children: [
                              i.jsxs("button", {
                                className: "civilization-mode-choice",
                                type: "button",
                                "aria-pressed": L === O.id || we && L === "pick" && O.id === "random",
                                disabled: q,
                                onClick: () => $(O.id),
                                children: [
                                  i.jsx(ue, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsx("strong", {
                                        children: O.label
                                      }),
                                      O.detail && i.jsx("small", {
                                        children: O.detail
                                      })
                                    ]
                                  })
                                ]
                              }),
                              O.id === "pick" && i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx(Na, {
                                    className: "civilization-select",
                                    label: "Civilization",
                                    options: Ul.map((ve) => ({
                                      value: ve,
                                      label: ve
                                    })),
                                    value: J,
                                    onChange: ae,
                                    disabled: q || L !== "pick",
                                    searchable: true,
                                    displayValue: L === "pick" ? void 0 : "N/A"
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-select-activate",
                                    type: "button",
                                    "aria-label": `Choose ${J}`,
                                    disabled: q,
                                    onClick: () => $("pick")
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-card-settings",
                                    type: "button",
                                    "aria-label": "Configure chosen civilization behavior",
                                    disabled: q,
                                    onClick: () => fe(true),
                                    children: i.jsx(fc, {
                                      size: 17
                                    })
                                  })
                                ]
                              }),
                              O.id === "random" && i.jsx("button", {
                                className: "civilization-card-settings",
                                type: "button",
                                "aria-label": "Configure random civilization bans",
                                disabled: q,
                                onClick: () => R(true),
                                children: i.jsx(fc, {
                                  size: 17
                                })
                              })
                            ]
                          }, O.id);
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
                              wt.length,
                              " maps across ",
                              ((_c = V[C.id]) == null ? void 0 : _c.length) ?? 0,
                              " groups"
                            ]
                          })
                        ]
                      }),
                      i.jsx(Lg, {
                        groups: sn,
                        enabledGroupIds: V[C.id] ?? [],
                        selectedMapIds: p[C.id] ?? [],
                        favoriteMapIds: oe[C.id] ?? {},
                        onToggleGroup: (O) => Xe(C.id, O),
                        onToggleMap: (O, ue) => ot(C.id, O, ue),
                        onFavorite: (O, ue) => Re(C.id, O, ue),
                        disabled: q
                      })
                    ]
                  })
                ]
              }, C.id),
              false
            ]
          })
        }) : i.jsx("div", {
          className: "empty-state",
          children: "No matchmaking modes are available."
        }),
        w && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "civ-ban-title",
          onMouseDown: () => R(false),
          children: i.jsxs("div", {
            className: "match-modal civilization-ban-modal",
            onMouseDown: (O) => O.stopPropagation(),
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
              i.jsx(Na, {
                className: "civilization-ban-map-select",
                label: "Map style",
                options: [
                  {
                    value: "open",
                    label: `Open land maps (${Ee.open.length}/5 banned)`
                  },
                  {
                    value: "closed",
                    label: `Closed land maps (${Ee.closed.length}/5 banned)`
                  }
                ],
                value: pe,
                onChange: (O) => v(O)
              }),
              i.jsx(Bg, {
                title: pe === "open" ? "Open land maps" : "Closed land maps",
                selected: Ee[pe],
                onToggle: (O) => ge(pe, O)
              }),
              i.jsxs("div", {
                className: "modal-actions",
                children: [
                  i.jsx("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => {
                      const O = {
                        open: [],
                        closed: []
                      };
                      at(O), H(L, J, O);
                    },
                    children: "Clear bans"
                  }),
                  i.jsx("button", {
                    className: "primary",
                    type: "button",
                    onClick: () => R(false),
                    children: "Done"
                  })
                ]
              })
            ]
          })
        }),
        W && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "prefer-random-title",
          onMouseDown: () => fe(false),
          children: i.jsxs("div", {
            className: "match-modal prefer-random-modal",
            onMouseDown: (O) => O.stopPropagation(),
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
                    checked: we,
                    onChange: (O) => {
                      const ue = O.target.checked, ve = ue ? "pick" : L;
                      ze(ue), ue && U("pick"), window.localStorage.setItem(gs, JSON.stringify({
                        mode: ve,
                        civilization: J,
                        preferRandom: ue,
                        openLandBans: Ee.open,
                        closedLandBans: Ee.closed
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
                onClick: () => fe(false),
                children: "Done"
              })
            ]
          })
        })
      ]
    });
  }
  function Bg({ title: r, selected: c, onToggle: f }) {
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
          children: Ul.map((u) => {
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
  function qg(r) {
    return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
  }
  function Mc() {
    try {
      const r = JSON.parse(window.localStorage.getItem(Im) ?? "{}");
      return r && typeof r == "object" ? r : {
        version: 1
      };
    } catch {
      return {
        version: 1
      };
    }
  }
  function Hg(r) {
    var _a2, _b, _c, _d;
    const c = Mc(), f = {}, u = {};
    for (const m of r) {
      const h = new Set(((_b = (_a2 = c.queues) == null ? void 0 : _a2[m.id]) == null ? void 0 : _b.deselectedMapIds) ?? []), x = new Set(((_d = (_c = c.queues) == null ? void 0 : _c[m.id]) == null ? void 0 : _d.disabledGroupIds) ?? []);
      if (f[m.id] = m.mapPool.map((j) => j.id).filter((j) => !h.has(j)), u[m.id] = sn.map((j) => j.id).filter((j) => !x.has(j)), !gc(m.id, f[m.id], u[m.id], r)) {
        const j = m.mapPool[0], k = sn.find((y) => y.maps.some((C) => C.id === (j == null ? void 0 : j.id)));
        j && k && (f[m.id] = [
          .../* @__PURE__ */ new Set([
            ...f[m.id],
            j.id
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
  function gc(r, c, f, u) {
    var _a2;
    const m = new Set(((_a2 = u.find((x) => x.id === r)) == null ? void 0 : _a2.mapPool.map((x) => x.id)) ?? []), h = new Set(sn.filter((x) => f.includes(x.id)).flatMap((x) => x.maps.map((j) => j.id)));
    return c.some((x) => m.has(x) && h.has(x));
  }
  function Gg(r, c, f, u) {
    var _a2;
    const m = Mc(), h = {
      ...m.queues ?? {}
    };
    for (const x of r) {
      const j = new Set(x.mapPool.map((Q) => Q.id)), k = new Set(sn.map((Q) => Q.id)), y = (_a2 = m.queues) == null ? void 0 : _a2[x.id], C = ((y == null ? void 0 : y.deselectedMapIds) ?? []).filter((Q) => !j.has(Q)), D = ((y == null ? void 0 : y.disabledGroupIds) ?? []).filter((Q) => !k.has(Q));
      h[x.id] = {
        deselectedMapIds: [
          .../* @__PURE__ */ new Set([
            ...C,
            ...x.mapPool.map((Q) => Q.id).filter((Q) => !(f[x.id] ?? []).includes(Q))
          ])
        ],
        disabledGroupIds: [
          .../* @__PURE__ */ new Set([
            ...D,
            ...sn.map((Q) => Q.id).filter((Q) => !(u[x.id] ?? []).includes(Q))
          ])
        ]
      };
    }
    window.localStorage.setItem(Im, JSON.stringify({
      version: 1,
      selectedQueueId: c,
      queues: h
    }));
  }
  const mi = [
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
  ], Yg = /* @__PURE__ */ new Date("2026-07-27T00:00:00"), Qg = 10080 * 60 * 1e3;
  function Xg(r) {
    return (Math.floor((r.getTime() - Yg.getTime()) / Qg) % mi.length + mi.length) % mi.length;
  }
  function Vg() {
    const [r, c] = T.useState(false), f = T.useMemo(() => {
      const m = Xg(/* @__PURE__ */ new Date());
      return [
        0,
        1,
        2
      ].map((h) => mi[(m + h) % mi.length]);
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
                      h === 0 ? i.jsx(ys, {
                        size: 15
                      }) : h === 1 ? i.jsx(gi, {
                        size: 15
                      }) : i.jsx(dm, {
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
                    r ? i.jsx(pi, {
                      size: 18
                    }) : i.jsx(gi, {
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
                i.jsx(lm, {
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
                    children: m.details.map((x) => i.jsx("span", {
                      children: x
                    }, x))
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
            i.jsx(sm, {
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
  const Pe = {
    async list() {
      return ye ? sc : (await Me.request("/custom-lobbies")).rooms;
    },
    async create(r) {
      return ye ? {
        ...sc[0],
        id: "preview-created",
        name: r.name,
        maxPlayers: r.maxPlayers
      } : (await Me.request("/custom-lobbies", {
        method: "POST",
        body: {
          name: r.name,
          maxPlayers: r.maxPlayers,
          map: W1(r.map),
          dataMod: W1(r.dataMod)
        }
      })).room;
    },
    async join(r, c) {
      if (ye) {
        const f = sc.find((h) => h.id === r);
        if (!f || !c) throw new Error("The preview lobby is unavailable.");
        if (f.players.some((h) => h.id === c.id)) return f;
        const u = new Set(f.players.map((h) => h.slot)), m = Array.from({
          length: f.maxPlayers
        }, (h, x) => x + 1).find((h) => !u.has(h));
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
      return (await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/join`, {
        method: "POST"
      })).room;
    },
    async leave(r) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/leave`, {
        method: "POST"
      });
    },
    async updatePlayer(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/player`, {
        method: "PATCH",
        body: c
      });
    },
    async updateSettings(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/settings`, {
        method: "PATCH",
        body: c
      });
    },
    async sendMessage(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/messages`, {
        method: "POST",
        body: {
          text: c
        }
      });
    },
    async kick(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/players/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async start(r) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/start`, {
        method: "POST"
      });
    },
    async publish(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/publish`, {
        method: "POST",
        body: {
          platformLobbyId: c
        }
      });
    },
    async reportJoined(r) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/joined`, {
        method: "POST"
      });
    },
    async reportAoeReady(r) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/aoe-ready`, {
        method: "POST"
      });
    },
    async completeStart(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/complete-start`, {
        method: "POST",
        body: {
          gameStartedAt: c
        }
      });
    },
    async finish(r) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/finish`, {
        method: "POST"
      });
    },
    async failStart(r, c) {
      ye || await Me.request(`/custom-lobbies/${encodeURIComponent(r)}/fail-start`, {
        method: "POST",
        body: {
          error: c
        }
      });
    },
    onEvent(r) {
      return ye ? () => {
      } : Me.onCustomLobbyEvent(r);
    }
  };
  function W1(r) {
    return r ? {
      id: r.id,
      name: r.name,
      gameName: r.gameName,
      kind: r.kind
    } : void 0;
  }
  const P1 = {
    maps: [],
    dataMods: [],
    scannedRoots: [],
    scannedAt: (/* @__PURE__ */ new Date(0)).toISOString()
  };
  function Zg() {
    const { state: r, notify: c, ensureAoe2Ready: f } = bt(), [u, m] = T.useState([]), [h, x] = T.useState(P1), [j, k] = T.useState(true), [y, C] = T.useState(true), [D, Q] = T.useState(false), [q, p] = T.useState(`${r.currentUser.displayName}'s Lobby`), [F, V] = T.useState("map"), [ee, oe] = T.useState(""), [le, he] = T.useState(""), [K, ne] = T.useState(""), [z, L] = T.useState(8), [U, J] = T.useState(false), te = u.find((R) => R.players.some((W) => W.id === r.currentUser.id));
    async function we() {
      k(true);
      try {
        m(await Pe.list());
      } catch (R) {
        c("Custom lobbies could not be loaded.", "danger", {
          detail: Ot(R)
        });
      } finally {
        k(false);
      }
    }
    async function ze() {
      var _a2;
      C(true);
      try {
        const R = await (((_a2 = window.electronApi) == null ? void 0 : _a2.scanLocalCustomContent()) ?? Promise.resolve(P1));
        x(R), oe((W) => R.maps.some((fe) => fe.id === W) ? W : ""), he((W) => R.maps.some((fe) => fe.id === W) ? W : ""), ne((W) => R.dataMods.some((fe) => fe.id === W) ? W : "");
      } catch (R) {
        c("Local content could not be scanned.", "danger", {
          detail: Ot(R)
        });
      } finally {
        C(false);
      }
    }
    T.useEffect(() => (we(), ze(), Pe.onEvent((R) => {
      m((W) => ((R.closedRoomId ? W.find((pe) => pe.id === R.closedRoomId && pe.players.some((v) => v.id === r.currentUser.id)) : void 0) && R.closeReason && c("Custom lobby closed.", "warning", {
        detail: R.closeReason
      }), R.rooms));
    })), []);
    async function Ee() {
      J(true);
      try {
        const R = F === "map" ? ee : le;
        await Pe.create({
          name: q.trim(),
          maxPlayers: z,
          map: h.maps.find((W) => W.id === R),
          dataMod: h.dataMods.find((W) => W.id === K)
        }), Q(false);
      } catch (R) {
        c("The lobby could not be created.", "danger", {
          detail: Ot(R)
        });
      } finally {
        J(false);
      }
    }
    async function at() {
      await f("custom") && Q(true);
    }
    async function w(R) {
      if (await f("custom")) {
        J(true);
        try {
          const W = await Pe.join(R, {
            id: r.currentUser.id,
            displayName: r.currentUser.displayName
          });
          m((fe) => fe.map((pe) => pe.id === W.id ? W : pe));
        } catch (W) {
          c("Could not join the lobby.", "danger", {
            detail: Ot(W)
          });
        } finally {
          J(false);
        }
      }
    }
    return te ? i.jsx(Kg, {
      room: te,
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
              children: !D && i.jsxs("button", {
                className: "primary",
                type: "button",
                disabled: r.gameStatus === "loading",
                onClick: () => void at(),
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
        D && i.jsxs("article", {
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
                  disabled: y,
                  children: [
                    i.jsx(z1, {
                      size: 16,
                      className: y ? "spin" : ""
                    }),
                    " ",
                    y ? "Scanning\u2026" : "Rescan Content"
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
                  onChange: (R) => p(R.target.value)
                })
              ]
            }),
            i.jsx(Na, {
              label: "Maximum players",
              value: String(z),
              onChange: (R) => L(Number(R)),
              options: Array.from({
                length: 7
              }, (R, W) => {
                const fe = W + 2;
                return {
                  value: String(fe),
                  label: `${fe} players`
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
                      "aria-pressed": F === "map",
                      onClick: () => V("map"),
                      children: "Map"
                    }),
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": F === "scenario",
                      onClick: () => V("scenario"),
                      children: "Scenario"
                    })
                  ]
                })
              ]
            }),
            F === "map" ? i.jsx(rc, {
              label: "Map",
              items: h.maps.filter((R) => R.kind === "map"),
              value: ee,
              onChange: oe
            }) : i.jsx(rc, {
              label: "Scenario",
              items: h.maps.filter((R) => R.kind === "scenario"),
              value: le,
              onChange: he
            }),
            i.jsx(rc, {
              label: "Data mod (optional)",
              items: h.dataMods,
              value: K,
              onChange: ne
            }),
            [
              ...h.maps,
              ...h.dataMods
            ].some((R) => !R.enabled) && i.jsx("small", {
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
                  disabled: !q.trim() || !(F === "map" ? ee : le) || U,
                  onClick: () => void Ee(),
                  children: U ? "Creating\u2026" : "Create Lobby"
                }),
                i.jsx("button", {
                  className: "secondary large",
                  type: "button",
                  disabled: U,
                  onClick: () => Q(false),
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
                onClick: () => void we(),
                disabled: j,
                children: [
                  i.jsx(z1, {
                    size: 16,
                    className: j ? "spin" : ""
                  }),
                  " ",
                  j ? "Refreshing\u2026" : "Refresh Rooms"
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
                u.map((R) => {
                  var _a2, _b, _c;
                  return i.jsxs("article", {
                    className: "custom-room-row",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: R.name
                          }),
                          i.jsxs("small", {
                            children: [
                              R.demo ? "Demo room \xB7 " : "",
                              "Hosted by ",
                              ((_a2 = R.players.find((W) => W.host)) == null ? void 0 : _a2.displayName) ?? "Unknown"
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: ((_b = R.map) == null ? void 0 : _b.name) ?? "Standard map"
                          }),
                          i.jsx("small", {
                            children: ((_c = R.dataMod) == null ? void 0 : _c.name) ?? "No data mod"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "room-player-count",
                        children: [
                          i.jsx(ys, {
                            size: 16
                          }),
                          " ",
                          R.players.length,
                          "/",
                          R.maxPlayers
                        ]
                      }),
                      i.jsx("span", {
                        className: `custom-room-status ${R.status}`,
                        children: $g(R.status)
                      }),
                      i.jsxs("button", {
                        className: "secondary",
                        type: "button",
                        disabled: R.status !== "open" || R.players.length >= R.maxPlayers || U || r.gameStatus === "loading",
                        onClick: () => void w(R.id),
                        children: [
                          i.jsx(om, {
                            size: 16
                          }),
                          " ",
                          r.gameStatus === "loading" ? "Launching\u2026" : "Join"
                        ]
                      })
                    ]
                  }, R.id);
                }),
                !j && !u.length && i.jsx("div", {
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
  function rc({ label: r, items: c, value: f, onChange: u }) {
    var _a2;
    const m = [
      ...c.filter((h) => h.enabled && !h.builtIn),
      ...c.filter((h) => !h.enabled && !h.builtIn),
      ...c.filter((h) => h.builtIn)
    ];
    return i.jsxs("div", {
      children: [
        i.jsx(Na, {
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
  function Kg({ room: r, currentPlayerId: c, notify: f }) {
    var _a2, _b, _c;
    const [u, m] = T.useState(""), h = T.useRef(/* @__PURE__ */ new Set()), x = T.useRef(false), j = r.players.find((p) => p.id === c), k = r.hostId === c, y = T.useMemo(() => Array.from({
      length: r.maxPlayers
    }, (p, F) => r.players.find((V) => V.slot === F + 1)), [
      r
    ]), C = (p) => void p.catch((F) => f("Lobby update failed.", "danger", {
      detail: Ot(F)
    }));
    T.useEffect(() => () => {
      var _a3, _b2;
      (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), (_b2 = window.electronApi) == null ? void 0 : _b2.stopReplayEndDetection();
    }, [
      r.id
    ]), T.useEffect(() => {
      if (r.status === "open") {
        h.current.clear();
        return;
      }
      if (r.status !== "launching" || !window.electronApi) return;
      const p = r.map, F = `${r.id}:host-setup`;
      if (k && !r.platformLobbyId && !h.current.has(F)) {
        h.current.add(F), (async () => {
          try {
            if (!p) throw new Error("Choose a map or scenario before starting.");
            await D();
            const z = await window.electronApi.runAoe2CreateLobbySequence(p.gameName, r.maxPlayers, p.kind === "scenario" ? "scenario" : "map", {
              context: "custom",
              gameSettings: r.gameSettings
            });
            if (!z.sent || !z.lobbyUri) throw new Error(z.message || "AoE2 lobby creation failed.");
            await Pe.publish(r.id, z.lobbyUri);
          } catch (z) {
            await Pe.failStart(r.id, Ot(z)), h.current.delete(F);
          }
        })();
        return;
      }
      const V = `${r.id}:guest-join`;
      if (!k && r.platformLobbyId && !j.aoeJoined && !h.current.has(V)) {
        h.current.add(V), (async () => {
          try {
            if (!(await window.electronApi.openAoe2Lobby(r.platformLobbyId)).opened) throw new Error("AoE2 did not open the custom lobby.");
            (p == null ? void 0 : p.kind) !== "scenario" && await Q(j), await Pe.reportJoined(r.id);
          } catch (z) {
            f("Could not join the AoE2 lobby.", "danger", {
              detail: Ot(z),
              durationMs: null
            }), h.current.delete(V);
          }
        })();
        return;
      }
      const ee = r.players.find((z) => z.host), oe = `${r.id}:guest-ready`;
      if (!k && j.aoeJoined && (ee == null ? void 0 : ee.aoeReady) && !j.aoeReady && !h.current.has(oe)) {
        h.current.add(oe), (async () => {
          try {
            const z = Date.now() + Ye.customMapTransferTimeoutMs;
            let L = false, U;
            do
              await new Promise((J) => window.setTimeout(J, Ye.customMapTransferPollMs)), U = await window.electronApi.runAoe2LobbyCursorAction("guest-ready", "custom"), !U.sent && !L && (L = true, await window.electronApi.runAoe2LobbyCursorAction("content-confirm", "custom"));
            while (!U.sent && Date.now() < z);
            if (!U.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
            await Pe.reportAoeReady(r.id);
          } catch (z) {
            f("Could not ready in the AoE2 lobby.", "danger", {
              detail: Ot(z),
              durationMs: null
            }), h.current.delete(oe);
          }
        })();
        return;
      }
      const le = r.players.filter((z) => !z.host).every((z) => z.aoeJoined), he = `${r.id}:host-ready`;
      if (k && r.platformLobbyId && le && !j.aoeReady && !h.current.has(he)) {
        h.current.add(he), (async () => {
          try {
            (p == null ? void 0 : p.kind) !== "scenario" && await Q(j);
            const z = await window.electronApi.runAoe2LobbyCursorAction("host-ready", "custom");
            if (!z.sent) throw new Error(z.message || "AoE2 could not ready the host.");
            await Pe.reportAoeReady(r.id);
          } catch (z) {
            await Pe.failStart(r.id, Ot(z)), h.current.delete(he);
          }
        })();
        return;
      }
      const K = r.players.every((z) => z.aoeReady), ne = `${r.id}:aoe-start`;
      k && K && !h.current.has(ne) && (h.current.add(ne), (async () => {
        try {
          const z = await window.electronApi.runAoe2LobbyCursorAction("start", "custom");
          if (!z.sent) throw new Error(z.message || "AoE2 could not start the game.");
          await Pe.completeStart(r.id, new Date(Date.now() - Ye.startGameSettleMs).toISOString());
        } catch (z) {
          await Pe.failStart(r.id, Ot(z)), h.current.delete(ne);
        }
      })());
    }, [
      r,
      k,
      j,
      f
    ]), T.useEffect(() => {
      if (r.status !== "started" || !window.electronApi) return;
      const p = `${r.id}:reveal-game`;
      if (h.current.has(p)) return;
      h.current.add(p), window.electronApi.startReplayEndDetection().then((V) => {
        V.started || f("Post-game return detection could not be started.", "danger", {
          detail: V.message || "Replay detection could not be started."
        });
      }).catch((V) => {
        f("Post-game return detection could not be started.", "danger", {
          detail: Ot(V)
        });
      });
      const F = window.setTimeout(() => {
        (async () => {
          try {
            await mc(), await window.electronApi.focusAoe2();
          } catch (V) {
            f("Post-game return detection could not be started.", "danger", {
              detail: Ot(V)
            });
          } finally {
            await window.electronApi.setLobbyInputLock(false);
          }
        })();
      }, Ye.revealAfterStartMs);
      return () => window.clearTimeout(F);
    }, [
      r.id,
      r.status
    ]), T.useEffect(() => {
      if (!(r.status !== "started" || !window.electronApi)) return window.electronApi.onReplayEnded((p) => {
        x.current || (x.current = true, v0(p).then(async (F) => {
          if (!F) {
            x.current = false;
            return;
          }
          await window.electronApi.confirmReplayEnded(), await Pe.finish(r.id);
        }).catch((F) => {
          x.current = false, f("The finished custom game could not be detected.", "danger", {
            detail: Ot(F)
          });
        }));
      });
    }, [
      r.id,
      r.status,
      f
    ]);
    async function D() {
      if ((await window.electronApi.detectAoe2Process()).running) return;
      const F = await window.electronApi.launchAoe2();
      if (!F.launched) throw new Error(F.message || "AoE2 could not be launched.");
      const V = Date.now() + 45e3;
      for (; Date.now() < V; ) if (await new Promise((ee) => window.setTimeout(ee, 1e3)), (await window.electronApi.detectAoe2Process()).windowReady) return;
      throw new Error("AoE2 did not become ready in time.");
    }
    async function Q(p) {
      const F = await window.electronApi.selectAoe2Civilization(p.civilization, p.slot, "custom");
      if (!F.sent) throw new Error(F.message);
      if (p.team === 1 || p.team === 2) {
        const V = await window.electronApi.selectAoe2Team(p.team, p.slot, "custom");
        if (!V.sent) throw new Error(V.message);
      }
    }
    function q(p) {
      p.preventDefault(), u.trim() && (C(Pe.sendMessage(r.id, u.trim())), m(""));
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
              onClick: () => C(Pe.leave(r.id)),
              children: [
                i.jsx(En, {
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
                y.map((p, F) => {
                  var _a3;
                  return i.jsxs("div", {
                    className: p ? "lobby-player-row occupied" : "lobby-player-row",
                    children: [
                      i.jsxs("div", {
                        className: "lobby-player-name",
                        children: [
                          i.jsx("span", {
                            className: "lobby-slot-number",
                            children: F + 1
                          }),
                          p ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsx(dm, {
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
                                onClick: () => C(Pe.kick(r.id, p.id)),
                                children: i.jsx(En, {
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
                            onClick: () => C(Pe.updatePlayer(r.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(pi, {
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
                          i.jsx(Na, {
                            className: "lobby-inline-select",
                            label: "Team",
                            value: String(p.team),
                            onChange: (V) => C(Pe.updatePlayer(r.id, {
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
                          i.jsx(Na, {
                            className: "lobby-inline-select",
                            label: "Civilization",
                            value: p.civilization,
                            onChange: (V) => C(Pe.updatePlayer(r.id, {
                              civilization: V
                            })),
                            options: [
                              "Random",
                              ...Ul
                            ].map((V) => ({
                              value: V,
                              label: V
                            }))
                          }),
                          i.jsxs("button", {
                            className: p.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => C(Pe.updatePlayer(r.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(pi, {
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
                  }, F);
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
                      children: i.jsx(wc, {
                        size: 17
                      })
                    })
                  ]
                })
              ]
            })
          ]
        }),
        i.jsx(Fg, {
          settings: r.gameSettings ?? hm,
          editable: k && r.status === "open",
          onChange: (p, F) => C(Pe.updateSettings(r.id, {
            [p]: F
          }))
        }),
        i.jsxs("div", {
          className: `custom-lobby-actions${r.status !== "open" ? " launching" : ""}`,
          children: [
            i.jsx("span", {
              children: r.status === "started" ? i.jsx(Wg, {
                startedAt: r.gameStartedAt
              }) : r.status === "launching" ? i.jsxs(i.Fragment, {
                children: [
                  "Creating and synchronizing the AoE2 lobby",
                  i.jsx(yc, {})
                ]
              }) : r.automationError ? r.automationError : r.players.every((p) => p.ready) ? "All players are ready." : "Waiting for players to ready up."
            }),
            k && i.jsx("button", {
              className: "primary large",
              disabled: r.status !== "open" || !r.map || !r.players.every((p) => p.ready),
              onClick: () => C(Pe.start(r.id)),
              children: r.status !== "open" ? i.jsxs(i.Fragment, {
                children: [
                  "Starting",
                  i.jsx(yc, {})
                ]
              }) : "Start Game"
            })
          ]
        })
      ]
    });
  }
  const Jg = [
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
  function Fg({ settings: r, editable: c, onChange: f }) {
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
            Jg.map(([u, m]) => i.jsxs("label", {
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
  function Ot(r) {
    return r instanceof Error ? r.message : "An unexpected error occurred.";
  }
  function $g(r) {
    return r === "open" ? "Open" : r === "launching" ? "Starting" : "In Game";
  }
  function yc() {
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
  function Wg({ startedAt: r }) {
    const [c, f] = T.useState(() => em(r));
    return T.useEffect(() => {
      const u = () => f(em(r));
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
        i.jsx(yc, {})
      ]
    });
  }
  function em(r) {
    if (!r) return 5;
    const c = Math.max(0, Date.now() - new Date(r).getTime());
    return Math.max(0, Math.ceil((5e3 - c) / 1e3));
  }
  function Pg() {
    const { state: r, openPlayerProfile: c } = bt(), [f, u] = T.useState(""), [m, h] = T.useState("all"), x = T.useMemo(() => r.recentMatches.filter((j) => {
      const k = `${j.opponent} ${j.map} ${j.civilization} ${j.opponentCivilization}`.toLowerCase().includes(f.toLowerCase()), y = m === "all" || j.outcome === m;
      return k && y;
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
                  onChange: (j) => u(j.target.value),
                  placeholder: "Opponent, map, civilization"
                })
              ]
            }),
            i.jsx(Na, {
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
              x.map((j) => i.jsxs("div", {
                className: "table-row clickable",
                children: [
                  i.jsx("strong", {
                    className: j.outcome,
                    children: j.outcome
                  }),
                  i.jsxs("button", {
                    className: "player-link",
                    type: "button",
                    onClick: () => c(j.opponentId),
                    children: [
                      j.opponent,
                      " (",
                      j.opponentRating,
                      ")"
                    ]
                  }),
                  i.jsx("span", {
                    children: j.map
                  }),
                  i.jsx("span", {
                    children: j.civilization && j.opponentCivilization ? `${j.civilization} vs. ${j.opponentCivilization}` : "Unknown civilizations"
                  }),
                  i.jsxs("span", {
                    className: j.ratingChange >= 0 ? "win" : "loss",
                    children: [
                      j.ratingChange > 0 ? "+" : "",
                      j.ratingChange
                    ]
                  }),
                  i.jsxs("span", {
                    children: [
                      j.durationMinutes,
                      "m"
                    ]
                  }),
                  i.jsx("span", {
                    children: new Date(j.timestamp).toLocaleDateString()
                  }),
                  i.jsx("span", {
                    children: j.verified ? "Verified" : "Pending"
                  })
                ]
              }, j.id)),
              x.length === 0 && i.jsx("div", {
                className: "empty-state",
                children: r.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."
              })
            ]
          })
        })
      ]
    });
  }
  const ey = {
    async list(r = 1, c = "all", f = "solo") {
      if (ye) {
        const m = [
          ...Sc
        ].filter((k) => f === "solo" || k.teamRating > 0).sort((k, y) => f === "team" ? y.teamRating - k.teamRating : y.rating - k.rating).map((k, y) => {
          const C = f === "team" ? k.teamRating : k.rating, D = f === "team" ? k.legacyTeamWins : k.wins, Q = f === "team" ? k.legacyTeamLosses : k.losses;
          return {
            ...k,
            rating: C,
            rank: y + 1,
            division: Nn(C),
            wins: D,
            losses: Q,
            winRate: D + Q ? Number((D / (D + Q) * 100).toFixed(1)) : 0
          };
        }), h = c === "all" ? m : m.filter((k) => k.division === c), x = 100, j = (r - 1) * x;
        return {
          players: h.slice(j, j + x),
          page: r,
          pageSize: x,
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
      return Me.request(`/leaderboard?${u}`);
    }
  };
  function ty() {
    const { state: r, openPlayerProfile: c } = bt(), [f, u] = T.useState(""), [m, h] = T.useState("all"), [x, j] = T.useState("solo"), [k, y] = T.useState([]), [C, D] = T.useState(1), [Q, q] = T.useState(0), [p, F] = T.useState(true), [V, ee] = T.useState(null);
    T.useEffect(() => {
      let L = false;
      return F(true), ee(null), ey.list(C, m, x).then((U) => {
        L || (y(U.players), q(U.total));
      }).catch((U) => {
        L || ee(U instanceof Error ? U.message : "Leaderboard could not be loaded.");
      }).finally(() => {
        L || F(false);
      }), () => {
        L = true;
      };
    }, [
      m,
      x,
      C
    ]);
    const oe = T.useMemo(() => k.filter((L) => L.displayName.toLowerCase().includes(f.toLowerCase())), [
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
    ], he = Math.max(1, Math.ceil(Q / 100)), K = Q === 0 ? 0 : (C - 1) * 100 + 1, ne = Math.min(C * 100, Q), z = i.jsx(ay, {
      page: C,
      totalPages: he,
      firstRank: K,
      lastRank: ne,
      total: Q,
      loading: p,
      onPageChange: D
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
                  "aria-pressed": x === "solo",
                  onClick: () => {
                    j("solo"), D(1);
                  },
                  children: "1v1"
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-pressed": x === "team",
                  onClick: () => {
                    j("team"), D(1);
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
            i.jsx(Na, {
              className: "division-field",
              label: "Division",
              options: le,
              value: m,
              onChange: (L) => {
                D(1), h(L);
              }
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("div", {
              className: "leaderboard-pagination-top",
              children: z
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
                oe.map((L) => i.jsxs("div", {
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
                      children: hi(L.rating)
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
                !p && !V && oe.length === 0 && i.jsx("div", {
                  className: "empty-state",
                  children: "No leaderboard results."
                })
              ]
            }),
            i.jsx("div", {
              className: "leaderboard-pagination-bottom",
              children: z
            })
          ]
        })
      ]
    });
  }
  function ay({ page: r, totalPages: c, firstRank: f, lastRank: u, total: m, loading: h, onPageChange: x }) {
    const j = c <= 7 ? Array.from({
      length: c
    }, (k, y) => y + 1) : r <= 4 ? [
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
          onClick: () => x(r - 1),
          children: "Previous"
        }),
        i.jsx("div", {
          className: "leaderboard-page-numbers",
          children: j.map((k, y) => k === "ellipsis" ? i.jsx("span", {
            className: "leaderboard-page-ellipsis",
            "aria-hidden": "true",
            children: "\u2026"
          }, `ellipsis-${y}`) : i.jsx("button", {
            className: "leaderboard-page-number",
            type: "button",
            "aria-current": k === r ? "page" : void 0,
            disabled: h,
            onClick: () => x(k),
            children: k
          }, k))
        }),
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: h || r >= c,
          onClick: () => x(r + 1),
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
      return ye ? {
        player: Sc.find((c) => c.id === r) ?? Ia,
        matches: Cc
      } : Me.request(`/players/${encodeURIComponent(r)}`);
    }
  };
  function iy(r, c) {
    const f = r.filter((h) => h.queueType !== "team-games").sort((h, x) => new Date(h.timestamp).getTime() - new Date(x.timestamp).getTime());
    if (f.length === 0) return [];
    let u = c - f.reduce((h, x) => h + x.ratingChange, 0);
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
    const [u, m] = T.useState(null), h = iy(r, c);
    if (h.length === 0) return i.jsxs("div", {
      className: "empty-state",
      children: [
        f,
        " Elo progress will appear after the first 1v1 match."
      ]
    });
    const x = 800, j = 260, k = {
      top: 22,
      right: 22,
      bottom: 42,
      left: 58
    }, y = h.map((te) => te.rating), C = Math.min(...y), D = Math.max(...y), Q = Math.floor((C - 20) / 25) * 25, q = Math.ceil((D + 20) / 25) * 25, p = Math.max(q - Q, 1), F = x - k.left - k.right, V = j - k.top - k.bottom, ee = h.map((te, we) => ({
      ...te,
      x: k.left + we / Math.max(h.length - 1, 1) * F,
      y: k.top + (q - te.rating) / p * V
    })), oe = ee.map((te) => `${te.x},${te.y}`).join(" "), le = `${k.left},${k.top + V} ${oe} ${k.left + F},${k.top + V}`, he = Array.from({
      length: 5
    }, (te, we) => {
      const ze = we / 4;
      return {
        y: k.top + ze * V,
        rating: Math.round(q - ze * p)
      };
    }), K = h.at(-1).rating - h[0].rating, ne = ee.find((te) => te.id === u), z = 126, L = 44, U = ne ? Math.min(Math.max(ne.x - z / 2, k.left), x - k.right - z) : 0, J = ne ? ne.y - L - 12 < 4 ? ne.y + 12 : ne.y - L - 12 : 0;
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
              className: K >= 0 ? "win" : "loss",
              children: [
                K > 0 ? "+" : "",
                K,
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
            viewBox: `0 0 ${x} ${j}`,
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
              he.map((te) => i.jsxs("g", {
                children: [
                  i.jsx("line", {
                    className: "rating-chart-grid",
                    x1: k.left,
                    x2: x - k.right,
                    y1: te.y,
                    y2: te.y
                  }),
                  i.jsx("text", {
                    className: "rating-chart-axis",
                    x: k.left - 10,
                    y: te.y + 4,
                    textAnchor: "end",
                    children: te.rating
                  })
                ]
              }, te.y)),
              i.jsx("polygon", {
                className: "rating-chart-area",
                points: le
              }),
              i.jsx("polyline", {
                className: "rating-chart-line",
                points: oe
              }),
              ee.map((te) => i.jsxs("g", {
                className: "rating-chart-point-target",
                onPointerEnter: () => m(te.id),
                onPointerLeave: () => m(null),
                children: [
                  i.jsx("circle", {
                    className: "rating-chart-hit-area",
                    cx: te.x,
                    cy: te.y,
                    r: "13"
                  }),
                  i.jsx("circle", {
                    className: "rating-chart-point",
                    cx: te.x,
                    cy: te.y,
                    r: u === te.id ? 6 : 4
                  })
                ]
              }, te.id)),
              ne && i.jsxs("g", {
                className: "rating-chart-tooltip",
                transform: `translate(${U} ${J})`,
                children: [
                  i.jsx("rect", {
                    width: z,
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
                y: j - 13,
                children: (_a2 = h[1]) == null ? void 0 : _a2.label
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: x - k.right,
                y: j - 13,
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
    const { state: u, selectedProfileId: m } = bt(), h = !m || m === u.currentUser.id, [x, j] = T.useState(null), [k, y] = T.useState(null), [C, D] = T.useState(false), [Q, q] = T.useState(false);
    if (T.useEffect(() => {
      if (q(false), h) {
        j(null), y(null);
        return;
      }
      let he = false;
      return j(null), y(null), sy.getProfile(m).then((K) => {
        he || j(K);
      }).catch((K) => {
        he || y(K instanceof Error ? K.message : "Player profile could not be loaded.");
      }), () => {
        he = true;
      };
    }, [
      m,
      h
    ]), !h && !x) return i.jsx("div", {
      className: "panel empty-state",
      children: k ?? "Loading player profile\u2026"
    });
    const p = h ? u.currentUser : x.player, F = h ? u.recentMatches : x.matches, V = F.slice(0, 5).map((he) => he.outcome), ee = r.includes(p.id), oe = Q || c.includes(p.id);
    async function le() {
      D(true);
      try {
        await f(p.displayName), q(true);
      } finally {
        D(false);
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
            i.jsx("h2", {
              children: p.displayName
            }),
            i.jsx("span", {
              children: p.steamId ? `Steam ID ${p.steamId}` : "Steam account"
            }),
            V.length > 0 && i.jsx(am, {
              form: V
            }),
            !h && !ee && i.jsx("button", {
              className: "primary profile-friend-button",
              type: "button",
              disabled: C || oe,
              onClick: () => void le(),
              children: oe ? "Friend request sent" : C ? "Sending\u2026" : "Add friend"
            }),
            !h && ee && i.jsx("span", {
              className: "profile-friend-status",
              children: "Friends"
            })
          ]
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(ia, {
              label: "1v1 RM Rating",
              value: p.rating,
              detail: `${p.legacy1v1Wins}-${p.legacy1v1Losses} legacy record`
            }),
            i.jsx(ia, {
              label: "1v1 RM Peak",
              value: p.peakRating
            }),
            i.jsx(ia, {
              label: "Team RM Rating",
              value: p.teamRating,
              detail: `${p.legacyTeamWins}-${p.legacyTeamLosses} legacy record`
            }),
            i.jsx(ia, {
              label: "Team RM Peak",
              value: p.teamPeakRating
            }),
            i.jsx(ia, {
              label: "Global Rank",
              value: `#${p.rank.toLocaleString()}`
            }),
            i.jsx(ia, {
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
              matches: F,
              currentRating: p.rating,
              possessive: h ? "Your" : `${p.displayName}'s`
            })
          ]
        })
      ]
    });
  }
  function oy() {
    const { state: r, updateSettings: c, signOut: f } = bt(), u = r.settings;
    return i.jsxs("section", {
      className: "settings-grid",
      children: [
        i.jsx(oc, {
          title: "Game",
          children: i.jsx(cc, {
            label: "Launch AoE2 when Empire League starts",
            checked: u.launchAoe2OnStartup,
            onChange: (m) => c({
              launchAoe2OnStartup: m
            })
          })
        }),
        i.jsxs(oc, {
          title: "Matchmaking",
          children: [
            i.jsxs("label", {
              children: [
                "Preferred server region",
                i.jsx("input", {
                  value: u.serverRegion,
                  onChange: (m) => c({
                    serverRegion: m.target.value
                  })
                })
              ]
            }),
            i.jsx(cc, {
              label: "Match-found notifications",
              helpText: "Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way.",
              checked: u.matchNotifications,
              onChange: (m) => c({
                matchNotifications: m
              })
            }),
            i.jsx(cc, {
              label: "Automatically reject Family Share accounts",
              helpText: "Family Share accounts have a higher likelihood of being smurfs.",
              checked: u.autoRejectFamilySharing,
              onChange: (m) => c({
                autoRejectFamilySharing: m
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
                i.jsx(Na, {
                  label: "",
                  value: String(u.maximumLowerOpponentRatingGap),
                  onChange: (m) => c({
                    maximumLowerOpponentRatingGap: Number(m)
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
                    ].map((m) => ({
                      value: String(m),
                      label: `${m} Elo`
                    }))
                  ]
                })
              ]
            })
          ]
        }),
        i.jsxs(oc, {
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
  function oc({ title: r, children: c }) {
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
  function cc({ label: r, helpText: c, checked: f, onChange: u }) {
    const m = T.useId();
    return i.jsxs("div", {
      className: "toggle-row",
      children: [
        i.jsxs("span", {
          className: "setting-label",
          children: [
            i.jsx("label", {
              htmlFor: m,
              children: r
            }),
            c && i.jsx(Nm, {
              text: c
            })
          ]
        }),
        i.jsx("input", {
          id: m,
          type: "checkbox",
          checked: f,
          onChange: (h) => u(h.target.checked)
        })
      ]
    });
  }
  function Nm({ text: r }) {
    const [c, f] = T.useState(false), u = T.useId();
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
  function cy({ friends: r, requests: c, onMessage: f, onAccept: u, onDecline: m, onInvite: h, onUnfriend: x }) {
    const [j, k] = T.useState(""), [y, C] = T.useState(""), [D, Q] = T.useState(null), [q, p] = T.useState(null), [F, V] = T.useState(false), [ee, oe] = T.useState(null), [le, he] = T.useState("all"), K = T.useMemo(() => r.filter((U) => {
      const J = U.name.toLowerCase().includes(j.trim().toLowerCase()), te = le === "all" || le === "online" && U.presence !== "offline" || U.presence === "in_game";
      return J && te;
    }), [
      le,
      r,
      j
    ]);
    async function ne(U) {
      U.preventDefault();
      const J = y.trim();
      if (J) {
        V(true), p(null), Q(null);
        try {
          const te = await h(J);
          Q(te), C("");
        } catch (te) {
          p(te instanceof Error ? te.message : "The invite could not be sent.");
        } finally {
          V(false);
        }
      }
    }
    const z = r.filter((U) => U.presence !== "offline").length, L = r.filter((U) => U.presence === "in_game").length;
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
                    i.jsx(ys, {
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
                          children: z
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
                    i.jsx(dc, {
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
                        i.jsx(_l, {
                          size: 17
                        }),
                        i.jsx("input", {
                          "aria-label": "Search friends",
                          value: j,
                          onChange: (U) => k(U.target.value),
                          placeholder: "Search friends"
                        })
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "friend-list",
                  children: [
                    K.map((U) => i.jsxs("article", {
                      className: `friend-row ${U.presence === "offline" ? "offline" : ""}`,
                      children: [
                        i.jsxs("div", {
                          className: "social-avatar",
                          children: [
                            U.avatarUrl ? i.jsx("img", {
                              src: U.avatarUrl,
                              alt: ""
                            }) : U.initials,
                            i.jsx("span", {
                              className: `presence-dot ${U.presence}`,
                              title: Em(U.presence)
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "friend-identity",
                          children: [
                            i.jsx("strong", {
                              children: U.name
                            }),
                            i.jsxs("span", {
                              children: [
                                U.rating,
                                " Elo",
                                U.mutualFriends ? ` \xB7 ${U.mutualFriends} mutual` : ""
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: `friend-activity ${U.presence}`,
                          children: [
                            U.presence === "in_game" && i.jsx(dc, {
                              size: 15
                            }),
                            U.presence === "idle" && i.jsx(lm, {
                              size: 15
                            }),
                            i.jsxs("span", {
                              children: [
                                U.activity,
                                U.lastSeen ? ` \xB7 ${U.lastSeen}` : ""
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
                              onClick: () => f(U),
                              children: [
                                i.jsx(cm, {
                                  size: 16
                                }),
                                " Message",
                                !!U.unread && i.jsx("span", {
                                  className: "unread-badge",
                                  children: U.unread
                                })
                              ]
                            }),
                            i.jsx("button", {
                              className: "secondary unfriend-button",
                              type: "button",
                              "aria-label": `Unfriend ${U.name}`,
                              title: `Unfriend ${U.name}`,
                              onClick: () => oe(U),
                              children: i.jsx(nc, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, U.id)),
                    K.length === 0 && i.jsx("div", {
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
                      value: y,
                      onChange: (U) => {
                        C(U.target.value), Q(null), p(null);
                      },
                      placeholder: "Player name",
                      "aria-label": "Player name"
                    }),
                    i.jsxs("button", {
                      className: "primary",
                      type: "submit",
                      disabled: !y.trim() || F,
                      children: [
                        i.jsx(wc, {
                          size: 16
                        }),
                        " ",
                        F ? "Checking player\u2026" : "Send invite"
                      ]
                    })
                  ]
                }),
                D && i.jsxs("span", {
                  className: "invite-confirmation",
                  children: [
                    i.jsx(pi, {
                      size: 14
                    }),
                    " Invite sent to ",
                    D
                  ]
                }),
                q && i.jsxs("span", {
                  className: "invite-error",
                  role: "alert",
                  children: [
                    i.jsx(En, {
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
                    c.map((U) => i.jsxs("article", {
                      className: "request-row",
                      children: [
                        i.jsx("div", {
                          className: "social-avatar compact",
                          children: U.avatarUrl ? i.jsx("img", {
                            src: U.avatarUrl,
                            alt: ""
                          }) : U.initials
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("strong", {
                              children: U.name
                            }),
                            i.jsxs("span", {
                              children: [
                                U.rating,
                                " Elo \xB7 ",
                                U.mutualFriends,
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
                              "aria-label": `Accept ${U.name}`,
                              title: "Accept",
                              onClick: () => u(U),
                              children: i.jsx(pi, {
                                size: 16
                              })
                            }),
                            i.jsx("button", {
                              type: "button",
                              "aria-label": `Decline ${U.name}`,
                              title: "Decline",
                              onClick: () => m(U.id),
                              children: i.jsx(En, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, U.id)),
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
        ee && i.jsx("div", {
          className: "modal-backdrop social-confirm-backdrop",
          role: "presentation",
          onPointerDown: () => oe(null),
          children: i.jsxs("section", {
            className: "social-confirm-modal",
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "unfriend-title",
            onPointerDown: (U) => U.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "social-confirm-icon",
                children: i.jsx(nc, {
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
                      ee.name,
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
                    onClick: () => oe(null),
                    children: "Cancel"
                  }),
                  i.jsxs("button", {
                    className: "social-confirm-remove",
                    type: "button",
                    onClick: () => {
                      x(ee), oe(null);
                    },
                    children: [
                      i.jsx(nc, {
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
  function Em(r) {
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
          i.jsx(cm, {
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
    const [h, x] = T.useState(""), j = T.useRef(null);
    T.useEffect(() => {
      var _a2;
      return (_a2 = j.current) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth"
      });
    }, [
      r.messages
    ]);
    function k(y) {
      y.preventDefault(), h.trim() && (u(r.friend.id, h.trim()), x(""));
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
                      children: Em(r.friend.presence)
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
                  children: i.jsx(um, {
                    size: 16
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Close chat",
                  onClick: () => f(r.friend.id),
                  children: i.jsx(En, {
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
            r.messages.map((y) => i.jsxs("div", {
              className: `chat-message ${y.from}`,
              children: [
                i.jsx("span", {
                  children: y.text
                }),
                i.jsx("small", {
                  children: y.time
                })
              ]
            }, y.id)),
            i.jsx("div", {
              ref: j
            })
          ]
        }),
        i.jsxs("form", {
          className: "chat-compose",
          onSubmit: k,
          children: [
            i.jsx("input", {
              value: h,
              onChange: (y) => x(y.target.value),
              placeholder: `Message ${r.friend.name}`,
              "aria-label": `Message ${r.friend.name}`
            }),
            i.jsx("button", {
              type: "submit",
              "aria-label": "Send message",
              disabled: !h.trim(),
              children: i.jsx(wc, {
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
      if (ye) return 486;
      const r = await Me.request("/online");
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
  function vc() {
    const { state: r, notify: c } = bt();
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
          children: i.jsx(um, {
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
          children: i.jsx(En, {
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
      icon: i.jsx(gi, {
        size: 18
      })
    },
    {
      page: "weekly",
      label: "Weekly",
      icon: i.jsx(sm, {
        size: 18
      })
    },
    {
      page: "custom",
      label: "Custom",
      icon: i.jsx(dc, {
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
      icon: i.jsx(Np, {
        size: 18
      })
    },
    {
      page: "social",
      label: "Social",
      icon: i.jsx(ys, {
        size: 18
      })
    },
    {
      page: "settings",
      label: "Settings",
      icon: i.jsx(fc, {
        size: 18
      })
    }
  ];
  function gy({ children: r, socialUnreadCount: c = 0 }) {
    const { page: f, setPage: u, state: m, signOut: h, selectedProfileId: x, openPlayerProfile: j, returnFromPlayerProfile: k } = bt(), y = f === "profile" && x !== null && x !== m.currentUser.id, C = `${m.currentUser.wins}-${m.currentUser.losses}`, [D, Q] = T.useState(null);
    return T.useEffect(() => {
      if (ye) return;
      let q = false;
      const p = () => {
        my.getOnlinePlayerCount().then((V) => {
          q || Q(V);
        }).catch(() => {
          q || Q(null);
        });
      };
      p();
      const F = window.setInterval(p, 3e4);
      return () => {
        q = true, window.clearInterval(F);
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
        i.jsx(vc, {}),
        i.jsxs("aside", {
          className: "sidebar",
          children: [
            i.jsx("nav", {
              className: "nav-list",
              "aria-label": "Primary navigation",
              children: py.map((q) => i.jsxs("button", {
                className: f === q.page ? "nav-item active" : "nav-item",
                type: "button",
                onClick: () => q.page === "profile" ? j(m.currentUser.id) : u(q.page),
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
                D !== null && D >= 300 && i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Online"
                    }),
                    i.jsxs("strong", {
                      children: [
                        D.toLocaleString(),
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
                        C
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
                className: y ? "topbar linked-profile-topbar" : "topbar",
                children: [
                  y && i.jsxs("button", {
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
    const { state: r, acceptMatch: c, declineMatch: f } = bt(), u = r.activeMatch, m = (u == null ? void 0 : u.queue.id) === "ranked-rm-1v1" && u.opponent.steamLicenseStatus === "family_shared", h = T.useRef(m && (u == null ? void 0 : u.acceptDeadline) ? new Date(u.acceptDeadline).getTime() : Date.now() + 1e4), x = T.useRef(false), j = h.current, [k, y] = T.useState(() => Math.max(0, Math.ceil((j - Date.now()) / 1e3))), C = nn.find((D) => {
      var _a2;
      return D.id === ((_a2 = u == null ? void 0 : u.selectedMap) == null ? void 0 : _a2.id);
    }) ?? (u == null ? void 0 : u.selectedMap);
    return T.useEffect(() => {
      const D = () => y(Math.max(0, Math.ceil((j - Date.now()) / 1e3)));
      D();
      const Q = window.setInterval(D, 250);
      return () => window.clearInterval(Q);
    }, [
      j
    ]), T.useEffect(() => {
      if (m) return;
      const D = Math.max(0, j - Date.now()), Q = window.setTimeout(() => {
        x.current || (x.current = true, c());
      }, D);
      return () => window.clearTimeout(Q);
    }, [
      c,
      j,
      m
    ]), T.useEffect(() => {
      function D(Q) {
        Q.key === "Escape" && f();
      }
      return window.addEventListener("keydown", D), () => window.removeEventListener("keydown", D);
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
          C && i.jsxs("figure", {
            className: "match-map-thumbnail",
            children: [
              i.jsx("img", {
                src: C.thumbnailUrl,
                alt: ""
              }),
              i.jsx("strong", {
                className: "match-game-type",
                children: u.queue.format
              }),
              i.jsx("figcaption", {
                children: C.name
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
    warning: jp,
    danger: im,
    loading: rm
  };
  function wy() {
    const { state: r, dismissNotification: c } = bt();
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
    const [f, u] = T.useState(r.durationMs ?? 0), [m, h] = T.useState(false), x = T.useRef(Date.now()), j = by[r.tone];
    T.useEffect(() => {
      if (m || r.durationMs === null) return;
      x.current = Date.now();
      const C = window.setTimeout(c, f);
      return () => window.clearTimeout(C);
    }, [
      c,
      r.durationMs,
      m,
      f
    ]);
    function k() {
      u((C) => Math.max(0, C - (Date.now() - x.current))), h(true);
    }
    const y = {
      "--toast-duration": `${f}ms`,
      "--toast-progress": r.durationMs ? f / r.durationMs : 1
    };
    return i.jsxs("div", {
      className: `toast ${r.tone}`,
      onMouseEnter: k,
      onMouseLeave: () => h(false),
      children: [
        i.jsx(j, {
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
        r.tone !== "loading" && r.dismissible !== false && i.jsx("button", {
          type: "button",
          onClick: c,
          "aria-label": "Dismiss notification",
          children: i.jsx(En, {
            size: 16
          })
        }),
        !m && r.durationMs !== null && i.jsx("i", {
          className: "toast-progress",
          style: y,
          "aria-hidden": "true"
        }, f)
      ]
    });
  }
  const Sy = "" + new URL("el4-loading-Cx8fKbeM.png", import.meta.url).href, $t = {
    async getSnapshot() {
      return ye ? {
        friends: pm,
        requests: gm,
        outgoing: []
      } : (await Me.request("/social")).snapshot;
    },
    async sendFriendRequest(r) {
      return ye ? {
        id: `preview-${r.toLowerCase().replaceAll(" ", "-")}`,
        displayName: r
      } : (await Me.request("/social/requests", {
        method: "POST",
        body: {
          displayName: r
        }
      })).player;
    },
    async acceptRequest(r) {
      ye || await Me.request(`/social/requests/${encodeURIComponent(r)}/accept`, {
        method: "POST"
      });
    },
    async declineRequest(r) {
      ye || await Me.request(`/social/requests/${encodeURIComponent(r)}`, {
        method: "DELETE"
      });
    },
    async removeFriend(r) {
      ye || await Me.request(`/social/friends/${encodeURIComponent(r)}`, {
        method: "DELETE"
      });
    },
    async updatePresence(r, c, f) {
      ye || await Me.request("/social/presence", {
        method: "POST",
        body: {
          presence: r,
          activity: c,
          mapName: f
        }
      });
    },
    async getMessages(r) {
      return ye ? [
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
      ] : (await Me.request(`/social/messages/${encodeURIComponent(r)}`)).messages;
    },
    async sendMessage(r, c) {
      return ye ? {
        id: `preview-message-${Date.now()}`,
        senderId: "user-1",
        recipientId: r,
        text: c,
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      } : (await Me.request("/social/messages", {
        method: "POST",
        body: {
          recipientId: r,
          text: c
        }
      })).message;
    },
    async markMessagesRead(r) {
      ye || await Me.request(`/social/messages/${encodeURIComponent(r)}/read`, {
        method: "POST"
      });
    },
    onEvent(r) {
      return ye ? () => {
      } : Me.onSocialEvent(r);
    }
  };
  function Cy() {
    var _a2, _b, _c;
    const [r, c] = T.useState(false), [f, u] = T.useState(!ye), [m, h] = T.useState(ye ? pm : []), [x, j] = T.useState(ye ? gm : []), [k, y] = T.useState([]), [C, D] = T.useState([]), Q = T.useRef([]);
    T.useEffect(() => {
      var _a3;
      return (_a3 = window.electronApi) == null ? void 0 : _a3.onMouseTestModeChanged(c);
    }, []), T.useEffect(() => {
      const z = window.setTimeout(() => u(false), 3e3);
      return () => window.clearTimeout(z);
    }, []);
    const { page: q, state: p, authStatus: F, authError: V, signInWithSteam: ee } = bt();
    T.useEffect(() => {
      Q.current = C;
    }, [
      C
    ]), T.useEffect(() => {
      const z = () => {
        var _a3;
        return void ((_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert());
      };
      return window.addEventListener("focus", z), () => window.removeEventListener("focus", z);
    }, []);
    async function oe(z) {
      const L = await $t.getMessages(z.id).catch(() => []);
      $t.markMessagesRead(z.id), D((U) => U.find((te) => te.friend.id === z.id) ? U.map((te) => te.friend.id === z.id ? {
        ...te,
        minimized: false
      } : te) : [
        ...U.slice(-2),
        {
          friend: z,
          minimized: false,
          messages: L.map((te) => ({
            id: te.id,
            from: te.senderId === p.currentUser.id ? "me" : "friend",
            text: te.text,
            time: new Date(te.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }))
        }
      ]), h((U) => U.map((J) => J.id === z.id ? {
        ...J,
        unread: 0
      } : J));
    }
    function le(z) {
      var _a3;
      h((L) => L.map((U) => U.id === z ? {
        ...U,
        unread: 0
      } : U)), $t.markMessagesRead(z), (_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert();
    }
    async function he(z) {
      await $t.removeFriend(z.id), D((L) => L.filter((U) => U.friend.id !== z.id));
    }
    async function K(z) {
      await $t.acceptRequest(z.connectionId);
    }
    async function ne(z) {
      const L = z.trim().toLowerCase();
      if (L === p.currentUser.displayName.toLowerCase()) throw new Error("You can\u2019t send a friend invite to yourself.");
      if (m.some((J) => J.name.toLowerCase() === L)) throw new Error(`${z.trim()} is already your friend.`);
      if (x.some((J) => J.name.toLowerCase() === L)) throw new Error(`You already have a pending request from ${z.trim()}.`);
      return (await $t.sendFriendRequest(z)).displayName;
    }
    return T.useEffect(() => {
      if (ye || F !== "authenticated") return;
      const z = (L) => {
        h((U) => L.friends.map((J) => {
          var _a3;
          return {
            ...J,
            initials: tm(J.name),
            unread: J.unread ?? ((_a3 = U.find((te) => te.id === J.id)) == null ? void 0 : _a3.unread) ?? 0
          };
        })), j(L.requests.map((U) => ({
          ...U,
          initials: tm(U.name)
        }))), y(L.outgoing.map((U) => U.id));
      };
      return $t.getSnapshot().then(z), $t.onEvent((L) => {
        var _a3;
        if (L.type === "snapshot" && z(L.snapshot), L.type === "presence" && (h((U) => U.map((J) => J.id === L.playerId ? {
          ...J,
          presence: L.presence,
          activity: L.activity,
          mapName: L.mapName
        } : J)), D((U) => U.map((J) => J.friend.id === L.playerId ? {
          ...J,
          friend: {
            ...J.friend,
            presence: L.presence,
            activity: L.activity,
            mapName: L.mapName
          }
        } : J))), L.type === "message") {
          const U = L.message, J = {
            id: U.id,
            from: "friend",
            text: U.text,
            time: new Date(U.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }, te = Q.current.find((we) => we.friend.id === U.senderId && !we.minimized);
          D((we) => we.some((Ee) => Ee.friend.id === U.senderId) ? we.map((Ee) => Ee.friend.id === U.senderId ? {
            ...Ee,
            messages: [
              ...Ee.messages,
              J
            ]
          } : Ee) : we), te ? $t.markMessagesRead(U.senderId) : (h((we) => we.map((ze) => ze.id === U.senderId ? {
            ...ze,
            unread: (ze.unread ?? 0) + 1
          } : ze)), document.hasFocus() || ((_a3 = window.electronApi) == null ? void 0 : _a3.alertUnreadMessage()));
        }
      });
    }, [
      F,
      p.currentUser.id
    ]), T.useEffect(() => {
      if (ye || F !== "authenticated") return;
      let z = false, L = 0;
      const U = () => {
        var _a3, _b2;
        const ze = p.activeMatch, Ee = p.queueStatus === "in_game" || p.gameStatus === "in_match", at = Ee ? "in_game" : z ? "idle" : "online", w = Ee ? `In game${((_a3 = ze == null ? void 0 : ze.selectedMap) == null ? void 0 : _a3.name) ? ` \xB7 ${ze.selectedMap.name}` : ""}` : p.queueStatus === "searching" ? "Looking for a match" : z ? "Idle" : "Online";
        $t.updatePresence(at, w, Ee ? (_b2 = ze == null ? void 0 : ze.selectedMap) == null ? void 0 : _b2.name : void 0);
      }, J = () => {
        const ze = z;
        z = false, window.clearTimeout(L), L = window.setTimeout(() => {
          z = true, U();
        }, 5 * 6e4), ze && U();
      }, te = [
        "pointerdown",
        "keydown",
        "wheel"
      ];
      te.forEach((ze) => window.addEventListener(ze, J, {
        passive: true
      })), J(), U();
      const we = window.setInterval(U, 3e4);
      return () => {
        te.forEach((ze) => window.removeEventListener(ze, J)), window.clearTimeout(L), window.clearInterval(we);
      };
    }, [
      F,
      p.queueStatus,
      p.gameStatus,
      (_a2 = p.activeMatch) == null ? void 0 : _a2.id,
      (_c = (_b = p.activeMatch) == null ? void 0 : _b.selectedMap) == null ? void 0 : _c.name
    ]), f || F === "loading" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(vc, {}),
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
    }) : F !== "authenticated" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(vc, {}),
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
                disabled: F === "authenticating",
                onClick: () => void ee(),
                children: [
                  i.jsx(om, {
                    size: 20
                  }),
                  F === "authenticating" ? "Waiting for Steam\u2026" : "Sign in through Steam"
                ]
              }),
              F === "authenticating" && i.jsx("span", {
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
          socialUnreadCount: m.reduce((z, L) => z + (L.unread ?? 0), 0),
          children: [
            q === "home" && i.jsx(_0, {}),
            q === "ranked" && i.jsx(Og, {}),
            q === "weekly" && i.jsx(Vg, {}),
            q === "custom" && i.jsx(Zg, {}),
            q === "match-history" && i.jsx(Pg, {}),
            q === "leaderboard" && i.jsx(ty, {}),
            q === "profile" && i.jsx(ry, {
              friendIds: m.map((z) => z.id),
              outgoingRequestIds: k,
              onAddFriend: async (z) => {
                await ne(z);
              }
            }),
            q === "social" && i.jsx(cy, {
              friends: m,
              requests: x,
              onMessage: (z) => void oe(z),
              onAccept: (z) => void K(z),
              onDecline: (z) => {
                var _a3;
                return void $t.declineRequest(((_a3 = x.find((L) => L.id === z)) == null ? void 0 : _a3.connectionId) ?? z);
              },
              onInvite: ne,
              onUnfriend: (z) => void he(z)
            }),
            q === "settings" && i.jsx(oy, {})
          ]
        }),
        p.queueStatus === "match_found" && p.activeMatch && i.jsx(vy, {}),
        i.jsx(wy, {}),
        i.jsx(uy, {
          chats: C,
          onToggle: (z) => D((L) => L.map((U) => U.friend.id === z ? {
            ...U,
            minimized: !U.minimized
          } : U)),
          onClose: (z) => D((L) => L.filter((U) => U.friend.id !== z)),
          onActivate: le,
          onSend: (z, L) => void $t.sendMessage(z, L).then((U) => D((J) => J.map((te) => te.friend.id === z ? {
            ...te,
            messages: [
              ...te.messages,
              {
                id: U.id,
                from: "me",
                text: U.text,
                time: new Date(U.sentAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })
              }
            ]
          } : te)))
        }),
        r && i.jsx(My, {})
      ]
    });
  }
  function tm(r) {
    var _a2;
    const c = r.trim().split(/\s+/);
    return (c.length > 1 ? `${c[0][0]}${(_a2 = c.at(-1)) == null ? void 0 : _a2[0]}` : r.slice(0, 2)).toUpperCase();
  }
  function xy({ locked: r }) {
    const [c, f] = T.useState(null);
    return T.useEffect(() => {
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
    const [r, c] = T.useState(null), [f, u] = T.useState(null);
    return T.useEffect(() => {
      var _a2, _b;
      document.documentElement.classList.add("mouse-test-hud-active"), document.body.classList.add("mouse-test-hud-active");
      const m = (_a2 = window.electronApi) == null ? void 0 : _a2.onMouseTestPointer(c), h = (_b = window.electronApi) == null ? void 0 : _b.onMouseTestCoordinatesCopied((x) => {
        u(x), window.setTimeout(() => u(null), 1600);
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
  np.createRoot(document.getElementById("root")).render(i.jsx(T.StrictMode, {
    children: i.jsx(E0, {
      children: i.jsx(Cy, {})
    })
  }));
})();
