var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(async () => {
  var _a;
  (function() {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload")) return;
    for (const m of document.querySelectorAll('link[rel="modulepreload"]')) r(m);
    new MutationObserver((m) => {
      for (const y of m) if (y.type === "childList") for (const E of y.addedNodes) E.tagName === "LINK" && E.rel === "modulepreload" && r(E);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function f(m) {
      const y = {};
      return m.integrity && (y.integrity = m.integrity), m.referrerPolicy && (y.referrerPolicy = m.referrerPolicy), m.crossOrigin === "use-credentials" ? y.credentials = "include" : m.crossOrigin === "anonymous" ? y.credentials = "omit" : y.credentials = "same-origin", y;
    }
    function r(m) {
      if (m.ep) return;
      m.ep = true;
      const y = f(m);
      fetch(m.href, y);
    }
  })();
  var $u = {
    exports: {}
  }, ui = {};
  var Sm;
  function Kg() {
    if (Sm) return ui;
    Sm = 1;
    var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
    function f(r, m, y) {
      var E = null;
      if (y !== void 0 && (E = "" + y), m.key !== void 0 && (E = "" + m.key), "key" in m) {
        y = {};
        for (var A in m) A !== "key" && (y[A] = m[A]);
      } else y = m;
      return m = y.ref, {
        $$typeof: c,
        type: r,
        key: E,
        ref: m !== void 0 ? m : null,
        props: y
      };
    }
    return ui.Fragment = o, ui.jsx = f, ui.jsxs = f, ui;
  }
  var xm;
  function Jg() {
    return xm || (xm = 1, $u.exports = Kg()), $u.exports;
  }
  var i = Jg(), Iu = {
    exports: {}
  }, ve = {};
  var wm;
  function Fg() {
    if (wm) return ve;
    wm = 1;
    var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), E = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), G = Symbol.for("react.activity"), L = Symbol.iterator;
    function Y(v) {
      return v === null || typeof v != "object" ? null : (v = L && v[L] || v["@@iterator"], typeof v == "function" ? v : null);
    }
    var g = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, W = Object.assign, Z = {};
    function le(v, B, P) {
      this.props = v, this.context = B, this.refs = Z, this.updater = P || g;
    }
    le.prototype.isReactComponent = {}, le.prototype.setState = function(v, B) {
      if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, v, B, "setState");
    }, le.prototype.forceUpdate = function(v) {
      this.updater.enqueueForceUpdate(this, v, "forceUpdate");
    };
    function de() {
    }
    de.prototype = le.prototype;
    function ce(v, B, P) {
      this.props = v, this.context = B, this.refs = Z, this.updater = P || g;
    }
    var se = ce.prototype = new de();
    se.constructor = ce, W(se, le.prototype), se.isPureReactComponent = true;
    var X = Array.isArray;
    function V() {
    }
    var _ = {
      H: null,
      A: null,
      T: null,
      S: null
    }, F = Object.prototype.hasOwnProperty;
    function k(v, B, P) {
      var ie = P.ref;
      return {
        $$typeof: c,
        type: v,
        key: B,
        ref: ie !== void 0 ? ie : null,
        props: P
      };
    }
    function J(v, B) {
      return k(v.type, B, v.props);
    }
    function ae(v) {
      return typeof v == "object" && v !== null && v.$$typeof === c;
    }
    function Ee(v) {
      var B = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + v.replace(/[=:]/g, function(P) {
        return B[P];
      });
    }
    var Me = /\/+/g;
    function je(v, B) {
      return typeof v == "object" && v !== null && v.key != null ? Ee("" + v.key) : B.toString(36);
    }
    function $(v) {
      switch (v.status) {
        case "fulfilled":
          return v.value;
        case "rejected":
          throw v.reason;
        default:
          switch (typeof v.status == "string" ? v.then(V, V) : (v.status = "pending", v.then(function(B) {
            v.status === "pending" && (v.status = "fulfilled", v.value = B);
          }, function(B) {
            v.status === "pending" && (v.status = "rejected", v.reason = B);
          })), v.status) {
            case "fulfilled":
              return v.value;
            case "rejected":
              throw v.reason;
          }
      }
      throw v;
    }
    function j(v, B, P, ie, ye) {
      var be = typeof v;
      (be === "undefined" || be === "boolean") && (v = null);
      var _e = false;
      if (v === null) _e = true;
      else switch (be) {
        case "bigint":
        case "string":
        case "number":
          _e = true;
          break;
        case "object":
          switch (v.$$typeof) {
            case c:
            case o:
              _e = true;
              break;
            case S:
              return _e = v._init, j(_e(v._payload), B, P, ie, ye);
          }
      }
      if (_e) return ye = ye(v), _e = ie === "" ? "." + je(v, 0) : ie, X(ye) ? (P = "", _e != null && (P = _e.replace(Me, "$&/") + "/"), j(ye, B, P, "", function(vt) {
        return vt;
      })) : ye != null && (ae(ye) && (ye = J(ye, P + (ye.key == null || v && v.key === ye.key ? "" : ("" + ye.key).replace(Me, "$&/") + "/") + _e)), B.push(ye)), 1;
      _e = 0;
      var at = ie === "" ? "." : ie + ":";
      if (X(v)) for (var Ke = 0; Ke < v.length; Ke++) ie = v[Ke], be = at + je(ie, Ke), _e += j(ie, B, P, be, ye);
      else if (Ke = Y(v), typeof Ke == "function") for (v = Ke.call(v), Ke = 0; !(ie = v.next()).done; ) ie = ie.value, be = at + je(ie, Ke++), _e += j(ie, B, P, be, ye);
      else if (be === "object") {
        if (typeof v.then == "function") return j($(v), B, P, ie, ye);
        throw B = String(v), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
      }
      return _e;
    }
    function D(v, B, P) {
      if (v == null) return v;
      var ie = [], ye = 0;
      return j(v, ie, "", "", function(be) {
        return B.call(P, be, ye++);
      }), ie;
    }
    function ee(v) {
      if (v._status === -1) {
        var B = v._result;
        B = B(), B.then(function(P) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = P);
        }, function(P) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = P);
        }), v._status === -1 && (v._status = 0, v._result = B);
      }
      if (v._status === 1) return v._result.default;
      throw v._result;
    }
    var he = typeof reportError == "function" ? reportError : function(v) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var B = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
          error: v
        });
        if (!window.dispatchEvent(B)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", v);
        return;
      }
      console.error(v);
    }, Ae = {
      map: D,
      forEach: function(v, B, P) {
        D(v, function() {
          B.apply(this, arguments);
        }, P);
      },
      count: function(v) {
        var B = 0;
        return D(v, function() {
          B++;
        }), B;
      },
      toArray: function(v) {
        return D(v, function(B) {
          return B;
        }) || [];
      },
      only: function(v) {
        if (!ae(v)) throw Error("React.Children.only expected to receive a single React element child.");
        return v;
      }
    };
    return ve.Activity = G, ve.Children = Ae, ve.Component = le, ve.Fragment = f, ve.Profiler = m, ve.PureComponent = ce, ve.StrictMode = r, ve.Suspense = x, ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _, ve.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(v) {
        return _.H.useMemoCache(v);
      }
    }, ve.cache = function(v) {
      return function() {
        return v.apply(null, arguments);
      };
    }, ve.cacheSignal = function() {
      return null;
    }, ve.cloneElement = function(v, B, P) {
      if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
      var ie = W({}, v.props), ye = v.key;
      if (B != null) for (be in B.key !== void 0 && (ye = "" + B.key), B) !F.call(B, be) || be === "key" || be === "__self" || be === "__source" || be === "ref" && B.ref === void 0 || (ie[be] = B[be]);
      var be = arguments.length - 2;
      if (be === 1) ie.children = P;
      else if (1 < be) {
        for (var _e = Array(be), at = 0; at < be; at++) _e[at] = arguments[at + 2];
        ie.children = _e;
      }
      return k(v.type, ye, ie);
    }, ve.createContext = function(v) {
      return v = {
        $$typeof: E,
        _currentValue: v,
        _currentValue2: v,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, v.Provider = v, v.Consumer = {
        $$typeof: y,
        _context: v
      }, v;
    }, ve.createElement = function(v, B, P) {
      var ie, ye = {}, be = null;
      if (B != null) for (ie in B.key !== void 0 && (be = "" + B.key), B) F.call(B, ie) && ie !== "key" && ie !== "__self" && ie !== "__source" && (ye[ie] = B[ie]);
      var _e = arguments.length - 2;
      if (_e === 1) ye.children = P;
      else if (1 < _e) {
        for (var at = Array(_e), Ke = 0; Ke < _e; Ke++) at[Ke] = arguments[Ke + 2];
        ye.children = at;
      }
      if (v && v.defaultProps) for (ie in _e = v.defaultProps, _e) ye[ie] === void 0 && (ye[ie] = _e[ie]);
      return k(v, be, ye);
    }, ve.createRef = function() {
      return {
        current: null
      };
    }, ve.forwardRef = function(v) {
      return {
        $$typeof: A,
        render: v
      };
    }, ve.isValidElement = ae, ve.lazy = function(v) {
      return {
        $$typeof: S,
        _payload: {
          _status: -1,
          _result: v
        },
        _init: ee
      };
    }, ve.memo = function(v, B) {
      return {
        $$typeof: p,
        type: v,
        compare: B === void 0 ? null : B
      };
    }, ve.startTransition = function(v) {
      var B = _.T, P = {};
      _.T = P;
      try {
        var ie = v(), ye = _.S;
        ye !== null && ye(P, ie), typeof ie == "object" && ie !== null && typeof ie.then == "function" && ie.then(V, he);
      } catch (be) {
        he(be);
      } finally {
        B !== null && P.types !== null && (B.types = P.types), _.T = B;
      }
    }, ve.unstable_useCacheRefresh = function() {
      return _.H.useCacheRefresh();
    }, ve.use = function(v) {
      return _.H.use(v);
    }, ve.useActionState = function(v, B, P) {
      return _.H.useActionState(v, B, P);
    }, ve.useCallback = function(v, B) {
      return _.H.useCallback(v, B);
    }, ve.useContext = function(v) {
      return _.H.useContext(v);
    }, ve.useDebugValue = function() {
    }, ve.useDeferredValue = function(v, B) {
      return _.H.useDeferredValue(v, B);
    }, ve.useEffect = function(v, B) {
      return _.H.useEffect(v, B);
    }, ve.useEffectEvent = function(v) {
      return _.H.useEffectEvent(v);
    }, ve.useId = function() {
      return _.H.useId();
    }, ve.useImperativeHandle = function(v, B, P) {
      return _.H.useImperativeHandle(v, B, P);
    }, ve.useInsertionEffect = function(v, B) {
      return _.H.useInsertionEffect(v, B);
    }, ve.useLayoutEffect = function(v, B) {
      return _.H.useLayoutEffect(v, B);
    }, ve.useMemo = function(v, B) {
      return _.H.useMemo(v, B);
    }, ve.useOptimistic = function(v, B) {
      return _.H.useOptimistic(v, B);
    }, ve.useReducer = function(v, B, P) {
      return _.H.useReducer(v, B, P);
    }, ve.useRef = function(v) {
      return _.H.useRef(v);
    }, ve.useState = function(v) {
      return _.H.useState(v);
    }, ve.useSyncExternalStore = function(v, B, P) {
      return _.H.useSyncExternalStore(v, B, P);
    }, ve.useTransition = function() {
      return _.H.useTransition();
    }, ve.version = "19.2.7", ve;
  }
  var Mm;
  function go() {
    return Mm || (Mm = 1, Iu.exports = Fg()), Iu.exports;
  }
  var C = go(), Wu = {
    exports: {}
  }, oi = {}, Pu = {
    exports: {}
  }, eo = {};
  var jm;
  function $g() {
    return jm || (jm = 1, (function(c) {
      function o(j, D) {
        var ee = j.length;
        j.push(D);
        e: for (; 0 < ee; ) {
          var he = ee - 1 >>> 1, Ae = j[he];
          if (0 < m(Ae, D)) j[he] = D, j[ee] = Ae, ee = he;
          else break e;
        }
      }
      function f(j) {
        return j.length === 0 ? null : j[0];
      }
      function r(j) {
        if (j.length === 0) return null;
        var D = j[0], ee = j.pop();
        if (ee !== D) {
          j[0] = ee;
          e: for (var he = 0, Ae = j.length, v = Ae >>> 1; he < v; ) {
            var B = 2 * (he + 1) - 1, P = j[B], ie = B + 1, ye = j[ie];
            if (0 > m(P, ee)) ie < Ae && 0 > m(ye, P) ? (j[he] = ye, j[ie] = ee, he = ie) : (j[he] = P, j[B] = ee, he = B);
            else if (ie < Ae && 0 > m(ye, ee)) j[he] = ye, j[ie] = ee, he = ie;
            else break e;
          }
        }
        return D;
      }
      function m(j, D) {
        var ee = j.sortIndex - D.sortIndex;
        return ee !== 0 ? ee : j.id - D.id;
      }
      if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var y = performance;
        c.unstable_now = function() {
          return y.now();
        };
      } else {
        var E = Date, A = E.now();
        c.unstable_now = function() {
          return E.now() - A;
        };
      }
      var x = [], p = [], S = 1, G = null, L = 3, Y = false, g = false, W = false, Z = false, le = typeof setTimeout == "function" ? setTimeout : null, de = typeof clearTimeout == "function" ? clearTimeout : null, ce = typeof setImmediate < "u" ? setImmediate : null;
      function se(j) {
        for (var D = f(p); D !== null; ) {
          if (D.callback === null) r(p);
          else if (D.startTime <= j) r(p), D.sortIndex = D.expirationTime, o(x, D);
          else break;
          D = f(p);
        }
      }
      function X(j) {
        if (W = false, se(j), !g) if (f(x) !== null) g = true, V || (V = true, Ee());
        else {
          var D = f(p);
          D !== null && $(X, D.startTime - j);
        }
      }
      var V = false, _ = -1, F = 5, k = -1;
      function J() {
        return Z ? true : !(c.unstable_now() - k < F);
      }
      function ae() {
        if (Z = false, V) {
          var j = c.unstable_now();
          k = j;
          var D = true;
          try {
            e: {
              g = false, W && (W = false, de(_), _ = -1), Y = true;
              var ee = L;
              try {
                t: {
                  for (se(j), G = f(x); G !== null && !(G.expirationTime > j && J()); ) {
                    var he = G.callback;
                    if (typeof he == "function") {
                      G.callback = null, L = G.priorityLevel;
                      var Ae = he(G.expirationTime <= j);
                      if (j = c.unstable_now(), typeof Ae == "function") {
                        G.callback = Ae, se(j), D = true;
                        break t;
                      }
                      G === f(x) && r(x), se(j);
                    } else r(x);
                    G = f(x);
                  }
                  if (G !== null) D = true;
                  else {
                    var v = f(p);
                    v !== null && $(X, v.startTime - j), D = false;
                  }
                }
                break e;
              } finally {
                G = null, L = ee, Y = false;
              }
              D = void 0;
            }
          } finally {
            D ? Ee() : V = false;
          }
        }
      }
      var Ee;
      if (typeof ce == "function") Ee = function() {
        ce(ae);
      };
      else if (typeof MessageChannel < "u") {
        var Me = new MessageChannel(), je = Me.port2;
        Me.port1.onmessage = ae, Ee = function() {
          je.postMessage(null);
        };
      } else Ee = function() {
        le(ae, 0);
      };
      function $(j, D) {
        _ = le(function() {
          j(c.unstable_now());
        }, D);
      }
      c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(j) {
        j.callback = null;
      }, c.unstable_forceFrameRate = function(j) {
        0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : F = 0 < j ? Math.floor(1e3 / j) : 5;
      }, c.unstable_getCurrentPriorityLevel = function() {
        return L;
      }, c.unstable_next = function(j) {
        switch (L) {
          case 1:
          case 2:
          case 3:
            var D = 3;
            break;
          default:
            D = L;
        }
        var ee = L;
        L = D;
        try {
          return j();
        } finally {
          L = ee;
        }
      }, c.unstable_requestPaint = function() {
        Z = true;
      }, c.unstable_runWithPriority = function(j, D) {
        switch (j) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            j = 3;
        }
        var ee = L;
        L = j;
        try {
          return D();
        } finally {
          L = ee;
        }
      }, c.unstable_scheduleCallback = function(j, D, ee) {
        var he = c.unstable_now();
        switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? he + ee : he) : ee = he, j) {
          case 1:
            var Ae = -1;
            break;
          case 2:
            Ae = 250;
            break;
          case 5:
            Ae = 1073741823;
            break;
          case 4:
            Ae = 1e4;
            break;
          default:
            Ae = 5e3;
        }
        return Ae = ee + Ae, j = {
          id: S++,
          callback: D,
          priorityLevel: j,
          startTime: ee,
          expirationTime: Ae,
          sortIndex: -1
        }, ee > he ? (j.sortIndex = ee, o(p, j), f(x) === null && j === f(p) && (W ? (de(_), _ = -1) : W = true, $(X, ee - he))) : (j.sortIndex = Ae, o(x, j), g || Y || (g = true, V || (V = true, Ee()))), j;
      }, c.unstable_shouldYield = J, c.unstable_wrapCallback = function(j) {
        var D = L;
        return function() {
          var ee = L;
          L = D;
          try {
            return j.apply(this, arguments);
          } finally {
            L = ee;
          }
        };
      };
    })(eo)), eo;
  }
  var Am;
  function Ig() {
    return Am || (Am = 1, Pu.exports = $g()), Pu.exports;
  }
  var to = {
    exports: {}
  }, yt = {};
  var Em;
  function Wg() {
    if (Em) return yt;
    Em = 1;
    var c = go();
    function o(x) {
      var p = "https://react.dev/errors/" + x;
      if (1 < arguments.length) {
        p += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var S = 2; S < arguments.length; S++) p += "&args[]=" + encodeURIComponent(arguments[S]);
      }
      return "Minified React error #" + x + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function f() {
    }
    var r = {
      d: {
        f,
        r: function() {
          throw Error(o(522));
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
    function y(x, p, S) {
      var G = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: m,
        key: G == null ? null : "" + G,
        children: x,
        containerInfo: p,
        implementation: S
      };
    }
    var E = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function A(x, p) {
      if (x === "font") return "";
      if (typeof p == "string") return p === "use-credentials" ? p : "";
    }
    return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, yt.createPortal = function(x, p) {
      var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11) throw Error(o(299));
      return y(x, p, null, S);
    }, yt.flushSync = function(x) {
      var p = E.T, S = r.p;
      try {
        if (E.T = null, r.p = 2, x) return x();
      } finally {
        E.T = p, r.p = S, r.d.f();
      }
    }, yt.preconnect = function(x, p) {
      typeof x == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(x, p));
    }, yt.prefetchDNS = function(x) {
      typeof x == "string" && r.d.D(x);
    }, yt.preinit = function(x, p) {
      if (typeof x == "string" && p && typeof p.as == "string") {
        var S = p.as, G = A(S, p.crossOrigin), L = typeof p.integrity == "string" ? p.integrity : void 0, Y = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        S === "style" ? r.d.S(x, typeof p.precedence == "string" ? p.precedence : void 0, {
          crossOrigin: G,
          integrity: L,
          fetchPriority: Y
        }) : S === "script" && r.d.X(x, {
          crossOrigin: G,
          integrity: L,
          fetchPriority: Y,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0
        });
      }
    }, yt.preinitModule = function(x, p) {
      if (typeof x == "string") if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var S = A(p.as, p.crossOrigin);
          r.d.M(x, {
            crossOrigin: S,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && r.d.M(x);
    }, yt.preload = function(x, p) {
      if (typeof x == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
        var S = p.as, G = A(S, p.crossOrigin);
        r.d.L(x, S, {
          crossOrigin: G,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0
        });
      }
    }, yt.preloadModule = function(x, p) {
      if (typeof x == "string") if (p) {
        var S = A(p.as, p.crossOrigin);
        r.d.m(x, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: S,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else r.d.m(x);
    }, yt.requestFormReset = function(x) {
      r.d.r(x);
    }, yt.unstable_batchedUpdates = function(x, p) {
      return x(p);
    }, yt.useFormState = function(x, p, S) {
      return E.H.useFormState(x, p, S);
    }, yt.useFormStatus = function() {
      return E.H.useHostTransitionStatus();
    }, yt.version = "19.2.7", yt;
  }
  var Cm;
  function Pg() {
    if (Cm) return to.exports;
    Cm = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
    }
    return c(), to.exports = Wg(), to.exports;
  }
  var Nm;
  function ey() {
    if (Nm) return oi;
    Nm = 1;
    var c = Ig(), o = go(), f = Pg();
    function r(e) {
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
    function y(e) {
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
    function E(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function A(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function x(e) {
      if (y(e) !== e) throw Error(r(188));
    }
    function p(e) {
      var t = e.alternate;
      if (!t) {
        if (t = y(e), t === null) throw Error(r(188));
        return t !== e ? null : e;
      }
      for (var a = e, n = t; ; ) {
        var l = a.return;
        if (l === null) break;
        var s = l.alternate;
        if (s === null) {
          if (n = l.return, n !== null) {
            a = n;
            continue;
          }
          break;
        }
        if (l.child === s.child) {
          for (s = l.child; s; ) {
            if (s === a) return x(l), e;
            if (s === n) return x(l), t;
            s = s.sibling;
          }
          throw Error(r(188));
        }
        if (a.return !== n.return) a = l, n = s;
        else {
          for (var u = false, d = l.child; d; ) {
            if (d === a) {
              u = true, a = l, n = s;
              break;
            }
            if (d === n) {
              u = true, n = l, a = s;
              break;
            }
            d = d.sibling;
          }
          if (!u) {
            for (d = s.child; d; ) {
              if (d === a) {
                u = true, a = s, n = l;
                break;
              }
              if (d === n) {
                u = true, n = s, a = l;
                break;
              }
              d = d.sibling;
            }
            if (!u) throw Error(r(189));
          }
        }
        if (a.alternate !== n) throw Error(r(190));
      }
      if (a.tag !== 3) throw Error(r(188));
      return a.stateNode.current === a ? e : t;
    }
    function S(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = S(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var G = Object.assign, L = Symbol.for("react.element"), Y = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), de = Symbol.for("react.consumer"), ce = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
    function Ee(e) {
      return e === null || typeof e != "object" ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var Me = Symbol.for("react.client.reference");
    function je(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === Me ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case W:
          return "Fragment";
        case le:
          return "Profiler";
        case Z:
          return "StrictMode";
        case X:
          return "Suspense";
        case V:
          return "SuspenseList";
        case k:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case g:
          return "Portal";
        case ce:
          return e.displayName || "Context";
        case de:
          return (e._context.displayName || "Context") + ".Consumer";
        case se:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _:
          return t = e.displayName || null, t !== null ? t : je(e.type) || "Memo";
        case F:
          t = e._payload, e = e._init;
          try {
            return je(e(t));
          } catch {
          }
      }
      return null;
    }
    var $ = Array.isArray, j = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, he = [], Ae = -1;
    function v(e) {
      return {
        current: e
      };
    }
    function B(e) {
      0 > Ae || (e.current = he[Ae], he[Ae] = null, Ae--);
    }
    function P(e, t) {
      Ae++, he[Ae] = e.current, e.current = t;
    }
    var ie = v(null), ye = v(null), be = v(null), _e = v(null);
    function at(e, t) {
      switch (P(be, t), P(ye, e), P(ie, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Qf(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = Qf(t), e = Vf(t, e);
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
      B(ie), P(ie, e);
    }
    function Ke() {
      B(ie), B(ye), B(be);
    }
    function vt(e) {
      e.memoizedState !== null && P(_e, e);
      var t = ie.current, a = Vf(t, e.type);
      t !== a && (P(ye, e), P(ie, a));
    }
    function Ta(e) {
      ye.current === e && (B(ie), B(ye)), _e.current === e && (B(_e), li._currentValue = ee);
    }
    var ua, oa;
    function It(e) {
      if (ua === void 0) try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ua = t && t[1] || "", oa = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + ua + e + oa;
    }
    var cn = false;
    function za(e, t) {
      if (!e || cn) return "";
      cn = true;
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
                  } catch (U) {
                    var z = U;
                  }
                  Reflect.construct(e, [], Q);
                } else {
                  try {
                    Q.call();
                  } catch (U) {
                    z = U;
                  }
                  e.call(Q.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (U) {
                  z = U;
                }
                (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
                });
              }
            } catch (U) {
              if (U && z && typeof U.stack == "string") return [
                U.stack,
                z.stack
              ];
            }
            return [
              null,
              null
            ];
          }
        };
        n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var l = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
        l && l.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
        var s = n.DetermineComponentFrameRoot(), u = s[0], d = s[1];
        if (u && d) {
          var h = u.split(`
`), T = d.split(`
`);
          for (l = n = 0; n < h.length && !h[n].includes("DetermineComponentFrameRoot"); ) n++;
          for (; l < T.length && !T[l].includes("DetermineComponentFrameRoot"); ) l++;
          if (n === h.length || l === T.length) for (n = h.length - 1, l = T.length - 1; 1 <= n && 0 <= l && h[n] !== T[l]; ) l--;
          for (; 1 <= n && 0 <= l; n--, l--) if (h[n] !== T[l]) {
            if (n !== 1 || l !== 1) do
              if (n--, l--, 0 > l || h[n] !== T[l]) {
                var O = `
` + h[n].replace(" at new ", " at ");
                return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), O;
              }
            while (1 <= n && 0 <= l);
            break;
          }
        }
      } finally {
        cn = false, Error.prepareStackTrace = a;
      }
      return (a = e ? e.displayName || e.name : "") ? It(a) : "";
    }
    function q(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return It(e.type);
        case 16:
          return It("Lazy");
        case 13:
          return e.child !== t && t !== null ? It("Suspense Fallback") : It("Suspense");
        case 19:
          return It("SuspenseList");
        case 0:
        case 15:
          return za(e.type, false);
        case 11:
          return za(e.type.render, false);
        case 1:
          return za(e.type, true);
        case 31:
          return It("Activity");
        default:
          return "";
      }
    }
    function fe(e) {
      try {
        var t = "", a = null;
        do
          t += q(e, a), a = e, e = e.return;
        while (e);
        return t;
      } catch (n) {
        return `
Error generating stack: ` + n.message + `
` + n.stack;
      }
    }
    var w = Object.prototype.hasOwnProperty, R = c.unstable_scheduleCallback, K = c.unstable_cancelCallback, ne = c.unstable_shouldYield, I = c.unstable_requestPaint, te = c.unstable_now, re = c.unstable_getCurrentPriorityLevel, Xe = c.unstable_ImmediatePriority, nt = c.unstable_UserBlockingPriority, Le = c.unstable_NormalPriority, Wt = c.unstable_LowPriority, _a2 = c.unstable_IdlePriority, Rh = c.log, Th = c.unstable_setDisableYieldValue, gl = null, Rt = null;
    function Da(e) {
      if (typeof Rh == "function" && Th(e), Rt && typeof Rt.setStrictMode == "function") try {
        Rt.setStrictMode(gl, e);
      } catch {
      }
    }
    var Tt = Math.clz32 ? Math.clz32 : Dh, zh = Math.log, _h = Math.LN2;
    function Dh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (zh(e) / _h | 0) | 0;
    }
    var mi = 256, hi = 262144, pi = 4194304;
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
    function gi(e, t, a) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var l = 0, s = e.suspendedLanes, u = e.pingedLanes;
      e = e.warmLanes;
      var d = n & 134217727;
      return d !== 0 ? (n = d & ~s, n !== 0 ? l = un(n) : (u &= d, u !== 0 ? l = un(u) : a || (a = d & ~e, a !== 0 && (l = un(a))))) : (d = n & ~s, d !== 0 ? l = un(d) : u !== 0 ? l = un(u) : a || (a = n & ~e, a !== 0 && (l = un(a)))), l === 0 ? 0 : t !== 0 && t !== l && (t & s) === 0 && (s = l & -l, a = t & -t, s >= a || s === 32 && (a & 4194048) !== 0) ? t : l;
    }
    function yl(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Uh(e, t) {
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
    function Mo() {
      var e = pi;
      return pi <<= 1, (pi & 62914560) === 0 && (pi = 4194304), e;
    }
    function qs(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function vl(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function kh(e, t, a, n, l, s) {
      var u = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var d = e.entanglements, h = e.expirationTimes, T = e.hiddenUpdates;
      for (a = u & ~a; 0 < a; ) {
        var O = 31 - Tt(a), Q = 1 << O;
        d[O] = 0, h[O] = -1;
        var z = T[O];
        if (z !== null) for (T[O] = null, O = 0; O < z.length; O++) {
          var U = z[O];
          U !== null && (U.lane &= -536870913);
        }
        a &= ~Q;
      }
      n !== 0 && jo(e, n, 0), s !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(u & ~t));
    }
    function jo(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var n = 31 - Tt(t);
      e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930;
    }
    function Ao(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var n = 31 - Tt(a), l = 1 << n;
        l & t | e[n] & t && (e[n] |= t), a &= ~l;
      }
    }
    function Eo(e, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : Bs(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
    }
    function Bs(e) {
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
    function Hs(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Co() {
      var e = D.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : mm(e.type));
    }
    function No(e, t) {
      var a = D.p;
      try {
        return D.p = e, t();
      } finally {
        D.p = a;
      }
    }
    var Ua = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Ua, xt = "__reactProps$" + Ua, Rn = "__reactContainer$" + Ua, Gs = "__reactEvents$" + Ua, Oh = "__reactListeners$" + Ua, Lh = "__reactHandles$" + Ua, Ro = "__reactResources$" + Ua, bl = "__reactMarker$" + Ua;
    function Ys(e) {
      delete e[ft], delete e[xt], delete e[Gs], delete e[Oh], delete e[Lh];
    }
    function Tn(e) {
      var t = e[ft];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Rn] || a[ft]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (e = If(e); e !== null; ) {
            if (a = e[ft]) return a;
            e = If(e);
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
    function Sl(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(r(33));
    }
    function _n(e) {
      var t = e[Ro];
      return t || (t = e[Ro] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function ot(e) {
      e[bl] = true;
    }
    var To = /* @__PURE__ */ new Set(), zo = {};
    function on(e, t) {
      Dn(e, t), Dn(e + "Capture", t);
    }
    function Dn(e, t) {
      for (zo[e] = t, e = 0; e < t.length; e++) To.add(t[e]);
    }
    var qh = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), _o = {}, Do = {};
    function Bh(e) {
      return w.call(Do, e) ? true : w.call(_o, e) ? false : qh.test(e) ? Do[e] = true : (_o[e] = true, false);
    }
    function yi(e, t, a) {
      if (Bh(t)) if (a === null) e.removeAttribute(t);
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
    function vi(e, t, a) {
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
    function ra(e, t, a, n) {
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
    function Bt(e) {
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
    function Uo(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Hh(e, t, a) {
      var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get, s = n.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return l.call(this);
          },
          set: function(u) {
            a = "" + u, s.call(this, u);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function() {
            return a;
          },
          setValue: function(u) {
            a = "" + u;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Qs(e) {
      if (!e._valueTracker) {
        var t = Uo(e) ? "checked" : "value";
        e._valueTracker = Hh(e, t, "" + e[t]);
      }
    }
    function ko(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var a = t.getValue(), n = "";
      return e && (n = Uo(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), true) : false;
    }
    function bi(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Gh = /[\n"\\]/g;
    function Ht(e) {
      return e.replace(Gh, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Vs(e, t, a, n, l, s, u, d) {
      e.name = "", u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" ? e.type = u : e.removeAttribute("type"), t != null ? u === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Bt(t)) : e.value !== "" + Bt(t) && (e.value = "" + Bt(t)) : u !== "submit" && u !== "reset" || e.removeAttribute("value"), t != null ? Xs(e, u, Bt(t)) : a != null ? Xs(e, u, Bt(a)) : n != null && e.removeAttribute("value"), l == null && s != null && (e.defaultChecked = !!s), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Bt(d) : e.removeAttribute("name");
    }
    function Oo(e, t, a, n, l, s, u, d) {
      if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || a != null) {
        if (!(s !== "submit" && s !== "reset" || t != null)) {
          Qs(e);
          return;
        }
        a = a != null ? "" + Bt(a) : "", t = t != null ? "" + Bt(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = n ?? l, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = d ? e.checked : !!n, e.defaultChecked = !!n, u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.name = u), Qs(e);
    }
    function Xs(e, t, a) {
      t === "number" && bi(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function Un(e, t, a, n) {
      if (e = e.options, t) {
        t = {};
        for (var l = 0; l < a.length; l++) t["$" + a[l]] = true;
        for (a = 0; a < e.length; a++) l = t.hasOwnProperty("$" + e[a].value), e[a].selected !== l && (e[a].selected = l), l && n && (e[a].defaultSelected = true);
      } else {
        for (a = "" + Bt(a), t = null, l = 0; l < e.length; l++) {
          if (e[l].value === a) {
            e[l].selected = true, n && (e[l].defaultSelected = true);
            return;
          }
          t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = true);
      }
    }
    function Lo(e, t, a) {
      if (t != null && (t = "" + Bt(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Bt(a) : "";
    }
    function qo(e, t, a, n) {
      if (t == null) {
        if (n != null) {
          if (a != null) throw Error(r(92));
          if ($(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          a = n;
        }
        a == null && (a = ""), t = a;
      }
      a = Bt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Qs(e);
    }
    function kn(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Yh = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Bo(e, t, a) {
      var n = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Yh.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
    }
    function Ho(e, t, a) {
      if (t != null && typeof t != "object") throw Error(r(62));
      if (e = e.style, a != null) {
        for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
        for (var l in t) n = t[l], t.hasOwnProperty(l) && a[l] !== n && Bo(e, l, n);
      } else for (var s in t) t.hasOwnProperty(s) && Bo(e, s, t[s]);
    }
    function Zs(e) {
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
    var Qh = /* @__PURE__ */ new Map([
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
    ]), Vh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Si(e) {
      return Vh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function da() {
    }
    var Ks = null;
    function Js(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var On = null, Ln = null;
    function Go(e) {
      var t = zn(e);
      if (t && (e = t.stateNode)) {
        var a = e[xt] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Vs(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Ht("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                var n = a[t];
                if (n !== e && n.form === e.form) {
                  var l = n[xt] || null;
                  if (!l) throw Error(r(90));
                  Vs(n, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name);
                }
              }
              for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && ko(n);
            }
            break e;
          case "textarea":
            Lo(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Un(e, !!a.multiple, t, false);
        }
      }
    }
    var Fs = false;
    function Yo(e, t, a) {
      if (Fs) return e(t, a);
      Fs = true;
      try {
        var n = e(t);
        return n;
      } finally {
        if (Fs = false, (On !== null || Ln !== null) && (cs(), On && (t = On, e = Ln, Ln = On = null, Go(t), e))) for (t = 0; t < e.length; t++) Go(e[t]);
      }
    }
    function xl(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var n = a[xt] || null;
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
      if (a && typeof a != "function") throw Error(r(231, t, typeof a));
      return a;
    }
    var fa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $s = false;
    if (fa) try {
      var wl = {};
      Object.defineProperty(wl, "passive", {
        get: function() {
          $s = true;
        }
      }), window.addEventListener("test", wl, wl), window.removeEventListener("test", wl, wl);
    } catch {
      $s = false;
    }
    var ka = null, Is = null, xi = null;
    function Qo() {
      if (xi) return xi;
      var e, t = Is, a = t.length, n, l = "value" in ka ? ka.value : ka.textContent, s = l.length;
      for (e = 0; e < a && t[e] === l[e]; e++) ;
      var u = a - e;
      for (n = 1; n <= u && t[a - n] === l[s - n]; n++) ;
      return xi = l.slice(e, 1 < n ? 1 - n : void 0);
    }
    function wi(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Mi() {
      return true;
    }
    function Vo() {
      return false;
    }
    function wt(e) {
      function t(a, n, l, s, u) {
        this._reactName = a, this._targetInst = l, this.type = n, this.nativeEvent = s, this.target = u, this.currentTarget = null;
        for (var d in e) e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(s) : s[d]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === false) ? Mi : Vo, this.isPropagationStopped = Vo, this;
      }
      return G(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = false), this.isDefaultPrevented = Mi);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = true), this.isPropagationStopped = Mi);
        },
        persist: function() {
        },
        isPersistent: Mi
      }), t;
    }
    var rn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ji = wt(rn), Ml = G({}, rn, {
      view: 0,
      detail: 0
    }), Xh = wt(Ml), Ws, Ps, jl, Ai = G({}, Ml, {
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
      getModifierState: tc,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== jl && (jl && e.type === "mousemove" ? (Ws = e.screenX - jl.screenX, Ps = e.screenY - jl.screenY) : Ps = Ws = 0, jl = e), Ws);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Ps;
      }
    }), Xo = wt(Ai), Zh = G({}, Ai, {
      dataTransfer: 0
    }), Kh = wt(Zh), Jh = G({}, Ml, {
      relatedTarget: 0
    }), ec = wt(Jh), Fh = G({}, rn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $h = wt(Fh), Ih = G({}, rn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Wh = wt(Ih), Ph = G({}, rn, {
      data: 0
    }), Zo = wt(Ph), ep = {
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
    }, tp = {
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
    }, ap = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function np(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = ap[e]) ? !!t[e] : false;
    }
    function tc() {
      return np;
    }
    var lp = G({}, Ml, {
      key: function(e) {
        if (e.key) {
          var t = ep[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = wi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? tp[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: tc,
      charCode: function(e) {
        return e.type === "keypress" ? wi(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? wi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ip = wt(lp), sp = G({}, Ai, {
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
    }), Ko = wt(sp), cp = G({}, Ml, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: tc
    }), up = wt(cp), op = G({}, rn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), rp = wt(op), dp = G({}, Ai, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), fp = wt(dp), mp = G({}, rn, {
      newState: 0,
      oldState: 0
    }), hp = wt(mp), pp = [
      9,
      13,
      27,
      32
    ], ac = fa && "CompositionEvent" in window, Al = null;
    fa && "documentMode" in document && (Al = document.documentMode);
    var gp = fa && "TextEvent" in window && !Al, Jo = fa && (!ac || Al && 8 < Al && 11 >= Al), Fo = " ", $o = false;
    function Io(e, t) {
      switch (e) {
        case "keyup":
          return pp.indexOf(t.keyCode) !== -1;
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
    function Wo(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var qn = false;
    function yp(e, t) {
      switch (e) {
        case "compositionend":
          return Wo(t);
        case "keypress":
          return t.which !== 32 ? null : ($o = true, Fo);
        case "textInput":
          return e = t.data, e === Fo && $o ? null : e;
        default:
          return null;
      }
    }
    function vp(e, t) {
      if (qn) return e === "compositionend" || !ac && Io(e, t) ? (e = Qo(), xi = Is = ka = null, qn = false, e) : null;
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
          return Jo && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var bp = {
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
    function Po(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!bp[e.type] : t === "textarea";
    }
    function er(e, t, a, n) {
      On ? Ln ? Ln.push(n) : Ln = [
        n
      ] : On = n, t = hs(t, "onChange"), 0 < t.length && (a = new ji("onChange", "change", null, a, n), e.push({
        event: a,
        listeners: t
      }));
    }
    var El = null, Cl = null;
    function Sp(e) {
      Lf(e, 0);
    }
    function Ei(e) {
      var t = Sl(e);
      if (ko(t)) return e;
    }
    function tr(e, t) {
      if (e === "change") return t;
    }
    var ar = false;
    if (fa) {
      var nc;
      if (fa) {
        var lc = "oninput" in document;
        if (!lc) {
          var nr = document.createElement("div");
          nr.setAttribute("oninput", "return;"), lc = typeof nr.oninput == "function";
        }
        nc = lc;
      } else nc = false;
      ar = nc && (!document.documentMode || 9 < document.documentMode);
    }
    function lr() {
      El && (El.detachEvent("onpropertychange", ir), Cl = El = null);
    }
    function ir(e) {
      if (e.propertyName === "value" && Ei(Cl)) {
        var t = [];
        er(t, Cl, e, Js(e)), Yo(Sp, t);
      }
    }
    function xp(e, t, a) {
      e === "focusin" ? (lr(), El = t, Cl = a, El.attachEvent("onpropertychange", ir)) : e === "focusout" && lr();
    }
    function wp(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ei(Cl);
    }
    function Mp(e, t) {
      if (e === "click") return Ei(t);
    }
    function jp(e, t) {
      if (e === "input" || e === "change") return Ei(t);
    }
    function Ap(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var zt = typeof Object.is == "function" ? Object.is : Ap;
    function Nl(e, t) {
      if (zt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var a = Object.keys(e), n = Object.keys(t);
      if (a.length !== n.length) return false;
      for (n = 0; n < a.length; n++) {
        var l = a[n];
        if (!w.call(t, l) || !zt(e[l], t[l])) return false;
      }
      return true;
    }
    function sr(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function cr(e, t) {
      var a = sr(e);
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
        a = sr(a);
      }
    }
    function ur(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? ur(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function or(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = bi(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = false;
        }
        if (a) e = t.contentWindow;
        else break;
        t = bi(e.document);
      }
      return t;
    }
    function ic(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var Ep = fa && "documentMode" in document && 11 >= document.documentMode, Bn = null, sc = null, Rl = null, cc = false;
    function rr(e, t, a) {
      var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      cc || Bn == null || Bn !== bi(n) || (n = Bn, "selectionStart" in n && ic(n) ? n = {
        start: n.selectionStart,
        end: n.selectionEnd
      } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), Rl && Nl(Rl, n) || (Rl = n, n = hs(sc, "onSelect"), 0 < n.length && (t = new ji("onSelect", "select", null, t, a), e.push({
        event: t,
        listeners: n
      }), t.target = Bn)));
    }
    function dn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Hn = {
      animationend: dn("Animation", "AnimationEnd"),
      animationiteration: dn("Animation", "AnimationIteration"),
      animationstart: dn("Animation", "AnimationStart"),
      transitionrun: dn("Transition", "TransitionRun"),
      transitionstart: dn("Transition", "TransitionStart"),
      transitioncancel: dn("Transition", "TransitionCancel"),
      transitionend: dn("Transition", "TransitionEnd")
    }, uc = {}, dr = {};
    fa && (dr = document.createElement("div").style, "AnimationEvent" in window || (delete Hn.animationend.animation, delete Hn.animationiteration.animation, delete Hn.animationstart.animation), "TransitionEvent" in window || delete Hn.transitionend.transition);
    function fn(e) {
      if (uc[e]) return uc[e];
      if (!Hn[e]) return e;
      var t = Hn[e], a;
      for (a in t) if (t.hasOwnProperty(a) && a in dr) return uc[e] = t[a];
      return e;
    }
    var fr = fn("animationend"), mr = fn("animationiteration"), hr = fn("animationstart"), Cp = fn("transitionrun"), Np = fn("transitionstart"), Rp = fn("transitioncancel"), pr = fn("transitionend"), gr = /* @__PURE__ */ new Map(), oc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    oc.push("scrollEnd");
    function Pt(e, t) {
      gr.set(e, t), on(t, [
        e
      ]);
    }
    var Ci = typeof reportError == "function" ? reportError : function(e) {
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
    }, Gt = [], Gn = 0, rc = 0;
    function Ni() {
      for (var e = Gn, t = rc = Gn = 0; t < e; ) {
        var a = Gt[t];
        Gt[t++] = null;
        var n = Gt[t];
        Gt[t++] = null;
        var l = Gt[t];
        Gt[t++] = null;
        var s = Gt[t];
        if (Gt[t++] = null, n !== null && l !== null) {
          var u = n.pending;
          u === null ? l.next = l : (l.next = u.next, u.next = l), n.pending = l;
        }
        s !== 0 && yr(a, l, s);
      }
    }
    function Ri(e, t, a, n) {
      Gt[Gn++] = e, Gt[Gn++] = t, Gt[Gn++] = a, Gt[Gn++] = n, rc |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
    }
    function dc(e, t, a, n) {
      return Ri(e, t, a, n), Ti(e);
    }
    function mn(e, t) {
      return Ri(e, null, null, t), Ti(e);
    }
    function yr(e, t, a) {
      e.lanes |= a;
      var n = e.alternate;
      n !== null && (n.lanes |= a);
      for (var l = false, s = e.return; s !== null; ) s.childLanes |= a, n = s.alternate, n !== null && (n.childLanes |= a), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (l = true)), e = s, s = s.return;
      return e.tag === 3 ? (s = e.stateNode, l && t !== null && (l = 31 - Tt(a), e = s.hiddenUpdates, n = e[l], n === null ? e[l] = [
        t
      ] : n.push(t), t.lane = a | 536870912), s) : null;
    }
    function Ti(e) {
      if (50 < Il) throw Il = 0, Su = null, Error(r(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var Yn = {};
    function Tp(e, t, a, n) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function _t(e, t, a, n) {
      return new Tp(e, t, a, n);
    }
    function fc(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function ma(e, t) {
      var a = e.alternate;
      return a === null ? (a = _t(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
    }
    function vr(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function zi(e, t, a, n, l, s) {
      var u = 0;
      if (n = e, typeof e == "function") fc(e) && (u = 1);
      else if (typeof e == "string") u = kg(e, a, ie.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case k:
          return e = _t(31, a, t, l), e.elementType = k, e.lanes = s, e;
        case W:
          return hn(a.children, l, s, t);
        case Z:
          u = 8, l |= 24;
          break;
        case le:
          return e = _t(12, a, t, l | 2), e.elementType = le, e.lanes = s, e;
        case X:
          return e = _t(13, a, t, l), e.elementType = X, e.lanes = s, e;
        case V:
          return e = _t(19, a, t, l), e.elementType = V, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case ce:
              u = 10;
              break e;
            case de:
              u = 9;
              break e;
            case se:
              u = 11;
              break e;
            case _:
              u = 14;
              break e;
            case F:
              u = 16, n = null;
              break e;
          }
          u = 29, a = Error(r(130, e === null ? "null" : typeof e, "")), n = null;
      }
      return t = _t(u, a, t, l), t.elementType = e, t.type = n, t.lanes = s, t;
    }
    function hn(e, t, a, n) {
      return e = _t(7, e, n, t), e.lanes = a, e;
    }
    function mc(e, t, a) {
      return e = _t(6, e, null, t), e.lanes = a, e;
    }
    function br(e) {
      var t = _t(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function hc(e, t, a) {
      return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var Sr = /* @__PURE__ */ new WeakMap();
    function Yt(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = Sr.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: fe(t)
        }, Sr.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: fe(t)
      };
    }
    var Qn = [], Vn = 0, _i = null, Tl = 0, Qt = [], Vt = 0, Oa = null, aa = 1, na = "";
    function ha(e, t) {
      Qn[Vn++] = Tl, Qn[Vn++] = _i, _i = e, Tl = t;
    }
    function xr(e, t, a) {
      Qt[Vt++] = aa, Qt[Vt++] = na, Qt[Vt++] = Oa, Oa = e;
      var n = aa;
      e = na;
      var l = 32 - Tt(n) - 1;
      n &= ~(1 << l), a += 1;
      var s = 32 - Tt(t) + l;
      if (30 < s) {
        var u = l - l % 5;
        s = (n & (1 << u) - 1).toString(32), n >>= u, l -= u, aa = 1 << 32 - Tt(t) + l | a << l | n, na = s + e;
      } else aa = 1 << s | a << l | n, na = e;
    }
    function pc(e) {
      e.return !== null && (ha(e, 1), xr(e, 1, 0));
    }
    function gc(e) {
      for (; e === _i; ) _i = Qn[--Vn], Qn[Vn] = null, Tl = Qn[--Vn], Qn[Vn] = null;
      for (; e === Oa; ) Oa = Qt[--Vt], Qt[Vt] = null, na = Qt[--Vt], Qt[Vt] = null, aa = Qt[--Vt], Qt[Vt] = null;
    }
    function wr(e, t) {
      Qt[Vt++] = aa, Qt[Vt++] = na, Qt[Vt++] = Oa, aa = t.id, na = t.overflow, Oa = e;
    }
    var mt = null, Je = null, De = false, La = null, Xt = false, yc = Error(r(519));
    function qa(e) {
      var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw zl(Yt(t, e)), yc;
    }
    function Mr(e) {
      var t = e.stateNode, a = e.type, n = e.memoizedProps;
      switch (t[ft] = e, t[xt] = n, a) {
        case "dialog":
          Re("cancel", t), Re("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Re("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Pl.length; a++) Re(Pl[a], t);
          break;
        case "source":
          Re("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Re("error", t), Re("load", t);
          break;
        case "details":
          Re("toggle", t);
          break;
        case "input":
          Re("invalid", t), Oo(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
          break;
        case "select":
          Re("invalid", t);
          break;
        case "textarea":
          Re("invalid", t), qo(t, n.value, n.defaultValue, n.children);
      }
      a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === true || Gf(t.textContent, a) ? (n.popover != null && (Re("beforetoggle", t), Re("toggle", t)), n.onScroll != null && Re("scroll", t), n.onScrollEnd != null && Re("scrollend", t), n.onClick != null && (t.onclick = da), t = true) : t = false, t || qa(e, true);
    }
    function jr(e) {
      for (mt = e.return; mt; ) switch (mt.tag) {
        case 5:
        case 31:
        case 13:
          Xt = false;
          return;
        case 27:
        case 3:
          Xt = true;
          return;
        default:
          mt = mt.return;
      }
    }
    function Xn(e) {
      if (e !== mt) return false;
      if (!De) return jr(e), De = true, false;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || ku(e.type, e.memoizedProps)), a = !a), a && Je && qa(e), jr(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Je = $f(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Je = $f(e);
      } else t === 27 ? (t = Je, Wa(e.type) ? (e = Hu, Hu = null, Je = e) : Je = t) : Je = mt ? Kt(e.stateNode.nextSibling) : null;
      return true;
    }
    function pn() {
      Je = mt = null, De = false;
    }
    function vc() {
      var e = La;
      return e !== null && (Et === null ? Et = e : Et.push.apply(Et, e), La = null), e;
    }
    function zl(e) {
      La === null ? La = [
        e
      ] : La.push(e);
    }
    var bc = v(null), gn = null, pa = null;
    function Ba(e, t, a) {
      P(bc, t._currentValue), t._currentValue = a;
    }
    function ga(e) {
      e._currentValue = bc.current, B(bc);
    }
    function Sc(e, t, a) {
      for (; e !== null; ) {
        var n = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a) break;
        e = e.return;
      }
    }
    function xc(e, t, a, n) {
      var l = e.child;
      for (l !== null && (l.return = e); l !== null; ) {
        var s = l.dependencies;
        if (s !== null) {
          var u = l.child;
          s = s.firstContext;
          e: for (; s !== null; ) {
            var d = s;
            s = l;
            for (var h = 0; h < t.length; h++) if (d.context === t[h]) {
              s.lanes |= a, d = s.alternate, d !== null && (d.lanes |= a), Sc(s.return, a, e), n || (u = null);
              break e;
            }
            s = d.next;
          }
        } else if (l.tag === 18) {
          if (u = l.return, u === null) throw Error(r(341));
          u.lanes |= a, s = u.alternate, s !== null && (s.lanes |= a), Sc(u, a, e), u = null;
        } else u = l.child;
        if (u !== null) u.return = l;
        else for (u = l; u !== null; ) {
          if (u === e) {
            u = null;
            break;
          }
          if (l = u.sibling, l !== null) {
            l.return = u.return, u = l;
            break;
          }
          u = u.return;
        }
        l = u;
      }
    }
    function Zn(e, t, a, n) {
      e = null;
      for (var l = t, s = false; l !== null; ) {
        if (!s) {
          if ((l.flags & 524288) !== 0) s = true;
          else if ((l.flags & 262144) !== 0) break;
        }
        if (l.tag === 10) {
          var u = l.alternate;
          if (u === null) throw Error(r(387));
          if (u = u.memoizedProps, u !== null) {
            var d = l.type;
            zt(l.pendingProps.value, u.value) || (e !== null ? e.push(d) : e = [
              d
            ]);
          }
        } else if (l === _e.current) {
          if (u = l.alternate, u === null) throw Error(r(387));
          u.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(li) : e = [
            li
          ]);
        }
        l = l.return;
      }
      e !== null && xc(t, e, a, n), t.flags |= 262144;
    }
    function Di(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!zt(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function yn(e) {
      gn = e, pa = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function ht(e) {
      return Ar(gn, e);
    }
    function Ui(e, t) {
      return gn === null && yn(e), Ar(e, t);
    }
    function Ar(e, t) {
      var a = t._currentValue;
      if (t = {
        context: t,
        memoizedValue: a,
        next: null
      }, pa === null) {
        if (e === null) throw Error(r(308));
        pa = t, e.dependencies = {
          lanes: 0,
          firstContext: t
        }, e.flags |= 524288;
      } else pa = pa.next = t;
      return a;
    }
    var zp = typeof AbortController < "u" ? AbortController : function() {
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
    }, _p = c.unstable_scheduleCallback, Dp = c.unstable_NormalPriority, lt = {
      $$typeof: ce,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function wc() {
      return {
        controller: new zp(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function _l(e) {
      e.refCount--, e.refCount === 0 && _p(Dp, function() {
        e.controller.abort();
      });
    }
    var Dl = null, Mc = 0, Kn = 0, Jn = null;
    function Up(e, t) {
      if (Dl === null) {
        var a = Dl = [];
        Mc = 0, Kn = Eu(), Jn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            a.push(n);
          }
        };
      }
      return Mc++, t.then(Er, Er), t;
    }
    function Er() {
      if (--Mc === 0 && Dl !== null) {
        Jn !== null && (Jn.status = "fulfilled");
        var e = Dl;
        Dl = null, Kn = 0, Jn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function kp(e, t) {
      var a = [], n = {
        status: "pending",
        value: null,
        reason: null,
        then: function(l) {
          a.push(l);
        }
      };
      return e.then(function() {
        n.status = "fulfilled", n.value = t;
        for (var l = 0; l < a.length; l++) (0, a[l])(t);
      }, function(l) {
        for (n.status = "rejected", n.reason = l, l = 0; l < a.length; l++) (0, a[l])(void 0);
      }), n;
    }
    var Cr = j.S;
    j.S = function(e, t) {
      df = te(), typeof t == "object" && t !== null && typeof t.then == "function" && Up(e, t), Cr !== null && Cr(e, t);
    };
    var vn = v(null);
    function jc() {
      var e = vn.current;
      return e !== null ? e : Ve.pooledCache;
    }
    function ki(e, t) {
      t === null ? P(vn, vn.current) : P(vn, t.pool);
    }
    function Nr() {
      var e = jc();
      return e === null ? null : {
        parent: lt._currentValue,
        pool: e
      };
    }
    var Fn = Error(r(460)), Ac = Error(r(474)), Oi = Error(r(542)), Li = {
      then: function() {
      }
    };
    function Rr(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Tr(e, t, a) {
      switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(da, da), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, _r(e), e;
        default:
          if (typeof t.status == "string") t.then(da, da);
          else {
            if (e = Ve, e !== null && 100 < e.shellSuspendCounter) throw Error(r(482));
            e = t, e.status = "pending", e.then(function(n) {
              if (t.status === "pending") {
                var l = t;
                l.status = "fulfilled", l.value = n;
              }
            }, function(n) {
              if (t.status === "pending") {
                var l = t;
                l.status = "rejected", l.reason = n;
              }
            });
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, _r(e), e;
          }
          throw Sn = t, Fn;
      }
    }
    function bn(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Sn = a, Fn) : a;
      }
    }
    var Sn = null;
    function zr() {
      if (Sn === null) throw Error(r(459));
      var e = Sn;
      return Sn = null, e;
    }
    function _r(e) {
      if (e === Fn || e === Oi) throw Error(r(483));
    }
    var $n = null, Ul = 0;
    function qi(e) {
      var t = Ul;
      return Ul += 1, $n === null && ($n = []), Tr($n, e, t);
    }
    function kl(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Bi(e, t) {
      throw t.$$typeof === L ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function Dr(e) {
      function t(M, b) {
        if (e) {
          var N = M.deletions;
          N === null ? (M.deletions = [
            b
          ], M.flags |= 16) : N.push(b);
        }
      }
      function a(M, b) {
        if (!e) return null;
        for (; b !== null; ) t(M, b), b = b.sibling;
        return null;
      }
      function n(M) {
        for (var b = /* @__PURE__ */ new Map(); M !== null; ) M.key !== null ? b.set(M.key, M) : b.set(M.index, M), M = M.sibling;
        return b;
      }
      function l(M, b) {
        return M = ma(M, b), M.index = 0, M.sibling = null, M;
      }
      function s(M, b, N) {
        return M.index = N, e ? (N = M.alternate, N !== null ? (N = N.index, N < b ? (M.flags |= 67108866, b) : N) : (M.flags |= 67108866, b)) : (M.flags |= 1048576, b);
      }
      function u(M) {
        return e && M.alternate === null && (M.flags |= 67108866), M;
      }
      function d(M, b, N, H) {
        return b === null || b.tag !== 6 ? (b = mc(N, M.mode, H), b.return = M, b) : (b = l(b, N), b.return = M, b);
      }
      function h(M, b, N, H) {
        var me = N.type;
        return me === W ? O(M, b, N.props.children, H, N.key) : b !== null && (b.elementType === me || typeof me == "object" && me !== null && me.$$typeof === F && bn(me) === b.type) ? (b = l(b, N.props), kl(b, N), b.return = M, b) : (b = zi(N.type, N.key, N.props, null, M.mode, H), kl(b, N), b.return = M, b);
      }
      function T(M, b, N, H) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== N.containerInfo || b.stateNode.implementation !== N.implementation ? (b = hc(N, M.mode, H), b.return = M, b) : (b = l(b, N.children || []), b.return = M, b);
      }
      function O(M, b, N, H, me) {
        return b === null || b.tag !== 7 ? (b = hn(N, M.mode, H, me), b.return = M, b) : (b = l(b, N), b.return = M, b);
      }
      function Q(M, b, N) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return b = mc("" + b, M.mode, N), b.return = M, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case Y:
              return N = zi(b.type, b.key, b.props, null, M.mode, N), kl(N, b), N.return = M, N;
            case g:
              return b = hc(b, M.mode, N), b.return = M, b;
            case F:
              return b = bn(b), Q(M, b, N);
          }
          if ($(b) || Ee(b)) return b = hn(b, M.mode, N, null), b.return = M, b;
          if (typeof b.then == "function") return Q(M, qi(b), N);
          if (b.$$typeof === ce) return Q(M, Ui(M, b), N);
          Bi(M, b);
        }
        return null;
      }
      function z(M, b, N, H) {
        var me = b !== null ? b.key : null;
        if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint") return me !== null ? null : d(M, b, "" + N, H);
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case Y:
              return N.key === me ? h(M, b, N, H) : null;
            case g:
              return N.key === me ? T(M, b, N, H) : null;
            case F:
              return N = bn(N), z(M, b, N, H);
          }
          if ($(N) || Ee(N)) return me !== null ? null : O(M, b, N, H, null);
          if (typeof N.then == "function") return z(M, b, qi(N), H);
          if (N.$$typeof === ce) return z(M, b, Ui(M, N), H);
          Bi(M, N);
        }
        return null;
      }
      function U(M, b, N, H, me) {
        if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint") return M = M.get(N) || null, d(b, M, "" + H, me);
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case Y:
              return M = M.get(H.key === null ? N : H.key) || null, h(b, M, H, me);
            case g:
              return M = M.get(H.key === null ? N : H.key) || null, T(b, M, H, me);
            case F:
              return H = bn(H), U(M, b, N, H, me);
          }
          if ($(H) || Ee(H)) return M = M.get(N) || null, O(b, M, H, me, null);
          if (typeof H.then == "function") return U(M, b, N, qi(H), me);
          if (H.$$typeof === ce) return U(M, b, N, Ui(b, H), me);
          Bi(b, H);
        }
        return null;
      }
      function ue(M, b, N, H) {
        for (var me = null, Ue = null, oe = b, we = b = 0, ze = null; oe !== null && we < N.length; we++) {
          oe.index > we ? (ze = oe, oe = null) : ze = oe.sibling;
          var ke = z(M, oe, N[we], H);
          if (ke === null) {
            oe === null && (oe = ze);
            break;
          }
          e && oe && ke.alternate === null && t(M, oe), b = s(ke, b, we), Ue === null ? me = ke : Ue.sibling = ke, Ue = ke, oe = ze;
        }
        if (we === N.length) return a(M, oe), De && ha(M, we), me;
        if (oe === null) {
          for (; we < N.length; we++) oe = Q(M, N[we], H), oe !== null && (b = s(oe, b, we), Ue === null ? me = oe : Ue.sibling = oe, Ue = oe);
          return De && ha(M, we), me;
        }
        for (oe = n(oe); we < N.length; we++) ze = U(oe, M, we, N[we], H), ze !== null && (e && ze.alternate !== null && oe.delete(ze.key === null ? we : ze.key), b = s(ze, b, we), Ue === null ? me = ze : Ue.sibling = ze, Ue = ze);
        return e && oe.forEach(function(nn) {
          return t(M, nn);
        }), De && ha(M, we), me;
      }
      function pe(M, b, N, H) {
        if (N == null) throw Error(r(151));
        for (var me = null, Ue = null, oe = b, we = b = 0, ze = null, ke = N.next(); oe !== null && !ke.done; we++, ke = N.next()) {
          oe.index > we ? (ze = oe, oe = null) : ze = oe.sibling;
          var nn = z(M, oe, ke.value, H);
          if (nn === null) {
            oe === null && (oe = ze);
            break;
          }
          e && oe && nn.alternate === null && t(M, oe), b = s(nn, b, we), Ue === null ? me = nn : Ue.sibling = nn, Ue = nn, oe = ze;
        }
        if (ke.done) return a(M, oe), De && ha(M, we), me;
        if (oe === null) {
          for (; !ke.done; we++, ke = N.next()) ke = Q(M, ke.value, H), ke !== null && (b = s(ke, b, we), Ue === null ? me = ke : Ue.sibling = ke, Ue = ke);
          return De && ha(M, we), me;
        }
        for (oe = n(oe); !ke.done; we++, ke = N.next()) ke = U(oe, M, we, ke.value, H), ke !== null && (e && ke.alternate !== null && oe.delete(ke.key === null ? we : ke.key), b = s(ke, b, we), Ue === null ? me = ke : Ue.sibling = ke, Ue = ke);
        return e && oe.forEach(function(Zg) {
          return t(M, Zg);
        }), De && ha(M, we), me;
      }
      function Ye(M, b, N, H) {
        if (typeof N == "object" && N !== null && N.type === W && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case Y:
              e: {
                for (var me = N.key; b !== null; ) {
                  if (b.key === me) {
                    if (me = N.type, me === W) {
                      if (b.tag === 7) {
                        a(M, b.sibling), H = l(b, N.props.children), H.return = M, M = H;
                        break e;
                      }
                    } else if (b.elementType === me || typeof me == "object" && me !== null && me.$$typeof === F && bn(me) === b.type) {
                      a(M, b.sibling), H = l(b, N.props), kl(H, N), H.return = M, M = H;
                      break e;
                    }
                    a(M, b);
                    break;
                  } else t(M, b);
                  b = b.sibling;
                }
                N.type === W ? (H = hn(N.props.children, M.mode, H, N.key), H.return = M, M = H) : (H = zi(N.type, N.key, N.props, null, M.mode, H), kl(H, N), H.return = M, M = H);
              }
              return u(M);
            case g:
              e: {
                for (me = N.key; b !== null; ) {
                  if (b.key === me) if (b.tag === 4 && b.stateNode.containerInfo === N.containerInfo && b.stateNode.implementation === N.implementation) {
                    a(M, b.sibling), H = l(b, N.children || []), H.return = M, M = H;
                    break e;
                  } else {
                    a(M, b);
                    break;
                  }
                  else t(M, b);
                  b = b.sibling;
                }
                H = hc(N, M.mode, H), H.return = M, M = H;
              }
              return u(M);
            case F:
              return N = bn(N), Ye(M, b, N, H);
          }
          if ($(N)) return ue(M, b, N, H);
          if (Ee(N)) {
            if (me = Ee(N), typeof me != "function") throw Error(r(150));
            return N = me.call(N), pe(M, b, N, H);
          }
          if (typeof N.then == "function") return Ye(M, b, qi(N), H);
          if (N.$$typeof === ce) return Ye(M, b, Ui(M, N), H);
          Bi(M, N);
        }
        return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, b !== null && b.tag === 6 ? (a(M, b.sibling), H = l(b, N), H.return = M, M = H) : (a(M, b), H = mc(N, M.mode, H), H.return = M, M = H), u(M)) : a(M, b);
      }
      return function(M, b, N, H) {
        try {
          Ul = 0;
          var me = Ye(M, b, N, H);
          return $n = null, me;
        } catch (oe) {
          if (oe === Fn || oe === Oi) throw oe;
          var Ue = _t(29, oe, null, M.mode);
          return Ue.lanes = H, Ue.return = M, Ue;
        } finally {
        }
      };
    }
    var xn = Dr(true), Ur = Dr(false), Ha = false;
    function Ec(e) {
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
    function Cc(e, t) {
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
        var l = n.pending;
        return l === null ? t.next = t : (t.next = l.next, l.next = t), n.pending = t, t = Ti(e), yr(e, null, a), t;
      }
      return Ri(e, n, t, a), Ti(e);
    }
    function Ol(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Ao(e, a);
      }
    }
    function Nc(e, t) {
      var a = e.updateQueue, n = e.alternate;
      if (n !== null && (n = n.updateQueue, a === n)) {
        var l = null, s = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var u = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            s === null ? l = s = u : s = s.next = u, a = a.next;
          } while (a !== null);
          s === null ? l = s = t : s = s.next = t;
        } else l = s = t;
        a = {
          baseState: n.baseState,
          firstBaseUpdate: l,
          lastBaseUpdate: s,
          shared: n.shared,
          callbacks: n.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    var Rc = false;
    function Ll() {
      if (Rc) {
        var e = Jn;
        if (e !== null) throw e;
      }
    }
    function ql(e, t, a, n) {
      Rc = false;
      var l = e.updateQueue;
      Ha = false;
      var s = l.firstBaseUpdate, u = l.lastBaseUpdate, d = l.shared.pending;
      if (d !== null) {
        l.shared.pending = null;
        var h = d, T = h.next;
        h.next = null, u === null ? s = T : u.next = T, u = h;
        var O = e.alternate;
        O !== null && (O = O.updateQueue, d = O.lastBaseUpdate, d !== u && (d === null ? O.firstBaseUpdate = T : d.next = T, O.lastBaseUpdate = h));
      }
      if (s !== null) {
        var Q = l.baseState;
        u = 0, O = T = h = null, d = s;
        do {
          var z = d.lane & -536870913, U = z !== d.lane;
          if (U ? (Te & z) === z : (n & z) === z) {
            z !== 0 && z === Kn && (Rc = true), O !== null && (O = O.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            e: {
              var ue = e, pe = d;
              z = t;
              var Ye = a;
              switch (pe.tag) {
                case 1:
                  if (ue = pe.payload, typeof ue == "function") {
                    Q = ue.call(Ye, Q, z);
                    break e;
                  }
                  Q = ue;
                  break e;
                case 3:
                  ue.flags = ue.flags & -65537 | 128;
                case 0:
                  if (ue = pe.payload, z = typeof ue == "function" ? ue.call(Ye, Q, z) : ue, z == null) break e;
                  Q = G({}, Q, z);
                  break e;
                case 2:
                  Ha = true;
              }
            }
            z = d.callback, z !== null && (e.flags |= 64, U && (e.flags |= 8192), U = l.callbacks, U === null ? l.callbacks = [
              z
            ] : U.push(z));
          } else U = {
            lane: z,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, O === null ? (T = O = U, h = Q) : O = O.next = U, u |= z;
          if (d = d.next, d === null) {
            if (d = l.shared.pending, d === null) break;
            U = d, d = U.next, U.next = null, l.lastBaseUpdate = U, l.shared.pending = null;
          }
        } while (true);
        O === null && (h = Q), l.baseState = h, l.firstBaseUpdate = T, l.lastBaseUpdate = O, s === null && (l.shared.lanes = 0), Ka |= u, e.lanes = u, e.memoizedState = Q;
      }
    }
    function kr(e, t) {
      if (typeof e != "function") throw Error(r(191, e));
      e.call(t);
    }
    function Or(e, t) {
      var a = e.callbacks;
      if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) kr(a[e], t);
    }
    var In = v(null), Hi = v(0);
    function Lr(e, t) {
      e = Aa, P(Hi, e), P(In, t), Aa = e | t.baseLanes;
    }
    function Tc() {
      P(Hi, Aa), P(In, In.current);
    }
    function zc() {
      Aa = Hi.current, B(In), B(Hi);
    }
    var Dt = v(null), Zt = null;
    function Qa(e) {
      var t = e.alternate;
      P(Pe, Pe.current & 1), P(Dt, e), Zt === null && (t === null || In.current !== null || t.memoizedState !== null) && (Zt = e);
    }
    function _c(e) {
      P(Pe, Pe.current), P(Dt, e), Zt === null && (Zt = e);
    }
    function qr(e) {
      e.tag === 22 ? (P(Pe, Pe.current), P(Dt, e), Zt === null && (Zt = e)) : Va();
    }
    function Va() {
      P(Pe, Pe.current), P(Dt, Dt.current);
    }
    function Ut(e) {
      B(Dt), Zt === e && (Zt = null), B(Pe);
    }
    var Pe = v(0);
    function Gi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || qu(a) || Bu(a))) return t;
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
    var ya = 0, Se = null, He = null, it = null, Yi = false, Wn = false, wn = false, Qi = 0, Bl = 0, Pn = null, Op = 0;
    function Ie() {
      throw Error(r(321));
    }
    function Dc(e, t) {
      if (t === null) return false;
      for (var a = 0; a < t.length && a < e.length; a++) if (!zt(e[a], t[a])) return false;
      return true;
    }
    function Uc(e, t, a, n, l, s) {
      return ya = s, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? xd : Fc, wn = false, s = a(n, l), wn = false, Wn && (s = Hr(t, a, n, l)), Br(e), s;
    }
    function Br(e) {
      j.H = Yl;
      var t = He !== null && He.next !== null;
      if (ya = 0, it = He = Se = null, Yi = false, Bl = 0, Pn = null, t) throw Error(r(300));
      e === null || st || (e = e.dependencies, e !== null && Di(e) && (st = true));
    }
    function Hr(e, t, a, n) {
      Se = e;
      var l = 0;
      do {
        if (Wn && (Pn = null), Bl = 0, Wn = false, 25 <= l) throw Error(r(301));
        if (l += 1, it = He = null, e.updateQueue != null) {
          var s = e.updateQueue;
          s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
        }
        j.H = wd, s = t(a, n);
      } while (Wn);
      return s;
    }
    function Lp() {
      var e = j.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Hl(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (Se.flags |= 1024), t;
    }
    function kc() {
      var e = Qi !== 0;
      return Qi = 0, e;
    }
    function Oc(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
    }
    function Lc(e) {
      if (Yi) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Yi = false;
      }
      ya = 0, it = He = Se = null, Wn = false, Bl = Qi = 0, Pn = null;
    }
    function bt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return it === null ? Se.memoizedState = it = e : it = it.next = e, it;
    }
    function et() {
      if (He === null) {
        var e = Se.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = He.next;
      var t = it === null ? Se.memoizedState : it.next;
      if (t !== null) it = t, He = e;
      else {
        if (e === null) throw Se.alternate === null ? Error(r(467)) : Error(r(310));
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
    function Vi() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function Hl(e) {
      var t = Bl;
      return Bl += 1, Pn === null && (Pn = []), e = Tr(Pn, e, t), t = Se, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? xd : Fc), e;
    }
    function Xi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Hl(e);
        if (e.$$typeof === ce) return ht(e);
      }
      throw Error(r(438, String(e)));
    }
    function qc(e) {
      var t = null, a = Se.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var n = Se.alternate;
        n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
          data: n.data.map(function(l) {
            return l.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = {
        data: [],
        index: 0
      }), a === null && (a = Vi(), Se.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = J;
      return t.index++, a;
    }
    function va(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Zi(e) {
      var t = et();
      return Bc(t, He, e);
    }
    function Bc(e, t, a) {
      var n = e.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = a;
      var l = e.baseQueue, s = n.pending;
      if (s !== null) {
        if (l !== null) {
          var u = l.next;
          l.next = s.next, s.next = u;
        }
        t.baseQueue = l = s, n.pending = null;
      }
      if (s = e.baseState, l === null) e.memoizedState = s;
      else {
        t = l.next;
        var d = u = null, h = null, T = t, O = false;
        do {
          var Q = T.lane & -536870913;
          if (Q !== T.lane ? (Te & Q) === Q : (ya & Q) === Q) {
            var z = T.revertLane;
            if (z === 0) h !== null && (h = h.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), Q === Kn && (O = true);
            else if ((ya & z) === z) {
              T = T.next, z === Kn && (O = true);
              continue;
            } else Q = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, h === null ? (d = h = Q, u = s) : h = h.next = Q, Se.lanes |= z, Ka |= z;
            Q = T.action, wn && a(s, Q), s = T.hasEagerState ? T.eagerState : a(s, Q);
          } else z = {
            lane: Q,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, h === null ? (d = h = z, u = s) : h = h.next = z, Se.lanes |= Q, Ka |= Q;
          T = T.next;
        } while (T !== null && T !== t);
        if (h === null ? u = s : h.next = d, !zt(s, e.memoizedState) && (st = true, O && (a = Jn, a !== null))) throw a;
        e.memoizedState = s, e.baseState = u, e.baseQueue = h, n.lastRenderedState = s;
      }
      return l === null && (n.lanes = 0), [
        e.memoizedState,
        n.dispatch
      ];
    }
    function Hc(e) {
      var t = et(), a = t.queue;
      if (a === null) throw Error(r(311));
      a.lastRenderedReducer = e;
      var n = a.dispatch, l = a.pending, s = t.memoizedState;
      if (l !== null) {
        a.pending = null;
        var u = l = l.next;
        do
          s = e(s, u.action), u = u.next;
        while (u !== l);
        zt(s, t.memoizedState) || (st = true), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), a.lastRenderedState = s;
      }
      return [
        s,
        n
      ];
    }
    function Gr(e, t, a) {
      var n = Se, l = et(), s = De;
      if (s) {
        if (a === void 0) throw Error(r(407));
        a = a();
      } else a = t();
      var u = !zt((He || l).memoizedState, a);
      if (u && (l.memoizedState = a, st = true), l = l.queue, Qc(Vr.bind(null, n, l, e), [
        e
      ]), l.getSnapshot !== t || u || it !== null && it.memoizedState.tag & 1) {
        if (n.flags |= 2048, el(9, {
          destroy: void 0
        }, Qr.bind(null, n, l, a, t), null), Ve === null) throw Error(r(349));
        s || (ya & 127) !== 0 || Yr(n, t, a);
      }
      return a;
    }
    function Yr(e, t, a) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: a
      }, t = Se.updateQueue, t === null ? (t = Vi(), Se.updateQueue = t, t.stores = [
        e
      ]) : (a = t.stores, a === null ? t.stores = [
        e
      ] : a.push(e));
    }
    function Qr(e, t, a, n) {
      t.value = a, t.getSnapshot = n, Xr(t) && Zr(e);
    }
    function Vr(e, t, a) {
      return a(function() {
        Xr(t) && Zr(e);
      });
    }
    function Xr(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !zt(e, a);
      } catch {
        return true;
      }
    }
    function Zr(e) {
      var t = mn(e, 2);
      t !== null && Ct(t, e, 2);
    }
    function Gc(e) {
      var t = bt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), wn) {
          Da(true);
          try {
            a();
          } finally {
            Da(false);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: va,
        lastRenderedState: e
      }, t;
    }
    function Kr(e, t, a, n) {
      return e.baseState = a, Bc(e, He, typeof n == "function" ? n : va);
    }
    function qp(e, t, a, n, l) {
      if (Fi(e)) throw Error(r(485));
      if (e = t.action, e !== null) {
        var s = {
          payload: l,
          action: e,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(u) {
            s.listeners.push(u);
          }
        };
        j.T !== null ? a(true) : s.isTransition = false, n(s), a = t.pending, a === null ? (s.next = t.pending = s, Jr(t, s)) : (s.next = a.next, t.pending = a.next = s);
      }
    }
    function Jr(e, t) {
      var a = t.action, n = t.payload, l = e.state;
      if (t.isTransition) {
        var s = j.T, u = {};
        j.T = u;
        try {
          var d = a(l, n), h = j.S;
          h !== null && h(u, d), Fr(e, t, d);
        } catch (T) {
          Yc(e, t, T);
        } finally {
          s !== null && u.types !== null && (s.types = u.types), j.T = s;
        }
      } else try {
        s = a(l, n), Fr(e, t, s);
      } catch (T) {
        Yc(e, t, T);
      }
    }
    function Fr(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
        $r(e, t, n);
      }, function(n) {
        return Yc(e, t, n);
      }) : $r(e, t, a);
    }
    function $r(e, t, a) {
      t.status = "fulfilled", t.value = a, Ir(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Jr(e, a)));
    }
    function Yc(e, t, a) {
      var n = e.pending;
      if (e.pending = null, n !== null) {
        n = n.next;
        do
          t.status = "rejected", t.reason = a, Ir(t), t = t.next;
        while (t !== n);
      }
      e.action = null;
    }
    function Ir(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Wr(e, t) {
      return t;
    }
    function Pr(e, t) {
      if (De) {
        var a = Ve.formState;
        if (a !== null) {
          e: {
            var n = Se;
            if (De) {
              if (Je) {
                t: {
                  for (var l = Je, s = Xt; l.nodeType !== 8; ) {
                    if (!s) {
                      l = null;
                      break t;
                    }
                    if (l = Kt(l.nextSibling), l === null) {
                      l = null;
                      break t;
                    }
                  }
                  s = l.data, l = s === "F!" || s === "F" ? l : null;
                }
                if (l) {
                  Je = Kt(l.nextSibling), n = l.data === "F!";
                  break e;
                }
              }
              qa(n);
            }
            n = false;
          }
          n && (t = a[0]);
        }
      }
      return a = bt(), a.memoizedState = a.baseState = t, n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wr,
        lastRenderedState: t
      }, a.queue = n, a = vd.bind(null, Se, n), n.dispatch = a, n = Gc(false), s = Jc.bind(null, Se, false, n.queue), n = bt(), l = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, n.queue = l, a = qp.bind(null, Se, l, s, a), l.dispatch = a, n.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function ed(e) {
      var t = et();
      return td(t, He, e);
    }
    function td(e, t, a) {
      if (t = Bc(e, t, Wr)[0], e = Zi(va)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var n = Hl(t);
      } catch (u) {
        throw u === Fn ? Oi : u;
      }
      else n = t;
      t = et();
      var l = t.queue, s = l.dispatch;
      return a !== t.memoizedState && (Se.flags |= 2048, el(9, {
        destroy: void 0
      }, Bp.bind(null, l, a), null)), [
        n,
        s,
        e
      ];
    }
    function Bp(e, t) {
      e.action = t;
    }
    function ad(e) {
      var t = et(), a = He;
      if (a !== null) return td(t, a, e);
      et(), t = t.memoizedState, a = et();
      var n = a.queue.dispatch;
      return a.memoizedState = e, [
        t,
        n,
        false
      ];
    }
    function el(e, t, a, n) {
      return e = {
        tag: e,
        create: a,
        deps: n,
        inst: t,
        next: null
      }, t = Se.updateQueue, t === null && (t = Vi(), Se.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e;
    }
    function nd() {
      return et().memoizedState;
    }
    function Ki(e, t, a, n) {
      var l = bt();
      Se.flags |= e, l.memoizedState = el(1 | t, {
        destroy: void 0
      }, a, n === void 0 ? null : n);
    }
    function Ji(e, t, a, n) {
      var l = et();
      n = n === void 0 ? null : n;
      var s = l.memoizedState.inst;
      He !== null && n !== null && Dc(n, He.memoizedState.deps) ? l.memoizedState = el(t, s, a, n) : (Se.flags |= e, l.memoizedState = el(1 | t, s, a, n));
    }
    function ld(e, t) {
      Ki(8390656, 8, e, t);
    }
    function Qc(e, t) {
      Ji(2048, 8, e, t);
    }
    function Hp(e) {
      Se.flags |= 4;
      var t = Se.updateQueue;
      if (t === null) t = Vi(), Se.updateQueue = t, t.events = [
        e
      ];
      else {
        var a = t.events;
        a === null ? t.events = [
          e
        ] : a.push(e);
      }
    }
    function id(e) {
      var t = et().memoizedState;
      return Hp({
        ref: t,
        nextImpl: e
      }), function() {
        if ((Oe & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function sd(e, t) {
      return Ji(4, 2, e, t);
    }
    function cd(e, t) {
      return Ji(4, 4, e, t);
    }
    function ud(e, t) {
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
    function od(e, t, a) {
      a = a != null ? a.concat([
        e
      ]) : null, Ji(4, 4, ud.bind(null, t, e), a);
    }
    function Vc() {
    }
    function rd(e, t) {
      var a = et();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      return t !== null && Dc(t, n[1]) ? n[0] : (a.memoizedState = [
        e,
        t
      ], e);
    }
    function dd(e, t) {
      var a = et();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      if (t !== null && Dc(t, n[1])) return n[0];
      if (n = e(), wn) {
        Da(true);
        try {
          e();
        } finally {
          Da(false);
        }
      }
      return a.memoizedState = [
        n,
        t
      ], n;
    }
    function Xc(e, t, a) {
      return a === void 0 || (ya & 1073741824) !== 0 && (Te & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = mf(), Se.lanes |= e, Ka |= e, a);
    }
    function fd(e, t, a, n) {
      return zt(a, t) ? a : In.current !== null ? (e = Xc(e, a, n), zt(e, t) || (st = true), e) : (ya & 42) === 0 || (ya & 1073741824) !== 0 && (Te & 261930) === 0 ? (st = true, e.memoizedState = a) : (e = mf(), Se.lanes |= e, Ka |= e, t);
    }
    function md(e, t, a, n, l) {
      var s = D.p;
      D.p = s !== 0 && 8 > s ? s : 8;
      var u = j.T, d = {};
      j.T = d, Jc(e, false, t, a);
      try {
        var h = l(), T = j.S;
        if (T !== null && T(d, h), h !== null && typeof h == "object" && typeof h.then == "function") {
          var O = kp(h, n);
          Gl(e, t, O, Lt(e));
        } else Gl(e, t, n, Lt(e));
      } catch (Q) {
        Gl(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Q
        }, Lt());
      } finally {
        D.p = s, u !== null && d.types !== null && (u.types = d.types), j.T = u;
      }
    }
    function Gp() {
    }
    function Zc(e, t, a, n) {
      if (e.tag !== 5) throw Error(r(476));
      var l = hd(e).queue;
      md(e, l, t, ee, a === null ? Gp : function() {
        return pd(e), a(n);
      });
    }
    function hd(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ee,
        baseState: ee,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: va,
          lastRenderedState: ee
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
          lastRenderedReducer: va,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function pd(e) {
      var t = hd(e);
      t.next === null && (t = e.alternate.memoizedState), Gl(e, t.next.queue, {}, Lt());
    }
    function Kc() {
      return ht(li);
    }
    function gd() {
      return et().memoizedState;
    }
    function yd() {
      return et().memoizedState;
    }
    function Yp(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = Lt();
            e = Ga(a);
            var n = Ya(t, e, a);
            n !== null && (Ct(n, t, a), Ol(n, t, a)), t = {
              cache: wc()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function Qp(e, t, a) {
      var n = Lt();
      a = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Fi(e) ? bd(t, a) : (a = dc(e, t, a, n), a !== null && (Ct(a, e, n), Sd(a, t, n)));
    }
    function vd(e, t, a) {
      var n = Lt();
      Gl(e, t, a, n);
    }
    function Gl(e, t, a, n) {
      var l = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (Fi(e)) bd(t, l);
      else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
          var u = t.lastRenderedState, d = s(u, a);
          if (l.hasEagerState = true, l.eagerState = d, zt(d, u)) return Ri(e, t, l, 0), Ve === null && Ni(), false;
        } catch {
        } finally {
        }
        if (a = dc(e, t, l, n), a !== null) return Ct(a, e, n), Sd(a, t, n), true;
      }
      return false;
    }
    function Jc(e, t, a, n) {
      if (n = {
        lane: 2,
        revertLane: Eu(),
        gesture: null,
        action: n,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Fi(e)) {
        if (t) throw Error(r(479));
      } else t = dc(e, a, n, 2), t !== null && Ct(t, e, 2);
    }
    function Fi(e) {
      var t = e.alternate;
      return e === Se || t !== null && t === Se;
    }
    function bd(e, t) {
      Wn = Yi = true;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Sd(e, t, a) {
      if ((a & 4194048) !== 0) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Ao(e, a);
      }
    }
    var Yl = {
      readContext: ht,
      use: Xi,
      useCallback: Ie,
      useContext: Ie,
      useEffect: Ie,
      useImperativeHandle: Ie,
      useLayoutEffect: Ie,
      useInsertionEffect: Ie,
      useMemo: Ie,
      useReducer: Ie,
      useRef: Ie,
      useState: Ie,
      useDebugValue: Ie,
      useDeferredValue: Ie,
      useTransition: Ie,
      useSyncExternalStore: Ie,
      useId: Ie,
      useHostTransitionStatus: Ie,
      useFormState: Ie,
      useActionState: Ie,
      useOptimistic: Ie,
      useMemoCache: Ie,
      useCacheRefresh: Ie
    };
    Yl.useEffectEvent = Ie;
    var xd = {
      readContext: ht,
      use: Xi,
      useCallback: function(e, t) {
        return bt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: ht,
      useEffect: ld,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([
          e
        ]) : null, Ki(4194308, 4, ud.bind(null, t, e), a);
      },
      useLayoutEffect: function(e, t) {
        return Ki(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        Ki(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var a = bt();
        t = t === void 0 ? null : t;
        var n = e();
        if (wn) {
          Da(true);
          try {
            e();
          } finally {
            Da(false);
          }
        }
        return a.memoizedState = [
          n,
          t
        ], n;
      },
      useReducer: function(e, t, a) {
        var n = bt();
        if (a !== void 0) {
          var l = a(t);
          if (wn) {
            Da(true);
            try {
              a(t);
            } finally {
              Da(false);
            }
          }
        } else l = t;
        return n.memoizedState = n.baseState = l, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: l
        }, n.queue = e, e = e.dispatch = Qp.bind(null, Se, e), [
          n.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = bt();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: function(e) {
        e = Gc(e);
        var t = e.queue, a = vd.bind(null, Se, t);
        return t.dispatch = a, [
          e.memoizedState,
          a
        ];
      },
      useDebugValue: Vc,
      useDeferredValue: function(e, t) {
        var a = bt();
        return Xc(a, e, t);
      },
      useTransition: function() {
        var e = Gc(false);
        return e = md.bind(null, Se, e.queue, true, false), bt().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, a) {
        var n = Se, l = bt();
        if (De) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (a = t(), Ve === null) throw Error(r(349));
          (Te & 127) !== 0 || Yr(n, t, a);
        }
        l.memoizedState = a;
        var s = {
          value: a,
          getSnapshot: t
        };
        return l.queue = s, ld(Vr.bind(null, n, s, e), [
          e
        ]), n.flags |= 2048, el(9, {
          destroy: void 0
        }, Qr.bind(null, n, s, a, t), null), a;
      },
      useId: function() {
        var e = bt(), t = Ve.identifierPrefix;
        if (De) {
          var a = na, n = aa;
          a = (n & ~(1 << 32 - Tt(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Qi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
        } else a = Op++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Kc,
      useFormState: Pr,
      useActionState: Pr,
      useOptimistic: function(e) {
        var t = bt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = a, t = Jc.bind(null, Se, true, a), a.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: qc,
      useCacheRefresh: function() {
        return bt().memoizedState = Yp.bind(null, Se);
      },
      useEffectEvent: function(e) {
        var t = bt(), a = {
          impl: e
        };
        return t.memoizedState = a, function() {
          if ((Oe & 2) !== 0) throw Error(r(440));
          return a.impl.apply(void 0, arguments);
        };
      }
    }, Fc = {
      readContext: ht,
      use: Xi,
      useCallback: rd,
      useContext: ht,
      useEffect: Qc,
      useImperativeHandle: od,
      useInsertionEffect: sd,
      useLayoutEffect: cd,
      useMemo: dd,
      useReducer: Zi,
      useRef: nd,
      useState: function() {
        return Zi(va);
      },
      useDebugValue: Vc,
      useDeferredValue: function(e, t) {
        var a = et();
        return fd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Zi(va)[0], t = et().memoizedState;
        return [
          typeof e == "boolean" ? e : Hl(e),
          t
        ];
      },
      useSyncExternalStore: Gr,
      useId: gd,
      useHostTransitionStatus: Kc,
      useFormState: ed,
      useActionState: ed,
      useOptimistic: function(e, t) {
        var a = et();
        return Kr(a, He, e, t);
      },
      useMemoCache: qc,
      useCacheRefresh: yd
    };
    Fc.useEffectEvent = id;
    var wd = {
      readContext: ht,
      use: Xi,
      useCallback: rd,
      useContext: ht,
      useEffect: Qc,
      useImperativeHandle: od,
      useInsertionEffect: sd,
      useLayoutEffect: cd,
      useMemo: dd,
      useReducer: Hc,
      useRef: nd,
      useState: function() {
        return Hc(va);
      },
      useDebugValue: Vc,
      useDeferredValue: function(e, t) {
        var a = et();
        return He === null ? Xc(a, e, t) : fd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Hc(va)[0], t = et().memoizedState;
        return [
          typeof e == "boolean" ? e : Hl(e),
          t
        ];
      },
      useSyncExternalStore: Gr,
      useId: gd,
      useHostTransitionStatus: Kc,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function(e, t) {
        var a = et();
        return He !== null ? Kr(a, He, e, t) : (a.baseState = e, [
          e,
          a.queue.dispatch
        ]);
      },
      useMemoCache: qc,
      useCacheRefresh: yd
    };
    wd.useEffectEvent = id;
    function $c(e, t, a, n) {
      t = e.memoizedState, a = a(n, t), a = a == null ? t : G({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
    }
    var Ic = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var n = Lt(), l = Ga(n);
        l.payload = t, a != null && (l.callback = a), t = Ya(e, l, n), t !== null && (Ct(t, e, n), Ol(t, e, n));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var n = Lt(), l = Ga(n);
        l.tag = 1, l.payload = t, a != null && (l.callback = a), t = Ya(e, l, n), t !== null && (Ct(t, e, n), Ol(t, e, n));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Lt(), n = Ga(a);
        n.tag = 2, t != null && (n.callback = t), t = Ya(e, n, a), t !== null && (Ct(t, e, a), Ol(t, e, a));
      }
    };
    function Md(e, t, a, n, l, s, u) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, s, u) : t.prototype && t.prototype.isPureReactComponent ? !Nl(a, n) || !Nl(l, s) : true;
    }
    function jd(e, t, a, n) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && Ic.enqueueReplaceState(t, t.state, null);
    }
    function Mn(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var n in t) n !== "ref" && (a[n] = t[n]);
      }
      if (e = e.defaultProps) {
        a === t && (a = G({}, a));
        for (var l in e) a[l] === void 0 && (a[l] = e[l]);
      }
      return a;
    }
    function Ad(e) {
      Ci(e);
    }
    function Ed(e) {
      console.error(e);
    }
    function Cd(e) {
      Ci(e);
    }
    function $i(e, t) {
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
    function Nd(e, t, a) {
      try {
        var n = e.onCaughtError;
        n(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (l) {
        setTimeout(function() {
          throw l;
        });
      }
    }
    function Wc(e, t, a) {
      return a = Ga(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        $i(e, t);
      }, a;
    }
    function Rd(e) {
      return e = Ga(e), e.tag = 3, e;
    }
    function Td(e, t, a, n) {
      var l = a.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var s = n.value;
        e.payload = function() {
          return l(s);
        }, e.callback = function() {
          Nd(t, a, n);
        };
      }
      var u = a.stateNode;
      u !== null && typeof u.componentDidCatch == "function" && (e.callback = function() {
        Nd(t, a, n), typeof l != "function" && (Ja === null ? Ja = /* @__PURE__ */ new Set([
          this
        ]) : Ja.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function Vp(e, t, a, n, l) {
      if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (t = a.alternate, t !== null && Zn(t, a, l, true), a = Dt.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return Zt === null ? us() : a.alternate === null && We === 0 && (We = 3), a.flags &= -257, a.flags |= 65536, a.lanes = l, n === Li ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([
                n
              ]) : t.add(n), Mu(e, n, l)), false;
            case 22:
              return a.flags |= 65536, n === Li ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  n
                ])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([
                n
              ]) : a.add(n)), Mu(e, n, l)), false;
          }
          throw Error(r(435, a.tag));
        }
        return Mu(e, n, l), us(), false;
      }
      if (De) return t = Dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, n !== yc && (e = Error(r(422), {
        cause: n
      }), zl(Yt(e, a)))) : (n !== yc && (t = Error(r(423), {
        cause: n
      }), zl(Yt(t, a))), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, n = Yt(n, a), l = Wc(e.stateNode, n, l), Nc(e, l), We !== 4 && (We = 2)), false;
      var s = Error(r(520), {
        cause: n
      });
      if (s = Yt(s, a), $l === null ? $l = [
        s
      ] : $l.push(s), We !== 4 && (We = 2), t === null) return true;
      n = Yt(n, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = l & -l, a.lanes |= e, e = Wc(a.stateNode, n, e), Nc(a, e), false;
          case 1:
            if (t = a.type, s = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Ja === null || !Ja.has(s)))) return a.flags |= 65536, l &= -l, a.lanes |= l, l = Rd(l), Td(l, e, a, n), Nc(a, l), false;
        }
        a = a.return;
      } while (a !== null);
      return false;
    }
    var Pc = Error(r(461)), st = false;
    function pt(e, t, a, n) {
      t.child = e === null ? Ur(t, null, a, n) : xn(t, e.child, a, n);
    }
    function zd(e, t, a, n, l) {
      a = a.render;
      var s = t.ref;
      if ("ref" in n) {
        var u = {};
        for (var d in n) d !== "ref" && (u[d] = n[d]);
      } else u = n;
      return yn(t), n = Uc(e, t, a, u, s, l), d = kc(), e !== null && !st ? (Oc(e, t, l), ba(e, t, l)) : (De && d && pc(t), t.flags |= 1, pt(e, t, n, l), t.child);
    }
    function _d(e, t, a, n, l) {
      if (e === null) {
        var s = a.type;
        return typeof s == "function" && !fc(s) && s.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = s, Dd(e, t, s, n, l)) : (e = zi(a.type, null, n, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (s = e.child, !cu(e, l)) {
        var u = s.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Nl, a(u, n) && e.ref === t.ref) return ba(e, t, l);
      }
      return t.flags |= 1, e = ma(s, n), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Dd(e, t, a, n, l) {
      if (e !== null) {
        var s = e.memoizedProps;
        if (Nl(s, n) && e.ref === t.ref) if (st = false, t.pendingProps = n = s, cu(e, l)) (e.flags & 131072) !== 0 && (st = true);
        else return t.lanes = e.lanes, ba(e, t, l);
      }
      return eu(e, t, a, n, l);
    }
    function Ud(e, t, a, n) {
      var l = n.children, s = e !== null ? e.memoizedState : null;
      if (e === null && t.stateNode === null && (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), n.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (s = s !== null ? s.baseLanes | a : a, e !== null) {
            for (n = t.child = e.child, l = 0; n !== null; ) l = l | n.lanes | n.childLanes, n = n.sibling;
            n = l & ~s;
          } else n = 0, t.child = null;
          return kd(e, t, s, a, n);
        }
        if ((a & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && ki(t, s !== null ? s.cachePool : null), s !== null ? Lr(t, s) : Tc(), qr(t);
        else return n = t.lanes = 536870912, kd(e, t, s !== null ? s.baseLanes | a : a, a, n);
      } else s !== null ? (ki(t, s.cachePool), Lr(t, s), Va(), t.memoizedState = null) : (e !== null && ki(t, null), Tc(), Va());
      return pt(e, t, l, a), t.child;
    }
    function Ql(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function kd(e, t, a, n, l) {
      var s = jc();
      return s = s === null ? null : {
        parent: lt._currentValue,
        pool: s
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: s
      }, e !== null && ki(t, null), Tc(), qr(t), e !== null && Zn(e, t, n, true), t.childLanes = l, null;
    }
    function Ii(e, t) {
      return t = Pi({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Od(e, t, a) {
      return xn(t, e.child, null, a), e = Ii(t, t.pendingProps), e.flags |= 2, Ut(t), t.memoizedState = null, e;
    }
    function Xp(e, t, a) {
      var n = t.pendingProps, l = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (De) {
          if (n.mode === "hidden") return e = Ii(t, n), t.lanes = 536870912, Ql(null, e);
          if (_c(t), (e = Je) ? (e = Ff(e, Xt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Oa !== null ? {
              id: aa,
              overflow: na
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = br(e), a.return = t, t.child = a, mt = t, Je = null)) : e = null, e === null) throw qa(t);
          return t.lanes = 536870912, null;
        }
        return Ii(t, n);
      }
      var s = e.memoizedState;
      if (s !== null) {
        var u = s.dehydrated;
        if (_c(t), l) if (t.flags & 256) t.flags &= -257, t = Od(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
        else if (st || Zn(e, t, a, false), l = (a & e.childLanes) !== 0, st || l) {
          if (n = Ve, n !== null && (u = Eo(n, a), u !== 0 && u !== s.retryLane)) throw s.retryLane = u, mn(e, u), Ct(n, e, u), Pc;
          us(), t = Od(e, t, a);
        } else e = s.treeContext, Je = Kt(u.nextSibling), mt = t, De = true, La = null, Xt = false, e !== null && wr(t, e), t = Ii(t, n), t.flags |= 4096;
        return t;
      }
      return e = ma(e.child, {
        mode: n.mode,
        children: n.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function Wi(e, t) {
      var a = t.ref;
      if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object") throw Error(r(284));
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function eu(e, t, a, n, l) {
      return yn(t), a = Uc(e, t, a, n, void 0, l), n = kc(), e !== null && !st ? (Oc(e, t, l), ba(e, t, l)) : (De && n && pc(t), t.flags |= 1, pt(e, t, a, l), t.child);
    }
    function Ld(e, t, a, n, l, s) {
      return yn(t), t.updateQueue = null, a = Hr(t, n, a, l), Br(e), n = kc(), e !== null && !st ? (Oc(e, t, s), ba(e, t, s)) : (De && n && pc(t), t.flags |= 1, pt(e, t, a, s), t.child);
    }
    function qd(e, t, a, n, l) {
      if (yn(t), t.stateNode === null) {
        var s = Yn, u = a.contextType;
        typeof u == "object" && u !== null && (s = ht(u)), s = new a(n, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Ic, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = n, s.state = t.memoizedState, s.refs = {}, Ec(t), u = a.contextType, s.context = typeof u == "object" && u !== null ? ht(u) : Yn, s.state = t.memoizedState, u = a.getDerivedStateFromProps, typeof u == "function" && ($c(t, a, u, n), s.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (u = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), u !== s.state && Ic.enqueueReplaceState(s, s.state, null), ql(t, n, s, l), Ll(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = true;
      } else if (e === null) {
        s = t.stateNode;
        var d = t.memoizedProps, h = Mn(a, d);
        s.props = h;
        var T = s.context, O = a.contextType;
        u = Yn, typeof O == "object" && O !== null && (u = ht(O));
        var Q = a.getDerivedStateFromProps;
        O = typeof Q == "function" || typeof s.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, O || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d || T !== u) && jd(t, s, n, u), Ha = false;
        var z = t.memoizedState;
        s.state = z, ql(t, n, s, l), Ll(), T = t.memoizedState, d || z !== T || Ha ? (typeof Q == "function" && ($c(t, a, Q, n), T = t.memoizedState), (h = Ha || Md(t, a, h, n, z, T, u)) ? (O || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = T), s.props = n, s.state = T, s.context = u, n = h) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = false);
      } else {
        s = t.stateNode, Cc(e, t), u = t.memoizedProps, O = Mn(a, u), s.props = O, Q = t.pendingProps, z = s.context, T = a.contextType, h = Yn, typeof T == "object" && T !== null && (h = ht(T)), d = a.getDerivedStateFromProps, (T = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (u !== Q || z !== h) && jd(t, s, n, h), Ha = false, z = t.memoizedState, s.state = z, ql(t, n, s, l), Ll();
        var U = t.memoizedState;
        u !== Q || z !== U || Ha || e !== null && e.dependencies !== null && Di(e.dependencies) ? (typeof d == "function" && ($c(t, a, d, n), U = t.memoizedState), (O = Ha || Md(t, a, O, n, z, U, h) || e !== null && e.dependencies !== null && Di(e.dependencies)) ? (T || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(n, U, h), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(n, U, h)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || u === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = U), s.props = n, s.state = U, s.context = h, n = O) : (typeof s.componentDidUpdate != "function" || u === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), n = false);
      }
      return s = n, Wi(e, t), n = (t.flags & 128) !== 0, s || n ? (s = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && n ? (t.child = xn(t, e.child, null, l), t.child = xn(t, null, a, l)) : pt(e, t, a, l), t.memoizedState = s.state, e = t.child) : e = ba(e, t, l), e;
    }
    function Bd(e, t, a, n) {
      return pn(), t.flags |= 256, pt(e, t, a, n), t.child;
    }
    var tu = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function au(e) {
      return {
        baseLanes: e,
        cachePool: Nr()
      };
    }
    function nu(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ot), e;
    }
    function Hd(e, t, a) {
      var n = t.pendingProps, l = false, s = (t.flags & 128) !== 0, u;
      if ((u = s) || (u = e !== null && e.memoizedState === null ? false : (Pe.current & 2) !== 0), u && (l = true, t.flags &= -129), u = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (De) {
          if (l ? Qa(t) : Va(), (e = Je) ? (e = Ff(e, Xt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Oa !== null ? {
              id: aa,
              overflow: na
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = br(e), a.return = t, t.child = a, mt = t, Je = null)) : e = null, e === null) throw qa(t);
          return Bu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var d = n.children;
        return n = n.fallback, l ? (Va(), l = t.mode, d = Pi({
          mode: "hidden",
          children: d
        }, l), n = hn(n, l, a, null), d.return = t, n.return = t, d.sibling = n, t.child = d, n = t.child, n.memoizedState = au(a), n.childLanes = nu(e, u, a), t.memoizedState = tu, Ql(null, n)) : (Qa(t), lu(t, d));
      }
      var h = e.memoizedState;
      if (h !== null && (d = h.dehydrated, d !== null)) {
        if (s) t.flags & 256 ? (Qa(t), t.flags &= -257, t = iu(e, t, a)) : t.memoizedState !== null ? (Va(), t.child = e.child, t.flags |= 128, t = null) : (Va(), d = n.fallback, l = t.mode, n = Pi({
          mode: "visible",
          children: n.children
        }, l), d = hn(d, l, a, null), d.flags |= 2, n.return = t, d.return = t, n.sibling = d, t.child = n, xn(t, e.child, null, a), n = t.child, n.memoizedState = au(a), n.childLanes = nu(e, u, a), t.memoizedState = tu, t = Ql(null, n));
        else if (Qa(t), Bu(d)) {
          if (u = d.nextSibling && d.nextSibling.dataset, u) var T = u.dgst;
          u = T, n = Error(r(419)), n.stack = "", n.digest = u, zl({
            value: n,
            source: null,
            stack: null
          }), t = iu(e, t, a);
        } else if (st || Zn(e, t, a, false), u = (a & e.childLanes) !== 0, st || u) {
          if (u = Ve, u !== null && (n = Eo(u, a), n !== 0 && n !== h.retryLane)) throw h.retryLane = n, mn(e, n), Ct(u, e, n), Pc;
          qu(d) || us(), t = iu(e, t, a);
        } else qu(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = h.treeContext, Je = Kt(d.nextSibling), mt = t, De = true, La = null, Xt = false, e !== null && wr(t, e), t = lu(t, n.children), t.flags |= 4096);
        return t;
      }
      return l ? (Va(), d = n.fallback, l = t.mode, h = e.child, T = h.sibling, n = ma(h, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = h.subtreeFlags & 65011712, T !== null ? d = ma(T, d) : (d = hn(d, l, a, null), d.flags |= 2), d.return = t, n.return = t, n.sibling = d, t.child = n, Ql(null, n), n = t.child, d = e.child.memoizedState, d === null ? d = au(a) : (l = d.cachePool, l !== null ? (h = lt._currentValue, l = l.parent !== h ? {
        parent: h,
        pool: h
      } : l) : l = Nr(), d = {
        baseLanes: d.baseLanes | a,
        cachePool: l
      }), n.memoizedState = d, n.childLanes = nu(e, u, a), t.memoizedState = tu, Ql(e.child, n)) : (Qa(t), a = e.child, e = a.sibling, a = ma(a, {
        mode: "visible",
        children: n.children
      }), a.return = t, a.sibling = null, e !== null && (u = t.deletions, u === null ? (t.deletions = [
        e
      ], t.flags |= 16) : u.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function lu(e, t) {
      return t = Pi({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function Pi(e, t) {
      return e = _t(22, e, null, t), e.lanes = 0, e;
    }
    function iu(e, t, a) {
      return xn(t, e.child, null, a), e = lu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Gd(e, t, a) {
      e.lanes |= t;
      var n = e.alternate;
      n !== null && (n.lanes |= t), Sc(e.return, t, a);
    }
    function su(e, t, a, n, l, s) {
      var u = e.memoizedState;
      u === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: a,
        tailMode: l,
        treeForkCount: s
      } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = n, u.tail = a, u.tailMode = l, u.treeForkCount = s);
    }
    function Yd(e, t, a) {
      var n = t.pendingProps, l = n.revealOrder, s = n.tail;
      n = n.children;
      var u = Pe.current, d = (u & 2) !== 0;
      if (d ? (u = u & 1 | 2, t.flags |= 128) : u &= 1, P(Pe, u), pt(e, t, n, a), n = De ? Tl : 0, !d && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Gd(e, a, t);
        else if (e.tag === 19) Gd(e, a, t);
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
      switch (l) {
        case "forwards":
          for (a = t.child, l = null; a !== null; ) e = a.alternate, e !== null && Gi(e) === null && (l = a), a = a.sibling;
          a = l, a === null ? (l = t.child, t.child = null) : (l = a.sibling, a.sibling = null), su(t, false, l, a, s, n);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, l = t.child, t.child = null; l !== null; ) {
            if (e = l.alternate, e !== null && Gi(e) === null) {
              t.child = l;
              break;
            }
            e = l.sibling, l.sibling = a, a = l, l = e;
          }
          su(t, true, a, null, s, n);
          break;
        case "together":
          su(t, false, null, null, void 0, n);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function ba(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ka |= t.lanes, (a & t.childLanes) === 0) if (e !== null) {
        if (Zn(e, t, a, false), (a & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (e = t.child, a = ma(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; ) e = e.sibling, a = a.sibling = ma(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function cu(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Di(e)));
    }
    function Zp(e, t, a) {
      switch (t.tag) {
        case 3:
          at(t, t.stateNode.containerInfo), Ba(t, lt, e.memoizedState.cache), pn();
          break;
        case 27:
        case 5:
          vt(t);
          break;
        case 4:
          at(t, t.stateNode.containerInfo);
          break;
        case 10:
          Ba(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, _c(t), null;
          break;
        case 13:
          var n = t.memoizedState;
          if (n !== null) return n.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Hd(e, t, a) : (Qa(t), e = ba(e, t, a), e !== null ? e.sibling : null);
          Qa(t);
          break;
        case 19:
          var l = (e.flags & 128) !== 0;
          if (n = (a & t.childLanes) !== 0, n || (Zn(e, t, a, false), n = (a & t.childLanes) !== 0), l) {
            if (n) return Yd(e, t, a);
            t.flags |= 128;
          }
          if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), P(Pe, Pe.current), n) break;
          return null;
        case 22:
          return t.lanes = 0, Ud(e, t, a, t.pendingProps);
        case 24:
          Ba(t, lt, e.memoizedState.cache);
      }
      return ba(e, t, a);
    }
    function Qd(e, t, a) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) st = true;
      else {
        if (!cu(e, a) && (t.flags & 128) === 0) return st = false, Zp(e, t, a);
        st = (e.flags & 131072) !== 0;
      }
      else st = false, De && (t.flags & 1048576) !== 0 && xr(t, Tl, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var n = t.pendingProps;
            if (e = bn(t.elementType), t.type = e, typeof e == "function") fc(e) ? (n = Mn(e, n), t.tag = 1, t = qd(null, t, e, n, a)) : (t.tag = 0, t = eu(null, t, e, n, a));
            else {
              if (e != null) {
                var l = e.$$typeof;
                if (l === se) {
                  t.tag = 11, t = zd(null, t, e, n, a);
                  break e;
                } else if (l === _) {
                  t.tag = 14, t = _d(null, t, e, n, a);
                  break e;
                }
              }
              throw t = je(e) || e, Error(r(306, t, ""));
            }
          }
          return t;
        case 0:
          return eu(e, t, t.type, t.pendingProps, a);
        case 1:
          return n = t.type, l = Mn(n, t.pendingProps), qd(e, t, n, l, a);
        case 3:
          e: {
            if (at(t, t.stateNode.containerInfo), e === null) throw Error(r(387));
            n = t.pendingProps;
            var s = t.memoizedState;
            l = s.element, Cc(e, t), ql(t, n, null, a);
            var u = t.memoizedState;
            if (n = u.cache, Ba(t, lt, n), n !== s.cache && xc(t, [
              lt
            ], a, true), Ll(), n = u.element, s.isDehydrated) if (s = {
              element: n,
              isDehydrated: false,
              cache: u.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = Bd(e, t, n, a);
              break e;
            } else if (n !== l) {
              l = Yt(Error(r(424)), t), zl(l), t = Bd(e, t, n, a);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Je = Kt(e.firstChild), mt = t, De = true, La = null, Xt = true, a = Ur(t, null, n, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
            else {
              if (pn(), n === l) {
                t = ba(e, t, a);
                break e;
              }
              pt(e, t, n, a);
            }
            t = t.child;
          }
          return t;
        case 26:
          return Wi(e, t), e === null ? (a = tm(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : De || (a = t.type, e = t.pendingProps, n = ps(be.current).createElement(a), n[ft] = t, n[xt] = e, gt(n, a, e), ot(n), t.stateNode = n) : t.memoizedState = tm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return vt(t), e === null && De && (n = t.stateNode = Wf(t.type, t.pendingProps, be.current), mt = t, Xt = true, l = Je, Wa(t.type) ? (Hu = l, Je = Kt(n.firstChild)) : Je = l), pt(e, t, t.pendingProps.children, a), Wi(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && De && ((l = n = Je) && (n = wg(n, t.type, t.pendingProps, Xt), n !== null ? (t.stateNode = n, mt = t, Je = Kt(n.firstChild), Xt = false, l = true) : l = false), l || qa(t)), vt(t), l = t.type, s = t.pendingProps, u = e !== null ? e.memoizedProps : null, n = s.children, ku(l, s) ? n = null : u !== null && ku(l, u) && (t.flags |= 32), t.memoizedState !== null && (l = Uc(e, t, Lp, null, null, a), li._currentValue = l), Wi(e, t), pt(e, t, n, a), t.child;
        case 6:
          return e === null && De && ((e = a = Je) && (a = Mg(a, t.pendingProps, Xt), a !== null ? (t.stateNode = a, mt = t, Je = null, e = true) : e = false), e || qa(t)), null;
        case 13:
          return Hd(e, t, a);
        case 4:
          return at(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = xn(t, null, n, a) : pt(e, t, n, a), t.child;
        case 11:
          return zd(e, t, t.type, t.pendingProps, a);
        case 7:
          return pt(e, t, t.pendingProps, a), t.child;
        case 8:
          return pt(e, t, t.pendingProps.children, a), t.child;
        case 12:
          return pt(e, t, t.pendingProps.children, a), t.child;
        case 10:
          return n = t.pendingProps, Ba(t, t.type, n.value), pt(e, t, n.children, a), t.child;
        case 9:
          return l = t.type._context, n = t.pendingProps.children, yn(t), l = ht(l), n = n(l), t.flags |= 1, pt(e, t, n, a), t.child;
        case 14:
          return _d(e, t, t.type, t.pendingProps, a);
        case 15:
          return Dd(e, t, t.type, t.pendingProps, a);
        case 19:
          return Yd(e, t, a);
        case 31:
          return Xp(e, t, a);
        case 22:
          return Ud(e, t, a, t.pendingProps);
        case 24:
          return yn(t), n = ht(lt), e === null ? (l = jc(), l === null && (l = Ve, s = wc(), l.pooledCache = s, s.refCount++, s !== null && (l.pooledCacheLanes |= a), l = s), t.memoizedState = {
            parent: n,
            cache: l
          }, Ec(t), Ba(t, lt, l)) : ((e.lanes & a) !== 0 && (Cc(e, t), ql(t, null, null, a), Ll()), l = e.memoizedState, s = t.memoizedState, l.parent !== n ? (l = {
            parent: n,
            cache: n
          }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), Ba(t, lt, n)) : (n = s.cache, Ba(t, lt, n), n !== l.cache && xc(t, [
            lt
          ], a, true))), pt(e, t, t.pendingProps.children, a), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(r(156, t.tag));
    }
    function Sa(e) {
      e.flags |= 4;
    }
    function uu(e, t, a, n, l) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (l & 335544128) === l) if (e.stateNode.complete) e.flags |= 8192;
        else if (yf()) e.flags |= 8192;
        else throw Sn = Li, Ac;
      } else e.flags &= -16777217;
    }
    function Vd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !sm(t)) if (yf()) e.flags |= 8192;
      else throw Sn = Li, Ac;
    }
    function es(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Mo() : 536870912, e.lanes |= t, ll |= t);
    }
    function Vl(e, t) {
      if (!De) switch (e.tailMode) {
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
    function Fe(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, n = 0;
      if (t) for (var l = e.child; l !== null; ) a |= l.lanes | l.childLanes, n |= l.subtreeFlags & 65011712, n |= l.flags & 65011712, l.return = e, l = l.sibling;
      else for (l = e.child; l !== null; ) a |= l.lanes | l.childLanes, n |= l.subtreeFlags, n |= l.flags, l.return = e, l = l.sibling;
      return e.subtreeFlags |= n, e.childLanes = a, t;
    }
    function Kp(e, t, a) {
      var n = t.pendingProps;
      switch (gc(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Fe(t), null;
        case 1:
          return Fe(t), null;
        case 3:
          return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ga(lt), Ke(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Xn(t) ? Sa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vc())), Fe(t), null;
        case 26:
          var l = t.type, s = t.memoizedState;
          return e === null ? (Sa(t), s !== null ? (Fe(t), Vd(t, s)) : (Fe(t), uu(t, l, null, n, a))) : s ? s !== e.memoizedState ? (Sa(t), Fe(t), Vd(t, s)) : (Fe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Sa(t), Fe(t), uu(t, l, e, n, a)), null;
        case 27:
          if (Ta(t), a = be.current, l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Fe(t), null;
            }
            e = ie.current, Xn(t) ? Mr(t) : (e = Wf(l, n, a), t.stateNode = e, Sa(t));
          }
          return Fe(t), null;
        case 5:
          if (Ta(t), l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Fe(t), null;
            }
            if (s = ie.current, Xn(t)) Mr(t);
            else {
              var u = ps(be.current);
              switch (s) {
                case 1:
                  s = u.createElementNS("http://www.w3.org/2000/svg", l);
                  break;
                case 2:
                  s = u.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                  break;
                default:
                  switch (l) {
                    case "svg":
                      s = u.createElementNS("http://www.w3.org/2000/svg", l);
                      break;
                    case "math":
                      s = u.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                      break;
                    case "script":
                      s = u.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(s.firstChild);
                      break;
                    case "select":
                      s = typeof n.is == "string" ? u.createElement("select", {
                        is: n.is
                      }) : u.createElement("select"), n.multiple ? s.multiple = true : n.size && (s.size = n.size);
                      break;
                    default:
                      s = typeof n.is == "string" ? u.createElement(l, {
                        is: n.is
                      }) : u.createElement(l);
                  }
              }
              s[ft] = t, s[xt] = n;
              e: for (u = t.child; u !== null; ) {
                if (u.tag === 5 || u.tag === 6) s.appendChild(u.stateNode);
                else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                  u.child.return = u, u = u.child;
                  continue;
                }
                if (u === t) break e;
                for (; u.sibling === null; ) {
                  if (u.return === null || u.return === t) break e;
                  u = u.return;
                }
                u.sibling.return = u.return, u = u.sibling;
              }
              t.stateNode = s;
              e: switch (gt(s, l, n), l) {
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
              n && Sa(t);
            }
          }
          return Fe(t), uu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (typeof n != "string" && t.stateNode === null) throw Error(r(166));
            if (e = be.current, Xn(t)) {
              if (e = t.stateNode, a = t.memoizedProps, n = null, l = mt, l !== null) switch (l.tag) {
                case 27:
                case 5:
                  n = l.memoizedProps;
              }
              e[ft] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === true || Gf(e.nodeValue, a)), e || qa(t, true);
            } else e = ps(e).createTextNode(n), e[ft] = t, t.stateNode = e;
          }
          return Fe(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = Xn(t), a !== null) {
              if (e === null) {
                if (!n) throw Error(r(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
                e[ft] = t;
              } else pn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Fe(t), e = false;
            } else a = vc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = true;
            if (!e) return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
            if ((t.flags & 128) !== 0) throw Error(r(558));
          }
          return Fe(t), null;
        case 13:
          if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (l = Xn(t), n !== null && n.dehydrated !== null) {
              if (e === null) {
                if (!l) throw Error(r(318));
                if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(317));
                l[ft] = t;
              } else pn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Fe(t), l = false;
            } else l = vc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = true;
            if (!l) return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
          }
          return Ut(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, l = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (l = n.alternate.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== l && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), es(t, t.updateQueue), Fe(t), null);
        case 4:
          return Ke(), e === null && Tu(t.stateNode.containerInfo), Fe(t), null;
        case 10:
          return ga(t.type), Fe(t), null;
        case 19:
          if (B(Pe), n = t.memoizedState, n === null) return Fe(t), null;
          if (l = (t.flags & 128) !== 0, s = n.rendering, s === null) if (l) Vl(n, false);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (s = Gi(e), s !== null) {
                for (t.flags |= 128, Vl(n, false), e = s.updateQueue, t.updateQueue = e, es(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; ) vr(a, e), a = a.sibling;
                return P(Pe, Pe.current & 1 | 2), De && ha(t, n.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            n.tail !== null && te() > is && (t.flags |= 128, l = true, Vl(n, false), t.lanes = 4194304);
          }
          else {
            if (!l) if (e = Gi(s), e !== null) {
              if (t.flags |= 128, l = true, e = e.updateQueue, t.updateQueue = e, es(t, e), Vl(n, true), n.tail === null && n.tailMode === "hidden" && !s.alternate && !De) return Fe(t), null;
            } else 2 * te() - n.renderingStartTime > is && a !== 536870912 && (t.flags |= 128, l = true, Vl(n, false), t.lanes = 4194304);
            n.isBackwards ? (s.sibling = t.child, t.child = s) : (e = n.last, e !== null ? e.sibling = s : t.child = s, n.last = s);
          }
          return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = te(), e.sibling = null, a = Pe.current, P(Pe, l ? a & 1 | 2 : a & 1), De && ha(t, n.treeForkCount), e) : (Fe(t), null);
        case 22:
        case 23:
          return Ut(t), zc(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Fe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fe(t), a = t.updateQueue, a !== null && es(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && B(vn), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ga(lt), Fe(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function Jp(e, t) {
      switch (gc(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return ga(lt), Ke(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Ta(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (Ut(t), t.alternate === null) throw Error(r(340));
            pn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (Ut(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(r(340));
            pn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return B(Pe), null;
        case 4:
          return Ke(), null;
        case 10:
          return ga(t.type), null;
        case 22:
        case 23:
          return Ut(t), zc(), e !== null && B(vn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return ga(lt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Xd(e, t) {
      switch (gc(t), t.tag) {
        case 3:
          ga(lt), Ke();
          break;
        case 26:
        case 27:
        case 5:
          Ta(t);
          break;
        case 4:
          Ke();
          break;
        case 31:
          t.memoizedState !== null && Ut(t);
          break;
        case 13:
          Ut(t);
          break;
        case 19:
          B(Pe);
          break;
        case 10:
          ga(t.type);
          break;
        case 22:
        case 23:
          Ut(t), zc(), e !== null && B(vn);
          break;
        case 24:
          ga(lt);
      }
    }
    function Xl(e, t) {
      try {
        var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var l = n.next;
          a = l;
          do {
            if ((a.tag & e) === e) {
              n = void 0;
              var s = a.create, u = a.inst;
              n = s(), u.destroy = n;
            }
            a = a.next;
          } while (a !== l);
        }
      } catch (d) {
        Be(t, t.return, d);
      }
    }
    function Xa(e, t, a) {
      try {
        var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
        if (l !== null) {
          var s = l.next;
          n = s;
          do {
            if ((n.tag & e) === e) {
              var u = n.inst, d = u.destroy;
              if (d !== void 0) {
                u.destroy = void 0, l = t;
                var h = a, T = d;
                try {
                  T();
                } catch (O) {
                  Be(l, h, O);
                }
              }
            }
            n = n.next;
          } while (n !== s);
        }
      } catch (O) {
        Be(t, t.return, O);
      }
    }
    function Zd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        try {
          Or(t, a);
        } catch (n) {
          Be(e, e.return, n);
        }
      }
    }
    function Kd(e, t, a) {
      a.props = Mn(e.type, e.memoizedProps), a.state = e.memoizedState;
      try {
        a.componentWillUnmount();
      } catch (n) {
        Be(e, t, n);
      }
    }
    function Zl(e, t) {
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
      } catch (l) {
        Be(e, t, l);
      }
    }
    function la(e, t) {
      var a = e.ref, n = e.refCleanup;
      if (a !== null) if (typeof n == "function") try {
        n();
      } catch (l) {
        Be(e, t, l);
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
      }
      else if (typeof a == "function") try {
        a(null);
      } catch (l) {
        Be(e, t, l);
      }
      else a.current = null;
    }
    function Jd(e) {
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
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    function ou(e, t, a) {
      try {
        var n = e.stateNode;
        gg(n, e.type, a, t), n[xt] = t;
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    function Fd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Wa(e.type) || e.tag === 4;
    }
    function ru(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Fd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Wa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function du(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = da));
      else if (n !== 4 && (n === 27 && Wa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null)) for (du(e, t, a), e = e.sibling; e !== null; ) du(e, t, a), e = e.sibling;
    }
    function ts(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (n !== 4 && (n === 27 && Wa(e.type) && (a = e.stateNode), e = e.child, e !== null)) for (ts(e, t, a), e = e.sibling; e !== null; ) ts(e, t, a), e = e.sibling;
    }
    function $d(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        for (var n = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
        gt(t, n, a), t[ft] = e, t[xt] = a;
      } catch (s) {
        Be(e, e.return, s);
      }
    }
    var xa = false, ct = false, fu = false, Id = typeof WeakSet == "function" ? WeakSet : Set, rt = null;
    function Fp(e, t) {
      if (e = e.containerInfo, Du = ws, e = or(e), ic(e)) {
        if ("selectionStart" in e) var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var l = n.anchorOffset, s = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, s.nodeType;
            } catch {
              a = null;
              break e;
            }
            var u = 0, d = -1, h = -1, T = 0, O = 0, Q = e, z = null;
            t: for (; ; ) {
              for (var U; Q !== a || l !== 0 && Q.nodeType !== 3 || (d = u + l), Q !== s || n !== 0 && Q.nodeType !== 3 || (h = u + n), Q.nodeType === 3 && (u += Q.nodeValue.length), (U = Q.firstChild) !== null; ) z = Q, Q = U;
              for (; ; ) {
                if (Q === e) break t;
                if (z === a && ++T === l && (d = u), z === s && ++O === n && (h = u), (U = Q.nextSibling) !== null) break;
                Q = z, z = Q.parentNode;
              }
              Q = U;
            }
            a = d === -1 || h === -1 ? null : {
              start: d,
              end: h
            };
          } else a = null;
        }
        a = a || {
          start: 0,
          end: 0
        };
      } else a = null;
      for (Uu = {
        focusedElem: e,
        selectionRange: a
      }, ws = false, rt = t; rt !== null; ) if (t = rt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, rt = e;
      else for (; rt !== null; ) {
        switch (t = rt, s = t.alternate, e = t.flags, t.tag) {
          case 0:
            if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (a = 0; a < e.length; a++) l = e[a], l.ref.impl = l.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((e & 1024) !== 0 && s !== null) {
              e = void 0, a = t, l = s.memoizedProps, s = s.memoizedState, n = a.stateNode;
              try {
                var ue = Mn(a.type, l);
                e = n.getSnapshotBeforeUpdate(ue, s), n.__reactInternalSnapshotBeforeUpdate = e;
              } catch (pe) {
                Be(a, a.return, pe);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Lu(e);
              else if (a === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Lu(e);
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
            if ((e & 1024) !== 0) throw Error(r(163));
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, rt = e;
          break;
        }
        rt = t.return;
      }
    }
    function Wd(e, t, a) {
      var n = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ma(e, a), n & 4 && Xl(5, a);
          break;
        case 1:
          if (Ma(e, a), n & 4) if (e = a.stateNode, t === null) try {
            e.componentDidMount();
          } catch (u) {
            Be(a, a.return, u);
          }
          else {
            var l = Mn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (u) {
              Be(a, a.return, u);
            }
          }
          n & 64 && Zd(a), n & 512 && Zl(a, a.return);
          break;
        case 3:
          if (Ma(e, a), n & 64 && (e = a.updateQueue, e !== null)) {
            if (t = null, a.child !== null) switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
            try {
              Or(e, t);
            } catch (u) {
              Be(a, a.return, u);
            }
          }
          break;
        case 27:
          t === null && n & 4 && $d(a);
        case 26:
        case 5:
          Ma(e, a), t === null && n & 4 && Jd(a), n & 512 && Zl(a, a.return);
          break;
        case 12:
          Ma(e, a);
          break;
        case 31:
          Ma(e, a), n & 4 && tf(e, a);
          break;
        case 13:
          Ma(e, a), n & 4 && af(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = lg.bind(null, a), jg(e, a))));
          break;
        case 22:
          if (n = a.memoizedState !== null || xa, !n) {
            t = t !== null && t.memoizedState !== null || ct, l = xa;
            var s = ct;
            xa = n, (ct = t) && !s ? ja(e, a, (a.subtreeFlags & 8772) !== 0) : Ma(e, a), xa = l, ct = s;
          }
          break;
        case 30:
          break;
        default:
          Ma(e, a);
      }
    }
    function Pd(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Pd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ys(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var $e = null, Mt = false;
    function wa(e, t, a) {
      for (a = a.child; a !== null; ) ef(e, t, a), a = a.sibling;
    }
    function ef(e, t, a) {
      if (Rt && typeof Rt.onCommitFiberUnmount == "function") try {
        Rt.onCommitFiberUnmount(gl, a);
      } catch {
      }
      switch (a.tag) {
        case 26:
          ct || la(a, t), wa(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          ct || la(a, t);
          var n = $e, l = Mt;
          Wa(a.type) && ($e = a.stateNode, Mt = false), wa(e, t, a), ti(a.stateNode), $e = n, Mt = l;
          break;
        case 5:
          ct || la(a, t);
        case 6:
          if (n = $e, l = Mt, $e = null, wa(e, t, a), $e = n, Mt = l, $e !== null) if (Mt) try {
            ($e.nodeType === 9 ? $e.body : $e.nodeName === "HTML" ? $e.ownerDocument.body : $e).removeChild(a.stateNode);
          } catch (s) {
            Be(a, t, s);
          }
          else try {
            $e.removeChild(a.stateNode);
          } catch (s) {
            Be(a, t, s);
          }
          break;
        case 18:
          $e !== null && (Mt ? (e = $e, Kf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), fl(e)) : Kf($e, a.stateNode));
          break;
        case 4:
          n = $e, l = Mt, $e = a.stateNode.containerInfo, Mt = true, wa(e, t, a), $e = n, Mt = l;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Xa(2, a, t), ct || Xa(4, a, t), wa(e, t, a);
          break;
        case 1:
          ct || (la(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && Kd(a, t, n)), wa(e, t, a);
          break;
        case 21:
          wa(e, t, a);
          break;
        case 22:
          ct = (n = ct) || a.memoizedState !== null, wa(e, t, a), ct = n;
          break;
        default:
          wa(e, t, a);
      }
    }
    function tf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          fl(e);
        } catch (a) {
          Be(t, t.return, a);
        }
      }
    }
    function af(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        fl(e);
      } catch (a) {
        Be(t, t.return, a);
      }
    }
    function $p(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Id()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Id()), t;
        default:
          throw Error(r(435, e.tag));
      }
    }
    function as(e, t) {
      var a = $p(e);
      t.forEach(function(n) {
        if (!a.has(n)) {
          a.add(n);
          var l = ig.bind(null, e, n);
          n.then(l, l);
        }
      });
    }
    function jt(e, t) {
      var a = t.deletions;
      if (a !== null) for (var n = 0; n < a.length; n++) {
        var l = a[n], s = e, u = t, d = u;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Wa(d.type)) {
                $e = d.stateNode, Mt = false;
                break e;
              }
              break;
            case 5:
              $e = d.stateNode, Mt = false;
              break e;
            case 3:
            case 4:
              $e = d.stateNode.containerInfo, Mt = true;
              break e;
          }
          d = d.return;
        }
        if ($e === null) throw Error(r(160));
        ef(s, u, l), $e = null, Mt = false, s = l.alternate, s !== null && (s.return = null), l.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) nf(t, e), t = t.sibling;
    }
    var ea = null;
    function nf(e, t) {
      var a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          jt(t, e), At(e), n & 4 && (Xa(3, e, e.return), Xl(3, e), Xa(5, e, e.return));
          break;
        case 1:
          jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), n & 64 && xa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
          break;
        case 26:
          var l = ea;
          if (jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), n & 4) {
            var s = a !== null ? a.memoizedState : null;
            if (n = e.memoizedState, a === null) if (n === null) if (e.stateNode === null) {
              e: {
                n = e.type, a = e.memoizedProps, l = l.ownerDocument || l;
                t: switch (n) {
                  case "title":
                    s = l.getElementsByTagName("title")[0], (!s || s[bl] || s[ft] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = l.createElement(n), l.head.insertBefore(s, l.querySelector("head > title"))), gt(s, n, a), s[ft] = e, ot(s), n = s;
                    break e;
                  case "link":
                    var u = lm("link", "href", l).get(n + (a.href || ""));
                    if (u) {
                      for (var d = 0; d < u.length; d++) if (s = u[d], s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && s.getAttribute("rel") === (a.rel == null ? null : a.rel) && s.getAttribute("title") === (a.title == null ? null : a.title) && s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                        u.splice(d, 1);
                        break t;
                      }
                    }
                    s = l.createElement(n), gt(s, n, a), l.head.appendChild(s);
                    break;
                  case "meta":
                    if (u = lm("meta", "content", l).get(n + (a.content || ""))) {
                      for (d = 0; d < u.length; d++) if (s = u[d], s.getAttribute("content") === (a.content == null ? null : "" + a.content) && s.getAttribute("name") === (a.name == null ? null : a.name) && s.getAttribute("property") === (a.property == null ? null : a.property) && s.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && s.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                        u.splice(d, 1);
                        break t;
                      }
                    }
                    s = l.createElement(n), gt(s, n, a), l.head.appendChild(s);
                    break;
                  default:
                    throw Error(r(468, n));
                }
                s[ft] = e, ot(s), n = s;
              }
              e.stateNode = n;
            } else im(l, e.type, e.stateNode);
            else e.stateNode = nm(l, n, e.memoizedProps);
            else s !== n ? (s === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : s.count--, n === null ? im(l, e.type, e.stateNode) : nm(l, n, e.memoizedProps)) : n === null && e.stateNode !== null && ou(e, e.memoizedProps, a.memoizedProps);
          }
          break;
        case 27:
          jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), a !== null && n & 4 && ou(e, e.memoizedProps, a.memoizedProps);
          break;
        case 5:
          if (jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), e.flags & 32) {
            l = e.stateNode;
            try {
              kn(l, "");
            } catch (ue) {
              Be(e, e.return, ue);
            }
          }
          n & 4 && e.stateNode != null && (l = e.memoizedProps, ou(e, l, a !== null ? a.memoizedProps : l)), n & 1024 && (fu = true);
          break;
        case 6:
          if (jt(t, e), At(e), n & 4) {
            if (e.stateNode === null) throw Error(r(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
              a.nodeValue = n;
            } catch (ue) {
              Be(e, e.return, ue);
            }
          }
          break;
        case 3:
          if (vs = null, l = ea, ea = gs(t.containerInfo), jt(t, e), ea = l, At(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
            fl(t.containerInfo);
          } catch (ue) {
            Be(e, e.return, ue);
          }
          fu && (fu = false, lf(e));
          break;
        case 4:
          n = ea, ea = gs(e.stateNode.containerInfo), jt(t, e), At(e), ea = n;
          break;
        case 12:
          jt(t, e), At(e);
          break;
        case 31:
          jt(t, e), At(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, as(e, n)));
          break;
        case 13:
          jt(t, e), At(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ls = te()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, as(e, n)));
          break;
        case 22:
          l = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, T = xa, O = ct;
          if (xa = T || l, ct = O || h, jt(t, e), ct = O, xa = T, At(e), n & 8192) e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (a === null || h || xa || ct || jn(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                h = a = t;
                try {
                  if (s = h.stateNode, l) u = s.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none";
                  else {
                    d = h.stateNode;
                    var Q = h.memoizedProps.style, z = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    d.style.display = z == null || typeof z == "boolean" ? "" : ("" + z).trim();
                  }
                } catch (ue) {
                  Be(h, h.return, ue);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                h = t;
                try {
                  h.stateNode.nodeValue = l ? "" : h.memoizedProps;
                } catch (ue) {
                  Be(h, h.return, ue);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                h = t;
                try {
                  var U = h.stateNode;
                  l ? Jf(U, true) : Jf(h.stateNode, false);
                } catch (ue) {
                  Be(h, h.return, ue);
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
          n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, as(e, a))));
          break;
        case 19:
          jt(t, e), At(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, as(e, n)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          jt(t, e), At(e);
      }
    }
    function At(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var a, n = e.return; n !== null; ) {
            if (Fd(n)) {
              a = n;
              break;
            }
            n = n.return;
          }
          if (a == null) throw Error(r(160));
          switch (a.tag) {
            case 27:
              var l = a.stateNode, s = ru(e);
              ts(e, s, l);
              break;
            case 5:
              var u = a.stateNode;
              a.flags & 32 && (kn(u, ""), a.flags &= -33);
              var d = ru(e);
              ts(e, d, u);
              break;
            case 3:
            case 4:
              var h = a.stateNode.containerInfo, T = ru(e);
              du(e, T, h);
              break;
            default:
              throw Error(r(161));
          }
        } catch (O) {
          Be(e, e.return, O);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function lf(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        lf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Ma(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Wd(e, t.alternate, t), t = t.sibling;
    }
    function jn(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Xa(4, t, t.return), jn(t);
            break;
          case 1:
            la(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount == "function" && Kd(t, t.return, a), jn(t);
            break;
          case 27:
            ti(t.stateNode);
          case 26:
          case 5:
            la(t, t.return), jn(t);
            break;
          case 22:
            t.memoizedState === null && jn(t);
            break;
          case 30:
            jn(t);
            break;
          default:
            jn(t);
        }
        e = e.sibling;
      }
    }
    function ja(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var n = t.alternate, l = e, s = t, u = s.flags;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            ja(l, s, a), Xl(4, s);
            break;
          case 1:
            if (ja(l, s, a), n = s, l = n.stateNode, typeof l.componentDidMount == "function") try {
              l.componentDidMount();
            } catch (T) {
              Be(n, n.return, T);
            }
            if (n = s, l = n.updateQueue, l !== null) {
              var d = n.stateNode;
              try {
                var h = l.shared.hiddenCallbacks;
                if (h !== null) for (l.shared.hiddenCallbacks = null, l = 0; l < h.length; l++) kr(h[l], d);
              } catch (T) {
                Be(n, n.return, T);
              }
            }
            a && u & 64 && Zd(s), Zl(s, s.return);
            break;
          case 27:
            $d(s);
          case 26:
          case 5:
            ja(l, s, a), a && n === null && u & 4 && Jd(s), Zl(s, s.return);
            break;
          case 12:
            ja(l, s, a);
            break;
          case 31:
            ja(l, s, a), a && u & 4 && tf(l, s);
            break;
          case 13:
            ja(l, s, a), a && u & 4 && af(l, s);
            break;
          case 22:
            s.memoizedState === null && ja(l, s, a), Zl(s, s.return);
            break;
          case 30:
            break;
          default:
            ja(l, s, a);
        }
        t = t.sibling;
      }
    }
    function mu(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && _l(a));
    }
    function hu(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _l(e));
    }
    function ta(e, t, a, n) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) sf(e, t, a, n), t = t.sibling;
    }
    function sf(e, t, a, n) {
      var l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ta(e, t, a, n), l & 2048 && Xl(9, t);
          break;
        case 1:
          ta(e, t, a, n);
          break;
        case 3:
          ta(e, t, a, n), l & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _l(e)));
          break;
        case 12:
          if (l & 2048) {
            ta(e, t, a, n), e = t.stateNode;
            try {
              var s = t.memoizedProps, u = s.id, d = s.onPostCommit;
              typeof d == "function" && d(u, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            } catch (h) {
              Be(t, t.return, h);
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
          s = t.stateNode, u = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? ta(e, t, a, n) : Kl(e, t) : s._visibility & 2 ? ta(e, t, a, n) : (s._visibility |= 2, tl(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || false)), l & 2048 && mu(u, t);
          break;
        case 24:
          ta(e, t, a, n), l & 2048 && hu(t.alternate, t);
          break;
        default:
          ta(e, t, a, n);
      }
    }
    function tl(e, t, a, n, l) {
      for (l = l && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var s = e, u = t, d = a, h = n, T = u.flags;
        switch (u.tag) {
          case 0:
          case 11:
          case 15:
            tl(s, u, d, h, l), Xl(8, u);
            break;
          case 23:
            break;
          case 22:
            var O = u.stateNode;
            u.memoizedState !== null ? O._visibility & 2 ? tl(s, u, d, h, l) : Kl(s, u) : (O._visibility |= 2, tl(s, u, d, h, l)), l && T & 2048 && mu(u.alternate, u);
            break;
          case 24:
            tl(s, u, d, h, l), l && T & 2048 && hu(u.alternate, u);
            break;
          default:
            tl(s, u, d, h, l);
        }
        t = t.sibling;
      }
    }
    function Kl(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var a = e, n = t, l = n.flags;
        switch (n.tag) {
          case 22:
            Kl(a, n), l & 2048 && mu(n.alternate, n);
            break;
          case 24:
            Kl(a, n), l & 2048 && hu(n.alternate, n);
            break;
          default:
            Kl(a, n);
        }
        t = t.sibling;
      }
    }
    var Jl = 8192;
    function al(e, t, a) {
      if (e.subtreeFlags & Jl) for (e = e.child; e !== null; ) cf(e, t, a), e = e.sibling;
    }
    function cf(e, t, a) {
      switch (e.tag) {
        case 26:
          al(e, t, a), e.flags & Jl && e.memoizedState !== null && Og(a, ea, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          al(e, t, a);
          break;
        case 3:
        case 4:
          var n = ea;
          ea = gs(e.stateNode.containerInfo), al(e, t, a), ea = n;
          break;
        case 22:
          e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Jl, Jl = 16777216, al(e, t, a), Jl = n) : al(e, t, a));
          break;
        default:
          al(e, t, a);
      }
    }
    function uf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function Fl(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          rt = n, rf(n, e);
        }
        uf(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) of(e), e = e.sibling;
    }
    function of(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Fl(e), e.flags & 2048 && Xa(9, e, e.return);
          break;
        case 3:
          Fl(e);
          break;
        case 12:
          Fl(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ns(e)) : Fl(e);
          break;
        default:
          Fl(e);
      }
    }
    function ns(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          rt = n, rf(n, e);
        }
        uf(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            Xa(8, t, t.return), ns(t);
            break;
          case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, ns(t));
            break;
          default:
            ns(t);
        }
        e = e.sibling;
      }
    }
    function rf(e, t) {
      for (; rt !== null; ) {
        var a = rt;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            Xa(8, a, t);
            break;
          case 23:
          case 22:
            if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
              var n = a.memoizedState.cachePool.pool;
              n != null && n.refCount++;
            }
            break;
          case 24:
            _l(a.memoizedState.cache);
        }
        if (n = a.child, n !== null) n.return = a, rt = n;
        else e: for (a = e; rt !== null; ) {
          n = rt;
          var l = n.sibling, s = n.return;
          if (Pd(n), n === a) {
            rt = null;
            break e;
          }
          if (l !== null) {
            l.return = s, rt = l;
            break e;
          }
          rt = s;
        }
      }
    }
    var Ip = {
      getCacheForType: function(e) {
        var t = ht(lt), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return ht(lt).controller.signal;
      }
    }, Wp = typeof WeakMap == "function" ? WeakMap : Map, Oe = 0, Ve = null, Ne = null, Te = 0, qe = 0, kt = null, Za = false, nl = false, pu = false, Aa = 0, We = 0, Ka = 0, An = 0, gu = 0, Ot = 0, ll = 0, $l = null, Et = null, yu = false, ls = 0, df = 0, is = 1 / 0, ss = null, Ja = null, ut = 0, Fa = null, il = null, Ea = 0, vu = 0, bu = null, ff = null, Il = 0, Su = null;
    function Lt() {
      return (Oe & 2) !== 0 && Te !== 0 ? Te & -Te : j.T !== null ? Eu() : Co();
    }
    function mf() {
      if (Ot === 0) if ((Te & 536870912) === 0 || De) {
        var e = hi;
        hi <<= 1, (hi & 3932160) === 0 && (hi = 262144), Ot = e;
      } else Ot = 536870912;
      return e = Dt.current, e !== null && (e.flags |= 32), Ot;
    }
    function Ct(e, t, a) {
      (e === Ve && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) && (sl(e, 0), $a(e, Te, Ot, false)), vl(e, a), ((Oe & 2) === 0 || e !== Ve) && (e === Ve && ((Oe & 2) === 0 && (An |= a), We === 4 && $a(e, Te, Ot, false)), ia(e));
    }
    function hf(e, t, a) {
      if ((Oe & 6) !== 0) throw Error(r(327));
      var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || yl(e, t), l = n ? tg(e, t) : wu(e, t, true), s = n;
      do {
        if (l === 0) {
          nl && !n && $a(e, t, 0, false);
          break;
        } else {
          if (a = e.current.alternate, s && !Pp(a)) {
            l = wu(e, t, false), s = false;
            continue;
          }
          if (l === 2) {
            if (s = t, e.errorRecoveryDisabledLanes & s) var u = 0;
            else u = e.pendingLanes & -536870913, u = u !== 0 ? u : u & 536870912 ? 536870912 : 0;
            if (u !== 0) {
              t = u;
              e: {
                var d = e;
                l = $l;
                var h = d.current.memoizedState.isDehydrated;
                if (h && (sl(d, u).flags |= 256), u = wu(d, u, false), u !== 2) {
                  if (pu && !h) {
                    d.errorRecoveryDisabledLanes |= s, An |= s, l = 4;
                    break e;
                  }
                  s = Et, Et = l, s !== null && (Et === null ? Et = s : Et.push.apply(Et, s));
                }
                l = u;
              }
              if (s = false, l !== 2) continue;
            }
          }
          if (l === 1) {
            sl(e, 0), $a(e, t, 0, true);
            break;
          }
          e: {
            switch (n = e, s = l, s) {
              case 0:
              case 1:
                throw Error(r(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                $a(n, t, Ot, !Za);
                break e;
              case 2:
                Et = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(r(329));
            }
            if ((t & 62914560) === t && (l = ls + 300 - te(), 10 < l)) {
              if ($a(n, t, Ot, !Za), gi(n, 0, true) !== 0) break e;
              Ea = t, n.timeoutHandle = Xf(pf.bind(null, n, a, Et, ss, yu, t, Ot, An, ll, Za, s, "Throttled", -0, 0), l);
              break e;
            }
            pf(n, a, Et, ss, yu, t, Ot, An, ll, Za, s, null, -0, 0);
          }
        }
        break;
      } while (true);
      ia(e);
    }
    function pf(e, t, a, n, l, s, u, d, h, T, O, Q, z, U) {
      if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
        Q = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: da
        }, cf(t, s, Q);
        var ue = (s & 62914560) === s ? ls - te() : (s & 4194048) === s ? df - te() : 0;
        if (ue = Lg(Q, ue), ue !== null) {
          Ea = s, e.cancelPendingCommit = ue(Mf.bind(null, e, t, s, a, n, l, u, d, h, O, Q, null, z, U)), $a(e, s, u, !T);
          return;
        }
      }
      Mf(e, t, s, a, n, l, u, d, h);
    }
    function Pp(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) for (var n = 0; n < a.length; n++) {
          var l = a[n], s = l.getSnapshot;
          l = l.value;
          try {
            if (!zt(s(), l)) return false;
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
      t &= ~gu, t &= ~An, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
      for (var l = t; 0 < l; ) {
        var s = 31 - Tt(l), u = 1 << s;
        n[s] = -1, l &= ~u;
      }
      a !== 0 && jo(e, a, t);
    }
    function cs() {
      return (Oe & 6) === 0 ? (Wl(0), false) : true;
    }
    function xu() {
      if (Ne !== null) {
        if (qe === 0) var e = Ne.return;
        else e = Ne, pa = gn = null, Lc(e), $n = null, Ul = 0, e = Ne;
        for (; e !== null; ) Xd(e.alternate, e), e = e.return;
        Ne = null;
      }
    }
    function sl(e, t) {
      var a = e.timeoutHandle;
      a !== -1 && (e.timeoutHandle = -1, bg(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ea = 0, xu(), Ve = e, Ne = a = ma(e.current, null), Te = t, qe = 0, kt = null, Za = false, nl = yl(e, t), pu = false, ll = Ot = gu = An = Ka = We = 0, Et = $l = null, yu = false, (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - Tt(n), s = 1 << l;
        t |= e[l], n &= ~s;
      }
      return Aa = t, Ni(), a;
    }
    function gf(e, t) {
      Se = null, j.H = Yl, t === Fn || t === Oi ? (t = zr(), qe = 3) : t === Ac ? (t = zr(), qe = 4) : qe = t === Pc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, kt = t, Ne === null && (We = 1, $i(e, Yt(t, e.current)));
    }
    function yf() {
      var e = Dt.current;
      return e === null ? true : (Te & 4194048) === Te ? Zt === null : (Te & 62914560) === Te || (Te & 536870912) !== 0 ? e === Zt : false;
    }
    function vf() {
      var e = j.H;
      return j.H = Yl, e === null ? Yl : e;
    }
    function bf() {
      var e = j.A;
      return j.A = Ip, e;
    }
    function us() {
      We = 4, Za || (Te & 4194048) !== Te && Dt.current !== null || (nl = true), (Ka & 134217727) === 0 && (An & 134217727) === 0 || Ve === null || $a(Ve, Te, Ot, false);
    }
    function wu(e, t, a) {
      var n = Oe;
      Oe |= 2;
      var l = vf(), s = bf();
      (Ve !== e || Te !== t) && (ss = null, sl(e, t)), t = false;
      var u = We;
      e: do
        try {
          if (qe !== 0 && Ne !== null) {
            var d = Ne, h = kt;
            switch (qe) {
              case 8:
                xu(), u = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                Dt.current === null && (t = true);
                var T = qe;
                if (qe = 0, kt = null, cl(e, d, h, T), a && nl) {
                  u = 0;
                  break e;
                }
                break;
              default:
                T = qe, qe = 0, kt = null, cl(e, d, h, T);
            }
          }
          eg(), u = We;
          break;
        } catch (O) {
          gf(e, O);
        }
      while (true);
      return t && e.shellSuspendCounter++, pa = gn = null, Oe = n, j.H = l, j.A = s, Ne === null && (Ve = null, Te = 0, Ni()), u;
    }
    function eg() {
      for (; Ne !== null; ) Sf(Ne);
    }
    function tg(e, t) {
      var a = Oe;
      Oe |= 2;
      var n = vf(), l = bf();
      Ve !== e || Te !== t ? (ss = null, is = te() + 500, sl(e, t)) : nl = yl(e, t);
      e: do
        try {
          if (qe !== 0 && Ne !== null) {
            t = Ne;
            var s = kt;
            t: switch (qe) {
              case 1:
                qe = 0, kt = null, cl(e, t, s, 1);
                break;
              case 2:
              case 9:
                if (Rr(s)) {
                  qe = 0, kt = null, xf(t);
                  break;
                }
                t = function() {
                  qe !== 2 && qe !== 9 || Ve !== e || (qe = 7), ia(e);
                }, s.then(t, t);
                break e;
              case 3:
                qe = 7;
                break e;
              case 4:
                qe = 5;
                break e;
              case 7:
                Rr(s) ? (qe = 0, kt = null, xf(t)) : (qe = 0, kt = null, cl(e, t, s, 7));
                break;
              case 5:
                var u = null;
                switch (Ne.tag) {
                  case 26:
                    u = Ne.memoizedState;
                  case 5:
                  case 27:
                    var d = Ne;
                    if (u ? sm(u) : d.stateNode.complete) {
                      qe = 0, kt = null;
                      var h = d.sibling;
                      if (h !== null) Ne = h;
                      else {
                        var T = d.return;
                        T !== null ? (Ne = T, os(T)) : Ne = null;
                      }
                      break t;
                    }
                }
                qe = 0, kt = null, cl(e, t, s, 5);
                break;
              case 6:
                qe = 0, kt = null, cl(e, t, s, 6);
                break;
              case 8:
                xu(), We = 6;
                break e;
              default:
                throw Error(r(462));
            }
          }
          ag();
          break;
        } catch (O) {
          gf(e, O);
        }
      while (true);
      return pa = gn = null, j.H = n, j.A = l, Oe = a, Ne !== null ? 0 : (Ve = null, Te = 0, Ni(), We);
    }
    function ag() {
      for (; Ne !== null && !ne(); ) Sf(Ne);
    }
    function Sf(e) {
      var t = Qd(e.alternate, e, Aa);
      e.memoizedProps = e.pendingProps, t === null ? os(e) : Ne = t;
    }
    function xf(e) {
      var t = e, a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Ld(a, t, t.pendingProps, t.type, void 0, Te);
          break;
        case 11:
          t = Ld(a, t, t.pendingProps, t.type.render, t.ref, Te);
          break;
        case 5:
          Lc(t);
        default:
          Xd(a, t), t = Ne = vr(t, Aa), t = Qd(a, t, Aa);
      }
      e.memoizedProps = e.pendingProps, t === null ? os(e) : Ne = t;
    }
    function cl(e, t, a, n) {
      pa = gn = null, Lc(t), $n = null, Ul = 0;
      var l = t.return;
      try {
        if (Vp(e, l, t, a, Te)) {
          We = 1, $i(e, Yt(a, e.current)), Ne = null;
          return;
        }
      } catch (s) {
        if (l !== null) throw Ne = l, s;
        We = 1, $i(e, Yt(a, e.current)), Ne = null;
        return;
      }
      t.flags & 32768 ? (De || n === 1 ? e = true : nl || (Te & 536870912) !== 0 ? e = false : (Za = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Dt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), wf(t, e)) : os(t);
    }
    function os(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          wf(t, Za);
          return;
        }
        e = t.return;
        var a = Kp(t.alternate, t, Aa);
        if (a !== null) {
          Ne = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ne = t;
          return;
        }
        Ne = t = e;
      } while (t !== null);
      We === 0 && (We = 5);
    }
    function wf(e, t) {
      do {
        var a = Jp(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Ne = a;
          return;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ne = e;
          return;
        }
        Ne = e = a;
      } while (e !== null);
      We = 6, Ne = null;
    }
    function Mf(e, t, a, n, l, s, u, d, h) {
      e.cancelPendingCommit = null;
      do
        rs();
      while (ut !== 0);
      if ((Oe & 6) !== 0) throw Error(r(327));
      if (t !== null) {
        if (t === e.current) throw Error(r(177));
        if (s = t.lanes | t.childLanes, s |= rc, kh(e, a, s, u, d, h), e === Ve && (Ne = Ve = null, Te = 0), il = t, Fa = e, Ea = a, vu = s, bu = l, ff = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, sg(Le, function() {
          return Nf(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
          n = j.T, j.T = null, l = D.p, D.p = 2, u = Oe, Oe |= 4;
          try {
            Fp(e, t, a);
          } finally {
            Oe = u, D.p = l, j.T = n;
          }
        }
        ut = 1, jf(), Af(), Ef();
      }
    }
    function jf() {
      if (ut === 1) {
        ut = 0;
        var e = Fa, t = il, a = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || a) {
          a = j.T, j.T = null;
          var n = D.p;
          D.p = 2;
          var l = Oe;
          Oe |= 4;
          try {
            nf(t, e);
            var s = Uu, u = or(e.containerInfo), d = s.focusedElem, h = s.selectionRange;
            if (u !== d && d && d.ownerDocument && ur(d.ownerDocument.documentElement, d)) {
              if (h !== null && ic(d)) {
                var T = h.start, O = h.end;
                if (O === void 0 && (O = T), "selectionStart" in d) d.selectionStart = T, d.selectionEnd = Math.min(O, d.value.length);
                else {
                  var Q = d.ownerDocument || document, z = Q && Q.defaultView || window;
                  if (z.getSelection) {
                    var U = z.getSelection(), ue = d.textContent.length, pe = Math.min(h.start, ue), Ye = h.end === void 0 ? pe : Math.min(h.end, ue);
                    !U.extend && pe > Ye && (u = Ye, Ye = pe, pe = u);
                    var M = cr(d, pe), b = cr(d, Ye);
                    if (M && b && (U.rangeCount !== 1 || U.anchorNode !== M.node || U.anchorOffset !== M.offset || U.focusNode !== b.node || U.focusOffset !== b.offset)) {
                      var N = Q.createRange();
                      N.setStart(M.node, M.offset), U.removeAllRanges(), pe > Ye ? (U.addRange(N), U.extend(b.node, b.offset)) : (N.setEnd(b.node, b.offset), U.addRange(N));
                    }
                  }
                }
              }
              for (Q = [], U = d; U = U.parentNode; ) U.nodeType === 1 && Q.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
              for (typeof d.focus == "function" && d.focus(), d = 0; d < Q.length; d++) {
                var H = Q[d];
                H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
              }
            }
            ws = !!Du, Uu = Du = null;
          } finally {
            Oe = l, D.p = n, j.T = a;
          }
        }
        e.current = t, ut = 2;
      }
    }
    function Af() {
      if (ut === 2) {
        ut = 0;
        var e = Fa, t = il, a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = j.T, j.T = null;
          var n = D.p;
          D.p = 2;
          var l = Oe;
          Oe |= 4;
          try {
            Wd(e, t.alternate, t);
          } finally {
            Oe = l, D.p = n, j.T = a;
          }
        }
        ut = 3;
      }
    }
    function Ef() {
      if (ut === 4 || ut === 3) {
        ut = 0, I();
        var e = Fa, t = il, a = Ea, n = ff;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ut = 5 : (ut = 0, il = Fa = null, Cf(e, e.pendingLanes));
        var l = e.pendingLanes;
        if (l === 0 && (Ja = null), Hs(a), t = t.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function") try {
          Rt.onCommitFiberRoot(gl, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (n !== null) {
          t = j.T, l = D.p, D.p = 2, j.T = null;
          try {
            for (var s = e.onRecoverableError, u = 0; u < n.length; u++) {
              var d = n[u];
              s(d.value, {
                componentStack: d.stack
              });
            }
          } finally {
            j.T = t, D.p = l;
          }
        }
        (Ea & 3) !== 0 && rs(), ia(e), l = e.pendingLanes, (a & 261930) !== 0 && (l & 42) !== 0 ? e === Su ? Il++ : (Il = 0, Su = e) : Il = 0, Wl(0);
      }
    }
    function Cf(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, _l(t)));
    }
    function rs() {
      return jf(), Af(), Ef(), Nf();
    }
    function Nf() {
      if (ut !== 5) return false;
      var e = Fa, t = vu;
      vu = 0;
      var a = Hs(Ea), n = j.T, l = D.p;
      try {
        D.p = 32 > a ? 32 : a, j.T = null, a = bu, bu = null;
        var s = Fa, u = Ea;
        if (ut = 0, il = Fa = null, Ea = 0, (Oe & 6) !== 0) throw Error(r(331));
        var d = Oe;
        if (Oe |= 4, of(s.current), sf(s, s.current, u, a), Oe = d, Wl(0, false), Rt && typeof Rt.onPostCommitFiberRoot == "function") try {
          Rt.onPostCommitFiberRoot(gl, s);
        } catch {
        }
        return true;
      } finally {
        D.p = l, j.T = n, Cf(e, t);
      }
    }
    function Rf(e, t, a) {
      t = Yt(a, t), t = Wc(e.stateNode, t, 2), e = Ya(e, t, 2), e !== null && (vl(e, 2), ia(e));
    }
    function Be(e, t, a) {
      if (e.tag === 3) Rf(e, e, a);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          Rf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Ja === null || !Ja.has(n))) {
            e = Yt(a, e), a = Rd(2), n = Ya(t, a, 2), n !== null && (Td(a, n, t, e), vl(n, 2), ia(n));
            break;
          }
        }
        t = t.return;
      }
    }
    function Mu(e, t, a) {
      var n = e.pingCache;
      if (n === null) {
        n = e.pingCache = new Wp();
        var l = /* @__PURE__ */ new Set();
        n.set(t, l);
      } else l = n.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), n.set(t, l));
      l.has(a) || (pu = true, l.add(a), e = ng.bind(null, e, t, a), t.then(e, e));
    }
    function ng(e, t, a) {
      var n = e.pingCache;
      n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ve === e && (Te & a) === a && (We === 4 || We === 3 && (Te & 62914560) === Te && 300 > te() - ls ? (Oe & 2) === 0 && sl(e, 0) : gu |= a, ll === Te && (ll = 0)), ia(e);
    }
    function Tf(e, t) {
      t === 0 && (t = Mo()), e = mn(e, t), e !== null && (vl(e, t), ia(e));
    }
    function lg(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Tf(e, a);
    }
    function ig(e, t) {
      var a = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var n = e.stateNode, l = e.memoizedState;
          l !== null && (a = l.retryLane);
          break;
        case 19:
          n = e.stateNode;
          break;
        case 22:
          n = e.stateNode._retryCache;
          break;
        default:
          throw Error(r(314));
      }
      n !== null && n.delete(t), Tf(e, a);
    }
    function sg(e, t) {
      return R(e, t);
    }
    var ds = null, ul = null, ju = false, fs = false, Au = false, Ia = 0;
    function ia(e) {
      e !== ul && e.next === null && (ul === null ? ds = ul = e : ul = ul.next = e), fs = true, ju || (ju = true, ug());
    }
    function Wl(e, t) {
      if (!Au && fs) {
        Au = true;
        do
          for (var a = false, n = ds; n !== null; ) {
            if (e !== 0) {
              var l = n.pendingLanes;
              if (l === 0) var s = 0;
              else {
                var u = n.suspendedLanes, d = n.pingedLanes;
                s = (1 << 31 - Tt(42 | e) + 1) - 1, s &= l & ~(u & ~d), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
              }
              s !== 0 && (a = true, Uf(n, s));
            } else s = Te, s = gi(n, n === Ve ? s : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (s & 3) === 0 || yl(n, s) || (a = true, Uf(n, s));
            n = n.next;
          }
        while (a);
        Au = false;
      }
    }
    function cg() {
      zf();
    }
    function zf() {
      fs = ju = false;
      var e = 0;
      Ia !== 0 && vg() && (e = Ia);
      for (var t = te(), a = null, n = ds; n !== null; ) {
        var l = n.next, s = _f(n, t);
        s === 0 ? (n.next = null, a === null ? ds = l : a.next = l, l === null && (ul = a)) : (a = n, (e !== 0 || (s & 3) !== 0) && (fs = true)), n = l;
      }
      ut !== 0 && ut !== 5 || Wl(e), Ia !== 0 && (Ia = 0);
    }
    function _f(e, t) {
      for (var a = e.suspendedLanes, n = e.pingedLanes, l = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
        var u = 31 - Tt(s), d = 1 << u, h = l[u];
        h === -1 ? ((d & a) === 0 || (d & n) !== 0) && (l[u] = Uh(d, t)) : h <= t && (e.expiredLanes |= d), s &= ~d;
      }
      if (t = Ve, a = Te, a = gi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && K(n), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || yl(e, a)) {
        if (t = a & -a, t === e.callbackPriority) return t;
        switch (n !== null && K(n), Hs(a)) {
          case 2:
          case 8:
            a = nt;
            break;
          case 32:
            a = Le;
            break;
          case 268435456:
            a = _a2;
            break;
          default:
            a = Le;
        }
        return n = Df.bind(null, e), a = R(a, n), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return n !== null && n !== null && K(n), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Df(e, t) {
      if (ut !== 0 && ut !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (rs() && e.callbackNode !== a) return null;
      var n = Te;
      return n = gi(e, e === Ve ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (hf(e, n, t), _f(e, te()), e.callbackNode != null && e.callbackNode === a ? Df.bind(null, e) : null);
    }
    function Uf(e, t) {
      if (rs()) return null;
      hf(e, t, true);
    }
    function ug() {
      Sg(function() {
        (Oe & 6) !== 0 ? R(Xe, cg) : zf();
      });
    }
    function Eu() {
      if (Ia === 0) {
        var e = Kn;
        e === 0 && (e = mi, mi <<= 1, (mi & 261888) === 0 && (mi = 256)), Ia = e;
      }
      return Ia;
    }
    function kf(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Si("" + e);
    }
    function Of(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function og(e, t, a, n, l) {
      if (t === "submit" && a && a.stateNode === l) {
        var s = kf((l[xt] || null).action), u = n.submitter;
        u && (t = (t = u[xt] || null) ? kf(t.formAction) : u.getAttribute("formAction"), t !== null && (s = t, u = null));
        var d = new ji("action", "action", null, n, l);
        e.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if (Ia !== 0) {
                    var h = u ? Of(l, u) : new FormData(l);
                    Zc(a, {
                      pending: true,
                      data: h,
                      method: l.method,
                      action: s
                    }, null, h);
                  }
                } else typeof s == "function" && (d.preventDefault(), h = u ? Of(l, u) : new FormData(l), Zc(a, {
                  pending: true,
                  data: h,
                  method: l.method,
                  action: s
                }, s, h));
              },
              currentTarget: l
            }
          ]
        });
      }
    }
    for (var Cu = 0; Cu < oc.length; Cu++) {
      var Nu = oc[Cu], rg = Nu.toLowerCase(), dg = Nu[0].toUpperCase() + Nu.slice(1);
      Pt(rg, "on" + dg);
    }
    Pt(fr, "onAnimationEnd"), Pt(mr, "onAnimationIteration"), Pt(hr, "onAnimationStart"), Pt("dblclick", "onDoubleClick"), Pt("focusin", "onFocus"), Pt("focusout", "onBlur"), Pt(Cp, "onTransitionRun"), Pt(Np, "onTransitionStart"), Pt(Rp, "onTransitionCancel"), Pt(pr, "onTransitionEnd"), Dn("onMouseEnter", [
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
    ]), on("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), on("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), on("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), on("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), on("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), on("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), fg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pl));
    function Lf(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var n = e[a], l = n.event;
        n = n.listeners;
        e: {
          var s = void 0;
          if (t) for (var u = n.length - 1; 0 <= u; u--) {
            var d = n[u], h = d.instance, T = d.currentTarget;
            if (d = d.listener, h !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = T;
            try {
              s(l);
            } catch (O) {
              Ci(O);
            }
            l.currentTarget = null, s = h;
          }
          else for (u = 0; u < n.length; u++) {
            if (d = n[u], h = d.instance, T = d.currentTarget, d = d.listener, h !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = T;
            try {
              s(l);
            } catch (O) {
              Ci(O);
            }
            l.currentTarget = null, s = h;
          }
        }
      }
    }
    function Re(e, t) {
      var a = t[Gs];
      a === void 0 && (a = t[Gs] = /* @__PURE__ */ new Set());
      var n = e + "__bubble";
      a.has(n) || (qf(t, e, 2, false), a.add(n));
    }
    function Ru(e, t, a) {
      var n = 0;
      t && (n |= 4), qf(a, e, n, t);
    }
    var ms = "_reactListening" + Math.random().toString(36).slice(2);
    function Tu(e) {
      if (!e[ms]) {
        e[ms] = true, To.forEach(function(a) {
          a !== "selectionchange" && (fg.has(a) || Ru(a, false, e), Ru(a, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ms] || (t[ms] = true, Ru("selectionchange", false, t));
      }
    }
    function qf(e, t, a, n) {
      switch (mm(t)) {
        case 2:
          var l = Hg;
          break;
        case 8:
          l = Gg;
          break;
        default:
          l = Xu;
      }
      a = l.bind(null, t, a, e), l = void 0, !$s || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = true), n ? l !== void 0 ? e.addEventListener(t, a, {
        capture: true,
        passive: l
      }) : e.addEventListener(t, a, true) : l !== void 0 ? e.addEventListener(t, a, {
        passive: l
      }) : e.addEventListener(t, a, false);
    }
    function zu(e, t, a, n, l) {
      var s = n;
      if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (; ; ) {
        if (n === null) return;
        var u = n.tag;
        if (u === 3 || u === 4) {
          var d = n.stateNode.containerInfo;
          if (d === l) break;
          if (u === 4) for (u = n.return; u !== null; ) {
            var h = u.tag;
            if ((h === 3 || h === 4) && u.stateNode.containerInfo === l) return;
            u = u.return;
          }
          for (; d !== null; ) {
            if (u = Tn(d), u === null) return;
            if (h = u.tag, h === 5 || h === 6 || h === 26 || h === 27) {
              n = s = u;
              continue e;
            }
            d = d.parentNode;
          }
        }
        n = n.return;
      }
      Yo(function() {
        var T = s, O = Js(a), Q = [];
        e: {
          var z = gr.get(e);
          if (z !== void 0) {
            var U = ji, ue = e;
            switch (e) {
              case "keypress":
                if (wi(a) === 0) break e;
              case "keydown":
              case "keyup":
                U = ip;
                break;
              case "focusin":
                ue = "focus", U = ec;
                break;
              case "focusout":
                ue = "blur", U = ec;
                break;
              case "beforeblur":
              case "afterblur":
                U = ec;
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
                U = Xo;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                U = Kh;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                U = up;
                break;
              case fr:
              case mr:
              case hr:
                U = $h;
                break;
              case pr:
                U = rp;
                break;
              case "scroll":
              case "scrollend":
                U = Xh;
                break;
              case "wheel":
                U = fp;
                break;
              case "copy":
              case "cut":
              case "paste":
                U = Wh;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                U = Ko;
                break;
              case "toggle":
              case "beforetoggle":
                U = hp;
            }
            var pe = (t & 4) !== 0, Ye = !pe && (e === "scroll" || e === "scrollend"), M = pe ? z !== null ? z + "Capture" : null : z;
            pe = [];
            for (var b = T, N; b !== null; ) {
              var H = b;
              if (N = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || N === null || M === null || (H = xl(b, M), H != null && pe.push(ei(b, H, N))), Ye) break;
              b = b.return;
            }
            0 < pe.length && (z = new U(z, ue, null, a, O), Q.push({
              event: z,
              listeners: pe
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (z = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", z && a !== Ks && (ue = a.relatedTarget || a.fromElement) && (Tn(ue) || ue[Rn])) break e;
            if ((U || z) && (z = O.window === O ? O : (z = O.ownerDocument) ? z.defaultView || z.parentWindow : window, U ? (ue = a.relatedTarget || a.toElement, U = T, ue = ue ? Tn(ue) : null, ue !== null && (Ye = y(ue), pe = ue.tag, ue !== Ye || pe !== 5 && pe !== 27 && pe !== 6) && (ue = null)) : (U = null, ue = T), U !== ue)) {
              if (pe = Xo, H = "onMouseLeave", M = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (pe = Ko, H = "onPointerLeave", M = "onPointerEnter", b = "pointer"), Ye = U == null ? z : Sl(U), N = ue == null ? z : Sl(ue), z = new pe(H, b + "leave", U, a, O), z.target = Ye, z.relatedTarget = N, H = null, Tn(O) === T && (pe = new pe(M, b + "enter", ue, a, O), pe.target = N, pe.relatedTarget = Ye, H = pe), Ye = H, U && ue) t: {
                for (pe = mg, M = U, b = ue, N = 0, H = M; H; H = pe(H)) N++;
                H = 0;
                for (var me = b; me; me = pe(me)) H++;
                for (; 0 < N - H; ) M = pe(M), N--;
                for (; 0 < H - N; ) b = pe(b), H--;
                for (; N--; ) {
                  if (M === b || b !== null && M === b.alternate) {
                    pe = M;
                    break t;
                  }
                  M = pe(M), b = pe(b);
                }
                pe = null;
              }
              else pe = null;
              U !== null && Bf(Q, z, U, pe, false), ue !== null && Ye !== null && Bf(Q, Ye, ue, pe, true);
            }
          }
          e: {
            if (z = T ? Sl(T) : window, U = z.nodeName && z.nodeName.toLowerCase(), U === "select" || U === "input" && z.type === "file") var Ue = tr;
            else if (Po(z)) if (ar) Ue = jp;
            else {
              Ue = wp;
              var oe = xp;
            }
            else U = z.nodeName, !U || U.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? T && Zs(T.elementType) && (Ue = tr) : Ue = Mp;
            if (Ue && (Ue = Ue(e, T))) {
              er(Q, Ue, a, O);
              break e;
            }
            oe && oe(e, z, T), e === "focusout" && T && z.type === "number" && T.memoizedProps.value != null && Xs(z, "number", z.value);
          }
          switch (oe = T ? Sl(T) : window, e) {
            case "focusin":
              (Po(oe) || oe.contentEditable === "true") && (Bn = oe, sc = T, Rl = null);
              break;
            case "focusout":
              Rl = sc = Bn = null;
              break;
            case "mousedown":
              cc = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              cc = false, rr(Q, a, O);
              break;
            case "selectionchange":
              if (Ep) break;
            case "keydown":
            case "keyup":
              rr(Q, a, O);
          }
          var we;
          if (ac) e: {
            switch (e) {
              case "compositionstart":
                var ze = "onCompositionStart";
                break e;
              case "compositionend":
                ze = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ze = "onCompositionUpdate";
                break e;
            }
            ze = void 0;
          }
          else qn ? Io(e, a) && (ze = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ze = "onCompositionStart");
          ze && (Jo && a.locale !== "ko" && (qn || ze !== "onCompositionStart" ? ze === "onCompositionEnd" && qn && (we = Qo()) : (ka = O, Is = "value" in ka ? ka.value : ka.textContent, qn = true)), oe = hs(T, ze), 0 < oe.length && (ze = new Zo(ze, e, null, a, O), Q.push({
            event: ze,
            listeners: oe
          }), we ? ze.data = we : (we = Wo(a), we !== null && (ze.data = we)))), (we = gp ? yp(e, a) : vp(e, a)) && (ze = hs(T, "onBeforeInput"), 0 < ze.length && (oe = new Zo("onBeforeInput", "beforeinput", null, a, O), Q.push({
            event: oe,
            listeners: ze
          }), oe.data = we)), og(Q, e, T, a, O);
        }
        Lf(Q, t);
      });
    }
    function ei(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function hs(e, t) {
      for (var a = t + "Capture", n = []; e !== null; ) {
        var l = e, s = l.stateNode;
        if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || s === null || (l = xl(e, a), l != null && n.unshift(ei(e, l, s)), l = xl(e, t), l != null && n.push(ei(e, l, s))), e.tag === 3) return n;
        e = e.return;
      }
      return [];
    }
    function mg(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Bf(e, t, a, n, l) {
      for (var s = t._reactName, u = []; a !== null && a !== n; ) {
        var d = a, h = d.alternate, T = d.stateNode;
        if (d = d.tag, h !== null && h === n) break;
        d !== 5 && d !== 26 && d !== 27 || T === null || (h = T, l ? (T = xl(a, s), T != null && u.unshift(ei(a, T, h))) : l || (T = xl(a, s), T != null && u.push(ei(a, T, h)))), a = a.return;
      }
      u.length !== 0 && e.push({
        event: t,
        listeners: u
      });
    }
    var hg = /\r\n?/g, pg = /\u0000|\uFFFD/g;
    function Hf(e) {
      return (typeof e == "string" ? e : "" + e).replace(hg, `
`).replace(pg, "");
    }
    function Gf(e, t) {
      return t = Hf(t), Hf(e) === t;
    }
    function Ge(e, t, a, n, l, s) {
      switch (a) {
        case "children":
          typeof n == "string" ? t === "body" || t === "textarea" && n === "" || kn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && kn(e, "" + n);
          break;
        case "className":
          vi(e, "class", n);
          break;
        case "tabIndex":
          vi(e, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          vi(e, a, n);
          break;
        case "style":
          Ho(e, n, s);
          break;
        case "data":
          if (t !== "object") {
            vi(e, "data", n);
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
          n = Si("" + n), e.setAttribute(a, n);
          break;
        case "action":
        case "formAction":
          if (typeof n == "function") {
            e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof s == "function" && (a === "formAction" ? (t !== "input" && Ge(e, t, "name", l.name, l, null), Ge(e, t, "formEncType", l.formEncType, l, null), Ge(e, t, "formMethod", l.formMethod, l, null), Ge(e, t, "formTarget", l.formTarget, l, null)) : (Ge(e, t, "encType", l.encType, l, null), Ge(e, t, "method", l.method, l, null), Ge(e, t, "target", l.target, l, null)));
          if (n == null || typeof n == "symbol" || typeof n == "boolean") {
            e.removeAttribute(a);
            break;
          }
          n = Si("" + n), e.setAttribute(a, n);
          break;
        case "onClick":
          n != null && (e.onclick = da);
          break;
        case "onScroll":
          n != null && Re("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Re("scrollend", e);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n)) throw Error(r(61));
            if (a = n.__html, a != null) {
              if (l.children != null) throw Error(r(60));
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
          a = Si("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
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
          Re("beforetoggle", e), Re("toggle", e), yi(e, "popover", n);
          break;
        case "xlinkActuate":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
          break;
        case "xlinkArcrole":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
          break;
        case "xlinkRole":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
          break;
        case "xlinkShow":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
          break;
        case "xlinkTitle":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
          break;
        case "xlinkType":
          ra(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
          break;
        case "xmlBase":
          ra(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
          break;
        case "xmlLang":
          ra(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
          break;
        case "xmlSpace":
          ra(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
          break;
        case "is":
          yi(e, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Qh.get(a) || a, yi(e, a, n));
      }
    }
    function _u(e, t, a, n, l, s) {
      switch (a) {
        case "style":
          Ho(e, n, s);
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) {
            if (typeof n != "object" || !("__html" in n)) throw Error(r(61));
            if (a = n.__html, a != null) {
              if (l.children != null) throw Error(r(60));
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof n == "string" ? kn(e, n) : (typeof n == "number" || typeof n == "bigint") && kn(e, "" + n);
          break;
        case "onScroll":
          n != null && Re("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Re("scrollend", e);
          break;
        case "onClick":
          n != null && (e.onclick = da);
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
          if (!zo.hasOwnProperty(a)) e: {
            if (a[0] === "o" && a[1] === "n" && (l = a.endsWith("Capture"), t = a.slice(2, l ? a.length - 7 : void 0), s = e[xt] || null, s = s != null ? s[a] : null, typeof s == "function" && e.removeEventListener(t, s, l), typeof n == "function")) {
              typeof s != "function" && s !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, l);
              break e;
            }
            a in e ? e[a] = n : n === true ? e.setAttribute(a, "") : yi(e, a, n);
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
          Re("error", e), Re("load", e);
          var n = false, l = false, s;
          for (s in a) if (a.hasOwnProperty(s)) {
            var u = a[s];
            if (u != null) switch (s) {
              case "src":
                n = true;
                break;
              case "srcSet":
                l = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Ge(e, t, s, u, a, null);
            }
          }
          l && Ge(e, t, "srcSet", a.srcSet, a, null), n && Ge(e, t, "src", a.src, a, null);
          return;
        case "input":
          Re("invalid", e);
          var d = s = u = l = null, h = null, T = null;
          for (n in a) if (a.hasOwnProperty(n)) {
            var O = a[n];
            if (O != null) switch (n) {
              case "name":
                l = O;
                break;
              case "type":
                u = O;
                break;
              case "checked":
                h = O;
                break;
              case "defaultChecked":
                T = O;
                break;
              case "value":
                s = O;
                break;
              case "defaultValue":
                d = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(r(137, t));
                break;
              default:
                Ge(e, t, n, O, a, null);
            }
          }
          Oo(e, s, d, h, T, u, l, false);
          return;
        case "select":
          Re("invalid", e), n = u = s = null;
          for (l in a) if (a.hasOwnProperty(l) && (d = a[l], d != null)) switch (l) {
            case "value":
              s = d;
              break;
            case "defaultValue":
              u = d;
              break;
            case "multiple":
              n = d;
            default:
              Ge(e, t, l, d, a, null);
          }
          t = s, a = u, e.multiple = !!n, t != null ? Un(e, !!n, t, false) : a != null && Un(e, !!n, a, true);
          return;
        case "textarea":
          Re("invalid", e), s = l = n = null;
          for (u in a) if (a.hasOwnProperty(u) && (d = a[u], d != null)) switch (u) {
            case "value":
              n = d;
              break;
            case "defaultValue":
              l = d;
              break;
            case "children":
              s = d;
              break;
            case "dangerouslySetInnerHTML":
              if (d != null) throw Error(r(91));
              break;
            default:
              Ge(e, t, u, d, a, null);
          }
          qo(e, n, l, s);
          return;
        case "option":
          for (h in a) if (a.hasOwnProperty(h) && (n = a[h], n != null)) switch (h) {
            case "selected":
              e.selected = n && typeof n != "function" && typeof n != "symbol";
              break;
            default:
              Ge(e, t, h, n, a, null);
          }
          return;
        case "dialog":
          Re("beforetoggle", e), Re("toggle", e), Re("cancel", e), Re("close", e);
          break;
        case "iframe":
        case "object":
          Re("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < Pl.length; n++) Re(Pl[n], e);
          break;
        case "image":
          Re("error", e), Re("load", e);
          break;
        case "details":
          Re("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Re("error", e), Re("load", e);
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
          for (T in a) if (a.hasOwnProperty(T) && (n = a[T], n != null)) switch (T) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(r(137, t));
            default:
              Ge(e, t, T, n, a, null);
          }
          return;
        default:
          if (Zs(t)) {
            for (O in a) a.hasOwnProperty(O) && (n = a[O], n !== void 0 && _u(e, t, O, n, a, void 0));
            return;
          }
      }
      for (d in a) a.hasOwnProperty(d) && (n = a[d], n != null && Ge(e, t, d, n, a, null));
    }
    function gg(e, t, a, n) {
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
          var l = null, s = null, u = null, d = null, h = null, T = null, O = null;
          for (U in a) {
            var Q = a[U];
            if (a.hasOwnProperty(U) && Q != null) switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = Q;
              default:
                n.hasOwnProperty(U) || Ge(e, t, U, null, n, Q);
            }
          }
          for (var z in n) {
            var U = n[z];
            if (Q = a[z], n.hasOwnProperty(z) && (U != null || Q != null)) switch (z) {
              case "type":
                s = U;
                break;
              case "name":
                l = U;
                break;
              case "checked":
                T = U;
                break;
              case "defaultChecked":
                O = U;
                break;
              case "value":
                u = U;
                break;
              case "defaultValue":
                d = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null) throw Error(r(137, t));
                break;
              default:
                U !== Q && Ge(e, t, z, U, n, Q);
            }
          }
          Vs(e, u, d, h, T, O, s, l);
          return;
        case "select":
          U = u = d = z = null;
          for (s in a) if (h = a[s], a.hasOwnProperty(s) && h != null) switch (s) {
            case "value":
              break;
            case "multiple":
              U = h;
            default:
              n.hasOwnProperty(s) || Ge(e, t, s, null, n, h);
          }
          for (l in n) if (s = n[l], h = a[l], n.hasOwnProperty(l) && (s != null || h != null)) switch (l) {
            case "value":
              z = s;
              break;
            case "defaultValue":
              d = s;
              break;
            case "multiple":
              u = s;
            default:
              s !== h && Ge(e, t, l, s, n, h);
          }
          t = d, a = u, n = U, z != null ? Un(e, !!a, z, false) : !!n != !!a && (t != null ? Un(e, !!a, t, true) : Un(e, !!a, a ? [] : "", false));
          return;
        case "textarea":
          U = z = null;
          for (d in a) if (l = a[d], a.hasOwnProperty(d) && l != null && !n.hasOwnProperty(d)) switch (d) {
            case "value":
              break;
            case "children":
              break;
            default:
              Ge(e, t, d, null, n, l);
          }
          for (u in n) if (l = n[u], s = a[u], n.hasOwnProperty(u) && (l != null || s != null)) switch (u) {
            case "value":
              z = l;
              break;
            case "defaultValue":
              U = l;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (l != null) throw Error(r(91));
              break;
            default:
              l !== s && Ge(e, t, u, l, n, s);
          }
          Lo(e, z, U);
          return;
        case "option":
          for (var ue in a) if (z = a[ue], a.hasOwnProperty(ue) && z != null && !n.hasOwnProperty(ue)) switch (ue) {
            case "selected":
              e.selected = false;
              break;
            default:
              Ge(e, t, ue, null, n, z);
          }
          for (h in n) if (z = n[h], U = a[h], n.hasOwnProperty(h) && z !== U && (z != null || U != null)) switch (h) {
            case "selected":
              e.selected = z && typeof z != "function" && typeof z != "symbol";
              break;
            default:
              Ge(e, t, h, z, n, U);
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
          for (var pe in a) z = a[pe], a.hasOwnProperty(pe) && z != null && !n.hasOwnProperty(pe) && Ge(e, t, pe, null, n, z);
          for (T in n) if (z = n[T], U = a[T], n.hasOwnProperty(T) && z !== U && (z != null || U != null)) switch (T) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (z != null) throw Error(r(137, t));
              break;
            default:
              Ge(e, t, T, z, n, U);
          }
          return;
        default:
          if (Zs(t)) {
            for (var Ye in a) z = a[Ye], a.hasOwnProperty(Ye) && z !== void 0 && !n.hasOwnProperty(Ye) && _u(e, t, Ye, void 0, n, z);
            for (O in n) z = n[O], U = a[O], !n.hasOwnProperty(O) || z === U || z === void 0 && U === void 0 || _u(e, t, O, z, n, U);
            return;
          }
      }
      for (var M in a) z = a[M], a.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && Ge(e, t, M, null, n, z);
      for (Q in n) z = n[Q], U = a[Q], !n.hasOwnProperty(Q) || z === U || z == null && U == null || Ge(e, t, Q, z, n, U);
    }
    function Yf(e) {
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
    function yg() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), n = 0; n < a.length; n++) {
          var l = a[n], s = l.transferSize, u = l.initiatorType, d = l.duration;
          if (s && d && Yf(u)) {
            for (u = 0, d = l.responseEnd, n += 1; n < a.length; n++) {
              var h = a[n], T = h.startTime;
              if (T > d) break;
              var O = h.transferSize, Q = h.initiatorType;
              O && Yf(Q) && (h = h.responseEnd, u += O * (h < d ? 1 : (d - T) / (h - T)));
            }
            if (--n, t += 8 * (s + u) / (l.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var Du = null, Uu = null;
    function ps(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Qf(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Vf(e, t) {
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
    function ku(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Ou = null;
    function vg() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Ou ? false : (Ou = e, true) : (Ou = null, false);
    }
    var Xf = typeof setTimeout == "function" ? setTimeout : void 0, bg = typeof clearTimeout == "function" ? clearTimeout : void 0, Zf = typeof Promise == "function" ? Promise : void 0, Sg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zf < "u" ? function(e) {
      return Zf.resolve(null).then(e).catch(xg);
    } : Xf;
    function xg(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Wa(e) {
      return e === "head";
    }
    function Kf(e, t) {
      var a = t, n = 0;
      do {
        var l = a.nextSibling;
        if (e.removeChild(a), l && l.nodeType === 8) if (a = l.data, a === "/$" || a === "/&") {
          if (n === 0) {
            e.removeChild(l), fl(t);
            return;
          }
          n--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") n++;
        else if (a === "html") ti(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, ti(a);
          for (var s = a.firstChild; s; ) {
            var u = s.nextSibling, d = s.nodeName;
            s[bl] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && s.rel.toLowerCase() === "stylesheet" || a.removeChild(s), s = u;
          }
        } else a === "body" && ti(e.ownerDocument.body);
        a = l;
      } while (a);
      fl(t);
    }
    function Jf(e, t) {
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
    function Lu(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Lu(a), Ys(a);
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
    function wg(e, t, a, n) {
      for (; e.nodeType === 1; ) {
        var l = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (n) {
          if (!e[bl]) switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence")) break;
              if (s !== l.rel || e.getAttribute("href") !== (l.href == null || l.href === "" ? null : l.href) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin) || e.getAttribute("title") !== (l.title == null ? null : l.title)) break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (l.src == null ? null : l.src) || e.getAttribute("type") !== (l.type == null ? null : l.type) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
              return e;
            default:
              return e;
          }
        } else if (t === "input" && e.type === "hidden") {
          var s = l.name == null ? null : "" + l.name;
          if (l.type === "hidden" && e.getAttribute("name") === s) return e;
        } else return e;
        if (e = Kt(e.nextSibling), e === null) break;
      }
      return null;
    }
    function Mg(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Ff(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function qu(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function Bu(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function jg(e, t) {
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
    var Hu = null;
    function $f(e) {
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
    function If(e) {
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
    function Wf(e, t, a) {
      switch (t = ps(a), e) {
        case "html":
          if (e = t.documentElement, !e) throw Error(r(452));
          return e;
        case "head":
          if (e = t.head, !e) throw Error(r(453));
          return e;
        case "body":
          if (e = t.body, !e) throw Error(r(454));
          return e;
        default:
          throw Error(r(451));
      }
    }
    function ti(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Ys(e);
    }
    var Jt = /* @__PURE__ */ new Map(), Pf = /* @__PURE__ */ new Set();
    function gs(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Ca = D.d;
    D.d = {
      f: Ag,
      r: Eg,
      D: Cg,
      C: Ng,
      L: Rg,
      m: Tg,
      X: _g,
      S: zg,
      M: Dg
    };
    function Ag() {
      var e = Ca.f(), t = cs();
      return e || t;
    }
    function Eg(e) {
      var t = zn(e);
      t !== null && t.tag === 5 && t.type === "form" ? pd(t) : Ca.r(e);
    }
    var ol = typeof document > "u" ? null : document;
    function em(e, t, a) {
      var n = ol;
      if (n && typeof t == "string" && t) {
        var l = Ht(t);
        l = 'link[rel="' + e + '"][href="' + l + '"]', typeof a == "string" && (l += '[crossorigin="' + a + '"]'), Pf.has(l) || (Pf.add(l), e = {
          rel: e,
          crossOrigin: a,
          href: t
        }, n.querySelector(l) === null && (t = n.createElement("link"), gt(t, "link", e), ot(t), n.head.appendChild(t)));
      }
    }
    function Cg(e) {
      Ca.D(e), em("dns-prefetch", e, null);
    }
    function Ng(e, t) {
      Ca.C(e, t), em("preconnect", e, t);
    }
    function Rg(e, t, a) {
      Ca.L(e, t, a);
      var n = ol;
      if (n && e && t) {
        var l = 'link[rel="preload"][as="' + Ht(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (l += '[imagesrcset="' + Ht(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (l += '[imagesizes="' + Ht(a.imageSizes) + '"]')) : l += '[href="' + Ht(e) + '"]';
        var s = l;
        switch (t) {
          case "style":
            s = rl(e);
            break;
          case "script":
            s = dl(e);
        }
        Jt.has(s) || (e = G({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        }, a), Jt.set(s, e), n.querySelector(l) !== null || t === "style" && n.querySelector(ai(s)) || t === "script" && n.querySelector(ni(s)) || (t = n.createElement("link"), gt(t, "link", e), ot(t), n.head.appendChild(t)));
      }
    }
    function Tg(e, t) {
      Ca.m(e, t);
      var a = ol;
      if (a && e) {
        var n = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + Ht(n) + '"][href="' + Ht(e) + '"]', s = l;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            s = dl(e);
        }
        if (!Jt.has(s) && (e = G({
          rel: "modulepreload",
          href: e
        }, t), Jt.set(s, e), a.querySelector(l) === null)) {
          switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (a.querySelector(ni(s))) return;
          }
          n = a.createElement("link"), gt(n, "link", e), ot(n), a.head.appendChild(n);
        }
      }
    }
    function zg(e, t, a) {
      Ca.S(e, t, a);
      var n = ol;
      if (n && e) {
        var l = _n(n).hoistableStyles, s = rl(e);
        t = t || "default";
        var u = l.get(s);
        if (!u) {
          var d = {
            loading: 0,
            preload: null
          };
          if (u = n.querySelector(ai(s))) d.loading = 5;
          else {
            e = G({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, a), (a = Jt.get(s)) && Gu(e, a);
            var h = u = n.createElement("link");
            ot(h), gt(h, "link", e), h._p = new Promise(function(T, O) {
              h.onload = T, h.onerror = O;
            }), h.addEventListener("load", function() {
              d.loading |= 1;
            }), h.addEventListener("error", function() {
              d.loading |= 2;
            }), d.loading |= 4, ys(u, t, n);
          }
          u = {
            type: "stylesheet",
            instance: u,
            count: 1,
            state: d
          }, l.set(s, u);
        }
      }
    }
    function _g(e, t) {
      Ca.X(e, t);
      var a = ol;
      if (a && e) {
        var n = _n(a).hoistableScripts, l = dl(e), s = n.get(l);
        s || (s = a.querySelector(ni(l)), s || (e = G({
          src: e,
          async: true
        }, t), (t = Jt.get(l)) && Yu(e, t), s = a.createElement("script"), ot(s), gt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function Dg(e, t) {
      Ca.M(e, t);
      var a = ol;
      if (a && e) {
        var n = _n(a).hoistableScripts, l = dl(e), s = n.get(l);
        s || (s = a.querySelector(ni(l)), s || (e = G({
          src: e,
          async: true,
          type: "module"
        }, t), (t = Jt.get(l)) && Yu(e, t), s = a.createElement("script"), ot(s), gt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function tm(e, t, a, n) {
      var l = (l = be.current) ? gs(l) : null;
      if (!l) throw Error(r(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (t = rl(a.href), a = _n(l).hoistableStyles, n = a.get(t), n || (n = {
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
            e = rl(a.href);
            var s = _n(l).hoistableStyles, u = s.get(e);
            if (u || (l = l.ownerDocument || l, u = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            }, s.set(e, u), (s = l.querySelector(ai(e))) && !s._p && (u.instance = s, u.state.loading = 5), Jt.has(e) || (a = {
              rel: "preload",
              as: "style",
              href: a.href,
              crossOrigin: a.crossOrigin,
              integrity: a.integrity,
              media: a.media,
              hrefLang: a.hrefLang,
              referrerPolicy: a.referrerPolicy
            }, Jt.set(e, a), s || Ug(l, e, a, u.state))), t && n === null) throw Error(r(528, ""));
            return u;
          }
          if (t && n !== null) throw Error(r(529, ""));
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = dl(a), a = _n(l).hoistableScripts, n = a.get(t), n || (n = {
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
          throw Error(r(444, e));
      }
    }
    function rl(e) {
      return 'href="' + Ht(e) + '"';
    }
    function ai(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function am(e) {
      return G({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Ug(e, t, a, n) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
        return n.loading |= 1;
      }), t.addEventListener("error", function() {
        return n.loading |= 2;
      }), gt(t, "link", a), ot(t), e.head.appendChild(t));
    }
    function dl(e) {
      return '[src="' + Ht(e) + '"]';
    }
    function ni(e) {
      return "script[async]" + e;
    }
    function nm(e, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var n = e.querySelector('style[data-href~="' + Ht(a.href) + '"]');
          if (n) return t.instance = n, ot(n), n;
          var l = G({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement("style"), ot(n), gt(n, "style", l), ys(n, a.precedence, e), t.instance = n;
        case "stylesheet":
          l = rl(a.href);
          var s = e.querySelector(ai(l));
          if (s) return t.state.loading |= 4, t.instance = s, ot(s), s;
          n = am(a), (l = Jt.get(l)) && Gu(n, l), s = (e.ownerDocument || e).createElement("link"), ot(s);
          var u = s;
          return u._p = new Promise(function(d, h) {
            u.onload = d, u.onerror = h;
          }), gt(s, "link", n), t.state.loading |= 4, ys(s, a.precedence, e), t.instance = s;
        case "script":
          return s = dl(a.src), (l = e.querySelector(ni(s))) ? (t.instance = l, ot(l), l) : (n = a, (l = Jt.get(s)) && (n = G({}, a), Yu(n, l)), e = e.ownerDocument || e, l = e.createElement("script"), ot(l), gt(l, "link", n), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, ys(n, a.precedence, e));
      return t.instance;
    }
    function ys(e, t, a) {
      for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), l = n.length ? n[n.length - 1] : null, s = l, u = 0; u < n.length; u++) {
        var d = n[u];
        if (d.dataset.precedence === t) s = d;
        else if (s !== l) break;
      }
      s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Gu(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Yu(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var vs = null;
    function lm(e, t, a) {
      if (vs === null) {
        var n = /* @__PURE__ */ new Map(), l = vs = /* @__PURE__ */ new Map();
        l.set(a, n);
      } else l = vs, n = l.get(a), n || (n = /* @__PURE__ */ new Map(), l.set(a, n));
      if (n.has(e)) return n;
      for (n.set(e, null), a = a.getElementsByTagName(e), l = 0; l < a.length; l++) {
        var s = a[l];
        if (!(s[bl] || s[ft] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
          var u = s.getAttribute(t) || "";
          u = e + u;
          var d = n.get(u);
          d ? d.push(s) : n.set(u, [
            s
          ]);
        }
      }
      return n;
    }
    function im(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null);
    }
    function kg(e, t, a) {
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
    function sm(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function Og(e, t, a, n) {
      if (a.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var l = rl(n.href), s = t.querySelector(ai(l));
          if (s) {
            t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = bs.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = s, ot(s);
            return;
          }
          s = t.ownerDocument || t, n = am(n), (l = Jt.get(l)) && Gu(n, l), s = s.createElement("link"), ot(s);
          var u = s;
          u._p = new Promise(function(d, h) {
            u.onload = d, u.onerror = h;
          }), gt(s, "link", n), a.instance = s;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = bs.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    var Qu = 0;
    function Lg(e, t) {
      return e.stylesheets && e.count === 0 && xs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var n = setTimeout(function() {
          if (e.stylesheets && xs(e, e.stylesheets), e.unsuspend) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Qu === 0 && (Qu = 62500 * yg());
        var l = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && xs(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, (e.imgBytes > Qu ? 50 : 800) + t);
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(n), clearTimeout(l);
        };
      } : null;
    }
    function bs() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) xs(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var Ss = null;
    function xs(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, Ss = /* @__PURE__ */ new Map(), t.forEach(qg, e), Ss = null, bs.call(e));
    }
    function qg(e, t) {
      if (!(t.state.loading & 4)) {
        var a = Ss.get(e);
        if (a) var n = a.get(null);
        else {
          a = /* @__PURE__ */ new Map(), Ss.set(e, a);
          for (var l = e.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0; s < l.length; s++) {
            var u = l[s];
            (u.nodeName === "LINK" || u.getAttribute("media") !== "not all") && (a.set(u.dataset.precedence, u), n = u);
          }
          n && a.set(null, n);
        }
        l = t.instance, u = l.getAttribute("data-precedence"), s = a.get(u) || n, s === n && a.set(null, l), a.set(u, l), this.count++, n = bs.bind(this), l.addEventListener("load", n), l.addEventListener("error", n), s ? s.parentNode.insertBefore(l, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
      }
    }
    var li = {
      $$typeof: ce,
      Provider: null,
      Consumer: null,
      _currentValue: ee,
      _currentValue2: ee,
      _threadCount: 0
    };
    function Bg(e, t, a, n, l, s, u, d, h) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qs(0), this.hiddenUpdates = qs(null), this.identifierPrefix = n, this.onUncaughtError = l, this.onCaughtError = s, this.onRecoverableError = u, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function cm(e, t, a, n, l, s, u, d, h, T, O, Q) {
      return e = new Bg(e, t, a, u, h, T, O, Q, d), t = 1, s === true && (t |= 24), s = _t(3, null, null, t), e.current = s, s.stateNode = e, t = wc(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
        element: n,
        isDehydrated: a,
        cache: t
      }, Ec(s), e;
    }
    function um(e) {
      return e ? (e = Yn, e) : Yn;
    }
    function om(e, t, a, n, l, s) {
      l = um(l), n.context === null ? n.context = l : n.pendingContext = l, n = Ga(t), n.payload = {
        element: a
      }, s = s === void 0 ? null : s, s !== null && (n.callback = s), a = Ya(e, n, t), a !== null && (Ct(a, e, t), Ol(a, e, t));
    }
    function rm(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Vu(e, t) {
      rm(e, t), (e = e.alternate) && rm(e, t);
    }
    function dm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = mn(e, 67108864);
        t !== null && Ct(t, e, 67108864), Vu(e, 67108864);
      }
    }
    function fm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Lt();
        t = Bs(t);
        var a = mn(e, t);
        a !== null && Ct(a, e, t), Vu(e, t);
      }
    }
    var ws = true;
    function Hg(e, t, a, n) {
      var l = j.T;
      j.T = null;
      var s = D.p;
      try {
        D.p = 2, Xu(e, t, a, n);
      } finally {
        D.p = s, j.T = l;
      }
    }
    function Gg(e, t, a, n) {
      var l = j.T;
      j.T = null;
      var s = D.p;
      try {
        D.p = 8, Xu(e, t, a, n);
      } finally {
        D.p = s, j.T = l;
      }
    }
    function Xu(e, t, a, n) {
      if (ws) {
        var l = Zu(n);
        if (l === null) zu(e, t, n, Ms, a), hm(e, n);
        else if (Qg(l, e, t, a, n)) n.stopPropagation();
        else if (hm(e, n), t & 4 && -1 < Yg.indexOf(e)) {
          for (; l !== null; ) {
            var s = zn(l);
            if (s !== null) switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var u = un(s.pendingLanes);
                  if (u !== 0) {
                    var d = s;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; u; ) {
                      var h = 1 << 31 - Tt(u);
                      d.entanglements[1] |= h, u &= ~h;
                    }
                    ia(s), (Oe & 6) === 0 && (is = te() + 500, Wl(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = mn(s, 2), d !== null && Ct(d, s, 2), cs(), Vu(s, 2);
            }
            if (s = Zu(n), s === null && zu(e, t, n, Ms, a), s === l) break;
            l = s;
          }
          l !== null && n.stopPropagation();
        } else zu(e, t, n, null, a);
      }
    }
    function Zu(e) {
      return e = Js(e), Ku(e);
    }
    var Ms = null;
    function Ku(e) {
      if (Ms = null, e = Tn(e), e !== null) {
        var t = y(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = E(t), e !== null) return e;
            e = null;
          } else if (a === 31) {
            if (e = A(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return Ms = e, null;
    }
    function mm(e) {
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
          switch (re()) {
            case Xe:
              return 2;
            case nt:
              return 8;
            case Le:
            case Wt:
              return 32;
            case _a2:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Ju = false, Pa = null, en = null, tn = null, ii = /* @__PURE__ */ new Map(), si = /* @__PURE__ */ new Map(), an = [], Yg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function hm(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Pa = null;
          break;
        case "dragenter":
        case "dragleave":
          en = null;
          break;
        case "mouseover":
        case "mouseout":
          tn = null;
          break;
        case "pointerover":
        case "pointerout":
          ii.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          si.delete(t.pointerId);
      }
    }
    function ci(e, t, a, n, l, s) {
      return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: n,
        nativeEvent: s,
        targetContainers: [
          l
        ]
      }, t !== null && (t = zn(t), t !== null && dm(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
    }
    function Qg(e, t, a, n, l) {
      switch (t) {
        case "focusin":
          return Pa = ci(Pa, e, t, a, n, l), true;
        case "dragenter":
          return en = ci(en, e, t, a, n, l), true;
        case "mouseover":
          return tn = ci(tn, e, t, a, n, l), true;
        case "pointerover":
          var s = l.pointerId;
          return ii.set(s, ci(ii.get(s) || null, e, t, a, n, l)), true;
        case "gotpointercapture":
          return s = l.pointerId, si.set(s, ci(si.get(s) || null, e, t, a, n, l)), true;
      }
      return false;
    }
    function pm(e) {
      var t = Tn(e.target);
      if (t !== null) {
        var a = y(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = E(a), t !== null) {
              e.blockedOn = t, No(e.priority, function() {
                fm(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = A(a), t !== null) {
              e.blockedOn = t, No(e.priority, function() {
                fm(a);
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
    function js(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Zu(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var n = new a.constructor(a.type, a);
          Ks = n, a.target.dispatchEvent(n), Ks = null;
        } else return t = zn(a), t !== null && dm(t), e.blockedOn = a, false;
        t.shift();
      }
      return true;
    }
    function gm(e, t, a) {
      js(e) && a.delete(t);
    }
    function Vg() {
      Ju = false, Pa !== null && js(Pa) && (Pa = null), en !== null && js(en) && (en = null), tn !== null && js(tn) && (tn = null), ii.forEach(gm), si.forEach(gm);
    }
    function As(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Ju || (Ju = true, c.unstable_scheduleCallback(c.unstable_NormalPriority, Vg)));
    }
    var Es = null;
    function ym(e) {
      Es !== e && (Es = e, c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
        Es === e && (Es = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], n = e[t + 1], l = e[t + 2];
          if (typeof n != "function") {
            if (Ku(n || a) === null) continue;
            break;
          }
          var s = zn(a);
          s !== null && (e.splice(t, 3), t -= 3, Zc(s, {
            pending: true,
            data: l,
            method: a.method,
            action: n
          }, n, l));
        }
      }));
    }
    function fl(e) {
      function t(h) {
        return As(h, e);
      }
      Pa !== null && As(Pa, e), en !== null && As(en, e), tn !== null && As(tn, e), ii.forEach(t), si.forEach(t);
      for (var a = 0; a < an.length; a++) {
        var n = an[a];
        n.blockedOn === e && (n.blockedOn = null);
      }
      for (; 0 < an.length && (a = an[0], a.blockedOn === null); ) pm(a), a.blockedOn === null && an.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
        var l = a[n], s = a[n + 1], u = l[xt] || null;
        if (typeof s == "function") u || ym(a);
        else if (u) {
          var d = null;
          if (s && s.hasAttribute("formAction")) {
            if (l = s, u = s[xt] || null) d = u.formAction;
            else if (Ku(l) !== null) continue;
          } else d = u.action;
          typeof d == "function" ? a[n + 1] = d : (a.splice(n, 3), n -= 3), ym(a);
        }
      }
    }
    function vm() {
      function e(s) {
        s.canIntercept && s.info === "react-transition" && s.intercept({
          handler: function() {
            return new Promise(function(u) {
              return l = u;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function t() {
        l !== null && (l(), l = null), n || setTimeout(a, 20);
      }
      function a() {
        if (!n && !navigation.transition) {
          var s = navigation.currentEntry;
          s && s.url != null && navigation.navigate(s.url, {
            state: s.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var n = false, l = null;
        return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
          n = true, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), l !== null && (l(), l = null);
        };
      }
    }
    function Fu(e) {
      this._internalRoot = e;
    }
    Cs.prototype.render = Fu.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current, n = Lt();
      om(a, n, e, t, null, null);
    }, Cs.prototype.unmount = Fu.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        om(e.current, 2, null, e, null, null), cs(), t[Rn] = null;
      }
    };
    function Cs(e) {
      this._internalRoot = e;
    }
    Cs.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Co();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var a = 0; a < an.length && t !== 0 && t < an[a].priority; a++) ;
        an.splice(a, 0, e), a === 0 && pm(e);
      }
    };
    var bm = o.version;
    if (bm !== "19.2.7") throw Error(r(527, bm, "19.2.7"));
    D.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
      return e = p(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var Xg = {
      bundleType: 0,
      version: "19.2.7",
      rendererPackageName: "react-dom",
      currentDispatcherRef: j,
      reconcilerVersion: "19.2.7"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Ns = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Ns.isDisabled && Ns.supportsFiber) try {
        gl = Ns.inject(Xg), Rt = Ns;
      } catch {
      }
    }
    return oi.createRoot = function(e, t) {
      if (!m(e)) throw Error(r(299));
      var a = false, n = "", l = Ad, s = Ed, u = Cd;
      return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), t = cm(e, 1, false, null, null, a, n, null, l, s, u, vm), e[Rn] = t.current, Tu(e), new Fu(t);
    }, oi.hydrateRoot = function(e, t, a) {
      if (!m(e)) throw Error(r(299));
      var n = false, l = "", s = Ad, u = Ed, d = Cd, h = null;
      return a != null && (a.unstable_strictMode === true && (n = true), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (s = a.onUncaughtError), a.onCaughtError !== void 0 && (u = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (h = a.formState)), t = cm(e, 1, true, t, a ?? null, n, l, h, s, u, d, vm), t.context = um(null), a = t.current, n = Lt(), n = Bs(n), l = Ga(n), l.callback = null, Ya(a, l, n), a = n, t.current.lanes = a, vl(t, a), ia(t), e[Rn] = t.current, Tu(e), new Cs(t);
    }, oi.version = "19.2.7", oi;
  }
  var Rm;
  function ty() {
    if (Rm) return Wu.exports;
    Rm = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
    }
    return c(), Wu.exports = ey(), Wu.exports;
  }
  var ay = ty();
  const ny = {
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
  function ly(c) {
    const [o, f] = ny[c];
    return f === null ? `${o}+ Elo` : `${o}\u2013${f} Elo`;
  }
  function pl(c) {
    return c >= 2200 ? "Grandmaster" : c >= 1800 ? "Master" : c >= 1400 ? "Diamond" : c >= 1200 ? "Platinum" : c >= 1e3 ? "Gold" : c >= 800 ? "Silver" : c >= 501 ? "Bronze" : "Copper";
  }
  function so(c) {
    const o = pl(c), f = {
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
    }, [r, m] = f[o];
    return c >= m ? 1 : c >= r ? 2 : 3;
  }
  function di(c) {
    const o = pl(c), f = so(c);
    return `${o} ${f === 1 ? "I" : f === 2 ? "II" : "III"}`;
  }
  function iy(c, o) {
    return o > c && (pl(c) !== pl(o) || so(c) !== so(o));
  }
  function sa({ label: c, value: o, detail: f }) {
    return i.jsxs("div", {
      className: "metric",
      children: [
        i.jsx("span", {
          children: c
        }),
        i.jsx("strong", {
          children: o
        }),
        f && i.jsx("small", {
          children: f
        })
      ]
    });
  }
  function lh({ form: c }) {
    return i.jsx("span", {
      className: "form-pips",
      "aria-label": `Recent form ${c.join(", ")}`,
      children: c.map((o, f) => i.jsx("i", {
        className: `pip ${o}`,
        title: o.toUpperCase()
      }, `${o}-${f}`))
    });
  }
  const sy = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ih = (...c) => c.filter((o, f, r) => !!o && o.trim() !== "" && r.indexOf(o) === f).join(" ").trim();
  var cy = {
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
  const uy = C.forwardRef(({ color: c = "currentColor", size: o = 24, strokeWidth: f = 2, absoluteStrokeWidth: r, className: m = "", children: y, iconNode: E, ...A }, x) => C.createElement("svg", {
    ref: x,
    ...cy,
    width: o,
    height: o,
    stroke: c,
    strokeWidth: r ? Number(f) * 24 / Number(o) : f,
    className: ih("lucide", m),
    ...A
  }, [
    ...E.map(([p, S]) => C.createElement(p, S)),
    ...Array.isArray(y) ? y : [
      y
    ]
  ]));
  const ge = (c, o) => {
    const f = C.forwardRef(({ className: r, ...m }, y) => C.createElement(uy, {
      ref: y,
      iconNode: o,
      className: ih(`lucide-${sy(c)}`, r),
      ...m
    }));
    return f.displayName = `${c}`, f;
  };
  const oy = ge("ArrowLeft", [
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
  const ry = ge("ArrowRight", [
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
  const dy = ge("ChartColumn", [
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
  const ks = ge("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const Tm = ge("ChevronLeft", [
    [
      "path",
      {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
      }
    ]
  ]);
  const zm = ge("ChevronRight", [
    [
      "path",
      {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
      }
    ]
  ]);
  const fy = ge("CircleCheck", [
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
  const my = ge("CircleHelp", [
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
  const sh = ge("CircleX", [
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
  const hy = ge("Clock3", [
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
  const py = ge("Clock", [
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
  const gy = ge("Copy", [
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
  const yy = ge("Crown", [
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
  const vy = ge("Expand", [
    [
      "path",
      {
        d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8",
        key: "1c15vz"
      }
    ],
    [
      "path",
      {
        d: "M3 16.2V21m0 0h4.8M3 21l6-6",
        key: "1fsnz2"
      }
    ],
    [
      "path",
      {
        d: "M21 7.8V3m0 0h-4.8M21 3l-6 6",
        key: "hawz9i"
      }
    ],
    [
      "path",
      {
        d: "M3 7.8V3m0 0h4.8M3 3l6 6",
        key: "u9ee12"
      }
    ]
  ]);
  const co = ge("Gamepad2", [
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
  const by = ge("History", [
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
  const Sy = ge("House", [
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
  const xy = ge("Info", [
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
  const ch = ge("LoaderCircle", [
    [
      "path",
      {
        d: "M21 12a9 9 0 1 1-6.219-8.56",
        key: "13zald"
      }
    ]
  ]);
  const uh = ge("LogIn", [
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
  const wy = ge("LogOut", [
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
  const oh = ge("MessageCircle", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ]
  ]);
  const My = ge("MessageSquare", [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz"
      }
    ]
  ]);
  const jy = ge("Minimize", [
    [
      "path",
      {
        d: "M8 3v3a2 2 0 0 1-2 2H3",
        key: "hohbtr"
      }
    ],
    [
      "path",
      {
        d: "M21 8h-3a2 2 0 0 1-2-2V3",
        key: "5jw1f3"
      }
    ],
    [
      "path",
      {
        d: "M3 16h3a2 2 0 0 1 2 2v3",
        key: "198tvr"
      }
    ],
    [
      "path",
      {
        d: "M16 21v-3a2 2 0 0 1 2-2h3",
        key: "ph8mxp"
      }
    ]
  ]);
  const rh = ge("Minus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ]
  ]);
  const Ay = ge("Pause", [
    [
      "rect",
      {
        x: "14",
        y: "4",
        width: "4",
        height: "16",
        rx: "1",
        key: "zuxfzm"
      }
    ],
    [
      "rect",
      {
        x: "6",
        y: "4",
        width: "4",
        height: "16",
        rx: "1",
        key: "1okwgv"
      }
    ]
  ]);
  const _m = ge("Play", [
    [
      "polygon",
      {
        points: "6 3 20 12 6 21 6 3",
        key: "1oa8hb"
      }
    ]
  ]);
  const Ey = ge("Plus", [
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
  const Dm = ge("RefreshCw", [
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
  const Ds = ge("Search", [
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
  const yo = ge("Send", [
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
  const uo = ge("Settings", [
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
  const Cy = ge("Shield", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ]);
  const Ny = ge("Shuffle", [
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
  const dh = ge("Star", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ]);
  const vo = ge("Swords", [
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
  const Ry = ge("TriangleAlert", [
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
  const Ty = ge("Trophy", [
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
  const ao = ge("UserMinus", [
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
  const zy = ge("UserPlus", [
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
  const _y = ge("User", [
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
  const fi = ge("Users", [
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
  const Dy = ge("Volume2", [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw"
      }
    ],
    [
      "path",
      {
        d: "M16 9a5 5 0 0 1 0 6",
        key: "1q6k2b"
      }
    ],
    [
      "path",
      {
        d: "M19.364 18.364a9 9 0 0 0 0-12.728",
        key: "ijwkga"
      }
    ]
  ]);
  const Uy = ge("VolumeX", [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "16",
        y1: "9",
        y2: "15",
        key: "1ewh16"
      }
    ],
    [
      "line",
      {
        x1: "16",
        x2: "22",
        y1: "9",
        y2: "15",
        key: "5ykzw1"
      }
    ]
  ]);
  const ky = ge("Wrench", [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ]);
  const Nn = ge("X", [
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
  const Oy = ge("Youtube", [
    [
      "path",
      {
        d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
        key: "1q2vi4"
      }
    ],
    [
      "path",
      {
        d: "m10 15 5-3-5-3z",
        key: "1jp15x"
      }
    ]
  ]);
  function Ly({ maps: c, limit: o, selectedMapIds: f, onToggle: r, favoriteMapId: m, onFavorite: y, disabled: E = false }) {
    const A = o === void 0 ? c : c.slice(0, o), x = f !== void 0 && r !== void 0;
    return i.jsx("div", {
      className: "map-pool",
      children: A.map((p) => {
        const S = !x || f.includes(p.id), G = i.jsxs(i.Fragment, {
          children: [
            i.jsx("img", {
              src: p.thumbnailUrl,
              alt: ""
            }),
            i.jsx("span", {
              className: "map-name",
              children: p.name
            })
          ]
        });
        return x ? i.jsxs("div", {
          className: "map-thumbnail-wrap",
          children: [
            i.jsx("button", {
              className: S ? "map-thumbnail selected" : "map-thumbnail",
              type: "button",
              "aria-pressed": S,
              "aria-label": `${S ? "Exclude" : "Include"} ${p.name}`,
              disabled: E,
              onClick: () => r(p.id),
              children: G
            }),
            y && i.jsx("button", {
              className: m === p.id ? "map-favorite active" : "map-favorite",
              type: "button",
              disabled: E,
              "aria-pressed": m === p.id,
              "aria-label": `${m === p.id ? "Remove" : "Favorite"} ${p.name}`,
              title: m === p.id ? "Remove favorite" : "Set as favorite",
              onClick: () => y(p.id),
              children: i.jsx(dh, {
                size: 16,
                fill: m === p.id ? "currentColor" : "none"
              })
            })
          ]
        }, p.id) : i.jsx("figure", {
          className: "map-thumbnail selected",
          children: G
        }, p.id);
      })
    });
  }
  const qy = 5, By = [
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
  ], Hy = [
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
  ], Gy = {
    version: qy,
    groups: By,
    maps: Hy
  }, Nt = Gy, Yy = new Map(Nt.maps.map((c) => [
    c.id,
    c
  ])), bo = Nt.maps.filter((c) => c.enabled !== false);
  function fh(c) {
    return Yy.get(c);
  }
  function Qy(c, o, f = Math.random) {
    var _a2, _b2;
    const r = new Set(o.mapPool.map((p) => p.id)), m = c.mapPool.filter((p) => r.has(p.id));
    if (m.length === 0) return;
    const y = new Set(Object.values(((_a2 = c.mapPreferences) == null ? void 0 : _a2.favoriteMapIds) ?? {})), E = new Set(Object.values(((_b2 = o.mapPreferences) == null ? void 0 : _b2.favoriteMapIds) ?? {})), A = m.filter((p) => y.has(p.id) && E.has(p.id));
    if (A.length > 0) return A[Math.floor(f() * A.length)];
    const x = m.flatMap((p) => Array.from({
      length: 1 + Number(y.has(p.id)) + Number(E.has(p.id))
    }, () => p));
    return x[Math.floor(f() * x.length)];
  }
  const Vy = "" + new URL("acropolis-wApZU8dN.png", import.meta.url).href, Xy = "" + new URL("african-clearing--8pL0rBU.png", import.meta.url).href, Zy = "" + new URL("arabia-DEdeLqx5.png", import.meta.url).href, Ky = "" + new URL("arena-CISRjdFq.png", import.meta.url).href, Jy = "" + new URL("atacama-CxHEccMV.png", import.meta.url).href, Fy = "" + new URL("baltic-DlU6ncMk.png", import.meta.url).href, $y = "" + new URL("black-forest-CTgJoH8n.png", import.meta.url).href, Iy = "" + new URL("fortified-clearing-DSf9SH4j.png", import.meta.url).href, Wy = "" + new URL("four-lakes-DxiZ0myb.png", import.meta.url).href, Py = "" + new URL("golden-swamp-DXKIJwHr.png", import.meta.url).href, ev = "" + new URL("gold-rush-BqrgFIGq.png", import.meta.url).href, tv = "" + new URL("hideout-hd8sM5kE.png", import.meta.url).href, av = "" + new URL("islands-DmKyUyda.png", import.meta.url).href, nv = "" + new URL("land-madness-3-nLWb05.png", import.meta.url).href, lv = "" + new URL("land-nomad-DxHp81Hp.png", import.meta.url).href, iv = "" + new URL("mediterranean-CKpZDwRi.png", import.meta.url).href, sv = "" + new URL("michi-Cry_Jx1o.png", import.meta.url).href, cv = {
    "arabia.png": Zy,
    "land-madness.png": nv,
    "acropolis.png": Vy,
    "african-clearing.png": Xy,
    "atacama.png": Jy,
    "gold-rush.png": ev,
    "land-nomad.png": lv,
    "arena.png": Ky,
    "fortified-clearing.png": Iy,
    "hideout.png": tv,
    "black-forest.png": $y,
    "michi.png": sv,
    "four-lakes.png": Wy,
    "baltic.png": Fy,
    "islands.png": av,
    "mediterranean.png": iv,
    "golden-swamp.png": Py
  }, $t = bo.map((c) => ({
    id: c.id,
    name: c.name,
    style: c.style,
    thumbnailUrl: cv[c.imageAsset]
  })), sn = Nt.groups.map((c) => ({
    ...c,
    maps: $t.filter((o) => {
      var _a2;
      return ((_a2 = Nt.maps.find((f) => f.id === o.id)) == null ? void 0 : _a2.groupId) === c.id;
    })
  })), Rs = [
    "Britons",
    "Franks",
    "Mayans",
    "Lithuanians",
    "Hindustanis",
    "Mongols",
    "Aztecs",
    "Byzantines",
    "Japanese",
    "Poles"
  ], dt = {
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
  }, Um = [
    "US",
    "CA",
    "BR",
    "GB",
    "DE",
    "FR",
    "ES",
    "PL",
    "SE",
    "KR",
    "JP",
    "AU"
  ], km = [
    "StoneGate",
    "MangoLine",
    "BoarPuller",
    "DarkAgeDan",
    "ScoutRush",
    "WallBuilder",
    "RelicRunner",
    "TownBell",
    "HillFort",
    "CastleClick",
    "FarmReset",
    "GoldMiner",
    "BerryGuard",
    "LoomFirst",
    "FastImp",
    "StableSwitch",
    "ArcherSplit",
    "MarketAbuse",
    "MonkMicro",
    "DockDrop"
  ];
  function uv(c) {
    return [
      0,
      1,
      2,
      3,
      4
    ].map((o) => (c + o) % 3 === 0 ? "loss" : "win");
  }
  const Os = Array.from({
    length: 50
  }, (c, o) => {
    const f = 1910 - o * 17 + o % 5 * 3, r = 420 - o * 4, m = 170 + o * 3;
    return {
      id: o === 17 ? dt.id : `player-${o + 1}`,
      aoeProfileId: o === 17 ? dt.aoeProfileId : 62e5 + o,
      displayName: o === 17 ? dt.displayName : `${km[o % km.length]}${o + 11}`,
      countryCode: Um[o % Um.length],
      rating: o === 17 ? dt.rating : f,
      peakRating: o === 17 ? dt.peakRating : f + 54,
      teamRating: o === 17 ? dt.teamRating : f - 75,
      teamPeakRating: o === 17 ? dt.teamPeakRating : f - 20,
      legacy1v1Wins: r,
      legacy1v1Losses: m,
      legacyTeamWins: Math.max(0, r - 120),
      legacyTeamLosses: Math.max(0, m - 80),
      rank: o === 17 ? dt.rank : o + 1,
      division: pl(o === 17 ? dt.rating : f),
      wins: r,
      losses: m,
      winRate: Number((r / (r + m) * 100).toFixed(1)),
      streak: o % 9 - 3,
      preferredMaps: [
        $t[o % $t.length].name,
        $t[(o + 3) % $t.length].name
      ],
      favoriteCivilizations: [
        Rs[o % Rs.length],
        Rs[(o + 4) % Rs.length]
      ],
      recentForm: uv(o)
    };
  }), Om = Os.filter((c) => c.id !== dt.id).slice(10, 18);
  Object.fromEntries(bo.map((c) => [
    c.gameMapName,
    c.lobbyPickerResultIndex
  ]));
  const ov = bo.filter((c) => c.isCustomMap).map((c) => c.gameMapName), ca = {
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
      customMapNames: ov,
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
  }, rv = 150, Lm = 4e3, Qe = {
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
  }, dv = {
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
  function Ze(c) {
    return new Promise((o) => {
      window.setTimeout(o, c);
    });
  }
  function fv(c) {
    return `[${(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour12: false
    })}] ${c}`;
  }
  class mv {
    constructor(o) {
      this.getConfig = o;
    }
    async detectInstallation() {
      return await Ze(650), this.getConfig().forceGameNotInstalled ? {
        installed: false
      } : {
        installed: true,
        path: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\AoE2DE"
      };
    }
    async detectRunningGame() {
      return await Ze(500), {
        running: true,
        pid: 4242,
        owned: true
      };
    }
    async launchGame() {
      if (await Ze(700), this.getConfig().forceGameLaunchFailure) throw new Error("Game failed to launch.");
      return {
        launched: true,
        status: "running"
      };
    }
    async focusGame() {
      return await Ze(250), {
        focused: true
      };
    }
    async createLobby(o) {
      if (await Ze(this.getConfig().lobbyCreationDelayMs), this.getConfig().forceLobbyCreationFailure) throw new Error("Lobby creation timed out.");
      return {
        lobby: {
          platformLobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`,
          lobbyName: `Empire League ${o.matchId.slice(-4).toUpperCase()}`,
          password: "empire",
          hostProfileId: o.hostProfileId,
          guestProfileId: o.guestProfileId,
          map: o.map,
          serverRegion: o.serverRegion,
          settings: {
            playerCount: o.playerCount,
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
    async discoverLobby(o) {
      return await Ze(500), {
        lobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`
      };
    }
    async openLobby(o) {
      return await Ze(250), {
        opened: true
      };
    }
    async verifyLobby(o) {
      if (await Ze(this.getConfig().lobbyVerificationDelayMs), this.getConfig().forceLobbyVerificationFailure) throw new Error("Lobby settings do not match the ranked ruleset.");
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
    async waitForGameStart(o) {
      if (await Ze(this.getConfig().forceOpponentJoinTimeout ? 5e3 : this.getConfig().opponentJoinDelayMs), this.getConfig().forceOpponentJoinTimeout) throw new Error("Opponent failed to join the lobby.");
      return {
        started: true,
        startedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async detectGameEnd(o) {
      return await Ze(this.getConfig().matchDurationMs), {
        ended: true,
        endedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  const Ls = [
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
  function hv(c, o, f = [], r = Math.random) {
    if ((c == null ? void 0 : c.mode) !== "random") return c;
    const m = o === "land-open" ? c.openLandBans : o === "land-closed" ? c.closedLandBans : [], y = /* @__PURE__ */ new Set([
      ...m ?? [],
      ...f
    ]), E = Ls.filter((A) => !y.has(A));
    return {
      mode: "pick",
      civilization: E[Math.floor(r() * E.length)]
    };
  }
  const pv = "http://192.168.4.99:4317".replace(/\/$/, "");
  class gv {
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
    setToken(o) {
      this.token !== o && (this.token = o, this.disconnect("Authentication changed."));
    }
    async request(o, f = {}) {
      await this.connect();
      const r = this.socket;
      if (!r || r.readyState !== WebSocket.OPEN) throw new Error("Matchmaker connection is unavailable.");
      const m = crypto.randomUUID(), y = new Promise((E, A) => {
        this.pending.set(m, {
          resolve: (x) => E(x),
          reject: A
        });
      });
      return r.send(JSON.stringify({
        type: "request",
        id: m,
        method: f.method ?? "GET",
        path: o,
        body: f.body
      })), y;
    }
    subscribe(o, f) {
      return this.subscription = {
        ticketId: o,
        after: 0,
        listener: f
      }, this.connect().then(() => this.sendSubscription()).catch((r) => {
        this.failSubscription(r instanceof Error ? r.message : "Matchmaker connection failed.");
      }), () => {
        var _a2;
        ((_a2 = this.subscription) == null ? void 0 : _a2.ticketId) === o && (this.subscription = null), this.reconnectTimer !== null && window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
      };
    }
    onSocialEvent(o) {
      return this.socialListeners.add(o), () => this.socialListeners.delete(o);
    }
    onCustomLobbyEvent(o) {
      return this.customLobbyListeners.add(o), () => this.customLobbyListeners.delete(o);
    }
    connect() {
      var _a2;
      if (((_a2 = this.socket) == null ? void 0 : _a2.readyState) === WebSocket.OPEN && !this.connectPromise) return Promise.resolve();
      if (this.connectPromise) return this.connectPromise;
      this.deliberatelyClosed = false, this.connectPromise = new Promise((r, m) => {
        this.connectResolve = r, this.connectReject = m;
      });
      const o = new URL("/events", pv);
      o.protocol = o.protocol === "https:" ? "wss:" : "ws:";
      const f = new WebSocket(o);
      return this.socket = f, f.addEventListener("open", () => {
        this.token ? f.send(JSON.stringify({
          type: "authenticate",
          token: this.token
        })) : this.finishConnecting();
      }), f.addEventListener("message", (r) => this.onMessage(f, r)), f.addEventListener("error", () => f.close()), f.addEventListener("close", () => this.onClose(f)), this.connectPromise;
    }
    onMessage(o, f) {
      if (o !== this.socket) return;
      let r;
      try {
        r = JSON.parse(String(f.data));
      } catch {
        this.disconnect("The matchmaker sent invalid data.");
        return;
      }
      if (r.type === "authenticated") {
        this.finishConnecting();
        return;
      }
      if (r.type === "social_event" && r.event) {
        for (const m of this.socialListeners) m(r.event);
        return;
      }
      if (r.type === "custom_lobby_event" && r.event) {
        for (const m of this.customLobbyListeners) m(r.event);
        return;
      }
      if (r.type === "response" && r.id) {
        const m = this.pending.get(r.id);
        if (!m) return;
        if (this.pending.delete(r.id), (r.status ?? 500) >= 400) {
          const y = r.body;
          m.reject(new Error((y == null ? void 0 : y.error) ?? `Matchmaker request failed (${r.status}).`));
        } else m.resolve(r.body);
        return;
      }
      if (r.type === "subscribed") {
        this.reconnectAttempts = 0;
        return;
      }
      if (r.type === "event" && this.subscription && r.ticketId === this.subscription.ticketId && r.event && Number.isSafeInteger(r.sequence)) {
        this.subscription.after = Math.max(this.subscription.after, r.sequence ?? 0), this.subscription.listener(r.event);
        return;
      }
      if (r.type === "error") {
        const m = r.message ?? r.code ?? "Matchmaker WebSocket error.";
        this.connectReject ? this.rejectConnecting(new Error(m)) : this.failSubscription(m);
      }
    }
    finishConnecting() {
      const o = this.connectResolve;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, this.reconnectAttempts = 0, o == null ? void 0 : o(), this.sendSubscription();
    }
    rejectConnecting(o) {
      const f = this.connectReject;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, f == null ? void 0 : f(o);
    }
    sendSubscription() {
      var _a2;
      !this.subscription || ((_a2 = this.socket) == null ? void 0 : _a2.readyState) !== WebSocket.OPEN || this.socket.send(JSON.stringify({
        type: "subscribe",
        ticketId: this.subscription.ticketId,
        after: this.subscription.after
      }));
    }
    onClose(o) {
      if (o !== this.socket) return;
      this.socket = null, this.rejectConnecting(new Error("Matchmaker connection closed."));
      for (const r of this.pending.values()) r.reject(new Error("Matchmaker connection closed."));
      if (this.pending.clear(), this.deliberatelyClosed || !this.subscription) return;
      if (this.reconnectAttempts += 1, this.reconnectAttempts > 5) {
        this.failSubscription("The connection to the matchmaker was lost.");
        return;
      }
      const f = Math.min(500 * 2 ** (this.reconnectAttempts - 1), 8e3) + Math.floor(Math.random() * 250);
      this.reconnectTimer = window.setTimeout(() => void this.connect().catch(() => {
      }), f);
    }
    disconnect(o) {
      var _a2;
      this.deliberatelyClosed = true, (_a2 = this.socket) == null ? void 0 : _a2.close(1e3, o), this.socket = null, this.rejectConnecting(new Error(o));
      for (const f of this.pending.values()) f.reject(new Error(o));
      this.pending.clear();
    }
    failSubscription(o) {
      const f = this.subscription;
      this.subscription = null, f == null ? void 0 : f.listener({
        type: "error",
        code: "MATCHMAKER_UNAVAILABLE",
        message: o
      });
    }
  }
  const Ce = new gv();
  class yv {
    constructor(o) {
      __publicField(this, "listeners", /* @__PURE__ */ new Map());
      __publicField(this, "timers", /* @__PURE__ */ new Map());
      __publicField(this, "queuedDefinitions", /* @__PURE__ */ new Map());
      __publicField(this, "queueRatings", /* @__PURE__ */ new Map());
      __publicField(this, "lowerRatingLimits", /* @__PURE__ */ new Map());
      this.getConfig = o;
    }
    async joinQueue(o) {
      var _a2;
      if (await Ze(350), this.getConfig().forceQueueFailure) throw new Error("Matchmaking service is unavailable.");
      if (!((_a2 = o.queue) == null ? void 0 : _a2.mapPool.length)) throw new Error("At least one selected map is required.");
      const f = {
        id: `ticket-${crypto.randomUUID()}`,
        queueId: o.queueId,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return this.queuedDefinitions.set(f.id, o.queue), this.queueRatings.set(f.id, o.queue.format === "team" ? o.player.teamRating : o.player.rating), this.lowerRatingLimits.set(f.id, o.maximumLowerOpponentRatingGap ?? 0), f;
    }
    async updateQueue(o, f) {
      if (await Ze(75), !this.queuedDefinitions.has(o)) throw new Error("Queue ticket is no longer active.");
      if (!f.mapPool.length) throw new Error("At least one selected map is required.");
      this.queuedDefinitions.set(o, f);
    }
    async leaveQueue(o) {
      await Ze(150), this.clearTimers(o), this.listeners.delete(o), this.queuedDefinitions.delete(o), this.queueRatings.delete(o), this.lowerRatingLimits.delete(o);
    }
    subscribeToQueue(o, f) {
      this.listeners.set(o, f);
      const r = this.queuedDefinitions.get(o), m = this.getConfig(), y = [];
      return [
        0,
        2e4,
        4e4,
        6e4,
        9e4
      ].forEach((E, A) => {
        y.push(window.setTimeout(() => {
          const x = [
            50,
            75,
            100,
            150,
            250
          ][A], p = this.queueRatings.get(o) ?? dt.rating;
          f({
            type: "range",
            minRating: p - x,
            maxRating: p + x
          });
        }, E));
      }), y.push(window.setTimeout(() => {
        var _a2;
        const E = this.queuedDefinitions.get(o) ?? r, A = (E == null ? void 0 : E.mapPool) ?? $t, x = {
          mapPool: $t,
          mapPreferences: {
            favoriteMapIds: {}
          }
        }, p = this.lowerRatingLimits.get(o) ?? 0, S = p > 0 ? Om.filter((Z) => Z.rating >= dt.rating - p) : Om, G = S[Math.floor(Math.random() * S.length)];
        if (!G) return;
        const L = Qy(E ?? {
          mapPool: A
        }, x), Y = (_a2 = Nt.maps.find((Z) => Z.id === (L == null ? void 0 : L.id))) == null ? void 0 : _a2.groupId, g = E ? {
          ...E,
          civilizationPreference: hv(E.civilizationPreference, Y)
        } : void 0, W = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: g ?? {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: $t,
            mapPreferences: {
              enabledGroupIds: Nt.groups.map((Z) => Z.id),
              favoriteMapIds: {}
            },
            mapCatalogVersion: Nt.version,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          opponentCivilizationPreference: {
            mode: "pick",
            civilization: "Franks"
          },
          player: dt,
          opponent: G,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 3e4).toISOString(),
          selectedMap: L,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        f({
          type: "match_found",
          match: W
        });
      }, m.queueWaitMs)), this.timers.set(o, y), () => {
        this.clearTimers(o), this.listeners.delete(o), this.queuedDefinitions.delete(o), this.lowerRatingLimits.delete(o);
      };
    }
    async acceptMatch(o) {
      await Ze(250);
      const f = this.getConfig();
      if (f.forceOpponentDecline) throw new Error("Opponent declined the match.");
      window.setTimeout(() => {
        this.listeners.forEach((r) => r({
          type: "opponent_accepted",
          matchId: o
        }));
      }, f.opponentAcceptDelayMs);
    }
    async declineMatch(o) {
      await Ze(200);
    }
    async publishLobby(o, f) {
      await Ze(100);
    }
    async reportGuestLobbyJoined(o) {
      await Ze(100);
    }
    async reportHostLobbyReady(o) {
      await Ze(100);
    }
    async reportGuestContentAccepted(o) {
      await Ze(100);
    }
    async reportGuestLobbyReady(o) {
      await Ze(100);
    }
    async reportGameStarted(o) {
      await Ze(100);
    }
    async reportMatchResult(o) {
      await Ze(100);
    }
    clearTimers(o) {
      var _a2;
      (_a2 = this.timers.get(o)) == null ? void 0 : _a2.forEach((f) => window.clearTimeout(f)), this.timers.delete(o);
    }
  }
  class vv {
    constructor(o) {
      __publicField(this, "status", /* @__PURE__ */ new Map());
      this.getConfig = o;
    }
    async beginTracking(o) {
      await Ze(200), this.status.set(o.id, {
        matchId: o.id,
        stage: "in_game",
        message: "Match in progress"
      });
    }
    async getMatchStatus(o) {
      return await Ze(100), this.status.get(o) ?? {
        matchId: o,
        stage: "in_game",
        message: "Match in progress"
      };
    }
    async waitForVerifiedResult(o) {
      const f = [
        {
          matchId: o,
          stage: "game_finished",
          message: "Game finished"
        },
        {
          matchId: o,
          stage: "waiting_for_data",
          message: "Waiting for official match data"
        },
        {
          matchId: o,
          stage: "result_located",
          message: "Result located"
        },
        {
          matchId: o,
          stage: "players_verified",
          message: "Players verified"
        },
        {
          matchId: o,
          stage: "winner_verified",
          message: "Winner verified"
        },
        {
          matchId: o,
          stage: "rating_updated",
          message: "Rating updated"
        }
      ];
      for (const y of f) await Ze(this.getConfig().resultVerificationDelayMs), this.status.set(o, y);
      if (this.getConfig().forceResultVerificationFailure) throw this.status.set(o, {
        matchId: o,
        stage: "failed",
        message: "Result verification failed"
      }), new Error("Result service could not verify the winner.");
      const r = this.getConfig().forcedResult ?? (Math.random() > 0.38 ? "win" : "loss"), m = r === "win" ? 16 : r === "loss" ? -14 : 0;
      return {
        ratingPool: "solo",
        winnerProfileId: r === "loss" ? 990011 : 12345678,
        loserProfileId: r === "loss" ? 12345678 : 990011,
        outcome: r,
        reason: r === "no_contest" ? "unknown" : r === "loss" ? "defeat" : "resignation",
        oldRating: 1426,
        newRating: 1426 + m,
        ratingChange: m,
        verified: r !== "no_contest",
        verificationSource: "mock"
      };
    }
    async submitReplay(o) {
      return await Ze(500), {
        uploaded: true,
        replayId: `replay-${crypto.randomUUID().slice(0, 8)}`
      };
    }
  }
  let ml = null;
  const Ts = {
    async restore() {
      var _a2;
      if (ml = await ((_a2 = window.electronApi) == null ? void 0 : _a2.loadAuthToken()) ?? null, !ml) return null;
      Ce.setToken(ml);
      try {
        const c = (await Ce.request("/auth/me")).player;
        return await this.reportSteamLicense(c);
      } catch {
        return await this.logout(false), null;
      }
    },
    async signIn() {
      const c = await Ce.request("/auth/steam/start", {
        method: "POST"
      });
      if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
      await window.electronApi.openSteamLogin(c.loginUrl);
      const o = Date.now() + 300 * 1e3;
      for (; Date.now() < o; ) {
        await new Promise((m) => window.setTimeout(m, 1e3));
        const f = await Ce.request(`/auth/steam/status?attempt=${encodeURIComponent(c.attemptId)}&token=${encodeURIComponent(c.pollToken)}`);
        if (f.status === "pending") continue;
        if (f.status !== "authenticated" || !f.token) throw new Error(`Steam sign-in ${f.status}.`);
        ml = f.token, await window.electronApi.storeAuthToken(f.token), Ce.setToken(f.token);
        const r = await Ce.request("/auth/me");
        return await this.reportSteamLicense(r.player);
      }
      throw new Error("Steam sign-in timed out.");
    },
    async reportSteamLicense(c) {
      var _a2;
      if (!window.electronApi || !c.steamId) return c;
      const o = await window.electronApi.runSteamFamilyProbe(c.steamId).catch(() => null);
      return !o || o.status === "unknown" || !o.currentSteamId || !o.ownerSteamId ? c : ((_a2 = await Ce.request("/auth/steam-license", {
        method: "POST",
        body: {
          status: o.status,
          currentSteamId: o.currentSteamId,
          ownerSteamId: o.ownerSteamId
        }
      }).catch(() => null)) == null ? void 0 : _a2.player) ?? c;
    },
    async logout(c = true) {
      var _a2;
      c && ml && await Ce.request("/auth/logout", {
        method: "POST"
      }).catch(() => {
      }), ml = null, Ce.setToken(null), await ((_a2 = window.electronApi) == null ? void 0 : _a2.clearAuthToken());
    }
  }, mh = new URLSearchParams(window.location.search), xe = mh.get("preview") === "1", bv = xe && mh.get("capture") === "1", So = [
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
  ].map(([c, o, f, r, m, y, E, A, x], p) => ({
    id: String(c),
    opponentId: `preview-player-${p + 1}`,
    opponent: String(o),
    opponentRating: Number(f),
    outcome: r,
    map: String(m),
    civilization: String(y),
    opponentCivilization: String(E),
    ratingChange: Number(A),
    durationMinutes: Number(x),
    timestamp: new Date(Date.now() - p * 864e5).toISOString(),
    verified: true,
    queueType: "Ranked 1v1 Random Map"
  })), zs = [
    ri("custom-1", "Friday Nomad FFA", "Land Nomad", 8, [
      "RelicRunner",
      "BoarPuller",
      "TownBell",
      "FastImp"
    ]),
    ri("custom-2", "CBA Practice", "CBA", 8, [
      "CastleClick",
      "FarmReset",
      "GoldMiner",
      "BerryGuard",
      "LoomFirst"
    ]),
    ri("custom-3", "Arena 2v2", "Arena", 4, [
      "MonkMicro",
      "WallBuilder",
      "StableSwitch"
    ]),
    ri("custom-4", "Michi No Rush", "Michi", 6, [
      "DarkAgeDan",
      "MarketAbuse"
    ]),
    ri("custom-5", "Community Megarandom", "Megarandom", 8, [
      "HillFort"
    ])
  ], hh = [
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
  ], ph = [
    {
      id: "request-1",
      connectionId: "connection-1",
      name: "CastleClick",
      initials: "CC",
      rating: 1464,
      mutualFriends: 3
    }
  ];
  function ri(c, o, f, r, m) {
    return {
      id: c,
      name: o,
      hostId: `${c}-player-1`,
      map: {
        id: f.toLowerCase().replaceAll(" ", "-"),
        name: f,
        gameName: f,
        kind: "map"
      },
      players: m.map((y, E) => ({
        id: `${c}-player-${E + 1}`,
        displayName: y,
        slot: E + 1,
        team: 0,
        civilization: "Random",
        ready: E < 2,
        host: E === 0
      })),
      messages: [],
      maxPlayers: r,
      status: "open",
      createdAt: new Date(Date.now() - m.length * 12e4).toISOString(),
      demo: true
    };
  }
  const qm = {
    async getMine() {
      return xe ? So : (await Ce.request("/matches/history")).matches;
    }
  }, Sv = "modulepreload", xv = function(c, o) {
    return new URL(c, o).href;
  }, Bm = {}, gh = function(o, f, r) {
    let m = Promise.resolve();
    if (f && f.length > 0) {
      let E = function(S) {
        return Promise.all(S.map((G) => Promise.resolve(G).then((L) => ({
          status: "fulfilled",
          value: L
        }), (L) => ({
          status: "rejected",
          reason: L
        }))));
      };
      const A = document.getElementsByTagName("link"), x = document.querySelector("meta[property=csp-nonce]"), p = (x == null ? void 0 : x.nonce) || (x == null ? void 0 : x.getAttribute("nonce"));
      m = E(f.map((S) => {
        if (S = xv(S, r), S in Bm) return;
        Bm[S] = true;
        const G = S.endsWith(".css"), L = G ? '[rel="stylesheet"]' : "";
        if (!!r) for (let W = A.length - 1; W >= 0; W--) {
          const Z = A[W];
          if (Z.href === S && (!G || Z.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${S}"]${L}`)) return;
        const g = document.createElement("link");
        if (g.rel = G ? "stylesheet" : Sv, G || (g.as = "script"), g.crossOrigin = "", g.href = S, p && g.setAttribute("nonce", p), document.head.appendChild(g), G) return new Promise((W, Z) => {
          g.addEventListener("load", W), g.addEventListener("error", () => Z(new Error(`Unable to preload CSS for ${S}`)));
        });
      }));
    }
    function y(E) {
      const A = new Event("vite:preloadError", {
        cancelable: true
      });
      if (A.payload = E, window.dispatchEvent(A), !A.defaultPrevented) throw E;
    }
    return m.then((E) => {
      for (const A of E || []) A.status === "rejected" && y(A.reason);
      return o().catch(y);
    });
  };
  class Us extends Error {
    constructor(o = false) {
      super(o ? "The team replay does not contain final PostGame results yet." : "The replay does not contain a PostGame or Resign operation yet."), this.name = "ReplayNotFinishedError";
    }
  }
  async function wv(c) {
    var _a2;
    if (!window.electronApi) return false;
    const { parse_rec: o } = await gh(async () => {
      const { parse_rec: y } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: y
      };
    }, [], import.meta.url), f = await window.electronApi.readReplayFile(c), r = f.buffer.slice(f.byteOffset, f.byteOffset + f.byteLength);
    let m;
    try {
      m = o(r);
    } catch {
      return false;
    }
    return ((_a2 = m.operations) == null ? void 0 : _a2.some((y) => {
      if ("PostGame" in y) return true;
      const E = y.Action;
      if (typeof E != "object" || E === null) return false;
      const A = E.action_data;
      return typeof A == "object" && A !== null && "Resign" in A;
    })) ?? false;
  }
  async function Mv(c, o = false) {
    var _a2, _b2;
    if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
    const { parse_rec: f, parse_rec_summary: r } = await gh(async () => {
      const { parse_rec: X, parse_rec_summary: V } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: X,
        parse_rec_summary: V
      };
    }, [], import.meta.url), m = await window.electronApi.readReplayFile(c), y = m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength);
    let E;
    try {
      E = f(y);
    } catch {
      throw new Us();
    }
    const A = ((_a2 = E.operations) == null ? void 0 : _a2.some((X) => "PostGame" in X)) ?? false, x = (_b2 = E.operations) == null ? void 0 : _b2.map((X) => X.Action).filter((X) => typeof X == "object" && X !== null).map((X) => X.action_data).filter((X) => typeof X == "object" && X !== null).map((X) => X.Resign).filter((X) => typeof X == "object" && X !== null).map((X) => X.player_id).find((X) => typeof X == "number");
    if (!o && !A && x === void 0) throw new Us();
    const p = r(y), S = p.header.game_settings, G = p.header.replay, L = p.teams.flatMap((X) => X.players.filter((V) => V.profile_id > 0).map((V) => ({
      profileId: V.profile_id,
      playerNumber: V.player_number,
      civilizationId: V.civ_id,
      resigned: V.resigned
    }))), Y = o || L.length > 2;
    if (Y && !A) throw new Us(true);
    const g = p.teams.filter((X) => X.winner).flatMap((X) => X.players), W = p.teams.filter((X) => !X.winner).flatMap((X) => X.players), Z = p.teams.flatMap((X) => X.players).filter((X) => X.profile_id > 0), le = x === void 0 ? void 0 : Z.find((X) => X.player_number === x), de = !Y && le ? Z.find((X) => X.player_number !== x) : g.find((X) => X.profile_id > 0), ce = !Y && le || W.find((X) => X.profile_id > 0), se = L.find((X) => X.playerNumber === p.header.replay.rec_player);
    if (![
      2,
      4,
      8
    ].includes(L.length) || !de || !ce || !se) throw new Error("The replay does not contain identifiable winning and losing teams.");
    return {
      fileSizeBytes: m.byteLength,
      build: p.header.build,
      recordedAt: p.header.timestamp,
      durationMs: p.duration,
      players: L.sort((X, V) => X.profileId - V.profileId),
      settings: {
        cheats: S.cheats,
        replayCheatsEnabled: G.cheats_enabled,
        instantBuild: G.instant_build,
        playerCount: S.n_players,
        populationLimit: S.population_limit,
        recordGame: S.record_game,
        gameType: S.game_type,
        replayGameMode: G.game_mode,
        gameSpeedId: G.game_speed_id,
        gameSpeed: G.game_speed,
        startingAgeId: S.starting_age_id,
        startingResourcesId: S.starting_resources_id,
        endingAgeId: S.ending_age_id,
        victoryTypeId: S.victory_type_id,
        victoryAmount: S.victory_amount,
        revealMap: S.reveal_map,
        lockTeams: S.lock_teams,
        allTechs: S.all_techs,
        handicap: S.handicap,
        sharedExploration: S.shared_exploration,
        teamBonusDisabled: S.team_bonus_disabled,
        treatyLength: S.treaty_length,
        selectedMapId: S.selected_map_id,
        resolvedMapId: S.resolved_map_id,
        rmsStrings: [
          ...S.rms_strings
        ]
      },
      reporterProfileId: se.profileId,
      winnerProfileId: de.profile_id,
      loserProfileId: ce.profile_id,
      winningProfileIds: g.map((X) => X.profile_id).filter((X) => X > 0).sort(),
      losingProfileIds: W.map((X) => X.profile_id).filter((X) => X > 0).sort(),
      reason: Y ? W.filter((X) => X.profile_id > 0).every((X) => X.resigned) ? "resignation" : "defeat" : x !== void 0 || ce.resigned ? "resignation" : "defeat"
    };
  }
  const yh = "empire-league:lobby-setup-timing:v1", vh = 100, bh = 120, jv = 500, Av = 6, Ev = 100;
  function Cv(c) {
    const o = Sh(c), f = xh()[xo(c)];
    return f.length ? Math.max(1e4, o + Rv(f)) : o;
  }
  function Nv(c, o) {
    if (!Number.isFinite(o) || o < 1e4 || o > 18e4) return;
    const f = xo(c), r = xh(), m = Math.round(o - Sh(c));
    r[f] = [
      ...r[f],
      m
    ].slice(-9);
    try {
      window.localStorage.setItem(yh, JSON.stringify(r));
    } catch {
    }
  }
  function Sh(c) {
    const o = xo(c) === "custom", f = ca.mapPicker, r = ca.actions;
    let m = Qe.hostLobbyAutomationSettleMs;
    return m += Av * Ev + r.multiplayer.settleMs, m += En(r.hostGame) + jv, m += En(r.createLobby), m += ln() + Qe.resetFocusMs + Qe.resetConfirmationMs, m += ln() + f.openSettleMs, m += ln() + f.styleMenuSettleMs, m += ln() + f.styleSelectionSettleMs, m += ln() + f.searchSettleMs, m += ln() + f.selectionSettleMs, m += En(r.copyLobbyUri) + Qe.clipboardReadMs, m += Hm(c.queue.civilizationPreference), m += Qe.lobbyMetadataMs, m += Qe.guestJoinMs + Qe.guestReadySettleMs, m += Hm(c.opponentCivilizationPreference), m += Qe.hostReadySettleMs + En(r.hostReady), o && (m += Qe.customMapTransferPollMs + r.guestReady.settleMs, m += rv + r.confirmGuestContent.settleMs, m += Qe.hostReadySettleMs + En(r.hostReady)), m += Qe.customMapTransferPollMs, m += En(r.guestReady), m += Qe.hostReadyToStartMs + Qe.startGameSettleMs, m += En(r.startGame) + Qe.revealAfterStartMs, m;
  }
  function Hm(c) {
    if (!c) return 0;
    let o = ln() + ca.civilizationSlotButtons.settleMs;
    return c.mode === "pick" && (o += ln() + ca.civilizationPicker.searchSettleMs), o += ca.civilizationGrid.hoverMs + ca.civilizationGrid.holdMs + ca.civilizationPicker.selectionSettleMs, o += ca.actions.confirmCivilization.settleMs, o;
  }
  function En(c) {
    return (c.hoverMs ?? vh) + (c.holdMs ?? bh) + c.settleMs;
  }
  function ln() {
    return vh + bh;
  }
  function xo(c) {
    var _a2;
    return ca.mapPicker.customMapNames.includes(((_a2 = c.selectedMap) == null ? void 0 : _a2.name) ?? "") ? "custom" : "standard";
  }
  function xh() {
    try {
      const c = JSON.parse(window.localStorage.getItem(yh) ?? "{}");
      return {
        standard: Gm(c.standard),
        custom: Gm(c.custom)
      };
    } catch {
      return {
        standard: [],
        custom: []
      };
    }
  }
  function Gm(c) {
    return Array.isArray(c) ? c.filter((o) => Number.isFinite(o) && Math.abs(o) <= 12e4).slice(-9) : [];
  }
  function Rv(c) {
    const o = [
      ...c
    ].sort((r, m) => r - m), f = Math.floor(o.length / 2);
    return o.length % 2 === 0 ? Math.round((o[f - 1] + o[f]) / 2) : o[f];
  }
  const oo = "empire-league:stop-youtube-shorts";
  async function ro() {
    window.dispatchEvent(new Event(oo)), document.fullscreenElement && await document.exitFullscreen().catch(() => {
    });
  }
  const wh = "empire-league-settings", Ym = 7e3, Tv = 65e3, Cn = {
    launchAoe2OnStartup: false,
    serverRegion: "US East",
    matchNotifications: true,
    autoRejectFamilySharing: false,
    maximumLowerOpponentRatingGap: 0
  }, zv = [
    {
      id: "ranked-rm-1v1",
      name: "Ranked 1v1 Random Map",
      description: "Ranked 1v1 Random Map.",
      format: "1v1",
      ruleset: "Random Map",
      mapPool: $t,
      mapPreferences: {
        enabledGroupIds: Nt.groups.map((c) => c.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Nt.version,
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
      mapPool: $t,
      mapPreferences: {
        enabledGroupIds: Nt.groups.map((c) => c.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Nt.version,
      ranked: false,
      estimatedWaitSeconds: 90,
      playersSearching: 42
    }
  ], Mh = C.createContext(null);
  function _v({ children: c }) {
    const [o, f] = C.useState("home"), [r, m] = C.useState(null), [y, E] = C.useState("leaderboard"), A = C.useRef(0), x = C.useRef(null), [p, S] = C.useState(xe ? "authenticated" : "loading"), [G, L] = C.useState(null), [Y, g] = C.useState(() => ({
      currentUser: dt,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null,
      transitionInputLocked: false,
      activeMatch: null,
      recentMatches: xe ? So : [],
      connectionStatus: "online",
      gameStatus: "installed",
      searchRange: {
        min: dt.rating - 50,
        max: dt.rating + 50
      },
      error: null,
      notifications: xe && !bv ? [
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
      mockConfig: dv,
      settings: Dv()
    })), W = C.useRef(Y.mockConfig);
    W.current = Y.mockConfig;
    const Z = C.useRef(Y);
    Z.current = Y;
    const le = C.useRef(null), de = C.useRef(false), ce = C.useRef(null), se = C.useRef(null), X = C.useRef(false), V = C.useRef(null), _ = C.useRef(null), F = C.useRef(false), k = C.useRef(false);
    C.useEffect(() => {
      const w = x.current;
      if (!w || w.page !== o) return;
      x.current = null;
      const R = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          var _a2;
          (_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTo({
            top: w.top
          });
        });
      });
      return () => window.cancelAnimationFrame(R);
    }, [
      o
    ]);
    const J = C.useMemo(() => ({
      matchmaking: new yv(() => W.current),
      game: new mv(() => W.current),
      results: new vv(() => W.current)
    }), []);
    C.useEffect(() => {
      if (xe) return;
      let w = false;
      return Ts.restore().then((R) => {
        w || (R ? (Ae(R), qm.getMine().then((K) => {
          w || g((ne) => ({
            ...ne,
            currentUser: R,
            recentMatches: K
          }));
        }).catch(() => {
          w || g((K) => ({
            ...K,
            currentUser: R,
            recentMatches: []
          }));
        }), S("authenticated")) : S("unauthenticated"));
      }).catch((R) => {
        w || (L(Qm(R, "Could not restore the Steam session.")), S("unauthenticated"));
      }), () => {
        w = true;
      };
    }, []), C.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayEnded((w) => {
        const R = Z.current.activeMatch;
        !R || Z.current.queueStatus !== "in_game" || F.current || (F.current = true, (async () => {
          var _a2;
          let K;
          try {
            K = await Mv(w, R.queue.format === "team");
          } catch (ne) {
            if (ne instanceof Us) {
              F.current = false;
              return;
            }
            const I = ne instanceof Error ? ne.message : "Replay parsing failed.";
            g((te) => ({
              ...te,
              queueStatus: "verifying_result"
            }));
            try {
              await J.matchmaking.reportMatchResult({
                matchId: R.id,
                error: I
              }), $("Replay could not be parsed; result reported as contested");
              return;
            } catch (te) {
              F.current = false, P({
                code: "RESULT_VERIFICATION_FAILED",
                message: "The replay parsing failure could not be reported.",
                technicalDetails: te instanceof Error ? te.message : I,
                retryable: true
              });
              return;
            }
          }
          await ((_a2 = window.electronApi) == null ? void 0 : _a2.confirmReplayEnded()), g((ne) => ({
            ...ne,
            queueStatus: "verifying_result"
          })), $(`Replay ended with terminal operation (${K.reason}): ${w}`);
          try {
            await J.matchmaking.reportMatchResult({
              matchId: R.id,
              replay: K
            }), $("Replay result reported; waiting for opponent report");
          } catch (ne) {
            F.current = false, P({
              code: "RESULT_VERIFICATION_FAILED",
              message: "The replay result could not be reported.",
              technicalDetails: ne instanceof Error ? ne.message : "Matchmaker reporting failed.",
              retryable: true
            });
          }
        })());
      });
    }, [
      J
    ]), C.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayDetectionFailed((w) => {
        const R = Z.current.activeMatch;
        !R || Z.current.queueStatus !== "in_game" || F.current || (F.current = true, g((K) => ({
          ...K,
          queueStatus: "verifying_result"
        })), $("Replay recording did not start; reporting the result as contested"), J.matchmaking.reportMatchResult({
          matchId: R.id,
          error: w
        }).then(() => {
          $("Missing replay reported; waiting for contested result");
        }).catch((K) => {
          F.current = false, P({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: K instanceof Error ? K.message : w,
            retryable: true
          });
        }));
      });
    }, [
      J
    ]);
    async function ae() {
      S("authenticating"), L(null);
      try {
        const w = await Ts.signIn();
        Ae(w);
        const R = await qm.getMine();
        g((K) => ({
          ...K,
          currentUser: w,
          recentMatches: R
        })), S("authenticated");
      } catch (w) {
        L(Qm(w, "Steam sign-in failed.")), S("unauthenticated");
      }
    }
    async function Ee() {
      var _a2;
      xe || (he(), le.current && await J.matchmaking.leaveQueue(le.current).catch(() => {
      }), (_a2 = ce.current) == null ? void 0 : _a2.call(ce), le.current = null, de.current = false, await Ts.logout(), g((w) => ({
        ...w,
        currentUser: dt,
        queueStatus: "idle",
        selectedQueue: null,
        activeMatch: null
      })), S("unauthenticated"), f("home"));
    }
    C.useEffect(() => {
      if (xe) return;
      let w = false;
      async function R() {
        let ne = null;
        try {
          if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
          const I = await window.electronApi.detectAoe2Installation();
          if (!I.installed || !I.path) {
            w || j(I.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
            return;
          }
          if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
            const Le = await window.electronApi.closeAoe2(true);
            if (!Le.closed) throw new Error(Le.message ?? "AoE2 could not be closed.");
          }
          if (!Y.settings.launchAoe2OnStartup) return;
          g((nt) => ({
            ...nt,
            gameStatus: "loading"
          })), ne = j("Loading AoE2 DE\u2026", "loading", {
            detail: "Waiting for the game window to become ready.",
            durationMs: null
          });
          const re = await window.electronApi.launchAoe2();
          if (!re.launched) throw new Error(re.message ?? "Steam did not accept the AoE2 DE launch request.");
          if (!await Vm(12e4)) throw new Error("AoE2 started, but its game window did not become ready in time.");
          ne && B(ne, {
            detail: "Finishing game startup."
          }), await Xm(Ym), w || (g((nt) => ({
            ...nt,
            gameStatus: "running"
          })), ne && B(ne, {
            message: "AoE2 DE is ready",
            tone: "success",
            detail: void 0,
            durationMs: 5e3
          }));
        } catch (I) {
          w || (ne && v(ne), g((te) => ({
            ...te,
            gameStatus: "installed"
          })), j(I instanceof Error ? I.message : "AoE2 DE could not be launched.", "danger"));
        }
      }
      const K = window.setTimeout(() => void R(), 0);
      return () => {
        w = true, window.clearTimeout(K);
      };
    }, []);
    async function Me(w) {
      let R = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        const K = await window.electronApi.detectAoe2Installation();
        if (!K.installed || !K.path) throw new Error(K.message ?? "AoE2 DE was not detected.");
        const ne = await window.electronApi.detectAoe2Process();
        if (ne.running && !ne.owned && !(await window.electronApi.closeAoe2(false)).closed) {
          const Xe = await window.electronApi.closeAoe2(true);
          if (!Xe.closed) throw new Error(Xe.message ?? "The existing AoE2 process could not be closed.");
        }
        g((re) => ({
          ...re,
          gameStatus: "loading"
        })), R = j("Launching AoE2 DE\u2026", "loading", {
          detail: w === "custom" ? "Your custom game action will continue automatically when the game is ready." : "Matchmaking will begin automatically when the game is ready.",
          durationMs: null
        });
        const I = await window.electronApi.launchAoe2();
        if (!I.launched) throw new Error(I.message ?? "Steam did not accept the AoE2 DE launch request.");
        if (!await Vm(12e4)) throw new Error("AoE2 started, but its game window did not become ready in time.");
        return B(R, {
          detail: "Finishing game startup."
        }), await Xm(Ym), g((re) => ({
          ...re,
          gameStatus: "running"
        })), B(R, {
          message: "AoE2 DE is ready",
          tone: "success",
          detail: w === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
          durationMs: 3e3
        }), true;
      } catch (K) {
        return R && v(R), g((ne) => ({
          ...ne,
          gameStatus: "installed"
        })), j(K instanceof Error ? K.message : "AoE2 DE could not be launched.", "danger"), false;
      }
    }
    async function je(w = "matchmaking") {
      if (!window.electronApi) return true;
      const R = await window.electronApi.detectAoe2Process();
      return R.running && R.windowReady && R.owned ? true : Me(w);
    }
    function $(w) {
      g((R) => ({
        ...R,
        eventLog: [
          fv(w),
          ...R.eventLog
        ].slice(0, 80)
      }));
    }
    function j(w, R = "info", K = {}) {
      const ne = crypto.randomUUID();
      return g((I) => ({
        ...I,
        notifications: [
          {
            id: ne,
            message: w,
            tone: R,
            detail: K.detail,
            durationMs: K.durationMs === void 0 ? R === "danger" ? 8e3 : 5e3 : K.durationMs,
            dismissible: K.dismissible
          },
          ...I.notifications
        ].slice(0, 4)
      })), ne;
    }
    function D() {
      he(), _.current = window.setTimeout(() => {
        _.current = null;
        const w = Z.current.selectedQueue;
        w && ee(w, "Lobby setup stopped making progress for 65 seconds.");
      }, Tv);
    }
    async function ee(w, R) {
      var _a2, _b2, _c;
      if (X.current) return;
      X.current = true, (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), he(), de.current = false, V.current = null, se.current = null, (_b2 = ce.current) == null ? void 0 : _b2.call(ce), ce.current = null;
      const K = le.current;
      le.current = null, g((ne) => ({
        ...ne,
        queueStatus: "cancelled",
        activeMatch: null,
        error: null,
        transitionInputLocked: false,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), j(R, "warning", {
        durationMs: 5e3,
        dismissible: false
      }), K && await J.matchmaking.leaveQueue(K).catch(() => {
      });
      {
        await ((_c = window.electronApi) == null ? void 0 : _c.setLobbyInputLock(false).catch(() => ({
          locked: false
        }))), $("Lobby setup failed; automatic AoE2 restart is disabled"), X.current = false;
        return;
      }
    }
    function he() {
      _.current !== null && (window.clearTimeout(_.current), _.current = null);
    }
    function Ae(w) {
      w.steamLicenseStatus !== "family_shared" || k.current || (k.current = true, j("Opponents may reject matches with you because you are using family share.", "warning", {
        durationMs: null,
        dismissible: true
      }));
    }
    function v(w) {
      g((R) => {
        var _a2, _b2;
        return {
          ...R,
          notifications: R.notifications.filter((K) => K.id !== w),
          error: ((_a2 = R.error) == null ? void 0 : _a2.notificationId) === w ? null : R.error,
          queueStatus: ((_b2 = R.error) == null ? void 0 : _b2.notificationId) === w && R.queueStatus === "error" ? "idle" : R.queueStatus
        };
      });
    }
    function B(w, R) {
      g((K) => ({
        ...K,
        notifications: K.notifications.map((ne) => ne.id === w ? {
          ...ne,
          ...R
        } : ne)
      }));
    }
    function P(w) {
      const R = j(w.message, "danger", {
        detail: w.technicalDetails,
        durationMs: null
      });
      g((K) => ({
        ...K,
        error: {
          ...w,
          notificationId: R
        },
        queueStatus: "error"
      }));
    }
    async function ie(w) {
      var _a2, _b2;
      const R = [
        "idle",
        "cancelled",
        "completed"
      ].includes(Y.queueStatus) && (!Y.activeMatch || Y.queueStatus === "completed");
      if (!(Y.gameStatus === "loading" || !R || de.current)) {
        de.current = true;
        try {
          if (!await je()) {
            de.current = false;
            return;
          }
          le.current && (await J.matchmaking.leaveQueue(le.current).catch(() => {
          }), (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null, le.current = null);
          const K = await Ts.reportSteamLicense(Y.currentUser);
          Ae(K), K !== Y.currentUser && g((I) => ({
            ...I,
            currentUser: K
          }));
          const ne = await J.matchmaking.joinQueue({
            queueId: w.id,
            queue: w,
            player: K,
            canHost: true,
            maximumLowerOpponentRatingGap: Y.settings.maximumLowerOpponentRatingGap
          });
          le.current = ne.id, ((_b2 = ne.ignoredMapIds) == null ? void 0 : _b2.length) && j("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
            detail: `Ignored maps: ${ne.ignoredMapIds.join(", ")}`,
            durationMs: 1e4
          }), g((I) => ({
            ...I,
            selectedQueue: w,
            searchRange: {
              min: (w.format === "team" ? K.teamRating : K.rating) - 50,
              max: (w.format === "team" ? K.teamRating : K.rating) + 50
            },
            queueStartedAt: ne.joinedAt,
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            queueStatus: "searching",
            activeMatch: null,
            error: null
          })), f("ranked"), $(`Joined queue ${w.id}`), ce.current = J.matchmaking.subscribeToQueue(ne.id, (I) => {
            var _a3, _b3, _c, _d, _e2, _f, _g, _h, _i, _j;
            if (I.type === "range" && g((te) => ({
              ...te,
              searchRange: {
                min: I.minRating,
                max: I.maxRating
              }
            })), I.type === "match_found") {
              if (Y.settings.autoRejectFamilySharing && I.match.queue.id === "ranked-rm-1v1" && I.match.opponent.steamLicenseStatus === "family_shared") {
                $(`Automatically declining family-shared opponent: ${I.match.id}`), j("Automatically declined a Family Share opponent.", "warning"), at(I.match.id);
                return;
              }
              const re = {
                ...I.match,
                player: Y.currentUser,
                status: "match_found"
              };
              V.current = re, f("ranked"), g((Xe) => ({
                ...Xe,
                queueStatus: "match_found",
                roomSetupStartedAt: null,
                roomSetupEstimateMs: null,
                roomSetupMilestone: null,
                activeMatch: re
              })), $(`Match found: ${I.match.id}`), Y.settings.matchNotifications && ((_a3 = window.electronApi) == null ? void 0 : _a3.alertMatchFound());
            }
            if (I.type === "opponent_accepted") {
              const te = V.current;
              if (!te) return;
              (_b3 = window.electronApi) == null ? void 0 : _b3.stopMatchFoundAlert(), D();
              const re = {
                ...te,
                acceptedByPlayer: true,
                acceptedByOpponent: true,
                status: I.role === "host" ? "creating_lobby" : "waiting_for_opponent"
              };
              V.current = re, g((Xe) => ({
                ...Xe,
                queueStatus: I.role === "host" ? "creating_lobby" : "waiting_for_opponent",
                roomSetupStartedAt: (/* @__PURE__ */ new Date()).toISOString(),
                roomSetupEstimateMs: Cv(re),
                roomSetupMilestone: I.role === "host" ? "Setting up lobby room" : "Waiting for the host to set up the lobby room",
                activeMatch: re
              })), $("Both players accepted"), I.role === "host" && window.electronApi && ($("Assigned as host; waiting for AoE2 lobby automation to settle"), se.current = Na(Qe.hostLobbyAutomationSettleMs).then(() => {
                var _a4;
                return D(), $("Starting AoE2 lobby automation"), window.electronApi.runAoe2CreateLobbySequence(fo(re.selectedMap), re.queue.format === "team" ? (((_a4 = re.queue.teamSizes) == null ? void 0 : _a4[0]) ?? 2) * 2 : 2);
              }), vt(re));
            }
            if (I.type === "lobby_ready" && (D(), g((te) => ({
              ...te,
              queueStatus: "ready",
              gameStatus: "in_lobby",
              roomSetupMilestone: "Joining lobby room",
              activeMatch: te.activeMatch ? {
                ...te.activeMatch,
                lobby: I.lobby,
                status: "ready"
              } : null
            })), $(`Host published lobby: ${I.lobby.platformLobbyId ?? "pending"}`), ((_c = I.lobby.platformLobbyId) == null ? void 0 : _c.startsWith("aoe2de://0/")) && window.electronApi && window.electronApi.openAoe2Lobby(I.lobby.platformLobbyId).then(async (te) => {
              var _a4, _b4;
              if ($(te.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected"), te.opened) {
                $("Guest lobby opened; waiting for the Ready button state to settle"), await Na(Qe.guestReadySettleMs);
                const re = (_a4 = V.current) == null ? void 0 : _a4.queue.civilizationPreference, Xe = Km(re);
                if (Xe) {
                  const Le = ((_b4 = V.current) == null ? void 0 : _b4.lobbySlot) ?? 2;
                  $(`Selecting ${Xe} for guest lobby slot ${Le}`);
                  const Wt = await window.electronApi.selectAoe2Civilization(Xe, Le);
                  if (!Wt.sent) throw new Error(Wt.message);
                  Wt.usedRandomCivilizationFallback ? (j("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), $(`${Xe} unavailable; Random selected in AoE2`)) : $(`${Xe} selected in AoE2`);
                }
                const nt = V.current;
                if ((nt == null ? void 0 : nt.queue.format) === "team") {
                  const Le = nt.lobbySlot ?? 2, Wt = nt.team ?? 2;
                  $(`Selecting Team ${Wt} for guest lobby slot ${Le}`);
                  const _a5 = await window.electronApi.selectAoe2Team(Wt, Le);
                  if (!_a5.sent) throw new Error(_a5.message);
                }
                $("Guest lobby opened; reporting join to the host"), await J.matchmaking.reportGuestLobbyJoined(I.matchId), $("Guest joined; waiting for the host to finalize custom map transfer"), g((Le) => ({
                  ...Le,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((te) => {
              const re = te instanceof Error ? te.message : "The host lobby could not be opened.";
              $(`Opening the host lobby failed: ${re}`), ee(w, re);
            })), I.type === "guest_lobby_joined" && window.electronApi && (g((te) => ({
              ...te,
              roomSetupMilestone: "Opponent joined \u2014 finalizing lobby files"
            })), (async () => {
              try {
                $("Guest joined; waiting for the host lobby state to settle"), await Na(Qe.hostReadySettleMs), $("Guest joined; clicking Ready for the host");
                const te = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!te.sent) throw new Error(te.message);
                await J.matchmaking.reportHostLobbyReady(I.matchId), $("Host readied; guest notified to wait for custom map transfer"), g((re) => ({
                  ...re,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (te) {
                const re = te instanceof Error ? te.message : "The host could not finalize the lobby.";
                $(`Automated host Ready failed: ${re}`), ee(w, re);
              }
            })()), I.type === "host_lobby_ready" && window.electronApi) {
              const te = Zm((_d = V.current) == null ? void 0 : _d.selectedMap);
              g((re) => ({
                ...re,
                roomSetupMilestone: te ? "Receiving lobby files" : "Waiting for Ready"
              })), (async () => {
                try {
                  const re = Date.now() + Qe.customMapTransferTimeoutMs;
                  let Xe = false, nt;
                  do
                    await Na(Qe.customMapTransferPollMs), nt = await window.electronApi.runAoe2LobbyCursorAction("guest-ready"), !nt.sent && te && !Xe && ($("Guest Ready remains unavailable; checking for the unverified-content confirmation"), (await window.electronApi.runAoe2LobbyCursorAction("content-confirm")).sent ? (await J.matchmaking.reportGuestContentAccepted(I.matchId), Xe = true, $(`Content accepted; allowing ${Lm} ms for the host to restore Ready`), await Na(Lm)) : $("Unverified-content confirmation keys could not be sent"));
                  while (!nt.sent && Date.now() < re);
                  if (!nt.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
                  $("Guest Ready verified; reporting readiness to the host"), await J.matchmaking.reportGuestLobbyReady(I.matchId), he(), g((Le) => ({
                    ...Le,
                    roomSetupMilestone: "Ready \u2014 waiting for the host to start"
                  }));
                } catch (re) {
                  const Xe = re instanceof Error ? re.message : "Lobby file transfer did not complete.";
                  $(`Guest file transfer or Ready failed: ${Xe}`), ee(w, Xe);
                }
              })();
            }
            if (I.type === "guest_content_accepted" && window.electronApi && Zm((_e2 = V.current) == null ? void 0 : _e2.selectedMap) && (g((te) => ({
              ...te,
              roomSetupMilestone: "Opponent accepted lobby files \u2014 confirming host Ready"
            })), (async () => {
              try {
                $("Guest accepted custom content; waiting for the lobby state to settle"), await Na(Qe.hostReadySettleMs);
                const te = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!te.sent) throw new Error(te.message);
                $("Host Ready verified again after guest content acceptance"), g((re) => ({
                  ...re,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (te) {
                const re = te instanceof Error ? te.message : "The host could not resume the lobby file transfer.";
                $(`Second host Ready failed: ${re}`), ee(w, re);
              }
            })()), I.type === "guest_lobby_ready" && window.electronApi && (g((te) => ({
              ...te,
              roomSetupMilestone: "Opponent ready \u2014 starting game"
            })), (async () => {
              try {
                $("Guest reported ready; waiting for the Start button state to settle"), await Na(Qe.hostReadyToStartMs), await Na(Qe.startGameSettleMs), $("Host readied; clicking Start Game");
                const te = await window.electronApi.runAoe2LobbyCursorAction("start");
                if (!te.sent) throw new Error(te.message);
                he(), g((re) => ({
                  ...re,
                  queueStatus: "ready",
                  gameStatus: "in_match",
                  roomSetupMilestone: "Starting game",
                  transitionInputLocked: true,
                  activeMatch: re.activeMatch ? {
                    ...re.activeMatch,
                    status: "ready"
                  } : null
                })), await J.matchmaking.reportGameStarted(I.matchId), za();
              } catch (te) {
                const re = te instanceof Error ? te.message : "The automated game start failed.";
                $(`Automated host start failed: ${re}`), ee(w, re);
              }
            })()), I.type === "game_started" && (he(), g((te) => ({
              ...te,
              queueStatus: "ready",
              gameStatus: "in_match",
              roomSetupMilestone: "Starting game",
              transitionInputLocked: true,
              activeMatch: te.activeMatch ? {
                ...te.activeMatch,
                status: "ready"
              } : null
            })), $("Host started the game"), za()), I.type === "result_verified" || I.type === "result_contested") {
              if (I.matchId !== ((_f = Z.current.activeMatch) == null ? void 0 : _f.id)) return;
              oa(I.result);
            }
            if (I.type === "error") {
              if (I.code === "MATCH_DISCONNECTED" || I.code === "MATCH_SETUP_FAILED") {
                ee(w, I.message);
                return;
              }
              if (I.code === "MATCH_DECLINED") {
                (_g = window.electronApi) == null ? void 0 : _g.stopMatchFoundAlert(), he(), de.current = false, V.current = null, le.current && (J.matchmaking.leaveQueue(le.current).catch(() => {
                }), le.current = null), (_h = ce.current) == null ? void 0 : _h.call(ce), ce.current = null, g((te) => ({
                  ...te,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), j(I.message, "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), $("Opponent declined; returning to queue"), window.setTimeout(() => void ie(w), 0);
                return;
              }
              I.code === "MATCH_EXPIRED" && ((_i = window.electronApi) == null ? void 0 : _i.stopMatchFoundAlert(), he(), de.current = false, V.current = null, le.current && (J.matchmaking.leaveQueue(le.current).catch(() => {
              }), le.current = null), (_j = ce.current) == null ? void 0 : _j.call(ce), ce.current = null, g((te) => ({
                ...te,
                queueStatus: "cancelled",
                activeMatch: null
              }))), P({
                code: I.code,
                message: I.message,
                retryable: true
              });
            }
          });
        } catch (K) {
          de.current = false, P({
            code: "QUEUE_JOIN_FAILED",
            message: "Matchmaking is currently unavailable.",
            technicalDetails: K instanceof Error ? K.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function ye() {
      var _a2;
      he(), (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null;
      const w = le.current;
      le.current = null, de.current = false, w && await J.matchmaking.leaveQueue(w).catch((R) => {
        const K = R instanceof Error ? R.message : "";
        K.toLowerCase().includes("ticket not found") || ($(`Queue cancellation could not be confirmed: ${K || "Unknown error"}`), j("The matchmaking server could not confirm cancellation", "danger", {
          detail: K || void 0,
          durationMs: null
        }));
      }), g((R) => ({
        ...R,
        queueStatus: "cancelled",
        selectedQueue: null,
        queueStartedAt: null,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), $("Queue cancelled");
    }
    async function be(w) {
      var _a2;
      const R = le.current;
      if (!(!R || Z.current.queueStatus !== "searching")) try {
        if (await J.matchmaking.updateQueue(R, w), Z.current.queueStatus !== "searching") return;
        g((K) => ({
          ...K,
          selectedQueue: w
        })), $(`Updated active queue preferences: ${((_a2 = w.civilizationPreference) == null ? void 0 : _a2.mode) ?? "pick"}, ${w.mapPool.length} maps`);
      } catch (K) {
        if (Z.current.queueStatus !== "searching") return;
        $(`Active queue preference update failed: ${K instanceof Error ? K.message : "Unknown error"}`), j("Your queue preferences could not be updated", "danger");
      }
    }
    async function _e() {
      var _a2;
      if (Y.activeMatch) {
        (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert();
        try {
          g((w) => ({
            ...w,
            queueStatus: "accepting",
            activeMatch: w.activeMatch ? {
              ...w.activeMatch,
              acceptedByPlayer: true,
              status: "accepting"
            } : null
          })), $("Local player accepted"), await J.matchmaking.acceptMatch(Y.activeMatch.id);
        } catch (w) {
          P({
            code: "MATCH_ACCEPT_FAILED",
            message: "The match could not be accepted.",
            technicalDetails: w instanceof Error ? w.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function at(w) {
      var _a2, _b2;
      (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), he(), (_b2 = ce.current) == null ? void 0 : _b2.call(ce), ce.current = null;
      try {
        w && await J.matchmaking.declineMatch(w);
      } finally {
        le.current && await J.matchmaking.leaveQueue(le.current).catch(() => {
        }), le.current = null, de.current = false, V.current = null, g((R) => ({
          ...R,
          queueStatus: "cancelled",
          activeMatch: null
        }));
      }
      $("Match declined");
    }
    async function Ke() {
      var _a2;
      await at((_a2 = Y.activeMatch) == null ? void 0 : _a2.id);
    }
    async function vt(w) {
      var _a2, _b2, _c;
      const R = w ?? Y.activeMatch;
      if (R == null ? void 0 : R.selectedMap) try {
        if (f("ranked"), g((I) => ({
          ...I,
          queueStatus: "creating_lobby"
        })), $("Detecting AoE2 installation"), !(await J.game.detectInstallation()).installed) throw new Error("AoE2 installation not detected.");
        if ($("Installation detected"), await J.game.detectRunningGame(), $("AoE2 process found"), await J.game.launchGame(), $("Opening multiplayer menu"), window.electronApi) {
          const I = await (se.current ?? window.electronApi.runAoe2CreateLobbySequence(fo(R.selectedMap), R.queue.format === "team" ? (((_a2 = R.queue.teamSizes) == null ? void 0 : _a2[0]) ?? 2) * 2 : 2));
          if (se.current = null, !I.sent) throw new Error(I.message);
          if (!I.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
          $("AoE2 host-lobby sequence completed"), D();
          const te = R.queue.civilizationPreference, re = Km(te);
          if (re) {
            $(`Selecting ${re} for host lobby slot 1`);
            const Le = await window.electronApi.selectAoe2Civilization(re, 1);
            if (!Le.sent) throw new Error(Le.message);
            Le.usedRandomCivilizationFallback ? (j("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), $(`${re} unavailable; Random selected in AoE2`)) : $(`${re} selected in AoE2`);
          }
          if (R.queue.format === "team") {
            const Le = R.lobbySlot ?? 1, Wt = R.team ?? 1;
            $(`Selecting Team ${Wt} for host lobby slot ${Le}`);
            const _a3 = await window.electronApi.selectAoe2Team(Wt, Le);
            if (!_a3.sent) throw new Error(_a3.message);
          }
          $(`Lobby URI discovered: ${I.lobbyUri}`);
          const nt = {
            ...(await J.game.createLobby({
              matchId: R.id,
              hostProfileId: R.player.aoeProfileId,
              guestProfileId: R.opponent.aoeProfileId,
              map: R.selectedMap,
              serverRegion: Y.settings.serverRegion,
              playerCount: R.queue.format === "team" ? (((_b2 = R.queue.teamSizes) == null ? void 0 : _b2[0]) ?? 2) * 2 : 2
            })).lobby,
            platformLobbyId: I.lobbyUri
          };
          $(`Lobby created: ${nt.platformLobbyId}`), await J.matchmaking.publishLobby(R.id, nt), $("Lobby details published to opponent"), he(), g((Le) => ({
            ...Le,
            activeMatch: Le.activeMatch ? {
              ...Le.activeMatch,
              lobby: nt
            } : null,
            queueStatus: "waiting_for_opponent",
            roomSetupMilestone: "Waiting for opponent to join"
          }));
          return;
        }
        const ne = await J.game.createLobby({
          matchId: R.id,
          hostProfileId: R.player.aoeProfileId,
          guestProfileId: R.opponent.aoeProfileId,
          map: R.selectedMap,
          serverRegion: Y.settings.serverRegion,
          playerCount: R.queue.format === "team" ? (((_c = R.queue.teamSizes) == null ? void 0 : _c[0]) ?? 2) * 2 : 2
        });
        $(`Lobby created: ${ne.lobby.platformLobbyId ?? "pending"}`), await J.matchmaking.publishLobby(R.id, ne.lobby), $("Lobby details published to opponent"), g((I) => ({
          ...I,
          activeMatch: I.activeMatch ? {
            ...I.activeMatch,
            lobby: ne.lobby
          } : null,
          queueStatus: "waiting_for_opponent"
        })), $("Opponent invited"), await J.game.waitForGameStart(ne.lobby.platformLobbyId ?? R.id), $("Opponent joined"), g((I) => ({
          ...I,
          queueStatus: "verifying_lobby"
        })), await J.game.verifyLobby(ne.lobby.platformLobbyId ?? R.id), $("Lobby verified"), g((I) => ({
          ...I,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: I.activeMatch ? {
            ...I.activeMatch,
            lobby: Uv(ne.lobby),
            status: "ready"
          } : null
        }));
      } catch (K) {
        const ne = K instanceof Error ? K.message : "We could not create the AoE2 lobby.";
        $(`Lobby preparation failed: ${ne}`);
        const I = R.queue;
        ee(I, ne);
      }
    }
    async function Ta() {
      if (window.electronApi) {
        const w = await window.electronApi.startReplayEndDetection();
        w.started || $(`Replay detection unavailable: ${w.message ?? "unknown error"}`);
      }
      await ro(), await J.game.focusGame(), g((w) => ({
        ...w,
        queueStatus: "in_game",
        gameStatus: "in_match"
      })), $("Focused AoE2"), Y.activeMatch && await J.results.beginTracking(Y.activeMatch);
    }
    async function ua() {
      const w = Y.activeMatch;
      if (w) try {
        g((K) => ({
          ...K,
          queueStatus: "verifying_result"
        })), $("Game finished");
        const R = await J.results.waitForVerifiedResult(w.id);
        oa(R);
      } catch (R) {
        P({
          code: "RESULT_VERIFICATION_FAILED",
          message: "The result service could not verify this match.",
          technicalDetails: R instanceof Error ? R.message : void 0,
          retryable: true
        });
      }
    }
    function oa(w) {
      var _a2;
      de.current = false, F.current = false, (_a2 = window.electronApi) == null ? void 0 : _a2.stopReplayEndDetection(), g((R) => {
        var _a3, _b2, _c;
        const K = R.activeMatch ? {
          ...R.activeMatch,
          result: w,
          status: "completed"
        } : null, ne = w.ratingPool === "team", I = !ne && w.outcome === "win" ? R.currentUser.wins + 1 : R.currentUser.wins, te = !ne && w.outcome === "loss" ? R.currentUser.losses + 1 : R.currentUser.losses, re = {
          ...R.currentUser,
          rating: w.verified && !ne ? w.newRating : R.currentUser.rating,
          peakRating: w.verified && !ne ? Math.max(R.currentUser.peakRating, w.newRating) : R.currentUser.peakRating,
          teamRating: w.verified && ne ? w.newRating : R.currentUser.teamRating,
          teamPeakRating: w.verified && ne ? Math.max(R.currentUser.teamPeakRating, w.newRating) : R.currentUser.teamPeakRating,
          division: w.verified && !ne ? pl(w.newRating) : R.currentUser.division,
          wins: I,
          losses: te,
          winRate: I + te > 0 ? Number((I / (I + te) * 100).toFixed(1)) : 0,
          streak: ne ? R.currentUser.streak : w.outcome === "win" ? Math.max(1, R.currentUser.streak + 1) : w.outcome === "loss" ? Math.min(-1, R.currentUser.streak - 1) : R.currentUser.streak
        }, Xe = K && w.verified ? {
          id: K.id,
          opponent: K.opponent.displayName,
          opponentId: K.opponent.id,
          opponentRating: ne ? K.opponent.teamRating : K.opponent.rating,
          outcome: w.outcome,
          map: ((_a3 = K.selectedMap) == null ? void 0 : _a3.name) ?? "Arabia",
          civilization: ((_b2 = K.queue.civilizationPreference) == null ? void 0 : _b2.civilization) ?? "",
          opponentCivilization: ((_c = K.opponentCivilizationPreference) == null ? void 0 : _c.civilization) ?? "",
          ratingChange: w.ratingChange,
          durationMinutes: 24,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          verified: w.verified,
          queueType: K.queue.name
        } : null;
        return {
          ...R,
          currentUser: re,
          activeMatch: K,
          queueStatus: "completed",
          gameStatus: "installed",
          recentMatches: Xe ? [
            Xe,
            ...R.recentMatches
          ] : R.recentMatches
        };
      }), w.verificationStatus === "contested" ? ($("Replay reports conflicted; result discarded"), j("Result contested \u2014 no rating change", "warning")) : $("Match result verified");
    }
    async function It() {
      var _a2;
      (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null, le.current && (await J.matchmaking.leaveQueue(le.current).catch(() => {
      }), le.current = null), V.current = null, g((w) => ({
        ...w,
        queueStatus: "idle",
        selectedQueue: null,
        queueStartedAt: null,
        activeMatch: null,
        error: null
      })), f("ranked");
    }
    function cn(w) {
      g((R) => ({
        ...R,
        mockConfig: {
          ...R.mockConfig,
          ...w
        }
      }));
    }
    async function za() {
      if (!window.electronApi) return;
      await Na(Qe.revealAfterStartMs);
      const w = await window.electronApi.startReplayEndDetection();
      w.started || $(`Replay detection unavailable: ${w.message ?? "unknown error"}`), await ro(), await window.electronApi.focusAoe2();
      const R = Z.current;
      R.activeMatch && R.roomSetupStartedAt && Nv(R.activeMatch, Date.now() - new Date(R.roomSetupStartedAt).getTime()), g((K) => ({
        ...K,
        queueStatus: "in_game",
        roomSetupMilestone: null,
        transitionInputLocked: false,
        activeMatch: K.activeMatch ? {
          ...K.activeMatch,
          status: "in_game"
        } : null
      })), $("Showing AoE2 after game start");
    }
    function q(w) {
      g((R) => {
        const K = {
          ...R.settings,
          ...w
        };
        return window.localStorage.setItem(wh, JSON.stringify(K)), {
          ...R,
          settings: K
        };
      });
    }
    const fe = {
      state: Y,
      page: o,
      setPage: f,
      selectedProfileId: r,
      openPlayerProfile: (w) => {
        var _a2;
        o !== "profile" && (E(o), A.current = ((_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTop) ?? 0), m(w), f("profile");
      },
      returnFromPlayerProfile: () => {
        x.current = {
          page: y,
          top: A.current
        }, m(null), f(y);
      },
      queues: zv,
      ensureAoe2Ready: je,
      startQueue: ie,
      updateActiveQueue: be,
      cancelQueue: ye,
      acceptMatch: _e,
      declineMatch: Ke,
      prepareLobby: vt,
      openAoe2: Ta,
      simulateMatchEnd: ua,
      returnToMatchmaking: It,
      updateMockConfig: cn,
      updateSettings: q,
      notify: j,
      dismissNotification: v,
      clearError: () => g((w) => {
        var _a2;
        return {
          ...w,
          error: null,
          queueStatus: "idle",
          notifications: ((_a2 = w.error) == null ? void 0 : _a2.notificationId) ? w.notifications.filter((R) => {
            var _a3;
            return R.id !== ((_a3 = w.error) == null ? void 0 : _a3.notificationId);
          }) : w.notifications
        };
      }),
      authStatus: p,
      authError: G,
      signInWithSteam: ae,
      signOut: Ee
    };
    return i.jsx(Mh.Provider, {
      value: fe,
      children: c
    });
  }
  function Qm(c, o) {
    return c instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(c.message) ? "Error: Matchmaking server is down." : c instanceof Error ? c.message : o;
  }
  async function Vm(c) {
    if (!window.electronApi) return false;
    const o = Date.now() + c;
    for (; Date.now() < o; ) {
      const f = await window.electronApi.detectAoe2Process();
      if (f.running && f.windowReady) return true;
      await new Promise((r) => window.setTimeout(r, 500));
    }
    return false;
  }
  function Xm(c) {
    return new Promise((o) => window.setTimeout(o, c));
  }
  function Na(c) {
    return new Promise((o) => window.setTimeout(o, c));
  }
  function fo(c) {
    var _a2;
    return (c && ((_a2 = fh(c.id)) == null ? void 0 : _a2.gameMapName)) ?? Nt.maps[0].gameMapName;
  }
  function Zm(c) {
    return c !== void 0 && ca.mapPicker.customMapNames.includes(fo(c));
  }
  function Km(c) {
    return c ? c.mode === "pick" ? c.civilization ?? null : c.mode === "random" ? null : c.mode === "mirror" ? "Mirror" : null : null;
  }
  function St() {
    const c = C.useContext(Mh);
    if (!c) throw new Error("useAppStore must be used inside AppProvider");
    return c;
  }
  function Dv() {
    try {
      const c = window.localStorage.getItem(wh);
      if (!c) return Cn;
      const o = JSON.parse(c);
      return {
        launchAoe2OnStartup: typeof o.launchAoe2OnStartup == "boolean" ? o.launchAoe2OnStartup : Cn.launchAoe2OnStartup,
        serverRegion: typeof o.serverRegion == "string" ? o.serverRegion : Cn.serverRegion,
        matchNotifications: typeof o.matchNotifications == "boolean" ? o.matchNotifications : Cn.matchNotifications,
        autoRejectFamilySharing: typeof o.autoRejectFamilySharing == "boolean" ? o.autoRejectFamilySharing : Cn.autoRejectFamilySharing,
        maximumLowerOpponentRatingGap: [
          0,
          200,
          300,
          400,
          500
        ].includes(Number(o.maximumLowerOpponentRatingGap)) ? Number(o.maximumLowerOpponentRatingGap) : Cn.maximumLowerOpponentRatingGap
      };
    } catch {
      return Cn;
    }
  }
  function Uv(c) {
    return {
      ...c,
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
  const kv = ((_a = sn.find((c) => c.id === "land-open")) == null ? void 0 : _a.maps) ?? [];
  function Ov() {
    const { state: c } = St(), o = c.currentUser, f = c.recentMatches.slice(0, 5).map((r) => r.outcome);
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
                children: o.rating
              }),
              i.jsxs("p", {
                children: [
                  di(o.rating),
                  " \xB7 Global Rank #",
                  o.rank.toLocaleString()
                ]
              })
            ]
          })
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(sa, {
              label: "Division",
              value: di(o.rating),
              detail: `${o.wins + o.losses} ranked matches`
            }),
            i.jsx(sa, {
              label: "Season Record",
              value: `${o.wins}-${o.losses}`,
              detail: `${o.winRate}% win rate`
            }),
            i.jsx(sa, {
              label: "Current Streak",
              value: o.streak > 0 ? `W${o.streak}` : `L${Math.abs(o.streak)}`
            }),
            i.jsx(sa, {
              label: "Peak Rating",
              value: o.peakRating
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
                f.length > 0 && i.jsx(lh, {
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
                c.recentMatches.slice(0, 7).map((r) => i.jsxs("div", {
                  className: "table-row",
                  children: [
                    i.jsx("strong", {
                      className: r.outcome,
                      children: r.outcome === "win" ? "Victory" : r.outcome === "loss" ? "Defeat" : "No Contest"
                    }),
                    i.jsx("span", {
                      children: r.opponent
                    }),
                    i.jsx("span", {
                      children: r.map
                    }),
                    i.jsx("span", {
                      children: r.civilization && r.opponentCivilization ? `${r.civilization} vs. ${r.opponentCivilization}` : "\u2014"
                    }),
                    i.jsxs("span", {
                      className: r.ratingChange >= 0 ? "win" : "loss",
                      children: [
                        r.ratingChange > 0 ? "+" : "",
                        r.ratingChange
                      ]
                    }),
                    i.jsxs("span", {
                      children: [
                        r.durationMinutes,
                        "m"
                      ]
                    })
                  ]
                }, r.id)),
                c.recentMatches.length === 0 && i.jsx("div", {
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
            i.jsx(Ly, {
              maps: kv
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
                        c.recentMatches.length,
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
  function Ra({ label: c, options: o, value: f, onChange: r, className: m, disabled: y = false, searchable: E = false, displayValue: A }) {
    var _a2, _b2;
    const x = C.useRef(null), [p, S] = C.useState(""), G = A ?? ((_a2 = o.find((Y) => Y.value === f)) == null ? void 0 : _a2.label) ?? ((_b2 = o[0]) == null ? void 0 : _b2.label) ?? "", L = E ? o.filter((Y) => Y.label.toLowerCase().includes(p.trim().toLowerCase())) : o;
    return C.useEffect(() => {
      const Y = (g) => {
        const W = x.current;
        (W == null ? void 0 : W.open) && g.target instanceof Node && !W.contains(g.target) && W.removeAttribute("open");
      };
      return document.addEventListener("pointerdown", Y), () => document.removeEventListener("pointerdown", Y);
    }, []), i.jsxs("div", {
      className: m ? `themed-select-field ${m}` : "themed-select-field",
      children: [
        c && i.jsx("span", {
          children: c
        }),
        i.jsxs("details", {
          className: "themed-select",
          ref: x,
          onToggle: (Y) => {
            Y.currentTarget.open || S("");
          },
          children: [
            i.jsx("summary", {
              "aria-disabled": y,
              onClick: (Y) => {
                y && Y.preventDefault();
              },
              children: G
            }),
            i.jsxs("div", {
              className: "themed-select-options",
              children: [
                E && i.jsx("input", {
                  "aria-label": `Search ${c}`,
                  autoFocus: true,
                  className: "themed-select-search",
                  placeholder: "Search civilizations...",
                  type: "search",
                  value: p,
                  onChange: (Y) => S(Y.target.value)
                }),
                i.jsxs("div", {
                  className: "themed-select-option-list",
                  role: "listbox",
                  "aria-label": c || "Select option",
                  children: [
                    L.map((Y) => i.jsx("button", {
                      "aria-selected": Y.value === f,
                      className: Y.value === f ? "selected" : void 0,
                      disabled: y || Y.disabled,
                      onClick: () => {
                        var _a3;
                        Y.disabled || (r(Y.value), (_a3 = x.current) == null ? void 0 : _a3.removeAttribute("open"));
                      },
                      role: "option",
                      type: "button",
                      children: Y.label
                    }, Y.value)),
                    L.length === 0 && i.jsx("span", {
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
  const Lv = {
    bonuses: [
      "Town Centers spawn 2 Villagers when the next Age is reached",
      "Cavalry +2 attack vs. Skirmishers",
      "Elephant Units receive -25% bonus damage and are more resistant to conversion",
      "Monks +3 melee/+3 pierce armor",
      "Ships regenerate 15 HP per minute"
    ],
    teamBonus: "Trade Units generate +10% food in addition to gold"
  }, qv = {
    bonuses: [
      "Mining Camp technologies free",
      "Blacksmiths and Universities cost -100 wood",
      "Spearman-line deals +25% bonus damage",
      "Fervor and Sanctity affect Villagers",
      "Chemistry and Hand Cannoneer available in Castle Age"
    ],
    teamBonus: "Markets work +80% faster"
  }, Bv = {
    bonuses: [
      "Loom is researched instantly",
      "Hunters carry +15; hunted animals last +20% longer",
      "Infantry costs -15/20/25/30% in Dark/Feudal/Castle/ Imperial Age",
      "Infantry +1/+2/+3 attack vs. buildings in Feudal/ Castle/Imperial Age",
      "+10 population space in Imperial Age"
    ],
    teamBonus: "Barracks work +20% faster"
  }, Hv = {
    bonuses: [
      "Start with 2 Forage Bushes",
      "Can garrison livestock in Mills to passively produce food",
      "Mounted Units deal +20/30/40% bonus damage in Feudal/Castle/Imperial Age",
      "Docks +5 garrison capacity"
    ],
    teamBonus: "Camel and Elephant Units train +25% faster"
  }, Gv = {
    bonuses: [
      "Advancing to the next Age costs -15%",
      "Foot Archers and Condottieri +1 melee/+1 pierce armor",
      "Dock and University technologies cost -25%",
      "Gunpowder Units cost -20%",
      "Fishing Ships cost -15%"
    ],
    teamBonus: "Condottiero available at the Barracks in Imperial Age"
  }, Yv = {
    bonuses: [
      "Villagers defeat wolves with one strike",
      "Scout Cavalry-line costs -15%",
      "Melee attack upgrades free"
    ],
    teamBonus: "Mounted Archers train +25% faster"
  }, Qv = {
    bonuses: [
      "Advancing to the next Age is +66% faster",
      "Infantry armor upgrades free",
      "Battle Elephants cost -25/35% in Castle/Imperial Age",
      "Fish Traps cost -33% and provide +200% food"
    ],
    teamBonus: "Docks +6 line of sight"
  }, Vv = {
    bonuses: [
      "Wheelbarrow, Hand Cart free",
      "Infantry +20% HP starting in Feudal Age",
      "Warships cost -10/15/20% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Docks cost -15%"
  }, Xv = {
    bonuses: [
      "Mule Carts cost -25%",
      "Mule Cart technology effects +40%",
      "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier",
      "First Fortified Church receives a free Relic",
      "Galley-line and Dromons fire an additional projectile"
    ],
    teamBonus: "Infantry +2 line of sight"
  }, Zv = {
    bonuses: [
      "Start with +50 gold",
      "Villagers carry +3",
      "Military Units train +15% faster",
      "Monks gain +5 HP for each researched Monastery technology"
    ],
    teamBonus: "Relics generate +33% gold"
  }, Kv = {
    bonuses: [
      "Villagers move +5% faster in Dark Age, +10% faster starting in Feudal Age",
      "Stable Units cost -15/20% in Castle/Imperial Age",
      "Ships move +10% faster"
    ],
    teamBonus: "Genitour available at the Archery Range starting in Castle Age"
  }, Jv = {
    bonuses: [
      "Shepherds work +25% faster",
      "Town Centers cost -50% wood starting in Castle Age",
      "Foot Archers +1/+2 range in Castle/Imperial Age"
    ],
    teamBonus: "Archery Ranges work +10% faster"
  }, Fv = {
    bonuses: [
      "Militia-line upgrades free",
      "Blacksmith and Siege Workshop technologies cost -50% food",
      "Town Centers cost -50% stone",
      "Can build Krepost in Castle Age"
    ],
    teamBonus: "Blacksmiths work +80% faster"
  }, $v = {
    bonuses: [
      "Economic upgrades available one age earlier and cost -40% food",
      "Stable technologies cost -50%",
      "Cavalier upgrade available in Castle Age",
      "Gunpowder Units +25% attack"
    ],
    teamBonus: "Relics generate food in addition to gold"
  }, Iv = {
    bonuses: [
      "Lumber Camp technologies free",
      "Infantry +1/+2/+3 attack in Feudal/Castle/Imperial Age",
      "Battle Elephants +1 melee/+1 pierce armor",
      "Monastery technologies cost -50%"
    ],
    teamBonus: "Relics visible on the map at the start of the game"
  }, Wv = {
    bonuses: [
      "Buildings +10/20/30/40% HP in Dark/Feudal/Castle/Imperial Age",
      "Camel Riders, Skirmishers and Spearman-line cost -25%",
      "Town Watch, Town Patrol free",
      "Advancing to Imperial Age costs -33%",
      "Fire Ships and Dromons attack +25% faster"
    ],
    teamBonus: "Monks heal +100% faster"
  }, Pv = {
    bonuses: [
      "Lumberjacks work +15% faster",
      "Livestock animals within Celt unit line of sight cannot be stolen",
      "Infantry moves +5/10/15/20% faster in Dark/Feudal/ Castle/Imperial Age",
      "Siege Weapons attack +25% faster"
    ],
    teamBonus: "Siege Workshops work +20% faster"
  }, eb = {
    bonuses: [
      "Start with +3 Villagers, but -50 wood and -200 food",
      "Technologies cost -5/10/15% in Feudal/Castle/Imperial Age",
      "Town Centers +7 line of sight and provide +15 population space",
      "Fire Lancers and Fire Ships move +5/10% faster in Castle/Imperial Age"
    ],
    teamBonus: "Farms +10% food"
  }, tb = {
    bonuses: [
      "One additional Town Center can be built in Feudal Age",
      "Mounted Units move +5/10/15% faster in Feudal/ Castle/Imperial Age",
      "Archery Ranges and Stables cost -75 wood",
      "Siege Workshop and Battering Ram available in Feudal Age; Capped Ram available in Castle Age"
    ],
    teamBonus: "Palisade Walls +33% HP"
  }, ab = {
    bonuses: [
      "Fishermen and Fishing Ships carry +15",
      "Receive +200 wood when advancing to the next Age",
      "Skirmishers and Elephant Archers attack +25% faster",
      "Barracks technologies cost -50%",
      "Siege Weapons cost -33% wood"
    ],
    teamBonus: "Docks provide +5 population space"
  }, nb = {
    bonuses: [
      "Receive +100 gold and +100 food when advancing to the next Age",
      "Foot Archers attack +18% faster",
      "Pikeman upgrade free"
    ],
    teamBonus: "Outposts +3 line of sight and cost no stone"
  }, lb = {
    bonuses: [
      "Foragers work +15% faster",
      "Mill technologies free",
      "Mounted Units +20% HP starting in Feudal Age",
      "Castles cost -15/25% in Castle/Imperial Age"
    ],
    teamBonus: "Knight-line +2 line of sight"
  }, ib = {
    bonuses: [
      "Start with a Mule Cart",
      "Units and buildings receive -15% damage when located on higher elevation",
      "Mounted Units regenerate 2/8/14 HP per minute in Feudal/Castle/Imperial Age",
      "Fortified Churches provide Villagers in a 9 tiles radius with +10% work rate"
    ],
    teamBonus: "Building repairs cost -25%"
  }, sb = {
    bonuses: [
      "Villagers cost -8/13/18/23% in Dark/Feudal/Castle/ Imperial Age",
      "Camel Riders attack +20% faster",
      "Gunpowder Units +1 melee/+1 pierce armor",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line and Camel Units +2 attack vs. buildings"
  }, cb = {
    bonuses: [
      "Do not need houses, but start with -100 wood",
      "Cavalry Archers cost -10/20% in Castle/Imperial Age",
      "Trebuchets fire more accurately at units and small targets",
      "On Nomadic maps, the first Town Center spawns a scouting Horse"
    ],
    teamBonus: "Stables work +20% faster"
  }, ub = {
    bonuses: [
      "Houses and Settlements provide +5 population space",
      "Buildings cost -15% stone",
      "Military Units cost -15/20/25/30% food in Dark/Feudal/Castle/Imperial Age",
      "Villagers affected by Infantry Blacksmith upgrades starting in Castle Age"
    ],
    teamBonus: "Start with a free Llama"
  }, ob = {
    bonuses: [
      "Mills, Lumber- and Mining Camps cost -50%",
      "Infantry attacks +33% faster starting in Feudal Age",
      "Cavalry Archers +2 attack vs. Ranged Soldiers (except Skirmishers)",
      "Fishing Ships work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age; +100% HP"
    ],
    teamBonus: "Galley-line +4 line of sight"
  }, rb = {
    bonuses: [
      "Meat of hunted and livestock animals doesn't decay",
      "Mounted Units and Fire Lancers attack +25% faster starting in Feudal Age",
      "Siege Engineers available in Castle Age",
      "Siege and Fortification upgrades cost -75% wood and research +100% faster",
      "Units receive -50% friendly fire damage"
    ],
    teamBonus: "Gunpowder Units +2 line of sight"
  }, db = {
    bonuses: [
      "Pastures replace Farms",
      "Melee attack upgrade effects are doubled",
      "Skirmishers, Spearman-, and Scout Cavalry-line train and upgrade +15% faster",
      "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"
    ],
    teamBonus: "Infantry +2 attack vs. Ranged Soldiers"
  }, fb = {
    bonuses: [
      "No buildings required to advance to the next Age or to unlock other buildings",
      "Farmers don't require Mills or Town Centers to drop off food",
      "Villagers can garrison in Houses",
      "Battle Elephants move +10% faster"
    ],
    teamBonus: "Scorpions +1 range"
  }, mb = {
    bonuses: [
      "Stone miners work +20% faster",
      "Ranged Soldiers and Infantry cost -50% wood",
      "Archer armor and tower upgrades free (Bombard Tower requires Chemistry)",
      "Warships cost -20% wood"
    ],
    teamBonus: "Villagers +3 line of sight"
  }, hb = {
    bonuses: [
      "Each Town Center provides +100 food",
      "Spearman-line and Skirmisher-line move +10% faster",
      "Each garrisoned Relic provides +1 attack to Knight-line and Leitis (maximum +4)"
    ],
    teamBonus: "Monasteries work +20% faster"
  }, pb = {
    bonuses: [
      "Buildings cost -15% wood",
      "Villagers drop off +10% more gold",
      "Barracks Units +1/+2/+3 pierce armor in Feudal/ Castle/Imperial Age"
    ],
    teamBonus: "Universities work +80% faster"
  }, gb = {
    bonuses: [
      "Start with +1 Villager, but -50 food",
      "Resources last +15% longer",
      "Foot Archers cost -10/20/30% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Walls cost -50%"
  }, yb = {
    bonuses: [
      "Hunters work +40% faster",
      "Cavalry Archers attack +25% faster",
      "Scout Cavalry-line and Steppe Lancers +20/30% HP in Castle/Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line +2 line of sight"
  }, vb = {
    bonuses: [
      "Start with +50 wood and +50 food",
      "Town Centers and Docks +100% HP and work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age",
      "Parthian Tactics available in Castle Age",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Knight-line +2 attack vs. Ranged Soldiers"
  }, bb = {
    bonuses: [
      "Folwark replaces Mill",
      "Villagers regenerate 10/15/20 HP in Feudal/Castle/Imperial Age",
      "Stone Miners generate gold in addition to stone",
      "Bloodlines and Scout Cavalry-line upgrades cost -50% food"
    ],
    teamBonus: "Scout Cavalry-line +1 attack vs. Ranged Soldiers"
  }, Sb = {
    bonuses: [
      "Foragers generate wood in addition to food",
      "All units cost -20% gold",
      "Can build Feitoria in Imperial Age",
      "Ships +10/15/20% HP in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Technologies research +25% faster"
  }, xb = {
    bonuses: [
      "Villagers gather, build, and repair +5% faster",
      "Infantry armor upgrade effects are doubled",
      "Scorpions cost -50% gold",
      "Galley-line and Dromons +1 melee/+1 pierce armor"
    ],
    teamBonus: "Scorpions minimum range reduced"
  }, wb = {
    bonuses: [
      "Market trading fee only 5%; Markets cost -100 wood",
      "Camel Units +25% HP",
      "Galley-line attacks +25% faster",
      "Transport Ships +100% HP, +20 carry capacity"
    ],
    teamBonus: "Foot Archers and Skirmishers +2 attack vs. buildings"
  }, Mb = {
    bonuses: [
      "Lumberjacks generate food in addition to wood",
      "Archery Unit technologies at the Archery Range and Blacksmith cost -25%",
      "Siege Weapons and Siege Warships move +10/15% faster in Castle/Imperial Age"
    ],
    teamBonus: "Foot Archers +2 line of sight"
  }, jb = {
    bonuses: [
      "Start with +100 stone",
      "Farm upgrades provide +125% additional food",
      "Soldiers receive -40% bonus damage",
      "Can build Donjon in Dark Age, replaces Watch Tower-line",
      "Fortifications built +50% faster; Town Centers built +100% faster"
    ],
    teamBonus: "Transport Ships +5 line of sight and cost -50%"
  }, Ab = {
    bonuses: [
      "Farmers work +15% faster",
      "Arson, Gambesons free",
      "Siege Workshop Units cost -15%",
      "Monks move +20% faster"
    ],
    teamBonus: "Military buildings (except Castles) provide +5 population space"
  }, Eb = {
    bonuses: [
      "Builders work +30% faster",
      "Receive +20 gold for each technology researched",
      "Blacksmith upgrades cost no gold",
      "Gunpowder Units attack +18% faster",
      "Cannon Galleons fire more accurately at moving targets"
    ],
    teamBonus: "Trade Units generate +25% gold"
  }, Cb = {
    bonuses: [
      "Livestock animals last +50% longer",
      "Units deal +25% damage when fighting from higher elevation",
      "New Town Centers spawn 2 Sheep starting in Castle Age",
      "Thumb Ring, Parthian Tactics free"
    ],
    teamBonus: "Mounted Archers +2 line of sight"
  }, Nb = {
    bonuses: [
      "Farms cost -40%",
      "Town Centers +10 garrison capacity; Towers +5 garrison capacity",
      "Barracks and Stable Units +1/+2 melee armor in Castle/Imperial Age",
      "Monks +100% healing range",
      "Murder Holes, Herbal Medicine free"
    ],
    teamBonus: "Units more resistant to conversion"
  }, Rb = {
    bonuses: [
      "Gold miners work +25% faster",
      "Scout Cavalry-line +1 pierce armor and upgrades free",
      "Chemistry free; Gunpowder technologies costs -50%",
      "Gunpowder Units +25% HP"
    ],
    teamBonus: "Gunpowder Units train +25% faster"
  }, Tb = {
    bonuses: [
      "Enemy Town Centers are revealed at the start of the game",
      "Economic upgrades cost no wood and research +100% faster",
      "Archery Range units and Fire Lancers +20% HP",
      "Conscription free"
    ],
    teamBonus: "Imperial Skirmisher upgrade available in Imperial Age"
  }, zb = {
    bonuses: [
      "Receive one free Villager for each economic upgrade researched",
      "Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age",
      "Traction Trebuchets and Lou Chuans cost -25%"
    ],
    teamBonus: "Cavalry +2 attack vs. Siege Weapons"
  }, _b = {
    bonuses: [
      "Military production buildings and Docks provide +55 food",
      "Infantry regenerates 10/15/30 HP per minute in Feudal/Castle/Imperial Age",
      "Jian Swordsmen and Hei Guang Cavalry +2 attack in Imperial Age",
      "Careening, Dry Dock free"
    ],
    teamBonus: "Houses built +100% faster"
  }, jh = {
    Bengalis: Lv,
    Bohemians: qv,
    Goths: Bv,
    Gurjaras: Hv,
    Italians: Gv,
    Magyars: Yv,
    Malay: Qv,
    Vikings: Vv,
    Armenians: Xv,
    Aztecs: Zv,
    Berbers: Kv,
    Britons: Jv,
    Bulgarians: Fv,
    Burgundians: $v,
    Burmese: Iv,
    Byzantines: Wv,
    Celts: Pv,
    Chinese: eb,
    Cumans: tb,
    Dravidians: ab,
    Ethiopians: nb,
    Franks: lb,
    Georgians: ib,
    Hindustanis: sb,
    Huns: cb,
    Incas: ub,
    Japanese: ob,
    Jurchens: rb,
    Khitans: db,
    Khmer: fb,
    Koreans: mb,
    Lithuanians: hb,
    Malians: pb,
    Mayans: gb,
    Mongols: yb,
    Persians: vb,
    Poles: bb,
    Portuguese: Sb,
    Romans: xb,
    Saracens: wb,
    Shu: Mb,
    Sicilians: jb,
    Slavs: Ab,
    Spanish: Eb,
    Tatars: Cb,
    Teutons: Nb,
    Turks: Rb,
    Vietnamese: Tb,
    Wei: zb,
    Wu: _b
  }, Db = [
    {
      id: "q9VTQHcmdYA",
      title: "Even the best players make mistakes",
      channelTitle: "AoE2 community"
    },
    {
      id: "jAMcq_p-33I",
      title: "A king snipe changes everything",
      channelTitle: "AoE2 community"
    },
    {
      id: "yr7KbvobgBg",
      title: "Everybody loves a mangonel shot",
      channelTitle: "AoE2 community"
    },
    {
      id: "a2L1F5QxDgg",
      title: "A memorable tournament moment",
      channelTitle: "AoE2 community"
    },
    {
      id: "9qRiIkH7Jhk",
      title: "Age of Empires II micro",
      channelTitle: "AoE2 community"
    }
  ];
  async function Ub(c) {
    return Db;
  }
  let _s;
  function kb() {
    var _a2;
    return ((_a2 = window.YT) == null ? void 0 : _a2.Player) ? Promise.resolve() : _s || (_s = new Promise((c) => {
      const o = window.onYouTubeIframeAPIReady;
      if (window.onYouTubeIframeAPIReady = () => {
        o == null ? void 0 : o(), c();
      }, !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const f = document.createElement("script");
        f.src = "https://www.youtube.com/iframe_api", f.async = true, document.head.append(f);
      }
    }), _s);
  }
  function Ah() {
    const [c, o] = C.useState([]), [f, r] = C.useState(0), [m, y] = C.useState(false), [E, A] = C.useState(false), [x, p] = C.useState(0), [S, G] = C.useState(0), [L, Y] = C.useState(false), [g, W] = C.useState(false), [Z, le] = C.useState(false), de = C.useRef(null), ce = C.useRef(null), se = C.useRef(null), X = C.useRef(false);
    C.useEffect(() => {
      const j = new AbortController();
      return Ub(j.signal).then(o), () => j.abort();
    }, []), C.useEffect(() => () => {
      var _a2;
      (_a2 = se.current) == null ? void 0 : _a2.pauseVideo();
      const j = document.fullscreenElement, D = ce.current;
      j && D && (j === D || D.contains(j)) && document.exitFullscreen();
    }, []), C.useEffect(() => {
      const j = () => {
        var _a2;
        X.current = false, (_a2 = se.current) == null ? void 0 : _a2.pauseVideo(), y(false), le(false), Y(false), p(0), G(0);
      };
      return window.addEventListener(oo, j), () => window.removeEventListener(oo, j);
    }, []), C.useEffect(() => {
      const j = () => {
        W(document.fullscreenElement === ce.current);
      };
      return document.addEventListener("fullscreenchange", j), () => document.removeEventListener("fullscreenchange", j);
    }, []);
    const V = c[f], _ = C.useCallback(() => {
      r((j) => (j - 1 + c.length) % c.length);
    }, [
      c.length
    ]), F = C.useCallback(() => {
      r((j) => (j + 1) % c.length);
    }, [
      c.length
    ]);
    C.useEffect(() => {
      if (!Z || !V || !de.current) return;
      let j = false;
      return Y(false), y(false), p(0), G(0), kb().then(() => {
        j || !de.current || !window.YT || (se.current = new window.YT.Player(de.current, {
          events: {
            onReady: (D) => {
              j || (se.current = D.target, Y(true), A(D.target.isMuted()), G(D.target.getDuration()), X.current && (X.current = false, D.target.playVideo()));
            },
            onStateChange: (D) => {
              j || (y(D.data === 1), D.data === 0 && (X.current = true, F()));
            },
            onAutoplayBlocked: (D) => {
              j || (D.target.mute(), A(true), D.target.playVideo());
            }
          }
        }));
      }), () => {
        var _a2;
        j = true, (_a2 = se.current) == null ? void 0 : _a2.destroy(), se.current = null;
      };
    }, [
      V == null ? void 0 : V.id,
      Z,
      F
    ]), C.useEffect(() => {
      if (!L) return;
      const j = window.setInterval(() => {
        se.current && (p(se.current.getCurrentTime()), G(se.current.getDuration()));
      }, 250);
      return () => window.clearInterval(j);
    }, [
      L
    ]);
    const k = () => {
      se.current && (m ? se.current.pauseVideo() : se.current.playVideo());
    }, J = () => {
      se.current && (E ? se.current.unMute() : se.current.mute(), A(!E));
    }, ae = (j) => {
      var _a2;
      (_a2 = se.current) == null ? void 0 : _a2.seekTo(j, true), p(j);
    }, Ee = () => {
      var _a2;
      document.fullscreenElement ? document.exitFullscreen() : (_a2 = ce.current) == null ? void 0 : _a2.requestFullscreen();
    }, Me = () => {
      X.current = true, _();
    }, je = () => {
      X.current = true, F();
    }, $ = () => {
      X.current = true, le(true);
    };
    return i.jsxs("aside", {
      className: "shorts-panel",
      "aria-label": "Age of Empires II YouTube Shorts",
      children: [
        i.jsxs("div", {
          className: "shorts-heading",
          children: [
            i.jsxs("span", {
              children: [
                i.jsx(Oy, {
                  size: 18,
                  "aria-hidden": "true"
                }),
                " AoE2 Shorts"
              ]
            }),
            c.length > 0 && i.jsxs("small", {
              children: [
                f + 1,
                " / ",
                c.length
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "shorts-stage",
          ref: ce,
          children: [
            i.jsxs("div", {
              className: "shorts-player",
              children: [
                Z ? V ? i.jsx("iframe", {
                  ref: de,
                  id: `aoe2-short-${V.id}`,
                  src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(V.id)}?playsinline=1&rel=0&enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3`,
                  title: V.title,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                  referrerPolicy: "strict-origin-when-cross-origin",
                  allowFullScreen: true
                }, V.id) : i.jsx("div", {
                  className: "shorts-loading",
                  children: "Finding AoE2 shorts\u2026"
                }) : i.jsx("button", {
                  className: "shorts-launch",
                  type: "button",
                  onClick: $,
                  disabled: !V,
                  "aria-label": "Load and play the first Age of Empires II short",
                  children: i.jsx("span", {
                    className: "shorts-launch-emblem",
                    "aria-hidden": "true",
                    children: i.jsx(_m, {
                      size: 30,
                      fill: "currentColor"
                    })
                  })
                }),
                i.jsx("button", {
                  className: "shorts-fullscreen-arrow previous",
                  type: "button",
                  onClick: Me,
                  disabled: !Z || c.length < 2,
                  "aria-label": "Previous short",
                  children: i.jsx(Tm, {
                    size: 34
                  })
                }),
                i.jsx("button", {
                  className: "shorts-fullscreen-arrow next",
                  type: "button",
                  onClick: je,
                  disabled: !Z || c.length < 2,
                  "aria-label": "Next short",
                  children: i.jsx(zm, {
                    size: 34
                  })
                })
              ]
            }),
            i.jsxs("div", {
              className: "shorts-controls",
              "aria-label": "Video controls",
              children: [
                i.jsx("button", {
                  type: "button",
                  onClick: k,
                  disabled: !L,
                  "aria-label": m ? "Pause short" : "Play short",
                  children: m ? i.jsx(Ay, {
                    size: 18
                  }) : i.jsx(_m, {
                    size: 18
                  })
                }),
                i.jsx("span", {
                  className: "shorts-time",
                  children: Jm(x)
                }),
                i.jsx("input", {
                  type: "range",
                  min: "0",
                  max: Math.max(S, 1),
                  step: "0.1",
                  value: Math.min(x, Math.max(S, 1)),
                  disabled: !L,
                  onChange: (j) => ae(Number(j.target.value)),
                  "aria-label": "Video progress",
                  style: {
                    "--short-progress": `${S > 0 ? x / S * 100 : 0}%`
                  }
                }),
                i.jsx("span", {
                  className: "shorts-time",
                  children: Jm(S)
                }),
                i.jsx("button", {
                  type: "button",
                  onClick: J,
                  disabled: !L,
                  "aria-label": E ? "Unmute short" : "Mute short",
                  children: E ? i.jsx(Uy, {
                    size: 18
                  }) : i.jsx(Dy, {
                    size: 18
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  onClick: Ee,
                  disabled: !Z,
                  "aria-label": g ? "Exit fullscreen" : "View short fullscreen",
                  children: g ? i.jsx(jy, {
                    size: 18
                  }) : i.jsx(vy, {
                    size: 18
                  })
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: "shorts-footer",
          children: [
            i.jsx("button", {
              type: "button",
              onClick: Me,
              disabled: !Z || c.length < 2,
              "aria-label": "Previous short",
              children: i.jsx(Tm, {
                size: 22
              })
            }),
            i.jsxs("div", {
              children: [
                i.jsx("strong", {
                  children: (V == null ? void 0 : V.title) ?? "Loading"
                }),
                i.jsx("span", {
                  children: (V == null ? void 0 : V.channelTitle) ?? "YouTube"
                })
              ]
            }),
            i.jsx("button", {
              type: "button",
              onClick: je,
              disabled: !Z || c.length < 2,
              "aria-label": "Next short",
              children: i.jsx(zm, {
                size: 22
              })
            })
          ]
        })
      ]
    });
  }
  function Jm(c) {
    const o = Number.isFinite(c) ? Math.max(0, Math.floor(c)) : 0;
    return `${Math.floor(o / 60)}:${String(o % 60).padStart(2, "0")}`;
  }
  function Ob() {
    var _a2;
    const { state: c, prepareLobby: o } = St(), f = !c.error, r = c.activeMatch, m = c.roomSetupEstimateMs ?? 6e4, [y, E] = C.useState(() => Im(c.roomSetupStartedAt, m)), A = $t.find((G) => {
      var _a3;
      return G.id === ((_a3 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a3.id);
    }) ?? (r == null ? void 0 : r.selectedMap), x = A ? (_a2 = fh(A.id)) == null ? void 0 : _a2.description : void 0, p = Fm(r == null ? void 0 : r.queue.civilizationPreference, r == null ? void 0 : r.opponentCivilizationPreference), S = Fm(r == null ? void 0 : r.opponentCivilizationPreference, r == null ? void 0 : r.queue.civilizationPreference);
    return C.useEffect(() => {
      const G = () => E(Im(c.roomSetupStartedAt, m));
      G();
      const L = window.setInterval(G, 250);
      return () => window.clearInterval(L);
    }, [
      m,
      c.roomSetupStartedAt
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
              children: y > 0 ? "Game starts in" : "Starting game\u2026"
            }),
            y > 0 && i.jsx("div", {
              className: "lobby-countdown",
              "aria-live": "polite",
              children: y
            }),
            i.jsxs("div", {
              className: "lobby-milestone",
              "aria-live": "polite",
              children: [
                i.jsx(ch, {
                  size: 18,
                  className: "spin",
                  "aria-hidden": "true"
                }),
                i.jsx("span", {
                  children: c.roomSetupMilestone ?? "Preparing game"
                })
              ]
            }),
            c.error && i.jsxs("div", {
              className: "error-panel",
              children: [
                i.jsx("strong", {
                  children: c.error.message
                }),
                i.jsx("span", {
                  children: c.error.technicalDetails
                }),
                i.jsx("button", {
                  type: "button",
                  onClick: () => void o(),
                  children: "Try Again"
                })
              ]
            })
          ]
        }),
        i.jsx(Ah, {}),
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
                  children: (A == null ? void 0 : A.name) ?? "Map pending"
                }),
                (A == null ? void 0 : A.thumbnailUrl) ? i.jsx("img", {
                  src: A.thumbnailUrl,
                  alt: `Preview of ${A.name}`
                }) : i.jsx("div", {
                  className: "upcoming-map-placeholder",
                  children: "Map preview unavailable"
                }),
                x && i.jsx("p", {
                  className: "upcoming-map-description",
                  children: x
                })
              ]
            }),
            i.jsx($m, {
              civilization: p,
              side: "player"
            }),
            i.jsx($m, {
              civilization: S,
              side: "opponent"
            })
          ]
        })
      ]
    });
  }
  function Fm(c, o) {
    const f = (c == null ? void 0 : c.mode) === "mirror" ? o == null ? void 0 : o.civilization : c == null ? void 0 : c.civilization;
    return f && f in jh ? f : null;
  }
  function $m({ civilization: c, side: o }) {
    const f = c ? jh[c] : null;
    return i.jsxs("article", {
      className: `civ-bonus-card ${o}`,
      children: [
        i.jsx("span", {
          className: "eyebrow",
          children: o === "player" ? "Your civilization" : "Opponent civilization"
        }),
        i.jsx("h3", {
          children: c ?? "Random civilization"
        }),
        f ? i.jsxs(i.Fragment, {
          children: [
            i.jsx("ul", {
              children: f.bonuses.map((r) => i.jsx("li", {
                children: r
              }, r))
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
  function Im(c, o) {
    const f = Math.ceil(o / 1e3);
    if (!c) return f;
    const r = Math.floor((Date.now() - new Date(c).getTime()) / 1e3);
    return Math.max(0, f - r);
  }
  function Lb() {
    var _a2, _b2, _c;
    const { state: c, simulateMatchEnd: o } = St(), f = c.activeMatch;
    return f ? i.jsxs("section", {
      className: "match-focus",
      children: [
        i.jsx("span", {
          className: "eyebrow",
          children: c.queueStatus === "verifying_result" ? "Result verification" : "Match in progress"
        }),
        i.jsxs("h2", {
          children: [
            f.player.displayName,
            " vs ",
            f.opponent.displayName
          ]
        }),
        c.queueStatus === "verifying_result" && i.jsx("p", {
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
                  children: (_b2 = f.lobby) == null ? void 0 : _b2.serverRegion
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
                  children: c.queueStatus.replaceAll("_", " ")
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
                i.jsx(ky, {
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
  function qb({ oldRating: c, newRating: o, onClose: f }) {
    C.useEffect(() => {
      const y = (E) => {
        E.key === "Escape" && f();
      };
      return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
    }, [
      f
    ]);
    const r = di(c), m = di(o);
    return i.jsx("div", {
      className: "modal-backdrop promotion-backdrop",
      role: "presentation",
      children: i.jsxs("section", {
        className: "match-modal promotion-modal",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "promotion-title",
        children: [
          i.jsx(Ty, {
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
            "aria-label": `Promoted from ${r} to ${m}`,
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("span", {
                    children: "Previous"
                  }),
                  i.jsx("strong", {
                    children: r
                  }),
                  i.jsxs("small", {
                    children: [
                      c,
                      " Elo"
                    ]
                  })
                ]
              }),
              i.jsx(ry, {
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
                      o,
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
  function Bb() {
    const { state: c, setPage: o, returnToMatchmaking: f } = St(), [r, m] = C.useState(true), y = c.activeMatch, E = y == null ? void 0 : y.result;
    if (!y || !E) return null;
    const A = E.outcome === "win", x = E.verificationStatus === "contested", p = E.verified && A && iy(E.oldRating, E.newRating);
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("section", {
          className: "result-screen",
          children: [
            i.jsx("span", {
              className: "eyebrow",
              children: x ? "Contested result" : "Verified result"
            }),
            i.jsx("h2", {
              className: A ? "win" : "loss",
              children: x ? "Result Contested" : A ? "Victory" : E.outcome === "loss" ? "Defeat" : "No Contest"
            }),
            x && i.jsx("p", {
              children: "The replay result could not be verified. The result was discarded and ratings were not changed."
            }),
            i.jsxs("div", {
              className: "rating-swing",
              children: [
                i.jsxs("strong", {
                  children: [
                    E.ratingChange > 0 ? "+" : "",
                    E.ratingChange,
                    " Rating"
                  ]
                }),
                i.jsx("span", {
                  children: x ? "No rating change" : `${E.oldRating} \u2192 ${E.newRating}`
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
                  onClick: () => o("home"),
                  children: "Return Home"
                })
              ]
            })
          ]
        }),
        p && r && i.jsx(qb, {
          oldRating: E.oldRating,
          newRating: E.newRating,
          onClose: () => m(false)
        })
      ]
    });
  }
  function Hb({ groups: c, enabledGroupIds: o, selectedMapIds: f, favoriteMapIds: r, onToggleGroup: m, onToggleMap: y, onFavorite: E, disabled: A = false }) {
    return i.jsx("div", {
      className: "grouped-map-pool",
      children: c.map((x) => {
        const p = o.includes(x.id);
        return i.jsxs("section", {
          className: p ? "map-group enabled" : "map-group",
          children: [
            i.jsxs("header", {
              className: "map-group-header",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: x.name
                    }),
                    i.jsx("span", {
                      children: x.description
                    })
                  ]
                }),
                i.jsxs("label", {
                  className: "group-switch",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: p,
                      disabled: A,
                      onChange: () => m(x.id)
                    }),
                    i.jsx("span", {
                      "aria-hidden": "true"
                    }),
                    i.jsx("small", {
                      children: p ? "Enabled" : "Disabled"
                    })
                  ]
                })
              ]
            }),
            i.jsx("div", {
              className: "map-group-grid",
              children: x.maps.map((S, G) => {
                const L = S.id === x.primaryMapId, Y = p && f.includes(S.id), g = r[x.id] === S.id;
                return i.jsxs("article", {
                  className: `group-map ${L ? "primary" : ""} ${Y ? "selected" : ""}`,
                  children: [
                    i.jsxs("button", {
                      className: "group-map-select",
                      type: "button",
                      "aria-pressed": Y,
                      "aria-label": `${Y ? "Exclude" : "Include"} ${S.name}`,
                      disabled: A || !p,
                      onClick: () => y(x.id, S.id),
                      children: [
                        i.jsx("img", {
                          src: S.thumbnailUrl,
                          alt: ""
                        }),
                        i.jsx("span", {
                          className: "group-map-shade"
                        }),
                        i.jsxs("span", {
                          className: "group-map-name",
                          children: [
                            i.jsx("strong", {
                              children: S.name
                            }),
                            L && i.jsx("small", {
                              children: "Primary map"
                            })
                          ]
                        }),
                        !Y && i.jsx("span", {
                          className: "map-off-label",
                          children: p ? "Off" : "Group off"
                        })
                      ]
                    }),
                    i.jsx("button", {
                      className: g ? "map-favorite active" : "map-favorite",
                      type: "button",
                      disabled: A || !p,
                      "aria-pressed": g,
                      "aria-label": `${g ? "Remove" : "Favorite"} ${S.name}`,
                      title: g ? "Remove favorite" : `Favorite ${S.name}`,
                      onClick: () => E(x.id, S.id),
                      children: i.jsx(dh, {
                        size: G === 0 ? 18 : 15,
                        fill: g ? "currentColor" : "none"
                      })
                    })
                  ]
                }, S.id);
              })
            })
          ]
        }, x.id);
      })
    });
  }
  const Wm = "empire-league-favorite-maps", hl = "empire-league-civilization-preference", Eh = "empire-league-map-preferences", Pm = [
    {
      id: "pick",
      label: "Choose Civ",
      detail: "Play your selected civilization",
      icon: vo
    },
    {
      id: "random",
      label: "Random",
      detail: "Roll a civilization after the map is chosen",
      icon: Ny
    },
    {
      id: "mirror",
      label: "Mirror",
      detail: "Match your opponent's civilization",
      icon: gy
    }
  ];
  function Gb() {
    var _a2, _b2, _c;
    const { state: c, queues: o, startQueue: f, updateActiveQueue: r, cancelQueue: m } = St(), [y, E] = C.useState(0), [A] = C.useState(() => Vb(o)), [x, p] = C.useState(() => {
      var _a3;
      const q = wo().selectedQueueId;
      return o.some((fe) => fe.id === q) ? q : ((_a3 = o[0]) == null ? void 0 : _a3.id) ?? "";
    }), S = o.find((q) => q.id === x) ?? o[0], G = [
      "idle",
      "cancelled",
      "completed"
    ].includes(c.queueStatus) && (!c.activeMatch || c.queueStatus === "completed") && c.gameStatus !== "loading", L = c.queueStatus === "searching", Y = ![
      "idle",
      "cancelled",
      "completed",
      "searching"
    ].includes(c.queueStatus), [g, W] = C.useState(A.selectedMaps), [Z, le] = C.useState(A.enabledGroups), [de, ce] = C.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(Wm) ?? "{}");
        return Object.fromEntries(Object.entries(q).map(([fe, w]) => [
          fe,
          w && typeof w == "object" ? w : {}
        ]));
      } catch {
        return {};
      }
    }), [se, X] = C.useState([
      2,
      4
    ]), [V, _] = C.useState(true), [F, k] = C.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(hl) ?? "{}");
        if (q.preferRandom === true) return "pick";
        const fe = q.mode;
        return fe === "prefer-random" || fe === "full-random" ? "random" : fe ?? "pick";
      } catch {
        return "pick";
      }
    }), [J, ae] = C.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(hl) ?? "{}").civilization ?? "Byzantines";
      } catch {
        return "Byzantines";
      }
    }), [Ee, Me] = C.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(hl) ?? "{}").preferRandom === true;
      } catch {
        return false;
      }
    }), [je, $] = C.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(hl) ?? "{}");
        return {
          open: Array.isArray(q.openLandBans) ? q.openLandBans.slice(0, 5) : [],
          closed: Array.isArray(q.closedLandBans) ? q.closedLandBans.slice(0, 5) : []
        };
      } catch {
        return {
          open: [],
          closed: []
        };
      }
    }), [j, D] = C.useState(false), [ee, he] = C.useState(false), [Ae, v] = C.useState("open"), B = (q = F, fe = J, w = je) => {
      window.localStorage.setItem(hl, JSON.stringify({
        mode: q,
        civilization: fe,
        preferRandom: Ee,
        openLandBans: w.open,
        closedLandBans: w.closed
      }));
    }, P = (q) => {
      Ee && F === "pick" && (q === "pick" || q === "random") || (k(q), B(q));
    }, ie = (q) => {
      ae(q), B(F, q);
    }, ye = (q, fe) => {
      $((w) => {
        const R = w[q], K = R.includes(fe) ? R.filter((I) => I !== fe) : R.length < 5 ? [
          ...R,
          fe
        ] : R, ne = {
          ...w,
          [q]: K
        };
        return B(F, J, ne), ne;
      });
    }, be = {
      preferRandom: Ee,
      openLandBans: je.open,
      closedLandBans: je.closed
    }, _e = (q, fe, w) => {
      ce((R) => {
        const K = {
          ...R[q] ?? {}
        };
        K[fe] === w ? delete K[fe] : K[fe] = w;
        const ne = {
          ...R,
          [q]: K
        };
        return window.localStorage.setItem(Wm, JSON.stringify(ne)), ne;
      }), W((R) => {
        var _a3;
        return {
          ...R,
          [q]: ((_a3 = R[q]) == null ? void 0 : _a3.includes(w)) ? R[q] : [
            ...R[q] ?? [],
            w
          ]
        };
      });
    }, at = (q, fe, w) => {
      var _a3, _b3;
      ((_a3 = g[q]) == null ? void 0 : _a3.includes(w)) && ((_b3 = de[q]) == null ? void 0 : _b3[fe]) === w && _e(q, fe, w), W((R) => {
        const K = R[q] ?? [], ne = K.includes(w), I = ne ? K.filter((te) => te !== w) : [
          ...K,
          w
        ];
        return ne && !mo(q, I, Z[q] ?? [], o) ? R : {
          ...R,
          [q]: I
        };
      });
    }, Ke = (q, fe) => {
      le((w) => {
        const R = w[q] ?? [], K = R.includes(fe) ? R.filter((ne) => ne !== fe) : [
          ...R,
          fe
        ];
        return mo(q, g[q] ?? [], K, o) ? {
          ...w,
          [q]: K
        } : w;
      });
    }, vt = S ? S.mapPool.filter((q) => {
      var _a3, _b3;
      const fe = sn.find((w) => w.maps.some((R) => R.id === q.id));
      return fe && ((_a3 = Z[S.id]) == null ? void 0 : _a3.includes(fe.id)) && ((_b3 = g[S.id]) == null ? void 0 : _b3.includes(q.id));
    }).map((q) => q.id) : [], Ta = S ? Object.entries(de[S.id] ?? {}).filter(([q, fe]) => {
      var _a3;
      return ((_a3 = Z[S.id]) == null ? void 0 : _a3.includes(q)) && vt.includes(fe);
    }) : [], ua = Object.fromEntries(Ta), oa = Object.values(ua), It = S ? oa.map((q) => {
      var _a3;
      return (_a3 = S.mapPool.find((fe) => fe.id === q)) == null ? void 0 : _a3.name;
    }).filter(Boolean).join(", ") : "", cn = F === "pick" ? J : (_a2 = Pm.find((q) => q.id === F)) == null ? void 0 : _a2.label, za = (S == null ? void 0 : S.format) === "team" ? `${S.name} - ${se.map((q) => `${q}v${q}`).join(" or ")}` : S == null ? void 0 : S.name;
    return C.useEffect(() => {
      if (!c.queueStartedAt || c.queueStatus !== "searching") return;
      const q = window.setInterval(() => {
        E(Math.floor((Date.now() - new Date(c.queueStartedAt ?? Date.now()).getTime()) / 1e3));
      }, 1e3);
      return () => window.clearInterval(q);
    }, [
      c.queueStartedAt,
      c.queueStatus
    ]), C.useEffect(() => {
      Xb(o, x, g, Z);
    }, [
      Z,
      o,
      g,
      x
    ]), C.useEffect(() => {
      if (!L || !S) return;
      const q = window.setTimeout(() => {
        r({
          ...S,
          findAnyone: V,
          teamSizes: S.format === "team" ? se : void 0,
          mapPool: S.mapPool.filter((fe) => vt.includes(fe.id)),
          mapPreferences: {
            enabledGroupIds: Z[S.id] ?? [],
            favoriteMapIds: ua
          },
          mapCatalogVersion: Nt.version,
          favoriteMapId: oa[0],
          civilizationPreference: {
            mode: F,
            civilization: F === "pick" ? J : void 0,
            ...be
          }
        });
      }, 250);
      return () => window.clearTimeout(q);
    }, [
      J,
      je,
      F,
      Z,
      de,
      V,
      L,
      Ee,
      g,
      S,
      se
    ]), [
      "creating_lobby",
      "waiting_for_opponent",
      "verifying_lobby",
      "ready"
    ].includes(c.queueStatus) ? i.jsx(Ob, {}) : c.queueStatus === "in_game" || c.queueStatus === "verifying_result" ? i.jsx(Lb, {}) : c.queueStatus === "completed" ? i.jsx(Bb, {}) : i.jsxs("section", {
      className: "stack queue-page",
      children: [
        S && i.jsxs("div", {
          className: "search-waiting-layout matchmaking-overview",
          children: [
            i.jsx("div", {
              className: "search-state",
              children: L ? i.jsxs(i.Fragment, {
                children: [
                  i.jsx("div", {
                    className: "search-orbit",
                    children: i.jsx(Ds, {
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
                              S.format === "team" ? "team " : "",
                              "rating"
                            ]
                          }),
                          i.jsx("strong", {
                            children: S.format === "team" ? c.currentUser.teamRating : c.currentUser.rating
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Current search range"
                          }),
                          i.jsx("strong", {
                            children: V ? "Anyone" : `${c.searchRange.min}-${c.searchRange.max}`
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Time searching"
                          }),
                          i.jsx("strong", {
                            children: Qb(y)
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
                              (_b2 = c.selectedQueue) == null ? void 0 : _b2.estimatedWaitSeconds,
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
                        checked: V,
                        onChange: (q) => _(q.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => void m(),
                    children: [
                      i.jsx(sh, {
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
                          i.jsx(Ds, {
                            size: 18
                          }),
                          i.jsx("strong", {
                            children: S.playersSearching
                          }),
                          " searching"
                        ]
                      }),
                      i.jsxs("span", {
                        children: [
                          i.jsx(py, {
                            size: 18
                          }),
                          i.jsxs("strong", {
                            children: [
                              "~",
                              S.estimatedWaitSeconds,
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
                            children: cn
                          })
                        ]
                      }),
                      F !== "mirror" && i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Prefer Random"
                          }),
                          i.jsx("strong", {
                            children: Ee ? "Yes" : "No"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Maps enabled"
                          }),
                          i.jsx("strong", {
                            children: vt.length
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Favorites"
                          }),
                          i.jsx("strong", {
                            children: It || "None"
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
                        checked: V,
                        onChange: (q) => _(q.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "queue-search-button",
                    type: "button",
                    disabled: !G || vt.length === 0,
                    onClick: () => void f({
                      ...S,
                      findAnyone: V,
                      teamSizes: S.format === "team" ? se : void 0,
                      mapPool: S.mapPool.filter((q) => vt.includes(q.id)),
                      mapPreferences: {
                        enabledGroupIds: Z[S.id] ?? [],
                        favoriteMapIds: ua
                      },
                      mapCatalogVersion: Nt.version,
                      favoriteMapId: oa[0],
                      civilizationPreference: {
                        mode: F,
                        civilization: F === "pick" ? J : void 0,
                        ...be
                      }
                    }),
                    children: [
                      i.jsx(Ds, {
                        size: 22
                      }),
                      " ",
                      c.gameStatus === "loading" ? "Launching AoE2\u2026" : "Find Match"
                    ]
                  })
                ]
              })
            }),
            i.jsx(Ah, {})
          ]
        }),
        S ? i.jsx(i.Fragment, {
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
                        children: o.map((q) => {
                          const fe = q.id === "team-games", w = fe ? fi : vo;
                          return i.jsxs("button", {
                            className: S.id === q.id ? "civilization-mode active" : "civilization-mode",
                            type: "button",
                            "aria-pressed": S.id === q.id,
                            disabled: L || Y,
                            onClick: () => p(q.id),
                            children: [
                              i.jsx(w, {
                                size: 20
                              }),
                              i.jsxs("span", {
                                children: [
                                  i.jsx("strong", {
                                    children: fe ? "Team vs Team" : "1v1"
                                  }),
                                  i.jsx("small", {
                                    children: q.ruleset
                                  })
                                ]
                              })
                            ]
                          }, q.id);
                        })
                      }),
                      S.format === "team" && i.jsxs(i.Fragment, {
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
                            ].map((q) => {
                              const fe = se.includes(q);
                              return i.jsxs("button", {
                                className: fe ? "civilization-mode active" : "civilization-mode",
                                type: "button",
                                "aria-pressed": fe,
                                disabled: L || Y,
                                onClick: () => X((w) => w.includes(q) ? w.length === 1 ? w : w.filter((R) => R !== q) : [
                                  ...w,
                                  q
                                ].sort()),
                                children: [
                                  i.jsx(fi, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsxs("strong", {
                                        children: [
                                          q,
                                          "v",
                                          q
                                        ]
                                      }),
                                      i.jsxs("small", {
                                        children: [
                                          q * 2,
                                          " players"
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              }, q);
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
                        children: Pm.map((q) => {
                          const fe = q.icon;
                          return i.jsxs("div", {
                            className: F === q.id || Ee && F === "pick" && q.id === "random" ? "civilization-option-card active" : "civilization-option-card",
                            children: [
                              i.jsxs("button", {
                                className: "civilization-mode-choice",
                                type: "button",
                                "aria-pressed": F === q.id || Ee && F === "pick" && q.id === "random",
                                disabled: Y,
                                onClick: () => P(q.id),
                                children: [
                                  i.jsx(fe, {
                                    size: 20
                                  }),
                                  i.jsxs("span", {
                                    children: [
                                      i.jsx("strong", {
                                        children: q.label
                                      }),
                                      q.detail && i.jsx("small", {
                                        children: q.detail
                                      })
                                    ]
                                  })
                                ]
                              }),
                              q.id === "pick" && i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx(Ra, {
                                    className: "civilization-select",
                                    label: "Civilization",
                                    options: Ls.map((w) => ({
                                      value: w,
                                      label: w
                                    })),
                                    value: J,
                                    onChange: ie,
                                    disabled: Y || F !== "pick",
                                    searchable: true,
                                    displayValue: F === "pick" ? void 0 : "N/A"
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-select-activate",
                                    type: "button",
                                    "aria-label": `Choose ${J}`,
                                    disabled: Y,
                                    onClick: () => P("pick")
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-card-settings",
                                    type: "button",
                                    "aria-label": "Configure chosen civilization behavior",
                                    disabled: Y,
                                    onClick: () => he(true),
                                    children: i.jsx(uo, {
                                      size: 17
                                    })
                                  })
                                ]
                              }),
                              q.id === "random" && i.jsx("button", {
                                className: "civilization-card-settings",
                                type: "button",
                                "aria-label": "Configure random civilization bans",
                                disabled: Y,
                                onClick: () => D(true),
                                children: i.jsx(uo, {
                                  size: 17
                                })
                              })
                            ]
                          }, q.id);
                        })
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "preference-section map-preference-section",
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
                              vt.length,
                              " maps across ",
                              ((_c = Z[S.id]) == null ? void 0 : _c.length) ?? 0,
                              " groups"
                            ]
                          })
                        ]
                      }),
                      i.jsx(Hb, {
                        groups: sn,
                        enabledGroupIds: Z[S.id] ?? [],
                        selectedMapIds: g[S.id] ?? [],
                        favoriteMapIds: de[S.id] ?? {},
                        onToggleGroup: (q) => Ke(S.id, q),
                        onToggleMap: (q, fe) => at(S.id, q, fe),
                        onFavorite: (q, fe) => _e(S.id, q, fe),
                        disabled: Y
                      })
                    ]
                  })
                ]
              }, S.id),
              false
            ]
          })
        }) : i.jsx("div", {
          className: "empty-state",
          children: "No matchmaking modes are available."
        }),
        j && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "civ-ban-title",
          onMouseDown: () => D(false),
          children: i.jsxs("div", {
            className: "match-modal civilization-ban-modal",
            onMouseDown: (q) => q.stopPropagation(),
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
              i.jsx(Ra, {
                className: "civilization-ban-map-select",
                label: "Map style",
                options: [
                  {
                    value: "open",
                    label: `Open land maps (${je.open.length}/5 banned)`
                  },
                  {
                    value: "closed",
                    label: `Closed land maps (${je.closed.length}/5 banned)`
                  }
                ],
                value: Ae,
                onChange: (q) => v(q)
              }),
              i.jsx(Yb, {
                title: Ae === "open" ? "Open land maps" : "Closed land maps",
                selected: je[Ae],
                onToggle: (q) => ye(Ae, q)
              }),
              i.jsxs("div", {
                className: "modal-actions",
                children: [
                  i.jsx("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => {
                      const q = {
                        open: [],
                        closed: []
                      };
                      $(q), B(F, J, q);
                    },
                    children: "Clear bans"
                  }),
                  i.jsx("button", {
                    className: "primary",
                    type: "button",
                    onClick: () => D(false),
                    children: "Done"
                  })
                ]
              })
            ]
          })
        }),
        ee && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "prefer-random-title",
          onMouseDown: () => he(false),
          children: i.jsxs("div", {
            className: "match-modal prefer-random-modal",
            onMouseDown: (q) => q.stopPropagation(),
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
                    checked: Ee,
                    onChange: (q) => {
                      const fe = q.target.checked, w = fe ? "pick" : F;
                      Me(fe), fe && k("pick"), window.localStorage.setItem(hl, JSON.stringify({
                        mode: w,
                        civilization: J,
                        preferRandom: fe,
                        openLandBans: je.open,
                        closedLandBans: je.closed
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
                onClick: () => he(false),
                children: "Done"
              })
            ]
          })
        })
      ]
    });
  }
  function Yb({ title: c, selected: o, onToggle: f }) {
    return i.jsxs("section", {
      className: "civilization-ban-group",
      children: [
        i.jsxs("div", {
          className: "civilization-ban-group-heading",
          children: [
            i.jsx("strong", {
              children: c
            }),
            i.jsxs("span", {
              children: [
                o.length,
                "/5 selected"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "civilization-ban-grid",
          children: Ls.map((r) => {
            const m = o.includes(r);
            return i.jsxs("label", {
              className: m ? "selected" : "",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: m,
                  disabled: !m && o.length >= 5,
                  onChange: () => f(r)
                }),
                i.jsx("span", {
                  children: r
                })
              ]
            }, r);
          })
        })
      ]
    });
  }
  function Qb(c) {
    return `${String(Math.floor(c / 60)).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`;
  }
  function wo() {
    try {
      const c = JSON.parse(window.localStorage.getItem(Eh) ?? "{}");
      return c && typeof c == "object" ? c : {
        version: 1
      };
    } catch {
      return {
        version: 1
      };
    }
  }
  function Vb(c) {
    var _a2, _b2, _c, _d;
    const o = wo(), f = {}, r = {};
    for (const m of c) {
      const y = new Set(((_b2 = (_a2 = o.queues) == null ? void 0 : _a2[m.id]) == null ? void 0 : _b2.deselectedMapIds) ?? []), E = new Set(((_d = (_c = o.queues) == null ? void 0 : _c[m.id]) == null ? void 0 : _d.disabledGroupIds) ?? []);
      if (f[m.id] = m.mapPool.map((A) => A.id).filter((A) => !y.has(A)), r[m.id] = sn.map((A) => A.id).filter((A) => !E.has(A)), !mo(m.id, f[m.id], r[m.id], c)) {
        const A = m.mapPool[0], x = sn.find((p) => p.maps.some((S) => S.id === (A == null ? void 0 : A.id)));
        A && x && (f[m.id] = [
          .../* @__PURE__ */ new Set([
            ...f[m.id],
            A.id
          ])
        ], r[m.id] = [
          .../* @__PURE__ */ new Set([
            ...r[m.id],
            x.id
          ])
        ]);
      }
    }
    return {
      selectedMaps: f,
      enabledGroups: r
    };
  }
  function mo(c, o, f, r) {
    var _a2;
    const m = new Set(((_a2 = r.find((E) => E.id === c)) == null ? void 0 : _a2.mapPool.map((E) => E.id)) ?? []), y = new Set(sn.filter((E) => f.includes(E.id)).flatMap((E) => E.maps.map((A) => A.id)));
    return o.some((E) => m.has(E) && y.has(E));
  }
  function Xb(c, o, f, r) {
    var _a2;
    const m = wo(), y = {
      ...m.queues ?? {}
    };
    for (const E of c) {
      const A = new Set(E.mapPool.map((L) => L.id)), x = new Set(sn.map((L) => L.id)), p = (_a2 = m.queues) == null ? void 0 : _a2[E.id], S = ((p == null ? void 0 : p.deselectedMapIds) ?? []).filter((L) => !A.has(L)), G = ((p == null ? void 0 : p.disabledGroupIds) ?? []).filter((L) => !x.has(L));
      y[E.id] = {
        deselectedMapIds: [
          .../* @__PURE__ */ new Set([
            ...S,
            ...E.mapPool.map((L) => L.id).filter((L) => !(f[E.id] ?? []).includes(L))
          ])
        ],
        disabledGroupIds: [
          .../* @__PURE__ */ new Set([
            ...G,
            ...sn.map((L) => L.id).filter((L) => !(r[E.id] ?? []).includes(L))
          ])
        ]
      };
    }
    window.localStorage.setItem(Eh, JSON.stringify({
      version: 1,
      selectedQueueId: o,
      queues: y
    }));
  }
  const tt = {
    async list() {
      return xe ? zs : (await Ce.request("/custom-lobbies")).rooms;
    },
    async create(c) {
      return xe ? {
        ...zs[0],
        id: "preview-created",
        name: c.name,
        maxPlayers: c.maxPlayers
      } : (await Ce.request("/custom-lobbies", {
        method: "POST",
        body: {
          name: c.name,
          maxPlayers: c.maxPlayers,
          map: eh(c.map),
          dataMod: eh(c.dataMod)
        }
      })).room;
    },
    async join(c) {
      return xe ? zs.find((o) => o.id === c) ?? zs[0] : (await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/join`, {
        method: "POST"
      })).room;
    },
    async leave(c) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/leave`, {
        method: "POST"
      });
    },
    async updatePlayer(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/player`, {
        method: "PATCH",
        body: o
      });
    },
    async sendMessage(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/messages`, {
        method: "POST",
        body: {
          text: o
        }
      });
    },
    async kick(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/players/${encodeURIComponent(o)}`, {
        method: "DELETE"
      });
    },
    async start(c) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/start`, {
        method: "POST"
      });
    },
    async publish(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/publish`, {
        method: "POST",
        body: {
          platformLobbyId: o
        }
      });
    },
    async reportJoined(c) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/joined`, {
        method: "POST"
      });
    },
    async reportAoeReady(c) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/aoe-ready`, {
        method: "POST"
      });
    },
    async completeStart(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/complete-start`, {
        method: "POST",
        body: {
          gameStartedAt: o
        }
      });
    },
    async finish(c) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/finish`, {
        method: "POST"
      });
    },
    async failStart(c, o) {
      xe || await Ce.request(`/custom-lobbies/${encodeURIComponent(c)}/fail-start`, {
        method: "POST",
        body: {
          error: o
        }
      });
    },
    onEvent(c) {
      return xe ? () => {
      } : Ce.onCustomLobbyEvent(c);
    }
  };
  function eh(c) {
    return c ? {
      id: c.id,
      name: c.name,
      gameName: c.gameName,
      kind: c.kind
    } : void 0;
  }
  const th = {
    maps: [],
    dataMods: [],
    scannedRoots: [],
    scannedAt: (/* @__PURE__ */ new Date(0)).toISOString()
  };
  function Zb() {
    const { state: c, notify: o, ensureAoe2Ready: f } = St(), [r, m] = C.useState([]), [y, E] = C.useState(th), [A, x] = C.useState(true), [p, S] = C.useState(true), [G, L] = C.useState(false), [Y, g] = C.useState(`${c.currentUser.displayName}'s Lobby`), [W, Z] = C.useState("map"), [le, de] = C.useState(""), [ce, se] = C.useState(""), [X, V] = C.useState(""), [_, F] = C.useState(8), [k, J] = C.useState(false), ae = r.find((D) => D.players.some((ee) => ee.id === c.currentUser.id));
    async function Ee() {
      x(true);
      try {
        m(await tt.list());
      } catch (D) {
        o("Custom lobbies could not be loaded.", "danger", {
          detail: qt(D)
        });
      } finally {
        x(false);
      }
    }
    async function Me() {
      var _a2;
      S(true);
      try {
        const D = await (((_a2 = window.electronApi) == null ? void 0 : _a2.scanLocalCustomContent()) ?? Promise.resolve(th));
        E(D), de((ee) => D.maps.some((he) => he.id === ee) ? ee : ""), se((ee) => D.maps.some((he) => he.id === ee) ? ee : ""), V((ee) => D.dataMods.some((he) => he.id === ee) ? ee : "");
      } catch (D) {
        o("Local content could not be scanned.", "danger", {
          detail: qt(D)
        });
      } finally {
        S(false);
      }
    }
    C.useEffect(() => (Ee(), Me(), tt.onEvent((D) => {
      m((ee) => ((D.closedRoomId ? ee.find((Ae) => Ae.id === D.closedRoomId && Ae.players.some((v) => v.id === c.currentUser.id)) : void 0) && D.closeReason && o("Custom lobby closed.", "warning", {
        detail: D.closeReason
      }), D.rooms));
    })), []);
    async function je() {
      J(true);
      try {
        const D = W === "map" ? le : ce;
        await tt.create({
          name: Y.trim(),
          maxPlayers: _,
          map: y.maps.find((ee) => ee.id === D),
          dataMod: y.dataMods.find((ee) => ee.id === X)
        }), L(false);
      } catch (D) {
        o("The lobby could not be created.", "danger", {
          detail: qt(D)
        });
      } finally {
        J(false);
      }
    }
    async function $() {
      await f("custom") && L(true);
    }
    async function j(D) {
      if (await f("custom")) {
        J(true);
        try {
          await tt.join(D);
        } catch (ee) {
          o("Could not join the lobby.", "danger", {
            detail: qt(ee)
          });
        } finally {
          J(false);
        }
      }
    }
    return ae ? i.jsx(Kb, {
      room: ae,
      currentPlayerId: c.currentUser.id,
      notify: o
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
              children: !G && i.jsxs("button", {
                className: "primary",
                type: "button",
                disabled: c.gameStatus === "loading",
                onClick: () => void $(),
                children: [
                  i.jsx(Ey, {
                    size: 17
                  }),
                  " ",
                  c.gameStatus === "loading" ? "Launching AoE2\u2026" : "Create Lobby"
                ]
              })
            })
          ]
        }),
        G && i.jsxs("article", {
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
                  onClick: () => void Me(),
                  disabled: p,
                  children: [
                    i.jsx(Dm, {
                      size: 16,
                      className: p ? "spin" : ""
                    }),
                    " ",
                    p ? "Scanning\u2026" : "Rescan Content"
                  ]
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Lobby name",
                i.jsx("input", {
                  value: Y,
                  maxLength: 64,
                  onChange: (D) => g(D.target.value)
                })
              ]
            }),
            i.jsx(Ra, {
              label: "Maximum players",
              value: String(_),
              onChange: (D) => F(Number(D)),
              options: Array.from({
                length: 7
              }, (D, ee) => {
                const he = ee + 2;
                return {
                  value: String(he),
                  label: `${he} players`
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
                      "aria-pressed": W === "map",
                      onClick: () => Z("map"),
                      children: "Map"
                    }),
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": W === "scenario",
                      onClick: () => Z("scenario"),
                      children: "Scenario"
                    })
                  ]
                })
              ]
            }),
            W === "map" ? i.jsx(no, {
              label: "Map",
              items: y.maps.filter((D) => D.kind === "map"),
              value: le,
              onChange: de
            }) : i.jsx(no, {
              label: "Scenario",
              items: y.maps.filter((D) => D.kind === "scenario"),
              value: ce,
              onChange: se
            }),
            i.jsx(no, {
              label: "Data mod (optional)",
              items: y.dataMods,
              value: X,
              onChange: V
            }),
            [
              ...y.maps,
              ...y.dataMods
            ].some((D) => !D.enabled) && i.jsx("small", {
              className: "custom-disabled-mod-hint",
              children: "Disabled mods must be enabled at the mods interface inside the game."
            }),
            i.jsxs("div", {
              className: "custom-scan-meta",
              children: [
                i.jsxs("span", {
                  children: [
                    y.maps.length,
                    " maps/scenarios"
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    y.dataMods.length,
                    " data mods"
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    y.scannedRoots.length,
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
                  disabled: !Y.trim() || !(W === "map" ? le : ce) || k,
                  onClick: () => void je(),
                  children: k ? "Creating\u2026" : "Create Lobby"
                }),
                i.jsx("button", {
                  className: "secondary large",
                  type: "button",
                  disabled: k,
                  onClick: () => L(false),
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
                onClick: () => void Ee(),
                disabled: A,
                children: [
                  i.jsx(Dm, {
                    size: 16,
                    className: A ? "spin" : ""
                  }),
                  " ",
                  A ? "Refreshing\u2026" : "Refresh Rooms"
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
                r.map((D) => {
                  var _a2, _b2, _c;
                  return i.jsxs("article", {
                    className: "custom-room-row",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: D.name
                          }),
                          i.jsxs("small", {
                            children: [
                              D.demo ? "Demo room \xB7 " : "",
                              "Hosted by ",
                              ((_a2 = D.players.find((ee) => ee.host)) == null ? void 0 : _a2.displayName) ?? "Unknown"
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: ((_b2 = D.map) == null ? void 0 : _b2.name) ?? "Standard map"
                          }),
                          i.jsx("small", {
                            children: ((_c = D.dataMod) == null ? void 0 : _c.name) ?? "No data mod"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "room-player-count",
                        children: [
                          i.jsx(fi, {
                            size: 16
                          }),
                          " ",
                          D.players.length,
                          "/",
                          D.maxPlayers
                        ]
                      }),
                      i.jsx("span", {
                        className: `custom-room-status ${D.status}`,
                        children: Jb(D.status)
                      }),
                      i.jsxs("button", {
                        className: "secondary",
                        type: "button",
                        disabled: D.status !== "open" || D.players.length >= D.maxPlayers || k || c.gameStatus === "loading",
                        onClick: () => void j(D.id),
                        children: [
                          i.jsx(uh, {
                            size: 16
                          }),
                          " ",
                          c.gameStatus === "loading" ? "Launching\u2026" : "Join"
                        ]
                      })
                    ]
                  }, D.id);
                }),
                !A && !r.length && i.jsx("div", {
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
  function no({ label: c, items: o, value: f, onChange: r }) {
    var _a2;
    const m = [
      ...o.filter((y) => y.enabled && !y.builtIn),
      ...o.filter((y) => !y.enabled && !y.builtIn),
      ...o.filter((y) => y.builtIn)
    ];
    return i.jsxs("div", {
      children: [
        i.jsx(Ra, {
          label: c,
          value: f,
          onChange: r,
          options: [
            {
              value: "",
              label: `Choose ${c.toLowerCase()}\u2026`
            },
            ...m.map((y) => ({
              value: y.id,
              label: `${y.name}${y.enabled ? "" : ` \u2014 Disabled (${y.modName ?? "enable in AoE2 Mods"})`}`,
              disabled: !y.enabled
            }))
          ]
        }),
        f && i.jsx("small", {
          children: (_a2 = o.find((y) => y.id === f)) == null ? void 0 : _a2.source
        })
      ]
    });
  }
  function Kb({ room: c, currentPlayerId: o, notify: f }) {
    var _a2, _b2, _c;
    const [r, m] = C.useState(""), y = C.useRef(/* @__PURE__ */ new Set()), E = C.useRef(false), A = c.players.find((g) => g.id === o), x = c.hostId === o, p = C.useMemo(() => Array.from({
      length: c.maxPlayers
    }, (g, W) => c.players.find((Z) => Z.slot === W + 1)), [
      c
    ]), S = (g) => void g.catch((W) => f("Lobby update failed.", "danger", {
      detail: qt(W)
    }));
    C.useEffect(() => () => {
      var _a3, _b3;
      (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), (_b3 = window.electronApi) == null ? void 0 : _b3.stopReplayEndDetection();
    }, [
      c.id
    ]), C.useEffect(() => {
      if (c.status === "open") {
        y.current.clear();
        return;
      }
      if (c.status !== "launching" || !window.electronApi) return;
      const g = c.map, W = `${c.id}:host-setup`;
      if (x && !c.platformLobbyId && !y.current.has(W)) {
        y.current.add(W), (async () => {
          try {
            if (!g) throw new Error("Choose a map or scenario before starting.");
            await G();
            const _ = await window.electronApi.runAoe2CreateLobbySequence(g.gameName, c.maxPlayers, g.kind === "scenario" ? "scenario" : "map", "custom");
            if (!_.sent || !_.lobbyUri) throw new Error(_.message || "AoE2 lobby creation failed.");
            await tt.publish(c.id, _.lobbyUri);
          } catch (_) {
            await tt.failStart(c.id, qt(_)), y.current.delete(W);
          }
        })();
        return;
      }
      const Z = `${c.id}:guest-join`;
      if (!x && c.platformLobbyId && !A.aoeJoined && !y.current.has(Z)) {
        y.current.add(Z), (async () => {
          try {
            if (!(await window.electronApi.openAoe2Lobby(c.platformLobbyId)).opened) throw new Error("AoE2 did not open the custom lobby.");
            (g == null ? void 0 : g.kind) !== "scenario" && await L(A), await tt.reportJoined(c.id);
          } catch (_) {
            f("Could not join the AoE2 lobby.", "danger", {
              detail: qt(_),
              durationMs: null
            }), y.current.delete(Z);
          }
        })();
        return;
      }
      const le = c.players.find((_) => _.host), de = `${c.id}:guest-ready`;
      if (!x && A.aoeJoined && (le == null ? void 0 : le.aoeReady) && !A.aoeReady && !y.current.has(de)) {
        y.current.add(de), (async () => {
          try {
            const _ = Date.now() + Qe.customMapTransferTimeoutMs;
            let F = false, k;
            do
              await new Promise((J) => window.setTimeout(J, Qe.customMapTransferPollMs)), k = await window.electronApi.runAoe2LobbyCursorAction("guest-ready", "custom"), !k.sent && !F && (F = true, await window.electronApi.runAoe2LobbyCursorAction("content-confirm", "custom"));
            while (!k.sent && Date.now() < _);
            if (!k.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
            await tt.reportAoeReady(c.id);
          } catch (_) {
            f("Could not ready in the AoE2 lobby.", "danger", {
              detail: qt(_),
              durationMs: null
            }), y.current.delete(de);
          }
        })();
        return;
      }
      const ce = c.players.filter((_) => !_.host).every((_) => _.aoeJoined), se = `${c.id}:host-ready`;
      if (x && c.platformLobbyId && ce && !A.aoeReady && !y.current.has(se)) {
        y.current.add(se), (async () => {
          try {
            (g == null ? void 0 : g.kind) !== "scenario" && await L(A);
            const _ = await window.electronApi.runAoe2LobbyCursorAction("host-ready", "custom");
            if (!_.sent) throw new Error(_.message || "AoE2 could not ready the host.");
            await tt.reportAoeReady(c.id);
          } catch (_) {
            await tt.failStart(c.id, qt(_)), y.current.delete(se);
          }
        })();
        return;
      }
      const X = c.players.every((_) => _.aoeReady), V = `${c.id}:aoe-start`;
      x && X && !y.current.has(V) && (y.current.add(V), (async () => {
        try {
          const _ = await window.electronApi.runAoe2LobbyCursorAction("start", "custom");
          if (!_.sent) throw new Error(_.message || "AoE2 could not start the game.");
          await tt.completeStart(c.id, new Date(Date.now() - Qe.startGameSettleMs).toISOString());
        } catch (_) {
          await tt.failStart(c.id, qt(_)), y.current.delete(V);
        }
      })());
    }, [
      c,
      x,
      A,
      f
    ]), C.useEffect(() => {
      if (c.status !== "started" || !window.electronApi) return;
      const g = `${c.id}:reveal-game`;
      if (y.current.has(g)) return;
      y.current.add(g), window.electronApi.startReplayEndDetection().then((Z) => {
        Z.started || f("Post-game return detection could not be started.", "danger", {
          detail: Z.message || "Replay detection could not be started."
        });
      }).catch((Z) => {
        f("Post-game return detection could not be started.", "danger", {
          detail: qt(Z)
        });
      });
      const W = window.setTimeout(() => {
        (async () => {
          try {
            await ro(), await window.electronApi.focusAoe2();
          } catch (Z) {
            f("Post-game return detection could not be started.", "danger", {
              detail: qt(Z)
            });
          } finally {
            await window.electronApi.setLobbyInputLock(false);
          }
        })();
      }, Qe.revealAfterStartMs);
      return () => window.clearTimeout(W);
    }, [
      c.id,
      c.status
    ]), C.useEffect(() => {
      if (!(c.status !== "started" || !window.electronApi)) return window.electronApi.onReplayEnded((g) => {
        E.current || (E.current = true, wv(g).then(async (W) => {
          if (!W) {
            E.current = false;
            return;
          }
          await window.electronApi.confirmReplayEnded(), await tt.finish(c.id);
        }).catch((W) => {
          E.current = false, f("The finished custom game could not be detected.", "danger", {
            detail: qt(W)
          });
        }));
      });
    }, [
      c.id,
      c.status,
      f
    ]);
    async function G() {
      if ((await window.electronApi.detectAoe2Process()).running) return;
      const W = await window.electronApi.launchAoe2();
      if (!W.launched) throw new Error(W.message || "AoE2 could not be launched.");
      const Z = Date.now() + 45e3;
      for (; Date.now() < Z; ) if (await new Promise((le) => window.setTimeout(le, 1e3)), (await window.electronApi.detectAoe2Process()).windowReady) return;
      throw new Error("AoE2 did not become ready in time.");
    }
    async function L(g) {
      const W = await window.electronApi.selectAoe2Civilization(g.civilization, g.slot, "custom");
      if (!W.sent) throw new Error(W.message);
      if (g.team === 1 || g.team === 2) {
        const Z = await window.electronApi.selectAoe2Team(g.team, g.slot, "custom");
        if (!Z.sent) throw new Error(Z.message);
      }
    }
    function Y(g) {
      g.preventDefault(), r.trim() && (S(tt.sendMessage(c.id, r.trim())), m(""));
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
                  children: c.name
                }),
                i.jsxs("p", {
                  children: [
                    c.players.length,
                    "/",
                    c.maxPlayers,
                    " players \xB7 ",
                    ((_a2 = c.map) == null ? void 0 : _a2.name) ?? "Standard map",
                    " \xB7 ",
                    ((_b2 = c.dataMod) == null ? void 0 : _b2.name) ?? "No data mod"
                  ]
                })
              ]
            }),
            i.jsxs("button", {
              className: "secondary",
              type: "button",
              onClick: () => S(tt.leave(c.id)),
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
                ((_c = c.map) == null ? void 0 : _c.kind) === "scenario" && i.jsx("p", {
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
                p.map((g, W) => {
                  var _a3;
                  return i.jsxs("div", {
                    className: g ? "lobby-player-row occupied" : "lobby-player-row",
                    children: [
                      i.jsxs("div", {
                        className: "lobby-player-name",
                        children: [
                          i.jsx("span", {
                            className: "lobby-slot-number",
                            children: W + 1
                          }),
                          g ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsx(Cy, {
                                size: 17
                              }),
                              i.jsx("strong", {
                                children: g.displayName
                              }),
                              g.host && i.jsx(yy, {
                                size: 15
                              }),
                              " ",
                              x && !g.host && i.jsx("button", {
                                className: "lobby-kick",
                                "aria-label": `Remove ${g.displayName}`,
                                onClick: () => S(tt.kick(c.id, g.id)),
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
                      g && ((_a3 = c.map) == null ? void 0 : _a3.kind) === "scenario" ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("span", {
                            children: "Scenario"
                          }),
                          i.jsx("span", {
                            children: "Scenario-defined"
                          }),
                          g.id === o ? i.jsxs("button", {
                            className: g.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => S(tt.updatePlayer(c.id, {
                              ready: !g.ready
                            })),
                            children: [
                              g.ready && i.jsx(ks, {
                                size: 16
                              }),
                              g.ready ? "Ready" : "Not ready"
                            ]
                          }) : i.jsx("span", {
                            className: g.ready ? "success" : "",
                            children: g.ready ? "Ready" : "Not ready"
                          })
                        ]
                      }) : g && (g.id === o ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx(Ra, {
                            className: "lobby-inline-select",
                            label: "Team",
                            value: String(g.team),
                            onChange: (Z) => S(tt.updatePlayer(c.id, {
                              team: Number(Z)
                            })),
                            options: [
                              {
                                value: "0",
                                label: "\u2014"
                              },
                              ...[
                                1,
                                2,
                                3,
                                4
                              ].map((Z) => ({
                                value: String(Z),
                                label: `Team ${Z}`
                              }))
                            ]
                          }),
                          i.jsx(Ra, {
                            className: "lobby-inline-select",
                            label: "Civilization",
                            value: g.civilization,
                            onChange: (Z) => S(tt.updatePlayer(c.id, {
                              civilization: Z
                            })),
                            options: [
                              "Random",
                              ...Ls
                            ].map((Z) => ({
                              value: Z,
                              label: Z
                            }))
                          }),
                          i.jsxs("button", {
                            className: g.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => S(tt.updatePlayer(c.id, {
                              ready: !g.ready
                            })),
                            children: [
                              g.ready && i.jsx(ks, {
                                size: 16
                              }),
                              g.ready ? "Ready" : "Not ready"
                            ]
                          })
                        ]
                      }) : i.jsxs(i.Fragment, {
                        children: [
                          i.jsxs("span", {
                            children: [
                              "Team ",
                              g.team || "\u2014"
                            ]
                          }),
                          i.jsx("span", {
                            children: g.civilization
                          }),
                          i.jsx("span", {
                            className: g.ready ? "success" : "",
                            children: g.ready ? "Ready" : "Not ready"
                          })
                        ]
                      }))
                    ]
                  }, W);
                })
              ]
            }),
            i.jsxs("aside", {
              className: "panel lobby-chat",
              children: [
                i.jsxs("div", {
                  className: "lobby-chat-title",
                  children: [
                    i.jsx(My, {
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
                  children: c.messages.map((g) => i.jsxs("p", {
                    className: g.system ? "system" : "",
                    children: [
                      i.jsx("strong", {
                        children: g.author
                      }),
                      i.jsx("span", {
                        children: g.text
                      })
                    ]
                  }, g.id))
                }),
                i.jsxs("form", {
                  onSubmit: Y,
                  children: [
                    i.jsx("input", {
                      placeholder: "Message lobby\u2026",
                      value: r,
                      onChange: (g) => m(g.target.value)
                    }),
                    i.jsx("button", {
                      className: "primary",
                      "aria-label": "Send",
                      children: i.jsx(yo, {
                        size: 17
                      })
                    })
                  ]
                })
              ]
            })
          ]
        }),
        i.jsxs("div", {
          className: `custom-lobby-actions${c.status !== "open" ? " launching" : ""}`,
          children: [
            i.jsx("span", {
              children: c.status === "started" ? i.jsx(Fb, {
                startedAt: c.gameStartedAt
              }) : c.status === "launching" ? i.jsxs(i.Fragment, {
                children: [
                  "Creating and synchronizing the AoE2 lobby",
                  i.jsx(ho, {})
                ]
              }) : c.automationError ? c.automationError : c.players.every((g) => g.ready) ? "All players are ready." : "Waiting for players to ready up."
            }),
            x && i.jsx("button", {
              className: "primary large",
              disabled: c.status !== "open" || !c.map || !c.players.every((g) => g.ready),
              onClick: () => S(tt.start(c.id)),
              children: c.status !== "open" ? i.jsxs(i.Fragment, {
                children: [
                  "Starting",
                  i.jsx(ho, {})
                ]
              }) : "Start Game"
            })
          ]
        })
      ]
    });
  }
  function qt(c) {
    return c instanceof Error ? c.message : "An unexpected error occurred.";
  }
  function Jb(c) {
    return c === "open" ? "Open" : c === "launching" ? "Starting" : "In Game";
  }
  function ho() {
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
  function Fb({ startedAt: c }) {
    const [o, f] = C.useState(() => ah(c));
    return C.useEffect(() => {
      const r = () => f(ah(c));
      r();
      const m = window.setInterval(r, 100);
      return () => window.clearInterval(m);
    }, [
      c
    ]), o > 0 ? i.jsxs("span", {
      className: "custom-game-countdown-label",
      "aria-live": "polite",
      children: [
        "Game starts in ",
        i.jsx("strong", {
          className: "custom-game-countdown",
          children: o
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        "Entering game",
        i.jsx(ho, {})
      ]
    });
  }
  function ah(c) {
    if (!c) return 5;
    const o = Math.max(0, Date.now() - new Date(c).getTime());
    return Math.max(0, Math.ceil((5e3 - o) / 1e3));
  }
  function $b() {
    const { state: c, openPlayerProfile: o } = St(), [f, r] = C.useState(""), [m, y] = C.useState("all"), E = C.useMemo(() => c.recentMatches.filter((A) => {
      const x = `${A.opponent} ${A.map} ${A.civilization} ${A.opponentCivilization}`.toLowerCase().includes(f.toLowerCase()), p = m === "all" || A.outcome === m;
      return x && p;
    }), [
      m,
      f,
      c.recentMatches
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
                  onChange: (A) => r(A.target.value),
                  placeholder: "Opponent, map, civilization"
                })
              ]
            }),
            i.jsx(Ra, {
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
              onChange: y
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
              E.map((A) => i.jsxs("div", {
                className: "table-row clickable",
                children: [
                  i.jsx("strong", {
                    className: A.outcome,
                    children: A.outcome
                  }),
                  i.jsxs("button", {
                    className: "player-link",
                    type: "button",
                    onClick: () => o(A.opponentId),
                    children: [
                      A.opponent,
                      " (",
                      A.opponentRating,
                      ")"
                    ]
                  }),
                  i.jsx("span", {
                    children: A.map
                  }),
                  i.jsx("span", {
                    children: A.civilization && A.opponentCivilization ? `${A.civilization} vs. ${A.opponentCivilization}` : "\u2014"
                  }),
                  i.jsxs("span", {
                    className: A.ratingChange >= 0 ? "win" : "loss",
                    children: [
                      A.ratingChange > 0 ? "+" : "",
                      A.ratingChange
                    ]
                  }),
                  i.jsxs("span", {
                    children: [
                      A.durationMinutes,
                      "m"
                    ]
                  }),
                  i.jsx("span", {
                    children: new Date(A.timestamp).toLocaleDateString()
                  }),
                  i.jsx("span", {
                    children: A.verified ? "Verified" : "Pending"
                  })
                ]
              }, A.id)),
              E.length === 0 && i.jsx("div", {
                className: "empty-state",
                children: c.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."
              })
            ]
          })
        })
      ]
    });
  }
  const Ib = {
    async list(c = 1, o = "all") {
      if (xe) {
        const r = o === "all" ? Os : Os.filter((m) => m.division === o);
        return {
          players: r,
          page: c,
          pageSize: 100,
          total: r.length,
          division: o
        };
      }
      const f = new URLSearchParams({
        page: String(c),
        division: o
      });
      return Ce.request(`/leaderboard?${f}`);
    }
  };
  function Wb() {
    const { state: c, openPlayerProfile: o } = St(), [f, r] = C.useState(""), [m, y] = C.useState("all"), [E, A] = C.useState([]), [x, p] = C.useState(1), [S, G] = C.useState(0), [L, Y] = C.useState(true), [g, W] = C.useState(null);
    C.useEffect(() => {
      let V = false;
      return Y(true), W(null), Ib.list(x, m).then((_) => {
        V || (A(_.players), G(_.total));
      }).catch((_) => {
        V || W(_ instanceof Error ? _.message : "Leaderboard could not be loaded.");
      }).finally(() => {
        V || Y(false);
      }), () => {
        V = true;
      };
    }, [
      m,
      x
    ]);
    const Z = C.useMemo(() => E.filter((V) => V.displayName.toLowerCase().includes(f.toLowerCase())), [
      E,
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
      ].map((V) => ({
        value: V,
        label: `${V} (${ly(V)})`
      }))
    ], de = Math.max(1, Math.ceil(S / 100)), ce = S === 0 ? 0 : (x - 1) * 100 + 1, se = Math.min(x * 100, S), X = i.jsx(Pb, {
      page: x,
      totalPages: de,
      firstRank: ce,
      lastRank: se,
      total: S,
      loading: L,
      onPageChange: p
    });
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
                  onChange: (V) => r(V.target.value),
                  placeholder: "Player name"
                })
              ]
            }),
            i.jsx(Ra, {
              className: "division-field",
              label: "Division",
              options: le,
              value: m,
              onChange: (V) => {
                p(1), y(V);
              }
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("div", {
              className: "leaderboard-pagination-top",
              children: X
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
                Z.map((V) => i.jsxs("div", {
                  className: V.id === c.currentUser.id ? "leader-row current" : "leader-row",
                  children: [
                    i.jsxs("strong", {
                      children: [
                        "#",
                        V.rank
                      ]
                    }),
                    i.jsx("button", {
                      className: "player-link",
                      type: "button",
                      onClick: () => o(V.id),
                      children: V.displayName
                    }),
                    i.jsx("span", {
                      children: e0(V.countryCode)
                    }),
                    i.jsx("span", {
                      children: V.rating
                    }),
                    i.jsx("span", {
                      children: di(V.rating)
                    }),
                    i.jsx("span", {
                      children: V.wins
                    }),
                    i.jsx("span", {
                      children: V.losses
                    }),
                    i.jsxs("span", {
                      children: [
                        V.winRate,
                        "%"
                      ]
                    }),
                    i.jsx("span", {
                      children: V.streak > 0 ? `W${V.streak}` : V.streak < 0 ? `L${Math.abs(V.streak)}` : "\u2014"
                    })
                  ]
                }, V.id)),
                L && i.jsx("div", {
                  className: "empty-state",
                  children: "Loading leaderboard\u2026"
                }),
                !L && g && i.jsx("div", {
                  className: "empty-state",
                  children: g
                }),
                !L && !g && Z.length === 0 && i.jsx("div", {
                  className: "empty-state",
                  children: "No leaderboard results."
                })
              ]
            }),
            i.jsx("div", {
              className: "leaderboard-pagination-bottom",
              children: X
            })
          ]
        })
      ]
    });
  }
  function Pb({ page: c, totalPages: o, firstRank: f, lastRank: r, total: m, loading: y, onPageChange: E }) {
    const A = o <= 7 ? Array.from({
      length: o
    }, (x, p) => p + 1) : c <= 4 ? [
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      o
    ] : c >= o - 3 ? [
      1,
      "ellipsis",
      o - 4,
      o - 3,
      o - 2,
      o - 1,
      o
    ] : [
      1,
      "ellipsis",
      c - 1,
      c,
      c + 1,
      "ellipsis",
      o
    ];
    return i.jsxs("nav", {
      className: "leaderboard-pagination",
      "aria-label": "Leaderboard pages",
      children: [
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: y || c === 1,
          onClick: () => E(c - 1),
          children: "Previous"
        }),
        i.jsx("div", {
          className: "leaderboard-page-numbers",
          children: A.map((x, p) => x === "ellipsis" ? i.jsx("span", {
            className: "leaderboard-page-ellipsis",
            "aria-hidden": "true",
            children: "\u2026"
          }, `ellipsis-${p}`) : i.jsx("button", {
            className: "leaderboard-page-number",
            type: "button",
            "aria-current": x === c ? "page" : void 0,
            disabled: y,
            onClick: () => E(x),
            children: x
          }, x))
        }),
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: y || c >= o,
          onClick: () => E(c + 1),
          children: "Next"
        }),
        i.jsxs("span", {
          className: "leaderboard-page-status",
          children: [
            "Page ",
            c,
            " of ",
            o,
            m > 0 && i.jsxs("small", {
              children: [
                "Players ",
                f,
                "\u2013",
                r,
                " of ",
                m.toLocaleString()
              ]
            })
          ]
        })
      ]
    });
  }
  function e0(c) {
    const o = c == null ? void 0 : c.trim().toUpperCase();
    return o ? /^[A-Z]{2}$/.test(o) ? i.jsx("span", {
      className: `country-flag fi fi-${o.toLowerCase()}`,
      role: "img",
      "aria-label": `${o} flag`,
      title: o
    }) : o : "\u2014";
  }
  const t0 = {
    async getProfile(c) {
      return xe ? {
        player: Os.find((o) => o.id === c) ?? dt,
        matches: So
      } : Ce.request(`/players/${encodeURIComponent(c)}`);
    }
  };
  function a0(c, o) {
    const f = c.filter((y) => y.queueType !== "team-games").sort((y, E) => new Date(y.timestamp).getTime() - new Date(E.timestamp).getTime());
    if (f.length === 0) return [];
    let r = o - f.reduce((y, E) => y + E.ratingChange, 0);
    const m = [
      {
        id: "starting-rating",
        label: "Initial ELO",
        rating: r
      }
    ];
    for (const y of f) r += y.ratingChange, m.push({
      id: y.id,
      label: new Date(y.timestamp).toLocaleDateString(void 0, {
        month: "short",
        day: "numeric"
      }),
      rating: r
    });
    return m;
  }
  function n0({ matches: c, currentRating: o, possessive: f = "Your" }) {
    var _a2, _b2;
    const [r, m] = C.useState(null), y = a0(c, o);
    if (y.length === 0) return i.jsxs("div", {
      className: "empty-state",
      children: [
        f,
        " Elo progress will appear after the first 1v1 match."
      ]
    });
    const E = 800, A = 260, x = {
      top: 22,
      right: 22,
      bottom: 42,
      left: 58
    }, p = y.map((ae) => ae.rating), S = Math.min(...p), G = Math.max(...p), L = Math.floor((S - 20) / 25) * 25, Y = Math.ceil((G + 20) / 25) * 25, g = Math.max(Y - L, 1), W = E - x.left - x.right, Z = A - x.top - x.bottom, le = y.map((ae, Ee) => ({
      ...ae,
      x: x.left + Ee / Math.max(y.length - 1, 1) * W,
      y: x.top + (Y - ae.rating) / g * Z
    })), de = le.map((ae) => `${ae.x},${ae.y}`).join(" "), ce = `${x.left},${x.top + Z} ${de} ${x.left + W},${x.top + Z}`, se = Array.from({
      length: 5
    }, (ae, Ee) => {
      const Me = Ee / 4;
      return {
        y: x.top + Me * Z,
        rating: Math.round(Y - Me * g)
      };
    }), X = y.at(-1).rating - y[0].rating, V = le.find((ae) => ae.id === r), _ = 126, F = 44, k = V ? Math.min(Math.max(V.x - _ / 2, x.left), E - x.right - _) : 0, J = V ? V.y - F - 12 < 4 ? V.y + 12 : V.y - F - 12 : 0;
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("div", {
          className: "rating-chart-summary",
          children: [
            i.jsxs("span", {
              children: [
                y.length - 1,
                " recorded ",
                y.length === 2 ? "match" : "matches"
              ]
            }),
            i.jsxs("strong", {
              className: X >= 0 ? "win" : "loss",
              children: [
                X > 0 ? "+" : "",
                X,
                " Elo"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "rating-chart",
          role: "img",
          "aria-label": `Elo progress over ${y.length - 1} recorded matches, ending at ${o}`,
          children: i.jsxs("svg", {
            viewBox: `0 0 ${E} ${A}`,
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
              se.map((ae) => i.jsxs("g", {
                children: [
                  i.jsx("line", {
                    className: "rating-chart-grid",
                    x1: x.left,
                    x2: E - x.right,
                    y1: ae.y,
                    y2: ae.y
                  }),
                  i.jsx("text", {
                    className: "rating-chart-axis",
                    x: x.left - 10,
                    y: ae.y + 4,
                    textAnchor: "end",
                    children: ae.rating
                  })
                ]
              }, ae.y)),
              i.jsx("polygon", {
                className: "rating-chart-area",
                points: ce
              }),
              i.jsx("polyline", {
                className: "rating-chart-line",
                points: de
              }),
              le.map((ae) => i.jsxs("g", {
                className: "rating-chart-point-target",
                onPointerEnter: () => m(ae.id),
                onPointerLeave: () => m(null),
                children: [
                  i.jsx("circle", {
                    className: "rating-chart-hit-area",
                    cx: ae.x,
                    cy: ae.y,
                    r: "13"
                  }),
                  i.jsx("circle", {
                    className: "rating-chart-point",
                    cx: ae.x,
                    cy: ae.y,
                    r: r === ae.id ? 6 : 4
                  })
                ]
              }, ae.id)),
              V && i.jsxs("g", {
                className: "rating-chart-tooltip",
                transform: `translate(${k} ${J})`,
                children: [
                  i.jsx("rect", {
                    width: _,
                    height: F
                  }),
                  i.jsx("text", {
                    className: "rating-chart-tooltip-label",
                    x: "10",
                    y: "17",
                    children: V.label
                  }),
                  i.jsxs("text", {
                    className: "rating-chart-tooltip-value",
                    x: "10",
                    y: "34",
                    children: [
                      V.rating,
                      " Elo"
                    ]
                  })
                ]
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: x.left,
                y: A - 13,
                children: (_a2 = y[1]) == null ? void 0 : _a2.label
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: E - x.right,
                y: A - 13,
                textAnchor: "end",
                children: (_b2 = y.at(-1)) == null ? void 0 : _b2.label
              })
            ]
          })
        })
      ]
    });
  }
  function l0({ friendIds: c, outgoingRequestIds: o, onAddFriend: f }) {
    const { state: r, selectedProfileId: m } = St(), y = !m || m === r.currentUser.id, [E, A] = C.useState(null), [x, p] = C.useState(null), [S, G] = C.useState(false), [L, Y] = C.useState(false);
    if (C.useEffect(() => {
      if (Y(false), y) {
        A(null), p(null);
        return;
      }
      let se = false;
      return A(null), p(null), t0.getProfile(m).then((X) => {
        se || A(X);
      }).catch((X) => {
        se || p(X instanceof Error ? X.message : "Player profile could not be loaded.");
      }), () => {
        se = true;
      };
    }, [
      m,
      y
    ]), !y && !E) return i.jsx("div", {
      className: "panel empty-state",
      children: x ?? "Loading player profile\u2026"
    });
    const g = y ? r.currentUser : E.player, W = y ? r.recentMatches : E.matches, Z = W.slice(0, 5).map((se) => se.outcome), le = c.includes(g.id), de = L || o.includes(g.id);
    async function ce() {
      G(true);
      try {
        await f(g.displayName), Y(true);
      } finally {
        G(false);
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
              children: g.avatarUrl ? i.jsx("img", {
                src: g.avatarUrl,
                alt: ""
              }) : g.displayName.slice(0, 2).toUpperCase()
            }),
            i.jsx("h2", {
              children: g.displayName
            }),
            i.jsx("span", {
              children: g.steamId ? `Steam ID ${g.steamId}` : "Steam account"
            }),
            Z.length > 0 && i.jsx(lh, {
              form: Z
            }),
            !y && !le && i.jsx("button", {
              className: "primary profile-friend-button",
              type: "button",
              disabled: S || de,
              onClick: () => void ce(),
              children: de ? "Friend request sent" : S ? "Sending\u2026" : "Add friend"
            }),
            !y && le && i.jsx("span", {
              className: "profile-friend-status",
              children: "Friends"
            })
          ]
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(sa, {
              label: "1v1 RM Rating",
              value: g.rating,
              detail: `${g.legacy1v1Wins}-${g.legacy1v1Losses} legacy record`
            }),
            i.jsx(sa, {
              label: "1v1 RM Peak",
              value: g.peakRating
            }),
            i.jsx(sa, {
              label: "Team RM Rating",
              value: g.teamRating,
              detail: `${g.legacyTeamWins}-${g.legacyTeamLosses} legacy record`
            }),
            i.jsx(sa, {
              label: "Team RM Peak",
              value: g.teamPeakRating
            }),
            i.jsx(sa, {
              label: "Global Rank",
              value: `#${g.rank.toLocaleString()}`
            }),
            i.jsx(sa, {
              label: "Season Record",
              value: `${g.wins}-${g.losses}`
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel span-2",
          children: [
            i.jsx("h2", {
              children: "Elo Progress"
            }),
            i.jsx(n0, {
              matches: W,
              currentRating: g.rating,
              possessive: y ? "Your" : `${g.displayName}'s`
            })
          ]
        })
      ]
    });
  }
  function i0() {
    const { state: c, updateSettings: o, signOut: f } = St(), r = c.settings;
    return i.jsxs("section", {
      className: "settings-grid",
      children: [
        i.jsx(lo, {
          title: "Game",
          children: i.jsx(io, {
            label: "Launch AoE2 when Empire League starts",
            checked: r.launchAoe2OnStartup,
            onChange: (m) => o({
              launchAoe2OnStartup: m
            })
          })
        }),
        i.jsxs(lo, {
          title: "Matchmaking",
          children: [
            i.jsxs("label", {
              children: [
                "Preferred server region",
                i.jsx("input", {
                  value: r.serverRegion,
                  onChange: (m) => o({
                    serverRegion: m.target.value
                  })
                })
              ]
            }),
            i.jsx(io, {
              label: "Match-found notifications",
              helpText: "Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way.",
              checked: r.matchNotifications,
              onChange: (m) => o({
                matchNotifications: m
              })
            }),
            i.jsx(io, {
              label: "Automatically reject Family Share accounts",
              helpText: "Family Share accounts have a higher likelihood of being smurfs.",
              checked: r.autoRejectFamilySharing,
              onChange: (m) => o({
                autoRejectFamilySharing: m
              })
            }),
            i.jsxs("div", {
              children: [
                i.jsxs("span", {
                  className: "setting-label",
                  children: [
                    "Maximum 1v1 opponent rating below yours",
                    i.jsx(Ch, {
                      text: "This applies only to 1v1. Restricting lower-rated opponents may make matchmaking take longer."
                    })
                  ]
                }),
                i.jsx(Ra, {
                  label: "",
                  value: String(r.maximumLowerOpponentRatingGap),
                  onChange: (m) => o({
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
        i.jsxs(lo, {
          title: "Account",
          children: [
            i.jsxs("div", {
              className: "account-summary",
              children: [
                i.jsx("div", {
                  className: "avatar large-avatar",
                  children: c.currentUser.avatarUrl ? i.jsx("img", {
                    src: c.currentUser.avatarUrl,
                    alt: ""
                  }) : c.currentUser.displayName.slice(0, 2).toUpperCase()
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: c.currentUser.displayName
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
                  value: c.currentUser.displayName,
                  readOnly: true
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Steam ID64",
                i.jsx("input", {
                  value: c.currentUser.steamId ?? "Unavailable",
                  readOnly: true
                })
              ]
            }),
            i.jsxs("label", {
              children: [
                "Empire League player ID",
                i.jsx("input", {
                  value: c.currentUser.id,
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
  function lo({ title: c, children: o }) {
    return i.jsxs("div", {
      className: "panel settings-group",
      children: [
        i.jsx("h2", {
          children: c
        }),
        o
      ]
    });
  }
  function io({ label: c, helpText: o, checked: f, onChange: r }) {
    const m = C.useId();
    return i.jsxs("div", {
      className: "toggle-row",
      children: [
        i.jsxs("span", {
          className: "setting-label",
          children: [
            i.jsx("label", {
              htmlFor: m,
              children: c
            }),
            o && i.jsx(Ch, {
              text: o
            })
          ]
        }),
        i.jsx("input", {
          id: m,
          type: "checkbox",
          checked: f,
          onChange: (y) => r(y.target.checked)
        })
      ]
    });
  }
  function Ch({ text: c }) {
    const [o, f] = C.useState(false), r = C.useId();
    return i.jsxs("span", {
      className: "help-tooltip",
      "data-open": o || void 0,
      children: [
        i.jsx("button", {
          type: "button",
          className: "help-tooltip-trigger",
          "aria-label": "More information",
          "aria-describedby": r,
          "aria-expanded": o,
          onClick: () => f((m) => !m),
          children: i.jsx(my, {
            size: 16,
            "aria-hidden": "true"
          })
        }),
        i.jsx("span", {
          id: r,
          className: "help-tooltip-content",
          role: "tooltip",
          children: c
        })
      ]
    });
  }
  function s0({ friends: c, requests: o, onMessage: f, onAccept: r, onDecline: m, onInvite: y, onUnfriend: E }) {
    const [A, x] = C.useState(""), [p, S] = C.useState(""), [G, L] = C.useState(null), [Y, g] = C.useState(null), [W, Z] = C.useState(false), [le, de] = C.useState(null), [ce, se] = C.useState("all"), X = C.useMemo(() => c.filter((k) => {
      const J = k.name.toLowerCase().includes(A.trim().toLowerCase()), ae = ce === "all" || ce === "online" && k.presence !== "offline" || k.presence === "in_game";
      return J && ae;
    }), [
      ce,
      c,
      A
    ]);
    async function V(k) {
      k.preventDefault();
      const J = p.trim();
      if (J) {
        Z(true), g(null), L(null);
        try {
          const ae = await y(J);
          L(ae), S("");
        } catch (ae) {
          g(ae instanceof Error ? ae.message : "The invite could not be sent.");
        } finally {
          Z(false);
        }
      }
    }
    const _ = c.filter((k) => k.presence !== "offline").length, F = c.filter((k) => k.presence === "in_game").length;
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
                  className: ce === "all" ? "social-stat active" : "social-stat",
                  onClick: () => se("all"),
                  type: "button",
                  children: [
                    i.jsx(fi, {
                      size: 19
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: c.length
                        }),
                        " Friends"
                      ]
                    })
                  ]
                }),
                i.jsxs("button", {
                  className: ce === "online" ? "social-stat active" : "social-stat",
                  onClick: () => se("online"),
                  type: "button",
                  children: [
                    i.jsx("span", {
                      className: "presence-dot online"
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: _
                        }),
                        " Online"
                      ]
                    })
                  ]
                }),
                i.jsxs("button", {
                  className: ce === "in_game" ? "social-stat active" : "social-stat",
                  onClick: () => se("in_game"),
                  type: "button",
                  children: [
                    i.jsx(co, {
                      size: 19
                    }),
                    i.jsxs("span", {
                      children: [
                        i.jsx("strong", {
                          children: F
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
                        i.jsx(Ds, {
                          size: 17
                        }),
                        i.jsx("input", {
                          "aria-label": "Search friends",
                          value: A,
                          onChange: (k) => x(k.target.value),
                          placeholder: "Search friends"
                        })
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "friend-list",
                  children: [
                    X.map((k) => i.jsxs("article", {
                      className: `friend-row ${k.presence === "offline" ? "offline" : ""}`,
                      children: [
                        i.jsxs("div", {
                          className: "social-avatar",
                          children: [
                            k.avatarUrl ? i.jsx("img", {
                              src: k.avatarUrl,
                              alt: ""
                            }) : k.initials,
                            i.jsx("span", {
                              className: `presence-dot ${k.presence}`,
                              title: Nh(k.presence)
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "friend-identity",
                          children: [
                            i.jsx("strong", {
                              children: k.name
                            }),
                            i.jsxs("span", {
                              children: [
                                k.rating,
                                " Elo",
                                k.mutualFriends ? ` \xB7 ${k.mutualFriends} mutual` : ""
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: `friend-activity ${k.presence}`,
                          children: [
                            k.presence === "in_game" && i.jsx(co, {
                              size: 15
                            }),
                            k.presence === "idle" && i.jsx(hy, {
                              size: 15
                            }),
                            i.jsxs("span", {
                              children: [
                                k.activity,
                                k.lastSeen ? ` \xB7 ${k.lastSeen}` : ""
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
                              onClick: () => f(k),
                              children: [
                                i.jsx(oh, {
                                  size: 16
                                }),
                                " Message",
                                !!k.unread && i.jsx("span", {
                                  className: "unread-badge",
                                  children: k.unread
                                })
                              ]
                            }),
                            i.jsx("button", {
                              className: "secondary unfriend-button",
                              type: "button",
                              "aria-label": `Unfriend ${k.name}`,
                              title: `Unfriend ${k.name}`,
                              onClick: () => de(k),
                              children: i.jsx(ao, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, k.id)),
                    X.length === 0 && i.jsx("div", {
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
                  children: i.jsx(zy, {
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
                  onSubmit: V,
                  children: [
                    i.jsx("input", {
                      value: p,
                      onChange: (k) => {
                        S(k.target.value), L(null), g(null);
                      },
                      placeholder: "Player name",
                      "aria-label": "Player name"
                    }),
                    i.jsxs("button", {
                      className: "primary",
                      type: "submit",
                      disabled: !p.trim() || W,
                      children: [
                        i.jsx(yo, {
                          size: 16
                        }),
                        " ",
                        W ? "Checking player\u2026" : "Send invite"
                      ]
                    })
                  ]
                }),
                G && i.jsxs("span", {
                  className: "invite-confirmation",
                  children: [
                    i.jsx(ks, {
                      size: 14
                    }),
                    " Invite sent to ",
                    G
                  ]
                }),
                Y && i.jsxs("span", {
                  className: "invite-error",
                  role: "alert",
                  children: [
                    i.jsx(Nn, {
                      size: 14
                    }),
                    " ",
                    Y
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
                    o.length > 0 && i.jsx("span", {
                      className: "request-count",
                      children: o.length
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "request-list",
                  children: [
                    o.map((k) => i.jsxs("article", {
                      className: "request-row",
                      children: [
                        i.jsx("div", {
                          className: "social-avatar compact",
                          children: k.avatarUrl ? i.jsx("img", {
                            src: k.avatarUrl,
                            alt: ""
                          }) : k.initials
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("strong", {
                              children: k.name
                            }),
                            i.jsxs("span", {
                              children: [
                                k.rating,
                                " Elo \xB7 ",
                                k.mutualFriends,
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
                              "aria-label": `Accept ${k.name}`,
                              title: "Accept",
                              onClick: () => r(k),
                              children: i.jsx(ks, {
                                size: 16
                              })
                            }),
                            i.jsx("button", {
                              type: "button",
                              "aria-label": `Decline ${k.name}`,
                              title: "Decline",
                              onClick: () => m(k.id),
                              children: i.jsx(Nn, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, k.id)),
                    o.length === 0 && i.jsx("p", {
                      className: "social-empty",
                      children: "You\u2019re all caught up."
                    })
                  ]
                })
              ]
            })
          ]
        }),
        le && i.jsx("div", {
          className: "modal-backdrop social-confirm-backdrop",
          role: "presentation",
          onPointerDown: () => de(null),
          children: i.jsxs("section", {
            className: "social-confirm-modal",
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "unfriend-title",
            onPointerDown: (k) => k.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "social-confirm-icon",
                children: i.jsx(ao, {
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
                      le.name,
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
                    onClick: () => de(null),
                    children: "Cancel"
                  }),
                  i.jsxs("button", {
                    className: "social-confirm-remove",
                    type: "button",
                    onClick: () => {
                      E(le), de(null);
                    },
                    children: [
                      i.jsx(ao, {
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
  function Nh(c) {
    return {
      online: "Online",
      in_game: "In game",
      idle: "Idle",
      offline: "Offline"
    }[c];
  }
  function c0({ chats: c, onToggle: o, onClose: f, onSend: r, onActivate: m }) {
    return i.jsx("div", {
      className: "chat-dock",
      "aria-label": "Open conversations",
      children: c.map((y) => y.minimized ? i.jsxs("button", {
        className: "chat-minimized",
        type: "button",
        onClick: () => {
          o(y.friend.id), m(y.friend.id);
        },
        children: [
          i.jsx(oh, {
            size: 17
          }),
          i.jsx("span", {
            children: y.friend.name
          }),
          i.jsx("span", {
            className: `presence-dot ${y.friend.presence}`
          })
        ]
      }, y.friend.id) : i.jsx(u0, {
        chat: y,
        onToggle: o,
        onClose: f,
        onSend: r,
        onActivate: m
      }, y.friend.id))
    });
  }
  function u0({ chat: c, onToggle: o, onClose: f, onSend: r, onActivate: m }) {
    const [y, E] = C.useState(""), A = C.useRef(null);
    C.useEffect(() => {
      var _a2;
      return (_a2 = A.current) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth"
      });
    }, [
      c.messages
    ]);
    function x(p) {
      p.preventDefault(), y.trim() && (r(c.friend.id, y.trim()), E(""));
    }
    return i.jsxs("section", {
      className: "chat-window",
      onPointerDown: () => m(c.friend.id),
      children: [
        i.jsxs("header", {
          className: "chat-header",
          children: [
            i.jsxs("button", {
              className: "chat-person",
              type: "button",
              onClick: () => o(c.friend.id),
              children: [
                i.jsxs("span", {
                  className: "social-avatar compact",
                  children: [
                    c.friend.initials,
                    i.jsx("span", {
                      className: `presence-dot ${c.friend.presence}`
                    })
                  ]
                }),
                i.jsxs("span", {
                  children: [
                    i.jsx("strong", {
                      children: c.friend.name
                    }),
                    i.jsx("small", {
                      children: Nh(c.friend.presence)
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
                  onClick: () => o(c.friend.id),
                  children: i.jsx(rh, {
                    size: 16
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Close chat",
                  onClick: () => f(c.friend.id),
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
            c.messages.map((p) => i.jsxs("div", {
              className: `chat-message ${p.from}`,
              children: [
                i.jsx("span", {
                  children: p.text
                }),
                i.jsx("small", {
                  children: p.time
                })
              ]
            }, p.id)),
            i.jsx("div", {
              ref: A
            })
          ]
        }),
        i.jsxs("form", {
          className: "chat-compose",
          onSubmit: x,
          children: [
            i.jsx("input", {
              value: y,
              onChange: (p) => E(p.target.value),
              placeholder: `Message ${c.friend.name}`,
              "aria-label": `Message ${c.friend.name}`
            }),
            i.jsx("button", {
              type: "submit",
              "aria-label": "Send message",
              disabled: !y.trim(),
              children: i.jsx(yo, {
                size: 17
              })
            })
          ]
        })
      ]
    });
  }
  const o0 = "" + new URL("el_icon_no_plume-CLUisAEI.png", import.meta.url).href, r0 = {
    async getOnlinePlayerCount() {
      if (xe) return 486;
      const c = await Ce.request("/online");
      return Number(c.onlinePlayers);
    }
  }, d0 = /* @__PURE__ */ new Set([
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
  function po() {
    const { state: c, notify: o } = St();
    async function f() {
      var _a2;
      if (d0.has(c.queueStatus)) {
        o("Empire League cannot be minimized during an active match.", "danger", {
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
          children: i.jsx(rh, {
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
  const f0 = [
    {
      page: "home",
      label: "Home",
      icon: i.jsx(Sy, {
        size: 18
      })
    },
    {
      page: "ranked",
      label: "Ranked",
      icon: i.jsx(vo, {
        size: 18
      })
    },
    {
      page: "custom",
      label: "Custom",
      icon: i.jsx(co, {
        size: 18
      })
    },
    {
      page: "match-history",
      label: "Match History",
      icon: i.jsx(by, {
        size: 18
      })
    },
    {
      page: "leaderboard",
      label: "Leaderboard",
      icon: i.jsx(dy, {
        size: 18
      })
    },
    {
      page: "profile",
      label: "Profile",
      icon: i.jsx(_y, {
        size: 18
      })
    },
    {
      page: "social",
      label: "Social",
      icon: i.jsx(fi, {
        size: 18
      })
    },
    {
      page: "settings",
      label: "Settings",
      icon: i.jsx(uo, {
        size: 18
      })
    }
  ];
  function m0({ children: c }) {
    const { page: o, setPage: f, state: r, signOut: m, selectedProfileId: y, openPlayerProfile: E, returnFromPlayerProfile: A } = St(), x = o === "profile" && y !== null && y !== r.currentUser.id, p = `${r.currentUser.wins}-${r.currentUser.losses}`, [S, G] = C.useState(null);
    return C.useEffect(() => {
      if (xe) return;
      let L = false;
      const Y = () => {
        r0.getOnlinePlayerCount().then((W) => {
          L || G(W);
        }).catch(() => {
          L || G(null);
        });
      };
      Y();
      const g = window.setInterval(Y, 3e4);
      return () => {
        L = true, window.clearInterval(g);
      };
    }, []), i.jsxs("div", {
      className: "app-shell",
      children: [
        i.jsxs("div", {
          className: "window-title",
          children: [
            i.jsx("img", {
              src: o0,
              alt: ""
            }),
            i.jsx("span", {
              children: "Empire League - AoE2:DE Community Client & Matchmaker"
            })
          ]
        }),
        i.jsx(po, {}),
        i.jsxs("aside", {
          className: "sidebar",
          children: [
            i.jsx("nav", {
              className: "nav-list",
              "aria-label": "Primary navigation",
              children: f0.map((L) => i.jsxs("button", {
                className: o === L.page ? "nav-item active" : "nav-item",
                type: "button",
                onClick: () => L.page === "profile" ? E(r.currentUser.id) : f(L.page),
                children: [
                  L.icon,
                  i.jsx("span", {
                    children: L.label
                  }),
                  L.page === "ranked" && r.queueStatus === "searching" && i.jsxs("span", {
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
              }, L.page))
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
                S !== null && S >= 300 && i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Online"
                    }),
                    i.jsxs("strong", {
                      children: [
                        S.toLocaleString(),
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
                      className: `status-${r.connectionStatus}`,
                      children: r.connectionStatus
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
                    i.jsxs("span", {
                      children: [
                        r.currentUser.rating,
                        " Elo \xB7 ",
                        p
                      ]
                    })
                  ]
                }),
                i.jsx("button", {
                  className: "icon-button",
                  type: "button",
                  "aria-label": "Sign out",
                  title: "Sign out",
                  onClick: () => void m(),
                  children: i.jsx(wy, {
                    size: 16
                  })
                })
              ]
            })
          ]
        }),
        i.jsx("main", {
          className: `main-area page-${o}`,
          children: i.jsxs("div", {
            className: "content-shell",
            children: [
              i.jsxs("header", {
                className: x ? "topbar linked-profile-topbar" : "topbar",
                children: [
                  x && i.jsxs("button", {
                    className: "secondary profile-header-back",
                    type: "button",
                    onClick: A,
                    children: [
                      i.jsx(oy, {
                        size: 16
                      }),
                      "Back"
                    ]
                  }),
                  i.jsx("div", {
                    children: i.jsx("h1", {
                      children: h0(o)
                    })
                  })
                ]
              }),
              c,
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
  function h0(c) {
    return {
      home: "Home",
      ranked: "Ranked",
      custom: "Custom",
      "match-history": "Match History",
      leaderboard: "Leaderboard",
      profile: "Player Profile",
      social: "Social",
      settings: "Settings"
    }[c];
  }
  function p0() {
    const { state: c, acceptMatch: o, declineMatch: f } = St(), r = c.activeMatch, m = (r == null ? void 0 : r.queue.id) === "ranked-rm-1v1" && r.opponent.steamLicenseStatus === "family_shared", y = C.useRef(m && (r == null ? void 0 : r.acceptDeadline) ? new Date(r.acceptDeadline).getTime() : Date.now() + 1e4), E = C.useRef(false), A = y.current, [x, p] = C.useState(() => Math.max(0, Math.ceil((A - Date.now()) / 1e3))), S = $t.find((G) => {
      var _a2;
      return G.id === ((_a2 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a2.id);
    }) ?? (r == null ? void 0 : r.selectedMap);
    return C.useEffect(() => {
      const G = () => p(Math.max(0, Math.ceil((A - Date.now()) / 1e3)));
      G();
      const L = window.setInterval(G, 250);
      return () => window.clearInterval(L);
    }, [
      A
    ]), C.useEffect(() => {
      if (m) return;
      const G = Math.max(0, A - Date.now()), L = window.setTimeout(() => {
        E.current || (E.current = true, o());
      }, G);
      return () => window.clearTimeout(L);
    }, [
      o,
      A,
      m
    ]), C.useEffect(() => {
      function G(L) {
        L.key === "Escape" && f();
      }
      return window.addEventListener("keydown", G), () => window.removeEventListener("keydown", G);
    }, [
      f
    ]), r ? i.jsx("div", {
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
          S && i.jsxs("figure", {
            className: "match-map-thumbnail",
            children: [
              i.jsx("img", {
                src: S.thumbnailUrl,
                alt: ""
              }),
              i.jsx("strong", {
                className: "match-game-type",
                children: r.queue.format
              }),
              i.jsx("figcaption", {
                children: S.name
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
              x,
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
                onClick: () => void o(),
                children: "Accept Match"
              })
            ]
          })
        ]
      })
    }) : null;
  }
  const g0 = {
    info: xy,
    success: fy,
    warning: Ry,
    danger: sh,
    loading: ch
  };
  function y0() {
    const { state: c, dismissNotification: o } = St();
    return i.jsx("div", {
      className: "toasts",
      "aria-live": "polite",
      children: c.notifications.map((f) => i.jsx(v0, {
        item: f,
        dismiss: () => o(f.id)
      }, `${f.id}-${f.tone}`))
    });
  }
  function v0({ item: c, dismiss: o }) {
    const [f, r] = C.useState(c.durationMs ?? 0), [m, y] = C.useState(false), E = C.useRef(Date.now()), A = g0[c.tone];
    C.useEffect(() => {
      if (m || c.durationMs === null) return;
      E.current = Date.now();
      const S = window.setTimeout(o, f);
      return () => window.clearTimeout(S);
    }, [
      o,
      c.durationMs,
      m,
      f
    ]);
    function x() {
      r((S) => Math.max(0, S - (Date.now() - E.current))), y(true);
    }
    const p = {
      "--toast-duration": `${f}ms`,
      "--toast-progress": c.durationMs ? f / c.durationMs : 1
    };
    return i.jsxs("div", {
      className: `toast ${c.tone}`,
      onMouseEnter: x,
      onMouseLeave: () => y(false),
      children: [
        i.jsx(A, {
          className: `toast-icon${c.tone === "loading" ? " spin" : ""}`,
          size: 20,
          "aria-hidden": "true"
        }),
        i.jsxs("div", {
          className: "toast-copy",
          children: [
            i.jsx("strong", {
              children: c.message
            }),
            c.detail && i.jsx("span", {
              children: c.detail
            })
          ]
        }),
        c.tone !== "loading" && c.dismissible !== false && i.jsx("button", {
          type: "button",
          onClick: o,
          "aria-label": "Dismiss notification",
          children: i.jsx(Nn, {
            size: 16
          })
        }),
        !m && c.durationMs !== null && i.jsx("i", {
          className: "toast-progress",
          style: p,
          "aria-hidden": "true"
        }, f)
      ]
    });
  }
  const b0 = "" + new URL("el_full_1-ClSwu4yM.png", import.meta.url).href, Ft = {
    async getSnapshot() {
      return xe ? {
        friends: hh,
        requests: ph,
        outgoing: []
      } : (await Ce.request("/social")).snapshot;
    },
    async sendFriendRequest(c) {
      return xe ? {
        id: `preview-${c.toLowerCase().replaceAll(" ", "-")}`,
        displayName: c
      } : (await Ce.request("/social/requests", {
        method: "POST",
        body: {
          displayName: c
        }
      })).player;
    },
    async acceptRequest(c) {
      xe || await Ce.request(`/social/requests/${encodeURIComponent(c)}/accept`, {
        method: "POST"
      });
    },
    async declineRequest(c) {
      xe || await Ce.request(`/social/requests/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async removeFriend(c) {
      xe || await Ce.request(`/social/friends/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async updatePresence(c, o, f) {
      xe || await Ce.request("/social/presence", {
        method: "POST",
        body: {
          presence: c,
          activity: o,
          mapName: f
        }
      });
    },
    async getMessages(c) {
      return xe ? [
        {
          id: "preview-message-1",
          senderId: c,
          recipientId: "user-1",
          text: "Want to queue for Arabia?",
          sentAt: new Date(Date.now() - 18e4).toISOString()
        },
        {
          id: "preview-message-2",
          senderId: "user-1",
          recipientId: c,
          text: "Sure, give me two minutes.",
          sentAt: new Date(Date.now() - 12e4).toISOString()
        }
      ] : (await Ce.request(`/social/messages/${encodeURIComponent(c)}`)).messages;
    },
    async sendMessage(c, o) {
      return xe ? {
        id: `preview-message-${Date.now()}`,
        senderId: "user-1",
        recipientId: c,
        text: o,
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      } : (await Ce.request("/social/messages", {
        method: "POST",
        body: {
          recipientId: c,
          text: o
        }
      })).message;
    },
    async markMessagesRead(c) {
      xe || await Ce.request(`/social/messages/${encodeURIComponent(c)}/read`, {
        method: "POST"
      });
    },
    onEvent(c) {
      return xe ? () => {
      } : Ce.onSocialEvent(c);
    }
  };
  function S0() {
    var _a2, _b2, _c;
    const [c, o] = C.useState(false), [f, r] = C.useState(!xe), [m, y] = C.useState(xe ? hh : []), E = C.useRef([]), [A, x] = C.useState(xe ? ph : []), [p, S] = C.useState([]), [G, L] = C.useState([]);
    C.useEffect(() => {
      var _a3;
      return (_a3 = window.electronApi) == null ? void 0 : _a3.onMouseTestModeChanged(o);
    }, []), C.useEffect(() => {
      const _ = window.setTimeout(() => r(false), 3e3);
      return () => window.clearTimeout(_);
    }, []);
    const { page: Y, state: g, authStatus: W, authError: Z, signInWithSteam: le } = St();
    C.useEffect(() => {
      E.current = m;
    }, [
      m
    ]), C.useEffect(() => {
      const _ = () => {
        var _a3;
        return void ((_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert());
      };
      return window.addEventListener("focus", _), () => window.removeEventListener("focus", _);
    }, []);
    async function de(_) {
      const F = await Ft.getMessages(_.id).catch(() => []);
      Ft.markMessagesRead(_.id), L((k) => k.find((ae) => ae.friend.id === _.id) ? k.map((ae) => ae.friend.id === _.id ? {
        ...ae,
        minimized: false
      } : ae) : [
        ...k.slice(-2),
        {
          friend: _,
          minimized: false,
          messages: F.map((ae) => ({
            id: ae.id,
            from: ae.senderId === g.currentUser.id ? "me" : "friend",
            text: ae.text,
            time: new Date(ae.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }))
        }
      ]), y((k) => k.map((J) => J.id === _.id ? {
        ...J,
        unread: 0
      } : J));
    }
    function ce(_) {
      var _a3;
      y((F) => F.map((k) => k.id === _ ? {
        ...k,
        unread: 0
      } : k)), Ft.markMessagesRead(_), (_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert();
    }
    async function se(_) {
      await Ft.removeFriend(_.id), L((F) => F.filter((k) => k.friend.id !== _.id));
    }
    async function X(_) {
      await Ft.acceptRequest(_.connectionId);
    }
    async function V(_) {
      const F = _.trim().toLowerCase();
      if (F === g.currentUser.displayName.toLowerCase()) throw new Error("You can\u2019t send a friend invite to yourself.");
      if (m.some((J) => J.name.toLowerCase() === F)) throw new Error(`${_.trim()} is already your friend.`);
      if (A.some((J) => J.name.toLowerCase() === F)) throw new Error(`You already have a pending request from ${_.trim()}.`);
      return (await Ft.sendFriendRequest(_)).displayName;
    }
    return C.useEffect(() => {
      if (xe || W !== "authenticated") return;
      const _ = (F) => {
        y((k) => F.friends.map((J) => {
          var _a3;
          return {
            ...J,
            initials: nh(J.name),
            unread: J.unread ?? ((_a3 = k.find((ae) => ae.id === J.id)) == null ? void 0 : _a3.unread) ?? 0
          };
        })), x(F.requests.map((k) => ({
          ...k,
          initials: nh(k.name)
        }))), S(F.outgoing.map((k) => k.id));
      };
      return Ft.getSnapshot().then(_), Ft.onEvent((F) => {
        var _a3;
        if (F.type === "snapshot" && _(F.snapshot), F.type === "presence" && (y((k) => k.map((J) => J.id === F.playerId ? {
          ...J,
          presence: F.presence,
          activity: F.activity,
          mapName: F.mapName
        } : J)), L((k) => k.map((J) => J.friend.id === F.playerId ? {
          ...J,
          friend: {
            ...J.friend,
            presence: F.presence,
            activity: F.activity,
            mapName: F.mapName
          }
        } : J))), F.type === "message") {
          const k = F.message, J = {
            id: k.id,
            from: "friend",
            text: k.text,
            time: new Date(k.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }, ae = E.current.find((Me) => Me.id === k.senderId), Ee = document.hasFocus();
          L((Me) => {
            const je = Me.some(($) => $.friend.id === k.senderId);
            return !je && ae ? [
              ...Me.slice(-2),
              {
                friend: ae,
                minimized: false,
                messages: [
                  J
                ]
              }
            ] : je ? Me.map(($) => $.friend.id === k.senderId ? {
              ...$,
              minimized: false,
              messages: [
                ...$.messages,
                J
              ]
            } : $) : Me;
          }), Ee ? Ft.markMessagesRead(k.senderId) : (y((Me) => Me.map((je) => je.id === k.senderId ? {
            ...je,
            unread: (je.unread ?? 0) + 1
          } : je)), (_a3 = window.electronApi) == null ? void 0 : _a3.alertUnreadMessage());
        }
      });
    }, [
      W,
      g.currentUser.id
    ]), C.useEffect(() => {
      if (xe || W !== "authenticated") return;
      let _ = false, F = 0;
      const k = () => {
        var _a3, _b3;
        const Me = g.activeMatch, je = g.queueStatus === "in_game" || g.gameStatus === "in_match", $ = je ? "in_game" : _ ? "idle" : "online", j = je ? `In game${((_a3 = Me == null ? void 0 : Me.selectedMap) == null ? void 0 : _a3.name) ? ` \xB7 ${Me.selectedMap.name}` : ""}` : g.queueStatus === "searching" ? "Looking for a match" : _ ? "Idle" : "Online";
        Ft.updatePresence($, j, je ? (_b3 = Me == null ? void 0 : Me.selectedMap) == null ? void 0 : _b3.name : void 0);
      }, J = () => {
        const Me = _;
        _ = false, window.clearTimeout(F), F = window.setTimeout(() => {
          _ = true, k();
        }, 5 * 6e4), Me && k();
      }, ae = [
        "pointerdown",
        "keydown",
        "wheel"
      ];
      ae.forEach((Me) => window.addEventListener(Me, J, {
        passive: true
      })), J(), k();
      const Ee = window.setInterval(k, 3e4);
      return () => {
        ae.forEach((Me) => window.removeEventListener(Me, J)), window.clearTimeout(F), window.clearInterval(Ee);
      };
    }, [
      W,
      g.queueStatus,
      g.gameStatus,
      (_a2 = g.activeMatch) == null ? void 0 : _a2.id,
      (_c = (_b2 = g.activeMatch) == null ? void 0 : _b2.selectedMap) == null ? void 0 : _c.name
    ]), f || W === "loading" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(po, {}),
        i.jsx("main", {
          className: "auth-screen session-loading-screen",
          "aria-label": "Loading Empire League",
          children: i.jsxs("div", {
            className: "session-loading-mark",
            children: [
              i.jsx("img", {
                className: "session-loading-artwork",
                src: b0,
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
    }) : W !== "authenticated" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(po, {}),
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
              Z && i.jsx("div", {
                className: "auth-error",
                children: Z
              }),
              i.jsxs("button", {
                className: "primary large",
                type: "button",
                disabled: W === "authenticating",
                onClick: () => void le(),
                children: [
                  i.jsx(uh, {
                    size: 20
                  }),
                  W === "authenticating" ? "Waiting for Steam\u2026" : "Sign in through Steam"
                ]
              }),
              W === "authenticating" && i.jsx("span", {
                children: "Complete sign-in in your browser."
              })
            ]
          })
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        i.jsx(x0, {
          locked: [
            "creating_lobby",
            "waiting_for_opponent",
            "verifying_lobby",
            "ready"
          ].includes(g.queueStatus) && !g.error
        }),
        i.jsxs(m0, {
          children: [
            Y === "home" && i.jsx(Ov, {}),
            Y === "ranked" && i.jsx(Gb, {}),
            Y === "custom" && i.jsx(Zb, {}),
            Y === "match-history" && i.jsx($b, {}),
            Y === "leaderboard" && i.jsx(Wb, {}),
            Y === "profile" && i.jsx(l0, {
              friendIds: m.map((_) => _.id),
              outgoingRequestIds: p,
              onAddFriend: async (_) => {
                await V(_);
              }
            }),
            Y === "social" && i.jsx(s0, {
              friends: m,
              requests: A,
              onMessage: (_) => void de(_),
              onAccept: (_) => void X(_),
              onDecline: (_) => {
                var _a3;
                return void Ft.declineRequest(((_a3 = A.find((F) => F.id === _)) == null ? void 0 : _a3.connectionId) ?? _);
              },
              onInvite: V,
              onUnfriend: (_) => void se(_)
            }),
            Y === "settings" && i.jsx(i0, {})
          ]
        }),
        g.queueStatus === "match_found" && g.activeMatch && i.jsx(p0, {}),
        i.jsx(y0, {}),
        i.jsx(c0, {
          chats: G,
          onToggle: (_) => L((F) => F.map((k) => k.friend.id === _ ? {
            ...k,
            minimized: !k.minimized
          } : k)),
          onClose: (_) => L((F) => F.filter((k) => k.friend.id !== _)),
          onActivate: ce,
          onSend: (_, F) => void Ft.sendMessage(_, F).then((k) => L((J) => J.map((ae) => ae.friend.id === _ ? {
            ...ae,
            messages: [
              ...ae.messages,
              {
                id: k.id,
                from: "me",
                text: k.text,
                time: new Date(k.sentAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })
              }
            ]
          } : ae)))
        }),
        c && i.jsx(w0, {})
      ]
    });
  }
  function nh(c) {
    var _a2;
    const o = c.trim().split(/\s+/);
    return (o.length > 1 ? `${o[0][0]}${(_a2 = o.at(-1)) == null ? void 0 : _a2[0]}` : c.slice(0, 2)).toUpperCase();
  }
  function x0({ locked: c }) {
    const [o, f] = C.useState(null);
    return C.useEffect(() => {
      var _a2, _b2, _c, _d;
      if (!c) {
        f(null);
        return;
      }
      (_a2 = window.electronApi) == null ? void 0 : _a2.setLobbyInputLock(true);
      const r = (_b2 = window.electronApi) == null ? void 0 : _b2.onLobbyGuardPointer(f);
      return document.documentElement.classList.add("game-transition-input-forwarded"), (_d = (_c = document.activeElement) == null ? void 0 : _c.blur) == null ? void 0 : _d.call(_c), () => {
        var _a3;
        (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), r == null ? void 0 : r(), document.documentElement.classList.remove("game-transition-input-forwarded");
      };
    }, [
      c
    ]), !c || !o ? null : i.jsx("span", {
      className: "lobby-guard-pointer",
      style: {
        left: o.x,
        top: o.y
      },
      "aria-hidden": "true"
    });
  }
  function w0() {
    const [c, o] = C.useState(null), [f, r] = C.useState(null);
    return C.useEffect(() => {
      var _a2, _b2;
      document.documentElement.classList.add("mouse-test-hud-active"), document.body.classList.add("mouse-test-hud-active");
      const m = (_a2 = window.electronApi) == null ? void 0 : _a2.onMouseTestPointer(o), y = (_b2 = window.electronApi) == null ? void 0 : _b2.onMouseTestCoordinatesCopied((E) => {
        r(E), window.setTimeout(() => r(null), 1600);
      });
      return () => {
        m == null ? void 0 : m(), y == null ? void 0 : y(), document.documentElement.classList.remove("mouse-test-hud-active"), document.body.classList.remove("mouse-test-hud-active");
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
            c ? i.jsxs("dl", {
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("dt", {
                      children: "Screen"
                    }),
                    i.jsxs("dd", {
                      children: [
                        c.screenX,
                        ", ",
                        c.screenY
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
                        c.clientX,
                        ", ",
                        c.clientY
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
                        c.designX,
                        ", ",
                        c.designY
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
                        c.clientWidth,
                        " \xD7 ",
                        c.clientHeight
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
                      children: c.inside ? "Yes" : "No"
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
        (c == null ? void 0 : c.inside) && i.jsx("div", {
          className: "mouse-test-crosshair",
          style: {
            transform: `translate(${c.clientX}px, ${c.clientY}px)`
          },
          children: i.jsxs("span", {
            children: [
              c.designX,
              ", ",
              c.designY
            ]
          })
        })
      ]
    });
  }
  ay.createRoot(document.getElementById("root")).render(i.jsx(C.StrictMode, {
    children: i.jsx(_v, {
      children: i.jsx(S0, {})
    })
  }));
})();
