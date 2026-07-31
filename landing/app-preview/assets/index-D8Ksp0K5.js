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
      for (const y of m) if (y.type === "childList") for (const j of y.addedNodes) j.tagName === "LINK" && j.rel === "modulepreload" && r(j);
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
  var Ju = {
    exports: {}
  }, ui = {};
  var vm;
  function Yg() {
    if (vm) return ui;
    vm = 1;
    var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
    function f(r, m, y) {
      var j = null;
      if (y !== void 0 && (j = "" + y), m.key !== void 0 && (j = "" + m.key), "key" in m) {
        y = {};
        for (var A in m) A !== "key" && (y[A] = m[A]);
      } else y = m;
      return m = y.ref, {
        $$typeof: c,
        type: r,
        key: j,
        ref: m !== void 0 ? m : null,
        props: y
      };
    }
    return ui.Fragment = o, ui.jsx = f, ui.jsxs = f, ui;
  }
  var bm;
  function Qg() {
    return bm || (bm = 1, Ju.exports = Yg()), Ju.exports;
  }
  var i = Qg(), Fu = {
    exports: {}
  }, ye = {};
  var Sm;
  function Xg() {
    if (Sm) return ye;
    Sm = 1;
    var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), j = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), G = Symbol.iterator;
    function X(v) {
      return v === null || typeof v != "object" ? null : (v = G && v[G] || v["@@iterator"], typeof v == "function" ? v : null);
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
    }, I = Object.assign, $ = {};
    function le(v, B, W) {
      this.props = v, this.context = B, this.refs = $, this.updater = W || g;
    }
    le.prototype.isReactComponent = {}, le.prototype.setState = function(v, B) {
      if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, v, B, "setState");
    }, le.prototype.forceUpdate = function(v) {
      this.updater.enqueueForceUpdate(this, v, "forceUpdate");
    };
    function me() {
    }
    me.prototype = le.prototype;
    function ce(v, B, W) {
      this.props = v, this.context = B, this.refs = $, this.updater = W || g;
    }
    var pe = ce.prototype = new me();
    pe.constructor = ce, I(pe, le.prototype), pe.isPureReactComponent = true;
    var K = Array.isArray;
    function ae() {
    }
    var _ = {
      H: null,
      A: null,
      T: null,
      S: null
    }, L = Object.prototype.hasOwnProperty;
    function U(v, B, W) {
      var ie = W.ref;
      return {
        $$typeof: c,
        type: v,
        key: B,
        ref: ie !== void 0 ? ie : null,
        props: W
      };
    }
    function Z(v, B) {
      return U(v.type, B, v.props);
    }
    function te(v) {
      return typeof v == "object" && v !== null && v.$$typeof === c;
    }
    function Ce(v) {
      var B = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + v.replace(/[=:]/g, function(W) {
        return B[W];
      });
    }
    var Ne = /\/+/g;
    function Re(v, B) {
      return typeof v == "object" && v !== null && v.key != null ? Ce("" + v.key) : B.toString(36);
    }
    function F(v) {
      switch (v.status) {
        case "fulfilled":
          return v.value;
        case "rejected":
          throw v.reason;
        default:
          switch (typeof v.status == "string" ? v.then(ae, ae) : (v.status = "pending", v.then(function(B) {
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
    function T(v, B, W, ie, ge) {
      var ve = typeof v;
      (ve === "undefined" || ve === "boolean") && (v = null);
      var _e = false;
      if (v === null) _e = true;
      else switch (ve) {
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
              return _e = v._init, T(_e(v._payload), B, W, ie, ge);
          }
      }
      if (_e) return ge = ge(v), _e = ie === "" ? "." + Re(v, 0) : ie, K(ge) ? (W = "", _e != null && (W = _e.replace(Ne, "$&/") + "/"), T(ge, B, W, "", function(vt) {
        return vt;
      })) : ge != null && (te(ge) && (ge = Z(ge, W + (ge.key == null || v && v.key === ge.key ? "" : ("" + ge.key).replace(Ne, "$&/") + "/") + _e)), B.push(ge)), 1;
      _e = 0;
      var at = ie === "" ? "." : ie + ":";
      if (K(v)) for (var Ke = 0; Ke < v.length; Ke++) ie = v[Ke], ve = at + Re(ie, Ke), _e += T(ie, B, W, ve, ge);
      else if (Ke = X(v), typeof Ke == "function") for (v = Ke.call(v), Ke = 0; !(ie = v.next()).done; ) ie = ie.value, ve = at + Re(ie, Ke++), _e += T(ie, B, W, ve, ge);
      else if (ve === "object") {
        if (typeof v.then == "function") return T(F(v), B, W, ie, ge);
        throw B = String(v), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
      }
      return _e;
    }
    function O(v, B, W) {
      if (v == null) return v;
      var ie = [], ge = 0;
      return T(v, ie, "", "", function(ve) {
        return B.call(W, ve, ge++);
      }), ie;
    }
    function ee(v) {
      if (v._status === -1) {
        var B = v._result;
        B = B(), B.then(function(W) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = W);
        }, function(W) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = W);
        }), v._status === -1 && (v._status = 0, v._result = B);
      }
      if (v._status === 1) return v._result.default;
      throw v._result;
    }
    var fe = typeof reportError == "function" ? reportError : function(v) {
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
    }, xe = {
      map: O,
      forEach: function(v, B, W) {
        O(v, function() {
          B.apply(this, arguments);
        }, W);
      },
      count: function(v) {
        var B = 0;
        return O(v, function() {
          B++;
        }), B;
      },
      toArray: function(v) {
        return O(v, function(B) {
          return B;
        }) || [];
      },
      only: function(v) {
        if (!te(v)) throw Error("React.Children.only expected to receive a single React element child.");
        return v;
      }
    };
    return ye.Activity = Y, ye.Children = xe, ye.Component = le, ye.Fragment = f, ye.Profiler = m, ye.PureComponent = ce, ye.StrictMode = r, ye.Suspense = M, ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _, ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(v) {
        return _.H.useMemoCache(v);
      }
    }, ye.cache = function(v) {
      return function() {
        return v.apply(null, arguments);
      };
    }, ye.cacheSignal = function() {
      return null;
    }, ye.cloneElement = function(v, B, W) {
      if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
      var ie = I({}, v.props), ge = v.key;
      if (B != null) for (ve in B.key !== void 0 && (ge = "" + B.key), B) !L.call(B, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && B.ref === void 0 || (ie[ve] = B[ve]);
      var ve = arguments.length - 2;
      if (ve === 1) ie.children = W;
      else if (1 < ve) {
        for (var _e = Array(ve), at = 0; at < ve; at++) _e[at] = arguments[at + 2];
        ie.children = _e;
      }
      return U(v.type, ge, ie);
    }, ye.createContext = function(v) {
      return v = {
        $$typeof: j,
        _currentValue: v,
        _currentValue2: v,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, v.Provider = v, v.Consumer = {
        $$typeof: y,
        _context: v
      }, v;
    }, ye.createElement = function(v, B, W) {
      var ie, ge = {}, ve = null;
      if (B != null) for (ie in B.key !== void 0 && (ve = "" + B.key), B) L.call(B, ie) && ie !== "key" && ie !== "__self" && ie !== "__source" && (ge[ie] = B[ie]);
      var _e = arguments.length - 2;
      if (_e === 1) ge.children = W;
      else if (1 < _e) {
        for (var at = Array(_e), Ke = 0; Ke < _e; Ke++) at[Ke] = arguments[Ke + 2];
        ge.children = at;
      }
      if (v && v.defaultProps) for (ie in _e = v.defaultProps, _e) ge[ie] === void 0 && (ge[ie] = _e[ie]);
      return U(v, ve, ge);
    }, ye.createRef = function() {
      return {
        current: null
      };
    }, ye.forwardRef = function(v) {
      return {
        $$typeof: A,
        render: v
      };
    }, ye.isValidElement = te, ye.lazy = function(v) {
      return {
        $$typeof: S,
        _payload: {
          _status: -1,
          _result: v
        },
        _init: ee
      };
    }, ye.memo = function(v, B) {
      return {
        $$typeof: p,
        type: v,
        compare: B === void 0 ? null : B
      };
    }, ye.startTransition = function(v) {
      var B = _.T, W = {};
      _.T = W;
      try {
        var ie = v(), ge = _.S;
        ge !== null && ge(W, ie), typeof ie == "object" && ie !== null && typeof ie.then == "function" && ie.then(ae, fe);
      } catch (ve) {
        fe(ve);
      } finally {
        B !== null && W.types !== null && (B.types = W.types), _.T = B;
      }
    }, ye.unstable_useCacheRefresh = function() {
      return _.H.useCacheRefresh();
    }, ye.use = function(v) {
      return _.H.use(v);
    }, ye.useActionState = function(v, B, W) {
      return _.H.useActionState(v, B, W);
    }, ye.useCallback = function(v, B) {
      return _.H.useCallback(v, B);
    }, ye.useContext = function(v) {
      return _.H.useContext(v);
    }, ye.useDebugValue = function() {
    }, ye.useDeferredValue = function(v, B) {
      return _.H.useDeferredValue(v, B);
    }, ye.useEffect = function(v, B) {
      return _.H.useEffect(v, B);
    }, ye.useEffectEvent = function(v) {
      return _.H.useEffectEvent(v);
    }, ye.useId = function() {
      return _.H.useId();
    }, ye.useImperativeHandle = function(v, B, W) {
      return _.H.useImperativeHandle(v, B, W);
    }, ye.useInsertionEffect = function(v, B) {
      return _.H.useInsertionEffect(v, B);
    }, ye.useLayoutEffect = function(v, B) {
      return _.H.useLayoutEffect(v, B);
    }, ye.useMemo = function(v, B) {
      return _.H.useMemo(v, B);
    }, ye.useOptimistic = function(v, B) {
      return _.H.useOptimistic(v, B);
    }, ye.useReducer = function(v, B, W) {
      return _.H.useReducer(v, B, W);
    }, ye.useRef = function(v) {
      return _.H.useRef(v);
    }, ye.useState = function(v) {
      return _.H.useState(v);
    }, ye.useSyncExternalStore = function(v, B, W) {
      return _.H.useSyncExternalStore(v, B, W);
    }, ye.useTransition = function() {
      return _.H.useTransition();
    }, ye.version = "19.2.7", ye;
  }
  var wm;
  function mo() {
    return wm || (wm = 1, Fu.exports = Xg()), Fu.exports;
  }
  var z = mo(), $u = {
    exports: {}
  }, oi = {}, Iu = {
    exports: {}
  }, Wu = {};
  var xm;
  function Vg() {
    return xm || (xm = 1, (function(c) {
      function o(T, O) {
        var ee = T.length;
        T.push(O);
        e: for (; 0 < ee; ) {
          var fe = ee - 1 >>> 1, xe = T[fe];
          if (0 < m(xe, O)) T[fe] = O, T[ee] = xe, ee = fe;
          else break e;
        }
      }
      function f(T) {
        return T.length === 0 ? null : T[0];
      }
      function r(T) {
        if (T.length === 0) return null;
        var O = T[0], ee = T.pop();
        if (ee !== O) {
          T[0] = ee;
          e: for (var fe = 0, xe = T.length, v = xe >>> 1; fe < v; ) {
            var B = 2 * (fe + 1) - 1, W = T[B], ie = B + 1, ge = T[ie];
            if (0 > m(W, ee)) ie < xe && 0 > m(ge, W) ? (T[fe] = ge, T[ie] = ee, fe = ie) : (T[fe] = W, T[B] = ee, fe = B);
            else if (ie < xe && 0 > m(ge, ee)) T[fe] = ge, T[ie] = ee, fe = ie;
            else break e;
          }
        }
        return O;
      }
      function m(T, O) {
        var ee = T.sortIndex - O.sortIndex;
        return ee !== 0 ? ee : T.id - O.id;
      }
      if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var y = performance;
        c.unstable_now = function() {
          return y.now();
        };
      } else {
        var j = Date, A = j.now();
        c.unstable_now = function() {
          return j.now() - A;
        };
      }
      var M = [], p = [], S = 1, Y = null, G = 3, X = false, g = false, I = false, $ = false, le = typeof setTimeout == "function" ? setTimeout : null, me = typeof clearTimeout == "function" ? clearTimeout : null, ce = typeof setImmediate < "u" ? setImmediate : null;
      function pe(T) {
        for (var O = f(p); O !== null; ) {
          if (O.callback === null) r(p);
          else if (O.startTime <= T) r(p), O.sortIndex = O.expirationTime, o(M, O);
          else break;
          O = f(p);
        }
      }
      function K(T) {
        if (I = false, pe(T), !g) if (f(M) !== null) g = true, ae || (ae = true, Ce());
        else {
          var O = f(p);
          O !== null && F(K, O.startTime - T);
        }
      }
      var ae = false, _ = -1, L = 5, U = -1;
      function Z() {
        return $ ? true : !(c.unstable_now() - U < L);
      }
      function te() {
        if ($ = false, ae) {
          var T = c.unstable_now();
          U = T;
          var O = true;
          try {
            e: {
              g = false, I && (I = false, me(_), _ = -1), X = true;
              var ee = G;
              try {
                t: {
                  for (pe(T), Y = f(M); Y !== null && !(Y.expirationTime > T && Z()); ) {
                    var fe = Y.callback;
                    if (typeof fe == "function") {
                      Y.callback = null, G = Y.priorityLevel;
                      var xe = fe(Y.expirationTime <= T);
                      if (T = c.unstable_now(), typeof xe == "function") {
                        Y.callback = xe, pe(T), O = true;
                        break t;
                      }
                      Y === f(M) && r(M), pe(T);
                    } else r(M);
                    Y = f(M);
                  }
                  if (Y !== null) O = true;
                  else {
                    var v = f(p);
                    v !== null && F(K, v.startTime - T), O = false;
                  }
                }
                break e;
              } finally {
                Y = null, G = ee, X = false;
              }
              O = void 0;
            }
          } finally {
            O ? Ce() : ae = false;
          }
        }
      }
      var Ce;
      if (typeof ce == "function") Ce = function() {
        ce(te);
      };
      else if (typeof MessageChannel < "u") {
        var Ne = new MessageChannel(), Re = Ne.port2;
        Ne.port1.onmessage = te, Ce = function() {
          Re.postMessage(null);
        };
      } else Ce = function() {
        le(te, 0);
      };
      function F(T, O) {
        _ = le(function() {
          T(c.unstable_now());
        }, O);
      }
      c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(T) {
        T.callback = null;
      }, c.unstable_forceFrameRate = function(T) {
        0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < T ? Math.floor(1e3 / T) : 5;
      }, c.unstable_getCurrentPriorityLevel = function() {
        return G;
      }, c.unstable_next = function(T) {
        switch (G) {
          case 1:
          case 2:
          case 3:
            var O = 3;
            break;
          default:
            O = G;
        }
        var ee = G;
        G = O;
        try {
          return T();
        } finally {
          G = ee;
        }
      }, c.unstable_requestPaint = function() {
        $ = true;
      }, c.unstable_runWithPriority = function(T, O) {
        switch (T) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            T = 3;
        }
        var ee = G;
        G = T;
        try {
          return O();
        } finally {
          G = ee;
        }
      }, c.unstable_scheduleCallback = function(T, O, ee) {
        var fe = c.unstable_now();
        switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? fe + ee : fe) : ee = fe, T) {
          case 1:
            var xe = -1;
            break;
          case 2:
            xe = 250;
            break;
          case 5:
            xe = 1073741823;
            break;
          case 4:
            xe = 1e4;
            break;
          default:
            xe = 5e3;
        }
        return xe = ee + xe, T = {
          id: S++,
          callback: O,
          priorityLevel: T,
          startTime: ee,
          expirationTime: xe,
          sortIndex: -1
        }, ee > fe ? (T.sortIndex = ee, o(p, T), f(M) === null && T === f(p) && (I ? (me(_), _ = -1) : I = true, F(K, ee - fe))) : (T.sortIndex = xe, o(M, T), g || X || (g = true, ae || (ae = true, Ce()))), T;
      }, c.unstable_shouldYield = Z, c.unstable_wrapCallback = function(T) {
        var O = G;
        return function() {
          var ee = G;
          G = O;
          try {
            return T.apply(this, arguments);
          } finally {
            G = ee;
          }
        };
      };
    })(Wu)), Wu;
  }
  var Mm;
  function Zg() {
    return Mm || (Mm = 1, Iu.exports = Vg()), Iu.exports;
  }
  var Pu = {
    exports: {}
  }, yt = {};
  var jm;
  function Kg() {
    if (jm) return yt;
    jm = 1;
    var c = mo();
    function o(M) {
      var p = "https://react.dev/errors/" + M;
      if (1 < arguments.length) {
        p += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var S = 2; S < arguments.length; S++) p += "&args[]=" + encodeURIComponent(arguments[S]);
      }
      return "Minified React error #" + M + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
    function y(M, p, S) {
      var Y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: m,
        key: Y == null ? null : "" + Y,
        children: M,
        containerInfo: p,
        implementation: S
      };
    }
    var j = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function A(M, p) {
      if (M === "font") return "";
      if (typeof p == "string") return p === "use-credentials" ? p : "";
    }
    return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, yt.createPortal = function(M, p) {
      var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11) throw Error(o(299));
      return y(M, p, null, S);
    }, yt.flushSync = function(M) {
      var p = j.T, S = r.p;
      try {
        if (j.T = null, r.p = 2, M) return M();
      } finally {
        j.T = p, r.p = S, r.d.f();
      }
    }, yt.preconnect = function(M, p) {
      typeof M == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(M, p));
    }, yt.prefetchDNS = function(M) {
      typeof M == "string" && r.d.D(M);
    }, yt.preinit = function(M, p) {
      if (typeof M == "string" && p && typeof p.as == "string") {
        var S = p.as, Y = A(S, p.crossOrigin), G = typeof p.integrity == "string" ? p.integrity : void 0, X = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        S === "style" ? r.d.S(M, typeof p.precedence == "string" ? p.precedence : void 0, {
          crossOrigin: Y,
          integrity: G,
          fetchPriority: X
        }) : S === "script" && r.d.X(M, {
          crossOrigin: Y,
          integrity: G,
          fetchPriority: X,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0
        });
      }
    }, yt.preinitModule = function(M, p) {
      if (typeof M == "string") if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var S = A(p.as, p.crossOrigin);
          r.d.M(M, {
            crossOrigin: S,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && r.d.M(M);
    }, yt.preload = function(M, p) {
      if (typeof M == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
        var S = p.as, Y = A(S, p.crossOrigin);
        r.d.L(M, S, {
          crossOrigin: Y,
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
    }, yt.preloadModule = function(M, p) {
      if (typeof M == "string") if (p) {
        var S = A(p.as, p.crossOrigin);
        r.d.m(M, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: S,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else r.d.m(M);
    }, yt.requestFormReset = function(M) {
      r.d.r(M);
    }, yt.unstable_batchedUpdates = function(M, p) {
      return M(p);
    }, yt.useFormState = function(M, p, S) {
      return j.H.useFormState(M, p, S);
    }, yt.useFormStatus = function() {
      return j.H.useHostTransitionStatus();
    }, yt.version = "19.2.7", yt;
  }
  var Am;
  function Jg() {
    if (Am) return Pu.exports;
    Am = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
    }
    return c(), Pu.exports = Kg(), Pu.exports;
  }
  var Em;
  function Fg() {
    if (Em) return oi;
    Em = 1;
    var c = Zg(), o = mo(), f = Jg();
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
    function j(e) {
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
    function M(e) {
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
            if (s === a) return M(l), e;
            if (s === n) return M(l), t;
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
    var Y = Object.assign, G = Symbol.for("react.element"), X = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), me = Symbol.for("react.consumer"), ce = Symbol.for("react.context"), pe = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), Z = Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
    function Ce(e) {
      return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var Ne = Symbol.for("react.client.reference");
    function Re(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === Ne ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case I:
          return "Fragment";
        case le:
          return "Profiler";
        case $:
          return "StrictMode";
        case K:
          return "Suspense";
        case ae:
          return "SuspenseList";
        case U:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case g:
          return "Portal";
        case ce:
          return e.displayName || "Context";
        case me:
          return (e._context.displayName || "Context") + ".Consumer";
        case pe:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _:
          return t = e.displayName || null, t !== null ? t : Re(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return Re(e(t));
          } catch {
          }
      }
      return null;
    }
    var F = Array.isArray, T = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, fe = [], xe = -1;
    function v(e) {
      return {
        current: e
      };
    }
    function B(e) {
      0 > xe || (e.current = fe[xe], fe[xe] = null, xe--);
    }
    function W(e, t) {
      xe++, fe[xe] = e.current, e.current = t;
    }
    var ie = v(null), ge = v(null), ve = v(null), _e = v(null);
    function at(e, t) {
      switch (W(ve, t), W(ge, e), W(ie, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Gf(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = Gf(t), e = Yf(t, e);
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
      B(ie), W(ie, e);
    }
    function Ke() {
      B(ie), B(ge), B(ve);
    }
    function vt(e) {
      e.memoizedState !== null && W(_e, e);
      var t = ie.current, a = Yf(t, e.type);
      t !== a && (W(ge, e), W(ie, a));
    }
    function Ta(e) {
      ge.current === e && (B(ie), B(ge)), _e.current === e && (B(_e), li._currentValue = ee);
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
                  } catch (D) {
                    var R = D;
                  }
                  Reflect.construct(e, [], Q);
                } else {
                  try {
                    Q.call();
                  } catch (D) {
                    R = D;
                  }
                  e.call(Q.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (D) {
                  R = D;
                }
                (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
                });
              }
            } catch (D) {
              if (D && R && typeof D.stack == "string") return [
                D.stack,
                R.stack
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
`), N = d.split(`
`);
          for (l = n = 0; n < h.length && !h[n].includes("DetermineComponentFrameRoot"); ) n++;
          for (; l < N.length && !N[l].includes("DetermineComponentFrameRoot"); ) l++;
          if (n === h.length || l === N.length) for (n = h.length - 1, l = N.length - 1; 1 <= n && 0 <= l && h[n] !== N[l]; ) l--;
          for (; 1 <= n && 0 <= l; n--, l--) if (h[n] !== N[l]) {
            if (n !== 1 || l !== 1) do
              if (n--, l--, 0 > l || h[n] !== N[l]) {
                var k = `
` + h[n].replace(" at new ", " at ");
                return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
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
    function re(e) {
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
    var w = Object.prototype.hasOwnProperty, C = c.unstable_scheduleCallback, V = c.unstable_cancelCallback, ne = c.unstable_shouldYield, J = c.unstable_requestPaint, P = c.unstable_now, oe = c.unstable_getCurrentPriorityLevel, Ve = c.unstable_ImmediatePriority, nt = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, Wt = c.unstable_LowPriority, _a2 = c.unstable_IdlePriority, jh = c.log, Ah = c.unstable_setDisableYieldValue, gl = null, Rt = null;
    function Da(e) {
      if (typeof jh == "function" && Ah(e), Rt && typeof Rt.setStrictMode == "function") try {
        Rt.setStrictMode(gl, e);
      } catch {
      }
    }
    var Tt = Math.clz32 ? Math.clz32 : Nh, Eh = Math.log, Ch = Math.LN2;
    function Nh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Eh(e) / Ch | 0) | 0;
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
    function Rh(e, t) {
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
    function wo() {
      var e = pi;
      return pi <<= 1, (pi & 62914560) === 0 && (pi = 4194304), e;
    }
    function Ls(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function vl(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Th(e, t, a, n, l, s) {
      var u = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var d = e.entanglements, h = e.expirationTimes, N = e.hiddenUpdates;
      for (a = u & ~a; 0 < a; ) {
        var k = 31 - Tt(a), Q = 1 << k;
        d[k] = 0, h[k] = -1;
        var R = N[k];
        if (R !== null) for (N[k] = null, k = 0; k < R.length; k++) {
          var D = R[k];
          D !== null && (D.lane &= -536870913);
        }
        a &= ~Q;
      }
      n !== 0 && xo(e, n, 0), s !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(u & ~t));
    }
    function xo(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var n = 31 - Tt(t);
      e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930;
    }
    function Mo(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var n = 31 - Tt(a), l = 1 << n;
        l & t | e[n] & t && (e[n] |= t), a &= ~l;
      }
    }
    function jo(e, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : ks(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
    }
    function ks(e) {
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
    function qs(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Ao() {
      var e = O.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dm(e.type));
    }
    function Eo(e, t) {
      var a = O.p;
      try {
        return O.p = e, t();
      } finally {
        O.p = a;
      }
    }
    var Ua = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Ua, wt = "__reactProps$" + Ua, Tn = "__reactContainer$" + Ua, Bs = "__reactEvents$" + Ua, zh = "__reactListeners$" + Ua, _h = "__reactHandles$" + Ua, Co = "__reactResources$" + Ua, bl = "__reactMarker$" + Ua;
    function Hs(e) {
      delete e[ft], delete e[wt], delete e[Bs], delete e[zh], delete e[_h];
    }
    function zn(e) {
      var t = e[ft];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Tn] || a[ft]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (e = Ff(e); e !== null; ) {
            if (a = e[ft]) return a;
            e = Ff(e);
          }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function _n(e) {
      if (e = e[ft] || e[Tn]) {
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
    function Dn(e) {
      var t = e[Co];
      return t || (t = e[Co] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function ot(e) {
      e[bl] = true;
    }
    var No = /* @__PURE__ */ new Set(), Ro = {};
    function on(e, t) {
      Un(e, t), Un(e + "Capture", t);
    }
    function Un(e, t) {
      for (Ro[e] = t, e = 0; e < t.length; e++) No.add(t[e]);
    }
    var Dh = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), To = {}, zo = {};
    function Uh(e) {
      return w.call(zo, e) ? true : w.call(To, e) ? false : Dh.test(e) ? zo[e] = true : (To[e] = true, false);
    }
    function yi(e, t, a) {
      if (Uh(t)) if (a === null) e.removeAttribute(t);
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
    function _o(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Oh(e, t, a) {
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
    function Gs(e) {
      if (!e._valueTracker) {
        var t = _o(e) ? "checked" : "value";
        e._valueTracker = Oh(e, t, "" + e[t]);
      }
    }
    function Do(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var a = t.getValue(), n = "";
      return e && (n = _o(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), true) : false;
    }
    function bi(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Lh = /[\n"\\]/g;
    function Ht(e) {
      return e.replace(Lh, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Ys(e, t, a, n, l, s, u, d) {
      e.name = "", u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" ? e.type = u : e.removeAttribute("type"), t != null ? u === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Bt(t)) : e.value !== "" + Bt(t) && (e.value = "" + Bt(t)) : u !== "submit" && u !== "reset" || e.removeAttribute("value"), t != null ? Qs(e, u, Bt(t)) : a != null ? Qs(e, u, Bt(a)) : n != null && e.removeAttribute("value"), l == null && s != null && (e.defaultChecked = !!s), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Bt(d) : e.removeAttribute("name");
    }
    function Uo(e, t, a, n, l, s, u, d) {
      if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || a != null) {
        if (!(s !== "submit" && s !== "reset" || t != null)) {
          Gs(e);
          return;
        }
        a = a != null ? "" + Bt(a) : "", t = t != null ? "" + Bt(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = n ?? l, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = d ? e.checked : !!n, e.defaultChecked = !!n, u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.name = u), Gs(e);
    }
    function Qs(e, t, a) {
      t === "number" && bi(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function On(e, t, a, n) {
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
    function Oo(e, t, a) {
      if (t != null && (t = "" + Bt(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Bt(a) : "";
    }
    function Lo(e, t, a, n) {
      if (t == null) {
        if (n != null) {
          if (a != null) throw Error(r(92));
          if (F(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          a = n;
        }
        a == null && (a = ""), t = a;
      }
      a = Bt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Gs(e);
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
    var kh = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function ko(e, t, a) {
      var n = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || kh.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
    }
    function qo(e, t, a) {
      if (t != null && typeof t != "object") throw Error(r(62));
      if (e = e.style, a != null) {
        for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
        for (var l in t) n = t[l], t.hasOwnProperty(l) && a[l] !== n && ko(e, l, n);
      } else for (var s in t) t.hasOwnProperty(s) && ko(e, s, t[s]);
    }
    function Xs(e) {
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
    var qh = /* @__PURE__ */ new Map([
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
    ]), Bh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Si(e) {
      return Bh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function da() {
    }
    var Vs = null;
    function Zs(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var kn = null, qn = null;
    function Bo(e) {
      var t = _n(e);
      if (t && (e = t.stateNode)) {
        var a = e[wt] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Ys(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Ht("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                var n = a[t];
                if (n !== e && n.form === e.form) {
                  var l = n[wt] || null;
                  if (!l) throw Error(r(90));
                  Ys(n, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name);
                }
              }
              for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && Do(n);
            }
            break e;
          case "textarea":
            Oo(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && On(e, !!a.multiple, t, false);
        }
      }
    }
    var Ks = false;
    function Ho(e, t, a) {
      if (Ks) return e(t, a);
      Ks = true;
      try {
        var n = e(t);
        return n;
      } finally {
        if (Ks = false, (kn !== null || qn !== null) && (cs(), kn && (t = kn, e = qn, qn = kn = null, Bo(t), e))) for (t = 0; t < e.length; t++) Bo(e[t]);
      }
    }
    function wl(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var n = a[wt] || null;
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
    var fa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Js = false;
    if (fa) try {
      var xl = {};
      Object.defineProperty(xl, "passive", {
        get: function() {
          Js = true;
        }
      }), window.addEventListener("test", xl, xl), window.removeEventListener("test", xl, xl);
    } catch {
      Js = false;
    }
    var Oa = null, Fs = null, wi = null;
    function Go() {
      if (wi) return wi;
      var e, t = Fs, a = t.length, n, l = "value" in Oa ? Oa.value : Oa.textContent, s = l.length;
      for (e = 0; e < a && t[e] === l[e]; e++) ;
      var u = a - e;
      for (n = 1; n <= u && t[a - n] === l[s - n]; n++) ;
      return wi = l.slice(e, 1 < n ? 1 - n : void 0);
    }
    function xi(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Mi() {
      return true;
    }
    function Yo() {
      return false;
    }
    function xt(e) {
      function t(a, n, l, s, u) {
        this._reactName = a, this._targetInst = l, this.type = n, this.nativeEvent = s, this.target = u, this.currentTarget = null;
        for (var d in e) e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(s) : s[d]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === false) ? Mi : Yo, this.isPropagationStopped = Yo, this;
      }
      return Y(t.prototype, {
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
    }, ji = xt(rn), Ml = Y({}, rn, {
      view: 0,
      detail: 0
    }), Hh = xt(Ml), $s, Is, jl, Ai = Y({}, Ml, {
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
      getModifierState: Ps,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== jl && (jl && e.type === "mousemove" ? ($s = e.screenX - jl.screenX, Is = e.screenY - jl.screenY) : Is = $s = 0, jl = e), $s);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Is;
      }
    }), Qo = xt(Ai), Gh = Y({}, Ai, {
      dataTransfer: 0
    }), Yh = xt(Gh), Qh = Y({}, Ml, {
      relatedTarget: 0
    }), Ws = xt(Qh), Xh = Y({}, rn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Vh = xt(Xh), Zh = Y({}, rn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Kh = xt(Zh), Jh = Y({}, rn, {
      data: 0
    }), Xo = xt(Jh), Fh = {
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
    }, $h = {
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
    }, Ih = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Wh(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Ih[e]) ? !!t[e] : false;
    }
    function Ps() {
      return Wh;
    }
    var Ph = Y({}, Ml, {
      key: function(e) {
        if (e.key) {
          var t = Fh[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = xi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $h[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ps,
      charCode: function(e) {
        return e.type === "keypress" ? xi(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? xi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ep = xt(Ph), tp = Y({}, Ai, {
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
    }), Vo = xt(tp), ap = Y({}, Ml, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ps
    }), np = xt(ap), lp = Y({}, rn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), ip = xt(lp), sp = Y({}, Ai, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), cp = xt(sp), up = Y({}, rn, {
      newState: 0,
      oldState: 0
    }), op = xt(up), rp = [
      9,
      13,
      27,
      32
    ], ec = fa && "CompositionEvent" in window, Al = null;
    fa && "documentMode" in document && (Al = document.documentMode);
    var dp = fa && "TextEvent" in window && !Al, Zo = fa && (!ec || Al && 8 < Al && 11 >= Al), Ko = " ", Jo = false;
    function Fo(e, t) {
      switch (e) {
        case "keyup":
          return rp.indexOf(t.keyCode) !== -1;
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
    function $o(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var Bn = false;
    function fp(e, t) {
      switch (e) {
        case "compositionend":
          return $o(t);
        case "keypress":
          return t.which !== 32 ? null : (Jo = true, Ko);
        case "textInput":
          return e = t.data, e === Ko && Jo ? null : e;
        default:
          return null;
      }
    }
    function mp(e, t) {
      if (Bn) return e === "compositionend" || !ec && Fo(e, t) ? (e = Go(), wi = Fs = Oa = null, Bn = false, e) : null;
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
          return Zo && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var hp = {
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
    function Io(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!hp[e.type] : t === "textarea";
    }
    function Wo(e, t, a, n) {
      kn ? qn ? qn.push(n) : qn = [
        n
      ] : kn = n, t = hs(t, "onChange"), 0 < t.length && (a = new ji("onChange", "change", null, a, n), e.push({
        event: a,
        listeners: t
      }));
    }
    var El = null, Cl = null;
    function pp(e) {
      Of(e, 0);
    }
    function Ei(e) {
      var t = Sl(e);
      if (Do(t)) return e;
    }
    function Po(e, t) {
      if (e === "change") return t;
    }
    var er = false;
    if (fa) {
      var tc;
      if (fa) {
        var ac = "oninput" in document;
        if (!ac) {
          var tr = document.createElement("div");
          tr.setAttribute("oninput", "return;"), ac = typeof tr.oninput == "function";
        }
        tc = ac;
      } else tc = false;
      er = tc && (!document.documentMode || 9 < document.documentMode);
    }
    function ar() {
      El && (El.detachEvent("onpropertychange", nr), Cl = El = null);
    }
    function nr(e) {
      if (e.propertyName === "value" && Ei(Cl)) {
        var t = [];
        Wo(t, Cl, e, Zs(e)), Ho(pp, t);
      }
    }
    function gp(e, t, a) {
      e === "focusin" ? (ar(), El = t, Cl = a, El.attachEvent("onpropertychange", nr)) : e === "focusout" && ar();
    }
    function yp(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ei(Cl);
    }
    function vp(e, t) {
      if (e === "click") return Ei(t);
    }
    function bp(e, t) {
      if (e === "input" || e === "change") return Ei(t);
    }
    function Sp(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var zt = typeof Object.is == "function" ? Object.is : Sp;
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
    function lr(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ir(e, t) {
      var a = lr(e);
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
        a = lr(a);
      }
    }
    function sr(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? sr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function cr(e) {
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
    function nc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var wp = fa && "documentMode" in document && 11 >= document.documentMode, Hn = null, lc = null, Rl = null, ic = false;
    function ur(e, t, a) {
      var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      ic || Hn == null || Hn !== bi(n) || (n = Hn, "selectionStart" in n && nc(n) ? n = {
        start: n.selectionStart,
        end: n.selectionEnd
      } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), Rl && Nl(Rl, n) || (Rl = n, n = hs(lc, "onSelect"), 0 < n.length && (t = new ji("onSelect", "select", null, t, a), e.push({
        event: t,
        listeners: n
      }), t.target = Hn)));
    }
    function dn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Gn = {
      animationend: dn("Animation", "AnimationEnd"),
      animationiteration: dn("Animation", "AnimationIteration"),
      animationstart: dn("Animation", "AnimationStart"),
      transitionrun: dn("Transition", "TransitionRun"),
      transitionstart: dn("Transition", "TransitionStart"),
      transitioncancel: dn("Transition", "TransitionCancel"),
      transitionend: dn("Transition", "TransitionEnd")
    }, sc = {}, or = {};
    fa && (or = document.createElement("div").style, "AnimationEvent" in window || (delete Gn.animationend.animation, delete Gn.animationiteration.animation, delete Gn.animationstart.animation), "TransitionEvent" in window || delete Gn.transitionend.transition);
    function fn(e) {
      if (sc[e]) return sc[e];
      if (!Gn[e]) return e;
      var t = Gn[e], a;
      for (a in t) if (t.hasOwnProperty(a) && a in or) return sc[e] = t[a];
      return e;
    }
    var rr = fn("animationend"), dr = fn("animationiteration"), fr = fn("animationstart"), xp = fn("transitionrun"), Mp = fn("transitionstart"), jp = fn("transitioncancel"), mr = fn("transitionend"), hr = /* @__PURE__ */ new Map(), cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    cc.push("scrollEnd");
    function Pt(e, t) {
      hr.set(e, t), on(t, [
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
    }, Gt = [], Yn = 0, uc = 0;
    function Ni() {
      for (var e = Yn, t = uc = Yn = 0; t < e; ) {
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
        s !== 0 && pr(a, l, s);
      }
    }
    function Ri(e, t, a, n) {
      Gt[Yn++] = e, Gt[Yn++] = t, Gt[Yn++] = a, Gt[Yn++] = n, uc |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
    }
    function oc(e, t, a, n) {
      return Ri(e, t, a, n), Ti(e);
    }
    function mn(e, t) {
      return Ri(e, null, null, t), Ti(e);
    }
    function pr(e, t, a) {
      e.lanes |= a;
      var n = e.alternate;
      n !== null && (n.lanes |= a);
      for (var l = false, s = e.return; s !== null; ) s.childLanes |= a, n = s.alternate, n !== null && (n.childLanes |= a), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (l = true)), e = s, s = s.return;
      return e.tag === 3 ? (s = e.stateNode, l && t !== null && (l = 31 - Tt(a), e = s.hiddenUpdates, n = e[l], n === null ? e[l] = [
        t
      ] : n.push(t), t.lane = a | 536870912), s) : null;
    }
    function Ti(e) {
      if (50 < Il) throw Il = 0, vu = null, Error(r(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var Qn = {};
    function Ap(e, t, a, n) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function _t(e, t, a, n) {
      return new Ap(e, t, a, n);
    }
    function rc(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function ma(e, t) {
      var a = e.alternate;
      return a === null ? (a = _t(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
    }
    function gr(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function zi(e, t, a, n, l, s) {
      var u = 0;
      if (n = e, typeof e == "function") rc(e) && (u = 1);
      else if (typeof e == "string") u = Tg(e, a, ie.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case U:
          return e = _t(31, a, t, l), e.elementType = U, e.lanes = s, e;
        case I:
          return hn(a.children, l, s, t);
        case $:
          u = 8, l |= 24;
          break;
        case le:
          return e = _t(12, a, t, l | 2), e.elementType = le, e.lanes = s, e;
        case K:
          return e = _t(13, a, t, l), e.elementType = K, e.lanes = s, e;
        case ae:
          return e = _t(19, a, t, l), e.elementType = ae, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case ce:
              u = 10;
              break e;
            case me:
              u = 9;
              break e;
            case pe:
              u = 11;
              break e;
            case _:
              u = 14;
              break e;
            case L:
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
    function dc(e, t, a) {
      return e = _t(6, e, null, t), e.lanes = a, e;
    }
    function yr(e) {
      var t = _t(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function fc(e, t, a) {
      return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var vr = /* @__PURE__ */ new WeakMap();
    function Yt(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = vr.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: re(t)
        }, vr.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: re(t)
      };
    }
    var Xn = [], Vn = 0, _i = null, Tl = 0, Qt = [], Xt = 0, La = null, aa = 1, na = "";
    function ha(e, t) {
      Xn[Vn++] = Tl, Xn[Vn++] = _i, _i = e, Tl = t;
    }
    function br(e, t, a) {
      Qt[Xt++] = aa, Qt[Xt++] = na, Qt[Xt++] = La, La = e;
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
    function mc(e) {
      e.return !== null && (ha(e, 1), br(e, 1, 0));
    }
    function hc(e) {
      for (; e === _i; ) _i = Xn[--Vn], Xn[Vn] = null, Tl = Xn[--Vn], Xn[Vn] = null;
      for (; e === La; ) La = Qt[--Xt], Qt[Xt] = null, na = Qt[--Xt], Qt[Xt] = null, aa = Qt[--Xt], Qt[Xt] = null;
    }
    function Sr(e, t) {
      Qt[Xt++] = aa, Qt[Xt++] = na, Qt[Xt++] = La, aa = t.id, na = t.overflow, La = e;
    }
    var mt = null, Je = null, De = false, ka = null, Vt = false, pc = Error(r(519));
    function qa(e) {
      var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw zl(Yt(t, e)), pc;
    }
    function wr(e) {
      var t = e.stateNode, a = e.type, n = e.memoizedProps;
      switch (t[ft] = e, t[wt] = n, a) {
        case "dialog":
          Ee("cancel", t), Ee("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Ee("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Pl.length; a++) Ee(Pl[a], t);
          break;
        case "source":
          Ee("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Ee("error", t), Ee("load", t);
          break;
        case "details":
          Ee("toggle", t);
          break;
        case "input":
          Ee("invalid", t), Uo(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
          break;
        case "select":
          Ee("invalid", t);
          break;
        case "textarea":
          Ee("invalid", t), Lo(t, n.value, n.defaultValue, n.children);
      }
      a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === true || Bf(t.textContent, a) ? (n.popover != null && (Ee("beforetoggle", t), Ee("toggle", t)), n.onScroll != null && Ee("scroll", t), n.onScrollEnd != null && Ee("scrollend", t), n.onClick != null && (t.onclick = da), t = true) : t = false, t || qa(e, true);
    }
    function xr(e) {
      for (mt = e.return; mt; ) switch (mt.tag) {
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
          mt = mt.return;
      }
    }
    function Zn(e) {
      if (e !== mt) return false;
      if (!De) return xr(e), De = true, false;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Du(e.type, e.memoizedProps)), a = !a), a && Je && qa(e), xr(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Je = Jf(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Je = Jf(e);
      } else t === 27 ? (t = Je, Wa(e.type) ? (e = qu, qu = null, Je = e) : Je = t) : Je = mt ? Kt(e.stateNode.nextSibling) : null;
      return true;
    }
    function pn() {
      Je = mt = null, De = false;
    }
    function gc() {
      var e = ka;
      return e !== null && (Et === null ? Et = e : Et.push.apply(Et, e), ka = null), e;
    }
    function zl(e) {
      ka === null ? ka = [
        e
      ] : ka.push(e);
    }
    var yc = v(null), gn = null, pa = null;
    function Ba(e, t, a) {
      W(yc, t._currentValue), t._currentValue = a;
    }
    function ga(e) {
      e._currentValue = yc.current, B(yc);
    }
    function vc(e, t, a) {
      for (; e !== null; ) {
        var n = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === a) break;
        e = e.return;
      }
    }
    function bc(e, t, a, n) {
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
              s.lanes |= a, d = s.alternate, d !== null && (d.lanes |= a), vc(s.return, a, e), n || (u = null);
              break e;
            }
            s = d.next;
          }
        } else if (l.tag === 18) {
          if (u = l.return, u === null) throw Error(r(341));
          u.lanes |= a, s = u.alternate, s !== null && (s.lanes |= a), vc(u, a, e), u = null;
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
    function Kn(e, t, a, n) {
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
      e !== null && bc(t, e, a, n), t.flags |= 262144;
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
      return Mr(gn, e);
    }
    function Ui(e, t) {
      return gn === null && yn(e), Mr(e, t);
    }
    function Mr(e, t) {
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
    var Ep = typeof AbortController < "u" ? AbortController : function() {
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
    }, Cp = c.unstable_scheduleCallback, Np = c.unstable_NormalPriority, lt = {
      $$typeof: ce,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function Sc() {
      return {
        controller: new Ep(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function _l(e) {
      e.refCount--, e.refCount === 0 && Cp(Np, function() {
        e.controller.abort();
      });
    }
    var Dl = null, wc = 0, Jn = 0, Fn = null;
    function Rp(e, t) {
      if (Dl === null) {
        var a = Dl = [];
        wc = 0, Jn = ju(), Fn = {
          status: "pending",
          value: void 0,
          then: function(n) {
            a.push(n);
          }
        };
      }
      return wc++, t.then(jr, jr), t;
    }
    function jr() {
      if (--wc === 0 && Dl !== null) {
        Fn !== null && (Fn.status = "fulfilled");
        var e = Dl;
        Dl = null, Jn = 0, Fn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Tp(e, t) {
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
    var Ar = T.S;
    T.S = function(e, t) {
      of = P(), typeof t == "object" && t !== null && typeof t.then == "function" && Rp(e, t), Ar !== null && Ar(e, t);
    };
    var vn = v(null);
    function xc() {
      var e = vn.current;
      return e !== null ? e : Xe.pooledCache;
    }
    function Oi(e, t) {
      t === null ? W(vn, vn.current) : W(vn, t.pool);
    }
    function Er() {
      var e = xc();
      return e === null ? null : {
        parent: lt._currentValue,
        pool: e
      };
    }
    var $n = Error(r(460)), Mc = Error(r(474)), Li = Error(r(542)), ki = {
      then: function() {
      }
    };
    function Cr(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Nr(e, t, a) {
      switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(da, da), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Tr(e), e;
        default:
          if (typeof t.status == "string") t.then(da, da);
          else {
            if (e = Xe, e !== null && 100 < e.shellSuspendCounter) throw Error(r(482));
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
              throw e = t.reason, Tr(e), e;
          }
          throw Sn = t, $n;
      }
    }
    function bn(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Sn = a, $n) : a;
      }
    }
    var Sn = null;
    function Rr() {
      if (Sn === null) throw Error(r(459));
      var e = Sn;
      return Sn = null, e;
    }
    function Tr(e) {
      if (e === $n || e === Li) throw Error(r(483));
    }
    var In = null, Ul = 0;
    function qi(e) {
      var t = Ul;
      return Ul += 1, In === null && (In = []), Nr(In, e, t);
    }
    function Ol(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Bi(e, t) {
      throw t.$$typeof === G ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function zr(e) {
      function t(x, b) {
        if (e) {
          var E = x.deletions;
          E === null ? (x.deletions = [
            b
          ], x.flags |= 16) : E.push(b);
        }
      }
      function a(x, b) {
        if (!e) return null;
        for (; b !== null; ) t(x, b), b = b.sibling;
        return null;
      }
      function n(x) {
        for (var b = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? b.set(x.key, x) : b.set(x.index, x), x = x.sibling;
        return b;
      }
      function l(x, b) {
        return x = ma(x, b), x.index = 0, x.sibling = null, x;
      }
      function s(x, b, E) {
        return x.index = E, e ? (E = x.alternate, E !== null ? (E = E.index, E < b ? (x.flags |= 67108866, b) : E) : (x.flags |= 67108866, b)) : (x.flags |= 1048576, b);
      }
      function u(x) {
        return e && x.alternate === null && (x.flags |= 67108866), x;
      }
      function d(x, b, E, H) {
        return b === null || b.tag !== 6 ? (b = dc(E, x.mode, H), b.return = x, b) : (b = l(b, E), b.return = x, b);
      }
      function h(x, b, E, H) {
        var de = E.type;
        return de === I ? k(x, b, E.props.children, H, E.key) : b !== null && (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && bn(de) === b.type) ? (b = l(b, E.props), Ol(b, E), b.return = x, b) : (b = zi(E.type, E.key, E.props, null, x.mode, H), Ol(b, E), b.return = x, b);
      }
      function N(x, b, E, H) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== E.containerInfo || b.stateNode.implementation !== E.implementation ? (b = fc(E, x.mode, H), b.return = x, b) : (b = l(b, E.children || []), b.return = x, b);
      }
      function k(x, b, E, H, de) {
        return b === null || b.tag !== 7 ? (b = hn(E, x.mode, H, de), b.return = x, b) : (b = l(b, E), b.return = x, b);
      }
      function Q(x, b, E) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return b = dc("" + b, x.mode, E), b.return = x, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case X:
              return E = zi(b.type, b.key, b.props, null, x.mode, E), Ol(E, b), E.return = x, E;
            case g:
              return b = fc(b, x.mode, E), b.return = x, b;
            case L:
              return b = bn(b), Q(x, b, E);
          }
          if (F(b) || Ce(b)) return b = hn(b, x.mode, E, null), b.return = x, b;
          if (typeof b.then == "function") return Q(x, qi(b), E);
          if (b.$$typeof === ce) return Q(x, Ui(x, b), E);
          Bi(x, b);
        }
        return null;
      }
      function R(x, b, E, H) {
        var de = b !== null ? b.key : null;
        if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return de !== null ? null : d(x, b, "" + E, H);
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case X:
              return E.key === de ? h(x, b, E, H) : null;
            case g:
              return E.key === de ? N(x, b, E, H) : null;
            case L:
              return E = bn(E), R(x, b, E, H);
          }
          if (F(E) || Ce(E)) return de !== null ? null : k(x, b, E, H, null);
          if (typeof E.then == "function") return R(x, b, qi(E), H);
          if (E.$$typeof === ce) return R(x, b, Ui(x, E), H);
          Bi(x, E);
        }
        return null;
      }
      function D(x, b, E, H, de) {
        if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint") return x = x.get(E) || null, d(b, x, "" + H, de);
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case X:
              return x = x.get(H.key === null ? E : H.key) || null, h(b, x, H, de);
            case g:
              return x = x.get(H.key === null ? E : H.key) || null, N(b, x, H, de);
            case L:
              return H = bn(H), D(x, b, E, H, de);
          }
          if (F(H) || Ce(H)) return x = x.get(E) || null, k(b, x, H, de, null);
          if (typeof H.then == "function") return D(x, b, E, qi(H), de);
          if (H.$$typeof === ce) return D(x, b, E, Ui(b, H), de);
          Bi(b, H);
        }
        return null;
      }
      function se(x, b, E, H) {
        for (var de = null, Ue = null, ue = b, we = b = 0, ze = null; ue !== null && we < E.length; we++) {
          ue.index > we ? (ze = ue, ue = null) : ze = ue.sibling;
          var Oe = R(x, ue, E[we], H);
          if (Oe === null) {
            ue === null && (ue = ze);
            break;
          }
          e && ue && Oe.alternate === null && t(x, ue), b = s(Oe, b, we), Ue === null ? de = Oe : Ue.sibling = Oe, Ue = Oe, ue = ze;
        }
        if (we === E.length) return a(x, ue), De && ha(x, we), de;
        if (ue === null) {
          for (; we < E.length; we++) ue = Q(x, E[we], H), ue !== null && (b = s(ue, b, we), Ue === null ? de = ue : Ue.sibling = ue, Ue = ue);
          return De && ha(x, we), de;
        }
        for (ue = n(ue); we < E.length; we++) ze = D(ue, x, we, E[we], H), ze !== null && (e && ze.alternate !== null && ue.delete(ze.key === null ? we : ze.key), b = s(ze, b, we), Ue === null ? de = ze : Ue.sibling = ze, Ue = ze);
        return e && ue.forEach(function(nn) {
          return t(x, nn);
        }), De && ha(x, we), de;
      }
      function he(x, b, E, H) {
        if (E == null) throw Error(r(151));
        for (var de = null, Ue = null, ue = b, we = b = 0, ze = null, Oe = E.next(); ue !== null && !Oe.done; we++, Oe = E.next()) {
          ue.index > we ? (ze = ue, ue = null) : ze = ue.sibling;
          var nn = R(x, ue, Oe.value, H);
          if (nn === null) {
            ue === null && (ue = ze);
            break;
          }
          e && ue && nn.alternate === null && t(x, ue), b = s(nn, b, we), Ue === null ? de = nn : Ue.sibling = nn, Ue = nn, ue = ze;
        }
        if (Oe.done) return a(x, ue), De && ha(x, we), de;
        if (ue === null) {
          for (; !Oe.done; we++, Oe = E.next()) Oe = Q(x, Oe.value, H), Oe !== null && (b = s(Oe, b, we), Ue === null ? de = Oe : Ue.sibling = Oe, Ue = Oe);
          return De && ha(x, we), de;
        }
        for (ue = n(ue); !Oe.done; we++, Oe = E.next()) Oe = D(ue, x, we, Oe.value, H), Oe !== null && (e && Oe.alternate !== null && ue.delete(Oe.key === null ? we : Oe.key), b = s(Oe, b, we), Ue === null ? de = Oe : Ue.sibling = Oe, Ue = Oe);
        return e && ue.forEach(function(Gg) {
          return t(x, Gg);
        }), De && ha(x, we), de;
      }
      function Ye(x, b, E, H) {
        if (typeof E == "object" && E !== null && E.type === I && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case X:
              e: {
                for (var de = E.key; b !== null; ) {
                  if (b.key === de) {
                    if (de = E.type, de === I) {
                      if (b.tag === 7) {
                        a(x, b.sibling), H = l(b, E.props.children), H.return = x, x = H;
                        break e;
                      }
                    } else if (b.elementType === de || typeof de == "object" && de !== null && de.$$typeof === L && bn(de) === b.type) {
                      a(x, b.sibling), H = l(b, E.props), Ol(H, E), H.return = x, x = H;
                      break e;
                    }
                    a(x, b);
                    break;
                  } else t(x, b);
                  b = b.sibling;
                }
                E.type === I ? (H = hn(E.props.children, x.mode, H, E.key), H.return = x, x = H) : (H = zi(E.type, E.key, E.props, null, x.mode, H), Ol(H, E), H.return = x, x = H);
              }
              return u(x);
            case g:
              e: {
                for (de = E.key; b !== null; ) {
                  if (b.key === de) if (b.tag === 4 && b.stateNode.containerInfo === E.containerInfo && b.stateNode.implementation === E.implementation) {
                    a(x, b.sibling), H = l(b, E.children || []), H.return = x, x = H;
                    break e;
                  } else {
                    a(x, b);
                    break;
                  }
                  else t(x, b);
                  b = b.sibling;
                }
                H = fc(E, x.mode, H), H.return = x, x = H;
              }
              return u(x);
            case L:
              return E = bn(E), Ye(x, b, E, H);
          }
          if (F(E)) return se(x, b, E, H);
          if (Ce(E)) {
            if (de = Ce(E), typeof de != "function") throw Error(r(150));
            return E = de.call(E), he(x, b, E, H);
          }
          if (typeof E.then == "function") return Ye(x, b, qi(E), H);
          if (E.$$typeof === ce) return Ye(x, b, Ui(x, E), H);
          Bi(x, E);
        }
        return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, b !== null && b.tag === 6 ? (a(x, b.sibling), H = l(b, E), H.return = x, x = H) : (a(x, b), H = dc(E, x.mode, H), H.return = x, x = H), u(x)) : a(x, b);
      }
      return function(x, b, E, H) {
        try {
          Ul = 0;
          var de = Ye(x, b, E, H);
          return In = null, de;
        } catch (ue) {
          if (ue === $n || ue === Li) throw ue;
          var Ue = _t(29, ue, null, x.mode);
          return Ue.lanes = H, Ue.return = x, Ue;
        } finally {
        }
      };
    }
    var wn = zr(true), _r = zr(false), Ha = false;
    function jc(e) {
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
    function Ac(e, t) {
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
      if (n = n.shared, (Le & 2) !== 0) {
        var l = n.pending;
        return l === null ? t.next = t : (t.next = l.next, l.next = t), n.pending = t, t = Ti(e), pr(e, null, a), t;
      }
      return Ri(e, n, t, a), Ti(e);
    }
    function Ll(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Mo(e, a);
      }
    }
    function Ec(e, t) {
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
    var Cc = false;
    function kl() {
      if (Cc) {
        var e = Fn;
        if (e !== null) throw e;
      }
    }
    function ql(e, t, a, n) {
      Cc = false;
      var l = e.updateQueue;
      Ha = false;
      var s = l.firstBaseUpdate, u = l.lastBaseUpdate, d = l.shared.pending;
      if (d !== null) {
        l.shared.pending = null;
        var h = d, N = h.next;
        h.next = null, u === null ? s = N : u.next = N, u = h;
        var k = e.alternate;
        k !== null && (k = k.updateQueue, d = k.lastBaseUpdate, d !== u && (d === null ? k.firstBaseUpdate = N : d.next = N, k.lastBaseUpdate = h));
      }
      if (s !== null) {
        var Q = l.baseState;
        u = 0, k = N = h = null, d = s;
        do {
          var R = d.lane & -536870913, D = R !== d.lane;
          if (D ? (Te & R) === R : (n & R) === R) {
            R !== 0 && R === Jn && (Cc = true), k !== null && (k = k.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            e: {
              var se = e, he = d;
              R = t;
              var Ye = a;
              switch (he.tag) {
                case 1:
                  if (se = he.payload, typeof se == "function") {
                    Q = se.call(Ye, Q, R);
                    break e;
                  }
                  Q = se;
                  break e;
                case 3:
                  se.flags = se.flags & -65537 | 128;
                case 0:
                  if (se = he.payload, R = typeof se == "function" ? se.call(Ye, Q, R) : se, R == null) break e;
                  Q = Y({}, Q, R);
                  break e;
                case 2:
                  Ha = true;
              }
            }
            R = d.callback, R !== null && (e.flags |= 64, D && (e.flags |= 8192), D = l.callbacks, D === null ? l.callbacks = [
              R
            ] : D.push(R));
          } else D = {
            lane: R,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, k === null ? (N = k = D, h = Q) : k = k.next = D, u |= R;
          if (d = d.next, d === null) {
            if (d = l.shared.pending, d === null) break;
            D = d, d = D.next, D.next = null, l.lastBaseUpdate = D, l.shared.pending = null;
          }
        } while (true);
        k === null && (h = Q), l.baseState = h, l.firstBaseUpdate = N, l.lastBaseUpdate = k, s === null && (l.shared.lanes = 0), Ka |= u, e.lanes = u, e.memoizedState = Q;
      }
    }
    function Dr(e, t) {
      if (typeof e != "function") throw Error(r(191, e));
      e.call(t);
    }
    function Ur(e, t) {
      var a = e.callbacks;
      if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Dr(a[e], t);
    }
    var Wn = v(null), Hi = v(0);
    function Or(e, t) {
      e = Aa, W(Hi, e), W(Wn, t), Aa = e | t.baseLanes;
    }
    function Nc() {
      W(Hi, Aa), W(Wn, Wn.current);
    }
    function Rc() {
      Aa = Hi.current, B(Wn), B(Hi);
    }
    var Dt = v(null), Zt = null;
    function Qa(e) {
      var t = e.alternate;
      W(Pe, Pe.current & 1), W(Dt, e), Zt === null && (t === null || Wn.current !== null || t.memoizedState !== null) && (Zt = e);
    }
    function Tc(e) {
      W(Pe, Pe.current), W(Dt, e), Zt === null && (Zt = e);
    }
    function Lr(e) {
      e.tag === 22 ? (W(Pe, Pe.current), W(Dt, e), Zt === null && (Zt = e)) : Xa();
    }
    function Xa() {
      W(Pe, Pe.current), W(Dt, Dt.current);
    }
    function Ut(e) {
      B(Dt), Zt === e && (Zt = null), B(Pe);
    }
    var Pe = v(0);
    function Gi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || Lu(a) || ku(a))) return t;
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
    var ya = 0, be = null, He = null, it = null, Yi = false, Pn = false, xn = false, Qi = 0, Bl = 0, el = null, zp = 0;
    function Ie() {
      throw Error(r(321));
    }
    function zc(e, t) {
      if (t === null) return false;
      for (var a = 0; a < t.length && a < e.length; a++) if (!zt(e[a], t[a])) return false;
      return true;
    }
    function _c(e, t, a, n, l, s) {
      return ya = s, be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? bd : Kc, xn = false, s = a(n, l), xn = false, Pn && (s = qr(t, a, n, l)), kr(e), s;
    }
    function kr(e) {
      T.H = Yl;
      var t = He !== null && He.next !== null;
      if (ya = 0, it = He = be = null, Yi = false, Bl = 0, el = null, t) throw Error(r(300));
      e === null || st || (e = e.dependencies, e !== null && Di(e) && (st = true));
    }
    function qr(e, t, a, n) {
      be = e;
      var l = 0;
      do {
        if (Pn && (el = null), Bl = 0, Pn = false, 25 <= l) throw Error(r(301));
        if (l += 1, it = He = null, e.updateQueue != null) {
          var s = e.updateQueue;
          s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
        }
        T.H = Sd, s = t(a, n);
      } while (Pn);
      return s;
    }
    function _p() {
      var e = T.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Hl(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (be.flags |= 1024), t;
    }
    function Dc() {
      var e = Qi !== 0;
      return Qi = 0, e;
    }
    function Uc(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
    }
    function Oc(e) {
      if (Yi) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Yi = false;
      }
      ya = 0, it = He = be = null, Pn = false, Bl = Qi = 0, el = null;
    }
    function bt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return it === null ? be.memoizedState = it = e : it = it.next = e, it;
    }
    function et() {
      if (He === null) {
        var e = be.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = He.next;
      var t = it === null ? be.memoizedState : it.next;
      if (t !== null) it = t, He = e;
      else {
        if (e === null) throw be.alternate === null ? Error(r(467)) : Error(r(310));
        He = e, e = {
          memoizedState: He.memoizedState,
          baseState: He.baseState,
          baseQueue: He.baseQueue,
          queue: He.queue,
          next: null
        }, it === null ? be.memoizedState = it = e : it = it.next = e;
      }
      return it;
    }
    function Xi() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function Hl(e) {
      var t = Bl;
      return Bl += 1, el === null && (el = []), e = Nr(el, e, t), t = be, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? bd : Kc), e;
    }
    function Vi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Hl(e);
        if (e.$$typeof === ce) return ht(e);
      }
      throw Error(r(438, String(e)));
    }
    function Lc(e) {
      var t = null, a = be.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var n = be.alternate;
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
      }), a === null && (a = Xi(), be.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = Z;
      return t.index++, a;
    }
    function va(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Zi(e) {
      var t = et();
      return kc(t, He, e);
    }
    function kc(e, t, a) {
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
        var d = u = null, h = null, N = t, k = false;
        do {
          var Q = N.lane & -536870913;
          if (Q !== N.lane ? (Te & Q) === Q : (ya & Q) === Q) {
            var R = N.revertLane;
            if (R === 0) h !== null && (h = h.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), Q === Jn && (k = true);
            else if ((ya & R) === R) {
              N = N.next, R === Jn && (k = true);
              continue;
            } else Q = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, h === null ? (d = h = Q, u = s) : h = h.next = Q, be.lanes |= R, Ka |= R;
            Q = N.action, xn && a(s, Q), s = N.hasEagerState ? N.eagerState : a(s, Q);
          } else R = {
            lane: Q,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, h === null ? (d = h = R, u = s) : h = h.next = R, be.lanes |= Q, Ka |= Q;
          N = N.next;
        } while (N !== null && N !== t);
        if (h === null ? u = s : h.next = d, !zt(s, e.memoizedState) && (st = true, k && (a = Fn, a !== null))) throw a;
        e.memoizedState = s, e.baseState = u, e.baseQueue = h, n.lastRenderedState = s;
      }
      return l === null && (n.lanes = 0), [
        e.memoizedState,
        n.dispatch
      ];
    }
    function qc(e) {
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
    function Br(e, t, a) {
      var n = be, l = et(), s = De;
      if (s) {
        if (a === void 0) throw Error(r(407));
        a = a();
      } else a = t();
      var u = !zt((He || l).memoizedState, a);
      if (u && (l.memoizedState = a, st = true), l = l.queue, Gc(Yr.bind(null, n, l, e), [
        e
      ]), l.getSnapshot !== t || u || it !== null && it.memoizedState.tag & 1) {
        if (n.flags |= 2048, tl(9, {
          destroy: void 0
        }, Gr.bind(null, n, l, a, t), null), Xe === null) throw Error(r(349));
        s || (ya & 127) !== 0 || Hr(n, t, a);
      }
      return a;
    }
    function Hr(e, t, a) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: a
      }, t = be.updateQueue, t === null ? (t = Xi(), be.updateQueue = t, t.stores = [
        e
      ]) : (a = t.stores, a === null ? t.stores = [
        e
      ] : a.push(e));
    }
    function Gr(e, t, a, n) {
      t.value = a, t.getSnapshot = n, Qr(t) && Xr(e);
    }
    function Yr(e, t, a) {
      return a(function() {
        Qr(t) && Xr(e);
      });
    }
    function Qr(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !zt(e, a);
      } catch {
        return true;
      }
    }
    function Xr(e) {
      var t = mn(e, 2);
      t !== null && Ct(t, e, 2);
    }
    function Bc(e) {
      var t = bt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), xn) {
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
    function Vr(e, t, a, n) {
      return e.baseState = a, kc(e, He, typeof n == "function" ? n : va);
    }
    function Dp(e, t, a, n, l) {
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
        T.T !== null ? a(true) : s.isTransition = false, n(s), a = t.pending, a === null ? (s.next = t.pending = s, Zr(t, s)) : (s.next = a.next, t.pending = a.next = s);
      }
    }
    function Zr(e, t) {
      var a = t.action, n = t.payload, l = e.state;
      if (t.isTransition) {
        var s = T.T, u = {};
        T.T = u;
        try {
          var d = a(l, n), h = T.S;
          h !== null && h(u, d), Kr(e, t, d);
        } catch (N) {
          Hc(e, t, N);
        } finally {
          s !== null && u.types !== null && (s.types = u.types), T.T = s;
        }
      } else try {
        s = a(l, n), Kr(e, t, s);
      } catch (N) {
        Hc(e, t, N);
      }
    }
    function Kr(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
        Jr(e, t, n);
      }, function(n) {
        return Hc(e, t, n);
      }) : Jr(e, t, a);
    }
    function Jr(e, t, a) {
      t.status = "fulfilled", t.value = a, Fr(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Zr(e, a)));
    }
    function Hc(e, t, a) {
      var n = e.pending;
      if (e.pending = null, n !== null) {
        n = n.next;
        do
          t.status = "rejected", t.reason = a, Fr(t), t = t.next;
        while (t !== n);
      }
      e.action = null;
    }
    function Fr(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function $r(e, t) {
      return t;
    }
    function Ir(e, t) {
      if (De) {
        var a = Xe.formState;
        if (a !== null) {
          e: {
            var n = be;
            if (De) {
              if (Je) {
                t: {
                  for (var l = Je, s = Vt; l.nodeType !== 8; ) {
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
        lastRenderedReducer: $r,
        lastRenderedState: t
      }, a.queue = n, a = gd.bind(null, be, n), n.dispatch = a, n = Bc(false), s = Zc.bind(null, be, false, n.queue), n = bt(), l = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, n.queue = l, a = Dp.bind(null, be, l, s, a), l.dispatch = a, n.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function Wr(e) {
      var t = et();
      return Pr(t, He, e);
    }
    function Pr(e, t, a) {
      if (t = kc(e, t, $r)[0], e = Zi(va)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var n = Hl(t);
      } catch (u) {
        throw u === $n ? Li : u;
      }
      else n = t;
      t = et();
      var l = t.queue, s = l.dispatch;
      return a !== t.memoizedState && (be.flags |= 2048, tl(9, {
        destroy: void 0
      }, Up.bind(null, l, a), null)), [
        n,
        s,
        e
      ];
    }
    function Up(e, t) {
      e.action = t;
    }
    function ed(e) {
      var t = et(), a = He;
      if (a !== null) return Pr(t, a, e);
      et(), t = t.memoizedState, a = et();
      var n = a.queue.dispatch;
      return a.memoizedState = e, [
        t,
        n,
        false
      ];
    }
    function tl(e, t, a, n) {
      return e = {
        tag: e,
        create: a,
        deps: n,
        inst: t,
        next: null
      }, t = be.updateQueue, t === null && (t = Xi(), be.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e;
    }
    function td() {
      return et().memoizedState;
    }
    function Ki(e, t, a, n) {
      var l = bt();
      be.flags |= e, l.memoizedState = tl(1 | t, {
        destroy: void 0
      }, a, n === void 0 ? null : n);
    }
    function Ji(e, t, a, n) {
      var l = et();
      n = n === void 0 ? null : n;
      var s = l.memoizedState.inst;
      He !== null && n !== null && zc(n, He.memoizedState.deps) ? l.memoizedState = tl(t, s, a, n) : (be.flags |= e, l.memoizedState = tl(1 | t, s, a, n));
    }
    function ad(e, t) {
      Ki(8390656, 8, e, t);
    }
    function Gc(e, t) {
      Ji(2048, 8, e, t);
    }
    function Op(e) {
      be.flags |= 4;
      var t = be.updateQueue;
      if (t === null) t = Xi(), be.updateQueue = t, t.events = [
        e
      ];
      else {
        var a = t.events;
        a === null ? t.events = [
          e
        ] : a.push(e);
      }
    }
    function nd(e) {
      var t = et().memoizedState;
      return Op({
        ref: t,
        nextImpl: e
      }), function() {
        if ((Le & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function ld(e, t) {
      return Ji(4, 2, e, t);
    }
    function id(e, t) {
      return Ji(4, 4, e, t);
    }
    function sd(e, t) {
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
    function cd(e, t, a) {
      a = a != null ? a.concat([
        e
      ]) : null, Ji(4, 4, sd.bind(null, t, e), a);
    }
    function Yc() {
    }
    function ud(e, t) {
      var a = et();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      return t !== null && zc(t, n[1]) ? n[0] : (a.memoizedState = [
        e,
        t
      ], e);
    }
    function od(e, t) {
      var a = et();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      if (t !== null && zc(t, n[1])) return n[0];
      if (n = e(), xn) {
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
    function Qc(e, t, a) {
      return a === void 0 || (ya & 1073741824) !== 0 && (Te & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = df(), be.lanes |= e, Ka |= e, a);
    }
    function rd(e, t, a, n) {
      return zt(a, t) ? a : Wn.current !== null ? (e = Qc(e, a, n), zt(e, t) || (st = true), e) : (ya & 42) === 0 || (ya & 1073741824) !== 0 && (Te & 261930) === 0 ? (st = true, e.memoizedState = a) : (e = df(), be.lanes |= e, Ka |= e, t);
    }
    function dd(e, t, a, n, l) {
      var s = O.p;
      O.p = s !== 0 && 8 > s ? s : 8;
      var u = T.T, d = {};
      T.T = d, Zc(e, false, t, a);
      try {
        var h = l(), N = T.S;
        if (N !== null && N(d, h), h !== null && typeof h == "object" && typeof h.then == "function") {
          var k = Tp(h, n);
          Gl(e, t, k, kt(e));
        } else Gl(e, t, n, kt(e));
      } catch (Q) {
        Gl(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Q
        }, kt());
      } finally {
        O.p = s, u !== null && d.types !== null && (u.types = d.types), T.T = u;
      }
    }
    function Lp() {
    }
    function Xc(e, t, a, n) {
      if (e.tag !== 5) throw Error(r(476));
      var l = fd(e).queue;
      dd(e, l, t, ee, a === null ? Lp : function() {
        return md(e), a(n);
      });
    }
    function fd(e) {
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
    function md(e) {
      var t = fd(e);
      t.next === null && (t = e.alternate.memoizedState), Gl(e, t.next.queue, {}, kt());
    }
    function Vc() {
      return ht(li);
    }
    function hd() {
      return et().memoizedState;
    }
    function pd() {
      return et().memoizedState;
    }
    function kp(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = kt();
            e = Ga(a);
            var n = Ya(t, e, a);
            n !== null && (Ct(n, t, a), Ll(n, t, a)), t = {
              cache: Sc()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function qp(e, t, a) {
      var n = kt();
      a = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Fi(e) ? yd(t, a) : (a = oc(e, t, a, n), a !== null && (Ct(a, e, n), vd(a, t, n)));
    }
    function gd(e, t, a) {
      var n = kt();
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
      if (Fi(e)) yd(t, l);
      else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
          var u = t.lastRenderedState, d = s(u, a);
          if (l.hasEagerState = true, l.eagerState = d, zt(d, u)) return Ri(e, t, l, 0), Xe === null && Ni(), false;
        } catch {
        } finally {
        }
        if (a = oc(e, t, l, n), a !== null) return Ct(a, e, n), vd(a, t, n), true;
      }
      return false;
    }
    function Zc(e, t, a, n) {
      if (n = {
        lane: 2,
        revertLane: ju(),
        gesture: null,
        action: n,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Fi(e)) {
        if (t) throw Error(r(479));
      } else t = oc(e, a, n, 2), t !== null && Ct(t, e, 2);
    }
    function Fi(e) {
      var t = e.alternate;
      return e === be || t !== null && t === be;
    }
    function yd(e, t) {
      Pn = Yi = true;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function vd(e, t, a) {
      if ((a & 4194048) !== 0) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Mo(e, a);
      }
    }
    var Yl = {
      readContext: ht,
      use: Vi,
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
    var bd = {
      readContext: ht,
      use: Vi,
      useCallback: function(e, t) {
        return bt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: ht,
      useEffect: ad,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([
          e
        ]) : null, Ki(4194308, 4, sd.bind(null, t, e), a);
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
        if (xn) {
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
          if (xn) {
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
        }, n.queue = e, e = e.dispatch = qp.bind(null, be, e), [
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
        e = Bc(e);
        var t = e.queue, a = gd.bind(null, be, t);
        return t.dispatch = a, [
          e.memoizedState,
          a
        ];
      },
      useDebugValue: Yc,
      useDeferredValue: function(e, t) {
        var a = bt();
        return Qc(a, e, t);
      },
      useTransition: function() {
        var e = Bc(false);
        return e = dd.bind(null, be, e.queue, true, false), bt().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, a) {
        var n = be, l = bt();
        if (De) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (a = t(), Xe === null) throw Error(r(349));
          (Te & 127) !== 0 || Hr(n, t, a);
        }
        l.memoizedState = a;
        var s = {
          value: a,
          getSnapshot: t
        };
        return l.queue = s, ad(Yr.bind(null, n, s, e), [
          e
        ]), n.flags |= 2048, tl(9, {
          destroy: void 0
        }, Gr.bind(null, n, s, a, t), null), a;
      },
      useId: function() {
        var e = bt(), t = Xe.identifierPrefix;
        if (De) {
          var a = na, n = aa;
          a = (n & ~(1 << 32 - Tt(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Qi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
        } else a = zp++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Vc,
      useFormState: Ir,
      useActionState: Ir,
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
        return t.queue = a, t = Zc.bind(null, be, true, a), a.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: Lc,
      useCacheRefresh: function() {
        return bt().memoizedState = kp.bind(null, be);
      },
      useEffectEvent: function(e) {
        var t = bt(), a = {
          impl: e
        };
        return t.memoizedState = a, function() {
          if ((Le & 2) !== 0) throw Error(r(440));
          return a.impl.apply(void 0, arguments);
        };
      }
    }, Kc = {
      readContext: ht,
      use: Vi,
      useCallback: ud,
      useContext: ht,
      useEffect: Gc,
      useImperativeHandle: cd,
      useInsertionEffect: ld,
      useLayoutEffect: id,
      useMemo: od,
      useReducer: Zi,
      useRef: td,
      useState: function() {
        return Zi(va);
      },
      useDebugValue: Yc,
      useDeferredValue: function(e, t) {
        var a = et();
        return rd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Zi(va)[0], t = et().memoizedState;
        return [
          typeof e == "boolean" ? e : Hl(e),
          t
        ];
      },
      useSyncExternalStore: Br,
      useId: hd,
      useHostTransitionStatus: Vc,
      useFormState: Wr,
      useActionState: Wr,
      useOptimistic: function(e, t) {
        var a = et();
        return Vr(a, He, e, t);
      },
      useMemoCache: Lc,
      useCacheRefresh: pd
    };
    Kc.useEffectEvent = nd;
    var Sd = {
      readContext: ht,
      use: Vi,
      useCallback: ud,
      useContext: ht,
      useEffect: Gc,
      useImperativeHandle: cd,
      useInsertionEffect: ld,
      useLayoutEffect: id,
      useMemo: od,
      useReducer: qc,
      useRef: td,
      useState: function() {
        return qc(va);
      },
      useDebugValue: Yc,
      useDeferredValue: function(e, t) {
        var a = et();
        return He === null ? Qc(a, e, t) : rd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = qc(va)[0], t = et().memoizedState;
        return [
          typeof e == "boolean" ? e : Hl(e),
          t
        ];
      },
      useSyncExternalStore: Br,
      useId: hd,
      useHostTransitionStatus: Vc,
      useFormState: ed,
      useActionState: ed,
      useOptimistic: function(e, t) {
        var a = et();
        return He !== null ? Vr(a, He, e, t) : (a.baseState = e, [
          e,
          a.queue.dispatch
        ]);
      },
      useMemoCache: Lc,
      useCacheRefresh: pd
    };
    Sd.useEffectEvent = nd;
    function Jc(e, t, a, n) {
      t = e.memoizedState, a = a(n, t), a = a == null ? t : Y({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
    }
    var Fc = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var n = kt(), l = Ga(n);
        l.payload = t, a != null && (l.callback = a), t = Ya(e, l, n), t !== null && (Ct(t, e, n), Ll(t, e, n));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var n = kt(), l = Ga(n);
        l.tag = 1, l.payload = t, a != null && (l.callback = a), t = Ya(e, l, n), t !== null && (Ct(t, e, n), Ll(t, e, n));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = kt(), n = Ga(a);
        n.tag = 2, t != null && (n.callback = t), t = Ya(e, n, a), t !== null && (Ct(t, e, a), Ll(t, e, a));
      }
    };
    function wd(e, t, a, n, l, s, u) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, s, u) : t.prototype && t.prototype.isPureReactComponent ? !Nl(a, n) || !Nl(l, s) : true;
    }
    function xd(e, t, a, n) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && Fc.enqueueReplaceState(t, t.state, null);
    }
    function Mn(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var n in t) n !== "ref" && (a[n] = t[n]);
      }
      if (e = e.defaultProps) {
        a === t && (a = Y({}, a));
        for (var l in e) a[l] === void 0 && (a[l] = e[l]);
      }
      return a;
    }
    function Md(e) {
      Ci(e);
    }
    function jd(e) {
      console.error(e);
    }
    function Ad(e) {
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
    function Ed(e, t, a) {
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
    function $c(e, t, a) {
      return a = Ga(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        $i(e, t);
      }, a;
    }
    function Cd(e) {
      return e = Ga(e), e.tag = 3, e;
    }
    function Nd(e, t, a, n) {
      var l = a.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var s = n.value;
        e.payload = function() {
          return l(s);
        }, e.callback = function() {
          Ed(t, a, n);
        };
      }
      var u = a.stateNode;
      u !== null && typeof u.componentDidCatch == "function" && (e.callback = function() {
        Ed(t, a, n), typeof l != "function" && (Ja === null ? Ja = /* @__PURE__ */ new Set([
          this
        ]) : Ja.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function Bp(e, t, a, n, l) {
      if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (t = a.alternate, t !== null && Kn(t, a, l, true), a = Dt.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return Zt === null ? us() : a.alternate === null && We === 0 && (We = 3), a.flags &= -257, a.flags |= 65536, a.lanes = l, n === ki ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([
                n
              ]) : t.add(n), wu(e, n, l)), false;
            case 22:
              return a.flags |= 65536, n === ki ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  n
                ])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([
                n
              ]) : a.add(n)), wu(e, n, l)), false;
          }
          throw Error(r(435, a.tag));
        }
        return wu(e, n, l), us(), false;
      }
      if (De) return t = Dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, n !== pc && (e = Error(r(422), {
        cause: n
      }), zl(Yt(e, a)))) : (n !== pc && (t = Error(r(423), {
        cause: n
      }), zl(Yt(t, a))), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, n = Yt(n, a), l = $c(e.stateNode, n, l), Ec(e, l), We !== 4 && (We = 2)), false;
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
            return a.flags |= 65536, e = l & -l, a.lanes |= e, e = $c(a.stateNode, n, e), Ec(a, e), false;
          case 1:
            if (t = a.type, s = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Ja === null || !Ja.has(s)))) return a.flags |= 65536, l &= -l, a.lanes |= l, l = Cd(l), Nd(l, e, a, n), Ec(a, l), false;
        }
        a = a.return;
      } while (a !== null);
      return false;
    }
    var Ic = Error(r(461)), st = false;
    function pt(e, t, a, n) {
      t.child = e === null ? _r(t, null, a, n) : wn(t, e.child, a, n);
    }
    function Rd(e, t, a, n, l) {
      a = a.render;
      var s = t.ref;
      if ("ref" in n) {
        var u = {};
        for (var d in n) d !== "ref" && (u[d] = n[d]);
      } else u = n;
      return yn(t), n = _c(e, t, a, u, s, l), d = Dc(), e !== null && !st ? (Uc(e, t, l), ba(e, t, l)) : (De && d && mc(t), t.flags |= 1, pt(e, t, n, l), t.child);
    }
    function Td(e, t, a, n, l) {
      if (e === null) {
        var s = a.type;
        return typeof s == "function" && !rc(s) && s.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = s, zd(e, t, s, n, l)) : (e = zi(a.type, null, n, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (s = e.child, !iu(e, l)) {
        var u = s.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Nl, a(u, n) && e.ref === t.ref) return ba(e, t, l);
      }
      return t.flags |= 1, e = ma(s, n), e.ref = t.ref, e.return = t, t.child = e;
    }
    function zd(e, t, a, n, l) {
      if (e !== null) {
        var s = e.memoizedProps;
        if (Nl(s, n) && e.ref === t.ref) if (st = false, t.pendingProps = n = s, iu(e, l)) (e.flags & 131072) !== 0 && (st = true);
        else return t.lanes = e.lanes, ba(e, t, l);
      }
      return Wc(e, t, a, n, l);
    }
    function _d(e, t, a, n) {
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
          return Dd(e, t, s, a, n);
        }
        if ((a & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && Oi(t, s !== null ? s.cachePool : null), s !== null ? Or(t, s) : Nc(), Lr(t);
        else return n = t.lanes = 536870912, Dd(e, t, s !== null ? s.baseLanes | a : a, a, n);
      } else s !== null ? (Oi(t, s.cachePool), Or(t, s), Xa(), t.memoizedState = null) : (e !== null && Oi(t, null), Nc(), Xa());
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
    function Dd(e, t, a, n, l) {
      var s = xc();
      return s = s === null ? null : {
        parent: lt._currentValue,
        pool: s
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: s
      }, e !== null && Oi(t, null), Nc(), Lr(t), e !== null && Kn(e, t, n, true), t.childLanes = l, null;
    }
    function Ii(e, t) {
      return t = Pi({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Ud(e, t, a) {
      return wn(t, e.child, null, a), e = Ii(t, t.pendingProps), e.flags |= 2, Ut(t), t.memoizedState = null, e;
    }
    function Hp(e, t, a) {
      var n = t.pendingProps, l = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (De) {
          if (n.mode === "hidden") return e = Ii(t, n), t.lanes = 536870912, Ql(null, e);
          if (Tc(t), (e = Je) ? (e = Kf(e, Vt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: La !== null ? {
              id: aa,
              overflow: na
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = yr(e), a.return = t, t.child = a, mt = t, Je = null)) : e = null, e === null) throw qa(t);
          return t.lanes = 536870912, null;
        }
        return Ii(t, n);
      }
      var s = e.memoizedState;
      if (s !== null) {
        var u = s.dehydrated;
        if (Tc(t), l) if (t.flags & 256) t.flags &= -257, t = Ud(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
        else if (st || Kn(e, t, a, false), l = (a & e.childLanes) !== 0, st || l) {
          if (n = Xe, n !== null && (u = jo(n, a), u !== 0 && u !== s.retryLane)) throw s.retryLane = u, mn(e, u), Ct(n, e, u), Ic;
          us(), t = Ud(e, t, a);
        } else e = s.treeContext, Je = Kt(u.nextSibling), mt = t, De = true, ka = null, Vt = false, e !== null && Sr(t, e), t = Ii(t, n), t.flags |= 4096;
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
    function Wc(e, t, a, n, l) {
      return yn(t), a = _c(e, t, a, n, void 0, l), n = Dc(), e !== null && !st ? (Uc(e, t, l), ba(e, t, l)) : (De && n && mc(t), t.flags |= 1, pt(e, t, a, l), t.child);
    }
    function Od(e, t, a, n, l, s) {
      return yn(t), t.updateQueue = null, a = qr(t, n, a, l), kr(e), n = Dc(), e !== null && !st ? (Uc(e, t, s), ba(e, t, s)) : (De && n && mc(t), t.flags |= 1, pt(e, t, a, s), t.child);
    }
    function Ld(e, t, a, n, l) {
      if (yn(t), t.stateNode === null) {
        var s = Qn, u = a.contextType;
        typeof u == "object" && u !== null && (s = ht(u)), s = new a(n, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Fc, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = n, s.state = t.memoizedState, s.refs = {}, jc(t), u = a.contextType, s.context = typeof u == "object" && u !== null ? ht(u) : Qn, s.state = t.memoizedState, u = a.getDerivedStateFromProps, typeof u == "function" && (Jc(t, a, u, n), s.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (u = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), u !== s.state && Fc.enqueueReplaceState(s, s.state, null), ql(t, n, s, l), kl(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = true;
      } else if (e === null) {
        s = t.stateNode;
        var d = t.memoizedProps, h = Mn(a, d);
        s.props = h;
        var N = s.context, k = a.contextType;
        u = Qn, typeof k == "object" && k !== null && (u = ht(k));
        var Q = a.getDerivedStateFromProps;
        k = typeof Q == "function" || typeof s.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, k || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d || N !== u) && xd(t, s, n, u), Ha = false;
        var R = t.memoizedState;
        s.state = R, ql(t, n, s, l), kl(), N = t.memoizedState, d || R !== N || Ha ? (typeof Q == "function" && (Jc(t, a, Q, n), N = t.memoizedState), (h = Ha || wd(t, a, h, n, R, N, u)) ? (k || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = N), s.props = n, s.state = N, s.context = u, n = h) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = false);
      } else {
        s = t.stateNode, Ac(e, t), u = t.memoizedProps, k = Mn(a, u), s.props = k, Q = t.pendingProps, R = s.context, N = a.contextType, h = Qn, typeof N == "object" && N !== null && (h = ht(N)), d = a.getDerivedStateFromProps, (N = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (u !== Q || R !== h) && xd(t, s, n, h), Ha = false, R = t.memoizedState, s.state = R, ql(t, n, s, l), kl();
        var D = t.memoizedState;
        u !== Q || R !== D || Ha || e !== null && e.dependencies !== null && Di(e.dependencies) ? (typeof d == "function" && (Jc(t, a, d, n), D = t.memoizedState), (k = Ha || wd(t, a, k, n, R, D, h) || e !== null && e.dependencies !== null && Di(e.dependencies)) ? (N || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(n, D, h), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(n, D, h)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || u === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = D), s.props = n, s.state = D, s.context = h, n = k) : (typeof s.componentDidUpdate != "function" || u === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), n = false);
      }
      return s = n, Wi(e, t), n = (t.flags & 128) !== 0, s || n ? (s = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && n ? (t.child = wn(t, e.child, null, l), t.child = wn(t, null, a, l)) : pt(e, t, a, l), t.memoizedState = s.state, e = t.child) : e = ba(e, t, l), e;
    }
    function kd(e, t, a, n) {
      return pn(), t.flags |= 256, pt(e, t, a, n), t.child;
    }
    var Pc = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function eu(e) {
      return {
        baseLanes: e,
        cachePool: Er()
      };
    }
    function tu(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Lt), e;
    }
    function qd(e, t, a) {
      var n = t.pendingProps, l = false, s = (t.flags & 128) !== 0, u;
      if ((u = s) || (u = e !== null && e.memoizedState === null ? false : (Pe.current & 2) !== 0), u && (l = true, t.flags &= -129), u = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (De) {
          if (l ? Qa(t) : Xa(), (e = Je) ? (e = Kf(e, Vt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: La !== null ? {
              id: aa,
              overflow: na
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = yr(e), a.return = t, t.child = a, mt = t, Je = null)) : e = null, e === null) throw qa(t);
          return ku(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var d = n.children;
        return n = n.fallback, l ? (Xa(), l = t.mode, d = Pi({
          mode: "hidden",
          children: d
        }, l), n = hn(n, l, a, null), d.return = t, n.return = t, d.sibling = n, t.child = d, n = t.child, n.memoizedState = eu(a), n.childLanes = tu(e, u, a), t.memoizedState = Pc, Ql(null, n)) : (Qa(t), au(t, d));
      }
      var h = e.memoizedState;
      if (h !== null && (d = h.dehydrated, d !== null)) {
        if (s) t.flags & 256 ? (Qa(t), t.flags &= -257, t = nu(e, t, a)) : t.memoizedState !== null ? (Xa(), t.child = e.child, t.flags |= 128, t = null) : (Xa(), d = n.fallback, l = t.mode, n = Pi({
          mode: "visible",
          children: n.children
        }, l), d = hn(d, l, a, null), d.flags |= 2, n.return = t, d.return = t, n.sibling = d, t.child = n, wn(t, e.child, null, a), n = t.child, n.memoizedState = eu(a), n.childLanes = tu(e, u, a), t.memoizedState = Pc, t = Ql(null, n));
        else if (Qa(t), ku(d)) {
          if (u = d.nextSibling && d.nextSibling.dataset, u) var N = u.dgst;
          u = N, n = Error(r(419)), n.stack = "", n.digest = u, zl({
            value: n,
            source: null,
            stack: null
          }), t = nu(e, t, a);
        } else if (st || Kn(e, t, a, false), u = (a & e.childLanes) !== 0, st || u) {
          if (u = Xe, u !== null && (n = jo(u, a), n !== 0 && n !== h.retryLane)) throw h.retryLane = n, mn(e, n), Ct(u, e, n), Ic;
          Lu(d) || us(), t = nu(e, t, a);
        } else Lu(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = h.treeContext, Je = Kt(d.nextSibling), mt = t, De = true, ka = null, Vt = false, e !== null && Sr(t, e), t = au(t, n.children), t.flags |= 4096);
        return t;
      }
      return l ? (Xa(), d = n.fallback, l = t.mode, h = e.child, N = h.sibling, n = ma(h, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = h.subtreeFlags & 65011712, N !== null ? d = ma(N, d) : (d = hn(d, l, a, null), d.flags |= 2), d.return = t, n.return = t, n.sibling = d, t.child = n, Ql(null, n), n = t.child, d = e.child.memoizedState, d === null ? d = eu(a) : (l = d.cachePool, l !== null ? (h = lt._currentValue, l = l.parent !== h ? {
        parent: h,
        pool: h
      } : l) : l = Er(), d = {
        baseLanes: d.baseLanes | a,
        cachePool: l
      }), n.memoizedState = d, n.childLanes = tu(e, u, a), t.memoizedState = Pc, Ql(e.child, n)) : (Qa(t), a = e.child, e = a.sibling, a = ma(a, {
        mode: "visible",
        children: n.children
      }), a.return = t, a.sibling = null, e !== null && (u = t.deletions, u === null ? (t.deletions = [
        e
      ], t.flags |= 16) : u.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function au(e, t) {
      return t = Pi({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function Pi(e, t) {
      return e = _t(22, e, null, t), e.lanes = 0, e;
    }
    function nu(e, t, a) {
      return wn(t, e.child, null, a), e = au(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Bd(e, t, a) {
      e.lanes |= t;
      var n = e.alternate;
      n !== null && (n.lanes |= t), vc(e.return, t, a);
    }
    function lu(e, t, a, n, l, s) {
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
    function Hd(e, t, a) {
      var n = t.pendingProps, l = n.revealOrder, s = n.tail;
      n = n.children;
      var u = Pe.current, d = (u & 2) !== 0;
      if (d ? (u = u & 1 | 2, t.flags |= 128) : u &= 1, W(Pe, u), pt(e, t, n, a), n = De ? Tl : 0, !d && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Bd(e, a, t);
        else if (e.tag === 19) Bd(e, a, t);
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
          a = l, a === null ? (l = t.child, t.child = null) : (l = a.sibling, a.sibling = null), lu(t, false, l, a, s, n);
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
          lu(t, true, a, null, s, n);
          break;
        case "together":
          lu(t, false, null, null, void 0, n);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function ba(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ka |= t.lanes, (a & t.childLanes) === 0) if (e !== null) {
        if (Kn(e, t, a, false), (a & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (e = t.child, a = ma(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; ) e = e.sibling, a = a.sibling = ma(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function iu(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Di(e)));
    }
    function Gp(e, t, a) {
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
          if (t.memoizedState !== null) return t.flags |= 128, Tc(t), null;
          break;
        case 13:
          var n = t.memoizedState;
          if (n !== null) return n.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? qd(e, t, a) : (Qa(t), e = ba(e, t, a), e !== null ? e.sibling : null);
          Qa(t);
          break;
        case 19:
          var l = (e.flags & 128) !== 0;
          if (n = (a & t.childLanes) !== 0, n || (Kn(e, t, a, false), n = (a & t.childLanes) !== 0), l) {
            if (n) return Hd(e, t, a);
            t.flags |= 128;
          }
          if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), W(Pe, Pe.current), n) break;
          return null;
        case 22:
          return t.lanes = 0, _d(e, t, a, t.pendingProps);
        case 24:
          Ba(t, lt, e.memoizedState.cache);
      }
      return ba(e, t, a);
    }
    function Gd(e, t, a) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) st = true;
      else {
        if (!iu(e, a) && (t.flags & 128) === 0) return st = false, Gp(e, t, a);
        st = (e.flags & 131072) !== 0;
      }
      else st = false, De && (t.flags & 1048576) !== 0 && br(t, Tl, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var n = t.pendingProps;
            if (e = bn(t.elementType), t.type = e, typeof e == "function") rc(e) ? (n = Mn(e, n), t.tag = 1, t = Ld(null, t, e, n, a)) : (t.tag = 0, t = Wc(null, t, e, n, a));
            else {
              if (e != null) {
                var l = e.$$typeof;
                if (l === pe) {
                  t.tag = 11, t = Rd(null, t, e, n, a);
                  break e;
                } else if (l === _) {
                  t.tag = 14, t = Td(null, t, e, n, a);
                  break e;
                }
              }
              throw t = Re(e) || e, Error(r(306, t, ""));
            }
          }
          return t;
        case 0:
          return Wc(e, t, t.type, t.pendingProps, a);
        case 1:
          return n = t.type, l = Mn(n, t.pendingProps), Ld(e, t, n, l, a);
        case 3:
          e: {
            if (at(t, t.stateNode.containerInfo), e === null) throw Error(r(387));
            n = t.pendingProps;
            var s = t.memoizedState;
            l = s.element, Ac(e, t), ql(t, n, null, a);
            var u = t.memoizedState;
            if (n = u.cache, Ba(t, lt, n), n !== s.cache && bc(t, [
              lt
            ], a, true), kl(), n = u.element, s.isDehydrated) if (s = {
              element: n,
              isDehydrated: false,
              cache: u.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = kd(e, t, n, a);
              break e;
            } else if (n !== l) {
              l = Yt(Error(r(424)), t), zl(l), t = kd(e, t, n, a);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Je = Kt(e.firstChild), mt = t, De = true, ka = null, Vt = true, a = _r(t, null, n, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
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
          return Wi(e, t), e === null ? (a = Pf(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : De || (a = t.type, e = t.pendingProps, n = ps(ve.current).createElement(a), n[ft] = t, n[wt] = e, gt(n, a, e), ot(n), t.stateNode = n) : t.memoizedState = Pf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return vt(t), e === null && De && (n = t.stateNode = $f(t.type, t.pendingProps, ve.current), mt = t, Vt = true, l = Je, Wa(t.type) ? (qu = l, Je = Kt(n.firstChild)) : Je = l), pt(e, t, t.pendingProps.children, a), Wi(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && De && ((l = n = Je) && (n = yg(n, t.type, t.pendingProps, Vt), n !== null ? (t.stateNode = n, mt = t, Je = Kt(n.firstChild), Vt = false, l = true) : l = false), l || qa(t)), vt(t), l = t.type, s = t.pendingProps, u = e !== null ? e.memoizedProps : null, n = s.children, Du(l, s) ? n = null : u !== null && Du(l, u) && (t.flags |= 32), t.memoizedState !== null && (l = _c(e, t, _p, null, null, a), li._currentValue = l), Wi(e, t), pt(e, t, n, a), t.child;
        case 6:
          return e === null && De && ((e = a = Je) && (a = vg(a, t.pendingProps, Vt), a !== null ? (t.stateNode = a, mt = t, Je = null, e = true) : e = false), e || qa(t)), null;
        case 13:
          return qd(e, t, a);
        case 4:
          return at(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = wn(t, null, n, a) : pt(e, t, n, a), t.child;
        case 11:
          return Rd(e, t, t.type, t.pendingProps, a);
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
          return Td(e, t, t.type, t.pendingProps, a);
        case 15:
          return zd(e, t, t.type, t.pendingProps, a);
        case 19:
          return Hd(e, t, a);
        case 31:
          return Hp(e, t, a);
        case 22:
          return _d(e, t, a, t.pendingProps);
        case 24:
          return yn(t), n = ht(lt), e === null ? (l = xc(), l === null && (l = Xe, s = Sc(), l.pooledCache = s, s.refCount++, s !== null && (l.pooledCacheLanes |= a), l = s), t.memoizedState = {
            parent: n,
            cache: l
          }, jc(t), Ba(t, lt, l)) : ((e.lanes & a) !== 0 && (Ac(e, t), ql(t, null, null, a), kl()), l = e.memoizedState, s = t.memoizedState, l.parent !== n ? (l = {
            parent: n,
            cache: n
          }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), Ba(t, lt, n)) : (n = s.cache, Ba(t, lt, n), n !== l.cache && bc(t, [
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
    function su(e, t, a, n, l) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (l & 335544128) === l) if (e.stateNode.complete) e.flags |= 8192;
        else if (pf()) e.flags |= 8192;
        else throw Sn = ki, Mc;
      } else e.flags &= -16777217;
    }
    function Yd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !lm(t)) if (pf()) e.flags |= 8192;
      else throw Sn = ki, Mc;
    }
    function es(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? wo() : 536870912, e.lanes |= t, il |= t);
    }
    function Xl(e, t) {
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
    function Yp(e, t, a) {
      var n = t.pendingProps;
      switch (hc(t), t.tag) {
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
          return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ga(lt), Ke(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Zn(t) ? Sa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gc())), Fe(t), null;
        case 26:
          var l = t.type, s = t.memoizedState;
          return e === null ? (Sa(t), s !== null ? (Fe(t), Yd(t, s)) : (Fe(t), su(t, l, null, n, a))) : s ? s !== e.memoizedState ? (Sa(t), Fe(t), Yd(t, s)) : (Fe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Sa(t), Fe(t), su(t, l, e, n, a)), null;
        case 27:
          if (Ta(t), a = ve.current, l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Fe(t), null;
            }
            e = ie.current, Zn(t) ? wr(t) : (e = $f(l, n, a), t.stateNode = e, Sa(t));
          }
          return Fe(t), null;
        case 5:
          if (Ta(t), l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Fe(t), null;
            }
            if (s = ie.current, Zn(t)) wr(t);
            else {
              var u = ps(ve.current);
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
              s[ft] = t, s[wt] = n;
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
          return Fe(t), su(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== n && Sa(t);
          else {
            if (typeof n != "string" && t.stateNode === null) throw Error(r(166));
            if (e = ve.current, Zn(t)) {
              if (e = t.stateNode, a = t.memoizedProps, n = null, l = mt, l !== null) switch (l.tag) {
                case 27:
                case 5:
                  n = l.memoizedProps;
              }
              e[ft] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === true || Bf(e.nodeValue, a)), e || qa(t, true);
            } else e = ps(e).createTextNode(n), e[ft] = t, t.stateNode = e;
          }
          return Fe(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = Zn(t), a !== null) {
              if (e === null) {
                if (!n) throw Error(r(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
                e[ft] = t;
              } else pn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Fe(t), e = false;
            } else a = gc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = true;
            if (!e) return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
            if ((t.flags & 128) !== 0) throw Error(r(558));
          }
          return Fe(t), null;
        case 13:
          if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (l = Zn(t), n !== null && n.dehydrated !== null) {
              if (e === null) {
                if (!l) throw Error(r(318));
                if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(317));
                l[ft] = t;
              } else pn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Fe(t), l = false;
            } else l = gc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = true;
            if (!l) return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
          }
          return Ut(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, l = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (l = n.alternate.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== l && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), es(t, t.updateQueue), Fe(t), null);
        case 4:
          return Ke(), e === null && Nu(t.stateNode.containerInfo), Fe(t), null;
        case 10:
          return ga(t.type), Fe(t), null;
        case 19:
          if (B(Pe), n = t.memoizedState, n === null) return Fe(t), null;
          if (l = (t.flags & 128) !== 0, s = n.rendering, s === null) if (l) Xl(n, false);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (s = Gi(e), s !== null) {
                for (t.flags |= 128, Xl(n, false), e = s.updateQueue, t.updateQueue = e, es(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; ) gr(a, e), a = a.sibling;
                return W(Pe, Pe.current & 1 | 2), De && ha(t, n.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            n.tail !== null && P() > is && (t.flags |= 128, l = true, Xl(n, false), t.lanes = 4194304);
          }
          else {
            if (!l) if (e = Gi(s), e !== null) {
              if (t.flags |= 128, l = true, e = e.updateQueue, t.updateQueue = e, es(t, e), Xl(n, true), n.tail === null && n.tailMode === "hidden" && !s.alternate && !De) return Fe(t), null;
            } else 2 * P() - n.renderingStartTime > is && a !== 536870912 && (t.flags |= 128, l = true, Xl(n, false), t.lanes = 4194304);
            n.isBackwards ? (s.sibling = t.child, t.child = s) : (e = n.last, e !== null ? e.sibling = s : t.child = s, n.last = s);
          }
          return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = P(), e.sibling = null, a = Pe.current, W(Pe, l ? a & 1 | 2 : a & 1), De && ha(t, n.treeForkCount), e) : (Fe(t), null);
        case 22:
        case 23:
          return Ut(t), Rc(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Fe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fe(t), a = t.updateQueue, a !== null && es(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && B(vn), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ga(lt), Fe(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function Qp(e, t) {
      switch (hc(t), t.tag) {
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
          return Ut(t), Rc(), e !== null && B(vn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return ga(lt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Qd(e, t) {
      switch (hc(t), t.tag) {
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
          Ut(t), Rc(), e !== null && B(vn);
          break;
        case 24:
          ga(lt);
      }
    }
    function Vl(e, t) {
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
    function Va(e, t, a) {
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
                var h = a, N = d;
                try {
                  N();
                } catch (k) {
                  Be(l, h, k);
                }
              }
            }
            n = n.next;
          } while (n !== s);
        }
      } catch (k) {
        Be(t, t.return, k);
      }
    }
    function Xd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        try {
          Ur(t, a);
        } catch (n) {
          Be(e, e.return, n);
        }
      }
    }
    function Vd(e, t, a) {
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
    function Zd(e) {
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
    function cu(e, t, a) {
      try {
        var n = e.stateNode;
        dg(n, e.type, a, t), n[wt] = t;
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    function Kd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Wa(e.type) || e.tag === 4;
    }
    function uu(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Kd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Wa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function ou(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = da));
      else if (n !== 4 && (n === 27 && Wa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null)) for (ou(e, t, a), e = e.sibling; e !== null; ) ou(e, t, a), e = e.sibling;
    }
    function ts(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (n !== 4 && (n === 27 && Wa(e.type) && (a = e.stateNode), e = e.child, e !== null)) for (ts(e, t, a), e = e.sibling; e !== null; ) ts(e, t, a), e = e.sibling;
    }
    function Jd(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        for (var n = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
        gt(t, n, a), t[ft] = e, t[wt] = a;
      } catch (s) {
        Be(e, e.return, s);
      }
    }
    var wa = false, ct = false, ru = false, Fd = typeof WeakSet == "function" ? WeakSet : Set, rt = null;
    function Xp(e, t) {
      if (e = e.containerInfo, zu = xs, e = cr(e), nc(e)) {
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
            var u = 0, d = -1, h = -1, N = 0, k = 0, Q = e, R = null;
            t: for (; ; ) {
              for (var D; Q !== a || l !== 0 && Q.nodeType !== 3 || (d = u + l), Q !== s || n !== 0 && Q.nodeType !== 3 || (h = u + n), Q.nodeType === 3 && (u += Q.nodeValue.length), (D = Q.firstChild) !== null; ) R = Q, Q = D;
              for (; ; ) {
                if (Q === e) break t;
                if (R === a && ++N === l && (d = u), R === s && ++k === n && (h = u), (D = Q.nextSibling) !== null) break;
                Q = R, R = Q.parentNode;
              }
              Q = D;
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
      for (_u = {
        focusedElem: e,
        selectionRange: a
      }, xs = false, rt = t; rt !== null; ) if (t = rt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, rt = e;
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
                var se = Mn(a.type, l);
                e = n.getSnapshotBeforeUpdate(se, s), n.__reactInternalSnapshotBeforeUpdate = e;
              } catch (he) {
                Be(a, a.return, he);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Ou(e);
              else if (a === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Ou(e);
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
    function $d(e, t, a) {
      var n = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ma(e, a), n & 4 && Vl(5, a);
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
          n & 64 && Xd(a), n & 512 && Zl(a, a.return);
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
              Ur(e, t);
            } catch (u) {
              Be(a, a.return, u);
            }
          }
          break;
        case 27:
          t === null && n & 4 && Jd(a);
        case 26:
        case 5:
          Ma(e, a), t === null && n & 4 && Zd(a), n & 512 && Zl(a, a.return);
          break;
        case 12:
          Ma(e, a);
          break;
        case 31:
          Ma(e, a), n & 4 && Pd(e, a);
          break;
        case 13:
          Ma(e, a), n & 4 && ef(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Pp.bind(null, a), bg(e, a))));
          break;
        case 22:
          if (n = a.memoizedState !== null || wa, !n) {
            t = t !== null && t.memoizedState !== null || ct, l = wa;
            var s = ct;
            wa = n, (ct = t) && !s ? ja(e, a, (a.subtreeFlags & 8772) !== 0) : Ma(e, a), wa = l, ct = s;
          }
          break;
        case 30:
          break;
        default:
          Ma(e, a);
      }
    }
    function Id(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Id(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Hs(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var $e = null, Mt = false;
    function xa(e, t, a) {
      for (a = a.child; a !== null; ) Wd(e, t, a), a = a.sibling;
    }
    function Wd(e, t, a) {
      if (Rt && typeof Rt.onCommitFiberUnmount == "function") try {
        Rt.onCommitFiberUnmount(gl, a);
      } catch {
      }
      switch (a.tag) {
        case 26:
          ct || la(a, t), xa(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          ct || la(a, t);
          var n = $e, l = Mt;
          Wa(a.type) && ($e = a.stateNode, Mt = false), xa(e, t, a), ti(a.stateNode), $e = n, Mt = l;
          break;
        case 5:
          ct || la(a, t);
        case 6:
          if (n = $e, l = Mt, $e = null, xa(e, t, a), $e = n, Mt = l, $e !== null) if (Mt) try {
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
          $e !== null && (Mt ? (e = $e, Vf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), ml(e)) : Vf($e, a.stateNode));
          break;
        case 4:
          n = $e, l = Mt, $e = a.stateNode.containerInfo, Mt = true, xa(e, t, a), $e = n, Mt = l;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Va(2, a, t), ct || Va(4, a, t), xa(e, t, a);
          break;
        case 1:
          ct || (la(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && Vd(a, t, n)), xa(e, t, a);
          break;
        case 21:
          xa(e, t, a);
          break;
        case 22:
          ct = (n = ct) || a.memoizedState !== null, xa(e, t, a), ct = n;
          break;
        default:
          xa(e, t, a);
      }
    }
    function Pd(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          ml(e);
        } catch (a) {
          Be(t, t.return, a);
        }
      }
    }
    function ef(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        ml(e);
      } catch (a) {
        Be(t, t.return, a);
      }
    }
    function Vp(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Fd()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Fd()), t;
        default:
          throw Error(r(435, e.tag));
      }
    }
    function as(e, t) {
      var a = Vp(e);
      t.forEach(function(n) {
        if (!a.has(n)) {
          a.add(n);
          var l = eg.bind(null, e, n);
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
        Wd(s, u, l), $e = null, Mt = false, s = l.alternate, s !== null && (s.return = null), l.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) tf(t, e), t = t.sibling;
    }
    var ea = null;
    function tf(e, t) {
      var a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          jt(t, e), At(e), n & 4 && (Va(3, e, e.return), Vl(3, e), Va(5, e, e.return));
          break;
        case 1:
          jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), n & 64 && wa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
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
                    var u = am("link", "href", l).get(n + (a.href || ""));
                    if (u) {
                      for (var d = 0; d < u.length; d++) if (s = u[d], s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && s.getAttribute("rel") === (a.rel == null ? null : a.rel) && s.getAttribute("title") === (a.title == null ? null : a.title) && s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                        u.splice(d, 1);
                        break t;
                      }
                    }
                    s = l.createElement(n), gt(s, n, a), l.head.appendChild(s);
                    break;
                  case "meta":
                    if (u = am("meta", "content", l).get(n + (a.content || ""))) {
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
            } else nm(l, e.type, e.stateNode);
            else e.stateNode = tm(l, n, e.memoizedProps);
            else s !== n ? (s === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : s.count--, n === null ? nm(l, e.type, e.stateNode) : tm(l, n, e.memoizedProps)) : n === null && e.stateNode !== null && cu(e, e.memoizedProps, a.memoizedProps);
          }
          break;
        case 27:
          jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), a !== null && n & 4 && cu(e, e.memoizedProps, a.memoizedProps);
          break;
        case 5:
          if (jt(t, e), At(e), n & 512 && (ct || a === null || la(a, a.return)), e.flags & 32) {
            l = e.stateNode;
            try {
              Ln(l, "");
            } catch (se) {
              Be(e, e.return, se);
            }
          }
          n & 4 && e.stateNode != null && (l = e.memoizedProps, cu(e, l, a !== null ? a.memoizedProps : l)), n & 1024 && (ru = true);
          break;
        case 6:
          if (jt(t, e), At(e), n & 4) {
            if (e.stateNode === null) throw Error(r(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
              a.nodeValue = n;
            } catch (se) {
              Be(e, e.return, se);
            }
          }
          break;
        case 3:
          if (vs = null, l = ea, ea = gs(t.containerInfo), jt(t, e), ea = l, At(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
            ml(t.containerInfo);
          } catch (se) {
            Be(e, e.return, se);
          }
          ru && (ru = false, af(e));
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
          jt(t, e), At(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ls = P()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, as(e, n)));
          break;
        case 22:
          l = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, N = wa, k = ct;
          if (wa = N || l, ct = k || h, jt(t, e), ct = k, wa = N, At(e), n & 8192) e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (a === null || h || wa || ct || jn(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                h = a = t;
                try {
                  if (s = h.stateNode, l) u = s.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none";
                  else {
                    d = h.stateNode;
                    var Q = h.memoizedProps.style, R = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    d.style.display = R == null || typeof R == "boolean" ? "" : ("" + R).trim();
                  }
                } catch (se) {
                  Be(h, h.return, se);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                h = t;
                try {
                  h.stateNode.nodeValue = l ? "" : h.memoizedProps;
                } catch (se) {
                  Be(h, h.return, se);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                h = t;
                try {
                  var D = h.stateNode;
                  l ? Zf(D, true) : Zf(h.stateNode, false);
                } catch (se) {
                  Be(h, h.return, se);
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
            if (Kd(n)) {
              a = n;
              break;
            }
            n = n.return;
          }
          if (a == null) throw Error(r(160));
          switch (a.tag) {
            case 27:
              var l = a.stateNode, s = uu(e);
              ts(e, s, l);
              break;
            case 5:
              var u = a.stateNode;
              a.flags & 32 && (Ln(u, ""), a.flags &= -33);
              var d = uu(e);
              ts(e, d, u);
              break;
            case 3:
            case 4:
              var h = a.stateNode.containerInfo, N = uu(e);
              ou(e, N, h);
              break;
            default:
              throw Error(r(161));
          }
        } catch (k) {
          Be(e, e.return, k);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function af(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        af(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Ma(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) $d(e, t.alternate, t), t = t.sibling;
    }
    function jn(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Va(4, t, t.return), jn(t);
            break;
          case 1:
            la(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount == "function" && Vd(t, t.return, a), jn(t);
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
            ja(l, s, a), Vl(4, s);
            break;
          case 1:
            if (ja(l, s, a), n = s, l = n.stateNode, typeof l.componentDidMount == "function") try {
              l.componentDidMount();
            } catch (N) {
              Be(n, n.return, N);
            }
            if (n = s, l = n.updateQueue, l !== null) {
              var d = n.stateNode;
              try {
                var h = l.shared.hiddenCallbacks;
                if (h !== null) for (l.shared.hiddenCallbacks = null, l = 0; l < h.length; l++) Dr(h[l], d);
              } catch (N) {
                Be(n, n.return, N);
              }
            }
            a && u & 64 && Xd(s), Zl(s, s.return);
            break;
          case 27:
            Jd(s);
          case 26:
          case 5:
            ja(l, s, a), a && n === null && u & 4 && Zd(s), Zl(s, s.return);
            break;
          case 12:
            ja(l, s, a);
            break;
          case 31:
            ja(l, s, a), a && u & 4 && Pd(l, s);
            break;
          case 13:
            ja(l, s, a), a && u & 4 && ef(l, s);
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
    function du(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && _l(a));
    }
    function fu(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _l(e));
    }
    function ta(e, t, a, n) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) nf(e, t, a, n), t = t.sibling;
    }
    function nf(e, t, a, n) {
      var l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ta(e, t, a, n), l & 2048 && Vl(9, t);
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
          s = t.stateNode, u = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? ta(e, t, a, n) : Kl(e, t) : s._visibility & 2 ? ta(e, t, a, n) : (s._visibility |= 2, al(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || false)), l & 2048 && du(u, t);
          break;
        case 24:
          ta(e, t, a, n), l & 2048 && fu(t.alternate, t);
          break;
        default:
          ta(e, t, a, n);
      }
    }
    function al(e, t, a, n, l) {
      for (l = l && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var s = e, u = t, d = a, h = n, N = u.flags;
        switch (u.tag) {
          case 0:
          case 11:
          case 15:
            al(s, u, d, h, l), Vl(8, u);
            break;
          case 23:
            break;
          case 22:
            var k = u.stateNode;
            u.memoizedState !== null ? k._visibility & 2 ? al(s, u, d, h, l) : Kl(s, u) : (k._visibility |= 2, al(s, u, d, h, l)), l && N & 2048 && du(u.alternate, u);
            break;
          case 24:
            al(s, u, d, h, l), l && N & 2048 && fu(u.alternate, u);
            break;
          default:
            al(s, u, d, h, l);
        }
        t = t.sibling;
      }
    }
    function Kl(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var a = e, n = t, l = n.flags;
        switch (n.tag) {
          case 22:
            Kl(a, n), l & 2048 && du(n.alternate, n);
            break;
          case 24:
            Kl(a, n), l & 2048 && fu(n.alternate, n);
            break;
          default:
            Kl(a, n);
        }
        t = t.sibling;
      }
    }
    var Jl = 8192;
    function nl(e, t, a) {
      if (e.subtreeFlags & Jl) for (e = e.child; e !== null; ) lf(e, t, a), e = e.sibling;
    }
    function lf(e, t, a) {
      switch (e.tag) {
        case 26:
          nl(e, t, a), e.flags & Jl && e.memoizedState !== null && zg(a, ea, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          nl(e, t, a);
          break;
        case 3:
        case 4:
          var n = ea;
          ea = gs(e.stateNode.containerInfo), nl(e, t, a), ea = n;
          break;
        case 22:
          e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Jl, Jl = 16777216, nl(e, t, a), Jl = n) : nl(e, t, a));
          break;
        default:
          nl(e, t, a);
      }
    }
    function sf(e) {
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
          rt = n, uf(n, e);
        }
        sf(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) cf(e), e = e.sibling;
    }
    function cf(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Fl(e), e.flags & 2048 && Va(9, e, e.return);
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
          rt = n, uf(n, e);
        }
        sf(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            Va(8, t, t.return), ns(t);
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
    function uf(e, t) {
      for (; rt !== null; ) {
        var a = rt;
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
            _l(a.memoizedState.cache);
        }
        if (n = a.child, n !== null) n.return = a, rt = n;
        else e: for (a = e; rt !== null; ) {
          n = rt;
          var l = n.sibling, s = n.return;
          if (Id(n), n === a) {
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
    var Zp = {
      getCacheForType: function(e) {
        var t = ht(lt), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return ht(lt).controller.signal;
      }
    }, Kp = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Xe = null, Ae = null, Te = 0, qe = 0, Ot = null, Za = false, ll = false, mu = false, Aa = 0, We = 0, Ka = 0, An = 0, hu = 0, Lt = 0, il = 0, $l = null, Et = null, pu = false, ls = 0, of = 0, is = 1 / 0, ss = null, Ja = null, ut = 0, Fa = null, sl = null, Ea = 0, gu = 0, yu = null, rf = null, Il = 0, vu = null;
    function kt() {
      return (Le & 2) !== 0 && Te !== 0 ? Te & -Te : T.T !== null ? ju() : Ao();
    }
    function df() {
      if (Lt === 0) if ((Te & 536870912) === 0 || De) {
        var e = hi;
        hi <<= 1, (hi & 3932160) === 0 && (hi = 262144), Lt = e;
      } else Lt = 536870912;
      return e = Dt.current, e !== null && (e.flags |= 32), Lt;
    }
    function Ct(e, t, a) {
      (e === Xe && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) && (cl(e, 0), $a(e, Te, Lt, false)), vl(e, a), ((Le & 2) === 0 || e !== Xe) && (e === Xe && ((Le & 2) === 0 && (An |= a), We === 4 && $a(e, Te, Lt, false)), ia(e));
    }
    function ff(e, t, a) {
      if ((Le & 6) !== 0) throw Error(r(327));
      var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || yl(e, t), l = n ? $p(e, t) : Su(e, t, true), s = n;
      do {
        if (l === 0) {
          ll && !n && $a(e, t, 0, false);
          break;
        } else {
          if (a = e.current.alternate, s && !Jp(a)) {
            l = Su(e, t, false), s = false;
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
                if (h && (cl(d, u).flags |= 256), u = Su(d, u, false), u !== 2) {
                  if (mu && !h) {
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
            cl(e, 0), $a(e, t, 0, true);
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
                $a(n, t, Lt, !Za);
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
            if ((t & 62914560) === t && (l = ls + 300 - P(), 10 < l)) {
              if ($a(n, t, Lt, !Za), gi(n, 0, true) !== 0) break e;
              Ea = t, n.timeoutHandle = Qf(mf.bind(null, n, a, Et, ss, pu, t, Lt, An, il, Za, s, "Throttled", -0, 0), l);
              break e;
            }
            mf(n, a, Et, ss, pu, t, Lt, An, il, Za, s, null, -0, 0);
          }
        }
        break;
      } while (true);
      ia(e);
    }
    function mf(e, t, a, n, l, s, u, d, h, N, k, Q, R, D) {
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
        }, lf(t, s, Q);
        var se = (s & 62914560) === s ? ls - P() : (s & 4194048) === s ? of - P() : 0;
        if (se = _g(Q, se), se !== null) {
          Ea = s, e.cancelPendingCommit = se(wf.bind(null, e, t, s, a, n, l, u, d, h, k, Q, null, R, D)), $a(e, s, u, !N);
          return;
        }
      }
      wf(e, t, s, a, n, l, u, d, h);
    }
    function Jp(e) {
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
      t &= ~hu, t &= ~An, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
      for (var l = t; 0 < l; ) {
        var s = 31 - Tt(l), u = 1 << s;
        n[s] = -1, l &= ~u;
      }
      a !== 0 && xo(e, a, t);
    }
    function cs() {
      return (Le & 6) === 0 ? (Wl(0), false) : true;
    }
    function bu() {
      if (Ae !== null) {
        if (qe === 0) var e = Ae.return;
        else e = Ae, pa = gn = null, Oc(e), In = null, Ul = 0, e = Ae;
        for (; e !== null; ) Qd(e.alternate, e), e = e.return;
        Ae = null;
      }
    }
    function cl(e, t) {
      var a = e.timeoutHandle;
      a !== -1 && (e.timeoutHandle = -1, hg(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ea = 0, bu(), Xe = e, Ae = a = ma(e.current, null), Te = t, qe = 0, Ot = null, Za = false, ll = yl(e, t), mu = false, il = Lt = hu = An = Ka = We = 0, Et = $l = null, pu = false, (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - Tt(n), s = 1 << l;
        t |= e[l], n &= ~s;
      }
      return Aa = t, Ni(), a;
    }
    function hf(e, t) {
      be = null, T.H = Yl, t === $n || t === Li ? (t = Rr(), qe = 3) : t === Mc ? (t = Rr(), qe = 4) : qe = t === Ic ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, Ae === null && (We = 1, $i(e, Yt(t, e.current)));
    }
    function pf() {
      var e = Dt.current;
      return e === null ? true : (Te & 4194048) === Te ? Zt === null : (Te & 62914560) === Te || (Te & 536870912) !== 0 ? e === Zt : false;
    }
    function gf() {
      var e = T.H;
      return T.H = Yl, e === null ? Yl : e;
    }
    function yf() {
      var e = T.A;
      return T.A = Zp, e;
    }
    function us() {
      We = 4, Za || (Te & 4194048) !== Te && Dt.current !== null || (ll = true), (Ka & 134217727) === 0 && (An & 134217727) === 0 || Xe === null || $a(Xe, Te, Lt, false);
    }
    function Su(e, t, a) {
      var n = Le;
      Le |= 2;
      var l = gf(), s = yf();
      (Xe !== e || Te !== t) && (ss = null, cl(e, t)), t = false;
      var u = We;
      e: do
        try {
          if (qe !== 0 && Ae !== null) {
            var d = Ae, h = Ot;
            switch (qe) {
              case 8:
                bu(), u = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                Dt.current === null && (t = true);
                var N = qe;
                if (qe = 0, Ot = null, ul(e, d, h, N), a && ll) {
                  u = 0;
                  break e;
                }
                break;
              default:
                N = qe, qe = 0, Ot = null, ul(e, d, h, N);
            }
          }
          Fp(), u = We;
          break;
        } catch (k) {
          hf(e, k);
        }
      while (true);
      return t && e.shellSuspendCounter++, pa = gn = null, Le = n, T.H = l, T.A = s, Ae === null && (Xe = null, Te = 0, Ni()), u;
    }
    function Fp() {
      for (; Ae !== null; ) vf(Ae);
    }
    function $p(e, t) {
      var a = Le;
      Le |= 2;
      var n = gf(), l = yf();
      Xe !== e || Te !== t ? (ss = null, is = P() + 500, cl(e, t)) : ll = yl(e, t);
      e: do
        try {
          if (qe !== 0 && Ae !== null) {
            t = Ae;
            var s = Ot;
            t: switch (qe) {
              case 1:
                qe = 0, Ot = null, ul(e, t, s, 1);
                break;
              case 2:
              case 9:
                if (Cr(s)) {
                  qe = 0, Ot = null, bf(t);
                  break;
                }
                t = function() {
                  qe !== 2 && qe !== 9 || Xe !== e || (qe = 7), ia(e);
                }, s.then(t, t);
                break e;
              case 3:
                qe = 7;
                break e;
              case 4:
                qe = 5;
                break e;
              case 7:
                Cr(s) ? (qe = 0, Ot = null, bf(t)) : (qe = 0, Ot = null, ul(e, t, s, 7));
                break;
              case 5:
                var u = null;
                switch (Ae.tag) {
                  case 26:
                    u = Ae.memoizedState;
                  case 5:
                  case 27:
                    var d = Ae;
                    if (u ? lm(u) : d.stateNode.complete) {
                      qe = 0, Ot = null;
                      var h = d.sibling;
                      if (h !== null) Ae = h;
                      else {
                        var N = d.return;
                        N !== null ? (Ae = N, os(N)) : Ae = null;
                      }
                      break t;
                    }
                }
                qe = 0, Ot = null, ul(e, t, s, 5);
                break;
              case 6:
                qe = 0, Ot = null, ul(e, t, s, 6);
                break;
              case 8:
                bu(), We = 6;
                break e;
              default:
                throw Error(r(462));
            }
          }
          Ip();
          break;
        } catch (k) {
          hf(e, k);
        }
      while (true);
      return pa = gn = null, T.H = n, T.A = l, Le = a, Ae !== null ? 0 : (Xe = null, Te = 0, Ni(), We);
    }
    function Ip() {
      for (; Ae !== null && !ne(); ) vf(Ae);
    }
    function vf(e) {
      var t = Gd(e.alternate, e, Aa);
      e.memoizedProps = e.pendingProps, t === null ? os(e) : Ae = t;
    }
    function bf(e) {
      var t = e, a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Od(a, t, t.pendingProps, t.type, void 0, Te);
          break;
        case 11:
          t = Od(a, t, t.pendingProps, t.type.render, t.ref, Te);
          break;
        case 5:
          Oc(t);
        default:
          Qd(a, t), t = Ae = gr(t, Aa), t = Gd(a, t, Aa);
      }
      e.memoizedProps = e.pendingProps, t === null ? os(e) : Ae = t;
    }
    function ul(e, t, a, n) {
      pa = gn = null, Oc(t), In = null, Ul = 0;
      var l = t.return;
      try {
        if (Bp(e, l, t, a, Te)) {
          We = 1, $i(e, Yt(a, e.current)), Ae = null;
          return;
        }
      } catch (s) {
        if (l !== null) throw Ae = l, s;
        We = 1, $i(e, Yt(a, e.current)), Ae = null;
        return;
      }
      t.flags & 32768 ? (De || n === 1 ? e = true : ll || (Te & 536870912) !== 0 ? e = false : (Za = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Dt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Sf(t, e)) : os(t);
    }
    function os(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Sf(t, Za);
          return;
        }
        e = t.return;
        var a = Yp(t.alternate, t, Aa);
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
      We === 0 && (We = 5);
    }
    function Sf(e, t) {
      do {
        var a = Qp(e.alternate, e);
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
      We = 6, Ae = null;
    }
    function wf(e, t, a, n, l, s, u, d, h) {
      e.cancelPendingCommit = null;
      do
        rs();
      while (ut !== 0);
      if ((Le & 6) !== 0) throw Error(r(327));
      if (t !== null) {
        if (t === e.current) throw Error(r(177));
        if (s = t.lanes | t.childLanes, s |= uc, Th(e, a, s, u, d, h), e === Xe && (Ae = Xe = null, Te = 0), sl = t, Fa = e, Ea = a, gu = s, yu = l, rf = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, tg(ke, function() {
          return Ef(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
          n = T.T, T.T = null, l = O.p, O.p = 2, u = Le, Le |= 4;
          try {
            Xp(e, t, a);
          } finally {
            Le = u, O.p = l, T.T = n;
          }
        }
        ut = 1, xf(), Mf(), jf();
      }
    }
    function xf() {
      if (ut === 1) {
        ut = 0;
        var e = Fa, t = sl, a = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || a) {
          a = T.T, T.T = null;
          var n = O.p;
          O.p = 2;
          var l = Le;
          Le |= 4;
          try {
            tf(t, e);
            var s = _u, u = cr(e.containerInfo), d = s.focusedElem, h = s.selectionRange;
            if (u !== d && d && d.ownerDocument && sr(d.ownerDocument.documentElement, d)) {
              if (h !== null && nc(d)) {
                var N = h.start, k = h.end;
                if (k === void 0 && (k = N), "selectionStart" in d) d.selectionStart = N, d.selectionEnd = Math.min(k, d.value.length);
                else {
                  var Q = d.ownerDocument || document, R = Q && Q.defaultView || window;
                  if (R.getSelection) {
                    var D = R.getSelection(), se = d.textContent.length, he = Math.min(h.start, se), Ye = h.end === void 0 ? he : Math.min(h.end, se);
                    !D.extend && he > Ye && (u = Ye, Ye = he, he = u);
                    var x = ir(d, he), b = ir(d, Ye);
                    if (x && b && (D.rangeCount !== 1 || D.anchorNode !== x.node || D.anchorOffset !== x.offset || D.focusNode !== b.node || D.focusOffset !== b.offset)) {
                      var E = Q.createRange();
                      E.setStart(x.node, x.offset), D.removeAllRanges(), he > Ye ? (D.addRange(E), D.extend(b.node, b.offset)) : (E.setEnd(b.node, b.offset), D.addRange(E));
                    }
                  }
                }
              }
              for (Q = [], D = d; D = D.parentNode; ) D.nodeType === 1 && Q.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
              for (typeof d.focus == "function" && d.focus(), d = 0; d < Q.length; d++) {
                var H = Q[d];
                H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
              }
            }
            xs = !!zu, _u = zu = null;
          } finally {
            Le = l, O.p = n, T.T = a;
          }
        }
        e.current = t, ut = 2;
      }
    }
    function Mf() {
      if (ut === 2) {
        ut = 0;
        var e = Fa, t = sl, a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = T.T, T.T = null;
          var n = O.p;
          O.p = 2;
          var l = Le;
          Le |= 4;
          try {
            $d(e, t.alternate, t);
          } finally {
            Le = l, O.p = n, T.T = a;
          }
        }
        ut = 3;
      }
    }
    function jf() {
      if (ut === 4 || ut === 3) {
        ut = 0, J();
        var e = Fa, t = sl, a = Ea, n = rf;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ut = 5 : (ut = 0, sl = Fa = null, Af(e, e.pendingLanes));
        var l = e.pendingLanes;
        if (l === 0 && (Ja = null), qs(a), t = t.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function") try {
          Rt.onCommitFiberRoot(gl, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (n !== null) {
          t = T.T, l = O.p, O.p = 2, T.T = null;
          try {
            for (var s = e.onRecoverableError, u = 0; u < n.length; u++) {
              var d = n[u];
              s(d.value, {
                componentStack: d.stack
              });
            }
          } finally {
            T.T = t, O.p = l;
          }
        }
        (Ea & 3) !== 0 && rs(), ia(e), l = e.pendingLanes, (a & 261930) !== 0 && (l & 42) !== 0 ? e === vu ? Il++ : (Il = 0, vu = e) : Il = 0, Wl(0);
      }
    }
    function Af(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, _l(t)));
    }
    function rs() {
      return xf(), Mf(), jf(), Ef();
    }
    function Ef() {
      if (ut !== 5) return false;
      var e = Fa, t = gu;
      gu = 0;
      var a = qs(Ea), n = T.T, l = O.p;
      try {
        O.p = 32 > a ? 32 : a, T.T = null, a = yu, yu = null;
        var s = Fa, u = Ea;
        if (ut = 0, sl = Fa = null, Ea = 0, (Le & 6) !== 0) throw Error(r(331));
        var d = Le;
        if (Le |= 4, cf(s.current), nf(s, s.current, u, a), Le = d, Wl(0, false), Rt && typeof Rt.onPostCommitFiberRoot == "function") try {
          Rt.onPostCommitFiberRoot(gl, s);
        } catch {
        }
        return true;
      } finally {
        O.p = l, T.T = n, Af(e, t);
      }
    }
    function Cf(e, t, a) {
      t = Yt(a, t), t = $c(e.stateNode, t, 2), e = Ya(e, t, 2), e !== null && (vl(e, 2), ia(e));
    }
    function Be(e, t, a) {
      if (e.tag === 3) Cf(e, e, a);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          Cf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Ja === null || !Ja.has(n))) {
            e = Yt(a, e), a = Cd(2), n = Ya(t, a, 2), n !== null && (Nd(a, n, t, e), vl(n, 2), ia(n));
            break;
          }
        }
        t = t.return;
      }
    }
    function wu(e, t, a) {
      var n = e.pingCache;
      if (n === null) {
        n = e.pingCache = new Kp();
        var l = /* @__PURE__ */ new Set();
        n.set(t, l);
      } else l = n.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), n.set(t, l));
      l.has(a) || (mu = true, l.add(a), e = Wp.bind(null, e, t, a), t.then(e, e));
    }
    function Wp(e, t, a) {
      var n = e.pingCache;
      n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Xe === e && (Te & a) === a && (We === 4 || We === 3 && (Te & 62914560) === Te && 300 > P() - ls ? (Le & 2) === 0 && cl(e, 0) : hu |= a, il === Te && (il = 0)), ia(e);
    }
    function Nf(e, t) {
      t === 0 && (t = wo()), e = mn(e, t), e !== null && (vl(e, t), ia(e));
    }
    function Pp(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Nf(e, a);
    }
    function eg(e, t) {
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
      n !== null && n.delete(t), Nf(e, a);
    }
    function tg(e, t) {
      return C(e, t);
    }
    var ds = null, ol = null, xu = false, fs = false, Mu = false, Ia = 0;
    function ia(e) {
      e !== ol && e.next === null && (ol === null ? ds = ol = e : ol = ol.next = e), fs = true, xu || (xu = true, ng());
    }
    function Wl(e, t) {
      if (!Mu && fs) {
        Mu = true;
        do
          for (var a = false, n = ds; n !== null; ) {
            if (e !== 0) {
              var l = n.pendingLanes;
              if (l === 0) var s = 0;
              else {
                var u = n.suspendedLanes, d = n.pingedLanes;
                s = (1 << 31 - Tt(42 | e) + 1) - 1, s &= l & ~(u & ~d), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
              }
              s !== 0 && (a = true, _f(n, s));
            } else s = Te, s = gi(n, n === Xe ? s : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (s & 3) === 0 || yl(n, s) || (a = true, _f(n, s));
            n = n.next;
          }
        while (a);
        Mu = false;
      }
    }
    function ag() {
      Rf();
    }
    function Rf() {
      fs = xu = false;
      var e = 0;
      Ia !== 0 && mg() && (e = Ia);
      for (var t = P(), a = null, n = ds; n !== null; ) {
        var l = n.next, s = Tf(n, t);
        s === 0 ? (n.next = null, a === null ? ds = l : a.next = l, l === null && (ol = a)) : (a = n, (e !== 0 || (s & 3) !== 0) && (fs = true)), n = l;
      }
      ut !== 0 && ut !== 5 || Wl(e), Ia !== 0 && (Ia = 0);
    }
    function Tf(e, t) {
      for (var a = e.suspendedLanes, n = e.pingedLanes, l = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
        var u = 31 - Tt(s), d = 1 << u, h = l[u];
        h === -1 ? ((d & a) === 0 || (d & n) !== 0) && (l[u] = Rh(d, t)) : h <= t && (e.expiredLanes |= d), s &= ~d;
      }
      if (t = Xe, a = Te, a = gi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && V(n), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || yl(e, a)) {
        if (t = a & -a, t === e.callbackPriority) return t;
        switch (n !== null && V(n), qs(a)) {
          case 2:
          case 8:
            a = nt;
            break;
          case 32:
            a = ke;
            break;
          case 268435456:
            a = _a2;
            break;
          default:
            a = ke;
        }
        return n = zf.bind(null, e), a = C(a, n), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return n !== null && n !== null && V(n), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function zf(e, t) {
      if (ut !== 0 && ut !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (rs() && e.callbackNode !== a) return null;
      var n = Te;
      return n = gi(e, e === Xe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (ff(e, n, t), Tf(e, P()), e.callbackNode != null && e.callbackNode === a ? zf.bind(null, e) : null);
    }
    function _f(e, t) {
      if (rs()) return null;
      ff(e, t, true);
    }
    function ng() {
      pg(function() {
        (Le & 6) !== 0 ? C(Ve, ag) : Rf();
      });
    }
    function ju() {
      if (Ia === 0) {
        var e = Jn;
        e === 0 && (e = mi, mi <<= 1, (mi & 261888) === 0 && (mi = 256)), Ia = e;
      }
      return Ia;
    }
    function Df(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Si("" + e);
    }
    function Uf(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function lg(e, t, a, n, l) {
      if (t === "submit" && a && a.stateNode === l) {
        var s = Df((l[wt] || null).action), u = n.submitter;
        u && (t = (t = u[wt] || null) ? Df(t.formAction) : u.getAttribute("formAction"), t !== null && (s = t, u = null));
        var d = new ji("action", "action", null, n, l);
        e.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if (Ia !== 0) {
                    var h = u ? Uf(l, u) : new FormData(l);
                    Xc(a, {
                      pending: true,
                      data: h,
                      method: l.method,
                      action: s
                    }, null, h);
                  }
                } else typeof s == "function" && (d.preventDefault(), h = u ? Uf(l, u) : new FormData(l), Xc(a, {
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
    for (var Au = 0; Au < cc.length; Au++) {
      var Eu = cc[Au], ig = Eu.toLowerCase(), sg = Eu[0].toUpperCase() + Eu.slice(1);
      Pt(ig, "on" + sg);
    }
    Pt(rr, "onAnimationEnd"), Pt(dr, "onAnimationIteration"), Pt(fr, "onAnimationStart"), Pt("dblclick", "onDoubleClick"), Pt("focusin", "onFocus"), Pt("focusout", "onBlur"), Pt(xp, "onTransitionRun"), Pt(Mp, "onTransitionStart"), Pt(jp, "onTransitionCancel"), Pt(mr, "onTransitionEnd"), Un("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), Un("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), Un("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), Un("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), on("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), on("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), on("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), on("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), on("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), on("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), cg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pl));
    function Of(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var n = e[a], l = n.event;
        n = n.listeners;
        e: {
          var s = void 0;
          if (t) for (var u = n.length - 1; 0 <= u; u--) {
            var d = n[u], h = d.instance, N = d.currentTarget;
            if (d = d.listener, h !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = N;
            try {
              s(l);
            } catch (k) {
              Ci(k);
            }
            l.currentTarget = null, s = h;
          }
          else for (u = 0; u < n.length; u++) {
            if (d = n[u], h = d.instance, N = d.currentTarget, d = d.listener, h !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = N;
            try {
              s(l);
            } catch (k) {
              Ci(k);
            }
            l.currentTarget = null, s = h;
          }
        }
      }
    }
    function Ee(e, t) {
      var a = t[Bs];
      a === void 0 && (a = t[Bs] = /* @__PURE__ */ new Set());
      var n = e + "__bubble";
      a.has(n) || (Lf(t, e, 2, false), a.add(n));
    }
    function Cu(e, t, a) {
      var n = 0;
      t && (n |= 4), Lf(a, e, n, t);
    }
    var ms = "_reactListening" + Math.random().toString(36).slice(2);
    function Nu(e) {
      if (!e[ms]) {
        e[ms] = true, No.forEach(function(a) {
          a !== "selectionchange" && (cg.has(a) || Cu(a, false, e), Cu(a, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ms] || (t[ms] = true, Cu("selectionchange", false, t));
      }
    }
    function Lf(e, t, a, n) {
      switch (dm(t)) {
        case 2:
          var l = Og;
          break;
        case 8:
          l = Lg;
          break;
        default:
          l = Qu;
      }
      a = l.bind(null, t, a, e), l = void 0, !Js || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = true), n ? l !== void 0 ? e.addEventListener(t, a, {
        capture: true,
        passive: l
      }) : e.addEventListener(t, a, true) : l !== void 0 ? e.addEventListener(t, a, {
        passive: l
      }) : e.addEventListener(t, a, false);
    }
    function Ru(e, t, a, n, l) {
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
            if (u = zn(d), u === null) return;
            if (h = u.tag, h === 5 || h === 6 || h === 26 || h === 27) {
              n = s = u;
              continue e;
            }
            d = d.parentNode;
          }
        }
        n = n.return;
      }
      Ho(function() {
        var N = s, k = Zs(a), Q = [];
        e: {
          var R = hr.get(e);
          if (R !== void 0) {
            var D = ji, se = e;
            switch (e) {
              case "keypress":
                if (xi(a) === 0) break e;
              case "keydown":
              case "keyup":
                D = ep;
                break;
              case "focusin":
                se = "focus", D = Ws;
                break;
              case "focusout":
                se = "blur", D = Ws;
                break;
              case "beforeblur":
              case "afterblur":
                D = Ws;
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
                D = Qo;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                D = Yh;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                D = np;
                break;
              case rr:
              case dr:
              case fr:
                D = Vh;
                break;
              case mr:
                D = ip;
                break;
              case "scroll":
              case "scrollend":
                D = Hh;
                break;
              case "wheel":
                D = cp;
                break;
              case "copy":
              case "cut":
              case "paste":
                D = Kh;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                D = Vo;
                break;
              case "toggle":
              case "beforetoggle":
                D = op;
            }
            var he = (t & 4) !== 0, Ye = !he && (e === "scroll" || e === "scrollend"), x = he ? R !== null ? R + "Capture" : null : R;
            he = [];
            for (var b = N, E; b !== null; ) {
              var H = b;
              if (E = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || E === null || x === null || (H = wl(b, x), H != null && he.push(ei(b, H, E))), Ye) break;
              b = b.return;
            }
            0 < he.length && (R = new D(R, se, null, a, k), Q.push({
              event: R,
              listeners: he
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (R = e === "mouseover" || e === "pointerover", D = e === "mouseout" || e === "pointerout", R && a !== Vs && (se = a.relatedTarget || a.fromElement) && (zn(se) || se[Tn])) break e;
            if ((D || R) && (R = k.window === k ? k : (R = k.ownerDocument) ? R.defaultView || R.parentWindow : window, D ? (se = a.relatedTarget || a.toElement, D = N, se = se ? zn(se) : null, se !== null && (Ye = y(se), he = se.tag, se !== Ye || he !== 5 && he !== 27 && he !== 6) && (se = null)) : (D = null, se = N), D !== se)) {
              if (he = Qo, H = "onMouseLeave", x = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (he = Vo, H = "onPointerLeave", x = "onPointerEnter", b = "pointer"), Ye = D == null ? R : Sl(D), E = se == null ? R : Sl(se), R = new he(H, b + "leave", D, a, k), R.target = Ye, R.relatedTarget = E, H = null, zn(k) === N && (he = new he(x, b + "enter", se, a, k), he.target = E, he.relatedTarget = Ye, H = he), Ye = H, D && se) t: {
                for (he = ug, x = D, b = se, E = 0, H = x; H; H = he(H)) E++;
                H = 0;
                for (var de = b; de; de = he(de)) H++;
                for (; 0 < E - H; ) x = he(x), E--;
                for (; 0 < H - E; ) b = he(b), H--;
                for (; E--; ) {
                  if (x === b || b !== null && x === b.alternate) {
                    he = x;
                    break t;
                  }
                  x = he(x), b = he(b);
                }
                he = null;
              }
              else he = null;
              D !== null && kf(Q, R, D, he, false), se !== null && Ye !== null && kf(Q, Ye, se, he, true);
            }
          }
          e: {
            if (R = N ? Sl(N) : window, D = R.nodeName && R.nodeName.toLowerCase(), D === "select" || D === "input" && R.type === "file") var Ue = Po;
            else if (Io(R)) if (er) Ue = bp;
            else {
              Ue = yp;
              var ue = gp;
            }
            else D = R.nodeName, !D || D.toLowerCase() !== "input" || R.type !== "checkbox" && R.type !== "radio" ? N && Xs(N.elementType) && (Ue = Po) : Ue = vp;
            if (Ue && (Ue = Ue(e, N))) {
              Wo(Q, Ue, a, k);
              break e;
            }
            ue && ue(e, R, N), e === "focusout" && N && R.type === "number" && N.memoizedProps.value != null && Qs(R, "number", R.value);
          }
          switch (ue = N ? Sl(N) : window, e) {
            case "focusin":
              (Io(ue) || ue.contentEditable === "true") && (Hn = ue, lc = N, Rl = null);
              break;
            case "focusout":
              Rl = lc = Hn = null;
              break;
            case "mousedown":
              ic = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ic = false, ur(Q, a, k);
              break;
            case "selectionchange":
              if (wp) break;
            case "keydown":
            case "keyup":
              ur(Q, a, k);
          }
          var we;
          if (ec) e: {
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
          else Bn ? Fo(e, a) && (ze = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ze = "onCompositionStart");
          ze && (Zo && a.locale !== "ko" && (Bn || ze !== "onCompositionStart" ? ze === "onCompositionEnd" && Bn && (we = Go()) : (Oa = k, Fs = "value" in Oa ? Oa.value : Oa.textContent, Bn = true)), ue = hs(N, ze), 0 < ue.length && (ze = new Xo(ze, e, null, a, k), Q.push({
            event: ze,
            listeners: ue
          }), we ? ze.data = we : (we = $o(a), we !== null && (ze.data = we)))), (we = dp ? fp(e, a) : mp(e, a)) && (ze = hs(N, "onBeforeInput"), 0 < ze.length && (ue = new Xo("onBeforeInput", "beforeinput", null, a, k), Q.push({
            event: ue,
            listeners: ze
          }), ue.data = we)), lg(Q, e, N, a, k);
        }
        Of(Q, t);
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
        if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || s === null || (l = wl(e, a), l != null && n.unshift(ei(e, l, s)), l = wl(e, t), l != null && n.push(ei(e, l, s))), e.tag === 3) return n;
        e = e.return;
      }
      return [];
    }
    function ug(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function kf(e, t, a, n, l) {
      for (var s = t._reactName, u = []; a !== null && a !== n; ) {
        var d = a, h = d.alternate, N = d.stateNode;
        if (d = d.tag, h !== null && h === n) break;
        d !== 5 && d !== 26 && d !== 27 || N === null || (h = N, l ? (N = wl(a, s), N != null && u.unshift(ei(a, N, h))) : l || (N = wl(a, s), N != null && u.push(ei(a, N, h)))), a = a.return;
      }
      u.length !== 0 && e.push({
        event: t,
        listeners: u
      });
    }
    var og = /\r\n?/g, rg = /\u0000|\uFFFD/g;
    function qf(e) {
      return (typeof e == "string" ? e : "" + e).replace(og, `
`).replace(rg, "");
    }
    function Bf(e, t) {
      return t = qf(t), qf(e) === t;
    }
    function Ge(e, t, a, n, l, s) {
      switch (a) {
        case "children":
          typeof n == "string" ? t === "body" || t === "textarea" && n === "" || Ln(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && Ln(e, "" + n);
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
          qo(e, n, s);
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
          n != null && Ee("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ee("scrollend", e);
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
          Ee("beforetoggle", e), Ee("toggle", e), yi(e, "popover", n);
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
          (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = qh.get(a) || a, yi(e, a, n));
      }
    }
    function Tu(e, t, a, n, l, s) {
      switch (a) {
        case "style":
          qo(e, n, s);
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
          typeof n == "string" ? Ln(e, n) : (typeof n == "number" || typeof n == "bigint") && Ln(e, "" + n);
          break;
        case "onScroll":
          n != null && Ee("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ee("scrollend", e);
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
          if (!Ro.hasOwnProperty(a)) e: {
            if (a[0] === "o" && a[1] === "n" && (l = a.endsWith("Capture"), t = a.slice(2, l ? a.length - 7 : void 0), s = e[wt] || null, s = s != null ? s[a] : null, typeof s == "function" && e.removeEventListener(t, s, l), typeof n == "function")) {
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
          Ee("error", e), Ee("load", e);
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
          Ee("invalid", e);
          var d = s = u = l = null, h = null, N = null;
          for (n in a) if (a.hasOwnProperty(n)) {
            var k = a[n];
            if (k != null) switch (n) {
              case "name":
                l = k;
                break;
              case "type":
                u = k;
                break;
              case "checked":
                h = k;
                break;
              case "defaultChecked":
                N = k;
                break;
              case "value":
                s = k;
                break;
              case "defaultValue":
                d = k;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null) throw Error(r(137, t));
                break;
              default:
                Ge(e, t, n, k, a, null);
            }
          }
          Uo(e, s, d, h, N, u, l, false);
          return;
        case "select":
          Ee("invalid", e), n = u = s = null;
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
          t = s, a = u, e.multiple = !!n, t != null ? On(e, !!n, t, false) : a != null && On(e, !!n, a, true);
          return;
        case "textarea":
          Ee("invalid", e), s = l = n = null;
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
          Lo(e, n, l, s);
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
          Ee("beforetoggle", e), Ee("toggle", e), Ee("cancel", e), Ee("close", e);
          break;
        case "iframe":
        case "object":
          Ee("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < Pl.length; n++) Ee(Pl[n], e);
          break;
        case "image":
          Ee("error", e), Ee("load", e);
          break;
        case "details":
          Ee("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Ee("error", e), Ee("load", e);
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
          for (N in a) if (a.hasOwnProperty(N) && (n = a[N], n != null)) switch (N) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(r(137, t));
            default:
              Ge(e, t, N, n, a, null);
          }
          return;
        default:
          if (Xs(t)) {
            for (k in a) a.hasOwnProperty(k) && (n = a[k], n !== void 0 && Tu(e, t, k, n, a, void 0));
            return;
          }
      }
      for (d in a) a.hasOwnProperty(d) && (n = a[d], n != null && Ge(e, t, d, n, a, null));
    }
    function dg(e, t, a, n) {
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
          var l = null, s = null, u = null, d = null, h = null, N = null, k = null;
          for (D in a) {
            var Q = a[D];
            if (a.hasOwnProperty(D) && Q != null) switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = Q;
              default:
                n.hasOwnProperty(D) || Ge(e, t, D, null, n, Q);
            }
          }
          for (var R in n) {
            var D = n[R];
            if (Q = a[R], n.hasOwnProperty(R) && (D != null || Q != null)) switch (R) {
              case "type":
                s = D;
                break;
              case "name":
                l = D;
                break;
              case "checked":
                N = D;
                break;
              case "defaultChecked":
                k = D;
                break;
              case "value":
                u = D;
                break;
              case "defaultValue":
                d = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null) throw Error(r(137, t));
                break;
              default:
                D !== Q && Ge(e, t, R, D, n, Q);
            }
          }
          Ys(e, u, d, h, N, k, s, l);
          return;
        case "select":
          D = u = d = R = null;
          for (s in a) if (h = a[s], a.hasOwnProperty(s) && h != null) switch (s) {
            case "value":
              break;
            case "multiple":
              D = h;
            default:
              n.hasOwnProperty(s) || Ge(e, t, s, null, n, h);
          }
          for (l in n) if (s = n[l], h = a[l], n.hasOwnProperty(l) && (s != null || h != null)) switch (l) {
            case "value":
              R = s;
              break;
            case "defaultValue":
              d = s;
              break;
            case "multiple":
              u = s;
            default:
              s !== h && Ge(e, t, l, s, n, h);
          }
          t = d, a = u, n = D, R != null ? On(e, !!a, R, false) : !!n != !!a && (t != null ? On(e, !!a, t, true) : On(e, !!a, a ? [] : "", false));
          return;
        case "textarea":
          D = R = null;
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
              R = l;
              break;
            case "defaultValue":
              D = l;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (l != null) throw Error(r(91));
              break;
            default:
              l !== s && Ge(e, t, u, l, n, s);
          }
          Oo(e, R, D);
          return;
        case "option":
          for (var se in a) if (R = a[se], a.hasOwnProperty(se) && R != null && !n.hasOwnProperty(se)) switch (se) {
            case "selected":
              e.selected = false;
              break;
            default:
              Ge(e, t, se, null, n, R);
          }
          for (h in n) if (R = n[h], D = a[h], n.hasOwnProperty(h) && R !== D && (R != null || D != null)) switch (h) {
            case "selected":
              e.selected = R && typeof R != "function" && typeof R != "symbol";
              break;
            default:
              Ge(e, t, h, R, n, D);
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
          for (var he in a) R = a[he], a.hasOwnProperty(he) && R != null && !n.hasOwnProperty(he) && Ge(e, t, he, null, n, R);
          for (N in n) if (R = n[N], D = a[N], n.hasOwnProperty(N) && R !== D && (R != null || D != null)) switch (N) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (R != null) throw Error(r(137, t));
              break;
            default:
              Ge(e, t, N, R, n, D);
          }
          return;
        default:
          if (Xs(t)) {
            for (var Ye in a) R = a[Ye], a.hasOwnProperty(Ye) && R !== void 0 && !n.hasOwnProperty(Ye) && Tu(e, t, Ye, void 0, n, R);
            for (k in n) R = n[k], D = a[k], !n.hasOwnProperty(k) || R === D || R === void 0 && D === void 0 || Tu(e, t, k, R, n, D);
            return;
          }
      }
      for (var x in a) R = a[x], a.hasOwnProperty(x) && R != null && !n.hasOwnProperty(x) && Ge(e, t, x, null, n, R);
      for (Q in n) R = n[Q], D = a[Q], !n.hasOwnProperty(Q) || R === D || R == null && D == null || Ge(e, t, Q, R, n, D);
    }
    function Hf(e) {
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
    function fg() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), n = 0; n < a.length; n++) {
          var l = a[n], s = l.transferSize, u = l.initiatorType, d = l.duration;
          if (s && d && Hf(u)) {
            for (u = 0, d = l.responseEnd, n += 1; n < a.length; n++) {
              var h = a[n], N = h.startTime;
              if (N > d) break;
              var k = h.transferSize, Q = h.initiatorType;
              k && Hf(Q) && (h = h.responseEnd, u += k * (h < d ? 1 : (d - N) / (h - N)));
            }
            if (--n, t += 8 * (s + u) / (l.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var zu = null, _u = null;
    function ps(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Gf(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Yf(e, t) {
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
    function Du(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Uu = null;
    function mg() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Uu ? false : (Uu = e, true) : (Uu = null, false);
    }
    var Qf = typeof setTimeout == "function" ? setTimeout : void 0, hg = typeof clearTimeout == "function" ? clearTimeout : void 0, Xf = typeof Promise == "function" ? Promise : void 0, pg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xf < "u" ? function(e) {
      return Xf.resolve(null).then(e).catch(gg);
    } : Qf;
    function gg(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Wa(e) {
      return e === "head";
    }
    function Vf(e, t) {
      var a = t, n = 0;
      do {
        var l = a.nextSibling;
        if (e.removeChild(a), l && l.nodeType === 8) if (a = l.data, a === "/$" || a === "/&") {
          if (n === 0) {
            e.removeChild(l), ml(t);
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
      ml(t);
    }
    function Zf(e, t) {
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
    function Ou(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Ou(a), Hs(a);
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
    function yg(e, t, a, n) {
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
    function vg(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Kf(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
      return e;
    }
    function Lu(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function ku(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function bg(e, t) {
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
    var qu = null;
    function Jf(e) {
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
    function Ff(e) {
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
    function $f(e, t, a) {
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
      Hs(e);
    }
    var Jt = /* @__PURE__ */ new Map(), If = /* @__PURE__ */ new Set();
    function gs(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Ca = O.d;
    O.d = {
      f: Sg,
      r: wg,
      D: xg,
      C: Mg,
      L: jg,
      m: Ag,
      X: Cg,
      S: Eg,
      M: Ng
    };
    function Sg() {
      var e = Ca.f(), t = cs();
      return e || t;
    }
    function wg(e) {
      var t = _n(e);
      t !== null && t.tag === 5 && t.type === "form" ? md(t) : Ca.r(e);
    }
    var rl = typeof document > "u" ? null : document;
    function Wf(e, t, a) {
      var n = rl;
      if (n && typeof t == "string" && t) {
        var l = Ht(t);
        l = 'link[rel="' + e + '"][href="' + l + '"]', typeof a == "string" && (l += '[crossorigin="' + a + '"]'), If.has(l) || (If.add(l), e = {
          rel: e,
          crossOrigin: a,
          href: t
        }, n.querySelector(l) === null && (t = n.createElement("link"), gt(t, "link", e), ot(t), n.head.appendChild(t)));
      }
    }
    function xg(e) {
      Ca.D(e), Wf("dns-prefetch", e, null);
    }
    function Mg(e, t) {
      Ca.C(e, t), Wf("preconnect", e, t);
    }
    function jg(e, t, a) {
      Ca.L(e, t, a);
      var n = rl;
      if (n && e && t) {
        var l = 'link[rel="preload"][as="' + Ht(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (l += '[imagesrcset="' + Ht(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (l += '[imagesizes="' + Ht(a.imageSizes) + '"]')) : l += '[href="' + Ht(e) + '"]';
        var s = l;
        switch (t) {
          case "style":
            s = dl(e);
            break;
          case "script":
            s = fl(e);
        }
        Jt.has(s) || (e = Y({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        }, a), Jt.set(s, e), n.querySelector(l) !== null || t === "style" && n.querySelector(ai(s)) || t === "script" && n.querySelector(ni(s)) || (t = n.createElement("link"), gt(t, "link", e), ot(t), n.head.appendChild(t)));
      }
    }
    function Ag(e, t) {
      Ca.m(e, t);
      var a = rl;
      if (a && e) {
        var n = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + Ht(n) + '"][href="' + Ht(e) + '"]', s = l;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            s = fl(e);
        }
        if (!Jt.has(s) && (e = Y({
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
    function Eg(e, t, a) {
      Ca.S(e, t, a);
      var n = rl;
      if (n && e) {
        var l = Dn(n).hoistableStyles, s = dl(e);
        t = t || "default";
        var u = l.get(s);
        if (!u) {
          var d = {
            loading: 0,
            preload: null
          };
          if (u = n.querySelector(ai(s))) d.loading = 5;
          else {
            e = Y({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, a), (a = Jt.get(s)) && Bu(e, a);
            var h = u = n.createElement("link");
            ot(h), gt(h, "link", e), h._p = new Promise(function(N, k) {
              h.onload = N, h.onerror = k;
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
    function Cg(e, t) {
      Ca.X(e, t);
      var a = rl;
      if (a && e) {
        var n = Dn(a).hoistableScripts, l = fl(e), s = n.get(l);
        s || (s = a.querySelector(ni(l)), s || (e = Y({
          src: e,
          async: true
        }, t), (t = Jt.get(l)) && Hu(e, t), s = a.createElement("script"), ot(s), gt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function Ng(e, t) {
      Ca.M(e, t);
      var a = rl;
      if (a && e) {
        var n = Dn(a).hoistableScripts, l = fl(e), s = n.get(l);
        s || (s = a.querySelector(ni(l)), s || (e = Y({
          src: e,
          async: true,
          type: "module"
        }, t), (t = Jt.get(l)) && Hu(e, t), s = a.createElement("script"), ot(s), gt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function Pf(e, t, a, n) {
      var l = (l = ve.current) ? gs(l) : null;
      if (!l) throw Error(r(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (t = dl(a.href), a = Dn(l).hoistableStyles, n = a.get(t), n || (n = {
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
            e = dl(a.href);
            var s = Dn(l).hoistableStyles, u = s.get(e);
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
            }, Jt.set(e, a), s || Rg(l, e, a, u.state))), t && n === null) throw Error(r(528, ""));
            return u;
          }
          if (t && n !== null) throw Error(r(529, ""));
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = fl(a), a = Dn(l).hoistableScripts, n = a.get(t), n || (n = {
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
    function dl(e) {
      return 'href="' + Ht(e) + '"';
    }
    function ai(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function em(e) {
      return Y({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Rg(e, t, a, n) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
        return n.loading |= 1;
      }), t.addEventListener("error", function() {
        return n.loading |= 2;
      }), gt(t, "link", a), ot(t), e.head.appendChild(t));
    }
    function fl(e) {
      return '[src="' + Ht(e) + '"]';
    }
    function ni(e) {
      return "script[async]" + e;
    }
    function tm(e, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var n = e.querySelector('style[data-href~="' + Ht(a.href) + '"]');
          if (n) return t.instance = n, ot(n), n;
          var l = Y({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement("style"), ot(n), gt(n, "style", l), ys(n, a.precedence, e), t.instance = n;
        case "stylesheet":
          l = dl(a.href);
          var s = e.querySelector(ai(l));
          if (s) return t.state.loading |= 4, t.instance = s, ot(s), s;
          n = em(a), (l = Jt.get(l)) && Bu(n, l), s = (e.ownerDocument || e).createElement("link"), ot(s);
          var u = s;
          return u._p = new Promise(function(d, h) {
            u.onload = d, u.onerror = h;
          }), gt(s, "link", n), t.state.loading |= 4, ys(s, a.precedence, e), t.instance = s;
        case "script":
          return s = fl(a.src), (l = e.querySelector(ni(s))) ? (t.instance = l, ot(l), l) : (n = a, (l = Jt.get(s)) && (n = Y({}, a), Hu(n, l)), e = e.ownerDocument || e, l = e.createElement("script"), ot(l), gt(l, "link", n), e.head.appendChild(l), t.instance = l);
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
    function Bu(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Hu(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var vs = null;
    function am(e, t, a) {
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
    function nm(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null);
    }
    function Tg(e, t, a) {
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
    function lm(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function zg(e, t, a, n) {
      if (a.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var l = dl(n.href), s = t.querySelector(ai(l));
          if (s) {
            t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = bs.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = s, ot(s);
            return;
          }
          s = t.ownerDocument || t, n = em(n), (l = Jt.get(l)) && Bu(n, l), s = s.createElement("link"), ot(s);
          var u = s;
          u._p = new Promise(function(d, h) {
            u.onload = d, u.onerror = h;
          }), gt(s, "link", n), a.instance = s;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = bs.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    var Gu = 0;
    function _g(e, t) {
      return e.stylesheets && e.count === 0 && ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var n = setTimeout(function() {
          if (e.stylesheets && ws(e, e.stylesheets), e.unsuspend) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Gu === 0 && (Gu = 62500 * fg());
        var l = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && ws(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, (e.imgBytes > Gu ? 50 : 800) + t);
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(n), clearTimeout(l);
        };
      } : null;
    }
    function bs() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) ws(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var Ss = null;
    function ws(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, Ss = /* @__PURE__ */ new Map(), t.forEach(Dg, e), Ss = null, bs.call(e));
    }
    function Dg(e, t) {
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
    function Ug(e, t, a, n, l, s, u, d, h) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ls(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ls(0), this.hiddenUpdates = Ls(null), this.identifierPrefix = n, this.onUncaughtError = l, this.onCaughtError = s, this.onRecoverableError = u, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function im(e, t, a, n, l, s, u, d, h, N, k, Q) {
      return e = new Ug(e, t, a, u, h, N, k, Q, d), t = 1, s === true && (t |= 24), s = _t(3, null, null, t), e.current = s, s.stateNode = e, t = Sc(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
        element: n,
        isDehydrated: a,
        cache: t
      }, jc(s), e;
    }
    function sm(e) {
      return e ? (e = Qn, e) : Qn;
    }
    function cm(e, t, a, n, l, s) {
      l = sm(l), n.context === null ? n.context = l : n.pendingContext = l, n = Ga(t), n.payload = {
        element: a
      }, s = s === void 0 ? null : s, s !== null && (n.callback = s), a = Ya(e, n, t), a !== null && (Ct(a, e, t), Ll(a, e, t));
    }
    function um(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Yu(e, t) {
      um(e, t), (e = e.alternate) && um(e, t);
    }
    function om(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = mn(e, 67108864);
        t !== null && Ct(t, e, 67108864), Yu(e, 67108864);
      }
    }
    function rm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = kt();
        t = ks(t);
        var a = mn(e, t);
        a !== null && Ct(a, e, t), Yu(e, t);
      }
    }
    var xs = true;
    function Og(e, t, a, n) {
      var l = T.T;
      T.T = null;
      var s = O.p;
      try {
        O.p = 2, Qu(e, t, a, n);
      } finally {
        O.p = s, T.T = l;
      }
    }
    function Lg(e, t, a, n) {
      var l = T.T;
      T.T = null;
      var s = O.p;
      try {
        O.p = 8, Qu(e, t, a, n);
      } finally {
        O.p = s, T.T = l;
      }
    }
    function Qu(e, t, a, n) {
      if (xs) {
        var l = Xu(n);
        if (l === null) Ru(e, t, n, Ms, a), fm(e, n);
        else if (qg(l, e, t, a, n)) n.stopPropagation();
        else if (fm(e, n), t & 4 && -1 < kg.indexOf(e)) {
          for (; l !== null; ) {
            var s = _n(l);
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
                    ia(s), (Le & 6) === 0 && (is = P() + 500, Wl(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = mn(s, 2), d !== null && Ct(d, s, 2), cs(), Yu(s, 2);
            }
            if (s = Xu(n), s === null && Ru(e, t, n, Ms, a), s === l) break;
            l = s;
          }
          l !== null && n.stopPropagation();
        } else Ru(e, t, n, null, a);
      }
    }
    function Xu(e) {
      return e = Zs(e), Vu(e);
    }
    var Ms = null;
    function Vu(e) {
      if (Ms = null, e = zn(e), e !== null) {
        var t = y(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = j(t), e !== null) return e;
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
    function dm(e) {
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
          switch (oe()) {
            case Ve:
              return 2;
            case nt:
              return 8;
            case ke:
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
    var Zu = false, Pa = null, en = null, tn = null, ii = /* @__PURE__ */ new Map(), si = /* @__PURE__ */ new Map(), an = [], kg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function fm(e, t) {
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
      }, t !== null && (t = _n(t), t !== null && om(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
    }
    function qg(e, t, a, n, l) {
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
    function mm(e) {
      var t = zn(e.target);
      if (t !== null) {
        var a = y(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = j(a), t !== null) {
              e.blockedOn = t, Eo(e.priority, function() {
                rm(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = A(a), t !== null) {
              e.blockedOn = t, Eo(e.priority, function() {
                rm(a);
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
        var a = Xu(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var n = new a.constructor(a.type, a);
          Vs = n, a.target.dispatchEvent(n), Vs = null;
        } else return t = _n(a), t !== null && om(t), e.blockedOn = a, false;
        t.shift();
      }
      return true;
    }
    function hm(e, t, a) {
      js(e) && a.delete(t);
    }
    function Bg() {
      Zu = false, Pa !== null && js(Pa) && (Pa = null), en !== null && js(en) && (en = null), tn !== null && js(tn) && (tn = null), ii.forEach(hm), si.forEach(hm);
    }
    function As(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Zu || (Zu = true, c.unstable_scheduleCallback(c.unstable_NormalPriority, Bg)));
    }
    var Es = null;
    function pm(e) {
      Es !== e && (Es = e, c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
        Es === e && (Es = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], n = e[t + 1], l = e[t + 2];
          if (typeof n != "function") {
            if (Vu(n || a) === null) continue;
            break;
          }
          var s = _n(a);
          s !== null && (e.splice(t, 3), t -= 3, Xc(s, {
            pending: true,
            data: l,
            method: a.method,
            action: n
          }, n, l));
        }
      }));
    }
    function ml(e) {
      function t(h) {
        return As(h, e);
      }
      Pa !== null && As(Pa, e), en !== null && As(en, e), tn !== null && As(tn, e), ii.forEach(t), si.forEach(t);
      for (var a = 0; a < an.length; a++) {
        var n = an[a];
        n.blockedOn === e && (n.blockedOn = null);
      }
      for (; 0 < an.length && (a = an[0], a.blockedOn === null); ) mm(a), a.blockedOn === null && an.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
        var l = a[n], s = a[n + 1], u = l[wt] || null;
        if (typeof s == "function") u || pm(a);
        else if (u) {
          var d = null;
          if (s && s.hasAttribute("formAction")) {
            if (l = s, u = s[wt] || null) d = u.formAction;
            else if (Vu(l) !== null) continue;
          } else d = u.action;
          typeof d == "function" ? a[n + 1] = d : (a.splice(n, 3), n -= 3), pm(a);
        }
      }
    }
    function gm() {
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
    function Ku(e) {
      this._internalRoot = e;
    }
    Cs.prototype.render = Ku.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current, n = kt();
      cm(a, n, e, t, null, null);
    }, Cs.prototype.unmount = Ku.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        cm(e.current, 2, null, e, null, null), cs(), t[Tn] = null;
      }
    };
    function Cs(e) {
      this._internalRoot = e;
    }
    Cs.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Ao();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var a = 0; a < an.length && t !== 0 && t < an[a].priority; a++) ;
        an.splice(a, 0, e), a === 0 && mm(e);
      }
    };
    var ym = o.version;
    if (ym !== "19.2.7") throw Error(r(527, ym, "19.2.7"));
    O.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
      return e = p(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var Hg = {
      bundleType: 0,
      version: "19.2.7",
      rendererPackageName: "react-dom",
      currentDispatcherRef: T,
      reconcilerVersion: "19.2.7"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Ns = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Ns.isDisabled && Ns.supportsFiber) try {
        gl = Ns.inject(Hg), Rt = Ns;
      } catch {
      }
    }
    return oi.createRoot = function(e, t) {
      if (!m(e)) throw Error(r(299));
      var a = false, n = "", l = Md, s = jd, u = Ad;
      return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), t = im(e, 1, false, null, null, a, n, null, l, s, u, gm), e[Tn] = t.current, Nu(e), new Ku(t);
    }, oi.hydrateRoot = function(e, t, a) {
      if (!m(e)) throw Error(r(299));
      var n = false, l = "", s = Md, u = jd, d = Ad, h = null;
      return a != null && (a.unstable_strictMode === true && (n = true), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (s = a.onUncaughtError), a.onCaughtError !== void 0 && (u = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (h = a.formState)), t = im(e, 1, true, t, a ?? null, n, l, h, s, u, d, gm), t.context = sm(null), a = t.current, n = kt(), n = ks(n), l = Ga(n), l.callback = null, Ya(a, l, n), a = n, t.current.lanes = a, vl(t, a), ia(t), e[Tn] = t.current, Nu(e), new Cs(t);
    }, oi.version = "19.2.7", oi;
  }
  var Cm;
  function $g() {
    if (Cm) return $u.exports;
    Cm = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
    }
    return c(), $u.exports = Fg(), $u.exports;
  }
  var Ig = $g();
  const Wg = {
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
  function Pg(c) {
    const [o, f] = Wg[c];
    return f === null ? `${o}+ Elo` : `${o}\u2013${f} Elo`;
  }
  function Nn(c) {
    return c >= 2200 ? "Grandmaster" : c >= 1800 ? "Master" : c >= 1400 ? "Diamond" : c >= 1200 ? "Platinum" : c >= 1e3 ? "Gold" : c >= 800 ? "Silver" : c >= 501 ? "Bronze" : "Copper";
  }
  function lo(c) {
    const o = Nn(c), f = {
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
    const o = Nn(c), f = lo(c);
    return `${o} ${f === 1 ? "I" : f === 2 ? "II" : "III"}`;
  }
  function ey(c, o) {
    return o > c && (Nn(c) !== Nn(o) || lo(c) !== lo(o));
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
  function Wm({ form: c }) {
    return i.jsx("span", {
      className: "form-pips",
      "aria-label": `Recent form ${c.join(", ")}`,
      children: c.map((o, f) => i.jsx("i", {
        className: `pip ${o}`,
        title: o.toUpperCase()
      }, `${o}-${f}`))
    });
  }
  const ty = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Pm = (...c) => c.filter((o, f, r) => !!o && o.trim() !== "" && r.indexOf(o) === f).join(" ").trim();
  var ay = {
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
  const ny = z.forwardRef(({ color: c = "currentColor", size: o = 24, strokeWidth: f = 2, absoluteStrokeWidth: r, className: m = "", children: y, iconNode: j, ...A }, M) => z.createElement("svg", {
    ref: M,
    ...ay,
    width: o,
    height: o,
    stroke: c,
    strokeWidth: r ? Number(f) * 24 / Number(o) : f,
    className: Pm("lucide", m),
    ...A
  }, [
    ...j.map(([p, S]) => z.createElement(p, S)),
    ...Array.isArray(y) ? y : [
      y
    ]
  ]));
  const je = (c, o) => {
    const f = z.forwardRef(({ className: r, ...m }, y) => z.createElement(ny, {
      ref: y,
      iconNode: o,
      className: Pm(`lucide-${ty(c)}`, r),
      ...m
    }));
    return f.displayName = `${c}`, f;
  };
  const ly = je("ArrowLeft", [
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
  const iy = je("ArrowRight", [
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
  const sy = je("ChartColumn", [
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
  const Us = je("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const cy = je("CircleCheck", [
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
  const uy = je("CircleHelp", [
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
  const eh = je("CircleX", [
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
  const oy = je("Clock3", [
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
  const ry = je("Clock", [
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
  const dy = je("Copy", [
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
  const fy = je("Crown", [
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
  const io = je("Gamepad2", [
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
  const my = je("History", [
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
  const hy = je("House", [
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
  const py = je("Info", [
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
  const th = je("LoaderCircle", [
    [
      "path",
      {
        d: "M21 12a9 9 0 1 1-6.219-8.56",
        key: "13zald"
      }
    ]
  ]);
  const ah = je("LogIn", [
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
  const gy = je("LogOut", [
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
  const nh = je("MessageCircle", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ]
  ]);
  const yy = je("MessageSquare", [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz"
      }
    ]
  ]);
  const lh = je("Minus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ]
  ]);
  const vy = je("Plus", [
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
  const Nm = je("RefreshCw", [
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
  const _s = je("Search", [
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
  const ho = je("Send", [
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
  const so = je("Settings", [
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
  const by = je("Shield", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ]);
  const Sy = je("Shuffle", [
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
  const ih = je("Star", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ]);
  const po = je("Swords", [
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
  const wy = je("TriangleAlert", [
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
  const xy = je("Trophy", [
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
  const eo = je("UserMinus", [
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
  const My = je("UserPlus", [
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
  const jy = je("User", [
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
  const fi = je("Users", [
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
  const Ay = je("Wrench", [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ]);
  const Rn = je("X", [
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
  function Ey({ maps: c, limit: o, selectedMapIds: f, onToggle: r, favoriteMapId: m, onFavorite: y, disabled: j = false }) {
    const A = o === void 0 ? c : c.slice(0, o), M = f !== void 0 && r !== void 0;
    return i.jsx("div", {
      className: "map-pool",
      children: A.map((p) => {
        const S = !M || f.includes(p.id), Y = i.jsxs(i.Fragment, {
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
        return M ? i.jsxs("div", {
          className: "map-thumbnail-wrap",
          children: [
            i.jsx("button", {
              className: S ? "map-thumbnail selected" : "map-thumbnail",
              type: "button",
              "aria-pressed": S,
              "aria-label": `${S ? "Exclude" : "Include"} ${p.name}`,
              disabled: j,
              onClick: () => r(p.id),
              children: Y
            }),
            y && i.jsx("button", {
              className: m === p.id ? "map-favorite active" : "map-favorite",
              type: "button",
              disabled: j,
              "aria-pressed": m === p.id,
              "aria-label": `${m === p.id ? "Remove" : "Favorite"} ${p.name}`,
              title: m === p.id ? "Remove favorite" : "Set as favorite",
              onClick: () => y(p.id),
              children: i.jsx(ih, {
                size: 16,
                fill: m === p.id ? "currentColor" : "none"
              })
            })
          ]
        }, p.id) : i.jsx("figure", {
          className: "map-thumbnail selected",
          children: Y
        }, p.id);
      })
    });
  }
  const Cy = 5, Ny = [
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
  ], Ry = [
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
  ], Ty = {
    version: Cy,
    groups: Ny,
    maps: Ry
  }, Nt = Ty, zy = new Map(Nt.maps.map((c) => [
    c.id,
    c
  ])), go = Nt.maps.filter((c) => c.enabled !== false);
  function sh(c) {
    return zy.get(c);
  }
  function _y(c, o, f = Math.random) {
    var _a2, _b2;
    const r = new Set(o.mapPool.map((p) => p.id)), m = c.mapPool.filter((p) => r.has(p.id));
    if (m.length === 0) return;
    const y = new Set(Object.values(((_a2 = c.mapPreferences) == null ? void 0 : _a2.favoriteMapIds) ?? {})), j = new Set(Object.values(((_b2 = o.mapPreferences) == null ? void 0 : _b2.favoriteMapIds) ?? {})), A = m.filter((p) => y.has(p.id) && j.has(p.id));
    if (A.length > 0) return A[Math.floor(f() * A.length)];
    const M = m.flatMap((p) => Array.from({
      length: 1 + Number(y.has(p.id)) + Number(j.has(p.id))
    }, () => p));
    return M[Math.floor(f() * M.length)];
  }
  const Dy = "" + new URL("acropolis-wApZU8dN.png", import.meta.url).href, Uy = "" + new URL("african-clearing--8pL0rBU.png", import.meta.url).href, Oy = "" + new URL("arabia-DEdeLqx5.png", import.meta.url).href, Ly = "" + new URL("arena-CISRjdFq.png", import.meta.url).href, ky = "" + new URL("atacama-CxHEccMV.png", import.meta.url).href, qy = "" + new URL("baltic-DlU6ncMk.png", import.meta.url).href, By = "" + new URL("black-forest-CTgJoH8n.png", import.meta.url).href, Hy = "" + new URL("fortified-clearing-DSf9SH4j.png", import.meta.url).href, Gy = "" + new URL("four-lakes-DxiZ0myb.png", import.meta.url).href, Yy = "" + new URL("golden-swamp-DXKIJwHr.png", import.meta.url).href, Qy = "" + new URL("gold-rush-BqrgFIGq.png", import.meta.url).href, Xy = "" + new URL("hideout-hd8sM5kE.png", import.meta.url).href, Vy = "" + new URL("islands-DmKyUyda.png", import.meta.url).href, Zy = "" + new URL("land-madness-3-nLWb05.png", import.meta.url).href, Ky = "" + new URL("land-nomad-DxHp81Hp.png", import.meta.url).href, Jy = "" + new URL("mediterranean-CKpZDwRi.png", import.meta.url).href, Fy = "" + new URL("michi-Cry_Jx1o.png", import.meta.url).href, $y = {
    "arabia.png": Oy,
    "land-madness.png": Zy,
    "acropolis.png": Dy,
    "african-clearing.png": Uy,
    "atacama.png": ky,
    "gold-rush.png": Qy,
    "land-nomad.png": Ky,
    "arena.png": Ly,
    "fortified-clearing.png": Hy,
    "hideout.png": Xy,
    "black-forest.png": By,
    "michi.png": Fy,
    "four-lakes.png": Gy,
    "baltic.png": qy,
    "islands.png": Vy,
    "mediterranean.png": Jy,
    "golden-swamp.png": Yy
  }, $t = go.map((c) => ({
    id: c.id,
    name: c.name,
    style: c.style,
    thumbnailUrl: $y[c.imageAsset]
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
  }, Rm = [
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
  ], Tm = [
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
  function Iy(c) {
    return [
      0,
      1,
      2,
      3,
      4
    ].map((o) => (c + o) % 3 === 0 ? "loss" : "win");
  }
  const yo = Array.from({
    length: 50
  }, (c, o) => {
    const f = 1910 - o * 17 + o % 5 * 3, r = 420 - o * 4, m = 170 + o * 3;
    return {
      id: o === 17 ? dt.id : `player-${o + 1}`,
      aoeProfileId: o === 17 ? dt.aoeProfileId : 62e5 + o,
      displayName: o === 17 ? dt.displayName : `${Tm[o % Tm.length]}${o + 11}`,
      countryCode: Rm[o % Rm.length],
      rating: o === 17 ? dt.rating : f,
      peakRating: o === 17 ? dt.peakRating : f + 54,
      teamRating: o === 17 ? dt.teamRating : f - 75,
      teamPeakRating: o === 17 ? dt.teamPeakRating : f - 20,
      legacy1v1Wins: r,
      legacy1v1Losses: m,
      legacyTeamWins: Math.max(0, r - 120),
      legacyTeamLosses: Math.max(0, m - 80),
      rank: o === 17 ? dt.rank : o + 1,
      division: Nn(o === 17 ? dt.rating : f),
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
      recentForm: Iy(o)
    };
  }), zm = yo.filter((c) => c.id !== dt.id).slice(10, 18);
  Object.fromEntries(go.map((c) => [
    c.gameMapName,
    c.lobbyPickerResultIndex
  ]));
  const Wy = go.filter((c) => c.isCustomMap).map((c) => c.gameMapName), ca = {
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
      customMapNames: Wy,
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
  }, Py = 150, _m = 4e3, Qe = {
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
  }, ev = {
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
  function tv(c) {
    return `[${(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour12: false
    })}] ${c}`;
  }
  class av {
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
  const Os = [
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
  function nv(c, o, f = [], r = Math.random) {
    if ((c == null ? void 0 : c.mode) !== "random") return c;
    const m = o === "land-open" ? c.openLandBans : o === "land-closed" ? c.closedLandBans : [], y = /* @__PURE__ */ new Set([
      ...m ?? [],
      ...f
    ]), j = Os.filter((A) => !y.has(A));
    return {
      mode: "pick",
      civilization: j[Math.floor(r() * j.length)]
    };
  }
  const lv = "http://192.168.4.99:4317".replace(/\/$/, "");
  class iv {
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
      const m = crypto.randomUUID(), y = new Promise((j, A) => {
        this.pending.set(m, {
          resolve: (M) => j(M),
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
      const o = new URL("/events", lv);
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
        this.connectReject ? this.rejectConnecting(new Error(m)) : this.failSubscription(m, r.code);
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
    failSubscription(o, f = "MATCHMAKER_UNAVAILABLE") {
      const r = this.subscription;
      this.subscription = null, r == null ? void 0 : r.listener({
        type: "error",
        code: f,
        message: o
      });
    }
  }
  const Me = new iv();
  class sv {
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
      ].forEach((j, A) => {
        y.push(window.setTimeout(() => {
          const M = [
            50,
            75,
            100,
            150,
            250
          ][A], p = this.queueRatings.get(o) ?? dt.rating;
          f({
            type: "range",
            minRating: p - M,
            maxRating: p + M
          });
        }, j));
      }), y.push(window.setTimeout(() => {
        var _a2;
        const j = this.queuedDefinitions.get(o) ?? r, A = (j == null ? void 0 : j.mapPool) ?? $t, M = {
          mapPool: $t,
          mapPreferences: {
            favoriteMapIds: {}
          }
        }, p = this.lowerRatingLimits.get(o) ?? 0, S = p > 0 ? zm.filter(($) => $.rating >= dt.rating - p) : zm, Y = S[Math.floor(Math.random() * S.length)];
        if (!Y) return;
        const G = _y(j ?? {
          mapPool: A
        }, M), X = (_a2 = Nt.maps.find(($) => $.id === (G == null ? void 0 : G.id))) == null ? void 0 : _a2.groupId, g = j ? {
          ...j,
          civilizationPreference: nv(j.civilizationPreference, X)
        } : void 0, I = {
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
              enabledGroupIds: Nt.groups.map(($) => $.id),
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
          opponent: Y,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 3e4).toISOString(),
          selectedMap: G,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        f({
          type: "match_found",
          match: I
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
  class cv {
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
  let hl = null;
  const Ts = {
    async restore() {
      var _a2;
      if (hl = await ((_a2 = window.electronApi) == null ? void 0 : _a2.loadAuthToken()) ?? null, !hl) return null;
      Me.setToken(hl);
      try {
        const c = (await Me.request("/auth/me")).player;
        return await this.reportSteamLicense(c);
      } catch {
        return await this.logout(false), null;
      }
    },
    async signIn() {
      const c = await Me.request("/auth/steam/start", {
        method: "POST"
      });
      if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
      await window.electronApi.openSteamLogin(c.loginUrl);
      const o = Date.now() + 300 * 1e3;
      for (; Date.now() < o; ) {
        await new Promise((m) => window.setTimeout(m, 1e3));
        const f = await Me.request(`/auth/steam/status?attempt=${encodeURIComponent(c.attemptId)}&token=${encodeURIComponent(c.pollToken)}`);
        if (f.status === "pending") continue;
        if (f.status !== "authenticated" || !f.token) throw new Error(`Steam sign-in ${f.status}.`);
        hl = f.token, await window.electronApi.storeAuthToken(f.token), Me.setToken(f.token);
        const r = await Me.request("/auth/me");
        return await this.reportSteamLicense(r.player);
      }
      throw new Error("Steam sign-in timed out.");
    },
    async reportSteamLicense(c) {
      var _a2;
      if (!window.electronApi || !c.steamId) return c;
      const o = await window.electronApi.runSteamFamilyProbe(c.steamId).catch(() => null);
      return !o || o.status === "unknown" || !o.currentSteamId || !o.ownerSteamId ? c : ((_a2 = await Me.request("/auth/steam-license", {
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
      c && hl && await Me.request("/auth/logout", {
        method: "POST"
      }).catch(() => {
      }), hl = null, Me.setToken(null), await ((_a2 = window.electronApi) == null ? void 0 : _a2.clearAuthToken());
    }
  }, ch = new URLSearchParams(window.location.search), Se = ch.get("preview") === "1", uv = Se && ch.get("capture") === "1", vo = [
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
  ].map(([c, o, f, r, m, y, j, A, M], p) => ({
    id: String(c),
    opponentId: `preview-player-${p + 1}`,
    opponent: String(o),
    opponentRating: Number(f),
    outcome: r,
    map: String(m),
    civilization: String(y),
    opponentCivilization: String(j),
    ratingChange: Number(A),
    durationMinutes: Number(M),
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
  ], uh = [
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
  ], oh = [
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
      players: m.map((y, j) => ({
        id: `${c}-player-${j + 1}`,
        displayName: y,
        slot: j + 1,
        team: 0,
        civilization: "Random",
        ready: j < 2,
        host: j === 0
      })),
      messages: [],
      maxPlayers: r,
      status: "open",
      createdAt: new Date(Date.now() - m.length * 12e4).toISOString(),
      demo: true
    };
  }
  const Dm = {
    async getMine() {
      return Se ? vo : (await Me.request("/matches/history")).matches;
    }
  }, ov = "modulepreload", rv = function(c, o) {
    return new URL(c, o).href;
  }, Um = {}, rh = function(o, f, r) {
    let m = Promise.resolve();
    if (f && f.length > 0) {
      let j = function(S) {
        return Promise.all(S.map((Y) => Promise.resolve(Y).then((G) => ({
          status: "fulfilled",
          value: G
        }), (G) => ({
          status: "rejected",
          reason: G
        }))));
      };
      const A = document.getElementsByTagName("link"), M = document.querySelector("meta[property=csp-nonce]"), p = (M == null ? void 0 : M.nonce) || (M == null ? void 0 : M.getAttribute("nonce"));
      m = j(f.map((S) => {
        if (S = rv(S, r), S in Um) return;
        Um[S] = true;
        const Y = S.endsWith(".css"), G = Y ? '[rel="stylesheet"]' : "";
        if (!!r) for (let I = A.length - 1; I >= 0; I--) {
          const $ = A[I];
          if ($.href === S && (!Y || $.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${S}"]${G}`)) return;
        const g = document.createElement("link");
        if (g.rel = Y ? "stylesheet" : ov, Y || (g.as = "script"), g.crossOrigin = "", g.href = S, p && g.setAttribute("nonce", p), document.head.appendChild(g), Y) return new Promise((I, $) => {
          g.addEventListener("load", I), g.addEventListener("error", () => $(new Error(`Unable to preload CSS for ${S}`)));
        });
      }));
    }
    function y(j) {
      const A = new Event("vite:preloadError", {
        cancelable: true
      });
      if (A.payload = j, window.dispatchEvent(A), !A.defaultPrevented) throw j;
    }
    return m.then((j) => {
      for (const A of j || []) A.status === "rejected" && y(A.reason);
      return o().catch(y);
    });
  };
  class Ds extends Error {
    constructor(o = false) {
      super(o ? "The team replay does not contain final PostGame results yet." : "The replay does not contain a PostGame or Resign operation yet."), this.name = "ReplayNotFinishedError";
    }
  }
  async function dv(c) {
    var _a2;
    if (!window.electronApi) return false;
    const { parse_rec: o } = await rh(async () => {
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
      const j = y.Action;
      if (typeof j != "object" || j === null) return false;
      const A = j.action_data;
      return typeof A == "object" && A !== null && "Resign" in A;
    })) ?? false;
  }
  async function fv(c, o = false) {
    var _a2, _b2;
    if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
    const { parse_rec: f, parse_rec_summary: r } = await rh(async () => {
      const { parse_rec: K, parse_rec_summary: ae } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: K,
        parse_rec_summary: ae
      };
    }, [], import.meta.url), m = await window.electronApi.readReplayFile(c), y = m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength);
    let j;
    try {
      j = f(y);
    } catch {
      throw new Ds();
    }
    const A = ((_a2 = j.operations) == null ? void 0 : _a2.some((K) => "PostGame" in K)) ?? false, M = (_b2 = j.operations) == null ? void 0 : _b2.map((K) => K.Action).filter((K) => typeof K == "object" && K !== null).map((K) => K.action_data).filter((K) => typeof K == "object" && K !== null).map((K) => K.Resign).filter((K) => typeof K == "object" && K !== null).map((K) => K.player_id).find((K) => typeof K == "number");
    if (!o && !A && M === void 0) throw new Ds();
    const p = r(y), S = p.header.game_settings, Y = p.header.replay, G = p.teams.flatMap((K) => K.players.filter((ae) => ae.profile_id > 0).map((ae) => ({
      profileId: ae.profile_id,
      playerNumber: ae.player_number,
      civilizationId: ae.civ_id,
      resigned: ae.resigned
    }))), X = o || G.length > 2;
    if (X && !A) throw new Ds(true);
    const g = p.teams.filter((K) => K.winner).flatMap((K) => K.players), I = p.teams.filter((K) => !K.winner).flatMap((K) => K.players), $ = p.teams.flatMap((K) => K.players).filter((K) => K.profile_id > 0), le = M === void 0 ? void 0 : $.find((K) => K.player_number === M), me = !X && le ? $.find((K) => K.player_number !== M) : g.find((K) => K.profile_id > 0), ce = !X && le || I.find((K) => K.profile_id > 0), pe = G.find((K) => K.playerNumber === p.header.replay.rec_player);
    if (![
      2,
      4,
      8
    ].includes(G.length) || !me || !ce || !pe) throw new Error("The replay does not contain identifiable winning and losing teams.");
    return {
      fileSizeBytes: m.byteLength,
      build: p.header.build,
      recordedAt: p.header.timestamp,
      durationMs: p.duration,
      players: G.sort((K, ae) => K.profileId - ae.profileId),
      settings: {
        cheats: S.cheats,
        replayCheatsEnabled: Y.cheats_enabled,
        instantBuild: Y.instant_build,
        playerCount: S.n_players,
        populationLimit: S.population_limit,
        recordGame: S.record_game,
        gameType: S.game_type,
        replayGameMode: Y.game_mode,
        gameSpeedId: Y.game_speed_id,
        gameSpeed: Y.game_speed,
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
      reporterProfileId: pe.profileId,
      winnerProfileId: me.profile_id,
      loserProfileId: ce.profile_id,
      winningProfileIds: g.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      losingProfileIds: I.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      reason: X ? I.filter((K) => K.profile_id > 0).every((K) => K.resigned) ? "resignation" : "defeat" : M !== void 0 || ce.resigned ? "resignation" : "defeat"
    };
  }
  const dh = "empire-league:lobby-setup-timing:v1", fh = 100, mh = 120, mv = 500, hv = 6, pv = 100;
  function gv(c) {
    const o = hh(c), f = ph()[bo(c)];
    return f.length ? Math.max(1e4, o + vv(f)) : o;
  }
  function yv(c, o) {
    if (!Number.isFinite(o) || o < 1e4 || o > 18e4) return;
    const f = bo(c), r = ph(), m = Math.round(o - hh(c));
    r[f] = [
      ...r[f],
      m
    ].slice(-9);
    try {
      window.localStorage.setItem(dh, JSON.stringify(r));
    } catch {
    }
  }
  function hh(c) {
    const o = bo(c) === "custom", f = ca.mapPicker, r = ca.actions;
    let m = Qe.hostLobbyAutomationSettleMs;
    return m += hv * pv + r.multiplayer.settleMs, m += En(r.hostGame) + mv, m += En(r.createLobby), m += ln() + Qe.resetFocusMs + Qe.resetConfirmationMs, m += ln() + f.openSettleMs, m += ln() + f.styleMenuSettleMs, m += ln() + f.styleSelectionSettleMs, m += ln() + f.searchSettleMs, m += ln() + f.selectionSettleMs, m += En(r.copyLobbyUri) + Qe.clipboardReadMs, m += Om(c.queue.civilizationPreference), m += Qe.lobbyMetadataMs, m += Qe.guestJoinMs + Qe.guestReadySettleMs, m += Om(c.opponentCivilizationPreference), m += Qe.hostReadySettleMs + En(r.hostReady), o && (m += Qe.customMapTransferPollMs + r.guestReady.settleMs, m += Py + r.confirmGuestContent.settleMs, m += Qe.hostReadySettleMs + En(r.hostReady)), m += Qe.customMapTransferPollMs, m += En(r.guestReady), m += Qe.hostReadyToStartMs + Qe.startGameSettleMs, m += En(r.startGame) + Qe.revealAfterStartMs, m;
  }
  function Om(c) {
    if (!c) return 0;
    let o = ln() + ca.civilizationSlotButtons.settleMs;
    return c.mode === "pick" && (o += ln() + ca.civilizationPicker.searchSettleMs), o += ca.civilizationGrid.hoverMs + ca.civilizationGrid.holdMs + ca.civilizationPicker.selectionSettleMs, o += ca.actions.confirmCivilization.settleMs, o;
  }
  function En(c) {
    return (c.hoverMs ?? fh) + (c.holdMs ?? mh) + c.settleMs;
  }
  function ln() {
    return fh + mh;
  }
  function bo(c) {
    var _a2;
    return ca.mapPicker.customMapNames.includes(((_a2 = c.selectedMap) == null ? void 0 : _a2.name) ?? "") ? "custom" : "standard";
  }
  function ph() {
    try {
      const c = JSON.parse(window.localStorage.getItem(dh) ?? "{}");
      return {
        standard: Lm(c.standard),
        custom: Lm(c.custom)
      };
    } catch {
      return {
        standard: [],
        custom: []
      };
    }
  }
  function Lm(c) {
    return Array.isArray(c) ? c.filter((o) => Number.isFinite(o) && Math.abs(o) <= 12e4).slice(-9) : [];
  }
  function vv(c) {
    const o = [
      ...c
    ].sort((r, m) => r - m), f = Math.floor(o.length / 2);
    return o.length % 2 === 0 ? Math.round((o[f - 1] + o[f]) / 2) : o[f];
  }
  const bv = "empire-league:stop-youtube-shorts";
  async function co() {
    window.dispatchEvent(new Event(bv)), document.fullscreenElement && await document.exitFullscreen().catch(() => {
    });
  }
  const gh = "empire-league-settings", km = 7e3, Sv = 65e3, Cn = {
    launchAoe2OnStartup: false,
    serverRegion: "US East",
    matchNotifications: true,
    autoRejectFamilySharing: false,
    maximumLowerOpponentRatingGap: 0
  }, wv = [
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
  ], yh = z.createContext(null);
  function xv({ children: c }) {
    const [o, f] = z.useState("home"), [r, m] = z.useState(null), [y, j] = z.useState("leaderboard"), A = z.useRef(0), M = z.useRef(null), [p, S] = z.useState(Se ? "authenticated" : "loading"), [Y, G] = z.useState(null), [X, g] = z.useState(() => ({
      currentUser: dt,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null,
      transitionInputLocked: false,
      activeMatch: null,
      recentMatches: Se ? vo : [],
      connectionStatus: "online",
      gameStatus: "installed",
      searchRange: {
        min: dt.rating - 50,
        max: dt.rating + 50
      },
      error: null,
      notifications: Se && !uv ? [
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
      mockConfig: ev,
      settings: Mv()
    })), I = z.useRef(X.mockConfig);
    I.current = X.mockConfig;
    const $ = z.useRef(X);
    $.current = X;
    const le = z.useRef(null), me = z.useRef(false), ce = z.useRef(null), pe = z.useRef(null), K = z.useRef(false), ae = z.useRef(null), _ = z.useRef(null), L = z.useRef(false), U = z.useRef(false);
    z.useEffect(() => {
      const w = M.current;
      if (!w || w.page !== o) return;
      M.current = null;
      const C = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          var _a2;
          (_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTo({
            top: w.top
          });
        });
      });
      return () => window.cancelAnimationFrame(C);
    }, [
      o
    ]);
    const Z = z.useMemo(() => ({
      matchmaking: new sv(() => I.current),
      game: new av(() => I.current),
      results: new cv(() => I.current)
    }), []);
    z.useEffect(() => {
      if (Se) return;
      let w = false;
      return Ts.restore().then((C) => {
        w || (C ? (xe(C), Dm.getMine().then((V) => {
          w || g((ne) => ({
            ...ne,
            currentUser: C,
            recentMatches: V
          }));
        }).catch(() => {
          w || g((V) => ({
            ...V,
            currentUser: C,
            recentMatches: []
          }));
        }), S("authenticated")) : S("unauthenticated"));
      }).catch((C) => {
        w || (G(qm(C, "Could not restore the Steam session.")), S("unauthenticated"));
      }), () => {
        w = true;
      };
    }, []), z.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayEnded((w) => {
        const C = $.current.activeMatch;
        !C || $.current.queueStatus !== "in_game" || L.current || (L.current = true, (async () => {
          var _a2;
          let V;
          try {
            V = await fv(w, C.queue.format === "team");
          } catch (ne) {
            if (ne instanceof Ds) {
              L.current = false;
              return;
            }
            const J = ne instanceof Error ? ne.message : "Replay parsing failed.";
            g((P) => ({
              ...P,
              queueStatus: "verifying_result"
            }));
            try {
              await Z.matchmaking.reportMatchResult({
                matchId: C.id,
                error: J
              }), F("Replay could not be parsed; result reported as contested");
              return;
            } catch (P) {
              L.current = false, W({
                code: "RESULT_VERIFICATION_FAILED",
                message: "The replay parsing failure could not be reported.",
                technicalDetails: P instanceof Error ? P.message : J,
                retryable: true
              });
              return;
            }
          }
          await ((_a2 = window.electronApi) == null ? void 0 : _a2.confirmReplayEnded()), g((ne) => ({
            ...ne,
            queueStatus: "verifying_result"
          })), F(`Replay ended with terminal operation (${V.reason}): ${w}`);
          try {
            await Z.matchmaking.reportMatchResult({
              matchId: C.id,
              replay: V
            }), F("Replay result reported; waiting for opponent report");
          } catch (ne) {
            L.current = false, W({
              code: "RESULT_VERIFICATION_FAILED",
              message: "The replay result could not be reported.",
              technicalDetails: ne instanceof Error ? ne.message : "Matchmaker reporting failed.",
              retryable: true
            });
          }
        })());
      });
    }, [
      Z
    ]), z.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayDetectionFailed((w) => {
        const C = $.current.activeMatch;
        !C || $.current.queueStatus !== "in_game" || L.current || (L.current = true, g((V) => ({
          ...V,
          queueStatus: "verifying_result"
        })), F("Replay recording did not start; reporting the result as contested"), Z.matchmaking.reportMatchResult({
          matchId: C.id,
          error: w
        }).then(() => {
          F("Missing replay reported; waiting for contested result");
        }).catch((V) => {
          L.current = false, W({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: V instanceof Error ? V.message : w,
            retryable: true
          });
        }));
      });
    }, [
      Z
    ]);
    async function te() {
      S("authenticating"), G(null);
      try {
        const w = await Ts.signIn();
        xe(w);
        const C = await Dm.getMine();
        g((V) => ({
          ...V,
          currentUser: w,
          recentMatches: C
        })), S("authenticated");
      } catch (w) {
        G(qm(w, "Steam sign-in failed.")), S("unauthenticated");
      }
    }
    async function Ce() {
      var _a2;
      Se || (fe(), le.current && await Z.matchmaking.leaveQueue(le.current).catch(() => {
      }), (_a2 = ce.current) == null ? void 0 : _a2.call(ce), le.current = null, me.current = false, await Ts.logout(), g((w) => ({
        ...w,
        currentUser: dt,
        queueStatus: "idle",
        selectedQueue: null,
        activeMatch: null
      })), S("unauthenticated"), f("home"));
    }
    z.useEffect(() => {
      if (Se) return;
      let w = false;
      async function C() {
        let ne = null;
        try {
          if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
          const J = await window.electronApi.detectAoe2Installation();
          if (!J.installed || !J.path) {
            w || T(J.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
            return;
          }
          if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
            const ke = await window.electronApi.closeAoe2(true);
            if (!ke.closed) throw new Error(ke.message ?? "AoE2 could not be closed.");
          }
          if (!X.settings.launchAoe2OnStartup) return;
          g((nt) => ({
            ...nt,
            gameStatus: "loading"
          })), ne = T("Loading AoE2 DE\u2026", "loading", {
            detail: "Waiting for the game window to become ready.",
            durationMs: null
          });
          const oe = await window.electronApi.launchAoe2();
          if (!oe.launched) throw new Error(oe.message ?? "Steam did not accept the AoE2 DE launch request.");
          if (!await Bm(12e4)) throw new Error("AoE2 started, but its game window did not become ready in time.");
          ne && B(ne, {
            detail: "Finishing game startup."
          }), await Hm(km), w || (g((nt) => ({
            ...nt,
            gameStatus: "running"
          })), ne && B(ne, {
            message: "AoE2 DE is ready",
            tone: "success",
            detail: void 0,
            durationMs: 5e3
          }));
        } catch (J) {
          w || (ne && v(ne), g((P) => ({
            ...P,
            gameStatus: "installed"
          })), T(J instanceof Error ? J.message : "AoE2 DE could not be launched.", "danger"));
        }
      }
      const V = window.setTimeout(() => void C(), 0);
      return () => {
        w = true, window.clearTimeout(V);
      };
    }, []);
    async function Ne(w) {
      let C = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        const V = await window.electronApi.detectAoe2Installation();
        if (!V.installed || !V.path) throw new Error(V.message ?? "AoE2 DE was not detected.");
        const ne = await window.electronApi.detectAoe2Process();
        if (ne.running && !ne.owned && !(await window.electronApi.closeAoe2(false)).closed) {
          const Ve = await window.electronApi.closeAoe2(true);
          if (!Ve.closed) throw new Error(Ve.message ?? "The existing AoE2 process could not be closed.");
        }
        g((oe) => ({
          ...oe,
          gameStatus: "loading"
        })), C = T("Launching AoE2 DE\u2026", "loading", {
          detail: w === "custom" ? "Your custom game action will continue automatically when the game is ready." : "Matchmaking will begin automatically when the game is ready.",
          durationMs: null
        });
        const J = await window.electronApi.launchAoe2();
        if (!J.launched) throw new Error(J.message ?? "Steam did not accept the AoE2 DE launch request.");
        if (!await Bm(12e4)) throw new Error("AoE2 started, but its game window did not become ready in time.");
        return B(C, {
          detail: "Finishing game startup."
        }), await Hm(km), g((oe) => ({
          ...oe,
          gameStatus: "running"
        })), B(C, {
          message: "AoE2 DE is ready",
          tone: "success",
          detail: w === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
          durationMs: 3e3
        }), true;
      } catch (V) {
        return C && v(C), g((ne) => ({
          ...ne,
          gameStatus: "installed"
        })), T(V instanceof Error ? V.message : "AoE2 DE could not be launched.", "danger"), false;
      }
    }
    async function Re(w = "matchmaking") {
      if (!window.electronApi) return true;
      const C = await window.electronApi.detectAoe2Process();
      return C.running && C.windowReady && C.owned ? true : Ne(w);
    }
    function F(w) {
      g((C) => ({
        ...C,
        eventLog: [
          tv(w),
          ...C.eventLog
        ].slice(0, 80)
      }));
    }
    function T(w, C = "info", V = {}) {
      const ne = crypto.randomUUID();
      return g((J) => ({
        ...J,
        notifications: [
          {
            id: ne,
            message: w,
            tone: C,
            detail: V.detail,
            durationMs: V.durationMs === void 0 ? C === "danger" ? 8e3 : 5e3 : V.durationMs,
            dismissible: V.dismissible
          },
          ...J.notifications
        ].slice(0, 4)
      })), ne;
    }
    function O() {
      fe(), _.current = window.setTimeout(() => {
        _.current = null;
        const w = $.current.selectedQueue;
        w && ee(w, "Lobby setup stopped making progress for 65 seconds.");
      }, Sv);
    }
    async function ee(w, C) {
      var _a2, _b2, _c;
      if (K.current) return;
      K.current = true, (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), fe(), me.current = false, ae.current = null, pe.current = null, (_b2 = ce.current) == null ? void 0 : _b2.call(ce), ce.current = null;
      const V = le.current;
      le.current = null, g((ne) => ({
        ...ne,
        queueStatus: "cancelled",
        activeMatch: null,
        error: null,
        transitionInputLocked: false,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), T(C, "warning", {
        durationMs: 5e3,
        dismissible: false
      }), V && await Z.matchmaking.leaveQueue(V).catch(() => {
      });
      {
        await ((_c = window.electronApi) == null ? void 0 : _c.setLobbyInputLock(false).catch(() => ({
          locked: false
        }))), F("Lobby setup failed; automatic AoE2 restart is disabled"), K.current = false;
        return;
      }
    }
    function fe() {
      _.current !== null && (window.clearTimeout(_.current), _.current = null);
    }
    function xe(w) {
      w.steamLicenseStatus !== "family_shared" || U.current || (U.current = true, T("Opponents may reject matches with you because you are using family share.", "warning", {
        durationMs: null,
        dismissible: true
      }));
    }
    function v(w) {
      g((C) => {
        var _a2, _b2;
        return {
          ...C,
          notifications: C.notifications.filter((V) => V.id !== w),
          error: ((_a2 = C.error) == null ? void 0 : _a2.notificationId) === w ? null : C.error,
          queueStatus: ((_b2 = C.error) == null ? void 0 : _b2.notificationId) === w && C.queueStatus === "error" ? "idle" : C.queueStatus
        };
      });
    }
    function B(w, C) {
      g((V) => ({
        ...V,
        notifications: V.notifications.map((ne) => ne.id === w ? {
          ...ne,
          ...C
        } : ne)
      }));
    }
    function W(w) {
      const C = T(w.message, "danger", {
        detail: w.technicalDetails,
        durationMs: null
      });
      g((V) => ({
        ...V,
        error: {
          ...w,
          notificationId: C
        },
        queueStatus: "error"
      }));
    }
    async function ie(w) {
      var _a2, _b2;
      const C = [
        "idle",
        "cancelled",
        "completed"
      ].includes(X.queueStatus) && (!X.activeMatch || X.queueStatus === "completed");
      if (!(X.gameStatus === "loading" || !C || me.current)) {
        me.current = true;
        try {
          if (!await Re()) {
            me.current = false;
            return;
          }
          if (le.current) {
            const J = le.current;
            (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null, le.current = null, await Z.matchmaking.leaveQueue(J).catch(() => {
            });
          }
          const V = await Ts.reportSteamLicense(X.currentUser);
          xe(V), V !== X.currentUser && g((J) => ({
            ...J,
            currentUser: V
          }));
          const ne = await Z.matchmaking.joinQueue({
            queueId: w.id,
            queue: w,
            player: V,
            canHost: true,
            maximumLowerOpponentRatingGap: X.settings.maximumLowerOpponentRatingGap
          });
          le.current = ne.id, ((_b2 = ne.ignoredMapIds) == null ? void 0 : _b2.length) && T("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
            detail: `Ignored maps: ${ne.ignoredMapIds.join(", ")}`,
            durationMs: 1e4
          }), g((J) => ({
            ...J,
            selectedQueue: w,
            searchRange: {
              min: (w.format === "team" ? V.teamRating : V.rating) - 50,
              max: (w.format === "team" ? V.teamRating : V.rating) + 50
            },
            queueStartedAt: ne.joinedAt,
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            queueStatus: "searching",
            activeMatch: null,
            error: null
          })), f("ranked"), F(`Joined queue ${w.id}`), ce.current = Z.matchmaking.subscribeToQueue(ne.id, (J) => {
            var _a3, _b3, _c, _d, _e2, _f, _g, _h, _i, _j, _k;
            if (J.type === "range" && g((P) => ({
              ...P,
              searchRange: {
                min: J.minRating,
                max: J.maxRating
              }
            })), J.type === "match_found") {
              if (X.settings.autoRejectFamilySharing && J.match.queue.id === "ranked-rm-1v1" && J.match.opponent.steamLicenseStatus === "family_shared") {
                F(`Automatically declining family-shared opponent: ${J.match.id}`), T("Automatically declined a Family Share opponent.", "warning"), at(J.match.id);
                return;
              }
              const oe = {
                ...J.match,
                player: X.currentUser,
                status: "match_found"
              };
              ae.current = oe, f("ranked"), g((Ve) => ({
                ...Ve,
                queueStatus: "match_found",
                roomSetupStartedAt: null,
                roomSetupEstimateMs: null,
                roomSetupMilestone: null,
                activeMatch: oe
              })), F(`Match found: ${J.match.id}`), X.settings.matchNotifications && ((_a3 = window.electronApi) == null ? void 0 : _a3.alertMatchFound());
            }
            if (J.type === "opponent_accepted") {
              const P = ae.current;
              if (!P) return;
              (_b3 = window.electronApi) == null ? void 0 : _b3.stopMatchFoundAlert(), O();
              const oe = {
                ...P,
                acceptedByPlayer: true,
                acceptedByOpponent: true,
                status: J.role === "host" ? "creating_lobby" : "waiting_for_opponent"
              };
              ae.current = oe, g((Ve) => ({
                ...Ve,
                queueStatus: J.role === "host" ? "creating_lobby" : "waiting_for_opponent",
                roomSetupStartedAt: (/* @__PURE__ */ new Date()).toISOString(),
                roomSetupEstimateMs: gv(oe),
                roomSetupMilestone: J.role === "host" ? "Setting up lobby room" : "Waiting for the host to set up the lobby room",
                activeMatch: oe
              })), F("Both players accepted"), J.role === "host" && window.electronApi && (F("Assigned as host; waiting for AoE2 lobby automation to settle"), pe.current = Na(Qe.hostLobbyAutomationSettleMs).then(() => {
                var _a4;
                return O(), F("Starting AoE2 lobby automation"), window.electronApi.runAoe2CreateLobbySequence(uo(oe.selectedMap), oe.queue.format === "team" ? (((_a4 = oe.queue.teamSizes) == null ? void 0 : _a4[0]) ?? 2) * 2 : 2);
              }), vt(oe));
            }
            if (J.type === "lobby_ready" && (O(), g((P) => ({
              ...P,
              queueStatus: "ready",
              gameStatus: "in_lobby",
              roomSetupMilestone: "Joining lobby room",
              activeMatch: P.activeMatch ? {
                ...P.activeMatch,
                lobby: J.lobby,
                status: "ready"
              } : null
            })), F(`Host published lobby: ${J.lobby.platformLobbyId ?? "pending"}`), ((_c = J.lobby.platformLobbyId) == null ? void 0 : _c.startsWith("aoe2de://0/")) && window.electronApi && window.electronApi.openAoe2Lobby(J.lobby.platformLobbyId).then(async (P) => {
              var _a4, _b4;
              if (F(P.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected"), P.opened) {
                F("Guest lobby opened; waiting for the Ready button state to settle"), await Na(Qe.guestReadySettleMs);
                const oe = (_a4 = ae.current) == null ? void 0 : _a4.queue.civilizationPreference, Ve = Ym(oe);
                if (Ve) {
                  const ke = ((_b4 = ae.current) == null ? void 0 : _b4.lobbySlot) ?? 2;
                  F(`Selecting ${Ve} for guest lobby slot ${ke}`);
                  const Wt = await window.electronApi.selectAoe2Civilization(Ve, ke);
                  if (!Wt.sent) throw new Error(Wt.message);
                  Wt.usedRandomCivilizationFallback ? (T("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), F(`${Ve} unavailable; Random selected in AoE2`)) : F(`${Ve} selected in AoE2`);
                }
                const nt = ae.current;
                if ((nt == null ? void 0 : nt.queue.format) === "team") {
                  const ke = nt.lobbySlot ?? 2, Wt = nt.team ?? 2;
                  F(`Selecting Team ${Wt} for guest lobby slot ${ke}`);
                  const _a5 = await window.electronApi.selectAoe2Team(Wt, ke);
                  if (!_a5.sent) throw new Error(_a5.message);
                }
                F("Guest lobby opened; reporting join to the host"), await Z.matchmaking.reportGuestLobbyJoined(J.matchId), F("Guest joined; waiting for the host to finalize custom map transfer"), g((ke) => ({
                  ...ke,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((P) => {
              const oe = P instanceof Error ? P.message : "The host lobby could not be opened.";
              F(`Opening the host lobby failed: ${oe}`), ee(w, oe);
            })), J.type === "guest_lobby_joined" && window.electronApi && (g((P) => ({
              ...P,
              roomSetupMilestone: "Opponent joined \u2014 finalizing lobby files"
            })), (async () => {
              try {
                F("Guest joined; waiting for the host lobby state to settle"), await Na(Qe.hostReadySettleMs), F("Guest joined; clicking Ready for the host");
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                await Z.matchmaking.reportHostLobbyReady(J.matchId), F("Host readied; guest notified to wait for custom map transfer"), g((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The host could not finalize the lobby.";
                F(`Automated host Ready failed: ${oe}`), ee(w, oe);
              }
            })()), J.type === "host_lobby_ready" && window.electronApi) {
              const P = Gm((_d = ae.current) == null ? void 0 : _d.selectedMap);
              g((oe) => ({
                ...oe,
                roomSetupMilestone: P ? "Receiving lobby files" : "Waiting for Ready"
              })), (async () => {
                try {
                  const oe = Date.now() + Qe.customMapTransferTimeoutMs;
                  let Ve = false, nt;
                  do
                    await Na(Qe.customMapTransferPollMs), nt = await window.electronApi.runAoe2LobbyCursorAction("guest-ready"), !nt.sent && P && !Ve && (F("Guest Ready remains unavailable; checking for the unverified-content confirmation"), (await window.electronApi.runAoe2LobbyCursorAction("content-confirm")).sent ? (await Z.matchmaking.reportGuestContentAccepted(J.matchId), Ve = true, F(`Content accepted; allowing ${_m} ms for the host to restore Ready`), await Na(_m)) : F("Unverified-content confirmation keys could not be sent"));
                  while (!nt.sent && Date.now() < oe);
                  if (!nt.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
                  F("Guest Ready verified; reporting readiness to the host"), await Z.matchmaking.reportGuestLobbyReady(J.matchId), fe(), g((ke) => ({
                    ...ke,
                    roomSetupMilestone: "Ready \u2014 waiting for the host to start"
                  }));
                } catch (oe) {
                  const Ve = oe instanceof Error ? oe.message : "Lobby file transfer did not complete.";
                  F(`Guest file transfer or Ready failed: ${Ve}`), ee(w, Ve);
                }
              })();
            }
            if (J.type === "guest_content_accepted" && window.electronApi && Gm((_e2 = ae.current) == null ? void 0 : _e2.selectedMap) && (g((P) => ({
              ...P,
              roomSetupMilestone: "Opponent accepted lobby files \u2014 confirming host Ready"
            })), (async () => {
              try {
                F("Guest accepted custom content; waiting for the lobby state to settle"), await Na(Qe.hostReadySettleMs);
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                F("Host Ready verified again after guest content acceptance"), g((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The host could not resume the lobby file transfer.";
                F(`Second host Ready failed: ${oe}`), ee(w, oe);
              }
            })()), J.type === "guest_lobby_ready" && window.electronApi && (g((P) => ({
              ...P,
              roomSetupMilestone: "Opponent ready \u2014 starting game"
            })), (async () => {
              try {
                F("Guest reported ready; waiting for the Start button state to settle"), await Na(Qe.hostReadyToStartMs), await Na(Qe.startGameSettleMs), F("Host readied; clicking Start Game");
                const P = await window.electronApi.runAoe2LobbyCursorAction("start");
                if (!P.sent) throw new Error(P.message);
                fe(), g((oe) => ({
                  ...oe,
                  queueStatus: "ready",
                  gameStatus: "in_match",
                  roomSetupMilestone: "Starting game",
                  transitionInputLocked: true,
                  activeMatch: oe.activeMatch ? {
                    ...oe.activeMatch,
                    status: "ready"
                  } : null
                })), await Z.matchmaking.reportGameStarted(J.matchId), za();
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The automated game start failed.";
                F(`Automated host start failed: ${oe}`), ee(w, oe);
              }
            })()), J.type === "game_started" && (fe(), g((P) => ({
              ...P,
              queueStatus: "ready",
              gameStatus: "in_match",
              roomSetupMilestone: "Starting game",
              transitionInputLocked: true,
              activeMatch: P.activeMatch ? {
                ...P.activeMatch,
                status: "ready"
              } : null
            })), F("Host started the game"), za()), J.type === "result_verified" || J.type === "result_contested") {
              if (J.matchId !== ((_f = $.current.activeMatch) == null ? void 0 : _f.id)) return;
              oa(J.result);
            }
            if (J.type === "error") {
              if (J.code === "TICKET_NOT_FOUND") {
                me.current = false, ae.current = null, le.current = null, (_g = ce.current) == null ? void 0 : _g.call(ce), ce.current = null, g((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), T("The matchmaking server restarted. Rejoining the queue\u2026", "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), F("Queue ticket expired after a server restart; rejoining"), window.setTimeout(() => void ie(w), 0);
                return;
              }
              if (J.code === "MATCH_DISCONNECTED" || J.code === "MATCH_SETUP_FAILED") {
                ee(w, J.message);
                return;
              }
              if (J.code === "MATCH_DECLINED") {
                (_h = window.electronApi) == null ? void 0 : _h.stopMatchFoundAlert(), fe(), me.current = false, ae.current = null, le.current && (Z.matchmaking.leaveQueue(le.current).catch(() => {
                }), le.current = null), (_i = ce.current) == null ? void 0 : _i.call(ce), ce.current = null, g((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), T(J.message, "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), F("Opponent declined; returning to queue"), window.setTimeout(() => void ie(w), 0);
                return;
              }
              J.code === "MATCH_EXPIRED" && ((_j = window.electronApi) == null ? void 0 : _j.stopMatchFoundAlert(), fe(), me.current = false, ae.current = null, le.current && (Z.matchmaking.leaveQueue(le.current).catch(() => {
              }), le.current = null), (_k = ce.current) == null ? void 0 : _k.call(ce), ce.current = null, g((P) => ({
                ...P,
                queueStatus: "cancelled",
                activeMatch: null
              }))), W({
                code: J.code,
                message: J.message,
                retryable: true
              });
            }
          });
        } catch (V) {
          me.current = false, W({
            code: "QUEUE_JOIN_FAILED",
            message: "Matchmaking is currently unavailable.",
            technicalDetails: V instanceof Error ? V.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function ge() {
      var _a2;
      fe(), (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null;
      const w = le.current;
      le.current = null, me.current = false, w && await Z.matchmaking.leaveQueue(w).catch((C) => {
        const V = C instanceof Error ? C.message : "";
        V.toLowerCase().includes("ticket not found") || (F(`Queue cancellation could not be confirmed: ${V || "Unknown error"}`), T("The matchmaking server could not confirm cancellation", "danger", {
          detail: V || void 0,
          durationMs: null
        }));
      }), g((C) => ({
        ...C,
        queueStatus: "cancelled",
        selectedQueue: null,
        queueStartedAt: null,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), F("Queue cancelled");
    }
    async function ve(w) {
      var _a2;
      const C = le.current;
      if (!(!C || $.current.queueStatus !== "searching")) try {
        if (await Z.matchmaking.updateQueue(C, w), $.current.queueStatus !== "searching") return;
        g((V) => ({
          ...V,
          selectedQueue: w
        })), F(`Updated active queue preferences: ${((_a2 = w.civilizationPreference) == null ? void 0 : _a2.mode) ?? "pick"}, ${w.mapPool.length} maps`);
      } catch (V) {
        if ($.current.queueStatus !== "searching") return;
        F(`Active queue preference update failed: ${V instanceof Error ? V.message : "Unknown error"}`), T("Your queue preferences could not be updated", "danger");
      }
    }
    async function _e() {
      var _a2;
      if (X.activeMatch) {
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
          })), F("Local player accepted"), await Z.matchmaking.acceptMatch(X.activeMatch.id);
        } catch (w) {
          W({
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
      (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), fe(), (_b2 = ce.current) == null ? void 0 : _b2.call(ce), ce.current = null;
      try {
        w && await Z.matchmaking.declineMatch(w);
      } finally {
        le.current && await Z.matchmaking.leaveQueue(le.current).catch(() => {
        }), le.current = null, me.current = false, ae.current = null, g((C) => ({
          ...C,
          queueStatus: "cancelled",
          activeMatch: null
        }));
      }
      F("Match declined");
    }
    async function Ke() {
      var _a2;
      await at((_a2 = X.activeMatch) == null ? void 0 : _a2.id);
    }
    async function vt(w) {
      var _a2, _b2, _c;
      const C = w ?? X.activeMatch;
      if (C == null ? void 0 : C.selectedMap) try {
        if (f("ranked"), g((J) => ({
          ...J,
          queueStatus: "creating_lobby"
        })), F("Detecting AoE2 installation"), !(await Z.game.detectInstallation()).installed) throw new Error("AoE2 installation not detected.");
        if (F("Installation detected"), await Z.game.detectRunningGame(), F("AoE2 process found"), await Z.game.launchGame(), F("Opening multiplayer menu"), window.electronApi) {
          const J = await (pe.current ?? window.electronApi.runAoe2CreateLobbySequence(uo(C.selectedMap), C.queue.format === "team" ? (((_a2 = C.queue.teamSizes) == null ? void 0 : _a2[0]) ?? 2) * 2 : 2));
          if (pe.current = null, !J.sent) throw new Error(J.message);
          if (!J.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
          F("AoE2 host-lobby sequence completed"), O();
          const P = C.queue.civilizationPreference, oe = Ym(P);
          if (oe) {
            F(`Selecting ${oe} for host lobby slot 1`);
            const ke = await window.electronApi.selectAoe2Civilization(oe, 1);
            if (!ke.sent) throw new Error(ke.message);
            ke.usedRandomCivilizationFallback ? (T("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), F(`${oe} unavailable; Random selected in AoE2`)) : F(`${oe} selected in AoE2`);
          }
          if (C.queue.format === "team") {
            const ke = C.lobbySlot ?? 1, Wt = C.team ?? 1;
            F(`Selecting Team ${Wt} for host lobby slot ${ke}`);
            const _a3 = await window.electronApi.selectAoe2Team(Wt, ke);
            if (!_a3.sent) throw new Error(_a3.message);
          }
          F(`Lobby URI discovered: ${J.lobbyUri}`);
          const nt = {
            ...(await Z.game.createLobby({
              matchId: C.id,
              hostProfileId: C.player.aoeProfileId,
              guestProfileId: C.opponent.aoeProfileId,
              map: C.selectedMap,
              serverRegion: X.settings.serverRegion,
              playerCount: C.queue.format === "team" ? (((_b2 = C.queue.teamSizes) == null ? void 0 : _b2[0]) ?? 2) * 2 : 2
            })).lobby,
            platformLobbyId: J.lobbyUri
          };
          F(`Lobby created: ${nt.platformLobbyId}`), await Z.matchmaking.publishLobby(C.id, nt), F("Lobby details published to opponent"), fe(), g((ke) => ({
            ...ke,
            activeMatch: ke.activeMatch ? {
              ...ke.activeMatch,
              lobby: nt
            } : null,
            queueStatus: "waiting_for_opponent",
            roomSetupMilestone: "Waiting for opponent to join"
          }));
          return;
        }
        const ne = await Z.game.createLobby({
          matchId: C.id,
          hostProfileId: C.player.aoeProfileId,
          guestProfileId: C.opponent.aoeProfileId,
          map: C.selectedMap,
          serverRegion: X.settings.serverRegion,
          playerCount: C.queue.format === "team" ? (((_c = C.queue.teamSizes) == null ? void 0 : _c[0]) ?? 2) * 2 : 2
        });
        F(`Lobby created: ${ne.lobby.platformLobbyId ?? "pending"}`), await Z.matchmaking.publishLobby(C.id, ne.lobby), F("Lobby details published to opponent"), g((J) => ({
          ...J,
          activeMatch: J.activeMatch ? {
            ...J.activeMatch,
            lobby: ne.lobby
          } : null,
          queueStatus: "waiting_for_opponent"
        })), F("Opponent invited"), await Z.game.waitForGameStart(ne.lobby.platformLobbyId ?? C.id), F("Opponent joined"), g((J) => ({
          ...J,
          queueStatus: "verifying_lobby"
        })), await Z.game.verifyLobby(ne.lobby.platformLobbyId ?? C.id), F("Lobby verified"), g((J) => ({
          ...J,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: J.activeMatch ? {
            ...J.activeMatch,
            lobby: jv(ne.lobby),
            status: "ready"
          } : null
        }));
      } catch (V) {
        const ne = V instanceof Error ? V.message : "We could not create the AoE2 lobby.";
        F(`Lobby preparation failed: ${ne}`);
        const J = C.queue;
        ee(J, ne);
      }
    }
    async function Ta() {
      if (window.electronApi) {
        const w = await window.electronApi.startReplayEndDetection();
        w.started || F(`Replay detection unavailable: ${w.message ?? "unknown error"}`);
      }
      await co(), await Z.game.focusGame(), g((w) => ({
        ...w,
        queueStatus: "in_game",
        gameStatus: "in_match"
      })), F("Focused AoE2"), X.activeMatch && await Z.results.beginTracking(X.activeMatch);
    }
    async function ua() {
      const w = X.activeMatch;
      if (w) try {
        g((V) => ({
          ...V,
          queueStatus: "verifying_result"
        })), F("Game finished");
        const C = await Z.results.waitForVerifiedResult(w.id);
        oa(C);
      } catch (C) {
        W({
          code: "RESULT_VERIFICATION_FAILED",
          message: "The result service could not verify this match.",
          technicalDetails: C instanceof Error ? C.message : void 0,
          retryable: true
        });
      }
    }
    function oa(w) {
      var _a2;
      me.current = false, L.current = false, (_a2 = window.electronApi) == null ? void 0 : _a2.stopReplayEndDetection(), g((C) => {
        var _a3, _b2, _c;
        const V = C.activeMatch ? {
          ...C.activeMatch,
          result: w,
          status: "completed"
        } : null, ne = w.ratingPool === "team", J = !ne && w.outcome === "win" ? C.currentUser.wins + 1 : C.currentUser.wins, P = !ne && w.outcome === "loss" ? C.currentUser.losses + 1 : C.currentUser.losses, oe = {
          ...C.currentUser,
          rating: w.verified && !ne ? w.newRating : C.currentUser.rating,
          peakRating: w.verified && !ne ? Math.max(C.currentUser.peakRating, w.newRating) : C.currentUser.peakRating,
          teamRating: w.verified && ne ? w.newRating : C.currentUser.teamRating,
          teamPeakRating: w.verified && ne ? Math.max(C.currentUser.teamPeakRating, w.newRating) : C.currentUser.teamPeakRating,
          division: w.verified && !ne ? Nn(w.newRating) : C.currentUser.division,
          wins: J,
          losses: P,
          winRate: J + P > 0 ? Number((J / (J + P) * 100).toFixed(1)) : 0,
          streak: ne ? C.currentUser.streak : w.outcome === "win" ? Math.max(1, C.currentUser.streak + 1) : w.outcome === "loss" ? Math.min(-1, C.currentUser.streak - 1) : C.currentUser.streak
        }, Ve = V && w.verified ? {
          id: V.id,
          opponent: V.opponent.displayName,
          opponentId: V.opponent.id,
          opponentRating: ne ? V.opponent.teamRating : V.opponent.rating,
          outcome: w.outcome,
          map: ((_a3 = V.selectedMap) == null ? void 0 : _a3.name) ?? "Arabia",
          civilization: ((_b2 = V.queue.civilizationPreference) == null ? void 0 : _b2.civilization) ?? "",
          opponentCivilization: ((_c = V.opponentCivilizationPreference) == null ? void 0 : _c.civilization) ?? "",
          ratingChange: w.ratingChange,
          durationMinutes: 24,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          verified: w.verified,
          queueType: V.queue.name
        } : null;
        return {
          ...C,
          currentUser: oe,
          activeMatch: V,
          queueStatus: "completed",
          gameStatus: "installed",
          recentMatches: Ve ? [
            Ve,
            ...C.recentMatches
          ] : C.recentMatches
        };
      }), w.verificationStatus === "contested" ? (F("Replay reports conflicted; result discarded"), T("Result contested \u2014 no rating change", "warning")) : F("Match result verified");
    }
    async function It() {
      var _a2;
      (_a2 = ce.current) == null ? void 0 : _a2.call(ce), ce.current = null, le.current && (await Z.matchmaking.leaveQueue(le.current).catch(() => {
      }), le.current = null), ae.current = null, g((w) => ({
        ...w,
        queueStatus: "idle",
        selectedQueue: null,
        queueStartedAt: null,
        activeMatch: null,
        error: null
      })), f("ranked");
    }
    function cn(w) {
      g((C) => ({
        ...C,
        mockConfig: {
          ...C.mockConfig,
          ...w
        }
      }));
    }
    async function za() {
      if (!window.electronApi) return;
      await Na(Qe.revealAfterStartMs);
      const w = await window.electronApi.startReplayEndDetection();
      w.started || F(`Replay detection unavailable: ${w.message ?? "unknown error"}`), await co(), await window.electronApi.focusAoe2();
      const C = $.current;
      C.activeMatch && C.roomSetupStartedAt && yv(C.activeMatch, Date.now() - new Date(C.roomSetupStartedAt).getTime()), g((V) => ({
        ...V,
        queueStatus: "in_game",
        roomSetupMilestone: null,
        transitionInputLocked: false,
        activeMatch: V.activeMatch ? {
          ...V.activeMatch,
          status: "in_game"
        } : null
      })), F("Showing AoE2 after game start");
    }
    function q(w) {
      g((C) => {
        const V = {
          ...C.settings,
          ...w
        };
        return window.localStorage.setItem(gh, JSON.stringify(V)), {
          ...C,
          settings: V
        };
      });
    }
    const re = {
      state: X,
      page: o,
      setPage: f,
      selectedProfileId: r,
      openPlayerProfile: (w) => {
        var _a2;
        o !== "profile" && (j(o), A.current = ((_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTop) ?? 0), m(w), f("profile");
      },
      returnFromPlayerProfile: () => {
        M.current = {
          page: y,
          top: A.current
        }, m(null), f(y);
      },
      queues: wv,
      ensureAoe2Ready: Re,
      startQueue: ie,
      updateActiveQueue: ve,
      cancelQueue: ge,
      acceptMatch: _e,
      declineMatch: Ke,
      prepareLobby: vt,
      openAoe2: Ta,
      simulateMatchEnd: ua,
      returnToMatchmaking: It,
      updateMockConfig: cn,
      updateSettings: q,
      notify: T,
      dismissNotification: v,
      clearError: () => g((w) => {
        var _a2;
        return {
          ...w,
          error: null,
          queueStatus: "idle",
          notifications: ((_a2 = w.error) == null ? void 0 : _a2.notificationId) ? w.notifications.filter((C) => {
            var _a3;
            return C.id !== ((_a3 = w.error) == null ? void 0 : _a3.notificationId);
          }) : w.notifications
        };
      }),
      authStatus: p,
      authError: Y,
      signInWithSteam: te,
      signOut: Ce
    };
    return i.jsx(yh.Provider, {
      value: re,
      children: c
    });
  }
  function qm(c, o) {
    return c instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(c.message) ? "Error: Matchmaking server is down." : c instanceof Error ? c.message : o;
  }
  async function Bm(c) {
    if (!window.electronApi) return false;
    const o = Date.now() + c;
    for (; Date.now() < o; ) {
      const f = await window.electronApi.detectAoe2Process();
      if (f.running && f.windowReady) return true;
      await new Promise((r) => window.setTimeout(r, 500));
    }
    return false;
  }
  function Hm(c) {
    return new Promise((o) => window.setTimeout(o, c));
  }
  function Na(c) {
    return new Promise((o) => window.setTimeout(o, c));
  }
  function uo(c) {
    var _a2;
    return (c && ((_a2 = sh(c.id)) == null ? void 0 : _a2.gameMapName)) ?? Nt.maps[0].gameMapName;
  }
  function Gm(c) {
    return c !== void 0 && ca.mapPicker.customMapNames.includes(uo(c));
  }
  function Ym(c) {
    return c ? c.mode === "pick" ? c.civilization ?? null : c.mode === "random" ? null : c.mode === "mirror" ? "Mirror" : null : null;
  }
  function St() {
    const c = z.useContext(yh);
    if (!c) throw new Error("useAppStore must be used inside AppProvider");
    return c;
  }
  function Mv() {
    try {
      const c = window.localStorage.getItem(gh);
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
  function jv(c) {
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
  const Av = ((_a = sn.find((c) => c.id === "land-open")) == null ? void 0 : _a.maps) ?? [];
  function Ev() {
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
                f.length > 0 && i.jsx(Wm, {
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
            i.jsx(Ey, {
              maps: Av
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
  function Ra({ label: c, options: o, value: f, onChange: r, className: m, disabled: y = false, searchable: j = false, displayValue: A }) {
    var _a2, _b2;
    const M = z.useRef(null), [p, S] = z.useState(""), Y = A ?? ((_a2 = o.find((X) => X.value === f)) == null ? void 0 : _a2.label) ?? ((_b2 = o[0]) == null ? void 0 : _b2.label) ?? "", G = j ? o.filter((X) => X.label.toLowerCase().includes(p.trim().toLowerCase())) : o;
    return z.useEffect(() => {
      const X = (g) => {
        const I = M.current;
        (I == null ? void 0 : I.open) && g.target instanceof Node && !I.contains(g.target) && I.removeAttribute("open");
      };
      return document.addEventListener("pointerdown", X), () => document.removeEventListener("pointerdown", X);
    }, []), i.jsxs("div", {
      className: m ? `themed-select-field ${m}` : "themed-select-field",
      children: [
        c && i.jsx("span", {
          children: c
        }),
        i.jsxs("details", {
          className: "themed-select",
          ref: M,
          onToggle: (X) => {
            X.currentTarget.open || S("");
          },
          children: [
            i.jsx("summary", {
              "aria-disabled": y,
              onClick: (X) => {
                y && X.preventDefault();
              },
              children: Y
            }),
            i.jsxs("div", {
              className: "themed-select-options",
              children: [
                j && i.jsx("input", {
                  "aria-label": `Search ${c}`,
                  autoFocus: true,
                  className: "themed-select-search",
                  placeholder: "Search civilizations...",
                  type: "search",
                  value: p,
                  onChange: (X) => S(X.target.value)
                }),
                i.jsxs("div", {
                  className: "themed-select-option-list",
                  role: "listbox",
                  "aria-label": c || "Select option",
                  children: [
                    G.map((X) => i.jsx("button", {
                      "aria-selected": X.value === f,
                      className: X.value === f ? "selected" : void 0,
                      disabled: y || X.disabled,
                      onClick: () => {
                        var _a3;
                        X.disabled || (r(X.value), (_a3 = M.current) == null ? void 0 : _a3.removeAttribute("open"));
                      },
                      role: "option",
                      type: "button",
                      children: X.label
                    }, X.value)),
                    G.length === 0 && i.jsx("span", {
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
  const Cv = {
    bonuses: [
      "Town Centers spawn 2 Villagers when the next Age is reached",
      "Cavalry +2 attack vs. Skirmishers",
      "Elephant Units receive -25% bonus damage and are more resistant to conversion",
      "Monks +3 melee/+3 pierce armor",
      "Ships regenerate 15 HP per minute"
    ],
    teamBonus: "Trade Units generate +10% food in addition to gold"
  }, Nv = {
    bonuses: [
      "Mining Camp technologies free",
      "Blacksmiths and Universities cost -100 wood",
      "Spearman-line deals +25% bonus damage",
      "Fervor and Sanctity affect Villagers",
      "Chemistry and Hand Cannoneer available in Castle Age"
    ],
    teamBonus: "Markets work +80% faster"
  }, Rv = {
    bonuses: [
      "Loom is researched instantly",
      "Hunters carry +15; hunted animals last +20% longer",
      "Infantry costs -15/20/25/30% in Dark/Feudal/Castle/ Imperial Age",
      "Infantry +1/+2/+3 attack vs. buildings in Feudal/ Castle/Imperial Age",
      "+10 population space in Imperial Age"
    ],
    teamBonus: "Barracks work +20% faster"
  }, Tv = {
    bonuses: [
      "Start with 2 Forage Bushes",
      "Can garrison livestock in Mills to passively produce food",
      "Mounted Units deal +20/30/40% bonus damage in Feudal/Castle/Imperial Age",
      "Docks +5 garrison capacity"
    ],
    teamBonus: "Camel and Elephant Units train +25% faster"
  }, zv = {
    bonuses: [
      "Advancing to the next Age costs -15%",
      "Foot Archers and Condottieri +1 melee/+1 pierce armor",
      "Dock and University technologies cost -25%",
      "Gunpowder Units cost -20%",
      "Fishing Ships cost -15%"
    ],
    teamBonus: "Condottiero available at the Barracks in Imperial Age"
  }, _v = {
    bonuses: [
      "Villagers defeat wolves with one strike",
      "Scout Cavalry-line costs -15%",
      "Melee attack upgrades free"
    ],
    teamBonus: "Mounted Archers train +25% faster"
  }, Dv = {
    bonuses: [
      "Advancing to the next Age is +66% faster",
      "Infantry armor upgrades free",
      "Battle Elephants cost -25/35% in Castle/Imperial Age",
      "Fish Traps cost -33% and provide +200% food"
    ],
    teamBonus: "Docks +6 line of sight"
  }, Uv = {
    bonuses: [
      "Wheelbarrow, Hand Cart free",
      "Infantry +20% HP starting in Feudal Age",
      "Warships cost -10/15/20% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Docks cost -15%"
  }, Ov = {
    bonuses: [
      "Mule Carts cost -25%",
      "Mule Cart technology effects +40%",
      "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier",
      "First Fortified Church receives a free Relic",
      "Galley-line and Dromons fire an additional projectile"
    ],
    teamBonus: "Infantry +2 line of sight"
  }, Lv = {
    bonuses: [
      "Start with +50 gold",
      "Villagers carry +3",
      "Military Units train +15% faster",
      "Monks gain +5 HP for each researched Monastery technology"
    ],
    teamBonus: "Relics generate +33% gold"
  }, kv = {
    bonuses: [
      "Villagers move +5% faster in Dark Age, +10% faster starting in Feudal Age",
      "Stable Units cost -15/20% in Castle/Imperial Age",
      "Ships move +10% faster"
    ],
    teamBonus: "Genitour available at the Archery Range starting in Castle Age"
  }, qv = {
    bonuses: [
      "Shepherds work +25% faster",
      "Town Centers cost -50% wood starting in Castle Age",
      "Foot Archers +1/+2 range in Castle/Imperial Age"
    ],
    teamBonus: "Archery Ranges work +10% faster"
  }, Bv = {
    bonuses: [
      "Militia-line upgrades free",
      "Blacksmith and Siege Workshop technologies cost -50% food",
      "Town Centers cost -50% stone",
      "Can build Krepost in Castle Age"
    ],
    teamBonus: "Blacksmiths work +80% faster"
  }, Hv = {
    bonuses: [
      "Economic upgrades available one age earlier and cost -40% food",
      "Stable technologies cost -50%",
      "Cavalier upgrade available in Castle Age",
      "Gunpowder Units +25% attack"
    ],
    teamBonus: "Relics generate food in addition to gold"
  }, Gv = {
    bonuses: [
      "Lumber Camp technologies free",
      "Infantry +1/+2/+3 attack in Feudal/Castle/Imperial Age",
      "Battle Elephants +1 melee/+1 pierce armor",
      "Monastery technologies cost -50%"
    ],
    teamBonus: "Relics visible on the map at the start of the game"
  }, Yv = {
    bonuses: [
      "Buildings +10/20/30/40% HP in Dark/Feudal/Castle/Imperial Age",
      "Camel Riders, Skirmishers and Spearman-line cost -25%",
      "Town Watch, Town Patrol free",
      "Advancing to Imperial Age costs -33%",
      "Fire Ships and Dromons attack +25% faster"
    ],
    teamBonus: "Monks heal +100% faster"
  }, Qv = {
    bonuses: [
      "Lumberjacks work +15% faster",
      "Livestock animals within Celt unit line of sight cannot be stolen",
      "Infantry moves +5/10/15/20% faster in Dark/Feudal/ Castle/Imperial Age",
      "Siege Weapons attack +25% faster"
    ],
    teamBonus: "Siege Workshops work +20% faster"
  }, Xv = {
    bonuses: [
      "Start with +3 Villagers, but -50 wood and -200 food",
      "Technologies cost -5/10/15% in Feudal/Castle/Imperial Age",
      "Town Centers +7 line of sight and provide +15 population space",
      "Fire Lancers and Fire Ships move +5/10% faster in Castle/Imperial Age"
    ],
    teamBonus: "Farms +10% food"
  }, Vv = {
    bonuses: [
      "One additional Town Center can be built in Feudal Age",
      "Mounted Units move +5/10/15% faster in Feudal/ Castle/Imperial Age",
      "Archery Ranges and Stables cost -75 wood",
      "Siege Workshop and Battering Ram available in Feudal Age; Capped Ram available in Castle Age"
    ],
    teamBonus: "Palisade Walls +33% HP"
  }, Zv = {
    bonuses: [
      "Fishermen and Fishing Ships carry +15",
      "Receive +200 wood when advancing to the next Age",
      "Skirmishers and Elephant Archers attack +25% faster",
      "Barracks technologies cost -50%",
      "Siege Weapons cost -33% wood"
    ],
    teamBonus: "Docks provide +5 population space"
  }, Kv = {
    bonuses: [
      "Receive +100 gold and +100 food when advancing to the next Age",
      "Foot Archers attack +18% faster",
      "Pikeman upgrade free"
    ],
    teamBonus: "Outposts +3 line of sight and cost no stone"
  }, Jv = {
    bonuses: [
      "Foragers work +15% faster",
      "Mill technologies free",
      "Mounted Units +20% HP starting in Feudal Age",
      "Castles cost -15/25% in Castle/Imperial Age"
    ],
    teamBonus: "Knight-line +2 line of sight"
  }, Fv = {
    bonuses: [
      "Start with a Mule Cart",
      "Units and buildings receive -15% damage when located on higher elevation",
      "Mounted Units regenerate 2/8/14 HP per minute in Feudal/Castle/Imperial Age",
      "Fortified Churches provide Villagers in a 9 tiles radius with +10% work rate"
    ],
    teamBonus: "Building repairs cost -25%"
  }, $v = {
    bonuses: [
      "Villagers cost -8/13/18/23% in Dark/Feudal/Castle/ Imperial Age",
      "Camel Riders attack +20% faster",
      "Gunpowder Units +1 melee/+1 pierce armor",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line and Camel Units +2 attack vs. buildings"
  }, Iv = {
    bonuses: [
      "Do not need houses, but start with -100 wood",
      "Cavalry Archers cost -10/20% in Castle/Imperial Age",
      "Trebuchets fire more accurately at units and small targets",
      "On Nomadic maps, the first Town Center spawns a scouting Horse"
    ],
    teamBonus: "Stables work +20% faster"
  }, Wv = {
    bonuses: [
      "Houses and Settlements provide +5 population space",
      "Buildings cost -15% stone",
      "Military Units cost -15/20/25/30% food in Dark/Feudal/Castle/Imperial Age",
      "Villagers affected by Infantry Blacksmith upgrades starting in Castle Age"
    ],
    teamBonus: "Start with a free Llama"
  }, Pv = {
    bonuses: [
      "Mills, Lumber- and Mining Camps cost -50%",
      "Infantry attacks +33% faster starting in Feudal Age",
      "Cavalry Archers +2 attack vs. Ranged Soldiers (except Skirmishers)",
      "Fishing Ships work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age; +100% HP"
    ],
    teamBonus: "Galley-line +4 line of sight"
  }, eb = {
    bonuses: [
      "Meat of hunted and livestock animals doesn't decay",
      "Mounted Units and Fire Lancers attack +25% faster starting in Feudal Age",
      "Siege Engineers available in Castle Age",
      "Siege and Fortification upgrades cost -75% wood and research +100% faster",
      "Units receive -50% friendly fire damage"
    ],
    teamBonus: "Gunpowder Units +2 line of sight"
  }, tb = {
    bonuses: [
      "Pastures replace Farms",
      "Melee attack upgrade effects are doubled",
      "Skirmishers, Spearman-, and Scout Cavalry-line train and upgrade +15% faster",
      "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"
    ],
    teamBonus: "Infantry +2 attack vs. Ranged Soldiers"
  }, ab = {
    bonuses: [
      "No buildings required to advance to the next Age or to unlock other buildings",
      "Farmers don't require Mills or Town Centers to drop off food",
      "Villagers can garrison in Houses",
      "Battle Elephants move +10% faster"
    ],
    teamBonus: "Scorpions +1 range"
  }, nb = {
    bonuses: [
      "Stone miners work +20% faster",
      "Ranged Soldiers and Infantry cost -50% wood",
      "Archer armor and tower upgrades free (Bombard Tower requires Chemistry)",
      "Warships cost -20% wood"
    ],
    teamBonus: "Villagers +3 line of sight"
  }, lb = {
    bonuses: [
      "Each Town Center provides +100 food",
      "Spearman-line and Skirmisher-line move +10% faster",
      "Each garrisoned Relic provides +1 attack to Knight-line and Leitis (maximum +4)"
    ],
    teamBonus: "Monasteries work +20% faster"
  }, ib = {
    bonuses: [
      "Buildings cost -15% wood",
      "Villagers drop off +10% more gold",
      "Barracks Units +1/+2/+3 pierce armor in Feudal/ Castle/Imperial Age"
    ],
    teamBonus: "Universities work +80% faster"
  }, sb = {
    bonuses: [
      "Start with +1 Villager, but -50 food",
      "Resources last +15% longer",
      "Foot Archers cost -10/20/30% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Walls cost -50%"
  }, cb = {
    bonuses: [
      "Hunters work +40% faster",
      "Cavalry Archers attack +25% faster",
      "Scout Cavalry-line and Steppe Lancers +20/30% HP in Castle/Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line +2 line of sight"
  }, ub = {
    bonuses: [
      "Start with +50 wood and +50 food",
      "Town Centers and Docks +100% HP and work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age",
      "Parthian Tactics available in Castle Age",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Knight-line +2 attack vs. Ranged Soldiers"
  }, ob = {
    bonuses: [
      "Folwark replaces Mill",
      "Villagers regenerate 10/15/20 HP in Feudal/Castle/Imperial Age",
      "Stone Miners generate gold in addition to stone",
      "Bloodlines and Scout Cavalry-line upgrades cost -50% food"
    ],
    teamBonus: "Scout Cavalry-line +1 attack vs. Ranged Soldiers"
  }, rb = {
    bonuses: [
      "Foragers generate wood in addition to food",
      "All units cost -20% gold",
      "Can build Feitoria in Imperial Age",
      "Ships +10/15/20% HP in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Technologies research +25% faster"
  }, db = {
    bonuses: [
      "Villagers gather, build, and repair +5% faster",
      "Infantry armor upgrade effects are doubled",
      "Scorpions cost -50% gold",
      "Galley-line and Dromons +1 melee/+1 pierce armor"
    ],
    teamBonus: "Scorpions minimum range reduced"
  }, fb = {
    bonuses: [
      "Market trading fee only 5%; Markets cost -100 wood",
      "Camel Units +25% HP",
      "Galley-line attacks +25% faster",
      "Transport Ships +100% HP, +20 carry capacity"
    ],
    teamBonus: "Foot Archers and Skirmishers +2 attack vs. buildings"
  }, mb = {
    bonuses: [
      "Lumberjacks generate food in addition to wood",
      "Archery Unit technologies at the Archery Range and Blacksmith cost -25%",
      "Siege Weapons and Siege Warships move +10/15% faster in Castle/Imperial Age"
    ],
    teamBonus: "Foot Archers +2 line of sight"
  }, hb = {
    bonuses: [
      "Start with +100 stone",
      "Farm upgrades provide +125% additional food",
      "Soldiers receive -40% bonus damage",
      "Can build Donjon in Dark Age, replaces Watch Tower-line",
      "Fortifications built +50% faster; Town Centers built +100% faster"
    ],
    teamBonus: "Transport Ships +5 line of sight and cost -50%"
  }, pb = {
    bonuses: [
      "Farmers work +15% faster",
      "Arson, Gambesons free",
      "Siege Workshop Units cost -15%",
      "Monks move +20% faster"
    ],
    teamBonus: "Military buildings (except Castles) provide +5 population space"
  }, gb = {
    bonuses: [
      "Builders work +30% faster",
      "Receive +20 gold for each technology researched",
      "Blacksmith upgrades cost no gold",
      "Gunpowder Units attack +18% faster",
      "Cannon Galleons fire more accurately at moving targets"
    ],
    teamBonus: "Trade Units generate +25% gold"
  }, yb = {
    bonuses: [
      "Livestock animals last +50% longer",
      "Units deal +25% damage when fighting from higher elevation",
      "New Town Centers spawn 2 Sheep starting in Castle Age",
      "Thumb Ring, Parthian Tactics free"
    ],
    teamBonus: "Mounted Archers +2 line of sight"
  }, vb = {
    bonuses: [
      "Farms cost -40%",
      "Town Centers +10 garrison capacity; Towers +5 garrison capacity",
      "Barracks and Stable Units +1/+2 melee armor in Castle/Imperial Age",
      "Monks +100% healing range",
      "Murder Holes, Herbal Medicine free"
    ],
    teamBonus: "Units more resistant to conversion"
  }, bb = {
    bonuses: [
      "Gold miners work +25% faster",
      "Scout Cavalry-line +1 pierce armor and upgrades free",
      "Chemistry free; Gunpowder technologies costs -50%",
      "Gunpowder Units +25% HP"
    ],
    teamBonus: "Gunpowder Units train +25% faster"
  }, Sb = {
    bonuses: [
      "Enemy Town Centers are revealed at the start of the game",
      "Economic upgrades cost no wood and research +100% faster",
      "Archery Range units and Fire Lancers +20% HP",
      "Conscription free"
    ],
    teamBonus: "Imperial Skirmisher upgrade available in Imperial Age"
  }, wb = {
    bonuses: [
      "Receive one free Villager for each economic upgrade researched",
      "Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age",
      "Traction Trebuchets and Lou Chuans cost -25%"
    ],
    teamBonus: "Cavalry +2 attack vs. Siege Weapons"
  }, xb = {
    bonuses: [
      "Military production buildings and Docks provide +55 food",
      "Infantry regenerates 10/15/30 HP per minute in Feudal/Castle/Imperial Age",
      "Jian Swordsmen and Hei Guang Cavalry +2 attack in Imperial Age",
      "Careening, Dry Dock free"
    ],
    teamBonus: "Houses built +100% faster"
  }, vh = {
    Bengalis: Cv,
    Bohemians: Nv,
    Goths: Rv,
    Gurjaras: Tv,
    Italians: zv,
    Magyars: _v,
    Malay: Dv,
    Vikings: Uv,
    Armenians: Ov,
    Aztecs: Lv,
    Berbers: kv,
    Britons: qv,
    Bulgarians: Bv,
    Burgundians: Hv,
    Burmese: Gv,
    Byzantines: Yv,
    Celts: Qv,
    Chinese: Xv,
    Cumans: Vv,
    Dravidians: Zv,
    Ethiopians: Kv,
    Franks: Jv,
    Georgians: Fv,
    Hindustanis: $v,
    Huns: Iv,
    Incas: Wv,
    Japanese: Pv,
    Jurchens: eb,
    Khitans: tb,
    Khmer: ab,
    Koreans: nb,
    Lithuanians: lb,
    Malians: ib,
    Mayans: sb,
    Mongols: cb,
    Persians: ub,
    Poles: ob,
    Portuguese: rb,
    Romans: db,
    Saracens: fb,
    Shu: mb,
    Sicilians: hb,
    Slavs: pb,
    Spanish: gb,
    Tatars: yb,
    Teutons: vb,
    Turks: bb,
    Vietnamese: Sb,
    Wei: wb,
    Wu: xb
  }, bh = "" + new URL("el_full_1-ClSwu4yM.png", import.meta.url).href;
  function Sh() {
    return i.jsx("aside", {
      className: "matchmaking-brand",
      "aria-label": "Empire League",
      children: i.jsx("img", {
        src: bh,
        alt: "Empire League"
      })
    });
  }
  function Mb() {
    var _a2;
    const { state: c, prepareLobby: o } = St(), f = !c.error, r = c.activeMatch, m = c.roomSetupEstimateMs ?? 6e4, [y, j] = z.useState(() => Vm(c.roomSetupStartedAt, m)), A = $t.find((Y) => {
      var _a3;
      return Y.id === ((_a3 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a3.id);
    }) ?? (r == null ? void 0 : r.selectedMap), M = A ? (_a2 = sh(A.id)) == null ? void 0 : _a2.description : void 0, p = Qm(r == null ? void 0 : r.queue.civilizationPreference, r == null ? void 0 : r.opponentCivilizationPreference), S = Qm(r == null ? void 0 : r.opponentCivilizationPreference, r == null ? void 0 : r.queue.civilizationPreference);
    return z.useEffect(() => {
      const Y = () => j(Vm(c.roomSetupStartedAt, m));
      Y();
      const G = window.setInterval(Y, 250);
      return () => window.clearInterval(G);
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
                i.jsx(th, {
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
        i.jsx(Sh, {}),
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
                M && i.jsx("p", {
                  className: "upcoming-map-description",
                  children: M
                })
              ]
            }),
            i.jsx(Xm, {
              civilization: p,
              side: "player"
            }),
            i.jsx(Xm, {
              civilization: S,
              side: "opponent"
            })
          ]
        })
      ]
    });
  }
  function Qm(c, o) {
    const f = (c == null ? void 0 : c.mode) === "mirror" ? o == null ? void 0 : o.civilization : c == null ? void 0 : c.civilization;
    return f && f in vh ? f : null;
  }
  function Xm({ civilization: c, side: o }) {
    const f = c ? vh[c] : null;
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
  function Vm(c, o) {
    const f = Math.ceil(o / 1e3);
    if (!c) return f;
    const r = Math.floor((Date.now() - new Date(c).getTime()) / 1e3);
    return Math.max(0, f - r);
  }
  function jb() {
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
                i.jsx(Ay, {
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
  function Ab({ oldRating: c, newRating: o, onClose: f }) {
    z.useEffect(() => {
      const y = (j) => {
        j.key === "Escape" && f();
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
          i.jsx(xy, {
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
              i.jsx(iy, {
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
  function Eb() {
    const { state: c, setPage: o, returnToMatchmaking: f } = St(), [r, m] = z.useState(true), y = c.activeMatch, j = y == null ? void 0 : y.result;
    if (!y || !j) return null;
    const A = j.outcome === "win", M = j.verificationStatus === "contested", p = j.verified && A && ey(j.oldRating, j.newRating);
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("section", {
          className: "result-screen",
          children: [
            i.jsx("span", {
              className: "eyebrow",
              children: M ? "Contested result" : "Verified result"
            }),
            i.jsx("h2", {
              className: A ? "win" : "loss",
              children: M ? "Result Contested" : A ? "Victory" : j.outcome === "loss" ? "Defeat" : "No Contest"
            }),
            M && i.jsx("p", {
              children: "The replay result could not be verified. The result was discarded and ratings were not changed."
            }),
            i.jsxs("div", {
              className: "rating-swing",
              children: [
                i.jsxs("strong", {
                  children: [
                    j.ratingChange > 0 ? "+" : "",
                    j.ratingChange,
                    " Rating"
                  ]
                }),
                i.jsx("span", {
                  children: M ? "No rating change" : `${j.oldRating} \u2192 ${j.newRating}`
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
        p && r && i.jsx(Ab, {
          oldRating: j.oldRating,
          newRating: j.newRating,
          onClose: () => m(false)
        })
      ]
    });
  }
  function Cb({ groups: c, enabledGroupIds: o, selectedMapIds: f, favoriteMapIds: r, onToggleGroup: m, onToggleMap: y, onFavorite: j, disabled: A = false }) {
    return i.jsx("div", {
      className: "grouped-map-pool",
      children: c.map((M) => {
        const p = o.includes(M.id);
        return i.jsxs("section", {
          className: p ? "map-group enabled" : "map-group",
          children: [
            i.jsxs("header", {
              className: "map-group-header",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: M.name
                    }),
                    i.jsx("span", {
                      children: M.description
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
                      onChange: () => m(M.id)
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
              children: M.maps.map((S, Y) => {
                const G = S.id === M.primaryMapId, X = p && f.includes(S.id), g = r[M.id] === S.id;
                return i.jsxs("article", {
                  className: `group-map ${G ? "primary" : ""} ${X ? "selected" : ""}`,
                  children: [
                    i.jsxs("button", {
                      className: "group-map-select",
                      type: "button",
                      "aria-pressed": X,
                      "aria-label": `${X ? "Exclude" : "Include"} ${S.name}`,
                      disabled: A || !p,
                      onClick: () => y(M.id, S.id),
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
                            G && i.jsx("small", {
                              children: "Primary map"
                            })
                          ]
                        }),
                        !X && i.jsx("span", {
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
                      onClick: () => j(M.id, S.id),
                      children: i.jsx(ih, {
                        size: Y === 0 ? 18 : 15,
                        fill: g ? "currentColor" : "none"
                      })
                    })
                  ]
                }, S.id);
              })
            })
          ]
        }, M.id);
      })
    });
  }
  const Zm = "empire-league-favorite-maps", pl = "empire-league-civilization-preference", wh = "empire-league-map-preferences", Km = [
    {
      id: "pick",
      label: "Choose Civ",
      detail: "Play your selected civilization",
      icon: po
    },
    {
      id: "random",
      label: "Random",
      detail: "Roll a civilization after the map is chosen",
      icon: Sy
    },
    {
      id: "mirror",
      label: "Mirror",
      detail: "Match your opponent's civilization",
      icon: dy
    }
  ];
  function Nb() {
    var _a2, _b2, _c;
    const { state: c, queues: o, startQueue: f, updateActiveQueue: r, cancelQueue: m } = St(), [y, j] = z.useState(0), [A] = z.useState(() => zb(o)), [M, p] = z.useState(() => {
      var _a3;
      const q = So().selectedQueueId;
      return o.some((re) => re.id === q) ? q : ((_a3 = o[0]) == null ? void 0 : _a3.id) ?? "";
    }), S = o.find((q) => q.id === M) ?? o[0], Y = [
      "idle",
      "cancelled",
      "completed"
    ].includes(c.queueStatus) && (!c.activeMatch || c.queueStatus === "completed") && c.gameStatus !== "loading", G = c.queueStatus === "searching", X = ![
      "idle",
      "cancelled",
      "completed",
      "searching"
    ].includes(c.queueStatus), [g, I] = z.useState(A.selectedMaps), [$, le] = z.useState(A.enabledGroups), [me, ce] = z.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(Zm) ?? "{}");
        return Object.fromEntries(Object.entries(q).map(([re, w]) => [
          re,
          w && typeof w == "object" ? w : {}
        ]));
      } catch {
        return {};
      }
    }), [pe, K] = z.useState([
      2,
      4
    ]), [ae, _] = z.useState(true), [L, U] = z.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(pl) ?? "{}");
        if (q.preferRandom === true) return "pick";
        const re = q.mode;
        return re === "prefer-random" || re === "full-random" ? "random" : re ?? "pick";
      } catch {
        return "pick";
      }
    }), [Z, te] = z.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(pl) ?? "{}").civilization ?? "Byzantines";
      } catch {
        return "Byzantines";
      }
    }), [Ce, Ne] = z.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(pl) ?? "{}").preferRandom === true;
      } catch {
        return false;
      }
    }), [Re, F] = z.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(pl) ?? "{}");
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
    }), [T, O] = z.useState(false), [ee, fe] = z.useState(false), [xe, v] = z.useState("open"), B = (q = L, re = Z, w = Re) => {
      window.localStorage.setItem(pl, JSON.stringify({
        mode: q,
        civilization: re,
        preferRandom: Ce,
        openLandBans: w.open,
        closedLandBans: w.closed
      }));
    }, W = (q) => {
      Ce && L === "pick" && (q === "pick" || q === "random") || (U(q), B(q));
    }, ie = (q) => {
      te(q), B(L, q);
    }, ge = (q, re) => {
      F((w) => {
        const C = w[q], V = C.includes(re) ? C.filter((J) => J !== re) : C.length < 5 ? [
          ...C,
          re
        ] : C, ne = {
          ...w,
          [q]: V
        };
        return B(L, Z, ne), ne;
      });
    }, ve = {
      preferRandom: Ce,
      openLandBans: Re.open,
      closedLandBans: Re.closed
    }, _e = (q, re, w) => {
      ce((C) => {
        const V = {
          ...C[q] ?? {}
        };
        V[re] === w ? delete V[re] : V[re] = w;
        const ne = {
          ...C,
          [q]: V
        };
        return window.localStorage.setItem(Zm, JSON.stringify(ne)), ne;
      }), I((C) => {
        var _a3;
        return {
          ...C,
          [q]: ((_a3 = C[q]) == null ? void 0 : _a3.includes(w)) ? C[q] : [
            ...C[q] ?? [],
            w
          ]
        };
      });
    }, at = (q, re, w) => {
      var _a3, _b3;
      ((_a3 = g[q]) == null ? void 0 : _a3.includes(w)) && ((_b3 = me[q]) == null ? void 0 : _b3[re]) === w && _e(q, re, w), I((C) => {
        const V = C[q] ?? [], ne = V.includes(w), J = ne ? V.filter((P) => P !== w) : [
          ...V,
          w
        ];
        return ne && !oo(q, J, $[q] ?? [], o) ? C : {
          ...C,
          [q]: J
        };
      });
    }, Ke = (q, re) => {
      le((w) => {
        const C = w[q] ?? [], V = C.includes(re) ? C.filter((ne) => ne !== re) : [
          ...C,
          re
        ];
        return oo(q, g[q] ?? [], V, o) ? {
          ...w,
          [q]: V
        } : w;
      });
    }, vt = S ? S.mapPool.filter((q) => {
      var _a3, _b3;
      const re = sn.find((w) => w.maps.some((C) => C.id === q.id));
      return re && ((_a3 = $[S.id]) == null ? void 0 : _a3.includes(re.id)) && ((_b3 = g[S.id]) == null ? void 0 : _b3.includes(q.id));
    }).map((q) => q.id) : [], Ta = S ? Object.entries(me[S.id] ?? {}).filter(([q, re]) => {
      var _a3;
      return ((_a3 = $[S.id]) == null ? void 0 : _a3.includes(q)) && vt.includes(re);
    }) : [], ua = Object.fromEntries(Ta), oa = Object.values(ua), It = S ? oa.map((q) => {
      var _a3;
      return (_a3 = S.mapPool.find((re) => re.id === q)) == null ? void 0 : _a3.name;
    }).filter(Boolean).join(", ") : "", cn = L === "pick" ? Z : (_a2 = Km.find((q) => q.id === L)) == null ? void 0 : _a2.label, za = (S == null ? void 0 : S.format) === "team" ? `${S.name} - ${pe.map((q) => `${q}v${q}`).join(" or ")}` : S == null ? void 0 : S.name;
    return z.useEffect(() => {
      if (!c.queueStartedAt || c.queueStatus !== "searching") return;
      const q = window.setInterval(() => {
        j(Math.floor((Date.now() - new Date(c.queueStartedAt ?? Date.now()).getTime()) / 1e3));
      }, 1e3);
      return () => window.clearInterval(q);
    }, [
      c.queueStartedAt,
      c.queueStatus
    ]), z.useEffect(() => {
      _b(o, M, g, $);
    }, [
      $,
      o,
      g,
      M
    ]), z.useEffect(() => {
      if (!G || !S) return;
      const q = window.setTimeout(() => {
        r({
          ...S,
          findAnyone: ae,
          teamSizes: S.format === "team" ? pe : void 0,
          mapPool: S.mapPool.filter((re) => vt.includes(re.id)),
          mapPreferences: {
            enabledGroupIds: $[S.id] ?? [],
            favoriteMapIds: ua
          },
          mapCatalogVersion: Nt.version,
          favoriteMapId: oa[0],
          civilizationPreference: {
            mode: L,
            civilization: L === "pick" ? Z : void 0,
            ...ve
          }
        });
      }, 250);
      return () => window.clearTimeout(q);
    }, [
      Z,
      Re,
      L,
      $,
      me,
      ae,
      G,
      Ce,
      g,
      S,
      pe
    ]), [
      "creating_lobby",
      "waiting_for_opponent",
      "verifying_lobby",
      "ready"
    ].includes(c.queueStatus) ? i.jsx(Mb, {}) : c.queueStatus === "in_game" || c.queueStatus === "verifying_result" ? i.jsx(jb, {}) : c.queueStatus === "completed" ? i.jsx(Eb, {}) : i.jsxs("section", {
      className: "stack queue-page",
      children: [
        S && i.jsxs("div", {
          className: "search-waiting-layout matchmaking-overview",
          children: [
            i.jsx("div", {
              className: "search-state",
              children: G ? i.jsxs(i.Fragment, {
                children: [
                  i.jsx("div", {
                    className: "search-orbit",
                    children: i.jsx(_s, {
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
                            children: ae ? "Anyone" : `${c.searchRange.min}-${c.searchRange.max}`
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Time searching"
                          }),
                          i.jsx("strong", {
                            children: Tb(y)
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
                        checked: ae,
                        onChange: (q) => _(q.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "secondary",
                    type: "button",
                    onClick: () => void m(),
                    children: [
                      i.jsx(eh, {
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
                          i.jsx(_s, {
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
                          i.jsx(ry, {
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
                      L !== "mirror" && i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Prefer Random"
                          }),
                          i.jsx("strong", {
                            children: Ce ? "Yes" : "No"
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
                        checked: ae,
                        onChange: (q) => _(q.target.checked)
                      })
                    ]
                  }),
                  i.jsxs("button", {
                    className: "queue-search-button",
                    type: "button",
                    disabled: !Y || vt.length === 0,
                    onClick: () => void f({
                      ...S,
                      findAnyone: ae,
                      teamSizes: S.format === "team" ? pe : void 0,
                      mapPool: S.mapPool.filter((q) => vt.includes(q.id)),
                      mapPreferences: {
                        enabledGroupIds: $[S.id] ?? [],
                        favoriteMapIds: ua
                      },
                      mapCatalogVersion: Nt.version,
                      favoriteMapId: oa[0],
                      civilizationPreference: {
                        mode: L,
                        civilization: L === "pick" ? Z : void 0,
                        ...ve
                      }
                    }),
                    children: [
                      i.jsx(_s, {
                        size: 22
                      }),
                      " ",
                      c.gameStatus === "loading" ? "Launching AoE2\u2026" : "Find Match"
                    ]
                  })
                ]
              })
            }),
            i.jsx(Sh, {})
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
                          const re = q.id === "team-games", w = re ? fi : po;
                          return i.jsxs("button", {
                            className: S.id === q.id ? "civilization-mode active" : "civilization-mode",
                            type: "button",
                            "aria-pressed": S.id === q.id,
                            disabled: G || X,
                            onClick: () => p(q.id),
                            children: [
                              i.jsx(w, {
                                size: 20
                              }),
                              i.jsxs("span", {
                                children: [
                                  i.jsx("strong", {
                                    children: re ? "Team vs Team" : "1v1"
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
                              const re = pe.includes(q);
                              return i.jsxs("button", {
                                className: re ? "civilization-mode active" : "civilization-mode",
                                type: "button",
                                "aria-pressed": re,
                                disabled: G || X,
                                onClick: () => K((w) => w.includes(q) ? w.length === 1 ? w : w.filter((C) => C !== q) : [
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
                        children: Km.map((q) => {
                          const re = q.icon;
                          return i.jsxs("div", {
                            className: L === q.id || Ce && L === "pick" && q.id === "random" ? "civilization-option-card active" : "civilization-option-card",
                            children: [
                              i.jsxs("button", {
                                className: "civilization-mode-choice",
                                type: "button",
                                "aria-pressed": L === q.id || Ce && L === "pick" && q.id === "random",
                                disabled: X,
                                onClick: () => W(q.id),
                                children: [
                                  i.jsx(re, {
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
                                    options: Os.map((w) => ({
                                      value: w,
                                      label: w
                                    })),
                                    value: Z,
                                    onChange: ie,
                                    disabled: X || L !== "pick",
                                    searchable: true,
                                    displayValue: L === "pick" ? void 0 : "N/A"
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-select-activate",
                                    type: "button",
                                    "aria-label": `Choose ${Z}`,
                                    disabled: X,
                                    onClick: () => W("pick")
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-card-settings",
                                    type: "button",
                                    "aria-label": "Configure chosen civilization behavior",
                                    disabled: X,
                                    onClick: () => fe(true),
                                    children: i.jsx(so, {
                                      size: 17
                                    })
                                  })
                                ]
                              }),
                              q.id === "random" && i.jsx("button", {
                                className: "civilization-card-settings",
                                type: "button",
                                "aria-label": "Configure random civilization bans",
                                disabled: X,
                                onClick: () => O(true),
                                children: i.jsx(so, {
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
                              ((_c = $[S.id]) == null ? void 0 : _c.length) ?? 0,
                              " groups"
                            ]
                          })
                        ]
                      }),
                      i.jsx(Cb, {
                        groups: sn,
                        enabledGroupIds: $[S.id] ?? [],
                        selectedMapIds: g[S.id] ?? [],
                        favoriteMapIds: me[S.id] ?? {},
                        onToggleGroup: (q) => Ke(S.id, q),
                        onToggleMap: (q, re) => at(S.id, q, re),
                        onFavorite: (q, re) => _e(S.id, q, re),
                        disabled: X
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
        T && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "civ-ban-title",
          onMouseDown: () => O(false),
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
                    label: `Open land maps (${Re.open.length}/5 banned)`
                  },
                  {
                    value: "closed",
                    label: `Closed land maps (${Re.closed.length}/5 banned)`
                  }
                ],
                value: xe,
                onChange: (q) => v(q)
              }),
              i.jsx(Rb, {
                title: xe === "open" ? "Open land maps" : "Closed land maps",
                selected: Re[xe],
                onToggle: (q) => ge(xe, q)
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
                      F(q), B(L, Z, q);
                    },
                    children: "Clear bans"
                  }),
                  i.jsx("button", {
                    className: "primary",
                    type: "button",
                    onClick: () => O(false),
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
          onMouseDown: () => fe(false),
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
                    checked: Ce,
                    onChange: (q) => {
                      const re = q.target.checked, w = re ? "pick" : L;
                      Ne(re), re && U("pick"), window.localStorage.setItem(pl, JSON.stringify({
                        mode: w,
                        civilization: Z,
                        preferRandom: re,
                        openLandBans: Re.open,
                        closedLandBans: Re.closed
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
  function Rb({ title: c, selected: o, onToggle: f }) {
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
          children: Os.map((r) => {
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
  function Tb(c) {
    return `${String(Math.floor(c / 60)).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`;
  }
  function So() {
    try {
      const c = JSON.parse(window.localStorage.getItem(wh) ?? "{}");
      return c && typeof c == "object" ? c : {
        version: 1
      };
    } catch {
      return {
        version: 1
      };
    }
  }
  function zb(c) {
    var _a2, _b2, _c, _d;
    const o = So(), f = {}, r = {};
    for (const m of c) {
      const y = new Set(((_b2 = (_a2 = o.queues) == null ? void 0 : _a2[m.id]) == null ? void 0 : _b2.deselectedMapIds) ?? []), j = new Set(((_d = (_c = o.queues) == null ? void 0 : _c[m.id]) == null ? void 0 : _d.disabledGroupIds) ?? []);
      if (f[m.id] = m.mapPool.map((A) => A.id).filter((A) => !y.has(A)), r[m.id] = sn.map((A) => A.id).filter((A) => !j.has(A)), !oo(m.id, f[m.id], r[m.id], c)) {
        const A = m.mapPool[0], M = sn.find((p) => p.maps.some((S) => S.id === (A == null ? void 0 : A.id)));
        A && M && (f[m.id] = [
          .../* @__PURE__ */ new Set([
            ...f[m.id],
            A.id
          ])
        ], r[m.id] = [
          .../* @__PURE__ */ new Set([
            ...r[m.id],
            M.id
          ])
        ]);
      }
    }
    return {
      selectedMaps: f,
      enabledGroups: r
    };
  }
  function oo(c, o, f, r) {
    var _a2;
    const m = new Set(((_a2 = r.find((j) => j.id === c)) == null ? void 0 : _a2.mapPool.map((j) => j.id)) ?? []), y = new Set(sn.filter((j) => f.includes(j.id)).flatMap((j) => j.maps.map((A) => A.id)));
    return o.some((j) => m.has(j) && y.has(j));
  }
  function _b(c, o, f, r) {
    var _a2;
    const m = So(), y = {
      ...m.queues ?? {}
    };
    for (const j of c) {
      const A = new Set(j.mapPool.map((G) => G.id)), M = new Set(sn.map((G) => G.id)), p = (_a2 = m.queues) == null ? void 0 : _a2[j.id], S = ((p == null ? void 0 : p.deselectedMapIds) ?? []).filter((G) => !A.has(G)), Y = ((p == null ? void 0 : p.disabledGroupIds) ?? []).filter((G) => !M.has(G));
      y[j.id] = {
        deselectedMapIds: [
          .../* @__PURE__ */ new Set([
            ...S,
            ...j.mapPool.map((G) => G.id).filter((G) => !(f[j.id] ?? []).includes(G))
          ])
        ],
        disabledGroupIds: [
          .../* @__PURE__ */ new Set([
            ...Y,
            ...sn.map((G) => G.id).filter((G) => !(r[j.id] ?? []).includes(G))
          ])
        ]
      };
    }
    window.localStorage.setItem(wh, JSON.stringify({
      version: 1,
      selectedQueueId: o,
      queues: y
    }));
  }
  const tt = {
    async list() {
      return Se ? zs : (await Me.request("/custom-lobbies")).rooms;
    },
    async create(c) {
      return Se ? {
        ...zs[0],
        id: "preview-created",
        name: c.name,
        maxPlayers: c.maxPlayers
      } : (await Me.request("/custom-lobbies", {
        method: "POST",
        body: {
          name: c.name,
          maxPlayers: c.maxPlayers,
          map: Jm(c.map),
          dataMod: Jm(c.dataMod)
        }
      })).room;
    },
    async join(c) {
      return Se ? zs.find((o) => o.id === c) ?? zs[0] : (await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/join`, {
        method: "POST"
      })).room;
    },
    async leave(c) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/leave`, {
        method: "POST"
      });
    },
    async updatePlayer(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/player`, {
        method: "PATCH",
        body: o
      });
    },
    async sendMessage(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/messages`, {
        method: "POST",
        body: {
          text: o
        }
      });
    },
    async kick(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/players/${encodeURIComponent(o)}`, {
        method: "DELETE"
      });
    },
    async start(c) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/start`, {
        method: "POST"
      });
    },
    async publish(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/publish`, {
        method: "POST",
        body: {
          platformLobbyId: o
        }
      });
    },
    async reportJoined(c) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/joined`, {
        method: "POST"
      });
    },
    async reportAoeReady(c) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/aoe-ready`, {
        method: "POST"
      });
    },
    async completeStart(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/complete-start`, {
        method: "POST",
        body: {
          gameStartedAt: o
        }
      });
    },
    async finish(c) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/finish`, {
        method: "POST"
      });
    },
    async failStart(c, o) {
      Se || await Me.request(`/custom-lobbies/${encodeURIComponent(c)}/fail-start`, {
        method: "POST",
        body: {
          error: o
        }
      });
    },
    onEvent(c) {
      return Se ? () => {
      } : Me.onCustomLobbyEvent(c);
    }
  };
  function Jm(c) {
    return c ? {
      id: c.id,
      name: c.name,
      gameName: c.gameName,
      kind: c.kind
    } : void 0;
  }
  const Fm = {
    maps: [],
    dataMods: [],
    scannedRoots: [],
    scannedAt: (/* @__PURE__ */ new Date(0)).toISOString()
  };
  function Db() {
    const { state: c, notify: o, ensureAoe2Ready: f } = St(), [r, m] = z.useState([]), [y, j] = z.useState(Fm), [A, M] = z.useState(true), [p, S] = z.useState(true), [Y, G] = z.useState(false), [X, g] = z.useState(`${c.currentUser.displayName}'s Lobby`), [I, $] = z.useState("map"), [le, me] = z.useState(""), [ce, pe] = z.useState(""), [K, ae] = z.useState(""), [_, L] = z.useState(8), [U, Z] = z.useState(false), te = r.find((O) => O.players.some((ee) => ee.id === c.currentUser.id));
    async function Ce() {
      M(true);
      try {
        m(await tt.list());
      } catch (O) {
        o("Custom lobbies could not be loaded.", "danger", {
          detail: qt(O)
        });
      } finally {
        M(false);
      }
    }
    async function Ne() {
      var _a2;
      S(true);
      try {
        const O = await (((_a2 = window.electronApi) == null ? void 0 : _a2.scanLocalCustomContent()) ?? Promise.resolve(Fm));
        j(O), me((ee) => O.maps.some((fe) => fe.id === ee) ? ee : ""), pe((ee) => O.maps.some((fe) => fe.id === ee) ? ee : ""), ae((ee) => O.dataMods.some((fe) => fe.id === ee) ? ee : "");
      } catch (O) {
        o("Local content could not be scanned.", "danger", {
          detail: qt(O)
        });
      } finally {
        S(false);
      }
    }
    z.useEffect(() => (Ce(), Ne(), tt.onEvent((O) => {
      m((ee) => ((O.closedRoomId ? ee.find((xe) => xe.id === O.closedRoomId && xe.players.some((v) => v.id === c.currentUser.id)) : void 0) && O.closeReason && o("Custom lobby closed.", "warning", {
        detail: O.closeReason
      }), O.rooms));
    })), []);
    async function Re() {
      Z(true);
      try {
        const O = I === "map" ? le : ce;
        await tt.create({
          name: X.trim(),
          maxPlayers: _,
          map: y.maps.find((ee) => ee.id === O),
          dataMod: y.dataMods.find((ee) => ee.id === K)
        }), G(false);
      } catch (O) {
        o("The lobby could not be created.", "danger", {
          detail: qt(O)
        });
      } finally {
        Z(false);
      }
    }
    async function F() {
      await f("custom") && G(true);
    }
    async function T(O) {
      if (await f("custom")) {
        Z(true);
        try {
          await tt.join(O);
        } catch (ee) {
          o("Could not join the lobby.", "danger", {
            detail: qt(ee)
          });
        } finally {
          Z(false);
        }
      }
    }
    return te ? i.jsx(Ub, {
      room: te,
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
              children: !Y && i.jsxs("button", {
                className: "primary",
                type: "button",
                disabled: c.gameStatus === "loading",
                onClick: () => void F(),
                children: [
                  i.jsx(vy, {
                    size: 17
                  }),
                  " ",
                  c.gameStatus === "loading" ? "Launching AoE2\u2026" : "Create Lobby"
                ]
              })
            })
          ]
        }),
        Y && i.jsxs("article", {
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
                  onClick: () => void Ne(),
                  disabled: p,
                  children: [
                    i.jsx(Nm, {
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
                  value: X,
                  maxLength: 64,
                  onChange: (O) => g(O.target.value)
                })
              ]
            }),
            i.jsx(Ra, {
              label: "Maximum players",
              value: String(_),
              onChange: (O) => L(Number(O)),
              options: Array.from({
                length: 7
              }, (O, ee) => {
                const fe = ee + 2;
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
                      "aria-pressed": I === "map",
                      onClick: () => $("map"),
                      children: "Map"
                    }),
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": I === "scenario",
                      onClick: () => $("scenario"),
                      children: "Scenario"
                    })
                  ]
                })
              ]
            }),
            I === "map" ? i.jsx(to, {
              label: "Map",
              items: y.maps.filter((O) => O.kind === "map"),
              value: le,
              onChange: me
            }) : i.jsx(to, {
              label: "Scenario",
              items: y.maps.filter((O) => O.kind === "scenario"),
              value: ce,
              onChange: pe
            }),
            i.jsx(to, {
              label: "Data mod (optional)",
              items: y.dataMods,
              value: K,
              onChange: ae
            }),
            [
              ...y.maps,
              ...y.dataMods
            ].some((O) => !O.enabled) && i.jsx("small", {
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
                  disabled: !X.trim() || !(I === "map" ? le : ce) || U,
                  onClick: () => void Re(),
                  children: U ? "Creating\u2026" : "Create Lobby"
                }),
                i.jsx("button", {
                  className: "secondary large",
                  type: "button",
                  disabled: U,
                  onClick: () => G(false),
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
                onClick: () => void Ce(),
                disabled: A,
                children: [
                  i.jsx(Nm, {
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
                r.map((O) => {
                  var _a2, _b2, _c;
                  return i.jsxs("article", {
                    className: "custom-room-row",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: O.name
                          }),
                          i.jsxs("small", {
                            children: [
                              O.demo ? "Demo room \xB7 " : "",
                              "Hosted by ",
                              ((_a2 = O.players.find((ee) => ee.host)) == null ? void 0 : _a2.displayName) ?? "Unknown"
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: ((_b2 = O.map) == null ? void 0 : _b2.name) ?? "Standard map"
                          }),
                          i.jsx("small", {
                            children: ((_c = O.dataMod) == null ? void 0 : _c.name) ?? "No data mod"
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
                          O.players.length,
                          "/",
                          O.maxPlayers
                        ]
                      }),
                      i.jsx("span", {
                        className: `custom-room-status ${O.status}`,
                        children: Ob(O.status)
                      }),
                      i.jsxs("button", {
                        className: "secondary",
                        type: "button",
                        disabled: O.status !== "open" || O.players.length >= O.maxPlayers || U || c.gameStatus === "loading",
                        onClick: () => void T(O.id),
                        children: [
                          i.jsx(ah, {
                            size: 16
                          }),
                          " ",
                          c.gameStatus === "loading" ? "Launching\u2026" : "Join"
                        ]
                      })
                    ]
                  }, O.id);
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
  function to({ label: c, items: o, value: f, onChange: r }) {
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
  function Ub({ room: c, currentPlayerId: o, notify: f }) {
    var _a2, _b2, _c;
    const [r, m] = z.useState(""), y = z.useRef(/* @__PURE__ */ new Set()), j = z.useRef(false), A = c.players.find((g) => g.id === o), M = c.hostId === o, p = z.useMemo(() => Array.from({
      length: c.maxPlayers
    }, (g, I) => c.players.find(($) => $.slot === I + 1)), [
      c
    ]), S = (g) => void g.catch((I) => f("Lobby update failed.", "danger", {
      detail: qt(I)
    }));
    z.useEffect(() => () => {
      var _a3, _b3;
      (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), (_b3 = window.electronApi) == null ? void 0 : _b3.stopReplayEndDetection();
    }, [
      c.id
    ]), z.useEffect(() => {
      if (c.status === "open") {
        y.current.clear();
        return;
      }
      if (c.status !== "launching" || !window.electronApi) return;
      const g = c.map, I = `${c.id}:host-setup`;
      if (M && !c.platformLobbyId && !y.current.has(I)) {
        y.current.add(I), (async () => {
          try {
            if (!g) throw new Error("Choose a map or scenario before starting.");
            await Y();
            const _ = await window.electronApi.runAoe2CreateLobbySequence(g.gameName, c.maxPlayers, g.kind === "scenario" ? "scenario" : "map", "custom");
            if (!_.sent || !_.lobbyUri) throw new Error(_.message || "AoE2 lobby creation failed.");
            await tt.publish(c.id, _.lobbyUri);
          } catch (_) {
            await tt.failStart(c.id, qt(_)), y.current.delete(I);
          }
        })();
        return;
      }
      const $ = `${c.id}:guest-join`;
      if (!M && c.platformLobbyId && !A.aoeJoined && !y.current.has($)) {
        y.current.add($), (async () => {
          try {
            if (!(await window.electronApi.openAoe2Lobby(c.platformLobbyId)).opened) throw new Error("AoE2 did not open the custom lobby.");
            (g == null ? void 0 : g.kind) !== "scenario" && await G(A), await tt.reportJoined(c.id);
          } catch (_) {
            f("Could not join the AoE2 lobby.", "danger", {
              detail: qt(_),
              durationMs: null
            }), y.current.delete($);
          }
        })();
        return;
      }
      const le = c.players.find((_) => _.host), me = `${c.id}:guest-ready`;
      if (!M && A.aoeJoined && (le == null ? void 0 : le.aoeReady) && !A.aoeReady && !y.current.has(me)) {
        y.current.add(me), (async () => {
          try {
            const _ = Date.now() + Qe.customMapTransferTimeoutMs;
            let L = false, U;
            do
              await new Promise((Z) => window.setTimeout(Z, Qe.customMapTransferPollMs)), U = await window.electronApi.runAoe2LobbyCursorAction("guest-ready", "custom"), !U.sent && !L && (L = true, await window.electronApi.runAoe2LobbyCursorAction("content-confirm", "custom"));
            while (!U.sent && Date.now() < _);
            if (!U.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
            await tt.reportAoeReady(c.id);
          } catch (_) {
            f("Could not ready in the AoE2 lobby.", "danger", {
              detail: qt(_),
              durationMs: null
            }), y.current.delete(me);
          }
        })();
        return;
      }
      const ce = c.players.filter((_) => !_.host).every((_) => _.aoeJoined), pe = `${c.id}:host-ready`;
      if (M && c.platformLobbyId && ce && !A.aoeReady && !y.current.has(pe)) {
        y.current.add(pe), (async () => {
          try {
            (g == null ? void 0 : g.kind) !== "scenario" && await G(A);
            const _ = await window.electronApi.runAoe2LobbyCursorAction("host-ready", "custom");
            if (!_.sent) throw new Error(_.message || "AoE2 could not ready the host.");
            await tt.reportAoeReady(c.id);
          } catch (_) {
            await tt.failStart(c.id, qt(_)), y.current.delete(pe);
          }
        })();
        return;
      }
      const K = c.players.every((_) => _.aoeReady), ae = `${c.id}:aoe-start`;
      M && K && !y.current.has(ae) && (y.current.add(ae), (async () => {
        try {
          const _ = await window.electronApi.runAoe2LobbyCursorAction("start", "custom");
          if (!_.sent) throw new Error(_.message || "AoE2 could not start the game.");
          await tt.completeStart(c.id, new Date(Date.now() - Qe.startGameSettleMs).toISOString());
        } catch (_) {
          await tt.failStart(c.id, qt(_)), y.current.delete(ae);
        }
      })());
    }, [
      c,
      M,
      A,
      f
    ]), z.useEffect(() => {
      if (c.status !== "started" || !window.electronApi) return;
      const g = `${c.id}:reveal-game`;
      if (y.current.has(g)) return;
      y.current.add(g), window.electronApi.startReplayEndDetection().then(($) => {
        $.started || f("Post-game return detection could not be started.", "danger", {
          detail: $.message || "Replay detection could not be started."
        });
      }).catch(($) => {
        f("Post-game return detection could not be started.", "danger", {
          detail: qt($)
        });
      });
      const I = window.setTimeout(() => {
        (async () => {
          try {
            await co(), await window.electronApi.focusAoe2();
          } catch ($) {
            f("Post-game return detection could not be started.", "danger", {
              detail: qt($)
            });
          } finally {
            await window.electronApi.setLobbyInputLock(false);
          }
        })();
      }, Qe.revealAfterStartMs);
      return () => window.clearTimeout(I);
    }, [
      c.id,
      c.status
    ]), z.useEffect(() => {
      if (!(c.status !== "started" || !window.electronApi)) return window.electronApi.onReplayEnded((g) => {
        j.current || (j.current = true, dv(g).then(async (I) => {
          if (!I) {
            j.current = false;
            return;
          }
          await window.electronApi.confirmReplayEnded(), await tt.finish(c.id);
        }).catch((I) => {
          j.current = false, f("The finished custom game could not be detected.", "danger", {
            detail: qt(I)
          });
        }));
      });
    }, [
      c.id,
      c.status,
      f
    ]);
    async function Y() {
      if ((await window.electronApi.detectAoe2Process()).running) return;
      const I = await window.electronApi.launchAoe2();
      if (!I.launched) throw new Error(I.message || "AoE2 could not be launched.");
      const $ = Date.now() + 45e3;
      for (; Date.now() < $; ) if (await new Promise((le) => window.setTimeout(le, 1e3)), (await window.electronApi.detectAoe2Process()).windowReady) return;
      throw new Error("AoE2 did not become ready in time.");
    }
    async function G(g) {
      const I = await window.electronApi.selectAoe2Civilization(g.civilization, g.slot, "custom");
      if (!I.sent) throw new Error(I.message);
      if (g.team === 1 || g.team === 2) {
        const $ = await window.electronApi.selectAoe2Team(g.team, g.slot, "custom");
        if (!$.sent) throw new Error($.message);
      }
    }
    function X(g) {
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
                i.jsx(Rn, {
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
                p.map((g, I) => {
                  var _a3;
                  return i.jsxs("div", {
                    className: g ? "lobby-player-row occupied" : "lobby-player-row",
                    children: [
                      i.jsxs("div", {
                        className: "lobby-player-name",
                        children: [
                          i.jsx("span", {
                            className: "lobby-slot-number",
                            children: I + 1
                          }),
                          g ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsx(by, {
                                size: 17
                              }),
                              i.jsx("strong", {
                                children: g.displayName
                              }),
                              g.host && i.jsx(fy, {
                                size: 15
                              }),
                              " ",
                              M && !g.host && i.jsx("button", {
                                className: "lobby-kick",
                                "aria-label": `Remove ${g.displayName}`,
                                onClick: () => S(tt.kick(c.id, g.id)),
                                children: i.jsx(Rn, {
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
                              g.ready && i.jsx(Us, {
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
                            onChange: ($) => S(tt.updatePlayer(c.id, {
                              team: Number($)
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
                              ].map(($) => ({
                                value: String($),
                                label: `Team ${$}`
                              }))
                            ]
                          }),
                          i.jsx(Ra, {
                            className: "lobby-inline-select",
                            label: "Civilization",
                            value: g.civilization,
                            onChange: ($) => S(tt.updatePlayer(c.id, {
                              civilization: $
                            })),
                            options: [
                              "Random",
                              ...Os
                            ].map(($) => ({
                              value: $,
                              label: $
                            }))
                          }),
                          i.jsxs("button", {
                            className: g.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => S(tt.updatePlayer(c.id, {
                              ready: !g.ready
                            })),
                            children: [
                              g.ready && i.jsx(Us, {
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
                  }, I);
                })
              ]
            }),
            i.jsxs("aside", {
              className: "panel lobby-chat",
              children: [
                i.jsxs("div", {
                  className: "lobby-chat-title",
                  children: [
                    i.jsx(yy, {
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
                  onSubmit: X,
                  children: [
                    i.jsx("input", {
                      placeholder: "Message lobby\u2026",
                      value: r,
                      onChange: (g) => m(g.target.value)
                    }),
                    i.jsx("button", {
                      className: "primary",
                      "aria-label": "Send",
                      children: i.jsx(ho, {
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
              children: c.status === "started" ? i.jsx(Lb, {
                startedAt: c.gameStartedAt
              }) : c.status === "launching" ? i.jsxs(i.Fragment, {
                children: [
                  "Creating and synchronizing the AoE2 lobby",
                  i.jsx(ro, {})
                ]
              }) : c.automationError ? c.automationError : c.players.every((g) => g.ready) ? "All players are ready." : "Waiting for players to ready up."
            }),
            M && i.jsx("button", {
              className: "primary large",
              disabled: c.status !== "open" || !c.map || !c.players.every((g) => g.ready),
              onClick: () => S(tt.start(c.id)),
              children: c.status !== "open" ? i.jsxs(i.Fragment, {
                children: [
                  "Starting",
                  i.jsx(ro, {})
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
  function Ob(c) {
    return c === "open" ? "Open" : c === "launching" ? "Starting" : "In Game";
  }
  function ro() {
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
  function Lb({ startedAt: c }) {
    const [o, f] = z.useState(() => $m(c));
    return z.useEffect(() => {
      const r = () => f($m(c));
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
        i.jsx(ro, {})
      ]
    });
  }
  function $m(c) {
    if (!c) return 5;
    const o = Math.max(0, Date.now() - new Date(c).getTime());
    return Math.max(0, Math.ceil((5e3 - o) / 1e3));
  }
  function kb() {
    const { state: c, openPlayerProfile: o } = St(), [f, r] = z.useState(""), [m, y] = z.useState("all"), j = z.useMemo(() => c.recentMatches.filter((A) => {
      const M = `${A.opponent} ${A.map} ${A.civilization} ${A.opponentCivilization}`.toLowerCase().includes(f.toLowerCase()), p = m === "all" || A.outcome === m;
      return M && p;
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
              j.map((A) => i.jsxs("div", {
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
              j.length === 0 && i.jsx("div", {
                className: "empty-state",
                children: c.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."
              })
            ]
          })
        })
      ]
    });
  }
  const qb = {
    async list(c = 1, o = "all", f = "solo") {
      if (Se) {
        const m = [
          ...yo
        ].sort((j, A) => f === "team" ? A.teamRating - j.teamRating : A.rating - j.rating).map((j, A) => {
          const M = f === "team" ? j.teamRating : j.rating, p = f === "team" ? j.legacyTeamWins : j.wins, S = f === "team" ? j.legacyTeamLosses : j.losses;
          return {
            ...j,
            rating: M,
            rank: A + 1,
            division: Nn(M),
            wins: p,
            losses: S,
            winRate: p + S ? Number((p / (p + S) * 100).toFixed(1)) : 0
          };
        }), y = o === "all" ? m : m.filter((j) => j.division === o);
        return {
          players: y,
          page: c,
          pageSize: 100,
          total: y.length,
          division: o,
          mode: f
        };
      }
      const r = new URLSearchParams({
        page: String(c),
        division: o,
        mode: f
      });
      return Me.request(`/leaderboard?${r}`);
    }
  };
  function Bb() {
    const { state: c, openPlayerProfile: o } = St(), [f, r] = z.useState(""), [m, y] = z.useState("all"), [j, A] = z.useState("solo"), [M, p] = z.useState([]), [S, Y] = z.useState(1), [G, X] = z.useState(0), [g, I] = z.useState(true), [$, le] = z.useState(null);
    z.useEffect(() => {
      let L = false;
      return I(true), le(null), qb.list(S, m, j).then((U) => {
        L || (p(U.players), X(U.total));
      }).catch((U) => {
        L || le(U instanceof Error ? U.message : "Leaderboard could not be loaded.");
      }).finally(() => {
        L || I(false);
      }), () => {
        L = true;
      };
    }, [
      m,
      j,
      S
    ]);
    const me = z.useMemo(() => M.filter((L) => L.displayName.toLowerCase().includes(f.toLowerCase())), [
      M,
      f
    ]), ce = [
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
        label: `${L} (${Pg(L)})`
      }))
    ], pe = Math.max(1, Math.ceil(G / 100)), K = G === 0 ? 0 : (S - 1) * 100 + 1, ae = Math.min(S * 100, G), _ = i.jsx(Hb, {
      page: S,
      totalPages: pe,
      firstRank: K,
      lastRank: ae,
      total: G,
      loading: g,
      onPageChange: Y
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
                  "aria-pressed": j === "solo",
                  onClick: () => {
                    A("solo"), Y(1);
                  },
                  children: "1v1"
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-pressed": j === "team",
                  onClick: () => {
                    A("team"), Y(1);
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
                  onChange: (L) => r(L.target.value),
                  placeholder: "Player name"
                })
              ]
            }),
            i.jsx(Ra, {
              className: "division-field",
              label: "Division",
              options: ce,
              value: m,
              onChange: (L) => {
                Y(1), y(L);
              }
            })
          ]
        }),
        i.jsxs("div", {
          className: "panel",
          children: [
            i.jsx("div", {
              className: "leaderboard-pagination-top",
              children: _
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
                me.map((L) => i.jsxs("div", {
                  className: L.id === c.currentUser.id ? "leader-row current" : "leader-row",
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
                      onClick: () => o(L.id),
                      children: L.displayName
                    }),
                    i.jsx("span", {
                      children: Gb(L.countryCode)
                    }),
                    i.jsx("span", {
                      children: L.rating
                    }),
                    i.jsx("span", {
                      children: di(L.rating)
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
                      children: L.streak > 0 ? `W${L.streak}` : L.streak < 0 ? `L${Math.abs(L.streak)}` : "\u2014"
                    })
                  ]
                }, L.id)),
                g && i.jsx("div", {
                  className: "empty-state",
                  children: "Loading leaderboard\u2026"
                }),
                !g && $ && i.jsx("div", {
                  className: "empty-state",
                  children: $
                }),
                !g && !$ && me.length === 0 && i.jsx("div", {
                  className: "empty-state",
                  children: "No leaderboard results."
                })
              ]
            }),
            i.jsx("div", {
              className: "leaderboard-pagination-bottom",
              children: _
            })
          ]
        })
      ]
    });
  }
  function Hb({ page: c, totalPages: o, firstRank: f, lastRank: r, total: m, loading: y, onPageChange: j }) {
    const A = o <= 7 ? Array.from({
      length: o
    }, (M, p) => p + 1) : c <= 4 ? [
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
          onClick: () => j(c - 1),
          children: "Previous"
        }),
        i.jsx("div", {
          className: "leaderboard-page-numbers",
          children: A.map((M, p) => M === "ellipsis" ? i.jsx("span", {
            className: "leaderboard-page-ellipsis",
            "aria-hidden": "true",
            children: "\u2026"
          }, `ellipsis-${p}`) : i.jsx("button", {
            className: "leaderboard-page-number",
            type: "button",
            "aria-current": M === c ? "page" : void 0,
            disabled: y,
            onClick: () => j(M),
            children: M
          }, M))
        }),
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: y || c >= o,
          onClick: () => j(c + 1),
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
  function Gb(c) {
    const o = c == null ? void 0 : c.trim().toUpperCase();
    return o ? /^[A-Z]{2}$/.test(o) ? i.jsx("span", {
      className: `country-flag fi fi-${o.toLowerCase()}`,
      role: "img",
      "aria-label": `${o} flag`,
      title: o
    }) : o : "\u2014";
  }
  const Yb = {
    async getProfile(c) {
      return Se ? {
        player: yo.find((o) => o.id === c) ?? dt,
        matches: vo
      } : Me.request(`/players/${encodeURIComponent(c)}`);
    }
  };
  function Qb(c, o) {
    const f = c.filter((y) => y.queueType !== "team-games").sort((y, j) => new Date(y.timestamp).getTime() - new Date(j.timestamp).getTime());
    if (f.length === 0) return [];
    let r = o - f.reduce((y, j) => y + j.ratingChange, 0);
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
  function Xb({ matches: c, currentRating: o, possessive: f = "Your" }) {
    var _a2, _b2;
    const [r, m] = z.useState(null), y = Qb(c, o);
    if (y.length === 0) return i.jsxs("div", {
      className: "empty-state",
      children: [
        f,
        " Elo progress will appear after the first 1v1 match."
      ]
    });
    const j = 800, A = 260, M = {
      top: 22,
      right: 22,
      bottom: 42,
      left: 58
    }, p = y.map((te) => te.rating), S = Math.min(...p), Y = Math.max(...p), G = Math.floor((S - 20) / 25) * 25, X = Math.ceil((Y + 20) / 25) * 25, g = Math.max(X - G, 1), I = j - M.left - M.right, $ = A - M.top - M.bottom, le = y.map((te, Ce) => ({
      ...te,
      x: M.left + Ce / Math.max(y.length - 1, 1) * I,
      y: M.top + (X - te.rating) / g * $
    })), me = le.map((te) => `${te.x},${te.y}`).join(" "), ce = `${M.left},${M.top + $} ${me} ${M.left + I},${M.top + $}`, pe = Array.from({
      length: 5
    }, (te, Ce) => {
      const Ne = Ce / 4;
      return {
        y: M.top + Ne * $,
        rating: Math.round(X - Ne * g)
      };
    }), K = y.at(-1).rating - y[0].rating, ae = le.find((te) => te.id === r), _ = 126, L = 44, U = ae ? Math.min(Math.max(ae.x - _ / 2, M.left), j - M.right - _) : 0, Z = ae ? ae.y - L - 12 < 4 ? ae.y + 12 : ae.y - L - 12 : 0;
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
          "aria-label": `Elo progress over ${y.length - 1} recorded matches, ending at ${o}`,
          children: i.jsxs("svg", {
            viewBox: `0 0 ${j} ${A}`,
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
              pe.map((te) => i.jsxs("g", {
                children: [
                  i.jsx("line", {
                    className: "rating-chart-grid",
                    x1: M.left,
                    x2: j - M.right,
                    y1: te.y,
                    y2: te.y
                  }),
                  i.jsx("text", {
                    className: "rating-chart-axis",
                    x: M.left - 10,
                    y: te.y + 4,
                    textAnchor: "end",
                    children: te.rating
                  })
                ]
              }, te.y)),
              i.jsx("polygon", {
                className: "rating-chart-area",
                points: ce
              }),
              i.jsx("polyline", {
                className: "rating-chart-line",
                points: me
              }),
              le.map((te) => i.jsxs("g", {
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
                    r: r === te.id ? 6 : 4
                  })
                ]
              }, te.id)),
              ae && i.jsxs("g", {
                className: "rating-chart-tooltip",
                transform: `translate(${U} ${Z})`,
                children: [
                  i.jsx("rect", {
                    width: _,
                    height: L
                  }),
                  i.jsx("text", {
                    className: "rating-chart-tooltip-label",
                    x: "10",
                    y: "17",
                    children: ae.label
                  }),
                  i.jsxs("text", {
                    className: "rating-chart-tooltip-value",
                    x: "10",
                    y: "34",
                    children: [
                      ae.rating,
                      " Elo"
                    ]
                  })
                ]
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: M.left,
                y: A - 13,
                children: (_a2 = y[1]) == null ? void 0 : _a2.label
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: j - M.right,
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
  function Vb({ friendIds: c, outgoingRequestIds: o, onAddFriend: f }) {
    const { state: r, selectedProfileId: m } = St(), y = !m || m === r.currentUser.id, [j, A] = z.useState(null), [M, p] = z.useState(null), [S, Y] = z.useState(false), [G, X] = z.useState(false);
    if (z.useEffect(() => {
      if (X(false), y) {
        A(null), p(null);
        return;
      }
      let pe = false;
      return A(null), p(null), Yb.getProfile(m).then((K) => {
        pe || A(K);
      }).catch((K) => {
        pe || p(K instanceof Error ? K.message : "Player profile could not be loaded.");
      }), () => {
        pe = true;
      };
    }, [
      m,
      y
    ]), !y && !j) return i.jsx("div", {
      className: "panel empty-state",
      children: M ?? "Loading player profile\u2026"
    });
    const g = y ? r.currentUser : j.player, I = y ? r.recentMatches : j.matches, $ = I.slice(0, 5).map((pe) => pe.outcome), le = c.includes(g.id), me = G || o.includes(g.id);
    async function ce() {
      Y(true);
      try {
        await f(g.displayName), X(true);
      } finally {
        Y(false);
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
            $.length > 0 && i.jsx(Wm, {
              form: $
            }),
            !y && !le && i.jsx("button", {
              className: "primary profile-friend-button",
              type: "button",
              disabled: S || me,
              onClick: () => void ce(),
              children: me ? "Friend request sent" : S ? "Sending\u2026" : "Add friend"
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
            i.jsx(Xb, {
              matches: I,
              currentRating: g.rating,
              possessive: y ? "Your" : `${g.displayName}'s`
            })
          ]
        })
      ]
    });
  }
  function Zb() {
    const { state: c, updateSettings: o, signOut: f } = St(), r = c.settings;
    return i.jsxs("section", {
      className: "settings-grid",
      children: [
        i.jsx(ao, {
          title: "Game",
          children: i.jsx(no, {
            label: "Launch AoE2 when Empire League starts",
            checked: r.launchAoe2OnStartup,
            onChange: (m) => o({
              launchAoe2OnStartup: m
            })
          })
        }),
        i.jsxs(ao, {
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
            i.jsx(no, {
              label: "Match-found notifications",
              helpText: "Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way.",
              checked: r.matchNotifications,
              onChange: (m) => o({
                matchNotifications: m
              })
            }),
            i.jsx(no, {
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
                    i.jsx(xh, {
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
        i.jsxs(ao, {
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
  function ao({ title: c, children: o }) {
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
  function no({ label: c, helpText: o, checked: f, onChange: r }) {
    const m = z.useId();
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
            o && i.jsx(xh, {
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
  function xh({ text: c }) {
    const [o, f] = z.useState(false), r = z.useId();
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
          children: i.jsx(uy, {
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
  function Kb({ friends: c, requests: o, onMessage: f, onAccept: r, onDecline: m, onInvite: y, onUnfriend: j }) {
    const [A, M] = z.useState(""), [p, S] = z.useState(""), [Y, G] = z.useState(null), [X, g] = z.useState(null), [I, $] = z.useState(false), [le, me] = z.useState(null), [ce, pe] = z.useState("all"), K = z.useMemo(() => c.filter((U) => {
      const Z = U.name.toLowerCase().includes(A.trim().toLowerCase()), te = ce === "all" || ce === "online" && U.presence !== "offline" || U.presence === "in_game";
      return Z && te;
    }), [
      ce,
      c,
      A
    ]);
    async function ae(U) {
      U.preventDefault();
      const Z = p.trim();
      if (Z) {
        $(true), g(null), G(null);
        try {
          const te = await y(Z);
          G(te), S("");
        } catch (te) {
          g(te instanceof Error ? te.message : "The invite could not be sent.");
        } finally {
          $(false);
        }
      }
    }
    const _ = c.filter((U) => U.presence !== "offline").length, L = c.filter((U) => U.presence === "in_game").length;
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
                  onClick: () => pe("all"),
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
                  onClick: () => pe("online"),
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
                  onClick: () => pe("in_game"),
                  type: "button",
                  children: [
                    i.jsx(io, {
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
                        i.jsx(_s, {
                          size: 17
                        }),
                        i.jsx("input", {
                          "aria-label": "Search friends",
                          value: A,
                          onChange: (U) => M(U.target.value),
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
                              title: Mh(U.presence)
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
                            U.presence === "in_game" && i.jsx(io, {
                              size: 15
                            }),
                            U.presence === "idle" && i.jsx(oy, {
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
                                i.jsx(nh, {
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
                              onClick: () => me(U),
                              children: i.jsx(eo, {
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
                  children: i.jsx(My, {
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
                  onSubmit: ae,
                  children: [
                    i.jsx("input", {
                      value: p,
                      onChange: (U) => {
                        S(U.target.value), G(null), g(null);
                      },
                      placeholder: "Player name",
                      "aria-label": "Player name"
                    }),
                    i.jsxs("button", {
                      className: "primary",
                      type: "submit",
                      disabled: !p.trim() || I,
                      children: [
                        i.jsx(ho, {
                          size: 16
                        }),
                        " ",
                        I ? "Checking player\u2026" : "Send invite"
                      ]
                    })
                  ]
                }),
                Y && i.jsxs("span", {
                  className: "invite-confirmation",
                  children: [
                    i.jsx(Us, {
                      size: 14
                    }),
                    " Invite sent to ",
                    Y
                  ]
                }),
                X && i.jsxs("span", {
                  className: "invite-error",
                  role: "alert",
                  children: [
                    i.jsx(Rn, {
                      size: 14
                    }),
                    " ",
                    X
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
                    o.map((U) => i.jsxs("article", {
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
                              onClick: () => r(U),
                              children: i.jsx(Us, {
                                size: 16
                              })
                            }),
                            i.jsx("button", {
                              type: "button",
                              "aria-label": `Decline ${U.name}`,
                              title: "Decline",
                              onClick: () => m(U.id),
                              children: i.jsx(Rn, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, U.id)),
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
          onPointerDown: () => me(null),
          children: i.jsxs("section", {
            className: "social-confirm-modal",
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "unfriend-title",
            onPointerDown: (U) => U.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "social-confirm-icon",
                children: i.jsx(eo, {
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
                    onClick: () => me(null),
                    children: "Cancel"
                  }),
                  i.jsxs("button", {
                    className: "social-confirm-remove",
                    type: "button",
                    onClick: () => {
                      j(le), me(null);
                    },
                    children: [
                      i.jsx(eo, {
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
  function Mh(c) {
    return {
      online: "Online",
      in_game: "In game",
      idle: "Idle",
      offline: "Offline"
    }[c];
  }
  function Jb({ chats: c, onToggle: o, onClose: f, onSend: r, onActivate: m }) {
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
          i.jsx(nh, {
            size: 17
          }),
          i.jsx("span", {
            children: y.friend.name
          }),
          i.jsx("span", {
            className: `presence-dot ${y.friend.presence}`
          })
        ]
      }, y.friend.id) : i.jsx(Fb, {
        chat: y,
        onToggle: o,
        onClose: f,
        onSend: r,
        onActivate: m
      }, y.friend.id))
    });
  }
  function Fb({ chat: c, onToggle: o, onClose: f, onSend: r, onActivate: m }) {
    const [y, j] = z.useState(""), A = z.useRef(null);
    z.useEffect(() => {
      var _a2;
      return (_a2 = A.current) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth"
      });
    }, [
      c.messages
    ]);
    function M(p) {
      p.preventDefault(), y.trim() && (r(c.friend.id, y.trim()), j(""));
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
                      children: Mh(c.friend.presence)
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
                  children: i.jsx(lh, {
                    size: 16
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Close chat",
                  onClick: () => f(c.friend.id),
                  children: i.jsx(Rn, {
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
          onSubmit: M,
          children: [
            i.jsx("input", {
              value: y,
              onChange: (p) => j(p.target.value),
              placeholder: `Message ${c.friend.name}`,
              "aria-label": `Message ${c.friend.name}`
            }),
            i.jsx("button", {
              type: "submit",
              "aria-label": "Send message",
              disabled: !y.trim(),
              children: i.jsx(ho, {
                size: 17
              })
            })
          ]
        })
      ]
    });
  }
  const $b = "" + new URL("el_icon_no_plume-CLUisAEI.png", import.meta.url).href, Ib = {
    async getOnlinePlayerCount() {
      if (Se) return 486;
      const c = await Me.request("/online");
      return Number(c.onlinePlayers);
    }
  }, Wb = /* @__PURE__ */ new Set([
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
  function fo() {
    const { state: c, notify: o } = St();
    async function f() {
      var _a2;
      if (Wb.has(c.queueStatus)) {
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
          children: i.jsx(lh, {
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
          children: i.jsx(Rn, {
            size: 17,
            "aria-hidden": "true"
          })
        })
      ]
    });
  }
  const Pb = [
    {
      page: "home",
      label: "Home",
      icon: i.jsx(hy, {
        size: 18
      })
    },
    {
      page: "ranked",
      label: "Ranked",
      icon: i.jsx(po, {
        size: 18
      })
    },
    {
      page: "custom",
      label: "Custom",
      icon: i.jsx(io, {
        size: 18
      })
    },
    {
      page: "match-history",
      label: "Match History",
      icon: i.jsx(my, {
        size: 18
      })
    },
    {
      page: "leaderboard",
      label: "Leaderboard",
      icon: i.jsx(sy, {
        size: 18
      })
    },
    {
      page: "profile",
      label: "Profile",
      icon: i.jsx(jy, {
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
      icon: i.jsx(so, {
        size: 18
      })
    }
  ];
  function e0({ children: c }) {
    const { page: o, setPage: f, state: r, signOut: m, selectedProfileId: y, openPlayerProfile: j, returnFromPlayerProfile: A } = St(), M = o === "profile" && y !== null && y !== r.currentUser.id, p = `${r.currentUser.wins}-${r.currentUser.losses}`, [S, Y] = z.useState(null);
    return z.useEffect(() => {
      if (Se) return;
      let G = false;
      const X = () => {
        Ib.getOnlinePlayerCount().then((I) => {
          G || Y(I);
        }).catch(() => {
          G || Y(null);
        });
      };
      X();
      const g = window.setInterval(X, 3e4);
      return () => {
        G = true, window.clearInterval(g);
      };
    }, []), i.jsxs("div", {
      className: "app-shell",
      children: [
        i.jsxs("div", {
          className: "window-title",
          children: [
            i.jsx("img", {
              src: $b,
              alt: ""
            }),
            i.jsx("span", {
              children: "Empire League - AoE2:DE Community Client & Matchmaker"
            })
          ]
        }),
        i.jsx(fo, {}),
        i.jsxs("aside", {
          className: "sidebar",
          children: [
            i.jsx("nav", {
              className: "nav-list",
              "aria-label": "Primary navigation",
              children: Pb.map((G) => i.jsxs("button", {
                className: o === G.page ? "nav-item active" : "nav-item",
                type: "button",
                onClick: () => G.page === "profile" ? j(r.currentUser.id) : f(G.page),
                children: [
                  G.icon,
                  i.jsx("span", {
                    children: G.label
                  }),
                  G.page === "ranked" && r.queueStatus === "searching" && i.jsxs("span", {
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
              }, G.page))
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
                  children: i.jsx(gy, {
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
                className: M ? "topbar linked-profile-topbar" : "topbar",
                children: [
                  M && i.jsxs("button", {
                    className: "secondary profile-header-back",
                    type: "button",
                    onClick: A,
                    children: [
                      i.jsx(ly, {
                        size: 16
                      }),
                      "Back"
                    ]
                  }),
                  i.jsx("div", {
                    children: i.jsx("h1", {
                      children: t0(o)
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
  function t0(c) {
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
  function a0() {
    const { state: c, acceptMatch: o, declineMatch: f } = St(), r = c.activeMatch, m = (r == null ? void 0 : r.queue.id) === "ranked-rm-1v1" && r.opponent.steamLicenseStatus === "family_shared", y = z.useRef(m && (r == null ? void 0 : r.acceptDeadline) ? new Date(r.acceptDeadline).getTime() : Date.now() + 1e4), j = z.useRef(false), A = y.current, [M, p] = z.useState(() => Math.max(0, Math.ceil((A - Date.now()) / 1e3))), S = $t.find((Y) => {
      var _a2;
      return Y.id === ((_a2 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a2.id);
    }) ?? (r == null ? void 0 : r.selectedMap);
    return z.useEffect(() => {
      const Y = () => p(Math.max(0, Math.ceil((A - Date.now()) / 1e3)));
      Y();
      const G = window.setInterval(Y, 250);
      return () => window.clearInterval(G);
    }, [
      A
    ]), z.useEffect(() => {
      if (m) return;
      const Y = Math.max(0, A - Date.now()), G = window.setTimeout(() => {
        j.current || (j.current = true, o());
      }, Y);
      return () => window.clearTimeout(G);
    }, [
      o,
      A,
      m
    ]), z.useEffect(() => {
      function Y(G) {
        G.key === "Escape" && f();
      }
      return window.addEventListener("keydown", Y), () => window.removeEventListener("keydown", Y);
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
              M,
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
  const n0 = {
    info: py,
    success: cy,
    warning: wy,
    danger: eh,
    loading: th
  };
  function l0() {
    const { state: c, dismissNotification: o } = St();
    return i.jsx("div", {
      className: "toasts",
      "aria-live": "polite",
      children: c.notifications.map((f) => i.jsx(i0, {
        item: f,
        dismiss: () => o(f.id)
      }, `${f.id}-${f.tone}`))
    });
  }
  function i0({ item: c, dismiss: o }) {
    const [f, r] = z.useState(c.durationMs ?? 0), [m, y] = z.useState(false), j = z.useRef(Date.now()), A = n0[c.tone];
    z.useEffect(() => {
      if (m || c.durationMs === null) return;
      j.current = Date.now();
      const S = window.setTimeout(o, f);
      return () => window.clearTimeout(S);
    }, [
      o,
      c.durationMs,
      m,
      f
    ]);
    function M() {
      r((S) => Math.max(0, S - (Date.now() - j.current))), y(true);
    }
    const p = {
      "--toast-duration": `${f}ms`,
      "--toast-progress": c.durationMs ? f / c.durationMs : 1
    };
    return i.jsxs("div", {
      className: `toast ${c.tone}`,
      onMouseEnter: M,
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
          children: i.jsx(Rn, {
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
  const Ft = {
    async getSnapshot() {
      return Se ? {
        friends: uh,
        requests: oh,
        outgoing: []
      } : (await Me.request("/social")).snapshot;
    },
    async sendFriendRequest(c) {
      return Se ? {
        id: `preview-${c.toLowerCase().replaceAll(" ", "-")}`,
        displayName: c
      } : (await Me.request("/social/requests", {
        method: "POST",
        body: {
          displayName: c
        }
      })).player;
    },
    async acceptRequest(c) {
      Se || await Me.request(`/social/requests/${encodeURIComponent(c)}/accept`, {
        method: "POST"
      });
    },
    async declineRequest(c) {
      Se || await Me.request(`/social/requests/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async removeFriend(c) {
      Se || await Me.request(`/social/friends/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async updatePresence(c, o, f) {
      Se || await Me.request("/social/presence", {
        method: "POST",
        body: {
          presence: c,
          activity: o,
          mapName: f
        }
      });
    },
    async getMessages(c) {
      return Se ? [
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
      ] : (await Me.request(`/social/messages/${encodeURIComponent(c)}`)).messages;
    },
    async sendMessage(c, o) {
      return Se ? {
        id: `preview-message-${Date.now()}`,
        senderId: "user-1",
        recipientId: c,
        text: o,
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      } : (await Me.request("/social/messages", {
        method: "POST",
        body: {
          recipientId: c,
          text: o
        }
      })).message;
    },
    async markMessagesRead(c) {
      Se || await Me.request(`/social/messages/${encodeURIComponent(c)}/read`, {
        method: "POST"
      });
    },
    onEvent(c) {
      return Se ? () => {
      } : Me.onSocialEvent(c);
    }
  };
  function s0() {
    var _a2, _b2, _c;
    const [c, o] = z.useState(false), [f, r] = z.useState(!Se), [m, y] = z.useState(Se ? uh : []), j = z.useRef([]), [A, M] = z.useState(Se ? oh : []), [p, S] = z.useState([]), [Y, G] = z.useState([]);
    z.useEffect(() => {
      var _a3;
      return (_a3 = window.electronApi) == null ? void 0 : _a3.onMouseTestModeChanged(o);
    }, []), z.useEffect(() => {
      const _ = window.setTimeout(() => r(false), 3e3);
      return () => window.clearTimeout(_);
    }, []);
    const { page: X, state: g, authStatus: I, authError: $, signInWithSteam: le } = St();
    z.useEffect(() => {
      j.current = m;
    }, [
      m
    ]), z.useEffect(() => {
      const _ = () => {
        var _a3;
        return void ((_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert());
      };
      return window.addEventListener("focus", _), () => window.removeEventListener("focus", _);
    }, []);
    async function me(_) {
      const L = await Ft.getMessages(_.id).catch(() => []);
      Ft.markMessagesRead(_.id), G((U) => U.find((te) => te.friend.id === _.id) ? U.map((te) => te.friend.id === _.id ? {
        ...te,
        minimized: false
      } : te) : [
        ...U.slice(-2),
        {
          friend: _,
          minimized: false,
          messages: L.map((te) => ({
            id: te.id,
            from: te.senderId === g.currentUser.id ? "me" : "friend",
            text: te.text,
            time: new Date(te.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }))
        }
      ]), y((U) => U.map((Z) => Z.id === _.id ? {
        ...Z,
        unread: 0
      } : Z));
    }
    function ce(_) {
      var _a3;
      y((L) => L.map((U) => U.id === _ ? {
        ...U,
        unread: 0
      } : U)), Ft.markMessagesRead(_), (_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert();
    }
    async function pe(_) {
      await Ft.removeFriend(_.id), G((L) => L.filter((U) => U.friend.id !== _.id));
    }
    async function K(_) {
      await Ft.acceptRequest(_.connectionId);
    }
    async function ae(_) {
      const L = _.trim().toLowerCase();
      if (L === g.currentUser.displayName.toLowerCase()) throw new Error("You can\u2019t send a friend invite to yourself.");
      if (m.some((Z) => Z.name.toLowerCase() === L)) throw new Error(`${_.trim()} is already your friend.`);
      if (A.some((Z) => Z.name.toLowerCase() === L)) throw new Error(`You already have a pending request from ${_.trim()}.`);
      return (await Ft.sendFriendRequest(_)).displayName;
    }
    return z.useEffect(() => {
      if (Se || I !== "authenticated") return;
      const _ = (L) => {
        y((U) => L.friends.map((Z) => {
          var _a3;
          return {
            ...Z,
            initials: Im(Z.name),
            unread: Z.unread ?? ((_a3 = U.find((te) => te.id === Z.id)) == null ? void 0 : _a3.unread) ?? 0
          };
        })), M(L.requests.map((U) => ({
          ...U,
          initials: Im(U.name)
        }))), S(L.outgoing.map((U) => U.id));
      };
      return Ft.getSnapshot().then(_), Ft.onEvent((L) => {
        var _a3;
        if (L.type === "snapshot" && _(L.snapshot), L.type === "presence" && (y((U) => U.map((Z) => Z.id === L.playerId ? {
          ...Z,
          presence: L.presence,
          activity: L.activity,
          mapName: L.mapName
        } : Z)), G((U) => U.map((Z) => Z.friend.id === L.playerId ? {
          ...Z,
          friend: {
            ...Z.friend,
            presence: L.presence,
            activity: L.activity,
            mapName: L.mapName
          }
        } : Z))), L.type === "message") {
          const U = L.message, Z = {
            id: U.id,
            from: "friend",
            text: U.text,
            time: new Date(U.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }, te = j.current.find((Ne) => Ne.id === U.senderId), Ce = document.hasFocus();
          G((Ne) => {
            const Re = Ne.some((F) => F.friend.id === U.senderId);
            return !Re && te ? [
              ...Ne.slice(-2),
              {
                friend: te,
                minimized: false,
                messages: [
                  Z
                ]
              }
            ] : Re ? Ne.map((F) => F.friend.id === U.senderId ? {
              ...F,
              minimized: false,
              messages: [
                ...F.messages,
                Z
              ]
            } : F) : Ne;
          }), Ce ? Ft.markMessagesRead(U.senderId) : (y((Ne) => Ne.map((Re) => Re.id === U.senderId ? {
            ...Re,
            unread: (Re.unread ?? 0) + 1
          } : Re)), (_a3 = window.electronApi) == null ? void 0 : _a3.alertUnreadMessage());
        }
      });
    }, [
      I,
      g.currentUser.id
    ]), z.useEffect(() => {
      if (Se || I !== "authenticated") return;
      let _ = false, L = 0;
      const U = () => {
        var _a3, _b3;
        const Ne = g.activeMatch, Re = g.queueStatus === "in_game" || g.gameStatus === "in_match", F = Re ? "in_game" : _ ? "idle" : "online", T = Re ? `In game${((_a3 = Ne == null ? void 0 : Ne.selectedMap) == null ? void 0 : _a3.name) ? ` \xB7 ${Ne.selectedMap.name}` : ""}` : g.queueStatus === "searching" ? "Looking for a match" : _ ? "Idle" : "Online";
        Ft.updatePresence(F, T, Re ? (_b3 = Ne == null ? void 0 : Ne.selectedMap) == null ? void 0 : _b3.name : void 0);
      }, Z = () => {
        const Ne = _;
        _ = false, window.clearTimeout(L), L = window.setTimeout(() => {
          _ = true, U();
        }, 5 * 6e4), Ne && U();
      }, te = [
        "pointerdown",
        "keydown",
        "wheel"
      ];
      te.forEach((Ne) => window.addEventListener(Ne, Z, {
        passive: true
      })), Z(), U();
      const Ce = window.setInterval(U, 3e4);
      return () => {
        te.forEach((Ne) => window.removeEventListener(Ne, Z)), window.clearTimeout(L), window.clearInterval(Ce);
      };
    }, [
      I,
      g.queueStatus,
      g.gameStatus,
      (_a2 = g.activeMatch) == null ? void 0 : _a2.id,
      (_c = (_b2 = g.activeMatch) == null ? void 0 : _b2.selectedMap) == null ? void 0 : _c.name
    ]), f || I === "loading" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(fo, {}),
        i.jsx("main", {
          className: "auth-screen session-loading-screen",
          "aria-label": "Loading Empire League",
          children: i.jsxs("div", {
            className: "session-loading-mark",
            children: [
              i.jsx("img", {
                className: "session-loading-artwork",
                src: bh,
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
    }) : I !== "authenticated" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(fo, {}),
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
              $ && i.jsx("div", {
                className: "auth-error",
                children: $
              }),
              i.jsxs("button", {
                className: "primary large",
                type: "button",
                disabled: I === "authenticating",
                onClick: () => void le(),
                children: [
                  i.jsx(ah, {
                    size: 20
                  }),
                  I === "authenticating" ? "Waiting for Steam\u2026" : "Sign in through Steam"
                ]
              }),
              I === "authenticating" && i.jsx("span", {
                children: "Complete sign-in in your browser."
              })
            ]
          })
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        i.jsx(c0, {
          locked: [
            "creating_lobby",
            "waiting_for_opponent",
            "verifying_lobby",
            "ready"
          ].includes(g.queueStatus) && !g.error
        }),
        i.jsxs(e0, {
          children: [
            X === "home" && i.jsx(Ev, {}),
            X === "ranked" && i.jsx(Nb, {}),
            X === "custom" && i.jsx(Db, {}),
            X === "match-history" && i.jsx(kb, {}),
            X === "leaderboard" && i.jsx(Bb, {}),
            X === "profile" && i.jsx(Vb, {
              friendIds: m.map((_) => _.id),
              outgoingRequestIds: p,
              onAddFriend: async (_) => {
                await ae(_);
              }
            }),
            X === "social" && i.jsx(Kb, {
              friends: m,
              requests: A,
              onMessage: (_) => void me(_),
              onAccept: (_) => void K(_),
              onDecline: (_) => {
                var _a3;
                return void Ft.declineRequest(((_a3 = A.find((L) => L.id === _)) == null ? void 0 : _a3.connectionId) ?? _);
              },
              onInvite: ae,
              onUnfriend: (_) => void pe(_)
            }),
            X === "settings" && i.jsx(Zb, {})
          ]
        }),
        g.queueStatus === "match_found" && g.activeMatch && i.jsx(a0, {}),
        i.jsx(l0, {}),
        i.jsx(Jb, {
          chats: Y,
          onToggle: (_) => G((L) => L.map((U) => U.friend.id === _ ? {
            ...U,
            minimized: !U.minimized
          } : U)),
          onClose: (_) => G((L) => L.filter((U) => U.friend.id !== _)),
          onActivate: ce,
          onSend: (_, L) => void Ft.sendMessage(_, L).then((U) => G((Z) => Z.map((te) => te.friend.id === _ ? {
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
        c && i.jsx(u0, {})
      ]
    });
  }
  function Im(c) {
    var _a2;
    const o = c.trim().split(/\s+/);
    return (o.length > 1 ? `${o[0][0]}${(_a2 = o.at(-1)) == null ? void 0 : _a2[0]}` : c.slice(0, 2)).toUpperCase();
  }
  function c0({ locked: c }) {
    const [o, f] = z.useState(null);
    return z.useEffect(() => {
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
  function u0() {
    const [c, o] = z.useState(null), [f, r] = z.useState(null);
    return z.useEffect(() => {
      var _a2, _b2;
      document.documentElement.classList.add("mouse-test-hud-active"), document.body.classList.add("mouse-test-hud-active");
      const m = (_a2 = window.electronApi) == null ? void 0 : _a2.onMouseTestPointer(o), y = (_b2 = window.electronApi) == null ? void 0 : _b2.onMouseTestCoordinatesCopied((j) => {
        r(j), window.setTimeout(() => r(null), 1600);
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
  Ig.createRoot(document.getElementById("root")).render(i.jsx(z.StrictMode, {
    children: i.jsx(xv, {
      children: i.jsx(s0, {})
    })
  }));
})();
