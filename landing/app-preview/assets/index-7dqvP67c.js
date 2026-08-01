var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(async () => {
  var _a;
  (function() {
    const u = document.createElement("link").relList;
    if (u && u.supports && u.supports("modulepreload")) return;
    for (const m of document.querySelectorAll('link[rel="modulepreload"]')) r(m);
    new MutationObserver((m) => {
      for (const h of m) if (h.type === "childList") for (const x of h.addedNodes) x.tagName === "LINK" && x.rel === "modulepreload" && r(x);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function f(m) {
      const h = {};
      return m.integrity && (h.integrity = m.integrity), m.referrerPolicy && (h.referrerPolicy = m.referrerPolicy), m.crossOrigin === "use-credentials" ? h.credentials = "include" : m.crossOrigin === "anonymous" ? h.credentials = "omit" : h.credentials = "same-origin", h;
    }
    function r(m) {
      if (m.ep) return;
      m.ep = true;
      const h = f(m);
      fetch(m.href, h);
    }
  })();
  var Fo = {
    exports: {}
  }, ui = {};
  var xm;
  function Vg() {
    if (xm) return ui;
    xm = 1;
    var c = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
    function f(r, m, h) {
      var x = null;
      if (h !== void 0 && (x = "" + h), m.key !== void 0 && (x = "" + m.key), "key" in m) {
        h = {};
        for (var E in m) E !== "key" && (h[E] = m[E]);
      } else h = m;
      return m = h.ref, {
        $$typeof: c,
        type: r,
        key: x,
        ref: m !== void 0 ? m : null,
        props: h
      };
    }
    return ui.Fragment = u, ui.jsx = f, ui.jsxs = f, ui;
  }
  var Mm;
  function Zg() {
    return Mm || (Mm = 1, Fo.exports = Vg()), Fo.exports;
  }
  var i = Zg(), $o = {
    exports: {}
  }, ve = {};
  var jm;
  function Kg() {
    if (jm) return ve;
    jm = 1;
    var c = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), x = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), V = Symbol.iterator;
    function H(v) {
      return v === null || typeof v != "object" ? null : (v = V && v[V] || v["@@iterator"], typeof v == "function" ? v : null);
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
    }, $ = Object.assign, F = {};
    function le(v, G, I) {
      this.props = v, this.context = G, this.refs = F, this.updater = I || p;
    }
    le.prototype.isReactComponent = {}, le.prototype.setState = function(v, G) {
      if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, v, G, "setState");
    }, le.prototype.forceUpdate = function(v) {
      this.updater.enqueueForceUpdate(this, v, "forceUpdate");
    };
    function fe() {
    }
    fe.prototype = le.prototype;
    function se(v, G, I) {
      this.props = v, this.context = G, this.refs = F, this.updater = I || p;
    }
    var he = se.prototype = new fe();
    he.constructor = se, $(he, le.prototype), he.isPureReactComponent = true;
    var K = Array.isArray;
    function ae() {
    }
    var _ = {
      H: null,
      A: null,
      T: null,
      S: null
    }, L = Object.prototype.hasOwnProperty;
    function O(v, G, I) {
      var te = I.ref;
      return {
        $$typeof: c,
        type: v,
        key: G,
        ref: te !== void 0 ? te : null,
        props: I
      };
    }
    function J(v, G) {
      return O(v.type, G, v.props);
    }
    function ee(v) {
      return typeof v == "object" && v !== null && v.$$typeof === c;
    }
    function be(v) {
      var G = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + v.replace(/[=:]/g, function(I) {
        return G[I];
      });
    }
    var De = /\/+/g;
    function Te(v, G) {
      return typeof v == "object" && v !== null && v.key != null ? be("" + v.key) : G.toString(36);
    }
    function at(v) {
      switch (v.status) {
        case "fulfilled":
          return v.value;
        case "rejected":
          throw v.reason;
        default:
          switch (typeof v.status == "string" ? v.then(ae, ae) : (v.status = "pending", v.then(function(G) {
            v.status === "pending" && (v.status = "fulfilled", v.value = G);
          }, function(G) {
            v.status === "pending" && (v.status = "rejected", v.reason = G);
          })), v.status) {
            case "fulfilled":
              return v.value;
            case "rejected":
              throw v.reason;
          }
      }
      throw v;
    }
    function S(v, G, I, te, ge) {
      var we = typeof v;
      (we === "undefined" || we === "boolean") && (v = null);
      var ze = false;
      if (v === null) ze = true;
      else switch (we) {
        case "bigint":
        case "string":
        case "number":
          ze = true;
          break;
        case "object":
          switch (v.$$typeof) {
            case c:
            case u:
              ze = true;
              break;
            case w:
              return ze = v._init, S(ze(v._payload), G, I, te, ge);
          }
      }
      if (ze) return ge = ge(v), ze = te === "" ? "." + Te(v, 0) : te, K(ge) ? (I = "", ze != null && (I = ze.replace(De, "$&/") + "/"), S(ge, G, I, "", function(wt) {
        return wt;
      })) : ge != null && (ee(ge) && (ge = J(ge, I + (ge.key == null || v && v.key === ge.key ? "" : ("" + ge.key).replace(De, "$&/") + "/") + ze)), G.push(ge)), 1;
      ze = 0;
      var ot = te === "" ? "." : te + ":";
      if (K(v)) for (var Ve = 0; Ve < v.length; Ve++) te = v[Ve], we = ot + Te(te, Ve), ze += S(te, G, I, we, ge);
      else if (Ve = H(v), typeof Ve == "function") for (v = Ve.call(v), Ve = 0; !(te = v.next()).done; ) te = te.value, we = ot + Te(te, Ve++), ze += S(te, G, I, we, ge);
      else if (we === "object") {
        if (typeof v.then == "function") return S(at(v), G, I, te, ge);
        throw G = String(v), Error("Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead.");
      }
      return ze;
    }
    function z(v, G, I) {
      if (v == null) return v;
      var te = [], ge = 0;
      return S(v, te, "", "", function(we) {
        return G.call(I, we, ge++);
      }), te;
    }
    function W(v) {
      if (v._status === -1) {
        var G = v._result;
        G = G(), G.then(function(I) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = I);
        }, function(I) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = I);
        }), v._status === -1 && (v._status = 0, v._result = G);
      }
      if (v._status === 1) return v._result.default;
      throw v._result;
    }
    var de = typeof reportError == "function" ? reportError : function(v) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var G = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
          error: v
        });
        if (!window.dispatchEvent(G)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", v);
        return;
      }
      console.error(v);
    }, pe = {
      map: z,
      forEach: function(v, G, I) {
        z(v, function() {
          G.apply(this, arguments);
        }, I);
      },
      count: function(v) {
        var G = 0;
        return z(v, function() {
          G++;
        }), G;
      },
      toArray: function(v) {
        return z(v, function(G) {
          return G;
        }) || [];
      },
      only: function(v) {
        if (!ee(v)) throw Error("React.Children.only expected to receive a single React element child.");
        return v;
      }
    };
    return ve.Activity = B, ve.Children = pe, ve.Component = le, ve.Fragment = f, ve.Profiler = m, ve.PureComponent = se, ve.StrictMode = r, ve.Suspense = j, ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _, ve.__COMPILER_RUNTIME = {
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
    }, ve.cloneElement = function(v, G, I) {
      if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
      var te = $({}, v.props), ge = v.key;
      if (G != null) for (we in G.key !== void 0 && (ge = "" + G.key), G) !L.call(G, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && G.ref === void 0 || (te[we] = G[we]);
      var we = arguments.length - 2;
      if (we === 1) te.children = I;
      else if (1 < we) {
        for (var ze = Array(we), ot = 0; ot < we; ot++) ze[ot] = arguments[ot + 2];
        te.children = ze;
      }
      return O(v.type, ge, te);
    }, ve.createContext = function(v) {
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
    }, ve.createElement = function(v, G, I) {
      var te, ge = {}, we = null;
      if (G != null) for (te in G.key !== void 0 && (we = "" + G.key), G) L.call(G, te) && te !== "key" && te !== "__self" && te !== "__source" && (ge[te] = G[te]);
      var ze = arguments.length - 2;
      if (ze === 1) ge.children = I;
      else if (1 < ze) {
        for (var ot = Array(ze), Ve = 0; Ve < ze; Ve++) ot[Ve] = arguments[Ve + 2];
        ge.children = ot;
      }
      if (v && v.defaultProps) for (te in ze = v.defaultProps, ze) ge[te] === void 0 && (ge[te] = ze[te]);
      return O(v, we, ge);
    }, ve.createRef = function() {
      return {
        current: null
      };
    }, ve.forwardRef = function(v) {
      return {
        $$typeof: E,
        render: v
      };
    }, ve.isValidElement = ee, ve.lazy = function(v) {
      return {
        $$typeof: w,
        _payload: {
          _status: -1,
          _result: v
        },
        _init: W
      };
    }, ve.memo = function(v, G) {
      return {
        $$typeof: y,
        type: v,
        compare: G === void 0 ? null : G
      };
    }, ve.startTransition = function(v) {
      var G = _.T, I = {};
      _.T = I;
      try {
        var te = v(), ge = _.S;
        ge !== null && ge(I, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(ae, de);
      } catch (we) {
        de(we);
      } finally {
        G !== null && I.types !== null && (G.types = I.types), _.T = G;
      }
    }, ve.unstable_useCacheRefresh = function() {
      return _.H.useCacheRefresh();
    }, ve.use = function(v) {
      return _.H.use(v);
    }, ve.useActionState = function(v, G, I) {
      return _.H.useActionState(v, G, I);
    }, ve.useCallback = function(v, G) {
      return _.H.useCallback(v, G);
    }, ve.useContext = function(v) {
      return _.H.useContext(v);
    }, ve.useDebugValue = function() {
    }, ve.useDeferredValue = function(v, G) {
      return _.H.useDeferredValue(v, G);
    }, ve.useEffect = function(v, G) {
      return _.H.useEffect(v, G);
    }, ve.useEffectEvent = function(v) {
      return _.H.useEffectEvent(v);
    }, ve.useId = function() {
      return _.H.useId();
    }, ve.useImperativeHandle = function(v, G, I) {
      return _.H.useImperativeHandle(v, G, I);
    }, ve.useInsertionEffect = function(v, G) {
      return _.H.useInsertionEffect(v, G);
    }, ve.useLayoutEffect = function(v, G) {
      return _.H.useLayoutEffect(v, G);
    }, ve.useMemo = function(v, G) {
      return _.H.useMemo(v, G);
    }, ve.useOptimistic = function(v, G) {
      return _.H.useOptimistic(v, G);
    }, ve.useReducer = function(v, G, I) {
      return _.H.useReducer(v, G, I);
    }, ve.useRef = function(v) {
      return _.H.useRef(v);
    }, ve.useState = function(v) {
      return _.H.useState(v);
    }, ve.useSyncExternalStore = function(v, G, I) {
      return _.H.useSyncExternalStore(v, G, I);
    }, ve.useTransition = function() {
      return _.H.useTransition();
    }, ve.version = "19.2.7", ve;
  }
  var Am;
  function yu() {
    return Am || (Am = 1, $o.exports = Kg()), $o.exports;
  }
  var D = yu(), Io = {
    exports: {}
  }, ri = {}, Wo = {
    exports: {}
  }, Po = {};
  var Em;
  function Jg() {
    return Em || (Em = 1, (function(c) {
      function u(S, z) {
        var W = S.length;
        S.push(z);
        e: for (; 0 < W; ) {
          var de = W - 1 >>> 1, pe = S[de];
          if (0 < m(pe, z)) S[de] = z, S[W] = pe, W = de;
          else break e;
        }
      }
      function f(S) {
        return S.length === 0 ? null : S[0];
      }
      function r(S) {
        if (S.length === 0) return null;
        var z = S[0], W = S.pop();
        if (W !== z) {
          S[0] = W;
          e: for (var de = 0, pe = S.length, v = pe >>> 1; de < v; ) {
            var G = 2 * (de + 1) - 1, I = S[G], te = G + 1, ge = S[te];
            if (0 > m(I, W)) te < pe && 0 > m(ge, I) ? (S[de] = ge, S[te] = W, de = te) : (S[de] = I, S[G] = W, de = G);
            else if (te < pe && 0 > m(ge, W)) S[de] = ge, S[te] = W, de = te;
            else break e;
          }
        }
        return z;
      }
      function m(S, z) {
        var W = S.sortIndex - z.sortIndex;
        return W !== 0 ? W : S.id - z.id;
      }
      if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var h = performance;
        c.unstable_now = function() {
          return h.now();
        };
      } else {
        var x = Date, E = x.now();
        c.unstable_now = function() {
          return x.now() - E;
        };
      }
      var j = [], y = [], w = 1, B = null, V = 3, H = false, p = false, $ = false, F = false, le = typeof setTimeout == "function" ? setTimeout : null, fe = typeof clearTimeout == "function" ? clearTimeout : null, se = typeof setImmediate < "u" ? setImmediate : null;
      function he(S) {
        for (var z = f(y); z !== null; ) {
          if (z.callback === null) r(y);
          else if (z.startTime <= S) r(y), z.sortIndex = z.expirationTime, u(j, z);
          else break;
          z = f(y);
        }
      }
      function K(S) {
        if ($ = false, he(S), !p) if (f(j) !== null) p = true, ae || (ae = true, be());
        else {
          var z = f(y);
          z !== null && at(K, z.startTime - S);
        }
      }
      var ae = false, _ = -1, L = 5, O = -1;
      function J() {
        return F ? true : !(c.unstable_now() - O < L);
      }
      function ee() {
        if (F = false, ae) {
          var S = c.unstable_now();
          O = S;
          var z = true;
          try {
            e: {
              p = false, $ && ($ = false, fe(_), _ = -1), H = true;
              var W = V;
              try {
                t: {
                  for (he(S), B = f(j); B !== null && !(B.expirationTime > S && J()); ) {
                    var de = B.callback;
                    if (typeof de == "function") {
                      B.callback = null, V = B.priorityLevel;
                      var pe = de(B.expirationTime <= S);
                      if (S = c.unstable_now(), typeof pe == "function") {
                        B.callback = pe, he(S), z = true;
                        break t;
                      }
                      B === f(j) && r(j), he(S);
                    } else r(j);
                    B = f(j);
                  }
                  if (B !== null) z = true;
                  else {
                    var v = f(y);
                    v !== null && at(K, v.startTime - S), z = false;
                  }
                }
                break e;
              } finally {
                B = null, V = W, H = false;
              }
              z = void 0;
            }
          } finally {
            z ? be() : ae = false;
          }
        }
      }
      var be;
      if (typeof se == "function") be = function() {
        se(ee);
      };
      else if (typeof MessageChannel < "u") {
        var De = new MessageChannel(), Te = De.port2;
        De.port1.onmessage = ee, be = function() {
          Te.postMessage(null);
        };
      } else be = function() {
        le(ee, 0);
      };
      function at(S, z) {
        _ = le(function() {
          S(c.unstable_now());
        }, z);
      }
      c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(S) {
        S.callback = null;
      }, c.unstable_forceFrameRate = function(S) {
        0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < S ? Math.floor(1e3 / S) : 5;
      }, c.unstable_getCurrentPriorityLevel = function() {
        return V;
      }, c.unstable_next = function(S) {
        switch (V) {
          case 1:
          case 2:
          case 3:
            var z = 3;
            break;
          default:
            z = V;
        }
        var W = V;
        V = z;
        try {
          return S();
        } finally {
          V = W;
        }
      }, c.unstable_requestPaint = function() {
        F = true;
      }, c.unstable_runWithPriority = function(S, z) {
        switch (S) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            S = 3;
        }
        var W = V;
        V = S;
        try {
          return z();
        } finally {
          V = W;
        }
      }, c.unstable_scheduleCallback = function(S, z, W) {
        var de = c.unstable_now();
        switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? de + W : de) : W = de, S) {
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
        return pe = W + pe, S = {
          id: w++,
          callback: z,
          priorityLevel: S,
          startTime: W,
          expirationTime: pe,
          sortIndex: -1
        }, W > de ? (S.sortIndex = W, u(y, S), f(j) === null && S === f(y) && ($ ? (fe(_), _ = -1) : $ = true, at(K, W - de))) : (S.sortIndex = pe, u(j, S), p || H || (p = true, ae || (ae = true, be()))), S;
      }, c.unstable_shouldYield = J, c.unstable_wrapCallback = function(S) {
        var z = V;
        return function() {
          var W = V;
          V = z;
          try {
            return S.apply(this, arguments);
          } finally {
            V = W;
          }
        };
      };
    })(Po)), Po;
  }
  var Cm;
  function Fg() {
    return Cm || (Cm = 1, Wo.exports = Jg()), Wo.exports;
  }
  var eu = {
    exports: {}
  }, vt = {};
  var Nm;
  function $g() {
    if (Nm) return vt;
    Nm = 1;
    var c = yu();
    function u(j) {
      var y = "https://react.dev/errors/" + j;
      if (1 < arguments.length) {
        y += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var w = 2; w < arguments.length; w++) y += "&args[]=" + encodeURIComponent(arguments[w]);
      }
      return "Minified React error #" + j + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function f() {
    }
    var r = {
      d: {
        f,
        r: function() {
          throw Error(u(522));
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
    function h(j, y, w) {
      var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: m,
        key: B == null ? null : "" + B,
        children: j,
        containerInfo: y,
        implementation: w
      };
    }
    var x = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function E(j, y) {
      if (j === "font") return "";
      if (typeof y == "string") return y === "use-credentials" ? y : "";
    }
    return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, vt.createPortal = function(j, y) {
      var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(u(299));
      return h(j, y, null, w);
    }, vt.flushSync = function(j) {
      var y = x.T, w = r.p;
      try {
        if (x.T = null, r.p = 2, j) return j();
      } finally {
        x.T = y, r.p = w, r.d.f();
      }
    }, vt.preconnect = function(j, y) {
      typeof j == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, r.d.C(j, y));
    }, vt.prefetchDNS = function(j) {
      typeof j == "string" && r.d.D(j);
    }, vt.preinit = function(j, y) {
      if (typeof j == "string" && y && typeof y.as == "string") {
        var w = y.as, B = E(w, y.crossOrigin), V = typeof y.integrity == "string" ? y.integrity : void 0, H = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        w === "style" ? r.d.S(j, typeof y.precedence == "string" ? y.precedence : void 0, {
          crossOrigin: B,
          integrity: V,
          fetchPriority: H
        }) : w === "script" && r.d.X(j, {
          crossOrigin: B,
          integrity: V,
          fetchPriority: H,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0
        });
      }
    }, vt.preinitModule = function(j, y) {
      if (typeof j == "string") if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var w = E(y.as, y.crossOrigin);
          r.d.M(j, {
            crossOrigin: w,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && r.d.M(j);
    }, vt.preload = function(j, y) {
      if (typeof j == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
        var w = y.as, B = E(w, y.crossOrigin);
        r.d.L(j, w, {
          crossOrigin: B,
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
    }, vt.preloadModule = function(j, y) {
      if (typeof j == "string") if (y) {
        var w = E(y.as, y.crossOrigin);
        r.d.m(j, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: w,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else r.d.m(j);
    }, vt.requestFormReset = function(j) {
      r.d.r(j);
    }, vt.unstable_batchedUpdates = function(j, y) {
      return j(y);
    }, vt.useFormState = function(j, y, w) {
      return x.H.useFormState(j, y, w);
    }, vt.useFormStatus = function() {
      return x.H.useHostTransitionStatus();
    }, vt.version = "19.2.7", vt;
  }
  var Rm;
  function Ig() {
    if (Rm) return eu.exports;
    Rm = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (u) {
        console.error(u);
      }
    }
    return c(), eu.exports = $g(), eu.exports;
  }
  var Tm;
  function Wg() {
    if (Tm) return ri;
    Tm = 1;
    var c = Fg(), u = yu(), f = Ig();
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
    function E(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function j(e) {
      if (h(e) !== e) throw Error(r(188));
    }
    function y(e) {
      var t = e.alternate;
      if (!t) {
        if (t = h(e), t === null) throw Error(r(188));
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
            if (s === a) return j(l), e;
            if (s === n) return j(l), t;
            s = s.sibling;
          }
          throw Error(r(188));
        }
        if (a.return !== n.return) a = l, n = s;
        else {
          for (var o = false, d = l.child; d; ) {
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
          if (!o) {
            for (d = s.child; d; ) {
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
            if (!o) throw Error(r(189));
          }
        }
        if (a.alternate !== n) throw Error(r(190));
      }
      if (a.tag !== 3) throw Error(r(188));
      return a.stateNode.current === a ? e : t;
    }
    function w(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = w(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var B = Object.assign, V = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), p = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), fe = Symbol.for("react.consumer"), se = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), ee = Symbol.iterator;
    function be(e) {
      return e === null || typeof e != "object" ? null : (e = ee && e[ee] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var De = Symbol.for("react.client.reference");
    function Te(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === De ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case $:
          return "Fragment";
        case le:
          return "Profiler";
        case F:
          return "StrictMode";
        case K:
          return "Suspense";
        case ae:
          return "SuspenseList";
        case O:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case p:
          return "Portal";
        case se:
          return e.displayName || "Context";
        case fe:
          return (e._context.displayName || "Context") + ".Consumer";
        case he:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _:
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
    var at = Array.isArray, S = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, de = [], pe = -1;
    function v(e) {
      return {
        current: e
      };
    }
    function G(e) {
      0 > pe || (e.current = de[pe], de[pe] = null, pe--);
    }
    function I(e, t) {
      pe++, de[pe] = e.current, e.current = t;
    }
    var te = v(null), ge = v(null), we = v(null), ze = v(null);
    function ot(e, t) {
      switch (I(we, t), I(ge, e), I(te, null), t.nodeType) {
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
      G(te), I(te, e);
    }
    function Ve() {
      G(te), G(ge), G(we);
    }
    function wt(e) {
      e.memoizedState !== null && I(ze, e);
      var t = te.current, a = Zf(t, e.type);
      t !== a && (I(ge, e), I(te, a));
    }
    function ua(e) {
      ge.current === e && (G(te), G(ge)), ze.current === e && (G(ze), ii._currentValue = W);
    }
    var ra, za;
    function Ht(e) {
      if (ra === void 0) try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ra = t && t[1] || "", za = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + ra + e + za;
    }
    var sn = false;
    function cn(e, t) {
      if (!e || sn) return "";
      sn = true;
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
                    var T = U;
                  }
                  Reflect.construct(e, [], Q);
                } else {
                  try {
                    Q.call();
                  } catch (U) {
                    T = U;
                  }
                  e.call(Q.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (U) {
                  T = U;
                }
                (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
                });
              }
            } catch (U) {
              if (U && T && typeof U.stack == "string") return [
                U.stack,
                T.stack
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
        var s = n.DetermineComponentFrameRoot(), o = s[0], d = s[1];
        if (o && d) {
          var g = o.split(`
`), N = d.split(`
`);
          for (l = n = 0; n < g.length && !g[n].includes("DetermineComponentFrameRoot"); ) n++;
          for (; l < N.length && !N[l].includes("DetermineComponentFrameRoot"); ) l++;
          if (n === g.length || l === N.length) for (n = g.length - 1, l = N.length - 1; 1 <= n && 0 <= l && g[n] !== N[l]; ) l--;
          for (; 1 <= n && 0 <= l; n--, l--) if (g[n] !== N[l]) {
            if (n !== 1 || l !== 1) do
              if (n--, l--, 0 > l || g[n] !== N[l]) {
                var k = `
` + g[n].replace(" at new ", " at ");
                return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
              }
            while (1 <= n && 0 <= l);
            break;
          }
        }
      } finally {
        sn = false, Error.prepareStackTrace = a;
      }
      return (a = e ? e.displayName || e.name : "") ? Ht(a) : "";
    }
    function q(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Ht(e.type);
        case 16:
          return Ht("Lazy");
        case 13:
          return e.child !== t && t !== null ? Ht("Suspense Fallback") : Ht("Suspense");
        case 19:
          return Ht("SuspenseList");
        case 0:
        case 15:
          return cn(e.type, false);
        case 11:
          return cn(e.type.render, false);
        case 1:
          return cn(e.type, true);
        case 31:
          return Ht("Activity");
        default:
          return "";
      }
    }
    function ue(e) {
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
    var ye = Object.prototype.hasOwnProperty, A = c.unstable_scheduleCallback, R = c.unstable_cancelCallback, Z = c.unstable_shouldYield, ne = c.unstable_requestPaint, X = c.unstable_now, P = c.unstable_getCurrentPriorityLevel, oe = c.unstable_ImmediatePriority, ke = c.unstable_UserBlockingPriority, nt = c.unstable_NormalPriority, $e = c.unstable_LowPriority, Gt = c.unstable_IdlePriority, on = c.log, Nh = c.unstable_setDisableYieldValue, yl = null, Tt = null;
    function _a2(e) {
      if (typeof on == "function" && Nh(e), Tt && typeof Tt.setStrictMode == "function") try {
        Tt.setStrictMode(yl, e);
      } catch {
      }
    }
    var zt = Math.clz32 ? Math.clz32 : zh, Rh = Math.log, Th = Math.LN2;
    function zh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Rh(e) / Th | 0) | 0;
    }
    var hi = 256, pi = 262144, gi = 4194304;
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
    function yi(e, t, a) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var l = 0, s = e.suspendedLanes, o = e.pingedLanes;
      e = e.warmLanes;
      var d = n & 134217727;
      return d !== 0 ? (n = d & ~s, n !== 0 ? l = un(n) : (o &= d, o !== 0 ? l = un(o) : a || (a = d & ~e, a !== 0 && (l = un(a))))) : (d = n & ~s, d !== 0 ? l = un(d) : o !== 0 ? l = un(o) : a || (a = n & ~e, a !== 0 && (l = un(a)))), l === 0 ? 0 : t !== 0 && t !== l && (t & s) === 0 && (s = l & -l, a = t & -t, s >= a || s === 32 && (a & 4194048) !== 0) ? t : l;
    }
    function vl(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function _h(e, t) {
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
    function Au() {
      var e = gi;
      return gi <<= 1, (gi & 62914560) === 0 && (gi = 4194304), e;
    }
    function Ls(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function bl(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Dh(e, t, a, n, l, s) {
      var o = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var d = e.entanglements, g = e.expirationTimes, N = e.hiddenUpdates;
      for (a = o & ~a; 0 < a; ) {
        var k = 31 - zt(a), Q = 1 << k;
        d[k] = 0, g[k] = -1;
        var T = N[k];
        if (T !== null) for (N[k] = null, k = 0; k < T.length; k++) {
          var U = T[k];
          U !== null && (U.lane &= -536870913);
        }
        a &= ~Q;
      }
      n !== 0 && Eu(e, n, 0), s !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(o & ~t));
    }
    function Eu(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var n = 31 - zt(t);
      e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | a & 261930;
    }
    function Cu(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var n = 31 - zt(a), l = 1 << n;
        l & t | e[n] & t && (e[n] |= t), a &= ~l;
      }
    }
    function Nu(e, t) {
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
    function Ru() {
      var e = z.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : pm(e.type));
    }
    function Tu(e, t) {
      var a = z.p;
      try {
        return z.p = e, t();
      } finally {
        z.p = a;
      }
    }
    var Da = Math.random().toString(36).slice(2), mt = "__reactFiber$" + Da, xt = "__reactProps$" + Da, zn = "__reactContainer$" + Da, Bs = "__reactEvents$" + Da, Uh = "__reactListeners$" + Da, Oh = "__reactHandles$" + Da, zu = "__reactResources$" + Da, Sl = "__reactMarker$" + Da;
    function Hs(e) {
      delete e[mt], delete e[xt], delete e[Bs], delete e[Uh], delete e[Oh];
    }
    function _n(e) {
      var t = e[mt];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[zn] || a[mt]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (e = Pf(e); e !== null; ) {
            if (a = e[mt]) return a;
            e = Pf(e);
          }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Dn(e) {
      if (e = e[mt] || e[zn]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function wl(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(r(33));
    }
    function Un(e) {
      var t = e[zu];
      return t || (t = e[zu] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function rt(e) {
      e[Sl] = true;
    }
    var _u = /* @__PURE__ */ new Set(), Du = {};
    function rn(e, t) {
      On(e, t), On(e + "Capture", t);
    }
    function On(e, t) {
      for (Du[e] = t, e = 0; e < t.length; e++) _u.add(t[e]);
    }
    var Lh = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Uu = {}, Ou = {};
    function kh(e) {
      return ye.call(Ou, e) ? true : ye.call(Uu, e) ? false : Lh.test(e) ? Ou[e] = true : (Uu[e] = true, false);
    }
    function vi(e, t, a) {
      if (kh(t)) if (a === null) e.removeAttribute(t);
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
    function bi(e, t, a) {
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
    function da(e, t, a, n) {
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
    function Yt(e) {
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
    function Lu(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function qh(e, t, a) {
      var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get, s = n.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return l.call(this);
          },
          set: function(o) {
            a = "" + o, s.call(this, o);
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
    function Gs(e) {
      if (!e._valueTracker) {
        var t = Lu(e) ? "checked" : "value";
        e._valueTracker = qh(e, t, "" + e[t]);
      }
    }
    function ku(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var a = t.getValue(), n = "";
      return e && (n = Lu(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== a ? (t.setValue(e), true) : false;
    }
    function Si(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Bh = /[\n"\\]/g;
    function Qt(e) {
      return e.replace(Bh, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Ys(e, t, a, n, l, s, o, d) {
      e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t != null ? o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Yt(t)) : e.value !== "" + Yt(t) && (e.value = "" + Yt(t)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), t != null ? Qs(e, o, Yt(t)) : a != null ? Qs(e, o, Yt(a)) : n != null && e.removeAttribute("value"), l == null && s != null && (e.defaultChecked = !!s), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Yt(d) : e.removeAttribute("name");
    }
    function qu(e, t, a, n, l, s, o, d) {
      if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || a != null) {
        if (!(s !== "submit" && s !== "reset" || t != null)) {
          Gs(e);
          return;
        }
        a = a != null ? "" + Yt(a) : "", t = t != null ? "" + Yt(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = n ?? l, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = d ? e.checked : !!n, e.defaultChecked = !!n, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Gs(e);
    }
    function Qs(e, t, a) {
      t === "number" && Si(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function Ln(e, t, a, n) {
      if (e = e.options, t) {
        t = {};
        for (var l = 0; l < a.length; l++) t["$" + a[l]] = true;
        for (a = 0; a < e.length; a++) l = t.hasOwnProperty("$" + e[a].value), e[a].selected !== l && (e[a].selected = l), l && n && (e[a].defaultSelected = true);
      } else {
        for (a = "" + Yt(a), t = null, l = 0; l < e.length; l++) {
          if (e[l].value === a) {
            e[l].selected = true, n && (e[l].defaultSelected = true);
            return;
          }
          t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = true);
      }
    }
    function Bu(e, t, a) {
      if (t != null && (t = "" + Yt(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Yt(a) : "";
    }
    function Hu(e, t, a, n) {
      if (t == null) {
        if (n != null) {
          if (a != null) throw Error(r(92));
          if (at(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          a = n;
        }
        a == null && (a = ""), t = a;
      }
      a = Yt(t), e.defaultValue = a, n = e.textContent, n === a && n !== "" && n !== null && (e.value = n), Gs(e);
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
    var Hh = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Gu(e, t, a) {
      var n = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Hh.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
    }
    function Yu(e, t, a) {
      if (t != null && typeof t != "object") throw Error(r(62));
      if (e = e.style, a != null) {
        for (var n in a) !a.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
        for (var l in t) n = t[l], t.hasOwnProperty(l) && a[l] !== n && Gu(e, l, n);
      } else for (var s in t) t.hasOwnProperty(s) && Gu(e, s, t[s]);
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
    var Gh = /* @__PURE__ */ new Map([
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
    ]), Yh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function wi(e) {
      return Yh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function fa() {
    }
    var Vs = null;
    function Zs(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var qn = null, Bn = null;
    function Qu(e) {
      var t = Dn(e);
      if (t && (e = t.stateNode)) {
        var a = e[xt] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Ys(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Qt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
                var n = a[t];
                if (n !== e && n.form === e.form) {
                  var l = n[xt] || null;
                  if (!l) throw Error(r(90));
                  Ys(n, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name);
                }
              }
              for (t = 0; t < a.length; t++) n = a[t], n.form === e.form && ku(n);
            }
            break e;
          case "textarea":
            Bu(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Ln(e, !!a.multiple, t, false);
        }
      }
    }
    var Ks = false;
    function Xu(e, t, a) {
      if (Ks) return e(t, a);
      Ks = true;
      try {
        var n = e(t);
        return n;
      } finally {
        if (Ks = false, (qn !== null || Bn !== null) && (os(), qn && (t = qn, e = Bn, Bn = qn = null, Qu(t), e))) for (t = 0; t < e.length; t++) Qu(e[t]);
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
    var ma = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Js = false;
    if (ma) try {
      var Ml = {};
      Object.defineProperty(Ml, "passive", {
        get: function() {
          Js = true;
        }
      }), window.addEventListener("test", Ml, Ml), window.removeEventListener("test", Ml, Ml);
    } catch {
      Js = false;
    }
    var Ua = null, Fs = null, xi = null;
    function Vu() {
      if (xi) return xi;
      var e, t = Fs, a = t.length, n, l = "value" in Ua ? Ua.value : Ua.textContent, s = l.length;
      for (e = 0; e < a && t[e] === l[e]; e++) ;
      var o = a - e;
      for (n = 1; n <= o && t[a - n] === l[s - n]; n++) ;
      return xi = l.slice(e, 1 < n ? 1 - n : void 0);
    }
    function Mi(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function ji() {
      return true;
    }
    function Zu() {
      return false;
    }
    function Mt(e) {
      function t(a, n, l, s, o) {
        this._reactName = a, this._targetInst = l, this.type = n, this.nativeEvent = s, this.target = o, this.currentTarget = null;
        for (var d in e) e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(s) : s[d]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === false) ? ji : Zu, this.isPropagationStopped = Zu, this;
      }
      return B(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = false), this.isDefaultPrevented = ji);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = true), this.isPropagationStopped = ji);
        },
        persist: function() {
        },
        isPersistent: ji
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
    }, Ai = Mt(dn), jl = B({}, dn, {
      view: 0,
      detail: 0
    }), Qh = Mt(jl), $s, Is, Al, Ei = B({}, jl, {
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
        return "movementX" in e ? e.movementX : (e !== Al && (Al && e.type === "mousemove" ? ($s = e.screenX - Al.screenX, Is = e.screenY - Al.screenY) : Is = $s = 0, Al = e), $s);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Is;
      }
    }), Ku = Mt(Ei), Xh = B({}, Ei, {
      dataTransfer: 0
    }), Vh = Mt(Xh), Zh = B({}, jl, {
      relatedTarget: 0
    }), Ws = Mt(Zh), Kh = B({}, dn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Jh = Mt(Kh), Fh = B({}, dn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), $h = Mt(Fh), Ih = B({}, dn, {
      data: 0
    }), Ju = Mt(Ih), Wh = {
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
    }, Ph = {
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
    }, ep = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function tp(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = ep[e]) ? !!t[e] : false;
    }
    function Ps() {
      return tp;
    }
    var ap = B({}, jl, {
      key: function(e) {
        if (e.key) {
          var t = Wh[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Mi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ph[e.keyCode] || "Unidentified" : "";
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
        return e.type === "keypress" ? Mi(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Mi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), np = Mt(ap), lp = B({}, Ei, {
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
    }), Fu = Mt(lp), ip = B({}, jl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ps
    }), sp = Mt(ip), cp = B({}, dn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), op = Mt(cp), up = B({}, Ei, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), rp = Mt(up), dp = B({}, dn, {
      newState: 0,
      oldState: 0
    }), fp = Mt(dp), mp = [
      9,
      13,
      27,
      32
    ], ec = ma && "CompositionEvent" in window, El = null;
    ma && "documentMode" in document && (El = document.documentMode);
    var hp = ma && "TextEvent" in window && !El, $u = ma && (!ec || El && 8 < El && 11 >= El), Iu = " ", Wu = false;
    function Pu(e, t) {
      switch (e) {
        case "keyup":
          return mp.indexOf(t.keyCode) !== -1;
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
    function er(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var Hn = false;
    function pp(e, t) {
      switch (e) {
        case "compositionend":
          return er(t);
        case "keypress":
          return t.which !== 32 ? null : (Wu = true, Iu);
        case "textInput":
          return e = t.data, e === Iu && Wu ? null : e;
        default:
          return null;
      }
    }
    function gp(e, t) {
      if (Hn) return e === "compositionend" || !ec && Pu(e, t) ? (e = Vu(), xi = Fs = Ua = null, Hn = false, e) : null;
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
          return $u && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var yp = {
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
    function tr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!yp[e.type] : t === "textarea";
    }
    function ar(e, t, a, n) {
      qn ? Bn ? Bn.push(n) : Bn = [
        n
      ] : qn = n, t = ps(t, "onChange"), 0 < t.length && (a = new Ai("onChange", "change", null, a, n), e.push({
        event: a,
        listeners: t
      }));
    }
    var Cl = null, Nl = null;
    function vp(e) {
      Bf(e, 0);
    }
    function Ci(e) {
      var t = wl(e);
      if (ku(t)) return e;
    }
    function nr(e, t) {
      if (e === "change") return t;
    }
    var lr = false;
    if (ma) {
      var tc;
      if (ma) {
        var ac = "oninput" in document;
        if (!ac) {
          var ir = document.createElement("div");
          ir.setAttribute("oninput", "return;"), ac = typeof ir.oninput == "function";
        }
        tc = ac;
      } else tc = false;
      lr = tc && (!document.documentMode || 9 < document.documentMode);
    }
    function sr() {
      Cl && (Cl.detachEvent("onpropertychange", cr), Nl = Cl = null);
    }
    function cr(e) {
      if (e.propertyName === "value" && Ci(Nl)) {
        var t = [];
        ar(t, Nl, e, Zs(e)), Xu(vp, t);
      }
    }
    function bp(e, t, a) {
      e === "focusin" ? (sr(), Cl = t, Nl = a, Cl.attachEvent("onpropertychange", cr)) : e === "focusout" && sr();
    }
    function Sp(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ci(Nl);
    }
    function wp(e, t) {
      if (e === "click") return Ci(t);
    }
    function xp(e, t) {
      if (e === "input" || e === "change") return Ci(t);
    }
    function Mp(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var _t = typeof Object.is == "function" ? Object.is : Mp;
    function Rl(e, t) {
      if (_t(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var a = Object.keys(e), n = Object.keys(t);
      if (a.length !== n.length) return false;
      for (n = 0; n < a.length; n++) {
        var l = a[n];
        if (!ye.call(t, l) || !_t(e[l], t[l])) return false;
      }
      return true;
    }
    function or(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ur(e, t) {
      var a = or(e);
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
        a = or(a);
      }
    }
    function rr(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? rr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function dr(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = Si(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = false;
        }
        if (a) e = t.contentWindow;
        else break;
        t = Si(e.document);
      }
      return t;
    }
    function nc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var jp = ma && "documentMode" in document && 11 >= document.documentMode, Gn = null, lc = null, Tl = null, ic = false;
    function fr(e, t, a) {
      var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      ic || Gn == null || Gn !== Si(n) || (n = Gn, "selectionStart" in n && nc(n) ? n = {
        start: n.selectionStart,
        end: n.selectionEnd
      } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      }), Tl && Rl(Tl, n) || (Tl = n, n = ps(lc, "onSelect"), 0 < n.length && (t = new Ai("onSelect", "select", null, t, a), e.push({
        event: t,
        listeners: n
      }), t.target = Gn)));
    }
    function fn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Yn = {
      animationend: fn("Animation", "AnimationEnd"),
      animationiteration: fn("Animation", "AnimationIteration"),
      animationstart: fn("Animation", "AnimationStart"),
      transitionrun: fn("Transition", "TransitionRun"),
      transitionstart: fn("Transition", "TransitionStart"),
      transitioncancel: fn("Transition", "TransitionCancel"),
      transitionend: fn("Transition", "TransitionEnd")
    }, sc = {}, mr = {};
    ma && (mr = document.createElement("div").style, "AnimationEvent" in window || (delete Yn.animationend.animation, delete Yn.animationiteration.animation, delete Yn.animationstart.animation), "TransitionEvent" in window || delete Yn.transitionend.transition);
    function mn(e) {
      if (sc[e]) return sc[e];
      if (!Yn[e]) return e;
      var t = Yn[e], a;
      for (a in t) if (t.hasOwnProperty(a) && a in mr) return sc[e] = t[a];
      return e;
    }
    var hr = mn("animationend"), pr = mn("animationiteration"), gr = mn("animationstart"), Ap = mn("transitionrun"), Ep = mn("transitionstart"), Cp = mn("transitioncancel"), yr = mn("transitionend"), vr = /* @__PURE__ */ new Map(), cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    cc.push("scrollEnd");
    function ea(e, t) {
      vr.set(e, t), rn(t, [
        e
      ]);
    }
    var Ni = typeof reportError == "function" ? reportError : function(e) {
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
    }, Xt = [], Qn = 0, oc = 0;
    function Ri() {
      for (var e = Qn, t = oc = Qn = 0; t < e; ) {
        var a = Xt[t];
        Xt[t++] = null;
        var n = Xt[t];
        Xt[t++] = null;
        var l = Xt[t];
        Xt[t++] = null;
        var s = Xt[t];
        if (Xt[t++] = null, n !== null && l !== null) {
          var o = n.pending;
          o === null ? l.next = l : (l.next = o.next, o.next = l), n.pending = l;
        }
        s !== 0 && br(a, l, s);
      }
    }
    function Ti(e, t, a, n) {
      Xt[Qn++] = e, Xt[Qn++] = t, Xt[Qn++] = a, Xt[Qn++] = n, oc |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
    }
    function uc(e, t, a, n) {
      return Ti(e, t, a, n), zi(e);
    }
    function hn(e, t) {
      return Ti(e, null, null, t), zi(e);
    }
    function br(e, t, a) {
      e.lanes |= a;
      var n = e.alternate;
      n !== null && (n.lanes |= a);
      for (var l = false, s = e.return; s !== null; ) s.childLanes |= a, n = s.alternate, n !== null && (n.childLanes |= a), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (l = true)), e = s, s = s.return;
      return e.tag === 3 ? (s = e.stateNode, l && t !== null && (l = 31 - zt(a), e = s.hiddenUpdates, n = e[l], n === null ? e[l] = [
        t
      ] : n.push(t), t.lane = a | 536870912), s) : null;
    }
    function zi(e) {
      if (50 < Wl) throw Wl = 0, bo = null, Error(r(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var Xn = {};
    function Np(e, t, a, n) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Dt(e, t, a, n) {
      return new Np(e, t, a, n);
    }
    function rc(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function ha(e, t) {
      var a = e.alternate;
      return a === null ? (a = Dt(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
    }
    function Sr(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function _i(e, t, a, n, l, s) {
      var o = 0;
      if (n = e, typeof e == "function") rc(e) && (o = 1);
      else if (typeof e == "string") o = Dg(e, a, te.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case O:
          return e = Dt(31, a, t, l), e.elementType = O, e.lanes = s, e;
        case $:
          return pn(a.children, l, s, t);
        case F:
          o = 8, l |= 24;
          break;
        case le:
          return e = Dt(12, a, t, l | 2), e.elementType = le, e.lanes = s, e;
        case K:
          return e = Dt(13, a, t, l), e.elementType = K, e.lanes = s, e;
        case ae:
          return e = Dt(19, a, t, l), e.elementType = ae, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case se:
              o = 10;
              break e;
            case fe:
              o = 9;
              break e;
            case he:
              o = 11;
              break e;
            case _:
              o = 14;
              break e;
            case L:
              o = 16, n = null;
              break e;
          }
          o = 29, a = Error(r(130, e === null ? "null" : typeof e, "")), n = null;
      }
      return t = Dt(o, a, t, l), t.elementType = e, t.type = n, t.lanes = s, t;
    }
    function pn(e, t, a, n) {
      return e = Dt(7, e, n, t), e.lanes = a, e;
    }
    function dc(e, t, a) {
      return e = Dt(6, e, null, t), e.lanes = a, e;
    }
    function wr(e) {
      var t = Dt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function fc(e, t, a) {
      return t = Dt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var xr = /* @__PURE__ */ new WeakMap();
    function Vt(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = xr.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: ue(t)
        }, xr.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: ue(t)
      };
    }
    var Vn = [], Zn = 0, Di = null, zl = 0, Zt = [], Kt = 0, Oa = null, na = 1, la = "";
    function pa(e, t) {
      Vn[Zn++] = zl, Vn[Zn++] = Di, Di = e, zl = t;
    }
    function Mr(e, t, a) {
      Zt[Kt++] = na, Zt[Kt++] = la, Zt[Kt++] = Oa, Oa = e;
      var n = na;
      e = la;
      var l = 32 - zt(n) - 1;
      n &= ~(1 << l), a += 1;
      var s = 32 - zt(t) + l;
      if (30 < s) {
        var o = l - l % 5;
        s = (n & (1 << o) - 1).toString(32), n >>= o, l -= o, na = 1 << 32 - zt(t) + l | a << l | n, la = s + e;
      } else na = 1 << s | a << l | n, la = e;
    }
    function mc(e) {
      e.return !== null && (pa(e, 1), Mr(e, 1, 0));
    }
    function hc(e) {
      for (; e === Di; ) Di = Vn[--Zn], Vn[Zn] = null, zl = Vn[--Zn], Vn[Zn] = null;
      for (; e === Oa; ) Oa = Zt[--Kt], Zt[Kt] = null, la = Zt[--Kt], Zt[Kt] = null, na = Zt[--Kt], Zt[Kt] = null;
    }
    function jr(e, t) {
      Zt[Kt++] = na, Zt[Kt++] = la, Zt[Kt++] = Oa, na = t.id, la = t.overflow, Oa = e;
    }
    var ht = null, Ke = null, _e = false, La = null, Jt = false, pc = Error(r(519));
    function ka(e) {
      var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw _l(Vt(t, e)), pc;
    }
    function Ar(e) {
      var t = e.stateNode, a = e.type, n = e.memoizedProps;
      switch (t[mt] = e, t[xt] = n, a) {
        case "dialog":
          Ce("cancel", t), Ce("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Ce("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ei.length; a++) Ce(ei[a], t);
          break;
        case "source":
          Ce("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Ce("error", t), Ce("load", t);
          break;
        case "details":
          Ce("toggle", t);
          break;
        case "input":
          Ce("invalid", t), qu(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
          break;
        case "select":
          Ce("invalid", t);
          break;
        case "textarea":
          Ce("invalid", t), Hu(t, n.value, n.defaultValue, n.children);
      }
      a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || n.suppressHydrationWarning === true || Qf(t.textContent, a) ? (n.popover != null && (Ce("beforetoggle", t), Ce("toggle", t)), n.onScroll != null && Ce("scroll", t), n.onScrollEnd != null && Ce("scrollend", t), n.onClick != null && (t.onclick = fa), t = true) : t = false, t || ka(e, true);
    }
    function Er(e) {
      for (ht = e.return; ht; ) switch (ht.tag) {
        case 5:
        case 31:
        case 13:
          Jt = false;
          return;
        case 27:
        case 3:
          Jt = true;
          return;
        default:
          ht = ht.return;
      }
    }
    function Kn(e) {
      if (e !== ht) return false;
      if (!_e) return Er(e), _e = true, false;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Uo(e.type, e.memoizedProps)), a = !a), a && Ke && ka(e), Er(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Ke = Wf(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
        Ke = Wf(e);
      } else t === 27 ? (t = Ke, Ia(e.type) ? (e = Bo, Bo = null, Ke = e) : Ke = t) : Ke = ht ? $t(e.stateNode.nextSibling) : null;
      return true;
    }
    function gn() {
      Ke = ht = null, _e = false;
    }
    function gc() {
      var e = La;
      return e !== null && (Ct === null ? Ct = e : Ct.push.apply(Ct, e), La = null), e;
    }
    function _l(e) {
      La === null ? La = [
        e
      ] : La.push(e);
    }
    var yc = v(null), yn = null, ga = null;
    function qa(e, t, a) {
      I(yc, t._currentValue), t._currentValue = a;
    }
    function ya(e) {
      e._currentValue = yc.current, G(yc);
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
          var o = l.child;
          s = s.firstContext;
          e: for (; s !== null; ) {
            var d = s;
            s = l;
            for (var g = 0; g < t.length; g++) if (d.context === t[g]) {
              s.lanes |= a, d = s.alternate, d !== null && (d.lanes |= a), vc(s.return, a, e), n || (o = null);
              break e;
            }
            s = d.next;
          }
        } else if (l.tag === 18) {
          if (o = l.return, o === null) throw Error(r(341));
          o.lanes |= a, s = o.alternate, s !== null && (s.lanes |= a), vc(o, a, e), o = null;
        } else o = l.child;
        if (o !== null) o.return = l;
        else for (o = l; o !== null; ) {
          if (o === e) {
            o = null;
            break;
          }
          if (l = o.sibling, l !== null) {
            l.return = o.return, o = l;
            break;
          }
          o = o.return;
        }
        l = o;
      }
    }
    function Jn(e, t, a, n) {
      e = null;
      for (var l = t, s = false; l !== null; ) {
        if (!s) {
          if ((l.flags & 524288) !== 0) s = true;
          else if ((l.flags & 262144) !== 0) break;
        }
        if (l.tag === 10) {
          var o = l.alternate;
          if (o === null) throw Error(r(387));
          if (o = o.memoizedProps, o !== null) {
            var d = l.type;
            _t(l.pendingProps.value, o.value) || (e !== null ? e.push(d) : e = [
              d
            ]);
          }
        } else if (l === ze.current) {
          if (o = l.alternate, o === null) throw Error(r(387));
          o.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(ii) : e = [
            ii
          ]);
        }
        l = l.return;
      }
      e !== null && bc(t, e, a, n), t.flags |= 262144;
    }
    function Ui(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!_t(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function vn(e) {
      yn = e, ga = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function pt(e) {
      return Cr(yn, e);
    }
    function Oi(e, t) {
      return yn === null && vn(e), Cr(e, t);
    }
    function Cr(e, t) {
      var a = t._currentValue;
      if (t = {
        context: t,
        memoizedValue: a,
        next: null
      }, ga === null) {
        if (e === null) throw Error(r(308));
        ga = t, e.dependencies = {
          lanes: 0,
          firstContext: t
        }, e.flags |= 524288;
      } else ga = ga.next = t;
      return a;
    }
    var Rp = typeof AbortController < "u" ? AbortController : function() {
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
    }, Tp = c.unstable_scheduleCallback, zp = c.unstable_NormalPriority, lt = {
      $$typeof: se,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function Sc() {
      return {
        controller: new Rp(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Dl(e) {
      e.refCount--, e.refCount === 0 && Tp(zp, function() {
        e.controller.abort();
      });
    }
    var Ul = null, wc = 0, Fn = 0, $n = null;
    function _p(e, t) {
      if (Ul === null) {
        var a = Ul = [];
        wc = 0, Fn = Ao(), $n = {
          status: "pending",
          value: void 0,
          then: function(n) {
            a.push(n);
          }
        };
      }
      return wc++, t.then(Nr, Nr), t;
    }
    function Nr() {
      if (--wc === 0 && Ul !== null) {
        $n !== null && ($n.status = "fulfilled");
        var e = Ul;
        Ul = null, Fn = 0, $n = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Dp(e, t) {
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
    var Rr = S.S;
    S.S = function(e, t) {
      mf = X(), typeof t == "object" && t !== null && typeof t.then == "function" && _p(e, t), Rr !== null && Rr(e, t);
    };
    var bn = v(null);
    function xc() {
      var e = bn.current;
      return e !== null ? e : Xe.pooledCache;
    }
    function Li(e, t) {
      t === null ? I(bn, bn.current) : I(bn, t.pool);
    }
    function Tr() {
      var e = xc();
      return e === null ? null : {
        parent: lt._currentValue,
        pool: e
      };
    }
    var In = Error(r(460)), Mc = Error(r(474)), ki = Error(r(542)), qi = {
      then: function() {
      }
    };
    function zr(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function _r(e, t, a) {
      switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(fa, fa), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Ur(e), e;
        default:
          if (typeof t.status == "string") t.then(fa, fa);
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
              throw e = t.reason, Ur(e), e;
          }
          throw wn = t, In;
      }
    }
    function Sn(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (wn = a, In) : a;
      }
    }
    var wn = null;
    function Dr() {
      if (wn === null) throw Error(r(459));
      var e = wn;
      return wn = null, e;
    }
    function Ur(e) {
      if (e === In || e === ki) throw Error(r(483));
    }
    var Wn = null, Ol = 0;
    function Bi(e) {
      var t = Ol;
      return Ol += 1, Wn === null && (Wn = []), _r(Wn, e, t);
    }
    function Ll(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Hi(e, t) {
      throw t.$$typeof === V ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function Or(e) {
      function t(M, b) {
        if (e) {
          var C = M.deletions;
          C === null ? (M.deletions = [
            b
          ], M.flags |= 16) : C.push(b);
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
        return M = ha(M, b), M.index = 0, M.sibling = null, M;
      }
      function s(M, b, C) {
        return M.index = C, e ? (C = M.alternate, C !== null ? (C = C.index, C < b ? (M.flags |= 67108866, b) : C) : (M.flags |= 67108866, b)) : (M.flags |= 1048576, b);
      }
      function o(M) {
        return e && M.alternate === null && (M.flags |= 67108866), M;
      }
      function d(M, b, C, Y) {
        return b === null || b.tag !== 6 ? (b = dc(C, M.mode, Y), b.return = M, b) : (b = l(b, C), b.return = M, b);
      }
      function g(M, b, C, Y) {
        var re = C.type;
        return re === $ ? k(M, b, C.props.children, Y, C.key) : b !== null && (b.elementType === re || typeof re == "object" && re !== null && re.$$typeof === L && Sn(re) === b.type) ? (b = l(b, C.props), Ll(b, C), b.return = M, b) : (b = _i(C.type, C.key, C.props, null, M.mode, Y), Ll(b, C), b.return = M, b);
      }
      function N(M, b, C, Y) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== C.containerInfo || b.stateNode.implementation !== C.implementation ? (b = fc(C, M.mode, Y), b.return = M, b) : (b = l(b, C.children || []), b.return = M, b);
      }
      function k(M, b, C, Y, re) {
        return b === null || b.tag !== 7 ? (b = pn(C, M.mode, Y, re), b.return = M, b) : (b = l(b, C), b.return = M, b);
      }
      function Q(M, b, C) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return b = dc("" + b, M.mode, C), b.return = M, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case H:
              return C = _i(b.type, b.key, b.props, null, M.mode, C), Ll(C, b), C.return = M, C;
            case p:
              return b = fc(b, M.mode, C), b.return = M, b;
            case L:
              return b = Sn(b), Q(M, b, C);
          }
          if (at(b) || be(b)) return b = pn(b, M.mode, C, null), b.return = M, b;
          if (typeof b.then == "function") return Q(M, Bi(b), C);
          if (b.$$typeof === se) return Q(M, Oi(M, b), C);
          Hi(M, b);
        }
        return null;
      }
      function T(M, b, C, Y) {
        var re = b !== null ? b.key : null;
        if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint") return re !== null ? null : d(M, b, "" + C, Y);
        if (typeof C == "object" && C !== null) {
          switch (C.$$typeof) {
            case H:
              return C.key === re ? g(M, b, C, Y) : null;
            case p:
              return C.key === re ? N(M, b, C, Y) : null;
            case L:
              return C = Sn(C), T(M, b, C, Y);
          }
          if (at(C) || be(C)) return re !== null ? null : k(M, b, C, Y, null);
          if (typeof C.then == "function") return T(M, b, Bi(C), Y);
          if (C.$$typeof === se) return T(M, b, Oi(M, C), Y);
          Hi(M, C);
        }
        return null;
      }
      function U(M, b, C, Y, re) {
        if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint") return M = M.get(C) || null, d(b, M, "" + Y, re);
        if (typeof Y == "object" && Y !== null) {
          switch (Y.$$typeof) {
            case H:
              return M = M.get(Y.key === null ? C : Y.key) || null, g(b, M, Y, re);
            case p:
              return M = M.get(Y.key === null ? C : Y.key) || null, N(b, M, Y, re);
            case L:
              return Y = Sn(Y), U(M, b, C, Y, re);
          }
          if (at(Y) || be(Y)) return M = M.get(C) || null, k(b, M, Y, re, null);
          if (typeof Y.then == "function") return U(M, b, C, Bi(Y), re);
          if (Y.$$typeof === se) return U(M, b, C, Oi(b, Y), re);
          Hi(b, Y);
        }
        return null;
      }
      function ie(M, b, C, Y) {
        for (var re = null, Ue = null, ce = b, Me = b = 0, Re = null; ce !== null && Me < C.length; Me++) {
          ce.index > Me ? (Re = ce, ce = null) : Re = ce.sibling;
          var Oe = T(M, ce, C[Me], Y);
          if (Oe === null) {
            ce === null && (ce = Re);
            break;
          }
          e && ce && Oe.alternate === null && t(M, ce), b = s(Oe, b, Me), Ue === null ? re = Oe : Ue.sibling = Oe, Ue = Oe, ce = Re;
        }
        if (Me === C.length) return a(M, ce), _e && pa(M, Me), re;
        if (ce === null) {
          for (; Me < C.length; Me++) ce = Q(M, C[Me], Y), ce !== null && (b = s(ce, b, Me), Ue === null ? re = ce : Ue.sibling = ce, Ue = ce);
          return _e && pa(M, Me), re;
        }
        for (ce = n(ce); Me < C.length; Me++) Re = U(ce, M, Me, C[Me], Y), Re !== null && (e && Re.alternate !== null && ce.delete(Re.key === null ? Me : Re.key), b = s(Re, b, Me), Ue === null ? re = Re : Ue.sibling = Re, Ue = Re);
        return e && ce.forEach(function(an) {
          return t(M, an);
        }), _e && pa(M, Me), re;
      }
      function me(M, b, C, Y) {
        if (C == null) throw Error(r(151));
        for (var re = null, Ue = null, ce = b, Me = b = 0, Re = null, Oe = C.next(); ce !== null && !Oe.done; Me++, Oe = C.next()) {
          ce.index > Me ? (Re = ce, ce = null) : Re = ce.sibling;
          var an = T(M, ce, Oe.value, Y);
          if (an === null) {
            ce === null && (ce = Re);
            break;
          }
          e && ce && an.alternate === null && t(M, ce), b = s(an, b, Me), Ue === null ? re = an : Ue.sibling = an, Ue = an, ce = Re;
        }
        if (Oe.done) return a(M, ce), _e && pa(M, Me), re;
        if (ce === null) {
          for (; !Oe.done; Me++, Oe = C.next()) Oe = Q(M, Oe.value, Y), Oe !== null && (b = s(Oe, b, Me), Ue === null ? re = Oe : Ue.sibling = Oe, Ue = Oe);
          return _e && pa(M, Me), re;
        }
        for (ce = n(ce); !Oe.done; Me++, Oe = C.next()) Oe = U(ce, M, Me, Oe.value, Y), Oe !== null && (e && Oe.alternate !== null && ce.delete(Oe.key === null ? Me : Oe.key), b = s(Oe, b, Me), Ue === null ? re = Oe : Ue.sibling = Oe, Ue = Oe);
        return e && ce.forEach(function(Xg) {
          return t(M, Xg);
        }), _e && pa(M, Me), re;
      }
      function Ye(M, b, C, Y) {
        if (typeof C == "object" && C !== null && C.type === $ && C.key === null && (C = C.props.children), typeof C == "object" && C !== null) {
          switch (C.$$typeof) {
            case H:
              e: {
                for (var re = C.key; b !== null; ) {
                  if (b.key === re) {
                    if (re = C.type, re === $) {
                      if (b.tag === 7) {
                        a(M, b.sibling), Y = l(b, C.props.children), Y.return = M, M = Y;
                        break e;
                      }
                    } else if (b.elementType === re || typeof re == "object" && re !== null && re.$$typeof === L && Sn(re) === b.type) {
                      a(M, b.sibling), Y = l(b, C.props), Ll(Y, C), Y.return = M, M = Y;
                      break e;
                    }
                    a(M, b);
                    break;
                  } else t(M, b);
                  b = b.sibling;
                }
                C.type === $ ? (Y = pn(C.props.children, M.mode, Y, C.key), Y.return = M, M = Y) : (Y = _i(C.type, C.key, C.props, null, M.mode, Y), Ll(Y, C), Y.return = M, M = Y);
              }
              return o(M);
            case p:
              e: {
                for (re = C.key; b !== null; ) {
                  if (b.key === re) if (b.tag === 4 && b.stateNode.containerInfo === C.containerInfo && b.stateNode.implementation === C.implementation) {
                    a(M, b.sibling), Y = l(b, C.children || []), Y.return = M, M = Y;
                    break e;
                  } else {
                    a(M, b);
                    break;
                  }
                  else t(M, b);
                  b = b.sibling;
                }
                Y = fc(C, M.mode, Y), Y.return = M, M = Y;
              }
              return o(M);
            case L:
              return C = Sn(C), Ye(M, b, C, Y);
          }
          if (at(C)) return ie(M, b, C, Y);
          if (be(C)) {
            if (re = be(C), typeof re != "function") throw Error(r(150));
            return C = re.call(C), me(M, b, C, Y);
          }
          if (typeof C.then == "function") return Ye(M, b, Bi(C), Y);
          if (C.$$typeof === se) return Ye(M, b, Oi(M, C), Y);
          Hi(M, C);
        }
        return typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint" ? (C = "" + C, b !== null && b.tag === 6 ? (a(M, b.sibling), Y = l(b, C), Y.return = M, M = Y) : (a(M, b), Y = dc(C, M.mode, Y), Y.return = M, M = Y), o(M)) : a(M, b);
      }
      return function(M, b, C, Y) {
        try {
          Ol = 0;
          var re = Ye(M, b, C, Y);
          return Wn = null, re;
        } catch (ce) {
          if (ce === In || ce === ki) throw ce;
          var Ue = Dt(29, ce, null, M.mode);
          return Ue.lanes = Y, Ue.return = M, Ue;
        } finally {
        }
      };
    }
    var xn = Or(true), Lr = Or(false), Ba = false;
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
    function Ha(e) {
      return {
        lane: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Ga(e, t, a) {
      var n = e.updateQueue;
      if (n === null) return null;
      if (n = n.shared, (Le & 2) !== 0) {
        var l = n.pending;
        return l === null ? t.next = t : (t.next = l.next, l.next = t), n.pending = t, t = zi(e), br(e, null, a), t;
      }
      return Ti(e, n, t, a), zi(e);
    }
    function kl(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Cu(e, a);
      }
    }
    function Ec(e, t) {
      var a = e.updateQueue, n = e.alternate;
      if (n !== null && (n = n.updateQueue, a === n)) {
        var l = null, s = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var o = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            s === null ? l = s = o : s = s.next = o, a = a.next;
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
    function ql() {
      if (Cc) {
        var e = $n;
        if (e !== null) throw e;
      }
    }
    function Bl(e, t, a, n) {
      Cc = false;
      var l = e.updateQueue;
      Ba = false;
      var s = l.firstBaseUpdate, o = l.lastBaseUpdate, d = l.shared.pending;
      if (d !== null) {
        l.shared.pending = null;
        var g = d, N = g.next;
        g.next = null, o === null ? s = N : o.next = N, o = g;
        var k = e.alternate;
        k !== null && (k = k.updateQueue, d = k.lastBaseUpdate, d !== o && (d === null ? k.firstBaseUpdate = N : d.next = N, k.lastBaseUpdate = g));
      }
      if (s !== null) {
        var Q = l.baseState;
        o = 0, k = N = g = null, d = s;
        do {
          var T = d.lane & -536870913, U = T !== d.lane;
          if (U ? (Ne & T) === T : (n & T) === T) {
            T !== 0 && T === Fn && (Cc = true), k !== null && (k = k.next = {
              lane: 0,
              tag: d.tag,
              payload: d.payload,
              callback: null,
              next: null
            });
            e: {
              var ie = e, me = d;
              T = t;
              var Ye = a;
              switch (me.tag) {
                case 1:
                  if (ie = me.payload, typeof ie == "function") {
                    Q = ie.call(Ye, Q, T);
                    break e;
                  }
                  Q = ie;
                  break e;
                case 3:
                  ie.flags = ie.flags & -65537 | 128;
                case 0:
                  if (ie = me.payload, T = typeof ie == "function" ? ie.call(Ye, Q, T) : ie, T == null) break e;
                  Q = B({}, Q, T);
                  break e;
                case 2:
                  Ba = true;
              }
            }
            T = d.callback, T !== null && (e.flags |= 64, U && (e.flags |= 8192), U = l.callbacks, U === null ? l.callbacks = [
              T
            ] : U.push(T));
          } else U = {
            lane: T,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, k === null ? (N = k = U, g = Q) : k = k.next = U, o |= T;
          if (d = d.next, d === null) {
            if (d = l.shared.pending, d === null) break;
            U = d, d = U.next, U.next = null, l.lastBaseUpdate = U, l.shared.pending = null;
          }
        } while (true);
        k === null && (g = Q), l.baseState = g, l.firstBaseUpdate = N, l.lastBaseUpdate = k, s === null && (l.shared.lanes = 0), Za |= o, e.lanes = o, e.memoizedState = Q;
      }
    }
    function kr(e, t) {
      if (typeof e != "function") throw Error(r(191, e));
      e.call(t);
    }
    function qr(e, t) {
      var a = e.callbacks;
      if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) kr(a[e], t);
    }
    var Pn = v(null), Gi = v(0);
    function Br(e, t) {
      e = Ea, I(Gi, e), I(Pn, t), Ea = e | t.baseLanes;
    }
    function Nc() {
      I(Gi, Ea), I(Pn, Pn.current);
    }
    function Rc() {
      Ea = Gi.current, G(Pn), G(Gi);
    }
    var Ut = v(null), Ft = null;
    function Ya(e) {
      var t = e.alternate;
      I(et, et.current & 1), I(Ut, e), Ft === null && (t === null || Pn.current !== null || t.memoizedState !== null) && (Ft = e);
    }
    function Tc(e) {
      I(et, et.current), I(Ut, e), Ft === null && (Ft = e);
    }
    function Hr(e) {
      e.tag === 22 ? (I(et, et.current), I(Ut, e), Ft === null && (Ft = e)) : Qa();
    }
    function Qa() {
      I(et, et.current), I(Ut, Ut.current);
    }
    function Ot(e) {
      G(Ut), Ft === e && (Ft = null), G(et);
    }
    var et = v(0);
    function Yi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || ko(a) || qo(a))) return t;
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
    var va = 0, xe = null, He = null, it = null, Qi = false, el = false, Mn = false, Xi = 0, Hl = 0, tl = null, Up = 0;
    function Ie() {
      throw Error(r(321));
    }
    function zc(e, t) {
      if (t === null) return false;
      for (var a = 0; a < t.length && a < e.length; a++) if (!_t(e[a], t[a])) return false;
      return true;
    }
    function _c(e, t, a, n, l, s) {
      return va = s, xe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = e === null || e.memoizedState === null ? Md : Kc, Mn = false, s = a(n, l), Mn = false, el && (s = Yr(t, a, n, l)), Gr(e), s;
    }
    function Gr(e) {
      S.H = Ql;
      var t = He !== null && He.next !== null;
      if (va = 0, it = He = xe = null, Qi = false, Hl = 0, tl = null, t) throw Error(r(300));
      e === null || st || (e = e.dependencies, e !== null && Ui(e) && (st = true));
    }
    function Yr(e, t, a, n) {
      xe = e;
      var l = 0;
      do {
        if (el && (tl = null), Hl = 0, el = false, 25 <= l) throw Error(r(301));
        if (l += 1, it = He = null, e.updateQueue != null) {
          var s = e.updateQueue;
          s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
        }
        S.H = jd, s = t(a, n);
      } while (el);
      return s;
    }
    function Op() {
      var e = S.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Gl(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (xe.flags |= 1024), t;
    }
    function Dc() {
      var e = Xi !== 0;
      return Xi = 0, e;
    }
    function Uc(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
    }
    function Oc(e) {
      if (Qi) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Qi = false;
      }
      va = 0, it = He = xe = null, el = false, Hl = Xi = 0, tl = null;
    }
    function bt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return it === null ? xe.memoizedState = it = e : it = it.next = e, it;
    }
    function tt() {
      if (He === null) {
        var e = xe.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = He.next;
      var t = it === null ? xe.memoizedState : it.next;
      if (t !== null) it = t, He = e;
      else {
        if (e === null) throw xe.alternate === null ? Error(r(467)) : Error(r(310));
        He = e, e = {
          memoizedState: He.memoizedState,
          baseState: He.baseState,
          baseQueue: He.baseQueue,
          queue: He.queue,
          next: null
        }, it === null ? xe.memoizedState = it = e : it = it.next = e;
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
    function Gl(e) {
      var t = Hl;
      return Hl += 1, tl === null && (tl = []), e = _r(tl, e, t), t = xe, (it === null ? t.memoizedState : it.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? Md : Kc), e;
    }
    function Zi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Gl(e);
        if (e.$$typeof === se) return pt(e);
      }
      throw Error(r(438, String(e)));
    }
    function Lc(e) {
      var t = null, a = xe.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var n = xe.alternate;
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
      }), a === null && (a = Vi(), xe.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = J;
      return t.index++, a;
    }
    function ba(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Ki(e) {
      var t = tt();
      return kc(t, He, e);
    }
    function kc(e, t, a) {
      var n = e.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = a;
      var l = e.baseQueue, s = n.pending;
      if (s !== null) {
        if (l !== null) {
          var o = l.next;
          l.next = s.next, s.next = o;
        }
        t.baseQueue = l = s, n.pending = null;
      }
      if (s = e.baseState, l === null) e.memoizedState = s;
      else {
        t = l.next;
        var d = o = null, g = null, N = t, k = false;
        do {
          var Q = N.lane & -536870913;
          if (Q !== N.lane ? (Ne & Q) === Q : (va & Q) === Q) {
            var T = N.revertLane;
            if (T === 0) g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), Q === Fn && (k = true);
            else if ((va & T) === T) {
              N = N.next, T === Fn && (k = true);
              continue;
            } else Q = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, g === null ? (d = g = Q, o = s) : g = g.next = Q, xe.lanes |= T, Za |= T;
            Q = N.action, Mn && a(s, Q), s = N.hasEagerState ? N.eagerState : a(s, Q);
          } else T = {
            lane: Q,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, g === null ? (d = g = T, o = s) : g = g.next = T, xe.lanes |= Q, Za |= Q;
          N = N.next;
        } while (N !== null && N !== t);
        if (g === null ? o = s : g.next = d, !_t(s, e.memoizedState) && (st = true, k && (a = $n, a !== null))) throw a;
        e.memoizedState = s, e.baseState = o, e.baseQueue = g, n.lastRenderedState = s;
      }
      return l === null && (n.lanes = 0), [
        e.memoizedState,
        n.dispatch
      ];
    }
    function qc(e) {
      var t = tt(), a = t.queue;
      if (a === null) throw Error(r(311));
      a.lastRenderedReducer = e;
      var n = a.dispatch, l = a.pending, s = t.memoizedState;
      if (l !== null) {
        a.pending = null;
        var o = l = l.next;
        do
          s = e(s, o.action), o = o.next;
        while (o !== l);
        _t(s, t.memoizedState) || (st = true), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), a.lastRenderedState = s;
      }
      return [
        s,
        n
      ];
    }
    function Qr(e, t, a) {
      var n = xe, l = tt(), s = _e;
      if (s) {
        if (a === void 0) throw Error(r(407));
        a = a();
      } else a = t();
      var o = !_t((He || l).memoizedState, a);
      if (o && (l.memoizedState = a, st = true), l = l.queue, Gc(Zr.bind(null, n, l, e), [
        e
      ]), l.getSnapshot !== t || o || it !== null && it.memoizedState.tag & 1) {
        if (n.flags |= 2048, al(9, {
          destroy: void 0
        }, Vr.bind(null, n, l, a, t), null), Xe === null) throw Error(r(349));
        s || (va & 127) !== 0 || Xr(n, t, a);
      }
      return a;
    }
    function Xr(e, t, a) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: a
      }, t = xe.updateQueue, t === null ? (t = Vi(), xe.updateQueue = t, t.stores = [
        e
      ]) : (a = t.stores, a === null ? t.stores = [
        e
      ] : a.push(e));
    }
    function Vr(e, t, a, n) {
      t.value = a, t.getSnapshot = n, Kr(t) && Jr(e);
    }
    function Zr(e, t, a) {
      return a(function() {
        Kr(t) && Jr(e);
      });
    }
    function Kr(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !_t(e, a);
      } catch {
        return true;
      }
    }
    function Jr(e) {
      var t = hn(e, 2);
      t !== null && Nt(t, e, 2);
    }
    function Bc(e) {
      var t = bt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Mn) {
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
        lastRenderedReducer: ba,
        lastRenderedState: e
      }, t;
    }
    function Fr(e, t, a, n) {
      return e.baseState = a, kc(e, He, typeof n == "function" ? n : ba);
    }
    function Lp(e, t, a, n, l) {
      if ($i(e)) throw Error(r(485));
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
          then: function(o) {
            s.listeners.push(o);
          }
        };
        S.T !== null ? a(true) : s.isTransition = false, n(s), a = t.pending, a === null ? (s.next = t.pending = s, $r(t, s)) : (s.next = a.next, t.pending = a.next = s);
      }
    }
    function $r(e, t) {
      var a = t.action, n = t.payload, l = e.state;
      if (t.isTransition) {
        var s = S.T, o = {};
        S.T = o;
        try {
          var d = a(l, n), g = S.S;
          g !== null && g(o, d), Ir(e, t, d);
        } catch (N) {
          Hc(e, t, N);
        } finally {
          s !== null && o.types !== null && (s.types = o.types), S.T = s;
        }
      } else try {
        s = a(l, n), Ir(e, t, s);
      } catch (N) {
        Hc(e, t, N);
      }
    }
    function Ir(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(n) {
        Wr(e, t, n);
      }, function(n) {
        return Hc(e, t, n);
      }) : Wr(e, t, a);
    }
    function Wr(e, t, a) {
      t.status = "fulfilled", t.value = a, Pr(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, $r(e, a)));
    }
    function Hc(e, t, a) {
      var n = e.pending;
      if (e.pending = null, n !== null) {
        n = n.next;
        do
          t.status = "rejected", t.reason = a, Pr(t), t = t.next;
        while (t !== n);
      }
      e.action = null;
    }
    function Pr(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function ed(e, t) {
      return t;
    }
    function td(e, t) {
      if (_e) {
        var a = Xe.formState;
        if (a !== null) {
          e: {
            var n = xe;
            if (_e) {
              if (Ke) {
                t: {
                  for (var l = Ke, s = Jt; l.nodeType !== 8; ) {
                    if (!s) {
                      l = null;
                      break t;
                    }
                    if (l = $t(l.nextSibling), l === null) {
                      l = null;
                      break t;
                    }
                  }
                  s = l.data, l = s === "F!" || s === "F" ? l : null;
                }
                if (l) {
                  Ke = $t(l.nextSibling), n = l.data === "F!";
                  break e;
                }
              }
              ka(n);
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
        lastRenderedReducer: ed,
        lastRenderedState: t
      }, a.queue = n, a = Sd.bind(null, xe, n), n.dispatch = a, n = Bc(false), s = Zc.bind(null, xe, false, n.queue), n = bt(), l = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, n.queue = l, a = Lp.bind(null, xe, l, s, a), l.dispatch = a, n.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function ad(e) {
      var t = tt();
      return nd(t, He, e);
    }
    function nd(e, t, a) {
      if (t = kc(e, t, ed)[0], e = Ki(ba)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var n = Gl(t);
      } catch (o) {
        throw o === In ? ki : o;
      }
      else n = t;
      t = tt();
      var l = t.queue, s = l.dispatch;
      return a !== t.memoizedState && (xe.flags |= 2048, al(9, {
        destroy: void 0
      }, kp.bind(null, l, a), null)), [
        n,
        s,
        e
      ];
    }
    function kp(e, t) {
      e.action = t;
    }
    function ld(e) {
      var t = tt(), a = He;
      if (a !== null) return nd(t, a, e);
      tt(), t = t.memoizedState, a = tt();
      var n = a.queue.dispatch;
      return a.memoizedState = e, [
        t,
        n,
        false
      ];
    }
    function al(e, t, a, n) {
      return e = {
        tag: e,
        create: a,
        deps: n,
        inst: t,
        next: null
      }, t = xe.updateQueue, t === null && (t = Vi(), xe.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (n = a.next, a.next = e, e.next = n, t.lastEffect = e), e;
    }
    function id() {
      return tt().memoizedState;
    }
    function Ji(e, t, a, n) {
      var l = bt();
      xe.flags |= e, l.memoizedState = al(1 | t, {
        destroy: void 0
      }, a, n === void 0 ? null : n);
    }
    function Fi(e, t, a, n) {
      var l = tt();
      n = n === void 0 ? null : n;
      var s = l.memoizedState.inst;
      He !== null && n !== null && zc(n, He.memoizedState.deps) ? l.memoizedState = al(t, s, a, n) : (xe.flags |= e, l.memoizedState = al(1 | t, s, a, n));
    }
    function sd(e, t) {
      Ji(8390656, 8, e, t);
    }
    function Gc(e, t) {
      Fi(2048, 8, e, t);
    }
    function qp(e) {
      xe.flags |= 4;
      var t = xe.updateQueue;
      if (t === null) t = Vi(), xe.updateQueue = t, t.events = [
        e
      ];
      else {
        var a = t.events;
        a === null ? t.events = [
          e
        ] : a.push(e);
      }
    }
    function cd(e) {
      var t = tt().memoizedState;
      return qp({
        ref: t,
        nextImpl: e
      }), function() {
        if ((Le & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function od(e, t) {
      return Fi(4, 2, e, t);
    }
    function ud(e, t) {
      return Fi(4, 4, e, t);
    }
    function rd(e, t) {
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
    function dd(e, t, a) {
      a = a != null ? a.concat([
        e
      ]) : null, Fi(4, 4, rd.bind(null, t, e), a);
    }
    function Yc() {
    }
    function fd(e, t) {
      var a = tt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      return t !== null && zc(t, n[1]) ? n[0] : (a.memoizedState = [
        e,
        t
      ], e);
    }
    function md(e, t) {
      var a = tt();
      t = t === void 0 ? null : t;
      var n = a.memoizedState;
      if (t !== null && zc(t, n[1])) return n[0];
      if (n = e(), Mn) {
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
    function Qc(e, t, a) {
      return a === void 0 || (va & 1073741824) !== 0 && (Ne & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = pf(), xe.lanes |= e, Za |= e, a);
    }
    function hd(e, t, a, n) {
      return _t(a, t) ? a : Pn.current !== null ? (e = Qc(e, a, n), _t(e, t) || (st = true), e) : (va & 42) === 0 || (va & 1073741824) !== 0 && (Ne & 261930) === 0 ? (st = true, e.memoizedState = a) : (e = pf(), xe.lanes |= e, Za |= e, t);
    }
    function pd(e, t, a, n, l) {
      var s = z.p;
      z.p = s !== 0 && 8 > s ? s : 8;
      var o = S.T, d = {};
      S.T = d, Zc(e, false, t, a);
      try {
        var g = l(), N = S.S;
        if (N !== null && N(d, g), g !== null && typeof g == "object" && typeof g.then == "function") {
          var k = Dp(g, n);
          Yl(e, t, k, qt(e));
        } else Yl(e, t, n, qt(e));
      } catch (Q) {
        Yl(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Q
        }, qt());
      } finally {
        z.p = s, o !== null && d.types !== null && (o.types = d.types), S.T = o;
      }
    }
    function Bp() {
    }
    function Xc(e, t, a, n) {
      if (e.tag !== 5) throw Error(r(476));
      var l = gd(e).queue;
      pd(e, l, t, W, a === null ? Bp : function() {
        return yd(e), a(n);
      });
    }
    function gd(e) {
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
          lastRenderedReducer: ba,
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
          lastRenderedReducer: ba,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function yd(e) {
      var t = gd(e);
      t.next === null && (t = e.alternate.memoizedState), Yl(e, t.next.queue, {}, qt());
    }
    function Vc() {
      return pt(ii);
    }
    function vd() {
      return tt().memoizedState;
    }
    function bd() {
      return tt().memoizedState;
    }
    function Hp(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = qt();
            e = Ha(a);
            var n = Ga(t, e, a);
            n !== null && (Nt(n, t, a), kl(n, t, a)), t = {
              cache: Sc()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function Gp(e, t, a) {
      var n = qt();
      a = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, $i(e) ? wd(t, a) : (a = uc(e, t, a, n), a !== null && (Nt(a, e, n), xd(a, t, n)));
    }
    function Sd(e, t, a) {
      var n = qt();
      Yl(e, t, a, n);
    }
    function Yl(e, t, a, n) {
      var l = {
        lane: n,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if ($i(e)) wd(t, l);
      else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
          var o = t.lastRenderedState, d = s(o, a);
          if (l.hasEagerState = true, l.eagerState = d, _t(d, o)) return Ti(e, t, l, 0), Xe === null && Ri(), false;
        } catch {
        } finally {
        }
        if (a = uc(e, t, l, n), a !== null) return Nt(a, e, n), xd(a, t, n), true;
      }
      return false;
    }
    function Zc(e, t, a, n) {
      if (n = {
        lane: 2,
        revertLane: Ao(),
        gesture: null,
        action: n,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, $i(e)) {
        if (t) throw Error(r(479));
      } else t = uc(e, a, n, 2), t !== null && Nt(t, e, 2);
    }
    function $i(e) {
      var t = e.alternate;
      return e === xe || t !== null && t === xe;
    }
    function wd(e, t) {
      el = Qi = true;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function xd(e, t, a) {
      if ((a & 4194048) !== 0) {
        var n = t.lanes;
        n &= e.pendingLanes, a |= n, t.lanes = a, Cu(e, a);
      }
    }
    var Ql = {
      readContext: pt,
      use: Zi,
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
    Ql.useEffectEvent = Ie;
    var Md = {
      readContext: pt,
      use: Zi,
      useCallback: function(e, t) {
        return bt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: pt,
      useEffect: sd,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([
          e
        ]) : null, Ji(4194308, 4, rd.bind(null, t, e), a);
      },
      useLayoutEffect: function(e, t) {
        return Ji(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        Ji(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var a = bt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Mn) {
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
        var n = bt();
        if (a !== void 0) {
          var l = a(t);
          if (Mn) {
            _a2(true);
            try {
              a(t);
            } finally {
              _a2(false);
            }
          }
        } else l = t;
        return n.memoizedState = n.baseState = l, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: l
        }, n.queue = e, e = e.dispatch = Gp.bind(null, xe, e), [
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
        var t = e.queue, a = Sd.bind(null, xe, t);
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
        return e = pd.bind(null, xe, e.queue, true, false), bt().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, a) {
        var n = xe, l = bt();
        if (_e) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (a = t(), Xe === null) throw Error(r(349));
          (Ne & 127) !== 0 || Xr(n, t, a);
        }
        l.memoizedState = a;
        var s = {
          value: a,
          getSnapshot: t
        };
        return l.queue = s, sd(Zr.bind(null, n, s, e), [
          e
        ]), n.flags |= 2048, al(9, {
          destroy: void 0
        }, Vr.bind(null, n, s, a, t), null), a;
      },
      useId: function() {
        var e = bt(), t = Xe.identifierPrefix;
        if (_e) {
          var a = la, n = na;
          a = (n & ~(1 << 32 - zt(n) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Xi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
        } else a = Up++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Vc,
      useFormState: td,
      useActionState: td,
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
        return t.queue = a, t = Zc.bind(null, xe, true, a), a.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: Lc,
      useCacheRefresh: function() {
        return bt().memoizedState = Hp.bind(null, xe);
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
      readContext: pt,
      use: Zi,
      useCallback: fd,
      useContext: pt,
      useEffect: Gc,
      useImperativeHandle: dd,
      useInsertionEffect: od,
      useLayoutEffect: ud,
      useMemo: md,
      useReducer: Ki,
      useRef: id,
      useState: function() {
        return Ki(ba);
      },
      useDebugValue: Yc,
      useDeferredValue: function(e, t) {
        var a = tt();
        return hd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Ki(ba)[0], t = tt().memoizedState;
        return [
          typeof e == "boolean" ? e : Gl(e),
          t
        ];
      },
      useSyncExternalStore: Qr,
      useId: vd,
      useHostTransitionStatus: Vc,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function(e, t) {
        var a = tt();
        return Fr(a, He, e, t);
      },
      useMemoCache: Lc,
      useCacheRefresh: bd
    };
    Kc.useEffectEvent = cd;
    var jd = {
      readContext: pt,
      use: Zi,
      useCallback: fd,
      useContext: pt,
      useEffect: Gc,
      useImperativeHandle: dd,
      useInsertionEffect: od,
      useLayoutEffect: ud,
      useMemo: md,
      useReducer: qc,
      useRef: id,
      useState: function() {
        return qc(ba);
      },
      useDebugValue: Yc,
      useDeferredValue: function(e, t) {
        var a = tt();
        return He === null ? Qc(a, e, t) : hd(a, He.memoizedState, e, t);
      },
      useTransition: function() {
        var e = qc(ba)[0], t = tt().memoizedState;
        return [
          typeof e == "boolean" ? e : Gl(e),
          t
        ];
      },
      useSyncExternalStore: Qr,
      useId: vd,
      useHostTransitionStatus: Vc,
      useFormState: ld,
      useActionState: ld,
      useOptimistic: function(e, t) {
        var a = tt();
        return He !== null ? Fr(a, He, e, t) : (a.baseState = e, [
          e,
          a.queue.dispatch
        ]);
      },
      useMemoCache: Lc,
      useCacheRefresh: bd
    };
    jd.useEffectEvent = cd;
    function Jc(e, t, a, n) {
      t = e.memoizedState, a = a(n, t), a = a == null ? t : B({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
    }
    var Fc = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var n = qt(), l = Ha(n);
        l.payload = t, a != null && (l.callback = a), t = Ga(e, l, n), t !== null && (Nt(t, e, n), kl(t, e, n));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var n = qt(), l = Ha(n);
        l.tag = 1, l.payload = t, a != null && (l.callback = a), t = Ga(e, l, n), t !== null && (Nt(t, e, n), kl(t, e, n));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = qt(), n = Ha(a);
        n.tag = 2, t != null && (n.callback = t), t = Ga(e, n, a), t !== null && (Nt(t, e, a), kl(t, e, a));
      }
    };
    function Ad(e, t, a, n, l, s, o) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, s, o) : t.prototype && t.prototype.isPureReactComponent ? !Rl(a, n) || !Rl(l, s) : true;
    }
    function Ed(e, t, a, n) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, n), t.state !== e && Fc.enqueueReplaceState(t, t.state, null);
    }
    function jn(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var n in t) n !== "ref" && (a[n] = t[n]);
      }
      if (e = e.defaultProps) {
        a === t && (a = B({}, a));
        for (var l in e) a[l] === void 0 && (a[l] = e[l]);
      }
      return a;
    }
    function Cd(e) {
      Ni(e);
    }
    function Nd(e) {
      console.error(e);
    }
    function Rd(e) {
      Ni(e);
    }
    function Ii(e, t) {
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
    function Td(e, t, a) {
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
      return a = Ha(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        Ii(e, t);
      }, a;
    }
    function zd(e) {
      return e = Ha(e), e.tag = 3, e;
    }
    function _d(e, t, a, n) {
      var l = a.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var s = n.value;
        e.payload = function() {
          return l(s);
        }, e.callback = function() {
          Td(t, a, n);
        };
      }
      var o = a.stateNode;
      o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
        Td(t, a, n), typeof l != "function" && (Ka === null ? Ka = /* @__PURE__ */ new Set([
          this
        ]) : Ka.add(this));
        var d = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: d !== null ? d : ""
        });
      });
    }
    function Yp(e, t, a, n, l) {
      if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
        if (t = a.alternate, t !== null && Jn(t, a, l, true), a = Ut.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return Ft === null ? us() : a.alternate === null && We === 0 && (We = 3), a.flags &= -257, a.flags |= 65536, a.lanes = l, n === qi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([
                n
              ]) : t.add(n), xo(e, n, l)), false;
            case 22:
              return a.flags |= 65536, n === qi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  n
                ])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([
                n
              ]) : a.add(n)), xo(e, n, l)), false;
          }
          throw Error(r(435, a.tag));
        }
        return xo(e, n, l), us(), false;
      }
      if (_e) return t = Ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, n !== pc && (e = Error(r(422), {
        cause: n
      }), _l(Vt(e, a)))) : (n !== pc && (t = Error(r(423), {
        cause: n
      }), _l(Vt(t, a))), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, n = Vt(n, a), l = $c(e.stateNode, n, l), Ec(e, l), We !== 4 && (We = 2)), false;
      var s = Error(r(520), {
        cause: n
      });
      if (s = Vt(s, a), Il === null ? Il = [
        s
      ] : Il.push(s), We !== 4 && (We = 2), t === null) return true;
      n = Vt(n, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = l & -l, a.lanes |= e, e = $c(a.stateNode, n, e), Ec(a, e), false;
          case 1:
            if (t = a.type, s = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Ka === null || !Ka.has(s)))) return a.flags |= 65536, l &= -l, a.lanes |= l, l = zd(l), _d(l, e, a, n), Ec(a, l), false;
        }
        a = a.return;
      } while (a !== null);
      return false;
    }
    var Ic = Error(r(461)), st = false;
    function gt(e, t, a, n) {
      t.child = e === null ? Lr(t, null, a, n) : xn(t, e.child, a, n);
    }
    function Dd(e, t, a, n, l) {
      a = a.render;
      var s = t.ref;
      if ("ref" in n) {
        var o = {};
        for (var d in n) d !== "ref" && (o[d] = n[d]);
      } else o = n;
      return vn(t), n = _c(e, t, a, o, s, l), d = Dc(), e !== null && !st ? (Uc(e, t, l), Sa(e, t, l)) : (_e && d && mc(t), t.flags |= 1, gt(e, t, n, l), t.child);
    }
    function Ud(e, t, a, n, l) {
      if (e === null) {
        var s = a.type;
        return typeof s == "function" && !rc(s) && s.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = s, Od(e, t, s, n, l)) : (e = _i(a.type, null, n, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (s = e.child, !io(e, l)) {
        var o = s.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Rl, a(o, n) && e.ref === t.ref) return Sa(e, t, l);
      }
      return t.flags |= 1, e = ha(s, n), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Od(e, t, a, n, l) {
      if (e !== null) {
        var s = e.memoizedProps;
        if (Rl(s, n) && e.ref === t.ref) if (st = false, t.pendingProps = n = s, io(e, l)) (e.flags & 131072) !== 0 && (st = true);
        else return t.lanes = e.lanes, Sa(e, t, l);
      }
      return Wc(e, t, a, n, l);
    }
    function Ld(e, t, a, n) {
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
        }, e !== null && Li(t, s !== null ? s.cachePool : null), s !== null ? Br(t, s) : Nc(), Hr(t);
        else return n = t.lanes = 536870912, kd(e, t, s !== null ? s.baseLanes | a : a, a, n);
      } else s !== null ? (Li(t, s.cachePool), Br(t, s), Qa(), t.memoizedState = null) : (e !== null && Li(t, null), Nc(), Qa());
      return gt(e, t, l, a), t.child;
    }
    function Xl(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function kd(e, t, a, n, l) {
      var s = xc();
      return s = s === null ? null : {
        parent: lt._currentValue,
        pool: s
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: s
      }, e !== null && Li(t, null), Nc(), Hr(t), e !== null && Jn(e, t, n, true), t.childLanes = l, null;
    }
    function Wi(e, t) {
      return t = es({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function qd(e, t, a) {
      return xn(t, e.child, null, a), e = Wi(t, t.pendingProps), e.flags |= 2, Ot(t), t.memoizedState = null, e;
    }
    function Qp(e, t, a) {
      var n = t.pendingProps, l = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (_e) {
          if (n.mode === "hidden") return e = Wi(t, n), t.lanes = 536870912, Xl(null, e);
          if (Tc(t), (e = Ke) ? (e = If(e, Jt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Oa !== null ? {
              id: na,
              overflow: la
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = wr(e), a.return = t, t.child = a, ht = t, Ke = null)) : e = null, e === null) throw ka(t);
          return t.lanes = 536870912, null;
        }
        return Wi(t, n);
      }
      var s = e.memoizedState;
      if (s !== null) {
        var o = s.dehydrated;
        if (Tc(t), l) if (t.flags & 256) t.flags &= -257, t = qd(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
        else if (st || Jn(e, t, a, false), l = (a & e.childLanes) !== 0, st || l) {
          if (n = Xe, n !== null && (o = Nu(n, a), o !== 0 && o !== s.retryLane)) throw s.retryLane = o, hn(e, o), Nt(n, e, o), Ic;
          us(), t = qd(e, t, a);
        } else e = s.treeContext, Ke = $t(o.nextSibling), ht = t, _e = true, La = null, Jt = false, e !== null && jr(t, e), t = Wi(t, n), t.flags |= 4096;
        return t;
      }
      return e = ha(e.child, {
        mode: n.mode,
        children: n.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function Pi(e, t) {
      var a = t.ref;
      if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object") throw Error(r(284));
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function Wc(e, t, a, n, l) {
      return vn(t), a = _c(e, t, a, n, void 0, l), n = Dc(), e !== null && !st ? (Uc(e, t, l), Sa(e, t, l)) : (_e && n && mc(t), t.flags |= 1, gt(e, t, a, l), t.child);
    }
    function Bd(e, t, a, n, l, s) {
      return vn(t), t.updateQueue = null, a = Yr(t, n, a, l), Gr(e), n = Dc(), e !== null && !st ? (Uc(e, t, s), Sa(e, t, s)) : (_e && n && mc(t), t.flags |= 1, gt(e, t, a, s), t.child);
    }
    function Hd(e, t, a, n, l) {
      if (vn(t), t.stateNode === null) {
        var s = Xn, o = a.contextType;
        typeof o == "object" && o !== null && (s = pt(o)), s = new a(n, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Fc, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = n, s.state = t.memoizedState, s.refs = {}, jc(t), o = a.contextType, s.context = typeof o == "object" && o !== null ? pt(o) : Xn, s.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o == "function" && (Jc(t, a, o, n), s.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (o = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), o !== s.state && Fc.enqueueReplaceState(s, s.state, null), Bl(t, n, s, l), ql(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = true;
      } else if (e === null) {
        s = t.stateNode;
        var d = t.memoizedProps, g = jn(a, d);
        s.props = g;
        var N = s.context, k = a.contextType;
        o = Xn, typeof k == "object" && k !== null && (o = pt(k));
        var Q = a.getDerivedStateFromProps;
        k = typeof Q == "function" || typeof s.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, k || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d || N !== o) && Ed(t, s, n, o), Ba = false;
        var T = t.memoizedState;
        s.state = T, Bl(t, n, s, l), ql(), N = t.memoizedState, d || T !== N || Ba ? (typeof Q == "function" && (Jc(t, a, Q, n), N = t.memoizedState), (g = Ba || Ad(t, a, g, n, T, N, o)) ? (k || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = N), s.props = n, s.state = N, s.context = o, n = g) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), n = false);
      } else {
        s = t.stateNode, Ac(e, t), o = t.memoizedProps, k = jn(a, o), s.props = k, Q = t.pendingProps, T = s.context, N = a.contextType, g = Xn, typeof N == "object" && N !== null && (g = pt(N)), d = a.getDerivedStateFromProps, (N = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== Q || T !== g) && Ed(t, s, n, g), Ba = false, T = t.memoizedState, s.state = T, Bl(t, n, s, l), ql();
        var U = t.memoizedState;
        o !== Q || T !== U || Ba || e !== null && e.dependencies !== null && Ui(e.dependencies) ? (typeof d == "function" && (Jc(t, a, d, n), U = t.memoizedState), (k = Ba || Ad(t, a, k, n, T, U, g) || e !== null && e.dependencies !== null && Ui(e.dependencies)) ? (N || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(n, U, g), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(n, U, g)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = U), s.props = n, s.state = U, s.context = g, n = k) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), n = false);
      }
      return s = n, Pi(e, t), n = (t.flags & 128) !== 0, s || n ? (s = t.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && n ? (t.child = xn(t, e.child, null, l), t.child = xn(t, null, a, l)) : gt(e, t, a, l), t.memoizedState = s.state, e = t.child) : e = Sa(e, t, l), e;
    }
    function Gd(e, t, a, n) {
      return gn(), t.flags |= 256, gt(e, t, a, n), t.child;
    }
    var Pc = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function eo(e) {
      return {
        baseLanes: e,
        cachePool: Tr()
      };
    }
    function to(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= kt), e;
    }
    function Yd(e, t, a) {
      var n = t.pendingProps, l = false, s = (t.flags & 128) !== 0, o;
      if ((o = s) || (o = e !== null && e.memoizedState === null ? false : (et.current & 2) !== 0), o && (l = true, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (_e) {
          if (l ? Ya(t) : Qa(), (e = Ke) ? (e = If(e, Jt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Oa !== null ? {
              id: na,
              overflow: la
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = wr(e), a.return = t, t.child = a, ht = t, Ke = null)) : e = null, e === null) throw ka(t);
          return qo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var d = n.children;
        return n = n.fallback, l ? (Qa(), l = t.mode, d = es({
          mode: "hidden",
          children: d
        }, l), n = pn(n, l, a, null), d.return = t, n.return = t, d.sibling = n, t.child = d, n = t.child, n.memoizedState = eo(a), n.childLanes = to(e, o, a), t.memoizedState = Pc, Xl(null, n)) : (Ya(t), ao(t, d));
      }
      var g = e.memoizedState;
      if (g !== null && (d = g.dehydrated, d !== null)) {
        if (s) t.flags & 256 ? (Ya(t), t.flags &= -257, t = no(e, t, a)) : t.memoizedState !== null ? (Qa(), t.child = e.child, t.flags |= 128, t = null) : (Qa(), d = n.fallback, l = t.mode, n = es({
          mode: "visible",
          children: n.children
        }, l), d = pn(d, l, a, null), d.flags |= 2, n.return = t, d.return = t, n.sibling = d, t.child = n, xn(t, e.child, null, a), n = t.child, n.memoizedState = eo(a), n.childLanes = to(e, o, a), t.memoizedState = Pc, t = Xl(null, n));
        else if (Ya(t), qo(d)) {
          if (o = d.nextSibling && d.nextSibling.dataset, o) var N = o.dgst;
          o = N, n = Error(r(419)), n.stack = "", n.digest = o, _l({
            value: n,
            source: null,
            stack: null
          }), t = no(e, t, a);
        } else if (st || Jn(e, t, a, false), o = (a & e.childLanes) !== 0, st || o) {
          if (o = Xe, o !== null && (n = Nu(o, a), n !== 0 && n !== g.retryLane)) throw g.retryLane = n, hn(e, n), Nt(o, e, n), Ic;
          ko(d) || us(), t = no(e, t, a);
        } else ko(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, Ke = $t(d.nextSibling), ht = t, _e = true, La = null, Jt = false, e !== null && jr(t, e), t = ao(t, n.children), t.flags |= 4096);
        return t;
      }
      return l ? (Qa(), d = n.fallback, l = t.mode, g = e.child, N = g.sibling, n = ha(g, {
        mode: "hidden",
        children: n.children
      }), n.subtreeFlags = g.subtreeFlags & 65011712, N !== null ? d = ha(N, d) : (d = pn(d, l, a, null), d.flags |= 2), d.return = t, n.return = t, n.sibling = d, t.child = n, Xl(null, n), n = t.child, d = e.child.memoizedState, d === null ? d = eo(a) : (l = d.cachePool, l !== null ? (g = lt._currentValue, l = l.parent !== g ? {
        parent: g,
        pool: g
      } : l) : l = Tr(), d = {
        baseLanes: d.baseLanes | a,
        cachePool: l
      }), n.memoizedState = d, n.childLanes = to(e, o, a), t.memoizedState = Pc, Xl(e.child, n)) : (Ya(t), a = e.child, e = a.sibling, a = ha(a, {
        mode: "visible",
        children: n.children
      }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [
        e
      ], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function ao(e, t) {
      return t = es({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function es(e, t) {
      return e = Dt(22, e, null, t), e.lanes = 0, e;
    }
    function no(e, t, a) {
      return xn(t, e.child, null, a), e = ao(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Qd(e, t, a) {
      e.lanes |= t;
      var n = e.alternate;
      n !== null && (n.lanes |= t), vc(e.return, t, a);
    }
    function lo(e, t, a, n, l, s) {
      var o = e.memoizedState;
      o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: a,
        tailMode: l,
        treeForkCount: s
      } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = a, o.tailMode = l, o.treeForkCount = s);
    }
    function Xd(e, t, a) {
      var n = t.pendingProps, l = n.revealOrder, s = n.tail;
      n = n.children;
      var o = et.current, d = (o & 2) !== 0;
      if (d ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, I(et, o), gt(e, t, n, a), n = _e ? zl : 0, !d && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
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
      switch (l) {
        case "forwards":
          for (a = t.child, l = null; a !== null; ) e = a.alternate, e !== null && Yi(e) === null && (l = a), a = a.sibling;
          a = l, a === null ? (l = t.child, t.child = null) : (l = a.sibling, a.sibling = null), lo(t, false, l, a, s, n);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, l = t.child, t.child = null; l !== null; ) {
            if (e = l.alternate, e !== null && Yi(e) === null) {
              t.child = l;
              break;
            }
            e = l.sibling, l.sibling = a, a = l, l = e;
          }
          lo(t, true, a, null, s, n);
          break;
        case "together":
          lo(t, false, null, null, void 0, n);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Sa(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Za |= t.lanes, (a & t.childLanes) === 0) if (e !== null) {
        if (Jn(e, t, a, false), (a & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (e = t.child, a = ha(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; ) e = e.sibling, a = a.sibling = ha(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function io(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && Ui(e)));
    }
    function Xp(e, t, a) {
      switch (t.tag) {
        case 3:
          ot(t, t.stateNode.containerInfo), qa(t, lt, e.memoizedState.cache), gn();
          break;
        case 27:
        case 5:
          wt(t);
          break;
        case 4:
          ot(t, t.stateNode.containerInfo);
          break;
        case 10:
          qa(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, Tc(t), null;
          break;
        case 13:
          var n = t.memoizedState;
          if (n !== null) return n.dehydrated !== null ? (Ya(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Yd(e, t, a) : (Ya(t), e = Sa(e, t, a), e !== null ? e.sibling : null);
          Ya(t);
          break;
        case 19:
          var l = (e.flags & 128) !== 0;
          if (n = (a & t.childLanes) !== 0, n || (Jn(e, t, a, false), n = (a & t.childLanes) !== 0), l) {
            if (n) return Xd(e, t, a);
            t.flags |= 128;
          }
          if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(et, et.current), n) break;
          return null;
        case 22:
          return t.lanes = 0, Ld(e, t, a, t.pendingProps);
        case 24:
          qa(t, lt, e.memoizedState.cache);
      }
      return Sa(e, t, a);
    }
    function Vd(e, t, a) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) st = true;
      else {
        if (!io(e, a) && (t.flags & 128) === 0) return st = false, Xp(e, t, a);
        st = (e.flags & 131072) !== 0;
      }
      else st = false, _e && (t.flags & 1048576) !== 0 && Mr(t, zl, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var n = t.pendingProps;
            if (e = Sn(t.elementType), t.type = e, typeof e == "function") rc(e) ? (n = jn(e, n), t.tag = 1, t = Hd(null, t, e, n, a)) : (t.tag = 0, t = Wc(null, t, e, n, a));
            else {
              if (e != null) {
                var l = e.$$typeof;
                if (l === he) {
                  t.tag = 11, t = Dd(null, t, e, n, a);
                  break e;
                } else if (l === _) {
                  t.tag = 14, t = Ud(null, t, e, n, a);
                  break e;
                }
              }
              throw t = Te(e) || e, Error(r(306, t, ""));
            }
          }
          return t;
        case 0:
          return Wc(e, t, t.type, t.pendingProps, a);
        case 1:
          return n = t.type, l = jn(n, t.pendingProps), Hd(e, t, n, l, a);
        case 3:
          e: {
            if (ot(t, t.stateNode.containerInfo), e === null) throw Error(r(387));
            n = t.pendingProps;
            var s = t.memoizedState;
            l = s.element, Ac(e, t), Bl(t, n, null, a);
            var o = t.memoizedState;
            if (n = o.cache, qa(t, lt, n), n !== s.cache && bc(t, [
              lt
            ], a, true), ql(), n = o.element, s.isDehydrated) if (s = {
              element: n,
              isDehydrated: false,
              cache: o.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = Gd(e, t, n, a);
              break e;
            } else if (n !== l) {
              l = Vt(Error(r(424)), t), _l(l), t = Gd(e, t, n, a);
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ke = $t(e.firstChild), ht = t, _e = true, La = null, Jt = true, a = Lr(t, null, n, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
            else {
              if (gn(), n === l) {
                t = Sa(e, t, a);
                break e;
              }
              gt(e, t, n, a);
            }
            t = t.child;
          }
          return t;
        case 26:
          return Pi(e, t), e === null ? (a = nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : _e || (a = t.type, e = t.pendingProps, n = gs(we.current).createElement(a), n[mt] = t, n[xt] = e, yt(n, a, e), rt(n), t.stateNode = n) : t.memoizedState = nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return wt(t), e === null && _e && (n = t.stateNode = em(t.type, t.pendingProps, we.current), ht = t, Jt = true, l = Ke, Ia(t.type) ? (Bo = l, Ke = $t(n.firstChild)) : Ke = l), gt(e, t, t.pendingProps.children, a), Pi(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && _e && ((l = n = Ke) && (n = Sg(n, t.type, t.pendingProps, Jt), n !== null ? (t.stateNode = n, ht = t, Ke = $t(n.firstChild), Jt = false, l = true) : l = false), l || ka(t)), wt(t), l = t.type, s = t.pendingProps, o = e !== null ? e.memoizedProps : null, n = s.children, Uo(l, s) ? n = null : o !== null && Uo(l, o) && (t.flags |= 32), t.memoizedState !== null && (l = _c(e, t, Op, null, null, a), ii._currentValue = l), Pi(e, t), gt(e, t, n, a), t.child;
        case 6:
          return e === null && _e && ((e = a = Ke) && (a = wg(a, t.pendingProps, Jt), a !== null ? (t.stateNode = a, ht = t, Ke = null, e = true) : e = false), e || ka(t)), null;
        case 13:
          return Yd(e, t, a);
        case 4:
          return ot(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = xn(t, null, n, a) : gt(e, t, n, a), t.child;
        case 11:
          return Dd(e, t, t.type, t.pendingProps, a);
        case 7:
          return gt(e, t, t.pendingProps, a), t.child;
        case 8:
          return gt(e, t, t.pendingProps.children, a), t.child;
        case 12:
          return gt(e, t, t.pendingProps.children, a), t.child;
        case 10:
          return n = t.pendingProps, qa(t, t.type, n.value), gt(e, t, n.children, a), t.child;
        case 9:
          return l = t.type._context, n = t.pendingProps.children, vn(t), l = pt(l), n = n(l), t.flags |= 1, gt(e, t, n, a), t.child;
        case 14:
          return Ud(e, t, t.type, t.pendingProps, a);
        case 15:
          return Od(e, t, t.type, t.pendingProps, a);
        case 19:
          return Xd(e, t, a);
        case 31:
          return Qp(e, t, a);
        case 22:
          return Ld(e, t, a, t.pendingProps);
        case 24:
          return vn(t), n = pt(lt), e === null ? (l = xc(), l === null && (l = Xe, s = Sc(), l.pooledCache = s, s.refCount++, s !== null && (l.pooledCacheLanes |= a), l = s), t.memoizedState = {
            parent: n,
            cache: l
          }, jc(t), qa(t, lt, l)) : ((e.lanes & a) !== 0 && (Ac(e, t), Bl(t, null, null, a), ql()), l = e.memoizedState, s = t.memoizedState, l.parent !== n ? (l = {
            parent: n,
            cache: n
          }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), qa(t, lt, n)) : (n = s.cache, qa(t, lt, n), n !== l.cache && bc(t, [
            lt
          ], a, true))), gt(e, t, t.pendingProps.children, a), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(r(156, t.tag));
    }
    function wa(e) {
      e.flags |= 4;
    }
    function so(e, t, a, n, l) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (l & 335544128) === l) if (e.stateNode.complete) e.flags |= 8192;
        else if (bf()) e.flags |= 8192;
        else throw wn = qi, Mc;
      } else e.flags &= -16777217;
    }
    function Zd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !om(t)) if (bf()) e.flags |= 8192;
      else throw wn = qi, Mc;
    }
    function ts(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Au() : 536870912, e.lanes |= t, sl |= t);
    }
    function Vl(e, t) {
      if (!_e) switch (e.tailMode) {
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
      if (t) for (var l = e.child; l !== null; ) a |= l.lanes | l.childLanes, n |= l.subtreeFlags & 65011712, n |= l.flags & 65011712, l.return = e, l = l.sibling;
      else for (l = e.child; l !== null; ) a |= l.lanes | l.childLanes, n |= l.subtreeFlags, n |= l.flags, l.return = e, l = l.sibling;
      return e.subtreeFlags |= n, e.childLanes = a, t;
    }
    function Vp(e, t, a) {
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
          return Je(t), null;
        case 1:
          return Je(t), null;
        case 3:
          return a = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ya(lt), Ve(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Kn(t) ? wa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gc())), Je(t), null;
        case 26:
          var l = t.type, s = t.memoizedState;
          return e === null ? (wa(t), s !== null ? (Je(t), Zd(t, s)) : (Je(t), so(t, l, null, n, a))) : s ? s !== e.memoizedState ? (wa(t), Je(t), Zd(t, s)) : (Je(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && wa(t), Je(t), so(t, l, e, n, a)), null;
        case 27:
          if (ua(t), a = we.current, l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && wa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Je(t), null;
            }
            e = te.current, Kn(t) ? Ar(t) : (e = em(l, n, a), t.stateNode = e, wa(t));
          }
          return Je(t), null;
        case 5:
          if (ua(t), l = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && wa(t);
          else {
            if (!n) {
              if (t.stateNode === null) throw Error(r(166));
              return Je(t), null;
            }
            if (s = te.current, Kn(t)) Ar(t);
            else {
              var o = gs(we.current);
              switch (s) {
                case 1:
                  s = o.createElementNS("http://www.w3.org/2000/svg", l);
                  break;
                case 2:
                  s = o.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                  break;
                default:
                  switch (l) {
                    case "svg":
                      s = o.createElementNS("http://www.w3.org/2000/svg", l);
                      break;
                    case "math":
                      s = o.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                      break;
                    case "script":
                      s = o.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(s.firstChild);
                      break;
                    case "select":
                      s = typeof n.is == "string" ? o.createElement("select", {
                        is: n.is
                      }) : o.createElement("select"), n.multiple ? s.multiple = true : n.size && (s.size = n.size);
                      break;
                    default:
                      s = typeof n.is == "string" ? o.createElement(l, {
                        is: n.is
                      }) : o.createElement(l);
                  }
              }
              s[mt] = t, s[xt] = n;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6) s.appendChild(o.stateNode);
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
              t.stateNode = s;
              e: switch (yt(s, l, n), l) {
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
              n && wa(t);
            }
          }
          return Je(t), so(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== n && wa(t);
          else {
            if (typeof n != "string" && t.stateNode === null) throw Error(r(166));
            if (e = we.current, Kn(t)) {
              if (e = t.stateNode, a = t.memoizedProps, n = null, l = ht, l !== null) switch (l.tag) {
                case 27:
                case 5:
                  n = l.memoizedProps;
              }
              e[mt] = t, e = !!(e.nodeValue === a || n !== null && n.suppressHydrationWarning === true || Qf(e.nodeValue, a)), e || ka(t, true);
            } else e = gs(e).createTextNode(n), e[mt] = t, t.stateNode = e;
          }
          return Je(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (n = Kn(t), a !== null) {
              if (e === null) {
                if (!n) throw Error(r(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
                e[mt] = t;
              } else gn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Je(t), e = false;
            } else a = gc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = true;
            if (!e) return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
            if ((t.flags & 128) !== 0) throw Error(r(558));
          }
          return Je(t), null;
        case 13:
          if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (l = Kn(t), n !== null && n.dehydrated !== null) {
              if (e === null) {
                if (!l) throw Error(r(318));
                if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(317));
                l[mt] = t;
              } else gn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Je(t), l = false;
            } else l = gc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = true;
            if (!l) return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
          }
          return Ot(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = n !== null, e = e !== null && e.memoizedState !== null, a && (n = t.child, l = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (l = n.alternate.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== l && (n.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), ts(t, t.updateQueue), Je(t), null);
        case 4:
          return Ve(), e === null && Ro(t.stateNode.containerInfo), Je(t), null;
        case 10:
          return ya(t.type), Je(t), null;
        case 19:
          if (G(et), n = t.memoizedState, n === null) return Je(t), null;
          if (l = (t.flags & 128) !== 0, s = n.rendering, s === null) if (l) Vl(n, false);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (s = Yi(e), s !== null) {
                for (t.flags |= 128, Vl(n, false), e = s.updateQueue, t.updateQueue = e, ts(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; ) Sr(a, e), a = a.sibling;
                return I(et, et.current & 1 | 2), _e && pa(t, n.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            n.tail !== null && X() > ss && (t.flags |= 128, l = true, Vl(n, false), t.lanes = 4194304);
          }
          else {
            if (!l) if (e = Yi(s), e !== null) {
              if (t.flags |= 128, l = true, e = e.updateQueue, t.updateQueue = e, ts(t, e), Vl(n, true), n.tail === null && n.tailMode === "hidden" && !s.alternate && !_e) return Je(t), null;
            } else 2 * X() - n.renderingStartTime > ss && a !== 536870912 && (t.flags |= 128, l = true, Vl(n, false), t.lanes = 4194304);
            n.isBackwards ? (s.sibling = t.child, t.child = s) : (e = n.last, e !== null ? e.sibling = s : t.child = s, n.last = s);
          }
          return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = X(), e.sibling = null, a = et.current, I(et, l ? a & 1 | 2 : a & 1), _e && pa(t, n.treeForkCount), e) : (Je(t), null);
        case 22:
        case 23:
          return Ot(t), Rc(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Je(t), a = t.updateQueue, a !== null && ts(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== a && (t.flags |= 2048), e !== null && G(bn), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ya(lt), Je(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function Zp(e, t) {
      switch (hc(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return ya(lt), Ve(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return ua(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (Ot(t), t.alternate === null) throw Error(r(340));
            gn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (Ot(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(r(340));
            gn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return G(et), null;
        case 4:
          return Ve(), null;
        case 10:
          return ya(t.type), null;
        case 22:
        case 23:
          return Ot(t), Rc(), e !== null && G(bn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return ya(lt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Kd(e, t) {
      switch (hc(t), t.tag) {
        case 3:
          ya(lt), Ve();
          break;
        case 26:
        case 27:
        case 5:
          ua(t);
          break;
        case 4:
          Ve();
          break;
        case 31:
          t.memoizedState !== null && Ot(t);
          break;
        case 13:
          Ot(t);
          break;
        case 19:
          G(et);
          break;
        case 10:
          ya(t.type);
          break;
        case 22:
        case 23:
          Ot(t), Rc(), e !== null && G(bn);
          break;
        case 24:
          ya(lt);
      }
    }
    function Zl(e, t) {
      try {
        var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var l = n.next;
          a = l;
          do {
            if ((a.tag & e) === e) {
              n = void 0;
              var s = a.create, o = a.inst;
              n = s(), o.destroy = n;
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
              var o = n.inst, d = o.destroy;
              if (d !== void 0) {
                o.destroy = void 0, l = t;
                var g = a, N = d;
                try {
                  N();
                } catch (k) {
                  Be(l, g, k);
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
    function Jd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        try {
          qr(t, a);
        } catch (n) {
          Be(e, e.return, n);
        }
      }
    }
    function Fd(e, t, a) {
      a.props = jn(e.type, e.memoizedProps), a.state = e.memoizedState;
      try {
        a.componentWillUnmount();
      } catch (n) {
        Be(e, t, n);
      }
    }
    function Kl(e, t) {
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
    function ia(e, t) {
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
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    function co(e, t, a) {
      try {
        var n = e.stateNode;
        hg(n, e.type, a, t), n[xt] = t;
      } catch (l) {
        Be(e, e.return, l);
      }
    }
    function Id(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ia(e.type) || e.tag === 4;
    }
    function oo(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Id(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Ia(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function uo(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = fa));
      else if (n !== 4 && (n === 27 && Ia(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null)) for (uo(e, t, a), e = e.sibling; e !== null; ) uo(e, t, a), e = e.sibling;
    }
    function as(e, t, a) {
      var n = e.tag;
      if (n === 5 || n === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (n !== 4 && (n === 27 && Ia(e.type) && (a = e.stateNode), e = e.child, e !== null)) for (as(e, t, a), e = e.sibling; e !== null; ) as(e, t, a), e = e.sibling;
    }
    function Wd(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        for (var n = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
        yt(t, n, a), t[mt] = e, t[xt] = a;
      } catch (s) {
        Be(e, e.return, s);
      }
    }
    var xa = false, ct = false, ro = false, Pd = typeof WeakSet == "function" ? WeakSet : Set, dt = null;
    function Kp(e, t) {
      if (e = e.containerInfo, _o = Ms, e = dr(e), nc(e)) {
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
            var o = 0, d = -1, g = -1, N = 0, k = 0, Q = e, T = null;
            t: for (; ; ) {
              for (var U; Q !== a || l !== 0 && Q.nodeType !== 3 || (d = o + l), Q !== s || n !== 0 && Q.nodeType !== 3 || (g = o + n), Q.nodeType === 3 && (o += Q.nodeValue.length), (U = Q.firstChild) !== null; ) T = Q, Q = U;
              for (; ; ) {
                if (Q === e) break t;
                if (T === a && ++N === l && (d = o), T === s && ++k === n && (g = o), (U = Q.nextSibling) !== null) break;
                Q = T, T = Q.parentNode;
              }
              Q = U;
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
      }, Ms = false, dt = t; dt !== null; ) if (t = dt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, dt = e;
      else for (; dt !== null; ) {
        switch (t = dt, s = t.alternate, e = t.flags, t.tag) {
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
                var ie = jn(a.type, l);
                e = n.getSnapshotBeforeUpdate(ie, s), n.__reactInternalSnapshotBeforeUpdate = e;
              } catch (me) {
                Be(a, a.return, me);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Lo(e);
              else if (a === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Lo(e);
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
          e.return = t.return, dt = e;
          break;
        }
        dt = t.return;
      }
    }
    function ef(e, t, a) {
      var n = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ja(e, a), n & 4 && Zl(5, a);
          break;
        case 1:
          if (ja(e, a), n & 4) if (e = a.stateNode, t === null) try {
            e.componentDidMount();
          } catch (o) {
            Be(a, a.return, o);
          }
          else {
            var l = jn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              Be(a, a.return, o);
            }
          }
          n & 64 && Jd(a), n & 512 && Kl(a, a.return);
          break;
        case 3:
          if (ja(e, a), n & 64 && (e = a.updateQueue, e !== null)) {
            if (t = null, a.child !== null) switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
            try {
              qr(e, t);
            } catch (o) {
              Be(a, a.return, o);
            }
          }
          break;
        case 27:
          t === null && n & 4 && Wd(a);
        case 26:
        case 5:
          ja(e, a), t === null && n & 4 && $d(a), n & 512 && Kl(a, a.return);
          break;
        case 12:
          ja(e, a);
          break;
        case 31:
          ja(e, a), n & 4 && nf(e, a);
          break;
        case 13:
          ja(e, a), n & 4 && lf(e, a), n & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = ag.bind(null, a), xg(e, a))));
          break;
        case 22:
          if (n = a.memoizedState !== null || xa, !n) {
            t = t !== null && t.memoizedState !== null || ct, l = xa;
            var s = ct;
            xa = n, (ct = t) && !s ? Aa(e, a, (a.subtreeFlags & 8772) !== 0) : ja(e, a), xa = l, ct = s;
          }
          break;
        case 30:
          break;
        default:
          ja(e, a);
      }
    }
    function tf(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, tf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Hs(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var Fe = null, jt = false;
    function Ma(e, t, a) {
      for (a = a.child; a !== null; ) af(e, t, a), a = a.sibling;
    }
    function af(e, t, a) {
      if (Tt && typeof Tt.onCommitFiberUnmount == "function") try {
        Tt.onCommitFiberUnmount(yl, a);
      } catch {
      }
      switch (a.tag) {
        case 26:
          ct || ia(a, t), Ma(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          ct || ia(a, t);
          var n = Fe, l = jt;
          Ia(a.type) && (Fe = a.stateNode, jt = false), Ma(e, t, a), ai(a.stateNode), Fe = n, jt = l;
          break;
        case 5:
          ct || ia(a, t);
        case 6:
          if (n = Fe, l = jt, Fe = null, Ma(e, t, a), Fe = n, jt = l, Fe !== null) if (jt) try {
            (Fe.nodeType === 9 ? Fe.body : Fe.nodeName === "HTML" ? Fe.ownerDocument.body : Fe).removeChild(a.stateNode);
          } catch (s) {
            Be(a, t, s);
          }
          else try {
            Fe.removeChild(a.stateNode);
          } catch (s) {
            Be(a, t, s);
          }
          break;
        case 18:
          Fe !== null && (jt ? (e = Fe, Ff(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), hl(e)) : Ff(Fe, a.stateNode));
          break;
        case 4:
          n = Fe, l = jt, Fe = a.stateNode.containerInfo, jt = true, Ma(e, t, a), Fe = n, jt = l;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Xa(2, a, t), ct || Xa(4, a, t), Ma(e, t, a);
          break;
        case 1:
          ct || (ia(a, t), n = a.stateNode, typeof n.componentWillUnmount == "function" && Fd(a, t, n)), Ma(e, t, a);
          break;
        case 21:
          Ma(e, t, a);
          break;
        case 22:
          ct = (n = ct) || a.memoizedState !== null, Ma(e, t, a), ct = n;
          break;
        default:
          Ma(e, t, a);
      }
    }
    function nf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          hl(e);
        } catch (a) {
          Be(t, t.return, a);
        }
      }
    }
    function lf(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        hl(e);
      } catch (a) {
        Be(t, t.return, a);
      }
    }
    function Jp(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Pd()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Pd()), t;
        default:
          throw Error(r(435, e.tag));
      }
    }
    function ns(e, t) {
      var a = Jp(e);
      t.forEach(function(n) {
        if (!a.has(n)) {
          a.add(n);
          var l = ng.bind(null, e, n);
          n.then(l, l);
        }
      });
    }
    function At(e, t) {
      var a = t.deletions;
      if (a !== null) for (var n = 0; n < a.length; n++) {
        var l = a[n], s = e, o = t, d = o;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Ia(d.type)) {
                Fe = d.stateNode, jt = false;
                break e;
              }
              break;
            case 5:
              Fe = d.stateNode, jt = false;
              break e;
            case 3:
            case 4:
              Fe = d.stateNode.containerInfo, jt = true;
              break e;
          }
          d = d.return;
        }
        if (Fe === null) throw Error(r(160));
        af(s, o, l), Fe = null, jt = false, s = l.alternate, s !== null && (s.return = null), l.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) sf(t, e), t = t.sibling;
    }
    var ta = null;
    function sf(e, t) {
      var a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          At(t, e), Et(e), n & 4 && (Xa(3, e, e.return), Zl(3, e), Xa(5, e, e.return));
          break;
        case 1:
          At(t, e), Et(e), n & 512 && (ct || a === null || ia(a, a.return)), n & 64 && xa && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
          break;
        case 26:
          var l = ta;
          if (At(t, e), Et(e), n & 512 && (ct || a === null || ia(a, a.return)), n & 4) {
            var s = a !== null ? a.memoizedState : null;
            if (n = e.memoizedState, a === null) if (n === null) if (e.stateNode === null) {
              e: {
                n = e.type, a = e.memoizedProps, l = l.ownerDocument || l;
                t: switch (n) {
                  case "title":
                    s = l.getElementsByTagName("title")[0], (!s || s[Sl] || s[mt] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = l.createElement(n), l.head.insertBefore(s, l.querySelector("head > title"))), yt(s, n, a), s[mt] = e, rt(s), n = s;
                    break e;
                  case "link":
                    var o = sm("link", "href", l).get(n + (a.href || ""));
                    if (o) {
                      for (var d = 0; d < o.length; d++) if (s = o[d], s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && s.getAttribute("rel") === (a.rel == null ? null : a.rel) && s.getAttribute("title") === (a.title == null ? null : a.title) && s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    s = l.createElement(n), yt(s, n, a), l.head.appendChild(s);
                    break;
                  case "meta":
                    if (o = sm("meta", "content", l).get(n + (a.content || ""))) {
                      for (d = 0; d < o.length; d++) if (s = o[d], s.getAttribute("content") === (a.content == null ? null : "" + a.content) && s.getAttribute("name") === (a.name == null ? null : a.name) && s.getAttribute("property") === (a.property == null ? null : a.property) && s.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && s.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                        o.splice(d, 1);
                        break t;
                      }
                    }
                    s = l.createElement(n), yt(s, n, a), l.head.appendChild(s);
                    break;
                  default:
                    throw Error(r(468, n));
                }
                s[mt] = e, rt(s), n = s;
              }
              e.stateNode = n;
            } else cm(l, e.type, e.stateNode);
            else e.stateNode = im(l, n, e.memoizedProps);
            else s !== n ? (s === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : s.count--, n === null ? cm(l, e.type, e.stateNode) : im(l, n, e.memoizedProps)) : n === null && e.stateNode !== null && co(e, e.memoizedProps, a.memoizedProps);
          }
          break;
        case 27:
          At(t, e), Et(e), n & 512 && (ct || a === null || ia(a, a.return)), a !== null && n & 4 && co(e, e.memoizedProps, a.memoizedProps);
          break;
        case 5:
          if (At(t, e), Et(e), n & 512 && (ct || a === null || ia(a, a.return)), e.flags & 32) {
            l = e.stateNode;
            try {
              kn(l, "");
            } catch (ie) {
              Be(e, e.return, ie);
            }
          }
          n & 4 && e.stateNode != null && (l = e.memoizedProps, co(e, l, a !== null ? a.memoizedProps : l)), n & 1024 && (ro = true);
          break;
        case 6:
          if (At(t, e), Et(e), n & 4) {
            if (e.stateNode === null) throw Error(r(162));
            n = e.memoizedProps, a = e.stateNode;
            try {
              a.nodeValue = n;
            } catch (ie) {
              Be(e, e.return, ie);
            }
          }
          break;
        case 3:
          if (bs = null, l = ta, ta = ys(t.containerInfo), At(t, e), ta = l, Et(e), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
            hl(t.containerInfo);
          } catch (ie) {
            Be(e, e.return, ie);
          }
          ro && (ro = false, cf(e));
          break;
        case 4:
          n = ta, ta = ys(e.stateNode.containerInfo), At(t, e), Et(e), ta = n;
          break;
        case 12:
          At(t, e), Et(e);
          break;
        case 31:
          At(t, e), Et(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ns(e, n)));
          break;
        case 13:
          At(t, e), Et(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (is = X()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ns(e, n)));
          break;
        case 22:
          l = e.memoizedState !== null;
          var g = a !== null && a.memoizedState !== null, N = xa, k = ct;
          if (xa = N || l, ct = k || g, At(t, e), ct = k, xa = N, Et(e), n & 8192) e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (a === null || g || xa || ct || An(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                g = a = t;
                try {
                  if (s = g.stateNode, l) o = s.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    d = g.stateNode;
                    var Q = g.memoizedProps.style, T = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    d.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (ie) {
                  Be(g, g.return, ie);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = l ? "" : g.memoizedProps;
                } catch (ie) {
                  Be(g, g.return, ie);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                g = t;
                try {
                  var U = g.stateNode;
                  l ? $f(U, true) : $f(g.stateNode, false);
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
          n & 4 && (n = e.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, ns(e, a))));
          break;
        case 19:
          At(t, e), Et(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, ns(e, n)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          At(t, e), Et(e);
      }
    }
    function Et(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var a, n = e.return; n !== null; ) {
            if (Id(n)) {
              a = n;
              break;
            }
            n = n.return;
          }
          if (a == null) throw Error(r(160));
          switch (a.tag) {
            case 27:
              var l = a.stateNode, s = oo(e);
              as(e, s, l);
              break;
            case 5:
              var o = a.stateNode;
              a.flags & 32 && (kn(o, ""), a.flags &= -33);
              var d = oo(e);
              as(e, d, o);
              break;
            case 3:
            case 4:
              var g = a.stateNode.containerInfo, N = oo(e);
              uo(e, N, g);
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
    function cf(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        cf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function ja(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) ef(e, t.alternate, t), t = t.sibling;
    }
    function An(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Xa(4, t, t.return), An(t);
            break;
          case 1:
            ia(t, t.return);
            var a = t.stateNode;
            typeof a.componentWillUnmount == "function" && Fd(t, t.return, a), An(t);
            break;
          case 27:
            ai(t.stateNode);
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
    function Aa(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var n = t.alternate, l = e, s = t, o = s.flags;
        switch (s.tag) {
          case 0:
          case 11:
          case 15:
            Aa(l, s, a), Zl(4, s);
            break;
          case 1:
            if (Aa(l, s, a), n = s, l = n.stateNode, typeof l.componentDidMount == "function") try {
              l.componentDidMount();
            } catch (N) {
              Be(n, n.return, N);
            }
            if (n = s, l = n.updateQueue, l !== null) {
              var d = n.stateNode;
              try {
                var g = l.shared.hiddenCallbacks;
                if (g !== null) for (l.shared.hiddenCallbacks = null, l = 0; l < g.length; l++) kr(g[l], d);
              } catch (N) {
                Be(n, n.return, N);
              }
            }
            a && o & 64 && Jd(s), Kl(s, s.return);
            break;
          case 27:
            Wd(s);
          case 26:
          case 5:
            Aa(l, s, a), a && n === null && o & 4 && $d(s), Kl(s, s.return);
            break;
          case 12:
            Aa(l, s, a);
            break;
          case 31:
            Aa(l, s, a), a && o & 4 && nf(l, s);
            break;
          case 13:
            Aa(l, s, a), a && o & 4 && lf(l, s);
            break;
          case 22:
            s.memoizedState === null && Aa(l, s, a), Kl(s, s.return);
            break;
          case 30:
            break;
          default:
            Aa(l, s, a);
        }
        t = t.sibling;
      }
    }
    function fo(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Dl(a));
    }
    function mo(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Dl(e));
    }
    function aa(e, t, a, n) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) of(e, t, a, n), t = t.sibling;
    }
    function of(e, t, a, n) {
      var l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          aa(e, t, a, n), l & 2048 && Zl(9, t);
          break;
        case 1:
          aa(e, t, a, n);
          break;
        case 3:
          aa(e, t, a, n), l & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Dl(e)));
          break;
        case 12:
          if (l & 2048) {
            aa(e, t, a, n), e = t.stateNode;
            try {
              var s = t.memoizedProps, o = s.id, d = s.onPostCommit;
              typeof d == "function" && d(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            } catch (g) {
              Be(t, t.return, g);
            }
          } else aa(e, t, a, n);
          break;
        case 31:
          aa(e, t, a, n);
          break;
        case 13:
          aa(e, t, a, n);
          break;
        case 23:
          break;
        case 22:
          s = t.stateNode, o = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? aa(e, t, a, n) : Jl(e, t) : s._visibility & 2 ? aa(e, t, a, n) : (s._visibility |= 2, nl(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || false)), l & 2048 && fo(o, t);
          break;
        case 24:
          aa(e, t, a, n), l & 2048 && mo(t.alternate, t);
          break;
        default:
          aa(e, t, a, n);
      }
    }
    function nl(e, t, a, n, l) {
      for (l = l && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var s = e, o = t, d = a, g = n, N = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            nl(s, o, d, g, l), Zl(8, o);
            break;
          case 23:
            break;
          case 22:
            var k = o.stateNode;
            o.memoizedState !== null ? k._visibility & 2 ? nl(s, o, d, g, l) : Jl(s, o) : (k._visibility |= 2, nl(s, o, d, g, l)), l && N & 2048 && fo(o.alternate, o);
            break;
          case 24:
            nl(s, o, d, g, l), l && N & 2048 && mo(o.alternate, o);
            break;
          default:
            nl(s, o, d, g, l);
        }
        t = t.sibling;
      }
    }
    function Jl(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var a = e, n = t, l = n.flags;
        switch (n.tag) {
          case 22:
            Jl(a, n), l & 2048 && fo(n.alternate, n);
            break;
          case 24:
            Jl(a, n), l & 2048 && mo(n.alternate, n);
            break;
          default:
            Jl(a, n);
        }
        t = t.sibling;
      }
    }
    var Fl = 8192;
    function ll(e, t, a) {
      if (e.subtreeFlags & Fl) for (e = e.child; e !== null; ) uf(e, t, a), e = e.sibling;
    }
    function uf(e, t, a) {
      switch (e.tag) {
        case 26:
          ll(e, t, a), e.flags & Fl && e.memoizedState !== null && Ug(a, ta, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          ll(e, t, a);
          break;
        case 3:
        case 4:
          var n = ta;
          ta = ys(e.stateNode.containerInfo), ll(e, t, a), ta = n;
          break;
        case 22:
          e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Fl, Fl = 16777216, ll(e, t, a), Fl = n) : ll(e, t, a));
          break;
        default:
          ll(e, t, a);
      }
    }
    function rf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function $l(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, ff(n, e);
        }
        rf(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) df(e), e = e.sibling;
    }
    function df(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          $l(e), e.flags & 2048 && Xa(9, e, e.return);
          break;
        case 3:
          $l(e);
          break;
        case 12:
          $l(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ls(e)) : $l(e);
          break;
        default:
          $l(e);
      }
    }
    function ls(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var a = 0; a < t.length; a++) {
          var n = t[a];
          dt = n, ff(n, e);
        }
        rf(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            Xa(8, t, t.return), ls(t);
            break;
          case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, ls(t));
            break;
          default:
            ls(t);
        }
        e = e.sibling;
      }
    }
    function ff(e, t) {
      for (; dt !== null; ) {
        var a = dt;
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
            Dl(a.memoizedState.cache);
        }
        if (n = a.child, n !== null) n.return = a, dt = n;
        else e: for (a = e; dt !== null; ) {
          n = dt;
          var l = n.sibling, s = n.return;
          if (tf(n), n === a) {
            dt = null;
            break e;
          }
          if (l !== null) {
            l.return = s, dt = l;
            break e;
          }
          dt = s;
        }
      }
    }
    var Fp = {
      getCacheForType: function(e) {
        var t = pt(lt), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return pt(lt).controller.signal;
      }
    }, $p = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Xe = null, Ee = null, Ne = 0, qe = 0, Lt = null, Va = false, il = false, ho = false, Ea = 0, We = 0, Za = 0, En = 0, po = 0, kt = 0, sl = 0, Il = null, Ct = null, go = false, is = 0, mf = 0, ss = 1 / 0, cs = null, Ka = null, ut = 0, Ja = null, cl = null, Ca = 0, yo = 0, vo = null, hf = null, Wl = 0, bo = null;
    function qt() {
      return (Le & 2) !== 0 && Ne !== 0 ? Ne & -Ne : S.T !== null ? Ao() : Ru();
    }
    function pf() {
      if (kt === 0) if ((Ne & 536870912) === 0 || _e) {
        var e = pi;
        pi <<= 1, (pi & 3932160) === 0 && (pi = 262144), kt = e;
      } else kt = 536870912;
      return e = Ut.current, e !== null && (e.flags |= 32), kt;
    }
    function Nt(e, t, a) {
      (e === Xe && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) && (ol(e, 0), Fa(e, Ne, kt, false)), bl(e, a), ((Le & 2) === 0 || e !== Xe) && (e === Xe && ((Le & 2) === 0 && (En |= a), We === 4 && Fa(e, Ne, kt, false)), sa(e));
    }
    function gf(e, t, a) {
      if ((Le & 6) !== 0) throw Error(r(327));
      var n = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || vl(e, t), l = n ? Pp(e, t) : wo(e, t, true), s = n;
      do {
        if (l === 0) {
          il && !n && Fa(e, t, 0, false);
          break;
        } else {
          if (a = e.current.alternate, s && !Ip(a)) {
            l = wo(e, t, false), s = false;
            continue;
          }
          if (l === 2) {
            if (s = t, e.errorRecoveryDisabledLanes & s) var o = 0;
            else o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
            if (o !== 0) {
              t = o;
              e: {
                var d = e;
                l = Il;
                var g = d.current.memoizedState.isDehydrated;
                if (g && (ol(d, o).flags |= 256), o = wo(d, o, false), o !== 2) {
                  if (ho && !g) {
                    d.errorRecoveryDisabledLanes |= s, En |= s, l = 4;
                    break e;
                  }
                  s = Ct, Ct = l, s !== null && (Ct === null ? Ct = s : Ct.push.apply(Ct, s));
                }
                l = o;
              }
              if (s = false, l !== 2) continue;
            }
          }
          if (l === 1) {
            ol(e, 0), Fa(e, t, 0, true);
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
                Fa(n, t, kt, !Va);
                break e;
              case 2:
                Ct = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(r(329));
            }
            if ((t & 62914560) === t && (l = is + 300 - X(), 10 < l)) {
              if (Fa(n, t, kt, !Va), yi(n, 0, true) !== 0) break e;
              Ca = t, n.timeoutHandle = Kf(yf.bind(null, n, a, Ct, cs, go, t, kt, En, sl, Va, s, "Throttled", -0, 0), l);
              break e;
            }
            yf(n, a, Ct, cs, go, t, kt, En, sl, Va, s, null, -0, 0);
          }
        }
        break;
      } while (true);
      sa(e);
    }
    function yf(e, t, a, n, l, s, o, d, g, N, k, Q, T, U) {
      if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
        Q = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: fa
        }, uf(t, s, Q);
        var ie = (s & 62914560) === s ? is - X() : (s & 4194048) === s ? mf - X() : 0;
        if (ie = Og(Q, ie), ie !== null) {
          Ca = s, e.cancelPendingCommit = ie(Af.bind(null, e, t, s, a, n, l, o, d, g, k, Q, null, T, U)), Fa(e, s, o, !N);
          return;
        }
      }
      Af(e, t, s, a, n, l, o, d, g);
    }
    function Ip(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) for (var n = 0; n < a.length; n++) {
          var l = a[n], s = l.getSnapshot;
          l = l.value;
          try {
            if (!_t(s(), l)) return false;
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
    function Fa(e, t, a, n) {
      t &= ~po, t &= ~En, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
      for (var l = t; 0 < l; ) {
        var s = 31 - zt(l), o = 1 << s;
        n[s] = -1, l &= ~o;
      }
      a !== 0 && Eu(e, a, t);
    }
    function os() {
      return (Le & 6) === 0 ? (Pl(0), false) : true;
    }
    function So() {
      if (Ee !== null) {
        if (qe === 0) var e = Ee.return;
        else e = Ee, ga = yn = null, Oc(e), Wn = null, Ol = 0, e = Ee;
        for (; e !== null; ) Kd(e.alternate, e), e = e.return;
        Ee = null;
      }
    }
    function ol(e, t) {
      var a = e.timeoutHandle;
      a !== -1 && (e.timeoutHandle = -1, yg(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ca = 0, So(), Xe = e, Ee = a = ha(e.current, null), Ne = t, qe = 0, Lt = null, Va = false, il = vl(e, t), ho = false, sl = kt = po = En = Za = We = 0, Ct = Il = null, go = false, (t & 8) !== 0 && (t |= t & 32);
      var n = e.entangledLanes;
      if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - zt(n), s = 1 << l;
        t |= e[l], n &= ~s;
      }
      return Ea = t, Ri(), a;
    }
    function vf(e, t) {
      xe = null, S.H = Ql, t === In || t === ki ? (t = Dr(), qe = 3) : t === Mc ? (t = Dr(), qe = 4) : qe = t === Ic ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Lt = t, Ee === null && (We = 1, Ii(e, Vt(t, e.current)));
    }
    function bf() {
      var e = Ut.current;
      return e === null ? true : (Ne & 4194048) === Ne ? Ft === null : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0 ? e === Ft : false;
    }
    function Sf() {
      var e = S.H;
      return S.H = Ql, e === null ? Ql : e;
    }
    function wf() {
      var e = S.A;
      return S.A = Fp, e;
    }
    function us() {
      We = 4, Va || (Ne & 4194048) !== Ne && Ut.current !== null || (il = true), (Za & 134217727) === 0 && (En & 134217727) === 0 || Xe === null || Fa(Xe, Ne, kt, false);
    }
    function wo(e, t, a) {
      var n = Le;
      Le |= 2;
      var l = Sf(), s = wf();
      (Xe !== e || Ne !== t) && (cs = null, ol(e, t)), t = false;
      var o = We;
      e: do
        try {
          if (qe !== 0 && Ee !== null) {
            var d = Ee, g = Lt;
            switch (qe) {
              case 8:
                So(), o = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                Ut.current === null && (t = true);
                var N = qe;
                if (qe = 0, Lt = null, ul(e, d, g, N), a && il) {
                  o = 0;
                  break e;
                }
                break;
              default:
                N = qe, qe = 0, Lt = null, ul(e, d, g, N);
            }
          }
          Wp(), o = We;
          break;
        } catch (k) {
          vf(e, k);
        }
      while (true);
      return t && e.shellSuspendCounter++, ga = yn = null, Le = n, S.H = l, S.A = s, Ee === null && (Xe = null, Ne = 0, Ri()), o;
    }
    function Wp() {
      for (; Ee !== null; ) xf(Ee);
    }
    function Pp(e, t) {
      var a = Le;
      Le |= 2;
      var n = Sf(), l = wf();
      Xe !== e || Ne !== t ? (cs = null, ss = X() + 500, ol(e, t)) : il = vl(e, t);
      e: do
        try {
          if (qe !== 0 && Ee !== null) {
            t = Ee;
            var s = Lt;
            t: switch (qe) {
              case 1:
                qe = 0, Lt = null, ul(e, t, s, 1);
                break;
              case 2:
              case 9:
                if (zr(s)) {
                  qe = 0, Lt = null, Mf(t);
                  break;
                }
                t = function() {
                  qe !== 2 && qe !== 9 || Xe !== e || (qe = 7), sa(e);
                }, s.then(t, t);
                break e;
              case 3:
                qe = 7;
                break e;
              case 4:
                qe = 5;
                break e;
              case 7:
                zr(s) ? (qe = 0, Lt = null, Mf(t)) : (qe = 0, Lt = null, ul(e, t, s, 7));
                break;
              case 5:
                var o = null;
                switch (Ee.tag) {
                  case 26:
                    o = Ee.memoizedState;
                  case 5:
                  case 27:
                    var d = Ee;
                    if (o ? om(o) : d.stateNode.complete) {
                      qe = 0, Lt = null;
                      var g = d.sibling;
                      if (g !== null) Ee = g;
                      else {
                        var N = d.return;
                        N !== null ? (Ee = N, rs(N)) : Ee = null;
                      }
                      break t;
                    }
                }
                qe = 0, Lt = null, ul(e, t, s, 5);
                break;
              case 6:
                qe = 0, Lt = null, ul(e, t, s, 6);
                break;
              case 8:
                So(), We = 6;
                break e;
              default:
                throw Error(r(462));
            }
          }
          eg();
          break;
        } catch (k) {
          vf(e, k);
        }
      while (true);
      return ga = yn = null, S.H = n, S.A = l, Le = a, Ee !== null ? 0 : (Xe = null, Ne = 0, Ri(), We);
    }
    function eg() {
      for (; Ee !== null && !Z(); ) xf(Ee);
    }
    function xf(e) {
      var t = Vd(e.alternate, e, Ea);
      e.memoizedProps = e.pendingProps, t === null ? rs(e) : Ee = t;
    }
    function Mf(e) {
      var t = e, a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Bd(a, t, t.pendingProps, t.type, void 0, Ne);
          break;
        case 11:
          t = Bd(a, t, t.pendingProps, t.type.render, t.ref, Ne);
          break;
        case 5:
          Oc(t);
        default:
          Kd(a, t), t = Ee = Sr(t, Ea), t = Vd(a, t, Ea);
      }
      e.memoizedProps = e.pendingProps, t === null ? rs(e) : Ee = t;
    }
    function ul(e, t, a, n) {
      ga = yn = null, Oc(t), Wn = null, Ol = 0;
      var l = t.return;
      try {
        if (Yp(e, l, t, a, Ne)) {
          We = 1, Ii(e, Vt(a, e.current)), Ee = null;
          return;
        }
      } catch (s) {
        if (l !== null) throw Ee = l, s;
        We = 1, Ii(e, Vt(a, e.current)), Ee = null;
        return;
      }
      t.flags & 32768 ? (_e || n === 1 ? e = true : il || (Ne & 536870912) !== 0 ? e = false : (Va = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ut.current, n !== null && n.tag === 13 && (n.flags |= 16384))), jf(t, e)) : rs(t);
    }
    function rs(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          jf(t, Va);
          return;
        }
        e = t.return;
        var a = Vp(t.alternate, t, Ea);
        if (a !== null) {
          Ee = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ee = t;
          return;
        }
        Ee = t = e;
      } while (t !== null);
      We === 0 && (We = 5);
    }
    function jf(e, t) {
      do {
        var a = Zp(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Ee = a;
          return;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ee = e;
          return;
        }
        Ee = e = a;
      } while (e !== null);
      We = 6, Ee = null;
    }
    function Af(e, t, a, n, l, s, o, d, g) {
      e.cancelPendingCommit = null;
      do
        ds();
      while (ut !== 0);
      if ((Le & 6) !== 0) throw Error(r(327));
      if (t !== null) {
        if (t === e.current) throw Error(r(177));
        if (s = t.lanes | t.childLanes, s |= oc, Dh(e, a, s, o, d, g), e === Xe && (Ee = Xe = null, Ne = 0), cl = t, Ja = e, Ca = a, yo = s, vo = l, hf = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, lg(nt, function() {
          return Tf(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
          n = S.T, S.T = null, l = z.p, z.p = 2, o = Le, Le |= 4;
          try {
            Kp(e, t, a);
          } finally {
            Le = o, z.p = l, S.T = n;
          }
        }
        ut = 1, Ef(), Cf(), Nf();
      }
    }
    function Ef() {
      if (ut === 1) {
        ut = 0;
        var e = Ja, t = cl, a = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || a) {
          a = S.T, S.T = null;
          var n = z.p;
          z.p = 2;
          var l = Le;
          Le |= 4;
          try {
            sf(t, e);
            var s = Do, o = dr(e.containerInfo), d = s.focusedElem, g = s.selectionRange;
            if (o !== d && d && d.ownerDocument && rr(d.ownerDocument.documentElement, d)) {
              if (g !== null && nc(d)) {
                var N = g.start, k = g.end;
                if (k === void 0 && (k = N), "selectionStart" in d) d.selectionStart = N, d.selectionEnd = Math.min(k, d.value.length);
                else {
                  var Q = d.ownerDocument || document, T = Q && Q.defaultView || window;
                  if (T.getSelection) {
                    var U = T.getSelection(), ie = d.textContent.length, me = Math.min(g.start, ie), Ye = g.end === void 0 ? me : Math.min(g.end, ie);
                    !U.extend && me > Ye && (o = Ye, Ye = me, me = o);
                    var M = ur(d, me), b = ur(d, Ye);
                    if (M && b && (U.rangeCount !== 1 || U.anchorNode !== M.node || U.anchorOffset !== M.offset || U.focusNode !== b.node || U.focusOffset !== b.offset)) {
                      var C = Q.createRange();
                      C.setStart(M.node, M.offset), U.removeAllRanges(), me > Ye ? (U.addRange(C), U.extend(b.node, b.offset)) : (C.setEnd(b.node, b.offset), U.addRange(C));
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
                var Y = Q[d];
                Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
              }
            }
            Ms = !!_o, Do = _o = null;
          } finally {
            Le = l, z.p = n, S.T = a;
          }
        }
        e.current = t, ut = 2;
      }
    }
    function Cf() {
      if (ut === 2) {
        ut = 0;
        var e = Ja, t = cl, a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = S.T, S.T = null;
          var n = z.p;
          z.p = 2;
          var l = Le;
          Le |= 4;
          try {
            ef(e, t.alternate, t);
          } finally {
            Le = l, z.p = n, S.T = a;
          }
        }
        ut = 3;
      }
    }
    function Nf() {
      if (ut === 4 || ut === 3) {
        ut = 0, ne();
        var e = Ja, t = cl, a = Ca, n = hf;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ut = 5 : (ut = 0, cl = Ja = null, Rf(e, e.pendingLanes));
        var l = e.pendingLanes;
        if (l === 0 && (Ka = null), qs(a), t = t.stateNode, Tt && typeof Tt.onCommitFiberRoot == "function") try {
          Tt.onCommitFiberRoot(yl, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (n !== null) {
          t = S.T, l = z.p, z.p = 2, S.T = null;
          try {
            for (var s = e.onRecoverableError, o = 0; o < n.length; o++) {
              var d = n[o];
              s(d.value, {
                componentStack: d.stack
              });
            }
          } finally {
            S.T = t, z.p = l;
          }
        }
        (Ca & 3) !== 0 && ds(), sa(e), l = e.pendingLanes, (a & 261930) !== 0 && (l & 42) !== 0 ? e === bo ? Wl++ : (Wl = 0, bo = e) : Wl = 0, Pl(0);
      }
    }
    function Rf(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Dl(t)));
    }
    function ds() {
      return Ef(), Cf(), Nf(), Tf();
    }
    function Tf() {
      if (ut !== 5) return false;
      var e = Ja, t = yo;
      yo = 0;
      var a = qs(Ca), n = S.T, l = z.p;
      try {
        z.p = 32 > a ? 32 : a, S.T = null, a = vo, vo = null;
        var s = Ja, o = Ca;
        if (ut = 0, cl = Ja = null, Ca = 0, (Le & 6) !== 0) throw Error(r(331));
        var d = Le;
        if (Le |= 4, df(s.current), of(s, s.current, o, a), Le = d, Pl(0, false), Tt && typeof Tt.onPostCommitFiberRoot == "function") try {
          Tt.onPostCommitFiberRoot(yl, s);
        } catch {
        }
        return true;
      } finally {
        z.p = l, S.T = n, Rf(e, t);
      }
    }
    function zf(e, t, a) {
      t = Vt(a, t), t = $c(e.stateNode, t, 2), e = Ga(e, t, 2), e !== null && (bl(e, 2), sa(e));
    }
    function Be(e, t, a) {
      if (e.tag === 3) zf(e, e, a);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          zf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Ka === null || !Ka.has(n))) {
            e = Vt(a, e), a = zd(2), n = Ga(t, a, 2), n !== null && (_d(a, n, t, e), bl(n, 2), sa(n));
            break;
          }
        }
        t = t.return;
      }
    }
    function xo(e, t, a) {
      var n = e.pingCache;
      if (n === null) {
        n = e.pingCache = new $p();
        var l = /* @__PURE__ */ new Set();
        n.set(t, l);
      } else l = n.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), n.set(t, l));
      l.has(a) || (ho = true, l.add(a), e = tg.bind(null, e, t, a), t.then(e, e));
    }
    function tg(e, t, a) {
      var n = e.pingCache;
      n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Xe === e && (Ne & a) === a && (We === 4 || We === 3 && (Ne & 62914560) === Ne && 300 > X() - is ? (Le & 2) === 0 && ol(e, 0) : po |= a, sl === Ne && (sl = 0)), sa(e);
    }
    function _f(e, t) {
      t === 0 && (t = Au()), e = hn(e, t), e !== null && (bl(e, t), sa(e));
    }
    function ag(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), _f(e, a);
    }
    function ng(e, t) {
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
      n !== null && n.delete(t), _f(e, a);
    }
    function lg(e, t) {
      return A(e, t);
    }
    var fs = null, rl = null, Mo = false, ms = false, jo = false, $a = 0;
    function sa(e) {
      e !== rl && e.next === null && (rl === null ? fs = rl = e : rl = rl.next = e), ms = true, Mo || (Mo = true, sg());
    }
    function Pl(e, t) {
      if (!jo && ms) {
        jo = true;
        do
          for (var a = false, n = fs; n !== null; ) {
            if (e !== 0) {
              var l = n.pendingLanes;
              if (l === 0) var s = 0;
              else {
                var o = n.suspendedLanes, d = n.pingedLanes;
                s = (1 << 31 - zt(42 | e) + 1) - 1, s &= l & ~(o & ~d), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
              }
              s !== 0 && (a = true, Lf(n, s));
            } else s = Ne, s = yi(n, n === Xe ? s : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), (s & 3) === 0 || vl(n, s) || (a = true, Lf(n, s));
            n = n.next;
          }
        while (a);
        jo = false;
      }
    }
    function ig() {
      Df();
    }
    function Df() {
      ms = Mo = false;
      var e = 0;
      $a !== 0 && gg() && (e = $a);
      for (var t = X(), a = null, n = fs; n !== null; ) {
        var l = n.next, s = Uf(n, t);
        s === 0 ? (n.next = null, a === null ? fs = l : a.next = l, l === null && (rl = a)) : (a = n, (e !== 0 || (s & 3) !== 0) && (ms = true)), n = l;
      }
      ut !== 0 && ut !== 5 || Pl(e), $a !== 0 && ($a = 0);
    }
    function Uf(e, t) {
      for (var a = e.suspendedLanes, n = e.pingedLanes, l = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
        var o = 31 - zt(s), d = 1 << o, g = l[o];
        g === -1 ? ((d & a) === 0 || (d & n) !== 0) && (l[o] = _h(d, t)) : g <= t && (e.expiredLanes |= d), s &= ~d;
      }
      if (t = Xe, a = Ne, a = yi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, a === 0 || e === t && (qe === 2 || qe === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && R(n), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || vl(e, a)) {
        if (t = a & -a, t === e.callbackPriority) return t;
        switch (n !== null && R(n), qs(a)) {
          case 2:
          case 8:
            a = ke;
            break;
          case 32:
            a = nt;
            break;
          case 268435456:
            a = Gt;
            break;
          default:
            a = nt;
        }
        return n = Of.bind(null, e), a = A(a, n), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return n !== null && n !== null && R(n), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Of(e, t) {
      if (ut !== 0 && ut !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (ds() && e.callbackNode !== a) return null;
      var n = Ne;
      return n = yi(e, e === Xe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (gf(e, n, t), Uf(e, X()), e.callbackNode != null && e.callbackNode === a ? Of.bind(null, e) : null);
    }
    function Lf(e, t) {
      if (ds()) return null;
      gf(e, t, true);
    }
    function sg() {
      vg(function() {
        (Le & 6) !== 0 ? A(oe, ig) : Df();
      });
    }
    function Ao() {
      if ($a === 0) {
        var e = Fn;
        e === 0 && (e = hi, hi <<= 1, (hi & 261888) === 0 && (hi = 256)), $a = e;
      }
      return $a;
    }
    function kf(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : wi("" + e);
    }
    function qf(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function cg(e, t, a, n, l) {
      if (t === "submit" && a && a.stateNode === l) {
        var s = kf((l[xt] || null).action), o = n.submitter;
        o && (t = (t = o[xt] || null) ? kf(t.formAction) : o.getAttribute("formAction"), t !== null && (s = t, o = null));
        var d = new Ai("action", "action", null, n, l);
        e.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (n.defaultPrevented) {
                  if ($a !== 0) {
                    var g = o ? qf(l, o) : new FormData(l);
                    Xc(a, {
                      pending: true,
                      data: g,
                      method: l.method,
                      action: s
                    }, null, g);
                  }
                } else typeof s == "function" && (d.preventDefault(), g = o ? qf(l, o) : new FormData(l), Xc(a, {
                  pending: true,
                  data: g,
                  method: l.method,
                  action: s
                }, s, g));
              },
              currentTarget: l
            }
          ]
        });
      }
    }
    for (var Eo = 0; Eo < cc.length; Eo++) {
      var Co = cc[Eo], og = Co.toLowerCase(), ug = Co[0].toUpperCase() + Co.slice(1);
      ea(og, "on" + ug);
    }
    ea(hr, "onAnimationEnd"), ea(pr, "onAnimationIteration"), ea(gr, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(Ap, "onTransitionRun"), ea(Ep, "onTransitionStart"), ea(Cp, "onTransitionCancel"), ea(yr, "onTransitionEnd"), On("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), On("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), On("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), On("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), rn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), rn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), rn("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), rn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), rn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), rn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var ei = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), rg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ei));
    function Bf(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var n = e[a], l = n.event;
        n = n.listeners;
        e: {
          var s = void 0;
          if (t) for (var o = n.length - 1; 0 <= o; o--) {
            var d = n[o], g = d.instance, N = d.currentTarget;
            if (d = d.listener, g !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = N;
            try {
              s(l);
            } catch (k) {
              Ni(k);
            }
            l.currentTarget = null, s = g;
          }
          else for (o = 0; o < n.length; o++) {
            if (d = n[o], g = d.instance, N = d.currentTarget, d = d.listener, g !== s && l.isPropagationStopped()) break e;
            s = d, l.currentTarget = N;
            try {
              s(l);
            } catch (k) {
              Ni(k);
            }
            l.currentTarget = null, s = g;
          }
        }
      }
    }
    function Ce(e, t) {
      var a = t[Bs];
      a === void 0 && (a = t[Bs] = /* @__PURE__ */ new Set());
      var n = e + "__bubble";
      a.has(n) || (Hf(t, e, 2, false), a.add(n));
    }
    function No(e, t, a) {
      var n = 0;
      t && (n |= 4), Hf(a, e, n, t);
    }
    var hs = "_reactListening" + Math.random().toString(36).slice(2);
    function Ro(e) {
      if (!e[hs]) {
        e[hs] = true, _u.forEach(function(a) {
          a !== "selectionchange" && (rg.has(a) || No(a, false, e), No(a, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[hs] || (t[hs] = true, No("selectionchange", false, t));
      }
    }
    function Hf(e, t, a, n) {
      switch (pm(t)) {
        case 2:
          var l = qg;
          break;
        case 8:
          l = Bg;
          break;
        default:
          l = Xo;
      }
      a = l.bind(null, t, a, e), l = void 0, !Js || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = true), n ? l !== void 0 ? e.addEventListener(t, a, {
        capture: true,
        passive: l
      }) : e.addEventListener(t, a, true) : l !== void 0 ? e.addEventListener(t, a, {
        passive: l
      }) : e.addEventListener(t, a, false);
    }
    function To(e, t, a, n, l) {
      var s = n;
      if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (; ; ) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var d = n.stateNode.containerInfo;
          if (d === l) break;
          if (o === 4) for (o = n.return; o !== null; ) {
            var g = o.tag;
            if ((g === 3 || g === 4) && o.stateNode.containerInfo === l) return;
            o = o.return;
          }
          for (; d !== null; ) {
            if (o = _n(d), o === null) return;
            if (g = o.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              n = s = o;
              continue e;
            }
            d = d.parentNode;
          }
        }
        n = n.return;
      }
      Xu(function() {
        var N = s, k = Zs(a), Q = [];
        e: {
          var T = vr.get(e);
          if (T !== void 0) {
            var U = Ai, ie = e;
            switch (e) {
              case "keypress":
                if (Mi(a) === 0) break e;
              case "keydown":
              case "keyup":
                U = np;
                break;
              case "focusin":
                ie = "focus", U = Ws;
                break;
              case "focusout":
                ie = "blur", U = Ws;
                break;
              case "beforeblur":
              case "afterblur":
                U = Ws;
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
                U = Ku;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                U = Vh;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                U = sp;
                break;
              case hr:
              case pr:
              case gr:
                U = Jh;
                break;
              case yr:
                U = op;
                break;
              case "scroll":
              case "scrollend":
                U = Qh;
                break;
              case "wheel":
                U = rp;
                break;
              case "copy":
              case "cut":
              case "paste":
                U = $h;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                U = Fu;
                break;
              case "toggle":
              case "beforetoggle":
                U = fp;
            }
            var me = (t & 4) !== 0, Ye = !me && (e === "scroll" || e === "scrollend"), M = me ? T !== null ? T + "Capture" : null : T;
            me = [];
            for (var b = N, C; b !== null; ) {
              var Y = b;
              if (C = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || C === null || M === null || (Y = xl(b, M), Y != null && me.push(ti(b, Y, C))), Ye) break;
              b = b.return;
            }
            0 < me.length && (T = new U(T, ie, null, a, k), Q.push({
              event: T,
              listeners: me
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (T = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", T && a !== Vs && (ie = a.relatedTarget || a.fromElement) && (_n(ie) || ie[zn])) break e;
            if ((U || T) && (T = k.window === k ? k : (T = k.ownerDocument) ? T.defaultView || T.parentWindow : window, U ? (ie = a.relatedTarget || a.toElement, U = N, ie = ie ? _n(ie) : null, ie !== null && (Ye = h(ie), me = ie.tag, ie !== Ye || me !== 5 && me !== 27 && me !== 6) && (ie = null)) : (U = null, ie = N), U !== ie)) {
              if (me = Ku, Y = "onMouseLeave", M = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (me = Fu, Y = "onPointerLeave", M = "onPointerEnter", b = "pointer"), Ye = U == null ? T : wl(U), C = ie == null ? T : wl(ie), T = new me(Y, b + "leave", U, a, k), T.target = Ye, T.relatedTarget = C, Y = null, _n(k) === N && (me = new me(M, b + "enter", ie, a, k), me.target = C, me.relatedTarget = Ye, Y = me), Ye = Y, U && ie) t: {
                for (me = dg, M = U, b = ie, C = 0, Y = M; Y; Y = me(Y)) C++;
                Y = 0;
                for (var re = b; re; re = me(re)) Y++;
                for (; 0 < C - Y; ) M = me(M), C--;
                for (; 0 < Y - C; ) b = me(b), Y--;
                for (; C--; ) {
                  if (M === b || b !== null && M === b.alternate) {
                    me = M;
                    break t;
                  }
                  M = me(M), b = me(b);
                }
                me = null;
              }
              else me = null;
              U !== null && Gf(Q, T, U, me, false), ie !== null && Ye !== null && Gf(Q, Ye, ie, me, true);
            }
          }
          e: {
            if (T = N ? wl(N) : window, U = T.nodeName && T.nodeName.toLowerCase(), U === "select" || U === "input" && T.type === "file") var Ue = nr;
            else if (tr(T)) if (lr) Ue = xp;
            else {
              Ue = Sp;
              var ce = bp;
            }
            else U = T.nodeName, !U || U.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? N && Xs(N.elementType) && (Ue = nr) : Ue = wp;
            if (Ue && (Ue = Ue(e, N))) {
              ar(Q, Ue, a, k);
              break e;
            }
            ce && ce(e, T, N), e === "focusout" && N && T.type === "number" && N.memoizedProps.value != null && Qs(T, "number", T.value);
          }
          switch (ce = N ? wl(N) : window, e) {
            case "focusin":
              (tr(ce) || ce.contentEditable === "true") && (Gn = ce, lc = N, Tl = null);
              break;
            case "focusout":
              Tl = lc = Gn = null;
              break;
            case "mousedown":
              ic = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ic = false, fr(Q, a, k);
              break;
            case "selectionchange":
              if (jp) break;
            case "keydown":
            case "keyup":
              fr(Q, a, k);
          }
          var Me;
          if (ec) e: {
            switch (e) {
              case "compositionstart":
                var Re = "onCompositionStart";
                break e;
              case "compositionend":
                Re = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Re = "onCompositionUpdate";
                break e;
            }
            Re = void 0;
          }
          else Hn ? Pu(e, a) && (Re = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Re = "onCompositionStart");
          Re && ($u && a.locale !== "ko" && (Hn || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && Hn && (Me = Vu()) : (Ua = k, Fs = "value" in Ua ? Ua.value : Ua.textContent, Hn = true)), ce = ps(N, Re), 0 < ce.length && (Re = new Ju(Re, e, null, a, k), Q.push({
            event: Re,
            listeners: ce
          }), Me ? Re.data = Me : (Me = er(a), Me !== null && (Re.data = Me)))), (Me = hp ? pp(e, a) : gp(e, a)) && (Re = ps(N, "onBeforeInput"), 0 < Re.length && (ce = new Ju("onBeforeInput", "beforeinput", null, a, k), Q.push({
            event: ce,
            listeners: Re
          }), ce.data = Me)), cg(Q, e, N, a, k);
        }
        Bf(Q, t);
      });
    }
    function ti(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function ps(e, t) {
      for (var a = t + "Capture", n = []; e !== null; ) {
        var l = e, s = l.stateNode;
        if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || s === null || (l = xl(e, a), l != null && n.unshift(ti(e, l, s)), l = xl(e, t), l != null && n.push(ti(e, l, s))), e.tag === 3) return n;
        e = e.return;
      }
      return [];
    }
    function dg(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Gf(e, t, a, n, l) {
      for (var s = t._reactName, o = []; a !== null && a !== n; ) {
        var d = a, g = d.alternate, N = d.stateNode;
        if (d = d.tag, g !== null && g === n) break;
        d !== 5 && d !== 26 && d !== 27 || N === null || (g = N, l ? (N = xl(a, s), N != null && o.unshift(ti(a, N, g))) : l || (N = xl(a, s), N != null && o.push(ti(a, N, g)))), a = a.return;
      }
      o.length !== 0 && e.push({
        event: t,
        listeners: o
      });
    }
    var fg = /\r\n?/g, mg = /\u0000|\uFFFD/g;
    function Yf(e) {
      return (typeof e == "string" ? e : "" + e).replace(fg, `
`).replace(mg, "");
    }
    function Qf(e, t) {
      return t = Yf(t), Yf(e) === t;
    }
    function Ge(e, t, a, n, l, s) {
      switch (a) {
        case "children":
          typeof n == "string" ? t === "body" || t === "textarea" && n === "" || kn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && kn(e, "" + n);
          break;
        case "className":
          bi(e, "class", n);
          break;
        case "tabIndex":
          bi(e, "tabindex", n);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          bi(e, a, n);
          break;
        case "style":
          Yu(e, n, s);
          break;
        case "data":
          if (t !== "object") {
            bi(e, "data", n);
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
          n = wi("" + n), e.setAttribute(a, n);
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
          n = wi("" + n), e.setAttribute(a, n);
          break;
        case "onClick":
          n != null && (e.onclick = fa);
          break;
        case "onScroll":
          n != null && Ce("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ce("scrollend", e);
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
          a = wi("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
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
          Ce("beforetoggle", e), Ce("toggle", e), vi(e, "popover", n);
          break;
        case "xlinkActuate":
          da(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
          break;
        case "xlinkArcrole":
          da(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
          break;
        case "xlinkRole":
          da(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
          break;
        case "xlinkShow":
          da(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
          break;
        case "xlinkTitle":
          da(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
          break;
        case "xlinkType":
          da(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
          break;
        case "xmlBase":
          da(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
          break;
        case "xmlLang":
          da(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
          break;
        case "xmlSpace":
          da(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
          break;
        case "is":
          vi(e, "is", n);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Gh.get(a) || a, vi(e, a, n));
      }
    }
    function zo(e, t, a, n, l, s) {
      switch (a) {
        case "style":
          Yu(e, n, s);
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
          n != null && Ce("scroll", e);
          break;
        case "onScrollEnd":
          n != null && Ce("scrollend", e);
          break;
        case "onClick":
          n != null && (e.onclick = fa);
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
          if (!Du.hasOwnProperty(a)) e: {
            if (a[0] === "o" && a[1] === "n" && (l = a.endsWith("Capture"), t = a.slice(2, l ? a.length - 7 : void 0), s = e[xt] || null, s = s != null ? s[a] : null, typeof s == "function" && e.removeEventListener(t, s, l), typeof n == "function")) {
              typeof s != "function" && s !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, n, l);
              break e;
            }
            a in e ? e[a] = n : n === true ? e.setAttribute(a, "") : vi(e, a, n);
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
          Ce("error", e), Ce("load", e);
          var n = false, l = false, s;
          for (s in a) if (a.hasOwnProperty(s)) {
            var o = a[s];
            if (o != null) switch (s) {
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
                Ge(e, t, s, o, a, null);
            }
          }
          l && Ge(e, t, "srcSet", a.srcSet, a, null), n && Ge(e, t, "src", a.src, a, null);
          return;
        case "input":
          Ce("invalid", e);
          var d = s = o = l = null, g = null, N = null;
          for (n in a) if (a.hasOwnProperty(n)) {
            var k = a[n];
            if (k != null) switch (n) {
              case "name":
                l = k;
                break;
              case "type":
                o = k;
                break;
              case "checked":
                g = k;
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
          qu(e, s, d, g, N, o, l, false);
          return;
        case "select":
          Ce("invalid", e), n = o = s = null;
          for (l in a) if (a.hasOwnProperty(l) && (d = a[l], d != null)) switch (l) {
            case "value":
              s = d;
              break;
            case "defaultValue":
              o = d;
              break;
            case "multiple":
              n = d;
            default:
              Ge(e, t, l, d, a, null);
          }
          t = s, a = o, e.multiple = !!n, t != null ? Ln(e, !!n, t, false) : a != null && Ln(e, !!n, a, true);
          return;
        case "textarea":
          Ce("invalid", e), s = l = n = null;
          for (o in a) if (a.hasOwnProperty(o) && (d = a[o], d != null)) switch (o) {
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
              Ge(e, t, o, d, a, null);
          }
          Hu(e, n, l, s);
          return;
        case "option":
          for (g in a) if (a.hasOwnProperty(g) && (n = a[g], n != null)) switch (g) {
            case "selected":
              e.selected = n && typeof n != "function" && typeof n != "symbol";
              break;
            default:
              Ge(e, t, g, n, a, null);
          }
          return;
        case "dialog":
          Ce("beforetoggle", e), Ce("toggle", e), Ce("cancel", e), Ce("close", e);
          break;
        case "iframe":
        case "object":
          Ce("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < ei.length; n++) Ce(ei[n], e);
          break;
        case "image":
          Ce("error", e), Ce("load", e);
          break;
        case "details":
          Ce("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Ce("error", e), Ce("load", e);
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
            for (k in a) a.hasOwnProperty(k) && (n = a[k], n !== void 0 && zo(e, t, k, n, a, void 0));
            return;
          }
      }
      for (d in a) a.hasOwnProperty(d) && (n = a[d], n != null && Ge(e, t, d, n, a, null));
    }
    function hg(e, t, a, n) {
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
          var l = null, s = null, o = null, d = null, g = null, N = null, k = null;
          for (U in a) {
            var Q = a[U];
            if (a.hasOwnProperty(U) && Q != null) switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = Q;
              default:
                n.hasOwnProperty(U) || Ge(e, t, U, null, n, Q);
            }
          }
          for (var T in n) {
            var U = n[T];
            if (Q = a[T], n.hasOwnProperty(T) && (U != null || Q != null)) switch (T) {
              case "type":
                s = U;
                break;
              case "name":
                l = U;
                break;
              case "checked":
                N = U;
                break;
              case "defaultChecked":
                k = U;
                break;
              case "value":
                o = U;
                break;
              case "defaultValue":
                d = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null) throw Error(r(137, t));
                break;
              default:
                U !== Q && Ge(e, t, T, U, n, Q);
            }
          }
          Ys(e, o, d, g, N, k, s, l);
          return;
        case "select":
          U = o = d = T = null;
          for (s in a) if (g = a[s], a.hasOwnProperty(s) && g != null) switch (s) {
            case "value":
              break;
            case "multiple":
              U = g;
            default:
              n.hasOwnProperty(s) || Ge(e, t, s, null, n, g);
          }
          for (l in n) if (s = n[l], g = a[l], n.hasOwnProperty(l) && (s != null || g != null)) switch (l) {
            case "value":
              T = s;
              break;
            case "defaultValue":
              d = s;
              break;
            case "multiple":
              o = s;
            default:
              s !== g && Ge(e, t, l, s, n, g);
          }
          t = d, a = o, n = U, T != null ? Ln(e, !!a, T, false) : !!n != !!a && (t != null ? Ln(e, !!a, t, true) : Ln(e, !!a, a ? [] : "", false));
          return;
        case "textarea":
          U = T = null;
          for (d in a) if (l = a[d], a.hasOwnProperty(d) && l != null && !n.hasOwnProperty(d)) switch (d) {
            case "value":
              break;
            case "children":
              break;
            default:
              Ge(e, t, d, null, n, l);
          }
          for (o in n) if (l = n[o], s = a[o], n.hasOwnProperty(o) && (l != null || s != null)) switch (o) {
            case "value":
              T = l;
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
              l !== s && Ge(e, t, o, l, n, s);
          }
          Bu(e, T, U);
          return;
        case "option":
          for (var ie in a) if (T = a[ie], a.hasOwnProperty(ie) && T != null && !n.hasOwnProperty(ie)) switch (ie) {
            case "selected":
              e.selected = false;
              break;
            default:
              Ge(e, t, ie, null, n, T);
          }
          for (g in n) if (T = n[g], U = a[g], n.hasOwnProperty(g) && T !== U && (T != null || U != null)) switch (g) {
            case "selected":
              e.selected = T && typeof T != "function" && typeof T != "symbol";
              break;
            default:
              Ge(e, t, g, T, n, U);
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
          for (var me in a) T = a[me], a.hasOwnProperty(me) && T != null && !n.hasOwnProperty(me) && Ge(e, t, me, null, n, T);
          for (N in n) if (T = n[N], U = a[N], n.hasOwnProperty(N) && T !== U && (T != null || U != null)) switch (N) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (T != null) throw Error(r(137, t));
              break;
            default:
              Ge(e, t, N, T, n, U);
          }
          return;
        default:
          if (Xs(t)) {
            for (var Ye in a) T = a[Ye], a.hasOwnProperty(Ye) && T !== void 0 && !n.hasOwnProperty(Ye) && zo(e, t, Ye, void 0, n, T);
            for (k in n) T = n[k], U = a[k], !n.hasOwnProperty(k) || T === U || T === void 0 && U === void 0 || zo(e, t, k, T, n, U);
            return;
          }
      }
      for (var M in a) T = a[M], a.hasOwnProperty(M) && T != null && !n.hasOwnProperty(M) && Ge(e, t, M, null, n, T);
      for (Q in n) T = n[Q], U = a[Q], !n.hasOwnProperty(Q) || T === U || T == null && U == null || Ge(e, t, Q, T, n, U);
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
    function pg() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), n = 0; n < a.length; n++) {
          var l = a[n], s = l.transferSize, o = l.initiatorType, d = l.duration;
          if (s && d && Xf(o)) {
            for (o = 0, d = l.responseEnd, n += 1; n < a.length; n++) {
              var g = a[n], N = g.startTime;
              if (N > d) break;
              var k = g.transferSize, Q = g.initiatorType;
              k && Xf(Q) && (g = g.responseEnd, o += k * (g < d ? 1 : (d - N) / (g - N)));
            }
            if (--n, t += 8 * (s + o) / (l.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var _o = null, Do = null;
    function gs(e) {
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
    var Oo = null;
    function gg() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Oo ? false : (Oo = e, true) : (Oo = null, false);
    }
    var Kf = typeof setTimeout == "function" ? setTimeout : void 0, yg = typeof clearTimeout == "function" ? clearTimeout : void 0, Jf = typeof Promise == "function" ? Promise : void 0, vg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jf < "u" ? function(e) {
      return Jf.resolve(null).then(e).catch(bg);
    } : Kf;
    function bg(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Ia(e) {
      return e === "head";
    }
    function Ff(e, t) {
      var a = t, n = 0;
      do {
        var l = a.nextSibling;
        if (e.removeChild(a), l && l.nodeType === 8) if (a = l.data, a === "/$" || a === "/&") {
          if (n === 0) {
            e.removeChild(l), hl(t);
            return;
          }
          n--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") n++;
        else if (a === "html") ai(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, ai(a);
          for (var s = a.firstChild; s; ) {
            var o = s.nextSibling, d = s.nodeName;
            s[Sl] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && s.rel.toLowerCase() === "stylesheet" || a.removeChild(s), s = o;
          }
        } else a === "body" && ai(e.ownerDocument.body);
        a = l;
      } while (a);
      hl(t);
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
    function Lo(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Lo(a), Hs(a);
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
    function Sg(e, t, a, n) {
      for (; e.nodeType === 1; ) {
        var l = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (n) {
          if (!e[Sl]) switch (t) {
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
        if (e = $t(e.nextSibling), e === null) break;
      }
      return null;
    }
    function wg(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = $t(e.nextSibling), e === null)) return null;
      return e;
    }
    function If(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = $t(e.nextSibling), e === null)) return null;
      return e;
    }
    function ko(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function qo(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function xg(e, t) {
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
    function $t(e) {
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
    var Bo = null;
    function Wf(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === "/$" || a === "/&") {
            if (t === 0) return $t(e.nextSibling);
            t--;
          } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function Pf(e) {
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
    function em(e, t, a) {
      switch (t = gs(a), e) {
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
    function ai(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Hs(e);
    }
    var It = /* @__PURE__ */ new Map(), tm = /* @__PURE__ */ new Set();
    function ys(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Na = z.d;
    z.d = {
      f: Mg,
      r: jg,
      D: Ag,
      C: Eg,
      L: Cg,
      m: Ng,
      X: Tg,
      S: Rg,
      M: zg
    };
    function Mg() {
      var e = Na.f(), t = os();
      return e || t;
    }
    function jg(e) {
      var t = Dn(e);
      t !== null && t.tag === 5 && t.type === "form" ? yd(t) : Na.r(e);
    }
    var dl = typeof document > "u" ? null : document;
    function am(e, t, a) {
      var n = dl;
      if (n && typeof t == "string" && t) {
        var l = Qt(t);
        l = 'link[rel="' + e + '"][href="' + l + '"]', typeof a == "string" && (l += '[crossorigin="' + a + '"]'), tm.has(l) || (tm.add(l), e = {
          rel: e,
          crossOrigin: a,
          href: t
        }, n.querySelector(l) === null && (t = n.createElement("link"), yt(t, "link", e), rt(t), n.head.appendChild(t)));
      }
    }
    function Ag(e) {
      Na.D(e), am("dns-prefetch", e, null);
    }
    function Eg(e, t) {
      Na.C(e, t), am("preconnect", e, t);
    }
    function Cg(e, t, a) {
      Na.L(e, t, a);
      var n = dl;
      if (n && e && t) {
        var l = 'link[rel="preload"][as="' + Qt(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (l += '[imagesrcset="' + Qt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (l += '[imagesizes="' + Qt(a.imageSizes) + '"]')) : l += '[href="' + Qt(e) + '"]';
        var s = l;
        switch (t) {
          case "style":
            s = fl(e);
            break;
          case "script":
            s = ml(e);
        }
        It.has(s) || (e = B({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        }, a), It.set(s, e), n.querySelector(l) !== null || t === "style" && n.querySelector(ni(s)) || t === "script" && n.querySelector(li(s)) || (t = n.createElement("link"), yt(t, "link", e), rt(t), n.head.appendChild(t)));
      }
    }
    function Ng(e, t) {
      Na.m(e, t);
      var a = dl;
      if (a && e) {
        var n = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + Qt(n) + '"][href="' + Qt(e) + '"]', s = l;
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            s = ml(e);
        }
        if (!It.has(s) && (e = B({
          rel: "modulepreload",
          href: e
        }, t), It.set(s, e), a.querySelector(l) === null)) {
          switch (n) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (a.querySelector(li(s))) return;
          }
          n = a.createElement("link"), yt(n, "link", e), rt(n), a.head.appendChild(n);
        }
      }
    }
    function Rg(e, t, a) {
      Na.S(e, t, a);
      var n = dl;
      if (n && e) {
        var l = Un(n).hoistableStyles, s = fl(e);
        t = t || "default";
        var o = l.get(s);
        if (!o) {
          var d = {
            loading: 0,
            preload: null
          };
          if (o = n.querySelector(ni(s))) d.loading = 5;
          else {
            e = B({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, a), (a = It.get(s)) && Ho(e, a);
            var g = o = n.createElement("link");
            rt(g), yt(g, "link", e), g._p = new Promise(function(N, k) {
              g.onload = N, g.onerror = k;
            }), g.addEventListener("load", function() {
              d.loading |= 1;
            }), g.addEventListener("error", function() {
              d.loading |= 2;
            }), d.loading |= 4, vs(o, t, n);
          }
          o = {
            type: "stylesheet",
            instance: o,
            count: 1,
            state: d
          }, l.set(s, o);
        }
      }
    }
    function Tg(e, t) {
      Na.X(e, t);
      var a = dl;
      if (a && e) {
        var n = Un(a).hoistableScripts, l = ml(e), s = n.get(l);
        s || (s = a.querySelector(li(l)), s || (e = B({
          src: e,
          async: true
        }, t), (t = It.get(l)) && Go(e, t), s = a.createElement("script"), rt(s), yt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function zg(e, t) {
      Na.M(e, t);
      var a = dl;
      if (a && e) {
        var n = Un(a).hoistableScripts, l = ml(e), s = n.get(l);
        s || (s = a.querySelector(li(l)), s || (e = B({
          src: e,
          async: true,
          type: "module"
        }, t), (t = It.get(l)) && Go(e, t), s = a.createElement("script"), rt(s), yt(s, "link", e), a.head.appendChild(s)), s = {
          type: "script",
          instance: s,
          count: 1,
          state: null
        }, n.set(l, s));
      }
    }
    function nm(e, t, a, n) {
      var l = (l = we.current) ? ys(l) : null;
      if (!l) throw Error(r(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (t = fl(a.href), a = Un(l).hoistableStyles, n = a.get(t), n || (n = {
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
            e = fl(a.href);
            var s = Un(l).hoistableStyles, o = s.get(e);
            if (o || (l = l.ownerDocument || l, o = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            }, s.set(e, o), (s = l.querySelector(ni(e))) && !s._p && (o.instance = s, o.state.loading = 5), It.has(e) || (a = {
              rel: "preload",
              as: "style",
              href: a.href,
              crossOrigin: a.crossOrigin,
              integrity: a.integrity,
              media: a.media,
              hrefLang: a.hrefLang,
              referrerPolicy: a.referrerPolicy
            }, It.set(e, a), s || _g(l, e, a, o.state))), t && n === null) throw Error(r(528, ""));
            return o;
          }
          if (t && n !== null) throw Error(r(529, ""));
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ml(a), a = Un(l).hoistableScripts, n = a.get(t), n || (n = {
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
    function fl(e) {
      return 'href="' + Qt(e) + '"';
    }
    function ni(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function lm(e) {
      return B({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function _g(e, t, a, n) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
        return n.loading |= 1;
      }), t.addEventListener("error", function() {
        return n.loading |= 2;
      }), yt(t, "link", a), rt(t), e.head.appendChild(t));
    }
    function ml(e) {
      return '[src="' + Qt(e) + '"]';
    }
    function li(e) {
      return "script[async]" + e;
    }
    function im(e, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var n = e.querySelector('style[data-href~="' + Qt(a.href) + '"]');
          if (n) return t.instance = n, rt(n), n;
          var l = B({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement("style"), rt(n), yt(n, "style", l), vs(n, a.precedence, e), t.instance = n;
        case "stylesheet":
          l = fl(a.href);
          var s = e.querySelector(ni(l));
          if (s) return t.state.loading |= 4, t.instance = s, rt(s), s;
          n = lm(a), (l = It.get(l)) && Ho(n, l), s = (e.ownerDocument || e).createElement("link"), rt(s);
          var o = s;
          return o._p = new Promise(function(d, g) {
            o.onload = d, o.onerror = g;
          }), yt(s, "link", n), t.state.loading |= 4, vs(s, a.precedence, e), t.instance = s;
        case "script":
          return s = ml(a.src), (l = e.querySelector(li(s))) ? (t.instance = l, rt(l), l) : (n = a, (l = It.get(s)) && (n = B({}, a), Go(n, l)), e = e.ownerDocument || e, l = e.createElement("script"), rt(l), yt(l, "link", n), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, vs(n, a.precedence, e));
      return t.instance;
    }
    function vs(e, t, a) {
      for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), l = n.length ? n[n.length - 1] : null, s = l, o = 0; o < n.length; o++) {
        var d = n[o];
        if (d.dataset.precedence === t) s = d;
        else if (s !== l) break;
      }
      s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Ho(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Go(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var bs = null;
    function sm(e, t, a) {
      if (bs === null) {
        var n = /* @__PURE__ */ new Map(), l = bs = /* @__PURE__ */ new Map();
        l.set(a, n);
      } else l = bs, n = l.get(a), n || (n = /* @__PURE__ */ new Map(), l.set(a, n));
      if (n.has(e)) return n;
      for (n.set(e, null), a = a.getElementsByTagName(e), l = 0; l < a.length; l++) {
        var s = a[l];
        if (!(s[Sl] || s[mt] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
          var o = s.getAttribute(t) || "";
          o = e + o;
          var d = n.get(o);
          d ? d.push(s) : n.set(o, [
            s
          ]);
        }
      }
      return n;
    }
    function cm(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null);
    }
    function Dg(e, t, a) {
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
    function om(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function Ug(e, t, a, n) {
      if (a.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var l = fl(n.href), s = t.querySelector(ni(l));
          if (s) {
            t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ss.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = s, rt(s);
            return;
          }
          s = t.ownerDocument || t, n = lm(n), (l = It.get(l)) && Ho(n, l), s = s.createElement("link"), rt(s);
          var o = s;
          o._p = new Promise(function(d, g) {
            o.onload = d, o.onerror = g;
          }), yt(s, "link", n), a.instance = s;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ss.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    var Yo = 0;
    function Og(e, t) {
      return e.stylesheets && e.count === 0 && xs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var n = setTimeout(function() {
          if (e.stylesheets && xs(e, e.stylesheets), e.unsuspend) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Yo === 0 && (Yo = 62500 * pg());
        var l = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && xs(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        }, (e.imgBytes > Yo ? 50 : 800) + t);
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(n), clearTimeout(l);
        };
      } : null;
    }
    function Ss() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) xs(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var ws = null;
    function xs(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, ws = /* @__PURE__ */ new Map(), t.forEach(Lg, e), ws = null, Ss.call(e));
    }
    function Lg(e, t) {
      if (!(t.state.loading & 4)) {
        var a = ws.get(e);
        if (a) var n = a.get(null);
        else {
          a = /* @__PURE__ */ new Map(), ws.set(e, a);
          for (var l = e.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0; s < l.length; s++) {
            var o = l[s];
            (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (a.set(o.dataset.precedence, o), n = o);
          }
          n && a.set(null, n);
        }
        l = t.instance, o = l.getAttribute("data-precedence"), s = a.get(o) || n, s === n && a.set(null, l), a.set(o, l), this.count++, n = Ss.bind(this), l.addEventListener("load", n), l.addEventListener("error", n), s ? s.parentNode.insertBefore(l, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
      }
    }
    var ii = {
      $$typeof: se,
      Provider: null,
      Consumer: null,
      _currentValue: W,
      _currentValue2: W,
      _threadCount: 0
    };
    function kg(e, t, a, n, l, s, o, d, g) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ls(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ls(0), this.hiddenUpdates = Ls(null), this.identifierPrefix = n, this.onUncaughtError = l, this.onCaughtError = s, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function um(e, t, a, n, l, s, o, d, g, N, k, Q) {
      return e = new kg(e, t, a, o, g, N, k, Q, d), t = 1, s === true && (t |= 24), s = Dt(3, null, null, t), e.current = s, s.stateNode = e, t = Sc(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
        element: n,
        isDehydrated: a,
        cache: t
      }, jc(s), e;
    }
    function rm(e) {
      return e ? (e = Xn, e) : Xn;
    }
    function dm(e, t, a, n, l, s) {
      l = rm(l), n.context === null ? n.context = l : n.pendingContext = l, n = Ha(t), n.payload = {
        element: a
      }, s = s === void 0 ? null : s, s !== null && (n.callback = s), a = Ga(e, n, t), a !== null && (Nt(a, e, t), kl(a, e, t));
    }
    function fm(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Qo(e, t) {
      fm(e, t), (e = e.alternate) && fm(e, t);
    }
    function mm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = hn(e, 67108864);
        t !== null && Nt(t, e, 67108864), Qo(e, 67108864);
      }
    }
    function hm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = qt();
        t = ks(t);
        var a = hn(e, t);
        a !== null && Nt(a, e, t), Qo(e, t);
      }
    }
    var Ms = true;
    function qg(e, t, a, n) {
      var l = S.T;
      S.T = null;
      var s = z.p;
      try {
        z.p = 2, Xo(e, t, a, n);
      } finally {
        z.p = s, S.T = l;
      }
    }
    function Bg(e, t, a, n) {
      var l = S.T;
      S.T = null;
      var s = z.p;
      try {
        z.p = 8, Xo(e, t, a, n);
      } finally {
        z.p = s, S.T = l;
      }
    }
    function Xo(e, t, a, n) {
      if (Ms) {
        var l = Vo(n);
        if (l === null) To(e, t, n, js, a), gm(e, n);
        else if (Gg(l, e, t, a, n)) n.stopPropagation();
        else if (gm(e, n), t & 4 && -1 < Hg.indexOf(e)) {
          for (; l !== null; ) {
            var s = Dn(l);
            if (s !== null) switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var o = un(s.pendingLanes);
                  if (o !== 0) {
                    var d = s;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var g = 1 << 31 - zt(o);
                      d.entanglements[1] |= g, o &= ~g;
                    }
                    sa(s), (Le & 6) === 0 && (ss = X() + 500, Pl(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = hn(s, 2), d !== null && Nt(d, s, 2), os(), Qo(s, 2);
            }
            if (s = Vo(n), s === null && To(e, t, n, js, a), s === l) break;
            l = s;
          }
          l !== null && n.stopPropagation();
        } else To(e, t, n, null, a);
      }
    }
    function Vo(e) {
      return e = Zs(e), Zo(e);
    }
    var js = null;
    function Zo(e) {
      if (js = null, e = _n(e), e !== null) {
        var t = h(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = x(t), e !== null) return e;
            e = null;
          } else if (a === 31) {
            if (e = E(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return js = e, null;
    }
    function pm(e) {
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
            case oe:
              return 2;
            case ke:
              return 8;
            case nt:
            case $e:
              return 32;
            case Gt:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Ko = false, Wa = null, Pa = null, en = null, si = /* @__PURE__ */ new Map(), ci = /* @__PURE__ */ new Map(), tn = [], Hg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function gm(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Wa = null;
          break;
        case "dragenter":
        case "dragleave":
          Pa = null;
          break;
        case "mouseover":
        case "mouseout":
          en = null;
          break;
        case "pointerover":
        case "pointerout":
          si.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ci.delete(t.pointerId);
      }
    }
    function oi(e, t, a, n, l, s) {
      return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: n,
        nativeEvent: s,
        targetContainers: [
          l
        ]
      }, t !== null && (t = Dn(t), t !== null && mm(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
    }
    function Gg(e, t, a, n, l) {
      switch (t) {
        case "focusin":
          return Wa = oi(Wa, e, t, a, n, l), true;
        case "dragenter":
          return Pa = oi(Pa, e, t, a, n, l), true;
        case "mouseover":
          return en = oi(en, e, t, a, n, l), true;
        case "pointerover":
          var s = l.pointerId;
          return si.set(s, oi(si.get(s) || null, e, t, a, n, l)), true;
        case "gotpointercapture":
          return s = l.pointerId, ci.set(s, oi(ci.get(s) || null, e, t, a, n, l)), true;
      }
      return false;
    }
    function ym(e) {
      var t = _n(e.target);
      if (t !== null) {
        var a = h(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = x(a), t !== null) {
              e.blockedOn = t, Tu(e.priority, function() {
                hm(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = E(a), t !== null) {
              e.blockedOn = t, Tu(e.priority, function() {
                hm(a);
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
    function As(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Vo(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var n = new a.constructor(a.type, a);
          Vs = n, a.target.dispatchEvent(n), Vs = null;
        } else return t = Dn(a), t !== null && mm(t), e.blockedOn = a, false;
        t.shift();
      }
      return true;
    }
    function vm(e, t, a) {
      As(e) && a.delete(t);
    }
    function Yg() {
      Ko = false, Wa !== null && As(Wa) && (Wa = null), Pa !== null && As(Pa) && (Pa = null), en !== null && As(en) && (en = null), si.forEach(vm), ci.forEach(vm);
    }
    function Es(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Ko || (Ko = true, c.unstable_scheduleCallback(c.unstable_NormalPriority, Yg)));
    }
    var Cs = null;
    function bm(e) {
      Cs !== e && (Cs = e, c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
        Cs === e && (Cs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], n = e[t + 1], l = e[t + 2];
          if (typeof n != "function") {
            if (Zo(n || a) === null) continue;
            break;
          }
          var s = Dn(a);
          s !== null && (e.splice(t, 3), t -= 3, Xc(s, {
            pending: true,
            data: l,
            method: a.method,
            action: n
          }, n, l));
        }
      }));
    }
    function hl(e) {
      function t(g) {
        return Es(g, e);
      }
      Wa !== null && Es(Wa, e), Pa !== null && Es(Pa, e), en !== null && Es(en, e), si.forEach(t), ci.forEach(t);
      for (var a = 0; a < tn.length; a++) {
        var n = tn[a];
        n.blockedOn === e && (n.blockedOn = null);
      }
      for (; 0 < tn.length && (a = tn[0], a.blockedOn === null); ) ym(a), a.blockedOn === null && tn.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
        var l = a[n], s = a[n + 1], o = l[xt] || null;
        if (typeof s == "function") o || bm(a);
        else if (o) {
          var d = null;
          if (s && s.hasAttribute("formAction")) {
            if (l = s, o = s[xt] || null) d = o.formAction;
            else if (Zo(l) !== null) continue;
          } else d = o.action;
          typeof d == "function" ? a[n + 1] = d : (a.splice(n, 3), n -= 3), bm(a);
        }
      }
    }
    function Sm() {
      function e(s) {
        s.canIntercept && s.info === "react-transition" && s.intercept({
          handler: function() {
            return new Promise(function(o) {
              return l = o;
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
    function Jo(e) {
      this._internalRoot = e;
    }
    Ns.prototype.render = Jo.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current, n = qt();
      dm(a, n, e, t, null, null);
    }, Ns.prototype.unmount = Jo.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        dm(e.current, 2, null, e, null, null), os(), t[zn] = null;
      }
    };
    function Ns(e) {
      this._internalRoot = e;
    }
    Ns.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Ru();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var a = 0; a < tn.length && t !== 0 && t < tn[a].priority; a++) ;
        tn.splice(a, 0, e), a === 0 && ym(e);
      }
    };
    var wm = u.version;
    if (wm !== "19.2.7") throw Error(r(527, wm, "19.2.7"));
    z.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
      return e = y(t), e = e !== null ? w(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var Qg = {
      bundleType: 0,
      version: "19.2.7",
      rendererPackageName: "react-dom",
      currentDispatcherRef: S,
      reconcilerVersion: "19.2.7"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Rs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Rs.isDisabled && Rs.supportsFiber) try {
        yl = Rs.inject(Qg), Tt = Rs;
      } catch {
      }
    }
    return ri.createRoot = function(e, t) {
      if (!m(e)) throw Error(r(299));
      var a = false, n = "", l = Cd, s = Nd, o = Rd;
      return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = um(e, 1, false, null, null, a, n, null, l, s, o, Sm), e[zn] = t.current, Ro(e), new Jo(t);
    }, ri.hydrateRoot = function(e, t, a) {
      if (!m(e)) throw Error(r(299));
      var n = false, l = "", s = Cd, o = Nd, d = Rd, g = null;
      return a != null && (a.unstable_strictMode === true && (n = true), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (s = a.onUncaughtError), a.onCaughtError !== void 0 && (o = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (g = a.formState)), t = um(e, 1, true, t, a ?? null, n, l, g, s, o, d, Sm), t.context = rm(null), a = t.current, n = qt(), n = ks(n), l = Ha(n), l.callback = null, Ga(a, l, n), a = n, t.current.lanes = a, bl(t, a), sa(t), e[zn] = t.current, Ro(e), new Ns(t);
    }, ri.version = "19.2.7", ri;
  }
  var zm;
  function Pg() {
    if (zm) return Io.exports;
    zm = 1;
    function c() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (u) {
        console.error(u);
      }
    }
    return c(), Io.exports = Wg(), Io.exports;
  }
  var ey = Pg();
  const ty = {
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
  function ay(c) {
    const [u, f] = ty[c];
    return f === null ? `${u}+ Elo` : `${u}\u2013${f} Elo`;
  }
  function Rn(c) {
    return c >= 2200 ? "Grandmaster" : c >= 1800 ? "Master" : c >= 1400 ? "Diamond" : c >= 1200 ? "Platinum" : c >= 1e3 ? "Gold" : c >= 800 ? "Silver" : c >= 501 ? "Bronze" : "Copper";
  }
  function ou(c) {
    const u = Rn(c), f = {
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
    }, [r, m] = f[u];
    return c >= m ? 1 : c >= r ? 2 : 3;
  }
  function fi(c) {
    const u = Rn(c), f = ou(c);
    return `${u} ${f === 1 ? "I" : f === 2 ? "II" : "III"}`;
  }
  function ny(c, u) {
    return u > c && (Rn(c) !== Rn(u) || ou(c) !== ou(u));
  }
  function ca({ label: c, value: u, detail: f }) {
    return i.jsxs("div", {
      className: "metric",
      children: [
        i.jsx("span", {
          children: c
        }),
        i.jsx("strong", {
          children: u
        }),
        f && i.jsx("small", {
          children: f
        })
      ]
    });
  }
  function th({ form: c }) {
    return i.jsx("span", {
      className: "form-pips",
      "aria-label": `Recent form ${c.join(", ")}`,
      children: c.map((u, f) => i.jsx("i", {
        className: `pip ${u}`,
        title: u.toUpperCase()
      }, `${u}-${f}`))
    });
  }
  const ly = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ah = (...c) => c.filter((u, f, r) => !!u && u.trim() !== "" && r.indexOf(u) === f).join(" ").trim();
  var iy = {
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
  const sy = D.forwardRef(({ color: c = "currentColor", size: u = 24, strokeWidth: f = 2, absoluteStrokeWidth: r, className: m = "", children: h, iconNode: x, ...E }, j) => D.createElement("svg", {
    ref: j,
    ...iy,
    width: u,
    height: u,
    stroke: c,
    strokeWidth: r ? Number(f) * 24 / Number(u) : f,
    className: ah("lucide", m),
    ...E
  }, [
    ...x.map(([y, w]) => D.createElement(y, w)),
    ...Array.isArray(h) ? h : [
      h
    ]
  ]));
  const Ae = (c, u) => {
    const f = D.forwardRef(({ className: r, ...m }, h) => D.createElement(sy, {
      ref: h,
      iconNode: u,
      className: ah(`lucide-${ly(c)}`, r),
      ...m
    }));
    return f.displayName = `${c}`, f;
  };
  const cy = Ae("ArrowLeft", [
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
  const oy = Ae("ArrowRight", [
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
  const uy = Ae("ChartColumn", [
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
  const Us = Ae("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const ry = Ae("CircleCheck", [
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
  const dy = Ae("CircleHelp", [
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
  const nh = Ae("CircleX", [
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
  const fy = Ae("Clock3", [
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
  const my = Ae("Clock", [
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
  const hy = Ae("Copy", [
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
  const py = Ae("Crown", [
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
  const uu = Ae("Gamepad2", [
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
  const gy = Ae("History", [
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
  const yy = Ae("House", [
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
  const vy = Ae("Info", [
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
  const lh = Ae("LoaderCircle", [
    [
      "path",
      {
        d: "M21 12a9 9 0 1 1-6.219-8.56",
        key: "13zald"
      }
    ]
  ]);
  const ih = Ae("LogIn", [
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
  const by = Ae("LogOut", [
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
  const sh = Ae("MessageCircle", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ]
  ]);
  const Sy = Ae("MessageSquare", [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz"
      }
    ]
  ]);
  const ch = Ae("Minus", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h"
      }
    ]
  ]);
  const wy = Ae("Plus", [
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
  const _m = Ae("RefreshCw", [
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
  const _s = Ae("Search", [
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
  const vu = Ae("Send", [
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
  const ru = Ae("Settings", [
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
  const xy = Ae("Shield", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ]);
  const My = Ae("Shuffle", [
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
  const oh = Ae("Star", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ]);
  const bu = Ae("Swords", [
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
  const jy = Ae("TriangleAlert", [
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
  const Ay = Ae("Trophy", [
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
  const tu = Ae("UserMinus", [
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
  const Ey = Ae("UserPlus", [
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
  const Cy = Ae("User", [
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
  const mi = Ae("Users", [
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
  const Ny = Ae("Wrench", [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ]);
  const Tn = Ae("X", [
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
  function Ry({ maps: c, limit: u, selectedMapIds: f, onToggle: r, favoriteMapId: m, onFavorite: h, disabled: x = false }) {
    const E = u === void 0 ? c : c.slice(0, u), j = f !== void 0 && r !== void 0;
    return i.jsx("div", {
      className: "map-pool",
      children: E.map((y) => {
        const w = !j || f.includes(y.id), B = i.jsxs(i.Fragment, {
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
        return j ? i.jsxs("div", {
          className: "map-thumbnail-wrap",
          children: [
            i.jsx("button", {
              className: w ? "map-thumbnail selected" : "map-thumbnail",
              type: "button",
              "aria-pressed": w,
              "aria-label": `${w ? "Exclude" : "Include"} ${y.name}`,
              disabled: x,
              onClick: () => r(y.id),
              children: B
            }),
            h && i.jsx("button", {
              className: m === y.id ? "map-favorite active" : "map-favorite",
              type: "button",
              disabled: x,
              "aria-pressed": m === y.id,
              "aria-label": `${m === y.id ? "Remove" : "Favorite"} ${y.name}`,
              title: m === y.id ? "Remove favorite" : "Set as favorite",
              onClick: () => h(y.id),
              children: i.jsx(oh, {
                size: 16,
                fill: m === y.id ? "currentColor" : "none"
              })
            })
          ]
        }, y.id) : i.jsx("figure", {
          className: "map-thumbnail selected",
          children: B
        }, y.id);
      })
    });
  }
  const Ty = 5, zy = [
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
  ], _y = [
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
  ], Dy = {
    version: Ty,
    groups: zy,
    maps: _y
  }, Rt = Dy, Uy = new Map(Rt.maps.map((c) => [
    c.id,
    c
  ])), Su = Rt.maps.filter((c) => c.enabled !== false);
  function uh(c) {
    return Uy.get(c);
  }
  function Oy(c, u, f = Math.random) {
    var _a2, _b2;
    const r = new Set(u.mapPool.map((y) => y.id)), m = c.mapPool.filter((y) => r.has(y.id));
    if (m.length === 0) return;
    const h = new Set(Object.values(((_a2 = c.mapPreferences) == null ? void 0 : _a2.favoriteMapIds) ?? {})), x = new Set(Object.values(((_b2 = u.mapPreferences) == null ? void 0 : _b2.favoriteMapIds) ?? {})), E = m.filter((y) => h.has(y.id) && x.has(y.id));
    if (E.length > 0) return E[Math.floor(f() * E.length)];
    const j = m.flatMap((y) => Array.from({
      length: 1 + Number(h.has(y.id)) + Number(x.has(y.id))
    }, () => y));
    return j[Math.floor(f() * j.length)];
  }
  const Ly = "" + new URL("acropolis-wApZU8dN.png", import.meta.url).href, ky = "" + new URL("african-clearing--8pL0rBU.png", import.meta.url).href, qy = "" + new URL("arabia-DEdeLqx5.png", import.meta.url).href, By = "" + new URL("arena-CISRjdFq.png", import.meta.url).href, Hy = "" + new URL("atacama-CxHEccMV.png", import.meta.url).href, Gy = "" + new URL("baltic-DlU6ncMk.png", import.meta.url).href, Yy = "" + new URL("black-forest-CTgJoH8n.png", import.meta.url).href, Qy = "" + new URL("fortified-clearing-DSf9SH4j.png", import.meta.url).href, Xy = "" + new URL("four-lakes-DxiZ0myb.png", import.meta.url).href, Vy = "" + new URL("golden-swamp-DXKIJwHr.png", import.meta.url).href, Zy = "" + new URL("gold-rush-BqrgFIGq.png", import.meta.url).href, Ky = "" + new URL("hideout-hd8sM5kE.png", import.meta.url).href, Jy = "" + new URL("islands-DmKyUyda.png", import.meta.url).href, Fy = "" + new URL("land-madness-3-nLWb05.png", import.meta.url).href, $y = "" + new URL("land-nomad-DxHp81Hp.png", import.meta.url).href, Iy = "" + new URL("mediterranean-CKpZDwRi.png", import.meta.url).href, Wy = "" + new URL("michi-Cry_Jx1o.png", import.meta.url).href, Py = {
    "arabia.png": qy,
    "land-madness.png": Fy,
    "acropolis.png": Ly,
    "african-clearing.png": ky,
    "atacama.png": Hy,
    "gold-rush.png": Zy,
    "land-nomad.png": $y,
    "arena.png": By,
    "fortified-clearing.png": Qy,
    "hideout.png": Ky,
    "black-forest.png": Yy,
    "michi.png": Wy,
    "four-lakes.png": Xy,
    "baltic.png": Gy,
    "islands.png": Jy,
    "mediterranean.png": Iy,
    "golden-swamp.png": Vy
  }, Pt = Su.map((c) => ({
    id: c.id,
    name: c.name,
    style: c.style,
    thumbnailUrl: Py[c.imageAsset]
  })), ln = Rt.groups.map((c) => ({
    ...c,
    maps: Pt.filter((u) => {
      var _a2;
      return ((_a2 = Rt.maps.find((f) => f.id === u.id)) == null ? void 0 : _a2.groupId) === c.id;
    })
  })), Ts = [
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
  ], ft = {
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
  }, Dm = [
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
  ], Um = [
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
  function ev(c) {
    return [
      0,
      1,
      2,
      3,
      4
    ].map((u) => (c + u) % 3 === 0 ? "loss" : "win");
  }
  const wu = Array.from({
    length: 50
  }, (c, u) => {
    const f = 1910 - u * 17 + u % 5 * 3, r = 420 - u * 4, m = 170 + u * 3;
    return {
      id: u === 17 ? ft.id : `player-${u + 1}`,
      aoeProfileId: u === 17 ? ft.aoeProfileId : 62e5 + u,
      displayName: u === 17 ? ft.displayName : `${Um[u % Um.length]}${u + 11}`,
      countryCode: Dm[u % Dm.length],
      rating: u === 17 ? ft.rating : f,
      peakRating: u === 17 ? ft.peakRating : f + 54,
      teamRating: u === 17 ? ft.teamRating : f - 75,
      teamPeakRating: u === 17 ? ft.teamPeakRating : f - 20,
      legacy1v1Wins: r,
      legacy1v1Losses: m,
      legacyTeamWins: Math.max(0, r - 120),
      legacyTeamLosses: Math.max(0, m - 80),
      rank: u === 17 ? ft.rank : u + 1,
      division: Rn(u === 17 ? ft.rating : f),
      wins: r,
      losses: m,
      winRate: Number((r / (r + m) * 100).toFixed(1)),
      streak: u % 9 - 3,
      preferredMaps: [
        Pt[u % Pt.length].name,
        Pt[(u + 3) % Pt.length].name
      ],
      favoriteCivilizations: [
        Ts[u % Ts.length],
        Ts[(u + 4) % Ts.length]
      ],
      recentForm: ev(u)
    };
  }), Om = wu.filter((c) => c.id !== ft.id).slice(10, 18);
  Object.fromEntries(Su.map((c) => [
    c.gameMapName,
    c.lobbyPickerResultIndex
  ]));
  const tv = Su.filter((c) => c.isCustomMap).map((c) => c.gameMapName), oa = {
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
      customMapNames: tv,
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
  }, av = 150, Lm = 4e3, Qe = {
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
  }, nv = {
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
    return new Promise((u) => {
      window.setTimeout(u, c);
    });
  }
  function lv(c) {
    return `[${(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour12: false
    })}] ${c}`;
  }
  class iv {
    constructor(u) {
      this.getConfig = u;
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
    async createLobby(u) {
      if (await Ze(this.getConfig().lobbyCreationDelayMs), this.getConfig().forceLobbyCreationFailure) throw new Error("Lobby creation timed out.");
      return {
        lobby: {
          platformLobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`,
          lobbyName: `Empire League ${u.matchId.slice(-4).toUpperCase()}`,
          password: "empire",
          hostProfileId: u.hostProfileId,
          guestProfileId: u.guestProfileId,
          map: u.map,
          serverRegion: u.serverRegion,
          settings: {
            playerCount: u.playerCount,
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
    async discoverLobby(u) {
      return await Ze(500), {
        lobbyId: `AOE-${Math.floor(1e5 + Math.random() * 899999)}`
      };
    }
    async openLobby(u) {
      return await Ze(250), {
        opened: true
      };
    }
    async verifyLobby(u) {
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
    async waitForGameStart(u) {
      if (await Ze(this.getConfig().forceOpponentJoinTimeout ? 5e3 : this.getConfig().opponentJoinDelayMs), this.getConfig().forceOpponentJoinTimeout) throw new Error("Opponent failed to join the lobby.");
      return {
        started: true,
        startedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async detectGameEnd(u) {
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
  function sv(c, u, f = [], r = Math.random) {
    if ((c == null ? void 0 : c.mode) !== "random") return c;
    const m = u === "land-open" ? c.openLandBans : u === "land-closed" ? c.closedLandBans : [], h = /* @__PURE__ */ new Set([
      ...m ?? [],
      ...f
    ]), x = Os.filter((E) => !h.has(E));
    return {
      mode: "pick",
      civilization: x[Math.floor(r() * x.length)]
    };
  }
  const cv = "http://192.168.4.99:4317".replace(/\/$/, "");
  class ov {
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
    setToken(u) {
      this.token !== u && (this.token = u, this.disconnect("Authentication changed."));
    }
    async request(u, f = {}) {
      await this.connect();
      const r = this.socket;
      if (!r || r.readyState !== WebSocket.OPEN) throw new Error("Matchmaker connection is unavailable.");
      const m = crypto.randomUUID(), h = new Promise((x, E) => {
        this.pending.set(m, {
          resolve: (j) => x(j),
          reject: E
        });
      });
      return r.send(JSON.stringify({
        type: "request",
        id: m,
        method: f.method ?? "GET",
        path: u,
        body: f.body
      })), h;
    }
    subscribe(u, f) {
      return this.subscription = {
        ticketId: u,
        after: 0,
        listener: f
      }, this.connect().then(() => this.sendSubscription()).catch((r) => {
        this.failSubscription(r instanceof Error ? r.message : "Matchmaker connection failed.");
      }), () => {
        var _a2;
        ((_a2 = this.subscription) == null ? void 0 : _a2.ticketId) === u && (this.subscription = null), this.reconnectTimer !== null && window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
      };
    }
    onSocialEvent(u) {
      return this.socialListeners.add(u), () => this.socialListeners.delete(u);
    }
    onCustomLobbyEvent(u) {
      return this.customLobbyListeners.add(u), () => this.customLobbyListeners.delete(u);
    }
    connect() {
      var _a2;
      if (((_a2 = this.socket) == null ? void 0 : _a2.readyState) === WebSocket.OPEN && !this.connectPromise) return Promise.resolve();
      if (this.connectPromise) return this.connectPromise;
      this.deliberatelyClosed = false, this.connectPromise = new Promise((r, m) => {
        this.connectResolve = r, this.connectReject = m;
      });
      const u = new URL("/events", cv);
      u.protocol = u.protocol === "https:" ? "wss:" : "ws:";
      const f = new WebSocket(u);
      return this.socket = f, f.addEventListener("open", () => {
        this.token ? f.send(JSON.stringify({
          type: "authenticate",
          token: this.token
        })) : this.finishConnecting();
      }), f.addEventListener("message", (r) => this.onMessage(f, r)), f.addEventListener("error", () => f.close()), f.addEventListener("close", () => this.onClose(f)), this.connectPromise;
    }
    onMessage(u, f) {
      if (u !== this.socket) return;
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
          const h = r.body;
          m.reject(new Error((h == null ? void 0 : h.error) ?? `Matchmaker request failed (${r.status}).`));
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
      const u = this.connectResolve;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, this.reconnectAttempts = 0, u == null ? void 0 : u(), this.sendSubscription();
    }
    rejectConnecting(u) {
      const f = this.connectReject;
      this.connectPromise = null, this.connectResolve = null, this.connectReject = null, f == null ? void 0 : f(u);
    }
    sendSubscription() {
      var _a2;
      !this.subscription || ((_a2 = this.socket) == null ? void 0 : _a2.readyState) !== WebSocket.OPEN || this.socket.send(JSON.stringify({
        type: "subscribe",
        ticketId: this.subscription.ticketId,
        after: this.subscription.after
      }));
    }
    onClose(u) {
      if (u !== this.socket) return;
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
    disconnect(u) {
      var _a2;
      this.deliberatelyClosed = true, (_a2 = this.socket) == null ? void 0 : _a2.close(1e3, u), this.socket = null, this.rejectConnecting(new Error(u));
      for (const f of this.pending.values()) f.reject(new Error(u));
      this.pending.clear();
    }
    failSubscription(u, f = "MATCHMAKER_UNAVAILABLE") {
      const r = this.subscription;
      this.subscription = null, r == null ? void 0 : r.listener({
        type: "error",
        code: f,
        message: u
      });
    }
  }
  const je = new ov();
  class uv {
    constructor(u) {
      __publicField(this, "listeners", /* @__PURE__ */ new Map());
      __publicField(this, "timers", /* @__PURE__ */ new Map());
      __publicField(this, "queuedDefinitions", /* @__PURE__ */ new Map());
      __publicField(this, "queueRatings", /* @__PURE__ */ new Map());
      __publicField(this, "lowerRatingLimits", /* @__PURE__ */ new Map());
      this.getConfig = u;
    }
    async joinQueue(u) {
      var _a2;
      if (await Ze(350), this.getConfig().forceQueueFailure) throw new Error("Matchmaking service is unavailable.");
      if (!((_a2 = u.queue) == null ? void 0 : _a2.mapPool.length)) throw new Error("At least one selected map is required.");
      const f = {
        id: `ticket-${crypto.randomUUID()}`,
        queueId: u.queueId,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return this.queuedDefinitions.set(f.id, u.queue), this.queueRatings.set(f.id, u.queue.format === "team" ? u.player.teamRating : u.player.rating), this.lowerRatingLimits.set(f.id, u.maximumLowerOpponentRatingGap ?? 0), f;
    }
    async updateQueue(u, f) {
      if (await Ze(75), !this.queuedDefinitions.has(u)) throw new Error("Queue ticket is no longer active.");
      if (!f.mapPool.length) throw new Error("At least one selected map is required.");
      this.queuedDefinitions.set(u, f);
    }
    async leaveQueue(u) {
      await Ze(150), this.clearTimers(u), this.listeners.delete(u), this.queuedDefinitions.delete(u), this.queueRatings.delete(u), this.lowerRatingLimits.delete(u);
    }
    subscribeToQueue(u, f) {
      this.listeners.set(u, f);
      const r = this.queuedDefinitions.get(u), m = this.getConfig(), h = [];
      return [
        0,
        2e4,
        4e4,
        6e4,
        9e4
      ].forEach((x, E) => {
        h.push(window.setTimeout(() => {
          const j = [
            50,
            75,
            100,
            150,
            250
          ][E], y = this.queueRatings.get(u) ?? ft.rating;
          f({
            type: "range",
            minRating: y - j,
            maxRating: y + j
          });
        }, x));
      }), h.push(window.setTimeout(() => {
        var _a2;
        const x = this.queuedDefinitions.get(u) ?? r, E = (x == null ? void 0 : x.mapPool) ?? Pt, j = {
          mapPool: Pt,
          mapPreferences: {
            favoriteMapIds: {}
          }
        }, y = this.lowerRatingLimits.get(u) ?? 0, w = y > 0 ? Om.filter((F) => F.rating >= ft.rating - y) : Om, B = w[Math.floor(Math.random() * w.length)];
        if (!B) return;
        const V = Oy(x ?? {
          mapPool: E
        }, j), H = (_a2 = Rt.maps.find((F) => F.id === (V == null ? void 0 : V.id))) == null ? void 0 : _a2.groupId, p = x ? {
          ...x,
          civilizationPreference: sv(x.civilizationPreference, H)
        } : void 0, $ = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: p ?? {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: Pt,
            mapPreferences: {
              enabledGroupIds: Rt.groups.map((F) => F.id),
              favoriteMapIds: {}
            },
            mapCatalogVersion: Rt.version,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          opponentCivilizationPreference: {
            mode: "pick",
            civilization: "Franks"
          },
          player: ft,
          opponent: B,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 3e4).toISOString(),
          selectedMap: V,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        f({
          type: "match_found",
          match: $
        });
      }, m.queueWaitMs)), this.timers.set(u, h), () => {
        this.clearTimers(u), this.listeners.delete(u), this.queuedDefinitions.delete(u), this.lowerRatingLimits.delete(u);
      };
    }
    async acceptMatch(u) {
      await Ze(250);
      const f = this.getConfig();
      if (f.forceOpponentDecline) throw new Error("Opponent declined the match.");
      window.setTimeout(() => {
        this.listeners.forEach((r) => r({
          type: "opponent_accepted",
          matchId: u
        }));
      }, f.opponentAcceptDelayMs);
    }
    async declineMatch(u) {
      await Ze(200);
    }
    async publishLobby(u, f) {
      await Ze(100);
    }
    async reportGuestLobbyJoined(u) {
      await Ze(100);
    }
    async reportHostLobbyReady(u) {
      await Ze(100);
    }
    async reportGuestContentAccepted(u) {
      await Ze(100);
    }
    async reportGuestLobbyReady(u) {
      await Ze(100);
    }
    async reportGameStarted(u) {
      await Ze(100);
    }
    async reportMatchResult(u) {
      await Ze(100);
    }
    clearTimers(u) {
      var _a2;
      (_a2 = this.timers.get(u)) == null ? void 0 : _a2.forEach((f) => window.clearTimeout(f)), this.timers.delete(u);
    }
  }
  class rv {
    constructor(u) {
      __publicField(this, "status", /* @__PURE__ */ new Map());
      this.getConfig = u;
    }
    async beginTracking(u) {
      await Ze(200), this.status.set(u.id, {
        matchId: u.id,
        stage: "in_game",
        message: "Match in progress"
      });
    }
    async getMatchStatus(u) {
      return await Ze(100), this.status.get(u) ?? {
        matchId: u,
        stage: "in_game",
        message: "Match in progress"
      };
    }
    async waitForVerifiedResult(u) {
      const f = [
        {
          matchId: u,
          stage: "game_finished",
          message: "Game finished"
        },
        {
          matchId: u,
          stage: "waiting_for_data",
          message: "Waiting for official match data"
        },
        {
          matchId: u,
          stage: "result_located",
          message: "Result located"
        },
        {
          matchId: u,
          stage: "players_verified",
          message: "Players verified"
        },
        {
          matchId: u,
          stage: "winner_verified",
          message: "Winner verified"
        },
        {
          matchId: u,
          stage: "rating_updated",
          message: "Rating updated"
        }
      ];
      for (const h of f) await Ze(this.getConfig().resultVerificationDelayMs), this.status.set(u, h);
      if (this.getConfig().forceResultVerificationFailure) throw this.status.set(u, {
        matchId: u,
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
    async submitReplay(u) {
      return await Ze(500), {
        uploaded: true,
        replayId: `replay-${crypto.randomUUID().slice(0, 8)}`
      };
    }
  }
  let pl = null;
  const zs = {
    async restore() {
      var _a2;
      if (pl = await ((_a2 = window.electronApi) == null ? void 0 : _a2.loadAuthToken()) ?? null, !pl) return null;
      je.setToken(pl);
      try {
        const c = (await je.request("/auth/me")).player;
        return await this.reportSteamLicense(c);
      } catch {
        return await this.logout(false), null;
      }
    },
    async signIn() {
      const c = await je.request("/auth/steam/start", {
        method: "POST"
      });
      if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
      await window.electronApi.openSteamLogin(c.loginUrl);
      const u = Date.now() + 300 * 1e3;
      for (; Date.now() < u; ) {
        await new Promise((m) => window.setTimeout(m, 1e3));
        const f = await je.request(`/auth/steam/status?attempt=${encodeURIComponent(c.attemptId)}&token=${encodeURIComponent(c.pollToken)}`);
        if (f.status === "pending") continue;
        if (f.status !== "authenticated" || !f.token) throw new Error(`Steam sign-in ${f.status}.`);
        pl = f.token, await window.electronApi.storeAuthToken(f.token), je.setToken(f.token);
        const r = await je.request("/auth/me");
        return await this.reportSteamLicense(r.player);
      }
      throw new Error("Steam sign-in timed out.");
    },
    async reportSteamLicense(c) {
      var _a2;
      if (!window.electronApi || !c.steamId) return c;
      const u = await window.electronApi.runSteamFamilyProbe(c.steamId).catch(() => null);
      return !u || u.status === "unknown" || !u.currentSteamId || !u.ownerSteamId ? c : ((_a2 = await je.request("/auth/steam-license", {
        method: "POST",
        body: {
          status: u.status,
          currentSteamId: u.currentSteamId,
          ownerSteamId: u.ownerSteamId
        }
      }).catch(() => null)) == null ? void 0 : _a2.player) ?? c;
    },
    async logout(c = true) {
      var _a2;
      c && pl && await je.request("/auth/logout", {
        method: "POST"
      }).catch(() => {
      }), pl = null, je.setToken(null), await ((_a2 = window.electronApi) == null ? void 0 : _a2.clearAuthToken());
    }
  }, rh = new URLSearchParams(window.location.search), Se = rh.get("preview") === "1", dv = Se && rh.get("capture") === "1", dh = {
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
  }, xu = [
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
  ].map(([c, u, f, r, m, h, x, E, j], y) => ({
    id: String(c),
    opponentId: `preview-player-${y + 1}`,
    opponent: String(u),
    opponentRating: Number(f),
    outcome: r,
    map: String(m),
    civilization: String(h),
    opponentCivilization: String(x),
    ratingChange: Number(E),
    durationMinutes: Number(j),
    timestamp: new Date(Date.now() - y * 864e5).toISOString(),
    verified: true,
    queueType: "Ranked 1v1 Random Map"
  })), au = [
    di("custom-1", "Friday Nomad FFA", "Land Nomad", 8, [
      "RelicRunner",
      "BoarPuller",
      "TownBell",
      "FastImp"
    ]),
    di("custom-2", "CBA Practice", "CBA", 8, [
      "CastleClick",
      "FarmReset",
      "GoldMiner",
      "BerryGuard",
      "LoomFirst"
    ]),
    di("custom-3", "Arena 2v2", "Arena", 4, [
      "MonkMicro",
      "WallBuilder",
      "StableSwitch"
    ]),
    di("custom-4", "Michi No Rush", "Michi", 6, [
      "DarkAgeDan",
      "MarketAbuse"
    ]),
    di("custom-5", "Community Megarandom", "Megarandom", 8, [
      "HillFort"
    ])
  ], fh = [
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
  ], mh = [
    {
      id: "request-1",
      connectionId: "connection-1",
      name: "CastleClick",
      initials: "CC",
      rating: 1464,
      mutualFriends: 3
    }
  ];
  function di(c, u, f, r, m) {
    return {
      id: c,
      name: u,
      hostId: `${c}-player-1`,
      map: {
        id: f.toLowerCase().replaceAll(" ", "-"),
        name: f,
        gameName: f,
        kind: "map"
      },
      players: m.map((h, x) => ({
        id: `${c}-player-${x + 1}`,
        displayName: h,
        slot: x + 1,
        team: 0,
        civilization: "Random",
        ready: x < 2,
        host: x === 0
      })),
      messages: [],
      gameSettings: {
        ...dh
      },
      maxPlayers: r,
      status: "open",
      createdAt: new Date(Date.now() - m.length * 12e4).toISOString(),
      demo: true
    };
  }
  const km = {
    async getMine() {
      return Se ? xu : (await je.request("/matches/history")).matches;
    }
  }, fv = "modulepreload", mv = function(c, u) {
    return new URL(c, u).href;
  }, qm = {}, hh = function(u, f, r) {
    let m = Promise.resolve();
    if (f && f.length > 0) {
      let x = function(w) {
        return Promise.all(w.map((B) => Promise.resolve(B).then((V) => ({
          status: "fulfilled",
          value: V
        }), (V) => ({
          status: "rejected",
          reason: V
        }))));
      };
      const E = document.getElementsByTagName("link"), j = document.querySelector("meta[property=csp-nonce]"), y = (j == null ? void 0 : j.nonce) || (j == null ? void 0 : j.getAttribute("nonce"));
      m = x(f.map((w) => {
        if (w = mv(w, r), w in qm) return;
        qm[w] = true;
        const B = w.endsWith(".css"), V = B ? '[rel="stylesheet"]' : "";
        if (!!r) for (let $ = E.length - 1; $ >= 0; $--) {
          const F = E[$];
          if (F.href === w && (!B || F.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${w}"]${V}`)) return;
        const p = document.createElement("link");
        if (p.rel = B ? "stylesheet" : fv, B || (p.as = "script"), p.crossOrigin = "", p.href = w, y && p.setAttribute("nonce", y), document.head.appendChild(p), B) return new Promise(($, F) => {
          p.addEventListener("load", $), p.addEventListener("error", () => F(new Error(`Unable to preload CSS for ${w}`)));
        });
      }));
    }
    function h(x) {
      const E = new Event("vite:preloadError", {
        cancelable: true
      });
      if (E.payload = x, window.dispatchEvent(E), !E.defaultPrevented) throw x;
    }
    return m.then((x) => {
      for (const E of x || []) E.status === "rejected" && h(E.reason);
      return u().catch(h);
    });
  };
  class Ds extends Error {
    constructor(u = false) {
      super(u ? "The team replay does not contain final PostGame results yet." : "The replay does not contain a PostGame or Resign operation yet."), this.name = "ReplayNotFinishedError";
    }
  }
  async function hv(c) {
    var _a2;
    if (!window.electronApi) return false;
    const { parse_rec: u } = await hh(async () => {
      const { parse_rec: h } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: h
      };
    }, [], import.meta.url), f = await window.electronApi.readReplayFile(c), r = f.buffer.slice(f.byteOffset, f.byteOffset + f.byteLength);
    let m;
    try {
      m = u(r);
    } catch {
      return false;
    }
    return ((_a2 = m.operations) == null ? void 0 : _a2.some((h) => {
      if ("PostGame" in h) return true;
      const x = h.Action;
      if (typeof x != "object" || x === null) return false;
      const E = x.action_data;
      return typeof E == "object" && E !== null && "Resign" in E;
    })) ?? false;
  }
  async function pv(c, u = false) {
    var _a2, _b2;
    if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
    const { parse_rec: f, parse_rec_summary: r } = await hh(async () => {
      const { parse_rec: K, parse_rec_summary: ae } = await import("./aoe2rec_js-C8zJ4VVt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      });
      return {
        parse_rec: K,
        parse_rec_summary: ae
      };
    }, [], import.meta.url), m = await window.electronApi.readReplayFile(c), h = m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength);
    let x;
    try {
      x = f(h);
    } catch {
      throw new Ds();
    }
    const E = ((_a2 = x.operations) == null ? void 0 : _a2.some((K) => "PostGame" in K)) ?? false, j = (_b2 = x.operations) == null ? void 0 : _b2.map((K) => K.Action).filter((K) => typeof K == "object" && K !== null).map((K) => K.action_data).filter((K) => typeof K == "object" && K !== null).map((K) => K.Resign).filter((K) => typeof K == "object" && K !== null).map((K) => K.player_id).find((K) => typeof K == "number");
    if (!u && !E && j === void 0) throw new Ds();
    const y = r(h), w = y.header.game_settings, B = y.header.replay, V = y.teams.flatMap((K) => K.players.filter((ae) => ae.profile_id > 0).map((ae) => ({
      profileId: ae.profile_id,
      playerNumber: ae.player_number,
      civilizationId: ae.civ_id,
      resigned: ae.resigned
    }))), H = u || V.length > 2;
    if (H && !E) throw new Ds(true);
    const p = y.teams.filter((K) => K.winner).flatMap((K) => K.players), $ = y.teams.filter((K) => !K.winner).flatMap((K) => K.players), F = y.teams.flatMap((K) => K.players).filter((K) => K.profile_id > 0), le = j === void 0 ? void 0 : F.find((K) => K.player_number === j), fe = !H && le ? F.find((K) => K.player_number !== j) : p.find((K) => K.profile_id > 0), se = !H && le || $.find((K) => K.profile_id > 0), he = V.find((K) => K.playerNumber === y.header.replay.rec_player);
    if (![
      2,
      4,
      8
    ].includes(V.length) || !fe || !se || !he) throw new Error("The replay does not contain identifiable winning and losing teams.");
    return {
      fileSizeBytes: m.byteLength,
      build: y.header.build,
      recordedAt: y.header.timestamp,
      durationMs: y.duration,
      players: V.sort((K, ae) => K.profileId - ae.profileId),
      settings: {
        cheats: w.cheats,
        replayCheatsEnabled: B.cheats_enabled,
        instantBuild: B.instant_build,
        playerCount: w.n_players,
        populationLimit: w.population_limit,
        recordGame: w.record_game,
        gameType: w.game_type,
        replayGameMode: B.game_mode,
        gameSpeedId: B.game_speed_id,
        gameSpeed: B.game_speed,
        startingAgeId: w.starting_age_id,
        startingResourcesId: w.starting_resources_id,
        endingAgeId: w.ending_age_id,
        victoryTypeId: w.victory_type_id,
        victoryAmount: w.victory_amount,
        revealMap: w.reveal_map,
        lockTeams: w.lock_teams,
        allTechs: w.all_techs,
        handicap: w.handicap,
        sharedExploration: w.shared_exploration,
        teamBonusDisabled: w.team_bonus_disabled,
        treatyLength: w.treaty_length,
        selectedMapId: w.selected_map_id,
        resolvedMapId: w.resolved_map_id,
        rmsStrings: [
          ...w.rms_strings
        ]
      },
      reporterProfileId: he.profileId,
      winnerProfileId: fe.profile_id,
      loserProfileId: se.profile_id,
      winningProfileIds: p.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      losingProfileIds: $.map((K) => K.profile_id).filter((K) => K > 0).sort(),
      reason: H ? $.filter((K) => K.profile_id > 0).every((K) => K.resigned) ? "resignation" : "defeat" : j !== void 0 || se.resigned ? "resignation" : "defeat"
    };
  }
  const ph = "empire-league:lobby-setup-timing:v1", gh = 100, yh = 120, gv = 500, yv = 6, vv = 100;
  function bv(c) {
    const u = vh(c), f = bh()[Mu(c)];
    return f.length ? Math.max(1e4, u + wv(f)) : u;
  }
  function Sv(c, u) {
    if (!Number.isFinite(u) || u < 1e4 || u > 18e4) return;
    const f = Mu(c), r = bh(), m = Math.round(u - vh(c));
    r[f] = [
      ...r[f],
      m
    ].slice(-9);
    try {
      window.localStorage.setItem(ph, JSON.stringify(r));
    } catch {
    }
  }
  function vh(c) {
    const u = Mu(c) === "custom", f = oa.mapPicker, r = oa.actions;
    let m = Qe.hostLobbyAutomationSettleMs;
    return m += yv * vv + r.multiplayer.settleMs, m += Cn(r.hostGame) + gv, m += Cn(r.createLobby), m += nn() + Qe.resetFocusMs + Qe.resetConfirmationMs, m += nn() + f.openSettleMs, m += nn() + f.styleMenuSettleMs, m += nn() + f.styleSelectionSettleMs, m += nn() + f.searchSettleMs, m += nn() + f.selectionSettleMs, m += Cn(r.copyLobbyUri) + Qe.clipboardReadMs, m += Bm(c.queue.civilizationPreference), m += Qe.lobbyMetadataMs, m += Qe.guestJoinMs + Qe.guestReadySettleMs, m += Bm(c.opponentCivilizationPreference), m += Qe.hostReadySettleMs + Cn(r.hostReady), u && (m += Qe.customMapTransferPollMs + r.guestReady.settleMs, m += av + r.confirmGuestContent.settleMs, m += Qe.hostReadySettleMs + Cn(r.hostReady)), m += Qe.customMapTransferPollMs, m += Cn(r.guestReady), m += Qe.hostReadyToStartMs + Qe.startGameSettleMs, m += Cn(r.startGame) + Qe.revealAfterStartMs, m;
  }
  function Bm(c) {
    if (!c) return 0;
    let u = nn() + oa.civilizationSlotButtons.settleMs;
    return c.mode === "pick" && (u += nn() + oa.civilizationPicker.searchSettleMs), u += oa.civilizationGrid.hoverMs + oa.civilizationGrid.holdMs + oa.civilizationPicker.selectionSettleMs, u += oa.actions.confirmCivilization.settleMs, u;
  }
  function Cn(c) {
    return (c.hoverMs ?? gh) + (c.holdMs ?? yh) + c.settleMs;
  }
  function nn() {
    return gh + yh;
  }
  function Mu(c) {
    var _a2;
    return oa.mapPicker.customMapNames.includes(((_a2 = c.selectedMap) == null ? void 0 : _a2.name) ?? "") ? "custom" : "standard";
  }
  function bh() {
    try {
      const c = JSON.parse(window.localStorage.getItem(ph) ?? "{}");
      return {
        standard: Hm(c.standard),
        custom: Hm(c.custom)
      };
    } catch {
      return {
        standard: [],
        custom: []
      };
    }
  }
  function Hm(c) {
    return Array.isArray(c) ? c.filter((u) => Number.isFinite(u) && Math.abs(u) <= 12e4).slice(-9) : [];
  }
  function wv(c) {
    const u = [
      ...c
    ].sort((r, m) => r - m), f = Math.floor(u.length / 2);
    return u.length % 2 === 0 ? Math.round((u[f - 1] + u[f]) / 2) : u[f];
  }
  const xv = "empire-league:stop-youtube-shorts";
  async function du() {
    window.dispatchEvent(new Event(xv)), document.fullscreenElement && await document.exitFullscreen().catch(() => {
    });
  }
  const Sh = "empire-league-settings", nu = 7e3, Gm = 3e4, Mv = 65e3, Nn = {
    launchAoe2OnStartup: false,
    serverRegion: "US East",
    matchNotifications: true,
    autoRejectFamilySharing: false,
    maximumLowerOpponentRatingGap: 0
  }, jv = [
    {
      id: "ranked-rm-1v1",
      name: "Ranked 1v1 Random Map",
      description: "Ranked 1v1 Random Map.",
      format: "1v1",
      ruleset: "Random Map",
      mapPool: Pt,
      mapPreferences: {
        enabledGroupIds: Rt.groups.map((c) => c.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Rt.version,
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
      mapPool: Pt,
      mapPreferences: {
        enabledGroupIds: Rt.groups.map((c) => c.id),
        favoriteMapIds: {}
      },
      mapCatalogVersion: Rt.version,
      ranked: false,
      estimatedWaitSeconds: 90,
      playersSearching: 42
    }
  ], wh = D.createContext(null);
  function Av({ children: c }) {
    const [u, f] = D.useState("home"), [r, m] = D.useState(null), [h, x] = D.useState("leaderboard"), E = D.useRef(0), j = D.useRef(null), [y, w] = D.useState(Se ? "authenticated" : "loading"), [B, V] = D.useState(null), [H, p] = D.useState(() => ({
      currentUser: ft,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null,
      transitionInputLocked: false,
      activeMatch: null,
      recentMatches: Se ? xu : [],
      connectionStatus: "online",
      gameStatus: "installed",
      searchRange: {
        min: ft.rating - 50,
        max: ft.rating + 50
      },
      error: null,
      notifications: Se && !dv ? [
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
      mockConfig: nv,
      settings: Ev()
    })), $ = D.useRef(H.mockConfig);
    $.current = H.mockConfig;
    const F = D.useRef(H);
    F.current = H;
    const le = D.useRef(null), fe = D.useRef(false), se = D.useRef(null), he = D.useRef(null), K = D.useRef(false), ae = D.useRef(null), _ = D.useRef(null), L = D.useRef(false), O = D.useRef(false);
    D.useEffect(() => {
      const A = j.current;
      if (!A || A.page !== u) return;
      j.current = null;
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
      u
    ]);
    const J = D.useMemo(() => ({
      matchmaking: new uv(() => $.current),
      game: new iv(() => $.current),
      results: new rv(() => $.current)
    }), []);
    D.useEffect(() => {
      if (Se) return;
      let A = false;
      return zs.restore().then((R) => {
        A || (R ? (v(R), km.getMine().then((Z) => {
          A || p((ne) => ({
            ...ne,
            currentUser: R,
            recentMatches: Z
          }));
        }).catch(() => {
          A || p((Z) => ({
            ...Z,
            currentUser: R,
            recentMatches: []
          }));
        }), w("authenticated")) : w("unauthenticated"));
      }).catch((R) => {
        A || (V(Ym(R, "Could not restore the Steam session.")), w("unauthenticated"));
      }), () => {
        A = true;
      };
    }, []), D.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayEnded((A) => {
        const R = F.current.activeMatch;
        !R || F.current.queueStatus !== "in_game" || L.current || (L.current = true, (async () => {
          var _a2;
          let Z;
          try {
            Z = await pv(A, R.queue.format === "team");
          } catch (ne) {
            if (ne instanceof Ds) {
              L.current = false;
              return;
            }
            const X = ne instanceof Error ? ne.message : "Replay parsing failed.";
            p((P) => ({
              ...P,
              queueStatus: "verifying_result"
            }));
            try {
              await J.matchmaking.reportMatchResult({
                matchId: R.id,
                error: X
              }), S("Replay could not be parsed; result reported as contested");
              return;
            } catch (P) {
              L.current = false, te({
                code: "RESULT_VERIFICATION_FAILED",
                message: "The replay parsing failure could not be reported.",
                technicalDetails: P instanceof Error ? P.message : X,
                retryable: true
              });
              return;
            }
          }
          await ((_a2 = window.electronApi) == null ? void 0 : _a2.confirmReplayEnded()), p((ne) => ({
            ...ne,
            queueStatus: "verifying_result"
          })), S(`Replay ended with terminal operation (${Z.reason}): ${A}`);
          try {
            await J.matchmaking.reportMatchResult({
              matchId: R.id,
              replay: Z
            }), S("Replay result reported; waiting for opponent report");
          } catch (ne) {
            L.current = false, te({
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
    ]), D.useEffect(() => {
      if (window.electronApi) return window.electronApi.onReplayDetectionFailed((A) => {
        const R = F.current.activeMatch;
        !R || F.current.queueStatus !== "in_game" || L.current || (L.current = true, p((Z) => ({
          ...Z,
          queueStatus: "verifying_result"
        })), S("Replay recording did not start; reporting the result as contested"), J.matchmaking.reportMatchResult({
          matchId: R.id,
          error: A
        }).then(() => {
          S("Missing replay reported; waiting for contested result");
        }).catch((Z) => {
          L.current = false, te({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: Z instanceof Error ? Z.message : A,
            retryable: true
          });
        }));
      });
    }, [
      J
    ]);
    async function ee() {
      w("authenticating"), V(null);
      try {
        const A = await zs.signIn();
        v(A);
        const R = await km.getMine();
        p((Z) => ({
          ...Z,
          currentUser: A,
          recentMatches: R
        })), w("authenticated");
      } catch (A) {
        V(Ym(A, "Steam sign-in failed.")), w("unauthenticated");
      }
    }
    async function be() {
      var _a2;
      Se || (pe(), le.current && await J.matchmaking.leaveQueue(le.current).catch(() => {
      }), (_a2 = se.current) == null ? void 0 : _a2.call(se), le.current = null, fe.current = false, await zs.logout(), p((A) => ({
        ...A,
        currentUser: ft,
        queueStatus: "idle",
        selectedQueue: null,
        activeMatch: null
      })), w("unauthenticated"), f("home"));
    }
    D.useEffect(() => {
      if (Se) return;
      let A = false;
      async function R() {
        let ne = null;
        try {
          if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
          const X = await window.electronApi.detectAoe2Installation();
          if (!X.installed || !X.path) {
            A || z(X.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
            return;
          }
          if ((await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
            const nt = await window.electronApi.closeAoe2(true);
            if (!nt.closed) throw new Error(nt.message ?? "AoE2 could not be closed.");
          }
          if (!H.settings.launchAoe2OnStartup) return;
          if (p((ke) => ({
            ...ke,
            gameStatus: "loading"
          })), ne = z("Loading AoE2 DE\u2026", "loading", {
            detail: "Waiting for the game window to become ready.",
            durationMs: null
          }), !await Qm((ke) => {
            ne && I(ne, {
              detail: ke
            });
          })) throw new Error("AoE2 started, but its game window did not become ready in time.");
          ne && I(ne, {
            detail: "Finishing game startup."
          }), await lu(nu), A || (p((ke) => ({
            ...ke,
            gameStatus: "running"
          })), ne && I(ne, {
            message: "AoE2 DE is ready",
            tone: "success",
            detail: void 0,
            durationMs: 5e3
          }));
        } catch (X) {
          A || (ne && G(ne), p((P) => ({
            ...P,
            gameStatus: "installed"
          })), z(X instanceof Error ? X.message : "AoE2 DE could not be launched.", "danger"));
        }
      }
      const Z = window.setTimeout(() => void R(), 0);
      return () => {
        A = true, window.clearTimeout(Z);
      };
    }, []);
    async function De(A) {
      let R = null;
      try {
        if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");
        const Z = await window.electronApi.detectAoe2Installation();
        if (!Z.installed || !Z.path) throw new Error(Z.message ?? "AoE2 DE was not detected.");
        const ne = await window.electronApi.detectAoe2Process();
        if (ne.running && !ne.owned && !(await window.electronApi.closeAoe2(false)).closed) {
          const oe = await window.electronApi.closeAoe2(true);
          if (!oe.closed) throw new Error(oe.message ?? "The existing AoE2 process could not be closed.");
        }
        if (p((P) => ({
          ...P,
          gameStatus: "loading"
        })), R = z("Launching AoE2 DE\u2026", "loading", {
          detail: A === "custom" ? "Your custom game action will continue automatically when the game is ready." : "Matchmaking will begin automatically when the game is ready.",
          durationMs: null
        }), !await Qm((P) => {
          R && I(R, {
            detail: P
          });
        })) throw new Error("AoE2 started, but its game window did not become ready in time.");
        return I(R, {
          detail: "Finishing game startup."
        }), await lu(nu), p((P) => ({
          ...P,
          gameStatus: "running"
        })), I(R, {
          message: "AoE2 DE is ready",
          tone: "success",
          detail: A === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
          durationMs: 3e3
        }), true;
      } catch (Z) {
        return R && G(R), p((ne) => ({
          ...ne,
          gameStatus: "installed"
        })), z(Z instanceof Error ? Z.message : "AoE2 DE could not be launched.", "danger"), false;
      }
    }
    async function Te(A = "matchmaking") {
      if (!window.electronApi) return true;
      const R = await window.electronApi.detectAoe2Process();
      return R.running && R.windowReady && R.owned ? true : De(A);
    }
    async function at() {
      let A = null;
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
        })), A = z("Resetting AoE2 after the disconnect\u2026", "loading", {
          detail: "Closing the abandoned lobby before returning to matchmaking.",
          durationMs: null,
          dismissible: false
        }), (await window.electronApi.detectAoe2Process()).running && !(await window.electronApi.closeAoe2(false)).closed) {
          I(A, {
            detail: "AoE2 did not close normally; forcing it to exit."
          });
          const oe = await window.electronApi.closeAoe2(true);
          if (!oe.closed) throw new Error(oe.message ?? "The abandoned AoE2 process could not be closed.");
        }
        if ((await window.electronApi.detectAoe2Process()).running) throw new Error("AoE2 was still running after the close operation.");
        I(A, {
          detail: "Launching a clean AoE2 session."
        });
        const ne = await window.electronApi.launchAoe2();
        if (!ne.launched) throw new Error(ne.message ?? "Steam did not accept the AoE2 DE launch request.");
        if (!await fu(12e4)) throw new Error("AoE2 restarted, but its game window did not become ready in time.");
        return I(A, {
          detail: "Finishing game startup."
        }), await lu(nu), p((P) => ({
          ...P,
          gameStatus: "running",
          roomSetupMilestone: null
        })), I(A, {
          message: "AoE2 is ready",
          tone: "success",
          detail: "Returning to matchmaking.",
          durationMs: 3e3,
          dismissible: true
        }), true;
      } catch (R) {
        return A && G(A), p((Z) => ({
          ...Z,
          gameStatus: "installed",
          transitionInputLocked: false,
          roomSetupMilestone: null
        })), z(R instanceof Error ? R.message : "AoE2 could not be reset after the disconnect.", "danger"), false;
      }
    }
    function S(A) {
      p((R) => ({
        ...R,
        eventLog: [
          lv(A),
          ...R.eventLog
        ].slice(0, 80)
      }));
    }
    function z(A, R = "info", Z = {}) {
      const ne = crypto.randomUUID();
      return p((X) => ({
        ...X,
        notifications: [
          {
            id: ne,
            message: A,
            tone: R,
            detail: Z.detail,
            durationMs: Z.durationMs === void 0 ? R === "danger" ? 8e3 : 5e3 : Z.durationMs,
            dismissible: Z.dismissible
          },
          ...X.notifications
        ].slice(0, 4)
      })), ne;
    }
    function W() {
      pe(), _.current = window.setTimeout(() => {
        _.current = null;
        const A = F.current.selectedQueue;
        A && de(A, "Lobby setup stopped making progress for 65 seconds.");
      }, Mv);
    }
    async function de(A, R) {
      var _a2, _b2;
      if (K.current) return;
      K.current = true, (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), pe(), fe.current = false, ae.current = null, he.current = null, (_b2 = se.current) == null ? void 0 : _b2.call(se), se.current = null;
      const Z = le.current;
      le.current = null, p((X) => ({
        ...X,
        queueStatus: "cancelled",
        activeMatch: null,
        error: null,
        transitionInputLocked: false,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null
      })), z(R, "warning", {
        durationMs: 5e3,
        dismissible: false
      }), Z && await J.matchmaking.leaveQueue(Z).catch(() => {
      }), S("Lobby setup failed; resetting AoE2 before returning to queue");
      const ne = await at();
      K.current = false, ne && await ge(A);
    }
    function pe() {
      _.current !== null && (window.clearTimeout(_.current), _.current = null);
    }
    function v(A) {
      A.steamLicenseStatus !== "family_shared" || O.current || (O.current = true, z("Opponents may reject matches with you because you are using family share.", "warning", {
        durationMs: null,
        dismissible: true
      }));
    }
    function G(A) {
      p((R) => {
        var _a2, _b2;
        return {
          ...R,
          notifications: R.notifications.filter((Z) => Z.id !== A),
          error: ((_a2 = R.error) == null ? void 0 : _a2.notificationId) === A ? null : R.error,
          queueStatus: ((_b2 = R.error) == null ? void 0 : _b2.notificationId) === A && R.queueStatus === "error" ? "idle" : R.queueStatus
        };
      });
    }
    function I(A, R) {
      p((Z) => ({
        ...Z,
        notifications: Z.notifications.map((ne) => ne.id === A ? {
          ...ne,
          ...R
        } : ne)
      }));
    }
    function te(A) {
      const R = z(A.message, "danger", {
        detail: A.technicalDetails,
        durationMs: null
      });
      p((Z) => ({
        ...Z,
        error: {
          ...A,
          notificationId: R
        },
        queueStatus: "error"
      }));
    }
    async function ge(A) {
      var _a2, _b2;
      const R = [
        "idle",
        "cancelled",
        "completed"
      ].includes(H.queueStatus) && (!H.activeMatch || H.queueStatus === "completed");
      if (!(H.gameStatus === "loading" || !R || fe.current)) {
        fe.current = true;
        try {
          if (!await Te()) {
            fe.current = false;
            return;
          }
          if (le.current) {
            const X = le.current;
            (_a2 = se.current) == null ? void 0 : _a2.call(se), se.current = null, le.current = null, await J.matchmaking.leaveQueue(X).catch(() => {
            });
          }
          const Z = await zs.reportSteamLicense(H.currentUser);
          v(Z), Z !== H.currentUser && p((X) => ({
            ...X,
            currentUser: Z
          }));
          const ne = await J.matchmaking.joinQueue({
            queueId: A.id,
            queue: A,
            player: Z,
            canHost: true,
            maximumLowerOpponentRatingGap: H.settings.maximumLowerOpponentRatingGap
          });
          le.current = ne.id, ((_b2 = ne.ignoredMapIds) == null ? void 0 : _b2.length) && z("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
            detail: `Ignored maps: ${ne.ignoredMapIds.join(", ")}`,
            durationMs: 1e4
          }), p((X) => ({
            ...X,
            selectedQueue: A,
            searchRange: {
              min: (A.format === "team" ? Z.teamRating : Z.rating) - 50,
              max: (A.format === "team" ? Z.teamRating : Z.rating) + 50
            },
            queueStartedAt: ne.joinedAt,
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            queueStatus: "searching",
            activeMatch: null,
            error: null
          })), f("ranked"), S(`Joined queue ${A.id}`), se.current = J.matchmaking.subscribeToQueue(ne.id, (X) => {
            var _a3, _b3, _c, _d, _e, _f, _g, _h, _i, _j, _k;
            if (X.type === "range" && p((P) => ({
              ...P,
              searchRange: {
                min: X.minRating,
                max: X.maxRating
              }
            })), X.type === "match_found") {
              if (H.settings.autoRejectFamilySharing && X.match.queue.id === "ranked-rm-1v1" && X.match.opponent.steamLicenseStatus === "family_shared") {
                S(`Automatically declining family-shared opponent: ${X.match.id}`), z("Automatically declined a Family Share opponent.", "warning"), Ve(X.match.id);
                return;
              }
              const oe = {
                ...X.match,
                player: H.currentUser,
                status: "match_found"
              };
              ae.current = oe, f("ranked"), p((ke) => ({
                ...ke,
                queueStatus: "match_found",
                roomSetupStartedAt: null,
                roomSetupEstimateMs: null,
                roomSetupMilestone: null,
                activeMatch: oe
              })), S(`Match found: ${X.match.id}`), H.settings.matchNotifications && ((_a3 = window.electronApi) == null ? void 0 : _a3.alertMatchFound());
            }
            if (X.type === "opponent_accepted") {
              const P = ae.current;
              if (!P) return;
              (_b3 = window.electronApi) == null ? void 0 : _b3.stopMatchFoundAlert(), W();
              const oe = {
                ...P,
                acceptedByPlayer: true,
                acceptedByOpponent: true,
                status: X.role === "host" ? "creating_lobby" : "waiting_for_opponent"
              };
              ae.current = oe, p((ke) => ({
                ...ke,
                queueStatus: X.role === "host" ? "creating_lobby" : "waiting_for_opponent",
                roomSetupStartedAt: (/* @__PURE__ */ new Date()).toISOString(),
                roomSetupEstimateMs: bv(oe),
                roomSetupMilestone: X.role === "host" ? "Setting up lobby room" : "Waiting for the host to set up the lobby room",
                activeMatch: oe
              })), S("Both players accepted"), X.role === "host" && window.electronApi && (S("Assigned as host; waiting for AoE2 lobby automation to settle"), he.current = Ra(Qe.hostLobbyAutomationSettleMs).then(() => {
                var _a4;
                return W(), S("Starting AoE2 lobby automation"), window.electronApi.runAoe2CreateLobbySequence(mu(oe.selectedMap), oe.queue.format === "team" ? (((_a4 = oe.queue.teamSizes) == null ? void 0 : _a4[0]) ?? 2) * 2 : 2);
              }), ua(oe));
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
            })), S(`Host published lobby: ${X.lobby.platformLobbyId ?? "pending"}`), ((_c = X.lobby.platformLobbyId) == null ? void 0 : _c.startsWith("aoe2de://0/")) && window.electronApi && window.electronApi.openAoe2Lobby(X.lobby.platformLobbyId).then(async (P) => {
              var _a4, _b4;
              if (S(P.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected"), P.opened) {
                S("Guest lobby opened; waiting for the Ready button state to settle"), await Ra(Qe.guestReadySettleMs);
                const oe = (_a4 = ae.current) == null ? void 0 : _a4.queue.civilizationPreference, ke = Vm(oe);
                if (ke) {
                  const $e = ((_b4 = ae.current) == null ? void 0 : _b4.lobbySlot) ?? 2;
                  S(`Selecting ${ke} for guest lobby slot ${$e}`);
                  const Gt = await window.electronApi.selectAoe2Civilization(ke, $e);
                  if (!Gt.sent) throw new Error(Gt.message);
                  Gt.usedRandomCivilizationFallback ? (z("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), S(`${ke} unavailable; Random selected in AoE2`)) : S(`${ke} selected in AoE2`);
                }
                const nt = ae.current;
                if ((nt == null ? void 0 : nt.queue.format) === "team") {
                  const $e = nt.lobbySlot ?? 2, Gt = nt.team ?? 2;
                  S(`Selecting Team ${Gt} for guest lobby slot ${$e}`);
                  const on = await window.electronApi.selectAoe2Team(Gt, $e);
                  if (!on.sent) throw new Error(on.message);
                }
                S("Guest lobby opened; reporting join to the host"), await J.matchmaking.reportGuestLobbyJoined(X.matchId), S("Guest joined; waiting for the host to finalize custom map transfer"), p(($e) => ({
                  ...$e,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((P) => {
              const oe = P instanceof Error ? P.message : "The host lobby could not be opened.";
              S(`Opening the host lobby failed: ${oe}`), de(A, oe);
            })), X.type === "guest_lobby_joined" && window.electronApi && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent joined \u2014 finalizing lobby files"
            })), (async () => {
              try {
                S("Guest joined; waiting for the host lobby state to settle"), await Ra(Qe.hostReadySettleMs), S("Guest joined; clicking Ready for the host");
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                await J.matchmaking.reportHostLobbyReady(X.matchId), S("Host readied; guest notified to wait for custom map transfer"), p((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The host could not finalize the lobby.";
                S(`Automated host Ready failed: ${oe}`), de(A, oe);
              }
            })()), X.type === "host_lobby_ready" && window.electronApi) {
              const P = Xm((_d = ae.current) == null ? void 0 : _d.selectedMap);
              p((oe) => ({
                ...oe,
                roomSetupMilestone: P ? "Receiving lobby files" : "Waiting for Ready"
              })), (async () => {
                try {
                  const oe = Date.now() + Qe.customMapTransferTimeoutMs;
                  let ke = false, nt;
                  do
                    await Ra(Qe.customMapTransferPollMs), nt = await window.electronApi.runAoe2LobbyCursorAction("guest-ready"), !nt.sent && P && !ke && (S("Guest Ready remains unavailable; checking for the unverified-content confirmation"), (await window.electronApi.runAoe2LobbyCursorAction("content-confirm")).sent ? (await J.matchmaking.reportGuestContentAccepted(X.matchId), ke = true, S(`Content accepted; allowing ${Lm} ms for the host to restore Ready`), await Ra(Lm)) : S("Unverified-content confirmation keys could not be sent"));
                  while (!nt.sent && Date.now() < oe);
                  if (!nt.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
                  S("Guest Ready verified; reporting readiness to the host"), await J.matchmaking.reportGuestLobbyReady(X.matchId), pe(), p(($e) => ({
                    ...$e,
                    roomSetupMilestone: "Ready \u2014 waiting for the host to start"
                  }));
                } catch (oe) {
                  const ke = oe instanceof Error ? oe.message : "Lobby file transfer did not complete.";
                  S(`Guest file transfer or Ready failed: ${ke}`), de(A, ke);
                }
              })();
            }
            if (X.type === "guest_content_accepted" && window.electronApi && Xm((_e = ae.current) == null ? void 0 : _e.selectedMap) && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent accepted lobby files \u2014 confirming host Ready"
            })), (async () => {
              try {
                S("Guest accepted custom content; waiting for the lobby state to settle"), await Ra(Qe.hostReadySettleMs);
                const P = await window.electronApi.runAoe2LobbyCursorAction("host-ready");
                if (!P.sent) throw new Error(P.message);
                S("Host Ready verified again after guest content acceptance"), p((oe) => ({
                  ...oe,
                  roomSetupMilestone: "Waiting for opponent file transfer"
                }));
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The host could not resume the lobby file transfer.";
                S(`Second host Ready failed: ${oe}`), de(A, oe);
              }
            })()), X.type === "guest_lobby_ready" && window.electronApi && (p((P) => ({
              ...P,
              roomSetupMilestone: "Opponent ready \u2014 starting game"
            })), (async () => {
              try {
                S("Guest reported ready; waiting for the Start button state to settle"), await Ra(Qe.hostReadyToStartMs), await Ra(Qe.startGameSettleMs), S("Host readied; clicking Start Game");
                const P = await window.electronApi.runAoe2LobbyCursorAction("start");
                if (!P.sent) throw new Error(P.message);
                pe(), p((oe) => ({
                  ...oe,
                  queueStatus: "ready",
                  gameStatus: "in_match",
                  roomSetupMilestone: "Starting game",
                  transitionInputLocked: true,
                  activeMatch: oe.activeMatch ? {
                    ...oe.activeMatch,
                    status: "ready"
                  } : null
                })), await J.matchmaking.reportGameStarted(X.matchId), q();
              } catch (P) {
                const oe = P instanceof Error ? P.message : "The automated game start failed.";
                S(`Automated host start failed: ${oe}`), de(A, oe);
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
            })), S("Host started the game"), q()), X.type === "result_verified" || X.type === "result_contested") {
              if (X.matchId !== ((_f = F.current.activeMatch) == null ? void 0 : _f.id)) return;
              Ht(X.result);
            }
            if (X.type === "error") {
              if (X.code === "TICKET_NOT_FOUND") {
                fe.current = false, ae.current = null, le.current = null, (_g = se.current) == null ? void 0 : _g.call(se), se.current = null, p((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), z("The matchmaking server restarted. Rejoining the queue\u2026", "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), S("Queue ticket expired after a server restart; rejoining"), window.setTimeout(() => void ge(A), 0);
                return;
              }
              if (X.code === "MATCH_DISCONNECTED" || X.code === "MATCH_SETUP_FAILED") {
                de(A, X.message);
                return;
              }
              if (X.code === "MATCH_DECLINED") {
                (_h = window.electronApi) == null ? void 0 : _h.stopMatchFoundAlert(), pe(), fe.current = false, ae.current = null, le.current && (J.matchmaking.leaveQueue(le.current).catch(() => {
                }), le.current = null), (_i = se.current) == null ? void 0 : _i.call(se), se.current = null, p((P) => ({
                  ...P,
                  queueStatus: "cancelled",
                  activeMatch: null,
                  error: null
                })), z(X.message, "warning", {
                  durationMs: 5e3,
                  dismissible: false
                }), S("Opponent declined; returning to queue"), window.setTimeout(() => void ge(A), 0);
                return;
              }
              X.code === "MATCH_EXPIRED" && ((_j = window.electronApi) == null ? void 0 : _j.stopMatchFoundAlert(), pe(), fe.current = false, ae.current = null, le.current && (J.matchmaking.leaveQueue(le.current).catch(() => {
              }), le.current = null), (_k = se.current) == null ? void 0 : _k.call(se), se.current = null, p((P) => ({
                ...P,
                queueStatus: "cancelled",
                activeMatch: null
              }))), te({
                code: X.code,
                message: X.message,
                retryable: true
              });
            }
          });
        } catch (Z) {
          fe.current = false, te({
            code: "QUEUE_JOIN_FAILED",
            message: "Matchmaking is currently unavailable.",
            technicalDetails: Z instanceof Error ? Z.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function we() {
      var _a2;
      pe(), (_a2 = se.current) == null ? void 0 : _a2.call(se), se.current = null;
      const A = le.current;
      le.current = null, fe.current = false, A && await J.matchmaking.leaveQueue(A).catch((R) => {
        const Z = R instanceof Error ? R.message : "";
        Z.toLowerCase().includes("ticket not found") || (S(`Queue cancellation could not be confirmed: ${Z || "Unknown error"}`), z("The matchmaking server could not confirm cancellation", "danger", {
          detail: Z || void 0,
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
      })), S("Queue cancelled");
    }
    async function ze(A) {
      var _a2;
      const R = le.current;
      if (!(!R || F.current.queueStatus !== "searching")) try {
        if (await J.matchmaking.updateQueue(R, A), F.current.queueStatus !== "searching") return;
        p((Z) => ({
          ...Z,
          selectedQueue: A
        })), S(`Updated active queue preferences: ${((_a2 = A.civilizationPreference) == null ? void 0 : _a2.mode) ?? "pick"}, ${A.mapPool.length} maps`);
      } catch (Z) {
        if (F.current.queueStatus !== "searching") return;
        S(`Active queue preference update failed: ${Z instanceof Error ? Z.message : "Unknown error"}`), z("Your queue preferences could not be updated", "danger");
      }
    }
    async function ot() {
      var _a2;
      if (H.activeMatch) {
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
          })), S("Local player accepted"), await J.matchmaking.acceptMatch(H.activeMatch.id);
        } catch (A) {
          te({
            code: "MATCH_ACCEPT_FAILED",
            message: "The match could not be accepted.",
            technicalDetails: A instanceof Error ? A.message : void 0,
            retryable: true
          });
        }
      }
    }
    async function Ve(A) {
      var _a2, _b2;
      (_a2 = window.electronApi) == null ? void 0 : _a2.stopMatchFoundAlert(), pe(), (_b2 = se.current) == null ? void 0 : _b2.call(se), se.current = null;
      try {
        A && await J.matchmaking.declineMatch(A);
      } finally {
        le.current && await J.matchmaking.leaveQueue(le.current).catch(() => {
        }), le.current = null, fe.current = false, ae.current = null, p((R) => ({
          ...R,
          queueStatus: "cancelled",
          activeMatch: null
        }));
      }
      S("Match declined");
    }
    async function wt() {
      var _a2;
      await Ve((_a2 = H.activeMatch) == null ? void 0 : _a2.id);
    }
    async function ua(A) {
      var _a2, _b2, _c;
      const R = A ?? H.activeMatch;
      if (R == null ? void 0 : R.selectedMap) try {
        if (f("ranked"), p((X) => ({
          ...X,
          queueStatus: "creating_lobby"
        })), S("Detecting AoE2 installation"), !(await J.game.detectInstallation()).installed) throw new Error("AoE2 installation not detected.");
        if (S("Installation detected"), await J.game.detectRunningGame(), S("AoE2 process found"), await J.game.launchGame(), S("Opening multiplayer menu"), window.electronApi) {
          const X = await (he.current ?? window.electronApi.runAoe2CreateLobbySequence(mu(R.selectedMap), R.queue.format === "team" ? (((_a2 = R.queue.teamSizes) == null ? void 0 : _a2[0]) ?? 2) * 2 : 2));
          if (he.current = null, !X.sent) throw new Error(X.message);
          if (!X.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
          S("AoE2 host-lobby sequence completed"), W();
          const P = R.queue.civilizationPreference, oe = Vm(P);
          if (oe) {
            S(`Selecting ${oe} for host lobby slot 1`);
            const $e = await window.electronApi.selectAoe2Civilization(oe, 1);
            if (!$e.sent) throw new Error($e.message);
            $e.usedRandomCivilizationFallback ? (z("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning"), S(`${oe} unavailable; Random selected in AoE2`)) : S(`${oe} selected in AoE2`);
          }
          if (R.queue.format === "team") {
            const $e = R.lobbySlot ?? 1, Gt = R.team ?? 1;
            S(`Selecting Team ${Gt} for host lobby slot ${$e}`);
            const on = await window.electronApi.selectAoe2Team(Gt, $e);
            if (!on.sent) throw new Error(on.message);
          }
          S(`Lobby URI discovered: ${X.lobbyUri}`);
          const nt = {
            ...(await J.game.createLobby({
              matchId: R.id,
              hostProfileId: R.player.aoeProfileId,
              guestProfileId: R.opponent.aoeProfileId,
              map: R.selectedMap,
              serverRegion: H.settings.serverRegion,
              playerCount: R.queue.format === "team" ? (((_b2 = R.queue.teamSizes) == null ? void 0 : _b2[0]) ?? 2) * 2 : 2
            })).lobby,
            platformLobbyId: X.lobbyUri
          };
          S(`Lobby created: ${nt.platformLobbyId}`), await J.matchmaking.publishLobby(R.id, nt), S("Lobby details published to opponent"), pe(), p(($e) => ({
            ...$e,
            activeMatch: $e.activeMatch ? {
              ...$e.activeMatch,
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
          serverRegion: H.settings.serverRegion,
          playerCount: R.queue.format === "team" ? (((_c = R.queue.teamSizes) == null ? void 0 : _c[0]) ?? 2) * 2 : 2
        });
        S(`Lobby created: ${ne.lobby.platformLobbyId ?? "pending"}`), await J.matchmaking.publishLobby(R.id, ne.lobby), S("Lobby details published to opponent"), p((X) => ({
          ...X,
          activeMatch: X.activeMatch ? {
            ...X.activeMatch,
            lobby: ne.lobby
          } : null,
          queueStatus: "waiting_for_opponent"
        })), S("Opponent invited"), await J.game.waitForGameStart(ne.lobby.platformLobbyId ?? R.id), S("Opponent joined"), p((X) => ({
          ...X,
          queueStatus: "verifying_lobby"
        })), await J.game.verifyLobby(ne.lobby.platformLobbyId ?? R.id), S("Lobby verified"), p((X) => ({
          ...X,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: X.activeMatch ? {
            ...X.activeMatch,
            lobby: Cv(ne.lobby),
            status: "ready"
          } : null
        }));
      } catch (Z) {
        const ne = Z instanceof Error ? Z.message : "We could not create the AoE2 lobby.";
        S(`Lobby preparation failed: ${ne}`);
        const X = R.queue;
        de(X, ne);
      }
    }
    async function ra() {
      if (window.electronApi) {
        const A = await window.electronApi.startReplayEndDetection();
        A.started || S(`Replay detection unavailable: ${A.message ?? "unknown error"}`);
      }
      await du(), await J.game.focusGame(), p((A) => ({
        ...A,
        queueStatus: "in_game",
        gameStatus: "in_match"
      })), S("Focused AoE2"), H.activeMatch && await J.results.beginTracking(H.activeMatch);
    }
    async function za() {
      const A = H.activeMatch;
      if (A) try {
        p((Z) => ({
          ...Z,
          queueStatus: "verifying_result"
        })), S("Game finished");
        const R = await J.results.waitForVerifiedResult(A.id);
        Ht(R);
      } catch (R) {
        te({
          code: "RESULT_VERIFICATION_FAILED",
          message: "The result service could not verify this match.",
          technicalDetails: R instanceof Error ? R.message : void 0,
          retryable: true
        });
      }
    }
    function Ht(A) {
      var _a2;
      fe.current = false, L.current = false, (_a2 = window.electronApi) == null ? void 0 : _a2.stopReplayEndDetection(), p((R) => {
        var _a3, _b2, _c;
        const Z = R.activeMatch ? {
          ...R.activeMatch,
          result: A,
          status: "completed"
        } : null, ne = A.ratingPool === "team", X = !ne && A.outcome === "win" ? R.currentUser.wins + 1 : R.currentUser.wins, P = !ne && A.outcome === "loss" ? R.currentUser.losses + 1 : R.currentUser.losses, oe = {
          ...R.currentUser,
          rating: A.verified && !ne ? A.newRating : R.currentUser.rating,
          peakRating: A.verified && !ne ? Math.max(R.currentUser.peakRating, A.newRating) : R.currentUser.peakRating,
          teamRating: A.verified && ne ? A.newRating : R.currentUser.teamRating,
          teamPeakRating: A.verified && ne ? Math.max(R.currentUser.teamPeakRating, A.newRating) : R.currentUser.teamPeakRating,
          division: A.verified && !ne ? Rn(A.newRating) : R.currentUser.division,
          wins: X,
          losses: P,
          winRate: X + P > 0 ? Number((X / (X + P) * 100).toFixed(1)) : 0,
          streak: ne ? R.currentUser.streak : A.outcome === "win" ? Math.max(1, R.currentUser.streak + 1) : A.outcome === "loss" ? Math.min(-1, R.currentUser.streak - 1) : R.currentUser.streak
        }, ke = Z && A.verified ? {
          id: Z.id,
          opponent: Z.opponent.displayName,
          opponentId: Z.opponent.id,
          opponentRating: ne ? Z.opponent.teamRating : Z.opponent.rating,
          outcome: A.outcome,
          map: ((_a3 = Z.selectedMap) == null ? void 0 : _a3.name) ?? "Arabia",
          civilization: ((_b2 = Z.queue.civilizationPreference) == null ? void 0 : _b2.civilization) ?? "",
          opponentCivilization: ((_c = Z.opponentCivilizationPreference) == null ? void 0 : _c.civilization) ?? "",
          ratingChange: A.ratingChange,
          durationMinutes: 24,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          verified: A.verified,
          queueType: Z.queue.name
        } : null;
        return {
          ...R,
          currentUser: oe,
          activeMatch: Z,
          queueStatus: "completed",
          gameStatus: "installed",
          recentMatches: ke ? [
            ke,
            ...R.recentMatches
          ] : R.recentMatches
        };
      }), A.verificationStatus === "contested" ? (S("Replay reports conflicted; result discarded"), z("Result contested \u2014 no rating change", "warning")) : S("Match result verified");
    }
    async function sn() {
      var _a2;
      (_a2 = se.current) == null ? void 0 : _a2.call(se), se.current = null, le.current && (await J.matchmaking.leaveQueue(le.current).catch(() => {
      }), le.current = null), ae.current = null, p((A) => ({
        ...A,
        queueStatus: "idle",
        selectedQueue: null,
        queueStartedAt: null,
        activeMatch: null,
        error: null
      })), f("ranked");
    }
    function cn(A) {
      p((R) => ({
        ...R,
        mockConfig: {
          ...R.mockConfig,
          ...A
        }
      }));
    }
    async function q() {
      if (!window.electronApi) return;
      await Ra(Qe.revealAfterStartMs);
      const A = await window.electronApi.startReplayEndDetection();
      A.started || S(`Replay detection unavailable: ${A.message ?? "unknown error"}`), await du(), await window.electronApi.focusAoe2();
      const R = F.current;
      R.activeMatch && R.roomSetupStartedAt && Sv(R.activeMatch, Date.now() - new Date(R.roomSetupStartedAt).getTime()), p((Z) => ({
        ...Z,
        queueStatus: "in_game",
        roomSetupMilestone: null,
        transitionInputLocked: false,
        activeMatch: Z.activeMatch ? {
          ...Z.activeMatch,
          status: "in_game"
        } : null
      })), S("Showing AoE2 after game start");
    }
    function ue(A) {
      p((R) => {
        const Z = {
          ...R.settings,
          ...A
        };
        return window.localStorage.setItem(Sh, JSON.stringify(Z)), {
          ...R,
          settings: Z
        };
      });
    }
    const ye = {
      state: H,
      page: u,
      setPage: f,
      selectedProfileId: r,
      openPlayerProfile: (A) => {
        var _a2;
        u !== "profile" && (x(u), E.current = ((_a2 = document.querySelector(".main-area")) == null ? void 0 : _a2.scrollTop) ?? 0), m(A), f("profile");
      },
      returnFromPlayerProfile: () => {
        j.current = {
          page: h,
          top: E.current
        }, m(null), f(h);
      },
      queues: jv,
      ensureAoe2Ready: Te,
      startQueue: ge,
      updateActiveQueue: ze,
      cancelQueue: we,
      acceptMatch: ot,
      declineMatch: wt,
      prepareLobby: ua,
      openAoe2: ra,
      simulateMatchEnd: za,
      returnToMatchmaking: sn,
      updateMockConfig: cn,
      updateSettings: ue,
      notify: z,
      dismissNotification: G,
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
      authStatus: y,
      authError: B,
      signInWithSteam: ee,
      signOut: be
    };
    return i.jsx(wh.Provider, {
      value: ye,
      children: c
    });
  }
  function Ym(c, u) {
    return c instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(c.message) ? "Error: Matchmaking server is down." : c instanceof Error ? c.message : u;
  }
  async function fu(c) {
    if (!window.electronApi) return false;
    const u = Date.now() + c;
    for (; Date.now() < u; ) {
      const f = await window.electronApi.detectAoe2Process();
      if (f.running && f.windowReady) return true;
      await new Promise((r) => window.setTimeout(r, 500));
    }
    return false;
  }
  async function Qm(c) {
    if (!window.electronApi) return false;
    const u = await window.electronApi.launchAoe2();
    if (!u.launched) throw new Error(u.message ?? "Steam did not accept the AoE2 DE launch request.");
    if (await fu(Gm)) return true;
    if ((await window.electronApi.detectAoe2Process()).running) c("AoE2 is still starting. Waiting another 30 seconds.");
    else {
      c("AoE2 did not start. Retrying the Steam launch once.");
      const r = await window.electronApi.launchAoe2();
      if (!r.launched) throw new Error(r.message ?? "Steam did not accept the AoE2 DE retry request.");
    }
    return fu(Gm);
  }
  function lu(c) {
    return new Promise((u) => window.setTimeout(u, c));
  }
  function Ra(c) {
    return new Promise((u) => window.setTimeout(u, c));
  }
  function mu(c) {
    var _a2;
    return (c && ((_a2 = uh(c.id)) == null ? void 0 : _a2.gameMapName)) ?? Rt.maps[0].gameMapName;
  }
  function Xm(c) {
    return c !== void 0 && oa.mapPicker.customMapNames.includes(mu(c));
  }
  function Vm(c) {
    return c ? c.mode === "pick" ? c.civilization ?? null : c.mode === "random" ? null : c.mode === "mirror" ? "Mirror" : null : null;
  }
  function St() {
    const c = D.useContext(wh);
    if (!c) throw new Error("useAppStore must be used inside AppProvider");
    return c;
  }
  function Ev() {
    try {
      const c = window.localStorage.getItem(Sh);
      if (!c) return Nn;
      const u = JSON.parse(c);
      return {
        launchAoe2OnStartup: typeof u.launchAoe2OnStartup == "boolean" ? u.launchAoe2OnStartup : Nn.launchAoe2OnStartup,
        serverRegion: typeof u.serverRegion == "string" ? u.serverRegion : Nn.serverRegion,
        matchNotifications: typeof u.matchNotifications == "boolean" ? u.matchNotifications : Nn.matchNotifications,
        autoRejectFamilySharing: typeof u.autoRejectFamilySharing == "boolean" ? u.autoRejectFamilySharing : Nn.autoRejectFamilySharing,
        maximumLowerOpponentRatingGap: [
          0,
          200,
          300,
          400,
          500
        ].includes(Number(u.maximumLowerOpponentRatingGap)) ? Number(u.maximumLowerOpponentRatingGap) : Nn.maximumLowerOpponentRatingGap
      };
    } catch {
      return Nn;
    }
  }
  function Cv(c) {
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
  const Nv = ((_a = ln.find((c) => c.id === "land-open")) == null ? void 0 : _a.maps) ?? [];
  function Rv() {
    const { state: c } = St(), u = c.currentUser, f = c.recentMatches.slice(0, 5).map((r) => r.outcome);
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
                children: u.rating
              }),
              i.jsxs("p", {
                children: [
                  fi(u.rating),
                  " \xB7 Global Rank #",
                  u.rank.toLocaleString()
                ]
              })
            ]
          })
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(ca, {
              label: "Division",
              value: fi(u.rating),
              detail: `${u.wins + u.losses} ranked matches`
            }),
            i.jsx(ca, {
              label: "Season Record",
              value: `${u.wins}-${u.losses}`,
              detail: `${u.winRate}% win rate`
            }),
            i.jsx(ca, {
              label: "Current Streak",
              value: u.streak > 0 ? `W${u.streak}` : `L${Math.abs(u.streak)}`
            }),
            i.jsx(ca, {
              label: "Peak Rating",
              value: u.peakRating
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
                f.length > 0 && i.jsx(th, {
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
            i.jsx(Ry, {
              maps: Nv
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
  function Ta({ label: c, options: u, value: f, onChange: r, className: m, disabled: h = false, searchable: x = false, displayValue: E }) {
    var _a2, _b2;
    const j = D.useRef(null), [y, w] = D.useState(""), B = E ?? ((_a2 = u.find((H) => H.value === f)) == null ? void 0 : _a2.label) ?? ((_b2 = u[0]) == null ? void 0 : _b2.label) ?? "", V = x ? u.filter((H) => H.label.toLowerCase().includes(y.trim().toLowerCase())) : u;
    return D.useEffect(() => {
      const H = (p) => {
        const $ = j.current;
        ($ == null ? void 0 : $.open) && p.target instanceof Node && !$.contains(p.target) && $.removeAttribute("open");
      };
      return document.addEventListener("pointerdown", H), () => document.removeEventListener("pointerdown", H);
    }, []), i.jsxs("div", {
      className: m ? `themed-select-field ${m}` : "themed-select-field",
      children: [
        c && i.jsx("span", {
          children: c
        }),
        i.jsxs("details", {
          className: "themed-select",
          ref: j,
          onToggle: (H) => {
            H.currentTarget.open || w("");
          },
          children: [
            i.jsx("summary", {
              "aria-disabled": h,
              onClick: (H) => {
                h && H.preventDefault();
              },
              children: B
            }),
            i.jsxs("div", {
              className: "themed-select-options",
              children: [
                x && i.jsx("input", {
                  "aria-label": `Search ${c}`,
                  autoFocus: true,
                  className: "themed-select-search",
                  placeholder: "Search civilizations...",
                  type: "search",
                  value: y,
                  onChange: (H) => w(H.target.value)
                }),
                i.jsxs("div", {
                  className: "themed-select-option-list",
                  role: "listbox",
                  "aria-label": c || "Select option",
                  children: [
                    V.map((H) => i.jsx("button", {
                      "aria-selected": H.value === f,
                      className: H.value === f ? "selected" : void 0,
                      disabled: h || H.disabled,
                      onClick: () => {
                        var _a3;
                        H.disabled || (r(H.value), (_a3 = j.current) == null ? void 0 : _a3.removeAttribute("open"));
                      },
                      role: "option",
                      type: "button",
                      children: H.label
                    }, H.value)),
                    V.length === 0 && i.jsx("span", {
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
  const Tv = {
    bonuses: [
      "Town Centers spawn 2 Villagers when the next Age is reached",
      "Cavalry +2 attack vs. Skirmishers",
      "Elephant Units receive -25% bonus damage and are more resistant to conversion",
      "Monks +3 melee/+3 pierce armor",
      "Ships regenerate 15 HP per minute"
    ],
    teamBonus: "Trade Units generate +10% food in addition to gold"
  }, zv = {
    bonuses: [
      "Mining Camp technologies free",
      "Blacksmiths and Universities cost -100 wood",
      "Spearman-line deals +25% bonus damage",
      "Fervor and Sanctity affect Villagers",
      "Chemistry and Hand Cannoneer available in Castle Age"
    ],
    teamBonus: "Markets work +80% faster"
  }, _v = {
    bonuses: [
      "Loom is researched instantly",
      "Hunters carry +15; hunted animals last +20% longer",
      "Infantry costs -15/20/25/30% in Dark/Feudal/Castle/ Imperial Age",
      "Infantry +1/+2/+3 attack vs. buildings in Feudal/ Castle/Imperial Age",
      "+10 population space in Imperial Age"
    ],
    teamBonus: "Barracks work +20% faster"
  }, Dv = {
    bonuses: [
      "Start with 2 Forage Bushes",
      "Can garrison livestock in Mills to passively produce food",
      "Mounted Units deal +20/30/40% bonus damage in Feudal/Castle/Imperial Age",
      "Docks +5 garrison capacity"
    ],
    teamBonus: "Camel and Elephant Units train +25% faster"
  }, Uv = {
    bonuses: [
      "Advancing to the next Age costs -15%",
      "Foot Archers and Condottieri +1 melee/+1 pierce armor",
      "Dock and University technologies cost -25%",
      "Gunpowder Units cost -20%",
      "Fishing Ships cost -15%"
    ],
    teamBonus: "Condottiero available at the Barracks in Imperial Age"
  }, Ov = {
    bonuses: [
      "Villagers defeat wolves with one strike",
      "Scout Cavalry-line costs -15%",
      "Melee attack upgrades free"
    ],
    teamBonus: "Mounted Archers train +25% faster"
  }, Lv = {
    bonuses: [
      "Advancing to the next Age is +66% faster",
      "Infantry armor upgrades free",
      "Battle Elephants cost -25/35% in Castle/Imperial Age",
      "Fish Traps cost -33% and provide +200% food"
    ],
    teamBonus: "Docks +6 line of sight"
  }, kv = {
    bonuses: [
      "Wheelbarrow, Hand Cart free",
      "Infantry +20% HP starting in Feudal Age",
      "Warships cost -10/15/20% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Docks cost -15%"
  }, qv = {
    bonuses: [
      "Mule Carts cost -25%",
      "Mule Cart technology effects +40%",
      "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier",
      "First Fortified Church receives a free Relic",
      "Galley-line and Dromons fire an additional projectile"
    ],
    teamBonus: "Infantry +2 line of sight"
  }, Bv = {
    bonuses: [
      "Start with +50 gold",
      "Villagers carry +3",
      "Military Units train +15% faster",
      "Monks gain +5 HP for each researched Monastery technology"
    ],
    teamBonus: "Relics generate +33% gold"
  }, Hv = {
    bonuses: [
      "Villagers move +5% faster in Dark Age, +10% faster starting in Feudal Age",
      "Stable Units cost -15/20% in Castle/Imperial Age",
      "Ships move +10% faster"
    ],
    teamBonus: "Genitour available at the Archery Range starting in Castle Age"
  }, Gv = {
    bonuses: [
      "Shepherds work +25% faster",
      "Town Centers cost -50% wood starting in Castle Age",
      "Foot Archers +1/+2 range in Castle/Imperial Age"
    ],
    teamBonus: "Archery Ranges work +10% faster"
  }, Yv = {
    bonuses: [
      "Militia-line upgrades free",
      "Blacksmith and Siege Workshop technologies cost -50% food",
      "Town Centers cost -50% stone",
      "Can build Krepost in Castle Age"
    ],
    teamBonus: "Blacksmiths work +80% faster"
  }, Qv = {
    bonuses: [
      "Economic upgrades available one age earlier and cost -40% food",
      "Stable technologies cost -50%",
      "Cavalier upgrade available in Castle Age",
      "Gunpowder Units +25% attack"
    ],
    teamBonus: "Relics generate food in addition to gold"
  }, Xv = {
    bonuses: [
      "Lumber Camp technologies free",
      "Infantry +1/+2/+3 attack in Feudal/Castle/Imperial Age",
      "Battle Elephants +1 melee/+1 pierce armor",
      "Monastery technologies cost -50%"
    ],
    teamBonus: "Relics visible on the map at the start of the game"
  }, Vv = {
    bonuses: [
      "Buildings +10/20/30/40% HP in Dark/Feudal/Castle/Imperial Age",
      "Camel Riders, Skirmishers and Spearman-line cost -25%",
      "Town Watch, Town Patrol free",
      "Advancing to Imperial Age costs -33%",
      "Fire Ships and Dromons attack +25% faster"
    ],
    teamBonus: "Monks heal +100% faster"
  }, Zv = {
    bonuses: [
      "Lumberjacks work +15% faster",
      "Livestock animals within Celt unit line of sight cannot be stolen",
      "Infantry moves +5/10/15/20% faster in Dark/Feudal/ Castle/Imperial Age",
      "Siege Weapons attack +25% faster"
    ],
    teamBonus: "Siege Workshops work +20% faster"
  }, Kv = {
    bonuses: [
      "Start with +3 Villagers, but -50 wood and -200 food",
      "Technologies cost -5/10/15% in Feudal/Castle/Imperial Age",
      "Town Centers +7 line of sight and provide +15 population space",
      "Fire Lancers and Fire Ships move +5/10% faster in Castle/Imperial Age"
    ],
    teamBonus: "Farms +10% food"
  }, Jv = {
    bonuses: [
      "One additional Town Center can be built in Feudal Age",
      "Mounted Units move +5/10/15% faster in Feudal/ Castle/Imperial Age",
      "Archery Ranges and Stables cost -75 wood",
      "Siege Workshop and Battering Ram available in Feudal Age; Capped Ram available in Castle Age"
    ],
    teamBonus: "Palisade Walls +33% HP"
  }, Fv = {
    bonuses: [
      "Fishermen and Fishing Ships carry +15",
      "Receive +200 wood when advancing to the next Age",
      "Skirmishers and Elephant Archers attack +25% faster",
      "Barracks technologies cost -50%",
      "Siege Weapons cost -33% wood"
    ],
    teamBonus: "Docks provide +5 population space"
  }, $v = {
    bonuses: [
      "Receive +100 gold and +100 food when advancing to the next Age",
      "Foot Archers attack +18% faster",
      "Pikeman upgrade free"
    ],
    teamBonus: "Outposts +3 line of sight and cost no stone"
  }, Iv = {
    bonuses: [
      "Foragers work +15% faster",
      "Mill technologies free",
      "Mounted Units +20% HP starting in Feudal Age",
      "Castles cost -15/25% in Castle/Imperial Age"
    ],
    teamBonus: "Knight-line +2 line of sight"
  }, Wv = {
    bonuses: [
      "Start with a Mule Cart",
      "Units and buildings receive -15% damage when located on higher elevation",
      "Mounted Units regenerate 2/8/14 HP per minute in Feudal/Castle/Imperial Age",
      "Fortified Churches provide Villagers in a 9 tiles radius with +10% work rate"
    ],
    teamBonus: "Building repairs cost -25%"
  }, Pv = {
    bonuses: [
      "Villagers cost -8/13/18/23% in Dark/Feudal/Castle/ Imperial Age",
      "Camel Riders attack +20% faster",
      "Gunpowder Units +1 melee/+1 pierce armor",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line and Camel Units +2 attack vs. buildings"
  }, eb = {
    bonuses: [
      "Do not need houses, but start with -100 wood",
      "Cavalry Archers cost -10/20% in Castle/Imperial Age",
      "Trebuchets fire more accurately at units and small targets",
      "On Nomadic maps, the first Town Center spawns a scouting Horse"
    ],
    teamBonus: "Stables work +20% faster"
  }, tb = {
    bonuses: [
      "Houses and Settlements provide +5 population space",
      "Buildings cost -15% stone",
      "Military Units cost -15/20/25/30% food in Dark/Feudal/Castle/Imperial Age",
      "Villagers affected by Infantry Blacksmith upgrades starting in Castle Age"
    ],
    teamBonus: "Start with a free Llama"
  }, ab = {
    bonuses: [
      "Mills, Lumber- and Mining Camps cost -50%",
      "Infantry attacks +33% faster starting in Feudal Age",
      "Cavalry Archers +2 attack vs. Ranged Soldiers (except Skirmishers)",
      "Fishing Ships work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age; +100% HP"
    ],
    teamBonus: "Galley-line +4 line of sight"
  }, nb = {
    bonuses: [
      "Meat of hunted and livestock animals doesn't decay",
      "Mounted Units and Fire Lancers attack +25% faster starting in Feudal Age",
      "Siege Engineers available in Castle Age",
      "Siege and Fortification upgrades cost -75% wood and research +100% faster",
      "Units receive -50% friendly fire damage"
    ],
    teamBonus: "Gunpowder Units +2 line of sight"
  }, lb = {
    bonuses: [
      "Pastures replace Farms",
      "Melee attack upgrade effects are doubled",
      "Skirmishers, Spearman-, and Scout Cavalry-line train and upgrade +15% faster",
      "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"
    ],
    teamBonus: "Infantry +2 attack vs. Ranged Soldiers"
  }, ib = {
    bonuses: [
      "No buildings required to advance to the next Age or to unlock other buildings",
      "Farmers don't require Mills or Town Centers to drop off food",
      "Villagers can garrison in Houses",
      "Battle Elephants move +10% faster"
    ],
    teamBonus: "Scorpions +1 range"
  }, sb = {
    bonuses: [
      "Stone miners work +20% faster",
      "Ranged Soldiers and Infantry cost -50% wood",
      "Archer armor and tower upgrades free (Bombard Tower requires Chemistry)",
      "Warships cost -20% wood"
    ],
    teamBonus: "Villagers +3 line of sight"
  }, cb = {
    bonuses: [
      "Each Town Center provides +100 food",
      "Spearman-line and Skirmisher-line move +10% faster",
      "Each garrisoned Relic provides +1 attack to Knight-line and Leitis (maximum +4)"
    ],
    teamBonus: "Monasteries work +20% faster"
  }, ob = {
    bonuses: [
      "Buildings cost -15% wood",
      "Villagers drop off +10% more gold",
      "Barracks Units +1/+2/+3 pierce armor in Feudal/ Castle/Imperial Age"
    ],
    teamBonus: "Universities work +80% faster"
  }, ub = {
    bonuses: [
      "Start with +1 Villager, but -50 food",
      "Resources last +15% longer",
      "Foot Archers cost -10/20/30% in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Walls cost -50%"
  }, rb = {
    bonuses: [
      "Hunters work +40% faster",
      "Cavalry Archers attack +25% faster",
      "Scout Cavalry-line and Steppe Lancers +20/30% HP in Castle/Imperial Age"
    ],
    teamBonus: "Scout Cavalry-line +2 line of sight"
  }, db = {
    bonuses: [
      "Start with +50 wood and +50 food",
      "Town Centers and Docks +100% HP and work +5/10/15/20% faster in Dark/Feudal/Castle/Imperial Age",
      "Parthian Tactics available in Castle Age",
      "Can build Caravanserai in Imperial Age"
    ],
    teamBonus: "Knight-line +2 attack vs. Ranged Soldiers"
  }, fb = {
    bonuses: [
      "Folwark replaces Mill",
      "Villagers regenerate 10/15/20 HP in Feudal/Castle/Imperial Age",
      "Stone Miners generate gold in addition to stone",
      "Bloodlines and Scout Cavalry-line upgrades cost -50% food"
    ],
    teamBonus: "Scout Cavalry-line +1 attack vs. Ranged Soldiers"
  }, mb = {
    bonuses: [
      "Foragers generate wood in addition to food",
      "All units cost -20% gold",
      "Can build Feitoria in Imperial Age",
      "Ships +10/15/20% HP in Feudal/Castle/Imperial Age"
    ],
    teamBonus: "Technologies research +25% faster"
  }, hb = {
    bonuses: [
      "Villagers gather, build, and repair +5% faster",
      "Infantry armor upgrade effects are doubled",
      "Scorpions cost -50% gold",
      "Galley-line and Dromons +1 melee/+1 pierce armor"
    ],
    teamBonus: "Scorpions minimum range reduced"
  }, pb = {
    bonuses: [
      "Market trading fee only 5%; Markets cost -100 wood",
      "Camel Units +25% HP",
      "Galley-line attacks +25% faster",
      "Transport Ships +100% HP, +20 carry capacity"
    ],
    teamBonus: "Foot Archers and Skirmishers +2 attack vs. buildings"
  }, gb = {
    bonuses: [
      "Lumberjacks generate food in addition to wood",
      "Archery Unit technologies at the Archery Range and Blacksmith cost -25%",
      "Siege Weapons and Siege Warships move +10/15% faster in Castle/Imperial Age"
    ],
    teamBonus: "Foot Archers +2 line of sight"
  }, yb = {
    bonuses: [
      "Start with +100 stone",
      "Farm upgrades provide +125% additional food",
      "Soldiers receive -40% bonus damage",
      "Can build Donjon in Dark Age, replaces Watch Tower-line",
      "Fortifications built +50% faster; Town Centers built +100% faster"
    ],
    teamBonus: "Transport Ships +5 line of sight and cost -50%"
  }, vb = {
    bonuses: [
      "Farmers work +15% faster",
      "Arson, Gambesons free",
      "Siege Workshop Units cost -15%",
      "Monks move +20% faster"
    ],
    teamBonus: "Military buildings (except Castles) provide +5 population space"
  }, bb = {
    bonuses: [
      "Builders work +30% faster",
      "Receive +20 gold for each technology researched",
      "Blacksmith upgrades cost no gold",
      "Gunpowder Units attack +18% faster",
      "Cannon Galleons fire more accurately at moving targets"
    ],
    teamBonus: "Trade Units generate +25% gold"
  }, Sb = {
    bonuses: [
      "Livestock animals last +50% longer",
      "Units deal +25% damage when fighting from higher elevation",
      "New Town Centers spawn 2 Sheep starting in Castle Age",
      "Thumb Ring, Parthian Tactics free"
    ],
    teamBonus: "Mounted Archers +2 line of sight"
  }, wb = {
    bonuses: [
      "Farms cost -40%",
      "Town Centers +10 garrison capacity; Towers +5 garrison capacity",
      "Barracks and Stable Units +1/+2 melee armor in Castle/Imperial Age",
      "Monks +100% healing range",
      "Murder Holes, Herbal Medicine free"
    ],
    teamBonus: "Units more resistant to conversion"
  }, xb = {
    bonuses: [
      "Gold miners work +25% faster",
      "Scout Cavalry-line +1 pierce armor and upgrades free",
      "Chemistry free; Gunpowder technologies costs -50%",
      "Gunpowder Units +25% HP"
    ],
    teamBonus: "Gunpowder Units train +25% faster"
  }, Mb = {
    bonuses: [
      "Enemy Town Centers are revealed at the start of the game",
      "Economic upgrades cost no wood and research +100% faster",
      "Archery Range units and Fire Lancers +20% HP",
      "Conscription free"
    ],
    teamBonus: "Imperial Skirmisher upgrade available in Imperial Age"
  }, jb = {
    bonuses: [
      "Receive one free Villager for each economic upgrade researched",
      "Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age",
      "Traction Trebuchets and Lou Chuans cost -25%"
    ],
    teamBonus: "Cavalry +2 attack vs. Siege Weapons"
  }, Ab = {
    bonuses: [
      "Military production buildings and Docks provide +55 food",
      "Infantry regenerates 10/15/30 HP per minute in Feudal/Castle/Imperial Age",
      "Jian Swordsmen and Hei Guang Cavalry +2 attack in Imperial Age",
      "Careening, Dry Dock free"
    ],
    teamBonus: "Houses built +100% faster"
  }, xh = {
    Bengalis: Tv,
    Bohemians: zv,
    Goths: _v,
    Gurjaras: Dv,
    Italians: Uv,
    Magyars: Ov,
    Malay: Lv,
    Vikings: kv,
    Armenians: qv,
    Aztecs: Bv,
    Berbers: Hv,
    Britons: Gv,
    Bulgarians: Yv,
    Burgundians: Qv,
    Burmese: Xv,
    Byzantines: Vv,
    Celts: Zv,
    Chinese: Kv,
    Cumans: Jv,
    Dravidians: Fv,
    Ethiopians: $v,
    Franks: Iv,
    Georgians: Wv,
    Hindustanis: Pv,
    Huns: eb,
    Incas: tb,
    Japanese: ab,
    Jurchens: nb,
    Khitans: lb,
    Khmer: ib,
    Koreans: sb,
    Lithuanians: cb,
    Malians: ob,
    Mayans: ub,
    Mongols: rb,
    Persians: db,
    Poles: fb,
    Portuguese: mb,
    Romans: hb,
    Saracens: pb,
    Shu: gb,
    Sicilians: yb,
    Slavs: vb,
    Spanish: bb,
    Tatars: Sb,
    Teutons: wb,
    Turks: xb,
    Vietnamese: Mb,
    Wei: jb,
    Wu: Ab
  }, Mh = "" + new URL("el_full_1-ClSwu4yM.png", import.meta.url).href;
  function jh() {
    return i.jsx("aside", {
      className: "matchmaking-brand",
      "aria-label": "Empire League",
      children: i.jsx("img", {
        src: Mh,
        alt: "Empire League"
      })
    });
  }
  function Eb() {
    var _a2;
    const { state: c, prepareLobby: u } = St(), f = !c.error, r = c.activeMatch, m = c.roomSetupEstimateMs ?? 6e4, [h, x] = D.useState(() => Jm(c.roomSetupStartedAt, m)), E = Pt.find((B) => {
      var _a3;
      return B.id === ((_a3 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a3.id);
    }) ?? (r == null ? void 0 : r.selectedMap), j = E ? (_a2 = uh(E.id)) == null ? void 0 : _a2.description : void 0, y = Zm(r == null ? void 0 : r.queue.civilizationPreference, r == null ? void 0 : r.opponentCivilizationPreference), w = Zm(r == null ? void 0 : r.opponentCivilizationPreference, r == null ? void 0 : r.queue.civilizationPreference);
    return D.useEffect(() => {
      const B = () => x(Jm(c.roomSetupStartedAt, m));
      B();
      const V = window.setInterval(B, 250);
      return () => window.clearInterval(V);
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
                i.jsx(lh, {
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
                  onClick: () => void u(),
                  children: "Try Again"
                })
              ]
            })
          ]
        }),
        i.jsx(jh, {}),
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
                  children: (E == null ? void 0 : E.name) ?? "Map pending"
                }),
                (E == null ? void 0 : E.thumbnailUrl) ? i.jsx("img", {
                  src: E.thumbnailUrl,
                  alt: `Preview of ${E.name}`
                }) : i.jsx("div", {
                  className: "upcoming-map-placeholder",
                  children: "Map preview unavailable"
                }),
                j && i.jsx("p", {
                  className: "upcoming-map-description",
                  children: j
                })
              ]
            }),
            i.jsx(Km, {
              civilization: y,
              side: "player"
            }),
            i.jsx(Km, {
              civilization: w,
              side: "opponent"
            })
          ]
        })
      ]
    });
  }
  function Zm(c, u) {
    const f = (c == null ? void 0 : c.mode) === "mirror" ? u == null ? void 0 : u.civilization : c == null ? void 0 : c.civilization;
    return f && f in xh ? f : null;
  }
  function Km({ civilization: c, side: u }) {
    const f = c ? xh[c] : null;
    return i.jsxs("article", {
      className: `civ-bonus-card ${u}`,
      children: [
        i.jsx("span", {
          className: "eyebrow",
          children: u === "player" ? "Your civilization" : "Opponent civilization"
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
  function Jm(c, u) {
    const f = Math.ceil(u / 1e3);
    if (!c) return f;
    const r = Math.floor((Date.now() - new Date(c).getTime()) / 1e3);
    return Math.max(0, f - r);
  }
  function Cb() {
    var _a2, _b2, _c;
    const { state: c, simulateMatchEnd: u } = St(), f = c.activeMatch;
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
                i.jsx(Ny, {
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
  function Nb({ oldRating: c, newRating: u, onClose: f }) {
    D.useEffect(() => {
      const h = (x) => {
        x.key === "Escape" && f();
      };
      return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
    }, [
      f
    ]);
    const r = fi(c), m = fi(u);
    return i.jsx("div", {
      className: "modal-backdrop promotion-backdrop",
      role: "presentation",
      children: i.jsxs("section", {
        className: "match-modal promotion-modal",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "promotion-title",
        children: [
          i.jsx(Ay, {
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
              i.jsx(oy, {
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
                      u,
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
  function Rb() {
    const { state: c, setPage: u, returnToMatchmaking: f } = St(), [r, m] = D.useState(true), h = c.activeMatch, x = h == null ? void 0 : h.result;
    if (!h || !x) return null;
    const E = x.outcome === "win", j = x.verificationStatus === "contested", y = x.verified && E && ny(x.oldRating, x.newRating);
    return i.jsxs(i.Fragment, {
      children: [
        i.jsxs("section", {
          className: "result-screen",
          children: [
            i.jsx("span", {
              className: "eyebrow",
              children: j ? "Contested result" : "Verified result"
            }),
            i.jsx("h2", {
              className: E ? "win" : "loss",
              children: j ? "Result Contested" : E ? "Victory" : x.outcome === "loss" ? "Defeat" : "No Contest"
            }),
            j && i.jsx("p", {
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
                  children: j ? "No rating change" : `${x.oldRating} \u2192 ${x.newRating}`
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
                  onClick: () => u("home"),
                  children: "Return Home"
                })
              ]
            })
          ]
        }),
        y && r && i.jsx(Nb, {
          oldRating: x.oldRating,
          newRating: x.newRating,
          onClose: () => m(false)
        })
      ]
    });
  }
  function Tb({ groups: c, enabledGroupIds: u, selectedMapIds: f, favoriteMapIds: r, onToggleGroup: m, onToggleMap: h, onFavorite: x, disabled: E = false }) {
    return i.jsx("div", {
      className: "grouped-map-pool",
      children: c.map((j) => {
        const y = u.includes(j.id);
        return i.jsxs("section", {
          className: y ? "map-group enabled" : "map-group",
          children: [
            i.jsxs("header", {
              className: "map-group-header",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("strong", {
                      children: j.name
                    }),
                    i.jsx("span", {
                      children: j.description
                    })
                  ]
                }),
                i.jsxs("label", {
                  className: "group-switch",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: y,
                      disabled: E,
                      onChange: () => m(j.id)
                    }),
                    i.jsx("span", {
                      "aria-hidden": "true"
                    }),
                    i.jsx("small", {
                      children: y ? "Enabled" : "Disabled"
                    })
                  ]
                })
              ]
            }),
            i.jsx("div", {
              className: "map-group-grid",
              children: j.maps.map((w, B) => {
                const V = w.id === j.primaryMapId, H = y && f.includes(w.id), p = r[j.id] === w.id;
                return i.jsxs("article", {
                  className: `group-map ${V ? "primary" : ""} ${H ? "selected" : ""}`,
                  children: [
                    i.jsxs("button", {
                      className: "group-map-select",
                      type: "button",
                      "aria-pressed": H,
                      "aria-label": `${H ? "Exclude" : "Include"} ${w.name}`,
                      disabled: E || !y,
                      onClick: () => h(j.id, w.id),
                      children: [
                        i.jsx("img", {
                          src: w.thumbnailUrl,
                          alt: ""
                        }),
                        i.jsx("span", {
                          className: "group-map-shade"
                        }),
                        i.jsxs("span", {
                          className: "group-map-name",
                          children: [
                            i.jsx("strong", {
                              children: w.name
                            }),
                            V && i.jsx("small", {
                              children: "Primary map"
                            })
                          ]
                        }),
                        !H && i.jsx("span", {
                          className: "map-off-label",
                          children: y ? "Off" : "Group off"
                        })
                      ]
                    }),
                    i.jsx("button", {
                      className: p ? "map-favorite active" : "map-favorite",
                      type: "button",
                      disabled: E || !y,
                      "aria-pressed": p,
                      "aria-label": `${p ? "Remove" : "Favorite"} ${w.name}`,
                      title: p ? "Remove favorite" : `Favorite ${w.name}`,
                      onClick: () => x(j.id, w.id),
                      children: i.jsx(oh, {
                        size: B === 0 ? 18 : 15,
                        fill: p ? "currentColor" : "none"
                      })
                    })
                  ]
                }, w.id);
              })
            })
          ]
        }, j.id);
      })
    });
  }
  const Fm = "empire-league-favorite-maps", gl = "empire-league-civilization-preference", Ah = "empire-league-map-preferences", $m = [
    {
      id: "pick",
      label: "Choose Civ",
      detail: "Play your selected civilization",
      icon: bu
    },
    {
      id: "random",
      label: "Random",
      detail: "Roll a civilization after the map is chosen",
      icon: My
    },
    {
      id: "mirror",
      label: "Mirror",
      detail: "Match your opponent's civilization",
      icon: hy
    }
  ];
  function zb() {
    var _a2, _b2, _c;
    const { state: c, queues: u, startQueue: f, updateActiveQueue: r, cancelQueue: m } = St(), [h, x] = D.useState(0), [E] = D.useState(() => Ub(u)), [j, y] = D.useState(() => {
      var _a3;
      const q = ju().selectedQueueId;
      return u.some((ue) => ue.id === q) ? q : ((_a3 = u[0]) == null ? void 0 : _a3.id) ?? "";
    }), w = u.find((q) => q.id === j) ?? u[0], B = [
      "idle",
      "cancelled",
      "completed"
    ].includes(c.queueStatus) && (!c.activeMatch || c.queueStatus === "completed") && c.gameStatus !== "loading", V = c.queueStatus === "searching", H = ![
      "idle",
      "cancelled",
      "completed",
      "searching"
    ].includes(c.queueStatus), [p, $] = D.useState(E.selectedMaps), [F, le] = D.useState(E.enabledGroups), [fe, se] = D.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(Fm) ?? "{}");
        return Object.fromEntries(Object.entries(q).map(([ue, ye]) => [
          ue,
          ye && typeof ye == "object" ? ye : {}
        ]));
      } catch {
        return {};
      }
    }), [he, K] = D.useState([
      2,
      4
    ]), [ae, _] = D.useState(true), [L, O] = D.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(gl) ?? "{}");
        if (q.preferRandom === true) return "pick";
        const ue = q.mode;
        return ue === "prefer-random" || ue === "full-random" ? "random" : ue ?? "pick";
      } catch {
        return "pick";
      }
    }), [J, ee] = D.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(gl) ?? "{}").civilization ?? "Byzantines";
      } catch {
        return "Byzantines";
      }
    }), [be, De] = D.useState(() => {
      try {
        return JSON.parse(window.localStorage.getItem(gl) ?? "{}").preferRandom === true;
      } catch {
        return false;
      }
    }), [Te, at] = D.useState(() => {
      try {
        const q = JSON.parse(window.localStorage.getItem(gl) ?? "{}");
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
    }), [S, z] = D.useState(false), [W, de] = D.useState(false), [pe, v] = D.useState("open"), G = (q = L, ue = J, ye = Te) => {
      window.localStorage.setItem(gl, JSON.stringify({
        mode: q,
        civilization: ue,
        preferRandom: be,
        openLandBans: ye.open,
        closedLandBans: ye.closed
      }));
    }, I = (q) => {
      be && L === "pick" && (q === "pick" || q === "random") || (O(q), G(q));
    }, te = (q) => {
      ee(q), G(L, q);
    }, ge = (q, ue) => {
      at((ye) => {
        const A = ye[q], R = A.includes(ue) ? A.filter((ne) => ne !== ue) : A.length < 5 ? [
          ...A,
          ue
        ] : A, Z = {
          ...ye,
          [q]: R
        };
        return G(L, J, Z), Z;
      });
    }, we = {
      preferRandom: be,
      openLandBans: Te.open,
      closedLandBans: Te.closed
    }, ze = (q, ue, ye) => {
      se((A) => {
        const R = {
          ...A[q] ?? {}
        };
        R[ue] === ye ? delete R[ue] : R[ue] = ye;
        const Z = {
          ...A,
          [q]: R
        };
        return window.localStorage.setItem(Fm, JSON.stringify(Z)), Z;
      }), $((A) => {
        var _a3;
        return {
          ...A,
          [q]: ((_a3 = A[q]) == null ? void 0 : _a3.includes(ye)) ? A[q] : [
            ...A[q] ?? [],
            ye
          ]
        };
      });
    }, ot = (q, ue, ye) => {
      var _a3, _b3;
      ((_a3 = p[q]) == null ? void 0 : _a3.includes(ye)) && ((_b3 = fe[q]) == null ? void 0 : _b3[ue]) === ye && ze(q, ue, ye), $((A) => {
        const R = A[q] ?? [], Z = R.includes(ye), ne = Z ? R.filter((X) => X !== ye) : [
          ...R,
          ye
        ];
        return Z && !hu(q, ne, F[q] ?? [], u) ? A : {
          ...A,
          [q]: ne
        };
      });
    }, Ve = (q, ue) => {
      le((ye) => {
        const A = ye[q] ?? [], R = A.includes(ue) ? A.filter((Z) => Z !== ue) : [
          ...A,
          ue
        ];
        return hu(q, p[q] ?? [], R, u) ? {
          ...ye,
          [q]: R
        } : ye;
      });
    }, wt = w ? w.mapPool.filter((q) => {
      var _a3, _b3;
      const ue = ln.find((ye) => ye.maps.some((A) => A.id === q.id));
      return ue && ((_a3 = F[w.id]) == null ? void 0 : _a3.includes(ue.id)) && ((_b3 = p[w.id]) == null ? void 0 : _b3.includes(q.id));
    }).map((q) => q.id) : [], ua = w ? Object.entries(fe[w.id] ?? {}).filter(([q, ue]) => {
      var _a3;
      return ((_a3 = F[w.id]) == null ? void 0 : _a3.includes(q)) && wt.includes(ue);
    }) : [], ra = Object.fromEntries(ua), za = Object.values(ra), Ht = w ? za.map((q) => {
      var _a3;
      return (_a3 = w.mapPool.find((ue) => ue.id === q)) == null ? void 0 : _a3.name;
    }).filter(Boolean).join(", ") : "", sn = L === "pick" ? J : (_a2 = $m.find((q) => q.id === L)) == null ? void 0 : _a2.label, cn = (w == null ? void 0 : w.format) === "team" ? `${w.name} - ${he.map((q) => `${q}v${q}`).join(" or ")}` : w == null ? void 0 : w.name;
    return D.useEffect(() => {
      if (!c.queueStartedAt || c.queueStatus !== "searching") return;
      const q = window.setInterval(() => {
        x(Math.floor((Date.now() - new Date(c.queueStartedAt ?? Date.now()).getTime()) / 1e3));
      }, 1e3);
      return () => window.clearInterval(q);
    }, [
      c.queueStartedAt,
      c.queueStatus
    ]), D.useEffect(() => {
      Ob(u, j, p, F);
    }, [
      F,
      u,
      p,
      j
    ]), D.useEffect(() => {
      if (!V || !w) return;
      const q = window.setTimeout(() => {
        r({
          ...w,
          findAnyone: ae,
          teamSizes: w.format === "team" ? he : void 0,
          mapPool: w.mapPool.filter((ue) => wt.includes(ue.id)),
          mapPreferences: {
            enabledGroupIds: F[w.id] ?? [],
            favoriteMapIds: ra
          },
          mapCatalogVersion: Rt.version,
          favoriteMapId: za[0],
          civilizationPreference: {
            mode: L,
            civilization: L === "pick" ? J : void 0,
            ...we
          }
        });
      }, 250);
      return () => window.clearTimeout(q);
    }, [
      J,
      Te,
      L,
      F,
      fe,
      ae,
      V,
      be,
      p,
      w,
      he
    ]), [
      "creating_lobby",
      "waiting_for_opponent",
      "verifying_lobby",
      "ready"
    ].includes(c.queueStatus) ? i.jsx(Eb, {}) : c.queueStatus === "in_game" || c.queueStatus === "verifying_result" ? i.jsx(Cb, {}) : c.queueStatus === "completed" ? i.jsx(Rb, {}) : i.jsxs("section", {
      className: "stack queue-page",
      children: [
        w && i.jsxs("div", {
          className: "search-waiting-layout matchmaking-overview",
          children: [
            i.jsx("div", {
              className: "search-state",
              children: V ? i.jsxs(i.Fragment, {
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
                              w.format === "team" ? "team " : "",
                              "rating"
                            ]
                          }),
                          i.jsx("strong", {
                            children: w.format === "team" ? c.currentUser.teamRating : c.currentUser.rating
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
                            children: Db(h)
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
                      i.jsx(nh, {
                        size: 18
                      }),
                      " Cancel Search"
                    ]
                  })
                ]
              }) : i.jsxs(i.Fragment, {
                children: [
                  i.jsx("h2", {
                    children: cn
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
                            children: w.playersSearching
                          }),
                          " searching"
                        ]
                      }),
                      i.jsxs("span", {
                        children: [
                          i.jsx(my, {
                            size: 18
                          }),
                          i.jsxs("strong", {
                            children: [
                              "~",
                              w.estimatedWaitSeconds,
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
                            children: sn
                          })
                        ]
                      }),
                      L !== "mirror" && i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            children: "Prefer Random"
                          }),
                          i.jsx("strong", {
                            children: be ? "Yes" : "No"
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
                            children: Ht || "None"
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
                    disabled: !B || wt.length === 0,
                    onClick: () => void f({
                      ...w,
                      findAnyone: ae,
                      teamSizes: w.format === "team" ? he : void 0,
                      mapPool: w.mapPool.filter((q) => wt.includes(q.id)),
                      mapPreferences: {
                        enabledGroupIds: F[w.id] ?? [],
                        favoriteMapIds: ra
                      },
                      mapCatalogVersion: Rt.version,
                      favoriteMapId: za[0],
                      civilizationPreference: {
                        mode: L,
                        civilization: L === "pick" ? J : void 0,
                        ...we
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
            i.jsx(jh, {})
          ]
        }),
        w ? i.jsx(i.Fragment, {
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
                        children: u.map((q) => {
                          const ue = q.id === "team-games", ye = ue ? mi : bu;
                          return i.jsxs("button", {
                            className: w.id === q.id ? "civilization-mode active" : "civilization-mode",
                            type: "button",
                            "aria-pressed": w.id === q.id,
                            disabled: V || H,
                            onClick: () => y(q.id),
                            children: [
                              i.jsx(ye, {
                                size: 20
                              }),
                              i.jsxs("span", {
                                children: [
                                  i.jsx("strong", {
                                    children: ue ? "Team vs Team" : "1v1"
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
                      w.format === "team" && i.jsxs(i.Fragment, {
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
                              const ue = he.includes(q);
                              return i.jsxs("button", {
                                className: ue ? "civilization-mode active" : "civilization-mode",
                                type: "button",
                                "aria-pressed": ue,
                                disabled: V || H,
                                onClick: () => K((ye) => ye.includes(q) ? ye.length === 1 ? ye : ye.filter((A) => A !== q) : [
                                  ...ye,
                                  q
                                ].sort()),
                                children: [
                                  i.jsx(mi, {
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
                        children: $m.map((q) => {
                          const ue = q.icon;
                          return i.jsxs("div", {
                            className: L === q.id || be && L === "pick" && q.id === "random" ? "civilization-option-card active" : "civilization-option-card",
                            children: [
                              i.jsxs("button", {
                                className: "civilization-mode-choice",
                                type: "button",
                                "aria-pressed": L === q.id || be && L === "pick" && q.id === "random",
                                disabled: H,
                                onClick: () => I(q.id),
                                children: [
                                  i.jsx(ue, {
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
                                  i.jsx(Ta, {
                                    className: "civilization-select",
                                    label: "Civilization",
                                    options: Os.map((ye) => ({
                                      value: ye,
                                      label: ye
                                    })),
                                    value: J,
                                    onChange: te,
                                    disabled: H || L !== "pick",
                                    searchable: true,
                                    displayValue: L === "pick" ? void 0 : "N/A"
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-select-activate",
                                    type: "button",
                                    "aria-label": `Choose ${J}`,
                                    disabled: H,
                                    onClick: () => I("pick")
                                  }),
                                  i.jsx("button", {
                                    className: "civilization-card-settings",
                                    type: "button",
                                    "aria-label": "Configure chosen civilization behavior",
                                    disabled: H,
                                    onClick: () => de(true),
                                    children: i.jsx(ru, {
                                      size: 17
                                    })
                                  })
                                ]
                              }),
                              q.id === "random" && i.jsx("button", {
                                className: "civilization-card-settings",
                                type: "button",
                                "aria-label": "Configure random civilization bans",
                                disabled: H,
                                onClick: () => z(true),
                                children: i.jsx(ru, {
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
                              wt.length,
                              " maps across ",
                              ((_c = F[w.id]) == null ? void 0 : _c.length) ?? 0,
                              " groups"
                            ]
                          })
                        ]
                      }),
                      i.jsx(Tb, {
                        groups: ln,
                        enabledGroupIds: F[w.id] ?? [],
                        selectedMapIds: p[w.id] ?? [],
                        favoriteMapIds: fe[w.id] ?? {},
                        onToggleGroup: (q) => Ve(w.id, q),
                        onToggleMap: (q, ue) => ot(w.id, q, ue),
                        onFavorite: (q, ue) => ze(w.id, q, ue),
                        disabled: H
                      })
                    ]
                  })
                ]
              }, w.id),
              false
            ]
          })
        }) : i.jsx("div", {
          className: "empty-state",
          children: "No matchmaking modes are available."
        }),
        S && i.jsx("div", {
          className: "modal-backdrop",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "civ-ban-title",
          onMouseDown: () => z(false),
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
              i.jsx(Ta, {
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
                value: pe,
                onChange: (q) => v(q)
              }),
              i.jsx(_b, {
                title: pe === "open" ? "Open land maps" : "Closed land maps",
                selected: Te[pe],
                onToggle: (q) => ge(pe, q)
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
                      at(q), G(L, J, q);
                    },
                    children: "Clear bans"
                  }),
                  i.jsx("button", {
                    className: "primary",
                    type: "button",
                    onClick: () => z(false),
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
          onMouseDown: () => de(false),
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
                    checked: be,
                    onChange: (q) => {
                      const ue = q.target.checked, ye = ue ? "pick" : L;
                      De(ue), ue && O("pick"), window.localStorage.setItem(gl, JSON.stringify({
                        mode: ye,
                        civilization: J,
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
                onClick: () => de(false),
                children: "Done"
              })
            ]
          })
        })
      ]
    });
  }
  function _b({ title: c, selected: u, onToggle: f }) {
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
                u.length,
                "/5 selected"
              ]
            })
          ]
        }),
        i.jsx("div", {
          className: "civilization-ban-grid",
          children: Os.map((r) => {
            const m = u.includes(r);
            return i.jsxs("label", {
              className: m ? "selected" : "",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: m,
                  disabled: !m && u.length >= 5,
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
  function Db(c) {
    return `${String(Math.floor(c / 60)).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`;
  }
  function ju() {
    try {
      const c = JSON.parse(window.localStorage.getItem(Ah) ?? "{}");
      return c && typeof c == "object" ? c : {
        version: 1
      };
    } catch {
      return {
        version: 1
      };
    }
  }
  function Ub(c) {
    var _a2, _b2, _c, _d;
    const u = ju(), f = {}, r = {};
    for (const m of c) {
      const h = new Set(((_b2 = (_a2 = u.queues) == null ? void 0 : _a2[m.id]) == null ? void 0 : _b2.deselectedMapIds) ?? []), x = new Set(((_d = (_c = u.queues) == null ? void 0 : _c[m.id]) == null ? void 0 : _d.disabledGroupIds) ?? []);
      if (f[m.id] = m.mapPool.map((E) => E.id).filter((E) => !h.has(E)), r[m.id] = ln.map((E) => E.id).filter((E) => !x.has(E)), !hu(m.id, f[m.id], r[m.id], c)) {
        const E = m.mapPool[0], j = ln.find((y) => y.maps.some((w) => w.id === (E == null ? void 0 : E.id)));
        E && j && (f[m.id] = [
          .../* @__PURE__ */ new Set([
            ...f[m.id],
            E.id
          ])
        ], r[m.id] = [
          .../* @__PURE__ */ new Set([
            ...r[m.id],
            j.id
          ])
        ]);
      }
    }
    return {
      selectedMaps: f,
      enabledGroups: r
    };
  }
  function hu(c, u, f, r) {
    var _a2;
    const m = new Set(((_a2 = r.find((x) => x.id === c)) == null ? void 0 : _a2.mapPool.map((x) => x.id)) ?? []), h = new Set(ln.filter((x) => f.includes(x.id)).flatMap((x) => x.maps.map((E) => E.id)));
    return u.some((x) => m.has(x) && h.has(x));
  }
  function Ob(c, u, f, r) {
    var _a2;
    const m = ju(), h = {
      ...m.queues ?? {}
    };
    for (const x of c) {
      const E = new Set(x.mapPool.map((V) => V.id)), j = new Set(ln.map((V) => V.id)), y = (_a2 = m.queues) == null ? void 0 : _a2[x.id], w = ((y == null ? void 0 : y.deselectedMapIds) ?? []).filter((V) => !E.has(V)), B = ((y == null ? void 0 : y.disabledGroupIds) ?? []).filter((V) => !j.has(V));
      h[x.id] = {
        deselectedMapIds: [
          .../* @__PURE__ */ new Set([
            ...w,
            ...x.mapPool.map((V) => V.id).filter((V) => !(f[x.id] ?? []).includes(V))
          ])
        ],
        disabledGroupIds: [
          .../* @__PURE__ */ new Set([
            ...B,
            ...ln.map((V) => V.id).filter((V) => !(r[x.id] ?? []).includes(V))
          ])
        ]
      };
    }
    window.localStorage.setItem(Ah, JSON.stringify({
      version: 1,
      selectedQueueId: u,
      queues: h
    }));
  }
  const Pe = {
    async list() {
      return Se ? au : (await je.request("/custom-lobbies")).rooms;
    },
    async create(c) {
      return Se ? {
        ...au[0],
        id: "preview-created",
        name: c.name,
        maxPlayers: c.maxPlayers
      } : (await je.request("/custom-lobbies", {
        method: "POST",
        body: {
          name: c.name,
          maxPlayers: c.maxPlayers,
          map: Im(c.map),
          dataMod: Im(c.dataMod)
        }
      })).room;
    },
    async join(c, u) {
      if (Se) {
        const f = au.find((h) => h.id === c);
        if (!f || !u) throw new Error("The preview lobby is unavailable.");
        if (f.players.some((h) => h.id === u.id)) return f;
        const r = new Set(f.players.map((h) => h.slot)), m = Array.from({
          length: f.maxPlayers
        }, (h, x) => x + 1).find((h) => !r.has(h));
        if (!m) throw new Error("The preview lobby is full.");
        return {
          ...f,
          players: [
            ...f.players,
            {
              ...u,
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
              text: `${u.displayName} joined the lobby.`,
              sentAt: (/* @__PURE__ */ new Date()).toISOString(),
              system: true
            }
          ]
        };
      }
      return (await je.request(`/custom-lobbies/${encodeURIComponent(c)}/join`, {
        method: "POST"
      })).room;
    },
    async leave(c) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/leave`, {
        method: "POST"
      });
    },
    async updatePlayer(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/player`, {
        method: "PATCH",
        body: u
      });
    },
    async updateSettings(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/settings`, {
        method: "PATCH",
        body: u
      });
    },
    async sendMessage(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/messages`, {
        method: "POST",
        body: {
          text: u
        }
      });
    },
    async kick(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/players/${encodeURIComponent(u)}`, {
        method: "DELETE"
      });
    },
    async start(c) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/start`, {
        method: "POST"
      });
    },
    async publish(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/publish`, {
        method: "POST",
        body: {
          platformLobbyId: u
        }
      });
    },
    async reportJoined(c) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/joined`, {
        method: "POST"
      });
    },
    async reportAoeReady(c) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/aoe-ready`, {
        method: "POST"
      });
    },
    async completeStart(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/complete-start`, {
        method: "POST",
        body: {
          gameStartedAt: u
        }
      });
    },
    async finish(c) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/finish`, {
        method: "POST"
      });
    },
    async failStart(c, u) {
      Se || await je.request(`/custom-lobbies/${encodeURIComponent(c)}/fail-start`, {
        method: "POST",
        body: {
          error: u
        }
      });
    },
    onEvent(c) {
      return Se ? () => {
      } : je.onCustomLobbyEvent(c);
    }
  };
  function Im(c) {
    return c ? {
      id: c.id,
      name: c.name,
      gameName: c.gameName,
      kind: c.kind
    } : void 0;
  }
  const Wm = {
    maps: [],
    dataMods: [],
    scannedRoots: [],
    scannedAt: (/* @__PURE__ */ new Date(0)).toISOString()
  };
  function Lb() {
    const { state: c, notify: u, ensureAoe2Ready: f } = St(), [r, m] = D.useState([]), [h, x] = D.useState(Wm), [E, j] = D.useState(true), [y, w] = D.useState(true), [B, V] = D.useState(false), [H, p] = D.useState(`${c.currentUser.displayName}'s Lobby`), [$, F] = D.useState("map"), [le, fe] = D.useState(""), [se, he] = D.useState(""), [K, ae] = D.useState(""), [_, L] = D.useState(8), [O, J] = D.useState(false), ee = r.find((z) => z.players.some((W) => W.id === c.currentUser.id));
    async function be() {
      j(true);
      try {
        m(await Pe.list());
      } catch (z) {
        u("Custom lobbies could not be loaded.", "danger", {
          detail: Bt(z)
        });
      } finally {
        j(false);
      }
    }
    async function De() {
      var _a2;
      w(true);
      try {
        const z = await (((_a2 = window.electronApi) == null ? void 0 : _a2.scanLocalCustomContent()) ?? Promise.resolve(Wm));
        x(z), fe((W) => z.maps.some((de) => de.id === W) ? W : ""), he((W) => z.maps.some((de) => de.id === W) ? W : ""), ae((W) => z.dataMods.some((de) => de.id === W) ? W : "");
      } catch (z) {
        u("Local content could not be scanned.", "danger", {
          detail: Bt(z)
        });
      } finally {
        w(false);
      }
    }
    D.useEffect(() => (be(), De(), Pe.onEvent((z) => {
      m((W) => ((z.closedRoomId ? W.find((pe) => pe.id === z.closedRoomId && pe.players.some((v) => v.id === c.currentUser.id)) : void 0) && z.closeReason && u("Custom lobby closed.", "warning", {
        detail: z.closeReason
      }), z.rooms));
    })), []);
    async function Te() {
      J(true);
      try {
        const z = $ === "map" ? le : se;
        await Pe.create({
          name: H.trim(),
          maxPlayers: _,
          map: h.maps.find((W) => W.id === z),
          dataMod: h.dataMods.find((W) => W.id === K)
        }), V(false);
      } catch (z) {
        u("The lobby could not be created.", "danger", {
          detail: Bt(z)
        });
      } finally {
        J(false);
      }
    }
    async function at() {
      await f("custom") && V(true);
    }
    async function S(z) {
      if (await f("custom")) {
        J(true);
        try {
          const W = await Pe.join(z, {
            id: c.currentUser.id,
            displayName: c.currentUser.displayName
          });
          m((de) => de.map((pe) => pe.id === W.id ? W : pe));
        } catch (W) {
          u("Could not join the lobby.", "danger", {
            detail: Bt(W)
          });
        } finally {
          J(false);
        }
      }
    }
    return ee ? i.jsx(kb, {
      room: ee,
      currentPlayerId: c.currentUser.id,
      notify: u
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
              children: !B && i.jsxs("button", {
                className: "primary",
                type: "button",
                disabled: c.gameStatus === "loading",
                onClick: () => void at(),
                children: [
                  i.jsx(wy, {
                    size: 17
                  }),
                  " ",
                  c.gameStatus === "loading" ? "Launching AoE2\u2026" : "Create Lobby"
                ]
              })
            })
          ]
        }),
        B && i.jsxs("article", {
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
                  onClick: () => void De(),
                  disabled: y,
                  children: [
                    i.jsx(_m, {
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
                  value: H,
                  maxLength: 64,
                  onChange: (z) => p(z.target.value)
                })
              ]
            }),
            i.jsx(Ta, {
              label: "Maximum players",
              value: String(_),
              onChange: (z) => L(Number(z)),
              options: Array.from({
                length: 7
              }, (z, W) => {
                const de = W + 2;
                return {
                  value: String(de),
                  label: `${de} players`
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
                      onClick: () => F("map"),
                      children: "Map"
                    }),
                    i.jsx("button", {
                      type: "button",
                      "aria-pressed": $ === "scenario",
                      onClick: () => F("scenario"),
                      children: "Scenario"
                    })
                  ]
                })
              ]
            }),
            $ === "map" ? i.jsx(iu, {
              label: "Map",
              items: h.maps.filter((z) => z.kind === "map"),
              value: le,
              onChange: fe
            }) : i.jsx(iu, {
              label: "Scenario",
              items: h.maps.filter((z) => z.kind === "scenario"),
              value: se,
              onChange: he
            }),
            i.jsx(iu, {
              label: "Data mod (optional)",
              items: h.dataMods,
              value: K,
              onChange: ae
            }),
            [
              ...h.maps,
              ...h.dataMods
            ].some((z) => !z.enabled) && i.jsx("small", {
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
                  disabled: !H.trim() || !($ === "map" ? le : se) || O,
                  onClick: () => void Te(),
                  children: O ? "Creating\u2026" : "Create Lobby"
                }),
                i.jsx("button", {
                  className: "secondary large",
                  type: "button",
                  disabled: O,
                  onClick: () => V(false),
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
                onClick: () => void be(),
                disabled: E,
                children: [
                  i.jsx(_m, {
                    size: 16,
                    className: E ? "spin" : ""
                  }),
                  " ",
                  E ? "Refreshing\u2026" : "Refresh Rooms"
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
                r.map((z) => {
                  var _a2, _b2, _c;
                  return i.jsxs("article", {
                    className: "custom-room-row",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: z.name
                          }),
                          i.jsxs("small", {
                            children: [
                              z.demo ? "Demo room \xB7 " : "",
                              "Hosted by ",
                              ((_a2 = z.players.find((W) => W.host)) == null ? void 0 : _a2.displayName) ?? "Unknown"
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("strong", {
                            children: ((_b2 = z.map) == null ? void 0 : _b2.name) ?? "Standard map"
                          }),
                          i.jsx("small", {
                            children: ((_c = z.dataMod) == null ? void 0 : _c.name) ?? "No data mod"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "room-player-count",
                        children: [
                          i.jsx(mi, {
                            size: 16
                          }),
                          " ",
                          z.players.length,
                          "/",
                          z.maxPlayers
                        ]
                      }),
                      i.jsx("span", {
                        className: `custom-room-status ${z.status}`,
                        children: Hb(z.status)
                      }),
                      i.jsxs("button", {
                        className: "secondary",
                        type: "button",
                        disabled: z.status !== "open" || z.players.length >= z.maxPlayers || O || c.gameStatus === "loading",
                        onClick: () => void S(z.id),
                        children: [
                          i.jsx(ih, {
                            size: 16
                          }),
                          " ",
                          c.gameStatus === "loading" ? "Launching\u2026" : "Join"
                        ]
                      })
                    ]
                  }, z.id);
                }),
                !E && !r.length && i.jsx("div", {
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
  function iu({ label: c, items: u, value: f, onChange: r }) {
    var _a2;
    const m = [
      ...u.filter((h) => h.enabled && !h.builtIn),
      ...u.filter((h) => !h.enabled && !h.builtIn),
      ...u.filter((h) => h.builtIn)
    ];
    return i.jsxs("div", {
      children: [
        i.jsx(Ta, {
          label: c,
          value: f,
          onChange: r,
          options: [
            {
              value: "",
              label: `Choose ${c.toLowerCase()}\u2026`
            },
            ...m.map((h) => ({
              value: h.id,
              label: `${h.name}${h.enabled ? "" : ` \u2014 Disabled (${h.modName ?? "enable in AoE2 Mods"})`}`,
              disabled: !h.enabled
            }))
          ]
        }),
        f && i.jsx("small", {
          children: (_a2 = u.find((h) => h.id === f)) == null ? void 0 : _a2.source
        })
      ]
    });
  }
  function kb({ room: c, currentPlayerId: u, notify: f }) {
    var _a2, _b2, _c;
    const [r, m] = D.useState(""), h = D.useRef(/* @__PURE__ */ new Set()), x = D.useRef(false), E = c.players.find((p) => p.id === u), j = c.hostId === u, y = D.useMemo(() => Array.from({
      length: c.maxPlayers
    }, (p, $) => c.players.find((F) => F.slot === $ + 1)), [
      c
    ]), w = (p) => void p.catch(($) => f("Lobby update failed.", "danger", {
      detail: Bt($)
    }));
    D.useEffect(() => () => {
      var _a3, _b3;
      (_a3 = window.electronApi) == null ? void 0 : _a3.setLobbyInputLock(false), (_b3 = window.electronApi) == null ? void 0 : _b3.stopReplayEndDetection();
    }, [
      c.id
    ]), D.useEffect(() => {
      if (c.status === "open") {
        h.current.clear();
        return;
      }
      if (c.status !== "launching" || !window.electronApi) return;
      const p = c.map, $ = `${c.id}:host-setup`;
      if (j && !c.platformLobbyId && !h.current.has($)) {
        h.current.add($), (async () => {
          try {
            if (!p) throw new Error("Choose a map or scenario before starting.");
            await B();
            const _ = await window.electronApi.runAoe2CreateLobbySequence(p.gameName, c.maxPlayers, p.kind === "scenario" ? "scenario" : "map", {
              context: "custom",
              gameSettings: c.gameSettings
            });
            if (!_.sent || !_.lobbyUri) throw new Error(_.message || "AoE2 lobby creation failed.");
            await Pe.publish(c.id, _.lobbyUri);
          } catch (_) {
            await Pe.failStart(c.id, Bt(_)), h.current.delete($);
          }
        })();
        return;
      }
      const F = `${c.id}:guest-join`;
      if (!j && c.platformLobbyId && !E.aoeJoined && !h.current.has(F)) {
        h.current.add(F), (async () => {
          try {
            if (!(await window.electronApi.openAoe2Lobby(c.platformLobbyId)).opened) throw new Error("AoE2 did not open the custom lobby.");
            (p == null ? void 0 : p.kind) !== "scenario" && await V(E), await Pe.reportJoined(c.id);
          } catch (_) {
            f("Could not join the AoE2 lobby.", "danger", {
              detail: Bt(_),
              durationMs: null
            }), h.current.delete(F);
          }
        })();
        return;
      }
      const le = c.players.find((_) => _.host), fe = `${c.id}:guest-ready`;
      if (!j && E.aoeJoined && (le == null ? void 0 : le.aoeReady) && !E.aoeReady && !h.current.has(fe)) {
        h.current.add(fe), (async () => {
          try {
            const _ = Date.now() + Qe.customMapTransferTimeoutMs;
            let L = false, O;
            do
              await new Promise((J) => window.setTimeout(J, Qe.customMapTransferPollMs)), O = await window.electronApi.runAoe2LobbyCursorAction("guest-ready", "custom"), !O.sent && !L && (L = true, await window.electronApi.runAoe2LobbyCursorAction("content-confirm", "custom"));
            while (!O.sent && Date.now() < _);
            if (!O.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
            await Pe.reportAoeReady(c.id);
          } catch (_) {
            f("Could not ready in the AoE2 lobby.", "danger", {
              detail: Bt(_),
              durationMs: null
            }), h.current.delete(fe);
          }
        })();
        return;
      }
      const se = c.players.filter((_) => !_.host).every((_) => _.aoeJoined), he = `${c.id}:host-ready`;
      if (j && c.platformLobbyId && se && !E.aoeReady && !h.current.has(he)) {
        h.current.add(he), (async () => {
          try {
            (p == null ? void 0 : p.kind) !== "scenario" && await V(E);
            const _ = await window.electronApi.runAoe2LobbyCursorAction("host-ready", "custom");
            if (!_.sent) throw new Error(_.message || "AoE2 could not ready the host.");
            await Pe.reportAoeReady(c.id);
          } catch (_) {
            await Pe.failStart(c.id, Bt(_)), h.current.delete(he);
          }
        })();
        return;
      }
      const K = c.players.every((_) => _.aoeReady), ae = `${c.id}:aoe-start`;
      j && K && !h.current.has(ae) && (h.current.add(ae), (async () => {
        try {
          const _ = await window.electronApi.runAoe2LobbyCursorAction("start", "custom");
          if (!_.sent) throw new Error(_.message || "AoE2 could not start the game.");
          await Pe.completeStart(c.id, new Date(Date.now() - Qe.startGameSettleMs).toISOString());
        } catch (_) {
          await Pe.failStart(c.id, Bt(_)), h.current.delete(ae);
        }
      })());
    }, [
      c,
      j,
      E,
      f
    ]), D.useEffect(() => {
      if (c.status !== "started" || !window.electronApi) return;
      const p = `${c.id}:reveal-game`;
      if (h.current.has(p)) return;
      h.current.add(p), window.electronApi.startReplayEndDetection().then((F) => {
        F.started || f("Post-game return detection could not be started.", "danger", {
          detail: F.message || "Replay detection could not be started."
        });
      }).catch((F) => {
        f("Post-game return detection could not be started.", "danger", {
          detail: Bt(F)
        });
      });
      const $ = window.setTimeout(() => {
        (async () => {
          try {
            await du(), await window.electronApi.focusAoe2();
          } catch (F) {
            f("Post-game return detection could not be started.", "danger", {
              detail: Bt(F)
            });
          } finally {
            await window.electronApi.setLobbyInputLock(false);
          }
        })();
      }, Qe.revealAfterStartMs);
      return () => window.clearTimeout($);
    }, [
      c.id,
      c.status
    ]), D.useEffect(() => {
      if (!(c.status !== "started" || !window.electronApi)) return window.electronApi.onReplayEnded((p) => {
        x.current || (x.current = true, hv(p).then(async ($) => {
          if (!$) {
            x.current = false;
            return;
          }
          await window.electronApi.confirmReplayEnded(), await Pe.finish(c.id);
        }).catch(($) => {
          x.current = false, f("The finished custom game could not be detected.", "danger", {
            detail: Bt($)
          });
        }));
      });
    }, [
      c.id,
      c.status,
      f
    ]);
    async function B() {
      if ((await window.electronApi.detectAoe2Process()).running) return;
      const $ = await window.electronApi.launchAoe2();
      if (!$.launched) throw new Error($.message || "AoE2 could not be launched.");
      const F = Date.now() + 45e3;
      for (; Date.now() < F; ) if (await new Promise((le) => window.setTimeout(le, 1e3)), (await window.electronApi.detectAoe2Process()).windowReady) return;
      throw new Error("AoE2 did not become ready in time.");
    }
    async function V(p) {
      const $ = await window.electronApi.selectAoe2Civilization(p.civilization, p.slot, "custom");
      if (!$.sent) throw new Error($.message);
      if (p.team === 1 || p.team === 2) {
        const F = await window.electronApi.selectAoe2Team(p.team, p.slot, "custom");
        if (!F.sent) throw new Error(F.message);
      }
    }
    function H(p) {
      p.preventDefault(), r.trim() && (w(Pe.sendMessage(c.id, r.trim())), m(""));
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
              onClick: () => w(Pe.leave(c.id)),
              children: [
                i.jsx(Tn, {
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
                y.map((p, $) => {
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
                              i.jsx(xy, {
                                size: 17
                              }),
                              i.jsx("strong", {
                                children: p.displayName
                              }),
                              p.host && i.jsx(py, {
                                size: 15
                              }),
                              " ",
                              j && !p.host && i.jsx("button", {
                                className: "lobby-kick",
                                "aria-label": `Remove ${p.displayName}`,
                                onClick: () => w(Pe.kick(c.id, p.id)),
                                children: i.jsx(Tn, {
                                  size: 13
                                })
                              })
                            ]
                          }) : i.jsx("span", {
                            children: "Open slot"
                          })
                        ]
                      }),
                      p && ((_a3 = c.map) == null ? void 0 : _a3.kind) === "scenario" ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("span", {
                            children: "Scenario"
                          }),
                          i.jsx("span", {
                            children: "Scenario-defined"
                          }),
                          p.id === u ? i.jsxs("button", {
                            className: p.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => w(Pe.updatePlayer(c.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(Us, {
                                size: 16
                              }),
                              p.ready ? "Ready" : "Not ready"
                            ]
                          }) : i.jsx("span", {
                            className: p.ready ? "success" : "",
                            children: p.ready ? "Ready" : "Not ready"
                          })
                        ]
                      }) : p && (p.id === u ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx(Ta, {
                            className: "lobby-inline-select",
                            label: "Team",
                            value: String(p.team),
                            onChange: (F) => w(Pe.updatePlayer(c.id, {
                              team: Number(F)
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
                              ].map((F) => ({
                                value: String(F),
                                label: `Team ${F}`
                              }))
                            ]
                          }),
                          i.jsx(Ta, {
                            className: "lobby-inline-select",
                            label: "Civilization",
                            value: p.civilization,
                            onChange: (F) => w(Pe.updatePlayer(c.id, {
                              civilization: F
                            })),
                            options: [
                              "Random",
                              ...Os
                            ].map((F) => ({
                              value: F,
                              label: F
                            }))
                          }),
                          i.jsxs("button", {
                            className: p.ready ? "lobby-ready ready" : "lobby-ready",
                            onClick: () => w(Pe.updatePlayer(c.id, {
                              ready: !p.ready
                            })),
                            children: [
                              p.ready && i.jsx(Us, {
                                size: 16
                              }),
                              p.ready ? "Ready" : "Not ready"
                            ]
                          })
                        ]
                      }) : i.jsxs(i.Fragment, {
                        children: [
                          i.jsxs("span", {
                            children: [
                              "Team ",
                              p.team || "\u2014"
                            ]
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
                    i.jsx(Sy, {
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
                  children: c.messages.map((p) => i.jsxs("p", {
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
                  onSubmit: H,
                  children: [
                    i.jsx("input", {
                      placeholder: "Message lobby\u2026",
                      value: r,
                      onChange: (p) => m(p.target.value)
                    }),
                    i.jsx("button", {
                      className: "primary",
                      "aria-label": "Send",
                      children: i.jsx(vu, {
                        size: 17
                      })
                    })
                  ]
                })
              ]
            })
          ]
        }),
        i.jsx(Bb, {
          settings: c.gameSettings ?? dh,
          editable: j && c.status === "open",
          onChange: (p, $) => w(Pe.updateSettings(c.id, {
            [p]: $
          }))
        }),
        i.jsxs("div", {
          className: `custom-lobby-actions${c.status !== "open" ? " launching" : ""}`,
          children: [
            i.jsx("span", {
              children: c.status === "started" ? i.jsx(Gb, {
                startedAt: c.gameStartedAt
              }) : c.status === "launching" ? i.jsxs(i.Fragment, {
                children: [
                  "Creating and synchronizing the AoE2 lobby",
                  i.jsx(pu, {})
                ]
              }) : c.automationError ? c.automationError : c.players.every((p) => p.ready) ? "All players are ready." : "Waiting for players to ready up."
            }),
            j && i.jsx("button", {
              className: "primary large",
              disabled: c.status !== "open" || !c.map || !c.players.every((p) => p.ready),
              onClick: () => w(Pe.start(c.id)),
              children: c.status !== "open" ? i.jsxs(i.Fragment, {
                children: [
                  "Starting",
                  i.jsx(pu, {})
                ]
              }) : "Start Game"
            })
          ]
        })
      ]
    });
  }
  const qb = [
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
  function Bb({ settings: c, editable: u, onChange: f }) {
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
              children: u ? "Host controls" : "Set by host"
            })
          ]
        }),
        i.jsxs("div", {
          className: "custom-game-settings-grid",
          children: [
            qb.map(([r, m]) => i.jsxs("label", {
              className: c[r] ? "selected" : "",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: c[r],
                  disabled: !u,
                  onChange: (h) => f(r, h.target.checked)
                }),
                i.jsx("span", {
                  children: m
                })
              ]
            }, r)),
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
  function Bt(c) {
    return c instanceof Error ? c.message : "An unexpected error occurred.";
  }
  function Hb(c) {
    return c === "open" ? "Open" : c === "launching" ? "Starting" : "In Game";
  }
  function pu() {
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
  function Gb({ startedAt: c }) {
    const [u, f] = D.useState(() => Pm(c));
    return D.useEffect(() => {
      const r = () => f(Pm(c));
      r();
      const m = window.setInterval(r, 100);
      return () => window.clearInterval(m);
    }, [
      c
    ]), u > 0 ? i.jsxs("span", {
      className: "custom-game-countdown-label",
      "aria-live": "polite",
      children: [
        "Game starts in ",
        i.jsx("strong", {
          className: "custom-game-countdown",
          children: u
        })
      ]
    }) : i.jsxs(i.Fragment, {
      children: [
        "Entering game",
        i.jsx(pu, {})
      ]
    });
  }
  function Pm(c) {
    if (!c) return 5;
    const u = Math.max(0, Date.now() - new Date(c).getTime());
    return Math.max(0, Math.ceil((5e3 - u) / 1e3));
  }
  function Yb() {
    const { state: c, openPlayerProfile: u } = St(), [f, r] = D.useState(""), [m, h] = D.useState("all"), x = D.useMemo(() => c.recentMatches.filter((E) => {
      const j = `${E.opponent} ${E.map} ${E.civilization} ${E.opponentCivilization}`.toLowerCase().includes(f.toLowerCase()), y = m === "all" || E.outcome === m;
      return j && y;
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
                  onChange: (E) => r(E.target.value),
                  placeholder: "Opponent, map, civilization"
                })
              ]
            }),
            i.jsx(Ta, {
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
              x.map((E) => i.jsxs("div", {
                className: "table-row clickable",
                children: [
                  i.jsx("strong", {
                    className: E.outcome,
                    children: E.outcome
                  }),
                  i.jsxs("button", {
                    className: "player-link",
                    type: "button",
                    onClick: () => u(E.opponentId),
                    children: [
                      E.opponent,
                      " (",
                      E.opponentRating,
                      ")"
                    ]
                  }),
                  i.jsx("span", {
                    children: E.map
                  }),
                  i.jsx("span", {
                    children: E.civilization && E.opponentCivilization ? `${E.civilization} vs. ${E.opponentCivilization}` : "\u2014"
                  }),
                  i.jsxs("span", {
                    className: E.ratingChange >= 0 ? "win" : "loss",
                    children: [
                      E.ratingChange > 0 ? "+" : "",
                      E.ratingChange
                    ]
                  }),
                  i.jsxs("span", {
                    children: [
                      E.durationMinutes,
                      "m"
                    ]
                  }),
                  i.jsx("span", {
                    children: new Date(E.timestamp).toLocaleDateString()
                  }),
                  i.jsx("span", {
                    children: E.verified ? "Verified" : "Pending"
                  })
                ]
              }, E.id)),
              x.length === 0 && i.jsx("div", {
                className: "empty-state",
                children: c.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."
              })
            ]
          })
        })
      ]
    });
  }
  const Qb = {
    async list(c = 1, u = "all", f = "solo") {
      if (Se) {
        const m = [
          ...wu
        ].sort((x, E) => f === "team" ? E.teamRating - x.teamRating : E.rating - x.rating).map((x, E) => {
          const j = f === "team" ? x.teamRating : x.rating, y = f === "team" ? x.legacyTeamWins : x.wins, w = f === "team" ? x.legacyTeamLosses : x.losses;
          return {
            ...x,
            rating: j,
            rank: E + 1,
            division: Rn(j),
            wins: y,
            losses: w,
            winRate: y + w ? Number((y / (y + w) * 100).toFixed(1)) : 0
          };
        }), h = u === "all" ? m : m.filter((x) => x.division === u);
        return {
          players: h,
          page: c,
          pageSize: 100,
          total: h.length,
          division: u,
          mode: f
        };
      }
      const r = new URLSearchParams({
        page: String(c),
        division: u,
        mode: f
      });
      return je.request(`/leaderboard?${r}`);
    }
  };
  function Xb() {
    const { state: c, openPlayerProfile: u } = St(), [f, r] = D.useState(""), [m, h] = D.useState("all"), [x, E] = D.useState("solo"), [j, y] = D.useState([]), [w, B] = D.useState(1), [V, H] = D.useState(0), [p, $] = D.useState(true), [F, le] = D.useState(null);
    D.useEffect(() => {
      let L = false;
      return $(true), le(null), Qb.list(w, m, x).then((O) => {
        L || (y(O.players), H(O.total));
      }).catch((O) => {
        L || le(O instanceof Error ? O.message : "Leaderboard could not be loaded.");
      }).finally(() => {
        L || $(false);
      }), () => {
        L = true;
      };
    }, [
      m,
      x,
      w
    ]);
    const fe = D.useMemo(() => j.filter((L) => L.displayName.toLowerCase().includes(f.toLowerCase())), [
      j,
      f
    ]), se = [
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
        label: `${L} (${ay(L)})`
      }))
    ], he = Math.max(1, Math.ceil(V / 100)), K = V === 0 ? 0 : (w - 1) * 100 + 1, ae = Math.min(w * 100, V), _ = i.jsx(Vb, {
      page: w,
      totalPages: he,
      firstRank: K,
      lastRank: ae,
      total: V,
      loading: p,
      onPageChange: B
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
                    E("solo"), B(1);
                  },
                  children: "1v1"
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-pressed": x === "team",
                  onClick: () => {
                    E("team"), B(1);
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
            i.jsx(Ta, {
              className: "division-field",
              label: "Division",
              options: se,
              value: m,
              onChange: (L) => {
                B(1), h(L);
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
                fe.map((L) => i.jsxs("div", {
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
                      onClick: () => u(L.id),
                      children: L.displayName
                    }),
                    i.jsx("span", {
                      children: Zb(L.countryCode)
                    }),
                    i.jsx("span", {
                      children: L.rating
                    }),
                    i.jsx("span", {
                      children: fi(L.rating)
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
                p && i.jsx("div", {
                  className: "empty-state",
                  children: "Loading leaderboard\u2026"
                }),
                !p && F && i.jsx("div", {
                  className: "empty-state",
                  children: F
                }),
                !p && !F && fe.length === 0 && i.jsx("div", {
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
  function Vb({ page: c, totalPages: u, firstRank: f, lastRank: r, total: m, loading: h, onPageChange: x }) {
    const E = u <= 7 ? Array.from({
      length: u
    }, (j, y) => y + 1) : c <= 4 ? [
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      u
    ] : c >= u - 3 ? [
      1,
      "ellipsis",
      u - 4,
      u - 3,
      u - 2,
      u - 1,
      u
    ] : [
      1,
      "ellipsis",
      c - 1,
      c,
      c + 1,
      "ellipsis",
      u
    ];
    return i.jsxs("nav", {
      className: "leaderboard-pagination",
      "aria-label": "Leaderboard pages",
      children: [
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: h || c === 1,
          onClick: () => x(c - 1),
          children: "Previous"
        }),
        i.jsx("div", {
          className: "leaderboard-page-numbers",
          children: E.map((j, y) => j === "ellipsis" ? i.jsx("span", {
            className: "leaderboard-page-ellipsis",
            "aria-hidden": "true",
            children: "\u2026"
          }, `ellipsis-${y}`) : i.jsx("button", {
            className: "leaderboard-page-number",
            type: "button",
            "aria-current": j === c ? "page" : void 0,
            disabled: h,
            onClick: () => x(j),
            children: j
          }, j))
        }),
        i.jsx("button", {
          className: "secondary leaderboard-page-step",
          type: "button",
          disabled: h || c >= u,
          onClick: () => x(c + 1),
          children: "Next"
        }),
        i.jsxs("span", {
          className: "leaderboard-page-status",
          children: [
            "Page ",
            c,
            " of ",
            u,
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
  function Zb(c) {
    const u = c == null ? void 0 : c.trim().toUpperCase();
    return u ? /^[A-Z]{2}$/.test(u) ? i.jsx("span", {
      className: `country-flag fi fi-${u.toLowerCase()}`,
      role: "img",
      "aria-label": `${u} flag`,
      title: u
    }) : u : "\u2014";
  }
  const Kb = {
    async getProfile(c) {
      return Se ? {
        player: wu.find((u) => u.id === c) ?? ft,
        matches: xu
      } : je.request(`/players/${encodeURIComponent(c)}`);
    }
  };
  function Jb(c, u) {
    const f = c.filter((h) => h.queueType !== "team-games").sort((h, x) => new Date(h.timestamp).getTime() - new Date(x.timestamp).getTime());
    if (f.length === 0) return [];
    let r = u - f.reduce((h, x) => h + x.ratingChange, 0);
    const m = [
      {
        id: "starting-rating",
        label: "Initial ELO",
        rating: r
      }
    ];
    for (const h of f) r += h.ratingChange, m.push({
      id: h.id,
      label: new Date(h.timestamp).toLocaleDateString(void 0, {
        month: "short",
        day: "numeric"
      }),
      rating: r
    });
    return m;
  }
  function Fb({ matches: c, currentRating: u, possessive: f = "Your" }) {
    var _a2, _b2;
    const [r, m] = D.useState(null), h = Jb(c, u);
    if (h.length === 0) return i.jsxs("div", {
      className: "empty-state",
      children: [
        f,
        " Elo progress will appear after the first 1v1 match."
      ]
    });
    const x = 800, E = 260, j = {
      top: 22,
      right: 22,
      bottom: 42,
      left: 58
    }, y = h.map((ee) => ee.rating), w = Math.min(...y), B = Math.max(...y), V = Math.floor((w - 20) / 25) * 25, H = Math.ceil((B + 20) / 25) * 25, p = Math.max(H - V, 1), $ = x - j.left - j.right, F = E - j.top - j.bottom, le = h.map((ee, be) => ({
      ...ee,
      x: j.left + be / Math.max(h.length - 1, 1) * $,
      y: j.top + (H - ee.rating) / p * F
    })), fe = le.map((ee) => `${ee.x},${ee.y}`).join(" "), se = `${j.left},${j.top + F} ${fe} ${j.left + $},${j.top + F}`, he = Array.from({
      length: 5
    }, (ee, be) => {
      const De = be / 4;
      return {
        y: j.top + De * F,
        rating: Math.round(H - De * p)
      };
    }), K = h.at(-1).rating - h[0].rating, ae = le.find((ee) => ee.id === r), _ = 126, L = 44, O = ae ? Math.min(Math.max(ae.x - _ / 2, j.left), x - j.right - _) : 0, J = ae ? ae.y - L - 12 < 4 ? ae.y + 12 : ae.y - L - 12 : 0;
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
          "aria-label": `Elo progress over ${h.length - 1} recorded matches, ending at ${u}`,
          children: i.jsxs("svg", {
            viewBox: `0 0 ${x} ${E}`,
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
              he.map((ee) => i.jsxs("g", {
                children: [
                  i.jsx("line", {
                    className: "rating-chart-grid",
                    x1: j.left,
                    x2: x - j.right,
                    y1: ee.y,
                    y2: ee.y
                  }),
                  i.jsx("text", {
                    className: "rating-chart-axis",
                    x: j.left - 10,
                    y: ee.y + 4,
                    textAnchor: "end",
                    children: ee.rating
                  })
                ]
              }, ee.y)),
              i.jsx("polygon", {
                className: "rating-chart-area",
                points: se
              }),
              i.jsx("polyline", {
                className: "rating-chart-line",
                points: fe
              }),
              le.map((ee) => i.jsxs("g", {
                className: "rating-chart-point-target",
                onPointerEnter: () => m(ee.id),
                onPointerLeave: () => m(null),
                children: [
                  i.jsx("circle", {
                    className: "rating-chart-hit-area",
                    cx: ee.x,
                    cy: ee.y,
                    r: "13"
                  }),
                  i.jsx("circle", {
                    className: "rating-chart-point",
                    cx: ee.x,
                    cy: ee.y,
                    r: r === ee.id ? 6 : 4
                  })
                ]
              }, ee.id)),
              ae && i.jsxs("g", {
                className: "rating-chart-tooltip",
                transform: `translate(${O} ${J})`,
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
                x: j.left,
                y: E - 13,
                children: (_a2 = h[1]) == null ? void 0 : _a2.label
              }),
              i.jsx("text", {
                className: "rating-chart-axis",
                x: x - j.right,
                y: E - 13,
                textAnchor: "end",
                children: (_b2 = h.at(-1)) == null ? void 0 : _b2.label
              })
            ]
          })
        })
      ]
    });
  }
  function $b({ friendIds: c, outgoingRequestIds: u, onAddFriend: f }) {
    const { state: r, selectedProfileId: m } = St(), h = !m || m === r.currentUser.id, [x, E] = D.useState(null), [j, y] = D.useState(null), [w, B] = D.useState(false), [V, H] = D.useState(false);
    if (D.useEffect(() => {
      if (H(false), h) {
        E(null), y(null);
        return;
      }
      let he = false;
      return E(null), y(null), Kb.getProfile(m).then((K) => {
        he || E(K);
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
      children: j ?? "Loading player profile\u2026"
    });
    const p = h ? r.currentUser : x.player, $ = h ? r.recentMatches : x.matches, F = $.slice(0, 5).map((he) => he.outcome), le = c.includes(p.id), fe = V || u.includes(p.id);
    async function se() {
      B(true);
      try {
        await f(p.displayName), H(true);
      } finally {
        B(false);
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
            F.length > 0 && i.jsx(th, {
              form: F
            }),
            !h && !le && i.jsx("button", {
              className: "primary profile-friend-button",
              type: "button",
              disabled: w || fe,
              onClick: () => void se(),
              children: fe ? "Friend request sent" : w ? "Sending\u2026" : "Add friend"
            }),
            !h && le && i.jsx("span", {
              className: "profile-friend-status",
              children: "Friends"
            })
          ]
        }),
        i.jsxs("div", {
          className: "metrics-grid",
          children: [
            i.jsx(ca, {
              label: "1v1 RM Rating",
              value: p.rating,
              detail: `${p.legacy1v1Wins}-${p.legacy1v1Losses} legacy record`
            }),
            i.jsx(ca, {
              label: "1v1 RM Peak",
              value: p.peakRating
            }),
            i.jsx(ca, {
              label: "Team RM Rating",
              value: p.teamRating,
              detail: `${p.legacyTeamWins}-${p.legacyTeamLosses} legacy record`
            }),
            i.jsx(ca, {
              label: "Team RM Peak",
              value: p.teamPeakRating
            }),
            i.jsx(ca, {
              label: "Global Rank",
              value: `#${p.rank.toLocaleString()}`
            }),
            i.jsx(ca, {
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
            i.jsx(Fb, {
              matches: $,
              currentRating: p.rating,
              possessive: h ? "Your" : `${p.displayName}'s`
            })
          ]
        })
      ]
    });
  }
  function Ib() {
    const { state: c, updateSettings: u, signOut: f } = St(), r = c.settings;
    return i.jsxs("section", {
      className: "settings-grid",
      children: [
        i.jsx(su, {
          title: "Game",
          children: i.jsx(cu, {
            label: "Launch AoE2 when Empire League starts",
            checked: r.launchAoe2OnStartup,
            onChange: (m) => u({
              launchAoe2OnStartup: m
            })
          })
        }),
        i.jsxs(su, {
          title: "Matchmaking",
          children: [
            i.jsxs("label", {
              children: [
                "Preferred server region",
                i.jsx("input", {
                  value: r.serverRegion,
                  onChange: (m) => u({
                    serverRegion: m.target.value
                  })
                })
              ]
            }),
            i.jsx(cu, {
              label: "Match-found notifications",
              helpText: "Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way.",
              checked: r.matchNotifications,
              onChange: (m) => u({
                matchNotifications: m
              })
            }),
            i.jsx(cu, {
              label: "Automatically reject Family Share accounts",
              helpText: "Family Share accounts have a higher likelihood of being smurfs.",
              checked: r.autoRejectFamilySharing,
              onChange: (m) => u({
                autoRejectFamilySharing: m
              })
            }),
            i.jsxs("div", {
              children: [
                i.jsxs("span", {
                  className: "setting-label",
                  children: [
                    "Maximum 1v1 opponent rating below yours",
                    i.jsx(Eh, {
                      text: "This applies only to 1v1. Restricting lower-rated opponents may make matchmaking take longer."
                    })
                  ]
                }),
                i.jsx(Ta, {
                  label: "",
                  value: String(r.maximumLowerOpponentRatingGap),
                  onChange: (m) => u({
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
        i.jsxs(su, {
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
  function su({ title: c, children: u }) {
    return i.jsxs("div", {
      className: "panel settings-group",
      children: [
        i.jsx("h2", {
          children: c
        }),
        u
      ]
    });
  }
  function cu({ label: c, helpText: u, checked: f, onChange: r }) {
    const m = D.useId();
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
            u && i.jsx(Eh, {
              text: u
            })
          ]
        }),
        i.jsx("input", {
          id: m,
          type: "checkbox",
          checked: f,
          onChange: (h) => r(h.target.checked)
        })
      ]
    });
  }
  function Eh({ text: c }) {
    const [u, f] = D.useState(false), r = D.useId();
    return i.jsxs("span", {
      className: "help-tooltip",
      "data-open": u || void 0,
      children: [
        i.jsx("button", {
          type: "button",
          className: "help-tooltip-trigger",
          "aria-label": "More information",
          "aria-describedby": r,
          "aria-expanded": u,
          onClick: () => f((m) => !m),
          children: i.jsx(dy, {
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
  function Wb({ friends: c, requests: u, onMessage: f, onAccept: r, onDecline: m, onInvite: h, onUnfriend: x }) {
    const [E, j] = D.useState(""), [y, w] = D.useState(""), [B, V] = D.useState(null), [H, p] = D.useState(null), [$, F] = D.useState(false), [le, fe] = D.useState(null), [se, he] = D.useState("all"), K = D.useMemo(() => c.filter((O) => {
      const J = O.name.toLowerCase().includes(E.trim().toLowerCase()), ee = se === "all" || se === "online" && O.presence !== "offline" || O.presence === "in_game";
      return J && ee;
    }), [
      se,
      c,
      E
    ]);
    async function ae(O) {
      O.preventDefault();
      const J = y.trim();
      if (J) {
        F(true), p(null), V(null);
        try {
          const ee = await h(J);
          V(ee), w("");
        } catch (ee) {
          p(ee instanceof Error ? ee.message : "The invite could not be sent.");
        } finally {
          F(false);
        }
      }
    }
    const _ = c.filter((O) => O.presence !== "offline").length, L = c.filter((O) => O.presence === "in_game").length;
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
                  className: se === "all" ? "social-stat active" : "social-stat",
                  onClick: () => he("all"),
                  type: "button",
                  children: [
                    i.jsx(mi, {
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
                  className: se === "online" ? "social-stat active" : "social-stat",
                  onClick: () => he("online"),
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
                  className: se === "in_game" ? "social-stat active" : "social-stat",
                  onClick: () => he("in_game"),
                  type: "button",
                  children: [
                    i.jsx(uu, {
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
                          value: E,
                          onChange: (O) => j(O.target.value),
                          placeholder: "Search friends"
                        })
                      ]
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "friend-list",
                  children: [
                    K.map((O) => i.jsxs("article", {
                      className: `friend-row ${O.presence === "offline" ? "offline" : ""}`,
                      children: [
                        i.jsxs("div", {
                          className: "social-avatar",
                          children: [
                            O.avatarUrl ? i.jsx("img", {
                              src: O.avatarUrl,
                              alt: ""
                            }) : O.initials,
                            i.jsx("span", {
                              className: `presence-dot ${O.presence}`,
                              title: Ch(O.presence)
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "friend-identity",
                          children: [
                            i.jsx("strong", {
                              children: O.name
                            }),
                            i.jsxs("span", {
                              children: [
                                O.rating,
                                " Elo",
                                O.mutualFriends ? ` \xB7 ${O.mutualFriends} mutual` : ""
                              ]
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: `friend-activity ${O.presence}`,
                          children: [
                            O.presence === "in_game" && i.jsx(uu, {
                              size: 15
                            }),
                            O.presence === "idle" && i.jsx(fy, {
                              size: 15
                            }),
                            i.jsxs("span", {
                              children: [
                                O.activity,
                                O.lastSeen ? ` \xB7 ${O.lastSeen}` : ""
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
                              onClick: () => f(O),
                              children: [
                                i.jsx(sh, {
                                  size: 16
                                }),
                                " Message",
                                !!O.unread && i.jsx("span", {
                                  className: "unread-badge",
                                  children: O.unread
                                })
                              ]
                            }),
                            i.jsx("button", {
                              className: "secondary unfriend-button",
                              type: "button",
                              "aria-label": `Unfriend ${O.name}`,
                              title: `Unfriend ${O.name}`,
                              onClick: () => fe(O),
                              children: i.jsx(tu, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, O.id)),
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
                  children: i.jsx(Ey, {
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
                      value: y,
                      onChange: (O) => {
                        w(O.target.value), V(null), p(null);
                      },
                      placeholder: "Player name",
                      "aria-label": "Player name"
                    }),
                    i.jsxs("button", {
                      className: "primary",
                      type: "submit",
                      disabled: !y.trim() || $,
                      children: [
                        i.jsx(vu, {
                          size: 16
                        }),
                        " ",
                        $ ? "Checking player\u2026" : "Send invite"
                      ]
                    })
                  ]
                }),
                B && i.jsxs("span", {
                  className: "invite-confirmation",
                  children: [
                    i.jsx(Us, {
                      size: 14
                    }),
                    " Invite sent to ",
                    B
                  ]
                }),
                H && i.jsxs("span", {
                  className: "invite-error",
                  role: "alert",
                  children: [
                    i.jsx(Tn, {
                      size: 14
                    }),
                    " ",
                    H
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
                    u.length > 0 && i.jsx("span", {
                      className: "request-count",
                      children: u.length
                    })
                  ]
                }),
                i.jsxs("div", {
                  className: "request-list",
                  children: [
                    u.map((O) => i.jsxs("article", {
                      className: "request-row",
                      children: [
                        i.jsx("div", {
                          className: "social-avatar compact",
                          children: O.avatarUrl ? i.jsx("img", {
                            src: O.avatarUrl,
                            alt: ""
                          }) : O.initials
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("strong", {
                              children: O.name
                            }),
                            i.jsxs("span", {
                              children: [
                                O.rating,
                                " Elo \xB7 ",
                                O.mutualFriends,
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
                              "aria-label": `Accept ${O.name}`,
                              title: "Accept",
                              onClick: () => r(O),
                              children: i.jsx(Us, {
                                size: 16
                              })
                            }),
                            i.jsx("button", {
                              type: "button",
                              "aria-label": `Decline ${O.name}`,
                              title: "Decline",
                              onClick: () => m(O.id),
                              children: i.jsx(Tn, {
                                size: 16
                              })
                            })
                          ]
                        })
                      ]
                    }, O.id)),
                    u.length === 0 && i.jsx("p", {
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
          onPointerDown: () => fe(null),
          children: i.jsxs("section", {
            className: "social-confirm-modal",
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "unfriend-title",
            onPointerDown: (O) => O.stopPropagation(),
            children: [
              i.jsx("div", {
                className: "social-confirm-icon",
                children: i.jsx(tu, {
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
                    onClick: () => fe(null),
                    children: "Cancel"
                  }),
                  i.jsxs("button", {
                    className: "social-confirm-remove",
                    type: "button",
                    onClick: () => {
                      x(le), fe(null);
                    },
                    children: [
                      i.jsx(tu, {
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
  function Ch(c) {
    return {
      online: "Online",
      in_game: "In game",
      idle: "Idle",
      offline: "Offline"
    }[c];
  }
  function Pb({ chats: c, onToggle: u, onClose: f, onSend: r, onActivate: m }) {
    return i.jsx("div", {
      className: "chat-dock",
      "aria-label": "Open conversations",
      children: c.map((h) => h.minimized ? i.jsxs("button", {
        className: "chat-minimized",
        type: "button",
        onClick: () => {
          u(h.friend.id), m(h.friend.id);
        },
        children: [
          i.jsx(sh, {
            size: 17
          }),
          i.jsx("span", {
            children: h.friend.name
          }),
          i.jsx("span", {
            className: `presence-dot ${h.friend.presence}`
          })
        ]
      }, h.friend.id) : i.jsx(e0, {
        chat: h,
        onToggle: u,
        onClose: f,
        onSend: r,
        onActivate: m
      }, h.friend.id))
    });
  }
  function e0({ chat: c, onToggle: u, onClose: f, onSend: r, onActivate: m }) {
    const [h, x] = D.useState(""), E = D.useRef(null);
    D.useEffect(() => {
      var _a2;
      return (_a2 = E.current) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth"
      });
    }, [
      c.messages
    ]);
    function j(y) {
      y.preventDefault(), h.trim() && (r(c.friend.id, h.trim()), x(""));
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
              onClick: () => u(c.friend.id),
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
                      children: Ch(c.friend.presence)
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
                  onClick: () => u(c.friend.id),
                  children: i.jsx(ch, {
                    size: 16
                  })
                }),
                i.jsx("button", {
                  type: "button",
                  "aria-label": "Close chat",
                  onClick: () => f(c.friend.id),
                  children: i.jsx(Tn, {
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
            c.messages.map((y) => i.jsxs("div", {
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
              ref: E
            })
          ]
        }),
        i.jsxs("form", {
          className: "chat-compose",
          onSubmit: j,
          children: [
            i.jsx("input", {
              value: h,
              onChange: (y) => x(y.target.value),
              placeholder: `Message ${c.friend.name}`,
              "aria-label": `Message ${c.friend.name}`
            }),
            i.jsx("button", {
              type: "submit",
              "aria-label": "Send message",
              disabled: !h.trim(),
              children: i.jsx(vu, {
                size: 17
              })
            })
          ]
        })
      ]
    });
  }
  const t0 = "" + new URL("el_icon_no_plume-CLUisAEI.png", import.meta.url).href, a0 = {
    async getOnlinePlayerCount() {
      if (Se) return 486;
      const c = await je.request("/online");
      return Number(c.onlinePlayers);
    }
  }, n0 = /* @__PURE__ */ new Set([
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
  function gu() {
    const { state: c, notify: u } = St();
    async function f() {
      var _a2;
      if (n0.has(c.queueStatus)) {
        u("Empire League cannot be minimized during an active match.", "danger", {
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
          children: i.jsx(ch, {
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
          children: i.jsx(Tn, {
            size: 17,
            "aria-hidden": "true"
          })
        })
      ]
    });
  }
  const l0 = [
    {
      page: "home",
      label: "Home",
      icon: i.jsx(yy, {
        size: 18
      })
    },
    {
      page: "ranked",
      label: "Ranked",
      icon: i.jsx(bu, {
        size: 18
      })
    },
    {
      page: "custom",
      label: "Custom",
      icon: i.jsx(uu, {
        size: 18
      })
    },
    {
      page: "match-history",
      label: "Match History",
      icon: i.jsx(gy, {
        size: 18
      })
    },
    {
      page: "leaderboard",
      label: "Leaderboard",
      icon: i.jsx(uy, {
        size: 18
      })
    },
    {
      page: "profile",
      label: "Profile",
      icon: i.jsx(Cy, {
        size: 18
      })
    },
    {
      page: "social",
      label: "Social",
      icon: i.jsx(mi, {
        size: 18
      })
    },
    {
      page: "settings",
      label: "Settings",
      icon: i.jsx(ru, {
        size: 18
      })
    }
  ];
  function i0({ children: c, socialUnreadCount: u = 0 }) {
    const { page: f, setPage: r, state: m, signOut: h, selectedProfileId: x, openPlayerProfile: E, returnFromPlayerProfile: j } = St(), y = f === "profile" && x !== null && x !== m.currentUser.id, w = `${m.currentUser.wins}-${m.currentUser.losses}`, [B, V] = D.useState(null);
    return D.useEffect(() => {
      if (Se) return;
      let H = false;
      const p = () => {
        a0.getOnlinePlayerCount().then((F) => {
          H || V(F);
        }).catch(() => {
          H || V(null);
        });
      };
      p();
      const $ = window.setInterval(p, 3e4);
      return () => {
        H = true, window.clearInterval($);
      };
    }, []), i.jsxs("div", {
      className: "app-shell",
      children: [
        i.jsxs("div", {
          className: "window-title",
          children: [
            i.jsx("img", {
              src: t0,
              alt: ""
            }),
            i.jsx("span", {
              children: "Empire League - AoE2:DE Community Client & Matchmaker"
            })
          ]
        }),
        i.jsx(gu, {}),
        i.jsxs("aside", {
          className: "sidebar",
          children: [
            i.jsx("nav", {
              className: "nav-list",
              "aria-label": "Primary navigation",
              children: l0.map((H) => i.jsxs("button", {
                className: f === H.page ? "nav-item active" : "nav-item",
                type: "button",
                onClick: () => H.page === "profile" ? E(m.currentUser.id) : r(H.page),
                children: [
                  H.icon,
                  i.jsx("span", {
                    children: H.label
                  }),
                  H.page === "social" && u > 0 && i.jsx("span", {
                    className: "nav-notification-badge",
                    "aria-label": `${u} unread ${u === 1 ? "message" : "messages"}`,
                    children: u > 99 ? "99+" : u
                  }),
                  H.page === "ranked" && m.queueStatus === "searching" && i.jsxs("span", {
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
              }, H.page))
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
                B !== null && B >= 300 && i.jsxs("div", {
                  children: [
                    i.jsx("span", {
                      children: "Online"
                    }),
                    i.jsxs("strong", {
                      children: [
                        B.toLocaleString(),
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
                        w
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
                  children: i.jsx(by, {
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
                    onClick: j,
                    children: [
                      i.jsx(cy, {
                        size: 16
                      }),
                      "Back"
                    ]
                  }),
                  i.jsx("div", {
                    children: i.jsx("h1", {
                      children: s0(f)
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
  function s0(c) {
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
  function c0() {
    const { state: c, acceptMatch: u, declineMatch: f } = St(), r = c.activeMatch, m = (r == null ? void 0 : r.queue.id) === "ranked-rm-1v1" && r.opponent.steamLicenseStatus === "family_shared", h = D.useRef(m && (r == null ? void 0 : r.acceptDeadline) ? new Date(r.acceptDeadline).getTime() : Date.now() + 1e4), x = D.useRef(false), E = h.current, [j, y] = D.useState(() => Math.max(0, Math.ceil((E - Date.now()) / 1e3))), w = Pt.find((B) => {
      var _a2;
      return B.id === ((_a2 = r == null ? void 0 : r.selectedMap) == null ? void 0 : _a2.id);
    }) ?? (r == null ? void 0 : r.selectedMap);
    return D.useEffect(() => {
      const B = () => y(Math.max(0, Math.ceil((E - Date.now()) / 1e3)));
      B();
      const V = window.setInterval(B, 250);
      return () => window.clearInterval(V);
    }, [
      E
    ]), D.useEffect(() => {
      if (m) return;
      const B = Math.max(0, E - Date.now()), V = window.setTimeout(() => {
        x.current || (x.current = true, u());
      }, B);
      return () => window.clearTimeout(V);
    }, [
      u,
      E,
      m
    ]), D.useEffect(() => {
      function B(V) {
        V.key === "Escape" && f();
      }
      return window.addEventListener("keydown", B), () => window.removeEventListener("keydown", B);
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
          w && i.jsxs("figure", {
            className: "match-map-thumbnail",
            children: [
              i.jsx("img", {
                src: w.thumbnailUrl,
                alt: ""
              }),
              i.jsx("strong", {
                className: "match-game-type",
                children: r.queue.format
              }),
              i.jsx("figcaption", {
                children: w.name
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
              j,
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
                onClick: () => void u(),
                children: "Accept Match"
              })
            ]
          })
        ]
      })
    }) : null;
  }
  const o0 = {
    info: vy,
    success: ry,
    warning: jy,
    danger: nh,
    loading: lh
  };
  function u0() {
    const { state: c, dismissNotification: u } = St();
    return i.jsx("div", {
      className: "toasts",
      "aria-live": "polite",
      children: c.notifications.map((f) => i.jsx(r0, {
        item: f,
        dismiss: () => u(f.id)
      }, `${f.id}-${f.tone}`))
    });
  }
  function r0({ item: c, dismiss: u }) {
    const [f, r] = D.useState(c.durationMs ?? 0), [m, h] = D.useState(false), x = D.useRef(Date.now()), E = o0[c.tone];
    D.useEffect(() => {
      if (m || c.durationMs === null) return;
      x.current = Date.now();
      const w = window.setTimeout(u, f);
      return () => window.clearTimeout(w);
    }, [
      u,
      c.durationMs,
      m,
      f
    ]);
    function j() {
      r((w) => Math.max(0, w - (Date.now() - x.current))), h(true);
    }
    const y = {
      "--toast-duration": `${f}ms`,
      "--toast-progress": c.durationMs ? f / c.durationMs : 1
    };
    return i.jsxs("div", {
      className: `toast ${c.tone}`,
      onMouseEnter: j,
      onMouseLeave: () => h(false),
      children: [
        i.jsx(E, {
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
          onClick: u,
          "aria-label": "Dismiss notification",
          children: i.jsx(Tn, {
            size: 16
          })
        }),
        !m && c.durationMs !== null && i.jsx("i", {
          className: "toast-progress",
          style: y,
          "aria-hidden": "true"
        }, f)
      ]
    });
  }
  const Wt = {
    async getSnapshot() {
      return Se ? {
        friends: fh,
        requests: mh,
        outgoing: []
      } : (await je.request("/social")).snapshot;
    },
    async sendFriendRequest(c) {
      return Se ? {
        id: `preview-${c.toLowerCase().replaceAll(" ", "-")}`,
        displayName: c
      } : (await je.request("/social/requests", {
        method: "POST",
        body: {
          displayName: c
        }
      })).player;
    },
    async acceptRequest(c) {
      Se || await je.request(`/social/requests/${encodeURIComponent(c)}/accept`, {
        method: "POST"
      });
    },
    async declineRequest(c) {
      Se || await je.request(`/social/requests/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async removeFriend(c) {
      Se || await je.request(`/social/friends/${encodeURIComponent(c)}`, {
        method: "DELETE"
      });
    },
    async updatePresence(c, u, f) {
      Se || await je.request("/social/presence", {
        method: "POST",
        body: {
          presence: c,
          activity: u,
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
      ] : (await je.request(`/social/messages/${encodeURIComponent(c)}`)).messages;
    },
    async sendMessage(c, u) {
      return Se ? {
        id: `preview-message-${Date.now()}`,
        senderId: "user-1",
        recipientId: c,
        text: u,
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      } : (await je.request("/social/messages", {
        method: "POST",
        body: {
          recipientId: c,
          text: u
        }
      })).message;
    },
    async markMessagesRead(c) {
      Se || await je.request(`/social/messages/${encodeURIComponent(c)}/read`, {
        method: "POST"
      });
    },
    onEvent(c) {
      return Se ? () => {
      } : je.onSocialEvent(c);
    }
  };
  function d0() {
    var _a2, _b2, _c;
    const [c, u] = D.useState(false), [f, r] = D.useState(!Se), [m, h] = D.useState(Se ? fh : []), [x, E] = D.useState(Se ? mh : []), [j, y] = D.useState([]), [w, B] = D.useState([]), V = D.useRef([]);
    D.useEffect(() => {
      var _a3;
      return (_a3 = window.electronApi) == null ? void 0 : _a3.onMouseTestModeChanged(u);
    }, []), D.useEffect(() => {
      const _ = window.setTimeout(() => r(false), 3e3);
      return () => window.clearTimeout(_);
    }, []);
    const { page: H, state: p, authStatus: $, authError: F, signInWithSteam: le } = St();
    D.useEffect(() => {
      V.current = w;
    }, [
      w
    ]), D.useEffect(() => {
      const _ = () => {
        var _a3;
        return void ((_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert());
      };
      return window.addEventListener("focus", _), () => window.removeEventListener("focus", _);
    }, []);
    async function fe(_) {
      const L = await Wt.getMessages(_.id).catch(() => []);
      Wt.markMessagesRead(_.id), B((O) => O.find((ee) => ee.friend.id === _.id) ? O.map((ee) => ee.friend.id === _.id ? {
        ...ee,
        minimized: false
      } : ee) : [
        ...O.slice(-2),
        {
          friend: _,
          minimized: false,
          messages: L.map((ee) => ({
            id: ee.id,
            from: ee.senderId === p.currentUser.id ? "me" : "friend",
            text: ee.text,
            time: new Date(ee.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }))
        }
      ]), h((O) => O.map((J) => J.id === _.id ? {
        ...J,
        unread: 0
      } : J));
    }
    function se(_) {
      var _a3;
      h((L) => L.map((O) => O.id === _ ? {
        ...O,
        unread: 0
      } : O)), Wt.markMessagesRead(_), (_a3 = window.electronApi) == null ? void 0 : _a3.clearUnreadMessageAlert();
    }
    async function he(_) {
      await Wt.removeFriend(_.id), B((L) => L.filter((O) => O.friend.id !== _.id));
    }
    async function K(_) {
      await Wt.acceptRequest(_.connectionId);
    }
    async function ae(_) {
      const L = _.trim().toLowerCase();
      if (L === p.currentUser.displayName.toLowerCase()) throw new Error("You can\u2019t send a friend invite to yourself.");
      if (m.some((J) => J.name.toLowerCase() === L)) throw new Error(`${_.trim()} is already your friend.`);
      if (x.some((J) => J.name.toLowerCase() === L)) throw new Error(`You already have a pending request from ${_.trim()}.`);
      return (await Wt.sendFriendRequest(_)).displayName;
    }
    return D.useEffect(() => {
      if (Se || $ !== "authenticated") return;
      const _ = (L) => {
        h((O) => L.friends.map((J) => {
          var _a3;
          return {
            ...J,
            initials: eh(J.name),
            unread: J.unread ?? ((_a3 = O.find((ee) => ee.id === J.id)) == null ? void 0 : _a3.unread) ?? 0
          };
        })), E(L.requests.map((O) => ({
          ...O,
          initials: eh(O.name)
        }))), y(L.outgoing.map((O) => O.id));
      };
      return Wt.getSnapshot().then(_), Wt.onEvent((L) => {
        var _a3;
        if (L.type === "snapshot" && _(L.snapshot), L.type === "presence" && (h((O) => O.map((J) => J.id === L.playerId ? {
          ...J,
          presence: L.presence,
          activity: L.activity,
          mapName: L.mapName
        } : J)), B((O) => O.map((J) => J.friend.id === L.playerId ? {
          ...J,
          friend: {
            ...J.friend,
            presence: L.presence,
            activity: L.activity,
            mapName: L.mapName
          }
        } : J))), L.type === "message") {
          const O = L.message, J = {
            id: O.id,
            from: "friend",
            text: O.text,
            time: new Date(O.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          }, ee = V.current.find((be) => be.friend.id === O.senderId && !be.minimized);
          B((be) => be.some((Te) => Te.friend.id === O.senderId) ? be.map((Te) => Te.friend.id === O.senderId ? {
            ...Te,
            messages: [
              ...Te.messages,
              J
            ]
          } : Te) : be), ee ? Wt.markMessagesRead(O.senderId) : (h((be) => be.map((De) => De.id === O.senderId ? {
            ...De,
            unread: (De.unread ?? 0) + 1
          } : De)), document.hasFocus() || ((_a3 = window.electronApi) == null ? void 0 : _a3.alertUnreadMessage()));
        }
      });
    }, [
      $,
      p.currentUser.id
    ]), D.useEffect(() => {
      if (Se || $ !== "authenticated") return;
      let _ = false, L = 0;
      const O = () => {
        var _a3, _b3;
        const De = p.activeMatch, Te = p.queueStatus === "in_game" || p.gameStatus === "in_match", at = Te ? "in_game" : _ ? "idle" : "online", S = Te ? `In game${((_a3 = De == null ? void 0 : De.selectedMap) == null ? void 0 : _a3.name) ? ` \xB7 ${De.selectedMap.name}` : ""}` : p.queueStatus === "searching" ? "Looking for a match" : _ ? "Idle" : "Online";
        Wt.updatePresence(at, S, Te ? (_b3 = De == null ? void 0 : De.selectedMap) == null ? void 0 : _b3.name : void 0);
      }, J = () => {
        const De = _;
        _ = false, window.clearTimeout(L), L = window.setTimeout(() => {
          _ = true, O();
        }, 5 * 6e4), De && O();
      }, ee = [
        "pointerdown",
        "keydown",
        "wheel"
      ];
      ee.forEach((De) => window.addEventListener(De, J, {
        passive: true
      })), J(), O();
      const be = window.setInterval(O, 3e4);
      return () => {
        ee.forEach((De) => window.removeEventListener(De, J)), window.clearTimeout(L), window.clearInterval(be);
      };
    }, [
      $,
      p.queueStatus,
      p.gameStatus,
      (_a2 = p.activeMatch) == null ? void 0 : _a2.id,
      (_c = (_b2 = p.activeMatch) == null ? void 0 : _b2.selectedMap) == null ? void 0 : _c.name
    ]), f || $ === "loading" ? i.jsxs(i.Fragment, {
      children: [
        i.jsx(gu, {}),
        i.jsx("main", {
          className: "auth-screen session-loading-screen",
          "aria-label": "Loading Empire League",
          children: i.jsxs("div", {
            className: "session-loading-mark",
            children: [
              i.jsx("img", {
                className: "session-loading-artwork",
                src: Mh,
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
        i.jsx(gu, {}),
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
              F && i.jsx("div", {
                className: "auth-error",
                children: F
              }),
              i.jsxs("button", {
                className: "primary large",
                type: "button",
                disabled: $ === "authenticating",
                onClick: () => void le(),
                children: [
                  i.jsx(ih, {
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
        i.jsx(f0, {
          locked: [
            "creating_lobby",
            "waiting_for_opponent",
            "verifying_lobby",
            "ready"
          ].includes(p.queueStatus) && !p.error
        }),
        i.jsxs(i0, {
          socialUnreadCount: m.reduce((_, L) => _ + (L.unread ?? 0), 0),
          children: [
            H === "home" && i.jsx(Rv, {}),
            H === "ranked" && i.jsx(zb, {}),
            H === "custom" && i.jsx(Lb, {}),
            H === "match-history" && i.jsx(Yb, {}),
            H === "leaderboard" && i.jsx(Xb, {}),
            H === "profile" && i.jsx($b, {
              friendIds: m.map((_) => _.id),
              outgoingRequestIds: j,
              onAddFriend: async (_) => {
                await ae(_);
              }
            }),
            H === "social" && i.jsx(Wb, {
              friends: m,
              requests: x,
              onMessage: (_) => void fe(_),
              onAccept: (_) => void K(_),
              onDecline: (_) => {
                var _a3;
                return void Wt.declineRequest(((_a3 = x.find((L) => L.id === _)) == null ? void 0 : _a3.connectionId) ?? _);
              },
              onInvite: ae,
              onUnfriend: (_) => void he(_)
            }),
            H === "settings" && i.jsx(Ib, {})
          ]
        }),
        p.queueStatus === "match_found" && p.activeMatch && i.jsx(c0, {}),
        i.jsx(u0, {}),
        i.jsx(Pb, {
          chats: w,
          onToggle: (_) => B((L) => L.map((O) => O.friend.id === _ ? {
            ...O,
            minimized: !O.minimized
          } : O)),
          onClose: (_) => B((L) => L.filter((O) => O.friend.id !== _)),
          onActivate: se,
          onSend: (_, L) => void Wt.sendMessage(_, L).then((O) => B((J) => J.map((ee) => ee.friend.id === _ ? {
            ...ee,
            messages: [
              ...ee.messages,
              {
                id: O.id,
                from: "me",
                text: O.text,
                time: new Date(O.sentAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })
              }
            ]
          } : ee)))
        }),
        c && i.jsx(m0, {})
      ]
    });
  }
  function eh(c) {
    var _a2;
    const u = c.trim().split(/\s+/);
    return (u.length > 1 ? `${u[0][0]}${(_a2 = u.at(-1)) == null ? void 0 : _a2[0]}` : c.slice(0, 2)).toUpperCase();
  }
  function f0({ locked: c }) {
    const [u, f] = D.useState(null);
    return D.useEffect(() => {
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
    ]), !c || !u ? null : i.jsx("span", {
      className: "lobby-guard-pointer",
      style: {
        left: u.x,
        top: u.y
      },
      "aria-hidden": "true"
    });
  }
  function m0() {
    const [c, u] = D.useState(null), [f, r] = D.useState(null);
    return D.useEffect(() => {
      var _a2, _b2;
      document.documentElement.classList.add("mouse-test-hud-active"), document.body.classList.add("mouse-test-hud-active");
      const m = (_a2 = window.electronApi) == null ? void 0 : _a2.onMouseTestPointer(u), h = (_b2 = window.electronApi) == null ? void 0 : _b2.onMouseTestCoordinatesCopied((x) => {
        r(x), window.setTimeout(() => r(null), 1600);
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
  ey.createRoot(document.getElementById("root")).render(i.jsx(D.StrictMode, {
    children: i.jsx(Av, {
      children: i.jsx(d0, {})
    })
  }));
})();
